// SPDX-License-Identifier: MIT
// Technology backdrop of the Home: printed-circuit traces with chips and vias, server racks with blinking LEDs, and data
// packets that travel along the traces. Everything is generated from a fixed seed, so the board is the same on every visit.
import * as THREE from 'three';
import { semeada } from '@lib/home/layouts';

interface Trilha {
  pontos: Array<[number, number]>;
  acumulado: number[];
  comprimento: number;
}

const DIRECOES: Array<[number, number]> = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];
const LARGURA = 58;
const ALTURA = 32;

const VERT_PONTOS = `
attribute float aSize; attribute float aAlpha; varying float vAlpha;
void main(){ vAlpha = aAlpha; vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * mv; gl_PointSize = aSize * (260.0 / -mv.z); }`;
const FRAG_PONTOS = `
precision mediump float; uniform vec3 uCor; varying float vAlpha;
void main(){ vec2 p = gl_PointCoord - 0.5; float d = max(abs(p.x), abs(p.y)); float a = smoothstep(0.5, 0.3, d); gl_FragColor = vec4(uCor, a * vAlpha); }`;

export interface Circuito {
  grupo: THREE.Group;
  atualizar(tempo: number, dt: number, camX: number, camY: number): void;
  destruir(): void;
}

export function criarCircuito(trilhasMax: number, pulsosMax: number): Circuito {
  const r = semeada(1337);
  const grupo = new THREE.Group();
  const linhas: number[] = [];
  const trilhas: Trilha[] = [];
  const vias: Array<[number, number]> = [];
  const segmento = (a: [number, number], b: [number, number]) => linhas.push(a[0], a[1], 0, b[0], b[1], 0);

  // Chips: a body, an inner die and pins on the four sides. Traces leave from the pins.
  const chips: Array<{ x: number; y: number; w: number; h: number }> = [];
  const nChips = Math.max(6, Math.round(trilhasMax / 8));
  for (let i = 0; i < nChips; i++) {
    const w = 2.4 + Math.floor(r() * 4) * 0.6;
    const h = 1.8 + Math.floor(r() * 3) * 0.6;
    const x = Math.round((r() - 0.5) * (LARGURA - 8));
    const y = Math.round((r() - 0.5) * (ALTURA - 6));
    chips.push({ x, y, w, h });
    const x0 = x - w / 2, x1 = x + w / 2, y0 = y - h / 2, y1 = y + h / 2;
    segmento([x0, y0], [x1, y0]); segmento([x1, y0], [x1, y1]); segmento([x1, y1], [x0, y1]); segmento([x0, y1], [x0, y0]);
    const m = 0.45;
    segmento([x0 + m, y0 + m], [x1 - m, y0 + m]); segmento([x1 - m, y0 + m], [x1 - m, y1 - m]); segmento([x1 - m, y1 - m], [x0 + m, y1 - m]); segmento([x0 + m, y1 - m], [x0 + m, y0 + m]);
    for (let px = x0 + 0.5; px < x1; px += 0.6) { segmento([px, y0], [px, y0 - 0.35]); segmento([px, y1], [px, y1 + 0.35]); }
    for (let py = y0 + 0.5; py < y1; py += 0.6) { segmento([x0, py], [x0 - 0.35, py]); segmento([x1, py], [x1 + 0.35, py]); }
  }

  const grade = (v: number) => Math.round(v * 2) / 2;
  const dentro = (p: [number, number]) => Math.abs(p[0]) <= LARGURA / 2 && Math.abs(p[1]) <= ALTURA / 2;
  function gerarTrilha(inicio: [number, number], dir0: number): void {
    const pts: Array<[number, number]> = [[grade(inicio[0]), grade(inicio[1])]];
    let dir = dir0;
    const passos = 3 + Math.floor(r() * 5);
    for (let s = 0; s < passos; s++) {
      const [dx, dy] = DIRECOES[dir];
      const len = (2 + Math.floor(r() * 7)) * 0.5 * (dx !== 0 && dy !== 0 ? 1.4 : 1);
      const ult = pts[pts.length - 1];
      const novo: [number, number] = [grade(ult[0] + dx * len), grade(ult[1] + dy * len)];
      if (!dentro(novo)) break;
      pts.push(novo);
      // Turns of 45 or 90 degrees, like routed copper.
      dir = (dir + (r() < 0.5 ? 1 : 7) * (r() < 0.6 ? 1 : 2)) % 8;
    }
    if (pts.length < 2) return;
    let acumulado = 0;
    const ac = [0];
    for (let i = 1; i < pts.length; i++) {
      segmento(pts[i - 1], pts[i]);
      acumulado += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
      ac.push(acumulado);
    }
    vias.push(pts[pts.length - 1]);
    trilhas.push({ pontos: pts, acumulado: ac, comprimento: acumulado });
  }
  for (const c of chips) {
    const saidas = 4 + Math.floor(r() * 3);
    for (let k = 0; k < saidas && trilhas.length < trilhasMax; k++) {
      const lado = Math.floor(r() * 4);
      const px = lado === 0 ? c.x - c.w / 2 : lado === 1 ? c.x + c.w / 2 : c.x + (r() - 0.5) * c.w;
      const py = lado === 2 ? c.y - c.h / 2 : lado === 3 ? c.y + c.h / 2 : c.y + (r() - 0.5) * c.h;
      gerarTrilha([px, py], [4, 0, 6, 2][lado]);
    }
  }
  while (trilhas.length < trilhasMax) gerarTrilha([(r() - 0.5) * LARGURA, (r() - 0.5) * ALTURA], Math.floor(r() * 8) * 1);

  // Server racks at the sides: stacked units with LEDs.
  const leds: Array<[number, number]> = [];
  [[-24, -3], [-20.5, 4], [23, 2], [19.5, -5]].forEach(([x, y]) => {
    const w = 2.6, unidades = 9;
    for (let u = 0; u < unidades; u++) {
      const yy = y + u * 0.62;
      segmento([x - w / 2, yy], [x + w / 2, yy]);
      leds.push([x - w / 2 + 0.35, yy + 0.31]);
    }
    segmento([x - w / 2, y], [x - w / 2, y + unidades * 0.62]);
    segmento([x + w / 2, y], [x + w / 2, y + unidades * 0.62]);
    segmento([x - w / 2, y + unidades * 0.62], [x + w / 2, y + unidades * 0.62]);
  });

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linhas), 3));
  const matLinhas = new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.2, blending: THREE.AdditiveBlending, depthWrite: false });
  const placa = new THREE.LineSegments(geo, matLinhas);
  placa.frustumCulled = false;
  placa.position.z = -9;
  grupo.add(placa);
  // A second, farther board gives depth through parallax.
  const longe = new THREE.LineSegments(geo, new THREE.LineBasicMaterial({ color: 0x6d5bd0, transparent: true, opacity: 0.1, blending: THREE.AdditiveBlending, depthWrite: false }));
  longe.frustumCulled = false;
  longe.position.set(6, 3, -17);
  longe.scale.setScalar(1.7);
  grupo.add(longe);

  // Vias and LEDs: square points.
  const nPts = vias.length + leds.length;
  const posPts = new Float32Array(nPts * 3);
  const tamPts = new Float32Array(nPts);
  const alfaPts = new Float32Array(nPts);
  vias.forEach((v, i) => { posPts.set([v[0], v[1], 0], i * 3); tamPts[i] = 0.55; alfaPts[i] = 0.6; });
  leds.forEach((v, i) => { const k = vias.length + i; posPts.set([v[0], v[1], 0], k * 3); tamPts[k] = 0.42; alfaPts[k] = 0.9; });
  const geoPts = new THREE.BufferGeometry();
  geoPts.setAttribute('position', new THREE.BufferAttribute(posPts, 3));
  geoPts.setAttribute('aSize', new THREE.BufferAttribute(tamPts, 1));
  geoPts.setAttribute('aAlpha', new THREE.BufferAttribute(alfaPts, 1));
  const matPts = new THREE.ShaderMaterial({ vertexShader: VERT_PONTOS, fragmentShader: FRAG_PONTOS, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, uniforms: { uCor: { value: new THREE.Color(0x79c0ff) } } });
  const pontos = new THREE.Points(geoPts, matPts);
  pontos.frustumCulled = false;
  pontos.position.z = -9;
  grupo.add(pontos);

  // Data packets: a short train of bright squares that runs along a trace.
  const TREM = 4;
  const nPulsos = Math.min(pulsosMax, trilhas.length * 2);
  const pulsos = Array.from({ length: nPulsos }, (_, i) => ({ trilha: i % trilhas.length, s: r() * trilhas[i % trilhas.length].comprimento, v: 2.2 + r() * 4.2 }));
  const posP = new Float32Array(nPulsos * TREM * 3);
  const tamP = new Float32Array(nPulsos * TREM);
  const alfP = new Float32Array(nPulsos * TREM);
  for (let i = 0; i < nPulsos; i++) for (let k = 0; k < TREM; k++) { tamP[i * TREM + k] = 0.7 - k * 0.14; alfP[i * TREM + k] = 1 - k * 0.27; }
  const geoP = new THREE.BufferGeometry();
  geoP.setAttribute('position', new THREE.BufferAttribute(posP, 3));
  geoP.setAttribute('aSize', new THREE.BufferAttribute(tamP, 1));
  geoP.setAttribute('aAlpha', new THREE.BufferAttribute(alfP, 1));
  const matP = new THREE.ShaderMaterial({ vertexShader: VERT_PONTOS, fragmentShader: FRAG_PONTOS, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, uniforms: { uCor: { value: new THREE.Color(0xbfe6ff) } } });
  const pacotes = new THREE.Points(geoP, matP);
  pacotes.frustumCulled = false;
  pacotes.position.z = -8.9;
  grupo.add(pacotes);

  function posicaoNaTrilha(t: Trilha, s: number): [number, number] {
    const d = Math.min(Math.max(s, 0), t.comprimento);
    let i = 1;
    while (i < t.acumulado.length - 1 && t.acumulado[i] < d) i++;
    const seg = t.acumulado[i] - t.acumulado[i - 1] || 1;
    const u = (d - t.acumulado[i - 1]) / seg;
    return [t.pontos[i - 1][0] + (t.pontos[i][0] - t.pontos[i - 1][0]) * u, t.pontos[i - 1][1] + (t.pontos[i][1] - t.pontos[i - 1][1]) * u];
  }

  return {
    grupo,
    atualizar(tempo, dt, camX, camY) {
      const atrib = geoP.getAttribute('position') as THREE.BufferAttribute;
      for (let i = 0; i < nPulsos; i++) {
        const p = pulsos[i];
        const t = trilhas[p.trilha];
        p.s += p.v * dt;
        if (p.s > t.comprimento + 3) {
          p.s = -r() * 4;
          p.trilha = Math.floor(r() * trilhas.length);
        }
        for (let k = 0; k < TREM; k++) {
          const pos = posicaoNaTrilha(trilhas[p.trilha], p.s - k * 0.45);
          posP[(i * TREM + k) * 3] = pos[0];
          posP[(i * TREM + k) * 3 + 1] = pos[1];
        }
      }
      atrib.needsUpdate = true;
      // LEDs blink; the board drifts against the camera for parallax.
      const alfa = geoPts.getAttribute('aAlpha') as THREE.BufferAttribute;
      for (let i = 0; i < leds.length; i++) alfa.setX(vias.length + i, Math.sin(tempo * 3 + i * 1.7) > 0.2 ? 0.95 : 0.15);
      alfa.needsUpdate = true;
      grupo.position.set(-camX * 0.9, -camY * 0.9, 0);
    },
    destruir() {
      geo.dispose();
      geoPts.dispose();
      geoP.dispose();
      matLinhas.dispose();
      (longe.material as THREE.Material).dispose();
      matPts.dispose();
      matP.dispose();
    },
  };
}
