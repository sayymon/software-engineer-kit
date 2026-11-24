---
id: raciocinio_complexo_e_matematica
tipo: caso-de-uso
nome: Raciocínio complexo e matemática
aliases:
  - raciocinio-complexo-matematica
descricao: Resolver problemas difíceis de lógica, matemática e ciência com várias etapas.
funcionalidadesNecessarias:
  - "[[raciocinio|Raciocínio]]"
  - "[[contexto_longo|Contexto longo]]"
categoriasRelacionadas:
  - "[[modelo_fundacional|Modelo fundacional]]"
ferramentasRecomendadas:
  - "[[chatgpt|ChatGPT]]"
  - "[[claude|Claude AI]]"
modelosRecomendados:
  - "[[claude_opus_5_5|Claude Opus 5.5]]"
  - "[[gpt_6_2_astra|GPT-6.2 Astra]]"
  - "[[gemini_4_carbon|Gemini 4 Carbon]]"
  - "[[deepseek_r1|DeepSeek R1]]"
  - "[[claude_fable_5_2|Claude Fable 5.2]]"
criteriosDesempate:
  - lock-in
  - custo
  - privacidade-de-dados
criterioPadrao: lock-in
porte:
  - pessoa-fisica
  - pequena
  - media
  - grande
segmentos:
  - geral
nicho: ""
nivel: caso
eixo: tarefa
macro: "[[ia_aplicada_e_agentes|IA aplicada e agentes]]"
faixasPadrao:
  maisBarata:
    - "[[gemma_4|Gemma 4]]"
    - "[[claude_haiku_5_5|Claude Haiku 5.5]]"
    - "[[qwen3_8_flash|Qwen3.8-Flash]]"
  custoBeneficio:
    - "[[gpt_6_1_terra|GPT-6.1 Terra]]"
    - "[[gemini_3_8_flash|Gemini 3.8 Flash]]"
    - "[[claude_sonnet_5_5|Claude Sonnet 5.5]]"
  qualidadeMaxima:
    - "[[claude_opus_5_5|Claude Opus 5.5]]"
    - "[[gpt_6_2_astra|GPT-6.2 Astra]]"
    - "[[gemini_4_neon|Gemini 4 Neon]]"
variacoes:
  - id: raciocinio-matematica-prova
    nome: Matemática e demonstrações
    descricao: Problemas de múltiplas etapas com verificação passo a passo.
    funcionalidades:
      - "[[raciocinio|Raciocínio]]"
      - "[[contexto_longo|Contexto longo]]"
    herdaFerramentas: true
    parametros:
      - chave: Ambiente de execução
        valor: API de modelo com raciocínio estendido
        fonte: editorial
      - chave: Escala típica
        valor: Um problema por chamada
        fonte: editorial
      - chave: Tipo de verificação
        valor: Passo a passo conferido por regra
        fonte: editorial
  - id: raciocinio-planejamento-decisao
    nome: Planejamento e decisão
    descricao: Análise de alternativas e riscos antes de agir.
    funcionalidades:
      - "[[raciocinio|Raciocínio]]"
      - "[[contexto_longo|Contexto longo]]"
    herdaFerramentas: false
    maisBarata:
      - "[[deepseek|DeepSeek]]"
      - "[[qwen|Qwen]]"
      - "[[mistral|Mistral]]"
    custoBeneficio:
      - "[[gemini|Gemini]]"
      - "[[grok|Grok]]"
      - "[[perplexity|Perplexity]]"
    qualidadeMaxima:
      - "[[claude|Claude AI]]"
      - "[[chatgpt|ChatGPT]]"
      - tabela:microsoft-copilot
    justificativaFerramentas: "Muda Tipo de verificação para alternativas e riscos revisados por pessoa: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Chat com modelo de raciocínio
        fonte: editorial
      - chave: Escala típica
        valor: Uma decisão por conversa
        fonte: editorial
      - chave: Tipo de verificação
        valor: Alternativas e riscos revisados por pessoa
        fonte: editorial
  - id: raciocinio-depuracao-logica
    nome: Depuração lógica
    descricao: Causa raiz em sistemas com muitos sinais.
    funcionalidades:
      - "[[raciocinio|Raciocínio]]"
      - "[[contexto_longo|Contexto longo]]"
    herdaFerramentas: false
    maisBarata:
      - "[[deepseek_r1|DeepSeek R1]]"
      - "[[qwen3_8_27b|Qwen3.8-27B]]"
      - "[[gpt_oss_120b|gpt-oss-120b]]"
    custoBeneficio:
      - "[[claude_sonnet_5_5|Claude Sonnet 5.5]]"
      - "[[gpt_6_1_terra|GPT-6.1 Terra]]"
      - "[[gemini_3_8_flash|Gemini 3.8 Flash]]"
    qualidadeMaxima:
      - "[[claude_opus_5_5|Claude Opus 5.5]]"
      - "[[gpt_6_2_sol|GPT-6.2 Sol]]"
      - "[[gemini_4_carbon|Gemini 4 Carbon]]"
    justificativaFerramentas: "Muda Tipo de verificação para hipótese confrontada com evidência: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Modelo com acesso de leitura a logs e código
        fonte: editorial
      - chave: Escala típica
        valor: Incidente com muitos sinais
        fonte: editorial
      - chave: Tipo de verificação
        valor: Hipótese confrontada com evidência
        fonte: editorial
tags:
  - caso-de-uso
  - ia
---
# Raciocínio complexo e matemática
## 📝 Descrição
Resolver problemas difíceis de lógica, matemática e ciência com várias etapas.
## ⏰ Quando aplicar
- Provas, otimização e análise quantitativa
- Decisões com muitos fatores
## 🧩 Funcionalidades necessárias
- [[raciocinio|Raciocínio]] - Resolução de problemas em várias etapas, com planejamento, lógica e matemática.
- [[contexto_longo|Contexto longo]] - Janela de contexto grande o bastante para ler bases de código, contratos e longos históricos de uma vez.
## ✅ Recomendações
- [[claude_opus_5_5|Claude Opus 5.5]] - Raciocínio estendido com muita precisão
- [[gpt_6_2_astra|GPT-6.2 Astra]] - Modelo de topo da OpenAI para problemas difíceis
- [[gemini_4_carbon|Gemini 4 Carbon]] - Raciocínio forte com contexto grande
- [[deepseek_r1|DeepSeek R1]] - Raciocínio com pesos abertos
- [[claude_fable_5_2|Claude Fable 5.2]] - Maior capacidade da Anthropic para tarefas exigentes
- [[chatgpt|ChatGPT]] - Acesso direto aos modelos de raciocínio da OpenAI
- [[claude|Claude AI]] - Acesso direto aos modelos de raciocínio da Anthropic
## 🧬 Variações
- **Matemática e demonstrações** (`raciocinio-matematica-prova`): Problemas de múltiplas etapas com verificação passo a passo. Funcionalidades: [[raciocinio|Raciocínio]], [[contexto_longo|Contexto longo]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Ambiente de execução: API de modelo com raciocínio estendido; Escala típica: Um problema por chamada; Tipo de verificação: Passo a passo conferido por regra.
- **Planejamento e decisão** (`raciocinio-planejamento-decisao`): Análise de alternativas e riscos antes de agir. Funcionalidades: [[raciocinio|Raciocínio]], [[contexto_longo|Contexto longo]]. Mais barata: [[deepseek|DeepSeek]], [[qwen|Qwen]], [[mistral|Mistral]]. Custo-benefício: [[gemini|Gemini]], [[grok|Grok]], [[perplexity|Perplexity]]. Qualidade máxima: [[claude|Claude AI]], [[chatgpt|ChatGPT]], Microsoft Copilot. Por que difere do caso: Muda Tipo de verificação para alternativas e riscos revisados por pessoa: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Chat com modelo de raciocínio; Escala típica: Uma decisão por conversa; Tipo de verificação: Alternativas e riscos revisados por pessoa.
- **Depuração lógica** (`raciocinio-depuracao-logica`): Causa raiz em sistemas com muitos sinais. Funcionalidades: [[raciocinio|Raciocínio]], [[contexto_longo|Contexto longo]]. Mais barata: [[deepseek_r1|DeepSeek R1]], [[qwen3_8_27b|Qwen3.8-27B]], [[gpt_oss_120b|gpt-oss-120b]]. Custo-benefício: [[claude_sonnet_5_5|Claude Sonnet 5.5]], [[gpt_6_1_terra|GPT-6.1 Terra]], [[gemini_3_8_flash|Gemini 3.8 Flash]]. Qualidade máxima: [[claude_opus_5_5|Claude Opus 5.5]], [[gpt_6_2_sol|GPT-6.2 Sol]], [[gemini_4_carbon|Gemini 4 Carbon]]. Por que difere do caso: Muda Tipo de verificação para hipótese confrontada com evidência: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Modelo com acesso de leitura a logs e código; Escala típica: Incidente com muitos sinais; Tipo de verificação: Hipótese confrontada com evidência.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[gemma_4|Gemma 4]], [[claude_haiku_5_5|Claude Haiku 5.5]], [[qwen3_8_flash|Qwen3.8-Flash]]
- **Custo-benefício:** [[gpt_6_1_terra|GPT-6.1 Terra]], [[gemini_3_8_flash|Gemini 3.8 Flash]], [[claude_sonnet_5_5|Claude Sonnet 5.5]]
- **Qualidade máxima:** [[claude_opus_5_5|Claude Opus 5.5]], [[gpt_6_2_astra|GPT-6.2 Astra]], [[gemini_4_neon|Gemini 4 Neon]]
## ⚖️ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** lock-in. Problemas difíceis se testam em mais de um modelo, e manter a avaliação independente do fornecedor permite escolher o melhor a cada ciclo.
## 🔗 Relacionamentos
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Casos de Uso de IA
- **Macro:** [[ia_aplicada_e_agentes|IA aplicada e agentes]]
