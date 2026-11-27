// SPDX-License-Identifier: MIT
// Perspectiva `mermaid` (Requirements 17.4, 17.10, 19.2, 19.3, 3.1, 20.10). Derives the Texto_Mermaid from the Modelo_de_Grafo in the
// client (`gerarDiagramaExpandido` / `gerarDiagramaDoGrafo`), renders it with the loader of task 6.2 (kit limits, ESM first) and
// stamps the real guide id on every `g.node` and `g.cluster` of the SVG, so clicks, focus and highlights never parse Mermaid ids.
import { projetar, type ConjuntoExpandido } from '../../../../lib/flow-graph/expansao';
import { gerarDiagramaDoGrafo, gerarDiagramaExpandido, idSubgraph, PREFIXO_RAIA } from '../../../../lib/flow-mermaid';
import type { ModeloDeGrafo } from '../../../../lib/schema/grafo';
import { chaveDoEstado, criarExpansao } from '../expansao';
import { carregarMermaid, renderizarDiagrama, type MermaidApi } from '../mermaid-loader';
import type { EstadoDiagrama, InstanciaRenderizador, Renderizador } from '../renderer';
import { contagemDeSubtarefas } from '../subtarefas';

export const PERSPECTIVA_MERMAID = 'mermaid';
const PREFIXO_CLUSTER = 'cluster:';
/** Mermaid names a node element `<svgId>-flowchart-<mermaidId>-<n>`; mermaid ids are `[A-Za-z0-9_]+` (see `sanitizarId`). */
const RE_ID_NO = /flowchart-([A-Za-z0-9_]+)-\d+$/;

/** Text and id map for a state: `raia:<id>` focuses a lane, anything else is an expansion set (`completo` = every lane). */
export function diagramaDoEstado(grafo: ModeloDeGrafo, estado: EstadoDiagrama): { texto: string; mapaIds: Record<string, string> } {
  if (estado.view.startsWith(PREFIXO_RAIA)) return gerarDiagramaDoGrafo(grafo, estado.view, true, estado.subtarefas);
  const raias = estado.view === 'completo' ? new Set(grafo.raias.map((r) => r.id)) : estado.expandidas.raias;
  const conj: ConjuntoExpandido = { raias, subtarefas: estado.expandidas.subtarefas, todasSubtarefas: estado.subtarefas };
  return gerarDiagramaExpandido(grafo, conj, true, !(estado.view === 'completo' && estado.semRaias));
}

type Traduzir = (chave: string, vars?: Record<string, string | number>) => string;

/** Accessible name of each real id: node labels (with "N subtarefas" when the task has Subtarefas), subtask labels, lane names for lanes, and for `cluster:<raia>` the name with the counts. */
function rotulosDo(grafo: ModeloDeGrafo, t?: Traduzir): Map<string, string> {
  const m = new Map<string, string>();
  const totais = new Map(projetar(grafo, { raias: new Set(), subtarefas: new Set(), todasSubtarefas: false }).clusters.map((c) => [c.raia, c.totais]));
  for (const r of grafo.raias) {
    const c = totais.get(r.id);
    m.set(r.id, r.nome);
    m.set(
      PREFIXO_CLUSTER + r.id,
      t && c ? t('flow.cluster.label', { nome: r.nome, nos: c.nos, tarefas: c.tarefas, gateways: c.gateways, subtarefas: c.subtarefas }) : r.nome,
    );
  }
  for (const n of grafo.nos) {
    // Requirement 5.4: a task with Subtarefas says how many (the drawing prints "N subtarefas" while they are hidden).
    m.set(n.id, t && n.subtarefas.length ? t('flow.no.rotulo_subtarefas', { nome: n.rotulo, contagem: contagemDeSubtarefas(t, n.subtarefas.length) }) : n.rotulo);
    for (const s of n.subtarefas) m.set(s.id, s.rotulo);
  }
  return m;
}

/**
 * Stamps `data-id` (the real guide id) on each `g.node` and `g.cluster` of a Mermaid SVG, using `mapaIds` (mermaid id -> real id)
 * and, for lane `subgraph`s (`z_SG_<raia>`), the lanes of the graph. Nodes get `tabindex="0"`, `role="button"` and an
 * `aria-label` with the label (a collapsed Cluster_de_Raia is a node `cluster:<raia>`: a button whose label has the name and the
 * counts, when `t` is given); expanded lane clusters get `role="group"`, the lane name and `tabindex="-1"` (focus lands there after
 * a keyboard expansion). Elements outside the map (legend, bridges,
 * task groups) are left untouched. Returns how many elements were stamped.
 */
export function aplicarDataIds(svg: ParentNode, mapaIds: Record<string, string>, grafo: ModeloDeGrafo, t?: Traduzir): number {
  const rotulos = rotulosDo(grafo, t);
  const raias = new Map(grafo.raias.map((r) => [idSubgraph(r.id), r.id]));
  const resolveCluster = (id: string): string | undefined => {
    const chave = id.slice(id.lastIndexOf('-') + 1); // drops the `<svgId>-` prefix; mermaid ids have no hyphen
    return mapaIds[chave] ?? raias.get(chave);
  };
  let n = 0;
  for (const el of svg.querySelectorAll('g.node')) {
    const m = RE_ID_NO.exec(el.id);
    const real = m ? mapaIds[m[1] as string] : undefined;
    if (real === undefined) continue;
    el.setAttribute('data-id', real);
    el.setAttribute('tabindex', '0');
    el.setAttribute('role', 'button');
    el.setAttribute('aria-label', rotulos.get(real) ?? real);
    n++;
  }
  for (const el of svg.querySelectorAll('g.cluster')) {
    const real = resolveCluster(el.id);
    if (real === undefined) continue;
    el.setAttribute('data-id', real);
    el.setAttribute('role', 'group');
    el.setAttribute('tabindex', '-1');
    el.setAttribute('aria-label', rotulos.get(real) ?? real);
    n++;
  }
  return n;
}

const porDataId = (raiz: ParentNode, id: string, seletor: string): Element | undefined =>
  [...raiz.querySelectorAll(seletor)].find((e) => e.getAttribute('data-id') === id);

function marcar(raiz: ParentNode, atributo: string, id: string | undefined): void {
  for (const e of raiz.querySelectorAll(`[${atributo}]`)) e.removeAttribute(atributo);
  if (id === undefined) return;
  const alvo = porDataId(raiz, id, '[data-id]');
  alvo?.setAttribute(atributo, 'true');
}

export interface DependenciasMermaid {
  carregar(base: string): Promise<MermaidApi>;
  renderizar(api: MermaidApi, id: string, texto: string): Promise<string>;
}

const dependenciasPadrao: DependenciasMermaid = {
  carregar: async (base) => (await carregarMermaid({ base })).api,
  renderizar: renderizarDiagrama,
};

let contador = 0;

export function criarRenderizadorMermaid(deps: DependenciasMermaid = dependenciasPadrao): Renderizador {
  return {
    perspectiva: PERSPECTIVA_MERMAID,
    async montar(container, grafo, estado, opcoes): Promise<InstanciaRenderizador> {
      const base = container.closest<HTMLElement>('[data-flow-base]')?.dataset.flowBase ?? '';
      const raiz = container.ownerDocument.createElement('div');
      raiz.className = 'flow-diagrama';
      raiz.setAttribute('data-perspectiva', PERSPECTIVA_MERMAID);
      container.appendChild(raiz);
      // Every draw goes through the queue (sequence number, obsolete result dropped, SVG cache, progress indicator, error panel).
      const expansao = criarExpansao({
        container,
        t: opcoes?.t ?? ((chave) => chave),
        mostrarAlternativaTextual: opcoes?.mostrarAlternativaTextual,
        cache: opcoes?.cache,
      });
      // Mermaid loads on the first draw, inside the queue, so the indicator is already on screen while it downloads.
      let carga: Promise<MermaidApi> | undefined;
      const api = (): Promise<MermaidApi> => {
        carga ??= deps.carregar(base).catch((e) => {
          carga = undefined; // "Tentar de novo" must be able to load again
          throw e;
        });
        return carga;
      };

      const atualizar = async (e: EstadoDiagrama): Promise<void> => {
        const { texto, mapaIds } = diagramaDoEstado(grafo, e);
        await expansao.pedir({
          chave: chaveDoEstado(grafo, e),
          nos: Object.keys(mapaIds).length,
          renderizar: async () => deps.renderizar(await api(), `flow-mmd-${++contador}`, texto),
          aplicar: (svg) => {
            raiz.innerHTML = svg;
            aplicarDataIds(raiz, mapaIds, grafo, opcoes?.t);
            marcar(raiz, 'data-selecionado', e.noSelecionado);
            marcar(raiz, 'data-destacado', e.noDestacado);
          },
        });
      };

      await atualizar(estado);
      return {
        atualizar,
        focarNo(idNo) {
          const alvo = porDataId(raiz, idNo, 'g.node') ?? porDataId(raiz, idNo, 'g.cluster');
          (alvo as SVGElement | undefined)?.focus?.();
        },
        destruir() {
          expansao.destruir();
          raiz.remove();
        },
      };
    },
  };
}

export const renderizadorMermaid: Renderizador = criarRenderizadorMermaid();
