// SPDX-License-Identifier: MIT
// Regression test of the TypeScript guide validator against the stored oracle output (tests/guide/expected/rules-*.json,
// recorded once from the former Python oracle). Issues are compared whole and in order: code, nivel, path, itemId and message.
import { describe, expect, it } from 'vitest';
import { plantedCases, realCombos } from './cases/rules';
import { readExpected, realDoc, tsRows, type IssueRow } from './support/expected';

describe('validateGuide against the stored oracle output', () => {
  const real = readExpected<Record<string, IssueRow[]>>('rules-real.json');
  it.each(realCombos)('real guide document: %s', (label, flags) => {
    expect(tsRows(realDoc(), flags)).toEqual(real[label]);
  });
});

const sorted = (l: IssueRow[]) => l.map((i) => JSON.stringify([i.code, i.nivel, i.path, i.item_id, i.message])).sort();

describe('planted structural defects: messages match the stored oracle output', () => {
  const planted = readExpected<Record<string, IssueRow[]>>('rules-planted.json');
  it.each(plantedCases)('%s', (name, plant) => {
    const d = realDoc();
    plant(d);
    expect(planted[name].length, 'the planted defect must fire at least one rule').toBeGreaterThan(0);
    // Order is not compared for the older structural rules: the oracle and TypeScript emit them in different sequences.
    expect(sorted(tsRows(d))).toEqual(sorted(planted[name]));
  });
});
