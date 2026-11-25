// SPDX-License-Identifier: MIT
// Port of tools/guide-oracle/tests/properties/test_validator_props.py (Properties 6, 7, 8, 21 and 32), task 10.2 part 2.
// One `it` per Python property. `validate(doc, SCHEMA)` becomes `validateGuide(doc, schema)`; Issue.item_id is `itemId`.
// Python's `assume` becomes `fc.pre`. Determinism: fixed seed, numRuns = Python max_examples, shrinking capped
// (endOnFailure) because documents are large.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { loadGuideDoc } from '../../../lib/guide/load';
import { validateGuide } from '../../../lib/guide/validate';
import { CRITERIOS, type D, validDocs } from './geradores';

const root = new URL('../../../', import.meta.url).pathname;
const schema = JSON.parse(readFileSync(join(root, 'schema/flows.schema.json'), 'utf8'));
const YAML_REAL = join(root, 'content/guide');
const params = (numRuns: number): fc.Parameters<unknown> => ({ numRuns, seed: 20240607, endOnFailure: true, verbose: 0 });
const TIMEOUT = 120_000;
const TOLERANCIA_PESOS = 1e-9;
const FAKE_ID = 'zz_inexistente'; // generated ids have at most 5 characters per group, so they never collide
const LISTAS_REF = ['tecnicas', 'abordagens', 'padroes', 'estrategias', 'categorias_ferramenta'];

type Problema = ReturnType<typeof validateGuide>[number];
const porCodigo = (issues: Problema[], codigo: string) => issues.filter((i) => i.code === codigo);
const fsum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);

// ------------------------------------------------------------------ Property 6

type Alvo = [codigo: string, ...caminho: Array<string | number>];

/** Paths of every field that holds the id of another item, with the expected code. */
function alvosDeReferencia(doc: D): Alvo[] {
  const alvos: Alvo[] = doc.raias.map((_: D, i: number) => ['REF_QUEBRADA', 'raias', i, 'demanda'] as Alvo);
  doc.decisoes.forEach((d: D, i: number) => {
    alvos.push(['REF_QUEBRADA', 'decisoes', i, 'raia']);
    if ('raia_chamada' in d) alvos.push(['REF_QUEBRADA', 'decisoes', i, 'raia_chamada']);
    for (let j = 0; j < d.proximo.length; j++) alvos.push(['TRANSICAO_INVALIDA', 'decisoes', i, 'proximo', j, 'para']);
    for (const campo of ['demanda', 'playbook']) if (campo in d) alvos.push(['REF_QUEBRADA', 'decisoes', i, campo]);
  });
  for (const colecao of ['celulas', 'playbooks']) {
    doc[colecao].forEach((item: D, i: number) => {
      if (colecao === 'celulas') for (const campo of ['demanda', 'requisito']) alvos.push(['REF_QUEBRADA', colecao, i, campo]);
      for (const campo of LISTAS_REF) for (let j = 0; j < (item[campo] ?? []).length; j++) alvos.push(['REF_QUEBRADA', colecao, i, campo, j]);
    });
  }
  doc.fontes.forEach((f: D, i: number) => {
    for (let j = 0; j < (f.itens ?? []).length; j++) alvos.push(['REF_QUEBRADA', 'fontes', i, 'itens', j]);
  });
  return alvos;
}

function origemEsperada(doc: D, colecao: string, i: number): string {
  const item = doc[colecao][i];
  return colecao === 'celulas' ? `${item.demanda}:${item.requisito}` : item.id;
}

const caminhoTexto = (partes: Array<string | number>) => partes.reduce<string>((out, p) => out + (typeof p === 'number' ? `[${p}]` : out ? `.${p}` : String(p)), '');

// ------------------------------------------------------------------ Property 7

const COLECOES_DUPLICAVEIS = ['demandas', 'requisitos', 'decisoes', 'playbooks', 'abordagens', 'tecnicas', 'padroes', 'estrategias', 'categorias_ferramenta', 'fontes'];

// ------------------------------------------------------------------ Property 8

/** Valid document whose per-lane graph is rewritten freely (without breaking the Schema). Destinations stay inside the lane. */
const grafos = (): fc.Arbitrary<D> =>
  fc.tuple(validDocs(), fc.gen()).map(([original, gen]) => {
    const draw = <T>(arb: fc.Arbitrary<T>) => gen(() => arb);
    const doc: D = structuredClone(original);
    const idsPorRaia: Record<string, string[]> = {};
    for (const d of doc.decisoes) (idsPorRaia[d.raia] ??= []).push(d.id);
    for (const d of doc.decisoes) {
      const ids = idsPorRaia[d.raia];
      const tipo = draw(fc.constantFrom('inicio', 'tarefa', 'bifurcacao', 'fim'));
      let alvos = draw(fc.array(fc.constantFrom(...ids), { maxLength: 3 }));
      if (tipo !== 'fim' && alvos.length === 0) alvos = [draw(fc.constantFrom(...ids))]; // the Schema needs at least one exit outside `fim`
      d.tipo = tipo;
      delete d.raia_chamada;
      delete d.retorno;
      if (tipo === 'fim') d.retorno = 'r';
      d.proximo = alvos.map((a) => ({ para: a, condicao: '' }));
    }
    return doc;
  });

/** Reachable from the `inicio` of each lane, without leaving the lane. */
function alcancaveis(decisoes: D[]): Set<string> {
  const porId = new Map<string, D>(decisoes.map((d) => [d.id, d]));
  const fila = decisoes.filter((d) => d.tipo === 'inicio').map((d) => d.id as string);
  const vistos = new Set<string>(fila);
  while (fila.length) {
    const no = porId.get(fila.shift() as string) as D;
    for (const t of no.proximo) {
      if (!vistos.has(t.para) && (porId.get(t.para) as D).raia === no.raia) {
        vistos.add(t.para);
        fila.push(t.para);
      }
    }
  }
  return vistos;
}

// ------------------------------------------------------------------ Property 21

function comPesos(doc: D, pesos: Record<string, number>): [D, string] {
  const novo = structuredClone(doc);
  const objetivo = Object.keys(novo.decisor_construir_comprar_assinar.pesos).sort()[0];
  novo.decisor_construir_comprar_assinar.pesos[objetivo] = pesos;
  return [novo, objetivo];
}

type Pesos = Record<string, number>;
/** Five weights in [0,1]: free, normalized, or normalized with one deviation (even a tiny one). */
const tabelasDePesos = (): fc.Arbitrary<Pesos> =>
  fc
    .tuple(
      fc.array(fc.double({ min: 0, max: 1, noNaN: true }), { minLength: 5, maxLength: 5 }),
      fc.constantFrom('livre', 'normalizado', 'desvio'),
      fc.constantFrom(1e-12, -1e-12, 1e-10, -1e-10, 1e-8, -1e-8, 1e-3, -1e-3),
      fc.integer({ min: 0, max: 4 }),
    )
    .map(([brutos0, modo, delta, k]): Pesos | null => {
      let brutos = brutos0;
      if (modo !== 'livre') {
        const total = fsum(brutos);
        if (!(total > 0)) return null;
        brutos = brutos.map((x) => x / total);
      }
      if (modo === 'desvio') {
        brutos[k] += delta;
        if (!(brutos[k] >= 0 && brutos[k] <= 1)) return null;
      }
      return Object.fromEntries(CRITERIOS.map((c, i) => [c, brutos[i]]));
    })
    .filter((p): p is Pesos => p !== null);

// ------------------------------------------------------------------ Property 32

/** Minimal walker: reads only `id`, `condicao`, `proximo` and `estado` (and `tipo` to find the start). */
function percorrer(decisoes: D[]): Set<string> {
  const porId = new Map<string, D>(decisoes.map((d) => [d.id, d]));
  const fila = decisoes.filter((d) => d.tipo === 'inicio').map((d) => d.id as string);
  const vistos = new Set<string>(fila);
  while (fila.length) {
    const no = porId.get(fila.shift() as string) as D;
    expect(typeof no.condicao).toBe('string');
    expect(typeof no.estado === 'object' && no.estado !== null && !Array.isArray(no.estado)).toBe(true);
    for (const t of no.proximo) {
      expect(typeof t.condicao).toBe('string');
      if (!vistos.has(t.para)) {
        vistos.add(t.para);
        fila.push(t.para);
      }
    }
  }
  return vistos;
}

describe('validador (port de test_validator_props.py)', () => {
  // Property 6: Referências quebradas e destinos inexistentes são reportados. Validates: Requirements 3.3, 8.5, 10.6
  it('test_property_6_referencias_quebradas_sao_reportadas', () => {
    fc.assert(
      fc.property(validDocs(), fc.integer({ min: 0, max: 10_000 }), (doc, pick) => {
        const alvos = alvosDeReferencia(doc);
        expect(alvos.length, 'todo documento válido tem ao menos uma transição').toBeGreaterThan(0);
        const [codigo, ...caminho] = alvos[pick % alvos.length];
        const mutado = structuredClone(doc);
        let pai: D = mutado;
        for (const parte of caminho.slice(0, -1)) pai = pai[parte];
        pai[caminho[caminho.length - 1]] = FAKE_ID;

        const issues = validateGuide(mutado, schema);

        const origem = origemEsperada(mutado, caminho[0] as string, caminho[1] as number);
        const path = caminhoTexto(caminho);
        const achados = porCodigo(issues, codigo).filter((i) => i.path === path);
        expect(achados.length, `nenhum ${codigo} em ${path}; issues: ${JSON.stringify(issues)}`).toBeGreaterThan(0);
        for (const issue of achados) {
          expect(issue.message, 'o Issue deve conter o id inválido').toContain(FAKE_ID);
          expect(issue.itemId, 'o Issue deve identificar o item de origem').toBe(origem);
        }
        expect(porCodigo(issues, 'SCHEMA')).toEqual([]);
      }),
      params(100),
    );
  }, TIMEOUT);

  // Property 7: Ids duplicados são reportados. Validates: Requirements 3.4
  it('test_property_7_ids_duplicados_sao_reportados', () => {
    fc.assert(
      fc.property(validDocs(), fc.integer({ min: 0, max: 10_000 }), (doc, pick) => {
        const candidatos = COLECOES_DUPLICAVEIS.flatMap((c) => (doc[c] as D[]).map((_, i) => [c, i] as const));
        const [colecao, i] = candidatos[pick % candidatos.length];
        const mutado = structuredClone(doc);
        const id = mutado[colecao][i].id;
        mutado[colecao].push(structuredClone(mutado[colecao][i]));
        const n = mutado[colecao].length - 1;

        const issues = validateGuide(mutado, schema);

        const duplicados = porCodigo(issues, 'ID_DUPLICADO').filter((x) => x.path === `${colecao}[${n}].id`);
        expect(duplicados.length, `ID_DUPLICADO ausente para ${colecao}[${n}]; issues: ${JSON.stringify(issues)}`).toBeGreaterThan(0);
        const msg = duplicados[0].message;
        expect(msg).toContain(`${colecao}[${i}]`);
        expect(msg).toContain(`${colecao}[${n}]`);
        expect(msg).toContain(id);
        expect(duplicados[0].itemId).toBe(id);
      }),
      params(100),
    );
  }, TIMEOUT);

  // Property 8: Estrutura do grafo de decisões (alcançabilidade por raia). Validates: Requirements 3.5, 3.6
  it('test_property_8_estrutura_do_grafo', () => {
    fc.assert(
      fc.property(grafos(), (doc) => {
        const issues = validateGuide(doc, schema);
        expect(porCodigo(issues, 'SCHEMA'), JSON.stringify(issues)).toEqual([]);

        const esperadoBif = new Set<string>(doc.decisoes.filter((d: D) => d.tipo === 'bifurcacao' && d.proximo.length < 2).map((d: D) => d.id));
        const vistos = alcancaveis(doc.decisoes);
        const esperadoOrfa = new Set<string>(doc.decisoes.filter((d: D) => !vistos.has(d.id)).map((d: D) => d.id));

        expect(new Set(porCodigo(issues, 'BIFURCACAO_SAIDAS').map((i) => i.itemId))).toEqual(esperadoBif);
        expect(new Set(porCodigo(issues, 'ORFA').map((i) => i.itemId))).toEqual(esperadoOrfa);
        if (esperadoBif.size === 0 && esperadoOrfa.size === 0) {
          expect(porCodigo(issues, 'BIFURCACAO_SAIDAS')).toEqual([]);
          expect(porCodigo(issues, 'ORFA')).toEqual([]);
        }
      }),
      params(100),
    );
  }, TIMEOUT);

  // Property 8 (parte final): every `proximo[].para` of a valid document points to an existing Decisao.
  it('test_property_8_documento_valido_tem_destinos_existentes', () => {
    fc.assert(
      fc.property(validDocs(), (doc) => {
        expect(validateGuide(doc, schema)).toEqual([]);
        const ids = new Set<string>(doc.decisoes.map((d: D) => d.id));
        expect(doc.decisoes.every((d: D) => d.proximo.every((t: D) => ids.has(t.para)))).toBe(true);
      }),
      params(100),
    );
  }, TIMEOUT);

  // Property 21: Pesos somam 1. Validates: Requirements 7.9
  it('test_property_21_pesos_somam_um', () => {
    fc.assert(
      fc.property(validDocs(), tabelasDePesos(), (doc, pesos) => {
        const desvio = Math.abs(fsum(Object.values(pesos)) - 1.0);
        fc.pre(Math.abs(desvio - TOLERANCIA_PESOS) > 1e-12); // avoids the exact tolerance boundary
        const [mutado, objetivo] = comPesos(doc, pesos);

        const issues = validateGuide(mutado, schema);

        expect(porCodigo(issues, 'SCHEMA'), JSON.stringify(issues)).toEqual([]);
        const reportado = porCodigo(issues, 'PESOS').filter((i) => i.itemId === objetivo);
        if (desvio <= TOLERANCIA_PESOS) expect(reportado, 'soma dentro da tolerância deve ser aceita').toEqual([]);
        else expect(reportado.length, 'soma fora da tolerância deve ser rejeitada').toBeGreaterThan(0);
      }),
      params(100),
    );
  }, TIMEOUT);

  // Property 21 (parte real): the sum of each objective in the real guide is 1. Validates: Requirements 7.9
  it('test_property_21_yaml_real_pesos_somam_um', () => {
    const doc = loadGuideDoc(YAML_REAL);
    const pesos = doc.decisor_construir_comprar_assinar.pesos as Record<string, Pesos>;
    expect(Object.keys(pesos).length).toBeGreaterThan(0);
    for (const [objetivo, tabela] of Object.entries(pesos)) {
      expect(Math.abs(fsum(Object.values(tabela)) - 1.0), objetivo).toBeLessThanOrEqual(TOLERANCIA_PESOS);
    }
  });

  // Property 32: Fluxo percorrível apenas com id, condição, próximo e estado. Validates: Requirements 13.2, 13.3, 13.5
  it('test_property_32_fluxo_percorrivel_com_campos_minimos', () => {
    fc.assert(
      fc.property(validDocs(), (doc) => {
        const reduzido = doc.decisoes.map((d: D) => Object.fromEntries(['id', 'tipo', 'condicao', 'proximo', 'estado'].map((k) => [k, d[k]])));
        expect(percorrer(reduzido)).toEqual(new Set<string>(doc.decisoes.map((d: D) => d.id)));
      }),
      params(100),
    );
  }, TIMEOUT);

  // Property 32 (parte do Schema): rejects `proximo` without `para` or `condicao`, and `estado` that is not an object.
  it('test_property_32_schema_rejeita_fluxo_malformado', () => {
    const estadoRuim = fc.oneof(fc.constant(null), fc.integer(), fc.string({ maxLength: 5 }), fc.array(fc.integer(), { maxLength: 3 }), fc.boolean());
    fc.assert(
      fc.property(
        validDocs(),
        fc.integer({ min: 0, max: 10_000 }),
        fc.constantFrom('sem_para', 'sem_condicao', 'estado_invalido'),
        estadoRuim,
        (doc, pick, defeito, ruim) => {
          const mutado = structuredClone(doc);
          let esperado: string;
          if (defeito === 'estado_invalido') {
            const i = pick % mutado.decisoes.length;
            mutado.decisoes[i].estado = ruim;
            esperado = `decisoes[${i}].estado`;
          } else {
            const pares = mutado.decisoes.flatMap((d: D, i: number) => d.proximo.map((_: D, j: number) => [i, j] as const));
            const [i, j] = pares[pick % pares.length];
            delete mutado.decisoes[i].proximo[j][defeito === 'sem_para' ? 'para' : 'condicao'];
            esperado = `decisoes[${i}].proximo[${j}]`;
          }

          const issues = validateGuide(mutado, schema);

          expect(issues.some((x) => x.code === 'SCHEMA' && x.path === esperado), `${esperado} ${JSON.stringify(issues)}`).toBe(true);
        },
      ),
      params(100),
    );
  }, TIMEOUT);
});
