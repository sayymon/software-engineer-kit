---
id: sidecar
tipo: padrao
nome: Sidecar
aliases:
  - Sidecar Pattern
descricao: Implanta um contêiner auxiliar junto ao serviço principal, no mesmo pod ou host, para tratar funções transversais como proxy, logs, métricas, segredos e mTLS.
fonte_ids:
  - azure_sidecar
  - ms_sidecar
  - book_richardson
exemplo: Um sidecar Envoy ao lado de cada pod faz mTLS e coleta métricas de todas as chamadas.
quando_usar:
  - Funções transversais independentes da linguagem do serviço
  - Adotar proxy, telemetria ou segurança sem alterar o código legado
  - Base para service mesh
quando_evitar:
  - Serviços únicos em que a biblioteca é mais simples
  - Ambientes com restrições severas de memória e CPU por instância
status: revisado
publico: false
fontes:
  - id: azure_sidecar
    tipo: artigo
    titulo: Sidecar pattern (Azure Architecture Center)
    link: https://learn.microsoft.com/en-us/azure/architecture/patterns/sidecar
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: ms_sidecar
    tipo: artigo
    titulo: "Pattern: Service mesh / Sidecar (microservices.io)"
    link: https://microservices.io/patterns/deployment/sidecar.html
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: book_richardson
    tipo: livro
    titulo: Microservices Patterns (Chris Richardson)
    link: https://microservices.io/book
    status_revisao: revisada
    proxima_revisao: 2027-11-22
categorias:
  - "[[containers_orquestracao|Containers e orquestração]]"
  - "[[gateway_api_service_mesh|Gateway de API e service mesh]]"
familia: distribuido-arquitetura
subfamilia: Integração e borda
problema: Cada serviço, em várias linguagens, precisa reimplementar funções transversais, o que gera inconsistência e duplicação.
tradeoffs:
  - "Ganha: reuso entre linguagens e deploy desacoplado; paga: consumo extra de recursos por instância"
  - "Ganha: aplicação mais enxuta; paga: latência adicional e mais um processo para operar"
consequencias:
  - O ciclo de vida do sidecar precisa acompanhar o do serviço
  - Atualizar o sidecar significa reiniciar os pods
padroesRelacionados:
  - "[[anti_corruption_layer|Anti-Corruption Layer]]"
  - "[[circuit_breaker|Circuit Breaker]]"
  - "[[microservices|Microservices]]"
  - "[[proxy|Proxy (GoF)]]"
  - "[[service_mesh|Service Mesh]]"
casosDeUso:
  - "[[observabilidade_em_producao|Observabilidade em produção]]"
  - "[[provisionamento_de_infraestrutura|Provisionamento de infraestrutura]]"
  - "[[arquitetura_e_system_design|Arquitetura e system design]]"
  - "[[marketplace_e_plataformas_grande_empresa|Marketplace e plataformas (grande empresa)]]"
variacoes: []
ferramentas:
  - "[[envoy|Envoy]]"
  - "[[istio|Istio]]"
  - tabela:linkerd
  - tabela:dapr
  - "[[kubernetes|Kubernetes (ferramenta)]]"
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Sidecar
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
