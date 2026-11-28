// SPDX-License-Identifier: MIT
// Alternador "Raias" (Requirement 4.6): the `completo` text without the lane groupings keeps every node and edge, and the default
// (grouped) text stays the golden one.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { gerarGrafo } from '../../lib/flow-graph';
import type { ConjuntoExpandido } from '../../lib/flow-graph/expansao';
import { gerarDiagramaDoGrafo, gerarDiagramaExpandido, idSubgraph, type Item } from '../../lib/flow-mermaid';

const FIX = join(__dirname, '../fixtures/mermaid');
const guide: Item = JSON.parse(readFileSync(join(FIX, 'guide.doc.json'), 'utf8'));
const DEMANDS: string[] = guide.demandas.filter((d: Item) => d.biblioteca !== true).map((d: Item) => String(d.id));

describe('completo sem agrupamento por raias', () => {
  it.each(DEMANDS)('%s: no lane subgraph, same nodes and same edges', (demanda) => {
    const g = gerarGrafo(guide, demanda);
    const conj: ConjuntoExpandido = { raias: new Set(g.raias.map((r) => r.id)), subtarefas: new Set(), todasSubtarefas: false };
    const com = gerarDiagramaExpandido(g, conj, true);
    const sem = gerarDiagramaExpandido(g, conj, true, false);
    for (const r of g.raias) {
      expect(com.texto).toContain(`subgraph ${idSubgraph(r.id)}[`);
      expect(sem.texto).not.toContain(idSubgraph(r.id));
    }
    expect(sem.mapaIds).toEqual(com.mapaIds);
    const arestas = (t: string) => t.split('\n').filter((l) => /--?>|-\.->/.test(l));
    expect(arestas(sem.texto)).toEqual(arestas(com.texto));
    const abre = sem.texto.split('\n').filter((l) => /^\s*subgraph /.test(l)).length;
    const fecha = sem.texto.split('\n').filter((l) => /^\s*end$/.test(l)).length;
    expect(abre).toBe(fecha);
  });

  it('the default argument keeps the golden text, also through gerarDiagramaDoGrafo', () => {
    const g = gerarGrafo(guide, 'feature');
    expect(gerarDiagramaDoGrafo(g, 'completo', true, false, true).texto).toBe(readFileSync(join(FIX, 'golden', 'feature.completo.mmd'), 'utf8'));
  });

  it('keeps the task groups of the subtasks when there are no lane groupings', () => {
    const g = gerarGrafo(guide, 'feature');
    const conj: ConjuntoExpandido = { raias: new Set(g.raias.map((r) => r.id)), subtarefas: new Set(), todasSubtarefas: true };
    const sem = gerarDiagramaExpandido(g, conj, true, false).texto;
    expect(sem).toContain('subgraph z_TS_');
    expect(sem).not.toContain('z_SG_');
  });
});
