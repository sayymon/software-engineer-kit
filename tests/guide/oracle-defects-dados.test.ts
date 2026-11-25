// SPDX-License-Identifier: MIT
// Planted defects for CONDICAO_INVALIDA, CONDICAO_AUSENTE, VARIAVEL_ENUM_SEM_VALORES, VARIANTE_DUPLICADA,
// SUBTAREFA_EM_NAO_TAREFA and SUBTAREFA_ID_PADRAO (task 3.1). Each case mutates a copy of the real guide document so
// that one rule fires, then checks that the TypeScript validator reports the expected (code, nivel, path, itemId) and,
// when GUIDE_ORACLE_PYTHON is set, that it agrees with the Python oracle (key and message).
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
const CODES = ['CONDICAO_INVALIDA', 'CONDICAO_AUSENTE', 'VARIAVEL_ENUM_SEM_VALORES', 'VARIANTE_DUPLICADA', 'SUBTAREFA_EM_NAO_TAREFA', 'SUBTAREFA_ID_PADRAO'];
type Expected = { code: string; path: string; itemId: string };
type Case = [name: string, plant: (doc: D) => Expected];

const find = <T>(list: T[], pred: (x: T) => boolean): number => {
  const i = list.findIndex(pred);
  if (i < 0) throw new Error('no item in the real document for this planted defect');
  return i;
};
const varDe = (doc: D, tipo: string): D => doc.variaveis.find((v: D) => v.tipo === tipo && (tipo !== 'enum' || v.valores?.length));

/** Replaces the `quando` of the first subtask that has one with a single term; returns its coordinates. */
function plantTermo(doc: D, termo: D, code = 'CONDICAO_INVALIDA', sufixo = ''): Expected {
  const i = find(doc.decisoes, (d: D) => d.subtarefas?.some((s: D) => s.quando));
  const k = find(doc.decisoes[i].subtarefas, (s: D) => s.quando);
  const sub = doc.decisoes[i].subtarefas[k];
  sub.quando = { todos: [termo] };
  return { code, path: `decisoes[${i}].subtarefas[${k}].quando.todos[0]${sufixo}`, itemId: sub.id };
}

const cases: Case[] = [
  ['CONDICAO_INVALIDA com dois operadores', (doc) => plantTermo(doc, { var: varDe(doc, 'texto').id, igual: 'a', diferente: 'b' })],
  ['CONDICAO_INVALIDA sem operador', (doc) => plantTermo(doc, { var: varDe(doc, 'texto').id })],
  ['CONDICAO_INVALIDA operador numérico em variável não inteira', (doc) => plantTermo(doc, { var: varDe(doc, 'texto').id, maior_que: 1 }, 'CONDICAO_INVALIDA', '.maior_que')],
  ['CONDICAO_INVALIDA valor fora do domínio do enum', (doc) => plantTermo(doc, { var: varDe(doc, 'enum').id, igual: 'valor_que_nao_existe' }, 'CONDICAO_INVALIDA', '.igual')],
  ['CONDICAO_INVALIDA valor de "em" fora do domínio do enum', (doc) => plantTermo(doc, { var: varDe(doc, 'enum').id, em: [varDe(doc, 'enum').valores[0], 'fora'] }, 'CONDICAO_INVALIDA', '.em[1]')],
  ['CONDICAO_INVALIDA valor fora do domínio booleano', (doc) => plantTermo(doc, { var: varDe(doc, 'booleano').id, igual: 'talvez' }, 'CONDICAO_INVALIDA', '.igual')],
  ['CONDICAO_INVALIDA valor de tipo incompatível com inteiro', (doc) => plantTermo(doc, { var: varDe(doc, 'inteiro').id, igual: 'dois' }, 'CONDICAO_INVALIDA', '.igual')],
  ['CONDICAO_INVALIDA "em" com lista vazia', (doc) => plantTermo(doc, { var: varDe(doc, 'texto').id, em: [] }, 'CONDICAO_INVALIDA', '.em')],
  ['CONDICAO_AUSENTE em uso condicional de técnica sem `quando`', (doc) => {
    const i = find(doc.decisoes, (d: D) => d.tecnicas?.length);
    const d = doc.decisoes[i];
    d.tecnicas[0].uso = 'condicional';
    delete d.tecnicas[0].quando;
    return { code: 'CONDICAO_AUSENTE', path: `decisoes[${i}].tecnicas[0]`, itemId: d.id };
  }],
  ['VARIAVEL_ENUM_SEM_VALORES', (doc) => {
    const i = find(doc.variaveis, (v: D) => v.tipo === 'enum');
    delete doc.variaveis[i].valores;
    return { code: 'VARIAVEL_ENUM_SEM_VALORES', path: `variaveis[${i}].valores`, itemId: doc.variaveis[i].id };
  }],
  ['VARIANTE_DUPLICADA', (doc) => {
    const i = find(doc.artefatos, (a: D) => a.variantes?.length);
    const a = doc.artefatos[i];
    a.variantes.push(structuredClone(a.variantes[0]));
    return { code: 'VARIANTE_DUPLICADA', path: `artefatos[${i}].variantes[${a.variantes.length - 1}].nome`, itemId: a.id };
  }],
  ['SUBTAREFA_EM_NAO_TAREFA', (doc) => {
    const i = find(doc.decisoes, (d: D) => d.tipo !== 'tarefa');
    const modelo = doc.decisoes[find(doc.decisoes, (d: D) => d.subtarefas?.length)].subtarefas[0];
    const d = doc.decisoes[i];
    d.subtarefas = [{ ...structuredClone(modelo), id: `${d.id}_st1` }];
    return { code: 'SUBTAREFA_EM_NAO_TAREFA', path: `decisoes[${i}].subtarefas`, itemId: d.id };
  }],
  ['SUBTAREFA_ID_PADRAO', (doc) => {
    const i = find(doc.decisoes, (d: D) => d.subtarefas?.length);
    const sub = doc.decisoes[i].subtarefas[0];
    sub.id = `${doc.decisoes[i].id}_st0`;
    return { code: 'SUBTAREFA_ID_PADRAO', path: `decisoes[${i}].subtarefas[0].id`, itemId: sub.id };
  }],
];

const keyOf = (k: Key) => JSON.stringify(k);
const clone = (): D => JSON.parse(JSON.stringify(base));
const tsIssues = (doc: D) => validateGuide(doc, schema);
const tsKeys = (doc: D): Key[] => tsIssues(doc).map((p) => [p.code, p.nivel, p.path, p.itemId ?? null]);
const pyIssues = (doc: D) =>
  JSON.parse(
    execFileSync(python as string, [oracle, '--issues'], { input: JSON.stringify(doc), encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 }),
  ) as Array<{ code: string; nivel: string; path: string; item_id: string | null; message: string }>;
const pyKeys = (doc: D): Key[] => pyIssues(doc).map((i) => [i.code, i.nivel, i.path, i.item_id ?? null]);

describe('planted data and subtask defects (TypeScript)', () => {
  it('the real document has none of these issues', () => {
    expect(tsKeys(clone()).filter(([c]) => CODES.includes(c))).toEqual([]);
  });
  it.each(cases)('%s', (_name, plant) => {
    const doc = clone();
    const e = plant(doc);
    expect(tsKeys(doc).map(keyOf)).toContain(keyOf([e.code, 'erro', e.path, e.itemId]));
  });
});

describe.skipIf(!python)('planted data and subtask defects agree with the Python oracle', () => {
  it.each(cases)('%s', (_name, plant) => {
    const doc = clone();
    const e = plant(doc);
    const ts = tsKeys(doc).map(keyOf).sort();
    const py = pyKeys(doc).map(keyOf).sort();
    expect(py).toContain(keyOf([e.code, 'erro', e.path, e.itemId]));
    expect({ onlyTs: ts.filter((k) => !py.includes(k)), onlyPython: py.filter((k) => !ts.includes(k)) }).toEqual({ onlyTs: [], onlyPython: [] });
    // The Portuguese messages are ported literally, so they match too.
    const msgs = (l: Array<{ code: string; path: string; message: string }>) => l.filter((i) => CODES.includes(i.code)).map((i) => `${i.code}|${i.path}|${i.message}`).sort();
    expect(msgs(tsIssues(doc))).toEqual(msgs(pyIssues(doc)));
  });
});
