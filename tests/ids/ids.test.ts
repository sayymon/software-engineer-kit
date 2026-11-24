// SPDX-License-Identifier: MIT
import { describe, expect, it } from 'vitest';
import { appendToLock, checkIds, checkLock, lockFromFrozen } from '@lib/ids';

describe('checkIds', () => {
  it('accepts unique snake_case ids', () => {
    expect(checkIds([{ id: 'a_b', file: 'a.md' }, { id: 'c1', file: 'c.md' }])).toEqual([]);
  });
  it('reports invalid and duplicate ids', () => {
    const kinds = checkIds([
      { id: 'Bad-Id', file: 'x.md' },
      { id: 'dup', file: 'a.md' },
      { id: 'dup', file: 'b.md' },
    ]).map((p) => p.kind);
    expect(kinds).toEqual(['invalid', 'duplicate']);
  });
});

describe('id lock', () => {
  const lock = lockFromFrozen({ criar_api: ['ctx.a', 'prep.b'], criar_site: ['ctx.c'] });

  it('seeds guides from the frozen ids', () => {
    expect(lock.entities).toEqual(['criar_api', 'criar_site']);
    expect(lock.guides.criar_api).toEqual(['ctx.a', 'prep.b']);
  });

  it('passes when everything locked is present and new ids were appended', () => {
    const current = { ids: ['criar_api', 'criar_site', 'novo'], guides: { criar_api: ['ctx.a', 'prep.b', 'exec.novo'], criar_site: ['ctx.c'] } };
    expect(checkLock(lock, current)).toEqual([]);
  });

  it('fails when a locked id, guide or step disappears', () => {
    const kinds = checkLock(lock, { ids: ['criar_api'], guides: { criar_api: ['ctx.a'] } }).map((p) => p.kind);
    expect(kinds).toEqual(['locked-missing', 'locked-step-missing', 'locked-guide-missing']);
  });

  it('appendToLock never removes', () => {
    const next = appendToLock(lock, { ids: ['novo'], guides: { criar_api: ['exec.novo'] } });
    expect(next.entities).toEqual(['criar_api', 'criar_site', 'novo']);
    expect(next.guides.criar_api).toEqual(['ctx.a', 'prep.b', 'exec.novo']);
  });
});
