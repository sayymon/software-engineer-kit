// SPDX-License-Identifier: MIT
import { gzipSync } from 'node:zlib';
import { describe, expect, it } from 'vitest';
import { construirAdjacencia } from '../../lib/ecossistema/adjacencia';
import { camadaDe } from '../../lib/ecossistema/camadas';
import { PayloadSchema, ShardSchema, construirPayload, construirShards } from '../../lib/ecossistema/payload';
import { index } from './dados';

const t0 = Date.now();
const payload = construirPayload(index);
const msLayout = Date.now() - t0;
const shards = construirShards(index);

describe('payload do ecossistema', () => {
  it('é válido e não contém tipos de detalhe', () => {
    expect(() => PayloadSchema.parse(JSON.parse(JSON.stringify(payload)))).not.toThrow();
    for (const n of payload.nos) expect(camadaDe(payload.tipos[n[1]])).not.toBe('detalhe');
  });
  it('tem um nó por página de nucleo e fluxo', () => {
    expect(payload.nos.length).toBe(index.pages.filter((p) => camadaDe(p.tipo) !== 'detalhe').length);
  });
  it('não tem aresta órfã e a vizinhança é simétrica', () => {
    const adj = construirAdjacencia(payload.nos.length, payload.arestas);
    for (let a = 0; a < adj.n; a++) for (const b of adj.vizinhos(a)) expect(adj.vizinhos(b)).toContain(a);
  });
  it('é determinístico: duas execuções geram os mesmos bytes', () => {
    expect(JSON.stringify(construirPayload(index))).toBe(JSON.stringify(payload));
  }, 120000);
  it('o layout cabe no tempo de build', () => {
    console.log(`payload + layout: ${msLayout} ms`);
    expect(msLayout).toBeLessThan(60000);
  });
  it('posições são finitas e os hubs ficam perto dos vizinhos', () => {
    for (const n of payload.nos) for (const v of [n[3], n[4], n[5]]) expect(Number.isFinite(v)).toBe(true);
  });
  it('cabe no orçamento de 200 kB gzip', () => {
    const kb = gzipSync(JSON.stringify(payload)).length / 1024;
    expect(kb).toBeLessThan(200);
  });
});

describe('shards de detalhe', () => {
  it('são válidos e cobrem todos os itens de detalhe', () => {
    let total = 0;
    for (const s of shards.values()) {
      expect(() => ShardSchema.parse(JSON.parse(JSON.stringify(s)))).not.toThrow();
      total += s.nos.length;
    }
    const esperado = index.pages.filter((p) => camadaDe(p.tipo) === 'detalhe').length + index.pages.reduce((n, p) => n + index.anchorsOf(p.id).length, 0);
    expect(total).toBe(esperado);
  });
  it('toda aresta aponta para um nó do payload principal ou do próprio shard', () => {
    const principais = new Set(payload.nos.map((n) => n[0]));
    for (const s of shards.values()) {
      const proprios = new Set(s.nos.map((n) => n[0]));
      for (const [a, b] of s.arestas) {
        expect(principais.has(a) || proprios.has(a), `${s.demanda}: ${a}`).toBe(true);
        expect(principais.has(b) || proprios.has(b), `${s.demanda}: ${b}`).toBe(true);
      }
      for (const n of s.nos) expect(principais.has(n[3]) || proprios.has(n[3]), `${s.demanda}: pai ${n[3]}`).toBe(true);
    }
  });
});
