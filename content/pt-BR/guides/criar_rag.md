---
id: criar_rag
tipo: guia-pratico
nome: Como criar um RAG
sigla: rag
descricao: "Caminho para entregar respostas fundamentadas em uma base própria: inventariar as fontes, escolher entre assinar uma solução gerenciada ou construir, definir a stack conforme a complexidade das perguntas e lançar com avaliação de recuperação e de resposta, citação da fonte e controle de acesso."
exemplo: "Uma consultoria quer perguntar em linguagem natural sobre seus relatórios: assina uma ferramenta gerenciada de perguntas sobre documentos para validar o uso e migra para uma stack própria quando o volume e o controle de acesso pedem."
quando_usar:
  - As respostas precisam se apoiar em documentos próprios, atuais e rastreáveis, que o modelo não conhece.
  - A base muda com frequência e retreinar um modelo seria lento e caro.
quando_evitar:
  - Quando a base cabe inteira no contexto de uma única chamada e muda pouco, o que dispensa a infraestrutura de recuperação.
fonte_ids:
  - arxiv_rag_lewis
  - owasp_llm_top10
fontes:
  - id: arxiv_rag_lewis
    tipo: artigo
    titulo: Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (Lewis et al.)
    link: https://arxiv.org/abs/2005.11401
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
  - id: rag_orq
    nome: Orquestração do RAG
    responsabilidade: Encadear contexto, abordagem, stack e entrega até o desfecho.
    cor: "#607D8B"
    orquestradora: true
  - id: rag_ctx
    nome: Contexto e requisitos
    responsabilidade: Entender a necessidade e fixar escopo e critérios antes de escolher tecnologia.
    cor: "#0072B2"
    orquestradora: false
  - id: rag_abd
    nome: Abordagem de entrega
    responsabilidade: Decidir entre assinar, comprar ou construir a partir das premissas.
    cor: "#E69F00"
    orquestradora: false
  - id: rag_stk
    nome: Stack por contexto
    responsabilidade: Escolher o arquétipo de stack ou o caminho de construção por contexto.
    cor: "#009E73"
    orquestradora: false
  - id: rag_ent
    nome: Implementação e entrega
    responsabilidade: Implementar, validar, publicar e operar na abordagem escolhida.
    cor: "#56B4E9"
    orquestradora: false
nos:
  - id: rag_orq_s0
    raia: rag_orq
    tipo: inicio
    rotulo: Necessidade de respostas fundamentadas em uma base própria
    proximo:
      - para: rag_orq_c1
        condicao: ""
  - id: rag_orq_c1
    raia: rag_orq
    tipo: chamada
    rotulo: Inventariar fontes, perguntas e acesso
    proximo:
      - para: rag_orq_c2
        condicao: base_definida
    raia_chamada: rag_ctx
  - id: rag_orq_c2
    raia: rag_orq
    tipo: chamada
    rotulo: Escolher a abordagem de entrega
    proximo:
      - para: rag_orq_c3
        condicao: construir
      - para: rag_orq_c6
        condicao: assinar_gerenciado
    raia_chamada: rag_abd
  - id: rag_orq_c3
    raia: rag_orq
    tipo: chamada
    rotulo: Escolher a stack pela complexidade das perguntas
    proximo:
      - para: rag_orq_c5
        condicao: agente_ferramentas
      - para: rag_orq_c4
        condicao: rag_producao
    raia_chamada: rag_stk
  - id: rag_orq_c4
    raia: rag_orq
    tipo: chamada
    rotulo: Implementar, avaliar e lançar o RAG
    proximo:
      - para: rag_orq_e1
        condicao: pronta
    raia_chamada: rag_ent
  - id: rag_orq_c5
    raia: rag_orq
    tipo: chamada
    rotulo: Implementar, avaliar e lançar o RAG
    proximo:
      - para: rag_orq_e2
        condicao: pronta
    raia_chamada: rag_ent
  - id: rag_orq_c6
    raia: rag_orq
    tipo: chamada
    rotulo: Implementar, avaliar e lançar o RAG
    proximo:
      - para: rag_orq_e3
        condicao: pronta
    raia_chamada: rag_ent
  - id: rag_orq_e1
    raia: rag_orq
    tipo: fim
    rotulo: RAG lançado sobre a stack de RAG em produção
    proximo: []
    retorno: rag_producao
    saida:
      tipo: stack
      justificativa: Para perguntas diretas sobre uma base própria, a recuperação com reranqueamento e citação da fonte entrega respostas fundamentadas, baratas de operar e fáceis de avaliar.
      eixos:
        - escala_volume
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
  - id: rag_orq_e2
    raia: rag_orq
    tipo: fim
    rotulo: RAG com decisão dinâmica sobre a stack de agente com ferramentas
    proximo: []
    retorno: agente_ferramentas
    saida:
      tipo: stack
      justificativa: Quando a pergunta exige reformular a busca, combinar fontes ou agir, o agente com ferramentas decide a próxima consulta e resolve a solicitação inteira, com limites de passos e custo.
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
  - id: rag_orq_e3
    raia: rag_orq
    tipo: fim
    rotulo: Perguntas sobre documentos em uma solução gerenciada
    proximo: []
    retorno: assinar_gerenciado
    saida:
      tipo: assinar
      justificativa: Com base pequena e uso interno, a solução gerenciada entrega ingestão, busca e respostas com fonte em dias, e valida a utilidade antes de uma stack própria.
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
      categoria: "[[rag_categoria|Ferramentas de RAG]]"
      ferramentas:
        - "[[notebooklm|NotebookLM]]"
        - tabela:amazon-bedrock-knowledge-bases
        - tabela:llamaparse
  - id: rag_ctx_s0
    raia: rag_ctx
    tipo: inicio
    rotulo: Início do levantamento
    proximo:
      - para: rag_ctx_t1
        condicao: ""
  - id: rag_ctx_t1
    raia: rag_ctx
    tipo: tarefa
    rotulo: Inventariar fontes e perguntas
    proximo:
      - para: rag_ctx_t2
        condicao: ""
    passos:
      - ctx.fontes_e_perguntas
      - ctx.regras_de_acesso
  - id: rag_ctx_t2
    raia: rag_ctx
    tipo: tarefa
    rotulo: Preparar a avaliação
    proximo:
      - para: rag_ctx_e1
        condicao: ""
    passos:
      - prep.conjunto_de_perguntas_e_respostas
  - id: rag_ctx_e1
    raia: rag_ctx
    tipo: fim
    rotulo: Fontes, perguntas e acesso acordados
    proximo: []
    retorno: base_definida
  - id: rag_abd_s0
    raia: rag_abd
    tipo: inicio
    rotulo: Início da escolha
    proximo:
      - para: rag_abd_t1
        condicao: ""
  - id: rag_abd_t1
    raia: rag_abd
    tipo: tarefa
    rotulo: Registrar premissas e pontuar as opções
    proximo:
      - para: rag_abd_g1
        condicao: ""
    passos:
      - ctx.premissas_nao_funcionais
      - prep.pontuar_opcoes_matriz
  - id: rag_abd_g1
    raia: rag_abd
    tipo: bifurcacao
    rotulo: Controle próprio dos documentos?
    proximo:
      - para: rag_abd_e1
        condicao: sim
      - para: rag_abd_g2
        condicao: não
    eixo: compliance_dados
    pergunta: q.dados_sob_controle_proprio
  - id: rag_abd_g2
    raia: rag_abd
    tipo: bifurcacao
    rotulo: Volume alto de consultas?
    proximo:
      - para: rag_abd_e1
        condicao: sim
      - para: rag_abd_g3
        condicao: não
    eixo: escala_volume
    pergunta: q.volume_alto_de_consultas
  - id: rag_abd_g3
    raia: rag_abd
    tipo: bifurcacao
    rotulo: Base pequena e ferramenta pronta?
    proximo:
      - para: rag_abd_e2
        condicao: sim
      - para: rag_abd_e1
        condicao: não
    eixo: prazo_entrega
    pergunta: q.base_pequena_ferramenta_gerenciada
  - id: rag_abd_e1
    raia: rag_abd
    tipo: fim
    rotulo: Construir o RAG
    proximo: []
    retorno: construir
  - id: rag_abd_e2
    raia: rag_abd
    tipo: fim
    rotulo: Solução gerenciada de perguntas sobre documentos
    proximo: []
    retorno: assinar_gerenciado
  - id: rag_stk_s0
    raia: rag_stk
    tipo: inicio
    rotulo: Início da escolha da stack
    proximo:
      - para: rag_stk_g1
        condicao: ""
  - id: rag_stk_g1
    raia: rag_stk
    tipo: bifurcacao
    rotulo: Perguntas com várias etapas?
    proximo:
      - para: rag_stk_e1
        condicao: sim
      - para: rag_stk_e2
        condicao: não
    eixo: contexto
    pergunta: q.perguntas_com_varias_etapas
  - id: rag_stk_e1
    raia: rag_stk
    tipo: fim
    rotulo: Stack de agente com ferramentas e memória
    proximo: []
    retorno: agente_ferramentas
  - id: rag_stk_e2
    raia: rag_stk
    tipo: fim
    rotulo: Stack de RAG em produção
    proximo: []
    retorno: rag_producao
  - id: rag_ent_s0
    raia: rag_ent
    tipo: inicio
    rotulo: Início da entrega
    proximo:
      - para: rag_ent_t1
        condicao: ""
  - id: rag_ent_t1
    raia: rag_ent
    tipo: tarefa
    rotulo: Ingerir e indexar a base
    proximo:
      - para: rag_ent_t2
        condicao: ""
    passos:
      - exec.ingestao_e_fragmentacao
      - exec.indexacao_e_recuperacao
  - id: rag_ent_t2
    raia: rag_ent
    tipo: tarefa
    rotulo: Gerar respostas com fonte
    proximo:
      - para: rag_ent_t3
        condicao: ""
    passos:
      - exec.resposta_com_citacao
  - id: rag_ent_t3
    raia: rag_ent
    tipo: tarefa
    rotulo: Avaliar antes de lançar
    proximo:
      - para: rag_ent_t4
        condicao: ""
    passos:
      - val.avaliar_recuperacao_e_resposta
  - id: rag_ent_t4
    raia: rag_ent
    tipo: tarefa
    rotulo: Lançar e manter a base viva
    proximo:
      - para: rag_ent_e1
        condicao: ""
    passos:
      - ent.lancar_com_controle_de_acesso
      - ops.atualizar_e_monitorar
  - id: rag_ent_e1
    raia: rag_ent
    tipo: fim
    rotulo: RAG lançado e acompanhado
    proximo: []
    retorno: pronta
perguntasDecisao:
  - id: q.dados_sob_controle_proprio
    pergunta: Os documentos têm dados pessoais ou sigilosos que exigem controle próprio de acesso e de local de processamento?
    eixo: compliance_dados
  - id: q.volume_alto_de_consultas
    pergunta: O volume de consultas é alto o bastante para que operar a própria busca custe menos que o serviço gerenciado?
    eixo: escala_volume
  - id: q.base_pequena_ferramenta_gerenciada
    pergunta: A base é pequena, de uso interno, e uma ferramenta gerenciada de perguntas sobre documentos atende ao caso?
    eixo: prazo_entrega
  - id: q.perguntas_com_varias_etapas
    pergunta: As perguntas exigem reformular a busca, consultar fontes diferentes ou executar ações antes de responder?
    eixo: contexto
objetivo: Entregar respostas com citação da fonte sobre uma base própria, com recuperação e geração avaliadas de forma separada, na abordagem (assinar ou construir) que atende ao prazo, ao volume e ao controle de acesso.
preRequisitos:
  - Inventário das fontes com dono, formato e frequência de atualização.
  - Perguntas reais que a base deve responder, com as respostas esperadas.
  - Regras de acesso por documento ou por grupo de pessoas.
  - Premissas de volume, dados sensíveis, prazo e orçamento.
passos:
  - id: ctx.fontes_e_perguntas
    titulo: Inventariar as fontes e as perguntas reais
    descricao: Listar as fontes com dono, formato e frequência de atualização, e coletar as perguntas reais que a base deve responder.
    verificacao: Cada fonte tem dono e frequência de atualização, e há uma lista de perguntas reais por tipo.
    depende: []
  - id: ctx.regras_de_acesso
    titulo: Definir quem pode ver cada documento
    descricao: Registrar as regras de acesso por documento ou por grupo e como elas serão aplicadas na recuperação.
    verificacao: Cada fonte tem regra de acesso escrita e há um caso de teste de acesso negado.
    depende:
      - ctx.fontes_e_perguntas
  - id: ctx.premissas_nao_funcionais
    titulo: Registrar premissas não funcionais
    descricao: Anotar volume esperado, latência aceitável, dados sensíveis, prazo e orçamento, que alimentam as perguntas de decisão.
    verificacao: Cada um dos 7 eixos de adoção tem uma resposta escrita ou a nota de que não se aplica.
    depende:
      - ctx.regras_de_acesso
  - id: prep.pontuar_opcoes_matriz
    titulo: Pontuar construir, comprar e assinar
    descricao: Dar nota de 1 a 5 às três opções nos cinco critérios da matriz e registrar o objetivo que pesa mais.
    verificacao: A matriz tem as 15 notas preenchidas e a opção vencedora tem a justificativa registrada.
    depende:
      - ctx.premissas_nao_funcionais
  - id: prep.conjunto_de_perguntas_e_respostas
    titulo: Montar o conjunto de perguntas com respostas de referência
    descricao: Reunir perguntas com a resposta de referência e os trechos que as sustentam, incluindo perguntas sem resposta na base.
    verificacao: O conjunto tem ao menos cinquenta perguntas com trechos de referência, e uma parte não tem resposta na base.
    depende:
      - ctx.regras_de_acesso
  - id: exec.ingestao_e_fragmentacao
    titulo: Ingerir os documentos e dividir em trechos
    descricao: Converter os documentos para texto, preservar títulos e tabelas, dividir em trechos coerentes e guardar a origem de cada trecho.
    verificacao: Uma amostra de documentos converte sem perda de tabelas e cada trecho aponta para a fonte e a data.
    depende:
      - prep.conjunto_de_perguntas_e_respostas
      - prep.pontuar_opcoes_matriz
  - id: exec.indexacao_e_recuperacao
    titulo: Indexar e recuperar com busca combinada e reranqueamento
    descricao: Indexar os trechos, combinar busca semântica e por palavras e reordenar os melhores candidatos, aplicando o filtro de acesso.
    verificacao: A recuperação encontra o trecho de referência entre os primeiros resultados na maior parte das perguntas, sem violar acessos.
    depende:
      - exec.ingestao_e_fragmentacao
  - id: exec.resposta_com_citacao
    titulo: Gerar respostas citando a fonte e recusando sem base
    descricao: Instruir o modelo a responder só com os trechos recuperados, citar a fonte e recusar quando a base não sustenta a resposta.
    verificacao: Cada resposta cita a fonte, e perguntas sem base recebem recusa em vez de invenção.
    depende:
      - exec.indexacao_e_recuperacao
  - id: val.avaliar_recuperacao_e_resposta
    titulo: Avaliar a recuperação e a resposta separadamente
    descricao: Medir se o trecho certo foi recuperado e se a resposta é fiel ao trecho, e analisar os erros de cada etapa por tipo.
    verificacao: As metas de recuperação e de fidelidade foram atingidas e os erros restantes estão classificados por etapa.
    depende:
      - exec.resposta_com_citacao
  - id: ent.lancar_com_controle_de_acesso
    titulo: Lançar com controle de acesso e retorno dos usuários
    descricao: Liberar para um grupo piloto com o filtro de acesso ativo e um botão para avaliar a resposta e relatar problemas.
    verificacao: O teste de acesso negado passa em produção e o retorno dos usuários chega a um painel.
    depende:
      - val.avaliar_recuperacao_e_resposta
  - id: ops.atualizar_e_monitorar
    titulo: Atualizar a base e monitorar a qualidade
    descricao: Reindexar quando as fontes mudam, acompanhar qualidade, latência e custo, e incluir as falhas reais no conjunto de avaliação.
    verificacao: A reindexação roda por gatilho ou agenda, e as falhas relevantes entram no conjunto de avaliação.
    depende:
      - ent.lancar_com_controle_de_acesso
comoFazerHoje: []
checklistRefs: {}
armadilhas:
  - Avaliar apenas a resposta final, o que esconde se o erro nasceu na recuperação ou na geração.
  - Dividir os documentos sem respeitar títulos e tabelas, o que separa a informação do seu contexto.
  - Aplicar o controle de acesso só na tela e não na recuperação, o que expõe trechos a quem não deveria vê-los.
  - Indexar uma vez e esquecer a atualização, o que faz o sistema responder com informação desatualizada.
validacao:
  - As metas de recuperação e de fidelidade da resposta foram atingidas no conjunto de avaliação.
  - Cada resposta cita a fonte e perguntas sem base recebem recusa.
  - Um usuário sem acesso a um documento não recebe trechos dele em nenhuma resposta.
  - A reindexação das fontes que mudam está automatizada e monitorada.
  - O retorno dos usuários chega a um painel e as falhas relevantes entram no conjunto de avaliação.
padroes:
  - "[[rag|RAG (padrão)]]"
  - "[[busca_hibrida_reranking|Busca Híbrida e Reranking]]"
  - "[[agentic_rag|Agentic RAG]]"
  - "[[guardrails_llm|Guardrails]]"
  - "[[semantic_caching|Semantic Caching]]"
  - "[[llm_as_judge|LLM-as-Judge]]"
categorias:
  - "[[rag_categoria|Ferramentas de RAG]]"
  - "[[vector_store|Vector store]]"
  - "[[extracao_conversao_documentos|Extração e conversão de documentos]]"
  - "[[busca_analitico|Busca e analítico]]"
  - "[[evals_observabilidade|Evals e observabilidade]]"
  - "[[guardrails_seguranca_llm|Guardrails e segurança de LLM]]"
aliases:
  - Criar um RAG
  - Construir busca com geração
grupo: IA aplicada
stacks:
  - "[[app_rag_producao|App RAG de produção]]"
  - "[[agente_ferramentas_memoria|Agente com ferramentas e memória]]"
ferramentas:
  - "[[notebooklm|NotebookLM]]"
  - tabela:amazon-bedrock-knowledge-bases
  - tabela:llamaparse
casosDeUso:
  - "[[rag_sobre_base_de_conhecimento|RAG sobre base de conhecimento]]"
  - "[[prototipacao_de_rag|Prototipação de RAG]]"
  - "[[busca_semantica_em_acervos|Busca semântica em acervos]]"
variacoes:
  - rag-documentacao-interna
  - proto-rag-avaliado
  - busca-acervo-documentos
certificacoes:
  - "[[databricks_certified_generative_ai_engineer_associate|Databricks Certified Generative AI Engineer Associate]]"
  - "[[aws_certified_ai_practitioner_aif_c01|AWS Certified AI Practitioner (AIF-C01)]]"
dataVerificacao: 2026-11-23
tags:
  - guia-pratico
---
# Como criar um RAG
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
