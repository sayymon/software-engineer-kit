# Guide oracle (temporary)

This folder holds the Python implementation of the engineering guide (validator, loader, Mermaid generator, ordering, decisor, HTML preview) copied from the frozen guide commit `7abed1c`. It exists for stage 1 of the guide migration and is removed in stage 2, when the TypeScript code in `lib/guide`, `lib/flows` and `lib/flow-mermaid` becomes the only implementation.

## Why it exists

- It is the reference for the parity proof: the TypeScript loader and Mermaid generator must produce the same document and the same diagrams as the Python code on `content/guide`.
- It carries the rich guide test suite (about 560 tests, including the real-YAML and property tests) so the same checks keep running on the kit copy of the guide until the TypeScript validator covers them.
- The CI job `guide-oracle` (required check) runs the validator and the whole suite on every pull request.

## What is here

- `src/guia_decisao/`: loader, validator, ordem, mermaid_gen, taxonomia, decisor, model, paths, cli, html_gen and rastreio.
- `tests/`: unit and property tests, fixtures, and `browser-disabled/` with the `cdp_*.mjs` browser scripts (not run in stage 1; to be adapted to Playwright against the kit build later).
- `parity.py`: prints the parity JSON (validator output, document hash, Mermaid hashes) for a guide folder.
- `dump_doc.py`: prints the loaded document, or all Mermaid diagrams, as canonical JSON (used by `tests/guide/oracle-parity.test.ts`).
- `PATCHES.md`: every change made to the copied code.

`rastrear_dados` and the other functions of `rastreio.py` are pure data tracing used by `html_gen.py` and five test files, so the module stays even though it was not on the original list of modules to bring. `html_gen.py` stays only because nine test files import it.

## Run

```sh
python3.12 -m venv /tmp/oracle-venv
/tmp/oracle-venv/bin/pip install -r requirements.txt
cd tools/guide-oracle
PYTHONPATH=src /tmp/oracle-venv/bin/python -m guia_decisao.cli validar --estrito --yaml ../../content/guide --schema ../../schema/flows.schema.json
PYTHONPATH=src /tmp/oracle-venv/bin/python -m pytest -q -p no:cacheprovider
```

The full suite takes about 7 minutes. Integration tests (they need Chrome and mermaid-cli) are skipped unless `--integration` is given.

`GUIA_DIR` and `GUIA_SCHEMA` override the guide folder and the schema (defaults: `content/guide` and `schema/flows.schema.json` of the kit). The vitest differential test runs with `GUIDE_ORACLE_PYTHON=/tmp/oracle-venv/bin/python npx vitest run tests/guide tests/mermaid-parity`.
