// SPDX-License-Identifier: MIT
// Island `data-island="flow"` of the Pagina_de_Demanda (Requirements 2.1, 2.2, 2.3, 2.5, 2.7, 2.8, 2.9, 18.1).
// The server renders the selector, the Abas_de_View, the legend, the textual alternative and the playbooks (render/flow.ts). This
// module makes them work: tab and selector events, the Fragmento_de_Estado in the URL (no reload, no second graph fetch), and the
// Diagrama drawn by the Perspectiva through the redraw queue. Changing the Demanda swaps the page content in place (the new page
// HTML comes from the static site) and pushes the Demanda route to `history`.
// The View opens in `geral`. `completo` opens only when the URL asks for it. `visao` (old name of the Visão geral) is an alias.
import type { ModeloDeGrafo } from '../../../lib/schema/grafo';
import { carregarGrafo } from './loader';
import { EVENTO_ABRIR_RAIA, EVENTO_EXPANDIR_RAIA, montarInteracao } from './interaction';
import { criarBarraDeRaias } from './raias';
import { criarSeletorDePerspectiva, fragmentoTemPersp, guardarPerspectiva, perspectivaEfetiva } from './perspectiva';
import { HistoricoDeViews, criarBotaoVoltar, type Rolagem } from './voltar';
import { perspectivaDe, type EstadoDiagrama, type InstanciaRenderizador } from './renderer';
import { VIEW_COMPLETO, VIEW_GERAL, atualizarEstado, escreverEstado, lerDaUrl, type EstadoDoFragmento } from './state';

const VIEWS_BARE = /^(visao|geral|completo|raia:[^&=]+)$/;
/** Values of an old `?visao=` that mean "the Visão geral". */
const VALORES_GERAL = new Set(['', '1', 'true', 'visao', 'geral']);

export type Traduzir = (chave: string, vars?: Record<string, string | number>) => string;

export interface DependenciasDaIlha {
  carregarGrafo(id: string, base: string): Promise<ModeloDeGrafo>;
  /** HTML of another page of the site (the Demanda chosen in the selector). */
  buscarPagina(url: string): Promise<string>;
  /** Hard navigation, the fallback when the in-place swap is not possible. */
  navegar(url: string): void;
}

const dependenciasPadrao: DependenciasDaIlha = {
  carregarGrafo: (id, base) => carregarGrafo(id, base),
  async buscarPagina(url) {
    const r = await fetch(url, { credentials: 'same-origin' });
    if (!r.ok) throw new Error(`HTTP ${r.status} em ${url}`);
    return r.text();
  },
  navegar: (url) => window.location.assign(url),
};

/**
 * Turns the old URL forms into the Fragmento_de_Estado before it is read: `?visao=...` / `?view=...` and a bare `#visao`,
 * `#completo` or `#raia:<id>` become `#view=...`. `visao` itself is the alias of `geral` (state.ts). Returns true when it rewrote the URL.
 */
export function aliasDaUrl(win: Pick<Window, 'location' | 'history'> = window): boolean {
  const url = new URL(win.location.href);
  let hash = url.hash.startsWith('#') ? url.hash.slice(1) : url.hash;
  const antes = `${url.search}#${hash}`;
  let view: string | undefined;
  for (const chave of ['visao', 'view']) {
    if (!url.searchParams.has(chave)) continue;
    const bruto = url.searchParams.get(chave) ?? '';
    view ??= VALORES_GERAL.has(bruto) ? VIEW_GERAL : bruto;
    url.searchParams.delete(chave);
  }
  if (VIEWS_BARE.test(hash)) hash = `view=${hash}`;
  if (view !== undefined && !/(^|&)view=/.test(hash)) hash = `${hash ? `${hash}&` : ''}view=${encodeURIComponent(view)}`;
  if (`${url.search}#${hash}` === antes) return false;
  win.history.replaceState(win.history.state, '', `${url.pathname}${url.search}${hash ? `#${hash}` : ''}`);
  return true;
}

/** EstadoDiagrama of a Fragmento_de_Estado. `geral` draws the clusters (plus the lanes of `exp`), `completo` every lane. */
export function paraDiagrama(estado: EstadoDoFragmento): EstadoDiagrama {
  return {
    view: estado.view ?? VIEW_GERAL,
    expandidas: estado.exp,
    subtarefas: estado.exp.todasSubtarefas,
    semRaias: estado.semRaias === true,
    noSelecionado: estado.no,
  };
}

const viewDe = (estado: EstadoDoFragmento): string => estado.view ?? VIEW_GERAL;

/** Moves the selection (and the roving tabindex) to the tab of `view`. */
export function marcarAba(raiz: ParentNode, view: string): void {
  const abas = [...raiz.querySelectorAll<HTMLElement>('[role="tab"][data-view]')];
  const alvo = abas.find((a) => a.dataset.view === view) ?? abas.find((a) => a.dataset.view === VIEW_GERAL);
  for (const a of abas) {
    const ativa = a === alvo;
    a.setAttribute('aria-selected', String(ativa));
    a.tabIndex = ativa ? 0 : -1;
  }
  const painel = raiz.querySelector<HTMLElement>('[role="tabpanel"]');
  if (painel && alvo?.id) painel.setAttribute('aria-labelledby', alvo.id);
}

function traduzirDe(raiz: HTMLElement): Traduzir {
  let tabela: Record<string, string> = {};
  try {
    tabela = JSON.parse(raiz.dataset.flowI18n ?? '{}') as Record<string, string>;
  } catch {
    /* keys fall back to themselves */
  }
  return (chave, vars = {}) => (tabela[chave] ?? chave).replace(/\{(\w+)\}/g, (_m, n: string) => String(vars[n] ?? `{${n}}`));
}

interface Montada {
  raiz: HTMLElement;
  destruir(): void;
}

export interface ControladorDaIlha {
  montar(raiz: HTMLElement): Promise<void>;
  /** Selects a Demanda by its page route (what the selector does). Resolves when the new page is mounted. */
  trocarDemanda(rota: string, empilhar: boolean): Promise<void>;
  destruir(): void;
}

export function criarControlador(deps: DependenciasDaIlha = dependenciasPadrao, win: Window = window): ControladorDaIlha {
  const doc = win.document;
  let atual: Montada | undefined;
  let rota = win.location.pathname;
  let troca = 0;

  const aoVoltar = (): void => {
    if (win.location.pathname !== rota) void trocarDemanda(win.location.pathname, false);
    else atual?.raiz.dispatchEvent(new CustomEvent('flow:estado'));
  };
  win.addEventListener('popstate', aoVoltar);

  function mostrarErro(raiz: HTMLElement, t: Traduzir, chave: string): void {
    const palco = raiz.querySelector<HTMLElement>('[data-flow-stage]');
    if (!palco) return;
    palco.removeAttribute('aria-busy');
    const painel = doc.createElement('div');
    painel.className = 'flow-erro';
    painel.setAttribute('role', 'alert');
    const p = doc.createElement('p');
    p.textContent = t(chave);
    painel.appendChild(p);
    palco.replaceChildren(painel);
    palco.dataset.rendered = 'error';
  }

  async function montar(raiz: HTMLElement): Promise<void> {
    atual?.destruir();
    atual = undefined;
    const t = traduzirDe(raiz);
    const controles = raiz.querySelector<HTMLElement>('[data-flow-controls]');
    const palco = raiz.querySelector<HTMLElement>('[data-flow-stage]');
    const abas = raiz.querySelector<HTMLElement>('[data-flow-tabs]');
    const seletor = raiz.querySelector<HTMLSelectElement>('[data-flow-select]');
    if (!controles || !palco || !abas) return;
    controles.hidden = false;
    palco.dataset.rendered = 'false';
    rota = win.location.pathname;

    const base = `${raiz.dataset.flowBase ?? ''}/${raiz.dataset.flowLocale ?? ''}`;
    let grafo: ModeloDeGrafo;
    try {
      grafo = await deps.carregarGrafo(raiz.dataset.flowId ?? '', base);
    } catch {
      mostrarErro(raiz, t, 'flow.error.graph');
      return;
    }

    let vivo = true;
    let instancia: InstanciaRenderizador | undefined;
    let perspectiva = '';
    let desenho = 0;
    /** The URL opened with a `persp` this site does not know: the default applies and the stored choice is ignored until the user chooses. */
    let perspDesconhecida = false;

    const mostrarAlternativaTextual = (): void => {
      const titulo = doc.querySelector<HTMLElement>('section.textflow h2');
      if (!titulo) return;
      titulo.tabIndex = -1;
      titulo.scrollIntoView?.({ block: 'start' });
      titulo.focus();
    };

    // "Voltar": mirrors the entries this island pushes to `history` (see voltar.ts for the relation with the browser Back button).
    const historico = new HistoricoDeViews(win.location.hash);
    const rolagemDoPalco = (): Rolagem => ({ esq: palco.scrollLeft, topo: palco.scrollTop });
    const voltar = criarBotaoVoltar(doc, t, () => win.history.back());
    abas.before(voltar.elemento);

    const barra = criarBarraDeRaias(doc, grafo, t, {
      alternar: (id) => alternarRaia(id),
      abrir: (id) => ativarView(`raia:${id}`),
      expandirTudo: () => mudarExpansao({ view: VIEW_COMPLETO, raias: new Set(grafo.raias.map((r) => r.id)) }),
      recolherTudo: () => mudarExpansao({ view: VIEW_GERAL, raias: new Set() }),
      alternarAgrupamento: () => {
        const corrente = lerDaUrl(grafo, win);
        if (viewDe(corrente) !== VIEW_COMPLETO) return;
        // Same View, only how it is drawn: it rewrites the entry (no new Back step) and keeps the scroll.
        const proximo = atualizarEstado(grafo, { semRaias: !corrente.semRaias }, 'replace', win);
        historico.substituir(win.location.hash);
        void desenhar(proximo);
      },
    });
    abas.after(barra.elemento);

    // Seletor de Perspectiva: the choice goes to the Fragmento_de_Estado (a push, so Back undoes it) and to `localStorage`.
    // The state is merged, so View, Conjunto_Expandido, Subtarefas and Nó stay; only the drawing engine changes.
    const seletorPersp = criarSeletorDePerspectiva(doc, t, (id) => {
      guardarPerspectiva(id, win);
      if (id === perspectiva) return;
      // The entry we leave names its Perspectiva, so Back returns to it even though the stored choice changed.
      if (!fragmentoTemPersp(win.location.hash)) {
        atualizarEstado(grafo, { persp: perspectiva }, 'replace', win);
        historico.substituir(win.location.hash);
      }
      perspDesconhecida = false;
      void desenhar(empurrar({ persp: id }));
    });
    const toolbar = raiz.querySelector<HTMLElement>('.flow-toolbar');
    if (toolbar) toolbar.append(seletorPersp.elemento);
    else abas.before(seletorPersp.elemento);

    const desenhar = async (estado: EstadoDoFragmento, focar?: string, rolagem?: Rolagem): Promise<void> => {
      const meu = ++desenho;
      const view = viewDe(estado);
      // Same View (expanding, collapsing, Back inside the View): the user keeps the scroll of the stage, and the zoom lives in `interacao`.
      const esq = palco.scrollLeft;
      const topo = palco.scrollTop;
      const mesmaView = palco.dataset.view === view;
      marcarAba(raiz, view);
      barra.atualizar(estado.exp.raias, !view.startsWith('raia:'), view === VIEW_COMPLETO ? estado.semRaias !== true : undefined);
      voltar.atualizar(historico.podeVoltar);
      palco.dataset.view = view;
      palco.dataset.rendered = 'false';
      const diagrama = paraDiagrama(estado);
      const escolhida = perspectivaEfetiva(estado.persp, perspDesconhecida || fragmentoTemPersp(win.location.hash), win);
      seletorPersp.atualizar(escolhida);
      if (!instancia || perspectiva !== escolhida) {
        instancia?.destruir();
        perspectiva = escolhida;
        const nova = await perspectivaDe(escolhida).montar(palco, grafo, diagrama, { t, mostrarAlternativaTextual });
        if (!vivo) return nova.destruir();
        instancia = nova;
      } else {
        await instancia.atualizar(diagrama);
      }
      if (!vivo || meu !== desenho) return;
      if (rolagem) {
        palco.scrollLeft = rolagem.esq;
        palco.scrollTop = rolagem.topo;
      } else if (mesmaView) {
        palco.scrollLeft = esq;
        palco.scrollTop = topo;
      }
      if (focar) instancia?.focarNo(focar);
      palco.dataset.rendered = palco.querySelector('.flow-erro') ? 'error' : 'true';
    };

    /** Writes a state with `pushState` and, when the URL really changed, records the entry (and the scroll left behind) for "Voltar". */
    const empurrar = (mudanca: Partial<EstadoDoFragmento>): EstadoDoFragmento => {
      const antes = win.location.hash;
      const rolagem = rolagemDoPalco();
      const proximo = atualizarEstado(grafo, mudanca, 'push', win);
      if (win.location.hash !== antes) historico.empilhar(win.location.hash, rolagem);
      return proximo;
    };

    const ativarView = (view: string): void => {
      const corrente = lerDaUrl(grafo, win);
      if (view === viewDe(corrente)) return;
      // Leaving a View clears the expansion: `completo` and `exp` are the same thing, so a stale `exp` would reopen `completo`.
      const exp = { raias: new Set<string>(), subtarefas: new Set<string>(), todasSubtarefas: corrente.exp.todasSubtarefas };
      const proximo = empurrar({ view, exp });
      void desenhar(proximo);
    };

    /** Writes a new Conjunto_Expandido to the URL (push: Back undoes it) and draws only that set. */
    const mudarExpansao = (m: { view: string; raias: Set<string> }, focar?: string): void => {
      const corrente = lerDaUrl(grafo, win);
      if (viewDe(corrente).startsWith('raia:')) return; // a lane View has no clusters to expand
      const exp = { ...corrente.exp, raias: m.raias, subtarefas: m.raias.size ? corrente.exp.subtarefas : new Set<string>() };
      const proximo = empurrar({ view: m.view, exp });
      void desenhar(proximo, focar);
    };
    const alternarRaia = (id: string, soExpandir = false, focar?: string): void => {
      const raias = new Set(lerDaUrl(grafo, win).exp.raias);
      if (raias.has(id)) {
        if (soExpandir) return;
        raias.delete(id);
      } else raias.add(id);
      mudarExpansao({ view: VIEW_GERAL, raias }, focar);
    };
    const aoExpandirRaia = (ev: Event): void => alternarRaia((ev as CustomEvent<{ raia: string }>).detail.raia, true, (ev as CustomEvent<{ raia: string }>).detail.raia);
    const aoAbrirRaia = (ev: Event): void => ativarView(`raia:${(ev as CustomEvent<{ raia: string }>).detail.raia}`);

    const aoClicar = (ev: Event): void => {
      const aba = (ev.target as Element).closest<HTMLElement>('[role="tab"][data-view]');
      if (aba?.dataset.view) ativarView(aba.dataset.view);
    };
    // Manual activation: arrows move focus only, Enter/Space (native click) opens the View, so crossing `completo` never draws it.
    const aoTeclar = (ev: KeyboardEvent): void => {
      const lista = [...abas.querySelectorAll<HTMLElement>('[role="tab"]')];
      const i = lista.indexOf(ev.target as HTMLElement);
      if (i < 0) return;
      const destino =
        ev.key === 'ArrowRight' ? (i + 1) % lista.length : ev.key === 'ArrowLeft' ? (i - 1 + lista.length) % lista.length : ev.key === 'Home' ? 0 : ev.key === 'End' ? lista.length - 1 : -1;
      if (destino < 0) return;
      ev.preventDefault();
      for (const a of lista) a.tabIndex = a === lista[destino] ? 0 : -1;
      lista[destino]?.focus();
    };
    const aoMudarDemanda = (): void => {
      if (seletor?.value) void trocarDemanda(seletor.value, true);
    };
    // Back/forward inside the same Demanda: the URL state changed without a navigation.
    // The stack follows the browser: the scroll saved for the entry we came back to is restored after the redraw.
    const aoMudarEstado = (): void => {
      const rolagem = historico.sincronizar(win.location.hash, rolagemDoPalco());
      void desenhar(lerDaUrl(grafo, win), undefined, rolagem);
    };

    abas.addEventListener('click', aoClicar);
    abas.addEventListener('keydown', aoTeclar);
    seletor?.addEventListener('change', aoMudarDemanda);
    raiz.addEventListener('flow:estado', aoMudarEstado);
    palco.addEventListener(EVENTO_EXPANDIR_RAIA, aoExpandirRaia);
    palco.addEventListener(EVENTO_ABRIR_RAIA, aoAbrirRaia);
    atual = {
      raiz,
      destruir() {
        vivo = false;
        abas.removeEventListener('click', aoClicar);
        abas.removeEventListener('keydown', aoTeclar);
        seletor?.removeEventListener('change', aoMudarDemanda);
        raiz.removeEventListener('flow:estado', aoMudarEstado);
        palco.removeEventListener(EVENTO_EXPANDIR_RAIA, aoExpandirRaia);
        palco.removeEventListener(EVENTO_ABRIR_RAIA, aoAbrirRaia);
        barra.destruir();
        seletorPersp.destruir();
        voltar.destruir();
        interacao.destruir();
        instancia?.destruir();
      },
    };

    const interacao = montarInteracao(palco, { t });
    aliasDaUrl(win);
    perspDesconhecida = fragmentoTemPersp(win.location.hash) && !lerDaUrl(grafo, win).persp;
    const inicial = lerDaUrl(grafo, win);
    escreverEstado(inicial, 'replace', win); // canonical fragment: `view=visao` and old forms collapse to the current one
    historico.substituir(win.location.hash);
    await desenhar(inicial);
  }

  async function trocarDemanda(destino: string, empilhar: boolean): Promise<void> {
    const meu = ++troca;
    try {
      const html = await deps.buscarPagina(destino);
      if (meu !== troca) return; // a newer choice owns the page
      const novo = new (win as Window & typeof globalThis).DOMParser().parseFromString(html, 'text/html');
      const artigoNovo = novo.querySelector('main article');
      const artigo = doc.querySelector('main article');
      if (!artigo || !artigoNovo?.querySelector('[data-island="flow"]')) throw new Error('página sem a ilha do fluxo');
      atual?.destruir();
      atual = undefined;
      artigo.replaceChildren(...[...artigoNovo.childNodes].map((n) => doc.importNode(n, true)));
      doc.title = novo.title;
      for (const sel of ['.lang-switch', 'link[rel="alternate"]']) {
        const antigos = [...doc.querySelectorAll(sel)];
        const novos = [...novo.querySelectorAll(sel)];
        antigos.forEach((a, i) => novos[i] && a.replaceWith(doc.importNode(novos[i] as Node, true)));
      }
      if (empilhar) win.history.pushState(null, '', destino);
      const raiz = artigo.querySelector<HTMLElement>('[data-island="flow"]');
      if (raiz) await montar(raiz);
      artigo.querySelector<HTMLElement>('[data-flow-select]')?.focus();
    } catch {
      if (meu === troca) deps.navegar(destino); // never leave a half-swapped page: a real navigation shows the chosen Demanda
    }
  }

  return {
    montar,
    trocarDemanda,
    destruir() {
      win.removeEventListener('popstate', aoVoltar);
      atual?.destruir();
      atual = undefined;
    },
  };
}

/** Entry point of the page script: mounts the island when the page has one. */
export function iniciarIlhaDaPagina(): ControladorDaIlha | undefined {
  const raiz = document.querySelector<HTMLElement>('[data-island="flow"]');
  if (!raiz) return undefined;
  const controlador = criarControlador();
  void controlador.montar(raiz);
  return controlador;
}
