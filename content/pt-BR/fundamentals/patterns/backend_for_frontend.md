---
id: backend_for_frontend
tipo: padrao
nome: Backend for Frontend
aliases:
  - BFF
descricao: Cria um backend dedicado para cada tipo de cliente (web, mobile, parceiros), que agrega e adapta chamadas aos serviços de acordo com as necessidades daquela experiência.
fonte_ids:
  - newman_bff
  - azure_bff
  - ms_api_gateway
exemplo: O app mobile usa um BFF que devolve em uma chamada os dados que a web busca em cinco.
quando_usar:
  - Apps web e mobile com telas e payloads diferentes
  - Times de frontend que precisam de autonomia de entrega
  - Redução de chamadas e de dados trafegados em redes móveis
quando_evitar:
  - Um único tipo de cliente
  - Quando as diferenças entre clientes são pequenas e um gateway único as cobre
status: revisado
publico: false
fontes:
  - id: newman_bff
    tipo: artigo
    titulo: Backends For Frontends (Sam Newman)
    link: https://samnewman.io/patterns/architectural/bff/
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: azure_bff
    tipo: artigo
    titulo: Backends for Frontends pattern (Azure Architecture Center)
    link: https://learn.microsoft.com/en-us/azure/architecture/patterns/backends-for-frontends
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: ms_api_gateway
    tipo: artigo
    titulo: "Pattern: API Gateway / Backends for Frontends (microservices.io)"
    link: https://microservices.io/patterns/apigateway.html
    status_revisao: revisada
    proxima_revisao: 2027-11-22
categorias:
  - "[[frameworks_backend|Frameworks de backend]]"
  - "[[gateway_api_service_mesh|Gateway de API e service mesh]]"
  - "[[frameworks_mobile|Frameworks de mobile]]"
familia: distribuido-arquitetura
subfamilia: Integração e borda
problema: Uma API única de propósito geral atende mal clientes com necessidades distintas e vira disputa entre equipes de frontend.
tradeoffs:
  - "Ganha: API sob medida e autonomia do time de frontend; paga: mais serviços e lógica de agregação duplicada"
  - "Ganha: menos acoplamento do cliente aos serviços; paga: o time do frontend assume a operação do BFF"
consequencias:
  - Regras de negócio permanecem nos serviços de domínio
  - Cada BFF pertence ao time da sua experiência
padroesRelacionados:
  - "[[anti_corruption_layer|Anti-Corruption Layer]]"
  - "[[api_gateway|API Gateway (padrão)]]"
  - "[[microservices|Microservices]]"
casosDeUso:
  - "[[prototipacao_de_front_end|Prototipação de front-end]]"
  - "[[arquitetura_e_system_design|Arquitetura e system design]]"
  - "[[marketplace_e_plataformas_grande_empresa|Marketplace e plataformas (grande empresa)]]"
  - "[[software_b2b_media_empresa|Software B2B (média empresa)]]"
variacoes: []
ferramentas:
  - tabela:nestjs
  - "[[fastify|Fastify]]"
  - "[[express|Express]]"
  - tabela:hono
  - "[[kong_gateway|Kong Gateway]]"
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Backend for Frontend
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
