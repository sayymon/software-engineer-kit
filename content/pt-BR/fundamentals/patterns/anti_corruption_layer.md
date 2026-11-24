---
id: anti_corruption_layer
tipo: padrao
nome: Anti-Corruption Layer
aliases:
  - ACL
  - Camada anticorrupção
descricao: Camada de tradução entre o modelo de um sistema (legado ou externo) e o modelo do novo domínio, que impede que conceitos e esquemas externos vazem para o código novo.
fonte_ids:
  - azure_acl
  - book_richardson
  - fowler_strangler
exemplo: O adaptador converte o pedido do ERP legado em um agregado Pedido do novo domínio antes de qualquer regra de negócio.
quando_usar:
  - Integração com legado durante uma migração
  - Consumo de APIs de terceiros com modelo instável
  - Fronteira entre bounded contexts do DDD
quando_evitar:
  - Quando os dois modelos já são compatíveis
  - Integrações descartáveis de curtíssimo prazo
status: revisado
publico: false
fontes:
  - id: azure_acl
    tipo: artigo
    titulo: Anti-corruption Layer pattern (Azure Architecture Center)
    link: https://learn.microsoft.com/en-us/azure/architecture/patterns/anti-corruption-layer
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: book_richardson
    tipo: livro
    titulo: Microservices Patterns (Chris Richardson)
    link: https://microservices.io/book
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: fowler_strangler
    tipo: artigo
    titulo: Strangler Fig Application (Martin Fowler)
    link: https://martinfowler.com/bliki/StranglerFigApplication.html
    status_revisao: revisada
    proxima_revisao: 2027-11-22
categorias:
  - "[[system_design_arquitetura|System design e arquitetura]]"
  - "[[frameworks_backend|Frameworks de backend]]"
familia: distribuido-arquitetura
subfamilia: Integração e borda
problema: Integrar com um sistema cujo modelo difere do seu contamina o domínio novo com nomes, formatos e regras alheios.
tradeoffs:
  - "Ganha: domínio protegido e trocas de fornecedor mais fáceis; paga: código de tradução para manter"
  - "Ganha: isolamento de mudanças externas; paga: latência e um componente a mais"
consequencias:
  - A ACL precisa de testes de contrato com o sistema externo
  - Combina com Strangler Fig em migrações
padroesRelacionados:
  - "[[adapter|Adapter (GoF)]]"
  - "[[arquitetura_hexagonal|Arquitetura Hexagonal]]"
  - "[[backend_for_frontend|Backend for Frontend]]"
  - "[[sidecar|Sidecar]]"
  - "[[strangler_fig|Strangler Fig]]"
casosDeUso:
  - "[[migracao_e_modernizacao_de_codigo|Migração e modernização de código]]"
  - "[[integracao_de_apis_e_webhooks|Integração de APIs e webhooks]]"
  - "[[arquitetura_e_system_design|Arquitetura e system design]]"
  - "[[software_b2b_media_empresa|Software B2B (média empresa)]]"
variacoes: []
ferramentas:
  - "[[spring_boot|Spring Boot]]"
  - tabela:nestjs
  - tabela:masstransit
  - tabela:apache-kafka
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Anti-Corruption Layer
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
