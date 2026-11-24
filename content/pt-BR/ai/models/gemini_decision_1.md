---
id: gemini_decision_1
tipo: modelo
nome: Gemini Decision 1
aliases: []
familia: Gemini Decision
empresa: "[[google|Google]]"
lancamento: 2026-11-11
status: preview
idModeloApi: gemini-decision-1
contextoTokens: 262144
saidaMaxTokens: não verificado
modalidadesEntrada:
  - texto
  - imagem
  - audio
  - video
  - pdf
modalidadesSaida:
  - decisão tipada
precoEntradaUSD: 0.1
precoSaidaUSD: 0
precoCacheUSD: não verificado
licenca: proprietária
disponibilidade:
  - api
ferramentas:
  - "[[gemini_decisions_api|Gemini Decisions API]]"
categorias:
  - "[[modelo_decisao|Modelo de decisão]]"
funcionalidades:
  - "[[decisao_tipada_com_confianca|Decisão tipada com confiança]]"
  - "[[saida_estruturada|Saída estruturada]]"
  - "[[human_in_the_loop_funcionalidade|Human in the loop]]"
  - "[[multimodal|Multimodal]]"
  - "[[contexto_longo|Contexto longo]]"
casosDeUso:
  - "[[classificacao_e_extracao_em_alto_volume|Classificação e extração em alto volume]]"
  - "[[construcao_de_agentes|Construção de agentes]]"
  - "[[automacao_de_processos|Automação de processos]]"
  - "[[analise_de_documentos_e_imagens|Análise de documentos e imagens]]"
benchmarks:
  - "[[jevbench|JevBench]]"
  - "[[when2call|When2Call]]"
  - "[[video_mme|Video-MME]]"
dataVerificacao: 2026-11-21
fontePreco: https://ai.google.dev/gemini-api/docs/pricing
tags:
  - modelo
  - ia
  - classificacao
---
# Gemini Decision 1
## 📋 Informações Básicas
- **Família:** Gemini Decision
- **Empresa:** [[google|Google]]
- **Lançamento:** 2026-11-11
- **Status:** preview
- **ID na API:** gemini-decision-1
- **Disponibilidade:** api
## 📝 Descrição
Modelo de decisão multimodal do Google, servido pela Decisions API do Gemini (v1beta). Avalia até 1.000 perguntas tipadas (noul, choice com 2 a 255 opções, score com 2 a 255 níveis) contra uma entrada compartilhada, numa única passada, e devolve probabilidade e confiança de 0 a 1 por resposta. A entrada compartilhada é cobrada uma vez por requisição, independente do número de perguntas. O Google cita latência de 150 a 250 ms ponta a ponta e o melhor erro de calibração da categoria (ECE 0,025, autodeclarado).
## ⚙ Especificações
- **Janela de contexto:** 262.144 tokens somando a entrada compartilhada e todas as perguntas
- **Saída máxima:** não se aplica (a saída é a decisão tipada)
- **Modalidades de entrada:** texto, imagem, audio, video, pdf
- **Modalidades de saída:** decisão tipada (escolha, nota, probabilidade)
- **Licença:** proprietária
## 💰 Preço (USD por 1M tokens)
- **Entrada:** US$ 0,1
- **Saída:** US$ 0 (sem cobrança de saída)
- **Cache:** não verificado
- **Fonte:** https://ai.google.dev/gemini-api/docs/pricing (verificado em 2026-11-21)
- **Observação:** cache de contexto e Batch API indisponíveis; o tier gratuito do AI Studio é grátis e usa os dados para melhorar produtos.
## ⏰ Quando Utilizar
- Decisões sobre áudio, vídeo ou PDF sem transcrever antes
- Automação que age sozinha acima de um limiar de confiança (melhor calibração autodeclarada)
- Muitas perguntas sobre a mesma entrada (até 1.000 por chamada)
### Quando NÃO utilizar
- Custo mínimo em texto puro: [[jev|Jev]] ou [[clef_flash|Clef-flash]] custam menos
- Contexto repetido em alto volume: sem cache, a entrada é cobrada inteira a cada chamada
- Hospedagem própria: não há pesos abertos
## 🧩 Casos de uso e funcionalidades
- **Casos de uso:** [[classificacao_e_extracao_em_alto_volume|Classificação e extração em alto volume]], [[construcao_de_agentes|Construção de agentes]], [[automacao_de_processos|Automação de processos]], [[analise_de_documentos_e_imagens|Análise de documentos e imagens]]
- **Funcionalidades:** [[decisao_tipada_com_confianca|Decisão tipada com confiança]], [[saida_estruturada|Saída estruturada]], [[human_in_the_loop_funcionalidade|Human in the loop]], [[multimodal|Multimodal]], [[contexto_longo|Contexto longo]]
- **Categorias:** [[modelo_decisao|Modelo de decisão]]
## 🆚 Alternativas
- [[jev|Jev]] - mais barato em texto e melhor em escolha de ferramentas (When2Call)
- [[gpt_6_luna|GPT-6 Luna]] - via OpenAI Decisions, com cache e contexto maior
- [[clef_omni|Clef-omni]] - multimodal com pesos abertos
## 🔗 Relacionamentos
- **Empresa:** [[google|Google]]
- **Ferramentas:** [[gemini_decisions_api|Gemini Decisions API]]
- **Comparação:** [[modelo_decisao|Modelo de decisão]] (tabela comparativa)
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Modelos de IA
## 📎 Fontes
- Preço oficial: https://ai.google.dev/gemini-api/docs/pricing
- Lançamento e benchmarks (tabela do Google): https://www.marktechpost.com/2026/11/11/google-gemini-decisions-api-gemini-decision-1/
