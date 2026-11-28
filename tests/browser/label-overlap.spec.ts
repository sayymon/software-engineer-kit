// SPDX-License-Identifier: MIT
// Port of the former Python oracle (see docs/guide-browser-tests.md):
// no g.node may cover the label of a g.cluster (subgraph) in the Visão geral and in the full flow of each demand page (island data-island="flow").
// Requires a built site: KIT_LOCALES=pt-BR npm run build
import { expect, test } from '@playwright/test';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const flowsDir = join('site', 'dist', 'pt-BR', 'flows');
if (!existsSync(flowsDir)) throw new Error('site/dist ausente: rode KIT_LOCALES=pt-BR npm run build');

const demands = readdirSync(flowsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory() && existsSync(join(flowsDir, d.name, 'index.html')))
  .filter((d) => readFileSync(join(flowsDir, d.name, 'index.html'), 'utf8').includes('data-island="flow"'))
  .map((d) => d.name);

test('o build tem páginas de demanda com diagramas', () => {
  expect(demands.length).toBeGreaterThan(0);
});

for (const demand of demands) {
  test(`sem sobreposição de rótulo de subgraph: ${demand}`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto(`/pt-BR/flows/${demand}/`);
    const views = [
      { nome: 'Visão geral', url: `/pt-BR/flows/${demand}/` },
      { nome: 'Fluxo completo', url: `/pt-BR/flows/${demand}/#view=completo` },
    ];
    const results: Array<{ caption: string; clusters: number; nodes: number; overlaps: string[] }> = [];
    for (const v of views) {
      await page.goto(v.url);
      await page.reload(); // a hash-only goto does not reload the page; the island must open in the View of the URL
      await expect(page.locator('[data-flow-stage]')).toHaveAttribute('data-rendered', 'true', { timeout: 90_000 });
      const medido = await page.evaluate(() => {
        const rect = (e: Element) => e.getBoundingClientRect();
        const area = (a: DOMRect, b: DOMRect) => {
          const w = Math.min(a.right, b.right) - Math.max(a.left, b.left);
          const h = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
          return w > 1 && h > 1 ? w * h : 0;
        };
        const stage = document.querySelector('[data-flow-stage]')!;
        const nodes = Array.from(stage.querySelectorAll('g.node'));
        const overlaps: string[] = [];
        let clusters = 0;
        stage.querySelectorAll('g.cluster').forEach((c) => {
          const label = c.querySelector('.cluster-label') ?? c.querySelector('foreignObject') ?? c.querySelector('text');
          if (!label) return;
          clusters++;
          const lr = rect(label);
          for (const n of nodes) {
            if (area(lr, rect(n)) > 0) overlaps.push(`${(label.textContent ?? '').trim().slice(0, 40)} x ${n.id}`);
          }
        });
        return { clusters, nodes: nodes.length, overlaps };
      });
      results.push({ caption: v.nome, ...medido });
    }
    expect(results.map((r) => r.caption)).toEqual(['Visão geral', 'Fluxo completo']);
    for (const r of results) {
      expect(r.nodes, `${r.caption}: sem nós`).toBeGreaterThan(0);
      expect(r.overlaps, `${r.caption}: nó cobre rótulo de subgraph`).toEqual([]);
    }
    expect(results.reduce((n, r) => n + r.clusters, 0), 'nenhum subgraph medido').toBeGreaterThan(0);
    expect(errors).toEqual([]);
  });
}
