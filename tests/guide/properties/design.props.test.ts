// SPDX-License-Identifier: MIT
// Design properties 3, 4 and 5 (task 10.2 part 3). Property 8 lives in decisor-neutralidade.test.ts.
// Same conventions as validator.props.test.ts: fixed seed, endOnFailure (documents are large), fc.pre for preconditions.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { decidir, configDoGuia } from '../../../lib/decisor';
import { guideDir, loadGuideDoc } from '../../../lib/guide';
import { lacunasDeDados, rastrearDados, usosEmCondicoes } from '../../../lib/guide/rastreio';
import { validateGuide } from '../../../lib/guide/validate';
import { type D, invalidDocs, validDocs } from './geradores';
const root = new URL('../../../', import.meta.url).pathname;
const schema = JSON.parse(readFileSync(join(root, 'schema/flows.schema.json'), 'utf8'));
const params = (numRuns: number): fc.Parameters<unknown> => ({ numRuns, seed: 20240607, endOnFailure: true, verbose: 0 });
const TIMEOUT = 120_000;
const chave = (p: { code: string; nivel: string; path: string; itemId?: string | null }) => JSON.stringify([p.code, p.nivel, p.path, p.itemId ?? null]);
const deepFreeze = <T>(o: T): T => {
  if (o && typeof o === 'object' && !Object.isFrozen(o)) {
    Object.freeze(o);
    for (const v of Object.values(o)) deepFreeze(v);
  }
  return o;
};
/** Top-level field set to a value of the wrong type: always breaks the Schema. */
const quebraSchema = (doc: D, pick: number): D => {
  const novo = structuredClone(doc);
  const chaves = Object.keys(novo);
  novo[chaves[pick % chaves.length]] = 42;
  return novo;
};
// ------------------------------------------------------------------ Property 3
describe('propriedade 3 do design: curto-circuito do schema', () => {
  it('se existe problema SCHEMA, todos os problemas devolvidos são SCHEMA', () => {
    fc.assert(
      fc.property(invalidDocs(), fc.boolean(), fc.boolean(), ([, mutado], avisos, completude) => {
        const problemas = validateGuide(mutado, schema, { avisos, completude });
        fc.pre(problemas.some((p) => p.code === 'SCHEMA'));
        expect(problemas.every((p) => p.code === 'SCHEMA')).toBe(true);
      }),
      params(100),
    );
  }, TIMEOUT);
  it('mutações que quebram o schema (campo com tipo errado) só produzem SCHEMA', () => {
    fc.assert(
      fc.property(validDocs(), fc.integer({ min: 0, max: 10_000 }), fc.boolean(), (doc, pick, avisos) => {
        const problemas = validateGuide(quebraSchema(doc, pick), schema, { avisos, completude: avisos });
        fc.pre(problemas.some((p) => p.code === 'SCHEMA')); // some top-level fields accept any scalar
        expect(problemas.every((p) => p.code === 'SCHEMA')).toBe(true);
      }),
      params(100),
    );
  }, TIMEOUT);
});
// ------------------------------------------------------------------ Property 4
describe('propriedade 4 do design: monotonicidade do modo estrito', () => {
  const docs = fc.oneof(validDocs(), invalidDocs().map(([, m]) => m));
  it('problemas sem avisos estão contidos nos com avisos, e os extras são todos aviso (também com completude)', () => {
    fc.assert(
      fc.property(docs, fc.boolean(), (doc, completude) => {
        const sem = validateGuide(doc, schema, { avisos: false, completude });
        const com = validateGuide(doc, schema, { avisos: true, completude });
        const chavesCom = new Set(com.map(chave));
        for (const p of sem) expect(chavesCom.has(chave(p)), `perdido no modo estrito: ${chave(p)}`).toBe(true);
        const chavesSem = new Set(sem.map(chave));
        for (const p of com) if (!chavesSem.has(chave(p))) expect(p.nivel).toBe('aviso');
        expect(com.length).toBeGreaterThanOrEqual(sem.length);
      }),
      params(100),
    );
  }, TIMEOUT);
});
// ------------------------------------------------------------------ Property 5
describe('propriedade 5 do design: pureza', () => {
  const guia = loadGuideDoc(guideDir(`${root}content`));
  const config = configDoGuia(guia);
  const { min, max } = config.escala;
  const nota = fc.oneof(fc.integer({ min, max }), fc.double({ min, max, noNaN: true }));
  const notas = fc.record(Object.fromEntries(config.opcoes.map((o) => [o, fc.record(Object.fromEntries(config.criterios.map((c) => [c, nota])))])));
  const objetivo = fc.constantFrom(...Object.keys(config.pesos));
  const docs = fc.oneof(validDocs(), invalidDocs().map(([, m]) => m));
  it('validateGuide não altera a entrada e é determinístico', () => {
    fc.assert(
      fc.property(docs, fc.boolean(), fc.boolean(), (doc, avisos, completude) => {
        const antes = structuredClone(doc);
        const congelado = deepFreeze(structuredClone(doc)); // a mutation throws in strict mode (ESM)
        const a = validateGuide(congelado, schema, { avisos, completude });
        const b = validateGuide(doc, schema, { avisos, completude });
        expect(doc).toEqual(antes);
        expect(a).toEqual(b);
        expect(validateGuide(doc, schema, { avisos, completude })).toEqual(a);
      }),
      params(100),
    );
  }, TIMEOUT);
  it('rastrearDados, usosEmCondicoes e lacunasDeDados não alteram a entrada e são determinísticos', () => {
    fc.assert(
      fc.property(validDocs(), (doc) => {
        const antes = structuredClone(doc);
        const congelado = deepFreeze(structuredClone(doc));
        for (const f of [rastrearDados, usosEmCondicoes, lacunasDeDados] as Array<(d: unknown) => unknown>) {
          const a = f(congelado);
          expect(f(doc)).toEqual(a);
          expect(f(doc)).toEqual(a);
        }
        expect(doc).toEqual(antes);
      }),
      params(100),
    );
  }, TIMEOUT);
  it('decidir não altera notas nem config e devolve o mesmo resultado para a mesma entrada', () => {
    fc.assert(
      fc.property(objetivo, notas, (obj, n) => {
        const antes = structuredClone(n);
        const cfgAntes = structuredClone(config);
        const nf = deepFreeze(structuredClone(n));
        const a = decidir(config, obj, nf);
        expect(decidir(config, obj, n)).toEqual(a);
        expect(n).toEqual(antes);
        expect(config).toEqual(cfgAntes);
      }),
      { numRuns: 200, seed: 20240607, endOnFailure: true },
    );
  }, TIMEOUT);
});
