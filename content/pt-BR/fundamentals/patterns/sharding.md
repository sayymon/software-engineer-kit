---
id: sharding
tipo: padrao
nome: Sharding
aliases:
  - Particionamento horizontal
descricao: Divide os dados em partições (shards) distribuídas em vários nós, escolhidas por uma chave de particionamento. Cada nó guarda e atende apenas parte dos dados.
fonte_ids:
  - azure_sharding
  - azure_patterns_index
  - aws_reliability
exemplo: Pedidos são distribuídos em 16 shards por hash do customer_id, e cada cliente sempre cai no mesmo nó.
quando_usar:
  - Volumes de dados ou escrita acima do que um nó suporta
  - Multi-tenant com isolamento por cliente
  - Dados com chave natural de distribuição (tenant, região, hash do ID)
quando_evitar:
  - Dados que cabem em um nó com réplicas de leitura
  - Consultas que cruzam muitos shards com frequência
status: revisado
publico: false
fontes:
  - id: azure_sharding
    tipo: artigo
    titulo: Sharding pattern (Azure Architecture Center)
    link: https://learn.microsoft.com/en-us/azure/architecture/patterns/sharding
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: azure_patterns_index
    tipo: artigo
    titulo: Cloud design patterns (Azure Architecture Center)
    link: https://learn.microsoft.com/en-us/azure/architecture/patterns/
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: aws_reliability
    tipo: artigo
    titulo: Reliability pillar (AWS Well-Architected Framework)
    link: https://docs.aws.amazon.com/wellarchitected/latest/framework/reliability.html
    status_revisao: revisada
    proxima_revisao: 2027-11-22
categorias:
  - "[[banco_relacional|Banco relacional]]"
  - "[[banco_documentos|Banco de documentos]]"
  - "[[chave_valor_cache|Chave-valor e cache]]"
familia: distribuido-arquitetura
subfamilia: Escalabilidade
problema: Um único nó de banco atinge limites de armazenamento, memória e escrita, e escalar verticalmente deixa de ser viável ou econômico.
tradeoffs:
  - "Ganha: escala horizontal de armazenamento e escrita; paga: consultas e transações entre shards ficam complexas"
  - "Ganha: isolamento de falhas por partição; paga: rebalanceamento e hot spots exigem operação"
consequencias:
  - A escolha da chave é difícil de reverter
  - Resharding precisa de estratégia desde o início
padroesRelacionados:
  - "[[cache_aside|Cache-aside]]"
  - "[[cqrs|CQRS]]"
  - "[[database_per_service|Database per Service]]"
  - "[[leader_election|Leader Election]]"
casosDeUso:
  - "[[arquitetura_e_system_design|Arquitetura e system design]]"
  - "[[marketplace_e_plataformas_grande_empresa|Marketplace e plataformas (grande empresa)]]"
  - "[[telecom_grande_empresa|Telecom (grande empresa)]]"
  - "[[varejo_de_grande_escala_grande_empresa|Varejo de grande escala (grande empresa)]]"
variacoes:
  - arq-escolha-dados
ferramentas:
  - tabela:vitess
  - tabela:citus
  - "[[mongodb|MongoDB (ferramenta)]]"
  - "[[amazon_dynamodb|Amazon DynamoDB (ferramenta)]]"
  - "[[postgresql|PostgreSQL]]"
  - "[[redis|Redis (ferramenta)]]"
  - tabela:apache-cassandra
  - tabela:scylladb
  - tabela:tidb
  - tabela:yugabytedb
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Sharding
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
