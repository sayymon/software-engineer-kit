---
id: parallelization_llm
tipo: padrao
nome: Parallelization
aliases:
  - Paralelização
  - Sectioning e Voting
descricao: "Executa várias chamadas de LLM ao mesmo tempo: dividindo a tarefa em partes independentes (sectioning) ou repetindo a mesma tarefa para agregar por votação."
fonte_ids:
  - anthropic_agents
  - gcp_agentic_patterns
exemplo: Cinco chamadas classificam o mesmo documento e a categoria mais votada vence.
quando_usar:
  - Subtarefas independentes (revisar várias seções ao mesmo tempo)
  - Votação entre várias respostas para aumentar a confiança
  - Guardrails rodando em paralelo à geração
quando_evitar:
  - Etapas que dependem do resultado anterior
  - Limites de taxa do provedor que impedem a concorrência
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
categorias:
  - "[[orquestracao_llm|Orquestração de LLM]]"
  - "[[framework_agentes|Framework de agentes]]"
familia: ia
subfamilia: Agentes e fluxos
problema: Processar subtarefas independentes em sequência é lento, e uma única resposta carece de confiança em decisões sensíveis.
tradeoffs:
  - "Ganha: latência menor e maior confiança por consenso; paga: custo multiplicado pelo número de chamadas"
  - "Ganha: especialização por parte; paga: agregação dos resultados exige lógica adicional"
consequencias:
  - Rate limits e orçamento de tokens definem o grau de paralelismo
  - Agregue por regra determinística sempre que possível
padroesRelacionados:
  - "[[llm_as_judge|LLM-as-Judge]]"
  - "[[orchestrator_workers|Orchestrator-Workers]]"
  - "[[prompt_chaining|Prompt Chaining]]"
casosDeUso:
  - "[[classificacao_e_extracao_em_alto_volume|Classificação e extração em alto volume]]"
  - "[[construcao_de_agentes|Construção de agentes]]"
  - "[[analise_de_documentos_e_imagens|Análise de documentos e imagens]]"
  - "[[avaliacao_de_prompts|Avaliação de prompts]]"
variacoes: []
ferramentas:
  - "[[langgraph|LangGraph]]"
  - tabela:litellm
  - "[[temporal|Temporal]]"
  - "[[langchain|LangChain]]"
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Parallelization
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
