---
id: controlar_custo_de_llm
tipo: guia-pratico
nome: Como estimar e controlar o custo de LLM
sigla: cus
descricao: "Caminho para estimar e controlar o gasto com modelos de linguagem: medir o consumo por funcionalidade, aplicar as alavancas de roteamento, cache e contexto menor, escolher entre assinar um painel de uso ou construir a contabilização própria, e definir limites e alertas."
exemplo: "Uma equipe vê o gasto com o modelo crescer a cada mês: mede o consumo por funcionalidade, move as tarefas simples para um modelo menor, ativa o cache de prefixos e define um limite diário por chave com alerta."
quando_usar:
  - O gasto com modelos cresce sem que a equipe saiba atribuí-lo a funcionalidades, clientes ou equipes.
  - Uma funcionalidade nova com IA precisa de estimativa de custo por uso antes do lançamento.
quando_evitar:
  - Quando o consumo é mínimo e estável, e um alerta simples no painel do provedor já basta.
fonte_ids:
  - finops_for_ai
  - anthropic_prompt_caching
fontes:
  - id: finops_for_ai
    tipo: artigo
    titulo: FinOps for AI Overview (FinOps Foundation)
    link: https://www.finops.org/wg/finops-for-ai-overview/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: anthropic_prompt_caching
    tipo: artigo
    titulo: Prompt caching (Claude Platform Docs)
    link: https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching
    status_revisao: revisada
    proxima_revisao: 2027-11-23
status: rascunho
publico: false
raias:
  - id: cus_orq
    nome: Orquestração do controle de custo
    responsabilidade: Encadear contexto, abordagem, stack e entrega até o desfecho.
    cor: "#607D8B"
    orquestradora: true
  - id: cus_ctx
    nome: Contexto e requisitos
    responsabilidade: Entender a necessidade e fixar escopo e critérios antes de escolher tecnologia.
    cor: "#0072B2"
    orquestradora: false
  - id: cus_abd
    nome: Abordagem de entrega
    responsabilidade: Decidir entre assinar, comprar ou construir a partir das premissas.
    cor: "#E69F00"
    orquestradora: false
  - id: cus_stk
    nome: Stack por contexto
    responsabilidade: Escolher o arquétipo de stack ou o caminho de construção por contexto.
    cor: "#009E73"
    orquestradora: false
  - id: cus_ent
    nome: Implementação e entrega
    responsabilidade: Implementar, validar, publicar e operar na abordagem escolhida.
    cor: "#56B4E9"
    orquestradora: false
nos:
  - id: cus_orq_s0
    raia: cus_orq
    tipo: inicio
    rotulo: Necessidade de estimar ou reduzir o custo de modelos
    proximo:
      - para: cus_orq_c1
        condicao: ""
  - id: cus_orq_c1
    raia: cus_orq
    tipo: chamada
    rotulo: Medir o consumo e fixar metas
    proximo:
      - para: cus_orq_c2
        condicao: consumo_medido
    raia_chamada: cus_ctx
  - id: cus_orq_c2
    raia: cus_orq
    tipo: chamada
    rotulo: Escolher a abordagem de medição
    proximo:
      - para: cus_orq_c3
        condicao: construir
      - para: cus_orq_c6
        condicao: assinar_painel
    raia_chamada: cus_abd
  - id: cus_orq_c3
    raia: cus_orq
    tipo: chamada
    rotulo: Escolher onde as alavancas serão aplicadas
    proximo:
      - para: cus_orq_c5
        condicao: inferencia_propria
      - para: cus_orq_c4
        condicao: agente_ferramentas
    raia_chamada: cus_stk
  - id: cus_orq_c4
    raia: cus_orq
    tipo: chamada
    rotulo: Aplicar as alavancas e manter os limites
    proximo:
      - para: cus_orq_e1
        condicao: pronta
    raia_chamada: cus_ent
  - id: cus_orq_c5
    raia: cus_orq
    tipo: chamada
    rotulo: Aplicar as alavancas e manter os limites
    proximo:
      - para: cus_orq_e2
        condicao: pronta
    raia_chamada: cus_ent
  - id: cus_orq_c6
    raia: cus_orq
    tipo: chamada
    rotulo: Aplicar as alavancas e manter os limites
    proximo:
      - para: cus_orq_e3
        condicao: pronta
    raia_chamada: cus_ent
  - id: cus_orq_e1
    raia: cus_orq
    tipo: fim
    rotulo: Custo controlado sobre a stack de agente com ferramentas
    proximo: []
    retorno: agente_ferramentas
    saida:
      tipo: stack
      justificativa: Aplicar roteamento por dificuldade, cache e limite de passos dentro da própria stack do agente reduz o custo por tarefa sem trocar a infraestrutura, e mantém a avaliação como trava de qualidade.
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
      stack: "[[agente_ferramentas_memoria|Agente com ferramentas e memória]]"
  - id: cus_orq_e2
    raia: cus_orq
    tipo: fim
    rotulo: Custo controlado sobre a stack de inferência auto-hospedada
    proximo: []
    retorno: inferencia_propria
    saida:
      tipo: stack
      justificativa: Com volume alto e estável, servir um modelo aberto na infraestrutura própria transforma o gasto variável em custo previsível, e o controle dos dados vem junto.
      eixos:
        - escala_volume
        - compliance_dados
        - orcamento
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
          custo_total: 3
          dependencia_fornecedor: 2
          risco: 3
      stack: "[[inferencia_llm_autohospedada|Inferência de LLM auto-hospedada]]"
  - id: cus_orq_e3
    raia: cus_orq
    tipo: fim
    rotulo: Custo acompanhado em um painel de uso assinado
    proximo: []
    retorno: assinar_painel
    saida:
      tipo: assinar
      justificativa: Com gasto espalhado entre equipes e provedores, o painel assinado entrega atribuição por funcionalidade, alertas e histórico em dias, e evita construir a contabilização antes de saber o que importa.
      eixos:
        - prazo_entrega
        - escala_volume
        - lock_in
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
      categoria: "[[evals_observabilidade|Evals e observabilidade]]"
      ferramentas:
        - "[[langfuse|LangFuse]]"
        - tabela:datadog-llm-observability
        - tabela:braintrust
  - id: cus_ctx_s0
    raia: cus_ctx
    tipo: inicio
    rotulo: Início do levantamento
    proximo:
      - para: cus_ctx_t1
        condicao: ""
  - id: cus_ctx_t1
    raia: cus_ctx
    tipo: tarefa
    rotulo: Medir o consumo por funcionalidade
    proximo:
      - para: cus_ctx_t2
        condicao: ""
    passos:
      - ctx.mapear_consumo_por_funcionalidade
      - ctx.estimar_custo_por_uso
  - id: cus_ctx_t2
    raia: cus_ctx
    tipo: tarefa
    rotulo: Fixar a meta de custo e qualidade
    proximo:
      - para: cus_ctx_e1
        condicao: ""
    passos:
      - prep.meta_de_custo_e_qualidade
  - id: cus_ctx_e1
    raia: cus_ctx
    tipo: fim
    rotulo: Consumo medido e metas acordadas
    proximo: []
    retorno: consumo_medido
  - id: cus_abd_s0
    raia: cus_abd
    tipo: inicio
    rotulo: Início da escolha
    proximo:
      - para: cus_abd_t1
        condicao: ""
  - id: cus_abd_t1
    raia: cus_abd
    tipo: tarefa
    rotulo: Registrar premissas e pontuar as opções
    proximo:
      - para: cus_abd_g1
        condicao: ""
    passos:
      - ctx.premissas_nao_funcionais
      - prep.pontuar_opcoes_matriz
  - id: cus_abd_g1
    raia: cus_abd
    tipo: bifurcacao
    rotulo: Registros presos ao ambiente próprio?
    proximo:
      - para: cus_abd_e1
        condicao: sim
      - para: cus_abd_g2
        condicao: não
    eixo: compliance_dados
    pergunta: q.dados_de_uso_sob_controle_proprio
  - id: cus_abd_g2
    raia: cus_abd
    tipo: bifurcacao
    rotulo: Gasto espalhado por vários provedores?
    proximo:
      - para: cus_abd_e2
        condicao: sim
      - para: cus_abd_e1
        condicao: não
    eixo: escala_volume
    pergunta: q.gasto_espalhado_em_varios_provedores
  - id: cus_abd_e1
    raia: cus_abd
    tipo: fim
    rotulo: Construir a contabilização própria
    proximo: []
    retorno: construir
  - id: cus_abd_e2
    raia: cus_abd
    tipo: fim
    rotulo: Painel de uso e observabilidade assinado
    proximo: []
    retorno: assinar_painel
  - id: cus_stk_s0
    raia: cus_stk
    tipo: inicio
    rotulo: Início da escolha da stack
    proximo:
      - para: cus_stk_g1
        condicao: ""
  - id: cus_stk_g1
    raia: cus_stk
    tipo: bifurcacao
    rotulo: Volume alto e estável?
    proximo:
      - para: cus_stk_e1
        condicao: sim
      - para: cus_stk_e2
        condicao: não
    eixo: orcamento
    pergunta: q.volume_alto_e_estavel
  - id: cus_stk_e1
    raia: cus_stk
    tipo: fim
    rotulo: Stack de inferência de LLM auto-hospedada
    proximo: []
    retorno: inferencia_propria
  - id: cus_stk_e2
    raia: cus_stk
    tipo: fim
    rotulo: Stack de agente com ferramentas e memória
    proximo: []
    retorno: agente_ferramentas
  - id: cus_ent_s0
    raia: cus_ent
    tipo: inicio
    rotulo: Início da entrega
    proximo:
      - para: cus_ent_t1
        condicao: ""
  - id: cus_ent_t1
    raia: cus_ent
    tipo: tarefa
    rotulo: Aplicar as alavancas de custo
    proximo:
      - para: cus_ent_t2
        condicao: ""
    passos:
      - exec.rotear_por_dificuldade
      - exec.cache_e_contexto_enxuto
  - id: cus_ent_t2
    raia: cus_ent
    tipo: tarefa
    rotulo: Confirmar a qualidade
    proximo:
      - para: cus_ent_t3
        condicao: ""
    passos:
      - val.confirmar_qualidade_apos_cada_alavanca
  - id: cus_ent_t3
    raia: cus_ent
    tipo: tarefa
    rotulo: Definir limites e operar
    proximo:
      - para: cus_ent_e1
        condicao: ""
    passos:
      - ent.limites_e_alertas
      - ops.revisar_custo_periodicamente
  - id: cus_ent_e1
    raia: cus_ent
    tipo: fim
    rotulo: Custo sob controle e acompanhado
    proximo: []
    retorno: pronta
perguntasDecisao:
  - id: q.dados_de_uso_sob_controle_proprio
    pergunta: Os registros de uso contêm conteúdo de conversas que não pode sair do ambiente próprio?
    eixo: compliance_dados
  - id: q.gasto_espalhado_em_varios_provedores
    pergunta: O gasto está espalhado por várias equipes e provedores e precisa de painel único, atribuição e limites por chave?
    eixo: escala_volume
  - id: q.volume_alto_e_estavel
    pergunta: O volume é alto e estável a ponto de servir um modelo aberto na infraestrutura própria custar menos que pagar por uso?
    eixo: orcamento
objetivo: Conhecer o custo por funcionalidade, reduzi-lo com alavancas que preservam a qualidade medida e manter limites e alertas, na abordagem (assinar ou construir) que atende ao prazo, aos dados e ao controle.
preRequisitos:
  - Acesso aos dados de uso dos provedores e dos serviços que chamam os modelos.
  - Lista das funcionalidades e equipes que consomem modelos.
  - Conjunto de avaliação para confirmar que a qualidade se mantém após cada alavanca.
  - Premissas de volume, dados sensíveis, prazo e orçamento.
passos:
  - id: ctx.mapear_consumo_por_funcionalidade
    titulo: Mapear o consumo por funcionalidade, equipe e modelo
    descricao: Marcar cada chamada com funcionalidade, equipe e modelo e consolidar entradas, saídas e custo por período.
    verificacao: A maior parte do gasto está atribuída a uma funcionalidade e a uma equipe, e o restante está explicado.
    depende: []
  - id: ctx.estimar_custo_por_uso
    titulo: Estimar o custo por uso de cada funcionalidade
    descricao: Calcular o custo médio e o de cauda por uso a partir do tamanho típico de entrada e saída, do número de chamadas por tarefa e da taxa de repetição.
    verificacao: Cada funcionalidade tem custo por uso médio e de cauda, calculado com dados reais ou com uma amostra.
    depende:
      - ctx.mapear_consumo_por_funcionalidade
  - id: ctx.premissas_nao_funcionais
    titulo: Registrar premissas não funcionais
    descricao: Anotar volume esperado, latência aceitável, dados sensíveis, prazo e orçamento, que alimentam as perguntas de decisão.
    verificacao: Cada um dos 7 eixos de adoção tem uma resposta escrita ou a nota de que não se aplica.
    depende:
      - ctx.estimar_custo_por_uso
  - id: prep.pontuar_opcoes_matriz
    titulo: Pontuar construir, comprar e assinar
    descricao: Dar nota de 1 a 5 às três opções nos cinco critérios da matriz e registrar o objetivo que pesa mais.
    verificacao: A matriz tem as 15 notas preenchidas e a opção vencedora tem a justificativa registrada.
    depende:
      - ctx.premissas_nao_funcionais
  - id: prep.meta_de_custo_e_qualidade
    titulo: Fixar a meta de custo junto da meta de qualidade
    descricao: Definir a meta de custo por funcionalidade e o piso de qualidade medido por um conjunto de avaliação, para que economia e qualidade andem juntas.
    verificacao: Cada funcionalidade tem meta de custo e piso de qualidade medido no conjunto de avaliação.
    depende:
      - ctx.estimar_custo_por_uso
  - id: exec.rotear_por_dificuldade
    titulo: Rotear tarefas simples para modelos menores
    descricao: Classificar a dificuldade da tarefa e enviar as simples a um modelo menor, reservando o maior para as difíceis, com retorno ao maior quando a confiança é baixa.
    verificacao: Uma parcela mensurável das tarefas usa o modelo menor e o conjunto de avaliação mantém o piso de qualidade.
    depende:
      - prep.meta_de_custo_e_qualidade
      - prep.pontuar_opcoes_matriz
  - id: exec.cache_e_contexto_enxuto
    titulo: Aplicar cache e reduzir o contexto enviado
    descricao: Reaproveitar prefixos repetidos por cache do provedor, guardar respostas de perguntas equivalentes e enviar apenas o contexto necessário.
    verificacao: A taxa de acerto do cache e o tamanho médio de entrada estão medidos e o custo por uso caiu em relação ao início.
    depende:
      - exec.rotear_por_dificuldade
  - id: val.confirmar_qualidade_apos_cada_alavanca
    titulo: Confirmar a qualidade após cada alavanca
    descricao: Rodar o conjunto de avaliação depois de cada mudança de custo e reverter a alavanca que reduz a qualidade abaixo do piso.
    verificacao: Cada alavanca tem o resultado de qualidade registrado e as que ficaram abaixo do piso foram revertidas.
    depende:
      - exec.cache_e_contexto_enxuto
  - id: ent.limites_e_alertas
    titulo: Definir limites, alertas e dono do orçamento
    descricao: Configurar limites por chave, por equipe e por período, alertas em faixas do orçamento e um responsável por agir sobre cada alerta.
    verificacao: Um teste de estouro aciona o alerta, o limite barra novas chamadas e o responsável é notificado.
    depende:
      - val.confirmar_qualidade_apos_cada_alavanca
  - id: ops.revisar_custo_periodicamente
    titulo: Revisar o custo e os preços periodicamente
    descricao: Revisar o custo por funcionalidade, as mudanças de preço e de modelos disponíveis, e reavaliar as alavancas a cada ciclo.
    verificacao: Existe uma revisão agendada com o custo por funcionalidade e as decisões registradas.
    depende:
      - ent.limites_e_alertas
comoFazerHoje: []
checklistRefs: {}
armadilhas:
  - Reduzir custo sem medir a qualidade, o que troca uma economia pequena por perda de resultado.
  - Olhar só o preço por token, o que ignora o número de chamadas por tarefa, a repetição e o tamanho do contexto.
  - Medir o gasto só no total do provedor, o que impede atribuir o custo a funcionalidades e equipes.
  - Configurar o limite sem dono para agir sobre o alerta, o que faz o aviso chegar e nada acontecer.
validacao:
  - Todo o gasto relevante está atribuído a funcionalidade e equipe, e cada funcionalidade tem custo por uso.
  - Cada alavanca de custo tem o resultado de qualidade registrado e respeita o piso.
  - Um teste de estouro aciona o alerta e o limite barra novas chamadas.
  - Cada alerta tem um responsável e uma ação definida.
  - A revisão periódica de custo e de preços está agendada.
padroes:
  - "[[model_cascade|Model Cascade]]"
  - "[[semantic_caching|Semantic Caching]]"
  - "[[routing_llm|Routing]]"
  - "[[rate_limiting|Rate Limiting (padrão)]]"
  - "[[timeout|Timeout]]"
categorias:
  - "[[precos_custos_nuvem_ia|Preços e custos de nuvem e IA]]"
  - "[[evals_observabilidade|Evals e observabilidade]]"
  - "[[orquestracao_llm|Orquestração de LLM]]"
  - "[[inferencia_local|Inferência local]]"
  - "[[observabilidade_apm|Observabilidade e APM]]"
  - "[[ranking_modelos_ia|Ranking e comparação de modelos de IA]]"
aliases:
  - Controlar custo de LLM
  - Estimar custo de tokens
grupo: IA aplicada
stacks:
  - "[[agente_ferramentas_memoria|Agente com ferramentas e memória]]"
  - "[[inferencia_llm_autohospedada|Inferência de LLM auto-hospedada]]"
ferramentas:
  - "[[langfuse|LangFuse]]"
  - tabela:datadog-llm-observability
  - tabela:braintrust
casosDeUso:
  - "[[observabilidade_em_producao|Observabilidade em produção]]"
  - "[[classificacao_e_extracao_em_alto_volume|Classificação e extração em alto volume]]"
variacoes:
  - obs-tracing-llm
  - classif-tickets-suporte
certificacoes:
  - "[[aws_certified_ai_practitioner_aif_c01|AWS Certified AI Practitioner (AIF-C01)]]"
dataVerificacao: 2026-11-23
tags:
  - guia-pratico
---
# Como estimar e controlar o custo de LLM
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
