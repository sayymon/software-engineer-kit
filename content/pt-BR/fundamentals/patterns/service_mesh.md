---
id: service_mesh
tipo: padrao
nome: Service Mesh
aliases:
  - Malha de serviços
descricao: "Camada de infraestrutura, normalmente com sidecars, que gerencia a comunicação entre serviços: roteamento, mTLS, retry, timeout, circuit breaking e observabilidade, sem mudar o código das aplicações."
fonte_ids:
  - ms_service_mesh
  - azure_sidecar
  - book_richardson
exemplo: O Istio aplica mTLS entre todos os pods e faz canary de 5% do tráfego para a nova versão.
quando_usar:
  - Dezenas de serviços com políticas de rede e segurança uniformes
  - Requisito de mTLS ponta a ponta entre serviços
  - Releases graduais (canary) e roteamento por tráfego
quando_evitar:
  - Poucos serviços, em que uma biblioteca resolve
  - Equipes sem capacidade de operar a malha e o cluster
status: revisado
publico: false
fontes:
  - id: ms_service_mesh
    tipo: artigo
    titulo: "Pattern: Service mesh (microservices.io)"
    link: https://microservices.io/patterns/deployment/service-mesh.html
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: azure_sidecar
    tipo: artigo
    titulo: Sidecar pattern (Azure Architecture Center)
    link: https://learn.microsoft.com/en-us/azure/architecture/patterns/sidecar
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
  - "[[containers_orquestracao|Containers e orquestração]]"
  - "[[observabilidade_apm|Observabilidade e APM]]"
familia: distribuido-arquitetura
subfamilia: Integração e borda
problema: Resiliência, segurança e telemetria da comunicação entre dezenas de serviços, implementadas por biblioteca em cada linguagem, ficam inconsistentes e difíceis de atualizar.
tradeoffs:
  - "Ganha: políticas uniformes e observabilidade fora do código; paga: complexidade operacional e overhead de latência"
  - "Ganha: independência de linguagem; paga: curva de aprendizado e depuração em camadas extras"
consequencias:
  - A malha vira dependência crítica e precisa de upgrades planejados
  - Custos de CPU e memória dos proxies entram no capacity planning
padroesRelacionados:
  - "[[api_gateway|API Gateway (padrão)]]"
  - "[[circuit_breaker|Circuit Breaker]]"
  - "[[microservices|Microservices]]"
  - "[[proxy|Proxy (GoF)]]"
  - "[[sidecar|Sidecar]]"
casosDeUso:
  - "[[observabilidade_em_producao|Observabilidade em produção]]"
  - "[[provisionamento_de_infraestrutura|Provisionamento de infraestrutura]]"
  - "[[resposta_a_incidentes|Resposta a incidentes]]"
  - "[[telecom_grande_empresa|Telecom (grande empresa)]]"
  - "[[bancos_e_seguros_grande_empresa|Bancos e seguros (grande empresa)]]"
variacoes: []
ferramentas:
  - tabela:istio
  - tabela:linkerd
  - tabela:envoy
  - "[[kubernetes|Kubernetes (ferramenta)]]"
  - "[[opentelemetry|OpenTelemetry]]"
  - tabela:dapr
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Service Mesh
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
