// SPDX-License-Identifier: MIT
// Planted-defect cases for the 'refs' rules, used by the regression test.
// Each case mutates a copy of the real guide document. Single source: do not duplicate these in the tests.
export type Flags = { avisos?: boolean; completude?: boolean };
type D = any; // eslint-disable-line @typescript-eslint/no-explicit-any
export type Expected = { code: 'REF_QUEBRADA' | 'ID_DUPLICADO'; path: string; itemId: string };
export type Case = [name: string, plant: (doc: D) => Expected];

export const BAD = 'id_inexistente_xyz';
export const find = (list: D[], pred: (x: D) => boolean): number => {
  const i = list.findIndex(pred);
  if (i < 0) throw new Error('no item in the real document for this planted defect');
  return i;
};
export const ref = (path: string, itemId: string): Expected => ({ code: 'REF_QUEBRADA', path, itemId });
export const dup = (path: string, itemId: string): Expected => ({ code: 'ID_DUPLICADO', path, itemId });
export const withSub = (doc: D, pred: (s: D) => boolean = () => true) => {
  const i = find(doc.decisoes, (d) => d.subtarefas?.some(pred));
  const k = find(doc.decisoes[i].subtarefas, pred);
  return { i, k, d: doc.decisoes[i], s: doc.decisoes[i].subtarefas[k] };
};
export const fonte = (itens: string[]) => ({ id: 'fonte_plantada', tipo: 'livro', titulo: 'T', link: 'https://example.com', status_revisao: 'pendente', proxima_revisao: '2030-01-01', itens });
export const quandoRuim = { todos: [{ var: BAD, igual: 'x' }] };

export const cases: Case[] = [
  // fontes e itens
  ['fontes.itens', (doc) => { doc.fontes = [fonte([BAD])]; return ref('fontes[0].itens[0]', 'fonte_plantada'); }],
  ['fonte_ids', (doc) => { doc.tecnicas[0].fonte_ids = [BAD]; return ref('tecnicas[0].fonte_ids[0]', doc.tecnicas[0].id); }],
  // ligações
  ['ligacoes.para', (doc) => { const i = find(doc.decisoes, (d) => d.ligacoes?.length); doc.decisoes[i].ligacoes[0].para = BAD; return ref(`decisoes[${i}].ligacoes[0].para`, doc.decisoes[i].id); }],
  ['ligacoes.demanda_destino', (doc) => { const i = find(doc.decisoes, (d) => d.ligacoes?.length); doc.decisoes[i].ligacoes[0].demanda_destino = BAD; return ref(`decisoes[${i}].ligacoes[0].demanda_destino`, doc.decisoes[i].id); }],
  // papéis (RACI) em nós e subtarefas
  ['decisoes.papel', (doc) => { const i = find(doc.decisoes, (d) => d.papel); doc.decisoes[i].papel = BAD; return ref(`decisoes[${i}].papel`, doc.decisoes[i].id); }],
  ['decisoes.aprova', (doc) => { const i = find(doc.decisoes, (d) => d.aprova); doc.decisoes[i].aprova = BAD; return ref(`decisoes[${i}].aprova`, doc.decisoes[i].id); }],
  ['decisoes.apoio', (doc) => { const i = find(doc.decisoes, (d) => d.apoio?.length); doc.decisoes[i].apoio.push(BAD); return ref(`decisoes[${i}].apoio[${doc.decisoes[i].apoio.length - 1}]`, doc.decisoes[i].id); }],
  ['subtarefas.papel', (doc) => { const { i, k, s } = withSub(doc, (x) => x.papel); s.papel = BAD; return ref(`decisoes[${i}].subtarefas[${k}].papel`, s.id); }],
  ['subtarefas.informado', (doc) => { const { i, k, s } = withSub(doc); s.informado = [BAD]; return ref(`decisoes[${i}].subtarefas[${k}].informado[0]`, s.id); }],
  ['artefatos.destinatarios', (doc) => { const i = find(doc.artefatos, (a) => a.destinatarios?.length); doc.artefatos[i].destinatarios.push(BAD); return ref(`artefatos[${i}].destinatarios[${doc.artefatos[i].destinatarios.length - 1}]`, doc.artefatos[i].id); }],
  // dados
  ['raias.entradas', (doc) => { const i = find(doc.raias, (r) => r.entradas?.length); doc.raias[i].entradas.push(BAD); return ref(`raias[${i}].entradas[${doc.raias[i].entradas.length - 1}]`, doc.raias[i].id); }],
  ['decisoes.entradas', (doc) => { const i = find(doc.decisoes, (d) => d.entradas?.length); doc.decisoes[i].entradas.push(BAD); return ref(`decisoes[${i}].entradas[${doc.decisoes[i].entradas.length - 1}]`, doc.decisoes[i].id); }],
  ['decisoes.saidas', (doc) => { const i = find(doc.decisoes, (d) => d.saidas?.length); doc.decisoes[i].saidas.push(BAD); return ref(`decisoes[${i}].saidas[${doc.decisoes[i].saidas.length - 1}]`, doc.decisoes[i].id); }],
  ['subtarefas.entradas', (doc) => { const { i, k, s } = withSub(doc, (x) => x.entradas?.length); s.entradas.push(BAD); return ref(`decisoes[${i}].subtarefas[${k}].entradas[${s.entradas.length - 1}]`, s.id); }],
  ['subtarefas.saidas', (doc) => { const { i, k, s } = withSub(doc, (x) => x.saidas?.length); s.saidas.push(BAD); return ref(`decisoes[${i}].subtarefas[${k}].saidas[${s.saidas.length - 1}]`, s.id); }],
  ['decisoes.tecnicas.tecnica', (doc) => { const i = find(doc.decisoes, (d) => d.tecnicas?.length); doc.decisoes[i].tecnicas[0].tecnica = BAD; return ref(`decisoes[${i}].tecnicas[0].tecnica`, doc.decisoes[i].id); }],
  ['subtarefas.tecnicas.tecnica', (doc) => { const { i, k, s } = withSub(doc, (x) => x.tecnicas?.length); s.tecnicas[0].tecnica = BAD; return ref(`decisoes[${i}].subtarefas[${k}].tecnicas[0].tecnica`, s.id); }],
  ['tecnicas.quando.var', (doc) => { const i = find(doc.decisoes, (d) => d.tecnicas?.length); doc.decisoes[i].tecnicas[0].quando = quandoRuim; return ref(`decisoes[${i}].tecnicas[0].quando.todos[0].var`, doc.decisoes[i].id); }],
  ['subtarefas.quando.var', (doc) => { const { i, k, s } = withSub(doc, (x) => x.quando); s.quando = quandoRuim; return ref(`decisoes[${i}].subtarefas[${k}].quando.todos[0].var`, s.id); }],
  ['artefatos.variantes.quando.var', (doc) => { const i = find(doc.artefatos, (a) => a.variantes?.length); doc.artefatos[i].variantes[0].quando = quandoRuim; return ref(`artefatos[${i}].variantes[0].quando.todos[0].var`, doc.artefatos[i].id); }],
  // playbooks, perguntas e ritos
  ['playbooks.perguntas_chave', (doc) => { const i = find(doc.playbooks, (p) => p.perguntas_chave?.length); doc.playbooks[i].perguntas_chave.push(BAD); return ref(`playbooks[${i}].perguntas_chave[${doc.playbooks[i].perguntas_chave.length - 1}]`, doc.playbooks[i].id); }],
  ['perguntas.depende_de', (doc) => { const i = find(doc.perguntas, (p) => p.depende_de?.length); doc.perguntas[i].depende_de.push(BAD); return ref(`perguntas[${i}].depende_de[${doc.perguntas[i].depende_de.length - 1}]`, doc.perguntas[i].id); }],
  ['perguntas.papel', (doc) => { doc.perguntas[0].papel = BAD; return ref('perguntas[0].papel', doc.perguntas[0].id); }],
  ['perguntas.quando.var', (doc) => { doc.perguntas[0].quando = quandoRuim; return ref('perguntas[0].quando.todos[0].var', doc.perguntas[0].id); }],
  ['ritos.acontece_em', (doc) => { const i = find(doc.ritos, (r) => r.acontece_em?.length); doc.ritos[i].acontece_em.push(BAD); return ref(`ritos[${i}].acontece_em[${doc.ritos[i].acontece_em.length - 1}]`, doc.ritos[i].id); }],
  ['ritos.perguntas', (doc) => { const i = find(doc.ritos, (r) => r.perguntas?.length); doc.ritos[i].perguntas.push(BAD); return ref(`ritos[${i}].perguntas[${doc.ritos[i].perguntas.length - 1}]`, doc.ritos[i].id); }],
  ['ritos.tecnicas', (doc) => { const i = find(doc.ritos, (r) => r.tecnicas?.length); doc.ritos[i].tecnicas.push(BAD); return ref(`ritos[${i}].tecnicas[${doc.ritos[i].tecnicas.length - 1}]`, doc.ritos[i].id); }],
  ['ritos.entradas', (doc) => { const i = find(doc.ritos, (r) => r.entradas?.length); doc.ritos[i].entradas.push(BAD); return ref(`ritos[${i}].entradas[${doc.ritos[i].entradas.length - 1}]`, doc.ritos[i].id); }],
  ['ritos.saidas', (doc) => { const i = find(doc.ritos, (r) => r.saidas?.length); doc.ritos[i].saidas.push(BAD); return ref(`ritos[${i}].saidas[${doc.ritos[i].saidas.length - 1}]`, doc.ritos[i].id); }],
  ['ritos.seguinte', (doc) => { doc.ritos[0].seguinte = BAD; return ref('ritos[0].seguinte', doc.ritos[0].id); }],
  ['ritos.aprova', (doc) => { doc.ritos[0].aprova = BAD; return ref('ritos[0].aprova', doc.ritos[0].id); }],
  ['ritos.quando.var', (doc) => { doc.ritos[1].quando = quandoRuim; return ref('ritos[1].quando.todos[0].var', doc.ritos[1].id); }],
  // ids duplicados
  ['papeis duplicado', (doc) => { doc.papeis.push({ ...doc.papeis[0] }); return dup(`papeis[${doc.papeis.length - 1}].id`, doc.papeis[0].id); }],
  ['perguntas duplicada', (doc) => { doc.perguntas.push({ ...doc.perguntas[0] }); return dup(`perguntas[${doc.perguntas.length - 1}].id`, doc.perguntas[0].id); }],
  ['ritos duplicado', (doc) => { doc.ritos.push({ ...doc.ritos[0] }); return dup(`ritos[${doc.ritos.length - 1}].id`, doc.ritos[0].id); }],
  ['subtarefa duplicada', (doc) => { const { i, k, d, s } = withSub(doc); d.subtarefas.push({ ...s }); void k; return dup(`decisoes[${i}].subtarefas[${d.subtarefas.length - 1}].id`, s.id); }],
  ['artefato duplicado', (doc) => { doc.artefatos.push({ ...doc.artefatos[0] }); return dup(`artefatos[${doc.artefatos.length - 1}].id`, doc.artefatos[0].id); }],
];

export const entries = cases.map(([name, plant]) => ({ name, plant, flags: {} as Flags }));
