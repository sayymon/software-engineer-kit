---
id: criar_agente
tipo: guia-pratico
nome: Como criar um agente
sigla: age
descricao: "Caminho para entregar um agente de IA: delimitar a tarefa e o grau de autonomia, escolher entre assinar uma plataforma pronta ou construir, definir a stack conforme o tipo de trabalho e lançar com avaliação, permissões mínimas e aprovação humana nas ações irreversíveis."
exemplo: "Um time de operações quer que um agente reconcilie pedidos e abra chamados: a tarefa tem poucas ações bem definidas, então o time constrói um agente com ferramentas e memória, mede o resultado em tarefas de teste e libera primeiro em modo assistido."
quando_usar:
  - Uma tarefa de várias etapas exige decidir o próximo passo com base em resultados parciais e usar ferramentas ou sistemas.
  - Um fluxo fixo já não cobre a variação das entradas e a decisão dinâmica traz ganho mensurável.
quando_evitar:
  - Quando uma única chamada ao modelo, uma cadeia fixa de passos ou um fluxo de automação resolve a tarefa com menos custo e risco.
fonte_ids:
  - anthropic_building_effective_agents
  - owasp_llm_top10
  - openai_agents_sdk_docs
  - langgraph_overview_docs
  - google_adk_docs
fontes:
  - id: anthropic_building_effective_agents
    tipo: artigo
    titulo: Building effective agents (Anthropic)
    link: https://www.anthropic.com/engineering/building-effective-agents
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: owasp_llm_top10
    tipo: artigo
    titulo: OWASP Top 10 for Large Language Model Applications
    link: https://owasp.org/www-project-top-10-for-large-language-model-applications/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: openai_agents_sdk_docs
    tipo: artigo
    titulo: OpenAI Agents SDK (documentação)
    link: https://openai.github.io/openai-agents-python/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: langgraph_overview_docs
    tipo: artigo
    titulo: LangGraph overview (LangChain Docs)
    link: https://docs.langchain.com/oss/python/langgraph/overview
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: google_adk_docs
    tipo: artigo
    titulo: Agent Development Kit (ADK)
    link: https://adk.dev/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
status: rascunho
publico: false
raias:
  - id: age_orq
    nome: Orquestração do agente
    responsabilidade: Encadear contexto, abordagem, stack e entrega até o desfecho.
    cor: "#607D8B"
    orquestradora: true
  - id: age_ctx
    nome: Contexto e requisitos
    responsabilidade: Entender a necessidade e fixar escopo e critérios antes de escolher tecnologia.
    cor: "#0072B2"
    orquestradora: false
  - id: age_abd
    nome: Abordagem de entrega
    responsabilidade: Decidir entre assinar, comprar ou construir a partir das premissas.
    cor: "#E69F00"
    orquestradora: false
  - id: age_stk
    nome: Stack por contexto
    responsabilidade: Escolher o arquétipo de stack ou o caminho de construção por contexto.
    cor: "#009E73"
    orquestradora: false
  - id: age_ent
    nome: Implementação e entrega
    responsabilidade: Implementar, validar, publicar e operar na abordagem escolhida.
    cor: "#56B4E9"
    orquestradora: false
nos:
  - id: age_orq_s0
    raia: age_orq
    tipo: inicio
    rotulo: Necessidade de um agente para uma tarefa de várias etapas
    proximo:
      - para: age_orq_c1
        condicao: ""
  - id: age_orq_c1
    raia: age_orq
    tipo: chamada
    rotulo: Delimitar a tarefa, as ações e a autonomia
    proximo:
      - para: age_orq_c2
        condicao: tarefa_definida
    raia_chamada: age_ctx
  - id: age_orq_c2
    raia: age_orq
    tipo: chamada
    rotulo: Escolher a abordagem de entrega
    proximo:
      - para: age_orq_c3
        condicao: construir
      - para: age_orq_c8
        condicao: assinar_plataforma
    raia_chamada: age_abd
  - id: age_orq_c3
    raia: age_orq
    tipo: chamada
    rotulo: Escolher a stack pelo tipo de trabalho
    proximo:
      - para: age_orq_c7
        condicao: fluxo_dev_assistido
      - para: age_orq_c5
        condicao: agente_multiagente
      - para: age_orq_c6
        condicao: agente_memoria_duradoura
      - para: age_orq_c4
        condicao: agente_ferramentas
    raia_chamada: age_stk
  - id: age_orq_c4
    raia: age_orq
    tipo: chamada
    rotulo: Implementar, avaliar e lançar o agente
    proximo:
      - para: age_orq_e1
        condicao: pronta
    raia_chamada: age_ent
  - id: age_orq_c5
    raia: age_orq
    tipo: chamada
    rotulo: Implementar, avaliar e lançar o agente
    proximo:
      - para: age_orq_e2
        condicao: pronta
    raia_chamada: age_ent
  - id: age_orq_c6
    raia: age_orq
    tipo: chamada
    rotulo: Implementar, avaliar e lançar o agente
    proximo:
      - para: age_orq_e3
        condicao: pronta
    raia_chamada: age_ent
  - id: age_orq_c7
    raia: age_orq
    tipo: chamada
    rotulo: Implementar, avaliar e lançar o agente
    proximo:
      - para: age_orq_e4
        condicao: pronta
    raia_chamada: age_ent
  - id: age_orq_c8
    raia: age_orq
    tipo: chamada
    rotulo: Implementar, avaliar e lançar o agente
    proximo:
      - para: age_orq_e5
        condicao: pronta
    raia_chamada: age_ent
  - id: age_orq_e1
    raia: age_orq
    tipo: fim
    rotulo: Agente com ferramentas e estado da tarefa sobre a stack de agente com ferramentas e memória
    proximo: []
    retorno: agente_ferramentas
    saida:
      tipo: stack
      justificativa: Uma tarefa de várias etapas sobre sistemas de negócio pede laço com ferramentas, memória e avaliação por trajetória, e a stack reúne esses componentes com permissões mínimas e aprovação humana.
      eixos:
        - compliance_dados
        - time_maturidade
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
  - id: age_orq_e2
    raia: age_orq
    tipo: fim
    rotulo: Agentes lançados com orquestrador e subagentes sobre a stack de agente com ferramentas e memória
    proximo: []
    retorno: agente_multiagente
    saida:
      tipo: stack
      justificativa: Quando as subtarefas são independentes e um único agente perde qualidade por excesso de contexto ou de ferramentas, um orquestrador com subagentes de escopo estreito reduz o contexto de cada um e permite avaliar cada papel separadamente.
      eixos:
        - escala_volume
        - time_maturidade
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
  - id: age_orq_e3
    raia: age_orq
    tipo: fim
    rotulo: Agente com memória duradoura sobre a stack de agente com ferramentas e memória
    proximo: []
    retorno: agente_memoria_duradoura
    saida:
      tipo: stack
      justificativa: Quando o agente precisa lembrar decisões e preferências entre sessões, a memória duradoura com regra de retenção, consulta por relevância e esquecimento deliberado evita repetir perguntas e mantém dados sensíveis fora do armazenamento.
      eixos:
        - compliance_dados
        - time_maturidade
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
  - id: age_orq_e4
    raia: age_orq
    tipo: fim
    rotulo: Agente de código lançado sobre a stack de desenvolvimento assistido por IA
    proximo: []
    retorno: fluxo_dev_assistido
    saida:
      tipo: stack
      justificativa: Quando o trabalho do agente é ler, alterar e testar código, o fluxo de desenvolvimento assistido já traz revisão, testes e controle de versão como grade de proteção, e entrega valor com um time pequeno.
      eixos:
        - time_maturidade
        - prazo_entrega
        - lock_in
      objetivo: cumprir_prazo
      notas:
        construir:
          diferenciacao: 3
          tempo_ate_valor: 4
          custo_total: 4
          dependencia_fornecedor: 5
          risco: 4
        comprar:
          diferenciacao: 2
          tempo_ate_valor: 3
          custo_total: 3
          dependencia_fornecedor: 3
          risco: 3
        assinar:
          diferenciacao: 2
          tempo_ate_valor: 5
          custo_total: 3
          dependencia_fornecedor: 2
          risco: 3
      stack: "[[fluxo_dev_assistido_ia|Fluxo de desenvolvimento assistido por IA]]"
  - id: age_orq_e5
    raia: age_orq
    tipo: fim
    rotulo: Agente ativo em uma plataforma de automação assinada
    proximo: []
    retorno: assinar_plataforma
    saida:
      tipo: assinar
      justificativa: Para um fluxo repetível com poucas decisões, a plataforma assinada entrega conectores, agendamento e histórico de execução em dias, e valida o ganho antes de qualquer código próprio.
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
      categoria: "[[automacao_nocode|Automação e no-code]]"
      ferramentas:
        - "[[n8n|n8n]]"
        - tabela:make
        - tabela:zapier
  - id: age_ctx_s0
    raia: age_ctx
    tipo: inicio
    rotulo: Início do levantamento
    proximo:
      - para: age_ctx_t1
        condicao: ""
  - id: age_ctx_t1
    raia: age_ctx
    tipo: tarefa
    rotulo: Delimitar a tarefa e as ações
    proximo:
      - para: age_ctx_t2
        condicao: ""
    passos:
      - ctx.tarefa_e_autonomia
      - ctx.acoes_e_permissoes
  - id: age_ctx_t2
    raia: age_ctx
    tipo: tarefa
    rotulo: Preparar as tarefas de teste
    proximo:
      - para: age_ctx_e1
        condicao: ""
    passos:
      - prep.tarefas_de_teste
  - id: age_ctx_e1
    raia: age_ctx
    tipo: fim
    rotulo: Tarefa, ações e autonomia acordadas
    proximo: []
    retorno: tarefa_definida
  - id: age_abd_s0
    raia: age_abd
    tipo: inicio
    rotulo: Início da escolha
    proximo:
      - para: age_abd_t1
        condicao: ""
  - id: age_abd_t1
    raia: age_abd
    tipo: tarefa
    rotulo: Registrar premissas e pontuar as opções
    proximo:
      - para: age_abd_g1
        condicao: ""
    passos:
      - ctx.premissas_nao_funcionais
      - prep.pontuar_opcoes_matriz
  - id: age_abd_g1
    raia: age_abd
    tipo: bifurcacao
    rotulo: Controle próprio de dados e ações?
    proximo:
      - para: age_abd_e1
        condicao: sim
      - para: age_abd_g2
        condicao: não
    eixo: compliance_dados
    pergunta: q.dados_e_acoes_sob_controle_proprio
  - id: age_abd_g2
    raia: age_abd
    tipo: bifurcacao
    rotulo: Ações irreversíveis com aprovação própria?
    proximo:
      - para: age_abd_e1
        condicao: sim
      - para: age_abd_g3
        condicao: não
    eixo: lock_in
    pergunta: q.acoes_irreversiveis_com_politica_de_aprovacao_propria
  - id: age_abd_g3
    raia: age_abd
    tipo: bifurcacao
    rotulo: Fluxo padronizado coberto por plataforma?
    proximo:
      - para: age_abd_e2
        condicao: sim
      - para: age_abd_e1
        condicao: não
    eixo: prazo_entrega
    pergunta: q.fluxo_padronizado_na_plataforma
  - id: age_abd_e1
    raia: age_abd
    tipo: fim
    rotulo: Construir o agente
    proximo: []
    retorno: construir
  - id: age_abd_e2
    raia: age_abd
    tipo: fim
    rotulo: Plataforma de automação com agente assinada
    proximo: []
    retorno: assinar_plataforma
  - id: age_stk_s0
    raia: age_stk
    tipo: inicio
    rotulo: Início da escolha da stack
    proximo:
      - para: age_stk_g1
        condicao: ""
  - id: age_stk_g1
    raia: age_stk
    tipo: bifurcacao
    rotulo: Trabalho sobre código?
    proximo:
      - para: age_stk_e1
        condicao: sim
      - para: age_stk_g2
        condicao: não
    eixo: contexto
    pergunta: q.trabalho_sobre_codigo
  - id: age_stk_g2
    raia: age_stk
    tipo: bifurcacao
    rotulo: Subtarefas independentes demais para um agente?
    proximo:
      - para: age_stk_e2
        condicao: sim
      - para: age_stk_g3
        condicao: não
    eixo: escala_volume
    pergunta: q.tarefa_divisivel_em_subtarefas_independentes
  - id: age_stk_g3
    raia: age_stk
    tipo: bifurcacao
    rotulo: Memória entre sessões?
    proximo:
      - para: age_stk_e3
        condicao: sim
      - para: age_stk_e4
        condicao: não
    eixo: contexto
    pergunta: q.memoria_duradoura_entre_sessoes
  - id: age_stk_e1
    raia: age_stk
    tipo: fim
    rotulo: Stack de desenvolvimento assistido por IA
    proximo: []
    retorno: fluxo_dev_assistido
  - id: age_stk_e2
    raia: age_stk
    tipo: fim
    rotulo: Stack de orquestração com subagentes
    proximo: []
    retorno: agente_multiagente
  - id: age_stk_e3
    raia: age_stk
    tipo: fim
    rotulo: Stack de agente com memória duradoura
    proximo: []
    retorno: agente_memoria_duradoura
  - id: age_stk_e4
    raia: age_stk
    tipo: fim
    rotulo: Stack de agente com ferramentas e estado da tarefa
    proximo: []
    retorno: agente_ferramentas
  - id: age_ent_s0
    raia: age_ent
    tipo: inicio
    rotulo: Início da entrega
    proximo:
      - para: age_ent_t1
        condicao: ""
  - id: age_ent_t1
    raia: age_ent
    tipo: tarefa
    rotulo: Implementar o laço, a memória e as proteções
    proximo:
      - para: age_ent_t2
        condicao: ""
    passos:
      - exec.laco_com_ferramentas
      - exec.criterio_de_parada
      - exec.ferramentas_com_permissoes_minimas
      - exec.memoria_e_contexto
      - exec.orquestracao_multiagente_justificada
      - exec.guardas_e_aprovacao_humana
      - exec.politica_de_aprovacao_humana
  - id: age_ent_t2
    raia: age_ent
    tipo: tarefa
    rotulo: Avaliar antes de lançar
    proximo:
      - para: age_ent_t3
        condicao: ""
    passos:
      - val.avaliar_trajetorias
      - val.evals_em_pipeline
  - id: age_ent_t3
    raia: age_ent
    tipo: tarefa
    rotulo: Lançar e operar
    proximo:
      - para: age_ent_e1
        condicao: ""
    passos:
      - ent.lancar_em_modo_assistido
      - ops.acompanhar_custo_e_falhas
      - ops.observabilidade_e_orcamento_de_custo
  - id: age_ent_e1
    raia: age_ent
    tipo: fim
    rotulo: Agente lançado e acompanhado
    proximo: []
    retorno: pronta
perguntasDecisao:
  - id: q.dados_e_acoes_sob_controle_proprio
    pergunta: Os dados ou as ações exigem controle próprio de permissões, registro e local de processamento?
    eixo: compliance_dados
  - id: q.acoes_irreversiveis_com_politica_de_aprovacao_propria
    pergunta: O agente executa ações irreversíveis, como pagamentos, exclusões ou envios externos, e a organização exige política de autonomia e trilha de aprovação próprias?
    eixo: lock_in
  - id: q.fluxo_padronizado_na_plataforma
    pergunta: A tarefa é um fluxo repetível com poucas decisões e uma plataforma de automação com IA já oferece os conectores necessários?
    eixo: prazo_entrega
  - id: q.trabalho_sobre_codigo
    pergunta: O agente trabalha sobre código e repositórios, com leitura, edição e execução de testes?
    eixo: contexto
  - id: q.tarefa_divisivel_em_subtarefas_independentes
    pergunta: A tarefa se divide em subtarefas independentes que um único agente não cobre bem por limite de contexto, de ferramentas ou de especialização?
    eixo: escala_volume
  - id: q.memoria_duradoura_entre_sessoes
    pergunta: O agente precisa lembrar decisões e preferências entre sessões, além do contexto da tarefa atual?
    eixo: contexto
objetivo: Entregar um agente que cumpre uma tarefa delimitada com ferramentas, memória e limites claros, medido em tarefas de teste e lançado com supervisão, na abordagem (assinar ou construir) que atende ao prazo, aos dados e ao controle.
preRequisitos:
  - Uma tarefa concreta com resultado esperado e critério de sucesso.
  - Lista dos sistemas e ações que o agente poderá tocar, com um dono para cada um.
  - Exemplos reais da tarefa feita por pessoas, para servir de base dos testes.
  - Premissas de volume, dados sensíveis, prazo e orçamento.
passos:
  - id: ctx.tarefa_e_autonomia
    titulo: Delimitar a tarefa, o resultado e o grau de autonomia
    descricao: Escrever a tarefa em uma frase, o resultado esperado, o critério de sucesso e até onde o agente decide sozinho antes de pedir aprovação.
    verificacao: A tarefa, o critério de sucesso e os pontos de aprovação humana estão escritos e foram aceitos pelo dono do processo.
    depende: []
  - id: ctx.acoes_e_permissoes
    titulo: Listar as ações necessárias e as permissões mínimas
    descricao: Enumerar cada ação que o agente executa, o sistema afetado e a menor permissão que a viabiliza, separando leitura de escrita.
    verificacao: Cada ação tem sistema, permissão mínima e dono, e as ações irreversíveis estão marcadas.
    depende:
      - ctx.tarefa_e_autonomia
  - id: ctx.premissas_nao_funcionais
    titulo: Registrar premissas não funcionais
    descricao: Anotar volume esperado, latência aceitável, dados sensíveis, prazo e orçamento, que alimentam as perguntas de decisão.
    verificacao: Cada um dos 7 eixos de adoção tem uma resposta escrita ou a nota de que não se aplica.
    depende:
      - ctx.acoes_e_permissoes
  - id: prep.pontuar_opcoes_matriz
    titulo: Pontuar construir, comprar e assinar
    descricao: Dar nota de 1 a 5 às três opções nos cinco critérios da matriz e registrar o objetivo que pesa mais.
    verificacao: A matriz tem as 15 notas preenchidas e a opção vencedora tem a justificativa registrada.
    depende:
      - ctx.premissas_nao_funcionais
  - id: prep.tarefas_de_teste
    titulo: Montar tarefas de teste com resultado esperado
    descricao: Reunir tarefas reais anonimizadas, incluindo casos difíceis e casos que o agente deve recusar, cada uma com o resultado esperado.
    verificacao: O conjunto tem ao menos trinta tarefas com resultado esperado, e uma parte cobre recusa e erro de ferramenta.
    depende:
      - ctx.acoes_e_permissoes
  - id: exec.laco_com_ferramentas
    titulo: Implementar o laço com ferramentas e limite de passos
    descricao: Construir o ciclo de planejar, chamar uma ferramenta e observar o resultado, com limite de passos, de tempo e de gasto por tarefa.
    verificacao: Uma tarefa de teste conclui com registro de cada passo, e uma tarefa sem solução termina no limite com mensagem clara.
    depende:
      - prep.tarefas_de_teste
      - prep.pontuar_opcoes_matriz
  - id: exec.criterio_de_parada
    titulo: Definir quando o laço do agente termina
    descricao: "Escrever os critérios de término: objetivo atingido, limite de passos, de tempo e de gasto, falha repetida da mesma ferramenta e pedido de ajuda a uma pessoa, e registrar o motivo de cada parada."
    verificacao: Cada execução do conjunto de testes termina por um dos motivos escritos, e a execução sem solução para com o motivo registrado.
    depende:
      - exec.laco_com_ferramentas
  - id: exec.ferramentas_com_permissoes_minimas
    titulo: Implementar as ferramentas com contrato e permissão mínima
    descricao: Descrever cada ferramenta com nome, finalidade, parâmetros tipados e erros esperados, separar leitura de escrita e conceder a cada uma só a permissão listada no levantamento de ações.
    verificacao: Cada ferramenta valida suas entradas, devolve erros legíveis ao agente e opera com credencial própria de menor privilégio.
    depende:
      - ctx.acoes_e_permissoes
      - exec.laco_com_ferramentas
  - id: exec.memoria_e_contexto
    titulo: Definir o que o agente lembra e o que descarta
    descricao: Separar o estado da tarefa atual, a memória de longo prazo e o que nunca é guardado, e resumir ou descartar o contexto que cresce.
    verificacao: O conteúdo guardado tem regra de retenção por tipo, e dados sensíveis ficam fora da memória de longo prazo.
    depende:
      - exec.laco_com_ferramentas
  - id: exec.orquestracao_multiagente_justificada
    titulo: Dividir em subagentes apenas quando houver ganho medido
    descricao: Começar com um único agente, medir o resultado e só então separar papéis com subagentes de escopo estreito, definindo o que cada um recebe, devolve e quem consolida a resposta.
    verificacao: A versão com subagentes supera a de um agente nas tarefas de teste em qualidade, custo ou tempo, e cada subagente tem entrada, saída e dono definidos.
    depende:
      - exec.memoria_e_contexto
      - exec.ferramentas_com_permissoes_minimas
  - id: exec.guardas_e_aprovacao_humana
    titulo: Aplicar guardas e aprovação humana nas ações irreversíveis
    descricao: Validar as entradas das ferramentas, tratar o texto externo como dado e exigir aprovação de uma pessoa antes de ações irreversíveis.
    verificacao: Entradas maliciosas do conjunto de testes não disparam ações, e toda ação irreversível passa por aprovação registrada.
    depende:
      - exec.memoria_e_contexto
  - id: exec.politica_de_aprovacao_humana
    titulo: Definir a política de aprovação humana por nível de risco
    descricao: Classificar as ações em baixo, médio e alto risco, e decidir para cada nível se o agente age sozinho, age e avisa ou pede aprovação antes, com prazo de resposta e ação padrão quando ninguém responde.
    verificacao: Cada ação listada tem um nível de risco e um modo de aprovação, e a ação de alto risco sem resposta humana fica pendente e não é executada.
    depende:
      - exec.guardas_e_aprovacao_humana
  - id: val.avaliar_trajetorias
    titulo: Avaliar o resultado e a trajetória de cada tarefa
    descricao: Rodar o conjunto de testes medindo o resultado final, o número de passos, o custo e as chamadas indevidas, e revisar uma amostra por uma pessoa.
    verificacao: As metas de sucesso, custo e segurança do conjunto foram atingidas e uma amostra de trajetórias foi revisada.
    depende:
      - exec.guardas_e_aprovacao_humana
  - id: val.evals_em_pipeline
    titulo: Automatizar os evals e comparar versões do agente
    descricao: Rodar o conjunto de tarefas de teste a cada mudança de prompt, ferramenta ou modelo, com verificações programáticas e um juiz de modelo calibrado por revisão humana, e comparar com a versão anterior.
    verificacao: A rotina de evals roda sem intervenção manual, bloqueia a liberação quando a taxa de sucesso cai abaixo da meta e o juiz concorda com a revisão humana em amostra.
    depende:
      - val.avaliar_trajetorias
  - id: ent.lancar_em_modo_assistido
    titulo: Lançar em modo assistido para um grupo pequeno
    descricao: Liberar o agente com aprovação humana em todas as ações de escrita e ampliar a autonomia conforme os resultados.
    verificacao: O grupo piloto usa o agente com aprovação ativa e existe um botão de interromper a execução.
    depende:
      - val.avaliar_trajetorias
  - id: ops.observabilidade_e_orcamento_de_custo
    titulo: Registrar rastros de cada execução e limitar o orçamento
    descricao: Guardar o rastro de cada execução (passos, chamadas de ferramenta, tokens e duração) com identificador de tarefa, e definir um teto de custo por tarefa e por dia com alerta ao se aproximar.
    verificacao: Qualquer execução pode ser reconstruída pelo rastro, e o alerta de custo dispara em teste antes do teto ser atingido.
    depende:
      - ent.lancar_em_modo_assistido
  - id: ops.acompanhar_custo_e_falhas
    titulo: Acompanhar custo, falhas e desvios
    descricao: Acompanhar custo por tarefa, taxa de sucesso, limites atingidos e ações recusadas, e transformar as falhas em novos testes.
    verificacao: O painel mostra custo por tarefa e taxa de sucesso, e cada falha relevante vira um teste novo no conjunto.
    depende:
      - ent.lancar_em_modo_assistido
comoFazerHoje:
  - passo: exec.laco_com_ferramentas
    variante: openai-agents-sdk
    comandos:
      - pip install openai-agents
      - export OPENAI_API_KEY="<SUA_CHAVE_DE_API>"
    versaoTestada: não verificado
    dataVerificacao: 2026-11-23
    fonteUrl: https://openai.github.io/openai-agents-python/
  - passo: exec.laco_com_ferramentas
    variante: langgraph
    comandos:
      - pip install -U langgraph
    versaoTestada: não verificado
    dataVerificacao: 2026-11-23
    fonteUrl: https://docs.langchain.com/oss/python/langgraph/overview
  - passo: exec.laco_com_ferramentas
    variante: google-adk
    comandos:
      - pip install google-adk
    versaoTestada: não verificado
    dataVerificacao: 2026-11-23
    fonteUrl: https://adk.dev/
checklistRefs:
  exec.ferramentas_com_permissoes_minimas: seg.menor_privilegio
  ops.observabilidade_e_orcamento_de_custo: custo.orcamento_alertas
armadilhas:
  - Dar ao agente acesso amplo desde o início, o que amplia o dano de um erro ou de uma instrução maliciosa.
  - Usar um agente onde uma cadeia fixa de passos resolve, o que aumenta custo, latência e imprevisibilidade.
  - Medir apenas o resultado final, o que esconde passos desperdiçados, chamadas indevidas e custo crescente.
  - Deixar o laço sem limite de passos, de tempo e de gasto, o que permite execuções que não terminam.
validacao:
  - As metas do conjunto de testes para sucesso, custo por tarefa e segurança foram atingidas.
  - Cada ação irreversível passa por aprovação humana registrada e as permissões do agente são as mínimas.
  - O laço respeita os limites de passos, tempo e gasto e termina com mensagem clara quando não resolve.
  - Entradas maliciosas do conjunto de testes não disparam ações fora do escopo.
  - O painel acompanha custo, sucesso e falhas, e as falhas relevantes alimentam novos testes.
padroes:
  - "[[react_agente|ReAct (padrão)]]"
  - "[[tool_use|Tool Use (padrão)]]"
  - "[[human_in_the_loop|Human-in-the-Loop]]"
  - "[[guardrails_llm|Guardrails]]"
  - "[[agent_memory|Agent Memory]]"
  - "[[plan_and_execute|Plan-and-Execute]]"
  - "[[agentic_rag|Agentic RAG]]"
  - "[[multi_agent|Multi-Agent]]"
  - "[[orchestrator_workers|Orchestrator-Workers]]"
  - "[[llm_as_judge|LLM-as-Judge]]"
categorias:
  - "[[framework_agentes|Framework de agentes]]"
  - "[[prompts_agentes_repos|Prompts e agentes]]"
  - "[[automacao_nocode|Automação e no-code]]"
  - "[[evals_observabilidade|Evals e observabilidade]]"
  - "[[guardrails_seguranca_llm|Guardrails e segurança de LLM]]"
  - "[[agente_codigo|Agente de código]]"
aliases:
  - Criar um agente de IA
  - Construir um agente
grupo: IA aplicada
stacks:
  - "[[agente_ferramentas_memoria|Agente com ferramentas e memória]]"
  - "[[fluxo_dev_assistido_ia|Fluxo de desenvolvimento assistido por IA]]"
ferramentas:
  - "[[n8n|n8n]]"
  - tabela:make
  - tabela:zapier
casosDeUso:
  - "[[construcao_de_agentes|Construção de agentes]]"
  - "[[sistemas_multiagentes|Sistemas multiagentes]]"
variacoes:
  - agente-operacoes-internas
  - agente-pesquisa-analise
  - multi-orquestrador-subagentes
certificacoes:
  - "[[microsoft_azure_ai_apps_and_agents_developer_associate_ai_103|Microsoft Azure AI Apps and Agents Developer Associate (AI-103)]]"
  - "[[databricks_certified_generative_ai_engineer_associate|Databricks Certified Generative AI Engineer Associate]]"
dataVerificacao: 2026-11-23
tags:
  - guia-pratico
---
# Como criar um agente
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
