---
id: construcao_de_agentes
tipo: caso-de-uso
nome: Construção de agentes
aliases:
  - construcao-agentes
descricao: Projetar e implementar agentes que usam ferramentas para cumprir objetivos.
funcionalidadesNecessarias:
  - "[[tool_use_funcionalidade|Tool use]]"
  - "[[orquestracao_de_fluxos|Orquestração de fluxos]]"
  - "[[memoria_persistente|Memória persistente]]"
  - "[[saida_estruturada|Saída estruturada]]"
categoriasRelacionadas:
  - "[[framework_agentes|Framework de agentes]]"
  - "[[orquestracao_llm|Orquestração de LLM]]"
  - "[[guardrails_seguranca_llm|Guardrails e segurança de LLM]]"
ferramentasRecomendadas:
  - "[[langgraph|LangGraph]]"
  - "[[adk_agent_development_kit|ADK]]"
  - "[[crewai|CrewAI]]"
modelosRecomendados:
  - "[[claude_sonnet_5_5|Claude Sonnet 5.5]]"
  - "[[gpt_5_5|GPT-5.5]]"
criteriosDesempate:
  - lock-in
  - custo
  - privacidade-de-dados
criterioPadrao: lock-in
porte:
  - pessoa-fisica
  - pequena
  - media
  - grande
segmentos:
  - geral
nicho: ""
nivel: caso
eixo: tarefa
macro: "[[ia_aplicada_e_agentes|IA aplicada e agentes]]"
faixasPadrao:
  maisBarata:
    - "[[crewai|CrewAI]]"
    - "[[autogen|AutoGen]]"
    - tabela:smolagents
  custoBeneficio:
    - "[[langgraph|LangGraph]]"
    - "[[adk_agent_development_kit|ADK]]"
    - tabela:openai-agents-sdk
  qualidadeMaxima:
    - tabela:claude-agent-sdk
    - tabela:microsoft-agent-framework
    - tabela:amazon-bedrock-agentcore
variacoes:
  - id: agente-suporte-cliente
    nome: Agente de suporte ao cliente
    descricao: Agente que consulta base, abre ticket e escala para humano.
    funcionalidades:
      - "[[tool_use_funcionalidade|Tool use]]"
      - "[[recuperacao_aumentada_rag|Recuperação aumentada (RAG)]]"
      - "[[human_in_the_loop_funcionalidade|Human in the loop]]"
    herdaFerramentas: true
    parametros:
      - chave: Linguagem ou runtime
        valor: Python ou TypeScript com framework de agentes
        fonte: editorial
      - chave: Escala típica
        valor: Milhares de conversas por semana
        fonte: editorial
      - chave: Papel do agente
        valor: Atendimento com escala para humano
        fonte: editorial
  - id: agente-pesquisa-analise
    nome: Agente de pesquisa e análise
    descricao: Agente que busca, lê e consolida relatórios.
    funcionalidades:
      - "[[tool_use_funcionalidade|Tool use]]"
      - "[[busca_na_web|Busca na web]]"
      - "[[memoria_persistente|Memória persistente]]"
    herdaFerramentas: false
    maisBarata:
      - tabela:smolagents
      - "[[langgraph|LangGraph]]"
      - tabela:openai-agents-python
    custoBeneficio:
      - "[[firecrawl|Firecrawl]]"
      - tabela:tavily
      - "[[crewai|CrewAI]]"
    qualidadeMaxima:
      - tabela:claude-agent-sdk
      - tabela:exa
      - "[[perplexity|Perplexity]]"
    justificativaFerramentas: "Muda Papel do agente para analista que consolida fontes: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Linguagem ou runtime
        valor: Python com busca e leitura de páginas
        fonte: editorial
      - chave: Escala típica
        valor: Dezenas de relatórios por mês
        fonte: editorial
      - chave: Papel do agente
        valor: Analista que consolida fontes
        fonte: editorial
  - id: agente-operacoes-internas
    nome: Agente de operações internas
    descricao: Agente que executa rotinas em sistemas internos via ferramentas.
    funcionalidades:
      - "[[tool_use_funcionalidade|Tool use]]"
      - "[[orquestracao_de_fluxos|Orquestração de fluxos]]"
      - "[[saida_estruturada|Saída estruturada]]"
    herdaFerramentas: false
    maisBarata:
      - "[[langchain|LangChain]]"
      - tabela:litellm
      - tabela:haystack
    custoBeneficio:
      - "[[llamaindex|LlamaIndex]]"
      - tabela:dspy
      - tabela:portkey
    qualidadeMaxima:
      - "[[langgraph|LangGraph]]"
      - tabela:semantic-kernel
      - tabela:vercel-ai-sdk
    justificativaFerramentas: "Muda Papel do agente para operador que executa tarefas por API: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Linguagem ou runtime
        valor: Python ou TypeScript com orquestração de ferramentas
        fonte: editorial
      - chave: Escala típica
        valor: Rotinas em sistemas internos
        fonte: editorial
      - chave: Papel do agente
        valor: Operador que executa tarefas por API
        fonte: editorial
tags:
  - caso-de-uso
  - ia
---
# Construção de agentes
## 📝 Descrição
Projetar e implementar agentes que usam ferramentas para cumprir objetivos.
## ⏰ Quando aplicar
- Assistentes com ações em sistemas
- Protótipos de agentes para produção
## 🧩 Funcionalidades necessárias
- [[tool_use_funcionalidade|Tool use]] - Capacidade do modelo de chamar funções e ferramentas externas com argumentos estruturados.
- [[orquestracao_de_fluxos|Orquestração de fluxos]] - Encadeamento de passos, ramificações e retentativas em fluxos controlados.
- [[memoria_persistente|Memória persistente]] - Retenção de informações entre sessões para manter contexto de longo prazo.
- [[saida_estruturada|Saída estruturada]] - Respostas que seguem um esquema, como JSON validado, para uso direto por programas.
## ✅ Recomendações
- [[langgraph|LangGraph]] - Grafos de estado com controle fino do fluxo
- [[adk_agent_development_kit|ADK]] - Kit com deploy e avaliação para agentes em nuvem
- [[crewai|CrewAI]] - Papéis e tarefas para times de agentes
- [[claude_sonnet_5_5|Claude Sonnet 5.5]] - Uso confiável de ferramentas em loops longos
- [[gpt_5_5|GPT-5.5]] - Chamada de funções madura e saída estruturada
## 🧬 Variações
- **Agente de suporte ao cliente** (`agente-suporte-cliente`): Agente que consulta base, abre ticket e escala para humano. Funcionalidades: [[tool_use_funcionalidade|Tool use]], [[recuperacao_aumentada_rag|Recuperação aumentada (RAG)]], [[human_in_the_loop_funcionalidade|Human in the loop]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Linguagem ou runtime: Python ou TypeScript com framework de agentes; Escala típica: Milhares de conversas por semana; Papel do agente: Atendimento com escala para humano.
- **Agente de pesquisa e análise** (`agente-pesquisa-analise`): Agente que busca, lê e consolida relatórios. Funcionalidades: [[tool_use_funcionalidade|Tool use]], [[busca_na_web|Busca na web]], [[memoria_persistente|Memória persistente]]. Mais barata: smolagents, [[langgraph|LangGraph]], OpenAI Agents SDK. Custo-benefício: [[firecrawl|Firecrawl]], Tavily, [[crewai|CrewAI]]. Qualidade máxima: Claude Agent SDK, Exa, [[perplexity|Perplexity]]. Por que difere do caso: Muda Papel do agente para analista que consolida fontes: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Linguagem ou runtime: Python com busca e leitura de páginas; Escala típica: Dezenas de relatórios por mês; Papel do agente: Analista que consolida fontes.
- **Agente de operações internas** (`agente-operacoes-internas`): Agente que executa rotinas em sistemas internos via ferramentas. Funcionalidades: [[tool_use_funcionalidade|Tool use]], [[orquestracao_de_fluxos|Orquestração de fluxos]], [[saida_estruturada|Saída estruturada]]. Mais barata: [[langchain|LangChain]], LiteLLM, Haystack. Custo-benefício: [[llamaindex|LlamaIndex]], DSPy, Portkey. Qualidade máxima: [[langgraph|LangGraph]], Semantic Kernel, Vercel AI SDK. Por que difere do caso: Muda Papel do agente para operador que executa tarefas por API: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Linguagem ou runtime: Python ou TypeScript com orquestração de ferramentas; Escala típica: Rotinas em sistemas internos; Papel do agente: Operador que executa tarefas por API.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[crewai|CrewAI]], [[autogen|AutoGen]], smolagents
- **Custo-benefício:** [[langgraph|LangGraph]], [[adk_agent_development_kit|ADK]], OpenAI Agents SDK
- **Qualidade máxima:** Claude Agent SDK, Microsoft Agent Framework, Amazon Bedrock AgentCore
## ⚖️ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** lock-in. O framework define o código do agente, e escolher abstrações abertas e portáveis reduz o custo de trocar depois.
## 🔗 Relacionamentos
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Casos de Uso de IA
- **Macro:** [[ia_aplicada_e_agentes|IA aplicada e agentes]]
