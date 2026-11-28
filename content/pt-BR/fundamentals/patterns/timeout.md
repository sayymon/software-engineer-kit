---
id: timeout
tipo: padrao
nome: Timeout
aliases:
  - Tempo limite
descricao: Define o tempo máximo de espera por uma resposta antes de tratar a operação como falha, liberando threads, conexões e o usuário.
fonte_ids:
  - aws_timeouts_retries
  - aws_reliability
  - azure_patterns_index
exemplo: O cliente HTTP do serviço de pagamentos usa timeout de conexão de 200 ms e de leitura de 2 s.
quando_usar:
  - Toda chamada de rede (HTTP, banco, fila)
  - Fluxos com orçamento de latência definido por SLO
  - Base para Retry e Circuit Breaker
quando_evitar:
  - Operações de longa duração legítimas, que pedem modelo assíncrono em vez de um timeout longo
status: revisado
publico: false
fontes:
  - id: aws_timeouts_retries
    tipo: artigo
    titulo: Timeouts, retries and backoff with jitter (Amazon Builders' Library)
    link: https://builder.aws.com/content/3EumjoZascWd1oZiEgL8ORlv3qE/timeouts-retries-and-backoff-with-jitter
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: aws_reliability
    tipo: artigo
    titulo: Reliability pillar (AWS Well-Architected Framework)
    link: https://docs.aws.amazon.com/wellarchitected/latest/framework/reliability.html
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: azure_patterns_index
    tipo: artigo
    titulo: Cloud design patterns (Azure Architecture Center)
    link: https://learn.microsoft.com/en-us/azure/architecture/patterns/
    status_revisao: revisada
    proxima_revisao: 2027-11-22
categorias:
  - "[[frameworks_backend|Frameworks de backend]]"
  - "[[gateway_api_service_mesh|Gateway de API e service mesh]]"
familia: distribuido-arquitetura
subfamilia: Resiliência
problema: Sem limite de espera, uma dependência lenta prende recursos do chamador indefinidamente e transforma lentidão em indisponibilidade.
tradeoffs:
  - "Ganha: recursos liberados e falha previsível; paga: o valor precisa ser calibrado pela latência real (p99)"
  - "Ganha: base para retry e fallback; paga: timeouts curtos demais geram falsos erros e retry storms"
consequencias:
  - Os timeouts devem diminuir ao longo da cadeia de chamadas (deadline propagation)
  - O valor deve ser medido, não adivinhado
padroesRelacionados:
  - "[[bulkhead|Bulkhead]]"
  - "[[circuit_breaker|Circuit Breaker]]"
  - "[[load_shedding|Load Shedding]]"
  - "[[retry_backoff_exponencial|Retry]]"
casosDeUso:
  - "[[resposta_a_incidentes|Resposta a incidentes]]"
  - "[[observabilidade_em_producao|Observabilidade em produção]]"
  - "[[integracao_de_apis_e_webhooks|Integração de APIs e webhooks]]"
  - "[[pagamentos_e_cobranca|Pagamentos e cobrança]]"
variacoes: []
ferramentas:
  - tabela:resilience4j
  - tabela:polly
  - "[[envoy|Envoy]]"
  - "[[istio|Istio]]"
  - "[[nginx|NGINX]]"
  - "[[okhttp|OkHttp]]"
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Timeout

Define tempo maximo de espera por uma resposta antes de considerar a operacao como falha. Deve estar presente em todas as chamadas de rede.

**Conteudo completo:** Padroes de Resiliencia

## Relacionamentos
- Padroes de Resiliencia
- [[retry_backoff_exponencial|Retry]]
- [[circuit_breaker|Circuit Breaker]]
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
