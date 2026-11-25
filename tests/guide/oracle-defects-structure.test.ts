// SPDX-License-Identifier: MIT
// Planted defects for DEMANDA_INCONSISTENTE, COR_DUPLICADA and LIGACAO_INCONSISTENTE (task 2.1). Each case mutates a
// copy of the real guide document so that one rule fires, then checks that the TypeScript validator reports the
// expected (code, nivel, path, itemId) and, when GUIDE_ORACLE_PYTHON is set, that it agrees with the Python oracle.
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
type Expected = { code: 'DEMANDA_INCONSISTENTE' | 'COR_DUPLICADA' | 'LIGACAO_INCONSISTENTE'; path: string; itemId: string };
type Case = [name: string, plant: (doc: D) => Expected];

const find = (list: D[], pred: (x: D) => boolean): number => {
  const i = list.findIndex(pred);
  if (i < 0) throw new Error('no item in the real document for this planted defect');
  return i;
};
const demandaDaRaia = (doc: D, raiaId: string): string => doc.raias.find((r: D) => r.id === raiaId).demanda;
const comLigacao = (doc: D) => find(doc.decisoes, (d) => d.ligacoes?.length);

const cases: Case[] = [
  ['DEMANDA_INCONSISTENTE', (doc) => {
    const i = find(doc.decisoes, (d) => d.demanda === undefined);
    const d = doc.decisoes[i];
    d.demanda = doc.demandas.find((x: D) => x.id !== demandaDaRaia(doc, d.raia)).id;
    return { code: 'DEMANDA_INCONSISTENTE', path: `decisoes[${i}].demanda`, itemId: d.id };
  }],
  ['COR_DUPLICADA na mesma demanda (sem diferenciar caixa)', (doc) => {
    const demanda = doc.demandas.find((x: D) => !x.biblioteca && doc.raias.filter((r: D) => r.demanda === x.id).length >= 2).id;
    const [a, b] = doc.raias.map((r: D, i: number) => [r, i]).filter(([r]: D) => r.demanda === demanda);
    b[0].cor = a[0].cor.toUpperCase();
    return { code: 'COR_DUPLICADA', path: `raias[${b[1]}].cor`, itemId: b[0].id };
  }],
  ['COR_DUPLICADA com raia de biblioteca chamada', (doc) => {
    const libs = new Set(doc.demandas.filter((d: D) => d.biblioteca === true).map((d: D) => d.id));
    const iNo = find(doc.decisoes, (d) => d.tipo === 'chamada' && libs.has(demandaDaRaia(doc, d.raia_chamada)) && !libs.has(demandaDaRaia(doc, d.raia)));
    const no = doc.decisoes[iNo];
    const iOrigem = doc.raias.findIndex((r: D) => r.id === no.raia);
    const iLib = doc.raias.findIndex((r: D) => r.id === no.raia_chamada);
    doc.raias[iLib].cor = doc.raias[iOrigem].cor;
    const alvo = Math.max(iOrigem, iLib);
    return { code: 'COR_DUPLICADA', path: `raias[${alvo}].cor`, itemId: doc.raias[alvo].id };
  }],
  ['LIGACAO_INCONSISTENTE para a própria demanda', (doc) => {
    const i = comLigacao(doc);
    const d = doc.decisoes[i];
    d.ligacoes[0].demanda_destino = demandaDaRaia(doc, d.raia);
    return { code: 'LIGACAO_INCONSISTENTE', path: `decisoes[${i}].ligacoes[0].demanda_destino`, itemId: d.id };
  }],
  ['LIGACAO_INCONSISTENTE alvo em outra demanda', (doc) => {
    const i = comLigacao(doc);
    const d = doc.decisoes[i];
    const destino = d.ligacoes[0].demanda_destino;
    d.ligacoes[0].para = doc.decisoes[find(doc.decisoes, (x) => demandaDaRaia(doc, x.raia) !== destino)].id;
    return { code: 'LIGACAO_INCONSISTENTE', path: `decisoes[${i}].ligacoes[0].para`, itemId: d.id };
  }],
];

const keyOf = (k: Key) => JSON.stringify(k);
const clone = (): D => JSON.parse(JSON.stringify(base));
const tsKeys = (doc: D): Key[] => validateGuide(doc, schema).map((p) => [p.code, p.nivel, p.path, p.itemId ?? null]);
const pyIssues = (doc: D) =>
  (JSON.parse(
    execFileSync(python as string, [oracle, '--issues'], { input: JSON.stringify(doc), encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 }),
  ) as Array<{ code: string; nivel: string; path: string; item_id: string | null; message: string }>);
const pyKeys = (doc: D): Key[] => pyIssues(doc).map((i) => [i.code, i.nivel, i.path, i.item_id ?? null]);

describe('planted DEMANDA_INCONSISTENTE, COR_DUPLICADA and LIGACAO_INCONSISTENTE defects (TypeScript)', () => {
  it('the real document has no structural issues', () => {
    expect(tsKeys(clone()).filter(([c]) => ['DEMANDA_INCONSISTENTE', 'COR_DUPLICADA', 'LIGACAO_INCONSISTENTE'].includes(c))).toEqual([]);
  });
  it.each(cases)('%s', (_name, plant) => {
    const doc = clone();
    const e = plant(doc);
    expect(tsKeys(doc).map(keyOf)).toContain(keyOf([e.code, 'erro', e.path, e.itemId]));
  });
});

describe.skipIf(!python)('planted defects agree with the Python oracle', () => {
  it.each(cases)('%s', (_name, plant) => {
    const doc = clone();
    const e = plant(doc);
    const ts = tsKeys(doc).map(keyOf).sort();
    const py = pyKeys(doc).map(keyOf).sort();
    expect(py).toContain(keyOf([e.code, 'erro', e.path, e.itemId]));
    expect({ onlyTs: ts.filter((k) => !py.includes(k)), onlyPython: py.filter((k) => !ts.includes(k)) }).toEqual({ onlyTs: [], onlyPython: [] });
    // Messages are ported literally from the oracle, so the whole set matches including the text.
    const msgs = (l: Array<{ code: string; path: string; message: string }>) => l.map((i) => `${i.code}|${i.path}|${i.message}`).sort();
    expect(msgs(validateGuide(doc, schema))).toEqual(msgs(pyIssues(doc)));
  });
});
