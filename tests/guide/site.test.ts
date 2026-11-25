// SPDX-License-Identifier: MIT
import { describe, expect, it } from 'vitest';
import { loadContent } from '../../lib/content';
import { SiteIndex } from '../../lib/content/site';
import { ANCHOR_TIPOS } from '../../lib/guide';
const root = new URL('../../', import.meta.url).pathname;
const { entities } = loadContent(`${root}content`, 'pt-BR');
const index = new SiteIndex('pt-BR', entities);
const anchors = entities.filter((e) => e.derived && (ANCHOR_TIPOS as readonly string[]).includes(e.tipo));
describe('guide entities in the site index', () => {
  it('keeps anchor-only entities out of the page list and routes', () => {
    expect(anchors.length).toBeGreaterThan(1000);
    for (const a of anchors) expect(index.byId.has(a.id), a.id).toBe(false);
    expect(index.pages).toHaveLength(entities.length - anchors.length);
  });
  it('resolves an anchor to its host page and adds #<id> to the target', () => {
    const sub = anchors.find((a) => a.tipo === 'subtarefa')!;
    const host = index.resolve(sub.id)!;
    expect(host.id).toBe(String(sub.data.pagina).slice(2, -2));
    expect(index.target(sub.id)).toMatchObject({ route: host.route, anchor: `#${sub.id}` });
    expect(index.anchorsOf(host.id)).toContain(sub);
  });
  it('renders links to anchors with the fragment and gives hosts inbound links from their anchors', () => {
    const pb = anchors.find((a) => a.tipo === 'playbook')!;
    const host = index.resolve(pb.id)!;
    expect(index.render(`[[${pb.id}]]`, { href: (r) => `/${r}` })).toContain(`/${host.route}#${pb.id}`);
    expect(index.edges().some((e) => e.source === host.id)).toBe(true);
  });
  it('lists rito, tarefa, papel, artefato and tipo-de-artefato pages and the seguranca demand', () => {
    for (const tipo of ['rito', 'tarefa', 'papel', 'artefato', 'tipo-de-artefato']) expect(index.ofTipo(tipo).length, tipo).toBeGreaterThan(0);
    expect(index.byId.get('seguranca')?.tipo).toBe('demanda');
    expect(index.byId.get('seguranca_papel')?.tipo).toBe('papel');
  });
  it('places guide techniques in the fundamentals layer under techniques', () => {
    const t = index.ofTipo('tecnica').filter((p) => p.entity.derived);
    expect(t.length).toBe(124);
    for (const p of t) expect(p.route).toBe(`fundamentals/techniques/${p.id}`);
  });
});
