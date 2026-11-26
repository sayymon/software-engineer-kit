// SPDX-License-Identifier: MIT
// Adapter over 3d-force-graph (three.js). Positions come from the build; nothing simulates in the browser.
// Nodes are meshes with shared geometry and materials per visual group. Edges are one batched LineSegments.
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import * as THREE from 'three';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { COR_DO_GRUPO, GRUPOS, corDe, formaDe, type Forma } from '@lib/ecossistema/camadas';
import type { Modelo } from './dados';
import type { CameraSalva, EcossistemaRenderer, FocoVisual } from './renderer';

const FUNDO = 0x04050b;
const reduzMovimento = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

function geometriaDaForma(forma: Forma): THREE.BufferGeometry {
  switch (forma) {
    case 'esfera':
      return new THREE.SphereGeometry(1, 14, 10);
    case 'cubo':
      return new THREE.BoxGeometry(1.5, 1.5, 1.5);
    case 'octaedro':
      return new THREE.OctahedronGeometry(1.25);
    case 'cone':
      return new THREE.ConeGeometry(1.1, 2.2, 10);
    case 'tetraedro':
      return new THREE.TetrahedronGeometry(1.4);
    case 'anel':
      return new THREE.TorusGeometry(1.2, 0.35, 8, 16);
    case 'dodecaedro':
      return new THREE.DodecahedronGeometry(1.2);
    case 'icosaedro':
      return new THREE.IcosahedronGeometry(1.25, 0);
    case 'cilindro':
      return new THREE.CylinderGeometry(0.9, 0.9, 1.9, 14);
    case 'prisma':
      return new THREE.CylinderGeometry(1.1, 1.1, 1.5, 3);
  }
}

function texturaDeBrilho(cor: string): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d')!;
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, cor + 'ff');
  grad.addColorStop(0.25, cor + '88');
  grad.addColorStop(1, cor + '00');
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function texturaDeRotulo(texto: string, cor: string): { tex: THREE.CanvasTexture; razao: number } {
  const escala = 2;
  const fonte = `600 ${22 * escala}px system-ui, -apple-system, Segoe UI, Roboto, sans-serif`;
  const medida = document.createElement('canvas').getContext('2d')!;
  medida.font = fonte;
  const largura = Math.ceil(medida.measureText(texto).width) + 24 * escala;
  const altura = 36 * escala;
  const c = document.createElement('canvas');
  c.width = largura;
  c.height = altura;
  const g = c.getContext('2d')!;
  g.font = fonte;
  g.fillStyle = 'rgba(6,8,16,0.72)';
  g.beginPath();
  g.roundRect(0, 0, largura, altura, 14 * escala);
  g.fill();
  g.strokeStyle = cor + 'aa';
  g.lineWidth = 2;
  g.stroke();
  g.fillStyle = '#f2f5ff';
  g.textBaseline = 'middle';
  g.fillText(texto, 12 * escala, altura / 2 + 1);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return { tex, razao: largura / altura };
}

export class Renderer3D implements EcossistemaRenderer {
  private host!: HTMLElement;
  private modelo!: Modelo;
  private grafo!: ForceGraph3DInstance;
  private malhas: THREE.Mesh[] = [];
  private escalaBase!: Float32Array;
  private atual!: Float32Array;
  private alvo!: Float32Array;
  private mover = new Set<number>();
  private visivel!: Uint8Array;
  private foco: FocoVisual | null = null;
  private vizinhosFoco = new Set<number>();
  private linhas!: THREE.LineSegments;
  private rotulos = new THREE.Group();
  private brilho!: THREE.Sprite;
  private extras = new THREE.Group();
  private materiais: THREE.Material[] = [];
  private geometrias: THREE.BufferGeometry[] = [];
  private texturas: THREE.Texture[] = [];
  private cores: THREE.Color[] = [];
  private rodando = false;
  private rafId = 0;
  private ultimaInteracao = 0;
  private giroAuto = true;
  private angulo = 0;
  private emFoco = false;
  private cbClicarNo: (i: number) => void = () => {};
  private cbFundo: () => void = () => {};
  private cbPassar: (i: number | null, t: { x: number; y: number }) => void = () => {};
  private ponteiro = { x: 0, y: 0 };
  private onMove = (e: PointerEvent) => {
    const r = this.host.getBoundingClientRect();
    this.ponteiro = { x: e.clientX - r.left, y: e.clientY - r.top };
    this.ultimaInteracao = performance.now();
  };
  private onInteracao = () => {
    this.ultimaInteracao = performance.now();
  };

  async montar(host: HTMLElement, modelo: Modelo): Promise<void> {
    this.host = host;
    this.modelo = modelo;
    const n = modelo.n;
    this.visivel = new Uint8Array(n).fill(1);
    this.atual = new Float32Array(n * 3);
    this.alvo = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      this.atual[i * 3] = this.alvo[i * 3] = modelo.x[i];
      this.atual[i * 3 + 1] = this.alvo[i * 3 + 1] = modelo.y[i];
      this.atual[i * 3 + 2] = this.alvo[i * 3 + 2] = modelo.z[i];
    }
    // One color and one shape per tipo; geometries are shared by shape, materials by tipo.
    this.cores = modelo.tipos.map((t) => new THREE.Color(corDe(t)));
    const porForma = new Map<Forma, THREE.BufferGeometry>();
    const geoms = modelo.tipos.map((t) => {
      const forma = formaDe(t);
      let g = porForma.get(forma);
      if (!g) {
        g = geometriaDaForma(forma);
        porForma.set(forma, g);
        this.geometrias.push(g);
      }
      return g;
    });
    const normais = modelo.tipos.map((_t, k) => new THREE.MeshBasicMaterial({ color: this.cores[k].clone().multiplyScalar(0.95) }));
    const apagados = modelo.tipos.map((_t, k) => new THREE.MeshBasicMaterial({ color: this.cores[k], transparent: true, opacity: 0.05, depthWrite: false }));
    this.materiais.push(...normais, ...apagados);
    this.normais = normais;
    this.apagados = apagados;
    this.escalaBase = new Float32Array(n);
    const nos = new Array<{ id: number; x: number; y: number; z: number; fx: number; fy: number; fz: number }>(n);
    for (let i = 0; i < n; i++) {
      const m = new THREE.Mesh(geoms[modelo.tipoDoNo[i]], normais[modelo.tipoDoNo[i]]);
      const r = 2 + 1.05 * Math.log2(1 + modelo.grau[i]);
      this.escalaBase[i] = r;
      m.scale.setScalar(r);
      m.position.set(modelo.x[i], modelo.y[i], modelo.z[i]);
      this.malhas.push(m);
      nos[i] = { id: i, x: modelo.x[i], y: modelo.y[i], z: modelo.z[i], fx: modelo.x[i], fy: modelo.y[i], fz: modelo.z[i] };
    }
    const grafo = new ForceGraph3D(host, { controlType: 'trackball', rendererConfig: { antialias: true, alpha: false, powerPreference: 'high-performance' } });
    this.grafo = grafo;
    grafo
      .backgroundColor('#04050b')
      .showNavInfo(false)
      .enableNodeDrag(false)
      .nodeLabel(() => '')
      .linkVisibility(false)
      .cooldownTicks(0)
      .warmupTicks(0)
      .nodeThreeObject((nd: object) => this.malhas[(nd as { id: number }).id])
      .nodeThreeObjectExtend(false)
      .graphData({ nodes: nos, links: [] })
      .onNodeClick((nd: object | null) => {
        if (nd) this.cbClicarNo((nd as { id: number }).id);
      })
      .onBackgroundClick(() => this.cbFundo())
      .onNodeHover((nd: object | null) => this.cbPassar(nd ? (nd as { id: number }).id : null, this.ponteiro));
    const cena = grafo.scene();
    cena.fog = new THREE.FogExp2(FUNDO, 0.00042);
    this.montarCenario(cena);
    this.montarArestas(cena);
    cena.add(this.rotulos, this.extras);
    this.brilho = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.guardar(texturaDeBrilho('#ffffff')), color: 0xffffff, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true }));
    this.materiais.push(this.brilho.material);
    this.brilho.visible = false;
    cena.add(this.brilho);
    // Bloom gives the nodes and edges a soft glow. It reads the bright colors of the Okabe-Ito palette.
    const composer = grafo.postProcessingComposer();
    const bloom = new UnrealBloomPass(new THREE.Vector2(host.clientWidth, host.clientHeight), 0.38, 0.5, 0.62);
    composer.addPass(bloom);
    grafo.width(host.clientWidth).height(host.clientHeight);
    this.redimensionar = () => grafo.width(host.clientWidth).height(host.clientHeight);
    this.observador = new ResizeObserver(() => this.redimensionar());
    this.observador.observe(host);
    host.addEventListener('pointermove', this.onMove);
    host.addEventListener('pointerdown', this.onInteracao);
    host.addEventListener('wheel', this.onInteracao, { passive: true });
    this.enquadrar('tudo', { animar: false });
    this.reconstruirArestas();
    this.ultimaInteracao = performance.now();
    this.rodando = true;
    this.laco(performance.now());
  }

  private normais!: THREE.MeshBasicMaterial[];
  private apagados!: THREE.MeshBasicMaterial[];
  private redimensionar: () => void = () => {};
  private observador?: ResizeObserver;

  private guardar<T extends THREE.Texture>(t: T): T {
    this.texturas.push(t);
    return t;
  }

  /** Stars and soft area nebulas: depth and atmosphere without any extra data. */
  private montarCenario(cena: THREE.Scene): void {
    const estrelas = 1800;
    const pos = new Float32Array(estrelas * 3);
    let s = 7;
    const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
    for (let k = 0; k < estrelas; k++) {
      const r = 1500 + rnd() * 2200;
      const th = rnd() * Math.PI * 2;
      const ph = Math.acos(2 * rnd() - 1);
      pos[k * 3] = r * Math.sin(ph) * Math.cos(th);
      pos[k * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      pos[k * 3 + 2] = r * Math.cos(ph);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    this.geometrias.push(g);
    const m = new THREE.PointsMaterial({ color: 0x9fb4ff, size: 2.2, sizeAttenuation: false, transparent: true, opacity: 0.55, depthWrite: false, fog: false });
    this.materiais.push(m);
    cena.add(new THREE.Points(g, m));
    // One soft glow per visual group, placed at the centroid of its nodes.
    const soma = GRUPOS.map(() => [0, 0, 0, 0]);
    for (let i = 0; i < this.modelo.n; i++) {
      if (this.modelo.hubDoNo[i]) continue;
      const k = this.modelo.grupoDoNo[i];
      soma[k][0] += this.modelo.x[i];
      soma[k][1] += this.modelo.y[i];
      soma[k][2] += this.modelo.z[i];
      soma[k][3]++;
    }
    GRUPOS.forEach((grupo, k) => {
      if (!soma[k][3] || grupo === 'hubs') return;
      const mat = new THREE.SpriteMaterial({ map: this.guardar(texturaDeBrilho(COR_DO_GRUPO[grupo])), opacity: 0.07, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, fog: false });
      this.materiais.push(mat);
      const sp = new THREE.Sprite(mat);
      sp.position.set(soma[k][0] / soma[k][3], soma[k][1] / soma[k][3], soma[k][2] / soma[k][3]);
      sp.scale.setScalar(980);
      cena.add(sp);
    });
  }

  private montarArestas(cena: THREE.Scene): void {
    const g = new THREE.BufferGeometry();
    const m = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, fog: true });
    this.geometrias.push(g);
    this.materiais.push(m);
    this.linhas = new THREE.LineSegments(g, m);
    this.linhas.frustumCulled = false;
    cena.add(this.linhas);
  }

  /** Rebuilds the batched edge buffers from the visibility mask, the current positions and the focus state. */
  private reconstruirArestas(): void {
    const { pares, forte } = this.modelo;
    const total = forte.length;
    const pos: number[] = [];
    const cor: number[] = [];
    const foco = this.foco;
    const a0 = this.cores;
    for (let k = 0; k < total; k++) {
      const a = pares[k * 2];
      const b = pares[k * 2 + 1];
      if (!this.visivel[a] || !this.visivel[b]) continue;
      let f = forte[k] ? 0.15 : 0.05;
      if (foco) {
        const tocaFoco = a === foco.no || b === foco.no;
        const entreViz = this.vizinhosFoco.has(a) && this.vizinhosFoco.has(b);
        f = tocaFoco ? 0.85 : entreViz ? 0.22 : 0.012;
        if (!tocaFoco && !entreViz && !(this.vizinhosFoco.has(a) || this.vizinhosFoco.has(b))) f = 0.008;
      }
      pos.push(this.atual[a * 3], this.atual[a * 3 + 1], this.atual[a * 3 + 2], this.atual[b * 3], this.atual[b * 3 + 1], this.atual[b * 3 + 2]);
      const ca = a0[this.modelo.tipoDoNo[a]];
      const cb = a0[this.modelo.tipoDoNo[b]];
      cor.push(ca.r * f, ca.g * f, ca.b * f, cb.r * f, cb.g * f, cb.b * f);
    }
    const g = this.linhas.geometry;
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pos), 3));
    g.setAttribute('color', new THREE.BufferAttribute(new Float32Array(cor), 3));
    g.computeBoundingSphere();
  }

  definirVisiveis(visivel: Uint8Array): void {
    this.visivel = visivel;
    for (let i = 0; i < this.modelo.n; i++) this.malhas[i].visible = visivel[i] === 1;
    this.reconstruirArestas();
  }

  focar(foco: FocoVisual | null, opcoes: { animar: boolean }): void {
    const n = this.modelo.n;
    this.foco = foco;
    this.emFoco = foco !== null;
    this.vizinhosFoco = new Set(foco ? foco.vizinhos.map((v) => v.i) : []);
    this.rotulos.clear();
    this.mover.clear();
    for (let i = 0; i < n; i++) {
      this.alvo[i * 3] = this.modelo.x[i];
      this.alvo[i * 3 + 1] = this.modelo.y[i];
      this.alvo[i * 3 + 2] = this.modelo.z[i];
    }
    if (foco) {
      for (const v of foco.vizinhos) {
        this.alvo[v.i * 3] = v.pos[0];
        this.alvo[v.i * 3 + 1] = v.pos[1];
        this.alvo[v.i * 3 + 2] = v.pos[2];
      }
    }
    for (let i = 0; i < n; i++) {
      const g = this.modelo.tipoDoNo[i];
      const m = this.malhas[i];
      const ativo = !foco || i === foco.no || this.vizinhosFoco.has(i);
      m.material = ativo ? this.normais[g] : this.apagados[g];
      m.scale.setScalar(this.escalaBase[i] * (foco && i === foco.no ? 2.3 : foco && this.vizinhosFoco.has(i) ? 1.1 : foco ? 0.55 : 1));
      m.renderOrder = ativo ? 2 : 0;
      if (this.atual[i * 3] !== this.alvo[i * 3] || this.atual[i * 3 + 1] !== this.alvo[i * 3 + 1] || this.atual[i * 3 + 2] !== this.alvo[i * 3 + 2]) this.mover.add(i);
    }
    if (!opcoes.animar || reduzMovimento()) {
      for (const i of this.mover) this.escrever(i, 1);
      this.mover.clear();
    }
    if (foco) {
      (this.brilho.material as THREE.SpriteMaterial).color.copy(this.cores[this.modelo.tipoDoNo[foco.no]]);
      (this.brilho.material as THREE.SpriteMaterial).opacity = 0.55;
      this.brilho.scale.setScalar(this.escalaBase[foco.no] * 9);
      this.brilho.position.set(this.alvo[foco.no * 3], this.alvo[foco.no * 3 + 1], this.alvo[foco.no * 3 + 2]);
      this.brilho.visible = true;
      for (const i of [foco.no, ...foco.rotulados]) this.adicionarRotulo(i);
    } else {
      this.brilho.visible = false;
    }
    this.reconstruirArestas();
  }

  private adicionarRotulo(i: number): void {
    const cor = corDe(this.modelo.tipos[this.modelo.tipoDoNo[i]]);
    const { tex, razao } = texturaDeRotulo(this.modelo.nomes[i], cor);
    this.texturas.push(tex);
    const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, depthTest: false, fog: false });
    this.materiais.push(mat);
    const sp = new THREE.Sprite(mat);
    const altura = i === this.foco?.no ? 11 : 6.5;
    sp.scale.set(altura * razao, altura, 1);
    sp.renderOrder = 10;
    sp.userData.i = i;
    sp.position.set(this.alvo[i * 3], this.alvo[i * 3 + 1] + this.escalaBase[i] * 2.4 + altura * 0.7, this.alvo[i * 3 + 2]);
    this.rotulos.add(sp);
  }

  /** Moves a node a fraction `t` of the way to its target and syncs its mesh. */
  private escrever(i: number, t: number): boolean {
    let chegou = true;
    for (let e = 0; e < 3; e++) {
      const d = this.alvo[i * 3 + e] - this.atual[i * 3 + e];
      if (Math.abs(d) > 0.05 && t < 1) {
        this.atual[i * 3 + e] += d * t;
        chegou = false;
      } else this.atual[i * 3 + e] = this.alvo[i * 3 + e];
    }
    this.malhas[i].position.set(this.atual[i * 3], this.atual[i * 3 + 1], this.atual[i * 3 + 2]);
    const nd = (this.grafo.graphData().nodes as Array<{ x: number; y: number; z: number }>)[i];
    if (nd) {
      nd.x = this.atual[i * 3];
      nd.y = this.atual[i * 3 + 1];
      nd.z = this.atual[i * 3 + 2];
    }
    return chegou;
  }

  enquadrar(alvo: 'tudo' | number, opcoes: { animar: boolean }): void {
    const ms = opcoes.animar && !reduzMovimento() ? 1000 : 0;
    if (alvo === 'tudo') {
      this.grafo.cameraPosition({ x: 120, y: 260, z: 1500 }, { x: 0, y: 0, z: 0 }, ms);
      return;
    }
    const cx = this.alvo[alvo * 3];
    const cy = this.alvo[alvo * 3 + 1];
    const cz = this.alvo[alvo * 3 + 2];
    const raio = Math.max(90, this.foco ? this.distanciaMaximaFoco() : 120);
    const dist = raio * 3.7;
    // Approach from the current side of the camera so the move feels continuous.
    const c = this.grafo.camera().position;
    const dx = c.x - cx;
    const dy = c.y - cy;
    const dz = c.z - cz;
    const len = Math.hypot(dx, dy, dz) || 1;
    this.grafo.cameraPosition({ x: cx + (dx / len) * dist, y: cy + (dy / len) * dist * 0.8 + raio * 0.35, z: cz + (dz / len) * dist }, { x: cx, y: cy, z: cz }, ms);
  }

  private distanciaMaximaFoco(): number {
    if (!this.foco) return 120;
    const [cx, cy, cz] = [this.alvo[this.foco.no * 3], this.alvo[this.foco.no * 3 + 1], this.alvo[this.foco.no * 3 + 2]];
    let m = 0;
    for (const v of this.foco.vizinhos) m = Math.max(m, Math.hypot(v.pos[0] - cx, v.pos[1] - cy, v.pos[2] - cz));
    return m;
  }

  aoClicarNo(cb: (i: number) => void): void {
    this.cbClicarNo = cb;
  }
  aoClicarFundo(cb: () => void): void {
    this.cbFundo = cb;
  }
  aoPassarNo(cb: (i: number | null, tela: { x: number; y: number }) => void): void {
    this.cbPassar = cb;
  }

  lerCamera(): CameraSalva {
    const p = this.grafo.camera().position;
    const t = (this.grafo.controls() as unknown as { target: THREE.Vector3 }).target;
    return { pos: [p.x, p.y, p.z], alvo: [t.x, t.y, t.z] };
  }
  restaurarCamera(c: CameraSalva): void {
    this.grafo.cameraPosition({ x: c.pos[0], y: c.pos[1], z: c.pos[2] }, { x: c.alvo[0], y: c.alvo[1], z: c.alvo[2] }, 0);
  }
  definirRotacaoAutomatica(ligada: boolean): void {
    this.giroAuto = ligada;
  }

  private laco = (agora: number): void => {
    if (!this.rodando) return;
    this.rafId = requestAnimationFrame(this.laco);
    if (this.mover.size) {
      let todos = true;
      for (const i of this.mover) {
        if (this.escrever(i, 0.14)) this.mover.delete(i);
        else todos = false;
      }
      this.reconstruirArestas();
      if (todos) this.mover.clear();
    }
    // Slow orbit while idle and out of focus. Never with reduced motion.
    if (this.giroAuto && !this.emFoco && !reduzMovimento() && agora - this.ultimaInteracao > 5000 && !document.hidden) {
      const cam = this.grafo.camera().position;
      const r = Math.hypot(cam.x, cam.z);
      this.angulo = Math.atan2(cam.z, cam.x) + 0.0014;
      this.grafo.cameraPosition({ x: Math.cos(this.angulo) * r, y: cam.y, z: Math.sin(this.angulo) * r }, { x: 0, y: 0, z: 0 }, 0);
    }
    if (this.emFoco && this.brilho.visible) {
      const pulso = 1 + 0.06 * Math.sin(agora / 420);
      this.brilho.scale.setScalar(this.escalaBase[this.foco!.no] * 9 * pulso);
    }
  };

  destruir(): void {
    this.rodando = false;
    cancelAnimationFrame(this.rafId);
    this.observador?.disconnect();
    this.host.removeEventListener('pointermove', this.onMove);
    this.host.removeEventListener('pointerdown', this.onInteracao);
    this.host.removeEventListener('wheel', this.onInteracao);
    for (const g of this.geometrias) g.dispose();
    for (const m of this.materiais) m.dispose();
    for (const t of this.texturas) t.dispose();
    this.rotulos.clear();
    this.grafo._destructor();
    this.host.replaceChildren();
  }
}
