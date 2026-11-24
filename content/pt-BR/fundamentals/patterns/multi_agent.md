---
id: multi_agent
tipo: padrao
nome: Multi-Agent
aliases:
  - Multiagente
  - Sistemas multiagentes
descricao: Vários agentes com papéis, prompts e ferramentas próprios colaboram por conversa ou por um fluxo definido, e cada um resolve uma parte do problema.
fonte_ids:
  - arxiv_autogen
  - anthropic_agents
  - azure_ai_agent_patterns
exemplo: Um agente pesquisador reúne fontes, outro redige o relatório e um terceiro o revisa antes da entrega.
quando_usar:
  - Tarefas que se dividem em papéis distintos (pesquisa, escrita, revisão)
  - Contextos que cresceriam demais em um único agente
  - Cenários com checagem cruzada entre agentes
quando_evitar:
  - Tarefas que um agente único resolve bem
  - Quando o custo e a latência de coordenar vários agentes superam o ganho
status: revisado
publico: false
fontes:
  - id: arxiv_autogen
    tipo: artigo
    titulo: "AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation (Wu et al.)"
    link: https://arxiv.org/abs/2308.08155
    status_revisao: revisada
    proxima_revisao: 2027-11-22
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
categorias:
  - "[[framework_agentes|Framework de agentes]]"
  - "[[orquestracao_llm|Orquestração de LLM]]"
familia: ia
subfamilia: Agentes e fluxos
problema: Um único agente com todas as ferramentas e instruções se confunde em tarefas amplas, e o contexto fica sobrecarregado.
tradeoffs:
  - "Ganha: especialização e contexto separado por papel; paga: custo, latência e coordenação mais complexos"
  - "Ganha: revisão cruzada; paga: erros se propagam e amplificam entre agentes sem controle"
consequencias:
  - Protocolos de handoff e de memória compartilhada precisam de desenho explícito
  - Comece com um agente e divida só quando medir a necessidade
padroesRelacionados:
  - "[[agent_memory|Agent Memory]]"
  - "[[human_in_the_loop|Human-in-the-Loop]]"
  - "[[orchestrator_workers|Orchestrator-Workers]]"
  - "[[tool_use|Tool Use (padrão)]]"
casosDeUso:
  - "[[sistemas_multiagentes|Sistemas multiagentes]]"
  - "[[construcao_de_agentes|Construção de agentes]]"
  - "[[agentes_autonomos_de_longa_duracao|Agentes autônomos de longa duração]]"
  - "[[pesquisa_aprofundada|Pesquisa aprofundada]]"
variacoes: []
ferramentas:
  - "[[crewai|CrewAI]]"
  - "[[autogen|AutoGen]]"
  - "[[langgraph|LangGraph]]"
  - "[[adk_agent_development_kit|ADK]]"
  - tabela:openai-agents-sdk
  - "[[kiro_ide|Kiro-IDE]]"
  - "[[kiro_crew|Kiro Crew]]"
  - tabela:strands-agents
  - tabela:koog
notaCompleta:
  - "[[sistemas_multiagentes|Sistemas Multiagentes]]"
dataVerificacao: 2026-11-22
tags:
  - padrao
guia_ids:
  - tec_multi_agent
---
# Multi-Agent
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
