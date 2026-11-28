// SPDX-License-Identifier: MIT
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { gerarGrafo, gerarGrafos } from '../../lib/flow-graph';
import { raiasDoContexto } from '../../lib/flow-mermaid/order';
import { ModeloDeGrafo } from '../../lib/schema/grafo';
import { casos, demandasComRaias, guiaReal } from './geradores';
import type { D } from '../guide/properties/geradores';

const NUM_RUNS = 100;

const conj = (xs: Iterable<string>) => [...new Set(xs)].sort();

// Feature: experiencia-fluxos-catalogo, Property 1: Round trip de serialização do Modelo_de_Grafo
describe('Property 1: round trip de serialização do Modelo_de_Grafo', () => {
  // Validates: Requirements 17.8
  it('JSON.parse(JSON.stringify(g)) equals g, for random guides and demands', () => {
    fc.assert(
      fc.property(casos(), ({ doc, demanda }) => {
        const g = gerarGrafo(doc, demanda);
        const volta = JSON.parse(JSON.stringify(g));
        expect(volta).toEqual(g);
        expect(ModeloDeGrafo.safeParse(volta).success).toBe(true);
      }),
      { numRuns: NUM_RUNS },
    );
  });

  it('holds for the 12 real demands', () => {
    const grafos = gerarGrafos(guiaReal);
    expect(grafos.size).toBe(12);
    for (const g of grafos.values()) expect(JSON.parse(JSON.stringify(g))).toEqual(g);
  });
});

// Feature: experiencia-fluxos-catalogo, Property 2: O Modelo_de_Grafo não acrescenta nem perde elementos do Guia_YAML
describe('Property 2: o Modelo_de_Grafo não acrescenta nem perde elementos do Guia_YAML', () => {
  // Validates: Requirements 17.9
  const verificar = (doc: D, demanda: string) => {
    const g = gerarGrafo(doc, demanda);
    const ctx = raiasDoContexto(doc, demanda);
    const nosYaml = (doc.decisoes as D[]).filter((d) => ctx.has(String(d.raia)));
    const byId = new Map(nosYaml.map((d) => [String(d.id), d]));

    expect(conj(g.nos.map((n) => n.id))).toEqual(conj(nosYaml.map((d) => String(d.id))));
    expect(g.nos.length).toBe(nosYaml.length);
    expect(conj(g.raias.map((r) => r.id))).toEqual(conj(ctx));
    expect(g.raias.length).toBe(ctx.size);
    expect(g.nos.every((n) => ctx.has(n.raia))).toBe(true);

    const subsGrafo = g.nos.flatMap((n) => n.subtarefas.map((s) => s.id));
    const subsYaml = nosYaml.filter((d) => d.tipo === 'tarefa').flatMap((d) => ((d.subtarefas ?? []) as D[]).map((s) => String(s.id)));
    expect(conj(subsGrafo)).toEqual(conj(subsYaml));
    expect(subsGrafo.length).toBe(subsYaml.length);

    const inicioDa = (raia: string) => nosYaml.find((d) => d.raia === raia && d.tipo === 'inicio')?.id;
    for (const a of g.arestas) {
      const origem = byId.get(a.origem);
      expect(origem, `origem ${a.origem}`).toBeDefined();
      expect(byId.has(a.destino), `destino ${a.destino}`).toBe(true);
      const transicao = ((origem?.proximo ?? []) as D[]).some((p) => p.para === a.destino);
      if (!a.tracejada) {
        expect(transicao, `${a.origem} -> ${a.destino} sem proximo`).toBe(true);
        continue;
      }
      const chamada = origem?.tipo === 'chamada' && inicioDa(String(origem.raia_chamada)) === a.destino;
      const retorno =
        origem?.tipo === 'fim' &&
        nosYaml.some(
          (c) => c.tipo === 'chamada' && c.raia_chamada === origem.raia && ((c.proximo ?? []) as D[]).some((p) => p.para === a.destino),
        );
      expect(chamada || retorno, `${a.origem} -> ${a.destino} sem chamada/retorno`).toBe(true);
    }
  };

  it('node, subtask, lane and edge sets match the guide, for random guides and demands', () => {
    fc.assert(fc.property(casos(), ({ doc, demanda }) => verificar(doc, demanda)), { numRuns: NUM_RUNS });
  });

  it('holds for the 12 real demands', () => {
    const ids = demandasComRaias(guiaReal);
    expect(ids.length).toBe(12);
    for (const id of ids) verificar(guiaReal, id);
  });
});
