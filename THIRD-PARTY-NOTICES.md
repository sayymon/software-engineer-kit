# Third-party notices

This project redistributes the components below. Each keeps its own license.

## Mermaid

- Version: 11.17.2
- License: MIT
- Copyright: 2014 - 2022 Knut Sveidqvist
- Source: https://github.com/mermaid-js/mermaid (npm package `mermaid`, file `dist/mermaid.min.js`)
- Location: `site/public/vendor/mermaid/mermaid.min.js`, license text in `site/public/vendor/mermaid/LICENSE`
- sha256: `581ed7d74bd9048d0e3a91363927d72ef22942d7722546b27f7cc29e35390eb8`
- Check: `tests/vendor/mermaid.test.ts` fails when the file changes. To update, replace the file, record the new version and sha256 here and in the test.
- Use: diagram rendering in the browser, loaded only on pages that contain a diagram. No CDN is used.

## three.js and 3d-force-graph (Ecossistema 3D)
- Packages: `three` 0.187.0 and `3d-force-graph` 1.80.2 (with `three-forcegraph`, `three-render-objects`, `kapsule` and `accessor-fn`), all MIT.
- Source: https://github.com/mrdoob/three.js and https://github.com/vasturiano/3d-force-graph
- Use: the `ecossistema` view mode of the Catalog. Bundled by Astro (Vite) into a lazy chunk, loaded only when that mode opens. No CDN is used.
- Build only: `d3-force-3d` (ISC) computes the layout at build time. `fast-check` (MIT) is a test dependency.

## Mermaid ESM (split build)

- Version: 11.17.2 (same pinned version as the single bundle above)
- License: MIT, copyright 2014 - 2022 Knut Sveidqvist
- Source: npm package `mermaid`, files `dist/mermaid.esm.min.mjs` and `dist/chunks/mermaid.esm.min/*.mjs` (source maps are not copied)
- Location: `site/dist/vendor/mermaid-esm/`, generated at build time by `tools/site/mermaid-esm.ts` from `node_modules`. The folder is build output and is not tracked in git. The license text of the package is copied next to it, as `site/dist/vendor/mermaid-esm/LICENSE`.
- Integrity: the npm lockfile (`package-lock.json`) records the sha512 of the `mermaid` tarball (`sha512-V6K3C8EBdEsPFZXSKMJe6ppQOENxuHARr9GvHX4hh47lAbhMRD9qf4oEK7LoaRQxULMa80/qt5gHO73aCleBBg==`), and `tests/site/mermaid-esm.test.ts` pins version 11.17.2 in `package.json` and in the copied package. To update Mermaid, update the single bundle (version and sha256 above) and the ESM build together, so both load the same version.
- Use: diagram rendering in the browser through `import()` from the same origin. No CDN is used. The single bundle stays as the fallback.

### Packages bundled inside Mermaid 11.17.2

The Mermaid builds (single bundle and ESM chunks) inline their dependencies: the ESM files have no bare package imports, and the code of KaTeX and DOMPurify is present in both builds. The list below comes from `dependencies` in `node_modules/mermaid/package.json`, with the installed version and the `license` field of each package, checked on 2026-11-26 against the lockfile resolution. Mermaid's own `dist` does not carry these license texts, so each package keeps the license published in its npm tarball.

| Package | Installed version | License |
|---|---|---|
| `@braintree/sanitize-url` | 7.1.2 | MIT |
| `@iconify/utils` | 3.1.7 | MIT |
| `@mermaid-js/parser` | 1.2.1 | MIT |
| `@upsetjs/venn.js` | 2.0.0 | MIT |
| `cytoscape` | 3.35.0 | MIT |
| `cytoscape-cose-bilkent` | 4.1.0 | MIT |
| `cytoscape-fcose` | 2.2.0 | MIT |
| `d3` | 7.9.2 | ISC |
| `d3-sankey` | 0.12.3 | BSD-3-Clause |
| `dagre-d3-es` | 7.0.14 | MIT |
| `dayjs` | 1.11.23 | MIT |
| `dompurify` | 3.5.0 | MPL-2.0 OR Apache-2.0 |
| `es-toolkit` | 1.53.2 | MIT |
| `fastdom` | 1.0.12 | MIT |
| `katex` | 0.16.47 | MIT |
| `khroma` | 2.1.0 | MIT (text in the package `license` file; no `license` field in its `package.json`) |
| `marked` | 16.4.2 | MIT |
| `roughjs` | 4.6.6 | MIT |
| `stylis` | 4.4.0 | MIT |
| `ts-dedent` | 2.3.0 | MIT |
| `uuid` | 14.0.3 | MIT |

`@types/d3` (7.4.3, MIT) is also a declared dependency but ships type declarations only. Which of the listed packages end up in a given build depends on tree shaking, and this notice does not claim to have traced each one. It lists every declared dependency so no bundled license is omitted. Run `npm ls mermaid --all` for the current tree.

### Known advisory, accepted risk (katex)

- Advisory: GHSA-238p-pmpm-9mq7 (KaTeX prototype pollution can bypass trust restrictions), severity low, reached through `mermaid` 11.17.2 (`npm audit` reports `katex` 0.11.0 to 0.18.1). The automatic fix moves to Mermaid 12.x, a breaking change.
- Decision: risk accepted by the owner in principle. The text rendered by Mermaid comes from the YAML files of this repository, reviewed by pull request, not from visitors, and Mermaid runs with `securityLevel: 'strict'`.
- Action: evaluate Mermaid 12.x later and move both builds together when it passes the diagram tests.

## npm dependencies

Build and test tooling (Astro, Zod, Ajv, Vitest, jsdom and others) is installed from npm and is not redistributed in the published site, with one exception: the `mermaid` package and the packages it bundles are copied into the built site as described in the Mermaid sections above. Licenses of every package are available through `npm ls --long` and in each package folder.
