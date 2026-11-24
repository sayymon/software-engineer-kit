---
id: llm_as_judge
tipo: padrao
nome: LLM-as-Judge
aliases:
  - Modelo como juiz
  - LLM como avaliador
descricao: Usa um LLM para avaliar respostas de outro modelo (ou do mesmo) segundo uma rubrica, o que permite medir qualidade em escala quando métricas automáticas não bastam.
fonte_ids:
  - arxiv_llm_judge
  - anthropic_agents
exemplo: Um juiz pontua cada resposta do RAG de 1 a 5 em fidelidade ao contexto e o pipeline falha se a média cair abaixo de 4.
quando_usar:
  - Avaliação contínua de prompts, RAG e agentes
  - Comparação A/B entre modelos ou versões de prompt
  - Filtros de qualidade em produção
quando_evitar:
  - Tarefas com resposta objetiva verificável por código (teste automatizado é melhor)
  - Decisões de alto risco sem validação por humanos
status: revisado
publico: false
fontes:
  - id: arxiv_llm_judge
    tipo: artigo
    titulo: Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena (Zheng et al.)
    link: https://arxiv.org/abs/2306.05685
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: anthropic_agents
    tipo: artigo
    titulo: Building effective agents (Anthropic)
    link: https://www.anthropic.com/research/building-effective-agents
    status_revisao: revisada
    proxima_revisao: 2027-11-22
categorias:
  - "[[evals_observabilidade|Evals e observabilidade]]"
familia: ia
subfamilia: Qualidade e segurança
problema: Avaliação humana não escala e métricas lexicais (BLEU, ROUGE) não capturam qualidade de respostas abertas.
tradeoffs:
  - "Ganha: avaliação escalável e barata; paga: vieses do juiz (posição, verbosidade, autopreferência)"
  - "Ganha: rubricas flexíveis; paga: precisa de calibração contra avaliações humanas"
consequencias:
  - Calibre o juiz com um conjunto dourado rotulado por pessoas
  - Use rubricas curtas e saída estruturada com justificativa
padroesRelacionados:
  - "[[evaluator_optimizer|Evaluator-Optimizer]]"
  - "[[guardrails_llm|Guardrails]]"
  - "[[human_in_the_loop|Human-in-the-Loop]]"
  - "[[model_cascade|Model Cascade]]"
  - "[[parallelization_llm|Parallelization]]"
  - "[[reflection|Reflection]]"
casosDeUso:
  - "[[avaliacao_de_prompts|Avaliação de prompts]]"
  - "[[observabilidade_em_producao|Observabilidade em produção]]"
  - "[[rag_sobre_base_de_conhecimento|RAG sobre base de conhecimento]]"
  - "[[construcao_de_agentes|Construção de agentes]]"
variacoes: []
ferramentas:
  - "[[promptfoo|Promptfoo]]"
  - tabela:ragas
  - tabela:langsmith
  - tabela:arize-phoenix
  - "[[langfuse|LangFuse]]"
  - tabela:dspy
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# LLM-as-Judge
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
