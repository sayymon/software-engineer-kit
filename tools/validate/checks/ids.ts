// SPDX-License-Identifier: MIT
import { basename, extname, relative } from 'node:path';
import { checkIds } from '../../../lib/ids';
import { SOURCE_LOCALE, parseFile } from '../../../lib/content';
import { fail, na, ok, type Check } from '../types';

export const ids: Check = {
  name: 'ids',
  description: 'ids match the contract regex, are globally unique and equal the file name; overlays point to an existing entity',
  run(ctx) {
    const { entities, problems: loadProblems } = ctx.source();
    if (entities.length === 0 && loadProblems.length === 0) return na('no content yet');
    const problems = loadProblems.map((p) => `${relative(ctx.root, p.file)}: ${p.message}`);
    problems.push(
      ...checkIds(entities.map((e) => ({ id: e.id, file: relative(ctx.root, e.file), tipo: e.tipo }))).map(
        (p) => `${p.kind} id ${p.id}: ${p.detail}`,
      ),
    );
    const known = new Map(entities.map((e) => [e.relPath, e.id]));
    for (const o of ctx.overlays()) {
      const sourceId = known.get(o.relPath);
      if (sourceId === undefined) {
        problems.push(`${relative(ctx.root, o.file)}: overlay has no pt-BR source at content/${SOURCE_LOCALE}/${o.relPath}`);
        continue;
      }
      try {
        const overlayId = parseFile(o.file).data.id;
        if (overlayId !== sourceId || basename(o.file, extname(o.file)) !== sourceId) {
          problems.push(`${relative(ctx.root, o.file)}: overlay id must equal ${sourceId}`);
        }
      } catch (error) {
        problems.push(`${relative(ctx.root, o.file)}: cannot parse overlay (${(error as Error).message})`);
      }
    }
    return problems.length ? fail(problems) : ok(`${entities.length} entities`);
  },
};
