// SPDX-License-Identifier: MIT
// Context of one demand: lanes, nodes, flow order and roles, with the guide document's validations.
// Extracted from lib/flow-mermaid/index.ts without changing behavior.
import {
  chaveNatural,
  cmpKey,
  demandasBiblioteca,
  ordemFluxo,
  ordemRaias,
  ordenarNatural,
  raiasDoContexto,
} from '../flow-mermaid/order';
import type { Item } from '../flow-mermaid/types';

/** Letter of the node id by node type. */
export const LETRA_TIPO: Record<string, string> = { inicio: 's', tarefa: 't', bifurcacao: 'g', chamada: 'c', fim: 'e' };

export class GeracaoError extends Error {}

export const isMap = (v: unknown): v is Item => v !== null && typeof v === 'object' && !Array.isArray(v);
export const lista = (doc: Item, colecao: string): Item[] => (doc[colecao] ?? []).filter((x: unknown) => isMap(x) && 'id' in x);
const porId = (itens: Item[]): Map<string, Item> => new Map(itens.map((x) => [String(x.id), x]));

export const pyRepr = (v: unknown): string => (typeof v === 'string' ? `'${v}'` : v == null ? 'None' : String(v));

export type Contexto = {
  demanda: Item;
  raias: Map<string, Item>;
  nos: Map<string, Item>;
  todasRaias: Map<string, Item>;
  demandas: Map<string, Item>;
  ordemRaias: string[];
  ordemNos: string[];
  papeis: Map<string, string>;
};

export function contexto(doc: Item, demandaId: string): Contexto {
  const demandas = porId(lista(doc, 'demandas'));
  if (!demandas.has(demandaId)) throw new GeracaoError(`demanda desconhecida: ${demandaId}`);
  const todas = porId(lista(doc, 'raias'));
  if (todas.size === 0) {
    throw new GeracaoError('o documento não tem a coleção `raias`: remodele os fluxos para o padrão de raias antes de gerar');
  }
  if (demandasBiblioteca(doc).has(demandaId)) {
    throw new GeracaoError(`a demanda ${demandaId} é uma biblioteca de raias: entra no diagrama de quem a chama`);
  }
  const noContexto = raiasDoContexto(doc, demandaId);
  const raias = new Map([...todas].filter(([i]) => noContexto.has(i)));
  if (raias.size === 0) throw new GeracaoError(`a demanda ${demandaId} não tem raias`);
  const nos = new Map(lista(doc, 'decisoes').filter((d) => noContexto.has(String(d.raia))).map((d) => [String(d.id), d]));
  const chaves = [...nos.keys()].sort((a, b) => cmpKey(chaveNatural(a), chaveNatural(b)));
  for (const i of chaves) {
    const n = nos.get(i) as Item;
    if (!todas.has(n.raia)) throw new GeracaoError(`o nó ${i} referencia a raia inexistente: ${pyRepr(n.raia)}`);
    if (!(n.tipo in LETRA_TIPO)) throw new GeracaoError(`o nó ${i} tem tipo inválido: ${pyRepr(n.tipo)}`);
    if (n.tipo === 'chamada' && !todas.has(n.raia_chamada)) {
      throw new GeracaoError(`a chamada ${i} referencia a raia inexistente: ${pyRepr(n.raia_chamada)}`);
    }
  }
  const ordemR = ordemRaias(raias, nos);
  const ordemN: string[] = [];
  for (const rid of ordemR) {
    ordemN.push(...ordemFluxo(nos, [...nos].filter(([, n]) => n.raia === rid).map(([i]) => i)));
  }
  const dentro = new Set(ordemN);
  ordemN.push(...ordenarNatural([...nos.keys()].filter((i) => !dentro.has(i))));
  const papeis = new Map(lista(doc, 'papeis').map((p) => [String(p.id), String(p.nome || p.id)]));
  return {
    demanda: demandas.get(demandaId) as Item,
    raias,
    nos,
    todasRaias: todas,
    demandas,
    ordemRaias: ordemR,
    ordemNos: ordemN,
    papeis,
  };
}
