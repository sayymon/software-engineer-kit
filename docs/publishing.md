# Publishing

## Public scope

Everything tracked by git is public: `content/`, `site/`, `docs/`, `lib/`, `tools/`, `tests/`, `schema/`, `config/`, `.github/`, `LICENSE*`, `REUSE.toml`, `THIRD-PARTY-NOTICES.md` and the READMEs. The repository builds, validates and tests with nothing else.

## The private folder

`private/` is gitignored and exists only on the owner's machine. It mirrors the repository layout and holds the inputs of the one-time migration from the owner's notes:

| Path | Content |
|---|---|
| `private/config/` | Source folder map and the private internal-terms list. |
| `private/tools/migrate/`, `private/tools/linkback/` | Migration and link-back tools, with the redaction rules. |
| `private/migration/` | Manifest, counts, term hits, unresolved links and exclusions. |
| `private/validate/` | Checks that need the private inputs (`manifest`). |
| `private/tests/` | Tests that need the private inputs or the real term list. |
| `private/reports/`, `private/docs/` | Migration reports and field mappings. |

Without `private/` (a fresh clone, CI), `npm run validate`, `npm test`, `npm run build` and `npm run smoke` pass. `npm run migrate` and `npm run linkback` exit with code 2 and the message `private/ folder not found`.

Keeping a backup of `private/` is the owner's choice. Running `git init` inside it is safe, because the outer `.gitignore` hides the folder.

## Terms gate

`npm run validate` runs the `terms` check over the whole tracked tree. It loads:

1. `config/public-terms.txt` (always): personal paths, email addresses, personal knowledge base names and secret shapes.
2. `private/config/internal-terms.txt` (when the file exists): company and culture terms and source folder names.
3. The file named by the environment variable `KIT_EXTRA_TERMS_FILE` (when set).

Pull request CI runs with the public list. When the optional repository secret `INTERNAL_TERMS_LIST` is set, the workflow writes it to a temporary file and sets `KIT_EXTRA_TERMS_FILE`, so the private terms also gate pull requests without being published. The secret is optional: forks and unconfigured repositories pass with the public list.

Not scanned: `.git`, `node_modules`, build output, `private/`, the `.agents` scratch folder, the vendored bundles under `site/public/vendor`, `package-lock.json` and `config/public-terms.txt`.

## Redaction rules

Content cleanup runs through the migration's redaction rules (`private/tools/migrate/redactions.json`, key `rules`). A rule is a regular expression, a replacement and a reason, and applies to every migrated text. `npx tsx private/tools/migrate/apply-rules.ts` applies the same rules to the current `content/` files and is idempotent.

## Licenses

Code is MIT (`LICENSE`). Content and docs are CC BY 4.0 (`LICENSE-CONTENT`). `REUSE.toml` maps folders to licenses. Third-party components are listed in `THIRD-PARTY-NOTICES.md`.

## Release checklist

1. `npm ci`, `npm run validate`, `npm test`, `npm run build` and `npm run smoke` pass on a fresh clone.
2. The terms scan reports 0 hits.
3. The README licensing section matches `REUSE.toml`.
4. GitHub Pages is enabled with source GitHub Actions (see `docs/pages.md`).
