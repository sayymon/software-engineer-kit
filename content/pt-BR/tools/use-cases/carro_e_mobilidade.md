---
id: carro_e_mobilidade
tipo: caso-de-uso
nome: Carro e mobilidade
aliases: []
descricao: Usar aplicativos e assistentes no carro para navegação, manutenção e carregamento.
funcionalidadesNecessarias:
  - "[[geracao_de_texto|Geração de texto]]"
  - "[[voz_em_tempo_real|Voz em tempo real]]"
  - "[[busca_na_web|Busca na web]]"
  - "[[raciocinio|Raciocínio]]"
  - "[[contexto_longo|Contexto longo]]"
categoriasRelacionadas:
  - "[[android_utilitarios|Android utilitários]]"
  - "[[carro|Carro conectado]]"
  - "[[apps_ia_celular|Apps de IA no celular]]"
ferramentasRecomendadas:
  - "[[bitwarden|Bitwarden]]"
  - "[[torque_pro|Torque Pro]]"
  - "[[chatgpt|ChatGPT]]"
  - "[[perplexity|Perplexity]]"
  - "[[n_1password|1Password]]"
modelosRecomendados: []
criteriosDesempate:
  - custo
  - privacidade-de-dados
  - lock-in
criterioPadrao: privacidade-de-dados
porte:
  - pessoa-fisica
  - pequena
segmentos:
  - geral
nicho: ""
nivel: caso
eixo: tarefa
macro: "[[dispositivos_e_ambientes|Dispositivos e ambientes]]"
faixasPadrao:
  maisBarata:
    - "[[android_auto|Android Auto]]"
    - tabela:apple-carplay
    - tabela:waze
  custoBeneficio:
    - "[[torque_pro|Torque Pro]]"
    - tabela:abetterrouteplanner
    - tabela:plugshare
  qualidadeMaxima:
    - "[[android_automotive_os|Android Automotive OS]]"
    - tabela:tesla-app
    - tabela:carly
variacoes:
  - id: carro-projecao-celular
    nome: Projeção do celular
    descricao: Mapas, música e mensagens na tela do carro.
    funcionalidades:
      - "[[voz_em_tempo_real|Voz em tempo real]]"
      - "[[geracao_de_texto|Geração de texto]]"
    herdaFerramentas: false
    maisBarata:
      - "[[android_auto|Android Auto]]"
      - tabela:apple-carplay
      - "[[gemini|Gemini]]"
    custoBeneficio:
      - tabela:waze
      - "[[chatgpt|ChatGPT]]"
      - tabela:microsoft-copilot
    qualidadeMaxima:
      - "[[android_automotive_os|Android Automotive OS]]"
      - "[[claude|Claude AI]]"
      - "[[perplexity|Perplexity]]"
    justificativaFerramentas: "Muda Escala típica para uma pessoa por veículo: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Plataforma do carro
        valor: Android Auto no celular com Android 9 (API 28) ou superior
        fonte: https://developer.android.com/training/cars
      - chave: Ambiente de execução
        valor: Celular conectado ao carro
        fonte: editorial
      - chave: Escala típica
        valor: Uma pessoa por veículo
        fonte: editorial
    verificadoEm: 2026-11-22
  - id: carro-navegacao
    nome: Navegação e rotas
    descricao: Trânsito, paradas e alertas.
    funcionalidades:
      - "[[busca_na_web|Busca na web]]"
      - "[[geracao_de_texto|Geração de texto]]"
    herdaFerramentas: false
    maisBarata:
      - tabela:waze
      - "[[android_auto|Android Auto]]"
      - tabela:apple-carplay
    custoBeneficio:
      - tabela:abetterrouteplanner
      - tabela:plugshare
      - "[[gemini|Gemini]]"
    qualidadeMaxima:
      - "[[android_automotive_os|Android Automotive OS]]"
      - tabela:tesla-app
      - "[[chatgpt|ChatGPT]]"
    justificativaFerramentas: "Muda Escala típica para trajetos diários e viagens: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Plataforma do carro
        valor: Android Auto no celular ou Android Automotive OS embarcado no carro
        fonte: https://developer.android.com/training/cars
      - chave: Ambiente de execução
        valor: Celular ou sistema do carro
        fonte: editorial
      - chave: Escala típica
        valor: Trajetos diários e viagens
        fonte: editorial
    verificadoEm: 2026-11-22
  - id: carro-diagnostico
    nome: Diagnóstico do veículo
    descricao: Leitura de falhas e dados do motor.
    funcionalidades:
      - "[[raciocinio|Raciocínio]]"
      - "[[contexto_longo|Contexto longo]]"
    herdaFerramentas: false
    maisBarata:
      - "[[torque_pro|Torque Pro]]"
      - "[[f_droid|F-Droid]]"
      - tabela:syncthing
    custoBeneficio:
      - tabela:carly
      - tabela:tesla-app
      - "[[gemini|Gemini]]"
    qualidadeMaxima:
      - "[[android_automotive_os|Android Automotive OS]]"
      - "[[chatgpt|ChatGPT]]"
      - "[[claude|Claude AI]]"
    justificativaFerramentas: "Muda Escala típica para um veículo: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Plataforma do carro
        valor: Celular com adaptador OBD
        fonte: editorial
      - chave: Ambiente de execução
        valor: Aplicativo no celular
        fonte: editorial
      - chave: Escala típica
        valor: Um veículo
        fonte: editorial
  - id: carro-eletrico
    nome: Carro elétrico e carregamento
    descricao: Planejar viagem com pontos de recarga.
    funcionalidades:
      - "[[raciocinio|Raciocínio]]"
      - "[[busca_na_web|Busca na web]]"
    herdaFerramentas: true
    parametros:
      - chave: Plataforma do carro
        valor: Aplicativo de rota e mapa de carregadores
        fonte: editorial
      - chave: Ambiente de execução
        valor: Celular e tela do carro
        fonte: editorial
      - chave: Escala típica
        valor: Viagens longas com paradas de recarga
        fonte: editorial
  - id: carro-assistente-voz
    nome: Assistente de voz
    descricao: Comandos falados e resumo de mensagens.
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
    justificativaFerramentas: "Muda Escala típica para mensagens e rotinas durante a direção: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Plataforma do carro
        valor: Celular ou carro com microfone
        fonte: editorial
      - chave: Ambiente de execução
        valor: Assistente de voz no carro
        fonte: editorial
      - chave: Escala típica
        valor: Mensagens e rotinas durante a direção
        fonte: editorial
tags:
  - caso-de-uso
  - ferramenta
---
# Carro e mobilidade
## 📝 Descrição
Usar aplicativos e assistentes no carro para navegação, manutenção e carregamento.
## ⏰ Quando aplicar
- Carro com Android Auto ou CarPlay
- Carro elétrico ou conectado
## 🧩 Funcionalidades necessárias
- [[geracao_de_texto|Geração de texto]] - Produção de texto livre ou orientado por instruções, de rascunhos a respostas longas.
- [[voz_em_tempo_real|Voz em tempo real]] - Conversa falada com baixa latência, com interrupção natural e entrada de áudio contínua.
- [[busca_na_web|Busca na web]] - Consulta à web em tempo real, com resposta fundamentada em fontes.
- [[raciocinio|Raciocínio]] - Resolução de problemas em várias etapas, com planejamento, lógica e matemática.
- [[contexto_longo|Contexto longo]] - Janela de contexto grande o bastante para ler bases de código, contratos e longos históricos de uma vez.
## ✅ Recomendações
- [[bitwarden|Bitwarden]] - Faixa custo-benefício em [[android_utilitarios|Android utilitários]].
- [[torque_pro|Torque Pro]] - Faixa custo-benefício em [[carro|Carro conectado]].
- [[chatgpt|ChatGPT]] - Faixa custo-benefício em [[apps_ia_celular|Apps de IA no celular]].
- [[perplexity|Perplexity]] - Faixa custo-benefício em [[apps_ia_celular|Apps de IA no celular]].
- [[n_1password|1Password]] - Faixa qualidade máxima em [[android_utilitarios|Android utilitários]].
## 🧬 Variações
- **Projeção do celular** (`carro-projecao-celular`): Mapas, música e mensagens na tela do carro. Funcionalidades: [[voz_em_tempo_real|Voz em tempo real]], [[geracao_de_texto|Geração de texto]]. Mais barata: [[android_auto|Android Auto]], Apple CarPlay, [[gemini|Gemini]]. Custo-benefício: Waze, [[chatgpt|ChatGPT]], Microsoft Copilot. Qualidade máxima: [[android_automotive_os|Android Automotive OS]], [[claude|Claude AI]], [[perplexity|Perplexity]]. Por que difere do caso: Muda Escala típica para uma pessoa por veículo: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Plataforma do carro: Android Auto no celular com Android 9 (API 28) ou superior; Ambiente de execução: Celular conectado ao carro; Escala típica: Uma pessoa por veículo.
- **Navegação e rotas** (`carro-navegacao`): Trânsito, paradas e alertas. Funcionalidades: [[busca_na_web|Busca na web]], [[geracao_de_texto|Geração de texto]]. Mais barata: Waze, [[android_auto|Android Auto]], Apple CarPlay. Custo-benefício: A Better Routeplanner, PlugShare, [[gemini|Gemini]]. Qualidade máxima: [[android_automotive_os|Android Automotive OS]], Tesla App, [[chatgpt|ChatGPT]]. Por que difere do caso: Muda Escala típica para trajetos diários e viagens: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Plataforma do carro: Android Auto no celular ou Android Automotive OS embarcado no carro; Ambiente de execução: Celular ou sistema do carro; Escala típica: Trajetos diários e viagens.
- **Diagnóstico do veículo** (`carro-diagnostico`): Leitura de falhas e dados do motor. Funcionalidades: [[raciocinio|Raciocínio]], [[contexto_longo|Contexto longo]]. Mais barata: [[torque_pro|Torque Pro]], [[f_droid|F-Droid]], Syncthing. Custo-benefício: Carly, Tesla App, [[gemini|Gemini]]. Qualidade máxima: [[android_automotive_os|Android Automotive OS]], [[chatgpt|ChatGPT]], [[claude|Claude AI]]. Por que difere do caso: Muda Escala típica para um veículo: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Plataforma do carro: Celular com adaptador OBD; Ambiente de execução: Aplicativo no celular; Escala típica: Um veículo.
- **Carro elétrico e carregamento** (`carro-eletrico`): Planejar viagem com pontos de recarga. Funcionalidades: [[raciocinio|Raciocínio]], [[busca_na_web|Busca na web]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Plataforma do carro: Aplicativo de rota e mapa de carregadores; Ambiente de execução: Celular e tela do carro; Escala típica: Viagens longas com paradas de recarga.
- **Assistente de voz** (`carro-assistente-voz`): Comandos falados e resumo de mensagens. Funcionalidades: [[voz_em_tempo_real|Voz em tempo real]], [[geracao_de_texto|Geração de texto]]. Mais barata: [[gemini|Gemini]], [[deepseek|DeepSeek]], PocketPal AI. Custo-benefício: [[chatgpt|ChatGPT]], [[perplexity|Perplexity]], Microsoft Copilot. Qualidade máxima: [[claude|Claude AI]], [[grok|Grok]], [[mistral|Mistral]]. Por que difere do caso: Muda Escala típica para mensagens e rotinas durante a direção: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Plataforma do carro: Celular ou carro com microfone; Ambiente de execução: Assistente de voz no carro; Escala típica: Mensagens e rotinas durante a direção.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[android_auto|Android Auto]], Apple CarPlay, Waze
- **Custo-benefício:** [[torque_pro|Torque Pro]], A Better Routeplanner, PlugShare
- **Qualidade máxima:** [[android_automotive_os|Android Automotive OS]], Tesla App, Carly
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** privacidade-de-dados. Localização e hábitos de direção são dados sensíveis e a política do aplicativo decide.
## 🔗 Relacionamentos
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
- **Macro:** [[dispositivos_e_ambientes|Dispositivos e ambientes]]
