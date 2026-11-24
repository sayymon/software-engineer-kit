---
id: plan_and_execute
tipo: padrao
nome: Plan-and-Execute
aliases:
  - Planner-Executor
  - Planejar e executar
descricao: Um planejador gera o plano completo de passos e um executor (menor, mais barato) cumpre cada passo, com replanejamento quando algo falha.
fonte_ids:
  - arxiv_plan_solve
  - anthropic_agents
  - gcp_agentic_patterns
exemplo: O planejador define 5 passos para gerar um relatório e um modelo menor executa cada um com as ferramentas indicadas.
quando_usar:
  - Tarefas longas com etapas identificáveis
  - Reduzir custo usando modelo forte só para planejar
  - Fluxos que precisam de um plano revisável por humanos
quando_evitar:
  - Tarefas curtas ou muito exploratórias, em que o plano muda a cada observação
  - Cenários com passos totalmente fixos (um workflow simples basta)
status: revisado
publico: false
fontes:
  - id: arxiv_plan_solve
    tipo: artigo
    titulo: Plan-and-Solve Prompting (Wang et al.)
    link: https://arxiv.org/abs/2305.04091
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: anthropic_agents
    tipo: artigo
    titulo: Building effective agents (Anthropic)
    link: https://www.anthropic.com/research/building-effective-agents
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
problema: Agentes que decidem passo a passo perdem o objetivo em tarefas longas e gastam o modelo mais caro em cada decisão simples.
tradeoffs:
  - "Ganha: previsibilidade e custo menor por passo; paga: planos rígidos se adaptam mal a surpresas"
  - "Ganha: plano auditável antes da execução; paga: replanejamento adiciona complexidade"
consequencias:
  - Um ponto de aprovação humana sobre o plano reduz risco
  - O estado do plano precisa ser persistido (checkpoints)
padroesRelacionados:
  - "[[human_in_the_loop|Human-in-the-Loop]]"
  - "[[orchestrator_workers|Orchestrator-Workers]]"
  - "[[react_agente|ReAct (padrão)]]"
  - "[[reflection|Reflection]]"
casosDeUso:
  - "[[construcao_de_agentes|Construção de agentes]]"
  - "[[agentes_autonomos_de_longa_duracao|Agentes autônomos de longa duração]]"
  - "[[automacao_de_desenvolvimento|Automação de desenvolvimento]]"
  - "[[pesquisa_aprofundada|Pesquisa aprofundada]]"
variacoes: []
ferramentas:
  - "[[langgraph|LangGraph]]"
  - "[[adk_agent_development_kit|ADK]]"
  - "[[crewai|CrewAI]]"
  - "[[langchain|LangChain]]"
  - "[[claude_code|Claude-Code]]"
  - "[[kiro_ide|Kiro-IDE]]"
  - "[[kiro_cli|Kiro CLI]]"
  - tabela:strands-agents
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Plan-and-Execute
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
