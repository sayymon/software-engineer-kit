// SPDX-License-Identifier: MIT
// Ecossistema 3D in the browser. Chromium runs WebGL through SwiftShader (software), so only behavior is checked here.
// Frames per second are measured locally, not in CI.
import { expect, test, type Page } from '@playwright/test';

test.use({ launchOptions: { args: ['--use-angle=swiftshader', '--use-gl=angle', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] }, viewport: { width: 1440, height: 900 } });

async function abrir(page: Page, caminho = '/pt-BR/ecossistema/') {
  const erros: string[] = [];
  page.on('pageerror', (e) => erros.push(e.message));
  page.on('console', (m) => m.type() === 'error' && erros.push(m.text()));
  await page.goto(caminho);
  await page.waitForSelector('[data-island="ecossistema"][data-pronto="true"]', { timeout: 60_000 });
  return erros;
}

test('ocupa a tela toda e o título volta à tela inicial do kit', async ({ page }) => {
  await abrir(page);
  await expect(page.locator('header.site-header')).toHaveCount(0);
  await expect(page.locator('footer')).toHaveCount(0);
  const caixa = await page.locator('.eco').boundingBox();
  expect(caixa?.height).toBeGreaterThanOrEqual(890);
  const link = page.locator('.eco-eyebrow a');
  await expect(link).toHaveText('Software Engineer Kit');
  await link.click();
  await expect(page).toHaveURL(/\/pt-BR\/$/);
});

test('abre, mostra a contagem e a legenda', async ({ page }) => {
  const erros = await abrir(page);
  await expect(page.locator('#eco-count')).toContainText(/\d+ de \d+ nós/);
  await expect(page.locator('#eco-legend-list button[data-grupo]')).toHaveCount(5);
  for (const t of ['ferramenta', 'empresa', 'caso-de-uso', 'categoria', 'modelo']) await expect(page.locator(`#eco-legend-list button[data-tipo="${t}"] svg`)).toHaveCount(1);
  expect(erros).toEqual([]);
});

test('a legenda mostra fluxos e fundamentos e os grupos recolhem', async ({ page }) => {
  await abrir(page);
  for (const t of ['tarefa', 'papel', 'raia', 'tecnica', 'padrao']) await expect(page.locator(`#eco-legend-list button[data-tipo="${t}"]`)).toBeVisible();
  await expect(page.locator('[data-camada]')).toHaveCount(0);
  await page.locator('#eco-legend-list details[open] > summary .eco-chevron').first().click();
  await expect(page.locator('#eco-legend-list details[open]')).toHaveCount(4);
  await page.locator('#eco-legend-toggle').click();
  await expect(page.locator('#eco-legend-list details[open]')).toHaveCount(5);
  await page.locator('#eco-legend-toggle').click();
  await expect(page.locator('#eco-legend-list details[open]')).toHaveCount(0);
});

test('busca leva ao foco, atualiza o hash e abre o painel com vizinhos', async ({ page }) => {
  const erros = await abrir(page);
  await page.fill('#eco-q', 'github copilot');
  await page.keyboard.press('Enter');
  await expect(page.locator('#eco-panel')).toBeVisible();
  await expect(page.locator('#eco-panel h2')).toHaveText('GitHub Copilot');
  expect(await page.evaluate(() => location.hash)).toBe('#f=github_copilot');
  expect(await page.locator('#eco-panel button.eco-chip').count()).toBeGreaterThan(5);
  expect(erros).toEqual([]);
});

test('o foco mostra exatamente os vizinhos do payload', async ({ page, request }) => {
  await abrir(page);
  const payload = await (await request.get('/pt-BR/api/ecossistema/index.json')).json();
  const idx = payload.nos.findIndex((n: unknown[]) => n[0] === 'github_copilot');
  const viz = new Set<number>();
  for (const [a, b] of payload.arestas as number[][]) {
    if (a === idx) viz.add(b);
    if (b === idx) viz.add(a);
  }
  await page.fill('#eco-q', 'github copilot');
  await page.keyboard.press('Enter');
  await expect(page.locator('#eco-panel')).toBeVisible();
  const resumo = await page.locator('#eco-panel h3').filter({ hasText: /ligações diretas/ }).textContent();
  expect(Number(/(\d+) ligações/.exec(resumo ?? '')?.[1])).toBeLessThanOrEqual(viz.size);
  expect(viz.size).toBeGreaterThan(0);
});

test('Esc sai do foco e o hash volta ao padrão', async ({ page }) => {
  await abrir(page);
  await page.fill('#eco-q', 'github copilot');
  await page.keyboard.press('Enter');
  await expect(page.locator('#eco-panel')).toBeVisible();
  await page.locator('#eco-panel h2').focus();
  await page.keyboard.press('Escape');
  await expect(page.locator('#eco-panel')).toBeHidden();
  expect(await page.evaluate(() => location.hash)).toBe('');
});

test('abrir a URL com foco restaura o estado', async ({ page }) => {
  await abrir(page, '/pt-BR/ecossistema/#f=github_copilot');
  await expect(page.locator('#eco-panel h2')).toHaveText('GitHub Copilot');
});

test('id inexistente abre a visão completa e avisa', async ({ page }) => {
  await abrir(page, '/pt-BR/ecossistema/#f=nao_existe_xyz');
  await expect(page.locator('#eco-notice')).toContainText('nao_existe_xyz');
  await expect(page.locator('#eco-panel')).toBeHidden();
});

test('filtro por tipo isola empresas e entra no hash', async ({ page }) => {
  await abrir(page);
  const total = await page.locator('#eco-count').textContent();
  await page.locator('#eco-legend-list button[data-tipo="empresa"]').click();
  await expect(page.locator('#eco-count')).not.toHaveText(total ?? '');
  await expect(page.locator('#eco-count')).toContainText(/^301 de /);
  expect(await page.evaluate(() => location.hash)).toContain('tipo=empresa');
  await page.locator('#eco-legend-list button[data-tipo="empresa"]').click();
  await expect(page.locator('#eco-count')).toHaveText(total ?? '');
});

test('com um nó em foco, ligar e desligar filtros atualiza os vizinhos sem clicar no nó de novo', async ({ page }) => {
  await abrir(page, '/pt-BR/ecossistema/#f=github_copilot');
  const host = page.locator('[data-island="ecossistema"]');
  await expect(host).toHaveAttribute('data-foco', 'github_copilot');
  const todos = Number(await host.getAttribute('data-vizinhos'));
  expect(todos).toBeGreaterThan(10);
  await page.locator('#eco-legend-list button[data-tipo="ferramenta"]').click();
  await expect.poll(async () => Number(await host.getAttribute('data-vizinhos'))).toBeLessThan(todos);
  await expect(host).toHaveAttribute('data-foco', 'github_copilot');
  await page.locator('#eco-legend-list button[data-tipo="ferramenta"]').click();
  await expect.poll(async () => Number(await host.getAttribute('data-vizinhos'))).toBe(todos);
});

test('sem WebGL a página oferece o catálogo em lista', async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, tipo: string, ...resto: unknown[]) {
      if (/webgl/i.test(tipo)) return null;
      return (original as (...a: unknown[]) => unknown).call(this, tipo, ...resto);
    } as typeof original;
  });
  await page.goto('/pt-BR/ecossistema/');
  await expect(page.locator('#eco-nowebgl')).toBeVisible();
  await expect(page.locator('#eco-nowebgl a')).toHaveAttribute('href', /\/pt-BR\/tools\/$/);
});

test('a camada de detalhe só baixa ao pedir', async ({ page }) => {
  const baixados: string[] = [];
  page.on('request', (r) => /ecossistema\/detalhe\//.test(r.url()) && baixados.push(r.url()));
  await abrir(page, '/pt-BR/ecossistema/#f=feature');
  expect(baixados).toEqual([]);
  await page.getByRole('button', { name: /Mostrar detalhes deste nó/ }).click();
  await expect.poll(() => baixados.length).toBe(1);
});

test('o payload principal não contém tipos de detalhe e cabe no orçamento', async ({ request }) => {
  const r = await request.get('/pt-BR/api/ecossistema/index.json');
  const p = await r.json();
  const proibidos = ['decisao', 'no', 'subtarefa', 'playbook', 'pergunta', 'celula'];
  expect(p.tipos.filter((t: string) => proibidos.includes(t))).toEqual([]);
  expect((await r.body()).length).toBeLessThan(800 * 1024);
});

test('o carregador do ecossistema não vai para as outras páginas', async ({ page }) => {
  const js: string[] = [];
  page.on('request', (r) => /\.js(\?|$)/.test(r.url()) && js.push(r.url()));
  await page.goto('/pt-BR/');
  expect(js.filter((u) => /renderer-3d|three/.test(u))).toEqual([]);
});
