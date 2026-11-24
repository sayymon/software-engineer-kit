// SPDX-License-Identifier: MIT
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { FsContentRepository, type LoadedEntity } from '../../lib/content';
import { BrokenLinkError, SiteIndex, slugify } from '../../lib/content/site';
import { parseWikilinks } from '../../lib/wikilinks';

const repo = new FsContentRepository(join(__dirname, '..', '..', 'content'));
const href = (route: string) => `/pt-BR/${route}/`;

function entity(id: string, tipo: string, relPath: string, data: Record<string, unknown> = {}, body = ''): LoadedEntity {
  return { id, tipo, locale: 'pt-BR', relPath, file: relPath, data: { id, tipo, nome: id.toUpperCase(), ...data }, body, fallback: false, stale: false };
}

describe('site index (synthetic)', () => {
  const a = entity('a', 'ferramenta', 'tools/catalog/a.md', { categorias: ['[[c|Cat]]'] }, 'Veja [[b|Bee]] e [[b#Seção Um|seção]].\n\n```\n[[nao_existe]]\n```');
  const b = entity('b', 'ferramenta', 'tools/catalog/b.md', {}, '# Seção Um\n\ntexto');
  const c = entity('c', 'categoria', 'tools/categories/c.md', { guia_ids: ['antigo'] });
  const index = new SiteIndex('pt-BR', [a, b, c]);

  it('rewrites wikilinks to real routes, with section anchors, and ignores code fences', () => {
    const html = index.render(a.body, { href });
    expect(html).toContain('<a href="/pt-BR/tools/catalog/b/">Bee</a>');
    expect(html).toContain('href="/pt-BR/tools/catalog/b/#secao-um"');
    expect(html).toContain('[[nao_existe]]');
  });

  it('fails the build on an unresolved wikilink', () => {
    expect(() => index.render('ver [[fantasma|Nada]]', { href, where: 'x.md' })).toThrow(BrokenLinkError);
    expect(index.render('ver [[fantasma|Nada]]', { href, strict: false })).toContain('Nada');
  });

  it('adds heading ids that match section anchors', () => {
    expect(index.render(b.body, { href })).toContain('<h1 id="secao-um">');
    expect(slugify('📋 Informações')).toBe('informacoes');
  });

  it('computes inverse relations and edges from the index', () => {
    expect(index.inbound('c').map((i) => [i.page.id, i.fields])).toEqual([['a', ['categorias']]]);
    expect(index.inbound('b').map((i) => [i.page.id, i.fields])).toEqual([['a', ['body']]]);
    expect(index.edges()).toEqual(
      expect.arrayContaining([
        { source: 'a', target: 'c', kind: 'categorias' },
        { source: 'a', target: 'b', kind: 'body' },
      ]),
    );
  });

  it('keeps guide ids resolvable through guia_ids', () => {
    expect(index.resolve('antigo')?.id).toBe('c');
  });

  it('rejects duplicate ids and routes', () => {
    expect(() => new SiteIndex('pt-BR', [a, entity('a', 'ferramenta', 'tools/catalog/z.md')])).toThrow(/duplicate id/);
  });
});

describe('site index (real content)', () => {
  const index = new SiteIndex('pt-BR', repo.list('pt-BR'));

  it('renders every body with zero unresolved wikilinks', () => {
    let rendered = 0;
    for (const page of index.pages) {
      const unresolved = parseWikilinks(page.entity.body).filter((l) => !index.resolve(l.id));
      expect(unresolved.map((l) => l.raw), page.entity.relPath).toEqual([]);
      rendered += 1;
    }
    expect(rendered).toBeGreaterThan(1400);
  });

  it('builds a route per entity with the route equal to its content path', () => {
    const tool = index.ofTipo('ferramenta')[0];
    expect(tool.route).toBe(tool.entity.relPath.replace(/\.(md|yaml)$/, ''));
    expect(index.byRoute.get(tool.route)).toBe(tool);
  });

  it('serves the en locale as fallback with a marker for entities that have no overlay', () => {
    const en = new SiteIndex('en', repo.list('en'));
    expect(en.pages.length).toBe(index.pages.length);
    expect(en.pages.some((p) => p.entity.fallback)).toBe(true);
  });
});
