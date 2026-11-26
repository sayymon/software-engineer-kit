// SPDX-License-Identifier: MIT
// Textual alternative of a flow, derived from the Modelo_de_Grafo (Requirement 2.10, 19.7).
// Pure: no fs or node:* imports, and no localized strings (the renderer owns the wording).
import type { ModeloDeGrafo } from '../schema/grafo';

export type TransicaoTexto = {
  /** Id of the destination node. */
  destino: string;
  destinoRotulo: string;
  /** Lane name of the destination. */
  destinoRaia: string;
  /** Condition or return text; empty when the edge is unconditional. */
  rotulo: string;
  /** Call and return edges between lanes. */
  tracejada: boolean;
};

export type NoTexto = {
  id: string;
  tipo: string;
  rotulo: string;
  transicoes: TransicaoTexto[];
};

export type RaiaTexto = {
  id: string;
  nome: string;
  nos: NoTexto[];
};

/** Lanes in graph order, each with its nodes in `ordem` and their outgoing transitions in edge order. */
export function textoAcessivel(grafo: ModeloDeGrafo): RaiaTexto[] {
  const nos = new Map(grafo.nos.map((n) => [n.id, n]));
  const raias = new Map(grafo.raias.map((r) => [r.id, r]));
  const saidas = new Map<string, TransicaoTexto[]>();
  for (const a of grafo.arestas) {
    const destino = nos.get(a.destino);
    if (!destino) continue;
    const lista = saidas.get(a.origem) ?? [];
    lista.push({
      destino: a.destino,
      destinoRotulo: destino.rotulo,
      destinoRaia: raias.get(destino.raia)?.nome ?? destino.raia,
      rotulo: a.rotulo,
      tracejada: a.tracejada,
    });
    saidas.set(a.origem, lista);
  }
  return [...grafo.raias]
    .sort((a, b) => a.ordem - b.ordem)
    .map((r) => ({
      id: r.id,
      nome: r.nome,
      nos: grafo.nos
        .filter((n) => n.raia === r.id)
        .sort((a, b) => a.ordem - b.ordem)
        .map((n) => ({ id: n.id, tipo: n.tipo, rotulo: n.rotulo, transicoes: saidas.get(n.id) ?? [] })),
    }));
}
