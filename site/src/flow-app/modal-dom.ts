// SPDX-License-Identifier: MIT
// DOM helpers shared by the content of the Modal_de_Playbook (modal-conteudo.ts: Nós) and the item details (modal-itens.ts).
// Everything reaches the DOM through `textContent` and `createElement`, never `innerHTML`.
import type { ContextoDoModal } from './modal';

/** `[[id]]`, `[[id|label]]` and `[[id#anchor|label]]` of the guide text: the label, or the id. */
export function semWikilinks(texto: string): string {
  return texto.replace(/\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|([^\]]+))?\]\]/g, (_m, id: string, rotulo?: string) => rotulo ?? id);
}
export const limpar = (texto: string): string => semWikilinks(texto).replace(/^"|"$/g, '');

export function el<K extends keyof HTMLElementTagNameMap>(doc: Document, tag: K, classe?: string, texto?: string): HTMLElementTagNameMap[K] {
  const e = doc.createElement(tag);
  if (classe) e.className = classe;
  if (texto !== undefined) e.textContent = texto;
  return e;
}

export function secao(doc: Document, titulo: string, chave: string, ...filhos: Node[]): HTMLElement {
  const s = el(doc, 'section', 'flow-modal__secao');
  s.dataset.flowSecao = chave;
  s.appendChild(el(doc, 'h3', undefined, titulo));
  s.append(...filhos);
  return s;
}

export function lista(doc: Document, itens: Node[], ordenada = false): HTMLElement {
  const l = el(doc, ordenada ? 'ol' : 'ul');
  for (const i of itens) {
    const li = el(doc, 'li');
    li.appendChild(i);
    l.appendChild(li);
  }
  return l;
}

/** A button that pushes an item on the Historico_do_Modal (Requirement 6.5). */
export function botaoItem(doc: Document, ctx: ContextoDoModal, tipo: string, id: string, texto: string): HTMLButtonElement {
  const b = el(doc, 'button', 'flow-modal__item', texto);
  b.type = 'button';
  b.dataset.flowItem = tipo;
  b.dataset.id = id;
  b.addEventListener('click', () => ctx.abrirItem({ tipo, id }));
  return b;
}

export function meta(doc: Document, pares: Array<[string, Node | string]>): HTMLElement {
  const dl = el(doc, 'dl', 'flow-modal__meta');
  for (const [rotulo, valor] of pares) {
    dl.appendChild(el(doc, 'dt', undefined, rotulo));
    const dd = el(doc, 'dd');
    dd.append(valor);
    dl.appendChild(dd);
  }
  return dl;
}

export const juntar = (...partes: Array<Node | undefined>): Node[] => partes.filter((p): p is Node => p !== undefined);

/** Link to the Pagina_Canonica of an Entidade (Requirement 6.8): a plain anchor, so the browser follows it like any link. */
export function linkCanonico(doc: Document, ctx: ContextoDoModal, url: string | null | undefined): HTMLAnchorElement | undefined {
  if (!url) return undefined;
  const a = el(doc, 'a', 'flow-modal__pagina', ctx.t('flow.modal.abrir_pagina'));
  a.href = url;
  return a;
}
