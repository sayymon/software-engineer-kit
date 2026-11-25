// SPDX-License-Identifier: MIT
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { checkDoc, validateAgainstSchema, type Doc } from '../../lib/flows';
import { guideDir, loadGuideDoc } from '../../lib/guide';
const root = new URL('../../', import.meta.url).pathname;
const schema = JSON.parse(readFileSync(`${root}schema/flows.schema.json`, 'utf8')) as object;
const doc = () => structuredClone(loadGuideDoc(guideDir(`${root}content`))) as Doc;
describe('guide flows', () => {
  it('has the common library plus the 12 demands, in the declared order', () => {
    const d = doc();
    expect(d.demandas.map((x: Doc) => x.id)).toEqual(['comum', 'feature', 'bug', 'incidente', 'chore', 'seguranca', 'spike', 'divida_tecnica', 'infraestrutura', 'teste_qa', 'documentacao', 'migracao', 'descontinuacao']);
  });
  it('validates against the vendored JSON Schema and the cross-reference rules', () => {
    const d = doc();
    expect(validateAgainstSchema(d, schema)).toEqual([]);
    expect(checkDoc(d)).toEqual([]);
    expect(d.raias.length).toBe(71);
    expect(d.decisoes.length).toBe(544);
  });
  it('carries the guide catalog: 127 techniques and 4 requirements, plus rituals and questions', () => {
    const d = doc();
    expect(d.tecnicas.length).toBe(127);
    expect(d.tecnicas.map((t: Doc) => t.id)).toContain('tec_circuit_breaker');
    expect(d.requisitos.length).toBe(4);
    expect(d.ritos.length).toBe(16);
    expect(d.perguntas.length).toBe(451);
  });
  it('detects a transition to a missing node', () => {
    const d = doc();
    d.decisoes[0].proximo[0] = { para: 'no_inexistente', condicao: '' };
    expect(checkDoc(d).map((i) => i.code)).toContain('TRANSICAO_INVALIDA');
  });
  it('detects a call whose exits do not match the returns of the called lane', () => {
    const d = doc();
    const call = d.decisoes.find((n: Doc) => n.tipo === 'chamada');
    call.proximo = call.proximo.slice(1);
    expect(checkDoc(d).map((i) => i.code)).toContain('RETORNOS_INCOMPATIVEIS');
  });
  it('detects a second orchestrator, a call cycle and a broken reference', () => {
    const d = doc();
    const feature = d.raias.filter((r: Doc) => r.demanda === 'feature' && !r.orquestradora)[0];
    feature.orquestradora = true;
    expect(checkDoc(d).map((i) => i.code)).toContain('ORQUESTRADORA');
    const e = doc();
    e.playbooks[0].tecnicas = ['tec_que_nao_existe'];
    expect(checkDoc(e).map((i) => i.code)).toContain('REF_QUEBRADA');
    const f = doc();
    const orq = f.raias.find((r: Doc) => r.demanda === 'bug' && r.orquestradora);
    const other = f.decisoes.find((n: Doc) => n.tipo === 'chamada' && n.raia === orq.id);
    const target = f.raias.find((r: Doc) => r.id === other.raia_chamada);
    const back = f.decisoes.find((n: Doc) => n.raia === target.id && n.tipo === 'tarefa');
    back.tipo = 'chamada';
    back.raia_chamada = orq.id;
    expect(checkDoc(f).map((i) => i.code)).toContain('CHAMADA_CICLO');
  });
  it('the schema rejects a source with an extra key', () => {
    const d = doc();
    d.tecnicas[0].chave_inventada = 1;
    d.requisitos[0].nome = 7;
    expect(validateAgainstSchema(d, schema).length).toBeGreaterThan(0);
  });
});
