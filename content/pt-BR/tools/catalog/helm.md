---
id: helm
tipo: ferramenta
nome: Helm
tipos:
  - SOFTWARE
empresa: "[[cloud_native_computing_foundation|Cloud Native Computing Foundation]]"
aliases:
  - Helm
categorias:
  - "[[containers_orquestracao|Containers e orquestração]]"
funcionalidades: []
casosDeUso:
  - "[[provisionamento_de_infraestrutura|Provisionamento de infraestrutura]]"
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
linguagens:
  - agnostica
porte:
  - pessoa-fisica
  - pequena
  - media
  - grande
segmentos:
  - geral
restricoes:
  - sem restrições relevantes registradas
dataVerificacao: 2026-11-27
fontePreco: https://github.com/helm/helm
precoMedio: 0
licenca:
  - Apache-2.0
tags:
  - ferramenta
  - containers-orquestracao
---
# Helm
## 📋 Informações Básicas
- **Tipos:** SOFTWARE
- **Empresa/Fabricante:** [[cloud_native_computing_foundation|Cloud Native Computing Foundation]]
- **Website:** https://helm.sh/
- **Categorias:** [[containers_orquestracao|Containers e orquestração]]
- **Modelo de contratação:** open-source, free
- **Preço (USD):** Gratuito, licença Apache-2.0 (arquivo de licença do repositório lido em 2026-11-27)
- **Data de verificação:** 2026-11-27
- **Fonte do preço:** https://github.com/helm/helm
## 📝 Descrição
Gerenciador de pacotes para Kubernetes: charts definem, instalam e atualizam aplicações, substituindo o copy-and-paste de manifests. Projeto graduado na CNCF, mantido pela comunidade Helm (site oficial lido em 2026-11-27).
## ⏰ Quando Utilizar
- Outra opção nos essenciais em [[containers_orquestracao|Containers e orquestração]].
- Empacotar aplicações Kubernetes complexas com versão, compartilhamento e rollback.
- Padronizar deploys repetíveis entre ambimentos a partir de charts versionados.
### Quando NÃO utilizar
- Manifests simples e estáticos: kubectl com YAML já resolve, sem camada de templating.
- Quando a entrega contínua deve ser dirigida pelo Git: [[argo_cd|Argo CD]] cobre o GitOps sobre charts Helm.
## 🖥 Compatibilidade e Plataformas
- **Plataformas:** linux, macos, windows, cli
- **Linguagens:** agnostica
- **Porte:** pessoa-fisica, pequena, media, grande
- **Segmentos:** geral
## 🔒 Restrições e Especificações
- sem restrições relevantes registradas
## 🆚 Alternativas
- Kustomize
- kubectl com manifests YAML
- [[argo_cd|Argo CD]]
- [[kubernetes|Kubernetes (ferramenta)]]
## 💰 Custo e Contratação
- Gratuito, licença Apache-2.0 (arquivo de licença do repositório lido em 2026-11-27)
- **Fonte:** https://github.com/helm/helm
## 🔗 Relacionamentos
- **Empresa:** [[cloud_native_computing_foundation|Cloud Native Computing Foundation]]
- **Categorias:** [[containers_orquestracao|Containers e orquestração]]
- **Casos de uso:** [[provisionamento_de_infraestrutura|Provisionamento de infraestrutura]]
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
