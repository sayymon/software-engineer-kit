// SPDX-License-Identifier: MIT
// Question and playbook warnings of the guide validator (nivel "aviso"): PERGUNTA_SEM_DEPENDENCIA, PERGUNTA_SEM_USO
// and PLAYBOOK_SEM_NO. Ported from the Python oracle (validator.py: _checar_avisos, block guarded by `papeis`, and
// _checar_completude).
import type { GuideDoc } from '../index';
import type { Avisar } from './raci';
type Doc = GuideDoc;
const list = (v: unknown): Doc[] => (Array.isArray(v) ? (v as Doc[]) : []);
const strs = (v: unknown): string[] => (Array.isArray(v) ? (v as string[]) : []);
/** Python truthiness for the values the schema allows here (strings and lists). */
const truthy = (v: unknown): boolean => (Array.isArray(v) ? v.length > 0 : Boolean(v));

/**
 * Hook for `checarPapeis`: runs for each question, before its RACI check (Python order). Only active with the
 * `papeis` catalog, because `checarPapeis` is the one that calls it.
 */
export function regrasDePergunta(doc: Doc, aviso: Avisar): (pergunta: Doc, i: number) => void {
  const citadas = new Set<string>([
    ...list(doc.playbooks).flatMap((pb) => strs(pb.perguntas_chave)),
    ...list(doc.ritos).flatMap((rt) => strs(rt.perguntas)),
  ]);
  return (pq, i) => {
    if (!truthy(pq.depende_de)) {
      aviso('PERGUNTA_SEM_DEPENDENCIA', `perguntas[${i}]`, `a pergunta '${pq.id}' não diz o que a responde (\`depende_de\`)`, pq.id);
    }
    if (!citadas.has(pq.id)) {
      aviso('PERGUNTA_SEM_USO', `perguntas[${i}]`, `a pergunta '${pq.id}' não é citada por nenhum playbook nem rito`, pq.id);
    }
  };
}

/** PLAYBOOK_SEM_NO: a playbook that no node uses (completeness check, so it needs `completude`). */
export function checarPlaybooksSemNo(doc: Doc, aviso: Avisar): void {
  const usados = new Set<unknown>(list(doc.decisoes).map((d) => d.playbook));
  list(doc.playbooks).forEach((pb, i) => {
    if (!usados.has(pb.id)) {
      aviso('PLAYBOOK_SEM_NO', `playbooks[${i}]`,
        `o playbook '${pb.id}' não é usado por nenhum nó; funda o conteúdo no playbook do nó correspondente e remova`, pb.id);
    }
  });
}
