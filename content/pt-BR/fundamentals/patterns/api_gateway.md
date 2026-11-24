---
id: api_gateway
tipo: padrao
nome: API Gateway
aliases:
  - API Gateway
  - Gateway de API
descricao: Ponto único de entrada para os clientes de um conjunto de serviços. Roteia, agrega respostas e centraliza autenticação, limite de taxa, cache e observabilidade.
fonte_ids:
  - ms_api_gateway
  - azure_gateway_routing
  - book_richardson
exemplo: O Kong autentica o JWT, aplica 100 req/min por chave e roteia /pedidos para o serviço de pedidos.
quando_usar:
  - Expor vários serviços como uma API coerente
  - Centralizar autenticação, quotas e logs de borda
  - Traduzir protocolos entre clientes externos e serviços internos
quando_evitar:
  - Sistemas com um único serviço, em que o gateway é uma camada extra
  - Lógica de negócio, que deve ficar nos serviços e não no gateway
status: revisado
publico: false
fontes:
  - id: ms_api_gateway
    tipo: artigo
    titulo: "Pattern: API Gateway / Backends for Frontends (microservices.io)"
    link: https://microservices.io/patterns/apigateway.html
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: azure_gateway_routing
    tipo: artigo
    titulo: Gateway Routing pattern (Azure Architecture Center)
    link: https://learn.microsoft.com/en-us/azure/architecture/patterns/gateway-routing
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: book_richardson
    tipo: livro
    titulo: Microservices Patterns (Chris Richardson)
    link: https://microservices.io/book
    status_revisao: revisada
    proxima_revisao: 2027-11-22
categorias:
  - "[[gateway_api_service_mesh|Gateway de API e service mesh]]"
  - "[[autenticacao_autorizacao_libs|Autenticação e autorização]]"
familia: distribuido-arquitetura
subfamilia: Integração e borda
problema: Clientes que falam direto com dezenas de microsserviços se acoplam a endereços, protocolos e políticas de segurança duplicadas.
tradeoffs:
  - "Ganha: borda única e políticas centralizadas; paga: ponto crítico de disponibilidade e possível gargalo"
  - "Ganha: clientes simples; paga: risco de o gateway virar um monolito de regras"
consequencias:
  - O gateway precisa de alta disponibilidade e deploy independente
  - Um gateway por tipo de cliente leva ao padrão Backend for Frontend
padroesRelacionados:
  - "[[backend_for_frontend|Backend for Frontend]]"
  - "[[microservices|Microservices]]"
  - "[[rate_limiting|Rate Limiting (padrão)]]"
  - "[[service_mesh|Service Mesh]]"
  - "[[strangler_fig|Strangler Fig]]"
casosDeUso:
  - "[[integracao_de_apis_e_webhooks|Integração de APIs e webhooks]]"
  - "[[arquitetura_e_system_design|Arquitetura e system design]]"
  - "[[marketplace_e_plataformas_grande_empresa|Marketplace e plataformas (grande empresa)]]"
  - "[[software_b2b_media_empresa|Software B2B (média empresa)]]"
variacoes: []
ferramentas:
  - "[[kong_gateway|Kong Gateway]]"
  - tabela:amazon-api-gateway
  - tabela:nginx
  - tabela:traefik
  - tabela:apache-apisix
  - tabela:tyk
  - tabela:envoy
notaCompleta:
  - "[[api_gateway|API Gateway]]"
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# API Gateway
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
