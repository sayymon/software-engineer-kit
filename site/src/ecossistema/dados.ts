// SPDX-License-Identifier: MIT
// Loads the static payloads of the Ecossistema and builds the in-memory model (typed arrays, adjacency, filter data).
import { construirAdjacencia, type Adjacencia } from '@lib/ecossistema/adjacencia';
import { GRUPOS, camadaDe, grupoDe, type Camada, type Grupo } from '@lib/ecossistema/camadas';
import { ESCALA, areaDoTipo } from '@lib/ecossistema/constantes';
import type { DadosFiltro } from '@lib/ecossistema/filtro';
import { normalizar } from '@lib/ecossistema/filtro';
import type { Fato } from '@lib/ecossistema/fatos';
import type { PayloadEcossistema, ShardDetalhe } from '@lib/ecossistema/payload';

export interface Modelo {
  base: string;
  locale: 'pt-BR' | 'en';
  n: number;
  ids: string[];
  nomes: string[];
  porId: Map<string, number>;
  tipos: string[];
  tipoDoNo: Uint16Array;
  grupoDoNo: Uint8Array;
  camadaDoNo: Camada[];
  hubDoNo: boolean[];
  x: Float32Array;
  y: Float32Array;
  z: Float32Array;
  grau: Uint16Array;
  adj: Adjacencia;
  /** Unique undirected pairs, flat [a0, b0, a1, b1, ...]. */
  pares: Uint32Array;
  /** 1 when the pair has at least one strong kind (not a plain wikilink in the body text). */
  forte: Uint8Array;
  kinds: string[];
  filtro: DadosFiltro;
}

export interface ItemIndice {
  id: string;
  tipo: string;
  nome: string;
  descricao: string;
  url: string;
  fallback: boolean;
}

export const urlApi = (base: string, locale: string, caminho: string) => `${base}/${locale}/api/${caminho}`;

async function pegarJson<T>(url: string, sinal?: AbortSignal): Promise<T> {
  const r = await fetch(url, { signal: sinal });
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return (await r.json()) as T;
}

export async function carregarModelo(base: string, locale: 'pt-BR' | 'en', sinal?: AbortSignal): Promise<Modelo> {
  const p = await pegarJson<PayloadEcossistema>(urlApi(base, locale, 'ecossistema/index.json'), sinal);
  return construirModelo(p, base, locale);
}

export function construirModelo(p: PayloadEcossistema, base: string, locale: 'pt-BR' | 'en'): Modelo {
  const n = p.nos.length;
  const ids = new Array<string>(n);
  const nomes = new Array<string>(n);
  const tipoDoNo = new Uint16Array(n);
  const grupoDoNo = new Uint8Array(n);
  const camadaDoNo = new Array<Camada>(n);
  const hubDoNo = new Array<boolean>(n);
  const x = new Float32Array(n);
  const y = new Float32Array(n);
  const z = new Float32Array(n);
  const grau = new Uint16Array(n);
  const porId = new Map<string, number>();
  const grupoIdx = new Map<Grupo, number>(GRUPOS.map((g, i) => [g, i]));
  p.nos.forEach((no, i) => {
    ids[i] = no[0];
    nomes[i] = no[2];
    tipoDoNo[i] = no[1];
    const tipo = p.tipos[no[1]];
    grupoDoNo[i] = grupoIdx.get(grupoDe(tipo))!;
    camadaDoNo[i] = camadaDe(tipo);
    hubDoNo[i] = tipo === 'hub';
    x[i] = no[3] / ESCALA;
    y[i] = no[4] / ESCALA;
    z[i] = no[5] / ESCALA;
    grau[i] = no[6];
    porId.set(no[0], i);
  });
  const adj = construirAdjacencia(n, p.arestas);
  const fracos = new Set(p.fracos);
  const pares = new Uint32Array(adj.pares().length * 2);
  const forte = new Uint8Array(adj.pares().length);
  adj.pares().forEach(([a, b], k) => {
    pares[k * 2] = a;
    pares[k * 2 + 1] = b;
    forte[k] = adj.kinds(a, b).some((kd) => !fracos.has(kd)) ? 1 : 0;
  });
  const tipoNome = (i: number) => p.tipos[tipoDoNo[i]];
  const filtro: DadosFiltro = {
    n,
    texto: nomes.map(normalizar),
    camada: camadaDoNo,
    hub: hubDoNo,
    facetas: {
      tipo: Array.from({ length: n }, (_, i) => [tipoNome(i)]),
      grupo: Array.from({ length: n }, (_, i) => [GRUPOS[grupoDoNo[i]]]),
      area: Array.from({ length: n }, (_, i) => [areaDoTipo(tipoNome(i))]),
    },
  };
  return { base, locale, n, ids, nomes, porId, tipos: p.tipos, tipoDoNo, grupoDoNo, camadaDoNo, hubDoNo, x, y, z, grau, adj, pares, forte, kinds: p.kinds, filtro };
}

/** Description, URL and fallback flag per id. Shared with the catalog list (same file, same cache). */
export async function carregarIndice(base: string, locale: string): Promise<Map<string, ItemIndice>> {
  const r = await pegarJson<{ items: ItemIndice[] }>(urlApi(base, locale, 'index.json'));
  return new Map(r.items.map((i) => [i.id, i]));
}

export async function carregarShard(base: string, locale: string, demanda: string): Promise<ShardDetalhe> {
  return pegarJson<ShardDetalhe>(urlApi(base, locale, `ecossistema/detalhe/${encodeURIComponent(demanda)}.json`));
}

export async function carregarFatos(base: string, locale: string, tipo: string): Promise<Record<string, Fato[]> | null> {
  try {
    const r = await pegarJson<{ itens: Record<string, Fato[]> }>(urlApi(base, locale, `ecossistema/fatos/${encodeURIComponent(tipo)}.json`));
    return r.itens;
  } catch {
    return null;
  }
}
