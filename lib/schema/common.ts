// SPDX-License-Identifier: MIT
import { z } from 'zod';

/** Stable id: lowercase ascii snake_case. Same regex as the guide `Id` and the kit contracts. */
export const ID_RE = /^[a-z][a-z0-9]*(_[a-z0-9]+)*$/;
export const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export const id = z.string().regex(ID_RE, 'id must be lowercase ascii snake_case');
export const isoDate = z.string().regex(ISO_DATE_RE, 'date must be ISO (YYYY-MM-DD)');
export const text = z.string().min(1);
export const httpsUrl = z.string().regex(/^https:\/\/\S+$/, 'url must start with https://');
/** Number or the literal marker used when the official source did not confirm the value. */
export const numberOrUnverified = z.union([z.number(), z.literal('não verificado')]);

/** `[[id]]`, `[[id|label]]`, `[[id#section]]` (kit form) or `[[Title]]` (title form, migration input). */
export const wikilink = z.string().regex(/^\[\[[^\[\]\n]+\]\]$/, 'expected a [[wikilink]]');
/** `[[Nota]]` or `tabela:<id>` (a row of the tool tables). */
export const wikilinkOrRow = z.string().regex(/^(\[\[[^\[\]\n]+\]\]|tabela:[a-z0-9_-]+)$/, 'expected [[wikilink]] or tabela:<id>');
export const wikilinks = z.array(wikilink);

/** Source shape from the guide `Fonte`. No extra keys are allowed. */
export const Fonte = z.strictObject({
  id,
  tipo: z.enum(['livro', 'artigo', 'curso']),
  titulo: text,
  link: text,
  status_revisao: z.enum(['pendente', 'em_revisao', 'revisada']),
  proxima_revisao: isoDate,
});
export type Fonte = z.infer<typeof Fonte>;

export const statusEditorial = z.enum(['rascunho', 'revisado', 'publicado']);

/** Fields every entity carries. `tipo` and `nome` are added per type. */
export const baseShape = {
  id,
  nome: text,
  descricao: z.string().optional(),
  publico: z.boolean().default(false),
  fontes: z.array(Fonte).optional(),
  fonte_ids: z.array(id).optional(),
  tags: z.array(z.string()).optional(),
  aliases: z.array(z.string()).optional(),
  dataVerificacao: isoDate.optional(),
  /** Ids of guide items (flows) merged into this note. They stay resolvable as references. */
  guia_ids: z.array(id).optional(),
};

/** Guide `ItemConceitual` fields (padrao, algoritmo, stack, guia, tecnica...). */
export const conceitualShape = {
  exemplo: z.string().optional(),
  quando_usar: z.array(text).min(2).optional(),
  quando_evitar: z.array(text).min(1).optional(),
  status: statusEditorial.default('rascunho'),
};

/** Base translatable fields shared by every type. `body` is the Markdown body, outside the front matter. */
export const BASE_TRANSLATABLE = ['nome', 'descricao', 'body'] as const;
export const CONCEITUAL_TRANSLATABLE = [...BASE_TRANSLATABLE, 'exemplo', 'quando_usar', 'quando_evitar'] as const;

export const tradeoffs = z.array(z.string().regex(/^Ganha: .+; paga: .+/, 'format "Ganha: ...; paga: ..."')).min(2);

/** Big-O expression such as O(1), O(n log n), O(V + E log V). */
export const bigO = z.string().regex(/^O\(.+\)$/, 'expected Big-O such as O(n log n)');
export const bigOOrNa = z.union([bigO, z.literal('não se aplica')]);
