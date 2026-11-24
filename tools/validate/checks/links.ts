// SPDX-License-Identifier: MIT
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { parseWikilinks, linkTarget } from '../../../lib/wikilinks';
import { fail, na, ok, type Check } from '../types';

function stringsOf(value: unknown, out: string[] = []): string[] {
  if (typeof value === 'string') out.push(value);
  else if (Array.isArray(value)) for (const v of value) stringsOf(v, out);
  else if (value && typeof value === 'object') for (const v of Object.values(value)) stringsOf(v, out);
  return out;
}

export const links: Check = {
  name: 'links',
  description: 'every [[wikilink]] in bodies and relation fields resolves to an entity id',
  run(ctx) {
    const { entities } = ctx.source();
    if (entities.length === 0) return na('no content yet');
    const known = new Set(entities.map((e) => e.id));
    const problems: string[] = [];
    const rows = new Set<string>();
    const rowDir = join(ctx.contentRoot, 'data/tabela');
    if (existsSync(rowDir)) {
      for (const f of readdirSync(rowDir).filter((x) => x.endsWith('.json'))) {
        for (const r of JSON.parse(readFileSync(join(rowDir, f), 'utf8')) as Array<{ id: string }>) rows.add(r.id);
      }
    }
    for (const e of entities) {
      const where = relative(ctx.root, e.file);
      for (const link of parseWikilinks(e.body)) {
        if (!known.has(link.id)) problems.push(`${where}: body links to unknown id "${link.id}"`);
      }
      for (const s of stringsOf(e.data)) {
        const target = linkTarget(s);
        if (target !== null && !known.has(target)) problems.push(`${where}: field links to unknown id "${target}"`);
        const row = /^tabela:([a-z0-9_.-]+)$/.exec(s);
        if (row && !rows.has(row[1])) problems.push(`${where}: field references missing table row "${row[1]}"`);
      }
    }
    return problems.length ? fail(problems) : ok(`${entities.length} entities`);
  },
};
