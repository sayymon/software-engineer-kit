---
id: dbt_core
tipo: ferramenta
nome: dbt Core
tipos:
  - FRAMEWORK
empresa: "[[dbt_labs|dbt Labs]]"
aliases:
  - dbt Core
  - dbt
categorias:
  - "[[pipelines_orquestracao_dados|Pipelines e orquestração de dados]]"
funcionalidades: []
casosDeUso:
  - "[[engenharia_de_dados_e_etl|Engenharia de dados e ETL]]"
  - "[[dados_e_analytics|Dados e analytics]]"
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
  - python
  - sql
porte:
  - pessoa-fisica
  - pequena
  - media
  - grande
segmentos:
  - dados-analytics
restricoes:
  - transformação apenas (a carga fica em outra ferramenta)
  - dbt Cloud é produto pago separado (preço não verificado)
dataVerificacao: 2026-11-23
fontePreco: https://github.com/dbt-labs/dbt
precoMedio: 0
tags:
  - ferramenta
  - dados
  - etl
---
# dbt Core
## 📋 Informações Básicas
- **Tipos:** FRAMEWORK
- **Empresa/Fabricante:** [[dbt_labs|dbt Labs]]
- **Website:** https://www.getdbt.com/
- **Categorias:** [[pipelines_orquestracao_dados|Pipelines e orquestração de dados]]
- **Modelo de contratação:** open-source, free
- **Preço (USD):** Gratuito, licença Apache-2.0 (campo license da API do GitHub, lido em 2026-11-23)
- **Data de verificação:** 2026-11-23
- **Fonte do preço:** https://github.com/dbt-labs/dbt
## 📝 Descrição
Framework de transformação de dados em SQL com testes, documentação e linhagem, executado dentro do warehouse.
## ⏰ Quando Utilizar
- Camada de transformação versionada sobre warehouse ou lakehouse.
- Times de analytics engineering com SQL e testes de dados.
### Quando NÃO utilizar
- Ingestão de fontes externas: use Airbyte, Meltano ou Fivetran antes do dbt.
## 🖥 Compatibilidade e Plataformas
- **Plataformas:** linux, macos, windows, cli
- **Linguagens:** python, sql
- **Porte:** pessoa-fisica, pequena, media, grande
- **Segmentos:** dados-analytics
## 🔒 Restrições e Especificações
- transformação apenas (a carga fica em outra ferramenta)
- dbt Cloud é produto pago separado (preço não verificado)
## 🆚 Alternativas
- Dagster
- Apache Airflow
- Meltano
## 💰 Custo e Contratação
- Gratuito, licença Apache-2.0 (campo license da API do GitHub, lido em 2026-11-23)
- **Fonte:** https://github.com/dbt-labs/dbt
## 📚 Documentação
- https://docs.getdbt.com/
## 🔗 Relacionamentos
- **Empresa:** [[dbt_labs|dbt Labs]]
- **Categorias:** [[pipelines_orquestracao_dados|Pipelines e orquestração de dados]]
- **Casos de uso:** [[engenharia_de_dados_e_etl|Engenharia de dados e ETL]], [[dados_e_analytics|Dados e analytics]]
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
