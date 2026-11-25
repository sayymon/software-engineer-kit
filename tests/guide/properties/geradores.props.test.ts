// SPDX-License-Identifier: MIT
// Port of tools/guide-oracle/tests/properties/test_geradores_props.py (task 10.2, part 1). One `it` per Python property.
// Not ported: the three HTML properties, because the TypeScript tree has no HTML generator (gerar_html has no
// counterpart in lib/ or tools/). Their reasons are recorded in the skipped `it.skip` entries below.
// Determinism: fixed seed, bounded numRuns, and shrinking capped (endOnFailure) so memory stays bounded.
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { corTexto, gerarDiagrama, gerarTodos, sanitizarId } from '../../../lib/flow-mermaid';
import { type D, validDocs } from './geradores';

const TRAVESSOES = '\u2012\u2013\u2014\u2015\u2212';
const temTravessao = (t: string) => [...TRAVESSOES].some((c) => t.includes(c));
const params = (numRuns: number): fc.Parameters<unknown> => ({ numRuns, seed: 20240607, endOnFailure: true, verbose: 0 });
const TIMEOUT = 60_000;

const ALFABETO = [...'abcXYZ 019"<>&#`%\\[](){}|;:,.!?\u2014\u2013-_éç'];
const textos = fc.string({ unit: fc.constantFrom(...ALFABETO), minLength: 0, maxLength: 25 }).filter((s) => !s.includes('...'));
const cores = fc.stringMatching(/^#[0-9A-Fa-f]{6}$/);

/** Documents conforming to the lane contract, with hostile texts (quotes, `<`, `&`, `#`, dashes). */
const docsRaias = (): fc.Arbitrary<D> =>
  fc
    .tuple(fc.integer({ min: 2, max: 4 }), fc.array(textos, { minLength: 40, maxLength: 40 }), fc.array(cores, { minLength: 4, maxLength: 4 }))
    .map(([n, t, c]) => {
      let k = 0;
      const tx = () => t[k++ % t.length] as string;
      const raias: D[] = [];
      const decisoes: D[] = [];
      for (let i = 0; i < n; i++) {
        raias.push({ id: `r${i}`, nome: tx() || 'r', demanda: 'd1', responsabilidade: tx(), cor: c[i], orquestradora: i === 0, status: 'rascunho', publico: false });
      }
      for (let i = 1; i < n; i++) {
        const r = `r${i}`;
        decisoes.push(
          { id: `${r}_s1`, raia: r, tipo: 'inicio', rotulo: tx(), condicao: '', proximo: [{ para: `${r}_t1`, condicao: '' }], estado: {} },
          { id: `${r}_t1`, raia: r, tipo: 'tarefa', rotulo: tx(), condicao: '', proximo: [{ para: `${r}_e1`, condicao: '' }], estado: {} },
          { id: `${r}_e1`, raia: r, tipo: 'fim', retorno: 'ok', rotulo: tx(), condicao: '', proximo: [], estado: {} },
        );
      }
      const destinos = [...Array.from({ length: n - 1 }, (_, i) => `r0_c${i + 1}`), 'r0_e1'];
      decisoes.push({ id: 'r0_s1', raia: 'r0', tipo: 'inicio', rotulo: tx(), condicao: '', proximo: [{ para: destinos[0], condicao: '' }], estado: {} });
      for (let i = 1; i < n; i++) {
        decisoes.push({ id: `r0_c${i}`, raia: 'r0', tipo: 'chamada', raia_chamada: `r${i}`, rotulo: tx(), condicao: '', proximo: [{ para: destinos[i], condicao: 'ok' }], estado: {} });
      }
      decisoes.push({ id: 'r0_e1', raia: 'r0', tipo: 'fim', retorno: 'pronto', rotulo: tx(), condicao: '', proximo: [], estado: {} });
      return { versao: 1, demandas: [{ id: 'd1', nome: tx() || 'd', sigla: 'd1', publico: false }], raias, decisoes, playbooks: [] };
    });

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

describe('geradores (port de test_geradores_props.py)', () => {
  it('test_estrutura_do_diagrama', () => {
    fc.assert(
      fc.property(docsRaias(), (doc) => {
        for (const [nome, diag] of gerarTodos(doc)) {
          const t = diag.texto;
          const linhas = t.split(/\r?\n|\r/);
          expect(linhas[0]).toBe('flowchart LR');
          expect(t).toContain('subgraph z_LEG["Legenda"]');
          const subs = linhas.flatMap((ln, i) => (ln.trim().startsWith('subgraph ') ? [i] : []));
          expect(subs.every((i) => (linhas[i + 1] ?? '').trim() === 'direction LR')).toBe(true);
          expect(subs.length).toBe(linhas.filter((ln) => ln.trim() === 'end').length);
          if (nome.endsWith('.completo.mmd')) expect(subs.length).toBe(1 + doc.raias.length);
          expect(temTravessao(t)).toBe(false);
          expect(t.includes('…') || t.includes('...')).toBe(false);
          for (const sid of Object.keys(diag.mapaIds)) expect(t).toMatch(new RegExp(`^\\s*${esc(sid)}[\\[\\(\\{]`, 'm'));
        }
      }),
      params(60),
    );
  }, TIMEOUT);

  it('test_rotulos_nao_quebram_a_sintaxe', () => {
    fc.assert(
      fc.property(docsRaias(), (doc) => {
        const t = gerarDiagrama(doc, 'd1', 'completo').texto;
        const pedacos = t.split(/\r?\n|\r/).flatMap((ln) => ln.split(' ~~~ '));
        for (const ln of pedacos) {
          if (/^\s*\w+(\(\[|\[\[|\[|\{)"/.test(ln)) {
            const resto = ln.trim().split('"').slice(1).join('"');
            const interno = resto.slice(0, resto.lastIndexOf('"'));
            expect(interno.includes('"') || interno.includes('<script')).toBe(false);
            expect(interno).not.toMatch(/<(?!\/?(b|i|small|br\/?)>)/);
          }
        }
      }),
      params(60),
    );
  }, TIMEOUT);

  it('test_cor_da_chamada_e_da_raia_chamada', () => {
    fc.assert(
      fc.property(docsRaias(), (doc) => {
        const t = gerarDiagrama(doc, 'd1', 'visao').texto;
        const cor = Object.fromEntries(doc.raias.map((r: D) => [r.id, String(r.cor).toUpperCase()]));
        for (const d of doc.decisoes as D[]) {
          if (d.tipo !== 'chamada') continue;
          const classe = [...t.matchAll(/^\s*class ([\w,]+) (\w+)$/gm)].find((m) => (m[1] as string).split(',').includes(d.id))?.[2] as string;
          expect(classe).toBeDefined();
          const definicao = (t.match(new RegExp(`^\\s*classDef ${classe} (.+)$`, 'm')) as RegExpMatchArray)[1] as string;
          const atrs = Object.fromEntries(definicao.split(',').map((p) => [p.slice(0, p.indexOf(':')), p.slice(p.indexOf(':') + 1)]));
          expect(atrs.fill).toBe(cor[d.raia_chamada]);
          expect(atrs.stroke).toBe(cor[d.raia]);
          expect(atrs.color).toBe(corTexto(atrs.fill as string));
        }
      }),
      params(40),
    );
  }, TIMEOUT);

  it('test_determinismo', () => {
    fc.assert(
      fc.property(docsRaias(), (doc) => {
        const textosDe = (d: D) => Object.fromEntries([...gerarTodos(d)].map(([k, v]) => [k, v.texto]));
        const a = textosDe(doc);
        const inv = { ...doc, decisoes: [...doc.decisoes].reverse(), raias: [...doc.raias].reverse() };
        expect(textosDe(inv)).toEqual(a);
      }),
      params(40),
    );
  }, TIMEOUT);

  // No TypeScript HTML generator exists (Python gerar_html has no counterpart in lib/ or tools/), so these cannot be ported.
  it.skip('test_html_com_todos_os_ids_e_sem_rede (sem contraparte TS: gerar_html)', () => {});
  it.skip('test_html_legenda_unica_cor_e_navegacao (sem contraparte TS: gerar_html)', () => {});

  it('test_sanitizar_id_injetivo', () => {
    fc.assert(
      fc.property(fc.uniqueArray(fc.string({ maxLength: 12 }), { minLength: 2, maxLength: 8 }), (ids) => {
        const saidas = ids.map(sanitizarId);
        expect(new Set(saidas).size).toBe(ids.length);
        expect(saidas.every((s) => /^[A-Za-z][A-Za-z0-9_]*$/.test(s))).toBe(true);
      }),
      params(300),
    );
  }, TIMEOUT);

  // The Python property also checks gerar_html; only the diagram half has a TypeScript counterpart and is ported here.
  it('test_documentos_validos_geram_diagramas_e_html (somente a parte de diagramas)', () => {
    fc.assert(
      fc.property(validDocs(), (doc) => {
        const diagramas = gerarTodos(doc);
        expect(diagramas.size).toBeGreaterThan(0);
        expect([...gerarTodos(doc).keys()]).toEqual([...diagramas.keys()]);
        for (const d of diagramas.values()) {
          expect(d.texto.startsWith('flowchart LR\n')).toBe(true);
          expect(temTravessao(d.texto)).toBe(false);
        }
      }),
      params(40),
    );
  }, TIMEOUT);
});
