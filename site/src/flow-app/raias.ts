// SPDX-License-Identifier: MIT
// Barra "Raias" of the Diagrama (Requirements 20.3, 20.4, 20.6, 20.11, 4.3): the keyboard path to expand, collapse and open each lane
// without depending on a click on the drawing, plus "Expandir tudo" / "Recolher tudo". Buttons stay in the DOM across redraws (the
// drawing is replaced, the bar is not), so focus survives an expansion. Pure DOM: the island wires the callbacks and the state.
import type { ModeloDeGrafo } from '../../../lib/schema/grafo';

export type TraduzirRaias = (chave: string, vars?: Record<string, string | number>) => string;

export interface AcoesDasRaias {
  alternar(raia: string): void;
  abrir(raia: string): void;
  expandirTudo(): void;
  recolherTudo(): void;
  /** The "Raias" toggle: shows or hides the lane groupings of `completo` (Requirement 4.6). */
  alternarAgrupamento(): void;
}

export interface BarraDeRaias {
  readonly elemento: HTMLElement;
  /** Syncs the buttons with the expanded lanes. `visivel` is false in a `raia:<id>` View, where there are no clusters.
   *  `agrupado` (only in `completo`) shows the "Raias" toggle with its state; undefined hides it. */
  atualizar(expandidas: ReadonlySet<string>, visivel: boolean, agrupado?: boolean): void;
  destruir(): void;
}

export function criarBarraDeRaias(doc: Document, grafo: ModeloDeGrafo, t: TraduzirRaias, acoes: AcoesDasRaias): BarraDeRaias {
  const raiz = doc.createElement('div');
  raiz.className = 'flow-raias';
  raiz.setAttribute('role', 'group');
  raiz.setAttribute('aria-label', t('flow.raias.group'));
  raiz.dataset.flowRaias = '';

  const botao = (texto: string, atributos: Record<string, string>): HTMLButtonElement => {
    const b = doc.createElement('button');
    b.type = 'button';
    b.textContent = texto;
    for (const [k, v] of Object.entries(atributos)) b.setAttribute(k, v);
    return b;
  };
  const tudo = botao(t('flow.raias.expandir_tudo'), { 'data-flow-raias-tudo': 'expandir' });
  const nada = botao(t('flow.raias.recolher_tudo'), { 'data-flow-raias-tudo': 'recolher' });
  const alternador = botao(t('flow.raias.alternador'), { 'data-flow-raias-agrupar': '', 'aria-pressed': 'true', title: t('flow.raias.alternador.rotulo') });
  alternador.hidden = true;
  const detalhes = doc.createElement('details');
  const resumo = doc.createElement('summary');
  const lista = doc.createElement('ul');
  lista.className = 'flow-raias__lista';
  detalhes.append(resumo, lista);

  const itens = grafo.raias.map((r) => {
    const li = doc.createElement('li');
    const nome = doc.createElement('span');
    nome.className = 'flow-raias__nome';
    nome.style.setProperty('--raia-cor', r.cor);
    nome.textContent = r.nome;
    const alternar = botao('', { 'data-flow-raia-alternar': r.id });
    const abrir = botao(t('flow.raias.abrir'), { 'data-flow-raia-abrir': r.id, 'aria-label': t('flow.raias.abrir.rotulo', { nome: r.nome }) });
    li.append(nome, alternar, abrir);
    lista.appendChild(li);
    return { id: r.id, nome: r.nome, alternar };
  });
  raiz.append(tudo, nada, alternador, detalhes);

  const aoClicar = (ev: Event): void => {
    const b = (ev.target as Element).closest<HTMLButtonElement>('button');
    if (!b || b.disabled) return;
    if (b.hasAttribute('data-flow-raias-agrupar')) acoes.alternarAgrupamento();
    else if (b.dataset.flowRaiasTudo === 'expandir') acoes.expandirTudo();
    else if (b.dataset.flowRaiasTudo === 'recolher') acoes.recolherTudo();
    else if (b.dataset.flowRaiaAlternar) acoes.alternar(b.dataset.flowRaiaAlternar);
    else if (b.dataset.flowRaiaAbrir) acoes.abrir(b.dataset.flowRaiaAbrir);
  };
  raiz.addEventListener('click', aoClicar);

  return {
    elemento: raiz,
    atualizar(expandidas, visivel, agrupado) {
      raiz.hidden = !visivel;
      alternador.hidden = agrupado === undefined;
      alternador.setAttribute('aria-pressed', String(agrupado !== false));
      const n = grafo.raias.filter((r) => expandidas.has(r.id)).length;
      resumo.textContent = t('flow.raias.resumo', { n, total: grafo.raias.length });
      tudo.disabled = n === grafo.raias.length;
      nada.disabled = n === 0;
      for (const i of itens) {
        const aberta = expandidas.has(i.id);
        i.alternar.textContent = t(aberta ? 'flow.raias.recolher' : 'flow.raias.expandir');
        i.alternar.setAttribute('aria-label', t(aberta ? 'flow.raias.recolher.rotulo' : 'flow.raias.expandir.rotulo', { nome: i.nome }));
        i.alternar.setAttribute('aria-expanded', String(aberta));
      }
    },
    destruir() {
      raiz.removeEventListener('click', aoClicar);
      raiz.remove();
    },
  };
}
