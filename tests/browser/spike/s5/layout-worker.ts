// SPDX-License-Identifier: MIT
// Spike S5. Layout glue. The worker bundle is `dagre.min.js` (UMD global `dagre`, from @dagrejs/dagre installed outside the repo)
// followed by this file. dagre needs no DOM, so the same glue also runs on the main thread (control case of the spike).
import type { EntradaLayout, ResultadoLayout } from './tipos';

declare const dagre: any;

export function executarLayout(entrada: EntradaLayout): ResultadoLayout {
  const g = new dagre.graphlib.Graph({ multigraph: true, compound: true });
  g.setGraph({ rankdir: 'LR', nodesep: 64, ranksep: 56, edgesep: 14, marginx: 24, marginy: 24 });
  g.setDefaultEdgeLabel(() => ({}));
  for (const c of entrada.clusters) g.setNode(c.id, {});
  for (const n of entrada.nos) g.setNode(n.id, { width: n.w, height: n.h });
  for (const c of entrada.clusters) if (c.pai) g.setParent(c.id, c.pai);
  for (const n of entrada.nos) if (n.pai) g.setParent(n.id, n.pai);
  for (const a of entrada.arestas) g.setEdge({ v: a.v, w: a.w, name: String(a.id) }, { width: a.lw, height: a.lh, labelpos: 'c' });
  dagre.layout(g);
  const nos: ResultadoLayout['nos'] = {};
  const clusters: ResultadoLayout['clusters'] = {};
  for (const n of entrada.nos) {
    const p = g.node(n.id);
    nos[n.id] = { x: p.x, y: p.y };
  }
  for (const c of entrada.clusters) {
    const p = g.node(c.id);
    clusters[c.id] = { x: p.x, y: p.y, w: p.width, h: p.height };
  }
  const arestas: ResultadoLayout['arestas'] = entrada.arestas.map((a) => {
    const e = g.edge({ v: a.v, w: a.w, name: String(a.id) });
    return { id: a.id, pontos: e.points.map((q: { x: number; y: number }) => ({ x: q.x, y: q.y })), lx: a.lw ? e.x : undefined, ly: a.lw ? e.y : undefined };
  });
  const gr = g.graph();
  return { nos, clusters, arestas, largura: gr.width, altura: gr.height };
}

const global = globalThis as any;
global.executarLayout = executarLayout;
if (typeof global.WorkerGlobalScope !== 'undefined') {
  global.onmessage = (ev: MessageEvent) => {
    const t0 = performance.now();
    const resultado = executarLayout(ev.data.entrada);
    global.postMessage({ id: ev.data.id, resultado, ms: performance.now() - t0 });
  };
}
