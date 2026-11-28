---
id: dead_letter_queue
tipo: padrao
nome: Dead Letter Queue
aliases:
  - Dead Letter Queue
  - Dead Letter Channel
descricao: Fila separada que recebe mensagens que falharam após as tentativas configuradas. Preserva a mensagem para inspeção e reprocessamento, sem bloquear o fluxo principal.
fonte_ids:
  - eip_dlq
  - book_eip
  - aws_reliability
exemplo: Após 5 tentativas, o Amazon SQS move a mensagem para a DLQ e um alarme avisa o time.
quando_usar:
  - Qualquer consumidor com retry limitado
  - Fluxos em que perder mensagens é inaceitável
  - Depuração de falhas de contrato ou de dados
quando_evitar:
  - Dados descartáveis em que a falha pode ser ignorada
  - Quando ninguém monitora nem reprocessa a DLQ, o que a transforma em lixeira silenciosa
status: revisado
publico: false
fontes:
  - id: eip_dlq
    tipo: artigo
    titulo: Dead Letter Channel (Enterprise Integration Patterns)
    link: https://www.enterpriseintegrationpatterns.com/patterns/messaging/DeadLetterChannel.html
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: book_eip
    tipo: livro
    titulo: Enterprise Integration Patterns (Gregor Hohpe e Bobby Woolf)
    link: https://www.enterpriseintegrationpatterns.com/
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: aws_reliability
    tipo: artigo
    titulo: Reliability pillar (AWS Well-Architected Framework)
    link: https://docs.aws.amazon.com/wellarchitected/latest/framework/reliability.html
    status_revisao: revisada
    proxima_revisao: 2027-11-22
categorias:
  - "[[mensageria_streaming|Mensageria e streaming]]"
  - "[[filas_jobs_background|Filas e jobs em background]]"
familia: distribuido-arquitetura
subfamilia: Mensageria
problema: Uma mensagem venenosa repetida trava a fila ou é perdida após esgotar os retries, e o time não consegue investigar nem reprocessar.
tradeoffs:
  - "Ganha: nenhuma mensagem perdida e fluxo principal livre; paga: uma fila extra para monitorar e alertar"
  - "Ganha: diagnóstico com payload original; paga: reprocessar exige idempotência e ferramenta de redrive"
consequencias:
  - Alarme sobre profundidade da DLQ passa a ser obrigatório
  - Redrive precisa de política para não repetir a falha
padroesRelacionados:
  - "[[circuit_breaker|Circuit Breaker]]"
  - "[[competing_consumers|Competing Consumers]]"
  - "[[failover|Estratégias de failover]]"
  - "[[inbox_idempotent_consumer|Idempotência]]"
  - "[[retry_backoff_exponencial|Retry]]"
casosDeUso:
  - "[[arquitetura_e_system_design|Arquitetura e system design]]"
  - "[[integracao_de_apis_e_webhooks|Integração de APIs e webhooks]]"
  - "[[resposta_a_incidentes|Resposta a incidentes]]"
  - "[[engenharia_de_dados_e_etl|Engenharia de dados e ETL]]"
variacoes:
  - arq-mensageria
ferramentas:
  - "[[amazon_sqs|Amazon SQS]]"
  - "[[rabbitmq|RabbitMQ]]"
  - "[[apache_kafka|Apache Kafka]]"
  - tabela:amazon-sns
  - tabela:apache-pulsar
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# DLQ - Dead Letter Queue

Fila especial para mensagens que falharam apos multiplas tentativas de processamento. Garante que nenhuma mensagem é perdida.

**Conteudo completo:** Padroes de Resiliencia

## Relacionamentos
- Padroes de Resiliencia
- [[retry_backoff_exponencial|Retry]]
- [[inbox_idempotent_consumer|Idempotencia]]
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
