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

import { camadasDoFluxo, layoutCatalogo, layoutFluxo, layoutJornadas, layoutTitulo, hexParaRgb, type Area, type FluxoDados } from '../../lib/home/layouts';

const area: Area = { largura: 19, altura: 12, desloc: 0.2 };
const finito = (l: { posicoes: Float32Array; cores: Float32Array }) => {
  for (const v of l.posicoes) expect(Number.isFinite(v)).toBe(true);
  for (const v of l.cores) {
    expect(Number.isFinite(v)).toBe(true);
    expect(v).toBeGreaterThanOrEqual(0);
    expect(v).toBeLessThanOrEqual(1);
  }
};

describe('layouts das cenas', () => {
  const fluxo: FluxoDados = {
    raias: [{ id: 'a', cor: '#56B4E9' }, { id: 'b', cor: '#E69F00' }],
    nos: [
      { id: 'n1', raia: 'a', tipo: 'inicio', proximo: ['n2'] },
      { id: 'n2', raia: 'a', tipo: 'tarefa', proximo: ['n3', 'n4'] },
      { id: 'n3', raia: 'b', tipo: 'bifurcacao', proximo: ['n4'] },
      { id: 'n4', raia: 'b', tipo: 'fim', proximo: [] },
    ],
  };
  it('as camadas do fluxo crescem ao longo das ligações e toleram ciclos', () => {
    const c = camadasDoFluxo(fluxo.nos);
    expect(c.get('n1')).toBe(0);
    expect(c.get('n2')).toBe(1);
    expect(c.get('n4')!).toBeGreaterThan(c.get('n3')!);
    const comChamada = camadasDoFluxo([{ id: 'c', raia: 'a', tipo: 'chamada', proximo: ['f'], chama: 'b' }, { id: 'i', raia: 'b', tipo: 'inicio', proximo: ['t'] }, { id: 't', raia: 'b', tipo: 'tarefa', proximo: [] }, { id: 'f', raia: 'a', tipo: 'fim', proximo: [] }]);
    expect(comChamada.get('i')!).toBeGreaterThan(comChamada.get('c')!);
    const ciclo = camadasDoFluxo([{ id: 'x', raia: 'a', tipo: 'tarefa', proximo: ['y'] }, { id: 'y', raia: 'a', tipo: 'tarefa', proximo: ['x'] }]);
    for (const v of ciclo.values()) expect(Number.isFinite(v)).toBe(true);
    expect(Math.max(...ciclo.values())).toBeLessThanOrEqual(1);
  });
  it('o layout do fluxo é determinístico, finito e usa todas as partículas', () => {
    const a = layoutFluxo(fluxo, area, 900, 5);
    const b = layoutFluxo(fluxo, area, 900, 5);
    expect(Array.from(a.posicoes)).toEqual(Array.from(b.posicoes));
    expect(a.posicoes.length).toBe(900 * 4);
    finito(a);
    for (let i = 0; i < 900; i++) expect(a.posicoes[i * 4 + 3]).toBeGreaterThan(0);
  });
  it('o catálogo mantém uma partícula por entidade visível e esconde hubs', () => {
    const nos = Array.from({ length: 300 }, (_, i) => ({ x: i * 3 - 450, y: (i % 17) * 20, z: (i % 7) * 30, grau: i % 40, cor: '#E69F00', hub: i === 0 }));
    const l = layoutCatalogo(nos, area, 400, 3);
    finito(l);
    const grandes = Array.from({ length: 400 }, (_, i) => l.posicoes[i * 4 + 3]).filter((s) => s >= 0.8).length;
    expect(grandes).toBeGreaterThanOrEqual(299);
  });
  it('as jornadas colocam cada certificação em uma das áreas e níveis', () => {
    const l = layoutJornadas({ jornadas: 6, competencias: 4, certificacoes: [{ area: 'tecnica', nivel: 'fundamental' }, { area: 'ia', nivel: 'especialista' }] }, area, 500, 2);
    finito(l);
  });
  it('o título vira pontos dentro da caixa', () => {
    const pts: Array<[number, number]> = Array.from({ length: 500 }, (_, i) => [(i % 50) / 50, Math.floor(i / 50) / 10]);
    const l = layoutTitulo(pts, { x: 0, y: 1, w: 10, h: 2 }, 800, 1);
    finito(l);
    for (let i = 0; i < 250; i++) {
      expect(Math.abs(l.posicoes[i * 4])).toBeLessThanOrEqual(5.01);
    }
    expect(hexParaRgb('#ff0000')).toEqual([1, 0, 0]);
  });
});
