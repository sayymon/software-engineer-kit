---
id: graphrag
tipo: padrao
nome: GraphRAG
aliases:
  - Graph RAG
descricao: Extrai entidades e relações dos documentos para montar um grafo de conhecimento e resumos de comunidades, usados na recuperação para responder perguntas que dependem de conexões e de visão global.
fonte_ids:
  - arxiv_graphrag
  - msft_graphrag
exemplo: O pipeline monta um grafo de empresas e contratos e responde quais fornecedores concentram risco em vários contratos.
quando_usar:
  - Perguntas de síntese sobre um corpus inteiro
  - Domínios ricos em relações (pessoas, empresas, contratos, componentes)
  - Investigação e due diligence com múltiplos saltos entre fatos
quando_evitar:
  - Perguntas pontuais respondidas por um trecho
  - Corpora pequenos ou sem entidades claras, em que o custo de indexação não se paga
status: revisado
publico: false
fontes:
  - id: arxiv_graphrag
    tipo: artigo
    titulo: "From Local to Global: A Graph RAG Approach to Query-Focused Summarization (Edge et al.)"
    link: https://arxiv.org/abs/2404.16130
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: msft_graphrag
    tipo: artigo
    titulo: GraphRAG (documentação Microsoft)
    link: https://microsoft.github.io/graphrag/
    status_revisao: revisada
    proxima_revisao: 2027-11-22
categorias:
  - "[[rag_categoria|Ferramentas de RAG]]"
  - "[[vector_store|Vector store]]"
familia: ia
subfamilia: RAG
problema: O RAG por trechos isolados responde mal perguntas globais (temas, relações entre entidades) que atravessam muitos documentos.
tradeoffs:
  - "Ganha: respostas globais e relacionais; paga: indexação cara (chamadas de LLM para extrair o grafo)"
  - "Ganha: explicabilidade pelas relações; paga: grafo e resumos precisam de atualização ao mudar os documentos"
consequencias:
  - O custo de indexação cresce com o volume do corpus
  - Qualidade depende da extração de entidades
padroesRelacionados:
  - "[[agentic_rag|Agentic RAG]]"
  - "[[busca_hibrida_reranking|Busca Híbrida e Reranking]]"
  - "[[rag|RAG (padrão)]]"
casosDeUso:
  - "[[rag_sobre_base_de_conhecimento|RAG sobre base de conhecimento]]"
  - "[[pesquisa_aprofundada|Pesquisa aprofundada]]"
  - "[[contratos_e_documentos_juridicos|Contratos e documentos jurídicos]]"
  - "[[analise_de_documentos_e_imagens|Análise de documentos e imagens]]"
variacoes: []
ferramentas:
  - tabela:microsoft-graphrag
  - "[[llamaindex|LlamaIndex]]"
  - "[[langchain|LangChain]]"
  - "[[neo4j|Neo4j]]"
  - tabela:memgraph
  - tabela:amazon-neptune
  - tabela:nebulagraph
  - tabela:graphiti
  - tabela:cognee
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# GraphRAG
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
