// SPDX-License-Identifier: MIT
// Decision helper "build, buy or subscribe". Port of the reference decisor.py: pure function over content/data/matriz.json.
// 5 criteria, scale 1 to 5, 4 goals with weights that sum to 1, fixed tie-break order and a tolerance of 1e-9.

export type Matriz = {
  opcoes: Record<string, string>;
  criterios: string[];
  escala: { min: number; max: number };
  ordem_desempate: string[];
  tolerancia_empate: number;
  pesos: Record<string, Record<string, number>>;
  eixos?: string[];
  eixo_alimenta_criterio?: Record<string, string[]>;
};

export class NotaForaDaEscala extends Error {}
export class ObjetivoDesconhecido extends Error {}
export class CriterioAusente extends Error {}

export type Notas = Record<string, Record<string, number>>;
export type Decisao = {
  opcao: string;
  totais: Record<string, number>;
  contribuicoes: Record<string, Record<string, number>>;
  pesos: Record<string, number>;
};

const round10 = (x: number): number => Number(x.toFixed(10));

/** `notas`: option to criterion to integer 1..5, for every option of the matrix. */
export function decidir(objetivo: string, notas: Notas, config: Matriz): Decisao {
  if (!Object.hasOwn(config.pesos, objetivo)) throw new ObjetivoDesconhecido(objetivo);
  const pesos = config.pesos[objetivo];
  const { min, max } = config.escala;
  const totais: Record<string, number> = {};
  const contribuicoes: Record<string, Record<string, number>> = {};
  for (const op of config.ordem_desempate) {
    const n = notas[op];
    if (n === undefined || n === null || typeof n !== 'object') throw new CriterioAusente(`${op}: notas ausentes`);
    contribuicoes[op] = {};
    for (const c of config.criterios) {
      if (!(c in n)) throw new CriterioAusente(`${op}: ${c}`);
      const v = n[c];
      if (typeof v !== 'number' || !Number.isInteger(v) || v < min || v > max) throw new NotaForaDaEscala(`${op}/${c}: ${JSON.stringify(v)}`);
      contribuicoes[op][c] = round10(pesos[c] * v);
    }
    totais[op] = round10(Object.values(contribuicoes[op]).reduce((a, b) => a + b, 0));
  }
  const melhor = Math.max(...Object.values(totais));
  const vencedora = config.ordem_desempate.find((op) => melhor - totais[op] <= config.tolerancia_empate) as string;
  return { opcao: vencedora, totais, contribuicoes, pesos: { ...pesos } };
}
