// SPDX-License-Identifier: MIT
// Role and RACI warnings of the guide validator (nivel "aviso"): SEM_PAPEL, RACI_CONFLITO, APROVA_FORA_DE_GATEWAY and
// APROVA_REDUNDANTE. Ported from the Python oracle (validator.py: _checar_avisos, block guarded by `papeis`).
import type { GuideDoc } from '../index';
type Doc = GuideDoc;
export type Avisar = (code: string, path: string, message: string, itemId: string) => void;
const list = (v: unknown): Doc[] => (Array.isArray(v) ? (v as Doc[]) : []);
const strs = (v: unknown): string[] => (Array.isArray(v) ? (v as string[]) : []);
/** Python truthiness for the values the schema allows here (strings and lists). */
const truthy = (v: unknown): boolean => (Array.isArray(v) ? v.length > 0 : Boolean(v));
const sorted = (xs: Iterable<string>): string[] => [...xs].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
/** RACI: A only in a gateway and different from who decides; a role is not R and C, nor I and another letter. */
function raci(aviso: Avisar, item: Doc, path: string, itemId: string): void {
  const apoio = new Set<string>(strs(item.apoio));
  const r = new Set<string>(apoio);
  if (item.papel !== undefined && item.papel !== null) r.add(item.papel);
  const c = new Set<string>(strs(item.consultado));
  const inf = new Set<string>(strs(item.informado));
  const a = new Set<string>(truthy(item.aprova) ? [item.aprova] : []);
  for (const pid of sorted([...a].filter((x) => apoio.has(x)))) {
    aviso('RACI_CONFLITO', path, `'${itemId}': o papel '${pid}' aprova e também está no apoio; deixe só em \`aprova\``, itemId);
  }
  for (const pid of sorted([...r].filter((x) => c.has(x)))) {
    aviso('RACI_CONFLITO', path, `'${itemId}': o papel '${pid}' é responsável e consultado ao mesmo tempo`, itemId);
  }
  for (const pid of sorted([...inf].filter((x) => r.has(x) || c.has(x) || a.has(x)))) {
    aviso('RACI_CONFLITO', path, `'${itemId}': o papel '${pid}' é informado e também tem outra letra no RACI`, itemId);
  }
}
/**
 * Role warnings, only with the `papeis` catalog declared. `porPergunta` runs for each question before its RACI check,
 * so the question rules (phase 6) keep the Python order.
 */
export function checarPapeis(doc: Doc, aviso: Avisar, porPergunta?: (pergunta: Doc, i: number) => void): void {
  if (!truthy(doc.papeis)) return;
  const decisoes = list(doc.decisoes);
  decisoes.forEach((d, i) => {
    const subs = list(d.subtarefas);
    if (d.tipo === 'tarefa' && !truthy(d.papel) && !subs.some((sub) => truthy(sub.papel))) {
      aviso('SEM_PAPEL', `decisoes[${i}]`, `a tarefa '${d.id}' não tem \`papel\` nem subtarefas com papel`, d.id);
    }
    if (d.tipo === 'bifurcacao' && !truthy(d.papel)) {
      aviso('SEM_PAPEL', `decisoes[${i}]`, `o gateway '${d.id}' não declara o \`papel\` que decide`, d.id);
    }
    subs.forEach((sub, k) => {
      if (!truthy(sub.papel)) aviso('SEM_PAPEL', `decisoes[${i}].subtarefas[${k}]`, `a subtarefa '${sub.id}' não tem \`papel\``, sub.id);
    });
  });
  list(doc.perguntas).forEach((pq, i) => {
    porPergunta?.(pq, i);
    raci(aviso, pq, `perguntas[${i}]`, pq.id);
  });
  list(doc.ritos).forEach((rt, i) => {
    if (!truthy(rt.papel)) aviso('SEM_PAPEL', `ritos[${i}]`, `o rito '${rt.id}' não declara quem facilita (\`papel\`)`, rt.id);
    raci(aviso, rt, `ritos[${i}]`, rt.id);
  });
  decisoes.forEach((d, i) => {
    if (truthy(d.aprova)) {
      if (d.tipo !== 'bifurcacao') {
        aviso('APROVA_FORA_DE_GATEWAY', `decisoes[${i}].aprova`,
          `'${d.id}' declara \`aprova\`, mas a aprovação só existe nos gateways de qualidade`, d.id);
      } else if (d.aprova === d.papel) {
        aviso('APROVA_REDUNDANTE', `decisoes[${i}].aprova`,
          `o gateway '${d.id}' aprova com o mesmo papel que decide; omita \`aprova\``, d.id);
      }
    }
    raci(aviso, d, `decisoes[${i}]`, d.id);
    list(d.subtarefas).forEach((sub, k) => raci(aviso, sub, `decisoes[${i}].subtarefas[${k}]`, sub.id));
  });
}
