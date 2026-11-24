---
id: avaliar_modelo_ou_prompt
tipo: guia-pratico
nome: Como avaliar um modelo ou prompt (evals)
sigla: evl
descricao: "Caminho para medir a qualidade de um prompt, modelo ou sistema com IA: definir critérios de sucesso, montar um conjunto de casos, escolher entre assinar uma plataforma de avaliação ou construir um harness próprio e rodar as avaliações a cada mudança."
exemplo: "Um time troca de modelo para reduzir custo: antes da troca, roda o conjunto de casos nos dois modelos, compara qualidade, custo e latência, e só migra quando as metas se mantêm."
quando_usar:
  - Um prompt, modelo ou sistema com IA vai mudar e a equipe precisa saber se a mudança melhora ou piora o resultado.
  - A equipe precisa comparar modelos ou versões de forma repetível, em vez de julgar por impressão.
quando_evitar:
  - Quando a tarefa é descartável, de uso único e sem risco, e uma conferência manual rápida resolve.
fonte_ids:
  - anthropic_define_success_evals
  - anthropic_building_effective_agents
fontes:
  - id: anthropic_define_success_evals
    tipo: artigo
    titulo: Define success criteria and build evaluations (Claude Platform Docs)
    link: https://platform.claude.com/docs/en/test-and-evaluate/develop-tests
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: anthropic_building_effective_agents
    tipo: artigo
    titulo: Building effective agents (Anthropic)
    link: https://www.anthropic.com/engineering/building-effective-agents
    status_revisao: revisada
    proxima_revisao: 2027-11-23
status: rascunho
publico: false
raias:
  - id: evl_orq
    nome: Orquestração da avaliação
    responsabilidade: Encadear contexto, abordagem, stack e entrega até o desfecho.
    cor: "#607D8B"
    orquestradora: true
  - id: evl_ctx
    nome: Contexto e requisitos
    responsabilidade: Entender a necessidade e fixar escopo e critérios antes de escolher tecnologia.
    cor: "#0072B2"
    orquestradora: false
  - id: evl_abd
    nome: Abordagem de entrega
    responsabilidade: Decidir entre assinar, comprar ou construir a partir das premissas.
    cor: "#E69F00"
    orquestradora: false
  - id: evl_stk
    nome: Stack por contexto
    responsabilidade: Escolher o arquétipo de stack ou o caminho de construção por contexto.
    cor: "#009E73"
    orquestradora: false
  - id: evl_ent
    nome: Implementação e entrega
    responsabilidade: Implementar, validar, publicar e operar na abordagem escolhida.
    cor: "#56B4E9"
    orquestradora: false
nos:
  - id: evl_orq_s0
    raia: evl_orq
    tipo: inicio
    rotulo: Necessidade de medir a qualidade de um prompt, modelo ou sistema
    proximo:
      - para: evl_orq_c1
        condicao: ""
  - id: evl_orq_c1
    raia: evl_orq
    tipo: chamada
    rotulo: Definir critérios de sucesso e casos
    proximo:
      - para: evl_orq_c2
        condicao: criterios_definidos
    raia_chamada: evl_ctx
  - id: evl_orq_c2
    raia: evl_orq
    tipo: chamada
    rotulo: Escolher a abordagem de avaliação
    proximo:
      - para: evl_orq_c3
        condicao: construir
      - para: evl_orq_c6
        condicao: assinar_plataforma
    raia_chamada: evl_abd
  - id: evl_orq_c3
    raia: evl_orq
    tipo: chamada
    rotulo: Escolher a stack do sistema avaliado
    proximo:
      - para: evl_orq_c4
        condicao: rag_producao
      - para: evl_orq_c5
        condicao: agente_ferramentas
    raia_chamada: evl_stk
  - id: evl_orq_c4
    raia: evl_orq
    tipo: chamada
    rotulo: Implementar e rodar a avaliação contínua
    proximo:
      - para: evl_orq_e1
        condicao: pronta
    raia_chamada: evl_ent
  - id: evl_orq_c5
    raia: evl_orq
    tipo: chamada
    rotulo: Implementar e rodar a avaliação contínua
    proximo:
      - para: evl_orq_e2
        condicao: pronta
    raia_chamada: evl_ent
  - id: evl_orq_c6
    raia: evl_orq
    tipo: chamada
    rotulo: Implementar e rodar a avaliação contínua
    proximo:
      - para: evl_orq_e3
        condicao: pronta
    raia_chamada: evl_ent
  - id: evl_orq_e1
    raia: evl_orq
    tipo: fim
    rotulo: Avaliação do sistema sobre a stack de RAG em produção
    proximo: []
    retorno: rag_producao
    saida:
      tipo: stack
      justificativa: Em um sistema com recuperação, a avaliação mede a busca e a resposta separadamente, e a stack já traz os pontos de medição e o conjunto de perguntas com trechos de referência.
      eixos:
        - compliance_dados
        - orcamento
        - latencia
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
      stack: "[[app_rag_producao|App RAG de produção]]"
  - id: evl_orq_e2
    raia: evl_orq
    tipo: fim
    rotulo: Avaliação do sistema sobre a stack de agente com ferramentas
    proximo: []
    retorno: agente_ferramentas
    saida:
      tipo: stack
      justificativa: Em um agente, avaliar a trajetória, o uso de ferramentas e o custo por tarefa exige registro de cada passo, que a stack de agente já oferece.
      eixos:
        - time_maturidade
        - latencia
        - lock_in
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
      stack: "[[agente_ferramentas_memoria|Agente com ferramentas e memória]]"
  - id: evl_orq_e3
    raia: evl_orq
    tipo: fim
    rotulo: Avaliação contínua em uma plataforma assinada
    proximo: []
    retorno: assinar_plataforma
    saida:
      tipo: assinar
      justificativa: Com prazo curto, a plataforma assinada entrega registro de execuções, comparação entre versões e revisão por pessoas em dias, e a equipe concentra o esforço nos casos e nos critérios.
      eixos:
        - prazo_entrega
        - orcamento
        - lock_in
      objetivo: validar_hipotese
      notas:
        construir:
          diferenciacao: 4
          tempo_ate_valor: 2
          custo_total: 3
          dependencia_fornecedor: 5
          risco: 3
        comprar:
          diferenciacao: 2
          tempo_ate_valor: 3
          custo_total: 3
          dependencia_fornecedor: 3
          risco: 4
        assinar:
          diferenciacao: 3
          tempo_ate_valor: 5
          custo_total: 4
          dependencia_fornecedor: 2
          risco: 3
      categoria: "[[evals_observabilidade|Evals e observabilidade]]"
      ferramentas:
        - "[[langfuse|LangFuse]]"
        - tabela:braintrust
        - tabela:langsmith
  - id: evl_ctx_s0
    raia: evl_ctx
    tipo: inicio
    rotulo: Início do levantamento
    proximo:
      - para: evl_ctx_t1
        condicao: ""
  - id: evl_ctx_t1
    raia: evl_ctx
    tipo: tarefa
    rotulo: Definir critérios de sucesso
    proximo:
      - para: evl_ctx_t2
        condicao: ""
    passos:
      - ctx.criterios_de_sucesso
      - ctx.riscos_a_medir
  - id: evl_ctx_t2
    raia: evl_ctx
    tipo: tarefa
    rotulo: Montar o conjunto de casos
    proximo:
      - para: evl_ctx_e1
        condicao: ""
    passos:
      - prep.conjunto_de_casos
  - id: evl_ctx_e1
    raia: evl_ctx
    tipo: fim
    rotulo: Critérios e casos acordados
    proximo: []
    retorno: criterios_definidos
  - id: evl_abd_s0
    raia: evl_abd
    tipo: inicio
    rotulo: Início da escolha
    proximo:
      - para: evl_abd_t1
        condicao: ""
  - id: evl_abd_t1
    raia: evl_abd
    tipo: tarefa
    rotulo: Registrar premissas e pontuar as opções
    proximo:
      - para: evl_abd_g1
        condicao: ""
    passos:
      - ctx.premissas_nao_funcionais
      - prep.pontuar_opcoes_matriz
  - id: evl_abd_g1
    raia: evl_abd
    tipo: bifurcacao
    rotulo: Dados presos ao ambiente próprio?
    proximo:
      - para: evl_abd_e1
        condicao: sim
      - para: evl_abd_g2
        condicao: não
    eixo: compliance_dados
    pergunta: q.dados_nao_saem_do_ambiente
  - id: evl_abd_g2
    raia: evl_abd
    tipo: bifurcacao
    rotulo: Plataforma cobre as métricas?
    proximo:
      - para: evl_abd_e2
        condicao: sim
      - para: evl_abd_e1
        condicao: não
    eixo: prazo_entrega
    pergunta: q.plataforma_cobre_metricas_e_prazo_curto
  - id: evl_abd_e1
    raia: evl_abd
    tipo: fim
    rotulo: Construir o harness de avaliação
    proximo: []
    retorno: construir
  - id: evl_abd_e2
    raia: evl_abd
    tipo: fim
    rotulo: Plataforma de avaliação assinada
    proximo: []
    retorno: assinar_plataforma
  - id: evl_stk_s0
    raia: evl_stk
    tipo: inicio
    rotulo: Início da escolha da stack
    proximo:
      - para: evl_stk_g1
        condicao: ""
  - id: evl_stk_g1
    raia: evl_stk
    tipo: bifurcacao
    rotulo: Sistema com recuperação?
    proximo:
      - para: evl_stk_e1
        condicao: sim
      - para: evl_stk_e2
        condicao: não
    eixo: contexto
    pergunta: q.sistema_com_recuperacao
  - id: evl_stk_e1
    raia: evl_stk
    tipo: fim
    rotulo: Stack de RAG em produção
    proximo: []
    retorno: rag_producao
  - id: evl_stk_e2
    raia: evl_stk
    tipo: fim
    rotulo: Stack de agente com ferramentas e memória
    proximo: []
    retorno: agente_ferramentas
  - id: evl_ent_s0
    raia: evl_ent
    tipo: inicio
    rotulo: Início da entrega
    proximo:
      - para: evl_ent_t1
        condicao: ""
  - id: evl_ent_t1
    raia: evl_ent
    tipo: tarefa
    rotulo: Implementar métricas e juízes
    proximo:
      - para: evl_ent_t2
        condicao: ""
    passos:
      - exec.metricas_e_corretores
      - exec.juiz_calibrado_com_pessoas
  - id: evl_ent_t2
    raia: evl_ent
    tipo: tarefa
    rotulo: Validar a avaliação
    proximo:
      - para: evl_ent_t3
        condicao: ""
    passos:
      - val.medir_estabilidade_e_sensibilidade
  - id: evl_ent_t3
    raia: evl_ent
    tipo: tarefa
    rotulo: Automatizar e operar
    proximo:
      - para: evl_ent_e1
        condicao: ""
    passos:
      - ent.rodar_a_cada_mudanca
      - ops.alimentar_com_falhas_de_producao
  - id: evl_ent_e1
    raia: evl_ent
    tipo: fim
    rotulo: Avaliação contínua em operação
    proximo: []
    retorno: pronta
perguntasDecisao:
  - id: q.dados_nao_saem_do_ambiente
    pergunta: Os casos de teste contêm dados que não podem sair do ambiente próprio?
    eixo: compliance_dados
  - id: q.plataforma_cobre_metricas_e_prazo_curto
    pergunta: O prazo é curto e uma plataforma de avaliação já cobre as métricas, o registro de execuções e a comparação entre versões?
    eixo: prazo_entrega
  - id: q.sistema_com_recuperacao
    pergunta: O sistema avaliado responde com base em documentos recuperados, e a recuperação precisa de métricas próprias?
    eixo: contexto
objetivo: Ter um conjunto de avaliação com critérios claros, executado a cada mudança, que sustente decisões sobre prompts, modelos e versões, na abordagem (assinar ou construir) que atende ao prazo, aos dados e ao controle.
preRequisitos:
  - Descrição do que significa um bom resultado, com exemplos de bons e maus resultados.
  - Amostra de entradas reais, anonimizadas.
  - Responsáveis pela revisão humana de uma amostra.
  - Premissas de volume, dados sensíveis, prazo e orçamento.
passos:
  - id: ctx.criterios_de_sucesso
    titulo: Definir critérios de sucesso mensuráveis
    descricao: Descrever, para a tarefa, as dimensões de qualidade (correção, formato, tom, segurança, latência, custo) e a meta de cada uma.
    verificacao: Cada dimensão tem meta numérica ou regra de aprovação e foi aceita por quem usa o resultado.
    depende: []
  - id: ctx.riscos_a_medir
    titulo: Identificar as falhas que mais custam
    descricao: Listar os tipos de falha de maior impacto, como informação inventada, vazamento de dados ou recusa indevida, e como detectá-los.
    verificacao: Cada falha de alto impacto tem um critério de detecção e um peso na avaliação.
    depende:
      - ctx.criterios_de_sucesso
  - id: ctx.premissas_nao_funcionais
    titulo: Registrar premissas não funcionais
    descricao: Anotar volume esperado, latência aceitável, dados sensíveis, prazo e orçamento, que alimentam as perguntas de decisão.
    verificacao: Cada um dos 7 eixos de adoção tem uma resposta escrita ou a nota de que não se aplica.
    depende:
      - ctx.riscos_a_medir
  - id: prep.pontuar_opcoes_matriz
    titulo: Pontuar construir, comprar e assinar
    descricao: Dar nota de 1 a 5 às três opções nos cinco critérios da matriz e registrar o objetivo que pesa mais.
    verificacao: A matriz tem as 15 notas preenchidas e a opção vencedora tem a justificativa registrada.
    depende:
      - ctx.premissas_nao_funcionais
  - id: prep.conjunto_de_casos
    titulo: Montar o conjunto de casos com respostas de referência
    descricao: Reunir casos reais anonimizados, incluindo casos difíceis, raros e adversariais, com a resposta de referência ou a regra de correção.
    verificacao: O conjunto tem casos por tipo, ao menos cinquenta no total, e uma parte é reservada e não é usada para ajustar prompts.
    depende:
      - ctx.riscos_a_medir
  - id: exec.metricas_e_corretores
    titulo: Implementar métricas e corretores automáticos
    descricao: Implementar correções por regra para o que é objetivo, como formato e campos, e correções por modelo juiz para o que é subjetivo.
    verificacao: Cada critério tem um corretor automático e a execução completa produz um relatório por caso e por critério.
    depende:
      - prep.conjunto_de_casos
      - prep.pontuar_opcoes_matriz
  - id: exec.juiz_calibrado_com_pessoas
    titulo: Calibrar o modelo juiz com revisão humana
    descricao: Comparar as notas do juiz com as de pessoas em uma amostra e ajustar as instruções do juiz até a concordância ser aceitável.
    verificacao: A concordância entre juiz e pessoas atinge a meta definida e os desacordos estão analisados.
    depende:
      - exec.metricas_e_corretores
  - id: val.medir_estabilidade_e_sensibilidade
    titulo: Medir a estabilidade e a sensibilidade da avaliação
    descricao: Repetir a avaliação para medir a variação entre execuções e confirmar que uma piora proposital é detectada.
    verificacao: A variação entre execuções está dentro do limite e uma degradação proposital é apontada pela avaliação.
    depende:
      - exec.juiz_calibrado_com_pessoas
  - id: ent.rodar_a_cada_mudanca
    titulo: Rodar a avaliação a cada mudança
    descricao: Integrar a avaliação ao fluxo de mudanças, bloquear a publicação quando as metas não são atingidas e guardar o histórico.
    verificacao: Uma mudança de prompt ou de modelo dispara a avaliação automaticamente e o resultado fica no histórico.
    depende:
      - val.medir_estabilidade_e_sensibilidade
  - id: ops.alimentar_com_falhas_de_producao
    titulo: Alimentar o conjunto com falhas reais
    descricao: Transformar falhas e reclamações de produção em novos casos e revisar periodicamente a relevância dos critérios.
    verificacao: Cada falha relevante de produção vira um caso novo e os critérios têm revisão agendada.
    depende:
      - ent.rodar_a_cada_mudanca
comoFazerHoje: []
checklistRefs: {}
armadilhas:
  - Montar o conjunto só com casos fáceis, o que gera notas altas e falsa confiança.
  - Ajustar o prompt olhando o conjunto inteiro, o que contamina a avaliação e esconde o desempenho real.
  - Confiar em um modelo juiz sem calibrar com pessoas, o que replica vieses do juiz nas notas.
  - Tratar a avaliação como evento único, o que deixa a qualidade cair sem aviso depois de cada mudança.
validacao:
  - Cada critério tem meta, corretor automático e um relatório por caso.
  - O modelo juiz tem concordância com pessoas dentro da meta em uma amostra revisada.
  - A variação entre execuções está dentro do limite e uma degradação proposital é detectada.
  - Uma mudança de prompt ou de modelo dispara a avaliação e bloqueia a publicação quando falha.
  - Falhas relevantes de produção viram casos novos do conjunto.
padroes:
  - "[[llm_as_judge|LLM-as-Judge]]"
  - "[[evaluator_optimizer|Evaluator-Optimizer]]"
  - "[[human_in_the_loop|Human-in-the-Loop]]"
  - "[[guardrails_llm|Guardrails]]"
  - "[[model_cascade|Model Cascade]]"
categorias:
  - "[[evals_observabilidade|Evals e observabilidade]]"
  - "[[ranking_modelos_ia|Ranking e comparação de modelos de IA]]"
  - "[[orquestracao_llm|Orquestração de LLM]]"
  - "[[framework_agentes|Framework de agentes]]"
  - "[[rag_categoria|Ferramentas de RAG]]"
  - "[[observabilidade_apm|Observabilidade e APM]]"
aliases:
  - Criar evals
  - Avaliar um prompt
  - Avaliar um modelo
grupo: IA aplicada
stacks:
  - "[[app_rag_producao|App RAG de produção]]"
  - "[[agente_ferramentas_memoria|Agente com ferramentas e memória]]"
ferramentas:
  - "[[langfuse|LangFuse]]"
  - tabela:braintrust
  - tabela:langsmith
casosDeUso:
  - "[[avaliacao_de_prompts|Avaliação de prompts]]"
  - "[[observabilidade_em_producao|Observabilidade em produção]]"
variacoes:
  - eval-regressao-prompts
  - eval-comparar-modelos
  - eval-llm-juiz
  - obs-qualidade-respostas
certificacoes:
  - "[[nvidia_generative_ai_llm_associate_nca_genl|NVIDIA Generative AI LLM Associate (NCA-GENL)]]"
dataVerificacao: 2026-11-23
tags:
  - guia-pratico
---
# Como avaliar um modelo ou prompt (evals)
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
