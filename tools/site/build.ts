// SPDX-License-Identifier: MIT
// Site build: `astro build` followed by the Pagefind index. Usage: tsx tools/site/build.ts [locale]
// Without a locale both locales are built into site/dist. With a locale only that locale is built into site/dist-<locale>.
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { LOCALES } from '../../lib/content';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const locale = process.argv[2];
if (locale !== undefined && !(LOCALES as readonly string[]).includes(locale)) {
  console.error(`unknown locale "${locale}". Use one of: ${LOCALES.join(', ')}`);
  process.exit(2);
}
const outName = locale ? `dist-${locale}` : 'dist';
const env = { ...process.env, ASTRO_TELEMETRY_DISABLED: '1', KIT_ROOT: root, KIT_OUT_DIR: `./${outName}`, ...(locale ? { KIT_LOCALES: locale } : {}) };
const outDir = join(root, 'site', outName);

function run(label: string, bin: string, args: string[]): void {
  console.log(`> ${label}`);
  const r = spawnSync(bin, args, { cwd: root, env, stdio: 'inherit' });
  if (r.status !== 0) {
    console.error(`${label} failed (exit ${r.status ?? 'signal'})`);
    process.exit(r.status ?? 1);
  }
}

run('astro build', process.execPath, [join(root, 'node_modules/astro/astro.js'), 'build', '--root', join(root, 'site')]);
if (!existsSync(join(outDir, 'index.html'))) {
  console.error(`build produced no ${outName}/index.html`);
  process.exit(1);
}
run('pagefind index', join(root, 'node_modules/.bin/pagefind'), ['--site', outDir]);
console.log(`built ${outName}${locale ? ` (${locale})` : ' (all locales)'}`);
