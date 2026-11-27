---
id: argo_cd
tipo: ferramenta
nome: Argo CD
tipos:
  - SOFTWARE
  - PLATAFORMA
empresa: "[[cloud_native_computing_foundation|Cloud Native Computing Foundation]]"
aliases:
  - Argo CD
categorias:
  - "[[ci_cd_deploy|CI-CD e deploy]]"
funcionalidades: []
casosDeUso:
  - "[[pipelines_de_ci_e_cd|Pipelines de CI e CD]]"
modelos: []
modeloContratacao:
  - open-source
  - free
precoUSD: 0
plataformas:
  - web
  - self-hosted
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
fontePreco: https://github.com/argoproj/argo-cd
precoMedio: 0
licenca:
  - Apache-2.0
tags:
  - ferramenta
  - ci-cd-deploy
---
# Argo CD
## 📋 Informações Básicas
- **Tipos:** SOFTWARE, PLATAFORMA
- **Empresa/Fabricante:** [[cloud_native_computing_foundation|Cloud Native Computing Foundation]]
- **Website:** https://argo-cd.readthedocs.io
- **Categorias:** [[ci_cd_deploy|CI-CD e deploy]]
- **Modelo de contratação:** open-source, free
- **Preço (USD):** Gratuito, licença Apache-2.0 (arquivo de licença do repositório lido em 2026-11-27)
- **Data de verificação:** 2026-11-27
- **Fonte do preço:** https://github.com/argoproj/argo-cd
## 📝 Descrição
Ferramenta declarativa de entrega contínua (GitOps) para Kubernetes: controlador que monitora as aplicações em execução, compara o estado vivo com o estado desejado versionado no Git e sincroniza automatica ou manualmente (documentação oficial lida em 2026-11-27). Parte do projeto Argo, com suporte a kustomize, Helm, jsonnet e YAML puro.
## ⏰ Quando Utilizar
- Entrega contínua GitOps em Kubernetes: o Git como fonte da verdade para o estado desejado, com drift detection e rollback.
- Visualizar e auditar deploys de múltiplos clusters com UI, CLI e webhooks.
- Rollouts complexos com hooks de pre-sync, sync e post-sync (blue/green, canary).
### Quando NÃO utilizar
- Quando não há Kubernetes no alvo do deploy: ferramentas genéricas de CI/CD atendem melhor.
- Quando o fluxo é pipeline imperativo (scripts de push), sem adoção de GitOps declarativo.
## 🖥 Compatibilidade e Plataformas
- **Plataformas:** web, self-hosted
- **Linguagens:** agnostica
- **Porte:** pessoa-fisica, pequena, media, grande
- **Segmentos:** geral
## 🔒 Restrições e Especificações
- sem restrições relevantes registradas
## 🆚 Alternativas
- Flux CD
- Spinnaker
- [[github_actions|GitHub Actions]]
- [[woodpecker_ci|Woodpecker CI]]
- [[harness|Harness]]
- [[helm|Helm]]
## 💰 Custo e Contratação
- Gratuito, licença Apache-2.0 (arquivo de licença do repositório lido em 2026-11-27)
- **Fonte:** https://github.com/argoproj/argo-cd
## 🔗 Relacionamentos
- **Empresa:** [[cloud_native_computing_foundation|Cloud Native Computing Foundation]]
- **Categorias:** [[ci_cd_deploy|CI-CD e deploy]]
- **Casos de uso:** [[pipelines_de_ci_e_cd|Pipelines de CI e CD]]
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
