// SPDX-License-Identifier: MIT
// Browser tests against the static build (site/dist). Not part of `npm test` (vitest); run with `npm run test:browser`.
import { defineConfig } from '@playwright/test';

const port = 4321;
export default defineConfig({
  testDir: 'tests/browser',
  testMatch: '**/*.spec.ts',
  timeout: 120_000,
  reporter: [['list']],
  use: { baseURL: `http://127.0.0.1:${port}`, browserName: 'chromium' },
  webServer: {
    command: `npx tsx tests/browser/serve.ts ${port}`,
    url: `http://127.0.0.1:${port}/`,
    reuseExistingServer: true,
  },
});
