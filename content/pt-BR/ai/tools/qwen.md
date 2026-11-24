---
id: qwen
tipo: ferramenta
nome: Qwen
tipos:
  - SERVICO
  - BIBLIOTECA
empresa: "[[alibaba|Alibaba]]"
aliases:
  - Qwen3
  - Alibaba Qwen
  - Tongyi Qianwen
categorias:
  - "[[modelo_fundacional|Modelo fundacional]]"
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
  - "[[programacao_em_par|Programação em par]]"
  - "[[geracao_de_conteudo|Geração de conteúdo]]"
  - "[[inferencia_privada_local|Inferência privada local]]"
  - "[[construcao_de_agentes|Construção de agentes]]"
  - "[[resumo_de_documentos|Resumo de documentos]]"
modelos:
  - "[[qwen3_7_plus|Qwen3.7-Plus]]"
  - "[[qwen3_8_27b|Qwen3.8-27B]]"
  - "[[qwen3_8_flash|Qwen3.8-Flash]]"
  - "[[qwen4_max|Qwen4-Max]]"
modeloContratacao:
  - free
  - api-pay-per-token
  - open-source
  - enterprise
precoUSD: 0
plataformas:
  - linux
  - macos
  - windows
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
  - parte da familia e aberta (Apache 2.0), modelos Max de topo sao API-only
  - empresa chinesa, avaliar politica de dados
  - custo de inferencia local depende do hardware
  - context ate 1M tokens em modelos de topo
dataVerificacao: 2026-11-20
fontePreco: https://www.alibabacloud.com/en/product/modelstudio
precoMedio: 0
tags:
  - ferramenta
  - ia
  - qwen
  - alibaba
  - llm
  - open-source
---
# Qwen

## 📋 Informações Básicas
- **Tipos:** Serviço, Biblioteca (família de modelos abertos e API)
- **Empresa/Fabricante:** [[alibaba|Alibaba]]
- **Website:** https://qwen.ai
- **Categorias:** Modelo fundacional / LLM
- **Modelo de contratação:** free (chat), api-pay-per-token (DashScope), open-source (Apache 2.0), enterprise
- **Preço (USD):** Chat gratuito; pesos abertos sem custo de licença; API a partir de cerca de $0,05/1M de entrada (Qwen-Turbo)
- **Data de verificação:** 2026-11-20
- **Fonte do preço:** https://www.alibabacloud.com/en/product/modelstudio

## 📝 Descrição
Qwen é a família de modelos da [[alibaba|Alibaba]], uma das maiores e mais completas coleções open source disponíveis. A série Qwen3 (lançada em 2026) traz muitas variantes, da menor (sub-1B) à maior (centenas de bilhões de parâmetros), sob licença Apache 2.0, permitindo fine-tuning e deploy comercial livres. Há também modelos de topo (linha Max) oferecidos via API. Roda local (via [[ollama|Ollama]], [[lm_studio|LM Studio]]) ou pela API DashScope do Alibaba Cloud.

## 🎯 Para Que Serve
Oferecer um LLM aberto, versátil e self-hostable em muitos tamanhos: chat, código, geração de conteúdo, agentes e inferência privada, com liberdade de licença Apache 2.0 nas variantes abertas.

### Casos de Uso
1. Chat e assistente geral (Qwen Chat, gratuito)
2. Programação em par
3. Geração de conteúdo e resumo de documentos
4. Inferência privada e local com pesos abertos
5. Construção de agentes com modelo aberto

## ⏰ Quando Utilizar
- Quando quer um modelo aberto sob Apache 2.0, livre para fine-tuning e uso comercial.
- Quando precisa escolher o tamanho certo para o seu hardware (muitas variantes).
- Quando quer inferência local e privada.
- Quando o custo por token na API precisa ser muito baixo (Qwen-Turbo/Plus).

### Quando NÃO utilizar
- Quando a política de dados restringe fornecedores de fora do seu país (avalie a API Alibaba Cloud).
- Quando precisa do topo absoluto de raciocínio proprietário: compare com [[claude|Claude AI]] ou [[chatgpt|ChatGPT]].
- Quando o modelo de topo (Max) precisa ser self-hostable: a linha Max é API-only.

## 🧩 Categorias e Funcionalidades
- **Categorias:** [[modelo_fundacional|Modelo fundacional]]
- **Funcionalidades:** [[geracao_de_texto|Geração de texto]], [[raciocinio|Raciocínio]], [[geracao_de_codigo|Geração de código]], [[multimodal|Multimodal]], [[tool_use_funcionalidade|Tool use]], [[execucao_local|Execução local]], [[fine_tuning|Fine-tuning]]
- **Casos de uso mapeados:** [[chat_e_assistente_geral|Chat e assistente geral]], [[programacao_em_par|Programação em par]], [[geracao_de_conteudo|Geração de conteúdo]], [[inferencia_privada_local|Inferência privada local]], [[construcao_de_agentes|Construção de agentes]], [[resumo_de_documentos|Resumo de documentos]]
- **Modelos:** [[qwen3_7_plus|Qwen3.7-Plus]], [[qwen3_8_27b|Qwen3.8-27B]], [[qwen3_8_flash|Qwen3.8-Flash]], [[qwen4_max|Qwen4-Max]]
Notas atômicas e legendas em [[hub_ai_tools|Mapa de Ferramentas de IA]].

## 🤖 Modelos e API

Lineup de 2026. A série Qwen3 (aberta, Apache 2.0) cobre de modelos pequenos a grandes; a linha Max de topo é oferecida via API.

Modelos desta ferramenta, uma nota atômica por modelo (especificações, preço e papel de cada um ficam na nota do modelo):
- [[qwen3_7_plus|Qwen3.7-Plus]]
- [[qwen3_8_27b|Qwen3.8-27B]]
- [[qwen3_8_flash|Qwen3.8-Flash]]
- [[qwen4_max|Qwen4-Max]]

Famílias e variantes citadas sem nota atômica própria:
- Qwen-Turbo: Volume e custo mínimo
- Qwen-Plus: Sweet spot de produção
- Qwen3 Max: Raciocínio e tool calling de topo
- Qwen3.8-Max: Máxima qualidade (95B ativos / 2,4T total)

> Verificação (2026-11-20): a série Qwen3 sob Apache 2.0 e a existência da linha Max via API são corroboradas por fontes de 2026. Os preços por token vêm de agregadores e variam por variante e por via (DashScope): estão em parte **não verificados**. Confirme em https://www.alibabacloud.com/en/product/modelstudio e https://qwen.ai.

## 🖥️ Compatibilidade e Plataformas
- **Plataformas:** Linux, macOS, Windows, API (DashScope), Python, self-hosted, cloud
- **Integra com:** [[hugging_face|Hugging Face]] (pesos abertos), [[ollama|Ollama]] e [[lm_studio|LM Studio]] (rodar local), [[langchain|LangChain]] e [[langgraph|LangGraph]] (provider), [[promptfoo|Promptfoo]] (evals)
- **Requisitos:** GPU/CPU conforme a variante; conta Alibaba Cloud para a API

## 🔒 Restrições e Especificações
- **Context window / limites:** até 1M tokens nos modelos de topo; varia por variante.
- **Residência de dados / privacidade:** controle total quando self-hosted; API via Alibaba Cloud (empresa chinesa), avalie a política de dados.
- **Offline:** sim para as variantes abertas quando self-hosted.
- **ToS / licença:** variantes abertas sob Apache 2.0 (fine-tuning e uso comercial livres); linha Max API-only.
- **Outras restrições:** custo de inferência local depende do hardware.

## 🆚 Alternativas
- [[llama|Llama]] - pesos abertos da Meta
- [[deepseek|DeepSeek]] - raciocínio forte a custo baixo
- [[mistral|Mistral]] - abertos europeus
- [[claude|Claude AI]], [[chatgpt|ChatGPT]], [[gemini|Gemini]] - proprietários gerenciados de topo

### Vantagens sobre alternativas
- Família aberta mais completa (muitos tamanhos, Apache 2.0)
- Liberdade de fine-tuning e deploy comercial
- Custo por token baixo na API

### Desvantagens
- Linha de topo (Max) é API-only
- Atenção à política de dados (API chinesa)
- Operação self-host depende de você

## 💰 Custo e Contratação

### Planos (USD)
- **Free:** Qwen Chat
- **Open source:** $0 de licença nas variantes Apache 2.0; custo de inferência conforme hardware
- **API (pay-per-token):** via DashScope; Qwen-Turbo a partir de cerca de $0,05/1M de entrada, Max mais caro
- **Enterprise:** via Alibaba Cloud Model Studio
- **Fonte:** https://www.alibabacloud.com/en/product/modelstudio (verificado em 2026-11-20; valores exatos em parte não verificados)

## 📚 Documentação
- Site e chat: https://qwen.ai
- Pesos abertos: [[hugging_face|Hugging Face]]
- API: Alibaba Cloud Model Studio (DashScope)

## 📊 Experiência de Uso

### Prós
- Família aberta ampla e versátil
- Apache 2.0 nas variantes abertas
- Custo baixo na API

### Contras
- Topo API-only
- Atenção à residência de dados

### Curva de Aprendizado
- **Nível:** Baixa para o chat; Média para API e self-host
- **Tempo para proficiência:** Horas para uso geral; dias para self-host e fine-tuning

## 🔗 Relacionamentos
- **Contexto:** Ferramentas
- **Empresa:** [[alibaba|Alibaba]]
- **Conceito base:** [[hub_ai|Inteligência Artificial]]
- **Alternativas:** [[llama|Llama]], [[deepseek|DeepSeek]], [[mistral|Mistral]], [[claude|Claude AI]], [[chatgpt|ChatGPT]], [[gemini|Gemini]]
- **Integra com:** [[hugging_face|Hugging Face]], [[ollama|Ollama]], [[lm_studio|LM Studio]], [[langchain|LangChain]], [[langgraph|LangGraph]], [[promptfoo|Promptfoo]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]

## 📝 Notas
- Para rodar aberto e local, escolha a variante Qwen3 que cabe no seu hardware e sirva via [[ollama|Ollama]].
- A linha Max entrega o topo de qualidade, mas só via API; para self-host, fique nas variantes Apache 2.0.
