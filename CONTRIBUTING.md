# Contributing / Como contribuir

Português abaixo. English first.

## English

Thanks for helping. Contributions go through Pull Requests.

1. Fork the repository, or create a branch from `main` if you have write access.
2. Make a focused change. Run `npm ci`, then `npm run validate`, `npm test`, `npm run build` and `npm run smoke`.
3. Commit with [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, `chore:`). The PR title follows the same format, because the merge is a squash merge and the title becomes the commit message.
4. Open the PR to `main` and fill in the template.
5. Wait for the required checks and the code owner review (@sayymon). Address review comments with new commits.

Required checks: `build-test`, `guide-oracle`, `dependency-review`, `npm-audit`, `codeql`, `secret-scan`, `public-terms`, `reuse`, `actionlint`.

### Contributing an English translation
`content/pt-BR/**` is the source. An English overlay lives at the same relative path under `content/en/**` and carries only the translatable fields plus `source_hash`. Read `docs/i18n.md` for the overlay format and the field list. Keep ids and structural fields out of the overlay. `npm run validate` flags a stale overlay when the pt-BR source changes.

### Rules of the repository
- Keep the repository free of personal data, absolute local paths, email addresses and secrets. The `public-terms` check enforces this.
- Code files carry the `SPDX-License-Identifier` header set to `MIT`. Content is CC BY 4.0, see `LICENSE-CONTENT`.
- Releases are created by the owner only.
- Be kind: see [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md). Report vulnerabilities as described in [SECURITY.md](SECURITY.md).

## Português

Obrigado por ajudar. Toda contribuição entra por Pull Request.

1. Faça um fork do repositório, ou crie uma branch a partir de `main` se você tem acesso de escrita.
2. Faça uma mudança focada. Rode `npm ci`, depois `npm run validate`, `npm test`, `npm run build` e `npm run smoke`.
3. Use [Conventional Commits](https://www.conventionalcommits.org/pt-br/) (`feat:`, `fix:`, `docs:`, `chore:`). O título do PR segue o mesmo formato, porque o merge é por squash e o título vira a mensagem do commit.
4. Abra o PR para `main` e preencha o template.
5. Aguarde os checks obrigatórios e a revisão do responsável (@sayymon). Responda aos comentários com novos commits.

Checks obrigatórios: `build-test`, `guide-oracle`, `dependency-review`, `npm-audit`, `codeql`, `secret-scan`, `public-terms`, `reuse`, `actionlint`.

### Contribuir com uma tradução para inglês
`content/pt-BR/**` é a fonte. A camada em inglês fica no mesmo caminho relativo em `content/en/**` e traz apenas os campos traduzíveis mais `source_hash`. Leia `docs/i18n.md` para o formato e a lista de campos. Mantenha ids e campos estruturais fora da camada. O `npm run validate` sinaliza uma tradução desatualizada quando a fonte pt-BR muda.

### Regras do repositório
- Mantenha o repositório livre de dados pessoais, caminhos locais absolutos, emails e segredos. O check `public-terms` garante isso.
- Arquivos de código levam o cabeçalho `SPDX-License-Identifier` com o valor `MIT`. O conteúdo é CC BY 4.0, veja `LICENSE-CONTENT`.
- Somente o responsável cria releases.
- Seja gentil: veja [CODE_OF_CONDUCT.pt-BR.md](CODE_OF_CONDUCT.pt-BR.md). Reporte vulnerabilidades como descrito em [SECURITY.md](SECURITY.md).
