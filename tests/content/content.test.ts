// SPDX-License-Identifier: MIT
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { deepMerge, FsContentRepository, loadContent } from '@lib/content';
import { sourceHash } from '@lib/schema';

const dirs: string[] = [];
function content(files: Record<string, string>): string {
  const dir = mkdtempSync(join(tmpdir(), 'kit-content-'));
  dirs.push(dir);
  for (const [rel, text] of Object.entries(files)) {
    mkdirSync(dirname(join(dir, rel)), { recursive: true });
    writeFileSync(join(dir, rel), text);
  }
  return dir;
}
afterEach(() => dirs.splice(0).forEach((d) => rmSync(d, { recursive: true, force: true })));

const SOURCE = '---\nid: tool_use\ntipo: funcionalidade\nnome: Uso de ferramentas\ndescricao: Texto em portugues\ndataVerificacao: 2026-11-22\n---\nCorpo pt.\n';

describe('loadContent', () => {
  it('loads pt-BR entities and keeps ISO dates as strings', () => {
    const root = content({ 'content/pt-BR/ai/tool_use.md': SOURCE });
    const { entities, problems } = loadContent(join(root, 'content'), 'pt-BR');
    expect(problems).toEqual([]);
    expect(entities[0]).toMatchObject({ id: 'tool_use', tipo: 'funcionalidade', fallback: false });
    expect(entities[0].data.dataVerificacao).toBe('2026-11-22');
  });

  it('merges the en overlay over pt-BR and flags fresh vs stale', () => {
    const data = { id: 'tool_use', tipo: 'funcionalidade', nome: 'Uso de ferramentas', descricao: 'Texto em portugues', dataVerificacao: '2026-11-22' };
    const fresh = sourceHash('funcionalidade', data, 'Corpo pt.\n');
    const overlay = (hash: string) =>
      `---\nid: tool_use\ntipo: funcionalidade\nsource_hash: ${hash}\nnome: Tool use\n---\nEnglish body.\n`;
    const a = content({ 'content/pt-BR/ai/tool_use.md': SOURCE, 'content/en/ai/tool_use.md': overlay(fresh) });
    const en = loadContent(join(a, 'content'), 'en').entities[0];
    expect(en.data.nome).toBe('Tool use');
    expect(en.data.descricao).toBe('Texto em portugues');
    expect(en.body.trim()).toBe('English body.');
    expect(en).toMatchObject({ fallback: false, stale: false });

    const b = content({ 'content/pt-BR/ai/tool_use.md': SOURCE, 'content/en/ai/tool_use.md': overlay('0'.repeat(64)) });
    expect(loadContent(join(b, 'content'), 'en').entities[0].stale).toBe(true);
  });

  it('ignores structural fields in an overlay', () => {
    const o = '---\nid: tool_use\ntipo: funcionalidade\nsource_hash: x\nnome: Tool use\ndataVerificacao: 1999-01-01\n---\n';
    const root = content({ 'content/pt-BR/ai/tool_use.md': SOURCE, 'content/en/ai/tool_use.md': o });
    expect(loadContent(join(root, 'content'), 'en').entities[0].data.dataVerificacao).toBe('2026-11-22');
  });

  it('falls back to pt-BR with a flag when the overlay is missing', () => {
    const root = content({ 'content/pt-BR/ai/tool_use.md': SOURCE });
    const en = loadContent(join(root, 'content'), 'en').entities[0];
    expect(en).toMatchObject({ fallback: true, stale: false });
    expect(en.data.nome).toBe('Uso de ferramentas');
  });

  it('reports a file name that differs from the id and unknown tipos', () => {
    const root = content({
      'content/pt-BR/ai/outro.md': SOURCE,
      'content/pt-BR/ai/x.md': '---\nid: x\ntipo: desconhecido\n---\n',
      'content/data/rows.json': '{}',
    });
    const { problems } = loadContent(join(root, 'content'), 'pt-BR');
    expect(problems.map((p) => p.message).join('|')).toMatch(/file name must equal the id/);
    expect(problems.map((p) => p.message).join('|')).toMatch(/unknown or missing tipo/);
  });

  it('exposes entities through the repository interface', () => {
    const root = content({ 'content/pt-BR/ai/tool_use.md': SOURCE });
    const repo = new FsContentRepository(join(root, 'content'));
    expect(repo.list('pt-BR')).toHaveLength(1);
    expect(repo.get('en', 'tool_use')?.fallback).toBe(true);
    expect(repo.get('pt-BR', 'nao_existe')).toBeUndefined();
  });
});

describe('deepMerge', () => {
  it('merges arrays of objects by index so structural keys survive', () => {
    const source = [{ id: 'a', titulo: 'Um', itens: ['[[x]]'] }, { id: 'b', titulo: 'Dois' }];
    expect(deepMerge(source, [{ titulo: 'One' }, { titulo: 'Two' }])).toEqual([
      { id: 'a', titulo: 'One', itens: ['[[x]]'] },
      { id: 'b', titulo: 'Two' },
    ]);
  });
  it('replaces arrays of strings', () => {
    expect(deepMerge(['a', 'b'], ['c', 'd'])).toEqual(['c', 'd']);
  });
});
