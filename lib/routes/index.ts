// SPDX-License-Identifier: MIT
// Route rules: the page path of an entity equals its content path without the extension.
export const DEFAULT_SITE_URL = 'https://sayymon.github.io/software-engineer-kit';
export const ROUTE_LOCALES = ['pt-BR', 'en'] as const;

/** Content path relative to content/<locale>/ without extension, for example `tools/catalog/git`. */
export function routePath(contentPath: string): string {
  return contentPath.replace(/\.(md|yaml|yml)$/, '');
}

export function urlFor(siteUrl: string, locale: string, contentPath: string): string {
  return `${siteUrl.replace(/\/$/, '')}/${locale}/${routePath(contentPath)}/`;
}

export function urlsFor(siteUrl: string, contentPath: string): Record<string, string> {
  return Object.fromEntries(ROUTE_LOCALES.map((l) => [l, urlFor(siteUrl, l, contentPath)]));
}
