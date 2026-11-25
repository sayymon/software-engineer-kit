# Content contract

## Files

- Prose entities: Markdown with YAML front matter. The file name equals the `id` (`content/pt-BR/fundamentals/patterns/circuit_breaker.md`).
- Data entities (demand flows, journeys, competencies): YAML files named by id.
- Layer folders: `tools`, `ai`, `fundamentals`, `stacks`, `guides`, `certifications`, `flows`, `journeys`, `hubs`.
- The engineering guide is the exception: its source is YAML under `content/guide/` (see Guide source), not one file per entity.
- Folder names, ids, routes and identifiers are English or ascii. Content text is pt-BR first.

## Entity

Every entity has `id`, `tipo` and `nome`. The `tipo` values: `ferramenta`, `categoria`, `caso-de-uso`, `empresa`, `modelo`, `benchmark`, `funcionalidade`, `padrao`, `algoritmo`, `estrutura-de-dados`, `stack`, `guia-pratico`, `certificacao`, `licenca`, `hub`, `demanda`, `jornada`, `competencia`, `tecnica`, `abordagem`, `estrategia`, `requisito`, plus the tipos derived from the guide listed under Guide source.

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
## Guide source
`content/guide/` holds the engineering guide as 15 YAML files copied verbatim from the frozen guide commit `7abed1c`: `comum.yaml`, `raias-comuns.yaml`, `ritos.yaml` and `demandas/<demanda>.yaml` (12 demands). It is the single source of the methodology (ADR `docs/adr/0001-yaml-como-fonte-unica.md`). Edit these files directly. The folder is a sibling of `content/pt-BR/`, so `loadContent` does not read it as entity files. `lib/guide/` merges the files with the same semantics as the reference loader (`comum.yaml`, `raias-comuns.yaml`, `ritos.yaml`, then `demandas/*.yaml` in `ordem_das_demandas`, lists concatenated) and derives one typed entity per item. `schema/flows.schema.json` validates the merged document with Ajv.

Derived entities are not files. Their `relPath` is virtual (for example `flows/tarefas/<id>.yaml`), their body is empty, their text falls back to pt-BR in `en`, and every one carries `relacoes` built from the guide reference fields, so inverse relations and `graph.json` stay bidirectional.

| tipo | Guide source | Count | Page |
|---|---|---|---|
| `demanda` | `demandas` (common library plus 12 demands) | 13 | `flows/<id>` |
| `raia` | `raias` | 71 | `flows/raias/<id>` |
| `tarefa` | `decisoes` with `tipo: tarefa` | 151 | `flows/tarefas/<id>` |
| `decisao` | `decisoes` with `tipo: bifurcacao` | 70 | `flows/decisoes/<id>` |
| `no` | `decisoes` with `tipo` inicio, fim or chamada (field `no_tipo`) | 323 | anchor on the lane page |
| `subtarefa` | `decisoes[].subtarefas` | 293 | anchor on the task page |
| `playbook` | `playbooks` | 544 | anchor on the node page |
| `pergunta` | `perguntas` | 451 | anchor on the page of the node or rite it depends on |
| `celula` | `celulas` | 48 | anchor on the demand page |
| `artefato` | `artefatos` | 201 | `flows/artefatos/<id>` |
| `variavel` | `variaveis` | 83 | `flows/variaveis/<id>` |
| `papel` | `papeis` | 16 | `flows/papeis/<id>` |
| `rito` | `ritos` | 16 | `flows/ritos/<id>` |
| `tecnica` | `tecnicas` (Fundamentos, family "Técnicas de engenharia") | 124 | `fundamentals/techniques/<id>` |
| `requisito` | `requisitos` | 4 | `flows/catalog/<id>` |
| `tipo-de-artefato` | `lib/guide/taxonomia.ts` (16 tipos plus 5 legacy) | 21 | `flows/tipos-de-artefato/<id>` |
| `abordagem`, `estrategia`, `categoria-ferramenta`, `fonte-guia`, `padrao-guia` | `abordagens`, `estrategias`, `categorias_ferramenta`, `fontes`, `padroes` | 0 | none yet |

The counts are asserted in `tests/guide/entities.test.ts`. Three guide techniques (`tec_circuit_breaker`, `tec_multi_agent`, `tec_rate_limiting`) are aliases of kit notes through `guia_ids`, so they have no derived entity (127 techniques minus 3 aliases gives 124).

Guide field names that clash with the entity `tipo` are renamed in the derived entity: `no_tipo` (nodes), `artefato_tipo`, `variavel_tipo` and `fonte_tipo`.

### Id rules
- The entity id equals the guide id. A guide id never changes.
- When a guide id collides with an id of another tipo, the later tipo takes the suffix `_<tipo>`. Known case: `seguranca` is both the new demand and a role, so the role is `seguranca_papel`. The loader throws on any other collision.
- Ids that belong to the guide itself use these shapes: a cell is `celula_<demanda>_<requisito>`, an artifact type is `tipo_artefato_<tipo>`, a subtask is `<node>_st<n>`, a node is `<lane>_<letter><n>` (letters s, t, g, c, e) and a lane starts with the `sigla` of its demand.
- Derived ids are appended to `content/ids.lock.json` like any other entity id.

### Catalog replaces matrix
The guide decision (Requirement 6 of its spec) replaces the decision matrix with a catalog that has filters by tipo, category, language, use case and company. Until the unified catalog exists (stage 3 of the migration), the demand page keeps the existing matrix table fed by `content/data/matriz.json`. Which Decisor model wins is open: see `docs/decisor-conflict.md`.

### RACI rules
A node, subtask, question or rite may declare `papel` (responsible), `apoio`, `consultado`, `informado` and, on gateways, `aprova`.
- Approval exists only in quality gateways. `aprova` on any other node warns with `APROVA_FORA_DE_GATEWAY`, and an `aprova` equal to the deciding `papel` warns with `APROVA_REDUNDANTE`.
- The informed roles come from the communications. A communication artifact lists its recipients in `destinatarios` (`COMUNICACAO_SEM_DESTINATARIO`), and a role that is informed holds no other RACI letter in the same item (`RACI_CONFLITO`).
- Every task, gateway, subtask and rite names a `papel` (`SEM_PAPEL`).

### Tipo and subtipo of artifacts
An artifact has a `tipo` from a closed list and, when the tipo has subtypes, a `subtipo` from the closed list of that tipo (`lib/guide/taxonomia.ts`). Current tipos: documento, diagrama, teste, ambiente, acao, evidencia, sinal, dashboard, codigo, commit, pull_request, adr, biblioteca, agente, skill and script. Card, comunicacao and configuracao are subtypes of `acao`, and `dado` is a `documento`. The legacy tipos (`dado`, `decisao`, `card`, `comunicacao`, `configuracao`) stay valid in the schema and warn with `TIPO_LEGADO`. The environments (local, desenvolvimento, sandbox, efemero, qa, staging, homologacao, dr and similar) are subtypes of the tipo `ambiente`.

### Budget terminology
Budget is a gate, not an input to the score. Use "fora do orçamento" for the failing branch of the cost gate (gateway `com_dcs_g1`, return `fora_do_orcamento`) and "custo dentro do previsto ou estimado aceitável" for the passing condition. Short, medium and long term costs, ROI and the cost of not doing it are context for the Decisor and never change its score.

### Demand order
The order of the demands is `ordem_das_demandas` in `comum.yaml`: feature, bug, incidente, chore, seguranca, spike, divida_tecnica, infraestrutura, teste_qa, documentacao, migracao, descontinuacao. The loader merges the demand files in that order, and the `comum` envelope exposes it as `ordem_das_demandas`. Guide validation is described in `docs/architecture.md`; rule parity with the reference validator is tracked in `docs/guide-rules-parity.md`.
