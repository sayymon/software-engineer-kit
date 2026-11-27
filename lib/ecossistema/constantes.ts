// SPDX-License-Identifier: MIT
// Constants shared by the build (layout, payload) and the browser (renderer). No heavy imports here.

/** World units per integer step: positions are stored as round(coordinate * ESCALA). */
export const ESCALA = 10;

/** Approximate area of a tipo, for facets and cluster colors in the browser (the build uses the content layer). */
const AREA_FLUXOS = new Set(['demanda', 'raia', 'tarefa', 'papel', 'rito', 'requisito', 'artefato', 'variavel', 'tipo-de-artefato', 'decisao', 'no', 'subtarefa', 'playbook', 'pergunta', 'celula']);
const AREA_JORNADAS = new Set(['jornada', 'competencia', 'certificacao']);
export function areaDoTipo(tipo: string): 'fluxos' | 'jornadas' | 'catalogo' {
  if (AREA_FLUXOS.has(tipo)) return 'fluxos';
  if (AREA_JORNADAS.has(tipo)) return 'jornadas';
  return 'catalogo';
}
