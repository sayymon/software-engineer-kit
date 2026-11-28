---
id: cargo
tipo: ferramenta
nome: Cargo
tipos:
  - SOFTWARE
empresa: "[[rust_foundation|Rust Foundation]]"
aliases:
  - Cargo
categorias:
  - "[[build_lint_formatacao|Build, lint e formatação]]"
funcionalidades: []
casosDeUso: []
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
  - rust
porte:
  - pessoa-fisica
  - pequena
  - media
  - grande
segmentos:
  - desenvolvimento-software
restricoes:
  - Ferramenta embutida no toolchain padrão do Rust, instalada junto com o compilador; não é uma decisão de adoção separada
dataVerificacao: 2026-11-26
fontePreco: https://github.com/rust-lang/cargo
precoMedio: 0
licenca:
  - MIT
  - Apache-2.0
tags:
  - ferramenta
  - build
---
# Cargo
## 📋 Informações Básicas
- **Tipos:** SOFTWARE
- **Empresa/Fabricante:** [[rust_foundation|Rust Foundation]]
- **Website:** https://github.com/rust-lang/cargo
- **Categorias:** [[build_lint_formatacao|Build, lint e formatação]]
- **Modelo de contratação:** open-source, free
- **Preço (USD):** Gratuito, licença dupla MIT/Apache-2.0 (arquivos de licença do repositório lidos em 2026-11-26)
- **Data de verificação:** 2026-11-26
- **Fonte do preço:** https://github.com/rust-lang/cargo
## 📝 Descrição
Gerenciador de pacotes e build do Rust; executa também a suíte de testes do projeto (cargo test).
## ⏰ Quando Utilizar
- Outra opção na faixa qualidade máxima em [[build_lint_formatacao|Build, lint e formatação]]; cobre Rust na matriz de testes do kit como runner embutido no ciclo de build (cargo test).
- Escolha quando a linguagem e o ecossistema do projeto combinam com a ferramenta.
### Quando NÃO utilizar
- Quando a linguagem não é Rust: filtre [[build_lint_formatacao|Build, lint e formatação]] pela linguagem do projeto no kit.
## 🖥 Compatibilidade e Plataformas
- **Plataformas:** linux, macos, windows, cli
- **Linguagens:** rust
- **Porte:** pessoa-fisica, pequena, media, grande
- **Segmentos:** desenvolvimento-software
## 🔒 Restrições e Especificações
- Ferramenta embutida no toolchain padrão do Rust, instalada junto com o compilador; não é uma decisão de adoção separada
## 🆚 Alternativas
- Apache Maven
- [[gradle|Gradle]]
- Bazel
- Nx
## 💰 Custo e Contratação
- Gratuito, licença dupla MIT/Apache-2.0 (arquivos de licença do repositório lidos em 2026-11-26)
- **Fonte:** https://github.com/rust-lang/cargo
## 🔗 Relacionamentos
- **Empresa:** [[rust_foundation|Rust Foundation]]
- **Categorias:** [[build_lint_formatacao|Build, lint e formatação]]
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
