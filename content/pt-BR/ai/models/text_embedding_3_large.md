---
id: text_embedding_3_large
tipo: modelo
nome: text-embedding-3-large
aliases: []
familia: Embeddings
empresa: "[[openai|OpenAI]]"
lancamento: 2024-01-25
status: ativo
idModeloApi: text-embedding-3-large
contextoTokens: não verificado
saidaMaxTokens: 0
modalidadesEntrada:
  - texto
modalidadesSaida:
  - embedding
precoEntradaUSD: 0.13
precoSaidaUSD: 0
precoCacheUSD: não verificado
licenca: Proprietária
disponibilidade:
  - api
ferramentas:
  - "[[chatgpt|ChatGPT]]"
categorias:
  - "[[modelo_fundacional|Modelo fundacional]]"
  - "[[rag_categoria|Ferramentas de RAG]]"
funcionalidades:
  - "[[geracao_de_embeddings|Geração de embeddings]]"
  - "[[busca_semantica|Busca semântica]]"
casosDeUso:
  - "[[geracao_de_embeddings_para_busca|Geração de embeddings para busca]]"
  - "[[rag_sobre_base_de_conhecimento|RAG sobre base de conhecimento]]"
  - "[[busca_semantica_em_acervos|Busca semântica em acervos]]"
benchmarks:
  - "[[mteb|MTEB]]"
dataVerificacao: 2026-11-20
fontePreco: https://developers.openai.com/api/docs/pricing
tags:
  - modelo
  - ia
  - llm
---
# text-embedding-3-large
## 📋 Informações Básicas
- **Família:** Embeddings
- **Empresa:** [[openai|OpenAI]]
- **Lançamento:** 2024-01-25
- **Status:** ativo
- **ID na API:** text-embedding-3-large
- **Disponibilidade:** api
## 📝 Descrição
Modelo de embeddings de maior qualidade da OpenAI, para busca semântica e recuperação em RAG. A data vem do changelog oficial (modelos de embedding V3).

Sem custo de saída (embeddings). Janela máxima de entrada não consta na página consultada.
## ⚙️ Especificações
- **Janela de contexto:** não verificado tokens
- **Saída máxima:** 0 tokens
- **Modalidades de entrada:** texto
- **Modalidades de saída:** embedding
- **Licença:** Proprietária
## 💰 Preço (USD por 1M tokens)
- **Entrada:** US$ 0,13
- **Saída:** US$ 0,00
- **Cache:** não verificado
- **Fonte:** https://developers.openai.com/api/docs/pricing (verificado em 2026-11-20)
- **Observação:** Somente entrada: US$ 0,13 por 1M tokens.
## ⏰ Quando Utilizar
- Indexar documentos para RAG
- Busca semântica em acervos
### Quando NÃO utilizar
- Texto multimodal com imagens ou vídeo (use Gemini Embedding 2)
## 🧩 Casos de uso e funcionalidades
- **Casos de uso:** [[geracao_de_embeddings_para_busca|Geração de embeddings para busca]], [[rag_sobre_base_de_conhecimento|RAG sobre base de conhecimento]], [[busca_semantica_em_acervos|Busca semântica em acervos]]
- **Funcionalidades:** [[geracao_de_embeddings|Geração de embeddings]], [[busca_semantica|Busca semântica]]
- **Categorias:** [[modelo_fundacional|Modelo fundacional]], [[rag_categoria|Ferramentas de RAG]]
## 🆚 Alternativas
- [[gemini_embedding_2|Gemini Embedding 2]] - alternativa de outro fornecedor
- [[qwen3_8_27b|Qwen3.8-27B]] - alternativa de outro fornecedor
## 🔗 Relacionamentos
- **Empresa:** [[openai|OpenAI]]
- **Ferramentas:** [[chatgpt|ChatGPT]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Modelos de IA
