// SPDX-License-Identifier: MIT
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { gerarGrafo } from '../../lib/flow-graph';
import { gerarDiagrama, gerarDiagramaDoGrafo, nomeArquivo, visoesDaDemanda, type Item } from '../../lib/flow-mermaid';
import { gerarDiagrama as gerarDiagramaAntigo, visoesDaDemanda as visoesAntigas } from './oraculo-antigo';
import { casos, casosAleatorios } from './geradores';

const NUM_RUNS = 100;
const FIX = join(__dirname, '../fixtures/mermaid');
const read = (rel: string) => readFileSync(join(FIX, rel), 'utf8');

const opcoes = fc.record({ comLegenda: fc.boolean(), subtarefas: fc.boolean() });

// Feature: experiencia-fluxos-catalogo, Property 4: O Texto_Mermaid é função pura do Modelo_de_Grafo
describe('Property 4: o Texto_Mermaid é função pura do Modelo_de_Grafo', () => {
  // Validates: Requirements 19.8
  it('same graph and options give the same text, also for a deep copy and a JSON round trip, with no reference to the document', () => {
    fc.assert(
      fc.property(casos(), opcoes, ({ doc, demanda }, { comLegenda, subtarefas }) => {
        const grafo = gerarGrafo(doc, demanda);
        const copia = structuredClone(grafo);
        const json = JSON.parse(JSON.stringify(grafo));
        const antes = JSON.stringify(grafo);
        for (const visao of visoesDaDemanda(doc, demanda)) {
          const base = gerarDiagramaDoGrafo(grafo, visao, comLegenda, subtarefas);
          expect(gerarDiagramaDoGrafo(grafo, visao, comLegenda, subtarefas)).toEqual(base);
          expect(gerarDiagramaDoGrafo(copia, visao, comLegenda, subtarefas)).toEqual(base);
          expect(gerarDiagramaDoGrafo(json, visao, comLegenda, subtarefas)).toEqual(base);
        }
        // pure: the graph is not mutated by generation
        expect(JSON.stringify(grafo)).toBe(antes);
      }),
      { numRuns: NUM_RUNS },
    );
  });

  it('does not depend on the original document: mutating or discarding it changes nothing', () => {
    fc.assert(
      fc.property(casosAleatorios(), opcoes, ({ doc, demanda }, { comLegenda, subtarefas }) => {
        const grafo = gerarGrafo(doc, demanda);
        const visoes = visoesDaDemanda(doc, demanda);
        const antes = visoes.map((v) => gerarDiagramaDoGrafo(grafo, v, comLegenda, subtarefas));
        for (const k of Object.keys(doc)) delete (doc as Item)[k];
        const depois = visoes.map((v) => gerarDiagramaDoGrafo(grafo, v, comLegenda, subtarefas));
        expect(depois).toEqual(antes);
      }),
      { numRuns: NUM_RUNS },
    );
  });
});

// Feature: experiencia-fluxos-catalogo, Property 5: Paridade byte a byte entre o gerador antigo e o novo caminho
describe('Property 5: paridade byte a byte entre o gerador antigo e o novo caminho', () => {
  // Validates: Requirements 19.9
  const guide: Item = JSON.parse(read('guide.doc.json'));
  const demandas: string[] = guide.demandas.filter((d: Item) => d.biblioteca !== true).map((d: Item) => String(d.id));

  it('the 12 real demands: every view, with and without subtasks, equals the golden', () => {
    expect(demandas).toHaveLength(12);
    for (const demanda of demandas) {
      const grafo = gerarGrafo(guide, demanda);
      for (const visao of visoesDaDemanda(guide, demanda)) {
        expect(gerarDiagramaDoGrafo(grafo, visao, true, false).texto).toBe(read(`golden/${nomeArquivo(demanda, visao)}`));
        if (visao === 'visao' || visao === 'completo') {
          const golden = read(`golden/${nomeArquivo(demanda, visao).replace('.mmd', '.subtarefas.mmd')}`);
          expect(gerarDiagramaDoGrafo(grafo, visao, true, true).texto).toBe(golden);
        }
      }
    }
  });

  it('random guides: the graph path equals the frozen old YAML generator (text and id map), all views and options', () => {
    fc.assert(
      fc.property(casosAleatorios(), opcoes, ({ doc, demanda }, { comLegenda, subtarefas }) => {
        const visoes = visoesDaDemanda(doc, demanda);
        expect(visoes).toEqual(visoesAntigas(doc, demanda));
        const grafo = gerarGrafo(doc, demanda);
        for (const visao of visoes) {
          const antigo = gerarDiagramaAntigo(doc, demanda, visao, comLegenda, subtarefas);
          expect(gerarDiagramaDoGrafo(grafo, visao, comLegenda, subtarefas)).toEqual(antigo);
          expect(gerarDiagrama(doc, demanda, visao, comLegenda, subtarefas)).toEqual(antigo);
        }
      }),
      { numRuns: NUM_RUNS },
    );
  });
});
