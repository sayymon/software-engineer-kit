// SPDX-License-Identifier: MIT
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const DIR = join(__dirname, '../../site/public/vendor/mermaid');
const EXPECTED = '581ed7d74bd9048d0e3a91363927d72ef22942d7722546b27f7cc29e35390eb8';

describe('vendored Mermaid 11.17.2', () => {
  it('has the pinned sha256', () => {
    const sum = createHash('sha256').update(readFileSync(join(DIR, 'mermaid.min.js'))).digest('hex');
    expect(sum).toBe(EXPECTED);
  });

  it('ships its MIT license text', () => {
    expect(existsSync(join(DIR, 'LICENSE'))).toBe(true);
    const text = readFileSync(join(DIR, 'LICENSE'), 'utf8');
    expect(text).toContain('The MIT License (MIT)');
    expect(text).toContain('Knut Sveidqvist');
  });

  it('is recorded in THIRD-PARTY-NOTICES.md with the same hash', () => {
    const notices = readFileSync(join(__dirname, '../../THIRD-PARTY-NOTICES.md'), 'utf8');
    expect(notices).toContain(EXPECTED);
    expect(notices).toContain('11.17.2');
  });
});
