// SPDX-License-Identifier: MIT
// Differential test of the TypeScript guide validator against the Python oracle (tools/guide-oracle).
// Issues are compared by the key (code, nivel, path, itemId); differences are reported on both sides.
// Runs only when GUIDE_ORACLE_PYTHON points at a Python with the oracle requirements.
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { guideDir, loadGuideDoc } from '../../lib/guide';
import { validateGuide } from '../../lib/guide/validate';

const python = process.env.GUIDE_ORACLE_PYTHON;
const root = new URL('../../', import.meta.url).pathname;
const oracle = join(root, 'tools/guide-oracle/dump_doc.py');
const dir = guideDir(`${root}content`);

type Key = { code: string; nivel: string; path: string; itemId: string | null };
const keyOf = (i: Key) => JSON.stringify([i.code, i.nivel, i.path, i.itemId ?? null]);

function oracleIssues(doc: unknown, flags: string[]): Key[] {
  const out = execFileSync(python as string, [oracle, '--issues', ...flags], {
    input: JSON.stringify(doc),
    encoding: 'utf8',
    maxBuffer: 256 * 1024 * 1024,
  });
  return (JSON.parse(out) as Array<{ code: string; nivel: string; path: string; item_id: string | null }>).map((i) => ({
    code: i.code,
    nivel: i.nivel,
    path: i.path,
    itemId: i.item_id ?? null,
  }));
}

function diff(ts: Key[], py: Key[]) {
  const count = (list: Key[]) => {
    const m = new Map<string, number>();
    for (const i of list) m.set(keyOf(i), (m.get(keyOf(i)) ?? 0) + 1);
    return m;
  };
  const a = count(ts);
  const b = count(py);
  const only = (x: Map<string, number>, y: Map<string, number>) =>
    [...x].flatMap(([k, n]) => Array<string>(Math.max(0, n - (y.get(k) ?? 0))).fill(k));
  return { onlyTs: only(a, b), onlyPython: only(b, a) };
}

const schema = JSON.parse(readFileSync(join(root, 'schema/flows.schema.json'), 'utf8'));

describe.skipIf(!python)('validateGuide against the Python oracle', () => {
  const doc = loadGuideDoc(dir);
  it.each([
    ['avisos off, completude off', {}, []],
    ['avisos on', { avisos: true }, ['--avisos']],
    ['completude on', { completude: true }, ['--completude']],
    ['avisos on, completude on', { avisos: true, completude: true }, ['--avisos', '--completude']],
  ] as const)('real guide document: %s', (_label, options, flags) => {
    const ts = validateGuide(JSON.parse(JSON.stringify(doc)), schema, { ...options });
    const { onlyTs, onlyPython } = diff(ts, oracleIssues(doc, [...flags]));
    expect({ onlyTs, onlyPython }, `only in TypeScript: ${onlyTs.length}, only in Python: ${onlyPython.length}`).toEqual({
      onlyTs: [],
      onlyPython: [],
    });
  });
});
