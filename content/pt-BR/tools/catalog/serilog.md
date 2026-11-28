---
id: serilog
tipo: ferramenta
nome: Serilog
tipos:
  - BIBLIOTECA
empresa: "[[serilog_comunidade|Serilog (comunidade)]]"
aliases:
  - Serilog
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
  - csharp
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
fontePreco: https://github.com/serilog/serilog
precoMedio: 0
licenca:
  - Apache-2.0
tags:
  - ferramenta
  - logs-estruturados
---
# Serilog
## 📋 Informações Básicas
- **Tipos:** BIBLIOTECA
- **Empresa/Fabricante:** [[serilog_comunidade|Serilog (comunidade)]]
- **Website:** https://serilog.net
- **Categorias:** [[logs_estruturados|Logs estruturados]]
- **Modelo de contratação:** open-source, free
- **Preço (USD):** Gratuito, licença Apache-2.0 (site oficial lido em 2026-11-27)
- **Data de verificação:** 2026-11-27
- **Fonte do preço:** https://github.com/serilog/serilog
## 📝 Descrição
Biblioteca de logging estruturado para .NET: message templates nomeiam os parâmetros e os serializam como propriedades do evento, com sinks para arquivo, console e outros destinos.
## ⏰ Quando Utilizar
- Referência da faixa de melhor custo-benefício em [[logs_estruturados|Logs estruturados]] para C#; filtre pela linguagem do projeto no kit.
- Escolha quando a linguagem e o ecossistema do projeto combinam com a ferramenta.
- Eventos completos por padrão: as propriedades capturadas ficam prontas para busca e ordenação, em vez de texto interpolado perdido no arquivo.
### Quando NÃO utilizar
- Quando a política do time é usar apenas Microsoft.Extensions.Logging sem camada extra de sinks.
- Quando suporte dedicado, SLA ou recursos corporativos forem requisito.
## 🖥 Compatibilidade e Plataformas
- **Plataformas:** linux, macos, windows, cli
- **Linguagens:** csharp
- **Porte:** pessoa-fisica, pequena, media, grande
- **Segmentos:** geral
## 🔒 Restrições e Especificações
- sem restrições relevantes registradas
## 🆚 Alternativas
- [[logback|Logback]]
- [[tracing|tracing]]
- [[pino|pino]]
- [[zap|zap]]
- [[structlog|structlog]]
- NLog
- Microsoft.Extensions.Logging
## 💰 Custo e Contratação
- Gratuito, licença Apache-2.0 (site oficial lido em 2026-11-27)
- **Fonte:** https://github.com/serilog/serilog
## 🔗 Relacionamentos
- **Empresa:** [[serilog_comunidade|Serilog (comunidade)]]
- **Categorias:** [[logs_estruturados|Logs estruturados]]
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
