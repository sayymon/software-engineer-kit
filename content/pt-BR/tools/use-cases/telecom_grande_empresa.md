---
id: telecom_grande_empresa
tipo: caso-de-uso
nome: Telecom (grande empresa)
aliases:
  - telecom-grande-empresa
descricao: Tratar grandes volumes de eventos e telemetria de rede, com análise em tempo real, observabilidade e plataforma de containers.
funcionalidadesNecessarias: []
categoriasRelacionadas:
  - "[[mensageria_streaming|Mensageria e streaming]]"
  - "[[serie_temporal|Série temporal]]"
  - "[[busca_analitico|Busca e analítico]]"
  - "[[observabilidade_apm|Observabilidade e APM]]"
  - "[[containers_orquestracao|Containers e orquestração]]"
  - "[[infraestrutura_como_codigo|Infraestrutura como código]]"
  - "[[suporte_atendimento|Suporte e atendimento]]"
ferramentasRecomendadas:
  - "[[confluent_cloud|Confluent Cloud]]"
  - "[[clickhouse|ClickHouse]]"
  - "[[datadog|Datadog]]"
  - "[[kubernetes|Kubernetes (ferramenta)]]"
  - "[[zendesk|Zendesk]]"
modelosRecomendados: []
criteriosDesempate:
  - custo
  - privacidade-de-dados
  - lock-in
criterioPadrao: custo
porte:
  - grande
segmentos:
  - geral
nicho: operadoras e provedores de telecomunicações
nivel: caso
eixo: cenario
macro: "[[negocios_por_porte_e_segmento|Negócios por porte e segmento]]"
faixasPadrao:
  maisBarata:
    - "[[rabbitmq|RabbitMQ]]"
    - tabela:nats
    - tabela:apache-kafka
  custoBeneficio:
    - "[[amazon_sqs|Amazon SQS]]"
    - tabela:google-pubsub
    - tabela:redpanda
  qualidadeMaxima:
    - "[[confluent_cloud|Confluent Cloud]]"
    - "[[amazon_msk|Amazon MSK (ferramenta)]]"
    - tabela:azure-event-hubs
variacoes:
  - id: telecom-eventos-metricas
    nome: Eventos e métricas de rede
    descricao: Mensageria, séries temporais e busca analítica.
    funcionalidades:
      - "[[integracao_de_apis|Integração de APIs]]"
      - "[[tracing|Tracing]]"
    herdaFerramentas: true
    parametros:
      - chave: Porte
        valor: Operadora de telecom de grande porte
        fonte: editorial
      - chave: Regulação aplicável
        valor: Resoluções da Anatel
        fonte: não verificado
      - chave: Volume típico
        valor: Milhões de eventos de rede por minuto
        fonte: editorial
  - id: telecom-operacao-suporte
    nome: Operação e suporte
    descricao: Observabilidade, contêineres e atendimento.
    funcionalidades:
      - "[[tracing|Tracing]]"
      - "[[avaliacao_de_qualidade|Avaliação de qualidade]]"
    herdaFerramentas: false
    maisBarata:
      - "[[opentelemetry|OpenTelemetry]]"
      - tabela:prometheus
      - tabela:signoz
    custoBeneficio:
      - "[[grafana_cloud|Grafana Cloud]]"
      - tabela:sentry
      - tabela:better-stack
    qualidadeMaxima:
      - "[[datadog|Datadog]]"
      - "[[new_relic|New Relic (ferramenta)]]"
      - tabela:dynatrace
    justificativaFerramentas: "Muda Volume típico para milhares de chamados por hora: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Operadora de telecom de grande porte
        fonte: editorial
      - chave: Regulação aplicável
        valor: Resoluções da Anatel e Código de Defesa do Consumidor
        fonte: não verificado
      - chave: Volume típico
        valor: Milhares de chamados por hora
        fonte: editorial
tags:
  - caso-de-uso
  - ferramenta
---
# Telecom (grande empresa)
## 📝 Descrição
Tratar grandes volumes de eventos e telemetria de rede, com análise em tempo real, observabilidade e plataforma de containers.
## ⏰ Quando aplicar
- Analisar bilhões de eventos de rede
- Operar milhares de serviços com alta disponibilidade
## 🧱 Pilha por categoria
- [[mensageria_streaming|Mensageria e streaming]] - eventos de rede
- [[serie_temporal|Série temporal]] - telemetria
- [[busca_analitico|Busca e analítico]] - análise em tempo real
- [[observabilidade_apm|Observabilidade e APM]] - saúde dos serviços
- [[containers_orquestracao|Containers e orquestração]] - plataforma de serviços
- [[infraestrutura_como_codigo|Infraestrutura como código]] - ambientes reproduzíveis
- [[suporte_atendimento|Suporte e atendimento]] - atendimento em grande escala
## ✅ Recomendações
- [[confluent_cloud|Confluent Cloud]] - streaming gerenciado de alto volume
- [[clickhouse|ClickHouse]] - análise colunar muito rápida
- [[datadog|Datadog]] - observabilidade para serviços distribuídos
- [[kubernetes|Kubernetes (ferramenta)]] - orquestração padrão da indústria
- [[zendesk|Zendesk]] - atendimento corporativo em grande escala
## 🧬 Variações
- **Eventos e métricas de rede** (`telecom-eventos-metricas`): Mensageria, séries temporais e busca analítica. Funcionalidades: [[integracao_de_apis|Integração de APIs]], [[tracing|Tracing]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Porte: Operadora de telecom de grande porte; Regulação aplicável: Resoluções da Anatel (não verificado); Volume típico: Milhões de eventos de rede por minuto.
- **Operação e suporte** (`telecom-operacao-suporte`): Observabilidade, contêineres e atendimento. Funcionalidades: [[tracing|Tracing]], [[avaliacao_de_qualidade|Avaliação de qualidade]]. Mais barata: [[opentelemetry|OpenTelemetry]], Prometheus, SigNoz. Custo-benefício: [[grafana_cloud|Grafana Cloud]], Sentry, Better Stack. Qualidade máxima: [[datadog|Datadog]], [[new_relic|New Relic (ferramenta)]], Dynatrace. Por que difere do caso: Muda Volume típico para milhares de chamados por hora: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Operadora de telecom de grande porte; Regulação aplicável: Resoluções da Anatel e Código de Defesa do Consumidor (não verificado); Volume típico: Milhares de chamados por hora.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[rabbitmq|RabbitMQ]], NATS, Apache Kafka
- **Custo-benefício:** [[amazon_sqs|Amazon SQS]], Google Pub/Sub, Redpanda
- **Qualidade máxima:** [[confluent_cloud|Confluent Cloud]], [[amazon_msk|Amazon MSK (ferramenta)]], Azure Event Hubs
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** custo. Em volumes de bilhões de eventos, o custo por gigabyte e por consulta decide a viabilidade.
## 🔗 Relacionamentos
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
- **Porte:** grande empresa
- **Macro:** [[negocios_por_porte_e_segmento|Negócios por porte e segmento]]
