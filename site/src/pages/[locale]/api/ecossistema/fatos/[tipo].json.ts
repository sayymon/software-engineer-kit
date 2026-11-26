// SPDX-License-Identifier: MIT
import type { APIRoute } from 'astro';
import { buildLocales, ctxFor } from '../../../../../kit';
import { ecossistemaFatos } from '../../../../../render/api';
export function getStaticPaths() {
  return buildLocales().flatMap((locale) => [...ecossistemaFatos(ctxFor(locale)).keys()].map((tipo) => ({ params: { locale, tipo } })));
}
export const GET: APIRoute = ({ params }) => {
  const fatos = ecossistemaFatos(ctxFor(params.locale as 'pt-BR' | 'en')).get(params.tipo as string);
  return new Response(JSON.stringify(fatos), { headers: { 'Content-Type': 'application/json' } });
};
