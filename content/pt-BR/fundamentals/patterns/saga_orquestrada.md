---
id: saga_orquestrada
tipo: padrao
nome: SAGA Orquestrada
aliases:
  - Saga Orchestration
descricao: Coordena uma transação de negócio que cruza serviços como uma sequência de transações locais, comandada por um orquestrador central. Cada passo que falha dispara transações compensatórias nos passos anteriores.
fonte_ids:
  - ms_saga
  - azure_saga
  - book_richardson
exemplo: Um orquestrador Temporal executa criar pedido, reservar estoque e cobrar, e chama cancelar reserva se a cobrança falhar.
quando_usar:
  - Fluxos de negócio com vários serviços e regras de compensação claras
  - Processos longos que precisam de visibilidade de estado e auditoria
  - Equipes que preferem um ponto único de decisão do fluxo
quando_evitar:
  - Operações dentro de um único banco, em que uma transação local basta
  - Fluxos simples de dois passos sem necessidade de compensação
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
  - id: book_richardson
    tipo: livro
    titulo: Microservices Patterns (Chris Richardson)
    link: https://microservices.io/book
    status_revisao: revisada
    proxima_revisao: 2027-11-22
categorias:
  - "[[orquestracao_workflows_sagas|Orquestração de workflows e sagas]]"
  - "[[mensageria_streaming|Mensageria e streaming]]"
  - "[[system_design_arquitetura|System design e arquitetura]]"
  - "[[filas_jobs_background|Filas e jobs em background]]"
familia: distribuido-arquitetura
subfamilia: Consistência e dados
problema: Com Database per Service não existe transação ACID entre serviços, e uma operação como criar pedido, reservar estoque e cobrar precisa terminar consistente ou ser desfeita.
tradeoffs:
  - "Ganha: fluxo explícito, fácil de testar e observar; paga: o orquestrador vira ponto de acoplamento e de operação"
  - "Ganha: sem dependências cíclicas entre serviços; paga: lógica de compensação para cada passo"
consequencias:
  - "Isolamento ausente: leituras intermediárias exigem contramedidas semânticas"
  - Passos e compensações precisam ser idempotentes
padroesRelacionados:
  - "[[database_per_service|Database per Service]]"
  - "[[inbox_idempotent_consumer|Idempotência]]"
  - "[[microservices|Microservices]]"
  - "[[saga_coreografada|SAGA Coreografada]]"
  - "[[state|State (GoF)]]"
  - "[[transactional_outbox|Transactional Outbox]]"
casosDeUso:
  - "[[arquitetura_e_system_design|Arquitetura e system design]]"
  - "[[pagamentos_e_cobranca|Pagamentos e cobrança]]"
  - "[[marketplace_e_plataformas_grande_empresa|Marketplace e plataformas (grande empresa)]]"
  - "[[logistica_media_empresa|Logística (média empresa)]]"
  - "[[operacao_de_loja_virtual|Operação de loja virtual]]"
variacoes:
  - arq-mensageria
ferramentas:
  - "[[temporal|Temporal]]"
  - tabela:camunda
  - tabela:conductor
  - tabela:aws-step-functions
  - tabela:axon-framework
  - tabela:azure-durable-functions
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# SAGA Orquestrada
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
