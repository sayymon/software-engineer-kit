// SPDX-License-Identifier: MIT
// Planted defects for the role/RACI warnings (task 5.1): SEM_PAPEL, RACI_CONFLITO, APROVA_FORA_DE_GATEWAY and
// APROVA_REDUNDANTE. The oracle has no test for these codes, so the expected (code, nivel, path, itemId) are asserted
// on the TypeScript side and, when GUIDE_ORACLE_PYTHON is set, compared with the Python oracle (--avisos), message included.
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
const CODES = ['SEM_PAPEL', 'RACI_CONFLITO', 'APROVA_FORA_DE_GATEWAY', 'APROVA_REDUNDANTE'];
type Expected = { code: string; path: string; itemId: string };
type Case = [name: string, plant: (doc: D) => Expected[]];

const find = <T>(list: T[], pred: (x: T) => boolean): number => {
  const i = list.findIndex(pred);
  if (i < 0) throw new Error('no item in the real document for this planted defect');
  return i;
};
const papelA = (doc: D): string => doc.papeis[0].id;
const papelB = (doc: D): string => doc.papeis[1].id;
const idxTarefa = (doc: D) => find(doc.decisoes, (d: D) => d.tipo === 'tarefa');
const idxGateway = (doc: D) => find(doc.decisoes, (d: D) => d.tipo === 'bifurcacao');

const cases: Case[] = [
  ['SEM_PAPEL em tarefa', (doc) => {
    const i = idxTarefa(doc);
    const d = doc.decisoes[i];
    delete d.papel;
    for (const s of d.subtarefas ?? []) delete s.papel;
    return [
      { code: 'SEM_PAPEL', path: `decisoes[${i}]`, itemId: d.id },
      ...(d.subtarefas ?? []).map((s: D, k: number) => ({ code: 'SEM_PAPEL', path: `decisoes[${i}].subtarefas[${k}]`, itemId: s.id })),
    ];
  }],
  ['SEM_PAPEL em gateway', (doc) => {
    const i = idxGateway(doc);
    delete doc.decisoes[i].papel;
    return [{ code: 'SEM_PAPEL', path: `decisoes[${i}]`, itemId: doc.decisoes[i].id }];
  }],
  ['SEM_PAPEL em subtarefa', (doc) => {
    const i = find(doc.decisoes, (d: D) => d.subtarefas?.length);
    delete doc.decisoes[i].subtarefas[0].papel;
    return [{ code: 'SEM_PAPEL', path: `decisoes[${i}].subtarefas[0]`, itemId: doc.decisoes[i].subtarefas[0].id }];
  }],
  ['SEM_PAPEL em rito', (doc) => {
    const i = find(doc.ritos, () => true);
    delete doc.ritos[i].papel;
    return [{ code: 'SEM_PAPEL', path: `ritos[${i}]`, itemId: doc.ritos[i].id }];
  }],
  ['RACI_CONFLITO: aprova também no apoio', (doc) => {
    const i = idxGateway(doc);
    const d = doc.decisoes[i];
    d.aprova = papelB(doc);
    d.apoio = [papelB(doc)];
    return [{ code: 'RACI_CONFLITO', path: `decisoes[${i}]`, itemId: d.id }];
  }],
  ['RACI_CONFLITO: responsável e consultado', (doc) => {
    const i = idxTarefa(doc);
    const d = doc.decisoes[i];
    d.papel = papelA(doc);
    d.consultado = [papelA(doc)];
    return [{ code: 'RACI_CONFLITO', path: `decisoes[${i}]`, itemId: d.id }];
  }],
  ['RACI_CONFLITO: informado com outra letra, em subtarefa', (doc) => {
    const i = find(doc.decisoes, (d: D) => d.subtarefas?.length);
    const sub = doc.decisoes[i].subtarefas[0];
    sub.papel = papelA(doc);
    sub.informado = [papelA(doc)];
    return [{ code: 'RACI_CONFLITO', path: `decisoes[${i}].subtarefas[0]`, itemId: sub.id }];
  }],
  ['RACI_CONFLITO em rito', (doc) => {
    const i = find(doc.ritos, () => true);
    doc.ritos[i].papel = papelA(doc);
    doc.ritos[i].consultado = [papelA(doc)];
    return [{ code: 'RACI_CONFLITO', path: `ritos[${i}]`, itemId: doc.ritos[i].id }];
  }],
  ['APROVA_FORA_DE_GATEWAY', (doc) => {
    const i = idxTarefa(doc);
    doc.decisoes[i].aprova = papelA(doc);
    return [{ code: 'APROVA_FORA_DE_GATEWAY', path: `decisoes[${i}].aprova`, itemId: doc.decisoes[i].id }];
  }],
  ['APROVA_REDUNDANTE', (doc) => {
    const i = idxGateway(doc);
    doc.decisoes[i].papel = papelA(doc);
    doc.decisoes[i].aprova = papelA(doc);
    return [{ code: 'APROVA_REDUNDANTE', path: `decisoes[${i}].aprova`, itemId: doc.decisoes[i].id }];
  }],
  ['sem o catálogo `papeis` nenhum aviso de papel', (doc) => {
    delete doc.papeis;
    return [];
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

describe('planted role/RACI warnings (TypeScript)', () => {
  it('the real document has none of these warnings', () => {
    expect(tsKeys(clone(), { avisos: true })).toEqual([]);
  });
  it.each(cases)('%s', (_name, plant) => {
    const doc = clone();
    const expected = plant(doc);
    const keys = tsKeys(doc, { avisos: true }).map(keyOf);
    for (const e of expected) expect(keys).toContain(keyOf([e.code, 'aviso', e.path, e.itemId]));
    if (!expected.length) expect(keys).toEqual([]);
  });
  it.each(cases)('%s: no warning without the avisos flag', (_name, plant) => {
    const doc = clone();
    plant(doc);
    expect(tsKeys(doc, {})).toEqual([]);
  });
});

describe.skipIf(!python)('planted role/RACI warnings agree with the Python oracle', () => {
  it.each(cases)('%s', (_name, plant) => {
    const doc = clone();
    const expected = plant(doc);
    const ts = tsKeys(doc, { avisos: true }).map(keyOf);
    const py = pyKeys(doc, ['--avisos']).map(keyOf);
    for (const e of expected) expect(py).toContain(keyOf([e.code, 'aviso', e.path, e.itemId]));
    // same order as Python, not only the same set
    expect(ts).toEqual(py);
    const msgs = (l: Array<{ code: string; path: string; message: string }>) => mine(l).map((i) => `${i.code}|${i.path}|${i.message}`);
    expect(msgs(tsIssues(doc, { avisos: true }))).toEqual(msgs(pyIssues(doc, ['--avisos'])));
  });
});
