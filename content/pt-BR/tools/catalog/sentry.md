---
id: sentry
tipo: ferramenta
nome: Sentry
tipos:
  - SOFTWARE
  - SAAS
empresa: "[[functional_software_inc|Functional Software, Inc.]]"
aliases:
  - Sentry
categorias:
  - "[[observabilidade_apm|Observabilidade e APM]]"
funcionalidades: []
casosDeUso:
  - "[[depuracao_e_correcao_de_bugs|Depuração e correção de bugs]]"
  - "[[resposta_a_incidentes|Resposta a incidentes]]"
modelos: []
modeloContratacao:
  - free
  - subscription
  - enterprise
precoUSD: 26
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
  - plano Developer gratuito limitado a um usuário (5k erros, 5M spans, 5GB de logs e 50 replays por mês)
  - uso acima da cota cobrado por evento (pay-as-you-go) nos planos pagos
  - código do servidor source-available (FSL-1.1-Apache-2.0), sem aprovação OSI
dataVerificacao: 2026-11-27
fontePreco: https://sentry.io/pricing/
precoMedio: 26
licenca:
  - FSL-1.1-ALv2
tags:
  - ferramenta
  - observabilidade-apm
---
# Sentry
## 📋 Informações Básicas
- **Tipos:** SOFTWARE, SAAS
- **Empresa/Fabricante:** [[functional_software_inc|Functional Software, Inc.]]
- **Website:** https://sentry.io
- **Categorias:** [[observabilidade_apm|Observabilidade e APM]]
- **Modelo de contratação:** free, subscription, enterprise
- **Preço (USD):** Developer $0 (1 usuário); Team a partir de $26/mês (cobrança anual); Business a partir de $80/mês (cobrança anual); Enterprise sob consulta (página oficial lida em 2026-11-27)
- **Data de verificação:** 2026-11-27
- **Fonte do preço:** https://sentry.io/pricing/
## 📝 Descrição
Plataforma de rastreamento de erros e performance de aplicações: SDKs oficiais capturam exceções com stack traces e contexto de release, e a plataforma agrega monitoramento de erros, logs, tracing, profiling e session replay. Disponível como SaaS ou self-hosted; o código do servidor é source-available.
## ⏰ Quando Utilizar
- Outra opção na faixa melhor custo-benefício em [[observabilidade_apm|Observabilidade e APM]].
- Rastrear erros de aplicação com stack traces, release health e alertas, começando sem custo no plano Developer e escalando por consumo.
- Diagnosticar falhas com contexto de release, suspect commits e replay de sessão nos planos que incluem cada recurso.
### Quando NÃO utilizar
- Quando a política do time exige licença aprovada pela OSI: o servidor é source-available sob FSL, não open-source.
- Quando o foco é métrica de infraestrutura e alertas, e não erro de aplicação: [[prometheus|Prometheus]].
- Quando quer APM open-source completo self-hosted: SigNoz.
## 🖥 Compatibilidade e Plataformas
- **Plataformas:** web, self-hosted, cloud
- **Linguagens:** agnostica
- **Porte:** pessoa-fisica, pequena, media, grande
- **Segmentos:** geral
## 🔒 Restrições e Especificações
- plano Developer gratuito limitado a um usuário (5k erros, 5M spans, 5GB de logs e 50 replays por mês)
- uso acima da cota cobrado por evento (pay-as-you-go) nos planos pagos
- código do servidor source-available (FSL-1.1-Apache-2.0), sem aprovação OSI
## 🆚 Alternativas
- [[opentelemetry|OpenTelemetry]]
- [[prometheus|Prometheus]]
- SigNoz
- [[grafana_cloud|Grafana Cloud]]
- Better Stack
- [[datadog|Datadog]]
- [[new_relic|New Relic (ferramenta)]]
- Dynatrace
## 💰 Custo e Contratação
- Developer $0/mês (1 usuário; 5k erros, 5M spans, 5GB de logs e 50 session replays por mês)
- Team a partir de $26/mês, cobrado anualmente com dados pré-pagos (usuários ilimitados; 50k erros/mês; alertas via ferramentas integradas; Seer, agente de debugging por IA, exige assinatura)
- Business a partir de $80/mês, cobrado anualmente (dashboards ilimitados, SAML e SCIM)
- Enterprise sob consulta (gerente técnico de conta e suporte dedicado); uso acima da cota cobrado pay-as-you-go em todos os planos pagos
- O código do servidor é source-available: Functional Source License 1.1 com future license Apache-2.0 (SPDX FSL-1.1-ALv2; arquivo LICENSE do repositório oficial lido em 2026-11-27); a família FSL é detalhada em [[fsl_1_1_mit|FSL-1.1-MIT]]
- **Fonte:** https://sentry.io/pricing/
## 📚 Documentação
- https://docs.sentry.io/
## 🔗 Relacionamentos
- **Empresa:** [[functional_software_inc|Functional Software, Inc.]]
- **Categorias:** [[observabilidade_apm|Observabilidade e APM]]
- **Casos de uso:** [[depuracao_e_correcao_de_bugs|Depuração e correção de bugs]], [[resposta_a_incidentes|Resposta a incidentes]]
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
