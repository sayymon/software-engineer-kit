---
id: arquitetura_orientada_a_eventos
tipo: padrao
nome: Arquitetura Orientada a Eventos
aliases:
  - Event-Driven Architecture
  - EDA
descricao: Os componentes se comunicam produzindo e reagindo a eventos, em vez de chamadas diretas. Produtores e consumidores ficam desacoplados no tempo e no conhecimento mútuo.
fonte_ids:
  - fowler_event_driven
  - book_richardson
  - azure_patterns_index
exemplo: Pedido pago publica PedidoPago e estoque, e-mail, faturamento e analytics reagem cada um no seu ritmo.
quando_usar:
  - Sistemas com muitos consumidores independentes do mesmo fato de negócio
  - Processamento assíncrono e picos de carga
  - Integração entre domínios com autonomia de times
quando_evitar:
  - Fluxos que exigem resposta imediata e consistência forte
  - Equipes sem observabilidade para rastrear fluxos assíncronos
status: revisado
publico: false
fontes:
  - id: fowler_event_driven
    tipo: artigo
    titulo: What do you mean by "Event-Driven"? (Martin Fowler)
    link: https://martinfowler.com/articles/201701-event-driven.html
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: book_richardson
    tipo: livro
    titulo: Microservices Patterns (Chris Richardson)
    link: https://microservices.io/book
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: azure_patterns_index
    tipo: artigo
    titulo: Cloud design patterns (Azure Architecture Center)
    link: https://learn.microsoft.com/en-us/azure/architecture/patterns/
    status_revisao: revisada
    proxima_revisao: 2027-11-22
categorias:
  - "[[mensageria_streaming|Mensageria e streaming]]"
  - "[[system_design_arquitetura|System design e arquitetura]]"
  - "[[captura_mudancas_event_store|Captura de mudanças e event store]]"
familia: distribuido-arquitetura
subfamilia: Estilo arquitetural
problema: Integrações por chamadas síncronas em cadeia criam acoplamento, falhas em cascata e dificuldade de adicionar novos consumidores.
tradeoffs:
  - "Ganha: desacoplamento e extensibilidade; paga: fluxo implícito, depuração e testes mais difíceis"
  - "Ganha: absorção de picos e resiliência; paga: consistência eventual e tratamento de duplicatas e ordem"
consequencias:
  - Esquemas de evento viram contratos públicos e pedem schema registry
  - Correlation id e tracing distribuído passam a ser obrigatórios
padroesRelacionados:
  - "[[backpressure|Backpressure]]"
  - "[[change_data_capture|Change Data Capture]]"
  - "[[cqrs|CQRS]]"
  - "[[event_sourcing|Event Sourcing]]"
  - "[[event_carried_state_transfer|Event-Carried State Transfer]]"
  - "[[observer|Observer (GoF)]]"
  - "[[publish_subscribe|Publish-Subscribe]]"
  - "[[saga_coreografada|SAGA Coreografada]]"
casosDeUso:
  - "[[arquitetura_e_system_design|Arquitetura e system design]]"
  - "[[integracao_de_apis_e_webhooks|Integração de APIs e webhooks]]"
  - "[[marketplace_e_plataformas_grande_empresa|Marketplace e plataformas (grande empresa)]]"
  - "[[logistica_media_empresa|Logística (média empresa)]]"
  - "[[telecom_grande_empresa|Telecom (grande empresa)]]"
variacoes:
  - arq-mensageria
ferramentas:
  - "[[apache_kafka|Apache Kafka]]"
  - tabela:amazon-eventbridge
  - "[[rabbitmq|RabbitMQ]]"
  - tabela:amazon-sns
  - "[[amazon_sqs|Amazon SQS]]"
  - "[[nats|NATS]]"
  - tabela:apache-pulsar
  - tabela:amazon-kinesis
  - tabela:apache-flink
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Arquitetura Orientada a Eventos
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
