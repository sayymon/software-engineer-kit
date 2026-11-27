// SPDX-License-Identifier: MIT
// Quality levels of the Home stage and the rule that lowers them when frames get slow. Quality only goes down in a session.

export const NIVEIS = ['alto', 'medio', 'baixo'] as const;
export type Nivel = (typeof NIVEIS)[number];

export interface ConfigDeNivel {
  /** Particles drawn. */
  particulas: number;
  /** Maximum device pixel ratio. */
  dpr: number;
  /** Simultaneous bursts on the title. */
  ondas: number;
  /** Circuit traces and data packets of the background. */
  trilhas: number;
  pulsos: number;
  /** Floating catalog terms on the first scene. */
  termos: number;
}

export const CONFIG: Record<Nivel, ConfigDeNivel> = {
  alto: { particulas: 2400, dpr: 2, ondas: 8, trilhas: 110, pulsos: 180, termos: 32 },
  medio: { particulas: 1600, dpr: 1.5, ondas: 8, trilhas: 70, pulsos: 110, termos: 24 },
  baixo: { particulas: 900, dpr: 1, ondas: 4, trilhas: 40, pulsos: 60, termos: 16 },
};

export interface Aparelho {
  toqueGrosso: boolean;
  nucleos?: number;
  memoriaGb?: number;
}

/** Phones and weak machines start in the middle level and keep the same story. */
export function nivelInicial(a: Aparelho): Nivel {
  if (a.toqueGrosso) return 'medio';
  if ((a.nucleos ?? 8) <= 4 || (a.memoriaGb ?? 8) <= 4) return 'medio';
  return 'alto';
}

export const LIMITE_MS = 24;
export const JANELA_DE_QUADROS = 60;

/** Collects frame times and says when to step down one level: the average of a full window is above the limit. */
export class AvaliadorDeQuadros {
  private soma = 0;
  private quantos = 0;
  constructor(public nivel: Nivel, private readonly limite = LIMITE_MS, private readonly janela = JANELA_DE_QUADROS) {}

  /** Returns the new level when it dropped, otherwise null. */
  registrar(ms: number): Nivel | null {
    this.soma += Math.min(ms, 250);
    this.quantos += 1;
    if (this.quantos < this.janela) return null;
    const media = this.soma / this.quantos;
    this.soma = 0;
    this.quantos = 0;
    if (media <= this.limite) return null;
    const i = NIVEIS.indexOf(this.nivel);
    if (i >= NIVEIS.length - 1) return null;
    this.nivel = NIVEIS[i + 1];
    return this.nivel;
  }
}
