// SPDX-License-Identifier: MIT
import type { APIRoute } from 'astro';
import { buildLocales, ctxFor } from '../../../../kit';
import { jornadasHomeJson } from '../../../../render/api';
export function getStaticPaths() {
  return buildLocales().map((locale) => ({ params: { locale } }));
}
export const GET: APIRoute = ({ params }) =>
  new Response(JSON.stringify(jornadasHomeJson(ctxFor(params.locale as 'pt-BR' | 'en'))), { headers: { 'Content-Type': 'application/json' } });
