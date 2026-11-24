---
id: gemini_embedding_2
tipo: modelo
nome: Gemini Embedding 2
aliases: []
familia: Gemini Embedding
empresa: "[[google|Google]]"
lancamento: 2026-04-22
status: ativo
idModeloApi: gemini-embedding-2
contextoTokens: 8192
saidaMaxTokens: 0
modalidadesEntrada:
  - texto
  - imagem
  - audio
  - video
  - pdf
modalidadesSaida:
  - embedding
precoEntradaUSD: 0.2
precoSaidaUSD: 0
precoCacheUSD: não verificado
licenca: Proprietária
disponibilidade:
  - api
ferramentas:
  - "[[gemini|Gemini]]"
categorias:
  - "[[modelo_fundacional|Modelo fundacional]]"
  - "[[rag_categoria|Ferramentas de RAG]]"
funcionalidades:
  - "[[geracao_de_embeddings|Geração de embeddings]]"
  - "[[busca_semantica|Busca semântica]]"
  - "[[multimodal|Multimodal]]"
casosDeUso:
  - "[[geracao_de_embeddings_para_busca|Geração de embeddings para busca]]"
  - "[[busca_semantica_em_acervos|Busca semântica em acervos]]"
  - "[[rag_sobre_base_de_conhecimento|RAG sobre base de conhecimento]]"
  - "[[base_de_conhecimento_pessoal|Base de conhecimento pessoal]]"
  - "[[atendimento_e_suporte|Atendimento e suporte]]"
  - "[[curso_e_infoproduto|Curso e infoproduto]]"
benchmarks:
  - "[[mteb|MTEB]]"
dataVerificacao: 2026-11-20
fontePreco: https://ai.google.dev/gemini-api/docs/pricing
tags:
  - modelo
  - ia
  - llm
---
# Gemini Embedding 2
## 📋 Informações Básicas
- **Família:** Gemini Embedding
- **Empresa:** [[google|Google]]
- **Lançamento:** 2026-04-22
- **Status:** ativo
- **ID na API:** gemini-embedding-2
- **Disponibilidade:** api
## 📝 Descrição
Primeiro modelo de embeddings multimodal da Google: mapeia texto, imagem, vídeo, áudio e PDF para um espaço vetorial único (128 a 3072 dimensões).

Entrada de texto a US$ 0,20 por 1M tokens; imagem a US$ 0,45 (US$ 0,00012 por imagem); áudio a US$ 6,50; vídeo a US$ 12,00. No free tier é gratuito.
## ⚙️ Especificações
- **Janela de contexto:** 8.192 tokens
- **Saída máxima:** 0 tokens
- **Modalidades de entrada:** texto, imagem, audio, video, pdf
- **Modalidades de saída:** embedding
- **Licença:** Proprietária
## 💰 Preço (USD por 1M tokens)
- **Entrada:** US$ 0,20
- **Saída:** US$ 0,00
- **Cache:** não verificado
- **Fonte:** https://ai.google.dev/gemini-api/docs/pricing (verificado em 2026-11-20)
- **Observação:** Somente entrada; preços por modalidade diferem (texto US$ 0,20).
## ⏰ Quando Utilizar
- Busca semântica sobre acervos mistos (texto, imagem, áudio, PDF)
- RAG multimodal
### Quando NÃO utilizar
- Apenas texto e custo mínimo (compare com text-embedding-3-large)
## 🧩 Casos de uso e funcionalidades
- **Casos de uso:** [[geracao_de_embeddings_para_busca|Geração de embeddings para busca]], [[busca_semantica_em_acervos|Busca semântica em acervos]], [[rag_sobre_base_de_conhecimento|RAG sobre base de conhecimento]]
- **Funcionalidades:** [[geracao_de_embeddings|Geração de embeddings]], [[busca_semantica|Busca semântica]], [[multimodal|Multimodal]]
- **Categorias:** [[modelo_fundacional|Modelo fundacional]], [[rag_categoria|Ferramentas de RAG]]
## 🆚 Alternativas
- [[text_embedding_3_large|text-embedding-3-large]] - alternativa de outro fornecedor
- [[qwen3_8_27b|Qwen3.8-27B]] - alternativa de outro fornecedor
## 🔗 Relacionamentos
- **Empresa:** [[google|Google]]
- **Ferramentas:** [[gemini|Gemini]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Modelos de IA
