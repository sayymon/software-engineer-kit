// SPDX-License-Identifier: MIT
// One-off recorder: runs the Python oracle (tools/guide-oracle) and stores its output as canonical JSON in
// tests/guide/expected/. The regression tests read those files and never call Python.
//   GUIDE_ORACLE_PYTHON=/path/to/python npx tsx tools/guide/record-expected.ts
// The cases come from tests/guide/cases/*, the same modules the tests import, so recorder and tests cannot drift.
// Only content/guide-derived data is written: no secrets, no private/ content.
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import YAML from 'yaml';
import { guideDir } from '../../lib/guide';
import { entries as avisos } from '../../tests/guide/cases/avisos';
import { ARQUIVO, docComDefeito } from '../../tests/guide/cases/cli';
import { entries as dados } from '../../tests/guide/cases/dados';
import { casos } from '../../tests/guide/cases/decisor';
import { collectionHashes } from '../../tests/guide/cases/parity';
import { entries as perguntas } from '../../tests/guide/cases/perguntas';
import { entries as raci } from '../../tests/guide/cases/raci';
import { rastreioDocs } from '../../tests/guide/cases/rastreio';
import { entries as refs } from '../../tests/guide/cases/refs';
import { plantedCases, realCombos } from '../../tests/guide/cases/rules';
import { entries as structure } from '../../tests/guide/cases/structure';
import { entries as taxonomia } from '../../tests/guide/cases/taxonomia';
import { flagsToArgs, realDoc, root, writeExpected, type Flags, type IssueRow } from '../../tests/guide/support/expected';

const python = process.env.GUIDE_ORACLE_PYTHON;
if (!python) {
  console.error('Set GUIDE_ORACLE_PYTHON to a Python with tools/guide-oracle/requirements.txt installed.');
  process.exit(2);
}
const oracle = join(root, 'tools/guide-oracle/dump_doc.py');
const MAX = 256 * 1024 * 1024;
const run = (args: string[], input?: unknown): string =>
  execFileSync(python, [oracle, ...args], { input: input === undefined ? undefined : JSON.stringify(input), encoding: 'utf8', maxBuffer: MAX });
const issues = (doc: unknown, flags: Flags): IssueRow[] => JSON.parse(run(['--issues', ...flagsToArgs(flags)], doc));

// 1. Real guide document, four flag combinations.
writeExpected('rules-real.json', Object.fromEntries(realCombos.map(([label, flags]) => [label, issues(realDoc(), flags)])));

// 2. Planted structural defects of rules.ts.
writeExpected(
  'rules-planted.json',
  Object.fromEntries(plantedCases.map(([name, plant]) => { const d = realDoc(); plant(d); return [name, issues(d, {})]; })),
);

// 3. Planted defects, one file per rule group.
const groups: Record<string, Array<{ name: string; plant: (d: never) => unknown; flags: Flags }>> = { refs, structure, dados, avisos, perguntas, raci, taxonomia };
for (const [key, list] of Object.entries(groups)) {
  writeExpected(
    `defects-${key}.json`,
    Object.fromEntries(list.map((e) => { const d = realDoc(); e.plant(d as never); return [e.name, issues(d, e.flags)]; })),
  );
}

// 4. Data tracing.
writeExpected('rastreio.json', Object.fromEntries(rastreioDocs().map(([name, doc]) => [name, JSON.parse(run(['--rastreio'], doc))])));

// 5. Decisor.
writeExpected('decisor.json', JSON.parse(run(['--decisor'], casos)));

// 6. Loader (per-collection hashes) and Mermaid for all demands.
const dir = guideDir(`${root}content`);
const mermaid = JSON.parse(run([dir, '--mermaid']));
writeExpected('parity.json', {
  doc_hashes: collectionHashes(JSON.parse(run([dir]))),
  mermaid,
});

// 7. Python CLI text output for `validar` on the planted defect (temporary path replaced by a placeholder).
const tmp = mkdtempSync(join(tmpdir(), 'guide-record-'));
try {
  const file = join(tmp, 'defeito.yaml');
  writeFileSync(file, YAML.stringify(docComDefeito()));
  const py = spawnSync(python, ['-m', 'guia_decisao.cli', 'validar', '--yaml', file, '--schema', join(root, 'schema/flows.schema.json'), '--sem-avisos'], {
    cwd: root,
    encoding: 'utf8',
    env: { ...process.env, PYTHONPATH: join(root, 'tools/guide-oracle/src') },
  });
  writeExpected('cli-validar.json', { status: py.status, stdout: py.stdout.split(file).join(ARQUIVO), stderr: py.stderr.split(file).join(ARQUIVO) });
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
console.log('recorded into tests/guide/expected');
