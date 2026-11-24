// SPDX-License-Identifier: MIT
import { z } from 'zod';
import {
  BASE_TRANSLATABLE,
  CONCEITUAL_TRANSLATABLE,
  baseShape,
  conceitualShape,
  httpsUrl,
  id,
  numberOrUnverified,
  text,
  wikilinks,
} from './common';

export const Certificacao = z.strictObject({
  ...baseShape,
  tipo: z.literal('certificacao'),
  emissor: z.string(),
  emissorEmpresa: z.string().optional(),
  area: z.enum(['tecnica', 'soft-skill', 'ia']),
  nivel: z.enum(['fundamental', 'associado', 'profissional', 'especialista']),
  formato: z.string().optional(),
  custoUSD: numberOrUnverified.optional(),
  validade: z.string().optional(),
  renovacao: z.string().optional(),
  preRequisitos: z.string().optional(),
  oQueComprova: z.string().optional(),
  paraQuem: z.string().optional(),
  urlOficial: httpsUrl,
  status: z.enum(['ativa', 'descontinuada', 'em transição']),
  observacoes: z.string().optional(),
  ferramentasRelacionadas: wikilinks.optional(),
  categoriasRelacionadas: wikilinks.optional(),
  habilidadesRelacionadas: wikilinks.optional(),
});
export const CERTIFICACAO_TRANSLATABLE = [
  ...BASE_TRANSLATABLE,
  'formato',
  'validade',
  'renovacao',
  'preRequisitos',
  'oQueComprova',
  'paraQuem',
  'observacoes',
] as const;

/** Layer hub (map of tools, patterns, stacks...). Children are listed by id and resolved at build. */
export const Hub = z.strictObject({
  ...baseShape,
  tipo: z.literal('hub'),
  camada: z.enum(['tools', 'ai', 'fundamentals', 'stacks', 'guides', 'certifications', 'flows', 'journeys']),
  ordem: z.number().int().optional(),
  itens: wikilinks.optional(),
});
export const HUB_TRANSLATABLE = [...BASE_TRANSLATABLE] as const;

const etapa = z.strictObject({
  id,
  titulo: text,
  descricao: z.string().optional(),
  itens: wikilinks.optional(),
});

export const Jornada = z.strictObject({
  ...baseShape,
  tipo: z.literal('jornada'),
  perfil: z.string().optional(),
  etapas: z.array(etapa).min(1),
  certificacoes: wikilinks.optional(),
  competencias: wikilinks.optional(),
});
export const JORNADA_TRANSLATABLE = [...BASE_TRANSLATABLE, 'perfil', 'etapas'] as const;

export const Competencia = z.strictObject({
  ...baseShape,
  tipo: z.literal('competencia'),
  area: z.string(),
  niveis: z
    .array(z.strictObject({ nivel: z.enum(['fundamental', 'intermediario', 'avancado']), descricao: text, evidencias: z.array(text).optional() }))
    .min(1)
    .optional(),
  /** Half-life layer of the competency map (fundamentos, distribuida, ia, soft skills). */
  meiaVida: z.string().optional(),
  estudo: z.string().optional(),
  itens: z.array(z.strictObject({ nome: text, detalhe: z.string().optional() })).optional(),
  habilidades: wikilinks.optional(),
  certificacoes: wikilinks.optional(),
});
export const COMPETENCIA_TRANSLATABLE = [...BASE_TRANSLATABLE, 'area', 'niveis', 'meiaVida', 'estudo', 'itens'] as const;

/** Guide `ItemConceitual` kinds: tecnica, abordagem, estrategia, requisito. */
const conceitual = { ...baseShape, ...conceitualShape };

export const Tecnica = z.strictObject({
  ...conceitual,
  /** Guide techniques accept a single `quando_usar` entry (the kit conceptual notes require two). */
  quando_usar: z.array(text).min(1).optional(),
  tipo: z.literal('tecnica'),
  /** Guide technique fields kept 1:1 (free text lists and structures). */
  como_aplicar: z.array(z.string()).optional(),
  resultado_esperado: z.string().optional(),
  perspectivas: z.unknown().optional(),
  formato_de_comentario: z.unknown().optional(),
  boas_praticas: z.unknown().optional(),
  niveis: z.unknown().optional(),
  classificacao_de_comentarios: z.unknown().optional(),
});
export const Abordagem = z.strictObject({ ...conceitual, tipo: z.literal('abordagem') });
export const Estrategia = z.strictObject({ ...conceitual, tipo: z.literal('estrategia') });
export const Requisito = z.strictObject({
  ...conceitual,
  tipo: z.literal('requisito'),
  categoria: z.enum(['funcional', 'nao-funcional']).optional(),
});
export const CONCEITUAL_ONLY_TRANSLATABLE = [...CONCEITUAL_TRANSLATABLE] as const;
