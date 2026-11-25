// SPDX-License-Identifier: MIT
// Port of tools/guide-oracle/tests/properties/test_subtarefas_dados_props.py (Properties 39 to 45), task 10.2 part 2.
// One `it` per Python property. validate/rastrear_dados/descrever_condicao map to validateGuide, rastrearDados and
// descreverCondicao; Issue.item_id is `itemId`. Python's `assume` becomes `fc.pre`. Determinism: fixed seed,
// numRuns = Python max_examples, shrinking capped (endOnFailure).
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { chaveNatural, cmpKey } from '../../../lib/flow-mermaid/order';
import { descreverCondicao, rastrearDados } from '../../../lib/guide/rastreio';
import { validateGuide } from '../../../lib/guide/validate';
import { type D, TIPOS_ARTEFATO, gerarCondicao, gerarVariaveis, validDocs } from './geradores';

const root = new URL('../../../', import.meta.url).pathname;
const schema = JSON.parse(readFileSync(join(root, 'schema/flows.schema.json'), 'utf8'));
const params = (numRuns: number): fc.Parameters<unknown> => ({ numRuns, seed: 20240607, endOnFailure: true, verbose: 0 });
const TIMEOUT = 120_000;

// The generator ids have at most 6 characters in the first group and 5 in the others, so these never collide.
const FAKE = 'zz_inexistente';
const TECNICA_PROP = 'tecnica_propriedade';
const VARS_PROP = ['variavel_prop_a', 'variavel_prop_b', 'variavel_prop_c'];

const naturalmente = (a: string, b: string) => cmpKey(chaveNatural(a), chaveNatural(b));
const sorted = (xs: Iterable<string>) => [...xs].sort(naturalmente);
const pickIdx = fc.integer({ min: 0, max: 10_000 });

/** [path, item, accepts `saidas`] of lanes, nodes and subtasks. */
function donos(doc: D): Array<[string, D, boolean]> {
  const out: Array<[string, D, boolean]> = doc.raias.map((r: D, i: number) => [`raias[${i}]`, r, false] as [string, D, boolean]);
  doc.decisoes.forEach((d: D, i: number) => {
    out.push([`decisoes[${i}]`, d, true]);
    (d.subtarefas ?? []).forEach((s: D, k: number) => out.push([`decisoes[${i}].subtarefas[${k}]`, s, true]));
  });
  return out;
}

/** Valid document with generated variables and one valid conditional use on some node. Returns [doc, condition]. */
const docComCondicao = (): fc.Arbitrary<[D, D]> =>
  fc.tuple(validDocs(), fc.gen()).map(([original, gen]) => {
    const g = <T>(arb: fc.Arbitrary<T>) => gen(() => arb);
    const doc: D = structuredClone(original);
    if (!doc.variaveis?.length) for (const d of doc.decisoes) d.estado = {}; // without a prior catalogue, loose state keys would raise a warning
    const variaveis = gerarVariaveis(g, VARS_PROP);
    doc.variaveis = [...(doc.variaveis ?? []), ...variaveis];
    doc.artefatos ??= [];
    doc.tecnicas = [...doc.tecnicas, { id: TECNICA_PROP, nome: 'Técnica de propriedade' }];
    const condicao = gerarCondicao(g, variaveis);
    const uso = { tecnica: TECNICA_PROP, uso: 'condicional', quando: condicao };
    const alvos = donos(doc).filter(([c]) => !c.startsWith('raias'));
    const alvo = alvos[g(fc.integer({ min: 0, max: alvos.length - 1 }))][1];
    (alvo.tecnicas ??= []).push(uso);
    const citadas = new Set<string>([...(condicao.todos ?? []), ...(condicao.algum ?? [])].map((t: D) => t.var));
    for (const v of variaveis) {
      // A variable with no use would raise ITEM_SEM_USO: a node state key counts as use and does not open adoption.
      if (!citadas.has(v.id)) (doc.decisoes[0].estado ??= {})[v.id] = 'x';
    }
    return [doc, condicao];
  });

const quandoFalso = () => ({ todos: [{ var: FAKE, igual: 'x' }] });

describe('subtarefas, dados e técnicas condicionais (port de test_subtarefas_dados_props.py)', () => {
  // ---------------------------------------------------------------- Property 39

  it('test_condicao_valida_e_sempre_aceita', () => {
    fc.assert(
      fc.property(docComCondicao(), ([doc, condicao]) => {
        expect(validateGuide(doc, schema, { avisos: true })).toEqual([]);
        const texto = descreverCondicao(condicao);
        expect(texto).toBe(descreverCondicao(structuredClone(condicao)));
        expect(texto.startsWith('quando ')).toBe(true);
        expect(texto.includes('\u2014') || texto.includes('\u2013')).toBe(false);
        const chave = 'todos' in condicao ? 'todos' : 'algum';
        const juncao = chave === 'todos' ? ' e ' : ' ou ';
        expect(texto.split(juncao).length - 1).toBeGreaterThanOrEqual(condicao[chave].length - 1);
        for (const termo of condicao[chave]) expect(texto).toContain(termo.var);
      }),
      params(100),
    );
  }, TIMEOUT);

  it('test_condicional_sem_quando_e_sempre_rejeitado', () => {
    fc.assert(
      fc.property(docComCondicao(), pickIdx, ([doc], pick) => {
        const usos = donos(doc).flatMap(([c, i]) => (i.tecnicas ?? []).filter((u: D) => u.uso === 'condicional').map((u: D) => [c, u] as const));
        const [caminho, uso] = usos[pick % usos.length];
        delete uso.quando;
        const issues = validateGuide(doc, schema);
        expect(issues.some((i) => i.code === 'CONDICAO_AUSENTE' && i.nivel === 'erro'), caminho).toBe(true);
      }),
      params(100),
    );
  }, TIMEOUT);

  // ---------------------------------------------------------------- Property 40

  it('test_ref_quebrada_em_entradas_e_saidas_e_sempre_reportada', () => {
    fc.assert(
      fc.property(validDocs(), pickIdx, fc.constantFrom('entradas', 'saidas'), (original, pick, campo) => {
        const doc = structuredClone(original);
        const candidatos = donos(doc).filter(([, , aceitaSaidas]) => campo === 'entradas' || aceitaSaidas);
        const [caminho, item] = candidatos[pick % candidatos.length];
        (item[campo] ??= []).push(FAKE);
        const esperado = `${caminho}.${campo}[${item[campo].length - 1}]`;
        const achados = validateGuide(doc, schema).filter((i) => i.code === 'REF_QUEBRADA' && i.path === esperado);
        expect(achados.length).toBe(1);
        expect(achados[0].itemId).toBe(item.id);
        expect(achados[0].nivel).toBe('erro');
      }),
      params(100),
    );
  }, TIMEOUT);

  it('test_ref_quebrada_de_tecnica_e_sempre_reportada', () => {
    fc.assert(
      fc.property(validDocs(), pickIdx, (original, pick) => {
        const doc = structuredClone(original);
        const candidatos = donos(doc).filter(([c]) => !c.startsWith('raias'));
        const [caminho, item] = candidatos[pick % candidatos.length];
        (item.tecnicas ??= []).push({ tecnica: FAKE, uso: 'opcional' });
        const esperado = `${caminho}.tecnicas[${item.tecnicas.length - 1}].tecnica`;
        const achados = validateGuide(doc, schema).filter((i) => i.code === 'REF_QUEBRADA' && i.path === esperado);
        expect(achados.map((i) => [i.itemId, i.nivel])).toEqual([[item.id, 'erro']]);
      }),
      params(100),
    );
  }, TIMEOUT);

  it('test_ref_quebrada_de_variavel_da_condicao_e_sempre_reportada', () => {
    fc.assert(
      fc.property(validDocs(), pickIdx, (original, pick) => {
        const doc = structuredClone(original);
        doc.tecnicas = [...doc.tecnicas, { id: TECNICA_PROP, nome: 'T' }];
        const candidatos = donos(doc).filter(([c]) => !c.startsWith('raias'));
        const [caminho, item] = candidatos[pick % candidatos.length];
        (item.tecnicas ??= []).push({ tecnica: TECNICA_PROP, uso: 'condicional', quando: quandoFalso() });
        const esperado = `${caminho}.tecnicas[${item.tecnicas.length - 1}].quando.todos[0].var`;
        const achados = validateGuide(doc, schema).filter((i) => i.code === 'REF_QUEBRADA' && i.path === esperado);
        expect(achados.map((i) => [i.itemId, i.nivel])).toEqual([[item.id, 'erro']]);
      }),
      params(100),
    );
  }, TIMEOUT);

  // ---------------------------------------------------------------- Property 41

  it('test_rastrear_dados_e_consistente_com_o_documento', () => {
    fc.assert(
      fc.property(validDocs(), (doc) => {
        const rastro = rastrearDados(doc);
        const catalogo = new Map<string, [D, string]>();
        for (const x of doc.artefatos ?? []) catalogo.set(x.id, [x, 'artefato']);
        for (const x of doc.variaveis ?? []) catalogo.set(x.id, [x, 'variavel']);
        expect(new Set(Object.keys(rastro))).toEqual(new Set(catalogo.keys()));
        expect(Object.keys(rastro)).toEqual(sorted(Object.keys(rastro)));
        const todos = donos(doc);
        for (const [id, info] of Object.entries(rastro)) {
          const [item, tipo] = catalogo.get(id) as [D, string];
          expect(info.tipo).toBe(tipo);
          expect(info.nome).toBe(item.nome);
          const produtores = new Set<string>(todos.filter(([, i]) => (i.saidas ?? []).includes(id)).map(([, i]) => i.id));
          const consumidores = new Set<string>(todos.filter(([, i]) => (i.entradas ?? []).includes(id)).map(([, i]) => i.id));
          expect(info.produzido_por).toEqual(sorted(produtores));
          expect(info.consumido_por).toEqual(sorted(consumidores));
          expect(new Set(info.produzido_por).size).toBe(info.produzido_por.length);
        }
      }),
      params(100),
    );
  }, TIMEOUT);

  it('test_rastrear_dados_e_deterministico_e_nao_altera_o_documento', () => {
    fc.assert(
      fc.property(validDocs(), (doc) => {
        const antes = structuredClone(doc);
        const primeiro = rastrearDados(doc);
        expect(rastrearDados(structuredClone(doc))).toEqual(primeiro);
        expect(JSON.stringify(primeiro)).toBe(JSON.stringify(rastrearDados(doc)));
        expect(doc).toEqual(antes);
      }),
      params(100),
    );
  }, TIMEOUT);

  // ---------------------------------------------------------------- Property 42

  it('test_documento_valido_nao_gera_erros_nem_avisos', () => {
    fc.assert(
      fc.property(validDocs(), (doc) => {
        expect(validateGuide(doc, schema, { avisos: true })).toEqual([]);
      }),
      params(100),
    );
  }, TIMEOUT);

  // ---------------------------------------------------------------- Property 43

  it('test_quando_de_subtarefa_com_variavel_inexistente_e_sempre_reportado', () => {
    fc.assert(
      fc.property(validDocs(), pickIdx, (original, pick) => {
        const doc = structuredClone(original);
        const subs = doc.decisoes.flatMap((d: D, i: number) => (d.subtarefas ?? []).map((s: D, k: number) => [i, k, s] as const));
        fc.pre(subs.length > 0);
        const [i, k, sub] = subs[pick % subs.length];
        sub.quando = quandoFalso();
        const esperado = `decisoes[${i}].subtarefas[${k}].quando.todos[0].var`;
        const achados = validateGuide(doc, schema).filter((x) => x.code === 'REF_QUEBRADA' && x.path === esperado);
        expect(achados.map((x) => [x.itemId, x.nivel])).toEqual([[sub.id, 'erro']]);
      }),
      params(100),
    );
  }, TIMEOUT);

  it('test_quando_de_variante_com_variavel_inexistente_e_sempre_reportado', () => {
    fc.assert(
      fc.property(validDocs(), pickIdx, (original, pick) => {
        const doc = structuredClone(original);
        fc.pre(doc.artefatos?.length > 0);
        const k = pick % doc.artefatos.length;
        const art = doc.artefatos[k];
        art.variantes = [{ nome: 'v', quando: quandoFalso() }];
        const esperado = `artefatos[${k}].variantes[0].quando.todos[0].var`;
        const achados = validateGuide(doc, schema).filter((x) => x.code === 'REF_QUEBRADA' && x.path === esperado);
        expect(achados.map((x) => [x.itemId, x.nivel])).toEqual([[art.id, 'erro']]);
      }),
      params(100),
    );
  }, TIMEOUT);

  it('test_nome_de_variante_repetido_e_sempre_reportado', () => {
    fc.assert(
      fc.property(docComCondicao(), pickIdx, ([doc, condicao], pick) => {
        fc.pre(doc.artefatos?.length > 0);
        const k = pick % doc.artefatos.length;
        const art = doc.artefatos[k];
        art.variantes = [
          { nome: 'mesmo', quando: structuredClone(condicao) },
          { nome: 'mesmo', quando: structuredClone(condicao) },
        ];
        const achados = validateGuide(doc, schema).filter((x) => x.code === 'VARIANTE_DUPLICADA');
        expect(achados.map((x) => [x.path, x.itemId, x.nivel])).toEqual([[`artefatos[${k}].variantes[1].nome`, art.id, 'erro']]);
      }),
      params(100),
    );
  }, TIMEOUT);

  // ---------------------------------------------------------------- Property 44

  it('test_tarefa_sem_artefato_entregue_em_raia_em_adocao_sempre_avisa', () => {
    fc.assert(
      fc.property(validDocs(), pickIdx, (original, pick) => {
        const doc = structuredClone(original);
        const artefatos = new Set<string>((doc.artefatos ?? []).map((a: D) => a.id));
        const adota = (x: D) => ['entradas', 'saidas', 'subtarefas'].some((c) => c in x);
        const emAdocao = new Set<string>([...doc.raias.filter(adota).map((r: D) => r.id), ...doc.decisoes.filter(adota).map((d: D) => d.raia)]);
        const tarefas = doc.decisoes.flatMap((d: D, i: number) => (d.tipo === 'tarefa' && emAdocao.has(d.raia) ? [[i, d] as const] : []));
        fc.pre(tarefas.length > 0);
        const [i, alvo] = tarefas[pick % tarefas.length];
        alvo.saidas = (alvo.saidas ?? []).filter((x: string) => !artefatos.has(x));
        for (const sub of alvo.subtarefas ?? []) sub.saidas = (sub.saidas ?? []).filter((x: string) => !artefatos.has(x));
        const achados = validateGuide(doc, schema, { avisos: true }).filter((x) => x.code === 'TAREFA_SEM_ENTREGAVEL' && x.itemId === alvo.id);
        expect(achados.map((x) => [x.path, x.nivel])).toEqual([[`decisoes[${i}]`, 'aviso']]);
      }),
      params(100),
    );
  }, TIMEOUT);

  // ---------------------------------------------------------------- Property 45

  it('test_gerador_cobre_subtarefa_condicional_variantes_tipos_novos_e_subtipo', () => {
    const subs = (d: D): D[] => d.decisoes.flatMap((n: D) => n.subtarefas ?? []);
    const novos = new Set(TIPOS_ARTEFATO.filter((t) => !['documento', 'dado', 'decisao', 'sinal'].includes(t)));
    // Python's `find` only has to PROVE the generator reaches each field. `fc.check` over the negated predicate stops at
    // the first document that satisfies it (a "failure"), with the same ceiling of 2000 attempts and no shrinking.
    const encontra = (pred: (d: D) => boolean) => {
      const r = fc.check(
        fc.property(validDocs(), (d) => !pred(d)),
        { numRuns: 2000, seed: 20240607, endOnFailure: true, verbose: 0 },
      );
      expect(r.failed, `o gerador não alcançou o campo em ${r.numRuns} tentativas`).toBe(true);
    };
    encontra((d) => subs(d).some((s) => 'quando' in s));
    encontra((d) => subs(d).some((s) => 'porque' in s && 'quando' in s));
    encontra((d) => (d.artefatos ?? []).some((a: D) => a.variantes?.length));
    encontra((d) => (d.artefatos ?? []).some((a: D) => novos.has(a.tipo)));
    encontra((d) => (d.artefatos ?? []).some((a: D) => 'subtipo' in a));
  }, 300_000);
});
