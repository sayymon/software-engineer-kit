// SPDX-License-Identifier: MIT
// Data tracing of the guide: who produces and who consumes each artifact and variable.
// Port of rastreio.py of the guide (rastrear_dados, descrever_condicao, usos_em_condicoes, lacunas_de_dados).
// Pure functions: no I/O, the document is never changed. Id lists come out in natural order (`t2` before `t10`).
import { chaveNatural, cmpKey, ordenarNatural } from '../flow-mermaid/order';
import { eComunicacao } from './taxonomia';
import { pyRepr } from './validate/dados';

type Doc = Record<string, unknown>;

export interface RastroDado {
  tipo: 'artefato' | 'variavel';
  nome: unknown;
  produzido_por: string[];
  consumido_por: string[];
}

export interface UsoEmCondicao {
  origem: string;
  dono: string;
  tecnica: string;
  uso: string;
  variante: string;
  quando: string;
}

/** Fixed operator order of a term (description and validation). */
export const OPERADORES = ['igual', 'diferente', 'em', 'maior_que', 'maior_ou_igual', 'menor_que', 'menor_ou_igual'] as const;
const SIMBOLO: Record<string, string> = {
  igual: '=',
  diferente: '!=',
  maior_que: '>',
  maior_ou_igual: '>=',
  menor_que: '<',
  menor_ou_igual: '<=',
};

const eMapa = (v: unknown): v is Doc => typeof v === 'object' && v !== null && !Array.isArray(v);
const lista = (v: unknown): unknown[] => (Array.isArray(v) ? v : []);
const dados = (doc: unknown): Doc => (eMapa(doc) ? doc : {});
const idDe = (v: unknown): string | null => (eMapa(v) && typeof v.id === 'string' ? v.id : null);
const porChave = (a: string, b: string): number => cmpKey(chaveNatural(a), chaveNatural(b));

/** Python `str()` of a JSON value. */
function pyStr(v: unknown): string {
  return typeof v === 'string' ? v : pyRepr(v);
}

/** For each artifact and variable of the catalog: who produces it and who consumes it (keys in natural order). */
export function rastrearDados(doc: unknown): Record<string, RastroDado> {
  const data = dados(doc);
  const catalogo = new Map<string, { tipo: 'artefato' | 'variavel'; nome: unknown; produzido: Set<string>; consumido: Set<string> }>();
  for (const [colecao, tipo] of [['variaveis', 'variavel'], ['artefatos', 'artefato']] as const) {
    for (const item of lista(data[colecao])) {
      const id = idDe(item);
      if (id !== null) {
        catalogo.set(id, { tipo, nome: (item as Doc).nome ?? '', produzido: new Set(), consumido: new Set() });
      }
    }
  }
  const registrar = (dono: unknown, campo: string, destino: 'produzido' | 'consumido'): void => {
    const id = idDe(dono);
    if (id === null) return;
    for (const alvo of lista((dono as Doc)[campo])) {
      if (typeof alvo === 'string') catalogo.get(alvo)?.[destino].add(id);
    }
  };
  for (const raia of lista(data.raias)) registrar(raia, 'entradas', 'consumido');
  for (const rito of lista(data.ritos)) {
    registrar(rito, 'entradas', 'consumido');
    registrar(rito, 'saidas', 'produzido');
  }
  for (const no of lista(data.decisoes)) {
    registrar(no, 'entradas', 'consumido');
    registrar(no, 'saidas', 'produzido');
    for (const sub of eMapa(no) ? lista(no.subtarefas) : []) {
      registrar(sub, 'entradas', 'consumido');
      registrar(sub, 'saidas', 'produzido');
    }
  }
  const saida: Record<string, RastroDado> = {};
  for (const id of [...catalogo.keys()].sort(porChave)) {
    const info = catalogo.get(id)!;
    saida[id] = {
      tipo: info.tipo,
      nome: info.nome,
      produzido_por: ordenarNatural(info.produzido),
      consumido_por: ordenarNatural(info.consumido),
    };
  }
  return saida;
}

function valor(v: unknown): string {
  if (typeof v === 'boolean') return v ? 'verdadeiro' : 'falso';
  return pyStr(v);
}

function termoEmTexto(termo: unknown): string {
  if (!eMapa(termo)) return pyStr(termo);
  const nome = 'var' in termo ? pyStr(termo.var) : '?';
  const partes: string[] = [];
  for (const op of OPERADORES) {
    if (!(op in termo)) continue;
    if (op === 'em') partes.push(`${nome} em [${lista(termo[op]).map(valor).join(', ')}]`);
    else partes.push(`${nome} ${SIMBOLO[op]} ${valor(termo[op])}`);
  }
  return partes.length ? partes.join(' e ') : nome;
}

/** Readable Portuguese text for a Condicao: `quando tem_slo = sim e severidade em [sev1, sev2]`. Empty condition gives `''`. */
export function descreverCondicao(cond: unknown): string {
  if (!eMapa(cond)) return '';
  let junta: string;
  let termos: unknown[];
  if ('todos' in cond) {
    junta = ' e ';
    termos = lista(cond.todos);
  } else if ('algum' in cond) {
    junta = ' ou ';
    termos = lista(cond.algum);
  } else return '';
  if (termos.length === 0) return '';
  return `quando ${termos.map(termoEmTexto).join(junta)}`;
}

/** Where each variable shows up in `quando` conditions: techniques of nodes and subtasks, the subtask itself, artifact variants (plus rites and questions). */
export function usosEmCondicoes(doc: unknown): Record<string, UsoEmCondicao[]> {
  const data = dados(doc);
  const achados = new Map<string, Array<[number, UsoEmCondicao]>>();
  let ordem = 0;
  const registrar = (donoId: string, cond: unknown, origem: string, tecnica = '', uso = '', variante = ''): void => {
    if (!eMapa(cond)) return;
    const vistos = new Set<string>();
    for (const t of [...lista(cond.todos), ...lista(cond.algum)]) {
      const v = eMapa(t) ? t.var : undefined;
      if (typeof v === 'string' && !vistos.has(v)) {
        vistos.add(v);
        ordem += 1;
        const entrada: [number, UsoEmCondicao] = [ordem, { origem, dono: donoId, tecnica, uso, variante, quando: descreverCondicao(cond) }];
        const atual = achados.get(v);
        if (atual) atual.push(entrada);
        else achados.set(v, [entrada]);
      }
    }
  };
  const varrer = (dono: unknown, subtarefa = false): void => {
    const id = idDe(dono);
    if (id === null) return;
    const d = dono as Doc;
    for (const uso of lista(d.tecnicas)) {
      if (eMapa(uso)) registrar(id, uso.quando, 'tecnica', pyStr(uso.tecnica ?? ''), pyStr(uso.uso ?? ''));
    }
    if (subtarefa) registrar(id, d.quando, 'subtarefa');
  };
  for (const no of lista(data.decisoes)) {
    varrer(no);
    for (const sub of eMapa(no) ? lista(no.subtarefas) : []) varrer(sub, true);
  }
  for (const [colecao, origem] of [['ritos', 'rito'], ['perguntas', 'pergunta']] as const) {
    for (const item of lista(data[colecao])) {
      const id = idDe(item);
      if (id !== null) registrar(id, (item as Doc).quando, origem);
    }
  }
  for (const art of lista(data.artefatos)) {
    const id = idDe(art);
    if (id === null) continue;
    for (const v of lista((art as Doc).variantes)) {
      if (eMapa(v)) registrar(id, v.quando, 'variante', '', '', pyStr(v.nome ?? ''));
    }
  }
  const saida: Record<string, UsoEmCondicao[]> = {};
  for (const v of [...achados.keys()].sort(porChave)) {
    saida[v] = [...achados.get(v)!]
      .sort((a, b) => cmpKey(chaveNatural(a[1].dono), chaveNatural(b[1].dono)) || a[0] - b[0])
      .map(([, x]) => x);
  }
  return saida;
}

/** Gaps of each artifact or variable: `['produtor']`, `['consumidor']`, both or none. */
export function lacunasDeDados(doc: unknown): Record<string, string[]> {
  const data = dados(doc);
  const rastro = rastrearDados(doc);
  const emCondicao = new Set(Object.keys(usosEmCondicoes(doc)));
  const comDestino = new Set<unknown>(
    lista(data.artefatos).filter((a) => eMapa(a) && eComunicacao(a) && lista(a.destinatarios).length > 0).map((a) => (a as Doc).id),
  );
  const comInicial = new Set<unknown>(
    lista(data.variaveis).filter((v) => eMapa(v) && v.inicial !== undefined && v.inicial !== null && v.inicial !== '').map((v) => (v as Doc).id),
  );
  const saida: Record<string, string[]> = {};
  for (const [id, info] of Object.entries(rastro)) {
    const lac: string[] = [];
    if (info.produzido_por.length === 0 && !comInicial.has(id)) lac.push('produtor');
    if (info.consumido_por.length === 0 && !emCondicao.has(id) && !comDestino.has(id)) lac.push('consumidor');
    saida[id] = lac;
  }
  return saida;
}
