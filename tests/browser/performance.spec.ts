// SPDX-License-Identifier: MIT
// Measurement harness for the performance budget (Requirement 15.8, 20.13). No limit is asserted yet:
// it records the current baseline in .agents/tasks/spike-fluxos/baseline.json.
// Requires a built site: KIT_LOCALES=pt-BR npm run build
import { expect, test } from '@playwright/test';
import { existsSync } from 'node:fs';
import { CPU_RATE, RUNS, coletarRecursos, duSk, gravarJson, p95, round, throttleCpu } from './helpers/medicao';

const DEMANDA = process.env.PERF_DEMAND ?? 'feature';
const SAIDA = '.agents/tasks/spike-fluxos/baseline.json';
const pagina = `/pt-BR/flows/${DEMANDA}/`;

if (!existsSync('site/dist/pt-BR/flows')) throw new Error('site/dist ausente: rode KIT_LOCALES=pt-BR npm run build');

test('linha de base de desempenho (sem asserção de limite)', async ({ browser }) => {
  test.setTimeout(600_000);
  const tempos = { dom_content_loaded_ms: [] as number[], diagrama_pronto_ms: [] as number[] };
  let recursos: Awaited<ReturnType<ReturnType<typeof coletarRecursos>['resultado']>> | undefined;

  for (let i = 0; i < RUNS; i++) {
    const context = await browser.newContext();
    const page = await context.newPage();
    const coleta = coletarRecursos(page);
    await throttleCpu(page, CPU_RATE);
    await page.goto(pagina, { waitUntil: 'domcontentloaded' });
    const inicial = await page.evaluate(() => {
      const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return nav.domContentLoadedEventEnd - nav.startTime;
    });
    await page.waitForFunction(() => {
      const figs = document.querySelectorAll('figure[data-island="mermaid"]');
      return figs.length > 0 && Array.from(figs).every((f) => f.getAttribute('data-rendered') === 'true');
    }, undefined, { timeout: 120_000 });
    const pronto = await page.evaluate(() => performance.now());
    tempos.dom_content_loaded_ms.push(inicial);
    tempos.diagrama_pronto_ms.push(pronto);
    if (i === 0) recursos = await coleta.resultado();
    await context.close();
  }

  const kb = (n: number) => round(n / 1024, 1);
  const baseline = {
    medido_em: new Date().toISOString(),
    pagina,
    cpu_throttling_rate: CPU_RATE,
    execucoes: RUNS,
    metodo: 'p95 por nearest-rank; gzip nível 9 sobre o corpo de cada resposta; du -sk',
    tempos_p95_ms: {
      dom_content_loaded: round(p95(tempos.dom_content_loaded_ms)),
      diagrama_pronto: round(p95(tempos.diagrama_pronto_ms)),
    },
    amostras_ms: {
      dom_content_loaded: tempos.dom_content_loaded_ms.map((n) => round(n)),
      diagrama_pronto: tempos.diagrama_pronto_ms.map((n) => round(n)),
    },
    tamanho_gzip_kb: {
      carga_inicial: kb(recursos!.inicial.gzipBytes),
      carga_diagrama: kb(recursos!.diagrama.gzipBytes),
    },
    recursos: recursos,
    du_sk: { 'site/dist': duSk('site/dist'), 'site/dist/pt-BR': duSk('site/dist/pt-BR') },
  };
  gravarJson(SAIDA, baseline);
  expect(existsSync(SAIDA)).toBe(true);
});
