---
id: circuit_breaker
tipo: padrao
nome: Circuit Breaker
aliases:
  - Disjuntor
descricao: Envolve chamadas a um serviço remoto e monitora falhas. Ao passar do limite, abre o circuito e falha rápido por um período, depois testa a recuperação em modo semiaberto.
fonte_ids:
  - ms_circuit_breaker
  - fowler_circuit_breaker
  - azure_circuit_breaker
exemplo: Após 50% de falhas em 10 s, o circuito do provedor de e-mail abre por 30 s e as chamadas vão para um provedor secundário.
quando_usar:
  - Chamadas de rede a serviços ou APIs de terceiros
  - Dependências que falham de forma intermitente ou lenta
  - Combinação com fallback e failover
quando_evitar:
  - Chamadas locais em memória
  - Operações idempotentes de baixíssima taxa em que o ruído estatístico impede decisões úteis
status: revisado
publico: false
fontes:
  - id: ms_circuit_breaker
    tipo: artigo
    titulo: "Pattern: Circuit Breaker (microservices.io)"
    link: https://microservices.io/patterns/reliability/circuit-breaker.html
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: fowler_circuit_breaker
    tipo: artigo
    titulo: CircuitBreaker (Martin Fowler)
    link: https://martinfowler.com/bliki/CircuitBreaker.html
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: azure_circuit_breaker
    tipo: artigo
    titulo: Circuit Breaker pattern (Azure Architecture Center)
    link: https://learn.microsoft.com/en-us/azure/architecture/patterns/circuit-breaker
    status_revisao: revisada
    proxima_revisao: 2027-11-22
categorias:
  - "[[frameworks_backend|Frameworks de backend]]"
  - "[[gateway_api_service_mesh|Gateway de API e service mesh]]"
  - "[[observabilidade_apm|Observabilidade e APM]]"
familia: distribuido-arquitetura
subfamilia: Resiliência
problema: Chamadas repetidas a uma dependência lenta ou fora do ar esgotam threads e conexões do chamador e propagam a falha em cascata.
tradeoffs:
  - "Ganha: falha rápida e proteção contra cascata; paga: parâmetros (limiar, janela, tempo aberto) para calibrar"
  - "Ganha: tempo para a dependência se recuperar; paga: pode rejeitar chamadas que teriam funcionado"
consequencias:
  - Cada estado do circuito vira métrica e alerta
  - Precisa de comportamento de fallback definido para o circuito aberto
padroesRelacionados:
  - "[[bulkhead|Bulkhead]]"
  - "[[decorator|Decorator (GoF)]]"
  - "[[dead_letter_queue|DLQ]]"
  - "[[failover|Estratégias de failover]]"
  - "[[retry_backoff_exponencial|Retry]]"
  - "[[service_mesh|Service Mesh]]"
  - "[[sidecar|Sidecar]]"
  - "[[timeout|Timeout]]"
casosDeUso:
  - "[[resposta_a_incidentes|Resposta a incidentes]]"
  - "[[observabilidade_em_producao|Observabilidade em produção]]"
  - "[[pagamentos_e_cobranca|Pagamentos e cobrança]]"
  - "[[marketplace_e_plataformas_grande_empresa|Marketplace e plataformas (grande empresa)]]"
  - "[[integracao_de_apis_e_webhooks|Integração de APIs e webhooks]]"
variacoes: []
ferramentas:
  - tabela:resilience4j
  - tabela:polly
  - "[[istio|Istio]]"
  - "[[envoy|Envoy]]"
  - "[[spring_boot|Spring Boot]]"
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
guia_ids:
  - tec_circuit_breaker
---
# Circuit Breaker

Padrao de resiliencia que protege sistemas de falhas em cascata, monitorando chamadas a servicos externos e "abrindo o circuito" quando detecta muitas falhas.

**Conteudo completo:** Padroes de Resiliencia

## Relacionamentos
- Padroes de Resiliencia
- [[retry_backoff_exponencial|Retry]]
- [[timeout|Timeout]]
- [[bulkhead|Bulkhead]]
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
