// SPDX-License-Identifier: MIT
// Modelo_de_Grafo of a demand: lanes and nodes in display order (same order as the Mermaid generator),
// explicit `ordem`, subtasks and edges. No fs or node:* imports: this module also compiles for the client.
import { descreverCondicao } from '../guide/rastreio';
import { ModeloDeGrafo, VERSAO_MODELO_DE_GRAFO } from '../schema/grafo';
import type { ArestaDoGrafo, NoDoGrafo, RaiaDoGrafo, SubtarefaGrafo } from '../schema/grafo';
import { type Contexto, GeracaoError, contexto, isMap, lista } from './contexto';
import { ordenarNatural } from '../flow-mermaid/order';
import type { Item } from '../flow-mermaid/types';

export type { ModeloDeGrafo } from '../schema/grafo';

/** The generated graph violates the Modelo_de_Grafo schema. Names the demand and the field path. */
export class GrafoInvalidoError extends GeracaoError {}

const COR_PADRAO = '#CCCCCC';
const RE_COR = /^#[0-9A-Fa-f]{6}$/;

/** Python truthiness for the values the reference tests with `or`. */
const truthy = (v: unknown): boolean => !(v == null || v === '' || v === 0 || v === false || (Array.isArray(v) && v.length === 0));
const texto = (v: unknown, padrao: string): string => (truthy(v) ? String(v) : padrao);
const cor = (v: unknown): string => (typeof v === 'string' && RE_COR.test(v) ? v.toUpperCase() : COR_PADRAO);

function subtarefas(no: Item): SubtarefaGrafo[] {
  if (no.tipo !== 'tarefa') return [];
  const subs = (no.subtarefas ?? []).filter((s: unknown) => isMap(s) && truthy(s.id));
  return subs.map((s: Item, ordem: number) => {
    const quando = descreverCondicao(s.quando);
    const sub: Record<string, unknown> = {
      id: String(s.id),
      rotulo: texto(s.rotulo, String(s.id)),
      ordem,
      condicional: truthy(s.quando),
    };
    if (quando) sub.quando = quando;
    if (truthy(s.papel)) sub.papel = String(s.papel);
    if (truthy(s.responsavel)) sub.responsavel = s.responsavel;
    return sub as SubtarefaGrafo;
  });
}

function nosDoGrafo(ctx: Contexto, playbooks: Set<string>): NoDoGrafo[] {
  const contador = new Map<string, number>();
  return ctx.ordemNos.map((id) => {
    const no = ctx.nos.get(id) as Item;
    const raia = String(no.raia);
    const ordem = contador.get(raia) ?? 0;
    contador.set(raia, ordem + 1);
    const saida: Record<string, unknown> = { id, tipo: no.tipo, rotulo: texto(no.rotulo, id), raia, ordem };
    if (no.tipo === 'chamada') saida.raiaChamada = String(no.raia_chamada);
    if (no.tipo === 'fim' && truthy(no.retorno)) saida.retorno = String(no.retorno);
    saida.subtarefas = subtarefas(no);
    saida.temPlaybook = truthy(no.playbook) && playbooks.has(String(no.playbook));
    return saida as NoDoGrafo;
  });
}

const aresta = (origem: string, destino: string, rotulo: string, tracejada = false): ArestaDoGrafo => ({ origem, destino, rotulo, tracejada });

function inicioDaRaia(ctx: Contexto, raiaId: string): string | null {
  for (const i of ordenarNatural(ctx.nos.keys())) {
    const n = ctx.nos.get(i) as Item;
    if (n.raia === raiaId && n.tipo === 'inicio') return i;
  }
  return null;
}

/** `proximo` edges plus call and return edges, same selection as the Mermaid `completo` view. */
function arestasDoGrafo(ctx: Contexto): ArestaDoGrafo[] {
  const ids = ctx.ordemNos;
  const proximo: ArestaDoGrafo[] = [];
  for (const i of ids) {
    for (const p of (ctx.nos.get(i) as Item).proximo ?? []) {
      if (isMap(p) && ctx.nos.has(String(p.para))) proximo.push(aresta(i, String(p.para), texto(p.condicao, '')));
    }
  }
  const chamadas = ids.filter((i) => (ctx.nos.get(i) as Item).tipo === 'chamada');
  const porRaia = new Map<string, number>();
  for (const c of chamadas) {
    const alvo = String((ctx.nos.get(c) as Item).raia_chamada);
    porRaia.set(alvo, (porRaia.get(alvo) ?? 0) + 1);
  }
  const extras: ArestaDoGrafo[] = [];
  const cobertos = new Set<string>();
  for (const c of chamadas) {
    const cn = ctx.nos.get(c) as Item;
    const alvo = String(cn.raia_chamada);
    const ini = inicioDaRaia(ctx, alvo);
    if (ini !== null) extras.push(aresta(c, ini, 'chama', true));
    const fins = ids.filter((i) => {
      const n = ctx.nos.get(i) as Item;
      return n.raia === alvo && n.tipo === 'fim';
    });
    for (const f of fins) {
      const ret = texto((ctx.nos.get(f) as Item).retorno, '');
      for (const p of cn.proximo ?? []) {
        if (isMap(p) && ctx.nos.has(String(p.para)) && texto(p.condicao, '') === ret) {
          extras.push(aresta(f, String(p.para), porRaia.get(alvo) === 1 ? `retorno: ${ret}` : `retorno: ${ret} (${c})`, true));
          cobertos.add(JSON.stringify([c, String(p.para)]));
        }
      }
    }
  }
  const manter = proximo.filter(
    (a) => !cobertos.has(JSON.stringify([a.origem, a.destino])) || (ctx.nos.get(a.origem) as Item).tipo !== 'chamada',
  );
  const vistas = new Set<string>();
  const saida: ArestaDoGrafo[] = [];
  for (const a of [...manter, ...extras]) {
    const k = JSON.stringify([a.origem, a.destino, a.rotulo, a.tracejada]);
    if (!vistas.has(k)) {
      vistas.add(k);
      saida.push(a);
    }
  }
  return saida;
}

function raiasDoGrafo(ctx: Contexto): RaiaDoGrafo[] {
  return ctx.ordemRaias.map((id, ordem) => {
    const r = ctx.todasRaias.get(id) as Item;
    return { id, nome: texto(r.nome, id), cor: cor(r.cor), ordem, orquestradora: r.orquestradora === true };
  });
}

function caminho(path: ReadonlyArray<PropertyKey>): string {
  return path.reduce<string>((acc, p) => (typeof p === 'number' ? `${acc}[${p}]` : acc ? `${acc}.${String(p)}` : String(p)), '');
}

/** Builds and validates the Modelo_de_Grafo of one demand. Throws `GrafoInvalidoError` naming the demand and the field path. */
export function gerarGrafo(doc: Item, demandaId: string): ModeloDeGrafo {
  const ctx = contexto(doc, demandaId);
  const playbooks = new Set(lista(doc, 'playbooks').map((p) => String(p.id)));
  const bruto = {
    versaoContrato: VERSAO_MODELO_DE_GRAFO,
    demanda: demandaId,
    nomeDemanda: texto(ctx.demanda.nome, demandaId),
    raias: raiasDoGrafo(ctx),
    nos: nosDoGrafo(ctx, playbooks),
    arestas: arestasDoGrafo(ctx),
  };
  const r = ModeloDeGrafo.safeParse(bruto);
  if (!r.success) {
    const problemas = r.error.issues.map((i) => `${caminho(i.path) || '(raiz)'}: ${i.message}`).join('; ');
    throw new GrafoInvalidoError(`grafo inválido na demanda '${demandaId}': ${problemas}`);
  }
  return r.data;
}

/** Graphs of every non-library demand that has lanes, in guide order. */
export function gerarGrafos(doc: Item): Map<string, ModeloDeGrafo> {
  const saida = new Map<string, ModeloDeGrafo>();
  const raias = lista(doc, 'raias');
  for (const d of lista(doc, 'demandas')) {
    const id = String(d.id);
    if (d.biblioteca === true) continue;
    if (!raias.some((r) => r.demanda === id)) continue;
    saida.set(id, gerarGrafo(doc, id));
  }
  return saida;
}
