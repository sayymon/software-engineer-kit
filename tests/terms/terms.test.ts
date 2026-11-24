// SPDX-License-Identifier: MIT
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { findBlocked, findBlockedInValue, loadBlocklist, normalize, parseBlocklist } from '@lib/terms';

const ROOT = join(__dirname, '../..');
const blocklist = loadBlocklist(join(ROOT, 'config/public-terms.txt'));
const small = parseBlocklist('# comment\nzeta corp\nacme\nre:tok_[0-9]{4}\nrei:ID-[a-z]{2}\n');

describe('findBlocked', () => {
  it('matches regardless of case', () => {
    for (const text of ['Zeta corp', 'ZETA CORP', 'zeta corp']) {
      expect(findBlocked(text, small).map((h) => h.term)).toEqual(['zeta corp']);
    }
  });

  it('matches regardless of accents', () => {
    for (const text of ['zeta corp', 'Zeta Corp', 'zéta còrp', 'zeta corp'.normalize('NFD')]) {
      expect(findBlocked(text, small), text).toHaveLength(1);
    }
  });

  it('reports every occurrence with term, id, file, field and line', () => {
    const hits = findBlocked('a ACME b\nacme c\nAcMe', small, { id: 'x', file: 'content/x.md', field: 'descricao' });
    expect(hits).toHaveLength(3);
    expect(hits.map((h) => h.line)).toEqual([1, 2, 3]);
    for (const h of hits) expect(h).toMatchObject({ term: 'acme', id: 'x', file: 'content/x.md', field: 'descricao' });
  });

  it('reports different terms in one text, ordered by position', () => {
    const hits = findBlocked('acme usa zeta corp', small);
    expect(hits.map((h) => h.term)).toEqual(['acme', 'zeta corp']);
  });

  it('applies regex entries to the original text, case sensitive unless rei:', () => {
    expect(findBlocked('tok_1234', small).map((h) => h.term)).toEqual(['re:tok_[0-9]{4}']);
    expect(findBlocked('TOK_1234', small)).toHaveLength(0);
    expect(findBlocked('id-AB', small).map((h) => h.term)).toEqual(['rei:ID-[a-z]{2}']);
  });

  it('returns nothing for clean text', () => {
    expect(findBlocked('Circuit breaker protege chamadas remotas.', blocklist)).toEqual([]);
  });

  it('normalize folds case, accents and compatibility forms', () => {
    expect(normalize('ÁRVORE')).toBe('arvore');
    expect(normalize('Straße')).toBe('strasse');
    expect(normalize('ﬁle')).toBe('file');
  });

  it('walks nested values and labels the field path', () => {
    const hits = findBlockedInValue({ nome: 'ok', quando_usar: ['livre', 'usa ACME aqui'] }, small, { id: 'y', file: 'f.md' });
    expect(hits).toHaveLength(1);
    expect(hits[0].field).toBe('quando_usar[1]');
  });
});

describe('config/public-terms.txt', () => {
  const sample = (text: string) => findBlocked(text, blocklist).map((h) => h.term);
  // Samples are assembled from parts so this file stays clean under its own scan.
  const slash = '/';
  const userPath = `${slash}Us${'ers'}${slash}someone${slash}project`;
  const homePath = `${slash}ho${'me'}${slash}someone${slash}project`;
  const kb = 'Obsidian Va' + 'ult';
  it('blocks personal paths', () => {
    expect(sample(userPath)).toHaveLength(1);
    expect(sample(homePath)).toHaveLength(1);
    expect(sample('C:\\Us' + 'ers\\someone')).toHaveLength(1);
  });
  it('blocks email addresses and allows noreply and example domains', () => {
    expect(sample('write to someone@' + 'mail.test.org')).toHaveLength(1);
    expect(sample('12345+user@' + 'users.noreply.github.com')).toEqual([]);
    expect(sample('someone@' + 'example.org')).toEqual([]);
    expect(sample('git@' + 'github.com:owner/repo.git')).toEqual([]);
  });
  it('blocks personal knowledge base names in any case and separator', () => {
    expect(sample(kb)).not.toEqual([]);
    expect(sample(kb.toUpperCase())).not.toEqual([]);
    expect(sample('obsidian' + '://open?x=1')).not.toEqual([]);
    expect(sample('meu segundo ' + 'cérebro')).not.toEqual([]);
    expect(sample('my second' + '-brain')).not.toEqual([]);
    expect(sample('o va' + 'ult pessoal')).not.toEqual([]);
  });
  it('allows tool names', () => {
    expect(sample('HashiCorp Va' + 'ult')).toEqual([]);
    expect(sample('Vaultwarden e Obsidian')).toEqual([]);
    expect(sample('Terraform, Va' + 'ult, Packer')).toEqual([]);
  });
  it('blocks secret shapes', () => {
    expect(sample('ghp_' + 'a'.repeat(30))).toHaveLength(1);
    expect(sample('AKIA' + 'A'.repeat(16))).toHaveLength(1);
    expect(sample('-----BEGIN ' + 'RSA PRIVATE KEY-----')).toHaveLength(1);
  });
  it('blocks references to local agent scratch folders', () => {
    expect(sample('see `.age' + 'nts/tasks/x`')).toHaveLength(1);
  });
});
