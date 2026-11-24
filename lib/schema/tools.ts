// SPDX-License-Identifier: MIT
import { z } from 'zod';
import {
  BASE_TRANSLATABLE,
  baseShape,
  httpsUrl,
  isoDate,
  numberOrUnverified,
  text,
  wikilink,
  wikilinkOrRow,
  wikilinks,
} from './common';

const vocab = z.array(z.string());
const kebab = z.string().regex(/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/);

export const Ferramenta = z.strictObject({
  ...baseShape,
  tipo: z.literal('ferramenta'),
  tipos: vocab.optional(),
  empresa: wikilink.or(text).optional(),
  categorias: wikilinks.optional(),
  funcionalidades: wikilinks.optional(),
  casosDeUso: wikilinks.optional(),
  modelos: wikilinks.optional(),
  modeloContratacao: vocab.optional(),
  precoUSD: numberOrUnverified.optional(),
  precoMedio: z.number().optional(),
  plataformas: vocab.optional(),
  linguagens: vocab.optional(),
  porte: vocab.optional(),
  segmentos: vocab.optional(),
  restricoes: vocab.optional(),
  fontePreco: z.string().optional(),
  /** SPDX ids of the licenses confirmed from an official source (see the `licenca` notes). Empty when unknown. */
  licenca: z.array(text).optional(),
});
export const FERRAMENTA_TRANSLATABLE = [...BASE_TRANSLATABLE, 'restricoes'] as const;

export const Categoria = z.strictObject({
  ...baseShape,
  tipo: z.literal('categoria'),
  slug: kebab,
  grupo: text,
  maisBarata: z.array(wikilinkOrRow).max(3).optional(),
  custoBeneficio: z.array(wikilinkOrRow).max(3).optional(),
  qualidadeMaxima: z.array(wikilinkOrRow).max(3).optional(),
  essenciais: z.array(wikilinkOrRow).max(3).optional(),
  excecao: z.string().optional(),
  guia: z.array(z.string()).optional(),
});
export const CATEGORIA_TRANSLATABLE = [...BASE_TRANSLATABLE, 'grupo', 'excecao'] as const;

const parametro = z.strictObject({
  chave: text,
  valor: z.union([z.string(), z.number(), z.boolean()]),
  fonte: text,
});

const variacao = z.strictObject({
  id: kebab,
  nome: text,
  descricao: z.string().optional(),
  funcionalidades: wikilinks.optional(),
  herdaFerramentas: z.boolean(),
  maisBarata: z.array(wikilinkOrRow).optional(),
  custoBeneficio: z.array(wikilinkOrRow).optional(),
  qualidadeMaxima: z.array(wikilinkOrRow).optional(),
  justificativaFerramentas: z.string().optional(),
  excecao: z.string().optional(),
  parametros: z.array(parametro).optional(),
  verificadoEm: isoDate.optional(),
});

export const CasoDeUso = z.strictObject({
  ...baseShape,
  tipo: z.literal('caso-de-uso'),
  nivel: z.enum(['macro', 'caso']),
  eixo: z.enum(['tarefa', 'cenario']).optional(),
  /** Empty string for macro level use cases (no parent). */
  macro: wikilink.or(z.literal('')).optional(),
  funcionalidadesNecessarias: wikilinks.optional(),
  categoriasRelacionadas: wikilinks.optional(),
  ferramentasRecomendadas: wikilinks.optional(),
  modelosRecomendados: wikilinks.optional(),
  criteriosDesempate: vocab.optional(),
  criterioPadrao: z.enum(['custo', 'privacidade-de-dados', 'lock-in']).optional(),
  porte: vocab.optional(),
  segmentos: vocab.optional(),
  nicho: z.string().optional(),
  faixasPadrao: z
    .strictObject({
      maisBarata: z.array(wikilinkOrRow).optional(),
      custoBeneficio: z.array(wikilinkOrRow).optional(),
      qualidadeMaxima: z.array(wikilinkOrRow).optional(),
    })
    .optional(),
  variacoes: z.array(variacao).optional(),
});
export const CASO_DE_USO_TRANSLATABLE = [...BASE_TRANSLATABLE, 'nicho'] as const;

export const Empresa = z.strictObject({
  ...baseShape,
  tipo: z.literal('empresa'),
  setor: z.string().optional(),
  website: httpsUrl.optional(),
  sede: z.string().optional(),
  ferramentas: wikilinks.optional(),
  modelos: wikilinks.optional(),
});
export const EMPRESA_TRANSLATABLE = [...BASE_TRANSLATABLE, 'setor'] as const;

export const Modelo = z.strictObject({
  ...baseShape,
  tipo: z.literal('modelo'),
  familia: z.string().optional(),
  empresa: wikilink.optional(),
  lancamento: isoDate.or(z.string().regex(/^\d{4}-\d{2}$/, 'month as YYYY-MM')).optional(),
  status: z.enum(['ativo', 'legado', 'preview', 'descontinuado']).optional(),
  idModeloApi: z.string().optional(),
  contextoTokens: numberOrUnverified.optional(),
  saidaMaxTokens: numberOrUnverified.optional(),
  modalidadesEntrada: vocab.optional(),
  modalidadesSaida: vocab.optional(),
  precoEntradaUSD: numberOrUnverified.optional(),
  precoSaidaUSD: numberOrUnverified.optional(),
  precoCacheUSD: numberOrUnverified.optional(),
  licenca: z.string().optional(),
  disponibilidade: z.array(z.enum(['api', 'assinatura', 'pesos-abertos'])).optional(),
  ferramentas: wikilinks.optional(),
  categorias: wikilinks.optional(),
  funcionalidades: wikilinks.optional(),
  casosDeUso: wikilinks.optional(),
  benchmarks: wikilinks.optional(),
  fontePreco: z.string().optional(),
});
export const MODELO_TRANSLATABLE = [...BASE_TRANSLATABLE] as const;

const resultado = z.strictObject({
  modelo: wikilink,
  valor: numberOrUnverified,
  unidade: z.string().optional(),
  origem: z.enum([
    'autodeclarado-fornecedor',
    'tabela-oficial-benchmark',
    'leaderboard-oficial',
    'artigo',
    'terceiro-independente',
    'não verificado',
  ]),
  fonte: z.string(),
  data: z.string(),
  nota: z.string().optional(),
});

export const Benchmark = z.strictObject({
  ...baseShape,
  tipo: z.literal('benchmark'),
  area: z.string(),
  avalia: z.string().optional(),
  metodo: z.string().optional(),
  metrica: z.string().optional(),
  escala: z.string().optional(),
  limitacoes: z.string().optional(),
  saturacao: z.enum(['baixa', 'media', 'alta', 'não verificado']).optional(),
  contaminacao: z.string().optional(),
  mantenedor: z.string().optional(),
  urlOficial: z.string().optional(),
  funcionalidadesMedidas: wikilinks.optional(),
  casosDeUsoRelacionados: wikilinks.optional(),
  modelosAvaliados: wikilinks.optional(),
  resultados: z.array(resultado).optional(),
});
export const BENCHMARK_TRANSLATABLE = [
  ...BASE_TRANSLATABLE,
  'avalia',
  'metodo',
  'metrica',
  'escala',
  'limitacoes',
  'contaminacao',
] as const;

export const Funcionalidade = z.strictObject({
  ...baseShape,
  tipo: z.literal('funcionalidade'),
});
export const FUNCIONALIDADE_TRANSLATABLE = [...BASE_TRANSLATABLE] as const;
