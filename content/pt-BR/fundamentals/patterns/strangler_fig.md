---
id: strangler_fig
tipo: padrao
nome: Strangler Fig
aliases:
  - Strangler Application
  - Figueira estranguladora
descricao: "Substitui um sistema legado aos poucos: uma fachada roteia cada funcionalidade para o novo sistema à medida que ela é migrada, até o legado poder ser desligado."
fonte_ids:
  - fowler_strangler
  - ms_strangler
  - azure_strangler
exemplo: O proxy envia /checkout para o novo serviço e todas as demais rotas continuam no monolito.
quando_usar:
  - Modernização de monolitos e sistemas legados
  - Migrações com requisito de operação contínua
  - Troca incremental de tecnologia ou de provedor
quando_evitar:
  - Sistemas pequenos que a reescrita direta resolve
  - Legados sem ponto de interceptação possível (sem proxy ou fachada viável)
status: revisado
publico: false
fontes:
  - id: fowler_strangler
    tipo: artigo
    titulo: Strangler Fig Application (Martin Fowler)
    link: https://martinfowler.com/bliki/StranglerFigApplication.html
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: ms_strangler
    tipo: artigo
    titulo: "Pattern: Strangler application (microservices.io)"
    link: https://microservices.io/patterns/refactoring/strangler-application.html
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: azure_strangler
    tipo: artigo
    titulo: Strangler Fig pattern (Azure Architecture Center)
    link: https://learn.microsoft.com/en-us/azure/architecture/patterns/strangler-fig
    status_revisao: revisada
    proxima_revisao: 2027-11-22
categorias:
  - "[[gateway_api_service_mesh|Gateway de API e service mesh]]"
  - "[[system_design_arquitetura|System design e arquitetura]]"
familia: distribuido-arquitetura
subfamilia: Integração e borda
problema: Reescrever um sistema inteiro de uma vez é caro, arriscado e entrega valor só no final.
tradeoffs:
  - "Ganha: risco baixo e valor incremental; paga: convivência prolongada de dois sistemas"
  - "Ganha: rollback simples por rota; paga: sincronização de dados entre antigo e novo"
consequencias:
  - Precisa de um roteador ou proxy na frente do legado
  - Sem data para desligar o legado, a migração nunca termina
padroesRelacionados:
  - "[[anti_corruption_layer|Anti-Corruption Layer]]"
  - "[[api_gateway|API Gateway (padrão)]]"
  - "[[change_data_capture|Change Data Capture]]"
  - "[[microservices|Microservices]]"
  - "[[monolito_modular|Monolito Modular]]"
casosDeUso:
  - "[[migracao_e_modernizacao_de_codigo|Migração e modernização de código]]"
  - "[[refatoracao_de_codigo|Refatoração de código]]"
  - "[[arquitetura_e_system_design|Arquitetura e system design]]"
  - "[[bancos_e_seguros_grande_empresa|Bancos e seguros (grande empresa)]]"
  - "[[setor_publico_grande_empresa|Setor público (grande empresa)]]"
variacoes: []
ferramentas:
  - "[[nginx|NGINX]]"
  - "[[kong_gateway|Kong Gateway]]"
  - "[[envoy|Envoy]]"
  - "[[traefik|Traefik]]"
  - tabela:amazon-api-gateway
  - "[[debezium|Debezium]]"
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Strangler Fig
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
