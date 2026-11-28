// SPDX-License-Identifier: MIT
import type { APIRoute } from 'astro';
import { gerarGrafos } from '@lib/flow-graph';
import { buildLocales, flowDoc } from '../../../../kit';

export function getStaticPaths() {
  return buildLocales().flatMap((locale) => [...gerarGrafos(flowDoc(locale)).keys()].map((id) => ({ params: { locale, id } })));
}
export const GET: APIRoute = ({ params }) => {
  const grafo = gerarGrafos(flowDoc(params.locale as 'pt-BR' | 'en')).get(params.id as string)!;
  return new Response(JSON.stringify(grafo), { headers: { 'Content-Type': 'application/json' } });
};
