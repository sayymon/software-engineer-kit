// SPDX-License-Identifier: MIT
// Internal-terms blocker. Matching ignores case and accents (NFKD, combining marks removed, casefold),
// so "Acme Corp", "acme corp" and "ACME CORP" all hit the same entry.
import { readFileSync } from 'node:fs';

export type BlockEntry =
  | { kind: 'literal'; raw: string; needle: string }
  | { kind: 'regex'; raw: string; re: RegExp };

export type Hit = {
  term: string;
  id: string;
  file: string;
  field: string;
  line: number;
  match: string;
};

export type Where = { id?: string; file?: string; field?: string };

/** NFKD, drop combining marks, casefold. Keeps line breaks, so line numbers stay valid. */
export function normalize(text: string): string {
  return text
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ß/g, 'ss')
    .toLowerCase()
    .toUpperCase()
    .toLowerCase();
}

/**
 * Blocklist file format, one entry per line:
 * - `# comment` and blank lines are ignored.
 * - `re:<pattern>` is a case-sensitive regular expression tested on the original text.
 * - `rei:<pattern>` is the same with the `i` flag.
 * - anything else is a literal, compared after `normalize`.
 */
export function parseBlocklist(content: string): BlockEntry[] {
  const entries: BlockEntry[] = [];
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    if (line.startsWith('rei:')) entries.push({ kind: 'regex', raw: line, re: new RegExp(line.slice(4), 'gi') });
    else if (line.startsWith('re:')) entries.push({ kind: 'regex', raw: line, re: new RegExp(line.slice(3), 'g') });
    else entries.push({ kind: 'literal', raw: line, needle: normalize(line) });
  }
  return entries;
}

export function loadBlocklist(path: string): BlockEntry[] {
  return parseBlocklist(readFileSync(path, 'utf8'));
}

function lineOf(text: string, index: number): number {
  let line = 1;
  for (let i = 0; i < index; i++) if (text.charCodeAt(i) === 10) line++;
  return line;
}

/** Every occurrence of every blocked term in `text`, in order of position. Never stops at the first hit. */
export function findBlocked(text: string, blocklist: BlockEntry[], where: Where = {}): Hit[] {
  const hits: Hit[] = [];
  const folded = normalize(text);
  const base = { id: where.id ?? '', file: where.file ?? '', field: where.field ?? '' };
  const positions: Array<{ at: number; hit: Hit }> = [];
  for (const entry of blocklist) {
    if (entry.kind === 'literal') {
      let from = 0;
      for (;;) {
        const at = folded.indexOf(entry.needle, from);
        if (at < 0) break;
        positions.push({
          at,
          hit: { ...base, term: entry.raw, line: lineOf(folded, at), match: folded.slice(at, at + entry.needle.length) },
        });
        from = at + Math.max(entry.needle.length, 1);
      }
    } else {
      entry.re.lastIndex = 0;
      for (const m of text.matchAll(entry.re)) {
        const at = m.index ?? 0;
        positions.push({ at, hit: { ...base, term: entry.raw, line: lineOf(text, at), match: m[0] } });
      }
    }
  }
  positions.sort((a, b) => a.at - b.at);
  for (const p of positions) hits.push(p.hit);
  return hits;
}

/** Scans every string reachable from `value` and labels each hit with its field path. */
export function findBlockedInValue(value: unknown, blocklist: BlockEntry[], where: Where = {}, path = ''): Hit[] {
  if (typeof value === 'string') return findBlocked(value, blocklist, { ...where, field: path || where.field });
  if (Array.isArray(value)) return value.flatMap((v, i) => findBlockedInValue(v, blocklist, where, `${path}[${i}]`));
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([k, v]) => findBlockedInValue(v, blocklist, where, path ? `${path}.${k}` : k));
  }
  return [];
}
