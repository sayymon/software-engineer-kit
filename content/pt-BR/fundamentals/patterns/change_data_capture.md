---
id: change_data_capture
tipo: padrao
nome: Change Data Capture
aliases:
  - CDC
  - Transaction Log Tailing
descricao: Lê o log de transações do banco (binlog, WAL) e publica cada mudança como evento, sem alterar a aplicação. Alimenta réplicas, caches, índices de busca e outros serviços.
fonte_ids:
  - ms_log_tailing
  - book_richardson
  - azure_patterns_index
exemplo: O Debezium lê o WAL do PostgreSQL e publica cada alteração da tabela de clientes em um tópico Kafka.
quando_usar:
  - Publicar eventos de uma tabela outbox sem polling
  - Replicar dados para busca, cache ou data lake em quase tempo real
  - Migrar sistemas legados sem tocar no código original
quando_evitar:
  - Quando o banco ou o provedor não expõe o log de transações
  - Volumes pequenos em que um job periódico basta
status: revisado
publico: false
fontes:
  - id: ms_log_tailing
    tipo: artigo
    titulo: "Pattern: Transaction log tailing (microservices.io)"
    link: https://microservices.io/patterns/data/transaction-log-tailing.html
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
  - "[[captura_mudancas_event_store|Captura de mudanças e event store]]"
  - "[[mensageria_streaming|Mensageria e streaming]]"
  - "[[warehouse_lakehouse|Data warehouse e lakehouse]]"
familia: distribuido-arquitetura
subfamilia: Consistência e dados
problema: Manter outros sistemas sincronizados com o banco por polling ou dual write é lento, frágil e pode perder mudanças.
tradeoffs:
  - "Ganha: baixa latência e zero mudança na aplicação; paga: acoplamento ao formato de log do banco"
  - "Ganha: captura de todas as mudanças, inclusive de outros escritores; paga: operação de conectores e de esquema evolutivo"
consequencias:
  - Mudanças de esquema precisam de estratégia de compatibilidade nos consumidores
  - O atraso de replicação vira métrica de produção
padroesRelacionados:
  - "[[arquitetura_orientada_a_eventos|Arquitetura Orientada a Eventos]]"
  - "[[cqrs|CQRS]]"
  - "[[database_per_service|Database per Service]]"
  - "[[event_sourcing|Event Sourcing]]"
  - "[[strangler_fig|Strangler Fig]]"
  - "[[transactional_outbox|Transactional Outbox]]"
casosDeUso:
  - "[[engenharia_de_dados_e_etl|Engenharia de dados e ETL]]"
  - "[[arquitetura_e_system_design|Arquitetura e system design]]"
  - "[[migracao_e_modernizacao_de_codigo|Migração e modernização de código]]"
  - "[[marketplace_e_plataformas_grande_empresa|Marketplace e plataformas (grande empresa)]]"
variacoes:
  - arq-mensageria
ferramentas:
  - "[[debezium|Debezium]]"
  - tabela:kafka-connect
  - tabela:airbyte
  - tabela:aws-dms
  - tabela:striim
  - "[[apache_kafka|Apache Kafka]]"
  - tabela:apache-flink
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Change Data Capture
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
