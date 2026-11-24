---
id: mistral
tipo: ferramenta
nome: Mistral
tipos:
  - SERVICO
  - PLATAFORMA
  - BIBLIOTECA
empresa: "[[mistral_ai|Mistral AI]]"
aliases:
  - Mistral AI
  - Le Chat
  - Mistral Large
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
  - "[[execucao_local|Execução local]]"
  - "[[fine_tuning|Fine-tuning]]"
casosDeUso:
  - "[[chat_e_assistente_geral|Chat e assistente geral]]"
  - "[[geracao_de_conteudo|Geração de conteúdo]]"
  - "[[programacao_em_par|Programação em par]]"
  - "[[resumo_de_documentos|Resumo de documentos]]"
  - "[[inferencia_privada_local|Inferência privada local]]"
  - "[[construcao_de_agentes|Construção de agentes]]"
modelos:
  - "[[mistral_large_4|Mistral Large 4]]"
  - "[[mistral_medium_3_5|Mistral Medium 3.5]]"
  - "[[mistral_small_4|Mistral Small 4]]"
modeloContratacao:
  - free
  - subscription
  - api-pay-per-token
  - open-source
  - enterprise
precoUSD: 14.99
plataformas:
  - web
  - ios
  - android
  - api
  - self-hosted
  - cloud
linguagens:
  - python
porte:
  - pessoa-fisica
  - pequena
  - media
  - grande
segmentos:
  - geral
restricoes:
  - parte dos modelos e aberta (Apache 2.0), modelos de topo tem licenca propria
  - preco por token do modelo de topo diverge entre fontes
  - sem modo offline no app
  - custo de inferencia local depende do hardware
dataVerificacao: 2026-11-20
fontePreco: https://mistral.ai/pricing
precoMedio: 14.99
tags:
  - ferramenta
  - ia
  - mistral
  - llm
  - open-source
  - assistente
---
# Mistral

## 📋 Informações Básicas
- **Tipos:** Serviço, Plataforma, Biblioteca (família de modelos e assistente)
- **Empresa/Fabricante:** [[mistral_ai|Mistral AI]] (empresa francesa)
- **Website:** https://mistral.ai
- **Categorias:** Modelo fundacional / LLM, Assistente de chat
- **Modelo de contratação:** free, subscription, api-pay-per-token, open-source, enterprise
- **Preço (USD):** App Free $0; Pro $14,99/mês; Team $24,99/usuário/mês; API pay-per-token; modelos abertos sem custo de licença
- **Data de verificação:** 2026-11-20
- **Fonte do preço:** https://mistral.ai/pricing

## 📝 Descrição
Mistral AI é uma empresa francesa que constrói LLMs e publica muitos deles como pesos abertos. Oferece os modelos pelo assistente de consumo (Le Chat, renomeado para Vibe segundo fontes de 2026), por uma API pay-per-token e por deployments privados. Combina modelos abertos (Small, Nemo, sob Apache 2.0) com modelos de topo (Large, Medium) de licença própria, posicionando-se como alternativa europeia com bom custo e opção de self-host.

## 🎯 Para Que Serve
Oferecer LLMs de bom custo com a opção de rodar aberto e privado: chat e assistente, geração de conteúdo e código, resumo, construção de agentes, com liberdade de self-host nos modelos abertos.

### Casos de Uso
1. Chat e assistente geral (Le Chat / Vibe)
2. Geração de conteúdo e tradução
3. Programação em par
4. Resumo de documentos
5. Inferência privada e local com modelos abertos
6. Construção de agentes

## ⏰ Quando Utilizar
- Quando quer bom custo por token com qualidade sólida.
- Quando prefere um fornecedor europeu (residência de dados na Europa).
- Quando quer rodar modelos abertos (Small, Nemo) localmente ou on-premises.
- Quando quer equilibrar modelos abertos e modelos de topo na mesma plataforma.

### Quando NÃO utilizar
- Quando precisa do topo absoluto de raciocínio: compare com [[claude|Claude AI]], [[chatgpt|ChatGPT]] ou [[gemini|Gemini]].
- Quando o ecossistema de integrações pesa mais que custo: [[chatgpt|ChatGPT]] tem API mais ampla.
- Quando precisa de geração nativa de imagem/vídeo robusta.

## 🧩 Categorias e Funcionalidades
- **Categorias:** [[modelo_fundacional|Modelo fundacional]], [[assistente_chat|Assistente de chat]]
- **Funcionalidades:** [[geracao_de_texto|Geração de texto]], [[raciocinio|Raciocínio]], [[geracao_de_codigo|Geração de código]], [[multimodal|Multimodal]], [[tool_use_funcionalidade|Tool use]], [[execucao_local|Execução local]], [[fine_tuning|Fine-tuning]]
- **Casos de uso mapeados:** [[chat_e_assistente_geral|Chat e assistente geral]], [[geracao_de_conteudo|Geração de conteúdo]], [[programacao_em_par|Programação em par]], [[resumo_de_documentos|Resumo de documentos]], [[inferencia_privada_local|Inferência privada local]], [[construcao_de_agentes|Construção de agentes]]
- **Modelos:** [[mistral_large_4|Mistral Large 4]], [[mistral_medium_3_5|Mistral Medium 3.5]], [[mistral_small_4|Mistral Small 4]]
Notas atômicas e legendas em [[hub_ai_tools|Mapa de Ferramentas de IA]].

## 🤖 Modelos e API

Lineup de 2026 (do mais barato ao de topo). Parte da família é aberta; os modelos de topo têm licença própria com pesos publicados.

Modelos desta ferramenta, uma nota atômica por modelo (especificações, preço e papel de cada um ficam na nota do modelo):
- [[mistral_large_4|Mistral Large 4]]
- [[mistral_medium_3_5|Mistral Medium 3.5]]
- [[mistral_small_4|Mistral Small 4]]

Famílias e variantes citadas sem nota atômica própria:
- Mistral Nemo: Volume e custo mínimo
- Mistral Large 3: Uso geral de produção
- Magistral Medium: Raciocínio dedicado

> Verificação (2026-11-20): planos de consumo (Free, Pro $14,99, Team $24,99/usuário) corroborados por fontes de 2026. O preço por token do Mistral Large 4 **diverge entre fontes** ($0,70/$2,10 vs $1,36/$4,18) e o nome do app aparece como Le Chat ou Vibe: marcados como **não verificado**. Confirme em https://mistral.ai/pricing.

## 🖥️ Compatibilidade e Plataformas
- **Plataformas:** web, iOS, Android, API, Python, self-hosted, cloud
- **Integra com:** [[hugging_face|Hugging Face]] (pesos abertos), [[ollama|Ollama]] e [[lm_studio|LM Studio]] (rodar local), [[langchain|LangChain]] e [[langgraph|LangGraph]] (provider), [[langfuse|LangFuse]] e [[promptfoo|Promptfoo]] (observabilidade e evals)
- **Requisitos:** conta Mistral e chave de API; GPU para self-host dos modelos abertos

## 🔒 Restrições e Especificações
- **Context window / limites:** varia por modelo; Large 4 com context grande (cerca de 1M tokens, não verificado).
- **Residência de dados / privacidade:** opção de deployment privado e foco europeu; app de consumo sujeito aos termos.
- **Offline:** sim para os modelos abertos quando self-hosted; não no app.
- **ToS / licença:** modelos abertos sob Apache 2.0; modelos de topo com licença própria (pesos publicados em alguns casos).
- **Outras restrições:** custo de inferência local depende do hardware.

## 🆚 Alternativas
- [[llama|Llama]] - pesos abertos da Meta, context enorme
- [[qwen|Qwen]] - família aberta sob Apache 2.0
- [[deepseek|DeepSeek]] - raciocínio forte a custo baixo
- [[chatgpt|ChatGPT]], [[claude|Claude AI]], [[gemini|Gemini]] - proprietários gerenciados de topo

### Vantagens sobre alternativas
- Mistura de modelos abertos e de topo na mesma plataforma
- Fornecedor europeu com opção de deployment privado
- Bom custo por token nos modelos abertos

### Desvantagens
- Topo de raciocínio abaixo dos flagships proprietários líderes
- Preço do modelo de topo pouco estável entre fontes
- Ecossistema de integrações menor que o da OpenAI

## 💰 Custo e Contratação

### Planos (USD)
- **Free:** $0, app de consumo com limites
- **Pro:** $14,99/mês (app de consumo)
- **Team:** $24,99/usuário/mês
- **API (pay-per-token):** por 1M de tokens; Small 4 $0,15/$0,60, Large 3 $0,50/$1,50, Large 4 cerca de $0,70/$2,10 (**não verificado**)
- **Open source:** $0 de licença nos modelos Apache 2.0 (Small, Nemo)
- **Enterprise:** deployment privado sob consulta
- **Fonte:** https://mistral.ai/pricing (verificado em 2026-11-20)

## 📚 Documentação
- Site: https://mistral.ai
- Docs e API: https://docs.mistral.ai
- Pesos abertos: [[hugging_face|Hugging Face]]

## 📊 Experiência de Uso

### Prós
- Abertos e gerenciados na mesma casa
- Bom custo e foco europeu
- Opção de self-host e fine-tuning

### Contras
- Topo abaixo dos líderes proprietários
- Nomenclatura e preços em movimento

### Curva de Aprendizado
- **Nível:** Baixa para o app; Média para API e self-host
- **Tempo para proficiência:** Horas para uso geral; dias para self-host

## 🔗 Relacionamentos
- **Contexto:** Ferramentas
- **Empresa:** [[mistral_ai|Mistral AI]]
- **Conceito base:** [[hub_ai|Inteligência Artificial]]
- **Alternativas:** [[llama|Llama]], [[qwen|Qwen]], [[deepseek|DeepSeek]], [[chatgpt|ChatGPT]], [[claude|Claude AI]], [[gemini|Gemini]]
- **Integra com:** [[hugging_face|Hugging Face]], [[ollama|Ollama]], [[lm_studio|LM Studio]], [[langchain|LangChain]], [[langgraph|LangGraph]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]

## 📝 Notas
- Para custo mínimo com opção de self-host, os modelos Small e Nemo (Apache 2.0) são o ponto de entrada.
- Reconfira o nome do app (Le Chat ou Vibe) e o preço do Large 4 na página oficial antes de documentar em outro lugar.
