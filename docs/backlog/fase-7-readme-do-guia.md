# README do guia no kit

## Contexto

A Fase 7 da spec previa um README curto do guia e um ADR. O ADR está feito: [0001](../adr/0001-yaml-como-fonte-unica.md). Falta o README que ensina uma pessoa nova a usar e editar o guia dentro do kit. Hoje as informações estão espalhadas entre `docs/content-contract.md`, `docs/architecture.md` e `tools/guide-oracle/README.md`.

## Escopo

1. Criar um documento curto em `docs/` (por exemplo `docs/guia-de-engenharia.md`) em português. A pasta `content/guide/` fica só com os YAML para preservar a cópia byte a byte.
2. Cobrir: o que é o guia, onde fica o YAML (`content/guide/`), como editar uma demanda, como validar (`npm run validate`, e o oráculo enquanto existir), como ver o resultado no site (`npm run build` e `npm run smoke`) e como contribuir pelo fluxo de pull request.
3. Linkar para o contrato de conteúdo, a arquitetura, a tabela de paridade das regras e o ADR, e linkar o novo documento a partir de `README.pt-BR.md` e `README.en.md`.

## Critérios de aceite

- Uma pessoa nova consegue editar uma tarefa, validar e ver a página regenerada seguindo só o documento.
- Todos os comandos do documento foram executados e funcionam.
- O texto não usa travessões nem termos internos, e `npm run validate` passa.
- Os dois READMEs do repositório apontam para o documento.

## Origem

Spec do guia, `.kiro/specs/guia-decisao-engenharia/tasks.md`, tarefas 7.2 (README curto) e 7.3 (ADR, concluída em `docs/adr/0001-yaml-como-fonte-unica.md`), requisitos 14.3, 14.4 e 12.7.
