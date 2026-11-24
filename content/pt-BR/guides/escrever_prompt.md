---
id: escrever_prompt
tipo: guia-pratico
nome: Como escrever um bom prompt
sigla: prm
descricao: "Caminho para escrever um prompt que produz resultado confiável: fixar objetivo e critério de sucesso, montar o conjunto de teste, escrever a instrução com contexto, papel e exemplos, escolher a técnica de raciocínio e de formato conforme a tarefa, proteger contra injeção de prompt e iterar com avaliação. Complementa o guia Como avaliar um modelo ou prompt (evals)."
exemplo: "Um time quer classificar pedidos de suporte em categorias: define as categorias e a meta de acerto, reúne exemplos reais com a resposta esperada, escreve a instrução com dois exemplos e saída em formato fixo, mede em um conjunto de teste e só libera quando a meta é atingida."
quando_usar:
  - Uma tarefa de linguagem natural precisa de resultado repetível e a primeira tentativa do prompt não atinge o critério de sucesso.
  - Um prompt vai para produção e precisa de versão, teste e proteção contra entradas hostis.
quando_evitar:
  - "Quando o problema é de dados, de ferramenta ou de modelo: troque o modelo, melhore o contexto recuperado ou use um fluxo fixo antes de insistir em ajustes de texto."
fonte_ids:
  - anthropic_prompt_engineering_overview
  - openai_prompt_engineering_guide
  - gemini_prompting_strategies
  - anthropic_define_success_evals
  - owasp_llm_top10
fontes:
  - id: anthropic_prompt_engineering_overview
    tipo: artigo
    titulo: Prompt engineering overview (Claude Platform Docs)
    link: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: openai_prompt_engineering_guide
    tipo: artigo
    titulo: Prompt engineering (OpenAI API Docs)
    link: https://developers.openai.com/api/docs/guides/prompt-engineering
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: gemini_prompting_strategies
    tipo: artigo
    titulo: Prompt design strategies (Gemini API Docs)
    link: https://aistudio.google.com/docs/prompting-strategies
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: anthropic_define_success_evals
    tipo: artigo
    titulo: Define success criteria and build evaluations (Claude Platform Docs)
    link: https://platform.claude.com/docs/en/test-and-evaluate/develop-tests
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
  - id: prm_orq
    nome: Orquestração do prompt
    responsabilidade: Encadear contexto, escolha da técnica e escrita até o desfecho.
    cor: "#607D8B"
    orquestradora: true
  - id: prm_ctx
    nome: Contexto e requisitos
    responsabilidade: Entender a necessidade e fixar escopo e critérios antes de escolher tecnologia.
    cor: "#0072B2"
    orquestradora: false
  - id: prm_stk
    nome: Stack por contexto
    responsabilidade: Escolher o arquétipo de stack ou o caminho de construção por contexto.
    cor: "#E69F00"
    orquestradora: false
  - id: prm_ent
    nome: Implementação e entrega
    responsabilidade: Implementar, validar, publicar e operar na abordagem escolhida.
    cor: "#009E73"
    orquestradora: false
nos:
  - id: prm_orq_s0
    raia: prm_orq
    tipo: inicio
    rotulo: Necessidade de um prompt confiável para uma tarefa
    proximo:
      - para: prm_orq_c1
        condicao: ""
  - id: prm_orq_c1
    raia: prm_orq
    tipo: chamada
    rotulo: Definir objetivo, critério de sucesso e conjunto de teste
    proximo:
      - para: prm_orq_c2
        condicao: objetivo_definido
    raia_chamada: prm_ctx
  - id: prm_orq_c2
    raia: prm_orq
    tipo: chamada
    rotulo: Escolher a técnica por tipo de tarefa
    proximo:
      - para: prm_orq_c6
        condicao: dados_nao_confiaveis
      - para: prm_orq_c5
        condicao: raciocinio_multietapa
      - para: prm_orq_c4
        condicao: saida_estruturada
      - para: prm_orq_c3
        condicao: instrucao_direta
    raia_chamada: prm_stk
  - id: prm_orq_c3
    raia: prm_orq
    tipo: chamada
    rotulo: Escrever, proteger, avaliar e liberar o prompt
    proximo:
      - para: prm_orq_e1
        condicao: pronta
    raia_chamada: prm_ent
  - id: prm_orq_c4
    raia: prm_orq
    tipo: chamada
    rotulo: Escrever, proteger, avaliar e liberar o prompt
    proximo:
      - para: prm_orq_e2
        condicao: pronta
    raia_chamada: prm_ent
  - id: prm_orq_c5
    raia: prm_orq
    tipo: chamada
    rotulo: Escrever, proteger, avaliar e liberar o prompt
    proximo:
      - para: prm_orq_e3
        condicao: pronta
    raia_chamada: prm_ent
  - id: prm_orq_c6
    raia: prm_orq
    tipo: chamada
    rotulo: Escrever, proteger, avaliar e liberar o prompt
    proximo:
      - para: prm_orq_e4
        condicao: pronta
    raia_chamada: prm_ent
  - id: prm_orq_e1
    raia: prm_orq
    tipo: fim
    rotulo: Prompt com instrução direta e poucos exemplos
    proximo: []
    retorno: instrucao_direta
    saida:
      tipo: construir
      justificativa: Uma tarefa simples e de baixo risco se resolve com instrução clara, contexto mínimo e dois ou três exemplos, e um teste automatizado com um conjunto pequeno protege contra regressões a cada ajuste do texto.
      eixos:
        - latencia
        - orcamento
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
      categoria: "[[prompts_agentes_repos|Prompts e agentes]]"
      ferramentas:
        - "[[promptfoo|Promptfoo]]"
  - id: prm_orq_e2
    raia: prm_orq
    tipo: fim
    rotulo: Prompt com saída estruturada validada
    proximo: []
    retorno: saida_estruturada
    saida:
      tipo: construir
      justificativa: Quando o resultado alimenta código em volume, a saída em esquema fixo com validação e nova tentativa em caso de falha elimina a revisão manual, e o registro das execuções mostra onde o formato quebra.
      eixos:
        - escala_volume
        - prazo_entrega
        - time_maturidade
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
      categoria: "[[prompts_agentes_repos|Prompts e agentes]]"
      ferramentas:
        - "[[promptfoo|Promptfoo]]"
        - "[[langfuse|LangFuse]]"
  - id: prm_orq_e3
    raia: prm_orq
    tipo: fim
    rotulo: Modelo de raciocínio contratado por API para tarefas em várias etapas
    proximo: []
    retorno: raciocinio_multietapa
    saida:
      tipo: comprar
      justificativa: Tarefas de raciocínio em várias etapas se beneficiam de modelos com raciocínio nativo, escolhidos pelas funcionalidades e pelos benchmarks do kit, e o texto do prompt passa a descrever objetivo e restrições em vez de ensinar cada passo.
      eixos:
        - prazo_entrega
        - orcamento
        - lock_in
      objetivo: diferenciar_produto
      notas:
        construir:
          diferenciacao: 3
          tempo_ate_valor: 2
          custo_total: 3
          dependencia_fornecedor: 3
          risco: 3
        comprar:
          diferenciacao: 4
          tempo_ate_valor: 4
          custo_total: 3
          dependencia_fornecedor: 4
          risco: 4
        assinar:
          diferenciacao: 3
          tempo_ate_valor: 4
          custo_total: 3
          dependencia_fornecedor: 2
          risco: 3
      categoria: "[[modelo_fundacional|Modelo fundacional]]"
      ferramentas:
        - "[[glm_5_3_flash|GLM-5.3-Flash]]"
        - "[[gemini_3_1_pro|Gemini 3.1 Pro]]"
        - "[[claude_opus_5_5|Claude Opus 5.5]]"
      perfil:
        funcao: raciocinio
        dados_sensiveis: false
        orcamento: alto
        contexto_min: 0
        latencia: normal
        acesso: api
      evidencias:
        - "criterio: 16 de 60 modelos do kit atendem ao perfil (funcao raciocinio, orcamento alto, dados sensiveis nao, contexto minimo 0, latencia normal); benchmark principal: Humanity's Last Exam"
        - "[[glm_5_3_flash|GLM-5.3-Flash]] (mais barato): precoEntradaUSD=0.15; precoSaidaUSD=0.5; contextoTokens=1000000; licenca=não verificado; disponibilidade=api+pesos-abertos; modalidadesEntrada=texto+imagem; funcionalidade exigida=Raciocínio (presente); benchmark Humanity's Last Exam=não verificado; fontePreco=https://docs.z.ai/guides/overview/pricing; dataVerificacao=2026-11-20"
        - "[[gemini_3_1_pro|Gemini 3.1 Pro]] (custo-beneficio): precoEntradaUSD=2; precoSaidaUSD=12; contextoTokens=1048576; licenca=Proprietária; disponibilidade=api+assinatura; modalidadesEntrada=texto+imagem+audio+video+pdf; funcionalidade exigida=Raciocínio (presente); benchmark Humanity's Last Exam=51.4 % (com busca e código) (fonte https://deepmind.google/models/model-cards/gemini-3-1-pro/, 2026-11-22); benchmark GPQA Diamond=94.3 % (sem ferramentas) (fonte https://deepmind.google/models/model-cards/gemini-3-1-pro/, 2026-11-22); benchmark ARC-AGI-2=77.1 % (ARC Prize Verified) (fonte https://deepmind.google/models/model-cards/gemini-3-1-pro/, 2026-11-22); benchmark FrontierMath=36.9 % (Tier 1 a 3) (fonte https://openai.com/index/introducing-gpt-5-5/, 2026-11-22); fontePreco=https://ai.google.dev/gemini-api/docs/pricing; dataVerificacao=2026-11-20"
        - "[[claude_opus_5_5|Claude Opus 5.5]] (qualidade maxima): precoEntradaUSD=4; precoSaidaUSD=20; contextoTokens=1000000; licenca=Proprietária; disponibilidade=api+assinatura; modalidadesEntrada=texto+imagem; funcionalidade exigida=Raciocínio (presente); benchmark Humanity's Last Exam=67.7 % (com ferramentas) (fonte https://www.anthropic.com/news/claude-opus-5-5, 2026-11-22); fontePreco=https://platform.claude.com/docs/en/about-claude/pricing; dataVerificacao=2026-11-20"
        - "lacuna: [[glm_5_3_flash|GLM-5.3-Flash]]: benchmark Humanity's Last Exam não verificado"
  - id: prm_orq_e4
    raia: prm_orq
    tipo: fim
    rotulo: Prompt com separação de dados, guardas e testes adversariais
    proximo: []
    retorno: dados_nao_confiaveis
    saida:
      tipo: construir
      justificativa: Texto de terceiros pode conter instruções, então o prompt separa instrução de dado com delimitadores, limita as ferramentas disponíveis, valida a saída com guardas e inclui casos de ataque no conjunto de testes.
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
      categoria: "[[guardrails_seguranca_llm|Guardrails e segurança de LLM]]"
      ferramentas:
        - "[[amazon_bedrock_guardrails|Amazon Bedrock Guardrails]]"
        - "[[promptfoo|Promptfoo]]"
  - id: prm_ctx_s0
    raia: prm_ctx
    tipo: inicio
    rotulo: Início do levantamento
    proximo:
      - para: prm_ctx_t1
        condicao: ""
  - id: prm_ctx_t1
    raia: prm_ctx
    tipo: tarefa
    rotulo: Definir objetivo e premissas
    proximo:
      - para: prm_ctx_t2
        condicao: ""
    passos:
      - ctx.objetivo_e_criterio_de_sucesso
      - ctx.premissas_nao_funcionais
  - id: prm_ctx_t2
    raia: prm_ctx
    tipo: tarefa
    rotulo: Montar o conjunto de teste
    proximo:
      - para: prm_ctx_e1
        condicao: ""
    passos:
      - prep.conjunto_de_teste
  - id: prm_ctx_e1
    raia: prm_ctx
    tipo: fim
    rotulo: Objetivo, critério e testes acordados
    proximo: []
    retorno: objetivo_definido
  - id: prm_stk_s0
    raia: prm_stk
    tipo: inicio
    rotulo: Início da escolha da técnica
    proximo:
      - para: prm_stk_g1
        condicao: ""
  - id: prm_stk_g1
    raia: prm_stk
    tipo: bifurcacao
    rotulo: Dados externos não confiáveis?
    proximo:
      - para: prm_stk_e1
        condicao: sim
      - para: prm_stk_g2
        condicao: não
    eixo: compliance_dados
    pergunta: q.dados_externos_nao_confiaveis
  - id: prm_stk_g2
    raia: prm_stk
    tipo: bifurcacao
    rotulo: Raciocínio em várias etapas?
    proximo:
      - para: prm_stk_e2
        condicao: sim
      - para: prm_stk_g3
        condicao: não
    eixo: contexto
    pergunta: q.raciocinio_em_varias_etapas
  - id: prm_stk_g3
    raia: prm_stk
    tipo: bifurcacao
    rotulo: Formato rígido em alto volume?
    proximo:
      - para: prm_stk_e3
        condicao: sim
      - para: prm_stk_e4
        condicao: não
    eixo: escala_volume
    pergunta: q.formato_rigido_em_alto_volume
  - id: prm_stk_e1
    raia: prm_stk
    tipo: fim
    rotulo: Técnica para dados não confiáveis
    proximo: []
    retorno: dados_nao_confiaveis
  - id: prm_stk_e2
    raia: prm_stk
    tipo: fim
    rotulo: Técnica de raciocínio em várias etapas
    proximo: []
    retorno: raciocinio_multietapa
  - id: prm_stk_e3
    raia: prm_stk
    tipo: fim
    rotulo: Técnica de saída estruturada
    proximo: []
    retorno: saida_estruturada
  - id: prm_stk_e4
    raia: prm_stk
    tipo: fim
    rotulo: Instrução direta com exemplos
    proximo: []
    retorno: instrucao_direta
  - id: prm_ent_s0
    raia: prm_ent
    tipo: inicio
    rotulo: Início da escrita
    proximo:
      - para: prm_ent_t1
        condicao: ""
  - id: prm_ent_t1
    raia: prm_ent
    tipo: tarefa
    rotulo: Escrever o prompt em camadas
    proximo:
      - para: prm_ent_t2
        condicao: ""
    passos:
      - exec.instrucao_clara_e_objetivo
      - exec.contexto_e_restricoes
      - exec.papel_e_prompt_de_sistema
      - exec.exemplos_few_shot
  - id: prm_ent_t2
    raia: prm_ent
    tipo: tarefa
    rotulo: Controlar formato e raciocínio
    proximo:
      - para: prm_ent_t3
        condicao: ""
    passos:
      - exec.saida_estruturada
      - exec.raciocinio_passo_a_passo_ou_modelo_de_raciocinio
      - exec.decomposicao_e_encadeamento
  - id: prm_ent_t3
    raia: prm_ent
    tipo: tarefa
    rotulo: Proteger, avaliar e liberar
    proximo:
      - para: prm_ent_t4
        condicao: ""
    passos:
      - exec.defesa_contra_injecao_de_prompt
      - val.avaliar_e_iterar
      - ent.versionar_e_liberar_o_prompt
  - id: prm_ent_t4
    raia: prm_ent
    tipo: tarefa
    rotulo: Operar
    proximo:
      - para: prm_ent_e1
        condicao: ""
    passos:
      - ops.monitorar_regressoes
  - id: prm_ent_e1
    raia: prm_ent
    tipo: fim
    rotulo: Prompt avaliado e liberado
    proximo: []
    retorno: pronta
perguntasDecisao:
  - id: q.dados_externos_nao_confiaveis
    pergunta: O prompt processa texto vindo de fora, como e-mails, páginas ou documentos de terceiros, que podem conter instruções?
    eixo: compliance_dados
  - id: q.raciocinio_em_varias_etapas
    pergunta: A tarefa exige várias etapas de raciocínio, como cálculo, planejamento ou dedução, em que um erro no meio contamina o resultado?
    eixo: contexto
  - id: q.formato_rigido_em_alto_volume
    pergunta: O resultado alimenta código ou outro sistema que exige formato fixo, em volume que impede revisão manual de cada resposta?
    eixo: escala_volume
objetivo: Ter um prompt versionado que atinge a meta de qualidade em um conjunto de teste, com a técnica de raciocínio e de formato adequadas à tarefa e protegido contra instruções maliciosas nos dados.
preRequisitos:
  - Uma tarefa concreta com entrada, saída esperada e critério de sucesso mensurável.
  - Exemplos reais e anonimizados da tarefa, com a resposta correta definida por uma pessoa.
  - Acesso a um modelo e a um local para guardar versões do prompt e os resultados dos testes.
  - Premissas de volume, dados sensíveis, latência e orçamento.
passos:
  - id: ctx.objetivo_e_criterio_de_sucesso
    titulo: Definir o objetivo e o critério de sucesso
    descricao: Escrever em uma frase o que o prompt deve produzir, para quem, e como medir o acerto, com a meta numérica e o que conta como erro grave.
    verificacao: O objetivo, a métrica e a meta estão escritos e foram aceitos pelo dono da tarefa.
    depende: []
  - id: ctx.premissas_nao_funcionais
    titulo: Registrar premissas não funcionais
    descricao: Anotar volume esperado, latência aceitável, dados sensíveis, prazo e orçamento, que alimentam as perguntas de decisão.
    verificacao: Cada um dos 7 eixos de adoção tem uma resposta escrita ou a nota de que não se aplica.
    depende:
      - ctx.objetivo_e_criterio_de_sucesso
  - id: prep.conjunto_de_teste
    titulo: Montar o conjunto de teste antes de escrever o prompt
    descricao: Reunir exemplos reais anonimizados com a resposta correta definida por uma pessoa, incluindo casos difíceis, casos de recusa e entradas hostis.
    verificacao: O conjunto tem ao menos trinta casos com resposta esperada e uma parte cobre exceções e ataques.
    depende:
      - ctx.objetivo_e_criterio_de_sucesso
  - id: exec.instrucao_clara_e_objetivo
    titulo: Escrever a instrução clara com o objetivo no início
    descricao: Começar pelo objetivo, descrever a tarefa em passos verificáveis, indicar o público e o tom, e dizer o que fazer em cada situação prevista.
    verificacao: Uma pessoa que não conhece a tarefa executa a instrução e chega ao resultado esperado.
    depende:
      - prep.conjunto_de_teste
  - id: exec.contexto_e_restricoes
    titulo: Fornecer o contexto e as restrições
    descricao: Incluir as informações de que o modelo precisa, como definições, regras de negócio e limites de tamanho, e indicar de onde cada dado vem.
    verificacao: Removendo qualquer bloco de contexto, ao menos um caso de teste passa a falhar, e nenhum bloco é redundante.
    depende:
      - exec.instrucao_clara_e_objetivo
  - id: exec.papel_e_prompt_de_sistema
    titulo: Definir o papel e separar o prompt de sistema
    descricao: Colocar no prompt de sistema o papel, as regras fixas e o formato de resposta, e deixar na mensagem do usuário apenas os dados da tarefa.
    verificacao: Trocar a mensagem do usuário não altera o papel nem as regras, e o prompt de sistema cabe em uma página.
    depende:
      - exec.contexto_e_restricoes
  - id: exec.exemplos_few_shot
    titulo: Acrescentar exemplos representativos
    descricao: Escolher dois a cinco exemplos variados de entrada e saída, incluindo um caso de borda, no mesmo formato que a resposta final terá.
    verificacao: A taxa de acerto com exemplos supera a versão sem exemplos no conjunto de teste, e os exemplos não aparecem no conjunto de avaliação.
    depende:
      - exec.papel_e_prompt_de_sistema
  - id: exec.saida_estruturada
    titulo: Definir a saída estruturada e validá-la
    descricao: Descrever o esquema de resposta, pedir a saída nesse esquema por recurso do modelo ou por instrução e validar cada resposta por código, com nova tentativa limitada.
    verificacao: Todas as respostas do conjunto de teste passam na validação do esquema ou terminam em erro tratado.
    depende:
      - exec.exemplos_few_shot
  - id: exec.raciocinio_passo_a_passo_ou_modelo_de_raciocinio
    titulo: Escolher entre raciocínio passo a passo e modelo de raciocínio
    descricao: Para modelos sem raciocínio nativo, pedir o desenvolvimento em etapas antes da resposta final; para modelos de raciocínio, descrever objetivo e restrições e deixar o modelo decidir as etapas.
    verificacao: A técnica escolhida supera a alternativa no conjunto de teste em acerto, custo ou tempo, e a comparação está registrada.
    depende:
      - exec.exemplos_few_shot
  - id: exec.decomposicao_e_encadeamento
    titulo: Decompor tarefas grandes em etapas encadeadas
    descricao: Dividir a tarefa em etapas com entrada e saída definidas, passar o resultado de uma à seguinte e validar cada etapa antes de continuar.
    verificacao: Cada etapa tem teste próprio e a cadeia completa supera o prompt único nos casos difíceis.
    depende:
      - exec.saida_estruturada
      - exec.raciocinio_passo_a_passo_ou_modelo_de_raciocinio
  - id: exec.defesa_contra_injecao_de_prompt
    titulo: Proteger o prompt contra injeção de instruções
    descricao: Marcar os dados externos com delimitadores, tratar o conteúdo como dado, limitar as ferramentas e as permissões do modelo e validar a saída antes de qualquer ação.
    verificacao: Entradas com instruções maliciosas do conjunto de teste não alteram o comportamento nem disparam ações fora do escopo.
    depende:
      - exec.decomposicao_e_encadeamento
  - id: val.avaliar_e_iterar
    titulo: Avaliar com o conjunto de teste e iterar
    descricao: Rodar o conjunto a cada mudança do prompt, comparar com a versão anterior por métrica e por revisão humana de amostra, e mudar uma coisa por vez. O guia Como avaliar um modelo ou prompt (evals) detalha o método.
    verificacao: A versão final atinge a meta do critério de sucesso e cada mudança tem resultado registrado.
    depende:
      - exec.defesa_contra_injecao_de_prompt
  - id: ent.versionar_e_liberar_o_prompt
    titulo: Versionar o prompt e liberar de forma gradual
    descricao: Guardar o prompt em controle de versão com a configuração do modelo e os resultados dos testes, e liberar para uma parte do tráfego antes da liberação total.
    verificacao: A versão em produção é identificável, reproduzível a partir do repositório e tem um caminho de volta para a versão anterior.
    depende:
      - val.avaliar_e_iterar
  - id: ops.monitorar_regressoes
    titulo: Monitorar qualidade e repetir os testes a cada mudança de modelo
    descricao: Amostrar respostas reais, repetir o conjunto de teste a cada atualização de modelo ou de dados e transformar as falhas em novos casos.
    verificacao: Existe amostragem periódica e cada falha relevante vira caso de teste.
    depende:
      - ent.versionar_e_liberar_o_prompt
comoFazerHoje: []
checklistRefs: {}
armadilhas:
  - Escrever o prompt antes de definir o critério de sucesso, o que impede saber se uma mudança melhorou ou piorou o resultado.
  - Avaliar com poucos exemplos escolhidos a dedo, o que esconde falhas nos casos difíceis e nas entradas hostis.
  - Misturar instruções e dados de terceiros no mesmo bloco de texto, o que permite que o conteúdo externo redefina o comportamento.
  - Mudar vários elementos de uma vez, o que impede identificar qual alteração causou a melhora ou a regressão.
  - Copiar o prompt de um modelo para outro sem repetir os testes, o que esconde diferenças de comportamento entre versões.
validacao:
  - O conjunto de teste tem ao menos trinta casos com resposta esperada, incluindo exceções e ataques.
  - A versão final atinge a meta do critério de sucesso e supera a versão inicial em comparação registrada.
  - Toda resposta passa pela validação do formato ou termina em erro tratado.
  - Entradas com instruções maliciosas não alteram o comportamento nem disparam ações fora do escopo.
  - A versão em produção é rastreável no repositório e os testes rodam a cada mudança de prompt ou de modelo.
padroes:
  - "[[prompt_chaining|Prompt Chaining]]"
  - "[[structured_output|Structured Output]]"
  - "[[guardrails_llm|Guardrails]]"
  - "[[llm_as_judge|LLM-as-Judge]]"
  - "[[routing_llm|Routing]]"
categorias:
  - "[[prompts_agentes_repos|Prompts e agentes]]"
  - "[[evals_observabilidade|Evals e observabilidade]]"
  - "[[guardrails_seguranca_llm|Guardrails e segurança de LLM]]"
  - "[[modelo_fundacional|Modelo fundacional]]"
aliases:
  - Escrever um prompt
  - Engenharia de prompt
  - Técnicas de prompt e raciocínio
grupo: IA aplicada
stacks:
  - "[[fluxo_dev_assistido_ia|Fluxo de desenvolvimento assistido por IA]]"
ferramentas:
  - "[[promptfoo|Promptfoo]]"
  - "[[langfuse|LangFuse]]"
  - "[[glm_5_3_flash|GLM-5.3-Flash]]"
  - "[[gemini_3_1_pro|Gemini 3.1 Pro]]"
  - "[[claude_opus_5_5|Claude Opus 5.5]]"
  - "[[amazon_bedrock_guardrails|Amazon Bedrock Guardrails]]"
casosDeUso:
  - "[[avaliacao_de_prompts|Avaliação de prompts]]"
  - "[[classificacao_e_extracao_em_alto_volume|Classificação e extração em alto volume]]"
  - "[[raciocinio_complexo_e_matematica|Raciocínio complexo e matemática]]"
variacoes:
  - eval-regressao-prompts
  - classif-extracao-documentos
  - raciocinio-planejamento-decisao
certificacoes:
  - "[[claude_academy_cursos_da_anthropic|Claude Academy (cursos da Anthropic)]]"
  - "[[google_generative_ai_leader|Google Generative AI Leader]]"
dataVerificacao: 2026-11-23
tags:
  - guia-pratico
---
# Como escrever um bom prompt
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
