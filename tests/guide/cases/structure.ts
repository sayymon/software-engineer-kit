// SPDX-License-Identifier: MIT
// Planted-defect cases for the 'structure' rules, shared by the regression test and tools/guide/record-expected.ts.
// Each case mutates a copy of the real guide document. Single source: do not duplicate these in the tests.
export type Flags = { avisos?: boolean; completude?: boolean };
type D = any; // eslint-disable-line @typescript-eslint/no-explicit-any
export type Expected = { code: 'DEMANDA_INCONSISTENTE' | 'COR_DUPLICADA' | 'LIGACAO_INCONSISTENTE'; path: string; itemId: string };
export type Case = [name: string, plant: (doc: D) => Expected];

export const find = (list: D[], pred: (x: D) => boolean): number => {
  const i = list.findIndex(pred);
  if (i < 0) throw new Error('no item in the real document for this planted defect');
  return i;
};
export const demandaDaRaia = (doc: D, raiaId: string): string => doc.raias.find((r: D) => r.id === raiaId).demanda;
export const comLigacao = (doc: D) => find(doc.decisoes, (d) => d.ligacoes?.length);

export const cases: Case[] = [
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

export const entries = cases.map(([name, plant]) => ({ name, plant, flags: {} as Flags }));
