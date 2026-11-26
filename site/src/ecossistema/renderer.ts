// SPDX-License-Identifier: MIT
// The only surface the Ecossistema logic uses to draw. The 3d-force-graph adapter implements it; tests use a fake.
import type { Modelo } from './dados';

export interface FocoVisual {
  /** Focused node index. */
  no: number;
  /** Neighbors shown around it, with the target position of each (shell arrangement). */
  vizinhos: ReadonlyArray<{ i: number; pos: readonly [number, number, number] }>;
  /** Neighbors that get a text label (the focused node always has one). */
  rotulados: ReadonlyArray<number>;
}

export interface CameraSalva {
  pos: [number, number, number];
  alvo: [number, number, number];
}

export interface EcossistemaRenderer {
  montar(host: HTMLElement, modelo: Modelo): Promise<void>;
  /** Which nodes are drawn. Edges follow: an edge shows only when both ends show. */
  definirVisiveis(visivel: Uint8Array): void;
  /** Highlights a node and arranges its neighbors around it; `null` returns to the full view. */
  focar(foco: FocoVisual | null, opcoes: { animar: boolean }): void;
  /** Camera to the whole graph or to one node. */
  enquadrar(alvo: 'tudo' | number, opcoes: { animar: boolean }): void;
  aoClicarNo(cb: (i: number) => void): void;
  aoClicarFundo(cb: () => void): void;
  aoPassarNo(cb: (i: number | null, tela: { x: number; y: number }) => void): void;
  lerCamera(): CameraSalva;
  restaurarCamera(c: CameraSalva): void;
  /** Slow camera orbit while the page is idle and nothing is focused. */
  definirRotacaoAutomatica(ligada: boolean): void;
  destruir(): void;
}
