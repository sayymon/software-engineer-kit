// SPDX-License-Identifier: MIT
// Interaction of the Diagrama (Requirements 3.2 to 3.11): click (up to 3 px of movement) opens the Nó, a longer drag pans the area
// with the `grabbing` cursor and opens nothing, arrows scroll the area (or move focus between Nós), Ctrl/Cmd + wheel zooms (a plain
// wheel keeps scrolling the page), zoom buttons, a gesture help text tied by `aria-describedby`, Enter/Space on a focused Nó.
// Independent of the island: it receives the scroll container (the stage), a translator and, optionally, a callback. Opening a Nó
// emits `CustomEvent('flow:abrir-no', { detail: { id }, bubbles: true })` on the container (the modal listens to it, phase 7).
// Zoom is kept in this module and re-applied to every svg the Renderizador draws, so it survives a redraw. It only changes the
// svg width: `data-id`, focus and selection are untouched.

export const LIMITE_DE_CLIQUE_PX = 3;
export const ZOOM_MIN = 0.25;
export const ZOOM_MAX = 3;
const PASSO_ZOOM = 1.2;
const PASSO_ROLAGEM_PX = 60;
export const EVENTO_ABRIR_NO = 'flow:abrir-no';
/** A collapsed Cluster_de_Raia was activated (click or Enter/Space): `detail.raia` is the lane id (Requirement 20.3, 20.11). */
export const EVENTO_EXPANDIR_RAIA = 'flow:expandir-raia';
/** The label of an expanded lane was clicked: open the View `raia:<id>` (Requirement 4.3). */
export const EVENTO_ABRIR_RAIA = 'flow:abrir-raia';
const PREFIXO_CLUSTER = 'cluster:';

const SELETOR_NO = '[data-id][role="button"]';

export type TraduzirInteracao = (chave: string, vars?: Record<string, string | number>) => string;

export interface OpcoesDeInteracao {
  t: TraduzirInteracao;
  /** Called besides the event, when given. */
  aoAbrirNo?: (id: string) => void;
}

export interface InteracaoMontada {
  zoom(): number;
  definirZoom(valor: number): void;
  destruir(): void;
}

const limitar = (v: number): number => Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, v));

function larguraBase(svg: SVGSVGElement): number {
  const cache = Number(svg.dataset.flowBase);
  if (cache > 0) return cache;
  svg.style.width = '';
  svg.style.maxWidth = 'none';
  let largura = svg.getBoundingClientRect().width;
  if (!(largura > 0)) largura = svg.viewBox?.baseVal?.width || Number.parseFloat(svg.getAttribute('width') ?? '') || 0;
  if (largura > 0) svg.dataset.flowBase = String(largura);
  return largura;
}

function aplicarZoomAoSvg(svg: SVGSVGElement, zoom: number): void {
  if (zoom === 1) {
    svg.style.width = '';
    svg.style.maxWidth = '';
    return;
  }
  const base = larguraBase(svg);
  if (base > 0) {
    svg.style.maxWidth = 'none';
    svg.style.width = `${Math.round(base * zoom)}px`;
  }
}

export function montarInteracao(palco: HTMLElement, opcoes: OpcoesDeInteracao): InteracaoMontada {
  const { t } = opcoes;
  const doc = palco.ownerDocument;
  let zoom = 1;

  // --- help text and zoom buttons (outside the stage: a redraw replaces the stage children) ---
  const ajuda = doc.createElement('p');
  ajuda.className = 'flow-ajuda muted';
  ajuda.id = `${palco.id || 'flow-stage'}-ajuda`;
  ajuda.textContent = t('flow.gestures.help');
  const barra = doc.createElement('div');
  barra.className = 'flow-zoom';
  barra.setAttribute('role', 'group');
  barra.setAttribute('aria-label', t('flow.zoom.group'));
  const botao = (acao: string, texto: string, rotulo: string): HTMLButtonElement => {
    const b = doc.createElement('button');
    b.type = 'button';
    b.dataset.flowZoom = acao;
    b.textContent = texto;
    b.setAttribute('aria-label', rotulo);
    return b;
  };
  const menos = botao('menos', '−', t('flow.zoom.out'));
  const reset = botao('reset', '100%', t('flow.zoom.reset'));
  const mais = botao('mais', '+', t('flow.zoom.in'));
  barra.append(menos, reset, mais);
  palco.before(barra, ajuda);
  const descrevia = palco.getAttribute('aria-describedby');
  palco.setAttribute('aria-describedby', [descrevia, ajuda.id].filter(Boolean).join(' '));

  const mostrarZoom = (): void => {
    reset.textContent = `${Math.round(zoom * 100)}%`;
    menos.disabled = zoom <= ZOOM_MIN;
    mais.disabled = zoom >= ZOOM_MAX;
  };
  const aplicarZoom = (): void => {
    palco.querySelectorAll<SVGSVGElement>('svg').forEach((svg) => {
      if (svg.closest('.flow-erro')) return;
      aplicarZoomAoSvg(svg, zoom);
    });
  };
  const definirZoom = (valor: number): void => {
    const novo = limitar(valor);
    if (novo === zoom) return;
    // Keep the center of the viewport at the same point of the drawing.
    const cx = (palco.scrollLeft + palco.clientWidth / 2) / (palco.scrollWidth || 1);
    const cy = (palco.scrollTop + palco.clientHeight / 2) / (palco.scrollHeight || 1);
    zoom = novo;
    aplicarZoom();
    mostrarZoom();
    palco.scrollLeft = cx * palco.scrollWidth - palco.clientWidth / 2;
    palco.scrollTop = cy * palco.scrollHeight - palco.clientHeight / 2;
  };
  mostrarZoom();

  const aoZoomClicar = (ev: Event): void => {
    const b = (ev.target as Element).closest<HTMLElement>('[data-flow-zoom]');
    if (!b) return;
    const acao = b.dataset.flowZoom;
    if (acao === 'mais') definirZoom(zoom * PASSO_ZOOM);
    else if (acao === 'menos') definirZoom(zoom / PASSO_ZOOM);
    else definirZoom(1);
  };
  barra.addEventListener('click', aoZoomClicar);

  // A redraw replaces the svg (inside the Perspectiva container, not as a direct child of the stage): apply the current zoom to the new one.
  // `aplicarZoom` only writes `style`, which a `childList` observer does not see, so it cannot loop.
  const observador = new MutationObserver(() => {
    if (zoom !== 1) aplicarZoom();
  });
  observador.observe(palco, { childList: true, subtree: true });

  // --- opening a Nó ---
  const abrir = (id: string): void => {
    // A collapsed Cluster_de_Raia is not a Nó: it expands in place and never reaches the playbook modal.
    if (id.startsWith(PREFIXO_CLUSTER)) {
      palco.dispatchEvent(new CustomEvent(EVENTO_EXPANDIR_RAIA, { detail: { raia: id.slice(PREFIXO_CLUSTER.length) }, bubbles: true }));
      return;
    }
    palco.dispatchEvent(new CustomEvent(EVENTO_ABRIR_NO, { detail: { id }, bubbles: true }));
    opcoes.aoAbrirNo?.(id);
  };
  const rotuloDeRaiaDe = (alvo: EventTarget | null): string | null => {
    if (!(alvo instanceof Element) || !alvo.closest('.cluster-label')) return null;
    return alvo.closest('g.cluster[data-id]')?.getAttribute('data-id') ?? null;
  };
  const noDe = (alvo: EventTarget | null): HTMLElement | null =>
    alvo instanceof Element ? (alvo.closest(SELETOR_NO) as HTMLElement | null) : null;

  // --- pointer: click up to 3 px, drag beyond it pans ---
  let gesto: { id: number; x: number; y: number; esq: number; topo: number; noId: string | null; raiaId: string | null; arrastando: boolean } | undefined;
  let arrastouRecentemente = false;

  const aoApertar = (ev: PointerEvent): void => {
    if (ev.button !== 0 || gesto) return;
    gesto = { id: ev.pointerId, x: ev.clientX, y: ev.clientY, esq: palco.scrollLeft, topo: palco.scrollTop, noId: noDe(ev.target)?.dataset.id ?? null, raiaId: rotuloDeRaiaDe(ev.target), arrastando: false };
  };
  const aoMover = (ev: PointerEvent): void => {
    if (!gesto || ev.pointerId !== gesto.id) return;
    const dx = ev.clientX - gesto.x;
    const dy = ev.clientY - gesto.y;
    if (!gesto.arrastando) {
      if (Math.hypot(dx, dy) <= LIMITE_DE_CLIQUE_PX) return;
      gesto.arrastando = true;
      palco.classList.add('flow-stage--grabbing');
      palco.style.cursor = 'grabbing';
      try {
        palco.setPointerCapture?.(ev.pointerId);
      } catch {
        /* the pointer is gone: the drag still works with the events it gets */
      }
    }
    palco.scrollLeft = gesto.esq - dx;
    palco.scrollTop = gesto.topo - dy;
    ev.preventDefault();
  };
  const encerrar = (ev: PointerEvent, cancelado: boolean): void => {
    if (!gesto || ev.pointerId !== gesto.id) return;
    const g = gesto;
    gesto = undefined;
    if (g.arrastando) {
      palco.classList.remove('flow-stage--grabbing');
      palco.style.cursor = '';
      try {
        palco.releasePointerCapture?.(ev.pointerId);
      } catch {
        /* already released */
      }
      arrastouRecentemente = true;
      setTimeout(() => (arrastouRecentemente = false), 0);
      return;
    }
    if (cancelado) return;
    if (g.noId) abrir(g.noId);
    else if (g.raiaId) palco.dispatchEvent(new CustomEvent(EVENTO_ABRIR_RAIA, { detail: { raia: g.raiaId }, bubbles: true }));
  };
  const aoSoltar = (ev: PointerEvent): void => encerrar(ev, false);
  const aoCancelar = (ev: PointerEvent): void => encerrar(ev, true);
  // After a drag the browser still sends a `click` to the element under the pointer: swallow it.
  const aoClicarNativo = (ev: MouseEvent): void => {
    if (arrastouRecentemente) {
      ev.stopPropagation();
      ev.preventDefault();
    }
  };

  // --- wheel: only Ctrl/Cmd zooms, a plain wheel is left to the browser (scroll) ---
  const aoRoda = (ev: WheelEvent): void => {
    if (!ev.ctrlKey && !ev.metaKey) return;
    ev.preventDefault();
    definirZoom(zoom * (ev.deltaY < 0 ? PASSO_ZOOM : 1 / PASSO_ZOOM));
  };

  // --- keyboard ---
  const aoTeclar = (ev: KeyboardEvent): void => {
    if (ev.ctrlKey || ev.metaKey || ev.altKey) return;
    const no = noDe(ev.target);
    if (no && (ev.key === 'Enter' || ev.key === ' ' || ev.key === 'Spacebar')) {
      ev.preventDefault();
      if (no.dataset.id) abrir(no.dataset.id);
      return;
    }
    const direcao: Record<string, [number, number]> = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
    const d = direcao[ev.key];
    if (!d || (ev.target !== palco && !no)) return;
    ev.preventDefault();
    if (no) {
      const vizinho = vizinhoNaDirecao(palco, no, d);
      if (vizinho) {
        vizinho.focus();
        vizinho.scrollIntoView?.({ block: 'nearest', inline: 'nearest' });
        return;
      }
    }
    palco.scrollLeft += d[0] * PASSO_ROLAGEM_PX;
    palco.scrollTop += d[1] * PASSO_ROLAGEM_PX;
  };

  palco.addEventListener('pointerdown', aoApertar);
  palco.addEventListener('pointermove', aoMover);
  palco.addEventListener('pointerup', aoSoltar);
  palco.addEventListener('pointercancel', aoCancelar);
  palco.addEventListener('click', aoClicarNativo, true);
  palco.addEventListener('wheel', aoRoda, { passive: false });
  palco.addEventListener('keydown', aoTeclar);

  return {
    zoom: () => zoom,
    definirZoom,
    destruir() {
      palco.removeEventListener('pointerdown', aoApertar);
      palco.removeEventListener('pointermove', aoMover);
      palco.removeEventListener('pointerup', aoSoltar);
      palco.removeEventListener('pointercancel', aoCancelar);
      palco.removeEventListener('click', aoClicarNativo, true);
      palco.removeEventListener('wheel', aoRoda);
      palco.removeEventListener('keydown', aoTeclar);
      barra.removeEventListener('click', aoZoomClicar);
      observador.disconnect();
      barra.remove();
      ajuda.remove();
      palco.classList.remove('flow-stage--grabbing');
      palco.style.cursor = '';
      if (descrevia) palco.setAttribute('aria-describedby', descrevia);
      else palco.removeAttribute('aria-describedby');
    },
  };
}

/** Nearest Nó whose center lies in the arrow direction (a 90° cone), or null when there is none. */
export function vizinhoNaDirecao(palco: HTMLElement, atual: HTMLElement, [dx, dy]: [number, number]): HTMLElement | null {
  const centro = (e: Element): [number, number] => {
    const r = e.getBoundingClientRect();
    return [r.left + r.width / 2, r.top + r.height / 2];
  };
  const [cx, cy] = centro(atual);
  let melhor: HTMLElement | null = null;
  let menor = Infinity;
  for (const no of palco.querySelectorAll<HTMLElement>(SELETOR_NO)) {
    if (no === atual) continue;
    const [x, y] = centro(no);
    const along = (x - cx) * dx + (y - cy) * dy;
    const across = Math.abs((x - cx) * dy) + Math.abs((y - cy) * dx);
    if (along <= 0 || across > along) continue;
    const dist = along * along + across * across;
    if (dist < menor) {
      menor = dist;
      melhor = no;
    }
  }
  return melhor;
}
