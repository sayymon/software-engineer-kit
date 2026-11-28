// SPDX-License-Identifier: MIT
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { gerarGrafo } from '../../lib/flow-graph';
import { ordemFluxo, raiasDoContexto } from '../../lib/flow-mermaid/order';
import { casos, demandasComRaias, guiaReal } from './geradores';
import type { D } from '../guide/properties/geradores';

const NUM_RUNS = 100;

// Feature: experiencia-fluxos-catalogo, Property 3: Ordem relativa estável dentro da Raia
describe('Property 3: ordem relativa estável dentro da Raia', () => {
  // Validates: Requirements 17.7
  const verificar = (doc: D, demanda: string, embaralhar: (xs: unknown[]) => unknown[] = (xs) => xs) => {
    const g = gerarGrafo(doc, demanda);
    const ctx = raiasDoContexto(doc, demanda);
    const nosYaml = new Map(
      (doc.decisoes as D[]).filter((d) => ctx.has(String(d.raia))).map((d) => [String(d.id), d] as [string, D]),
    );

    for (const raia of g.raias) {
      const idsDaRaia = [...nosYaml].filter(([, n]) => n.raia === raia.id).map(([id]) => id);
      const esperado = ordemFluxo(nosYaml, idsDaRaia);
      // Any Renderizador sorting by `ordem` must recover the order `ordemFluxo` computes from the guide.
      const nosDaRaia = embaralhar(g.nos.filter((n) => n.raia === raia.id)) as typeof g.nos;
      const obtido = [...nosDaRaia].sort((a, b) => a.ordem - b.ordem);
      expect(obtido.map((n) => n.id)).toEqual(esperado);
      expect(obtido.map((n) => n.ordem)).toEqual(esperado.map((_, i) => i));
    }
  };

  it('sorted `ordem` of each lane equals ordemFluxo of the guide, for random guides and demands', () => {
    fc.assert(
      fc.property(casos(), fc.infiniteStream(fc.nat()), ({ doc, demanda }, aleatorios) => {
        const it = aleatorios[Symbol.iterator]();
        const embaralhar = (xs: unknown[]) =>
          [...xs].map((x) => [x, it.next().value as number] as const).sort((a, b) => a[1] - b[1]).map(([x]) => x);
        verificar(doc, demanda, embaralhar);
      }),
      { numRuns: NUM_RUNS },
    );
  });

  it('holds for the 12 real demands', () => {
    const ids = demandasComRaias(guiaReal);
    expect(ids.length).toBe(12);
    for (const id of ids) verificar(guiaReal, id);
  });
});
