// SPDX-License-Identifier: MIT
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { gerarGrafo } from '@lib/flow-graph';
import type { ConjuntoExpandido } from '@lib/flow-graph/expansao';
import { gerarDiagramaDoGrafo, gerarDiagramaExpandido, type Item } from '@lib/flow-mermaid';

const FIX = join(__dirname, '../fixtures/mermaid');
const guide: Item = JSON.parse(readFileSync(join(FIX, 'guide.doc.json'), 'utf8'));
const grafo = gerarGrafo(guide, 'feature');
const conj = (raias: string[] = [], subtarefas: string[] = [], todasSubtarefas = false): ConjuntoExpandido => ({
  raias: new Set(raias),
  subtarefas: new Set(subtarefas),
  todasSubtarefas,
});
const todas = grafo.raias.map((r) => r.id);
const linhas = (t: string) => t.split('\n');

describe('gerarDiagramaExpandido', () => {
  it('Visão geral: one cluster per lane, no lane subgraph, aggregated edges and the overview legend', () => {
    const d = gerarDiagramaExpandido(grafo, conj());
    const l = linhas(d.texto);
    expect(l[0]).toBe('flowchart LR');
    for (const r of grafo.raias) {
      expect(d.texto).toContain(`z_CL_${r.id}["<b>${r.nome}</b><br/>`);
      expect(d.mapaIds[`z_CL_${r.id}`]).toBe(`cluster:${r.id}`);
      expect(d.texto).not.toContain(`subgraph z_SG_${r.id}[`);
      expect(d.texto).toMatch(new RegExp(`class [^\\n]*z_CL_${r.id}[^\\n]* z_R_\\d+`));
    }
    expect(d.texto).toMatch(/z_CL_\w+ -?-?\.?->\|"×\d+"\| z_CL_\w+/);
    expect(d.texto).toContain('subgraph z_LEG["Legenda"]');
    expect(d.texto).toContain('z_LEG_cl[');
    expect(d.texto).not.toContain('z_LEG_r0');
    expect(d.texto).toMatch(/\d+ tarefas?, \d+ gateways?, \d+ subtarefas?"\]/);
  });

  it('omits the legend when comLegenda is false', () => {
    expect(gerarDiagramaExpandido(grafo, conj(), false).texto).not.toContain('z_LEG');
  });

  it('partial set: expanded lane is a subgraph with the node lines of completo, the others are clusters', () => {
    const rid = grafo.raias.find((r) => r.orquestradora)!.id;
    const d = gerarDiagramaExpandido(grafo, conj([rid]));
    const completo = gerarDiagramaDoGrafo(grafo, 'completo').texto;
    expect(d.texto).toContain(`subgraph z_SG_${rid}[`);
    expect(d.texto).not.toContain(`z_CL_${rid}[`);
    const decl = (t: string) => {
      const l = linhas(t);
      const i = l.findIndex((x) => x.startsWith(`  subgraph z_SG_${rid}[`));
      return l.slice(i, l.indexOf('  end', i) + 1);
    };
    expect(decl(d.texto)).toEqual(decl(completo));
    for (const r of grafo.raias.filter((x) => x.id !== rid)) expect(d.texto).toContain(`z_CL_${r.id}[`);
    expect(d.mapaIds[`z_CL_${grafo.raias.find((r) => r.id !== rid)!.id}`]).toMatch(/^cluster:/);
  });

  it('every lane expanded equals completo, with and without subtasks', () => {
    expect(gerarDiagramaExpandido(grafo, conj(todas)).texto).toBe(gerarDiagramaDoGrafo(grafo, 'completo').texto);
    expect(gerarDiagramaExpandido(grafo, conj(todas, [], true), false)).toEqual(
      gerarDiagramaDoGrafo(grafo, 'completo', false, true),
    );
  });

  it('expansion order does not change the text', () => {
    const a = gerarDiagramaExpandido(grafo, conj([todas[2], todas[0]]));
    const b = gerarDiagramaExpandido(grafo, conj([todas[0], todas[2]]));
    expect(a).toEqual(b);
  });

  it('expands subtasks only in expanded lanes', () => {
    const rid = grafo.nos.find((n) => n.subtarefas.length > 0)!.raia;
    const d = gerarDiagramaExpandido(grafo, conj([rid], [], true));
    expect(d.texto).toContain('subgraph z_TS_');
    expect(d.texto).toContain('classDef z_S_');
    const dSem = gerarDiagramaExpandido(grafo, conj([rid]));
    expect(dSem.texto).not.toContain('z_TS_');
  });
});
