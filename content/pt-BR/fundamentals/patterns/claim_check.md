---
id: claim_check
tipo: padrao
nome: Claim Check
aliases:
  - Claim-Check
descricao: Armazena o payload grande fora do broker (por exemplo, em um object storage) e envia na mensagem apenas uma referência. O consumidor usa a referência para buscar o conteúdo.
fonte_ids:
  - azure_claim_check
  - book_eip
exemplo: O produtor grava um vídeo no Amazon S3 e publica na fila apenas o bucket e a chave do objeto.
quando_usar:
  - Payloads de arquivos, imagens ou documentos grandes
  - Brokers com limite de tamanho de mensagem
  - Quando só parte dos consumidores precisa do conteúdo completo
quando_evitar:
  - Mensagens pequenas, em que a indireção só adiciona latência
  - Fluxos sem um armazenamento durável e acessível a todos os consumidores
status: revisado
publico: false
fontes:
  - id: azure_claim_check
    tipo: artigo
    titulo: Claim-Check pattern (Azure Architecture Center)
    link: https://learn.microsoft.com/en-us/azure/architecture/patterns/claim-check
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
  - "[[objetos_cdn|Armazenamento de objetos e CDN]]"
familia: distribuido-arquitetura
subfamilia: Mensageria
problema: Mensagens grandes superam o limite do broker, aumentam a latência e o custo, e sobrecarregam a rede para consumidores que só precisam de metadados.
tradeoffs:
  - "Ganha: mensagens leves e barato escalar; paga: um segundo ponto de falha e uma chamada extra de leitura"
  - "Ganha: broker focado em roteamento; paga: ciclo de vida do objeto precisa ser gerenciado"
consequencias:
  - Expiração do objeto antes do consumo causa falhas
  - Permissões de leitura precisam cobrir todos os consumidores
padroesRelacionados:
  - "[[competing_consumers|Competing Consumers]]"
  - "[[event_carried_state_transfer|Event-Carried State Transfer]]"
  - "[[publish_subscribe|Publish-Subscribe]]"
casosDeUso:
  - "[[arquitetura_e_system_design|Arquitetura e system design]]"
  - "[[engenharia_de_dados_e_etl|Engenharia de dados e ETL]]"
  - "[[producao_de_video|Produção de vídeo]]"
  - "[[analise_de_documentos_e_imagens|Análise de documentos e imagens]]"
variacoes:
  - arq-mensageria
ferramentas:
  - "[[amazon_s3|Amazon S3 (ferramenta)]]"
  - "[[amazon_sqs|Amazon SQS]]"
  - tabela:apache-kafka
  - "[[rabbitmq|RabbitMQ]]"
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Claim Check
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
