// SPDX-License-Identifier: MIT
import { ID_RE } from '../schema/common';

export type IdRecord = { id: string; file: string; tipo?: string };

/** Frozen ids (content/ids.lock.json): entity ids plus the step ids of each practical guide. */
export type IdLock = {
  entities: string[];
  guides: Record<string, string[]>;
};

export type IdProblem = { kind: 'invalid' | 'duplicate' | 'locked-missing' | 'locked-step-missing' | 'locked-guide-missing'; id: string; detail: string };

/** Ids must match the contract regex and be globally unique (the file name equals the id). */
export function checkIds(records: IdRecord[]): IdProblem[] {
  const problems: IdProblem[] = [];
  const seen = new Map<string, string>();
  for (const r of records) {
    if (!ID_RE.test(r.id)) problems.push({ kind: 'invalid', id: r.id, detail: `${r.file}: id does not match ${ID_RE}` });
    const first = seen.get(r.id);
    if (first !== undefined) problems.push({ kind: 'duplicate', id: r.id, detail: `${r.file} repeats the id of ${first}` });
    else seen.set(r.id, r.file);
  }
  return problems;
}

/**
 * A locked id must not disappear or change. Appending new ids is allowed.
 * `current.guides` maps each guide id to the ids of its steps (`passos[].id`).
 */
export function checkLock(lock: IdLock, current: { ids: Iterable<string>; guides: Record<string, string[]> }): IdProblem[] {
  const problems: IdProblem[] = [];
  const ids = new Set(current.ids);
  for (const id of lock.entities) {
    if (!ids.has(id)) problems.push({ kind: 'locked-missing', id, detail: 'locked id is not present in content' });
  }
  for (const [guide, steps] of Object.entries(lock.guides)) {
    const now = current.guides[guide];
    if (!now) {
      problems.push({ kind: 'locked-guide-missing', id: guide, detail: 'locked guide is not present in content' });
      continue;
    }
    const present = new Set(now);
    for (const step of steps) {
      if (!present.has(step)) problems.push({ kind: 'locked-step-missing', id: `${guide}/${step}`, detail: 'locked step id is not present' });
    }
  }
  return problems;
}

/** Lock that adds the ids found in `current` to `lock` (never removes). */
export function appendToLock(lock: IdLock, current: { ids: Iterable<string>; guides: Record<string, string[]> }): IdLock {
  const entities = [...new Set([...lock.entities, ...current.ids])].sort();
  const guides: Record<string, string[]> = { ...lock.guides };
  for (const [guide, steps] of Object.entries(current.guides)) {
    guides[guide] = [...new Set([...(guides[guide] ?? []), ...steps])];
  }
  return { entities, guides };
}

/** Seed from `schema/ids-frozen.json` (guide id to list of step ids). */
export function lockFromFrozen(frozen: Record<string, string[]>): IdLock {
  return { entities: Object.keys(frozen).sort(), guides: { ...frozen } };
}
