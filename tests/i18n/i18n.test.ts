// SPDX-License-Identifier: MIT
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { loadContent } from '../../lib/content';
import { TIPOS } from '../../lib/schema';
import { SITE_LAYERS } from '../../lib/content/site';
import en from '../../site/src/i18n/en.json';
import ptBR from '../../site/src/i18n/pt-BR.json';
import { makeT } from '../../site/src/i18n';
import { EXTRA_FIELD_KEYS, SPEC } from '../../site/src/render/entity';

const root = join(__dirname, '..', '..');
const pt = ptBR as Record<string, string>;
const eng = en as Record<string, string>;

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const abs = join(dir, name);
    if (statSync(abs).isDirectory()) walk(abs, out);
    else if (/\.(ts|astro)$/.test(name)) out.push(abs);
  }
  return out;
}

describe('UI strings', () => {
  it('have the same keys in pt-BR and en', () => {
    expect(Object.keys(eng).sort()).toEqual(Object.keys(pt).sort());
  });

  it('have no empty values', () => {
    for (const [name, table] of [['pt-BR', pt], ['en', eng]] as const) {
      for (const [k, v] of Object.entries(table)) expect(v.trim(), `${name}:${k}`).not.toBe('');
    }
  });

  it('use the same placeholders in both locales', () => {
    for (const k of Object.keys(pt)) {
      const ph = (s: string) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();
      expect(ph(eng[k]), k).toEqual(ph(pt[k]));
    }
  });

  it('contain no em dash', () => {
    for (const v of [...Object.values(pt), ...Object.values(eng)]) expect(v).not.toMatch(/\u2014/);
  });

  it('define every string the site source asks for by literal key', () => {
    const used = new Set<string>();
    for (const file of walk(join(root, 'site', 'src'))) {
      const src = readFileSync(file, 'utf8');
      for (const m of src.matchAll(/\bt\(\s*'([a-zA-Z0-9_.-]+)'/g)) used.add(m[1]);
    }
    expect(used.size).toBeGreaterThan(40);
    for (const key of used) {
      expect(pt[key], `pt-BR:${key}`).toBeDefined();
      expect(eng[key], `en:${key}`).toBeDefined();
    }
  });

  it('cover the dynamic key families (tipo, layer, fields, axes, nodes, views, levels)', () => {
    const need: string[] = [];
    for (const tipo of TIPOS) need.push(`tipo.${tipo}`);
    for (const layer of [...SITE_LAYERS, 'journeys']) need.push(`layer.${layer}`, `layerdesc.${layer}`);
    for (const spec of Object.values(SPEC)) for (const k of [...spec.facts, ...spec.rels]) need.push(`f.${k}`);
    for (const k of EXTRA_FIELD_KEYS) need.push(`f.${k}`);
    for (const k of ['visao', 'completo']) need.push(`view.${k}`);
    for (const k of ['essencial', 'recomendado']) need.push(`level.${k}`);
    for (const k of ['inicio', 'tarefa', 'bifurcacao', 'chamada', 'fim']) need.push(`node.${k}`);
    for (const k of ['time_maturidade', 'escala_volume', 'orcamento', 'latencia', 'compliance_dados', 'prazo_entrega', 'lock_in']) need.push(`axis.${k}`);
    for (const l of ['pt-BR', 'en']) need.push(`lang.switchTo.${l}`);
    for (const key of need) {
      expect(pt[key], `pt-BR:${key}`).toBeDefined();
      expect(eng[key], `en:${key}`).toBeDefined();
    }
  });

  it('have a title for every content section folder', () => {
    const base = join(root, 'content', 'pt-BR');
    // Folders on disk plus the folders of the entities derived from the guide YAML.
    const folders = new Set<string>();
    for (const layer of ['tools', 'ai', 'fundamentals', 'flows']) {
      if (!existsSync(join(base, layer))) continue;
      for (const name of readdirSync(join(base, layer))) if (statSync(join(base, layer, name)).isDirectory()) folders.add(`${layer}/${name}`);
    }
    for (const e of loadContent(join(root, 'content'), 'pt-BR').entities) {
      const [layer, name, rest] = e.relPath.split('/');
      if (['tools', 'ai', 'fundamentals', 'flows'].includes(layer) && rest !== undefined) folders.add(`${layer}/${name}`);
    }
    for (const folder of folders) {
      if (folder === 'fundamentals/licenses') continue;
      const [layer, name] = folder.split('/');
      expect(pt[`section.${layer}.${name}`], `section.${layer}.${name}`).toBeDefined();
    }
  });
  it('formats placeholders and rejects unknown keys', () => {
    expect(makeT('en')('count.items', { n: 3 })).toBe('3 items');
    expect(() => makeT('pt-BR')('no.such.key')).toThrow(/missing UI string/);
  });

  it('states the license split in the footer string', () => {
    expect(pt['footer.license']).toMatch(/MIT/);
    expect(pt['footer.license']).toMatch(/CC BY 4\.0/);
    expect(eng['footer.license']).toMatch(/MIT/);
    expect(eng['footer.license']).toMatch(/CC BY 4\.0/);
  });
});
