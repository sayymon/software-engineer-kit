// SPDX-License-Identifier: MIT
// Requirements 3.1 and 16.3: every Nó of the Diagrama exposes `data-id` with the guide id, and each id is a real id of the Modelo_de_Grafo
// (site/dist/pt-BR/api/flows/<demanda>.graph.json). Runs the Visão geral and the full flow (`#view=completo`) once per demand.
// Filter the demands with PLAYWRIGHT_DEMANDS=feature,bug. Requires a built site: npm run build.
import { expect, test, type Page } from '@playwright/test';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const flowsDir = join('site', 'dist', 'pt-BR', 'flows');
if (!existsSync(flowsDir)) throw new Error('site/dist ausente: rode npm run build');

const filtro = (process.env.PLAYWRIGHT_DEMANDS ?? '').split(',').map((s) => s.trim()).filter(Boolean);
const demands = readdirSync(flowsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory() && existsSync(join(flowsDir, d.name, 'index.html')))
  .filter((d) => readFileSync(join(flowsDir, d.name, 'index.html'), 'utf8').includes('data-island="flow"'))
  .map((d) => d.name)
  .filter((d) => !filtro.length || filtro.includes(d));

interface Grafo {
  raias: { id: string }[];
  nos: { id: string }[];
}
const grafoDe = (demanda: string): Grafo => JSON.parse(readFileSync(join('site', 'dist', 'pt-BR', 'api', 'flows', `${demanda}.graph.json`), 'utf8')) as Grafo;

const palco = (page: Page) => page.locator('[data-flow-stage]');

/** Reads, in the page, every `g.node` (id attribute, data-id) and every `g.cluster` (data-id) of the stage. */
async function ler(page: Page) {
  return palco(page).evaluate((stage) => {
    // The legend (`z_LEG_*`) and the cross-demand bridges (`z_LIG_*`, a link to another Demanda) are drawn by the generator, are not Nós of
    // the Modelo_de_Grafo and have no graph id: the Renderizador leaves them unstamped on purpose (see aplicarDataIds).
    const dados = (e: Element) => ({ domId: e.id, dataId: e.getAttribute('data-id') });
    const naLegenda = (e: Element) => /-z_(LEG|LIG)(_|$)/.test(e.id);
    const todos = Array.from(stage.querySelectorAll('g.node'));
    return {
      nos: todos.filter((n) => !naLegenda(n)).map(dados),
      legenda: todos.filter((n) => /-z_LEG(_|$)/.test(n.id)).length,
      clusters: Array.from(stage.querySelectorAll('g.cluster')).filter((c) => !naLegenda(c)).map(dados),
    };
  });
}

test('o build tem demandas para o teste de data-id', () => {
  expect(demands.length).toBeGreaterThan(0);
});

for (const demand of demands) {
  test(`todo g.node expõe data-id de um id real do grafo: ${demand}`, async ({ page }) => {
    test.setTimeout(240_000);
    const erros: string[] = [];
    page.on('pageerror', (e) => erros.push(e.message));
    const grafo = grafoDe(demand);
    const idsDeNo = new Set(grafo.nos.map((n) => n.id));
    const idsDeRaia = new Set(grafo.raias.map((r) => r.id));
    expect(idsDeNo.size).toBeGreaterThan(0);

    for (const v of [
      { nome: 'geral', url: `/pt-BR/flows/${demand}/` },
      { nome: 'completo', url: `/pt-BR/flows/${demand}/#view=completo` },
    ]) {
      await page.goto(v.url);
      await page.reload(); // a hash-only goto keeps the page: the island must open in the View of the URL
      await expect(palco(page)).toHaveAttribute('data-rendered', 'true', { timeout: 90_000 });
      await expect(palco(page)).toHaveAttribute('data-view', v.nome);
      const { nos, clusters, legenda } = await ler(page);
      expect(legenda, `${demand}/${v.nome}: a legenda do diagrama some`).toBeGreaterThan(0);
      expect(nos.length, `${demand}/${v.nome}: nenhum g.node`).toBeGreaterThan(0);

      // Every g.node exposes a data-id: a Nó of the graph, or (Visão geral only) a collapsed Cluster_de_Raia `cluster:<raia>` of a real lane.
      const semDataId = nos.filter((n) => !n.dataId).map((n) => n.domId);
      expect(semDataId, `${demand}/${v.nome}: g.node sem data-id`).toEqual([]);
      const invalidos = nos
        .map((n) => n.dataId as string)
        .filter((id) => !(idsDeNo.has(id) || (v.nome === 'geral' && id.startsWith('cluster:') && idsDeRaia.has(id.slice('cluster:'.length)))));
      expect(invalidos, `${demand}/${v.nome}: data-id fora do Modelo_de_Grafo`).toEqual([]);

      const ids = nos.map((n) => n.dataId as string);
      expect(new Set(ids).size, `${demand}/${v.nome}: data-id repetido`).toBe(ids.length);

      // The full flow draws every Nó of the graph; the Visão geral draws clusters or Nós, never an unknown id.
      if (v.nome === 'completo') {
        expect(ids.filter((id) => idsDeNo.has(id)).length).toBe(idsDeNo.size);
      }
      // Lane subgraphs also carry a lane id of the graph.
      const clustersSemId = clusters.filter((c) => !c.dataId).map((c) => c.domId);
      expect(clustersSemId, `${demand}/${v.nome}: g.cluster sem data-id`).toEqual([]);
      expect(clusters.map((c) => c.dataId as string).filter((id) => !idsDeRaia.has(id)), `${demand}/${v.nome}: raia fora do grafo`).toEqual([]);
    }
    expect(erros).toEqual([]);
  });
}
