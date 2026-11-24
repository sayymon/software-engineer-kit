// SPDX-License-Identifier: MIT
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { SOURCE_LOCALE, parseFile } from '../../../lib/content';
import { TabelaRows } from '../../../lib/schema/tabela';
import { TIPOS, validateEntity, validateOverlay, type Tipo } from '../../../lib/schema';
import { fail, na, ok, type Check } from '../types';

export const schema: Check = {
  name: 'schema',
  description: 'every entity validates against its Zod schema and every locale overlay against its overlay schema',
  run(ctx) {
    const { entities } = ctx.source();
    if (entities.length === 0) return na('no content yet');
    const problems: string[] = [];
    for (const e of entities) {
      const result = validateEntity(e.data);
      if (!result.ok) for (const i of result.issues) problems.push(`${relative(ctx.root, e.file)}: ${i.path || '(root)'}: ${i.message}`);
    }
    const byRel = new Map(entities.map((e) => [e.relPath, e]));
    for (const o of ctx.overlays()) {
      const source = byRel.get(o.relPath);
      if (!source || !TIPOS.includes(source.tipo as Tipo)) continue;
      const parsed = parseFile(o.file);
      const result = validateOverlay(source.tipo as Tipo, parsed.data);
      if (!result.ok) for (const i of result.issues) problems.push(`${relative(ctx.root, o.file)}: ${i.path || '(root)'}: ${i.message}`);
    }
    // Tool table rows (content/data/tabela/*.json): schema and unique ids across shards.
    const rowDir = join(ctx.contentRoot, 'data/tabela');
    let rows = 0;
    if (existsSync(rowDir)) {
      const seen = new Map<string, string>();
      for (const f of readdirSync(rowDir).filter((x) => x.endsWith('.json')).sort()) {
        const parsed = TabelaRows.safeParse(JSON.parse(readFileSync(join(rowDir, f), 'utf8')));
        if (!parsed.success) for (const i of parsed.error.issues) problems.push(`content/data/tabela/${f}: ${i.path.join('.')}: ${i.message}`);
        else {
          for (const r of parsed.data) {
            if (seen.has(r.id)) problems.push(`content/data/tabela/${f}: row id ${r.id} repeats ${seen.get(r.id)}`);
            else seen.set(r.id, f);
            rows++;
          }
        }
      }
    }
    return problems.length ? fail(problems) : ok(`${entities.length} entities in ${SOURCE_LOCALE}, ${rows} table rows`);
  },
};
