// SPDX-License-Identifier: MIT
// Renderizador / Perspectiva contract of the flow page (Requirement 19.2, 19.3). The page talks only to these interfaces:
// a new Perspectiva (the 3D one, in a later spec) implements `Renderizador` and joins the open registry `PERSPECTIVAS`
// without touching `lib/flow-graph` or the Astro page.
import type { ConjuntoExpandido } from '../../../lib/flow-graph/expansao';
import type { ModeloDeGrafo } from '../../../lib/schema/grafo';
import type { CacheDeSvg } from './expansao';
import { renderizadorMermaid } from './perspectives/mermaid';

/** What the Diagrama shows. `view` is `geral` | `raia:<id>` | `completo`; `expandidas` is empty in `geral` and every lane in `completo`. */
export type EstadoDiagrama = {
  view: string;
  expandidas: ConjuntoExpandido;
  /** Global subtasks toggle (Requirement 5). */
  subtarefas: boolean;
  /** `completo` drawn without the lane groupings (Requirement 4.6). Ignored outside `completo`. */
  semRaias?: boolean;
  noSelecionado?: string;
  noDestacado?: string;
};

export interface InstanciaRenderizador {
  /** Redraws for a new state (view change, subtasks, highlight). Resolves when the new drawing is on screen. */
  atualizar(estado: EstadoDiagrama): Promise<void>;
  /** Moves keyboard focus to the element of the node (or `cluster:<raia>`). No-op when it is not drawn. */
  focarNo(idNo: string): void;
  destruir(): void;
}

/** What the page gives the Perspectiva besides the graph: UI strings, the textual alternative and the redraw cache (task 6.4). */
export interface OpcoesDeMontagem {
  t?: (chave: string, vars?: Record<string, string | number>) => string;
  mostrarAlternativaTextual?: () => void;
  cache?: CacheDeSvg;
}

export interface Renderizador {
  /** Perspective id (`persp` in the Fragmento_de_Estado): 'mermaid' | '3d' | ... */
  readonly perspectiva: string;
  montar(container: HTMLElement, grafo: ModeloDeGrafo, estado: EstadoDiagrama, opcoes?: OpcoesDeMontagem): Promise<InstanciaRenderizador>;
}

/** Open registry of Perspectivas by id. Keep `PERSPECTIVAS_CONHECIDAS` (state.ts) in step with its keys. */
export const PERSPECTIVAS: Record<string, Renderizador> = {};

export function registrarPerspectiva(r: Renderizador): void {
  PERSPECTIVAS[r.perspectiva] = r;
}

/** Perspective used when `persp` is absent or unknown. */
export const PERSPECTIVA_PADRAO = 'mermaid';

/** Registered Perspectiva for `id`, or the default one. */
export function perspectivaDe(id: string | undefined): Renderizador {
  return (id !== undefined ? PERSPECTIVAS[id] : undefined) ?? (PERSPECTIVAS[PERSPECTIVA_PADRAO] as Renderizador);
}

registrarPerspectiva(renderizadorMermaid);
