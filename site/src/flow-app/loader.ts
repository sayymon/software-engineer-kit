// SPDX-License-Identifier: MIT
// Loads the Modelo_de_Grafo of a flow once per page load (Requirements 15.10, 2.7). State changes never call this again.
import type { ModeloDeGrafo } from '../../../lib/schema/grafo';

export type Buscador = (url: string) => Promise<Pick<Response, 'ok' | 'status' | 'json'>>;

const cache = new Map<string, Promise<ModeloDeGrafo>>();

export const urlDoGrafo = (id: string, base = ''): string => `${base.replace(/\/+$/, '')}/api/flows/${encodeURIComponent(id)}.graph.json`;

const pareceGrafo = (v: unknown): v is ModeloDeGrafo => {
  const g = v as Partial<ModeloDeGrafo> | null;
  return !!g && typeof g === 'object' && Array.isArray(g.raias) && Array.isArray(g.nos) && Array.isArray(g.arestas);
};

/** One `fetch` per URL for the life of the page. A failed load is forgotten so a later call can retry. */
export function carregarGrafo(id: string, base = '', buscar: Buscador = (u) => fetch(u)): Promise<ModeloDeGrafo> {
  const url = urlDoGrafo(id, base);
  const existente = cache.get(url);
  if (existente) return existente;
  const promessa = (async () => {
    const r = await buscar(url);
    if (!r.ok) throw new Error(`Falha ao carregar ${url}: HTTP ${r.status}`);
    const dados: unknown = await r.json();
    if (!pareceGrafo(dados)) throw new Error(`Modelo_de_Grafo inválido em ${url}`);
    return dados;
  })();
  cache.set(url, promessa);
  promessa.catch(() => cache.delete(url));
  return promessa;
}

/** Test hook: forgets the cached graphs. */
export function esquecerGrafos(): void {
  cache.clear();
}
