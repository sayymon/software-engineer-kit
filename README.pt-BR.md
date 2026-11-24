# software-engineer-kit (português)

English: [README.en.md](README.en.md). Visão geral: [README.md](README.md).

## O que é o kit
Um lugar para consultar e usar como guia nas decisões de engenharia de software e de IA. Reúne ferramentas, fundamentos (padrões, estruturas de dados, algoritmos e licenças), stacks, guias práticos, jornadas, competências e certificações, com navegação entre os termos relacionados. O conteúdo é escrito em português (pt-BR) e recebe uma camada em inglês (`content/en`) ao longo do tempo. O site é estático (Astro, com busca Pagefind).

## Como rodar localmente
Requisito: Node 22 ou superior.
```bash
npm ci
npm run validate     # schema, ids, termos, licenças
npm test             # testes unitários e de paridade
npm run build        # site estático nos dois idiomas
npm run smoke        # verificação do site construído
```
`npm run preview` serve o site construído.

## Estrutura
| Pasta | Conteúdo |
|---|---|
| `content/` | Notas em Markdown: `pt-BR` é a fonte, `en` guarda as traduções |
| `schema/` | Schemas JSON gerados e a semente de ids congelados |
| `lib/` | Bibliotecas compartilhadas (schema, carregador de conteúdo, ids, termos) |
| `tools/` | Validação, build do site, smoke e scripts de manutenção |
| `site/` | Site Astro |
| `docs/` | Arquitetura, contrato de conteúdo, i18n, publicação, Pages e governança |

## Licenças: o que vale para o quê
| Parte | Licença | Arquivo |
|---|---|---|
| Código (`lib/`, `tools/`, `site/`, testes, workflows) | MIT | `LICENSE` |
| Conteúdo (notas em `content/`, documentação em `docs/` e arquivos de comunidade) | CC BY 4.0 | `LICENSE-CONTENT` |
| Mermaid empacotado em `site/public/vendor/mermaid/` | MIT, com copyright próprio | `site/public/vendor/mermaid/LICENSE` e `THIRD-PARTY-NOTICES.md` |

- **MIT (código):** use, copie, modifique e redistribua, inclusive em produtos comerciais. Mantenha o aviso de copyright e o texto da licença.
- **CC BY 4.0 (conteúdo):** compartilhe e adapte o texto, inclusive para fins comerciais. Dê crédito ao autor, indique o link da licença e informe se houve mudanças.

Atribuição sugerida para o conteúdo: "software-engineer-kit, de Saymon Silva, licença CC BY 4.0".
O mapeamento por pasta fica em `REUSE.toml`. Arquivos de código novos levam o cabeçalho `SPDX-License-Identifier` com o valor `MIT`. Este texto é informativo e não substitui aconselhamento jurídico.

## Como colaborar
1. Faça um fork ou crie uma branch a partir de `main`.
2. Faça a mudança e rode `npm run validate`, `npm test`, `npm run build` e `npm run smoke`.
3. Abra um Pull Request para `main`, com título no padrão Conventional Commits.
4. Os checks obrigatórios rodam sozinhos: `build-test`, `dependency-review`, `npm-audit`, `codeql`, `secret-scan`, `public-terms`, `reuse` e `actionlint`.
5. O PR precisa da revisão do responsável pelo código (CODEOWNERS: @sayymon). O merge é por squash.

`main` não aceita push direto. Traduções entram como arquivos em `content/en`, como descrito em [CONTRIBUTING.md](CONTRIBUTING.md) e `docs/i18n.md`. Regras de conduta: [CODE_OF_CONDUCT.pt-BR.md](CODE_OF_CONDUCT.pt-BR.md). Vulnerabilidades: [SECURITY.md](SECURITY.md).

## Fluxo de release
Somente o responsável cria releases, com tags SemVer (`vX.Y.Z`) em commits que já estão em `main`. O push da tag dispara o workflow `release`, que confere o autor e a tag, roda validação, testes, build e smoke, cria o GitHub Release com notas geradas e o zip do site, e publica o GitHub Pages a partir da release. Um merge em `main` não publica o site. Detalhes em `docs/pages.md` e `docs/governance.md`.
