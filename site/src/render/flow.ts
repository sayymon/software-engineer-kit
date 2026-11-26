// SPDX-License-Identifier: MIT
// Demand flow pages: raias with responsabilidade, Mermaid views, playbooks and the build, buy or subscribe table read from the guide.
import type { Page } from '@lib/content/site';
import { gerarGrafo, textoAcessivel } from '@lib/flow-graph';
import { gerarDiagramaDoGrafo } from '@lib/flow-mermaid';
import { configDoGuia } from '@lib/decisor';
import { type Ctx, diagram, esc, inline, label, section, table, dl, val } from './util';

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

export function renderDemand(ctx: Ctx, page: Page): { html: string; diagrams: number } {
  const d = page.entity.data;
  const raias = Array.isArray(d.raias) ? (d.raias as Item[]) : [];
  const decisoes = Array.isArray(d.decisoes) ? (d.decisoes as Item[]) : [];
  const playbooks = new Map((Array.isArray(d.playbooks) ? (d.playbooks as Item[]) : []).map((p) => [String(p.id), p]));
  const library = d.biblioteca === true;
  let diagrams = 0;
  let diagramHtml = '';
  let textHtml = '';
  if (!library && raias.length) {
    const grafo = gerarGrafo(ctx.doc(), page.id);
    for (const view of ['visao', 'completo'] as const) {
      const g = gerarDiagramaDoGrafo(grafo, view);
      diagramHtml += diagram(ctx, `${page.id}.${view}`, ctx.t(`view.${view}`), g.texto);
      diagrams += 1;
    }
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
  return { html, diagrams };
}
