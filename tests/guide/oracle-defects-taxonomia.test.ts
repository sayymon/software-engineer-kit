// SPDX-License-Identifier: MIT
// Planted defects for the taxonomy warnings (task 7.1): COMUNICACAO_SEM_DESTINATARIO, TIPO_LEGADO, SUBTIPO_AUSENTE and
// SUBTIPO_INVALIDO. Each case mutates a copy of the real guide document, then checks the TypeScript validator reports
// the expected (code, nivel, path, itemId) and that the whole issue list equals the stored oracle output
// (--avisos --completude), including the message.
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
import { cases, CODES, entries } from './cases/taxonomia';
const keyOf = (k: Key) => JSON.stringify(k);
const clone = (): D => JSON.parse(JSON.stringify(base));
const mine = <T extends { code: string }>(l: T[]) => l.filter((i) => CODES.includes(i.code));
const tsIssues = (doc: D, opcoes: { avisos?: boolean; completude?: boolean }) => validateGuide(doc, schema, opcoes);
const tsKeys = (doc: D, opcoes: { avisos?: boolean; completude?: boolean }): Key[] => mine(tsIssues(doc, opcoes)).map((p) => [p.code, p.nivel, p.path, p.itemId ?? null]);
describe('planted taxonomy warnings (TypeScript)', () => {
  it('the real document has none of these warnings', () => {
    expect(tsKeys(clone(), { avisos: true, completude: true })).toEqual([]);
  });
  it.each(cases)('%s', (_name, plant) => {
    const doc = clone();
    const expected = plant(doc);
    const keys = tsKeys(doc, { avisos: true, completude: true }).map(keyOf);
    for (const e of expected) expect(keys).toContain(keyOf([e.code, 'aviso', e.path, e.itemId]));
  });
  it.each(cases)('%s: silent without both flags', (_name, plant) => {
    const doc = clone();
    plant(doc);
    expect(tsKeys(doc, {})).toEqual([]);
    expect(tsKeys(doc, { avisos: true })).toEqual([]);
    expect(tsKeys(doc, { completude: true })).toEqual([]);
  });
});
describe('planted defects: whole issue list equals the stored oracle output', () => {
  const stored = readExpected<Record<string, IssueRow[]>>('defects-taxonomia.json');
  it('stores every case', () => {
    expect(Object.keys(stored).sort()).toEqual(entries.map((e) => e.name).sort());
  });
  it.each(entries.map((e) => [e.name, e] as const))('%s', (_name, e) => {
    const doc = clone();
    e.plant(doc);
    expect(tsRows(doc, e.flags)).toEqual(stored[e.name]);
  });
});
