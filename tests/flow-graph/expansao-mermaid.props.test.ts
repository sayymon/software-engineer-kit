// SPDX-License-Identifier: MIT
// Property tests of the Texto_Mermaid of the expanded set (Requirements 20.6, 19.8, 17.5) and the golden of the overview.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { gerarGrafo } from '../../lib/flow-graph';
import type { ConjuntoExpandido } from '../../lib/flow-graph/expansao';
import { gerarDiagramaDoGrafo, gerarDiagramaExpandido, type Item } from '../../lib/flow-mermaid';
import type { ModeloDeGrafo } from '../../lib/schema/grafo';
import { casosAleatorios, casosReais } from './geradores';

const NUM_RUNS = 100;
const FIX = join(__dirname, '../fixtures/mermaid');
const guide: Item = JSON.parse(readFileSync(join(FIX, 'guide.doc.json'), 'utf8'));
const DEMANDS: string[] = guide.demandas.filter((d: Item) => d.biblioteca !== true).map((d: Item) => String(d.id));
const golden = (nome: string) => readFileSync(join(FIX, 'golden', nome), 'utf8');

const tudo = (g: ModeloDeGrafo, todasSubtarefas: boolean): ConjuntoExpandido => ({
  raias: new Set(g.raias.map((r) => r.id)),
  subtarefas: new Set(),
  todasSubtarefas,
});

describe('golden da Visão geral', () => {
  it('feature.geral.mmd equals the text generated for the empty expanded set, with legend', () => {
    const g = gerarGrafo(guide, 'feature');
    const vazio: ConjuntoExpandido = { raias: new Set(), subtarefas: new Set(), todasSubtarefas: false };
    expect(gerarDiagramaExpandido(g, vazio, true).texto).toBe(golden('feature.geral.mmd'));
  });
});

// Feature: experiencia-fluxos-catalogo, Property 12: Expandir tudo equivale ao completo dos goldens
describe('Property 12: expandir tudo equivale ao completo', () => {
  // Validates: Requirements 20.6, 19.8
  it.each(DEMANDS)('%s: every lane expanded equals the completo goldens, with and without subtasks', (demanda) => {
    const g = gerarGrafo(guide, demanda);
    expect(gerarDiagramaExpandido(g, tudo(g, false), true).texto).toBe(golden(`${demanda}.completo.mmd`));
    expect(gerarDiagramaExpandido(g, tudo(g, true), true).texto).toBe(golden(`${demanda}.completo.subtarefas.mmd`));
  });

  it('random and real guides: all lanes expanded equals gerarDiagramaDoGrafo(completo)', () => {
    fc.assert(
      fc.property(fc.oneof(casosAleatorios(), casosReais()), fc.boolean(), fc.boolean(), ({ doc, demanda }, sub, leg) => {
        const g = gerarGrafo(doc, demanda);
        expect(gerarDiagramaExpandido(g, tudo(g, sub), leg)).toEqual(gerarDiagramaDoGrafo(g, 'completo', leg, sub));
      }),
      { numRuns: NUM_RUNS },
    );
  });
});

type Op = { acao: 'expandir' | 'recolher'; alvo: 'raia' | 'tarefa'; i: number };

// Feature: experiencia-fluxos-catalogo, Property 14: O Texto_Mermaid do conjunto não depende do caminho de expansão
describe('Property 14: o texto não depende do caminho de expansão', () => {
  // Validates: Requirements 17.5, 20.6
  it('any expand/collapse sequence ending in the same set yields the same text', () => {
    fc.assert(
      fc.property(
        fc.oneof(casosAleatorios(), casosReais()).chain((c) =>
          fc.tuple(
            fc.constant(c),
            fc.array(
              fc.record({
                acao: fc.constantFrom<'expandir' | 'recolher'>('expandir', 'recolher'),
                alvo: fc.constantFrom<'raia' | 'tarefa'>('raia', 'tarefa'),
                i: fc.nat(1000),
              }),
              { maxLength: 30 },
            ),
            fc.boolean(),
          ),
        ),
        ([{ doc, demanda }, ops, comLegenda]) => {
          const g = gerarGrafo(doc, demanda);
          const raias = g.raias.map((r) => r.id);
          const tarefas = g.nos.filter((n) => n.tipo === 'tarefa').map((n) => n.id);
          const alvos = { raia: raias, tarefa: tarefas };
          // ConjuntoExpandido exposes ReadonlySet, so the walk keeps its own mutable copies.
          type Mutavel = { raias: Set<string>; subtarefas: Set<string> };
          const aplicar = (c: Mutavel, o: Op) => {
            const lista = alvos[o.alvo];
            if (!lista.length) return;
            const id = lista[o.i % lista.length];
            const s = o.alvo === 'raia' ? c.raias : c.subtarefas;
            if (o.acao === 'expandir') s.add(id);
            else s.delete(id);
          };
          const m: Mutavel = { raias: new Set(), subtarefas: new Set() };
          for (const o of ops) aplicar(m, o);
          const a: ConjuntoExpandido = { raias: m.raias, subtarefas: m.subtarefas, todasSubtarefas: false };

          // Same final set reached by a detour: expand everything, then collapse what is not in the target.
          const bRaias = new Set(raias);
          const bSubtarefas = new Set(tarefas);
          for (const r of raias) if (!a.raias.has(r)) bRaias.delete(r);
          for (const t of tarefas) if (!a.subtarefas.has(t)) bSubtarefas.delete(t);
          const b: ConjuntoExpandido = { raias: bRaias, subtarefas: bSubtarefas, todasSubtarefas: false };

          // Same final set built directly, in reverse insertion order.
          const c: ConjuntoExpandido = {
            raias: new Set([...a.raias].reverse()),
            subtarefas: new Set([...a.subtarefas].reverse()),
            todasSubtarefas: false,
          };
          const ta = gerarDiagramaExpandido(g, a, comLegenda);
          expect(gerarDiagramaExpandido(g, b, comLegenda)).toEqual(ta);
          expect(gerarDiagramaExpandido(g, c, comLegenda)).toEqual(ta);
        },
      ),
      { numRuns: NUM_RUNS },
    );
  });
});
