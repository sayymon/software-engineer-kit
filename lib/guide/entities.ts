// SPDX-License-Identifier: MIT
// Derives one typed entity per guide item. The YAML in content/guide stays the single source: nothing is copied
// into content/pt-BR. Ids equal the guide ids. When a guide id collides with an existing id, the later tipo gets
// the suffix `_<tipo>` (papel `seguranca` becomes `seguranca_papel`). Guide techniques merged into a kit note
// (`guia_ids`) get no entity: their id stays an alias of the kit note.
import { dirname, join } from 'node:path';
import type { GuideFile } from './load';
import { SUBTIPOS, TIPOS, TIPOS_LEGADOS } from './taxonomia';

type Obj = Record<string, any>;
export type KitRef = { id: string; tipo: string; data: Obj };
export type DerivedEntity = {
  id: string;
  /** Guide id (equals `id` unless the collision suffix was applied). */
  guideId: string;
  tipo: string;
  relPath: string;
  /** Absolute path of the YAML file the item comes from. */
  file: string;
  data: Obj;
};
export type DeriveResult = { entities: DerivedEntity[]; aliases: Map<string, string>; problems: string[] };

/** Entities that live as an anchor on the page of another entity. */
export const ANCHOR_TIPOS = ['no', 'subtarefa', 'playbook', 'pergunta', 'celula'] as const;

const FOLDER: Record<string, string> = {
  demanda: 'flows',
  raia: 'flows/raias',
  tarefa: 'flows/tarefas',
  decisao: 'flows/decisoes',
  no: 'flows/nos',
  subtarefa: 'flows/subtarefas',
  playbook: 'flows/playbooks',
  pergunta: 'flows/perguntas',
  celula: 'flows/celulas',
  artefato: 'flows/artefatos',
  variavel: 'flows/variaveis',
  papel: 'flows/papeis',
  rito: 'flows/ritos',
  tecnica: 'fundamentals/techniques',
  requisito: 'flows/catalog',
  abordagem: 'flows/catalog',
  estrategia: 'flows/catalog',
  'categoria-ferramenta': 'flows/catalog',
  'fonte-guia': 'flows/catalog',
  'padrao-guia': 'flows/catalog',
  'tipo-de-artefato': 'flows/tipos-de-artefato',
};
/** Top-level collections that map to a tipo. A non-empty collection outside this table aborts the load. */
const COLLECTION_TIPO: Record<string, string> = {
  tecnicas: 'tecnica',
  requisitos: 'requisito',
  abordagens: 'abordagem',
  estrategias: 'estrategia',
  categorias_ferramenta: 'categoria-ferramenta',
  fontes: 'fonte-guia',
  padroes: 'padrao-guia',
};
const KNOWN_KEYS = new Set(['versao', 'ordem_das_demandas', 'demandas', 'raias', 'decisoes', 'playbooks', 'perguntas', 'celulas', 'artefatos', 'variaveis', 'papeis', 'ritos', 'decisor_construir_comprar_assinar', ...Object.keys(COLLECTION_TIPO)]);

/** Reference fields by the tipos they point to (preference order when a guide id is ambiguous). */
const PAPEL = ['papel'];
const ARTEFATO_OU_VARIAVEL = ['artefato', 'variavel'];
const NODE = ['no', 'tarefa', 'decisao'];
const REF_FIELDS: Record<string, string[]> = {
  papel: PAPEL,
  apoio: PAPEL,
  consultado: PAPEL,
  informado: PAPEL,
  aprova: PAPEL,
  destinatarios: PAPEL,
  tecnicas: ['tecnica'],
  abordagens: ['abordagem'],
  padroes: ['padrao-guia'],
  estrategias: ['estrategia'],
  categorias_ferramenta: ['categoria-ferramenta'],
  entradas: ARTEFATO_OU_VARIAVEL,
  saidas: ARTEFATO_OU_VARIAVEL,
  perguntas: ['pergunta'],
  depende_de: [...NODE, 'rito'],
  acontece_em: NODE,
  seguinte: ['rito'],
  playbook: ['playbook'],
  raia: ['raia'],
  raia_chamada: ['raia'],
  demanda: ['demanda'],
  requisito: ['requisito'],
};
const wiki = (id: string) => `[[${id}]]`;
const strip = (o: Obj, drop: string[]): Obj => Object.fromEntries(Object.entries(o).filter(([k, v]) => !drop.includes(k) && v !== undefined));
const asList = (v: unknown): unknown[] => (Array.isArray(v) ? v : v === undefined || v === null ? [] : [v]);

export function deriveGuideEntities(files: GuideFile[], kit: KitRef[], contentRoot: string): DeriveResult {
  const problems: string[] = [];
  const taken = new Set(kit.map((k) => k.id));
  const aliases = new Map<string, string>();
  for (const k of kit) for (const gid of (k.data.guia_ids as string[] | undefined) ?? []) if (!taken.has(gid)) aliases.set(gid, k.id);
  const demandOf = new Map<string, GuideFile>();
  // Collect items per tipo in the order of the plan (demandas, raias, nodes, ...).
  const byFile = (name: string) => files.find((f) => f.name === name);
  const comum = byFile('comum.yaml');
  const raiasComuns = byFile('raias-comuns.yaml');
  const ritos = byFile('ritos.yaml');
  const demandFiles = files.filter((f) => f.name.startsWith('demandas/'));
  for (const f of files) for (const key of Object.keys(f.data)) if (!KNOWN_KEYS.has(key) && Array.isArray(f.data[key]) && f.data[key].length > 0) problems.push(`${f.name}: collection "${key}" has no mapping`);
  const demandSources: Array<{ file: GuideFile; header: Obj; parts: GuideFile[] }> = [];
  if (raiasComuns) demandSources.push({ file: raiasComuns, header: (raiasComuns.data.demandas as Obj[])[0], parts: [comum as GuideFile, raiasComuns] });
  for (const f of demandFiles) demandSources.push({ file: f, header: (f.data.demandas as Obj[])[0], parts: [f] });
  for (const d of demandSources) demandOf.set(d.header.id, d.file);

  // Pass 1: nodes, to know the tipo of each.
  const nodes: Array<{ item: Obj; file: GuideFile; demanda: string }> = [];
  for (const d of demandSources) for (const part of d.parts) for (const n of (part.data.decisoes as Obj[] | undefined) ?? []) nodes.push({ item: n, file: part, demanda: d.header.id });
  const nodeTipo = (n: Obj) => (n.tipo === 'tarefa' ? 'tarefa' : n.tipo === 'bifurcacao' ? 'decisao' : 'no');

  // Registry of guide id -> (tipo, final id), filled while claiming ids in plan order.
  const registry = new Map<string, Array<{ tipo: string; id: string }>>();
  const claim = (guideId: string, tipo: string): string => {
    let final = guideId;
    if (taken.has(final)) final = `${guideId}_${tipo.replace(/-/g, '_')}`;
    if (taken.has(final)) {
      problems.push(`id "${guideId}" of tipo ${tipo} collides with an existing id even with the suffix`);
      return final;
    }
    taken.add(final);
    const list = registry.get(guideId) ?? [];
    list.push({ tipo, id: final });
    registry.set(guideId, list);
    return final;
  };

  type Plan = { tipo: string; guideId: string; id: string; file: string; item: Obj; ctx: Obj };
  const plan: Plan[] = [];
  const add = (tipo: string, guideId: string, file: string, item: Obj, ctx: Obj = {}) => plan.push({ tipo, guideId, id: claim(guideId, tipo), file, item, ctx });
  const fileOf = (f: GuideFile) => f.file;
  for (const d of demandSources) add('demanda', d.header.id, fileOf(d.file), d.header, { parts: d.parts });
  for (const d of demandSources) for (const part of d.parts) for (const r of (part.data.raias as Obj[] | undefined) ?? []) add('raia', r.id, fileOf(part), r);
  for (const n of nodes) if (nodeTipo(n.item) === 'tarefa') add('tarefa', n.item.id, fileOf(n.file), n.item, { demanda: n.demanda });
  for (const n of nodes) if (nodeTipo(n.item) === 'decisao') add('decisao', n.item.id, fileOf(n.file), n.item, { demanda: n.demanda });
  for (const n of nodes) if (nodeTipo(n.item) === 'no') add('no', n.item.id, fileOf(n.file), n.item, { demanda: n.demanda });
  for (const n of nodes) for (const s of (n.item.subtarefas as Obj[] | undefined) ?? []) add('subtarefa', s.id, fileOf(n.file), s, { tarefa: n.item.id });
  for (const d of demandSources) for (const part of d.parts) for (const p of (part.data.playbooks as Obj[] | undefined) ?? []) add('playbook', p.id, fileOf(part), p);
  for (const f of files) for (const q of (f.data.perguntas as Obj[] | undefined) ?? []) add('pergunta', q.id, fileOf(f), q);
  for (const d of demandSources) for (const part of d.parts) for (const c of (part.data.celulas as Obj[] | undefined) ?? []) add('celula', `celula_${c.demanda}_${c.requisito}`, fileOf(part), c);
  for (const a of (comum?.data.artefatos as Obj[] | undefined) ?? []) add('artefato', a.id, fileOf(comum as GuideFile), a);
  for (const d of demandFiles) for (const a of (d.data.artefatos as Obj[] | undefined) ?? []) add('artefato', a.id, fileOf(d), a);
  for (const v of (comum?.data.variaveis as Obj[] | undefined) ?? []) add('variavel', v.id, fileOf(comum as GuideFile), v);
  for (const p of (comum?.data.papeis as Obj[] | undefined) ?? []) add('papel', p.id, fileOf(comum as GuideFile), p);
  for (const r of (ritos?.data.ritos as Obj[] | undefined) ?? []) add('rito', r.id, fileOf(ritos as GuideFile), r);
  for (const [collection, tipo] of Object.entries(COLLECTION_TIPO)) {
    for (const f of files) {
      for (const item of (f.data[collection] as Obj[] | undefined) ?? []) {
        if (tipo === 'tecnica' && aliases.has(item.id)) continue;
        add(tipo, item.id, fileOf(f), item);
      }
    }
  }
  const taxFile = join(dirname(contentRoot), 'lib/guide/taxonomia.ts');
  for (const t of [...TIPOS, ...TIPOS_LEGADOS]) add('tipo-de-artefato', `tipo_artefato_${t}`, taxFile, { id: `tipo_artefato_${t}`, tipo: t }, { legado: (TIPOS_LEGADOS as readonly string[]).includes(t) });

  // Resolution of a guide id to a final id.
  const unresolved = new Set<string>();
  const resolve = (guideId: unknown, prefer: string[]): string | undefined => {
    if (typeof guideId !== 'string') return undefined;
    const list = registry.get(guideId);
    if (list) {
      for (const t of prefer) {
        const hit = list.find((x) => x.tipo === t);
        if (hit) return hit.id;
      }
      return list[0].id;
    }
    return aliases.get(guideId);
  };
  // Page that hosts an anchor: follows owners until an entity with its own page.
  const hostOf = new Map<string, string>();
  const entityById = new Map(plan.map((p) => [p.id, p]));
  const pageOf = (final: string, seen = new Set<string>()): string | undefined => {
    const p = entityById.get(final);
    if (!p || seen.has(final)) return undefined;
    seen.add(final);
    if (!(ANCHOR_TIPOS as readonly string[]).includes(p.tipo)) return final;
    const owner = hostOf.get(final);
    return owner ? pageOf(owner, seen) : undefined;
  };

  // Owner (the entity an anchor belongs to), computed from the guide references.
  const demandOfRaia = new Map<string, string>();
  for (const p of plan) if (p.tipo === 'raia') demandOfRaia.set(p.id, p.item.demanda);
  for (const p of plan) {
    if (p.tipo === 'no') hostOf.set(p.id, resolve(p.item.raia, ['raia']) as string);
    else if (p.tipo === 'subtarefa') hostOf.set(p.id, resolve(p.ctx.tarefa, ['tarefa']) as string);
    else if (p.tipo === 'celula') hostOf.set(p.id, resolve(p.item.demanda, ['demanda']) as string);
  }
  const playbookOwner = new Map<string, string>();
  for (const n of nodes) if (n.item.playbook) playbookOwner.set(n.item.playbook, n.item.id);
  for (const p of plan) {
    if (p.tipo === 'playbook') {
      const node = playbookOwner.get(p.item.id);
      hostOf.set(p.id, resolve(node, NODE) as string);
    }
  }
  for (const p of plan) {
    if (p.tipo === 'pergunta') {
      const dep = asList(p.item.depende_de)[0];
      const owner = resolve(dep, [...NODE, 'rito']);
      if (owner) hostOf.set(p.id, owner);
    }
  }
  for (const p of plan) if (p.tipo === 'playbook' && !hostOf.get(p.id)) problems.push(`playbook ${p.guideId} is not referenced by any node`);

  // Relations from the reference fields of an item.
  const relationsOf = (p: Plan): string[] => {
    const out: string[] = [];
    const add1 = (guideId: unknown, prefer: string[]) => {
      const target = resolve(guideId, prefer);
      if (!target) {
        if (typeof guideId === 'string') unresolved.add(`${p.tipo} ${p.guideId}: ${guideId}`);
        return;
      }
      if (target !== p.id && !out.includes(target)) out.push(wiki(target));
    };
    const item = p.item;
    for (const [field, prefer] of Object.entries(REF_FIELDS)) {
      if (p.tipo === 'celula' && field === 'perguntas_chave') continue;
      for (const v of asList(item[field])) add1(typeof v === 'object' && v !== null ? (v as Obj).tecnica : v, prefer);
    }
    if (p.tipo === 'playbook') for (const v of asList(item.perguntas_chave)) add1(v, ['pergunta']);
    for (const t of asList(item.proximo)) add1((t as Obj).para, NODE);
    for (const l of asList(item.ligacoes)) {
      add1((l as Obj).demanda_destino, ['demanda']);
      add1((l as Obj).para, NODE);
    }
    for (const t of asList(item.tecnicas)) if (typeof t === 'object' && t !== null) add1((t as Obj).tecnica, ['tecnica']);
    if (p.tipo === 'tarefa') for (const s of asList(item.subtarefas)) add1((s as Obj).id, ['subtarefa']);
    if (p.tipo === 'subtarefa') add1(p.ctx.tarefa, ['tarefa']);
    if (p.tipo === 'playbook') add1(playbookOwner.get(item.id), NODE);
    if (p.tipo === 'artefato') add1(`tipo_artefato_${item.tipo}`, ['tipo-de-artefato']);
    if (p.tipo === 'tarefa' || p.tipo === 'decisao' || p.tipo === 'no') add1(p.ctx.demanda, ['demanda']);
    if (p.tipo === 'raia') add1(item.demanda, ['demanda']);
    return out;
  };

  const entities: DerivedEntity[] = [];
  const nodeById = new Map<string, Obj>(nodes.map((n) => [n.item.id as string, n.item]));
  const nameOf = (p: Plan): string => {
    const i = p.item;
    switch (p.tipo) {
      case 'demanda':
      case 'raia':
      case 'artefato':
      case 'variavel':
      case 'papel':
      case 'rito':
      case 'tecnica':
      case 'requisito':
      case 'abordagem':
      case 'estrategia':
      case 'categoria-ferramenta':
      case 'padrao-guia':
        return String(i.nome);
      case 'tarefa':
      case 'decisao':
      case 'no':
      case 'subtarefa':
        return String(i.rotulo ?? i.id);
      case 'pergunta':
        return String(i.texto);
      case 'playbook': {
        const node = nodeById.get(playbookOwner.get(i.id) ?? '');
        return `Playbook: ${String(node?.rotulo ?? i.id)}`;
      }
      case 'celula':
        return `${String(demandOf.get(i.demanda) ? ((demandOf.get(i.demanda) as GuideFile).data.demandas as Obj[])[0].nome : i.demanda)}: ${i.requisito}`;
      case 'fonte-guia':
        return String(i.titulo);
      default:
        return p.tipo === 'tipo-de-artefato' ? `Tipo de artefato: ${String(i.tipo)}` : String(i.id);
    }
  };
  for (const p of plan) {
    const relacoes = relationsOf(p);
    const rel = relacoes.length ? { relacoes } : {};
    const host = hostOf.get(p.id);
    const page = host ? pageOf(host) : undefined;
    const pagina = (ANCHOR_TIPOS as readonly string[]).includes(p.tipo) ? { pagina: wiki(page ?? host ?? p.id) } : {};
    if ((ANCHOR_TIPOS as readonly string[]).includes(p.tipo) && !page) problems.push(`${p.tipo} ${p.guideId}: no page hosts this anchor`);
    const base: Obj = { id: p.id, tipo: p.tipo, nome: nameOf(p) };
    let data: Obj;
    const i = p.item;
    switch (p.tipo) {
      case 'demanda': {
        const parts = p.ctx.parts as GuideFile[];
        const lists: Obj = {};
        for (const k of ['artefatos', 'variaveis', 'papeis', 'raias', 'decisoes', 'playbooks', 'celulas', 'perguntas']) {
          const merged = parts.flatMap((part) => (part.data[k] as unknown[] | undefined) ?? []);
          if (merged.length > 0 || k === 'raias' || k === 'decisoes') lists[k] = merged;
        }
        data = {
          ...base,
          ...strip(i, ['id', 'nome']),
          publico: i.publico ?? false,
          ...(p.guideId === 'comum' && comum
            ? { versao: comum.data.versao, ordem_das_demandas: comum.data.ordem_das_demandas, decisor_construir_comprar_assinar: comum.data.decisor_construir_comprar_assinar }
            : {}),
          ...lists,
        };
        break;
      }
      case 'raia':
        data = { ...base, ...strip(i, ['id', 'nome']) };
        break;
      case 'tarefa':
        data = { ...base, ...strip(i, ['id', 'tipo', 'subtarefas']), ...(i.subtarefas ? { subtarefas: (i.subtarefas as Obj[]).map((s) => resolve(s.id, ['subtarefa']) as string) } : {}) };
        break;
      case 'decisao':
        data = { ...base, ...strip(i, ['id', 'tipo']) };
        break;
      case 'no':
        data = { ...base, no_tipo: i.tipo, ...strip(i, ['id', 'tipo']) };
        break;
      case 'subtarefa':
        data = { ...base, tarefa: resolve(p.ctx.tarefa, ['tarefa']), ...strip(i, ['id']) };
        break;
      case 'playbook':
        data = { ...base, no: resolve(playbookOwner.get(i.id), NODE), ...strip(i, ['id']) };
        break;
      case 'pergunta':
        data = { ...base, ...strip(i, ['id']) };
        break;
      case 'celula':
        data = { ...base, ...strip(i, []) };
        break;
      case 'artefato':
        data = { ...base, artefato_tipo: i.tipo, ...strip(i, ['id', 'tipo']) };
        break;
      case 'variavel':
        data = { ...base, variavel_tipo: i.tipo, ...strip(i, ['id', 'tipo']) };
        break;
      case 'fonte-guia':
        data = { ...base, fonte_tipo: i.tipo, ...strip(i, ['id', 'tipo']) };
        break;
      case 'tipo-de-artefato': {
        const sub = SUBTIPOS[i.tipo] ?? {};
        data = { ...base, artefato_tipo: i.tipo, legado: p.ctx.legado, subtipos: Object.entries(sub).map(([sid, rotulo]) => ({ id: sid, rotulo })) };
        break;
      }
      default:
        data = { ...base, ...strip(i, ['id', 'nome']) };
    }
    if (p.tipo === 'tipo-de-artefato') {
      // Links to the artifacts of the tipo, so the page lists them.
      const members = plan.filter((x) => x.tipo === 'artefato' && x.item.tipo === i.tipo).map((x) => wiki(x.id));
      if (members.length) data.relacoes = members;
    } else if (relacoes.length) Object.assign(data, rel);
    Object.assign(data, pagina);
    if (p.tipo === 'tarefa' || p.tipo === 'decisao' || p.tipo === 'no') {
      data.demanda = p.ctx.demanda;
    }
    const folder = FOLDER[p.tipo];
    const relPath = p.tipo === 'demanda' ? `flows/${p.id}.yaml` : `${folder}/${p.id}.yaml`;
    entities.push({ id: p.id, guideId: p.guideId, tipo: p.tipo, relPath, file: p.file, data: JSON.parse(JSON.stringify(data)) as Obj });
  }
  for (const u of [...unresolved].sort()) problems.push(`unresolved guide reference ${u}`);
  return { entities, aliases, problems };
}
