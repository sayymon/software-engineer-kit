---
id: publish_subscribe
tipo: padrao
nome: Publish-Subscribe
aliases:
  - Pub/Sub
  - Publisher-Subscriber
descricao: Produtores publicam mensagens em um tópico sem conhecer os consumidores. Cada assinante recebe uma cópia e reage de forma independente.
fonte_ids:
  - azure_pubsub
  - book_eip
  - fowler_event_driven
exemplo: O serviço de pedidos publica PedidoPago e os serviços de e-mail, estoque e faturamento assinam o mesmo tópico.
quando_usar:
  - Notificar vários serviços sobre o mesmo evento (fan-out)
  - Adicionar consumidores sem alterar o produtor
  - Integração entre contextos com baixo acoplamento
quando_evitar:
  - Comunicação ponto a ponto que exige resposta imediata
  - Fluxos com ordem estrita global sem partições adequadas
status: revisado
publico: false
fontes:
  - id: azure_pubsub
    tipo: artigo
    titulo: Publisher-Subscriber pattern (Azure Architecture Center)
    link: https://learn.microsoft.com/en-us/azure/architecture/patterns/publisher-subscriber
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: book_eip
    tipo: livro
    titulo: Enterprise Integration Patterns (Gregor Hohpe e Bobby Woolf)
    link: https://www.enterpriseintegrationpatterns.com/
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: fowler_event_driven
    tipo: artigo
    titulo: What do you mean by "Event-Driven"? (Martin Fowler)
    link: https://martinfowler.com/articles/201701-event-driven.html
    status_revisao: revisada
    proxima_revisao: 2027-11-22
categorias:
  - "[[mensageria_streaming|Mensageria e streaming]]"
familia: distribuido-arquitetura
subfamilia: Mensageria
problema: Quando um serviço chama diretamente todos os interessados, ele fica acoplado a cada um e precisa mudar sempre que surge um novo consumidor.
tradeoffs:
  - "Ganha: desacoplamento entre produtor e consumidores; paga: menos visibilidade de quem consome e do fluxo ponta a ponta"
  - "Ganha: escala de consumidores independente; paga: ordenação e duplicatas exigem desenho cuidadoso"
consequencias:
  - Contratos de evento viram interface pública e precisam de versionamento
  - Cada assinante deve ser idempotente
padroesRelacionados:
  - "[[arquitetura_orientada_a_eventos|Arquitetura Orientada a Eventos]]"
  - "[[claim_check|Claim Check]]"
  - "[[competing_consumers|Competing Consumers]]"
  - "[[event_carried_state_transfer|Event-Carried State Transfer]]"
  - "[[observer|Observer (GoF)]]"
  - "[[saga_coreografada|SAGA Coreografada]]"
  - "[[transactional_outbox|Transactional Outbox]]"
casosDeUso:
  - "[[arquitetura_e_system_design|Arquitetura e system design]]"
  - "[[integracao_de_apis_e_webhooks|Integração de APIs e webhooks]]"
  - "[[marketing_e_anuncios|Marketing e anúncios]]"
  - "[[atendimento_e_suporte|Atendimento e suporte]]"
variacoes:
  - arq-mensageria
ferramentas:
  - "[[apache_kafka|Apache Kafka]]"
  - tabela:amazon-sns
  - tabela:google-pubsub
  - "[[rabbitmq|RabbitMQ]]"
  - "[[nats|NATS]]"
  - tabela:amazon-eventbridge
  - tabela:apache-pulsar
  - tabela:azure-service-bus
  - tabela:apache-activemq
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Publish-Subscribe
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
