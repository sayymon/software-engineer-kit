// SPDX-License-Identifier: MIT
// Wikilinks of the kit: [[id]], [[id|label]], [[id#section]], [[id#section|label]] and the embed ![[id]].
// Links inside fenced code blocks and inline code are not links.

export type WikiLink = {
  kind: 'link' | 'embed';
  id: string;
  section?: string;
  label?: string;
  raw: string;
  start: number;
  end: number;
};

const LINK_RE = /(!?)\[\[([^\[\]\n|#]+?)(?:#([^\[\]\n|]*))?(?:\|([^\[\]\n]*))?\]\]/g;

/** Ranges of fenced code blocks and inline code spans. */
function codeRanges(text: string): Array<[number, number]> {
  const ranges: Array<[number, number]> = [];
  const fence = /^(```|~~~)[^\n]*\n[\s\S]*?(?:^\1[ \t]*$|(?![\s\S]))/gm;
  for (const m of text.matchAll(fence)) ranges.push([m.index ?? 0, (m.index ?? 0) + m[0].length]);
  const inline = /`[^`\n]+`/g;
  for (const m of text.matchAll(inline)) {
    const s = m.index ?? 0;
    if (!ranges.some(([a, b]) => s >= a && s < b)) ranges.push([s, s + m[0].length]);
  }
  return ranges;
}

export function parseWikilinks(text: string): WikiLink[] {
  const ranges = codeRanges(text);
  const out: WikiLink[] = [];
  for (const m of text.matchAll(LINK_RE)) {
    const start = m.index ?? 0;
    if (ranges.some(([a, b]) => start >= a && start < b)) continue;
    const link: WikiLink = {
      kind: m[1] ? 'embed' : 'link',
      id: m[2].trim(),
      raw: m[0],
      start,
      end: start + m[0].length,
    };
    if (m[3] !== undefined && m[3] !== '') link.section = m[3].trim();
    if (m[4] !== undefined && m[4] !== '') link.label = m[4].trim();
    out.push(link);
  }
  return out;
}

export type Resolution = { resolved: WikiLink[]; unresolved: WikiLink[] };

/** Splits the links of `text` by whether `exists(id)` knows the target. */
export function resolveWikilinks(text: string, exists: (id: string) => boolean): Resolution {
  const resolved: WikiLink[] = [];
  const unresolved: WikiLink[] = [];
  for (const link of parseWikilinks(text)) (exists(link.id) ? resolved : unresolved).push(link);
  return { resolved, unresolved };
}

/** Replaces each link with the string `render` returns. Code spans are left untouched. */
export function replaceWikilinks(text: string, render: (link: WikiLink) => string): string {
  let out = '';
  let cursor = 0;
  for (const link of parseWikilinks(text)) {
    out += text.slice(cursor, link.start) + render(link);
    cursor = link.end;
  }
  return out + text.slice(cursor);
}

/** Link as written in the kit: `[[id]]`, `[[id|label]]`, `[[id#section|label]]`. */
export function formatWikilink(link: Pick<WikiLink, 'id' | 'section' | 'label' | 'kind'>): string {
  const target = link.section ? `${link.id}#${link.section}` : link.id;
  return `${link.kind === 'embed' ? '!' : ''}[[${target}${link.label ? `|${link.label}` : ''}]]`;
}

/** Target id of a front matter relation value such as `"[[id|label]]"`. Returns null for other strings. */
export function linkTarget(value: string): string | null {
  const m = /^\[\[([^\[\]\n|#]+?)(?:#[^\[\]\n|]*)?(?:\|[^\[\]\n]*)?\]\]$/.exec(value.trim());
  return m ? m[1].trim() : null;
}
