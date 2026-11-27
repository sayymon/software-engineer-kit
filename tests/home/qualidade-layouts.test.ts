// SPDX-License-Identifier: MIT
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { layoutEspiral, preencherPoeira, layoutVazio } from '../../lib/home/layouts';
import { AvaliadorDeQuadros, CONFIG, JANELA_DE_QUADROS, NIVEIS, nivelInicial } from '../../lib/home/qualidade';

describe('qualidade', () => {
  it('celular e máquina fraca começam no nível médio, desktop no alto', () => {
    expect(nivelInicial({ toqueGrosso: true })).toBe('medio');
    expect(nivelInicial({ toqueGrosso: false, nucleos: 4 })).toBe('medio');
    expect(nivelInicial({ toqueGrosso: false, nucleos: 10, memoriaGb: 8 })).toBe('alto');
  });
  it('desce um nível quando a média da janela passa de 24 ms e nunca sobe', () => {
    const a = new AvaliadorDeQuadros('alto');
    let r: string | null = null;
    for (let i = 0; i < JANELA_DE_QUADROS; i++) r = a.registrar(40);
    expect(r).toBe('medio');
    for (let i = 0; i < JANELA_DE_QUADROS; i++) r = a.registrar(8);
    expect(a.nivel).toBe('medio');
    for (let i = 0; i < JANELA_DE_QUADROS; i++) r = a.registrar(60);
    expect(r).toBe('baixo');
    for (let i = 0; i < JANELA_DE_QUADROS * 3; i++) a.registrar(60);
    expect(a.nivel).toBe('baixo');
  });
  it('em qualquer sequência de tempos o nível só desce', () => {
    fc.assert(
      fc.property(fc.array(fc.double({ min: 1, max: 200, noNaN: true }), { minLength: 1, maxLength: 600 }), (tempos) => {
        const a = new AvaliadorDeQuadros('alto');
        let ultimo = 0;
        for (const t of tempos) {
          a.registrar(t);
          const i = NIVEIS.indexOf(a.nivel);
          expect(i).toBeGreaterThanOrEqual(ultimo);
          ultimo = i;
        }
      }),
    );
  });
  it('os níveis diminuem partículas, resolução e ondas', () => {
    expect(CONFIG.alto.particulas).toBeGreaterThan(CONFIG.medio.particulas);
    expect(CONFIG.medio.particulas).toBeGreaterThan(CONFIG.baixo.particulas);
    expect(CONFIG.alto.dpr).toBeGreaterThanOrEqual(CONFIG.baixo.dpr);
  });
});

describe('layouts', () => {
  it('são determinísticos e sem NaN', () => {
    const a = layoutEspiral(2400, 7, [0.3, 0.6, 1]);
    const b = layoutEspiral(2400, 7, [0.3, 0.6, 1]);
    expect(Array.from(a.posicoes)).toEqual(Array.from(b.posicoes));
    for (const v of a.posicoes) expect(Number.isFinite(v)).toBe(true);
    for (const v of a.cores) expect(v).toBeGreaterThanOrEqual(0);
  });
  it('a poeira preenche só a partir do índice pedido', () => {
    const l = layoutVazio(100);
    preencherPoeira(l, 60, 3);
    expect(l.posicoes[59 * 4 + 3]).toBe(0);
    expect(l.posicoes[60 * 4 + 3]).toBeGreaterThan(0);
  });
});
