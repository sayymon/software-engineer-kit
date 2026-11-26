// SPDX-License-Identifier: MIT
import { z } from 'zod';
import { id } from './common';

/** Versão do contrato do Modelo_de_Grafo. Incrementar quando o formato quebrar consumidores. */
export const VERSAO_MODELO_DE_GRAFO = 1;

export const TIPOS_DE_NO = ['inicio', 'tarefa', 'bifurcacao', 'chamada', 'fim'] as const;
export const TipoDeNo = z.enum(TIPOS_DE_NO);
export type TipoDeNo = z.infer<typeof TipoDeNo>;

const ordem = z.number().int().min(0);

export const SubtarefaGrafo = z.strictObject({
  id,
  rotulo: z.string(),
  /** Posição de execução, 0-based. */
  ordem,
  condicional: z.boolean(),
  /** Descrição legível da condição. */
  quando: z.string().optional(),
  papel: z.string().optional(),
  responsavel: z.enum(['agente', 'pessoa', 'ambos']).optional(),
});
export type SubtarefaGrafo = z.infer<typeof SubtarefaGrafo>;

export const NoDoGrafo = z.strictObject({
  id,
  tipo: TipoDeNo,
  rotulo: z.string(),
  /** Id da Raia. */
  raia: z.string(),
  /** Posição no fluxo da Raia, 0-based. */
  ordem,
  /** Só tipo `chamada`. */
  raiaChamada: z.string().optional(),
  /** Só tipo `fim`. */
  retorno: z.string().optional(),
  subtarefas: z.array(SubtarefaGrafo),
  temPlaybook: z.boolean(),
});
export type NoDoGrafo = z.infer<typeof NoDoGrafo>;

export const ArestaDoGrafo = z.strictObject({
  origem: z.string(),
  destino: z.string(),
  /** Condição ou retorno, texto pronto para exibição. */
  rotulo: z.string(),
  /** Aresta de chamada/retorno entre raias. */
  tracejada: z.boolean(),
});
export type ArestaDoGrafo = z.infer<typeof ArestaDoGrafo>;

export const RaiaDoGrafo = z.strictObject({
  id: z.string(),
  nome: z.string(),
  cor: z.string().regex(/^#[0-9a-fA-F]{6}$/, 'cor must be #RRGGBB'),
  ordem,
  orquestradora: z.boolean(),
});
export type RaiaDoGrafo = z.infer<typeof RaiaDoGrafo>;

export const ModeloDeGrafo = z.strictObject({
  versaoContrato: z.literal(VERSAO_MODELO_DE_GRAFO),
  /** Id da Demanda. */
  demanda: z.string(),
  nomeDemanda: z.string(),
  raias: z.array(RaiaDoGrafo),
  nos: z.array(NoDoGrafo),
  arestas: z.array(ArestaDoGrafo),
});
export type ModeloDeGrafo = z.infer<typeof ModeloDeGrafo>;

/** JSON Schema (draft 2020-12) do Modelo_de_Grafo, gravado em schema/json/grafo-fluxo.json. */
export function jsonSchemaGrafo(): Record<string, unknown> {
  const schema = z.toJSONSchema(ModeloDeGrafo, { io: 'input', unrepresentable: 'any' }) as Record<string, unknown>;
  return { title: 'grafo-fluxo', ...schema };
}
