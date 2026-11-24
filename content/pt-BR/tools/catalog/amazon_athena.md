---
id: amazon_athena
tipo: ferramenta
nome: Amazon Athena
tipos:
  - PLATAFORMA
  - SERVICO
empresa: "[[amazon_web_services|Amazon Web Services]]"
aliases:
  - Amazon Athena
categorias:
  - "[[warehouse_lakehouse|Data warehouse e lakehouse]]"
funcionalidades: []
casosDeUso:
  - "[[engenharia_de_dados_e_etl|Engenharia de dados e ETL]]"
modelos: []
modeloContratacao:
  - subscription
precoUSD: 5
plataformas:
  - cloud
  - web
  - cli
linguagens:
  - sql
porte:
  - pessoa-fisica
  - pequena
  - media
  - grande
segmentos:
  - geral
restricoes:
  - precoUSD é a tarifa de TB escaneado, não um valor mensal
dataVerificacao: 2026-11-21
fontePreco: https://aws.amazon.com/athena/pricing/
precoMedio: 0
tags:
  - ferramenta
  - warehouse-lakehouse
---
# Amazon Athena
## 📋 Informações Básicas
- **Tipos:** PLATAFORMA, SERVICO
- **Empresa/Fabricante:** [[amazon_web_services|Amazon Web Services]]
- **Website:** https://aws.amazon.com/athena/
- **Categorias:** [[warehouse_lakehouse|Data warehouse e lakehouse]]
- **Modelo de contratação:** subscription
- **Preço (USD):** US$ 5 por TB escaneado (plano On-demand, página oficial consultada em 2026-11-21)
- **Data de verificação:** 2026-11-21
- **Fonte do preço:** https://aws.amazon.com/athena/pricing/
## 📝 Descrição
SQL serverless sobre dados no S3, cobrado por consulta.
## ⏰ Quando Utilizar
- Referência da faixa melhor custo-benefício em [[warehouse_lakehouse|Data warehouse e lakehouse]].
- Escolha para o melhor equilíbrio entre custo, capacidade e esforço de adoção.
### Quando NÃO utilizar
- Quando o orçamento precisa ser zero ou o requisito é o máximo de recursos corporativos.
## 🖥 Compatibilidade e Plataformas
- **Plataformas:** cloud, web, cli
- **Linguagens:** sql
- **Porte:** pessoa-fisica, pequena, media, grande
- **Segmentos:** geral
## 🔒 Restrições e Especificações
- precoUSD é a tarifa de TB escaneado, não um valor mensal
## 🆚 Alternativas
- [[clickhouse|ClickHouse]]
- DuckDB
- Trino
- [[motherduck|MotherDuck]]
- [[google_bigquery|Google BigQuery]]
- [[snowflake|Snowflake]]
- Databricks
- [[amazon_redshift|Amazon Redshift (ferramenta)]]
## 💰 Custo e Contratação
- US$ 5 por TB escaneado (plano On-demand, página oficial consultada em 2026-11-21)
- **Fonte:** https://aws.amazon.com/athena/pricing/
## 🔗 Relacionamentos
- **Empresa:** [[amazon_web_services|Amazon Web Services]]
- **Categorias:** [[warehouse_lakehouse|Data warehouse e lakehouse]]
- **Nota anterior:** AWS Athena
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
