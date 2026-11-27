// SPDX-License-Identifier: MIT
// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { carregarGrafo, esquecerGrafos, urlDoGrafo } from '../../site/src/flow-app/loader';
import {
  PERSPECTIVAS_CONHECIDAS,
  atualizarEstado,
  escreverEstado,
  estadoVazio,
  lerDaUrl,
  lerEstado,
  serializarEstado,
} from '../../site/src/flow-app/state';
import type { ModeloDeGrafo } from '../../lib/schema/grafo';

const no = (id: string, raia: string, tipo = 'tarefa') => ({ id, tipo, rotulo: id, raia, ordem: 0, subtarefas: [], temPlaybook: false });
const grafo = {
  versaoContrato: 1,
  demanda: 'd',
  raias: [
    { id: 'a', rotulo: 'A', cor: '#000', ordem: 0 },
    { id: 'b', rotulo: 'B', cor: '#000', ordem: 1 },
  ],
  nos: [no('a1', 'a'), no('b1', 'b')],
  arestas: [],
} as unknown as ModeloDeGrafo;

beforeEach(() => {
  window.history.replaceState(null, '', '/flows/d/');
});

describe('Fragmento_de_Estado', () => {
  it('trata visao como alias de geral', () => {
    const e = lerEstado('#view=visao', grafo);
    expect(e.view).toBeUndefined();
    expect(serializarEstado(e)).toBe('');
  });

  it('ignora Raias inexistentes e mantém o resto', () => {
    const e = lerEstado('#no=a1&exp=a,zzz&persp=mermaid&view=raia:zzz', grafo);
    expect([...e.exp.raias]).toEqual(['a']);
    expect(e.view).toBeUndefined();
    expect(e.no).toBe('a1');
    expect(e.persp).toBe('mermaid');
  });

  it('ignora no que não é id de nó do grafo', () => {
    expect(lerEstado('#no=zzz&view=raia:b', grafo)).toEqual({ exp: { raias: new Set(), subtarefas: new Set(), todasSubtarefas: false }, view: 'raia:b' });
    expect(lerEstado('#no=b1', grafo).no).toBe('b1');
    expect(lerEstado('#no=a', grafo).no).toBeUndefined();
  });

  it('usa o padrão quando persp não é uma perspectiva conhecida', () => {
    expect(PERSPECTIVAS_CONHECIDAS).toContain('mermaid');
    expect(lerEstado('#persp=desconhecida', grafo).persp).toBeUndefined();
    expect(lerEstado('#persp=mermaid', grafo).persp).toBe('mermaid');
    expect(serializarEstado(lerEstado('#persp=desconhecida&no=a1', grafo))).toBe('no=a1');
  });

  it('atualizarEstado também descarta no e persp inválidos', () => {
    const e = atualizarEstado(grafo, { no: 'zzz', persp: 'x' });
    expect(e.no).toBeUndefined();
    expect(e.persp).toBeUndefined();
    expect(window.location.hash).toBe('');
  });

  it('normaliza todas as Raias expandidas para completo', () => {
    const e = lerEstado('#exp=a,b', grafo);
    expect(e.view).toBe('completo');
    expect(serializarEstado(e)).toBe('view=completo');
  });

  it('faz round trip de no, view, exp, sub, persp e f', () => {
    const e = lerEstado('#no=a1&view=raia:b&exp=a&sub=1&persp=mermaid&f=raia:a,papel:po', grafo);
    expect(e.exp.todasSubtarefas).toBe(true);
    expect(e.f).toBe('raia:a,papel:po');
    expect(lerEstado(serializarEstado(e), grafo)).toEqual(e);
  });

  it('escreve com replaceState sem recarregar nem buscar de novo', () => {
    const replace = vi.spyOn(window.history, 'replaceState');
    const push = vi.spyOn(window.history, 'pushState');
    const buscar = vi.fn();
    expect(escreverEstado({ ...estadoVazio(), no: 'a1' })).toBe(true);
    expect(replace).toHaveBeenCalledTimes(1);
    expect(window.location.hash).toBe('#no=a1');
    expect(window.location.pathname).toBe('/flows/d/');
    expect(escreverEstado({ ...estadoVazio(), no: 'a1' }, 'push')).toBe(false);
    atualizarEstado(grafo, { view: 'raia:a' }, 'push');
    expect(push).toHaveBeenCalledTimes(1);
    expect(lerDaUrl(grafo)).toMatchObject({ no: 'a1', view: 'raia:a' });
    expect(buscar).not.toHaveBeenCalled();
    replace.mockRestore();
    push.mockRestore();
  });

  it('remove o # quando o estado fica vazio', () => {
    window.history.replaceState(null, '', '/flows/d/#no=a1');
    escreverEstado(estadoVazio());
    expect(window.location.href.endsWith('/flows/d/')).toBe(true);
  });
});

describe('loader', () => {
  beforeEach(() => esquecerGrafos());

  it('busca o grafo uma única vez, mesmo com mudanças de estado', async () => {
    const buscar = vi.fn(async () => ({ ok: true, status: 200, json: async () => grafo }));
    const [g1, g2] = await Promise.all([carregarGrafo('d', '/kit', buscar), carregarGrafo('d', '/kit/', buscar)]);
    atualizarEstado(g1, { view: 'completo' });
    atualizarEstado(g1, { persp: 'mermaid' }, 'push');
    await carregarGrafo('d', '/kit', buscar);
    expect(g1).toBe(g2);
    expect(buscar).toHaveBeenCalledTimes(1);
    expect(buscar).toHaveBeenCalledWith('/kit/api/flows/d.graph.json');
    expect(urlDoGrafo('d')).toBe('/api/flows/d.graph.json');
  });

  it('rejeita HTTP de erro e JSON inválido, e permite nova tentativa', async () => {
    const ruim = vi.fn(async () => ({ ok: false, status: 404, json: async () => ({}) }));
    await expect(carregarGrafo('x', '', ruim)).rejects.toThrow('404');
    const invalido = vi.fn(async () => ({ ok: true, status: 200, json: async () => ({}) }));
    await expect(carregarGrafo('x', '', invalido)).rejects.toThrow('inválido');
    expect(invalido).toHaveBeenCalledTimes(1);
  });
});
