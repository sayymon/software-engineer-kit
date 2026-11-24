---
id: pinecone
tipo: ferramenta
nome: Pinecone
tipos:
  - SERVICO
  - PLATAFORMA
empresa: "[[pinecone_systems_inc|Pinecone Systems Inc]]"
aliases:
  - Pinecone
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
  - free
  - subscription
  - api-pay-per-token
  - enterprise
precoUSD: 50
plataformas:
  - api
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
  - managed cloud, sem modo offline
  - planos pagos cobram minimo mensal mais uso (storage, reads, writes)
  - nomes de plano e minimos mudam; confirmar na pagina oficial
dataVerificacao: 2026-11-20
fontePreco: https://www.pinecone.io/pricing/
precoMedio: 50
tags:
  - ferramenta
  - ia
  - vector-db
  - pinecone
  - rag
---
# Pinecone

## 📋 Informações Básicas
- **Tipos:** Vector database gerenciado (managed cloud)
- **Empresa/Fabricante:** [[pinecone_systems_inc|Pinecone Systems Inc]]
- **Website:** https://www.pinecone.io
- **Categorias:** Vector store, RAG
- **Modelo de contratação:** free (Starter), subscription com cobrança por uso, enterprise
- **Preço (USD):** Starter gratuito (2GB); plano pago com mínimo mensal a partir de $50 mais uso; Enterprise a partir de $500/mês
- **Data de verificação:** 2026-11-20
- **Fonte do preço:** https://www.pinecone.io/pricing/

## 📝 Descrição
Vector database totalmente gerenciado, voltado a aplicações de IA em produção e em escala. Cuida de indexação, sharding, replicação e disponibilidade sem você operar infraestrutura. A cobrança dos planos pagos combina um mínimo mensal com uso medido (armazenamento, leituras e escritas).

## 🎯 Para Que Serve
Armazenar e buscar embeddings em produção com baixa latência e alta disponibilidade, sem gerenciar a infraestrutura do banco vetorial.

### Casos de Uso
1. RAG em produção com muitos vetores
2. Busca semântica em escala com SLA
3. Sistemas de recomendação baseados em similaridade
4. Aplicações que precisam de disponibilidade gerenciada

## ⏰ Quando Utilizar
- Quando precisa de vector store em produção, gerenciado e escalável
- Quando o volume de vetores cresce para milhões ou mais
- Quando quer evitar operar infraestrutura de banco vetorial
- Quando disponibilidade e latência previsíveis importam

### Quando NÃO utilizar
- Quando está prototipando local: prefira [[chromadb|ChromaDB]]
- Quando já roda Postgres e quer manter tudo lá: prefira [[pgvector|pgvector]]
- Quando precisa de dados 100% on-premises ou offline
- Quando o custo recorrente do mínimo mensal não se justifica

## 🧩 Categorias e Funcionalidades
- **Categorias:** [[vector_store|Vector store]], [[rag_categoria|Ferramentas de RAG]]
- **Funcionalidades:** [[geracao_de_embeddings|Geração de embeddings]], [[busca_semantica|Busca semântica]], [[recuperacao_aumentada_rag|Recuperação aumentada (RAG)]]
- **Casos de uso mapeados:** [[rag_sobre_base_de_conhecimento|RAG sobre base de conhecimento]], [[busca_semantica_em_acervos|Busca semântica em acervos]]
Notas atômicas e legendas em [[hub_ai_tools|Mapa de Ferramentas de IA]].

## 🖥️ Compatibilidade e Plataformas
- **Plataformas:** api, cloud, python, javascript
- **Integra com:** [[langchain|LangChain]], [[llamaindex|LlamaIndex]] (vector store), [[openai|OpenAI]] (embeddings)
- **Requisitos:** conta Pinecone e chave de API; conexão com a nuvem

## 🔒 Restrições e Especificações
- **Context window / limites:** não aplicável; limites por plano de armazenamento e throughput.
- **Residência de dados / privacidade:** dados na nuvem gerenciada; região configurável por plano.
- **Offline:** não.
- **ToS / licença:** serviço proprietário sob ToS.
- **Outras restrições:** planos pagos têm mínimo mensal; nomes de plano e valores mudam, confirmar na página oficial.

## 🆚 Alternativas
- [[chromadb|ChromaDB]] - melhor para prototipação local
- [[pgvector|pgvector]] - melhor se já usa Postgres
- Qdrant - alternativa com opção self-hosted
- Weaviate - schema tipado e features avançadas

### Vantagens sobre alternativas
- Totalmente gerenciado, pronto para produção
- Escala para grandes volumes sem operação manual
- Latência previsível com SLA

### Desvantagens
- Custo recorrente (mínimo mensal mais uso)
- Sem modo offline nem self-hosted
- Lock-in no serviço gerenciado

## 💰 Custo e Contratação

### Planos (USD)
- **Starter:** gratuito (cerca de 2GB de armazenamento, sem cartão)
- **Standard:** mínimo mensal a partir de $50, mais cobrança por uso (algumas referências recentes citam $25; confirmar na página oficial)
- **Enterprise:** mínimo mensal a partir de $500, mais uso
- **Fonte:** https://www.pinecone.io/pricing/ (verificado em 2026-11-20)

## 🔗 Relacionamentos
- **Contexto:** Ferramentas
- **Empresa:** [[pinecone_systems_inc|Pinecone Systems Inc]]
- **Usado em:** RAG e busca semântica em produção
- **Alternativas:** [[chromadb|ChromaDB]], [[pgvector|pgvector]], Qdrant, Weaviate
- **Integra com:** [[langchain|LangChain]], [[llamaindex|LlamaIndex]], [[openai|OpenAI]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
