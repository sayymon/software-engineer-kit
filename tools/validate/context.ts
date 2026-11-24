// SPDX-License-Identifier: MIT
import { existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { LOCALES, SOURCE_LOCALE, loadContent, walkContent, type LoadResult } from '../../lib/content';
import type { Context } from './types';

export function createContext(root: string, extra: Record<string, string> = {}): Context {
  const contentRoot = join(root, 'content');
  let cached: LoadResult | undefined;
  return {
    root,
    contentRoot,
    extra,
    source() {
      cached ??= existsSync(join(contentRoot, SOURCE_LOCALE)) ? loadContent(contentRoot, SOURCE_LOCALE) : { entities: [], problems: [] };
      return cached;
    },
    overlays() {
      const out: Array<{ locale: string; relPath: string; file: string }> = [];
      for (const locale of LOCALES) {
        if (locale === SOURCE_LOCALE) continue;
        const dir = join(contentRoot, locale);
        for (const file of walkContent(dir)) out.push({ locale, relPath: relative(dir, file), file });
      }
      return out;
    },
  };
}
