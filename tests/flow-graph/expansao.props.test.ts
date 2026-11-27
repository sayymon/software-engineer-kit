// SPDX-License-Identifier: MIT
// Property tests of the progressive expansion (Requirement 20) over random guides and the real demands.
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { gerarGrafo } from '../../lib/flow-graph';
import { chaveDoConjunto, lerConjunto, normalizar, projetar, type ConjuntoExpandido } from '../../lib/flow-graph/expansao';
import type { ModeloDeGrafo } from '../../lib/schema/grafo';
import { casos, casosReais, demandasComRaias, guiaReal } from './geradores';

const NUM_RUNS = 100;

const grafoDoCaso = ({ doc, demanda }: { doc: Parameters<typeof gerarGrafo>[0]; demanda: string }): ModeloDeGrafo =>
  gerarGrafo(doc, demanda);

const tarefasDe = (g: ModeloDeGrafo): string[] => g.nos.filter((n) => n.tipo === 'tarefa').map((n) => n.id);

/** Random subset of `ids`, in random order. */
const subconjunto = (ids: string[]): fc.Arbitrary<string[]> =>
  ids.length ? fc.shuffledSubarray(ids) : fc.constant([]);

const conjuntos = (g: ModeloDeGrafo): fc.Arbitrary<ConjuntoExpandido> =>
  fc
    .tuple(subconjunto(g.raias.map((r) => r.id)), subconjunto(tarefasDe(g)), fc.boolean())
    .map(([r, s, t]) => ({ raias: new Set(r), subtarefas: new Set(s), todasSubtarefas: t }));

/** Pair A ⊆ B (lanes, tasks, and todasSubtarefas implication). */
const paresMonotonos = (g: ModeloDeGrafo): fc.Arbitrary<[ConjuntoExpandido, ConjuntoExpandido]> =>
  conjuntos(g).chain((b) =>
    fc
      .tuple(subconjunto([...b.raias]), subconjunto([...b.subtarefas]), fc.boolean())
      .map(([r, s, t]): [ConjuntoExpandido, ConjuntoExpandido] => [
        { raias: new Set(r), subtarefas: new Set(s), todasSubtarefas: b.todasSubtarefas && t },
        b,
      ]),
  );

const ids = (xs: { id: string }[]) => new Set(xs.map((x) => x.id));
const mesmo = (a: ConjuntoExpandido, b: ConjuntoExpandido) =>
  expect([[...a.raias].sort(), [...a.subtarefas].sort(), a.todasSubtarefas]).toEqual([
    [...b.raias].sort(),
    [...b.subtarefas].sort(),
    b.todasSubtarefas,
  ]);

// Feature: experiencia-fluxos-catalogo, Property 10: A expansão é monótona
describe('Property 10: a expansão é monótona', () => {
  // Validates: Requirements 20.5, 20.7
  it('A ⊆ B shows fewer nodes and more clusters; one extra lane adds exactly its nodes and removes only its cluster', () => {
    fc.assert(
      fc.property(
        casos().chain((c) => {
          const g = grafoDoCaso(c);
          return fc.tuple(fc.constant(g), paresMonotonos(g), fc.constantFrom(...g.raias.map((r) => r.id)), conjuntos(g));
        }),
        ([g, [a, b], raia, base]) => {
          const pa = projetar(g, a);
          const pb = projetar(g, b);
          const nosA = ids(pa.nos);
          const nosB = ids(pb.nos);
          for (const n of nosA) expect(nosB.has(n)).toBe(true);
          const clB = new Set(pb.clusters.map((c) => c.raia));
          const clA = new Set(pa.clusters.map((c) => c.raia));
          for (const c of clB) expect(clA.has(c)).toBe(true);
          // Subtasks shown never shrink either.
          const subs = (p: typeof pa) => new Map(p.nos.map((n) => [n.id, n.subtarefas.length]));
          const sa = subs(pa);
          const sb = subs(pb);
          for (const [id, q] of sa) expect(sb.get(id)!).toBeGreaterThanOrEqual(q);

          // Expanding one lane.
          const sem = { ...base, raias: new Set([...base.raias].filter((r) => r !== raia)) };
          const com = { ...base, raias: new Set([...base.raias, raia]) };
          const p0 = projetar(g, sem);
          const p1 = projetar(g, com);
          const daRaia = new Set(g.nos.filter((n) => n.raia === raia).map((n) => n.id));
          const acrescimo = [...ids(p1.nos)].filter((n) => !ids(p0.nos).has(n));
          expect(new Set(acrescimo)).toEqual(daRaia);
          const removidos = p0.clusters.map((c) => c.raia).filter((r) => !p1.clusters.some((c) => c.raia === r));
          expect(removidos).toEqual([raia]);
          expect(p1.clusters.length).toBe(p0.clusters.length - 1);
        },
      ),
      { numRuns: NUM_RUNS },
    );
  });

  it('expanding one task adds exactly its subtasks and nothing else', () => {
    fc.assert(
      fc.property(
        casos()
          .map(grafoDoCaso)
          .filter((g) => g.nos.some((n) => n.tipo === 'tarefa' && n.subtarefas.length > 0))
          .chain((g) =>
            fc.tuple(
              fc.constant(g),
              fc.constantFrom(...g.nos.filter((n) => n.tipo === 'tarefa' && n.subtarefas.length > 0).map((n) => n.id)),
            ),
          ),
        ([g, tarefa]) => {
          const todas: ConjuntoExpandido = { raias: new Set(g.raias.map((r) => r.id)), subtarefas: new Set(), todasSubtarefas: false };
          const p0 = projetar(g, todas);
          const p1 = projetar(g, { ...todas, subtarefas: new Set([tarefa]) });
          expect(ids(p1.nos)).toEqual(ids(p0.nos));
          const original = g.nos.find((n) => n.id === tarefa)!;
          for (const n of p1.nos) {
            const antes = p0.nos.find((x) => x.id === n.id)!;
            if (n.id === tarefa) {
              expect(antes.subtarefas).toEqual([]);
              expect(n.subtarefas).toEqual(original.subtarefas);
            } else expect(n.subtarefas).toEqual(antes.subtarefas);
          }
          expect(p1.arestas).toEqual(p0.arestas);
        },
      ),
      { numRuns: NUM_RUNS },
    );
  });

  it('holds on the 12 real demands (exhaustive for the all-collapsed and all-expanded bounds)', () => {
    for (const demanda of demandasComRaias(guiaReal)) {
      const g = gerarGrafo(guiaReal, demanda);
      const vazio = projetar(g, { raias: new Set(), subtarefas: new Set(), todasSubtarefas: false });
      const cheio = projetar(g, { raias: new Set(g.raias.map((r) => r.id)), subtarefas: new Set(), todasSubtarefas: true });
      expect(vazio.nos).toEqual([]);
      expect(vazio.clusters.length).toBe(g.raias.length);
      expect(cheio.clusters).toEqual([]);
      expect(ids(cheio.nos)).toEqual(ids(g.nos));
    }
  });
});

// Feature: experiencia-fluxos-catalogo, Property 11: A projeção conserva arestas, Nós e extremos
describe('Property 11: a projeção conserva arestas, Nós e extremos', () => {
  // Validates: Requirements 20.4, 20.5
  const verificar = (g: ModeloDeGrafo, conj: ConjuntoExpandido) => {
    const p = projetar(g, conj);
    const aresta = (e: { origem: string; destino: string }) => e.origem.startsWith('cluster:') || e.destino.startsWith('cluster:');
    const tocam = p.arestas.filter(aresta).reduce((s, e) => s + e.quantidade, 0);
    const internas = p.clusters.reduce((s, c) => s + c.arestasInternas, 0);
    const entreExpandidos = p.arestas.filter((e) => !aresta(e)).length;
    expect(tocam + internas + entreExpandidos).toBe(g.arestas.length);
    expect(p.clusters.reduce((s, c) => s + c.totais.nos, 0) + p.nos.length).toBe(g.nos.length);

    const clusters = new Set(p.clusters.map((c) => `cluster:${c.raia}`));
    const exibidos = ids(p.nos);
    for (const e of p.arestas) {
      for (const x of [e.origem, e.destino]) expect(exibidos.has(x) || clusters.has(x)).toBe(true);
    }
    // Every edge with an endpoint in a collapsed lane ends at its cluster.
    const raiaDe = new Map(g.nos.map((n) => [n.id, n.raia]));
    const expandida = (id: string) => conj.raias.has(raiaDe.get(id)!);
    const extremos = (id: string) => (expandida(id) ? id : `cluster:${raiaDe.get(id)}`);
    const esperadas = new Set(
      g.arestas.map((a) => [extremos(a.origem), extremos(a.destino)] as const).filter(([o, d]) => o !== d || !o.startsWith('cluster:')).map(([o, d]) => `${o}>${d}`),
    );
    expect(new Set(p.arestas.map((e) => `${e.origem}>${e.destino}`))).toEqual(esperadas);
  };

  it('random guides and demands with random expansion sets', () => {
    fc.assert(
      fc.property(
        casos().chain((c) => {
          const g = grafoDoCaso(c);
          return fc.tuple(fc.constant(g), conjuntos(g));
        }),
        ([g, conj]) => verificar(g, conj),
      ),
      { numRuns: NUM_RUNS },
    );
  });

  it('real demands with random expansion sets', () => {
    fc.assert(
      fc.property(
        casosReais().chain((c) => {
          const g = grafoDoCaso(c);
          return fc.tuple(fc.constant(g), conjuntos(g));
        }),
        ([g, conj]) => verificar(g, conj),
      ),
      { numRuns: NUM_RUNS },
    );
  });
});

// Feature: experiencia-fluxos-catalogo, Property 13: O estado de expansão faz round trip no Fragmento_de_Estado e normaliza
describe('Property 13: o estado de expansão faz round trip e normaliza', () => {
  // Validates: Requirements 20.2, 20.8
  it('lerConjunto(chaveDoConjunto(c)) equals c, and the key ignores insertion order', () => {
    fc.assert(
      fc.property(
        casos().chain((c) => {
          const g = grafoDoCaso(c);
          return fc.tuple(fc.constant(g), conjuntos(g));
        }),
        ([g, conj]) => {
          mesmo(lerConjunto(chaveDoConjunto(conj), g), conj);
          const invertido: ConjuntoExpandido = {
            raias: new Set([...conj.raias].reverse()),
            subtarefas: new Set([...conj.subtarefas].reverse()),
            todasSubtarefas: conj.todasSubtarefas,
          };
          expect(chaveDoConjunto(invertido)).toBe(chaveDoConjunto(conj));
        },
      ),
      { numRuns: NUM_RUNS },
    );
  });

  it('a set with every lane is the completo set; normalizar is idempotent and drops unknown ids', () => {
    fc.assert(
      fc.property(
        casos().chain((c) => {
          const g = grafoDoCaso(c);
          return fc.tuple(fc.constant(g), conjuntos(g), fc.array(fc.string({ minLength: 1 }), { maxLength: 4 }));
        }),
        ([g, conj, lixo]) => {
          const sujo: ConjuntoExpandido = {
            raias: new Set([...conj.raias, ...lixo.map((x) => `raia-inexistente-${x}`)]),
            subtarefas: new Set([...conj.subtarefas, ...lixo.map((x) => `tarefa-inexistente-${x}`)]),
            todasSubtarefas: conj.todasSubtarefas,
          };
          const n = normalizar(sujo, g);
          mesmo(n, conj);
          mesmo(normalizar(n, g), n);

          const completo = normalizar({ raias: new Set(g.raias.map((r) => r.id)), subtarefas: new Set(), todasSubtarefas: false }, g);
          expect(completo.raias.size).toBe(g.raias.length);
          const p = projetar(g, completo);
          expect(p.clusters).toEqual([]);
          expect(ids(p.nos)).toEqual(ids(g.nos));
          // The completo set round trips too.
          mesmo(lerConjunto(chaveDoConjunto(completo), g), completo);
        },
      ),
      { numRuns: NUM_RUNS },
    );
  });
});
