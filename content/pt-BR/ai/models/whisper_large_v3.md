---
id: whisper_large_v3
tipo: modelo
nome: Whisper Large v3
aliases: []
familia: Whisper
empresa: "[[openai|OpenAI]]"
lancamento: 2023-11-06
status: legado
idModeloApi: whisper-large-v3
contextoTokens: não verificado
saidaMaxTokens: 0
modalidadesEntrada:
  - audio
modalidadesSaida:
  - texto
precoEntradaUSD: não verificado
precoSaidaUSD: não verificado
precoCacheUSD: não verificado
licenca: MIT
disponibilidade:
  - pesos-abertos
ferramentas:
  - "[[whisper|Whisper]]"
  - "[[ollama|Ollama]]"
  - "[[hugging_face|Hugging Face]]"
categorias:
  - "[[modelo_fundacional|Modelo fundacional]]"
  - "[[geracao_audio|Ferramentas de áudio e voz]]"
  - "[[inferencia_local|Inferência local]]"
funcionalidades:
  - "[[transcricao_de_audio|Transcrição de áudio]]"
  - "[[execucao_local|Execução local]]"
casosDeUso:
  - "[[transcricao_de_reunioes_e_midia|Transcrição de reuniões e mídia]]"
  - "[[inferencia_privada_local|Inferência privada local]]"
benchmarks:
  - "[[open_asr_leaderboard|Open ASR Leaderboard]]"
dataVerificacao: 2026-11-20
fontePreco: https://developers.openai.com/api/docs/pricing
tags:
  - modelo
  - ia
  - llm
---
# Whisper Large v3
## 📋 Informações Básicas
- **Família:** Whisper
- **Empresa:** [[openai|OpenAI]]
- **Lançamento:** 2023-11-06
- **Status:** legado
- **ID na API:** whisper-large-v3
- **Disponibilidade:** pesos-abertos
## 📝 Descrição
Modelo aberto de reconhecimento de fala da OpenAI, executável localmente. A API hospedada whisper-1 está depreciada, com desligamento previsto para 2027-02-26, em favor do GPT-Transcribe.

Pesos abertos sob licença MIT (publicação original da OpenAI). A data é a de lançamento do large-v3. A API whisper-1 custava US$ 0,006 por minuto segundo a página oficial.
## ⚙️ Especificações
- **Janela de contexto:** não verificado tokens
- **Saída máxima:** 0 tokens
- **Modalidades de entrada:** audio
- **Modalidades de saída:** texto
- **Licença:** MIT
## 💰 Preço (USD por 1M tokens)
- **Entrada:** não verificado
- **Saída:** não verificado
- **Cache:** não verificado
- **Fonte:** https://developers.openai.com/api/docs/pricing (verificado em 2026-11-20)
- **Observação:** Pesos abertos: sem tarifa por token; whisper-1 a US$ 0,006 por minuto (depreciado).
## ⏰ Quando Utilizar
- Transcrição offline e privada
- Pipelines locais de legendas
### Quando NÃO utilizar
- Transcrição ao vivo (use GPT-Live-Transcribe)
## 🧩 Casos de uso e funcionalidades
- **Casos de uso:** [[transcricao_de_reunioes_e_midia|Transcrição de reuniões e mídia]], [[inferencia_privada_local|Inferência privada local]]
- **Funcionalidades:** [[transcricao_de_audio|Transcrição de áudio]], [[execucao_local|Execução local]]
- **Categorias:** [[modelo_fundacional|Modelo fundacional]], [[geracao_audio|Ferramentas de áudio e voz]], [[inferencia_local|Inferência local]]
## 🆚 Alternativas
- [[gpt_transcribe|GPT-Transcribe]] - alternativa de outro fornecedor
- Gemini 3.5 Transcribe
## 🔗 Relacionamentos
- **Empresa:** [[openai|OpenAI]]
- **Ferramentas:** [[whisper|Whisper]], [[ollama|Ollama]], [[hugging_face|Hugging Face]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Modelos de IA
