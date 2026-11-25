# software-engineer-kit (English)

Português: [README.pt-BR.md](README.pt-BR.md). Overview: [README.md](README.md).

## What the kit is
A place to look things up and use as a guide for software and AI engineering decisions. It gathers tools, fundamentals (patterns, data structures, algorithms and licenses), stacks, practical guides, journeys, skills and certifications, with navigation between related terms. Content is written in Portuguese (pt-BR) and gains an English layer (`content/en`) over time. The site is static (Astro, with Pagefind search).

## Run it locally
Requirement: Node 22.23.4 or newer (Astro 7 requirement).
```bash
npm ci
npm run validate     # schema, ids, terms, licenses
npm test             # unit and parity tests
npm run build        # static site in both locales
npm run smoke        # checks the built site
```
`npm run preview` serves the built site.

## Structure
| Folder | Content |
|---|---|
| `content/` | Markdown notes: `pt-BR` is the source, `en` holds translations |
| `schema/` | Generated JSON Schemas and the frozen id seed |
| `lib/` | Shared libraries (schema, content loader, ids, terms) |
| `tools/` | Validation, site build, smoke and maintenance scripts |
| `site/` | Astro site |
| `docs/` | Architecture, content contract, i18n, publishing, Pages and governance |

## Licenses: what applies to what
| Part | License | File |
|---|---|---|
| Code (`lib/`, `tools/`, `site/`, tests, workflows) | MIT | `LICENSE` |
| Content (notes in `content/`, documentation in `docs/` and community files) | CC BY 4.0 | `LICENSE-CONTENT` |
| Bundled Mermaid in `site/public/vendor/mermaid/` | MIT, own copyright | `site/public/vendor/mermaid/LICENSE` and `THIRD-PARTY-NOTICES.md` |

- **MIT (code):** use, copy, modify and redistribute freely, including commercially. Keep the copyright notice and the license text.
- **CC BY 4.0 (content):** share and adapt the text, including commercially. Credit the author, link the license and say whether you made changes.

Suggested attribution for the content: "software-engineer-kit by Saymon Silva, CC BY 4.0".
Folder-level mapping lives in `REUSE.toml`. New code files carry the `SPDX-License-Identifier` header set to `MIT`. This text is informational and is not legal advice.

## Collaboration flow
1. Fork the repository, or create a branch from `main`.
2. Make the change and run `npm run validate`, `npm test`, `npm run build` and `npm run smoke`.
3. Open a Pull Request to `main`, with a Conventional Commits title.
4. The required checks run on their own: `build-test`, `dependency-review`, `npm-audit`, `codeql`, `secret-scan`, `public-terms`, `reuse` and `actionlint`.
5. The PR needs a review from the code owner (CODEOWNERS: @sayymon). The merge is a squash merge.

`main` does not accept direct pushes. Translations arrive as files under `content/en`, as described in [CONTRIBUTING.md](CONTRIBUTING.md) and `docs/i18n.md`. Code of conduct: [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md). Vulnerabilities: [SECURITY.md](SECURITY.md).

## Release flow
Only the owner creates releases, with SemVer tags (`vX.Y.Z`) on commits that are already on `main`. Pushing the tag starts the `release` workflow. It checks the actor and the tag, runs validation, tests, build and smoke, creates the GitHub Release with generated notes and the site zip, and deploys GitHub Pages from the release. A merge to `main` does not publish the site. Details in `docs/pages.md` and `docs/governance.md`.
