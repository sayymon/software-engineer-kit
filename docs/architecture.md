# Architecture

The kit is a static site built from Markdown and YAML content, with shared TypeScript libraries used by the site and by the tools.

## Layers

| Folder | Role |
|---|---|
| `content/pt-BR/` | Source of truth. One file per entity, named by its stable id. |
| `content/en/` | Locale overlay. Same relative path as the pt-BR file, translatable fields only. |
| `content/data/` | Pure data (tool table rows, decision matrix, checklist base), validated 1:1 with the source rows. |
| `content/ids.lock.json` | Frozen ids. The validator fails when a locked id disappears. |
| `lib/` | Shared code: `schema`, `content`, `ids`, `wikilinks`, `terms`, `flow-mermaid`. |
| `schema/` | JSON Schemas generated from Zod (`schema/json/`), the vendored guide schema and the frozen id seed. |
| `site/` | Astro project (pages, components, UI strings, public assets). |
| `tools/` | Scripts run with `tsx`: `validate`, `preview`, `schema`, `site`, plus the `private` runner for migration tools that need the private folder. |
| `config/` | `public-terms.txt`, the public ruleset of the `terms` check. |
| `tests/` | Vitest suites. |

## Decisions

- **Astro 7, static output.** Islands (`client:only`, `client:visible`) keep JavaScript off content pages and give Wave B a place for three.js and 3d-force-graph. Pagefind builds an offline search index after `astro build`.
- **Own Markdown pipeline.** `unified` with `remark-parse`, `remark-gfm` and a wikilink plugin. Astro content collections cannot express the pt-BR source plus overlay merge or build-time resolution against a global id index.
- **Node and TypeScript only.** (Node 22.23.4 or newer, TypeScript 7.) One toolchain for CI, the schema, the validators and the site. Python is not part of the build.
- **Single root package.** One `package.json`, one lockfile, no workspaces. `lib/` is imported through the `@lib/*` path alias.
- **Backend readiness.** The site reads content through `lib/content` (`ContentRepository`, filesystem today). The build also emits static JSON (`/{locale}/api/index.json`, `graph.json`, `flows/<id>.json`). A later backend can replace those endpoints, and ids stay the keys for progress, accounts and retrieval.

## Mermaid

`lib/flow-mermaid` ports the reference diagram generator (flow order, ids, Okabe-Ito colors, escapes, views `visao`, `raia:<id>` and `completo`). `tests/mermaid-parity` compares its output byte for byte with goldens produced by the reference. The browser renders diagrams with the vendored Mermaid bundle in `site/public/vendor/mermaid/`, loaded only on pages that contain a diagram, with the Mermaid source in a `<pre>` as the no-JavaScript fallback.

## Validation

`npm run validate` runs the registered checks in `tools/validate/checks/`: `schema`, `links`, `ids`, `ids-lock`, `duplicates`, `terms`, `licenses`. Checks that need the private folder (`manifest`) register only when `private/validate/checks.ts` exists. A check that has nothing to inspect yet reports `n/a`. `npm run validate -- --self-test` proves each check against planted good and bad content.

## Site build (FEAT-003)
- `npm run build` runs `tools/site/build.ts`: `astro build` (both locales into `site/dist`) followed by `pagefind --site site/dist`. `npm run build:pt-BR` and `npm run build:en` build one locale into `site/dist-<locale>` with its own Pagefind index. Env: `SITE_BASE` (path prefix for Pages), `SITE_URL` (canonical origin), `KIT_LOCALES`, `KIT_OUT_DIR`.
- Routing: one catch-all page `site/src/pages/[locale]/[...slug].astro` renders every entity (route equals the content path) plus the generated listings from `site/src/render/routes.ts` (layer pages, section pages, licenses hub, journeys). `/` redirects by `navigator.language`.
- Content access: pages call `site/src/kit.ts`, which reads only through `FsContentRepository` and `SiteIndex` (`lib/content/site.ts`). `SiteIndex` resolves wikilinks to real routes (build fails on an unresolved link), adds heading anchors, computes inverse relations and the typed edge list.
- Renderers (`site/src/render/*.ts`) turn front matter into HTML strings: facts and relation lists per tipo (`SPEC` in `entity.ts`), complexity tables, stack slots and setup checklist, guide diagrams, demand flows. Every value passes through `esc`.
- Design tokens live in `site/src/styles/tokens.css`; Wave B restyles by changing those variables.

## Static API
| Path | Content |
|---|---|
| `/{locale}/api/index.json` | `items`: id, tipo, layer, nome, descricao, url, fallback |
| `/{locale}/api/graph.json` | `nodes` (id, tipo, layer, nome) and `edges` (source, target, kind). `kind` is the relation field name or `body` for wikilinks. Ready for 3d-force-graph |
| `/{locale}/api/flows/<id>.json` | demand flow: raias, decisoes, playbooks and the Mermaid `visao` and `completo` sources |

## Island convention (Wave B)
Interactive parts mount on elements that carry `data-island="<name>"` (plus `data-<name>` attributes for props). Today `data-island="mermaid"` marks each diagram figure; the loader in `site/src/components/Diagram.astro` runs only on pages that contain one and loads `vendor/mermaid/mermaid.min.js` from the local copy. Wave B adds `data-island="graph"` (3d-force-graph fed by `api/graph.json`) the same way: the page emits the placeholder and the data URL, a client script hydrates it, and pages without the attribute ship no extra JavaScript. Use Astro `client:only` or `client:visible` components for larger islands.

## Search
Pagefind indexes the built HTML after `astro build` (`main[data-pagefind-body]`, filter `layer` taken from `data-layer`). One index per `<html lang>`. The header search box submits to `/{locale}/search/?q=...`; `site/src/scripts/search.ts` loads `pagefind/pagefind.js` from the built files, so search works offline from the output folder.

## Preview smoke check
`npm run smoke` (`tools/preview/smoke.ts`) starts `astro preview` on a free port over `site/dist`, fetches the main page kinds in each built locale (home, tool, category, pattern, algorithm, stack, practical guide with the local Mermaid asset, certification, flow, journeys, search, licenses hub, the MIT note once it exists), checks the en fallback marker, the Pagefind files, the static API and every internal link of the built HTML, and exits non-zero on any failure.
