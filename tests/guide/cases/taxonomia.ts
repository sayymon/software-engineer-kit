// SPDX-License-Identifier: MIT
// Planted-defect cases for the 'taxonomia' rules, used by the regression test.
// Each case mutates a copy of the real guide document. Single source: do not duplicate these in the tests.
export type Flags = { avisos?: boolean; completude?: boolean };
type D = any; // eslint-disable-line @typescript-eslint/no-explicit-any
export const CODES = ['COMUNICACAO_SEM_DESTINATARIO', 'TIPO_LEGADO', 'SUBTIPO_AUSENTE', 'SUBTIPO_INVALIDO'];
export type Expected = { code: string; path: string; itemId: string };
export type Case = [name: string, plant: (doc: D) => Expected[]];
export const find = <T>(list: T[], pred: (x: T) => boolean): number => {
  const i = list.findIndex(pred);
  if (i < 0) throw new Error('no item in the real document for this planted defect');
  return i;
};
export const comSubtipo = (a: D) => a.tipo === 'documento' && a.subtipo;
export const cases: Case[] = [
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

export const entries = cases.map(([name, plant]) => ({ name, plant, flags: { avisos: true, completude: true } as Flags }));
