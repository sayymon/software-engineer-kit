// SPDX-License-Identifier: MIT
// Decisor cases (real guide config plus ties, errors, scale violations, with and without financial context).
// Single source for the regression test and tools/guide/record-expected.ts.
import { configDoGuia } from '../../../lib/decisor';
import { guideDir, loadGuideDoc } from '../../../lib/guide';
import { root } from '../support/expected';
const config = configDoGuia(loadGuideDoc(guideDir(`${root}content`)));
export type Caso = { config: typeof config; objetivo: string; notas: Record<string, Record<string, unknown>>; contexto?: unknown };
type Saida = { ok: unknown } | { erro: string };

const notas = (v: number | ((o: string, c: string) => unknown)) =>
  Object.fromEntries(config.opcoes.map((o) => [o, Object.fromEntries(config.criterios.map((c) => [c, typeof v === 'function' ? v(o, c) : v]))]));
const objetivos = Object.keys(config.pesos);
const ctx = {
  custos: { construir: { curto: 100, medio: 250.5, longo: 'R$ 1.000' }, comprar: { longo: 30 }, assinar: {} },
  custo_de_nao_fazer: 12000,
  roi: 0.25,
  orcamento: 5000,
};

export const casos: Caso[] = [];
const add = (objetivo: string, n: Caso['notas'], contexto?: unknown, cfg = config) => casos.push({ config: cfg, objetivo, notas: n, ...(contexto === undefined ? {} : { contexto }) });

// Real guide config: every goal with flat notes (full tie), varied notes, and context.
for (const g of objetivos) {
  add(g, notas(3));
  add(g, notas((o, c) => 1 + ((o.length * 7 + c.length * 3) % 5)));
  add(g, notas((o, c) => 1 + ((o.length + c.length) % 5)), ctx);
}
add(objetivos[0], notas(5), {});
add(objetivos[0], notas(1), { roi: 0 });
add(objetivos[0], notas(2.5)); // fractional notes are allowed inside the scale
add(objetivos[1], notas((o, c) => (o === 'comprar' || o === 'construir' ? 4 : c.length % 5 || 1))); // partial tie
add(objetivos[1], notas((o) => (o === 'construir' ? 2.125 : 2.125)), { custos: { comprar: null }, custo_de_nao_fazer: null });
// Errors.
add('inexistente', notas(3));
add(objetivos[0], notas(6));
add(objetivos[0], notas(0));
add(objetivos[0], notas((o, c) => (o === 'assinar' && c === 'risco' ? 5.5 : 3)));
add(objetivos[0], notas((o, c) => (o === 'comprar' && c === 'custo_total' ? 'alto' : 3)));
add(objetivos[0], notas((o, c) => (o === 'comprar' && c === 'custo_total' ? true : 3)));
add(objetivos[0], notas((o, c) => (o === 'comprar' && c === 'custo_total' ? null : 3)));
{
  const falta = notas(3);
  delete falta.assinar;
  add(objetivos[0], falta);
}
{
  const falta = notas(3);
  delete falta.comprar.risco;
  add(objetivos[0], falta);
}
add(objetivos[0], { ...notas(3), extra: {}, outra: {} });
// Custom configs: tie-break with an option outside the order, other scale.
add('x', { a: { k: 2 }, b: { k: 2 }, c: { k: 1 } }, undefined, { criterios: ['k'], opcoes: ['a', 'b', 'c'], escala: { min: 0, max: 3 }, pesos: { x: { k: 0.3333333 } }, ordem_desempate: ['c', 'b'] });
add('x', { a: { k: 4 }, b: { k: 1 } }, undefined, { criterios: ['k'], opcoes: ['a', 'b'], escala: { min: 0, max: 3 }, pesos: { x: { k: 1 } }, ordem_desempate: ['b', 'a'] });

