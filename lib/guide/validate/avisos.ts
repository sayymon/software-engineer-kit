// SPDX-License-Identifier: MIT
// Data-flow warnings of the guide validator (nivel "aviso").
// Ported from the Python oracle (validator.py: _checar_avisos, _checar_completude), restricted to the data-flow
// rules: VAR_NAO_DECLARADA, ENTRADA_SEM_PRODUTOR, SAIDA_NAO_ENTREGUE, ITEM_SEM_USO, TAREFA_SEM_ENTREGAVEL,
// SUBTAREFA_SEM_ENTREGAVEL and LACUNA_DE_DADOS. The role/RACI rules live in raci.ts (called at the end, as in Python);
// the question, playbook and taxonomy rules of the same Python
// functions are ported in their own modules (phases 5 to 7).
import type { GuideDoc } from '../index';
import { lacunasDeDados } from '../rastreio';
import { checarPlaybooksSemNo, regrasDePergunta } from './perguntas';
import { checarPapeis } from './raci';
import type { Problema } from './types';
type Doc = GuideDoc;
const list = (v: unknown): Doc[] => (Array.isArray(v) ? (v as Doc[]) : []);
const strs = (v: unknown): string[] => (Array.isArray(v) ? (v as string[]) : []);
const has = (o: unknown, k: string): boolean => typeof o === 'object' && o !== null && Object.hasOwn(o, k);
/** Variables named by the terms of a `quando` (todos + algum). */
function varsDaCondicao(quando: unknown): string[] {
  const q = (quando ?? {}) as Doc;
  return [...list(q.todos), ...list(q.algum)].map((t) => t.var);
}
function novoAviso(avisos: Problema[]) {
  return (code: string, path: string, message: string, itemId: string): void => {
    avisos.push({ code, nivel: 'aviso', path, itemId, message });
  };
}
/** Data-flow warnings; only look where the author declared the fields (progressive adoption). */
export function checarAvisos(doc: Doc): Problema[] {
  const avisos: Problema[] = [];
  const aviso = novoAviso(avisos);
  const decisoes = list(doc.decisoes);
  const raias = list(doc.raias);
  // VAR_NAO_DECLARADA: only when `variaveis` exists and is not empty.
  const declaradas = new Set<string>(list(doc.variaveis).map((v) => v.id));
  if (declaradas.size) {
    decisoes.forEach((d, i) => {
      for (const chave of Object.keys(d.estado ?? {})) {
        if (!declaradas.has(chave)) {
          aviso('VAR_NAO_DECLARADA', `decisoes[${i}].estado.${chave}`, `a chave de estado '${chave}' de '${d.id}' não existe em \`variaveis\``, d.id);
        }
      }
    });
  }
  const catalogo = new Set<string>([...declaradas, ...list(doc.artefatos).map((a) => a.id)]);
  // First declaration wins (Python builds the maps over the reversed list).
  const porId = new Map<string, Doc>();
  for (const d of decisoes) if (!porId.has(d.id)) porId.set(d.id, d);
  const raiaPorId = new Map<string, Doc>();
  for (const r of raias) if (!raiaPorId.has(r.id)) raiaPorId.set(r.id, r);
  const nosDaRaia = new Map<string, Doc[]>();
  for (const d of decisoes) {
    const nos = nosDaRaia.get(d.raia);
    if (nos) nos.push(d);
    else nosDaRaia.set(d.raia, [d]);
  }
  /** What the node hands to the flow: its `saidas` and, in a `chamada`, the returns of the called lane. */
  const producao = (no: Doc): Set<string> => {
    const saida = new Set<string>(strs(no.saidas));
    if (no.tipo === 'chamada') {
      for (const x of nosDaRaia.get(no.raia_chamada ?? '') ?? []) {
        if (x.tipo === 'fim') for (const s of strs(x.saidas)) saida.add(s);
      }
    }
    return saida;
  };
  // Predecessors by reachability inside the lane (`proximo` edges between nodes of the same lane).
  const antecessores = new Map<string, Set<string>>();
  for (const nos of nosDaRaia.values()) {
    const ids = new Set<string>(nos.map((n) => n.id));
    const reverso = new Map<string, Set<string>>();
    for (const n of nos) reverso.set(n.id, new Set());
    for (const n of nos) {
      for (const t of list(n.proximo)) if (ids.has(t.para)) reverso.get(t.para)!.add(n.id);
    }
    for (const n of nos) {
      const visto = new Set<string>();
      const fila: string[] = [...reverso.get(n.id)!];
      while (fila.length) {
        const atual = fila.shift()!;
        if (visto.has(atual)) continue;
        visto.add(atual);
        fila.push(...reverso.get(atual)!);
      }
      visto.delete(n.id);
      antecessores.set(n.id, visto);
    }
  }
  decisoes.forEach((d, i) => {
    const raia = raiaPorId.get(d.raia);
    const entradas = strs(d.entradas);
    if (entradas.length && raia !== undefined) {
      const disponivel = new Set<string>(strs(raia.entradas));
      for (const a of antecessores.get(d.id) ?? []) for (const s of producao(porId.get(a)!)) disponivel.add(s);
      entradas.forEach((alvo, j) => {
        if (catalogo.has(alvo) && !disponivel.has(alvo)) {
          aviso('ENTRADA_SEM_PRODUTOR', `decisoes[${i}].entradas[${j}]`,
            `a entrada '${alvo}' de '${d.id}' não está nas \`entradas\` da raia '${d.raia}' nem nas \`saidas\` de um nó que a antecede na raia`, d.id);
        }
      });
    }
    const subs = list(d.subtarefas);
    if (d.tipo === 'tarefa' && subs.length) {
      const disponivel = new Set<string>(entradas);
      subs.forEach((sub, k) => {
        strs(sub.entradas).forEach((alvo, j) => {
          if (catalogo.has(alvo) && !disponivel.has(alvo)) {
            aviso('ENTRADA_SEM_PRODUTOR', `decisoes[${i}].subtarefas[${k}].entradas[${j}]`,
              `a entrada '${alvo}' de '${sub.id}' não está nas \`entradas\` da tarefa '${d.id}' nem nas \`saidas\` de uma subtarefa anterior`, sub.id);
          }
        });
        for (const s of strs(sub.saidas)) disponivel.add(s);
      });
      const entregue = new Set<string>(subs.flatMap((sub) => strs(sub.saidas)));
      strs(d.saidas).forEach((alvo, j) => {
        if (!entregue.has(alvo)) {
          aviso('SAIDA_NAO_ENTREGUE', `decisoes[${i}].saidas[${j}]`, `a saída '${alvo}' da tarefa '${d.id}' não é produzida por nenhuma de suas subtarefas`, d.id);
        }
      });
    }
  });
  // ITEM_SEM_USO: artifact or variable that nothing references (entradas, saidas, estado or a `quando` condition).
  const usados = new Set<string>();
  const usar = (ids: Iterable<string>) => { for (const x of ids) usados.add(x); };
  for (const r of raias) usar(strs(r.entradas));
  for (const d of decisoes) {
    for (const dono of [d, ...list(d.subtarefas)]) {
      usar(strs(dono.entradas));
      usar(strs(dono.saidas));
      for (const uso of list(dono.tecnicas)) usar(varsDaCondicao(uso.quando));
      usar(varsDaCondicao(dono.quando)); // `quando` of the subtask
    }
  }
  for (const art of list(doc.artefatos)) for (const v of list(art.variantes)) usar(varsDaCondicao(v.quando));
  for (const d of decisoes) usar(Object.keys(d.estado ?? {}));
  for (const item of [...list(doc.ritos), ...list(doc.perguntas)]) {
    usar(strs(item.entradas));
    usar(strs(item.saidas));
    usar(varsDaCondicao(item.quando));
  }
  for (const colecao of ['artefatos', 'variaveis'] as const) {
    list(doc[colecao]).forEach((item, i) => {
      if (!usados.has(item.id)) {
        aviso('ITEM_SEM_USO', `${colecao}[${i}]`,
          `'${item.id}' não é referenciado por nenhum nó, subtarefa, raia, estado ou condição (some da aba Catálogo)`, item.id);
      }
    });
  }
  // Mandatory deliverable: every task and subtask delivers at least one ARTIFACT (a variable does not count).
  // Progressive adoption: only lanes where the lane or a node declared `entradas`, `saidas` or `subtarefas`.
  const artefatos = new Set<string>(list(doc.artefatos).map((a) => a.id));
  const emAdocao = new Set<string>();
  for (const r of raias) if (['entradas', 'saidas', 'subtarefas'].some((c) => has(r, c))) emAdocao.add(r.id);
  for (const d of decisoes) if (['entradas', 'saidas', 'subtarefas'].some((c) => has(d, c))) emAdocao.add(d.raia);
  decisoes.forEach((d, i) => {
    if (d.tipo !== 'tarefa' || !emAdocao.has(d.raia)) return;
    const subs = list(d.subtarefas);
    const entregues = [...strs(d.saidas), ...subs.flatMap((sub) => strs(sub.saidas))];
    if (!entregues.some((x) => artefatos.has(x))) {
      aviso('TAREFA_SEM_ENTREGAVEL', `decisoes[${i}]`,
        `a tarefa '${d.id}' não entrega nenhum artefato em \`saidas\` (nem nas subtarefas); toda tarefa precisa de ao menos um artefato (use tipo \`acao\` para algo que se faz sem objeto durável)`,
        d.id);
    }
    subs.forEach((sub, k) => {
      if (!strs(sub.saidas).some((x) => artefatos.has(x))) {
        aviso('SUBTAREFA_SEM_ENTREGAVEL', `decisoes[${i}].subtarefas[${k}]`, `a subtarefa '${sub.id}' não tem nenhum artefato em \`saidas\``, sub.id);
      }
    });
  });
  checarPapeis(doc, aviso, regrasDePergunta(doc, aviso));
  return avisos;
}
/** Completeness warnings of the whole guide; only runs with `completude` (and `avisos`), as in Python. */
export function checarCompletude(doc: Doc): Problema[] {
  const issues: Problema[] = [];
  const aviso = novoAviso(issues);
  checarPlaybooksSemNo(doc, aviso);
  const lacunas = lacunasDeDados(doc);
  for (const colecao of ['artefatos', 'variaveis'] as const) {
    list(doc[colecao]).forEach((item, i) => {
      const falta = Object.hasOwn(lacunas, item.id) ? lacunas[item.id] : undefined;
      // an item with no use at all already gets ITEM_SEM_USO; here only who takes part in the data flow
      if (falta?.length) {
        aviso('LACUNA_DE_DADOS', `${colecao}[${i}]`,
          `'${item.id}' está sem ${falta.join(' e sem ')}: declare quem produz e quem consome (entradas, saídas, condição ou destinatários)`, item.id);
      }
    });
  }
  return issues;
}
