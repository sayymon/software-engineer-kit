---
id: chatgpt
tipo: ferramenta
nome: ChatGPT
tipos:
  - SERVICO
  - PLATAFORMA
empresa: "[[openai|OpenAI]]"
aliases:
  - GPT
  - OpenAI ChatGPT
  - GPT API
categorias:
  - "[[assistente_chat|Assistente de chat]]"
  - "[[modelo_fundacional|Modelo fundacional]]"
  - "[[apps_ia_celular|Apps de IA no celular]]"
  - "[[planilhas_analise_dados|Planilhas e análise de dados]]"
  - "[[escrita_documentos|Escrita e documentos]]"
  - "[[traducao_idiomas|Tradução e idiomas]]"
  - "[[agentes_computador_navegador|Agentes que usam computador e navegador]]"
funcionalidades:
  - "[[geracao_de_texto|Geração de texto]]"
  - "[[raciocinio|Raciocínio]]"
  - "[[geracao_de_codigo|Geração de código]]"
  - "[[multimodal|Multimodal]]"
  - "[[tool_use_funcionalidade|Tool use]]"
  - "[[busca_na_web|Busca na web]]"
  - "[[geracao_de_imagem|Geração de imagem]]"
  - "[[transcricao_de_audio|Transcrição de áudio]]"
  - "[[geracao_de_embeddings|Geração de embeddings]]"
casosDeUso:
  - "[[chat_e_assistente_geral|Chat e assistente geral]]"
  - "[[geracao_de_conteudo|Geração de conteúdo]]"
  - "[[pesquisa_aprofundada|Pesquisa aprofundada]]"
  - "[[resumo_de_documentos|Resumo de documentos]]"
  - "[[programacao_em_par|Programação em par]]"
  - "[[traducao_de_textos|Tradução de textos]]"
  - "[[financas_pessoais_pessoa_fisica|Finanças pessoais (pessoa física)]]"
  - "[[criacao_de_apresentacoes|Criação de apresentações]]"
  - "[[revisao_e_correcao_de_texto|Revisão e correção de texto]]"
  - "[[planilhas_e_relatorios|Planilhas e relatórios]]"
  - "[[celular_android_e_ios|Celular (Android e iOS)]]"
  - "[[wearables_e_oculos_inteligentes|Wearables e óculos inteligentes]]"
  - "[[carro_e_mobilidade|Carro e mobilidade]]"
modelos:
  - "[[gpt_5_4_mini|GPT-5.4 mini]]"
  - "[[gpt_5_5|GPT-5.5]]"
  - "[[gpt_5_6_sol|GPT-5.6 Sol]]"
  - "[[gpt_6_luna|GPT-6 Luna]]"
  - "[[gpt_6_1_terra|GPT-6.1 Terra]]"
  - "[[gpt_6_2_astra|GPT-6.2 Astra]]"
  - "[[gpt_6_2_sol|GPT-6.2 Sol]]"
  - "[[gpt_image_2_6_sunburst|GPT-Image-2.6 Sunburst]]"
  - "[[gpt_realtime_2_1|GPT-Realtime-2.1]]"
  - "[[gpt_transcribe|GPT-Transcribe]]"
  - "[[text_embedding_3_large|text-embedding-3-large]]"
modeloContratacao:
  - free
  - subscription
  - api-pay-per-token
  - enterprise
precoUSD: 20
plataformas:
  - web
  - ios
  - android
  - macos
  - windows
  - api
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
  - context window varia por modelo e plano
  - nos planos de consumo os dados podem ser usados para treino salvo opt-out
  - limites de uso (mensagens/creditos) por plano
  - preco de API por token muda com frequencia
dataVerificacao: 2026-11-20
fontePreco: https://openai.com/chatgpt/pricing
precoMedio: 20
tags:
  - ferramenta
  - ia
  - chatgpt
  - openai
  - llm
  - assistente
---
# ChatGPT

## 📋 Informações Básicas
- **Tipos:** Serviço, Plataforma (assistente de chat sobre modelos GPT)
- **Empresa/Fabricante:** [[openai|OpenAI]]
- **Website:** https://chatgpt.com
- **Categorias:** Assistente de chat, Modelo fundacional / LLM
- **Modelo de contratação:** free, subscription, api-pay-per-token, enterprise
- **Preço (USD):** Free $0; Go $8/mês; Plus $20/mês; Pro $100 a $200/mês; Business por assento; Enterprise sob consulta; API pay-per-token
- **Data de verificação:** 2026-11-20
- **Fonte do preço:** https://openai.com/chatgpt/pricing e https://openai.com/api/pricing
- **Playground da API:** https://platform.openai.com/playground/chat

## 📝 Descrição
Assistente de chat da OpenAI construído sobre a família de modelos GPT. Combina geração de texto, raciocínio, código, visão, voz, busca na web e geração de imagem em uma interface única (web, apps e API). Serve tanto como produto de assinatura (ChatGPT) quanto como plataforma de desenvolvimento via API pay-per-token.

A escolha do modelo é o que define custo e qualidade: modelos de raciocínio profundo entregam mais em tarefas difíceis a um custo maior, enquanto modelos "mini" e "nano" atendem volume e latência baixa por uma fração do preço.

## 🎯 Para Que Serve
Resolver tarefas de linguagem de ponta a ponta: conversar, escrever, programar, pesquisar, resumir, traduzir, analisar imagens e áudio, e orquestrar ferramentas via function calling.

### Casos de Uso
1. Chat e assistente geral do dia a dia
2. Geração de conteúdo (textos, e-mails, roteiros)
3. Pesquisa aprofundada com navegação na web
4. Resumo de documentos longos
5. Programação em par (gerar, explicar e revisar código)
6. Tradução entre idiomas

## ⏰ Quando Utilizar
- Quando precisa de um assistente versátil para texto, código e multimodal em um só lugar.
- Quando quer os modelos de raciocínio mais fortes do mercado para problemas difíceis.
- Quando vai integrar IA em um produto via API com controle de custo por modelo.
- Quando precisa de ecossistema maduro (tools, function calling, embeddings, imagem, áudio).

### Quando NÃO utilizar
- Quando o requisito é inferência 100% local e privada: prefira [[ollama|Ollama]].
- Quando precisa de context window muito grande com custo baixo por token: compare com [[gemini|Gemini]].
- Quando a tarefa é trivial e repetitiva em alto volume: um modelo mini/nano ou open source resolve mais barato.
- Quando a política de dados exige que nada saia da sua infraestrutura.

## 🧩 Categorias e Funcionalidades
- **Categorias:** [[assistente_chat|Assistente de chat]], [[modelo_fundacional|Modelo fundacional]]
- **Funcionalidades:** [[geracao_de_texto|Geração de texto]], [[raciocinio|Raciocínio]], [[geracao_de_codigo|Geração de código]], [[multimodal|Multimodal]], [[tool_use_funcionalidade|Tool use]], [[busca_na_web|Busca na web]], [[geracao_de_imagem|Geração de imagem]], [[transcricao_de_audio|Transcrição de áudio]], [[geracao_de_embeddings|Geração de embeddings]]
- **Casos de uso mapeados:** [[chat_e_assistente_geral|Chat e assistente geral]], [[geracao_de_conteudo|Geração de conteúdo]], [[pesquisa_aprofundada|Pesquisa aprofundada]], [[resumo_de_documentos|Resumo de documentos]], [[programacao_em_par|Programação em par]], [[traducao_de_textos|Tradução de textos]]
- **Modelos:** [[gpt_5_4_mini|GPT-5.4 mini]], [[gpt_5_5|GPT-5.5]], [[gpt_5_6_sol|GPT-5.6 Sol]], [[gpt_6_luna|GPT-6 Luna]], [[gpt_6_1_terra|GPT-6.1 Terra]], [[gpt_6_2_astra|GPT-6.2 Astra]], [[gpt_6_2_sol|GPT-6.2 Sol]], [[gpt_image_2_6_sunburst|GPT-Image-2.6 Sunburst]], [[gpt_realtime_2_1|GPT-Realtime-2.1]], [[gpt_transcribe|GPT-Transcribe]], [[text_embedding_3_large|text-embedding-3-large]]
Notas atômicas e legendas em [[hub_ai_tools|Mapa de Ferramentas de IA]].

## 🤖 Modelos OpenAI por caso de uso

Visão orientada a capacidade. A OpenAI organiza a oferta em famílias (flagship multimodal, raciocínio, mini/nano econômicos, embeddings, imagem e áudio). A escolha certa equilibra qualidade, latência e custo por token.

Modelos desta ferramenta, uma nota atômica por modelo (especificações, preço e papel de cada um ficam na nota do modelo):
- [[gpt_5_4_mini|GPT-5.4 mini]]
- [[gpt_5_5|GPT-5.5]]
- [[gpt_5_6_sol|GPT-5.6 Sol]]
- [[gpt_6_luna|GPT-6 Luna]]
- [[gpt_6_1_terra|GPT-6.1 Terra]]
- [[gpt_6_2_astra|GPT-6.2 Astra]]
- [[gpt_6_2_sol|GPT-6.2 Sol]]
- [[gpt_image_2_6_sunburst|GPT-Image-2.6 Sunburst]]
- [[gpt_realtime_2_1|GPT-Realtime-2.1]]
- [[gpt_transcribe|GPT-Transcribe]]
- [[text_embedding_3_large|text-embedding-3-large]]

Famílias e variantes citadas sem nota atômica própria:
- Flagship raciocínio (série "o" / GPT-5 reasoning): Problemas complexos, agentes, análise técnica
- Flagship multimodal (GPT-4o e sucessores): Assistente geral, produtos interativos, multimodal
- Mini (ex.: GPT-4o mini): Alto volume, classificação, respostas rápidas
- Nano: Tarefas simples em escala, pré-filtros
- Embeddings (text-embedding-3 small/large): [[pgvector|pgvector]], [[chromadb|ChromaDB]], busca semântica
- Imagem (GPT Image / DALL·E 3): Criativos, mockups, ilustrações
- Áudio (Whisper, TTS, Realtime): Transcrição, voz, assistentes por voz

Regras práticas de escolha:
- **Raciocínio vs rápido/barato:** use a série de raciocínio quando o erro é caro; use mini/nano quando volume e latência mandam.
- **Coding:** modelos de raciocínio e os voltados a código rendem mais em refatoração e debugging; veja também [[claude_code|Claude Code]] e [[cursor|Cursor]] quando o fluxo é dentro do editor.
- **Multimodal:** flagship com visão/voz para imagem e áudio nativos.
- **Embeddings/áudio/imagem:** modelos dedicados, cobrados à parte do chat.

> Verificação (2026-11-20): a estrutura de planos foi confirmada na página oficial (Free, Go, Plus, Business, Enterprise, por usuário/mês). As **versões mais recentes de modelo e os preços por token da API não foram confirmados em página oficial nesta data** (as tabelas da OpenAI são renderizadas via JavaScript e não retornaram valores). Fontes secundárias de 2026 indicam famílias GPT-5.x/GPT-6 e valores da ordem de poucos dólares por 1M de tokens, porém esses números estão **não verificados**. Confirme em https://openai.com/api/pricing antes de decisões de custo.

## 🖥️ Compatibilidade e Plataformas
- **Plataformas:** web, iOS, Android, macOS, Windows, API
- **Integra com:** [[langchain|LangChain]] (provider), [[langfuse|LangFuse]] (observabilidade), [[promptfoo|Promptfoo]] (evals), [[pgvector|pgvector]] e [[chromadb|ChromaDB]] (embeddings)
- **Requisitos:** conta OpenAI; chave de API para uso programático

## 🔒 Restrições e Especificações
- **Context window / limites:** varia por modelo e por plano; limites de mensagens/créditos nos planos de consumo.
- **Residência de dados / privacidade:** nos planos de consumo, os dados podem ser usados para treino salvo opt-out; Business e Enterprise não treinam com dados do cliente por padrão.
- **Offline:** não.
- **ToS / licença:** uso sujeito aos termos da OpenAI.
- **Outras restrições:** preços de API por token mudam com frequência.

## 🔧 Como Utilizar

### Uso Básico (API)
```python
from openai import OpenAI

client = OpenAI(api_key="OPENAI_API_KEY")
resp = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "Explique RAG em 3 frases"}]
)
print(resp.choices[0].message.content)
```

Playground do chat: https://platform.openai.com/playground/chat

## 🆚 Alternativas
- [[claude|Claude AI]] - forte em escrita e raciocínio longo, context grande
- [[gemini|Gemini]] - multimodal, context window muito grande, ecossistema Google
- [[perplexity|Perplexity]] - foco em pesquisa com citações
- [[ollama|Ollama]] - alternativa local e privada

### Vantagens sobre alternativas
- Ecossistema de API mais maduro (tools, embeddings, imagem, áudio, realtime)
- Modelos de raciocínio de ponta
- Grande base de integrações e documentação

### Desvantagens
- Dados de consumo podem ir para treino sem opt-out
- Custo dos modelos de raciocínio é alto
- Dependência de serviço externo (sem modo offline)

## 💰 Custo e Contratação

### Planos (USD)
- **Free:** $0, acesso limitado aos modelos padrão
- **Go:** $8/mês (limites intermediários)
- **Plus:** $20/mês (acesso ampliado, modelos de raciocínio)
- **Pro:** $100 a $200/mês (capacidade alta; algumas fontes citam tier de $500)
- **Business:** por assento, cerca de $25/usuário/mês mensal (menor no anual)
- **Enterprise:** sob consulta (SSO, data residency, governança)
- **API (pay-per-token):** cobrança por 1M de tokens, separada por input, cached input e output; **valores não verificados em página oficial nesta data**
- **Fonte:** https://openai.com/chatgpt/pricing e https://openai.com/api/pricing (verificado em 2026-11-20; preços por token flagados como não verificados)

## 🔗 Relacionamentos
- **Contexto:** Ferramentas
- **Empresa:** [[openai|OpenAI]]
- **Conceito base:** [[hub_ai|Inteligência Artificial]]
- **Alternativas:** [[claude|Claude AI]], [[gemini|Gemini]], [[perplexity|Perplexity]], [[ollama|Ollama]]
- **Integra com:** [[langchain|LangChain]], [[langfuse|LangFuse]], [[promptfoo|Promptfoo]], [[pgvector|pgvector]], [[chromadb|ChromaDB]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]

## 📝 Notas
- A conta de custo é dominada pela escolha de modelo: padronize mini/nano para volume e reserve raciocínio para o que exige.
- Para produto, use [[langfuse|LangFuse]] para medir custo por feature e [[promptfoo|Promptfoo]] para não deixar mudanças de prompt derrubarem a qualidade.
