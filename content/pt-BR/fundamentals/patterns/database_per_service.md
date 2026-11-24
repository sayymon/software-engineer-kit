---
id: database_per_service
tipo: padrao
nome: Database per Service
aliases:
  - Banco por serviço
descricao: Cada microsserviço é dono exclusivo do seu esquema de dados e só o expõe por API ou eventos. Nenhum outro serviço acessa as tabelas diretamente.
fonte_ids:
  - ms_db_per_service
  - aws_pg_db_per_service
  - fowler_microservices
exemplo: O serviço de catálogo usa MongoDB e o de pagamentos usa PostgreSQL, e nenhum lê o banco do outro.
quando_usar:
  - Microsserviços que precisam de autonomia de deploy e de escolha de tecnologia de dados
  - Domínios com requisitos de armazenamento diferentes por contexto
  - Migração de monolito com bounded contexts claros
quando_evitar:
  - Sistemas pequenos com um único time, em que um banco só é mais simples
  - Relatórios que dependem de joins entre domínios sem uma estratégia de dados analíticos
status: revisado
publico: false
fontes:
  - id: ms_db_per_service
    tipo: artigo
    titulo: "Pattern: Database per service (microservices.io)"
    link: https://microservices.io/patterns/data/database-per-service.html
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: aws_pg_db_per_service
    tipo: artigo
    titulo: Database-per-service pattern (AWS Prescriptive Guidance)
    link: https://docs.aws.amazon.com/prescriptive-guidance/latest/modernization-data-persistence/database-per-service.html
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: fowler_microservices
    tipo: artigo
    titulo: Microservices (Martin Fowler e James Lewis)
    link: https://martinfowler.com/articles/microservices.html
    status_revisao: revisada
    proxima_revisao: 2027-11-22
categorias:
  - "[[banco_relacional|Banco relacional]]"
  - "[[banco_documentos|Banco de documentos]]"
  - "[[system_design_arquitetura|System design e arquitetura]]"
familia: distribuido-arquitetura
subfamilia: Consistência e dados
problema: Um banco compartilhado acopla serviços pelo esquema, impede deploy e escala independentes e transforma toda mudança de tabela em coordenação entre times.
tradeoffs:
  - "Ganha: autonomia e baixo acoplamento; paga: sem joins nem transações entre serviços"
  - "Ganha: tecnologia certa por contexto; paga: mais bancos para operar e proteger"
consequencias:
  - Consultas entre serviços viram composição de APIs, CQRS ou replicação por eventos
  - Consistência entre serviços usa Saga e Outbox
padroesRelacionados:
  - "[[cache_aside|Cache-aside]]"
  - "[[change_data_capture|Change Data Capture]]"
  - "[[cqrs|CQRS]]"
  - "[[event_carried_state_transfer|Event-Carried State Transfer]]"
  - "[[microservices|Microservices]]"
  - "[[saga_orquestrada|SAGA Orquestrada]]"
  - "[[sharding|Sharding]]"
casosDeUso:
  - "[[arquitetura_e_system_design|Arquitetura e system design]]"
  - "[[migracao_e_modernizacao_de_codigo|Migração e modernização de código]]"
  - "[[marketplace_e_plataformas_grande_empresa|Marketplace e plataformas (grande empresa)]]"
  - "[[software_b2b_media_empresa|Software B2B (média empresa)]]"
variacoes:
  - arq-escolha-dados
ferramentas:
  - "[[postgresql|PostgreSQL]]"
  - "[[mongodb|MongoDB (ferramenta)]]"
  - "[[amazon_dynamodb|Amazon DynamoDB (ferramenta)]]"
  - "[[redis|Redis (ferramenta)]]"
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Database per Service
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
