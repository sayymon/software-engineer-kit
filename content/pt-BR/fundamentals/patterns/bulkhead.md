---
id: bulkhead
tipo: padrao
nome: Bulkhead
aliases:
  - Compartimentacao
  - Compartimentação
descricao: Isola recursos (threads, conexões, memória) por funcionalidade ou cliente, como compartimentos de um navio. A falha ou sobrecarga de um compartimento não afunda os outros.
fonte_ids:
  - azure_bulkhead
  - aws_reliability
  - book_richardson
exemplo: O serviço usa pools de threads separados para a API de pagamentos e para a de recomendações.
quando_usar:
  - Serviços que chamam várias dependências com perfis de risco diferentes
  - Multi-tenant em que um cliente barulhento não pode afetar os demais
  - Separar tráfego crítico do tráfego em lote
quando_evitar:
  - Sistemas pequenos com uma única dependência
  - Quando o isolamento fragmenta recursos escassos a ponto de desperdiçá-los
status: revisado
publico: false
fontes:
  - id: azure_bulkhead
    tipo: artigo
    titulo: Bulkhead pattern (Azure Architecture Center)
    link: https://learn.microsoft.com/en-us/azure/architecture/patterns/bulkhead
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: aws_reliability
    tipo: artigo
    titulo: Reliability pillar (AWS Well-Architected Framework)
    link: https://docs.aws.amazon.com/wellarchitected/latest/framework/reliability.html
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: book_richardson
    tipo: livro
    titulo: Microservices Patterns (Chris Richardson)
    link: https://microservices.io/book
    status_revisao: revisada
    proxima_revisao: 2027-11-22
categorias:
  - "[[frameworks_backend|Frameworks de backend]]"
  - "[[containers_orquestracao|Containers e orquestração]]"
familia: distribuido-arquitetura
subfamilia: Resiliência
problema: Um recurso compartilhado, como um pool de threads, é consumido por uma dependência lenta e derruba funcionalidades sem relação com ela.
tradeoffs:
  - "Ganha: contenção de falhas e previsibilidade; paga: capacidade ociosa por compartimento"
  - "Ganha: proteção do tráfego crítico; paga: mais pools e limites para dimensionar"
consequencias:
  - Os limites de cada compartimento precisam de métricas de saturação
  - Combina com Circuit Breaker e Timeout
padroesRelacionados:
  - "[[circuit_breaker|Circuit Breaker]]"
  - "[[load_shedding|Load Shedding]]"
  - "[[rate_limiting|Rate Limiting (padrão)]]"
  - "[[timeout|Timeout]]"
casosDeUso:
  - "[[resposta_a_incidentes|Resposta a incidentes]]"
  - "[[observabilidade_em_producao|Observabilidade em produção]]"
  - "[[marketplace_e_plataformas_grande_empresa|Marketplace e plataformas (grande empresa)]]"
  - "[[software_b2b_media_empresa|Software B2B (média empresa)]]"
variacoes: []
ferramentas:
  - tabela:resilience4j
  - tabela:polly
  - "[[kubernetes|Kubernetes (ferramenta)]]"
  - "[[istio|Istio]]"
  - "[[envoy|Envoy]]"
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Bulkhead

Padrao de resiliencia que isola recursos (threads, conexoes, memoria) por funcionalidade, como compartimentos de um navio. Se um compartimento falha, os outros continuam funcionando.

**Conteudo completo:** Padroes de Resiliencia

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
