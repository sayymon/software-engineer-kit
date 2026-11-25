// SPDX-License-Identifier: MIT
// Document with one planted defect, used by the `validar` text comparison against the stored Python CLI output.
// Single source for tests/guide/cli.test.ts and tools/guide/record-expected.ts.
import { realDoc } from '../support/expected';

/** Placeholder the stored output uses where the temporary YAML path appeared. */
export const ARQUIVO = '<ARQUIVO>';

export function docComDefeito(): ReturnType<typeof realDoc> {
  const ruim = realDoc();
  ruim.tecnicas[0].fonte_ids = ['id_inexistente_xyz'];
  return ruim;
}
