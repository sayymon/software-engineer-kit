// SPDX-License-Identifier: MIT
// Static JSON API payloads. A backend can replace these endpoints later; ids stay the keys.
import type { Page } from '@lib/content/site';
import { gerarDiagrama } from '@lib/flow-mermaid';
import { construirFatos } from '@lib/ecossistema/fatos';
import { construirPayload, construirShards } from '@lib/ecossistema/payload';
import type { Ctx } from './util';

export function indexJson(ctx: Ctx) {
  return {
    locale: ctx.locale,
    count: ctx.index.pages.length,
    items: ctx.index.pages.map((p) => ({
      id: p.id,
      tipo: p.tipo,
      layer: p.layer,
      nome: p.nome,
      descricao: p.entity.data.descricao ?? '',
      url: ctx.href(p.route),
      fallback: p.entity.fallback,
    })),
  };
}

export function graphJson(ctx: Ctx) {
  return {
    locale: ctx.locale,
    nodes: ctx.index.pages.map((p) => ({ id: p.id, tipo: p.tipo, layer: p.layer, nome: p.nome })),
    edges: ctx.index.edges(),
  };
}

export function flowJson(ctx: Ctx, page: Page) {
  const d = page.entity.data;
  const library = d.biblioteca === true;
  const raias = Array.isArray(d.raias) ? d.raias : [];
  const diagrams: Record<string, string> = {};
  if (!library && raias.length) {
    for (const view of ['visao', 'completo']) diagrams[view] = gerarDiagrama(ctx.doc(), page.id, view).texto;
  }
  return {
    id: page.id,
    tipo: page.tipo,
    locale: ctx.locale,
    nome: page.nome,
    sigla: d.sigla ?? null,
    biblioteca: library,
    raias,
    decisoes: d.decisoes ?? [],
    playbooks: d.playbooks ?? [],
    diagrams,
  };
}

/** Ecossistema 3D: columnar payload of the nucleo and fluxo layers (see lib/ecossistema/payload.ts). */
export function ecossistemaJson(ctx: Ctx) {
  return construirPayload(ctx.index);
}
export function ecossistemaShards(ctx: Ctx) {
  return construirShards(ctx.index);
}
export function ecossistemaFatos(ctx: Ctx) {
  return construirFatos(ctx.index);
}
