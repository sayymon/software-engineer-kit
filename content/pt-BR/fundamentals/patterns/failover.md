---
id: failover
tipo: padrao
nome: Estratégias de Failover
aliases:
  - Estratégias de Failover
  - Failover
  - Alternância de provedor
descricao: Desvia o tráfego de um componente com falha para outro funcional (réplica, região ou provedor alternativo), garantindo continuidade do serviço.
fonte_ids:
  - aws_reliability
  - ms_circuit_breaker
  - azure_patterns_index
exemplo: Provider A falha, o circuit breaker abre, o tráfego vai para Provider B e depois para Provider C, e o que sobra vai para a DLQ.
quando_usar:
  - Dependências críticas com alternativa disponível (provedores de e-mail, SMS, pagamentos)
  - Bancos e serviços com réplicas em outra zona ou região
  - Metas de disponibilidade acima de 99,9%
quando_evitar:
  - Componentes não críticos, em que degradar graciosamente basta
  - Quando o custo da redundância supera o custo da indisponibilidade
status: revisado
publico: false
fontes:
  - id: aws_reliability
    tipo: artigo
    titulo: Reliability pillar (AWS Well-Architected Framework)
    link: https://docs.aws.amazon.com/wellarchitected/latest/framework/reliability.html
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: ms_circuit_breaker
    tipo: artigo
    titulo: "Pattern: Circuit Breaker (microservices.io)"
    link: https://microservices.io/patterns/reliability/circuit-breaker.html
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: azure_patterns_index
    tipo: artigo
    titulo: Cloud design patterns (Azure Architecture Center)
    link: https://learn.microsoft.com/en-us/azure/architecture/patterns/
    status_revisao: revisada
    proxima_revisao: 2027-11-22
categorias:
  - "[[gateway_api_service_mesh|Gateway de API e service mesh]]"
  - "[[nuvem_publica_generalista|Nuvem pública generalista]]"
  - "[[containers_orquestracao|Containers e orquestração]]"
familia: distribuido-arquitetura
subfamilia: Resiliência
problema: A queda de um componente único derruba o serviço inteiro, e a recuperação manual leva tempo acima do que o SLO permite.
tradeoffs:
  - "Ganha: continuidade e menor RTO; paga: redundância custa mais e exige sincronização de dados"
  - "Ganha: tolera falhas regionais; paga: testes de failover regulares, ou o caminho alternativo apodrece"
consequencias:
  - Detecção de falha precisa evitar flapping entre primário e secundário
  - O caminho de failover deve ser exercitado em game days
padroesRelacionados:
  - "[[circuit_breaker|Circuit Breaker]]"
  - "[[dead_letter_queue|DLQ]]"
  - "[[leader_election|Leader Election]]"
  - "[[retry_backoff_exponencial|Retry]]"
casosDeUso:
  - "[[resposta_a_incidentes|Resposta a incidentes]]"
  - "[[provisionamento_de_infraestrutura|Provisionamento de infraestrutura]]"
  - "[[bancos_e_seguros_grande_empresa|Bancos e seguros (grande empresa)]]"
  - "[[telecom_grande_empresa|Telecom (grande empresa)]]"
variacoes: []
ferramentas:
  - "[[istio|Istio]]"
  - "[[envoy|Envoy]]"
  - "[[nginx|NGINX]]"
  - "[[kubernetes|Kubernetes (ferramenta)]]"
  - tabela:amazon-api-gateway
  - "[[traefik|Traefik]]"
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Estrategias de Failover

Tecnicas para desviar trafego de um componente com falha para outro que esteja funcional, garantindo continuidade do servico.

**Relacao com:** Padroes de Resiliencia

## Exemplo
```
Provider A (falhou) → Circuit Breaker abre → Provider B → Provider C → DLQ
```

## Relacionamentos
- Padroes de Resiliencia
- [[circuit_breaker|Circuit Breaker]]
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
