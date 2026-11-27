// SPDX-License-Identifier: MIT
// Immersive Home: four scenes over one WebGL stage. Chromium runs WebGL through SwiftShader (software), so only behavior is
// checked here. Frames per second are measured locally with ?fps.
import { expect, test, type Page } from '@playwright/test';

test.use({ launchOptions: { args: ['--use-angle=swiftshader', '--use-gl=angle', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] }, viewport: { width: 1440, height: 900 } });

const CENAS = ['apresentacao', 'fluxos', 'catalogo', 'jornadas'] as const;

async function abrir(page: Page) {
  const erros: string[] = [];
  page.on('pageerror', (e) => erros.push(e.message));
  page.on('console', (m) => m.type() === 'error' && erros.push(m.text()));
  await page.goto('/pt-BR/');
  await page.waitForSelector('[data-home][data-palco="pronto"]', { timeout: 60_000 });
  return erros;
}

test('quatro cenas em ordem, um único palco e a barra de atalhos', async ({ page }) => {
  const erros = await abrir(page);
  expect(await page.locator('[data-cena]').evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.cena))).toEqual([...CENAS]);
  await expect(page.locator('canvas#palco')).toHaveCount(1);
  await expect(page.locator('nav.atalhos .atalhos-lista a')).toHaveCount(8);
  await expect(page.locator('nav.atalhos a.atalhos-eco')).toHaveAttribute('href', /\/pt-BR\/ecossistema\/$/);
  await expect(page.locator('nav.atalhos form[role="search"]')).toHaveCount(1);
  await expect(page.locator('nav.atalhos .atalhos-lang a')).toHaveCount(2);
  const altura = await page.locator('nav.atalhos').evaluate((e) => e.getBoundingClientRect().height);
  expect(altura).toBeLessThanOrEqual(56);
  expect(erros).toEqual([]);
});

test('o indicador acompanha a rolagem e leva à cena escolhida', async ({ page }) => {
  await abrir(page);
  await expect(page.locator('[data-home]')).toHaveAttribute('data-cena-ativa', 'apresentacao');
  await page.locator('[data-cena-link="catalogo"]').click();
  await expect(page.locator('[data-home]')).toHaveAttribute('data-cena-ativa', 'catalogo');
  await expect(page.locator('[data-cena-link="catalogo"]')).toHaveAttribute('aria-current', 'true');
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(page.locator('[data-home]')).toHaveAttribute('data-cena-ativa', 'apresentacao');
});

test('a rolagem continua do navegador e a faixa de cada cena vira progresso de 0 a 1', async ({ page }) => {
  await abrir(page);
  await page.locator('[data-cena="fluxos"]').scrollIntoViewIfNeeded();
  await page.evaluate(() => {
    const s = document.querySelector('[data-cena="fluxos"]') as HTMLElement;
    window.scrollTo(0, s.offsetTop + s.offsetHeight * 0.4);
  });
  await expect.poll(async () => Number(await page.locator('[data-cena="fluxos"]').evaluate((e) => (e as HTMLElement).style.getPropertyValue('--p')))).toBeGreaterThan(0.1);
  const p = Number(await page.locator('[data-cena="fluxos"]').evaluate((e) => (e as HTMLElement).style.getPropertyValue('--p')));
  expect(p).toBeLessThanOrEqual(1);
});

test('escolher uma demanda na cena de fluxos não sai da página e atualiza o link', async ({ page }) => {
  await abrir(page);
  await page.evaluate(() => document.querySelector('[data-cena="fluxos"]')!.scrollIntoView());
  const bug = page.locator('[data-demanda="bug"]');
  await bug.click();
  await expect(bug).toHaveAttribute('aria-pressed', 'true');
  await expect(page).toHaveURL(/\/pt-BR\/(#.*)?$/);
  await expect(page.locator('[data-cena="fluxos"] a.glass-btn')).toHaveAttribute('href', /\/flows\/bug\/$/);
});

test('uma rolagem completa não gera exceções nem cria um segundo canvas', async ({ page }) => {
  const erros = await abrir(page);
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < total; y += 700) {
    await page.evaluate((v) => window.scrollTo(0, v), y);
    await page.waitForTimeout(60);
  }
  await expect(page.locator('canvas#palco')).toHaveCount(1);
  expect(erros).toEqual([]);
});

test('com movimento reduzido a home vira seções estáticas com os mesmos links', async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('/pt-BR/');
  await expect(page.locator('html.home-imersiva')).toHaveCount(0);
  await expect(page.locator('canvas#palco')).toHaveCount(0);
  for (const id of CENAS) await expect(page.locator(`[data-cena="${id}"]`)).toBeVisible();
  const links = await page.locator('main a[href]').evaluateAll((as) => [...new Set(as.map((a) => (a as HTMLAnchorElement).getAttribute('href')))]);
  for (const l of ['/pt-BR/tools/', '/pt-BR/flows/', '/pt-BR/journeys/', '/pt-BR/certifications/', '/pt-BR/ecossistema/']) expect(links).toContain(l);
  await ctx.close();
});

test('sem WebGL a home mostra as seções estáticas', async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, tipo: string, ...resto: unknown[]) {
      if (/webgl/i.test(tipo)) return null;
      return (original as (...a: unknown[]) => unknown).call(this, tipo, ...resto);
    } as typeof original;
  });
  await page.goto('/pt-BR/');
  await expect(page.locator('html.home-imersiva')).toHaveCount(0);
  await expect(page.locator('[data-cena="jornadas"]')).toBeVisible();
});

test('o link para pular a apresentação leva ao fim da página', async ({ page }) => {
  await abrir(page);
  await page.locator('a.pular').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#fim')).toBeInViewport();
});
