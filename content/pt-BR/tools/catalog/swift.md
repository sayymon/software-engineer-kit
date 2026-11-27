---
id: swift
tipo: ferramenta
nome: Swift
tipos:
  - LINGUAGEM
  - SOFTWARE
empresa: "[[apple|Apple]]"
aliases:
  - Swift
categorias:
  - "[[linguagens_programacao|Linguagens de programação]]"
funcionalidades: []
casosDeUso: []
modelos: []
modeloContratacao:
  - open-source
  - free
precoUSD: 0
plataformas:
  - macos
  - ios
  - linux
  - windows
  - cli
linguagens:
  - swift
porte:
  - pessoa-fisica
  - pequena
  - media
  - grande
segmentos:
  - geral
restricoes:
  - desenvolvimento para plataformas Apple exige um Mac com Xcode; o toolchain oficial também roda em Linux e Windows (server, CLI e CI)
dataVerificacao: 2026-11-27
fontePreco: https://www.swift.org/legal/license.html
precoMedio: 0
licenca:
  - Apache-2.0
tags:
  - ferramenta
  - linguagem
---
# Swift
## 📋 Informações Básicas
- **Tipos:** LINGUAGEM, SOFTWARE
- **Empresa/Fabricante:** [[apple|Apple]]
- **Website:** https://www.swift.org
- **Categorias:** [[linguagens_programacao|Linguagens de programação]]
- **Modelo de contratação:** open-source, free
- **Preço (USD):** Gratuito, licença Apache-2.0 (página de licença oficial consultada em 2026-11-27)
- **Licença:** Apache 2.0 com Runtime Library Exception, que dispensa a atribuição em binários distribuídos compilados com Swift
- Nota da licença: [[apache_2_0|Apache-2.0]]
- **Data de verificação:** 2026-11-27
- **Fonte do preço:** https://www.swift.org/legal/license.html
## 📝 Descrição
Linguagem compilada, open source e multiplataforma criada pela [[apple|Apple]], com segurança de memória e de concorrência exigidas em tempo de compilação (swift.org, 2026-11-27). Versão estável atual: 6.4.3 (swift.org, 2026-11-27). Roda das plataformas Apple (iOS, macOS, tvOS, watchOS) a servidores Linux, CLIs e firmware, com interoperabilidade nativa com C e C++ (swift.org, 2026-11-27).
## ⏰ Quando Utilizar
- Outra opção em [[linguagens_programacao|Linguagens de programação]]; filtre pela linguagem do projeto no kit.
- **Plataformas Apple:** primeira escolha para apps iOS, macOS, tvOS e watchOS, com [[swiftui|SwiftUI]] e [[swift_composable_architecture|Swift Composable Architecture]].
- **Serviços e APIs:** server-side com [[vapor|Vapor]] em Linux.
- **CLIs e sistemas:** binários rápidos com segurança de memória e interop direta com C/C++.
- **Código seguro por padrão:** data race safety verificada em tempo de compilação (swift.org, 2026-11-27).
### Quando NÃO utilizar
- **Android como alvo primário:** Swift não cobre Android; prefira [[kotlin|Kotlin]] nativo ou [[kotlin_multiplatform|Kotlin Multiplatform]].
- **Multiplataforma com um único time pequeno:** [[dart|Dart]] com Flutter cobre Android e iOS com uma base de código.
- **Hosting amplo e CMSs:** sem equivalente ao ecossistema de hosting compartilhado de [[php|PHP]] ou do WordPress.
- **Prototipagem dinâmica rápida:** como linguagem compilada e fortemente tipada, itera menos rápido que [[ruby|Ruby]] ou Python nessa faixa.
## 🧰 Toolchain embutida
- **Swift Package Manager:** build, run e gestão de pacotes (`swift build`, `swift run`, `swift test`).
- **XCTest e Swift Testing:** frameworks de teste embutidos no Xcode e no `swift test`.
- **Xcode:** IDE oficial para plataformas Apple (exige macOS).
- **URLSession:** cliente HTTP embutido para consumir APIs.
- **swift-format e SwiftLint:** formatação e lint convencionais do ecossistema.
## 🔄 Ciclo no kit
- **Backend:** [[vapor|Vapor]]
- **Mobile/UI:** [[swiftui|SwiftUI]], [[swift_composable_architecture|Swift Composable Architecture]]
- **Lacuna — ORM:** sem representante convencional com nota no kit; Core Data e GRDB são candidatos futuros.
- **Testes e cliente HTTP:** cobertos pela toolchain embutida acima (XCTest/Swift Testing; URLSession).
## 🖥 Compatibilidade e Plataformas
- **Plataformas:** macos, ios, linux, windows, cli
- **Linguagens:** swift
- **Porte:** pessoa-fisica, pequena, media, grande
- **Segmentos:** geral
## 🔒 Restrições e Especificações
- desenvolvimento para plataformas Apple exige um Mac com Xcode; o toolchain oficial também roda em Linux e Windows (server, CLI e CI)
## 🆚 Alternativas
- [[kotlin|Kotlin]]
- [[dart|Dart]]
- [[kotlin_multiplatform|Kotlin Multiplatform]]
- [[ruby|Ruby]]
- Rust
## 💰 Custo e Contratação
- Gratuito, licença Apache-2.0 com Runtime Library Exception (página de licença oficial consultada em 2026-11-27)
- Nota da licença: [[apache_2_0|Apache-2.0]]
- **Fonte:** https://www.swift.org/legal/license.html
## 🔗 Relacionamentos
- **Empresa:** [[apple|Apple]]
- **Categorias:** [[linguagens_programacao|Linguagens de programação]]
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
