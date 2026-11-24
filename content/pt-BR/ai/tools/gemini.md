---
id: gemini
tipo: ferramenta
nome: Gemini
tipos:
  - SERVICO
  - PLATAFORMA
empresa: "[[google|Google]]"
aliases:
  - Google Gemini
  - Gemini Pro
  - Gemini Flash
categorias:
  - "[[assistente_chat|Assistente de chat]]"
  - "[[modelo_fundacional|Modelo fundacional]]"
  - "[[apps_ia_celular|Apps de IA no celular]]"
  - "[[agentes_computador_navegador|Agentes que usam computador e navegador]]"
funcionalidades:
  - "[[geracao_de_texto|Geração de texto]]"
  - "[[raciocinio|Raciocínio]]"
  - "[[geracao_de_codigo|Geração de código]]"
  - "[[multimodal|Multimodal]]"
  - "[[tool_use_funcionalidade|Tool use]]"
  - "[[busca_na_web|Busca na web]]"
  - "[[geracao_de_imagem|Geração de imagem]]"
  - "[[geracao_de_video|Geração de vídeo]]"
  - "[[geracao_de_embeddings|Geração de embeddings]]"
casosDeUso:
  - "[[chat_e_assistente_geral|Chat e assistente geral]]"
  - "[[geracao_de_conteudo|Geração de conteúdo]]"
  - "[[resumo_de_documentos|Resumo de documentos]]"
  - "[[pesquisa_aprofundada|Pesquisa aprofundada]]"
  - "[[programacao_em_par|Programação em par]]"
  - "[[traducao_de_textos|Tradução de textos]]"
  - "[[criacao_de_imagens|Criação de imagens]]"
  - "[[producao_de_video|Produção de vídeo]]"
  - "[[redacao_e_copywriting|Redação e copywriting]]"
  - "[[estudo_e_aprendizado|Estudo e aprendizado]]"
  - "[[e_mail_e_agenda|E-mail e agenda]]"
  - "[[marketing_e_anuncios|Marketing e anúncios]]"
  - "[[producao_de_podcast|Produção de podcast]]"
  - "[[gestao_de_redes_sociais|Gestão de redes sociais]]"
modelos:
  - "[[gemini_3_1_pro|Gemini 3.1 Pro]]"
  - "[[gemini_3_5_flash_lite|Gemini 3.5 Flash-Lite]]"
  - "[[gemini_3_8_flash|Gemini 3.8 Flash]]"
  - "[[gemini_4_carbon|Gemini 4 Carbon]]"
  - "[[gemini_4_hydrogen|Gemini 4 Hydrogen]]"
  - "[[gemini_4_neon|Gemini 4 Neon]]"
  - "[[gemini_embedding_2|Gemini Embedding 2]]"
  - "[[gemini_nano_banana_2_1|Gemini Nano Banana 2.1]]"
  - "[[gemini_omni_1_2_flash|Gemini Omni 1.2 Flash]]"
modeloContratacao:
  - free
  - subscription
  - api-pay-per-token
  - enterprise
precoUSD: 4.99
plataformas:
  - web
  - ios
  - android
  - api
  - cloud
linguagens:
  - agnostica
porte:
  - pessoa-fisica
  - pequena
  - media
  - grande
segmentos:
  - geral
restricoes:
  - context window ate 1M tokens (varia por modelo)
  - sem modo offline no app
  - preco de API tiered por tamanho de prompt em alguns modelos
  - lineup e precos mudam com frequencia
  - integracao profunda com o ecossistema Google
dataVerificacao: 2026-11-20
fontePreco: https://gemini.google/subscriptions/
precoMedio: 4.99
tags:
  - ferramenta
  - ia
  - gemini
  - google
  - llm
  - assistente
---
# Gemini

## 📋 Informações Básicas
- **Tipos:** Serviço, Plataforma (assistente de chat e família de modelos do Google)
- **Empresa/Fabricante:** [[google|Google]]
- **Website:** https://gemini.google.com
- **Categorias:** Assistente de chat, Modelo fundacional / LLM
- **Modelo de contratação:** free, subscription, api-pay-per-token, enterprise
- **Preço (USD):** Free $0; Google AI Plus $4,99/mês; Google AI Pro $19,99/mês; Google AI Ultra $99,99 a $199,99/mês; API pay-per-token
- **Data de verificação:** 2026-11-20
- **Fonte do preço:** https://gemini.google/subscriptions/ e https://ai.google.dev/gemini-api/docs/pricing

## 📝 Descrição
Gemini é a família de modelos multimodais do [[google|Google]], oferecida no app Gemini (consumo), na API Gemini (Google AI Studio) e via Vertex AI (empresarial). É nativamente multimodal (texto, imagem, áudio, vídeo) e se integra ao ecossistema Google (Search, Workspace, Android). A oferta se organiza em Pro (flagship de raciocínio), Flash (equilíbrio), Flash-Lite (mais barato) e Nano (on-device).

## 🎯 Para Que Serve
Resolver tarefas de linguagem e multimodais com janela de contexto grande e integração ao Google: conversar, escrever, programar, resumir, pesquisar com busca na web, analisar e gerar imagens e vídeo, dentro dos apps Google ou via API.

### Casos de Uso
1. Chat e assistente geral integrado ao Google
2. Resumo e análise de documentos longos (context de até 1M tokens)
3. Pesquisa aprofundada com Search e Deep Research
4. Geração de conteúdo e tradução
5. Programação em par
6. Geração de imagem e vídeo (via modelos de mídia do ecossistema)

## ⏰ Quando Utilizar
- Quando precisa de context window muito grande com custo baixo por token.
- Quando já usa o ecossistema Google (Workspace, Android, GCP) e quer integração nativa.
- Quando a tarefa é multimodal (texto, imagem, áudio, vídeo) em um só modelo.
- Quando quer um plano de consumo barato: o Google AI Plus começa em $4,99/mês.

### Quando NÃO utilizar
- Quando o requisito é inferência 100% local e privada: prefira [[ollama|Ollama]].
- Quando a política de dados exige que nada saia da infraestrutura própria.
- Quando precisa de um modelo aberto e self-hostable: compare com [[llama|Llama]] ou [[qwen|Qwen]].

## 🧩 Categorias e Funcionalidades
- **Categorias:** [[assistente_chat|Assistente de chat]], [[modelo_fundacional|Modelo fundacional]]
- **Funcionalidades:** [[geracao_de_texto|Geração de texto]], [[raciocinio|Raciocínio]], [[geracao_de_codigo|Geração de código]], [[multimodal|Multimodal]], [[tool_use_funcionalidade|Tool use]], [[busca_na_web|Busca na web]], [[geracao_de_imagem|Geração de imagem]], [[geracao_de_video|Geração de vídeo]], [[geracao_de_embeddings|Geração de embeddings]]
- **Casos de uso mapeados:** [[chat_e_assistente_geral|Chat e assistente geral]], [[geracao_de_conteudo|Geração de conteúdo]], [[resumo_de_documentos|Resumo de documentos]], [[pesquisa_aprofundada|Pesquisa aprofundada]], [[programacao_em_par|Programação em par]], [[traducao_de_textos|Tradução de textos]], [[criacao_de_imagens|Criação de imagens]], [[producao_de_video|Produção de vídeo]]
- **Modelos:** [[gemini_3_1_pro|Gemini 3.1 Pro]], [[gemini_3_5_flash_lite|Gemini 3.5 Flash-Lite]], [[gemini_3_8_flash|Gemini 3.8 Flash]], [[gemini_4_carbon|Gemini 4 Carbon]], [[gemini_4_hydrogen|Gemini 4 Hydrogen]], [[gemini_4_neon|Gemini 4 Neon]], [[gemini_embedding_2|Gemini Embedding 2]], [[gemini_nano_banana_2_1|Gemini Nano Banana 2.1]], [[gemini_omni_1_2_flash|Gemini Omni 1.2 Flash]]
Notas atômicas e legendas em [[hub_ai_tools|Mapa de Ferramentas de IA]].

## 🤖 Modelos e API

Visão por capacidade (lineup de novembro de 2026). A oferta Gemini se organiza em famílias Pro (flagship de raciocínio), Flash (equilíbrio), Flash-Lite (volume e custo mínimo) e Nano (on-device). O app de consumo expõe o modelo mais novo (Gemini 4 Argon).

Modelos desta ferramenta, uma nota atômica por modelo (especificações, preço e papel de cada um ficam na nota do modelo):
- [[gemini_3_1_pro|Gemini 3.1 Pro]]
- [[gemini_3_5_flash_lite|Gemini 3.5 Flash-Lite]]
- [[gemini_3_8_flash|Gemini 3.8 Flash]]
- [[gemini_4_carbon|Gemini 4 Carbon]]
- [[gemini_4_hydrogen|Gemini 4 Hydrogen]]
- [[gemini_4_neon|Gemini 4 Neon]]
- [[gemini_embedding_2|Gemini Embedding 2]]
- [[gemini_nano_banana_2_1|Gemini Nano Banana 2.1]]
- [[gemini_omni_1_2_flash|Gemini Omni 1.2 Flash]]

Famílias e variantes citadas sem nota atômica própria:
- Gemini 2.5 Flash-Lite: Tarefas simples em escala, pré-filtros
- Gemini 4 Argon: Assistente de ponta no app Gemini
- Gemini Nano: IA offline em Android, baixa latência

> Verificação (2026-11-20): planos de consumo confirmados na página oficial (https://gemini.google/subscriptions/): Free, AI Plus $4,99, AI Pro $19,99, AI Ultra $99,99 (5x) a $199,99 (20x). Os preços por token da API vêm de agregadores de novembro de 2026 e **o lineup Gemini muda com frequência**: confirme em https://ai.google.dev/gemini-api/docs/pricing antes de decisões de custo.

## 🖥️ Compatibilidade e Plataformas
- **Plataformas:** web, iOS, Android, API, cloud (Vertex AI)
- **Integra com:** [[adk_agent_development_kit|ADK]] (nativo), Google Search/Workspace/Android, Vertex AI, [[langchain|LangChain]] e [[langgraph|LangGraph]] (provider), [[langfuse|LangFuse]] e [[promptfoo|Promptfoo]] (observabilidade e evals)
- **Requisitos:** conta Google; chave de API (Google AI Studio) ou projeto GCP para Vertex AI

## 🔒 Restrições e Especificações
- **Context window / limites:** até 1M tokens (varia por modelo); alguns modelos têm preço tiered por tamanho de prompt.
- **Residência de dados / privacidade:** no app de consumo, dados podem ser usados conforme as políticas do Google (ver termos); Vertex AI oferece controles empresariais e data residency.
- **Offline:** não no app; Gemini Nano roda on-device em alguns Android.
- **ToS / licença:** modelo proprietário (closed source), uso sujeito aos termos do Google.
- **Outras restrições:** lineup e preços mudam com frequência.

## 🆚 Alternativas
- [[chatgpt|ChatGPT]] - ecossistema de API maduro, modelos de raciocínio de ponta
- [[claude|Claude AI]] - escrita e raciocínio longo, context de 1M tokens
- [[grok|Grok]] - integração com X e dados em tempo real
- [[deepseek|DeepSeek]] - raciocínio a custo muito baixo
- [[llama|Llama]], [[qwen|Qwen]] - alternativas abertas e self-hostable

### Vantagens sobre alternativas
- Context window grande com custo por token baixo (Flash e Flash-Lite)
- Multimodal nativo (texto, imagem, áudio, vídeo)
- Integração profunda com o ecossistema Google
- Planos de consumo mais baratos (AI Plus a $4,99)

### Desvantagens
- Lineup muda rápido, exige reconferência de modelo e preço
- Privacidade do app de consumo depende das políticas do Google
- Dependência do ecossistema Google para tirar o máximo

## 💰 Custo e Contratação

### Planos (USD)
- **Free:** $0, acesso ao app com limites de uso
- **Google AI Plus:** $4,99/mês (2x o uso do Free, mais recursos)
- **Google AI Pro:** $19,99/mês (4x o uso do Free, antigo Gemini Advanced)
- **Google AI Ultra:** $99,99/mês (5x) ou $199,99/mês (20x)
- **API (pay-per-token):** por 1M de tokens; Flash-Lite $0,10/$0,40, Flash $0,75/$3,75, Pro $2/$12 (tiered acima de 200k)
- **Enterprise:** via Vertex AI, cobrança por uso mais controles de governança
- **Fonte:** https://gemini.google/subscriptions/ e https://ai.google.dev/gemini-api/docs/pricing (verificado em 2026-11-20)

## 📚 Documentação
- App: https://gemini.google.com
- API e docs: https://ai.google.dev/gemini-api/docs
- Vertex AI: https://cloud.google.com/vertex-ai

## 📊 Experiência de Uso

### Prós
- Context grande e multimodal nativo
- Custo por token competitivo
- Integração com Workspace, Android e GCP

### Contras
- Lineup e nomes de modelo mudam com frequência
- Melhor aproveitado dentro do ecossistema Google

### Curva de Aprendizado
- **Nível:** Baixa para o app; Média para API e Vertex AI
- **Tempo para proficiência:** Horas para uso geral; dias para integração empresarial

## 🔗 Relacionamentos
- **Contexto:** Ferramentas
- **Empresa:** [[google|Google]]
- **Conceito base:** [[hub_ai|Inteligência Artificial]]
- **Alternativas:** [[chatgpt|ChatGPT]], [[claude|Claude AI]], [[grok|Grok]], [[deepseek|DeepSeek]], [[llama|Llama]], [[qwen|Qwen]]
- **Integra com:** [[adk_agent_development_kit|ADK]], [[langchain|LangChain]], [[langgraph|LangGraph]], [[langfuse|LangFuse]], [[promptfoo|Promptfoo]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]

## 📝 Notas
- Para alto volume, Flash e Flash-Lite entregam context grande por centavos; reserve Pro para raciocínio difícil.
- Gemini Nano abre a porta para IA on-device em Android, útil quando latência e privacidade local importam.
