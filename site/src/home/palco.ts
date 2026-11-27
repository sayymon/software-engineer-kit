// SPDX-License-Identifier: MIT
// The single WebGL stage of the Home: one renderer, one camera, one particle system, one animation loop.
// The loop pauses when the tab is hidden. Quality steps down when frames get slow (never up).
import * as THREE from 'three';
import { layoutEspiral, preencherPoeira, layoutVazio, type Layout } from '@lib/home/layouts';
import { janelaDeMorph } from '@lib/home/progresso';
import { AvaliadorDeQuadros, CONFIG, nivelInicial, type Nivel } from '@lib/home/qualidade';
import { criarParticulas } from './particulas';

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

  /** Placeholder layouts until each scene supplies its own. */
  function layoutsIniciais(n: number): Layout[] {
    const titulo = layoutVazio(n);
    preencherPoeira(titulo, 0, 11, [0.6, 0.7, 1]);
    return [titulo, layoutEspiral(n, 21, [0.34, 0.7, 0.9]), layoutEspiral(n, 31, [0.9, 0.62, 0]), layoutEspiral(n, 41, [0.8, 0.47, 0.65])];
  }
  const layouts = layoutsIniciais(CONFIG[nivel].particulas);
  layouts.forEach((l, i) => particulas.definirLayout(i as 0 | 1 | 2 | 3, l));

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
  addEventListener('resize', redimensionar, { passive: true });

  const alvoPonteiro = { x: 9, y: 9, forca: 0, atualX: 9, atualY: 9, atualF: 0 };
  const onPonteiro = (e: PointerEvent) => {
    alvoPonteiro.x = (e.clientX / innerWidth) * 2 - 1;
    alvoPonteiro.y = -((e.clientY / innerHeight) * 2 - 1);
    alvoPonteiro.forca = 1;
  };
  const onSaiu = () => (alvoPonteiro.forca = 0);
  addEventListener('pointermove', onPonteiro, { passive: true });
  document.addEventListener('pointerleave', onSaiu);

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
    layoutsIniciais(CONFIG[nivel].particulas).forEach((l, i) => particulas.definirLayout(i as 0 | 1 | 2 | 3, l));
    redimensionar();
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
    particulas.pontos.rotation.y = ativa >= 2 ? t * 0.05 : particulas.pontos.rotation.y * 0.95;
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
    },
    destruir() {
      rodando = false;
      cancelAnimationFrame(rafId);
      removeEventListener('resize', redimensionar);
      removeEventListener('pointermove', onPonteiro);
      document.removeEventListener('pointerleave', onSaiu);
      particulas.destruir();
      renderer.dispose();
      canvas.remove();
      badge?.remove();
    },
  };
}
