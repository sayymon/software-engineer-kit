// SPDX-License-Identifier: MIT
// @vitest-environment jsdom
// Modal_de_Playbook shell (Requirements 6.5, 6.6, 6.7, 6.9, 6.10, 6.11). jsdom has no `showModal`: the module falls back to the `open`
// attribute, and one test installs a minimal `showModal`/`close` to prove the native path is the one taken when it exists.
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { ModeloDeGrafo } from '../../lib/schema/grafo';
import { criarControlador, type ControladorDaIlha } from '../../site/src/flow-app/island';
import { EVENTO_ABRIR_NO } from '../../site/src/flow-app/interaction';
import { PERSPECTIVAS, type Renderizador } from '../../site/src/flow-app/renderer';
import { montarModal } from '../../site/src/flow-app/modal';

const no = (id: string, raia: string) => ({ id, tipo: 'tarefa', rotulo: `Nome ${id}`, raia, ordem: 0, subtarefas: [], temPlaybook: false });
const grafo = {
  versaoContrato: 1,
  demanda: 'd',
  nomeDemanda: 'D',
  raias: ['a', 'b'].map((id, ordem) => ({ id, nome: `Raia ${id}`, cor: '#336699', ordem, orquestradora: ordem === 0 })),
  nos: [no('a1', 'a'), no('b1', 'b')],
  arestas: [],
} as unknown as ModeloDeGrafo;

const original = PERSPECTIVAS.mermaid as Renderizador;
let controlador: ControladorDaIlha;
const tick = async (): Promise<void> => {
  for (let i = 0; i < 5; i++) await new Promise((r) => setTimeout(r, 0));
};
const palco = (): HTMLElement => document.querySelector('[data-flow-stage]') as HTMLElement;
const dialogo = (): HTMLDialogElement => document.querySelector('dialog[data-flow-modal]') as HTMLDialogElement;
const abrirNo = (id: string): void => {
  palco().dispatchEvent(new CustomEvent(EVENTO_ABRIR_NO, { detail: { id }, bubbles: true }));
};
const tecla = (alvo: Element, key: string, shiftKey = false): KeyboardEvent => {
  const ev = new KeyboardEvent('keydown', { key, shiftKey, bubbles: true, cancelable: true });
  alvo.dispatchEvent(ev);
  return ev;
};

async function montar(hash = ''): Promise<void> {
  window.history.replaceState(null, '', `/pt-BR/flows/d/${hash}`);
  PERSPECTIVAS.mermaid = {
    perspectiva: 'mermaid',
    async montar(container) {
      container.innerHTML = '<svg width="400" viewBox="0 0 400 200"></svg>';
      return { async atualizar() {}, focarNo() {}, destruir() {} };
    },
  };
  document.body.innerHTML =
    '<main><article><div data-island="flow" data-flow-id="d" data-flow-base="" data-flow-locale="">' +
    '<div data-flow-controls hidden><select data-flow-select></select>' +
    '<div data-flow-tabs role="tablist"><button role="tab" id="t0" data-view="geral"></button></div>' +
    '<div id="flow-panel" role="tabpanel" data-flow-stage tabindex="0"></div></div></div></article></main>';
  controlador = criarControlador({ carregarGrafo: async () => grafo, buscarPagina: async () => '', navegar: () => {} }, window);
  await controlador.montar(document.querySelector('[data-island="flow"]') as HTMLElement);
}

afterEach(() => {
  controlador.destruir();
  PERSPECTIVAS.mermaid = original;
  document.body.innerHTML = '';
});

describe('Modal_de_Playbook: abrir e fechar', () => {
  beforeEach(() => montar());

  it('opens on flow:abrir-no, writes no= with a push, labels the dialog and isolates the page', async () => {
    const entradas = window.history.length;
    const origem = palco();
    origem.focus();
    abrirNo('a1');
    expect(dialogo().open).toBe(true);
    expect(window.location.hash).toBe('#no=a1');
    expect(window.history.length).toBe(entradas + 1);
    expect(dialogo().getAttribute('aria-modal')).toBe('true');
    const titulo = document.getElementById(dialogo().getAttribute('aria-labelledby') as string);
    expect(titulo?.textContent).toBe('Nome a1');
    expect(document.querySelector('main')?.hasAttribute('inert')).toBe(true);
    expect(dialogo().hasAttribute('inert')).toBe(false);
    expect(document.activeElement).toBe(dialogo());
  });

  it('Esc closes, un-isolates the page, returns the focus and undoes the push (URL back to the one before)', async () => {
    palco().focus();
    abrirNo('a1');
    tecla(dialogo(), 'Escape');
    expect(dialogo().open).toBe(false);
    expect(document.querySelector('main')?.hasAttribute('inert')).toBe(false);
    expect(document.activeElement).toBe(palco());
    // history.back() is async: wait for the URL to settle instead of sleeping a fixed time.
    await vi.waitFor(() => expect(window.location.hash).toBe(''), { timeout: 5000, interval: 10 });
  });

  it('the close button does the same as Esc', async () => {
    palco().focus();
    abrirNo('b1');
    (dialogo().querySelector('[data-flow-modal-fechar]') as HTMLElement).click();
    expect(dialogo().open).toBe(false);
    expect(document.activeElement).toBe(palco());
    await vi.waitFor(() => expect(window.location.hash).toBe(''), { timeout: 5000, interval: 10 });
  });

  it('the browser Back button closes the modal and returns the focus', async () => {
    palco().focus();
    abrirNo('a1');
    window.history.back();
    // The popstate that closes the modal fires asynchronously: wait for its effect.
    await vi.waitFor(() => expect(dialogo().open).toBe(false), { timeout: 5000, interval: 10 });
    expect(document.activeElement).toBe(palco());
    expect(window.location.hash).toBe('');
  });

  it('ignores an unknown Nó', () => {
    abrirNo('nao-existe');
    expect(dialogo().open).toBe(false);
    expect(window.location.hash).toBe('');
  });

  it('traps the focus: Tab on the last control goes to the first, Shift+Tab on the first goes to the last', () => {
    abrirNo('a1');
    const fechar = dialogo().querySelector('[data-flow-modal-fechar]') as HTMLElement; // back button is hidden with a single item
    fechar.focus();
    expect(tecla(fechar, 'Tab').defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(fechar); // only one focusable control: it loops onto itself
    expect(tecla(fechar, 'Tab', true).defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(fechar);
  });

  it('removes the dialog and the inert attributes when the island is destroyed', () => {
    abrirNo('a1');
    controlador.destruir();
    expect(document.querySelector('dialog')).toBeNull();
    expect(document.querySelector('main')?.hasAttribute('inert')).toBe(false);
  });
});

describe('Modal_de_Playbook: URL', () => {
  it('reopens on load with no= and closing rewrites the entry without no (no extra history entry)', async () => {
    await montar('#no=b1');
    expect(dialogo().open).toBe(true);
    expect(dialogo().querySelector('h2')?.textContent).toBe('Nome b1');
    const entradas = window.history.length;
    tecla(dialogo(), 'Escape');
    expect(dialogo().open).toBe(false);
    expect(window.location.hash).toBe('');
    expect(window.history.length).toBe(entradas);
  });

  it('drops an unknown no= and stays closed', async () => {
    await montar('#no=zzz');
    expect(dialogo().open).toBe(false);
    expect(window.location.hash).toBe('');
  });
});

describe('Historico_do_Modal', () => {
  beforeEach(() => montar());

  it('hides the back button with a single item, shows it after a push, and goes back one item', () => {
    abrirNo('a1');
    const voltar = dialogo().querySelector('[data-flow-modal-voltar]') as HTMLElement;
    expect(voltar.hidden).toBe(true);
    // The island exposes no API for 7.4 yet: use a modal built on the same root to exercise the stack.
    const raiz = document.querySelector('[data-island="flow"]') as HTMLElement;
    const escritas: Array<[string | undefined, string]> = [];
    controlador.destruir();
    const modal = montarModal({ raiz, grafo, t: (k) => k, gravar: (n, m) => escritas.push([n, m]), recuar: () => {} });
    modal.abrir('a1');
    modal.empilhar({ tipo: 'papel', id: 'po' });
    expect(modal.pilha().map((i) => i.id)).toEqual(['a1', 'po']);
    const v = document.querySelector('[data-flow-modal-voltar]') as HTMLElement;
    expect(v.hidden).toBe(false);
    // Only the top Nó persists: pushing a non-Nó item writes nothing, going back rewrites the Nó.
    expect(escritas).toEqual([['a1', 'push']]);
    modal.voltar();
    expect(modal.pilha().map((i) => i.id)).toEqual(['a1']);
    expect(v.hidden).toBe(true);
    expect(escritas.at(-1)).toEqual(['a1', 'replace']);
    modal.destruir();
  });
});

describe('showModal nativo', () => {
  it('uses showModal and close when the dialog implements them', async () => {
    const chamadas: string[] = [];
    const proto = window.HTMLDialogElement?.prototype ?? (window as unknown as { HTMLUnknownElement: { prototype: object } }).HTMLUnknownElement.prototype;
    const p = proto as unknown as { showModal?: () => void; close?: () => void };
    p.showModal = function (this: HTMLElement) {
      chamadas.push('showModal');
      this.setAttribute('open', '');
    };
    p.close = function (this: HTMLElement) {
      chamadas.push('close');
      this.removeAttribute('open');
    };
    try {
      await montar();
      abrirNo('a1');
      tecla(dialogo(), 'Escape');
      expect(chamadas).toEqual(['showModal', 'close']);
    } finally {
      delete p.showModal;
      delete p.close;
    }
  });
});
