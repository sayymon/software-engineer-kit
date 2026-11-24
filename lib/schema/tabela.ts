// SPDX-License-Identifier: MIT
import { z } from 'zod';
import { httpsUrl, isoDate } from './common';

/** Row of the tool tables (tools without an atomic note). Keeps the source row contract 1:1. */
const rowId = z.string().regex(/^[a-z0-9][a-z0-9_.-]*$/, 'row id must be lowercase ascii');
const stringList = z.array(z.string());

const precoVerificado = z.strictObject({
  modelo: stringList,
  usd: z.number(),
  unidade: z.string(),
  status: z.literal('verificado'),
  fonte: httpsUrl,
  data: isoDate,
});
const precoNaoVerificado = z.strictObject({
  modelo: stringList,
  usd: z.null(),
  unidade: z.null().optional(),
  status: z.literal('nao-verificado'),
  fonte: z.null(),
  data: z.union([isoDate, z.null()]).optional(),
});

export const TabelaRow = z.strictObject({
  id: rowId,
  nome: z.string().min(1),
  categorias: stringList.min(1),
  empresa: z.string().optional(),
  url: z.string().optional(),
  preco: z.discriminatedUnion('status', [precoVerificado, precoNaoVerificado]),
  plataformas: stringList,
  linguagens: stringList,
  porte: stringList,
  segmentos: stringList,
  nota: z.string().optional(),
});
export type TabelaRow = z.infer<typeof TabelaRow>;
export const TabelaRows = z.array(TabelaRow);
