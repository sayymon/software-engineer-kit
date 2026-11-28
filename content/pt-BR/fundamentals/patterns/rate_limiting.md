---
id: rate_limiting
tipo: padrao
nome: Rate Limiting
aliases:
  - Limitacao de Taxa
  - Throttling
  - Rate Limiting
  - Limitação de Taxa
descricao: Limita o número de requisições que um cliente pode fazer em um período, usando algoritmos como token bucket, leaky bucket e janelas fixas ou deslizantes.
fonte_ids:
  - azure_rate_limiting
  - ms_api_gateway
  - aws_load_shedding
exemplo: O gateway permite 100 requisições por minuto por chave de API e responde 429 com o cabeçalho Retry-After ao exceder.
quando_usar:
  - APIs públicas e parceiros com cota contratada
  - Proteção de dependências com capacidade conhecida
  - Prevenção de abuso e de custo em chamadas pagas (inclusive LLM)
quando_evitar:
  - Tráfego interno controlado por backpressure, em que o limite duplicaria o mecanismo
  - Quando a causa da sobrecarga é capacidade insuficiente e a ação correta é escalar
status: revisado
publico: false
fontes:
  - id: azure_rate_limiting
    tipo: artigo
    titulo: Rate Limiting pattern (Azure Architecture Center)
    link: https://learn.microsoft.com/en-us/azure/architecture/patterns/rate-limiting-pattern
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: ms_api_gateway
    tipo: artigo
    titulo: "Pattern: API Gateway / Backends for Frontends (microservices.io)"
    link: https://microservices.io/patterns/apigateway.html
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: aws_load_shedding
    tipo: artigo
    titulo: Using load shedding to avoid overload (Amazon Builders' Library)
    link: https://builder.aws.com/content/3Eun1EEyX6p2e3VYNyRLSJzLuMV/using-load-shedding-to-avoid-overload
    status_revisao: revisada
    proxima_revisao: 2027-11-22
categorias:
  - "[[gateway_api_service_mesh|Gateway de API e service mesh]]"
  - "[[chave_valor_cache|Chave-valor e cache]]"
familia: distribuido-arquitetura
subfamilia: Resiliência
problema: Clientes sem limite esgotam capacidade, geram custo imprevisível e degradam o serviço para todos, seja por abuso ou por bug.
tradeoffs:
  - "Ganha: justiça entre clientes e proteção do serviço; paga: clientes legítimos podem receber 429 em picos"
  - "Ganha: custo previsível; paga: estado distribuído (contadores) para manter consistente"
consequencias:
  - Retornar 429 com Retry-After ajuda os clientes a se adaptarem
  - Limites por cliente, por rota e globais podem coexistir
padroesRelacionados:
  - "[[api_gateway|API Gateway (padrão)]]"
  - "[[backpressure|Backpressure]]"
  - "[[bulkhead|Bulkhead]]"
  - "[[cache_aside|Cache-aside]]"
  - "[[load_shedding|Load Shedding]]"
casosDeUso:
  - "[[integracao_de_apis_e_webhooks|Integração de APIs e webhooks]]"
  - "[[observabilidade_em_producao|Observabilidade em produção]]"
  - "[[marketplace_e_plataformas_grande_empresa|Marketplace e plataformas (grande empresa)]]"
  - "[[pagamentos_e_cobranca|Pagamentos e cobrança]]"
variacoes: []
ferramentas:
  - "[[kong_gateway|Kong Gateway]]"
  - "[[nginx|NGINX]]"
  - "[[envoy|Envoy]]"
  - "[[redis|Redis (ferramenta)]]"
  - tabela:amazon-api-gateway
  - tabela:resilience4j
  - tabela:apache-apisix
notaCompleta:
  - "[[rate_limiting|Rate Limiting]]"
dataVerificacao: 2026-11-22
tags:
  - padrao
guia_ids:
  - tec_rate_limiting
---
# Rate Limiting

Tecnica que limita o numero de requisicoes que um cliente pode fazer em um periodo de tempo. Protege APIs de sobrecarga e garante fair use.

**Conteudo completo:** [[rate_limiting|Rate Limiting]]

## Relacionamentos
- Padroes de Resiliencia
- Engenharia de Software
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
