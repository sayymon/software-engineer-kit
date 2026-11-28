---
id: transactional_outbox
tipo: padrao
nome: Transactional Outbox
aliases:
  - Outbox Pattern
descricao: Grava a mudança de estado e o evento a publicar na mesma transação local do banco, em uma tabela outbox. Um relay lê essa tabela e publica no broker, o que garante que o evento sai se, e somente se, a transação foi confirmada.
fonte_ids:
  - ms_outbox
  - aws_pg_outbox
  - book_richardson
exemplo: Um serviço de pedidos grava o pedido e o evento PedidoCriado na mesma transação e o Debezium publica a linha da outbox no Kafka.
quando_usar:
  - Serviço que persiste dados e precisa notificar outros serviços de forma confiável
  - Domínios em que perder um evento gera inconsistência financeira ou de estoque
  - Ambientes em que o broker não participa de transações XA
quando_evitar:
  - Quando perder um evento ocasional é aceitável
  - Quando o broker já oferece transações atômicas com o banco usado
status: revisado
publico: false
fontes:
  - id: ms_outbox
    tipo: artigo
    titulo: "Pattern: Transactional outbox (microservices.io)"
    link: https://microservices.io/patterns/data/transactional-outbox.html
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: aws_pg_outbox
    tipo: artigo
    titulo: Transactional outbox pattern (AWS Prescriptive Guidance)
    link: https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/transactional-outbox.html
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: book_richardson
    tipo: livro
    titulo: Microservices Patterns (Chris Richardson)
    link: https://microservices.io/book
    status_revisao: revisada
    proxima_revisao: 2027-11-22
categorias:
  - "[[mensageria_streaming|Mensageria e streaming]]"
  - "[[captura_mudancas_event_store|Captura de mudanças e event store]]"
  - "[[system_design_arquitetura|System design e arquitetura]]"
familia: distribuido-arquitetura
subfamilia: Consistência e dados
problema: Um serviço precisa atualizar o banco e publicar um evento no broker. Sem transação distribuída, uma falha entre os dois passos deixa dado e evento inconsistentes (dual write).
tradeoffs:
  - "Ganha: entrega de evento sem dual write; paga: uma tabela extra e um relay para operar"
  - "Ganha: consistência eventual previsível; paga: entrega at-least-once, o consumidor precisa ser idempotente"
consequencias:
  - Os consumidores recebem eventos duplicados em falhas e precisam de Idempotent Consumer
  - A tabela outbox exige limpeza e monitoramento de atraso do relay
padroesRelacionados:
  - "[[change_data_capture|Change Data Capture]]"
  - "[[inbox_idempotent_consumer|Idempotência]]"
  - "[[publish_subscribe|Publish-Subscribe]]"
  - "[[saga_coreografada|SAGA Coreografada]]"
  - "[[saga_orquestrada|SAGA Orquestrada]]"
casosDeUso:
  - "[[arquitetura_e_system_design|Arquitetura e system design]]"
  - "[[integracao_de_apis_e_webhooks|Integração de APIs e webhooks]]"
  - "[[pagamentos_e_cobranca|Pagamentos e cobrança]]"
  - "[[marketplace_e_plataformas_grande_empresa|Marketplace e plataformas (grande empresa)]]"
variacoes:
  - arq-mensageria
ferramentas:
  - "[[debezium|Debezium]]"
  - "[[apache_kafka|Apache Kafka]]"
  - "[[rabbitmq|RabbitMQ]]"
  - "[[amazon_sqs|Amazon SQS]]"
  - "[[temporal|Temporal]]"
  - "[[postgresql|PostgreSQL]]"
  - tabela:kafka-connect
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Transactional Outbox
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
