// SPDX-License-Identifier: MIT
// Loads the Modelo_de_Grafo of a flow once per page load (Requirements 15.10, 2.7). State changes never call this again.
import type { ModeloDeGrafo } from '../../../lib/schema/grafo';
import type { DadoApi, ExternoApi, NoApi, PapelApi, PerguntaApi, RitoApi } from '../render/api';

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

// Content of the Modal_de_Playbook. It comes from `api/flows/<id>.json`, the endpoint that already carries the playbooks and the nodes
// of the guide, so no playbook text is copied into the Modelo_de_Grafo. It is fetched on the first opening of the modal and kept for
// the life of the page (the island never fetches it while the modal stays closed).

/** Node of the guide as the page publishes it (only the fields the modal reads). */
export interface DecisaoJson {
  id: string;
  tipo: string;
  rotulo: string;
  raia: string;
  condicao?: string;
  papel?: string;
  playbook?: string;
  proximo?: Array<{ para: string; condicao?: string }>;
}
export interface PlaybookJson {
  id: string;
  resumo?: string;
  fazer?: string[];
  evitar?: string[];
  perguntas_chave?: string[];
}
export interface FluxoJson {
  id: string;
  locale: string;
  /** True when the locale has no translation of the guide and the pt-BR text is shown. */
  fallback?: boolean;
  decisoes: DecisaoJson[];
  playbooks: PlaybookJson[];
  papeis: PapelApi[];
  nos: NoApi[];
  dados: Record<string, DadoApi>;
  perguntas: Record<string, PerguntaApi>;
  /** Ritos that happen in a Nó of this Demanda or produce/consume one of its artefacts or variables (absent in older payloads). */
  ritos?: Record<string, RitoApi>;
  /** Producers and consumers that are not part of this Demanda (Nós of another Demanda): name and page, so they are never drawn. */
  externos?: Record<string, ExternoApi>;
}

const cacheFluxo = new Map<string, Promise<FluxoJson>>();

export const urlDoFluxo = (id: string, base = ''): string => `${base.replace(/\/+$/, '')}/api/flows/${encodeURIComponent(id)}.json`;

const pareceFluxo = (v: unknown): v is FluxoJson => {
  const f = v as Partial<FluxoJson> | null;
  return !!f && typeof f === 'object' && Array.isArray(f.decisoes) && Array.isArray(f.playbooks) && Array.isArray(f.nos);
};

/** One `fetch` per URL for the life of the page. A failed load is forgotten so the retry button can try again. */
export function carregarFluxo(id: string, base = '', buscar: Buscador = (u) => fetch(u)): Promise<FluxoJson> {
  const url = urlDoFluxo(id, base);
  const existente = cacheFluxo.get(url);
  if (existente) return existente;
  const promessa = (async () => {
    const r = await buscar(url);
    if (!r.ok) throw new Error(`Falha ao carregar ${url}: HTTP ${r.status}`);
    const dados: unknown = await r.json();
    if (!pareceFluxo(dados)) throw new Error(`Conteudo do fluxo invalido em ${url}`);
    return dados;
  })();
  cacheFluxo.set(url, promessa);
  promessa.catch(() => cacheFluxo.delete(url));
  return promessa;
}

/** Test hook: forgets the cached flows. */
export function esquecerFluxos(): void {
  cacheFluxo.clear();
}

// Facts of a Pagina_Canonica (description and fact table), read on demand when the modal shows an artefact or a variable.
// Source decision: the description and the example live once, in the entity page (one concept, one note, Requirement 13.2), and the
// flow API stays references only (a test guards it). The page is a small static HTML (about 4 KB), fetched only when the user opens
// that item, cached for the life of the page, and it also works offline with the rest of the site.

/** What the modal reads from a Pagina_Canonica: the lede and the `dl.facts` pairs keyed by the (localized) label. */
export interface FatosDaPagina {
  descricao?: string;
  fatos: Record<string, string>;
}

const cacheFatos = new Map<string, Promise<FatosDaPagina>>();

/** Parses the HTML of an entity page. Pure: no network. */
export function lerFatosDaPagina(html: string, Analisador: typeof DOMParser = DOMParser): FatosDaPagina {
  const pagina = new Analisador().parseFromString(html, 'text/html');
  const saida: FatosDaPagina = { fatos: {} };
  const lede = pagina.querySelector('.entity-head .lede')?.textContent?.trim();
  if (lede) saida.descricao = lede;
  for (const dt of pagina.querySelectorAll('dl.facts > dt')) {
    const dd = dt.nextElementSibling;
    const texto = dd?.tagName === 'DD' ? dd.textContent?.trim() : undefined;
    const rotulo = dt.textContent?.trim();
    if (rotulo && texto) saida.fatos[rotulo] = texto;
  }
  return saida;
}

export type BuscadorDeTexto = (url: string) => Promise<Pick<Response, 'ok' | 'status' | 'text'>>;

/** One `fetch` per page URL for the life of the page. A failure is forgotten so opening the item again retries. */
export function carregarFatos(url: string, buscar: BuscadorDeTexto = (u) => fetch(u, { credentials: 'same-origin' })): Promise<FatosDaPagina> {
  const existente = cacheFatos.get(url);
  if (existente) return existente;
  const promessa = (async () => {
    const r = await buscar(url);
    if (!r.ok) throw new Error(`Falha ao carregar ${url}: HTTP ${r.status}`);
    return lerFatosDaPagina(await r.text());
  })();
  cacheFatos.set(url, promessa);
  promessa.catch(() => cacheFatos.delete(url));
  return promessa;
}

/** Test hook: forgets the cached pages. */
export function esquecerFatos(): void {
  cacheFatos.clear();
}
