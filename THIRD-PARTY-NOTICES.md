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

## three.js (planned for Wave B)

- License: MIT (license of three.js, recorded here with the version and sha256 when the dependency or vendored file is added)
- Use: 3D graph experience through `3d-force-graph`, loaded as an island on the graph pages only.
- Status: not part of Wave A. This section is a placeholder so the notice exists before the first release that ships it.

## npm dependencies

Build and test tooling (Astro, Zod, Ajv, Vitest and others) is installed from npm and is not redistributed in the published site. Their licenses are available through `npm ls --long` and in each package folder.
