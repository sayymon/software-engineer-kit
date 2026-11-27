// SPDX-License-Identifier: MIT
// Floating catalog terms: techniques, tools, roles, patterns, algorithms and more, drawn at random from the catalog at every
// visit and renewed while the page stays open. Each one is a real link to its page. They live in two bands, above and below
// the text of the active scene, so they never pass behind the title, the text or the search. The first scene shows all of
// them; the other scenes keep a smaller share. A decorative layer (links with tabindex -1): the same pages are reachable from
// the lists and from the search.
import * as THREE from 'three';
import { corDe } from '@lib/ecossistema/camadas';

/** Catalog types worth showing: concepts, tools and roles people recognize. */
const TIPOS = ['tecnica', 'ferramenta', 'papel', 'padrao', 'algoritmo', 'estrutura-de-dados', 'stack', 'modelo', 'rito', 'certificacao', 'guia-pratico', 'artefato', 'categoria', 'caso-de-uso', 'abordagem', 'estrategia'];
/** Share of the terms that stay on screen in scenes 2 to 4. */
const FRACAO_NAS_OUTRAS_CENAS = 0.4;
const MARGEM = 30;
const ALTURA_MINIMA = 44;

interface Item {
  id: string;
  tipo: string;
  nome: string;
  url: string;
}

interface Termo {
  el: HTMLAnchorElement;
  banda: 0 | 1;
  /** Position of the term inside its band (0, 1, 2...). */
  j: number;
  fx: number;
  fy: number;
  fase: number;
  prof: number;
  y: number;
  item: Item;
}

export interface Termos {
  /** `opacidadeCena0`: 1 on the first scene, falling to 0 as the story moves on. `texto`: box of the active scene text. */
  atualizar(tempo: number, camera: THREE.PerspectiveCamera, opacidadeCena0: number, texto: DOMRect | null): void;
  destruir(): void;
}

function embaralhar<T>(lista: T[], r: () => number): T[] {
  const a = [...lista];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const frac = (v: number) => v - Math.floor(v);

export async function criarTermos(base: string, locale: string, quantidade: number, rotulos: Record<string, string>): Promise<Termos | null> {
  let itens: Item[];
  try {
    const r = await fetch(`${base}/${locale}/api/index.json`);
    if (!r.ok) return null;
    const dados = (await r.json()) as { items: Array<Item & { layer: string }> };
    itens = dados.items.filter((i) => TIPOS.includes(i.tipo) && i.nome.length <= 30 && !/^hub_/.test(i.id));
  } catch {
    return null;
  }
  // A new draw on every visit: Math.random is the point here, the stage itself stays deterministic.
  const r = () => Math.random();
  const porTipo = new Map<string, Item[]>();
  for (const i of itens) (porTipo.get(i.tipo) ?? porTipo.set(i.tipo, []).get(i.tipo)!).push(i);
  const pool = new Map([...porTipo].map(([t, l]) => [t, embaralhar(l, r)]));
  const usados = new Set<string>();
  /** Takes the next unused item, rotating over the types so the mix stays varied. */
  let ciclo = embaralhar([...pool.keys()], r);
  let cursor = 0;
  function proximo(): Item {
    for (let tentativas = 0; tentativas < 80; tentativas++) {
      if (cursor >= ciclo.length) {
        ciclo = embaralhar([...pool.keys()], r);
        cursor = 0;
      }
      const lista = pool.get(ciclo[cursor++])!;
      const item = lista[Math.floor(r() * lista.length)];
      if (!usados.has(item.id)) {
        usados.add(item.id);
        return item;
      }
    }
    return itens[Math.floor(r() * itens.length)];
  }

  const raiz = document.createElement('div');
  raiz.id = 'termos';
  raiz.setAttribute('aria-hidden', 'true');
  document.body.prepend(raiz);

  function preencher(t: Termo, item: Item): void {
    t.item = item;
    t.el.textContent = item.nome;
    t.el.href = item.url;
    t.el.dataset.tipo = rotulos[`tipo.${item.tipo}`] ?? item.tipo;
    t.el.style.setProperty('--cor', corDe(item.tipo));
  }

  // Alternate the terms between the upper and the lower band. Low-discrepancy sequences spread them evenly inside each band.
  const termos: Termo[] = Array.from({ length: quantidade }, (_, k) => {
    const banda = (k % 2) as 0 | 1;
    const j = Math.floor(k / 2);
    const el = document.createElement('a');
    el.className = 'termo';
    el.tabIndex = -1;
    raiz.append(el);
    const t: Termo = { el, banda, j, fx: frac(0.5 + j * 0.618034 + r() * 0.05), fy: frac(0.5 + j * 0.754878 + r() * 0.05), fase: r() * 40, prof: 0.55 + r() * 0.6, y: -999, item: proximo() };
    preencher(t, t.item);
    return t;
  });
  const reduzidos = Math.max(4, Math.round(quantidade * FRACAO_NAS_OUTRAS_CENAS));

  // Renewal: every few seconds one term fades out, changes and comes back.
  const temporizador = window.setInterval(() => {
    if (document.hidden) return;
    const t = termos[Math.floor(r() * termos.length)];
    if (!t || t.el.matches(':hover')) return;
    t.el.classList.add('trocando');
    window.setTimeout(() => {
      preencher(t, proximo());
      t.el.classList.remove('trocando');
    }, 700);
  }, 2200);

  return {
    atualizar(tempo, camera, opacidadeCena0, texto) {
      const w = innerWidth;
      const h = innerHeight;
      // Free bands: above and below the text of the active scene, with a margin; the lang switch and the "skip" link are avoided.
      const topoFim = Math.min(texto ? texto.top - MARGEM : h * 0.3, h * 0.34);
      const baseIni = Math.max(texto ? texto.bottom + MARGEM : h * 0.7, h * 0.66);
      const faixas: Array<[number, number, number, number]> = [
        [h * 0.065, topoFim, 0.03, 0.86],
        [baseIni, h * 0.955, 0.2, 0.95],
      ];
      const porBanda = [Math.ceil(termos.length / 2), Math.floor(termos.length / 2)];
      for (let k = 0; k < termos.length; k++) {
        const t = termos[k];
        const [ini, fim, x0, x1] = faixas[t.banda];
        const cabe = fim - ini >= ALTURA_MINIMA;
        // A jittered grid per band: rows by the free height, columns by the number of terms, so they do not pile on each other.
        const filas = Math.max(1, Math.floor((fim - ini) / 30));
        const colunas = Math.max(1, Math.ceil(porBanda[t.banda] / filas));
        const fila = t.j % filas;
        const coluna = Math.floor(t.j / filas);
        const alvoY = ini + ((fila + 0.5 + (t.fy - 0.5) * 0.5) / filas) * (fim - ini);
        t.y = t.y < -900 ? alvoY : t.y + (alvoY - t.y) * 0.12;
        const fxGrade = (coluna + 0.5 + (t.fx - 0.5) * 0.6) / colunas;
        const x = (x0 + fxGrade * (x1 - x0)) * w + Math.cos(tempo * 0.16 + t.fase) * 10 - camera.position.x * 14;
        const y = t.y + Math.sin(tempo * 0.22 + t.fase * 1.3) * 6 - camera.position.y * 10;
        const presenca = k < reduzidos ? 1 : opacidadeCena0;
        const op = cabe ? presenca * (0.42 + 0.4 * (t.prof - 0.55) / 0.6) : 0;
        t.el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%) scale(${t.prof.toFixed(3)})`;
        t.el.style.setProperty('--o', op.toFixed(3));
        t.el.style.pointerEvents = op < 0.05 ? 'none' : 'auto';
      }
    },
    destruir() {
      window.clearInterval(temporizador);
      raiz.remove();
    },
  };
}
