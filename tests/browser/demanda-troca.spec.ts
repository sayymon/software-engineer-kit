// SPDX-License-Identifier: MIT
// Troca de Demanda e de View na Pagina_de_Demanda (Requirements 2.2, 2.4, 2.5, 2.7, 16.4): the 12 Demandas through the selector (order of
// `ordem_das_demandas`) and every View of each one, without a page load and without an uncaught exception or console error; and the
// Pagina_de_Demanda opened by URL already in the View of the URL. Filter the Demandas with PLAYWRIGHT_DEMANDS=feature,bug.
// The click/drag/zoom/keyboard and expansion cases live in flow-ilha.spec.ts and diagrama-interacao.spec.ts. Requires a built site: npm run build.
import { expect, test, type Page } from '@playwright/test';
import { aba, abasDeRaia, abrir, coletarErros, demandas, ordemDasDemandas, palco, pronto, tituloEstatico } from './helpers/demandas';

const marca = (page: Page) => page.evaluate(() => (window as unknown as { __marca?: number }).__marca);
const idDaDemanda = (valor: string) => valor.replace(/\/$/, '').split('/').pop();
const hash = (page: Page) => new URL(page.url()).hash;
const nosDesenhados = (page: Page) => palco(page).locator('svg g.node[data-id]').count();

test('o seletor lista as 12 Demandas na ordem do guia', async ({ page }) => {
  expect(ordemDasDemandas).toHaveLength(12);
  await abrir(page, `/pt-BR/flows/${ordemDasDemandas[0]}/`);
  const valores = await page.locator('[data-flow-select] option').evaluateAll((os) => os.map((o) => (o as HTMLOptionElement).value));
  expect(valores.map(idDaDemanda)).toEqual(ordemDasDemandas);
});

test('percorre as Demandas pelo seletor e as Views de cada uma, sem recarregar nem erro de console', async ({ page }) => {
  test.setTimeout(600_000);
  expect(demandas.length, 'PLAYWRIGHT_DEMANDS não casa com nenhuma Demanda').toBeGreaterThan(0);
  const erros = coletarErros(page);
  await abrir(page, `/pt-BR/flows/${demandas[0]}/`);
  await page.evaluate(() => ((window as unknown as { __marca: number }).__marca = 1));
  const valores = await page.locator('[data-flow-select] option').evaluateAll((os) => os.map((o) => (o as HTMLOptionElement).value));

  for (const demanda of demandas) {
    // 2.2 and 2.3: the choice swaps the Diagrama and the route; the title follows the page.
    if (new URL(page.url()).pathname !== `/pt-BR/flows/${demanda}/`) {
      await page.locator('[data-flow-select]').selectOption(valores.find((v) => idDaDemanda(v) === demanda) as string);
      await expect(page.locator('[data-island="flow"]')).toHaveAttribute('data-flow-id', demanda, { timeout: 90_000 });
    }
    await pronto(page);
    expect(new URL(page.url()).pathname, `${demanda}: rota`).toBe(`/pt-BR/flows/${demanda}/`);
    expect(await page.title(), `${demanda}: título`).toBe(tituloEstatico(demanda));
    await expect(aba(page, 'geral')).toHaveAttribute('aria-selected', 'true');
    expect(hash(page), `${demanda}: a Demanda abre na Visão geral`).toBe('');
    expect(await nosDesenhados(page), `${demanda}: Diagrama vazio`).toBeGreaterThan(0);

    // 2.5: tabs in the order geral, lanes as the guide declares them, completo.
    const abas = await page.locator('[role="tab"]').evaluateAll((bs) => bs.map((b) => (b as HTMLElement).dataset.view));
    expect(abas, `${demanda}: abas`).toEqual(['geral', ...abasDeRaia(demanda), 'completo']);

    // Every View of a lane (the first lane after the orchestrator, then the last one), the full flow, and back to the Visão geral.
    const raias = abasDeRaia(demanda);
    const alvos = [...new Set([raias[1] ?? raias[0], raias.at(-1) as string, 'completo', 'geral'])];
    for (const view of alvos) {
      await aba(page, view).click();
      await expect(palco(page)).toHaveAttribute('data-view', view);
      await pronto(page);
      await expect(aba(page, view)).toHaveAttribute('aria-selected', 'true');
      expect(hash(page), `${demanda}/${view}: URL`).toBe(view === 'geral' ? '' : `#view=${view}`);
      expect(await nosDesenhados(page), `${demanda}/${view}: Diagrama vazio`).toBeGreaterThan(0);
      expect(await marca(page), `${demanda}/${view}: a página recarregou`).toBe(1);
    }
    expect(await marca(page), `${demanda}: a página recarregou`).toBe(1);
    expect(erros, `${demanda}: exceção ou erro de console`).toEqual([]);
  }
});

// 2.7: the URL carries the View. `?visao=completo` is the old alias of `#view=completo`. A hash-only goto keeps the page, so `abrir` reloads.
for (const demanda of demandas) {
  test(`abre por URL já posicionada na View: ${demanda}`, async ({ page }) => {
    test.setTimeout(240_000);
    const erros = coletarErros(page);
    const raia = abasDeRaia(demanda).at(1) as string;
    const casos = [
      { url: `/pt-BR/flows/${demanda}/`, view: 'geral' },
      { url: `/pt-BR/flows/${demanda}/#view=${raia}`, view: raia },
      { url: `/pt-BR/flows/${demanda}/#view=completo`, view: 'completo' },
      { url: `/pt-BR/flows/${demanda}/?visao=completo`, view: 'completo' },
    ];
    for (const c of casos) {
      await abrir(page, c.url);
      await expect(palco(page)).toHaveAttribute('data-view', c.view);
      await expect(aba(page, c.view)).toHaveAttribute('aria-selected', 'true');
      expect(new URL(page.url()).pathname).toBe(`/pt-BR/flows/${demanda}/`);
      expect(hash(page), `${c.url}: URL canônica`).toBe(c.view === 'geral' ? '' : `#view=${c.view}`);
      expect(await nosDesenhados(page), `${c.url}: Diagrama vazio`).toBeGreaterThan(0);
    }
    expect(erros).toEqual([]);
  });
}
