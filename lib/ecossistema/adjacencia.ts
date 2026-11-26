// SPDX-License-Identifier: MIT
// Undirected adjacency over node indexes, built once and shared by the layout, the filters and the focus.

export type ArestaIdx = readonly [source: number, target: number, kind: number];

export interface Adjacencia {
  readonly n: number;
  /** Neighbor indexes of `i`, sorted ascending, without duplicates and without `i`. */
  vizinhos(i: number): ReadonlyArray<number>;
  grau(i: number): number;
  /** Kind indexes of the edges between `a` and `b`, ascending. Empty when they are not connected. */
  kinds(a: number, b: number): ReadonlyArray<number>;
  /** Unique undirected pairs (a < b), ordered by a then b. */
  pares(): ReadonlyArray<readonly [number, number]>;
}

export function construirAdjacencia(n: number, arestas: ReadonlyArray<ArestaIdx>): Adjacencia {
  const sets: Array<Set<number>> = Array.from({ length: n }, () => new Set<number>());
  const kindsDoPar = new Map<number, Set<number>>();
  for (const [s, t, k] of arestas) {
    if (!Number.isInteger(s) || !Number.isInteger(t) || s < 0 || t < 0 || s >= n || t >= n) {
      throw new Error(`aresta fora do intervalo: ${s} -> ${t} (n=${n})`);
    }
    if (s === t) continue;
    sets[s].add(t);
    sets[t].add(s);
    const key = s < t ? s * n + t : t * n + s;
    let ks = kindsDoPar.get(key);
    if (!ks) kindsDoPar.set(key, (ks = new Set()));
    ks.add(k);
  }
  const lista: number[][] = sets.map((s) => [...s].sort((a, b) => a - b));
  let paresCache: Array<readonly [number, number]> | undefined;
  return {
    n,
    vizinhos: (i) => lista[i],
    grau: (i) => lista[i].length,
    kinds(a, b) {
      const ks = kindsDoPar.get(a < b ? a * n + b : b * n + a);
      return ks ? [...ks].sort((x, y) => x - y) : [];
    },
    pares() {
      if (!paresCache) {
        paresCache = [];
        for (let a = 0; a < n; a++) for (const b of lista[a]) if (a < b) paresCache.push([a, b] as const);
      }
      return paresCache;
    },
  };
}

/** Indexes reachable from `origem` within `profundidade` steps, nearest first, excluding the origin. */
export function vizinhanca(adj: Adjacencia, origem: number, profundidade: 1 | 2, permitido?: (i: number) => boolean): number[] {
  const visto = new Set<number>([origem]);
  const saida: number[] = [];
  let fronteira = [origem];
  for (let nivel = 0; nivel < profundidade; nivel++) {
    const proxima: number[] = [];
    for (const a of fronteira) {
      for (const b of adj.vizinhos(a)) {
        if (visto.has(b)) continue;
        if (permitido && !permitido(b)) continue;
        visto.add(b);
        saida.push(b);
        proxima.push(b);
      }
    }
    fronteira = proxima;
  }
  return saida;
}
