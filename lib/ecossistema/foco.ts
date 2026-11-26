// SPDX-License-Identifier: MIT
// Focus on a node: which neighbors are shown, how they are grouped when there are many, and where they sit around the node.
import { vizinhanca, type Adjacencia } from './adjacencia';

export const LIMITE_AGRUPAR = 150;
export const TETO_PROFUNDIDADE_2 = 400;

export interface GrupoFoco {
  tipo: string;
  /** Neighbor indexes of this type. */
  membros: ReadonlyArray<number>;
  expandido: boolean;
}

export interface EstadoDeFoco {
  no: number;
  profundidade: 1 | 2;
  /** Neighbors shown individually (all of them when there are 150 or fewer). */
  vizinhos: ReadonlyArray<number>;
  /** Present when there are more than LIMITE_AGRUPAR direct neighbors: one group per tipo. */
  grupos: ReadonlyArray<GrupoFoco>;
  /** Neighbors left out by the depth-2 ceiling. */
  omitidos: number;
  /** Direct neighbor count before grouping or ceilings. */
  totalDiretos: number;
}

export interface OpcoesFoco {
  tipoDe: (i: number) => string;
  hub: (i: number) => boolean;
  visivel: (i: number) => boolean;
  expandidos?: ReadonlySet<string>;
  limiteAgrupar?: number;
  teto?: number;
}

export function calcularFoco(adj: Adjacencia, no: number, profundidade: 1 | 2, o: OpcoesFoco): EstadoDeFoco {
  const limite = o.limiteAgrupar ?? LIMITE_AGRUPAR;
  const teto = o.teto ?? TETO_PROFUNDIDADE_2;
  const diretos = vizinhanca(adj, no, 1, o.visivel);
  const expandidos = o.expandidos ?? new Set<string>();
  let vizinhos: number[] = diretos;
  let grupos: GrupoFoco[] = [];
  if (diretos.length > limite) {
    const porTipo = new Map<string, number[]>();
    for (const i of diretos) (porTipo.get(o.tipoDe(i)) ?? porTipo.set(o.tipoDe(i), []).get(o.tipoDe(i))!).push(i);
    grupos = [...porTipo.entries()]
      .sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]))
      .map(([tipo, membros]) => ({ tipo, membros, expandido: expandidos.has(tipo) }));
    vizinhos = grupos.filter((g) => g.expandido).flatMap((g) => [...g.membros]);
  }
  let omitidos = 0;
  if (profundidade === 2) {
    const escolhidos = new Set<number>([no, ...vizinhos]);
    const diretosSet = new Set(diretos);
    // Second ring: neighbors of neighbors, never hubs, ranked by how many chosen nodes they touch.
    const pontos = new Map<number, number>();
    const base = grupos.length ? vizinhos : diretos;
    for (const a of base) {
      for (const b of adj.vizinhos(a)) {
        if (escolhidos.has(b) || diretosSet.has(b) || o.hub(b) || !o.visivel(b)) continue;
        pontos.set(b, (pontos.get(b) ?? 0) + 1);
      }
    }
    const ranque = [...pontos.entries()].sort((x, y) => y[1] - x[1] || x[0] - y[0]).map(([i]) => i);
    const sobra = Math.max(0, teto - vizinhos.length);
    vizinhos = vizinhos.concat(ranque.slice(0, sobra));
    omitidos = Math.max(0, ranque.length - sobra);
    if (vizinhos.length > teto) {
      omitidos += vizinhos.length - teto;
      vizinhos = vizinhos.slice(0, teto);
    }
  }
  return { no, profundidade, vizinhos, grupos, omitidos, totalDiretos: diretos.length };
}

/** Points on a sphere (Fibonacci lattice) of radius `raio` around `centro`. Deterministic. */
export function arranjoEmCasca(centro: readonly [number, number, number], quantidade: number, raio: number): Array<[number, number, number]> {
  const saida: Array<[number, number, number]> = [];
  for (let k = 0; k < quantidade; k++) {
    const t = (k + 0.5) / quantidade;
    const phi = Math.acos(1 - 2 * t);
    const theta = Math.PI * (1 + Math.sqrt(5)) * k;
    saida.push([centro[0] + raio * Math.sin(phi) * Math.cos(theta), centro[1] + raio * Math.sin(phi) * Math.sin(theta), centro[2] + raio * Math.cos(phi)]);
  }
  return saida;
}

/** Shell radius that keeps neighbors apart: grows with the cube root of the count. */
export function raioDaCasca(quantidade: number, base = 60, passo = 14): number {
  return base + passo * Math.cbrt(Math.max(quantidade, 1)) * 2;
}
