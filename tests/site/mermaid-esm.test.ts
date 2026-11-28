// SPDX-License-Identifier: MIT
// Build step that copies the split ESM Mermaid into the site (Requirements 15.3, 15.12).
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { MERMAID_ESM_DIR, MERMAID_ESM_ENTRY, copiarMermaidEsm } from '../../tools/site/mermaid-esm';

const root = join(__dirname, '../..');
const out = mkdtempSync(join(tmpdir(), 'kit-esm-'));
afterAll(() => rmSync(out, { recursive: true, force: true }));

describe('copiarMermaidEsm', () => {
  it('pins mermaid at the exact version in package.json', () => {
    const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
    expect(pkg.devDependencies.mermaid).toBe('11.17.2');
  });

  it('copies the entry and every chunk it imports, with no source maps', () => {
    const r = copiarMermaidEsm(root, out);
    expect(r.versao).toBe('11.17.2');
    const dir = join(out, MERMAID_ESM_DIR);
    const entry = readFileSync(join(dir, MERMAID_ESM_ENTRY), 'utf8');
    const importados = [...entry.matchAll(/from"(\.\/chunks\/mermaid\.esm\.min\/[^"]+)"/g)].map((m) => m[1]);
    expect(importados.length).toBeGreaterThan(5);
    for (const rel of importados) expect(existsSync(join(dir, rel))).toBe(true);
    expect(readdirSync(join(dir, 'chunks/mermaid.esm.min')).every((f) => f.endsWith('.mjs'))).toBe(true);
    expect(r.arquivos).toBe(1 + readdirSync(join(dir, 'chunks/mermaid.esm.min')).length);
  });

  it('every static and dynamic import of every chunk resolves to a copied file', () => {
    const dir = join(out, MERMAID_ESM_DIR, 'chunks/mermaid.esm.min');
    const faltando: string[] = [];
    for (const f of readdirSync(dir)) {
      const src = readFileSync(join(dir, f), 'utf8');
      for (const m of src.matchAll(/(?:from|import\()\s*"\.\/(chunk-[A-Z0-9]+\.mjs)"/g)) if (!existsSync(join(dir, m[1]))) faltando.push(`${f} -> ${m[1]}`);
    }
    expect(faltando).toEqual([]);
  });

  it('fails with a clear message when the package is missing', () => {
    expect(() => copiarMermaidEsm(join(out, 'vazio'), out)).toThrow(/npm ci/);
  });
});
