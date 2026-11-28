---
id: leader_election
tipo: padrao
nome: Leader Election
aliases:
  - Eleição de líder
descricao: Entre várias instâncias de um serviço, uma é eleita líder para coordenar uma tarefa que não pode rodar em paralelo. Se ela cai, as demais elegem outra.
fonte_ids:
  - azure_leader_election
  - azure_patterns_index
  - aws_reliability
exemplo: As instâncias do scheduler disputam um lease no etcd e só quem o detém executa os jobs.
quando_usar:
  - Jobs agendados que devem rodar uma vez em um cluster
  - Réplicas primárias de banco e coordenadores de partições
  - Serviços com estado coordenado por um único escritor
quando_evitar:
  - Tarefas idempotentes e paralelizáveis, em que um coordenador só adiciona risco
  - Casos em que uma fila com consumidor único resolve
status: revisado
publico: false
fontes:
  - id: azure_leader_election
    tipo: artigo
    titulo: Leader Election pattern (Azure Architecture Center)
    link: https://learn.microsoft.com/en-us/azure/architecture/patterns/leader-election
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
  - "[[chave_valor_cache|Chave-valor e cache]]"
  - "[[containers_orquestracao|Containers e orquestração]]"
familia: distribuido-arquitetura
subfamilia: Escalabilidade
problema: Tarefas como agendamentos, compactação ou coordenação de escrita executadas por várias instâncias ao mesmo tempo causam duplicidade e conflito.
tradeoffs:
  - "Ganha: coordenação sem duplicidade; paga: falha do líder gera janela sem coordenação até a nova eleição"
  - "Ganha: alta disponibilidade do papel de líder; paga: depende de um serviço de consenso (etcd, ZooKeeper)"
consequencias:
  - Split brain exige fencing tokens e leases com expiração
  - Clocks e partições de rede devem ser considerados no desenho
padroesRelacionados:
  - "[[competing_consumers|Competing Consumers]]"
  - "[[failover|Estratégias de failover]]"
  - "[[sharding|Sharding]]"
casosDeUso:
  - "[[arquitetura_e_system_design|Arquitetura e system design]]"
  - "[[provisionamento_de_infraestrutura|Provisionamento de infraestrutura]]"
  - "[[pipelines_de_ci_e_cd|Pipelines de CI e CD]]"
  - "[[engenharia_de_dados_e_etl|Engenharia de dados e ETL]]"
variacoes: []
ferramentas:
  - tabela:etcd
  - tabela:apache-zookeeper
  - "[[redis|Redis (ferramenta)]]"
  - "[[kubernetes|Kubernetes (ferramenta)]]"
  - "[[apache_kafka|Apache Kafka]]"
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Leader Election
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
