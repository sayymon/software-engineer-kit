// SPDX-License-Identifier: MIT
// Minimal typings for the parts of d3-force-3d used by the build-time layout.
declare module 'd3-force-3d' {
  export interface SimNode {
    index?: number;
    x: number;
    y: number;
    z: number;
    vx?: number;
    vy?: number;
    vz?: number;
  }
  export interface Simulation<N extends SimNode> {
    force(name: string, force?: unknown): Simulation<N>;
    stop(): Simulation<N>;
    tick(iterations?: number): Simulation<N>;
    alphaDecay(a: number): Simulation<N>;
    velocityDecay(a: number): Simulation<N>;
    randomSource(f: () => number): Simulation<N>;
  }
  export function forceSimulation<N extends SimNode>(nodes: N[], numDimensions?: number): Simulation<N>;
  export function forceManyBody(): { strength(s: number): unknown; theta(t: number): unknown; distanceMax(d: number): unknown };
  export function forceLink(links: Array<{ source: number; target: number; weight?: number }>): {
    distance(d: number): unknown;
    strength(s: (l: { weight: number }) => number): unknown;
    iterations(i: number): unknown;
  };
  export function forceX(x: (n: { index: number }) => number): { strength(s: number): unknown };
  export function forceY(y: (n: { index: number }) => number): { strength(s: number): unknown };
  export function forceZ(z: (n: { index: number }) => number): { strength(s: number): unknown };
}
