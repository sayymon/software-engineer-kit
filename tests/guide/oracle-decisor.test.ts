// SPDX-License-Identifier: MIT
// Differential test of lib/decisor.ts against the Python oracle (decisor.py, via dump_doc.py --decisor): the real guide
// config plus varied cases (ties, errors, scale violations, with and without financial context). Runs only with
// GUIDE_ORACLE_PYTHON.
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { DecisorError, configDoGuia, decidir } from '../../lib/decisor';
import { guideDir, loadGuideDoc } from '../../lib/guide';

const python = process.env.GUIDE_ORACLE_PYTHON;
const root = new URL('../../', import.meta.url).pathname;
const oracle = join(root, 'tools/guide-oracle/dump_doc.py');
const config = configDoGuia(loadGuideDoc(guideDir(`${root}content`)));

type Caso = { config: typeof config; objetivo: string; notas: Record<string, Record<string, unknown>>; contexto?: unknown };
type Saida = { ok: unknown } | { erro: string };

const notas = (v: number | ((o: string, c: string) => unknown)) =>
  Object.fromEntries(config.opcoes.map((o) => [o, Object.fromEntries(config.criterios.map((c) => [c, typeof v === 'function' ? v(o, c) : v]))]));
const objetivos = Object.keys(config.pesos);
const ctx = {
  custos: { construir: { curto: 100, medio: 250.5, longo: 'R$ 1.000' }, comprar: { longo: 30 }, assinar: {} },
  custo_de_nao_fazer: 12000,
  roi: 0.25,
  orcamento: 5000,
};

const casos: Caso[] = [];
const add = (objetivo: string, n: Caso['notas'], contexto?: unknown, cfg = config) => casos.push({ config: cfg, objetivo, notas: n, ...(contexto === undefined ? {} : { contexto }) });

// Real guide config: every goal with flat notes (full tie), varied notes, and context.
for (const g of objetivos) {
  add(g, notas(3));
  add(g, notas((o, c) => 1 + ((o.length * 7 + c.length * 3) % 5)));
  add(g, notas((o, c) => 1 + ((o.length + c.length) % 5)), ctx);
}
add(objetivos[0], notas(5), {});
add(objetivos[0], notas(1), { roi: 0 });
add(objetivos[0], notas(2.5)); // fractional notes are allowed inside the scale
add(objetivos[1], notas((o, c) => (o === 'comprar' || o === 'construir' ? 4 : c.length % 5 || 1))); // partial tie
add(objetivos[1], notas((o) => (o === 'construir' ? 2.125 : 2.125)), { custos: { comprar: null }, custo_de_nao_fazer: null });
// Errors.
add('inexistente', notas(3));
add(objetivos[0], notas(6));
add(objetivos[0], notas(0));
add(objetivos[0], notas((o, c) => (o === 'assinar' && c === 'risco' ? 5.5 : 3)));
add(objetivos[0], notas((o, c) => (o === 'comprar' && c === 'custo_total' ? 'alto' : 3)));
add(objetivos[0], notas((o, c) => (o === 'comprar' && c === 'custo_total' ? true : 3)));
add(objetivos[0], notas((o, c) => (o === 'comprar' && c === 'custo_total' ? null : 3)));
{
  const falta = notas(3);
  delete falta.assinar;
  add(objetivos[0], falta);
}
{
  const falta = notas(3);
  delete falta.comprar.risco;
  add(objetivos[0], falta);
}
add(objetivos[0], { ...notas(3), extra: {}, outra: {} });
// Custom configs: tie-break with an option outside the order, other scale.
add('x', { a: { k: 2 }, b: { k: 2 }, c: { k: 1 } }, undefined, { criterios: ['k'], opcoes: ['a', 'b', 'c'], escala: { min: 0, max: 3 }, pesos: { x: { k: 0.3333333 } }, ordem_desempate: ['c', 'b'] });
add('x', { a: { k: 4 }, b: { k: 1 } }, undefined, { criterios: ['k'], opcoes: ['a', 'b'], escala: { min: 0, max: 3 }, pesos: { x: { k: 1 } }, ordem_desempate: ['b', 'a'] });

function oracleDecisor(entrada: Caso[]): Saida[] {
  const out = execFileSync(python as string, [oracle, '--decisor'], { input: JSON.stringify(entrada), encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  return JSON.parse(out) as Saida[];
}

function ts(c: Caso): Saida {
  try {
    return { ok: decidir(c.config, c.objetivo, c.notas, c.contexto as never) };
  } catch (e) {
    if (e instanceof DecisorError) return { erro: e.message };
    throw e;
  }
}

describe.skipIf(!python)('decisor: paridade com o oráculo Python', () => {
  const py = oracleDecisor(casos);
  it('cobre ao menos 20 casos, com sucessos e erros', () => {
    expect(casos.length).toBeGreaterThanOrEqual(20);
    expect(py.some((s) => 'ok' in s)).toBe(true);
    expect(py.some((s) => 'erro' in s)).toBe(true);
  });
  it.each(casos.map((c, i) => [i, c.objetivo] as const))('caso %i (%s)', (i) => {
    expect(ts(casos[i])).toEqual(py[i]);
  });
});
