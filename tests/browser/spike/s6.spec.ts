// SPDX-License-Identifier: MIT
// Spike S6 (Requirements 15.8, 15.12, 20.13). Mermaid 11.17.2 as split ESM (core + chunks, the flowchart and dagre diagram chunks
// loaded by `import()` on the first render) against the vendored single bundle (site/dist/vendor/mermaid/mermaid.min.js).
// Measures, in the harness of tests/browser/spike/s1-s2.spec.ts (same Mermaid config, fresh browser context per run, CPU 4x for the times):
//   1. the SVG of `feature.completo`, `feature.feat_orq` and the synthetic Visão geral (conjunto vazio) is identical between the two
//      builds (same render id, so no id normalization is expected; the spec records whether one was needed);
//   2. kB gzip over the network, number of requests: ESM core, first diagram (Visão geral, where the flowchart/dagre chunks come on
//      demand), and the single bundle through the same server and the same compression;
//   3. label-overlap of the ESM render (same oracle as tests/browser/label-overlap.spec.ts).
// No limit is asserted: the numbers go to docs/spike-fluxos/s6.json.
//
// Server: own static server on a free port (not 4321: the Playwright webServer may be reused from another worktree). It is the same
// idea as tests/browser/serve.ts (static, 127.0.0.1) but serves three roots (the ESM package outside the repo, the vendored bundle
// and the page) and answers gzip level 9, which is what a production host does; serve.ts is fixed on site/dist and has no compression.
// Requires a built site (KIT_LOCALES=pt-BR npm run build) and the ESM package outside the repo:
//   mkdir -p /tmp/spike-esm && cd /tmp/spike-esm && npm init -y && npm i mermaid@11.17.2
// SPIKE_ELK_DIR (the folder of S1/S2, which has node_modules/mermaid 11.17.2) is accepted too. Optional: SPIKE_RUNS=<n> (default 10).
import { expect, test } from '@playwright/test';
import type { Browser, CDPSession, Page } from '@playwright/test';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import type { Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import os from 'node:os';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { gzipSync } from 'node:zlib';
import { gerarGrafo } from '../../../lib/flow-graph';
import { gerarDiagramaExpandido } from '../../../lib/flow-mermaid';
import { MERMAID_MAX_EDGES, MERMAID_MAX_TEXT_SIZE } from '../../../lib/flow-mermaid/limites';
import { guideDir, loadGuideDoc } from '../../../lib/guide';
import { CPU_RATE, RUNS as RUNS_PADRAO, gravarJson, p95, round, throttleCpu } from '../helpers/medicao';

const SAIDA = 'docs/spike-fluxos/s6.json';
const DEMANDA = 'feature';
const RUNS = Number(process.env.SPIKE_RUNS ?? RUNS_PADRAO);
const VENDOR = 'site/dist/vendor/mermaid/mermaid.min.js';
const GOLDEN = 'tests/fixtures/mermaid/golden';
const ESM_DIR_CANDIDATOS = [process.env.SPIKE_ESM_DIR, process.env.SPIKE_ELK_DIR, join(os.tmpdir(), 'spike-esm'), join(os.tmpdir(), 'spike-elk')].filter(Boolean) as string[];
const ESM_DIR = ESM_DIR_CANDIDATOS.map((d) => join(d, 'node_modules', 'mermaid', 'dist')).find((d) => existsSync(join(d, 'mermaid.esm.min.mjs')));

if (!existsSync(VENDOR)) throw new Error('site/dist ausente: rode KIT_LOCALES=pt-BR npm run build');
if (!ESM_DIR) throw new Error(`mermaid ESM ausente: instale mermaid@11.17.2 fora do repositório (veja o cabeçalho). Procurado em: ${ESM_DIR_CANDIDATOS.join(', ')}`);
const VERSAO_ESM = JSON.parse(readFileSync(join(ESM_DIR, '..', 'package.json'), 'utf8')).version as string;
const VERSAO_VENDOR = [...readFileSync(VENDOR, 'utf8').matchAll(/version:"(\d+\.\d+\.\d+)"/g)].map((m) => m[1]).find((v) => v !== '0.0.0') ?? 'desconhecida';

// ------------------------------------------------------------------ textos: os 3 do requisito
const doc = loadGuideDoc(guideDir(resolve('content')));
const grafo = gerarGrafo(doc, DEMANDA);
const geral = gerarDiagramaExpandido(grafo, { raias: new Set(), subtarefas: new Set(), todasSubtarefas: false }).texto;
const golden = (nome: string) => readFileSync(join(GOLDEN, `${DEMANDA}.${nome}.mmd`), 'utf8');
const TEXTOS: Array<{ id: string; descricao: string; texto: string; igual_ao_golden: boolean | string }> = [
  { id: 'feature.completo', descricao: 'completo (todas as raias, sem Subtarefas)', texto: golden('completo'), igual_ao_golden: true },
  { id: 'feature.feat_orq', descricao: 'raia feat_orq (golden)', texto: golden('feat_orq'), igual_ao_golden: true },
  { id: 'feature.geral', descricao: 'Visão geral sintética (conjunto vazio)', texto: geral, igual_ao_golden: geral === golden('geral') },
];

const LIMITES = { maxTextSize: MERMAID_MAX_TEXT_SIZE, maxEdges: MERMAID_MAX_EDGES };
const CONFIG_BASE = { startOnLoad: false, securityLevel: 'strict', theme: 'default', ...LIMITES, flowchart: { useMaxWidth: false } };
// Mermaid 11 draws the node outlines with rough.js, which takes a random seed when `handDrawnSeed` is 0 (the default): two renders of
// the same text in the same bundle already differ in the control points of `.outer-path`. A fixed seed makes the render deterministic
// without touching the SVG; the control (`controle_sem_semente`) records the difference without it.
const SEMENTE = 1;
const CONFIG = { ...CONFIG_BASE, handDrawnSeed: SEMENTE };

// ------------------------------------------------------------------ servidor próprio (gzip nível 9, porta livre)
const MIME: Record<string, string> = { '.html': 'text/html; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json' };
const PAGINAS: Record<string, string> = {
  '/s6/esm.html': '<!doctype html><meta charset="utf-8"><body></body>',
  '/s6/iife.html': '<!doctype html><meta charset="utf-8"><body></body>',
};
const cacheGzip = new Map<string, Buffer>();
const gz = (arq: string, corpo: Buffer) => {
  let g = cacheGzip.get(arq);
  if (!g) cacheGzip.set(arq, (g = gzipSync(corpo, { level: 9 })));
  return g;
};
function resolverArquivo(caminho: string): string | undefined {
  const sob = (raiz: string, resto: string) => {
    const f = normalize(join(raiz, resto));
    return f.startsWith(raiz + sep) && existsSync(f) && statSync(f).isFile() ? f : undefined;
  };
  if (caminho.startsWith('/s6/esm/')) return sob(ESM_DIR as string, caminho.slice('/s6/esm/'.length));
  if (caminho === '/s6/vendor/mermaid.min.js') return resolve(VENDOR);
  return undefined;
}
function iniciarServidor(): Promise<Server> {
  const server = createServer((req, res) => {
    const caminho = decodeURIComponent(new URL(req.url ?? '/', 'http://localhost').pathname);
    const corpo = PAGINAS[caminho] !== undefined ? Buffer.from(PAGINAS[caminho]) : undefined;
    const arq = corpo ? caminho : resolverArquivo(caminho);
    const bruto = corpo ?? (arq ? readFileSync(arq) : undefined);
    if (!arq || !bruto) return void res.writeHead(404).end('not found');
    const comprimido = gz(arq, bruto);
    res.writeHead(200, { 'content-type': MIME[extname(arq)] ?? 'application/octet-stream', 'content-encoding': 'gzip', 'content-length': comprimido.length, 'cache-control': 'no-store' });
    res.end(comprimido);
  });
  return new Promise((ok) => server.listen(0, '127.0.0.1', () => ok(server)));
}

// ------------------------------------------------------------------ estatística
const mediana = (xs: number[]) => {
  const s = [...xs].sort((a, b) => a - b);
  return s.length ? s[Math.floor((s.length - 1) / 2)] : null;
};
const resumo = (xs: number[]) => ({ n: xs.length, mediana: xs.length ? round(mediana(xs) as number) : null, p95: xs.length ? round(p95(xs)) : null, max: xs.length ? round(Math.max(...xs)) : null, amostras: xs.map((x) => round(x, 1)) });
const kb = (b: number) => round(b / 1024, 2);

// ------------------------------------------------------------------ rede (CDP Network): transferido, não só o corpo
interface Entrada {
  url: string;
  corpo_gzip_bytes: number;
  transferido_bytes: number;
}
async function observarRede(page: Page): Promise<{ cdp: CDPSession; tudo: () => Entrada[] }> {
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('Network.enable');
  const urls = new Map<string, string>();
  const entradas: Entrada[] = [];
  cdp.on('Network.requestWillBeSent', (e) => urls.set(e.requestId, e.request.url));
  cdp.on('Network.loadingFinished', (e) => {
    const url = urls.get(e.requestId) ?? '';
    // encodedDataLength = bytes received from the network, headers included; the body is what the server sent as gzip.
    entradas.push({ url, corpo_gzip_bytes: 0, transferido_bytes: e.encodedDataLength });
  });
  cdp.on('Network.responseReceived', (e) => {
    const n = Number(e.response.headers['content-length'] ?? e.response.headers['Content-Length'] ?? 0);
    cacheCorpo.set(e.requestId, n);
    urls.set(e.requestId, e.response.url);
  });
  const cacheCorpo = new Map<string, number>();
  cdp.on('Network.loadingFinished', (e) => {
    const ult = entradas[entradas.length - 1];
    if (ult) ult.corpo_gzip_bytes = cacheCorpo.get(e.requestId) ?? 0;
  });
  return { cdp, tudo: () => entradas.slice() };
}
const soma = (es: Entrada[]) => ({
  requisicoes: es.length,
  corpo_gzip_kb: kb(es.reduce((n, e) => n + e.corpo_gzip_bytes, 0)),
  transferido_kb: kb(es.reduce((n, e) => n + e.transferido_bytes, 0)),
});
const nome = (url: string) => new URL(url).pathname.replace('/s6/', '');

// ------------------------------------------------------------------ renderização
const COR = `
  const rect = (e) => e.getBoundingClientRect();
  const area = (a, b) => { const w = Math.min(a.right, b.right) - Math.max(a.left, b.left); const h = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top); return w > 1 && h > 1 ? w * h : 0; };
`;
async function renderizarEMedir(page: Page, id: string, texto: string) {
  return page.evaluate(
    async ({ id, texto, cor }) => {
      const mermaid = (window as any).mermaid;
      const out = await mermaid.render(`s6-${id.replace(/\W/g, '_')}`, texto);
      const holder = document.createElement('div');
      holder.style.cssText = 'position:absolute;left:0;top:0;visibility:hidden';
      holder.innerHTML = out.svg;
      document.body.appendChild(holder);
      const { rect, area } = new Function(`${cor}; return { rect, area };`)();
      const nodes = Array.from(holder.querySelectorAll('g.node'));
      const overlaps: string[] = [];
      let clusters = 0;
      holder.querySelectorAll('g.cluster').forEach((c) => {
        const label = c.querySelector('.cluster-label') ?? c.querySelector('foreignObject') ?? c.querySelector('text');
        if (!label) return;
        clusters++;
        const lr = rect(label);
        for (const n of nodes) if (area(lr, rect(n)) > 0) overlaps.push(`${(label.textContent ?? '').trim().slice(0, 40)} x ${n.id}`);
      });
      const r = { svg: out.svg as string, nos: nodes.length, clusters, arestas: holder.querySelectorAll('path.flowchart-link').length, sobreposicoes: overlaps.length, exemplos: overlaps.slice(0, 5) };
      holder.remove();
      return r;
    },
    { id, texto, cor: COR },
  );
}

const normalizar = (svg: string) => svg.replace(/\s+/g, ' ').trim();
function primeiraDiferenca(a: string, b: string): string | null {
  if (a === b) return null;
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  return `posição ${i}: …${a.slice(Math.max(0, i - 40), i + 60)}… x …${b.slice(Math.max(0, i - 40), i + 60)}…`;
}

// ------------------------------------------------------------------ execuções
async function abrirPagina(browser: Browser, origem: string, motor: 'esm' | 'iife', throttle: boolean) {
  const context = await browser.newContext();
  const page = await context.newPage();
  if (throttle) await throttleCpu(page, CPU_RATE);
  const rede = await observarRede(page);
  await page.goto(`${origem}/s6/${motor}.html`, { waitUntil: 'load' });
  return { page, context, rede };
}

/** One cold run: core load, then first render (Visão geral). Returns network by phase and times (CPU 4x). */
async function execucaoEsm(browser: Browser, origem: string) {
  const { page, context, rede } = await abrirPagina(browser, origem, 'esm', true);
  const paginaBase = rede.tudo().length;
  const t_core = await page.evaluate(async (url) => {
    const t0 = performance.now();
    const m = (await import(url)).default;
    m.initialize({ startOnLoad: false });
    (window as any).mermaid = m;
    return performance.now() - t0;
  }, `${origem}/s6/esm/mermaid.esm.min.mjs`);
  const aposCore = rede.tudo().length;
  await page.evaluate((c) => (window as any).mermaid.initialize(c), CONFIG);
  const t_render = await page.evaluate(async (texto) => {
    const t0 = performance.now();
    await (window as any).mermaid.render('s6-primeiro', texto);
    return performance.now() - t0;
  }, geral);
  const aposRender = rede.tudo().length;
  const todas = rede.tudo();
  const r = {
    t_core, t_render,
    core: todas.slice(paginaBase, aposCore),
    sob_demanda: todas.slice(aposCore, aposRender),
  };
  await context.close();
  return r;
}

async function execucaoIife(browser: Browser, origem: string) {
  const { page, context, rede } = await abrirPagina(browser, origem, 'iife', true);
  const base = rede.tudo().length;
  const t_load = await page.evaluate(async (url) => {
    const t0 = performance.now();
    await new Promise<void>((ok, ko) => {
      const s = document.createElement('script');
      s.src = url;
      s.onload = () => ok();
      s.onerror = () => ko(new Error('falha ao carregar o bundle'));
      document.head.appendChild(s);
    });
    return performance.now() - t0;
  }, `${origem}/s6/vendor/mermaid.min.js`);
  const aposLoad = rede.tudo().length;
  await page.evaluate((c) => (window as any).mermaid.initialize(c), CONFIG);
  const t_render = await page.evaluate(async (texto) => {
    const t0 = performance.now();
    await (window as any).mermaid.render('s6-primeiro', texto);
    return performance.now() - t0;
  }, geral);
  const todas = rede.tudo();
  const r = { t_load, t_render, carga: todas.slice(base, aposLoad), apos: todas.slice(aposLoad) };
  await context.close();
  return r;
}

/** SVG identity and label-overlap, without CPU throttling (layout does not depend on it). One fresh context per engine. */
async function svgs(browser: Browser, origem: string, motor: 'esm' | 'iife', config: object = CONFIG, repetir = false) {
  const { page, context } = await abrirPagina(browser, origem, motor, false);
  if (motor === 'esm') {
    await page.evaluate(async (url) => ((window as any).mermaid = (await import(url)).default), `${origem}/s6/esm/mermaid.esm.min.mjs`);
  } else {
    await page.addScriptTag({ url: `${origem}/s6/vendor/mermaid.min.js` });
  }
  await page.evaluate((c) => (window as any).mermaid.initialize(c), config);
  const out: Record<string, Awaited<ReturnType<typeof renderizarEMedir>>> = {};
  for (const t of TEXTOS) out[t.id] = await renderizarEMedir(page, t.id, t.texto);
  if (repetir) for (const t of TEXTOS) out[`${t.id}#2`] = await renderizarEMedir(page, t.id, t.texto);
  await context.close();
  return out;
}

// ------------------------------------------------------------------ teste
test('S6: Mermaid ESM dividido contra o bundle único (SVG, rede, label-overlap)', async ({ browser }) => {
  test.setTimeout(1_800_000);
  const loadInicio = os.loadavg();
  const server = await iniciarServidor();
  const origem = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
  try {
    // 1. SVG identity and label-overlap
    const esm = await svgs(browser, origem, 'esm');
    const bundle = await svgs(browser, origem, 'iife');
    // Control: without the seed, the bundle against itself (same page, same text, rendered twice) and the ESM against the bundle.
    const semSementeBundle = await svgs(browser, origem, 'iife', CONFIG_BASE, true);
    const semSementeEsm = await svgs(browser, origem, 'esm', CONFIG_BASE);
    const controle = TEXTOS.map((t) => ({
      id: t.id,
      bundle_contra_ele_mesmo_identico: semSementeBundle[t.id].svg === semSementeBundle[`${t.id}#2`].svg,
      esm_contra_bundle_identico: semSementeEsm[t.id].svg === semSementeBundle[t.id].svg,
    }));
    const comSementeRepetido = await svgs(browser, origem, 'esm', CONFIG, true);
    const estabilidade = TEXTOS.map((t) => ({ id: t.id, esm_com_semente_duas_vezes_identico: comSementeRepetido[t.id].svg === comSementeRepetido[`${t.id}#2`].svg }));
    const identidade = TEXTOS.map((t) => {
      const a = esm[t.id], b = bundle[t.id];
      const identico = a.svg === b.svg;
      const identicoNormalizado = normalizar(a.svg) === normalizar(b.svg);
      return {
        id: t.id,
        descricao: t.descricao,
        texto_igual_ao_golden: t.igual_ao_golden,
        svg_bytes_esm: a.svg.length,
        svg_bytes_bundle: b.svg.length,
        svg_identico_byte_a_byte: identico,
        svg_identico_com_espacos_normalizados: identicoNormalizado,
        primeira_diferenca: identico ? null : primeiraDiferenca(a.svg, b.svg),
        nos: { esm: a.nos, bundle: b.nos },
        clusters: { esm: a.clusters, bundle: b.clusters },
        arestas: { esm: a.arestas, bundle: b.arestas },
        label_overlap: { esm: { sobreposicoes: a.sobreposicoes, exemplos: a.exemplos }, bundle: { sobreposicoes: b.sobreposicoes, exemplos: b.exemplos } },
      };
    });

    // 2. Network and times (cold, fresh context per run, CPU 4x)
    const runsEsm = [] as Awaited<ReturnType<typeof execucaoEsm>>[];
    const runsIife = [] as Awaited<ReturnType<typeof execucaoIife>>[];
    for (let i = 0; i < RUNS; i++) {
      runsEsm.push(await execucaoEsm(browser, origem));
      runsIife.push(await execucaoIife(browser, origem));
    }
    const e0 = runsEsm[0];
    const porArquivo = (es: Entrada[]) =>
      es
        .map((e) => ({ arquivo: nome(e.url), corpo_gzip_kb: kb(e.corpo_gzip_bytes), transferido_kb: kb(e.transferido_bytes) }))
        .sort((a, b) => b.corpo_gzip_kb - a.corpo_gzip_kb);
    const nucleo = soma(e0.core), demanda = soma(e0.sob_demanda), total = soma([...e0.core, ...e0.sob_demanda]);
    const bundleCarga = soma(runsIife[0].carga);
    const diagramaRede = (r: (typeof runsEsm)[number]) => r.t_core + r.t_render;
    const bundleRede = (r: (typeof runsIife)[number]) => r.t_load + r.t_render;
    const iguaisEntreExecucoes = runsEsm.every((r) => soma([...r.core, ...r.sob_demanda]).requisicoes === total.requisicoes);
    const economia = round(bundleCarga.transferido_kb - total.transferido_kb, 2);

    const identicos = identidade.every((i) => i.svg_identico_byte_a_byte);
    const overlapTotalEsm = identidade.reduce((n, i) => n + i.label_overlap.esm.sobreposicoes, 0);

    const relatorio = {
      aviso: 'local, indicativo, não valida orçamento',
      medido_em: new Date().toISOString(),
      requisitos: ['15.8', '15.12', '20.13'],
      demanda: DEMANDA,
      versoes: { mermaid_esm: VERSAO_ESM, mermaid_bundle_vendorizado: VERSAO_VENDOR },
      metodo: {
        servidor: 'servidor estático próprio do spec em porta livre (127.0.0.1), resposta com Content-Encoding gzip nível 9, cache-control no-store (carga fria a cada execução); não é tests/browser/serve.ts (fixo em site/dist, sem compressão)',
        esm: `pacote mermaid@${VERSAO_ESM} (dist/mermaid.esm.min.mjs + dist/chunks/mermaid.esm.min/*), instalado fora do repositório; package.json do kit intocado`,
        bundle_unico: 'site/dist/vendor/mermaid/mermaid.min.js, servido pelo mesmo servidor e com a mesma compressão',
        rede: 'CDP Network: corpo_gzip = Content-Length da resposta (bytes de corpo enviados em gzip); transferido = encodedDataLength do loadingFinished (corpo mais cabeçalhos)',
        fases_esm: 'core = import() do mermaid.esm.min.mjs e seus chunks estáticos; sob_demanda = o que o primeiro mermaid.render da Visão geral busca por import() (diagrama flowchart, dagre, layout, renderizador)',
        fases_bundle: 'carga = mermaid.min.js inteiro; o primeiro render não busca mais nada',
        execucoes: RUNS,
        cpu_throttling_rate: CPU_RATE,
        contexto_novo_por_execucao: true,
        configuracao_mermaid: CONFIG,
        configuracao_dos_tempos_e_da_rede: 'a mesma CONFIG (com semente) nos dois motores',
        comparacao_de_svg: 'mesmo texto, mesmo id de render (`s6-<id>`), mesma configuração, Chromium sem throttling; comparação byte a byte da string do SVG retornada por mermaid.render. Sem normalização de ids: os ids derivam do id de render e do texto. A única fonte de diferença é o rough.js, que sorteia a semente dos contornos dos nós; por isso a configuração fixa `handDrawnSeed` (nos dois motores), em vez de mexer no SVG. `controle_sem_semente` mostra que, sem a semente, nem o bundle é idêntico a ele mesmo. `svg_identico_com_espacos_normalizados` só colapsa espaços em branco',
        label_overlap: 'mesmo oráculo de tests/browser/label-overlap.spec.ts (g.node cobrindo o rótulo de um g.cluster), aplicado ao SVG renderizado pelo ESM e pelo bundle',
      },
      svg_identidade: identidade,
      controle_sem_semente: { descricao: 'sem handDrawnSeed (aleatório por render): mostra por que a semente é fixada', resultado: controle },
      estabilidade_com_semente: estabilidade,
      rede: {
        esm_dividido: {
          nucleo_ate_importar: { ...nucleo, arquivos_por_tamanho: porArquivo(e0.core).slice(0, 10) },
          sob_demanda_primeiro_diagrama: { ...demanda, arquivos_por_tamanho: porArquivo(e0.sob_demanda).slice(0, 10) },
          total_ate_primeiro_diagrama_visao_geral: total,
          requisicoes_estaveis_entre_execucoes: iguaisEntreExecucoes,
        },
        bundle_unico: { carga_total: bundleCarga, requisicoes_depois_da_carga: runsIife[0].apos.length },
        comparacao: {
          economia_transferido_kb_ate_primeiro_diagrama: economia,
          economia_percentual: round((economia / bundleCarga.transferido_kb) * 100, 1),
          so_nucleo_sem_diagrama_kb: nucleo.transferido_kb,
          nota: 'o núcleo é o que uma página sem Diagrama pagaria se importasse o Mermaid; carregar só quando há Diagrama (O2) leva a página sem Diagrama a 0 kB de Mermaid',
        },
      },
      tempo_ms_cpu_4x: {
        esm_import_core: resumo(runsEsm.map((r) => r.t_core)),
        esm_primeiro_render_visao_geral_com_chunks_sob_demanda: resumo(runsEsm.map((r) => r.t_render)),
        esm_total_ate_primeiro_diagrama: resumo(runsEsm.map(diagramaRede)),
        bundle_carga_do_script: resumo(runsIife.map((r) => r.t_load)),
        bundle_primeiro_render_visao_geral: resumo(runsIife.map((r) => r.t_render)),
        bundle_total_ate_primeiro_diagrama: resumo(runsIife.map(bundleRede)),
        observacao: 'rede em loopback (latência quase zero): o tempo mostra custo de parse e execução, não de download; use a coluna de kB para estimar a rede real',
      },
      resumo: {
        svg_identico_nos_3_conjuntos: identicos,
        label_overlap_total_esm: overlapTotalEsm,
        kb_gzip_transferido_esm_ate_primeiro_diagrama: total.transferido_kb,
        kb_gzip_transferido_bundle_unico: bundleCarga.transferido_kb,
        requisicoes_esm: total.requisicoes,
        requisicoes_bundle: bundleCarga.requisicoes,
      },
      carga_da_maquina: { inicio: loadInicio.map((n) => round(n, 2)), fim: os.loadavg().map((n) => round(n, 2)), ordem: '1, 5 e 15 minutos (os.loadavg)' },
      maquina: {
        plataforma: `${os.platform()} ${os.arch()}`,
        so: os.release(),
        cpus: { modelo: os.cpus()[0]?.model ?? 'desconhecido', quantidade: os.cpus().length },
        memoria_total_gb: round(os.totalmem() / 1024 ** 3, 1),
        node: process.version,
        chromium: browser.version(),
      },
    };
    gravarJson(SAIDA, relatorio);
    expect(existsSync(SAIDA)).toBe(true);
  } finally {
    server.close();
  }
});
