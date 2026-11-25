// SPDX-License-Identifier: MIT
// Port of tools/guide-oracle/tests/properties/test_yaml_schema_props.py (Properties 1 to 5), task 10.2 part 1.
// One `it` per Python property. dump_yaml/load_yaml map to YAML.stringify/YAML.parse with the loader options of
// lib/guide/load.ts (core schema, uniqueKeys false); the CLI runs in-process through tools/guide/cli.ts `main`.
// Determinism: fixed seed, bounded numRuns, shrinking capped (endOnFailure) because documents are large.
// Python's `.filter(...)` on valid_docs becomes `fc.pre(...)`: validDocs() is built on fc.gen(), and `.filter` on it
// redraws the same document on every rejection (it never advances the random source), which loops until out of memory.
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import fc from 'fast-check';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import YAML from 'yaml';
import { validateGuide } from '../../../lib/guide/validate';
import { main } from '../../../tools/guide/cli';
import { type D, validDocs } from './geradores';

const root = new URL('../../../', import.meta.url).pathname;
const schemaPath = join(root, 'schema/flows.schema.json');
const schema = JSON.parse(readFileSync(schemaPath, 'utf8'));
const params = (numRuns: number): fc.Parameters<unknown> => ({ numRuns, seed: 20240607, endOnFailure: true, verbose: 0 });
const TIMEOUT = 120_000;

const CAMPOS: Record<string, string[]> = {
  decisoes: ['id', 'raia', 'tipo', 'condicao', 'proximo', 'estado'],
  raias: ['id', 'nome', 'demanda', 'responsabilidade', 'cor'],
  categorias_ferramenta: ['custo', 'beneficio', 'dependencia_fornecedor'],
  fontes: ['tipo', 'titulo', 'link', 'status_revisao', 'proxima_revisao'],
};

let tmp: string;
beforeAll(() => {
  tmp = mkdtempSync(join(tmpdir(), 'yaml-schema-props-'));
});
afterAll(() => rmSync(tmp, { recursive: true, force: true }));

const dumpYaml = (doc: D) => YAML.stringify(doc);
const loadYaml = (text: string) => YAML.parse(text, { schema: 'core', uniqueKeys: false });

/** Writes `doc` to a temp file and runs `guide validar` in-process; returns the exit code. */
function rodarCli(doc: D): number {
  const y = join(tmp, 'doc.yaml');
  writeFileSync(y, dumpYaml(doc), 'utf8');
  const log = vi.spyOn(console, 'log').mockImplementation(() => {});
  const err = vi.spyOn(console, 'error').mockImplementation(() => {});
  try {
    return main(['validar', '--yaml', y, '--schema', schemaPath]);
  } finally {
    log.mockRestore();
    err.mockRestore();
  }
}

const schemaIssuesEm = (doc: D, prefixo: string) => validateGuide(doc, schema).filter((i) => i.code === 'SCHEMA' && i.path.startsWith(prefixo));

describe('YAML_Fonte e Schema (port de test_yaml_schema_props.py)', () => {
  it('test_property_1_ida_e_volta_do_yaml_fonte', () => {
    fc.assert(
      fc.property(validDocs(), (doc) => {
        const original = structuredClone(doc);
        const carregado = loadYaml(dumpYaml(doc));
        expect(carregado).toEqual(original);
        expect(doc).toEqual(original); // dumpYaml não altera a entrada
      }),
      params(100),
    );
  }, TIMEOUT);

  it('test_property_2_documento_valido_nao_produz_erros', () => {
    fc.assert(
      fc.property(validDocs(), (doc) => {
        expect(validateGuide(doc, schema)).toEqual([]);
        expect(rodarCli(doc)).toBe(0);
      }),
      params(100),
    );
  }, TIMEOUT);

  it('test_property_3_campos_obrigatorios_ausentes_rejeitados_com_caminho', () => {
    // No chained arbitraries: the target is picked by index from independent draws, so the document is generated once.
    const remocoes = fc.tuple(
      validDocs(),
      fc.nat(),
    );
    fc.assert(
      fc.property(remocoes, ([doc, k]) => {
        fc.pre(doc.categorias_ferramenta.length > 0 || doc.fontes.length > 0 || doc.decisoes.length > 0);
        const candidatos = Object.entries(CAMPOS).flatMap(([col, campos]) => (doc[col] as D[]).flatMap((_, i) => campos.map((campo) => [col, i, campo] as const)));
        const [col, i, campo] = candidatos[k % candidatos.length] as readonly [string, number, string];
        const mutado = structuredClone(doc);
        delete mutado[col][i][campo];
        const alvo = `${col}[${i}]`;
        expect(schemaIssuesEm(mutado, alvo).length, `sem Issue SCHEMA em ${alvo} ao remover ${campo}`).toBeGreaterThan(0);
        expect(rodarCli(mutado)).not.toBe(0);
      }),
      params(100),
    );
  }, TIMEOUT);

  const ENUM_TIPO = ['inicio', 'tarefa', 'bifurcacao', 'chamada', 'fim'];
  const ENUM_STATUS = ['pendente', 'em_revisao', 'revisada'];
  const ENUM_NIVEL = ['baixo', 'medio', 'alto'];
  const ALVOS_ENUM: Record<string, Array<[string, string[]]>> = {
    decisoes: [['tipo', ENUM_TIPO]],
    fontes: [['status_revisao', ENUM_STATUS]],
    categorias_ferramenta: ['custo', 'beneficio', 'dependencia_fornecedor'].map((c) => [c, ENUM_NIVEL] as [string, string[]]),
  };
  /** Same three families as Python's `_valor_enum`: a valid value, a near miss, or free text (picked by `modo`). */
  const valorEnum = (validos: string[], modo: number, k: number, livre: string): string => {
    const quase = [...validos.map((v) => v.toUpperCase()), ...validos.map((v) => `${v} `), ...validos.map((v) => v.slice(0, -1)), ''];
    return [validos[k % validos.length], quase[k % quase.length], livre][modo % 3] as string;
  };

  it('test_property_4_enum_aceito_se_e_somente_se_pertence', () => {
    const casos = fc.tuple(
      validDocs(),
      fc.nat(),
      fc.nat(),
      fc.nat(),
      fc.string({ maxLength: 12 }),
    );
    fc.assert(
      fc.property(casos, ([doc, k, modo, k2, livre]) => {
        fc.pre(doc.categorias_ferramenta.length > 0 || doc.fontes.length > 0);
        const candidatos = Object.entries(ALVOS_ENUM).flatMap(([col, alvos]) => (doc[col] as D[]).flatMap((_, i) => alvos.map(([campo, validos]) => [col, i, campo, validos] as const)));
        const [col, i, campo, validos] = candidatos[k % candidatos.length] as readonly [string, number, string, string[]];
        const s = valorEnum(validos, modo, k2, livre);
        const mutado = structuredClone(doc);
        mutado[col][i][campo] = s;
        const rejeitado = schemaIssuesEm(mutado, `${col}[${i}].${campo}`).length > 0;
        expect(rejeitado, `${col}[${i}].${campo}=${JSON.stringify(s)}`).toBe(!validos.includes(s));
      }),
      params(100),
    );
  }, TIMEOUT);

  const diasNoMes = (y: number, m: number) => [31, y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1] as number;
  /** Mirrors Python: ASCII `AAAA-MM-DD` that is a real date in datetime.date's range (year 1 to 9999). */
  const ehDataAaaaMmDd = (s: string): boolean => {
    if (!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(s)) return false;
    const y = Number(s.slice(0, 4));
    const m = Number(s.slice(5, 7));
    const d = Number(s.slice(8, 10));
    return y >= 1 && m >= 1 && m <= 12 && d >= 1 && d <= diasNoMes(y, m);
  };
  const p = (n: number, w: number) => String(n).padStart(w, '0');
  const dataReal = fc.tuple(fc.integer({ min: 1, max: 9999 }), fc.integer({ min: 1, max: 12 }), fc.integer({ min: 1, max: 31 })).map(([y, m, d]) => ({ y, m, d: Math.min(d, diasNoMes(y, m)) }));
  const arabe = (s: string) => s.replaceAll('0', '\u0660').replaceAll('1', '\u0661');
  const datasQuase = fc.oneof(
    dataReal.map(({ y, m, d }) => `${p(y, 4)}-${p(m, 2)}-${p(d, 2)}`),
    fc.tuple(fc.integer({ min: 0, max: 9999 }), fc.integer({ min: 0, max: 14 }), fc.integer({ min: 0, max: 33 })).map(([y, m, d]) => `${p(y, 4)}-${p(m, 2)}-${p(d, 2)}`),
    dataReal.map(({ y, m, d }) => `${p(y, 4)}/${p(m, 2)}/${p(d, 2)}`),
    dataReal.map(({ y, m, d }) => `${p(d, 2)}-${p(m, 2)}-${p(y, 4)}`),
    dataReal.map(({ y, m, d }) => `${p(y, 4)}${p(m, 2)}${p(d, 2)}`),
    dataReal.map(({ y, m, d }) => `${p(y, 4)}-${p(m, 2)}-${p(d, 2)}\n`),
    dataReal.map(({ y, m, d }) => ` ${p(y, 4)}-${p(m, 2)}-${p(d, 2)}`),
    dataReal.map(({ y, m, d }) => `${p(y, 4)}-${p(m, 2)}-${p(d, 2)}T00:00:00`),
    dataReal.map(({ y, m, d }) => arabe(`${p(y, 4)}-${p(m, 2)}-${p(d, 2)}`)),
    fc.constant(''),
    fc.string({ maxLength: 14 }),
  );

  it('test_property_5_proxima_revisao_aceita_apenas_data_valida', () => {
    const casos = fc.tuple(
      validDocs(),
      datasQuase,
      fc.nat(),
    );
    fc.assert(
      fc.property(casos, ([doc, s, k]) => {
        fc.pre(doc.fontes.length > 0);
        const i = k % doc.fontes.length;
        const mutado = structuredClone(doc);
        mutado.fontes[i].proxima_revisao = s;
        const rejeitado = schemaIssuesEm(mutado, `fontes[${i}].proxima_revisao`).length > 0;
        expect(rejeitado, `proxima_revisao=${JSON.stringify(s)}`).toBe(!ehDataAaaaMmDd(s));
      }),
      params(100),
    );
  }, TIMEOUT);
});
