---
id: event_sourcing
tipo: padrao
nome: Event Sourcing
aliases:
  - Event Store
descricao: Persiste cada mudança de estado como um evento imutável em um log. O estado atual é a reprodução desses eventos, o que entrega histórico completo e auditoria nativa.
fonte_ids:
  - ms_event_sourcing
  - fowler_event_sourcing
  - azure_event_sourcing
exemplo: Uma conta bancária guarda DepositoRealizado e SaqueRealizado, e o saldo é calculado reproduzindo os eventos.
quando_usar:
  - Domínios com auditoria forte, como financeiro, seguros e compliance
  - Necessidade de reconstruir estado em qualquer ponto do tempo
  - Integração com CQRS e projeções múltiplas
quando_evitar:
  - Domínios simples de CRUD
  - Dados com exigência de apagamento (LGPD) sem estratégia de crypto-shredding
status: revisado
publico: false
fontes:
  - id: ms_event_sourcing
    tipo: artigo
    titulo: "Pattern: Event sourcing (microservices.io)"
    link: https://microservices.io/patterns/data/event-sourcing.html
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: fowler_event_sourcing
    tipo: artigo
    titulo: Event Sourcing (Martin Fowler)
    link: https://martinfowler.com/eaaDev/EventSourcing.html
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: azure_event_sourcing
    tipo: artigo
    titulo: Event Sourcing pattern (Azure Architecture Center)
    link: https://learn.microsoft.com/en-us/azure/architecture/patterns/event-sourcing
    status_revisao: revisada
    proxima_revisao: 2027-11-22
categorias:
  - "[[captura_mudancas_event_store|Captura de mudanças e event store]]"
  - "[[system_design_arquitetura|System design e arquitetura]]"
familia: distribuido-arquitetura
subfamilia: Consistência e dados
problema: Guardar só o estado atual perde o histórico e dificulta auditoria, depuração temporal e a geração de novas visões dos dados.
tradeoffs:
  - "Ganha: auditoria e reprocessamento completos; paga: curva de aprendizado e consultas só via projeções"
  - "Ganha: log como fonte de verdade; paga: evolução de esquema de eventos exige versionamento"
consequencias:
  - Snapshots são necessários para streams longos
  - Corrigir erros significa gravar eventos compensatórios, sem editar o passado
padroesRelacionados:
  - "[[arquitetura_orientada_a_eventos|Arquitetura Orientada a Eventos]]"
  - "[[change_data_capture|Change Data Capture]]"
  - "[[cqrs|CQRS]]"
  - "[[memento|Memento (GoF)]]"
  - "[[saga_coreografada|SAGA Coreografada]]"
casosDeUso:
  - "[[arquitetura_e_system_design|Arquitetura e system design]]"
  - "[[bancos_e_seguros_grande_empresa|Bancos e seguros (grande empresa)]]"
  - "[[fintech_media_empresa|Fintech (média empresa)]]"
  - "[[pagamentos_e_cobranca|Pagamentos e cobrança]]"
variacoes:
  - arq-escolha-dados
ferramentas:
  - tabela:kurrent-eventstoredb
  - tabela:axon-server
  - tabela:axon-framework
  - tabela:marten
  - "[[apache_kafka|Apache Kafka]]"
  - "[[postgresql|PostgreSQL]]"
  - tabela:apache-flink
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Event Sourcing
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
