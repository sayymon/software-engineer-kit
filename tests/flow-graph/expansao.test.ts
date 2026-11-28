// SPDX-License-Identifier: MIT
import { describe, expect, it } from 'vitest';
import { chaveDoConjunto, lerConjunto, normalizar, projetar } from '../../lib/flow-graph/expansao';
import type { ConjuntoExpandido } from '../../lib/flow-graph/expansao';
import type { ModeloDeGrafo } from '../../lib/schema/grafo';

const no = (id: string, tipo: string, raia: string, subs: string[] = []) => ({
  id,
  tipo,
  rotulo: id,
  raia,
  ordem: 0,
  subtarefas: subs.map((s, ordem) => ({ id: s, rotulo: s, ordem, condicional: false })),
  temPlaybook: false,
});
const ar = (origem: string, destino: string, rotulo = '', tracejada = false) => ({ origem, destino, rotulo, tracejada });

const grafo = {
  versaoContrato: 1,
  demanda: 'd',
  nomeDemanda: 'D',
  raias: [
    { id: 'a', nome: 'A', cor: '#111111', ordem: 0, orquestradora: true },
    { id: 'b', nome: 'B', cor: '#222222', ordem: 1, orquestradora: false },
    { id: 'c', nome: 'C', cor: '#333333', ordem: 2, orquestradora: false },
  ],
  nos: [
    no('a1', 'inicio', 'a'),
    no('a2', 'tarefa', 'a', ['s1', 's2']),
    no('a3', 'bifurcacao', 'a'),
    no('b1', 'tarefa', 'b', ['s3']),
    no('b2', 'chamada', 'b'),
    no('c1', 'tarefa', 'c'),
    no('c2', 'fim', 'c'),
  ],
  arestas: [
    ar('a1', 'a2'),
    ar('a2', 'a3'),
    ar('a3', 'b1', 'sim'),
    ar('a3', 'b2', 'não'),
    ar('b1', 'b2'),
    ar('b2', 'c1', 'chama', true),
    ar('c1', 'c2'),
    ar('c2', 'a1', 'volta', true),
  ],
} as unknown as ModeloDeGrafo;

const conj = (raias: string[] = [], subtarefas: string[] = [], todasSubtarefas = false): ConjuntoExpandido => ({
  raias: new Set(raias),
  subtarefas: new Set(subtarefas),
  todasSubtarefas,
});

describe('projetar', () => {
  it('collapses every lane into a cluster with totals and aggregated edges (geral)', () => {
    const v = projetar(grafo, conj());
    expect(v.nos).toEqual([]);
    expect(v.clusters.map((c) => c.raia)).toEqual(['a', 'b', 'c']);
    expect(v.clusters[0]).toMatchObject({
      totais: { nos: 3, tarefas: 1, gateways: 1, chamadas: 0, subtarefas: 2 },
      arestasInternas: 2,
      entradas: 1,
      saidas: 1,
    });
    expect(v.clusters[1].totais).toMatchObject({ nos: 2, tarefas: 1, chamadas: 1, subtarefas: 1 });
    const ab = v.arestas.find((e) => e.origem === 'cluster:a' && e.destino === 'cluster:b');
    expect(ab).toMatchObject({ quantidade: 2, rotulo: '×2', tracejada: false });
  });

  it('keeps the original label when an aggregated edge represents a single edge', () => {
    const v = projetar(grafo, conj());
    const bc = v.arestas.find((e) => e.origem === 'cluster:b' && e.destino === 'cluster:c');
    expect(bc).toMatchObject({ quantidade: 1, rotulo: 'chama', tracejada: true });
  });

  it('shows nodes of expanded lanes and keeps edges between them one by one', () => {
    const v = projetar(grafo, conj(['a']));
    expect(v.nos.map((n) => n.id)).toEqual(['a1', 'a2', 'a3']);
    expect(v.clusters.map((c) => c.raia)).toEqual(['b', 'c']);
    expect(v.arestas.filter((e) => e.origem === 'a1' || e.origem === 'a2')).toHaveLength(2);
    expect(v.arestas.find((e) => e.origem === 'a3' && e.destino === 'cluster:b')).toMatchObject({ quantidade: 2, rotulo: '×2' });
    expect(v.arestas.find((e) => e.origem === 'cluster:c' && e.destino === 'a1')).toMatchObject({ quantidade: 1, rotulo: 'volta' });
  });

  it('includes subtasks only for selected tasks or all, and only in expanded lanes', () => {
    const subs = (c: ConjuntoExpandido) => projetar(grafo, c).nos.flatMap((n) => n.subtarefas.map((s) => s.id));
    expect(subs(conj(['a']))).toEqual([]);
    expect(subs(conj(['a', 'b'], ['a2']))).toEqual(['s1', 's2']);
    expect(subs(conj(['a'], ['b1']))).toEqual([]);
    expect(subs(conj(['a', 'b'], [], true))).toEqual(['s1', 's2', 's3']);
  });

  it('shows the full graph with no clusters when every lane is expanded', () => {
    const v = projetar(grafo, conj(['a', 'b', 'c']));
    expect(v.clusters).toEqual([]);
    expect(v.nos).toHaveLength(7);
    expect(v.arestas).toHaveLength(8);
    expect(v.arestas.every((e) => e.quantidade === 1)).toBe(true);
  });

  it('conserves edges and nodes', () => {
    const v = projetar(grafo, conj(['b']));
    const total =
      v.arestas.reduce((s, e) => s + e.quantidade, 0) + v.clusters.reduce((s, c) => s + c.arestasInternas, 0);
    expect(total).toBe(grafo.arestas.length);
    expect(v.nos.length + v.clusters.reduce((s, c) => s + c.totais.nos, 0)).toBe(grafo.nos.length);
  });
});

describe('chaveDoConjunto / lerConjunto / normalizar', () => {
  it('is canonical regardless of insertion order', () => {
    expect(chaveDoConjunto(conj(['c', 'a']))).toBe(chaveDoConjunto(conj(['a', 'c'])));
    expect(chaveDoConjunto(conj())).toBe('');
  });

  it('round-trips a set', () => {
    const c = conj(['a', 'b'], ['a2'], true);
    const lido = lerConjunto(chaveDoConjunto(c), grafo);
    expect([...lido.raias].sort()).toEqual(['a', 'b']);
    expect([...lido.subtarefas]).toEqual(['a2']);
    expect(lido.todasSubtarefas).toBe(true);
  });

  it('ignores unknown lanes and unknown tasks', () => {
    const lido = lerConjunto('r=a,zzz;s=nope,a2', grafo);
    expect([...lido.raias]).toEqual(['a']);
    expect([...lido.subtarefas]).toEqual(['a2']);
  });

  it('reads an empty or garbled key as the empty set', () => {
    expect(lerConjunto('', grafo).raias.size).toBe(0);
    expect(lerConjunto(';;=x', grafo).raias.size).toBe(0);
  });

  it('normalizes a set with every lane to completo and is idempotent', () => {
    const n = normalizar(conj(['c', 'b', 'a', 'x']), grafo);
    expect([...n.raias].sort()).toEqual(['a', 'b', 'c']);
    expect(chaveDoConjunto(normalizar(n, grafo))).toBe(chaveDoConjunto(n));
    expect(lerConjunto(chaveDoConjunto(n), grafo).raias.size).toBe(3);
  });

  it('round-trips ids with reserved characters', () => {
    const g = { ...grafo, raias: [{ ...grafo.raias[0], id: 'a,b;c=d' }, grafo.raias[1]] } as ModeloDeGrafo;
    const lido = lerConjunto(chaveDoConjunto(conj(['a,b;c=d'])), g);
    expect([...lido.raias]).toEqual(['a,b;c=d']);
  });
});
