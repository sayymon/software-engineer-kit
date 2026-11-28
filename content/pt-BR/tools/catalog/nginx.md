---
id: nginx
tipo: ferramenta
nome: NGINX
tipos:
  - SOFTWARE
empresa: "[[f5|F5]]"
aliases:
  - NGINX
categorias:
  - "[[gateway_api_service_mesh|Gateway de API e service mesh]]"
funcionalidades: []
casosDeUso: []
modelos: []
modeloContratacao:
  - open-source
  - free
precoUSD: 0
plataformas:
  - linux
  - macos
  - windows
  - cli
  - self-hosted
linguagens:
  - agnostica
porte:
  - pessoa-fisica
  - pequena
  - media
  - grande
segmentos:
  - devops-infra
restricoes:
  - implementação para Windows em estágio de prova de conceito, recomendada apenas para desenvolvimento e testes
dataVerificacao: 2026-11-27
fontePreco: https://github.com/nginx/nginx
precoMedio: 0
licenca:
  - BSD-2-Clause
tags:
  - ferramenta
  - gateway-api
---
# NGINX
## 📋 Informações Básicas
- **Tipos:** SOFTWARE
- **Empresa/Fabricante:** [[f5|F5]]
- **Website:** https://nginx.org
- **Categorias:** [[gateway_api_service_mesh|Gateway de API e service mesh]]
- **Modelo de contratação:** open-source, free
- **Preço (USD):** Gratuito, licença BSD-2-Clause (licença lida no repositório oficial em 2026-11-27)
- **Data de verificação:** 2026-11-27
- **Fonte do preço:** https://github.com/nginx/nginx
## 📝 Descrição
Servidor web, proxy reverso e balanceador usado como gateway de borda.
## ⏰ Quando Utilizar
- Opção da faixa mais barata e um dos essenciais em [[gateway_api_service_mesh|Gateway de API e service mesh]].
- Escolha quando a borda precisa de servidor web, proxy reverso, cache e balanceamento em um único software.
### Quando NÃO utilizar
- Quando uma opção mais simples da mesma categoria já resolve o problema.
## 🖥 Compatibilidade e Plataformas
- **Plataformas:** linux, macos, windows, cli, self-hosted
- **Linguagens:** agnostica
- **Porte:** pessoa-fisica, pequena, media, grande
- **Segmentos:** devops-infra
## 🔒 Restrições e Especificações
- implementação para Windows em estágio de prova de conceito, recomendada apenas para desenvolvimento e testes (README oficial lido em 2026-11-27)
## 🆚 Alternativas
- [[traefik|Traefik]]
- Apache APISIX
- [[kong_gateway|Kong Gateway]]
- [[envoy|Envoy]]
- Tyk
- [[istio|Istio]]
- Linkerd
- Amazon API Gateway
## 💰 Custo e Contratação
- Gratuito, licença BSD-2-Clause (licença lida no repositório oficial em 2026-11-27)
- **Fonte:** https://github.com/nginx/nginx
## 🔗 Relacionamentos
- **Empresa:** [[f5|F5]]
- **Categorias:** [[gateway_api_service_mesh|Gateway de API e service mesh]]
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
