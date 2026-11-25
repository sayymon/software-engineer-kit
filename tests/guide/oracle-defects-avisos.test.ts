// SPDX-License-Identifier: MIT
// Planted defects for the data-flow warnings (task 4.2): VAR_NAO_DECLARADA, ENTRADA_SEM_PRODUTOR, SAIDA_NAO_ENTREGUE,
// ITEM_SEM_USO, TAREFA_SEM_ENTREGAVEL, SUBTAREFA_SEM_ENTREGAVEL and LACUNA_DE_DADOS. Each case mutates a copy of the
// real guide document so that one rule fires, then checks the TypeScript validator reports the expected
// (code, nivel, path, itemId) and, when GUIDE_ORACLE_PYTHON is set, that it agrees with the Python oracle run with
// --avisos (and --completude for LACUNA_DE_DADOS), including the message.
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
const CODES = ['VAR_NAO_DECLARADA', 'ENTRADA_SEM_PRODUTOR', 'SAIDA_NAO_ENTREGUE', 'ITEM_SEM_USO', 'TAREFA_SEM_ENTREGAVEL', 'SUBTAREFA_SEM_ENTREGAVEL', 'LACUNA_DE_DADOS'];
type Expected = { code: string; path: string; itemId: string };
type Case = [name: string, completude: boolean, plant: (doc: D) => Expected[]];
const find = <T>(list: T[], pred: (x: T) => boolean): number => {
  const i = list.findIndex(pred);
  if (i < 0) throw new Error('no item in the real document for this planted defect');
  return i;
};
/** Adds a copy of an existing artifact under a new id (declared, but used by nobody). */
function novoArtefato(doc: D, id: string): D {
  const a = { ...structuredClone(doc.artefatos[0]), id };
  doc.artefatos.push(a);
  return a;
}
const idxTarefaComSubs = (doc: D) => find(doc.decisoes, (d: D) => d.tipo === 'tarefa' && d.subtarefas?.length && d.saidas?.length);
const cases: Case[] = [
  ['VAR_NAO_DECLARADA', false, (doc) => {
    const i = find(doc.decisoes, (d: D) => d.tipo === 'tarefa');
    doc.decisoes[i].estado = { ...doc.decisoes[i].estado, var_fantasma: 'x' };
    return [{ code: 'VAR_NAO_DECLARADA', path: `decisoes[${i}].estado.var_fantasma`, itemId: doc.decisoes[i].id }];
  }],
  ['ENTRADA_SEM_PRODUTOR em nó', false, (doc) => {
    const a = novoArtefato(doc, 'art_sem_produtor');
    const i = find(doc.decisoes, (d: D) => d.tipo === 'tarefa' && !d.entradas?.length);
    const d = doc.decisoes[i];
    d.entradas = [a.id];
    return [{ code: 'ENTRADA_SEM_PRODUTOR', path: `decisoes[${i}].entradas[0]`, itemId: d.id }];
  }],
  ['ENTRADA_SEM_PRODUTOR em subtarefa', false, (doc) => {
    const a = novoArtefato(doc, 'art_sem_produtor_sub');
    const i = idxTarefaComSubs(doc);
    const sub = doc.decisoes[i].subtarefas[0];
    sub.entradas = [...(sub.entradas ?? []), a.id];
    return [{ code: 'ENTRADA_SEM_PRODUTOR', path: `decisoes[${i}].subtarefas[0].entradas[${sub.entradas.length - 1}]`, itemId: sub.id }];
  }],
  ['SAIDA_NAO_ENTREGUE', false, (doc) => {
    const a = novoArtefato(doc, 'art_nao_entregue');
    const i = idxTarefaComSubs(doc);
    doc.decisoes[i].saidas.push(a.id);
    return [{ code: 'SAIDA_NAO_ENTREGUE', path: `decisoes[${i}].saidas[${doc.decisoes[i].saidas.length - 1}]`, itemId: doc.decisoes[i].id }];
  }],
  ['ITEM_SEM_USO em artefato', false, (doc) => {
    novoArtefato(doc, 'art_sem_uso');
    return [{ code: 'ITEM_SEM_USO', path: `artefatos[${doc.artefatos.length - 1}]`, itemId: 'art_sem_uso' }];
  }],
  ['ITEM_SEM_USO em variável', false, (doc) => {
    doc.variaveis.push({ ...structuredClone(doc.variaveis[0]), id: 'var_sem_uso' });
    return [{ code: 'ITEM_SEM_USO', path: `variaveis[${doc.variaveis.length - 1}]`, itemId: 'var_sem_uso' }];
  }],
  ['TAREFA_SEM_ENTREGAVEL', false, (doc) => {
    const i = idxTarefaComSubs(doc);
    const d = doc.decisoes[i];
    delete d.saidas;
    for (const s of d.subtarefas) delete s.saidas;
    return [
      { code: 'TAREFA_SEM_ENTREGAVEL', path: `decisoes[${i}]`, itemId: d.id },
      ...d.subtarefas.map((s: D, k: number) => ({ code: 'SUBTAREFA_SEM_ENTREGAVEL', path: `decisoes[${i}].subtarefas[${k}]`, itemId: s.id })),
    ];
  }],
  ['SUBTAREFA_SEM_ENTREGAVEL', false, (doc) => {
    const i = idxTarefaComSubs(doc);
    const d = doc.decisoes[i];
    delete d.subtarefas[0].saidas;
    return [{ code: 'SUBTAREFA_SEM_ENTREGAVEL', path: `decisoes[${i}].subtarefas[0]`, itemId: d.subtarefas[0].id }];
  }],
  ['LACUNA_DE_DADOS sem produtor', true, (doc) => {
    const a = novoArtefato(doc, 'art_lacuna');
    const i = find(doc.decisoes, (d: D) => d.tipo === 'tarefa');
    doc.decisoes[i].entradas = [...(doc.decisoes[i].entradas ?? []), a.id];
    return [{ code: 'LACUNA_DE_DADOS', path: `artefatos[${doc.artefatos.length - 1}]`, itemId: a.id }];
  }],
  ['LACUNA_DE_DADOS sem consumidor', true, (doc) => {
    const a = novoArtefato(doc, 'art_lacuna_saida');
    const i = find(doc.decisoes, (d: D) => d.tipo === 'tarefa');
    doc.decisoes[i].saidas = [...(doc.decisoes[i].saidas ?? []), a.id];
    return [{ code: 'LACUNA_DE_DADOS', path: `artefatos[${doc.artefatos.length - 1}]`, itemId: a.id }];
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
describe.skipIf(!python)('planted data-flow warnings agree with the Python oracle', () => {
  it.each(cases)('%s', (_name, completude, plant) => {
    const doc = clone();
    const expected = plant(doc);
    const flags = completude ? ['--avisos', '--completude'] : ['--avisos'];
    const ts = tsKeys(doc, { avisos: true, completude }).map(keyOf).sort();
    const py = pyKeys(doc, flags).map(keyOf).sort();
    for (const e of expected) expect(py).toContain(keyOf([e.code, 'aviso', e.path, e.itemId]));
    expect({ onlyTs: ts.filter((k) => !py.includes(k)), onlyPython: py.filter((k) => !ts.includes(k)) }).toEqual({ onlyTs: [], onlyPython: [] });
    const msgs = (l: Array<{ code: string; path: string; message: string }>) => mine(l).map((i) => `${i.code}|${i.path}|${i.message}`).sort();
    expect(msgs(tsIssues(doc, { avisos: true, completude }))).toEqual(msgs(pyIssues(doc, flags)));
  });
  it('without the avisos flag the oracle also reports none of them', () => {
    const doc = clone();
    cases[0][2](doc);
    expect(pyKeys(doc, ['--completude'])).toEqual([]);
  });
});
