---
id: ingestao_de_dados_da_web
tipo: caso-de-uso
nome: Ingestão de dados da web
aliases:
  - ingestao-dados-web
descricao: Coletar e estruturar conteúdo de sites para alimentar modelos e pipelines.
funcionalidadesNecessarias:
  - "[[web_scraping_funcionalidade|Web scraping]]"
  - "[[saida_estruturada|Saída estruturada]]"
  - "[[integracao_de_apis|Integração de APIs]]"
categoriasRelacionadas:
  - "[[web_scraping|Ferramentas de web scraping]]"
  - "[[rag_categoria|Ferramentas de RAG]]"
ferramentasRecomendadas:
  - "[[firecrawl|Firecrawl]]"
  - "[[perplexity|Perplexity]]"
modelosRecomendados:
  - "[[gemini_3_8_flash|Gemini 3.8 Flash]]"
  - "[[deepseek_v4_1_flash|DeepSeek V4.1 Flash]]"
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
macro: "[[dados_e_analytics|Dados e analytics]]"
faixasPadrao:
  maisBarata:
    - tabela:crawl4ai
    - tabela:scrapy
    - "[[playwright|Playwright]]"
  custoBeneficio:
    - "[[firecrawl|Firecrawl]]"
    - tabela:apify
    - tabela:jina-reader
  qualidadeMaxima:
    - tabela:bright-data
    - tabela:zyte
    - tabela:browserbase
variacoes:
  - id: web-scraping-paginas
    nome: Scraping de páginas estruturadas
    descricao: Extração de preços e listas com seletores e saída em JSON.
    funcionalidades:
      - "[[web_scraping_funcionalidade|Web scraping]]"
      - "[[saida_estruturada|Saída estruturada]]"
    herdaFerramentas: true
    parametros:
      - chave: Linguagem ou runtime
        valor: Python ou Node com seletores
        fonte: editorial
      - chave: Escala típica
        valor: Centenas de páginas por execução
        fonte: editorial
      - chave: Alvo da coleta
        valor: Páginas com estrutura repetida
        fonte: editorial
  - id: web-crawl-para-rag
    nome: Crawl para alimentar RAG
    descricao: Site inteiro convertido em Markdown limpo para indexação.
    funcionalidades:
      - "[[web_scraping_funcionalidade|Web scraping]]"
      - "[[geracao_de_embeddings|Geração de embeddings]]"
    herdaFerramentas: false
    maisBarata:
      - tabela:crawl4ai
      - tabela:scrapy
      - "[[markitdown|MarkItDown]]"
    custoBeneficio:
      - tabela:jina-reader
      - "[[firecrawl|Firecrawl]]"
      - tabela:docling
    qualidadeMaxima:
      - tabela:apify
      - tabela:unstructured
      - tabela:bright-data
    justificativaFerramentas: "Muda Alvo da coleta para documentação e artigos para indexação: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Linguagem ou runtime
        valor: Rastreador com saída em Markdown
        fonte: editorial
      - chave: Escala típica
        valor: Site inteiro com milhares de URLs
        fonte: editorial
      - chave: Alvo da coleta
        valor: Documentação e artigos para indexação
        fonte: editorial
  - id: web-monitoramento-mudancas
    nome: Monitoramento de mudanças
    descricao: Coleta periódica com alerta de alteração em páginas.
    funcionalidades:
      - "[[web_scraping_funcionalidade|Web scraping]]"
      - "[[automacao_de_workflow|Automação de workflow]]"
    herdaFerramentas: false
    maisBarata:
      - tabela:activepieces
      - tabela:node-red
      - tabela:windmill
    custoBeneficio:
      - "[[n8n|n8n]]"
      - tabela:make
      - tabela:pipedream
    qualidadeMaxima:
      - tabela:zapier
      - tabela:power-automate
      - tabela:workato
    justificativaFerramentas: "Muda Alvo da coleta para preço, texto ou disponibilidade que muda: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Linguagem ou runtime
        valor: Rotina agendada com alerta
        fonte: editorial
      - chave: Escala típica
        valor: Dezenas de páginas vigiadas
        fonte: editorial
      - chave: Alvo da coleta
        valor: Preço, texto ou disponibilidade que muda
        fonte: editorial
tags:
  - caso-de-uso
  - ia
---
# Ingestão de dados da web
## 📝 Descrição
Coletar e estruturar conteúdo de sites para alimentar modelos e pipelines.
## ⏰ Quando aplicar
- Bases de conhecimento a partir de sites
- Monitoramento de páginas
## 🧩 Funcionalidades necessárias
- [[web_scraping_funcionalidade|Web scraping]] - Coleta e estruturação de conteúdo de páginas web.
- [[saida_estruturada|Saída estruturada]] - Respostas que seguem um esquema, como JSON validado, para uso direto por programas.
- [[integracao_de_apis|Integração de APIs]] - Conexão de modelos e agentes a APIs e serviços de terceiros.
## ✅ Recomendações
- [[firecrawl|Firecrawl]] - Converte páginas em markdown ou JSON prontos para modelos
- [[perplexity|Perplexity]] - Pesquisa pontual com fontes citadas
- [[gemini_3_8_flash|Gemini 3.8 Flash]] - Extração estruturada em volume com custo baixo
- [[deepseek_v4_1_flash|DeepSeek V4.1 Flash]] - Extração econômica em grandes lotes
## 🧬 Variações
- **Scraping de páginas estruturadas** (`web-scraping-paginas`): Extração de preços e listas com seletores e saída em JSON. Funcionalidades: [[web_scraping_funcionalidade|Web scraping]], [[saida_estruturada|Saída estruturada]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Linguagem ou runtime: Python ou Node com seletores; Escala típica: Centenas de páginas por execução; Alvo da coleta: Páginas com estrutura repetida.
- **Crawl para alimentar RAG** (`web-crawl-para-rag`): Site inteiro convertido em Markdown limpo para indexação. Funcionalidades: [[web_scraping_funcionalidade|Web scraping]], [[geracao_de_embeddings|Geração de embeddings]]. Mais barata: Crawl4AI, Scrapy, [[markitdown|MarkItDown]]. Custo-benefício: Jina Reader, [[firecrawl|Firecrawl]], Docling. Qualidade máxima: Apify, Unstructured, Bright Data. Por que difere do caso: Muda Alvo da coleta para documentação e artigos para indexação: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Linguagem ou runtime: Rastreador com saída em Markdown; Escala típica: Site inteiro com milhares de URLs; Alvo da coleta: Documentação e artigos para indexação.
- **Monitoramento de mudanças** (`web-monitoramento-mudancas`): Coleta periódica com alerta de alteração em páginas. Funcionalidades: [[web_scraping_funcionalidade|Web scraping]], [[automacao_de_workflow|Automação de workflow]]. Mais barata: Activepieces, Node-RED, Windmill. Custo-benefício: [[n8n|n8n]], Make, Pipedream. Qualidade máxima: Zapier, Power Automate, Workato. Por que difere do caso: Muda Alvo da coleta para preço, texto ou disponibilidade que muda: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Linguagem ou runtime: Rotina agendada com alerta; Escala típica: Dezenas de páginas vigiadas; Alvo da coleta: Preço, texto ou disponibilidade que muda.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** Crawl4AI, Scrapy, [[playwright|Playwright]]
- **Custo-benefício:** [[firecrawl|Firecrawl]], Apify, Jina Reader
- **Qualidade máxima:** Bright Data, Zyte API, Browserbase
## ⚖️ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** custo. A coleta em escala repete chamadas de modelo, então o custo por página define a viabilidade.
## 🔗 Relacionamentos
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Casos de Uso de IA
- **Macro:** [[dados_e_analytics|Dados e analytics]]
