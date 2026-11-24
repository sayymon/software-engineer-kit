// SPDX-License-Identifier: MIT
// Build-time access to the content for the Astro pages. Reads only through lib/content (FsContentRepository).
import { join } from 'node:path';
import { FsContentRepository, LOCALES, type Locale } from '@lib/content';
import { SiteIndex, readData, tabelaRows } from '@lib/content/site';
import type { TabelaRow } from '@lib/schema/tabela';
import { makeT } from './i18n';
import { assembleDoc, type Doc } from '@lib/flows';
import type { Ctx } from './render/util';

const root = process.env.KIT_ROOT ?? process.cwd();
const contentRoot = join(root, 'content');

type Shared = {
  repo: FsContentRepository;
  indexes: Map<Locale, SiteIndex>;
  rows?: TabelaRow[];
  data: Map<string, unknown>;
  docs: Map<Locale, Doc>;
};
const g = globalThis as unknown as { __kit?: Shared };
const shared: Shared = (g.__kit ??= { repo: new FsContentRepository(contentRoot), indexes: new Map(), data: new Map(), docs: new Map() });

/** Locales this build produces. `KIT_LOCALES=pt-BR` builds a single locale. */
export function buildLocales(): Locale[] {
  const wanted = (process.env.KIT_LOCALES ?? '').split(',').map((s) => s.trim()).filter(Boolean);
  const list = wanted.length ? LOCALES.filter((l) => wanted.includes(l)) : [...LOCALES];
  if (list.length === 0) throw new Error(`KIT_LOCALES has no known locale: ${process.env.KIT_LOCALES}`);
  return list;
}

export function siteBase(): string {
  const b = (import.meta.env.BASE_URL ?? '/').replace(/\/$/, '');
  return b;
}

export function siteIndex(locale: Locale): SiteIndex {
  let index = shared.indexes.get(locale);
  if (!index) {
    const problems = shared.repo.problems(locale);
    if (problems.length) throw new Error(`content problems:\n${problems.map((p) => `${p.file}: ${p.message}`).join('\n')}`);
    index = new SiteIndex(locale, shared.repo.list(locale));
    shared.indexes.set(locale, index);
  }
  return index;
}

export function rows(): TabelaRow[] {
  return (shared.rows ??= tabelaRows(contentRoot));
}

export function data<T>(name: string): T {
  if (!shared.data.has(name)) shared.data.set(name, readData<T>(contentRoot, name));
  return shared.data.get(name) as T;
}

export function flowDoc(locale: Locale): Doc {
  let doc = shared.docs.get(locale);
  if (!doc) {
    doc = assembleDoc(siteIndex(locale).pages.map((p) => p.entity));
    shared.docs.set(locale, doc);
  }
  return doc;
}

const ctxCache = new Map<string, Ctx>();
export function ctxFor(locale: Locale): Ctx {
  const base = siteBase();
  const key = `${locale}|${base}`;
  let ctx = ctxCache.get(key);
  if (!ctx) {
    const index = siteIndex(locale);
    const rowList = rows();
    const rowById = new Map(rowList.map((r) => [r.id, r]));
    const rowsByCategory = new Map<string, TabelaRow[]>();
    for (const r of rowList) for (const c of r.categorias) (rowsByCategory.get(c) ?? rowsByCategory.set(c, []).get(c)!).push(r);
    ctx = {
      locale,
      base,
      t: makeT(locale),
      index,
      rowById,
      rowsByCategory,
      href: (route: string) => (route ? `${base}/${locale}/${route}/` : `${base}/${locale}/`),
      data,
      doc: () => flowDoc(locale),
    };
    ctxCache.set(key, ctx);
  }
  return ctx;
}
