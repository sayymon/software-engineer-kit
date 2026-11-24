---
id: agente_ferramentas_memoria
tipo: stack
nome: Agente com ferramentas e memória
descricao: Aplicação em que um modelo decide os próximos passos, chama ferramentas por protocolos como MCP, mantém memória de curto e longo prazo e opera dentro de limites de ação, aprovação humana e avaliação contínua.
fonte_ids: []
exemplo: Um agente de operações que consulta o sistema de tickets, executa verificações e abre um pull request, pedindo aprovação antes de ações com efeito.
quando_usar:
  - A tarefa tem passos que dependem de resultados intermediários e de ferramentas externas.
  - O fluxo precisa de memória entre etapas ou sessões.
quando_evitar:
  - Fluxos fixos e previsíveis ficam mais confiáveis como automações determinísticas.
status: rascunho
publico: false
fontes: []
categorias:
  - "[[modelo_fundacional|Modelo fundacional]]"
  - "[[framework_agentes|Framework de agentes]]"
  - "[[mcp_integracoes|MCP e integrações]]"
  - "[[vector_store|Vector store]]"
  - "[[orquestracao_llm|Orquestração de LLM]]"
  - "[[evals_observabilidade|Evals e observabilidade]]"
  - "[[guardrails_seguranca_llm|Guardrails e segurança de LLM]]"
aliases:
  - Agente de IA
  - Agente com uso de ferramentas
dominio: ia
subdominio: Aplicações e agentes
linguagens:
  - python
  - typescript
  - java
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
  - id: framework
    papel: Framework de agentes
    categoria: "[[framework_agentes|Framework de agentes]]"
    obrigatorio: true
    maisBarata:
      - "[[crewai|CrewAI]]"
      - tabela:smolagents
    custoBeneficio:
      - "[[langgraph|LangGraph]]"
      - "[[adk_agent_development_kit|ADK]]"
    qualidadeMaxima:
      - tabela:claude-agent-sdk
      - tabela:microsoft-agent-framework
    lacuna: ""
  - id: memoria
    papel: Memória do agente
    categoria: "[[framework_agentes|Framework de agentes]]"
    obrigatorio: true
    maisBarata:
      - tabela:mem0
    custoBeneficio:
      - tabela:letta
    qualidadeMaxima:
      - tabela:graphiti
    lacuna: ""
  - id: mcp
    papel: Ferramentas por MCP
    categoria: "[[mcp_integracoes|MCP e integrações]]"
    obrigatorio: true
    maisBarata:
      - tabela:fastmcp
      - tabela:mcp-reference-servers
    custoBeneficio:
      - "[[composio|Composio]]"
    qualidadeMaxima:
      - "[[github_mcp_server|GitHub MCP Server]]"
    lacuna: ""
  - id: vetores
    papel: Memória de longo prazo vetorial
    categoria: "[[vector_store|Vector store]]"
    obrigatorio: false
    maisBarata:
      - "[[pgvector|pgvector]]"
      - tabela:qdrant
    custoBeneficio:
      - tabela:weaviate
    qualidadeMaxima:
      - "[[pinecone|Pinecone]]"
    lacuna: ""
  - id: orquestracao
    papel: Cliente e roteamento de modelos
    categoria: "[[orquestracao_llm|Orquestração de LLM]]"
    obrigatorio: true
    maisBarata:
      - tabela:litellm
    custoBeneficio:
      - tabela:portkey
    qualidadeMaxima:
      - tabela:vercel-ai-sdk
    lacuna: ""
  - id: evals
    papel: Avaliação e rastreio
    categoria: "[[evals_observabilidade|Evals e observabilidade]]"
    obrigatorio: true
    maisBarata:
      - "[[promptfoo|Promptfoo]]"
    custoBeneficio:
      - "[[langfuse|LangFuse]]"
      - tabela:arize-phoenix
    qualidadeMaxima:
      - tabela:langsmith
    lacuna: ""
  - id: guardrails
    papel: Limites e proteções
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
      - Time que já mede qualidade de LLM e opera filas e ferramentas.
    contra:
      - Time sem hábito de avaliação, em que o agente falha sem ser percebido.
    preferir:
      - "[[automacao_integracoes|Automação e integrações orquestradas]]"
  escala_volume:
    favorece:
      - Muitas execuções paralelas com isolamento por tarefa.
    contra:
      - Execuções longas sem limite de passos e de tokens.
    preferir:
      - "[[automacao_integracoes|Automação e integrações orquestradas]]"
  orcamento:
    favorece:
      - Roteamento entre modelos pequenos e grandes reduz o custo por tarefa.
    contra:
      - Loops de ferramentas que consomem tokens sem limite.
    preferir:
      - "[[automacao_integracoes|Automação e integrações orquestradas]]"
  latencia:
    favorece:
      - Tarefas assíncronas que toleram minutos de execução.
    contra:
      - Interação em tempo real com respostas abaixo de um segundo.
    preferir:
      - "[[api_serverless_edge|API serverless e edge]]"
  compliance_dados:
    favorece:
      - Aprovação humana e trilha de auditoria por ação.
    contra:
      - Ações com dados sensíveis delegadas sem revisão.
    preferir:
      - "[[servidor_mcp|Servidor MCP]]"
  prazo_entrega:
    favorece:
      - Frameworks e servidores MCP prontos aceleram o protótipo.
    contra:
      - Prazo que exclui avaliações e limites de ação.
    preferir:
      - "[[automacao_integracoes|Automação e integrações orquestradas]]"
  lock_in:
    favorece:
      - Protocolos abertos como MCP mantêm as ferramentas portáveis entre agentes.
    contra:
      - SDKs proprietários prendem a lógica de orquestração.
    preferir: []
    semAlternativa: "Este eixo não aponta para outro arquétipo: a stack cobre o cenário sozinha."
outrosArquetipos:
  - stack: "[[app_rag_producao|App RAG de produção]]"
    quando: A necessidade é responder perguntas sobre documentos, sem agir sobre sistemas.
  - stack: "[[servidor_mcp|Servidor MCP]]"
    quando: O foco é expor ferramentas para outros agentes usarem.
  - stack: "[[automacao_integracoes|Automação e integrações orquestradas]]"
    quando: O fluxo é fixo e previsível, sem decisão do modelo.
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
  - id: ia.limites_de_acao
    dominio: IA
    titulo: Limitar passos, tempo e gasto por execução
    verificacao: Cada execução tem teto de passos, de duração e de tokens, e ao atingi-lo o agente encerra com um relatório.
    nivel: essencial
    slots:
      - framework
      - guardrails
    depende: []
  - id: ia.aprovacao_humana_em_acoes_criticas
    dominio: IA
    titulo: Pedir aprovação humana para ações com efeito
    verificacao: Ações que alteram dados ou gastam recursos exigem confirmação registrada de uma pessoa.
    nivel: essencial
    slots:
      - framework
      - mcp
    depende: []
  - id: ia.memoria_com_expiracao
    dominio: IA
    titulo: Dar prazo e escopo à memória do agente
    verificacao: A memória guarda origem, escopo e validade de cada item, e é possível apagar dados de uma pessoa específica.
    nivel: recomendado
    slots:
      - memoria
      - vetores
    depende: []
padroes:
  - "[[react_agente|ReAct (padrão)]]"
  - "[[tool_use|Tool Use (padrão)]]"
  - "[[agent_memory|Agent Memory]]"
  - "[[plan_and_execute|Plan-and-Execute]]"
  - "[[human_in_the_loop|Human-in-the-Loop]]"
  - "[[guardrails_llm|Guardrails]]"
casosDeUso:
  - "[[construcao_de_agentes|Construção de agentes]]"
  - "[[agentes_autonomos_de_longa_duracao|Agentes autônomos de longa duração]]"
variacoes:
  - agente-operacoes-internas
  - longa-duracao-codigo
ferramentas:
  - "[[gemma_4|Gemma 4]]"
  - "[[claude_haiku_5_5|Claude Haiku 5.5]]"
  - "[[gpt_6_1_terra|GPT-6.1 Terra]]"
  - "[[claude_sonnet_5_5|Claude Sonnet 5.5]]"
  - "[[claude_opus_5_5|Claude Opus 5.5]]"
  - "[[crewai|CrewAI]]"
  - tabela:smolagents
  - "[[langgraph|LangGraph]]"
  - "[[adk_agent_development_kit|ADK]]"
  - tabela:claude-agent-sdk
  - tabela:microsoft-agent-framework
  - tabela:mem0
  - tabela:letta
  - tabela:graphiti
  - tabela:fastmcp
  - tabela:mcp-reference-servers
  - "[[composio|Composio]]"
  - "[[github_mcp_server|GitHub MCP Server]]"
  - "[[pgvector|pgvector]]"
  - tabela:qdrant
  - tabela:weaviate
  - "[[pinecone|Pinecone]]"
  - tabela:litellm
  - tabela:portkey
  - tabela:vercel-ai-sdk
  - "[[promptfoo|Promptfoo]]"
  - "[[langfuse|LangFuse]]"
  - tabela:arize-phoenix
  - tabela:langsmith
  - tabela:guardrails-ai
  - tabela:llama-guard
  - "[[amazon_bedrock_guardrails|Amazon Bedrock Guardrails]]"
dataVerificacao: 2026-11-23
tags:
  - stack
---
# Agente com ferramentas e memória
<!-- stack:gen -->
## 📋 Resumo
`= this.descricao`
Exemplo: `= this.exemplo`
Domínio: `= this.dominio` / `= this.subdominio`
## 🔗 Relacionamentos
- **Hub:** [[hub_stacks|Mapa de Stacks de Engenharia]], [[hub_tools|Mapa de Ferramentas de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
