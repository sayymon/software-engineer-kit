// SPDX-License-Identifier: MIT
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { ModeloDeGrafo, VERSAO_MODELO_DE_GRAFO, jsonSchemaGrafo } from '@lib/schema/grafo';

const grafoMinimo = {
  versaoContrato: VERSAO_MODELO_DE_GRAFO,
  demanda: 'feature',
  nomeDemanda: 'Feature',
  raias: [{ id: 'dev', nome: 'Dev', cor: '#112233', ordem: 0, orquestradora: false }],
  nos: [
    {
      id: 'inicio',
      tipo: 'inicio',
      rotulo: 'Início',
      raia: 'dev',
      ordem: 0,
      subtarefas: [{ id: 'sub_a', rotulo: 'A', ordem: 0, condicional: false }],
      temPlaybook: false,
    },
    { id: 'fim', tipo: 'fim', rotulo: 'Fim', raia: 'dev', ordem: 1, retorno: 'ok', subtarefas: [], temPlaybook: true },
  ],
  arestas: [{ origem: 'inicio', destino: 'fim', rotulo: '', tracejada: false }],
};

describe('ModeloDeGrafo (lib/schema/grafo.ts)', () => {
  it('aceita um grafo mínimo e faz round trip em JSON', () => {
    const r = ModeloDeGrafo.safeParse(grafoMinimo);
    expect(r.success).toBe(true);
    expect(JSON.parse(JSON.stringify(r.data))).toEqual(grafoMinimo);
  });

  it('rejeita versão de contrato errada, tipo de nó e cor inválidos e campo extra', () => {
    expect(ModeloDeGrafo.safeParse({ ...grafoMinimo, versaoContrato: 2 }).success).toBe(false);
    expect(ModeloDeGrafo.safeParse({ ...grafoMinimo, nos: [{ ...grafoMinimo.nos[0], tipo: 'x' }] }).success).toBe(false);
    expect(
      ModeloDeGrafo.safeParse({ ...grafoMinimo, raias: [{ ...grafoMinimo.raias[0], cor: 'azul' }] }).success,
    ).toBe(false);
    expect(ModeloDeGrafo.safeParse({ ...grafoMinimo, extra: 1 }).success).toBe(false);
    const { arestas: _omitido, ...semArestas } = grafoMinimo;
    expect(ModeloDeGrafo.safeParse(semArestas).success).toBe(false);
  });

  it('o JSON Schema versionado em schema/json/grafo-fluxo.json espelha o schema Zod', () => {
    const arquivo = JSON.parse(readFileSync(join(__dirname, '../../schema/json/grafo-fluxo.json'), 'utf8'));
    expect(arquivo).toEqual(JSON.parse(JSON.stringify(jsonSchemaGrafo())));
  });
});
