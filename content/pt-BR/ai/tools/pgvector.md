---
id: pgvector
tipo: ferramenta
nome: pgvector
tipos:
  - BIBLIOTECA
empresa: "[[pgvector_comunidade|pgvector (comunidade)]]"
aliases:
  - pgvector
categorias:
  - "[[vector_store|Vector store]]"
  - "[[rag_categoria|Ferramentas de RAG]]"
funcionalidades:
  - "[[geracao_de_embeddings|Geração de embeddings]]"
  - "[[busca_semantica|Busca semântica]]"
  - "[[recuperacao_aumentada_rag|Recuperação aumentada (RAG)]]"
casosDeUso:
  - "[[rag_sobre_base_de_conhecimento|RAG sobre base de conhecimento]]"
  - "[[busca_semantica_em_acervos|Busca semântica em acervos]]"
modelos: []
modeloContratacao:
  - open-source
precoUSD: 0
plataformas:
  - self-hosted
  - cloud
linguagens:
  - agnostica
porte:
  - pessoa-fisica
  - pequena
  - media
  - grande
segmentos:
  - geral
restricoes:
  - performance inferior a DBs vetoriais dedicados em escala muito grande
  - requer tuning de indices para datasets grandes
  - menos features especializadas (sem hybrid search nativo robusto)
dataVerificacao: 2026-11-20
fontePreco: https://github.com/pgvector/pgvector
precoMedio: 0
tags:
  - ferramenta
  - ia
  - vector-db
  - postgres
  - embeddings
  - rag
---
# pgvector

## 📋 Informações Básicas
- **Tipos:** Extensão de banco de dados (PostgreSQL)
- **Empresa/Fabricante:** [[pgvector_comunidade|pgvector (comunidade)]] (mantenedor principal: Andrew Kane)
- **Website:** https://github.com/pgvector/pgvector
- **Categorias:** Vector store, RAG
- **Modelo de contratação:** open-source
- **Preço (USD):** Gratuito (open source). Custo apenas do Postgres managed quando aplicável
- **Data de verificação:** 2026-11-20
- **Fonte do preço:** https://github.com/pgvector/pgvector
- **Licença:** PostgreSQL License

## 📝 Descrição
Extensão para PostgreSQL que adiciona armazenamento e busca de vetores (embeddings). Permite busca por similaridade (nearest neighbor) diretamente no Postgres, sem infraestrutura separada para vector database.

## 🎯 Para Que Serve
Armazenar embeddings gerados por modelos de IA e realizar buscas por similaridade vetorial diretamente no PostgreSQL.

### Casos de Uso
1. RAG com base de conhecimento
2. Busca semântica em documentos e textos
3. Sistemas de recomendação baseados em embeddings
4. Detecção de duplicatas por similaridade

## ⏰ Quando Utilizar
- Quando já utiliza PostgreSQL na infraestrutura
- Quando quer evitar gerenciar um serviço separado de vector DB
- Quando o volume de vetores é moderado (até milhões de registros)
- Quando precisa combinar filtros relacionais + busca vetorial na mesma query

### Quando NÃO utilizar
- Quando precisa de bilhões de vetores com latência ultra-baixa
- Quando não usa PostgreSQL e adotá-lo não faz sentido
- Quando precisa de sharding automático de vetores

## 🧩 Categorias e Funcionalidades
- **Categorias:** [[vector_store|Vector store]], [[rag_categoria|Ferramentas de RAG]]
- **Funcionalidades:** [[geracao_de_embeddings|Geração de embeddings]], [[busca_semantica|Busca semântica]], [[recuperacao_aumentada_rag|Recuperação aumentada (RAG)]]
- **Casos de uso mapeados:** [[rag_sobre_base_de_conhecimento|RAG sobre base de conhecimento]], [[busca_semantica_em_acervos|Busca semântica em acervos]]
Notas atômicas e legendas em [[hub_ai_tools|Mapa de Ferramentas de IA]].

## 🖥️ Compatibilidade e Plataformas
- **Plataformas:** self-hosted, cloud (Postgres managed)
- **Integra com:** [[langchain|LangChain]] (PGVector como vector store), Supabase (pgvector managed), AWS RDS (Postgres com pgvector)
- **Requisitos:** PostgreSQL com a extensão habilitada

## 🔒 Restrições e Especificações
- **Context window / limites:** não aplicável; limites do Postgres e do índice.
- **Residência de dados / privacidade:** onde o Postgres roda (self-hosted ou managed).
- **Offline:** sim (self-hosted).
- **ToS / licença:** PostgreSQL License.
- **Outras restrições:** tuning de índices (IVFFlat/HNSW) necessário em datasets grandes.

## 🔧 Como Utilizar

### Instalação
```sql
CREATE EXTENSION vector;
```

### Uso Básico
```sql
CREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  content TEXT,
  embedding vector(1536)
);

CREATE INDEX ON documents USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

SELECT content, embedding <=> '[0.1, 0.2, ...]' AS distance
FROM documents
ORDER BY embedding <=> '[0.1, 0.2, ...]'
LIMIT 5;
```

## 🆚 Alternativas
- [[pinecone|Pinecone]] - managed, mais caro, escala maior
- [[chromadb|ChromaDB]] - leve para prototipação local
- Weaviate - vector DB com features avançadas de schema

### Vantagens sobre alternativas
- Sem infraestrutura adicional se já usa Postgres
- Queries combinam filtros SQL + busca vetorial
- Sem vendor lock-in, open source puro
- Familiar para quem já conhece PostgreSQL

### Desvantagens
- Performance inferior a DBs vetoriais dedicados em escala muito grande
- Menos features especializadas (hybrid search)
- Tuning de índices requer conhecimento de Postgres

## 💰 Custo e Contratação

### Planos (USD)
- **Gratuito:** open source, sem restrições de uso
- **Managed (Supabase/RDS):** custo do Postgres managed (varia por provider)
- **Fonte:** https://github.com/pgvector/pgvector (verificado em 2026-11-20)

## 🧠 Conhecimentos Necessários
- [[postgresql|PostgreSQL]] - Intermediário
- [[geracao_de_embeddings|Embeddings]] - Básico (vetores e similaridade)
- SQL - Intermediário

## 📚 Documentação
- [GitHub (pgvector)](https://github.com/pgvector/pgvector)
- [Integração LangChain](https://python.langchain.com/docs/integrations/vectorstores/pgvector)
- [Guia Supabase AI](https://supabase.com/docs/guides/ai)

## 🔗 Relacionamentos
- **Contexto:** Ferramentas
- **Usado em:** Projetos RAG, busca semântica
- **Alternativas:** [[pinecone|Pinecone]], [[chromadb|ChromaDB]], Weaviate
- **Integra com:** [[langchain|LangChain]], [[postgresql|PostgreSQL]], Supabase
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
