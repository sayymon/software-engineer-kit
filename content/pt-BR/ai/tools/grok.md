---
id: grok
tipo: ferramenta
nome: Grok
tipos:
  - SERVICO
  - PLATAFORMA
empresa: "[[xai|xAI]]"
aliases:
  - xAI Grok
  - Grok 4
categorias:
  - "[[modelo_fundacional|Modelo fundacional]]"
  - "[[assistente_chat|Assistente de chat]]"
  - "[[apps_ia_celular|Apps de IA no celular]]"
funcionalidades:
  - "[[geracao_de_texto|Geração de texto]]"
  - "[[raciocinio|Raciocínio]]"
  - "[[geracao_de_codigo|Geração de código]]"
  - "[[multimodal|Multimodal]]"
  - "[[tool_use_funcionalidade|Tool use]]"
  - "[[busca_na_web|Busca na web]]"
  - "[[geracao_de_imagem|Geração de imagem]]"
casosDeUso:
  - "[[chat_e_assistente_geral|Chat e assistente geral]]"
  - "[[pesquisa_aprofundada|Pesquisa aprofundada]]"
  - "[[geracao_de_conteudo|Geração de conteúdo]]"
  - "[[programacao_em_par|Programação em par]]"
  - "[[construcao_de_agentes|Construção de agentes]]"
  - "[[redacao_e_copywriting|Redação e copywriting]]"
  - "[[estudo_e_aprendizado|Estudo e aprendizado]]"
  - "[[e_mail_e_agenda|E-mail e agenda]]"
  - "[[marketing_e_anuncios|Marketing e anúncios]]"
  - "[[gestao_de_redes_sociais|Gestão de redes sociais]]"
modelos:
  - "[[grok_4_6|Grok 4.6]]"
  - "[[grok_4_7|Grok 4.7]]"
modeloContratacao:
  - free
  - subscription
  - api-pay-per-token
  - enterprise
precoUSD: 8
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
  - context window de 500k tokens no flagship
  - acesso de consumo via assinatura do X
  - sem modo offline
  - preco de API tiered por tamanho de prompt (acima de 200k dobra)
dataVerificacao: 2026-11-20
fontePreco: https://x.ai/pricing
precoMedio: 8
tags:
  - ferramenta
  - ia
  - grok
  - xai
  - llm
  - assistente
---
# Grok

## 📋 Informações Básicas
- **Tipos:** Serviço, Plataforma (assistente e família de modelos da xAI)
- **Empresa/Fabricante:** [[xai|xAI]]
- **Website:** https://x.ai
- **Categorias:** Modelo fundacional / LLM, Assistente de chat
- **Modelo de contratação:** free, subscription (via X), api-pay-per-token, enterprise
- **Preço (USD):** Free; X Plus $8/mês; Premium $30/mês; Super $100/mês; Ultra $200/mês; API pay-per-token
- **Data de verificação:** 2026-11-20
- **Fonte do preço:** https://x.ai/pricing e https://docs.x.ai/developers/pricing

## 📝 Descrição
Grok é o assistente e a família de modelos da [[xai|xAI]], integrado à rede social X (ex-Twitter), com acesso a dados em tempo real da plataforma. Posiciona-se para coding, agentes e trabalho geral de texto, com janela de contexto grande (500k tokens no flagship). O acesso de consumo vem pela assinatura do X; desenvolvedores usam a API pay-per-token.

## 🎯 Para Que Serve
Assistente geral com diferencial de acesso a informações em tempo real do X: conversar, pesquisar fatos recentes, gerar conteúdo e código, analisar imagens e construir agentes.

### Casos de Uso
1. Chat e assistente geral dentro do X
2. Pesquisa de fatos e tendências em tempo real
3. Geração de conteúdo (posts, textos)
4. Programação em par
5. Construção de agentes

## ⏰ Quando Utilizar
- Quando precisa de informação atual e do contexto do X (tendências, posts recentes).
- Quando já assina o X e quer o assistente embutido.
- Quando quer context grande (500k tokens) para coding e agentes.

### Quando NÃO utilizar
- Quando o requisito é inferência local e privada: prefira [[ollama|Ollama]] com modelos abertos.
- Quando precisa de um modelo aberto e self-hostable: compare com [[llama|Llama]] ou [[qwen|Qwen]].
- Quando a política de dados restringe redes sociais como fonte ou processador.

## 🧩 Categorias e Funcionalidades
- **Categorias:** [[modelo_fundacional|Modelo fundacional]], [[assistente_chat|Assistente de chat]]
- **Funcionalidades:** [[geracao_de_texto|Geração de texto]], [[raciocinio|Raciocínio]], [[geracao_de_codigo|Geração de código]], [[multimodal|Multimodal]], [[tool_use_funcionalidade|Tool use]], [[busca_na_web|Busca na web]], [[geracao_de_imagem|Geração de imagem]]
- **Casos de uso mapeados:** [[chat_e_assistente_geral|Chat e assistente geral]], [[pesquisa_aprofundada|Pesquisa aprofundada]], [[geracao_de_conteudo|Geração de conteúdo]], [[programacao_em_par|Programação em par]], [[construcao_de_agentes|Construção de agentes]]
- **Modelos:** [[grok_4_6|Grok 4.6]], [[grok_4_7|Grok 4.7]]
Notas atômicas e legendas em [[hub_ai_tools|Mapa de Ferramentas de IA]].

## 🤖 Modelos e API

Lineup de 2026 (flagship Grok 4.7, setembro de 2026). Preço tiered: acima de 200k tokens por prompt, as taxas sobem.

Modelos desta ferramenta, uma nota atômica por modelo (especificações, preço e papel de cada um ficam na nota do modelo):
- [[grok_4_6|Grok 4.6]]
- [[grok_4_7|Grok 4.7]]

Famílias e variantes citadas sem nota atômica própria:
- Grok 4.3: Volume a custo menor

> Verificação (2026-11-20): flagship Grok 4.7 ($2/$6 por 1M, context 500k) e assinaturas do X (Plus $8, Premium $30, Super $100, Ultra $200) corroborados por fontes de outubro/novembro de 2026. Relato de um "Grok 4.20" com context de 2M tokens aparece em fonte isolada e está marcado como **não verificado**. Confirme em https://x.ai/pricing e https://docs.x.ai/developers/pricing.

## 🖥️ Compatibilidade e Plataformas
- **Plataformas:** web, iOS, Android, API, cloud
- **Integra com:** X (dados em tempo real), [[langchain|LangChain]] e [[langgraph|LangGraph]] (provider), [[promptfoo|Promptfoo]] (evals)
- **Requisitos:** conta X para consumo; chave de API para uso programático

## 🔒 Restrições e Especificações
- **Context window / limites:** 500k tokens no flagship; preço tiered acima de 200k por prompt.
- **Residência de dados / privacidade:** integrado ao X; avalie o uso de dados da rede social.
- **Offline:** não.
- **ToS / licença:** modelo proprietário (closed source), uso sujeito aos termos da xAI e do X.
- **Outras restrições:** acesso de consumo atrelado à assinatura do X.

## 🆚 Alternativas
- [[chatgpt|ChatGPT]] - ecossistema de API maduro
- [[claude|Claude AI]] - escrita e raciocínio longo
- [[gemini|Gemini]] - multimodal e context grande, mais barato no consumo
- [[perplexity|Perplexity]] - foco em pesquisa com citações
- [[deepseek|DeepSeek]] - raciocínio a custo baixo

### Vantagens sobre alternativas
- Acesso a dados em tempo real do X
- Context window grande (500k)
- Assistente embutido para quem já usa o X

### Desvantagens
- Consumo atrelado à assinatura do X
- Modelo proprietário, sem self-host
- Menos integrações que os líderes de API

## 💰 Custo e Contratação

### Planos (USD)
- **Free:** acesso limitado
- **X Plus:** $8/mês (entrada com Grok)
- **X Premium:** $30/mês
- **X Super:** $100/mês
- **X Ultra:** $200/mês
- **SuperGrok:** $30/mês; SuperGrok Heavy $300/mês
- **API (pay-per-token):** Grok 4.7 $2/$6 por 1M (tiered acima de 200k)
- **Fonte:** https://x.ai/pricing e https://docs.x.ai/developers/pricing (verificado em 2026-11-20)

## 📚 Documentação
- Site: https://x.ai
- API docs: https://docs.x.ai

## 📊 Experiência de Uso

### Prós
- Dados em tempo real do X
- Context grande
- Integrado à rede social

### Contras
- Consumo depende da assinatura do X
- Proprietário, sem self-host

### Curva de Aprendizado
- **Nível:** Baixa para o app; Média para API
- **Tempo para proficiência:** Horas para uso geral

## 🔗 Relacionamentos
- **Contexto:** Ferramentas
- **Empresa:** [[xai|xAI]]
- **Conceito base:** [[hub_ai|Inteligência Artificial]]
- **Alternativas:** [[chatgpt|ChatGPT]], [[claude|Claude AI]], [[gemini|Gemini]], [[perplexity|Perplexity]], [[deepseek|DeepSeek]]
- **Integra com:** [[langchain|LangChain]], [[langgraph|LangGraph]], [[promptfoo|Promptfoo]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]

## 📝 Notas
- O diferencial é o acesso a dados recentes do X; para pesquisa com citações estruturadas, compare com [[perplexity|Perplexity]].
- O plano de entrada com Grok é o X Plus ($8/mês); tiers maiores liberam mais uso.
