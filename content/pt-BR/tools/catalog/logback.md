---
id: logback
tipo: ferramenta
nome: Logback
tipos:
  - FRAMEWORK
  - BIBLIOTECA
empresa: "[[qos_ch|QOS.ch]]"
aliases:
  - Logback
categorias:
  - "[[logs_estruturados|Logs estruturados]]"
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
  - sem restrições relevantes registradas
dataVerificacao: 2026-11-27
fontePreco: https://logback.qos.ch/
precoMedio: 0
licenca:
  - EPL-2.0
  - LGPL-2.1-only
tags:
  - ferramenta
  - logs-estruturados
---
# Logback
## 📋 Informações Básicas
- **Tipos:** FRAMEWORK, BIBLIOTECA
- **Empresa/Fabricante:** [[qos_ch|QOS.ch]]
- **Website:** https://logback.qos.ch
- **Categorias:** [[logs_estruturados|Logs estruturados]]
- **Modelo de contratação:** open-source, free
- **Preço (USD):** Gratuito, licença dupla EPL-2.0 e LGPL-2.1 (página de licença do projeto lida em 2026-11-27)
- **Data de verificação:** 2026-11-27
- **Fonte do preço:** https://logback.qos.ch/
## 📝 Descrição
Framework de logging para Java em três módulos (core, classic e access): o logback-classic implementa nativamente a API SLF4J e sucede o log4j 1.x.
## ⏰ Quando Utilizar
- Referência da faixa de melhor custo-benefício em [[logs_estruturados|Logs estruturados]] para Java; filtre pela linguagem do projeto no kit.
- Escolha quando a linguagem e o ecossistema do projeto combinam com a ferramenta.
- Backend nativo da SLF4J: o código grava contra a API e a troca de framework de logging acontece na configuração, sem mudar as chamadas.
### Quando NÃO utilizar
- Quando a política de licenças exige licença única permissiva: a dupla EPL-2.0/LGPL-2.1 do projeto pode ser barrada.
- Quando suporte dedicado, SLA ou recursos corporativos forem requisito (a QOS.ch vende suporte comercial à parte).
## 🖥 Compatibilidade e Plataformas
- **Plataformas:** linux, macos, windows, cli
- **Linguagens:** java
- **Porte:** pessoa-fisica, pequena, media, grande
- **Segmentos:** geral
## 🔒 Restrições e Especificações
- sem restrições relevantes registradas
## 🆚 Alternativas
- [[serilog|Serilog]]
- [[tracing|tracing]]
- [[pino|pino]]
- [[zap|zap]]
- [[structlog|structlog]]
- Log4j 2
- reload4j
## 💰 Custo e Contratação
- Gratuito, licença dupla EPL-2.0 e LGPL-2.1 (página de licença do projeto lida em 2026-11-27)
- **Fonte:** https://logback.qos.ch/
## 🔗 Relacionamentos
- **Empresa:** [[qos_ch|QOS.ch]]
- **Categorias:** [[logs_estruturados|Logs estruturados]]
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
