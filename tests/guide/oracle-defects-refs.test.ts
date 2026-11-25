// SPDX-License-Identifier: MIT
// Planted defects for REF_QUEBRADA and ID_DUPLICADO (task 1.1). Each case mutates a copy of the real guide
// document so that one rule fires, then checks that the TypeScript validator reports the expected
// (code, nivel, path, itemId) and that the whole issue list equals the stored oracle output (tests/guide/expected).
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
import { cases, entries } from './cases/refs';

const keyOf = (k: Key) => JSON.stringify(k);
const clone = (): D => JSON.parse(JSON.stringify(base));
const tsKeys = (doc: D): Key[] => validateGuide(doc, schema).map((p) => [p.code, p.nivel, p.path, p.itemId ?? null]);

describe('planted REF_QUEBRADA and ID_DUPLICADO defects (TypeScript)', () => {
  it.each(cases)('%s', (_name, plant) => {
    const doc = clone();
    const e = plant(doc);
    const keys = tsKeys(doc).map(keyOf);
    expect(keys).toContain(keyOf([e.code, 'erro', e.path, e.itemId]));
  });
});

describe('planted defects: whole issue list equals the stored oracle output', () => {
  const stored = readExpected<Record<string, IssueRow[]>>('defects-refs.json');
  it('stores every case', () => {
    expect(Object.keys(stored).sort()).toEqual(entries.map((e) => e.name).sort());
  });
  it.each(entries.map((e) => [e.name, e] as const))('%s', (_name, e) => {
    const doc = clone();
    e.plant(doc);
    expect(tsRows(doc, e.flags)).toEqual(stored[e.name]);
  });
});
