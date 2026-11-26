// SPDX-License-Identifier: MIT
import type { APIRoute } from 'astro';
import { buildLocales, ctxFor } from '../../../../../kit';
import { ecossistemaShards } from '../../../../../render/api';
export function getStaticPaths() {
  return buildLocales().flatMap((locale) => [...ecossistemaShards(ctxFor(locale)).keys()].map((demanda) => ({ params: { locale, demanda } })));
}
export const GET: APIRoute = ({ params }) => {
  const shard = ecossistemaShards(ctxFor(params.locale as 'pt-BR' | 'en')).get(params.demanda as string);
  return new Response(JSON.stringify(shard), { headers: { 'Content-Type': 'application/json' } });
};
