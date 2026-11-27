// SPDX-License-Identifier: MIT
// Floating code symbols and language names (one atlas texture, one instanced draw call), drifting in the depth of the stage.
import * as THREE from 'three';
import { semeada } from '@lib/home/layouts';

const TEXTOS = ['{ }', '</>', '01', '=>', 'fn()', 'git push', 'SELECT *', 'λ', '&&', '::', '0xFF', 'Python', 'TypeScript', 'Go', 'Rust', 'Java', 'C++', 'SQL', 'YAML', 'Docker', 'K8s', 'HTTP', 'JSON', 'async', '#!/bin/sh', 'npm i', 'docker run', 'TCP', 'sudo', 'null', 'if (ok)', '[ ]'];
const COLUNAS = 6;
const LINHAS = Math.ceil(TEXTOS.length / COLUNAS);
const CEL_W = 256;
const CEL_H = 72;

const VERT = `
attribute vec3 iPos; attribute vec4 iUv; attribute vec2 iEscala; attribute float iSeed; attribute vec3 iCor;
uniform float uTime; varying vec2 vUv; varying vec3 vCor; varying float vAlfa;
void main(){
  vec3 p = iPos;
  p.y += sin(uTime * 0.25 + iSeed * 20.0) * 0.5;
  p.x += cos(uTime * 0.18 + iSeed * 13.0) * 0.4;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  mv.xy += position.xy * iEscala;
  gl_Position = projectionMatrix * mv;
  vUv = iUv.xy + uv * iUv.zw;
  vCor = iCor;
  vAlfa = 0.2 + 0.2 * (0.5 + 0.5 * sin(uTime * 0.7 + iSeed * 40.0));
}`;
const FRAG = `
precision mediump float; uniform sampler2D uMapa; varying vec2 vUv; varying vec3 vCor; varying float vAlfa;
void main(){ float a = texture2D(uMapa, vUv).a; gl_FragColor = vec4(vCor, a * vAlfa); }`;

export interface Glifos {
  malha: THREE.Mesh;
  atualizar(tempo: number): void;
  destruir(): void;
}

export function criarGlifos(quantidade: number): Glifos {
  const c = document.createElement('canvas');
  c.width = COLUNAS * CEL_W;
  c.height = LINHAS * CEL_H;
  const g = c.getContext('2d')!;
  g.font = '700 38px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillStyle = '#fff';
  TEXTOS.forEach((t, i) => g.fillText(t, (i % COLUNAS) * CEL_W + CEL_W / 2, Math.floor(i / COLUNAS) * CEL_H + CEL_H / 2));
  const mapa = new THREE.CanvasTexture(c);
  mapa.colorSpace = THREE.SRGBColorSpace;

  const r = semeada(2024);
  const base = new THREE.PlaneGeometry(1, 1);
  const geo = new THREE.InstancedBufferGeometry();
  geo.index = base.index;
  geo.setAttribute('position', base.getAttribute('position'));
  geo.setAttribute('uv', base.getAttribute('uv'));
  const n = Math.min(quantidade, TEXTOS.length);
  const pos = new Float32Array(n * 3), uv = new Float32Array(n * 4), esc = new Float32Array(n * 2), semente = new Float32Array(n), cor = new Float32Array(n * 3);
  const paleta = [[0.47, 0.75, 1], [0.6, 0.55, 0.95], [0.4, 0.9, 0.8], [0.9, 0.7, 0.4]];
  for (let i = 0; i < n; i++) {
    const t = i % TEXTOS.length;
    const col = t % COLUNAS;
    const lin = Math.floor(t / COLUNAS);
    uv.set([col / COLUNAS, 1 - (lin + 1) / LINHAS, 1 / COLUNAS, 1 / LINHAS], i * 4);
    pos.set([(r() - 0.5) * 40, (r() - 0.5) * 18, -4 - r() * 11], i * 3);
    const tamanho = 0.9 + r() * 1.1;
    esc.set([tamanho * 3.5, tamanho * 1.0], i * 2);
    semente[i] = r();
    cor.set(paleta[Math.floor(r() * paleta.length)], i * 3);
  }
  geo.setAttribute('iPos', new THREE.InstancedBufferAttribute(pos, 3));
  geo.setAttribute('iUv', new THREE.InstancedBufferAttribute(uv, 4));
  geo.setAttribute('iEscala', new THREE.InstancedBufferAttribute(esc, 2));
  geo.setAttribute('iSeed', new THREE.InstancedBufferAttribute(semente, 1));
  geo.setAttribute('iCor', new THREE.InstancedBufferAttribute(cor, 3));
  geo.instanceCount = n;
  const mat = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, uniforms: { uMapa: { value: mapa }, uTime: { value: 0 } } });
  const malha = new THREE.Mesh(geo, mat);
  malha.frustumCulled = false;
  return {
    malha,
    atualizar(tempo) {
      mat.uniforms.uTime.value = tempo;
    },
    destruir() {
      geo.dispose();
      base.dispose();
      mat.dispose();
      mapa.dispose();
    },
  };
}
