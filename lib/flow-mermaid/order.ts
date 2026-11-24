// SPDX-License-Identifier: MIT
// Port of the guide `ordem.py` (natural id order, flow order, lane order). Same results, byte for byte.
import type { Item } from './types';

type Key = [Array<string | number>, string];

/** Natural sort key: `c2 < c10`. Total and stable (ties broken by the original text). */
export function chaveNatural(valor: unknown): Key {
  const texto = String(valor);
  const partes = texto.split(/([0-9]+)/).map((p, i) => (i % 2 ? Number.parseInt(p, 10) : p));
  return [partes, texto];
}

function cmpElem(a: string | number, b: string | number): number {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

export function cmpKey(a: Key, b: Key): number {
  const n = Math.min(a[0].length, b[0].length);
  for (let i = 0; i < n; i++) {
    const c = cmpElem(a[0][i], b[0][i]);
    if (c !== 0) return c;
  }
  if (a[0].length !== b[0].length) return a[0].length < b[0].length ? -1 : 1;
  return cmpElem(a[1], b[1]);
}

export function ordenarNatural<T>(ids: Iterable<T>): T[] {
  return [...ids].sort((x, y) => cmpKey(chaveNatural(x), chaveNatural(y)));
}

function destinos(no: Item): Array<[number, string]> {
  const out: Array<[number, string]> = [];
  (no.proximo ?? []).forEach((p: Item, n: number) => {
    if (p && typeof p === 'object' && p.para != null) out.push([n, String(p.para)]);
  });
  return out;
}

/** Ids in flow order: breadth first from each `inicio`, then the unreachable ones in natural order. */
export function ordemFluxo(nos: Map<string, Item>, ids: Iterable<string>): string[] {
  const conjunto = new Set(ids);
  const visto = new Set<string>();
  const saida: string[] = [];
  const inicios = ordenarNatural([...conjunto].filter((i) => nos.get(i)?.tipo === 'inicio'));
  for (const inicio of inicios) {
    if (visto.has(inicio)) continue;
    visto.add(inicio);
    const fila = [inicio];
    while (fila.length) {
      const atual = fila.shift() as string;
      saida.push(atual);
      const cand = destinos(nos.get(atual) as Item)
        .filter(([, d]) => conjunto.has(d) && !visto.has(d))
        .map(([n, d]) => ({ chave: chaveNatural(d), n, d }))
        .sort((a, b) => cmpKey(a.chave, b.chave) || a.n - b.n);
      for (const { d } of cand) {
        if (!visto.has(d)) {
          visto.add(d);
          fila.push(d);
        }
      }
    }
  }
  const resto = [...conjunto].filter((i) => !visto.has(i));
  saida.push(...ordenarNatural(resto));
  return saida;
}

/** Lanes of a demand: the orchestrator, then call order, then the unreachable ones. */
export function ordemRaias(raias: Map<string, Item>, nos: Map<string, Item>): string[] {
  const posicao = new Map([...raias.keys()].map((rid, n) => [rid, n]));
  const porRaia = new Map<string, Set<string>>([...raias.keys()].map((rid) => [rid, new Set<string>()]));
  for (const [nid, no] of nos) {
    if (porRaia.has(no.raia)) (porRaia.get(String(no.raia)) as Set<string>).add(nid);
  }
  const chamadas = new Map<string, string[]>();
  for (const [rid, ids] of porRaia) {
    const fluxo = ordemFluxo(nos, ids);
    chamadas.set(
      rid,
      fluxo.filter((i) => nos.get(i)?.tipo === 'chamada' && raias.has(nos.get(i)?.raia_chamada)).map((i) => String(nos.get(i)?.raia_chamada)),
    );
  }
  const chave = (rid: string) => ({ k: chaveNatural(rid), p: posicao.get(rid) as number });
  const cmp = (a: string, b: string) => {
    const ka = chave(a);
    const kb = chave(b);
    return cmpKey(ka.k, kb.k) || ka.p - kb.p;
  };
  const orqs = [...raias.keys()].filter((r) => raias.get(r)?.orquestradora === true).sort(cmp);
  const saida: string[] = [];
  const visto = new Set<string>();
  for (const orq of orqs.slice(0, 1)) {
    visto.add(orq);
    const fila = [orq];
    while (fila.length) {
      const atual = fila.shift() as string;
      saida.push(atual);
      for (const alvo of chamadas.get(atual) ?? []) {
        if (!visto.has(alvo)) {
          visto.add(alvo);
          fila.push(alvo);
        }
      }
    }
  }
  saida.push(...[...raias.keys()].filter((r) => !visto.has(r)).sort(cmp));
  return saida;
}

export function demandasBiblioteca(doc: Item): Set<string> {
  return new Set(
    (doc.demandas ?? []).filter((d: Item) => d && typeof d === 'object' && d.biblioteca === true).map((d: Item) => String(d.id)),
  );
}

/** Lanes of the demand plus the library lanes it reaches through `chamada` nodes (transitive closure). */
export function raiasDoContexto(doc: Item, demandaId: string): Set<string> {
  const raias = new Map<string, Item>();
  for (const r of doc.raias ?? []) if (r && typeof r === 'object' && 'id' in r) raias.set(String(r.id), r);
  const libs = demandasBiblioteca(doc);
  const chama = new Map<string, Set<string>>();
  for (const n of doc.decisoes ?? []) {
    if (n && typeof n === 'object' && n.tipo === 'chamada' && n.raia_chamada) {
      const k = String(n.raia);
      if (!chama.has(k)) chama.set(k, new Set());
      (chama.get(k) as Set<string>).add(String(n.raia_chamada));
    }
  }
  const contexto = new Set([...raias].filter(([, r]) => r.demanda === demandaId).map(([rid]) => rid));
  const pilha = [...contexto];
  while (pilha.length) {
    const atual = pilha.pop() as string;
    for (const alvo of chama.get(atual) ?? []) {
      if (!contexto.has(alvo) && libs.has(String(raias.get(alvo)?.demanda))) {
        contexto.add(alvo);
        pilha.push(alvo);
      }
    }
  }
  return contexto;
}
