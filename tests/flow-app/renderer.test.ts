// SPDX-License-Identifier: MIT
// @vitest-environment jsdom
// Renderizador registry and Perspectiva `mermaid` (Requirements 17.4, 17.10, 19.2, 19.3, 3.1, 20.10). Mermaid is a stand-in for the
// drawing (jsdom has no layout); the id stamping runs on a real Mermaid SVG saved in tests/fixtures/flow-app/mermaid-real.svg
// (rendered with Mermaid 11.17.2 in Chromium from a small Visão-geral-like text).
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { gerarGrafo } from '../../lib/flow-graph';
import { guideDir, loadGuideDoc } from '../../lib/guide';
import type { ModeloDeGrafo } from '../../lib/schema/grafo';
import { PERSPECTIVAS, perspectivaDe, registrarPerspectiva, type EstadoDiagrama, type Renderizador } from '../../site/src/flow-app/renderer';
import { PERSPECTIVAS_CONHECIDAS } from '../../site/src/flow-app/state';
import { aplicarDataIds, criarRenderizadorMermaid, diagramaDoEstado } from '../../site/src/flow-app/perspectives/mermaid';

const root = `${process.cwd()}/`;
const svgReal = readFileSync(`${root}tests/fixtures/flow-app/mermaid-real.svg`, 'utf8');

const no = (id: string, raia: string, rotulo: string) => ({ id, tipo: 'tarefa', rotulo, raia, ordem: 0, subtarefas: [], temPlaybook: false });
const mini = {
  versaoContrato: 1,
  demanda: 'd',
  nomeDemanda: 'D',
  raias: [
    { id: 'r1', nome: 'Raia Um', cor: '#112233', ordem: 0, orquestradora: true },
    { id: 'r2', nome: 'Raia Dois', cor: '#445566', ordem: 1, orquestradora: false },
  ],
  nos: [no('a1', 'r1', 'Tarefa A'), no('g1', 'r1', 'Decide'), no('b1', 'r2', 'Tarefa B')],
  arestas: [],
} as unknown as ModeloDeGrafo;
const mapa = { a1: 'a1', g1: 'g1', z_CL_r2: 'cluster:r2' };

const vazio = () => ({ raias: new Set<string>(), subtarefas: new Set<string>(), todasSubtarefas: false });
const geral = (): EstadoDiagrama => ({ view: 'geral', expandidas: vazio(), subtarefas: false });
/** r1 expanded, r2 collapsed: draws a1, g1 and the cluster of r2, the same shape as the real SVG fixture. */
const r1Aberta = (): EstadoDiagrama => ({ view: 'geral', expandidas: { ...vazio(), raias: new Set(['r1']) }, subtarefas: false });

describe('registro PERSPECTIVAS', () => {
  it('registers mermaid and matches PERSPECTIVAS_CONHECIDAS', () => {
    expect(Object.keys(PERSPECTIVAS).sort()).toEqual([...PERSPECTIVAS_CONHECIDAS].sort());
  });

  it('is open: a new Perspectiva joins and is found; unknown ids fall back to mermaid', () => {
    const falsa: Renderizador = { perspectiva: 'falsa', montar: async () => ({ atualizar: async () => {}, focarNo() {}, destruir() {} }) };
    registrarPerspectiva(falsa);
    expect(perspectivaDe('falsa')).toBe(falsa);
    expect(perspectivaDe('nada').perspectiva).toBe('mermaid');
    expect(perspectivaDe(undefined).perspectiva).toBe('mermaid');
    delete PERSPECTIVAS.falsa;
  });
});

describe('aplicarDataIds (SVG real do Mermaid)', () => {
  it('stamps the guide id on nodes and the lane cluster, focusable and labeled', () => {
    document.body.innerHTML = svgReal;
    expect(aplicarDataIds(document, mapa, mini)).toBe(4);
    const nos = [...document.querySelectorAll('g.node[data-id]')];
    expect(nos.map((n) => n.getAttribute('data-id'))).toEqual(['a1', 'g1', 'cluster:r2']);
    for (const n of nos) {
      expect(n.getAttribute('tabindex')).toBe('0');
      expect(n.getAttribute('role')).toBe('button');
    }
    expect(nos.map((n) => n.getAttribute('aria-label'))).toEqual(['Tarefa A', 'Decide', 'Raia Dois']);
    const cluster = document.querySelector('g.cluster') as Element;
    expect(cluster.getAttribute('data-id')).toBe('r1');
    expect(cluster.getAttribute('aria-label')).toBe('Raia Um');
    expect(cluster.getAttribute('tabindex')).toBe('-1'); // focus lands here after a keyboard expansion
    expect(cluster.getAttribute('role')).toBe('group');
  });

  it('labels a collapsed Cluster_de_Raia with the name and the counts when given a translator', () => {
    document.body.innerHTML = svgReal;
    const t = (c: string, v: Record<string, string | number> = {}) => `${c}:${v.nome}:${v.nos}:${v.tarefas}:${v.gateways}:${v.subtarefas}`;
    aplicarDataIds(document, mapa, mini, t);
    const cluster = document.querySelector('g.node[data-id="cluster:r2"]') as Element;
    expect(cluster.getAttribute('role')).toBe('button');
    expect(cluster.getAttribute('tabindex')).toBe('0');
    expect(cluster.getAttribute('aria-label')).toBe('flow.cluster.label:Raia Dois:1:1:0:0');
  });

  it('leaves elements outside the map untouched', () => {
    document.body.innerHTML = svgReal;
    aplicarDataIds(document, { a1: 'a1' }, mini);
    expect(document.querySelectorAll('g.node[data-id]')).toHaveLength(1);
  });
});

describe('diagramaDoEstado', () => {
  const grafo = gerarGrafo(loadGuideDoc(guideDir(`${root}content`)), 'feature');
  it('geral gives clusters, completo gives subgraphs, raia:<id> gives one lane', () => {
    const g = diagramaDoEstado(grafo, geral());
    expect(g.texto).toContain('z_CL_');
    expect(Object.values(g.mapaIds).every((v) => v.startsWith('cluster:') || grafo.nos.some((n) => n.id === v))).toBe(true);
    const todas = new Set(grafo.raias.map((r) => r.id));
    const c = diagramaDoEstado(grafo, { view: 'completo', expandidas: { ...vazio(), raias: todas }, subtarefas: false });
    expect(c.texto).not.toContain('z_CL_');
    const raia = grafo.raias[0]!.id;
    const r = diagramaDoEstado(grafo, { view: `raia:${raia}`, expandidas: vazio(), subtarefas: false });
    expect(Object.values(r.mapaIds).every((id) => grafo.nos.find((n) => n.id === id)?.raia === raia)).toBe(true);
  });
});

describe('Perspectiva mermaid (Mermaid simulado)', () => {
  const svgs: string[] = [];
  const textos: string[] = [];
  const deps = {
    carregar: async () => ({ initialize() {}, render: async () => ({ svg: '' }) }),
    renderizar: async (_api: unknown, _id: string, texto: string) => {
      textos.push(texto);
      return svgs.shift() ?? svgReal;
    },
  };

  it('mounts, stamps ids, marks selection and focuses a node', async () => {
    const container = document.createElement('div');
    document.body.replaceChildren(container);
    const r = criarRenderizadorMermaid(deps);
    // Real Mermaid ids differ from the mini graph text; the stand-in returns the real SVG and the text comes from the graph.
    const inst = await r.montar(container, mini, { ...r1Aberta(), noSelecionado: 'a1' });
    expect(textos[0]).toContain('flowchart LR');
    expect(container.querySelector('[data-id="a1"]')?.getAttribute('data-selecionado')).toBe('true');
    inst.focarNo('g1');
    expect(document.activeElement?.getAttribute('data-id')).toBe('g1');
    await inst.atualizar({ ...r1Aberta(), noDestacado: 'g1' });
    expect(container.querySelector('[data-selecionado]')).toBeNull();
    expect(container.querySelector('[data-id="g1"]')?.getAttribute('data-destacado')).toBe('true');
    inst.destruir();
    expect(container.querySelector('.flow-diagrama')).toBeNull();
  });

  it('discards the result of an obsolete request', async () => {
    const container = document.createElement('div');
    document.body.replaceChildren(container);
    let solta!: (s: string) => void;
    let n = 0;
    const lento = {
      carregar: deps.carregar,
      renderizar: (_a: unknown, _i: string, _t: string) =>
        ++n === 2 ? new Promise<string>((ok) => (solta = ok)) : Promise.resolve(n === 1 ? svgReal : '<svg id="novo"></svg>'),
    };
    // Distinct states: the same state would be served by the SVG cache, with no render.
    const inst = await criarRenderizadorMermaid(lento).montar(container, mini, geral());
    const antigo = inst.atualizar({ ...geral(), view: 'raia:r1' });
    await new Promise((ok) => setTimeout(ok, 120)); // the first request is now rendering (slow)
    const novo = inst.atualizar({ ...geral(), view: 'raia:r2' }); // one render at a time: waits for the slow one, then draws
    solta(svgReal);
    await Promise.all([antigo, novo]);
    expect(container.querySelector('#novo')).not.toBeNull();
  });

  it('serves a seen state from the SVG cache, without a new render', async () => {
    const container = document.createElement('div');
    document.body.replaceChildren(container);
    let chamadas = 0;
    const contando = { carregar: deps.carregar, renderizar: async () => (++chamadas, svgReal) };
    const inst = await criarRenderizadorMermaid(contando).montar(container, mini, geral());
    await inst.atualizar({ ...geral(), view: 'raia:r1' });
    await inst.atualizar(geral());
    expect(chamadas).toBe(2);
    expect(container.querySelector('.flow-diagrama svg')).not.toBeNull();
  });
});
