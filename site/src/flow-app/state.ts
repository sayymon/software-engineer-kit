// SPDX-License-Identifier: MIT
// Fragmento_de_Estado of the flow page (Requirements 15.10, 20.8, 2.7). Pure parse/serialize plus a thin
// history writer. Changing state never reloads the page and never fetches the graph again.
import { chaveDoConjunto, lerConjunto, normalizar, type ConjuntoExpandido } from '../../../lib/flow-graph/expansao';
import type { ModeloDeGrafo } from '../../../lib/schema/grafo';

export const VIEW_GERAL = 'geral';
export const VIEW_COMPLETO = 'completo';
const PREFIXO_RAIA = 'raia:';

/** Perspective ids the page can render. Must list exactly the keys of `PERSPECTIVAS` (renderer.ts; a test enforces it) and is kept
 *  apart so the state module does not pull any renderer code. Any other `persp` falls back to the default (absent). */
export const PERSPECTIVAS_CONHECIDAS: readonly string[] = ['mermaid'];

export interface EstadoDoFragmento {
  /** Selected node / open playbook (`no`). */
  no?: string;
  /** `geral` | `completo` | `raia:<id>`. Absent means `geral`. */
  view?: string;
  /** Expanded lanes and tasks; `todasSubtarefas` is the `sub` key. */
  exp: ConjuntoExpandido;
  /** `raias=0`: the `completo` View is drawn without the lane groupings (the "Raias" toggle, Requirement 4.6). Only kept in `completo`. */
  semRaias?: boolean;
  /** Perspective id (`persp`). */
  persp?: string;
  /** Catalog filters, opaque to this module (`f`), e.g. `raia:feat_ent,papel:po`. */
  f?: string;
}

export const estadoVazio = (): EstadoDoFragmento => ({
  exp: { raias: new Set(), subtarefas: new Set(), todasSubtarefas: false },
});

const seguro = (v: string): string => encodeURIComponent(v).replace(/%2C/g, ',').replace(/%3A/g, ':');
const desfaz = (v: string): string => {
  try {
    return decodeURIComponent(v);
  } catch {
    return v;
  }
};

const todasAsRaias = (grafo: ModeloDeGrafo): Set<string> => new Set(grafo.raias.map((r) => r.id));

/**
 * Normalizes a state against the graph: `visao` becomes `geral`, unknown lanes/tasks/views are dropped, all lanes
 * expanded means `completo`, a `no` that is not a node id is ignored, and a `persp` outside `PERSPECTIVAS_CONHECIDAS`
 * falls back to the default (absent).
 */
export function normalizarEstado(estado: EstadoDoFragmento, grafo: ModeloDeGrafo): EstadoDoFragmento {
  const raias = todasAsRaias(grafo);
  let view = estado.view === 'visao' ? VIEW_GERAL : estado.view;
  if (view !== undefined && view !== VIEW_GERAL && view !== VIEW_COMPLETO) {
    const id = view.startsWith(PREFIXO_RAIA) ? view.slice(PREFIXO_RAIA.length) : '';
    view = raias.has(id) ? view : undefined;
  }
  let exp = normalizar(estado.exp, grafo);
  const todas = raias.size > 0 && exp.raias.size === raias.size;
  if (view === VIEW_COMPLETO || (todas && (view === undefined || view === VIEW_GERAL))) {
    view = VIEW_COMPLETO;
    exp = { ...exp, raias };
  }
  if (view === VIEW_GERAL) view = undefined;
  const saida: EstadoDoFragmento = { exp };
  if (estado.no && grafo.nos.some((n) => n.id === estado.no)) saida.no = estado.no;
  if (view) saida.view = view;
  if (estado.semRaias && view === VIEW_COMPLETO) saida.semRaias = true;
  if (estado.persp && PERSPECTIVAS_CONHECIDAS.includes(estado.persp)) saida.persp = estado.persp;
  if (estado.f) saida.f = estado.f;
  return saida;
}

/** Parses `location.hash` (with or without `#`). Unknown lanes are ignored; the rest of the state is kept. */
export function lerEstado(hash: string, grafo: ModeloDeGrafo): EstadoDoFragmento {
  const texto = hash.startsWith('#') ? hash.slice(1) : hash;
  const chaves = new Map<string, string>();
  for (const parte of texto.split('&')) {
    const i = parte.indexOf('=');
    if (i > 0) chaves.set(parte.slice(0, i), parte.slice(i + 1));
  }
  const exp = chaves.get('exp');
  // A bare list (`a,b`) is shorthand for `r=a,b`; anything with `=` is the full key of `chaveDoConjunto`.
  const chave = exp === undefined ? '' : exp.includes('=') ? exp : `r=${exp}`;
  const conj = lerConjunto(chave, grafo);
  const bruto: EstadoDoFragmento = { exp: { ...conj, todasSubtarefas: chaves.get('sub') === '1' } };
  const no = chaves.get('no');
  const view = chaves.get('view');
  const persp = chaves.get('persp');
  if (chaves.get('raias') === '0') bruto.semRaias = true;
  const f = chaves.get('f');
  if (no) bruto.no = desfaz(no);
  if (view) bruto.view = desfaz(view);
  if (persp) bruto.persp = desfaz(persp);
  if (f) bruto.f = desfaz(f);
  return normalizarEstado(bruto, grafo);
}

/** Serializes to the compact fragment (without `#`). Lanes are implicit in `completo`; empty state gives ''. */
export function serializarEstado(estado: EstadoDoFragmento): string {
  const partes: string[] = [];
  if (estado.no) partes.push(`no=${seguro(estado.no)}`);
  if (estado.view && estado.view !== VIEW_GERAL) partes.push(`view=${seguro(estado.view)}`);
  const completo = estado.view === VIEW_COMPLETO;
  const chave = chaveDoConjunto({
    raias: completo ? new Set() : estado.exp.raias,
    subtarefas: estado.exp.subtarefas,
    todasSubtarefas: false,
  });
  if (chave) {
    const soRaias = chave.startsWith('r=') && !chave.includes(';');
    partes.push(`exp=${soRaias ? chave.slice(2) : chave}`);
  }
  if (estado.exp.todasSubtarefas) partes.push('sub=1');
  if (completo && estado.semRaias) partes.push('raias=0');
  if (estado.persp) partes.push(`persp=${seguro(estado.persp)}`);
  if (estado.f) partes.push(`f=${seguro(estado.f)}`);
  return partes.join('&');
}

export type ModoDeEscrita = 'replace' | 'push';

interface Janela {
  location: Pick<Location, 'pathname' | 'search' | 'hash'>;
  history: Pick<History, 'replaceState' | 'pushState' | 'state'>;
}

/** Reads the current state from the URL. */
export function lerDaUrl(grafo: ModeloDeGrafo, win: Janela = window): EstadoDoFragmento {
  return lerEstado(win.location.hash, grafo);
}

/**
 * Writes the state to the URL with `history.replaceState` or `history.pushState`: no navigation, no reload,
 * no fetch. Returns false (and writes nothing) when the fragment already matches.
 */
export function escreverEstado(estado: EstadoDoFragmento, modo: ModoDeEscrita = 'replace', win: Janela = window): boolean {
  const fragmento = serializarEstado(estado);
  const atual = win.location.hash.startsWith('#') ? win.location.hash.slice(1) : win.location.hash;
  if (fragmento === atual) return false;
  const url = `${win.location.pathname}${win.location.search}${fragmento ? `#${fragmento}` : ''}`;
  if (modo === 'push') win.history.pushState(win.history.state, '', url);
  else win.history.replaceState(win.history.state, '', url);
  return true;
}

/** Applies a partial change on top of the current URL state and writes it. */
export function atualizarEstado(
  grafo: ModeloDeGrafo,
  mudanca: Partial<EstadoDoFragmento>,
  modo: ModoDeEscrita = 'replace',
  win: Janela = window,
): EstadoDoFragmento {
  const proximo = normalizarEstado({ ...lerDaUrl(grafo, win), ...mudanca }, grafo);
  escreverEstado(proximo, modo, win);
  return proximo;
}
