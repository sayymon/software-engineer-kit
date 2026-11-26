// SPDX-License-Identifier: MIT
// Build-time 3D layout. Deterministic: fixed seed, fixed number of steps, integer output. The client never simulates.
import { forceLink, forceManyBody, forceSimulation, forceX, forceY, forceZ, type SimNode } from 'd3-force-3d';
import type { Adjacencia } from './adjacencia';
import type { Area } from './camadas';

export interface EntradaLayout {
  n: number;
  adj: Adjacencia;
  /** Area of each node, for the cluster anchors. */
  area: ReadonlyArray<Area>;
  /** Hub nodes stay out of the simulation and sit at the centroid of their neighbors. */
  hub: ReadonlyArray<boolean>;
  /** Kind indexes that are weak (wikilinks in body text). */
  kindsFracos?: ReadonlySet<number>;
  passos?: number;
}

/** World units per integer step: positions are stored as round(coordinate * ESCALA). */
export const ESCALA = 10;

const ANCORAS: Record<Area, readonly [number, number, number]> = {
  fluxos: [-420, 120, 0],
  jornadas: [140, -380, 60],
  catalogo: [380, 160, -60],
};

/** Park-Miller LCG, seeded. The same seed gives the same sequence on every platform. */
export function lcg(seed = 42): () => number {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

export function calcularLayout(entrada: EntradaLayout): Int32Array {
  const { n, adj, area, hub } = entrada;
  const ativos: number[] = [];
  for (let i = 0; i < n; i++) if (!hub[i]) ativos.push(i);
  const posAtivo = new Map<number, number>(ativos.map((g, k) => [g, k]));
  const nos: SimNode[] = ativos.map((g, k) => {
    // Deterministic start on a sphere (golden angle) around the area anchor.
    const t = (k + 0.5) / ativos.length;
    const phi = Math.acos(1 - 2 * t);
    const theta = Math.PI * (1 + Math.sqrt(5)) * k;
    const [ax, ay, az] = ANCORAS[area[g]];
    return { x: ax + 120 * Math.sin(phi) * Math.cos(theta), y: ay + 120 * Math.sin(phi) * Math.sin(theta), z: az + 120 * Math.cos(phi) };
  });
  const ligacoes: Array<{ source: number; target: number; weight: number }> = [];
  const fracos = entrada.kindsFracos;
  for (const [a, b] of adj.pares()) {
    if (hub[a] || hub[b]) continue;
    const forte = !fracos || adj.kinds(a, b).some((k) => !fracos.has(k));
    ligacoes.push({ source: posAtivo.get(a)!, target: posAtivo.get(b)!, weight: forte ? 1 : 0.3 });
  }
  const sim = forceSimulation(nos, 3).randomSource(lcg(42)).stop().alphaDecay(0.02).velocityDecay(0.5);
  const carga = forceManyBody();
  carga.strength(-26);
  carga.theta(0.95);
  carga.distanceMax(520);
  const mola = forceLink(ligacoes);
  mola.distance(34);
  mola.strength((l) => 0.08 * l.weight);
  mola.iterations(1);
  const ancora = (eixo: 0 | 1 | 2) => (nn: { index: number }) => ANCORAS[area[ativos[nn.index]]][eixo];
  const fx = forceX(ancora(0));
  fx.strength(0.035);
  const fy = forceY(ancora(1));
  fy.strength(0.035);
  const fz = forceZ(ancora(2));
  fz.strength(0.035);
  sim.force('charge', carga).force('link', mola).force('fx', fx).force('fy', fy).force('fz', fz);
  sim.tick(entrada.passos ?? 300);
  const saida = new Int32Array(n * 3);
  for (let k = 0; k < ativos.length; k++) {
    const g = ativos[k];
    saida[g * 3] = Math.round(nos[k].x * ESCALA);
    saida[g * 3 + 1] = Math.round(nos[k].y * ESCALA);
    saida[g * 3 + 2] = Math.round(nos[k].z * ESCALA);
  }
  for (let i = 0; i < n; i++) {
    if (!hub[i]) continue;
    const viz = adj.vizinhos(i).filter((v) => !hub[v]);
    const [ax0, ay0, az0] = ANCORAS[area[i]];
    if (!viz.length) {
      saida[i * 3] = Math.round(ax0 * ESCALA);
      saida[i * 3 + 1] = Math.round(ay0 * ESCALA);
      saida[i * 3 + 2] = Math.round(az0 * ESCALA);
      continue;
    }
    let sx = 0;
    let sy = 0;
    let sz = 0;
    for (const v of viz) {
      sx += saida[v * 3];
      sy += saida[v * 3 + 1];
      sz += saida[v * 3 + 2];
    }
    saida[i * 3] = Math.round(sx / viz.length);
    saida[i * 3 + 1] = Math.round(sy / viz.length);
    saida[i * 3 + 2] = Math.round(sz / viz.length);
  }
  return saida;
}
