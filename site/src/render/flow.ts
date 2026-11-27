// SPDX-License-Identifier: MIT
// Demand flow pages: the interactive Diagrama island (demand selector, view tabs, legend), the textual alternative, raias with
// responsabilidade, playbooks and the build, buy or subscribe table read from the guide.
import type { Page } from '@lib/content/site';
import { gerarGrafo, textoAcessivel } from '@lib/flow-graph';
import { configDoGuia } from '@lib/decisor';
import { type Ctx, esc, inline, label, section, table, dl, val } from './util';

type Item = Record<string, any>;

const pretty = (id: string) => id.replace(/_/g, ' ');
const BUDGET_GATE = 'com_dcs_g1';

/** Weights table of the guide Decisor, plus the budget gate and the financial context. Reads only the loaded guide. */
export function matrizTable(ctx: Ctx): string {
  const doc = ctx.doc();
  const m = configDoGuia(doc);
  const gate = (Array.isArray(doc.decisoes) ? (doc.decisoes as Item[]) : []).find((n) => n.id === BUDGET_GATE);
  const playbook = gate && (Array.isArray(doc.playbooks) ? (doc.playbooks as Item[]) : []).find((p) => p.id === gate.playbook);
  const rows = Object.entries(m.pesos).map(([objetivo, pesos]) => [
    esc(pretty(objetivo)),
    ...m.criterios.map((c) => esc(String(pesos[c]))),
  ]);
  const gateHtml = gate
    ? `<h3>${esc(ctx.t('s.matrix.gate'))}</h3><p>${esc(gate.rotulo)}</p>` +
      (playbook?.resumo ? `<p class="muted">${esc(playbook.resumo)}</p>` : '') +
      `<p class="muted">${esc(ctx.t('s.matrix.gate.hint'))}</p>`
    : '';
  return (
    `<p class="muted">${esc(ctx.t('s.matrix.hint', { min: m.escala.min, max: m.escala.max }))}</p>` +
    `<ul class="links">${m.opcoes.map((o) => `<li><strong>${esc(o)}</strong></li>`).join('')}</ul>` +
    table([ctx.t('col.goal'), ...m.criterios.map(pretty)], rows, 'matrix') +
    `<p class="muted">${esc(ctx.t('s.matrix.tiebreak'))}: ${esc(m.ordem_desempate.join(' > '))}</p>` +
    gateHtml +
    `<h3>${esc(ctx.t('s.matrix.finance'))}</h3><p class="muted">${esc(ctx.t('s.matrix.finance.hint'))}</p>`
  );
}

/** Ordered list of nodes per lane with their transitions, generated from the Modelo_de_Grafo. Visible without JavaScript. */
export function textoAcessivelHtml(ctx: Ctx, demandaId: string): string {
  const lanes = textoAcessivel(gerarGrafo(ctx.doc(), demandaId));
  return lanes
    .map((r) => {
      const items = r.nos
        .map((n) => {
          const out = n.transicoes
            .map((t) => {
              const cond = t.rotulo ? `${esc(t.rotulo)}: ` : '';
              const alvo = `${esc(t.destinoRotulo)} (${esc(t.destinoRaia)})`;
              return `<li>${esc(ctx.t(t.tracejada ? 'flow.text.cross' : 'flow.text.to'))} ${cond}${alvo}</li>`;
            })
            .join('');
          return (
            `<li><strong>${esc(n.rotulo)}</strong> <span class="muted">(${esc(ctx.t(`node.${n.tipo}`))})</span>` +
            (out ? `<ul>${out}</ul>` : '') +
            `</li>`
          );
        })
        .join('');
      return `<h3>${esc(r.nome)}</h3><ol>${items}</ol>`;
    })
    .join('');
}

/** UI strings the island needs on the client (progress and error messages of the redraw queue). Sent in the page, never bundled. */
export const CHAVES_DO_CLIENTE = [
  'flow.progress.drawing',
  'flow.progress.drawing.nodes',
  'flow.progress.elapsed',
  'flow.error.render',
  'flow.error.limit',
  'flow.error.retry',
  'flow.error.textual',
  'flow.error.graph',
  'flow.persp.label',
  'flow.persp.mermaid',
  'flow.gestures.help',
  'flow.zoom.group',
  'flow.zoom.in',
  'flow.zoom.out',
  'flow.zoom.reset',
  'flow.raias.group',
  'flow.raias.resumo',
  'flow.raias.expandir',
  'flow.raias.expandir.rotulo',
  'flow.raias.recolher',
  'flow.raias.recolher.rotulo',
  'flow.raias.abrir',
  'flow.raias.abrir.rotulo',
  'flow.raias.expandir_tudo',
  'flow.raias.recolher_tudo',
  'flow.raias.alternador',
  'flow.raias.alternador.rotulo',
  'flow.voltar',
  'flow.voltar.rotulo',
  'flow.cluster.label',
] as const;

const LEGENDA = ['inicio', 'tarefa', 'bifurcacao', 'chamada', 'fim', 'subtarefa', 'subtarefa.cond'] as const;

/** The Demandas of the selector: the guide order (`ordem_das_demandas`), library entries left out. */
export function demandasDoSeletor(ctx: Ctx): Page[] {
  // `ordem_das_demandas` lives in the `comum` entity (the merged guide document keeps only the demand list, in that same order).
  const ordem = ctx.index.byId.get('comum')?.entity.data.ordem_das_demandas;
  const doc = Array.isArray((ctx.doc() as Item).demandas) ? ((ctx.doc() as Item).demandas as Item[]).map((d) => String(d.id)) : [];
  const ids = (Array.isArray(ordem) ? (ordem as unknown[]).map(String) : doc).filter((id) => id !== 'comum');
  const pages: Page[] = [];
  for (const id of ids) {
    const p = ctx.index.byId.get(id);
    if (p && p.tipo === 'demanda' && p.entity.data.biblioteca !== true) pages.push(p);
  }
  return pages;
}

/** Island of the Diagrama. Server HTML only: the controls start `hidden` and the island shows them once it runs, so without
 *  JavaScript the page keeps the textual alternative and the playbooks (Requirement 2.10). */
function ilhaDoDiagrama(ctx: Ctx, page: Page, raias: Item[]): string {
  const demandas = demandasDoSeletor(ctx);
  const opcoes = demandas
    .map((p) => `<option value="${esc(ctx.href(p.route))}"${p.id === page.id ? ' selected' : ''}>${esc(p.nome)}</option>`)
    .join('');
  const aba = (view: string, texto: string, n: number, cor?: string): string =>
    `<button type="button" role="tab" id="flow-tab-${n}" class="flow-tab${cor ? ' flow-tab--raia' : ''}" data-view="${esc(view)}" aria-selected="${view === 'geral'}" aria-controls="flow-panel" tabindex="${view === 'geral' ? 0 : -1}"${cor ? ` style="--raia-cor:${esc(cor)}"` : ''}>` +
    (cor ? `<span class="swatch" aria-hidden="true"></span> ` : '') +
    `${esc(texto)}</button>`;
  const abas = [
    aba('geral', ctx.t('flow.tab.geral'), 0),
    ...raias.map((r, i) => aba(`raia:${r.id}`, String(r.nome), i + 1, String(r.cor ?? '#888888'))),
    aba('completo', ctx.t('flow.tab.completo'), raias.length + 1),
  ].join('');
  const legenda = LEGENDA.map(
    (k) => `<li><span class="flow-legend__icon flow-legend__icon--${k.replace('.', '-')}" aria-hidden="true"></span>${esc(ctx.t(`flow.legend.${k}`))}</li>`,
  ).join('');
  const textos = Object.fromEntries(CHAVES_DO_CLIENTE.map((k) => [k, ctx.t(k)]));
  return (
    `<div class="flow-app" data-island="flow" data-flow-id="${esc(page.id)}" data-flow-base="${esc(ctx.base)}" data-flow-locale="${esc(ctx.locale)}" data-flow-i18n="${esc(JSON.stringify(textos))}">` +
    `<noscript><p class="muted">${esc(ctx.t('flow.nojs'))}</p></noscript>` +
    `<div class="flow-controls" data-flow-controls hidden>` +
    `<div class="flow-toolbar"><label for="flow-demanda">${esc(ctx.t('flow.demand.label'))}</label>` +
    `<select id="flow-demanda" data-flow-select>${opcoes}</select></div>` +
    `<div class="flow-tabs" role="tablist" aria-label="${esc(ctx.t('flow.tabs.label'))}" data-flow-tabs>${abas}</div>` +
    `<div id="flow-panel" class="flow-stage" role="tabpanel" tabindex="0" aria-labelledby="flow-tab-0" data-flow-stage></div>` +
    `<div class="flow-legend"><h3>${esc(ctx.t('flow.legend.title'))}</h3><ul>${legenda}</ul></div>` +
    `</div></div>`
  );
}

export function renderDemand(ctx: Ctx, page: Page): { html: string; diagrams: number; flow: boolean } {
  const d = page.entity.data;
  const raias = Array.isArray(d.raias) ? (d.raias as Item[]) : [];
  const decisoes = Array.isArray(d.decisoes) ? (d.decisoes as Item[]) : [];
  const playbooks = new Map((Array.isArray(d.playbooks) ? (d.playbooks as Item[]) : []).map((p) => [String(p.id), p]));
  const library = d.biblioteca === true;
  let diagramHtml = '';
  let textHtml = '';
  if (!library && raias.length) {
    diagramHtml = ilhaDoDiagrama(ctx, page, raias);
    textHtml = textoAcessivelHtml(ctx, page.id);
  }
  const raiaRows = raias.map((r) => [
    `<span class="swatch" style="background:${esc(r.cor ?? '#888888')}" aria-hidden="true"></span> ${esc(r.nome)}`,
    esc(r.responsabilidade ?? ''),
    r.orquestradora ? esc(ctx.t('yes')) : '',
  ]);
  const byRaia = new Map<string, Item[]>();
  for (const n of decisoes) (byRaia.get(String(n.raia)) ?? byRaia.set(String(n.raia), []).get(String(n.raia))!).push(n);
  const playbookHtml = raias
    .map((r) => {
      const nodes = (byRaia.get(String(r.id)) ?? []).filter((n) => n.playbook && playbooks.has(String(n.playbook)));
      if (nodes.length === 0) return '';
      return (
        `<h3>${esc(r.nome)}</h3>` +
        nodes
          .map((n) => {
            const pb = playbooks.get(String(n.playbook)) as Item;
            const q = Array.isArray(pb.perguntas_chave) ? (pb.perguntas_chave as string[]) : [];
            return (
              `<details><summary>${esc(n.rotulo)} <span class="muted">(${esc(ctx.t(`node.${n.tipo}`))})</span></summary>` +
              `<p>${inline(ctx, String(pb.resumo ?? ''))}</p>` +
              (q.length ? `<ul>${q.map((x) => `<li>${esc(x.replace(/^"|"$/g, ''))}</li>`).join('')}</ul>` : '') +
              `</details>`
            );
          })
          .join('')
      );
    })
    .join('');
  const papeis = Array.isArray(d.papeis) ? (d.papeis as Item[]) : [];
  const papeisHtml = papeis.length ? `<ul class="links">${papeis.map((p) => `<li><strong>${esc(p.nome)}</strong>: ${inline(ctx, String(p.descricao ?? ''))}</li>`).join('')}</ul>` : '';
  const html =
    dl([
      [label(ctx, 'sigla'), val(ctx, d.sigla)],
      [ctx.t('col.nodes'), esc(decisoes.length)],
      [ctx.t('col.lanes'), esc(raias.length)],
    ]) +
    section(ctx.t('s.diagrams'), diagramHtml ? `<p class="muted">${esc(ctx.t('s.diagrams.hint'))}</p>${diagramHtml}` : '', 'diagrams') +
    section(ctx.t('s.textflow'), textHtml ? `<p class="muted">${esc(ctx.t('s.textflow.hint'))}</p>${textHtml}` : '', 'textflow') +
    section(ctx.t('s.lanes'), table([ctx.t('col.lane'), ctx.t('col.responsibility'), ctx.t('col.orchestrator')], raiaRows)) +
    section(ctx.t('s.playbooks'), playbookHtml) +
    section(ctx.t('s.roles'), papeisHtml) +
    section(ctx.t('s.matrix'), matrizTable(ctx));
  return { html, diagrams: 0, flow: diagramHtml !== '' };
}
