// SPDX-License-Identifier: MIT
// Spike S5. SVG generator of the Renderizador próprio: clusters (raias and task groups), edges with arrows and labels, nodes by shape.
import type { ClusterLayout, EntradaLayout, NoLayout, Ponto, ResultadoLayout } from './tipos';

const PAD = 10;
const TOPO = 24;
const FONTE = 'font-family="trebuchet ms, verdana, arial, sans-serif"';
const esc = (s: string): string => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const f = (n: number): string => String(Math.round(n * 10) / 10);

/** d3 curveBasis, the default Mermaid curve. */
function basis(p: Ponto[]): string {
  if (p.length < 3) return p.map((q, i) => `${i ? 'L' : 'M'}${f(q.x)} ${f(q.y)}`).join('');
  let d = '';
  let x0 = NaN, y0 = NaN, x1 = NaN, y1 = NaN;
  let estado = 0;
  const curva = (x: number, y: number) => {
    d += `C${f((2 * x0 + x1) / 3)} ${f((2 * y0 + y1) / 3)} ${f((x0 + 2 * x1) / 3)} ${f((y0 + 2 * y1) / 3)} ${f((x0 + 4 * x1 + x) / 6)} ${f((y0 + 4 * y1 + y) / 6)}`;
  };
  for (const { x, y } of p) {
    if (estado === 0) {
      estado = 1;
      d += `M${f(x)} ${f(y)}`;
    } else if (estado === 1) estado = 2;
    else if (estado === 2) {
      estado = 3;
      d += `L${f((5 * x0 + x1) / 6)} ${f((5 * y0 + y1) / 6)}`;
      curva(x, y);
    } else curva(x, y);
    x0 = x1; x1 = x; y0 = y1; y1 = y;
  }
  curva(x1, y1);
  d += `L${f(x1)} ${f(y1)}`;
  return d;
}

function formaDoNo(n: NoLayout, x: number, y: number): string {
  const l = x - n.w / 2;
  const t = y - n.h / 2;
  const base = `fill="${n.fundo}" stroke="${n.borda}" stroke-width="${n.larg}"${n.tracejado ? ' stroke-dasharray="5 3"' : ''}`;
  switch (n.forma) {
    case 'inicio':
    case 'fim':
      return `<rect x="${f(l)}" y="${f(t)}" width="${n.w}" height="${n.h}" rx="${f(n.h / 2)}" ${base}/>`;
    case 'gateway':
      return `<polygon points="${f(x)},${f(t)} ${f(l + n.w)},${f(y)} ${f(x)},${f(t + n.h)} ${f(l)},${f(y)}" ${base}/>`;
    case 'chamada':
      return `<rect x="${f(l)}" y="${f(t)}" width="${n.w}" height="${n.h}" ${base}/><path d="M${f(l + 8)} ${f(t)}V${f(t + n.h)}M${f(l + n.w - 8)} ${f(t)}V${f(t + n.h)}" stroke="${n.borda}" stroke-width="1.5" fill="none"/>`;
    case 'ponte': {
      const a = Math.min(18, n.w / 4);
      return `<polygon points="${f(l + a)},${f(t)} ${f(l + n.w - a)},${f(t)} ${f(l + n.w)},${f(y)} ${f(l + n.w - a)},${f(t + n.h)} ${f(l + a)},${f(t + n.h)} ${f(l)},${f(y)}" ${base}/>`;
    }
    default:
      return `<rect x="${f(l)}" y="${f(t)}" width="${n.w}" height="${n.h}" rx="${n.forma === 'sub' ? 8 : 3}" ${base}/>`;
  }
}

const ALT: Record<string, number> = { id: 13, txt: 17, it: 16, neg: 18 };
const TAM: Record<string, number> = { id: 10, txt: 14, it: 13, neg: 14 };

function textoDoNo(n: NoLayout, x: number, y: number): string {
  const total = n.linhas.reduce((s, l) => s + ALT[l.k], 0);
  let cy = y - total / 2;
  const partes = n.linhas.map((l) => {
    cy += ALT[l.k];
    const estilo = l.k === 'it' ? ' font-style="italic"' : l.k === 'id' || l.k === 'neg' ? ' font-weight="bold"' : '';
    return `<tspan x="${f(x)}" y="${f(cy - 4)}" font-size="${TAM[l.k]}"${estilo}>${esc(l.t)}</tspan>`;
  });
  return `<text text-anchor="middle" fill="${n.texto}" ${FONTE}>${partes.join('')}</text>`;
}

function profundidade(c: ClusterLayout, porId: Map<string, ClusterLayout>): number {
  let d = 0;
  for (let p = c.pai; p; p = porId.get(p)?.pai) d++;
  return d;
}

/** Number of cluster levels below each cluster (0 for a cluster with no cluster child). */
function niveisAbaixo(clusters: ClusterLayout[]): Map<string, number> {
  const nivel = new Map<string, number>(clusters.map((c) => [c.id, 0]));
  const porId = new Map(clusters.map((c) => [c.id, c]));
  for (const c of clusters) {
    let k = 1;
    for (let p = c.pai; p; p = porId.get(p)?.pai, k++) nivel.set(p, Math.max(nivel.get(p) ?? 0, k));
  }
  return nivel;
}

export function gerarSvg(e: EntradaLayout, r: ResultadoLayout): string {
  const porId = new Map(e.clusters.map((c) => [c.id, c]));
  const nivel = niveisAbaixo(e.clusters);
  const partes: string[] = [];
  const caixas: string[] = [];
  const ordenados = [...e.clusters].sort((a, b) => profundidade(a, porId) - profundidade(b, porId));
  for (const c of ordenados) {
    const g = r.clusters[c.id];
    const k = (nivel.get(c.id) ?? 0) + 1;
    const l = g.x - g.w / 2 - PAD * k;
    const t = g.y - g.h / 2 - PAD * k - TOPO * k;
    const w = g.w + 2 * PAD * k;
    const h = g.h + 2 * PAD * k + TOPO * k;
    caixas.push(
      `<g class="cluster" data-id="${esc(c.id)}" data-pai="${esc(c.pai ?? '')}"><rect x="${f(l)}" y="${f(t)}" width="${f(w)}" height="${f(h)}" rx="4" fill="${c.fundo}" stroke="${c.borda}" stroke-width="${c.larg}"${c.tracejado ? ' stroke-dasharray="5 3"' : ''}/>` +
        `<text class="cluster-label" x="${f(l + w / 2)}" y="${f(t + 18)}" text-anchor="middle" font-size="14" font-weight="bold" fill="#000" ${FONTE}>${esc(c.titulo)}</text></g>`,
    );
  }
  const linhas: string[] = [];
  const rotulos: string[] = [];
  const porAresta = new Map(e.arestas.map((a) => [a.id, a]));
  for (const a of r.arestas) {
    const ar = porAresta.get(a.id)!;
    linhas.push(`<path class="edge" d="${basis(a.pontos)}" fill="none" stroke="#333" stroke-width="1.5"${ar.tracejada ? ' stroke-dasharray="4 3"' : ''} marker-end="url(#s5-seta)"/>`);
    if (ar.lw && a.lx !== undefined && a.ly !== undefined) {
      rotulos.push(
        `<text class="edge-label" x="${f(a.lx)}" y="${f((a.ly ?? 0) + 4)}" text-anchor="middle" font-size="12" fill="#333" stroke="#fff" stroke-width="3" paint-order="stroke" ${FONTE}>${esc(ar.rotulo)}</text>`,
      );
    }
  }
  const nos = e.nos.map((n) => {
    const p = r.nos[n.id];
    return `<g class="node" data-id="${esc(n.id)}" data-pai="${esc(n.pai ?? '')}">${formaDoNo(n, p.x, p.y)}${textoDoNo(n, p.x, p.y)}</g>`;
  });
  const W = Math.ceil(r.largura);
  const H = Math.ceil(r.altura);
  partes.push(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">`,
    '<defs><marker id="s5-seta" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10z" fill="#333"/></marker></defs>',
    ...caixas,
    ...linhas,
    ...rotulos,
    ...nos,
    '</svg>',
  );
  return partes.join('');
}
