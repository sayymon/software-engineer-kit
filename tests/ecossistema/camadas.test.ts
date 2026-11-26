// SPDX-License-Identifier: MIT
import { describe, expect, it } from 'vitest';
import { CAMADAS, CAMADA_DO_TIPO, COR_DO_TIPO, FORMA_DO_TIPO, GRUPOS, GRUPO_DO_TIPO, camadaDe, grupoDe } from '../../lib/ecossistema/camadas';
import { TIPOS } from '../../lib/schema';

describe('camadas do ecossistema', () => {
  it('todo tipo do schema tem exatamente uma camada e um grupo', () => {
    for (const t of TIPOS) {
      expect(CAMADAS, t).toContain(CAMADA_DO_TIPO[t]);
      expect(GRUPOS, t).toContain(GRUPO_DO_TIPO[t]);
    }
    expect(Object.keys(CAMADA_DO_TIPO).sort()).toEqual([...TIPOS].sort());
    expect(Object.keys(GRUPO_DO_TIPO).sort()).toEqual([...TIPOS].sort());
  });
  it('tipo desconhecido falha com o nome do tipo', () => {
    expect(() => camadaDe('inventado')).toThrow(/inventado/);
    expect(() => grupoDe('inventado')).toThrow(/inventado/);
  });
  it('detalhe contém os tipos de baixa granularidade', () => {
    for (const t of ['decisao', 'no', 'subtarefa', 'playbook', 'pergunta', 'celula']) expect(camadaDe(t)).toBe('detalhe');
  });
  it('todo tipo tem forma e cor próprias, e as formas não se repetem dentro de um grupo (fora do detalhe)', () => {
    for (const t of TIPOS) {
      expect(FORMA_DO_TIPO[t], t).toBeTruthy();
      expect(COR_DO_TIPO[t], t).toMatch(/^#[0-9a-f]{6}$/);
    }
    for (const g of GRUPOS) {
      const visiveis = TIPOS.filter((t) => GRUPO_DO_TIPO[t] === g && CAMADA_DO_TIPO[t] !== 'detalhe');
      const formas = visiveis.map((t) => FORMA_DO_TIPO[t]);
      expect(new Set(formas).size, `${g}: ${formas.join(',')}`).toBe(formas.length);
      const cores = visiveis.map((t) => COR_DO_TIPO[t]);
      expect(new Set(cores).size, `${g} cores`).toBe(cores.length);
    }
  });
});
