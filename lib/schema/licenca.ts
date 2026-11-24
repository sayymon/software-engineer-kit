// SPDX-License-Identifier: MIT
import { z } from 'zod';
import { baseShape, BASE_TRANSLATABLE, httpsUrl, statusEditorial, text, wikilinks } from './common';
/** Marker for facts the official sources did not confirm. */
export const UNVERIFIED = 'não verificado';
export const TIPOS_LICENCA = [
  'permissiva',
  'copyleft forte',
  'copyleft de rede',
  'copyleft fraco',
  'dominio publico',
  'source-available',
  'Creative Commons',
] as const;
const aprovacao = z.union([z.boolean(), z.literal(UNVERIFIED)]);
/** Software and content license entity (fundamentals/licenses). Facts that were not confirmed use "não verificado". */
export const Licenca = z.strictObject({
  ...baseShape,
  tipo: z.literal('licenca'),
  status: statusEditorial.default('rascunho'),
  /** Official SPDX identifier, for example `MIT` or `FSL-1.1-MIT`. */
  spdx: text,
  tipoLicenca: z.enum(TIPOS_LICENCA),
  permissoes: z.array(text).min(1),
  condicoes: z.array(text).min(1),
  limitacoes: z.array(text).min(1),
  clausulaPatentes: text,
  compatibilidade: z.array(text).min(1),
  quandoUsar: z.array(text).min(1),
  quandoEvitar: z.array(text).min(1),
  aprovacaoOSI: aprovacao,
  aprovacaoFSF: aprovacao,
  urlOficial: httpsUrl,
  /** Tools listed by hand. The tools that declare this license in `ferramenta.licenca` are listed by the site automatically. */
  ferramentasRelacionadas: wikilinks.optional(),
});
export const LICENCA_TRANSLATABLE = [
  ...BASE_TRANSLATABLE,
  'permissoes',
  'condicoes',
  'limitacoes',
  'clausulaPatentes',
  'compatibilidade',
  'quandoUsar',
  'quandoEvitar',
] as const;
