// SPDX-License-Identifier: MIT
// Task 0.1: tests for tools/guide/split-comum.ts (text-based cut of comum.yaml into catalogos/).
// The cut only runs on temporary fixtures here; the real guide is only read, by --dry-run.
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import YAML from 'yaml';
import { DESTINO_POR_CHAVE, run } from '../../tools/guide/split-comum';
import { collectionHashes } from './cases/parity';

const root = new URL('../../', import.meta.url).pathname;

const FIXTURE = `# Cabeçalho explicativo do guia.
# Segunda linha do cabeçalho.

versao: 1

ordem_das_demandas: []

# Comentário solto antes dos artefatos.
artefatos:
  - id: a1
    nome: A1
# comentário dentro do corpo, na coluna zero
  - id: a2
    nome: A2
variaveis:
  - id: v1
    nome: V1

# Papéis: linha 1.
# Papéis: linha 2.
papeis:
  - id: pm
    nome: PM
requisitos:
  - id: funcional
    nome: Funcional

# Esqueleto por demanda.
abordagens: []

# Técnicas candidatas.
tecnicas:
  - id: tec_x
    nome: X
padroes: []

estrategias: []

categorias_ferramenta: []

fontes: []

# Decisor: linha 1.
# Decisor: linha 2.
decisor_construir_comprar_assinar:
  criterios: [custo_total, risco]
  escala: {min: 1, max: 5}
`;

const CHAVES = ['versao', 'ordem_das_demandas', 'artefatos', 'variaveis', 'papeis', 'requisitos', 'abordagens', 'tecnicas', 'padroes', 'estrategias', 'categorias_ferramenta', 'fontes', 'decisor_construir_comprar_assinar'];

let tmp: string;
const novoGuia = (nome: string, texto = FIXTURE): string => {
  const dir = join(tmp, nome);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'comum.yaml'), texto);
  return dir;
};
const arquivos = (dir: string): Record<string, string> =>
  Object.fromEntries(
    [...(existsSync(join(dir, 'catalogos')) ? readdirSync(join(dir, 'catalogos')).map((f) => `catalogos/${f}`) : []), 'comum.yaml'].sort().map((f) => [f, readFileSync(join(dir, f), 'utf8')]),
  );

beforeAll(() => {
  tmp = mkdtempSync(join(tmpdir(), 'split-comum-'));
});
afterAll(() => rmSync(tmp, { recursive: true, force: true }));

describe('split-comum --dry-run', () => {
  it('lists each top-level key with its destination file and writes nothing', () => {
    const dir = novoGuia('dry');
    const r = run(['--src', dir, '--dry-run']);
    expect(r.code).toBe(0);
    const linhas = r.out.split('\n');
    for (const chave of CHAVES) {
      const destino = chave === 'versao' || chave === 'ordem_das_demandas' ? 'comum.yaml' : `catalogos/${DESTINO_POR_CHAVE[chave]}`;
      expect(linhas.some((l) => l.startsWith(`${chave} -> ${destino}`)), chave).toBe(true);
    }
    expect(existsSync(join(dir, 'catalogos'))).toBe(false);
    expect(readFileSync(join(dir, 'comum.yaml'), 'utf8')).toBe(FIXTURE);
  });

  it('is deterministic: two runs print the same output', () => {
    const dir = novoGuia('dry-det');
    expect(run(['--src', dir, '--dry-run']).out).toBe(run(['--src', dir, '--dry-run']).out);
  });

  it('lists every key left in the real comum.yaml without writing (read only)', () => {
    const real = join(root, 'content/guide');
    const antes = readFileSync(join(real, 'comum.yaml'), 'utf8');
    const r = run(['--src', real, '--dry-run']);
    expect(r.code).toBe(0);
    const chaves = Object.keys(YAML.parse(antes, { schema: 'core', uniqueKeys: false }));
    for (const chave of chaves) expect(r.out, chave).toContain(`${chave} -> `);
    expect(readFileSync(join(real, 'comum.yaml'), 'utf8')).toBe(antes);
    // After task 0.3 the real guide is already cut: catalogos/ exists, and the dry run leaves it as it is.
    expect(existsSync(join(real, 'catalogos'))).toBe(true);
  });
});

describe('split-comum (cut on a temporary fixture)', () => {
  it('two runs on the same source produce identical files and output', () => {
    const a = novoGuia('det-a');
    const b = novoGuia('det-b');
    const ra = run(['--src', a]);
    const rb = run(['--src', b]);
    expect(ra.code).toBe(0);
    expect(rb.out).toBe(ra.out);
    expect(arquivos(b)).toEqual(arquivos(a));
  });

  it('keeps the header, versao and ordem_das_demandas in comum.yaml and moves each key to its catalog with its comments', () => {
    const dir = novoGuia('cut');
    expect(run(['--src', dir]).code).toBe(0);
    const f = arquivos(dir);
    expect(Object.keys(f)).toEqual(['catalogos/artefatos.yaml', 'catalogos/decisor.yaml', 'catalogos/ferramentas.yaml', 'catalogos/fontes.yaml', 'catalogos/papeis.yaml', 'catalogos/requisitos.yaml', 'catalogos/tecnicas.yaml', 'catalogos/variaveis.yaml', 'comum.yaml']);
    expect(f['comum.yaml']).toBe('# Cabeçalho explicativo do guia.\n# Segunda linha do cabeçalho.\n\nversao: 1\n\nordem_das_demandas: []\n');
    expect(f['catalogos/artefatos.yaml']).toBe('# Comentário solto antes dos artefatos.\nartefatos:\n  - id: a1\n    nome: A1\n# comentário dentro do corpo, na coluna zero\n  - id: a2\n    nome: A2\n');
    expect(f['catalogos/papeis.yaml']).toBe('# Papéis: linha 1.\n# Papéis: linha 2.\npapeis:\n  - id: pm\n    nome: PM\n');
    expect(f['catalogos/tecnicas.yaml']).toBe('# Esqueleto por demanda.\nabordagens: []\n\n# Técnicas candidatas.\ntecnicas:\n  - id: tec_x\n    nome: X\n\npadroes: []\n\nestrategias: []\n');
    expect(f['catalogos/ferramentas.yaml']).toBe('categorias_ferramenta: []\n');
    expect(f['catalogos/fontes.yaml']).toBe('fontes: []\n');
    expect(f['catalogos/decisor.yaml']).toBe('# Decisor: linha 1.\n# Decisor: linha 2.\ndecisor_construir_comprar_assinar:\n  criterios: [custo_total, risco]\n  escala: {min: 1, max: 5}\n');
  });

  it('keeps a column-0 comment that continues the previous collection (no blank line) with that collection', () => {
    const texto = `versao: 1

variaveis:
  - id: v1
    nome: V1

# Papéis: abre na coluna zero no meio dos itens de variaveis.
  - id: v2
    nome: V2
# e continua, sem linha em branco, logo acima da chave seguinte.
papeis:
  - id: pm
    nome: PM

# Comentário depois de linha em branco: é da chave abaixo.
requisitos:
  - id: funcional
    nome: Funcional
`;
    const dir = novoGuia('continua', texto);
    const r = run(['--src', dir]);
    expect(r.code).toBe(0);
    const f = arquivos(dir);
    expect(f['catalogos/variaveis.yaml']).toBe('variaveis:\n  - id: v1\n    nome: V1\n\n# Papéis: abre na coluna zero no meio dos itens de variaveis.\n  - id: v2\n    nome: V2\n# e continua, sem linha em branco, logo acima da chave seguinte.\n');
    expect(f['catalogos/papeis.yaml']).toBe('papeis:\n  - id: pm\n    nome: PM\n');
    expect(f['catalogos/requisitos.yaml']).toBe('# Comentário depois de linha em branco: é da chave abaixo.\nrequisitos:\n  - id: funcional\n    nome: Funcional\n');
    // the plan reports the same ranges: the continuation line is the last line of variaveis
    const linhas = texto.split('\n');
    const ultima = linhas.findIndex((l) => l.startsWith('# e continua')) + 1;
    expect(r.out).toContain(`variaveis -> catalogos/variaveis.yaml (linhas 3-${ultima})`);
    expect(r.out).toContain(`papeis -> catalogos/papeis.yaml (linhas ${ultima + 1}-`);
  });

  it('a comment block right after a one-line key (no blank line) stays with that key; after a blank line it moves to the next key', () => {
    const dir = novoGuia('uma-linha', 'versao: 1\n# fica com a versão\nordem_das_demandas: []\n\n# vai para artefatos\nartefatos: []\n');
    expect(run(['--src', dir]).code).toBe(0);
    const f = arquivos(dir);
    expect(f['comum.yaml']).toBe('versao: 1\n# fica com a versão\n\nordem_das_demandas: []\n');
    expect(f['catalogos/artefatos.yaml']).toBe('# vai para artefatos\nartefatos: []\n');
  });

  it('preserves the content of every collection and the order of the top-level keys', () => {
    const dir = novoGuia('equiv');
    const original = YAML.parse(FIXTURE, { schema: 'core', uniqueKeys: false });
    const r = run(['--src', dir]);
    expect(r.code).toBe(0);
    const ordem = ['comum.yaml', 'catalogos/artefatos.yaml', 'catalogos/variaveis.yaml', 'catalogos/papeis.yaml', 'catalogos/requisitos.yaml', 'catalogos/tecnicas.yaml', 'catalogos/ferramentas.yaml', 'catalogos/fontes.yaml', 'catalogos/decisor.yaml'];
    const mesclado: Record<string, unknown> = {};
    for (const nome of ordem) Object.assign(mesclado, YAML.parse(readFileSync(join(dir, nome), 'utf8'), { schema: 'core', uniqueKeys: false }));
    expect(Object.keys(mesclado)).toEqual(Object.keys(original));
    expect(collectionHashes(mesclado)).toEqual(collectionHashes(original));
  });

  it('records the baseline (key order and hash per collection) before cutting', () => {
    const dir = novoGuia('baseline');
    const r = run(['--src', dir]);
    const baseline = JSON.parse(r.out.slice(r.out.indexOf('{')));
    expect(baseline.ordem_das_chaves).toEqual(['versao', 'artefatos', 'variaveis', 'papeis', 'requisitos', 'abordagens', 'tecnicas', 'padroes', 'estrategias', 'categorias_ferramenta', 'fontes', 'decisor_construir_comprar_assinar']);
    // the loader does not merge ordem_das_demandas into the document
    const { ordem_das_demandas: _ordem, ...mesclado } = YAML.parse(FIXTURE, { schema: 'core', uniqueKeys: false });
    expect(baseline.hashes).toEqual(collectionHashes(mesclado));
  });

  it('writes to --out and leaves --src untouched', () => {
    const src = novoGuia('out-src');
    const out = join(tmp, 'out-dest');
    expect(run(['--src', src, '--out', out]).code).toBe(0);
    expect(readFileSync(join(src, 'comum.yaml'), 'utf8')).toBe(FIXTURE);
    expect(existsSync(join(src, 'catalogos'))).toBe(false);
    expect(Object.keys(arquivos(out))).toContain('catalogos/tecnicas.yaml');
  });

  it('refuses to run when the target already has catalogos/ (a second cut would empty the catalogs)', () => {
    const dir = novoGuia('twice');
    expect(run(['--src', dir]).code).toBe(0);
    const depois = arquivos(dir);
    const r = run(['--src', dir]);
    expect(r.code).toBe(2);
    expect(r.err).toContain('catalogos');
    expect(arquivos(dir)).toEqual(depois);
  });

  it('fails with a clear message on a top-level key without a destination', () => {
    const dir = novoGuia('unknown', `${FIXTURE}\nchave_desconhecida: 1\n`);
    const r = run(['--src', dir]);
    expect(r.code).toBe(2);
    expect(r.err).toContain('chave_desconhecida');
    expect(existsSync(join(dir, 'catalogos'))).toBe(false);
  });
});
