// SPDX-License-Identifier: MIT
// @vitest-environment jsdom
// Interaction of the Diagrama (Requirements 3.2 to 3.11): click up to 3 px, drag, arrows, Ctrl/Cmd + wheel, zoom buttons, help text, Enter/Space.
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { EVENTO_ABRIR_NO, EVENTO_ABRIR_RAIA, EVENTO_EXPANDIR_RAIA, ZOOM_MAX, montarInteracao, type InteracaoMontada } from '../../site/src/flow-app/interaction';

const t = (c: string) => c;
let palco: HTMLElement;
let abertos: string[];
let montada: InteracaoMontada;

const ptr = (tipo: string, alvo: Element, x: number, y: number, extra: MouseEventInit = {}) => {
  const ev = new MouseEvent(tipo, { bubbles: true, cancelable: true, clientX: x, clientY: y, button: 0, ...extra });
  Object.defineProperty(ev, 'pointerId', { value: 1 });
  alvo.dispatchEvent(ev);
  return ev;
};

beforeEach(() => {
  document.body.innerHTML = '<div id="flow-panel" class="flow-stage" tabindex="0"><svg width="400" viewBox="0 0 400 200"><g data-id="a" role="button" tabindex="0"><text>A</text></g><g data-id="b" role="button" tabindex="0"></g></svg></div>';
  palco = document.getElementById('flow-panel') as HTMLElement;
  abertos = [];
  palco.addEventListener(EVENTO_ABRIR_NO, (e) => abertos.push((e as CustomEvent<{ id: string }>).detail.id));
  montada = montarInteracao(palco, { t });
});
afterEach(() => montada.destruir());

describe('clique e arraste', () => {
  it('opens the Nó when the pointer moves up to 3 px', () => {
    const no = palco.querySelector('[data-id="a"] text') as Element;
    ptr('pointerdown', no, 10, 10);
    ptr('pointermove', no, 13, 10);
    ptr('pointerup', no, 13, 10);
    expect(abertos).toEqual(['a']);
  });
  it('drags beyond 3 px: pans, shows grabbing and does not open', () => {
    const no = palco.querySelector('[data-id="a"]') as Element;
    palco.scrollLeft = 100;
    ptr('pointerdown', no, 50, 50);
    ptr('pointermove', no, 54, 50);
    expect(palco.style.cursor).toBe('grabbing');
    expect(palco.scrollLeft).toBe(96);
    ptr('pointerup', no, 54, 50);
    expect(abertos).toEqual([]);
    expect(palco.style.cursor).toBe('');
  });
  it('does not open when the press is not on a Nó', () => {
    ptr('pointerdown', palco, 1, 1);
    ptr('pointerup', palco, 1, 1);
    expect(abertos).toEqual([]);
  });
});

describe('teclado', () => {
  it('opens the focused Nó with Enter and Space', () => {
    const no = palco.querySelector('[data-id="b"]') as Element;
    no.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    const espaco = new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true });
    no.dispatchEvent(espaco);
    expect(abertos).toEqual(['b', 'b']);
    expect(espaco.defaultPrevented).toBe(true);
  });
  it('scrolls the focused area with the arrows', () => {
    palco.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true }));
    palco.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }));
    expect(palco.scrollLeft).toBe(60);
    expect(palco.scrollTop).toBe(60);
  });
});

describe('zoom', () => {
  const roda = (extra: WheelEventInit) => {
    const ev = new WheelEvent('wheel', { bubbles: true, cancelable: true, deltaY: -100, ...extra });
    palco.dispatchEvent(ev);
    return ev;
  };
  it('zooms with Ctrl or Cmd and leaves a plain wheel alone', () => {
    expect(roda({}).defaultPrevented).toBe(false);
    expect(montada.zoom()).toBe(1);
    expect(roda({ ctrlKey: true }).defaultPrevented).toBe(true);
    expect(montada.zoom()).toBeGreaterThan(1);
    montada.definirZoom(1);
    roda({ metaKey: true, deltaY: 100 });
    expect(montada.zoom()).toBeLessThan(1);
    montada.definirZoom(99);
    expect(montada.zoom()).toBe(ZOOM_MAX);
  });
  it('has labelled +, - and reset buttons and keeps data-id after zooming', () => {
    const botoes = [...document.querySelectorAll<HTMLButtonElement>('[data-flow-zoom]')];
    expect(botoes.map((b) => b.getAttribute('aria-label'))).toEqual(['flow.zoom.out', 'flow.zoom.reset', 'flow.zoom.in']);
    botoes[2]?.click();
    expect(montada.zoom()).toBeCloseTo(1.2);
    expect(palco.querySelectorAll('[data-id]')).toHaveLength(2);
    botoes[1]?.click();
    expect(montada.zoom()).toBe(1);
  });
  it('re-applies the zoom to a redrawn svg', async () => {
    montada.definirZoom(2);
    palco.replaceChildren(Object.assign(document.createElementNS('http://www.w3.org/2000/svg', 'svg'), {}));
    const novo = palco.querySelector('svg') as SVGSVGElement;
    novo.setAttribute('width', '300');
    palco.replaceChildren(novo.cloneNode(true));
    await Promise.resolve();
    expect((palco.querySelector('svg') as SVGSVGElement).style.width).toBe('600px');
  });
});

describe('ajuda', () => {
  it('describes the gestures through aria-describedby', () => {
    const id = palco.getAttribute('aria-describedby') as string;
    expect(document.getElementById(id)?.textContent).toBe('flow.gestures.help');
  });
  it('removes what it added on destroy', () => {
    montada.destruir();
    expect(document.querySelector('[data-flow-zoom]')).toBeNull();
    expect(palco.hasAttribute('aria-describedby')).toBe(false);
  });
});

describe('Cluster_de_Raia recolhido e rótulo de raia expandida (Requirements 20.3, 20.11, 4.3)', () => {
  let expandidas: string[];
  let abertas: string[];
  beforeEach(() => {
    palco.querySelector('svg')?.insertAdjacentHTML(
      'beforeend',
      '<g data-id="cluster:r2" role="button" tabindex="0"><text>R2</text></g><g class="cluster" data-id="r1" role="group"><g class="cluster-label"><text>R1</text></g></g>',
    );
    expandidas = [];
    abertas = [];
    palco.addEventListener(EVENTO_EXPANDIR_RAIA, (e) => expandidas.push((e as CustomEvent<{ raia: string }>).detail.raia));
    palco.addEventListener(EVENTO_ABRIR_RAIA, (e) => abertas.push((e as CustomEvent<{ raia: string }>).detail.raia));
  });
  it('click expands the lane and never opens it as a Nó', () => {
    const alvo = palco.querySelector('[data-id="cluster:r2"] text') as Element;
    ptr('pointerdown', alvo, 5, 5);
    ptr('pointerup', alvo, 5, 5);
    expect(expandidas).toEqual(['r2']);
    expect(abertos).toEqual([]);
  });
  it('Enter on the focused cluster expands the lane; Nó event is not emitted', () => {
    palco.querySelector('[data-id="cluster:r2"]')?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
    expect(expandidas).toEqual(['r2']);
    expect(abertos).toEqual([]);
  });
  it('clicking the label of an expanded lane asks to open its View', () => {
    const alvo = palco.querySelector('.cluster-label text') as Element;
    ptr('pointerdown', alvo, 5, 5);
    ptr('pointerup', alvo, 5, 5);
    expect(abertas).toEqual(['r1']);
  });
});
