// SPDX-License-Identifier: MIT
// Home title in WebGL: the text is drawn to a canvas, then a fragment shader bends it with water ripples and a magnetic pull
// that follow the pointer. The real <h1> text stays in the DOM (selectable, read by screen readers); without WebGL or with
// reduced motion nothing here runs and the plain gradient text shows.

const VERT = `attribute vec2 aPos; varying vec2 vUv; void main(){ vUv = aPos*0.5+0.5; gl_Position = vec4(aPos,0.0,1.0); }`;
const FRAG = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uTex;
uniform float uAspect, uTime, uPower;
uniform vec2 uMouse, uVel;
uniform vec3 uRip[8];
uniform vec3 uAccent;
float height(vec2 p){
  float h = 0.0;
  for (int i = 0; i < 8; i++) {
    vec3 r = uRip[i];
    if (r.z < 0.0) continue;
    float age = uTime - r.z;
    float d = distance(p, vec2(r.x * uAspect, r.y));
    float front = age * 0.5;
    float env = exp(-age * 1.5) * exp(-pow((d - front) * 6.0, 2.0));
    h += sin((d - front) * 34.0) * env * 0.7;
  }
  h += 0.05 * sin(p.x * 9.0 + uTime * 1.2) * sin(p.y * 7.0 - uTime * 1.0);
  return h;
}
void main(){
  vec2 uv = vUv;
  vec2 p = vec2(uv.x * uAspect, uv.y);
  float e = 0.004;
  float h = height(p);
  vec2 g = vec2(height(p + vec2(e, 0.0)) - h, height(p + vec2(0.0, e)) - h) / e;
  vec2 m = vec2(uMouse.x * uAspect, uMouse.y);
  vec2 dm = p - m;
  float dist = length(dm);
  float fall = exp(-dist * dist * 55.0) * uPower;
  vec2 pull = -normalize(dm + 1e-5) * fall * 0.075;
  vec2 disp = g * 0.0011 + vec2(pull.x / uAspect, pull.y) * 0.8 + uVel * fall * 0.1;
  float len = length(disp);
  if (len > 0.045) disp *= 0.045 / len;
  float k = 0.05 + min(length(disp) * 5.0, 0.18);
  vec4 a = texture2D(uTex, uv + disp * (1.0 + k));
  vec4 b = texture2D(uTex, uv + disp);
  vec4 c = texture2D(uTex, uv + disp * (1.0 - k));
  vec3 col = vec3(a.r, b.g, c.b);
  float alpha = max(max(a.a, b.a), c.a);
  vec3 n = normalize(vec3(-g * 0.02, 1.0));
  float spec = pow(clamp(dot(n, normalize(vec3(-0.4, 0.6, 0.7))), 0.0, 1.0), 28.0) * smoothstep(0.0, 1.0, length(g) * 0.04);
  col += vec3(1.0) * spec * alpha * 0.9;
  col += uAccent * fall * 0.35 * alpha;
  gl_FragColor = vec4(col, alpha);
}`;

const h1 = document.querySelector<HTMLElement>('[data-hero-title]');
if (h1 && !matchMedia('(prefers-reduced-motion: reduce)').matches) iniciar(h1);

function compilar(gl: WebGLRenderingContext, tipo: number, src: string): WebGLShader {
  const s = gl.createShader(tipo)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? 'shader');
  return s;
}

function cor(nome: string, padrao: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(nome).trim() || padrao;
}

function iniciar(titulo: HTMLElement): void {
  const canvas = document.createElement('canvas');
  canvas.className = 'hero-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: true });
  if (!gl) return;
  let prog: WebGLProgram;
  try {
    prog = gl.createProgram()!;
    gl.attachShader(prog, compilar(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compilar(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error('link');
  } catch (e) {
    console.warn('hero-title: shader indisponível', e);
    return;
  }
  gl.useProgram(prog);
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'aPos');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const U = (n: string) => gl.getUniformLocation(prog, n);
  const uTex = U('uTex'), uAspect = U('uAspect'), uTime = U('uTime'), uPower = U('uPower'), uMouse = U('uMouse'), uVel = U('uVel'), uRip = U('uRip'), uAccent = U('uAccent');
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  gl.uniform1i(uTex, 0);

  const texto = (titulo.textContent ?? '').replace(/\s+/g, ' ').trim();
  let largura = 1, altura = 1, dpr = 1;
  const ripples = new Float32Array(24).fill(0);
  for (let i = 0; i < 8; i++) ripples[i * 3 + 2] = -1;
  let proximo = 0;

  /** Draws the title text (gradient, wrapped) into a 2D canvas and uploads it as the texture. */
  function desenhar(): void {
    const css = getComputedStyle(titulo);
    const fonte = parseFloat(css.fontSize);
    const pad = fonte * 0.4;
    largura = titulo.clientWidth;
    const alturaLinha = fonte * (parseFloat(css.lineHeight) / fonte || 1.05);
    const medida = document.createElement('canvas').getContext('2d')!;
    const fam = `${css.fontWeight} ${fonte}px ${css.fontFamily}`;
    medida.font = fam;
    const linhas: string[] = [];
    let atual = '';
    for (const palavra of texto.split(' ')) {
      const tentativa = atual ? `${atual} ${palavra}` : palavra;
      if (medida.measureText(tentativa).width > largura && atual) {
        linhas.push(atual);
        atual = palavra;
      } else atual = tentativa;
    }
    if (atual) linhas.push(atual);
    altura = Math.ceil(linhas.length * alturaLinha);
    titulo.style.height = `${altura}px`;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = Math.ceil(largura + pad * 2);
    const H = Math.ceil(altura + pad * 2);
    canvas.style.cssText = `position:absolute;left:${-pad}px;top:${-pad}px;width:${W}px;height:${H}px`;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    const t = document.createElement('canvas');
    t.width = canvas.width;
    t.height = canvas.height;
    const c = t.getContext('2d')!;
    c.scale(dpr, dpr);
    c.font = fam;
    c.textBaseline = 'middle';
    const g = c.createLinearGradient(pad, 0, pad + largura, 0);
    g.addColorStop(0.1, cor('--color-text', '#14171f'));
    g.addColorStop(0.55, cor('--color-accent', '#1f5fd1'));
    g.addColorStop(1, '#cc79a7');
    c.fillStyle = g;
    linhas.forEach((l, i) => c.fillText(l, pad, pad + alturaLinha * (i + 0.5)));
    gl!.viewport(0, 0, canvas.width, canvas.height);
    gl!.bindTexture(gl!.TEXTURE_2D, tex);
    gl!.texImage2D(gl!.TEXTURE_2D, 0, gl!.RGBA, gl!.RGBA, gl!.UNSIGNED_BYTE, t);
    gl!.uniform1f(uAspect, canvas.width / canvas.height);
    const acento = cor('--color-accent', '#1f5fd1');
    const n = parseInt(acento.replace('#', '').padEnd(6, '0').slice(0, 6), 16);
    gl!.uniform3f(uAccent, ((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
  }

  titulo.append(canvas);
  titulo.classList.add('is-webgl');
  desenhar();

  let poder = 0, alvoPoder = 0, mx = 0.5, my = 0.5, vx = 0, vy = 0, ultimoX = -1e9, ultimoY = -1e9, tempoRip = 0;
  const t0 = performance.now();
  const agora = () => (performance.now() - t0) / 1000;
  const solta = (x: number, y: number, forca: number) => {
    const t = agora();
    ripples[proximo * 3] = x;
    ripples[proximo * 3 + 1] = y;
    ripples[proximo * 3 + 2] = t - (1 - forca) * 0.0;
    proximo = (proximo + 1) % 8;
  };
  window.addEventListener('pointermove', (e) => {
    const r = canvas.getBoundingClientRect();
    const margem = 120;
    const dentro = e.clientX > r.left - margem && e.clientX < r.right + margem && e.clientY > r.top - margem && e.clientY < r.bottom + margem;
    alvoPoder = dentro ? 1 : 0;
    if (!dentro) return;
    const nx = (e.clientX - r.left) / r.width;
    const ny = 1 - (e.clientY - r.top) / r.height;
    vx = (nx - mx) * 0.6 + vx * 0.4;
    vy = (ny - my) * 0.6 + vy * 0.4;
    mx = nx;
    my = ny;
    const d = Math.hypot(e.clientX - ultimoX, e.clientY - ultimoY);
    if (d > 36 && agora() - tempoRip > 0.07) {
      solta(nx, ny, 1);
      ultimoX = e.clientX;
      ultimoY = e.clientY;
      tempoRip = agora();
    }
  }, { passive: true });
  window.addEventListener('pointerdown', (e) => {
    const r = canvas.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) return;
    solta((e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height, 1);
  }, { passive: true });
  document.addEventListener('pointerleave', () => (alvoPoder = 0));

  let visivel = true;
  new IntersectionObserver((es) => (visivel = es[0]?.isIntersecting ?? true)).observe(titulo);
  let timer = 0;
  new ResizeObserver(() => {
    clearTimeout(timer);
    timer = window.setTimeout(desenhar, 120);
  }).observe(titulo.parentElement ?? titulo);
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => setTimeout(desenhar, 50));
  new MutationObserver(() => setTimeout(desenhar, 50)).observe(document.documentElement, { attributes: true, attributeFilter: ['data-visual'] });
  canvas.addEventListener('webglcontextlost', (e) => {
    e.preventDefault();
    titulo.classList.remove('is-webgl');
    canvas.remove();
  });

  function quadro(): void {
    requestAnimationFrame(quadro);
    if (!visivel || document.hidden) return;
    poder += (alvoPoder - poder) * 0.08;
    vx *= 0.9;
    vy *= 0.9;
    gl!.clearColor(0, 0, 0, 0);
    gl!.clear(gl!.COLOR_BUFFER_BIT);
    gl!.uniform1f(uTime, agora());
    gl!.uniform1f(uPower, poder);
    gl!.uniform2f(uMouse, mx, my);
    gl!.uniform2f(uVel, vx, vy);
    gl!.uniform3fv(uRip, ripples);
    gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
  }
  quadro();
  (window as unknown as { __heroTitle?: unknown }).__heroTitle = { solta };
}
