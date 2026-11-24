// SPDX-License-Identifier: MIT
import { z } from 'zod';
import { BASE_TRANSLATABLE, baseShape, id, statusEditorial } from './common';

/** Demand sigla: 3 or 4 letters (feat, bug, inc ...). Practical guides keep the 3 letter list. */
const DEMAND_SIGLA_RE = /^[a-z]{3,4}$/;
const rawList = z.array(z.record(z.string(), z.unknown()));

/**
 * Guide demand flow envelope (content/pt-BR/flows/<id>.yaml). The lists keep the guide shapes
 * and are validated in depth by Ajv against schema/flows.schema.json.
 */
export const Demanda = z.strictObject({
  ...baseShape,
  tipo: z.literal('demanda'),
  sigla: z.string().regex(DEMAND_SIGLA_RE).optional(),
  biblioteca: z.boolean().optional(),
  status: statusEditorial.default('rascunho'),
  versao: z.number().int().optional(),
  ordem_das_demandas: z.array(id).optional(),
  artefatos: rawList.optional(),
  variaveis: rawList.optional(),
  papeis: rawList.optional(),
  decisor_construir_comprar_assinar: z.record(z.string(), z.unknown()).optional(),
  raias: rawList,
  decisoes: rawList,
  playbooks: rawList.optional(),
  celulas: rawList.optional(),
  requisitos: z.array(id).optional(),
  abordagens: z.array(id).optional(),
  tecnicas: z.array(id).optional(),
  categorias_ferramenta: z.array(id).optional(),
});
export const DEMANDA_TRANSLATABLE = [...BASE_TRANSLATABLE] as const;
