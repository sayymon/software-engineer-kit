// SPDX-License-Identifier: MIT
// Runs a tool that lives in the gitignored private/ folder, for example `tsx tools/private/run.ts tools/migrate/index.ts ...`.
// A fresh clone has no private/ folder: the tool is skipped with a clear message and exit code 2.
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const target = process.argv[2];
if (!target) {
  console.error('usage: tsx tools/private/run.ts <path inside private/> [args]');
  process.exit(2);
}
const root = fileURLToPath(new URL('../../', import.meta.url));
const file = join(root, 'private', target);
if (!existsSync(file)) {
  console.error('private/ folder not found: migration and link-back need the private inputs (see docs/publishing.md)');
  process.exit(2);
}
// The target reads its own flags from process.argv, so drop this runner and the target path.
process.argv.splice(1, 2, file);
await import(pathToFileURL(file).href);
