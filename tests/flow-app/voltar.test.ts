// SPDX-License-Identifier: MIT
// @vitest-environment jsdom
// Botão "Voltar" (Requirements 4.4, 4.5) e alternador "Raias" (4.6): the stack mirrors the entries the island pushes, `history.back()`
// is the only way back (no extra entry), the scroll of the stage is restored and the toggle only exists in `completo`.
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import type { ModeloDeGrafo } from '../../lib/schema/grafo';
import { criarControlador, type ControladorDaIlha } from '../../site/src/flow-app/island';
import { EVENTO_EXPANDIR_RAIA } from '../../site/src/flow-app/interaction';
import { PERSPECTIVAS, type EstadoDiagrama, type Renderizador } from '../../site/src/flow-app/renderer';
import { lerEstado, serializarEstado } from '../../site/src/flow-app/state';
import { HistoricoDeViews } from '../../site/src/flow-app/voltar';

const no = (id: string, raia: string) => ({ id, tipo: 'tarefa', rotulo: id, raia, ordem: 0, subtarefas: [], temPlaybook: false });
const grafo = {
  versaoContrato: 1,
  demanda: 'd',
  nomeDemanda: 'D',
  raias: ['a', 'b', 'c'].map((id, ordem) => ({ id, nome: `Raia ${id}`, cor: '#336699', ordem, orquestradora: ordem === 0 })),
  nos: [no('a1', 'a'), no('b1', 'b'), no('c1', 'c')],
  arestas: [],
} as unknown as ModeloDeGrafo;

describe('HistoricoDeViews', () => {
  const zero = { esq: 0, topo: 0 };
  it('starts without history and enables after a push', () => {
    const h = new HistoricoDeViews('');
    expect(h.podeVoltar).toBe(false);
    h.empilhar('#view=completo', zero);
    expect(h.podeVoltar).toBe(true);
  });
  it('goes back to the saved scroll, forward again, and drops forward entries on a new push', () => {
    const h = new HistoricoDeViews('');
    h.empilhar('#view=completo', { esq: 5, topo: 90 });
    expect(h.sincronizar('', { esq: 1, topo: 2 })).toEqual({ esq: 5, topo: 90 });
    expect(h.podeVoltar).toBe(false);
    expect(h.sincronizar('#view=completo', { esq: 5, topo: 90 })).toEqual({ esq: 1, topo: 2 });
    h.sincronizar('', zero);
    h.empilhar('#exp=a', zero);
    expect(h.tamanho).toBe(2);
  });
  it('restarts at an unknown fragment (hash edited by hand) and disables', () => {
    const h = new HistoricoDeViews('');
    h.empilhar('#view=completo', zero);
    expect(h.sincronizar('#view=raia:a', zero)).toBeUndefined();
    expect(h.podeVoltar).toBe(false);
    expect(h.tamanho).toBe(1);
  });
});

describe('estado raias=0', () => {
  it('round-trips only in `completo`', () => {
    expect(serializarEstado(lerEstado('#view=completo&raias=0', grafo))).toBe('view=completo&raias=0');
    expect(serializarEstado(lerEstado('#raias=0', grafo))).toBe('');
    expect(serializarEstado(lerEstado('#view=raia:a&raias=0', grafo))).toBe('view=raia:a');
  });
});

const original = PERSPECTIVAS.mermaid as Renderizador;
let estados: EstadoDiagrama[];
let controlador: ControladorDaIlha;
const tick = async (ms = 0): Promise<void> => {
  for (let i = 0; i < 5; i++) await new Promise((r) => setTimeout(r, ms));
};
const palco = (): HTMLElement => document.querySelector('[data-flow-stage]') as HTMLElement;
const voltar = (): HTMLButtonElement => document.querySelector('[data-flow-voltar]') as HTMLButtonElement;
const alternador = (): HTMLButtonElement => document.querySelector('[data-flow-raias-agrupar]') as HTMLButtonElement;
const clicar = async (seletor: string): Promise<void> => {
  (document.querySelector(seletor) as HTMLElement).click();
  await tick();
};
const aba = (v: string) => `[role="tab"][data-view="${v}"]`;
const esperarVoltar = (): Promise<void> => tick(20);

beforeEach(async () => {
  window.history.replaceState(null, '', '/pt-BR/flows/d/');
  estados = [];
  PERSPECTIVAS.mermaid = {
    perspectiva: 'mermaid',
    async montar(container, _g, estado) {
      estados.push(estado);
      container.innerHTML = '<svg width="400" viewBox="0 0 400 200"></svg>';
      return {
        async atualizar(e) {
          estados.push(e);
          container.innerHTML = '<svg width="400" viewBox="0 0 400 200"></svg>';
          container.scrollTop = 0;
          container.scrollLeft = 0;
        },
        focarNo() {},
        destruir() {},
      };
    },
  };
  document.body.innerHTML =
    '<main><article><div data-island="flow" data-flow-id="d" data-flow-base="" data-flow-locale="">' +
    '<div data-flow-controls hidden><select data-flow-select></select>' +
    '<div data-flow-tabs role="tablist"><button role="tab" id="t0" data-view="geral"></button><button role="tab" id="t1" data-view="raia:a"></button><button role="tab" id="t2" data-view="completo"></button></div>' +
    '<div id="flow-panel" role="tabpanel" data-flow-stage></div></div></div></article></main>';
  controlador = criarControlador({ carregarGrafo: async () => grafo, buscarPagina: async () => '', navegar: () => {} }, window);
  await controlador.montar(document.querySelector('[data-island="flow"]') as HTMLElement);
});

afterEach(() => {
  controlador.destruir();
  PERSPECTIVAS.mermaid = original;
});

describe('botão Voltar', () => {
  it('starts disabled (disabled and aria-disabled) with no history', () => {
    expect(voltar().disabled).toBe(true);
    expect(voltar().getAttribute('aria-disabled')).toBe('true');
    expect(voltar().textContent).toBe('flow.voltar');
  });

  it('enables after an internal View change, restores the View and the scroll, and disables again', async () => {
    palco().scrollTop = 150;
    palco().scrollLeft = 30;
    const entradas = window.history.length;
    await clicar(aba('completo'));
    expect(window.location.hash).toBe('#view=completo');
    expect(voltar().disabled).toBe(false);
    expect(voltar().getAttribute('aria-disabled')).toBe('false');
    voltar().click();
    await esperarVoltar();
    expect(window.location.hash).toBe('');
    expect(estados.at(-1)?.view).toBe('geral');
    expect(palco().scrollTop).toBe(150);
    expect(palco().scrollLeft).toBe(30);
    expect(voltar().disabled).toBe(true);
    expect(window.history.length).toBe(entradas + 1); // Voltar added no entry: only the View change did
  });

  it('walks back through several Views, one step per click', async () => {
    await clicar(aba('raia:a'));
    await clicar(aba('completo'));
    voltar().click();
    await esperarVoltar();
    expect(estados.at(-1)?.view).toBe('raia:a');
    expect(voltar().disabled).toBe(false);
    voltar().click();
    await esperarVoltar();
    expect(estados.at(-1)?.view).toBe('geral');
    expect(voltar().disabled).toBe(true);
  });

  it('also follows the browser Back button (same stack, no duplicate)', async () => {
    palco().scrollTop = 77;
    await clicar(aba('completo'));
    window.history.back();
    await esperarVoltar();
    expect(voltar().disabled).toBe(true);
    expect(palco().scrollTop).toBe(77);
  });

  it('undoes an expansion too, because the browser Back button does', async () => {
    palco().dispatchEvent(new CustomEvent(EVENTO_EXPANDIR_RAIA, { detail: { raia: 'b' }, bubbles: true }));
    await tick();
    expect(voltar().disabled).toBe(false);
    voltar().click();
    await esperarVoltar();
    expect(window.location.hash).toBe('');
    expect([...(estados.at(-1)?.expandidas.raias ?? [])]).toEqual([]);
  });

  it('is disabled after opening a page that already carries a state', async () => {
    controlador.destruir();
    window.history.replaceState(null, '', '/pt-BR/flows/d/#view=completo');
    controlador = criarControlador({ carregarGrafo: async () => grafo, buscarPagina: async () => '', navegar: () => {} }, window);
    await controlador.montar(document.querySelector('[data-island="flow"]') as HTMLElement);
    expect(document.querySelectorAll('[data-flow-voltar]').length).toBe(1);
    expect(voltar().disabled).toBe(true);
  });
});

describe('alternador Raias', () => {
  it('is hidden outside `completo` and shown, pressed, in it', async () => {
    expect(alternador().hidden).toBe(true);
    await clicar(aba('completo'));
    expect(alternador().hidden).toBe(false);
    expect(alternador().getAttribute('aria-pressed')).toBe('true');
    expect(alternador().textContent).toBe('flow.raias.alternador');
    await clicar(aba('raia:a'));
    expect(alternador().hidden).toBe(true);
  });

  it('hides and shows the groupings: raias=0 in the URL, the View stays and Back is not consumed', async () => {
    await clicar(aba('completo'));
    expect(estados.at(-1)?.semRaias).toBe(false);
    palco().scrollTop = 40;
    await clicar('[data-flow-raias-agrupar]');
    expect(estados.at(-1)?.view).toBe('completo');
    expect(estados.at(-1)?.semRaias).toBe(true);
    expect(window.location.hash).toBe('#view=completo&raias=0');
    expect(alternador().getAttribute('aria-pressed')).toBe('false');
    expect(palco().scrollTop).toBe(40);
    await clicar('[data-flow-raias-agrupar]');
    expect(estados.at(-1)?.semRaias).toBe(false);
    expect(window.location.hash).toBe('#view=completo');
    // The toggle rewrote the entry: one Back goes straight to the Visão geral.
    voltar().click();
    await esperarVoltar();
    expect(estados.at(-1)?.view).toBe('geral');
  });

  it('opens `completo` without groupings from a URL with raias=0', async () => {
    controlador.destruir();
    window.history.replaceState(null, '', '/pt-BR/flows/d/#view=completo&raias=0');
    controlador = criarControlador({ carregarGrafo: async () => grafo, buscarPagina: async () => '', navegar: () => {} }, window);
    await controlador.montar(document.querySelector('[data-island="flow"]') as HTMLElement);
    expect(estados.at(-1)?.semRaias).toBe(true);
    expect(alternador().getAttribute('aria-pressed')).toBe('false');
  });
});
