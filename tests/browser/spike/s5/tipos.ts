// SPDX-License-Identifier: MIT
// Spike S5 (disposable prototype of the Renderizador próprio). Shared types. Lives only in tests/browser/spike/: not part of the build.

export type Forma = 'inicio' | 'fim' | 'tarefa' | 'gateway' | 'chamada' | 'sub' | 'ponte' | 'raia';

export interface Linha {
  t: string;
  /** id: small bold id; txt: label; it: italic; neg: bold. */
  k: 'id' | 'txt' | 'it' | 'neg';
}

export interface NoLayout {
  id: string;
  forma: Forma;
  linhas: Linha[];
  w: number;
  h: number;
  fundo: string;
  borda: string;
  larg: number;
  tracejado: boolean;
  texto: string;
  /** Innermost cluster that contains the node. */
  pai?: string;
}

export interface ClusterLayout {
  id: string;
  titulo: string;
  fundo: string;
  borda: string;
  larg: number;
  tracejado: boolean;
  pai?: string;
}

export interface ArestaLayout {
  id: number;
  v: string;
  w: string;
  rotulo: string;
  tracejada: boolean;
  /** Estimated label box (0 without label). */
  lw: number;
  lh: number;
}

export interface EntradaLayout {
  nos: NoLayout[];
  clusters: ClusterLayout[];
  arestas: ArestaLayout[];
}

export interface Ponto {
  x: number;
  y: number;
}

export interface ResultadoLayout {
  /** Center of each node. */
  nos: Record<string, Ponto>;
  /** Center and size of each cluster as dagre computed (tight around the children). */
  clusters: Record<string, { x: number; y: number; w: number; h: number }>;
  arestas: Array<{ id: number; pontos: Ponto[]; lx?: number; ly?: number }>;
  largura: number;
  altura: number;
}
