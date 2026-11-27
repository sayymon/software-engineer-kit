// SPDX-License-Identifier: MIT
// Barra "Subtarefas" of the Diagrama (Requirements 5.1, 5.2, 5.3, 5.6, 5.8, 20.5): the "Subtarefas" toggle (every task of every
// expanded lane, `sub=1`), the per-task expansion (`exp=...;s=<tarefa>`) and the rule that hides both when the View shows no task
// with Subtarefas. Buttons stay in the DOM across redraws, so focus survives. Pure DOM: the island wires the callbacks and the state.
import type { ModeloDeGrafo, NoDoGrafo } from '../../../lib/schema/grafo';
import type { EstadoDoFragmento } from './state';

export type TraduzirSubtarefas = (chave: string, vars?: Record<string, string | number>) => string;

const PREFIXO_RAIA = 'raia:';

export interface AcoesDasSubtarefas {
  /** The global toggle: shows the Subtarefas of every task of the expanded lanes, or hides them all. */
  alternar(): void;
  /** Expands or collapses the Subtarefas of one task. */
  alternarTarefa(tarefa: string): void;
}

export interface BarraDeSubtarefas {
  readonly elemento: HTMLElement;
  /** Syncs visibility and state with the Fragmento_de_Estado that is about to be drawn. */
  atualizar(estado: EstadoDoFragmento): void;
  destruir(): void;
}

/** "N subtarefas" with the real N ("1 subtarefa" for one). */
export function contagemDeSubtarefas(t: TraduzirSubtarefas, n: number): string {
  return n === 1 ? t('flow.sub.contagem.um') : t('flow.sub.contagem', { n });
}

/**
 * Tasks with at least one Subtarefa that the View shows as nodes: every task in `completo`, the tasks of the lane in `raia:<id>`,
 * and the tasks of the expanded lanes in `geral` (a collapsed lane is a cluster: it has no task to expand).
 */
export function tarefasComSubtarefas(grafo: ModeloDeGrafo, estado: EstadoDoFragmento): NoDoGrafo[] {
  const view = estado.view ?? 'geral';
  const mostra = (n: NoDoGrafo): boolean =>
    view === 'completo' ? true : view.startsWith(PREFIXO_RAIA) ? n.raia === view.slice(PREFIXO_RAIA.length) : estado.exp.raias.has(n.raia);
  return grafo.nos.filter((n) => n.subtarefas.length > 0 && mostra(n));
}

export function criarBarraDeSubtarefas(doc: Document, grafo: ModeloDeGrafo, t: TraduzirSubtarefas, acoes: AcoesDasSubtarefas): BarraDeSubtarefas {
  const raiz = doc.createElement('div');
  raiz.className = 'flow-subtarefas';
  raiz.setAttribute('role', 'group');
  raiz.setAttribute('aria-label', t('flow.sub.group'));
  raiz.dataset.flowSubtarefas = '';
  raiz.hidden = true;

  const alternador = doc.createElement('button');
  alternador.type = 'button';
  alternador.textContent = t('flow.sub.alternador');
  alternador.title = t('flow.sub.alternador.rotulo');
  alternador.setAttribute('aria-pressed', 'false');
  alternador.setAttribute('data-flow-subtarefas-alternar', '');
  const aviso = doc.createElement('span');
  aviso.className = 'flow-subtarefas__aviso muted';
  aviso.id = 'flow-subtarefas-aviso';
  aviso.textContent = t('flow.sub.aviso.completo');
  aviso.hidden = true;
  alternador.setAttribute('aria-describedby', aviso.id);

  const detalhes = doc.createElement('details');
  detalhes.hidden = true;
  const resumo = doc.createElement('summary');
  const lista = doc.createElement('ul');
  lista.className = 'flow-raias__lista flow-subtarefas__lista';
  detalhes.append(resumo, lista);
  raiz.append(alternador, aviso, detalhes);

  let tarefasDaLista = '';
  const botoes = new Map<string, HTMLButtonElement>();
  const aoClicar = (ev: Event): void => {
    const b = (ev.target as Element).closest<HTMLButtonElement>('button');
    if (!b || b.disabled) return;
    if (b.hasAttribute('data-flow-subtarefas-alternar')) acoes.alternar();
    else if (b.dataset.flowSubtarefasTarefa) acoes.alternarTarefa(b.dataset.flowSubtarefasTarefa);
  };
  raiz.addEventListener('click', aoClicar);

  return {
    elemento: raiz,
    atualizar(estado) {
      const tarefas = tarefasComSubtarefas(grafo, estado);
      raiz.hidden = tarefas.length === 0; // Requirement 5.6: no Subtarefa in the View, no toggle
      const todas = estado.exp.todasSubtarefas;
      alternador.setAttribute('aria-pressed', String(todas));
      aviso.hidden = todas || estado.view !== 'completo';
      // Per-task expansion lives where the drawing is made from a Conjunto_Expandido (a lane View only has the global toggle).
      const porTarefa = !(estado.view ?? '').startsWith(PREFIXO_RAIA);
      detalhes.hidden = !porTarefa || tarefas.length === 0;
      if (!porTarefa) return;
      // Rebuild the rows only when the set of tasks changed (the focused button survives a plain toggle).
      const assinatura = tarefas.map((n) => n.id).join('|');
      if (assinatura !== tarefasDaLista) {
        tarefasDaLista = assinatura;
        botoes.clear();
        lista.replaceChildren(
          ...tarefas.map((n) => {
            const li = doc.createElement('li');
            li.dataset.flowSubtarefasLinha = n.id;
            const nome = doc.createElement('span');
            nome.className = 'flow-raias__nome';
            nome.textContent = `${n.id} ${n.rotulo}`;
            const b = doc.createElement('button');
            b.type = 'button';
            b.dataset.flowSubtarefasTarefa = n.id;
            li.append(nome, b);
            botoes.set(n.id, b);
            return li;
          }),
        );
      }
      let abertas = 0;
      for (const n of tarefas) {
        const b = botoes.get(n.id);
        if (!b) continue;
        const aberta = todas || estado.exp.subtarefas.has(n.id);
        if (aberta) abertas++;
        const vars = { nome: n.rotulo, contagem: contagemDeSubtarefas(t, n.subtarefas.length) };
        b.textContent = t(aberta ? 'flow.sub.recolher' : 'flow.sub.expandir');
        b.setAttribute('aria-label', t(aberta ? 'flow.sub.recolher.rotulo' : 'flow.sub.expandir.rotulo', vars));
        b.setAttribute('aria-expanded', String(aberta));
        b.disabled = todas; // the global toggle owns every task while it is on
      }
      resumo.textContent = t('flow.sub.resumo', { n: abertas, total: tarefas.length });
    },
    destruir() {
      raiz.removeEventListener('click', aoClicar);
      raiz.remove();
    },
  };
}
