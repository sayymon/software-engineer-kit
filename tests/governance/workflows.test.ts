// SPDX-License-Identifier: MIT
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';
import { describe, expect, it } from 'vitest';

const root = fileURLToPath(new URL('../../', import.meta.url));
const dir = join(root, '.github/workflows');
const files = readdirSync(dir).filter((f) => f.endsWith('.yml'));
type Job = { name?: string; permissions?: Record<string, string>; needs?: string | string[]; steps?: { uses?: string; run?: string }[] };
type Workflow = { on: Record<string, unknown>; permissions?: unknown; jobs: Record<string, Job> };
const load = (f: string): Workflow => YAML.parse(readFileSync(join(dir, f), 'utf8')) as Workflow;
const raw = (f: string): string => readFileSync(join(dir, f), 'utf8');

describe('workflows', () => {
  it('finds the three workflows', () => {
    expect(files.sort()).toEqual(['codeql.yml', 'pr.yml', 'release.yml']);
  });

  it('pins every action to a 40 hex commit SHA', () => {
    for (const f of files) {
      for (const m of raw(f).matchAll(/^\s*-?\s*uses:\s*(\S+)/gm)) {
        expect(m[1], `${f}: ${m[1]}`).toMatch(/^[\w.-]+\/[\w./-]+@[0-9a-f]{40}$/);
      }
    }
  });

  it('never uses pull_request_target', () => {
    for (const f of files) expect(raw(f)).not.toContain('pull_request_target');
  });

  it('sets empty top-level permissions and explicit job permissions', () => {
    for (const f of files) {
      const wf = load(f);
      expect(wf.permissions, f).toEqual({});
      for (const [id, job] of Object.entries(wf.jobs)) expect(job.permissions, `${f}:${id}`).toBeTypeOf('object');
    }
  });

  it('runs the PR workflow on pull_request only', () => {
    const on = load('pr.yml').on;
    expect(Object.keys(on).sort()).toEqual(['pull_request', 'workflow_dispatch']);
  });

  it('releases on version tags with an owner guard', () => {
    const wf = load('release.yml');
    expect(wf.on).toEqual({ push: { tags: ['v*.*.*'] } });
    expect(raw('release.yml')).toContain('merge-base --is-ancestor');
    expect(wf.jobs.guard.steps?.some((s) => s.run?.includes('sayymon'))).toBe(true);
    expect(wf.jobs.verify.needs).toBe('guard');
  });

  it('grants write scopes only to the release and deploy jobs', () => {
    const wf = load('release.yml');
    for (const [id, job] of Object.entries(wf.jobs)) {
      const p = job.permissions ?? {};
      expect(Object.values(p).includes('write'), id).toBe(id === 'release' || id === 'deploy-pages');
      if (id === 'release') expect(p.contents).toBe('write');
      if (id === 'deploy-pages') expect(p.pages).toBe('write');
    }
  });

  it('configures dependabot for npm, github-actions and the pip oracle', () => {
    const d = YAML.parse(readFileSync(join(root, '.github/dependabot.yml'), 'utf8')) as { updates: { 'package-ecosystem': string }[] };
    expect(d.updates.map((u) => u['package-ecosystem']).sort()).toEqual(['github-actions', 'npm', 'pip']);
  });

  it('parses the issue templates', () => {
    for (const f of ['bug_report', 'content_suggestion', 'config']) {
      expect(() => YAML.parse(readFileSync(join(root, `.github/ISSUE_TEMPLATE/${f}.yml`), 'utf8'))).not.toThrow();
    }
  });
});
