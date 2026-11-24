---
id: agentic_rag
tipo: padrao
nome: Agentic RAG
aliases:
  - RAG agêntico
descricao: Um agente decide quando e o que recuperar, reformula consultas, escolhe fontes, avalia a qualidade dos resultados e repete a busca até ter evidência suficiente.
fonte_ids:
  - arxiv_agentic_rag
  - arxiv_selfrag
  - anthropic_agents
exemplo: O agente reformula a pergunta, busca em dois índices, nota que falta o dado de preços e faz uma terceira busca antes de responder.
quando_usar:
  - Perguntas multi-hop que exigem várias buscas
  - Várias fontes (documentos, SQL, web) com seleção dinâmica
  - Respostas que precisam validar a própria evidência
quando_evitar:
  - Perguntas simples em que o RAG direto basta
  - Cenários com orçamento de latência e custo apertado
status: revisado
publico: false
fontes:
  - id: arxiv_agentic_rag
    tipo: artigo
    titulo: "Agentic Retrieval-Augmented Generation: A Survey on Agentic RAG (Singh et al.)"
    link: https://arxiv.org/abs/2501.09136
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: arxiv_selfrag
    tipo: artigo
    titulo: "Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection (Asai et al.)"
    link: https://arxiv.org/abs/2310.11511
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: anthropic_agents
    tipo: artigo
    titulo: Building effective agents (Anthropic)
    link: https://www.anthropic.com/research/building-effective-agents
    status_revisao: revisada
    proxima_revisao: 2027-11-22
categorias:
  - "[[rag_categoria|Ferramentas de RAG]]"
  - "[[framework_agentes|Framework de agentes]]"
  - "[[orquestracao_llm|Orquestração de LLM]]"
familia: ia
subfamilia: RAG
problema: O RAG de um único passo falha em perguntas compostas, ambíguas ou que exigem fontes diferentes, pois recupera uma vez e responde com o que veio.
tradeoffs:
  - "Ganha: cobertura e precisão em perguntas complexas; paga: mais chamadas de LLM, latência e custo imprevisível"
  - "Ganha: autocorreção da recuperação; paga: comportamento menos determinístico e mais difícil de testar"
consequencias:
  - Limite de passos e orçamento de tokens evita loops
  - Avaliação precisa medir o caminho do agente, não só a resposta final
padroesRelacionados:
  - "[[busca_hibrida_reranking|Busca Híbrida e Reranking]]"
  - "[[graphrag|GraphRAG]]"
  - "[[rag|RAG (padrão)]]"
  - "[[react_agente|ReAct (padrão)]]"
  - "[[reflection|Reflection]]"
  - "[[tool_use|Tool Use (padrão)]]"
casosDeUso:
  - "[[rag_sobre_base_de_conhecimento|RAG sobre base de conhecimento]]"
  - "[[pesquisa_aprofundada|Pesquisa aprofundada]]"
  - "[[construcao_de_agentes|Construção de agentes]]"
  - "[[agentes_autonomos_de_longa_duracao|Agentes autônomos de longa duração]]"
variacoes: []
ferramentas:
  - "[[langgraph|LangGraph]]"
  - "[[llamaindex|LlamaIndex]]"
  - "[[langchain|LangChain]]"
  - tabela:haystack
  - tabela:openai-agents-sdk
  - tabela:amazon-bedrock-knowledge-bases
  - tabela:strands-agents
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Agentic RAG
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
