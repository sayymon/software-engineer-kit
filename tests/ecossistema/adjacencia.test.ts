// SPDX-License-Identifier: MIT
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { construirAdjacencia, vizinhanca } from '../../lib/ecossistema/adjacencia';

const grafo = fc.integer({ min: 2, max: 40 }).chain((n) =>
  fc.record({
    n: fc.constant(n),
    arestas: fc.array(fc.tuple(fc.nat(n - 1), fc.nat(n - 1), fc.nat(3)), { maxLength: 120 }),
  }),
);

describe('adjacência', () => {
  it('é simétrica e sem laços', () => {
    fc.assert(
      fc.property(grafo, ({ n, arestas }) => {
        const adj = construirAdjacencia(n, arestas);
        for (let a = 0; a < n; a++) {
          expect(adj.vizinhos(a)).not.toContain(a);
          for (const b of adj.vizinhos(a)) expect(adj.vizinhos(b)).toContain(a);
        }
      }),
    );
  });
  it('não depende da ordem das arestas', () => {
    fc.assert(
      fc.property(grafo, ({ n, arestas }) => {
        const a1 = construirAdjacencia(n, arestas);
        const a2 = construirAdjacencia(n, [...arestas].reverse());
        for (let i = 0; i < n; i++) expect([...a1.vizinhos(i)]).toEqual([...a2.vizinhos(i)]);
      }),
    );
  });
  it('rejeita aresta fora do intervalo', () => {
    expect(() => construirAdjacencia(3, [[0, 3, 0]])).toThrow(/fora do intervalo/);
    expect(() => construirAdjacencia(3, [[-1, 1, 0]])).toThrow(/fora do intervalo/);
  });
  it('guarda os kinds de cada par e lista pares únicos', () => {
    const adj = construirAdjacencia(3, [[0, 1, 2], [1, 0, 5], [1, 2, 0]]);
    expect(adj.kinds(0, 1)).toEqual([2, 5]);
    expect(adj.kinds(1, 0)).toEqual([2, 5]);
    expect(adj.kinds(0, 2)).toEqual([]);
    expect(adj.pares()).toEqual([[0, 1], [1, 2]]);
  });
  it('vizinhança de profundidade 2 contém a de profundidade 1 e respeita o filtro', () => {
    const adj = construirAdjacencia(5, [[0, 1, 0], [1, 2, 0], [2, 3, 0], [3, 4, 0]]);
    expect(vizinhanca(adj, 0, 1)).toEqual([1]);
    expect(vizinhanca(adj, 0, 2)).toEqual([1, 2]);
    expect(vizinhanca(adj, 0, 2, (i) => i !== 1)).toEqual([]);
  });
});
