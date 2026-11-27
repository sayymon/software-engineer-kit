// SPDX-License-Identifier: MIT
// The single WebGL stage of the Home: one renderer, one camera, one particle system, one animation loop.
// The loop pauses when the tab is hidden. Quality steps down when frames get slow (never up).
import * as THREE from 'three';
import { layoutCatalogo, layoutFluxo, layoutJornadas, layoutTitulo, layoutVazio, preencherPoeira, type Area, type DadosJornadas, type FluxoDados, type Layout, type NoCatalogo } from '@lib/home/layouts';
import { janelaDeMorph } from '@lib/home/progresso';
import { AvaliadorDeQuadros, CONFIG, nivelInicial, type Nivel } from '@lib/home/qualidade';
import { carregarCatalogo, carregarFluxo, carregarJornadas } from './dados';
import { criarParticulas } from './particulas';
import { amostrarTitulo } from './titulo';

export interface EstadoDeScroll {
  progressos: number[];
  ativa: number;
}

export interface Palco {
  aoProgredir(progressos: number[], ativa: number): void;
  destruir(): void;
}

const COR_FUNDO = 0x04050b;

export async function criarPalco(home: HTMLElement, estado: EstadoDeScroll): Promise<Palco> {
  const coarse = matchMedia('(pointer: coarse)').matches;
  const nav = navigator as Navigator & { deviceMemory?: number };
  let nivel: Nivel = nivelInicial({ toqueGrosso: coarse, nucleos: nav.hardwareConcurrency, memoriaGb: nav.deviceMemory });
  const canvas = document.createElement('canvas');
  canvas.id = 'palco';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.prepend(canvas);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' });
  renderer.setClearColor(COR_FUNDO, 0);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 200);
  camera.position.set(0, 0, 13);

  let particulas = criarParticulas(CONFIG[nivel].particulas, Math.min(devicePixelRatio, CONFIG[nivel].dpr));
  scene.add(particulas.pontos);

  const base = home.dataset.base ?? document.documentElement.dataset.base ?? '';
  const locale = document.documentElement.lang || 'pt-BR';
  const dados: { fluxos: Map<string, FluxoDados>; demanda: string; catalogo?: NoCatalogo[]; jornadas?: DadosJornadas } = { fluxos: new Map(), demanda: '' };
  const carregados = new Set<string>();
  let layouts: Layout[] = [];
  /** Visible world size at z = 0 for the current window. */
  function areaDoMundo(): Area {
    const alturaVis = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
    const aspecto = innerWidth / innerHeight;
    const estreita = aspecto < 0.9;
    return { largura: alturaVis * aspecto, altura: alturaVis, desloc: estreita ? 0 : 0.2 };
  }
  function paraMundo(px: number, py: number): [number, number] {
    const alturaVis = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
    const k = alturaVis / innerHeight;
    return [(px - innerWidth / 2) * k, -(py - innerHeight / 2) * k];
  }
  /** Builds the four layouts from whatever data has arrived; the rest stay as dust until its scene loads. */
  function construirLayouts(): Layout[] {
    const n = CONFIG[nivel].particulas;
    const area = areaDoMundo();
    const poeira = (seed: number) => {
      const l = layoutVazio(n);
      preencherPoeira(l, 0, seed, [0.55, 0.65, 0.95]);
      return l;
    };
    let titulo = poeira(11);
    const h1 = home.querySelector<HTMLElement>('[data-hero-title]');
    if (h1) {
      const amostra = amostrarTitulo(h1);
      if (amostra) {
        const r = h1.getBoundingClientRect();
        const [cx, cy] = paraMundo(r.left + r.width / 2, r.top + r.height / 2);
        const [x2] = paraMundo(r.right, 0);
        const [, y2] = paraMundo(0, r.bottom);
        titulo = layoutTitulo(amostra, { x: cx, y: cy, w: Math.abs(x2 - cx) * 2, h: Math.abs(cy - y2) * 2 }, n, 11);
      }
    }
    const fluxo = dados.fluxos.get(dados.demanda);
    return [
      titulo,
      fluxo ? layoutFluxo(fluxo, area, n, 21) : poeira(21),
      dados.catalogo ? layoutCatalogo(dados.catalogo, area, n, 31) : poeira(31),
      dados.jornadas ? layoutJornadas(dados.jornadas, area, n, 41) : poeira(41),
    ];
  }
  function aplicarLayouts(): void {
    layouts = construirLayouts();
    layouts.forEach((l, i) => particulas.definirLayout(i as 0 | 1 | 2 | 3, l));
  }

  function redimensionar(): void {
    const w = innerWidth;
    const h = innerHeight;
    renderer.setPixelRatio(Math.min(devicePixelRatio, CONFIG[nivel].dpr));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    // Keep the visible height constant (about 12 world units) on narrow and wide screens.
    camera.position.z = 12 / (2 * Math.tan((camera.fov * Math.PI) / 360)) * (w / h < 0.9 ? 1.5 : 1);
  }
  redimensionar();
  aplicarLayouts();
  let tempoResize = 0;
  addEventListener('resize', () => {
    clearTimeout(tempoResize);
    tempoResize = window.setTimeout(() => {
      redimensionar();
      aplicarLayouts();
    }, 150);
  }, { passive: true });

  const alvoPonteiro = { x: 9, y: 9, forca: 0, atualX: 9, atualY: 9, atualF: 0 };
  const onPonteiro = (e: PointerEvent) => {
    alvoPonteiro.x = (e.clientX / innerWidth) * 2 - 1;
    alvoPonteiro.y = -((e.clientY / innerHeight) * 2 - 1);
    alvoPonteiro.forca = 1;
  };
  const onSaiu = () => (alvoPonteiro.forca = 0);
  addEventListener('pointermove', onPonteiro, { passive: true });
  document.addEventListener('pointerleave', onSaiu);

  // ----- data loading: each scene's file is fetched when the scene before it becomes active -----
  const demandas = [...home.querySelectorAll<HTMLAnchorElement>('[data-demanda]')];
  dados.demanda = demandas[0]?.dataset.demanda ?? 'feature';
  async function carregarFluxoEscolhido(): Promise<void> {
    if (!dados.fluxos.has(dados.demanda)) {
      try {
        dados.fluxos.set(dados.demanda, await carregarFluxo(base, locale, dados.demanda));
      } catch (e) {
        console.warn('home: fluxo indisponível', e);
        return;
      }
    }
    aplicarLayoutsSuave(1);
  }
  const buscar: Array<() => Promise<void>> = [
    async () => {},
    carregarFluxoEscolhido,
    async () => {
      try {
        dados.catalogo = (await carregarCatalogo(base, locale)).nos;
        aplicarLayouts();
      } catch (e) {
        console.warn('home: catálogo indisponível', e);
      }
    },
    async () => {
      try {
        dados.jornadas = (await carregarJornadas(base, locale)).dados;
        aplicarLayouts();
      } catch (e) {
        console.warn('home: jornadas indisponíveis', e);
      }
    },
  ];
  function garantir(ate: number): void {
    for (let i = 1; i <= Math.min(ate + 1, 3); i++) {
      const chave = `cena${i}`;
      if (carregados.has(chave)) continue;
      carregados.add(chave);
      void buscar[i]();
    }
  }
  // Selecting a demand in scene 2: the particles glide to the new flow instead of jumping.
  let transicao: { de: Float32Array; para: Layout; inicio: number; indice: number } | null = null;
  function aplicarLayoutsSuave(indice: 1): void {
    const novo = construirLayouts();
    const atual = layouts[indice];
    layouts = layouts.length ? layouts.map((l, i) => (i === indice ? l : novo[i])) : novo;
    if (!atual) {
      layouts[indice] = novo[indice];
      particulas.definirLayout(indice, layouts[indice]);
      return;
    }
    transicao = { de: atual.posicoes.slice(), para: novo[indice], inicio: performance.now(), indice };
    layouts[indice] = { posicoes: atual.posicoes.slice(), cores: atual.cores.slice() };
  }
  demandas.forEach((a) => {
    a.setAttribute('aria-pressed', String(a.dataset.demanda === dados.demanda));
    a.addEventListener('click', (e) => {
      if (!document.documentElement.classList.contains('home-imersiva')) return;
      e.preventDefault();
      dados.demanda = a.dataset.demanda ?? dados.demanda;
      demandas.forEach((x) => x.setAttribute('aria-pressed', String(x === a)));
      const abrir = home.querySelector<HTMLAnchorElement>('[data-cena="fluxos"] a.glass-btn');
      if (abrir) abrir.href = a.href;
      void carregarFluxoEscolhido();
    });
  });
  const abrirFluxo = home.querySelector<HTMLAnchorElement>('[data-cena="fluxos"] a.glass-btn');
  if (abrirFluxo && demandas[0]) abrirFluxo.href = demandas[0].href;
  garantir(0);

  let progressos = estado.progressos;
  let ativa = estado.ativa;
  const avaliador = new AvaliadorDeQuadros(nivel);
  let rodando = true;
  let rafId = 0;
  let ultimo = performance.now();
  const t0 = ultimo;

  // FPS badge for local measurement: add ?fps to the URL.
  let badge: HTMLElement | null = null;
  if (new URLSearchParams(location.search).has('fps')) {
    badge = document.createElement('div');
    badge.style.cssText = 'position:fixed;left:8px;bottom:8px;z-index:99;padding:4px 8px;font:12px/1.2 ui-monospace,monospace;color:#9f9;background:#000a;border-radius:6px';
    document.body.append(badge);
  }
  let acumulado = 0;
  let quadros = 0;

  function trocarNivel(novo: Nivel): void {
    nivel = novo;
    scene.remove(particulas.pontos);
    particulas.destruir();
    particulas = criarParticulas(CONFIG[nivel].particulas, Math.min(devicePixelRatio, CONFIG[nivel].dpr));
    scene.add(particulas.pontos);
    redimensionar();
    aplicarLayouts();
    home.dataset.qualidade = nivel;
  }

  function quadro(agora: number): void {
    if (!rodando) return;
    rafId = requestAnimationFrame(quadro);
    if (document.hidden) {
      ultimo = agora;
      return;
    }
    const dt = agora - ultimo;
    ultimo = agora;
    const descer = avaliador.registrar(dt);
    if (descer) trocarNivel(descer);
    if (badge) {
      acumulado += dt;
      quadros += 1;
      if (acumulado > 500) {
        badge.textContent = `${Math.round((quadros * 1000) / acumulado)} fps · ${nivel} · ${CONFIG[nivel].particulas} part.`;
        acumulado = 0;
        quadros = 0;
      }
    }
    const t = (agora - t0) / 1000;
    const { de, mistura } = janelaDeMorph(progressos, ativa);
    particulas.definirMorph(de, mistura);
    particulas.atualizar(t);
    alvoPonteiro.atualX += (alvoPonteiro.x - alvoPonteiro.atualX) * 0.12;
    alvoPonteiro.atualY += (alvoPonteiro.y - alvoPonteiro.atualY) * 0.12;
    alvoPonteiro.atualF += (alvoPonteiro.forca - alvoPonteiro.atualF) * 0.08;
    particulas.definirPonteiro(alvoPonteiro.atualX, alvoPonteiro.atualY, alvoPonteiro.atualF);
    // Slow camera drift, plus a small parallax with the pointer.
    camera.position.x = Math.sin(t * 0.13) * 0.5 + alvoPonteiro.atualX * 0.3 * (alvoPonteiro.atualF);
    camera.position.y = Math.cos(t * 0.1) * 0.3 + alvoPonteiro.atualY * 0.2 * (alvoPonteiro.atualF);
    camera.lookAt(0, 0, 0);
    if (ativa === 2) particulas.pontos.rotation.y += 0.0014;
    else particulas.pontos.rotation.y *= 0.96;
    if (transicao) {
      const k = Math.min(1, (agora - transicao.inicio) / 650);
      const e = k * k * (3 - 2 * k);
      const alvo = layouts[transicao.indice];
      const p = alvo.posicoes;
      const q = transicao.para.posicoes;
      for (let i = 0; i < p.length; i++) p[i] = transicao.de[i] + (q[i] - transicao.de[i]) * e;
      alvo.cores.set(transicao.para.cores);
      particulas.definirLayout(transicao.indice as 0 | 1 | 2 | 3, alvo);
      if (k >= 1) transicao = null;
    }
    renderer.render(scene, camera);
  }
  rafId = requestAnimationFrame(quadro);

  const perdeu = (e: Event) => {
    e.preventDefault();
    document.documentElement.classList.remove('home-imersiva');
    canvas.remove();
  };
  canvas.addEventListener('webglcontextlost', perdeu);
  home.dataset.palco = 'pronto';
  home.dataset.qualidade = nivel;

  return {
    aoProgredir(p, a) {
      progressos = p;
      ativa = a;
      garantir(a);
    },
    destruir() {
      rodando = false;
      cancelAnimationFrame(rafId);
      removeEventListener('pointermove', onPonteiro);
      document.removeEventListener('pointerleave', onSaiu);
      particulas.destruir();
      renderer.dispose();
      canvas.remove();
      badge?.remove();
    },
  };
}
