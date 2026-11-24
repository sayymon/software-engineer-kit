---
id: wearables_e_oculos_inteligentes
tipo: caso-de-uso
nome: Wearables e óculos inteligentes
aliases: []
descricao: Escolher relógios, anéis, pulseiras e óculos inteligentes para saúde, rotina e captura.
funcionalidadesNecessarias:
  - "[[multimodal|Multimodal]]"
  - "[[geracao_de_texto|Geração de texto]]"
  - "[[voz_em_tempo_real|Voz em tempo real]]"
  - "[[memoria_persistente|Memória persistente]]"
  - "[[busca_semantica|Busca semântica]]"
categoriasRelacionadas:
  - "[[wearables_oculos|Wearables e óculos]]"
  - "[[android_utilitarios|Android utilitários]]"
  - "[[apps_ia_celular|Apps de IA no celular]]"
ferramentasRecomendadas:
  - "[[wear_os|Wear OS]]"
  - "[[bitwarden|Bitwarden]]"
  - "[[chatgpt|ChatGPT]]"
  - "[[perplexity|Perplexity]]"
  - "[[apple_watch|Apple Watch]]"
modelosRecomendados: []
criteriosDesempate:
  - custo
  - privacidade-de-dados
  - lock-in
criterioPadrao: privacidade-de-dados
porte:
  - pessoa-fisica
segmentos:
  - saude
  - geral
nicho: ""
nivel: caso
eixo: tarefa
macro: "[[dispositivos_e_ambientes|Dispositivos e ambientes]]"
faixasPadrao:
  maisBarata:
    - "[[gadgetbridge|Gadgetbridge]]"
    - tabela:health-connect
    - tabela:garmin-connect
  custoBeneficio:
    - "[[wear_os|Wear OS]]"
    - tabela:fitbit
    - tabela:ray-ban-meta
  qualidadeMaxima:
    - "[[apple_watch|Apple Watch]]"
    - tabela:apple-vision-pro
    - tabela:whoop
variacoes:
  - id: wear-relogio-saude
    nome: Relógio de saúde
    descricao: Frequência cardíaca, sono e treino.
    funcionalidades:
      - "[[multimodal|Multimodal]]"
      - "[[geracao_de_texto|Geração de texto]]"
    herdaFerramentas: true
    parametros:
      - chave: Dispositivo
        valor: Relógio ou pulseira de saúde
        fonte: editorial
      - chave: Ambiente de execução
        valor: Aplicativo do fabricante com Health Connect no Android
        fonte: editorial
      - chave: Dados de saúde
        valor: Frequência cardíaca, passos e sono no Health Connect do Android
        fonte: https://developer.android.com/health-and-fitness/guides/health-connect
    verificadoEm: 2026-11-22
  - id: wear-dados-abertos
    nome: Dados abertos e locais
    descricao: Exportar e guardar dados em controle próprio.
    funcionalidades:
      - "[[memoria_persistente|Memória persistente]]"
      - "[[busca_semantica|Busca semântica]]"
    herdaFerramentas: false
    maisBarata:
      - "[[f_droid|F-Droid]]"
      - tabela:aegis-authenticator
      - tabela:syncthing
    custoBeneficio:
      - "[[bitwarden|Bitwarden]]"
      - tabela:tailscale
      - tabela:adguard
    qualidadeMaxima:
      - "[[n_1password|1Password]]"
      - tabela:protonvpn
      - tabela:solid-explorer
    justificativaFerramentas: "Muda Recurso principal para exportação para armazenamento próprio: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Dispositivo
        valor: Relógio compatível com exportação
        fonte: editorial
      - chave: Ambiente de execução
        valor: Aplicativo aberto no celular
        fonte: editorial
      - chave: Recurso principal
        valor: Exportação para armazenamento próprio
        fonte: editorial
  - id: wear-oculos-camera
    nome: Óculos com câmera
    descricao: Captura e assistente pela voz.
    funcionalidades:
      - "[[multimodal|Multimodal]]"
      - "[[voz_em_tempo_real|Voz em tempo real]]"
    herdaFerramentas: false
    maisBarata:
      - "[[gemini|Gemini]]"
      - tabela:pocketpal-ai
      - tabela:google-translate
    custoBeneficio:
      - tabela:ray-ban-meta
      - "[[chatgpt|ChatGPT]]"
      - "[[perplexity|Perplexity]]"
    qualidadeMaxima:
      - tabela:apple-vision-pro
      - "[[claude|Claude AI]]"
      - tabela:microsoft-copilot
    justificativaFerramentas: "Muda Recurso principal para captura de fotos e assistente por voz: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Dispositivo
        valor: Óculos com câmera e microfone
        fonte: editorial
      - chave: Ambiente de execução
        valor: Celular pareado
        fonte: editorial
      - chave: Recurso principal
        valor: Captura de fotos e assistente por voz
        fonte: editorial
  - id: wear-realidade-mista
    nome: Realidade mista
    descricao: Telas virtuais e aplicativos espaciais.
    funcionalidades:
      - "[[multimodal|Multimodal]]"
      - "[[geracao_de_texto|Geração de texto]]"
    herdaFerramentas: false
    maisBarata:
      - tabela:ray-ban-meta
      - "[[deepseek|DeepSeek]]"
      - tabela:pocketpal-ai
    custoBeneficio:
      - "[[gemini|Gemini]]"
      - "[[chatgpt|ChatGPT]]"
      - tabela:microsoft-copilot
    qualidadeMaxima:
      - tabela:apple-vision-pro
      - "[[claude|Claude AI]]"
      - "[[grok|Grok]]"
    justificativaFerramentas: "Muda Recurso principal para telas virtuais e aplicativos espaciais: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Dispositivo
        valor: Headset de realidade mista
        fonte: editorial
      - chave: Ambiente de execução
        valor: Sistema espacial do fabricante
        fonte: editorial
      - chave: Recurso principal
        valor: Telas virtuais e aplicativos espaciais
        fonte: editorial
  - id: wear-assistente-voz
    nome: Assistente no pulso
    descricao: Comandos e respostas curtas por voz.
    funcionalidades:
      - "[[voz_em_tempo_real|Voz em tempo real]]"
      - "[[geracao_de_texto|Geração de texto]]"
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
    justificativaFerramentas: "Muda Recurso principal para respostas curtas por voz: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Dispositivo
        valor: Relógio com assistente de voz
        fonte: editorial
      - chave: Ambiente de execução
        valor: Celular pareado
        fonte: editorial
      - chave: Recurso principal
        valor: Respostas curtas por voz
        fonte: editorial
tags:
  - caso-de-uso
  - ferramenta
---
# Wearables e óculos inteligentes
## 📝 Descrição
Escolher relógios, anéis, pulseiras e óculos inteligentes para saúde, rotina e captura.
## ⏰ Quando aplicar
- Acompanhamento de saúde e treino
- Óculos com câmera e assistente
## 🧩 Funcionalidades necessárias
- [[multimodal|Multimodal]] - Entendimento de mais de um tipo de entrada, como texto, imagem, áudio, vídeo e PDF.
- [[geracao_de_texto|Geração de texto]] - Produção de texto livre ou orientado por instruções, de rascunhos a respostas longas.
- [[voz_em_tempo_real|Voz em tempo real]] - Conversa falada com baixa latência, com interrupção natural e entrada de áudio contínua.
- [[memoria_persistente|Memória persistente]] - Retenção de informações entre sessões para manter contexto de longo prazo.
- [[busca_semantica|Busca semântica]] - Recuperação de itens por similaridade de significado, em vez de palavras exatas.
## ✅ Recomendações
- [[wear_os|Wear OS]] - Faixa custo-benefício em [[wearables_oculos|Wearables e óculos]].
- [[bitwarden|Bitwarden]] - Faixa custo-benefício em [[android_utilitarios|Android utilitários]].
- [[chatgpt|ChatGPT]] - Faixa custo-benefício em [[apps_ia_celular|Apps de IA no celular]].
- [[perplexity|Perplexity]] - Faixa custo-benefício em [[apps_ia_celular|Apps de IA no celular]].
- [[apple_watch|Apple Watch]] - Faixa qualidade máxima em [[wearables_oculos|Wearables e óculos]].
## 🧬 Variações
- **Relógio de saúde** (`wear-relogio-saude`): Frequência cardíaca, sono e treino. Funcionalidades: [[multimodal|Multimodal]], [[geracao_de_texto|Geração de texto]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Dispositivo: Relógio ou pulseira de saúde; Ambiente de execução: Aplicativo do fabricante com Health Connect no Android; Dados de saúde: Frequência cardíaca, passos e sono no Health Connect do Android.
- **Dados abertos e locais** (`wear-dados-abertos`): Exportar e guardar dados em controle próprio. Funcionalidades: [[memoria_persistente|Memória persistente]], [[busca_semantica|Busca semântica]]. Mais barata: [[f_droid|F-Droid]], Aegis Authenticator, Syncthing. Custo-benefício: [[bitwarden|Bitwarden]], Tailscale, AdGuard. Qualidade máxima: [[n_1password|1Password]], Proton VPN, Solid Explorer. Por que difere do caso: Muda Recurso principal para exportação para armazenamento próprio: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Dispositivo: Relógio compatível com exportação; Ambiente de execução: Aplicativo aberto no celular; Recurso principal: Exportação para armazenamento próprio.
- **Óculos com câmera** (`wear-oculos-camera`): Captura e assistente pela voz. Funcionalidades: [[multimodal|Multimodal]], [[voz_em_tempo_real|Voz em tempo real]]. Mais barata: [[gemini|Gemini]], PocketPal AI, Google Tradutor. Custo-benefício: Ray-Ban Meta, [[chatgpt|ChatGPT]], [[perplexity|Perplexity]]. Qualidade máxima: Apple Vision Pro, [[claude|Claude AI]], Microsoft Copilot. Por que difere do caso: Muda Recurso principal para captura de fotos e assistente por voz: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Dispositivo: Óculos com câmera e microfone; Ambiente de execução: Celular pareado; Recurso principal: Captura de fotos e assistente por voz.
- **Realidade mista** (`wear-realidade-mista`): Telas virtuais e aplicativos espaciais. Funcionalidades: [[multimodal|Multimodal]], [[geracao_de_texto|Geração de texto]]. Mais barata: Ray-Ban Meta, [[deepseek|DeepSeek]], PocketPal AI. Custo-benefício: [[gemini|Gemini]], [[chatgpt|ChatGPT]], Microsoft Copilot. Qualidade máxima: Apple Vision Pro, [[claude|Claude AI]], [[grok|Grok]]. Por que difere do caso: Muda Recurso principal para telas virtuais e aplicativos espaciais: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Dispositivo: Headset de realidade mista; Ambiente de execução: Sistema espacial do fabricante; Recurso principal: Telas virtuais e aplicativos espaciais.
- **Assistente no pulso** (`wear-assistente-voz`): Comandos e respostas curtas por voz. Funcionalidades: [[voz_em_tempo_real|Voz em tempo real]], [[geracao_de_texto|Geração de texto]]. Mais barata: [[gemini|Gemini]], [[deepseek|DeepSeek]], PocketPal AI. Custo-benefício: [[chatgpt|ChatGPT]], [[perplexity|Perplexity]], Microsoft Copilot. Qualidade máxima: [[claude|Claude AI]], [[grok|Grok]], [[mistral|Mistral]]. Por que difere do caso: Muda Recurso principal para respostas curtas por voz: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Dispositivo: Relógio com assistente de voz; Ambiente de execução: Celular pareado; Recurso principal: Respostas curtas por voz.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[gadgetbridge|Gadgetbridge]], Health Connect, Garmin Connect
- **Custo-benefício:** [[wear_os|Wear OS]], Fitbit, Ray-Ban Meta
- **Qualidade máxima:** [[apple_watch|Apple Watch]], Apple Vision Pro, WHOOP
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** privacidade-de-dados. Dados de saúde são sensíveis e o destino deles define a escolha.
## 🔗 Relacionamentos
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
- **Macro:** [[dispositivos_e_ambientes|Dispositivos e ambientes]]
