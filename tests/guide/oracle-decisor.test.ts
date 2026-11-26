// SPDX-License-Identifier: MIT
// Regression test of lib/decisor.ts against the stored oracle output (tests/guide/expected/decisor.json, recorded once from
// the former decisor.py): the real guide config plus varied cases (ties, errors, scale
// violations, with and without financial context).
import { describe, expect, it } from 'vitest';
import { DecisorError, decidir } from '../../lib/decisor';
import { casos, type Caso } from './cases/decisor';
import { readExpected } from './support/expected';

type Saida = { ok: unknown } | { erro: string };

function ts(c: Caso): Saida {
  try {
    return { ok: decidir(c.config, c.objetivo, c.notas, c.contexto as never) };
  } catch (e) {
    if (e instanceof DecisorError) return { erro: e.message };
    throw e;
  }
}

describe('decisor: regression against the stored oracle output', () => {
  const py = readExpected<Saida[]>('decisor.json');
  it('stores one output per case, with successes and errors', () => {
    expect(py).toHaveLength(casos.length);
    expect(casos.length).toBeGreaterThanOrEqual(20);
    expect(py.some((s) => 'ok' in s)).toBe(true);
    expect(py.some((s) => 'erro' in s)).toBe(true);
  });
  it.each(casos.map((c, i) => [i, c.objetivo] as const))('case %i (%s)', (i) => {
    expect(ts(casos[i])).toEqual(py[i]);
  });
});
