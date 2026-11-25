// SPDX-License-Identifier: MIT
// Decisor "construir, comprar ou assinar". Port of tools/guide-oracle/src/guia_decisao/decisor.py: pure function over the
// guide block `comum.decisor_construir_comprar_assinar`. Scores in 6 decimals, fixed tie tolerance of 1e-9 and tie-break
// by the guide order. The financial context only feeds the justification, never the scores.
import type { GuideDoc } from './guide/load';

export class DecisorError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DecisorError';
  }
}

export type DecisorConfig = {
  criterios: string[];
  opcoes: string[];
  escala: { min: number; max: number };
  pesos: Record<string, Record<string, number>>;
  ordem_desempate: string[];
};
export type Notas = Record<string, Record<string, unknown>>;
export type ContextoFinanceiro = {
  custos?: Record<string, Record<string, unknown> | null | undefined> | null;
  custo_de_nao_fazer?: unknown;
  roi?: unknown;
  orcamento?: unknown;
};
export type LinhaCriterio = { criterio: string; nota: number; peso: number; contribuicao: number };
export type Avaliacao = { opcao: string; linhas: LinhaCriterio[]; total: number };
export type Resultado = { objetivo: string; recomendada: string; avaliacoes: Avaliacao[]; empate: string[]; justificativa: string };

export const ROTULO_CRITERIO: Record<string, string> = {
  diferenciacao: 'diferenciação',
  tempo_ate_valor: 'tempo até o valor',
  custo_total: 'custo total',
  dependencia_fornecedor: 'dependência de fornecedor',
  risco: 'risco',
};
export const ROTULO_PRAZO: Record<string, string> = { curto: 'curto prazo', medio: 'médio prazo', longo: 'longo prazo' };
const EPS = 1e-9;

/** Reads the Decisor block of the guide (`comum.decisor_construir_comprar_assinar`). */
export function configDoGuia(doc: GuideDoc): DecisorConfig {
  const b = doc.decisor_construir_comprar_assinar;
  if (b === null || typeof b !== 'object') throw new DecisorError('o guia não tem o bloco decisor_construir_comprar_assinar');
  for (const k of ['criterios', 'opcoes', 'escala', 'pesos', 'ordem_desempate']) {
    if (!(k in b)) throw new DecisorError(`o bloco decisor_construir_comprar_assinar não tem '${k}'`);
  }
  return {
    criterios: [...b.criterios],
    opcoes: [...b.opcoes],
    escala: { min: b.escala.min, max: b.escala.max },
    pesos: Object.fromEntries(Object.entries(b.pesos as Record<string, Record<string, number>>).map(([o, p]) => [o, { ...p }])),
    ordem_desempate: [...b.ordem_desempate],
  };
}

const round6 = (x: number): number => Number(x.toFixed(6));

/** Python `f"{v:.2f}"` (half to even on exact ties) without trailing zeros, comma as decimal separator. */
function num(v: number): string {
  let s = v.toFixed(2);
  const exactTie = Number.isInteger(v * 8) && !Number.isInteger(v * 4);
  if (exactTie) {
    const scaled = Math.abs(v) * 100; // exactly k + 0.5
    const k = Math.floor(scaled);
    const n = k % 2 === 0 ? k : k + 1;
    s = `${v < 0 ? '-' : ''}${Math.floor(n / 100)}.${String(n % 100).padStart(2, '0')}`;
  }
  if (s.includes('.')) s = s.replace(/0+$/, '').replace(/\.$/, '');
  return s.replace('.', ',');
}

/** Python `str()` of a JSON scalar, for the context text. */
function pyStr(v: unknown): string {
  if (v === null || v === undefined) return 'None';
  if (v === true) return 'True';
  if (v === false) return 'False';
  return String(v);
}

/** Python `repr()` of a JSON scalar, for error messages. */
function pyRepr(v: unknown): string {
  if (typeof v === 'string') return v.includes("'") && !v.includes('"') ? `"${v}"` : `'${v.replace(/'/g, "\\'")}'`;
  return pyStr(v);
}

const has = (o: object, k: string): boolean => Object.hasOwn(o, k);
const truthy = (v: unknown): boolean => !(v === null || v === undefined || v === false || v === 0 || v === '' || (Array.isArray(v) && v.length === 0) || (typeof v === 'object' && v !== null && !Array.isArray(v) && Object.keys(v).length === 0));

export function decidir(config: DecisorConfig, objetivo: string, notas: Notas, contexto?: ContextoFinanceiro | null): Resultado {
  const { criterios, opcoes, pesos: pesosPorObjetivo } = config;
  const lo = Number(config.escala.min);
  const hi = Number(config.escala.max);
  if (!has(pesosPorObjetivo, objetivo)) {
    throw new DecisorError(`objetivo desconhecido: '${objetivo}'; objetivos válidos: ${Object.keys(pesosPorObjetivo).join(', ')}`);
  }
  const pesos = pesosPorObjetivo[objetivo];
  const faltam = opcoes.filter((o) => !has(notas, o));
  if (faltam.length) throw new DecisorError(`faltam as notas das opções: ${faltam.join(', ')}`);
  const sobram = Object.keys(notas).filter((o) => !opcoes.includes(o));
  if (sobram.length) throw new DecisorError(`opções desconhecidas: ${sobram.join(', ')}; opções válidas: ${opcoes.join(', ')}`);

  const avaliacoes: Avaliacao[] = [];
  for (const opcao of opcoes) {
    const linhas: LinhaCriterio[] = [];
    for (const c of criterios) {
      if (!has(notas[opcao], c)) throw new DecisorError(`falta a nota do critério '${c}' na opção '${opcao}'`);
      const nota = notas[opcao][c];
      if (typeof nota !== 'number') throw new DecisorError(`a nota do critério '${c}' na opção '${opcao}' não é um número: ${pyRepr(nota)}`);
      if (!(lo <= nota && nota <= hi)) {
        throw new DecisorError(`a nota ${pyStr(nota)} do critério '${c}' na opção '${opcao}' está fora da escala ${num(lo)} a ${num(hi)}`);
      }
      if (!has(pesos, c)) throw new DecisorError(`falta o peso do critério '${c}' no objetivo '${objetivo}'`);
      const peso = Number(pesos[c]);
      linhas.push({ criterio: c, nota, peso, contribuicao: round6(nota * peso) });
    }
    avaliacoes.push({ opcao, linhas, total: round6(linhas.reduce((a, x) => a + x.contribuicao, 0)) });
  }

  const maior = Math.max(...avaliacoes.map((a) => a.total));
  const empatadas = avaliacoes.filter((a) => Math.abs(a.total - maior) < EPS).map((a) => a.opcao);
  const ordem = config.ordem_desempate;
  const posicao = (o: string): number => (ordem.includes(o) ? ordem.indexOf(o) : ordem.length);
  let recomendada = empatadas[0];
  let empate: string[] = [];
  if (empatadas.length > 1) {
    recomendada = empatadas.reduce((a, b) => (posicao(b) < posicao(a) ? b : a));
    empate = empatadas;
  }

  const partes = [`Objetivo: ${objetivo}. Recomendação: ${recomendada} (total ${num(maior)}).`];
  for (const a of avaliacoes) {
    const detalhe = a.linhas.map((x) => `${ROTULO_CRITERIO[x.criterio] ?? x.criterio} ${num(x.nota)} x ${num(x.peso)} = ${num(x.contribuicao)}`).join('; ');
    partes.push(`${a.opcao}: ${detalhe}; total ${num(a.total)}.`);
  }
  if (empate.length) {
    partes.push(`Empate entre ${empate.join(', ')}: venceu ${recomendada} pela ordem de desempate (${ordem.join(', ')}).`);
  }
  if (contexto && truthy(contexto)) partes.push(contextoEmTexto(contexto, opcoes));
  return { objetivo, recomendada, avaliacoes, empate, justificativa: partes.join('\n') };
}

/** Financial evidence behind the notes: costs per horizon, ROI and cost of not doing it (equivalent to `_contexto`). */
export function contextoEmTexto(ctx: ContextoFinanceiro, opcoes: string[]): string {
  const trechos: string[] = [];
  const custos = ctx.custos ?? {};
  for (const opcao of opcoes) {
    const porPrazo = (has(custos, opcao) ? custos[opcao] : null) ?? {};
    const valores = ['curto', 'medio', 'longo'].filter((p) => has(porPrazo, p)).map((p) => `${ROTULO_PRAZO[p]} ${pyStr((porPrazo as Record<string, unknown>)[p])}`);
    if (valores.length) trechos.push(`custo de ${opcao}: ${valores.join(', ')}`);
  }
  if (ctx.custo_de_nao_fazer != null) trechos.push(`custo de não fazer: ${pyStr(ctx.custo_de_nao_fazer)}`);
  if (ctx.roi != null) trechos.push(`ROI esperado: ${pyStr(ctx.roi)}`);
  if (ctx.orcamento != null) trechos.push(`orçamento previsto: ${pyStr(ctx.orcamento)}`);
  return trechos.length ? `Contexto: ${trechos.join('; ')}.` : '';
}
