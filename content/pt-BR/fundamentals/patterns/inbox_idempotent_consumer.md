---
id: inbox_idempotent_consumer
tipo: padrao
nome: Inbox e Idempotent Consumer
aliases:
  - Idempotencia
  - Inbox e Idempotent Consumer
  - Inbox
  - Idempotent Consumer
  - Consumidor idempotente
descricao: O consumidor registra o identificador de cada mensagem processada (tabela inbox) e ignora repetições, de modo que processar a mesma mensagem várias vezes tenha o mesmo efeito de processá-la uma vez.
fonte_ids:
  - ms_idempotent_consumer
  - book_richardson
  - book_eip
exemplo: O consumidor de pagamentos grava message_id em uma tabela inbox na mesma transação que atualiza o saldo e ignora IDs já vistos.
quando_usar:
  - Consumidores de filas e tópicos com entrega at-least-once
  - Operações com efeito financeiro ou de inventário
  - APIs expostas a retry de clientes (use chave de idempotência)
quando_evitar:
  - Operações naturalmente idempotentes, como definir um valor absoluto, em que a verificação extra não agrega
  - Fluxos descartáveis em que duplicatas não causam dano
status: revisado
publico: false
fontes:
  - id: ms_idempotent_consumer
    tipo: artigo
    titulo: "Pattern: Idempotent Consumer (microservices.io)"
    link: https://microservices.io/patterns/communication-style/idempotent-consumer.html
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: book_richardson
    tipo: livro
    titulo: Microservices Patterns (Chris Richardson)
    link: https://microservices.io/book
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
subfamilia: Consistência e dados
problema: Brokers com entrega at-least-once, retries e reprocessamento de DLQ entregam a mesma mensagem mais de uma vez, e efeitos colaterais duplicados (cobrar duas vezes, enviar dois e-mails) causam dano real.
tradeoffs:
  - "Ganha: reprocessamento seguro; paga: uma consulta e uma escrita extras por mensagem"
  - "Ganha: simplicidade no produtor; paga: o armazenamento de IDs processados cresce e precisa de expiração"
consequencias:
  - O ID de deduplicação precisa ser estável e vir do produtor
  - A verificação e o efeito devem ocorrer na mesma transação para evitar janela de duplicação
padroesRelacionados:
  - "[[competing_consumers|Competing Consumers]]"
  - "[[dead_letter_queue|DLQ]]"
  - "[[retry_backoff_exponencial|Retry]]"
  - "[[saga_orquestrada|SAGA Orquestrada]]"
  - "[[transactional_outbox|Transactional Outbox]]"
casosDeUso:
  - "[[arquitetura_e_system_design|Arquitetura e system design]]"
  - "[[pagamentos_e_cobranca|Pagamentos e cobrança]]"
  - "[[integracao_de_apis_e_webhooks|Integração de APIs e webhooks]]"
  - "[[fintech_media_empresa|Fintech (média empresa)]]"
variacoes:
  - arq-mensageria
ferramentas:
  - "[[amazon_sqs|Amazon SQS]]"
  - "[[rabbitmq|RabbitMQ]]"
  - tabela:apache-kafka
  - "[[postgresql|PostgreSQL]]"
  - "[[redis|Redis (ferramenta)]]"
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Idempotencia

Operacao que pode ser executada multiplas vezes sem efeitos colaterais adicionais. Essencial para mecanismos de reprocessamento em sistemas distribuidos.

**Conteudo completo:** Padroes de Resiliencia

## Relacionamentos
- Padroes de Resiliencia
- [[dead_letter_queue|DLQ]]
- [[retry_backoff_exponencial|Retry]]
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
