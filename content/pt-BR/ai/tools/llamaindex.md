---
id: llamaindex
tipo: ferramenta
nome: LlamaIndex
tipos:
  - FRAMEWORK
  - BIBLIOTECA
empresa: "[[llamaindex_inc|LlamaIndex Inc]]"
aliases:
  - LlamaIndex
  - LlamaCloud
  - LlamaParse
categorias:
  - "[[orquestracao_llm|Orquestração de LLM]]"
  - "[[rag_categoria|Ferramentas de RAG]]"
  - "[[framework_agentes|Framework de agentes]]"
funcionalidades:
  - "[[recuperacao_aumentada_rag|Recuperação aumentada (RAG)]]"
  - "[[geracao_de_embeddings|Geração de embeddings]]"
  - "[[busca_semantica|Busca semântica]]"
  - "[[orquestracao_de_fluxos|Orquestração de fluxos]]"
  - "[[tool_use_funcionalidade|Tool use]]"
casosDeUso:
  - "[[rag_sobre_base_de_conhecimento|RAG sobre base de conhecimento]]"
  - "[[prototipacao_de_rag|Prototipação de RAG]]"
  - "[[busca_semantica_em_acervos|Busca semântica em acervos]]"
  - "[[resumo_de_documentos|Resumo de documentos]]"
  - "[[construcao_de_agentes|Construção de agentes]]"
  - "[[contratos_e_documentos_juridicos|Contratos e documentos jurídicos]]"
  - "[[base_de_conhecimento_pessoal|Base de conhecimento pessoal]]"
  - "[[atendimento_e_suporte|Atendimento e suporte]]"
modelos: []
modeloContratacao:
  - open-source
  - free
  - subscription
  - enterprise
precoUSD: 0
plataformas:
  - cli
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
  - framework open source (MIT); LlamaCloud e pago por creditos
  - 1.000 creditos = $1.25
  - custos de LLM e embeddings cobrados a parte pelo provider
dataVerificacao: 2026-11-20
fontePreco: https://www.llamaindex.ai/pricing
precoMedio: 0
tags:
  - ferramenta
  - ia
  - rag
  - orquestracao
  - llamaindex
---
# LlamaIndex

## 📋 Informações Básicas
- **Tipos:** Framework de dados para aplicações LLM (foco em RAG)
- **Empresa/Fabricante:** [[llamaindex_inc|LlamaIndex Inc]] (Jerry Liu)
- **Website:** https://www.llamaindex.ai
- **Categorias:** Orquestração de LLM, RAG, Framework de agentes
- **Modelo de contratação:** open-source (framework); LlamaCloud pago por créditos
- **Preço (USD):** Framework gratuito (MIT); LlamaCloud Free (10.000 créditos/mês), Starter $50/mês, Pro $500/mês
- **Data de verificação:** 2026-11-20
- **Fonte do preço:** https://www.llamaindex.ai/pricing
- **Licença:** MIT (framework)

## 📝 Descrição
Framework de dados para conectar LLMs a fontes privadas (documentos, bancos, APIs). Nasceu com foco em indexação e recuperação para RAG, com mais de 160 conectores de dados e índices prontos. O LlamaCloud adiciona uma camada gerenciada de parsing e indexação (LlamaParse para extrair texto de PDFs complexos, tabelas e imagens).

## 🎯 Para Que Serve
Ingerir, indexar e recuperar dados próprios para alimentar LLMs com contexto relevante, montando pipelines de RAG e agentes orientados a dados.

### Casos de Uso
1. RAG sobre base de conhecimento (documentos, wikis, manuais)
2. Prototipação rápida de busca semântica
3. Parsing de PDFs complexos com LlamaParse
4. Agentes que consultam dados estruturados e não estruturados

## ⏰ Quando Utilizar
- Quando o problema central é indexação e recuperação de dados próprios
- Quando precisa extrair texto de documentos complexos (tabelas, PDFs ruins)
- Quando quer montar RAG com poucos passos e boas abstrações de ingestão
- Quando precisa de conectores prontos para muitas fontes

### Quando NÃO utilizar
- Quando o foco é orquestração de agentes com estado e ciclos: prefira [[langgraph|LangGraph]]
- Quando a aplicação é tão simples que basta chamar a API do modelo direto
- Quando quer evitar dependência de serviço gerenciado e o parsing local já resolve

## 🧩 Categorias e Funcionalidades
- **Categorias:** [[orquestracao_llm|Orquestração de LLM]], [[rag_categoria|Ferramentas de RAG]], [[framework_agentes|Framework de agentes]]
- **Funcionalidades:** [[recuperacao_aumentada_rag|Recuperação aumentada (RAG)]], [[geracao_de_embeddings|Geração de embeddings]], [[busca_semantica|Busca semântica]], [[orquestracao_de_fluxos|Orquestração de fluxos]], [[tool_use_funcionalidade|Tool use]]
- **Casos de uso mapeados:** [[rag_sobre_base_de_conhecimento|RAG sobre base de conhecimento]], [[prototipacao_de_rag|Prototipação de RAG]], [[busca_semantica_em_acervos|Busca semântica em acervos]], [[resumo_de_documentos|Resumo de documentos]], [[construcao_de_agentes|Construção de agentes]]
Notas atômicas e legendas em [[hub_ai_tools|Mapa de Ferramentas de IA]].

## 🖥️ Compatibilidade e Plataformas
- **Plataformas:** python, javascript, cli, api, cloud (LlamaCloud)
- **Integra com:** [[chromadb|ChromaDB]], [[pgvector|pgvector]], [[pinecone|Pinecone]] (vector stores), [[openai|OpenAI]], [[ollama|Ollama]] (modelos e embeddings)
- **Requisitos:** Python ou TypeScript; chave de API do provider de LLM

## 🔒 Restrições e Especificações
- **Context window / limites:** herdados do modelo escolhido.
- **Residência de dados / privacidade:** local no framework; LlamaCloud processa dados na nuvem.
- **Offline:** parcial (framework com modelos locais via [[ollama|Ollama]]; LlamaCloud exige nuvem).
- **ToS / licença:** framework MIT; LlamaCloud sob ToS próprio.
- **Outras restrições:** LlamaCloud cobra por créditos (1.000 créditos = $1.25); custos de LLM e embeddings à parte.

## 🔧 Como Utilizar

### Instalação
```bash
pip install llama-index
```

### Uso Básico
```python
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
documents = SimpleDirectoryReader("./dados").load_data()
index = VectorStoreIndex.from_documents(documents)
query_engine = index.as_query_engine()
print(query_engine.query("O que e RAG?"))
```

## 🆚 Alternativas
- [[langchain|LangChain]] - ecossistema maior, foco em orquestração e agentes
- Haystack - framework de NLP/RAG (deepset)
- [[langgraph|LangGraph]] - para fluxos com estado e ciclos

### Vantagens sobre alternativas
- Abstrações de ingestão e indexação muito diretas
- LlamaParse resolve documentos difíceis
- Muitos conectores de dados prontos

### Desvantagens
- Menos voltado a orquestração complexa de agentes que [[langgraph|LangGraph]]
- LlamaCloud adiciona custo por créditos
- Abstrações evoluem rápido

## 💰 Custo e Contratação

### Planos (USD)
- **Framework:** gratuito, open source (MIT)
- **LlamaCloud Free:** 10.000 créditos/mês
- **LlamaCloud Starter:** $50/mês (40.000 créditos)
- **LlamaCloud Pro:** $500/mês (400.000 créditos)
- **Enterprise:** sob consulta
- **Fonte:** https://www.llamaindex.ai/pricing (verificado em 2026-11-20)

## 🧠 Conhecimentos Necessários
- Python - Intermediário
- [[rag|RAG]] - Básico
- [[geracao_de_embeddings|Embeddings]] - Básico

## 🔗 Relacionamentos
- **Contexto:** Ferramentas
- **Empresa:** [[llamaindex_inc|LlamaIndex Inc]]
- **Usado em:** Pipelines de RAG, busca semântica, agentes de dados
- **Alternativas:** [[langchain|LangChain]], Haystack, [[langgraph|LangGraph]]
- **Integra com:** [[chromadb|ChromaDB]], [[pgvector|pgvector]], [[pinecone|Pinecone]], [[openai|OpenAI]], [[ollama|Ollama]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
