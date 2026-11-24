---
id: criar_pipeline_dados
tipo: guia-pratico
nome: Como criar um pipeline de dados
sigla: pip
descricao: "Caminho para mover e preparar dados entre sistemas: inventariar fontes e consumidores, escolher entre assinar um pipeline gerenciado, construir em lote ou construir em streaming, e entregar com contrato de dados, testes de qualidade e observabilidade."
exemplo: "Uma equipe de análise precisa do consolidado diário de vendas: inventaria as fontes, define o contrato dos dados, constrói uma carga em lote idempotente com testes de qualidade e publica o conjunto com dono e atualização esperada."
quando_usar:
  - Dados de várias fontes precisam chegar de forma confiável a um destino para análise, produto ou modelos.
  - Cargas manuais ou planilhas deixaram de garantir frescor, qualidade e rastreabilidade.
quando_evitar:
  - Quando a necessidade é consultar uma única fonte sem transformação (uma consulta direta ou uma réplica de leitura resolve).
fonte_ids:
  - airflow_best_practices
  - openlineage_docs
fontes:
  - id: airflow_best_practices
    tipo: artigo
    titulo: Best Practices (Apache Airflow documentation)
    link: https://airflow.apache.org/docs/apache-airflow/stable/best-practices.html
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: openlineage_docs
    tipo: artigo
    titulo: About OpenLineage (documentation)
    link: https://openlineage.io/docs/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
status: rascunho
publico: false
raias:
  - id: pip_orq
    nome: Orquestração do pipeline
    responsabilidade: Encadear contexto, abordagem, stack e entrega até o desfecho.
    cor: "#607D8B"
    orquestradora: true
  - id: pip_ctx
    nome: Contexto e requisitos
    responsabilidade: Entender a necessidade e fixar escopo e critérios antes de escolher tecnologia.
    cor: "#0072B2"
    orquestradora: false
  - id: pip_abd
    nome: Abordagem de entrega
    responsabilidade: Decidir entre assinar, comprar ou construir a partir das premissas.
    cor: "#E69F00"
    orquestradora: false
  - id: pip_stk
    nome: Stack por contexto
    responsabilidade: Escolher o arquétipo de stack ou o caminho de construção por contexto.
    cor: "#009E73"
    orquestradora: false
  - id: pip_ent
    nome: Implementação e entrega
    responsabilidade: Implementar, validar, publicar e operar na abordagem escolhida.
    cor: "#56B4E9"
    orquestradora: false
nos:
  - id: pip_orq_s0
    raia: pip_orq
    tipo: inicio
    rotulo: Necessidade de mover e preparar dados entre sistemas
    proximo:
      - para: pip_orq_c1
        condicao: ""
  - id: pip_orq_c1
    raia: pip_orq
    tipo: chamada
    rotulo: Inventariar fontes, destinos e consumidores
    proximo:
      - para: pip_orq_c2
        condicao: fontes_mapeadas
    raia_chamada: pip_ctx
  - id: pip_orq_c2
    raia: pip_orq
    tipo: chamada
    rotulo: Escolher a abordagem de entrega
    proximo:
      - para: pip_orq_c3
        condicao: construir
      - para: pip_orq_c6
        condicao: assinar_pipeline
    raia_chamada: pip_abd
  - id: pip_orq_c3
    raia: pip_orq
    tipo: chamada
    rotulo: Escolher entre lote e streaming
    proximo:
      - para: pip_orq_c4
        condicao: streaming
      - para: pip_orq_c5
        condicao: batch
    raia_chamada: pip_stk
  - id: pip_orq_c4
    raia: pip_orq
    tipo: chamada
    rotulo: Implementar, validar e publicar o pipeline
    proximo:
      - para: pip_orq_e1
        condicao: pronta
    raia_chamada: pip_ent
  - id: pip_orq_c5
    raia: pip_orq
    tipo: chamada
    rotulo: Implementar, validar e publicar o pipeline
    proximo:
      - para: pip_orq_e2
        condicao: pronta
    raia_chamada: pip_ent
  - id: pip_orq_c6
    raia: pip_orq
    tipo: chamada
    rotulo: Implementar, validar e publicar o pipeline
    proximo:
      - para: pip_orq_e3
        condicao: pronta
    raia_chamada: pip_ent
  - id: pip_orq_e1
    raia: pip_orq
    tipo: fim
    rotulo: Pipeline publicado sobre a stack de streaming
    proximo: []
    retorno: streaming
    saida:
      tipo: stack
      justificativa: Consumidores que reagem em segundos ao evento diferenciam o produto, e o processamento contínuo evita a espera da janela de carga em lote.
      eixos:
        - latencia
        - escala_volume
        - time_maturidade
      objetivo: diferenciar_produto
      notas:
        construir:
          diferenciacao: 5
          tempo_ate_valor: 2
          custo_total: 3
          dependencia_fornecedor: 4
          risco: 3
        comprar:
          diferenciacao: 2
          tempo_ate_valor: 3
          custo_total: 2
          dependencia_fornecedor: 3
          risco: 3
        assinar:
          diferenciacao: 3
          tempo_ate_valor: 4
          custo_total: 2
          dependencia_fornecedor: 2
          risco: 3
      stack: "[[pipeline_dados_streaming|Pipeline de dados em streaming]]"
  - id: pip_orq_e2
    raia: pip_orq
    tipo: fim
    rotulo: Pipeline publicado sobre a stack em lote
    proximo: []
    retorno: batch
    saida:
      tipo: stack
      justificativa: Para atualização diária ou por hora, a carga em lote custa menos e é mais simples de testar, reexecutar e auditar do que o processamento contínuo.
      eixos:
        - orcamento
        - escala_volume
        - time_maturidade
      objetivo: reduzir_custo
      notas:
        construir:
          diferenciacao: 4
          tempo_ate_valor: 4
          custo_total: 5
          dependencia_fornecedor: 5
          risco: 4
        comprar:
          diferenciacao: 2
          tempo_ate_valor: 3
          custo_total: 3
          dependencia_fornecedor: 3
          risco: 3
        assinar:
          diferenciacao: 3
          tempo_ate_valor: 4
          custo_total: 3
          dependencia_fornecedor: 2
          risco: 3
      stack: "[[pipeline_dados_batch|Pipeline de dados batch]]"
  - id: pip_orq_e3
    raia: pip_orq
    tipo: fim
    rotulo: Pipeline gerenciado assinado
    proximo: []
    retorno: assinar_pipeline
    saida:
      tipo: assinar
      justificativa: Fontes comuns e um time pequeno de dados ganham conectores, agendamento e monitoramento prontos, o que entrega valor em semanas e libera o time para a modelagem.
      eixos:
        - time_maturidade
        - prazo_entrega
        - orcamento
      objetivo: cumprir_prazo
      notas:
        construir:
          diferenciacao: 4
          tempo_ate_valor: 2
          custo_total: 2
          dependencia_fornecedor: 5
          risco: 3
        comprar:
          diferenciacao: 2
          tempo_ate_valor: 3
          custo_total: 3
          dependencia_fornecedor: 3
          risco: 3
        assinar:
          diferenciacao: 3
          tempo_ate_valor: 5
          custo_total: 3
          dependencia_fornecedor: 2
          risco: 3
      categoria: "[[pipelines_orquestracao_dados|Pipelines e orquestração de dados]]"
      ferramentas:
        - tabela:fivetran
        - tabela:airbyte
        - tabela:databricks
  - id: pip_ctx_s0
    raia: pip_ctx
    tipo: inicio
    rotulo: Início do levantamento
    proximo:
      - para: pip_ctx_t1
        condicao: ""
  - id: pip_ctx_t1
    raia: pip_ctx
    tipo: tarefa
    rotulo: Inventariar fontes e consumidores
    proximo:
      - para: pip_ctx_t2
        condicao: ""
    passos:
      - ctx.fontes_e_consumidores
  - id: pip_ctx_t2
    raia: pip_ctx
    tipo: tarefa
    rotulo: Definir contrato e camadas de dados
    proximo:
      - para: pip_ctx_e1
        condicao: ""
    passos:
      - prep.contrato_de_dados
      - prep.camadas_de_dados
  - id: pip_ctx_e1
    raia: pip_ctx
    tipo: fim
    rotulo: Fontes e consumidores mapeados
    proximo: []
    retorno: fontes_mapeadas
  - id: pip_abd_s0
    raia: pip_abd
    tipo: inicio
    rotulo: Início da escolha
    proximo:
      - para: pip_abd_t1
        condicao: ""
  - id: pip_abd_t1
    raia: pip_abd
    tipo: tarefa
    rotulo: Registrar premissas e pontuar as opções
    proximo:
      - para: pip_abd_g1
        condicao: ""
    passos:
      - ctx.premissas_nao_funcionais
      - prep.pontuar_opcoes_matriz
  - id: pip_abd_g1
    raia: pip_abd
    tipo: bifurcacao
    rotulo: Dados pessoais no ambiente próprio?
    proximo:
      - para: pip_abd_e1
        condicao: sim
      - para: pip_abd_g2
        condicao: não
    eixo: compliance_dados
    pergunta: q.dados_pessoais_no_ambiente_proprio
  - id: pip_abd_g2
    raia: pip_abd
    tipo: bifurcacao
    rotulo: Fontes comuns e time pequeno?
    proximo:
      - para: pip_abd_e2
        condicao: sim
      - para: pip_abd_e1
        condicao: não
    eixo: time_maturidade
    pergunta: q.fontes_comuns_time_pequeno
  - id: pip_abd_e1
    raia: pip_abd
    tipo: fim
    rotulo: Construir o pipeline
    proximo: []
    retorno: construir
  - id: pip_abd_e2
    raia: pip_abd
    tipo: fim
    rotulo: Pipeline gerenciado assinado
    proximo: []
    retorno: assinar_pipeline
  - id: pip_stk_s0
    raia: pip_stk
    tipo: inicio
    rotulo: Início da escolha da stack
    proximo:
      - para: pip_stk_g1
        condicao: ""
  - id: pip_stk_g1
    raia: pip_stk
    tipo: bifurcacao
    rotulo: Consumo em segundos?
    proximo:
      - para: pip_stk_e1
        condicao: sim
      - para: pip_stk_e2
        condicao: não
    eixo: latencia
    pergunta: q.consumo_em_segundos
  - id: pip_stk_e1
    raia: pip_stk
    tipo: fim
    rotulo: Stack de streaming
    proximo: []
    retorno: streaming
  - id: pip_stk_e2
    raia: pip_stk
    tipo: fim
    rotulo: Stack em lote
    proximo: []
    retorno: batch
  - id: pip_ent_s0
    raia: pip_ent
    tipo: inicio
    rotulo: Início da entrega
    proximo:
      - para: pip_ent_t1
        condicao: ""
  - id: pip_ent_t1
    raia: pip_ent
    tipo: tarefa
    rotulo: Implementar ingestão, transformação e orquestração
    proximo:
      - para: pip_ent_t2
        condicao: ""
    passos:
      - exec.ingerir_dados
      - exec.transformar_e_testar
      - exec.orquestrar_e_agendar
  - id: pip_ent_t2
    raia: pip_ent
    tipo: tarefa
    rotulo: Validar qualidade
    proximo:
      - para: pip_ent_t3
        condicao: ""
    passos:
      - val.reconciliar_totais
  - id: pip_ent_t3
    raia: pip_ent
    tipo: tarefa
    rotulo: Publicar e operar
    proximo:
      - para: pip_ent_e1
        condicao: ""
    passos:
      - ent.publicar_para_consumo
      - ops.observar_linhagem_e_custo
  - id: pip_ent_e1
    raia: pip_ent
    tipo: fim
    rotulo: Pipeline publicado e observado
    proximo: []
    retorno: pronta
perguntasDecisao:
  - id: q.dados_pessoais_no_ambiente_proprio
    pergunta: Os dados incluem informações pessoais que precisam ficar no ambiente próprio?
    eixo: compliance_dados
  - id: q.fontes_comuns_time_pequeno
    pergunta: As fontes são aplicações comuns com conectores prontos e a equipe de dados é pequena?
    eixo: time_maturidade
  - id: q.consumo_em_segundos
    pergunta: O consumo exige dados em segundos ou de forma contínua?
    eixo: latencia
objetivo: Entregar um pipeline idempotente, testado e observável, com contrato de dados claro, na abordagem (assinar, lote ou streaming) que atende à atualização esperada, ao volume e ao controle dos dados.
preRequisitos:
  - Lista das fontes, dos destinos e dos consumidores dos dados.
  - Atualização esperada de cada conjunto (diária, por hora, contínua).
  - Acesso às fontes e ao ambiente de destino.
  - Premissas de volume, dados pessoais, prazo e orçamento.
passos:
  - id: ctx.fontes_e_consumidores
    titulo: Inventariar fontes, destinos e consumidores
    descricao: Listar cada fonte, o destino e os consumidores dos dados, com o dono, o volume e a atualização esperada de cada conjunto.
    verificacao: Cada conjunto de dados tem fonte, destino, consumidor, dono e atualização esperada registrados.
    depende: []
  - id: prep.contrato_de_dados
    titulo: Definir o contrato de dados
    descricao: Escrever para cada conjunto o esquema, o significado dos campos, a atualização esperada e as regras de qualidade.
    verificacao: Cada conjunto tem esquema, dono, atualização esperada e regra de qualidade escritos.
    depende:
      - ctx.fontes_e_consumidores
  - id: prep.camadas_de_dados
    titulo: Modelar as camadas de dados
    descricao: Separar a camada bruta, a tratada e a de consumo, com propósito, retenção e permissão de acesso por camada.
    verificacao: Cada camada tem propósito, retenção e permissão de acesso descritos.
    depende:
      - prep.contrato_de_dados
  - id: ctx.premissas_nao_funcionais
    titulo: Registrar premissas não funcionais
    descricao: Anotar volume esperado, latência aceitável, dados sensíveis, prazo e orçamento, que alimentam as perguntas de decisão.
    verificacao: Cada um dos 7 eixos de adoção tem uma resposta escrita ou a nota de que não se aplica.
    depende:
      - ctx.fontes_e_consumidores
  - id: prep.pontuar_opcoes_matriz
    titulo: Pontuar construir, comprar e assinar
    descricao: Dar nota de 1 a 5 às três opções nos cinco critérios da matriz e registrar o objetivo que pesa mais.
    verificacao: A matriz tem as 15 notas preenchidas e a opção vencedora tem a justificativa registrada.
    depende:
      - ctx.premissas_nao_funcionais
  - id: exec.ingerir_dados
    titulo: Implementar a ingestão idempotente
    descricao: Extrair as fontes por janela de tempo ou por eventos de mudança e gravar na camada bruta sem duplicar registros.
    verificacao: Reexecutar a mesma janela de dados produz o mesmo resultado sem registros duplicados.
    depende:
      - prep.camadas_de_dados
      - prep.pontuar_opcoes_matriz
  - id: exec.transformar_e_testar
    titulo: Transformar os dados com testes embutidos
    descricao: Construir as transformações por camada com testes de unicidade, valores nulos e relacionamentos.
    verificacao: As transformações rodam com os testes de unicidade, nulos e relacionamentos passando.
    depende:
      - exec.ingerir_dados
  - id: exec.orquestrar_e_agendar
    titulo: Orquestrar dependências, reexecuções e alertas
    descricao: Agendar as etapas, declarar as dependências e permitir reexecução parcial com alerta em falhas.
    verificacao: Uma falha em uma etapa interrompe as dependentes, dispara alerta e permite reexecução parcial.
    depende:
      - exec.transformar_e_testar
  - id: val.reconciliar_totais
    titulo: Reconciliar os totais com a fonte
    descricao: Comparar contagens e somas por período entre a fonte e o destino e investigar as diferenças.
    verificacao: Os totais por período batem com a fonte dentro da tolerância registrada.
    depende:
      - exec.orquestrar_e_agendar
  - id: ent.publicar_para_consumo
    titulo: Publicar o catálogo e liberar acesso
    descricao: Registrar cada conjunto em um catálogo com dono e descrição e liberar o acesso com permissão mínima.
    verificacao: Cada consumidor encontra o conjunto no catálogo, com dono e descrição, e acessa com permissão mínima.
    depende:
      - val.reconciliar_totais
  - id: ops.observar_linhagem_e_custo
    titulo: Acompanhar linhagem, atraso e custo
    descricao: Registrar a linhagem entre fontes e destinos e acompanhar atraso, falhas e custo por pipeline.
    verificacao: O painel mostra atraso, falhas e custo por pipeline e a linhagem liga cada destino à sua fonte.
    depende:
      - ent.publicar_para_consumo
comoFazerHoje: []
checklistRefs: {}
armadilhas:
  - Montar a ingestão sem idempotência, o que duplica registros a cada reexecução.
  - Transformar sem testes de qualidade, o que leva dados errados aos consumidores sem aviso.
  - Escolher streaming quando a necessidade é diária, o que aumenta custo e complexidade sem ganho.
  - Publicar conjuntos sem dono e sem atualização esperada, o que gera dúvida sobre a confiança nos dados.
validacao:
  - Reexecutar a mesma janela produz o mesmo resultado sem duplicar registros.
  - Os testes de unicidade, nulos e relacionamentos passam nas transformações.
  - Os totais por período batem com a fonte dentro da tolerância registrada.
  - Cada conjunto no catálogo tem dono, descrição e atualização esperada.
  - Atraso, falhas e custo por pipeline aparecem em painel com alerta.
padroes:
  - "[[change_data_capture|Change Data Capture]]"
  - "[[inbox_idempotent_consumer|Idempotência]]"
  - "[[backpressure|Backpressure]]"
  - "[[dead_letter_queue|DLQ]]"
  - "[[competing_consumers|Competing Consumers]]"
categorias:
  - "[[pipelines_orquestracao_dados|Pipelines e orquestração de dados]]"
  - "[[warehouse_lakehouse|Data warehouse e lakehouse]]"
  - "[[mensageria_streaming|Mensageria e streaming]]"
  - "[[captura_mudancas_event_store|Captura de mudanças e event store]]"
  - "[[observabilidade_apm|Observabilidade e APM]]"
aliases:
  - Criar um pipeline de dados
  - Construir um pipeline de dados
grupo: Construir software
stacks:
  - "[[pipeline_dados_streaming|Pipeline de dados em streaming]]"
  - "[[pipeline_dados_batch|Pipeline de dados batch]]"
ferramentas:
  - tabela:fivetran
  - tabela:airbyte
  - tabela:databricks
casosDeUso:
  - "[[engenharia_de_dados_e_etl|Engenharia de dados e ETL]]"
variacoes:
  - etl-orquestracao
  - etl-qualidade-dados
  - etl-streaming-eventos
certificacoes:
  - "[[databricks_certified_data_engineer_associate|Databricks Certified Data Engineer Associate]]"
dataVerificacao: 2026-11-23
tags:
  - guia-pratico
---
# Como criar um pipeline de dados
## 🎯 Objetivo
`= this.objetivo`

Resumo: `= this.descricao`

Exemplo: `= this.exemplo`

Grupo: `= this.grupo`
## 🔀 Diagrama de decisão
## 🎯 Casos de uso e variações

Variações: `= this.variacoes`
## 🔗 Relacionamentos
- **Hub:** [[hub_guides|Mapa de Guias Práticos]], [[hub_stacks|Mapa de Stacks de Engenharia]], [[hub_tools|Mapa de Ferramentas de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
