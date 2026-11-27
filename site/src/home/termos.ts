// SPDX-License-Identifier: MIT
// Floating catalog terms on the first scene: techniques, tools, roles, patterns, algorithms and more, drawn at random from the
// catalog at every visit and renewed while the page stays open. Each one is a real link to its page. They are a decorative
// layer on top of the stage (links with tabindex -1, the same pages are reachable from the lists and from the search).
import * as THREE from 'three';
import { corDe } from '@lib/ecossistema/camadas';

/** Catalog types worth showing: concepts, tools and roles people recognize. */
const TIPOS = ['tecnica', 'ferramenta', 'papel', 'padrao', 'algoritmo', 'estrutura-de-dados', 'stack', 'modelo', 'rito', 'certificacao', 'guia-pratico', 'artefato', 'categoria', 'caso-de-uso', 'abordagem', 'estrategia'];

interface Item {
  id: string;
  tipo: string;
  nome: string;
  url: string;
}

interface Termo {
  el: HTMLAnchorElement;
  x: number;
  y: number;
  z: number;
  fase: number;
  item: Item;
}

export interface Termos {
  atualizar(tempo: number, camera: THREE.PerspectiveCamera, opacidade: number): void;
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

  // Cells of a jittered grid, so the terms spread over the screen instead of piling up.
  const colunas = 7;
  const linhas = Math.max(2, Math.ceil(quantidade / colunas));
  const celulas = embaralhar(Array.from({ length: colunas * linhas }, (_, k) => k), r).slice(0, quantidade);
  const termos: Termo[] = celulas.map((c) => {
    const col = c % colunas;
    const lin = Math.floor(c / colunas);
    const el = document.createElement('a');
    el.className = 'termo';
    el.tabIndex = -1;
    raiz.append(el);
    let x = -9.5 + ((col + 0.15 + r() * 0.7) / colunas) * 19;
    let y = 5.6 - ((lin + 0.15 + r() * 0.7) / linhas) * 11.2;
    // Keep the band behind the title and the text clear: terms there would fight with what people read.
    if (x < 4.5 && y > -2.4 && y < 2.2) y = y >= 0 ? 2.6 + r() * 1.2 : -2.8 - r() * 1.2;
    const termo: Termo = {
      el,
      x,
      y,
      z: -2 - r() * 10,
      fase: r() * 40,
      item: proximo(),
    };
    preencher(termo, termo.item);
    return termo;
  });

  function preencher(t: Termo, item: Item): void {
    t.item = item;
    t.el.textContent = item.nome;
    t.el.href = item.url;
    t.el.dataset.tipo = rotulos[`tipo.${item.tipo}`] ?? item.tipo;
    t.el.style.setProperty('--cor', corDe(item.tipo));
  }

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

  const v = new THREE.Vector3();
  return {
    atualizar(tempo, camera, opacidade) {
      raiz.style.visibility = opacidade < 0.02 ? 'hidden' : 'visible';
      if (opacidade < 0.02) return;
      const w = innerWidth;
      const h = innerHeight;
      for (const t of termos) {
        v.set(t.x + Math.cos(tempo * 0.16 + t.fase) * 0.45, t.y + Math.sin(tempo * 0.22 + t.fase * 1.3) * 0.5, t.z).project(camera);
        const distancia = camera.position.z - t.z;
        const escala = Math.min(1.25, Math.max(0.55, 14 / distancia));
        t.el.style.transform = `translate3d(${((v.x * 0.5 + 0.5) * w).toFixed(1)}px, ${((-v.y * 0.5 + 0.5) * h).toFixed(1)}px, 0) translate(-50%, -50%) scale(${escala.toFixed(3)})`;
        t.el.style.setProperty('--o', (opacidade * (0.4 + 0.4 * ((escala - 0.55) / 0.7))).toFixed(3));
      }
    },
    destruir() {
      window.clearInterval(temporizador);
      raiz.remove();
    },
  };
}

