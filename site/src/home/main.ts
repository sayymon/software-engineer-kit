// SPDX-License-Identifier: MIT
// Immersive Home entry: reads scroll progress per scene (native scroll, nothing is intercepted), updates the indicator and
// CSS variables, and hands the progress to the WebGL stage once it is loaded. Without WebGL or with reduced motion it does
// nothing and the static sections stay as they are.
import { CENAS, cenaAtiva, progressoDaCena } from '@lib/home/progresso';

const raiz = document.querySelector<HTMLElement>('[data-home]');
if (raiz) iniciar(raiz);

function webgl(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

function iniciar(home: HTMLElement): void {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !webgl()) return;
  document.documentElement.classList.add('home-imersiva');
  const secoes = CENAS.map((id) => home.querySelector<HTMLElement>(`[data-cena="${id}"]`)!);
  const links = CENAS.map((id) => home.querySelector<HTMLAnchorElement>(`[data-cena-link="${id}"]`));
  const estado = { progressos: [0, 0, 0, 0], ativa: 0 };
  let sujo = true;
  let atual = -1;

  function medir(): void {
    const janela = window.innerHeight;
    const faixas = secoes.map((s) => {
      const r = s.getBoundingClientRect();
      return { topo: r.top, altura: r.height };
    });
    estado.progressos = faixas.map((f) => progressoDaCena(f.topo, f.altura, janela));
    estado.ativa = cenaAtiva(faixas, janela);
    secoes.forEach((s, i) => s.style.setProperty('--p', estado.progressos[i].toFixed(4)));
    if (estado.ativa !== atual) {
      atual = estado.ativa;
      links.forEach((a, i) => a && (i === atual ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current')));
      home.dataset.cenaAtiva = CENAS[atual];
    }
  }

  const marcar = () => (sujo = true);
  addEventListener('scroll', marcar, { passive: true });
  addEventListener('resize', marcar, { passive: true });
  function quadro(): void {
    requestAnimationFrame(quadro);
    if (!sujo) return;
    sujo = false;
    medir();
    palco?.aoProgredir(estado.progressos, estado.ativa);
  }
  let palco: { aoProgredir(p: number[], ativa: number): void } | null = null;
  quadro();

  // The stage loads after the first paint, so the first scene is readable before any WebGL code arrives.
  const carregar = () => {
    void import('./palco').then(async (m) => {
      palco = await m.criarPalco(home, estado);
      sujo = true;
    }).catch((e) => {
      console.warn('home: palco indisponível, mantendo as seções estáticas', e);
      document.documentElement.classList.remove('home-imersiva');
    });
  };
  if ('requestIdleCallback' in window) (window as unknown as { requestIdleCallback: (f: () => void, o: { timeout: number }) => void }).requestIdleCallback(carregar, { timeout: 1200 });
  else setTimeout(carregar, 300);
}
