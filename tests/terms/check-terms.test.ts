// SPDX-License-Identifier: MIT
// Check `terms` (tools/validate/checks/terms.ts): explicit allowlist of example emails and ignore of appsec-* files.
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { ALLOWED_EXAMPLE_EMAILS, IGNORED_FILE_PREFIXES, scanTerms } from '../../tools/validate/checks/terms';

const REPO = join(__dirname, '../..');
const PUBLIC_TERMS = join(REPO, 'config/public-terms.txt');
// Assembled from parts so this file stays clean under its own scan.
const realLooking = 'someone@' + 'mail.test.org';

let tmp: string;
let n = 0;
/** Writes `files` (relative path -> text) into a fresh root and scans it with the public ruleset. */
const scan = (files: Record<string, string>) => {
  const root = join(tmp, `root-${n++}`);
  for (const [rel, text] of Object.entries(files)) {
    mkdirSync(dirname(join(root, rel)), { recursive: true });
    writeFileSync(join(root, rel), text);
  }
  return scanTerms(root, [PUBLIC_TERMS]);
};

beforeAll(() => {
  tmp = mkdtempSync(join(tmpdir(), 'check-terms-'));
});
afterAll(() => rmSync(tmp, { recursive: true, force: true }));

describe('terms check: example email allowlist', () => {
  it('lists exactly the two example emails', () => {
    expect([...ALLOWED_EXAMPLE_EMAILS].sort()).toEqual(['john@acme.com', 'john@example.com']);
  });

  it('accepts john@acme.com and john@example.com in skill files', () => {
    const r = scan({
      '.claude/skills/x/reference.md': 'email: john@acme.com\nother: john@example.com\n',
      '.kiro/skills/x/example.py': 'user = "john@acme.com"\n',
    });
    expect(r.hits).toEqual([]);
    expect(r.scanned).toBe(2);
  });

  it('accepts the allowed emails regardless of case', () => {
    expect(scan({ 'docs/a.md': 'John@ACME.com' }).hits).toEqual([]);
  });

  it('keeps blocking any other email, including look-alikes of the allowed ones', () => {
    const at = '@';
    for (const email of [realLooking, `jane${at}acme.com`, `john${at}acme.com.br`, `xjohn${at}acme.com`, `john.doe${at}acme.com`]) {
      const r = scan({ 'docs/a.md': `contato: ${email}\n` });
      expect(r.hits.length, email).toBe(1);
    }
  });

  it('blocks a disallowed email on a line that also has an allowed one', () => {
    const r = scan({ 'docs/a.md': `john@acme.com e ${realLooking}\n` });
    expect(r.hits.map((h) => h.match)).toEqual([realLooking]);
  });

  it('does not allow the example emails to hide other terms (personal paths)', () => {
    const path = `/Us${'ers'}/someone/project`;
    const r = scan({ 'docs/a.md': `john@acme.com ${path}\n` });
    expect(r.hits).toHaveLength(1);
  });
});

describe('terms check: appsec-* files are ignored', () => {
  it('declares the appsec- prefix', () => {
    expect(IGNORED_FILE_PREFIXES).toEqual(['appsec-']);
  });

  it('skips files whose name starts with appsec-, wherever they are', () => {
    const r = scan({
      '.kiro/steering/appsec-rules.md': `ex: ${realLooking}\n`,
      '.claude/rules/appsec-rules.md': `ex: ${realLooking}\n`,
      '.github/workflows/appsec-guard.yml': `# ${realLooking}\n`,
    });
    expect(r.hits).toEqual([]);
    expect(r.scanned).toBe(0);
  });

  it('keeps scanning files that only contain appsec in the name or sit under an appsec-named folder', () => {
    const r = scan({
      'docs/my-appsec-rules.md': `ex: ${realLooking}\n`,
      'docs/appsec/rules.md': `ex: ${realLooking}\n`,
      'docs/appsec.md': `ex: ${realLooking}\n`,
    });
    expect(r.hits.map((h) => h.file).sort()).toEqual(['docs/appsec.md', 'docs/appsec/rules.md', 'docs/my-appsec-rules.md']);
  });
});

describe('terms check: .worktrees is ignored', () => {
  it('skips other-branch worktrees but still scans sibling folders', () => {
    const r = scan({
      '.worktrees/other-branch/docs/a.md': `ex: ${realLooking}\n`,
      'docs/b.md': `ex: ${realLooking}\n`,
    });
    expect(r.hits.map((h) => h.file)).toEqual(['docs/b.md']);
    expect(r.scanned).toBe(1);
  });
});
