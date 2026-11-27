// SPDX-License-Identifier: MIT
// Target layouts of the stage particles. Pure functions: the same input gives the same positions.
// A layout is positions (x, y, z, size per particle) plus colors (r, g, b per particle) in world units.

export interface Layout {
  /** 4 numbers per particle: x, y, z and size. */
  posicoes: Float32Array;
  /** 3 numbers per particle, 0 to 1. */
  cores: Float32Array;
}

/** Seeded generator (Park-Miller). */
export function semeada(seed: number): () => number {
  let s = Math.abs(Math.floor(seed)) % 2147483647 || 1;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

export function layoutVazio(n: number): Layout {
  return { posicoes: new Float32Array(n * 4), cores: new Float32Array(n * 3) };
}

/** Fills particles from `de` on with faint dust spread in a shell around the center. */
export function preencherPoeira(l: Layout, de: number, seed: number, cor: readonly [number, number, number] = [0.45, 0.55, 0.85]): void {
  const n = l.posicoes.length / 4;
  const r = semeada(seed);
  for (let i = de; i < n; i++) {
    const raio = 5 + r() * 9;
    const th = r() * Math.PI * 2;
    const ph = Math.acos(2 * r() - 1);
    l.posicoes[i * 4] = raio * Math.sin(ph) * Math.cos(th) * 1.4;
    l.posicoes[i * 4 + 1] = raio * Math.sin(ph) * Math.sin(th) * 0.8;
    l.posicoes[i * 4 + 2] = raio * Math.cos(ph) - 4;
    l.posicoes[i * 4 + 3] = 0.5 + r() * 0.5;
    l.cores[i * 3] = cor[0] * (0.5 + r() * 0.5);
    l.cores[i * 3 + 1] = cor[1] * (0.5 + r() * 0.5);
    l.cores[i * 3 + 2] = cor[2] * (0.5 + r() * 0.5);
  }
}

/** Placeholder scene layout: a spiral ribbon. Replaced by the real scene layouts. */
export function layoutEspiral(n: number, seed: number, cor: readonly [number, number, number]): Layout {
  const l = layoutVazio(n);
  const r = semeada(seed);
  const uteis = Math.floor(n * 0.7);
  for (let i = 0; i < uteis; i++) {
    const t = i / uteis;
    const a = t * Math.PI * 10;
    l.posicoes[i * 4] = Math.cos(a) * (2 + t * 5);
    l.posicoes[i * 4 + 1] = (t - 0.5) * 8;
    l.posicoes[i * 4 + 2] = Math.sin(a) * (2 + t * 5);
    l.posicoes[i * 4 + 3] = 1 + r();
    l.cores[i * 3] = cor[0];
    l.cores[i * 3 + 1] = cor[1];
    l.cores[i * 3 + 2] = cor[2];
  }
  preencherPoeira(l, uteis, seed + 1);
  return l;
}
