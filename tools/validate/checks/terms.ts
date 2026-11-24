// SPDX-License-Identifier: MIT
import { existsSync, readFileSync, statSync, readdirSync } from 'node:fs';
import { extname, join, relative } from 'node:path';
import { parseFile } from '../../../lib/content';
import { findBlocked, findBlockedInValue, loadBlocklist, type BlockEntry, type Hit } from '../../../lib/terms';
import { fail, ok, type Check } from '../types';
export const PUBLIC_TERMS_FILE = 'config/public-terms.txt';
export const PRIVATE_TERMS_FILE = 'private/config/internal-terms.txt';
/** Directories never scanned: dependencies, build output, scratch, the private folder and the vendored bundles. */
const SKIP_DIRS = new Set(['.git', 'node_modules', '.astro', '.agents', 'private', 'vendor']);
/** Files never scanned: the lockfile and the public ruleset itself. */
const SKIP_FILES = new Set(['package-lock.json', PUBLIC_TERMS_FILE]);
const TEXT_EXT = new Set(['.md', '.yaml', '.yml', '.json', '.txt', '.ts', '.tsx', '.js', '.mjs', '.astro', '.css', '.html', '.toml', '.sh', '']);
function files(root: string, rel = '', out: string[] = []): string[] {
  for (const name of readdirSync(join(root, rel)).sort()) {
    const childRel = rel ? join(rel, name) : name;
    const child = join(root, childRel);
    if (statSync(child).isDirectory()) {
      if (SKIP_DIRS.has(name) || name.startsWith('dist')) continue;
      files(root, childRel, out);
    } else if (TEXT_EXT.has(extname(name)) && !SKIP_FILES.has(childRel)) out.push(child);
  }
  return out;
}
/** Blocklist files in effect for `root`: the public ruleset, then the optional private list and `KIT_EXTRA_TERMS_FILE`. */
export function termsFiles(root: string, env: NodeJS.ProcessEnv = process.env): string[] {
  const candidates = [join(root, PUBLIC_TERMS_FILE), join(root, PRIVATE_TERMS_FILE), env.KIT_EXTRA_TERMS_FILE ?? ''];
  return candidates.filter((f) => f && existsSync(f));
}
export function scanTerms(root: string, blocklistFiles: string[]): { hits: Hit[]; scanned: number } {
  const blocklist: BlockEntry[] = blocklistFiles.flatMap((f) => loadBlocklist(f));
  const hits: Hit[] = [];
  let scanned = 0;
  for (const file of files(root)) {
    scanned++;
    const where = relative(root, file);
    const inContent = where.startsWith('content/') && ['.md', '.yaml', '.yml'].includes(extname(file));
    if (inContent) {
      try {
        const parsed = parseFile(file);
        const id = String(parsed.data.id ?? '');
        hits.push(...findBlockedInValue(parsed.data, blocklist, { id, file: where }));
        hits.push(...findBlocked(parsed.body, blocklist, { id, file: where, field: 'body' }));
        continue;
      } catch {
        // Unparseable files are scanned as raw text below.
      }
    }
    hits.push(...findBlocked(readFileSync(file, 'utf8'), blocklist, { file: where, field: 'text' }));
  }
  return { hits, scanned };
}
export const terms: Check = {
  name: 'terms',
  description: 'no personal path, email, personal knowledge base name, secret or listed internal term in the tracked tree',
  run(ctx) {
    const lists = termsFiles(ctx.root);
    const { hits, scanned } = scanTerms(ctx.root, lists);
    if (hits.length === 0) return ok(`${scanned} files scanned, ${lists.length} term list(s), 0 hits`);
    return fail(hits.map((h) => `${h.file}:${h.line} id=${h.id || '-'} field=${h.field || '-'} term="${h.term}" match="${h.match}"`));
  },
};
