---
id: retry_backoff_exponencial
tipo: padrao
nome: Retry com Backoff Exponencial
aliases:
  - Retentativa
  - Retry com Backoff Exponencial
  - Exponential Backoff
descricao: Repete uma operação que falhou por motivo transitório, aumentando o intervalo entre tentativas (backoff exponencial) e adicionando jitter aleatório para não sincronizar clientes.
fonte_ids:
  - azure_retry
  - aws_timeouts_retries
  - aws_reliability
exemplo: O cliente tenta após 100 ms, 200 ms e 400 ms com jitter, e desiste na quarta falha enviando a mensagem para a DLQ.
quando_usar:
  - Erros transitórios (timeout, 503, throttling)
  - Operações idempotentes ou protegidas por chave de idempotência
  - Chamadas a serviços gerenciados que aplicam rate limiting
quando_evitar:
  - Erros permanentes (400, 404, validação)
  - Operações não idempotentes sem proteção contra duplicidade
status: revisado
publico: false
fontes:
  - id: azure_retry
    tipo: artigo
    titulo: Retry pattern (Azure Architecture Center)
    link: https://learn.microsoft.com/en-us/azure/architecture/patterns/retry
    status_revisao: revisada
    proxima_revisao: 2027-11-22
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
categorias:
  - "[[frameworks_backend|Frameworks de backend]]"
  - "[[gateway_api_service_mesh|Gateway de API e service mesh]]"
familia: distribuido-arquitetura
subfamilia: Resiliência
problema: Falhas transitórias de rede e de dependências desaparecem sozinhas, mas retries imediatos e sincronizados aumentam a carga justamente quando o serviço está sobrecarregado.
tradeoffs:
  - "Ganha: absorve falhas transitórias sem intervenção; paga: latência maior e carga adicional na dependência"
  - "Ganha: menos erros visíveis ao usuário; paga: pode esconder problemas se não houver métrica de tentativas"
consequencias:
  - Retries em várias camadas se multiplicam, e por isso um orçamento de retry por requisição é necessário
  - O número máximo de tentativas deve caber no timeout total
padroesRelacionados:
  - "[[circuit_breaker|Circuit Breaker]]"
  - "[[dead_letter_queue|DLQ]]"
  - "[[failover|Estratégias de failover]]"
  - "[[inbox_idempotent_consumer|Idempotência]]"
  - "[[timeout|Timeout]]"
casosDeUso:
  - "[[integracao_de_apis_e_webhooks|Integração de APIs e webhooks]]"
  - "[[resposta_a_incidentes|Resposta a incidentes]]"
  - "[[pagamentos_e_cobranca|Pagamentos e cobrança]]"
  - "[[arquitetura_e_system_design|Arquitetura e system design]]"
variacoes:
  - arq-mensageria
ferramentas:
  - tabela:resilience4j
  - tabela:polly
  - "[[istio|Istio]]"
  - "[[envoy|Envoy]]"
  - "[[temporal|Temporal]]"
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Retry com Backoff Exponencial

Padrao que tenta novamente uma operacao que falhou, aumentando progressivamente o tempo entre tentativas para desafogar o servico sobrecarregado.

**Conteudo completo:** Padroes de Resiliencia

## Relacionamentos
- Padroes de Resiliencia
- [[circuit_breaker|Circuit Breaker]]
- [[dead_letter_queue|DLQ]]
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
