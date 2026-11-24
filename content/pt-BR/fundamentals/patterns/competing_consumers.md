---
id: competing_consumers
tipo: padrao
nome: Competing Consumers
aliases:
  - Consumidores concorrentes
descricao: Várias instâncias de consumidores leem da mesma fila e disputam as mensagens, de modo que cada mensagem é processada por apenas uma delas.
fonte_ids:
  - azure_competing_consumers
  - book_eip
exemplo: Dez workers consomem a fila de envio de e-mails e o autoscaling aumenta o número deles conforme o tamanho da fila.
quando_usar:
  - Escalar processamento de filas horizontalmente
  - Absorver picos de carga com workers elásticos
  - Tolerar a queda de uma instância sem parar o fluxo
quando_evitar:
  - Fluxos que exigem ordem estrita global das mensagens
  - Mensagens que precisam ser entregues a todos os consumidores (use Publish-Subscribe)
status: revisado
publico: false
fontes:
  - id: azure_competing_consumers
    tipo: artigo
    titulo: Competing Consumers pattern (Azure Architecture Center)
    link: https://learn.microsoft.com/en-us/azure/architecture/patterns/competing-consumers
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: book_eip
    tipo: livro
    titulo: Enterprise Integration Patterns (Gregor Hohpe e Bobby Woolf)
    link: https://www.enterpriseintegrationpatterns.com/
    status_revisao: revisada
    proxima_revisao: 2027-11-22
categorias:
  - "[[mensageria_streaming|Mensageria e streaming]]"
  - "[[filas_jobs_background|Filas e jobs em background]]"
familia: distribuido-arquitetura
subfamilia: Mensageria
problema: Um único consumidor não acompanha o volume de mensagens e vira gargalo e ponto único de falha.
tradeoffs:
  - "Ganha: vazão e resiliência; paga: a ordem entre mensagens deixa de ser garantida"
  - "Ganha: escala elástica; paga: o processamento precisa ser idempotente e sem estado local"
consequencias:
  - A ordem por chave exige partições ou grupos de mensagens
  - Mensagens venenosas precisam de DLQ
padroesRelacionados:
  - "[[backpressure|Backpressure]]"
  - "[[claim_check|Claim Check]]"
  - "[[dead_letter_queue|DLQ]]"
  - "[[inbox_idempotent_consumer|Idempotência]]"
  - "[[leader_election|Leader Election]]"
  - "[[publish_subscribe|Publish-Subscribe]]"
casosDeUso:
  - "[[arquitetura_e_system_design|Arquitetura e system design]]"
  - "[[integracao_de_apis_e_webhooks|Integração de APIs e webhooks]]"
  - "[[engenharia_de_dados_e_etl|Engenharia de dados e ETL]]"
  - "[[operacao_de_loja_virtual|Operação de loja virtual]]"
variacoes:
  - arq-mensageria
ferramentas:
  - "[[amazon_sqs|Amazon SQS]]"
  - "[[rabbitmq|RabbitMQ]]"
  - tabela:apache-kafka
  - "[[bullmq|BullMQ]]"
  - tabela:celery
  - tabela:sidekiq
  - tabela:apache-activemq
  - tabela:amazon-mq
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Competing Consumers
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
