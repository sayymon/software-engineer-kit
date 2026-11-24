// SPDX-License-Identifier: MIT
// `npm run validate -- --self-test`: runs every check against temporary roots with known good and bad content
// and confirms each check reports what it should.
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { CHECKS } from './checks';
import { createContext } from './context';
import type { CheckStatus } from './types';

type Files = Record<string, string>;

const BLOCKLIST = '# test blocklist\nacme-internal\nre:tok_[0-9]{4}\n';
const entity = (id: string, extra = '', body = 'Texto limpo.') =>
  `---\nid: ${id}\ntipo: funcionalidade\nnome: Funcionalidade ${id}\npublico: false\n${extra}---\n${body}\n`;

function root(files: Files): string {
  const dir = mkdtempSync(join(tmpdir(), 'kit-selftest-'));
  const all: Files = { 'config/public-terms.txt': BLOCKLIST, ...files };
  for (const [rel, text] of Object.entries(all)) {
    mkdirSync(dirname(join(dir, rel)), { recursive: true });
    writeFileSync(join(dir, rel), text);
  }
  return dir;
}

type Scenario = { name: string; files: Files; expect: Record<string, CheckStatus> };

const SCENARIOS: Scenario[] = [
  {
    name: 'clean content passes',
    files: {
      'content/pt-BR/tools/alfa.md': entity('alfa', '', 'Veja [[beta]].'),
      'content/pt-BR/tools/beta.md': entity('beta'),
      'content/ids.lock.json': JSON.stringify({ entities: ['alfa'], guides: {} }),
      'README.md': 'Kit de engenharia.\n',
    },
    expect: { schema: 'ok', links: 'ok', ids: 'ok', 'ids-lock': 'ok', duplicates: 'ok', terms: 'ok', licenses: 'na' },
  },
  {
    name: 'duplicate id, wrong file name and invalid id fail ids',
    files: {
      'content/pt-BR/tools/alfa.md': entity('alfa'),
      'content/pt-BR/tools/alfa2.md': entity('alfa'),
      'content/pt-BR/tools/Gama-Ruim.md': entity('Gama-Ruim'),
    },
    expect: { ids: 'fail' },
  },
  {
    name: 'overlay without pt-BR source fails ids',
    files: { 'content/pt-BR/tools/alfa.md': entity('alfa'), 'content/en/tools/orfa.md': '---\nid: orfa\n---\n' },
    expect: { ids: 'fail' },
  },
  {
    name: 'locked id that disappeared fails ids-lock',
    files: {
      'content/pt-BR/tools/alfa.md': entity('alfa'),
      'content/ids.lock.json': JSON.stringify({ entities: ['alfa', 'sumiu'], guides: {} }),
    },
    expect: { 'ids-lock': 'fail', ids: 'ok' },
  },
  {
    name: 'planted blocked term (case and accent variant) fails terms',
    files: { 'content/pt-BR/tools/alfa.md': entity('alfa', '', 'Veio do ACME-INTERNAL.'), 'README.md': 'ok\n' },
    expect: { terms: 'fail' },
  },
  {
    name: 'planted token in docs fails terms',
    files: { 'docs/nota.md': 'chave tok_1234 vazou\n' },
    expect: { terms: 'fail' },
  },
  {
    name: 'broken wikilink fails links',
    files: { 'content/pt-BR/tools/alfa.md': entity('alfa', '', 'Veja [[inexistente]].') },
    expect: { links: 'fail' },
  },
  {
    name: 'schema violation fails schema',
    files: { 'content/pt-BR/tools/alfa.md': entity('alfa', 'campo_extra: 1\n') },
    expect: { schema: 'fail' },
  },
  {
    name: 'repeated title of the same tipo fails duplicates',
    files: {
      'content/pt-BR/tools/alfa.md': entity('alfa').replace('Funcionalidade alfa', 'Mesmo Título'),
      'content/pt-BR/tools/beta.md': entity('beta').replace('Funcionalidade beta', 'mesmo titulo'),
    },
    expect: { duplicates: 'fail' },
  },
  {
    name: 'empty repository reports not applicable instead of failing',
    files: {},
    expect: { schema: 'na', links: 'na', ids: 'na', 'ids-lock': 'na', duplicates: 'na', terms: 'ok' },
  },
];

export async function selfTest(): Promise<{ passed: number; failures: string[] }> {
  const failures: string[] = [];
  let passed = 0;
  const names = new Set(CHECKS.map((c) => c.name));
  for (const required of ['schema', 'links', 'ids', 'ids-lock', 'duplicates', 'terms', 'licenses']) {
    if (names.has(required)) passed++;
    else failures.push(`check "${required}" is not registered`);
  }
  for (const scenario of SCENARIOS) {
    const dir = root(scenario.files);
    try {
      const ctx = createContext(dir);
      for (const check of CHECKS) {
        const wanted = scenario.expect[check.name];
        if (!wanted) continue;
        const result = await check.run(ctx);
        if (result.status === wanted) passed++;
        else failures.push(`${scenario.name}: ${check.name} returned ${result.status}, expected ${wanted} (${result.problems.join('; ') || result.info || ''})`);
      }
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  }
  return { passed, failures };
}
