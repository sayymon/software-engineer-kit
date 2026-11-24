---
id: geracao_de_embeddings_para_busca
tipo: caso-de-uso
nome: Geração de embeddings para busca
aliases:
  - embeddings-busca
descricao: Gerar vetores para indexar e recuperar conteúdo em motores de busca e RAG.
funcionalidadesNecessarias:
  - "[[geracao_de_embeddings|Geração de embeddings]]"
  - "[[busca_semantica|Busca semântica]]"
categoriasRelacionadas:
  - "[[modelo_fundacional|Modelo fundacional]]"
  - "[[vector_store|Vector store]]"
ferramentasRecomendadas:
  - "[[hugging_face|Hugging Face]]"
  - "[[pgvector|pgvector]]"
modelosRecomendados:
  - "[[text_embedding_3_large|text-embedding-3-large]]"
  - "[[gemini_embedding_2|Gemini Embedding 2]]"
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
macro: "[[ia_aplicada_e_agentes|IA aplicada e agentes]]"
faixasPadrao:
  maisBarata:
    - "[[hugging_face|Hugging Face]]"
    - tabela:ollama-library
    - tabela:modelscope
  custoBeneficio:
    - "[[text_embedding_3_large|text-embedding-3-large]]"
    - tabela:replicate
    - tabela:openrouter
  qualidadeMaxima:
    - "[[gemini_embedding_2|Gemini Embedding 2]]"
    - tabela:cohere-rerank
    - tabela:aws-bedrock
variacoes:
  - id: emb-texto-multilingue
    nome: Texto multilíngue
    descricao: Embeddings de documentos em vários idiomas para busca.
    funcionalidades:
      - "[[geracao_de_embeddings|Geração de embeddings]]"
      - "[[busca_semantica|Busca semântica]]"
    herdaFerramentas: true
    parametros:
      - chave: Linguagem ou runtime
        valor: Python ou TypeScript com API de embeddings
        fonte: editorial
      - chave: Escala típica
        valor: Milhões de trechos de texto
        fonte: editorial
      - chave: Etapa do índice
        valor: Vetorização de documentos em vários idiomas
        fonte: editorial
  - id: emb-indexacao-vetorial
    nome: Indexação em banco vetorial
    descricao: Carga em lote e atualização incremental do índice.
    funcionalidades:
      - "[[geracao_de_embeddings|Geração de embeddings]]"
      - "[[busca_semantica|Busca semântica]]"
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
    justificativaFerramentas: "Muda Etapa do índice para escrita e reindexação do índice: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Linguagem ou runtime
        valor: SQL com extensão pgvector no Postgres 13 ou superior
        fonte: https://github.com/pgvector/pgvector
      - chave: Escala típica
        valor: Carga em lote com atualização incremental
        fonte: editorial
      - chave: Etapa do índice
        valor: Escrita e reindexação do índice
        fonte: editorial
    verificadoEm: 2026-11-22
  - id: emb-modelos-abertos
    nome: Embeddings com modelo aberto
    descricao: Modelo hospedado por conta própria para reduzir custo e manter os dados.
    funcionalidades:
      - "[[geracao_de_embeddings|Geração de embeddings]]"
      - "[[execucao_local|Execução local]]"
    herdaFerramentas: false
    maisBarata:
      - "[[hugging_face|Hugging Face]]"
      - tabela:ollama-library
      - tabela:modelscope
    custoBeneficio:
      - tabela:kaggle-models
      - tabela:replicate
      - tabela:openrouter
    qualidadeMaxima:
      - tabela:aws-bedrock
      - tabela:azure-ai-foundry-catalog
      - tabela:google-vertex-model-garden
    justificativaFerramentas: "Muda Etapa do índice para custo menor com dados dentro da empresa: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Linguagem ou runtime
        valor: Python com modelo aberto hospedado por conta própria
        fonte: editorial
      - chave: Escala típica
        valor: Cargas contínuas em GPU própria
        fonte: editorial
      - chave: Etapa do índice
        valor: Custo menor com dados dentro da empresa
        fonte: editorial
tags:
  - caso-de-uso
  - ia
---
# Geração de embeddings para busca
## 📝 Descrição
Gerar vetores para indexar e recuperar conteúdo em motores de busca e RAG.
## ⏰ Quando aplicar
- Indexação de acervos
- Recomendação e agrupamento
## 🧩 Funcionalidades necessárias
- [[geracao_de_embeddings|Geração de embeddings]] - Conversão de texto ou outras mídias em vetores numéricos que representam significado.
- [[busca_semantica|Busca semântica]] - Recuperação de itens por similaridade de significado, em vez de palavras exatas.
## ✅ Recomendações
- [[text_embedding_3_large|text-embedding-3-large]] - Embeddings de alta qualidade com preço público
- [[gemini_embedding_2|Gemini Embedding 2]] - Embeddings multilíngues e multimodais
- [[hugging_face|Hugging Face]] - Modelos de embedding abertos para rodar localmente
- [[pgvector|pgvector]] - Armazenamento dos vetores dentro do PostgreSQL
## 🧬 Variações
- **Texto multilíngue** (`emb-texto-multilingue`): Embeddings de documentos em vários idiomas para busca. Funcionalidades: [[geracao_de_embeddings|Geração de embeddings]], [[busca_semantica|Busca semântica]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Linguagem ou runtime: Python ou TypeScript com API de embeddings; Escala típica: Milhões de trechos de texto; Etapa do índice: Vetorização de documentos em vários idiomas.
- **Indexação em banco vetorial** (`emb-indexacao-vetorial`): Carga em lote e atualização incremental do índice. Funcionalidades: [[geracao_de_embeddings|Geração de embeddings]], [[busca_semantica|Busca semântica]]. Mais barata: [[pgvector|pgvector]], [[chromadb|ChromaDB]], Qdrant. Custo-benefício: Weaviate, Milvus, LanceDB. Qualidade máxima: [[pinecone|Pinecone]], Azure AI Search, Vertex AI Vector Search. Por que difere do caso: Muda Etapa do índice para escrita e reindexação do índice: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Linguagem ou runtime: SQL com extensão pgvector no Postgres 13 ou superior; Escala típica: Carga em lote com atualização incremental; Etapa do índice: Escrita e reindexação do índice.
- **Embeddings com modelo aberto** (`emb-modelos-abertos`): Modelo hospedado por conta própria para reduzir custo e manter os dados. Funcionalidades: [[geracao_de_embeddings|Geração de embeddings]], [[execucao_local|Execução local]]. Mais barata: [[hugging_face|Hugging Face]], Biblioteca do Ollama, ModelScope. Custo-benefício: Kaggle Models, Replicate, OpenRouter. Qualidade máxima: Amazon Bedrock, Catálogo do Azure AI Foundry, Vertex AI Model Garden. Por que difere do caso: Muda Etapa do índice para custo menor com dados dentro da empresa: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Linguagem ou runtime: Python com modelo aberto hospedado por conta própria; Escala típica: Cargas contínuas em GPU própria; Etapa do índice: Custo menor com dados dentro da empresa.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[hugging_face|Hugging Face]], Biblioteca do Ollama, ModelScope
- **Custo-benefício:** [[text_embedding_3_large|text-embedding-3-large]], Replicate, OpenRouter
- **Qualidade máxima:** [[gemini_embedding_2|Gemini Embedding 2]], Cohere Rerank, Amazon Bedrock
## ⚖️ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** lock-in. Trocar o modelo de embedding exige reindexar tudo, então preferir modelos portáveis e abertos reduz o custo de mudança.
## 🔗 Relacionamentos
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Casos de Uso de IA
- **Macro:** [[ia_aplicada_e_agentes|IA aplicada e agentes]]
