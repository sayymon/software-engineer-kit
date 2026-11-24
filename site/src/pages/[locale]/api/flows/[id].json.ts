// SPDX-License-Identifier: MIT
import type { APIRoute } from 'astro';
import { buildLocales, ctxFor, siteIndex } from '../../../../kit';
import { flowJson } from '../../../../render/api';
export function getStaticPaths() {
  return buildLocales().flatMap((locale) => siteIndex(locale).ofTipo('demanda').map((p) => ({ params: { locale, id: p.id } })));
}
export const GET: APIRoute = ({ params }) => {
  const ctx = ctxFor(params.locale as 'pt-BR' | 'en');
  return new Response(JSON.stringify(flowJson(ctx, ctx.index.byId.get(params.id as string)!)), { headers: { 'Content-Type': 'application/json' } });
};
