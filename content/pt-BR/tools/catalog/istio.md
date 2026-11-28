---
id: istio
tipo: ferramenta
nome: Istio
tipos:
  - SOFTWARE
empresa: "[[cloud_native_computing_foundation|Cloud Native Computing Foundation]]"
aliases:
  - Istio
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
  - sem restrições relevantes registradas
dataVerificacao: 2026-11-27
fontePreco: https://github.com/istio/istio
precoMedio: 0
licenca:
  - Apache-2.0
tags:
  - ferramenta
  - gateway-api
---
# Istio
## 📋 Informações Básicas
- **Tipos:** SOFTWARE
- **Empresa/Fabricante:** [[cloud_native_computing_foundation|Cloud Native Computing Foundation]]
- **Website:** https://istio.io
- **Categorias:** [[gateway_api_service_mesh|Gateway de API e service mesh]]
- **Modelo de contratação:** open-source, free
- **Preço (USD):** Gratuito, licença Apache-2.0 (licença lida no repositório oficial em 2026-11-27)
- **Data de verificação:** 2026-11-27
- **Fonte do preço:** https://github.com/istio/istio
## 📝 Descrição
Service mesh com mTLS, roteamento, retry, timeout e circuit breaking sem alterar o código.
## ⏰ Quando Utilizar
- Referência da faixa de qualidade máxima em [[gateway_api_service_mesh|Gateway de API e service mesh]].
- Escolha quando o cluster precisa de service mesh com mTLS, roteamento e telemetria sem alterar o código dos serviços.
### Quando NÃO utilizar
- Quando não há microsserviços para conectar e observar: o custo de operar uma service mesh não se justifica.
- Quando uma opção mais simples da mesma categoria já resolve o problema.
## 🖥 Compatibilidade e Plataformas
- **Plataformas:** linux, cli, self-hosted
- **Linguagens:** agnostica
- **Porte:** pessoa-fisica, pequena, media, grande
- **Segmentos:** devops-infra
## 🔒 Restrições e Especificações
- sem restrições relevantes registradas
## 🆚 Alternativas
- [[traefik|Traefik]]
- [[nginx|NGINX]]
- Apache APISIX
- [[kong_gateway|Kong Gateway]]
- [[envoy|Envoy]]
- Tyk
- Linkerd
- Amazon API Gateway
## 💰 Custo e Contratação
- Gratuito, licença Apache-2.0 (licença lida no repositório oficial em 2026-11-27)
- **Fonte:** https://github.com/istio/istio
## 🔗 Relacionamentos
- **Empresa:** [[cloud_native_computing_foundation|Cloud Native Computing Foundation]]
- **Categorias:** [[gateway_api_service_mesh|Gateway de API e service mesh]]
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
