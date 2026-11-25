// SPDX-License-Identifier: MIT
// Planted defects for the question and playbook warnings (task 6.1): PERGUNTA_SEM_DEPENDENCIA, PERGUNTA_SEM_USO and
// PLAYBOOK_SEM_NO. The oracle has no test for these codes, so the expected (code, nivel, path, itemId) are asserted
// on the TypeScript side and the whole issue list is compared with the stored oracle output (recorded with --avisos, plus
// --completude for PLAYBOOK_SEM_NO), message and order included.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { guideDir, loadGuideDoc } from '../../lib/guide';
import { readExpected, tsRows, type D, type IssueRow } from './support/expected';
import { validateGuide } from '../../lib/guide/validate';

const root = new URL('../../', import.meta.url).pathname;
const schema = JSON.parse(readFileSync(join(root, 'schema/flows.schema.json'), 'utf8'));
const base = loadGuideDoc(guideDir(`${root}content`));

type Key = [code: string, nivel: string, path: string, itemId: string | null];
import { cases, CODES, AVISOS, COMPLETO, entries, type Flags } from './cases/perguntas';

const keyOf = (k: Key) => JSON.stringify(k);
const clone = (): D => JSON.parse(JSON.stringify(base));
const mine = <T extends { code: string }>(l: T[]) => l.filter((i) => CODES.includes(i.code));
const tsIssues = (doc: D, flags: Flags) => validateGuide(doc, schema, flags);
const tsKeys = (doc: D, flags: Flags): Key[] => mine(tsIssues(doc, flags)).map((p) => [p.code, p.nivel, p.path, p.itemId ?? null]);

describe('planted question/playbook warnings (TypeScript)', () => {
  it('the real document has none of these warnings', () => {
    expect(tsKeys(clone(), COMPLETO)).toEqual([]);
  });
  it.each(cases)('%s', (_name, plant, flags) => {
    const doc = clone();
    const expected = plant(doc);
    const keys = tsKeys(doc, flags).map(keyOf);
    for (const e of expected) expect(keys).toContain(keyOf([e.code, 'aviso', e.path, e.itemId]));
    if (!expected.length) expect(keys).toEqual([]);
  });
  it.each(cases)('%s: no warning without the flags', (_name, plant) => {
    const doc = clone();
    plant(doc);
    expect(tsKeys(doc, {})).toEqual([]);
  });
  it('PLAYBOOK_SEM_NO needs `completude`', () => {
    const [, plant] = cases.find((c) => c[0] === 'PLAYBOOK_SEM_NO')!;
    const doc = clone();
    plant(doc);
    expect(tsKeys(doc, AVISOS)).toEqual([]);
  });
});

describe('planted defects: whole issue list equals the stored oracle output', () => {
  const stored = readExpected<Record<string, IssueRow[]>>('defects-perguntas.json');
  it('stores every case', () => {
    expect(Object.keys(stored).sort()).toEqual(entries.map((e) => e.name).sort());
  });
  it.each(entries.map((e) => [e.name, e] as const))('%s', (_name, e) => {
    const doc = clone();
    e.plant(doc);
    expect(tsRows(doc, e.flags)).toEqual(stored[e.name]);
  });
});
