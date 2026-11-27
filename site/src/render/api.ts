// SPDX-License-Identifier: MIT
// Static JSON API payloads. A backend can replace these endpoints later; ids stay the keys.
import type { Page } from '@lib/content/site';
import { gerarGrafo } from '@lib/flow-graph';
import { gerarDiagramaDoGrafo } from '@lib/flow-mermaid';
import { construirFatos } from '@lib/ecossistema/fatos';
import { construirJornadas } from '@lib/home/jornadas';
import { construirPayload, construirShards } from '@lib/ecossistema/payload';
import { contexto, isMap } from '@lib/flow-graph/contexto';
import { lacunasDeDados, rastrearDados } from '@lib/guide/rastreio';
import type { Ctx } from './util';

export type LetrasRaci = { R: string[]; A: string[]; C: string[]; I: string[] };
export type RefDado = { id: string; tipo: 'artefato' | 'variavel'; url: string | null };
/** Technique cited by a node or Subtarefa: reference plus the name shown in the Modal_de_Playbook (text stays on the entity page). */
export type RefTecnica = { id: string; nome: string; url: string | null; uso?: string };
export type SubtarefaApi = { id: string; raci: LetrasRaci; entradas: RefDado[]; saidas: RefDado[]; tecnicas: RefTecnica[] };
export type NoApi = {
  id: string;
  tipo: string;
  raia: string;
  raci: LetrasRaci;
  entradas: RefDado[];
  saidas: RefDado[];
  /** Techniques of the node and of its Subtarefas, deduplicated, in guide order. */
  tecnicas: RefTecnica[];
  subtarefas: SubtarefaApi[];
};
export type DadoApi = {
  tipo: 'artefato' | 'variavel';
  nome: string;
  url: string | null;
  tipoArtefato?: string;
  subtipo?: string;
  produzidoPor: string[];
  consumidoPor: string[];
  semProdutor: boolean;
};
export type PapelApi = { id: string; nome: string; url: string | null };
/** Rito cited by the demand: name, page and the Nós (and Subtarefas) of this demand where it happens. Text stays on the rito page. */
export type RitoApi = { nome: string; url: string | null; nos: string[] };
/** Producer or consumer outside this demand (a Nó of another Demanda): never drawn here, so only name, page and kind. */
export type ExternoApi = { nome: string; url: string | null; tipo: string };
/** Key question of a playbook: the API carries the text once, keyed by id. */
export type PerguntaApi = { texto: string };

const strs = (v: unknown): string[] => (Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []);
const uniq = (xs: string[]): string[] => [...new Set(xs)];

/** R = papel + apoio, A = aprova, C = consultado, I = informado (same reading as the RACI validator). */
function raciDe(item: Record<string, unknown>): LetrasRaci {
  return {
    R: uniq([...(typeof item.papel === 'string' && item.papel ? [item.papel] : []), ...strs(item.apoio)]),
    A: typeof item.aprova === 'string' && item.aprova ? [item.aprova] : [],
    C: uniq(strs(item.consultado)),
    I: uniq(strs(item.informado)),
  };
}

function uniaoRaci(partes: LetrasRaci[]): LetrasRaci {
  const saida: LetrasRaci = { R: [], A: [], C: [], I: [] };
  for (const l of ['R', 'A', 'C', 'I'] as const) saida[l] = uniq(partes.flatMap((p) => p[l]));
  return saida;
}

/** RACI per node, inputs and outputs, and data tracing for one demand. References only: entity text stays on the entity pages. */
function dadosDoFluxo(
  ctx: Ctx,
  demandaId: string,
): { papeis: PapelApi[]; nos: NoApi[]; dados: Record<string, DadoApi>; ritos: Record<string, RitoApi>; externos: Record<string, ExternoApi> } {
  const doc = ctx.doc() as Record<string, unknown>;
  const c = contexto(doc, demandaId);
  const rastro = rastrearDados(doc);
  const lacunas = lacunasDeDados(doc);
  const artefatos = new Map<string, Record<string, unknown>>();
  for (const a of Array.isArray(doc.artefatos) ? doc.artefatos : []) if (isMap(a) && typeof a.id === 'string') artefatos.set(a.id, a);
  const url = (id: string): string | null => {
    const page = ctx.index.byId.get(id);
    return page ? ctx.href(page.route) : null;
  };
  const nome = (id: string): string => ctx.index.byId.get(id)?.nome ?? id;
  const tecnicasDe = (...fontes: unknown[]): RefTecnica[] => {
    const vistas = new Map<string, RefTecnica>();
    for (const fonte of fontes)
      for (const v of Array.isArray(fonte) ? fonte : []) {
        const id = typeof v === 'string' ? v : isMap(v) && typeof v.tecnica === 'string' ? v.tecnica : '';
        if (!id || vistas.has(id)) continue;
        const uso = isMap(v) && typeof v.uso === 'string' ? v.uso : undefined;
        vistas.set(id, { id, nome: nome(id), url: url(id), ...(uso ? { uso } : {}) });
      }
    return [...vistas.values()];
  };
  const usados = new Set<string>();
  const refs = (v: unknown): RefDado[] =>
    strs(v).flatMap((id) => {
      const r = rastro[id];
      if (!r) return [];
      usados.add(id);
      return [{ id, tipo: r.tipo, url: url(id) }];
    });
  const nos: NoApi[] = c.ordemNos.map((id) => {
    const no = c.nos.get(id) as Record<string, unknown>;
    const subs = (Array.isArray(no.subtarefas) ? no.subtarefas : []).filter(isMap).filter((s) => typeof s.id === 'string');
    const subtarefas: SubtarefaApi[] = subs.map((s) => ({ id: String(s.id), raci: raciDe(s), entradas: refs(s.entradas), saidas: refs(s.saidas), tecnicas: tecnicasDe(s.tecnicas) }));
    return {
      id,
      tipo: String(no.tipo),
      raia: String(no.raia),
      raci: uniaoRaci([raciDe(no), ...subtarefas.map((s) => s.raci)]),
      entradas: refs(no.entradas),
      saidas: refs(no.saidas),
      tecnicas: tecnicasDe(no.tecnicas, ...subs.map((s) => s.tecnicas)),
      subtarefas,
    };
  });
  const comPapel = new Set(nos.flatMap((n) => Object.values(n.raci).flat()));
  const papeis: PapelApi[] = (Array.isArray(doc.papeis) ? doc.papeis : [])
    .filter((p) => isMap(p) && typeof p.id === 'string' && comPapel.has(p.id))
    .map((p) => ({ id: String((p as Record<string, unknown>).id), nome: nome(String((p as Record<string, unknown>).id)), url: url(String((p as Record<string, unknown>).id)) }));
  const dados: Record<string, DadoApi> = {};
  for (const id of Object.keys(rastro)) {
    if (!usados.has(id)) continue;
    const r = rastro[id];
    const dado: DadoApi = { tipo: r.tipo, nome: nome(id), url: url(id), produzidoPor: r.produzido_por, consumidoPor: r.consumido_por, semProdutor: (lacunas[id] ?? []).includes('produtor') };
    const art = artefatos.get(id);
    if (r.tipo === 'artefato' && art) {
      if (typeof art.tipo === 'string') dado.tipoArtefato = art.tipo;
      if (typeof art.subtipo === 'string') dado.subtipo = art.subtipo;
    }
    dados[id] = dado;
  }
  return { papeis, nos, dados, ...ritosEExternos(ctx, doc, c, nos, dados, url, nome) };
}

/**
 * Ritos and out-of-demand producers/consumers that the modal needs to name. Producers and consumers are ids of Nós, Subtarefas,
 * Raias or ritos of the whole guide; the ones that are not in this demand are listed once, with name and page only.
 */
function ritosEExternos(
  ctx: Ctx,
  doc: Record<string, unknown>,
  c: ReturnType<typeof contexto>,
  nos: NoApi[],
  dados: Record<string, DadoApi>,
  url: (id: string) => string | null,
  nome: (id: string) => string,
): { ritos: Record<string, RitoApi>; externos: Record<string, ExternoApi> } {
  const locais = new Set(nos.flatMap((n) => [n.id, ...n.subtarefas.map((s) => s.id)]));
  const ritosDoGuia = new Map<string, Record<string, unknown>>();
  for (const r of Array.isArray(doc.ritos) ? doc.ritos : []) if (isMap(r) && typeof r.id === 'string') ritosDoGuia.set(r.id, r);
  const citados = new Set(Object.values(dados).flatMap((d) => [...d.produzidoPor, ...d.consumidoPor]));
  const ritos: Record<string, RitoApi> = {};
  for (const [id, r] of ritosDoGuia) {
    const aqui = strs(r.acontece_em).filter((x) => locais.has(x));
    if (aqui.length === 0 && !citados.has(id)) continue;
    ritos[id] = { nome: nome(id), url: url(id), nos: aqui };
  }
  const externos: Record<string, ExternoApi> = {};
  // Subtarefas have no page of their own (and some Nós, like the ends of a lane, neither): name them by their label and, for a
  // Subtarefa, link the page of the Nó that owns it.
  const semPagina = new Map<string, { rotulo: string; url: string | null; tipo: string }>();
  for (const d of Array.isArray(doc.decisoes) ? doc.decisoes : [])
    if (isMap(d) && typeof d.id === 'string') {
      semPagina.set(d.id, { rotulo: String(d.rotulo ?? d.id), url: url(d.id), tipo: 'no' });
      for (const s of Array.isArray(d.subtarefas) ? d.subtarefas : [])
        if (isMap(s) && typeof s.id === 'string') semPagina.set(s.id, { rotulo: String(s.rotulo ?? s.id), url: url(d.id), tipo: 'subtarefa' });
    }
  for (const id of citados) {
    if (locais.has(id) || c.raias.has(id) || ritosDoGuia.has(id)) continue;
    const page = ctx.index.byId.get(id);
    const alt = semPagina.get(id);
    if (page) externos[id] = { nome: page.nome, url: url(id), tipo: page.tipo };
    else if (alt) externos[id] = { nome: alt.rotulo, url: alt.url, tipo: alt.tipo };
  }
  return { ritos, externos };
}

/**
 * Texts of the key questions the playbooks of this demand cite. Questions are anchors of the guide (no page of their own), so the text
 * is read from the guide and stored once here, keyed by id; the playbook keeps the ids and their order.
 */
function perguntasDoFluxo(ctx: Ctx, playbooks: unknown): Record<string, PerguntaApi> {
  const textos = new Map<string, string>();
  for (const q of Array.isArray(ctx.doc().perguntas) ? (ctx.doc().perguntas as unknown[]) : [])
    if (isMap(q) && typeof q.id === 'string' && typeof q.texto === 'string') textos.set(q.id, q.texto);
  const saida: Record<string, PerguntaApi> = {};
  for (const pb of Array.isArray(playbooks) ? playbooks : [])
    for (const id of isMap(pb) ? strs(pb.perguntas_chave) : []) {
      const texto = textos.get(id);
      if (texto !== undefined) saida[id] = { texto };
    }
  return saida;
}

export function indexJson(ctx: Ctx) {
  return {
    locale: ctx.locale,
    count: ctx.index.pages.length,
    items: ctx.index.pages.map((p) => ({
      id: p.id,
      tipo: p.tipo,
      layer: p.layer,
      nome: p.nome,
      descricao: p.entity.data.descricao ?? '',
      url: ctx.href(p.route),
      fallback: p.entity.fallback,
    })),
  };
}

export function graphJson(ctx: Ctx) {
  return {
    locale: ctx.locale,
    nodes: ctx.index.pages.map((p) => ({ id: p.id, tipo: p.tipo, layer: p.layer, nome: p.nome })),
    edges: ctx.index.edges(),
  };
}

export function flowJson(ctx: Ctx, page: Page) {
  const d = page.entity.data;
  const library = d.biblioteca === true;
  const raias = Array.isArray(d.raias) ? d.raias : [];
  const diagrams: Record<string, string> = {};
  if (!library && raias.length) {
    const grafo = gerarGrafo(ctx.doc(), page.id);
    for (const view of ['visao', 'completo']) diagrams[view] = gerarDiagramaDoGrafo(grafo, view).texto;
  }
  const extra = !library && raias.length ? dadosDoFluxo(ctx, page.id) : { papeis: [], nos: [], dados: {}, ritos: {}, externos: {} };
  return {
    id: page.id,
    tipo: page.tipo,
    locale: ctx.locale,
    nome: page.nome,
    sigla: d.sigla ?? null,
    biblioteca: library,
    raias,
    decisoes: d.decisoes ?? [],
    playbooks: d.playbooks ?? [],
    /** True when this locale has no translation of the guide content and the pt-BR text is served (Requirements 6.12, 15.5). */
    fallback: page.entity.fallback,
    perguntas: !library && raias.length ? perguntasDoFluxo(ctx, d.playbooks) : {},
    diagrams,
    papeis: extra.papeis,
    nos: extra.nos,
    dados: extra.dados,
    ritos: extra.ritos,
    externos: extra.externos,
  };
}

/** Ecossistema 3D: columnar payload of the nucleo and fluxo layers (see lib/ecossistema/payload.ts). */
export function ecossistemaJson(ctx: Ctx) {
  return construirPayload(ctx.index);
}
export function ecossistemaShards(ctx: Ctx) {
  return construirShards(ctx.index);
}
export function ecossistemaFatos(ctx: Ctx) {
  return construirFatos(ctx.index);
}

/** Journeys, competencies and certifications for the immersive Home. */
export function jornadasHomeJson(ctx: Ctx) {
  return construirJornadas(ctx.index, ctx.href);
}
