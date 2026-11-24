// SPDX-License-Identifier: MIT
// Guide flows: rebuilds the guide document from the flow entities, validates it with the vendored JSON Schema
// (Ajv) and ports the cross-reference rules of the guide validator (ids, transitions, lanes, calls, returns).
import Ajv2020 from 'ajv/dist/2020.js';
import type { LoadedEntity } from '../content';

export type Doc = Record<string, any>;
export type FlowIssue = { code: string; path: string; message: string };

const LISTS = ['demandas', 'raias', 'artefatos', 'variaveis', 'papeis', 'requisitos', 'decisoes', 'celulas', 'playbooks', 'abordagens', 'tecnicas', 'padroes', 'estrategias', 'categorias_ferramenta', 'fontes'] as const;
const STRIP = new Set(['tipo', 'guia_ids', 'dataVerificacao', 'aliases', 'tags', 'fontes', 'fonte_ids']);
const COLLECTION_OF: Record<string, string> = { tecnica: 'tecnicas', abordagem: 'abordagens', estrategia: 'estrategias', requisito: 'requisitos' };
const ID_COLLECTIONS = ['demandas', 'raias', 'requisitos', 'decisoes', 'playbooks', 'abordagens', 'tecnicas', 'padroes', 'estrategias', 'categorias_ferramenta', 'fontes'] as const;

function without(obj: Record<string, unknown>, keys: Set<string>): Record<string, unknown> {
  return Object.fromEntries(Object.entries(obj).filter(([k]) => !keys.has(k)));
}

/**
 * Rebuilds the document the guide loader produces: lists concatenated in order (comum, then the demands in
 * `ordem_das_demandas`), maps and scalars once. Entities of tipo demanda carry the demand header plus its lists.
 */
export function assembleDoc(entities: Array<Pick<LoadedEntity, 'id' | 'tipo' | 'data'>>): Doc {
  const doc: Doc = {};
  for (const k of LISTS) doc[k] = [];
  const demands = entities.filter((e) => e.tipo === 'demanda');
  const comum = demands.find((e) => e.id === 'comum');
  const order: string[] = ((comum?.data.ordem_das_demandas as string[] | undefined) ?? []).slice();
  const rest = demands.filter((e) => e.id !== 'comum' && !order.includes(e.id)).map((e) => e.id).sort();
  const sequence = [...(comum ? ['comum'] : []), ...order, ...rest]
    .map((id) => demands.find((e) => e.id === id))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));
  for (const e of sequence) {
    const d = e.data;
    const header: Doc = { id: e.id, nome: d.nome, ...(d.sigla !== undefined ? { sigla: d.sigla } : {}), ...(d.biblioteca !== undefined ? { biblioteca: d.biblioteca } : {}), publico: d.publico ?? false };
    doc.demandas.push(header);
    for (const k of ['raias', 'artefatos', 'variaveis', 'papeis', 'decisoes', 'celulas', 'playbooks'] as const) {
      if (Array.isArray(d[k])) doc[k].push(...(d[k] as unknown[]));
    }
    if (e.id === 'comum') {
      if (d.versao !== undefined) doc.versao = d.versao;
      if (d.decisor_construir_comprar_assinar !== undefined) doc.decisor_construir_comprar_assinar = d.decisor_construir_comprar_assinar;
    }
  }
  for (const e of entities) {
    const collection = COLLECTION_OF[e.tipo];
    if (collection) doc[collection].push(without(e.data, STRIP));
    // Guide techniques merged into a kit note stay resolvable by their guide id.
    for (const gid of (e.data.guia_ids as string[] | undefined) ?? []) doc.tecnicas.push({ id: gid, nome: String(e.data.nome) });
  }
  return doc;
}

let compiled: ReturnType<Ajv2020['compile']> | undefined;
export function validateAgainstSchema(doc: Doc, schema: object): FlowIssue[] {
  if (!compiled) {
    const ajv = new Ajv2020({ strict: false, allErrors: true });
    ajv.addFormat('date', {
      validate: (v: string) => /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(`${v}T00:00:00Z`)) && new Date(`${v}T00:00:00Z`).toISOString().startsWith(v),
    });
    compiled = ajv.compile(schema);
  }
  const ok = compiled(doc);
  if (ok) return [];
  return (compiled.errors ?? []).map((e) => ({ code: 'SCHEMA', path: e.instancePath || '(root)', message: `${e.message ?? 'invalid'}${e.params ? ` ${JSON.stringify(e.params)}` : ''}` }));
}

const LETTER: Record<string, string> = { inicio: 's', tarefa: 't', bifurcacao: 'g', chamada: 'c', fim: 'e' };

export function checkDoc(doc: Doc): FlowIssue[] {
  const issues: FlowIssue[] = [];
  const add = (code: string, path: string, message: string) => issues.push({ code, path, message });
  const ids: Record<string, Set<string>> = {};
  // Unique ids per collection.
  for (const c of ID_COLLECTIONS) {
    const seen = new Map<string, number>();
    ids[c] = new Set();
    (doc[c] as Doc[]).forEach((item, i) => {
      if (seen.has(item.id)) add('ID_DUPLICADO', `${c}[${i}].id`, `id '${item.id}' repeated in ${c} (items ${seen.get(item.id)} and ${i})`);
      else seen.set(item.id, i);
      ids[c].add(item.id);
    });
  }
  const shared = new Map<string, string>();
  for (const c of ['artefatos', 'variaveis'] as const) {
    (doc[c] as Doc[]).forEach((item, i) => {
      if (shared.has(item.id)) add('ID_DUPLICADO', `${c}[${i}].id`, `id '${item.id}' already used in ${shared.get(item.id)}`);
      else shared.set(item.id, `${c}[${i}]`);
    });
  }
  const decisoes: Doc[] = doc.decisoes;
  const raias: Doc[] = doc.raias;
  const nodeById = new Map<string, Doc>();
  for (const d of decisoes) if (!nodeById.has(d.id)) nodeById.set(d.id, d);
  const raiaById = new Map<string, Doc>();
  for (const r of raias) if (!raiaById.has(r.id)) raiaById.set(r.id, r);
  const libs = new Set<string>((doc.demandas as Doc[]).filter((d) => d.biblioteca === true).map((d) => d.id));
  // Subtask ids are unique among themselves and against node ids.
  const sub = new Map<string, string>();
  decisoes.forEach((d, i) => {
    ((d.subtarefas as Doc[] | undefined) ?? []).forEach((s, k) => {
      if (nodeById.has(s.id) || sub.has(s.id)) add('ID_DUPLICADO', `decisoes[${i}].subtarefas[${k}].id`, `subtask id '${s.id}' repeated`);
      else sub.set(s.id, `${i}.${k}`);
    });
  });
  // Transitions and gateways.
  decisoes.forEach((d, i) => {
    (d.proximo as Doc[]).forEach((t, j) => {
      if (!nodeById.has(t.para)) add('TRANSICAO_INVALIDA', `decisoes[${i}].proximo[${j}].para`, `'${d.id}' points to missing id '${t.para}'`);
    });
    if (d.tipo === 'bifurcacao' && (d.proximo as Doc[]).length < 2) add('BIFURCACAO_SAIDAS', `decisoes[${i}].proximo`, `gateway '${d.id}' has fewer than 2 exits`);
  });
  // Reachability inside each lane.
  const starts = new Map<string, string[]>();
  for (const d of decisoes) if (d.tipo === 'inicio' && raiaById.has(d.raia)) starts.set(d.raia, [...(starts.get(d.raia) ?? []), d.id]);
  const seen = new Set<string>();
  for (const [raia, list] of starts) {
    const queue = [...new Set(list)].sort();
    queue.forEach((x) => seen.add(x));
    while (queue.length) {
      const cur = queue.shift() as string;
      for (const t of (nodeById.get(cur)?.proximo as Doc[]) ?? []) {
        const dest = nodeById.get(t.para);
        if (dest && dest.raia === raia && !seen.has(t.para)) {
          seen.add(t.para);
          queue.push(t.para);
        }
      }
    }
  }
  decisoes.forEach((d, i) => {
    if (raiaById.has(d.raia) && !seen.has(d.id)) add('ORFA', `decisoes[${i}]`, `node '${d.id}' is not reachable from the start of lane '${d.raia}'`);
  });
  // Lane structure.
  const nodesOf = new Map<string, Array<[number, Doc]>>();
  for (const r of raiaById.keys()) nodesOf.set(r, []);
  decisoes.forEach((d, i) => nodesOf.get(d.raia)?.push([i, d]));
  raias.forEach((r, ri) => {
    if (raiaById.get(r.id) !== r) return;
    const nodes = nodesOf.get(r.id) ?? [];
    const inicios = nodes.filter(([, d]) => d.tipo === 'inicio');
    if (inicios.length === 0) add('RAIA_SEM_INICIO', `raias[${ri}]`, `lane '${r.id}' has no start node`);
    if (inicios.length > 1) add('RAIA_INICIO_MULTIPLO', `raias[${ri}]`, `lane '${r.id}' has ${inicios.length} start nodes`);
    const fins = nodes.filter(([, d]) => d.tipo === 'fim');
    if (fins.length === 0) add('RAIA_SEM_FIM', `raias[${ri}]`, `lane '${r.id}' has no end node`);
    const returns = new Map<string, string>();
    for (const [i, d] of fins) {
      if (!d.retorno) add('RAIA_SEM_FIM', `decisoes[${i}].retorno`, `end '${d.id}' has no return name`);
      else if (returns.has(d.retorno)) add('RAIA_SEM_FIM', `decisoes[${i}].retorno`, `return '${d.retorno}' of '${d.id}' repeats '${returns.get(d.retorno)}'`);
      else returns.set(d.retorno, d.id);
    }
  });
  decisoes.forEach((d, i) => {
    if (!raiaById.has(d.raia)) return;
    (d.proximo as Doc[]).forEach((t, j) => {
      const dest = nodeById.get(t.para);
      if (dest && raiaById.has(dest.raia) && dest.raia !== d.raia) add('TRANSICAO_ENTRE_RAIAS', `decisoes[${i}].proximo[${j}].para`, `'${d.id}' leaves its lane without a call node`);
    });
  });
  // Calls: target lane, return names, acyclic call graph.
  const calls = new Map<string, Set<string>>();
  for (const r of raiaById.keys()) calls.set(r, new Set());
  const calledLanes = new Set<string>();
  decisoes.forEach((d, i) => {
    const origin = raiaById.get(d.raia);
    const targetId = d.raia_chamada as string | undefined;
    if (d.tipo !== 'chamada') {
      if (targetId !== undefined) add('CHAMADA_INVALIDA', `decisoes[${i}].raia_chamada`, `'${d.id}' is not a call node but declares raia_chamada`);
      return;
    }
    if (targetId === undefined) return void add('CHAMADA_INVALIDA', `decisoes[${i}]`, `call node '${d.id}' has no raia_chamada`);
    const target = raiaById.get(targetId);
    if (!target || !origin) return;
    calledLanes.add(targetId);
    if (targetId === d.raia) return void add('CHAMADA_INVALIDA', `decisoes[${i}].raia_chamada`, `'${d.id}' calls its own lane`);
    if (target.demanda !== origin.demanda && !libs.has(target.demanda)) {
      return void add('CHAMADA_INVALIDA', `decisoes[${i}].raia_chamada`, `'${d.id}' calls lane '${targetId}' of another demand`);
    }
    calls.get(d.raia)?.add(targetId);
    const returns = new Set((nodesOf.get(targetId) ?? []).filter(([, x]) => x.tipo === 'fim' && x.retorno).map(([, x]) => x.retorno as string));
    const conds = (d.proximo as Doc[]).map((t) => t.condicao as string);
    const missing = [...returns].filter((x) => !conds.includes(x));
    const extra = [...new Set(conds)].filter((x) => !returns.has(x));
    const repeated = [...new Set(conds.filter((c, k) => conds.indexOf(c) !== k))];
    if (missing.length || extra.length || repeated.length) {
      add('RETORNOS_INCOMPATIVEIS', `decisoes[${i}].proximo`, `exits of '${d.id}' do not match returns of '${targetId}' (missing ${JSON.stringify(missing)}, extra ${JSON.stringify(extra)}, repeated ${JSON.stringify(repeated)})`);
    }
  });
  const reach = (from: string): Set<string> => {
    const out = new Set<string>();
    const stack = [...(calls.get(from) ?? [])];
    while (stack.length) {
      const cur = stack.pop() as string;
      if (out.has(cur)) continue;
      out.add(cur);
      stack.push(...(calls.get(cur) ?? []));
    }
    return out;
  };
  raias.forEach((r, ri) => {
    if (raiaById.get(r.id) === r && reach(r.id).has(r.id)) add('CHAMADA_CICLO', `raias[${ri}]`, `lane '${r.id}' is part of a call cycle`);
  });
  // Orchestrator per demand and orphan lanes.
  const byDemand = new Map<string, number[]>();
  raias.forEach((r, ri) => byDemand.set(r.demanda, [...(byDemand.get(r.demanda) ?? []), ri]));
  for (const [dem, indices] of byDemand) {
    const orqs = indices.filter((ri) => raias[ri].orquestradora === true);
    if (libs.has(dem)) {
      for (const ri of orqs) add('ORQUESTRADORA', `raias[${ri}].orquestradora`, `lane '${raias[ri].id}' belongs to a library and cannot orchestrate`);
    } else if (orqs.length === 0) add('ORQUESTRADORA', `raias[${indices[0]}]`, `demand '${dem}' has no orchestrator lane`);
    else if (orqs.length > 1) add('ORQUESTRADORA', `raias[${orqs[1]}].orquestradora`, `demand '${dem}' has ${orqs.length} orchestrator lanes`);
    for (const ri of indices) {
      const r = raias[ri];
      if ((libs.has(dem) || r.orquestradora !== true) && !calledLanes.has(r.id)) add('RAIA_ORFA', `raias[${ri}]`, `lane '${r.id}' is not called by any lane`);
    }
  }
  // Id patterns.
  const sigla = new Map<string, string>((doc.demandas as Doc[]).filter((d) => typeof d.sigla === 'string').map((d) => [d.id, d.sigla]));
  raias.forEach((r, ri) => {
    const s = sigla.get(r.demanda);
    if (s && !String(r.id).startsWith(`${s}_`)) add('ID_PADRAO', `raias[${ri}].id`, `lane id '${r.id}' must start with '${s}_'`);
  });
  decisoes.forEach((d, i) => {
    if (!raiaById.has(d.raia)) return;
    if (!new RegExp(`^${String(d.raia).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}_${LETTER[d.tipo]}\\d+$`).test(d.id)) {
      add('ID_PADRAO', `decisoes[${i}].id`, `node id '${d.id}' must look like '${d.raia}_${LETTER[d.tipo]}<n>'`);
    }
  });
  // Decision weights sum to 1.
  const pesos = (doc.decisor_construir_comprar_assinar?.pesos ?? {}) as Record<string, Record<string, number>>;
  for (const [goal, weights] of Object.entries(pesos)) {
    const sum = Object.values(weights).reduce((a, b) => a + b, 0);
    if (Math.abs(sum - 1) > 1e-9) add('PESOS', `decisor_construir_comprar_assinar.pesos.${goal}`, `weights of '${goal}' sum to ${sum}`);
  }
  // References.
  const broken = (path: string, target: string, collection: string, origin: string) => add('REF_QUEBRADA', path, `'${origin}' references missing id '${target}' (expected in ${collection})`);
  raias.forEach((r, i) => {
    if (!ids.demandas.has(r.demanda)) broken(`raias[${i}].demanda`, r.demanda, 'demandas', r.id);
  });
  decisoes.forEach((d, i) => {
    if (!ids.raias.has(d.raia)) broken(`decisoes[${i}].raia`, d.raia, 'raias', d.id);
    if (d.raia_chamada !== undefined && !ids.raias.has(d.raia_chamada)) broken(`decisoes[${i}].raia_chamada`, d.raia_chamada, 'raias', d.id);
    if (d.demanda !== undefined && !ids.demandas.has(d.demanda)) broken(`decisoes[${i}].demanda`, d.demanda, 'demandas', d.id);
    if (d.playbook !== undefined && !ids.playbooks.has(d.playbook)) broken(`decisoes[${i}].playbook`, d.playbook, 'playbooks', d.id);
  });
  const refFields: Record<string, string> = { tecnicas: 'tecnicas', abordagens: 'abordagens', padroes: 'padroes', estrategias: 'estrategias', categorias_ferramenta: 'categorias_ferramenta' };
  (doc.celulas as Doc[]).forEach((c, i) => {
    const origin = `${c.demanda}:${c.requisito}`;
    if (!ids.demandas.has(c.demanda)) broken(`celulas[${i}].demanda`, c.demanda, 'demandas', origin);
    if (!ids.requisitos.has(c.requisito)) broken(`celulas[${i}].requisito`, c.requisito, 'requisitos', origin);
    for (const [field, collection] of Object.entries(refFields)) {
      ((c[field] as string[] | undefined) ?? []).forEach((t, j) => {
        if (!ids[collection].has(t)) broken(`celulas[${i}].${field}[${j}]`, t, collection, origin);
      });
    }
  });
  (doc.playbooks as Doc[]).forEach((p, i) => {
    for (const [field, collection] of Object.entries(refFields)) {
      ((p[field] as string[] | undefined) ?? []).forEach((t, j) => {
        if (!ids[collection].has(t)) broken(`playbooks[${i}].${field}[${j}]`, t, collection, p.id);
      });
    }
  });
  return issues;
}
