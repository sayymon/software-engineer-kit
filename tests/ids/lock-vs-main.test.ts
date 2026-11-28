// SPDX-License-Identifier: MIT
// Guarda do content/ids.lock.json: o lock só pode crescer em relação à main (Requisitos 10.5, 10.6).
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import type { IdLock } from '../../lib/ids';

const root = new URL('../../', import.meta.url).pathname;

/** Lista os ids presentes no lock base e ausentes no lock atual (entidades e passos de guia). */
export function idsRemovidos(base: IdLock, atual: IdLock): string[] {
  const out: string[] = [];
  const entidades = new Set(atual.entities);
  for (const id of base.entities) if (!entidades.has(id)) out.push(id);
  for (const [guia, passos] of Object.entries(base.guides)) {
    const atuais = atual.guides[guia];
    if (!atuais) {
      out.push(`${guia} (guia)`);
      continue;
    }
    const set = new Set(atuais);
    for (const p of passos) if (!set.has(p)) out.push(`${guia}/${p}`);
  }
  return out;
}

function lockBase(): { ref: string; lock: IdLock } | null {
  for (const ref of ['main', 'origin/main']) {
    try {
      const txt = execFileSync('git', ['show', `${ref}:content/ids.lock.json`], {
        cwd: root,
        encoding: 'utf8',
        maxBuffer: 64 * 1024 * 1024,
        stdio: ['ignore', 'pipe', 'ignore'],
      });
      return { ref, lock: JSON.parse(txt) as IdLock };
    } catch {
      // tenta a próxima referência
    }
  }
  return null;
}

describe('idsRemovidos', () => {
  const base: IdLock = { entities: ['a', 'b'], guides: { g: ['p1', 'p2'] } };
  it('não reporta nada quando o lock só cresce', () => {
    expect(idsRemovidos(base, { entities: ['a', 'b', 'c'], guides: { g: ['p1', 'p2', 'p3'], h: ['x'] } })).toEqual([]);
  });
  it('detecta entidade, guia e passo removidos', () => {
    expect(idsRemovidos(base, { entities: ['a'], guides: { g: ['p1'] } })).toEqual(['b', 'g/p2']);
    expect(idsRemovidos(base, { entities: ['a', 'b'], guides: {} })).toEqual(['g (guia)']);
  });
});

describe('content/ids.lock.json contra a main', () => {
  const base = lockBase();
  if (!base) {
    it.skip('pulado: nem `main` nem `origin/main` existem neste clone (rode `git fetch origin main`)', () => {});
    return;
  }
  it(`não perde nenhum id em relação a ${base.ref}`, () => {
    const atual = JSON.parse(readFileSync(`${root}content/ids.lock.json`, 'utf8')) as IdLock;
    expect(idsRemovidos(base.lock, atual)).toEqual([]);
  });
});
