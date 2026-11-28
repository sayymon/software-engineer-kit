// SPDX-License-Identifier: MIT
// Botão "Voltar" da Pagina_de_Demanda (Requirements 4.4, 4.5). In-memory stack of the states the island pushed to `history`, each with
// the scroll of the stage when the user left it. Relation with the browser Back button (decision, no duplication):
//  - the island already writes every internal navigation (View change, expansion) with `history.pushState`, so the browser Back button
//    and `popstate` already undo it. The stack does not replay anything: it mirrors those entries and adds what `history` cannot hold
//    (scroll of the stage, and the "is there something to go back to" answer that disables the button);
//  - the "Voltar" button calls `history.back()`. It never pushes an entry of its own, so one click moves exactly one step, the same
//    step the browser button takes. The island's `popstate` handler then redraws and restores the scroll from this stack;
//  - entries are matched by fragment (the previous or the next one). A fragment that matches neither (hash edited by hand) restarts the
//    stack at that fragment, so the button becomes disabled instead of guessing.
// Pure logic first (testable without DOM), then the button.

export interface Rolagem {
  esq: number;
  topo: number;
}

interface Entrada extends Rolagem {
  hash: string;
}

export class HistoricoDeViews {
  private entradas: Entrada[];
  private pos = 0;

  constructor(hashInicial: string) {
    this.entradas = [{ hash: hashInicial, esq: 0, topo: 0 }];
  }

  /** True when there is a previous state to return to (button enabled). */
  get podeVoltar(): boolean {
    return this.pos > 0;
  }

  get tamanho(): number {
    return this.entradas.length;
  }

  /** The island pushed `hash` to `history`. Saves the scroll of the state being left and drops any "forward" entries. */
  empilhar(hash: string, rolagemAtual: Rolagem): void {
    (this.entradas[this.pos] as Entrada).esq = rolagemAtual.esq;
    (this.entradas[this.pos] as Entrada).topo = rolagemAtual.topo;
    this.entradas.length = this.pos + 1;
    this.entradas.push({ hash, esq: 0, topo: 0 });
    this.pos++;
  }

  /** The island rewrote the current entry (`replaceState`): same position, new fragment. */
  substituir(hash: string): void {
    (this.entradas[this.pos] as Entrada).hash = hash;
  }

  /**
   * `popstate`: the URL now holds `hash`. Moves to the previous or next entry that has this fragment and returns the scroll to restore
   * (the one saved when the user left it). Returns undefined, with the stack restarted at `hash`, when no neighbour matches.
   */
  sincronizar(hash: string, rolagemAtual: Rolagem): Rolagem | undefined {
    const atual = this.entradas[this.pos] as Entrada;
    if (atual.hash === hash) return undefined; // same state (replace, or a Demanda-level popstate): nothing to restore
    const alvo = [this.pos - 1, this.pos + 1].find((i) => this.entradas[i]?.hash === hash);
    if (alvo === undefined) {
      this.entradas = [{ hash, esq: 0, topo: 0 }];
      this.pos = 0;
      return undefined;
    }
    atual.esq = rolagemAtual.esq;
    atual.topo = rolagemAtual.topo;
    this.pos = alvo;
    const e = this.entradas[alvo] as Entrada;
    return { esq: e.esq, topo: e.topo };
  }
}

export interface BotaoVoltar {
  readonly elemento: HTMLElement;
  /** Enables or disables the button (`disabled` and `aria-disabled`). */
  atualizar(podeVoltar: boolean): void;
  destruir(): void;
}

export function criarBotaoVoltar(doc: Document, t: (chave: string) => string, voltar: () => void): BotaoVoltar {
  const raiz = doc.createElement('div');
  raiz.className = 'flow-historico';
  const botao = doc.createElement('button');
  botao.type = 'button';
  botao.dataset.flowVoltar = '';
  botao.textContent = t('flow.voltar');
  botao.setAttribute('aria-label', t('flow.voltar.rotulo'));
  raiz.appendChild(botao);
  const aoClicar = (): void => {
    if (!botao.disabled) voltar();
  };
  botao.addEventListener('click', aoClicar);
  const atualizar = (pode: boolean): void => {
    botao.disabled = !pode;
    botao.setAttribute('aria-disabled', String(!pode));
  };
  atualizar(false);
  return {
    elemento: raiz,
    atualizar,
    destruir() {
      botao.removeEventListener('click', aoClicar);
      raiz.remove();
    },
  };
}
