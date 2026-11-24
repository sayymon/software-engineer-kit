---
id: amazon_msk
tipo: ferramenta
nome: Amazon MSK
tipos:
  - SOFTWARE
  - SERVICO
empresa: "[[amazon_web_services|Amazon Web Services]]"
aliases:
  - Amazon MSK
categorias:
  - "[[mensageria_streaming|Mensageria e streaming]]"
funcionalidades: []
casosDeUso: []
modelos: []
modeloContratacao:
  - subscription
precoUSD: 0.204
plataformas:
  - cloud
  - self-hosted
  - linux
  - api
linguagens:
  - agnostica
porte:
  - media
  - grande
segmentos:
  - geral
restricoes:
  - precoUSD é a tarifa de hora (broker kafka.m7g.large), não um valor mensal
dataVerificacao: 2026-11-21
fontePreco: https://aws.amazon.com/msk/pricing/
precoMedio: 0
tags:
  - ferramenta
  - mensageria-streaming
---
# Amazon MSK (ferramenta)
## 📋 Informações Básicas
- **Tipos:** SOFTWARE, SERVICO
- **Empresa/Fabricante:** [[amazon_web_services|Amazon Web Services]]
- **Website:** https://aws.amazon.com/msk/
- **Categorias:** [[mensageria_streaming|Mensageria e streaming]]
- **Modelo de contratação:** subscription
- **Preço (USD):** US$ 0.2 por hora (broker kafka.m7g.large) (plano Provisioned, página oficial consultada em 2026-11-21)
- **Data de verificação:** 2026-11-21
- **Fonte do preço:** https://aws.amazon.com/msk/pricing/
## 📝 Descrição
Kafka gerenciado da AWS.
## ⏰ Quando Utilizar
- Referência da faixa qualidade máxima em [[mensageria_streaming|Mensageria e streaming]].
- Escolha quando a qualidade, a escala ou o suporte máximos justificam o custo.
### Quando NÃO utilizar
- Quando o orçamento é restrito e as faixas mais baratas já resolvem o problema.
## 🖥 Compatibilidade e Plataformas
- **Plataformas:** cloud, self-hosted, linux, api
- **Linguagens:** agnostica
- **Porte:** media, grande
- **Segmentos:** geral
## 🔒 Restrições e Especificações
- precoUSD é a tarifa de hora (broker kafka.m7g.large), não um valor mensal
## 🆚 Alternativas
- [[rabbitmq|RabbitMQ]]
- NATS
- Apache Kafka
- [[amazon_sqs|Amazon SQS]]
- Google Pub/Sub
- Redpanda
- [[confluent_cloud|Confluent Cloud]]
- Azure Event Hubs
## 💰 Custo e Contratação
- US$ 0.2 por hora (broker kafka.m7g.large) (plano Provisioned, página oficial consultada em 2026-11-21)
- **Fonte:** https://aws.amazon.com/msk/pricing/
## 🔗 Relacionamentos
- **Empresa:** [[amazon_web_services|Amazon Web Services]]
- **Categorias:** [[mensageria_streaming|Mensageria e streaming]]
- **Nota anterior:** [[amazon_msk|Amazon MSK]]
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
