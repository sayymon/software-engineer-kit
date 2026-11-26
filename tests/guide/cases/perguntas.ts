// SPDX-License-Identifier: MIT
// Planted-defect cases for the 'perguntas' rules, used by the regression test.
// Each case mutates a copy of the real guide document. Single source: do not duplicate these in the tests.
type D = any; // eslint-disable-line @typescript-eslint/no-explicit-any
export const CODES = ['PERGUNTA_SEM_DEPENDENCIA', 'PERGUNTA_SEM_USO', 'PLAYBOOK_SEM_NO'];
export type Expected = { code: string; path: string; itemId: string };
export type Flags = { avisos?: boolean; completude?: boolean };
export type Case = [name: string, plant: (doc: D) => Expected[], flags: Flags];

export const find = <T>(list: T[], pred: (x: T) => boolean): number => {
  const i = list.findIndex(pred);
  if (i < 0) throw new Error('no item in the real document for this planted defect');
  return i;
};
export const AVISOS: Flags = { avisos: true };
export const COMPLETO: Flags = { avisos: true, completude: true };

/** Removes `id` from every playbook and rite that cites the question. */
export const descitar = (doc: D, id: string): void => {
  for (const pb of doc.playbooks) pb.perguntas_chave = (pb.perguntas_chave ?? []).filter((x: string) => x !== id);
  for (const rt of doc.ritos) rt.perguntas = (rt.perguntas ?? []).filter((x: string) => x !== id);
};

export const cases: Case[] = [
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

export const entries = cases.map(([name, plant, flags]) => ({ name, plant, flags: flags as Flags }));
