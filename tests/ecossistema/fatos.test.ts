// SPDX-License-Identifier: MIT
import { describe, expect, it } from 'vitest';
import { NAO_VERIFICADO, TIPOS_COM_FATOS, construirFatos } from '../../lib/ecossistema/fatos';
import { index } from './dados';

const fatos = construirFatos(index);

describe('fatos por tipo', () => {
  it('há um arquivo por tipo com fatos', () => {
    expect([...fatos.keys()].sort()).toEqual([...TIPOS_COM_FATOS].sort());
  });
  it('todo preço traz fonte e data, ou o marcador não verificado', () => {
    for (const f of fatos.values()) {
      for (const lista of Object.values(f.itens)) {
        for (const fato of lista.filter((x) => /Preço|Custo/.test(x.rotulo))) {
          if (fato.naoVerificado) expect(fato.valor).toBe(NAO_VERIFICADO);
          else {
            expect(fato.fonte, fato.rotulo).toBeTruthy();
            expect(fato.data, fato.rotulo).toBeTruthy();
          }
        }
      }
    }
  });
  it('ids dos fatos existem no índice', () => {
    for (const f of fatos.values()) for (const lista of Object.values(f.itens)) for (const fato of lista) for (const id of fato.ids ?? []) expect(index.byId.has(id), id).toBe(true);
  });
});
