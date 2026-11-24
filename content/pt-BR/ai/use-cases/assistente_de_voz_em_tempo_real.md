---
id: assistente_de_voz_em_tempo_real
tipo: caso-de-uso
nome: Assistente de voz em tempo real
aliases:
  - assistente-voz-tempo-real
descricao: Conversar por voz com baixa latência em aplicativos e atendimento.
funcionalidadesNecessarias:
  - "[[voz_em_tempo_real|Voz em tempo real]]"
  - "[[tool_use_funcionalidade|Tool use]]"
  - "[[geracao_de_audio|Geração de áudio]]"
categoriasRelacionadas:
  - "[[geracao_audio|Ferramentas de áudio e voz]]"
  - "[[modelo_fundacional|Modelo fundacional]]"
ferramentasRecomendadas:
  - "[[elevenlabs|ElevenLabs]]"
  - "[[gemini|Gemini]]"
  - "[[whisper|Whisper]]"
modelosRecomendados:
  - "[[gpt_realtime_2_1|GPT-Realtime-2.1]]"
  - "[[gemini_3_8_flash|Gemini 3.8 Flash]]"
criteriosDesempate:
  - custo
  - privacidade-de-dados
  - lock-in
criterioPadrao: custo
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
macro: "[[audio_e_voz|Áudio e voz]]"
faixasPadrao:
  maisBarata:
    - "[[whisper|Whisper]]"
    - tabela:piper-tts
    - tabela:kokoro
  custoBeneficio:
    - "[[elevenlabs|ElevenLabs]]"
    - tabela:deepgram
    - tabela:assemblyai
  qualidadeMaxima:
    - "[[gpt_realtime_2_1|GPT-Realtime-2.1]]"
    - tabela:azure-ai-speech
    - tabela:cartesia
variacoes:
  - id: voz-atendimento-telefonico
    nome: Atendimento telefônico por voz
    descricao: Agente de voz que atende ligação, consulta sistemas e transfere para humano.
    funcionalidades:
      - "[[voz_em_tempo_real|Voz em tempo real]]"
      - "[[tool_use_funcionalidade|Tool use]]"
      - "[[geracao_de_audio|Geração de áudio]]"
    herdaFerramentas: true
    parametros:
      - chave: Canal de voz
        valor: Telefone
        fonte: editorial
      - chave: Entregável
        valor: Agente que atende, consulta sistemas e transfere para humano
        fonte: editorial
      - chave: Regulação aplicável
        valor: LGPD e aviso de gravação
        fonte: editorial
  - id: voz-assistente-pessoal
    nome: Assistente pessoal falado
    descricao: Conversa por voz no celular com agenda, lembretes e busca.
    funcionalidades:
      - "[[voz_em_tempo_real|Voz em tempo real]]"
      - "[[tool_use_funcionalidade|Tool use]]"
    herdaFerramentas: false
    maisBarata:
      - "[[gemini|Gemini]]"
      - "[[deepseek|DeepSeek]]"
      - tabela:pocketpal-ai
    custoBeneficio:
      - "[[chatgpt|ChatGPT]]"
      - "[[perplexity|Perplexity]]"
      - tabela:microsoft-copilot
    qualidadeMaxima:
      - "[[claude|Claude AI]]"
      - "[[grok|Grok]]"
      - "[[mistral|Mistral]]"
    justificativaFerramentas: "Muda o Canal de voz para o celular: o critério é assistente de uso geral com agenda e busca."
    excecao: ""
    parametros:
      - chave: Canal de voz
        valor: Celular
        fonte: editorial
      - chave: Entregável
        valor: Conversa por voz com agenda, lembretes e busca
        fonte: editorial
  - id: voz-tutor-idiomas
    nome: Tutor de idiomas por voz
    descricao: Prática de conversação com correção de pronúncia e vocabulário.
    funcionalidades:
      - "[[voz_em_tempo_real|Voz em tempo real]]"
      - "[[geracao_de_audio|Geração de áudio]]"
      - "[[geracao_de_texto|Geração de texto]]"
    herdaFerramentas: false
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
    justificativaFerramentas: "Muda o Entregável para prática de conversação: compara modelos por pronúncia, correção e custo por sessão."
    excecao: ""
    parametros:
      - chave: Canal de voz
        valor: Aplicativo de estudo
        fonte: editorial
      - chave: Entregável
        valor: Prática de conversação com correção de pronúncia
        fonte: editorial
tags:
  - caso-de-uso
  - ia
---
# Assistente de voz em tempo real
## 📝 Descrição
Conversar por voz com baixa latência em aplicativos e atendimento.
## ⏰ Quando aplicar
- Atendimento por voz
- Assistentes falados em produtos
## 🧩 Funcionalidades necessárias
- [[voz_em_tempo_real|Voz em tempo real]] - Conversa falada com baixa latência, com interrupção natural e entrada de áudio contínua.
- [[tool_use_funcionalidade|Tool use]] - Capacidade do modelo de chamar funções e ferramentas externas com argumentos estruturados.
- [[geracao_de_audio|Geração de áudio]] - Síntese de fala, música e efeitos sonoros.
## ✅ Recomendações
- [[gpt_realtime_2_1|GPT-Realtime-2.1]] - API em tempo real com áudio de entrada e saída
- [[elevenlabs|ElevenLabs]] - Vozes naturais para a camada de fala
- [[gemini|Gemini]] - Modo de conversa por voz integrado
- [[whisper|Whisper]] - Transcrição local para pipelines próprios de voz
- [[gemini_3_8_flash|Gemini 3.8 Flash]] - Camada de raciocínio rápida e barata atrás da voz
## 🧬 Variações
- **Atendimento telefônico por voz** (`voz-atendimento-telefonico`): Agente de voz que atende ligação, consulta sistemas e transfere para humano. Funcionalidades: [[voz_em_tempo_real|Voz em tempo real]], [[tool_use_funcionalidade|Tool use]], [[geracao_de_audio|Geração de áudio]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Canal de voz: Telefone; Entregável: Agente que atende, consulta sistemas e transfere para humano; Regulação aplicável: LGPD e aviso de gravação.
- **Assistente pessoal falado** (`voz-assistente-pessoal`): Conversa por voz no celular com agenda, lembretes e busca. Funcionalidades: [[voz_em_tempo_real|Voz em tempo real]], [[tool_use_funcionalidade|Tool use]]. Mais barata: [[gemini|Gemini]], [[deepseek|DeepSeek]], PocketPal AI. Custo-benefício: [[chatgpt|ChatGPT]], [[perplexity|Perplexity]], Microsoft Copilot. Qualidade máxima: [[claude|Claude AI]], [[grok|Grok]], [[mistral|Mistral]]. Por que difere do caso: Muda o Canal de voz para o celular: o critério é assistente de uso geral com agenda e busca. Parâmetros: Canal de voz: Celular; Entregável: Conversa por voz com agenda, lembretes e busca.
- **Tutor de idiomas por voz** (`voz-tutor-idiomas`): Prática de conversação com correção de pronúncia e vocabulário. Funcionalidades: [[voz_em_tempo_real|Voz em tempo real]], [[geracao_de_audio|Geração de áudio]], [[geracao_de_texto|Geração de texto]]. Mais barata: [[gemma_4|Gemma 4]], [[claude_haiku_5_5|Claude Haiku 5.5]], [[qwen3_8_flash|Qwen3.8-Flash]]. Custo-benefício: [[gpt_6_1_terra|GPT-6.1 Terra]], [[gemini_3_8_flash|Gemini 3.8 Flash]], [[claude_sonnet_5_5|Claude Sonnet 5.5]]. Qualidade máxima: [[claude_opus_5_5|Claude Opus 5.5]], [[gpt_6_2_astra|GPT-6.2 Astra]], [[gemini_4_neon|Gemini 4 Neon]]. Por que difere do caso: Muda o Entregável para prática de conversação: compara modelos por pronúncia, correção e custo por sessão. Parâmetros: Canal de voz: Aplicativo de estudo; Entregável: Prática de conversação com correção de pronúncia.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[whisper|Whisper]], Piper, Kokoro TTS
- **Custo-benefício:** [[elevenlabs|ElevenLabs]], Deepgram, AssemblyAI
- **Qualidade máxima:** [[gpt_realtime_2_1|GPT-Realtime-2.1]], Azure AI Speech, Cartesia
## ⚖️ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** custo. Conversa por voz consome minutos de áudio, e o custo por minuto de conversa decide a viabilidade do produto.
## 🔗 Relacionamentos
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Casos de Uso de IA
- **Macro:** [[audio_e_voz|Áudio e voz]]
