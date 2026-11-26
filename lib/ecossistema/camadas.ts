// SPDX-License-Identifier: MIT
// Granularity layers and visual groups of the Ecossistema 3D. Every entity tipo has exactly one of each.
// The records are exhaustive over `Tipo`: a new tipo in the schema fails to compile until it is placed here.
import type { Tipo } from '../schema';

export const CAMADAS = ['nucleo', 'fluxo', 'detalhe'] as const;
export type Camada = (typeof CAMADAS)[number];

export const GRUPOS = ['fluxos', 'artefatos', 'catalogo', 'fundamentos', 'aprendizado', 'hubs'] as const;
export type Grupo = (typeof GRUPOS)[number];

/** Areas of the Site (see docs/site-map.md). The 3D clusters follow them. */
export const AREAS = ['fluxos', 'jornadas', 'catalogo'] as const;
export type Area = (typeof AREAS)[number];

export const CAMADA_DO_TIPO: Record<Tipo, Camada> = {
  ferramenta: 'nucleo',
  categoria: 'nucleo',
  'caso-de-uso': 'nucleo',
  empresa: 'nucleo',
  modelo: 'nucleo',
  benchmark: 'nucleo',
  funcionalidade: 'nucleo',
  padrao: 'nucleo',
  algoritmo: 'nucleo',
  'estrutura-de-dados': 'nucleo',
  stack: 'nucleo',
  'guia-pratico': 'nucleo',
  certificacao: 'nucleo',
  licenca: 'nucleo',
  hub: 'nucleo',
  demanda: 'nucleo',
  jornada: 'nucleo',
  competencia: 'nucleo',
  tecnica: 'nucleo',
  abordagem: 'nucleo',
  estrategia: 'nucleo',
  requisito: 'nucleo',
  papel: 'nucleo',
  rito: 'nucleo',
  'categoria-ferramenta': 'nucleo',
  'fonte-guia': 'nucleo',
  'padrao-guia': 'nucleo',
  raia: 'fluxo',
  tarefa: 'fluxo',
  artefato: 'fluxo',
  variavel: 'fluxo',
  'tipo-de-artefato': 'fluxo',
  decisao: 'detalhe',
  no: 'detalhe',
  subtarefa: 'detalhe',
  playbook: 'detalhe',
  pergunta: 'detalhe',
  celula: 'detalhe',
};

export const GRUPO_DO_TIPO: Record<Tipo, Grupo> = {
  demanda: 'fluxos',
  raia: 'fluxos',
  tarefa: 'fluxos',
  papel: 'fluxos',
  rito: 'fluxos',
  requisito: 'fluxos',
  decisao: 'fluxos',
  no: 'fluxos',
  subtarefa: 'fluxos',
  playbook: 'fluxos',
  pergunta: 'fluxos',
  celula: 'fluxos',
  artefato: 'artefatos',
  variavel: 'artefatos',
  'tipo-de-artefato': 'artefatos',
  ferramenta: 'catalogo',
  categoria: 'catalogo',
  'caso-de-uso': 'catalogo',
  empresa: 'catalogo',
  modelo: 'catalogo',
  benchmark: 'catalogo',
  funcionalidade: 'catalogo',
  stack: 'catalogo',
  'guia-pratico': 'catalogo',
  'categoria-ferramenta': 'catalogo',
  tecnica: 'fundamentos',
  padrao: 'fundamentos',
  algoritmo: 'fundamentos',
  'estrutura-de-dados': 'fundamentos',
  licenca: 'fundamentos',
  abordagem: 'fundamentos',
  estrategia: 'fundamentos',
  'fonte-guia': 'fundamentos',
  'padrao-guia': 'fundamentos',
  jornada: 'aprendizado',
  competencia: 'aprendizado',
  certificacao: 'aprendizado',
  hub: 'hubs',
};

/** Okabe-Ito palette, one color per visual group. Shape is the second, redundant cue (not color alone). */
export const COR_DO_GRUPO: Record<Grupo, string> = {
  fluxos: '#56B4E9',
  artefatos: '#F0E442',
  catalogo: '#E69F00',
  fundamentos: '#009E73',
  aprendizado: '#CC79A7',
  hubs: '#9aa3b2',
};

export type Forma = 'esfera' | 'cubo' | 'octaedro' | 'cone' | 'tetraedro' | 'anel' | 'dodecaedro' | 'icosaedro' | 'cilindro' | 'prisma';

/** Shape of each tipo. Within a visual group the tipos of the nucleo and fluxo layers never share a shape (checked by a test). */
export const FORMA_DO_TIPO: Record<Tipo, Forma> = {
  demanda: 'dodecaedro',
  raia: 'cilindro',
  tarefa: 'esfera',
  papel: 'cone',
  rito: 'anel',
  requisito: 'tetraedro',
  decisao: 'octaedro',
  no: 'prisma',
  subtarefa: 'icosaedro',
  playbook: 'cubo',
  pergunta: 'cone',
  celula: 'esfera',
  artefato: 'cubo',
  variavel: 'icosaedro',
  'tipo-de-artefato': 'cilindro',
  ferramenta: 'octaedro',
  empresa: 'cubo',
  'caso-de-uso': 'cone',
  categoria: 'dodecaedro',
  modelo: 'icosaedro',
  benchmark: 'cilindro',
  funcionalidade: 'tetraedro',
  stack: 'anel',
  'guia-pratico': 'esfera',
  'categoria-ferramenta': 'prisma',
  tecnica: 'cone',
  padrao: 'dodecaedro',
  algoritmo: 'icosaedro',
  'estrutura-de-dados': 'cubo',
  licenca: 'cilindro',
  abordagem: 'octaedro',
  estrategia: 'tetraedro',
  'fonte-guia': 'esfera',
  'padrao-guia': 'anel',
  jornada: 'cone',
  competencia: 'octaedro',
  certificacao: 'dodecaedro',
  hub: 'anel',
};

function hexParaHsl(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  const r = ((n >> 16) & 255) / 255;
  const g = ((n >> 8) & 255) / 255;
  const b = (n & 255) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  if (d === 0) return [0, 0, l];
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  const h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [h * 60, s, l];
}

function hslParaHex(h: number, s: number, l: number): string {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const hh = (((h % 360) + 360) % 360) / 60;
  const x = c * (1 - Math.abs((hh % 2) - 1));
  const [r1, g1, b1] = hh < 1 ? [c, x, 0] : hh < 2 ? [x, c, 0] : hh < 3 ? [0, c, x] : hh < 4 ? [0, x, c] : hh < 5 ? [x, 0, c] : [c, 0, x];
  const m = l - c / 2;
  const to = (v: number) => Math.round((v + m) * 255).toString(16).padStart(2, '0');
  return `#${to(r1)}${to(g1)}${to(b1)}`;
}

/** Color of each tipo: the group color, shifted in hue and lightness so the tipos of one group are told apart at a glance. */
export const COR_DO_TIPO: Record<Tipo, string> = (() => {
  const saida = {} as Record<Tipo, string>;
  for (const grupo of GRUPOS) {
    const tipos = (Object.keys(GRUPO_DO_TIPO) as Tipo[]).filter((t) => GRUPO_DO_TIPO[t] === grupo);
    const [h, s, l] = hexParaHsl(COR_DO_GRUPO[grupo]);
    tipos.forEach((t, k) => {
      const centro = k - (tipos.length - 1) / 2;
      saida[t] = tipos.length === 1 ? COR_DO_GRUPO[grupo] : hslParaHex(h + centro * 3.5, Math.min(1, s), Math.min(0.8, Math.max(0.4, l + [-0.1, 0, 0.1, 0.17][k % 4])));
    });
  }
  return saida;
})();

export function formaDe(tipo: string): Forma {
  return (FORMA_DO_TIPO as Record<string, Forma | undefined>)[tipo] ?? 'esfera';
}
export function corDe(tipo: string): string {
  return (COR_DO_TIPO as Record<string, string | undefined>)[tipo] ?? '#9aa3b2';
}

/** Area used for the 3D clusters, from the content layer (`SiteLayer`) of the entity. */
export function areaDaCamada(layer: string): Area {
  if (layer === 'flows') return 'fluxos';
  if (layer === 'journeys' || layer === 'certifications') return 'jornadas';
  return 'catalogo';
}

export function camadaDe(tipo: string): Camada {
  const c = (CAMADA_DO_TIPO as Record<string, Camada | undefined>)[tipo];
  if (!c) throw new Error(`ecossistema: tipo "${tipo}" sem camada de granularidade (lib/ecossistema/camadas.ts)`);
  return c;
}

export function grupoDe(tipo: string): Grupo {
  const g = (GRUPO_DO_TIPO as Record<string, Grupo | undefined>)[tipo];
  if (!g) throw new Error(`ecossistema: tipo "${tipo}" sem grupo visual (lib/ecossistema/camadas.ts)`);
  return g;
}
