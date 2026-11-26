// SPDX-License-Identifier: MIT
import { describe, expect, it } from 'vitest';
import { gerarGrafo, textoAcessivel } from '../../lib/flow-graph';
import { guideDir, loadGuideDoc } from '../../lib/guide';
import { makeT } from '../../site/src/i18n';
import { textoAcessivelHtml } from '../../site/src/render/flow';
import type { Ctx } from '../../site/src/render/util';

const root = new URL('../../', import.meta.url).pathname;
const doc = loadGuideDoc(guideDir(`${root}content`));

const mini = () => ({
  demandas: [{ id: 'd', nome: 'Demanda D' }],
  raias: [
    { id: 'r', nome: 'Raia R', demanda: 'd', cor: '#aabbcc', orquestradora: true },
    { id: 'q', nome: 'Raia Q', demanda: 'd', cor: '#112233' },
  ],
  decisoes: [
    { id: 't2', raia: 'r', tipo: 'tarefa', rotulo: 'Segunda', proximo: [{ para: 'e1', condicao: 'ok' }, { para: 'x' }] },
    { id: 's1', raia: 'r', tipo: 'inicio', rotulo: 'Início', proximo: [{ para: 't2' }] },
    { id: 'e1', raia: 'r', tipo: 'fim', rotulo: 'Fim', retorno: 'ok', proximo: [] },
    { id: 'x', raia: 'q', tipo: 'tarefa', rotulo: 'Outra', proximo: [{ para: 'e1' }] },
  ],
});

describe('textoAcessivel', () => {
  it('lists nodes per lane in order with their transitions', () => {
    const t = textoAcessivel(gerarGrafo(mini(), 'd'));
    expect(t.map((r) => r.id)).toEqual(['r', 'q']);
    const r = t[0];
    expect(r.nos.map((n) => n.id)).toEqual(['s1', 't2', 'e1']);
    expect(r.nos[1].transicoes).toEqual([
      { destino: 'e1', destinoRotulo: 'Fim', destinoRaia: 'Raia R', rotulo: 'ok', tracejada: false },
      { destino: 'x', destinoRotulo: 'Outra', destinoRaia: 'Raia Q', rotulo: '', tracejada: false },
    ]);
    expect(r.nos[2].transicoes).toEqual([]);
  });

  it('covers every node and edge of the graph', () => {
    const g = gerarGrafo(doc, 'feature');
    const t = textoAcessivel(g);
    expect(t.flatMap((r) => r.nos).length).toBe(g.nos.length);
    expect(t.flatMap((r) => r.nos).flatMap((n) => n.transicoes).length).toBe(g.arestas.length);
  });
});

describe('textoAcessivelHtml (feature)', () => {
  const ctx = { t: makeT('pt-BR'), doc: () => doc } as unknown as Ctx;
  const g = gerarGrafo(doc, 'feature');
  const html = textoAcessivelHtml(ctx, 'feature');

  it('renders one heading and ordered list per lane, and every node label', () => {
    expect(html.match(/<h3>/g)?.length).toBe(g.raias.length);
    expect(html.match(/<ol>/g)?.length).toBe(g.raias.length);
    for (const n of g.nos) expect(html).toContain(`<strong>${n.rotulo.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')}</strong>`);
  });

  it('escapes content', () => {
    expect(html).not.toMatch(/<script/i);
  });
});
