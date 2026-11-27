// SPDX-License-Identifier: MIT
// Listing pages: home, layer hubs, sections, licenses hub and journeys. Static lists, search is handled by Pagefind.
import type { Page, SiteLayer } from '@lib/content/site';
import { type Ctx, anchor, cardList, esc, groupBy, inline, section, table, val } from './util';
import { LAYER_PAGES, LICENSES_SLUG } from './routes';
import { licenseNotice } from './entity';
import { GRUPOS } from '@lib/ecossistema/camadas';
import { messages } from '../i18n';

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

/** 24x24 stroke icons by demand id, for the flow chips of the Home. Decorative: the name next to each carries the meaning. */
const ICONE_DEMANDA: Record<string, string> = {
  feature: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z M19 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z',
  bug: 'M8 9h8v7a4 4 0 0 1-8 0z M12 5v4 M4.5 10l3 1 M19.5 10l-3 1 M4.5 16l3-1 M19.5 16l-3-1 M9 4.5l1.5 2 M15 4.5l-1.5 2',
  incidente: 'M12 3l9.5 17h-19z M12 10v4 M12 17v.5',
  chore: 'M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z',
  seguranca: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z M9 12l2 2 4-4',
  spike: 'M9 3h6 M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3 M8 15h8',
  divida_tecnica: 'M12 3l9 5-9 5-9-5z M3 13l9 5 9-5 M3 17.5l9 5 9-5',
  infraestrutura: 'M4 4h16v6H4z M4 14h16v6H4z M8 7h.01 M8 17h.01 M12 7h4 M12 17h4',
  teste_qa: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M8 12l3 3 5-6',
  documentacao: 'M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z M4 19V5 M9 8h6 M9 12h6',
  migracao: 'M4 8h14 M14 4l4 4-4 4 M20 16H6 M10 12l-4 4 4 4',
  descontinuacao: 'M12 3v8 M7 6.5a8 8 0 1 0 10 0',
};
const svgIcone = (id: string) => `<svg class="chip-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="${ICONE_DEMANDA[id] ?? ICONE_DEMANDA.feature}"/></svg>`;
export function renderHome(ctx: Ctx): string {
  const t = ctx.t;
  const other = ctx.locale === 'pt-BR' ? 'en' : 'pt-BR';
  const countOf = (layer: SiteLayer) => ctx.index.ofLayer(layer).length;
  const layerLinks = LAYER_PAGES.map((layer) => `<li><a href="${esc(ctx.href(layer))}">${esc(t(`layer.${layer}`))}</a></li>`).join('');
  const cards = LAYER_PAGES.map((layer) => {
    return `<li><a href="${esc(ctx.href(layer))}">${esc(t(`layer.${layer}`))}</a><span class="muted">${esc(t(`layerdesc.${layer}`))}</span><span class="count">${esc(t('count.items', { n: countOf(layer) }))}</span></li>`;
  }).join('');
  const demandas = ctx.index.ofTipo('demanda').filter((p) => p.entity.data.biblioteca !== true);
  const demandaLinks = demandas.map((p) => `<li><a href="${esc(ctx.href(p.route))}" data-demanda="${esc(p.id)}" data-nome="${esc(p.nome)}" data-legenda="${esc(t.has(`home.flows.cap.${p.id}`) ? t(`home.flows.cap.${p.id}`) : '')}">${svgIcone(p.id)}<span>${esc(p.nome)}</span></a></li>`).join('');
  // Chips that change the animation of scenes 3 and 4. No numbers: the choice is the point. Without JavaScript they are plain links.
  const svg = (d: string) => `<svg class="chip-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="${d}"/></svg>`;
  const ICONE_GRUPO: Record<string, string> = {
    fluxos: 'M6 3v12 M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M18 9a9 9 0 0 1-9 9',
    artefatos: 'M12 3l8 4.5v9L12 21l-8-4.5v-9z M12 12l8-4.5 M12 12v9 M12 12L4 7.5',
    catalogo: 'M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z',
    fundamentos: 'M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z M4 19V5',
    aprendizado: 'M12 14a5 5 0 1 0 0-10 5 5 0 0 0 0 10z M8.5 13.5L7 21l5-3 5 3-1.5-7.5',
    jornada: 'M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z M9 3v15 M15 6v15',
    competencia: 'M5 8h14v10H5z M12 4v4 M9 13h.01 M15 13h.01 M3 12v3 M21 12v3',
    certificacao: 'M12 14a5 5 0 1 0 0-10 5 5 0 0 0 0 10z M8.5 13.5L7 21l5-3 5 3-1.5-7.5',
  };
  const LISTA_GRUPO: Record<string, string> = { fluxos: 'flows', artefatos: 'flows', catalogo: 'tools', fundamentos: 'fundamentals', aprendizado: 'journeys' };
  const chipGrupo = (g: string) => `<li><a href="${esc(ctx.href(LISTA_GRUPO[g]))}" data-grupo="${g}" data-lista="${esc(ctx.href(LISTA_GRUPO[g]))}" data-3d="${esc(`${ctx.href('ecossistema')}#grupo=${g}`)}">${svg(ICONE_GRUPO[g])}<span>${esc(t(`eco.group.${g}`))}</span></a></li>`;
  const grupos = GRUPOS.filter((g) => g !== 'hubs').map(chipGrupo).join('');
  const chipTipo = (tipo: string, lista: string, rotulo: string) => `<li><a href="${esc(ctx.href(lista))}" data-tipo-home="${tipo}" data-lista="${esc(ctx.href(lista))}" data-3d="${esc(`${ctx.href('ecossistema')}#tipo=${tipo}`)}">${svg(ICONE_GRUPO[tipo])}<span>${esc(rotulo)}</span></a></li>`;
  const tiposJornada = chipTipo('jornada', 'journeys', t('home.chip.jornada')) + chipTipo('competencia', 'journeys', t('home.chip.competencia')) + chipTipo('certificacao', 'certifications', t('home.chip.certificacao'));
  const acoes = (lista: string, tres: string) =>
    `<p class="home-links"><a class="glass-btn" data-acao="lista" href="${esc(ctx.href(lista))}">${esc(t('home.viewList'))}</a> <a class="glass-btn" data-acao="3d" href="${esc(tres)}">${esc(t('home.view3d'))}</a></p>`;
  const cena = (id: string, faixa: string, corpo: string, extra = '') =>
    `<section id="cena-${id}" class="cena" data-cena="${id}" style="--faixa:${faixa}" aria-labelledby="titulo-${id}"><div class="cena-fixa"><div class="cena-texto">${corpo}</div>${extra}</div></section>`;
  const indicador = ['apresentacao', 'fluxos', 'catalogo', 'jornadas']
    .map((id, i) => `<li><a href="#cena-${id}" data-cena-link="${id}"${i === 0 ? ' aria-current="true"' : ''}><span class="sr-only">${esc(t(`home.scene.${id}`))}</span></a></li>`)
    .join('');
  return (
    `<div class="home" data-home data-base="${esc(ctx.base)}" id="topo">` +
    `<script type="application/json" id="home-i18n">${JSON.stringify(Object.fromEntries(Object.entries(messages[ctx.locale]).filter(([k]) => k.startsWith('tipo.')))).replace(/</g, '\\u003c')}</script>` +
    `<nav class="home-lang" aria-label="${esc(t('lang.label'))}"><a href="${esc(ctx.href(''))}" lang="${ctx.locale}" aria-current="true">${ctx.locale === 'pt-BR' ? 'PT' : 'EN'}</a><a href="${esc(`${ctx.base}/${other}/`)}" lang="${other}" hreflang="${other}" aria-label="${esc(t(`lang.switchTo.${other}`))}">${other === 'pt-BR' ? 'PT' : 'EN'}</a></nav>` +
    `<a class="pular" href="#fim">${esc(t('home.skip.visible'))}</a>` +
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
        `<p class="flow-dica">${esc(t('home.flows.pick'))}</p>` +
        `<ul class="home-chips" role="list" aria-label="${esc(t('home.flows.select'))}">${demandaLinks}</ul>` +
        `<p class="cena-acao"><a class="glass-btn" href="${esc(ctx.href('flows'))}">${esc(t('home.flows.open'))}</a></p>`,
      `<div class="flow-legenda" aria-live="polite" hidden><p class="flow-nome"></p><p class="flow-desc"></p></div>`,
    ) +
    cena(
      'catalogo',
      '300vh',
      `<p class="eyebrow">${esc(t('home.scene.catalogo'))}</p><h2 id="titulo-catalogo">${esc(t('home.catalog.title'))}</h2><p class="lede">${esc(t('home.catalog.lede'))}</p>` +
        `<ul class="home-chips home-grupos" role="list" aria-label="${esc(t('home.catalog.groups'))}">${grupos}</ul>` +
        acoes('tools', ctx.href('ecossistema')),
    ) +
    cena(
      'jornadas',
      '300vh',
      `<p class="eyebrow">${esc(t('home.scene.jornadas'))}</p><h2 id="titulo-jornadas">${esc(t('home.journeys.title'))}</h2><p class="lede">${esc(t('home.journeys.lede'))}</p>` +
        `<ul class="home-chips home-tipos" role="list" aria-label="${esc(t('home.journeys.groups'))}">${tiposJornada}</ul>` +
        acoes('journeys', `${ctx.href('ecossistema')}#grupo=aprendizado`),
    ) +
    `<section id="fim" class="home-fim" aria-labelledby="titulo-fim"><h2 id="titulo-fim">${esc(t('home.layers'))}</h2><ul class="cards layer-cards">${cards}</ul></section>` +
    `</div>`
  );
}
