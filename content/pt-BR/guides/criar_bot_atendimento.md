---
id: criar_bot_atendimento
tipo: guia-pratico
nome: Como criar um bot de atendimento
sigla: bot
descricao: "Caminho para entregar um bot de atendimento: levantar intenções e regras de escalonamento, escolher entre assinar uma suíte de suporte ou construir com RAG ou agente, e lançar com avaliação, proteções e acompanhamento contínuo."
exemplo: "Uma loja virtual quer responder dúvidas de pedidos e trocas: prepara a base de conhecimento, monta um conjunto de avaliação, constrói um bot com respostas citando a fonte e transferência para pessoas, e lança para parte do tráfego."
quando_usar:
  - Dúvidas recorrentes consomem tempo do time de suporte e podem ser respondidas com uma base de conhecimento.
  - O atendimento precisa cobrir horários ou volumes que o time humano não alcança.
quando_evitar:
  - Quando o volume de atendimentos é pequeno e uma página de perguntas frequentes resolve.
fonte_ids:
  - anthropic_building_effective_agents
  - owasp_llm_top10
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
status: rascunho
publico: false
raias:
  - id: bot_orq
    nome: Orquestração do bot
    responsabilidade: Encadear contexto, abordagem, stack e entrega até o desfecho.
    cor: "#607D8B"
    orquestradora: true
  - id: bot_ctx
    nome: Contexto e requisitos
    responsabilidade: Entender a necessidade e fixar escopo e critérios antes de escolher tecnologia.
    cor: "#0072B2"
    orquestradora: false
  - id: bot_abd
    nome: Abordagem de entrega
    responsabilidade: Decidir entre assinar, comprar ou construir a partir das premissas.
    cor: "#E69F00"
    orquestradora: false
  - id: bot_stk
    nome: Stack por contexto
    responsabilidade: Escolher o arquétipo de stack ou o caminho de construção por contexto.
    cor: "#009E73"
    orquestradora: false
  - id: bot_ent
    nome: Implementação e entrega
    responsabilidade: Implementar, validar, publicar e operar na abordagem escolhida.
    cor: "#56B4E9"
    orquestradora: false
nos:
  - id: bot_orq_s0
    raia: bot_orq
    tipo: inicio
    rotulo: Necessidade de atendimento automatizado
    proximo:
      - para: bot_orq_c1
        condicao: ""
  - id: bot_orq_c1
    raia: bot_orq
    tipo: chamada
    rotulo: Levantar intenções, canais e regras de escalonamento
    proximo:
      - para: bot_orq_c2
        condicao: intencoes_definidas
    raia_chamada: bot_ctx
  - id: bot_orq_c2
    raia: bot_orq
    tipo: chamada
    rotulo: Escolher a abordagem de entrega
    proximo:
      - para: bot_orq_c3
        condicao: construir
      - para: bot_orq_c6
        condicao: assinar_suite
    raia_chamada: bot_abd
  - id: bot_orq_c3
    raia: bot_orq
    tipo: chamada
    rotulo: Escolher a stack do bot
    proximo:
      - para: bot_orq_c4
        condicao: agente_com_ferramentas
      - para: bot_orq_c5
        condicao: rag_producao
    raia_chamada: bot_stk
  - id: bot_orq_c4
    raia: bot_orq
    tipo: chamada
    rotulo: Implementar, avaliar e lançar o bot
    proximo:
      - para: bot_orq_e1
        condicao: pronta
    raia_chamada: bot_ent
  - id: bot_orq_c5
    raia: bot_orq
    tipo: chamada
    rotulo: Implementar, avaliar e lançar o bot
    proximo:
      - para: bot_orq_e2
        condicao: pronta
    raia_chamada: bot_ent
  - id: bot_orq_c6
    raia: bot_orq
    tipo: chamada
    rotulo: Implementar, avaliar e lançar o bot
    proximo:
      - para: bot_orq_e3
        condicao: pronta
    raia_chamada: bot_ent
  - id: bot_orq_e1
    raia: bot_orq
    tipo: fim
    rotulo: Bot lançado sobre a stack de agente com ferramentas
    proximo: []
    retorno: agente_com_ferramentas
    saida:
      tipo: stack
      justificativa: Quando o bot precisa agir em sistemas, o agente com ferramentas e memória resolve a solicitação inteira, e permissões mínimas e aprovação humana limitam o dano de um erro.
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
  - id: bot_orq_e2
    raia: bot_orq
    tipo: fim
    rotulo: Bot lançado sobre a stack de RAG em produção
    proximo: []
    retorno: rag_producao
    saida:
      tipo: stack
      justificativa: Quando o bot só responde, a recuperação sobre a base de conhecimento com citação da fonte entrega respostas fundamentadas, mais baratas e mais fáceis de avaliar que um agente.
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
  - id: bot_orq_e3
    raia: bot_orq
    tipo: fim
    rotulo: Bot ativo em uma suíte de suporte assinada
    proximo: []
    retorno: assinar_suite
    saida:
      tipo: assinar
      justificativa: Com base curta e dúvidas recorrentes, o assistente da suíte de suporte entrega canais, histórico e transferência para pessoas em dias, e valida o ganho antes de código próprio.
      eixos:
        - prazo_entrega
        - orcamento
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
      categoria: "[[suporte_atendimento|Suporte e atendimento]]"
      ferramentas:
        - "[[zendesk|Zendesk]]"
        - "[[freshdesk|Freshdesk]]"
        - tabela:intercom
  - id: bot_ctx_s0
    raia: bot_ctx
    tipo: inicio
    rotulo: Início do levantamento
    proximo:
      - para: bot_ctx_t1
        condicao: ""
  - id: bot_ctx_t1
    raia: bot_ctx
    tipo: tarefa
    rotulo: Levantar intenções e regras de escalonamento
    proximo:
      - para: bot_ctx_t2
        condicao: ""
    passos:
      - ctx.intencoes_e_canais
      - ctx.regras_de_escalonamento
  - id: bot_ctx_t2
    raia: bot_ctx
    tipo: tarefa
    rotulo: Preparar a base e a avaliação
    proximo:
      - para: bot_ctx_e1
        condicao: ""
    passos:
      - prep.base_de_conhecimento
      - prep.conjunto_de_avaliacao
  - id: bot_ctx_e1
    raia: bot_ctx
    tipo: fim
    rotulo: Intenções e escalonamento acordados
    proximo: []
    retorno: intencoes_definidas
  - id: bot_abd_s0
    raia: bot_abd
    tipo: inicio
    rotulo: Início da escolha
    proximo:
      - para: bot_abd_t1
        condicao: ""
  - id: bot_abd_t1
    raia: bot_abd
    tipo: tarefa
    rotulo: Registrar premissas e pontuar as opções
    proximo:
      - para: bot_abd_g1
        condicao: ""
    passos:
      - ctx.premissas_nao_funcionais
      - prep.pontuar_opcoes_matriz
  - id: bot_abd_g1
    raia: bot_abd
    tipo: bifurcacao
    rotulo: Dados pessoais ou regulados?
    proximo:
      - para: bot_abd_e1
        condicao: sim
      - para: bot_abd_g2
        condicao: não
    eixo: compliance_dados
    pergunta: q.dados_pessoais_nas_conversas
  - id: bot_abd_g2
    raia: bot_abd
    tipo: bifurcacao
    rotulo: Base curta e assistente na suíte?
    proximo:
      - para: bot_abd_e2
        condicao: sim
      - para: bot_abd_e1
        condicao: não
    eixo: prazo_entrega
    pergunta: q.base_curta_assistente_na_suite
  - id: bot_abd_e1
    raia: bot_abd
    tipo: fim
    rotulo: Construir o bot
    proximo: []
    retorno: construir
  - id: bot_abd_e2
    raia: bot_abd
    tipo: fim
    rotulo: Suíte de suporte assinada
    proximo: []
    retorno: assinar_suite
  - id: bot_stk_s0
    raia: bot_stk
    tipo: inicio
    rotulo: Início da escolha da stack
    proximo:
      - para: bot_stk_g1
        condicao: ""
  - id: bot_stk_g1
    raia: bot_stk
    tipo: bifurcacao
    rotulo: Ações em sistemas?
    proximo:
      - para: bot_stk_e1
        condicao: sim
      - para: bot_stk_e2
        condicao: não
    eixo: contexto
    pergunta: q.acoes_em_sistemas
  - id: bot_stk_e1
    raia: bot_stk
    tipo: fim
    rotulo: Stack de agente com ferramentas
    proximo: []
    retorno: agente_com_ferramentas
  - id: bot_stk_e2
    raia: bot_stk
    tipo: fim
    rotulo: Stack de RAG em produção
    proximo: []
    retorno: rag_producao
  - id: bot_ent_s0
    raia: bot_ent
    tipo: inicio
    rotulo: Início da entrega
    proximo:
      - para: bot_ent_t1
        condicao: ""
  - id: bot_ent_t1
    raia: bot_ent
    tipo: tarefa
    rotulo: Implementar respostas e proteções
    proximo:
      - para: bot_ent_t2
        condicao: ""
    passos:
      - exec.respostas_com_fonte
      - exec.protecoes_e_acesso_minimo
  - id: bot_ent_t2
    raia: bot_ent
    tipo: tarefa
    rotulo: Avaliar antes de lançar
    proximo:
      - para: bot_ent_t3
        condicao: ""
    passos:
      - val.avaliar_e_revisar_conversas
  - id: bot_ent_t3
    raia: bot_ent
    tipo: tarefa
    rotulo: Lançar e melhorar
    proximo:
      - para: bot_ent_e1
        condicao: ""
    passos:
      - ent.lancar_gradualmente
      - ops.monitorar_e_melhorar
  - id: bot_ent_e1
    raia: bot_ent
    tipo: fim
    rotulo: Bot lançado e acompanhado
    proximo: []
    retorno: pronta
perguntasDecisao:
  - id: q.dados_pessoais_nas_conversas
    pergunta: As conversas trazem dados pessoais ou regulados que exigem controle próprio do tratamento?
    eixo: compliance_dados
  - id: q.base_curta_assistente_na_suite
    pergunta: A base é curta, as dúvidas são recorrentes e a suíte de suporte já oferece um assistente?
    eixo: prazo_entrega
  - id: q.acoes_em_sistemas
    pergunta: O bot precisa executar ações em sistemas, como consultar um pedido ou abrir um reembolso, além de responder?
    eixo: contexto
objetivo: Lançar um bot que resolve as dúvidas recorrentes com respostas fundamentadas, protegido contra abuso e com passagem fácil para uma pessoa, na abordagem (assinar ou construir) que atende ao prazo, aos dados e ao controle.
preRequisitos:
  - Registros de atendimento anonimizados e as intenções mais frequentes.
  - Base de conhecimento com dono e data de revisão.
  - Horário de cobertura humana e regras de escalonamento.
  - Premissas de volume, dados pessoais, prazo e orçamento.
passos:
  - id: ctx.intencoes_e_canais
    titulo: Levantar intenções, canais e volume de atendimento
    descricao: Analisar registros anonimizados para listar as intenções mais frequentes, os canais de entrada e o volume por intenção.
    verificacao: As vinte intenções mais frequentes têm exemplos reais anonimizados e o canal de origem registrados.
    depende: []
  - id: ctx.regras_de_escalonamento
    titulo: Definir quando passar para uma pessoa
    descricao: Definir para cada intenção se o bot responde ou transfere, e os gatilhos de transferência imediata, como emoção forte ou tema sensível.
    verificacao: Cada intenção tem regra de resposta automática ou de transferência e há um horário de cobertura humana definido.
    depende:
      - ctx.intencoes_e_canais
  - id: ctx.premissas_nao_funcionais
    titulo: Registrar premissas não funcionais
    descricao: Anotar volume esperado, latência aceitável, dados sensíveis, prazo e orçamento, que alimentam as perguntas de decisão.
    verificacao: Cada um dos 7 eixos de adoção tem uma resposta escrita ou a nota de que não se aplica.
    depende:
      - ctx.intencoes_e_canais
  - id: prep.pontuar_opcoes_matriz
    titulo: Pontuar construir, comprar e assinar
    descricao: Dar nota de 1 a 5 às três opções nos cinco critérios da matriz e registrar o objetivo que pesa mais.
    verificacao: A matriz tem as 15 notas preenchidas e a opção vencedora tem a justificativa registrada.
    depende:
      - ctx.premissas_nao_funcionais
  - id: prep.base_de_conhecimento
    titulo: Preparar a base de conhecimento com dono e data
    descricao: Reunir os artigos, reescrever na linguagem do cliente, atribuir dono e data de revisão e retirar o conteúdo desatualizado.
    verificacao: Cada artigo tem dono, data de revisão e linguagem de cliente, e o conteúdo desatualizado foi retirado.
    depende:
      - ctx.regras_de_escalonamento
  - id: prep.conjunto_de_avaliacao
    titulo: Montar o conjunto de avaliação e as metas
    descricao: Reunir perguntas reais com resposta de referência e definir metas de resolução, transferência e satisfação.
    verificacao: O conjunto tem ao menos cinquenta perguntas com respostas de referência e as metas numéricas estão registradas.
    depende:
      - prep.base_de_conhecimento
  - id: exec.respostas_com_fonte
    titulo: Implementar respostas com citação da fonte
    descricao: Recuperar os trechos da base, responder somente com o que a base sustenta e citar a fonte, com recusa educada quando faltar base.
    verificacao: Cada resposta mostra a fonte usada e perguntas sem base recebem recusa educada e transferência.
    depende:
      - prep.conjunto_de_avaliacao
      - prep.pontuar_opcoes_matriz
  - id: exec.protecoes_e_acesso_minimo
    titulo: Aplicar proteções e acesso mínimo às ações
    descricao: Filtrar entradas e saídas, separar instruções de dados e limitar cada ação do bot às permissões mínimas, com aprovação humana nas irreversíveis.
    verificacao: Entradas maliciosas do conjunto de testes não vazam dados nem executam ações fora do escopo.
    depende:
      - exec.respostas_com_fonte
  - id: val.avaliar_e_revisar_conversas
    titulo: Avaliar o conjunto e revisar conversas reais
    descricao: Rodar o conjunto de avaliação, medir as metas e revisar por pessoas uma amostra de conversas de teste.
    verificacao: As metas do conjunto de avaliação foram atingidas e uma amostra de conversas foi revisada por uma pessoa.
    depende:
      - exec.protecoes_e_acesso_minimo
  - id: ent.lancar_gradualmente
    titulo: Lançar para parte do tráfego com opção de falar com uma pessoa
    descricao: Liberar o bot para uma parcela dos atendimentos, com o botão de falar com uma pessoa em toda conversa.
    verificacao: O botão de falar com uma pessoa está visível em toda conversa e funciona no horário de cobertura.
    depende:
      - val.avaliar_e_revisar_conversas
  - id: ops.monitorar_e_melhorar
    titulo: Monitorar conversas e atualizar a base
    descricao: Acompanhar resolução, transferências e satisfação e transformar as lacunas encontradas em artigos novos.
    verificacao: O painel mostra resolução, transferências e satisfação, e as lacunas viram artigos novos a cada ciclo.
    depende:
      - ent.lancar_gradualmente
comoFazerHoje: []
checklistRefs: {}
armadilhas:
  - Lançar sem conjunto de avaliação, o que impede saber se o bot melhora ou piora.
  - Responder além do que a base sustenta, o que gera informações inventadas para o cliente.
  - Esconder a opção de falar com uma pessoa, o que frustra o cliente em temas sensíveis.
  - Dar ao bot permissões amplas nos sistemas, o que amplia o dano de um erro ou de um abuso.
validacao:
  - As metas do conjunto de avaliação de resolução, transferência e satisfação foram atingidas.
  - Cada resposta cita a fonte e perguntas sem base recebem recusa e transferência.
  - Entradas maliciosas do conjunto de testes não vazam dados nem executam ações fora do escopo.
  - O botão de falar com uma pessoa está visível em toda conversa e funciona no horário de cobertura.
  - O painel acompanha resolução, transferências e satisfação e alimenta a atualização da base.
padroes:
  - "[[rag|RAG (padrão)]]"
  - "[[human_in_the_loop|Human-in-the-Loop]]"
  - "[[guardrails_llm|Guardrails]]"
  - "[[tool_use|Tool Use (padrão)]]"
  - "[[routing_llm|Routing]]"
categorias:
  - "[[suporte_atendimento|Suporte e atendimento]]"
  - "[[rag_categoria|Ferramentas de RAG]]"
  - "[[framework_agentes|Framework de agentes]]"
  - "[[guardrails_seguranca_llm|Guardrails e segurança de LLM]]"
  - "[[evals_observabilidade|Evals e observabilidade]]"
  - "[[vector_store|Vector store]]"
aliases:
  - Criar um bot de atendimento
  - Criar um chatbot de suporte
grupo: Construir software
stacks:
  - "[[agente_ferramentas_memoria|Agente com ferramentas e memória]]"
  - "[[app_rag_producao|App RAG de produção]]"
ferramentas:
  - "[[zendesk|Zendesk]]"
  - "[[freshdesk|Freshdesk]]"
  - tabela:intercom
casosDeUso:
  - "[[atendimento_e_suporte|Atendimento e suporte]]"
  - "[[construcao_de_agentes|Construção de agentes]]"
variacoes:
  - suporte-chatbot-rag
  - suporte-central-tickets
  - agente-suporte-cliente
certificacoes:
  - "[[microsoft_azure_ai_apps_and_agents_developer_associate_ai_103|Microsoft Azure AI Apps and Agents Developer Associate (AI-103)]]"
dataVerificacao: 2026-11-23
tags:
  - guia-pratico
---
# Como criar um bot de atendimento
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
