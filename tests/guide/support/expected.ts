// SPDX-License-Identifier: MIT
// Helpers for the stored outputs in tests/guide/expected/. They were recorded once from the Python oracle (since removed);
// the files are now the source of truth. Regenerate one only deliberately, by hand, after reviewing the behavior change.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { guideDir, loadGuideDoc } from '../../../lib/guide';
import { validateGuide } from '../../../lib/guide/validate';

export const root = new URL('../../../', import.meta.url).pathname;
export const expectedDir = join(root, 'tests/guide/expected');
export const schema = JSON.parse(readFileSync(join(root, 'schema/flows.schema.json'), 'utf8'));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type D = any;
export type Flags = { avisos?: boolean; completude?: boolean };

/** One issue as the oracle prints it (recorded from the oracle). */
export interface IssueRow {
  code: string;
  nivel: string;
  path: string;
  item_id: string | null;
  message: string;
}

let cached: D;
/** A fresh deep copy of the real guide document. */
export const realDoc = (): D => {
  cached ??= loadGuideDoc(guideDir(`${root}content`));
  return JSON.parse(JSON.stringify(cached));
};


/** TypeScript validator output in the oracle row shape, in emission order. */
export const tsRows = (doc: D, flags: Flags = {}): IssueRow[] =>
  validateGuide(doc, schema, { ...flags }).map((i) => ({ code: i.code, nivel: i.nivel, path: i.path, item_id: i.itemId ?? null, message: i.message }));

export function readExpected<T>(name: string): T {
  return JSON.parse(readFileSync(join(expectedDir, name), 'utf8')) as T;
}
