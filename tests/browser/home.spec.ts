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

test('quatro cenas em ordem, um único palco e nenhum menu no topo', async ({ page }) => {
  const erros = await abrir(page);
  expect(await page.locator('[data-cena]').evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.cena))).toEqual([...CENAS]);
  await expect(page.locator('canvas#palco')).toHaveCount(1);
  await expect(page.locator('nav.atalhos')).toHaveCount(0);
  await expect(page.locator('header.site-header')).toHaveCount(0);
  await expect(page.locator('nav.home-lang a')).toHaveCount(2);
  await expect(page.locator('.hero-actions a.glass-btn')).toHaveText('Explorar o Kit em 3D');
  await expect(page.locator('.cena[data-cena="apresentacao"] .lede')).toContainText('catálogo curado para consultar e decidir');
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

test('na cena de fluxos o "abrir fluxo" só aparece depois de escolher uma demanda, com ícone e legenda', async ({ page }) => {
  await abrir(page);
  await page.locator('[data-cena-link="fluxos"]').click();
  const acao = page.locator('[data-cena="fluxos"] .cena-acao a');
  await expect(acao).toBeHidden();
  await expect(page.locator('[data-cena="fluxos"] .flow-legenda')).toBeHidden();
  const icones = await page.locator('[data-cena="fluxos"] .home-chips a svg').count();
  expect(icones).toBe(12);
  const bug = page.locator('[data-demanda="bug"]');
  await bug.click();
  await expect(bug).toHaveAttribute('aria-pressed', 'true');
  await expect(page).toHaveURL(/\/pt-BR\/(#.*)?$/);
  await expect(page.locator('[data-cena="fluxos"] .flow-nome')).toHaveText('Bug');
  await expect(page.locator('[data-cena="fluxos"] .flow-desc')).toContainText('defeito');
  await expect(acao).toBeVisible();
  await expect(acao).toHaveAttribute('href', /\/flows\/bug\/$/);
});

test('catálogo e jornadas não mostram números e os botões mudam a animação e os links de lista e 3D', async ({ page }) => {
  await abrir(page);
  await expect(page.locator('.home-count')).toHaveCount(0);
  await page.locator('[data-cena-link="catalogo"]').click();
  const lista = page.locator('[data-cena="catalogo"] [data-acao="lista"]');
  const tres = page.locator('[data-cena="catalogo"] [data-acao="3d"]');
  await expect(lista).toHaveText('Ver em lista');
  await expect(tres).toHaveText('Ver em 3D');
  const antes = await page.locator('[data-cena="catalogo"] [data-grupo="fundamentos"]').getAttribute('aria-pressed');
  expect(antes).toBe('false');
  await page.locator('[data-cena="catalogo"] [data-grupo="fundamentos"]').click();
  await expect(page.locator('[data-cena="catalogo"] [data-grupo="fundamentos"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(lista).toHaveAttribute('href', /\/pt-BR\/fundamentals\/$/);
  await expect(tres).toHaveAttribute('href', /\/pt-BR\/ecossistema\/#grupo=fundamentos$/);
  await page.locator('[data-cena="catalogo"] [data-grupo="fundamentos"]').click();
  await expect(lista).toHaveAttribute('href', /\/pt-BR\/tools\/$/);
  await page.locator('[data-cena-link="jornadas"]').click();
  await page.locator('[data-cena="jornadas"] [data-tipo-home="certificacao"]').click();
  await expect(page.locator('[data-cena="jornadas"] [data-acao="lista"]')).toHaveAttribute('href', /\/pt-BR\/certifications\/$/);
  await expect(page.locator('[data-cena="jornadas"] [data-acao="3d"]')).toHaveAttribute('href', /#tipo=certificacao$/);
});

test('termos aleatórios do catálogo flutuam na primeira cena, são links e mudam a cada visita', async ({ page, browser }) => {
  await abrir(page);
  await expect.poll(() => page.locator('#termos .termo').count(), { timeout: 20_000 }).toBeGreaterThan(10);
  const termos = await page.locator('#termos .termo').evaluateAll((els) => els.map((e) => ({ t: e.textContent, h: (e as HTMLAnchorElement).getAttribute('href') })));
  for (const t of termos) {
    expect(t.t).toBeTruthy();
    expect(t.h).toMatch(/^\/pt-BR\/.+\/$/);
  }
  expect(new Set(termos.map((t) => t.t)).size).toBe(termos.length);
  const tipos = new Set(await page.locator('#termos .termo').evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.tipo)));
  expect(tipos.size).toBeGreaterThan(4);
  // A second visit draws a different set.
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const outra = await ctx.newPage();
  await outra.goto('/pt-BR/');
  await expect.poll(() => outra.locator('#termos .termo').count(), { timeout: 20_000 }).toBeGreaterThan(10);
  const segundos = await outra.locator('#termos .termo').evaluateAll((els) => els.map((e) => e.textContent));
  expect(segundos.join('|')).not.toBe(termos.map((t) => t.t).join('|'));
  await ctx.close();
});

test('os termos nunca passam atrás do texto nem da busca, e nas outras cenas aparecem em menor número', async ({ page }) => {
  await abrir(page);
  await expect.poll(() => page.locator('#termos .termo').count(), { timeout: 20_000 }).toBeGreaterThan(10);
  const medir = () =>
    page.evaluate(() => {
      const texto = document.querySelector('.cena[data-ativa="true"] .cena-texto')!.getBoundingClientRect();
      const busca = document.querySelector('.cena[data-ativa="true"] input[type="search"]')?.getBoundingClientRect();
      const cruza = (a: DOMRect, b: DOMRect) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
      let visiveis = 0;
      let atrasDoTexto = 0;
      for (const el of document.querySelectorAll<HTMLElement>('#termos .termo')) {
        if (Number(el.style.getPropertyValue('--o')) < 0.05) continue;
        visiveis++;
        const r = el.getBoundingClientRect();
        if (cruza(r, texto) || (busca && cruza(r, busca))) atrasDoTexto++;
      }
      return { visiveis, atrasDoTexto };
    });
  await page.waitForTimeout(800);
  const inicial = await medir();
  expect(inicial.visiveis).toBeGreaterThan(10);
  expect(inicial.atrasDoTexto).toBe(0);
  await page.locator('[data-cena-link="catalogo"]').click();
  await page.waitForTimeout(1500);
  const noCatalogo = await medir();
  expect(noCatalogo.visiveis).toBeGreaterThan(2);
  expect(noCatalogo.visiveis).toBeLessThan(inicial.visiveis);
  expect(noCatalogo.atrasDoTexto).toBe(0);
});

test('clicar em um termo abre a página dele', async ({ page }) => {
  await abrir(page);
  await expect.poll(() => page.locator('#termos .termo').count(), { timeout: 20_000 }).toBeGreaterThan(10);
  // Pick a term that is actually on top at its center (some sit behind the scene text).
  const href = await page.evaluate(() => {
    for (const el of document.querySelectorAll<HTMLAnchorElement>('#termos .termo')) {
      const r = el.getBoundingClientRect();
      const x = r.left + r.width / 2;
      const y = r.top + r.height / 2;
      if (x < 5 || y < 5 || x > innerWidth - 5 || y > innerHeight - 5) continue;
      if (document.elementFromPoint(x, y) === el) return el.getAttribute('href');
    }
    return null;
  });
  expect(href).toBeTruthy();
  await page.locator(`#termos .termo[href="${href}"]`).click();
  await expect(page).toHaveURL(new RegExp(`${href!.replace(/\//g, '\\/')}$`));
});

test('a cena ativa fica legível logo depois de pular pelo indicador, sem rolar mais', async ({ page }) => {
  await abrir(page);
  for (const id of ['fluxos', 'catalogo', 'jornadas']) {
    await page.locator(`[data-cena-link="${id}"]`).click();
    await expect.poll(async () => Number(await page.locator(`[data-cena="${id}"] .cena-texto`).evaluate((e) => getComputedStyle(e).opacity))).toBeGreaterThan(0.95);
  }
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
  await expect(page.locator('[data-cena="fluxos"] .cena-acao a')).toBeVisible();
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
