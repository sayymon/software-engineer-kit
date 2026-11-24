// SPDX-License-Identifier: MIT
// Demand flow pages: raias with responsabilidade, Mermaid views, playbooks and the build, buy or subscribe matrix.
import type { Page } from '@lib/content/site';
import { gerarDiagrama } from '@lib/flow-mermaid';
import { type Ctx, diagram, esc, inline, label, section, table, dl, val } from './util';

type Item = Record<string, any>;

export type Matriz = {
  opcoes: Record<string, string>;
  criterios: string[];
  escala: { min: number; max: number };
  leitura_da_nota?: string;
  ordem_desempate: string[];
  pesos: Record<string, Record<string, number>>;
};

const pretty = (id: string) => id.replace(/_/g, ' ');

export function matrizTable(ctx: Ctx): string {
  const m = ctx.data<Matriz>('matriz.json');
  const options = Object.entries(m.opcoes).map(([k, v]) => `<li><strong>${esc(k)}</strong>: ${esc(v)}</li>`).join('');
  const rows = Object.entries(m.pesos).map(([objetivo, pesos]) => [
    esc(pretty(objetivo)),
    ...m.criterios.map((c) => esc(String(pesos[c]))),
  ]);
  return (
    `<p class="muted">${esc(ctx.t('s.matrix.hint', { min: m.escala.min, max: m.escala.max }))}</p>` +
    `<ul class="links">${options}</ul>` +
    table([ctx.t('col.goal'), ...m.criterios.map(pretty)], rows, 'matrix') +
    (m.leitura_da_nota ? `<p class="muted">${esc(m.leitura_da_nota)}</p>` : '') +
    `<p class="muted">${esc(ctx.t('s.matrix.tiebreak'))}: ${esc(m.ordem_desempate.join(' > '))}</p>`
  );
}

export function renderDemand(ctx: Ctx, page: Page): { html: string; diagrams: number } {
  const d = page.entity.data;
  const raias = Array.isArray(d.raias) ? (d.raias as Item[]) : [];
  const decisoes = Array.isArray(d.decisoes) ? (d.decisoes as Item[]) : [];
  const playbooks = new Map((Array.isArray(d.playbooks) ? (d.playbooks as Item[]) : []).map((p) => [String(p.id), p]));
  const library = d.biblioteca === true;
  let diagrams = 0;
  let diagramHtml = '';
  if (!library && raias.length) {
    const doc = ctx.doc();
    for (const view of ['visao', 'completo'] as const) {
      const g = gerarDiagrama(doc, page.id, view);
      diagramHtml += diagram(ctx, `${page.id}.${view}`, ctx.t(`view.${view}`), g.texto);
      diagrams += 1;
    }
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
    section(ctx.t('s.lanes'), table([ctx.t('col.lane'), ctx.t('col.responsibility'), ctx.t('col.orchestrator')], raiaRows)) +
    section(ctx.t('s.playbooks'), playbookHtml) +
    section(ctx.t('s.roles'), papeisHtml) +
    section(ctx.t('s.matrix'), matrizTable(ctx));
  return { html, diagrams };
}
