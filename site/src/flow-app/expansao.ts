// SPDX-License-Identifier: MIT
// Redraw queue of the Diagrama (Requirements 20.9, 20.10, 15.8). One `mermaid.render` per Conjunto_Expandido, with:
//  - a sequence number per request: the result of a request that is no longer the latest is never applied, and the previous
//    drawing stays on screen (and interactive) until the latest one is ready;
//  - one render at a time (Mermaid shares DOM scratch space), keeping only the latest waiting request;
//  - an SVG cache by `chaveDoConjunto` bounded by entries and bytes (spike decision: 6 sets, 24 MiB of SVG text), least recently
//    used out first, so going back to a seen state costs a DOM swap and no render;
//  - a progress indicator (`role="status"`, `aria-busy="true"` on the container) painted BEFORE the render starts, within 100 ms,
//    with a "drawing N nodes" message for big sets;
//  - on failure the previous drawing stays, with "Tentar de novo" (not for a Mermaid limit overrun) and the textual alternative.
// No Mermaid import here: the caller passes `renderizar` (task 6.2 loader), so the queue and the cache are testable with a fake.
import { chaveDoConjunto, type ConjuntoExpandido } from '../../../lib/flow-graph/expansao';
import type { ModeloDeGrafo } from '../../../lib/schema/grafo';
import { MermaidLimiteError } from './mermaid-loader';
import type { EstadoDiagrama } from './renderer';

const PREFIXO_RAIA = 'raia:';

export const CACHE_MAX_CONJUNTOS = 6;
export const CACHE_MAX_BYTES = 24 * 1024 * 1024;
/** The indicator must be on screen within this time of the request (Requirement 20.9). */
export const INDICADOR_ATE_MS = 100;
/** From this many visible nodes the indicator says how many nodes are being drawn. */
export const NOS_CONJUNTO_GRANDE = 100;
/** Default interactive target (ms) above which the elapsed time is reported (lane expansion, Requirement 15.8). */
export const ALVO_PADRAO_MS = 1000;
/** Upper bound of the wait for a frame before the render starts; keeps the indicator under `INDICADOR_ATE_MS` in hidden tabs. */
const ESPERA_QUADRO_MAX_MS = 50;

export type Traduzir = (chave: string, vars?: Record<string, string | number>) => string;

/** Cache key of a Diagrama state; mirrors how `diagramaDoEstado` derives the Texto_Mermaid (lane views, `completo`, sets). */
export function chaveDoEstado(grafo: ModeloDeGrafo, estado: EstadoDiagrama): string {
  if (estado.view.startsWith(PREFIXO_RAIA)) return `${estado.view}|t=${estado.subtarefas ? 1 : 0}`;
  const raias = estado.view === 'completo' ? new Set(grafo.raias.map((r) => r.id)) : estado.expandidas.raias;
  const conj: ConjuntoExpandido = { raias, subtarefas: estado.expandidas.subtarefas, todasSubtarefas: estado.subtarefas };
  return chaveDoConjunto(conj) + (estado.view === 'completo' && estado.semRaias ? '|sr' : '');
}

const bytesDe = (texto: string): number => (typeof TextEncoder === 'undefined' ? texto.length : new TextEncoder().encode(texto).length);

/** LRU cache of SVG text bounded by entry count and total bytes. An SVG bigger than the byte limit is not stored. */
export class CacheDeSvg {
  private readonly itens = new Map<string, { svg: string; bytes: number }>();
  private total = 0;

  constructor(
    readonly maxConjuntos = CACHE_MAX_CONJUNTOS,
    readonly maxBytes = CACHE_MAX_BYTES,
  ) {}

  get tamanho(): number {
    return this.itens.size;
  }

  get bytes(): number {
    return this.total;
  }

  has(chave: string): boolean {
    return this.itens.has(chave);
  }

  /** Cached SVG, marked as the most recently used. */
  get(chave: string): string | undefined {
    const item = this.itens.get(chave);
    if (!item) return undefined;
    this.itens.delete(chave);
    this.itens.set(chave, item);
    return item.svg;
  }

  /** Stores `svg`, evicting the least recently used entries to fit. Returns false when it alone exceeds the byte limit. */
  set(chave: string, svg: string): boolean {
    this.remover(chave);
    const bytes = bytesDe(svg);
    if (bytes > this.maxBytes || this.maxConjuntos < 1) return false;
    this.itens.set(chave, { svg, bytes });
    this.total += bytes;
    for (const [antiga] of this.itens) {
      if (this.itens.size <= this.maxConjuntos && this.total <= this.maxBytes) break;
      this.remover(antiga);
    }
    return true;
  }

  remover(chave: string): void {
    const item = this.itens.get(chave);
    if (!item) return;
    this.total -= item.bytes;
    this.itens.delete(chave);
  }

  limpar(): void {
    this.itens.clear();
    this.total = 0;
  }
}

export interface PedidoDeRender {
  /** `chaveDoEstado` of the state (cache key). */
  chave: string;
  /** Number of visible nodes (`GrafoVisivel.nos.length` plus clusters); drives the "drawing N nodes" message. */
  nos?: number;
  /** Interactive target in ms; when the redraw takes longer, the elapsed time is reported. Default 1000. */
  alvoMs?: number;
  /** Produces the SVG (Mermaid render with the kit limits). Called at most once per attempt, never for a cached key. */
  renderizar(): Promise<string>;
  /** Puts the SVG on screen. Called only for the latest request. */
  aplicar(svg: string): void;
}

export type ResultadoDoPedido =
  | { estado: 'aplicado' | 'cache'; duracaoMs: number }
  | { estado: 'obsoleto' }
  | { estado: 'falhou'; erro: unknown; limite: boolean };

export interface OpcoesDaExpansao {
  /** Container of the Diagrama: receives `aria-busy`, the status element and the error panel. */
  container: HTMLElement;
  t: Traduzir;
  /** Opens the textual alternative of the flow (the ordered list of nodes per lane). */
  mostrarAlternativaTextual?: () => void;
  cache?: CacheDeSvg;
  /** Yields so the browser paints the indicator before the render blocks the main thread. Injectable for tests. */
  cederQuadro?: () => Promise<void>;
  agora?: () => number;
}

/** Waits for one painted frame (rAF then a macrotask), but never more than `ESPERA_QUADRO_MAX_MS` (rAF is paused in hidden tabs). */
export function cederQuadroPadrao(): Promise<void> {
  return new Promise<void>((ok) => {
    let feito = false;
    const fim = (): void => {
      if (feito) return;
      feito = true;
      ok();
    };
    setTimeout(fim, ESPERA_QUADRO_MAX_MS);
    if (typeof requestAnimationFrame === 'function') requestAnimationFrame(() => setTimeout(fim, 0));
  });
}

const SPINNER =
  '<svg class="flow-progresso__animacao" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
  '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-opacity=".25" stroke-width="3"/>' +
  '<path d="M12 3a9 9 0 0 1 9 9" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">' +
  '<animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.9s" repeatCount="indefinite"/>' +
  '</path></svg>';

const reduzMovimento = (doc: Document): boolean => doc.defaultView?.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches === true;

interface Pendente {
  seq: number;
  pedido: PedidoDeRender;
  inicio: number;
  resolver(r: ResultadoDoPedido): void;
}

export class ExpansaoDoDiagrama {
  readonly cache: CacheDeSvg;
  private readonly status: HTMLElement;
  private erro: HTMLElement | undefined;
  private ultimo = 0;
  private pendente: Pendente | undefined;
  private ocupado = false;
  private destruida = false;
  private readonly cederQuadro: () => Promise<void>;
  private readonly agora: () => number;

  constructor(private readonly o: OpcoesDaExpansao) {
    this.cache = o.cache ?? new CacheDeSvg();
    this.cederQuadro = o.cederQuadro ?? cederQuadroPadrao;
    this.agora = o.agora ?? (() => performance.now());
    const doc = o.container.ownerDocument;
    this.status = doc.createElement('div');
    this.status.className = 'flow-progresso';
    this.status.setAttribute('role', 'status');
    this.status.hidden = true;
    o.container.appendChild(this.status);
  }

  /**
   * Asks for the drawing of a state. A cached state is applied at once. Otherwise the indicator is painted, the render runs when
   * it is the latest request, and its SVG is cached. Resolves with what happened; never rejects.
   */
  pedir(pedido: PedidoDeRender): Promise<ResultadoDoPedido> {
    const seq = ++this.ultimo;
    const inicio = this.agora();
    this.limparErro();
    this.substituirPendente();

    const guardado = this.cache.get(pedido.chave);
    if (guardado !== undefined) {
      try {
        pedido.aplicar(guardado);
      } catch (erro) {
        return Promise.resolve(this.falhar(erro, pedido));
      }
      this.parar();
      return Promise.resolve({ estado: 'cache', duracaoMs: this.agora() - inicio });
    }

    this.iniciarProgresso(pedido.nos);
    return new Promise<ResultadoDoPedido>((resolver) => {
      this.pendente = { seq, pedido, inicio, resolver };
      void this.bombear();
    });
  }

  destruir(): void {
    this.destruida = true;
    this.ultimo++;
    this.substituirPendente();
    this.status.remove();
    this.limparErro();
    this.o.container.removeAttribute('aria-busy');
  }

  private substituirPendente(): void {
    this.pendente?.resolver({ estado: 'obsoleto' });
    this.pendente = undefined;
  }

  private async bombear(): Promise<void> {
    if (this.ocupado) return;
    this.ocupado = true;
    try {
      while (this.pendente) {
        const item = this.pendente;
        this.pendente = undefined;
        item.resolver(await this.executar(item));
      }
    } finally {
      this.ocupado = false;
    }
  }

  private async executar(item: Pendente): Promise<ResultadoDoPedido> {
    await this.cederQuadro();
    if (this.destruida || item.seq !== this.ultimo) return { estado: 'obsoleto' };
    let svg: string;
    try {
      svg = await item.pedido.renderizar();
    } catch (erro) {
      if (this.destruida || item.seq !== this.ultimo) return { estado: 'obsoleto' }; // nobody is waiting for this one
      return this.falhar(erro, item.pedido);
    }
    this.cache.set(item.pedido.chave, svg); // the work is done: keep it even when a newer request took the screen
    if (this.destruida || item.seq !== this.ultimo) return { estado: 'obsoleto' };
    try {
      item.pedido.aplicar(svg);
    } catch (erro) {
      return this.falhar(erro, item.pedido);
    }
    const duracaoMs = this.agora() - item.inicio;
    this.parar();
    if (duracaoMs > (item.pedido.alvoMs ?? ALVO_PADRAO_MS)) this.informar(this.o.t('flow.progress.elapsed', { seg: (duracaoMs / 1000).toFixed(1) }));
    return { estado: 'aplicado', duracaoMs };
  }

  private iniciarProgresso(nos: number | undefined): void {
    const grande = nos !== undefined && nos >= NOS_CONJUNTO_GRANDE;
    const texto = grande ? this.o.t('flow.progress.drawing.nodes', { nos }) : this.o.t('flow.progress.drawing');
    const doc = this.o.container.ownerDocument;
    this.status.replaceChildren();
    if (!reduzMovimento(doc)) this.status.insertAdjacentHTML('beforeend', SPINNER);
    const span = doc.createElement('span');
    span.textContent = texto;
    this.status.appendChild(span);
    this.status.hidden = false;
    this.o.container.setAttribute('aria-busy', 'true');
  }

  private parar(): void {
    this.status.hidden = true;
    this.status.replaceChildren();
    this.o.container.removeAttribute('aria-busy');
  }

  /** A message that stays in the status region after the drawing (elapsed time over target). */
  private informar(texto: string): void {
    this.status.replaceChildren(texto);
    this.status.hidden = false;
  }

  private falhar(erro: unknown, pedido?: PedidoDeRender): ResultadoDoPedido {
    this.parar();
    const limite = erro instanceof MermaidLimiteError;
    const doc = this.o.container.ownerDocument;
    const painel = doc.createElement('div');
    painel.className = 'flow-erro';
    painel.setAttribute('role', 'alert');
    const msg = doc.createElement('p');
    msg.textContent = this.o.t(limite ? 'flow.error.limit' : 'flow.error.render');
    painel.appendChild(msg);
    if (pedido && !limite) {
      const tentar = doc.createElement('button');
      tentar.type = 'button';
      tentar.textContent = this.o.t('flow.error.retry');
      tentar.addEventListener('click', () => void this.pedir(pedido));
      painel.appendChild(tentar);
    }
    if (this.o.mostrarAlternativaTextual) {
      const alt = doc.createElement('button');
      alt.type = 'button';
      alt.textContent = this.o.t('flow.error.textual');
      alt.addEventListener('click', () => this.o.mostrarAlternativaTextual?.());
      painel.appendChild(alt);
    }
    this.limparErro();
    this.erro = painel;
    this.o.container.appendChild(painel);
    return { estado: 'falhou', erro, limite };
  }

  private limparErro(): void {
    this.erro?.remove();
    this.erro = undefined;
  }
}

export function criarExpansao(o: OpcoesDaExpansao): ExpansaoDoDiagrama {
  return new ExpansaoDoDiagrama(o);
}
