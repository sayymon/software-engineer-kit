// SPDX-License-Identifier: MIT
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const root = fileURLToPath(new URL('../../', import.meta.url));
const read = (p: string): string => readFileSync(join(root, p), 'utf8');

describe('community files', () => {
  it('README.md links to both full READMEs and both exist', () => {
    const landing = read('README.md');
    for (const f of ['README.pt-BR.md', 'README.en.md']) {
      expect(landing).toContain(`](${f})`);
      expect(existsSync(join(root, f))).toBe(true);
    }
  });

  it('ships the governance files', () => {
    for (const f of [
      'CONTRIBUTING.md',
      'CODE_OF_CONDUCT.md',
      'CODE_OF_CONDUCT.pt-BR.md',
      'SECURITY.md',
      'docs/governance.md',
      'tools/github/apply-settings.sh',
      '.github/CODEOWNERS',
      '.github/PULL_REQUEST_TEMPLATE.md',
      '.github/ISSUE_TEMPLATE/bug_report.yml',
      '.github/ISSUE_TEMPLATE/content_suggestion.yml',
      '.github/ISSUE_TEMPLATE/config.yml',
      '.github/dependabot.yml',
      'LICENSES/MIT.txt',
      'LICENSES/CC-BY-4.0.txt',
    ]) {
      expect(existsSync(join(root, f)), f).toBe(true);
    }
  });

  it('assigns every file to the owner in CODEOWNERS', () => {
    expect(read('.github/CODEOWNERS')).toMatch(/^\* @sayymon$/m);
  });

  it('keeps em dashes out of the community files', () => {
    for (const f of ['README.md', 'README.pt-BR.md', 'README.en.md', 'CONTRIBUTING.md', 'SECURITY.md', 'docs/governance.md']) {
      expect(read(f), f).not.toContain('\u2014');
    }
  });
});
