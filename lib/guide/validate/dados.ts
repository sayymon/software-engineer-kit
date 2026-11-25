// SPDX-License-Identifier: MIT
// Cross-reference and duplicate-id rules for sources, links, data, roles, questions and rites.
// Ported from the Python oracle (validator.py: _checar_referencias, _checar_ligacoes, _checar_dados).
import type { GuideDoc } from '../index';

type Doc = GuideDoc;
export type AddIssue = (code: string, path: string, message: string, itemId?: string | null) => void;
export type Broken = (path: string, target: string, collection: string, origin: string) => void;

const CITAVEIS = ['demandas', 'requisitos', 'decisoes', 'playbooks', 'abordagens', 'tecnicas', 'padroes', 'estrategias', 'categorias_ferramenta'] as const;
const COM_FONTE_IDS = ['abordagens', 'tecnicas', 'padroes', 'estrategias'] as const;
const list = (v: unknown): Doc[] => (Array.isArray(v) ? (v as Doc[]) : []);
const strs = (v: unknown): string[] => (Array.isArray(v) ? (v as string[]) : []);

const OPERADORES = ['igual', 'diferente', 'em', 'maior_que', 'maior_ou_igual', 'menor_que', 'menor_ou_igual'] as const;
const OPERADORES_NUMERICOS: readonly string[] = ['maior_que', 'maior_ou_igual', 'menor_que', 'menor_ou_igual'];
const DOMINIO_BOOLEANO = ['sim', 'nao'];
const escapeRegex = (s: string): string => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Python `repr()` of a JSON value, so messages match the oracle (e.g. 'a', True, None, ['x', 'y']). */
function pyRepr(v: unknown): string {
  if (v === null || v === undefined) return 'None';
  if (typeof v === 'boolean') return v ? 'True' : 'False';
  if (typeof v === 'number') return String(v);
  if (typeof v === 'string') {
    const aspas = v.includes("'") && !v.includes('"') ? '"' : "'";
    const esc = v.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t');
    return aspas + (aspas === "'" ? esc.replace(/'/g, "\\'") : esc) + aspas;
  }
  if (Array.isArray(v)) return `[${v.map(pyRepr).join(', ')}]`;
  return `{${Object.entries(v as Record<string, unknown>).map(([k, x]) => `${pyRepr(k)}: ${pyRepr(x)}`).join(', ')}}`;
}

/** CONDICAO_INVALIDA of one term whose variable exists (validator.py: _checar_termo). */
function checarTermo(termo: Doc, variavel: Doc, path: string, itemId: string, add: AddIssue): void {
  const varId = variavel.id;
  const invalido = (caminho: string, texto: string) => add('CONDICAO_INVALIDA', caminho, `condição de '${itemId}': ${texto}`, itemId);
  const ops = OPERADORES.filter((op) => op in termo);
  if (ops.length !== 1) {
    const quais = ops.length ? ` (encontrados: ${ops.join(', ')})` : '';
    invalido(path, `o termo sobre '${varId}' deve ter exatamente um operador entre ${OPERADORES.join(', ')}${quais}`);
    return;
  }
  const op = ops[0];
  const tipo = variavel.tipo;
  const caminho = `${path}.${op}`;
  if (OPERADORES_NUMERICOS.includes(op) && tipo !== 'inteiro') {
    invalido(caminho, `o operador '${op}' só vale para variável inteira; '${varId}' é ${tipo}`);
    return;
  }
  const valor = termo[op];
  let pares: Array<[string, unknown]>;
  if (op === 'em') {
    if (!Array.isArray(valor) || valor.length === 0) {
      invalido(caminho, `'em' exige uma lista com ao menos um valor para '${varId}'`);
      return;
    }
    pares = valor.map((v, n): [string, unknown] => [`${caminho}[${n}]`, v]);
  } else pares = [[caminho, valor]];
  let dominio: string[] | null = null;
  if (tipo === 'booleano') dominio = [...DOMINIO_BOOLEANO];
  else if (tipo === 'enum' && Array.isArray(variavel.valores) && variavel.valores.length) dominio = [...variavel.valores];
  for (const [caminhoV, v] of pares) {
    const compativel = tipo === 'inteiro' ? typeof v === 'number' && Number.isInteger(v) : typeof v === 'string';
    if (!compativel) invalido(caminhoV, `o valor ${pyRepr(v)} é incompatível com o tipo ${tipo} de '${varId}'`);
    else if (dominio !== null && !dominio.includes(v as string)) {
      const detalhe = op === 'em' ? "valor de 'em' fora do domínio" : 'valor fora do domínio';
      invalido(caminhoV, `${detalhe}: ${pyRepr(v)} não está em ${pyRepr(dominio)} (variável '${varId}')`);
    }
  }
}

/** Source items and `fonte_ids` of conceptual items. */
export function checarFontes(doc: Doc, ids: Record<string, Set<string>>, broken: Broken): void {
  const citaveis = new Set<string>();
  for (const c of CITAVEIS) for (const id of ids[c]) citaveis.add(id);
  list(doc.fontes).forEach((f, i) => {
    strs(f.itens).forEach((alvo, j) => {
      if (!citaveis.has(alvo)) broken(`fontes[${i}].itens[${j}]`, alvo, 'itens do guia', f.id);
    });
  });
  for (const c of COM_FONTE_IDS) {
    list(doc[c]).forEach((item, i) => {
      strs(item.fonte_ids).forEach((alvo, j) => {
        if (!ids.fontes.has(alvo)) broken(`${c}[${i}].fonte_ids[${j}]`, alvo, 'fontes', item.id);
      });
    });
  }
}

/** Links between demands: broken references and LIGACAO_INCONSISTENTE. */
export function checarLigacoes(doc: Doc, ids: Record<string, Set<string>>, broken: Broken, add: AddIssue): void {
  const porId = new Map<string, Doc>();
  for (const d of list(doc.decisoes)) if (!porId.has(d.id)) porId.set(d.id, d);
  const demandaDaRaia = new Map<string, string>();
  for (const r of list(doc.raias)) demandaDaRaia.set(r.id, r.demanda);
  // Effective demand: the lane's (source of truth) or, failing that, the node's own `demanda`.
  const demandaDe = (dec: Doc): string | undefined => (demandaDaRaia.has(dec.raia) ? demandaDaRaia.get(dec.raia) : dec.demanda);
  list(doc.decisoes).forEach((d, i) => {
    list(d.ligacoes).forEach((lig, j) => {
      const base = `decisoes[${i}].ligacoes[${j}]`;
      const destino = lig.demanda_destino;
      const alvo = lig.para;
      const demandaOk = ids.demandas.has(destino);
      if (!demandaOk) broken(`${base}.demanda_destino`, destino, 'demandas', d.id);
      const alvoDecisao = porId.get(alvo);
      if (alvoDecisao === undefined) broken(`${base}.para`, alvo, 'decisoes', d.id);
      if (demandaOk && demandaDe(d) === destino) {
        add('LIGACAO_INCONSISTENTE', `${base}.demanda_destino`, `ligação de '${d.id}' aponta para a própria demanda '${destino}'; use \`proximo\` para o fluxo interno`, d.id);
      }
      if (demandaOk && alvoDecisao !== undefined) {
        const demandaAlvo = demandaDe(alvoDecisao);
        if (demandaAlvo != null && demandaAlvo !== destino) {
          add('LIGACAO_INCONSISTENTE', `${base}.para`, `ligação de '${d.id}': '${alvo}' pertence à demanda '${demandaAlvo}', não a '${destino}'`, d.id);
        }
      }
    });
  });
}

/** Data, roles, RACI, questions and rites: REF_QUEBRADA and ID_DUPLICADO only. */
export function checarDados(doc: Doc, add: AddIssue): void {
  const broken: Broken = (path, alvo, onde, origem) =>
    add('REF_QUEBRADA', path, `'${origem}' references missing id '${alvo}' (expected in ${onde})`, origem);
  // First declaration wins for duplicated variable ids (Python builds the map over the reversed list).
  const variaveis = new Map<string, Doc>();
  for (const v of list(doc.variaveis)) if (!variaveis.has(v.id)) variaveis.set(v.id, v);
  const dados = new Set<string>([...variaveis.keys(), ...list(doc.artefatos).map((a) => a.id)]);
  const tecnicas = new Set<string>(list(doc.tecnicas).map((t) => t.id));

  list(doc.variaveis).forEach((v, i) => {
    if (v.tipo === 'enum' && !(Array.isArray(v.valores) && v.valores.length)) {
      add('VARIAVEL_ENUM_SEM_VALORES', `variaveis[${i}].valores`, `a variável enum '${v.id}' deve declarar \`valores\` com ao menos um item`, v.id);
    }
  });

  const papeis = new Set<string>();
  list(doc.papeis).forEach((pa, i) => {
    if (papeis.has(pa.id)) add('ID_DUPLICADO', `papeis[${i}].id`, `role id '${pa.id}' repeated`, pa.id);
    papeis.add(pa.id);
  });

  list(doc.artefatos).forEach((art, i) => {
    strs(art.destinatarios).forEach((alvo, j) => {
      if (!papeis.has(alvo)) broken(`artefatos[${i}].destinatarios[${j}]`, alvo, 'papeis', art.id);
    });
  });
  list(doc.raias).forEach((r, i) => {
    strs(r.entradas).forEach((alvo, j) => {
      if (!dados.has(alvo)) broken(`raias[${i}].entradas[${j}]`, alvo, 'artefatos ou variaveis', r.id);
    });
  });

  const decisoes = list(doc.decisoes);
  decisoes.forEach((d, i) => {
    for (const campo of ['papel', 'aprova']) {
      if (campo in d && !papeis.has(d[campo])) broken(`decisoes[${i}].${campo}`, d[campo], 'papeis', d.id);
    }
    for (const campo of ['apoio', 'consultado', 'informado']) {
      strs(d[campo]).forEach((alvo, j) => {
        if (!papeis.has(alvo)) broken(`decisoes[${i}].${campo}[${j}]`, alvo, 'papeis', d.id);
      });
    }
    if (d.subtarefas != null && d.tipo !== 'tarefa') {
      add('SUBTAREFA_EM_NAO_TAREFA', `decisoes[${i}].subtarefas`, `'${d.id}' é do tipo '${d.tipo}' mas declara \`subtarefas\`; só nós 'tarefa' têm subtarefas`, d.id);
    }
    list(d.subtarefas).forEach((sub, k) => {
      if ('papel' in sub && !papeis.has(sub.papel)) broken(`decisoes[${i}].subtarefas[${k}].papel`, sub.papel, 'papeis', sub.id);
      for (const campo of ['apoio', 'consultado', 'informado']) {
        strs(sub[campo]).forEach((alvo, j) => {
          if (!papeis.has(alvo)) broken(`decisoes[${i}].subtarefas[${k}].${campo}[${j}]`, alvo, 'papeis', sub.id);
        });
      }
      if (!new RegExp(`^${escapeRegex(String(d.id))}_st[1-9][0-9]*$`).test(String(sub.id))) {
        add('SUBTAREFA_ID_PADRAO', `decisoes[${i}].subtarefas[${k}].id`, `o id da subtarefa '${sub.id}' deve ter a forma '${d.id}_st<n>' (n inteiro a partir de 1)`, sub.id);
      }
    });
  });

  const condicao = (quando: Doc, caminho: string, donoId: string) => {
    const chave = 'todos' in quando ? 'todos' : 'algum';
    list(quando[chave]).forEach((termo, m) => {
      const caminhoT = `${caminho}.${chave}[${m}]`;
      const variavel = variaveis.get(termo.var);
      if (variavel === undefined) broken(`${caminhoT}.var`, termo.var, 'variaveis', donoId);
      else checarTermo(termo, variavel, caminhoT, donoId, add);
    });
  };

  decisoes.forEach((d, i) => {
    const donos: Array<[string, Doc]> = [[`decisoes[${i}]`, d], ...list(d.subtarefas).map((s, k): [string, Doc] => [`decisoes[${i}].subtarefas[${k}]`, s])];
    donos.forEach(([base, dono], idx) => {
      for (const campo of ['entradas', 'saidas']) {
        strs(dono[campo]).forEach((alvo, j) => {
          if (!dados.has(alvo)) broken(`${base}.${campo}[${j}]`, alvo, 'artefatos ou variaveis', dono.id);
        });
      }
      list(dono.tecnicas).forEach((uso, k) => {
        const caminho = `${base}.tecnicas[${k}]`;
        if (!tecnicas.has(uso.tecnica)) broken(`${caminho}.tecnica`, uso.tecnica, 'tecnicas', dono.id);
        if (uso.uso === 'condicional' && uso.quando == null) {
          add('CONDICAO_AUSENTE', caminho, `o uso condicional da técnica '${uso.tecnica}' em '${dono.id}' exige \`quando\``, dono.id);
        }
        if (uso.quando != null) condicao(uso.quando, `${caminho}.quando`, dono.id);
      });
      if (idx > 0 && dono.quando != null) condicao(dono.quando, `${base}.quando`, dono.id);
    });
  });

  const perguntas = new Set<string>();
  const ritosIds = new Set<string>();
  for (const [colecao, vistos] of [['perguntas', perguntas], ['ritos', ritosIds]] as const) {
    list(doc[colecao]).forEach((item, i) => {
      if (vistos.has(item.id)) add('ID_DUPLICADO', `${colecao}[${i}].id`, `id '${item.id}' repeated in ${colecao}`, item.id);
      vistos.add(item.id);
    });
  }
  const nosESubs = new Set<string>(decisoes.flatMap((d) => [d.id, ...list(d.subtarefas).map((s) => s.id)]));
  list(doc.playbooks).forEach((pb, i) => {
    strs(pb.perguntas_chave).forEach((alvo, j) => {
      if (!perguntas.has(alvo)) broken(`playbooks[${i}].perguntas_chave[${j}]`, alvo, 'perguntas', pb.id);
    });
  });

  const raciRefs = (item: Doc, base: string) => {
    for (const campo of ['papel', 'aprova']) {
      if (item[campo] && !papeis.has(item[campo])) broken(`${base}.${campo}`, item[campo], 'papeis', item.id);
    }
    for (const campo of ['apoio', 'consultado', 'informado']) {
      strs(item[campo]).forEach((alvo, j) => {
        if (!papeis.has(alvo)) broken(`${base}.${campo}[${j}]`, alvo, 'papeis', item.id);
      });
    }
  };

  list(doc.perguntas).forEach((pq, i) => {
    const base = `perguntas[${i}]`;
    strs(pq.depende_de).forEach((alvo, j) => {
      if (!nosESubs.has(alvo) && !tecnicas.has(alvo) && !ritosIds.has(alvo)) broken(`${base}.depende_de[${j}]`, alvo, 'decisoes, subtarefas, tecnicas ou ritos', pq.id);
    });
    raciRefs(pq, base);
    if (pq.quando) condicao(pq.quando, `${base}.quando`, pq.id);
  });
  list(doc.ritos).forEach((rt, i) => {
    const base = `ritos[${i}]`;
    const campos: Array<[string, Set<string>, string]> = [
      ['acontece_em', nosESubs, 'decisoes'],
      ['perguntas', perguntas, 'perguntas'],
      ['tecnicas', tecnicas, 'tecnicas'],
      ['entradas', dados, 'artefatos ou variaveis'],
      ['saidas', dados, 'artefatos ou variaveis'],
    ];
    for (const [campo, alvos, onde] of campos) {
      strs(rt[campo]).forEach((alvo, j) => {
        if (!alvos.has(alvo)) broken(`${base}.${campo}[${j}]`, alvo, onde, rt.id);
      });
    }
    if (rt.seguinte && !ritosIds.has(rt.seguinte)) broken(`${base}.seguinte`, rt.seguinte, 'ritos', rt.id);
    raciRefs(rt, base);
    if (rt.quando) condicao(rt.quando, `${base}.quando`, rt.id);
  });

  list(doc.artefatos).forEach((art, i) => {
    const vistos = new Set<string>();
    list(art.variantes).forEach((v, k) => {
      if (vistos.has(v.nome)) add('VARIANTE_DUPLICADA', `artefatos[${i}].variantes[${k}].nome`, `o artefato '${art.id}' repete o nome de variante '${v.nome}'`, art.id);
      vistos.add(v.nome);
      if (v.quando) condicao(v.quando, `artefatos[${i}].variantes[${k}].quando`, art.id);
    });
  });
}
