---
id: nats
tipo: ferramenta
nome: NATS
tipos:
  - SOFTWARE
  - SERVICO
empresa: "[[cloud_native_computing_foundation|Cloud Native Computing Foundation]]"
aliases:
  - NATS
  - NATS Server
categorias:
  - "[[mensageria_streaming|Mensageria e streaming]]"
funcionalidades: []
casosDeUso:
  - "[[arquitetura_e_system_design|Arquitetura e system design]]"
modelos: []
modeloContratacao:
  - open-source
  - free
precoUSD: 0
plataformas:
  - cloud
  - self-hosted
  - linux
  - api
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
fontePreco: https://github.com/nats-io/nats-server
precoMedio: 0
licenca:
  - Apache-2.0
tags:
  - ferramenta
  - mensageria-streaming
---
# NATS
## 📋 Informações Básicas
- **Tipos:** SOFTWARE, SERVICO
- **Empresa/Fabricante:** [[cloud_native_computing_foundation|Cloud Native Computing Foundation]]
- **Website:** https://nats.io
- **Categorias:** [[mensageria_streaming|Mensageria e streaming]]
- **Modelo de contratação:** open-source, free
- **Preço (USD):** Gratuito, licença Apache-2.0 (arquivo LICENSE do repositório oficial e página oficial About lidos em 2026-11-27)
- **Data de verificação:** 2026-11-27
- **Fonte do preço:** https://github.com/nats-io/nats-server
## 📝 Descrição
Infraestrutura open source de conectividade e dados para sistemas distribuídos, da nuvem à borda: mensageria pub/sub e request/reply, streaming persistente com JetStream, key-value e descoberta de serviços em um único binário sem dependências externas, com milhões de mensagens por segundo, latências sub-milissegundo e uso típico de menos de 20 MB de RAM. Projeto graduado da Cloud Native Computing Foundation, com clientes oficiais para mais de 10 linguagens e 30+ mantidos pela comunidade (site oficial lido em 2026-11-27).
## ⏰ Quando Utilizar
- Outra opção na faixa mais barata em [[mensageria_streaming|Mensageria e streaming]].
- Mensageria leve na borda, em clusters e entre nuvens: leaf nodes e superclusters estendem a topologia sem downtime nem redesign.
- Conectar serviços, dispositivos e agentes de IA no mesmo sistema, com contas isolando tenants.
### Quando NÃO utilizar
- Quando o cenário é streaming pesado com retenção longa e ecossistema de conectores: [[apache_kafka|Apache Kafka]] é o padrão de mercado para pipelines de eventos em larga escala.
- Quando basta uma fila gerenciada simples em nuvem, sem operar infraestrutura: [[amazon_sqs|Amazon SQS]] resolve direto no provedor.
## 🖥 Compatibilidade e Plataformas
- **Plataformas:** cloud, self-hosted, linux, api
- **Linguagens:** agnostica
- **Porte:** pessoa-fisica, pequena, media, grande
- **Segmentos:** geral
## 🔒 Restrições e Especificações
- sem restrições relevantes registradas
## 🆚 Alternativas
- [[apache_kafka|Apache Kafka]]
- [[rabbitmq|RabbitMQ]]
- [[amazon_sqs|Amazon SQS]]
- [[confluent_cloud|Confluent Cloud]]
- [[amazon_msk|Amazon MSK (ferramenta)]]
- Redpanda
- Google Pub/Sub
- Azure Event Hubs
## 💰 Custo e Contratação
- Gratuito, licença Apache-2.0 (arquivo LICENSE do repositório oficial e página oficial About lidos em 2026-11-27)
- **Fonte:** https://github.com/nats-io/nats-server
## 🔗 Relacionamentos
- **Empresa:** [[cloud_native_computing_foundation|Cloud Native Computing Foundation]]
- **Categorias:** [[mensageria_streaming|Mensageria e streaming]]
- **Casos de uso:** [[arquitetura_e_system_design|Arquitetura e system design]]
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
