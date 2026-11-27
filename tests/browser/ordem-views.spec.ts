// SPDX-License-Identifier: MIT
// Ordem horizontal dos Nós em cada View e em cada Conjunto_Expandido (Requirement 2.6, from criterion 6 of stage 3 in
// docs/guide-browser-tests.md, the old `cdp_ordem.mjs`): in every Demanda, the Nós of one Raia are laid out left to right in the order of
// the Modelo_de_Grafo (`ordem`, read from api/flows/<id>.graph.json). Measured on the real Mermaid layout, per View: `completo`, each
// `raia:<id>`, and the Visão geral with a Conjunto_Expandido (the orchestrator plus the largest lane, and the two largest lanes).
//
// Comparison rule (what "segue a ordem" means for a layout engine that ranks by edges, not by file order):
//  - Pairs compared: every transition `a -> b` inside one Raia with `b.ordem > a.ordem`, both drawn in the View. A transition is the
//    only place where the guide says "b comes after a"; two Nós joined by no edge (dead-end `fim` Nós, alternative branches) share no
//    sequence and the engine ranks them by their other edges, so comparing every pair by `ordem` would test the guide's file order, not the flow.
//  - Excluded: transitions that close a cycle (b reaches a through the transitions and the call/return edges). A retry loop is drawn
//    right to left on purpose, whatever the `ordem` of its Nós.
//  - Tolerance: 1 px. The centre comes from getBoundingClientRect (sub-pixel), and a successor can never share the rank of its
//    predecessor, so a real inversion is hundreds of px (the smallest seen is 258 px); 1 px only absorbs rounding.
// The same order must also come out whether the View is opened by URL or reached by tab (2.6 together with 2.7).
// Filter the Demandas with PLAYWRIGHT_DEMANDS=feature,bug. Requires a built site: npm run build.
import { expect, test, type Page } from '@playwright/test';
import { aba, abrir, coletarErros, demandas, grafoDe, palco, type Grafo } from './helpers/demandas';

const TOLERANCIA_PX = 1;

/** Centre x of every drawn `g.node` that carries the id of a Nó of the graph. */
async function centros(page: Page, grafo: Grafo): Promise<Map<string, number>> {
  const ids = new Set(grafo.nos.map((n) => n.id));
  const lidos = await palco(page).evaluate(
    (stage) =>
      Array.from(stage.querySelectorAll('g.node[data-id]')).map((n) => {
        const b = n.getBoundingClientRect();
        return [n.getAttribute('data-id') as string, b.x + b.width / 2] as [string, number];
      }),
  );
  return new Map(lidos.filter(([id]) => ids.has(id)));
}

/** Transitions `a -> b` of one Raia that move forward in `ordem` and do not close a cycle. */
function transicoesDeSequencia(grafo: Grafo) {
  const no = new Map(grafo.nos.map((n) => [n.id, n]));
  const seguintes = new Map<string, string[]>();
  for (const e of [...grafo.arestas, ...grafo.transicoes]) seguintes.set(e.origem, [...(seguintes.get(e.origem) ?? []), e.destino]);
  const alcanca = (de: string, para: string): boolean => {
    const visto = new Set([de]);
    const pilha = [de];
    while (pilha.length) {
      const atual = pilha.pop() as string;
      if (atual === para) return true;
      for (const prox of seguintes.get(atual) ?? []) if (!visto.has(prox)) (visto.add(prox), pilha.push(prox));
    }
    return false;
  };
  const sequencia: { a: string; b: string; raia: string }[] = [];
  for (const t of grafo.transicoes) {
    const a = no.get(t.origem);
    const b = no.get(t.destino);
    if (!a || !b || a.raia !== b.raia || b.ordem <= a.ordem || alcanca(t.destino, t.origem)) continue;
    sequencia.push({ a: a.id, b: b.id, raia: a.raia });
  }
  return sequencia;
}

/** Applies the rule to what is drawn. Returns the inversions and how many pairs were compared. */
function comparar(sequencia: ReturnType<typeof transicoesDeSequencia>, x: Map<string, number>) {
  let comparados = 0;
  const inversoes: string[] = [];
  for (const s of sequencia) {
    const xa = x.get(s.a);
    const xb = x.get(s.b);
    if (xa === undefined || xb === undefined) continue;
    comparados += 1;
    if (xa - xb > TOLERANCIA_PX) inversoes.push(`${s.raia}: ${s.a} (x=${Math.round(xa)}) deveria ficar à esquerda de ${s.b} (x=${Math.round(xb)})`);
  }
  return { comparados, inversoes };
}

/** Ids of the drawn Nós from left to right (ties by id), to compare two ways of reaching the same View. */
const sequenciaPorX = (x: Map<string, number>) => [...x].sort((p, q) => p[1] - q[1] || p[0].localeCompare(q[0])).map(([id]) => id);

test('o build tem demandas para o teste de ordem', () => {
  expect(demandas.length).toBeGreaterThan(0);
});

for (const demanda of demandas) {
  test(`mesma ordem horizontal dos Nós em cada View e Conjunto_Expandido: ${demanda}`, async ({ page }) => {
    test.setTimeout(300_000);
    const erros = coletarErros(page);
    const grafo = grafoDe(demanda);
    const sequencia = transicoesDeSequencia(grafo);
    expect(sequencia.length, `${demanda}: nenhuma transição de sequência no grafo`).toBeGreaterThan(0);

    // Lanes by the number of compared pairs, to pick Conjuntos_Expandidos that exercise the rule: the orchestrator lane, then the richest ones.
    const tamanho = (id: string) => sequencia.filter((s) => s.raia === id).length;
    const orq = grafo.raias.find((r) => r.orquestradora) ?? grafo.raias[0];
    const maiores = grafo.raias.filter((r) => r.id !== orq.id).sort((p, q) => tamanho(q.id) - tamanho(p.id) || p.ordem - q.ordem);
    const casos = [
      { nome: 'completo', url: `/pt-BR/flows/${demanda}/#view=completo`, view: 'completo' },
      ...grafo.raias.map((r) => ({ nome: `raia:${r.id}`, url: `/pt-BR/flows/${demanda}/#view=raia:${r.id}`, view: `raia:${r.id}` })),
      { nome: 'geral', url: `/pt-BR/flows/${demanda}/`, view: 'geral' },
      { nome: `geral+exp(${orq.id},${maiores[0].id})`, url: `/pt-BR/flows/${demanda}/#exp=${orq.id},${maiores[0].id}`, view: 'geral', expandidas: [orq.id, maiores[0].id] },
      { nome: `geral+exp(${maiores[0].id},${maiores[1].id})`, url: `/pt-BR/flows/${demanda}/#exp=${maiores[0].id},${maiores[1].id}`, view: 'geral', expandidas: [maiores[0].id, maiores[1].id] },
    ];

    let completo: string[] = [];
    for (const c of casos) {
      await abrir(page, c.url);
      await expect(palco(page)).toHaveAttribute('data-view', c.view);
      const x = await centros(page, grafo);
      for (const r of c.expandidas ?? []) {
        // The lane is drawn as a subgraph with its Nós, not as a collapsed Cluster_de_Raia.
        await expect(palco(page).locator(`svg g.cluster[data-id="${r}"]`), `${c.nome}: raia ${r} não expandiu`).toHaveCount(1);
        expect(grafo.nos.filter((n) => n.raia === r).every((n) => x.has(n.id)), `${c.nome}: Nó de ${r} não desenhado`).toBe(true);
      }
      const { comparados, inversoes } = comparar(sequencia, x);
      expect(inversoes, `${demanda}/${c.nome}: ordem horizontal`).toEqual([]);
      if (c.nome === 'completo' || c.expandidas) expect(comparados, `${demanda}/${c.nome}: regra sem pares para comparar`).toBeGreaterThan(0);
      if (c.nome === 'completo') completo = sequenciaPorX(x);
    }

    // 2.6 with 2.7: the full flow reached by the tab draws the same left-to-right sequence as the one opened by URL.
    await abrir(page, `/pt-BR/flows/${demanda}/`);
    await aba(page, 'completo').click();
    await expect(palco(page)).toHaveAttribute('data-view', 'completo');
    await expect(palco(page)).toHaveAttribute('data-rendered', 'true', { timeout: 90_000 });
    expect(sequenciaPorX(await centros(page, grafo)), `${demanda}: ordem do completo por aba difere da aberta por URL`).toEqual(completo);
    expect(erros).toEqual([]);
  });
}
