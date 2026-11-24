---
id: langchain
tipo: ferramenta
nome: LangChain
tipos:
  - FRAMEWORK
  - BIBLIOTECA
empresa: "[[langchain_inc|LangChain Inc]]"
aliases:
  - LangChain
  - Langchain
categorias:
  - "[[orquestracao_llm|Orquestração de LLM]]"
  - "[[framework_agentes|Framework de agentes]]"
  - "[[rag_categoria|Ferramentas de RAG]]"
funcionalidades:
  - "[[orquestracao_de_fluxos|Orquestração de fluxos]]"
  - "[[tool_use_funcionalidade|Tool use]]"
  - "[[recuperacao_aumentada_rag|Recuperação aumentada (RAG)]]"
  - "[[memoria_persistente|Memória persistente]]"
  - "[[geracao_de_embeddings|Geração de embeddings]]"
  - "[[integracao_de_apis|Integração de APIs]]"
casosDeUso:
  - "[[rag_sobre_base_de_conhecimento|RAG sobre base de conhecimento]]"
  - "[[construcao_de_agentes|Construção de agentes]]"
  - "[[chat_e_assistente_geral|Chat e assistente geral]]"
  - "[[prototipacao_de_rag|Prototipação de RAG]]"
  - "[[base_de_conhecimento_pessoal|Base de conhecimento pessoal]]"
  - "[[atendimento_e_suporte|Atendimento e suporte]]"
modelos: []
modeloContratacao:
  - open-source
precoUSD: 0
plataformas:
  - self-hosted
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
  - abstracoes mudam entre versoes (breaking changes)
  - overhead de abstracao para casos simples
  - stack trace longo em erros
dataVerificacao: 2026-11-20
fontePreco: https://www.langchain.com/pricing
precoMedio: 0
tags:
  - ferramenta
  - ia
  - langchain
  - agentes
  - chains
  - rag
---
# LangChain

Conceito, LCEL, integrações por provider e exemplos de código em [[langchain|Langchain (conceito e exemplos)]]. Esta nota é a ficha de ferramenta do mapa.

## 📋 Informações Básicas
- **Tipos:** Framework de orquestração de LLMs
- **Empresa/Fabricante:** [[langchain_inc|LangChain Inc]] (Harrison Chase)
- **Website:** https://www.langchain.com
- **Categorias:** Orquestração de LLM, Framework de agentes, RAG
- **Modelo de contratação:** open-source (framework); LangSmith tem planos pagos à parte
- **Preço (USD):** Framework gratuito (MIT). LangSmith com free tier e planos pagos
- **Data de verificação:** 2026-11-20
- **Fonte do preço:** https://www.langchain.com/pricing
- **Licença:** MIT

## 📝 Descrição
Framework principal do ecossistema para orquestração de LLMs. Fornece abstrações para chains (sequências de chamadas), tools (ferramentas externas), memory (contexto persistente) e retrieval (RAG). Base do ecossistema que inclui [[langgraph|LangGraph]] (grafos de agentes), LangSmith (observabilidade) e LangServe (deploy).

Diferença chave: LangChain é para chains lineares e composições simples. Para fluxos complexos com estado, ciclos e decisões condicionais, use [[langgraph|LangGraph]].

## 🎯 Para Que Serve
Construir aplicações que combinam LLMs com ferramentas externas, bases de conhecimento e lógica de negócio de forma estruturada.

### Casos de Uso
1. Pipelines de RAG (retrieval + generation)
2. Chatbots com memória de conversação
3. Agentes que usam ferramentas (APIs, busca, cálculo)
4. Chains de processamento de texto (resumir, traduzir, extrair)

## ⏰ Quando Utilizar
- Quando precisa conectar LLMs a fontes de dados externas
- Quando quer RAG com vector stores
- Quando precisa de memória entre interações
- Quando quer abstrações prontas para patterns comuns de LLM

### Quando NÃO utilizar
- Quando precisa de fluxos complexos com estado: use [[langgraph|LangGraph]]
- Quando a aplicação é simples o suficiente para chamar a API diretamente
- Quando precisa de controle fino sobre cada chamada
- Quando performance extrema é crítica (abstrações adicionam latência)

## 🧩 Categorias e Funcionalidades
- **Categorias:** [[orquestracao_llm|Orquestração de LLM]], [[framework_agentes|Framework de agentes]], [[rag_categoria|Ferramentas de RAG]]
- **Funcionalidades:** [[orquestracao_de_fluxos|Orquestração de fluxos]], [[tool_use_funcionalidade|Tool use]], [[recuperacao_aumentada_rag|Recuperação aumentada (RAG)]], [[memoria_persistente|Memória persistente]], [[geracao_de_embeddings|Geração de embeddings]], [[integracao_de_apis|Integração de APIs]]
- **Casos de uso mapeados:** [[rag_sobre_base_de_conhecimento|RAG sobre base de conhecimento]], [[construcao_de_agentes|Construção de agentes]], [[chat_e_assistente_geral|Chat e assistente geral]], [[prototipacao_de_rag|Prototipação de RAG]]
Notas atômicas e legendas em [[hub_ai_tools|Mapa de Ferramentas de IA]].

## 🖥️ Compatibilidade e Plataformas
- **Plataformas:** python, javascript, self-hosted
- **Integra com:** [[openai|OpenAI]], [[chromadb|ChromaDB]], [[pgvector|pgvector]], [[pinecone|Pinecone]], [[ollama|Ollama]], [[firecrawl|Firecrawl]], [[langfuse|LangFuse]] (callbacks)
- **Requisitos:** Python ou JavaScript; chave de API do provider

## 🔒 Restrições e Especificações
- **Context window / limites:** herdados do modelo escolhido.
- **Residência de dados / privacidade:** depende dos providers conectados.
- **Offline:** parcial (com [[ollama|Ollama]] local).
- **ToS / licença:** framework MIT; LangSmith sob ToS próprio.
- **Outras restrições:** abstrações mudam entre versões (breaking changes).

## 🔧 Como Utilizar

### Instalação
```bash
pip install langchain langchain-openai langchain-community
```

### Uso Básico
```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

llm = ChatOpenAI(model="gpt-4o")
prompt = ChatPromptTemplate.from_messages([("system", "Voce e um assistente tecnico."), ("user", "{question}")])
chain = prompt | llm | StrOutputParser()
response = chain.invoke({"question": "O que e RAG?"})
```

Exemplos de RAG, integrações por provider e execução local em [[langchain|Langchain (conceito e exemplos)]].

## 🆚 Alternativas
- [[llamaindex|LlamaIndex]] - foco maior em data indexing e RAG
- Semantic Kernel - framework da Microsoft (.NET/Python)
- Haystack - framework de NLP/RAG (deepset)
- [[langgraph|LangGraph]] - mesmo ecossistema, para fluxos com estado

### Vantagens sobre alternativas
- Maior ecossistema e comunidade
- Centenas de integrações (tools e loaders)
- Documentação extensa
- Ecossistema completo (LangGraph, LangSmith, LangServe)

### Desvantagens
- Abstrações mudam frequentemente
- Pode ser over-engineered para casos simples
- Debugging difícil pelas camadas de abstração
- Documentação às vezes defasada

## 💰 Custo e Contratação

### Planos (USD)
- **LangChain (framework):** gratuito, open source
- **LangSmith (observabilidade):** free tier + planos pagos
- **LangServe:** gratuito (self-hosted)
- **Fonte:** https://www.langchain.com/pricing (verificado em 2026-11-20)

## 🧠 Conhecimentos Necessários
- Python - Intermediário
- LLMs - Básico
- [[geracao_de_embeddings|Embeddings]] - Básico
- [[rag|RAG]] - Básico

## 📚 Documentação
- [Documentação oficial](https://python.langchain.com/docs/)
- [Tutoriais](https://python.langchain.com/docs/tutorials/)
- [GitHub (langchain)](https://github.com/langchain-ai/langchain)
- [LangChain Hub](https://smith.langchain.com/hub)
- **Ecossistema relacionado:** LangSmith, LangServe

## 🔗 Relacionamentos
- **Contexto:** Ferramentas
- **Conceito:** [[langchain|Langchain (conceito e exemplos)]]
- **Empresa:** [[langchain_inc|LangChain Inc]]
- **Usado em:** Projetos RAG, chatbots, agentes
- **Alternativas:** [[llamaindex|LlamaIndex]], Semantic Kernel, [[langgraph|LangGraph]]
- **Integra com:** [[openai|OpenAI]], [[chromadb|ChromaDB]], [[pgvector|pgvector]], [[ollama|Ollama]], [[firecrawl|Firecrawl]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
