// SPDX-License-Identifier: MIT
// Design properties 8 and 9 (requirements 4.5, 4.6, 4.7): the financial context never changes the Decisor scores, and the
// budget is not a Decisor criterion (it is the gate before the Decisor, in the com_dcs flow).
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { type ContextoFinanceiro, type DecisorConfig, configDoGuia, decidir } from '../../../lib/decisor';
import { guideDir, loadGuideDoc } from '../../../lib/guide';

const root = new URL('../../../', import.meta.url).pathname;
const doc = loadGuideDoc(guideDir(`${root}content`));
const config = configDoGuia(doc);
const { min, max } = config.escala;

const nota = fc.oneof(fc.integer({ min, max }), fc.double({ min, max, noNaN: true }));
const notas = fc.record(Object.fromEntries(config.opcoes.map((o) => [o, fc.record(Object.fromEntries(config.criterios.map((c) => [c, nota])))])));
const objetivo = fc.constantFrom(...Object.keys(config.pesos));
const escalar = fc.oneof(fc.constant(null), fc.boolean(), fc.integer(), fc.double({ noNaN: true }), fc.string());
const contexto = fc.record(
  {
    custos: fc.oneof(fc.constant(null), fc.dictionary(fc.constantFrom(...config.opcoes), fc.oneof(fc.constant(null), fc.dictionary(fc.constantFrom('curto', 'medio', 'longo'), escalar)))),
    custo_de_nao_fazer: escalar,
    roi: escalar,
    orcamento: escalar,
  },
  { requiredKeys: [] },
) as fc.Arbitrary<ContextoFinanceiro>;

describe('propriedade 8: o contexto financeiro não muda o resultado do Decisor', () => {
  it('totais, linhas, recomendada e empate são iguais com e sem contexto; só a justificativa pode mudar', () => {
    fc.assert(
      fc.property(objetivo, notas, contexto, (obj, n, ctx) => {
        const sem = decidir(config, obj, n);
        const com = decidir(config, obj, n, ctx);
        expect(com.avaliacoes).toEqual(sem.avaliacoes);
        expect(com.recomendada).toBe(sem.recomendada);
        expect(com.empate).toEqual(sem.empate);
        expect(com.objetivo).toBe(sem.objetivo);
        // The context only appends text: the scored part of the justification is untouched.
        expect(com.justificativa.startsWith(sem.justificativa)).toBe(true);
      }),
      { numRuns: 200 },
    );
  });
});

describe('propriedade 9: o orçamento não é critério do Decisor', () => {
  const ehOrcamento = (s: string) => /or[cç]amento|budget/i.test(s);

  it('nenhum critério do guia, nem peso por objetivo, é o orçamento', () => {
    expect(config.criterios.some(ehOrcamento)).toBe(false);
    for (const pesos of Object.values(config.pesos)) expect(Object.keys(pesos).some(ehOrcamento)).toBe(false);
  });

  it('DecisorConfig tem só os cinco campos do bloco e não aceita campos de eixo', () => {
    expect(Object.keys(config).sort()).toEqual(['criterios', 'escala', 'opcoes', 'ordem_desempate', 'pesos']);
    // Type-level: an axis field in the config is a compile error (checked by tsc).
    const base: DecisorConfig = config;
    // @ts-expect-error DecisorConfig does not accept axis fields
    const _comOrcamento: DecisorConfig = { ...base, orcamento: 1 };
    // @ts-expect-error DecisorConfig does not accept axis fields
    const _comEixo: DecisorConfig = { ...base, eixos: ['orcamento'] };
    void _comOrcamento;
    void _comEixo;
  });

  it('o orçamento só entra no contexto, e mudá-lo nunca muda a recomendação', () => {
    fc.assert(
      fc.property(objetivo, notas, escalar, escalar, (obj, n, a, b) => {
        expect(decidir(config, obj, n, { orcamento: a })).toMatchObject({ recomendada: decidir(config, obj, n, { orcamento: b }).recomendada });
      }),
      { numRuns: 100 },
    );
  });

  it('no guia, o portão do orçamento fica no fluxo com_dcs, antes da tarefa que pontua no Decisor', () => {
    const nos = (doc.decisoes as Array<Record<string, any>>).filter((d) => d.raia === 'com_dcs');
    const porId = new Map(nos.map((d) => [d.id as string, d]));
    const portao = porId.get('com_dcs_g1');
    const pontua = porId.get('com_dcs_t2');
    expect(portao?.tipo).toBe('bifurcacao');
    const destinos = (portao?.proximo as Array<{ para: string }>).map((p) => p.para);
    expect(destinos).toContain('com_dcs_t2');
    const saida = porId.get(destinos.find((d) => d !== 'com_dcs_t2') as string);
    expect(saida?.tipo).toBe('fim');
    expect(saida?.retorno).toBe('fora_do_orcamento');
    expect(pontua?.rotulo).toMatch(/Decisor/);
    // The Decisor task is reached only through the gate.
    const entradas = nos.filter((d) => (d.proximo as Array<{ para: string }>).some((p) => p.para === 'com_dcs_t2')).map((d) => d.id);
    expect(entradas).toEqual(['com_dcs_g1']);
  });
});
