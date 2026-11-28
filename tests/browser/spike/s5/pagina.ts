// SPDX-License-Identifier: MIT
// Spike S5. Page side of the prototype: conversion, layout (Worker or main thread), SVG generation and DOM insertion, with timing.
import type { ConjuntoExpandido } from '../../../../lib/flow-graph/expansao';
import type { ModeloDeGrafo } from '../../../../lib/schema/grafo';
import { montarEntrada } from './entrada';
import { gerarSvg } from './svg';
import type { EntradaLayout, ResultadoLayout } from './tipos';

export interface Medida {
  entrada_ms: number;
  layout_ms: number;
  layout_no_worker_ms: number | null;
  svg_ms: number;
  insercao_ms: number;
  total_ms: number;
  ate_quadro_ms: number;
  svg_chars: number;
  nos: number;
  clusters: number;
  arestas: number;
}

type Layouter = (entrada: EntradaLayout) => Promise<{ resultado: ResultadoLayout; ms: number | null }>;

const quadro = () => new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));

/** Worker layouter: the worker script (dagre + glue) comes as text and is loaded from a Blob URL. */
export function layoutNoWorker(codigoDoWorker: string): { layouter: Layouter; pronto: Promise<number>; encerrar: () => void } {
  const t0 = performance.now();
  const url = URL.createObjectURL(new Blob([codigoDoWorker], { type: 'text/javascript' }));
  const w = new Worker(url);
  const pend = new Map<number, (v: { resultado: ResultadoLayout; ms: number }) => void>();
  let n = 0;
  w.onmessage = (ev) => pend.get(ev.data.id)?.(ev.data);
  const chamar = (entrada: EntradaLayout) =>
    new Promise<{ resultado: ResultadoLayout; ms: number }>((resolve) => {
      const id = ++n;
      pend.set(id, resolve);
      w.postMessage({ id, entrada });
    });
  const vazio: EntradaLayout = { nos: [{ id: 'a', forma: 'tarefa', linhas: [], w: 10, h: 10, fundo: '#fff', borda: '#000', larg: 1, tracejado: false, texto: '#000' }], clusters: [], arestas: [] };
  const pronto = chamar(vazio).then(() => performance.now() - t0);
  return { layouter: chamar, pronto, encerrar: () => { w.terminate(); URL.revokeObjectURL(url); } };
}

/** Control: the same layout glue on the main thread (it blocks the page). Requires the worker script evaluated in the page. */
export const layoutNaThreadPrincipal: Layouter = async (entrada) => {
  const t = performance.now();
  const resultado = (window as any).executarLayout(entrada) as ResultadoLayout;
  return { resultado, ms: performance.now() - t };
};

export async function renderizar(grafo: ModeloDeGrafo, conj: ConjuntoExpandido, layouter: Layouter, alvo: HTMLElement): Promise<Medida> {
  const t0 = performance.now();
  const entrada = montarEntrada(grafo, conj);
  const t1 = performance.now();
  const { resultado, ms } = await layouter(entrada);
  const t2 = performance.now();
  const svg = gerarSvg(entrada, resultado);
  const t3 = performance.now();
  alvo.innerHTML = svg;
  void alvo.offsetHeight;
  const t4 = performance.now();
  await quadro();
  const t5 = performance.now();
  return {
    entrada_ms: t1 - t0,
    layout_ms: t2 - t1,
    layout_no_worker_ms: ms,
    svg_ms: t3 - t2,
    insercao_ms: t4 - t3,
    total_ms: t4 - t0,
    ate_quadro_ms: t5 - t0,
    svg_chars: svg.length,
    nos: entrada.nos.length,
    clusters: entrada.clusters.length,
    arestas: entrada.arestas.length,
  };
}

(window as any).__s5 = { layoutNoWorker, layoutNaThreadPrincipal, renderizar, montarEntrada, gerarSvg };
