// SPDX-License-Identifier: MIT
// Port of the former Python oracle (see docs/guide-browser-tests.md):
// no g.node may cover the label of a g.cluster (subgraph) in the 2 Mermaid views of each demand page.
// Requires a built site: KIT_LOCALES=pt-BR npm run build
import { expect, test } from '@playwright/test';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const flowsDir = join('site', 'dist', 'pt-BR', 'flows');
if (!existsSync(flowsDir)) throw new Error('site/dist ausente: rode KIT_LOCALES=pt-BR npm run build');

const demands = readdirSync(flowsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory() && existsSync(join(flowsDir, d.name, 'index.html')))
  .filter((d) => readFileSync(join(flowsDir, d.name, 'index.html'), 'utf8').includes('data-island="mermaid"'))
  .map((d) => d.name);

test('o build tem páginas de demanda com diagramas', () => {
  expect(demands.length).toBeGreaterThan(0);
});

for (const demand of demands) {
  test(`sem sobreposição de rótulo de subgraph: ${demand}`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto(`/pt-BR/flows/${demand}/`);
    const figures = page.locator('figure[data-island="mermaid"]');
    await expect(figures).toHaveCount(2);
    for (let i = 0; i < 2; i++) {
      await expect(figures.nth(i)).toHaveAttribute('data-rendered', 'true', { timeout: 60_000 });
    }
    const results = await page.evaluate(() => {
      const rect = (e: Element) => e.getBoundingClientRect();
      const area = (a: DOMRect, b: DOMRect) => {
        const w = Math.min(a.right, b.right) - Math.max(a.left, b.left);
        const h = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
        return w > 1 && h > 1 ? w * h : 0;
      };
      return Array.from(document.querySelectorAll('figure[data-island="mermaid"]')).map((fig) => {
        const caption = fig.querySelector('figcaption')?.textContent?.trim() ?? '';
        const nodes = Array.from(fig.querySelectorAll('g.node'));
        const overlaps: string[] = [];
        let clusters = 0;
        fig.querySelectorAll('g.cluster').forEach((c) => {
          const label = c.querySelector('.cluster-label') ?? c.querySelector('foreignObject') ?? c.querySelector('text');
          if (!label) return;
          clusters++;
          const lr = rect(label);
          for (const n of nodes) {
            if (area(lr, rect(n)) > 0) overlaps.push(`${(label.textContent ?? '').trim().slice(0, 40)} x ${n.id}`);
          }
        });
        return { caption, clusters, nodes: nodes.length, overlaps };
      });
    });
    expect(results.map((r) => r.caption)).toEqual(['Visão geral', 'Fluxo completo']);
    for (const r of results) {
      expect(r.nodes, `${r.caption}: sem nós`).toBeGreaterThan(0);
      expect(r.overlaps, `${r.caption}: nó cobre rótulo de subgraph`).toEqual([]);
    }
    expect(results.reduce((n, r) => n + r.clusters, 0), 'nenhum subgraph medido').toBeGreaterThan(0);
    expect(errors).toEqual([]);
  });
}
