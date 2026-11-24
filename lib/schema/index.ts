// SPDX-License-Identifier: MIT
import { createHash } from 'node:crypto';
import { z } from 'zod';
import { id, isoDate } from './common';
import {
  Abordagem,
  CERTIFICACAO_TRANSLATABLE,
  COMPETENCIA_TRANSLATABLE,
  CONCEITUAL_ONLY_TRANSLATABLE,
  Certificacao,
  Competencia,
  Estrategia,
  HUB_TRANSLATABLE,
  Hub,
  JORNADA_TRANSLATABLE,
  Jornada,
  Requisito,
  Tecnica,
} from './catalog';
import { DEMANDA_TRANSLATABLE, Demanda } from './flows';
import {
  ALGORITMO_TRANSLATABLE,
  Algoritmo,
  ESTRUTURA_TRANSLATABLE,
  EstruturaDeDados,
  PADRAO_TRANSLATABLE,
  Padrao,
} from './fundamentals';
import { GUIA_PRATICO_TRANSLATABLE, GuiaPratico } from './guides';
import { LICENCA_TRANSLATABLE, Licenca } from './licenca';
import { STACK_TRANSLATABLE, Stack } from './stacks';
import {
  BENCHMARK_TRANSLATABLE,
  Benchmark,
  CASO_DE_USO_TRANSLATABLE,
  CATEGORIA_TRANSLATABLE,
  CasoDeUso,
  Categoria,
  EMPRESA_TRANSLATABLE,
  Empresa,
  FERRAMENTA_TRANSLATABLE,
  FUNCIONALIDADE_TRANSLATABLE,
  Ferramenta,
  Funcionalidade,
  MODELO_TRANSLATABLE,
  Modelo,
} from './tools';

export * from './common';

/** Every entity type with its Zod schema and the front matter fields a locale overlay may translate. */
export const TYPES = {
  ferramenta: { schema: Ferramenta, translatable: FERRAMENTA_TRANSLATABLE },
  categoria: { schema: Categoria, translatable: CATEGORIA_TRANSLATABLE },
  'caso-de-uso': { schema: CasoDeUso, translatable: CASO_DE_USO_TRANSLATABLE },
  empresa: { schema: Empresa, translatable: EMPRESA_TRANSLATABLE },
  modelo: { schema: Modelo, translatable: MODELO_TRANSLATABLE },
  benchmark: { schema: Benchmark, translatable: BENCHMARK_TRANSLATABLE },
  funcionalidade: { schema: Funcionalidade, translatable: FUNCIONALIDADE_TRANSLATABLE },
  padrao: { schema: Padrao, translatable: PADRAO_TRANSLATABLE },
  algoritmo: { schema: Algoritmo, translatable: ALGORITMO_TRANSLATABLE },
  'estrutura-de-dados': { schema: EstruturaDeDados, translatable: ESTRUTURA_TRANSLATABLE },
  stack: { schema: Stack, translatable: STACK_TRANSLATABLE },
  'guia-pratico': { schema: GuiaPratico, translatable: GUIA_PRATICO_TRANSLATABLE },
  certificacao: { schema: Certificacao, translatable: CERTIFICACAO_TRANSLATABLE },
  licenca: { schema: Licenca, translatable: LICENCA_TRANSLATABLE },
  hub: { schema: Hub, translatable: HUB_TRANSLATABLE },
  demanda: { schema: Demanda, translatable: DEMANDA_TRANSLATABLE },
  jornada: { schema: Jornada, translatable: JORNADA_TRANSLATABLE },
  competencia: { schema: Competencia, translatable: COMPETENCIA_TRANSLATABLE },
  tecnica: { schema: Tecnica, translatable: CONCEITUAL_ONLY_TRANSLATABLE },
  abordagem: { schema: Abordagem, translatable: CONCEITUAL_ONLY_TRANSLATABLE },
  estrategia: { schema: Estrategia, translatable: CONCEITUAL_ONLY_TRANSLATABLE },
  requisito: { schema: Requisito, translatable: CONCEITUAL_ONLY_TRANSLATABLE },
} as const;

export type Tipo = keyof typeof TYPES;
export const TIPOS = Object.keys(TYPES) as Tipo[];

/** Source `tipo` values (CamelCase) to kit `tipo` values. Used by the migration. */
export const SOURCE_TIPO_MAP: Record<string, Tipo> = {
  Ferramenta: 'ferramenta',
  Categoria: 'categoria',
  CasoDeUso: 'caso-de-uso',
  Empresa: 'empresa',
  Modelo: 'modelo',
  Benchmark: 'benchmark',
  Funcionalidade: 'funcionalidade',
  Padrao: 'padrao',
  Algoritmo: 'algoritmo',
  EstruturaDeDados: 'estrutura-de-dados',
  Stack: 'stack',
  GuiaPratico: 'guia-pratico',
  Certificacao: 'certificacao',
};

/** Discriminated union on `tipo` (single source of truth for entity validation). */
export const Entity = z.discriminatedUnion('tipo', [
  Ferramenta,
  Categoria,
  CasoDeUso,
  Empresa,
  Modelo,
  Benchmark,
  Funcionalidade,
  Padrao,
  Algoritmo,
  EstruturaDeDados,
  Stack,
  GuiaPratico,
  Certificacao,
  Licenca,
  Hub,
  Demanda,
  Jornada,
  Competencia,
  Tecnica,
  Abordagem,
  Estrategia,
  Requisito,
]);
export type Entity = z.infer<typeof Entity>;

export type ValidationIssue = { path: string; message: string };
export type ValidationResult<T = Entity> = { ok: true; data: T } | { ok: false; issues: ValidationIssue[] };

function toIssues(error: z.ZodError): ValidationIssue[] {
  return error.issues.map((i) => ({ path: i.path.join('.'), message: i.message }));
}

export function validateEntity(input: unknown): ValidationResult {
  const parsed = Entity.safeParse(input);
  return parsed.success ? { ok: true, data: parsed.data } : { ok: false, issues: toIssues(parsed.error) };
}

/** Front matter fields of the type that a locale overlay may carry (`body` is the Markdown body). */
export function translatableFields(tipo: Tipo): readonly string[] {
  return TYPES[tipo].translatable;
}

/** Canonical hash of the translatable part of a pt-BR source entity. Stored in the overlay as `source_hash`. */
export function sourceHash(tipo: Tipo, source: Record<string, unknown>, body = ''): string {
  const subset: Record<string, unknown> = {};
  for (const key of [...translatableFields(tipo)].sort()) {
    if (key === 'body') subset.body = body.trim();
    else if (key in source) subset[key] = source[key];
  }
  return createHash('sha256').update(canonicalJson(subset)).digest('hex');
}

export function canonicalJson(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(',')}]`;
  if (value && typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>)
      .filter(([, v]) => v !== undefined)
      .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
    return `{${entries.map(([k, v]) => `${JSON.stringify(k)}:${canonicalJson(v)}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

/**
 * Overlay schema for a type: the id, the pt-BR source hash and only the translatable fields,
 * each optional. Structural fields (ids, relations, numbers) cannot appear in a locale overlay.
 */
export function overlaySchema(tipo: Tipo) {
  const shape = (TYPES[tipo].schema as unknown as z.ZodObject).shape as Record<string, z.ZodType>;
  const picked: Record<string, z.ZodType> = {};
  for (const key of translatableFields(tipo)) {
    if (key === 'body' || !(key in shape) || key === 'id') continue;
    picked[key] = unwrapOptional(shape[key]).optional();
  }
  return z.strictObject({
    id,
    tipo: z.literal(tipo),
    source_hash: z.string().regex(/^[a-f0-9]{64}$/, 'source_hash must be a sha256 hex digest'),
    translated_at: isoDate.optional(),
    ...picked,
  });
}

function unwrapOptional(schema: z.ZodType): z.ZodType {
  let current: z.ZodType = schema;
  // Only optional and default wrappers are removed; arrays and objects keep their shape.
  for (;;) {
    const def = (current as unknown as { _zod: { def: { type: string; innerType?: z.ZodType } } })._zod.def;
    if ((def.type === 'optional' || def.type === 'default') && def.innerType) current = def.innerType;
    else return current;
  }
}

export function validateOverlay(tipo: Tipo, input: unknown): ValidationResult<Record<string, unknown>> {
  const parsed = overlaySchema(tipo).safeParse(input);
  return parsed.success
    ? { ok: true, data: parsed.data as Record<string, unknown> }
    : { ok: false, issues: toIssues(parsed.error) };
}

/** JSON Schema (draft 2020-12) for a type, for editors and non-TS consumers. */
export function jsonSchemaFor(tipo: Tipo): Record<string, unknown> {
  const schema = z.toJSONSchema(TYPES[tipo].schema, { io: 'input', unrepresentable: 'any' }) as Record<string, unknown>;
  return { title: tipo, 'x-translatable': [...translatableFields(tipo)], ...schema };
}
