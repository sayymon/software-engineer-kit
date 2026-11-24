---
id: producao_de_video
tipo: caso-de-uso
nome: Produção de vídeo
aliases:
  - geracao-video
  - Criação de vídeos
descricao: Produzir vídeos curtos a partir de texto, imagem ou clipes.
funcionalidadesNecessarias:
  - "[[geracao_de_video|Geração de vídeo]]"
  - "[[multimodal|Multimodal]]"
categoriasRelacionadas:
  - "[[geracao_video|Ferramentas de geração de vídeo]]"
ferramentasRecomendadas:
  - "[[runway|Runway]]"
  - "[[midjourney|Midjourney]]"
modelosRecomendados:
  - "[[gemini_omni_1_2_flash|Gemini Omni 1.2 Flash]]"
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
macro: "[[criacao_de_conteudo|Criação de conteúdo]]"
faixasPadrao:
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
variacoes:
  - id: video-curto-vertical
    nome: Vídeo curto vertical (Reels, Shorts, TikTok)
    descricao: Cortes de 15 a 60 segundos em 9:16 com legenda, ritmo rápido e gancho nos primeiros segundos.
    funcionalidades:
      - "[[geracao_de_video|Geração de vídeo]]"
      - "[[multimodal|Multimodal]]"
    herdaFerramentas: true
    parametros:
      - chave: Proporção
        valor: 9:16 (Reels, Shorts e TikTok)
        fonte: não verificado
      - chave: Duração típica
        valor: 15 a 60 segundos
        fonte: não verificado
      - chave: Resolução
        valor: 1080 x 1920
        fonte: não verificado
      - chave: Plataforma de distribuição
        valor: Reels, Shorts e TikTok
        fonte: editorial
      - chave: Requisitos específicos
        valor: Legenda embutida e gancho nos primeiros segundos
        fonte: editorial
      - chave: Limite do YouTube Shorts
        valor: Até 3 minutos e resolução máxima de 1080p
        fonte: https://support.google.com/youtube/answer/10059070
    verificadoEm: 2026-11-22
  - id: video-youtube
    nome: Vídeo para YouTube
    descricao: Vídeo horizontal de 8 a 20 minutos com roteiro, gravação, edição, miniatura e capítulos.
    funcionalidades:
      - "[[geracao_de_texto|Geração de texto]]"
      - "[[geracao_de_video|Geração de vídeo]]"
      - "[[transcricao_de_audio|Transcrição de áudio]]"
    herdaFerramentas: false
    maisBarata:
      - "[[davinci_resolve|DaVinci Resolve]]"
      - tabela:kdenlive
      - tabela:shotcut
    custoBeneficio:
      - tabela:descript
      - tabela:loom
      - "[[capcut|CapCut]]"
    qualidadeMaxima:
      - "[[adobe_premiere_pro|Adobe Premiere Pro]]"
      - tabela:final-cut-pro
      - "[[runway|Runway]]"
    justificativaFerramentas: "Muda Proporção, Duração típica e Plataforma de distribuição: vídeo horizontal de 8 a 20 minutos pede edição longa, capítulos e miniatura."
    excecao: ""
    parametros:
      - chave: Proporção
        valor: 16:9 no YouTube
        fonte: https://support.google.com/youtube/answer/6375112
      - chave: Duração típica
        valor: 8 a 20 minutos
        fonte: não verificado
      - chave: Resolução
        valor: 1920x1080 (1080p) no YouTube, com 4K em 3840x2160 como opção
        fonte: https://support.google.com/youtube/answer/6375112
      - chave: Plataforma de distribuição
        valor: YouTube em computador, celular e TV
        fonte: editorial
      - chave: Requisitos específicos
        valor: Capítulos, miniatura e descrição com termos de busca
        fonte: editorial
      - chave: Formato de arquivo
        valor: MP4 com H.264 e áudio AAC-LC a 48 kHz, formato recomendado pelo YouTube
        fonte: https://support.google.com/youtube/answer/1722171
      - chave: Bitrate de vídeo em 1080p
        valor: 8 Mbps a 24, 25 ou 30 quadros por segundo, recomendado pelo YouTube
        fonte: https://support.google.com/youtube/answer/1722171
    verificadoEm: 2026-11-22
  - id: video-tiktok
    nome: TikTok
    descricao: Edição de vídeos nativos de TikTok com tendências, som em alta, legenda na tela e cortes verticais para a plataforma.
    funcionalidades:
      - "[[geracao_de_video|Geração de vídeo]]"
      - "[[geracao_de_audio|Geração de áudio]]"
      - "[[multimodal|Multimodal]]"
    herdaFerramentas: false
    maisBarata:
      - "[[capcut|CapCut]]"
      - tabela:kdenlive
      - tabela:shotcut
    custoBeneficio:
      - tabela:veed
      - tabela:descript
      - "[[canva|Canva]]"
    qualidadeMaxima:
      - "[[adobe_premiere_pro|Adobe Premiere Pro]]"
      - tabela:final-cut-pro
      - "[[runway|Runway]]"
    justificativaFerramentas: "Muda Plataforma de distribuição e Requisitos específicos: TikTok pede edição vertical com som em alta, legenda na tela e tendência do momento."
    excecao: ""
    parametros:
      - chave: Proporção
        valor: 9:16
        fonte: não verificado
      - chave: Duração típica
        valor: 15 a 60 segundos, com variações mais longas
        fonte: não verificado
      - chave: Resolução
        valor: 1080 x 1920
        fonte: não verificado
      - chave: Plataforma de distribuição
        valor: TikTok
        fonte: editorial
      - chave: Requisitos específicos
        valor: Som em alta, tendência do momento e legenda na tela
        fonte: editorial
  - id: video-instagram-reels
    nome: Instagram Reels
    descricao: Reels com identidade de marca, capa, legenda e variações para teste de retenção.
    funcionalidades:
      - "[[geracao_de_video|Geração de vídeo]]"
      - "[[geracao_de_imagem|Geração de imagem]]"
      - "[[geracao_de_texto|Geração de texto]]"
    herdaFerramentas: false
    maisBarata:
      - "[[capcut|CapCut]]"
      - tabela:shotcut
      - "[[canva|Canva]]"
    custoBeneficio:
      - tabela:adobe-express
      - tabela:descript
      - tabela:veed
    qualidadeMaxima:
      - "[[adobe_premiere_pro|Adobe Premiere Pro]]"
      - "[[davinci_resolve|DaVinci Resolve]]"
      - tabela:adobe-firefly
    justificativaFerramentas: "Muda Plataforma de distribuição e Requisitos específicos: Reels pede capa, identidade de marca e variações para retenção, sem editor de foto."
    excecao: ""
    parametros:
      - chave: Proporção
        valor: 9:16
        fonte: não verificado
      - chave: Duração típica
        valor: 15 a 90 segundos
        fonte: não verificado
      - chave: Resolução
        valor: 1080 x 1920
        fonte: não verificado
      - chave: Plataforma de distribuição
        valor: Instagram Reels
        fonte: editorial
      - chave: Requisitos específicos
        valor: Capa alinhada ao grid, identidade de marca e variações para teste de retenção
        fonte: editorial
  - id: video-linkedin
    nome: LinkedIn
    descricao: Vídeo profissional curto com legenda embutida, foco em autoridade e conteúdo técnico.
    funcionalidades:
      - "[[geracao_de_texto|Geração de texto]]"
      - "[[transcricao_de_audio|Transcrição de áudio]]"
      - "[[geracao_de_video|Geração de vídeo]]"
    herdaFerramentas: false
    maisBarata:
      - tabela:loom
      - "[[capcut|CapCut]]"
      - tabela:shotcut
    custoBeneficio:
      - tabela:descript
      - tabela:veed
      - "[[canva|Canva]]"
    qualidadeMaxima:
      - "[[adobe_premiere_pro|Adobe Premiere Pro]]"
      - tabela:final-cut-pro
      - tabela:adobe-express
    justificativaFerramentas: "Muda Plataforma de distribuição e Requisitos específicos: vídeo profissional no LinkedIn pede legenda embutida e gravação simples de tela e câmera."
    excecao: ""
    parametros:
      - chave: Proporção
        valor: 1:1 ou 16:9, com 9:16 também aceito
        fonte: não verificado
      - chave: Duração típica
        valor: 30 a 90 segundos
        fonte: não verificado
      - chave: Resolução
        valor: 1080p
        fonte: não verificado
      - chave: Plataforma de distribuição
        valor: LinkedIn, feed e página da empresa
        fonte: editorial
      - chave: Requisitos específicos
        valor: Legenda embutida, abertura com a tese e tom técnico
        fonte: editorial
  - id: video-filme-curta
    nome: Filme e curta
    descricao: Narrativa longa com roteiro, storyboard, geração de cenas, trilha e finalização de cor.
    funcionalidades:
      - "[[geracao_de_video|Geração de vídeo]]"
      - "[[geracao_de_imagem|Geração de imagem]]"
      - "[[geracao_de_audio|Geração de áudio]]"
      - "[[multimodal|Multimodal]]"
    herdaFerramentas: false
    maisBarata:
      - tabela:wan-video
      - tabela:ltx-video
      - "[[davinci_resolve|DaVinci Resolve]]"
    custoBeneficio:
      - "[[runway|Runway]]"
      - tabela:luma-dream-machine
      - tabela:pika
    qualidadeMaxima:
      - "[[gemini_omni_1_2_flash|Gemini Omni 1.2 Flash]]"
      - tabela:openai-sora
      - tabela:final-cut-pro
    justificativaFerramentas: "Muda Duração típica e Requisitos específicos: narrativa longa pede geração de cenas consistentes e finalização de cor."
    excecao: ""
    parametros:
      - chave: Proporção
        valor: 16:9
        fonte: não verificado
      - chave: Duração típica
        valor: Curta a média-metragem, de minutos a dezenas de minutos
        fonte: não verificado
      - chave: Resolução
        valor: 3840x2160 (4K)
        fonte: não verificado
      - chave: Plataforma de distribuição
        valor: YouTube, festivais e plataformas de streaming
        fonte: editorial
      - chave: Requisitos específicos
        valor: Roteiro, storyboard, consistência de personagem, trilha e correção de cor
        fonte: editorial
    verificadoEm: 2026-11-22
  - id: video-apresentacao
    nome: Vídeo de apresentação
    descricao: Vídeo explicativo com slides animados, narração sintética e avatar.
    funcionalidades:
      - "[[geracao_de_audio|Geração de áudio]]"
      - "[[geracao_de_texto|Geração de texto]]"
      - "[[geracao_de_imagem|Geração de imagem]]"
    herdaFerramentas: false
    maisBarata:
      - "[[google_slides|Google Slides]]"
      - tabela:marp
      - tabela:piper-tts
    custoBeneficio:
      - "[[canva|Canva]]"
      - tabela:gamma
      - "[[elevenlabs|ElevenLabs]]"
    qualidadeMaxima:
      - "[[microsoft_powerpoint|Microsoft PowerPoint]]"
      - tabela:pitch
      - tabela:heygen-skills
    justificativaFerramentas: "Muda Requisitos específicos para narração sintética e avatar sobre slides animados: o ponto de partida é a apresentação, não a linha do tempo."
    excecao: ""
    parametros:
      - chave: Proporção
        valor: 16:9
        fonte: não verificado
      - chave: Duração típica
        valor: 2 a 10 minutos
        fonte: não verificado
      - chave: Resolução
        valor: 1920x1080 (1080p)
        fonte: não verificado
      - chave: Plataforma de distribuição
        valor: Reunião interna, treinamento e YouTube
        fonte: editorial
      - chave: Requisitos específicos
        valor: Narração sintética sincronizada, legenda e avatar opcional
        fonte: editorial
    verificadoEm: 2026-11-22
  - id: video-anuncio
    nome: Anúncio
    descricao: Anúncio de 6 a 30 segundos com variações de gancho e formatos para mídia paga.
    funcionalidades:
      - "[[geracao_de_video|Geração de vídeo]]"
      - "[[geracao_de_imagem|Geração de imagem]]"
      - "[[geracao_de_texto|Geração de texto]]"
    herdaFerramentas: false
    maisBarata:
      - "[[capcut|CapCut]]"
      - tabela:wan-video
      - tabela:veed
    custoBeneficio:
      - "[[runway|Runway]]"
      - tabela:pika
      - tabela:adobe-express
    qualidadeMaxima:
      - tabela:openai-sora
      - tabela:kling
      - "[[gemini_omni_1_2_flash|Gemini Omni 1.2 Flash]]"
    justificativaFerramentas: "Muda Duração típica e Requisitos específicos: anúncios curtos pedem muitas variações geradas de gancho e formatos por posicionamento."
    excecao: ""
    parametros:
      - chave: Proporção
        valor: 9:16, 1:1 e 16:9, um corte por posicionamento
        fonte: não verificado
      - chave: Duração típica
        valor: 6 a 30 segundos
        fonte: não verificado
      - chave: Resolução
        valor: 1080p
        fonte: não verificado
      - chave: Plataforma de distribuição
        valor: Mídia paga em Meta, TikTok Ads e YouTube Ads
        fonte: editorial
      - chave: Requisitos específicos
        valor: Gancho nos 3 primeiros segundos, 3 variações de abertura e chamada para ação
        fonte: editorial
tags:
  - caso-de-uso
  - ia
---
# Produção de vídeo
## 📝 Descrição
Produzir vídeos curtos a partir de texto, imagem ou clipes.
## ⏰ Quando aplicar
- Anúncios e conteúdo social
- Prototipação de cenas
## 🧩 Funcionalidades necessárias
- [[geracao_de_video|Geração de vídeo]] - Criação e edição de vídeo a partir de texto, imagem ou clipes.
- [[multimodal|Multimodal]] - Entendimento de mais de um tipo de entrada, como texto, imagem, áudio, vídeo e PDF.
## ✅ Recomendações
- [[runway|Runway]] - Controle de câmera e edição de vídeo gerado
- [[gemini_omni_1_2_flash|Gemini Omni 1.2 Flash]] - Geração de vídeo integrada a um modelo multimodal
- [[midjourney|Midjourney]] - Animação a partir de imagens com estilo próprio
## 🧬 Variações
- **Vídeo curto vertical (Reels, Shorts, TikTok)** (`video-curto-vertical`): Cortes de 15 a 60 segundos em 9:16 com legenda, ritmo rápido e gancho nos primeiros segundos. Funcionalidades: [[geracao_de_video|Geração de vídeo]], [[multimodal|Multimodal]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Proporção: 9:16 (Reels, Shorts e TikTok) (não verificado); Duração típica: 15 a 60 segundos (não verificado); Resolução: 1080 x 1920 (não verificado); Plataforma de distribuição: Reels, Shorts e TikTok; Requisitos específicos: Legenda embutida e gancho nos primeiros segundos; Limite do YouTube Shorts: Até 3 minutos e resolução máxima de 1080p.
- **Vídeo para YouTube** (`video-youtube`): Vídeo horizontal de 8 a 20 minutos com roteiro, gravação, edição, miniatura e capítulos. Funcionalidades: [[geracao_de_texto|Geração de texto]], [[geracao_de_video|Geração de vídeo]], [[transcricao_de_audio|Transcrição de áudio]]. Mais barata: [[davinci_resolve|DaVinci Resolve]], Kdenlive, Shotcut. Custo-benefício: Descript, Loom, [[capcut|CapCut]]. Qualidade máxima: [[adobe_premiere_pro|Adobe Premiere Pro]], Final Cut Pro, [[runway|Runway]]. Por que difere do caso: Muda Proporção, Duração típica e Plataforma de distribuição: vídeo horizontal de 8 a 20 minutos pede edição longa, capítulos e miniatura. Parâmetros: Proporção: 16:9 no YouTube; Duração típica: 8 a 20 minutos (não verificado); Resolução: 1920x1080 (1080p) no YouTube, com 4K em 3840x2160 como opção; Plataforma de distribuição: YouTube em computador, celular e TV; Requisitos específicos: Capítulos, miniatura e descrição com termos de busca; Formato de arquivo: MP4 com H.264 e áudio AAC-LC a 48 kHz, formato recomendado pelo YouTube; Bitrate de vídeo em 1080p: 8 Mbps a 24, 25 ou 30 quadros por segundo, recomendado pelo YouTube.
- **TikTok** (`video-tiktok`): Edição de vídeos nativos de TikTok com tendências, som em alta, legenda na tela e cortes verticais para a plataforma. Funcionalidades: [[geracao_de_video|Geração de vídeo]], [[geracao_de_audio|Geração de áudio]], [[multimodal|Multimodal]]. Mais barata: [[capcut|CapCut]], Kdenlive, Shotcut. Custo-benefício: VEED, Descript, [[canva|Canva]]. Qualidade máxima: [[adobe_premiere_pro|Adobe Premiere Pro]], Final Cut Pro, [[runway|Runway]]. Por que difere do caso: Muda Plataforma de distribuição e Requisitos específicos: TikTok pede edição vertical com som em alta, legenda na tela e tendência do momento. Parâmetros: Proporção: 9:16 (não verificado); Duração típica: 15 a 60 segundos, com variações mais longas (não verificado); Resolução: 1080 x 1920 (não verificado); Plataforma de distribuição: TikTok; Requisitos específicos: Som em alta, tendência do momento e legenda na tela.
- **Instagram Reels** (`video-instagram-reels`): Reels com identidade de marca, capa, legenda e variações para teste de retenção. Funcionalidades: [[geracao_de_video|Geração de vídeo]], [[geracao_de_imagem|Geração de imagem]], [[geracao_de_texto|Geração de texto]]. Mais barata: [[capcut|CapCut]], Shotcut, [[canva|Canva]]. Custo-benefício: Adobe Express, Descript, VEED. Qualidade máxima: [[adobe_premiere_pro|Adobe Premiere Pro]], [[davinci_resolve|DaVinci Resolve]], Adobe Firefly. Por que difere do caso: Muda Plataforma de distribuição e Requisitos específicos: Reels pede capa, identidade de marca e variações para retenção, sem editor de foto. Parâmetros: Proporção: 9:16 (não verificado); Duração típica: 15 a 90 segundos (não verificado); Resolução: 1080 x 1920 (não verificado); Plataforma de distribuição: Instagram Reels; Requisitos específicos: Capa alinhada ao grid, identidade de marca e variações para teste de retenção.
- **LinkedIn** (`video-linkedin`): Vídeo profissional curto com legenda embutida, foco em autoridade e conteúdo técnico. Funcionalidades: [[geracao_de_texto|Geração de texto]], [[transcricao_de_audio|Transcrição de áudio]], [[geracao_de_video|Geração de vídeo]]. Mais barata: Loom, [[capcut|CapCut]], Shotcut. Custo-benefício: Descript, VEED, [[canva|Canva]]. Qualidade máxima: [[adobe_premiere_pro|Adobe Premiere Pro]], Final Cut Pro, Adobe Express. Por que difere do caso: Muda Plataforma de distribuição e Requisitos específicos: vídeo profissional no LinkedIn pede legenda embutida e gravação simples de tela e câmera. Parâmetros: Proporção: 1:1 ou 16:9, com 9:16 também aceito (não verificado); Duração típica: 30 a 90 segundos (não verificado); Resolução: 1080p (não verificado); Plataforma de distribuição: LinkedIn, feed e página da empresa; Requisitos específicos: Legenda embutida, abertura com a tese e tom técnico.
- **Filme e curta** (`video-filme-curta`): Narrativa longa com roteiro, storyboard, geração de cenas, trilha e finalização de cor. Funcionalidades: [[geracao_de_video|Geração de vídeo]], [[geracao_de_imagem|Geração de imagem]], [[geracao_de_audio|Geração de áudio]], [[multimodal|Multimodal]]. Mais barata: Wan (vídeo), LTX-Video, [[davinci_resolve|DaVinci Resolve]]. Custo-benefício: [[runway|Runway]], Luma Dream Machine, Pika. Qualidade máxima: [[gemini_omni_1_2_flash|Gemini Omni 1.2 Flash]], Sora, Final Cut Pro. Por que difere do caso: Muda Duração típica e Requisitos específicos: narrativa longa pede geração de cenas consistentes e finalização de cor. Parâmetros: Proporção: 16:9 (não verificado); Duração típica: Curta a média-metragem, de minutos a dezenas de minutos (não verificado); Resolução: 3840x2160 (4K) (não verificado); Plataforma de distribuição: YouTube, festivais e plataformas de streaming; Requisitos específicos: Roteiro, storyboard, consistência de personagem, trilha e correção de cor.
- **Vídeo de apresentação** (`video-apresentacao`): Vídeo explicativo com slides animados, narração sintética e avatar. Funcionalidades: [[geracao_de_audio|Geração de áudio]], [[geracao_de_texto|Geração de texto]], [[geracao_de_imagem|Geração de imagem]]. Mais barata: [[google_slides|Google Slides]], Marp, Piper. Custo-benefício: [[canva|Canva]], Gamma, [[elevenlabs|ElevenLabs]]. Qualidade máxima: [[microsoft_powerpoint|Microsoft PowerPoint]], Pitch, HeyGen Skills. Por que difere do caso: Muda Requisitos específicos para narração sintética e avatar sobre slides animados: o ponto de partida é a apresentação, não a linha do tempo. Parâmetros: Proporção: 16:9 (não verificado); Duração típica: 2 a 10 minutos (não verificado); Resolução: 1920x1080 (1080p) (não verificado); Plataforma de distribuição: Reunião interna, treinamento e YouTube; Requisitos específicos: Narração sintética sincronizada, legenda e avatar opcional.
- **Anúncio** (`video-anuncio`): Anúncio de 6 a 30 segundos com variações de gancho e formatos para mídia paga. Funcionalidades: [[geracao_de_video|Geração de vídeo]], [[geracao_de_imagem|Geração de imagem]], [[geracao_de_texto|Geração de texto]]. Mais barata: [[capcut|CapCut]], Wan (vídeo), VEED. Custo-benefício: [[runway|Runway]], Pika, Adobe Express. Qualidade máxima: Sora, Kling, [[gemini_omni_1_2_flash|Gemini Omni 1.2 Flash]]. Por que difere do caso: Muda Duração típica e Requisitos específicos: anúncios curtos pedem muitas variações geradas de gancho e formatos por posicionamento. Parâmetros: Proporção: 9:16, 1:1 e 16:9, um corte por posicionamento (não verificado); Duração típica: 6 a 30 segundos (não verificado); Resolução: 1080p (não verificado); Plataforma de distribuição: Mídia paga em Meta, TikTok Ads e YouTube Ads; Requisitos específicos: Gancho nos 3 primeiros segundos, 3 variações de abertura e chamada para ação.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[davinci_resolve|DaVinci Resolve]], Kdenlive, Shotcut
- **Custo-benefício:** [[capcut|CapCut]], Descript, VEED
- **Qualidade máxima:** [[adobe_premiere_pro|Adobe Premiere Pro]], [[runway|Runway]], Final Cut Pro
## ⚖️ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** custo. Vídeo consome créditos rapidamente, então o custo por segundo utilizável decide.
## 🔗 Relacionamentos
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Casos de Uso de IA
- **Macro:** [[criacao_de_conteudo|Criação de conteúdo]]
