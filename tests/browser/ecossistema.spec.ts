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

test('abre, mostra a contagem e a legenda', async ({ page }) => {
  const erros = await abrir(page);
  await expect(page.locator('#eco-count')).toContainText(/\d+ de \d+ nós/);
  await expect(page.locator('#eco-legend-list button')).toHaveCount(5);
  expect(erros).toEqual([]);
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

test('filtro por grupo reduz os nós visíveis e Limpar restaura', async ({ page }) => {
  await abrir(page);
  const total = await page.locator('#eco-count').textContent();
  await page.locator('#eco-legend-list button[data-grupo="aprendizado"]').click();
  await expect(page.locator('#eco-count')).not.toHaveText(total ?? '');
  expect(await page.evaluate(() => location.hash)).toContain('grupo=aprendizado');
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
