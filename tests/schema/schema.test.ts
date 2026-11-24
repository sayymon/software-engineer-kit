// SPDX-License-Identifier: MIT
import { describe, expect, it } from 'vitest';
import { TIPOS, TYPES, jsonSchemaFor, overlaySchema, sourceHash, validateEntity, validateOverlay } from '@lib/schema';
import { Fonte } from '@lib/schema/common';
import { invalidMutations, valid } from './fixtures';

describe('entity schemas', () => {
  it('has a fixture for every type and no stray fixtures', () => {
    expect(Object.keys(valid).sort()).toEqual([...TIPOS].sort());
    expect(Object.keys(invalidMutations).sort()).toEqual([...TIPOS].sort());
    expect(TIPOS).toHaveLength(22);
  });

  for (const tipo of TIPOS) {
    it(`${tipo}: valid fixture passes`, () => {
      const result = validateEntity(valid[tipo]);
      expect(result.ok, JSON.stringify(result)).toBe(true);
      if (result.ok) expect(result.data.tipo).toBe(tipo);
    });

    it(`${tipo}: invalid fixture fails (${invalidMutations[tipo].reason})`, () => {
      const result = validateEntity(invalidMutations[tipo].mutate(valid[tipo]));
      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.issues.length).toBeGreaterThan(0);
    });
  }

  it('Fonte accepts the guide shape and rejects extra keys', () => {
    const fonte = valid.padrao.fontes as Record<string, unknown>[];
    expect(Fonte.safeParse(fonte[0]).success).toBe(true);
    expect(Fonte.safeParse({ ...fonte[0], itens: [] }).success).toBe(false);
  });

  it('id regex rejects kebab-case and accents', () => {
    for (const bad of ['circuit-breaker', 'Circuit', 'ação', '1abc', 'a__b', 'a_']) {
      expect(validateEntity({ ...valid.tecnica, id: bad }).ok, bad).toBe(false);
    }
    expect(validateEntity({ ...valid.tecnica, id: 'circuit_breaker_2' }).ok).toBe(true);
  });

  it('generates a JSON Schema per type with the translatable list', () => {
    for (const tipo of TIPOS) {
      const json = jsonSchemaFor(tipo) as { type?: string; 'x-translatable'?: string[] };
      expect(json.type).toBe('object');
      expect(json['x-translatable']).toContain('nome');
    }
  });
});

describe('locale overlay', () => {
  const source = { ...valid.padrao };
  const hash = sourceHash('padrao', source, 'Corpo em portugues');

  it('accepts translatable fields only', () => {
    const ok = validateOverlay('padrao', { id: 'outbox', tipo: 'padrao', source_hash: hash, nome: 'Transactional outbox', quando_usar: ['A', 'B'] });
    expect(ok.ok).toBe(true);
  });

  it('rejects structural fields and bad hashes', () => {
    expect(validateOverlay('padrao', { id: 'outbox', tipo: 'padrao', source_hash: hash, familia: 'gof' }).ok).toBe(false);
    expect(validateOverlay('padrao', { id: 'outbox', tipo: 'padrao', source_hash: 'abc', nome: 'x' }).ok).toBe(false);
  });

  it('source_hash changes when a translatable field or the body changes, not when a structural one does', () => {
    expect(sourceHash('padrao', { ...source, nome: 'Outro nome' }, 'Corpo em portugues')).not.toBe(hash);
    expect(sourceHash('padrao', source, 'Corpo alterado')).not.toBe(hash);
    expect(sourceHash('padrao', { ...source, familia: 'gof' }, 'Corpo em portugues')).toBe(hash);
  });

  it('builds an overlay schema for every type', () => {
    for (const tipo of TIPOS) expect(() => overlaySchema(tipo)).not.toThrow();
    expect(TYPES.padrao.translatable).toContain('problema');
  });
});
