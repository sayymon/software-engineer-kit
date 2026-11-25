// SPDX-License-Identifier: MIT
// Lane rules ported from the Python oracle (validator.py: _checar_raias).
// DEMANDA_INCONSISTENTE and COR_DUPLICADA (with the library lanes a demand calls).
import type { GuideDoc } from '../index';
import type { AddIssue } from './dados';

type Doc = GuideDoc;
const list = (v: unknown): Doc[] => (Array.isArray(v) ? (v as Doc[]) : []);

/** Ids of demands marked `biblioteca: true` (ordem.py: demandas_biblioteca). */
export function demandasBiblioteca(doc: Doc): Set<string> {
  return new Set(list(doc.demandas).filter((d) => d && d.biblioteca === true).map((d) => String(d.id)));
}

/** Lanes of a demand plus the library lanes it reaches through `chamada` nodes (ordem.py: raias_do_contexto). */
export function raiasDoContexto(doc: Doc, demandaId: string): Set<string> {
  const raias = new Map<string, Doc>();
  for (const r of list(doc.raias)) if (r && 'id' in r) raias.set(String(r.id), r);
  const libs = demandasBiblioteca(doc);
  const chama = new Map<string, Set<string>>();
  for (const n of list(doc.decisoes)) {
    if (n && n.tipo === 'chamada' && n.raia_chamada) {
      const k = String(n.raia);
      if (!chama.has(k)) chama.set(k, new Set());
      chama.get(k)?.add(String(n.raia_chamada));
    }
  }
  const contexto = new Set<string>([...raias].filter(([, r]) => r.demanda === demandaId).map(([id]) => id));
  const pilha = [...contexto];
  while (pilha.length) {
    for (const alvo of chama.get(pilha.pop() as string) ?? []) {
      const dem = raias.get(alvo)?.demanda;
      if (!contexto.has(alvo) && dem !== undefined && libs.has(String(dem))) {
        contexto.add(alvo);
        pilha.push(alvo);
      }
    }
  }
  return contexto;
}

/** Demand (non-library) -> lanes of its context, in demand declaration order (ordem.py: contextos_das_demandas). */
export function contextosDasDemandas(doc: Doc): Map<string, Set<string>> {
  const libs = demandasBiblioteca(doc);
  const out = new Map<string, Set<string>>();
  for (const d of list(doc.demandas)) {
    if (d && !libs.has(String(d.id))) out.set(String(d.id), raiasDoContexto(doc, String(d.id)));
  }
  return out;
}

function primeiraRaiaPorId(doc: Doc): Map<string, Doc> {
  const porId = new Map<string, Doc>();
  for (const r of list(doc.raias)) if (!porId.has(r.id)) porId.set(r.id, r);
  return porId;
}

/** DEMANDA_INCONSISTENTE: a node declares a demand different from its lane's demand. */
export function checarDemandaDasRaias(doc: Doc, add: AddIssue): void {
  const raiaPorId = primeiraRaiaPorId(doc);
  list(doc.decisoes).forEach((d, i) => {
    const r = raiaPorId.get(d.raia);
    if (r !== undefined && d.demanda !== undefined && d.demanda !== r.demanda) {
      add(
        'DEMANDA_INCONSISTENTE',
        `decisoes[${i}].demanda`,
        `'${d.id}' declara a demanda '${d.demanda}', mas a raia '${r.id}' pertence à demanda '${r.demanda}'`,
        d.id,
      );
    }
  });
}

/** COR_DUPLICADA: per demand, counting the library lanes it calls (they share one diagram). */
export function checarCoresDasRaias(doc: Doc, add: AddIssue): void {
  const raias = list(doc.raias);
  const raiaPorId = primeiraRaiaPorId(doc);
  const contextos = contextosDasDemandas(doc);
  for (const lib of [...demandasBiblioteca(doc)].sort()) {
    contextos.set(lib, new Set(raias.filter((r) => r.demanda === lib).map((r) => String(r.id))));
  }
  const jaAvisadas = new Set<string>();
  for (const [dem, ctxIds] of contextos) {
    const cores = new Map<string, string>();
    raias.forEach((r, ri) => {
      if (!ctxIds.has(r.id) || raiaPorId.get(r.id) !== r) return;
      const cor = String(r.cor).toLowerCase();
      if (cores.has(cor)) {
        if (!jaAvisadas.has(r.id)) {
          jaAvisadas.add(r.id);
          add('COR_DUPLICADA', `raias[${ri}].cor`, `a raia '${r.id}' repete a cor ${r.cor} da raia '${cores.get(cor)}' na demanda '${dem}'`, r.id);
        }
      } else cores.set(cor, r.id);
    });
  }
}
