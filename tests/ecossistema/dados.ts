// SPDX-License-Identifier: MIT
// Shared fixture: the real content, loaded once per test file.
import { loadContent } from '../../lib/content';
import { SiteIndex } from '../../lib/content/site';

const root = new URL('../../', import.meta.url).pathname;
export const index = new SiteIndex('pt-BR', loadContent(`${root}content`, 'pt-BR').entities);
