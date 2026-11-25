// SPDX-License-Identifier: MIT
// Planted defects for the question and playbook warnings (task 6.1): PERGUNTA_SEM_DEPENDENCIA, PERGUNTA_SEM_USO and
// PLAYBOOK_SEM_NO. The oracle has no test for these codes, so the expected (code, nivel, path, itemId) are asserted
// on the TypeScript side and, when GUIDE_ORACLE_PYTHON is set, compared with the Python oracle (--avisos, plus
// --completude for PLAYBOOK_SEM_NO), message and order included.
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
const CODES = ['PERGUNTA_SEM_DEPENDENCIA', 'PERGUNTA_SEM_USO', 'PLAYBOOK_SEM_NO'];
type Expected = { code: string; path: string; itemId: string };
type Flags = { avisos?: boolean; completude?: boolean };
type Case = [name: string, plant: (doc: D) => Expected[], flags: Flags];

const find = <T>(list: T[], pred: (x: T) => boolean): number => {
  const i = list.findIndex(pred);
  if (i < 0) throw new Error('no item in the real document for this planted defect');
  return i;
};
const AVISOS: Flags = { avisos: true };
const COMPLETO: Flags = { avisos: true, completude: true };

/** Removes `id` from every playbook and rite that cites the question. */
const descitar = (doc: D, id: string): void => {
  for (const pb of doc.playbooks) pb.perguntas_chave = (pb.perguntas_chave ?? []).filter((x: string) => x !== id);
  for (const rt of doc.ritos) rt.perguntas = (rt.perguntas ?? []).filter((x: string) => x !== id);
};

const cases: Case[] = [
  ['PERGUNTA_SEM_DEPENDENCIA', (doc) => {
    const i = find(doc.perguntas, (p: D) => p.depende_de?.length);
    delete doc.perguntas[i].depende_de;
    return [{ code: 'PERGUNTA_SEM_DEPENDENCIA', path: `perguntas[${i}]`, itemId: doc.perguntas[i].id }];
  }, AVISOS],
  ['PERGUNTA_SEM_DEPENDENCIA com lista vazia', (doc) => {
    const i = find(doc.perguntas, (p: D) => p.depende_de?.length);
    doc.perguntas[i].depende_de = [];
    return [{ code: 'PERGUNTA_SEM_DEPENDENCIA', path: `perguntas[${i}]`, itemId: doc.perguntas[i].id }];
  }, AVISOS],
  ['PERGUNTA_SEM_USO', (doc) => {
    const i = find(doc.perguntas, () => true);
    descitar(doc, doc.perguntas[i].id);
    return [{ code: 'PERGUNTA_SEM_USO', path: `perguntas[${i}]`, itemId: doc.perguntas[i].id }];
  }, AVISOS],
  ['PERGUNTA_SEM_DEPENDENCIA e PERGUNTA_SEM_USO juntos, na ordem do Python', (doc) => {
    const i = find(doc.perguntas, (p: D) => p.depende_de?.length);
    const { id } = doc.perguntas[i];
    delete doc.perguntas[i].depende_de;
    descitar(doc, id);
    return [
      { code: 'PERGUNTA_SEM_DEPENDENCIA', path: `perguntas[${i}]`, itemId: id },
      { code: 'PERGUNTA_SEM_USO', path: `perguntas[${i}]`, itemId: id },
    ];
  }, AVISOS],
  ['PLAYBOOK_SEM_NO', (doc) => {
    const copia = JSON.parse(JSON.stringify(doc.playbooks[0]));
    copia.id = 'playbook_orfao_plantado';
    doc.playbooks.push(copia);
    return [{ code: 'PLAYBOOK_SEM_NO', path: `playbooks[${doc.playbooks.length - 1}]`, itemId: copia.id }];
  }, COMPLETO],
  ['PLAYBOOK_SEM_NO: nó deixa de usar o playbook', (doc) => {
    const i = find(doc.decisoes, (d: D) => d.playbook);
    const id = doc.decisoes[i].playbook;
    for (const d of doc.decisoes) if (d.playbook === id) delete d.playbook;
    return [{ code: 'PLAYBOOK_SEM_NO', path: `playbooks[${find(doc.playbooks, (p: D) => p.id === id)}]`, itemId: id }];
  }, COMPLETO],
  ['sem o catálogo `papeis` nenhum aviso de pergunta', (doc) => {
    delete doc.papeis;
    descitar(doc, doc.perguntas[0].id);
    delete doc.perguntas[0].depende_de;
    return [];
  }, AVISOS],
];

const keyOf = (k: Key) => JSON.stringify(k);
const clone = (): D => JSON.parse(JSON.stringify(base));
const mine = <T extends { code: string }>(l: T[]) => l.filter((i) => CODES.includes(i.code));
const tsIssues = (doc: D, flags: Flags) => validateGuide(doc, schema, flags);
const tsKeys = (doc: D, flags: Flags): Key[] => mine(tsIssues(doc, flags)).map((p) => [p.code, p.nivel, p.path, p.itemId ?? null]);
const pyFlags = (flags: Flags) => [...(flags.avisos ? ['--avisos'] : []), ...(flags.completude ? ['--completude'] : [])];
const pyIssues = (doc: D, flags: string[]) =>
  JSON.parse(
    execFileSync(python as string, [oracle, '--issues', ...flags], { input: JSON.stringify(doc), encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 }),
  ) as Array<{ code: string; nivel: string; path: string; item_id: string | null; message: string }>;
const pyKeys = (doc: D, flags: string[]): Key[] => mine(pyIssues(doc, flags)).map((i) => [i.code, i.nivel, i.path, i.item_id ?? null]);

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

describe.skipIf(!python)('planted question/playbook warnings agree with the Python oracle', () => {
  it.each(cases)('%s', (_name, plant, flags) => {
    const doc = clone();
    const expected = plant(doc);
    const ts = tsKeys(doc, flags).map(keyOf);
    const py = pyKeys(doc, pyFlags(flags)).map(keyOf);
    for (const e of expected) expect(py).toContain(keyOf([e.code, 'aviso', e.path, e.itemId]));
    // same order as Python, not only the same set
    expect(ts).toEqual(py);
    const msgs = (l: Array<{ code: string; path: string; message: string }>) => mine(l).map((i) => `${i.code}|${i.path}|${i.message}`);
    expect(msgs(tsIssues(doc, flags))).toEqual(msgs(pyIssues(doc, pyFlags(flags))));
  });
});
