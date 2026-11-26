// SPDX-License-Identifier: MIT
// Planted defects for the data-flow warnings (task 4.2): VAR_NAO_DECLARADA, ENTRADA_SEM_PRODUTOR, SAIDA_NAO_ENTREGUE,
// ITEM_SEM_USO, TAREFA_SEM_ENTREGAVEL, SUBTAREFA_SEM_ENTREGAVEL and LACUNA_DE_DADOS. Each case mutates a copy of the
// real guide document so that one rule fires, then checks the TypeScript validator reports the expected
// (code, nivel, path, itemId) and that the whole issue list equals the stored oracle output (recorded with
// --avisos, and --completude for LACUNA_DE_DADOS), including the message.
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
import { cases, CODES, entries } from './cases/avisos';
const keyOf = (k: Key) => JSON.stringify(k);
const clone = (): D => JSON.parse(JSON.stringify(base));
const mine = <T extends { code: string }>(l: T[]) => l.filter((i) => CODES.includes(i.code));
const tsIssues = (doc: D, opcoes: { avisos?: boolean; completude?: boolean }) => validateGuide(doc, schema, opcoes);
const tsKeys = (doc: D, opcoes: { avisos?: boolean; completude?: boolean }): Key[] => mine(tsIssues(doc, opcoes)).map((p) => [p.code, p.nivel, p.path, p.itemId ?? null]);
describe('planted data-flow warnings (TypeScript)', () => {
  it('the real document has none of these warnings', () => {
    expect(tsKeys(clone(), { avisos: true, completude: true })).toEqual([]);
  });
  it.each(cases)('%s', (_name, completude, plant) => {
    const doc = clone();
    const expected = plant(doc);
    const keys = tsKeys(doc, { avisos: true, completude }).map(keyOf);
    for (const e of expected) expect(keys).toContain(keyOf([e.code, 'aviso', e.path, e.itemId]));
  });
  it.each(cases)('%s: no warning without the avisos flag', (_name, completude, plant) => {
    const doc = clone();
    plant(doc);
    expect(tsKeys(doc, { completude })).toEqual([]);
  });
  it('LACUNA_DE_DADOS needs avisos and completude together', () => {
    const doc = clone();
    cases[8][2](doc);
    expect(tsKeys(doc, { avisos: true }).filter((k) => k[0] === 'LACUNA_DE_DADOS')).toEqual([]);
    expect(tsKeys(doc, { completude: true })).toEqual([]);
    expect(tsKeys(doc, { avisos: true, completude: true }).filter((k) => k[0] === 'LACUNA_DE_DADOS')).not.toEqual([]);
  });
});
describe('planted defects: whole issue list equals the stored oracle output', () => {
  const stored = readExpected<Record<string, IssueRow[]>>('defects-avisos.json');
  it('stores every case', () => {
    expect(Object.keys(stored).sort()).toEqual(entries.map((e) => e.name).sort());
  });
  it.each(entries.map((e) => [e.name, e] as const))('%s', (_name, e) => {
    const doc = clone();
    e.plant(doc);
    expect(tsRows(doc, e.flags)).toEqual(stored[e.name]);
  });
});
