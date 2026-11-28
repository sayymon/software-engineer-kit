---
id: apache_kafka
tipo: ferramenta
nome: Apache Kafka
tipos:
  - SOFTWARE
  - SERVICO
empresa: "[[apache_software_foundation|Apache Software Foundation]]"
aliases:
  - Apache Kafka
  - Kafka
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
fontePreco: https://github.com/apache/kafka
precoMedio: 0
licenca:
  - Apache-2.0
tags:
  - ferramenta
  - mensageria-streaming
---
# Apache Kafka
## 📋 Informações Básicas
- **Tipos:** SOFTWARE, SERVICO
- **Empresa/Fabricante:** [[apache_software_foundation|Apache Software Foundation]]
- **Website:** https://kafka.apache.org
- **Categorias:** [[mensageria_streaming|Mensageria e streaming]]
- **Modelo de contratação:** open-source, free
- **Preço (USD):** Gratuito, licença Apache-2.0 (arquivo LICENSE do repositório oficial lido em 2026-11-27)
- **Data de verificação:** 2026-11-27
- **Fonte do preço:** https://github.com/apache/kafka
## 📝 Descrição
Plataforma de streaming de eventos distribuída e open source, usada por milhares de empresas para pipelines de dados de alto desempenho, streaming analytics, integração de dados e aplicações críticas. Projeto da Apache Software Foundation que escala para até mil brokers, trilhões de mensagens por dia e petabytes de dados, com processamento de streams embutido (Kafka Streams), conectoria via Kafka Connect e latências da ordem de 2 ms (site oficial lido em 2026-11-27).
## ⏰ Quando Utilizar
- Referência nos essenciais em [[mensageria_streaming|Mensageria e streaming]].
- Streaming de eventos durável com ordenação garantida, zero perda de mensagens e processamento exactly-once em pipelines críticos.
- Desacoplar produtores e consumidores em larga escala, com retenção longa que permite replay e reprocessamento de eventos.
- Integrar centenas de fontes e destinos (bancos, filas, armazenamento) com a interface Kafka Connect.
### Quando NÃO utilizar
- Quando a mensageria precisa ser leve e barata em recursos: [[nats|NATS]] e [[rabbitmq|RabbitMQ]] operam com bem menos infraestrutura.
- Quando basta uma fila de tarefas gerenciada em nuvem, sem operar cluster: [[amazon_sqs|Amazon SQS]] resolve direto no provedor.
## 🖥 Compatibilidade e Plataformas
- **Plataformas:** cloud, self-hosted, linux, api
- **Linguagens:** agnostica
- **Porte:** pessoa-fisica, pequena, media, grande
- **Segmentos:** geral
## 🔒 Restrições e Especificações
- sem restrições relevantes registradas
## 🆚 Alternativas
- [[nats|NATS]]
- [[rabbitmq|RabbitMQ]]
- [[amazon_sqs|Amazon SQS]]
- [[confluent_cloud|Confluent Cloud]]
- [[amazon_msk|Amazon MSK (ferramenta)]]
- Redpanda
- Google Pub/Sub
- Azure Event Hubs
## 💰 Custo e Contratação
- Gratuito, licença Apache-2.0 (arquivo LICENSE do repositório oficial lido em 2026-11-27)
- **Fonte:** https://github.com/apache/kafka
## 🔗 Relacionamentos
- **Empresa:** [[apache_software_foundation|Apache Software Foundation]]
- **Categorias:** [[mensageria_streaming|Mensageria e streaming]]
- **Casos de uso:** [[arquitetura_e_system_design|Arquitetura e system design]]
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
