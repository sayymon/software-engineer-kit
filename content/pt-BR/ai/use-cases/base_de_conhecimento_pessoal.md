---
id: base_de_conhecimento_pessoal
tipo: caso-de-uso
nome: Base de conhecimento pessoal
aliases: []
descricao: Organizar notas, leituras e referências em uma base pessoal pesquisável.
funcionalidadesNecessarias:
  - "[[busca_semantica|Busca semântica]]"
  - "[[geracao_de_texto|Geração de texto]]"
  - "[[memoria_persistente|Memória persistente]]"
  - "[[web_scraping_funcionalidade|Web scraping]]"
  - "[[recuperacao_aumentada_rag|Recuperação aumentada (RAG)]]"
categoriasRelacionadas:
  - "[[estudo_base_conhecimento|Estudo e base de conhecimento]]"
  - "[[extensoes_navegador|Extensões de navegador]]"
  - "[[rag_categoria|Ferramentas de RAG]]"
  - "[[wiki_base_conhecimento|Wiki e base de conhecimento]]"
ferramentasRecomendadas:
  - "[[notebooklm|NotebookLM]]"
  - "[[notion|Notion]]"
  - "[[bitwarden|Bitwarden]]"
  - "[[llamaindex|LlamaIndex]]"
  - "[[langchain|LangChain]]"
modelosRecomendados:
  - "[[gemini_embedding_2|Gemini Embedding 2]]"
criteriosDesempate:
  - custo
  - privacidade-de-dados
  - lock-in
criterioPadrao: lock-in
porte:
  - pessoa-fisica
  - pequena
segmentos:
  - pesquisa-conhecimento
  - escritorio-produtividade
nicho: ""
nivel: caso
eixo: tarefa
macro: "[[pesquisa_e_conhecimento|Pesquisa e conhecimento]]"
faixasPadrao:
  maisBarata:
    - "[[obsidian|Obsidian (ferramenta)]]"
    - tabela:logseq
    - tabela:anki
  custoBeneficio:
    - "[[notebooklm|NotebookLM]]"
    - "[[notion|Notion]]"
    - tabela:remnote
  qualidadeMaxima:
    - "[[perplexity|Perplexity]]"
    - tabela:readwise
    - tabela:mem-ai
variacoes:
  - id: kb-notas-conectadas
    nome: Notas conectadas
    descricao: Notas atômicas com links e grafo.
    funcionalidades:
      - "[[busca_semantica|Busca semântica]]"
      - "[[memoria_persistente|Memória persistente]]"
    herdaFerramentas: true
    parametros:
      - chave: Ambiente de execução
        valor: Aplicativo de notas com arquivos locais
        fonte: editorial
      - chave: Escala típica
        valor: Centenas de notas atômicas
        fonte: editorial
      - chave: Modo de captura
        valor: Escrita própria com links
        fonte: editorial
  - id: kb-captura-web
    nome: Captura da web
    descricao: Artigos e páginas salvos com resumo.
    funcionalidades:
      - "[[web_scraping_funcionalidade|Web scraping]]"
      - "[[geracao_de_texto|Geração de texto]]"
    herdaFerramentas: false
    maisBarata:
      - "[[obsidian|Obsidian (ferramenta)]]"
      - tabela:logseq
      - tabela:joplin
    custoBeneficio:
      - tabela:readwise
      - "[[notion|Notion]]"
      - "[[notebooklm|NotebookLM]]"
    qualidadeMaxima:
      - tabela:mem-ai
      - "[[perplexity|Perplexity]]"
      - tabela:remnote
    justificativaFerramentas: "Muda Modo de captura para página salva com resumo: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Extensão de navegador com leitor
        fonte: editorial
      - chave: Escala típica
        valor: Dezenas de artigos por semana
        fonte: editorial
      - chave: Modo de captura
        valor: Página salva com resumo
        fonte: editorial
  - id: kb-leituras-destaques
    nome: Leituras e destaques
    descricao: Livros e artigos com destaques revisados.
    funcionalidades:
      - "[[geracao_de_texto|Geração de texto]]"
      - "[[busca_semantica|Busca semântica]]"
    herdaFerramentas: true
    parametros:
      - chave: Ambiente de execução
        valor: Aplicativo de leitura com exportação
        fonte: editorial
      - chave: Escala típica
        valor: Dezenas de livros por ano
        fonte: editorial
      - chave: Modo de captura
        valor: Destaques revisados periodicamente
        fonte: editorial
  - id: kb-busca-semantica
    nome: Busca semântica nas notas
    descricao: Perguntas em linguagem natural sobre o acervo.
    funcionalidades:
      - "[[busca_semantica|Busca semântica]]"
      - "[[recuperacao_aumentada_rag|Recuperação aumentada (RAG)]]"
    herdaFerramentas: false
    maisBarata:
      - "[[pgvector|pgvector]]"
      - "[[chromadb|ChromaDB]]"
      - tabela:qdrant
    custoBeneficio:
      - "[[llamaindex|LlamaIndex]]"
      - "[[langchain|LangChain]]"
      - tabela:weaviate
    qualidadeMaxima:
      - "[[pinecone|Pinecone]]"
      - "[[gemini_embedding_2|Gemini Embedding 2]]"
      - tabela:cohere-rerank
    justificativaFerramentas: "Muda Modo de captura para pergunta em linguagem natural: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Índice vetorial com pgvector no Postgres 13 ou superior
        fonte: https://github.com/pgvector/pgvector
      - chave: Escala típica
        valor: Milhares de notas
        fonte: editorial
      - chave: Modo de captura
        valor: Pergunta em linguagem natural
        fonte: editorial
    verificadoEm: 2026-11-22
  - id: kb-wiki-equipe
    nome: Wiki compartilhada
    descricao: Base de conhecimento da equipe com permissões.
    funcionalidades:
      - "[[busca_semantica|Busca semântica]]"
      - "[[geracao_de_texto|Geração de texto]]"
    herdaFerramentas: false
    maisBarata:
      - "[[bookstack|BookStack]]"
      - tabela:outline
      - tabela:docmost
    custoBeneficio:
      - "[[notion|Notion]]"
      - tabela:slite
      - tabela:coda
    qualidadeMaxima:
      - "[[confluence|Confluence (ferramenta)]]"
      - tabela:guru
      - tabela:microsoft-sharepoint
    justificativaFerramentas: "Muda Modo de captura para escrita colaborativa: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Wiki hospedada com permissões
        fonte: editorial
      - chave: Escala típica
        valor: Centenas de páginas de equipe
        fonte: editorial
      - chave: Modo de captura
        valor: Escrita colaborativa
        fonte: editorial
tags:
  - caso-de-uso
  - ia
---
# Base de conhecimento pessoal
## 📝 Descrição
Organizar notas, leituras e referências em uma base pessoal pesquisável.
## ⏰ Quando aplicar
- Notas pessoais interligadas
- Leituras e anotações
## 🧩 Funcionalidades necessárias
- [[busca_semantica|Busca semântica]] - Recuperação de itens por similaridade de significado, em vez de palavras exatas.
- [[geracao_de_texto|Geração de texto]] - Produção de texto livre ou orientado por instruções, de rascunhos a respostas longas.
- [[memoria_persistente|Memória persistente]] - Retenção de informações entre sessões para manter contexto de longo prazo.
- [[web_scraping_funcionalidade|Web scraping]] - Coleta e estruturação de conteúdo de páginas web.
- [[recuperacao_aumentada_rag|Recuperação aumentada (RAG)]] - Combinação de recuperação de documentos com geração, para respostas baseadas em dados próprios.
## ✅ Recomendações
- [[notebooklm|NotebookLM]] - Faixa custo-benefício em [[estudo_base_conhecimento|Estudo e base de conhecimento]].
- [[notion|Notion]] - Faixa custo-benefício em [[estudo_base_conhecimento|Estudo e base de conhecimento]].
- [[bitwarden|Bitwarden]] - Faixa custo-benefício em [[extensoes_navegador|Extensões de navegador]].
- [[llamaindex|LlamaIndex]] - Faixa custo-benefício em [[rag_categoria|Ferramentas de RAG]].
- [[langchain|LangChain]] - Faixa custo-benefício em [[rag_categoria|Ferramentas de RAG]].
- [[gemini_embedding_2|Gemini Embedding 2]] - Modelo da faixa qualidade máxima em [[rag_categoria|Ferramentas de RAG]].
## 🧬 Variações
- **Notas conectadas** (`kb-notas-conectadas`): Notas atômicas com links e grafo. Funcionalidades: [[busca_semantica|Busca semântica]], [[memoria_persistente|Memória persistente]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Ambiente de execução: Aplicativo de notas com arquivos locais; Escala típica: Centenas de notas atômicas; Modo de captura: Escrita própria com links.
- **Captura da web** (`kb-captura-web`): Artigos e páginas salvos com resumo. Funcionalidades: [[web_scraping_funcionalidade|Web scraping]], [[geracao_de_texto|Geração de texto]]. Mais barata: [[obsidian|Obsidian (ferramenta)]], Logseq, Joplin. Custo-benefício: Readwise, [[notion|Notion]], [[notebooklm|NotebookLM]]. Qualidade máxima: Mem, [[perplexity|Perplexity]], RemNote. Por que difere do caso: Muda Modo de captura para página salva com resumo: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Extensão de navegador com leitor; Escala típica: Dezenas de artigos por semana; Modo de captura: Página salva com resumo.
- **Leituras e destaques** (`kb-leituras-destaques`): Livros e artigos com destaques revisados. Funcionalidades: [[geracao_de_texto|Geração de texto]], [[busca_semantica|Busca semântica]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Ambiente de execução: Aplicativo de leitura com exportação; Escala típica: Dezenas de livros por ano; Modo de captura: Destaques revisados periodicamente.
- **Busca semântica nas notas** (`kb-busca-semantica`): Perguntas em linguagem natural sobre o acervo. Funcionalidades: [[busca_semantica|Busca semântica]], [[recuperacao_aumentada_rag|Recuperação aumentada (RAG)]]. Mais barata: [[pgvector|pgvector]], [[chromadb|ChromaDB]], Qdrant. Custo-benefício: [[llamaindex|LlamaIndex]], [[langchain|LangChain]], Weaviate. Qualidade máxima: [[pinecone|Pinecone]], [[gemini_embedding_2|Gemini Embedding 2]], Cohere Rerank. Por que difere do caso: Muda Modo de captura para pergunta em linguagem natural: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Índice vetorial com pgvector no Postgres 13 ou superior; Escala típica: Milhares de notas; Modo de captura: Pergunta em linguagem natural.
- **Wiki compartilhada** (`kb-wiki-equipe`): Base de conhecimento da equipe com permissões. Funcionalidades: [[busca_semantica|Busca semântica]], [[geracao_de_texto|Geração de texto]]. Mais barata: [[bookstack|BookStack]], Outline, Docmost. Custo-benefício: [[notion|Notion]], Slite, Coda. Qualidade máxima: [[confluence|Confluence (ferramenta)]], Guru, Microsoft SharePoint. Por que difere do caso: Muda Modo de captura para escrita colaborativa: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Wiki hospedada com permissões; Escala típica: Centenas de páginas de equipe; Modo de captura: Escrita colaborativa.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[obsidian|Obsidian (ferramenta)]], Logseq, Anki
- **Custo-benefício:** [[notebooklm|NotebookLM]], [[notion|Notion]], RemNote
- **Qualidade máxima:** [[perplexity|Perplexity]], Readwise, Mem
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** lock-in. Notas são de longa vida e o formato aberto protege contra a troca de ferramenta.
## 🔗 Relacionamentos
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Casos de Uso de IA
- **Macro:** [[pesquisa_e_conhecimento|Pesquisa e conhecimento]]
