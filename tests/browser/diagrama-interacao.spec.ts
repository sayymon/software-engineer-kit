// SPDX-License-Identifier: MIT
// Interaction of the Diagrama (Requirements 3.2 to 3.11, 16.6): real pointer movement (mouse down, move, up) for the 3 px click and the
// 150 px drag, `page.url()` read after every interaction. Heavy cases (full flow) run only where the area must overflow.
// Requires a built site: npm run build.
import { expect, test, type Page } from '@playwright/test';
import { existsSync } from 'node:fs';

if (!existsSync('site/dist/pt-BR/flows/feature/index.html')) throw new Error('site/dist ausente: rode npm run build');

const palco = (page: Page) => page.locator('[data-flow-stage]');
const pronto = (page: Page) => expect(palco(page)).toHaveAttribute('data-rendered', 'true', { timeout: 90_000 });
const NO = 'svg g.node[data-id][role="button"]:not([data-id^="cluster:"])';
const zoomTexto = (page: Page) => page.locator('[data-flow-zoom="reset"]').textContent();
const larguraSvg = async (page: Page) => (await palco(page).locator('svg').first().boundingBox())!.width;
const rolagem = (page: Page) => palco(page).evaluate((e) => ({ esq: e.scrollLeft, topo: e.scrollTop, maxEsq: e.scrollWidth - e.clientWidth, maxTopo: e.scrollHeight - e.clientHeight }));

/** Opens a page and records the `flow:abrir-no` events (the Modal_de_Playbook listens to them) and the uncaught page errors. */
async function abrir(page: Page, url: string) {
  const erros: string[] = [];
  page.on('pageerror', (e) => erros.push(e.message));
  await page.goto(url);
  await page.reload();
  await pronto(page);
  await page.evaluate(() => {
    const w = window as unknown as { __abertos: string[] };
    w.__abertos = [];
    document.querySelector('[data-flow-stage]')?.addEventListener('flow:abrir-no', (e) => w.__abertos.push((e as CustomEvent<{ id: string }>).detail.id));
  });
  return {
    erros,
    abertos: () => page.evaluate(() => (window as unknown as { __abertos: string[] }).__abertos),
  };
}

/** Moves the pointer onto a point of the stage that is inside the viewport (a wheel event off-screen never reaches the page). */
async function apontarParaOPalco(page: Page) {
  await palco(page).scrollIntoViewIfNeeded();
  const c = (await palco(page).boundingBox())!;
  const vp = page.viewportSize()!;
  const x = Math.min(c.x + c.width / 2, vp.width - 40);
  const y = Math.max(c.y, 0) + Math.min(100, (Math.min(c.y + c.height, vp.height) - Math.max(c.y, 0)) / 2);
  await page.mouse.move(x, y);
}

/** Centre of the first Nó of the stage that is fully visible in the viewport, after scrolling it into view. */
async function centroDoNo(page: Page) {
  const no = palco(page).locator(NO).first();
  await no.scrollIntoViewIfNeeded();
  const id = (await no.getAttribute('data-id')) as string;
  const caixa = (await no.boundingBox())!;
  return { no, id, x: caixa.x + caixa.width / 2, y: caixa.y + caixa.height / 2 };
}

test('clique de 0 e de 3 px abre o Nó sem rolar a área; o Nó expõe papel, rótulo e id', async ({ page }) => {
  const { erros, abertos } = await abrir(page, '/pt-BR/flows/feature/#exp=feat_orq');
  const { no, id, x, y } = await centroDoNo(page);
  await expect(no).toHaveAttribute('tabindex', '0');
  expect(await no.getAttribute('aria-label')).toBeTruthy();
  const urlAntes = page.url();
  const antes = await rolagem(page);

  // Click without movement.
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.up();
  expect(await abertos()).toEqual([id]);
  expect(page.url()).toBe(urlAntes);

  // Click with exactly 3 px of movement between press and release.
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x + 3, y);
  await page.mouse.up();
  expect(await abertos()).toEqual([id, id]);
  expect(page.url()).toBe(urlAntes);
  await expect(palco(page)).not.toHaveCSS('cursor', 'grabbing');
  expect(await rolagem(page)).toEqual(antes);
  expect(erros).toEqual([]);
});

test('arraste de 150 px rola o palco com cursor grabbing, não abre o Nó e não muda a URL', async ({ page }) => {
  test.setTimeout(180_000);
  const { erros, abertos } = await abrir(page, '/pt-BR/flows/feature/#view=completo');
  const { id, x, y } = await centroDoNo(page);
  const urlAntes = page.url();
  const antes = await rolagem(page);
  expect(antes.maxEsq, 'o completo precisa transbordar na horizontal').toBeGreaterThan(300);

  // Drag left by 150 px sobre um Nó: a área rola para a direita (o conteúdo acompanha o ponteiro).
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x - 150, y, { steps: 15 });
  await expect(palco(page)).toHaveCSS('cursor', 'grabbing');
  await page.mouse.up();
  await expect(palco(page)).not.toHaveCSS('cursor', 'grabbing');
  const depoisX = await rolagem(page);
  expect(Math.round(depoisX.esq - antes.esq)).toBe(150);
  expect(depoisX.topo).toBe(antes.topo); // horizontal drag does not scroll vertically
  expect(await abertos()).toEqual([]);
  expect(page.url()).toBe(urlAntes);

  // Drag right by 100 px (back): the area scrolls back and still opens nothing.
  await page.mouse.move(x - 150, y);
  await page.mouse.down();
  await page.mouse.move(x - 50, y, { steps: 10 });
  await page.mouse.up();
  expect(Math.round(depoisX.esq - (await rolagem(page)).esq)).toBe(100);
  expect(await abertos()).toEqual([]);
  expect(page.url()).toBe(urlAntes);

  // Right after a drag a click still works (the swallowed click does not stick).
  const noAtual = palco(page).locator(`svg g.node[data-id="${id}"]`);
  await noAtual.scrollIntoViewIfNeeded();
  await noAtual.click();
  expect(await abertos()).toEqual([id]);
  expect(page.url()).toBe(urlAntes);
  expect(erros).toEqual([]);
});

test('arraste de 4 px já é arraste: não abre o Nó', async ({ page }) => {
  const { abertos } = await abrir(page, '/pt-BR/flows/feature/#exp=feat_orq');
  const { x, y } = await centroDoNo(page);
  const urlAntes = page.url();
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x + 4, y);
  await page.mouse.up();
  expect(await abertos()).toEqual([]);
  expect(page.url()).toBe(urlAntes);
});

test('setas movem o foco entre Nós e rolam o palco quando ele tem o foco', async ({ page }) => {
  test.setTimeout(180_000);
  const { erros } = await abrir(page, '/pt-BR/flows/feature/#view=completo');
  const urlAntes = page.url();
  const focado = () => page.evaluate(() => document.activeElement?.getAttribute('data-id') ?? null);

  // Focused Nó: some arrow reaches a neighbour (the first Nó has one at least to the right or below).
  const { no, id } = await centroDoNo(page);
  await no.focus();
  expect(await focado()).toBe(id);
  const vistos = new Set([id]);
  for (const tecla of ['ArrowRight', 'ArrowDown', 'ArrowRight', 'ArrowDown']) {
    await page.keyboard.press(tecla);
    const atual = await focado();
    expect(atual, `${tecla}: o foco saiu dos Nós`).not.toBeNull();
    vistos.add(atual as string);
  }
  expect(vistos.size).toBeGreaterThan(1);
  const dir = await focado();
  await page.keyboard.press('ArrowLeft');
  await page.keyboard.press('ArrowUp');
  expect(await focado()).not.toBeNull();
  expect(dir).not.toBeNull();

  // Focused area: arrows scroll by a fixed step.
  await palco(page).focus();
  await expect(palco(page)).toBeFocused();
  await palco(page).evaluate((e) => (e.scrollLeft = 0));
  const a0 = await rolagem(page);
  expect(a0.maxEsq).toBeGreaterThan(300);
  await page.keyboard.press('ArrowRight');
  const a1 = await rolagem(page);
  expect(a1.esq - a0.esq).toBe(60);
  await page.keyboard.press('ArrowRight');
  expect((await rolagem(page)).esq - a1.esq).toBe(60);
  await page.keyboard.press('ArrowLeft');
  expect((await rolagem(page)).esq).toBe(a1.esq);
  // The full flow is as tall as the page (the page scrolls vertically), so ArrowDown/Up on the area only change the area when it overflows.
  const v0 = await rolagem(page);
  await page.keyboard.press('ArrowDown');
  const v1 = await rolagem(page);
  if (v0.maxTopo > 0) expect(v1.topo).toBeGreaterThan(v0.topo);
  else expect(v1.topo).toBe(0);
  expect(page.url()).toBe(urlAntes);
  expect(erros).toEqual([]);
});

test('Ctrl+roda dá zoom e a roda comum não; zoom preserva data-id', async ({ page }) => {
  test.setTimeout(180_000);
  const { erros } = await abrir(page, '/pt-BR/flows/feature/#view=completo');
  const urlAntes = page.url();
  const ids = () => palco(page).locator('svg g.node[data-id]').evaluateAll((ns) => ns.map((n) => n.getAttribute('data-id')));
  const idsAntes = await ids();
  await apontarParaOPalco(page);
  expect(await zoomTexto(page)).toBe('100%');
  const largura0 = await larguraSvg(page);

  // Plain wheel: the zoom and the svg width stay, and the page or the area scrolls instead.
  const scrollAntes = await page.evaluate(() => window.scrollY + (document.querySelector('[data-flow-stage]') as HTMLElement).scrollTop);
  await page.mouse.wheel(0, 300);
  await expect.poll(() => page.evaluate(() => window.scrollY + (document.querySelector('[data-flow-stage]') as HTMLElement).scrollTop)).toBeGreaterThan(scrollAntes);
  expect(await zoomTexto(page)).toBe('100%');
  expect(await larguraSvg(page)).toBe(largura0);

  // Ctrl + wheel up zooms in, Ctrl + wheel down zooms out.
  await page.keyboard.down('Control');
  await page.mouse.wheel(0, -100);
  await page.keyboard.up('Control');
  await expect.poll(() => zoomTexto(page)).toBe('120%');
  expect(await larguraSvg(page)).toBeGreaterThan(largura0);
  await page.keyboard.down('Control');
  await page.mouse.wheel(0, 100);
  await page.mouse.wheel(0, 100);
  await page.keyboard.up('Control');
  await expect.poll(() => zoomTexto(page)).toBe('83%');
  expect(await larguraSvg(page)).toBeLessThan(largura0);
  expect(await ids()).toEqual(idsAntes);
  expect(page.url()).toBe(urlAntes);
  expect(erros).toEqual([]);
});

test('botões de zoom (menos, 100%, mais) por clique e por teclado, com limites', async ({ page }) => {
  const { erros } = await abrir(page, '/pt-BR/flows/feature/#exp=feat_orq');
  const menos = page.locator('[data-flow-zoom="menos"]');
  const reset = page.locator('[data-flow-zoom="reset"]');
  const mais = page.locator('[data-flow-zoom="mais"]');
  for (const b of [menos, reset, mais]) expect(await b.getAttribute('aria-label')).toBeTruthy();
  const largura0 = await larguraSvg(page);

  await mais.click();
  expect(await zoomTexto(page)).toBe('120%');
  expect(await larguraSvg(page)).toBeGreaterThan(largura0);
  await menos.click();
  await menos.click();
  expect(await zoomTexto(page)).toBe('83%');
  expect(await larguraSvg(page)).toBeLessThan(largura0);
  await reset.click();
  expect(await zoomTexto(page)).toBe('100%');
  expect(Math.abs((await larguraSvg(page)) - largura0)).toBeLessThan(1);

  // Keyboard: Tab reaches the buttons, Enter and Space act.
  await mais.focus();
  await expect(mais).toBeFocused();
  await page.keyboard.press('Enter');
  expect(await zoomTexto(page)).toBe('120%');
  await page.keyboard.press('Space');
  expect(await zoomTexto(page)).toBe('144%');
  await reset.focus();
  await page.keyboard.press('Enter');
  expect(await zoomTexto(page)).toBe('100%');

  // Limits: the buttons disable at the extremes.
  for (let i = 0; i < 12 && (await mais.isEnabled()); i++) await mais.click();
  await expect(mais).toBeDisabled();
  expect(await zoomTexto(page)).toBe('300%');
  await reset.click();
  for (let i = 0; i < 12 && (await menos.isEnabled()); i++) await menos.click();
  await expect(menos).toBeDisabled();
  expect(await zoomTexto(page)).toBe('25%');
  expect(erros).toEqual([]);
});

test('rótulo acessível descreve os gestos e o palco é focável', async ({ page }) => {
  await abrir(page, '/pt-BR/flows/feature/#exp=feat_orq');
  const ref = await palco(page).getAttribute('aria-describedby');
  expect(ref).toBeTruthy();
  const textos = await page.evaluate((ids) => ids.split(' ').map((i) => document.getElementById(i)?.textContent ?? ''), ref as string);
  const ajuda = textos.join(' ');
  expect(ajuda).toMatch(/arraste/i);
  expect(ajuda).toMatch(/setas/i);
  expect(ajuda).toMatch(/ctrl/i);
  expect(await palco(page).getAttribute('tabindex')).toBe('0');
  await expect(page.locator('[data-flow-zoom]').first().locator('xpath=..')).toHaveAttribute('role', 'group');

  await page.goto('/en/flows/feature/#exp=feat_orq');
  await page.reload();
  await pronto(page);
  const ref2 = (await palco(page).getAttribute('aria-describedby')) as string;
  const textoEn = await page.evaluate((ids) => ids.split(' ').map((i) => document.getElementById(i)?.textContent ?? '').join(' '), ref2);
  expect(textoEn).toMatch(/drag/i);
  expect(textoEn).toMatch(/ctrl/i);
});

test('foco visível: Nó focado por teclado tem contorno calculado; Enter e Espaço abrem o Nó', async ({ page }) => {
  const { erros, abertos } = await abrir(page, '/pt-BR/flows/feature/#exp=feat_orq');
  const urlAntes = page.url();
  const { no, id } = await centroDoNo(page);
  await no.focus();
  await page.keyboard.press('ArrowRight'); // keyboard modality: :focus-visible applies
  await no.focus();
  await expect(no).toBeFocused();
  const contorno = await no.evaluate((e) => {
    const c = getComputedStyle(e);
    return { estilo: c.outlineStyle, largura: Number.parseFloat(c.outlineWidth), cor: c.outlineColor };
  });
  expect(contorno.estilo).not.toBe('none');
  expect(contorno.largura).toBeGreaterThanOrEqual(2);
  expect(contorno.cor).not.toBe('rgba(0, 0, 0, 0)');
  // An unfocused Nó has no outline.
  const outro = palco(page).locator(NO).nth(1);
  expect(await outro.evaluate((e) => getComputedStyle(e).outlineStyle)).toBe('none');

  await no.focus();
  await page.keyboard.press('Enter');
  expect(await abertos()).toEqual([id]);
  expect(page.url()).toBe(urlAntes);
  await no.focus();
  await page.keyboard.press('Space');
  expect(await abertos()).toEqual([id, id]);
  expect(page.url()).toBe(urlAntes);

  // The zoom buttons also show a visible focus.
  await page.locator('[data-flow-zoom="mais"]').focus();
  await page.keyboard.press('Shift+Tab');
  await page.keyboard.press('Tab');
  await expect(page.locator('[data-flow-zoom="mais"]')).toBeFocused();
  expect(await page.locator('[data-flow-zoom="mais"]').evaluate((e) => getComputedStyle(e).outlineStyle)).not.toBe('none');
  expect(erros).toEqual([]);
});
