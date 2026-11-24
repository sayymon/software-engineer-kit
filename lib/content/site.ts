// SPDX-License-Identifier: MIT
// Site index over loaded entities: routes, wikilink resolution, Markdown rendering, inverse relations and the graph.
// The site reads content only through this module and `ContentRepository`.
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import type { LoadedEntity, Locale } from './index';
import { routePath } from '../routes';
import { linkTarget, parseWikilinks, replaceWikilinks } from '../wikilinks';
import type { TabelaRow } from '../schema/tabela';

/** Top-level folder of a content path is the layer. */
export const SITE_LAYERS = ['tools', 'ai', 'fundamentals', 'stacks', 'guides', 'certifications', 'flows', 'journeys', 'hubs'] as const;
export type SiteLayer = (typeof SITE_LAYERS)[number];

export type Page = {
  id: string;
  tipo: string;
  layer: SiteLayer;
  /** Route path without locale and without slashes at the ends, e.g. `tools/catalog/git`. */
  route: string;
  nome: string;
  entity: LoadedEntity;
};

export class BrokenLinkError extends Error {
  constructor(public readonly problems: string[]) {
    super(`unresolved wikilinks (${problems.length}):\n${problems.slice(0, 20).join('\n')}`);
  }
}

export type Edge = { source: string; target: string; kind: string };
export type Inbound = { page: Page; fields: string[] };

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{L}\p{N}\s_-]/gu, '')
    .trim()
    .replace(/\s+/g, '-');
}

type HastNode = { type: string; tagName?: string; value?: string; properties?: Record<string, unknown>; children?: HastNode[] };

function textOf(node: HastNode): string {
  if (node.type === 'text') return node.value ?? '';
  return (node.children ?? []).map(textOf).join('');
}

/** Adds an `id` to every heading so `[[note#section]]` links have an anchor. */
function rehypeHeadingIds() {
  return (tree: HastNode) => {
    const seen = new Map<string, number>();
    const walk = (node: HastNode) => {
      if (node.type === 'element' && node.tagName && /^h[1-6]$/.test(node.tagName)) {
        const base = slugify(textOf(node));
        if (base) {
          const n = seen.get(base) ?? 0;
          seen.set(base, n + 1);
          node.properties = { ...node.properties, id: n === 0 ? base : `${base}-${n}` };
        }
      }
      for (const child of node.children ?? []) walk(child);
    };
    walk(tree);
  };
}

const processor = unified().use(remarkParse).use(remarkGfm).use(remarkRehype).use(rehypeHeadingIds).use(rehypeStringify);

export function markdownToHtml(markdown: string): string {
  return String(processor.processSync(markdown));
}

function collectStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === 'string') out.push(value);
  else if (Array.isArray(value)) for (const v of value) collectStrings(v, out);
  else if (value && typeof value === 'object') for (const v of Object.values(value)) collectStrings(v, out);
  return out;
}

/** Relation targets in front matter: top-level field name and target id. */
export function relationTargets(data: Record<string, unknown>): Array<{ field: string; id: string }> {
  const out: Array<{ field: string; id: string }> = [];
  for (const [field, value] of Object.entries(data)) {
    for (const s of collectStrings(value)) {
      const id = linkTarget(s);
      if (id !== null) out.push({ field, id });
    }
  }
  return out;
}

export type RenderOptions = {
  /** Builds the link target for a route path. */
  href: (route: string) => string;
  /** When true (default) unresolved links throw BrokenLinkError. */
  strict?: boolean;
  /** Label for log lines of problems. */
  where?: string;
};

export class SiteIndex {
  readonly pages: Page[];
  readonly byId = new Map<string, Page>();
  readonly byRoute = new Map<string, Page>();
  private readonly guideAlias = new Map<string, Page>();
  private inboundMap?: Map<string, Inbound[]>;
  private edgeList?: Edge[];

  constructor(
    readonly locale: Locale,
    entities: LoadedEntity[],
  ) {
    this.pages = entities.map((entity) => ({
      id: entity.id,
      tipo: entity.tipo,
      layer: entity.relPath.split('/')[0] as SiteLayer,
      route: routePath(entity.relPath),
      nome: String(entity.data.nome ?? entity.id),
      entity,
    }));
    for (const p of this.pages) {
      if (this.byId.has(p.id)) throw new Error(`duplicate id in site index: ${p.id}`);
      if (this.byRoute.has(p.route)) throw new Error(`duplicate route in site index: ${p.route}`);
      this.byId.set(p.id, p);
      this.byRoute.set(p.route, p);
    }
    for (const p of this.pages) {
      for (const gid of (p.entity.data.guia_ids as string[] | undefined) ?? []) if (!this.byId.has(gid)) this.guideAlias.set(gid, p);
    }
  }

  resolve(id: string): Page | undefined {
    return this.byId.get(id) ?? this.guideAlias.get(id);
  }

  ofTipo(tipo: string): Page[] {
    return this.pages.filter((p) => p.tipo === tipo);
  }

  ofLayer(layer: SiteLayer): Page[] {
    return this.pages.filter((p) => p.layer === layer);
  }

  /** Pages that link to `id` through front matter relations or body wikilinks (hubs excluded). */
  inbound(id: string): Inbound[] {
    if (!this.inboundMap) {
      const acc = new Map<string, Map<string, { page: Page; fields: Set<string> }>>();
      const add = (targetId: string, page: Page, field: string) => {
        const target = this.resolve(targetId);
        if (!target || target.id === page.id) return;
        let bySource = acc.get(target.id);
        if (!bySource) acc.set(target.id, (bySource = new Map()));
        let entry = bySource.get(page.id);
        if (!entry) bySource.set(page.id, (entry = { page, fields: new Set() }));
        entry.fields.add(field);
      };
      for (const page of this.pages) {
        if (page.tipo === 'hub') continue;
        for (const r of relationTargets(page.entity.data)) add(r.id, page, r.field);
        for (const l of parseWikilinks(page.entity.body)) add(l.id, page, 'body');
      }
      this.inboundMap = new Map();
      for (const [target, bySource] of acc) {
        const list = [...bySource.values()].map((v) => ({ page: v.page, fields: [...v.fields].sort() }));
        list.sort((a, b) => a.page.nome.localeCompare(b.page.nome, this.locale));
        this.inboundMap.set(target, list);
      }
    }
    return this.inboundMap.get(id) ?? [];
  }

  /** Typed edges: one per (source, target, kind). Kinds are relation field names and `body` for wikilinks. */
  edges(): Edge[] {
    if (!this.edgeList) {
      const seen = new Set<string>();
      const out: Edge[] = [];
      const push = (source: string, targetId: string, kind: string) => {
        const target = this.resolve(targetId);
        if (!target || target.id === source) return;
        const key = `${source}\u0000${target.id}\u0000${kind}`;
        if (seen.has(key)) return;
        seen.add(key);
        out.push({ source, target: target.id, kind });
      };
      for (const page of this.pages) {
        for (const r of relationTargets(page.entity.data)) push(page.id, r.id, r.field);
        for (const l of parseWikilinks(page.entity.body)) push(page.id, l.id, 'body');
      }
      this.edgeList = out;
    }
    return this.edgeList;
  }

  /** Route and optional section anchor for a wikilink target, or undefined when it does not resolve. */
  target(id: string, section?: string): { page: Page; route: string; anchor: string } | undefined {
    const page = this.resolve(id);
    if (!page) return undefined;
    return { page, route: page.route, anchor: section ? `#${slugify(section)}` : '' };
  }

  /** Renders Markdown with wikilinks turned into links to real routes. */
  render(markdown: string, options: RenderOptions): string {
    const problems: string[] = [];
    const prepared = replaceWikilinks(markdown, (link) => {
      const t = this.target(link.id, link.section);
      if (!t) {
        problems.push(`${options.where ?? 'markdown'}: [[${link.id}]]`);
        return link.label ?? link.id;
      }
      const label = (link.label ?? t.page.nome).replace(/[\[\]]/g, '');
      return `[${label}](${options.href(t.route)}${t.anchor})`;
    });
    if (problems.length && options.strict !== false) throw new BrokenLinkError(problems);
    return markdownToHtml(prepared);
  }
}

export function tabelaRows(contentRoot: string): TabelaRow[] {
  const dir = join(contentRoot, 'data', 'tabela');
  if (!existsSync(dir)) return [];
  const rows: TabelaRow[] = [];
  for (const f of readdirSync(dir).filter((x) => x.endsWith('.json')).sort()) {
    rows.push(...(JSON.parse(readFileSync(join(dir, f), 'utf8')) as TabelaRow[]));
  }
  return rows;
}

export function readData<T = unknown>(contentRoot: string, name: string): T {
  return JSON.parse(readFileSync(join(contentRoot, 'data', name), 'utf8')) as T;
}
