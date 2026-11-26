// SPDX-License-Identifier: MIT
import { describe, expect, it } from 'vitest';
import { DecisorError, configDoGuia, decidir, type Notas } from '../lib/decisor';
import { guideDir, loadGuideDoc } from '../lib/guide';

const config = configDoGuia(loadGuideDoc(guideDir(new URL('../content', import.meta.url).pathname)));
const flat = (v: number): Notas => Object.fromEntries(config.opcoes.map((o) => [o, Object.fromEntries(config.criterios.map((c) => [c, v]))]));

describe('decisor (bloco do guia)', () => {
  it('weights of every goal sum to 1 and cover every criterion', () => {
    for (const [goal, w] of Object.entries(config.pesos)) {
      expect(Math.abs(Object.values(w).reduce((a, b) => a + b, 0) - 1), goal).toBeLessThan(1e-9);
      expect(Object.keys(w).sort()).toEqual([...config.criterios].sort());
    }
  });
  it('breaks ties with the guide order (assinar, comprar, construir)', () => {
    const r = decidir(config, 'cumprir_prazo', flat(3));
    expect(r.recomendada).toBe('assinar');
    expect(r.empate).toEqual(['construir', 'comprar', 'assinar']);
    expect(r.justificativa).toContain('Empate entre construir, comprar, assinar: venceu assinar');
  });
  it('picks the highest weighted total, rounded to 6 decimals', () => {
    const notas = flat(3);
    notas.construir = { diferenciacao: 5, tempo_ate_valor: 1, custo_total: 3, dependencia_fornecedor: 5, risco: 3 };
    const r = decidir(config, 'diferenciar_produto', notas);
    expect(r.recomendada).toBe('construir');
    expect(r.empate).toEqual([]);
    expect(r.avaliacoes[0].total).toBe(3.8);
    expect(r.avaliacoes[0].linhas[0]).toEqual({ criterio: 'diferenciacao', nota: 5, peso: 0.4, contribuicao: 2 });
  });
  it('escapes backslashes and quotes in a non-numeric note like Python repr', () => {
    const notas = flat(3);
    (notas.construir as Record<string, unknown>).risco = 'a\\b\'c\nd';
    expect(() => decidir(config, 'reduzir_custo', notas as Notas)).toThrow("não é um número: \"a\\\\b'c\\nd\"");
  });
  it('rejects unknown goals and options, missing or out of scale notes with DecisorError', () => {
    expect(() => decidir(config, 'inexistente', flat(3))).toThrow(DecisorError);
    const missing = flat(3);
    delete missing.comprar.risco;
    expect(() => decidir(config, 'reduzir_custo', missing)).toThrow("falta a nota do critério 'risco' na opção 'comprar'");
    const high = flat(3);
    high.comprar.risco = 6;
    expect(() => decidir(config, 'reduzir_custo', high)).toThrow('está fora da escala 1 a 5');
    expect(() => decidir(config, 'reduzir_custo', { ...flat(3), extra: {} })).toThrow('opções desconhecidas: extra');
  });
  it('financial context changes only the justification', () => {
    const ctx = { custos: { construir: { curto: 10, longo: 'alto' } }, roi: 1.5, custo_de_nao_fazer: 'perda de prazo' };
    const a = decidir(config, 'reduzir_custo', flat(3));
    const b = decidir(config, 'reduzir_custo', flat(3), ctx);
    expect({ ...b, justificativa: '' }).toEqual({ ...a, justificativa: '' });
    expect(b.justificativa).toContain('Contexto: custo de construir: curto prazo 10, longo prazo alto; custo de não fazer: perda de prazo; ROI esperado: 1.5.');
  });
});
