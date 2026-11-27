// SPDX-License-Identifier: MIT
// Samples the title letters into normalized points (0..1 inside the title box), to be turned into particles.

/** Returns points inside the h1 box, or null when the text cannot be measured. The text stays in the DOM. */
export function amostrarTitulo(h1: HTMLElement, maximo = 1800): Array<[number, number]> | null {
  const texto = (h1.textContent ?? '').replace(/\s+/g, ' ').trim();
  const largura = h1.clientWidth;
  if (!texto || !largura) return null;
  const css = getComputedStyle(h1);
  const fonte = parseFloat(css.fontSize);
  const linha = parseFloat(css.lineHeight) || fonte * 1.05;
  const medida = document.createElement('canvas').getContext('2d');
  if (!medida) return null;
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
  const altura = Math.ceil(linhas.length * linha);
  // Work at a reduced scale: the points only need the shape of the letters.
  const k = Math.min(1, 640 / largura);
  const w = Math.max(1, Math.round(largura * k));
  const h = Math.max(1, Math.round(altura * k));
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const g = c.getContext('2d', { willReadFrequently: true });
  if (!g) return null;
  g.scale(k, k);
  g.font = fam;
  g.textBaseline = 'middle';
  g.fillStyle = '#fff';
  linhas.forEach((l, i) => g.fillText(l, 0, linha * (i + 0.5)));
  const dados = g.getImageData(0, 0, w, h).data;
  const candidatos: Array<[number, number]> = [];
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (dados[(y * w + x) * 4 + 3] > 140) candidatos.push([x / w, y / h]);
  if (!candidatos.length) return null;
  // Even thinning so the shape is kept and the count stays bounded.
  const passo = Math.max(1, candidatos.length / maximo);
  const saida: Array<[number, number]> = [];
  for (let i = 0; i < candidatos.length && saida.length < maximo; i += passo) saida.push(candidatos[Math.floor(i)]);
  return saida;
}
