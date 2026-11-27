---
id: maven
tipo: ferramenta
nome: Apache Maven
tipos:
  - SOFTWARE
empresa: "[[apache_software_foundation|Apache Software Foundation]]"
aliases:
  - Maven
  - Apache Maven
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
  - java
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
fontePreco: https://maven.apache.org/
precoMedio: 0
licenca:
  - Apache-2.0
tags:
  - ferramenta
  - build
---
# Apache Maven
## 📋 Informações Básicas
- **Tipos:** SOFTWARE
- **Empresa/Fabricante:** [[apache_software_foundation|Apache Software Foundation]]
- **Website:** https://maven.apache.org/
- **Categorias:** [[build_lint_formatacao|Build, lint e formatação]]
- **Modelo de contratação:** open-source, free
- **Preço (USD):** Gratuito, licença Apache-2.0 (site oficial do projeto lido em 2026-11-27; a licença do projeto aponta para as licenças da Apache Software Foundation)
- **Data de verificação:** 2026-11-27
- **Fonte do preço:** https://maven.apache.org/
## 📝 Descrição
Ferramenta de build para Java que compila, testa e documenta projetos a partir de um único POM (Project Object Model), com ciclo de vida declarativo e gerenciamento de dependências pelo Maven Central.
## ⏰ Quando Utilizar
- Build Java convencional: ciclo de vida padrão (compile, test, package, deploy) definido por convenção a partir do POM.
- Alternativa direta ao [[gradle|Gradle]] quando o projeto valoriza previsibilidade e convenção sobre scripts de build customizados.
- Empacotamento e publicação de artefatos no Maven Central, o repositório padrão do ecossistema JVM.
### Quando NÃO utilizar
- Builds com lógica customizada complexa ou scripts em Kotlin/Groovy: o [[gradle|Gradle]] dá mais flexibilidade.
- Monorepos JVM grandes que dependem de cache incremental e builds paralelos avançados para tempo de build.
## 🖥 Compatibilidade e Plataformas
- **Plataformas:** linux, macos, windows, cli
- **Linguagens:** java
- **Porte:** pessoa-fisica, pequena, media, grande
- **Segmentos:** desenvolvimento-software
## 🔒 Restrições e Especificações
- sem restrições relevantes registradas
## 🆚 Alternativas
- [[gradle|Gradle]]
- Bazel
- Apache Ant
## 💰 Custo e Contratação
- Gratuito, licença Apache-2.0 (site oficial do projeto lido em 2026-11-27; a licença do projeto aponta para as licenças da Apache Software Foundation)
- **Fonte:** https://maven.apache.org/
## 📚 Documentação
- https://maven.apache.org/guides/
## 🔗 Relacionamentos
- **Empresa:** [[apache_software_foundation|Apache Software Foundation]]
- **Categorias:** [[build_lint_formatacao|Build, lint e formatação]]
- **Casos de uso:** [[pipelines_de_ci_e_cd|Pipelines de CI e CD]]
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
