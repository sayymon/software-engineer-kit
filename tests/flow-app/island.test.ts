// SPDX-License-Identifier: MIT
// @vitest-environment jsdom
// Island helpers of the Pagina_de_Demanda (Requirements 2.5, 2.7): old `visao` URLs are aliases and the tab selection follows the View.
import { describe, expect, it } from 'vitest';
import { aliasDaUrl, marcarAba, paraDiagrama } from '../../site/src/flow-app/island';
import { estadoVazio } from '../../site/src/flow-app/state';

const ir = (url: string) => {
  window.history.replaceState(null, '', url);
  const reescreveu = aliasDaUrl(window);
  return { reescreveu, caminho: `${window.location.pathname}${window.location.search}${window.location.hash}` };
};

describe('aliasDaUrl', () => {
  it('turns ?visao= and bare hashes into #view=', () => {
    expect(ir('/x/?visao=1').caminho).toBe('/x/#view=geral');
    expect(ir('/x/?visao=completo').caminho).toBe('/x/#view=completo');
    expect(ir('/x/#visao').caminho).toBe('/x/#view=visao');
    expect(ir('/x/#raia:feat_ent').caminho).toBe('/x/#view=raia:feat_ent');
  });
  it('keeps other query keys and leaves a canonical URL alone', () => {
    expect(ir('/x/?a=1&visao=1').caminho).toBe('/x/?a=1#view=geral');
    expect(ir('/x/#view=completo')).toEqual({ reescreveu: false, caminho: '/x/#view=completo' });
    expect(ir('/x/')).toEqual({ reescreveu: false, caminho: '/x/' });
  });
});

describe('marcarAba / paraDiagrama', () => {
  it('selects one tab, with a roving tabindex, and labels the panel', () => {
    document.body.innerHTML =
      '<div><button role="tab" id="t0" data-view="geral"></button><button role="tab" id="t1" data-view="raia:a"></button></div><div role="tabpanel"></div>';
    marcarAba(document.body, 'raia:a');
    const abas = [...document.querySelectorAll<HTMLElement>('[role="tab"]')];
    expect(abas.map((a) => a.getAttribute('aria-selected'))).toEqual(['false', 'true']);
    expect(abas.map((a) => a.tabIndex)).toEqual([-1, 0]);
    expect(document.querySelector('[role="tabpanel"]')?.getAttribute('aria-labelledby')).toBe('t1');
    marcarAba(document.body, 'inexistente');
    expect(abas[0]?.getAttribute('aria-selected')).toBe('true');
  });
  it('an empty state is the Visão geral', () => {
    expect(paraDiagrama(estadoVazio()).view).toBe('geral');
  });
});
