---
id: busca_hibrida_reranking
tipo: padrao
nome: Busca Híbrida e Reranking
aliases:
  - Hybrid Search
  - Reranking
descricao: Combina busca lexical (BM25) e vetorial, funde os resultados e reordena os melhores candidatos com um modelo reranker mais preciso antes de montar o contexto.
fonte_ids:
  - arxiv_rag
  - gcp_agentic_patterns
exemplo: Busca BM25 e vetorial retornam 50 candidatos, a fusão por RRF os junta e o reranker devolve os 5 melhores.
quando_usar:
  - Bases com termos técnicos, SKUs, nomes próprios e códigos
  - RAG em que a precisão do top-k define a qualidade da resposta
  - Corpora grandes em que o recall inicial precisa de refinamento
quando_evitar:
  - Bases pequenas em que a busca vetorial simples já acerta
  - Cenários de latência muito baixa sem espaço para uma segunda etapa
status: revisado
publico: false
fontes:
  - id: arxiv_rag
    tipo: artigo
    titulo: Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (Lewis et al.)
    link: https://arxiv.org/abs/2005.11401
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: gcp_agentic_patterns
    tipo: artigo
    titulo: Choose a design pattern for your agentic AI system (Google Cloud Architecture Center)
    link: https://docs.cloud.google.com/architecture/choose-design-pattern-agentic-ai-system
    status_revisao: revisada
    proxima_revisao: 2027-11-22
categorias:
  - "[[rag_categoria|Ferramentas de RAG]]"
  - "[[vector_store|Vector store]]"
familia: ia
subfamilia: RAG
problema: A busca só vetorial erra termos exatos, siglas e códigos, e a ordem dos resultados nem sempre coloca o trecho mais útil no topo.
tradeoffs:
  - "Ganha: maior recall e precisão no topo; paga: latência e custo do reranker"
  - "Ganha: robustez a termos exatos; paga: dois índices e fusão (RRF) para ajustar"
consequencias:
  - Medir recall@k e MRR antes e depois evita complexidade sem retorno
  - O reranker costuma operar sobre 20 a 100 candidatos
padroesRelacionados:
  - "[[agentic_rag|Agentic RAG]]"
  - "[[graphrag|GraphRAG]]"
  - "[[rag|RAG (padrão)]]"
casosDeUso:
  - "[[rag_sobre_base_de_conhecimento|RAG sobre base de conhecimento]]"
  - "[[busca_semantica_em_acervos|Busca semântica em acervos]]"
  - "[[prototipacao_de_rag|Prototipação de RAG]]"
  - "[[geracao_de_embeddings_para_busca|Geração de embeddings para busca]]"
variacoes: []
ferramentas:
  - tabela:cohere-rerank
  - "[[pgvector|pgvector]]"
  - tabela:qdrant
  - tabela:weaviate
  - tabela:milvus
  - "[[llamaindex|LlamaIndex]]"
  - tabela:haystack
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Busca Híbrida e Reranking
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
