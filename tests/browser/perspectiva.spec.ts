// SPDX-License-Identifier: MIT
// Seletor de Perspectiva (Requirements 19.1, 19.3, 19.4, 19.5, 19.11) no site construído: visível com a opção `mermaid`, `mermaid` como
// padrão, precedência URL > localStorage > padrão, `localStorage` bloqueado, Perspectiva desconhecida na URL, View/Conjunto/Subtarefas/Nó
// preservados e rótulos em pt-BR e en. Only `mermaid` is registered today, so a real switch between two Perspectivas cannot be driven from
// the page; the precedence between two valid ones and the registration of a new one without touching the selector are covered by
// tests/flow-app (perspectiva.test.ts, renderer.test.ts). Requires a built site: npm run build.
import { expect, test, type Page } from '@playwright/test';
import { abrir, coletarErros, grafoDe, palco, pronto } from './helpers/demandas';

const CHAVE = 'software-engineer-kit:flow:perspectiva';
const URL_FEATURE = '/pt-BR/flows/feature/';
const grafo = grafoDe('feature');
const seletor = (page: Page) => page.locator('[data-flow-persp-select]');
const guardada = (page: Page) => page.evaluate((k) => window.localStorage.getItem(k), CHAVE);
const hash = (page: Page) => new URL(page.url()).hash;
const selecionado = (page: Page) => palco(page).locator('svg [data-selecionado="true"]');

test('seletor visível com uma opção, rotulado, focável por teclado, e mermaid é o padrão (19.1, 19.3)', async ({ page }) => {
  const erros = coletarErros(page);
  await abrir(page, URL_FEATURE);
  await expect(seletor(page)).toBeVisible();
  await expect(page.getByLabel('Perspectiva')).toHaveValue('mermaid');
  await expect(seletor(page).locator('option')).toHaveText(['Mermaid']);
  await expect(palco(page).locator('[data-perspectiva="mermaid"]')).toHaveCount(1);
  expect(hash(page), 'sem escolha, a URL não ganha persp').toBe('');
  expect(await guardada(page), 'sem escolha, nada é guardado').toBeNull();

  await seletor(page).focus();
  await expect(seletor(page)).toBeFocused();
  expect(await seletor(page).evaluate((e) => getComputedStyle(e).outlineStyle)).not.toBe('none');
  expect(erros).toEqual([]);
});

test('escolher a Perspectiva guarda no localStorage e mantém View, Subtarefas e Nó (19.4)', async ({ page }) => {
  const no = grafo.nos.find((n) => n.raia === 'feat_ent' && n.tipo === 'tarefa')!.id;
  const erros = coletarErros(page);
  await abrir(page, `${URL_FEATURE}#view=completo&sub=1&no=${no}&persp=mermaid`);
  await expect(selecionado(page)).toHaveAttribute('data-id', no);

  await seletor(page).selectOption('mermaid');
  await pronto(page);
  await expect(palco(page)).toHaveAttribute('data-view', 'completo');
  for (const parte of ['view=completo', 'sub=1', `no=${no}`, 'persp=mermaid']) expect(hash(page)).toContain(parte);
  expect(await guardada(page)).toBe('mermaid');
  await expect(selecionado(page)).toHaveAttribute('data-id', no);

  // Same with a Conjunto_Expandido (the `geral` View, which does not carry `view=`).
  await abrir(page, `${URL_FEATURE}#exp=feat_ent,feat_lev&sub=1&no=${no}&persp=mermaid`);
  await seletor(page).selectOption('mermaid');
  await pronto(page);
  await expect(palco(page)).toHaveAttribute('data-view', 'geral');
  for (const parte of ['exp=feat_ent,feat_lev', 'sub=1', `no=${no}`, 'persp=mermaid']) expect(hash(page)).toContain(parte);
  await expect(palco(page).locator('svg g.node[data-id="cluster:feat_ent"]')).toHaveCount(0);
  await expect(selecionado(page)).toHaveAttribute('data-id', no);
  expect(erros).toEqual([]);
});

test('precedência: persp da URL, depois o localStorage, depois o padrão (19.5)', async ({ page }) => {
  const erros = coletarErros(page);
  // Stored choice, no persp in the URL: it applies and the URL stays clean.
  await page.addInitScript((c) => window.localStorage.setItem(c, 'mermaid'), CHAVE);
  await abrir(page, `${URL_FEATURE}#view=completo`);
  await expect(seletor(page)).toHaveValue('mermaid');
  expect(hash(page)).toBe('#view=completo');

  // Persp in the URL: applies, and does not erase the stored choice.
  await abrir(page, `${URL_FEATURE}#persp=mermaid`);
  await expect(seletor(page)).toHaveValue('mermaid');
  expect(hash(page)).toBe('#persp=mermaid');
  expect(await guardada(page)).toBe('mermaid');
  expect(erros).toEqual([]);
});

test('escolha guardada que o site não conhece é ignorada e o padrão vale (19.3, 19.5)', async ({ page }) => {
  const erros = coletarErros(page);
  await page.addInitScript((c) => window.localStorage.setItem(c, '3d'), CHAVE);
  await abrir(page, URL_FEATURE);
  await expect(seletor(page)).toHaveValue('mermaid');
  await expect(palco(page).locator('[data-perspectiva="mermaid"]')).toHaveCount(1);
  expect(await palco(page).locator('svg g.node[data-id]').count()).toBeGreaterThan(0);
  expect(erros).toEqual([]);
});

test('localStorage bloqueado: a página abre, o seletor funciona e a escolha fica só na URL (19.5)', async ({ page }) => {
  const erros = coletarErros(page);
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new DOMException('The operation is insecure.', 'SecurityError');
      },
    });
  });
  await abrir(page, `${URL_FEATURE}#view=completo&persp=mermaid`);
  await expect(seletor(page)).toHaveValue('mermaid');
  await seletor(page).selectOption('mermaid');
  await pronto(page);
  await expect(palco(page)).toHaveAttribute('data-view', 'completo');
  expect(hash(page)).toContain('persp=mermaid');
  expect(await palco(page).locator('svg g.node[data-id]').count()).toBeGreaterThan(0);

  // Opening with no Perspectiva anywhere falls to the default.
  await abrir(page, URL_FEATURE);
  await expect(seletor(page)).toHaveValue('mermaid');
  expect(erros).toEqual([]);
});

test('Perspectiva desconhecida na URL cai no padrão sem erro e preserva o resto do estado (19.3)', async ({ page }) => {
  const erros = coletarErros(page);
  await page.addInitScript((c) => window.localStorage.setItem(c, 'mermaid'), CHAVE);
  await abrir(page, `${URL_FEATURE}#persp=nao-existe&view=completo`);
  await expect(seletor(page)).toHaveValue('mermaid');
  await expect(palco(page)).toHaveAttribute('data-view', 'completo');
  await expect(palco(page).locator('[data-perspectiva="mermaid"]')).toHaveCount(1);
  expect(await palco(page).locator('svg g.node[data-id]').count()).toBeGreaterThan(0);
  expect(hash(page)).not.toContain('nao-existe');
  expect(erros).toEqual([]);
});

test('rótulos do seletor em pt-BR e en (19.11)', async ({ page }) => {
  await abrir(page, URL_FEATURE);
  await expect(page.getByLabel('Perspectiva')).toBeVisible();
  await expect(page.locator('label[for="flow-perspectiva"]')).toHaveText('Perspectiva');
  await abrir(page, '/en/flows/feature/');
  await expect(page.getByLabel('Perspective')).toBeVisible();
  await expect(page.locator('label[for="flow-perspectiva"]')).toHaveText('Perspective');
  await expect(seletor(page).locator('option')).toHaveText(['Mermaid']);
});
