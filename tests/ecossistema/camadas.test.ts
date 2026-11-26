// SPDX-License-Identifier: MIT
import { describe, expect, it } from 'vitest';
import { CAMADAS, CAMADA_DO_TIPO, GRUPOS, GRUPO_DO_TIPO, camadaDe, grupoDe } from '../../lib/ecossistema/camadas';
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
});
