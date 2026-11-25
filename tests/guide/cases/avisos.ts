// SPDX-License-Identifier: MIT
// Planted-defect cases for the 'avisos' rules, shared by the regression test and tools/guide/record-expected.ts.
// Each case mutates a copy of the real guide document. Single source: do not duplicate these in the tests.
export type Flags = { avisos?: boolean; completude?: boolean };
type D = any; // eslint-disable-line @typescript-eslint/no-explicit-any
export const CODES = ['VAR_NAO_DECLARADA', 'ENTRADA_SEM_PRODUTOR', 'SAIDA_NAO_ENTREGUE', 'ITEM_SEM_USO', 'TAREFA_SEM_ENTREGAVEL', 'SUBTAREFA_SEM_ENTREGAVEL', 'LACUNA_DE_DADOS'];
export type Expected = { code: string; path: string; itemId: string };
export type Case = [name: string, completude: boolean, plant: (doc: D) => Expected[]];
export const find = <T>(list: T[], pred: (x: T) => boolean): number => {
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
export const idxTarefaComSubs = (doc: D) => find(doc.decisoes, (d: D) => d.tipo === 'tarefa' && d.subtarefas?.length && d.saidas?.length);
export const cases: Case[] = [
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

export const entries = cases.map(([name, completude, plant]) => ({ name, plant, flags: { avisos: true, completude } as Flags }));
