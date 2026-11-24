---
id: narracao_de_voz
tipo: caso-de-uso
nome: Narração de voz
aliases:
  - narracao-voz
descricao: Gerar narração e vozes sintéticas para vídeos, cursos e produtos.
funcionalidadesNecessarias:
  - "[[geracao_de_audio|Geração de áudio]]"
  - "[[voz_em_tempo_real|Voz em tempo real]]"
categoriasRelacionadas:
  - "[[geracao_audio|Ferramentas de áudio e voz]]"
ferramentasRecomendadas:
  - "[[elevenlabs|ElevenLabs]]"
  - "[[whisper|Whisper]]"
modelosRecomendados:
  - "[[gpt_realtime_2_1|GPT-Realtime-2.1]]"
  - "[[gpt_transcribe|GPT-Transcribe]]"
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
  - id: narracao-audiolivro
    nome: Audiolivro e narração longa
    descricao: Narração contínua com voz consistente e pausas naturais.
    funcionalidades:
      - "[[geracao_de_audio|Geração de áudio]]"
      - "[[geracao_de_texto|Geração de texto]]"
    herdaFerramentas: true
    parametros:
      - chave: Tipo de narração
        valor: Longa e contínua
        fonte: editorial
      - chave: Entregável
        valor: Narração com voz consistente e pausas naturais
        fonte: editorial
      - chave: Requisitos específicos
        valor: Revisão humana capítulo a capítulo
        fonte: editorial
  - id: narracao-video-explicativo
    nome: Narração de vídeo explicativo
    descricao: Voz sintética sincronizada com roteiro e cortes.
    funcionalidades:
      - "[[geracao_de_audio|Geração de áudio]]"
      - "[[geracao_de_texto|Geração de texto]]"
    herdaFerramentas: false
    maisBarata:
      - tabela:piper-tts
      - tabela:kokoro
      - "[[audacity|Audacity]]"
    custoBeneficio:
      - "[[elevenlabs|ElevenLabs]]"
      - tabela:cartesia
      - "[[capcut|CapCut]]"
    qualidadeMaxima:
      - tabela:heygen-skills
      - "[[adobe_premiere_pro|Adobe Premiere Pro]]"
      - tabela:azure-ai-speech
    justificativaFerramentas: "Muda o Tipo de narração para sincronizada com imagem: o fluxo termina no editor de vídeo."
    excecao: ""
    parametros:
      - chave: Tipo de narração
        valor: Sincronizada com imagem
        fonte: editorial
      - chave: Entregável
        valor: Voz sincronizada com roteiro e cortes
        fonte: editorial
  - id: narracao-ia-tempo-real
    nome: Voz de assistente em tempo real
    descricao: Resposta falada com baixa latência para chat de voz.
    funcionalidades:
      - "[[geracao_de_audio|Geração de áudio]]"
      - "[[voz_em_tempo_real|Voz em tempo real]]"
    herdaFerramentas: false
    maisBarata:
      - "[[whisper|Whisper]]"
      - tabela:kokoro
      - tabela:piper-tts
    custoBeneficio:
      - tabela:deepgram
      - tabela:cartesia
      - "[[elevenlabs|ElevenLabs]]"
    qualidadeMaxima:
      - "[[gpt_realtime_2_1|GPT-Realtime-2.1]]"
      - tabela:azure-ai-speech
      - tabela:assemblyai
    justificativaFerramentas: "Muda o Tipo de narração para conversa interativa: o critério é latência baixa na primeira palavra."
    excecao: ""
    parametros:
      - chave: Tipo de narração
        valor: Conversa interativa
        fonte: editorial
      - chave: Entregável
        valor: Resposta falada de baixa latência
        fonte: editorial
      - chave: Latência alvo
        valor: Menos de 1 segundo até a primeira palavra
        fonte: editorial
tags:
  - caso-de-uso
  - ia
---
# Narração de voz
## 📝 Descrição
Gerar narração e vozes sintéticas para vídeos, cursos e produtos.
## ⏰ Quando aplicar
- Locução de conteúdo
- Vozes para aplicativos
## 🧩 Funcionalidades necessárias
- [[geracao_de_audio|Geração de áudio]] - Síntese de fala, música e efeitos sonoros.
- [[voz_em_tempo_real|Voz em tempo real]] - Conversa falada com baixa latência, com interrupção natural e entrada de áudio contínua.
## ✅ Recomendações
- [[elevenlabs|ElevenLabs]] - Vozes naturais, clonagem e muitos idiomas
- [[gpt_realtime_2_1|GPT-Realtime-2.1]] - Voz com baixa latência para conversa
- [[whisper|Whisper]] - Complemento para transcrever e revisar o áudio gerado
- [[gpt_transcribe|GPT-Transcribe]] - Transcrição para revisar e legendar a narração
## 🧬 Variações
- **Audiolivro e narração longa** (`narracao-audiolivro`): Narração contínua com voz consistente e pausas naturais. Funcionalidades: [[geracao_de_audio|Geração de áudio]], [[geracao_de_texto|Geração de texto]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Tipo de narração: Longa e contínua; Entregável: Narração com voz consistente e pausas naturais; Requisitos específicos: Revisão humana capítulo a capítulo.
- **Narração de vídeo explicativo** (`narracao-video-explicativo`): Voz sintética sincronizada com roteiro e cortes. Funcionalidades: [[geracao_de_audio|Geração de áudio]], [[geracao_de_texto|Geração de texto]]. Mais barata: Piper, Kokoro TTS, [[audacity|Audacity]]. Custo-benefício: [[elevenlabs|ElevenLabs]], Cartesia, [[capcut|CapCut]]. Qualidade máxima: HeyGen Skills, [[adobe_premiere_pro|Adobe Premiere Pro]], Azure AI Speech. Por que difere do caso: Muda o Tipo de narração para sincronizada com imagem: o fluxo termina no editor de vídeo. Parâmetros: Tipo de narração: Sincronizada com imagem; Entregável: Voz sincronizada com roteiro e cortes.
- **Voz de assistente em tempo real** (`narracao-ia-tempo-real`): Resposta falada com baixa latência para chat de voz. Funcionalidades: [[geracao_de_audio|Geração de áudio]], [[voz_em_tempo_real|Voz em tempo real]]. Mais barata: [[whisper|Whisper]], Kokoro TTS, Piper. Custo-benefício: Deepgram, Cartesia, [[elevenlabs|ElevenLabs]]. Qualidade máxima: [[gpt_realtime_2_1|GPT-Realtime-2.1]], Azure AI Speech, AssemblyAI. Por que difere do caso: Muda o Tipo de narração para conversa interativa: o critério é latência baixa na primeira palavra. Parâmetros: Tipo de narração: Conversa interativa; Entregável: Resposta falada de baixa latência; Latência alvo: Menos de 1 segundo até a primeira palavra.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[whisper|Whisper]], Piper, Kokoro TTS
- **Custo-benefício:** [[elevenlabs|ElevenLabs]], Deepgram, AssemblyAI
- **Qualidade máxima:** [[gpt_realtime_2_1|GPT-Realtime-2.1]], Azure AI Speech, Cartesia
## ⚖️ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** lock-in. Vozes clonadas e projetos de áudio ficam no serviço, então exportar os arquivos e manter alternativas protege o trabalho.
## 🔗 Relacionamentos
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Casos de Uso de IA
- **Macro:** [[audio_e_voz|Áudio e voz]]
