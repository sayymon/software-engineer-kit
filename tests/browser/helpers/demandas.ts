// SPDX-License-Identifier: MIT
// Shared helpers of demanda-troca.spec.ts and ordem-views.spec.ts: the 12 Demandas in the order of `ordem_das_demandas`
// (filterable with PLAYWRIGHT_DEMANDS=feature,bug), the Modelo_de_Grafo of the build and the stage selectors.
import { expect, type Page } from '@playwright/test';
import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { parse } from 'yaml';

if (!existsSync('site/dist/pt-BR/flows/feature/index.html')) throw new Error('site/dist ausente: rode npm run build');

export const ordemDasDemandas = (parse(readFileSync(resolve('content/guide/comum.yaml'), 'utf8')) as { ordem_das_demandas: string[] }).ordem_das_demandas;

const filtro = (process.env.PLAYWRIGHT_DEMANDS ?? '').split(',').map((s) => s.trim()).filter(Boolean);
/** The Demandas under test, still in the order of `ordem_das_demandas`. */
export const demandas = ordemDasDemandas.filter((d) => !filtro.length || filtro.includes(d));

export interface Grafo {
  nomeDemanda: string;
  raias: { id: string; ordem: number; orquestradora: boolean }[];
  nos: { id: string; tipo: string; raia: string; ordem: number }[];
  arestas: { origem: string; destino: string }[];
  transicoes: { origem: string; destino: string }[];
}
export const grafoDe = (demanda: string): Grafo => JSON.parse(readFileSync(join('site', 'dist', 'pt-BR', 'api', 'flows', `${demanda}.graph.json`), 'utf8')) as Grafo;

/** View ids of the lane tabs of a Demanda: its own lanes, in the order the guide declares them (the shared `com_*` lanes only appear as called lanes). */
export const abasDeRaia = (demanda: string): string[] =>
  (JSON.parse(readFileSync(join('site', 'dist', 'pt-BR', 'api', 'flows', `${demanda}.json`), 'utf8')) as { raias: { id: string }[] }).raias.map((r) => `raia:${r.id}`);

/** `<title>` of the static page of a Demanda (what the island must copy into `document.title` when it swaps the Demanda). */
export const tituloEstatico = (demanda: string): string => {
  const html = readFileSync(join('site', 'dist', 'pt-BR', 'flows', demanda, 'index.html'), 'utf8');
  const m = /<title>([^<]*)<\/title>/.exec(html);
  if (!m) throw new Error(`sem <title> em ${demanda}`);
  return m[1].replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
};

export const palco = (page: Page) => page.locator('[data-flow-stage]');
export const pronto = (page: Page) => expect(palco(page)).toHaveAttribute('data-rendered', 'true', { timeout: 90_000 });
export const aba = (page: Page, view: string) => page.locator(`[role="tab"][data-view="${view}"]`);

/** Opens a URL as a fresh page load (a hash-only goto keeps the page) and waits for the Diagrama. */
export async function abrir(page: Page, url: string) {
  await page.goto(url);
  await page.reload();
  await pronto(page);
}

/** Collects the uncaught exceptions and the `console.error` of the page (the missing favicon of the static server is not a page error). */
export function coletarErros(page: Page): string[] {
  const erros: string[] = [];
  page.on('pageerror', (e) => erros.push(`pageerror: ${e.message}`));
  page.on('console', (m) => {
    if (m.type() === 'error' && !/favicon/.test(m.location().url)) erros.push(`console.error: ${m.text()} (${m.location().url})`);
  });
  return erros;
}
