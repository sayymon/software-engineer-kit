// SPDX-License-Identifier: MIT
// Task 0.3 (Requirements 15.7 and 10.6): the real guide, cut into content/guide/catalogos/, merges to the same document as before.
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { ARQUIVOS_DE_CATALOGO, loadGuideDoc } from '../../lib/guide/load';
import { collectionHashes } from './cases/parity';

const GUIA = join(__dirname, '../../content/guide');
const esperado = JSON.parse(readFileSync(join(__dirname, 'expected/parity.json'), 'utf8')) as { doc_hashes: Record<string, string> };

// Key order of the merged document before the cut (comum.yaml, then the demand files).
const ORDEM_ANTES = [
  'versao', 'artefatos', 'variaveis', 'papeis', 'requisitos', 'abordagens', 'tecnicas', 'padroes', 'estrategias',
  'categorias_ferramenta', 'fontes', 'decisor_construir_comprar_assinar', 'demandas', 'raias', 'decisoes', 'playbooks',
  'perguntas', 'ritos', 'celulas',
];

describe('real guide cut into catalogos/', () => {
  const doc = loadGuideDoc(GUIA);

  it('has every catalog file on disk', () => {
    for (const nome of ARQUIVOS_DE_CATALOGO) expect(existsSync(join(GUIA, 'catalogos', nome)), nome).toBe(true);
  });

  it('keeps the hash of each collection equal to the stored parity', () => {
    expect(collectionHashes(doc)).toEqual(esperado.doc_hashes);
  });

  it('keeps the merged top-level key order identical', () => {
    expect(Object.keys(doc)).toEqual(ORDEM_ANTES);
  });
});
