---
id: app_rag_producao
tipo: stack
nome: App RAG de produção
descricao: "Aplicação que responde com base em documentos próprios: ingere e converte conteúdo, indexa em um vector store, recupera trechos com busca híbrida e reranking, gera respostas com modelo fundacional e mede qualidade com avaliações contínuas."
fonte_ids: []
exemplo: Um assistente de documentação que responde dúvidas com citação das páginas de origem e é avaliado a cada mudança de prompt ou de índice.
quando_usar:
  - As respostas precisam se apoiar em documentos que mudam e que o modelo não conhece.
  - É necessário citar fontes e medir a qualidade da recuperação e da resposta.
quando_evitar:
  - Bases pequenas cabem no contexto do modelo, e uma consulta direta dispensa o índice.
status: rascunho
publico: false
fontes: []
categorias:
  - "[[modelo_fundacional|Modelo fundacional]]"
  - "[[extracao_conversao_documentos|Extração e conversão de documentos]]"
  - "[[vector_store|Vector store]]"
  - "[[rag_categoria|Ferramentas de RAG]]"
  - "[[busca_analitico|Busca e analítico]]"
  - "[[orquestracao_llm|Orquestração de LLM]]"
  - "[[evals_observabilidade|Evals e observabilidade]]"
  - "[[guardrails_seguranca_llm|Guardrails e segurança de LLM]]"
aliases:
  - RAG em produção
  - Busca aumentada por geração
dominio: ia
subdominio: Aplicações e agentes
linguagens:
  - python
  - typescript
slots:
  - id: modelo
    papel: Modelo fundacional
    categoria: "[[modelo_fundacional|Modelo fundacional]]"
    obrigatorio: true
    maisBarata:
      - "[[gemma_4|Gemma 4]]"
      - "[[claude_haiku_5_5|Claude Haiku 5.5]]"
    custoBeneficio:
      - "[[gpt_6_1_terra|GPT-6.1 Terra]]"
      - "[[claude_sonnet_5_5|Claude Sonnet 5.5]]"
    qualidadeMaxima:
      - "[[claude_opus_5_5|Claude Opus 5.5]]"
    lacuna: ""
  - id: extracao
    papel: Extração e conversão de documentos
    categoria: "[[extracao_conversao_documentos|Extração e conversão de documentos]]"
    obrigatorio: true
    maisBarata:
      - "[[markitdown|MarkItDown]]"
      - tabela:docling
    custoBeneficio:
      - tabela:unstructured
    qualidadeMaxima:
      - "[[azure_ai_document_intelligence|Azure AI Document Intelligence]]"
    lacuna: ""
  - id: vetores
    papel: Índice vetorial
    categoria: "[[vector_store|Vector store]]"
    obrigatorio: true
    maisBarata:
      - "[[pgvector|pgvector]]"
      - tabela:qdrant
    custoBeneficio:
      - tabela:weaviate
      - tabela:milvus
    qualidadeMaxima:
      - "[[pinecone|Pinecone]]"
    lacuna: ""
  - id: rag
    papel: Recuperação e reranking
    categoria: "[[rag_categoria|Ferramentas de RAG]]"
    obrigatorio: true
    maisBarata:
      - "[[chromadb|ChromaDB]]"
    custoBeneficio:
      - "[[llamaindex|LlamaIndex]]"
      - "[[langchain|LangChain]]"
    qualidadeMaxima:
      - tabela:cohere-rerank
      - "[[gemini_embedding_2|Gemini Embedding 2]]"
    lacuna: ""
  - id: busca
    papel: Busca lexical
    categoria: "[[busca_analitico|Busca e analítico]]"
    obrigatorio: false
    maisBarata:
      - "[[opensearch|OpenSearch]]"
      - tabela:meilisearch
    custoBeneficio:
      - "[[algolia|Algolia]]"
    qualidadeMaxima:
      - "[[amazon_opensearch_service|Amazon OpenSearch Service (ferramenta)]]"
    lacuna: ""
  - id: orquestracao
    papel: Orquestração de chamadas ao modelo
    categoria: "[[orquestracao_llm|Orquestração de LLM]]"
    obrigatorio: true
    maisBarata:
      - tabela:litellm
    custoBeneficio:
      - tabela:dspy
    qualidadeMaxima:
      - "[[langgraph|LangGraph]]"
    lacuna: ""
  - id: evals
    papel: Avaliação e rastreio
    categoria: "[[evals_observabilidade|Evals e observabilidade]]"
    obrigatorio: true
    maisBarata:
      - "[[promptfoo|Promptfoo]]"
      - tabela:ragas
    custoBeneficio:
      - "[[langfuse|LangFuse]]"
    qualidadeMaxima:
      - tabela:langsmith
    lacuna: ""
  - id: guardrails
    papel: Proteções de entrada e saída
    categoria: "[[guardrails_seguranca_llm|Guardrails e segurança de LLM]]"
    obrigatorio: true
    maisBarata:
      - tabela:guardrails-ai
    custoBeneficio:
      - tabela:llama-guard
    qualidadeMaxima:
      - "[[amazon_bedrock_guardrails|Amazon Bedrock Guardrails]]"
    lacuna: ""
instancias: []
condicoes:
  time_maturidade:
    favorece:
      - Time com base em engenharia de dados e disciplina de avaliação.
    contra:
      - Time sem quem mantenha índices e conjuntos de avaliação.
    preferir:
      - "[[agente_ferramentas_memoria|Agente com ferramentas e memória]]"
  escala_volume:
    favorece:
      - Milhões de trechos indexados com filtros por metadados.
    contra:
      - Poucas dezenas de documentos, que cabem no contexto.
    preferir:
      - "[[agente_ferramentas_memoria|Agente com ferramentas e memória]]"
  orcamento:
    favorece:
      - Modelos pequenos e índices abertos controlam o custo por consulta.
    contra:
      - Modelos de ponta em toda consulta elevam a fatura de tokens.
    preferir:
      - "[[inferencia_llm_autohospedada|Inferência de LLM auto-hospedada]]"
  latencia:
    favorece:
      - Cache semântico e índices em memória mantêm a resposta em segundos.
    contra:
      - Respostas com reranking e geração longa que passam de poucos segundos.
    preferir:
      - "[[agente_ferramentas_memoria|Agente com ferramentas e memória]]"
  compliance_dados:
    favorece:
      - Respostas com citação e controle de acesso por documento.
    contra:
      - Documentos sensíveis enviados a APIs de terceiros sem contrato adequado.
    preferir:
      - "[[inferencia_llm_autohospedada|Inferência de LLM auto-hospedada]]"
  prazo_entrega:
    favorece:
      - Frameworks de RAG entregam um protótipo em dias.
    contra:
      - Prazo que exclui montar avaliações antes de ir para produção.
    preferir:
      - "[[agente_ferramentas_memoria|Agente com ferramentas e memória]]"
  lock_in:
    favorece:
      - Embeddings e índices abertos permitem trocar de modelo e de provedor.
    contra:
      - Índices e embeddings proprietários exigem reindexação para sair.
    preferir: []
    semAlternativa: "Este eixo não aponta para outro arquétipo: a stack cobre o cenário sozinha."
outrosArquetipos:
  - stack: "[[agente_ferramentas_memoria|Agente com ferramentas e memória]]"
    quando: A tarefa exige decidir passos e usar ferramentas, além de consultar documentos.
  - stack: "[[inferencia_llm_autohospedada|Inferência de LLM auto-hospedada]]"
    quando: Os documentos não podem sair da infraestrutura própria.
checklist:
  - id: amb.ambiente_reproduzivel
    dominio: ambiente local
    titulo: Reproduzir o ambiente local com um comando
    verificacao: Uma pessoa nova no projeto consegue rodar a aplicação e os testes a partir de um clone limpo, seguindo apenas o que está no repositório.
    nivel: essencial
    slots: []
    depende: []
  - id: amb.dependencias_travadas
    dominio: ambiente local
    titulo: Travar as dependências
    verificacao: As dependências diretas e transitivas ficam registradas em arquivo versionado, e o build usa exatamente esse conjunto.
    nivel: essencial
    slots: []
    depende: []
  - id: amb.config_por_ambiente
    dominio: ambiente local
    titulo: Separar configuração por ambiente
    verificacao: Valores que mudam entre ambientes chegam por configuração externa ao código, e o mesmo artefato roda em todos os ambientes.
    nivel: recomendado
    slots: []
    depende: []
  - id: repo.protecao_branch_principal
    dominio: repositório
    titulo: Proteger a branch principal
    verificacao: Merge na branch principal só acontece por pull request com revisão e CI verde.
    nivel: essencial
    slots: []
    depende: []
  - id: repo.convencao_commits
    dominio: repositório
    titulo: Combinar uma convenção de commits e de branches
    verificacao: Existe um padrão escrito de mensagens de commit e de nomes de branch, e a revisão aponta desvios.
    nivel: recomendado
    slots: []
    depende: []
  - id: repo.codeowners
    dominio: repositório
    titulo: Definir responsáveis por área do código
    verificacao: Cada área crítica do repositório tem responsáveis nomeados que entram automaticamente na revisão.
    nivel: recomendado
    slots: []
    depende: []
  - id: cicd.pipeline_ci
    dominio: CI/CD
    titulo: Rodar build, testes e análise a cada mudança
    verificacao: Todo pull request dispara um pipeline que compila, executa os testes e roda a análise estática, e o resultado bloqueia o merge.
    nivel: essencial
    slots: []
    depende: []
  - id: cicd.artefato_imutavel
    dominio: CI/CD
    titulo: Publicar um artefato imutável por mudança
    verificacao: Cada build gera um artefato identificado por um hash ou tag que nunca é sobrescrito, e o deploy promove esse mesmo artefato entre ambientes.
    nivel: essencial
    slots: []
    depende: []
  - id: cicd.deploy_automatizado
    dominio: CI/CD
    titulo: Automatizar o deploy
    verificacao: Colocar uma mudança em produção é uma ação de pipeline repetível, sem passos manuais fora do registro.
    nivel: essencial
    slots: []
    depende: []
  - id: iac.infra_versionada
    dominio: infraestrutura como código
    titulo: Descrever a infraestrutura em código
    verificacao: Toda infraestrutura de produção é criada a partir de arquivos versionados, e uma mudança manual no console é revertida ou incorporada ao código.
    nivel: essencial
    slots: []
    depende: []
  - id: iac.estado_remoto_protegido
    dominio: infraestrutura como código
    titulo: Guardar o estado da infraestrutura em local compartilhado e protegido
    verificacao: O estado da infraestrutura fica em armazenamento remoto com controle de acesso, histórico e bloqueio contra aplicações simultâneas.
    nivel: essencial
    slots: []
    depende: []
  - id: iac.plano_revisado
    dominio: infraestrutura como código
    titulo: Revisar o plano antes de aplicar
    verificacao: Cada mudança de infraestrutura mostra o plano de alterações no pull request, e uma pessoa revisora o aprova antes da aplicação.
    nivel: recomendado
    slots: []
    depende: []
  - id: obs.logs_estruturados
    dominio: observabilidade
    titulo: Emitir logs estruturados com correlação
    verificacao: Os logs saem em formato estruturado e carregam um identificador de requisição que liga os eventos de uma mesma chamada.
    nivel: essencial
    slots: []
    depende: []
  - id: obs.metricas_sinais_ouro
    dominio: observabilidade
    titulo: Medir latência, tráfego, erros e saturação
    verificacao: Cada serviço expõe métricas de latência, volume de requisições, taxa de erro e uso de recursos, com painel acessível ao time.
    nivel: essencial
    slots: []
    depende: []
  - id: obs.alertas_acionaveis
    dominio: observabilidade
    titulo: Criar alertas acionáveis ligados a objetivos de nível de serviço
    verificacao: Cada alerta aponta para um objetivo de nível de serviço e para um procedimento de resposta, e alertas sem ação são removidos.
    nivel: recomendado
    slots: []
    depende: []
  - id: seg.segredos_fora_do_codigo
    dominio: segurança
    titulo: Guardar segredos fora do repositório
    verificacao: Nenhum segredo vive no código ou no histórico do repositório, e uma varredura automática bloqueia o commit ou o merge quando encontra um.
    nivel: essencial
    slots: []
    depende: []
  - id: seg.menor_privilegio
    dominio: segurança
    titulo: Aplicar o menor privilégio
    verificacao: Cada pessoa, serviço e pipeline tem apenas as permissões de que precisa, e as permissões são revisadas em ciclos definidos.
    nivel: essencial
    slots: []
    depende: []
  - id: seg.varredura_dependencias
    dominio: segurança
    titulo: Varrer dependências e imagens em busca de vulnerabilidades
    verificacao: O pipeline lista vulnerabilidades conhecidas em dependências e imagens e bloqueia a publicação acima de um limite combinado.
    nivel: essencial
    slots: []
    depende: []
  - id: custo.orcamento_alertas
    dominio: custos
    titulo: Definir orçamento e alertas de gasto
    verificacao: Existe um orçamento por ambiente com alerta automático quando o gasto previsto passa do limite combinado.
    nivel: essencial
    slots: []
    depende: []
  - id: custo.etiquetas_de_custo
    dominio: custos
    titulo: Etiquetar recursos por dono e finalidade
    verificacao: Todo recurso pago carrega etiquetas de dono e de finalidade, o que permite atribuir cada custo a um responsável.
    nivel: recomendado
    slots: []
    depende: []
  - id: dados.migracoes_versionadas
    dominio: dados e migrações
    titulo: Versionar as migrações de dados
    verificacao: Mudanças de esquema entram por migrações versionadas, aplicadas por pipeline e compatíveis com a versão anterior da aplicação.
    nivel: essencial
    slots: []
    depende: []
  - id: dados.backup_restauracao_testada
    dominio: dados e migrações
    titulo: Testar a restauração de backups
    verificacao: Existe backup automático dos dados críticos, e a restauração é exercitada com resultado registrado em ciclos definidos.
    nivel: essencial
    slots: []
    depende: []
  - id: dados.indexacao_reproduzivel
    dominio: dados e migrações
    titulo: Reconstruir o índice a partir das fontes
    verificacao: O índice pode ser reconstruído por um pipeline versionado, e cada trecho guarda a origem e a data da ingestão.
    nivel: essencial
    slots:
      - extracao
      - vetores
    depende: []
  - id: teste.piramide_de_testes
    dominio: testes e qualidade
    titulo: Cobrir o comportamento com testes automatizados em camadas
    verificacao: O comportamento crítico tem testes unitários, de integração e de ponta a ponta, e o pipeline executa todos antes do merge.
    nivel: essencial
    slots: []
    depende: []
  - id: teste.dados_de_teste_isolados
    dominio: testes e qualidade
    titulo: Isolar os dados de teste
    verificacao: Os testes criam e descartam seus próprios dados e rodam em qualquer ordem sem depender de estado compartilhado.
    nivel: recomendado
    slots: []
    depende: []
  - id: rel.rollback_ensaiado
    dominio: release e rollback
    titulo: Ensaiar o rollback
    verificacao: Voltar para a versão anterior é um procedimento documentado e ensaiado, e a equipe sabe o tempo que ele leva.
    nivel: essencial
    slots: []
    depende: []
  - id: rel.liberacao_gradual
    dominio: release e rollback
    titulo: Liberar mudanças de forma gradual
    verificacao: Mudanças de risco chegam a uma parcela do tráfego ou atrás de uma chave de funcionalidade antes de atingir todo mundo.
    nivel: recomendado
    slots: []
    depende: []
  - id: doc.readme_operacional
    dominio: documentação e decisões
    titulo: Manter um README operacional
    verificacao: O README explica o propósito do sistema, como rodar, testar e implantar, e quem procurar em caso de dúvida.
    nivel: essencial
    slots: []
    depende: []
  - id: doc.registro_decisoes
    dominio: documentação e decisões
    titulo: Registrar decisões de arquitetura
    verificacao: Cada decisão com impacto duradouro vira um registro curto com contexto, alternativas consideradas e consequência.
    nivel: recomendado
    slots: []
    depende: []
  - id: ops.runbooks_incidente
    dominio: operação e incidentes
    titulo: Escrever runbooks para os incidentes previstos
    verificacao: Os cenários de falha mais prováveis têm um procedimento passo a passo que uma pessoa de plantão consegue seguir.
    nivel: essencial
    slots: []
    depende: []
  - id: ops.revisao_pos_incidente
    dominio: operação e incidentes
    titulo: Fazer revisão pós-incidente sem culpados
    verificacao: Todo incidente relevante gera uma revisão escrita com causas, linha do tempo e ações de melhoria acompanhadas até o fim.
    nivel: recomendado
    slots: []
    depende: []
  - id: ia.avaliacao_automatizada
    dominio: IA
    titulo: Avaliar o comportamento do modelo com um conjunto de casos
    verificacao: Existe um conjunto versionado de casos de avaliação com critérios de aprovação, executado a cada mudança de prompt, modelo ou dados.
    nivel: essencial
    slots: []
    depende: []
  - id: ia.guardrails_entrada_saida
    dominio: IA
    titulo: Validar entradas e saídas do modelo
    verificacao: Entradas e saídas passam por validações de formato, segurança e conteúdo, e as violações ficam registradas.
    nivel: essencial
    slots: []
    depende: []
  - id: ia.prompts_modelos_versionados
    dominio: IA
    titulo: Versionar prompts e referências de modelo
    verificacao: Prompts, parâmetros e identificadores de modelo ficam no repositório, e cada resposta registra a versão usada.
    nivel: essencial
    slots: []
    depende: []
  - id: ia.custo_tokens_monitorado
    dominio: IA
    titulo: Monitorar custo e uso de tokens
    verificacao: O consumo de tokens e o custo por requisição aparecem em painel, com limite e alerta por ambiente.
    nivel: essencial
    slots: []
    depende: []
  - id: ia.rastreio_de_chamadas
    dominio: IA
    titulo: Rastrear as chamadas ao modelo e às ferramentas
    verificacao: Cada execução registra entradas, saídas, ferramentas chamadas, latência e custo, com o mesmo identificador de correlação do restante do sistema.
    nivel: recomendado
    slots: []
    depende: []
  - id: ia.dados_sensiveis_protegidos
    dominio: IA
    titulo: Proteger dados sensíveis enviados ao modelo
    verificacao: Dados pessoais e confidenciais são identificados e removidos ou mascarados antes de sair do ambiente controlado.
    nivel: recomendado
    slots: []
    depende: []
  - id: ia.avaliacao_de_recuperacao
    dominio: IA
    titulo: Avaliar a recuperação separadamente da geração
    verificacao: Existem métricas de recuperação e de resposta, calculadas em um conjunto de perguntas com respostas de referência.
    nivel: essencial
    slots:
      - evals
      - rag
    depende: []
  - id: ia.citacao_de_fontes
    dominio: IA
    titulo: Citar as fontes de cada resposta
    verificacao: Cada resposta aponta os trechos usados, e respostas sem fonte suficiente informam a limitação.
    nivel: recomendado
    slots:
      - rag
      - guardrails
    depende: []
padroes:
  - "[[rag|RAG (padrão)]]"
  - "[[busca_hibrida_reranking|Busca Híbrida e Reranking]]"
  - "[[semantic_caching|Semantic Caching]]"
  - "[[guardrails_llm|Guardrails]]"
  - "[[structured_output|Structured Output]]"
  - "[[llm_as_judge|LLM-as-Judge]]"
  - "[[agentic_rag|Agentic RAG]]"
casosDeUso:
  - "[[rag_sobre_base_de_conhecimento|RAG sobre base de conhecimento]]"
  - "[[busca_semantica_em_acervos|Busca semântica em acervos]]"
  - "[[geracao_de_embeddings_para_busca|Geração de embeddings para busca]]"
  - "[[prototipacao_de_rag|Prototipação de RAG]]"
variacoes:
  - rag-documentacao-interna
  - busca-acervo-documentos
  - emb-indexacao-vetorial
  - proto-rag-avaliado
ferramentas:
  - "[[gemma_4|Gemma 4]]"
  - "[[claude_haiku_5_5|Claude Haiku 5.5]]"
  - "[[gpt_6_1_terra|GPT-6.1 Terra]]"
  - "[[claude_sonnet_5_5|Claude Sonnet 5.5]]"
  - "[[claude_opus_5_5|Claude Opus 5.5]]"
  - "[[markitdown|MarkItDown]]"
  - tabela:docling
  - tabela:unstructured
  - "[[azure_ai_document_intelligence|Azure AI Document Intelligence]]"
  - "[[pgvector|pgvector]]"
  - tabela:qdrant
  - tabela:weaviate
  - tabela:milvus
  - "[[pinecone|Pinecone]]"
  - "[[chromadb|ChromaDB]]"
  - "[[llamaindex|LlamaIndex]]"
  - "[[langchain|LangChain]]"
  - tabela:cohere-rerank
  - "[[gemini_embedding_2|Gemini Embedding 2]]"
  - "[[opensearch|OpenSearch]]"
  - tabela:meilisearch
  - "[[algolia|Algolia]]"
  - "[[amazon_opensearch_service|Amazon OpenSearch Service (ferramenta)]]"
  - tabela:litellm
  - tabela:dspy
  - "[[langgraph|LangGraph]]"
  - "[[promptfoo|Promptfoo]]"
  - tabela:ragas
  - "[[langfuse|LangFuse]]"
  - tabela:langsmith
  - tabela:guardrails-ai
  - tabela:llama-guard
  - "[[amazon_bedrock_guardrails|Amazon Bedrock Guardrails]]"
dataVerificacao: 2026-11-23
tags:
  - stack
---
# App RAG de produção
<!-- stack:gen -->
## 📋 Resumo
`= this.descricao`
Exemplo: `= this.exemplo`
Domínio: `= this.dominio` / `= this.subdominio`
## 🔗 Relacionamentos
- **Hub:** [[hub_stacks|Mapa de Stacks de Engenharia]], [[hub_tools|Mapa de Ferramentas de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
