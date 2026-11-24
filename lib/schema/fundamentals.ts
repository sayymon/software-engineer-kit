// SPDX-License-Identifier: MIT
import { z } from 'zod';
import {
  CONCEITUAL_TRANSLATABLE,
  baseShape,
  bigO,
  bigOOrNa,
  conceitualShape,
  text,
  tradeoffs,
  wikilinkOrRow,
  wikilinks,
} from './common';

export const Padrao = z.strictObject({
  ...baseShape,
  ...conceitualShape,
  tipo: z.literal('padrao'),
  categorias: wikilinks.optional(),
  familia: z.enum(['distribuido-arquitetura', 'gof', 'ia']),
  subfamilia: z.string().optional(),
  problema: z.string().optional(),
  tradeoffs: tradeoffs.optional(),
  consequencias: z.array(text).optional(),
  padroesRelacionados: wikilinks.optional(),
  casosDeUso: wikilinks.optional(),
  variacoes: z.array(z.string()).optional(),
  ferramentas: z.array(wikilinkOrRow).optional(),
  notaCompleta: wikilinks.optional(),
});
export const PADRAO_TRANSLATABLE = [...CONCEITUAL_TRANSLATABLE, 'subfamilia', 'problema', 'tradeoffs', 'consequencias'] as const;

const implementacao = z.strictObject({
  linguagemReferencia: z.string(),
  versao: z.string(),
  bibliotecaPadrao: z.string().optional(),
  casosDeBorda: z.array(text).min(2).optional(),
});

export const AREAS_ALGORITMO = [
  'ordenacao',
  'busca',
  'grafos',
  'programacao-dinamica',
  'guloso',
  'divisao-e-conquista',
  'backtracking',
  'strings',
] as const;

export const Algoritmo = z.strictObject({
  ...baseShape,
  ...conceitualShape,
  tipo: z.literal('algoritmo'),
  area: z.enum(AREAS_ALGORITMO),
  subarea: z.string().optional(),
  categoria: z.string().optional(),
  entrada: z.string(),
  saida: z.string(),
  complexidade: z.strictObject({
    tempoMelhor: bigOOrNa,
    tempoMedio: bigOOrNa,
    tempoPior: bigO,
    memoria: z.string(),
    observacao: z.string().optional(),
  }),
  preCondicoes: z.array(text).min(1),
  limitacoes: z.array(text).min(1),
  casosDeUso: z.array(text).min(2),
  casosDeUsoKit: wikilinks.optional(),
  estruturasDeDados: wikilinks.optional(),
  algoritmosRelacionados: wikilinks.optional(),
  padroes: wikilinks.optional(),
  ferramentas: z.array(wikilinkOrRow).optional(),
  implementacao: implementacao.optional(),
});
export const ALGORITMO_TRANSLATABLE = [
  ...CONCEITUAL_TRANSLATABLE,
  'subarea',
  'categoria',
  'entrada',
  'saida',
  'preCondicoes',
  'limitacoes',
  'casosDeUso',
] as const;

export const EstruturaDeDados = z.strictObject({
  ...baseShape,
  ...conceitualShape,
  tipo: z.literal('estrutura-de-dados'),
  familia: z.enum(['linear', 'associativa', 'arvore', 'grafo', 'especializada']),
  operacoes: z
    .array(z.strictObject({ nome: text, melhor: bigOOrNa, medio: bigOOrNa, pior: bigO, observacao: z.string().optional() }))
    .min(1),
  memoria: bigO,
  propriedades: z.array(text).optional(),
  tradeoffs,
  casosDeBorda: z.array(text).min(2),
  casosDeUso: z.array(text).optional(),
  estruturasRelacionadas: wikilinks.optional(),
  algoritmosRelacionados: wikilinks.optional(),
  padroes: wikilinks.optional(),
  ferramentas: z.array(wikilinkOrRow).optional(),
  implementacao: implementacao.optional(),
});
export const ESTRUTURA_TRANSLATABLE = [...CONCEITUAL_TRANSLATABLE, 'propriedades', 'tradeoffs', 'casosDeBorda', 'casosDeUso'] as const;
