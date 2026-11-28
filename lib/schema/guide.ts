// SPDX-License-Identifier: MIT
// Entities derived from the guide YAML (content/guide). They are never authored as files: `lib/guide` derives one
// typed entity per guide item, so every id has a page or an anchor and a place in the graph.
import { z } from 'zod';
import { BASE_TRANSLATABLE, baseShape, conceitualShape, id, statusEditorial, text, wikilink, wikilinks } from './common';

const ids = z.array(id);
const raw = z.array(z.unknown());
const rawMap = z.record(z.string(), z.unknown());
const nivel = z.enum(['baixo', 'medio', 'alto']);
const status = statusEditorial.default('rascunho');
/** Fields every derived entity carries. `relacoes` holds the [[id]] links built from the guide reference fields. */
const derived = { ...baseShape, status, relacoes: wikilinks.optional() };
/** Anchor entities have no page of their own: they live on the page of `pagina`. */
const anchored = { ...derived, pagina: wikilink };
const raci = {
  papel: id.optional(),
  apoio: ids.optional(),
  consultado: ids.optional(),
  informado: ids.optional(),
  aprova: id.optional(),
};
/** Tool and practical-guide links of a task or subtask (flows.schema.json: categorias_ferramenta, guias_praticos, sem_ferramenta). */
const ferramentas = {
  categorias_ferramenta: ids.optional(),
  guias_praticos: ids.optional(),
  sem_ferramenta: z.boolean().optional(),
};

export const Raia = z.strictObject({
  ...derived,
  tipo: z.literal('raia'),
  demanda: id,
  responsabilidade: z.string(),
  cor: z.string(),
  orquestradora: z.boolean().optional(),
  entradas: ids.optional(),
});

/** Node fields shared by tarefa, decisao (bifurcacao) and no (inicio, fim, chamada). */
const nodeShape = {
  raia: id,
  demanda: id.optional(),
  rotulo: z.string().optional(),
  condicao: z.string(),
  proximo: raw,
  estado: rawMap,
  ligacoes: raw.optional(),
  playbook: id.optional(),
  entradas: ids.optional(),
  saidas: ids.optional(),
  tecnicas: raw.optional(),
  layout: rawMap.optional(),
  raia_chamada: id.optional(),
  retorno: z.string().optional(),
  ...raci,
  ...ferramentas,
};
export const Tarefa = z.strictObject({ ...derived, tipo: z.literal('tarefa'), ...nodeShape, subtarefas: ids.optional() });
export const Decisao = z.strictObject({ ...derived, tipo: z.literal('decisao'), ...nodeShape });
export const No = z.strictObject({ ...anchored, tipo: z.literal('no'), no_tipo: z.enum(['inicio', 'fim', 'chamada']), ...nodeShape });

export const Subtarefa = z.strictObject({
  ...anchored,
  tipo: z.literal('subtarefa'),
  tarefa: id,
  rotulo: z.string(),
  descricao: z.string().optional(),
  exemplo: z.string().optional(),
  responsavel: z.string().optional(),
  quando: z.unknown().optional(),
  porque: z.string().optional(),
  entradas: ids.optional(),
  saidas: ids.optional(),
  tecnicas: raw.optional(),
  ...raci,
  ...ferramentas,
});

export const Playbook = z.strictObject({
  ...anchored,
  tipo: z.literal('playbook'),
  no: id,
  resumo: z.string(),
  exemplo: z.string().optional(),
  perguntas_chave: ids.optional(),
  fazer: z.array(text).optional(),
  evitar: z.array(text).optional(),
  tecnicas: ids.optional(),
  abordagens: ids.optional(),
  padroes: ids.optional(),
  estrategias: ids.optional(),
  categorias_ferramenta: ids.optional(),
});

export const Pergunta = z.strictObject({
  ...anchored,
  tipo: z.literal('pergunta'),
  texto: text,
  depende_de: ids.optional(),
  quando: z.unknown().optional(),
  ...raci,
});

export const Celula = z.strictObject({
  ...anchored,
  tipo: z.literal('celula'),
  demanda: id,
  requisito: id,
  perguntas_chave: z.array(z.string()).optional(),
  tecnicas: ids.optional(),
  abordagens: ids.optional(),
  padroes: ids.optional(),
  estrategias: ids.optional(),
  categorias_ferramenta: ids.optional(),
});

export const Artefato = z.strictObject({
  ...derived,
  tipo: z.literal('artefato'),
  artefato_tipo: z.string(),
  subtipo: z.string().optional(),
  exemplo: z.string().optional(),
  destinatarios: ids.optional(),
  variantes: raw.optional(),
});

export const Variavel = z.strictObject({
  ...derived,
  tipo: z.literal('variavel'),
  variavel_tipo: z.enum(['booleano', 'enum', 'inteiro', 'texto']),
  exemplo: z.string().optional(),
  valores: raw.optional(),
  inicial: z.union([z.string(), z.number(), z.boolean()]).optional(),
});

export const Papel = z.strictObject({
  ...derived,
  tipo: z.literal('papel'),
  responsabilidades: z.array(text).optional(),
  atuacao_de_agente: z.enum(['nao', 'apoio', 'execucao']).optional(),
  exemplo: z.string().optional(),
});

export const Rito = z.strictObject({
  ...derived,
  tipo: z.literal('rito'),
  nivel: z.string(),
  ordem: z.number().int().optional(),
  seguinte: id.optional(),
  objetivo: text,
  cadencia: z.string().optional(),
  duracao: z.string().optional(),
  acontece_em: ids.optional(),
  quando: z.unknown().optional(),
  premissas: z.array(text).optional(),
  comportamentos_esperados: z.array(text).optional(),
  evitar: z.array(text).optional(),
  entradas: ids.optional(),
  saidas: ids.optional(),
  tecnicas: ids.optional(),
  perguntas: ids.optional(),
  exemplo: z.string().optional(),
  ...raci,
});

export const CategoriaFerramentaGuia = z.strictObject({
  ...derived,
  tipo: z.literal('categoria-ferramenta'),
  custo: nivel,
  beneficio: nivel,
  dependencia_fornecedor: nivel,
});

export const FonteGuia = z.strictObject({
  ...derived,
  tipo: z.literal('fonte-guia'),
  fonte_tipo: z.enum(['livro', 'artigo', 'curso']),
  titulo: text,
  link: text,
  status_revisao: z.enum(['pendente', 'em_revisao', 'revisada']),
  proxima_revisao: z.string(),
  itens: ids.optional(),
});

export const PadraoGuia = z.strictObject({ ...derived, ...conceitualShape, tipo: z.literal('padrao-guia') });

export const TipoDeArtefato = z.strictObject({
  ...derived,
  tipo: z.literal('tipo-de-artefato'),
  artefato_tipo: z.string(),
  legado: z.boolean(),
  subtipos: z.array(z.strictObject({ id: z.string(), rotulo: z.string() })),
});

export const GUIDE_TRANSLATABLE = [...BASE_TRANSLATABLE] as const;
