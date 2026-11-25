// SPDX-License-Identifier: MIT
// Differential test of the TypeScript guide validator against the Python oracle (tools/guide-oracle).
// Issues are compared by the key (code, nivel, path, itemId, message); differences are reported on both sides.
// Runs only when GUIDE_ORACLE_PYTHON points at a Python with the oracle requirements.
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { guideDir, loadGuideDoc } from '../../lib/guide';
import { validateGuide } from '../../lib/guide/validate';

const python = process.env.GUIDE_ORACLE_PYTHON;
const root = new URL('../../', import.meta.url).pathname;
const oracle = join(root, 'tools/guide-oracle/dump_doc.py');
const dir = guideDir(`${root}content`);

type Key = { code: string; nivel: string; path: string; itemId: string | null; message: string };
const keyOf = (i: Key) => JSON.stringify([i.code, i.nivel, i.path, i.itemId ?? null, i.message]);

function oracleIssues(doc: unknown, flags: string[]): Key[] {
  const out = execFileSync(python as string, [oracle, '--issues', ...flags], {
    input: JSON.stringify(doc),
    encoding: 'utf8',
    maxBuffer: 256 * 1024 * 1024,
  });
  return (JSON.parse(out) as Array<{ code: string; nivel: string; path: string; item_id: string | null; message: string }>).map((i) => ({
    code: i.code,
    nivel: i.nivel,
    path: i.path,
    itemId: i.item_id ?? null,
    message: i.message,
  }));
}

function diff(ts: Key[], py: Key[]) {
  const count = (list: Key[]) => {
    const m = new Map<string, number>();
    for (const i of list) m.set(keyOf(i), (m.get(keyOf(i)) ?? 0) + 1);
    return m;
  };
  const a = count(ts);
  const b = count(py);
  const only = (x: Map<string, number>, y: Map<string, number>) =>
    [...x].flatMap(([k, n]) => Array<string>(Math.max(0, n - (y.get(k) ?? 0))).fill(k));
  return { onlyTs: only(a, b), onlyPython: only(b, a) };
}

const schema = JSON.parse(readFileSync(join(root, 'schema/flows.schema.json'), 'utf8'));

describe.skipIf(!python)('validateGuide against the Python oracle', () => {
  const doc = loadGuideDoc(dir);
  it.each([
    ['avisos off, completude off', {}, []],
    ['avisos on', { avisos: true }, ['--avisos']],
    ['completude on', { completude: true }, ['--completude']],
    ['avisos on, completude on', { avisos: true, completude: true }, ['--avisos', '--completude']],
  ] as const)('real guide document: %s', (_label, options, flags) => {
    const ts = validateGuide(JSON.parse(JSON.stringify(doc)), schema, { ...options });
    const { onlyTs, onlyPython } = diff(ts, oracleIssues(doc, [...flags]));
    expect({ onlyTs, onlyPython }, `only in TypeScript: ${onlyTs.length}, only in Python: ${onlyPython.length}`).toEqual({
      onlyTs: [],
      onlyPython: [],
    });
  });
});

// Planted structural defects of the older rules (rules.ts): the whole issue set, message text included, must equal the oracle's.
// SCHEMA messages (known difference, kept out of the compared set): the oracle's come from jsonschema and ours from Ajv, so their text is NOT comparable; the schema step is
// compared by the key only (see oracle-defects tests) and the cases below stay schema-valid on purpose.
type D = any; // eslint-disable-line @typescript-eslint/no-explicit-any
const plantedCases: Array<[string, (d: D) => void]> = [
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

describe.skipIf(!python)('planted structural defects: messages match the oracle', () => {
  const doc = loadGuideDoc(dir);
  it.each(plantedCases)('%s', (_name, plant) => {
    const d = JSON.parse(JSON.stringify(doc));
    plant(d);
    const msgs = (l: Array<{ code: string; path: string; message: string }>) => l.map((i) => `${i.code}|${i.path}|${i.message}`).sort();
    const py = execFileSync(python as string, [oracle, '--issues'], { input: JSON.stringify(d), encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 });
    const pyList = JSON.parse(py) as Array<{ code: string; path: string; message: string; nivel: string; item_id: string | null }>;
    expect(pyList.length, 'the planted defect must fire at least one rule').toBeGreaterThan(0);
    const ts = validateGuide(d, schema);
    expect(msgs(ts)).toEqual(msgs(pyList));
    expect(ts.map((i) => JSON.stringify([i.code, i.path, i.itemId ?? null])).sort()).toEqual(pyList.map((i) => JSON.stringify([i.code, i.path, i.item_id ?? null])).sort());
  });
});
