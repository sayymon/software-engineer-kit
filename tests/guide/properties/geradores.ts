// SPDX-License-Identifier: MIT
// fast-check generators shared by the property tests. Port of the former Python oracle
//
// Public API (same names as the Python module, in camelCase):
// - validDocs(): source documents that pass `validateGuide` with no issues (and no warnings with `avisos`).
// - noteTexts(markerLines), blocklists(), hostileText(): text generators.
// - removeRequiredField, redirectTransition, duplicateId, MUTATIONS and invalidDocs(): pure invalidation mutations.
//
// The flow model uses single-responsibility LANES: validDocs() produces lanes with distinct colours per demand, one
// orchestrator lane per demand, nodes with ids `<lane>_<s|t|g|c|e><n>`, calls whose exits equal the returns of the
// called lane, and an acyclic call graph. Texts of valid documents contain no dashes (em, en or hyphen). hostileText()
// uses dashes on purpose.
//
// PATCHES.md item 9: the text generator excludes the sequence of three dots (a lane named `...` makes the diagram
// structure test fail by chance), so docText() filters it out.
import fc from 'fast-check';

// biome-ignore lint/suspicious/noExplicitAny: generated documents are free-form JSON objects.
export type D = Record<string, any>;
type Draw = <T>(arb: fc.Arbitrary<T>) => T;

// ---------------------------------------------------------------- basic blocks

export const snakeIds = fc.stringMatching(/^[a-z][a-z0-9]{0,5}(_[a-z0-9]{1,5}){0,2}$/);

// Allowed characters of valid texts: letters (with accents and CJK), digits, plain space and a few non-dash
// punctuation, bracket, math and currency symbols. No control, line separator, markup, quote or dash characters.
const TEXT_CHARS = [
  ...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789   ',
  ...'áàâãéêíóôõúçñüÁÉÍÓÚÇÑÜ',
  ...'漢字日本語ж',
  ...'.;?/()+=~$€',
];
const TEXT_BASE = fc.string({ unit: fc.constantFrom(...TEXT_CHARS), minLength: 1, maxLength: 30 });

/** Short non-empty text, no dashes, no surrounding spaces, no `...` (safe for YAML). */
export const docText = (): fc.Arbitrary<string> =>
  TEXT_BASE.map((s) => s.trim()).filter((s) => s.length > 0 && !s.includes('...') && !/[\u2014\u2013-]/.test(s));

const isoDay = fc.integer({ min: 0, max: 7670 }).map((n) => new Date(Date.UTC(2020, 0, 1 + n)).toISOString().slice(0, 10)); // 2020-01-01..2040-12-31

export const CRITERIOS = ['diferenciacao', 'tempo_ate_valor', 'custo_total', 'dependencia_fornecedor', 'risco'];
export const OPCOES = ['construir', 'comprar', 'assinar'];
const NIVEL = fc.constantFrom('baixo', 'medio', 'alto');
const COLECOES_CONCEITUAIS = ['abordagens', 'tecnicas', 'padroes', 'estrategias'] as const;
const STATUS = fc.constantFrom('rascunho', 'revisado', 'publicado');

const int = (g: Draw, min: number, max: number) => g(fc.integer({ min, max }));
const bool = (g: Draw) => g(fc.boolean());
const pick = <T>(g: Draw, list: readonly T[]): T => g(fc.constantFrom(...list));
const shuffle = <T>(g: Draw, list: readonly T[]): T[] => g(fc.shuffledSubarray([...list], { minLength: list.length, maxLength: list.length }));
const texto = (g: Draw) => g(docText());
const textoOuVazio = (g: Draw) => g(fc.oneof(fc.constant(''), docText()));
const opt = <T>(g: Draw, campos: D, chave: string, arb: fc.Arbitrary<T>) => {
  if (bool(g)) campos[chave] = g(arb);
};
const subset = (g: Draw, pool: readonly string[], maxSize = 3): string[] =>
  pool.length === 0 ? [] : g(fc.uniqueArray(fc.constantFrom(...pool), { maxLength: maxSize }));
const range = (a: number, b: number) => Array.from({ length: Math.max(0, b - a) }, (_, i) => a + i);

/** Five weights in [0,1] that sum to 1 (multiples of 0.01). */
function pesosNormalizados(g: Draw): Record<string, number> {
  const cortes = g(fc.array(fc.integer({ min: 0, max: 100 }), { minLength: 4, maxLength: 4 })).sort((a, b) => a - b);
  const bordas = [0, ...cortes, 100];
  return Object.fromEntries(CRITERIOS.map((c, i) => [c, (bordas[i + 1] - bordas[i]) / 100]));
}

type Aresta = [destino: number, condicao: string | null];

/** Nodes of one lane: 1 start (index 0), at least 1 end, one `chamada` per called lane. Returns [nodes, returns of this lane]. */
function gerarRaia(g: Draw, raia: D, demanda: string, chamados: Array<[string, string[]]>): [D[], string[]] {
  const rid: string = raia.id;
  const n = 2 + chamados.length + int(g, 0, 4);
  // Call positions: never the start (0) nor the last node (always an end).
  const posicoes = shuffle(g, range(1, n - 1)).slice(0, chamados.length).sort((a, b) => a - b);
  const chamadaEm = new Map<number, [string, string[]]>(posicoes.map((p, k) => [p, chamados[k]]));
  const arestas: Aresta[][] = Array.from({ length: n }, () => []);
  for (let i = 1; i < n; i++) {
    const pais = range(0, i).filter((j) => !chamadaEm.has(j));
    arestas[pick(g, pais)].push([i, null]);
  }
  for (const [i, [, rets]] of chamadaEm) arestas[i] = rets.map((r): Aresta => [int(g, 1, n - 1), r]);
  for (let i = 0; i < n - 1; i++) {
    if (chamadaEm.has(i)) continue;
    for (let k = int(g, 0, 2); k > 0; k--) arestas[i].push([int(g, 0, n - 1), null]);
  }
  const nFins = arestas.filter((a) => a.length === 0).length;
  const retornos = g(fc.uniqueArray(docText(), { minLength: nFins, maxLength: nFins }));
  const nos: D[] = [];
  arestas.forEach((alvos, i) => {
    const extra: D = {};
    let tipo: string;
    let letra: string;
    if (i === 0) [tipo, letra] = ['inicio', 's'];
    else if (chamadaEm.has(i)) {
      [tipo, letra] = ['chamada', 'c'];
      extra.raia_chamada = chamadaEm.get(i)?.[0];
    } else if (alvos.length === 0) {
      [tipo, letra] = ['fim', 'e'];
      extra.retorno = retornos.pop();
    } else if (alvos.length === 1) [tipo, letra] = ['tarefa', 't'];
    else [tipo, letra] = pick(g, [['tarefa', 't'], ['bifurcacao', 'g']] as const);
    const d: D = {
      id: `${rid}_${letra}${i}`,
      raia: rid,
      tipo,
      condicao: textoOuVazio(g),
      proximo: alvos.map(([para, c]) => ({ para, condicao: c ?? textoOuVazio(g) })),
      estado: g(fc.dictionary(snakeIds, fc.oneof(fc.integer({ min: 0, max: 9 }), fc.boolean(), docText()), { maxKeys: 3 })),
      ...extra,
    };
    opt(g, d, 'rotulo', docText());
    opt(g, d, 'status', STATUS);
    if (bool(g)) d.demanda = demanda;
    if (bool(g)) d.layout = { coluna: int(g, 0, 20) };
    opt(g, d, 'publico', fc.boolean());
    nos.push(d);
  });
  // Swap the destination index for the real id, now that every id of the lane is known.
  const idsDaRaia = nos.map((d) => d.id);
  for (const d of nos) for (const t of d.proximo) t.para = idsDaRaia[t.para];
  return [nos, nos.filter((d) => d.tipo === 'fim').map((d) => d.retorno)];
}

// ---------------------------------------------------------------- data, subtasks and techniques

const OPS_NUMERICOS = ['maior_que', 'maior_ou_igual', 'menor_que', 'menor_ou_igual'];

/** Valid term for variable `v`: one operator, a value of the type and domain of the variable. */
function gerarTermo(g: Draw, v: D): D {
  const termo: D = { var: v.id };
  let op: string;
  let valor: fc.Arbitrary<string | number>;
  if (v.tipo === 'inteiro') {
    op = pick(g, ['igual', 'diferente', 'em', ...OPS_NUMERICOS]);
    valor = fc.integer({ min: -5, max: 50 });
  } else {
    op = pick(g, ['igual', 'diferente', 'em']);
    if (v.tipo === 'booleano') valor = fc.constantFrom('sim', 'nao');
    else if (v.tipo === 'enum') valor = fc.constantFrom(...(v.valores as string[]));
    else valor = docText();
  }
  termo[op] = op === 'em' ? g(fc.array(valor, { minLength: 1, maxLength: 3 })) : g(valor);
  return termo;
}

/** Valid condition (`todos` or `algum`, 1 to 3 terms) over the given non-empty `variaveis`. */
export function gerarCondicao(g: Draw, variaveis: readonly D[]): D {
  const termos = range(0, int(g, 1, 3)).map(() => gerarTermo(g, pick(g, variaveis)));
  return { [pick(g, ['todos', 'algum'])]: termos };
}

function gerarUsos(g: Draw, tecnicas: readonly string[], variaveis: readonly D[]): D[] {
  if (tecnicas.length === 0) return [];
  return g(fc.uniqueArray(fc.constantFrom(...tecnicas), { maxLength: 3 })).map((tid) => {
    const opcoes = ['obrigatoria', 'recomendada', 'opcional', ...(variaveis.length ? ['condicional'] : [])];
    const uso: D = { tecnica: tid, uso: pick(g, opcoes) };
    if (variaveis.length && (uso.uso === 'condicional' || bool(g))) uso.quando = gerarCondicao(g, variaveis);
    opt(g, uso, 'porque', docText());
    return uso;
  });
}

export function gerarVariaveis(g: Draw, ids: readonly string[]): D[] {
  return ids.map((vid) => {
    const tipo = pick(g, ['booleano', 'enum', 'inteiro', 'texto']);
    const v: D = { id: vid, nome: texto(g), tipo };
    if (tipo === 'enum') v.valores = g(fc.uniqueArray(docText(), { minLength: 1, maxLength: 3 }));
    opt(g, v, 'descricao', docText());
    if (bool(g)) v.inicial = tipo === 'enum' ? v.valores[0] : ({ booleano: 'sim', inteiro: 0, texto: 'x' } as D)[tipo];
    opt(g, v, 'status', STATUS);
    opt(g, v, 'publico', fc.boolean());
    return v;
  });
}

export const TIPOS_ARTEFATO = [
  'documento', 'dado', 'decisao', 'sinal', 'codigo', 'commit', 'pull_request', 'adr', 'teste', 'biblioteca', 'agente',
  'skill', 'script', 'diagrama', 'card', 'comunicacao', 'acao', 'configuracao',
];

function gerarArtefatos(g: Draw, ids: readonly string[]): D[] {
  return ids.map((aid) => {
    const a: D = { id: aid, nome: texto(g) };
    opt(g, a, 'descricao', docText());
    opt(g, a, 'tipo', fc.constantFrom(...TIPOS_ARTEFATO));
    opt(g, a, 'subtipo', docText());
    opt(g, a, 'exemplo', docText());
    opt(g, a, 'status', STATUS);
    opt(g, a, 'publico', fc.boolean());
    return a;
  });
}

const termosDe = (quando: D | undefined): D[] => [...(quando?.todos ?? []), ...(quando?.algum ?? [])];

/**
 * Adds to nodes and lanes coherent inputs, outputs, subtasks and technique uses (no warnings).
 * Every node input comes from the lane `entradas` or from the `saidas` of a predecessor node (on a `chamada`, from the
 * returns of the called lane); every subtask input comes from the task inputs or from earlier subtask outputs; the
 * outputs of a task with subtasks come from the subtask outputs; every `estado` key exists in `variaveis` (if any).
 */
function anotarDados(g: Draw, decisoes: D[], raias: D[], variaveis: D[], dados: string[], tecnicas: string[], artefatos: D[]): void {
  const porRaia = new Map<string, D[]>();
  for (const d of decisoes) porRaia.set(d.raia, [...(porRaia.get(d.raia) ?? []), d]);
  const porId = new Map<string, D>(decisoes.map((d) => [d.id, d]));
  const varIds = variaveis.map((v) => v.id as string);

  for (const r of raias) if (bool(g)) r.entradas = subset(g, dados);

  for (const d of decisoes) {
    if (varIds.length) {
      d.estado = Object.fromEntries(
        subset(g, varIds).map((k) => [k, g(fc.oneof(fc.integer({ min: 0, max: 9 }), fc.boolean(), docText()))]),
      );
    }
    if (d.tipo === 'tarefa' && bool(g)) {
      const subs: D[] = [];
      for (let n = 1, total = int(g, 1, 3); n <= total; n++) {
        const sub: D = { id: `${d.id}_st${n}`, rotulo: texto(g) };
        opt(g, sub, 'descricao', docText());
        opt(g, sub, 'exemplo', docText());
        opt(g, sub, 'responsavel', fc.constantFrom('agente', 'pessoa', 'ambos'));
        opt(g, sub, 'status', STATUS);
        if (variaveis.length && bool(g)) {
          // Conditional subtask: `quando` and, sometimes, `porque`.
          sub.quando = gerarCondicao(g, variaveis);
          opt(g, sub, 'porque', docText());
        }
        const saidas = subset(g, dados);
        if (saidas.length || bool(g)) sub.saidas = saidas;
        subs.push(sub);
      }
      d.subtarefas = subs;
      const entregues = [...new Set(subs.flatMap((s) => s.saidas ?? []))].sort();
      const saidas = subset(g, entregues);
      if (saidas.length) d.saidas = saidas;
    } else {
      const saidas = subset(g, dados);
      if (saidas.length || bool(g)) d.saidas = saidas;
    }
  }

  const producao = (no: D): Set<string> => {
    const saida = new Set<string>(no.saidas ?? []);
    if (no.tipo === 'chamada') {
      for (const f of porRaia.get(no.raia_chamada) ?? []) if (f.tipo === 'fim') for (const x of f.saidas ?? []) saida.add(x);
    }
    return saida;
  };

  for (const [rId, nos] of porRaia) {
    const reverso = new Map<string, Set<string>>(nos.map((n) => [n.id, new Set()]));
    for (const n of nos) for (const t of n.proximo) reverso.get(t.para)?.add(n.id);
    const raia = raias.find((r) => r.id === rId) as D;
    for (const n of nos) {
      const antecessores = new Set<string>();
      const fila = [...(reverso.get(n.id) ?? [])];
      while (fila.length) {
        const a = fila.pop() as string;
        if (!antecessores.has(a)) {
          antecessores.add(a);
          fila.push(...(reverso.get(a) ?? []));
        }
      }
      antecessores.delete(n.id);
      const disponivel = new Set<string>(raia.entradas ?? []);
      for (const a of antecessores) for (const x of producao(porId.get(a) as D)) disponivel.add(x);
      const entradas = subset(g, [...disponivel].sort());
      if (entradas.length || bool(g)) n.entradas = entradas;
      (n.subtarefas ?? []).forEach((sub: D, k: number) => {
        const livre = new Set<string>(entradas);
        for (const anterior of n.subtarefas.slice(0, k)) for (const x of anterior.saidas ?? []) livre.add(x);
        const ent = subset(g, [...livre].sort());
        if (ent.length || bool(g)) sub.entradas = ent;
      });
    }
  }

  for (const d of decisoes) {
    for (const dono of [d, ...(d.subtarefas ?? [])]) {
      const usos = gerarUsos(g, tecnicas, variaveis);
      if (usos.length || bool(g)) dono.tecnicas = usos;
    }
  }

  // Artifact variants: unique names per artifact and conditions over declared variables.
  for (const art of artefatos) {
    if (variaveis.length && bool(g)) {
      const nomes = g(fc.uniqueArray(docText(), { minLength: 1, maxLength: 2 }));
      art.variantes = nomes.map((nome, k) => {
        const v: D = { nome: `v${k} ${nome}`, quando: gerarCondicao(g, variaveis) };
        opt(g, v, 'descricao', docText());
        opt(g, v, 'exemplo', docText());
        return v;
      });
    }
  }

  // No ITEM_SEM_USO warnings: every catalogue item that nothing references goes into the `entradas` of the first lane.
  const usados = new Set<string>();
  for (const r of raias) for (const x of r.entradas ?? []) usados.add(x);
  for (const d of decisoes) {
    for (const x of [...(d.entradas ?? []), ...(d.saidas ?? []), ...Object.keys(d.estado ?? {})]) usados.add(x);
    for (const dono of [d, ...(d.subtarefas ?? [])]) {
      for (const x of [...(dono.entradas ?? []), ...(dono.saidas ?? [])]) usados.add(x);
      for (const uso of dono.tecnicas ?? []) for (const t of termosDe(uso.quando)) usados.add(t.var);
      for (const t of termosDe(dono.quando)) usados.add(t.var);
    }
  }
  for (const art of artefatos) for (const v of art.variantes ?? []) for (const t of termosDe(v.quando)) usados.add(t.var);
  const sobra = dados.filter((i) => !usados.has(i));
  if (sobra.length && raias.length) raias[0].entradas = [...(raias[0].entradas ?? []), ...sobra];

  // No deliverable warnings: in adopting lanes, every task and subtask delivers at least one artifact.
  const artIds = artefatos.map((a) => a.id as string);
  if (artIds.length) {
    const adota = (x: D) => ['entradas', 'saidas', 'subtarefas'].some((c) => c in x);
    const emAdocao = new Set<string>([...raias.filter(adota).map((r) => r.id), ...decisoes.filter(adota).map((d) => d.raia)]);
    const entrega = (x: D) => (x.saidas ?? []).some((s: string) => artIds.includes(s));
    for (const d of decisoes) {
      if (d.tipo !== 'tarefa' || !emAdocao.has(d.raia)) continue;
      const subs: D[] = d.subtarefas ?? [];
      for (const sub of subs) if (!entrega(sub)) sub.saidas = [...(sub.saidas ?? []), pick(g, artIds)];
      if (!subs.length && !entrega(d)) d.saidas = [...(d.saidas ?? []), pick(g, artIds)];
    }
  }
}

// ---------------------------------------------------------------- validDocs

function gerarDoc(g: Draw): D {
  const nDem = int(g, 1, 3);
  const nReq = int(g, 1, 3);
  const nRaiaPorDem = range(0, nDem).map(() => int(g, 1, 3));
  const nRaia = nRaiaPorDem.reduce((a, b) => a + b, 0);
  const nPb = int(g, 0, 3);
  const nConc = Object.fromEntries(COLECOES_CONCEITUAIS.map((c) => [c, int(g, 0, 2)])) as Record<(typeof COLECOES_CONCEITUAIS)[number], number>;
  const nCat = int(g, 0, 3);
  const nFon = int(g, 0, 3);
  const nObj = int(g, 1, 3);
  const usarDados = bool(g);
  const [nArt, nVar] = usarDados ? [int(g, 1, 3), int(g, 0, 3)] : [0, 0];
  const total = nDem + nReq + nRaia + nPb + Object.values(nConc).reduce((a, b) => a + b, 0) + nCat + nFon + nObj + nArt + nVar;
  const pool = g(fc.uniqueArray(snakeIds, { minLength: total, maxLength: total }));
  const take = (n: number) => pool.splice(0, n);

  const demIds = take(nDem);
  const reqIds = take(nReq);
  const raiaBases = take(nRaia);
  const pbIds = take(nPb);
  const concIds = Object.fromEntries(COLECOES_CONCEITUAIS.map((c) => [c, take(nConc[c])])) as Record<(typeof COLECOES_CONCEITUAIS)[number], string[]>;
  const catIds = take(nCat);
  const fonIds = take(nFon);
  const objIds = take(nObj);
  const artIds = take(nArt);
  const varIds = take(nVar);

  // Optional (unique) acronyms per demand: the prefix "s" keeps them unique and a valid Id.
  const siglas: Record<string, string> = {};
  for (const dem of demIds) if (bool(g)) siglas[dem] = `s${dem}`;

  const eixo = (id: string): D => {
    const e: D = { id, nome: texto(g) };
    if (id in siglas) e.sigla = siglas[id];
    opt(g, e, 'publico', fc.boolean());
    return e;
  };
  const conceitual = (id: string, estrategia = false): D => {
    const e: D = { id, nome: texto(g) };
    opt(g, e, 'descricao', docText());
    opt(g, e, 'exemplo', docText());
    opt(g, e, 'quando_usar', fc.array(docText(), { maxLength: 3 }));
    opt(g, e, 'quando_evitar', fc.array(docText(), { maxLength: 3 }));
    opt(g, e, 'status', STATUS);
    const fontes = subset(g, fonIds);
    if (fontes.length) e.fonte_ids = fontes;
    if (estrategia) for (const campo of ['custo', 'beneficio', 'dependencia_fornecedor']) opt(g, e, campo, NIVEL);
    opt(g, e, 'publico', fc.boolean());
    return e;
  };

  const bases = [...raiaBases];
  const raiasPorDem: Record<string, D[]> = {};
  demIds.forEach((dem, di) => {
    const n = nRaiaPorDem[di];
    const cores = g(fc.uniqueArray(fc.integer({ min: 0, max: 0xffffff }), { minLength: n, maxLength: n }));
    raiasPorDem[dem] = range(0, n).map((k) => {
      const base = bases.shift() as string;
      const hex = cores[k].toString(16).padStart(6, '0');
      const raia: D = {
        id: dem in siglas ? `${siglas[dem]}_${base}` : base,
        nome: texto(g),
        demanda: dem,
        responsabilidade: texto(g),
        cor: `#${bool(g) ? hex : hex.toUpperCase()}`,
      };
      if (k === 0) raia.orquestradora = true; // the first of the list orchestrates (calls the others, directly or not)
      else if (bool(g)) raia.orquestradora = false;
      opt(g, raia, 'status', STATUS);
      opt(g, raia, 'publico', fc.boolean());
      return raia;
    });
  });

  // Planned calls: every lane k>0 is called by an earlier one (no cycles); extra calls only go forward.
  let decisoes: D[] = [];
  for (const dem of demIds) {
    const lista = raiasPorDem[dem];
    const planos: number[][] = lista.map(() => []);
    for (let k = 1; k < lista.length; k++) planos[int(g, 0, k - 1)].push(k);
    for (let i = 0; i < lista.length - 1; i++) if (bool(g)) planos[i].push(int(g, i + 1, lista.length - 1));
    const retornos: Record<number, string[]> = {};
    for (let i = lista.length - 1; i >= 0; i--) {
      // Called lanes are generated before their callers.
      const [nos, rets] = gerarRaia(g, lista[i], dem, planos[i].map((k): [string, string[]] => [lista[k].id, retornos[k]]));
      retornos[i] = rets;
      decisoes.push(...nos);
    }
  }

  const artefatos = gerarArtefatos(g, artIds);
  const variaveis = gerarVariaveis(g, varIds);
  const todasRaias = Object.values(raiasPorDem).flat();
  if (usarDados) anotarDados(g, decisoes, todasRaias, variaveis, [...artIds, ...varIds], concIds.tecnicas, artefatos);

  const demandaDaRaia = new Map<string, string>(demIds.flatMap((dem) => raiasPorDem[dem].map((r): [string, string] => [r.id, dem])));
  // Optional links between demands: destination in another demand and a compatible destination decision.
  if (demIds.length >= 2) {
    for (const d of decisoes) {
      if (!bool(g)) continue;
      const destino = pick(g, demIds.filter((x) => x !== demandaDaRaia.get(d.raia)));
      const alvos = decisoes.filter((x) => demandaDaRaia.get(x.raia) === destino).map((x) => x.id as string);
      if (!alvos.length) continue;
      const lig: D = { demanda_destino: destino, para: pick(g, alvos), condicao: textoOuVazio(g) };
      opt(g, lig, 'tipo', fc.constantFrom('aciona', 'alimenta'));
      opt(g, lig, 'rotulo', docText());
      d.ligacoes = [lig];
    }
  }
  decisoes = shuffle(g, decisoes);

  const refs = (d: D) => {
    for (const [campo, ids] of [...Object.entries(concIds), ['categorias_ferramenta', catIds]] as Array<[string, string[]]>) {
      const sub = subset(g, ids);
      if (sub.length) d[campo] = sub;
    }
  };

  const celulas: D[] = [];
  const pares = g(fc.uniqueArray(fc.tuple(fc.constantFrom(...demIds), fc.constantFrom(...reqIds)), { maxLength: 4, selector: ([a, b]) => `${a}|${b}` }));
  for (const [demanda, requisito] of pares) {
    const c: D = { demanda, requisito };
    opt(g, c, 'perguntas_chave', fc.array(docText(), { maxLength: 3 }));
    opt(g, c, 'status', STATUS);
    refs(c);
    opt(g, c, 'publico', fc.boolean());
    celulas.push(c);
  }

  const playbooks: D[] = pbIds.map((pid) => {
    const p: D = { id: pid, resumo: textoOuVazio(g) };
    // `perguntas_chave` cites ids of the `perguntas` collection, which the generator does not use.
    for (const campo of ['fazer', 'evitar']) opt(g, p, campo, fc.array(docText(), { maxLength: 3 }));
    opt(g, p, 'exemplo', docText());
    refs(p);
    opt(g, p, 'status', STATUS);
    opt(g, p, 'publico', fc.boolean());
    return p;
  });

  const categorias: D[] = catIds.map((cid) => {
    const cat: D = { id: cid, nome: texto(g), custo: g(NIVEL), beneficio: g(NIVEL), dependencia_fornecedor: g(NIVEL) };
    opt(g, cat, 'descricao', docText());
    opt(g, cat, 'status', STATUS);
    opt(g, cat, 'publico', fc.boolean());
    return cat;
  });

  const citaveis = [...demIds, ...reqIds, ...decisoes.map((d) => d.id as string), ...pbIds, ...Object.values(concIds).flat(), ...catIds];
  const fontes: D[] = fonIds.map((fid) => {
    const f: D = {
      id: fid,
      tipo: pick(g, ['curso', 'artigo', 'livro']),
      titulo: texto(g),
      link: `https://exemplo.com/${g(fc.stringMatching(/^[a-z0-9]{1,8}$/))}`,
      status_revisao: pick(g, ['pendente', 'em_revisao', 'revisada']),
      proxima_revisao: g(isoDay),
    };
    const itens = subset(g, citaveis);
    if (itens.length) f.itens = itens;
    opt(g, f, 'publico', fc.boolean());
    return f;
  });

  const decisor = {
    criterios: [...CRITERIOS],
    escala: { min: 1, max: 5 },
    opcoes: [...OPCOES],
    ordem_desempate: shuffle(g, OPCOES),
    pesos: Object.fromEntries(objIds.map((obj) => [obj, pesosNormalizados(g)])),
  };

  const doc: D = {
    versao: int(g, 1, 5),
    demandas: demIds.map(eixo),
    raias: shuffle(g, todasRaias),
    requisitos: reqIds.map(eixo),
    decisoes,
    celulas,
    playbooks,
    abordagens: concIds.abordagens.map((i) => conceitual(i)),
    tecnicas: concIds.tecnicas.map((i) => conceitual(i)),
    padroes: concIds.padroes.map((i) => conceitual(i)),
    estrategias: concIds.estrategias.map((i) => conceitual(i, true)),
    categorias_ferramenta: categorias,
    fontes,
    decisor_construir_comprar_assinar: decisor,
  };
  if (usarDados) {
    doc.artefatos = artefatos;
    doc.variaveis = variaveis;
  }
  return doc;
}

/**
 * Documents that pass `validateGuide(doc, schema)` with no issues.
 *
 * Globally unique snake_case ids, a graph with one `inicio`, every node reachable, forks with 2 or more exits, weights
 * summing to 1, consistent references and valid ISO dates (strings). Texts have no dashes.
 *
 * Some documents also carry `artefatos`, `variaveis`, lane and node `entradas`/`saidas`, `subtarefas` (ids
 * `<node>_st<n>`) and `tecnicas` with valid uses and conditions. Those documents also raise no warnings:
 * `validateGuide(doc, schema, { avisos: true })` is empty.
 */
// The leading `fc.nat()` is consumed through `chain`, so it advances the random source on every draw. Without it,
// `fc.gen()` clones the source and never advances it, so `.filter(...)` redrew the same document forever. With it,
// `.filter(...)` on validDocs() is safe (each retry sees a different source state).
export const validDocs = (): fc.Arbitrary<D> =>
  fc
    .nat()
    .chain(() => fc.gen())
    .map((gen) => gerarDoc(<T>(arb: fc.Arbitrary<T>) => gen(() => arb)));

// ---------------------------------------------------------------- text

const NOTE_CHARS = [
  ...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 \t',
  ...'.,;:!?/\\()[]{}<>"\'`#*_|&%@+=~^$€£§©®°',
  ...'áàâãéêíóôõúçñüÁÉÍÓÚÇÑÜ漢字日本語жλΩ',
  ...'✓✗★☆→←⚠😀🧪',
];

/**
 * Note text: unicode, LF/CRLF line breaks, empty lines, no dashes. `markerLines` (for example generated-block delimiters)
 * may be interleaved; with an empty list the text has no markers.
 */
export function noteTexts(markerLines: readonly string[] = []): fc.Arbitrary<string> {
  const base = fc.string({ unit: fc.constantFrom(...NOTE_CHARS), maxLength: 40 });
  const linha = markerLines.length ? fc.oneof(base, base, fc.constantFrom(...markerLines)) : base;
  return fc
    .tuple(fc.array(linha, { maxLength: 8 }), fc.constantFrom('\n', '\r\n'), fc.boolean())
    .map(([linhas, sep, final]) => linhas.join(sep) + (final ? sep : ''));
}

/** Lists of 1 to 5 distinct blocked terms (lowercase letters and digits up to U+024F, 3 to 12 characters). */
export function blocklists(): fc.Arbitrary<string[]> {
  const termo = fc.string({ unit: fc.constantFrom(...'abcdefghijklmnopqrstuvwxyz0123456789áàâãéêíóôõúçñü'), minLength: 3, maxLength: 12 });
  return fc.uniqueArray(termo, { minLength: 1, maxLength: 5, selector: (s) => s.toLowerCase() });
}

const HOSTILE_FRAGMENTS = [
  '</script>', '<script>alert(1)</script>', '<img src=x onerror=alert(1)>', '<!--', '-->',
  '"', "'", '&', '&amp;', '&lt;', '<', '>', '`', '${x}', '{{ x }}', 'javascript:alert(1)',
  '[x](javascript:alert(1))', '**negrito**', '_it_', '# titulo', '---', '```', '| a | b |',
  '\\', '\u2014', '\u2013', '\u202e', '\u200b', '\u0000', '\r\n', '\n', '\t', '\u{1f9ea}',
  'ação', 'Ünï', '\u0301', ']]', '[[link]]', '<style>', '</style>', '%s', '%(x)s',
];

/** Text with HTML/JS, markdown, quotes, `&`, dashes and hostile unicode (including NUL and RTL). */
export function hostileText(): fc.Arbitrary<string> {
  const pedaco = fc.oneof(fc.constantFrom(...HOSTILE_FRAGMENTS), fc.string({ unit: 'grapheme', maxLength: 8 }));
  return fc.array(pedaco, { minLength: 1, maxLength: 8 }).map((l) => l.join('')).filter((s) => s.length > 0);
}

// ---------------------------------------------------------------- mutations

const CAMPOS_OBRIGATORIOS: Record<string, string[]> = {
  demandas: ['id', 'nome'],
  requisitos: ['id', 'nome'],
  decisoes: ['id', 'raia', 'tipo', 'condicao', 'proximo', 'estado'],
  raias: ['id', 'nome', 'demanda', 'responsabilidade', 'cor'],
  celulas: ['demanda', 'requisito'],
  playbooks: ['id', 'resumo'],
  abordagens: ['id', 'nome'],
  tecnicas: ['id', 'nome'],
  padroes: ['id', 'nome'],
  estrategias: ['id', 'nome'],
  categorias_ferramenta: ['id', 'nome', 'custo', 'beneficio', 'dependencia_fornecedor'],
  fontes: ['id', 'tipo', 'titulo', 'link', 'status_revisao', 'proxima_revisao'],
};
const TOPO_OBRIGATORIOS = [
  'versao', 'demandas', 'raias', 'requisitos', 'decisoes', 'celulas', 'playbooks', 'abordagens', 'tecnicas',
  'padroes', 'estrategias', 'categorias_ferramenta', 'fontes', 'decisor_construir_comprar_assinar',
];
const DECISOR_OBRIGATORIOS = ['criterios', 'escala', 'opcoes', 'ordem_desempate', 'pesos'];
const DECISOR = 'decisor_construir_comprar_assinar';

export type Mutation = (doc: D, pick?: number) => [mutado: D, descricao: string];

const mod = (pick: number, n: number) => ((pick % n) + n) % n;

/** Removes a required field (top level, collection item or decisor). Pure: returns a mutated copy and a description. */
export const removeRequiredField: Mutation = (doc, pick = 0) => {
  const candidatos: Array<Array<string | number>> = TOPO_OBRIGATORIOS.filter((k) => k in doc).map((k) => [k]);
  for (const [colecao, campos] of Object.entries(CAMPOS_OBRIGATORIOS)) {
    (doc[colecao] ?? []).forEach((item: D, i: number) => {
      for (const c of campos) if (c in item) candidatos.push([colecao, i, c]);
    });
  }
  for (const c of DECISOR_OBRIGATORIOS) if (c in (doc[DECISOR] ?? {})) candidatos.push([DECISOR, c]);
  const alvo = candidatos[mod(pick, candidatos.length)];
  const novo = structuredClone(doc);
  let pai: D = novo;
  for (const parte of alvo.slice(0, -1)) pai = pai[parte];
  delete pai[alvo[alvo.length - 1]];
  const caminho = alvo.map((p) => (typeof p === 'number' ? `[${p}]` : `.${p}`)).join('').replace(/^\./, '');
  return [novo, `campo obrigatório removido: ${caminho}`];
};

/** Swaps the destination of a transition for a non-existent id. Pure. Needs at least one transition. */
export const redirectTransition: Mutation = (doc, pick = 0) => {
  const candidatos: Array<[number, number]> = doc.decisoes.flatMap((d: D, i: number) => d.proximo.map((_: D, j: number) => [i, j] as [number, number]));
  const [i, j] = candidatos[mod(pick, candidatos.length)];
  const existentes = new Set<string>();
  for (const c of Object.values(doc)) if (Array.isArray(c)) for (const x of c) if (x && typeof x === 'object' && 'id' in x) existentes.add(x.id);
  let falso = 'id_inexistente';
  for (let n = 0; existentes.has(falso); ) falso = `id_inexistente_${++n}`;
  const novo = structuredClone(doc);
  const antigo = novo.decisoes[i].proximo[j].para;
  novo.decisoes[i].proximo[j].para = falso;
  return [novo, `decisoes[${i}].proximo[${j}].para: '${antigo}' trocado por '${falso}'`];
};

/** Appends to a collection a copy of an existing item (repeated id). Pure. */
export const duplicateId: Mutation = (doc, pick = 0) => {
  const candidatos: Array<[string, number]> = Object.keys(CAMPOS_OBRIGATORIOS)
    .filter((c) => c !== 'celulas')
    .flatMap((c) => (doc[c] ?? []).map((_: D, i: number) => [c, i] as [string, number]));
  const [colecao, i] = candidatos[mod(pick, candidatos.length)];
  const novo = structuredClone(doc);
  novo[colecao].push(structuredClone(novo[colecao][i]));
  return [novo, `id '${doc[colecao][i].id}' duplicado em ${colecao} (cópia de ${colecao}[${i}])`];
};

export const MUTATIONS: readonly Mutation[] = [removeRequiredField, redirectTransition, duplicateId];

/** Returns [original, mutated, description]: a valid document and an invalidating mutation of it. */
export function invalidDocs(docs: fc.Arbitrary<D> = validDocs()): fc.Arbitrary<[D, D, string]> {
  return docs.chain((original) =>
    fc.tuple(fc.constantFrom(...MUTATIONS), fc.integer({ min: 0, max: 10_000 })).map(([mutacao, pick]): [D, D, string] => {
      const [mutado, descricao] = mutacao(original, pick);
      return [original, mutado, descricao];
    }),
  );
}
