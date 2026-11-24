---
id: backpressure
tipo: padrao
nome: Backpressure
aliases:
  - Contrapressão
descricao: O consumidor sinaliza ao produtor a sua capacidade, e o produtor reduz ou pausa o envio. A pressão se propaga de volta pela cadeia em vez de acumular filas ilimitadas.
fonte_ids:
  - reactive_manifesto
  - aws_load_shedding
  - azure_competing_consumers
exemplo: Em Reactive Streams, o subscriber chama request(n) e o publisher entrega no máximo n itens.
quando_usar:
  - Pipelines de streaming e processamento reativo
  - Filas com consumidores de vazão variável
  - Integrações entre sistemas com velocidades diferentes
quando_evitar:
  - Fluxos de baixo volume, em que o buffer simples basta
  - Cenários em que descartar dados é a política correta (use Load Shedding)
status: revisado
publico: false
fontes:
  - id: reactive_manifesto
    tipo: artigo
    titulo: The Reactive Manifesto
    link: https://www.reactivemanifesto.org/
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: aws_load_shedding
    tipo: artigo
    titulo: Using load shedding to avoid overload (Amazon Builders' Library)
    link: https://builder.aws.com/content/3Eun1EEyX6p2e3VYNyRLSJzLuMV/using-load-shedding-to-avoid-overload
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: azure_competing_consumers
    tipo: artigo
    titulo: Competing Consumers pattern (Azure Architecture Center)
    link: https://learn.microsoft.com/en-us/azure/architecture/patterns/competing-consumers
    status_revisao: revisada
    proxima_revisao: 2027-11-22
categorias:
  - "[[mensageria_streaming|Mensageria e streaming]]"
  - "[[frameworks_backend|Frameworks de backend]]"
familia: distribuido-arquitetura
subfamilia: Resiliência
problema: Um produtor mais rápido que o consumidor acumula dados em buffers sem limite, esgota memória e derruba o sistema.
tradeoffs:
  - "Ganha: estabilidade e memória limitada; paga: o produtor precisa lidar com lentidão ou rejeição"
  - "Ganha: sem perda de dados por overflow; paga: a latência fim a fim aumenta sob carga"
consequencias:
  - Filas e buffers precisam de limite explícito
  - O contrato de streaming (pull ou demanda) deve ser definido de ponta a ponta
padroesRelacionados:
  - "[[arquitetura_orientada_a_eventos|Arquitetura Orientada a Eventos]]"
  - "[[cache_aside|Cache-aside]]"
  - "[[competing_consumers|Competing Consumers]]"
  - "[[load_shedding|Load Shedding]]"
  - "[[rate_limiting|Rate Limiting (padrão)]]"
casosDeUso:
  - "[[engenharia_de_dados_e_etl|Engenharia de dados e ETL]]"
  - "[[observabilidade_em_producao|Observabilidade em produção]]"
  - "[[arquitetura_e_system_design|Arquitetura e system design]]"
  - "[[telecom_grande_empresa|Telecom (grande empresa)]]"
variacoes:
  - arq-mensageria
ferramentas:
  - "[[rxjs|RxJS]]"
  - tabela:apache-kafka
  - tabela:nats
  - tabela:redpanda
  - tabela:apache-pulsar
  - tabela:apache-flink
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Backpressure
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
