---
id: event_carried_state_transfer
tipo: padrao
nome: Event-Carried State Transfer
aliases:
  - ECST
descricao: O evento carrega o estado necessário para os consumidores, que mantêm uma cópia local dos dados de que precisam e deixam de consultar o serviço de origem.
fonte_ids:
  - fowler_event_driven
  - book_richardson
  - azure_patterns_index
exemplo: O evento ClienteAtualizado leva nome e endereço, e o serviço de entregas atualiza sua tabela local de clientes.
quando_usar:
  - Serviços que precisam de dados de outro contexto em leituras frequentes
  - Reduzir dependência de disponibilidade entre serviços
  - Montar réplicas de leitura locais
quando_evitar:
  - Dados sensíveis que não devem ser copiados entre contextos
  - Estados que mudam com tanta frequência que a replicação custa mais que a consulta
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
familia: distribuido-arquitetura
subfamilia: Mensageria
problema: Consumidores que chamam o serviço de origem a cada processamento criam acoplamento temporal e latência, e param quando a origem cai.
tradeoffs:
  - "Ganha: autonomia e menor latência de leitura; paga: dados duplicados e consistência eventual"
  - "Ganha: menos chamadas síncronas; paga: eventos maiores e contrato mais acoplado ao formato dos dados"
consequencias:
  - Cada consumidor precisa tratar eventos fora de ordem e duplicados
  - Mudança de esquema do evento afeta todas as cópias
padroesRelacionados:
  - "[[arquitetura_orientada_a_eventos|Arquitetura Orientada a Eventos]]"
  - "[[claim_check|Claim Check]]"
  - "[[cqrs|CQRS]]"
  - "[[database_per_service|Database per Service]]"
  - "[[publish_subscribe|Publish-Subscribe]]"
casosDeUso:
  - "[[arquitetura_e_system_design|Arquitetura e system design]]"
  - "[[marketplace_e_plataformas_grande_empresa|Marketplace e plataformas (grande empresa)]]"
  - "[[varejo_omnichannel_media_empresa|Varejo omnichannel (média empresa)]]"
  - "[[integracao_de_apis_e_webhooks|Integração de APIs e webhooks]]"
variacoes:
  - arq-mensageria
ferramentas:
  - "[[apache_kafka|Apache Kafka]]"
  - tabela:amazon-eventbridge
  - tabela:amazon-sns
  - "[[nats|NATS]]"
  - tabela:redpanda
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Event-Carried State Transfer
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
