---
id: human_in_the_loop
tipo: padrao
nome: Human-in-the-Loop
aliases:
  - HITL
  - Humano no ciclo
descricao: Inclui pontos de aprovação, correção ou escolha humana em um fluxo automatizado, especialmente antes de ações irreversíveis ou de baixa confiança.
fonte_ids:
  - langgraph_hitl
  - anthropic_agents
  - gcp_agentic_patterns
exemplo: O agente prepara o reembolso e aguarda a aprovação de uma pessoa antes de executar o pagamento.
quando_usar:
  - Ações financeiras, jurídicas ou destrutivas
  - Saídas com baixa confiança do modelo
  - Fases iniciais de um agente, para calibrar confiança e coletar exemplos
quando_evitar:
  - Tarefas de baixo risco em alto volume, em que a aprovação vira gargalo
  - Fluxos em que a latência humana inviabiliza o caso de uso
status: revisado
publico: false
fontes:
  - id: langgraph_hitl
    tipo: artigo
    titulo: Human-in-the-loop (documentação LangGraph)
    link: https://langchain-ai.github.io/langgraph/concepts/human_in_the_loop/
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
  - "[[orquestracao_workflows_sagas|Orquestração de workflows e sagas]]"
familia: ia
subfamilia: Agentes e fluxos
problema: Agentes erram e algumas ações (pagar, apagar, enviar) têm custo alto ou irreversível.
tradeoffs:
  - "Ganha: segurança e responsabilização; paga: latência e necessidade de pessoas disponíveis"
  - "Ganha: dados de feedback para melhorar o agente; paga: fadiga de aprovação se os pontos forem excessivos"
consequencias:
  - O estado do fluxo precisa ser persistido enquanto aguarda a decisão
  - Aprovações devem mostrar contexto suficiente para decidir rápido
padroesRelacionados:
  - "[[guardrails_llm|Guardrails]]"
  - "[[llm_as_judge|LLM-as-Judge]]"
  - "[[multi_agent|Multi-Agent]]"
  - "[[plan_and_execute|Plan-and-Execute]]"
  - "[[reflection|Reflection]]"
  - "[[tool_use|Tool Use (padrão)]]"
casosDeUso:
  - "[[construcao_de_agentes|Construção de agentes]]"
  - "[[agentes_autonomos_de_longa_duracao|Agentes autônomos de longa duração]]"
  - "[[atendimento_e_suporte|Atendimento e suporte]]"
  - "[[pagamentos_e_cobranca|Pagamentos e cobrança]]"
variacoes: []
ferramentas:
  - "[[langgraph|LangGraph]]"
  - "[[temporal|Temporal]]"
  - "[[adk_agent_development_kit|ADK]]"
  - tabela:camunda
  - tabela:openai-agents-sdk
  - "[[kiro_cli|Kiro CLI]]"
  - "[[kiro_crew|Kiro Crew]]"
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Human-in-the-Loop
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
