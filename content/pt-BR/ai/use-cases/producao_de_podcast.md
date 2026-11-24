---
id: producao_de_podcast
tipo: caso-de-uso
nome: Produção de podcast
aliases: []
descricao: Gravar, editar e publicar podcast com roteiro, limpeza de áudio e divulgação.
funcionalidadesNecessarias:
  - "[[geracao_de_texto|Geração de texto]]"
  - "[[geracao_de_audio|Geração de áudio]]"
  - "[[transcricao_de_audio|Transcrição de áudio]]"
  - "[[geracao_de_video|Geração de vídeo]]"
  - "[[saida_estruturada|Saída estruturada]]"
categoriasRelacionadas:
  - "[[musica_audio|Música e áudio]]"
  - "[[reunioes_transcricao|Reuniões e transcrição]]"
  - "[[edicao_video|Edição de vídeo]]"
  - "[[geracao_audio|Ferramentas de áudio e voz]]"
  - "[[assistente_chat|Assistente de chat]]"
ferramentasRecomendadas:
  - "[[suno|Suno]]"
  - "[[otter_ai|Otter.ai]]"
  - "[[capcut|CapCut]]"
  - "[[elevenlabs|ElevenLabs]]"
  - "[[gemini|Gemini]]"
modelosRecomendados:
  - "[[gpt_realtime_2_1|GPT-Realtime-2.1]]"
criteriosDesempate:
  - custo
  - privacidade-de-dados
  - lock-in
criterioPadrao: custo
porte:
  - pessoa-fisica
  - pequena
  - media
segmentos:
  - midia-criadores
nicho: ""
nivel: caso
eixo: tarefa
macro: "[[criacao_de_conteudo|Criação de conteúdo]]"
faixasPadrao:
  maisBarata:
    - "[[audacity|Audacity]]"
    - tabela:ocenaudio
    - "[[whisper|Whisper]]"
  custoBeneficio:
    - tabela:adobe-podcast
    - tabela:descript
    - "[[elevenlabs|ElevenLabs]]"
  qualidadeMaxima:
    - tabela:logic-pro
    - tabela:ableton-live
    - tabela:pro-tools
variacoes:
  - id: podcast-solo
    nome: Podcast solo
    descricao: Episódio narrado com roteiro, gravação e edição de pausas e ruídos.
    funcionalidades:
      - "[[geracao_de_texto|Geração de texto]]"
      - "[[geracao_de_audio|Geração de áudio]]"
    herdaFerramentas: true
    parametros:
      - chave: Formato do episódio
        valor: Monólogo narrado com roteiro
        fonte: editorial
      - chave: Entregável
        valor: Episódio editado sem pausas longas e ruídos
        fonte: editorial
      - chave: Loudness de referência
        valor: -14 LUFS integrado (referência do Spotify)
        fonte: https://support.spotify.com/us/artists/article/loudness-normalization/
    verificadoEm: 2026-11-22
  - id: podcast-entrevista
    nome: Entrevista remota
    descricao: Gravação com convidado, transcrição e marcação de trechos para corte.
    funcionalidades:
      - "[[transcricao_de_audio|Transcrição de áudio]]"
      - "[[geracao_de_texto|Geração de texto]]"
    herdaFerramentas: false
    maisBarata:
      - "[[whisper|Whisper]]"
      - tabela:fathom-video
      - tabela:tldv
    custoBeneficio:
      - "[[otter_ai|Otter.ai]]"
      - tabela:fireflies-ai
      - tabela:read-ai
    qualidadeMaxima:
      - "[[granola|Granola]]"
      - tabela:avoma
      - tabela:rev
    justificativaFerramentas: "Muda o Formato do episódio para conversa remota: a gravação por faixa e a transcrição pesam mais que a edição."
    excecao: ""
    parametros:
      - chave: Formato do episódio
        valor: Conversa remota com convidado
        fonte: editorial
      - chave: Entregável
        valor: Gravação por faixa separada e transcrição com trechos marcados
        fonte: editorial
  - id: podcast-videocast
    nome: Videocast
    descricao: Versão em vídeo do episódio com cortes verticais para redes sociais.
    funcionalidades:
      - "[[geracao_de_video|Geração de vídeo]]"
      - "[[transcricao_de_audio|Transcrição de áudio]]"
    herdaFerramentas: false
    maisBarata:
      - "[[davinci_resolve|DaVinci Resolve]]"
      - tabela:kdenlive
      - tabela:shotcut
    custoBeneficio:
      - "[[capcut|CapCut]]"
      - tabela:descript
      - tabela:veed
    qualidadeMaxima:
      - "[[adobe_premiere_pro|Adobe Premiere Pro]]"
      - "[[runway|Runway]]"
      - tabela:final-cut-pro
    justificativaFerramentas: "Muda o Formato do episódio para vídeo: exige editor de vídeo e cortes verticais."
    excecao: ""
    parametros:
      - chave: Formato do episódio
        valor: Episódio em vídeo
        fonte: editorial
      - chave: Entregável
        valor: Versão em vídeo mais cortes verticais
        fonte: editorial
      - chave: Proporção
        valor: 16:9 para o episódio e 9:16 para os cortes
        fonte: não verificado
    verificadoEm: 2026-11-22
  - id: podcast-voz-sintetica
    nome: Podcast com voz sintética
    descricao: Episódios gerados a partir de texto com vozes de IA e revisão humana.
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
      - tabela:descript
    qualidadeMaxima:
      - tabela:azure-ai-speech
      - "[[gpt_realtime_2_1|GPT-Realtime-2.1]]"
      - tabela:adobe-podcast
    justificativaFerramentas: "Muda o Formato do episódio para áudio gerado a partir de texto: a escolha vem de qualidade e custo de voz sintética."
    excecao: ""
    parametros:
      - chave: Formato do episódio
        valor: Episódio gerado a partir de texto
        fonte: editorial
      - chave: Entregável
        valor: Áudio com voz de IA e revisão humana
        fonte: editorial
      - chave: Requisitos específicos
        valor: Aviso de voz sintética aos ouvintes
        fonte: editorial
  - id: podcast-divulgacao
    nome: Notas e divulgação do episódio
    descricao: Resumo, capítulos, legendas e posts de divulgação gerados da transcrição.
    funcionalidades:
      - "[[geracao_de_texto|Geração de texto]]"
      - "[[saida_estruturada|Saída estruturada]]"
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
    justificativaFerramentas: "Muda o Entregável para texto derivado da transcrição: resumo, capítulos e posts pedem modelo de linguagem."
    excecao: ""
    parametros:
      - chave: Formato do episódio
        valor: Material derivado da transcrição
        fonte: editorial
      - chave: Entregável
        valor: Resumo, capítulos, legendas e posts de divulgação
        fonte: editorial
tags:
  - caso-de-uso
  - ia
---
# Produção de podcast
## 📝 Descrição
Gravar, editar e publicar podcast com roteiro, limpeza de áudio e divulgação.
## ⏰ Quando aplicar
- Podcast solo ou com convidados
- Videocast com cortes para redes
## 🧩 Funcionalidades necessárias
- [[geracao_de_texto|Geração de texto]] - Produção de texto livre ou orientado por instruções, de rascunhos a respostas longas.
- [[geracao_de_audio|Geração de áudio]] - Síntese de fala, música e efeitos sonoros.
- [[transcricao_de_audio|Transcrição de áudio]] - Conversão de fala em texto, com tempo e identificação de falantes quando disponível.
- [[geracao_de_video|Geração de vídeo]] - Criação e edição de vídeo a partir de texto, imagem ou clipes.
- [[saida_estruturada|Saída estruturada]] - Respostas que seguem um esquema, como JSON validado, para uso direto por programas.
## ✅ Recomendações
- [[suno|Suno]] - Faixa custo-benefício em [[musica_audio|Música e áudio]].
- [[otter_ai|Otter.ai]] - Faixa custo-benefício em [[reunioes_transcricao|Reuniões e transcrição]].
- [[capcut|CapCut]] - Faixa custo-benefício em [[edicao_video|Edição de vídeo]].
- [[elevenlabs|ElevenLabs]] - Faixa custo-benefício em [[geracao_audio|Ferramentas de áudio e voz]].
- [[gemini|Gemini]] - Faixa custo-benefício em [[assistente_chat|Assistente de chat]].
- [[gpt_realtime_2_1|GPT-Realtime-2.1]] - Modelo da faixa qualidade máxima em [[geracao_audio|Ferramentas de áudio e voz]].
## 🧬 Variações
- **Podcast solo** (`podcast-solo`): Episódio narrado com roteiro, gravação e edição de pausas e ruídos. Funcionalidades: [[geracao_de_texto|Geração de texto]], [[geracao_de_audio|Geração de áudio]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Formato do episódio: Monólogo narrado com roteiro; Entregável: Episódio editado sem pausas longas e ruídos; Loudness de referência: -14 LUFS integrado (referência do Spotify).
- **Entrevista remota** (`podcast-entrevista`): Gravação com convidado, transcrição e marcação de trechos para corte. Funcionalidades: [[transcricao_de_audio|Transcrição de áudio]], [[geracao_de_texto|Geração de texto]]. Mais barata: [[whisper|Whisper]], Fathom (reuniões), tl;dv. Custo-benefício: [[otter_ai|Otter.ai]], Fireflies.ai, Read AI. Qualidade máxima: [[granola|Granola]], Avoma, Rev. Por que difere do caso: Muda o Formato do episódio para conversa remota: a gravação por faixa e a transcrição pesam mais que a edição. Parâmetros: Formato do episódio: Conversa remota com convidado; Entregável: Gravação por faixa separada e transcrição com trechos marcados.
- **Videocast** (`podcast-videocast`): Versão em vídeo do episódio com cortes verticais para redes sociais. Funcionalidades: [[geracao_de_video|Geração de vídeo]], [[transcricao_de_audio|Transcrição de áudio]]. Mais barata: [[davinci_resolve|DaVinci Resolve]], Kdenlive, Shotcut. Custo-benefício: [[capcut|CapCut]], Descript, VEED. Qualidade máxima: [[adobe_premiere_pro|Adobe Premiere Pro]], [[runway|Runway]], Final Cut Pro. Por que difere do caso: Muda o Formato do episódio para vídeo: exige editor de vídeo e cortes verticais. Parâmetros: Formato do episódio: Episódio em vídeo; Entregável: Versão em vídeo mais cortes verticais; Proporção: 16:9 para o episódio e 9:16 para os cortes (não verificado).
- **Podcast com voz sintética** (`podcast-voz-sintetica`): Episódios gerados a partir de texto com vozes de IA e revisão humana. Funcionalidades: [[geracao_de_audio|Geração de áudio]], [[geracao_de_texto|Geração de texto]]. Mais barata: Piper, Kokoro TTS, [[audacity|Audacity]]. Custo-benefício: [[elevenlabs|ElevenLabs]], Cartesia, Descript. Qualidade máxima: Azure AI Speech, [[gpt_realtime_2_1|GPT-Realtime-2.1]], Adobe Podcast. Por que difere do caso: Muda o Formato do episódio para áudio gerado a partir de texto: a escolha vem de qualidade e custo de voz sintética. Parâmetros: Formato do episódio: Episódio gerado a partir de texto; Entregável: Áudio com voz de IA e revisão humana; Requisitos específicos: Aviso de voz sintética aos ouvintes.
- **Notas e divulgação do episódio** (`podcast-divulgacao`): Resumo, capítulos, legendas e posts de divulgação gerados da transcrição. Funcionalidades: [[geracao_de_texto|Geração de texto]], [[saida_estruturada|Saída estruturada]]. Mais barata: [[deepseek|DeepSeek]], [[qwen|Qwen]], [[mistral|Mistral]]. Custo-benefício: [[gemini|Gemini]], [[grok|Grok]], [[perplexity|Perplexity]]. Qualidade máxima: [[claude|Claude AI]], [[chatgpt|ChatGPT]], Microsoft Copilot. Por que difere do caso: Muda o Entregável para texto derivado da transcrição: resumo, capítulos e posts pedem modelo de linguagem. Parâmetros: Formato do episódio: Material derivado da transcrição; Entregável: Resumo, capítulos, legendas e posts de divulgação.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[audacity|Audacity]], ocenaudio, [[whisper|Whisper]]
- **Custo-benefício:** Adobe Podcast, Descript, [[elevenlabs|ElevenLabs]]
- **Qualidade máxima:** Logic Pro, Ableton Live, Pro Tools
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** custo. Podcast tem receita baixa no início, então o custo mensal das ferramentas decide.
## 🔗 Relacionamentos
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Casos de Uso de IA
- **Macro:** [[criacao_de_conteudo|Criação de conteúdo]]
