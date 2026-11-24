// SPDX-License-Identifier: MIT
import { describe, expect, it } from 'vitest';
import { formatWikilink, linkTarget, parseWikilinks, replaceWikilinks, resolveWikilinks } from '@lib/wikilinks';

describe('parseWikilinks', () => {
  it('parses id, label, section and embed forms', () => {
    const links = parseWikilinks('a [[outbox]] b [[outbox|Outbox]] c [[outbox#Tradeoffs]] d [[outbox#Tradeoffs|T]] e ![[dijkstra]]');
    expect(links.map((l) => [l.kind, l.id, l.section, l.label])).toEqual([
      ['link', 'outbox', undefined, undefined],
      ['link', 'outbox', undefined, 'Outbox'],
      ['link', 'outbox', 'Tradeoffs', undefined],
      ['link', 'outbox', 'Tradeoffs', 'T'],
      ['embed', 'dijkstra', undefined, undefined],
    ]);
  });

  it('ignores links in fenced and inline code', () => {
    const text = 'real [[a]]\n```\n[[b]]\n```\ninline `[[c]]` and [[d]]';
    expect(parseWikilinks(text).map((l) => l.id)).toEqual(['a', 'd']);
  });
});

describe('resolve and replace', () => {
  it('splits resolved and unresolved links', () => {
    const r = resolveWikilinks('[[a]] [[b]] [[c|x]]', (id) => id !== 'b');
    expect(r.resolved.map((l) => l.id)).toEqual(['a', 'c']);
    expect(r.unresolved.map((l) => l.id)).toEqual(['b']);
  });

  it('replaces links and keeps the surrounding text and code untouched', () => {
    const out = replaceWikilinks('x [[a|Label]] y `[[a]]` z ![[b]]', (l) => (l.kind === 'embed' ? `<embed ${l.id}>` : `<a ${l.id}>${l.label ?? l.id}</a>`));
    expect(out).toBe('x <a a>Label</a> y `[[a]]` z <embed b>');
  });

  it('formats and extracts targets', () => {
    expect(formatWikilink({ kind: 'link', id: 'a', section: 'S', label: 'L' })).toBe('[[a#S|L]]');
    expect(formatWikilink({ kind: 'embed', id: 'a' })).toBe('![[a]]');
    expect(linkTarget('[[a#S|L]]')).toBe('a');
    expect(linkTarget('tabela:x')).toBeNull();
  });
});
