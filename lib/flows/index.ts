// SPDX-License-Identifier: MIT
// Compatibility exports for callers that still import the legacy flows module.
export {
  checkDoc,
  validateAgainstSchema,
  validateGuide,
} from '../guide/validate';
export type {
  Doc,
  FlowIssue,
  Nivel,
  OpcoesValidacao,
  Problema,
} from '../guide/validate';
