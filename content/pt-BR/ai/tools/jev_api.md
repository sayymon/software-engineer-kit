---
id: jev_api
tipo: ferramenta
nome: Jev API
tipos:
  - SERVICO
  - PLATAFORMA
empresa: "[[typesafe_ai|TypeSafe AI]]"
aliases:
  - TypeSafe API
  - TypeSafe AI API
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
  - "[[jev|Jev]]"
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
  - cobrança só por token de entrada, US$ 0,042 por 1M; saída gratuita
  - early access
  - inferência nos EUA, sem modo offline
  - sem streaming nem geração de texto livre
  - tools só com argumentos fechados (enum, literal, booleano)
dataVerificacao: 2026-11-21
fontePreco: https://docs.typesafe.ai/models.md
precoMedio: 0
tags:
  - ferramenta
  - ia
  - classificacao
  - typesafe
---
# Jev API
## 📋 Informações Básicas
- **Tipos:** Serviço de API e console para o modelo de decisão [[jev|Jev]]
- **Empresa/Fabricante:** [[typesafe_ai|TypeSafe AI]]
- **Website:** https://typesafe.ai (console em https://console.typesafe.ai)
- **Categorias:** Modelo de decisão
- **Modelo de contratação:** API paga por token de entrada; enterprise sob consulta
- **Preço (USD):** US$ 0,042 por 1M tokens de entrada; saída gratuita; sem mensalidade
- **Data de verificação:** 2026-11-21
- **Fonte do preço:** https://docs.typesafe.ai/models.md
## 📝 Descrição
Plataforma da TypeSafe AI que expõe o [[jev|Jev]] pelo endpoint `POST /v1/systemone`. Cada requisição leva um estado e várias perguntas tipadas (Choice, Score, Noul, Box), avaliadas em paralelo numa única chamada. Tem SDKs Python e JavaScript, integração alpha com o Microsoft Agent Framework e acesso via Vercel AI Gateway.
## 🎯 Para Que Serve
Colocar decisões de IA dentro do código como se fossem uma função tipada: classificar, pontuar, rotear e verificar, com confiança para decidir quando agir e quando pedir revisão.
### Casos de Uso
1. Triagem de tickets por time e urgência
2. Moderação e checagem de saídas de outro modelo (cascata barata antes de um LLM caro)
3. Roteamento de ferramentas em agentes com opções fechadas
4. Pontuação de passagens recuperadas em RAG antes de enviá-las ao modelo gerador
## ⏰ Quando Utilizar
- Quando a resposta cabe num conjunto fechado e o código vai consumir o resultado
- Quando volume e latência tornam um LLM caro demais por decisão
- Quando você quer limiares de confiança explícitos para [[human_in_the_loop_funcionalidade|Human in the loop]]
### Quando NÃO utilizar
- Quando precisa de texto gerado, resumo ou código: use [[chatgpt|ChatGPT]], [[claude|Claude AI]] ou [[gemini|Gemini]]
- Quando os dados não podem sair do seu ambiente: avalie [[ollama|Ollama]] com um modelo aberto
- Quando a decisão depende de cálculo ou contagem exatos: faça no código
## 🧩 Categorias e Funcionalidades
- **Categorias:** [[modelo_decisao|Modelo de decisão]]
- **Funcionalidades:** [[decisao_tipada_com_confianca|Decisão tipada com confiança]], [[saida_estruturada|Saída estruturada]], [[human_in_the_loop_funcionalidade|Human in the loop]], [[tool_use_funcionalidade|Tool use]]
- **Casos de uso mapeados:** [[classificacao_e_extracao_em_alto_volume|Classificação e extração em alto volume]], [[construcao_de_agentes|Construção de agentes]], [[automacao_de_processos|Automação de processos]]
- **Modelos:** [[jev|Jev]]
Notas atômicas e legendas em [[hub_ai_tools|Mapa de Ferramentas de IA]].
## 🖥 Compatibilidade e Plataformas
- **Plataformas:** api, python, javascript, cloud
- **Integra com:** Microsoft Agent Framework (`pip install agent-framework-typesafe --pre`), Vercel AI Gateway (`typesafe-ai/jev`), MCP via Agent Framework para tools com schema fechado
- **Requisitos:** chave `TYPESAFE_API_KEY` guardada em variável de ambiente ou cofre
## 🔒 Restrições e Especificações
- **Context window / limites:** 64k por requisição e 32k por pergunta; 262k com header de contexto longo. No Agent Framework: até 32 tools roteáveis, 64 propriedades por tool, 64 valores de enum por argumento.
- **Residência de dados / privacidade:** inferência regional nos EUA (Vercel AI Gateway); regido pelo ToS e pela política de uso aceitável.
- **Offline:** não (modelo hospedado).
- **ToS / licença:** serviço proprietário.
- **Outras restrições:** sem streaming, sem texto livre, sem entrada de áudio ou vídeo; parâmetros gerativos como `temperature` são rejeitados.
## 🆚 Alternativas
- [[chatgpt|ChatGPT]] e [[claude|Claude AI]] via API com saída estruturada - flexíveis, mais caros e lentos por decisão
- [[hugging_face|Hugging Face]] - classificadores abertos ajustados para uma tarefa fixa
- [[openai_decisions_api|OpenAI Decisions API]], [[gemini_decisions_api|Gemini Decisions API]], [[microsoft_foundry|Microsoft Foundry]], [[cloudflare_workers_ai|Cloudflare Workers AI]], [[laya_router|Laya Router]] - concorrentes diretos
### Vantagens sobre alternativas
- Custo por decisão muito menor e saída gratuita
- Tipo da resposta garantido, sem parse de JSON
- Confiança calibrada para governar automação
### Desvantagens
- Early access e fornecedor novo (risco de lock-in e de mudança de preço)
- Leitura literal das instruções exige perguntas bem escritas
- Sem execução local
## 💰 Custo e Contratação
### Planos (USD)
- **Pay-per-token:** US$ 0,042 por 1M tokens de entrada; saída gratuita
- **Enterprise:** sob consulta (https://typesafe.ai/enterprise)
- **Fonte:** https://docs.typesafe.ai/models.md (verificado em 2026-11-21)
## 🔗 Relacionamentos
- **Contexto:** Ferramentas
- **Empresa:** [[typesafe_ai|TypeSafe AI]]
- **Alternativas:** [[chatgpt|ChatGPT]], [[claude|Claude AI]], [[hugging_face|Hugging Face]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
