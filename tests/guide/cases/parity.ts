// SPDX-License-Identifier: MIT
// Stored-parity helpers for the guide loader and the Mermaid generator (tests/guide/oracle-parity.test.ts).
import { createHash } from 'node:crypto';

/** SHA-256 of the canonical (sorted keys) JSON of each top-level collection of the document. */
export function collectionHashes(doc: Record<string, unknown>): Record<string, string> {
  const sort = (v: unknown): unknown => {
    if (Array.isArray(v)) return v.map(sort);
    if (v && typeof v === 'object') return Object.fromEntries(Object.keys(v).sort().map((k) => [k, sort((v as Record<string, unknown>)[k])]));
    return v;
  };
  return Object.fromEntries(
    Object.keys(doc)
      .sort()
      .map((k) => [k, createHash('sha256').update(JSON.stringify(sort(doc[k]))).digest('hex')]),
  );
}
