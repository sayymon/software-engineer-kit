---
id: evaluator_optimizer
tipo: padrao
nome: Evaluator-Optimizer
aliases:
  - Gerador e avaliador
descricao: Um LLM gera a resposta e outro a avalia com critérios explícitos, devolvendo feedback em um laço até a saída atingir a qualidade desejada.
fonte_ids:
  - anthropic_agents
  - arxiv_llm_judge
  - arxiv_reflexion
exemplo: O gerador traduz um contrato e o avaliador aponta termos jurídicos imprecisos até a revisão passar.
quando_usar:
  - Tradução e escrita com critérios definidos
  - Busca em que várias rodadas refinam o resultado
  - Geração de código com avaliação automatizada
quando_evitar:
  - Critérios vagos, em que o avaliador não dá feedback acionável
  - Casos em que uma geração já atende ao requisito
status: revisado
publico: false
fontes:
  - id: anthropic_agents
    tipo: artigo
    titulo: Building effective agents (Anthropic)
    link: https://www.anthropic.com/research/building-effective-agents
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: arxiv_llm_judge
    tipo: artigo
    titulo: Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena (Zheng et al.)
    link: https://arxiv.org/abs/2306.05685
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: arxiv_reflexion
    tipo: artigo
    titulo: "Reflexion: Language Agents with Verbal Reinforcement Learning (Shinn et al.)"
    link: https://arxiv.org/abs/2303.11366
    status_revisao: revisada
    proxima_revisao: 2027-11-22
categorias:
  - "[[evals_observabilidade|Evals e observabilidade]]"
  - "[[framework_agentes|Framework de agentes]]"
familia: ia
subfamilia: Agentes e fluxos
problema: Quando existem critérios claros de qualidade, a primeira geração raramente os atende, e a iteração humana é cara.
tradeoffs:
  - "Ganha: qualidade crescente por iteração; paga: custo e latência de vários ciclos"
  - "Ganha: critérios explícitos e auditáveis; paga: o avaliador herda vieses e pode premiar respostas erradas"
consequencias:
  - Defina um teto de iterações e um critério numérico de aceite
  - Calibre o avaliador contra amostras avaliadas por humanos
padroesRelacionados:
  - "[[llm_as_judge|LLM-as-Judge]]"
  - "[[prompt_chaining|Prompt Chaining]]"
  - "[[reflection|Reflection]]"
casosDeUso:
  - "[[avaliacao_de_prompts|Avaliação de prompts]]"
  - "[[revisao_e_correcao_de_texto|Revisão e correção de texto]]"
  - "[[traducao_de_textos|Tradução de textos]]"
  - "[[construcao_de_agentes|Construção de agentes]]"
variacoes: []
ferramentas:
  - "[[promptfoo|Promptfoo]]"
  - tabela:dspy
  - "[[langgraph|LangGraph]]"
  - tabela:langsmith
  - tabela:ragas
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Evaluator-Optimizer
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
