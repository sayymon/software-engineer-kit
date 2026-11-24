// SPDX-License-Identifier: MIT
import type { LoadResult } from '../../lib/content';

export type CheckStatus = 'ok' | 'fail' | 'na';

export type CheckResult = {
  status: CheckStatus;
  /** One line per problem. Empty unless the status is `fail`. */
  problems: string[];
  /** Short note shown next to the status, for example counts or the reason for `na`. */
  info?: string;
};

export type Context = {
  /** Repository root (or a temporary root during `--self-test`). */
  root: string;
  contentRoot: string;
  /** Optional inputs for private checks, for example `source` from `--source <path>`. */
  extra: Record<string, string>;
  /** pt-BR entities, loaded once. */
  source(): LoadResult;
  /** All locale overlays found under content/<locale>/, as relative paths. */
  overlays(): Array<{ locale: string; relPath: string; file: string }>;
};

export type Check = {
  name: string;
  description: string;
  run(ctx: Context): CheckResult | Promise<CheckResult>;
};

export const ok = (info?: string): CheckResult => ({ status: 'ok', problems: [], info });
export const na = (info: string): CheckResult => ({ status: 'na', problems: [], info });
export const fail = (problems: string[], info?: string): CheckResult => ({ status: 'fail', problems, info });
