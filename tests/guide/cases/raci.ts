// SPDX-License-Identifier: MIT
// Planted-defect cases for the 'raci' rules, shared by the regression test and tools/guide/record-expected.ts.
// Each case mutates a copy of the real guide document. Single source: do not duplicate these in the tests.
export type Flags = { avisos?: boolean; completude?: boolean };
type D = any; // eslint-disable-line @typescript-eslint/no-explicit-any
export const CODES = ['SEM_PAPEL', 'RACI_CONFLITO', 'APROVA_FORA_DE_GATEWAY', 'APROVA_REDUNDANTE'];
export type Expected = { code: string; path: string; itemId: string };
export type Case = [name: string, plant: (doc: D) => Expected[]];

export const find = <T>(list: T[], pred: (x: T) => boolean): number => {
  const i = list.findIndex(pred);
  if (i < 0) throw new Error('no item in the real document for this planted defect');
  return i;
};
export const papelA = (doc: D): string => doc.papeis[0].id;
export const papelB = (doc: D): string => doc.papeis[1].id;
export const idxTarefa = (doc: D) => find(doc.decisoes, (d: D) => d.tipo === 'tarefa');
export const idxGateway = (doc: D) => find(doc.decisoes, (d: D) => d.tipo === 'bifurcacao');

export const cases: Case[] = [
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

export const entries = cases.map(([name, plant]) => ({ name, plant, flags: { avisos: true } as Flags }));
