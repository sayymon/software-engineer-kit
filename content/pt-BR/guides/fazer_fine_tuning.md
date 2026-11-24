---
id: fazer_fine_tuning
tipo: guia-pratico
nome: Como fazer fine-tuning de um modelo
sigla: fin
descricao: "Caminho para ajustar um modelo a uma tarefa: confirmar que prompt e recuperação não bastam, preparar e separar os dados, escolher entre o ajuste gerenciado do provedor e o treino próprio, e entregar com avaliação contra a linha de base, registro do modelo e plano de atualização."
exemplo: "Uma equipe de suporte precisa classificar chamados em um formato rígido: o prompt oscila, então ela ajusta um modelo pequeno com exemplos revisados, compara com a linha de base e o publica em um registro de modelos."
quando_usar:
  - O comportamento desejado é estável, repetido e difícil de obter só com instruções, como formato, tom ou classificação específica.
  - Um modelo menor ajustado pode substituir um maior e reduzir custo e latência em volume alto.
quando_evitar:
  - Quando o problema é falta de conhecimento atualizado, que a recuperação resolve, ou quando poucas instruções e exemplos no prompt já bastam.
fonte_ids:
  - arxiv_lora
  - anthropic_define_success_evals
fontes:
  - id: arxiv_lora
    tipo: artigo
    titulo: "LoRA: Low-Rank Adaptation of Large Language Models (Hu et al.)"
    link: https://arxiv.org/abs/2106.09685
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: anthropic_define_success_evals
    tipo: artigo
    titulo: Define success criteria and build evaluations (Claude Platform Docs)
    link: https://platform.claude.com/docs/en/test-and-evaluate/develop-tests
    status_revisao: revisada
    proxima_revisao: 2027-11-23
status: rascunho
publico: false
raias:
  - id: fin_orq
    nome: Orquestração do ajuste
    responsabilidade: Encadear contexto, abordagem, stack e entrega até o desfecho.
    cor: "#607D8B"
    orquestradora: true
  - id: fin_ctx
    nome: Contexto e requisitos
    responsabilidade: Entender a necessidade e fixar escopo e critérios antes de escolher tecnologia.
    cor: "#0072B2"
    orquestradora: false
  - id: fin_abd
    nome: Abordagem de entrega
    responsabilidade: Decidir entre assinar, comprar ou construir a partir das premissas.
    cor: "#E69F00"
    orquestradora: false
  - id: fin_stk
    nome: Stack por contexto
    responsabilidade: Escolher o arquétipo de stack ou o caminho de construção por contexto.
    cor: "#009E73"
    orquestradora: false
  - id: fin_ent
    nome: Implementação e entrega
    responsabilidade: Implementar, validar, publicar e operar na abordagem escolhida.
    cor: "#56B4E9"
    orquestradora: false
nos:
  - id: fin_orq_s0
    raia: fin_orq
    tipo: inicio
    rotulo: Necessidade de ajustar um modelo a uma tarefa
    proximo:
      - para: fin_orq_c1
        condicao: ""
  - id: fin_orq_c1
    raia: fin_orq
    tipo: chamada
    rotulo: Definir a tarefa, a métrica e a linha de base
    proximo:
      - para: fin_orq_c2
        condicao: tarefa_definida
    raia_chamada: fin_ctx
  - id: fin_orq_c2
    raia: fin_orq
    tipo: chamada
    rotulo: Escolher a abordagem de ajuste
    proximo:
      - para: fin_orq_c3
        condicao: construir
      - para: fin_orq_c6
        condicao: assinar_gerenciado
    raia_chamada: fin_abd
  - id: fin_orq_c3
    raia: fin_orq
    tipo: chamada
    rotulo: Escolher onde o modelo será servido
    proximo:
      - para: fin_orq_c5
        condicao: inferencia_propria
      - para: fin_orq_c4
        condicao: treino_e_registro
    raia_chamada: fin_stk
  - id: fin_orq_c4
    raia: fin_orq
    tipo: chamada
    rotulo: Treinar, avaliar e publicar o modelo
    proximo:
      - para: fin_orq_e1
        condicao: pronta
    raia_chamada: fin_ent
  - id: fin_orq_c5
    raia: fin_orq
    tipo: chamada
    rotulo: Treinar, avaliar e publicar o modelo
    proximo:
      - para: fin_orq_e2
        condicao: pronta
    raia_chamada: fin_ent
  - id: fin_orq_c6
    raia: fin_orq
    tipo: chamada
    rotulo: Treinar, avaliar e publicar o modelo
    proximo:
      - para: fin_orq_e3
        condicao: pronta
    raia_chamada: fin_ent
  - id: fin_orq_e1
    raia: fin_orq
    tipo: fim
    rotulo: Modelo ajustado sobre a stack de treino e ajuste
    proximo: []
    retorno: treino_e_registro
    saida:
      tipo: stack
      justificativa: Ajustar com adaptadores leves sobre um modelo aberto, com experimentos rastreados e registro de modelos, entrega o resultado com custo de treino baixo e controle dos pesos.
      eixos:
        - orcamento
        - time_maturidade
        - lock_in
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
      stack: "[[treino_finetuning_modelo|Treino e fine-tuning de modelo]]"
  - id: fin_orq_e2
    raia: fin_orq
    tipo: fim
    rotulo: Modelo ajustado servido sobre a stack de inferência auto-hospedada
    proximo: []
    retorno: inferencia_propria
    saida:
      tipo: stack
      justificativa: Quando o volume é alto ou os dados precisam ficar na infraestrutura própria, servir o modelo ajustado em casa oferece latência previsível e custo por requisição controlado.
      eixos:
        - escala_volume
        - compliance_dados
        - latencia
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
  - id: fin_orq_e3
    raia: fin_orq
    tipo: fim
    rotulo: Modelo ajustado em um serviço gerenciado do provedor
    proximo: []
    retorno: assinar_gerenciado
    saida:
      tipo: assinar
      justificativa: Para validar o ganho do ajuste sem montar infraestrutura de treino, o serviço gerenciado entrega treino, registro e hospedagem em dias, com a avaliação separada como critério de decisão.
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
      categoria: "[[ml_framework|Framework de ML]]"
      ferramentas:
        - tabela:aws-sagemaker
        - tabela:google-vertex-ai
        - "[[hugging_face|Hugging Face]]"
  - id: fin_ctx_s0
    raia: fin_ctx
    tipo: inicio
    rotulo: Início do levantamento
    proximo:
      - para: fin_ctx_t1
        condicao: ""
  - id: fin_ctx_t1
    raia: fin_ctx
    tipo: tarefa
    rotulo: Definir tarefa, métrica e linha de base
    proximo:
      - para: fin_ctx_t2
        condicao: ""
    passos:
      - ctx.tarefa_e_metrica
      - ctx.testar_alternativas_sem_ajuste
  - id: fin_ctx_t2
    raia: fin_ctx
    tipo: tarefa
    rotulo: Preparar os dados
    proximo:
      - para: fin_ctx_e1
        condicao: ""
    passos:
      - prep.dados_de_treino_e_avaliacao
  - id: fin_ctx_e1
    raia: fin_ctx
    tipo: fim
    rotulo: Tarefa, métrica e linha de base acordadas
    proximo: []
    retorno: tarefa_definida
  - id: fin_abd_s0
    raia: fin_abd
    tipo: inicio
    rotulo: Início da escolha
    proximo:
      - para: fin_abd_t1
        condicao: ""
  - id: fin_abd_t1
    raia: fin_abd
    tipo: tarefa
    rotulo: Registrar premissas e pontuar as opções
    proximo:
      - para: fin_abd_g1
        condicao: ""
    passos:
      - ctx.premissas_nao_funcionais
      - prep.pontuar_opcoes_matriz
  - id: fin_abd_g1
    raia: fin_abd
    tipo: bifurcacao
    rotulo: Dados presos à infraestrutura própria?
    proximo:
      - para: fin_abd_e1
        condicao: sim
      - para: fin_abd_g2
        condicao: não
    eixo: compliance_dados
    pergunta: q.dados_nao_saem_da_infraestrutura
  - id: fin_abd_g2
    raia: fin_abd
    tipo: bifurcacao
    rotulo: Ajuste gerenciado atende?
    proximo:
      - para: fin_abd_e2
        condicao: sim
      - para: fin_abd_e1
        condicao: não
    eixo: prazo_entrega
    pergunta: q.ajuste_gerenciado_do_provedor_atende
  - id: fin_abd_e1
    raia: fin_abd
    tipo: fim
    rotulo: Treinar com a própria infraestrutura
    proximo: []
    retorno: construir
  - id: fin_abd_e2
    raia: fin_abd
    tipo: fim
    rotulo: Ajuste gerenciado do provedor
    proximo: []
    retorno: assinar_gerenciado
  - id: fin_stk_s0
    raia: fin_stk
    tipo: inicio
    rotulo: Início da escolha da stack
    proximo:
      - para: fin_stk_g1
        condicao: ""
  - id: fin_stk_g1
    raia: fin_stk
    tipo: bifurcacao
    rotulo: Servir na infraestrutura própria?
    proximo:
      - para: fin_stk_e1
        condicao: sim
      - para: fin_stk_e2
        condicao: não
    eixo: escala_volume
    pergunta: q.servir_na_infraestrutura_propria
  - id: fin_stk_e1
    raia: fin_stk
    tipo: fim
    rotulo: Stack de inferência de LLM auto-hospedada
    proximo: []
    retorno: inferencia_propria
  - id: fin_stk_e2
    raia: fin_stk
    tipo: fim
    rotulo: Stack de treino e ajuste de modelo
    proximo: []
    retorno: treino_e_registro
  - id: fin_ent_s0
    raia: fin_ent
    tipo: inicio
    rotulo: Início da entrega
    proximo:
      - para: fin_ent_t1
        condicao: ""
  - id: fin_ent_t1
    raia: fin_ent
    tipo: tarefa
    rotulo: Treinar e iterar
    proximo:
      - para: fin_ent_t2
        condicao: ""
    passos:
      - exec.treinar_com_experimentos_rastreados
  - id: fin_ent_t2
    raia: fin_ent
    tipo: tarefa
    rotulo: Avaliar contra a linha de base
    proximo:
      - para: fin_ent_t3
        condicao: ""
    passos:
      - val.comparar_com_linha_de_base
  - id: fin_ent_t3
    raia: fin_ent
    tipo: tarefa
    rotulo: Publicar e manter
    proximo:
      - para: fin_ent_e1
        condicao: ""
    passos:
      - ent.publicar_no_registro_e_servir
      - ops.monitorar_deriva_e_reajustar
  - id: fin_ent_e1
    raia: fin_ent
    tipo: fim
    rotulo: Modelo ajustado publicado e acompanhado
    proximo: []
    retorno: pronta
perguntasDecisao:
  - id: q.dados_nao_saem_da_infraestrutura
    pergunta: Os dados de treino não podem sair da infraestrutura própria ou exigem controle total do modelo resultante?
    eixo: compliance_dados
  - id: q.ajuste_gerenciado_do_provedor_atende
    pergunta: O provedor do modelo em uso oferece ajuste gerenciado que atende à tarefa com o volume de exemplos disponível?
    eixo: prazo_entrega
  - id: q.servir_na_infraestrutura_propria
    pergunta: O modelo ajustado precisa ser servido na infraestrutura própria, por privacidade, latência ou custo em volume alto?
    eixo: escala_volume
objetivo: Obter um modelo ajustado que supera a linha de base em um conjunto de avaliação separado, com dados rastreáveis e plano de atualização, na abordagem (gerenciada ou própria) que atende ao prazo, aos dados e ao custo.
preRequisitos:
  - Tarefa definida com métrica de sucesso e a linha de base atual (prompt ou modelo em uso).
  - Exemplos de entrada e saída revisados por pessoas, com direito de uso confirmado.
  - Conjunto de avaliação separado dos dados de treino.
  - Premissas de volume, dados sensíveis, prazo e orçamento.
passos:
  - id: ctx.tarefa_e_metrica
    titulo: Definir a tarefa, a métrica e a linha de base
    descricao: Descrever a tarefa, escolher a métrica de sucesso e medir o resultado atual com prompt e recuperação como linha de base.
    verificacao: A métrica, a meta e o resultado da linha de base estão registrados em um conjunto de avaliação.
    depende: []
  - id: ctx.testar_alternativas_sem_ajuste
    titulo: Esgotar as alternativas mais simples antes de ajustar
    descricao: Testar instruções melhores, exemplos no prompt, recuperação e um modelo maior, registrando o ganho de cada alternativa.
    verificacao: Cada alternativa tem resultado medido e a justificativa de que o ajuste ainda é necessário está escrita.
    depende:
      - ctx.tarefa_e_metrica
  - id: ctx.premissas_nao_funcionais
    titulo: Registrar premissas não funcionais
    descricao: Anotar volume esperado, latência aceitável, dados sensíveis, prazo e orçamento, que alimentam as perguntas de decisão.
    verificacao: Cada um dos 7 eixos de adoção tem uma resposta escrita ou a nota de que não se aplica.
    depende:
      - ctx.testar_alternativas_sem_ajuste
  - id: prep.pontuar_opcoes_matriz
    titulo: Pontuar construir, comprar e assinar
    descricao: Dar nota de 1 a 5 às três opções nos cinco critérios da matriz e registrar o objetivo que pesa mais.
    verificacao: A matriz tem as 15 notas preenchidas e a opção vencedora tem a justificativa registrada.
    depende:
      - ctx.premissas_nao_funcionais
  - id: prep.dados_de_treino_e_avaliacao
    titulo: Preparar, limpar e separar os dados
    descricao: Reunir exemplos revisados, remover duplicatas e dados pessoais, confirmar o direito de uso e separar treino, validação e avaliação final.
    verificacao: Os conjuntos estão separados sem sobreposição, sem dados pessoais indevidos e com a origem de cada exemplo registrada.
    depende:
      - ctx.testar_alternativas_sem_ajuste
  - id: exec.treinar_com_experimentos_rastreados
    titulo: Treinar com experimentos rastreados
    descricao: Treinar com uma configuração inicial simples, registrar dados, parâmetros e métricas de cada execução e iterar sobre os erros.
    verificacao: Cada execução tem dados, parâmetros e métricas registrados e é possível reproduzir a melhor delas.
    depende:
      - prep.dados_de_treino_e_avaliacao
      - prep.pontuar_opcoes_matriz
  - id: val.comparar_com_linha_de_base
    titulo: Comparar com a linha de base e procurar regressões
    descricao: Medir o modelo ajustado no conjunto final contra a linha de base, e testar capacidades gerais e segurança para detectar regressões.
    verificacao: O modelo supera a linha de base na métrica da tarefa e não regride nos testes gerais e de segurança.
    depende:
      - exec.treinar_com_experimentos_rastreados
  - id: ent.publicar_no_registro_e_servir
    titulo: Publicar no registro e servir com versão
    descricao: Registrar o modelo com versão, dados de origem e métricas, e servi-lo com possibilidade de voltar à versão anterior.
    verificacao: O registro traz versão, origem dos dados e métricas, e a volta para a versão anterior foi testada.
    depende:
      - val.comparar_com_linha_de_base
  - id: ops.monitorar_deriva_e_reajustar
    titulo: Monitorar a deriva e planejar o reajuste
    descricao: Acompanhar a qualidade em produção, coletar novos exemplos revisados e definir o gatilho para um novo ajuste.
    verificacao: O painel mostra a qualidade em produção e existe um critério escrito para disparar o reajuste.
    depende:
      - ent.publicar_no_registro_e_servir
comoFazerHoje: []
checklistRefs: {}
armadilhas:
  - Ajustar antes de esgotar instruções, exemplos e recuperação, o que gasta esforço em um problema mais simples.
  - Deixar exemplos do conjunto de avaliação entrarem no treino, o que infla a métrica e esconde a falta de ganho real.
  - Treinar com dados sem direito de uso ou com dados pessoais, o que cria risco legal e vazamento no modelo.
  - Avaliar só a tarefa ajustada, o que deixa passar regressões em capacidades gerais e na segurança.
validacao:
  - O modelo supera a linha de base no conjunto de avaliação final, separado dos dados de treino.
  - Não há regressão nos testes de capacidades gerais e de segurança.
  - Cada exemplo de treino tem origem registrada e direito de uso confirmado.
  - O registro traz versão, dados de origem e métricas, e a volta para a versão anterior foi testada.
  - Existe um critério escrito e um painel para decidir o próximo reajuste.
padroes:
  - "[[model_cascade|Model Cascade]]"
  - "[[llm_as_judge|LLM-as-Judge]]"
  - "[[structured_output|Structured Output]]"
  - "[[human_in_the_loop|Human-in-the-Loop]]"
  - "[[routing_llm|Routing]]"
categorias:
  - "[[ml_framework|Framework de ML]]"
  - "[[frameworks_ml|Frameworks de ML e deep learning]]"
  - "[[repositorio_modelos|Repositório de modelos]]"
  - "[[inferencia_local|Inferência local]]"
  - "[[evals_observabilidade|Evals e observabilidade]]"
  - "[[modelo_fundacional|Modelo fundacional]]"
aliases:
  - Fazer fine-tuning
  - Ajustar um modelo de linguagem
grupo: IA aplicada
stacks:
  - "[[treino_finetuning_modelo|Treino e fine-tuning de modelo]]"
  - "[[inferencia_llm_autohospedada|Inferência de LLM auto-hospedada]]"
ferramentas:
  - tabela:aws-sagemaker
  - tabela:google-vertex-ai
  - "[[hugging_face|Hugging Face]]"
casosDeUso:
  - "[[modelos_de_decisao_e_fine_tuning|Modelos de decisão e fine-tuning]]"
  - "[[inferencia_privada_local|Inferência privada local]]"
variacoes:
  - decisao-fine-tuning
  - decisao-self-hosted
  - local-servidor-equipe
certificacoes:
  - "[[google_professional_machine_learning_engineer|Google Professional Machine Learning Engineer]]"
  - "[[aws_certified_machine_learning_engineer_associate|AWS Certified Machine Learning Engineer Associate]]"
dataVerificacao: 2026-11-23
tags:
  - guia-pratico
---
# Como fazer fine-tuning de um modelo
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
