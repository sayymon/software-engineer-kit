// SPDX-License-Identifier: MIT
// Visão geral e expansão progressiva (Requirements 20.1 to 20.11, 15.8) on the built site, with `mermaid.render` counted by the shim of
// helpers/mermaid.ts (product code untouched): opens in `geral` with one render, expanding a lane draws only the new Conjunto_Expandido
// (one render, no node of a collapsed lane in the text), collapsing is a cache hit, Expandir tudo shows the indicator within 100 ms
// and ends equal to the golden, a request made obsolete is never applied, the cluster works by keyboard and `exp=` reopens the state.
// The overlap (20.12) and the order of the Views (20.x criteria 6 and 7 of stage 3) live in label-overlap.spec.ts and ordem-views.spec.ts.
// Requires a built site: npm run build.
import { expect, test, type Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { abrir, coletarErros, grafoDe, palco, pronto } from './helpers/demandas';
import { ajustarMermaid, chamadas, configDoMermaid, instrumentarMermaid, totalDeChamadas } from './helpers/mermaid';

const DEMANDA = 'feature';
const URL_FEATURE = `/pt-BR/flows/${DEMANDA}/`;
const grafo = grafoDe(DEMANDA);
const golden = (nome: string) => readFileSync(join('tests', 'fixtures', 'mermaid', 'golden', nome), 'utf8');
/** The raias of the tests: small, with subtasks, and not the orchestrator. */
const [A, B] = ['feat_ent', 'feat_lev'];
const nosDa = (raia: string) => grafo.nos.filter((n) => n.raia === raia).map((n) => n.id);
const aparece = (texto: string, id: string) => new RegExp(`\\b${id}\\b`).test(texto);
const clusters = (page: Page) => palco(page).locator('svg g.node[data-id^="cluster:"]');
const idsDosNos = (page: Page) => palco(page).locator('svg g.node[data-id]').evaluateAll((ns) => ns.map((n) => n.getAttribute('data-id') as string));
const hash = (page: Page) => new URL(page.url()).hash;

/** Opens the page with `mermaid.render` instrumented; fails the test on an uncaught exception or console error. */
async function abrirInstrumentado(page: Page, url: string) {
  const erros = coletarErros(page);
  await instrumentarMermaid(page);
  await abrir(page, url);
  return erros;
}

test('abre na Visão geral: um render, só Clusters_de_Raia, legenda e totais (20.1, 20.2)', async ({ page }) => {
  const erros = await abrirInstrumentado(page, URL_FEATURE);
  await expect(palco(page)).toHaveAttribute('data-view', 'geral');
  expect(hash(page)).toBe('');

  const render = await chamadas(page);
  expect(render, 'a abertura desenha uma vez').toHaveLength(1);
  const texto = render[0].texto;
  for (const no of grafo.nos) expect(aparece(texto, no.id), `${no.id} não pertence à Visão geral`).toBe(false);
  expect(texto).toContain('z_LEG');

  // One Cluster_de_Raia per Raia, each a focusable button with the lane name and the totals, and the lane colour on the box.
  await expect(clusters(page)).toHaveCount(grafo.raias.length);
  const raia = grafo.raias.find((r) => r.id === A) as (typeof grafo.raias)[number] & { nome: string; cor: string };
  const cluster = palco(page).locator(`svg g.node[data-id="cluster:${A}"]`);
  const tarefas = grafo.nos.filter((n) => n.raia === A && n.tipo === 'tarefa').length;
  const gateways = grafo.nos.filter((n) => n.raia === A && n.tipo === 'bifurcacao').length;
  const subtarefas = grafo.nos.filter((n) => n.raia === A).reduce((s, n) => s + (n as unknown as { subtarefas: unknown[] }).subtarefas.length, 0);
  const rotulo = (await cluster.getAttribute('aria-label')) as string;
  expect(rotulo).toContain(raia.nome);
  expect(rotulo).toContain(`${nosDa(A).length} nós, ${tarefas} tarefas, ${gateways} gateways, ${subtarefas} subtarefas`);
  const visivel = ((await cluster.textContent()) ?? '').replace(/\s+/g, ' ');
  expect(visivel).toContain(raia.nome);
  expect(visivel).toMatch(new RegExp(`${tarefas} tarefas?, ${gateways} gateways?, ${subtarefas} subtarefas?`));
  expect(await cluster.evaluate((e) => e.innerHTML.toLowerCase())).toContain(raia.cor.toLowerCase());

  // The aggregated edges say how many edges of the graph they stand for, and the legend is on the drawing.
  const rotulosDeAresta = (await palco(page).locator('svg .edgeLabel').evaluateAll((es) => es.map((e) => e.textContent ?? ''))).map((s) => s.trim()).filter(Boolean);
  const contagens = rotulosDeAresta.map((s) => /^×(\d+)$/.exec(s)?.[1]).filter(Boolean).map(Number);
  expect(contagens.length, 'arestas agregadas com ×N').toBeGreaterThan(0);
  expect(Math.min(...contagens)).toBeGreaterThanOrEqual(2);
  expect(contagens.every((n) => texto.includes(`×${n}`))).toBe(true);
  expect(await palco(page).locator('svg [id*="z_LEG"]').count()).toBeGreaterThan(0);
  expect(erros).toEqual([]);
});

test('expandir uma Raia desenha só o conjunto novo; recolher volta ao cluster sem novo render (20.3, 20.4, 20.7)', async ({ page }) => {
  const erros = await abrirInstrumentado(page, URL_FEATURE);
  const total = await clusters(page).count();
  const antes = await idsDosNos(page);
  expect(await totalDeChamadas(page)).toBe(1);

  await palco(page).locator(`svg g.node[data-id="cluster:${A}"]`).click();
  await pronto(page);
  await expect.poll(() => hash(page)).toBe(`#exp=${A}`);
  let render = await chamadas(page);
  expect(render, 'um render para o conjunto novo').toHaveLength(2);
  const texto = render[1].texto;
  for (const id of nosDa(A)) expect(aparece(texto, id), `${id} da raia expandida`).toBe(true);
  for (const r of grafo.raias.filter((x) => x.id !== A)) for (const id of nosDa(r.id)) expect(aparece(texto, id), `${id} da raia recolhida`).toBe(false);
  // An edge from a Nó of the expanded lane to a collapsed lane ends on that lane's cluster (20.4).
  const noDaA = new Set(nosDa(A));
  expect(texto.split('\n').some((l) => /z_CL_/.test(l) && /-->|-\.->|==>|--/.test(l) && [...noDaA].some((id) => aparece(l, id)))).toBe(true);

  // Monotonic (20.7): only the expanded cluster leaves; every other Nó stays.
  const depois = await idsDosNos(page);
  expect(antes.filter((id) => id !== `cluster:${A}` && !depois.includes(id))).toEqual([]);
  expect(depois).not.toContain(`cluster:${A}`);
  expect(nosDa(A).every((id) => depois.includes(id))).toBe(true);
  await expect(clusters(page)).toHaveCount(total - 1);

  // Expanding a second lane adds its Nós and removes only its cluster.
  await palco(page).locator(`svg g.node[data-id="cluster:${B}"]`).click();
  await pronto(page);
  await expect.poll(() => hash(page)).toBe(`#exp=${[A, B].sort().join(',')}`);
  render = await chamadas(page);
  expect(render).toHaveLength(3);
  const apos = await idsDosNos(page);
  expect(depois.filter((id) => id !== `cluster:${B}` && !apos.includes(id))).toEqual([]);
  expect(nosDa(B).every((id) => apos.includes(id))).toBe(true);

  // Recolher (the keyboard path of the bar) returns to the cluster; the drawing is in the cache, so there is no new render.
  await page.locator('[data-flow-raias] summary').click();
  await page.locator(`[data-flow-raia-alternar="${B}"]`).click();
  await pronto(page);
  await expect.poll(() => hash(page)).toBe(`#exp=${A}`);
  await page.locator(`[data-flow-raia-alternar="${A}"]`).click();
  await pronto(page);
  await expect.poll(() => hash(page)).toBe('');
  await expect(clusters(page)).toHaveCount(total);
  expect(await idsDosNos(page)).toEqual(antes);
  expect(await totalDeChamadas(page), 'recolher usa o cache').toBe(3);
  expect(erros).toEqual([]);
});

test('Subtarefas de uma tarefa e o alternador Subtarefas só mexem no que devem (20.5)', async ({ page }) => {
  const tarefa = grafo.nos.find((n) => n.raia === A && (n as unknown as { subtarefas: unknown[] }).subtarefas.length) as unknown as { id: string; subtarefas: { id: string }[] };
  const outra = grafo.nos.find((n) => n.raia === A && n.id !== tarefa.id && (n as unknown as { subtarefas: unknown[] }).subtarefas.length) as unknown as { id: string; subtarefas: { id: string }[] };
  expect(tarefa && outra, 'a raia de teste tem duas tarefas com subtarefas').toBeTruthy();
  const erros = await abrirInstrumentado(page, `${URL_FEATURE}#exp=r=${A};s=${tarefa.id}`);

  const ids = await idsDosNos(page);
  for (const s of tarefa.subtarefas) expect(ids, `subtarefa ${s.id} da tarefa expandida`).toContain(s.id);
  for (const s of outra.subtarefas) expect(ids, `subtarefa ${s.id} de outra tarefa`).not.toContain(s.id);
  expect(await totalDeChamadas(page)).toBe(1);

  // The "Subtarefas" toggle (sub=1) expands the Subtarefas of every expanded lane.
  await abrir(page, `${URL_FEATURE}#exp=${A}&sub=1`);
  const todas = await idsDosNos(page);
  for (const n of grafo.nos.filter((x) => x.raia === A)) for (const s of (n as unknown as { subtarefas: { id: string }[] }).subtarefas) expect(todas).toContain(s.id);
  const outraRaia = grafo.nos.filter((x) => x.raia !== A).flatMap((x) => (x as unknown as { subtarefas: { id: string }[] }).subtarefas.map((s) => s.id));
  expect(todas.filter((id) => outraRaia.includes(id))).toEqual([]);
  expect(erros).toEqual([]);
});

test('Expandir tudo: indicador em até 100 ms, diagrama anterior visível, resultado igual ao golden (20.6, 20.9)', async ({ page }) => {
  test.setTimeout(240_000);
  const erros = await abrirInstrumentado(page, URL_FEATURE);
  const total = await clusters(page).count();

  // Probe in the page: click time, first frame painted with the indicator on, and what was on screen at that moment.
  await page.evaluate(() => {
    const palco = document.querySelector('[data-flow-stage]') as HTMLElement;
    const sonda = { clique: 0, indicador: -1, quadro: -1, ocupado: '', clusters: -1, papel: '' };
    (window as unknown as { __sonda: typeof sonda }).__sonda = sonda;
    document.addEventListener('click', () => (sonda.clique = performance.now()), { capture: true, once: true });
    const obs = new MutationObserver(() => {
      const s = palco.querySelector<HTMLElement>('[role="status"]');
      if (sonda.indicador >= 0 || !s || s.hidden) return;
      sonda.indicador = performance.now();
      sonda.ocupado = palco.getAttribute('aria-busy') ?? '';
      sonda.clusters = palco.querySelectorAll('svg g.node[data-id^="cluster:"]').length;
      sonda.papel = s.textContent ?? '';
      requestAnimationFrame(() => (sonda.quadro = performance.now()));
    });
    obs.observe(palco, { subtree: true, attributes: true, childList: true });
  });
  await page.locator('[data-flow-raias-tudo="expandir"]').click();
  await expect.poll(() => page.evaluate(() => (window as unknown as { __sonda: { quadro: number } }).__sonda.quadro), { timeout: 5_000 }).toBeGreaterThan(0);
  const sonda = await page.evaluate(() => (window as unknown as { __sonda: Record<string, number | string> }).__sonda);
  // CPU as the machine runs it (no throttling): the target is 100 ms from the click to the first frame with the indicator.
  expect((sonda.indicador as number) - (sonda.clique as number), 'indicador no DOM').toBeLessThanOrEqual(100);
  expect((sonda.quadro as number) - (sonda.clique as number), 'indicador pintado').toBeLessThanOrEqual(100);
  expect(sonda.ocupado).toBe('true');
  expect(sonda.clusters, 'o diagrama anterior segue visível').toBe(total);
  expect((sonda.papel as string).length).toBeGreaterThan(0);

  await pronto(page);
  await expect(palco(page)).toHaveAttribute('data-view', 'completo');
  expect(hash(page)).toBe('#view=completo');
  await expect(palco(page)).not.toHaveAttribute('aria-busy', 'true');

  // The Texto_Mermaid of the set with every lane is the golden of `completo`, byte for byte; the drawing carries the same ids.
  const render = await chamadas(page);
  expect(render).toHaveLength(2);
  const gold = golden('feature.completo.mmd');
  expect(render[1].texto).toBe(gold);
  const idsDoGolden = [...gold.matchAll(/<small><b>([A-Za-z0-9_]+)<\/b><\/small>/g)].map((m) => m[1]).sort();
  expect(idsDoGolden.length).toBe(grafo.nos.length);
  expect((await idsDosNos(page)).sort()).toEqual(idsDoGolden);
  expect(erros).toEqual([]);
});

test('completo com Subtarefas é igual ao golden com Subtarefas (20.6)', async ({ page }) => {
  test.setTimeout(240_000);
  const erros = await abrirInstrumentado(page, `${URL_FEATURE}#view=completo&sub=1`);
  const render = await chamadas(page);
  expect(render).toHaveLength(1);
  expect(render[0].texto).toBe(golden('feature.completo.subtarefas.mmd'));
  expect(erros).toEqual([]);
});

test('pedido obsoleto é descartado: só o último estado vai à tela (20.9)', async ({ page }) => {
  const erros = await abrirInstrumentado(page, URL_FEATURE);
  const total = await clusters(page).count();
  await ajustarMermaid(page, { atrasoMs: 1500 });
  // Every state that reaches the screen is recorded as the number of clusters it shows.
  await page.evaluate(() => {
    const palco = document.querySelector('[data-flow-stage]') as HTMLElement;
    const vistos: number[] = [];
    (window as unknown as { __vistos: number[] }).__vistos = vistos;
    const registrar = () => {
      const n = palco.querySelectorAll('svg g.node[data-id^="cluster:"]').length;
      if (vistos.at(-1) !== n) vistos.push(n);
    };
    registrar();
    new MutationObserver(registrar).observe(palco, { subtree: true, childList: true });
  });

  await palco(page).locator(`svg g.node[data-id="cluster:${A}"]`).click();
  await expect.poll(() => totalDeChamadas(page)).toBe(2); // the render of A is in flight (slowed down)
  await expect(palco(page).locator('[role="status"]')).toBeVisible();
  // The previous drawing stays on screen and interactive while the first request is in flight.
  await expect(clusters(page)).toHaveCount(total);
  await palco(page).locator(`svg g.node[data-id="cluster:${B}"]`).click();
  await expect.poll(() => hash(page)).toBe(`#exp=${[A, B].sort().join(',')}`);
  await pronto(page);

  // Three renders (initial, A, A+B), but the screen went from `total` clusters straight to `total - 2`: A alone never showed.
  expect(await totalDeChamadas(page)).toBe(3);
  await expect(clusters(page)).toHaveCount(total - 2);
  expect(await page.evaluate(() => (window as unknown as { __vistos: number[] }).__vistos)).toEqual([total, total - 2]);
  const ids = await idsDosNos(page);
  for (const id of [...nosDa(A), ...nosDa(B)]) expect(ids).toContain(id);
  expect(erros).toEqual([]);
});

test('render acima do alvo termina sem erro e informa o tempo decorrido (20.9, 15.8)', async ({ page }) => {
  const erros = await abrirInstrumentado(page, URL_FEATURE);
  await ajustarMermaid(page, { atrasoMs: 1300 });
  await palco(page).locator(`svg g.node[data-id="cluster:${A}"]`).click();
  await pronto(page);
  const status = palco(page).locator('[role="status"]');
  await expect(status).toBeVisible();
  await expect(status).toHaveText(/Diagrama desenhado em \d+(\.\d)? s\./);
  expect(Number(/(\d+(?:\.\d)?) s/.exec(await status.innerText())?.[1])).toBeGreaterThanOrEqual(1.3);
  await expect(palco(page)).not.toHaveAttribute('aria-busy', 'true');
  expect(erros).toEqual([]);
});

test('limites do Mermaid cobrem as Demandas; ao recusar por limite, mostra a mensagem e a alternativa textual (20.10)', async ({ page }) => {
  const erros = await abrirInstrumentado(page, URL_FEATURE);
  const config = (await configDoMermaid(page)) as { maxTextSize: number; maxEdges: number };
  expect(config.maxTextSize).toBeGreaterThanOrEqual(50_000);
  expect(config.maxEdges).toBeGreaterThanOrEqual(500);
  const total = await clusters(page).count();

  await ajustarMermaid(page, { limite: true });
  await palco(page).locator(`svg g.node[data-id="cluster:${A}"]`).click();
  await expect(palco(page)).toHaveAttribute('data-rendered', 'error', { timeout: 30_000 });
  const painel = palco(page).locator('.flow-erro');
  await expect(painel).toHaveAttribute('role', 'alert');
  await expect(painel).toContainText('limite de tamanho do Mermaid');
  await expect(painel.locator('button')).toHaveText(['Ver alternativa textual']); // a limit is not retried
  await expect(clusters(page)).toHaveCount(total); // the previous drawing stays
  await painel.locator('button').click();
  await expect(page.locator('section.textflow h2')).toBeFocused();
  expect(erros).toEqual([]);
});

test('Cluster_de_Raia por teclado: Enter expande, Abrir raia é uma ação separada, data-id é o da Raia (20.11)', async ({ page }) => {
  const erros = await abrirInstrumentado(page, URL_FEATURE);
  const cluster = palco(page).locator(`svg g.node[data-id="cluster:${A}"]`);
  await expect(cluster).toHaveAttribute('role', 'button');
  await expect(cluster).toHaveAttribute('tabindex', '0');
  await cluster.focus();
  await expect(cluster).toBeFocused();
  // The collapsed cluster is `cluster:<raia>`; once expanded, the lane group exposes the bare id of the lane.
  await page.keyboard.press('Enter');
  await pronto(page);
  await expect.poll(() => hash(page)).toBe(`#exp=${A}`);
  const grupo = palco(page).locator(`svg g.cluster[data-id="${A}"]`);
  await expect(grupo).toHaveCount(1);
  await expect(grupo).toBeFocused(); // the focus follows the expansion
  expect(await page.evaluate(() => document.activeElement?.getAttribute('data-id'))).toBe(A);
  expect(await palco(page).locator(`svg g.node[data-id="cluster:${A}"]`).count()).toBe(0);

  // Expanding with Enter does not open the lane; "Abrir raia" does, by keyboard, through its own button.
  await expect(palco(page)).toHaveAttribute('data-view', 'geral');
  await page.locator('[data-flow-raias] summary').focus();
  await page.keyboard.press('Enter');
  const abrirRaia = page.locator(`[data-flow-raia-abrir="${A}"]`);
  await abrirRaia.focus();
  await expect(abrirRaia).toBeFocused();
  await page.keyboard.press('Enter');
  await pronto(page);
  await expect(palco(page)).toHaveAttribute('data-view', `raia:${A}`);
  expect(hash(page)).toContain(`view=raia:${A}`);
  expect(erros).toEqual([]);
});

test('a URL com exp= reabre o mesmo estado; todas as Raias viram completo (20.8)', async ({ page }) => {
  const erros = await abrirInstrumentado(page, `${URL_FEATURE}#exp=${B},${A}`);
  await expect(palco(page)).toHaveAttribute('data-view', 'geral');
  expect(hash(page), 'fragmento canônico, ordenado').toBe(`#exp=${A},${B}`);
  const ids = await idsDosNos(page);
  for (const id of [...nosDa(A), ...nosDa(B)]) expect(ids).toContain(id);
  expect(ids).not.toContain(`cluster:${A}`);
  expect(ids).not.toContain(`cluster:${B}`);
  expect(ids).toContain(`cluster:${grafo.raias.find((r) => ![A, B].includes(r.id))?.id}`);
  const render = await chamadas(page);
  expect(render, 'abrir a URL desenha uma vez, direto no conjunto').toHaveLength(1);

  // Reload and a copy of the URL in a new page give the same drawing.
  const idsAntes = [...ids].sort();
  await page.reload();
  await pronto(page);
  expect([...(await idsDosNos(page))].sort()).toEqual(idsAntes);
  const outra = await page.context().newPage();
  await outra.goto(page.url());
  await pronto(outra);
  expect([...(await idsDosNos(outra))].sort()).toEqual(idsAntes);
  await outra.close();

  // Unknown lanes are ignored; with every lane the state is `completo`.
  await abrir(page, `${URL_FEATURE}#exp=${A},nao_existe`);
  expect(hash(page)).toBe(`#exp=${A}`);
  await abrir(page, `${URL_FEATURE}#exp=${grafo.raias.map((r) => r.id).join(',')}`);
  await expect(palco(page)).toHaveAttribute('data-view', 'completo');
  expect(hash(page)).toBe('#view=completo');
  expect(erros).toEqual([]);
});
