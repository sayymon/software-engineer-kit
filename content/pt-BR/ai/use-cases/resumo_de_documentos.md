---
id: resumo_de_documentos
tipo: caso-de-uso
nome: Resumo de documentos
aliases:
  - resumo-documentos
descricao: Condensar relatórios, contratos, artigos e atas em versões curtas e fiéis.
funcionalidadesNecessarias:
  - "[[contexto_longo|Contexto longo]]"
  - "[[geracao_de_texto|Geração de texto]]"
  - "[[multimodal|Multimodal]]"
categoriasRelacionadas:
  - "[[assistente_chat|Assistente de chat]]"
  - "[[pesquisa_busca|Pesquisa e busca]]"
ferramentasRecomendadas:
  - "[[notebooklm|NotebookLM]]"
  - "[[claude|Claude AI]]"
  - "[[gemini|Gemini]]"
modelosRecomendados:
  - "[[gemini_3_8_flash|Gemini 3.8 Flash]]"
  - "[[claude_haiku_5_5|Claude Haiku 5.5]]"
criteriosDesempate:
  - privacidade-de-dados
  - custo
  - lock-in
criterioPadrao: privacidade-de-dados
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
macro: "[[escrita_e_documentos_macro|Escrita e documentos (macro)]]"
faixasPadrao:
  maisBarata:
    - "[[deepseek|DeepSeek]]"
    - "[[qwen|Qwen]]"
    - "[[mistral|Mistral]]"
  custoBeneficio:
    - "[[gemini|Gemini]]"
    - "[[grok|Grok]]"
    - "[[perplexity|Perplexity]]"
  qualidadeMaxima:
    - "[[claude|Claude AI]]"
    - "[[chatgpt|ChatGPT]]"
    - tabela:microsoft-copilot
variacoes:
  - id: resumo-artigo-paper
    nome: Resumo de artigo e paper
    descricao: Pontos centrais, método e limitações de textos técnicos.
    funcionalidades:
      - "[[contexto_longo|Contexto longo]]"
      - "[[geracao_de_texto|Geração de texto]]"
    herdaFerramentas: true
    parametros:
      - chave: Porte
        valor: Estudante ou pesquisador
        fonte: editorial
      - chave: Volume típico
        valor: Dezenas de artigos por semana
        fonte: editorial
      - chave: Tipo de documento
        valor: Artigos técnicos
        fonte: editorial
  - id: resumo-pdf-longo
    nome: Resumo de PDF e livro longo
    descricao: Capítulos resumidos com citação de página e perguntas sobre o conteúdo.
    funcionalidades:
      - "[[contexto_longo|Contexto longo]]"
      - "[[multimodal|Multimodal]]"
    herdaFerramentas: false
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
    justificativaFerramentas: "Muda Tipo de documento para pDF longo com capítulos: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Profissional independente
        fonte: editorial
      - chave: Volume típico
        valor: Um livro por semana
        fonte: editorial
      - chave: Tipo de documento
        valor: PDF longo com capítulos
        fonte: editorial
  - id: resumo-reuniao-chamadas
    nome: Resumo de reunião e chamada
    descricao: Decisões, responsáveis e prazos extraídos da gravação.
    funcionalidades:
      - "[[geracao_de_texto|Geração de texto]]"
      - "[[transcricao_de_audio|Transcrição de áudio]]"
    herdaFerramentas: false
    maisBarata:
      - "[[whisper|Whisper]]"
      - tabela:fathom-video
      - tabela:tldv
    custoBeneficio:
      - "[[otter_ai|Otter.ai]]"
      - tabela:fireflies-ai
      - tabela:read-ai
    qualidadeMaxima:
      - "[[granola|Granola]]"
      - tabela:avoma
      - tabela:rev
    justificativaFerramentas: "Muda Tipo de documento para gravação de reunião: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Equipes de qualquer porte
        fonte: editorial
      - chave: Volume típico
        valor: Várias gravações por dia
        fonte: editorial
      - chave: Tipo de documento
        valor: Gravação de reunião
        fonte: editorial
tags:
  - caso-de-uso
  - ia
---
# Resumo de documentos
## 📝 Descrição
Condensar relatórios, contratos, artigos e atas em versões curtas e fiéis.
## ⏰ Quando aplicar
- Documentos longos e coleções
- Atas e relatórios periódicos
## 🧩 Funcionalidades necessárias
- [[contexto_longo|Contexto longo]] - Janela de contexto grande o bastante para ler bases de código, contratos e longos históricos de uma vez.
- [[geracao_de_texto|Geração de texto]] - Produção de texto livre ou orientado por instruções, de rascunhos a respostas longas.
- [[multimodal|Multimodal]] - Entendimento de mais de um tipo de entrada, como texto, imagem, áudio, vídeo e PDF.
## ✅ Recomendações
- [[notebooklm|NotebookLM]] - Resumo ancorado nas fontes enviadas, com citações
- [[claude|Claude AI]] - Leitura cuidadosa de documentos longos
- [[gemini|Gemini]] - Contexto amplo e leitura de PDF
- [[gemini_3_8_flash|Gemini 3.8 Flash]] - Resumo em volume com custo baixo
- [[claude_haiku_5_5|Claude Haiku 5.5]] - Resumo rápido e barato para grandes lotes
## 🧬 Variações
- **Resumo de artigo e paper** (`resumo-artigo-paper`): Pontos centrais, método e limitações de textos técnicos. Funcionalidades: [[contexto_longo|Contexto longo]], [[geracao_de_texto|Geração de texto]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Porte: Estudante ou pesquisador; Volume típico: Dezenas de artigos por semana; Tipo de documento: Artigos técnicos.
- **Resumo de PDF e livro longo** (`resumo-pdf-longo`): Capítulos resumidos com citação de página e perguntas sobre o conteúdo. Funcionalidades: [[contexto_longo|Contexto longo]], [[multimodal|Multimodal]]. Mais barata: [[notebooklm|NotebookLM]], SearXNG, DuckDuckGo. Custo-benefício: [[perplexity|Perplexity]], [[firecrawl|Firecrawl]], Tavily. Qualidade máxima: Exa, SerpApi, Brave Search API. Por que difere do caso: Muda Tipo de documento para pDF longo com capítulos: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Profissional independente; Volume típico: Um livro por semana; Tipo de documento: PDF longo com capítulos.
- **Resumo de reunião e chamada** (`resumo-reuniao-chamadas`): Decisões, responsáveis e prazos extraídos da gravação. Funcionalidades: [[geracao_de_texto|Geração de texto]], [[transcricao_de_audio|Transcrição de áudio]]. Mais barata: [[whisper|Whisper]], Fathom (reuniões), tl;dv. Custo-benefício: [[otter_ai|Otter.ai]], Fireflies.ai, Read AI. Qualidade máxima: [[granola|Granola]], Avoma, Rev. Por que difere do caso: Muda Tipo de documento para gravação de reunião: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Equipes de qualquer porte; Volume típico: Várias gravações por dia; Tipo de documento: Gravação de reunião.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[deepseek|DeepSeek]], [[qwen|Qwen]], [[mistral|Mistral]]
- **Custo-benefício:** [[gemini|Gemini]], [[grok|Grok]], [[perplexity|Perplexity]]
- **Qualidade máxima:** [[claude|Claude AI]], [[chatgpt|ChatGPT]], Microsoft Copilot
## ⚖️ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** privacidade-de-dados. Documentos costumam conter dados sensíveis, então importa onde são processados e se treinam o modelo.
## 🔗 Relacionamentos
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Casos de Uso de IA
- **Macro:** [[escrita_e_documentos_macro|Escrita e documentos (macro)]]
