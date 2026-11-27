// SPDX-License-Identifier: MIT
import { gzipSync } from 'node:zlib';
import { describe, expect, it } from 'vitest';
import { NAO_VERIFICADO, construirJornadas, JornadasHomeSchema } from '../../lib/home/jornadas';
import { index } from '../ecossistema/dados';

const dados = construirJornadas(index, (r) => `/pt-BR/${r}/`);

describe('dados de jornadas da Home', () => {
  it('são válidos e cobrem todas as entidades', () => {
    expect(() => JornadasHomeSchema.parse(JSON.parse(JSON.stringify(dados)))).not.toThrow();
    expect(dados.jornadas).toHaveLength(index.ofTipo('jornada').length);
    expect(dados.competencias).toHaveLength(index.ofTipo('competencia').length);
    expect(dados.certificacoes).toHaveLength(index.ofTipo('certificacao').length);
  });
  it('todo custo traz fonte e data, ou o marcador não verificado', () => {
    for (const c of dados.certificacoes) {
      if (c.custoUSD === NAO_VERIFICADO) expect(c.fonte).toBeUndefined();
      else {
        expect(c.fonte).toBeTruthy();
        expect(c.data).toBeTruthy();
      }
    }
  });
  it('as ligações só citam ids que existem no próprio arquivo', () => {
    const ids = new Set([...dados.jornadas, ...dados.competencias, ...dados.certificacoes].map((x) => x.id));
    for (const l of dados.ligacoes) {
      expect(ids.has(l.de)).toBe(true);
      expect(ids.has(l.para)).toBe(true);
    }
  });
  it('cabe em 10 kB gzip', () => {
    expect(gzipSync(JSON.stringify(dados)).length).toBeLessThan(10 * 1024);
  });
});
