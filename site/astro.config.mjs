// SPDX-License-Identifier: MIT
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';

const repoRoot = fileURLToPath(new URL('..', import.meta.url));
process.env.KIT_ROOT ??= repoRoot.replace(/\/$/, '');

const base = process.env.SITE_BASE && process.env.SITE_BASE !== '/' ? process.env.SITE_BASE.replace(/\/$/, '') : '/';
const site = process.env.SITE_URL || 'https://sayymon.github.io/software-engineer-kit';
const outDir = process.env.KIT_OUT_DIR ? fileURLToPath(new URL(process.env.KIT_OUT_DIR, import.meta.url)) : fileURLToPath(new URL('./dist', import.meta.url));

export default defineConfig({
  output: 'static',
  site,
  base,
  outDir,
  trailingSlash: 'always',
  build: { format: 'directory' },
  i18n: {
    locales: ['pt-BR', 'en'],
    defaultLocale: 'pt-BR',
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },
  devToolbar: { enabled: false },
  vite: {
    resolve: { alias: { '@lib': fileURLToPath(new URL('../lib', import.meta.url)) } },
    logLevel: 'warn',
  },
});
