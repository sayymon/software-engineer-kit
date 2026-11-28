---
id: biome
tipo: ferramenta
nome: Biome
tipos:
  - SOFTWARE
empresa: "[[biome_comunidade|Biome (comunidade)]]"
aliases:
  - Biome
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
  - javascript
  - typescript
porte:
  - pessoa-fisica
  - pequena
  - media
  - grande
segmentos:
  - desenvolvimento-software
restricoes:
  - Compatibilidade de formatação com Prettier declarada em 97% pela documentação oficial, com limitações conhecidas documentadas
dataVerificacao: 2026-11-27
fontePreco: https://biomejs.dev/
precoMedio: 0
licenca:
  - MIT
  - Apache-2.0
tags:
  - ferramenta
  - lint
  - formatacao
---
# Biome
## 📋 Informações Básicas
- **Tipos:** SOFTWARE
- **Empresa/Fabricante:** [[biome_comunidade|Biome (comunidade)]]
- **Website:** https://biomejs.dev/
- **Categorias:** [[build_lint_formatacao|Build, lint e formatação]]
- **Modelo de contratação:** open-source, free
- **Preço (USD):** Gratuito, licenças duplas MIT e Apache-2.0 (arquivos LICENSE-MIT e LICENSE-APACHE do repositório oficial lidos em 2026-11-27)
- **Data de verificação:** 2026-11-27
- **Fonte do preço:** https://biomejs.dev/
## 📝 Descrição
Toolchain para web que faz lint, formatação e organização de imports em uma única ferramenta e um único comando (biome check), cobrindo JavaScript, TypeScript, JSX, JSON, HTML, CSS, SCSS, GraphQL, YAML e Markdown.
## ⏰ Quando Utilizar
- Lint, formatação e organização de imports em uma ferramenta só, no lugar do par [[eslint|ESLint]] + [[prettier|Prettier]].
- CI onde o tempo de formatação importa: o benchmark oficial declara cerca de 35x mais rápido que Prettier ao formatar 171 mil linhas.
- Lint com cobertura ampla: a documentação oficial declara 844 regras vindas de ESLint, TypeScript ESLint e outras fontes.
### Quando NÃO utilizar
- Quando o projeto depende de plugins ou regras ESLint específicas ainda não cobertas pelo conjunto de regras do Biome.
- Quando a paridade total com a saída do Prettier é requisito: a compatibilidade declarada é de 97%, com limitações conhecidas.
## 🖥 Compatibilidade e Plataformas
- **Plataformas:** linux, macos, windows, cli
- **Linguagens:** javascript, typescript
- **Porte:** pessoa-fisica, pequena, media, grande
- **Segmentos:** desenvolvimento-software
## 🔒 Restrições e Especificações
- Compatibilidade de formatação com Prettier declarada em 97% pela documentação oficial, com limitações conhecidas documentadas
## 🆚 Alternativas
- [[eslint|ESLint]]
- [[prettier|Prettier]]
- [[ruff|ruff]] (análogo Python)
- dprint
## 💰 Custo e Contratação
- Gratuito, licenças duplas MIT e Apache-2.0 (arquivos LICENSE-MIT e LICENSE-APACHE do repositório oficial lidos em 2026-11-27)
- **Fonte:** https://biomejs.dev/
## 📚 Documentação
- https://biomejs.dev/guides/getting-started
## 🔗 Relacionamentos
- **Empresa:** [[biome_comunidade|Biome (comunidade)]]
- **Categorias:** [[build_lint_formatacao|Build, lint e formatação]]
- **Casos de uso:** [[pipelines_de_ci_e_cd|Pipelines de CI e CD]]
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
