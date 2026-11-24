---
id: prototipacao_de_rag
tipo: caso-de-uso
nome: Prototipação de RAG
aliases:
  - prototipacao-rag
descricao: Montar rapidamente um protótipo de RAG para validar uma ideia.
funcionalidadesNecessarias:
  - "[[recuperacao_aumentada_rag|Recuperação aumentada (RAG)]]"
  - "[[geracao_de_embeddings|Geração de embeddings]]"
  - "[[busca_semantica|Busca semântica]]"
categoriasRelacionadas:
  - "[[rag_categoria|Ferramentas de RAG]]"
  - "[[vector_store|Vector store]]"
ferramentasRecomendadas:
  - "[[notebooklm|NotebookLM]]"
  - "[[llamaindex|LlamaIndex]]"
  - "[[chromadb|ChromaDB]]"
modelosRecomendados:
  - "[[gemini_3_8_flash|Gemini 3.8 Flash]]"
  - "[[gemini_embedding_2|Gemini Embedding 2]]"
criteriosDesempate:
  - custo
  - privacidade-de-dados
  - lock-in
criterioPadrao: custo
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
    - "[[notebooklm|NotebookLM]]"
    - tabela:searxng
    - tabela:duckduckgo
  custoBeneficio:
    - "[[perplexity|Perplexity]]"
    - "[[firecrawl|Firecrawl]]"
    - tabela:tavily
  qualidadeMaxima:
    - tabela:exa
    - tabela:serpapi
    - tabela:brave-search-api
variacoes:
  - id: proto-rag-notebook
    nome: Protótipo em notebook
    descricao: Prova de conceito com poucos documentos em um dia.
    funcionalidades:
      - "[[recuperacao_aumentada_rag|Recuperação aumentada (RAG)]]"
      - "[[geracao_de_embeddings|Geração de embeddings]]"
    herdaFerramentas: true
    parametros:
      - chave: Ambiente de execução
        valor: Notebook hospedado
        fonte: editorial
      - chave: Escala típica
        valor: Poucos documentos em um dia
        fonte: editorial
      - chave: Fonte dos documentos
        valor: Arquivos enviados à mão
        fonte: editorial
  - id: proto-rag-local
    nome: Protótipo local com vetor leve
    descricao: Índice em ChromaDB ou pgvector na máquina do time.
    funcionalidades:
      - "[[recuperacao_aumentada_rag|Recuperação aumentada (RAG)]]"
      - "[[busca_semantica|Busca semântica]]"
      - "[[execucao_local|Execução local]]"
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
    justificativaFerramentas: "Muda Fonte dos documentos para pasta de arquivos do time: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Máquina do time com pgvector no Postgres 13 ou superior ou ChromaDB
        fonte: https://github.com/pgvector/pgvector
      - chave: Escala típica
        valor: Centenas de documentos
        fonte: editorial
      - chave: Fonte dos documentos
        valor: Pasta de arquivos do time
        fonte: editorial
    verificadoEm: 2026-11-22
  - id: proto-rag-avaliado
    nome: Protótipo com avaliação
    descricao: Conjunto de perguntas de referência para medir acerto.
    funcionalidades:
      - "[[recuperacao_aumentada_rag|Recuperação aumentada (RAG)]]"
      - "[[avaliacao_de_qualidade|Avaliação de qualidade]]"
    herdaFerramentas: false
    maisBarata:
      - "[[promptfoo|Promptfoo]]"
      - tabela:ragas
      - tabela:deepeval
    custoBeneficio:
      - "[[langfuse|LangFuse]]"
      - tabela:arize-phoenix
      - tabela:braintrust
    qualidadeMaxima:
      - "[[microsoft_foundry|Microsoft Foundry]]"
      - tabela:langsmith
      - tabela:datadog-llm-observability
    justificativaFerramentas: "Muda Fonte dos documentos para documentos com respostas conhecidas: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Suíte de avaliação ao lado do protótipo
        fonte: editorial
      - chave: Escala típica
        valor: Dezenas de perguntas de referência
        fonte: editorial
      - chave: Fonte dos documentos
        valor: Documentos com respostas conhecidas
        fonte: editorial
tags:
  - caso-de-uso
  - ia
---
# Prototipação de RAG
## 📝 Descrição
Montar rapidamente um protótipo de RAG para validar uma ideia.
## ⏰ Quando aplicar
- Provas de conceito
- Demonstrações para stakeholders
## 🧩 Funcionalidades necessárias
- [[recuperacao_aumentada_rag|Recuperação aumentada (RAG)]] - Combinação de recuperação de documentos com geração, para respostas baseadas em dados próprios.
- [[geracao_de_embeddings|Geração de embeddings]] - Conversão de texto ou outras mídias em vetores numéricos que representam significado.
- [[busca_semantica|Busca semântica]] - Recuperação de itens por similaridade de significado, em vez de palavras exatas.
## ✅ Recomendações
- [[notebooklm|NotebookLM]] - Protótipo imediato com fontes enviadas, sem código
- [[llamaindex|LlamaIndex]] - Protótipo em poucas linhas com muitos conectores
- [[chromadb|ChromaDB]] - Banco local sem infraestrutura
- [[gemini_3_8_flash|Gemini 3.8 Flash]] - Geração rápida e barata para iterar
- [[gemini_embedding_2|Gemini Embedding 2]] - Embeddings acessíveis para o protótipo
## 🧬 Variações
- **Protótipo em notebook** (`proto-rag-notebook`): Prova de conceito com poucos documentos em um dia. Funcionalidades: [[recuperacao_aumentada_rag|Recuperação aumentada (RAG)]], [[geracao_de_embeddings|Geração de embeddings]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Ambiente de execução: Notebook hospedado; Escala típica: Poucos documentos em um dia; Fonte dos documentos: Arquivos enviados à mão.
- **Protótipo local com vetor leve** (`proto-rag-local`): Índice em ChromaDB ou pgvector na máquina do time. Funcionalidades: [[recuperacao_aumentada_rag|Recuperação aumentada (RAG)]], [[busca_semantica|Busca semântica]], [[execucao_local|Execução local]]. Mais barata: [[pgvector|pgvector]], [[chromadb|ChromaDB]], Qdrant. Custo-benefício: Weaviate, Milvus, LanceDB. Qualidade máxima: [[pinecone|Pinecone]], Azure AI Search, Vertex AI Vector Search. Por que difere do caso: Muda Fonte dos documentos para pasta de arquivos do time: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Máquina do time com pgvector no Postgres 13 ou superior ou ChromaDB; Escala típica: Centenas de documentos; Fonte dos documentos: Pasta de arquivos do time.
- **Protótipo com avaliação** (`proto-rag-avaliado`): Conjunto de perguntas de referência para medir acerto. Funcionalidades: [[recuperacao_aumentada_rag|Recuperação aumentada (RAG)]], [[avaliacao_de_qualidade|Avaliação de qualidade]]. Mais barata: [[promptfoo|Promptfoo]], Ragas, DeepEval. Custo-benefício: [[langfuse|LangFuse]], Arize Phoenix, Braintrust. Qualidade máxima: [[microsoft_foundry|Microsoft Foundry]], LangSmith, Datadog LLM Observability. Por que difere do caso: Muda Fonte dos documentos para documentos com respostas conhecidas: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Suíte de avaliação ao lado do protótipo; Escala típica: Dezenas de perguntas de referência; Fonte dos documentos: Documentos com respostas conhecidas.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[notebooklm|NotebookLM]], SearXNG, DuckDuckGo
- **Custo-benefício:** [[perplexity|Perplexity]], [[firecrawl|Firecrawl]], Tavily
- **Qualidade máxima:** Exa, SerpApi, Brave Search API
## ⚖️ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** custo. Protótipos são descartáveis, então o menor esforço e gasto para validar a ideia manda.
## 🔗 Relacionamentos
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Casos de Uso de IA
- **Macro:** [[ia_aplicada_e_agentes|IA aplicada e agentes]]
