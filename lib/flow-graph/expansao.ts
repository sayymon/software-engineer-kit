// SPDX-License-Identifier: MIT
// Progressive expansion of the Modelo_de_Grafo (Requirement 20). Pure TypeScript: no fs, node:* or DOM,
// so the same code runs in the build and in the browser.
import type { ModeloDeGrafo, NoDoGrafo } from '../schema/grafo';

export interface ConjuntoExpandido {
  /** Ids of expanded lanes. */
  raias: ReadonlySet<string>;
  /** Ids of tasks with subtasks expanded (only effective in an expanded lane). */
  subtarefas: ReadonlySet<string>;
  /** Global subtask toggle (Requirement 5), effective for every expanded lane. */
  todasSubtarefas: boolean;
}

export interface ClusterDeRaia {
  raia: string;
  totais: { nos: number; tarefas: number; gateways: number; chamadas: number; subtarefas: number };
  /** Edges with both ends in the lane, omitted from the drawing. */
  arestasInternas: number;
  /** Aggregated edges arriving at the cluster. */
  entradas: number;
  /** Aggregated edges leaving the cluster. */
  saidas: number;
}

export interface ArestaVisivel {
  /** Node id or `cluster:<raia>`. */
  origem: string;
  destino: string;
  /** Original label when `quantidade === 1`, otherwise `×N`. */
  rotulo: string;
  tracejada: boolean;
  /** Number of Modelo_de_Grafo edges it represents. */
  quantidade: number;
}

export interface GrafoVisivel {
  clusters: ClusterDeRaia[];
  nos: NoDoGrafo[];
  arestas: ArestaVisivel[];
}

const PREFIXO_CLUSTER = 'cluster:';

/** Visible graph for an expansion set: expanded lanes as nodes, collapsed lanes as clusters with aggregated edges. */
export function projetar(grafo: ModeloDeGrafo, conj: ConjuntoExpandido): GrafoVisivel {
  const raiaDoNo = new Map(grafo.nos.map((n) => [n.id, n.raia]));
  const expandida = (raia: string | undefined): boolean => raia !== undefined && conj.raias.has(raia);

  const nos: NoDoGrafo[] = [];
  const contagem = new Map<string, ClusterDeRaia>();
  for (const r of grafo.raias) {
    if (conj.raias.has(r.id)) continue;
    contagem.set(r.id, {
      raia: r.id,
      totais: { nos: 0, tarefas: 0, gateways: 0, chamadas: 0, subtarefas: 0 },
      arestasInternas: 0,
      entradas: 0,
      saidas: 0,
    });
  }
  for (const n of grafo.nos) {
    if (expandida(n.raia)) {
      const mostra = conj.todasSubtarefas || conj.subtarefas.has(n.id);
      nos.push(mostra ? n : { ...n, subtarefas: [] });
      continue;
    }
    const t = contagem.get(n.raia)?.totais;
    if (!t) continue;
    t.nos += 1;
    if (n.tipo === 'tarefa') t.tarefas += 1;
    else if (n.tipo === 'bifurcacao') t.gateways += 1;
    else if (n.tipo === 'chamada') t.chamadas += 1;
    t.subtarefas += n.subtarefas.length;
  }

  const extremo = (id: string): string => {
    const raia = raiaDoNo.get(id);
    return raia === undefined || expandida(raia) ? id : `${PREFIXO_CLUSTER}${raia}`;
  };
  const arestas: ArestaVisivel[] = [];
  const agregadas = new Map<string, ArestaVisivel>();
  for (const a of grafo.arestas) {
    const origem = extremo(a.origem);
    const destino = extremo(a.destino);
    const tocaCluster = origem.startsWith(PREFIXO_CLUSTER) || destino.startsWith(PREFIXO_CLUSTER);
    if (!tocaCluster) {
      arestas.push({ origem, destino, rotulo: a.rotulo, tracejada: a.tracejada, quantidade: 1 });
      continue;
    }
    if (origem === destino) {
      const c = contagem.get(origem.slice(PREFIXO_CLUSTER.length));
      if (c) c.arestasInternas += 1;
      continue;
    }
    const chave = JSON.stringify([origem, destino, a.tracejada]);
    const existente = agregadas.get(chave);
    if (existente) {
      existente.quantidade += 1;
    } else {
      const nova: ArestaVisivel = { origem, destino, rotulo: a.rotulo, tracejada: a.tracejada, quantidade: 1 };
      agregadas.set(chave, nova);
      arestas.push(nova);
    }
  }
  for (const e of agregadas.values()) {
    if (e.quantidade > 1) e.rotulo = `×${e.quantidade}`;
    if (e.origem.startsWith(PREFIXO_CLUSTER)) {
      const c = contagem.get(e.origem.slice(PREFIXO_CLUSTER.length));
      if (c) c.saidas += 1;
    }
    if (e.destino.startsWith(PREFIXO_CLUSTER)) {
      const c = contagem.get(e.destino.slice(PREFIXO_CLUSTER.length));
      if (c) c.entradas += 1;
    }
  }
  return { clusters: [...contagem.values()], nos, arestas };
}

const enc = (ids: Iterable<string>): string =>
  [...ids]
    .sort()
    .map((i) => encodeURIComponent(i))
    .join(',');

/** Canonical key (independent of insertion order) for caches and the `exp` fragment. Empty set gives ''. */
export function chaveDoConjunto(conj: ConjuntoExpandido): string {
  const partes: string[] = [];
  if (conj.raias.size) partes.push(`r=${enc(conj.raias)}`);
  if (conj.subtarefas.size) partes.push(`s=${enc(conj.subtarefas)}`);
  if (conj.todasSubtarefas) partes.push('t=1');
  return partes.join(';');
}

/** Keeps only lanes and tasks that exist in the graph. A set with every lane is the `completo` set. */
export function normalizar(conj: ConjuntoExpandido, grafo: ModeloDeGrafo): ConjuntoExpandido {
  const raias = new Set(grafo.raias.map((r) => r.id));
  const tarefas = new Set(grafo.nos.filter((n) => n.tipo === 'tarefa').map((n) => n.id));
  return {
    raias: new Set([...conj.raias].filter((r) => raias.has(r))),
    subtarefas: new Set([...conj.subtarefas].filter((t) => tarefas.has(t))),
    todasSubtarefas: conj.todasSubtarefas,
  };
}

const dec = (v: string): string[] =>
  v
    .split(',')
    .filter((x) => x !== '')
    .map((x) => {
      try {
        return decodeURIComponent(x);
      } catch {
        return x;
      }
    });

/** Inverse of `chaveDoConjunto`. Unknown lanes and tasks are ignored; malformed parts are skipped. */
export function lerConjunto(chave: string, grafo: ModeloDeGrafo): ConjuntoExpandido {
  const bruto = { raias: new Set<string>(), subtarefas: new Set<string>(), todasSubtarefas: false };
  for (const parte of chave.split(';')) {
    const i = parte.indexOf('=');
    if (i < 0) continue;
    const k = parte.slice(0, i);
    const v = parte.slice(i + 1);
    if (k === 'r') dec(v).forEach((x) => bruto.raias.add(x));
    else if (k === 's') dec(v).forEach((x) => bruto.subtarefas.add(x));
    else if (k === 't') bruto.todasSubtarefas = v === '1';
  }
  return normalizar(bruto, grafo);
}
