// SPDX-License-Identifier: MIT
// Layouts of scenes 2 and 4 of the Home.
//  - Scene 2: one icon per demand, drawn with particles.
//  - Scene 4: a small world about learning: a brain wired with circuits (certifications sit on its lobes), digital books with
//    neural networks (one per area), bots (the competencies) and the journeys orbiting around it all.
import { hexParaRgb, layoutVazio, preencherPoeira, semeada, type Area, type Layout } from './layouts';

type P3 = [number, number, number];
type Cor = readonly [number, number, number];

function pôr(l: Layout, i: number, x: number, y: number, z: number, tam: number, cor: Cor, brilho = 1): void {
  l.posicoes[i * 4] = x;
  l.posicoes[i * 4 + 1] = y;
  l.posicoes[i * 4 + 2] = z;
  l.posicoes[i * 4 + 3] = tam;
  l.cores[i * 3] = Math.min(1, cor[0] * brilho);
  l.cores[i * 3 + 1] = Math.min(1, cor[1] * brilho);
  l.cores[i * 3 + 2] = Math.min(1, cor[2] * brilho);
}

// ----- Scene 2: one icon per demand ---------------------------------------------------------------------------------

/** `pontos` are normalized (0..1) positions inside a square drawing of the icon. */
export function layoutIcone(pontos: ReadonlyArray<readonly [number, number]>, centro: readonly [number, number], tamanho: number, n: number, cor: Cor, seed: number): Layout {
  const l = layoutVazio(n);
  const r = semeada(seed);
  const m = Math.min(pontos.length, Math.floor(n * 0.6));
  const passo = pontos.length / Math.max(m, 1);
  for (let i = 0; i < m; i++) {
    const p = pontos[Math.floor(i * passo)];
    pôr(l, i, centro[0] + (p[0] - 0.5) * tamanho, centro[1] - (p[1] - 0.5) * tamanho, (r() - 0.5) * 0.5, 0.5 + r() * 0.3, cor, 0.95);
  }
  // A faint orbit ring around the icon.
  const aneis = Math.min(Math.floor(n * 0.12), n - m);
  for (let k = 0; k < aneis; k++) {
    const ang = (k / aneis) * Math.PI * 2;
    pôr(l, m + k, centro[0] + Math.cos(ang) * tamanho * 0.72, centro[1] + Math.sin(ang) * tamanho * 0.72, (r() - 0.5) * 0.3, 0.5, cor, 0.5);
  }
  preencherPoeira(l, m + aneis, seed + 2, [0.45, 0.55, 0.85]);
  return l;
}

// ----- Scene 4 -------------------------------------------------------------------------------------------------------

export type AreaCert = 'tecnica' | 'soft-skill' | 'ia';
export type NivelCert = 'fundamental' | 'associado' | 'profissional' | 'especialista';

export interface DadosJornadas {
  jornadas: number;
  competencias: number;
  certificacoes: ReadonlyArray<{ area: AreaCert; nivel: NivelCert }>;
}

export const COR_AREA: Record<AreaCert, string> = { tecnica: '#56B4E9', 'soft-skill': '#E69F00', ia: '#CC79A7' };
const TAMANHO_NIVEL: Record<NivelCert, number> = { fundamental: 1.5, associado: 1.8, profissional: 2.0, especialista: 2.4 };
const SUPERFICIE: Cor = [0.5, 0.44, 0.95];
const CIRCUITO: Cor = [0.3, 0.85, 1];

/** Draws particles; stops silently when the budget of particles is used. */
class Pincel {
  private i = 0;
  /** Multiplies the brightness of what is drawn next; used to fade the parts that are not highlighted. */
  mult = 1;
  constructor(private readonly l: Layout, private readonly r: () => number, private readonly k: number) {}
  get usado(): number {
    return this.i;
  }
  aleatorio(): number {
    return this.r();
  }
  ponto(p: P3, tam: number, cor: Cor, brilho = 1): void {
    if (this.i >= this.l.posicoes.length / 4) return;
    // Line work uses small pixels; nodes (size 1 or more) keep their size.
    pôr(this.l, this.i++, p[0], p[1], p[2], tam < 1 ? tam * 0.62 : tam, cor, brilho * this.mult);
  }
  linha(a: P3, b: P3, passo: number, tam: number, cor: Cor, brilho = 1): void {
    const n = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]) / (passo * 1.3 * this.k)));
    for (let k = 0; k <= n; k++) this.ponto([a[0] + ((b[0] - a[0]) * k) / n, a[1] + ((b[1] - a[1]) * k) / n, a[2] + ((b[2] - a[2]) * k) / n], tam, cor, brilho);
  }
}

/** Height of the brain surface (z) at (x, y), or null outside the side silhouette. */
function zDoCerebro(x: number, y: number): number | null {
  const q = 1 - (x / 1.35) ** 2 - (y / 0.95) ** 2;
  if (q <= 0) return null;
  return 0.85 * Math.sqrt(q) * (1 + 0.045 * Math.sin(9 * x + 2) * Math.sin(7 * y));
}

function desenharCerebro(pc: Pincel, centro: P3, e: number, _nSuperficie: number, nTrilhas: number): void {
  const mover = (p: P3): P3 => [centro[0] + p[0] * e, centro[1] + p[1] * e, centro[2] + p[2] * e];
  const ponto = (x: number, y: number, z = 0): P3 => mover([x, y, z]);
  // Side silhouette of the cortex: an ellipse with a folded edge, flattened at the bottom.
  const contorno = (t: number): [number, number] => {
    const f = 1 + 0.045 * Math.sin(8 * t);
    return [1.35 * Math.cos(t) * f, Math.max(0.95 * Math.sin(t) * f, -0.66)];
  };
  let anterior = contorno(0);
  for (let k = 1; k <= 96; k++) {
    const atual = contorno((k / 96) * Math.PI * 2);
    pc.linha(ponto(anterior[0], anterior[1]), ponto(atual[0], atual[1]), 0.07, 0.7, SUPERFICIE, 0.95);
    anterior = atual;
  }
  // Cerebellum and brain stem.
  for (let k = 0; k <= 28; k++) {
    const t = (k / 28) * Math.PI;
    pc.ponto(ponto(-0.62 + 0.46 * Math.cos(t), -0.72 - 0.3 * Math.sin(t)), 0.7, SUPERFICIE, 0.85);
  }
  pc.linha(ponto(0.02, -0.62), ponto(0.1, -1.4), 0.07, 0.7, SUPERFICIE, 0.85);
  pc.linha(ponto(0.26, -0.62), ponto(0.2, -1.4), 0.07, 0.7, SUPERFICIE, 0.85);
  // Folds (gyri): wavy lines across the cortex, and the central groove.
  for (let g = 1; g <= 6; g++) {
    const y0 = -0.6 + g * 0.22;
    let ant: [number, number] | null = null;
    for (let x = -1.25; x <= 1.25; x += 0.1) {
      const y = y0 + 0.07 * Math.sin(6 * x + g * 1.3);
      const dentro = (x / 1.28) ** 2 + (y / 0.9) ** 2 < 1;
      if (dentro && ant) pc.linha(ponto(ant[0], ant[1]), ponto(x, y), 0.07, 0.55, SUPERFICIE, 0.6);
      ant = dentro ? [x, y] : null;
    }
  }
  pc.linha(ponto(0.05, 0.92), ponto(0.2, 0.1), 0.07, 0.55, SUPERFICIE, 0.7);
  pc.linha(ponto(0.2, 0.1), ponto(0.05, -0.55), 0.07, 0.55, SUPERFICIE, 0.7);
  // Circuit traces running over the cortex, with a bright node at every bend.
  const dirs: Array<[number, number]> = [[1, 0], [0, 1], [-1, 0], [0, -1], [1, 1], [-1, 1], [-1, -1], [1, -1]];
  for (let t = 0; t < nTrilhas; t++) {
    let x = (pc.aleatorio() - 0.5) * 2.1;
    let y = (pc.aleatorio() - 0.5) * 1.4;
    let d = Math.floor(pc.aleatorio() * 8);
    for (let s = 0; s < 5; s++) {
      const len = 0.18 + pc.aleatorio() * 0.3;
      const diag = dirs[d][0] !== 0 && dirs[d][1] !== 0 ? 0.75 : 1;
      const nx = x + dirs[d][0] * len * diag;
      const ny = y + dirs[d][1] * len * diag;
      if (zDoCerebro(x, y) === null || zDoCerebro(nx, ny) === null) break;
      pc.linha(ponto(x, y, 0.05), ponto(nx, ny, 0.05), 0.07, 0.6, CIRCUITO, 1.1);
      pc.ponto(ponto(nx, ny, 0.06), 1.1, CIRCUITO, 1.2);
      x = nx;
      y = ny;
      d = (d + (pc.aleatorio() < 0.5 ? 1 : 7)) % 8;
    }
  }
}

/** A spot on the visible side of the brain: frontal lobe (technical), temporal (soft skills), parietal and occipital (AI). */
function pontoNoCerebro(area: AreaCert, k: number, r: () => number): P3 {
  const f = { tecnica: [0.45, 1.05, -0.15, 0.55], 'soft-skill': [-0.35, 0.55, -0.62, -0.3], ia: [-1.05, -0.2, 0.05, 0.62] }[area];
  for (let tentativa = 0; tentativa < 12; tentativa++) {
    const x = f[0] + (f[1] - f[0]) * ((k * 0.37 + r() * 0.6) % 1);
    const y = f[2] + (f[3] - f[2]) * ((k * 0.61 + r() * 0.6) % 1);
    const z = zDoCerebro(x, y);
    if (z !== null) return [x, y, z + 0.06];
  }
  return [0, 0, 0.9];
}

function desenharLivro(pc: Pincel, c: P3, e: number, cor: Cor): void {
  for (const lado of [-1, 1]) {
    // Page outline and text lines; the pages tilt backward from the spine.
    const pagina = (x: number, y: number): P3 => [c[0] + lado * x * e, c[1] + y * e, c[2] + x * 0.28 * e];
    pc.linha(pagina(0.05, -0.55), pagina(1, -0.55), 0.08, 0.6, cor, 0.65);
    pc.linha(pagina(1, -0.55), pagina(1, 0.55), 0.08, 0.6, cor, 0.65);
    pc.linha(pagina(1, 0.55), pagina(0.05, 0.55), 0.08, 0.6, cor, 0.65);
    for (let row = 0; row < 3; row++) pc.linha(pagina(0.18, -0.3 + row * 0.3), pagina(0.78 + pc.aleatorio() * 0.15, -0.3 + row * 0.3), 0.1, 0.55, cor, 0.7);
  }
  pc.linha([c[0], c[1] - 0.55 * e, c[2]], [c[0], c[1] + 0.55 * e, c[2]], 0.08, 0.9, cor, 1);
  // A small neural network rising from the pages.
  const camadas = [3, 4, 3];
  const nos: P3[][] = camadas.map((n, ci) => Array.from({ length: n }, (_, k) => [c[0] + (ci - 1) * 0.55 * e, c[1] + (0.95 + (k - (n - 1) / 2) * 0.3) * e, c[2] + 0.1] as P3));
  for (let ci = 0; ci < nos.length - 1; ci++) {
    nos[ci].forEach((a, idx) => {
      for (const desloc of [0, 1]) pc.linha(a, nos[ci + 1][(idx + desloc) % nos[ci + 1].length], 0.2, 0.45, cor, 0.55);
    });
  }
  for (const camada of nos) for (const n of camada) pc.ponto(n, 1.1, [0.85, 0.95, 1], 0.9);
}

function desenharBot(pc: Pincel, c: P3, e: number, cor: Cor): void {
  const R = (x: number, y: number): P3 => [c[0] + x * e, c[1] + y * e, c[2]];
  // Head, antenna, eyes, mouth and a small body.
  pc.linha(R(-0.5, -0.4), R(0.5, -0.4), 0.07, 0.6, cor, 0.8);
  pc.linha(R(0.5, -0.4), R(0.5, 0.4), 0.07, 0.6, cor, 0.8);
  pc.linha(R(0.5, 0.4), R(-0.5, 0.4), 0.07, 0.8, cor, 1);
  pc.linha(R(-0.5, 0.4), R(-0.5, -0.4), 0.07, 0.8, cor, 1);
  pc.linha(R(0, 0.4), R(0, 0.72), 0.07, 0.7, cor, 1);
  pc.ponto(R(0, 0.8), 1.2, [0.85, 0.95, 1], 0.9);
  for (const x of [-0.2, 0.2]) pc.ponto(R(x, 0.08), 1.1, [0.5, 1, 1], 1.1);
  pc.linha(R(-0.22, -0.2), R(0.22, -0.2), 0.07, 0.7, cor, 0.9);
  pc.linha(R(-0.35, -0.48), R(0.35, -0.48), 0.09, 0.7, cor, 0.8);
  pc.linha(R(-0.35, -0.48), R(-0.35, -0.95), 0.09, 0.7, cor, 0.7);
  pc.linha(R(0.35, -0.48), R(0.35, -0.95), 0.09, 0.7, cor, 0.7);
  pc.linha(R(-0.35, -0.95), R(0.35, -0.95), 0.09, 0.7, cor, 0.7);
}

export type FocoJornadas = 'jornada' | 'competencia' | 'certificacao';

/** `destaque` makes one part shine (journeys, competencies or certifications) and fades the others. */
export function layoutJornadas(d: DadosJornadas, a: Area, n: number, seed: number, destaque?: FocoJornadas | null): Layout {
  const l = layoutVazio(n);
  const r = semeada(seed);
  // On smaller budgets the drawing keeps its shape with fewer particles per line.
  const pc = new Pincel(l, r, Math.max(1, Math.sqrt(2400 / n)));
  const cx = a.largura * (a.desloc + 0.055);
  const e = Math.min(a.altura * 0.155, (a.largura * 0.2) / 1.4);
  const cy = 0.1 * e;
  const brilho = (parte: FocoJornadas) => (!destaque ? 1 : destaque === parte ? 1.5 : 0.18);
  pc.mult = brilho('certificacao');
  desenharCerebro(pc, [cx, cy, 0], e, 0, Math.max(5, Math.floor(n / 110)));
  // Certifications: bright nodes on the lobes, bigger for higher levels.
  const contagem = new Map<AreaCert, number>();
  for (const c of d.certificacoes) {
    const k = contagem.get(c.area) ?? 0;
    contagem.set(c.area, k + 1);
    const p = pontoNoCerebro(c.area, k, r);
    pc.ponto([cx + p[0] * e, cy + p[1] * e, p[2] * e], TAMANHO_NIVEL[c.nivel], hexParaRgb(COR_AREA[c.area]), 1.15);
  }
  pc.mult = brilho('jornada');
  // Journeys: bigger nodes on an orbit around the scene.
  for (let k = 0; k < d.jornadas; k++) {
    const ang = (k / Math.max(d.jornadas, 1)) * Math.PI * 2 + 0.4;
    pc.ponto([cx + Math.cos(ang) * e * 3.2, Math.sin(ang) * e * 2.3, -0.4], 2.4, hexParaRgb('#7fd0ff'), 1.2);
  }
  pc.mult = brilho('competencia');
  // Bots (competencies) and digital books with neural nets (one per area).
  const bots: Array<[number, number]> = [[-3.6, 2.4], [3.8, 2.3], [-4.3, -0.2], [4.5, -0.1]];
  for (let k = 0; k < Math.min(d.competencias, bots.length); k++) desenharBot(pc, [cx + bots[k][0], bots[k][1], 0], e * 0.5, [0.6, 0.78, 0.95]);
  const livros: Array<[AreaCert, number, number]> = [['tecnica', 3.6, -2.9], ['soft-skill', -3.6, -2.9], ['ia', 0.1, 3.9]];
  pc.mult = brilho('certificacao');
  for (const [area, dx, dy] of livros) desenharLivro(pc, [cx + dx, dy, 0], e * 0.55, hexParaRgb(COR_AREA[area]));
  preencherPoeira(l, pc.usado, seed + 9, [0.4, 0.5, 0.85]);
  return l;
}
