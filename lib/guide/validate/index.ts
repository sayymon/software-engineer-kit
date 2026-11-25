// SPDX-License-Identifier: MIT
import type { GuideDoc } from '../index';
import { itemIdDoCaminho, normalizarDatas } from './caminho';
import { validateSchema } from './schema';
import { checkDoc as checkLegacyRules, type Doc, type FlowIssue } from './rules';
import type { OpcoesValidacao, Problema, Nivel } from './types';

export type { OpcoesValidacao, Problema, Nivel } from './types';
export {
  caminho,
  itemIdDoCaminho,
  normalizarDatas,
  _caminho,
  _itemIdDoCaminho,
  _item_id_do_caminho,
  _normalizarDatas,
  _normalizar_datas,
} from './caminho';
export type { Doc, FlowIssue } from './rules';

/**
 * Runs the guide checks in the same top-level order as the Python validator:
 * schema first, then ids, structure, reachability, weights, and references.
 * The existing rule implementation remains unchanged until each later rule
 * group is ported into its own module.
 */
export function validateGuide(doc: GuideDoc, schema: object, opcoes: OpcoesValidacao = {}): Problema[] {
  const normalizado = normalizarDatas(doc) as GuideDoc;
  const schemaIssues = validateSchema(normalizado, schema);
  if (schemaIssues.length) return schemaIssues;

  // These options are part of the stable contract. Warning and completeness
  // rule groups are added in later portability tasks; current rules are errors.
  void opcoes;
  return checkLegacyRules(normalizado).map((issue) => toProblem(normalizado, issue));
}

/** Legacy cross-reference API retained for callers that do not need schema checks. */
export function checkDoc(doc: Doc): FlowIssue[] {
  return checkLegacyRules(doc);
}

/** Legacy schema API retained for the existing flows check and tests. */
export { validateAgainstSchema } from './rules';

function toProblem(doc: GuideDoc, issue: FlowIssue): Problema {
  const partes = parsePath(issue.path);
  return {
    code: issue.code,
    nivel: 'erro' as Nivel,
    path: issue.path,
    itemId: itemIdDoCaminho(doc, partes),
    message: issue.message,
  };
}

function parsePath(path: string): Array<string | number> {
  if (!path || path === '(root)') return [];
  const partes: Array<string | number> = [];
  for (const token of path.split('.')) {
    const match = /^([^[]+)(.*)$/.exec(token);
    if (!match) continue;
    partes.push(match[1]);
    for (const index of match[2].matchAll(/\[(\d+)\]/g)) partes.push(Number(index[1]));
  }
  return partes;
}
