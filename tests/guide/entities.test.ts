// SPDX-License-Identifier: MIT
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { loadContent } from '../../lib/content';
import { SiteIndex } from '../../lib/content/site';
import { ANCHOR_TIPOS, guideDir, loadGuideDoc } from '../../lib/guide';
import { TIPOS, validateEntity } from '../../lib/schema';
const root = new URL('../../', import.meta.url).pathname;
const { entities, problems } = loadContent(`${root}content`, 'pt-BR');
const derived = entities.filter((e) => e.derived);
const count = (tipo: string) => derived.filter((e) => e.tipo === tipo).length;
describe('entities derived from the guide YAML', () => {
  it('loads without problems', () => {
    expect(problems).toEqual([]);
  });
  it('has one entity per guide item, with the counts of the guide at 7abed1c', () => {
    // `celula` is 48 (12 demands times 4 requirements). `tecnica` is 127 minus the 3 guide techniques merged into kit notes.
    const expected = { demanda: 13, raia: 71, tarefa: 151, decisao: 70, no: 323, subtarefa: 293, playbook: 544, pergunta: 451, celula: 48, artefato: 201, variavel: 83, papel: 16, rito: 16, tecnica: 124, requisito: 4, 'tipo-de-artefato': 21, 'categoria-ferramenta': 12 };
    for (const [tipo, n] of Object.entries(expected)) expect(count(tipo), tipo).toBe(n);
    for (const tipo of ['abordagem', 'estrategia', 'fonte-guia', 'padrao-guia']) expect(count(tipo), tipo).toBe(0);
  });
  it('agrees with the merged guide document', () => {
    const doc = loadGuideDoc(guideDir(`${root}content`));
    expect(doc.decisoes).toHaveLength(count('tarefa') + count('decisao') + count('no'));
    expect(doc.tecnicas).toHaveLength(count('tecnica') + 3);
    expect(doc.perguntas).toHaveLength(count('pergunta'));
    expect(doc.playbooks).toHaveLength(count('playbook'));
    expect(doc.decisoes.flatMap((d: { subtarefas?: unknown[] }) => d.subtarefas ?? [])).toHaveLength(count('subtarefa'));
  });
  it('keeps seguranca for the demand and renames the role to seguranca_papel', () => {
    expect(entities.find((e) => e.id === 'seguranca')?.tipo).toBe('demanda');
    expect(entities.find((e) => e.id === 'seguranca_papel')?.tipo).toBe('papel');
  });
  it('places techniques under fundamentals and demands under flows', () => {
    for (const e of derived.filter((x) => x.tipo === 'tecnica')) expect(e.relPath).toBe(`fundamentals/techniques/${e.id}.yaml`);
    expect(entities.find((e) => e.id === 'feature')?.relPath).toBe('flows/feature.yaml');
  });
  it('validates every derived entity against its schema', () => {
    for (const e of derived) {
      const r = validateEntity(e.data);
      expect(r.ok, `${e.id}: ${JSON.stringify(r)}`).toBe(true);
    }
    for (const tipo of [...new Set(derived.map((e) => e.tipo))]) expect(TIPOS).toContain(tipo);
  });
  it('anchors point to a page entity', () => {
    const byId = new Map(entities.map((e) => [e.id, e]));
    for (const e of derived.filter((x) => (ANCHOR_TIPOS as readonly string[]).includes(x.tipo))) {
      const host = byId.get(String(e.data.pagina).slice(2, -2));
      expect(host, e.id).toBeDefined();
      expect((ANCHOR_TIPOS as readonly string[]).includes(host?.tipo ?? '')).toBe(false);
    }
  });
  it('resolves every guide id in the site index, including the merged technique aliases', () => {
    const index = new SiteIndex('pt-BR', entities);
    const doc = loadGuideDoc(guideDir(`${root}content`));
    const lists = ['demandas', 'raias', 'decisoes', 'playbooks', 'perguntas', 'artefatos', 'variaveis', 'papeis', 'ritos', 'tecnicas', 'requisitos'] as const;
    for (const list of lists) for (const item of doc[list] as Array<{ id: string }>) expect(index.resolve(item.id), `${list}:${item.id}`).toBeDefined();
    for (const d of doc.decisoes as Array<{ subtarefas?: Array<{ id: string }> }>) for (const s of d.subtarefas ?? []) expect(index.resolve(s.id), s.id).toBeDefined();
    expect(index.resolve('tec_circuit_breaker')?.id).toBe('circuit_breaker');
  });
  it('links entities in both directions through relacoes', () => {
    const index = new SiteIndex('pt-BR', entities);
    const sources = index.inbound('seguranca_papel').map((i) => i.page.id);
    expect(sources.length).toBeGreaterThan(0);
    const papel = entities.find((e) => e.id === 'seguranca_papel');
    expect(papel).toBeDefined();
  });
  it('keeps the ids of the committed lock and locks every derived id', () => {
    const lock = JSON.parse(readFileSync(`${root}content/ids.lock.json`, 'utf8')) as { entities: string[] };
    const ids = new Set(entities.map((e) => e.id));
    for (const id of lock.entities) expect(ids.has(id), id).toBe(true);
    const locked = new Set(lock.entities);
    for (const e of derived) expect(locked.has(e.id), e.id).toBe(true);
  });
});
