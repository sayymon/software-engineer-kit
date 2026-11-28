// SPDX-License-Identifier: MIT
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@lib': fileURLToPath(new URL('./lib', import.meta.url)),
    },
  },
  test: {
    include: ['tests/**/*.test.ts', 'private/tests/**/*.test.ts'],
    exclude: ['node_modules/**', 'tests/browser/**'],
    environment: 'node',
    // Vários testes leem o repositório real e rodam a CLI em subprocesso.
    // Com a suíte inteira em paralelo, o padrão de 5s estoura sem defeito real.
    testTimeout: 30_000,
    hookTimeout: 30_000,
  },
});
