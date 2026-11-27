// SPDX-License-Identifier: MIT
// Mermaid loader of the Diagrama (Requirements 15.3, 15.12): ESM first, bundle as fallback, kit limits, fixed seed,
// limit overrun treated as an error. The Mermaid API is a stand-in with the same two methods; the real SVG notice is
// checked against the real Mermaid in tests/browser/mermaid-carga.spec.ts.
import fc from 'fast-check';
import { beforeEach, describe, expect, it } from 'vitest';
import { MERMAID_MAX_EDGES, MERMAID_MAX_TEXT_SIZE } from '../../lib/flow-mermaid/limites';
import {
  MERMAID_HAND_DRAWN_SEED,
  type MermaidApi,
  MermaidLimiteError,
  carregarMermaid,
  configMermaid,
  ehSvgDeLimiteExcedido,
  reiniciarCarga,
  renderizarDiagrama,
  urlBundle,
  urlEsm,
} from '../../site/src/flow-app/mermaid-loader';

function api(svg = '<svg>ok</svg>'): MermaidApi & { configs: Record<string, unknown>[] } {
  const configs: Record<string, unknown>[] = [];
  return { configs, initialize: (c) => void configs.push(c), render: async () => ({ svg }) };
}

beforeEach(() => reiniciarCarga());

describe('configMermaid', () => {
  it('passes the kit limits, the fixed seed and strict security', () => {
    const c = configMermaid('dark');
    expect(c).toMatchObject({ startOnLoad: false, securityLevel: 'strict', theme: 'dark', maxTextSize: MERMAID_MAX_TEXT_SIZE, maxEdges: MERMAID_MAX_EDGES, handDrawnSeed: MERMAID_HAND_DRAWN_SEED });
    expect(MERMAID_HAND_DRAWN_SEED).not.toBe(0);
  });
});

describe('carregarMermaid', () => {
  it('imports the ESM from the site base, initializes once and caches', async () => {
    const m = api();
    const urls: string[] = [];
    const opcoes = { base: '/kit', importar: async (u: string) => (urls.push(u), { default: m }) };
    const a = await carregarMermaid(opcoes);
    const b = await carregarMermaid(opcoes);
    expect(a.origem).toBe('esm');
    expect(b).toBe(a);
    expect(urls).toEqual(['/kit/vendor/mermaid-esm/mermaid.esm.min.mjs']);
    expect(m.configs).toEqual([configMermaid()]);
  });

  it('falls back to the single bundle when the ESM import fails', async () => {
    const m = api();
    const urls: string[] = [];
    const r = await carregarMermaid({
      base: '',
      importar: async () => {
        throw new Error('404');
      },
      carregarBundle: async (u) => (urls.push(u), m),
    });
    expect(r.origem).toBe('bundle');
    expect(urls).toEqual(['/vendor/mermaid/mermaid.min.js']);
    expect(m.configs).toHaveLength(1);
  });

  it('rejects, and allows a retry, when both ways fail', async () => {
    const falha = async (): Promise<never> => {
      throw new Error('off');
    };
    await expect(carregarMermaid({ base: '', importar: falha, carregarBundle: falha })).rejects.toThrow('off');
    const r = await carregarMermaid({ base: '', importar: async () => ({ default: api() }) });
    expect(r.origem).toBe('esm');
  });

  it('only points at local paths (no CDN)', () => {
    for (const base of ['', '/kit']) for (const u of [urlEsm(base), urlBundle(base)]) expect(u.startsWith('/')).toBe(true);
  });
});

describe('renderizarDiagrama', () => {
  it('returns the SVG of a normal render', async () => {
    expect(await renderizarDiagrama(api('<svg>fluxo</svg>'), 'd', 'graph TD;a-->b')).toBe('<svg>fluxo</svg>');
  });

  it('treats the text-size notice SVG as an error', async () => {
    const aviso = '<svg><g><text>Maximum text size in diagram exceeded</text></g></svg>';
    await expect(renderizarDiagrama(api(aviso), 'd', 'x')).rejects.toBeInstanceOf(MermaidLimiteError);
  });

  it('treats the edge-limit error as a limit error and lets other errors through', async () => {
    const lanca = (msg: string): MermaidApi => ({ initialize: () => {}, render: async () => Promise.reject(new Error(msg)) });
    await expect(renderizarDiagrama(lanca('Edge limit exceeded. 1001 edges found, but the limit is 1000.'), 'd', 'x')).rejects.toBeInstanceOf(MermaidLimiteError);
    await expect(renderizarDiagrama(lanca('Parse error'), 'd', 'x')).rejects.toThrow('Parse error');
  });

  it('property: the notice is detected whatever surrounds it and its letter case', () => {
    fc.assert(
      fc.property(fc.string(), fc.string(), fc.boolean(), (antes, depois, maiuscula) => {
        const frase = maiuscula ? 'MAXIMUM TEXT SIZE IN DIAGRAM EXCEEDED' : 'Maximum text size in diagram exceeded';
        expect(ehSvgDeLimiteExcedido(`${antes}${frase}${depois}`)).toBe(true);
      }),
    );
  });
});
