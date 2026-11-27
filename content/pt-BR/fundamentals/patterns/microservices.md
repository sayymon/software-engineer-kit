---
id: microservices
tipo: padrao
nome: Microservices
aliases:
  - Microsserviços
descricao: Estrutura a aplicação como um conjunto de serviços pequenos, autônomos e organizados em torno de capacidades de negócio, cada um com deploy e dados independentes.
fonte_ids:
  - fowler_microservices
  - ms_db_per_service
  - book_richardson
exemplo: Pedidos, catálogo e pagamentos são serviços separados, cada um com repositório, pipeline e banco próprios.
quando_usar:
  - Várias equipes que precisam entregar de forma independente
  - Componentes com requisitos de escala e tecnologia muito diferentes
  - Domínios com fronteiras de negócio estáveis
quando_evitar:
  - Times pequenos ou domínios ainda em descoberta (comece em um monolito modular)
  - Organizações sem automação de deploy, observabilidade e cultura de operação
status: revisado
publico: false
fontes:
  - id: fowler_microservices
    tipo: artigo
    titulo: Microservices (Martin Fowler e James Lewis)
    link: https://martinfowler.com/articles/microservices.html
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: ms_db_per_service
    tipo: artigo
    titulo: "Pattern: Database per service (microservices.io)"
    link: https://microservices.io/patterns/data/database-per-service.html
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: book_richardson
    tipo: livro
    titulo: Microservices Patterns (Chris Richardson)
    link: https://microservices.io/book
    status_revisao: revisada
    proxima_revisao: 2027-11-22
categorias:
  - "[[system_design_arquitetura|System design e arquitetura]]"
  - "[[containers_orquestracao|Containers e orquestração]]"
  - "[[observabilidade_apm|Observabilidade e APM]]"
familia: distribuido-arquitetura
subfamilia: Estilo arquitetural
problema: Monolitos grandes limitam o deploy independente, a escala por componente e a autonomia dos times.
tradeoffs:
  - "Ganha: autonomia, escala e deploy independentes; paga: complexidade distribuída (rede, consistência, observabilidade)"
  - "Ganha: isolamento de falhas por serviço; paga: custo de infraestrutura e de coordenação entre times"
consequencias:
  - Exige DevOps, tracing distribuído e contratos de API versionados
  - Dados e transações entre serviços pedem Saga, Outbox e Database per Service
padroesRelacionados:
  - "[[api_gateway|API Gateway (padrão)]]"
  - "[[arquitetura_em_camadas|Arquitetura em Camadas]]"
  - "[[backend_for_frontend|Backend for Frontend]]"
  - "[[database_per_service|Database per Service]]"
  - "[[monolito_modular|Monolito Modular]]"
  - "[[saga_orquestrada|SAGA Orquestrada]]"
  - "[[service_mesh|Service Mesh]]"
  - "[[sidecar|Sidecar]]"
  - "[[strangler_fig|Strangler Fig]]"
casosDeUso:
  - "[[arquitetura_e_system_design|Arquitetura e system design]]"
  - "[[migracao_e_modernizacao_de_codigo|Migração e modernização de código]]"
  - "[[marketplace_e_plataformas_grande_empresa|Marketplace e plataformas (grande empresa)]]"
  - "[[pipelines_de_ci_e_cd|Pipelines de CI e CD]]"
  - "[[observabilidade_em_producao|Observabilidade em produção]]"
variacoes: []
ferramentas:
  - "[[kubernetes|Kubernetes (ferramenta)]]"
  - "[[spring_boot|Spring Boot]]"
  - "[[quarkus|Quarkus]]"
  - "[[micronaut|Micronaut]]"
  - tabela:dapr
  - "[[istio|Istio]]"
  - "[[opentelemetry|OpenTelemetry]]"
  - tabela:dropwizard
  - tabela:open-liberty
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Microservices
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
