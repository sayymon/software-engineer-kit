---
id: java
tipo: ferramenta
nome: Java
tipos:
  - LINGUAGEM
  - SOFTWARE
empresa: "[[oracle|Oracle]]"
aliases:
  - Java
  - OpenJDK
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
  - geral
restricoes:
  - "verbosidade e boilerplate maiores que linguagens modernas, mesmo com records e var"
  - "JVM tradicional tem custo de startup e aquecimento JIT relevante para CLIs e serverless; os projetos Leyden (melhor startup e warmup) e CRaC do OpenJDK atacam exatamente isso"
  - "heap da JVM consome mais memória que runtimes nativos como Go e Rust"
dataVerificacao: 2026-11-27
fontePreco: https://openjdk.org/
precoMedio: 0
licenca:
  - GPL-2.0-only
tags:
  - ferramenta
  - linguagem
  - java
---
# Java
## 📋 Informações Básicas
- **Tipos:** LINGUAGEM, SOFTWARE
- **Empresa/Fabricante:** [[oracle|Oracle]]
- **Website:** https://openjdk.org
- **Categorias:** [[linguagens_programacao|Linguagens de programação]]
- **Modelo de contratação:** open-source, free
- **Preço (USD):** Gratuito, OpenJDK sob GPLv2 com Classpath Exception (openjdk.org lido em 2026-11-27)
- **Data de verificação:** 2026-11-27
- **Fonte do preço:** https://openjdk.org/
## 📝 Descrição
Linguagem compilada para bytecode executável na JVM, com tipagem estática forte e concorrência madura. A implementação de referência é o OpenJDK, projeto open-source da comunidade liderado pela [[oracle|Oracle]]: a página oficial descreve binários JDK 27 gratuitos, licenciados sob GPL e prontos para produção em Linux, macOS e Windows, com o JDK 28 em desenvolvimento (openjdk.org, lido em 2026-11-27). Ecossistema corporativo gigante: Spring, Jakarta EE, filas e transações.
## ⏰ Quando Utilizar
- Sistemas corporativos de longa vida, com times grandes e rotatividade de pessoas.
- Ecossistema corporativo maduro: [[spring_boot|Spring Boot]], Jakarta EE, transações e integração enterprise.
- Concorrência madura: threads e virtual threads (projeto Loom listado na página oficial do OpenJDK).
- Backends de alta densidade: o JIT aquecido entrega throughput competitivo em carga sustentada.
### Quando NÃO utilizar
- CLIs de startup instantânea e serverless de função fria: a JVM tradicional aquece; os projetos Leyden e CRaC do OpenJDK atacam o problema, mas [[go|Go]] segue à frente hoje.
- Memória enxuta e binários pequenos: o heap da JVM pesa mais que runtimes nativos; compare com [[rust|Rust]].
- Scripts, glue e exploração de dados: [[python|Python]] e [[javascript|JavaScript]] iteram mais rápido.
- Projetos pequenos: a verbosidade e o boilerplate não se pagam sem escala.
## 🧰 Toolchain embutida
O que o JDK dá sem instalar nada:
- **Compilar e rodar:** javac e java (inclui execução de arquivo único, sem build).
- **Empacotar:** jar.
- **REPL:** jshell.
- **Docs e debug:** javadoc e jdb.
- **Diagnóstico de runtime:** jcmd, jstack e congêneres para threads e heap.
- Fora do embutido: build multi-módulo e ciclo de vida ficam com [[maven|Maven]] no kit.
## 🔁 Ciclo no kit
- **Testes:** [[junit5|JUnit 5]] em [[frameworks_testes|Frameworks de testes]].
- **Build, lint e formatação:** [[maven|Maven]] em [[build_lint_formatacao|Build, lint e formatação]].
- **ORM e acesso a dados:** [[hibernate_orm|Hibernate ORM]] em [[orm_acesso_dados|ORM e acesso a dados]].
- **Frameworks de backend:** [[spring_boot|Spring Boot]] e [[vertx|Vert.x]] em [[frameworks_backend|Frameworks de backend]].
- **Cliente HTTP:** [[okhttp|OkHttp]] em [[clientes_http_api|Clientes HTTP e API]].
- **Serialização JSON:** [[jackson|Jackson]].
- **Logs:** [[logback|Logback]] em [[logs_estruturados|Logs estruturados]].
## 🖥 Compatibilidade e Plataformas
- **Plataformas:** linux, macos, windows, cli (binários OpenJDK oficiais para Linux, macOS e Windows)
- **Linguagens:** java
- **Porte:** pessoa-fisica, pequena, media, grande
- **Segmentos:** geral
## 🔒 Restrições e Especificações
- verbosidade e boilerplate maiores que linguagens modernas, mesmo com records e var
- JVM tradicional tem custo de startup e aquecimento JIT relevante para CLIs e serverless; os projetos Leyden (melhor startup e warmup) e CRaC do OpenJDK atacam exatamente isso
- heap da JVM consome mais memória que runtimes nativos como Go e Rust
## 🆚 Alternativas
- [[kotlin|Kotlin]] - modernidade de linguagem sobre a mesma JVM e o mesmo ecossistema
- [[csharp|C#]] - análogo corporativo na plataforma .NET
- [[go|Go]] - binários estáticos e startup rápida
- [[python|Python]] - produtividade em scripts e dados
## 💰 Custo e Contratação
- Gratuito; OpenJDK sob GPLv2 com Classpath Exception (rodapé legal do openjdk.org lido em 2026-11-27; SPDX: GPL-2.0-only WITH Classpath-exception-2.0, com nota atômica GPL-2.0 no kit). Binários comerciais da Oracle existem para suporte, mas não são requisito para uso.
- **Fonte:** https://openjdk.org/
## 🔗 Relacionamentos
- **Empresa:** [[oracle|Oracle]]
- **Categorias:** [[linguagens_programacao|Linguagens de programação]]
- **Ciclo no kit:** [[junit5|JUnit 5]], [[maven|Maven]], [[hibernate_orm|Hibernate ORM]], [[spring_boot|Spring Boot]], [[vertx|Vert.x]], [[okhttp|OkHttp]], [[jackson|Jackson]], [[logback|Logback]]
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
