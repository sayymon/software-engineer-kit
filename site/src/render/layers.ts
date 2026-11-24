// SPDX-License-Identifier: MIT
// Listing pages: home, layer hubs, sections, licenses hub and journeys. Static lists, search is handled by Pagefind.
import type { Page, SiteLayer } from '@lib/content/site';
import { type Ctx, anchor, cardList, esc, groupBy, inline, section, table, val } from './util';
import { LAYER_PAGES, LICENSES_SLUG } from './routes';
import { licenseNotice } from './entity';

/** Sections of a layer: the sub folders that hold entities, in a stable order. */
export function sectionsOf(ctx: Ctx, layer: SiteLayer): Array<{ dir: string; key: string; pages: Page[] }> {
  const pages = ctx.index.ofLayer(layer);
  const byDir = new Map<string, Page[]>();
  for (const p of pages) {
    const parts = p.route.split('/');
    const dir = parts.length > 2 ? parts.slice(0, -1).join('/') : layer;
    (byDir.get(dir) ?? byDir.set(dir, []).get(dir)!).push(p);
  }
  return [...byDir.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([dir, list]) => ({ dir, key: dir === layer ? 'root' : dir.slice(layer.length + 1).replace(/\//g, '.'), pages: list }));
}

function sectionTitle(ctx: Ctx, layer: string, key: string): string {
  const k = `section.${layer}.${key}`;
  return ctx.t.has(k) ? ctx.t(k) : key;
}

function groupKey(ctx: Ctx, p: Page): string {
  const d = p.entity.data;
  switch (p.tipo) {
    case 'algoritmo':
      return String(d.area ?? '');
    case 'categoria':
      return String(d.grupo ?? '');
    case 'guia-pratico':
      return String(d.grupo ?? '');
    case 'certificacao':
      return String(d.emissor ?? '');
    case 'padrao':
      return String(d.familia ?? '');
    case 'estrutura-de-dados':
      return String(d.familia ?? '');
    case 'stack':
      return String(d.dominio ?? '');
    case 'modelo':
      return String(d.familia ?? '');
    default:
      return p.nome.charAt(0).toUpperCase();
  }
}

function groupedList(ctx: Ctx, pages: Page[]): string {
  const groups = groupBy(pages, (p) => groupKey(ctx, p), ctx.locale);
  if (groups.length <= 1) return cardList(ctx, pages);
  return groups.map(([g, list]) => `<h3 id="g-${esc(g.toLowerCase().replace(/[^a-z0-9]+/g, '-'))}">${esc(ctx.t.has(`area.${g}`) ? ctx.t(`area.${g}`) : g || '-')} <span class="count">${list.length}</span></h3>${cardList(ctx, list)}`).join('');
}

export function renderLayer(ctx: Ctx, layer: SiteLayer): string {
  const secs = sectionsOf(ctx, layer);
  const hubs = ctx.index.ofTipo('hub').filter((h) => h.entity.data.camada === layer).sort((a, b) => Number(a.entity.data.ordem ?? 0) - Number(b.entity.data.ordem ?? 0));
  const direct = secs.find((s) => s.dir === layer);
  const sectionLinks = secs.filter((s) => s.dir !== layer);
  const cards = sectionLinks
    .map(
      (s) =>
        `<li><a href="${esc(ctx.href(s.dir))}">${esc(sectionTitle(ctx, layer, s.key))}</a><span class="muted">${esc(ctx.t('count.items', { n: s.pages.length }))}</span></li>`,
    )
    .join('');
  return (
    `<header class="entity-head"><p class="eyebrow">${esc(ctx.t('layer.label'))}</p><h1>${esc(ctx.t(`layer.${layer}`))}</h1><p class="lede">${esc(ctx.t(`layerdesc.${layer}`))}</p></header>` +
    (sectionLinks.length ? section(ctx.t('s.sections'), `<ul class="cards">${cards}</ul>`) : '') +
    (direct ? section(ctx.t('s.all'), groupedList(ctx, direct.pages)) : '') +
    (layer === 'fundamentals' ? section(ctx.t('layer.licenses'), `<ul class="cards"><li><a href="${esc(ctx.href(LICENSES_SLUG))}">${esc(ctx.t('licenses.title'))}</a><span class="muted">${esc(ctx.t('licenses.lede'))}</span></li></ul>`) : '') +
    (hubs.length ? section(ctx.t('s.maps'), `<ul class="links">${hubs.map((h) => `<li>${anchor(ctx, h)}</li>`).join('')}</ul>`) : '')
  );
}

export function renderSection(ctx: Ctx, layer: SiteLayer, dir: string): string {
  const pages = ctx.index.ofLayer(layer).filter((p) => p.route.split('/').slice(0, -1).join('/') === dir);
  const key = dir.slice(layer.length + 1).replace(/\//g, '.');
  return (
    `<header class="entity-head"><p class="eyebrow"><a href="${esc(ctx.href(layer))}">${esc(ctx.t(`layer.${layer}`))}</a></p><h1>${esc(sectionTitle(ctx, layer, key))}</h1>` +
    `<p class="lede">${esc(ctx.t('count.items', { n: pages.length }))}</p></header>` +
    groupedList(ctx, pages)
  );
}

export function renderLicenses(ctx: Ctx): string {
  const pages = ctx.index.ofTipo('licenca');
  const guide = ctx.index.byId.get('guia_de_escolha_de_licenca');
  const rows = pages
    .sort((a, b) => a.nome.localeCompare(b.nome, ctx.locale))
    .map((p) => [anchor(ctx, p), esc(String(p.entity.data.spdx ?? '')), esc(String(p.entity.data.tipoLicenca ?? '')), esc(val(ctx, p.entity.data.aprovacaoOSI) || String(p.entity.data.aprovacaoOSI ?? ''))]);
  return (
    `<header class="entity-head"><p class="eyebrow"><a href="${esc(ctx.href('fundamentals'))}">${esc(ctx.t('layer.fundamentals'))}</a></p><h1>${esc(ctx.t('licenses.title'))}</h1><p class="lede">${esc(ctx.t('licenses.lede'))}</p></header>` +
    licenseNotice(ctx) +
    (guide ? `<section class="block"><h2>${esc(ctx.t('licenses.guide'))}</h2><p>${anchor(ctx, guide)}</p></section>` : '') +
    `<section class="block"><h2>${esc(ctx.t('licenses.thisKit'))}</h2><p>${esc(ctx.t('footer.license'))}</p></section>` +
    section(
      ctx.t('licenses.list'),
      rows.length
        ? table([ctx.t('col.name'), 'SPDX', ctx.t('col.licenseType'), 'OSI'], rows)
        : `<p class="muted">${esc(ctx.t('licenses.empty'))}</p>`,
    )
  );
}

type Autoavaliacao = Array<{ nome: string; itens: string[] }>;
type RegraInvestimento = Array<{ camada: string; regra: string }>;

export function renderJourneys(ctx: Ctx): string {
  const jornadas = ctx.index.ofTipo('jornada');
  const competencias = ctx.index.ofTipo('competencia');
  const comp = ctx.data<{ autoavaliacao?: Autoavaliacao; regraInvestimento?: RegraInvestimento }>('competencias.json');
  const jornadaHtml = jornadas
    .map((j) => {
      const etapas = Array.isArray(j.entity.data.etapas) ? (j.entity.data.etapas as Array<Record<string, unknown>>) : [];
      return (
        `<article class="variant"><h3>${anchor(ctx, j)}</h3>` +
        (j.entity.data.descricao ? `<p>${inline(ctx, String(j.entity.data.descricao))}</p>` : '') +
        (etapas.length ? `<ol class="steps">${etapas.map((e) => `<li><strong>${esc(e.titulo)}</strong>${e.descricao ? `: ${esc(e.descricao)}` : ''}</li>`).join('')}</ol>` : '') +
        `</article>`
      );
    })
    .join('');
  const compHtml = competencias
    .map((c) => `<li>${anchor(ctx, c)}<span class="muted">${esc(String(c.entity.data.meiaVida ?? ''))}</span></li>`)
    .join('');
  const rules = (comp.regraInvestimento ?? []).map((r) => `<li><strong>${esc(r.camada)}</strong>: ${esc(r.regra)}</li>`).join('');
  const self = (comp.autoavaliacao ?? [])
    .map((g) => `<h3>${esc(g.nome)}</h3><ul class="checklist">${g.itens.map((i) => `<li><label><input type="checkbox"> ${esc(i)}</label></li>`).join('')}</ul>`)
    .join('');
  return (
    `<header class="entity-head"><p class="eyebrow">${esc(ctx.t('layer.label'))}</p><h1>${esc(ctx.t('layer.journeys'))}</h1><p class="lede">${esc(ctx.t('layerdesc.journeys'))}</p></header>` +
    section(ctx.t('s.journeys'), jornadaHtml) +
    section(ctx.t('s.competencies'), compHtml ? `<ul class="cards">${compHtml}</ul>` : '') +
    section(ctx.t('s.investmentRule'), rules ? `<ul class="links">${rules}</ul>` : '') +
    section(ctx.t('s.selfAssessment'), self)
  );
}

export function renderHome(ctx: Ctx): string {
  const cards = LAYER_PAGES.map((layer) => {
    const count = ctx.index.ofLayer(layer).length;
    return `<li><a href="${esc(ctx.href(layer))}">${esc(ctx.t(`layer.${layer}`))}</a><span class="muted">${esc(ctx.t(`layerdesc.${layer}`))}</span><span class="count">${esc(ctx.t('count.items', { n: count }))}</span></li>`;
  }).join('');
  return (
    `<header class="hero"><p class="eyebrow">${esc(ctx.t('site.tagline'))}</p><h1>${esc(ctx.t('site.title'))}</h1><p class="lede">${esc(ctx.t('home.lede'))}</p>` +
    `<form class="search-box hero-search" role="search" action="${esc(ctx.href('search'))}" method="get"><label class="sr-only" for="hero-q">${esc(ctx.t('search.label'))}</label>` +
    `<input id="hero-q" type="search" name="q" placeholder="${esc(ctx.t('search.placeholder'))}" autocomplete="off"><button type="submit">${esc(ctx.t('search.button'))}</button></form></header>` +
    section(ctx.t('home.layers'), `<ul class="cards layer-cards">${cards}</ul>`)
  );
}
