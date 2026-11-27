---
id: logistica_media_empresa
tipo: caso-de-uso
nome: Logística (média empresa)
aliases:
  - logistica-media-empresa
descricao: Rastrear entregas e frotas em tempo real com eventos, séries temporais, jobs agendados e aplicativo para motoristas.
funcionalidadesNecessarias: []
categoriasRelacionadas:
  - "[[mensageria_streaming|Mensageria e streaming]]"
  - "[[serie_temporal|Série temporal]]"
  - "[[filas_jobs_background|Filas e jobs em background]]"
  - "[[observabilidade_apm|Observabilidade e APM]]"
  - "[[frameworks_mobile|Frameworks de mobile]]"
ferramentasRecomendadas:
  - "[[rabbitmq|RabbitMQ]]"
  - "[[timescaledb|TimescaleDB]]"
  - "[[temporal|Temporal]]"
  - "[[grafana_cloud|Grafana Cloud]]"
  - "[[flutter|Flutter]]"
modelosRecomendados: []
criteriosDesempate:
  - custo
  - privacidade-de-dados
  - lock-in
criterioPadrao: custo
porte:
  - media
segmentos:
  - logistica
nicho: transporte, armazenagem e entregas
nivel: caso
eixo: cenario
macro: "[[negocios_por_porte_e_segmento|Negócios por porte e segmento]]"
faixasPadrao:
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
variacoes:
  - id: logistica-rastreamento-filas
    nome: Rastreamento e filas de eventos
    descricao: Eventos de entrega, mensagens e jobs.
    funcionalidades:
      - "[[integracao_de_apis|Integração de APIs]]"
      - "[[automacao_de_workflow|Automação de workflow]]"
    herdaFerramentas: true
    parametros:
      - chave: Porte
        valor: Operadora logística de médio porte
        fonte: editorial
      - chave: Regulação aplicável
        valor: Nenhuma específica
        fonte: editorial
      - chave: Volume típico
        valor: Milhões de eventos de rastreamento por dia
        fonte: editorial
  - id: logistica-app-motorista
    nome: Aplicativo do motorista
    descricao: App móvel para rota e comprovante de entrega.
    funcionalidades:
      - "[[geracao_de_codigo|Geração de código]]"
      - "[[edicao_de_codebase|Edição de codebase]]"
    herdaFerramentas: false
    maisBarata:
      - "[[capacitor|Capacitor]]"
      - tabela:expo
      - tabela:nativescript
    custoBeneficio:
      - "[[flutter|Flutter]]"
      - tabela:react-native
      - "[[swiftui|SwiftUI]]"
    qualidadeMaxima:
      - "[[kotlin_multiplatform|Kotlin Multiplatform]]"
      - tabela:jetpack-compose
      - "[[dotnet_maui|dotNET MAUI]]"
    justificativaFerramentas: "Muda Volume típico para milhares de motoristas ativos: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Operadora logística de médio porte
        fonte: editorial
      - chave: Regulação aplicável
        valor: LGPD para dados de localização de motoristas
        fonte: não verificado
      - chave: Volume típico
        valor: Milhares de motoristas ativos
        fonte: editorial
tags:
  - caso-de-uso
  - ferramenta
---
# Logística (média empresa)
## 📝 Descrição
Rastrear entregas e frotas em tempo real com eventos, séries temporais, jobs agendados e aplicativo para motoristas.
## ⏰ Quando aplicar
- Rastrear veículos e entregas
- Orquestrar rotas e processamentos em lote
## 🧱 Pilha por categoria
- [[mensageria_streaming|Mensageria e streaming]] - eventos de rastreamento
- [[serie_temporal|Série temporal]] - histórico de posições e sensores
- [[filas_jobs_background|Filas e jobs em background]] - processamentos agendados
- [[observabilidade_apm|Observabilidade e APM]] - saúde dos serviços
- [[frameworks_mobile|Frameworks de mobile]] - aplicativo do motorista
## ✅ Recomendações
- [[rabbitmq|RabbitMQ]] - mensageria aberta e madura
- [[timescaledb|TimescaleDB]] - séries temporais sobre PostgreSQL
- [[temporal|Temporal]] - fluxos de trabalho duráveis
- [[grafana_cloud|Grafana Cloud]] - dashboards e alertas gerenciados
- [[flutter|Flutter]] - aplicativo único para motoristas
## 🧬 Variações
- **Rastreamento e filas de eventos** (`logistica-rastreamento-filas`): Eventos de entrega, mensagens e jobs. Funcionalidades: [[integracao_de_apis|Integração de APIs]], [[automacao_de_workflow|Automação de workflow]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Porte: Operadora logística de médio porte; Regulação aplicável: Nenhuma específica; Volume típico: Milhões de eventos de rastreamento por dia.
- **Aplicativo do motorista** (`logistica-app-motorista`): App móvel para rota e comprovante de entrega. Funcionalidades: [[geracao_de_codigo|Geração de código]], [[edicao_de_codebase|Edição de codebase]]. Mais barata: [[capacitor|Capacitor]], Expo, NativeScript. Custo-benefício: [[flutter|Flutter]], React Native, [[swiftui|SwiftUI]]. Qualidade máxima: [[kotlin_multiplatform|Kotlin Multiplatform]], Jetpack Compose, dotNET MAUI. Por que difere do caso: Muda Volume típico para milhares de motoristas ativos: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Operadora logística de médio porte; Regulação aplicável: LGPD para dados de localização de motoristas (não verificado); Volume típico: Milhares de motoristas ativos.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[rabbitmq|RabbitMQ]], NATS, Apache Kafka
- **Custo-benefício:** [[amazon_sqs|Amazon SQS]], Google Pub/Sub, Redpanda
- **Qualidade máxima:** [[confluent_cloud|Confluent Cloud]], [[amazon_msk|Amazon MSK (ferramenta)]], Azure Event Hubs
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** custo. Volume alto de eventos faz o custo por mensagem e por gigabyte armazenado pesar na conta.
## 🔗 Relacionamentos
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
- **Porte:** média empresa
- **Macro:** [[negocios_por_porte_e_segmento|Negócios por porte e segmento]]
