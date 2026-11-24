---
id: react_agente
tipo: padrao
nome: ReAct
aliases:
  - ReAct
  - Reason and Act
  - Reasoning and Acting
descricao: "O modelo alterna raciocínio e ação: pensa sobre o próximo passo, chama uma ferramenta, observa o resultado e repete até concluir. É o laço básico de muitos agentes."
fonte_ids:
  - arxiv_react
  - anthropic_agents
exemplo: O agente pensa que precisa do preço atual, chama a ferramenta de busca, lê o resultado e responde.
quando_usar:
  - Tarefas abertas em que o próximo passo depende do resultado do anterior
  - Agentes que usam busca, código e APIs
  - Depuração com rastros de raciocínio visíveis
quando_evitar:
  - Fluxos previsíveis com passos fixos (use Prompt Chaining)
  - Tarefas curtas sem ferramentas
status: revisado
publico: false
fontes:
  - id: arxiv_react
    tipo: artigo
    titulo: "ReAct: Synergizing Reasoning and Acting in Language Models (Yao et al.)"
    link: https://arxiv.org/abs/2210.03629
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: anthropic_agents
    tipo: artigo
    titulo: Building effective agents (Anthropic)
    link: https://www.anthropic.com/research/building-effective-agents
    status_revisao: revisada
    proxima_revisao: 2027-11-22
categorias:
  - "[[framework_agentes|Framework de agentes]]"
  - "[[orquestracao_llm|Orquestração de LLM]]"
familia: ia
subfamilia: Agentes e fluxos
problema: Só raciocinar (sem consultar o mundo) leva a alucinações, e só agir (sem raciocinar) leva a ações desordenadas.
tradeoffs:
  - "Ganha: flexibilidade para tarefas imprevisíveis; paga: custo e latência de vários ciclos de LLM"
  - "Ganha: rastro de raciocínio auditável; paga: risco de loops e de desvio sem limites de passos"
consequencias:
  - Limite de iterações e critério de parada são obrigatórios
  - Cada ferramenta precisa de descrição clara e erros informativos
padroesRelacionados:
  - "[[agentic_rag|Agentic RAG]]"
  - "[[plan_and_execute|Plan-and-Execute]]"
  - "[[reflection|Reflection]]"
  - "[[tool_use|Tool Use (padrão)]]"
casosDeUso:
  - "[[construcao_de_agentes|Construção de agentes]]"
  - "[[agentes_autonomos_de_longa_duracao|Agentes autônomos de longa duração]]"
  - "[[pesquisa_aprofundada|Pesquisa aprofundada]]"
  - "[[agente_que_usa_o_computador|Agente que usa o computador]]"
variacoes: []
ferramentas:
  - "[[langgraph|LangGraph]]"
  - "[[langchain|LangChain]]"
  - tabela:openai-agents-sdk
  - "[[adk_agent_development_kit|ADK]]"
  - "[[crewai|CrewAI]]"
  - "[[claude_code|Claude-Code]]"
  - tabela:strands-agents
  - tabela:koog
  - tabela:pydantic-ai
  - tabela:mastra
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# ReAct
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
