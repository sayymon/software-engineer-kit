// SPDX-License-Identifier: MIT
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { loadContent } from '../../lib/content';
import { checkLock, type IdLock } from '../../lib/ids';

const root = new URL('../../', import.meta.url).pathname;
const frozen = JSON.parse(readFileSync(`${root}schema/ids-frozen.json`, 'utf8')) as Record<string, string[]>;
const lock = JSON.parse(readFileSync(`${root}content/ids.lock.json`, 'utf8')) as IdLock;
const { entities } = loadContent(`${root}content`, 'pt-BR');
const guides = Object.fromEntries(entities.filter((e) => e.tipo === 'guia-pratico').map((e) => [e.id, ((e.data.passos as Array<{ id: string }>) ?? []).map((p) => p.id)]));

describe('frozen guide ids', () => {
  it('keeps all 34 guia ids and every step id from the frozen list', () => {
    expect(Object.keys(frozen)).toHaveLength(34);
    for (const [guide, steps] of Object.entries(frozen)) {
      expect(guides[guide], `guide ${guide}`).toBeDefined();
      for (const step of steps) expect(guides[guide], `${guide}/${step}`).toContain(step);
    }
  });
  it('locks every guide and every entity id of the content', () => {
    for (const guide of Object.keys(frozen)) expect(lock.guides[guide]).toEqual(expect.arrayContaining(frozen[guide]));
    const locked = new Set(lock.entities);
    for (const e of entities) expect(locked.has(e.id), e.id).toBe(true);
    expect(checkLock(lock, { ids: entities.map((e) => e.id), guides })).toEqual([]);
  });
  it('detects a removed or renamed id', () => {
    const ids = entities.map((e) => e.id).filter((id) => id !== 'circuit_breaker');
    expect(checkLock(lock, { ids, guides }).map((p) => p.kind)).toContain('locked-missing');
    const renamed = { ...guides, criar_api: guides.criar_api.filter((s) => s !== frozen.criar_api[0]) };
    expect(checkLock(lock, { ids: entities.map((e) => e.id), guides: renamed }).map((p) => p.kind)).toContain('locked-step-missing');
  });
});
