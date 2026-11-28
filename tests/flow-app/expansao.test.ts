// SPDX-License-Identifier: MIT
// @vitest-environment jsdom
// Redraw queue, SVG cache and progress indicator of the Diagrama (Requirements 20.9, 20.10, 15.8). `mermaid.render` is a
// controllable fake: each call returns a promise the test resolves or rejects by hand.
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { ModeloDeGrafo } from '../../lib/schema/grafo';
import {
  CacheDeSvg,
  cederQuadroPadrao,
  chaveDoEstado,
  criarExpansao,
  INDICADOR_ATE_MS,
  type PedidoDeRender,
  type Traduzir,
} from '../../site/src/flow-app/expansao';
import { MermaidLimiteError } from '../../site/src/flow-app/mermaid-loader';
import type { EstadoDiagrama } from '../../site/src/flow-app/renderer';
import en from '../../site/src/i18n/en.json';
import pt from '../../site/src/i18n/pt-BR.json';

const t: Traduzir = (k, v) => `${k}${v ? JSON.stringify(v) : ''}`;

function adiado<T>() {
  let ok!: (v: T) => void;
  let ko!: (e: unknown) => void;
  const promessa = new Promise<T>((a, b) => {
    ok = a;
    ko = b;
  });
  return { promessa, ok, ko };
}
const tick = () => new Promise<void>((r) => setTimeout(r, 0));

/** A request whose `renderizar` is a spy returning a promise the test settles. */
function pedido(chave: string, extra: Partial<PedidoDeRender> = {}) {
  const render = adiado<string>();
  const renderizar = vi.fn(() => render.promessa);
  const aplicar = vi.fn();
  return { render, renderizar, aplicar, pedido: { chave, renderizar, aplicar, ...extra } satisfies PedidoDeRender };
}

function montar(opcoes: { cache?: CacheDeSvg; alternativa?: () => void } = {}) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const exp = criarExpansao({
    container,
    t,
    cache: opcoes.cache,
    mostrarAlternativaTextual: opcoes.alternativa,
    cederQuadro: () => Promise.resolve(),
  });
  return { container, exp };
}

afterEach(() => {
  vi.useRealTimers();
  document.body.innerHTML = '';
});

describe('CacheDeSvg', () => {
  it('returns what was stored and misses on unknown keys', () => {
    const c = new CacheDeSvg();
    expect(c.get('a')).toBeUndefined();
    expect(c.set('a', '<svg/>')).toBe(true);
    expect(c.get('a')).toBe('<svg/>');
    expect(c.bytes).toBe(6);
  });

  it('defaults to 6 sets and 24 MiB', () => {
    const c = new CacheDeSvg();
    expect(c.maxConjuntos).toBe(6);
    expect(c.maxBytes).toBe(24 * 1024 * 1024);
  });

  it('evicts the least recently used set past the entry limit, and a get refreshes recency', () => {
    const c = new CacheDeSvg(3, 1000);
    c.set('a', '1');
    c.set('b', '2');
    c.set('c', '3');
    c.get('a'); // b is now the oldest
    c.set('d', '4');
    expect(c.has('b')).toBe(false);
    expect([c.has('a'), c.has('c'), c.has('d')]).toEqual([true, true, true]);
    expect(c.tamanho).toBe(3);
  });

  it('evicts by bytes and keeps the total within the limit', () => {
    const c = new CacheDeSvg(10, 10);
    c.set('a', 'xxxx');
    c.set('b', 'xxxx');
    c.set('c', 'xxxx'); // 12 > 10: a goes
    expect(c.has('a')).toBe(false);
    expect(c.bytes).toBe(8);
  });

  it('counts bytes, not characters', () => {
    const c = new CacheDeSvg(10, 10);
    c.set('a', 'ééé'); // 6 bytes
    expect(c.bytes).toBe(6);
  });

  it('does not store an SVG over the byte limit and drops the stale entry of that key', () => {
    const c = new CacheDeSvg(10, 5);
    c.set('a', 'xx');
    expect(c.set('a', 'xxxxxxxx')).toBe(false);
    expect(c.has('a')).toBe(false);
    expect(c.bytes).toBe(0);
  });

  it('replaces a key without double counting', () => {
    const c = new CacheDeSvg();
    c.set('a', 'xxxx');
    c.set('a', 'xx');
    expect(c.bytes).toBe(2);
    expect(c.tamanho).toBe(1);
  });
});

describe('chaveDoEstado', () => {
  const grafo = { raias: [{ id: 'a' }, { id: 'b' }] } as unknown as ModeloDeGrafo;
  const est = (view: string, raias: string[], subtarefas = false): EstadoDiagrama => ({
    view,
    expandidas: { raias: new Set(raias), subtarefas: new Set(), todasSubtarefas: false },
    subtarefas,
  });

  it('ignores the order in which lanes were expanded', () => {
    expect(chaveDoEstado(grafo, est('geral', ['a', 'b']))).toBe(chaveDoEstado(grafo, est('geral', ['b', 'a'])));
  });

  it('makes `completo` equal to every lane expanded, and separates subtasks and lane views', () => {
    expect(chaveDoEstado(grafo, est('completo', []))).toBe(chaveDoEstado(grafo, est('geral', ['a', 'b'])));
    expect(chaveDoEstado(grafo, est('completo', [], true))).not.toBe(chaveDoEstado(grafo, est('completo', [])));
    expect(chaveDoEstado(grafo, est('raia:a', []))).not.toBe(chaveDoEstado(grafo, est('raia:b', [])));
    expect(chaveDoEstado(grafo, est('raia:a', []))).not.toBe(chaveDoEstado(grafo, est('geral', ['a'])));
  });
});

describe('fila com número de sequência', () => {
  it('applies the SVG of a single request and caches it', async () => {
    const { exp } = montar();
    const p = pedido('k');
    const r = exp.pedir(p.pedido);
    await tick();
    p.render.ok('<svg>k</svg>');
    expect(await r).toMatchObject({ estado: 'aplicado' });
    expect(p.aplicar).toHaveBeenCalledWith('<svg>k</svg>');
    expect(exp.cache.get('k')).toBe('<svg>k</svg>');
  });

  it('discards the result of a request made obsolete while it rendered, but keeps it in the cache', async () => {
    const { exp } = montar();
    const a = pedido('a');
    const b = pedido('b');
    const ra = exp.pedir(a.pedido);
    await tick();
    expect(a.renderizar).toHaveBeenCalledTimes(1);
    const rb = exp.pedir(b.pedido); // a is rendering; b waits
    a.render.ok('<svg>a</svg>');
    expect(await ra).toEqual({ estado: 'obsoleto' });
    expect(a.aplicar).not.toHaveBeenCalled();
    expect(exp.cache.has('a')).toBe(true);
    await tick();
    b.render.ok('<svg>b</svg>');
    expect(await rb).toMatchObject({ estado: 'aplicado' });
    expect(b.aplicar).toHaveBeenCalledWith('<svg>b</svg>');
  });

  it('runs one render at a time and renders only the latest of several waiting requests', async () => {
    const { exp } = montar();
    const a = pedido('a');
    const b = pedido('b');
    const c = pedido('c');
    const ra = exp.pedir(a.pedido);
    await tick();
    const rb = exp.pedir(b.pedido);
    const rc = exp.pedir(c.pedido);
    expect(await rb).toEqual({ estado: 'obsoleto' });
    expect(b.renderizar).not.toHaveBeenCalled();
    expect(c.renderizar).not.toHaveBeenCalled(); // a still owns the renderer
    a.render.ok('<svg>a</svg>');
    await ra;
    await tick();
    expect(c.renderizar).toHaveBeenCalledTimes(1);
    c.render.ok('<svg>c</svg>');
    expect(await rc).toMatchObject({ estado: 'aplicado' });
    expect(a.aplicar).not.toHaveBeenCalled();
    expect(b.renderizar).not.toHaveBeenCalled();
  });

  it('serves a seen state from the cache without rendering, and that cancels a waiting request', async () => {
    const { exp } = montar();
    const a = pedido('a');
    const ra = exp.pedir(a.pedido);
    await tick();
    a.render.ok('<svg>a</svg>');
    await ra;

    const b = pedido('b');
    const rb = exp.pedir(b.pedido);
    await tick(); // b is rendering
    const a2 = pedido('a');
    const c = pedido('c');
    const rc = exp.pedir(c.pedido); // waits behind b
    const ra2 = exp.pedir(a2.pedido); // cache hit, newest request
    expect(await ra2).toMatchObject({ estado: 'cache' });
    expect(a2.renderizar).not.toHaveBeenCalled();
    expect(a2.aplicar).toHaveBeenCalledWith('<svg>a</svg>');
    expect(await rc).toEqual({ estado: 'obsoleto' });
    b.render.ok('<svg>b</svg>');
    expect(await rb).toEqual({ estado: 'obsoleto' }); // a2 owns the screen now
    expect(b.aplicar).not.toHaveBeenCalled();
    expect(c.renderizar).not.toHaveBeenCalled();
  });

  it('resolves obsolete, without error, when the superseded render fails', async () => {
    const { exp, container } = montar();
    const a = pedido('a');
    const b = pedido('b');
    const ra = exp.pedir(a.pedido);
    await tick();
    void exp.pedir(b.pedido);
    a.render.ko(new Error('boom'));
    expect(await ra).toEqual({ estado: 'obsoleto' });
    expect(container.querySelector('.flow-erro')).toBeNull();
  });

  it('reports the elapsed time only when the redraw is over its target', async () => {
    let agora = 0;
    const container = document.body.appendChild(document.createElement('div'));
    const exp = criarExpansao({ container, t, cederQuadro: () => Promise.resolve(), agora: () => agora });
    const lenta = pedido('lenta', { alvoMs: 5000 });
    const r = exp.pedir(lenta.pedido);
    await tick();
    agora = 6200;
    lenta.render.ok('<svg/>');
    await r;
    const status = container.querySelector('[role="status"]') as HTMLElement;
    expect(status.hidden).toBe(false);
    expect(status.textContent).toContain('flow.progress.elapsed{"seg":"6.2"}');

    agora = 7000;
    const rapida = pedido('rapida', { alvoMs: 5000 });
    const r2 = exp.pedir(rapida.pedido);
    await tick();
    agora = 7100;
    rapida.render.ok('<svg/>');
    await r2;
    expect(status.hidden).toBe(true);
  });
});

describe('indicador de progresso', () => {
  it('is on screen (role=status, aria-busy) before the render starts', async () => {
    const container = document.body.appendChild(document.createElement('div'));
    const quadro = adiado<void>();
    const exp = criarExpansao({ container, t, cederQuadro: () => quadro.promessa });
    const estadoNaChamada: Array<string | null> = [];
    const render = adiado<string>();
    const r = exp.pedir({
      chave: 'k',
      renderizar: () => {
        estadoNaChamada.push(container.getAttribute('aria-busy'));
        return render.promessa;
      },
      aplicar: () => {},
    });
    // The request was made but the frame has not been yielded: the indicator is already there, the render has not begun.
    const status = container.querySelector('[role="status"]') as HTMLElement;
    expect(status.hidden).toBe(false);
    expect(container.getAttribute('aria-busy')).toBe('true');
    expect(estadoNaChamada).toEqual([]);
    quadro.ok();
    await tick();
    expect(estadoNaChamada).toEqual(['true']);
    render.ok('<svg/>');
    await r;
    expect(container.hasAttribute('aria-busy')).toBe(false);
    expect(status.hidden).toBe(true);
  });

  it('says how many nodes are being drawn for a big set, and a plain message for a small one', async () => {
    const { exp, container } = montar();
    void exp.pedir(pedido('g', { nos: 480 }).pedido);
    const status = container.querySelector('[role="status"]') as HTMLElement;
    expect(status.textContent).toBe('flow.progress.drawing.nodes{"nos":480}');
    void exp.pedir(pedido('p', { nos: 12 }).pedido);
    expect(status.textContent).toBe('flow.progress.drawing');
  });

  it('shows no indicator for a cached state', async () => {
    const { exp, container } = montar();
    const a = pedido('a');
    const r = exp.pedir(a.pedido);
    await tick();
    a.render.ok('<svg/>');
    await r;
    await exp.pedir(pedido('a').pedido);
    expect(container.hasAttribute('aria-busy')).toBe(false);
    expect((container.querySelector('[role="status"]') as HTMLElement).hidden).toBe(true);
  });

  it('yields a frame in less than the 100 ms budget even when requestAnimationFrame never fires', async () => {
    vi.useFakeTimers();
    vi.stubGlobal('requestAnimationFrame', () => 0);
    let pronto = false;
    void cederQuadroPadrao().then(() => (pronto = true));
    await vi.advanceTimersByTimeAsync(INDICADOR_ATE_MS - 1);
    expect(pronto).toBe(true);
    vi.unstubAllGlobals();
  });
});

describe('falha de render', () => {
  it('keeps the previous drawing, offers "Tentar de novo" and the textual alternative, and retries', async () => {
    const alternativa = vi.fn();
    const { exp, container } = montar({ alternativa });
    const antes = pedido('antes');
    const r0 = exp.pedir(antes.pedido);
    await tick();
    antes.render.ok('<svg>antes</svg>');
    await r0;

    const falha = pedido('novo');
    const r = exp.pedir(falha.pedido);
    await tick();
    falha.render.ko(new Error('layout failed'));
    const res = await r;
    expect(res).toMatchObject({ estado: 'falhou', limite: false });
    expect(antes.aplicar).toHaveBeenCalledTimes(1);
    expect(falha.aplicar).not.toHaveBeenCalled(); // nothing replaced the previous drawing
    expect(container.hasAttribute('aria-busy')).toBe(false);

    const painel = container.querySelector('.flow-erro') as HTMLElement;
    expect(painel.getAttribute('role')).toBe('alert');
    const botoes = [...painel.querySelectorAll('button')];
    expect(botoes.map((b) => b.textContent)).toEqual(['flow.error.retry', 'flow.error.textual']);

    botoes[1]?.click();
    expect(alternativa).toHaveBeenCalledTimes(1);

    botoes[0]?.click(); // retry: same request, the render runs again
    expect(container.querySelector('.flow-erro')).toBeNull();
    await tick();
    expect(falha.renderizar).toHaveBeenCalledTimes(2);
  });

  it('applies the SVG when the retry succeeds', async () => {
    const { exp, container } = montar();
    const aplicar = vi.fn();
    let tentativa = 0;
    const p: PedidoDeRender = {
      chave: 'k',
      aplicar,
      renderizar: () => (++tentativa === 1 ? Promise.reject(new Error('x')) : Promise.resolve('<svg>ok</svg>')),
    };
    expect(await exp.pedir(p)).toMatchObject({ estado: 'falhou' });
    (container.querySelector('.flow-erro button') as HTMLButtonElement).click();
    await tick();
    await tick();
    expect(aplicar).toHaveBeenCalledWith('<svg>ok</svg>');
    expect(container.querySelector('.flow-erro')).toBeNull();
    expect(exp.cache.has('k')).toBe(true);
  });

  it('for a Mermaid limit overrun shows the limit message and the textual alternative, with no retry', async () => {
    const { exp, container } = montar({ alternativa: () => {} });
    const p = pedido('grande');
    const r = exp.pedir(p.pedido);
    await tick();
    p.render.ko(new MermaidLimiteError());
    expect(await r).toMatchObject({ estado: 'falhou', limite: true });
    const painel = container.querySelector('.flow-erro') as HTMLElement;
    expect(painel.textContent).toContain('flow.error.limit');
    expect([...painel.querySelectorAll('button')].map((b) => b.textContent)).toEqual(['flow.error.textual']);
    expect(exp.cache.has('grande')).toBe(false);
  });

  it('does not throw to the console: a failed render resolves, never rejects', async () => {
    const { exp } = montar();
    const p = pedido('x');
    const r = exp.pedir(p.pedido);
    await tick();
    p.render.ko('not even an Error');
    await expect(r).resolves.toMatchObject({ estado: 'falhou' });
  });
});

describe('textos de interface', () => {
  const chaves = ['flow.progress.drawing', 'flow.progress.drawing.nodes', 'flow.progress.elapsed', 'flow.error.render', 'flow.error.limit', 'flow.error.retry', 'flow.error.textual'];
  it('exist in both locales', () => {
    for (const k of chaves) {
      expect((pt as Record<string, string>)[k], k).toBeTruthy();
      expect((en as Record<string, string>)[k], k).toBeTruthy();
    }
  });
});
