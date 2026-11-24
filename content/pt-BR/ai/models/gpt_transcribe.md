---
id: gpt_transcribe
tipo: modelo
nome: GPT-Transcribe
aliases: []
familia: GPT Audio
empresa: "[[openai|OpenAI]]"
lancamento: 2026-07-28
status: ativo
idModeloApi: gpt-transcribe
contextoTokens: não verificado
saidaMaxTokens: não verificado
modalidadesEntrada:
  - audio
modalidadesSaida:
  - texto
precoEntradaUSD: não verificado
precoSaidaUSD: não verificado
precoCacheUSD: não verificado
licenca: Proprietária
disponibilidade:
  - api
ferramentas:
  - "[[chatgpt|ChatGPT]]"
  - "[[whisper|Whisper]]"
categorias:
  - "[[modelo_fundacional|Modelo fundacional]]"
  - "[[geracao_audio|Ferramentas de áudio e voz]]"
funcionalidades:
  - "[[transcricao_de_audio|Transcrição de áudio]]"
casosDeUso:
  - "[[transcricao_de_reunioes_e_midia|Transcrição de reuniões e mídia]]"
  - "[[assistente_de_voz_em_tempo_real|Assistente de voz em tempo real]]"
benchmarks:
  - "[[open_asr_leaderboard|Open ASR Leaderboard]]"
dataVerificacao: 2026-11-20
fontePreco: https://developers.openai.com/api/docs/pricing
tags:
  - modelo
  - ia
  - llm
---
# GPT-Transcribe
## 📋 Informações Básicas
- **Família:** GPT Audio
- **Empresa:** [[openai|OpenAI]]
- **Lançamento:** 2026-07-28
- **Status:** ativo
- **ID na API:** gpt-transcribe
- **Disponibilidade:** api
## 📝 Descrição
Modelo de transcrição de arquivos de áudio e de transcrições finais de turnos do Realtime. Substitui o whisper-1 e os modelos gpt-4o-transcribe, que têm desligamento previsto para 2027-02-26.

A página oficial cobra por minuto de áudio (US$ 0,0045 por minuto), sem tarifa por token; por isso os campos por token ficam como não verificado.
## ⚙️ Especificações
- **Janela de contexto:** não verificado tokens
- **Saída máxima:** não verificado tokens
- **Modalidades de entrada:** audio
- **Modalidades de saída:** texto
- **Licença:** Proprietária
## 💰 Preço (USD por 1M tokens)
- **Entrada:** não verificado
- **Saída:** não verificado
- **Cache:** não verificado
- **Fonte:** https://developers.openai.com/api/docs/pricing (verificado em 2026-11-20)
- **Observação:** Preço oficial por minuto: US$ 0,0045. Sem tarifa por 1M tokens.
## ⏰ Quando Utilizar
- Transcrição precisa de arquivos e reuniões
- Pipeline de legendas e atas
### Quando NÃO utilizar
- Transcrição ao vivo com latência mínima (use GPT-Live-Transcribe)
## 🧩 Casos de uso e funcionalidades
- **Casos de uso:** [[transcricao_de_reunioes_e_midia|Transcrição de reuniões e mídia]], [[assistente_de_voz_em_tempo_real|Assistente de voz em tempo real]]
- **Funcionalidades:** [[transcricao_de_audio|Transcrição de áudio]]
- **Categorias:** [[modelo_fundacional|Modelo fundacional]], [[geracao_audio|Ferramentas de áudio e voz]]
## 🆚 Alternativas
- [[whisper_large_v3|Whisper Large v3]] - alternativa de outro fornecedor
- Gemini 3.5 Transcribe
## 🔗 Relacionamentos
- **Empresa:** [[openai|OpenAI]]
- **Ferramentas:** [[chatgpt|ChatGPT]], [[whisper|Whisper]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Modelos de IA
