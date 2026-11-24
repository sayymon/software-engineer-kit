---
id: reflection
tipo: padrao
nome: Reflection
aliases:
  - Autorreflexão
  - Self-Refine
  - Reflexion
descricao: O modelo critica a própria saída (ou outro modelo a critica) e a revisa em novos ciclos, usando o feedback para melhorar o resultado.
fonte_ids:
  - arxiv_reflexion
  - anthropic_agents
exemplo: O agente escreve a função, roda os testes, lê a falha e corrige o código até os testes passarem.
quando_usar:
  - Geração de código com testes como sinal de feedback
  - Textos com critérios claros de qualidade
  - Tarefas em que a verificação é mais fácil que a geração
quando_evitar:
  - Respostas simples em que a primeira tentativa basta
  - Quando não existe critério objetivo e o modelo reforça os próprios erros
status: revisado
publico: false
fontes:
  - id: arxiv_reflexion
    tipo: artigo
    titulo: "Reflexion: Language Agents with Verbal Reinforcement Learning (Shinn et al.)"
    link: https://arxiv.org/abs/2303.11366
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
  - "[[evals_observabilidade|Evals e observabilidade]]"
familia: ia
subfamilia: Agentes e fluxos
problema: A primeira resposta de um LLM costuma ter falhas que ele mesmo consegue identificar quando solicitado a revisar.
tradeoffs:
  - "Ganha: qualidade maior em tarefas verificáveis; paga: múltiplas chamadas de LLM e latência"
  - "Ganha: autocorreção sem intervenção humana; paga: risco de ciclos sem convergência"
consequencias:
  - Defina um limite de iterações e um critério objetivo de parada
  - Feedback externo (testes, linters) supera a autocrítica pura
padroesRelacionados:
  - "[[agent_memory|Agent Memory]]"
  - "[[agentic_rag|Agentic RAG]]"
  - "[[evaluator_optimizer|Evaluator-Optimizer]]"
  - "[[human_in_the_loop|Human-in-the-Loop]]"
  - "[[llm_as_judge|LLM-as-Judge]]"
  - "[[plan_and_execute|Plan-and-Execute]]"
  - "[[react_agente|ReAct (padrão)]]"
casosDeUso:
  - "[[construcao_de_agentes|Construção de agentes]]"
  - "[[depuracao_e_correcao_de_bugs|Depuração e correção de bugs]]"
  - "[[revisao_e_correcao_de_texto|Revisão e correção de texto]]"
  - "[[automacao_de_desenvolvimento|Automação de desenvolvimento]]"
variacoes: []
ferramentas:
  - "[[langgraph|LangGraph]]"
  - tabela:dspy
  - "[[claude_code|Claude-Code]]"
  - "[[promptfoo|Promptfoo]]"
  - "[[langchain|LangChain]]"
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Reflection
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
