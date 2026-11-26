// SPDX-License-Identifier: MIT
// Cases for the whole-document validator test: the four flag combinations on the real guide and planted structural
// defects of the older rules (rules.ts). Used by the regression test.
// SCHEMA messages differ between the oracle (jsonschema) and Ajv, so the planted cases stay schema-valid on purpose.
import type { Flags } from '../support/expected';
// compared by the key only (see oracle-defects tests) and the cases below stay schema-valid on purpose.
type D = any; // eslint-disable-line @typescript-eslint/no-explicit-any
export const plantedCases: Array<[string, (d: D) => void]> = [
  ['ID_DUPLICADO in a collection', (d) => { d.tecnicas.push({ ...d.tecnicas[0] }); }],
  ['ID_DUPLICADO of a subtask against a node', (d) => { const n = d.decisoes.find((x: D) => x.subtarefas?.length); n.subtarefas[0].id = d.decisoes[0].id; }],
  ['TRANSICAO_INVALIDA', (d) => { d.decisoes[0].proximo[0].para = 'no_inexistente'; }],
  ['BIFURCACAO_SAIDAS', (d) => { const g = d.decisoes.find((x: D) => x.tipo === 'bifurcacao'); g.proximo = g.proximo.slice(0, 1); }],
  ['RAIA_SEM_INICIO and ORFA', (d) => { const i = d.decisoes.findIndex((x: D) => x.tipo === 'inicio'); d.decisoes[i].tipo = 'tarefa'; }],
  ['RAIA_SEM_FIM: repeated return', (d) => {
    const lane = d.raias.find((r: D) => d.decisoes.filter((x: D) => x.raia === r.id && x.tipo === 'fim').length >= 2).id;
    const fins = d.decisoes.filter((x: D) => x.raia === lane && x.tipo === 'fim');
    fins[1].retorno = fins[0].retorno;
  }],
  ['RETORNOS_INCOMPATIVEIS: missing, extra and repeated', (d) => {
    const c = d.decisoes.find((x: D) => x.tipo === 'chamada' && x.proximo.length >= 2);
    c.proximo[0].condicao = 'zzz_outro';
    c.proximo[1].condicao = c.proximo[c.proximo.length - 1].condicao;
  }],
  ['CHAMADA_INVALIDA to the own lane', (d) => { const c = d.decisoes.find((x: D) => x.tipo === 'chamada'); c.raia_chamada = c.raia; }],
  ['ORQUESTRADORA twice', (d) => { const dem = d.raias.find((r: D) => r.orquestradora).demanda; for (const r of d.raias) if (r.demanda === dem) r.orquestradora = true; }],
  ['ORQUESTRADORA none', (d) => { const dem = d.raias.find((r: D) => r.orquestradora).demanda; for (const r of d.raias) if (r.demanda === dem) delete r.orquestradora; }],
  ['ID_PADRAO of a node and a lane', (d) => { d.decisoes[1].id = `${d.decisoes[1].id}_x`; d.raias[0].id = `zz_${d.raias[0].id}`; }],
  ['PESOS', (d) => { const p = d.decisor_construir_comprar_assinar.pesos; const g = Object.keys(p)[0]; const k = Object.keys(p[g])[0]; p[g][k] += 0.25; }],
  ['REF_QUEBRADA in a playbook and a cell', (d) => { d.playbooks[0].tecnicas = ['tec_que_nao_existe']; d.celulas[0].requisito = 'req_que_nao_existe'; }],
];

export const realCombos: Array<[label: string, flags: Flags]> = [
  ['avisos off, completude off', {}],
  ['avisos on', { avisos: true }],
  ['completude on', { completude: true }],
  ['avisos on, completude on', { avisos: true, completude: true }],
];
