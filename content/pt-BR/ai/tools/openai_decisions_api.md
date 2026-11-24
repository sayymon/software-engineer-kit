---
id: openai_decisions_api
tipo: ferramenta
nome: OpenAI Decisions API
tipos:
  - SERVICO
  - PLATAFORMA
empresa: "[[openai|OpenAI]]"
aliases:
  - Decisions API
categorias:
  - "[[modelo_decisao|Modelo de decisão]]"
funcionalidades:
  - "[[decisao_tipada_com_confianca|Decisão tipada com confiança]]"
  - "[[saida_estruturada|Saída estruturada]]"
  - "[[human_in_the_loop_funcionalidade|Human in the loop]]"
  - "[[tool_use_funcionalidade|Tool use]]"
casosDeUso:
  - "[[classificacao_e_extracao_em_alto_volume|Classificação e extração em alto volume]]"
  - "[[construcao_de_agentes|Construção de agentes]]"
  - "[[automacao_de_processos|Automação de processos]]"
modelos:
  - "[[gpt_6_luna|GPT-6 Luna]]"
modeloContratacao:
  - api-pay-per-token
  - enterprise
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
  - cobra só entrada, US$ 0,10 por 1M com gpt-6-luna
  - só aceita o modelo gpt-6-luna
  - até 400 perguntas por requisição
  - sem geração de texto
dataVerificacao: 2026-11-21
fontePreco: https://community.openai.com/t/decisions-api-is-now-available-in-public-beta/1403877
precoMedio: 0
tags:
  - ferramenta
  - ia
  - classificacao
---
# OpenAI Decisions API
## 📋 Informações Básicas
- **Tipos:** Endpoint da API da OpenAI para decisões tipadas
- **Empresa/Fabricante:** [[openai|OpenAI]]
- **Website:** https://openai.com/index/decisions-api/
- **Categorias:** Modelo de decisão
- **Modelo de contratação:** API paga por token de entrada
- **Preço (USD):** US$ 0,10 por 1M tokens de entrada; saída sem cobrança
- **Data de verificação:** 2026-11-21
- **Fonte do preço:** https://community.openai.com/t/decisions-api-is-now-available-in-public-beta/1403877
## 📝 Descrição
Endpoint `POST /v1/decisions` da OpenAI, anunciado no DevDay (2026-09-29), em beta desde 2026-10-06 e GA desde 2026-10-22. Recebe texto, imagem ou JSON e perguntas tipadas (probabilidade de um predicado, escolha, nota em níveis ordenados) e devolve respostas tipadas, ou uma recusa por pergunta. Roda só sobre o [[gpt_6_luna|GPT-6 Luna]].
## 🎯 Para Que Serve
Trocar chamadas de chat usadas para classificar e rotear por um endpoint que devolve só a decisão, sem custo de saída.
### Casos de Uso
1. Triagem e roteamento de tickets
2. Escolha da próxima ação em agentes
3. Pontuação de churn e risco (com backtest da calibração)
## ⏰ Quando Utilizar
- Você já usa a API da OpenAI e quer decisões no mesmo contrato
- Entradas longas (contexto de 1,05M do Luna)
- Contexto repetido com cache de prompt
### Quando NÃO utilizar
- Custo mínimo: [[jev_api|Jev API]] ou [[cloudflare_workers_ai|Cloudflare Workers AI]] com Clef-flash
- Áudio ou vídeo: [[gemini_decisions_api|Gemini Decisions API]]
- Calibração crítica sem validação própria: a documentação não descreve o método de calibração
## 🧩 Categorias e Funcionalidades
- **Categorias:** [[modelo_decisao|Modelo de decisão]]
- **Funcionalidades:** [[decisao_tipada_com_confianca|Decisão tipada com confiança]], [[saida_estruturada|Saída estruturada]], [[human_in_the_loop_funcionalidade|Human in the loop]], [[tool_use_funcionalidade|Tool use]]
- **Casos de uso mapeados:** [[classificacao_e_extracao_em_alto_volume|Classificação e extração em alto volume]], [[construcao_de_agentes|Construção de agentes]], [[automacao_de_processos|Automação de processos]]
- **Modelos:** [[gpt_6_luna|GPT-6 Luna]]
Notas atômicas e legendas em [[hub_ai_tools|Mapa de Ferramentas de IA]].
## 🖥 Compatibilidade e Plataformas
- **Plataformas:** api, python, javascript, cloud
- **Integra com:** SDKs oficiais da OpenAI; gateways de API
- **Requisitos:** chave da API OpenAI em variável de ambiente ou cofre
## 🔒 Restrições e Especificações
- **Limites:** até 400 perguntas por requisição; contexto do GPT-6 Luna
- **Residência de dados / privacidade:** regida pelos termos da API da OpenAI
- **Offline:** não
- **Outras:** calibração não documentada; faça backtest antes de automatizar
## 🆚 Alternativas
- [[jev_api|Jev API]] - pioneira, menor preço em texto
- [[gemini_decisions_api|Gemini Decisions API]] - mais multimodal e melhor calibração autodeclarada
### Vantagens sobre alternativas
- Mesmo fornecedor e faturamento de quem já usa OpenAI
- Maior contexto da categoria
- Cache de prompt
### Desvantagens
- Preço de entrada 2,4 vezes o do Jev
- Um único modelo disponível
## 💰 Custo e Contratação
### Planos (USD)
- **Pay-per-token:** US$ 0,10 por 1M tokens de entrada com gpt-6-luna; sem cobrança de saída
- **Fonte:** https://community.openai.com/t/decisions-api-is-now-available-in-public-beta/1403877 (verificado em 2026-11-21)
## 🔗 Relacionamentos
- **Contexto:** Ferramentas
- **Empresa:** [[openai|OpenAI]]
- **Alternativas:** [[jev_api|Jev API]], [[gemini_decisions_api|Gemini Decisions API]]
- **Comparação:** [[modelo_decisao|Modelo de decisão]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
