// SPDX-License-Identifier: MIT
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { cenaAtiva, janelaDeMorph, progressoDaCena, suavizar } from '../../lib/home/progresso';

describe('progresso da cena', () => {
  it('fica entre 0 e 1 para qualquer posição', () => {
    fc.assert(
      fc.property(fc.integer({ min: -20000, max: 20000 }), fc.integer({ min: 100, max: 8000 }), fc.integer({ min: 200, max: 3000 }), (topo, altura, janela) => {
        const p = progressoDaCena(topo, altura, janela);
        expect(p).toBeGreaterThanOrEqual(0);
        expect(p).toBeLessThanOrEqual(1);
      }),
    );
  });
  it('vale 0 antes de a faixa chegar ao topo e 1 depois de percorrida', () => {
    expect(progressoDaCena(500, 2000, 900)).toBe(0);
    expect(progressoDaCena(0, 2000, 900)).toBe(0);
    expect(progressoDaCena(-1100, 2000, 900)).toBe(1);
    expect(progressoDaCena(-5000, 2000, 900)).toBe(1);
  });
  it('não diminui quando a rolagem aumenta (monotonia)', () => {
    fc.assert(
      fc.property(fc.integer({ min: 100, max: 8000 }), fc.integer({ min: 200, max: 3000 }), fc.integer({ min: 0, max: 9000 }), fc.integer({ min: 0, max: 500 }), (altura, janela, rolagem, passo) => {
        const a = progressoDaCena(-rolagem, altura, janela);
        const b = progressoDaCena(-(rolagem + passo), altura, janela);
        expect(b).toBeGreaterThanOrEqual(a);
      }),
    );
  });
  it('é independente do tamanho da janela para a mesma fração do percurso', () => {
    fc.assert(
      fc.property(fc.double({ min: 0, max: 1, noNaN: true }), fc.integer({ min: 300, max: 1200 }), fc.integer({ min: 300, max: 1200 }), (fracao, j1, j2) => {
        const altura = (j: number) => j * 3;
        const topo = (j: number) => -fracao * (altura(j) - j);
        expect(progressoDaCena(topo(j1), altura(j1), j1)).toBeCloseTo(fracao, 6);
        expect(progressoDaCena(topo(j2), altura(j2), j2)).toBeCloseTo(fracao, 6);
      }),
    );
  });
});

describe('cena ativa', () => {
  const faixas = (janela: number, rolagem: number) => [0, 1, 2, 3].map((i) => ({ topo: i * janela * 2.5 - rolagem, altura: janela * 2.5 }));
  it('é sempre exatamente uma, dentro do intervalo', () => {
    fc.assert(
      fc.property(fc.integer({ min: 300, max: 1400 }), fc.integer({ min: -500, max: 12000 }), (janela, rolagem) => {
        const i = cenaAtiva(faixas(janela, rolagem), janela);
        expect(Number.isInteger(i)).toBe(true);
        expect(i).toBeGreaterThanOrEqual(0);
        expect(i).toBeLessThanOrEqual(3);
      }),
    );
  });
  it('acompanha a rolagem na ordem das cenas', () => {
    const janela = 900;
    const sequencia = [0, 3000, 5000, 8000].map((r) => cenaAtiva(faixas(janela, r), janela));
    expect(sequencia).toEqual([0, 1, 2, 3]);
  });
});

describe('morph', () => {
  it('só mistura no fim da cena e termina em 1', () => {
    expect(janelaDeMorph([0.2, 0, 0, 0], 0)).toEqual({ de: 0, para: 1, mistura: 0 });
    expect(janelaDeMorph([1, 0, 0, 0], 0).mistura).toBe(1);
    const meio = janelaDeMorph([0.8, 0, 0, 0], 0).mistura;
    expect(meio).toBeGreaterThan(0);
    expect(meio).toBeLessThan(1);
  });
  it('a última cena não mistura com nada', () => {
    expect(janelaDeMorph([1, 1, 1, 0.5], 3)).toEqual({ de: 3, para: 3, mistura: 0 });
  });
  it('a mistura nunca diminui com o progresso', () => {
    fc.assert(fc.property(fc.double({ min: 0, max: 1, noNaN: true }), fc.double({ min: 0, max: 1, noNaN: true }), (a, b) => {
      const [x, y] = a <= b ? [a, b] : [b, a];
      expect(janelaDeMorph([y, 0, 0, 0], 0).mistura).toBeGreaterThanOrEqual(janelaDeMorph([x, 0, 0, 0], 0).mistura);
    }));
    expect(suavizar(0, 1, -1)).toBe(0);
    expect(suavizar(0, 1, 2)).toBe(1);
  });
});
