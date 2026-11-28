---
id: tracing_rust
tipo: ferramenta
nome: tracing
tipos:
  - FRAMEWORK
  - BIBLIOTECA
empresa: "[[tokio_empresa|Tokio (empresa)]]"
aliases:
  - tracing
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
  - rust
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
fontePreco: https://github.com/tokio-rs/tracing
precoMedio: 0
licenca:
  - MIT
tags:
  - ferramenta
  - logs-estruturados
---
# tracing
## 📋 Informações Básicas
- **Tipos:** FRAMEWORK, BIBLIOTECA
- **Empresa/Fabricante:** [[tokio_empresa|Tokio (empresa)]]
- **Website:** https://tracing.rs
- **Categorias:** [[logs_estruturados|Logs estruturados]]
- **Modelo de contratação:** open-source, free
- **Preço (USD):** Gratuito, licença MIT (arquivo de licença do repositório lido em 2026-11-27)
- **Data de verificação:** 2026-11-27
- **Fonte do preço:** https://github.com/tokio-rs/tracing
## 📝 Descrição
Framework de instrumentação e diagnóstico estruturado para Rust: spans e eventos com contexto, mantido pelo projeto Tokio e independente do runtime tokio.
## ⏰ Quando Utilizar
- Referência da faixa de melhor custo-benefício em [[logs_estruturados|Logs estruturados]] para Rust; filtre pela linguagem do projeto no kit.
- Escolha quando a linguagem e o ecossistema do projeto combinam com a ferramenta.
- Spans com contexto: a macro #[instrument] anota funções (inclusive async) e o tracing-subscriber coleta, filtra e formata a saída.
### Quando NÃO utilizar
- Quando o executável não vai instalar subscriber: eventos sem subscriber não são coletados.
- Quando suporte dedicado, SLA ou recursos corporativos forem requisito.
## 🖥 Compatibilidade e Plataformas
- **Plataformas:** linux, macos, windows, cli
- **Linguagens:** rust
- **Porte:** pessoa-fisica, pequena, media, grande
- **Segmentos:** geral
## 🔒 Restrições e Especificações
- sem restrições relevantes registradas
## 🆚 Alternativas
- [[logback|Logback]]
- [[serilog|Serilog]]
- [[pino|pino]]
- [[zap|zap]]
- [[structlog|structlog]]
- log (crate)
- env_logger
## 💰 Custo e Contratação
- Gratuito, licença MIT (arquivo de licença do repositório lido em 2026-11-27)
- **Fonte:** https://github.com/tokio-rs/tracing
## 🔗 Relacionamentos
- **Empresa:** [[tokio_empresa|Tokio (empresa)]]
- **Categorias:** [[logs_estruturados|Logs estruturados]]
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
