// SPDX-License-Identifier: MIT
// Port of the reference `guias_diagrama.py` generator.
// Assembly, ids, colors (Okabe-Ito), escapes, flow order and views (`visao`, `raia:<id>`, `completo`)
// match the Python reference byte for byte. See tests/mermaid-parity.
import { type Contexto, GeracaoError, LETRA_TIPO, contexto, isMap, lista, pyRepr } from '../flow-graph/contexto';
import { gerarGrafo } from '../flow-graph';
import { type ConjuntoExpandido, projetar } from '../flow-graph/expansao';
import type { LigacaoDoGrafo, ModeloDeGrafo } from '../schema/grafo';
import { chaveNatural, cmpKey } from './order';
import type { Diagrama, Item } from './types';

export type { Diagrama, Item } from './types';
export { GeracaoError, LETRA_TIPO } from '../flow-graph/contexto';
export { chaveNatural, ordemFluxo, ordemRaias, ordenarNatural } from './order';

export const VISAO = 'visao';
export const COMPLETO = 'completo';
export const PREFIXO_RAIA = 'raia:';
const COR_PADRAO = '#CCCCCC';
const RE_COR = /^#[0-9A-Fa-f]{6}$/;
const RE_NOME_ARQUIVO = /^[A-Za-z0-9_.-]+$/;
const RESERVADAS = new Set([
  'end', 'graph', 'flowchart', 'subgraph', 'style', 'class', 'classdef', 'click', 'linkstyle',
  'default', 'direction', 'call', 'href', 'interpolate',
]);
const RE_ID_SEGURO = /^[A-Za-z][A-Za-z0-9_]*$/;

const ROTULO_RESPONSAVEL: Record<string, string> = { agente: '🤖 agente', pessoa: '👤 pessoa', ambos: '🤝 ambos' };

/** Python truthiness for the values the reference tests with `or`. */
const truthy = (v: unknown): boolean => !(v == null || v === '' || v === 0 || v === false || (Array.isArray(v) && v.length === 0));
const or = <T>(v: T | null | undefined, d: T): T => (truthy(v) ? (v as T) : d);
const codePoints = (s: string): number => [...s].length;

export function subtarefasDoNo(no: Item): Item[] {
  if (no.tipo !== 'tarefa') return [];
  return (no.subtarefas ?? []).filter((s: unknown) => isMap(s) && truthy(s.id));
}

// ---------------------------------------------------------------- text and ids
const RE_TRAVESSAO_ESPACADO = /\s+[\u2012-\u2015\u2212]\s+/g;
const RE_TRAVESSAO = /[\u2012-\u2015\u2212]/g;
// eslint-disable-next-line no-control-regex
const RE_CONTROLE = /[\x00-\x08\x0b-\x1f\x7f\u2028\u2029\u0085]/g;

/** Replaces dashes with a comma (spaced) or a hyphen (attached). */
export function semTravessoes(texto: string): string {
  return texto.replace(RE_TRAVESSAO_ESPACADO, ', ').replace(RE_TRAVESSAO, '-');
}

export function limparTexto(valor: unknown): string {
  let texto = valor == null ? '' : String(valor);
  texto = texto.replace(/\t/g, ' ').replace(/\r/g, ' ').replace(/\n/g, ' ').replace(RE_CONTROLE, ' ');
  texto = semTravessoes(texto);
  return texto.replace(/ {2,}/g, ' ').trim();
}

const ESCAPES: Array<[string, string]> = [
  ['#', '#35;'],
  ['"', '#quot;'],
  ['<', '#lt;'],
  ['>', '#gt;'],
  ['&', '#amp;'],
  ['`', '#96;'],
  ['%', '#37;'],
  ['\\', '#92;'],
];

export function escaparRotulo(valor: unknown): string {
  let texto = limparTexto(valor);
  for (const [origem, destino] of ESCAPES) texto = texto.split(origem).join(destino);
  return texto;
}

/** Mermaid node id. Injective: distinct ids never collide. */
export function sanitizarId(id: string): string {
  if (RE_ID_SEGURO.test(id) && !RESERVADAS.has(id.toLowerCase()) && !id.startsWith('x_') && !id.startsWith('z_')) return id;
  const partes = [...id].map((c) => (/^[A-Za-z0-9]$/.test(c) ? c : `_${(c.codePointAt(0) as number).toString(16)}_`));
  return `x_${partes.join('')}`;
}

const idSg = (raiaId: string) => `z_SG_${sanitizarId(raiaId)}`;
export const idSubgraph = idSg;

// ---------------------------------------------------------------------- colors
/** Python `round()` (half to even) so colors match the reference exactly. */
function pyRound(x: number): number {
  const f = Math.floor(x);
  const d = x - f;
  if (d < 0.5) return f;
  if (d > 0.5) return f + 1;
  return f % 2 === 0 ? f : f + 1;
}
const rgb = (cor: string): [number, number, number] => [
  Number.parseInt(cor.slice(1, 3), 16),
  Number.parseInt(cor.slice(3, 5), 16),
  Number.parseInt(cor.slice(5, 7), 16),
];
const hex = (r: number, g: number, b: number): string =>
  '#' + [r, g, b].map((v) => Math.max(0, Math.min(255, pyRound(v))).toString(16).toUpperCase().padStart(2, '0')).join('');

export function corValida(cor: unknown): string {
  return typeof cor === 'string' && RE_COR.test(cor) ? cor.toUpperCase() : COR_PADRAO;
}
export function clarear(cor: string, fracao: number): string {
  const [r, g, b] = rgb(cor);
  return hex(r + (255 - r) * fracao, g + (255 - g) * fracao, b + (255 - b) * fracao);
}
export function escurecer(cor: string, fracao: number): string {
  const [r, g, b] = rgb(cor);
  return hex(r * (1 - fracao), g * (1 - fracao), b * (1 - fracao));
}
function luminancia(cor: string): number {
  const canal = (v: number) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  const [r, g, b] = rgb(cor).map(canal) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
/** Black or white, whichever has the better WCAG contrast over `fundo`. */
export function corTexto(fundo: string): string {
  const lum = luminancia(fundo);
  return (lum + 0.05) / 0.05 >= 1.05 / (lum + 0.05) ? '#000000' : '#FFFFFF';
}

// ---------------------------------------------------------------- model access
const ordenar = (ctx: Contexto, ids: Iterable<string>): string[] => {
  const conjunto = new Set(ids);
  return ctx.ordemNos.filter((i) => conjunto.has(i));
};
const corRaia = (ctx: Contexto, rid: string) => corValida((ctx.todasRaias.get(rid) as Item).cor);
const nomeRaia = (ctx: Contexto, rid: string) => String((ctx.todasRaias.get(rid) as Item).nome || rid);

function orquestradora(ctx: Contexto): string {
  for (const i of ctx.ordemRaias) if ((ctx.raias.get(i) as Item).orquestradora === true) return i;
  throw new GeracaoError(`a demanda ${ctx.demanda.id} não tem raia orquestradora`);
}

export function raiasOrdenadas(doc: Item, demandaId: string): string[] {
  return [...contexto(doc, demandaId).ordemRaias];
}

/** Views of a demand in stable order: visao, raia:<id>..., completo. */
export function visoesDaDemanda(doc: Item, demandaId: string): string[] {
  const ctx = contexto(doc, demandaId);
  return [VISAO, ...ctx.ordemRaias.map((i) => PREFIXO_RAIA + i), COMPLETO];
}

export function nomeArquivo(demandaId: string, visao: string): string {
  const meio = visao.startsWith(PREFIXO_RAIA) ? visao.slice(PREFIXO_RAIA.length) : visao;
  const nome = `${demandaId}.${meio}.mmd`;
  if (!RE_NOME_ARQUIVO.test(nome)) throw new GeracaoError(`id não pode virar nome de arquivo: ${pyRepr(nome)}`);
  return nome;
}

// ---------------------------------------------------------------------- nodes
export const LIMITE_LINHA_GATEWAY = 20;
export const FONTE_GATEWAY_PX = 11;

/** Breaks text into lines of at most `limite` characters without splitting words. */
export function quebrarRotulo(valor: unknown, limite = LIMITE_LINHA_GATEWAY): string[] {
  const palavras = limparTexto(valor).split(' ');
  const linhas: string[] = [];
  let atual = '';
  for (const palavra of palavras) {
    if (!palavra) continue;
    if (atual && codePoints(atual) + 1 + codePoints(palavra) > limite) {
      linhas.push(atual);
      atual = palavra;
    } else {
      atual = atual ? `${atual} ${palavra}` : palavra;
    }
  }
  if (atual) linhas.push(atual);
  return linhas.length ? linhas : [''];
}

function rotuloNo(_ctx: Contexto, no: Item, indicadorSubtarefas = false): string {
  const texto = or(no.rotulo, no.id);
  const corpo = no.tipo === 'bifurcacao' ? quebrarRotulo(texto).map(escaparRotulo).join('<br/>') : escaparRotulo(texto);
  const linhas = [`<small><b>${escaparRotulo(no.id)}</b></small>`, corpo];
  const nSub = indicadorSubtarefas ? subtarefasDoNo(no).length : 0;
  if (nSub) linhas.push(`<i>▸ ${nSub} subtarefa${nSub > 1 ? 's' : ''}</i>`);
  if (no.tipo === 'fim' && truthy(no.retorno)) linhas.push(`<i>retorno: ${escaparRotulo(no.retorno)}</i>`);
  return linhas.join('<br/>');
}

function declaracaoNo(ctx: Contexto, no: Item, indicadorSubtarefas = false): string {
  const sid = sanitizarId(String(no.id));
  const rot = rotuloNo(ctx, no, indicadorSubtarefas);
  const forma: Record<string, (r: string) => string> = {
    inicio: (r) => `(["${r}"])`,
    fim: (r) => `(["${r}"])`,
    tarefa: (r) => `["${r}"]`,
    bifurcacao: (r) => `{"${r}"}`,
    chamada: (r) => `[["${r}"]]`,
  };
  return `${sid}${forma[no.tipo as string](rot)}`;
}

function declaracaoSubtarefa(sub: Item, papeis: Map<string, string>): string {
  const resp = String(or(sub.responsavel, ''));
  let selo = ROTULO_RESPONSAVEL[resp] ?? resp;
  if (truthy(sub.papel)) selo = papeis.get(String(sub.papel)) ?? String(sub.papel);
  const prefixo = truthy(sub.quando) ? '◆ ' : '';
  const linhas = [`<small><b>${escaparRotulo(sub.id)}</b></small>`, prefixo + escaparRotulo(or(sub.rotulo, sub.id))];
  if (selo) linhas.push(`<i>${escaparRotulo(selo)}</i>`);
  return `${sanitizarId(String(sub.id))}("${linhas.join('<br/>')}")`;
}

const idTs = (tarefaId: string) => `z_TS_${sanitizarId(tarefaId)}`;
const indice = (ctx: Contexto, raiaId: string) => ctx.ordemRaias.indexOf(raiaId);
const classeRaia = (ctx: Contexto, r: string) => `z_R_${indice(ctx, r)}`;
const classeSub = (ctx: Contexto, r: string) => `z_S_${indice(ctx, r)}`;
const classeSubCond = (ctx: Contexto, r: string) => `z_SC_${indice(ctx, r)}`;
const classeChamada = (ctx: Contexto, chamadora: string, chamada: string) => `z_C_${indice(ctx, chamadora)}_${indice(ctx, chamada)}`;
const classeDoNo = (ctx: Contexto, no: Item) =>
  no.tipo === 'chamada' ? classeChamada(ctx, no.raia, no.raia_chamada) : classeRaia(ctx, no.raia);
const defClasse = (nome: string, fundo: string, borda: string, largura: number) =>
  `classDef ${nome} fill:${fundo},stroke:${borda},stroke-width:${largura}px,color:${corTexto(fundo)}`;

// ---------------------------------------------------------------------- legend
const LEG = 'z_LEG';

function legenda(ctx: Contexto, chamadas: string[], comSub = false, comCond = false): string[] {
  const chips = chamadas.map((rid, i) => `${LEG}_r${i}["<b>${escaparRotulo(nomeRaia(ctx, rid))}</b><br/>raia chamada"]`);
  const elementos = [
    `${LEG}_s(["<b>s</b>: início"])`,
    `${LEG}_t["<b>t</b>: tarefa"]`,
    `${LEG}_g{"<b>g</b>: gateway"}`,
    `${LEG}_c[["<b>c</b>: chamada de outra raia<br/>cor da raia chamada,<br/>borda da raia que chama"]]`,
    `${LEG}_e(["<b>e</b>: fim ou retorno"])`,
    ...(comSub ? [`${LEG}_st("<b>st</b>: subtarefa")`] : []),
    ...(comCond ? [`${LEG}_sc("<b>◆ st</b>: subtarefa condicional<br/>borda tracejada")`] : []),
    ...chips,
  ];
  return [`subgraph ${LEG}["Legenda"]`, '  direction LR', '  ' + elementos.join(' ~~~ '), 'end'];
}

function classesLegenda(ctx: Contexto, chamadas: string[], comSub = false, comCond = false): string[] {
  const linhas = [
    'classDef leg fill:#FFFFFF,stroke:#333333,stroke-width:1px,color:#000000',
    'classDef legc fill:#FFFFFF,stroke:#333333,stroke-width:4px,color:#000000',
    `class ${LEG}_s,${LEG}_t,${LEG}_g,${LEG}_e leg`,
    `class ${LEG}_c legc`,
  ];
  if (comSub) linhas.push(`class ${LEG}_st leg`);
  if (comCond) {
    linhas.push('classDef legcond fill:#FFFFFF,stroke:#333333,stroke-width:2px,stroke-dasharray:4 3,color:#000000');
    linhas.push(`class ${LEG}_sc legcond`);
  }
  chamadas.forEach((rid, i) => linhas.push(`class ${LEG}_r${i} ${classeRaia(ctx, rid)}`));
  linhas.push(`style ${LEG} fill:#FAFAFA,stroke:#999999,stroke-width:1px`);
  return linhas;
}

// ---------------------------------------------------------------------- edges
type Aresta = { origem: string; destino: string; rotulo: string; tracejada: boolean };
const chaveAresta = (a: Aresta) => JSON.stringify([a.origem, a.destino, a.rotulo, a.tracejada]);
const aresta = (origem: string, destino: string, rotulo: string, tracejada = false): Aresta => ({ origem, destino, rotulo, tracejada });

// Setas de aresta do Mermaid: sintaxe do diagrama, não filtro de HTML. A seta reta é montada por
// repeat() porque auditores de HTML leem a sequência fechada como fim de comentário HTML —
// o valor em runtime é exatamente `-->`, como os testes golden provam.
const SETA_TRACEJADA = '-.->';
const SETA_RETA = '-'.repeat(2) + '>';

function arestaTexto(a: Aresta): string {
  const seta = a.tracejada ? SETA_TRACEJADA : SETA_RETA;
  const rot = limparTexto(a.rotulo) ? `|"${escaparRotulo(a.rotulo)}"|` : '';
  return `${sanitizarId(a.origem)} ${seta}${rot} ${sanitizarId(a.destino)}`;
}

/** Cross-demand links of a node in the shape of the Modelo_de_Grafo. */
type Ligacoes = Map<string, LigacaoDoGrafo[]>;

function pontes(ctx: Contexto, ids: Set<string>, ligacoes: Ligacoes): { decl: string[]; arestas: Aresta[]; ids: string[] } {
  const decl: string[] = [];
  const arestas: Aresta[] = [];
  const pontesIds: string[] = [];
  for (const i of ordenar(ctx, ids)) {
    (ligacoes.get(i) ?? []).forEach((lig, n) => {
      const pid = `z_LIG_${sanitizarId(i)}_${n}`;
      const partes = [
        `<b>${escaparRotulo(lig.rotulo)}</b>`,
        `demanda: ${escaparRotulo(lig.demandaDestino)}`,
        `nó: ${escaparRotulo(lig.para)}`,
      ];
      decl.push(`${pid}{{"${partes.join('<br/>')}"}}`);
      pontesIds.push(pid);
      arestas.push(aresta(i, pid, escaparRotulo(lig.tipo), true));
    });
  }
  return { decl, arestas, ids: pontesIds };
}

function arestaPonteTexto(a: Aresta): string {
  const rot = limparTexto(a.rotulo) ? `|"${escaparRotulo(a.rotulo)}"|` : '';
  return `${sanitizarId(a.origem)} -.->${rot} ${a.destino}`;
}

// ---------------------------------------------------------------------- assembly
function montar(
  ctx: Contexto,
  raiasVisiveis: string[],
  ids: Set<string>,
  arestasBase: Aresta[],
  ligacoes: Ligacoes,
  comPontes: boolean,
  comLegenda: boolean,
  subtarefas = false,
  agruparRaias = true,
): Diagrama {
  const chamadasIds = new Set([...ids].filter((i) => (ctx.nos.get(i) as Item).tipo === 'chamada').map((i) => (ctx.nos.get(i) as Item).raia_chamada));
  const visiveis = new Set(raiasVisiveis);
  const chamadasSemSubgraph = ctx.ordemRaias.filter((r) => chamadasIds.has(r) && !visiveis.has(r));
  const comSub = ordenar(ctx, ids).filter((i) => subtarefasDoNo(ctx.nos.get(i) as Item).length > 0);
  const saidaDe = new Map<string, string>();
  if (subtarefas) {
    for (const i of comSub) {
      const subs = subtarefasDoNo(ctx.nos.get(i) as Item);
      saidaDe.set(i, String(subs[subs.length - 1].id));
    }
  }
  const legendaSub = comLegenda && subtarefas && comSub.length > 0;
  const legendaCond =
    legendaSub && comSub.some((i) => subtarefasDoNo(ctx.nos.get(i) as Item).some((s) => truthy(s.quando)));
  const linhas: string[] = ['flowchart LR'];
  if (comLegenda) linhas.push(...legenda(ctx, chamadasSemSubgraph, legendaSub, legendaCond).map((x) => '  ' + x));
  const cadeia: Aresta[] = [];
  for (const rid of raiasVisiveis) {
    const raia = ctx.raias.get(rid) as Item;
    const titulo = `<b>${escaparRotulo(or(raia.nome, rid))}</b>`;
    if (agruparRaias) {
      linhas.push(`  subgraph ${idSg(rid)}["${titulo}"]`);
      linhas.push('    direction LR');
    }
    for (const i of ordenar(ctx, ids)) {
      const no = ctx.nos.get(i) as Item;
      if (no.raia !== rid) continue;
      if (subtarefas && saidaDe.has(i)) {
        const subs = subtarefasDoNo(no);
        const rotTarefa = `<b>${escaparRotulo(or(no.rotulo, i))}</b>`;
        linhas.push(`    subgraph ${idTs(i)}["${rotTarefa}"]`);
        linhas.push('      direction LR');
        linhas.push('      ' + declaracaoNo(ctx, no));
        for (const sub of subs) linhas.push('      ' + declaracaoSubtarefa(sub, ctx.papeis));
        linhas.push('    end');
        let anterior = i;
        for (const sub of subs) {
          cadeia.push(aresta(anterior, String(sub.id), ''));
          anterior = String(sub.id);
        }
      } else {
        linhas.push('    ' + declaracaoNo(ctx, no, !subtarefas));
      }
    }
    if (agruparRaias) linhas.push('  end');
  }
  const arestas = arestasBase.map((a) => aresta(saidaDe.get(a.origem) ?? a.origem, a.destino, a.rotulo, a.tracejada));
  const vistas = new Set<string>();
  const unicas: Aresta[] = [];
  for (const a of [...cadeia, ...arestas]) {
    const k = chaveAresta(a);
    if (!vistas.has(k)) {
      vistas.add(k);
      unicas.push(a);
    }
  }
  for (const a of unicas) linhas.push('  ' + arestaTexto(a));
  let pontesIds: string[] = [];
  if (comPontes) {
    const p = pontes(ctx, ids, ligacoes);
    pontesIds = p.ids;
    linhas.push(...p.decl.map((d) => '  ' + d));
    linhas.push(...p.arestas.map((a) => '  ' + arestaPonteTexto(aresta(saidaDe.get(a.origem) ?? a.origem, a.destino, a.rotulo, a.tracejada))));
  }
  for (const rid of ctx.ordemRaias) {
    const cor = corRaia(ctx, rid);
    linhas.push('  ' + defClasse(classeRaia(ctx, rid), cor, escurecer(cor, 0.4), 1));
  }
  const porIndice = (a: string, b: string) => indice(ctx, a) - indice(ctx, b);
  if (subtarefas && comSub.length) {
    const raiasSub = [...new Set(comSub.map((i) => String((ctx.nos.get(i) as Item).raia)))].sort(porIndice);
    for (const rid of raiasSub) {
      const cor = corRaia(ctx, rid);
      linhas.push('  ' + defClasse(classeSub(ctx, rid), clarear(cor, 0.55), escurecer(cor, 0.4), 1) + ',font-size:12px');
    }
    const raiasCond = [
      ...new Set(
        comSub.filter((i) => subtarefasDoNo(ctx.nos.get(i) as Item).some((s) => truthy(s.quando))).map((i) => String((ctx.nos.get(i) as Item).raia)),
      ),
    ].sort(porIndice);
    for (const rid of raiasCond) {
      const cor = corRaia(ctx, rid);
      linhas.push('  ' + defClasse(classeSubCond(ctx, rid), clarear(cor, 0.55), escurecer(cor, 0.4), 2) + ',font-size:12px,stroke-dasharray:4 3');
    }
  }
  const paresMap = new Map<string, [string, string]>();
  for (const i of ids) {
    const n = ctx.nos.get(i) as Item;
    if (n.tipo === 'chamada') paresMap.set(JSON.stringify([n.raia, n.raia_chamada]), [String(n.raia), String(n.raia_chamada)]);
  }
  const pares = [...paresMap.values()].sort((a, b) => porIndice(a[0], b[0]) || porIndice(a[1], b[1]));
  for (const [chamadora, chamada] of pares) {
    linhas.push('  ' + defClasse(classeChamada(ctx, chamadora, chamada), corRaia(ctx, chamada), corRaia(ctx, chamadora), 4));
  }
  linhas.push(`  classDef gw font-size:${FONTE_GATEWAY_PX}px`);
  linhas.push('  classDef ponte fill:#FFFFFF,stroke:#555555,stroke-width:2px,stroke-dasharray:5 3,color:#000000');
  if (comLegenda) linhas.push(...classesLegenda(ctx, chamadasSemSubgraph, legendaSub, legendaCond).map((x) => '  ' + x));
  const porClasse = new Map<string, string[]>();
  const push = (k: string, v: string) => {
    if (!porClasse.has(k)) porClasse.set(k, []);
    (porClasse.get(k) as string[]).push(v);
  };
  for (const i of ordenar(ctx, ids)) push(classeDoNo(ctx, ctx.nos.get(i) as Item), sanitizarId(i));
  if (subtarefas) {
    for (const i of comSub) {
      for (const s of subtarefasDoNo(ctx.nos.get(i) as Item)) {
        const raia = String((ctx.nos.get(i) as Item).raia);
        push((truthy(s.quando) ? classeSubCond : classeSub)(ctx, raia), sanitizarId(String(s.id)));
      }
    }
  }
  for (const classe of [...porClasse.keys()].sort((a, b) => cmpKey(chaveNatural(a), chaveNatural(b)))) {
    linhas.push(`  class ${(porClasse.get(classe) as string[]).join(',')} ${classe}`);
  }
  const gateways = ordenar(ctx, ids).filter((i) => (ctx.nos.get(i) as Item).tipo === 'bifurcacao').map(sanitizarId);
  if (gateways.length) linhas.push(`  class ${gateways.join(',')} gw`);
  if (pontesIds.length) linhas.push(`  class ${pontesIds.join(',')} ponte`);
  for (const rid of agruparRaias ? raiasVisiveis : []) {
    const cor = corRaia(ctx, rid);
    linhas.push(`  style ${idSg(rid)} fill:${clarear(cor, 0.85)},stroke:${cor},stroke-width:3px,color:#000000`);
  }
  if (subtarefas) {
    for (const i of comSub) {
      const cor = corRaia(ctx, String((ctx.nos.get(i) as Item).raia));
      linhas.push(
        `  style ${idTs(i)} fill:${clarear(cor, 0.94)},stroke:${escurecer(cor, 0.3)},` +
          'stroke-width:1.5px,stroke-dasharray:5 3,color:#000000',
      );
    }
  }
  const mapaIds: Record<string, string> = {};
  for (const i of ordenar(ctx, ids)) mapaIds[sanitizarId(i)] = i;
  if (subtarefas) {
    for (const i of comSub) for (const s of subtarefasDoNo(ctx.nos.get(i) as Item)) mapaIds[sanitizarId(String(s.id))] = String(s.id);
  }
  return { texto: linhas.join('\n') + '\n', mapaIds };
}

/**
 * Generates one view: `visao`, `raia:<id>` or `completo`. Compatibility layer: always derives the text
 * from the Modelo_de_Grafo of the demand (`gerarDiagramaDoGrafo`).
 * `comLegenda=false` omits the legend subgraph. `subtarefas=true` expands the subtasks of each task.
 */
export function gerarDiagrama(doc: Item, demandaId: string, visao: string, comLegenda = true, subtarefas = false): Diagrama {
  return gerarDiagramaDoGrafo(gerarGrafo(doc, demandaId), visao, comLegenda, subtarefas);
}

/** Context-shaped view of a Modelo_de_Grafo: only what `montar` reads, no YAML involved. */
function contextoDoGrafo(grafo: ModeloDeGrafo): Contexto {
  const papeis = new Map<string, string>();
  for (const n of grafo.nos) for (const s of n.subtarefas) if (s.papel !== undefined && s.papelNome !== undefined) papeis.set(s.papel, s.papelNome);
  const raias = new Map<string, Item>(grafo.raias.map((r) => [r.id, { id: r.id, nome: r.nome, cor: r.cor, orquestradora: r.orquestradora }]));
  const nos = new Map<string, Item>(
    grafo.nos.map((n) => {
      const no: Item = { id: n.id, tipo: n.tipo, rotulo: n.rotulo, raia: n.raia };
      if (n.raiaChamada !== undefined) no.raia_chamada = n.raiaChamada;
      if (n.retorno !== undefined) no.retorno = n.retorno;
      if (n.tipo === 'tarefa') {
        no.subtarefas = n.subtarefas.map((s) => {
          const sub: Item = { id: s.id, rotulo: s.rotulo };
          if (s.condicional) sub.quando = true;
          if (s.papel !== undefined) sub.papel = s.papel;
          if (s.responsavel !== undefined) sub.responsavel = s.responsavel;
          return sub;
        });
      }
      return [n.id, no];
    }),
  );
  return {
    demanda: { id: grafo.demanda, nome: grafo.nomeDemanda },
    raias,
    nos,
    todasRaias: raias,
    demandas: new Map(),
    ordemRaias: grafo.raias.map((r) => r.id),
    ordemNos: grafo.nos.map((n) => n.id),
    papeis,
  };
}

/**
 * Text of one view derived from a Modelo_de_Grafo (`visao`, `raia:<id>` or `completo`). Pure TypeScript,
 * no fs or node:*: it runs at build time and in the client. `subtarefas=true` expands the subtasks of each task.
 */
export function gerarDiagramaDoGrafo(
  grafo: ModeloDeGrafo,
  visao: string,
  comLegenda = true,
  subtarefas = false,
  agruparRaias = true,
): Diagrama {
  const ctx = contextoDoGrafo(grafo);
  const ligacoes: Ligacoes = new Map(grafo.nos.filter((n) => n.ligacoes?.length).map((n) => [n.id, n.ligacoes as LigacaoDoGrafo[]]));
  const transicoes = (ids: Set<string>): Aresta[] =>
    (grafo.transicoes ?? []).filter((a) => ids.has(a.origem) && ids.has(a.destino)).map((a) => aresta(a.origem, a.destino, a.rotulo, a.tracejada));
  const daRaia = (rid: string) => new Set(grafo.nos.filter((n) => n.raia === rid).map((n) => n.id));
  if (visao === VISAO) {
    const orq = grafo.raias.find((r) => r.orquestradora);
    if (!orq) throw new GeracaoError(`a demanda ${grafo.demanda} não tem raia orquestradora`);
    const ids = daRaia(orq.id);
    return montar(ctx, [orq.id], ids, transicoes(ids), ligacoes, true, comLegenda, subtarefas);
  }
  if (visao === COMPLETO) {
    const arestas = grafo.arestas.map((a) => aresta(a.origem, a.destino, a.rotulo, a.tracejada));
    return montar(ctx, [...ctx.ordemRaias], new Set(ctx.nos.keys()), arestas, ligacoes, true, comLegenda, subtarefas, agruparRaias);
  }
  if (visao.startsWith(PREFIXO_RAIA)) {
    const rid = visao.slice(PREFIXO_RAIA.length);
    if (!ctx.raias.has(rid)) throw new GeracaoError(`raia desconhecida na demanda ${grafo.demanda}: ${rid}`);
    const ids = daRaia(rid);
    return montar(ctx, [rid], ids, transicoes(ids), ligacoes, false, comLegenda, subtarefas);
  }
  throw new GeracaoError(`visão desconhecida: ${pyRepr(visao)}`);
}

// ---------------------------------------------------------- progressive expansion (Requirement 20)
const PREFIXO_CLUSTER = 'cluster:';
const idCluster = (raiaId: string) => `z_CL_${sanitizarId(raiaId)}`;
const idMermaidVisivel = (id: string) => (id.startsWith(PREFIXO_CLUSTER) ? idCluster(id.slice(PREFIXO_CLUSTER.length)) : sanitizarId(id));
const plural = (n: number, um: string, varios: string) => `${n} ${n === 1 ? um : varios}`;

/** Legend of the Visão geral: element kinds only, no entry per lane (clusters carry the lane name). */
function legendaGeral(): { texto: string[]; classes: string[] } {
  const elementos = [
    `${LEG}_cl["<b>raia</b>: recolhida<br/>cor da raia, com contagens"]`,
    `${LEG}_t["<b>t</b>: tarefa"]`,
    `${LEG}_g{"<b>g</b>: gateway"}`,
    `${LEG}_c[["<b>c</b>: chamada de outra raia<br/>cor da raia chamada,<br/>borda da raia que chama"]]`,
    `${LEG}_e(["<b>e</b>: fim ou retorno"])`,
    `${LEG}_st("<b>st</b>: subtarefa")`,
    `${LEG}_sc("<b>◆ st</b>: subtarefa condicional<br/>borda tracejada")`,
  ];
  return {
    texto: [`subgraph ${LEG}["Legenda"]`, '  direction LR', '  ' + elementos.join(' ~~~ '), 'end'],
    classes: [
      'classDef leg fill:#FFFFFF,stroke:#333333,stroke-width:1px,color:#000000',
      'classDef legc fill:#FFFFFF,stroke:#333333,stroke-width:4px,color:#000000',
      'classDef legcond fill:#FFFFFF,stroke:#333333,stroke-width:2px,stroke-dasharray:4 3,color:#000000',
      `class ${LEG}_cl,${LEG}_t,${LEG}_g,${LEG}_e,${LEG}_st leg`,
      `class ${LEG}_c legc`,
      `class ${LEG}_sc legcond`,
      `style ${LEG} fill:#FAFAFA,stroke:#999999,stroke-width:1px`,
    ],
  };
}

/**
 * Text for an expansion set. All lanes expanded delegates to the `completo` path (byte for byte, Property 12).
 * `agruparRaias=false` (the "Raias" toggle, Requirement 4.6) drops the lane `subgraph`s of that `completo` path: the nodes stay, with
 * their lane color and every edge, only the lane frames go away. It has no effect while some lane is collapsed.
 * Otherwise expanded lanes are `subgraph`s and collapsed lanes are `z_CL_<raia>` nodes with lane color, counts and
 * aggregated edges (`×N`). Pure function of `(grafo, conj)`: the order of expansion never matters. `mapaIds` also
 * maps each cluster node to `cluster:<raia>`.
 */
export function gerarDiagramaExpandido(grafo: ModeloDeGrafo, conj: ConjuntoExpandido, comLegenda = true, agruparRaias = true): Diagrama {
  const todas = grafo.raias.every((r) => conj.raias.has(r.id));
  const seletivo = !conj.todasSubtarefas && conj.subtarefas.size > 0;
  if (todas && !seletivo) return gerarDiagramaDoGrafo(grafo, COMPLETO, comLegenda, conj.todasSubtarefas, agruparRaias);

  const v = projetar(grafo, conj);
  const ids = new Set(v.nos.map((n) => n.id));
  const ctx = contextoDoGrafo({ ...grafo, nos: grafo.nos.filter((n) => ids.has(n.id)) });
  const ligacoes: Ligacoes = new Map(
    grafo.nos.filter((n) => ids.has(n.id) && n.ligacoes?.length).map((n) => [n.id, n.ligacoes as LigacaoDoGrafo[]]),
  );
  const expandeSub = new Set(v.nos.filter((n) => n.subtarefas.length > 0).map((n) => n.id));
  const comSub = ordenar(ctx, ids).filter((i) => expandeSub.has(i));
  const saidaDe = new Map<string, string>();
  for (const i of comSub) {
    const subs = subtarefasDoNo(ctx.nos.get(i) as Item);
    saidaDe.set(i, String(subs[subs.length - 1].id));
  }
  const raiasExpandidas = ctx.ordemRaias.filter((r) => conj.raias.has(r));
  const linhas: string[] = ['flowchart LR'];
  const leg = legendaGeral();
  if (comLegenda) linhas.push(...leg.texto.map((x) => '  ' + x));

  const cadeia: Aresta[] = [];
  for (const rid of raiasExpandidas) {
    linhas.push(`  subgraph ${idSg(rid)}["<b>${escaparRotulo(nomeRaia(ctx, rid))}</b>"]`);
    linhas.push('    direction LR');
    for (const i of ordenar(ctx, ids)) {
      const no = ctx.nos.get(i) as Item;
      if (no.raia !== rid) continue;
      if (expandeSub.has(i)) {
        linhas.push(`    subgraph ${idTs(i)}["<b>${escaparRotulo(or(no.rotulo, i))}</b>"]`);
        linhas.push('      direction LR');
        linhas.push('      ' + declaracaoNo(ctx, no));
        const subs = subtarefasDoNo(no);
        for (const sub of subs) linhas.push('      ' + declaracaoSubtarefa(sub, ctx.papeis));
        linhas.push('    end');
        let anterior = i;
        for (const sub of subs) {
          cadeia.push(aresta(anterior, String(sub.id), ''));
          anterior = String(sub.id);
        }
      } else {
        linhas.push('    ' + declaracaoNo(ctx, no, true));
      }
    }
    linhas.push('  end');
  }
  for (const c of v.clusters) {
    const t = c.totais;
    const texto = `${plural(t.tarefas, 'tarefa', 'tarefas')}, ${plural(t.gateways, 'gateway', 'gateways')}, ${plural(t.subtarefas, 'subtarefa', 'subtarefas')}`;
    linhas.push(`  ${idCluster(c.raia)}["<b>${escaparRotulo(nomeRaia(ctx, c.raia))}</b><br/>${texto}"]`);
  }

  const vistas = new Set<string>();
  const textos: string[] = [];
  const empilha = (k: string, t: string) => {
    if (!vistas.has(k)) {
      vistas.add(k);
      textos.push('  ' + t);
    }
  };
  for (const a of cadeia) empilha(chaveAresta(a), arestaTexto(a));
  for (const a of v.arestas) {
    const origem = saidaDe.get(a.origem) ?? a.origem;
    const seta = a.tracejada ? SETA_TRACEJADA : SETA_RETA;
    const rot = limparTexto(a.rotulo) ? `|"${escaparRotulo(a.rotulo)}"|` : '';
    empilha(JSON.stringify([origem, a.destino, a.rotulo, a.tracejada]), `${idMermaidVisivel(origem)} ${seta}${rot} ${idMermaidVisivel(a.destino)}`);
  }
  linhas.push(...textos);
  const p = pontes(ctx, ids, ligacoes);
  linhas.push(...p.decl.map((d) => '  ' + d));
  linhas.push(...p.arestas.map((a) => '  ' + arestaPonteTexto(aresta(saidaDe.get(a.origem) ?? a.origem, a.destino, a.rotulo, a.tracejada))));

  for (const rid of ctx.ordemRaias) {
    const cor = corRaia(ctx, rid);
    linhas.push('  ' + defClasse(classeRaia(ctx, rid), cor, escurecer(cor, 0.4), 1));
  }
  const porIndice = (a: string, b: string) => indice(ctx, a) - indice(ctx, b);
  const raiaDe = (i: string) => String((ctx.nos.get(i) as Item).raia);
  const temCond = (i: string) => subtarefasDoNo(ctx.nos.get(i) as Item).some((s) => truthy(s.quando));
  for (const rid of [...new Set(comSub.map(raiaDe))].sort(porIndice)) {
    const cor = corRaia(ctx, rid);
    linhas.push('  ' + defClasse(classeSub(ctx, rid), clarear(cor, 0.55), escurecer(cor, 0.4), 1) + ',font-size:12px');
  }
  for (const rid of [...new Set(comSub.filter(temCond).map(raiaDe))].sort(porIndice)) {
    const cor = corRaia(ctx, rid);
    linhas.push('  ' + defClasse(classeSubCond(ctx, rid), clarear(cor, 0.55), escurecer(cor, 0.4), 2) + ',font-size:12px,stroke-dasharray:4 3');
  }
  const paresMap = new Map<string, [string, string]>();
  for (const i of ids) {
    const n = ctx.nos.get(i) as Item;
    if (n.tipo === 'chamada') paresMap.set(JSON.stringify([n.raia, n.raia_chamada]), [String(n.raia), String(n.raia_chamada)]);
  }
  const pares = [...paresMap.values()].sort((a, b) => porIndice(a[0], b[0]) || porIndice(a[1], b[1]));
  for (const [chamadora, chamada] of pares) {
    linhas.push('  ' + defClasse(classeChamada(ctx, chamadora, chamada), corRaia(ctx, chamada), corRaia(ctx, chamadora), 4));
  }
  linhas.push(`  classDef gw font-size:${FONTE_GATEWAY_PX}px`);
  linhas.push('  classDef ponte fill:#FFFFFF,stroke:#555555,stroke-width:2px,stroke-dasharray:5 3,color:#000000');
  if (comLegenda) linhas.push(...leg.classes.map((x) => '  ' + x));

  const porClasse = new Map<string, string[]>();
  const push = (k: string, val: string) => {
    if (!porClasse.has(k)) porClasse.set(k, []);
    (porClasse.get(k) as string[]).push(val);
  };
  for (const i of ordenar(ctx, ids)) push(classeDoNo(ctx, ctx.nos.get(i) as Item), sanitizarId(i));
  for (const c of v.clusters) push(classeRaia(ctx, c.raia), idCluster(c.raia));
  for (const i of comSub) {
    for (const s of subtarefasDoNo(ctx.nos.get(i) as Item)) {
      push((truthy(s.quando) ? classeSubCond : classeSub)(ctx, raiaDe(i)), sanitizarId(String(s.id)));
    }
  }
  for (const classe of [...porClasse.keys()].sort((a, b) => cmpKey(chaveNatural(a), chaveNatural(b)))) {
    linhas.push(`  class ${(porClasse.get(classe) as string[]).join(',')} ${classe}`);
  }
  const gateways = ordenar(ctx, ids).filter((i) => (ctx.nos.get(i) as Item).tipo === 'bifurcacao').map(sanitizarId);
  if (gateways.length) linhas.push(`  class ${gateways.join(',')} gw`);
  if (p.ids.length) linhas.push(`  class ${p.ids.join(',')} ponte`);
  for (const rid of raiasExpandidas) {
    const cor = corRaia(ctx, rid);
    linhas.push(`  style ${idSg(rid)} fill:${clarear(cor, 0.85)},stroke:${cor},stroke-width:3px,color:#000000`);
  }
  for (const i of comSub) {
    const cor = corRaia(ctx, raiaDe(i));
    linhas.push(
      `  style ${idTs(i)} fill:${clarear(cor, 0.94)},stroke:${escurecer(cor, 0.3)},` +
        'stroke-width:1.5px,stroke-dasharray:5 3,color:#000000',
    );
  }
  const mapaIds: Record<string, string> = {};
  for (const i of ordenar(ctx, ids)) mapaIds[sanitizarId(i)] = i;
  for (const i of comSub) for (const s of subtarefasDoNo(ctx.nos.get(i) as Item)) mapaIds[sanitizarId(String(s.id))] = String(s.id);
  for (const c of v.clusters) mapaIds[idCluster(c.raia)] = PREFIXO_CLUSTER + c.raia;
  return { texto: linhas.join('\n') + '\n', mapaIds };
}

/** All diagrams of the document by file name, in stable order. */
export function gerarTodos(doc: Item, comLegenda = true, subtarefas = false): Map<string, Diagrama> {
  const saida = new Map<string, Diagrama>();
  for (const d of lista(doc, 'demandas')) {
    const demandaId = String(d.id);
    if (d.biblioteca === true) continue;
    if (!lista(doc, 'raias').some((r) => r.demanda === demandaId)) continue;
    const grafo = gerarGrafo(doc, demandaId);
    for (const v of visoesDaDemanda(doc, demandaId)) {
      saida.set(nomeArquivo(demandaId, v), gerarDiagramaDoGrafo(grafo, v, comLegenda, subtarefas));
    }
  }
  return saida;
}

// ============================================================ kit additions
/** Practical guide front matter (GuiaPratico) to the guide document shape (`demandas`, `raias`, `decisoes`). */
export function guiaParaDoc(fm: Item): Item {
  const gid = String(fm.id);
  const raias = fm.raias.map((r: Item) => ({
    id: r.id,
    nome: r.nome,
    demanda: gid,
    responsabilidade: r.responsabilidade ?? '',
    cor: r.cor,
    orquestradora: Boolean(r.orquestradora),
  }));
  const decisoes = fm.nos.map((n: Item) => {
    const d: Item = { id: n.id, raia: n.raia, tipo: n.tipo, rotulo: n.rotulo ?? '', proximo: [...(n.proximo ?? [])] };
    for (const k of ['raia_chamada', 'retorno']) if (truthy(n[k])) d[k] = n[k];
    return d;
  });
  return { demandas: [{ id: gid, nome: fm.nome, sigla: fm.sigla }], raias, decisoes };
}

export type VisaoDoGuia = { visao: string; raia: string | null; cor: string | null; mmd: string; mapa: Record<string, string> };

/** Views of a guide in order `visao`, `raia:<id>`..., `completo`, with Mermaid text and the id map. */
export function visoesDoGuia(fm: Item, comLegenda = false): VisaoDoGuia[] {
  const doc = guiaParaDoc(fm);
  const gid = String(fm.id);
  const cores = new Map<string, string>(fm.raias.map((r: Item) => [String(r.id), corValida(r.cor)]));
  const grafo = gerarGrafo(doc, gid);
  return visoesDaDemanda(doc, gid).map((v) => {
    const dg = gerarDiagramaDoGrafo(grafo, v, comLegenda);
    const rid = v.startsWith(PREFIXO_RAIA) ? v.slice(PREFIXO_RAIA.length) : null;
    return { visao: v, raia: rid, cor: rid ? (cores.get(rid) ?? null) : null, mmd: dg.texto, mapa: dg.mapaIds };
  });
}
