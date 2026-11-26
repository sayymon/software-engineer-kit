// SPDX-License-Identifier: MIT
// Spike S5. Minimal color helpers (same formulas as lib/flow-mermaid/index.ts: clarear, escurecer, corTexto).
const rgb = (c: string): [number, number, number] => [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)];
const hex = (r: number, g: number, b: number): string =>
  '#' + [r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('').toUpperCase();

export const clarear = (cor: string, f: number): string => {
  const [r, g, b] = rgb(cor);
  return hex(r + (255 - r) * f, g + (255 - g) * f, b + (255 - b) * f);
};
export const escurecer = (cor: string, f: number): string => {
  const [r, g, b] = rgb(cor);
  return hex(r * (1 - f), g * (1 - f), b * (1 - f));
};
const lum = (cor: string): number => {
  const [r, g, b] = rgb(cor).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  }) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
export const corTexto = (fundo: string): string => {
  const l = lum(fundo);
  return (l + 0.05) / 0.05 >= 1.05 / (l + 0.05) ? '#000000' : '#FFFFFF';
};
