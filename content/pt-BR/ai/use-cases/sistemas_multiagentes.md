---
id: sistemas_multiagentes
tipo: caso-de-uso
nome: Sistemas multiagentes
aliases:
  - sistemas-multiagentes
descricao: Coordenar vários agentes especializados em uma tarefa maior.
funcionalidadesNecessarias:
  - "[[multiagente|Multiagente]]"
  - "[[orquestracao_de_fluxos|Orquestração de fluxos]]"
  - "[[tool_use_funcionalidade|Tool use]]"
  - "[[checkpoints_de_estado|Checkpoints de estado]]"
categoriasRelacionadas:
  - "[[framework_agentes|Framework de agentes]]"
  - "[[orquestracao_llm|Orquestração de LLM]]"
ferramentasRecomendadas:
  - "[[crewai|CrewAI]]"
  - "[[langgraph|LangGraph]]"
  - "[[adk_agent_development_kit|ADK]]"
modelosRecomendados:
  - "[[claude_opus_5_5|Claude Opus 5.5]]"
  - "[[claude_haiku_5_5|Claude Haiku 5.5]]"
criteriosDesempate:
  - custo
  - privacidade-de-dados
  - lock-in
criterioPadrao: custo
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
  - id: multi-equipe-papeis
    nome: Equipe com papéis
    descricao: Agentes planejador, executor e revisor com tarefas separadas.
    funcionalidades:
      - "[[multiagente|Multiagente]]"
      - "[[orquestracao_de_fluxos|Orquestração de fluxos]]"
    herdaFerramentas: true
    parametros:
      - chave: Linguagem ou runtime
        valor: Python com framework de equipes de agentes
        fonte: editorial
      - chave: Escala típica
        valor: Três a cinco agentes por tarefa
        fonte: editorial
      - chave: Padrão de coordenação
        valor: Papéis fixos de planejar, executar e revisar
        fonte: editorial
  - id: multi-orquestrador-subagentes
    nome: Orquestrador com subagentes
    descricao: Agente central que delega a subagentes em paralelo.
    funcionalidades:
      - "[[multiagente|Multiagente]]"
      - "[[tool_use_funcionalidade|Tool use]]"
      - "[[checkpoints_de_estado|Checkpoints de estado]]"
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
    justificativaFerramentas: "Muda Padrão de coordenação para orquestrador central que delega: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Linguagem ou runtime
        valor: Python ou TypeScript com grafo de agentes
        fonte: editorial
      - chave: Escala típica
        valor: Subagentes em paralelo
        fonte: editorial
      - chave: Padrão de coordenação
        valor: Orquestrador central que delega
        fonte: editorial
  - id: multi-debate-verificacao
    nome: Debate e verificação cruzada
    descricao: Agentes que revisam as respostas uns dos outros.
    funcionalidades:
      - "[[multiagente|Multiagente]]"
      - "[[raciocinio|Raciocínio]]"
      - "[[avaliacao_de_qualidade|Avaliação de qualidade]]"
    herdaFerramentas: true
    parametros:
      - chave: Linguagem ou runtime
        valor: Python com framework de equipes de agentes
        fonte: editorial
      - chave: Escala típica
        valor: Duas a quatro rodadas por pergunta
        fonte: editorial
      - chave: Padrão de coordenação
        valor: Agentes que revisam uns aos outros
        fonte: editorial
tags:
  - caso-de-uso
  - ia
---
# Sistemas multiagentes
## 📝 Descrição
Coordenar vários agentes especializados em uma tarefa maior.
## ⏰ Quando aplicar
- Pipelines com papéis distintos
- Revisão cruzada entre agentes
## 🧩 Funcionalidades necessárias
- [[multiagente|Multiagente]] - Colaboração entre vários agentes com papéis distintos.
- [[orquestracao_de_fluxos|Orquestração de fluxos]] - Encadeamento de passos, ramificações e retentativas em fluxos controlados.
- [[tool_use_funcionalidade|Tool use]] - Capacidade do modelo de chamar funções e ferramentas externas com argumentos estruturados.
- [[checkpoints_de_estado|Checkpoints de estado]] - Gravação do estado de uma execução para retomar, repetir ou depurar.
## ✅ Recomendações
- [[crewai|CrewAI]] - Define papéis, tarefas e colaboração entre agentes
- [[langgraph|LangGraph]] - Estado compartilhado e retomada de execuções
- [[adk_agent_development_kit|ADK]] - Agentes hierárquicos com deploy gerenciado
- [[claude_opus_5_5|Claude Opus 5.5]] - Coordenação de tarefas longas e complexas
- [[claude_haiku_5_5|Claude Haiku 5.5]] - Subagentes rápidos e baratos para trabalho paralelo
## 🧬 Variações
- **Equipe com papéis** (`multi-equipe-papeis`): Agentes planejador, executor e revisor com tarefas separadas. Funcionalidades: [[multiagente|Multiagente]], [[orquestracao_de_fluxos|Orquestração de fluxos]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Linguagem ou runtime: Python com framework de equipes de agentes; Escala típica: Três a cinco agentes por tarefa; Padrão de coordenação: Papéis fixos de planejar, executar e revisar.
- **Orquestrador com subagentes** (`multi-orquestrador-subagentes`): Agente central que delega a subagentes em paralelo. Funcionalidades: [[multiagente|Multiagente]], [[tool_use_funcionalidade|Tool use]], [[checkpoints_de_estado|Checkpoints de estado]]. Mais barata: [[langchain|LangChain]], LiteLLM, Haystack. Custo-benefício: [[llamaindex|LlamaIndex]], DSPy, Portkey. Qualidade máxima: [[langgraph|LangGraph]], Semantic Kernel, Vercel AI SDK. Por que difere do caso: Muda Padrão de coordenação para orquestrador central que delega: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Linguagem ou runtime: Python ou TypeScript com grafo de agentes; Escala típica: Subagentes em paralelo; Padrão de coordenação: Orquestrador central que delega.
- **Debate e verificação cruzada** (`multi-debate-verificacao`): Agentes que revisam as respostas uns dos outros. Funcionalidades: [[multiagente|Multiagente]], [[raciocinio|Raciocínio]], [[avaliacao_de_qualidade|Avaliação de qualidade]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Linguagem ou runtime: Python com framework de equipes de agentes; Escala típica: Duas a quatro rodadas por pergunta; Padrão de coordenação: Agentes que revisam uns aos outros.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[crewai|CrewAI]], [[autogen|AutoGen]], smolagents
- **Custo-benefício:** [[langgraph|LangGraph]], [[adk_agent_development_kit|ADK]], OpenAI Agents SDK
- **Qualidade máxima:** Claude Agent SDK, Microsoft Agent Framework, Amazon Bedrock AgentCore
## ⚖️ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** custo. Vários agentes multiplicam chamadas, então combinar um modelo forte coordenador com modelos baratos nos subagentes controla o gasto.
## 🔗 Relacionamentos
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Casos de Uso de IA
- **Macro:** [[ia_aplicada_e_agentes|IA aplicada e agentes]]
