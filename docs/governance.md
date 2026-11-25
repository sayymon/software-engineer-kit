# Governance

English first, Português depois.

## English

### Roles and flow
- **Owner** (`@sayymon`): reviews every pull request, merges, and is the only person who creates releases.
- **Contributors**: fork or branch from `main`, open a Pull Request, answer review comments.

Flow: PR to `main`, required checks pass, code owner review, squash merge, owner tags `vX.Y.Z`, the `release` workflow publishes.

### Required checks
Job names, with no workflow prefix, no matrix and no path filters, so they always report:

| Check | Workflow | What it does |
|---|---|---|
| `build-test` | `pr.yml` | `npm ci`, validate, tests, build both locales, smoke |
| `guide-oracle` | `pr.yml` | Python oracle (`tools/guide-oracle`, temporary): validates `content/guide` and runs its pytest suite |
| `dependency-review` | `pr.yml` | Blocks PRs that add dependencies with high severity advisories |
| `npm-audit` | `pr.yml` | `npm audit --audit-level=high` |
| `codeql` | `codeql.yml` | CodeQL for JavaScript and TypeScript |
| `secret-scan` | `pr.yml` | gitleaks over the git history |
| `public-terms` | `pr.yml` | Public ruleset for personal paths, emails, personal knowledge base names and secret shapes |
| `reuse` | `pr.yml` | REUSE license compliance |
| `actionlint` | `pr.yml` | Lints workflow files |

All workflows use `pull_request` (never `pull_request_target`), top-level `permissions: {}` with per-job least privilege, and actions pinned to commit SHAs. Dependabot keeps the pins current.

### Ruleset for `main` (`main-protection`)
Require a pull request with 1 approval and code owner review, dismiss stale approvals on push, require conversation resolution, squash merge only, require the checks above with an up to date branch, require linear history, block force push and deletion.

**Owner bypass trade-off.** A solo owner cannot approve his own PR. The repository admin role bypasses the ruleset in `pull_request` mode: the owner can merge his own PRs but cannot push to `main` directly. The bypass skips the whole ruleset for that PR, including required checks, so the owner waits for green checks by habit. Contributor PRs need code owner review.

### Ruleset for tags (`release-tags`)
Pattern `v*`. Creation, update and deletion are restricted. The admin role bypasses, so only the owner creates tags. The `release` workflow also aborts unless `github.actor` is the owner and the tag commit is on `main`.

### Pages
Source: GitHub Actions. The `github-pages` environment deploys only from tags matching `v*`. Pages deploys from releases only, never from `main` (see `docs/pages.md`).

### Other settings
- Secret scanning with push protection, Dependabot alerts and security updates.
- Private vulnerability reporting (see `SECURITY.md`).
- Merge settings: squash only, PR title and body as the commit message, delete the branch on merge.
- Actions defaults: read-only `GITHUB_TOKEN`, workflows cannot approve PRs, approval required for all outside contributors.
- Optional repository secret `INTERNAL_TERMS_LIST`: extra terms for the `public-terms` check (same format as `config/public-terms.txt`). Forks and repositories without the secret pass with the public list.

### Apply the settings
```bash
bash tools/github/apply-settings.sh            # dry run: prints every API call
bash tools/github/apply-settings.sh --apply    # runs them (needs admin rights on the repository)
bash tools/github/apply-settings.sh --repo owner/name
```
The script updates a ruleset with the same name when it exists.

### Commit identity recommendation
Use the GitHub noreply address for public commits: `<id>+sayymon` on the domain `users.noreply.github.com` (the id comes from `gh api user --jq .id`). Set it only for this repository (`git config user.email ...` without `--global`). In the GitHub account settings, enable "Keep my email addresses private" and "Block command line pushes that expose my email". Commits already pushed keep their old address until the history is rewritten (for example with `git filter-repo --mailmap`).

### Token note
The personal `gh` token lacks the `workflow` scope, so workflow files are pushed over SSH.

## Português

### Papéis e fluxo
- **Responsável** (`@sayymon`): revisa todo Pull Request, faz o merge e é a única pessoa que cria releases.
- **Colaboradores**: fork ou branch a partir de `main`, abrem o Pull Request e respondem à revisão.

Fluxo: PR para `main`, checks obrigatórios verdes, revisão do code owner, merge por squash, o responsável cria a tag `vX.Y.Z`, o workflow `release` publica.

### Checks obrigatórios
Os nomes são os nomes dos jobs, sem prefixo de workflow, sem matriz e sem filtros de caminho, para sempre reportarem. A tabela acima descreve cada um. O check `guide-oracle` roda o oráculo Python temporário (`tools/guide-oracle`), que valida `content/guide` e executa a suíte de testes dele; sai junto com o oráculo no estágio 2. Todos os workflows usam `pull_request` (nunca `pull_request_target`), `permissions: {}` no topo com privilégio mínimo por job, e actions fixadas em SHA de commit. O Dependabot mantém os SHAs atualizados.

### Ruleset de `main` (`main-protection`)
Exigir pull request com 1 aprovação e revisão do code owner, descartar aprovações antigas no push, exigir resolução de conversas, somente squash, exigir os checks acima com branch atualizada, histórico linear, bloquear force push e exclusão.

**Trade-off do bypass do responsável.** Quem trabalha sozinho não aprova o próprio PR. O papel de administrador faz bypass da ruleset no modo `pull_request`: o responsável faz merge dos próprios PRs, mas não faz push direto em `main`. O bypass ignora a ruleset inteira daquele PR, inclusive os checks, então o responsável espera os checks verdes por hábito. PRs de colaboradores exigem revisão do code owner.

### Ruleset de tags (`release-tags`)
Padrão `v*`. Criação, atualização e exclusão são restritas. O papel de administrador faz bypass, então só o responsável cria tags. O workflow `release` também aborta se `github.actor` não for o responsável ou se o commit da tag não estiver em `main`.

### Pages
Fonte: GitHub Actions. O ambiente `github-pages` publica somente de tags `v*`. O Pages publica apenas a partir de releases, nunca de `main` (veja `docs/pages.md`).

### Outras configurações
- Secret scanning com push protection, alertas e atualizações de segurança do Dependabot.
- Relato privado de vulnerabilidades (veja `SECURITY.md`).
- Merge: somente squash, título e corpo do PR como mensagem do commit, apagar a branch após o merge.
- Padrões de Actions: `GITHUB_TOKEN` somente leitura, workflows não aprovam PRs, aprovação exigida para todos os colaboradores externos.
- Secret opcional `INTERNAL_TERMS_LIST`: termos extras para o check `public-terms` (mesmo formato de `config/public-terms.txt`). Forks e repositórios sem o secret passam com a lista pública.

### Aplicar as configurações
```bash
bash tools/github/apply-settings.sh            # dry run: imprime cada chamada da API
bash tools/github/apply-settings.sh --apply    # executa (exige permissão de admin no repositório)
bash tools/github/apply-settings.sh --repo dono/nome
```
O script atualiza a ruleset de mesmo nome quando ela já existe.

### Recomendação de identidade de commit
Use o email noreply do GitHub nos commits públicos: `<id>+sayymon` no domínio `users.noreply.github.com` (o id vem de `gh api user --jq .id`). Configure só neste repositório (`git config user.email ...` sem `--global`). Nas configurações da conta no GitHub, ative "Keep my email addresses private" e "Block command line pushes that expose my email". Commits já enviados mantêm o email antigo até a reescrita do histórico (por exemplo com `git filter-repo --mailmap`).

### Nota sobre o token
O token pessoal do `gh` não tem o escopo `workflow`, então os arquivos de workflow são enviados por SSH.
