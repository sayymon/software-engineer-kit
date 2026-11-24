---
id: orchestrator_workers
tipo: padrao
nome: Orchestrator-Workers
aliases:
  - Orquestrador e Workers
descricao: Um LLM orquestrador divide dinamicamente a tarefa em subtarefas, delega a workers (LLMs ou ferramentas) e sintetiza os resultados.
fonte_ids:
  - anthropic_agents
  - azure_ai_agent_patterns
  - gcp_agentic_patterns
exemplo: O orquestrador lista os arquivos afetados por uma refatoração e delega a edição de cada um a um worker.
quando_usar:
  - Mudanças de código em múltiplos arquivos
  - Pesquisa com fontes e subtemas imprevisíveis
  - Tarefas em que o número de subtarefas varia
quando_evitar:
  - Subtarefas fixas e conhecidas (use Parallelization ou Prompt Chaining)
  - Tarefas pequenas em que a coordenação custa mais que o trabalho
status: revisado
publico: false
fontes:
  - id: anthropic_agents
    tipo: artigo
    titulo: Building effective agents (Anthropic)
    link: https://www.anthropic.com/research/building-effective-agents
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: azure_ai_agent_patterns
    tipo: artigo
    titulo: AI agent orchestration patterns (Azure Architecture Center)
    link: https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: gcp_agentic_patterns
    tipo: artigo
    titulo: Choose a design pattern for your agentic AI system (Google Cloud Architecture Center)
    link: https://docs.cloud.google.com/architecture/choose-design-pattern-agentic-ai-system
    status_revisao: revisada
    proxima_revisao: 2027-11-22
categorias:
  - "[[framework_agentes|Framework de agentes]]"
  - "[[orquestracao_llm|Orquestração de LLM]]"
familia: ia
subfamilia: Agentes e fluxos
problema: Tarefas cujas subtarefas não são conhecidas de antemão (mudanças em vários arquivos, pesquisa ampla) não cabem em um fluxo fixo.
tradeoffs:
  - "Ganha: adaptação ao tamanho e à forma da tarefa; paga: custo e latência da orquestração"
  - "Ganha: workers especializados com contexto enxuto; paga: perda de contexto entre workers se o resumo for ruim"
consequencias:
  - O orquestrador precisa de contratos claros de entrada e saída dos workers
  - Observabilidade por subtarefa é indispensável
padroesRelacionados:
  - "[[multi_agent|Multi-Agent]]"
  - "[[parallelization_llm|Parallelization]]"
  - "[[plan_and_execute|Plan-and-Execute]]"
  - "[[routing_llm|Routing]]"
casosDeUso:
  - "[[sistemas_multiagentes|Sistemas multiagentes]]"
  - "[[construcao_de_agentes|Construção de agentes]]"
  - "[[automacao_de_desenvolvimento|Automação de desenvolvimento]]"
  - "[[pesquisa_aprofundada|Pesquisa aprofundada]]"
variacoes: []
ferramentas:
  - "[[langgraph|LangGraph]]"
  - "[[crewai|CrewAI]]"
  - "[[autogen|AutoGen]]"
  - "[[adk_agent_development_kit|ADK]]"
  - "[[claude_code|Claude-Code]]"
  - tabela:openai-agents-sdk
  - "[[kiro_crew|Kiro Crew]]"
  - tabela:strands-agents
  - tabela:embabel
notaCompleta:
  - "[[sistemas_multiagentes|Sistemas Multiagentes]]"
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Orchestrator-Workers
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
