// SPDX-License-Identifier: MIT
// Task 9.2: tests for tools/guide/cli.ts (exit codes, text format, rastrear) and a byte-for-byte comparison of the
// `validar` output with the stored Python CLI output (tests/guide/expected/cli-validar.json) on a planted defect.
import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import YAML from 'yaml';
import { guideDir, loadGuideDoc } from '../../lib/guide';
import { lacunasDeDados, rastrearDados } from '../../lib/guide/rastreio';
import { ARQUIVO, docComDefeito } from './cases/cli';
import { readExpected } from './support/expected';

const root = new URL('../../', import.meta.url).pathname;
const tsx = join(root, 'node_modules/.bin/tsx');
const cli = join(root, 'tools/guide/cli.ts');
const schemaPath = join(root, 'schema/flows.schema.json');

type R = { code: number | null; out: string; err: string };
const run = (...args: string[]): R => {
  const r = spawnSync(tsx, [cli, ...args], { cwd: root, encoding: 'utf8' });
  return { code: r.status, out: r.stdout, err: r.stderr };
};

let tmp: string;
let defeito: string;
let limpo: string;
const real = loadGuideDoc(guideDir(`${root}content`));

beforeAll(() => {
  tmp = mkdtempSync(join(tmpdir(), 'guide-cli-'));
  limpo = join(tmp, 'limpo.yaml');
  defeito = join(tmp, 'defeito.yaml');
  writeFileSync(limpo, YAML.stringify(real));
  writeFileSync(defeito, YAML.stringify(docComDefeito()));
});
afterAll(() => rmSync(tmp, { recursive: true, force: true }));

describe('guide validar', () => {
  it('exits 0 and prints "válido" lines for a valid document', () => {
    const r = run('validar', '--yaml', limpo, '--sem-avisos');
    expect(r.code).toBe(0);
    expect(r.out.trim()).toBe(`${limpo}: válido.`);
  });

  it('exits 1 and prints "<arquivo>: CODIGO caminho id=<id>: msg" for a planted defect', () => {
    const r = run('validar', '--yaml', defeito, '--sem-avisos');
    expect(r.code).toBe(1);
    expect(r.out).toContain(`${limpo.replace('limpo', 'defeito')}: REF_QUEBRADA tecnicas[0].fonte_ids[0] id=${(real as any).tecnicas[0].id}: `); // eslint-disable-line @typescript-eslint/no-explicit-any
    expect(r.err).toMatch(/^1 erro\(s\) e 0 aviso\(s\) encontrado\(s\)\.$/m);
  });

  it('prints "válido." for the real guide with warnings on, and --estrito keeps exit 0', () => {
    const r = run('validar', '--yaml', limpo, '--estrito');
    expect(r.code).toBe(0);
    expect(r.out.trim()).toBe(`${limpo}: válido.`);
  });

  it('exits 2 for missing input, bad flags and exclusive options', () => {
    expect(run('validar', '--yaml', join(tmp, 'nao-existe.yaml')).code).toBe(2);
    expect(run('validar', '--yaml', limpo, '--schema', join(tmp, 'nao-existe.json')).code).toBe(2);
    expect(run('validar', '--yaml', limpo, '--estrito', '--sem-avisos').code).toBe(2);
    expect(run('validar', '--nao-existe').code).toBe(2);
    expect(run('comando-desconhecido').code).toBe(2);
    expect(run().code).toBe(2);
  });

  it('emits JSON with --json', () => {
    const r = run('validar', '--yaml', defeito, '--sem-avisos', '--json');
    expect(r.code).toBe(1);
    const j = JSON.parse(r.out);
    expect(j).toMatchObject({ valido: false, erros: 1, avisos: 0 });
  });

  it('matches the stored Python CLI text output on a planted defect', () => {
    const py = readExpected<{ status: number; stdout: string; stderr: string }>('cli-validar.json');
    const ts = run('validar', '--yaml', defeito, '--schema', schemaPath, '--sem-avisos');
    expect(ts.code).toBe(py.status);
    expect(ts.out.split(defeito).join(ARQUIVO)).toBe(py.stdout);
    expect(ts.err.split(defeito).join(ARQUIVO)).toBe(py.stderr);
  });
});

describe('guide rastrear', () => {
  const rastro = rastrearDados(real);
  const lacunas = lacunasDeDados(real);
  const comLacuna = Object.keys(rastro).find((id) => (lacunas[id] ?? []).length > 0);
  const semLacuna = Object.keys(rastro).find((id) => (lacunas[id] ?? []).length === 0);

  it('traces an existing id with exit 0, showing only that item', () => {
    expect(semLacuna).toBeDefined();
    const r = run('rastrear', semLacuna!, '--yaml', limpo);
    expect(r.code).toBe(0);
    expect(r.out.split('\n')[0]).toMatch(new RegExp(`^${semLacuna} \\(`));
    expect(r.out).toContain('produzido por:');
    expect(r.out.match(/^\S/gm)).toHaveLength(1);
  });

  it('exits 1 and lists "lacunas:" for an id with gaps', () => {
    if (!comLacuna) return; // real guide has no data gaps: nothing to assert
    const r = run('rastrear', comLacuna, '--yaml', limpo);
    expect(r.code).toBe(1);
    expect(r.out).toContain('  lacunas: ');
  });

  it('exits 1 and reports "produtor" for a planted gap (artifact removed from every `saidas`)', () => {
    const alvo = (real as any).artefatos.find((a: any) => lacunas[a.id]?.length === 0 && rastro[a.id].produzido_por.length > 0); // eslint-disable-line @typescript-eslint/no-explicit-any
    expect(alvo).toBeDefined();
    const copia = structuredClone(real) as any; // eslint-disable-line @typescript-eslint/no-explicit-any
    const semProdutor = (x: any): void => { // eslint-disable-line @typescript-eslint/no-explicit-any
      if (Array.isArray(x)) return x.forEach(semProdutor);
      if (x === null || typeof x !== 'object') return;
      if (Array.isArray(x.saidas)) x.saidas = x.saidas.filter((id: string) => id !== alvo.id);
      Object.values(x).forEach(semProdutor);
    };
    semProdutor(copia);
    const arquivo = join(tmp, 'lacuna.yaml');
    writeFileSync(arquivo, YAML.stringify(copia));
    const r = run('rastrear', alvo.id, '--yaml', arquivo);
    expect(r.code).toBe(1);
    expect(r.out).toMatch(/lacunas: .*produtor/);
  });

  it('exits 0 for the whole catalog when the real guide has no gaps', () => {
    expect(Object.values(lacunas).flat()).toHaveLength(0);
    const r = run('rastrear', '--yaml', limpo);
    expect(r.code).toBe(0);
    expect(r.out.match(/^\S/gm)).toHaveLength(Object.keys(rastro).length);
  });

  it('exits 2 for an unknown id and prints JSON with --json', () => {
    const r = run('rastrear', 'id_que_nao_existe', '--yaml', limpo);
    expect(r.code).toBe(2);
    expect(r.err).toContain('id não encontrado');
    const j = run('rastrear', semLacuna!, '--yaml', limpo, '--json');
    expect(JSON.parse(j.out)).toMatchObject({ id: semLacuna, lacunas: [] });
  });
});
