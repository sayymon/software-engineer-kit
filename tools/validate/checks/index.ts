// SPDX-License-Identifier: MIT
import type { Check } from '../types';
import { duplicates } from './duplicates';
import { flows } from './flows';
import { ids } from './ids';
import { idsLock } from './ids-lock';
import { licenses } from './licenses';
import { links } from './links';
import { schema } from './schema';
import { terms } from './terms';

/** Registered checks, in execution order. Add a module here to register a new check. */
export const CHECKS: Check[] = [schema, links, ids, idsLock, flows, duplicates, terms, licenses];
