// SPDX-License-Identifier: MIT
// Diagrama load (Requirements 15.3, 15.12): the ESM Mermaid that tools/site/build.ts copies to site/dist/vendor/mermaid-esm renders the
// Visão geral from the same origin (no CDN), with the kit's configuration, and the "text size exceeded" SVG that the real Mermaid
// returns is recognised by the loader. Prints the kB gzip transferred until the first render (spike S6: 27 requests, 235.44 kB).
// Own static server over site/dist with gzip level 9 (what a host does); tests/browser/serve.ts has no compression.
// Requires a built site: npm run build.
import { expect, test } from '@playwright/test';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import type { AddressInfo } from 'node:net';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { gzipSync } from 'node:zlib';
import { gerarGrafo } from '../../lib/flow-graph';
import { gerarDiagramaExpandido } from '../../lib/flow-mermaid';
import { guideDir, loadGuideDoc } from '../../lib/guide';
import { configMermaid, ehSvgDeLimiteExcedido, urlEsm } from '../../site/src/flow-app/mermaid-loader';

const RAIZ = resolve('site/dist');
const MIME: Record<string, string> = { '.html': 'text/html; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.js': 'text/javascript; charset=utf-8' };
if (!existsSync(join(RAIZ, 'vendor/mermaid-esm/mermaid.esm.min.mjs'))) throw new Error('site/dist sem vendor/mermaid-esm: rode npm run build');

const geral = gerarDiagramaExpandido(gerarGrafo(loadGuideDoc(guideDir(resolve('content'))), 'feature'), { raias: new Set(), subtarefas: new Set(), todasSubtarefas: false }).texto;

test('Diagrama: ESM local renderiza a Visão geral e o aviso de limite é reconhecido', async ({ browser }) => {
  const server = createServer((req, res) => {
    const caminho = decodeURIComponent(new URL(req.url ?? '/', 'http://localhost').pathname);
    const arq = caminho === '/blank.html' ? undefined : normalize(join(RAIZ, caminho));
    const corpo = caminho === '/blank.html' ? Buffer.from('<!doctype html><meta charset="utf-8"><body></body>') : arq && arq.startsWith(RAIZ + sep) && existsSync(arq) && statSync(arq).isFile() ? readFileSync(arq) : undefined;
    if (!corpo) return void res.writeHead(404).end('not found');
    const gz = gzipSync(corpo, { level: 9 });
    res.writeHead(200, { 'content-type': MIME[extname(arq ?? caminho)] ?? 'application/octet-stream', 'content-encoding': 'gzip', 'content-length': gz.length, 'cache-control': 'no-store' });
    res.end(gz);
  });
  await new Promise<void>((ok) => server.listen(0, '127.0.0.1', ok));
  const origem = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
  try {
    const page = await (await browser.newContext()).newPage();
    const cdp = await page.context().newCDPSession(page);
    await cdp.send('Network.enable');
    const urls = new Map<string, string>();
    const feitas: Array<{ url: string; corpo: number; transferido: number }> = [];
    const corpos = new Map<string, number>();
    cdp.on('Network.responseReceived', (e) => (urls.set(e.requestId, e.response.url), corpos.set(e.requestId, Number(e.response.headers['content-length'] ?? 0))));
    cdp.on('Network.loadingFinished', (e) => feitas.push({ url: urls.get(e.requestId) ?? '', corpo: corpos.get(e.requestId) ?? 0, transferido: e.encodedDataLength }));
    const erros: string[] = [];
    page.on('pageerror', (e) => erros.push(e.message));
    await page.goto(`${origem}/blank.html`);
    const base = feitas.length;

    // Same steps as carregarMermaid + renderizarDiagrama, with the real Mermaid.
    const { svg, avisoSvg } = await page.evaluate(
      async ({ url, config, texto }) => {
        const m = (await import(url)).default;
        m.initialize(config);
        const ok = await m.render('mmd-geral', texto);
        m.initialize({ ...config, maxTextSize: 10 });
        const aviso = await m.render('mmd-aviso', 'graph TD; a-->b-->c-->d');
        return { svg: ok.svg as string, avisoSvg: aviso.svg as string };
      },
      { url: `${origem}${urlEsm('')}`, config: configMermaid('default'), texto: geral },
    );
    expect(erros).toEqual([]);
    expect(svg.startsWith('<svg')).toBe(true);
    expect(ehSvgDeLimiteExcedido(svg)).toBe(false);
    expect(ehSvgDeLimiteExcedido(avisoSvg)).toBe(true);

    // The load until the first Visão geral = what was fetched after the page. The aviso render needs no new request.
    const carga = feitas.slice(base);
    expect(carga.every((f) => f.url.startsWith(`${origem}/vendor/mermaid-esm/`))).toBe(true);
    const kb = (n: number) => Math.round((n / 1024) * 100) / 100;
    const transferido = kb(carga.reduce((n, f) => n + f.transferido, 0));
    const corpo = kb(carga.reduce((n, f) => n + f.corpo, 0));
    console.log(`MERMAID_CARGA requisicoes=${carga.length} corpo_gzip_kb=${corpo} transferido_kb=${transferido} (spike S6: 27 requisicoes, 235.44 kB)`);
    expect(carga.length).toBeGreaterThan(1);
  } finally {
    server.close();
  }
});
