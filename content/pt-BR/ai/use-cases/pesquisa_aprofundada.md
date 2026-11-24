---
id: pesquisa_aprofundada
tipo: caso-de-uso
nome: Pesquisa aprofundada
aliases:
  - pesquisa-aprofundada
descricao: Investigar um tema em várias fontes e entregar um relatório com referências.
funcionalidadesNecessarias:
  - "[[busca_na_web|Busca na web]]"
  - "[[raciocinio|Raciocínio]]"
  - "[[contexto_longo|Contexto longo]]"
categoriasRelacionadas:
  - "[[pesquisa_busca|Pesquisa e busca]]"
  - "[[assistente_chat|Assistente de chat]]"
ferramentasRecomendadas:
  - "[[perplexity|Perplexity]]"
  - "[[chatgpt|ChatGPT]]"
  - "[[notebooklm|NotebookLM]]"
modelosRecomendados:
  - "[[claude_opus_5_5|Claude Opus 5.5]]"
  - "[[gemini_4_carbon|Gemini 4 Carbon]]"
criteriosDesempate:
  - lock-in
  - custo
  - privacidade-de-dados
criterioPadrao: lock-in
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
macro: "[[pesquisa_e_conhecimento|Pesquisa e conhecimento]]"
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
  - id: pesquisa-mercado-concorrencia
    nome: Pesquisa de mercado e concorrência
    descricao: Relatório com fontes sobre produtos, preços e posicionamento.
    funcionalidades:
      - "[[busca_na_web|Busca na web]]"
      - "[[raciocinio|Raciocínio]]"
      - "[[contexto_longo|Contexto longo]]"
    herdaFerramentas: true
    parametros:
      - chave: Ambiente de execução
        valor: Assistente de pesquisa com busca na web
        fonte: editorial
      - chave: Escala típica
        valor: Dezenas de fontes por relatório
        fonte: editorial
      - chave: Tipo de fonte
        valor: Sites de produto, preço e notícia
        fonte: editorial
  - id: pesquisa-academica
    nome: Pesquisa acadêmica
    descricao: Revisão de literatura com papers citados e lacunas de evidência.
    funcionalidades:
      - "[[busca_na_web|Busca na web]]"
      - "[[contexto_longo|Contexto longo]]"
      - "[[raciocinio|Raciocínio]]"
    herdaFerramentas: false
    maisBarata:
      - "[[notebooklm|NotebookLM]]"
      - tabela:searxng
      - tabela:gpt-researcher
    custoBeneficio:
      - "[[perplexity|Perplexity]]"
      - tabela:exa
      - tabela:brave-search-api
    qualidadeMaxima:
      - tabela:tavily
      - "[[claude|Claude AI]]"
      - "[[academic_research_skills|Academic Research Skills]]"
    justificativaFerramentas: "Muda Tipo de fonte para artigos revisados por pares: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Assistente com leitura de artigos
        fonte: editorial
      - chave: Escala típica
        valor: Dezenas de papers por revisão
        fonte: editorial
      - chave: Tipo de fonte
        valor: Artigos revisados por pares
        fonte: editorial
  - id: pesquisa-tecnica-decisao
    nome: Pesquisa técnica para decisão
    descricao: Comparação de tecnologias com prós, contras e fontes oficiais.
    funcionalidades:
      - "[[busca_na_web|Busca na web]]"
      - "[[raciocinio|Raciocínio]]"
    herdaFerramentas: false
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
    justificativaFerramentas: "Muda Tipo de fonte para documentação oficial e repositórios: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Chat com busca e leitura de documentação
        fonte: editorial
      - chave: Escala típica
        valor: Poucas tecnologias comparadas
        fonte: editorial
      - chave: Tipo de fonte
        valor: Documentação oficial e repositórios
        fonte: editorial
tags:
  - caso-de-uso
  - ia
---
# Pesquisa aprofundada
## 📝 Descrição
Investigar um tema em várias fontes e entregar um relatório com referências.
## ⏰ Quando aplicar
- Perguntas abertas que exigem várias fontes
- Relatórios com citações
## 🧩 Funcionalidades necessárias
- [[busca_na_web|Busca na web]] - Consulta à web em tempo real, com resposta fundamentada em fontes.
- [[raciocinio|Raciocínio]] - Resolução de problemas em várias etapas, com planejamento, lógica e matemática.
- [[contexto_longo|Contexto longo]] - Janela de contexto grande o bastante para ler bases de código, contratos e longos históricos de uma vez.
## ✅ Recomendações
- [[perplexity|Perplexity]] - Respostas com fontes e navegação em várias etapas
- [[chatgpt|ChatGPT]] - Modo de pesquisa profunda com relatório estruturado
- [[notebooklm|NotebookLM]] - Pesquisa ancorada em fontes enviadas pela pessoa
- [[claude_opus_5_5|Claude Opus 5.5]] - Raciocínio forte para sintetizar muitas fontes
- [[gemini_4_carbon|Gemini 4 Carbon]] - Contexto grande para cruzar muitos documentos
## 🧬 Variações
- **Pesquisa de mercado e concorrência** (`pesquisa-mercado-concorrencia`): Relatório com fontes sobre produtos, preços e posicionamento. Funcionalidades: [[busca_na_web|Busca na web]], [[raciocinio|Raciocínio]], [[contexto_longo|Contexto longo]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Ambiente de execução: Assistente de pesquisa com busca na web; Escala típica: Dezenas de fontes por relatório; Tipo de fonte: Sites de produto, preço e notícia.
- **Pesquisa acadêmica** (`pesquisa-academica`): Revisão de literatura com papers citados e lacunas de evidência. Funcionalidades: [[busca_na_web|Busca na web]], [[contexto_longo|Contexto longo]], [[raciocinio|Raciocínio]]. Mais barata: [[notebooklm|NotebookLM]], SearXNG, GPT Researcher. Custo-benefício: [[perplexity|Perplexity]], Exa, Brave Search API. Qualidade máxima: Tavily, [[claude|Claude AI]], [[academic_research_skills|Academic Research Skills]]. Por que difere do caso: Muda Tipo de fonte para artigos revisados por pares: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Assistente com leitura de artigos; Escala típica: Dezenas de papers por revisão; Tipo de fonte: Artigos revisados por pares.
- **Pesquisa técnica para decisão** (`pesquisa-tecnica-decisao`): Comparação de tecnologias com prós, contras e fontes oficiais. Funcionalidades: [[busca_na_web|Busca na web]], [[raciocinio|Raciocínio]]. Mais barata: [[deepseek|DeepSeek]], [[qwen|Qwen]], [[mistral|Mistral]]. Custo-benefício: [[gemini|Gemini]], [[grok|Grok]], [[perplexity|Perplexity]]. Qualidade máxima: [[claude|Claude AI]], [[chatgpt|ChatGPT]], Microsoft Copilot. Por que difere do caso: Muda Tipo de fonte para documentação oficial e repositórios: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Chat com busca e leitura de documentação; Escala típica: Poucas tecnologias comparadas; Tipo de fonte: Documentação oficial e repositórios.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[notebooklm|NotebookLM]], SearXNG, DuckDuckGo
- **Custo-benefício:** [[perplexity|Perplexity]], [[firecrawl|Firecrawl]], Tavily
- **Qualidade máxima:** Exa, SerpApi, Brave Search API
## ⚖️ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** lock-in. Relatórios gerados são portáteis, e manter várias fontes de busca evita dependência de um único fornecedor.
## 🔗 Relacionamentos
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Casos de Uso de IA
- **Macro:** [[pesquisa_e_conhecimento|Pesquisa e conhecimento]]
