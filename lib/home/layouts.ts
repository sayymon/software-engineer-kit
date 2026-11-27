// SPDX-License-Identifier: MIT
// Target layouts of the stage particles. Pure functions: the same input gives the same positions.
// A layout is positions (x, y, z, size per particle) plus colors (r, g, b per particle) in world units.

export interface Layout {
  /** 4 numbers per particle: x, y, z and size. */
  posicoes: Float32Array;
  /** 3 numbers per particle, 0 to 1. */
  cores: Float32Array;
}

/** Seeded generator (Park-Miller). */
export function semeada(seed: number): () => number {
  let s = Math.abs(Math.floor(seed)) % 2147483647 || 1;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

export function layoutVazio(n: number): Layout {
  return { posicoes: new Float32Array(n * 4), cores: new Float32Array(n * 3) };
}

/** Fills particles from `de` on with faint dust spread in a shell around the center. */
export function preencherPoeira(l: Layout, de: number, seed: number, cor: readonly [number, number, number] = [0.45, 0.55, 0.85]): void {
  const n = l.posicoes.length / 4;
  const r = semeada(seed);
  for (let i = de; i < n; i++) {
    const raio = 5 + r() * 9;
    const th = r() * Math.PI * 2;
    const ph = Math.acos(2 * r() - 1);
    l.posicoes[i * 4] = raio * Math.sin(ph) * Math.cos(th) * 1.4;
    l.posicoes[i * 4 + 1] = raio * Math.sin(ph) * Math.sin(th) * 0.8;
    l.posicoes[i * 4 + 2] = raio * Math.cos(ph) - 4;
    l.posicoes[i * 4 + 3] = 0.5 + r() * 0.5;
    l.cores[i * 3] = cor[0] * (0.5 + r() * 0.5);
    l.cores[i * 3 + 1] = cor[1] * (0.5 + r() * 0.5);
    l.cores[i * 3 + 2] = cor[2] * (0.5 + r() * 0.5);
  }
}

/** Placeholder scene layout: a spiral ribbon. Replaced by the real scene layouts. */
export function layoutEspiral(n: number, seed: number, cor: readonly [number, number, number]): Layout {
  const l = layoutVazio(n);
  const r = semeada(seed);
  const uteis = Math.floor(n * 0.7);
  for (let i = 0; i < uteis; i++) {
    const t = i / uteis;
    const a = t * Math.PI * 10;
    l.posicoes[i * 4] = Math.cos(a) * (2 + t * 5);
    l.posicoes[i * 4 + 1] = (t - 0.5) * 8;
    l.posicoes[i * 4 + 2] = Math.sin(a) * (2 + t * 5);
    l.posicoes[i * 4 + 3] = 1 + r();
    l.cores[i * 3] = cor[0];
    l.cores[i * 3 + 1] = cor[1];
    l.cores[i * 3 + 2] = cor[2];
  }
  preencherPoeira(l, uteis, seed + 1);
  return l;
}

// ---------------------------------------------------------------------------------------------------------------------
// Real scene layouts. `Area` is the size of the visible world at z = 0 for the current window (height is constant,
// width follows the aspect ratio), and `desloc` moves the picture to the right so it does not sit under the scene text.

export interface Area {
  largura: number;
  altura: number;
  /** Fraction of the width to shift the picture to the right (0 centers it). */
  desloc: number;
}

export function hexParaRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace('#', '').padEnd(6, '0').slice(0, 6), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function pôr(l: Layout, i: number, x: number, y: number, z: number, tam: number, cor: readonly [number, number, number], brilho = 1): void {
  l.posicoes[i * 4] = x;
  l.posicoes[i * 4 + 1] = y;
  l.posicoes[i * 4 + 2] = z;
  l.posicoes[i * 4 + 3] = tam;
  l.cores[i * 3] = Math.min(1, cor[0] * brilho);
  l.cores[i * 3 + 1] = Math.min(1, cor[1] * brilho);
  l.cores[i * 3 + 2] = Math.min(1, cor[2] * brilho);
}

// ----- Scene 1: the title as particles ------------------------------------------------------------------------------

/** `pontos` are normalized (0..1) positions inside the title box; `caixa` is that box in world units (center x, y, width, height). */
export function layoutTitulo(pontos: ReadonlyArray<readonly [number, number]>, caixa: { x: number; y: number; w: number; h: number }, n: number, seed: number): Layout {
  const l = layoutVazio(n);
  const r = semeada(seed);
  const m = Math.min(pontos.length, Math.floor(n * 0.5));
  const passo = pontos.length / Math.max(m, 1);
  for (let i = 0; i < m; i++) {
    const p = pontos[Math.floor(i * passo)];
    const t = p[0];
    // Same blue to violet sweep as the title text.
    const cor: [number, number, number] = [0.45 + 0.45 * t, 0.62 - 0.15 * t, 1 - 0.1 * t];
    pôr(l, i, caixa.x + (p[0] - 0.5) * caixa.w, caixa.y - (p[1] - 0.5) * caixa.h, (r() - 0.5) * 0.25, 0.9 + r() * 0.5, cor);
  }
  preencherPoeira(l, m, seed + 5, [0.5, 0.62, 0.95]);
  return l;
}

// ----- Scene 2: the flow of one demand ------------------------------------------------------------------------------

export interface FluxoDados {
  raias: ReadonlyArray<{ id: string; cor: string }>;
  nos: ReadonlyArray<{ id: string; raia: string; tipo: string; proximo: ReadonlyArray<string>; /** Lane this node calls (call nodes only). */ chama?: string }>;
}

/** Edges used for layering: the declared next steps plus, for a call node, the start of the lane it calls. */
function arestasDeCamada(nos: FluxoDados['nos']): Map<string, string[]> {
  const ids = new Set(nos.map((n) => n.id));
  const inicios = new Map<string, string[]>();
  for (const n of nos) if (n.tipo === 'inicio') (inicios.get(n.raia) ?? inicios.set(n.raia, []).get(n.raia)!).push(n.id);
  const saida = new Map<string, string[]>();
  for (const n of nos) {
    const alvos = n.proximo.filter((p) => ids.has(p) && p !== n.id);
    if (n.chama) for (const i of inicios.get(n.chama) ?? []) if (i !== n.id) alvos.push(i);
    saida.set(n.id, [...new Set(alvos)]);
  }
  return saida;
}

/** Longest-path layer of each node. Back edges (loops) are ignored, so the result is always acyclic and bounded. */
export function camadasDoFluxo(nos: FluxoDados['nos']): Map<string, number> {
  const arestas = arestasDeCamada(nos);
  const estado = new Map<string, 0 | 1 | 2>(); // 1 = on the DFS stack, 2 = done
  const util = new Map<string, string[]>(nos.map((n) => [n.id, []]));
  const visitar = (id: string): void => {
    estado.set(id, 1);
    for (const p of arestas.get(id) ?? []) {
      const e = estado.get(p);
      if (e === 1) continue; // back edge
      util.get(id)!.push(p);
      if (e !== 2) visitar(p);
    }
    estado.set(id, 2);
  };
  const entrada = new Set<string>();
  for (const alvos of arestas.values()) for (const p of alvos) entrada.add(p);
  for (const n of nos) if (!entrada.has(n.id) && !estado.has(n.id)) visitar(n.id);
  for (const n of nos) if (!estado.has(n.id)) visitar(n.id);
  const camada = new Map<string, number>(nos.map((n) => [n.id, 0]));
  const memo = new Map<string, number>();
  // Longest path over the DAG built from the kept edges, by repeated relaxation in DFS finishing order.
  const ordem: string[] = [];
  const marca = new Set<string>();
  const topo = (id: string): void => {
    marca.add(id);
    for (const p of util.get(id) ?? []) if (!marca.has(p)) topo(p);
    ordem.push(id);
  };
  for (const n of nos) if (!marca.has(n.id)) topo(n.id);
  for (const id of ordem.reverse()) {
    const c = camada.get(id) ?? 0;
    for (const p of util.get(id) ?? []) if (c + 1 > (camada.get(p) ?? 0)) camada.set(p, c + 1);
  }
  void memo;
  return camada;
}

export function layoutFluxo(d: FluxoDados, a: Area, n: number, seed: number): Layout {
  const l = layoutVazio(n);
  const r = semeada(seed);
  const camadas = camadasDoFluxo(d.nos);
  const maxCamada = Math.max(1, ...camadas.values());
  const raias = d.raias.length ? d.raias : [{ id: '', cor: '#56B4E9' }];
  const indiceRaia = new Map(raias.map((x, i) => [x.id, i]));
  const x0 = a.largura * (-0.5 + a.desloc + 0.15);
  const x1 = a.largura * (0.5 + a.desloc - 0.04);
  const yTopo = a.altura * 0.34;
  const yBase = -a.altura * 0.36;
  const yRaia = (i: number) => (raias.length === 1 ? 0 : yTopo + ((yBase - yTopo) * i) / (raias.length - 1));
  const xCamada = (c: number) => x0 + ((x1 - x0) * c) / maxCamada;
  const pos = new Map<string, [number, number, number]>();
  const porCelula = new Map<string, number>();
  for (const no of d.nos) {
    const ri = indiceRaia.get(no.raia) ?? 0;
    const c = camadas.get(no.id) ?? 0;
    const chave = `${ri}:${c}`;
    const k = porCelula.get(chave) ?? 0;
    porCelula.set(chave, k + 1);
    pos.set(no.id, [xCamada(c), yRaia(ri) + (k % 2 ? 1 : -1) * Math.ceil(k / 2) * 0.28, (r() - 0.5) * 0.4]);
  }
  let i = 0;
  const limite = n;
  // Nodes: bright, large.
  for (const no of d.nos) {
    if (i >= limite) break;
    const p = pos.get(no.id)!;
    const cor = hexParaRgb(raias[indiceRaia.get(no.raia) ?? 0].cor);
    const grande = no.tipo === 'tarefa' ? 3.2 : no.tipo === 'bifurcacao' ? 3.6 : no.tipo === 'chamada' ? 2.8 : 2.2;
    pôr(l, i++, p[0], p[1], p[2], grande, cor, 1.5);
  }
  // Lanes: thin rows of faint particles.
  const reservaLanes = Math.floor((limite - i) * 0.45);
  const porLane = Math.max(1, Math.floor(reservaLanes / raias.length));
  raias.forEach((rr, ri) => {
    const cor = hexParaRgb(rr.cor);
    for (let k = 0; k < porLane && i < limite; k++) {
      const t = (k + r() * 0.5) / porLane;
      pôr(l, i++, x0 + (x1 - x0) * t, yRaia(ri) + (r() - 0.5) * 0.12, (r() - 0.5) * 0.2, 0.55 + r() * 0.3, cor, 0.7);
    }
  });
  // Edges: particles along a soft arc between connected nodes.
  const arestas: Array<[string, string]> = [];
  for (const no of d.nos) for (const p of no.proximo) if (pos.has(p) && p !== no.id) arestas.push([no.id, p]);
  const reservaArestas = Math.floor((limite - i) * 0.75);
  const porAresta = Math.max(1, Math.min(7, Math.floor(reservaArestas / Math.max(arestas.length, 1))));
  for (const [de, para] of arestas) {
    const A = pos.get(de)!;
    const B = pos.get(para)!;
    const corA = hexParaRgb(raias[indiceRaia.get(d.nos.find((x) => x.id === de)!.raia) ?? 0].cor);
    for (let k = 1; k <= porAresta && i < limite; k++) {
      const t = k / (porAresta + 1);
      const arco = Math.sin(t * Math.PI) * 0.25;
      pôr(l, i++, A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t + arco, A[2] + (B[2] - A[2]) * t, 0.75, corA, 0.9);
    }
  }
  preencherPoeira(l, i, seed + 3, [0.45, 0.6, 0.9]);
  return l;
}

// ----- Scene 3: the catalog as a cloud ------------------------------------------------------------------------------

export interface NoCatalogo {
  x: number;
  y: number;
  z: number;
  grau: number;
  cor: string;
  hub: boolean;
}

export function layoutCatalogo(nos: ReadonlyArray<NoCatalogo>, a: Area, n: number, seed: number): Layout {
  const l = layoutVazio(n);
  const uteis = nos.filter((x) => !x.hub);
  // Scale the precomputed 3D positions (about +-700 units) to the visible world.
  const escala = Math.min(a.altura * 0.0125, (a.largura * 0.62) / 1500);
  const cx = a.largura * a.desloc;
  const passo = uteis.length / Math.min(n, uteis.length);
  const total = Math.min(n, uteis.length);
  for (let i = 0; i < total; i++) {
    const no = uteis[Math.floor(i * passo)];
    pôr(l, i, cx + no.x * escala, no.y * escala, no.z * escala, 0.8 + Math.min(1.7, Math.log2(1 + no.grau) * 0.3), hexParaRgb(no.cor), 0.85);
  }
  preencherPoeira(l, total, seed, [0.4, 0.5, 0.8]);
  return l;
}

// ----- Scene 4: journeys, competencies and certifications -----------------------------------------------------------

export type AreaCert = 'tecnica' | 'soft-skill' | 'ia';
export type NivelCert = 'fundamental' | 'associado' | 'profissional' | 'especialista';

export interface DadosJornadas {
  jornadas: number;
  competencias: number;
  certificacoes: ReadonlyArray<{ area: AreaCert; nivel: NivelCert }>;
}

export const COR_AREA: Record<AreaCert, string> = { tecnica: '#56B4E9', 'soft-skill': '#E69F00', ia: '#CC79A7' };
const RAIO_NIVEL: Record<NivelCert, number> = { fundamental: 2.3, associado: 3.4, profissional: 4.5, especialista: 5.6 };
const SETOR: Record<AreaCert, number> = { tecnica: 0, 'soft-skill': 1, ia: 2 };

export function layoutJornadas(d: DadosJornadas, a: Area, n: number, seed: number): Layout {
  const l = layoutVazio(n);
  const r = semeada(seed);
  const cx = a.largura * a.desloc;
  const escala = Math.min(1, (a.altura * 0.42) / 5.6);
  let i = 0;
  // Faint rings, one per level.
  const aneis = Object.values(RAIO_NIVEL);
  const porAnel = Math.floor(n * 0.12);
  for (const raio of aneis) {
    for (let k = 0; k < porAnel && i < n; k++) {
      const ang = (k / porAnel) * Math.PI * 2;
      pôr(l, i++, cx + Math.cos(ang) * raio * escala, Math.sin(ang) * raio * escala * 0.82, (r() - 0.5) * 0.3, 0.5 + r() * 0.25, [0.5, 0.58, 0.85], 0.55);
    }
  }
  // Certifications: sector by area, ring by level.
  const contagem = new Map<string, number>();
  for (const c of d.certificacoes) {
    if (i >= n) break;
    const chave = `${c.area}:${c.nivel}`;
    const k = contagem.get(chave) ?? 0;
    contagem.set(chave, k + 1);
    const base = (SETOR[c.area] / 3) * Math.PI * 2 + 0.25;
    const ang = base + (((k * 0.37) % 1) * (Math.PI * 2)) / 3 * 0.85 + (r() - 0.5) * 0.12;
    const raio = RAIO_NIVEL[c.nivel] + (r() - 0.5) * 0.25;
    pôr(l, i++, cx + Math.cos(ang) * raio * escala, Math.sin(ang) * raio * escala * 0.82, (r() - 0.5) * 0.6, 2.6, hexParaRgb(COR_AREA[c.area]), 1.4);
  }
  // Competencies: four anchors near the center.
  for (let k = 0; k < d.competencias && i < n; k++) {
    const ang = (k / Math.max(d.competencias, 1)) * Math.PI * 2 + 0.6;
    pôr(l, i++, cx + Math.cos(ang) * 1.1 * escala, Math.sin(ang) * 0.9 * escala, 0.2, 4.2, [0.95, 0.95, 1], 1.1);
  }
  // Journeys: a path of larger particles that winds from the center outward.
  for (let k = 0; k < d.jornadas && i < n; k++) {
    const t = d.jornadas > 1 ? k / (d.jornadas - 1) : 0;
    const ang = -0.9 + t * 4.4;
    const raio = (0.9 + t * 4.6) * escala;
    pôr(l, i++, cx + Math.cos(ang) * raio, Math.sin(ang) * raio * 0.82, 0.6, 4.8, hexParaRgb('#56B4E9'), 1.5);
  }
  preencherPoeira(l, i, seed + 9, [0.45, 0.5, 0.85]);
  return l;
}
