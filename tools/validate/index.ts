// SPDX-License-Identifier: MIT
// npm run validate [-- --source <path>] [--only <check>] [--self-test] [--root <dir>]
import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { CHECKS as PUBLIC_CHECKS } from './checks';
import { createContext } from './context';
import type { Check } from './types';
import { selfTest } from './selftest';

const argv = process.argv.slice(2);
const flag = (name: string): string | undefined => {
  const i = argv.indexOf(name);
  return i >= 0 ? argv[i + 1] : undefined;
};

async function main(): Promise<number> {
  if (argv.includes('--self-test')) {
    const { passed, failures } = await selfTest();
    for (const f of failures) console.error(`FAIL ${f}`);
    console.log(`self-test: ${passed} assertions passed, ${failures.length} failed`);
    return failures.length ? 1 : 0;
  }
  const root = resolve(flag('--root') ?? fileURLToPath(new URL('../../', import.meta.url)));
  const source = flag('--source');
  if (source && !existsSync(source)) {
    console.error(`source not found: ${source}`);
    return 2;
  }
  // Private checks exist only where the private/ folder exists (never on a fresh clone).
  const privateChecks = join(root, 'private/validate/checks.ts');
  const CHECKS: Check[] = [...PUBLIC_CHECKS];
  if (existsSync(privateChecks)) CHECKS.push(...((await import(pathToFileURL(privateChecks).href)) as { PRIVATE_CHECKS: Check[] }).PRIVATE_CHECKS);
  const only = flag('--only');
  const selected = only ? CHECKS.filter((c) => c.name === only) : CHECKS;
  if (only && selected.length === 0) {
    console.error(`unknown check "${only}". Available: ${CHECKS.map((c) => c.name).join(', ')}`);
    return 2;
  }
  const ctx = createContext(root, source ? { source: resolve(source) } : {});
  let failed = 0;
  for (const check of selected) {
    const result = await check.run(ctx);
    const tag = result.status === 'ok' ? 'ok  ' : result.status === 'na' ? 'n/a ' : 'FAIL';
    console.log(`[${tag}] ${check.name}${result.info ? `  (${result.info})` : ''}`);
    if (result.status === 'fail') {
      failed++;
      for (const p of result.problems.slice(0, 50)) console.log(`       ${p}`);
      if (result.problems.length > 50) console.log(`       ... ${result.problems.length - 50} more`);
    }
  }
  console.log(failed ? `validate: ${failed} check(s) failed` : 'validate: all checks passed');
  return failed ? 1 : 0;
}

process.exit(await main());
