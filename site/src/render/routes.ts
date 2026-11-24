// SPDX-License-Identifier: MIT
// Every route of a locale: entity pages from the content index plus generated listing pages.
import type { SiteIndex, SiteLayer } from '@lib/content/site';

export type SiteRoute =
  | { slug: string; kind: 'entity'; id: string }
  | { slug: string; kind: 'layer'; layer: SiteLayer }
  | { slug: string; kind: 'section'; layer: SiteLayer; dir: string }
  | { slug: string; kind: 'licenses' }
  | { slug: string; kind: 'journeys' };

export const LAYER_PAGES: SiteLayer[] = ['tools', 'ai', 'fundamentals', 'stacks', 'guides', 'certifications', 'flows', 'journeys'];
export const LICENSES_SLUG = 'fundamentals/licenses';

export function siteRoutes(index: SiteIndex): SiteRoute[] {
  const routes: SiteRoute[] = index.pages.map((p) => ({ slug: p.route, kind: 'entity', id: p.id }));
  const taken = new Set(routes.map((r) => r.slug));
  const add = (r: SiteRoute) => {
    if (taken.has(r.slug)) throw new Error(`route collision: ${r.slug}`);
    taken.add(r.slug);
    routes.push(r);
  };
  for (const layer of LAYER_PAGES) add(layer === 'journeys' ? { slug: 'journeys', kind: 'journeys' } : { slug: layer, kind: 'layer', layer });
  const dirs = new Set<string>();
  for (const p of index.pages) {
    const parts = p.route.split('/');
    if (parts.length > 2 && p.layer !== 'hubs') dirs.add(parts.slice(0, -1).join('/'));
  }
  for (const dir of [...dirs].sort()) {
    if (dir === LICENSES_SLUG) continue;
    add({ slug: dir, kind: 'section', layer: dir.split('/')[0] as SiteLayer, dir });
  }
  add({ slug: LICENSES_SLUG, kind: 'licenses' });
  return routes;
}
