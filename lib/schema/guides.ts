// SPDX-License-Identifier: MIT
import { z } from 'zod';
import { CONCEITUAL_TRANSLATABLE, baseShape, conceitualShape, httpsUrl, id, isoDate, text, wikilinks, wikilinkOrRow } from './common';

/** Three-letter prefixes of raia and node ids. Mirrors the sigla list in the guias README. */
export const SIGLA_RE = /^[a-z]{3}$/;

export const raia = z.strictObject({
  id,
  nome: text,
  responsabilidade: z.string().optional(),
  cor: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  orquestradora: z.boolean().optional(),
});

const proximo = z.strictObject({ para: id, condicao: z.string() });

/** Node of a practical guide: kit shape (`nos`), which maps to guide `decisoes`. */
export const no = z.strictObject({
  id,
  raia: id,
  tipo: z.enum(['inicio', 'tarefa', 'bifurcacao', 'chamada', 'fim']),
  rotulo: z.string(),
  proximo: z.array(proximo).optional(),
  raia_chamada: id.optional(),
  retorno: z.string().optional(),
  eixo: z.string().optional(),
  pergunta: z.string().optional(),
  passos: z.array(z.string()).optional(),
  saida: z.record(z.string(), z.unknown()).optional(),
  laco: z.unknown().optional(),
});

const passo = z.strictObject({
  id: z.string().regex(/^(ctx|prep|exec|val|ent|ops)\.[a-z][a-z0-9]*(_[a-z0-9]+)*$/),
  titulo: text,
  descricao: text,
  verificacao: text,
  depende: z.array(z.string()).optional(),
});

const blocoComoFazerHoje = z.strictObject({
  passo: z.string(),
  variante: z.string().optional(),
  comandos: z.array(z.string()),
  versaoTestada: z.string(),
  dataVerificacao: isoDate,
  fonteUrl: httpsUrl,
});

export const GuiaPratico = z.strictObject({
  ...baseShape,
  ...conceitualShape,
  tipo: z.literal('guia-pratico'),
  sigla: z.string().regex(SIGLA_RE),
  grupo: z.enum([
    'Configurar o ambiente',
    'Construir software',
    'IA aplicada',
    'Qualidade entrega e operação',
    'Segurança',
  ]),
  objetivo: z.string().optional(),
  preRequisitos: z.array(text).optional(),
  perguntasDecisao: z
    .array(z.strictObject({ id: z.string().regex(/^q\.[a-z][a-z0-9]*(_[a-z0-9]+)*$/), pergunta: text, eixo: z.string().optional() }))
    .min(3)
    .optional(),
  raias: z.array(raia).min(1),
  nos: z.array(no).min(2),
  passos: z.array(passo).min(6).optional(),
  comoFazerHoje: z.array(blocoComoFazerHoje).optional(),
  checklistRefs: z.record(z.string(), z.string()).optional(),
  armadilhas: z.array(text).min(3).optional(),
  validacao: z.array(text).min(3).optional(),
  padroes: wikilinks.min(2).optional(),
  categorias: wikilinks.min(3).optional(),
  stacks: wikilinks.optional(),
  ferramentas: z.array(wikilinkOrRow).optional(),
  casosDeUso: wikilinks.optional(),
  variacoes: z.array(z.string()).optional(),
  certificacoes: wikilinks.optional(),
});
export const GUIA_PRATICO_TRANSLATABLE = [
  ...CONCEITUAL_TRANSLATABLE,
  'objetivo',
  'preRequisitos',
  'armadilhas',
  'validacao',
  'perguntasDecisao',
  'passos',
] as const;
