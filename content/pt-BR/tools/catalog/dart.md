---
id: dart
tipo: ferramenta
nome: Dart
tipos:
  - LINGUAGEM
  - SOFTWARE
empresa: "[[google|Google]]"
aliases:
  - Dart
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
  - android
  - ios
  - web
  - linux
  - macos
  - windows
  - cli
linguagens:
  - dart
porte:
  - pessoa-fisica
  - pequena
  - media
  - grande
segmentos:
  - geral
restricoes:
  - sem restrições relevantes registradas
dataVerificacao: 2026-11-27
fontePreco: https://github.com/dart-lang/sdk/blob/main/LICENSE
precoMedio: 0
licenca:
  - BSD-3-Clause
tags:
  - ferramenta
  - linguagem
---
# Dart
## 📋 Informações Básicas
- **Tipos:** LINGUAGEM, SOFTWARE
- **Empresa/Fabricante:** [[google|Google]]
- **Website:** https://dart.dev
- **Categorias:** [[linguagens_programacao|Linguagens de programação]]
- **Modelo de contratação:** open-source, free
- **Preço (USD):** Gratuito, licença BSD-3-Clause (arquivo de licença do SDK oficial lido em 2026-11-27)
- **Licença:** BSD 3-Clause, mantida pela equipe Dart com apoio do Google ("Supported by Google", dart.dev)
- Nota da licença: [[bsd_3_clause|BSD-3-Clause]]
- **Data de verificação:** 2026-11-27
- **Fonte do preço:** https://github.com/dart-lang/sdk/blob/main/LICENSE
## 📝 Descrição
Linguagem otimizada para apps de cliente, com tipagem forte, sound null safety e compilação AOT para ARM, x64 e RISC-V, além de JavaScript e WebAssembly para a web (dart.dev, 2026-11-27). Versão estável atual: 3.14 (dart.dev, 2026-11-27). É a linguagem do [[flutter|Flutter]], com hot reload para iterar UI em execução.
## ⏰ Quando Utilizar
- Outra opção em [[linguagens_programacao|Linguagens de programação]]; filtre pela linguagem do projeto no kit.
- **[[flutter|Flutter]] multiplataforma:** uma base de código para Android, iOS, web e desktop.
- **Apps com UI rica e time único:** hot reload e o modelo client-optimised concentram o esforço em um só lugar.
- **Backend leve e CLIs com o mesmo vocabulário:** os compiladores nativos permitem serviços e ferramentas de linha de comando na mesma linguagem.
### Quando NÃO utilizar
- **Nativo puro por plataforma:** quando cada plataforma exige o máximo da experiência nativa, [[swift|Swift]] (Apple) e [[kotlin|Kotlin]] (Android) entregam mais fundo de plataforma.
- **Lógica já escrita em Kotlin:** times investidos em [[kotlin_multiplatform|Kotlin Multiplatform]] reusam a lógica JVM/Android com UI nativa.
- **Computação científica e dados pesados:** Python segue dominante nesse nicho (qualitativo).
- **Backend corporativo de alta concorrência:** Go, Java e Rust têm ecossistema de servidor mais maduro (qualitativo).
## 🧰 Toolchain embutida
- **dart pub:** gestão de pacotes embutida no SDK, com o repositório pub.dev.
- **package:test:** framework de testes convencional, roda com `dart test`.
- **dart analyze e dart format:** análise estática e formatação embutidas no SDK.
- **dart compile e dart run:** compilação AOT para binário nativo e execução JIT.
- **package:http:** cliente HTTP convencional do pub.dev para consumir APIs.
## 🔄 Ciclo no kit
- **Mobile/UI:** [[flutter|Flutter]]; alternativa multiplataforma: [[kotlin_multiplatform|Kotlin Multiplatform]].
- **Lacuna — Backend:** sem framework convencional com nota no kit; Shelf e Dart Frog são candidatos futuros.
- **Lacuna — ORM:** sem representante convencional com nota no kit.
- **Testes, build/lint e cliente HTTP:** cobertos pela toolchain embutida acima (package:test; dart pub, dart analyze/dart format; package:http).
## 🖥 Compatibilidade e Plataformas
- **Plataformas:** android, ios, web, linux, macos, windows, cli
- **Linguagens:** dart
- **Porte:** pessoa-fisica, pequena, media, grande
- **Segmentos:** geral
## 🔒 Restrições e Especificações
- sem restrições relevantes registradas
## 🆚 Alternativas
- [[swift|Swift]]
- [[kotlin|Kotlin]]
- [[kotlin_multiplatform|Kotlin Multiplatform]]
- [[ruby|Ruby]]
- TypeScript
## 💰 Custo e Contratação
- Gratuito, licença BSD-3-Clause (arquivo de licença do SDK oficial lido em 2026-11-27)
- Nota da licença: [[bsd_3_clause|BSD-3-Clause]]
- **Fonte:** https://github.com/dart-lang/sdk/blob/main/LICENSE
## 🔗 Relacionamentos
- **Empresa:** [[google|Google]]
- **Categorias:** [[linguagens_programacao|Linguagens de programação]]
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
