// SPDX-License-Identifier: MIT
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { checkLock, type IdLock } from '../../../lib/ids';
import { fail, na, ok, type Check } from '../types';

export const idsLock: Check = {
  name: 'ids-lock',
  description: 'ids frozen in content/ids.lock.json are still present (appending ids is allowed)',
  run(ctx) {
    const lockFile = join(ctx.contentRoot, 'ids.lock.json');
    if (!existsSync(lockFile)) return na('content/ids.lock.json does not exist yet');
    const lock = JSON.parse(readFileSync(lockFile, 'utf8')) as IdLock;
    const { entities } = ctx.source();
    const guides: Record<string, string[]> = {};
    for (const e of entities) {
      if (e.tipo === 'guia-pratico') guides[e.id] = ((e.data.passos as Array<{ id: string }> | undefined) ?? []).map((p) => p.id);
    }
    const frozenFile = join(ctx.root, 'schema/ids-frozen.json');
    const extra: string[] = [];
    if (existsSync(frozenFile)) {
      const frozen = JSON.parse(readFileSync(frozenFile, 'utf8')) as Record<string, string[]>;
      for (const [guide, steps] of Object.entries(frozen)) {
        const now = guides[guide];
        if (!now) {
          extra.push(`frozen guide ${guide} is not present`);
          continue;
        }
        for (const step of steps) if (!now.includes(step)) extra.push(`frozen step ${guide}/${step} is missing`);
      }
    }
    const problems = [...extra, ...checkLock(lock, { ids: entities.map((e) => e.id), guides }).map((p) => `${p.kind} ${p.id}: ${p.detail}`)];
    return problems.length ? fail(problems) : ok(`${lock.entities.length} entity ids and ${Object.keys(lock.guides).length} guides locked`);
  },
};
