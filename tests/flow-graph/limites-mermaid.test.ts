// SPDX-License-Identifier: MIT
// Requirement 20.10: the Mermaid text of Expandir_tudo (set with every lane), with and without subtasks, of every real
// demand stays below the `maxTextSize` and `maxEdges` the kit configures (lib/flow-mermaid/limites.ts).
import { describe, expect, it } from 'vitest';
import { gerarGrafo } from '../../lib/flow-graph';
import type { ConjuntoExpandido } from '../../lib/flow-graph/expansao';
import { gerarDiagramaExpandido } from '../../lib/flow-mermaid';
import { MERMAID_MAX_EDGES, MERMAID_MAX_TEXT_SIZE } from '../../lib/flow-mermaid/limites';
import { demandasComRaias, guiaReal } from './geradores';

/** Edge count as Mermaid sees it: arrow tokens outside quoted labels, on edge lines (never class/style/click lines). */
const contarArestas = (texto: string): number => {
  let n = 0;
  for (const linha of texto.split('\n')) {
    const l = linha.trim();
    if (/^(class|classDef|style|linkStyle|click|subgraph|end|flowchart|direction)\b/.test(l)) continue;
    n += (l.replace(/"[^"]*"/g, '""').match(/(?:--!>|-->|-\.->|==>|---|-\.-|===)/g) ?? []).length;
  }
  return n;
};

const demandas = demandasComRaias(guiaReal);
const medidas = demandas.flatMap((id) => {
  const grafo = gerarGrafo(guiaReal, id);
  const conj: ConjuntoExpandido = { raias: new Set(grafo.raias.map((r) => r.id)), subtarefas: new Set(), todasSubtarefas: false };
  return [false, true].map((subtarefas) => {
    const texto = gerarDiagramaExpandido(grafo, { ...conj, todasSubtarefas: subtarefas }).texto;
    return { id, subtarefas, caracteres: texto.length, arestas: contarArestas(texto) };
  });
});

describe('limites do Mermaid (Expandir_tudo das 12 Demandas)', () => {
  it('covers the 12 real demands, with and without subtasks', () => {
    expect(demandas).toHaveLength(12);
    expect(medidas).toHaveLength(24);
  });

  it.each(medidas.map((m) => [`${m.id}${m.subtarefas ? ' com subtarefas' : ''}`, m] as const))(
    '%s stays below maxTextSize and maxEdges',
    (_nome, m) => {
      expect(m.caracteres).toBeLessThan(MERMAID_MAX_TEXT_SIZE);
      expect(m.arestas).toBeLessThan(MERMAID_MAX_EDGES);
    },
  );

  it('keeps at least 2x margin over the largest text and edge count with subtasks', () => {
    const com = medidas.filter((m) => m.subtarefas);
    expect(Math.max(...com.map((m) => m.caracteres)) * 2).toBeLessThanOrEqual(MERMAID_MAX_TEXT_SIZE);
    expect(Math.max(...com.map((m) => m.arestas)) * 2).toBeLessThanOrEqual(MERMAID_MAX_EDGES);
  });

  it('exposes positive integer limits', () => {
    expect(Number.isInteger(MERMAID_MAX_TEXT_SIZE) && MERMAID_MAX_TEXT_SIZE > 0).toBe(true);
    expect(Number.isInteger(MERMAID_MAX_EDGES) && MERMAID_MAX_EDGES > 0).toBe(true);
  });
});
