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

/** Links between demands: only the broken-reference part (LIGACAO_INCONSISTENTE is ported later). */
export function checarLigacoes(doc: Doc, ids: Record<string, Set<string>>, broken: Broken): void {
  const porId = new Set<string>(list(doc.decisoes).map((d) => d.id));
  list(doc.decisoes).forEach((d, i) => {
    list(d.ligacoes).forEach((lig, j) => {
      const base = `decisoes[${i}].ligacoes[${j}]`;
      if (!ids.demandas.has(lig.demanda_destino)) broken(`${base}.demanda_destino`, lig.demanda_destino, 'demandas', d.id);
      if (!porId.has(lig.para)) broken(`${base}.para`, lig.para, 'decisoes', d.id);
    });
  });
}

/** Data, roles, RACI, questions and rites: REF_QUEBRADA and ID_DUPLICADO only. */
export function checarDados(doc: Doc, add: AddIssue): void {
  const broken: Broken = (path, alvo, onde, origem) =>
    add('REF_QUEBRADA', path, `'${origem}' references missing id '${alvo}' (expected in ${onde})`, origem);
  const variaveis = new Set<string>(list(doc.variaveis).map((v) => v.id));
  const dados = new Set<string>([...variaveis, ...list(doc.artefatos).map((a) => a.id)]);
  const tecnicas = new Set<string>(list(doc.tecnicas).map((t) => t.id));

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
    list(d.subtarefas).forEach((sub, k) => {
      if ('papel' in sub && !papeis.has(sub.papel)) broken(`decisoes[${i}].subtarefas[${k}].papel`, sub.papel, 'papeis', sub.id);
      for (const campo of ['apoio', 'consultado', 'informado']) {
        strs(sub[campo]).forEach((alvo, j) => {
          if (!papeis.has(alvo)) broken(`decisoes[${i}].subtarefas[${k}].${campo}[${j}]`, alvo, 'papeis', sub.id);
        });
      }
    });
  });

  const condicao = (quando: Doc, caminho: string, donoId: string) => {
    const chave = 'todos' in quando ? 'todos' : 'algum';
    list(quando[chave]).forEach((termo, m) => {
      if (!variaveis.has(termo.var)) broken(`${caminho}.${chave}[${m}].var`, termo.var, 'variaveis', donoId);
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
    list(art.variantes).forEach((v, k) => {
      if (v.quando) condicao(v.quando, `artefatos[${i}].variantes[${k}].quando`, art.id);
    });
  });
}
