// SPDX-License-Identifier: MIT
import { relative } from 'node:path';
import { normalize } from '../../../lib/terms';
import { fail, na, ok, type Check } from '../types';

export const duplicates: Check = {
  name: 'duplicates',
  description: 'no two entities of the same tipo share a normalized title',
  run(ctx) {
    const { entities } = ctx.source();
    if (entities.length === 0) return na('no content yet');
    const seen = new Map<string, string>();
    const problems: string[] = [];
    for (const e of entities) {
      const key = `${e.tipo}:${normalize(String(e.data.nome ?? '')).replace(/\s+/g, ' ').trim()}`;
      const first = seen.get(key);
      if (first) problems.push(`${relative(ctx.root, e.file)}: title of ${e.tipo} "${e.data.nome}" repeats ${first}`);
      else seen.set(key, relative(ctx.root, e.file));
    }
    return problems.length ? fail(problems) : ok(`${entities.length} entities`);
  },
};
