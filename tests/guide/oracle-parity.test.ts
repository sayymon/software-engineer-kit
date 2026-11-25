// SPDX-License-Identifier: MIT
// Regression test of the TypeScript guide loader and Mermaid generator against the stored oracle output
// (tests/guide/expected/parity.json, recorded once from the former Python oracle).
// The loaded document is compared by the SHA-256 of each canonical collection, so a difference names the collection.
import { describe, expect, it } from 'vitest';
import { gerarTodos } from '../../lib/flow-mermaid';
import { guideDir, loadGuideDoc } from '../../lib/guide';
import { collectionHashes } from './cases/parity';
import { readExpected, root } from './support/expected';

const stored = readExpected<{ doc_hashes: Record<string, string>; mermaid: { padrao: Record<string, string>; subtarefas: Record<string, string> } }>('parity.json');
const dir = guideDir(`${root}content`);

describe('TypeScript against the stored oracle output', () => {
  it('loadGuideDoc equals the document loaded by Python (per collection)', () => {
    const fromTs = collectionHashes(JSON.parse(JSON.stringify(loadGuideDoc(dir))));
    expect(fromTs).toEqual(stored.doc_hashes);
  });
  it.each([
    ['default', false],
    ['subtasks expanded', true],
  ])('Mermaid for all demands equals Python (%s)', (_label, subtarefas) => {
    const py = stored.mermaid[subtarefas ? 'subtarefas' : 'padrao'];
    const ts = gerarTodos(loadGuideDoc(dir), true, subtarefas);
    expect([...ts.keys()].sort()).toEqual(Object.keys(py).sort());
    for (const [name, text] of Object.entries(py)) expect(ts.get(name)?.texto, name).toBe(text);
  }, 60_000);
});
