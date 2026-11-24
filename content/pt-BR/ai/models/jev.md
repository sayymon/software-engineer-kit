---
id: jev
tipo: modelo
nome: Jev
aliases:
  - Jev 1.14
  - jev-latest
familia: Jev (System One)
empresa: "[[typesafe_ai|TypeSafe AI]]"
lancamento: 2026-09-15
status: preview
idModeloApi: jev-1.14.0
contextoTokens: 64000
saidaMaxTokens: não verificado
modalidadesEntrada:
  - texto
  - imagem
modalidadesSaida:
  - decisão tipada
precoEntradaUSD: 0.042
precoSaidaUSD: 0
precoCacheUSD: não verificado
licenca: proprietária
disponibilidade:
  - api
ferramentas:
  - "[[jev_api|Jev API]]"
categorias:
  - "[[modelo_decisao|Modelo de decisão]]"
funcionalidades:
  - "[[decisao_tipada_com_confianca|Decisão tipada com confiança]]"
  - "[[saida_estruturada|Saída estruturada]]"
  - "[[multimodal|Multimodal]]"
  - "[[human_in_the_loop_funcionalidade|Human in the loop]]"
  - "[[contexto_longo|Contexto longo]]"
casosDeUso:
  - "[[classificacao_e_extracao_em_alto_volume|Classificação e extração em alto volume]]"
  - "[[analise_de_sentimento|Análise de sentimento]]"
  - "[[construcao_de_agentes|Construção de agentes]]"
  - "[[automacao_de_processos|Automação de processos]]"
benchmarks:
  - "[[jevbench|JevBench]]"
  - "[[when2call|When2Call]]"
  - "[[bfcl|BFCL]]"
  - "[[banking77|BANKING77]]"
  - "[[clinc150|CLINC150]]"
  - "[[api_bank|API-Bank]]"
dataVerificacao: 2026-11-21
fontePreco: https://docs.typesafe.ai/models.md
tags:
  - modelo
  - ia
  - classificacao
---
# Jev
## 📋 Informações Básicas
- **Família:** Jev (primeiro System One Model)
- **Empresa:** [[typesafe_ai|TypeSafe AI]]
- **Lançamento:** 2026-09-15 (Jev 1.13); Jev 1.14 disponível desde 2026-10-14
- **Status:** preview (early access)
- **ID na API:** jev-1.14.0 (alias jev-latest; versão anterior jev-1.13.0)
- **Disponibilidade:** api (endpoint `POST /v1/systemone`), também via Vercel AI Gateway como `typesafe-ai/jev`
## 📝 Descrição
Modelo discriminativo de classificação e decisão: ele não gera texto. Recebe um estado (texto, JSON ou imagem) e perguntas tipadas, avalia cada pergunta em paralelo e devolve valores tipados com probabilidades calibradas. Foi treinado com RLCD (Reinforcement Learning for Calibrated Decisions).

Primitivas (tipos de pergunta):
| Primitiva | Pergunta | Retorno |
|---|---|---|
| Choice | Qual opção da lista? | escolha, probabilidades, confiança |
| Score | Qual nota nesta rubrica? | nota, probabilidades, confiança |
| Noul | Esta afirmação é verdadeira? | probabilidade de 0 a 1 |
| Box | Onde está isto na imagem? (só 1.14) | caixa delimitadora, confiança |

A recomendação oficial é fazer perguntas atômicas, do tipo "decisão de alguns segundos de um especialista", e compor o resultado no código. Uma decisão complexa vira várias perguntas combinadas com pesos definidos por você.
## ⚙ Especificações
- **Janela de contexto:** 64k por requisição e 32k por pergunta; 262k com o header `TypeSafe-Danger-Zone-Long-Context: true` (mais lento e menos preciso)
- **Saída máxima:** não se aplica (a saída é a decisão tipada); não verificado como limite numérico
- **Modalidades de entrada:** texto, imagem (PNG, JPEG); sem áudio e vídeo
- **Modalidades de saída:** decisão tipada (escolha, nota, probabilidade, caixa)
- **Licença:** proprietária, modelo hospedado (pesos não publicados)
## 💰 Preço (USD por 1M tokens)
- **Entrada:** US$ 0,042 (US$ 42 por bilhão de tokens)
- **Saída:** US$ 0 (tokens de saída gratuitos)
- **Cache:** não verificado
- **Fonte:** https://docs.typesafe.ai/models.md (verificado em 2026-11-21)
## ⏰ Quando Utilizar
- Triagem, roteamento e classificação em alto volume, onde latência e custo dominam (a TypeSafe reporta cerca de 0,1 s por decisão)
- Moderação de entrada e verificação de saídas de um LLM (checar campos extraídos, validar citações, filtrar passagens de RAG)
- Fluxos com [[human_in_the_loop_funcionalidade|Human in the loop]]: o código age sozinho quando a confiança é alta e escala quando é baixa
- Escolha de ferramenta e roteamento em agentes, com conjuntos fechados de opções
### Quando NÃO utilizar
- Gerar texto, código ou respostas livres: use um [[modelo_fundacional|Modelo fundacional]] como [[claude_haiku_5_5|Claude Haiku 5.5]] ou [[gpt_5_4_mini|GPT-5.4 mini]]
- Contas, contagem, comparação de datas e números exatos: faça no código
- Perguntas com várias etapas de indireção ou raciocínio longo: decomponha ou use [[raciocinio|Raciocínio]] de um LLM
- Detecção de phishing como única barreira: um benchmark independente (arXiv 2610.17820) mediu 62% de detecção contra 77 a 81% de juízes LLM
## 🧩 Casos de uso e funcionalidades
- **Casos de uso:** [[classificacao_e_extracao_em_alto_volume|Classificação e extração em alto volume]], [[analise_de_sentimento|Análise de sentimento]], [[construcao_de_agentes|Construção de agentes]], [[automacao_de_processos|Automação de processos]]
- **Funcionalidades:** [[decisao_tipada_com_confianca|Decisão tipada com confiança]], [[saida_estruturada|Saída estruturada]], [[multimodal|Multimodal]], [[human_in_the_loop_funcionalidade|Human in the loop]], [[contexto_longo|Contexto longo]]
- **Categorias:** [[modelo_decisao|Modelo de decisão]]
## 🆚 Alternativas
- [[claude_haiku_5_5|Claude Haiku 5.5]] - LLM barato com saída estruturada; gera texto, mas custa mais e é mais lento por decisão
- [[gpt_5_4_mini|GPT-5.4 mini]] - mesma lógica, com JSON validado
- [[qwen3_8_flash|Qwen3.8-Flash]] - opção aberta para classificação local
- [[gemini_decision_1|Gemini Decision 1]], [[gpt_6_luna|GPT-6 Luna]] (OpenAI Decisions), [[microsoft_decision_1_1|Microsoft-Decision-1.1]], [[clef_flash|Clef-flash]] e [[laya|Laya]] - concorrentes diretos, comparados em [[modelo_decisao|Modelo de decisão]]
## 🔗 Relacionamentos
- **Empresa:** [[typesafe_ai|TypeSafe AI]]
- **Ferramentas:** [[jev_api|Jev API]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Modelos de IA
## 📎 Fontes
- Modelos, preço e contexto: https://docs.typesafe.ai/models.md
- Limitações conhecidas: https://docs.typesafe.ai/model-jaggedness.md
- Benchmark independente: https://arxiv.org/abs/2609.37647v1
