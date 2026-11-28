// SPDX-License-Identifier: MIT
// Modal_de_Playbook shell (Requirements 6.5, 6.6, 6.7, 6.9, 6.10, 6.11). Native `<dialog>` opened with `showModal()`, the rest of the
// page `inert` while it is open, focus trapped (Tab loops), Esc and the close button return the focus to the element that opened it.
// The content of each item comes from `renderizarConteudo` (extension point: task 7.3 fills it per Nó type, 7.4 pushes related items).
//
// Historico_do_Modal: in-memory stack of `{ tipo, id }`. Only the Nó on it reaches the Fragmento_de_Estado (`no=<id>`): the fragment
// can name a Nó and nothing else, so opening the URL reopens the Nó, never the whole stack (design decision 4).
//
// Relation with the browser history (same rule as voltar.ts, no duplicated entries):
//  - opening from a click/Enter pushes `no=<id>` (one `pushState`), so the browser Back button closes the modal;
//  - closing with Esc or the button undoes that push with `history.back()` (the URL returns exactly to the one before opening);
//  - when the modal was opened by the URL itself (load, Back/Forward), there is no entry of ours to undo: closing rewrites the
//    entry with `replaceState`, dropping `no`.
// The island owns the history writes; this module only asks for them through `gravar` and `recuar`.
import type { ModeloDeGrafo, NoDoGrafo, SubtarefaGrafo } from '../../../lib/schema/grafo';
import { EVENTO_ABRIR_NO } from './interaction';

export const TIPO_NO = 'no';

export interface ItemDoModal {
  /** `no` for a Nó of the graph; 7.4 adds papel, tecnica, artefato, variavel, rito, pergunta. */
  tipo: string;
  id: string;
}

/** An element that can take focus: HTML or SVG (a Nó of the Diagrama is a `<g>`). */
export type Focavel = Element & HTMLOrSVGElement;

export type TraduzirModal = (chave: string, vars?: Record<string, string | number>) => string;

/**
 * What an item of tipo `no` names: a Nó of the graph, or one of its Subtarefas (the Diagrama draws both with `data-id`, and a click on
 * either opens the modal, Requirement 6.3).
 */
export function resolverNo(grafo: ModeloDeGrafo, id: string): { no: NoDoGrafo; subtarefa?: SubtarefaGrafo } | undefined {
  for (const no of grafo.nos) {
    if (no.id === id) return { no };
    const subtarefa = no.subtarefas.find((s) => s.id === id);
    if (subtarefa) return { no, subtarefa };
  }
  return undefined;
}

export interface ContextoDoModal {
  doc: Document;
  grafo: ModeloDeGrafo;
  t: TraduzirModal;
  /** Pushes an item on the Historico_do_Modal (what a click on a related item does, task 7.4). */
  abrirItem(item: ItemDoModal): void;
  /** Closes the modal and activates the View `raia:<id>` (the button of a chamada de Raia, Requirement 4.2). Absent in a bare modal. */
  abrirRaia?(raiaId: string): void;
  /** The "Destacar no Diagrama" action (Requirement 8.4): closes the modal and shows the Nó highlighted. Absent in a bare modal. */
  destacarNo?(id: string): void;
  /** Sets the heading of the item being rendered (an item that is not a Nó only knows its name once the content has loaded). */
  titular(texto: string): void;
}

/** Extension point (tasks 7.3 and 7.4): builds the body of the item on top of the Historico_do_Modal. */
export type RenderizarConteudo = (item: ItemDoModal, ctx: ContextoDoModal) => Node;

/** Provisional content: name and type of the Nó. Replaced by the per-type content of task 7.3. */
export const renderizarConteudo: RenderizarConteudo = (item, ctx) => {
  const frag = ctx.doc.createDocumentFragment();
  const no = item.tipo === TIPO_NO ? ctx.grafo.nos.find((n) => n.id === item.id) : undefined;
  const p = ctx.doc.createElement('p');
  if (no) {
    p.textContent = `${ctx.t('flow.modal.tipo')}: ${ctx.t(`flow.legend.${no.tipo}`)}`;
  } else {
    p.textContent = item.id;
  }
  frag.appendChild(p);
  return frag;
};

export interface OpcoesDoModal {
  /** Island root: the modal listens to `flow:abrir-no` on it (the event bubbles from the stage). */
  raiz: HTMLElement;
  grafo: ModeloDeGrafo;
  t: TraduzirModal;
  /** Writes `no` (or removes it when undefined) to the Fragmento_de_Estado: `push` adds a history entry, `replace` rewrites the current one. */
  gravar(no: string | undefined, modo: 'push' | 'replace'): void;
  /** Undoes the entry `gravar(..., 'push')` added (`history.back()`). */
  recuar(): void;
  /** Where the focus goes when the origin element is gone (a redraw replaces the SVG). Defaults to the stage. */
  focoReserva?: () => HTMLElement | null;
  renderizar?: RenderizarConteudo;
  /** The "open the lane" button of a chamada de Raia calls this; the owner closes the modal with `fecharParaNavegar` and changes the View. */
  abrirRaia?: (raiaId: string) => void;
  /** The "Destacar no Diagrama" button calls this; the owner closes the modal with `fecharParaNavegar` and shows the Nó highlighted. */
  destacarNo?: (id: string) => void;
}

export interface ModalMontado {
  readonly aberto: boolean;
  /** Snapshot of the Historico_do_Modal, bottom first. */
  pilha(): readonly ItemDoModal[];
  /** Opens the modal on a Nó. Returns false (and does nothing) when `id` is not a Nó of the graph. */
  abrir(id: string, origem?: Focavel | null): boolean;
  /** Pushes an item on the Historico_do_Modal and shows it (task 7.4). */
  empilhar(item: ItemDoModal): void;
  /** Shows the previous item of the Historico_do_Modal. */
  voltar(): void;
  fechar(): void;
  /**
   * Closes the dialog and returns the focus like `fechar`, but leaves the URL alone. Returns true when this opening added the history
   * entry (`no=`): the caller then rewrites that entry with its own state, so Back does not pass through a duplicate of the previous one.
   */
  fecharParaNavegar(): boolean;
  /** Follows the URL (load, Back, Forward): opens, switches or closes without writing to the history. */
  sincronizar(idDaUrl: string | undefined): void;
  destruir(): void;
}

const FOCAVEIS = 'a[href], button, input, select, textarea, summary, [tabindex]';

function focaveisDe(dialogo: HTMLElement): HTMLElement[] {
  return [...dialogo.querySelectorAll<HTMLElement>(FOCAVEIS)].filter((e) => {
    if (e.tabIndex < 0) return false;
    if ((e as HTMLButtonElement).disabled) return false;
    return !e.closest('[hidden]');
  });
}

export function montarModal(opcoes: OpcoesDoModal): ModalMontado {
  const { raiz, grafo, t } = opcoes;
  const doc = raiz.ownerDocument;
  const renderizar = opcoes.renderizar ?? renderizarConteudo;
  const prefixo = `flow-modal-${raiz.dataset.flowId ?? 'x'}`;

  const dialogo = doc.createElement('dialog');
  dialogo.className = 'flow-modal';
  dialogo.dataset.flowModal = '';
  dialogo.id = prefixo;
  dialogo.tabIndex = -1;
  dialogo.setAttribute('aria-modal', 'true');
  dialogo.setAttribute('aria-labelledby', `${prefixo}-titulo`);

  const cabecalho = doc.createElement('div');
  cabecalho.className = 'flow-modal__cabecalho';
  const botaoVoltar = doc.createElement('button');
  botaoVoltar.type = 'button';
  botaoVoltar.dataset.flowModalVoltar = '';
  botaoVoltar.textContent = t('flow.modal.voltar');
  botaoVoltar.setAttribute('aria-label', t('flow.modal.voltar.rotulo'));
  const titulo = doc.createElement('h2');
  titulo.id = `${prefixo}-titulo`;
  titulo.className = 'flow-modal__titulo';
  const botaoFechar = doc.createElement('button');
  botaoFechar.type = 'button';
  botaoFechar.dataset.flowModalFechar = '';
  botaoFechar.textContent = t('flow.modal.fechar');
  botaoFechar.setAttribute('aria-label', t('flow.modal.fechar.rotulo'));
  cabecalho.append(botaoVoltar, titulo, botaoFechar);
  const corpo = doc.createElement('div');
  corpo.className = 'flow-modal__corpo';
  corpo.dataset.flowModalCorpo = '';
  dialogo.append(cabecalho, corpo);
  doc.body.appendChild(dialogo);

  let pilha: ItemDoModal[] = [];
  let origem: Focavel | null = null;
  /** True when this opening added the history entry that closing must undo. */
  let empurrou = false;
  let aberto = false;
  let inertes: Element[] = [];

  const noDe = (id: string): NoDoGrafo | undefined => resolverNo(grafo, id)?.no;
  const topo = (): ItemDoModal | undefined => pilha[pilha.length - 1];
  /** The Nó the fragment names: the topmost Nó of the stack. */
  const noDaUrl = (): string | undefined => [...pilha].reverse().find((i) => i.tipo === TIPO_NO)?.id;

  const ctxBase = {
    doc,
    grafo,
    t,
    abrirItem: (item: ItemDoModal) => empilhar(item),
    abrirRaia: opcoes.abrirRaia,
    destacarNo: opcoes.destacarNo,
  };

  function mostrar(): void {
    const item = topo();
    if (!item) return;
    const achado = item.tipo === TIPO_NO ? resolverNo(grafo, item.id) : undefined;
    titulo.textContent = achado?.subtarefa?.rotulo ?? achado?.no.rotulo ?? item.id;
    // `titular` only counts while this item is still on top: a late answer must not rename the item the user has moved to.
    const ctx: ContextoDoModal = { ...ctxBase, titular: (texto) => { if (topo() === item) titulo.textContent = texto; } };
    corpo.replaceChildren(renderizar(item, ctx));
    botaoVoltar.hidden = pilha.length <= 1; // Requirement 6.7
    // The body was replaced: a focused control inside it is gone, and the focus must stay in the dialog (Requirement 6.9).
    if (aberto && !dialogo.contains(doc.activeElement)) dialogo.focus();
  }

  function isolarOResto(): void {
    inertes = [...doc.body.children].filter((e) => e !== dialogo && !e.hasAttribute('inert'));
    for (const e of inertes) e.setAttribute('inert', '');
  }
  function liberarOResto(): void {
    for (const e of inertes) e.removeAttribute('inert');
    inertes = [];
  }

  function abrirDialogo(): void {
    if (aberto) return;
    isolarOResto();
    // jsdom (and very old browsers) lack `showModal`: the `open` attribute is the same visible state.
    if (typeof dialogo.showModal === 'function') dialogo.showModal();
    else dialogo.setAttribute('open', '');
    aberto = true;
    dialogo.focus();
  }

  function fecharDialogo(): void {
    if (!aberto) return;
    aberto = false;
    if (typeof dialogo.close === 'function') dialogo.close();
    else dialogo.removeAttribute('open');
    liberarOResto();
    pilha = [];
    const alvo = origem && origem.isConnected ? origem : (opcoes.focoReserva?.() ?? raiz.querySelector<HTMLElement>('[data-flow-stage]'));
    origem = null;
    alvo?.focus();
  }

  function abrir(id: string, de?: Focavel | null): boolean {
    if (!noDe(id)) return false; // an unknown `no` is ignored
    const ativo = doc.activeElement && doc.activeElement !== doc.body && 'focus' in doc.activeElement ? (doc.activeElement as Focavel) : null;
    pilha = [{ tipo: TIPO_NO, id }];
    if (!aberto) {
      origem = de ?? ativo;
      opcoes.gravar(id, 'push');
      empurrou = true;
      abrirDialogo();
    } else {
      opcoes.gravar(id, 'replace');
    }
    mostrar();
    return true;
  }

  function empilhar(item: ItemDoModal): void {
    if (!aberto) return;
    pilha.push(item);
    mostrar();
    if (item.tipo === TIPO_NO) opcoes.gravar(item.id, 'replace');
    corpo.scrollTop = 0;
  }

  function voltar(): void {
    if (pilha.length <= 1) return;
    pilha.pop();
    mostrar();
    const no = noDaUrl();
    if (no) opcoes.gravar(no, 'replace');
    corpo.scrollTop = 0;
    // The back button hides when the stack is down to one item: the focus must not be lost with it.
    if (botaoVoltar.hidden) botaoFechar.focus();
    else botaoVoltar.focus();
  }

  function fechar(): void {
    if (!aberto) return;
    const desfazer = empurrou;
    empurrou = false;
    fecharDialogo();
    if (desfazer) opcoes.recuar();
    else opcoes.gravar(undefined, 'replace');
  }

  function fecharParaNavegar(): boolean {
    if (!aberto) return false;
    const nosso = empurrou;
    empurrou = false;
    fecharDialogo();
    return nosso;
  }

  function sincronizar(idDaUrl: string | undefined): void {
    if (idDaUrl === undefined || !noDe(idDaUrl)) {
      if (aberto) {
        empurrou = false;
        fecharDialogo();
      }
      return;
    }
    if (aberto && pilha[0]?.id === idDaUrl && pilha.length === 1) return;
    pilha = [{ tipo: TIPO_NO, id: idDaUrl }];
    if (!aberto) {
      origem = null;
      empurrou = false;
      abrirDialogo();
    }
    mostrar();
  }

  const aoAbrirNo = (ev: Event): void => {
    const id = (ev as CustomEvent<{ id: string }>).detail?.id;
    if (id) abrir(id);
  };
  const aoCancelar = (ev: Event): void => {
    ev.preventDefault(); // the native close would skip the history and focus rules above
    fechar();
  };
  const aoTeclar = (ev: KeyboardEvent): void => {
    if (ev.key === 'Escape') {
      ev.preventDefault();
      fechar();
      return;
    }
    if (ev.key !== 'Tab') return;
    const lista = focaveisDe(dialogo);
    if (lista.length === 0) {
      ev.preventDefault();
      dialogo.focus();
      return;
    }
    const primeiro = lista[0] as HTMLElement;
    const ultimo = lista[lista.length - 1] as HTMLElement;
    const ativo = doc.activeElement;
    if (ev.shiftKey && (ativo === primeiro || ativo === dialogo || !dialogo.contains(ativo))) {
      ev.preventDefault();
      ultimo.focus();
    } else if (!ev.shiftKey && (ativo === ultimo || !dialogo.contains(ativo))) {
      ev.preventDefault();
      primeiro.focus();
    }
  };
  // A click on the backdrop (the dialog element itself, outside its box) is not a close gesture: only Esc and the button close it.
  const aoFechar = (): void => fechar();
  const aoVoltar = (): void => voltar();

  raiz.addEventListener(EVENTO_ABRIR_NO, aoAbrirNo);
  dialogo.addEventListener('cancel', aoCancelar);
  dialogo.addEventListener('keydown', aoTeclar);
  botaoFechar.addEventListener('click', aoFechar);
  botaoVoltar.addEventListener('click', aoVoltar);
  botaoVoltar.hidden = true;

  return {
    get aberto() {
      return aberto;
    },
    pilha: () => [...pilha],
    abrir,
    empilhar,
    voltar,
    fechar,
    fecharParaNavegar,
    sincronizar,
    destruir() {
      raiz.removeEventListener(EVENTO_ABRIR_NO, aoAbrirNo);
      dialogo.removeEventListener('cancel', aoCancelar);
      dialogo.removeEventListener('keydown', aoTeclar);
      botaoFechar.removeEventListener('click', aoFechar);
      botaoVoltar.removeEventListener('click', aoVoltar);
      if (aberto) {
        aberto = false;
        if (typeof dialogo.close === 'function') dialogo.close();
        liberarOResto();
      }
      dialogo.remove();
    },
  };
}
