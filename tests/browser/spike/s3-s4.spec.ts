// SPDX-License-Identifier: MIT
// Spike S3 and S4 (Requirements 20.9, 20.13). Same harness as tests/browser/spike/s1-s2.spec.ts: real Mermaid texts of the
// `feature` demand (gerarGrafo + gerarDiagramaExpandido), CPU 4x, fresh browser context per run, p95 over the runs.
// No limit is asserted: the numbers go to docs/spike-fluxos/s3-s4.json.
//
// S3: does the main page keep answering the mouse while Mermaid renders? Cases: Mermaid on the main thread (control of the
//     problem), Mermaid in a `sandbox="allow-scripts"` iframe (no allow-same-origin) and Mermaid in a Worker (expected: not viable).
//     Mouse response = (a) delay between the browser timestamp of a mousemove and its handler, (b) round trip of the
//     Playwright `mouse.move` (it waits for the page to handle the event), (c) long tasks and (d) the largest rAF gap.
// S4: SVG cache per Conjunto_Expandido (hit against miss, memory) and idle prefetch (requestIdleCallback) of the next raias
//     after the Visão geral shows up (CPU, memory, mouse response during the prefetch, time saved on the click).
//
// Requires a built site (vendored Mermaid in site/dist/vendor/mermaid): KIT_LOCALES=pt-BR npm run build
// Optional: SPIKE_RUNS=<n> (default 10), SPIKE_ONLY=s3|s4. Heavy cases (about 10 s per render) use at most 3 runs, recorded as `execucoes_pedidas`.
import { chromium, expect, test } from '@playwright/test';
import type { Browser, CDPSession, Page } from '@playwright/test';
import { existsSync, readFileSync } from 'node:fs';
import os from 'node:os';
import { resolve } from 'node:path';
import { gerarGrafo } from '../../../lib/flow-graph';
import type { ConjuntoExpandido } from '../../../lib/flow-graph/expansao';
import { gerarDiagramaExpandido } from '../../../lib/flow-mermaid';
import { MERMAID_MAX_EDGES, MERMAID_MAX_TEXT_SIZE } from '../../../lib/flow-mermaid/limites';
import { guideDir, loadGuideDoc } from '../../../lib/guide';
import { CPU_RATE, RUNS as RUNS_PADRAO, gravarJson, p95, round, throttleCpu } from '../helpers/medicao';

const SAIDA = 'docs/spike-fluxos/s3-s4.json';
const DEMANDA = 'feature';
const RUNS = Number(process.env.SPIKE_RUNS ?? RUNS_PADRAO);
const RUNS_PESADO = Math.min(RUNS, 3);
const ONLY = process.env.SPIKE_ONLY;
const VENDOR = 'site/dist/vendor/mermaid/mermaid.min.js';
const ALVO_MS = 100;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

if (!existsSync(VENDOR)) throw new Error('site/dist ausente: rode KIT_LOCALES=pt-BR npm run build');

// ------------------------------------------------------------------ textos reais
const doc = loadGuideDoc(guideDir(resolve('content')));
const grafo = gerarGrafo(doc, DEMANDA);
const todasAsRaias = grafo.raias.map((r) => r.id);
const textoDe = (raias: string[], todasSubtarefas = false): string => {
  const conj: ConjuntoExpandido = { raias: new Set(raias), subtarefas: new Set(), todasSubtarefas };
  return gerarDiagramaExpandido(grafo, conj).texto;
};
const nosPorRaia = (id: string) => grafo.nos.filter((n) => n.raia === id).length;
const maiorRaia = [...todasAsRaias].sort((a, b) => nosPorRaia(b) - nosPorRaia(a))[0];
const PROXIMAS = todasAsRaias.slice(0, 3); // raias "mais prováveis": as 3 primeiras na ordem de exibição

const TEXTOS: Record<string, { descricao: string; texto: string }> = {
  visao_geral: { descricao: 'Visão geral (todas as raias recolhidas)', texto: textoDe([]) },
  uma_raia: { descricao: `1 raia expandida (a maior: ${maiorRaia})`, texto: textoDe([maiorRaia]) },
  cinco_raias: { descricao: '5 raias expandidas', texto: textoDe(todasAsRaias.slice(0, 5)) },
  completo: { descricao: 'completo (todas as raias, sem Subtarefas)', texto: textoDe(todasAsRaias) },
  completo_subtarefas: { descricao: 'completo com Subtarefas', texto: textoDe(todasAsRaias, true) },
  ...Object.fromEntries(PROXIMAS.map((r) => [`raia_${r}`, { descricao: `1 raia expandida (${r})`, texto: textoDe([r]) }])),
};

// The bundle goes inline in the iframe srcdoc: a sandboxed iframe has an opaque origin and Chromium blocks its script request
// to the loopback server (CORS / Local Network Access: "Permission was denied for this request to access the `loopback` address space").
const MERMAID_INLINE = readFileSync(VENDOR, 'utf8').replace(/<\/script/gi, '<\\/script');

const LIMITES_ELEVADOS = { maxTextSize: MERMAID_MAX_TEXT_SIZE, maxEdges: MERMAID_MAX_EDGES };
const CONFIG = { startOnLoad: false, securityLevel: 'strict', theme: 'default', ...LIMITES_ELEVADOS, flowchart: { useMaxWidth: false } };

// ------------------------------------------------------------------ estatística
const pct = (xs: number[], q = 0.95) => (xs.length ? xs.slice().sort((a, b) => a - b)[Math.max(0, Math.ceil(q * xs.length) - 1)] : null);
const mediana = (xs: number[]) => {
  const s = [...xs].sort((a, b) => a - b);
  return s.length ? s[Math.floor((s.length - 1) / 2)] : null;
};
const maximo = (xs: number[]) => (xs.length ? Math.max(...xs) : null);
const r1 = (n: number | null) => (n === null ? null : round(n));
const resumo = (xs: number[]) => ({ n: xs.length, mediana: r1(mediana(xs)), p95: xs.length ? round(p95(xs)) : null, max: r1(maximo(xs)), amostras: xs.map((x) => round(x, 2)) });

// ------------------------------------------------------------------ instrumentação da página
interface Metricas {
  [k: string]: number;
}
interface Contexto {
  page: Page;
  cdp: CDPSession;
  fase: () => string;
  terminou: () => boolean;
  fim: () => { ms?: number; erro?: string; extra?: unknown } | undefined;
  snaps: Record<string, { heap_bytes: number; metricas: Metricas }>;
  roundtrips: Array<{ fase: string; ms: number }>;
}

const HTML_BASE = '<!doctype html><meta charset="utf-8"><body style="margin:0"><script src="/vendor/mermaid/mermaid.min.js"></script></body>';
const HTML_VAZIO = '<!doctype html><meta charset="utf-8"><body style="margin:0"></body>';

async function abrir(browser: Browser, html: string): Promise<{ ctx: Contexto; fechar: () => Promise<void> }> {
  const context = await browser.newContext();
  const page = await context.newPage();
  const cdp = await throttleCpu(page, CPU_RATE);
  await cdp.send('Performance.enable');
  let fase = 'inicio';
  let terminou = false;
  let fim: { ms?: number; erro?: string; extra?: unknown } | undefined;
  const snaps: Contexto['snaps'] = {};
  await page.route('**/__spike/s3s4.html', (route) => route.fulfill({ contentType: 'text/html', body: html }));
  // Page-to-Node signals. Phase changes take a heap/CPU snapshot (after a forced GC); round trips taken meanwhile are tagged 'transicao'.
  await page.exposeFunction('__nota', async (nome: string, fimDados?: { ms?: number; erro?: string; extra?: unknown }) => {
    fase = 'transicao';
    if (nome !== 'sem_snapshot' && nome !== 'fim') {
      await cdp.send('HeapProfiler.collectGarbage');
      const heap = await cdp.send('Runtime.getHeapUsage');
      const m = await cdp.send('Performance.getMetrics');
      snaps[nome] = { heap_bytes: heap.usedSize, metricas: Object.fromEntries(m.metrics.map((x) => [x.name, x.value])) };
    }
    if (nome === 'fim') {
      fim = fimDados;
      terminou = true;
    }
    fase = nome;
  });
  const roundtrips: Contexto['roundtrips'] = [];
  await page.goto('/__spike/s3s4.html', { waitUntil: 'load' });
  if (html.includes('mermaid.min.js')) await page.waitForFunction(() => (window as any).mermaid !== undefined, undefined, { timeout: 120_000 });
  return {
    ctx: { page, cdp, fase: () => fase, terminou: () => terminou, fim: () => fim, snaps, roundtrips },
    fechar: () => context.close(),
  };
}

/** Event delay (browser timestamp to handler), long tasks and rAF gaps, tagged by the phase set in `window.__fase`. */
async function instrumentar(page: Page) {
  await page.evaluate(() => {
    const w = window as any;
    w.__fase = 'inicio';
    w.__mov = [] as Array<{ fase: string; lat: number }>;
    w.__lt = [] as Array<{ fase: string; dur: number }>;
    w.__raf = [] as Array<{ fase: string; gap: number }>;
    addEventListener('mousemove', (e) => w.__mov.push({ fase: w.__fase, lat: performance.now() - e.timeStamp }), true);
    try {
      new PerformanceObserver((l) => {
        for (const e of l.getEntries()) w.__lt.push({ fase: w.__fase, dur: e.duration });
      }).observe({ entryTypes: ['longtask'] });
    } catch {
      /* longtask unsupported */
    }
    let ultimo = performance.now();
    const tick = () => {
      const n = performance.now();
      w.__raf.push({ fase: w.__fase, gap: n - ultimo });
      ultimo = n;
      if (!w.__parar) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

/** Moves the mouse every ~20 ms until the page signals the end. Returns nothing: round trips are stored in ctx. */
async function moverAteTerminar(ctx: Contexto, limiteMs = 900_000) {
  const ini = performance.now();
  let i = 0;
  while (!ctx.terminou() && performance.now() - ini < limiteMs) {
    const f = ctx.fase();
    const t = performance.now();
    await ctx.page.mouse.move(100 + (i % 50) * 10, 150 + (i % 9) * 30);
    ctx.roundtrips.push({ fase: f, ms: performance.now() - t });
    i++;
    await sleep(20);
  }
}

interface CapturaFase {
  moves: number;
  evento_handler_ms: ReturnType<typeof resumoSimples>;
  roundtrip_mouse_ms: ReturnType<typeof resumoSimples>;
  long_tasks: { quantidade: number; max_ms: number | null; soma_ms: number };
  raf_gap_max_ms: number | null;
}
const resumoSimples = (xs: number[]) => ({ p95: xs.length ? round(p95(xs)) : null, max: r1(maximo(xs)) });

async function capturar(ctx: Contexto, fases: string[]): Promise<Record<string, CapturaFase>> {
  const dados = await ctx.page.evaluate(() => {
    const w = window as any;
    w.__parar = true;
    return { mov: w.__mov, lt: w.__lt, raf: w.__raf } as { mov: Array<{ fase: string; lat: number }>; lt: Array<{ fase: string; dur: number }>; raf: Array<{ fase: string; gap: number }> };
  });
  const out: Record<string, CapturaFase> = {};
  for (const f of fases) {
    const lat = dados.mov.filter((m) => m.fase === f).map((m) => m.lat);
    const rt = ctx.roundtrips.filter((m) => m.fase === f).map((m) => m.ms);
    const lt = dados.lt.filter((m) => m.fase === f).map((m) => m.dur);
    const gaps = dados.raf.filter((m) => m.fase === f).map((m) => m.gap);
    out[f] = {
      moves: rt.length,
      evento_handler_ms: resumoSimples(lat),
      roundtrip_mouse_ms: resumoSimples(rt),
      long_tasks: { quantidade: lt.length, max_ms: r1(maximo(lt)), soma_ms: round(lt.reduce((a, b) => a + b, 0)) },
      raf_gap_max_ms: r1(maximo(gaps)),
    };
  }
  return out;
}

/** Across runs: p95 and worst of the per-run maxima, so the target "answers in < 100 ms" is read against the worst moment of each run. */
function agregarFase(runs: CapturaFase[]) {
  const pick = (f: (c: CapturaFase) => number | null) => runs.map(f).filter((x): x is number => x !== null);
  const evMax = pick((c) => c.evento_handler_ms.max);
  const rtMax = pick((c) => c.roundtrip_mouse_ms.max);
  const ltMax = pick((c) => c.long_tasks.max_ms);
  const rafMax = pick((c) => c.raf_gap_max_ms);
  const resposta = pick((c) => Math.max(c.evento_handler_ms.max ?? 0, c.roundtrip_mouse_ms.max ?? 0));
  return {
    execucoes: runs.length,
    moves_por_execucao_mediana: mediana(runs.map((c) => c.moves)),
    evento_handler_max_ms: { p95_das_execucoes: r1(pct(evMax)), pior: r1(maximo(evMax)) },
    roundtrip_mouse_max_ms: { p95_das_execucoes: r1(pct(rtMax)), pior: r1(maximo(rtMax)) },
    long_task_max_ms: { p95_das_execucoes: r1(pct(ltMax)), pior: r1(maximo(ltMax)) },
    raf_gap_max_ms: { p95_das_execucoes: r1(pct(rafMax)), pior: r1(maximo(rafMax)) },
    resposta_do_mouse_pior_momento_ms: { p95_das_execucoes: r1(pct(resposta)), pior: r1(maximo(resposta)) },
    atende_alvo_menor_que_100ms: (pct(resposta) ?? Infinity) < ALVO_MS,
    por_execucao: runs,
  };
}

// ------------------------------------------------------------------ resultado
const loadInicio = os.loadavg();
const relatorio: Record<string, any> = {
  aviso: 'local, carga alta, indicativo, não valida orçamento',
  medido_em: new Date().toISOString(),
  requisitos: ['20.9', '20.13'],
  demanda: DEMANDA,
  metodo: {
    cpu_throttling_rate: CPU_RATE,
    execucoes: RUNS,
    execucoes_casos_pesados: RUNS_PESADO,
    p95: 'nearest-rank sobre as amostras ordenadas',
    por_execucao: 'contexto novo do navegador por execução, CPU 4x (CDP Emulation.setCPUThrottlingRate), uma renderização de aquecimento (diagrama de 2 nós, fora da medida)',
    alvo_s3: `resposta do mouse abaixo de ${ALVO_MS} ms durante um render de cerca de 3 s`,
    resposta_do_mouse: {
      evento_handler_ms: 'performance.now() no handler de mousemove menos event.timeStamp (atraso entre o evento chegar ao navegador e a thread principal tratá-lo)',
      roundtrip_mouse_ms: 'tempo de page.mouse.move (CDP Input.dispatchMouseEvent), que só retorna depois que a página trata o evento; um mousemove a cada ~20 ms',
      long_tasks: 'PerformanceObserver longtask (> 50 ms) do documento principal',
      raf_gap_max_ms: 'maior intervalo entre quadros requestAnimationFrame do documento principal',
      resposta_do_mouse_pior_momento_ms: 'por execução, o maior entre evento_handler e roundtrip; o p95 entre execuções é comparado ao alvo',
    },
    limites_do_kit: LIMITES_ELEVADOS,
    iframe_carga_do_mermaid: 'inline no srcdoc: com origem opaca (sandbox sem allow-same-origin) o Chromium bloqueou o <script src> do servidor de loopback ("Permission was denied for this request to access the `loopback` address space"); o bundle de ~3 MB vai no próprio srcdoc e o tempo de carga fica fora da medida (aquecimento)',
  },
  conjuntos: Object.fromEntries(Object.entries(TEXTOS).map(([id, t]) => [id, { descricao: t.descricao, caracteres: t.texto.length }])),
};

function fechar(browserVersion: string) {
  const cpus = os.cpus();
  relatorio.maquina = {
    plataforma: `${os.platform()} ${os.arch()}`,
    so: os.release(),
    cpus: { modelo: cpus[0]?.model ?? 'desconhecido', quantidade: cpus.length },
    memoria_total_gb: round(os.totalmem() / 1024 ** 3, 1),
    memoria_livre_gb_no_fim: round(os.freemem() / 1024 ** 3, 1),
    node: process.version,
    chromium: browserVersion,
  };
  relatorio.load_average = { inicio: loadInicio.map((n) => round(n, 2)), fim: os.loadavg().map((n) => round(n, 2)), ordem: '1, 5 e 15 minutos (os.loadavg)' };
  relatorio.medido_ate = new Date().toISOString();
  gravarJson(SAIDA, relatorio);
}

test.describe.configure({ mode: 'serial' });

// ------------------------------------------------------------------ S3
type ModoS3 = 'principal' | 'iframe' | 'controle';

/** One run: renders `id` in the chosen mode while the mouse moves. */
async function rodarS3(browser: Browser, modo: ModoS3, id: string) {
  const { ctx, fechar: fecharCtx } = await abrir(browser, modo === 'controle' ? HTML_VAZIO : modo === 'principal' ? HTML_BASE : HTML_VAZIO);
  try {
    const { page } = ctx;
    await instrumentar(page);
    let iframe: { processo_proprio: boolean | null; throttling_do_iframe: string; alvos: Record<string, number> } | undefined;
    if (modo === 'iframe') {
      // The iframe is created with `sandbox="allow-scripts"` only (opaque origin). It sits off screen: the mouse must hit the parent document.
      await page.evaluate(
        ({ codigo }) =>
          new Promise<void>((resolve) => {
            const f = document.createElement('iframe');
            f.id = 'sbx';
            f.setAttribute('sandbox', 'allow-scripts');
            f.style.cssText = 'position:absolute;left:-5000px;top:0;width:1200px;height:800px;border:0';
            f.srcdoc =
              '<!doctype html><meta charset="utf-8"><body><script>' + codigo + '<\/script><script>' +
              'addEventListener("message", async (ev) => { const d = ev.data; if (d.tipo !== "render") return;' +
              ' try { mermaid.initialize(d.config); const t = performance.now(); const out = await mermaid.render("sbx-" + d.n, d.texto);' +
              ' parent.postMessage({ tipo: "fim", id: d.id, ms: performance.now() - t, bytes: out.svg.length }, "*"); }' +
              ' catch (e) { parent.postMessage({ tipo: "erro", id: d.id, erro: String((e && e.message) || e) }, "*"); } });' +
              'parent.postMessage({ tipo: "pronto", origem: String(location.origin), mermaid: typeof mermaid }, "*");<\/script>';
            addEventListener('message', (ev) => {
              if (ev.data?.tipo === 'pronto') resolve();
            });
            document.body.appendChild(f);
          }),
        { codigo: MERMAID_INLINE },
      );
      // Is the iframe in its own process? Then CPU 4x must be applied to it as well, otherwise the comparison is unfair.
      const bcdp = await browser.newBrowserCDPSession();
      const alvos = (await bcdp.send('Target.getTargets')).targetInfos;
      await bcdp.detach();
      const contagem: Record<string, number> = {};
      for (const a of alvos) contagem[a.type] = (contagem[a.type] ?? 0) + 1;
      let proprio: boolean | null = null;
      let thr = 'não aplicado';
      const filho = page.frames().find((f) => f !== page.mainFrame());
      if (filho) {
        try {
          const c2 = await page.context().newCDPSession(filho);
          await c2.send('Emulation.setCPUThrottlingRate', { rate: CPU_RATE });
          proprio = true;
          thr = 'CPU 4x aplicado ao alvo do iframe (processo próprio)';
        } catch (e) {
          proprio = false;
          thr = `iframe no mesmo processo da página, o throttling da página já vale (${String((e as Error).message).slice(0, 80)})`;
        }
      }
      iframe = { processo_proprio: proprio, throttling_do_iframe: thr, alvos: contagem };
      // Warm-up inside the iframe.
      await page.evaluate(
        ({ config }) =>
          new Promise<void>((resolve) => {
            const f = document.getElementById('sbx') as HTMLIFrameElement;
            const h = (ev: MessageEvent) => {
              if (ev.data?.tipo === 'fim' || ev.data?.tipo === 'erro') {
                removeEventListener('message', h);
                resolve();
              }
            };
            addEventListener('message', h);
            f.contentWindow!.postMessage({ tipo: 'render', id: 'aq', n: 0, texto: 'flowchart LR\n  A["a"] --> B["b"]\n', config }, '*');
          }),
        { config: CONFIG },
      );
    } else if (modo === 'principal') {
      await page.evaluate(async (config) => {
        const m = (window as any).mermaid;
        m.initialize(config);
        await m.render('aq', 'flowchart LR\n  A["a"] --> B["b"]\n');
      }, CONFIG);
    }
    await page.waitForTimeout(300);
    // Start the work without awaiting it, then move the mouse until it signals the end.
    await page.evaluate(
      ({ modo, texto, config }) => {
        const w = window as any;
        w.__fase = 'render';
        void w.__nota('sem_snapshot').then(async () => {
          w.__fase = 'render';
          const t0 = performance.now();
          if (modo === 'controle') {
            await new Promise((r) => setTimeout(r, 3000));
            await w.__nota('fim', { ms: performance.now() - t0 });
          } else if (modo === 'principal') {
            try {
              const out = await w.mermaid.render('s3', texto);
              await w.__nota('fim', { ms: performance.now() - t0, extra: { bytes: out.svg.length } });
            } catch (e) {
              await w.__nota('fim', { erro: String((e as Error)?.message ?? e) });
            }
          } else {
            const f = document.getElementById('sbx') as HTMLIFrameElement;
            addEventListener('message', (ev) => {
              if (ev.data?.tipo === 'fim') void w.__nota('fim', { ms: performance.now() - t0, extra: { ms_no_iframe: ev.data.ms, bytes: ev.data.bytes } });
              if (ev.data?.tipo === 'erro') void w.__nota('fim', { erro: ev.data.erro });
            });
            f.contentWindow!.postMessage({ tipo: 'render', id: 's3', n: 1, texto, config }, '*');
          }
        });
      },
      { modo, texto: TEXTOS[id]?.texto ?? '', config: CONFIG },
    );
    // The page tags the first note as 'sem_snapshot' (fase becomes that name); the mouse loop starts right away.
    await sleep(50);
    await moverAteTerminar(ctx);
    // roundtrips taken before the note arrived carry the previous phase name; keep only render-time ones.
    for (const r of ctx.roundtrips) if (r.fase === 'sem_snapshot' || r.fase === 'inicio') r.fase = 'render';
    const cap = await capturar(ctx, ['render']);
    await page.evaluate(() => undefined);
    return { captura: cap.render, fim: ctx.fim(), iframe };
  } finally {
    await fecharCtx();
  }
}

async function medirS3(browser: Browser, modo: ModoS3, id: string, runs: number) {
  const execs: Array<Awaited<ReturnType<typeof rodarS3>>> = [];
  const erros: string[] = [];
  for (let i = 0; i < runs; i++) {
    try {
      const r = await rodarS3(browser, modo, id);
      if (r.fim?.erro) erros.push(r.fim.erro);
      else execs.push(r);
    } catch (e) {
      erros.push(`falha da página: ${String((e as Error).message).slice(0, 200)}`);
    }
  }
  const ms = execs.map((e) => e.fim?.ms).filter((x): x is number => typeof x === 'number');
  return {
    modo,
    conjunto: id,
    execucoes_pedidas: runs,
    execucoes_ok: execs.length,
    erros,
    render_p95_ms: ms.length ? round(p95(ms)) : null,
    render_mediana_ms: r1(mediana(ms)),
    render_amostras_ms: ms.map((x) => round(x)),
    iframe: execs[0]?.iframe ?? null,
    resposta_do_mouse: agregarFase(execs.map((e) => e.captura)),
  };
}

test('S3: iframe com sandbox sem allow-same-origin, Mermaid na thread principal e controle sem render', async ({ browser }) => {
  test.skip(ONLY === 's4', 'SPIKE_ONLY=s4');
  test.setTimeout(0);
  const controle = await medirS3(browser, 'controle', 'completo', RUNS_PESADO);
  const principal = await medirS3(browser, 'principal', 'completo', RUNS);
  const iframe = await medirS3(browser, 'iframe', 'completo', RUNS);
  const principalPesado = await medirS3(browser, 'principal', 'completo_subtarefas', RUNS_PESADO);
  const iframePesado = await medirS3(browser, 'iframe', 'completo_subtarefas', RUNS_PESADO);
  // Same iframe, but with Chromium asked to give sandboxed iframes their own process (IsolateSandboxedIframes).
  const isolado = await chromium.launch({ args: ['--enable-features=IsolateSandboxedIframes'] });
  let isoCompleto: Awaited<ReturnType<typeof medirS3>>;
  let isoPesado: Awaited<ReturnType<typeof medirS3>>;
  try {
    isoCompleto = await medirS3(isolado, 'iframe', 'completo', RUNS);
    isoPesado = await medirS3(isolado, 'iframe', 'completo_subtarefas', RUNS_PESADO);
  } finally {
    await isolado.close();
  }
  relatorio.s3 = {
    alvo: relatorio.metodo.alvo_s3,
    nota_sobre_render_de_3s: 'o conjunto `completo` leva cerca de 3 a 4 s com CPU 4x (s1-s2.json); `completo_subtarefas` leva cerca de 10 s e entra com menos execuções',
    casos: { controle_sem_render: controle, principal_completo: principal, iframe_sandbox_completo: iframe, principal_completo_subtarefas: principalPesado, iframe_sandbox_completo_subtarefas: iframePesado, iframe_sandbox_processo_isolado_completo: isoCompleto, iframe_sandbox_processo_isolado_completo_subtarefas: isoPesado },
    nota_isolado: 'os dois últimos casos usam um Chromium lançado com --enable-features=IsolateSandboxedIframes, que pede processo próprio para iframes com sandbox; veja `iframe.processo_proprio` em cada caso',
  };
  fechar(browser.version());
  expect(relatorio.s3.casos).toBeTruthy();
});

test('S3: Mermaid em Worker', async ({ browser }) => {
  test.skip(ONLY === 's4', 'SPIKE_ONLY=s4');
  test.setTimeout(0);
  const { ctx, fechar: fecharCtx } = await abrir(browser, HTML_VAZIO);
  try {
    const r = await ctx.page.evaluate(
      async ({ origem, texto, config }) => {
        const script = `
          const rel = { tipo: typeof self, document: typeof document, window: typeof window, domparser: typeof DOMParser, offscreenCanvas: typeof OffscreenCanvas };
          const passos = [];
          try { importScripts(${JSON.stringify(origem + '/vendor/mermaid/mermaid.min.js')}); passos.push({ etapa: 'importScripts', ok: true, mermaid: typeof self.mermaid }); }
          catch (e) { passos.push({ etapa: 'importScripts', ok: false, erro: String(e && e.stack || e).slice(0, 400) }); }
          (async () => {
            if (typeof self.mermaid !== 'undefined' && self.mermaid) {
              try { self.mermaid.initialize(${JSON.stringify(config)}); passos.push({ etapa: 'initialize', ok: true }); } catch (e) { passos.push({ etapa: 'initialize', ok: false, erro: String(e && e.stack || e).slice(0, 400) }); }
              try { const out = await self.mermaid.render('w', ${JSON.stringify(texto)}); passos.push({ etapa: 'render', ok: true, bytes: out.svg.length }); } catch (e) { passos.push({ etapa: 'render', ok: false, erro: String(e && e.stack || e).slice(0, 400) }); }
            }
            postMessage({ rel, passos });
          })();`;
        const url = URL.createObjectURL(new Blob([script], { type: 'text/javascript' }));
        return await new Promise<any>((resolve) => {
          const w = new Worker(url);
          const t = setTimeout(() => resolve({ timeout: true }), 60_000);
          w.onmessage = (ev) => {
            clearTimeout(t);
            resolve(ev.data);
          };
          w.onerror = (ev) => {
            clearTimeout(t);
            resolve({ erro_do_worker: String(ev.message), arquivo: ev.filename, linha: ev.lineno });
          };
        });
      },
      { origem: new URL(ctx.page.url()).origin, texto: TEXTOS.uma_raia.texto, config: CONFIG },
    );
    const falhou = r.erro_do_worker !== undefined || r.timeout === true || (r.passos ?? []).some((p: any) => p.ok === false);
    relatorio.s3 = {
      ...(relatorio.s3 ?? {}),
      worker: {
        viavel: !falhou,
        conjunto_testado: 'uma_raia',
        evidencia: r,
        leitura: 'o bundle do Mermaid depende de document/window (DOM) para o layout e a limpeza do SVG; um Worker não tem DOM, então o render não conclui. Resultado esperado confirmado quando `viavel` é false.',
      },
    };
  } finally {
    await fecharCtx();
  }
  fechar(browser.version());
});

// ------------------------------------------------------------------ S4
const KB = (b: number) => round(b / 1024, 1);

test('S4: cache de SVG por conjunto (acerto contra erro) e memória', async ({ browser }) => {
  test.skip(ONLY === 's3', 'SPIKE_ONLY=s3');
  test.setTimeout(0);
  const ids = ['visao_geral', 'uma_raia', 'cinco_raias', 'completo'];
  type Linha = { id: string; render_ms: number; insercao_sync_ms: number; insercao_ate_quadro_ms: number; hit_sync_ms: number; hit_ate_quadro_ms: number; svg_bytes: number; heap_bytes_cumulativo: number; heap_delta_bytes: number; nos_dom: number };

  async function sequencia(idsRun: string[]): Promise<Linha[]> {
    const { ctx, fechar: fecharCtx } = await abrir(browser, HTML_BASE);
    try {
      const { page } = ctx;
      await page.evaluate(async (config) => {
        const m = (window as any).mermaid;
        m.initialize(config);
        await m.render('aq', 'flowchart LR\n  A["a"] --> B["b"]\n');
      }, CONFIG);
      const linhas = await page.evaluate(
        async ({ itens }) => {
          const w = window as any;
          const alvo = document.createElement('div');
          document.body.appendChild(alvo);
          const cache = new Map<string, string>();
          const quadro = () => new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));
          const inserir = async (svg: string) => {
            const t = performance.now();
            alvo.innerHTML = svg;
            void alvo.offsetHeight;
            const sync = performance.now() - t;
            await quadro();
            return { sync, quadro: performance.now() - t };
          };
          const out: any[] = [];
          let n = 1;
          await w.__nota('base');
          for (const { id, texto } of itens) {
            const t0 = performance.now();
            const r = await w.mermaid.render(`c${n++}`, texto);
            const renderMs = performance.now() - t0;
            const ins = await inserir(r.svg);
            cache.set(id, r.svg);
            alvo.innerHTML = '';
            const hit = await inserir(cache.get(id) as string);
            await w.__nota(`cache_${id}`);
            out.push({ id, render_ms: renderMs, insercao_sync_ms: ins.sync, insercao_ate_quadro_ms: ins.quadro, hit_sync_ms: hit.sync, hit_ate_quadro_ms: hit.quadro, svg_bytes: r.svg.length * 2 });
          }
          return out;
        },
        { itens: idsRun.map((id) => ({ id, texto: TEXTOS[id].texto })) },
      );
      const nodesDe = (nome: string) => ctx.snaps[nome]?.metricas.Nodes ?? 0;
      let anterior = ctx.snaps.base.heap_bytes;
      return linhas.map((l: any) => {
        const snap = ctx.snaps[`cache_${l.id}`];
        const delta = snap.heap_bytes - anterior;
        anterior = snap.heap_bytes;
        return { ...l, heap_bytes_cumulativo: snap.heap_bytes - ctx.snaps.base.heap_bytes, heap_delta_bytes: delta, nos_dom: nodesDe(`cache_${l.id}`) } as Linha;
      });
    } finally {
      await fecharCtx();
    }
  }

  const rodadas: Linha[][] = [];
  const erros: string[] = [];
  for (let i = 0; i < RUNS; i++) {
    try {
      rodadas.push(await sequencia(ids));
    } catch (e) {
      erros.push(String((e as Error).message).slice(0, 200));
    }
  }
  const pesadas: Linha[][] = [];
  for (let i = 0; i < RUNS_PESADO; i++) {
    try {
      pesadas.push(await sequencia(['completo_subtarefas']));
    } catch (e) {
      erros.push(`completo_subtarefas: ${String((e as Error).message).slice(0, 200)}`);
    }
  }
  const porId = (id: string, fontes: Linha[][]) => {
    const ls = fontes.map((r) => r.find((l) => l.id === id)).filter((l): l is Linha => !!l);
    const col = (f: (l: Linha) => number) => ls.map(f);
    return {
      execucoes_ok: ls.length,
      render_miss_ms: resumo(col((l) => l.render_ms)),
      miss_total_ms_render_mais_insercao_ate_quadro: resumo(col((l) => l.render_ms + l.insercao_ate_quadro_ms)),
      hit_insercao_sync_ms: resumo(col((l) => l.hit_sync_ms)),
      hit_ate_quadro_ms: resumo(col((l) => l.hit_ate_quadro_ms)),
      ganho_mediano_ms: r1((mediana(col((l) => l.render_ms + l.insercao_ate_quadro_ms)) ?? 0) - (mediana(col((l) => l.hit_ate_quadro_ms)) ?? 0)),
      svg_kb_utf16: KB(mediana(col((l) => l.svg_bytes)) ?? 0),
      heap_delta_kb_mediana: KB(mediana(col((l) => l.heap_delta_bytes)) ?? 0),
      heap_cumulativo_kb_mediana: KB(mediana(col((l) => l.heap_bytes_cumulativo)) ?? 0),
      nos_dom_pagina_com_o_svg_mediana: mediana(col((l) => l.nos_dom)),
    };
  };
  relatorio.s4 = {
    ...(relatorio.s4 ?? {}),
    cache: {
      metodo:
        'por execução: render (miss) do conjunto, inserção do SVG no DOM, guarda em Map, esvazia o DOM e insere de novo a partir do Map (hit). Tempo até o quadro = innerHTML + layout forçado + 2 rAF. Heap com GC forçado (HeapProfiler.collectGarbage + Runtime.getHeapUsage) depois de cada conjunto guardado; o cache acumula os conjuntos na ordem da lista.',
      ordem_de_acumulo: ids,
      execucoes_pedidas: RUNS,
      execucoes_pesado_pedidas: RUNS_PESADO,
      erros,
      por_conjunto: { ...Object.fromEntries(ids.map((id) => [id, porId(id, rodadas)])), completo_subtarefas: porId('completo_subtarefas', pesadas) },
      memoria_total_do_cache_dos_4_conjuntos_kb_mediana: KB(mediana(rodadas.map((r) => r[r.length - 1]?.heap_bytes_cumulativo ?? 0)) ?? 0),
      nota_memoria: 'heap_delta inclui o que o Mermaid retém ao renderizar o conjunto (estado interno) além da string do SVG; svg_kb_utf16 é só a string (2 bytes por caractere)',
    },
  };
  fechar(browser.version());
  expect(relatorio.s4.cache).toBeTruthy();
});

test('S4: render antecipado em tempo ocioso (requestIdleCallback) depois da Visão geral', async ({ browser }) => {
  test.skip(ONLY === 's3', 'SPIKE_ONLY=s3');
  test.setTimeout(0);

  async function rodar() {
    const { ctx, fechar: fecharCtx } = await abrir(browser, HTML_BASE);
    try {
      const { page } = ctx;
      await page.evaluate(async (config) => {
        const m = (window as any).mermaid;
        m.initialize(config);
        await m.render('aq', 'flowchart LR\n  A["a"] --> B["b"]\n');
      }, CONFIG);
      await instrumentar(page);
      await page.waitForTimeout(300);
      void page
        .evaluate(
          async ({ visao, proximas }) => {
            const w = window as any;
            const nota = async (nome: string, dados?: unknown) => {
              w.__fase = 'transicao';
              await w.__nota(nome, dados);
              w.__fase = nome;
            };
            const alvo = document.createElement('div');
            document.body.appendChild(alvo);
            const cache = new Map<string, string>();
            let n = 1;
            const quadro = () => new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));
            const inserir = async (svg: string) => {
              const t = performance.now();
              alvo.innerHTML = svg;
              void alvo.offsetHeight;
              await quadro();
              return performance.now() - t;
            };
            const render = async (texto: string) => {
              const t = performance.now();
              const r = await w.mermaid.render(`p${n++}`, texto);
              return { svg: r.svg as string, ms: performance.now() - t };
            };
            // 1. Visão geral (the cold render the user waits for)
            await nota('visao_geral');
            const v = await render(visao);
            const visaoAteQuadro = v.ms + (await inserir(v.svg));
            cache.set('visao_geral', v.svg);
            // 2. idle control: same mouse traffic, nothing running
            await nota('controle_ocioso');
            await new Promise((r) => setTimeout(r, 1500));
            // 3. prefetch of the next raias, one idle callback per render
            await nota('antecipacao');
            const itens: any[] = [];
            const tIni = performance.now();
            for (const p of proximas as Array<{ id: string; texto: string }>) {
              const pedido = performance.now();
              const dl: IdleDeadline = await new Promise((r) => requestIdleCallback(r, { timeout: 2000 }));
              const espera = performance.now() - pedido;
              const r = await render(p.texto);
              cache.set(p.id, r.svg);
              itens.push({ id: p.id, espera_pelo_idle_ms: espera, did_timeout: dl.didTimeout, time_remaining_ms: dl.timeRemaining(), render_ms: r.ms });
            }
            const duracaoAntecipacao = performance.now() - tIni;
            // 4. user clicks the first prefetched raia: hit; then the same set without cache: miss
            await nota('pos_antecipacao');
            await new Promise((r) => setTimeout(r, 300));
            await nota('clique');
            const hit = await inserir(cache.get(proximas[0].id) as string);
            const miss = await render(proximas[0].texto);
            const missAteQuadro = miss.ms + (await inserir(miss.svg));
            await nota('fim', { visao_ate_quadro_ms: visaoAteQuadro, visao_render_ms: v.ms, itens, duracaoAntecipacao, hit_ate_quadro_ms: hit, miss_ate_quadro_ms: missAteQuadro });
          },
          { visao: TEXTOS.visao_geral.texto, proximas: PROXIMAS.map((r) => ({ id: r, texto: TEXTOS[`raia_${r}`].texto })) },
        )
        .catch(() => undefined);
      await sleep(50);
      await moverAteTerminar(ctx);
      const cap = await capturar(ctx, ['visao_geral', 'controle_ocioso', 'antecipacao', 'clique']);
      const fim = ctx.fim() as any;
      const m = (nome: string, k: string) => ctx.snaps[nome]?.metricas[k] ?? 0;
      const cpu = (k: string) => (m('pos_antecipacao', k) - m('antecipacao', k)) * 1000;
      return {
        captura: cap,
        fim: fim ?? null,
        cpu_da_antecipacao_ms: { tarefa: round(cpu('TaskDuration')), script: round(cpu('ScriptDuration')), layout: round(cpu('LayoutDuration')), estilo: round(cpu('RecalcStyleDuration')) },
        heap_antes_kb: KB(ctx.snaps.antecipacao?.heap_bytes ?? 0),
        heap_depois_kb: KB(ctx.snaps.pos_antecipacao?.heap_bytes ?? 0),
        heap_delta_kb: KB((ctx.snaps.pos_antecipacao?.heap_bytes ?? 0) - (ctx.snaps.antecipacao?.heap_bytes ?? 0)),
        nos_dom_depois: m('pos_antecipacao', 'Nodes'),
      };
    } finally {
      await fecharCtx();
    }
  }

  const execs: Array<Awaited<ReturnType<typeof rodar>>> = [];
  const erros: string[] = [];
  for (let i = 0; i < RUNS; i++) {
    try {
      const r = await rodar();
      if (r.fim) execs.push(r);
      else erros.push('a página não sinalizou o fim');
    } catch (e) {
      erros.push(String((e as Error).message).slice(0, 200));
    }
  }
  const col = (f: (e: (typeof execs)[number]) => number) => execs.map(f);
  const itensRender = PROXIMAS.map((id, idx) => ({ id, render_ms: resumo(execs.map((e) => (e.fim as any).itens[idx].render_ms)), espera_pelo_idle_ms: resumo(execs.map((e) => (e.fim as any).itens[idx].espera_pelo_idle_ms)), did_timeout_em: execs.filter((e) => (e.fim as any).itens[idx].did_timeout).length }));
  const medianaHit = mediana(col((e) => (e.fim as any).hit_ate_quadro_ms)) ?? 0;
  const medianaMiss = mediana(col((e) => (e.fim as any).miss_ate_quadro_ms)) ?? 0;
  relatorio.s4 = {
    ...(relatorio.s4 ?? {}),
    antecipacao: {
      metodo:
        'por execução: Visão geral renderizada; 1,5 s ocioso (controle de mouse); depois, para cada uma das 3 primeiras raias, um requestIdleCallback (timeout 2 s) dispara um mermaid.render de 1 raia e guarda o SVG; por fim o clique na primeira raia (acerto do cache) e o mesmo conjunto sem cache (erro). O mouse se move a cada ~20 ms durante todas as fases. CPU = delta de Performance.getMetrics (TaskDuration, ScriptDuration, LayoutDuration, RecalcStyleDuration) entre o início e o fim da antecipação.',
      raias_antecipadas: PROXIMAS,
      execucoes_pedidas: RUNS,
      execucoes_ok: execs.length,
      erros,
      visao_geral_ate_quadro_ms: resumo(col((e) => (e.fim as any).visao_ate_quadro_ms)),
      render_de_cada_raia_antecipada: itensRender,
      duracao_total_da_antecipacao_ms: resumo(col((e) => (e.fim as any).duracaoAntecipacao)),
      clique_na_raia_antecipada: {
        com_cache_acerto_ate_quadro_ms: resumo(col((e) => (e.fim as any).hit_ate_quadro_ms)),
        sem_cache_erro_ate_quadro_ms: resumo(col((e) => (e.fim as any).miss_ate_quadro_ms)),
        ganho_mediano_ms: r1(medianaMiss - medianaHit),
      },
      cpu_da_antecipacao_ms: {
        tarefa: resumo(col((e) => e.cpu_da_antecipacao_ms.tarefa)),
        script: resumo(col((e) => e.cpu_da_antecipacao_ms.script)),
        layout: resumo(col((e) => e.cpu_da_antecipacao_ms.layout)),
        estilo: resumo(col((e) => e.cpu_da_antecipacao_ms.estilo)),
        nota: 'tempo de CPU gasto à toa se a pessoa nunca abrir essas raias; os valores vêm do contador do navegador com CPU 4x ativo',
      },
      memoria: { heap_delta_kb: resumo(col((e) => e.heap_delta_kb)), heap_depois_kb: resumo(col((e) => e.heap_depois_kb)), nos_dom_depois: resumo(col((e) => e.nos_dom_depois)) },
      resposta_do_mouse_por_fase: {
        visao_geral_render: agregarFase(execs.map((e) => e.captura.visao_geral)),
        controle_ocioso: agregarFase(execs.map((e) => e.captura.controle_ocioso)),
        durante_antecipacao: agregarFase(execs.map((e) => e.captura.antecipacao)),
        clique: agregarFase(execs.map((e) => e.captura.clique)),
      },
    },
  };
  fechar(browser.version());
  expect(relatorio.s4.antecipacao).toBeTruthy();
});
