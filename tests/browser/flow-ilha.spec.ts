// SPDX-License-Identifier: MIT
// Island of the Pagina_de_Demanda (Requirements 2.1, 2.2, 2.3, 2.5, 2.8, 2.9): opens in the Visão geral with the real Mermaid
// (svg with data-id), changes View and Demanda without reloading the page, and the old `visao` URLs are aliases of `geral`.
// Requires a built site: npm run build.
import { expect, test, type Page } from '@playwright/test';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import { parse } from 'yaml';

if (!existsSync('site/dist/pt-BR/flows/feature/index.html')) throw new Error('site/dist ausente: rode npm run build');
const ordem = (parse(readFileSync(resolve('content/guide/comum.yaml'), 'utf8')) as { ordem_das_demandas: string[] }).ordem_das_demandas;

const palco = (page: Page) => page.locator('[data-flow-stage]');
const pronto = (page: Page) => expect(palco(page)).toHaveAttribute('data-rendered', 'true', { timeout: 90_000 });
const aba = (page: Page, view: string) => page.locator(`[role="tab"][data-view="${view}"]`);

test('abre a feature na Visão geral, troca de aba e de demanda sem recarregar', async ({ page }) => {
  const erros: string[] = [];
  page.on('pageerror', (e) => erros.push(e.message));
  await page.goto('/pt-BR/flows/feature/');
  await pronto(page);
  await expect(page.locator('[data-island="flow"]')).toHaveAttribute('data-flow-id', 'feature');
  await expect(aba(page, 'geral')).toHaveAttribute('aria-selected', 'true');
  expect(await palco(page).locator('svg [data-id]').count()).toBeGreaterThan(0);
  expect(page.url()).not.toContain('#');

  // Seletor: as 12 demandas na ordem do guia.
  const valores = await page.locator('[data-flow-select] option').evaluateAll((os) => os.map((o) => (o as HTMLOptionElement).value.replace(/\/$/, '').split('/').pop()));
  expect(valores).toEqual(ordem);
  expect(valores).toHaveLength(12);

  // Abas: geral, raias (com a cor), completo.
  const views = await page.locator('[role="tab"]').evaluateAll((bs) => bs.map((b) => (b as HTMLElement).dataset.view));
  expect(views[0]).toBe('geral');
  expect(views.at(-1)).toBe('completo');
  expect(views.slice(1, -1).every((v) => v?.startsWith('raia:'))).toBe(true);
  await expect(page.locator('.flow-legend li')).toHaveCount(7);

  // Troca de aba: sem recarga (marca no window sobrevive), URL com o estado, Diagrama redesenhado.
  await page.evaluate(() => ((window as unknown as { __marca: number }).__marca = 1));
  const raia = views[1] as string;
  await aba(page, raia).click();
  await pronto(page);
  await expect(aba(page, raia)).toHaveAttribute('aria-selected', 'true');
  await expect(palco(page)).toHaveAttribute('data-view', raia);
  expect(page.url()).toContain(`view=${encodeURIComponent(raia).replace(/%3A/g, ':')}`);
  expect(await palco(page).locator('svg [data-id]').count()).toBeGreaterThan(0);
  expect(await page.evaluate(() => (window as unknown as { __marca?: number }).__marca)).toBe(1);

  // Voltar restaura a Visão geral.
  await page.goBack();
  await pronto(page);
  await expect(aba(page, 'geral')).toHaveAttribute('aria-selected', 'true');

  // Teclado: seta move o foco e não abre a aba.
  await aba(page, 'geral').focus();
  await page.keyboard.press('End');
  await expect(aba(page, 'completo')).toBeFocused();
  await expect(aba(page, 'completo')).toHaveAttribute('aria-selected', 'false');

  // Troca de demanda: URL da demanda, diagrama novo, sem recarregar.
  await page.locator('[data-flow-select]').selectOption({ index: 1 });
  await expect(page.locator('[data-island="flow"]')).toHaveAttribute('data-flow-id', ordem[1] as string);
  await pronto(page);
  expect(new URL(page.url()).pathname).toBe(`/pt-BR/flows/${ordem[1]}/`);
  await expect(aba(page, 'geral')).toHaveAttribute('aria-selected', 'true');
  expect(await palco(page).locator('svg [data-id]').count()).toBeGreaterThan(0);
  expect(await page.evaluate(() => (window as unknown as { __marca?: number }).__marca)).toBe(1);
  expect(erros).toEqual([]);
});

test('URLs antigas com visao viram alias da Visão geral', async ({ page }) => {
  for (const url of ['/pt-BR/flows/feature/?visao=1', '/pt-BR/flows/feature/#view=visao', '/pt-BR/flows/feature/#visao']) {
    await page.goto(url);
    await page.reload();
    await pronto(page);
    await expect(aba(page, 'geral')).toHaveAttribute('aria-selected', 'true');
    await expect(palco(page)).toHaveAttribute('data-view', 'geral');
    expect(page.url()).not.toMatch(/visao/);
  }
});

// URL with a View (`#view=`, `?visao=completo`), the default Visão geral and the swap of every Demanda and View: demanda-troca.spec.ts.

// The click/drag/zoom/keyboard interaction (Requirements 3.1 to 3.11) lives in diagrama-interacao.spec.ts and diagrama-ids.spec.ts.

// Expansão no lugar (Requirements 4.3, 20.3, 20.4, 20.6, 20.8, 20.11): real clicks and keys, `page.url()` read afterwards.
test('clique no cluster expande só aquela raia, atualiza exp= e o Recolher volta ao cluster', async ({ page }) => {
  const erros: string[] = [];
  page.on('pageerror', (e) => erros.push(e.message));
  await page.goto('/pt-BR/flows/feature/');
  await pronto(page);
  const clusters = palco(page).locator('svg g.node[data-id^="cluster:"]');
  const total = await clusters.count();
  expect(total).toBeGreaterThan(2);
  const alvo = clusters.nth(1);
  const raia = ((await alvo.getAttribute('data-id')) as string).slice('cluster:'.length);
  await expect(alvo).toHaveAttribute('role', 'button');
  await expect(alvo).toHaveAttribute('tabindex', '0');
  expect(await alvo.getAttribute('aria-label')).toMatch(/tarefas/);
  await page.evaluate(() => ((window as unknown as { __marca: number }).__marca = 1));

  // Zoom antes de expandir: a largura do svg deve seguir ampliada depois do redesenho.
  await page.locator('[data-flow-zoom="mais"]').click();
  const zoom = await page.locator('[data-flow-zoom="reset"]').textContent();
  await alvo.scrollIntoViewIfNeeded();
  await alvo.click();
  await pronto(page);
  await expect.poll(() => page.url()).toContain(`exp=${raia}`);
  expect(new URL(page.url()).hash).toBe(`#exp=${raia}`);
  await expect(palco(page)).toHaveAttribute('data-view', 'geral');
  expect(await palco(page).locator('svg g.node[data-id^="cluster:"]').count()).toBe(total - 1);
  await expect(palco(page).locator(`svg g.cluster[data-id="${raia}"]`)).toHaveCount(1);
  expect(await page.locator('[data-flow-zoom="reset"]').textContent()).toBe(zoom);
  expect(await page.evaluate(() => (window as unknown as { __marca?: number }).__marca)).toBe(1);
  await expect(page.locator(`[data-flow-raia-alternar="${raia}"]`)).toHaveAttribute('aria-expanded', 'true');

  // Recolher volta ao cluster e limpa exp=.
  await page.locator('[data-flow-raias] summary').click();
  await page.locator(`[data-flow-raia-alternar="${raia}"]`).click();
  await pronto(page);
  await expect.poll(() => page.url()).not.toContain('exp=');
  expect(await palco(page).locator('svg g.node[data-id^="cluster:"]').count()).toBe(total);
  await expect(page.locator(`[data-flow-raia-alternar="${raia}"]`)).toHaveAttribute('aria-expanded', 'false');

  // Enter no cluster focado expande; Abrir raia ativa a View raia:<id>.
  await palco(page).locator(`svg g.node[data-id="cluster:${raia}"]`).focus();
  await page.keyboard.press('Enter');
  await pronto(page);
  await expect.poll(() => page.url()).toContain(`exp=${raia}`);
  await page.locator(`[data-flow-raia-abrir="${raia}"]`).click();
  await pronto(page);
  await expect(aba(page, `raia:${raia}`)).toHaveAttribute('aria-selected', 'true');
  expect(page.url()).toContain(`view=raia:${raia}`);
  expect(erros).toEqual([]);
});

test('Expandir tudo vira completo e Recolher tudo volta à Visão geral, sem abrir o completo sozinho', async ({ page }) => {
  await page.goto('/pt-BR/flows/feature/');
  await pronto(page);
  await expect(palco(page)).toHaveAttribute('data-view', 'geral');
  await page.locator('[data-flow-raias-tudo="expandir"]').click();
  await pronto(page);
  await expect(palco(page)).toHaveAttribute('data-view', 'completo');
  expect(new URL(page.url()).hash).toBe('#view=completo');
  expect(await palco(page).locator('svg g.node[data-id^="cluster:"]').count()).toBe(0);
  await page.locator('[data-flow-raias-tudo="recolher"]').click();
  await pronto(page);
  await expect(palco(page)).toHaveAttribute('data-view', 'geral');
  expect(page.url()).not.toContain('#');
});

test('Voltar restaura View e rolagem (desabilitado sem histórico) e o alternador Raias oculta os agrupamentos do completo', async ({ page }) => {
  const erros: string[] = [];
  page.on('pageerror', (e) => erros.push(e.message));
  const voltar = page.locator('[data-flow-voltar]');
  const alternador = page.locator('[data-flow-raias-agrupar]');
  await page.goto('/pt-BR/flows/feature/');
  await pronto(page);
  await expect(voltar).toBeDisabled();
  await expect(voltar).toHaveAttribute('aria-disabled', 'true');
  await expect(alternador).toBeHidden();
  const entradas = await page.evaluate(() => window.history.length);

  // Rola o palco da Visão geral, abre uma raia e volta: View e rolagem voltam, e o botão não cria entrada no histórico.
  await palco(page).evaluate((e) => {
    e.scrollLeft = 120;
    e.scrollTop = 40;
  });
  const antes = await palco(page).evaluate((e) => ({ esq: e.scrollLeft, topo: e.scrollTop }));
  const raia = (await page.locator('[role="tab"]').evaluateAll((bs) => bs.map((b) => (b as HTMLElement).dataset.view)))[1] as string;
  await aba(page, raia).click();
  await pronto(page);
  expect(page.url()).toContain(`view=${encodeURIComponent(raia).replace(/%3A/g, ':')}`);
  await expect(voltar).toBeEnabled();
  expect(await page.evaluate(() => window.history.length)).toBe(entradas + 1);
  await voltar.click();
  await pronto(page);
  await expect(palco(page)).toHaveAttribute('data-view', 'geral');
  await expect(aba(page, 'geral')).toHaveAttribute('aria-selected', 'true');
  expect(page.url()).not.toContain('#');
  await expect(voltar).toBeDisabled();
  expect(await palco(page).evaluate((e) => ({ esq: e.scrollLeft, topo: e.scrollTop }))).toEqual(antes);

  // Completo: o alternador aparece, oculta os agrupamentos (nenhum g.cluster de raia) e os restaura. Os nós seguem desenhados.
  await aba(page, 'completo').click();
  await pronto(page);
  expect(new URL(page.url()).hash).toBe('#view=completo');
  await expect(alternador).toBeVisible();
  await expect(alternador).toHaveAttribute('aria-pressed', 'true');
  const raias = await page.locator('[role="tab"][data-view^="raia:"]').count();
  const nos = await palco(page).locator('svg g.node[data-id]').count();
  expect(await palco(page).locator('svg g.cluster[data-id]').count()).toBeGreaterThanOrEqual(raias);
  await alternador.click();
  await pronto(page);
  await expect(alternador).toHaveAttribute('aria-pressed', 'false');
  expect(new URL(page.url()).hash).toBe('#view=completo&raias=0');
  expect(await palco(page).locator('svg g.cluster[data-id]').count()).toBe(0);
  expect(await palco(page).locator('svg g.node[data-id]').count()).toBe(nos);
  await alternador.click();
  await pronto(page);
  expect(new URL(page.url()).hash).toBe('#view=completo');
  expect(await palco(page).locator('svg g.cluster[data-id]').count()).toBeGreaterThanOrEqual(raias);
  expect(erros).toEqual([]);
});
