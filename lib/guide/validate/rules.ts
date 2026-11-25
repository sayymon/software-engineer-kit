// SPDX-License-Identifier: MIT
// Guide flows: validates the guide document (lib/guide loadGuideDoc) with the vendored JSON Schema (Ajv)
// and ports the cross-reference rules of the guide validator (ids, transitions, lanes, calls, returns).
import Ajv2020 from 'ajv/dist/2020.js';

import type { GuideDoc } from '../index';
import { checarDados, pyFloat, pyRepr, checarFontes, checarLigacoes, type AddIssue } from './dados';
import { checarCoresDasRaias, checarDemandaDasRaias } from './raias';
export type Doc = GuideDoc;
export type FlowIssue = { code: string; path: string; message: string; itemId?: string | null };

const ID_COLLECTIONS = ['demandas', 'raias', 'requisitos', 'decisoes', 'playbooks', 'abordagens', 'tecnicas', 'padroes', 'estrategias', 'categorias_ferramenta', 'fontes'] as const;
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
  const add: AddIssue = (code, path, message, itemId) => issues.push(itemId === undefined ? { code, path, message } : { code, path, message, itemId });
  const ids: Record<string, Set<string>> = {};
  // Unique ids per collection.
  for (const c of ID_COLLECTIONS) {
    const seen = new Map<string, number>();
    ids[c] = new Set();
    (doc[c] as Doc[]).forEach((item, i) => {
      if (seen.has(item.id)) add('ID_DUPLICADO', `${c}[${i}].id`, `id '${item.id}' duplicado em ${c}: itens ${c}[${seen.get(item.id)}] e ${c}[${i}]`, item.id);
      else seen.set(item.id, i);
      ids[c].add(item.id);
    });
  }
  const shared = new Map<string, string>();
  for (const c of ['artefatos', 'variaveis'] as const) {
    // Optional collections, as in Python (`doc.get(colecao, [])`).
    ((doc[c] as Doc[] | undefined) ?? []).forEach((item, i) => {
      if (shared.has(item.id)) add('ID_DUPLICADO', `${c}[${i}].id`, `id '${item.id}' duplicado: já existe em ${shared.get(item.id)}; artefatos e variáveis dividem o mesmo espaço de ids`, item.id);
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
  // Subtask ids are unique among themselves and against node ids (first occurrence wins, as in the oracle).
  const where = new Map<string, string>();
  decisoes.forEach((d, i) => { if (!where.has(d.id)) where.set(d.id, `decisoes[${i}]`); });
  decisoes.forEach((d, i) => {
    ((d.subtarefas as Doc[] | undefined) ?? []).forEach((s, k) => {
      if (where.has(s.id)) add('ID_DUPLICADO', `decisoes[${i}].subtarefas[${k}].id`, `id de subtarefa '${s.id}' duplicado: já existe em ${where.get(s.id)}; os ids de subtarefas e de nós são globalmente únicos`, s.id);
      else where.set(s.id, `decisoes[${i}].subtarefas[${k}]`);
    });
  });
  // Transitions and gateways.
  decisoes.forEach((d, i) => {
    (d.proximo as Doc[]).forEach((t, j) => {
      if (!nodeById.has(t.para)) add('TRANSICAO_INVALIDA', `decisoes[${i}].proximo[${j}].para`, `transição de '${d.id}' aponta para id inexistente '${t.para}'`);
    });
    if (d.tipo === 'bifurcacao' && (d.proximo as Doc[]).length < 2) add('BIFURCACAO_SAIDAS', `decisoes[${i}].proximo`, `bifurcação '${d.id}' tem ${(d.proximo as Doc[]).length} saída(s); o mínimo é 2`);
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
    if (raiaById.has(d.raia) && !seen.has(d.id)) add('ORFA', `decisoes[${i}]`, `decisão '${d.id}' não é alcançável a partir do nó 'inicio' da raia '${d.raia}'`);
  });
  checarDemandaDasRaias(doc, add);
  // Lane structure.
  const nodesOf = new Map<string, Array<[number, Doc]>>();
  for (const r of raiaById.keys()) nodesOf.set(r, []);
  decisoes.forEach((d, i) => nodesOf.get(d.raia)?.push([i, d]));
  raias.forEach((r, ri) => {
    if (raiaById.get(r.id) !== r) return;
    const nodes = nodesOf.get(r.id) ?? [];
    const inicios = nodes.filter(([, d]) => d.tipo === 'inicio');
    if (inicios.length === 0) add('RAIA_SEM_INICIO', `raias[${ri}]`, `a raia '${r.id}' não tem nó 'inicio'; o esperado é exatamente 1`);
    if (inicios.length > 1) add('RAIA_INICIO_MULTIPLO', `raias[${ri}]`, `a raia '${r.id}' tem ${inicios.length} nós 'inicio' (${inicios.map(([, d]) => d.id).join(', ')}); o esperado é exatamente 1`);
    const fins = nodes.filter(([, d]) => d.tipo === 'fim');
    if (fins.length === 0) add('RAIA_SEM_FIM', `raias[${ri}]`, `a raia '${r.id}' não tem nó 'fim'; cada fim é um retorno nomeado da raia`);
    const returns = new Map<string, string>();
    for (const [i, d] of fins) {
      if (!d.retorno) add('RAIA_SEM_FIM', `decisoes[${i}].retorno`, `o fim '${d.id}' da raia '${r.id}' não declara \`retorno\``);
      else if (returns.has(d.retorno)) add('RAIA_SEM_FIM', `decisoes[${i}].retorno`, `o retorno '${d.retorno}' do fim '${d.id}' repete o de '${returns.get(d.retorno)}' na raia '${r.id}'; os retornos de uma raia são únicos`);
      else returns.set(d.retorno, d.id);
    }
  });
  decisoes.forEach((d, i) => {
    if (!raiaById.has(d.raia)) return;
    (d.proximo as Doc[]).forEach((t, j) => {
      const dest = nodeById.get(t.para);
      if (dest && raiaById.has(dest.raia) && dest.raia !== d.raia) add('TRANSICAO_ENTRE_RAIAS', `decisoes[${i}].proximo[${j}].para`, `'${d.id}' (raia '${d.raia}') aponta para '${dest.id}' (raia '${dest.raia}'); uma raia só aciona outra por um nó 'chamada'`);
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
      if (targetId !== undefined) add('CHAMADA_INVALIDA', `decisoes[${i}].raia_chamada`, `'${d.id}' não é do tipo 'chamada' mas declara \`raia_chamada\``);
      return;
    }
    if (targetId === undefined) return void add('CHAMADA_INVALIDA', `decisoes[${i}]`, `o nó 'chamada' '${d.id}' não declara \`raia_chamada\``);
    const target = raiaById.get(targetId);
    if (!target || !origin) return;
    calledLanes.add(targetId);
    if (targetId === d.raia) return void add('CHAMADA_INVALIDA', `decisoes[${i}].raia_chamada`, `'${d.id}' chama a própria raia '${targetId}'`);
    if (target.demanda !== origin.demanda && !libs.has(target.demanda)) {
      return void add('CHAMADA_INVALIDA', `decisoes[${i}].raia_chamada`, `'${d.id}' chama a raia '${targetId}' da demanda '${target.demanda}'; \`chamada\` só liga raias da mesma demanda ('${origin.demanda}') ou de uma biblioteca; entre demandas use \`ligacoes\``);
    }
    calls.get(d.raia)?.add(targetId);
    const returns = new Set((nodesOf.get(targetId) ?? []).filter(([, x]) => x.tipo === 'fim' && x.retorno).map(([, x]) => x.retorno as string));
    const conds = (d.proximo as Doc[]).map((t) => t.condicao as string);
    const byCodepoint = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);
    const missing = [...returns].filter((x) => !conds.includes(x)).sort(byCodepoint);
    const extra = [...new Set(conds)].filter((x) => !returns.has(x)).sort(byCodepoint);
    const repeated = [...new Set(conds.filter((c, k) => conds.indexOf(c) !== k))].sort(byCodepoint);
    if (missing.length || extra.length || repeated.length) {
      const parts: string[] = [];
      if (missing.length) parts.push(`faltam ${pyRepr(missing)}`);
      if (extra.length) parts.push(`sobram ${pyRepr(extra)}`);
      if (repeated.length) parts.push(`repetidas ${pyRepr(repeated)}`);
      add('RETORNOS_INCOMPATIVEIS', `decisoes[${i}].proximo`, `as saídas de '${d.id}' não casam com os retornos da raia '${targetId}': ${parts.join('; ')}`);
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
    if (raiaById.get(r.id) === r && reach(r.id).has(r.id)) add('CHAMADA_CICLO', `raias[${ri}]`, `a raia '${r.id}' participa de um ciclo de chamadas; o grafo raia -> raia_chamada deve ser acíclico`);
  });
  // Orchestrator per demand and orphan lanes.
  const byDemand = new Map<string, number[]>();
  raias.forEach((r, ri) => byDemand.set(r.demanda, [...(byDemand.get(r.demanda) ?? []), ri]));
  for (const [dem, indices] of byDemand) {
    const orqs = indices.filter((ri) => raias[ri].orquestradora === true);
    if (libs.has(dem)) {
      for (const ri of orqs) add('ORQUESTRADORA', `raias[${ri}].orquestradora`, `a raia '${raias[ri].id}' é de uma biblioteca ('${dem}') e não pode ser orquestradora`);
    } else if (orqs.length === 0) add('ORQUESTRADORA', `raias[${indices[0]}]`, `a demanda '${dem}' tem raias, mas nenhuma é \`orquestradora\`; o esperado é exatamente 1`, dem);
    else if (orqs.length > 1) for (const ri of orqs.slice(1)) add('ORQUESTRADORA', `raias[${ri}].orquestradora`, `a demanda '${dem}' tem ${orqs.length} raias orquestradoras; o esperado é exatamente 1`);
    for (const ri of indices) {
      const r = raias[ri];
      if ((libs.has(dem) || r.orquestradora !== true) && !calledLanes.has(r.id)) add('RAIA_ORFA', `raias[${ri}]`, `a raia '${r.id}' não é orquestradora e nenhuma raia a chama`);
    }
  }
  checarCoresDasRaias(doc, add);
  // Id patterns.
  const sigla = new Map<string, string>((doc.demandas as Doc[]).filter((d) => typeof d.sigla === 'string').map((d) => [d.id, d.sigla]));
  raias.forEach((r, ri) => {
    const s = sigla.get(r.demanda);
    if (s && !String(r.id).startsWith(`${s}_`)) add('ID_PADRAO', `raias[${ri}].id`, `o id da raia '${r.id}' deve começar com '${s}_' (sigla da demanda '${r.demanda}')`);
  });
  decisoes.forEach((d, i) => {
    if (!raiaById.has(d.raia)) return;
    if (!new RegExp(`^${String(d.raia).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}_${LETTER[d.tipo]}\\d+$`).test(d.id)) {
      add('ID_PADRAO', `decisoes[${i}].id`, `o id '${d.id}' deve ter a forma '${d.raia}_${LETTER[d.tipo]}<n>' (tipo '${d.tipo}', raia '${d.raia}')`);
    }
  });
  // Decision weights sum to 1.
  const pesos = (doc.decisor_construir_comprar_assinar?.pesos ?? {}) as Record<string, Record<string, number>>;
  for (const [goal, weights] of Object.entries(pesos)) {
    const sum = Object.values(weights).reduce((a, b) => a + b, 0);
    if (Math.abs(sum - 1) > 1e-9) add('PESOS', `decisor_construir_comprar_assinar.pesos.${goal}`, `pesos do objetivo '${goal}' somam ${pyFloat(sum)}; o esperado é 1 (tolerância 1e-09)`, goal);
  }
  // References.
  const broken = (path: string, target: string, collection: string, origin: string) => add('REF_QUEBRADA', path, `'${origin}' referencia id inexistente '${target}' (esperado em ${collection})`, origin);
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
  checarFontes(doc, ids, broken);
  checarLigacoes(doc, ids, broken, add);
  checarDados(doc, add);
  return issues;
}
