// SPDX-License-Identifier: MIT
// Scroll progress of the immersive Home. Pure functions: the browser scrolls, the code only reads.

export const CENAS = ['apresentacao', 'fluxos', 'catalogo', 'jornadas'] as const;
export type CenaId = (typeof CENAS)[number];

export interface FaixaMedida {
  /** `getBoundingClientRect().top` of the scene strip. */
  topo: number;
  /** Strip height in pixels. */
  altura: number;
}

const limitar = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/** How much of the strip has been scrolled, 0 before it reaches the top of the window and 1 after it leaves. */
export function progressoDaCena(topo: number, altura: number, janela: number): number {
  const percurso = Math.max(altura - janela, 1);
  return limitar(-topo / percurso);
}

/** The active scene: the one whose strip covers the middle of the window, or the nearest one. */
export function cenaAtiva(faixas: ReadonlyArray<FaixaMedida>, janela: number): number {
  const meio = janela / 2;
  let melhor = 0;
  let menor = Infinity;
  faixas.forEach((f, i) => {
    const dentro = f.topo <= meio && f.topo + f.altura >= meio;
    const distancia = dentro ? 0 : Math.min(Math.abs(f.topo - meio), Math.abs(f.topo + f.altura - meio));
    if (distancia < menor) {
      menor = distancia;
      melhor = i;
    }
  });
  return melhor;
}

/** Smooth step between two edges. */
export function suavizar(a: number, b: number, x: number): number {
  const t = limitar((x - a) / (b - a));
  return t * t * (3 - 2 * t);
}

/** Morph state for the shared stage: which pair of layouts to blend and how much. The morph happens at the end of a scene. */
export function janelaDeMorph(progressos: ReadonlyArray<number>, ativa: number, inicio = 0.62): { de: number; para: number; mistura: number } {
  const ultima = progressos.length - 1;
  const i = Math.min(Math.max(ativa, 0), ultima);
  if (i >= ultima) return { de: ultima, para: ultima, mistura: 0 };
  return { de: i, para: i + 1, mistura: suavizar(inicio, 1, progressos[i] ?? 0) };
}
