---
id: pino
tipo: ferramenta
nome: pino
tipos:
  - BIBLIOTECA
empresa: "[[pino_comunidade|pino (comunidade)]]"
aliases:
  - pino
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
  - javascript
  - typescript
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
fontePreco: https://github.com/pinojs/pino
precoMedio: 0
licenca:
  - MIT
tags:
  - ferramenta
  - logs-estruturados
---
# pino
## 📋 Informações Básicas
- **Tipos:** BIBLIOTECA
- **Empresa/Fabricante:** [[pino_comunidade|pino (comunidade)]]
- **Website:** https://getpino.io
- **Categorias:** [[logs_estruturados|Logs estruturados]]
- **Modelo de contratação:** open-source, free
- **Preço (USD):** Gratuito, licença MIT (arquivo de licença do repositório lido em 2026-11-27)
- **Data de verificação:** 2026-11-27
- **Fonte do preço:** https://github.com/pinojs/pino
## 📝 Descrição
Logger JSON de baixo overhead para Node.js: eventos estruturados com child loggers, redaction e processamento de logs em worker threads (transports).
## ⏰ Quando Utilizar
- Referência da faixa mais barata em [[logs_estruturados|Logs estruturados]] para JavaScript e TypeScript; filtre pela linguagem do projeto no kit.
- Escolha quando a linguagem e o ecossistema do projeto combinam com a ferramenta.
- Overhead baixo em produção: os docs do projeto recomendam enviar, formatar e processar logs em processo separado (worker thread) para não travar o event loop do Node.js.
### Quando NÃO utilizar
- Quando é preciso log legível e colorido em desenvolvimento sem módulo extra: o pino imprime JSON bruto e o pretty printing é um módulo separado (pino-pretty).
- Quando suporte dedicado, SLA ou recursos corporativos forem requisito.
## 🖥 Compatibilidade e Plataformas
- **Plataformas:** linux, macos, windows, cli
- **Linguagens:** javascript, typescript
- **Porte:** pessoa-fisica, pequena, media, grande
- **Segmentos:** geral
## 🔒 Restrições e Especificações
- sem restrições relevantes registradas
## 🆚 Alternativas
- [[zap|zap]]
- [[structlog|structlog]]
- [[logback|Logback]]
- [[serilog|Serilog]]
- [[tracing|tracing]]
- winston
- bunyan
## 💰 Custo e Contratação
- Gratuito, licença MIT (arquivo de licença do repositório lido em 2026-11-27)
- **Fonte:** https://github.com/pinojs/pino
## 🔗 Relacionamentos
- **Empresa:** [[pino_comunidade|pino (comunidade)]]
- **Categorias:** [[logs_estruturados|Logs estruturados]]
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
