// SPDX-License-Identifier: MIT
// Loads Mermaid for the Diagrama on demand and renders with the kit's limits.
// Target: the split ESM build copied by tools/site/build.ts to <base>/vendor/mermaid-esm (the flowchart and dagre chunks come by
// `import()` on the first render). Fallback: the single vendored bundle (<base>/vendor/mermaid/mermaid.min.js, global `mermaid`),
// used when the ESM import fails. Never a CDN. Nothing here runs until `carregarMermaid` is called, so a page without a Diagrama
// pays 0 kB of Mermaid.
import { MERMAID_MAX_EDGES, MERMAID_MAX_TEXT_SIZE } from '@lib/flow-mermaid/limites';

export interface MermaidApi {
  initialize(config: Record<string, unknown>): void;
  render(id: string, texto: string): Promise<{ svg: string }>;
}

export type Tema = 'default' | 'dark';

/** Fixed seed for rough.js (node outlines). With the default 0 each render draws different control points; a fixed seed makes
 *  the SVG deterministic and identical between the ESM build and the single bundle (spike S6). */
export const MERMAID_HAND_DRAWN_SEED = 1;

/** Text Mermaid puts in the SVG it returns, without throwing, when the text is over `maxTextSize`. */
const TEXTO_LIMITE = /maximum text size in diagram exceeded/i;
/** Message of the error Mermaid throws when the diagram has more than `maxEdges` edges. */
const ERRO_ARESTAS = /edge limit exceeded/i;

export class MermaidLimiteError extends Error {
  constructor(message = 'Mermaid limit exceeded (text size or edge count)') {
    super(message);
    this.name = 'MermaidLimiteError';
  }
}

/** Mermaid configuration of the kit. */
export function configMermaid(tema: Tema = 'default'): Record<string, unknown> {
  return {
    startOnLoad: false,
    securityLevel: 'strict',
    theme: tema,
    maxTextSize: MERMAID_MAX_TEXT_SIZE,
    maxEdges: MERMAID_MAX_EDGES,
    handDrawnSeed: MERMAID_HAND_DRAWN_SEED,
    flowchart: { useMaxWidth: false },
  };
}

/** True when the SVG is Mermaid's "text size exceeded" notice and not the requested diagram. */
export function ehSvgDeLimiteExcedido(svg: string): boolean {
  return TEXTO_LIMITE.test(svg);
}

export interface OpcoesDoLoader {
  /** Site base without trailing slash ('' or '/software-engineer-kit'). */
  base: string;
  tema?: Tema;
  /** `import()` of the ESM entry. Injectable for tests. */
  importar?: (url: string) => Promise<{ default: MermaidApi }>;
  /** Loads the single bundle by script tag and returns `window.mermaid`. Injectable for tests. */
  carregarBundle?: (url: string) => Promise<MermaidApi>;
}

export const urlEsm = (base: string) => `${base}/vendor/mermaid-esm/mermaid.esm.min.mjs`;
export const urlBundle = (base: string) => `${base}/vendor/mermaid/mermaid.min.js`;

const importarPadrao = (url: string): Promise<{ default: MermaidApi }> => import(/* @vite-ignore */ url);

function carregarBundlePadrao(url: string): Promise<MermaidApi> {
  return new Promise((ok, ko) => {
    const tag = document.createElement('script');
    tag.src = url;
    tag.async = true;
    tag.onload = () => {
      const api = (window as unknown as { mermaid?: MermaidApi }).mermaid;
      if (api) ok(api);
      else ko(new Error('Mermaid bundle loaded without a global `mermaid`'));
    };
    tag.onerror = () => ko(new Error(`failed to load ${url}`));
    document.head.appendChild(tag);
  });
}

export interface MermaidCarregado {
  api: MermaidApi;
  origem: 'esm' | 'bundle';
}

let emCarga: Promise<MermaidCarregado> | undefined;

/** Loads and initializes Mermaid once per page. ESM first, single bundle if the ESM import fails. */
export function carregarMermaid(opcoes: OpcoesDoLoader): Promise<MermaidCarregado> {
  emCarga ??= carregar(opcoes).catch((e) => {
    emCarga = undefined;
    throw e;
  });
  return emCarga;
}

/** Forgets the cached load. For tests. */
export function reiniciarCarga(): void {
  emCarga = undefined;
}

async function carregar(opcoes: OpcoesDoLoader): Promise<MermaidCarregado> {
  const importar = opcoes.importar ?? importarPadrao;
  const carregarBundle = opcoes.carregarBundle ?? carregarBundlePadrao;
  let carregado: MermaidCarregado;
  try {
    carregado = { api: (await importar(urlEsm(opcoes.base))).default, origem: 'esm' };
  } catch {
    carregado = { api: await carregarBundle(urlBundle(opcoes.base)), origem: 'bundle' };
  }
  carregado.api.initialize(configMermaid(opcoes.tema));
  return carregado;
}

/** Renders `texto`. Limit overruns (the notice SVG or the edge-limit error) become `MermaidLimiteError`. */
export async function renderizarDiagrama(api: MermaidApi, id: string, texto: string): Promise<string> {
  let svg: string;
  try {
    svg = (await api.render(id, texto)).svg;
  } catch (e) {
    if (e instanceof Error && ERRO_ARESTAS.test(e.message)) throw new MermaidLimiteError(e.message);
    throw e;
  }
  if (ehSvgDeLimiteExcedido(svg)) throw new MermaidLimiteError();
  return svg;
}
