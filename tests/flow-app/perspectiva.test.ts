// SPDX-License-Identifier: MIT
// @vitest-environment jsdom
// Seletor de Perspectiva (Requirements 19.1, 19.3, 19.4, 19.5): lists the registry, precedence URL > localStorage > default,
// the choice keeps View / Conjunto_Expandido / Subtarefas / Nó, and a blocked localStorage never breaks the page.
// A second Perspectiva stand-in (`alt`) stands for the 3D one, which is a later spec.
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import type { ModeloDeGrafo } from '../../lib/schema/grafo';
import { criarControlador, type ControladorDaIlha } from '../../site/src/flow-app/island';
import { CHAVE_PERSPECTIVA } from '../../site/src/flow-app/perspectiva';
import { PERSPECTIVAS, type Renderizador } from '../../site/src/flow-app/renderer';
import { PERSPECTIVAS_CONHECIDAS } from '../../site/src/flow-app/state';

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
const conhecidas = [...PERSPECTIVAS_CONHECIDAS];
let montagens: string[];
let ultimos: Record<string, unknown>;
let controlador: ControladorDaIlha;

const standIn = (id: string): Renderizador => ({
  perspectiva: id,
  async montar(container, _g, estado) {
    montagens.push(id);
    ultimos[id] = estado;
    container.innerHTML = `<svg data-persp="${id}" width="400" viewBox="0 0 400 200"></svg>`;
    return {
      async atualizar(e) {
        ultimos[id] = e;
      },
      focarNo() {},
      destruir() {},
    };
  },
});

const tick = async (): Promise<void> => {
  for (let i = 0; i < 5; i++) await new Promise((r) => setTimeout(r, 0));
};
const seletor = (): HTMLSelectElement => document.querySelector('[data-flow-persp-select]') as HTMLSelectElement;
const escolher = async (id: string): Promise<void> => {
  seletor().value = id;
  seletor().dispatchEvent(new Event('change', { bubbles: true }));
  await tick();
};
const montar = async (hash = ''): Promise<void> => {
  window.history.replaceState(null, '', `/pt-BR/flows/d/${hash}`);
  document.body.innerHTML =
    '<main><article><div data-island="flow" data-flow-id="d" data-flow-base="" data-flow-locale="">' +
    '<div data-flow-controls hidden><div class="flow-toolbar"><select data-flow-select></select></div>' +
    '<div data-flow-tabs role="tablist"><button role="tab" id="t0" data-view="geral"></button><button role="tab" id="t1" data-view="raia:a"></button><button role="tab" id="t2" data-view="completo"></button></div>' +
    '<div id="flow-panel" role="tabpanel" data-flow-stage></div></div></div></article></main>';
  controlador = criarControlador({ carregarGrafo: async () => grafo, buscarPagina: async () => '', navegar: () => {} }, window);
  await controlador.montar(document.querySelector('[data-island="flow"]') as HTMLElement);
};

beforeEach(() => {
  montagens = [];
  ultimos = {};
  window.localStorage.clear();
  PERSPECTIVAS.mermaid = standIn('mermaid');
  PERSPECTIVAS.alt = standIn('alt');
  (PERSPECTIVAS_CONHECIDAS as string[]).push('alt');
});

afterEach(() => {
  controlador.destruir();
  PERSPECTIVAS.mermaid = original;
  delete PERSPECTIVAS.alt;
  (PERSPECTIVAS_CONHECIDAS as string[]).splice(0, PERSPECTIVAS_CONHECIDAS.length, ...conhecidas);
});

describe('seletor de Perspectiva', () => {
  it('lists every registered Perspectiva, has an associated label and starts on mermaid', async () => {
    await montar();
    expect([...seletor().options].map((o) => o.value)).toEqual(['mermaid', 'alt']);
    expect(seletor().value).toBe('mermaid');
    const rotulo = document.querySelector(`label[for="${seletor().id}"]`);
    expect(rotulo?.textContent).toBe('flow.persp.label');
    expect(montagens).toEqual(['mermaid']);
    expect(window.location.hash).toBe('');
  });

  it('stays visible with a single registered Perspectiva', async () => {
    delete PERSPECTIVAS.alt;
    await montar();
    expect(seletor().options).toHaveLength(1);
    expect(seletor().closest('[hidden]')).toBeNull();
    expect(seletor().disabled).toBe(false);
  });

  it('choosing keeps View, Conjunto_Expandido, Subtarefas and Nó, writes the fragment and localStorage', async () => {
    await montar('#no=b1&exp=a,b&sub=1');
    expect(montagens).toEqual(['mermaid']);
    await escolher('alt');
    expect(montagens).toEqual(['mermaid', 'alt']);
    const estado = ultimos.alt as { view: string; expandidas: { raias: Set<string> }; subtarefas: boolean; noSelecionado: string };
    expect(estado.view).toBe('geral');
    expect([...estado.expandidas.raias].sort()).toEqual(['a', 'b']);
    expect(estado.subtarefas).toBe(true);
    expect(estado.noSelecionado).toBe('b1');
    expect(window.location.hash).toContain('persp=alt');
    expect(window.location.hash).toContain('no=b1');
    expect(window.location.hash).toContain('sub=1');
    expect(window.localStorage.getItem(CHAVE_PERSPECTIVA)).toBe('alt');
    expect(document.querySelector('[data-flow-stage] svg')?.getAttribute('data-persp')).toBe('alt');
  });

  it('Back returns to the previous Perspectiva', async () => {
    await montar();
    await escolher('alt');
    window.history.back();
    await new Promise((r) => setTimeout(r, 50));
    expect(montagens.at(-1)).toBe('mermaid');
    expect(seletor().value).toBe('mermaid');
  });

  it('is operable by keyboard: native select reachable by Tab and changed by value', async () => {
    await montar();
    seletor().focus();
    expect(document.activeElement).toBe(seletor());
    expect(seletor().tabIndex).toBe(0);
  });
});

describe('precedência da escolha', () => {
  it('uses the stored Perspectiva when the fragment has none', async () => {
    window.localStorage.setItem(CHAVE_PERSPECTIVA, 'alt');
    await montar();
    expect(montagens).toEqual(['alt']);
    expect(seletor().value).toBe('alt');
  });

  it('the fragment wins over the stored choice', async () => {
    window.localStorage.setItem(CHAVE_PERSPECTIVA, 'alt');
    await montar('#persp=mermaid');
    expect(montagens).toEqual(['mermaid']);
  });

  it('an unknown Perspectiva in the fragment falls to the default, without error', async () => {
    window.localStorage.setItem(CHAVE_PERSPECTIVA, 'alt');
    await montar('#persp=nao-existe&exp=a');
    expect(montagens).toEqual(['mermaid']);
    expect(seletor().value).toBe('mermaid');
    expect(window.location.hash).toBe('#exp=a');
  });

  it('ignores a stored value that is no longer registered', async () => {
    window.localStorage.setItem(CHAVE_PERSPECTIVA, 'removida');
    await montar();
    expect(montagens).toEqual(['mermaid']);
  });
});

describe('localStorage indisponível (modo privado)', () => {
  const descritor = Object.getOwnPropertyDescriptor(window, 'localStorage');
  const bloquear = (): void => {
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      get() {
        throw new DOMException('blocked', 'SecurityError');
      },
    });
  };
  afterEach(() => {
    if (descritor) Object.defineProperty(window, 'localStorage', descritor);
  });

  it('opens on the default and still switches through the fragment', async () => {
    bloquear();
    await montar();
    expect(montagens).toEqual(['mermaid']);
    await escolher('alt');
    expect(window.location.hash).toContain('persp=alt');
    expect(montagens).toEqual(['mermaid', 'alt']);
  });

  it('setItem that throws (quota) does not break the choice', async () => {
    await montar();
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = () => {
      throw new DOMException('full', 'QuotaExceededError');
    };
    try {
      await escolher('alt');
    } finally {
      Storage.prototype.setItem = original;
    }
    expect(montagens).toEqual(['mermaid', 'alt']);
    expect(window.location.hash).toContain('persp=alt');
  });
});
