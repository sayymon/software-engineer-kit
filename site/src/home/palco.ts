// SPDX-License-Identifier: MIT
// The single WebGL stage of the Home: one renderer, one camera, one particle system, one animation loop.
// The loop pauses when the tab is hidden. Quality steps down when frames get slow (never up).
import * as THREE from 'three';
import { hexParaRgb, layoutCatalogo, layoutTitulo, layoutVazio, preencherPoeira, type Area, type Layout, type NoCatalogo } from '@lib/home/layouts';
import { layoutIcone, layoutJornadas, type DadosJornadas, type FocoJornadas } from '@lib/home/layouts-cena';
import { CENAS, janelaDeMorph } from '@lib/home/progresso';
import { AvaliadorDeQuadros, CONFIG, nivelInicial, type Nivel } from '@lib/home/qualidade';
import { carregarCatalogo, carregarJornadas } from './dados';
import { criarCircuito, type Circuito } from './circuito';
import { criarTermos, type Termos } from './termos';
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
const GANHO = [1, 1, 0.42, 0.75];
/** Color of each demand icon (Okabe-Ito based). */
const COR_DEMANDA: Record<string, string> = {
  feature: '#56B4E9', bug: '#D55E00', incidente: '#E69F00', chore: '#9fb2d9', seguranca: '#009E73', spike: '#CC79A7',
  divida_tecnica: '#F0E442', infraestrutura: '#56B4E9', teste_qa: '#009E73', documentacao: '#7aa8ff', migracao: '#E69F00', descontinuacao: '#aab3c5',
};
/** Neutral branching icon shown before a demand is chosen. */
const ICONE_PADRAO = 'M6 3v12 M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M18 9a9 9 0 0 1-9 9';
const cacheIcones = new Map<string, Array<[number, number]>>();
/** Rasterizes a 24x24 stroke icon and returns its points (0..1) for the particles. */
function amostrarIcone(caminho: string, maximo = 900): Array<[number, number]> {
  const memo = cacheIcones.get(caminho);
  if (memo) return memo;
  const T = 240;
  const c = document.createElement('canvas');
  c.width = c.height = T;
  const g = c.getContext('2d', { willReadFrequently: true })!;
  g.scale(T / 24, T / 24);
  g.strokeStyle = '#fff';
  g.lineWidth = 2.1;
  g.lineCap = 'round';
  g.lineJoin = 'round';
  g.stroke(new Path2D(caminho));
  const dados = g.getImageData(0, 0, T, T).data;
  const todos: Array<[number, number]> = [];
  for (let y = 0; y < T; y += 2) for (let x = 0; x < T; x += 2) if (dados[(y * T + x) * 4 + 3] > 120) todos.push([x / T, y / T]);
  const passo = Math.max(1, todos.length / maximo);
  const saida: Array<[number, number]> = [];
  for (let i = 0; i < todos.length && saida.length < maximo; i += passo) saida.push(todos[Math.floor(i)]);
  cacheIcones.set(caminho, saida);
  return saida;
}

export async function criarPalco(home: HTMLElement, estado: EstadoDeScroll): Promise<Palco> {
  const coarse = matchMedia('(pointer: coarse)').matches;
  const nav = navigator as Navigator & { deviceMemory?: number };
  let nivel: Nivel = nivelInicial({ toqueGrosso: coarse, nucleos: nav.hardwareConcurrency, memoriaGb: nav.deviceMemory });
  // ?nivel=alto|medio|baixo pins the quality level (useful to compare machines); without it quality adapts by itself.
  const forcado = new URLSearchParams(location.search).get('nivel');
  if (forcado === 'alto' || forcado === 'medio' || forcado === 'baixo') nivel = forcado;
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
  // Technology backdrop: circuit board with data packets, and floating code symbols.
  let circuito: Circuito = criarCircuito(CONFIG[nivel].trilhas, CONFIG[nivel].pulsos);
  scene.add(circuito.grupo);
  let termos: Termos | null = null;

  const base = home.dataset.base ?? document.documentElement.dataset.base ?? '';
  const locale = document.documentElement.lang || 'pt-BR';
  const dados: { demanda: string; catalogo?: NoCatalogo[]; jornadas?: DadosJornadas; grupo: string | null; foco: FocoJornadas | null } = { demanda: '', grupo: null, foco: null };
  const demandas = [...home.querySelectorAll<HTMLAnchorElement>('[data-demanda]')];
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
    const escolhida = demandas.find((a) => a.dataset.demanda === dados.demanda);
    const caminho = escolhida?.querySelector('path')?.getAttribute('d') ?? ICONE_PADRAO;
    const corIcone = hexParaRgb(escolhida ? COR_DEMANDA[dados.demanda] ?? '#56B4E9' : '#7aa8ff');
    const icone = layoutIcone(amostrarIcone(caminho, Math.floor(n * 0.4)), [area.largura * (area.desloc - 0.06), 0], Math.min(area.altura * 0.46, area.largura * 0.3), n, corIcone, 21);
    return [
      titulo,
      icone,
      dados.catalogo ? layoutCatalogo(dados.catalogo, area, n, 31, dados.grupo) : poeira(31),
      dados.jornadas ? layoutJornadas(dados.jornadas, area, n, 41, dados.foco) : poeira(41),
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
  const buscar: Array<() => Promise<void>> = [
    async () => {},
    async () => {},
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
  // Choosing a demand in scene 2: the particles glide from the current icon to the new one.
  let transicao: { de: Float32Array; deCores: Float32Array; para: Layout; inicio: number; indice: number } | null = null;
  function aplicarLayoutsSuave(indice: 1 | 2 | 3): void {
    const novo = construirLayouts();
    const atual = layouts[indice];
    layouts = layouts.map((l, i) => (i === indice ? l : novo[i]));
    if (!atual) {
      layouts[indice] = novo[indice];
      particulas.definirLayout(indice, layouts[indice]);
      return;
    }
    transicao = { de: atual.posicoes.slice(), deCores: atual.cores.slice(), para: novo[indice], inicio: performance.now(), indice };
    layouts[indice] = { posicoes: atual.posicoes.slice(), cores: atual.cores.slice() };
  }
  const cenaFluxos = home.querySelector<HTMLElement>('[data-cena="fluxos"]');
  const legenda = cenaFluxos?.querySelector<HTMLElement>('.flow-legenda') ?? null;
  const abrirFluxo = cenaFluxos?.querySelector<HTMLAnchorElement>('.cena-acao a') ?? null;
  demandas.forEach((a) => {
    a.setAttribute('aria-pressed', 'false');
    a.addEventListener('click', (e) => {
      if (!document.documentElement.classList.contains('home-imersiva')) return;
      e.preventDefault();
      dados.demanda = a.dataset.demanda ?? dados.demanda;
      demandas.forEach((x) => x.setAttribute('aria-pressed', String(x === a)));
      if (cenaFluxos) cenaFluxos.dataset.escolhida = 'sim';
      if (abrirFluxo) abrirFluxo.href = a.href;
      if (legenda) {
        legenda.hidden = false;
        // Restart the entrance animation of the caption for every choice.
        legenda.classList.remove('entra');
        void legenda.offsetWidth;
        legenda.classList.add('entra');
        legenda.style.setProperty('--cor', COR_DEMANDA[dados.demanda] ?? '#56B4E9');
        legenda.querySelector('.flow-nome')!.textContent = a.dataset.nome ?? '';
        legenda.querySelector('.flow-desc')!.textContent = a.dataset.legenda ?? '';
      }
      aplicarLayoutsSuave(1);
    });
  });
  // Chips of scenes 3 and 4 change the animation (the chosen part shines, the rest fades) and the two actions below them.
  function ligarChips(cena: string, seletor: string, valor: (a: HTMLAnchorElement) => string | null, aplicar: (v: string | null) => void, indice: 2 | 3): void {
    const raiz = home.querySelector<HTMLElement>(`[data-cena="${cena}"]`);
    if (!raiz) return;
    const chips = [...raiz.querySelectorAll<HTMLAnchorElement>(seletor)];
    const lista = raiz.querySelector<HTMLAnchorElement>('[data-acao="lista"]');
    const tres = raiz.querySelector<HTMLAnchorElement>('[data-acao="3d"]');
    const padraoLista = lista?.getAttribute('href') ?? '';
    const padrao3d = tres?.getAttribute('href') ?? '';
    chips.forEach((a) => {
      a.setAttribute('aria-pressed', 'false');
      a.addEventListener('click', (e) => {
        if (!document.documentElement.classList.contains('home-imersiva')) return;
        e.preventDefault();
        const ligar = a.getAttribute('aria-pressed') !== 'true';
        chips.forEach((x) => x.setAttribute('aria-pressed', String(ligar && x === a)));
        aplicar(ligar ? valor(a) : null);
        if (lista) lista.href = ligar ? a.dataset.lista ?? padraoLista : padraoLista;
        if (tres) tres.href = ligar ? a.dataset['3d'] ?? padrao3d : padrao3d;
        aplicarLayoutsSuave(indice);
      });
    });
  }
  ligarChips('catalogo', '[data-grupo]', (a) => a.dataset.grupo ?? null, (v) => (dados.grupo = v), 2);
  ligarChips('jornadas', '[data-tipo-home]', (a) => a.dataset.tipoHome ?? null, (v) => (dados.foco = v as FocoJornadas | null), 3);
  garantir(0);
  // Floating catalog terms: fetched after the stage is up, so they never delay the first scene.
  const rotulos = JSON.parse(document.getElementById('home-i18n')?.textContent ?? '{}') as Record<string, string>;
  void criarTermos(base, locale, CONFIG[nivel].termos, rotulos).then((t) => (termos = t));

  let progressos = estado.progressos;
  let ativa = estado.ativa;
  const avaliador = new AvaliadorDeQuadros(nivel);
  let tLinha = 0;
  let quadroN = 0;
  let retanguloTexto: DOMRect | null = null;
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
    scene.remove(circuito.grupo);
    circuito.destruir();
    circuito = criarCircuito(CONFIG[nivel].trilhas, CONFIG[nivel].pulsos);
    scene.add(circuito.grupo);
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
    const descer = forcado ? null : avaliador.registrar(dt);
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
    // The morph follows the scroll with a little inertia, so a jump from the indicator flies through the scenes.
    const alvo = janelaDeMorph(progressos, ativa);
    tLinha += (alvo.de + alvo.mistura - tLinha) * (1 - Math.exp(-dt / 170));
    const seg = Math.min(2, Math.floor(tLinha + 1e-6));
    const mistura = Math.min(1, tLinha - seg);
    particulas.definirMorph(seg, mistura);
    // The catalog cloud is dense, so it is drawn with less light.
    particulas.definirGanho(GANHO[seg] * (1 - mistura) + GANHO[seg + 1] * mistura);
    particulas.atualizar(t);
    circuito.atualizar(t, Math.min(dt, 50) / 1000, camera.position.x, camera.position.y);
    camera.updateMatrixWorld();
    if (quadroN++ % 6 === 0) retanguloTexto = home.querySelector(`[data-cena="${CENAS[ativa]}"] .cena-texto`)?.getBoundingClientRect() ?? null;
    termos?.atualizar(t, camera, Math.max(0, Math.min(1, 1 - tLinha * 1.7)), retanguloTexto);
    alvoPonteiro.atualX += (alvoPonteiro.x - alvoPonteiro.atualX) * 0.12;
    alvoPonteiro.atualY += (alvoPonteiro.y - alvoPonteiro.atualY) * 0.12;
    alvoPonteiro.atualF += (alvoPonteiro.forca - alvoPonteiro.atualF) * 0.08;
    particulas.definirPonteiro(alvoPonteiro.atualX, alvoPonteiro.atualY, alvoPonteiro.atualF);
    // Slow camera drift, plus a small parallax with the pointer.
    camera.position.x = Math.sin(t * 0.13) * 0.5 + alvoPonteiro.atualX * 0.3 * (alvoPonteiro.atualF);
    camera.position.y = Math.cos(t * 0.1) * 0.3 + alvoPonteiro.atualY * 0.2 * (alvoPonteiro.atualF);
    camera.lookAt(0, 0, 0);
    // Scene 2 sways the icon a little, scene 3 turns the cloud slowly, the others settle back.
    if (ativa === 2) particulas.pontos.rotation.y += 0.0014;
    else if (ativa === 1) particulas.pontos.rotation.y += (Math.sin(t * 0.8) * 0.5 - particulas.pontos.rotation.y) * 0.06;
    else particulas.pontos.rotation.y *= 0.96;
    if (transicao) {
      const k = Math.min(1, (agora - transicao.inicio) / 650);
      const e = k * k * (3 - 2 * k);
      const alvo = layouts[transicao.indice];
      const p = alvo.posicoes;
      const q = transicao.para.posicoes;
      for (let i = 0; i < p.length; i++) p[i] = transicao.de[i] + (q[i] - transicao.de[i]) * e;
      const cc = alvo.cores;
      const qc = transicao.para.cores;
      for (let i = 0; i < cc.length; i++) cc[i] = transicao.deCores[i] + (qc[i] - transicao.deCores[i]) * e;
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
      circuito.destruir();
      termos?.destruir();
      renderer.dispose();
      canvas.remove();
      badge?.remove();
    },
  };
}
