// SPDX-License-Identifier: MIT
// Measurement helpers for tests/browser/performance.spec.ts (performance budget, Requirement 15.8 / 20.13).
// No assertions here: the harness only measures and records.
import type { CDPSession, Page } from '@playwright/test';
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { gzipSync } from 'node:zlib';

export const CPU_RATE = 4;
export const RUNS = 10;

/** p95 by the nearest-rank method over the sorted samples. */
export function p95(samples: number[]): number {
  if (!samples.length) throw new Error('p95: sem amostras');
  const sorted = [...samples].sort((a, b) => a - b);
  return sorted[Math.max(0, Math.ceil(0.95 * sorted.length) - 1)];
}

export function round(n: number, digits = 1): number {
  const f = 10 ** digits;
  return Math.round(n * f) / f;
}

/** Throttles the CPU through CDP Emulation.setCPUThrottlingRate (1 = no throttling). */
export async function throttleCpu(page: Page, rate: number): Promise<CDPSession> {
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate });
  return cdp;
}

/** Gzip level 9 size, in bytes, of a payload. */
export function gzipBytes(body: Buffer): number {
  return gzipSync(body, { level: 9 }).length;
}

export type GrupoCarga = 'inicial' | 'diagrama';

export interface Recursos {
  inicial: { arquivos: number; bytes: number; gzipBytes: number };
  diagrama: { arquivos: number; bytes: number; gzipBytes: number };
}

/** Everything under /vendor/mermaid/ belongs to the Diagram load; the rest is the initial load. */
export function grupoDe(url: string): GrupoCarga {
  return new URL(url).pathname.includes('/vendor/mermaid/') ? 'diagrama' : 'inicial';
}

/** Collects the body of every successful response of the page, grouped by load group. */
export function coletarRecursos(page: Page): { resultado: () => Promise<Recursos> } {
  const pendentes: Promise<void>[] = [];
  const recursos: Recursos = {
    inicial: { arquivos: 0, bytes: 0, gzipBytes: 0 },
    diagrama: { arquivos: 0, bytes: 0, gzipBytes: 0 },
  };
  page.on('response', (res) => {
    if (res.status() !== 200) return;
    const url = res.url();
    if (!url.startsWith('http')) return;
    pendentes.push(
      res
        .body()
        .then((body) => {
          const g = recursos[grupoDe(url)];
          g.arquivos += 1;
          g.bytes += body.length;
          g.gzipBytes += gzipBytes(body);
        })
        .catch(() => undefined),
    );
  });
  return {
    resultado: async () => {
      await Promise.all(pendentes);
      return recursos;
    },
  };
}

/** `du -sk <dir>`, in kB (1024 bytes blocks, as reported by du). */
export function duSk(dir: string): number {
  const out = execFileSync('du', ['-sk', dir], { encoding: 'utf8' });
  return Number(out.split(/\s+/)[0]);
}

export function gravarJson(path: string, dados: unknown): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(dados, null, 2)}\n`);
}
