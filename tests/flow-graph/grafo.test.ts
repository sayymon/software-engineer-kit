// SPDX-License-Identifier: MIT
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { contexto } from '../../lib/flow-graph/contexto';
import { GrafoInvalidoError, gerarGrafo, gerarGrafos } from '../../lib/flow-graph';
import { guideDir, loadGuideDoc } from '../../lib/guide';
import { ModeloDeGrafo } from '../../lib/schema/grafo';

const root = new URL('../../', import.meta.url).pathname;
const doc = loadGuideDoc(guideDir(`${root}content`));

const mini = () => ({
  demandas: [{ id: 'd', nome: 'Demanda D' }],
  raias: [{ id: 'r', nome: 'Raia R', demanda: 'd', cor: '#aabbcc', orquestradora: true }],
  playbooks: [{ id: 'pb', resumo: 'x' }],
  decisoes: [
    { id: 't2', raia: 'r', tipo: 'tarefa', rotulo: 'Segunda', proximo: [{ para: 'e1' }], playbook: 'pb' },
    { id: 's1', raia: 'r', tipo: 'inicio', rotulo: 'Início', proximo: [{ para: 't2', condicao: 'sempre' }] },
    { id: 'e1', raia: 'r', tipo: 'fim', rotulo: 'Fim', retorno: 'ok', proximo: [] },
  ],
});

describe('gerarGrafo', () => {
  it('builds nodes and lanes in display order with explicit ordem', () => {
    const g = gerarGrafo(mini(), 'd');
    expect(g.versaoContrato).toBe(1);
    expect(g.demanda).toBe('d');
    expect(g.nomeDemanda).toBe('Demanda D');
    expect(g.raias).toEqual([{ id: 'r', nome: 'Raia R', cor: '#AABBCC', ordem: 0, orquestradora: true }]);
    expect(g.nos.map((n) => [n.id, n.ordem])).toEqual([['s1', 0], ['t2', 1], ['e1', 2]]);
    expect(g.nos.find((n) => n.id === 't2')?.temPlaybook).toBe(true);
    expect(g.nos.find((n) => n.id === 'e1')).toMatchObject({ retorno: 'ok', temPlaybook: false });
    expect(g.arestas).toEqual([
      { origem: 's1', destino: 't2', rotulo: 'sempre', tracejada: false },
      { origem: 't2', destino: 'e1', rotulo: '', tracejada: false },
    ]);
    expect(ModeloDeGrafo.safeParse(g).success).toBe(true);
  });

  it('describes subtasks with ordem, condicional and the readable condition', () => {
    const d = mini();
    (d.decisoes[0] as Record<string, unknown>).subtarefas = [
      { id: 'a', rotulo: 'A', responsavel: 'agente' },
      { id: 'b', rotulo: 'B', papel: 'dev', quando: { todos: [{ var: 'v', igual: true }] } },
    ];
    const subs = gerarGrafo(d, 'd').nos.find((n) => n.id === 't2')?.subtarefas ?? [];
    expect(subs[0]).toEqual({ id: 'a', rotulo: 'A', ordem: 0, condicional: false, responsavel: 'agente' });
    expect(subs[1]).toMatchObject({ id: 'b', ordem: 1, condicional: true, papel: 'dev' });
    expect(subs[1].quando).toMatch(/^quando /);
  });

  it('fails with the demand id and the field path when the result violates the schema', () => {
    const d = mini();
    (d.decisoes[0] as Record<string, unknown>).subtarefas = [{ id: 'a', rotulo: 'A', responsavel: 'robo' }];
    let erro: unknown;
    try {
      gerarGrafo(d, 'd');
    } catch (e) {
      erro = e;
    }
    expect(erro).toBeInstanceOf(GrafoInvalidoError);
    expect((erro as Error).message).toContain("'d'");
    expect((erro as Error).message).toContain('nos[1].subtarefas[0].responsavel');
  });

  it('fails on an unknown demand', () => {
    expect(() => gerarGrafo(mini(), 'zz')).toThrow(/zz/);
  });
});

describe('gerarGrafos', () => {
  it('covers every non-library demand with lanes, in guide order', () => {
    const grafos = gerarGrafos(doc);
    const esperadas = (doc.demandas as Array<Record<string, unknown>>)
      .filter((d) => d.biblioteca !== true && (doc.raias as Array<Record<string, unknown>>).some((r) => r.demanda === d.id))
      .map((d) => d.id);
    expect([...grafos.keys()]).toEqual(esperadas);
    expect(grafos.has('feature')).toBe(true);
  });
});

describe('grafo real da feature', () => {
  const g = gerarGrafo(doc, 'feature');
  const ctx = contexto(doc, 'feature');

  it('matches the Mermaid generator order (raias and nodes)', () => {
    expect(g.raias.map((r) => r.id)).toEqual(ctx.ordemRaias);
    expect(g.nos.map((n) => n.id)).toEqual(ctx.ordemNos);
    expect(g.raias.map((r) => r.ordem)).toEqual(g.raias.map((_, i) => i));
  });

  it('has the real counts', () => {
    // The spec text says 224 nodes and 25 lanes; the real guide yields 215 and 26 (lanes include library lanes).
    expect(g.nos).toHaveLength(215);
    expect(g.raias).toHaveLength(26);
  });

  it('keeps ordem contiguous within each lane', () => {
    for (const r of g.raias) {
      expect(g.nos.filter((n) => n.raia === r.id).map((n) => n.ordem)).toEqual(g.nos.filter((n) => n.raia === r.id).map((_, i) => i));
    }
  });

  it('only has edges between existing nodes', () => {
    const ids = new Set(g.nos.map((n) => n.id));
    for (const a of g.arestas) {
      expect(ids.has(a.origem) && ids.has(a.destino)).toBe(true);
    }
  });
});

describe('lib/flow-graph portability', () => {
  it('does not import fs or node:*', () => {
    const src = readFileSync(`${root}lib/flow-graph/index.ts`, 'utf8');
    expect(src).not.toMatch(/from ['"](node:|fs['"])/);
  });
});
