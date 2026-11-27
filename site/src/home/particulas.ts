// SPDX-License-Identifier: MIT
// One Points object whose particles morph between four scene layouts, entirely in the vertex shader (one draw call).
import * as THREE from 'three';
import type { Layout } from '@lib/home/layouts';

const VERT = `
attribute vec4 aP0; attribute vec4 aP1; attribute vec4 aP2; attribute vec4 aP3;
attribute vec3 aC0; attribute vec3 aC1; attribute vec3 aC2; attribute vec3 aC3;
attribute float aSeed;
uniform float uSeg; uniform float uMix; uniform float uTime; uniform float uPx; uniform vec2 uPointer; uniform float uPointerForce;
varying vec3 vCol; varying float vAlpha;
vec4 pickP(float i){ return i < 0.5 ? aP0 : (i < 1.5 ? aP1 : (i < 2.5 ? aP2 : aP3)); }
vec3 pickC(float i){ return i < 0.5 ? aC0 : (i < 1.5 ? aC1 : (i < 2.5 ? aC2 : aC3)); }
void main(){
  float next = min(uSeg + 1.0, 3.0);
  vec4 a = pickP(uSeg); vec4 b = pickP(next);
  // Each particle leaves a little earlier or later, so the morph flows instead of moving as a block.
  float m = smoothstep(0.0, 1.0, clamp(uMix * 1.5 - aSeed * 0.5, 0.0, 1.0));
  vec3 pos = mix(a.xyz, b.xyz, m);
  float swirl = m * (1.0 - m) * 4.0;
  pos += vec3(sin(aSeed * 40.0 + uTime * 0.7), cos(aSeed * 31.0 + uTime * 0.6), sin(aSeed * 27.0 + uTime * 0.5)) * (0.07 + 0.9 * swirl);
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  // The pointer pushes nearby particles a little, like a magnet with a soft edge.
  vec4 clip = projectionMatrix * mv;
  vec2 ndc = clip.xy / clip.w;
  vec2 dp = ndc - uPointer;
  float f = exp(-dot(dp, dp) * 28.0) * uPointerForce;
  mv.xy += normalize(dp + 1e-4) * f * 0.55;
  gl_Position = projectionMatrix * mv;
  float size = mix(a.w, b.w, m);
  gl_PointSize = size * uPx * (240.0 / -mv.z) * (1.0 + f * 0.8);
  vCol = mix(pickC(uSeg), pickC(next), m) * (1.0 + f * 0.6);
  vAlpha = 0.55 + 0.45 * smoothstep(0.0, 1.0, size / 2.5);
}`;
const FRAG = `
precision mediump float;
varying vec3 vCol; varying float vAlpha;
void main(){
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.05, d);
  gl_FragColor = vec4(vCol, a * vAlpha);
}`;

export interface Particulas {
  pontos: THREE.Points;
  definirLayout(indice: 0 | 1 | 2 | 3, l: Layout): void;
  definirMorph(de: number, mistura: number): void;
  definirPonteiro(x: number, y: number, forca: number): void;
  atualizar(tempo: number): void;
  destruir(): void;
}

export function criarParticulas(n: number, pixelRatio: number): Particulas {
  const geo = new THREE.BufferGeometry();
  const vazios = () => new Float32Array(n * 4);
  const cores = () => new Float32Array(n * 3);
  const semente = new Float32Array(n);
  for (let i = 0; i < n; i++) semente[i] = ((i * 2654435761) >>> 0) / 4294967295;
  geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(n * 3), 3));
  geo.setAttribute('aSeed', new THREE.BufferAttribute(semente, 1));
  for (let k = 0; k < 4; k++) {
    geo.setAttribute(`aP${k}`, new THREE.BufferAttribute(vazios(), 4));
    geo.setAttribute(`aC${k}`, new THREE.BufferAttribute(cores(), 3));
  }
  const mat = new THREE.ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: FRAG,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: { uSeg: { value: 0 }, uMix: { value: 0 }, uTime: { value: 0 }, uPx: { value: pixelRatio }, uPointer: { value: new THREE.Vector2(9, 9) }, uPointerForce: { value: 0 } },
  });
  const pontos = new THREE.Points(geo, mat);
  pontos.frustumCulled = false;
  return {
    pontos,
    definirLayout(i, l) {
      const p = geo.getAttribute(`aP${i}`) as THREE.BufferAttribute;
      const c = geo.getAttribute(`aC${i}`) as THREE.BufferAttribute;
      (p.array as Float32Array).set(l.posicoes.subarray(0, n * 4));
      (c.array as Float32Array).set(l.cores.subarray(0, n * 3));
      p.needsUpdate = true;
      c.needsUpdate = true;
    },
    definirMorph(de, mistura) {
      mat.uniforms.uSeg.value = Math.min(de, 3);
      mat.uniforms.uMix.value = mistura;
    },
    definirPonteiro(x, y, forca) {
      mat.uniforms.uPointer.value.set(x, y);
      mat.uniforms.uPointerForce.value = forca;
    },
    atualizar(tempo) {
      mat.uniforms.uTime.value = tempo;
    },
    destruir() {
      geo.dispose();
      mat.dispose();
    },
  };
}
