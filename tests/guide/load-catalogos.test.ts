// SPDX-License-Identifier: MIT
// Task 0.2: lib/guide/load.ts reads catalogos/ (ARQUIVOS_DE_CATALOGO) and still reads the legacy single-file layout.
// Only temporary fixtures here; the real guide in content/ is not touched.
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { ARQUIVOS_DE_CATALOGO, GuideLoadError, hasGuide, loadGuideDoc, loadGuideFiles } from '../../lib/guide/load';

const dirs: string[] = [];
const novaPasta = () => {
  const dir = mkdtempSync(join(tmpdir(), 'guide-catalogos-'));
  dirs.push(dir);
  return dir;
};
const escrever = (dir: string, rel: string, texto: string) => {
  const file = join(dir, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, texto);
};
afterEach(() => {
  for (const d of dirs.splice(0)) rmSync(d, { recursive: true, force: true });
});

// One top-level key per catalog file, except tecnicas.yaml that carries two.
const CHAVES: Record<string, string[]> = {
  'artefatos.yaml': ['artefatos'],
  'variaveis.yaml': ['variaveis'],
  'papeis.yaml': ['papeis'],
  'requisitos.yaml': ['requisitos'],
  'tecnicas.yaml': ['abordagens', 'tecnicas'],
  'ferramentas.yaml': ['categorias_ferramenta'],
  'fontes.yaml': ['fontes'],
  'decisor.yaml': ['decisor_construir_comprar_assinar'],
};
const COMUM = 'versao: 1\nordem_das_demandas: []\n';

/** Guide folder with comum.yaml and a full catalogos/ (each key holds one item). */
function guiaComCatalogos(): string {
  const dir = novaPasta();
  escrever(dir, 'comum.yaml', COMUM);
  for (const [arquivo, chaves] of Object.entries(CHAVES)) escrever(dir, `catalogos/${arquivo}`, chaves.map((c) => `${c}:\n  - id: ${c}-1\n`).join(''));
  return dir;
}

describe('ARQUIVOS_DE_CATALOGO', () => {
  it('lists the eight catalog files in the order that keeps the merged key order', () => {
    expect([...ARQUIVOS_DE_CATALOGO]).toEqual(['artefatos.yaml', 'variaveis.yaml', 'papeis.yaml', 'requisitos.yaml', 'tecnicas.yaml', 'ferramentas.yaml', 'fontes.yaml', 'decisor.yaml']);
  });
});

describe('layout com catalogos/', () => {
  it('merges comum.yaml first, then the catalog files, keeping the order of the keys', () => {
    const dir = guiaComCatalogos();
    expect(Object.keys(loadGuideDoc(dir))).toEqual(['versao', 'artefatos', 'variaveis', 'papeis', 'requisitos', 'abordagens', 'tecnicas', 'categorias_ferramenta', 'fontes', 'decisor_construir_comprar_assinar']);
  });

  it('puts the catalog files after comum.yaml and before raias-comuns.yaml, ritos.yaml and demandas/', () => {
    const dir = guiaComCatalogos();
    escrever(dir, 'raias-comuns.yaml', 'raias_comuns: []\n');
    escrever(dir, 'ritos.yaml', 'ritos: []\n');
    escrever(dir, 'demandas/bug.yaml', 'demanda_bug: {}\n');
    expect(loadGuideFiles(dir).map((f) => f.name)).toEqual(['comum.yaml', ...ARQUIVOS_DE_CATALOGO.map((f) => `catalogos/${f}`), 'raias-comuns.yaml', 'ritos.yaml', 'demandas/bug.yaml']);
  });

  it('keeps hasGuide tied to comum.yaml', () => {
    const dir = novaPasta();
    escrever(dir, 'catalogos/artefatos.yaml', 'artefatos: []\n');
    expect(hasGuide(dir)).toBe(false);
    escrever(dir, 'comum.yaml', COMUM);
    expect(hasGuide(dir)).toBe(true);
  });

  it('fails with a clear GuideLoadError when a catalog file is missing', () => {
    const dir = guiaComCatalogos();
    rmSync(join(dir, 'catalogos', 'papeis.yaml'));
    const erro = (() => {
      try {
        loadGuideDoc(dir);
      } catch (e) {
        return e;
      }
    })();
    expect(erro).toBeInstanceOf(GuideLoadError);
    expect((erro as GuideLoadError).file).toBe(join(dir, 'catalogos', 'papeis.yaml'));
    expect((erro as GuideLoadError).message).toMatch(/catalog file missing/);
  });

  it('fails when a key appears in two catalog files, even a list', () => {
    const dir = guiaComCatalogos();
    escrever(dir, 'catalogos/fontes.yaml', 'fontes: []\npapeis:\n  - id: outro\n');
    expect(() => loadGuideDoc(dir)).toThrow(GuideLoadError);
    expect(() => loadGuideDoc(dir)).toThrow(/'papeis' is already defined in catalogos\/papeis\.yaml/);
  });

  it('fails when a key of a catalog file is also in comum.yaml', () => {
    const dir = guiaComCatalogos();
    escrever(dir, 'comum.yaml', `${COMUM}artefatos: []\n`);
    expect(() => loadGuideDoc(dir)).toThrow(/'artefatos' is already defined in comum\.yaml/);
  });

  it('fails on a yaml in catalogos/ that is not in ARQUIVOS_DE_CATALOGO', () => {
    const dir = guiaComCatalogos();
    escrever(dir, 'catalogos/extra.yaml', 'extra: []\n');
    expect(() => loadGuideDoc(dir)).toThrow(/extra\.yaml: unexpected catalog file/);
  });

  it('reports a non-mapping catalog file with its path', () => {
    const dir = guiaComCatalogos();
    escrever(dir, 'catalogos/decisor.yaml', '- a\n- b\n');
    expect(() => loadGuideDoc(dir)).toThrow(/decisor\.yaml: the top of the document must be a mapping/);
  });
});

describe('layout legado de arquivo único', () => {
  it('loads only comum.yaml when catalogos/ does not exist', () => {
    const dir = novaPasta();
    escrever(dir, 'comum.yaml', `${COMUM}artefatos:\n  - id: a1\npapeis:\n  - id: pm\n`);
    expect(loadGuideFiles(dir).map((f) => f.name)).toEqual(['comum.yaml']);
    expect(Object.keys(loadGuideDoc(dir))).toEqual(['versao', 'artefatos', 'papeis']);
  });

  it('still fails when comum.yaml is missing', () => {
    expect(() => loadGuideDoc(novaPasta())).toThrow(GuideLoadError);
  });
});
