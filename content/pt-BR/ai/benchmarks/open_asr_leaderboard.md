---
id: open_asr_leaderboard
tipo: benchmark
nome: Open ASR Leaderboard
aliases:
  - Open ASR
  - HF Open ASR Leaderboard
descricao: Leaderboard aberto da Hugging Face para reconhecimento automático de fala em inglês, com WER e velocidade.
area: audio
avalia: Taxa de erro de palavras (WER) e velocidade de transcrição em vários conjuntos de áudio.
metodo: Cada modelo transcreve conjuntos padronizados (leitura, reuniões, telefonia). O WER médio é calculado após normalização do texto.
metrica: WER médio (%) e fator de tempo real (RTFx).
escala: "WER: menor é melhor."
limitacoes: Foco em inglês, e o desempenho em português precisa de teste próprio. O texto normalizado oculta erros de pontuação e de formatação.
saturacao: não verificado
contaminacao: Conjuntos públicos. Não verificado.
mantenedor: Hugging Face
urlOficial: https://huggingface.co/spaces/hf-audio/open_asr_leaderboard
dataVerificacao: 2026-11-22
funcionalidadesMedidas:
  - "[[transcricao_de_audio|Transcrição de áudio]]"
  - "[[voz_em_tempo_real|Voz em tempo real]]"
casosDeUsoRelacionados:
  - "[[transcricao_de_reunioes_e_midia|Transcrição de reuniões e mídia]]"
  - "[[assistente_de_voz_em_tempo_real|Assistente de voz em tempo real]]"
modelosAvaliados:
  - "[[whisper_large_v3|Whisper Large v3]]"
  - "[[gpt_transcribe|GPT-Transcribe]]"
  - "[[gpt_realtime_2_1|GPT-Realtime-2.1]]"
resultados:
  - modelo: "[[whisper_large_v3|Whisper Large v3]]"
    valor: não verificado
    unidade: não verificado
    origem: não verificado
    fonte: não verificado
    data: não verificado
    nota: O leaderboard oficial bloqueou a leitura automática (HTTP 403) em 2026-11-22.
  - modelo: "[[gpt_transcribe|GPT-Transcribe]]"
    valor: não verificado
    unidade: não verificado
    origem: não verificado
    fonte: não verificado
    data: não verificado
    nota: O leaderboard oficial bloqueou a leitura automática (HTTP 403) em 2026-11-22.
  - modelo: "[[gpt_realtime_2_1|GPT-Realtime-2.1]]"
    valor: não verificado
    unidade: não verificado
    origem: não verificado
    fonte: não verificado
    data: não verificado
    nota: O leaderboard oficial bloqueou a leitura automática (HTTP 403) em 2026-11-22.
tags:
  - benchmark
  - ia
---
# Open ASR Leaderboard
## 📝 Descrição
Leaderboard aberto da Hugging Face para reconhecimento automático de fala em inglês, com WER e velocidade. Mantido por Hugging Face. Página oficial: https://huggingface.co/spaces/hf-audio/open_asr_leaderboard
## 🎯 O que avalia
Taxa de erro de palavras (WER) e velocidade de transcrição em vários conjuntos de áudio.
## ⚙ Como funciona (método e métrica)
- **Método:** Cada modelo transcreve conjuntos padronizados (leitura, reuniões, telefonia). O WER médio é calculado após normalização do texto.
- **Métrica:** WER médio (%) e fator de tempo real (RTFx).
- **Escala:** WER: menor é melhor.
## ⚠ Limitações
Foco em inglês, e o desempenho em português precisa de teste próprio. O texto normalizado oculta erros de pontuação e de formatação.
## 🌡 Saturação e contaminação
- **Saturação:** não verificado. O leaderboard retornou HTTP 403 em 2026-11-22 e nenhuma pontuação foi lida.
- **Contaminação:** Conjuntos públicos. Não verificado.
## 📊 Resultados
Cada linha vem do campo `resultados` (consulta em 2026-11-22: 0 pontuações lidas, 3 `não verificado`). Origem `autodeclarado-fornecedor` indica número publicado pelo próprio fornecedor ou por quem mede um concorrente. Valores `não verificado` registram consulta sem pontuação oficial legível.

## 🧭 Como usar na escolha de modelo
Sem pontuações oficiais legíveis, trate o benchmark como referência de método e rode o teste você mesmo antes de decidir. Combine com os benchmarks da mesma área (audio) e com uma avaliação própria, porque cada fornecedor escolhe quais testes publicar.
## 🔗 Relacionamentos
- **Funcionalidades medidas:** [[transcricao_de_audio|Transcrição de áudio]], [[voz_em_tempo_real|Voz em tempo real]]
- **Casos de uso:** [[transcricao_de_reunioes_e_midia|Transcrição de reuniões e mídia]], [[assistente_de_voz_em_tempo_real|Assistente de voz em tempo real]]
- **Modelos avaliados:** [[whisper_large_v3|Whisper Large v3]], [[gpt_transcribe|GPT-Transcribe]], [[gpt_realtime_2_1|GPT-Realtime-2.1]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
