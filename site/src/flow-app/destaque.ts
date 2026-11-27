// SPDX-License-Identifier: MIT
// "Destacar no Diagrama" (Requirements 8.3, 8.4): which View and expansion show a Nó, and which element gets the highlight.
// Pure: the island applies the plan (state, redraw, scroll, focus).
//  - `completo` already draws every Nó: nothing changes;
//  - `geral` draws a lane only when it is in the Conjunto_Expandido: a collapsed lane is added to it (when all lanes end up expanded
//    the state normalizes to `completo`);
//  - `raia:<id>` draws only that lane: a Nó of another lane changes the View to `raia:<its lane>`;
//  - a Subtarefa is drawn only when the subtasks are on: in `geral` and `completo` its task is added to `exp.subtarefas`; in a lane View
//    (the toggle is global there) the highlight falls on the task that owns it, which is always drawn.
import type { ModeloDeGrafo } from '../../../lib/schema/grafo';
import { resolverNo } from './modal';
import { VIEW_GERAL, type EstadoDoFragmento } from './state';

export interface PlanoDeDestaque {
  /** Id of the element to highlight, scroll to and focus: the Nó, or the task of a Subtarefa the View cannot draw. */
  alvo: string;
  /** Change to apply on top of the current state. Absent: the View already draws the `alvo`. */
  mudanca?: Partial<EstadoDoFragmento>;
}

/** Plan to show `id` (a Nó or a Subtarefa of the graph) highlighted. Undefined when `id` is not in the graph. */
export function planejarDestaque(grafo: ModeloDeGrafo, estado: EstadoDoFragmento, id: string): PlanoDeDestaque | undefined {
  const achado = resolverNo(grafo, id);
  if (!achado) return undefined;
  const { no, subtarefa } = achado;
  const view = estado.view ?? VIEW_GERAL;
  const naRaia = view.startsWith('raia:');
  let exp = estado.exp;
  let novaView: string | undefined;
  if (naRaia) {
    if (view !== `raia:${no.raia}`) {
      novaView = `raia:${no.raia}`;
      exp = { raias: new Set(), subtarefas: new Set(), todasSubtarefas: exp.todasSubtarefas }; // leaving a View clears the expansion
    }
  } else if (view !== 'completo' && !exp.raias.has(no.raia)) {
    exp = { ...exp, raias: new Set([...exp.raias, no.raia]) };
  }
  let alvo = id;
  if (subtarefa) {
    const viewFinal = novaView ?? view;
    if (exp.todasSubtarefas || exp.subtarefas.has(no.id)) {
      // already drawn
    } else if (!viewFinal.startsWith('raia:')) {
      exp = { ...exp, subtarefas: new Set([...exp.subtarefas, no.id]) };
    } else {
      alvo = no.id;
    }
  }
  const mudou = novaView !== undefined || exp !== estado.exp;
  if (!mudou) return { alvo };
  return { alvo, mudanca: { ...(novaView ? { view: novaView } : {}), exp } };
}
