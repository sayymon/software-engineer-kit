// SPDX-License-Identifier: MIT
// Subtarefas na ilha (Requirements 5.1 to 5.6, 5.8, 20.5) on the built site, with `mermaid.render` counted by the shim of
// helpers/mermaid.ts: the "Subtarefas" toggle (`sub=1`), the per-task expansion (`exp=r=<raia>;s=<tarefa>`), the real "N subtarefas" of
// each task, the dashed border and the marker ◆ of the conditional Subtarefa, the toggle hidden when the View has no Subtarefa, and
// the View, the zoom and the scroll kept when it flips. `page.url()` is checked after every interaction.
// The overlap with Subtarefas (5.7) lives in label-overlap.spec.ts. Requires a built site: npm run build.
import { expect, test, type Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { abrir, coletarErros, grafoDe, palco, pronto } from './helpers/demandas';
import { chamadas, instrumentarMermaid, totalDeChamadas } from './helpers/mermaid';

const URL_FEATURE = '/pt-BR/flows/feature/';
interface Sub {
  id: string;
  quando?: string;
}
interface NoComSub {
  id: string;
  raia: string;
  tipo: string;
  subtarefas: Sub[];
}
const grafo = grafoDe('feature');
const nos = grafo.nos as unknown as NoComSub[];
const golden = (nome: string) => readFileSync(join('tests', 'fixtures', 'mermaid', 'golden', nome), 'utf8');

/** The lane of the tests: four tasks with Subtarefas, one of them (feat_ent_t3) with conditional ones. */
const RAIA = 'feat_ent';
const tarefas = nos.filter((n) => n.raia === RAIA && n.subtarefas.length);
const comCondicional = tarefas.find((n) => n.subtarefas.some((s) => s.quando)) as NoComSub;
const hash = (page: Page) => new URL(page.url()).hash;
const barra = (page: Page) => page.locator('[data-flow-subtarefas]');
const alternador = (page: Page) => page.locator('[data-flow-subtarefas-alternar]');
const noDe = (page: Page, id: string) => palco(page).locator(`svg g.node[data-id="${id}"]`);
const idsDosNos = (page: Page) => palco(page).locator('svg g.node[data-id]').evaluateAll((ns) => ns.map((n) => n.getAttribute('data-id') as string));
const texto = async (page: Page, id: string) => (((await noDe(page, id).textContent()) ?? '').replace(/\s+/g, ' ')).trim();

async function abrirInstrumentado(page: Page, url: string) {
  const erros = coletarErros(page);
  await instrumentarMermaid(page);
  await abrir(page, url);
  return erros;
}

/** Whether the shape of a node is drawn with a dashed border, as the browser computes it. */
const tracejado = (page: Page, id: string) =>
  noDe(page, id).evaluate((g) => {
    const forma = g.querySelector('rect, path, polygon') as Element;
    const v = getComputedStyle(forma).strokeDasharray;
    return v !== 'none' && v !== '';
  });

test('o alternador fica oculto quando a View não tem tarefa com Subtarefas (5.6)', async ({ page }) => {
  const erros = await abrirInstrumentado(page, URL_FEATURE);
  await expect(barra(page)).toBeHidden(); // Visão geral: só clusters
  expect(hash(page)).toBe('');

  // The orchestrator lane has no Subtarefa: expanding it keeps the toggle hidden. A lane with Subtarefas shows it.
  const orq = grafo.raias.find((r) => r.orquestradora) as { id: string };
  expect(nos.filter((n) => n.raia === orq.id && n.subtarefas.length)).toHaveLength(0);
  await palco(page).locator(`svg g.node[data-id="cluster:${orq.id}"]`).click();
  await pronto(page);
  await expect.poll(() => hash(page)).toBe(`#exp=${orq.id}`);
  await expect(barra(page)).toBeHidden();
  await page.locator('[data-flow-raias] summary').click();
  await page.locator(`[data-flow-raia-alternar="${RAIA}"]`).click();
  await pronto(page);
  await expect.poll(() => hash(page)).toBe(`#exp=${[orq.id, RAIA].sort().join(',')}`);
  await expect(barra(page)).toBeVisible();
  await page.locator(`[data-flow-raia-alternar="${RAIA}"]`).click();
  await pronto(page);
  await expect(barra(page)).toBeHidden();
  expect(hash(page)).toBe(`#exp=${orq.id}`);

  // The View of the orchestrator lane has none either.
  await abrir(page, `${URL_FEATURE}#view=raia:${orq.id}`);
  await expect(barra(page)).toBeHidden();
  expect(erros).toEqual([]);
});

test('a Demanda sem nenhuma Subtarefa nunca mostra o alternador (5.6)', async ({ page }) => {
  const erros = await abrirInstrumentado(page, '/pt-BR/flows/spike/#view=completo');
  await expect(palco(page)).toHaveAttribute('data-view', 'completo');
  await expect(barra(page)).toBeHidden();
  expect(hash(page)).toBe('#view=completo');
  expect(erros).toEqual([]);
});

test('cada tarefa mostra "N subtarefas" com o N real, e o alternador exibe e oculta todas (5.1 a 5.4)', async ({ page }) => {
  const erros = await abrirInstrumentado(page, `${URL_FEATURE}#exp=${RAIA}`);
  await expect(barra(page)).toBeVisible();
  await expect(alternador(page)).toHaveAttribute('aria-pressed', 'false');
  expect(hash(page)).toBe(`#exp=${RAIA}`);

  // 5.4: with the Subtarefas hidden, every task says how many it has, in the drawing and in the accessible name.
  const sem = await idsDosNos(page);
  for (const t of tarefas) {
    const n = t.subtarefas.length;
    const dito = `${n} subtarefa${n > 1 ? 's' : ''}`;
    expect(await texto(page, t.id), t.id).toContain(dito);
    expect(await noDe(page, t.id).getAttribute('aria-label'), t.id).toContain(dito);
    for (const s of t.subtarefas) expect(sem).not.toContain(s.id);
  }
  expect(await totalDeChamadas(page)).toBe(1);

  // 5.2: the toggle draws every Subtarefa of every task of the expanded lane, and of no other lane.
  await alternador(page).click();
  await pronto(page);
  await expect(alternador(page)).toHaveAttribute('aria-pressed', 'true');
  expect(hash(page)).toBe(`#exp=${RAIA}&sub=1`);
  const com = await idsDosNos(page);
  for (const t of tarefas) for (const s of t.subtarefas) expect(com, s.id).toContain(s.id);
  const dasOutras = nos.filter((n) => n.raia !== RAIA).flatMap((n) => n.subtarefas.map((s) => s.id));
  expect(com.filter((id) => dasOutras.includes(id))).toEqual([]);
  expect(await totalDeChamadas(page)).toBe(2);

  // 5.3: turning it off returns to the drawing without Subtarefas (the cache serves it: no new render).
  await alternador(page).click();
  await pronto(page);
  await expect(alternador(page)).toHaveAttribute('aria-pressed', 'false');
  expect(hash(page)).toBe(`#exp=${RAIA}`);
  expect(await idsDosNos(page)).toEqual(sem);
  expect(await totalDeChamadas(page)).toBe(2);

  // Back undoes the toggle, Forward redoes it, and the URL reproduces the state on a fresh load.
  await page.goBack();
  await expect.poll(() => hash(page)).toBe(`#exp=${RAIA}&sub=1`);
  await pronto(page);
  await expect(alternador(page)).toHaveAttribute('aria-pressed', 'true');
  await abrir(page, `${URL_FEATURE}#exp=${RAIA}&sub=1`);
  await expect(alternador(page)).toHaveAttribute('aria-pressed', 'true');
  expect(hash(page)).toBe(`#exp=${RAIA}&sub=1`);
  expect(erros).toEqual([]);
});

test('a Subtarefa condicional tem borda tracejada e ◆, a comum não (5.5)', async ({ page }) => {
  const erros = await abrirInstrumentado(page, `${URL_FEATURE}#exp=${RAIA}&sub=1`);
  const condicionais = comCondicional.subtarefas.filter((s) => s.quando);
  const comuns = comCondicional.subtarefas.filter((s) => !s.quando);
  expect(condicionais.length && comuns.length, 'a tarefa de teste tem os dois tipos').toBeTruthy();
  for (const s of condicionais) {
    expect(await texto(page, s.id), s.id).toContain('◆');
    expect(await tracejado(page, s.id), `${s.id} tracejada`).toBe(true);
  }
  for (const s of comuns) {
    expect(await texto(page, s.id), s.id).not.toContain('◆');
    expect(await tracejado(page, s.id), `${s.id} contínua`).toBe(false);
  }
  // Every conditional Subtarefa of the lane carries the marker, and no other node does (the legend is not a node of the guide).
  const todas = tarefas.flatMap((t) => t.subtarefas);
  const marcados = await palco(page).locator('svg g.node[data-id]').evaluateAll((ns) => ns.filter((n) => (n.textContent ?? '').includes('◆')).map((n) => n.getAttribute('data-id')));
  expect(marcados.sort()).toEqual(todas.filter((s) => s.quando).map((s) => s.id).sort());
  expect(erros).toEqual([]);
});

test('alternar mantém a View, o zoom e a rolagem (5.8)', async ({ page }) => {
  const erros = await abrirInstrumentado(page, `${URL_FEATURE}#exp=${RAIA}`);
  await page.locator('[data-flow-zoom="mais"]').click();
  await page.locator('[data-flow-zoom="mais"]').click();
  const zoom = await page.locator('[data-flow-zoom="reset"]').textContent();
  expect(zoom).not.toBe('100%');
  const rolagem = await palco(page).evaluate((p) => {
    p.scrollLeft = 60;
    p.scrollTop = 40;
    return { esq: p.scrollLeft, topo: p.scrollTop };
  });
  expect(rolagem.esq + rolagem.topo, 'há onde rolar').toBeGreaterThan(0);
  expect(hash(page)).toBe(`#exp=${RAIA}`);

  await alternador(page).click();
  await pronto(page);
  expect(hash(page)).toBe(`#exp=${RAIA}&sub=1`);
  await expect(palco(page)).toHaveAttribute('data-view', 'geral');
  expect(await page.locator('[data-flow-zoom="reset"]').textContent()).toBe(zoom);
  expect(await palco(page).evaluate((p) => ({ esq: p.scrollLeft, topo: p.scrollTop }))).toEqual(rolagem);
  // The zoom is on the new drawing, not only on the label: the width of the svg is its natural width times the zoom.
  const largura = await palco(page).locator('svg').first().evaluate((s) => ({ css: Number.parseFloat((s as SVGElement).style.width), base: Number(s.getAttribute('data-flow-base')) }));
  expect(largura.css).toBeGreaterThan(0);
  expect(largura.css / largura.base).toBeCloseTo(Number.parseInt(zoom as string, 10) / 100, 1);

  // The same in a lane View, and the choice of View survives the toggle.
  await abrir(page, `${URL_FEATURE}#view=raia:${RAIA}`);
  await expect(barra(page)).toBeVisible();
  await page.locator('[data-flow-zoom="mais"]').click();
  const zoomRaia = await page.locator('[data-flow-zoom="reset"]').textContent();
  await alternador(page).click();
  await pronto(page);
  expect(hash(page)).toBe(`#view=raia:${RAIA}&sub=1`);
  await expect(palco(page)).toHaveAttribute('data-view', `raia:${RAIA}`);
  expect(await page.locator('[data-flow-zoom="reset"]').textContent()).toBe(zoomRaia);
  expect(await idsDosNos(page)).toContain(comCondicional.subtarefas[0].id);
  await expect(page.locator('[data-flow-subtarefas] details')).toBeHidden(); // a lane View only has the global toggle
  expect(erros).toEqual([]);
});

test('a expansão por tarefa abre só as Subtarefas dela (20.5)', async ({ page }) => {
  const [alvo, outra] = tarefas;
  const erros = await abrirInstrumentado(page, `${URL_FEATURE}#exp=${RAIA}`);
  await barra(page).locator('summary').click();
  const botao = (id: string) => page.locator(`[data-flow-subtarefas-tarefa="${id}"]`);
  await expect(page.locator('[data-flow-subtarefas-linha]')).toHaveCount(tarefas.length);
  await expect(botao(alvo.id)).toHaveAttribute('aria-expanded', 'false');
  const nome = (await botao(alvo.id).getAttribute('aria-label')) as string;
  expect(nome).toContain(`${alvo.subtarefas.length} subtarefa`);

  await botao(alvo.id).click();
  await pronto(page);
  expect(hash(page)).toBe(`#exp=r=${RAIA};s=${alvo.id}`);
  await expect(botao(alvo.id)).toHaveAttribute('aria-expanded', 'true');
  await expect(botao(outra.id)).toHaveAttribute('aria-expanded', 'false');
  await expect(alternador(page)).toHaveAttribute('aria-pressed', 'false');
  const ids = await idsDosNos(page);
  for (const s of alvo.subtarefas) expect(ids).toContain(s.id);
  for (const s of outra.subtarefas) expect(ids).not.toContain(s.id);
  const n = outra.subtarefas.length;
  expect(await texto(page, outra.id)).toContain(`${n} subtarefa${n > 1 ? 's' : ''}`); // the others keep their indicator

  // The global toggle takes every task; turning it off clears the per-task set too.
  await alternador(page).click();
  await pronto(page);
  expect(hash(page)).toBe(`#exp=${RAIA}&sub=1`);
  await expect(botao(outra.id)).toBeDisabled();
  await expect(botao(outra.id)).toHaveAttribute('aria-expanded', 'true');
  await alternador(page).click();
  await pronto(page);
  expect(hash(page)).toBe(`#exp=${RAIA}`);
  await expect(botao(alvo.id)).toHaveAttribute('aria-expanded', 'false');

  // The URL reproduces the per-task state, and collapsing the task undoes it.
  await abrir(page, `${URL_FEATURE}#exp=r=${RAIA};s=${alvo.id}`);
  await expect(barra(page).locator('summary')).toBeVisible();
  await barra(page).locator('summary').click();
  await expect(botao(alvo.id)).toHaveAttribute('aria-expanded', 'true');
  await botao(alvo.id).click();
  await pronto(page);
  expect(hash(page)).toBe(`#exp=${RAIA}`);
  expect(erros).toEqual([]);
});

test('em `completo` o alternador só desenha ao clique, com indicador de progresso (20.5, 20.6)', async ({ page }) => {
  test.setTimeout(240_000);
  const erros = await abrirInstrumentado(page, `${URL_FEATURE}#view=completo`);
  await expect(palco(page)).toHaveAttribute('data-view', 'completo');
  await expect(barra(page)).toBeVisible();
  await expect(alternador(page)).toHaveAttribute('aria-pressed', 'false');
  await expect(page.locator('#flow-subtarefas-aviso')).toBeVisible(); // the button warns about the time
  // Nothing draws by itself: one render (the `completo` without Subtarefas) and it stays that way.
  await page.waitForTimeout(1_500);
  expect(await totalDeChamadas(page)).toBe(1);
  expect(hash(page)).toBe('#view=completo');

  // The render blocks the main thread, so a poll from the test would only run after it: an in-page probe sees the indicator.
  await palco(page).evaluate((p) => {
    const w = window as unknown as { __sonda: { ocupado: boolean; status: string; tempo: number } };
    w.__sonda = { ocupado: false, status: '', tempo: performance.now() };
    new MutationObserver(() => {
      const s = p.querySelector<HTMLElement>('[role="status"]');
      if (p.getAttribute('aria-busy') === 'true' && s && !s.hidden && !w.__sonda.ocupado) {
        w.__sonda.ocupado = true;
        w.__sonda.status = s.textContent ?? '';
        w.__sonda.tempo = performance.now() - w.__sonda.tempo;
      }
    }).observe(p, { subtree: true, attributes: true, childList: true });
  });
  await alternador(page).click();
  await pronto(page);
  const sonda = await page.evaluate(() => (window as unknown as { __sonda: { ocupado: boolean; status: string } }).__sonda);
  expect(sonda.ocupado, 'indicador de progresso na tela').toBe(true);
  expect(sonda.status.length).toBeGreaterThan(0);
  await expect(palco(page)).not.toHaveAttribute('aria-busy', 'true');
  expect(hash(page)).toBe('#view=completo&sub=1');
  await expect(alternador(page)).toHaveAttribute('aria-pressed', 'true');
  const render = await chamadas(page);
  expect(render).toHaveLength(2);
  expect(render[1].texto).toBe(golden('feature.completo.subtarefas.mmd'));
  expect(erros).toEqual([]);
});
