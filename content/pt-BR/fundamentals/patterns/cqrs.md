---
id: cqrs
tipo: padrao
nome: CQRS
aliases:
  - Command Query Responsibility Segregation
descricao: Separa o modelo de escrita (comandos que mudam estado) do modelo de leitura (consultas), permitindo que cada lado use estrutura, escala e até banco próprios.
fonte_ids:
  - ms_cqrs
  - fowler_cqrs
  - azure_cqrs
exemplo: Comandos gravam pedidos no PostgreSQL e uma projeção alimenta um índice de busca para a tela de listagem.
quando_usar:
  - Leituras muito mais frequentes que escritas, ou com formatos distintos do modelo de domínio
  - Domínios com regras de escrita ricas e telas de consulta agregadas
  - Combinação com Event Sourcing para projeções
quando_evitar:
  - CRUD simples, em que o modelo único resolve
  - Equipes sem maturidade para lidar com consistência eventual entre os lados
status: revisado
publico: false
fontes:
  - id: ms_cqrs
    tipo: artigo
    titulo: "Pattern: Command Query Responsibility Segregation (microservices.io)"
    link: https://microservices.io/patterns/data/cqrs.html
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: fowler_cqrs
    tipo: artigo
    titulo: CQRS (Martin Fowler)
    link: https://martinfowler.com/bliki/CQRS.html
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: azure_cqrs
    tipo: artigo
    titulo: CQRS pattern (Azure Architecture Center)
    link: https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs
    status_revisao: revisada
    proxima_revisao: 2027-11-22
categorias:
  - "[[system_design_arquitetura|System design e arquitetura]]"
  - "[[mensageria_streaming|Mensageria e streaming]]"
  - "[[banco_relacional|Banco relacional]]"
  - "[[busca_analitico|Busca e analítico]]"
familia: distribuido-arquitetura
subfamilia: Consistência e dados
problema: Um único modelo atende mal leituras complexas e escritas com regras de negócio, e as duas cargas têm perfis de escala diferentes.
tradeoffs:
  - "Ganha: leitura otimizada e escala independente; paga: dois modelos para manter e sincronizar"
  - "Ganha: domínio de escrita focado; paga: consistência eventual entre escrita e leitura"
consequencias:
  - A UI precisa tolerar leitura defasada após um comando
  - A projeção precisa de reconstrução e de monitoramento de atraso
padroesRelacionados:
  - "[[arquitetura_orientada_a_eventos|Arquitetura Orientada a Eventos]]"
  - "[[change_data_capture|Change Data Capture]]"
  - "[[command|Command (GoF)]]"
  - "[[database_per_service|Database per Service]]"
  - "[[event_sourcing|Event Sourcing]]"
  - "[[event_carried_state_transfer|Event-Carried State Transfer]]"
  - "[[sharding|Sharding]]"
casosDeUso:
  - "[[arquitetura_e_system_design|Arquitetura e system design]]"
  - "[[marketplace_e_plataformas_grande_empresa|Marketplace e plataformas (grande empresa)]]"
  - "[[bancos_e_seguros_grande_empresa|Bancos e seguros (grande empresa)]]"
  - "[[varejo_de_grande_escala_grande_empresa|Varejo de grande escala (grande empresa)]]"
variacoes:
  - arq-escolha-dados
  - arq-mensageria
ferramentas:
  - tabela:axon-framework
  - tabela:kurrent-eventstoredb
  - tabela:marten
  - "[[postgresql|PostgreSQL]]"
  - "[[apache_kafka|Apache Kafka]]"
  - "[[mongodb|MongoDB (ferramenta)]]"
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# CQRS
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
