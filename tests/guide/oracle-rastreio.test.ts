// SPDX-License-Identifier: MIT
// Regression test of lib/guide/rastreio.ts against the stored oracle output (tests/guide/expected/rastreio.json,
// recorded once from the former rastreio.py). Compares rastrearDados, usosEmCondicoes,
// lacunasDeDados (values and key order) and descreverCondicao on every `quando`, for the real guide and mutated copies.
import { describe, expect, it } from 'vitest';
import { descreverCondicao, lacunasDeDados, rastrearDados, usosEmCondicoes } from '../../lib/guide';
import { rastreioDocs } from './cases/rastreio';
import { readExpected } from './support/expected';

interface RastreioExpected {
  rastrear: Record<string, unknown>;
  rastrear_ordem: string[];
  usos: Record<string, unknown>;
  usos_ordem: string[];
  lacunas: Record<string, unknown>;
  lacunas_ordem: string[];
  condicoes: Array<[unknown, string]>;
}

const expected = readExpected<Record<string, RastreioExpected>>('rastreio.json');

describe('rastreio against the stored oracle output', () => {
  it('stores every case', () => {
    expect(Object.keys(expected).sort()).toEqual(rastreioDocs().map(([name]) => name).sort());
  });
  it.each(rastreioDocs())('%s', (name, doc) => {
    const py = expected[name];
    const rastro = rastrearDados(doc);
    const usos = usosEmCondicoes(doc);
    const lacunas = lacunasDeDados(doc);
    expect(rastro).toEqual(py.rastrear);
    expect(Object.keys(rastro)).toEqual(py.rastrear_ordem);
    expect(usos).toEqual(py.usos);
    expect(Object.keys(usos)).toEqual(py.usos_ordem);
    expect(lacunas).toEqual(py.lacunas);
    expect(Object.keys(lacunas)).toEqual(py.lacunas_ordem);
    expect(py.condicoes.map(([c]) => descreverCondicao(c))).toEqual(py.condicoes.map(([, texto]) => texto));
    if (name === 'real guide document') {
      expect(Object.keys(rastro).length).toBeGreaterThan(0);
      expect(Object.keys(usos).length).toBeGreaterThan(0);
    }
  });
});
