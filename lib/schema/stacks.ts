// SPDX-License-Identifier: MIT
import { z } from 'zod';
import { CONCEITUAL_TRANSLATABLE, baseShape, conceitualShape, id, text, wikilink, wikilinkOrRow, wikilinks } from './common';

export const CHECKLIST_ID_RE = /^(amb|repo|cicd|iac|obs|seg|custo|dados|teste|rel|doc|ops|ia)\.[a-z][a-z0-9]*(_[a-z0-9]+)*$/;
export const CONDICAO_EIXOS = [
  'time_maturidade',
  'escala_volume',
  'orcamento',
  'latencia',
  'compliance_dados',
  'prazo_entrega',
  'lock_in',
] as const;

const slot = z.strictObject({
  id,
  papel: text,
  categoria: wikilink,
  obrigatorio: z.boolean(),
  maisBarata: z.array(wikilinkOrRow).max(3),
  custoBeneficio: z.array(wikilinkOrRow).max(3),
  qualidadeMaxima: z.array(wikilinkOrRow).max(3),
  lacuna: z.string().optional(),
});

const instancia = z.strictObject({
  nome: text,
  descricao: z.string().optional(),
  linguagens: z.array(z.string()).optional(),
  ferramentas: z.array(wikilinkOrRow).optional(),
  fonte_ids: z.array(id).optional(),
});

const eixo = z.strictObject({
  favorece: z.array(text).min(1),
  contra: z.array(text).min(1),
  preferir: wikilinks.optional(),
  semAlternativa: z.string().optional(),
});

const checklistItem = z.strictObject({
  id: z.string().regex(CHECKLIST_ID_RE),
  dominio: text,
  titulo: text,
  verificacao: text,
  nivel: z.enum(['essencial', 'recomendado']),
  slots: z.array(id).optional(),
  depende: z.array(z.string().regex(CHECKLIST_ID_RE)).optional(),
});

export const Stack = z.strictObject({
  ...baseShape,
  ...conceitualShape,
  tipo: z.literal('stack'),
  categorias: wikilinks.optional(),
  dominio: z.enum(['software', 'ia']),
  subdominio: z.string().optional(),
  linguagens: z.array(z.string()).optional(),
  slots: z.array(slot).min(3),
  instancias: z.array(instancia).optional(),
  condicoes: z.strictObject(Object.fromEntries(CONDICAO_EIXOS.map((k) => [k, eixo])) as Record<(typeof CONDICAO_EIXOS)[number], typeof eixo>),
  outrosArquetipos: z.array(z.strictObject({ stack: wikilink, quando: text })).min(1),
  checklist: z.array(checklistItem).optional(),
  padroes: wikilinks.min(1),
  casosDeUso: wikilinks.min(1),
  variacoes: z.array(z.string()).optional(),
  ferramentas: z.array(wikilinkOrRow).optional(),
});
export const STACK_TRANSLATABLE = [...CONCEITUAL_TRANSLATABLE, 'subdominio'] as const;
