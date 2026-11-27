// SPDX-License-Identifier: MIT
// Listing pages: home, layer hubs, sections, licenses hub and journeys. Static lists, search is handled by Pagefind.
import type { Page, SiteLayer } from '@lib/content/site';
import { type Ctx, anchor, cardList, esc, groupBy, inline, section, table, val } from './util';
import { LAYER_PAGES, LICENSES_SLUG } from './routes';
import { licenseNotice } from './entity';
import { GRUPOS, camadaDe, grupoDe } from '@lib/ecossistema/camadas';

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
  const t = ctx.t;
  const other = ctx.locale === 'pt-BR' ? 'en' : 'pt-BR';
  const countOf = (layer: SiteLayer) => ctx.index.ofLayer(layer).length;
  const layerLinks = LAYER_PAGES.map((layer) => `<li><a href="${esc(ctx.href(layer))}">${esc(t(`layer.${layer}`))}</a></li>`).join('');
  const cards = LAYER_PAGES.map((layer) => {
    return `<li><a href="${esc(ctx.href(layer))}">${esc(t(`layer.${layer}`))}</a><span class="muted">${esc(t(`layerdesc.${layer}`))}</span><span class="count">${esc(t('count.items', { n: countOf(layer) }))}</span></li>`;
  }).join('');
  const demandas = ctx.index.ofTipo('demanda').filter((p) => p.entity.data.biblioteca !== true);
  const demandaLinks = demandas.map((p) => `<li><a href="${esc(ctx.href(p.route))}" data-demanda="${esc(p.id)}">${esc(p.nome)}</a></li>`).join('');
  // Counts per visual group, from the same rule the 3D ecosystem uses (the detail layer is not counted).
  const porGrupo = new Map<string, number>();
  for (const p of ctx.index.pages) {
    if (camadaDe(p.tipo) === 'detalhe') continue;
    const g = grupoDe(p.tipo);
    porGrupo.set(g, (porGrupo.get(g) ?? 0) + 1);
  }
  const grupos = GRUPOS.filter((g) => g !== 'hubs' && porGrupo.has(g))
    .map((g) => `<li data-grupo="${g}"><span class="home-count">${porGrupo.get(g)}</span> <span>${esc(t(`eco.group.${g}`))}</span></li>`)
    .join('');
  const cena = (id: string, faixa: string, corpo: string) =>
    `<section id="cena-${id}" class="cena" data-cena="${id}" style="--faixa:${faixa}" aria-labelledby="titulo-${id}"><div class="cena-fixa"><div class="cena-texto">${corpo}</div></div></section>`;
  const indicador = ['apresentacao', 'fluxos', 'catalogo', 'jornadas']
    .map((id, i) => `<li><a href="#cena-${id}" data-cena-link="${id}"${i === 0 ? ' aria-current="true"' : ''}><span class="sr-only">${esc(t(`home.scene.${id}`))}</span></a></li>`)
    .join('');
  return (
    `<div class="home" data-home id="topo">` +
    `<nav class="atalhos" aria-label="${esc(t('nav.label'))}"><a class="atalhos-marca" href="${esc(ctx.href(''))}">${esc(t('site.title'))}</a>` +
    `<ul class="atalhos-lista">${layerLinks}</ul>` +
    `<a class="atalhos-eco" href="${esc(ctx.href('ecossistema'))}">${esc(t('nav.ecosystem'))}</a>` +
    `<form class="atalhos-busca" role="search" action="${esc(ctx.href('search'))}" method="get"><label class="sr-only" for="atalho-q">${esc(t('search.label'))}</label><input id="atalho-q" type="search" name="q" placeholder="${esc(t('search.placeholder'))}" autocomplete="off"></form>` +
    `<span class="atalhos-lang"><a href="${esc(ctx.href(''))}" lang="${ctx.locale}" aria-current="true">${ctx.locale === 'pt-BR' ? 'PT' : 'EN'}</a><a href="${esc(`${ctx.base}/${other}/`)}" lang="${other}" hreflang="${other}" aria-label="${esc(t(`lang.switchTo.${other}`))}">${other === 'pt-BR' ? 'PT' : 'EN'}</a></span></nav>` +
    `<a class="pular" href="#fim">${esc(t('home.skip'))}</a>` +
    `<nav class="indicador" aria-label="${esc(t('home.scenes'))}"><ol>${indicador}</ol></nav>` +
    cena(
      'apresentacao',
      '230vh',
      `<p class="eyebrow">${esc(t('site.tagline'))}</p>` +
        `<h1 class="hero-title" id="titulo-apresentacao" data-hero-title><span class="hero-title-text">${esc(t('site.title'))}</span></h1>` +
        `<p class="lede">${esc(t('home.lede'))}</p>` +
        `<div class="hero-actions"><form class="search-box hero-search" role="search" action="${esc(ctx.href('search'))}" method="get"><label class="sr-only" for="hero-q">${esc(t('search.label'))}</label>` +
        `<input id="hero-q" type="search" name="q" placeholder="${esc(t('search.placeholder'))}" autocomplete="off"><button type="submit">${esc(t('search.button'))}</button></form>` +
        `<a class="glass-btn" href="${esc(ctx.href('ecossistema'))}">${esc(t('home.ecosystem'))}</a></div>`,
    ) +
    cena(
      'fluxos',
      '340vh',
      `<p class="eyebrow">${esc(t('home.scene.fluxos'))}</p><h2 id="titulo-fluxos">${esc(t('home.flows.title'))}</h2><p class="lede">${esc(t('home.flows.lede'))}</p>` +
        `<ul class="home-chips" role="list" aria-label="${esc(t('home.flows.select'))}">${demandaLinks}</ul>` +
        `<p><a class="glass-btn" href="${esc(ctx.href('flows'))}">${esc(t('home.flows.open'))}</a></p>`,
    ) +
    cena(
      'catalogo',
      '300vh',
      `<p class="eyebrow">${esc(t('home.scene.catalogo'))}</p><h2 id="titulo-catalogo">${esc(t('home.catalog.title'))}</h2><p class="lede">${esc(t('home.catalog.lede'))}</p>` +
        `<ul class="home-groups">${grupos}</ul>` +
        `<p class="home-links"><a class="glass-btn" href="${esc(ctx.href('tools'))}">${esc(t('home.catalog.list'))}</a> <a class="glass-btn" href="${esc(ctx.href('ecossistema'))}">${esc(t('home.ecosystem'))}</a></p>`,
    ) +
    cena(
      'jornadas',
      '300vh',
      `<p class="eyebrow">${esc(t('home.scene.jornadas'))}</p><h2 id="titulo-jornadas">${esc(t('home.journeys.title'))}</h2><p class="lede">${esc(t('home.journeys.lede'))}</p>` +
        `<ul class="home-groups"><li><span class="home-count">${ctx.index.ofTipo('jornada').length}</span> <span>${esc(t('tipo.jornada'))}</span></li><li><span class="home-count">${ctx.index.ofTipo('competencia').length}</span> <span>${esc(t('tipo.competencia'))}</span></li><li><span class="home-count">${ctx.index.ofTipo('certificacao').length}</span> <span>${esc(t('tipo.certificacao'))}</span></li></ul>` +
        `<p class="home-links"><a class="glass-btn" href="${esc(ctx.href('journeys'))}">${esc(t('layer.journeys'))}</a> <a class="glass-btn" href="${esc(ctx.href('certifications'))}">${esc(t('layer.certifications'))}</a></p>`,
    ) +
    `<section id="fim" class="home-fim" aria-labelledby="titulo-fim"><h2 id="titulo-fim">${esc(t('home.layers'))}</h2><ul class="cards layer-cards">${cards}</ul></section>` +
    `</div>`
  );
}
