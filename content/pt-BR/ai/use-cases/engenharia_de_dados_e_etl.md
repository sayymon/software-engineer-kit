---
id: engenharia_de_dados_e_etl
tipo: caso-de-uso
nome: Engenharia de dados e ETL
aliases: []
descricao: Coletar, transformar e carregar dados com pipelines confiáveis e observáveis.
funcionalidadesNecessarias:
  - "[[orquestracao_de_fluxos|Orquestração de fluxos]]"
  - "[[automacao_de_workflow|Automação de workflow]]"
  - "[[saida_estruturada|Saída estruturada]]"
  - "[[web_scraping_funcionalidade|Web scraping]]"
  - "[[integracao_de_apis|Integração de APIs]]"
categoriasRelacionadas:
  - "[[filas_jobs_background|Filas e jobs em background]]"
  - "[[web_scraping|Ferramentas de web scraping]]"
  - "[[warehouse_lakehouse|Data warehouse e lakehouse]]"
  - "[[mensageria_streaming|Mensageria e streaming]]"
  - "[[validacao_schemas|Validação e schemas]]"
  - "[[captura_mudancas_event_store|Captura de mudanças e event store]]"
  - "[[pipelines_orquestracao_dados|Pipelines e orquestração de dados]]"
ferramentasRecomendadas:
  - "[[inngest|Inngest]]"
  - "[[firecrawl|Firecrawl]]"
  - "[[motherduck|MotherDuck]]"
  - "[[google_bigquery|Google BigQuery]]"
  - "[[amazon_athena|Amazon Athena]]"
modelosRecomendados: []
criteriosDesempate:
  - custo
  - privacidade-de-dados
  - lock-in
criterioPadrao: lock-in
porte:
  - pequena
  - media
  - grande
segmentos:
  - dados-analytics
  - software-saas
nicho: ""
nivel: caso
eixo: tarefa
macro: "[[dados_e_analytics|Dados e analytics]]"
faixasPadrao:
  maisBarata:
    - "[[bullmq|BullMQ]]"
    - tabela:celery
    - tabela:rq
  custoBeneficio:
    - "[[inngest|Inngest]]"
    - tabela:trigger-dev
    - tabela:dramatiq
  qualidadeMaxima:
    - "[[temporal|Temporal]]"
    - tabela:apache-airflow
    - tabela:prefect
variacoes:
  - id: etl-orquestracao
    nome: Orquestração de pipelines
    descricao: Dependências, agendas e reexecução.
    funcionalidades:
      - "[[orquestracao_de_fluxos|Orquestração de fluxos]]"
      - "[[automacao_de_workflow|Automação de workflow]]"
    herdaFerramentas: true
    parametros:
      - chave: Linguagem ou runtime
        valor: Python ou TypeScript com agendador
        fonte: editorial
      - chave: Escala típica
        valor: Dezenas de pipelines
        fonte: editorial
      - chave: Etapa do pipeline
        valor: Agenda, dependência e reexecução
        fonte: editorial
  - id: etl-extracao-web-api
    nome: Extração de web e APIs
    descricao: Coleta de fontes externas com limites e retentativas.
    funcionalidades:
      - "[[web_scraping_funcionalidade|Web scraping]]"
      - "[[integracao_de_apis|Integração de APIs]]"
    herdaFerramentas: false
    maisBarata:
      - tabela:crawl4ai
      - tabela:scrapy
      - "[[playwright|Playwright]]"
    custoBeneficio:
      - "[[firecrawl|Firecrawl]]"
      - tabela:apify
      - tabela:jina-reader
    qualidadeMaxima:
      - tabela:bright-data
      - tabela:zyte
      - tabela:browserbase
    justificativaFerramentas: "Muda Etapa do pipeline para coleta com limites e retentativas: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Linguagem ou runtime
        valor: Python com cliente HTTP e navegador
        fonte: editorial
      - chave: Escala típica
        valor: Centenas de fontes externas
        fonte: editorial
      - chave: Etapa do pipeline
        valor: Coleta com limites e retentativas
        fonte: editorial
  - id: etl-transformacao-sql
    nome: Transformação em SQL
    descricao: Modelos testados e versionados no warehouse.
    funcionalidades:
      - "[[geracao_de_codigo|Geração de código]]"
      - "[[saida_estruturada|Saída estruturada]]"
    herdaFerramentas: false
    maisBarata:
      - "[[clickhouse|ClickHouse]]"
      - tabela:duckdb
      - tabela:trino
    custoBeneficio:
      - "[[motherduck|MotherDuck]]"
      - "[[google_bigquery|Google BigQuery]]"
      - "[[amazon_athena|Amazon Athena]]"
    qualidadeMaxima:
      - "[[snowflake|Snowflake]]"
      - tabela:databricks
      - "[[amazon_redshift|Amazon Redshift (ferramenta)]]"
    justificativaFerramentas: "Muda Etapa do pipeline para modelagem testada e versionada: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Linguagem ou runtime
        valor: SQL select com Jinja e YAML no dbt
        fonte: https://docs.getdbt.com/docs/introduction
      - chave: Escala típica
        valor: Centenas de modelos no warehouse
        fonte: editorial
      - chave: Etapa do pipeline
        valor: Modelagem testada e versionada
        fonte: editorial
    verificadoEm: 2026-11-22
  - id: etl-streaming-eventos
    nome: Streaming de eventos
    descricao: Processamento contínuo de eventos.
    funcionalidades:
      - "[[orquestracao_de_fluxos|Orquestração de fluxos]]"
      - "[[automacao_de_workflow|Automação de workflow]]"
    herdaFerramentas: false
    maisBarata:
      - "[[rabbitmq|RabbitMQ]]"
      - "[[nats|NATS]]"
      - "[[apache_kafka|Apache Kafka]]"
    custoBeneficio:
      - "[[amazon_sqs|Amazon SQS]]"
      - tabela:google-pubsub
      - tabela:redpanda
    qualidadeMaxima:
      - "[[confluent_cloud|Confluent Cloud]]"
      - "[[amazon_msk|Amazon MSK (ferramenta)]]"
      - tabela:azure-event-hubs
    justificativaFerramentas: "Muda Etapa do pipeline para processamento contínuo: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Linguagem ou runtime
        valor: Java, Kotlin ou Go com cliente de broker
        fonte: editorial
      - chave: Escala típica
        valor: Milhares de eventos por segundo
        fonte: editorial
      - chave: Etapa do pipeline
        valor: Processamento contínuo
        fonte: editorial
  - id: etl-qualidade-dados
    nome: Qualidade de dados
    descricao: Testes de esquema e anomalias.
    funcionalidades:
      - "[[avaliacao_de_qualidade|Avaliação de qualidade]]"
      - "[[saida_estruturada|Saída estruturada]]"
    herdaFerramentas: false
    maisBarata:
      - "[[zod|Zod]]"
      - tabela:valibot
      - tabela:yup
    custoBeneficio:
      - "[[pydantic|Pydantic]]"
      - tabela:joi
      - tabela:class-validator
    qualidadeMaxima:
      - "[[typebox|TypeBox]]"
      - tabela:arktype
      - tabela:ajv
    justificativaFerramentas: "Muda Etapa do pipeline para testes de esquema e detecção de anomalia: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Linguagem ou runtime
        valor: Biblioteca de validação de esquema
        fonte: editorial
      - chave: Escala típica
        valor: Todas as cargas de entrada
        fonte: editorial
      - chave: Etapa do pipeline
        valor: Testes de esquema e detecção de anomalia
        fonte: editorial
tags:
  - caso-de-uso
  - ia
---
# Engenharia de dados e ETL
## 📝 Descrição
Coletar, transformar e carregar dados com pipelines confiáveis e observáveis.
## ⏰ Quando aplicar
- Pipeline diário de dados
- Streaming de eventos
## 🧩 Funcionalidades necessárias
- [[orquestracao_de_fluxos|Orquestração de fluxos]] - Encadeamento de passos, ramificações e retentativas em fluxos controlados.
- [[automacao_de_workflow|Automação de workflow]] - Execução automática de processos entre sistemas, com gatilhos e ações.
- [[saida_estruturada|Saída estruturada]] - Respostas que seguem um esquema, como JSON validado, para uso direto por programas.
- [[web_scraping_funcionalidade|Web scraping]] - Coleta e estruturação de conteúdo de páginas web.
- [[integracao_de_apis|Integração de APIs]] - Conexão de modelos e agentes a APIs e serviços de terceiros.
## ✅ Recomendações
- [[inngest|Inngest]] - Faixa custo-benefício em [[filas_jobs_background|Filas e jobs em background]].
- [[firecrawl|Firecrawl]] - Faixa custo-benefício em [[web_scraping|Ferramentas de web scraping]].
- [[motherduck|MotherDuck]] - Faixa custo-benefício em [[warehouse_lakehouse|Data warehouse e lakehouse]].
- [[google_bigquery|Google BigQuery]] - Faixa custo-benefício em [[warehouse_lakehouse|Data warehouse e lakehouse]].
- [[amazon_athena|Amazon Athena]] - Faixa custo-benefício em [[warehouse_lakehouse|Data warehouse e lakehouse]].
## 🧬 Variações
- **Orquestração de pipelines** (`etl-orquestracao`): Dependências, agendas e reexecução. Funcionalidades: [[orquestracao_de_fluxos|Orquestração de fluxos]], [[automacao_de_workflow|Automação de workflow]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Linguagem ou runtime: Python ou TypeScript com agendador; Escala típica: Dezenas de pipelines; Etapa do pipeline: Agenda, dependência e reexecução.
- **Extração de web e APIs** (`etl-extracao-web-api`): Coleta de fontes externas com limites e retentativas. Funcionalidades: [[web_scraping_funcionalidade|Web scraping]], [[integracao_de_apis|Integração de APIs]]. Mais barata: Crawl4AI, Scrapy, [[playwright|Playwright]]. Custo-benefício: [[firecrawl|Firecrawl]], Apify, Jina Reader. Qualidade máxima: Bright Data, Zyte API, Browserbase. Por que difere do caso: Muda Etapa do pipeline para coleta com limites e retentativas: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Linguagem ou runtime: Python com cliente HTTP e navegador; Escala típica: Centenas de fontes externas; Etapa do pipeline: Coleta com limites e retentativas.
- **Transformação em SQL** (`etl-transformacao-sql`): Modelos testados e versionados no warehouse. Funcionalidades: [[geracao_de_codigo|Geração de código]], [[saida_estruturada|Saída estruturada]]. Mais barata: [[clickhouse|ClickHouse]], DuckDB, Trino. Custo-benefício: [[motherduck|MotherDuck]], [[google_bigquery|Google BigQuery]], [[amazon_athena|Amazon Athena]]. Qualidade máxima: [[snowflake|Snowflake]], Databricks, [[amazon_redshift|Amazon Redshift (ferramenta)]]. Por que difere do caso: Muda Etapa do pipeline para modelagem testada e versionada: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Linguagem ou runtime: SQL select com Jinja e YAML no dbt; Escala típica: Centenas de modelos no warehouse; Etapa do pipeline: Modelagem testada e versionada.
- **Streaming de eventos** (`etl-streaming-eventos`): Processamento contínuo de eventos. Funcionalidades: [[orquestracao_de_fluxos|Orquestração de fluxos]], [[automacao_de_workflow|Automação de workflow]]. Mais barata: [[rabbitmq|RabbitMQ]], NATS, Apache Kafka. Custo-benefício: [[amazon_sqs|Amazon SQS]], Google Pub/Sub, Redpanda. Qualidade máxima: [[confluent_cloud|Confluent Cloud]], [[amazon_msk|Amazon MSK (ferramenta)]], Azure Event Hubs. Por que difere do caso: Muda Etapa do pipeline para processamento contínuo: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Linguagem ou runtime: Java, Kotlin ou Go com cliente de broker; Escala típica: Milhares de eventos por segundo; Etapa do pipeline: Processamento contínuo.
- **Qualidade de dados** (`etl-qualidade-dados`): Testes de esquema e anomalias. Funcionalidades: [[avaliacao_de_qualidade|Avaliação de qualidade]], [[saida_estruturada|Saída estruturada]]. Mais barata: [[zod|Zod]], Valibot, Yup. Custo-benefício: [[pydantic|Pydantic]], Joi, class-validator. Qualidade máxima: [[typebox|TypeBox]], ArkType, Ajv. Por que difere do caso: Muda Etapa do pipeline para testes de esquema e detecção de anomalia: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Linguagem ou runtime: Biblioteca de validação de esquema; Escala típica: Todas as cargas de entrada; Etapa do pipeline: Testes de esquema e detecção de anomalia.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[bullmq|BullMQ]], Celery, RQ
- **Custo-benefício:** [[inngest|Inngest]], Trigger.dev, Dramatiq
- **Qualidade máxima:** [[temporal|Temporal]], Apache Airflow, Prefect
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** lock-in. Pipelines e formatos de armazenamento prendem a equipe ao ecossistema escolhido.
## 🔗 Relacionamentos
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Casos de Uso de IA
- **Macro:** [[dados_e_analytics|Dados e analytics]]
