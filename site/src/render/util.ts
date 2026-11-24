// SPDX-License-Identifier: MIT
// HTML helpers shared by the page renderers. Everything that comes from content goes through `esc`.
import type { SiteIndex, Page } from '@lib/content/site';
import { parseWikilinks } from '@lib/wikilinks';
import type { TabelaRow } from '@lib/schema/tabela';
import type { Doc } from '@lib/flows';
import type { T } from '../i18n';

export type Ctx = {
  locale: 'pt-BR' | 'en';
  /** Site base path without trailing slash ('' for the domain root). */
  base: string;
  t: T & { has: (key: string) => boolean };
  index: SiteIndex;
  rowById: Map<string, TabelaRow>;
  rowsByCategory: Map<string, TabelaRow[]>;
  /** Link target for a route path (without locale), e.g. `tools/catalog/git`. */
  href: (route: string) => string;
  data: <T>(name: string) => T;
  doc: () => Doc;
};

export const UNVERIFIED = 'não verificado';

export function esc(value: unknown): string {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function isUrl(s: string): boolean {
  return /^https?:\/\/\S+$/.test(s);
}

export function ext(url: string, label?: string): string {
  return isUrl(url) ? `<a href="${esc(url)}" rel="noopener noreferrer">${esc(label ?? url)}</a>` : esc(label ?? url);
}

export function anchor(ctx: Ctx, page: Page, label?: string): string {
  return `<a href="${esc(ctx.href(page.route))}">${esc(label ?? page.nome)}</a>`;
}

/** Text with wikilinks resolved to anchors and `tabela:<id>` rows shown by name. Everything else is escaped. */
export function inline(ctx: Ctx, s: string): string {
  const row = /^tabela:([a-z0-9_.-]+)$/.exec(s);
  if (row) {
    const r = ctx.rowById.get(row[1]);
    return esc(r ? r.nome : row[1]);
  }
  if (s === UNVERIFIED) return esc(ctx.t('unverified'));
  if (isUrl(s)) return ext(s);
  const links = parseWikilinks(s);
  if (links.length === 0) return esc(s);
  let out = '';
  let cursor = 0;
  for (const l of links) {
    out += esc(s.slice(cursor, l.start));
    const page = ctx.index.resolve(l.id);
    out += page ? anchor(ctx, page, l.label ?? page.nome) : esc(l.label ?? l.id);
    cursor = l.end;
  }
  return out + esc(s.slice(cursor));
}

const MONEY = new Set(['precoUSD', 'precoMedio', 'precoEntradaUSD', 'precoSaidaUSD', 'precoCacheUSD', 'custoUSD']);

/** Generic value renderer: scalars, lists, and nested objects as definition lists. */
export function val(ctx: Ctx, value: unknown, key = ''): string {
  if (value === null || value === undefined || value === '') return '';
  if (typeof value === 'boolean') return esc(ctx.t(value ? 'yes' : 'no'));
  if (typeof value === 'number') {
    const n = value.toLocaleString(ctx.locale === 'en' ? 'en-US' : 'pt-BR', { maximumFractionDigits: 6 });
    return MONEY.has(key) ? `US$ ${esc(n)}` : esc(n);
  }
  if (typeof value === 'string') return inline(ctx, value);
  if (Array.isArray(value)) {
    const items = value.map((v) => val(ctx, v, key)).filter(Boolean);
    if (items.length === 0) return '';
    return `<ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>`;
  }
  if (typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>)
      .map(([k, v]) => [k, val(ctx, v, k)] as const)
      .filter(([, v]) => v);
    if (entries.length === 0) return '';
    return `<dl class="nested">${entries.map(([k, v]) => `<dt>${esc(label(ctx, k))}</dt><dd>${v}</dd>`).join('')}</dl>`;
  }
  return esc(String(value));
}

export function label(ctx: Ctx, key: string): string {
  return ctx.t.has(`f.${key}`) ? ctx.t(`f.${key}`) : key;
}

export function dl(rows: Array<[string, string]>): string {
  const shown = rows.filter(([, v]) => v);
  if (shown.length === 0) return '';
  return `<dl class="facts">${shown.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${v}</dd>`).join('')}</dl>`;
}

export function section(title: string, inner: string, cls = ''): string {
  if (!inner.trim()) return '';
  return `<section class="block ${cls}"><h2>${esc(title)}</h2>${inner}</section>`;
}

/** List of links to pages, or text for values that are not links. */
export function linkList(ctx: Ctx, values: unknown): string {
  const list = Array.isArray(values) ? values : values ? [values] : [];
  const items = list.map((v) => (typeof v === 'string' ? inline(ctx, v) : '')).filter(Boolean);
  return items.length ? `<ul class="links">${items.map((i) => `<li>${i}</li>`).join('')}</ul>` : '';
}

export function table(headers: string[], rows: string[][], cls = ''): string {
  if (rows.length === 0) return '';
  const head = `<tr>${headers.map((h) => `<th scope="col">${esc(h)}</th>`).join('')}</tr>`;
  const body = rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('');
  return `<div class="table-wrap"><table class="${cls}"><thead>${head}</thead><tbody>${body}</tbody></table></div>`;
}

/** Mermaid island. The source stays in a <pre> for readers without JavaScript. */
export function diagram(ctx: Ctx, id: string, title: string, source: string): string {
  return (
    `<figure class="diagram" data-island="mermaid" data-diagram="${esc(id)}">` +
    `<figcaption>${esc(title)}</figcaption>` +
    `<pre class="mermaid-source" tabindex="0"><code>${esc(source)}</code></pre>` +
    `</figure>`
  );
}

export function groupBy<T>(items: T[], key: (item: T) => string, locale: string): Array<[string, T[]]> {
  const map = new Map<string, T[]>();
  for (const item of items) {
    const k = key(item);
    (map.get(k) ?? map.set(k, []).get(k)!).push(item);
  }
  return [...map.entries()].sort(([a], [b]) => a.localeCompare(b, locale));
}

export function cardList(ctx: Ctx, pages: Page[], withDescription = true): string {
  const sorted = [...pages].sort((a, b) => a.nome.localeCompare(b.nome, ctx.locale));
  return `<ul class="cards">${sorted
    .map((p) => {
      const d = withDescription ? String(p.entity.data.descricao ?? '') : '';
      const short = d.length > 160 ? `${d.slice(0, 157)}...` : d;
      return `<li>${anchor(ctx, p)}${short ? `<span class="muted">${esc(short)}</span>` : ''}</li>`;
    })
    .join('')}</ul>`;
}
