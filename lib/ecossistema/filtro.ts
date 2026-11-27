// SPDX-License-Identifier: MIT
// Filters of the Ecossistema: layers, hubs, text and facets. Pure functions over typed arrays, so they run in the browser
// and in Vitest. Different facets combine with AND, values of the same facet combine with OR.
import type { Camada } from './camadas';

export interface DadosFiltro {
  n: number;
  /** Lowercase, accent-free searchable text per node (name). */
  texto: ReadonlyArray<string>;
  camada: ReadonlyArray<Camada>;
  hub: ReadonlyArray<boolean>;
  /** Facet name to the values of each node (empty array when the node has no value for the facet). */
  facetas: Readonly<Record<string, ReadonlyArray<ReadonlyArray<string>>>>;
}

export interface CriterioFiltro {
  camadas: ReadonlySet<Camada>;
  hubs: boolean;
  texto: string;
  facetas: Readonly<Record<string, ReadonlySet<string>>>;
}

export const CRITERIO_PADRAO: CriterioFiltro = { camadas: new Set<Camada>(['nucleo', 'fluxo']), hubs: false, texto: '', facetas: {} };

export function normalizar(s: string): string {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

/** Nodes that pass every filter. A node without a value for a filtered facet is excluded; an unfiltered facet keeps it. */
export function filtrarNos(dados: DadosFiltro, c: CriterioFiltro): Uint8Array {
  const visivel = new Uint8Array(dados.n);
  const termo = normalizar(c.texto);
  const facetasAtivas = Object.entries(c.facetas).filter(([, v]) => v.size > 0);
  for (let i = 0; i < dados.n; i++) {
    if (!c.camadas.has(dados.camada[i])) continue;
    if (dados.hub[i] && !c.hubs) continue;
    if (termo && !dados.texto[i].includes(termo)) continue;
    let ok = true;
    for (const [nome, aceitos] of facetasAtivas) {
      const valores = dados.facetas[nome]?.[i] ?? [];
      if (!valores.some((v) => aceitos.has(v))) {
        ok = false;
        break;
      }
    }
    if (ok) visivel[i] = 1;
  }
  return visivel;
}

/** Edges whose two ends are visible. An edge never dangles when a layer is off. */
export function arestasVisiveis(arestas: ReadonlyArray<readonly [number, number, number]>, visivel: Uint8Array): number[] {
  const saida: number[] = [];
  for (let j = 0; j < arestas.length; j++) if (visivel[arestas[j][0]] && visivel[arestas[j][1]]) saida.push(j);
  return saida;
}

/** How many nodes each value of `facet` would return with the other filters active (counts next to each value). */
export function contarFaceta(dados: DadosFiltro, c: CriterioFiltro, faceta: string): Map<string, number> {
  const sem: CriterioFiltro = { ...c, facetas: Object.fromEntries(Object.entries(c.facetas).filter(([k]) => k !== faceta)) };
  const visivel = filtrarNos(dados, sem);
  const contagem = new Map<string, number>();
  const valores = dados.facetas[faceta];
  if (!valores) return contagem;
  for (let i = 0; i < dados.n; i++) {
    if (!visivel[i]) continue;
    for (const v of new Set(valores[i])) contagem.set(v, (contagem.get(v) ?? 0) + 1);
  }
  return contagem;
}
