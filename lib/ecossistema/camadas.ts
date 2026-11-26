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

export const FORMA_DO_GRUPO: Record<Grupo, 'esfera' | 'cubo' | 'octaedro' | 'cone' | 'tetraedro' | 'anel'> = {
  fluxos: 'esfera',
  artefatos: 'cubo',
  catalogo: 'octaedro',
  fundamentos: 'cone',
  aprendizado: 'tetraedro',
  hubs: 'anel',
};

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
