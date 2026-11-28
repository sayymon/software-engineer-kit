// SPDX-License-Identifier: MIT
// Instrumentation of `mermaid.render` for the browser specs (Requirements 20.3, 20.9, 20.10), without touching product code.
// The island imports Mermaid from `/vendor/mermaid-esm/mermaid.esm.min.mjs`; the route below serves a shim that re-exports the real
// module (loaded under `?real`) with `render` and `initialize` wrapped. The shim records every call in `window.__mmd` and lets a test
// slow the render (`atrasoMs`) or make it fail like Mermaid does at a limit (`limite`).
import type { Page } from '@playwright/test';

export interface ChamadaDeRender {
  id: string;
  texto: string;
}

interface Estado {
  chamadas: ChamadaDeRender[];
  config: Record<string, unknown> | null;
  atrasoMs: number;
  limite: boolean;
}

const SHIM = `
import m from '/vendor/mermaid-esm/mermaid.esm.min.mjs?real';
const w = window;
w.__mmd ??= { chamadas: [], config: null, atrasoMs: 0, limite: false };
const render = m.render.bind(m);
const initialize = m.initialize.bind(m);
m.initialize = (config) => { w.__mmd.config = JSON.parse(JSON.stringify(config)); return initialize(config); };
m.render = async (id, texto, ...resto) => {
  w.__mmd.chamadas.push({ id, texto });
  if (w.__mmd.atrasoMs) await new Promise((ok) => setTimeout(ok, w.__mmd.atrasoMs));
  if (w.__mmd.limite) throw new Error('Edge limit exceeded. 501 edges found, but the limit is 500.');
  return render(id, texto, ...resto);
};
export default m;
`;

/** Routes the Mermaid ESM entry to the instrumented shim. Call before `page.goto`. */
export async function instrumentarMermaid(page: Page): Promise<void> {
  await page.route('**/vendor/mermaid-esm/mermaid.esm.min.mjs', (route) =>
    route.fulfill({ status: 200, contentType: 'text/javascript; charset=utf-8', body: SHIM }),
  );
}

export const chamadas = (page: Page): Promise<ChamadaDeRender[]> => page.evaluate(() => (window as unknown as { __mmd: Estado }).__mmd.chamadas);
export const totalDeChamadas = async (page: Page): Promise<number> => (await chamadas(page)).length;
export const configDoMermaid = (page: Page) => page.evaluate(() => (window as unknown as { __mmd: Estado }).__mmd.config);
export const ajustarMermaid = (page: Page, ajuste: Partial<Pick<Estado, 'atrasoMs' | 'limite'>>) =>
  page.evaluate((a) => Object.assign((window as unknown as { __mmd: Estado }).__mmd, a), ajuste);
