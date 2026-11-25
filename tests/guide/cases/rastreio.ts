// SPDX-License-Identifier: MIT
// Documents fed to the data tracing (rastreio): the real guide, seeded mutations and hand-built shapes.
// Used by the regression test.
import { realDoc } from '../support/expected';
type D = any; // eslint-disable-line @typescript-eslint/no-explicit-any
const clone = (): D => realDoc();
/** Small deterministic generator (mulberry32), so mutated copies are reproducible. */
function rng(seed: number): () => number {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Every owner that carries a list in `campo` (nodes, subtasks, lanes, rites). */
function donos(doc: D, campo: string): D[] {
  const out: D[] = [];
  for (const colecao of ['raias', 'ritos', 'decisoes']) {
    for (const d of doc[colecao] ?? []) {
      if (Array.isArray(d[campo])) out.push(d);
      for (const s of d.subtarefas ?? []) if (Array.isArray(s[campo])) out.push(s);
    }
  }
  return out;
}

function mutate(seed: number): D {
  const doc = clone();
  const r = rng(seed);
  const ids = [...(doc.variaveis ?? []), ...(doc.artefatos ?? [])].map((x: D) => x.id);
  for (const campo of ['entradas', 'saidas']) {
    for (const d of donos(doc, campo)) {
      const p = r();
      if (p < 0.2) d[campo] = d[campo].slice(1);
      else if (p < 0.3) d[campo] = [...d[campo], ...d[campo]];
      else if (p < 0.4) d[campo] = [...d[campo], ids[Math.floor(r() * ids.length)], 'id_fora_do_catalogo'];
      else if (p < 0.45) d[campo] = [];
    }
  }
  for (const v of doc.variaveis ?? []) {
    const p = r();
    if (p < 0.15) v.inicial = 'x';
    else if (p < 0.25) delete v.inicial;
  }
  for (const a of doc.artefatos ?? []) {
    if (r() < 0.1) a.destinatarios = [];
    else if (r() < 0.05) a.destinatarios = ['papel'];
  }
  for (const n of doc.decisoes ?? []) {
    for (const s of n.subtarefas ?? []) {
      if (r() < 0.15) delete s.quando;
      else if (r() < 0.1) s.quando = { algum: [...(s.quando?.todos ?? s.quando?.algum ?? [])] };
    }
    for (const t of n.tecnicas ?? []) if (r() < 0.2) delete t.quando;
  }
  return doc;
}

export const MUTATION_SEEDS = [1, 2, 3, 4, 5, 6, 7, 8];

function operadores(): D {
  const doc = clone();
  const sub = doc.decisoes.find((d: D) => d.subtarefas?.some((s: D) => s.quando)).subtarefas.find((s: D) => s.quando);
  const v = doc.variaveis[0].id;
  sub.quando = {
    todos: [
      { var: v, igual: true },
      { var: v, diferente: 'a', maior_que: 1, maior_ou_igual: 2, menor_que: 3, menor_ou_igual: 4 },
      { var: v, em: [false, 'b', 3, null] },
      { var: v },
      { igual: 'sem var' },
      'texto solto',
    ],
  };
  doc.decisoes[0].tecnicas = [
    { tecnica: 't', uso: 'u', quando: { algum: [{ var: v, igual: 'x' }, { var: 'outra', em: ['a', 'b'] }] } },
    { tecnica: 't', quando: { todos: [] } },
    { tecnica: 't', quando: { algum: [] } },
    { tecnica: 't', quando: {} },
  ];
  return doc;
}

function ordemNatural(): D {
  const doc = clone();
  const art = doc.artefatos[0];
  doc.variaveis.push({ id: 'v10', nome: 'dez', tipo: 'texto' }, { id: 'v2', nome: 'dois', tipo: 'texto' }, { id: art.id, nome: 'duplicado', tipo: 'texto' });
  doc.ritos = [...(doc.ritos ?? []), { id: 'r10', entradas: ['v10', 'v2'], saidas: [art.id] }, { id: 'r2', entradas: ['v10'], saidas: ['v2'] }];
  return doc;
}

/** Named documents, in a stable order. Each is built fresh on every call. */
export const rastreioDocs = (): Array<[name: string, doc: D]> => [
  ['real guide document', clone()],
  ...MUTATION_SEEDS.map((seed): [string, D] => [`mutated copy (seed ${seed})`, mutate(seed)]),
  ['conditions with every operator, value kinds, algum, empty and malformed shapes', operadores()],
  ['natural order of ids (t2 before t10) and an id in both collections', ordemNatural()],
  ['degenerate documents: empty', {}],
  ['degenerate documents: wrong types', { variaveis: 'x', artefatos: [null, 1, { nome: 'sem id' }], decisoes: [null, { id: 'n', subtarefas: 'x' }] }],
];
