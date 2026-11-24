# Content contract

## Files

- Prose entities: Markdown with YAML front matter. The file name equals the `id` (`content/pt-BR/fundamentals/patterns/circuit_breaker.md`).
- Data entities (demand flows, journeys, competencies): YAML files named by id.
- Layer folders: `tools`, `ai`, `fundamentals`, `stacks`, `guides`, `certifications`, `flows`, `journeys`, `hubs`.
- Folder names, ids, routes and identifiers are English or ascii. Content text is pt-BR first.

## Entity

Every entity has `id`, `tipo` and `nome`. The `tipo` values: `ferramenta`, `categoria`, `caso-de-uso`, `empresa`, `modelo`, `benchmark`, `funcionalidade`, `padrao`, `algoritmo`, `estrutura-de-dados`, `stack`, `guia-pratico`, `certificacao`, `licenca`, `hub`, `demanda`, `jornada`, `competencia`, `tecnica`, `abordagem`, `estrategia`, `requisito`.

- `id`: lowercase ascii snake_case, regex `^[a-z][a-z0-9]*(_[a-z0-9]+)*$`, unique across all types.
- `publico`: boolean. Kept as in the source (all `false` in Wave A).
- `status`: editorial state `rascunho | revisado | publicado` on conceptual types. `modelo` and `certificacao` keep their own lifecycle `status` values.
- `fontes`: list of `Fonte` objects with exactly `id`, `tipo` (`livro | artigo | curso`), `titulo`, `link`, `status_revisao` (`pendente | em_revisao | revisada`) and `proxima_revisao` (ISO date). No other keys.
- `fonte_ids`: ids of entries in `fontes`.
- Dates are ISO strings (`2026-11-22`). A fact that no official source confirmed is written `não verificado`.

The Zod schemas in `lib/schema/` are the single source. `npm run schema:gen` writes JSON Schemas to `schema/json/<tipo>.json` for editors and other consumers, each with an `x-translatable` list.

## Wikilinks

`[[id]]`, `[[id|label]]`, `[[id#section]]` and the embed `![[id]]`, resolved at build against the id index. Links inside code blocks and inline code are plain text. A link to an unknown id fails `npm run validate`.

## Frozen ids

`content/ids.lock.json` lists entity ids and the step ids of each practical guide. Appending is allowed. Removing or changing a locked id fails the `ids-lock` check. The seed comes from `schema/ids-frozen.json`.

## Internal terms

`config/public-terms.txt` lists the patterns that must not appear anywhere in the tracked tree: personal paths, email addresses, personal knowledge base names, secret shapes. Matching of literals ignores case and accents. An optional private list adds more terms (see `docs/publishing.md`).
