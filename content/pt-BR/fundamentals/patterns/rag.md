---
id: rag
tipo: padrao
nome: RAG
aliases:
  - RAG
  - Retrieval-Augmented Generation
  - Geração aumentada por recuperação
descricao: Recupera trechos relevantes de uma base de conhecimento e os injeta no prompt para que o modelo responda com base neles, em vez de depender apenas do que aprendeu no treino.
fonte_ids:
  - arxiv_rag
  - anthropic_agents
  - gcp_agentic_patterns
exemplo: O assistente de suporte busca os 5 trechos mais próximos da pergunta na base de ajuda e responde citando os links.
quando_usar:
  - Perguntas sobre documentos internos, políticas, contratos e bases de suporte
  - Respostas que precisam citar a fonte
  - Dados que mudam com frequência, sem retreinar o modelo
quando_evitar:
  - Conhecimento pequeno que cabe inteiro no contexto (prefira o contexto direto)
  - Tarefas de raciocínio puro ou geração criativa sem base factual
status: revisado
publico: false
fontes:
  - id: arxiv_rag
    tipo: artigo
    titulo: Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (Lewis et al.)
    link: https://arxiv.org/abs/2005.11401
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
  - "[[rag_categoria|Ferramentas de RAG]]"
  - "[[vector_store|Vector store]]"
  - "[[orquestracao_llm|Orquestração de LLM]]"
familia: ia
subfamilia: RAG
problema: Modelos não conhecem dados privados nem recentes e tendem a inventar respostas quando faltam fatos.
tradeoffs:
  - "Ganha: respostas atualizadas e citáveis sem fine-tuning; paga: pipeline de ingestão, chunking, indexação e avaliação para manter"
  - "Ganha: menos alucinação; paga: qualidade limitada pela recuperação (a resposta só é boa se o trecho certo aparecer)"
consequencias:
  - Qualidade de chunking, embeddings e reranking domina o resultado
  - Permissões por documento precisam ser respeitadas na recuperação
padroesRelacionados:
  - "[[agent_memory|Agent Memory]]"
  - "[[agentic_rag|Agentic RAG]]"
  - "[[busca_hibrida_reranking|Busca Híbrida e Reranking]]"
  - "[[graphrag|GraphRAG]]"
  - "[[semantic_caching|Semantic Caching]]"
casosDeUso:
  - "[[rag_sobre_base_de_conhecimento|RAG sobre base de conhecimento]]"
  - "[[prototipacao_de_rag|Prototipação de RAG]]"
  - "[[busca_semantica_em_acervos|Busca semântica em acervos]]"
  - "[[atendimento_e_suporte|Atendimento e suporte]]"
  - "[[base_de_conhecimento_pessoal|Base de conhecimento pessoal]]"
variacoes: []
ferramentas:
  - "[[llamaindex|LlamaIndex]]"
  - "[[langchain|LangChain]]"
  - "[[pgvector|pgvector]]"
  - "[[pinecone|Pinecone]]"
  - tabela:weaviate
  - tabela:qdrant
  - tabela:haystack
  - "[[chromadb|ChromaDB]]"
  - tabela:amazon-bedrock-knowledge-bases
  - tabela:amazon-kendra
  - tabela:dify
  - tabela:langchain4j
  - tabela:spring-ai
notaCompleta:
  - "[[rag|RAG]]"
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# RAG
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
