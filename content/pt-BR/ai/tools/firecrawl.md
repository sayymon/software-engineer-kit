---
id: firecrawl
tipo: ferramenta
nome: Firecrawl
tipos:
  - SERVICO
  - PLATAFORMA
empresa: "[[firecrawl_inc|Firecrawl Inc]]"
aliases:
  - Firecrawl
categorias:
  - "[[web_scraping|Ferramentas de web scraping]]"
  - "[[pesquisa_busca|Pesquisa e busca]]"
  - "[[rag_categoria|Ferramentas de RAG]]"
funcionalidades:
  - "[[web_scraping_funcionalidade|Web scraping]]"
  - "[[busca_na_web|Busca na web]]"
  - "[[recuperacao_aumentada_rag|Recuperação aumentada (RAG)]]"
casosDeUso:
  - "[[ingestao_de_dados_da_web|Ingestão de dados da web]]"
  - "[[rag_sobre_base_de_conhecimento|RAG sobre base de conhecimento]]"
  - "[[engenharia_de_dados_e_etl|Engenharia de dados e ETL]]"
  - "[[automacao_de_navegador_e_rpa|Automação de navegador e RPA]]"
  - "[[vendas_e_crm|Vendas e CRM]]"
modelos: []
modeloContratacao:
  - free
  - subscription
  - open-source
precoUSD: 19
plataformas:
  - api
  - cloud
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
  - free tier com 1000 creditos/mes
  - subscription-only, sem pay-as-you-go
  - latencia maior por JavaScript rendering
  - creditos nao acumulam nos planos menores
dataVerificacao: 2026-11-20
fontePreco: https://firecrawl.dev/pricing
precoMedio: 19
tags:
  - ferramenta
  - ia
  - scraping
  - rag
  - firecrawl
  - markdown
---
# Firecrawl

## 📋 Informações Básicas
- **Tipos:** Serviço de web scraping otimizado para IA
- **Empresa/Fabricante:** [[firecrawl_inc|Firecrawl Inc]] (originada na Mendable)
- **Website:** https://firecrawl.dev
- **Categorias:** Web scraping, Pesquisa e busca, RAG
- **Modelo de contratação:** free, subscription, open-source (self-host)
- **Preço (USD):** Free 1000 créditos/mês; Hobby $19/mês; Standard $99/mês; Growth $399/mês; Scale $749/mês (planos anuais mais baratos); self-host gratuito
- **Data de verificação:** 2026-11-20
- **Fonte do preço:** https://firecrawl.dev/pricing
- **Licença:** open source (self-host) + SaaS

## 📝 Descrição
Ferramenta de web scraping projetada para pipelines de IA e RAG. Extrai conteúdo de páginas web e retorna em Markdown limpo, pronto para LLMs. Lida com JavaScript rendering, limpeza de HTML e extração estruturada.

## 🎯 Para Que Serve
Extrair conteúdo de websites de forma limpa e estruturada para alimentar bases de conhecimento, pipelines de RAG e treinamento de modelos.

### Casos de Uso
1. Alimentar bases de conhecimento RAG com conteúdo web
2. Crawl recursivo de documentações técnicas
3. Extração de dados estruturados de páginas web
4. Monitoramento de mudanças em conteúdo web

## ⏰ Quando Utilizar
- Quando precisa extrair conteúdo web para RAG
- Quando quer Markdown limpo sem HTML/CSS/JS residual
- Quando precisa crawlear sites inteiros recursivamente
- Quando a página requer JavaScript rendering

### Quando NÃO utilizar
- Quando precisa de scraping em escala massiva (milhões de páginas)
- Quando o conteúdo está atrás de login complexo com CAPTCHA
- Quando já tem o conteúdo em formato estruturado (API disponível)

## 🧩 Categorias e Funcionalidades
- **Categorias:** [[web_scraping|Ferramentas de web scraping]], [[pesquisa_busca|Pesquisa e busca]], [[rag_categoria|Ferramentas de RAG]]
- **Funcionalidades:** [[web_scraping_funcionalidade|Web scraping]], [[busca_na_web|Busca na web]], [[recuperacao_aumentada_rag|Recuperação aumentada (RAG)]]
- **Casos de uso mapeados:** [[ingestao_de_dados_da_web|Ingestão de dados da web]], [[rag_sobre_base_de_conhecimento|RAG sobre base de conhecimento]]
Notas atômicas e legendas em [[hub_ai_tools|Mapa de Ferramentas de IA]].

## 🖥️ Compatibilidade e Plataformas
- **Plataformas:** python, javascript, api, cloud, self-hosted
- **Integra com:** [[langchain|LangChain]] (document loader nativo), [[llamaindex|LlamaIndex]] (data connector), [[pgvector|pgvector]] e [[chromadb|ChromaDB]] (armazenam os embeddings do conteúdo)
- **Requisitos:** chave de API (cloud) ou infra própria (self-host)

## 🔒 Restrições e Especificações
- **Context window / limites:** não aplicável; limites por créditos do plano.
- **Residência de dados / privacidade:** cloud na infra do Firecrawl; self-host mantém local.
- **Offline:** parcial (self-host).
- **ToS / licença:** open source para self-host; SaaS sob ToS.
- **Outras restrições:** subscription-only, sem pay-as-you-go; créditos não acumulam nos planos menores.

## 🔧 Como Utilizar

### Instalação
```bash
pip install firecrawl-py
# ou: npm install @mendable/firecrawl-js
```

### Uso Básico
```python
from firecrawl import FirecrawlApp

app = FirecrawlApp(api_key="fc-...")
result = app.scrape_url("https://docs.example.com/intro")
print(result["markdown"])

crawl_result = app.crawl_url("https://docs.example.com", params={"limit": 100, "scrapeOptions": {"formats": ["markdown"]}})
```

## 🆚 Alternativas
- Jina Reader - API simples de extração (r.jina.ai)
- Crawl4AI - open source, self-hosted
- Beautiful Soup - scraping manual em Python (mais trabalho)
- [[playwright|Playwright]] - browser automation (mais baixo nível)

### Vantagens sobre alternativas
- Output otimizado para IA (Markdown limpo)
- Crawl recursivo com configuração mínima
- Lida com JavaScript rendering automaticamente
- SDK simples em Python e Node

### Desvantagens
- Free tier limitado em número de páginas
- Latência maior que scraping direto (rendering)
- Dependência de serviço externo (SaaS)

## 💰 Custo e Contratação

### Planos (USD)
- **Free:** 1000 créditos/mês (sem cartão)
- **Hobby:** $19/mês ($16/mês no anual), 5.000 créditos
- **Standard:** $99/mês ($83/mês no anual), 100.000 créditos
- **Growth:** $399/mês ($333/mês no anual), 500.000 créditos
- **Scale:** $749/mês ($599/mês no anual), 1 milhão de créditos
- **Self-hosted:** gratuito (infra própria)
- **Fonte:** https://firecrawl.dev/pricing (verificado em 2026-11-20)

## 🧠 Conhecimentos Necessários
- Python ou Node.js - Básico
- [[rag|RAG]] - Básico (entender o pipeline)
- APIs REST - Básico

## 📚 Documentação
- [Documentação oficial](https://docs.firecrawl.dev)
- [Referência da API](https://docs.firecrawl.dev/api-reference)
- [GitHub (firecrawl)](https://github.com/mendableai/firecrawl)
- **Relacionados:** Markdown (formato de saída), [[geracao_de_embeddings|Embeddings]]

## 🔗 Relacionamentos
- **Contexto:** Ferramentas
- **Empresa:** [[firecrawl_inc|Firecrawl Inc]]
- **Usado em:** Pipelines de RAG, ingestão de conhecimento
- **Alternativas:** Jina Reader, Crawl4AI, Beautiful Soup
- **Integra com:** [[langchain|LangChain]], [[llamaindex|LlamaIndex]], [[pgvector|pgvector]], [[chromadb|ChromaDB]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
