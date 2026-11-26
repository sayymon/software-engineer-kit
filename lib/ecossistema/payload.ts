// SPDX-License-Identifier: MIT
// Static payloads of the Ecossistema 3D, built from the SiteIndex at build time.
//  - index.json: nucleo + fluxo nodes and edges in a columnar layout (integers and string tables).
//  - detalhe/<demanda>.json: the detalhe layer (gateways, subtasks, questions, nodes, cells, playbooks), loaded on demand.
import { createHash } from 'node:crypto';
import { z } from 'zod';
import { relationTargets, type Page, type SiteIndex } from '../content/site';
import { construirAdjacencia } from './adjacencia';
import { areaDaCamada, camadaDe, grupoDe, type Area } from './camadas';
import { calcularLayout } from './layout';

export const VERSAO = 1 as const;
/** Edge kinds drawn with less weight: wikilinks inside the body text. */
export const KINDS_FRACOS = ['body'] as const;

const NoSchema = z.tuple([z.string().min(1), z.number().int().nonnegative(), z.string(), z.number().int(), z.number().int(), z.number().int(), z.number().int().nonnegative()]);
const ArestaSchema = z.tuple([z.number().int().nonnegative(), z.number().int().nonnegative(), z.number().int().nonnegative()]);

export const PayloadSchema = z
  .object({
    versao: z.literal(VERSAO),
    locale: z.enum(['pt-BR', 'en']),
    tipos: z.array(z.string()),
    kinds: z.array(z.string()),
    fracos: z.array(z.number().int().nonnegative()),
    /** nos[i] = [id, tipoIdx, nome, x, y, z, grau] with x, y, z as integers (world units times ESCALA). */
    nos: z.array(NoSchema),
    /** arestas[j] = [origemIdx, destinoIdx, kindIdx] */
    arestas: z.array(ArestaSchema),
  })
  .superRefine((p, ctx) => {
    const ids = new Set<string>();
    p.nos.forEach((n, i) => {
      if (ids.has(n[0])) ctx.addIssue({ code: 'custom', path: ['nos', i], message: `id duplicado: ${n[0]}` });
      ids.add(n[0]);
      if (n[1] >= p.tipos.length) ctx.addIssue({ code: 'custom', path: ['nos', i], message: `tipo fora da tabela: ${n[0]}` });
    });
    p.arestas.forEach((a, j) => {
      if (a[0] >= p.nos.length || a[1] >= p.nos.length) ctx.addIssue({ code: 'custom', path: ['arestas', j], message: `aresta órfã (${a[0]} -> ${a[1]})` });
      if (a[2] >= p.kinds.length) ctx.addIssue({ code: 'custom', path: ['arestas', j], message: `kind fora da tabela (${a[2]})` });
    });
  });
export type PayloadEcossistema = z.infer<typeof PayloadSchema>;

export const ShardSchema = z.object({
  versao: z.literal(VERSAO),
  demanda: z.string(),
  tipos: z.array(z.string()),
  kinds: z.array(z.string()),
  /** nos[i] = [id, tipoIdx, nome, paiId] */
  nos: z.array(z.tuple([z.string().min(1), z.number().int().nonnegative(), z.string(), z.string()])),
  /** arestas[j] = [origemId, destinoId, kindIdx] */
  arestas: z.array(z.tuple([z.string(), z.string(), z.number().int().nonnegative()])),
});
export type ShardDetalhe = z.infer<typeof ShardSchema>;

function tabela(valores: Iterable<string>): { lista: string[]; idx: Map<string, number> } {
  const lista = [...new Set(valores)].sort();
  return { lista, idx: new Map(lista.map((v, i) => [v, i])) };
}

/** Pages shown in the main payload: the nucleo and fluxo layers. */
export function paginasPrincipais(index: SiteIndex): Page[] {
  return index.pages.filter((p) => camadaDe(p.tipo) !== 'detalhe');
}

const CACHE_LAYOUT = new Map<string, Int32Array>();

export function construirPayload(index: SiteIndex): PayloadEcossistema {
  const paginas = paginasPrincipais(index);
  const posicao = new Map(paginas.map((p, i) => [p.id, i]));
  const tipos = tabela(paginas.map((p) => p.tipo));
  const brutas = index.edges().filter((e) => posicao.has(e.source) && posicao.has(e.target));
  const kinds = tabela(brutas.map((e) => e.kind));
  const arestas = brutas.map((e) => [posicao.get(e.source)!, posicao.get(e.target)!, kinds.idx.get(e.kind)!] as const);
  const adj = construirAdjacencia(paginas.length, arestas);
  const areas: Area[] = paginas.map((p) => areaDaCamada(p.layer));
  // The layout depends only on the structure, so both locales share one computation.
  const chave = createHash('sha1')
    .update(JSON.stringify([paginas.map((p) => [p.id, p.tipo, p.layer]), arestas, kinds.lista]))
    .digest('hex');
  let xyz = CACHE_LAYOUT.get(chave);
  if (!xyz) {
    xyz = calcularLayout({
      n: paginas.length,
      adj,
      area: areas,
      hub: paginas.map((p) => p.tipo === 'hub'),
      kindsFracos: new Set(KINDS_FRACOS.map((k) => kinds.idx.get(k)).filter((v): v is number => v !== undefined)),
    });
    CACHE_LAYOUT.set(chave, xyz);
  }
  return PayloadSchema.parse({
    versao: VERSAO,
    locale: index.locale,
    tipos: tipos.lista,
    kinds: kinds.lista,
    fracos: KINDS_FRACOS.map((k) => kinds.idx.get(k)).filter((v): v is number => v !== undefined),
    nos: paginas.map((p, i) => [p.id, tipos.idx.get(p.tipo)!, p.nome, xyz[i * 3], xyz[i * 3 + 1], xyz[i * 3 + 2], adj.grau(i)]),
    arestas: arestas.map((a) => [a[0], a[1], a[2]]),
  });
}

/** Demand a page belongs to, or `comum` for the shared library. */
function demandaDe(p: Page, index: SiteIndex): string {
  if (p.tipo === 'demanda') return p.id;
  const d = p.entity.data.demanda;
  if (typeof d === 'string' && d) return index.byId.has(d) ? d : 'comum';
  return 'comum';
}

export function construirShards(index: SiteIndex): Map<string, ShardDetalhe> {
  type Item = { id: string; tipo: string; nome: string; pai: string; demanda: string; relacoes: Array<{ id: string }> };
  const itens: Item[] = [];
  const detalheIds = new Set<string>();
  for (const p of index.pages) {
    if (camadaDe(p.tipo) === 'detalhe') {
      const raia = typeof p.entity.data.raia === 'string' ? index.byId.get(p.entity.data.raia) : undefined;
      itens.push({ id: p.id, tipo: p.tipo, nome: p.nome, pai: raia ? raia.id : p.id, demanda: demandaDe(p, index), relacoes: [] });
      detalheIds.add(p.id);
    }
    for (const a of index.anchorsOf(p.id)) {
      itens.push({ id: a.id, tipo: a.tipo, nome: String(a.data.nome ?? a.id), pai: p.id, demanda: demandaDe(p, index), relacoes: relationTargets(a.data) });
      detalheIds.add(a.id);
    }
  }
  const porDemanda = new Map<string, Item[]>();
  for (const it of itens) (porDemanda.get(it.demanda) ?? porDemanda.set(it.demanda, []).get(it.demanda)!).push(it);
  const ligadosPorGateway = index.edges().filter((e) => detalheIds.has(e.source) || detalheIds.has(e.target));
  const saida = new Map<string, ShardDetalhe>();
  for (const [demanda, lista] of [...porDemanda.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    const tipos = tabela(lista.map((i) => i.tipo));
    const proprios = new Set(lista.map((i) => i.id));
    const brutas: Array<[string, string, string]> = [];
    const visto = new Set<string>();
    const add = (s: string, t: string, k: string) => {
      if (s === t) return;
      const key = `${s}\u0000${t}\u0000${k}`;
      if (visto.has(key)) return;
      visto.add(key);
      brutas.push([s, t, k]);
    };
    // An endpoint is usable when it is in the main payload or in this shard. Detail items of other demands are skipped.
    const usavel = (id: string) => proprios.has(id) || !detalheIds.has(id);
    for (const it of lista) {
      if (it.pai !== it.id && usavel(it.pai)) add(it.pai, it.id, 'contem');
      for (const r of it.relacoes) {
        const alvo = proprios.has(r.id) ? r.id : index.resolve(r.id)?.id;
        if (alvo && usavel(alvo)) add(it.id, alvo, 'relacao');
      }
    }
    for (const e of ligadosPorGateway) if ((proprios.has(e.source) || proprios.has(e.target)) && usavel(e.source) && usavel(e.target)) add(e.source, e.target, e.kind);
    const kinds = tabela(brutas.map((b) => b[2]));
    saida.set(
      demanda,
      ShardSchema.parse({
        versao: VERSAO,
        demanda,
        tipos: tipos.lista,
        kinds: kinds.lista,
        nos: lista.map((i) => [i.id, tipos.idx.get(i.tipo)!, i.nome, i.pai]),
        arestas: brutas.map(([s, t, k]) => [s, t, kinds.idx.get(k)!]),
      }),
    );
  }
  return saida;
}

export { grupoDe };
