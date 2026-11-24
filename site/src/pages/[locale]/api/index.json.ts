// SPDX-License-Identifier: MIT
import type { APIRoute } from 'astro';
import { buildLocales, ctxFor } from '../../../kit';
import { indexJson } from '../../../render/api';
export function getStaticPaths() {
  return buildLocales().map((locale) => ({ params: { locale } }));
}
export const GET: APIRoute = ({ params }) =>
  new Response(JSON.stringify(indexJson(ctxFor(params.locale as 'pt-BR' | 'en'))), { headers: { 'Content-Type': 'application/json' } });
