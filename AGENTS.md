# AGENTS.md

Guia para agentes de IA (Claude Code, OpenCode, Kiro e outros) que trabalham neste repositório.

## O que é o projeto

software-engineer-kit é o guia de trabalho de quem constrói software na era da IA: fluxos de demanda, catálogo de ferramentas, guias práticos, jornadas e decisão (construir, comprar ou assinar). Leia `.kiro/steering/product.md` (visão de produto) e `docs/prd.md` antes de decidir algo de produto.

## Mapa do repositório

| Caminho | Conteúdo |
|---|---|
| `content/guide/comum.yaml` | Catálogos comuns: papéis, artefatos, variáveis, técnicas, requisitos |
| `content/guide/demandas/*.yaml` | Fluxos por demanda (feature, bug, incidente e demais), em raias |
| `content/pt-BR/**`, `content/en/**` | Conteúdo (pt-BR é a fonte, en é overlay) |
| `content/ids.lock.json` | Ids estáveis dos conceitos |
| `schema/`, `tools/` | Esquemas, validação, build e CLI do guia |
| `site/` | Site estático em Astro |
| `docs/` | PRD, arquitetura (C4), ADRs, contratos de conteúdo |
| `.kiro/specs/` | Specs por entrega (requirements, design, tasks) |

## Comandos

```bash
npm ci
npm run validate     # valida conteúdo e esquemas
npm test             # Vitest
npm run build        # gera o site
npm run smoke        # smoke test do build
npm run test:browser # Playwright
npm run guide        # CLI do guia
npm run agents:sync  # regenera os agentes a partir de .agents/
npm run skills:update  # atualiza as skills externas do projeto
npm run skills:restore # restaura as versões fixadas no skills-lock.json
```

## Regras do repositório

- Um conceito, uma nota, um tipo. Fluxos, stacks e guias apontam para a nota e nunca copiam o conteúdo.
- Dados com fonte e data. O que não foi confirmado fica como "não verificado".
- Conteúdo nasce em pt-BR. Ids e campos estruturais ficam fora do overlay `en`.
- Arquivos de código levam `SPDX-License-Identifier: MIT`. Conteúdo é CC BY 4.0.
- Nada de dados pessoais, caminhos absolutos locais, e-mails ou segredos (o check `public-terms` bloqueia).
- Commits e título de PR em Conventional Commits. Merge por squash para `main`.
- Segurança: siga `.kiro/steering/appsec-rules.md` (espelhado em `.claude/rules/`). O gate `.appsec/` roda a cada escrita.
- Trabalho novo segue spec primeiro: `.kiro/specs/<nome>/` com requirements, design e tasks revisados antes do código.

## Agentes por papel

Cada papel de `papeis` em `content/guide/comum.yaml` com `atuacao_de_agente` diferente de `nao` tem um agente. Stakeholder, times dependentes e gerente de engenharia seguem humanos.

| Papel | Agente | Autonomia | MCPs |
|---|---|---|---|
| PM | `pm` | execução | github, context7 |
| Tech Lead | `tech-lead` | execução | github, context7 |
| Arquiteto | `arquiteto` | execução | context7, github |
| Dev | `dev` | execução | context7, github |
| QA | `qa` | execução | playwright, github, context7 |
| Segurança | `seguranca` | execução | github, context7 |
| SRE | `sre` | execução | github, context7 |
| Engenharia de dados | `engenheiro-de-dados` | execução | context7 |
| Designer | `designer` | execução | playwright |
| Suporte | `suporte` | apoio | github |
| DevOps | `devops` | execução | github, context7 |
| Engenharia de IA | `engenheiro-de-ia` | execução | context7, github |
| RTE | `rte` | apoio | github |

- **apoio**: somente leitura. Propõe, a pessoa decide e aplica.
- **execução**: edita arquivos e roda comandos (pede confirmação no OpenCode). O resultado passa por review humano.

Definições: fonte em `.agents/roles/*.md`. Geradas em `.claude/agents/`, `.opencode/agents/` e `.kiro/agents/`. Edite só a fonte e rode `npm run agents:sync`. Detalhes em `.agents/README.md`.

## Token do GitHub

O MCP `github` lê `GITHUB_PERSONAL_ACCESS_TOKEN` do ambiente. Mantenha o token fora do repositório.
