---
id: prometheus
tipo: ferramenta
nome: Prometheus
tipos:
  - SOFTWARE
empresa: "[[cloud_native_computing_foundation|Cloud Native Computing Foundation]]"
aliases:
  - Prometheus
categorias:
  - "[[observabilidade_apm|Observabilidade e APM]]"
funcionalidades: []
casosDeUso:
  - "[[resposta_a_incidentes|Resposta a incidentes]]"
modelos: []
modeloContratacao:
  - open-source
  - free
precoUSD: 0
plataformas:
  - web
  - self-hosted
  - cloud
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
  - foco em métricas de séries temporais e alertas; logs e traces ficam para as outras ferramentas da categoria
dataVerificacao: 2026-11-27
fontePreco: https://github.com/prometheus/prometheus
precoMedio: 0
licenca:
  - Apache-2.0
tags:
  - ferramenta
  - observabilidade-apm
---
# Prometheus
## 📋 Informações Básicas
- **Tipos:** SOFTWARE
- **Empresa/Fabricante:** [[cloud_native_computing_foundation|Cloud Native Computing Foundation]]
- **Website:** https://prometheus.io
- **Categorias:** [[observabilidade_apm|Observabilidade e APM]]
- **Modelo de contratação:** open-source, free
- **Preço (USD):** Gratuito, licença Apache-2.0 (arquivo de licença do repositório lido em 2026-11-27)
- **Data de verificação:** 2026-11-27
- **Fonte do preço:** https://github.com/prometheus/prometheus
## 📝 Descrição
Sistema open-source de monitoramento e alertas: coleta métricas de séries temporais dos serviços por HTTP pull, armazena em banco local e consulta com PromQL. Projeto hospedado na Cloud Native Computing Foundation.
## ⏰ Quando Utilizar
- Outra opção na faixa mais barata em [[observabilidade_apm|Observabilidade e APM]]; também consta nos essenciais da categoria.
- Métricas e alertas self-hosted sem custo de licença, com o modelo pull do ecossistema cloud native.
- Fonte de dados de métricas para dashboards da família Grafana.
### Quando NÃO utilizar
- Quando precisa de logs e traces além de métricas: [[opentelemetry|OpenTelemetry]] cobre a instrumentação; SigNoz junta os três sinais em um produto só.
- Quando quer plataforma SaaS gerenciada com suporte dedicado: [[grafana_cloud|Grafana Cloud]] ou [[datadog|Datadog]].
## 🖥 Compatibilidade e Plataformas
- **Plataformas:** web, self-hosted, cloud
- **Linguagens:** agnostica
- **Porte:** pessoa-fisica, pequena, media, grande
- **Segmentos:** geral
## 🔒 Restrições e Especificações
- foco em métricas de séries temporais e alertas; logs e traces ficam para as outras ferramentas da categoria
## 🆚 Alternativas
- [[opentelemetry|OpenTelemetry]]
- SigNoz
- [[grafana_cloud|Grafana Cloud]]
- [[sentry|Sentry]]
- Better Stack
- [[datadog|Datadog]]
- [[new_relic|New Relic (ferramenta)]]
- Dynatrace
## 💰 Custo e Contratação
- Gratuito, licença Apache-2.0 (arquivo de licença do repositório lido em 2026-11-27)
- **Fonte:** https://github.com/prometheus/prometheus
## 📚 Documentação
- https://prometheus.io/docs/
## 🔗 Relacionamentos
- **Empresa:** [[cloud_native_computing_foundation|Cloud Native Computing Foundation]]
- **Categorias:** [[observabilidade_apm|Observabilidade e APM]]
- **Casos de uso:** [[resposta_a_incidentes|Resposta a incidentes]]
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
