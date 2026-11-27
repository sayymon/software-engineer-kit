// SPDX-License-Identifier: MIT
// Lazy loaders for the data each scene draws. Each file is fetched once, when its scene gets close.
import { corDe } from '@lib/ecossistema/camadas';
import { ESCALA } from '@lib/ecossistema/constantes';
import type { FluxoDados, NoCatalogo } from '@lib/home/layouts';
import type { DadosJornadas } from '@lib/home/layouts-cena';
import type { JornadasHome } from '@lib/home/jornadas';
import type { PayloadEcossistema } from '@lib/ecossistema/payload';

async function json<T>(url: string): Promise<T> {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return (await r.json()) as T;
}

interface FluxoJson {
  raias: Array<{ id: string; cor: string }>;
  decisoes: Array<{ id: string; raia: string; tipo: string; raia_chamada?: string; proximo?: Array<{ para: string }> }>;
}

export async function carregarFluxo(base: string, locale: string, demanda: string): Promise<FluxoDados> {
  const f = await json<FluxoJson>(`${base}/${locale}/api/flows/${encodeURIComponent(demanda)}.json`);
  return {
    raias: f.raias.map((r) => ({ id: r.id, cor: r.cor })),
    nos: f.decisoes.map((d) => ({ id: d.id, raia: d.raia, tipo: d.tipo, proximo: (d.proximo ?? []).map((p) => p.para), chama: d.raia_chamada })),
  };
}

export async function carregarCatalogo(base: string, locale: string): Promise<{ nos: NoCatalogo[]; ids: string[]; nomes: string[]; tipos: string[] }> {
  const p = await json<PayloadEcossistema>(`${base}/${locale}/api/ecossistema/index.json`);
  return {
    nos: p.nos.map((n) => ({ x: n[3] / ESCALA, y: n[4] / ESCALA, z: n[5] / ESCALA, grau: n[6], cor: corDe(p.tipos[n[1]]), hub: p.tipos[n[1]] === 'hub' })),
    ids: p.nos.map((n) => n[0]),
    nomes: p.nos.map((n) => n[2]),
    tipos: p.nos.map((n) => p.tipos[n[1]]),
  };
}

export async function carregarJornadas(base: string, locale: string): Promise<{ dados: DadosJornadas; bruto: JornadasHome }> {
  const j = await json<JornadasHome>(`${base}/${locale}/api/home/jornadas.json`);
  return { dados: { jornadas: j.jornadas.length, competencias: j.competencias.length, certificacoes: j.certificacoes.map((c) => ({ area: c.area, nivel: c.nivel })) }, bruto: j };
}
