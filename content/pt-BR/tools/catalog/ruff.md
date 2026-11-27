---
id: ruff
tipo: ferramenta
nome: Ruff
tipos:
  - SOFTWARE
empresa: "[[astral|Astral]]"
aliases:
  - Ruff
categorias:
  - "[[build_lint_formatacao|Build, lint e formatação]]"
funcionalidades: []
casosDeUso:
  - "[[pipelines_de_ci_e_cd|Pipelines de CI e CD]]"
modelos: []
modeloContratacao:
  - open-source
  - free
precoUSD: 0
plataformas:
  - linux
  - macos
  - windows
  - cli
linguagens:
  - python
porte:
  - pessoa-fisica
  - pequena
  - media
  - grande
segmentos:
  - desenvolvimento-software
restricoes:
  - sem restrições relevantes registradas
dataVerificacao: 2026-11-27
fontePreco: https://docs.astral.sh/ruff/
precoMedio: 0
licenca:
  - MIT
tags:
  - ferramenta
  - lint
  - formatacao
  - python
---
# Ruff
## 📋 Informações Básicas
- **Tipos:** SOFTWARE
- **Empresa/Fabricante:** [[astral|Astral]]
- **Website:** https://docs.astral.sh/ruff/
- **Categorias:** [[build_lint_formatacao|Build, lint e formatação]]
- **Modelo de contratação:** open-source, free
- **Preço (USD):** Gratuito, licença MIT (arquivo LICENSE do repositório oficial lido em 2026-11-27)
- **Data de verificação:** 2026-11-27
- **Fonte do preço:** https://docs.astral.sh/ruff/
## 📝 Descrição
Linter e formatador de código Python escrito em Rust, com mais de 900 regras embutidas e paridade declarada com Flake8, isort e Black.
## ⏰ Quando Utilizar
- Lint e formatação de Python em uma única ferramenta, no lugar da pilha Flake8 + isort + Black.
- Bases de código grandes onde velocidade importa: a documentação oficial declara 10-100x mais rápido que linters e formatadores existentes.
- Pipelines de CI que rodam lint e formatação a cada mudança, sem custo de licença.
### Quando NÃO utilizar
- Quando o projeto exige estilo de formatação diferente do estilo Black, que o formatador do Ruff segue por paridade.
## 🖥 Compatibilidade e Plataformas
- **Plataformas:** linux, macos, windows, cli
- **Linguagens:** python
- **Porte:** pessoa-fisica, pequena, media, grande
- **Segmentos:** desenvolvimento-software
## 🔒 Restrições e Especificações
- sem restrições relevantes registradas
## 🆚 Alternativas
- [[biome|Biome]] (análogo lint mais formatação em uma ferramenta para JS/TS)
- [[eslint|ESLint]] com [[prettier|Prettier]] no mundo JS/TS
- Flake8
- Black
- isort
- pylint
## 💰 Custo e Contratação
- Gratuito, licença MIT (arquivo LICENSE do repositório oficial lido em 2026-11-27)
- **Fonte:** https://docs.astral.sh/ruff/
## 📚 Documentação
- https://docs.astral.sh/ruff/
## 🔗 Relacionamentos
- **Empresa:** [[astral|Astral]]
- **Categorias:** [[build_lint_formatacao|Build, lint e formatação]]
- **Casos de uso:** [[pipelines_de_ci_e_cd|Pipelines de CI e CD]]
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
