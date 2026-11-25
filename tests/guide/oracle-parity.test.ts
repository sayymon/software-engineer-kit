// SPDX-License-Identifier: MIT
// Differential test between the TypeScript guide loader and Mermaid generator and the Python oracle
// (tools/guide-oracle). Runs only when GUIDE_ORACLE_PYTHON points at a Python with the oracle requirements.
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { gerarTodos } from '../../lib/flow-mermaid';
import { guideDir, loadGuideDoc } from '../../lib/guide';

const python = process.env.GUIDE_ORACLE_PYTHON;
const root = new URL('../../', import.meta.url).pathname;
const oracle = join(root, 'tools/guide-oracle/dump_doc.py');
const dir = guideDir(`${root}content`);
const run = (...args: string[]) =>
  JSON.parse(execFileSync(python as string, [oracle, dir, ...args], { encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 }));

describe.skipIf(!python)('TypeScript against the Python oracle', () => {
  it('loadGuideDoc equals the document loaded by Python', () => {
    const fromPython = run();
    const fromTs = JSON.parse(JSON.stringify(loadGuideDoc(dir)));
    expect(fromTs).toEqual(fromPython);
  });
  it.each([
    ['default', false],
    ['subtasks expanded', true],
  ])('Mermaid for all demands equals Python (%s)', (_label, subtarefas) => {
    const py = run('--mermaid')[subtarefas ? 'subtarefas' : 'padrao'] as Record<string, string>;
    const ts = gerarTodos(loadGuideDoc(dir), true, subtarefas);
    expect([...ts.keys()].sort()).toEqual(Object.keys(py).sort());
    for (const [name, text] of Object.entries(py)) expect(ts.get(name)?.texto, name).toBe(text);
  }, 60_000);
});
