// SPDX-License-Identifier: MIT
// Sanity of the generators ported from strategies.py (task 10.1): what they promise is what they produce.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { validateGuide } from '../../../lib/guide/validate';
import { MUTATIONS, blocklists, docText, hostileText, invalidDocs, noteTexts, validDocs } from './geradores';

const root = new URL('../../../', import.meta.url).pathname;
const schema = JSON.parse(readFileSync(join(root, 'schema/flows.schema.json'), 'utf8'));
const runs = { numRuns: 60 };

describe('geradores (port de strategies.py)', () => {
  it('validDocs: sem problemas, nem avisos', () => {
    fc.assert(
      fc.property(validDocs(), (doc) => {
        expect(validateGuide(doc, schema, { avisos: true })).toEqual([]);
      }),
      runs,
    );
  });

  it('docText: sem travessões, hífen, três pontos nem espaços nas pontas', () => {
    fc.assert(
      fc.property(docText(), (s) => {
        expect(s).toBe(s.trim());
        expect(s.length).toBeGreaterThan(0);
        expect(s).not.toMatch(/[\u2014\u2013-]/);
        expect(s).not.toContain('...');
      }),
    );
  });

  it('invalidDocs: o original é válido e a mutação produz problemas', () => {
    fc.assert(
      fc.property(invalidDocs(), ([original, mutado, descricao]) => {
        expect(descricao.length).toBeGreaterThan(0);
        expect(validateGuide(original, schema)).toEqual([]);
        expect(validateGuide(mutado, schema).length).toBeGreaterThan(0);
      }),
      runs,
    );
    expect(MUTATIONS).toHaveLength(3);
  });

  it('textos: notas sem travessões, blocklists distintas, texto hostil não vazio', () => {
    fc.assert(
      fc.property(noteTexts(['<!-- inicio -->']), blocklists(), hostileText(), (nota, bloqueados, hostil) => {
        expect(nota).not.toMatch(/[\u2014\u2013]/);
        expect(bloqueados.length).toBeGreaterThanOrEqual(1);
        expect(bloqueados.length).toBeLessThanOrEqual(5);
        expect(new Set(bloqueados.map((b) => b.toLowerCase())).size).toBe(bloqueados.length);
        expect(hostil.length).toBeGreaterThan(0);
      }),
    );
  });
});
