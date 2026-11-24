// SPDX-License-Identifier: MIT
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { CriterioAusente, NotaForaDaEscala, ObjetivoDesconhecido, decidir, type Matriz, type Notas } from '../lib/decisor';

const matriz = JSON.parse(readFileSync(new URL('../content/data/matriz.json', import.meta.url), 'utf8')) as Matriz;
const flat = (v: number): Notas => Object.fromEntries(matriz.ordem_desempate.map((o) => [o, Object.fromEntries(matriz.criterios.map((c) => [c, v]))]));

describe('decisor (matriz.json)', () => {
  it('weights of every goal sum to 1', () => {
    for (const [goal, w] of Object.entries(matriz.pesos)) {
      expect(Math.abs(Object.values(w).reduce((a, b) => a + b, 0) - 1), goal).toBeLessThan(1e-9);
      expect(Object.keys(w).sort()).toEqual([...matriz.criterios].sort());
    }
  });
  it('breaks ties with the fixed order (assinar, comprar, construir)', () => {
    expect(decidir('cumprir_prazo', flat(3), matriz).opcao).toBe('assinar');
  });
  it('picks the option with the highest weighted total', () => {
    const notas = flat(3);
    notas.construir = { diferenciacao: 5, tempo_ate_valor: 1, custo_total: 3, dependencia_fornecedor: 5, risco: 3 };
    const r = decidir('diferenciar_produto', notas, matriz);
    expect(r.opcao).toBe('construir');
    expect(r.totais.construir).toBeCloseTo(0.4 * 5 + 0.15 * 1 + 0.15 * 3 + 0.15 * 5 + 0.15 * 3, 9);
    expect(r.contribuicoes.construir.diferenciacao).toBeCloseTo(2, 9);
  });
  it('rejects unknown goals, missing criteria and out of scale notes', () => {
    expect(() => decidir('inexistente', flat(3), matriz)).toThrow(ObjetivoDesconhecido);
    const missing = flat(3);
    delete missing.comprar.risco;
    expect(() => decidir('reduzir_custo', missing, matriz)).toThrow(CriterioAusente);
    const high = flat(3);
    high.comprar.risco = 6;
    expect(() => decidir('reduzir_custo', high, matriz)).toThrow(NotaForaDaEscala);
    const frac = flat(3);
    frac.comprar.risco = 2.5;
    expect(() => decidir('reduzir_custo', frac, matriz)).toThrow(NotaForaDaEscala);
  });
  it('matches the reference results of the decisor for the four goals', () => {
    const notas: Notas = {
      assinar: { diferenciacao: 2, tempo_ate_valor: 5, custo_total: 3, dependencia_fornecedor: 2, risco: 4 },
      comprar: { diferenciacao: 3, tempo_ate_valor: 3, custo_total: 2, dependencia_fornecedor: 3, risco: 3 },
      construir: { diferenciacao: 5, tempo_ate_valor: 1, custo_total: 4, dependencia_fornecedor: 5, risco: 2 },
    };
    // Totals computed once with the reference decisor.py (reference implementation) for the same notes.
    const expected = {
      cumprir_prazo: { assinar: 3.8, comprar: 2.8, construir: 2.6 },
      diferenciar_produto: { assinar: 2.9, comprar: 2.85, construir: 3.8 },
      reduzir_custo: { assinar: 3.25, comprar: 2.6, construir: 3.4 },
      validar_hipotese: { assinar: 3.75, comprar: 2.8, construir: 2.65 },
    };
    for (const [goal, totals] of Object.entries(expected)) {
      const r = decidir(goal, notas, matriz);
      for (const [op, t] of Object.entries(totals)) expect(r.totais[op], `${goal}/${op}`).toBeCloseTo(t, 9);
    }
    const winners = { cumprir_prazo: 'assinar', diferenciar_produto: 'construir', reduzir_custo: 'construir', validar_hipotese: 'assinar' };
    for (const [goal, winner] of Object.entries(winners)) expect(decidir(goal, notas, matriz).opcao, goal).toBe(winner);
  });
});
