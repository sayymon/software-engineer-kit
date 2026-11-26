// SPDX-License-Identifier: MIT
// Task 2.3 (Requirements 10.4, 10.16, 18.3, 18.6): planted defects for the tool/guide link rules.
// CATEGORIA_FERRAMENTA_DUPLICADA and GUIA_PRATICO_DUPLICADO (aviso, run with `avisos`) and the completeness rule
// SEM_FERRAMENTA_OU_GUIA (aviso, run with `avisos` + `completude`, only for demands in DEMANDAS_COM_LIGACAO_OBRIGATORIA).
import { describe, expect, it } from 'vitest';
import { checarLigacaoObrigatoria, DEMANDAS_COM_LIGACAO_OBRIGATORIA } from '../../../lib/guide/validate/ferramentas';
import type { Problema } from '../../../lib/guide/validate';
import { realDoc, schema, type D } from '../support/expected';
import { validateGuide } from '../../../lib/guide/validate';

const CODES = ['CATEGORIA_FERRAMENTA_DUPLICADA', 'GUIA_PRATICO_DUPLICADO', 'SEM_FERRAMENTA_OU_GUIA'];
const mine = (l: Problema[]) => l.filter((p) => CODES.includes(p.code));
const run = (doc: D, opcoes: { avisos?: boolean; completude?: boolean }) => mine(validateGuide(doc, schema, opcoes));

/** The first task with a subtask and its index. */
function tarefaComSub(doc: D) {
  const i = doc.decisoes.findIndex((d: D) => d.tipo === 'tarefa' && d.subtarefas?.length);
  if (i < 0) throw new Error('no task with subtasks in the real guide');
  return { i, tarefa: doc.decisoes[i] as D, sub: doc.decisoes[i].subtarefas[0] as D };
}
const demandaDa = (doc: D, d: D): string => doc.raias.find((r: D) => r.id === d.raia).demanda;
/** Completeness findings with `demandas` as the obligatory list, run through the exported rule. */
function completude(doc: D, demandas: readonly string[]): Problema[] {
  const out: Problema[] = [];
  checarLigacaoObrigatoria(doc, (code, path, message, itemId) => out.push({ code, nivel: 'aviso', path, itemId, message }), demandas);
  return out;
}

describe('DEMANDAS_COM_LIGACAO_OBRIGATORIA', () => {
  it('lists only feature', () => {
    expect(DEMANDAS_COM_LIGACAO_OBRIGATORIA).toEqual(['feature']);
  });

  it('the real feature tasks pass the completeness rule, with the default list', () => {
    const doc = realDoc();
    const out: Problema[] = [];
    checarLigacaoObrigatoria(doc, (code, path, message, itemId) => out.push({ code, nivel: 'aviso', path, itemId, message }));
    expect(out).toEqual([]);
    expect(doc.decisoes.some((d: D) => d.tipo === 'tarefa' && demandaDa(doc, d) === 'feature')).toBe(true);
  });

  it('a feature task without link is flagged by validateGuide (avisos + completude)', () => {
    const doc = realDoc();
    const i = doc.decisoes.findIndex((d: D) => d.tipo === 'tarefa' && demandaDa(doc, d) === 'feature');
    for (const c of ['categorias_ferramenta', 'guias_praticos', 'sem_ferramenta']) delete doc.decisoes[i][c];
    const achados = run(doc, { avisos: true, completude: true });
    expect(achados.map((p) => [p.code, p.itemId])).toEqual([['SEM_FERRAMENTA_OU_GUIA', doc.decisoes[i].id]]);
    expect(run(doc, { avisos: true })).toEqual([]);
  });
});

describe('duplicate warnings', () => {
  it('real document: stays warning-free', () => {
    expect(run(realDoc(), { avisos: true, completude: true })).toEqual([]);
  });

  it.each([
    ['tarefa', 'categorias_ferramenta', 'CATEGORIA_FERRAMENTA_DUPLICADA', 'cat_a'],
    ['tarefa', 'guias_praticos', 'GUIA_PRATICO_DUPLICADO', 'guia_a'],
    ['subtarefa', 'categorias_ferramenta', 'CATEGORIA_FERRAMENTA_DUPLICADA', 'cat_a'],
    ['subtarefa', 'guias_praticos', 'GUIA_PRATICO_DUPLICADO', 'guia_a'],
  ])('em %s: %s repetido gera %s no segundo uso', (alvo, campo, code, id) => {
    const doc = realDoc();
    const { i, tarefa, sub } = tarefaComSub(doc);
    const dono = alvo === 'tarefa' ? tarefa : sub;
    dono[campo] = [id, 'outro_id', id];
    const caminho = alvo === 'tarefa' ? `decisoes[${i}].${campo}[2]` : `decisoes[${i}].subtarefas[0].${campo}[2]`;
    const achados = run(doc, { avisos: true });
    expect(achados).toHaveLength(1);
    expect(achados[0]).toMatchObject({ code, nivel: 'aviso', path: caminho, itemId: dono.id });
    expect(achados[0].message).toContain(id);
    expect(achados[0].message).toContain(dono.id);
    // needs the avisos flag
    expect(run(doc, {})).toEqual([]);
  });

  it('does not warn when ids differ, or when the same id sits in different tasks', () => {
    const doc = realDoc();
    const { tarefa, sub } = tarefaComSub(doc);
    tarefa.categorias_ferramenta = ['cat_a', 'cat_b'];
    sub.categorias_ferramenta = ['cat_a'];
    expect(run(doc, { avisos: true })).toEqual([]);
  });
});

describe('SEM_FERRAMENTA_OU_GUIA (completeness)', () => {
  it('flags every task of a listed demand that has no category, guide or marker', () => {
    const doc = realDoc();
    const { tarefa } = tarefaComSub(doc);
    const dem = demandaDa(doc, tarefa);
    const achados = completude(doc, [dem]).filter((p) => p.code === 'SEM_FERRAMENTA_OU_GUIA');
    const tarefas = doc.decisoes.map((d: D, i: number) => [d, i]).filter(([d]: [D, number]) => d.tipo === 'tarefa' && demandaDa(doc, d) === dem);
    expect(achados.map((p) => [p.path, p.itemId])).toEqual(tarefas.map(([d, i]: [D, number]) => [`decisoes[${i}]`, d.id]));
    expect(achados.length).toBeGreaterThan(0);
  });

  it('is satisfied by a category, a guide or the sem_ferramenta marker', () => {
    const doc = realDoc();
    const { i, tarefa } = tarefaComSub(doc);
    const dem = demandaDa(doc, tarefa);
    const antes = completude(doc, [dem]).filter((p) => p.itemId === tarefa.id);
    expect(antes).toHaveLength(1);
    for (const ajuste of [{ categorias_ferramenta: ['cat_a'] }, { guias_praticos: ['guia_a'] }, { sem_ferramenta: true }]) {
      const copia = structuredClone(doc);
      Object.assign(copia.decisoes[i], ajuste);
      expect(completude(copia, [dem]).filter((p) => p.itemId === tarefa.id)).toEqual([]);
    }
  });

  it('an empty list or sem_ferramenta: false does not satisfy it', () => {
    const doc = realDoc();
    const { i, tarefa } = tarefaComSub(doc);
    const dem = demandaDa(doc, tarefa);
    Object.assign(doc.decisoes[i], { categorias_ferramenta: [], guias_praticos: [], sem_ferramenta: false });
    expect(completude(doc, [dem]).filter((p) => p.itemId === tarefa.id)).toHaveLength(1);
  });

  it('ignores gateways and demands outside the list', () => {
    const doc = realDoc();
    expect(completude(doc, [])).toEqual([]);
    expect(completude(doc, ['demanda_inexistente'])).toEqual([]);
    const dem = demandaDa(doc, tarefaComSub(doc).tarefa);
    const ids = new Set(completude(doc, [dem]).map((p) => p.itemId));
    for (const d of doc.decisoes) if (d.tipo !== 'tarefa') expect(ids.has(d.id)).toBe(false);
  });

  it('validateGuide stays silent on the real document, with every flag on', () => {
    expect(run(realDoc(), { avisos: true, completude: true })).toEqual([]);
  });
});
