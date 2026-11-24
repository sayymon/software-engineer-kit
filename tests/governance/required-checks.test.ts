// SPDX-License-Identifier: MIT
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';
import { describe, expect, it } from 'vitest';

const root = fileURLToPath(new URL('../../', import.meta.url));
const script = join(root, 'tools/github/apply-settings.sh');

const jobNames = (file: string): string[] => {
  const wf = YAML.parse(readFileSync(join(root, '.github/workflows', file), 'utf8')) as { jobs: Record<string, { name: string }> };
  return Object.values(wf.jobs).map((j) => j.name);
};

describe('settings script', () => {
  it('lists exactly the PR and CodeQL job names as required checks', () => {
    const m = readFileSync(script, 'utf8').match(/^REQUIRED_CHECKS=\(([^)]*)\)/m);
    expect(m).not.toBeNull();
    const listed = (m?.[1] ?? '').trim().split(/\s+/).sort();
    expect(listed).toEqual([...jobNames('pr.yml'), ...jobNames('codeql.yml')].sort());
  });

  it('dry-runs by default and prints the calls', () => {
    const r = spawnSync('bash', [script], { encoding: 'utf8', env: { ...process.env, PATH: '/usr/bin:/bin' } });
    expect(r.status).toBe(0);
    expect(r.stdout).toContain('DRY-RUN');
    expect(r.stdout).toContain('gh api -X POST repos/sayymon/software-engineer-kit/rulesets');
    expect(r.stdout).toContain('"name": "release-tags"');
    expect(r.stdout).not.toContain('APPLY mode');
  });

  it('rejects unknown arguments', () => {
    const r = spawnSync('bash', [script, '--nope'], { encoding: 'utf8' });
    expect(r.status).toBe(2);
  });
});
