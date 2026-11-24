---
id: busca_semantica_em_acervos
tipo: caso-de-uso
nome: Busca semântica em acervos
aliases:
  - busca-semantica
descricao: Encontrar documentos e trechos por significado em acervos grandes.
funcionalidadesNecessarias:
  - "[[busca_semantica|Busca semântica]]"
  - "[[geracao_de_embeddings|Geração de embeddings]]"
categoriasRelacionadas:
  - "[[vector_store|Vector store]]"
  - "[[rag_categoria|Ferramentas de RAG]]"
ferramentasRecomendadas:
  - "[[pgvector|pgvector]]"
  - "[[chromadb|ChromaDB]]"
  - "[[pinecone|Pinecone]]"
modelosRecomendados:
  - "[[gemini_embedding_2|Gemini Embedding 2]]"
  - "[[text_embedding_3_large|text-embedding-3-large]]"
criteriosDesempate:
  - lock-in
  - custo
  - privacidade-de-dados
criterioPadrao: lock-in
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
macro: "[[pesquisa_e_conhecimento|Pesquisa e conhecimento]]"
faixasPadrao:
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
variacoes:
  - id: busca-acervo-documentos
    nome: Acervo de documentos corporativos
    descricao: Busca por significado em PDFs, manuais e políticas.
    funcionalidades:
      - "[[busca_semantica|Busca semântica]]"
      - "[[geracao_de_embeddings|Geração de embeddings]]"
    herdaFerramentas: true
    parametros:
      - chave: Linguagem ou runtime
        valor: SQL com extensão pgvector no Postgres 13 ou superior
        fonte: https://github.com/pgvector/pgvector
      - chave: Escala típica
        valor: Milhões de trechos
        fonte: editorial
      - chave: Fonte dos documentos
        valor: PDFs, manuais e políticas
        fonte: editorial
    verificadoEm: 2026-11-22
  - id: busca-catalogo-produtos
    nome: Catálogo de produtos
    descricao: Busca por intenção do cliente sobre descrição e atributos.
    funcionalidades:
      - "[[busca_semantica|Busca semântica]]"
      - "[[geracao_de_embeddings|Geração de embeddings]]"
    herdaFerramentas: false
    maisBarata:
      - "[[opensearch|OpenSearch]]"
      - tabela:meilisearch
      - tabela:typesense
    custoBeneficio:
      - "[[algolia|Algolia]]"
      - tabela:elastic-cloud
      - tabela:clickhouse-cloud
    qualidadeMaxima:
      - "[[amazon_opensearch_service|Amazon OpenSearch Service (ferramenta)]]"
      - tabela:azure-ai-search
      - tabela:google-vertex-ai-search
    justificativaFerramentas: "Muda Fonte dos documentos para descrição e atributos de itens: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Linguagem ou runtime
        valor: Mecanismo de busca com vetores e filtros
        fonte: editorial
      - chave: Escala típica
        valor: Milhões de produtos
        fonte: editorial
      - chave: Fonte dos documentos
        valor: Descrição e atributos de itens
        fonte: editorial
  - id: busca-base-codigo
    nome: Base de código
    descricao: Busca por funcionalidade em repositórios grandes.
    funcionalidades:
      - "[[busca_semantica|Busca semântica]]"
      - "[[geracao_de_embeddings|Geração de embeddings]]"
    herdaFerramentas: false
    maisBarata:
      - tabela:ripgrep
      - "[[pgvector|pgvector]]"
      - "[[chromadb|ChromaDB]]"
    custoBeneficio:
      - tabela:qdrant
      - "[[llamaindex|LlamaIndex]]"
      - tabela:lancedb
    qualidadeMaxima:
      - tabela:sourcegraph
      - "[[pinecone|Pinecone]]"
      - "[[gemini_embedding_2|Gemini Embedding 2]]"
    justificativaFerramentas: "Muda Fonte dos documentos para código-fonte e histórico de commits: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Linguagem ou runtime
        valor: Indexador de código com símbolos
        fonte: editorial
      - chave: Escala típica
        valor: Milhares de repositórios
        fonte: editorial
      - chave: Fonte dos documentos
        valor: Código-fonte e histórico de commits
        fonte: editorial
tags:
  - caso-de-uso
  - ia
---
# Busca semântica em acervos
## 📝 Descrição
Encontrar documentos e trechos por significado em acervos grandes.
## ⏰ Quando aplicar
- Acervos de documentos e notas
- Descoberta por similaridade
## 🧩 Funcionalidades necessárias
- [[busca_semantica|Busca semântica]] - Recuperação de itens por similaridade de significado, em vez de palavras exatas.
- [[geracao_de_embeddings|Geração de embeddings]] - Conversão de texto ou outras mídias em vetores numéricos que representam significado.
## ✅ Recomendações
- [[pgvector|pgvector]] - Busca por vetores junto dos dados relacionais
- [[chromadb|ChromaDB]] - Índice local simples para acervos pessoais
- [[pinecone|Pinecone]] - Escala gerenciada para acervos grandes
- [[gemini_embedding_2|Gemini Embedding 2]] - Embeddings multilíngues e multimodais
- [[text_embedding_3_large|text-embedding-3-large]] - Embeddings de uso amplo com preço conhecido
## 🧬 Variações
- **Acervo de documentos corporativos** (`busca-acervo-documentos`): Busca por significado em PDFs, manuais e políticas. Funcionalidades: [[busca_semantica|Busca semântica]], [[geracao_de_embeddings|Geração de embeddings]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Linguagem ou runtime: SQL com extensão pgvector no Postgres 13 ou superior; Escala típica: Milhões de trechos; Fonte dos documentos: PDFs, manuais e políticas.
- **Catálogo de produtos** (`busca-catalogo-produtos`): Busca por intenção do cliente sobre descrição e atributos. Funcionalidades: [[busca_semantica|Busca semântica]], [[geracao_de_embeddings|Geração de embeddings]]. Mais barata: [[opensearch|OpenSearch]], Meilisearch, Typesense. Custo-benefício: [[algolia|Algolia]], Elastic Cloud, ClickHouse Cloud. Qualidade máxima: [[amazon_opensearch_service|Amazon OpenSearch Service (ferramenta)]], Azure AI Search, Google Vertex AI Search. Por que difere do caso: Muda Fonte dos documentos para descrição e atributos de itens: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Linguagem ou runtime: Mecanismo de busca com vetores e filtros; Escala típica: Milhões de produtos; Fonte dos documentos: Descrição e atributos de itens.
- **Base de código** (`busca-base-codigo`): Busca por funcionalidade em repositórios grandes. Funcionalidades: [[busca_semantica|Busca semântica]], [[geracao_de_embeddings|Geração de embeddings]]. Mais barata: ripgrep, [[pgvector|pgvector]], [[chromadb|ChromaDB]]. Custo-benefício: Qdrant, [[llamaindex|LlamaIndex]], LanceDB. Qualidade máxima: Sourcegraph, [[pinecone|Pinecone]], [[gemini_embedding_2|Gemini Embedding 2]]. Por que difere do caso: Muda Fonte dos documentos para código-fonte e histórico de commits: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Linguagem ou runtime: Indexador de código com símbolos; Escala típica: Milhares de repositórios; Fonte dos documentos: Código-fonte e histórico de commits.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[pgvector|pgvector]], [[chromadb|ChromaDB]], Qdrant
- **Custo-benefício:** Weaviate, Milvus, LanceDB
- **Qualidade máxima:** [[pinecone|Pinecone]], Azure AI Search, Vertex AI Vector Search
## ⚖️ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** lock-in. Vetores gerados por um modelo ficam presos a ele, e armazenar em formato aberto permite reindexar com outro fornecedor.
## 🔗 Relacionamentos
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Casos de Uso de IA
- **Macro:** [[pesquisa_e_conhecimento|Pesquisa e conhecimento]]
