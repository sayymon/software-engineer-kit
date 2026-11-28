// SPDX-License-Identifier: MIT
import { gzipSync } from 'node:zlib';
import { describe, expect, it } from 'vitest';
import { gerarGrafos } from '../../lib/flow-graph';
import { guideDir, loadGuideDoc } from '../../lib/guide';

const LIMITE_GZIP = 200 * 1024;

describe('published Modelo_de_Grafo size (Requirement 17.1, 15.8)', () => {
  const grafos = gerarGrafos(loadGuideDoc(guideDir('content')));

  it('publishes a graph for the non-library demands', () => {
    expect(grafos.size).toBeGreaterThan(0);
  });

  it('keeps every graph at most 200 kB gzip', () => {
    for (const [id, grafo] of grafos) {
      const bytes = gzipSync(Buffer.from(JSON.stringify(grafo)), { level: 9 }).length;
      expect(bytes, `${id}: ${bytes} bytes gzip`).toBeLessThanOrEqual(LIMITE_GZIP);
    }
  });
});
