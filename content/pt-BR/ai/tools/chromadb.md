---
id: chromadb
tipo: ferramenta
nome: ChromaDB
tipos:
  - BIBLIOTECA
  - SOFTWARE
empresa: "[[chroma|Chroma]]"
aliases:
  - ChromaDB
  - Chroma
categorias:
  - "[[vector_store|Vector store]]"
  - "[[rag_categoria|Ferramentas de RAG]]"
funcionalidades:
  - "[[geracao_de_embeddings|Geração de embeddings]]"
  - "[[busca_semantica|Busca semântica]]"
  - "[[recuperacao_aumentada_rag|Recuperação aumentada (RAG)]]"
casosDeUso:
  - "[[prototipacao_de_rag|Prototipação de RAG]]"
  - "[[busca_semantica_em_acervos|Busca semântica em acervos]]"
  - "[[rag_sobre_base_de_conhecimento|RAG sobre base de conhecimento]]"
modelos: []
modeloContratacao:
  - open-source
  - free
precoUSD: 0
plataformas:
  - self-hosted
  - cloud
linguagens:
  - python
  - javascript
porte:
  - pessoa-fisica
  - pequena
  - media
  - grande
segmentos:
  - geral
restricoes:
  - nao recomendado para producao em grande escala
  - sem features enterprise (auth, backup, replicacao) na versao local
  - performance limitada com milhoes de vetores
dataVerificacao: 2026-11-20
fontePreco: https://www.trychroma.com/pricing
precoMedio: 0
tags:
  - ferramenta
  - ia
  - vector-db
  - chroma
  - embeddings
  - rag
---
# ChromaDB

## 📋 Informações Básicas
- **Tipos:** Vector database open source
- **Empresa/Fabricante:** [[chroma|Chroma]] (open source)
- **Website:** https://www.trychroma.com
- **Categorias:** Vector store, RAG
- **Modelo de contratação:** open-source / free (local); Chroma Cloud com cobrança por uso
- **Preço (USD):** Open source gratuito; Chroma Cloud (hosted) cobrado por uso
- **Data de verificação:** 2026-11-20
- **Fonte do preço:** https://www.trychroma.com/pricing
- **Licença:** Apache 2.0

## 📝 Descrição
Vector database open source, leve e focado em developer experience. Roda in-memory ou persistido localmente sem infraestrutura externa. Ideal para prototipação rápida e desenvolvimento local de aplicações RAG.

## 🎯 Para Que Serve
Armazenar e buscar embeddings de forma simples durante desenvolvimento e prototipação de aplicações de IA/RAG.

### Casos de Uso
1. Prototipação rápida de pipelines RAG
2. Desenvolvimento local sem dependência de serviços externos
3. Testes e experimentação com embeddings
4. Projetos pessoais e demos de IA

## ⏰ Quando Utilizar
- Quando está prototipando uma aplicação RAG
- Quando quer rodar tudo localmente sem infra
- Quando precisa de setup rápido (zero config)
- Quando o volume de dados é pequeno/médio (dev/staging)

### Quando NÃO utilizar
- Em produção com alta escala e disponibilidade
- Quando precisa de persistência distribuída
- Quando tem milhões de vetores e precisa de performance garantida
- Quando precisa de features enterprise (backup, replicação, auth): prefira [[pgvector|pgvector]] ou [[pinecone|Pinecone]]

## 🧩 Categorias e Funcionalidades
- **Categorias:** [[vector_store|Vector store]], [[rag_categoria|Ferramentas de RAG]]
- **Funcionalidades:** [[geracao_de_embeddings|Geração de embeddings]], [[busca_semantica|Busca semântica]], [[recuperacao_aumentada_rag|Recuperação aumentada (RAG)]]
- **Casos de uso mapeados:** [[prototipacao_de_rag|Prototipação de RAG]], [[busca_semantica_em_acervos|Busca semântica em acervos]], [[rag_sobre_base_de_conhecimento|RAG sobre base de conhecimento]]
Notas atômicas e legendas em [[hub_ai_tools|Mapa de Ferramentas de IA]].

## 🖥️ Compatibilidade e Plataformas
- **Plataformas:** python, javascript, self-hosted, cloud (Chroma Cloud)
- **Integra com:** [[langchain|LangChain]] (vector store nativo), [[llamaindex|LlamaIndex]], [[openai|OpenAI]] (embeddings), [[ollama|Ollama]] (embeddings locais)
- **Requisitos:** Python; pip install

## 🔒 Restrições e Especificações
- **Context window / limites:** não aplicável; limites práticos de memória/disco local.
- **Residência de dados / privacidade:** local por padrão (dados ficam na máquina).
- **Offline:** sim.
- **ToS / licença:** Apache 2.0.
- **Outras restrições:** sem features enterprise na versão local; performance cai com milhões de vetores.

## 🔧 Como Utilizar

### Instalação
```bash
pip install chromadb
```

### Uso Básico
```python
import chromadb
client = chromadb.PersistentClient(path="./chroma_data")
collection = client.create_collection("my_docs")
collection.add(documents=["Texto sobre Python"], ids=["doc1"], metadatas=[{"source": "wiki"}])
results = collection.query(query_texts=["linguagem de programacao"], n_results=2)
```

## 🆚 Alternativas
- [[pgvector|pgvector]] - melhor para produção se já usa Postgres
- [[pinecone|Pinecone]] - managed, escala enterprise
- Weaviate - features avançadas, schema tipado
- Qdrant - performance em produção

### Vantagens sobre alternativas
- Zero config: instala e usa em minutos
- Roda in-memory ou local sem infra
- API simples e Pythônica
- Gera embeddings automaticamente se não fornecer

### Desvantagens
- Não recomendado para produção em escala
- Sem features enterprise na versão local
- Performance limitada com milhões de vetores

## 💰 Custo e Contratação

### Planos (USD)
- **Open Source:** gratuito, sem restrições
- **Chroma Cloud:** serviço hosted, cobrança por uso
- **Fonte:** https://www.trychroma.com/pricing (verificado em 2026-11-20)

## 🧠 Conhecimentos Necessários
- Python - Básico
- [[geracao_de_embeddings|Embeddings]] - Básico (conceito)
- [[rag|RAG]] - Básico (entender o fluxo)

## 📚 Documentação
- [Documentação oficial](https://docs.trychroma.com)
- [GitHub (chroma-core/chroma)](https://github.com/chroma-core/chroma)
- [Cookbook](https://cookbook.chromadb.dev)
- **Relacionados:** Sentence Transformers (modelos de embedding compatíveis)

## 🔗 Relacionamentos
- **Contexto:** Ferramentas
- **Empresa:** [[chroma|Chroma]]
- **Usado em:** Protótipos RAG, desenvolvimento local
- **Alternativas:** [[pgvector|pgvector]], [[pinecone|Pinecone]], Weaviate
- **Integra com:** [[langchain|LangChain]], [[llamaindex|LlamaIndex]], [[openai|OpenAI]], [[ollama|Ollama]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
