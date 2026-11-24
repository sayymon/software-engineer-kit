---
id: rag_sobre_base_de_conhecimento
tipo: caso-de-uso
nome: RAG sobre base de conhecimento
aliases:
  - rag-base-conhecimento
descricao: Responder perguntas com base em documentos e dados próprios, com fontes.
funcionalidadesNecessarias:
  - "[[recuperacao_aumentada_rag|Recuperação aumentada (RAG)]]"
  - "[[geracao_de_embeddings|Geração de embeddings]]"
  - "[[busca_semantica|Busca semântica]]"
  - "[[contexto_longo|Contexto longo]]"
categoriasRelacionadas:
  - "[[rag_categoria|Ferramentas de RAG]]"
  - "[[vector_store|Vector store]]"
  - "[[banco_grafos|Banco de grafos]]"
ferramentasRecomendadas:
  - "[[llamaindex|LlamaIndex]]"
  - "[[pinecone|Pinecone]]"
  - "[[pgvector|pgvector]]"
  - "[[chromadb|ChromaDB]]"
modelosRecomendados:
  - "[[text_embedding_3_large|text-embedding-3-large]]"
  - "[[gemini_3_8_flash|Gemini 3.8 Flash]]"
criteriosDesempate:
  - privacidade-de-dados
  - custo
  - lock-in
criterioPadrao: privacidade-de-dados
porte:
  - pessoa-fisica
  - pequena
  - media
  - grande
segmentos:
  - geral
nicho: ""
nivel: caso
eixo: tarefa
macro: "[[ia_aplicada_e_agentes|IA aplicada e agentes]]"
faixasPadrao:
  maisBarata:
    - "[[pgvector|pgvector]]"
    - "[[chromadb|ChromaDB]]"
    - tabela:qdrant
  custoBeneficio:
    - "[[llamaindex|LlamaIndex]]"
    - "[[langchain|LangChain]]"
    - tabela:weaviate
  qualidadeMaxima:
    - "[[pinecone|Pinecone]]"
    - "[[gemini_embedding_2|Gemini Embedding 2]]"
    - tabela:cohere-rerank
variacoes:
  - id: rag-suporte-faq
    nome: Suporte e FAQ
    descricao: Respostas com citação sobre manuais e artigos de ajuda.
    funcionalidades:
      - "[[recuperacao_aumentada_rag|Recuperação aumentada (RAG)]]"
      - "[[busca_semantica|Busca semântica]]"
    herdaFerramentas: true
    parametros:
      - chave: Linguagem ou runtime
        valor: Python ou TypeScript com orquestrador de RAG
        fonte: editorial
      - chave: Escala típica
        valor: Milhares de artigos de ajuda
        fonte: editorial
      - chave: Fonte dos documentos
        valor: Manuais e FAQ públicos
        fonte: editorial
  - id: rag-documentacao-interna
    nome: Documentação interna
    descricao: Perguntas sobre wikis, políticas e processos da empresa.
    funcionalidades:
      - "[[recuperacao_aumentada_rag|Recuperação aumentada (RAG)]]"
      - "[[geracao_de_embeddings|Geração de embeddings]]"
      - "[[contexto_longo|Contexto longo]]"
    herdaFerramentas: false
    maisBarata:
      - "[[pgvector|pgvector]]"
      - "[[chromadb|ChromaDB]]"
      - tabela:qdrant
    custoBeneficio:
      - tabela:weaviate
      - tabela:milvus
      - tabela:lancedb
    qualidadeMaxima:
      - "[[pinecone|Pinecone]]"
      - tabela:azure-ai-search
      - tabela:vertex-ai-vector-search
    justificativaFerramentas: "Muda Fonte dos documentos para wikis, políticas e processos internos: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Linguagem ou runtime
        valor: Python ou TypeScript com conectores de wiki
        fonte: editorial
      - chave: Escala típica
        valor: Dezenas de milhares de páginas
        fonte: editorial
      - chave: Fonte dos documentos
        valor: Wikis, políticas e processos internos
        fonte: editorial
  - id: rag-juridico-compliance
    nome: Jurídico e conformidade
    descricao: Respostas sobre normas e contratos com trecho de origem.
    funcionalidades:
      - "[[recuperacao_aumentada_rag|Recuperação aumentada (RAG)]]"
      - "[[busca_semantica|Busca semântica]]"
      - "[[contexto_longo|Contexto longo]]"
    herdaFerramentas: false
    maisBarata:
      - "[[pgvector|pgvector]]"
      - tabela:qdrant
      - "[[chromadb|ChromaDB]]"
    custoBeneficio:
      - "[[pinecone|Pinecone]]"
      - tabela:weaviate
      - tabela:cohere-rerank
    qualidadeMaxima:
      - tabela:azure-ai-search
      - "[[azure_ai_document_intelligence|Azure AI Document Intelligence]]"
      - tabela:vertex-ai-vector-search
    justificativaFerramentas: "Muda Fonte dos documentos para contratos e legislação com versões: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Linguagem ou runtime
        valor: Python com reranqueamento e citação de trecho
        fonte: editorial
      - chave: Escala típica
        valor: Milhares de contratos e normas
        fonte: editorial
      - chave: Fonte dos documentos
        valor: Contratos e legislação com versões
        fonte: editorial
tags:
  - caso-de-uso
  - ia
---
# RAG sobre base de conhecimento
## 📝 Descrição
Responder perguntas com base em documentos e dados próprios, com fontes.
## ⏰ Quando aplicar
- Bases internas e documentação
- Suporte com conhecimento proprietário
## 🧩 Funcionalidades necessárias
- [[recuperacao_aumentada_rag|Recuperação aumentada (RAG)]] - Combinação de recuperação de documentos com geração, para respostas baseadas em dados próprios.
- [[geracao_de_embeddings|Geração de embeddings]] - Conversão de texto ou outras mídias em vetores numéricos que representam significado.
- [[busca_semantica|Busca semântica]] - Recuperação de itens por similaridade de significado, em vez de palavras exatas.
- [[contexto_longo|Contexto longo]] - Janela de contexto grande o bastante para ler bases de código, contratos e longos históricos de uma vez.
## ✅ Recomendações
- [[llamaindex|LlamaIndex]] - Conectores e pipelines completos de indexação e consulta
- [[pinecone|Pinecone]] - Vector store gerenciado com escala
- [[pgvector|pgvector]] - Vetores dentro do PostgreSQL já usado
- [[chromadb|ChromaDB]] - Vector store simples para desenvolvimento e produção leve
- [[text_embedding_3_large|text-embedding-3-large]] - Embeddings de alta qualidade via API
- [[gemini_3_8_flash|Gemini 3.8 Flash]] - Geração fundamentada em trechos recuperados com custo baixo
## 🧬 Variações
- **Suporte e FAQ** (`rag-suporte-faq`): Respostas com citação sobre manuais e artigos de ajuda. Funcionalidades: [[recuperacao_aumentada_rag|Recuperação aumentada (RAG)]], [[busca_semantica|Busca semântica]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Linguagem ou runtime: Python ou TypeScript com orquestrador de RAG; Escala típica: Milhares de artigos de ajuda; Fonte dos documentos: Manuais e FAQ públicos.
- **Documentação interna** (`rag-documentacao-interna`): Perguntas sobre wikis, políticas e processos da empresa. Funcionalidades: [[recuperacao_aumentada_rag|Recuperação aumentada (RAG)]], [[geracao_de_embeddings|Geração de embeddings]], [[contexto_longo|Contexto longo]]. Mais barata: [[pgvector|pgvector]], [[chromadb|ChromaDB]], Qdrant. Custo-benefício: Weaviate, Milvus, LanceDB. Qualidade máxima: [[pinecone|Pinecone]], Azure AI Search, Vertex AI Vector Search. Por que difere do caso: Muda Fonte dos documentos para wikis, políticas e processos internos: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Linguagem ou runtime: Python ou TypeScript com conectores de wiki; Escala típica: Dezenas de milhares de páginas; Fonte dos documentos: Wikis, políticas e processos internos.
- **Jurídico e conformidade** (`rag-juridico-compliance`): Respostas sobre normas e contratos com trecho de origem. Funcionalidades: [[recuperacao_aumentada_rag|Recuperação aumentada (RAG)]], [[busca_semantica|Busca semântica]], [[contexto_longo|Contexto longo]]. Mais barata: [[pgvector|pgvector]], Qdrant, [[chromadb|ChromaDB]]. Custo-benefício: [[pinecone|Pinecone]], Weaviate, Cohere Rerank. Qualidade máxima: Azure AI Search, [[azure_ai_document_intelligence|Azure AI Document Intelligence]], Vertex AI Vector Search. Por que difere do caso: Muda Fonte dos documentos para contratos e legislação com versões: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Linguagem ou runtime: Python com reranqueamento e citação de trecho; Escala típica: Milhares de contratos e normas; Fonte dos documentos: Contratos e legislação com versões.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[pgvector|pgvector]], [[chromadb|ChromaDB]], Qdrant
- **Custo-benefício:** [[llamaindex|LlamaIndex]], [[langchain|LangChain]], Weaviate
- **Qualidade máxima:** [[pinecone|Pinecone]], [[gemini_embedding_2|Gemini Embedding 2]], Cohere Rerank
## ⚖️ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** privacidade-de-dados. A base de conhecimento costuma ser interna, então o local de armazenamento e processamento define a arquitetura.
## 🔗 Relacionamentos
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Casos de Uso de IA
- **Macro:** [[ia_aplicada_e_agentes|IA aplicada e agentes]]
