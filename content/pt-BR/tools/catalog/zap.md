---
id: zap
tipo: ferramenta
nome: zap
tipos:
  - BIBLIOTECA
empresa: "[[uber|Uber]]"
aliases:
  - zap
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
  - go
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
fontePreco: https://github.com/uber-go/zap
precoMedio: 0
licenca:
  - MIT
tags:
  - ferramenta
  - logs-estruturados
---
# zap
## 📋 Informações Básicas
- **Tipos:** BIBLIOTECA
- **Empresa/Fabricante:** [[uber|Uber]]
- **Website:** https://github.com/uber-go/zap
- **Categorias:** [[logs_estruturados|Logs estruturados]]
- **Modelo de contratação:** open-source, free
- **Preço (USD):** Gratuito, licença MIT (arquivo de licença do repositório lido em 2026-11-27)
- **Data de verificação:** 2026-11-27
- **Fonte do preço:** https://github.com/uber-go/zap
## 📝 Descrição
Logger estruturado de alta performance para Go, sem reflexão: encoder JSON sem alocações na base e dois modos de uso, o Logger tipado e o SugaredLogger mais solto.
## ⏰ Quando Utilizar
- Referência da faixa mais barata em [[logs_estruturados|Logs estruturados]] para Go; filtre pela linguagem do projeto no kit.
- Escolha quando a linguagem e o ecossistema do projeto combinam com a ferramenta.
- Hot path sensível a alocação: o Logger base trabalha com campos fortemente tipados e o projeto publica benchmarks próprios frente ao log/slog da biblioteca padrão.
### Quando NÃO utilizar
- Quando a política do time é usar apenas o log/slog da biblioteca padrão de Go, sem dependências externas.
- Quando suporte dedicado, SLA ou recursos corporativos forem requisito.
## 🖥 Compatibilidade e Plataformas
- **Plataformas:** linux, macos, windows, cli
- **Linguagens:** go
- **Porte:** pessoa-fisica, pequena, media, grande
- **Segmentos:** geral
## 🔒 Restrições e Especificações
- sem restrições relevantes registradas
## 🆚 Alternativas
- [[pino|pino]]
- [[structlog|structlog]]
- [[logback|Logback]]
- [[serilog|Serilog]]
- [[tracing|tracing]]
- zerolog
- logrus
## 💰 Custo e Contratação
- Gratuito, licença MIT (arquivo de licença do repositório lido em 2026-11-27)
- **Fonte:** https://github.com/uber-go/zap
## 🔗 Relacionamentos
- **Empresa:** [[uber|Uber]]
- **Categorias:** [[logs_estruturados|Logs estruturados]]
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
