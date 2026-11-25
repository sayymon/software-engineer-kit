// SPDX-License-Identifier: MIT
// Planted defects for the taxonomy warnings (task 7.1): COMUNICACAO_SEM_DESTINATARIO, TIPO_LEGADO, SUBTIPO_AUSENTE and
// SUBTIPO_INVALIDO. Each case mutates a copy of the real guide document, then checks the TypeScript validator reports
// the expected (code, nivel, path, itemId) and, when GUIDE_ORACLE_PYTHON is set, that it agrees with the Python oracle
// (--avisos --completude), including the message.
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { guideDir, loadGuideDoc } from '../../lib/guide';
import { validateGuide } from '../../lib/guide/validate';
const python = process.env.GUIDE_ORACLE_PYTHON;
const root = new URL('../../', import.meta.url).pathname;
const oracle = join(root, 'tools/guide-oracle/dump_doc.py');
const schema = JSON.parse(readFileSync(join(root, 'schema/flows.schema.json'), 'utf8'));
const base = loadGuideDoc(guideDir(`${root}content`));
type D = any; // eslint-disable-line @typescript-eslint/no-explicit-any
type Key = [code: string, nivel: string, path: string, itemId: string | null];
const CODES = ['COMUNICACAO_SEM_DESTINATARIO', 'TIPO_LEGADO', 'SUBTIPO_AUSENTE', 'SUBTIPO_INVALIDO'];
type Expected = { code: string; path: string; itemId: string };
type Case = [name: string, plant: (doc: D) => Expected[]];
const find = <T>(list: T[], pred: (x: T) => boolean): number => {
  const i = list.findIndex(pred);
  if (i < 0) throw new Error('no item in the real document for this planted defect');
  return i;
};
const comSubtipo = (a: D) => a.tipo === 'documento' && a.subtipo;
const cases: Case[] = [
  ['COMUNICACAO_SEM_DESTINATARIO (acao/comunicacao)', (doc) => {
    const i = find(doc.artefatos, (a: D) => a.tipo === 'acao' && a.subtipo === 'comunicacao' && a.destinatarios?.length);
    delete doc.artefatos[i].destinatarios;
    return [{ code: 'COMUNICACAO_SEM_DESTINATARIO', path: `artefatos[${i}]`, itemId: doc.artefatos[i].id }];
  }],
  ['COMUNICACAO_SEM_DESTINATARIO (destinatarios vazio)', (doc) => {
    const i = find(doc.artefatos, (a: D) => a.tipo === 'acao' && a.subtipo === 'comunicacao' && a.destinatarios?.length);
    doc.artefatos[i].destinatarios = [];
    return [{ code: 'COMUNICACAO_SEM_DESTINATARIO', path: `artefatos[${i}]`, itemId: doc.artefatos[i].id }];
  }],
  ['COMUNICACAO_SEM_DESTINATARIO + TIPO_LEGADO (tipo comunicacao)', (doc) => {
    const i = find(doc.artefatos, comSubtipo);
    const a = doc.artefatos[i];
    a.tipo = 'comunicacao';
    delete a.subtipo;
    delete a.destinatarios;
    return [
      { code: 'COMUNICACAO_SEM_DESTINATARIO', path: `artefatos[${i}]`, itemId: a.id },
      { code: 'TIPO_LEGADO', path: `artefatos[${i}].tipo`, itemId: a.id },
    ];
  }],
  ['TIPO_LEGADO (dado)', (doc) => {
    const i = find(doc.artefatos, comSubtipo);
    doc.artefatos[i].tipo = 'dado';
    return [{ code: 'TIPO_LEGADO', path: `artefatos[${i}].tipo`, itemId: doc.artefatos[i].id }];
  }],
  ['SUBTIPO_AUSENTE', (doc) => {
    const i = find(doc.artefatos, comSubtipo);
    delete doc.artefatos[i].subtipo;
    return [{ code: 'SUBTIPO_AUSENTE', path: `artefatos[${i}]`, itemId: doc.artefatos[i].id }];
  }],
  ['SUBTIPO_INVALIDO (subtipo fora da lista)', (doc) => {
    const i = find(doc.artefatos, comSubtipo);
    doc.artefatos[i].subtipo = 'inexistente';
    return [{ code: 'SUBTIPO_INVALIDO', path: `artefatos[${i}].subtipo`, itemId: doc.artefatos[i].id }];
  }],
  ['SUBTIPO_INVALIDO (tipo sem subtipos)', (doc) => {
    const i = find(doc.artefatos, (a: D) => a.tipo === 'commit' || a.tipo === 'adr' || a.tipo === 'pull_request' || a.tipo === 'script');
    doc.artefatos[i].subtipo = 'qualquer';
    return [{ code: 'SUBTIPO_INVALIDO', path: `artefatos[${i}].subtipo`, itemId: doc.artefatos[i].id }];
  }],
];
const keyOf = (k: Key) => JSON.stringify(k);
const clone = (): D => JSON.parse(JSON.stringify(base));
const mine = <T extends { code: string }>(l: T[]) => l.filter((i) => CODES.includes(i.code));
const tsIssues = (doc: D, opcoes: { avisos?: boolean; completude?: boolean }) => validateGuide(doc, schema, opcoes);
const tsKeys = (doc: D, opcoes: { avisos?: boolean; completude?: boolean }): Key[] => mine(tsIssues(doc, opcoes)).map((p) => [p.code, p.nivel, p.path, p.itemId ?? null]);
const pyIssues = (doc: D, flags: string[]) =>
  JSON.parse(
    execFileSync(python as string, [oracle, '--issues', ...flags], { input: JSON.stringify(doc), encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 }),
  ) as Array<{ code: string; nivel: string; path: string; item_id: string | null; message: string }>;
const pyKeys = (doc: D, flags: string[]): Key[] => mine(pyIssues(doc, flags)).map((i) => [i.code, i.nivel, i.path, i.item_id ?? null]);
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
describe.skipIf(!python)('planted taxonomy warnings agree with the Python oracle', () => {
  it.each(cases)('%s', (_name, plant) => {
    const doc = clone();
    const expected = plant(doc);
    const flags = ['--avisos', '--completude'];
    const ts = tsKeys(doc, { avisos: true, completude: true }).map(keyOf);
    const py = pyKeys(doc, flags).map(keyOf);
    for (const e of expected) expect(py).toContain(keyOf([e.code, 'aviso', e.path, e.itemId]));
    // same order as Python, not only the same set
    expect(ts).toEqual(py);
    const msgs = (l: Array<{ code: string; path: string; message: string }>) => mine(l).map((i) => `${i.code}|${i.path}|${i.message}`);
    expect(msgs(tsIssues(doc, { avisos: true, completude: true }))).toEqual(msgs(pyIssues(doc, flags)));
  });
  it('without the flags the oracle reports none of them', () => {
    const doc = clone();
    cases[3][1](doc);
    expect(pyKeys(doc, [])).toEqual([]);
    expect(pyKeys(doc, ['--avisos'])).toEqual([]);
  });
});
