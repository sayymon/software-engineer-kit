// SPDX-License-Identifier: MIT
// fast-check generators for the Modelo_de_Grafo property tests. Documents come from `validDocs()` (random valid guides)
// and from the 12 real demands of the guide; each case is a [document, demand id] pair of a non-library demand with lanes.
import fc from 'fast-check';
import { guideDir, loadGuideDoc } from '../../lib/guide';
import { validDocs, type D } from '../guide/properties/geradores';

export type Caso = { origem: 'aleatorio' | 'real'; doc: D; demanda: string };

const root = new URL('../../', import.meta.url).pathname;

/** The real guide document (loaded once). */
export const guiaReal: D = loadGuideDoc(guideDir(`${root}content`)) as D;

/** Ids of non-library demands that own at least one lane. */
export const demandasComRaias = (doc: D): string[] =>
  (doc.demandas as D[])
    .filter((d) => d.biblioteca !== true && (doc.raias as D[]).some((r) => r.demanda === d.id))
    .map((d) => String(d.id));

/** A random valid document plus one of its demands. */
export const casosAleatorios = (): fc.Arbitrary<Caso> =>
  validDocs().chain((doc) =>
    fc.constantFrom(...demandasComRaias(doc)).map((demanda): Caso => ({ origem: 'aleatorio', doc, demanda })),
  );

/** One of the real demands. */
export const casosReais = (): fc.Arbitrary<Caso> =>
  fc.constantFrom(...demandasComRaias(guiaReal)).map((demanda): Caso => ({ origem: 'real', doc: guiaReal, demanda }));

/** Random and real cases, with the random ones dominating. */
export const casos = (): fc.Arbitrary<Caso> => fc.oneof({ weight: 4, arbitrary: casosAleatorios() }, { weight: 1, arbitrary: casosReais() });
