---
id: saga_coreografada
tipo: padrao
nome: SAGA Coreografada
aliases:
  - Saga Choreography
descricao: Cada serviço reage a eventos dos outros e publica os próprios eventos, sem coordenador. A saga avança por reação em cadeia e as compensações também são disparadas por eventos de falha.
fonte_ids:
  - ms_saga
  - azure_saga
  - fowler_event_driven
exemplo: O serviço de pedidos publica PedidoCriado, o de estoque reserva e publica EstoqueReservado, e o de pagamentos reage a esse evento.
quando_usar:
  - Fluxos curtos com poucos participantes (até 3 ou 4 serviços)
  - Arquiteturas já orientadas a eventos
  - Equipes autônomas que não querem depender de um componente central
quando_evitar:
  - Fluxos longos com muitas ramificações, em que o caminho fica difícil de seguir
  - Processos que exigem auditoria centralizada do estado
status: revisado
publico: false
fontes:
  - id: ms_saga
    tipo: artigo
    titulo: "Pattern: Saga (microservices.io)"
    link: https://microservices.io/patterns/data/saga.html
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: azure_saga
    tipo: artigo
    titulo: Saga distributed transactions pattern (Azure Architecture Center)
    link: https://learn.microsoft.com/en-us/azure/architecture/patterns/saga
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
  - "[[system_design_arquitetura|System design e arquitetura]]"
  - "[[orquestracao_workflows_sagas|Orquestração de workflows e sagas]]"
familia: distribuido-arquitetura
subfamilia: Consistência e dados
problema: Uma transação distribuída precisa terminar consistente sem introduzir um orquestrador central como ponto único de acoplamento.
tradeoffs:
  - "Ganha: baixo acoplamento e sem ponto único; paga: o fluxo fica implícito e difícil de depurar"
  - "Ganha: implementação simples para poucos passos; paga: risco de dependência cíclica entre serviços"
consequencias:
  - Observabilidade com correlation id vira requisito
  - Mudar o fluxo exige alterar vários serviços
padroesRelacionados:
  - "[[arquitetura_orientada_a_eventos|Arquitetura Orientada a Eventos]]"
  - "[[event_sourcing|Event Sourcing]]"
  - "[[publish_subscribe|Publish-Subscribe]]"
  - "[[saga_orquestrada|SAGA Orquestrada]]"
  - "[[transactional_outbox|Transactional Outbox]]"
casosDeUso:
  - "[[arquitetura_e_system_design|Arquitetura e system design]]"
  - "[[pagamentos_e_cobranca|Pagamentos e cobrança]]"
  - "[[marketplace_e_plataformas_grande_empresa|Marketplace e plataformas (grande empresa)]]"
  - "[[varejo_omnichannel_media_empresa|Varejo omnichannel (média empresa)]]"
variacoes:
  - arq-mensageria
ferramentas:
  - "[[apache_kafka|Apache Kafka]]"
  - "[[rabbitmq|RabbitMQ]]"
  - tabela:amazon-eventbridge
  - tabela:amazon-sns
  - "[[amazon_sqs|Amazon SQS]]"
  - tabela:masstransit
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# SAGA Coreografada
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
