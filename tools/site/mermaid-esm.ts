// SPDX-License-Identifier: MIT
// Copies the split ESM build of Mermaid (entry + every chunk) from node_modules into the built site, so the Diagrama can
// `import()` it from the same origin (no CDN). The chunk names carry a content hash, so the whole folder of the pinned
// version is copied instead of a hand-picked list. Source maps are left out. The single vendored bundle
// (site/public/vendor/mermaid/mermaid.min.js, copied by Astro) stays as the fallback.
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';

/** Folder, inside the output, where the ESM build lands. The loader (site/src/flow-app/mermaid-loader.ts) uses the same path. */
export const MERMAID_ESM_DIR = 'vendor/mermaid-esm';
export const MERMAID_ESM_ENTRY = 'mermaid.esm.min.mjs';
const CHUNKS = 'chunks/mermaid.esm.min';

export interface CopiaMermaidEsm {
  versao: string;
  arquivos: number;
  bytes: number;
  destino: string;
}

/** Copies `<root>/node_modules/mermaid/dist/{entry,chunks}` to `<outDir>/vendor/mermaid-esm`. Throws if the package is missing. */
export function copiarMermaidEsm(root: string, outDir: string): CopiaMermaidEsm {
  const pacote = join(root, 'node_modules', 'mermaid');
  const dist = join(pacote, 'dist');
  if (!existsSync(join(dist, MERMAID_ESM_ENTRY)) || !existsSync(join(dist, CHUNKS))) {
    throw new Error('mermaid ESM build not found in node_modules: run `npm ci` (package.json pins mermaid 11.17.2)');
  }
  const versao = (JSON.parse(readFileSync(join(pacote, 'package.json'), 'utf8')) as { version: string }).version;
  const destino = join(outDir, MERMAID_ESM_DIR);
  rmSync(destino, { recursive: true, force: true });
  mkdirSync(join(destino, CHUNKS), { recursive: true });
  const arquivos = [MERMAID_ESM_ENTRY, ...readdirSync(join(dist, CHUNKS)).filter((f) => f.endsWith('.mjs')).map((f) => `${CHUNKS}/${f}`)];
  let bytes = 0;
  for (const rel of arquivos) {
    copyFileSync(join(dist, rel), join(destino, rel));
    bytes += readFileSync(join(dist, rel)).length;
  }
  const licenca = join(pacote, 'LICENSE');
  if (existsSync(licenca)) copyFileSync(licenca, join(destino, 'LICENSE'));
  return { versao, arquivos: arquivos.length, bytes, destino };
}
