// SPDX-License-Identifier: MIT
// @vitest-environment jsdom
// Expansão no lugar da Visão geral (Requirements 4.3, 20.3, 20.4, 20.6, 20.8, 20.11): the island expands one lane on a cluster event,
// writes `exp=` to the URL, keeps zoom and scroll, and the "Raias" bar offers the keyboard path (expand/collapse, Abrir raia, all).
// The Perspectiva is a stand-in that records the states it is asked to draw (Mermaid is covered in renderer.test.ts and in Playwright).
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import type { ModeloDeGrafo } from '../../lib/schema/grafo';
import { criarControlador, type ControladorDaIlha } from '../../site/src/flow-app/island';
import { EVENTO_ABRIR_RAIA, EVENTO_EXPANDIR_RAIA } from '../../site/src/flow-app/interaction';
import { PERSPECTIVAS, type EstadoDiagrama, type Renderizador } from '../../site/src/flow-app/renderer';

const no = (id: string, raia: string) => ({ id, tipo: 'tarefa', rotulo: id, raia, ordem: 0, subtarefas: [], temPlaybook: false });
const grafo = {
  versaoContrato: 1,
  demanda: 'd',
  nomeDemanda: 'D',
  raias: ['a', 'b', 'c'].map((id, ordem) => ({ id, nome: `Raia ${id}`, cor: '#336699', ordem, orquestradora: ordem === 0 })),
  nos: [no('a1', 'a'), no('b1', 'b'), no('c1', 'c')],
  arestas: [],
} as unknown as ModeloDeGrafo;

const original = PERSPECTIVAS.mermaid as Renderizador;
let estados: EstadoDiagrama[];
let controlador: ControladorDaIlha;

const tick = async (): Promise<void> => {
  for (let i = 0; i < 5; i++) await new Promise((r) => setTimeout(r, 0));
};
const palco = (): HTMLElement => document.querySelector('[data-flow-stage]') as HTMLElement;
const emitir = (tipo: string, raia: string): boolean => palco().dispatchEvent(new CustomEvent(tipo, { detail: { raia }, bubbles: true }));
const clicar = async (seletor: string): Promise<void> => {
  (document.querySelector(seletor) as HTMLElement).click();
  await tick();
};
const hash = (): string => window.location.hash;
const expandidas = (): string[] => [...(estados.at(-1)?.expandidas.raias ?? [])].sort();

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
          container.scrollTop = 0; // a real redraw can reset the scroll
        },
        focarNo(id) {
          container.dataset.focado = id;
        },
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

describe('Cluster_de_Raia: expandir no lugar', () => {
  it('opens in the Visão geral with nothing expanded and `completo` never opens by itself', () => {
    expect(estados[0]?.view).toBe('geral');
    expect(expandidas()).toEqual([]);
    expect(hash()).toBe('');
  });

  it('expands only the clicked lane, writes exp= and keeps zoom and scroll', async () => {
    await clicar('[data-flow-zoom="mais"]');
    const zoom = (document.querySelector('[data-flow-zoom="reset"]') as HTMLElement).textContent;
    expect(zoom).toBe('120%');
    palco().scrollTop = 120;
    palco().scrollLeft = 40;
    const antes = estados.length;
    emitir(EVENTO_EXPANDIR_RAIA, 'b');
    await tick();
    expect(estados.length).toBe(antes + 1);
    expect(estados.at(-1)?.view).toBe('geral');
    expect(expandidas()).toEqual(['b']);
    expect(hash()).toBe('#exp=b');
    expect(palco().scrollTop).toBe(120);
    expect(palco().scrollLeft).toBe(40);
    expect((document.querySelector('[data-flow-zoom="reset"]') as HTMLElement).textContent).toBe(zoom);
    expect(palco().querySelector('svg')?.style.width).toBe('480px');
    expect(palco().dataset.focado).toBe('b'); // focus lands on the expanded lane
    // Expanding a lane that is already open changes nothing.
    emitir(EVENTO_EXPANDIR_RAIA, 'b');
    await tick();
    expect(estados.length).toBe(antes + 1);
    // The second lane joins the set; the URL key does not depend on the order.
    emitir(EVENTO_EXPANDIR_RAIA, 'a');
    await tick();
    expect(hash()).toBe('#exp=a,b');
  });

  it('Recolher goes back to the cluster, and Back restores the previous set', async () => {
    emitir(EVENTO_EXPANDIR_RAIA, 'b');
    await tick();
    await clicar('[data-flow-raia-alternar="b"]');
    expect(expandidas()).toEqual([]);
    expect(hash()).toBe('');
    window.history.back();
    await new Promise((r) => setTimeout(r, 50));
    expect(hash()).toBe('#exp=b');
    expect(expandidas()).toEqual(['b']);
  });

  it('the label click event of an expanded lane activates the View raia:<id>', async () => {
    emitir(EVENTO_EXPANDIR_RAIA, 'a');
    await tick();
    emitir(EVENTO_ABRIR_RAIA, 'a');
    await tick();
    expect(estados.at(-1)?.view).toBe('raia:a');
    expect(hash()).toBe('#view=raia:a');
  });
});

describe('barra Raias (teclado)', () => {
  it('lists the lanes with aria-expanded and offers Expandir/Recolher and Abrir raia per lane', async () => {
    const barra = document.querySelector('[data-flow-raias]') as HTMLElement;
    expect(barra.getAttribute('role')).toBe('group');
    const alternar = (id: string) => document.querySelector(`[data-flow-raia-alternar="${id}"]`) as HTMLElement;
    expect(alternar('b').getAttribute('aria-expanded')).toBe('false');
    expect(alternar('b').textContent).toBe('flow.raias.expandir');
    await clicar('[data-flow-raia-alternar="b"]');
    expect(alternar('b').getAttribute('aria-expanded')).toBe('true');
    expect(alternar('b').textContent).toBe('flow.raias.recolher');
    expect(alternar('a').getAttribute('aria-expanded')).toBe('false');
    expect(hash()).toBe('#exp=b');
    expect(barra.querySelector('summary')?.textContent).toBe('flow.raias.resumo');
    await clicar('[data-flow-raia-abrir="c"]');
    expect(estados.at(-1)?.view).toBe('raia:c');
    expect(barra.hidden).toBe(true); // a lane View has no clusters
  });

  it('Expandir tudo opens `completo` and Recolher tudo returns to the Visão geral', async () => {
    await clicar('[data-flow-raias-tudo="expandir"]');
    expect(estados.at(-1)?.view).toBe('completo');
    expect(expandidas()).toEqual(['a', 'b', 'c']);
    expect(hash()).toBe('#view=completo');
    expect((document.querySelector('[data-flow-raias-tudo="expandir"]') as HTMLButtonElement).disabled).toBe(true);
    await clicar('[data-flow-raias-tudo="recolher"]');
    expect(estados.at(-1)?.view).toBe('geral');
    expect(expandidas()).toEqual([]);
    expect(hash()).toBe('');
    expect((document.querySelector('[data-flow-raias-tudo="recolher"]') as HTMLButtonElement).disabled).toBe(true);
  });

  it('collapsing one lane of `completo` leaves the others expanded in the Visão geral', async () => {
    await clicar('[data-flow-raias-tudo="expandir"]');
    await clicar('[data-flow-raia-alternar="c"]');
    expect(estados.at(-1)?.view).toBe('geral');
    expect(expandidas()).toEqual(['a', 'b']);
    expect(hash()).toBe('#exp=a,b');
  });

  it('expanding every lane one by one normalizes to `completo`', async () => {
    for (const id of ['a', 'b', 'c']) await clicar(`[data-flow-raia-alternar="${id}"]`);
    expect(hash()).toBe('#view=completo');
    expect(estados.at(-1)?.view).toBe('completo');
  });
});
