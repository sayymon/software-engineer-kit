// SPDX-License-Identifier: MIT
// Small SVG icons that match the 3D shapes, for the legend and the side panel. Pure DOM, no assets.
import type { Forma } from '@lib/ecossistema/camadas';

const NS = 'http://www.w3.org/2000/svg';

function el(nome: string, attrs: Record<string, string>): SVGElement {
  const e = document.createElementNS(NS, nome);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  return e;
}

/** A 16x16 icon of the shape, filled with `cor`. */
export function icone(forma: Forma, cor: string, tamanho = 16): SVGSVGElement {
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 16 16');
  svg.setAttribute('width', String(tamanho));
  svg.setAttribute('height', String(tamanho));
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  svg.classList.add('eco-icon');
  const preencher = { fill: cor, stroke: 'rgba(255,255,255,0.35)', 'stroke-width': '0.6', 'stroke-linejoin': 'round' };
  const add = (e: SVGElement) => svg.append(e);
  switch (forma) {
    case 'esfera':
      add(el('circle', { cx: '8', cy: '8', r: '6.2', ...preencher }));
      add(el('circle', { cx: '6', cy: '5.8', r: '1.8', fill: 'rgba(255,255,255,0.35)' }));
      break;
    case 'cubo':
      add(el('polygon', { points: '8,1.5 14,4.7 14,11.3 8,14.5 2,11.3 2,4.7', ...preencher }));
      add(el('path', { d: 'M2,4.7 L8,8 L14,4.7 M8,8 L8,14.5', fill: 'none', stroke: 'rgba(0,0,0,0.35)', 'stroke-width': '0.8' }));
      break;
    case 'octaedro':
      add(el('polygon', { points: '8,1 14.5,8 8,15 1.5,8', ...preencher }));
      add(el('path', { d: 'M1.5,8 L14.5,8', fill: 'none', stroke: 'rgba(0,0,0,0.3)', 'stroke-width': '0.8' }));
      break;
    case 'cone':
      add(el('polygon', { points: '8,1.5 14,13.5 2,13.5', ...preencher }));
      add(el('ellipse', { cx: '8', cy: '13.5', rx: '6', ry: '1.6', fill: cor, stroke: 'rgba(255,255,255,0.35)', 'stroke-width': '0.6' }));
      break;
    case 'tetraedro':
      add(el('polygon', { points: '8,2 14.5,13 1.5,13', ...preencher }));
      add(el('path', { d: 'M8,2 L8,13 M8,13 L14.5,13', fill: 'none', stroke: 'rgba(0,0,0,0.3)', 'stroke-width': '0.8' }));
      break;
    case 'anel':
      add(el('circle', { cx: '8', cy: '8', r: '5.2', fill: 'none', stroke: cor, 'stroke-width': '3' }));
      break;
    case 'dodecaedro':
      add(el('polygon', { points: '8,1.2 14.3,5.8 11.9,13.4 4.1,13.4 1.7,5.8', ...preencher }));
      add(el('polygon', { points: '8,5 10.6,6.9 9.6,9.9 6.4,9.9 5.4,6.9', fill: 'none', stroke: 'rgba(0,0,0,0.3)', 'stroke-width': '0.8' }));
      break;
    case 'icosaedro':
      add(el('polygon', { points: '8,1 14,4.5 14,11.5 8,15 2,11.5 2,4.5', ...preencher }));
      add(el('path', { d: 'M2,4.5 L8,8 L14,4.5 M8,8 L8,15 M2,11.5 L8,8 L14,11.5', fill: 'none', stroke: 'rgba(0,0,0,0.3)', 'stroke-width': '0.7' }));
      break;
    case 'cilindro':
      add(el('rect', { x: '3', y: '3.2', width: '10', height: '9.6', ...preencher }));
      add(el('ellipse', { cx: '8', cy: '3.2', rx: '5', ry: '1.8', fill: cor, stroke: 'rgba(255,255,255,0.45)', 'stroke-width': '0.6' }));
      add(el('ellipse', { cx: '8', cy: '12.8', rx: '5', ry: '1.8', fill: cor }));
      break;
    case 'prisma':
      add(el('polygon', { points: '1.5,6 9,3 14.5,6 14.5,12 7,14.5 1.5,12', ...preencher }));
      add(el('path', { d: 'M7,14.5 L7,8.5 M1.5,6 L7,8.5 L14.5,6', fill: 'none', stroke: 'rgba(0,0,0,0.3)', 'stroke-width': '0.7' }));
      break;
  }
  return svg;
}
