---
id: prompt_chaining
tipo: padrao
nome: Prompt Chaining
aliases:
  - Encadeamento de prompts
descricao: Decompõe a tarefa em uma sequência fixa de chamadas de LLM, em que a saída de cada etapa alimenta a seguinte, com verificações intermediárias opcionais.
fonte_ids:
  - anthropic_agents
  - gcp_agentic_patterns
  - azure_ai_agent_patterns
exemplo: Primeiro o modelo gera um roteiro, depois valida o tom e por fim traduz o texto final.
quando_usar:
  - Tarefas decomponíveis em passos fixos (rascunho, revisão, tradução)
  - Troca de latência por precisão em cada etapa
  - Pontos de validação entre etapas (gates)
quando_evitar:
  - Tarefas simples que um prompt resolve
  - Fluxos que exigem decisões dinâmicas sobre os passos (use ReAct ou Orchestrator-Workers)
status: revisado
publico: false
fontes:
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
  - id: azure_ai_agent_patterns
    tipo: artigo
    titulo: AI agent orchestration patterns (Azure Architecture Center)
    link: https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns
    status_revisao: revisada
    proxima_revisao: 2027-11-22
categorias:
  - "[[orquestracao_llm|Orquestração de LLM]]"
  - "[[framework_agentes|Framework de agentes]]"
familia: ia
subfamilia: Agentes e fluxos
problema: Um prompt único para uma tarefa composta gera resultados inconsistentes, e cada subproblema se beneficia de instruções focadas.
tradeoffs:
  - "Ganha: precisão e depuração por etapa; paga: latência e custo somados"
  - "Ganha: previsibilidade; paga: rigidez quando a tarefa foge do roteiro previsto"
consequencias:
  - Cada etapa deve ter entrada e saída tipadas (Structured Output)
  - Falhas em uma etapa precisam de tratamento explícito
padroesRelacionados:
  - "[[evaluator_optimizer|Evaluator-Optimizer]]"
  - "[[parallelization_llm|Parallelization]]"
  - "[[routing_llm|Routing]]"
  - "[[structured_output|Structured Output]]"
casosDeUso:
  - "[[geracao_de_conteudo|Geração de conteúdo]]"
  - "[[construcao_de_agentes|Construção de agentes]]"
  - "[[redacao_e_copywriting|Redação e copywriting]]"
  - "[[resumo_de_documentos|Resumo de documentos]]"
variacoes: []
ferramentas:
  - "[[langchain|LangChain]]"
  - "[[langgraph|LangGraph]]"
  - tabela:dspy
  - tabela:vercel-ai-sdk
  - tabela:semantic-kernel
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Prompt Chaining
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
