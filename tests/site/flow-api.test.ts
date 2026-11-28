// SPDX-License-Identifier: MIT
import { describe, expect, it } from 'vitest';
import { loadContent } from '../../lib/content';
import { SiteIndex } from '../../lib/content/site';
import { gerarGrafo } from '../../lib/flow-graph';
import { guideDir, loadGuideDoc } from '../../lib/guide';
import { rastrearDados } from '../../lib/guide/rastreio';
import { flowJson } from '../../site/src/render/api';
import type { Ctx } from '../../site/src/render/util';

const root = new URL('../../', import.meta.url).pathname;
const { entities } = loadContent(`${root}content`, 'pt-BR');
const index = new SiteIndex('pt-BR', entities);
const doc = loadGuideDoc(guideDir(`${root}content`));
const ctx = { locale: 'pt-BR', index, doc: () => doc, href: (r: string) => `/${r}/` } as unknown as Ctx;
const json = flowJson(ctx, index.byId.get('feature')!);

describe('api/flows/feature.json', () => {
  it('keeps the existing fields', () => {
    for (const k of ['id', 'tipo', 'locale', 'nome', 'sigla', 'biblioteca', 'raias', 'decisoes', 'playbooks', 'diagrams']) expect(json).toHaveProperty(k);
    expect(Object.keys(json.diagrams)).toEqual(['visao', 'completo']);
  });

  it('declares RACI letters per node exactly as the guide', () => {
    const g1 = json.nos.find((n) => n.id === 'feat_ent_g1')!;
    expect(g1.raci).toEqual({ R: ['arquiteto', 'pm'], A: [], C: ['tech_lead'], I: [] });
    expect(json.papeis.map((p) => p.id)).toEqual(expect.arrayContaining(['arquiteto', 'pm', 'tech_lead']));
    const t1 = json.nos.find((n) => n.id === 'feat_ent_t1')!;
    expect(t1.raci.R).toContain('pm');
    expect(t1.subtarefas[0].raci.R).toEqual(['pm']);
  });

  it('lists inputs and outputs as references and traces producers and consumers', () => {
    const t1 = json.nos.find((n) => n.id === 'feat_ent_t1')!;
    expect(t1.saidas[0]).toMatchObject({ id: 'registro_da_necessidade', tipo: 'artefato' });
    const rastro = rastrearDados(doc);
    for (const [id, d] of Object.entries(json.dados)) {
      expect(d.produzidoPor).toEqual(rastro[id].produzido_por);
      expect(d.consumidoPor).toEqual(rastro[id].consumido_por);
      expect(d.semProdutor).toBe(d.produzidoPor.length === 0 && !(doc.variaveis as Array<{ id: string; inicial?: unknown }>).some((v) => v.id === id && v.inicial !== undefined && v.inicial !== null && v.inicial !== ''));
    }
    expect(json.dados.registro_da_necessidade.produzidoPor).toContain('feat_ent_t1');
    expect(JSON.stringify(json.dados)).not.toContain('descricao');
  });

  it('names the ritos and the producers outside the demand, without copying entity text (additive)', () => {
    const ritos = json.ritos as Record<string, { nome: string; url: string | null; nos: string[] }>;
    const externos = json.externos as Record<string, { nome: string; url: string | null; tipo: string }>;
    const nosLocais = new Set(json.nos.flatMap((n) => [n.id, ...n.subtarefas.map((s) => s.id)]));
    expect(ritos.rito_refinamento).toMatchObject({ nome: expect.any(String), url: '/flows/ritos/rito_refinamento/' });
    expect(ritos.rito_refinamento!.nos).toContain('feat_lev_g1'); // `acontece_em`, only ids of this demand
    for (const r of Object.values(ritos)) for (const n of r.nos) expect(nosLocais.has(n), n).toBe(true);
    // Every producer or consumer is a local Nó, a Raia of the demand, a rito, or listed as external with its page.
    const raias = new Set(gerarGrafo(doc, 'feature').raias.map((r) => r.id)); // the lanes of the graph, shared lanes included
    for (const d of Object.values(json.dados))
      for (const id of [...d.produzidoPor, ...d.consumidoPor]) expect(nosLocais.has(id) || raias.has(id) || id in ritos || id in externos, id).toBe(true);
    expect(Object.keys(externos).some((id) => id.startsWith('bug_'))).toBe(true);
    for (const e of Object.values(externos)) expect(Object.keys(e).sort()).toEqual(['nome', 'tipo', 'url']);
    expect(JSON.stringify(json.ritos)).not.toContain('objetivo');
  });

  it('carries the names, techniques, key-question texts and the fallback flag the Modal_de_Playbook needs (additive)', () => {
    expect(json.fallback).toBe(false);
    expect(json.papeis.find((p) => p.id === 'pm')?.nome).toBeTruthy();
    const st3 = json.nos.find((n) => n.id === 'feat_ent_t1')!.subtarefas.find((s) => s.id === 'feat_ent_t1_st3')!;
    expect(st3.tecnicas.map((t) => t.id)).toEqual(['tec_design_docs', 'tec_caso_de_negocio']);
    expect(json.nos.find((n) => n.id === 'feat_ent_t1')!.tecnicas.map((t) => t.id)).toEqual(expect.arrayContaining(['tec_design_docs']));
    expect(json.nos.every((n) => Array.isArray(n.tecnicas))).toBe(true);
    expect(json.dados.registro_da_necessidade.nome).toBeTruthy();
    const pb = (json.playbooks as Array<{ id: string; perguntas_chave?: string[] }>).find((p) => p.id === 'pb_feat_ent_t1')!;
    for (const q of pb.perguntas_chave ?? []) expect(json.perguntas[q]?.texto, q).toBeTruthy();
  });
});
