// SPDX-License-Identifier: MIT
// @vitest-environment jsdom
// Subtarefas na ilha (Requirements 5.1, 5.2, 5.3, 5.6, 5.8, 20.5): the "Subtarefas" toggle, the per-task expansion and the rule that
// hides the bar when the View shows no task with Subtarefas. The Perspectiva is a stand-in that records the states it is asked to draw.
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import type { ModeloDeGrafo } from '../../lib/schema/grafo';
import { criarControlador, type ControladorDaIlha } from '../../site/src/flow-app/island';
import { PERSPECTIVAS, type EstadoDiagrama, type Renderizador } from '../../site/src/flow-app/renderer';
import { contagemDeSubtarefas, tarefasComSubtarefas } from '../../site/src/flow-app/subtarefas';
import { estadoVazio } from '../../site/src/flow-app/state';

const sub = (id: string, quando?: string) => ({ id, rotulo: id, quando });
const no = (id: string, raia: string, subtarefas: unknown[] = []) => ({ id, tipo: 'tarefa', rotulo: `Tarefa ${id}`, raia, ordem: 0, subtarefas, temPlaybook: false });
const grafo = {
  versaoContrato: 1,
  demanda: 'd',
  nomeDemanda: 'D',
  raias: ['a', 'b', 'c'].map((id, ordem) => ({ id, nome: `Raia ${id}`, cor: '#336699', ordem, orquestradora: ordem === 0 })),
  nos: [no('a1', 'a', [sub('a1.1'), sub('a1.2', 'se houver')]), no('a2', 'a', [sub('a2.1')]), no('b1', 'b'), no('c1', 'c', [sub('c1.1')])],
  arestas: [],
} as unknown as ModeloDeGrafo;

const I18N = JSON.stringify({
  'flow.sub.expandir.rotulo': 'Expandir {nome} ({contagem})',
  'flow.sub.contagem': '{n} subtarefas',
  'flow.sub.contagem.um': '1 subtarefa',
});
const original = PERSPECTIVAS.mermaid as Renderizador;
let estados: EstadoDiagrama[];
let controlador: ControladorDaIlha;

const tick = async (): Promise<void> => {
  for (let i = 0; i < 5; i++) await new Promise((r) => setTimeout(r, 0));
};
const palco = (): HTMLElement => document.querySelector('[data-flow-stage]') as HTMLElement;
const barra = (): HTMLElement => document.querySelector('[data-flow-subtarefas]') as HTMLElement;
const alternador = (): HTMLButtonElement => document.querySelector('[data-flow-subtarefas-alternar]') as HTMLButtonElement;
const tarefa = (id: string): HTMLButtonElement => document.querySelector(`[data-flow-subtarefas-tarefa="${id}"]`) as HTMLButtonElement;
const clicar = async (seletor: string | HTMLElement): Promise<void> => {
  (typeof seletor === 'string' ? (document.querySelector(seletor) as HTMLElement) : seletor).click();
  await tick();
};
const hash = (): string => window.location.hash;
const ultimo = (): EstadoDiagrama => estados.at(-1) as EstadoDiagrama;

async function montar(url: string): Promise<void> {
  window.history.replaceState(null, '', url);
  controlador = criarControlador({ carregarGrafo: async () => grafo, buscarPagina: async () => '', navegar: () => {} }, window);
  await controlador.montar(document.querySelector('[data-island="flow"]') as HTMLElement);
}

beforeEach(() => {
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
        },
        focarNo() {},
        destruir() {},
      };
    },
  };
  document.body.innerHTML =
    '<main><article><div data-island="flow" data-flow-id="d" data-flow-base="" data-flow-locale="" data-flow-i18n=\'' + I18N + '\'>' +
    '<div data-flow-controls hidden><select data-flow-select></select>' +
    '<div data-flow-tabs role="tablist"><button role="tab" id="t0" data-view="geral"></button><button role="tab" id="t1" data-view="raia:a"></button><button role="tab" id="t2" data-view="completo"></button></div>' +
    '<div id="flow-panel" role="tabpanel" data-flow-stage></div></div></div></article></main>';
});

afterEach(() => {
  controlador?.destruir();
  PERSPECTIVAS.mermaid = original;
});

describe('contagem e tarefas visíveis', () => {
  const t = (k: string, v?: Record<string, string | number>) => `${k}:${v?.n ?? ''}`;
  it('says the real N', () => {
    expect(contagemDeSubtarefas(t, 1)).toBe('flow.sub.contagem.um:');
    expect(contagemDeSubtarefas(t, 7)).toBe('flow.sub.contagem:7');
  });
  it('lists only tasks with Subtarefas that the View draws as nodes', () => {
    const ids = (e: Parameters<typeof tarefasComSubtarefas>[1]) => tarefasComSubtarefas(grafo, e).map((n) => n.id);
    expect(ids(estadoVazio())).toEqual([]);
    expect(ids({ exp: { raias: new Set(['a', 'b']), subtarefas: new Set(), todasSubtarefas: false } })).toEqual(['a1', 'a2']);
    expect(ids({ view: 'raia:c', exp: estadoVazio().exp })).toEqual(['c1']);
    expect(ids({ view: 'completo', exp: estadoVazio().exp })).toEqual(['a1', 'a2', 'c1']);
  });
});

describe('alternador Subtarefas', () => {
  beforeEach(async () => montar('/pt-BR/flows/d/'));

  it('stays hidden in the Visão geral (only clusters) and in a View without Subtarefas', async () => {
    expect(barra().hidden).toBe(true);
    await clicar('[data-flow-raia-alternar="b"]'); // lane b has a task without Subtarefas
    expect(barra().hidden).toBe(true);
    await clicar('[data-flow-raia-alternar="a"]');
    expect(barra().hidden).toBe(false);
  });

  it('turns every Subtarefa on and off, writes sub=1 and keeps the View and the expansion', async () => {
    await clicar('[data-flow-raia-alternar="a"]');
    expect(alternador().getAttribute('aria-pressed')).toBe('false');
    expect(ultimo().subtarefas).toBe(false);
    await clicar(alternador());
    expect(ultimo().subtarefas).toBe(true);
    expect(ultimo().view).toBe('geral');
    expect([...ultimo().expandidas.raias]).toEqual(['a']);
    expect(hash()).toBe('#exp=a&sub=1');
    expect(alternador().getAttribute('aria-pressed')).toBe('true');
    await clicar(alternador());
    expect(ultimo().subtarefas).toBe(false);
    expect(hash()).toBe('#exp=a');
    expect(alternador().getAttribute('aria-pressed')).toBe('false');
  });

  it('keeps zoom and scroll', async () => {
    await clicar('[data-flow-raia-alternar="a"]');
    await clicar('[data-flow-zoom="mais"]');
    palco().scrollTop = 90;
    palco().scrollLeft = 30;
    await clicar(alternador());
    expect(palco().scrollTop).toBe(90);
    expect(palco().scrollLeft).toBe(30);
    expect(palco().querySelector('svg')?.style.width).toBe('480px');
  });

  it('in `completo` it never draws by itself and only the click asks for the drawing with Subtarefas', async () => {
    await clicar('[data-flow-raias-tudo="expandir"]');
    const antes = estados.length;
    expect(ultimo().subtarefas).toBe(false);
    expect(document.querySelector('#flow-subtarefas-aviso')?.hasAttribute('hidden')).toBe(false); // the time warning
    expect(alternador().getAttribute('aria-describedby')).toBe('flow-subtarefas-aviso');
    await tick();
    expect(estados.length).toBe(antes);
    await clicar(alternador());
    expect(estados.length).toBe(antes + 1);
    expect(ultimo().view).toBe('completo');
    expect(ultimo().subtarefas).toBe(true);
    expect(hash()).toBe('#view=completo&sub=1');
  });

  it('is shown in a lane View that has Subtarefas and hidden in one that has none', async () => {
    await clicar('[data-flow-tabs] [data-view="raia:a"]');
    expect(barra().hidden).toBe(false);
    await clicar(alternador());
    expect(ultimo().view).toBe('raia:a');
    expect(ultimo().subtarefas).toBe(true);
    expect(hash()).toBe('#view=raia:a&sub=1');
    expect(document.querySelector('[data-flow-subtarefas] details')?.hasAttribute('hidden')).toBe(true); // no per-task list in a lane View
  });

  it('Back undoes the toggle', async () => {
    await clicar('[data-flow-raia-alternar="a"]');
    await clicar(alternador());
    window.history.back();
    await new Promise((r) => setTimeout(r, 50));
    expect(hash()).toBe('#exp=a');
    expect(alternador().getAttribute('aria-pressed')).toBe('false');
  });
});

describe('expansão por tarefa', () => {
  beforeEach(async () => montar('/pt-BR/flows/d/#exp=a'));

  it('lists the tasks of the expanded lanes that have Subtarefas, with the real N in the accessible name', () => {
    expect(['a1', 'a2'].map((id) => tarefa(id).getAttribute('aria-expanded'))).toEqual(['false', 'false']);
    expect(tarefa('a1').getAttribute('aria-label')).toBe('Expandir Tarefa a1 (2 subtarefas)');
    expect(tarefa('a2').getAttribute('aria-label')).toBe('Expandir Tarefa a2 (1 subtarefa)');
    expect(tarefa('c1')).toBeNull();
  });

  it('expands only that task, writes s=<tarefa> and leaves the other state alone', async () => {
    await clicar(tarefa('a2'));
    expect([...ultimo().expandidas.subtarefas]).toEqual(['a2']);
    expect(ultimo().subtarefas).toBe(false);
    expect(hash()).toBe('#exp=r=a;s=a2');
    expect(tarefa('a2').getAttribute('aria-expanded')).toBe('true');
    expect(tarefa('a1').getAttribute('aria-expanded')).toBe('false');
    await clicar(tarefa('a2'));
    expect(hash()).toBe('#exp=a');
  });

  it('the global toggle takes over every task and turning it off clears the per-task set', async () => {
    await clicar(tarefa('a1'));
    await clicar(alternador());
    expect(hash()).toBe('#exp=a&sub=1');
    expect(tarefa('a1').disabled).toBe(true);
    expect(tarefa('a2').getAttribute('aria-expanded')).toBe('true');
    await clicar(alternador());
    expect(hash()).toBe('#exp=a');
    expect([...ultimo().expandidas.subtarefas]).toEqual([]);
  });

  it('the URL reproduces the state', async () => {
    controlador.destruir();
    document.querySelector('[data-flow-subtarefas]')?.remove();
    await montar('/pt-BR/flows/d/#exp=r=a;s=a1&sub=0');
    expect(tarefa('a1').getAttribute('aria-expanded')).toBe('true');
    expect(hash()).toBe('#exp=r=a;s=a1');
  });
});
