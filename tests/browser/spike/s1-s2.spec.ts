// SPDX-License-Identifier: MIT
// Spike S1 and S2 (Requirements 20.13, 20.9, 20.10). Measures, with CPU 4x and p95 of 10 runs (harness of
// tests/browser/helpers/medicao.ts), one `mermaid.render` per Conjunto_Expandido of the real `feature` demand, and the
// effect of Mermaid configuration (limits, ELK against dagre, htmlLabels, flowchart.curve). No limit is asserted: the
// numbers go to docs/spike-fluxos/s1-s2.json. Failures (maxTextSize, maxEdges, timeout) are recorded as results.
//
// Requires a built site (the vendored Mermaid in site/dist/vendor/mermaid): KIT_LOCALES=pt-BR npm run build
// ELK is not a dependency of the kit. For the ELK and dagre-in-ESM measurements install the packages outside the repo:
//   mkdir -p "$TMPDIR/spike-elk" && cd "$TMPDIR/spike-elk" && npm init -y && npm i mermaid@11.17.2 @mermaid-js/layout-elk@0.2.3
// and point SPIKE_ELK_DIR to that folder (default: <os.tmpdir()>/spike-elk). Without it, the ELK cases are recorded as skipped.
// Optional: SPIKE_RUNS=<n> overrides the number of runs (default 10), SPIKE_ONLY=s1|s2 runs one part.
import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import { existsSync, readFileSync } from 'node:fs';
import os from 'node:os';
import { join, resolve } from 'node:path';
import { gerarGrafo, projetar } from '../../../lib/flow-graph';
import type { ConjuntoExpandido } from '../../../lib/flow-graph/expansao';
import { gerarDiagramaExpandido } from '../../../lib/flow-mermaid';
import { MERMAID_MAX_EDGES, MERMAID_MAX_TEXT_SIZE } from '../../../lib/flow-mermaid/limites';
import { guideDir, loadGuideDoc } from '../../../lib/guide';
import { CPU_RATE, RUNS as RUNS_PADRAO, gravarJson, gzipBytes, p95, round, throttleCpu } from '../helpers/medicao';

const SAIDA = 'docs/spike-fluxos/s1-s2.json';
const DEMANDA = 'feature';
const RUNS = Number(process.env.SPIKE_RUNS ?? RUNS_PADRAO);
const ONLY = process.env.SPIKE_ONLY;
const ELK_DIR = process.env.SPIKE_ELK_DIR ?? join(os.tmpdir(), 'spike-elk');
const ELK_MERMAID = join(ELK_DIR, 'node_modules', 'mermaid', 'dist');
const ELK_PKG = join(ELK_DIR, 'node_modules', '@mermaid-js', 'layout-elk', 'dist');
const TEM_ELK = existsSync(join(ELK_MERMAID, 'mermaid.esm.min.mjs')) && existsSync(join(ELK_PKG, 'mermaid-layout-elk.esm.min.mjs'));
const VENDOR = 'site/dist/vendor/mermaid/mermaid.min.js';
const TIMEOUT_RENDER_MS = 600_000;

if (!existsSync(VENDOR)) throw new Error('site/dist ausente: rode KIT_LOCALES=pt-BR npm run build');

// ------------------------------------------------------------------ conjuntos (texto real do kit)
const doc = loadGuideDoc(guideDir(resolve('content')));
const grafo = gerarGrafo(doc, DEMANDA);
const todasAsRaias = grafo.raias.map((r) => r.id);
const nosPorRaia = (id: string) => grafo.nos.filter((n) => n.raia === id).length;
const maiorRaia = [...todasAsRaias].sort((a, b) => nosPorRaia(b) - nosPorRaia(a))[0];

interface Conjunto {
  id: string;
  descricao: string;
  raias: string[];
  todasSubtarefas: boolean;
}
const CONJUNTOS: Conjunto[] = [
  { id: 'visao_geral', descricao: 'Visão geral sintética (conjunto vazio, todas as raias recolhidas)', raias: [], todasSubtarefas: false },
  { id: 'uma_raia', descricao: `1 raia expandida (a maior: ${maiorRaia})`, raias: [maiorRaia], todasSubtarefas: false },
  { id: 'cinco_raias', descricao: '5 raias expandidas (as 5 primeiras na ordem de exibição)', raias: todasAsRaias.slice(0, 5), todasSubtarefas: false },
  { id: 'completo', descricao: 'completo (todas as raias, sem Subtarefas)', raias: todasAsRaias, todasSubtarefas: false },
  { id: 'cinco_raias_subtarefas', descricao: '5 raias expandidas com Subtarefas', raias: todasAsRaias.slice(0, 5), todasSubtarefas: true },
  { id: 'completo_subtarefas', descricao: 'completo com Subtarefas', raias: todasAsRaias, todasSubtarefas: true },
];

/** Edge count as Mermaid sees it (same count as tests/flow-graph/limites-mermaid.test.ts). */
const contarArestas = (texto: string): number => {
  let n = 0;
  for (const linha of texto.split('\n')) {
    const l = linha.trim();
    if (/^(class|classDef|style|linkStyle|click|subgraph|end|flowchart|direction)\b/.test(l)) continue;
    n += (l.replace(/"[^"]*"/g, '""').match(/(?:-->|-\.->|==>|---|-\.-|===)/g) ?? []).length;
  }
  return n;
};

interface ConjuntoPreparado extends Conjunto {
  texto: string;
  caracteres: number;
  arestas_texto: number;
  nos_visiveis: { clusters: number; nos: number; subtarefas: number; total: number };
}
const preparados: ConjuntoPreparado[] = CONJUNTOS.map((c) => {
  const conj: ConjuntoExpandido = { raias: new Set(c.raias), subtarefas: new Set(), todasSubtarefas: c.todasSubtarefas };
  const texto = gerarDiagramaExpandido(grafo, conj).texto;
  const v = projetar(grafo, conj);
  const subtarefas = c.todasSubtarefas ? v.nos.reduce((n, no) => n + no.subtarefas.length, 0) : 0;
  return {
    ...c,
    texto,
    caracteres: texto.length,
    arestas_texto: contarArestas(texto),
    nos_visiveis: { clusters: v.clusters.length, nos: v.nos.length, subtarefas, total: v.clusters.length + v.nos.length + subtarefas },
  };
});
const porId = (id: string) => preparados.find((c) => c.id === id) as ConjuntoPreparado;

// ------------------------------------------------------------------ pagina de medicao
type Motor = 'iife' | 'esm' | 'esm-elk';
interface ConfigMermaid {
  [chave: string]: unknown;
}
const LIMITES_ELEVADOS = { maxTextSize: MERMAID_MAX_TEXT_SIZE, maxEdges: MERMAID_MAX_EDGES };
const BASE: ConfigMermaid = { startOnLoad: false, securityLevel: 'strict', theme: 'default', ...LIMITES_ELEVADOS, flowchart: { useMaxWidth: false } };
const comFlowchart = (extra: ConfigMermaid, topo: ConfigMermaid = {}): ConfigMermaid => ({
  ...BASE,
  ...topo,
  flowchart: { ...(BASE.flowchart as object), ...extra },
});

const HTML_IIFE = '<!doctype html><meta charset="utf-8"><body><script src="/vendor/mermaid/mermaid.min.js"></script></body>';
const htmlEsm = (elk: boolean) =>
  '<!doctype html><meta charset="utf-8"><body><script type="module">' +
  "import mermaid from '/__spike/esm/mermaid.esm.min.mjs';" +
  (elk ? "import elk from '/__spike/elk/mermaid-layout-elk.esm.min.mjs'; window.elkLayouts = elk;" : '') +
  'window.mermaid = mermaid; window.__pronto = true;' +
  '</script></body>';

const MIME: Record<string, string> = { '.mjs': 'text/javascript', '.js': 'text/javascript', '.json': 'application/json', '.map': 'application/json' };

interface Carregado {
  arquivos: number;
  bytes: number;
  gzip_bytes: number;
}
type Fase = 'esm' | 'elk';

async function prepararPagina(page: Page, motor: Motor) {
  const carga: Record<Fase, Carregado> = {
    esm: { arquivos: 0, bytes: 0, gzip_bytes: 0 },
    elk: { arquivos: 0, bytes: 0, gzip_bytes: 0 },
  };
  await page.route('**/__spike/**', async (route) => {
    const url = new URL(route.request().url());
    const caminho = decodeURIComponent(url.pathname);
    if (caminho === '/__spike/iife.html') return route.fulfill({ contentType: 'text/html', body: HTML_IIFE });
    if (caminho === '/__spike/esm.html') return route.fulfill({ contentType: 'text/html', body: htmlEsm(false) });
    if (caminho === '/__spike/esm-elk.html') return route.fulfill({ contentType: 'text/html', body: htmlEsm(true) });
    const [, , fase, ...resto] = caminho.split('/');
    const base = fase === 'esm' ? ELK_MERMAID : fase === 'elk' ? ELK_PKG : undefined;
    const arquivo = base ? resolve(base, resto.join('/')) : undefined;
    if (!base || !arquivo || !arquivo.startsWith(base) || !existsSync(arquivo)) return route.fulfill({ status: 404, body: 'not found' });
    const body = readFileSync(arquivo);
    const g = carga[fase as Fase];
    g.arquivos += 1;
    g.bytes += body.length;
    g.gzip_bytes += gzipBytes(body);
    const ext = arquivo.slice(arquivo.lastIndexOf('.'));
    return route.fulfill({ contentType: MIME[ext] ?? 'application/octet-stream', body });
  });
  await throttleCpu(page, CPU_RATE);
  await page.goto(`/__spike/${motor}.html`, { waitUntil: 'load' });
  await page.waitForFunction(() => (window as any).mermaid !== undefined && ((window as any).__pronto ?? true), undefined, { timeout: 120_000 });
  return carga;
}

interface MedidaRender {
  ms?: number;
  erro?: string;
  svg?: { bytes: number; nos: number; clusters: number; arestas: number; foreign_objects: number; tags_literais: number };
  label_overlap?: { clusters_medidos: number; sobreposicoes: number; exemplos: string[] };
}

/** Initializes Mermaid and renders each text in sequence, timing `mermaid.render`. SVG metrics and label-overlap only when `detalhar`. */
async function renderizar(
  page: Page,
  config: ConfigMermaid,
  itens: Array<{ id: string; texto: string }>,
  detalhar: boolean,
  motor: Motor,
): Promise<{ aquecimento_ms: number; aquecimento_erro?: string; resultados: Record<string, MedidaRender> }> {
  return page.evaluate(
    async ({ config, itens, detalhar, motor, timeout }) => {
      const w = window as any;
      const mermaid = w.mermaid;
      if (motor === 'esm-elk' && config.layout === 'elk' && w.elkLayouts) mermaid.registerLayoutLoaders(w.elkLayouts);
      mermaid.initialize(config);
      let n = 0;
      const comTimeout = <T>(p: Promise<T>) =>
        Promise.race([p, new Promise<never>((_, rej) => setTimeout(() => rej(new Error(`timeout de ${timeout} ms`)), timeout))]);
      const t0 = performance.now();
      let aquecimento_erro: string | undefined;
      try {
        await mermaid.render(`spike-aq-${n++}`, 'flowchart LR\n  A["a"] --> B["b"]\n');
      } catch (e) {
        aquecimento_erro = String((e as Error)?.message ?? e);
      }
      const aquecimento_ms = performance.now() - t0;
      const resultados: Record<string, any> = {};
      const rect = (e: Element) => e.getBoundingClientRect();
      const area = (a: DOMRect, b: DOMRect) => {
        const largura = Math.min(a.right, b.right) - Math.max(a.left, b.left);
        const altura = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
        return largura > 1 && altura > 1 ? largura * altura : 0;
      };
      for (const item of itens) {
        const r: any = {};
        const ini = performance.now();
        try {
          const out: any = await comTimeout(mermaid.render(`spike-${n++}`, item.texto));
          r.ms = performance.now() - ini;
          // Over `maxTextSize` Mermaid does not reject: it replaces the diagram by a one-node warning. Record it as a failure.
          const aviso = /Maximum Text size in diagram exceeded/i.test(out.svg);
          if (aviso) r.erro = 'maxTextSize excedido: o Mermaid não rejeitou o render, trocou o diagrama por um nó de aviso (Maximum Text size in diagram exceeded)';
          if (detalhar) {
            const holder = document.createElement('div');
            holder.style.cssText = 'position:absolute;left:0;top:0;visibility:hidden';
            holder.innerHTML = out.svg;
            document.body.appendChild(holder);
            const nodes = Array.from(holder.querySelectorAll('g.node'));
            const overlaps: string[] = [];
            let clusters = 0;
            holder.querySelectorAll('g.cluster').forEach((c) => {
              const label = c.querySelector('.cluster-label') ?? c.querySelector('foreignObject') ?? c.querySelector('text');
              if (!label) return;
              clusters++;
              const lr = rect(label);
              for (const no of nodes) if (area(lr, rect(no)) > 0) overlaps.push(`${(label.textContent ?? '').trim().slice(0, 40)} x ${no.id}`);
            });
            r.svg = {
              bytes: out.svg.length,
              nos: nodes.length,
              clusters: holder.querySelectorAll('g.cluster').length,
              arestas: holder.querySelectorAll('path.flowchart-link').length,
              foreign_objects: holder.querySelectorAll('foreignObject').length,
              tags_literais: (out.svg.match(/&lt;(b|i|small|br)\b/g) ?? []).length,
            };
            r.label_overlap = { clusters_medidos: clusters, sobreposicoes: overlaps.length, exemplos: overlaps.slice(0, 5) };
            holder.remove();
          }
        } catch (e) {
          r.erro = String((e as Error)?.message ?? e).slice(0, 300);
          r.ms = performance.now() - ini;
        }
        resultados[item.id] = r;
      }
      return { aquecimento_ms, aquecimento_erro, resultados };
    },
    { config, itens, detalhar, motor, timeout: TIMEOUT_RENDER_MS },
  );
}

interface ResultadoCaso {
  rotulo: string;
  motor: Motor;
  config: ConfigMermaid;
  execucoes_pedidas: number;
  por_conjunto: Record<
    string,
    {
      execucoes_ok: number;
      p95_ms: number | null;
      mediana_ms: number | null;
      amostras_ms: number[];
      erro: string | null;
      svg?: MedidaRender['svg'];
      label_overlap?: MedidaRender['label_overlap'];
    }
  >;
  aquecimento_p95_ms: number | null;
  carga_esm_gzip_kb?: number;
  carga_elk_gzip_kb?: number;
  carga_elk_arquivos?: number;
}

const mediana = (xs: number[]) => {
  const s = [...xs].sort((a, b) => a - b);
  return s.length ? s[Math.floor((s.length - 1) / 2)] : null;
};

/** Fresh context per run (CPU 4x), one warm-up render, then the listed conjuntos in order. A failing conjunto stops its own repetitions. */
async function medirCaso(
  browser: import('@playwright/test').Browser,
  rotulo: string,
  motor: Motor,
  config: ConfigMermaid,
  ids: string[],
  runs = RUNS,
): Promise<ResultadoCaso> {
  const por: ResultadoCaso['por_conjunto'] = {};
  for (const id of ids) por[id] = { execucoes_ok: 0, p95_ms: null, mediana_ms: null, amostras_ms: [], erro: null };
  const aquecimentos: number[] = [];
  let cargaEsm = 0;
  let cargaElk = { gzip: 0, arquivos: 0 };
  for (let i = 0; i < runs; i++) {
    const ativos = ids.filter((id) => por[id].erro === null);
    if (!ativos.length) break;
    const context = await browser.newContext();
    const page = await context.newPage();
    try {
      const carga = await prepararPagina(page, motor);
      const r = await renderizar(page, config, ativos.map((id) => ({ id, texto: porId(id).texto })), i === 0, motor);
      aquecimentos.push(r.aquecimento_ms);
      if (r.aquecimento_erro) for (const id of ativos) por[id].erro = `aquecimento: ${r.aquecimento_erro}`;
      for (const id of ativos) {
        const m = r.resultados[id];
        if (m.erro) por[id].erro = m.erro;
        else {
          por[id].amostras_ms.push(round(m.ms as number));
          por[id].execucoes_ok += 1;
        }
        if (i === 0) {
          por[id].svg = m.svg;
          por[id].label_overlap = m.label_overlap;
        }
      }
      if (i === 0) {
        cargaEsm = carga.esm.gzip_bytes;
        cargaElk = { gzip: carga.elk.gzip_bytes, arquivos: carga.elk.arquivos };
      }
    } catch (e) {
      for (const id of ativos) por[id].erro = `falha da página: ${String((e as Error).message).slice(0, 200)}`;
    } finally {
      await context.close();
    }
  }
  for (const id of ids) {
    const a = por[id].amostras_ms;
    if (a.length) {
      por[id].p95_ms = round(p95(a));
      por[id].mediana_ms = round(mediana(a) as number);
    }
  }
  const kb = (n: number) => round(n / 1024, 1);
  return {
    rotulo,
    motor,
    config,
    execucoes_pedidas: runs,
    por_conjunto: por,
    aquecimento_p95_ms: aquecimentos.length ? round(p95(aquecimentos)) : null,
    ...(motor === 'iife' ? {} : { carga_esm_gzip_kb: kb(cargaEsm) }),
    ...(motor === 'esm-elk' ? { carga_elk_gzip_kb: kb(cargaElk.gzip), carga_elk_arquivos: cargaElk.arquivos } : {}),
  };
}

// ------------------------------------------------------------------ resultado
const loadInicio = os.loadavg();
const relatorio: Record<string, any> = {
  aviso: 'local, carga alta, indicativo, não valida orçamento',
  medido_em: new Date().toISOString(),
  requisitos: ['20.13', '20.9', '20.10'],
  demanda: DEMANDA,
  metodo: {
    cpu_throttling_rate: CPU_RATE,
    execucoes: RUNS,
    p95: 'nearest-rank sobre as amostras ordenadas',
    por_execucao: 'contexto novo do navegador por execução; uma renderização de aquecimento (diagrama de 2 nós, fora da medida); depois um mermaid.render por conjunto, em sequência',
    tempo: 'performance.now() em volta de `await mermaid.render`, com CPU 4x (CDP Emulation.setCPUThrottlingRate)',
    limites_do_kit: LIMITES_ELEVADOS,
    observacao_svg_e_overlap: 'SVG e label-overlap vêm da primeira execução de cada caso (determinísticos para o mesmo texto e configuração)',
    label_overlap: 'mesmo oráculo de tests/browser/label-overlap.spec.ts: nó g.node cobrindo o rótulo de um g.cluster',
  },
};

function maquina() {
  const cpus = os.cpus();
  return {
    plataforma: `${os.platform()} ${os.arch()}`,
    so: os.release(),
    cpus: { modelo: cpus[0]?.model ?? 'desconhecido', quantidade: cpus.length },
    memoria_total_gb: round(os.totalmem() / 1024 ** 3, 1),
    memoria_livre_gb_no_fim: round(os.freemem() / 1024 ** 3, 1),
    node: process.version,
  };
}
function fechar(browserVersion: string) {
  relatorio.maquina = { ...maquina(), chromium: browserVersion };
  relatorio.load_average = {
    inicio: loadInicio.map((n) => round(n, 2)),
    fim: os.loadavg().map((n) => round(n, 2)),
    ordem: '1, 5 e 15 minutos (os.loadavg)',
  };
  relatorio.medido_ate = new Date().toISOString();
  gravarJson(SAIDA, relatorio);
}

const kbArq = (caminho: string) => round(gzipBytes(readFileSync(caminho)) / 1024, 1);

test.describe.configure({ mode: 'serial' });

test.beforeAll(() => {
  relatorio.conjuntos = preparados.map(({ texto: _t, ...resto }) => resto);
  relatorio.referencia = {
    mermaid_vendorizado_gzip_kb: kbArq(VENDOR),
    mermaid_vendorizado_versao: [...readFileSync(VENDOR, 'utf8').matchAll(/version:"(\d+\.\d+\.\d+)"/g)].map((m) => m[1]).find((v) => v !== '0.0.0') ?? 'desconhecida',
  };
});

test('S1: um mermaid.render por Conjunto_Expandido e modelo linear', async ({ browser }) => {
  test.skip(ONLY === 's2', 'SPIKE_ONLY=s2');
  test.setTimeout(0);
  const ids = preparados.map((c) => c.id);
  const caso = await medirCaso(browser, 'S1 linha de base: Mermaid vendorizado, dagre, limites elevados', 'iife', BASE, ids);
  const pontos = ids
    .map((id) => ({ id, nos: porId(id).nos_visiveis.total, caracteres: porId(id).caracteres, p95: caso.por_conjunto[id].p95_ms }))
    .filter((p): p is { id: string; nos: number; caracteres: number; p95: number } => p.p95 !== null);

  // Least squares of p95 (ms) over visible nodes (clusters + nodes + subtasks), and over characters.
  const mqo = (xs: number[], ys: number[]) => {
    const n = xs.length;
    if (n < 2) return null;
    const mx = xs.reduce((a, b) => a + b, 0) / n;
    const my = ys.reduce((a, b) => a + b, 0) / n;
    const sxx = xs.reduce((a, x) => a + (x - mx) ** 2, 0);
    const sxy = xs.reduce((a, x, i) => a + (x - mx) * (ys[i] - my), 0);
    const syy = ys.reduce((a, y) => a + (y - my) ** 2, 0);
    if (sxx === 0) return null;
    const b = sxy / sxx;
    const a = my - b * mx;
    return { fixo_ms: round(a), inclinacao_ms: round(b, 3), r2: syy === 0 ? 1 : round((sxy * sxy) / (sxx * syy), 4) };
  };
  const previsao = { fixo_ms: 200, ms_por_no_min: 15, ms_por_no_max: 17 };
  relatorio.s1 = {
    caso,
    modelo_linear: {
      previsao_do_design: `${previsao.fixo_ms} ms fixos mais ${previsao.ms_por_no_min} a ${previsao.ms_por_no_max} ms por nó visível (CPU 4x), design.md, Tempos por passo`,
      no_visivel: 'clusters + nós das raias expandidas + subtarefas expandidas',
      comparacao: pontos.map((p) => ({
        conjunto: p.id,
        nos_visiveis: p.nos,
        previsto_min_ms: previsao.fixo_ms + previsao.ms_por_no_min * p.nos,
        previsto_max_ms: previsao.fixo_ms + previsao.ms_por_no_max * p.nos,
        medido_p95_ms: p.p95,
        razao_medido_sobre_previsto_max: round(p.p95 / (previsao.fixo_ms + previsao.ms_por_no_max * p.nos), 2),
      })),
      ajuste_por_nos: mqo(pontos.map((p) => p.nos), pontos.map((p) => p.p95)),
      ajuste_por_caracteres: mqo(pontos.map((p) => p.caracteres), pontos.map((p) => p.p95)),
      ms_por_no_entre_pares: pontos.slice(1).map((p, i) => ({
        de: pontos[i].id,
        para: p.id,
        ms_por_no_adicional: pontos[i].nos === p.nos ? null : round((p.p95 - pontos[i].p95) / (p.nos - pontos[i].nos), 2),
      })),
    },
  };
  fechar(browser.version());
  expect(Object.keys(caso.por_conjunto)).toHaveLength(ids.length);
});

test('S2: limites padrão do Mermaid (50.000 caracteres, 500 arestas) contra os elevados', async ({ browser }) => {
  test.skip(ONLY === 's1', 'SPIKE_ONLY=s1');
  test.setTimeout(0);
  const padrao = { ...BASE, maxTextSize: 50_000, maxEdges: 500 };
  // 2 runs are enough: the outcome (accepted or rejected) is deterministic; p95 is not the point here.
  const caso = await medirCaso(browser, 'S2 limites padrão do Mermaid (50.000 / 500)', 'iife', padrao, ['completo', 'completo_subtarefas'], 2);
  relatorio.s2 = { ...(relatorio.s2 ?? {}), limites: { padrao_do_mermaid: caso, elevados_do_kit: LIMITES_ELEVADOS, elevados_medidos_em: 's1.caso' } };
  fechar(browser.version());
});

test('S2: htmlLabels false e flowchart.curve (Mermaid vendorizado, dagre)', async ({ browser }) => {
  test.skip(ONLY === 's1', 'SPIKE_ONLY=s1');
  test.setTimeout(0);
  const ids = ['cinco_raias', 'completo'];
  const variantes: Array<[string, ConfigMermaid]> = [
    ['htmlLabels: false', comFlowchart({ htmlLabels: false }, { htmlLabels: false })],
    ['curve: linear', comFlowchart({ curve: 'linear' })],
    ['curve: step', comFlowchart({ curve: 'step' })],
    ['curve: basis (padrão do Mermaid, controle)', comFlowchart({ curve: 'basis' })],
  ];
  const casos: ResultadoCaso[] = [];
  for (const [rotulo, config] of variantes) casos.push(await medirCaso(browser, `S2 ${rotulo}`, 'iife', config, ids));
  relatorio.s2 = { ...(relatorio.s2 ?? {}), configuracao: casos, controle: 's1.caso (htmlLabels padrão, curve padrão)' };
  fechar(browser.version());
});

test('S2: layout elk contra dagre (Mermaid ESM) e custo em kB gzip', async ({ browser }) => {
  test.skip(ONLY === 's1', 'SPIKE_ONLY=s1');
  test.setTimeout(0);
  if (!TEM_ELK) {
    relatorio.s2 = { ...(relatorio.s2 ?? {}), elk: { pulado: `pacotes ausentes em SPIKE_ELK_DIR (veja o cabeçalho do spec)` } };
    fechar(browser.version());
    return;
  }
  const versao = (dist: string) => JSON.parse(readFileSync(join(dist, '..', 'package.json'), 'utf8')).version as string;
  const ids = ['visao_geral', 'cinco_raias', 'completo'];
  const dagre = await medirCaso(browser, 'S2 dagre no Mermaid ESM (controle do ELK)', 'esm', { ...BASE, layout: 'dagre' }, ids);
  const elk = await medirCaso(browser, 'S2 layout: elk (@mermaid-js/layout-elk)', 'esm-elk', { ...BASE, layout: 'elk' }, ids);
  // The heavy case with fewer runs: ELK is expected to be slower and the machine is loaded.
  const pesadoDagre = await medirCaso(browser, 'S2 dagre ESM, completo com Subtarefas', 'esm', { ...BASE, layout: 'dagre' }, ['completo_subtarefas'], Math.min(RUNS, 3));
  const pesadoElk = await medirCaso(browser, 'S2 elk, completo com Subtarefas', 'esm-elk', { ...BASE, layout: 'elk' }, ['completo_subtarefas'], Math.min(RUNS, 3));
  relatorio.s2 = {
    ...(relatorio.s2 ?? {}),
    elk: {
      versoes: { mermaid_esm: versao(ELK_MERMAID), layout_elk: versao(ELK_PKG) },
      custo_gzip_kb: {
        elk_pacote_carregado_no_render: elk.carga_elk_gzip_kb ?? null,
        elk_arquivos: elk.carga_elk_arquivos ?? null,
        mermaid_esm_carregado_com_dagre: dagre.carga_esm_gzip_kb ?? null,
        mermaid_vendorizado_iife: relatorio.referencia?.mermaid_vendorizado_gzip_kb ?? null,
        nota: 'gzip nível 9 de cada arquivo servido ao navegador até o fim das medições da primeira execução (carga dinâmica por diagrama e layout); compara o que o ELK acrescenta, não o bundle único do site',
      },
      casos: [dagre, elk, pesadoDagre, pesadoElk],
    },
  };
  fechar(browser.version());
});
