---
id: gemini_decisions_api
tipo: ferramenta
nome: Gemini Decisions API
tipos:
  - SERVICO
  - PLATAFORMA
empresa: "[[google|Google]]"
aliases:
  - Google Decisions API
categorias:
  - "[[modelo_decisao|Modelo de decisão]]"
funcionalidades:
  - "[[decisao_tipada_com_confianca|Decisão tipada com confiança]]"
  - "[[saida_estruturada|Saída estruturada]]"
  - "[[human_in_the_loop_funcionalidade|Human in the loop]]"
  - "[[multimodal|Multimodal]]"
casosDeUso:
  - "[[classificacao_e_extracao_em_alto_volume|Classificação e extração em alto volume]]"
  - "[[construcao_de_agentes|Construção de agentes]]"
  - "[[automacao_de_processos|Automação de processos]]"
  - "[[analise_de_documentos_e_imagens|Análise de documentos e imagens]]"
modelos:
  - "[[gemini_decision_1|Gemini Decision 1]]"
modeloContratacao:
  - free
  - api-pay-per-token
precoUSD: 0
plataformas:
  - api
  - cloud
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
  - US$ 0,10 por 1M tokens de entrada, saída zero
  - tier gratuito usa os dados para melhorar produtos
  - sem cache e sem Batch API
  - sem pesos abertos
dataVerificacao: 2026-11-21
fontePreco: https://ai.google.dev/gemini-api/docs/pricing
precoMedio: 0
tags:
  - ferramenta
  - ia
  - classificacao
---
# Gemini Decisions API
## 📋 Informações Básicas
- **Tipos:** Endpoint da Gemini Developer API (v1beta) para decisões tipadas
- **Empresa/Fabricante:** [[google|Google]]
- **Website:** https://ai.google.dev
- **Categorias:** Modelo de decisão
- **Modelo de contratação:** gratuito no AI Studio para prototipar; pago por token de entrada
- **Preço (USD):** grátis no tier gratuito; US$ 0,10 por 1M tokens de entrada no pago
- **Data de verificação:** 2026-11-21
- **Fonte do preço:** https://ai.google.dev/gemini-api/docs/pricing
## 📝 Descrição
Decisions API da Gemini Developer API, lançada em 2026-11-11 com o [[gemini_decision_1|Gemini Decision 1]]. Aceita texto, imagem, áudio, vídeo e PDF numa passada e até 1.000 perguntas tipadas por chamada. Requer o SDK google-genai 3.2 ou superior. Suporte anunciado em OpenRouter, LangChain, Vercel AI SDK, LiteLLM, Pydantic AI e OpenCode; no Google Cloud está como em breve.
## 🎯 Para Que Serve
Decisões calibradas sobre qualquer modalidade sem transcrever ou extrair texto antes.
### Casos de Uso
1. Moderação de imagem, áudio e vídeo
2. Roteamento de consultas entre níveis de modelo (o Google usa assim no Gemini Notebook)
3. Checagem de políticas em agentes
## ⏰ Quando Utilizar
- Entrada multimodal
- Muitas perguntas sobre a mesma entrada
- Prototipar de graça no AI Studio
### Quando NÃO utilizar
- Dados sensíveis no tier gratuito (usados para melhorar produtos)
- Custo mínimo em texto: [[jev_api|Jev API]]
- Contexto repetido: sem cache
## 🧩 Categorias e Funcionalidades
- **Categorias:** [[modelo_decisao|Modelo de decisão]]
- **Funcionalidades:** [[decisao_tipada_com_confianca|Decisão tipada com confiança]], [[saida_estruturada|Saída estruturada]], [[human_in_the_loop_funcionalidade|Human in the loop]], [[multimodal|Multimodal]]
- **Casos de uso mapeados:** [[classificacao_e_extracao_em_alto_volume|Classificação e extração em alto volume]], [[construcao_de_agentes|Construção de agentes]], [[automacao_de_processos|Automação de processos]], [[analise_de_documentos_e_imagens|Análise de documentos e imagens]]
- **Modelos:** [[gemini_decision_1|Gemini Decision 1]]
Notas atômicas e legendas em [[hub_ai_tools|Mapa de Ferramentas de IA]].
## 🖥 Compatibilidade e Plataformas
- **Plataformas:** api, python, javascript, cloud
- **Integra com:** google-genai SDK, [[langchain|LangChain]], OpenRouter, Vercel AI SDK
- **Requisitos:** chave da Gemini API em variável de ambiente ou cofre
## 🔒 Restrições e Especificações
- **Limites:** 262.144 tokens por requisição; até 1.000 perguntas
- **Residência de dados / privacidade:** tier gratuito usa dados para melhorar produtos; pago não
- **Offline:** não
- **Outras:** v1beta; Batch API e cache indisponíveis
## 🆚 Alternativas
- [[jev_api|Jev API]] - pioneira, menor preço em texto
- [[openai_decisions_api|OpenAI Decisions API]] - cache e contexto maior
### Vantagens sobre alternativas
- Mais modalidades de entrada
- Melhor calibração autodeclarada
- Tier gratuito
### Desvantagens
- Mais caro que Jev e Clef-flash
- Sem cache nem batch
## 💰 Custo e Contratação
### Planos (USD)
- **Gratuito:** sem custo no AI Studio, com uso dos dados para melhorar produtos
- **Pago:** US$ 0,10 por 1M tokens de entrada, saída zero
- **Fonte:** https://ai.google.dev/gemini-api/docs/pricing (verificado em 2026-11-21)
## 🔗 Relacionamentos
- **Contexto:** Ferramentas
- **Empresa:** [[google|Google]]
- **Alternativas:** [[jev_api|Jev API]], [[openai_decisions_api|OpenAI Decisions API]]
- **Comparação:** [[modelo_decisao|Modelo de decisão]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
