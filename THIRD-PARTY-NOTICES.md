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
## npm dependencies

Build and test tooling (Astro, Zod, Ajv, Vitest and others) is installed from npm and is not redistributed in the published site. Their licenses are available through `npm ls --long` and in each package folder.
