---
id: automacao_da_casa_inteligente
tipo: caso-de-uso
nome: Automação da casa inteligente
aliases: []
descricao: Automatizar luz, clima, câmeras e rotinas da casa com controle local ou em nuvem.
funcionalidadesNecessarias:
  - "[[automacao_de_workflow|Automação de workflow]]"
  - "[[execucao_local|Execução local]]"
  - "[[voz_em_tempo_real|Voz em tempo real]]"
  - "[[integracao_de_apis|Integração de APIs]]"
  - "[[quantizacao_de_modelos|Quantização de modelos]]"
categoriasRelacionadas:
  - "[[casa_inteligente|Casa inteligente]]"
  - "[[automacao_nocode|Automação e no-code]]"
  - "[[aplicativos_self_hosted|Aplicativos self-hosted]]"
  - "[[linux_utilitarios|Linux utilitários]]"
ferramentasRecomendadas:
  - "[[google_home|Google Home]]"
  - "[[n8n|n8n]]"
  - "[[immich|Immich]]"
  - "[[bitwarden|Bitwarden]]"
  - "[[apple_casa_homekit|Apple Casa (HomeKit)]]"
modelosRecomendados: []
criteriosDesempate:
  - custo
  - privacidade-de-dados
  - lock-in
criterioPadrao: privacidade-de-dados
porte:
  - pessoa-fisica
segmentos:
  - geral
nicho: ""
nivel: caso
eixo: tarefa
macro: "[[dispositivos_e_ambientes|Dispositivos e ambientes]]"
faixasPadrao:
  maisBarata:
    - "[[home_assistant|Home Assistant]]"
    - tabela:openhab
    - tabela:homebridge
  custoBeneficio:
    - "[[google_home|Google Home]]"
    - tabela:amazon-alexa
    - tabela:tuya-smart
  qualidadeMaxima:
    - "[[apple_casa_homekit|Apple Casa (HomeKit)]]"
    - tabela:smartthings
    - tabela:control4
variacoes:
  - id: casa-controle-local
    nome: Controle local
    descricao: Automações sem depender da nuvem.
    funcionalidades:
      - "[[automacao_de_workflow|Automação de workflow]]"
      - "[[execucao_local|Execução local]]"
    herdaFerramentas: true
    parametros:
      - chave: Ambiente de execução
        valor: Hub local na rede doméstica
        fonte: editorial
      - chave: Escala típica
        valor: Uma casa com dezenas de dispositivos
        fonte: editorial
      - chave: Protocolo ou integração
        valor: Zigbee, Z-Wave e Wi-Fi local
        fonte: editorial
  - id: casa-assistente-voz
    nome: Assistente de voz
    descricao: Comandos falados para luz, clima e rotinas.
    funcionalidades:
      - "[[voz_em_tempo_real|Voz em tempo real]]"
      - "[[automacao_de_workflow|Automação de workflow]]"
    herdaFerramentas: false
    maisBarata:
      - "[[home_assistant|Home Assistant]]"
      - tabela:homebridge
      - "[[gemini|Gemini]]"
    custoBeneficio:
      - "[[google_home|Google Home]]"
      - tabela:amazon-alexa
      - "[[chatgpt|ChatGPT]]"
    qualidadeMaxima:
      - "[[apple_casa_homekit|Apple Casa (HomeKit)]]"
      - tabela:smartthings
      - "[[claude|Claude AI]]"
    justificativaFerramentas: "Muda Protocolo ou integração para comandos de voz em português: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Alto-falante ou celular com assistente
        fonte: editorial
      - chave: Escala típica
        valor: Uma casa
        fonte: editorial
      - chave: Protocolo ou integração
        valor: Comandos de voz em português
        fonte: editorial
  - id: casa-automacoes-fluxo
    nome: Automações avançadas
    descricao: Regras por presença, horário e sensor.
    funcionalidades:
      - "[[automacao_de_workflow|Automação de workflow]]"
      - "[[integracao_de_apis|Integração de APIs]]"
    herdaFerramentas: false
    maisBarata:
      - tabela:activepieces
      - tabela:node-red
      - tabela:windmill
    custoBeneficio:
      - "[[n8n|n8n]]"
      - tabela:make
      - tabela:pipedream
    qualidadeMaxima:
      - tabela:zapier
      - tabela:power-automate
      - tabela:workato
    justificativaFerramentas: "Muda Protocolo ou integração para gatilhos de presença, horário e sensor: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Plataforma de fluxos local ou na nuvem
        fonte: editorial
      - chave: Escala típica
        valor: Dezenas de regras
        fonte: editorial
      - chave: Protocolo ou integração
        valor: Gatilhos de presença, horário e sensor
        fonte: editorial
  - id: casa-servidor-proprio
    nome: Servidor doméstico
    descricao: Mídia, arquivos e câmeras em equipamento próprio.
    funcionalidades:
      - "[[execucao_local|Execução local]]"
      - "[[quantizacao_de_modelos|Quantização de modelos]]"
    herdaFerramentas: false
    maisBarata:
      - "[[uptime_kuma|Uptime Kuma]]"
      - tabela:vaultwarden
      - tabela:portainer
    custoBeneficio:
      - "[[immich|Immich]]"
      - tabela:nextcloud
      - tabela:paperless-ngx
    qualidadeMaxima:
      - "[[home_assistant|Home Assistant]]"
      - tabela:tailscale
      - "[[docker_desktop|Docker Desktop]]"
    justificativaFerramentas: "Muda Protocolo ou integração para rede local com acesso remoto: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Servidor doméstico com contêineres
        fonte: editorial
      - chave: Escala típica
        valor: Mídia, arquivos e câmeras da família
        fonte: editorial
      - chave: Protocolo ou integração
        valor: Rede local com acesso remoto
        fonte: editorial
  - id: casa-seguranca-monitoramento
    nome: Segurança e monitoramento
    descricao: Câmeras, alertas e acesso remoto seguro.
    funcionalidades:
      - "[[tracing|Tracing]]"
      - "[[avaliacao_de_qualidade|Avaliação de qualidade]]"
    herdaFerramentas: false
    maisBarata:
      - "[[uptime_kuma|Uptime Kuma]]"
      - tabela:tailscale
      - tabela:vaultwarden
    custoBeneficio:
      - "[[home_assistant|Home Assistant]]"
      - "[[bitwarden|Bitwarden]]"
      - tabela:adguard
    qualidadeMaxima:
      - "[[apple_casa_homekit|Apple Casa (HomeKit)]]"
      - "[[n_1password|1Password]]"
      - tabela:protonvpn
    justificativaFerramentas: "Muda Protocolo ou integração para acesso remoto autenticado: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Rede doméstica com VPN
        fonte: editorial
      - chave: Escala típica
        valor: Câmeras e alertas de uma casa
        fonte: editorial
      - chave: Protocolo ou integração
        valor: Acesso remoto autenticado
        fonte: editorial
tags:
  - caso-de-uso
  - ferramenta
---
# Automação da casa inteligente
## 📝 Descrição
Automatizar luz, clima, câmeras e rotinas da casa com controle local ou em nuvem.
## ⏰ Quando aplicar
- Casa com ecossistema único
- Casa com controle local e privacidade
## 🧩 Funcionalidades necessárias
- [[automacao_de_workflow|Automação de workflow]] - Execução automática de processos entre sistemas, com gatilhos e ações.
- [[execucao_local|Execução local]] - Execução de modelos na própria máquina ou servidor, sem enviar dados a terceiros.
- [[voz_em_tempo_real|Voz em tempo real]] - Conversa falada com baixa latência, com interrupção natural e entrada de áudio contínua.
- [[integracao_de_apis|Integração de APIs]] - Conexão de modelos e agentes a APIs e serviços de terceiros.
- [[quantizacao_de_modelos|Quantização de modelos]] - Redução da precisão dos pesos para rodar modelos maiores em hardware menor.
## ✅ Recomendações
- [[google_home|Google Home]] - Faixa custo-benefício em [[casa_inteligente|Casa inteligente]].
- [[n8n|n8n]] - Faixa custo-benefício em [[automacao_nocode|Automação e no-code]].
- [[immich|Immich]] - Faixa custo-benefício em [[aplicativos_self_hosted|Aplicativos self-hosted]].
- [[bitwarden|Bitwarden]] - Faixa custo-benefício em [[linux_utilitarios|Linux utilitários]].
- [[apple_casa_homekit|Apple Casa (HomeKit)]] - Faixa qualidade máxima em [[casa_inteligente|Casa inteligente]].
## 🧬 Variações
- **Controle local** (`casa-controle-local`): Automações sem depender da nuvem. Funcionalidades: [[automacao_de_workflow|Automação de workflow]], [[execucao_local|Execução local]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Ambiente de execução: Hub local na rede doméstica; Escala típica: Uma casa com dezenas de dispositivos; Protocolo ou integração: Zigbee, Z-Wave e Wi-Fi local.
- **Assistente de voz** (`casa-assistente-voz`): Comandos falados para luz, clima e rotinas. Funcionalidades: [[voz_em_tempo_real|Voz em tempo real]], [[automacao_de_workflow|Automação de workflow]]. Mais barata: [[home_assistant|Home Assistant]], Homebridge, [[gemini|Gemini]]. Custo-benefício: [[google_home|Google Home]], Amazon Alexa, [[chatgpt|ChatGPT]]. Qualidade máxima: [[apple_casa_homekit|Apple Casa (HomeKit)]], SmartThings, [[claude|Claude AI]]. Por que difere do caso: Muda Protocolo ou integração para comandos de voz em português: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Alto-falante ou celular com assistente; Escala típica: Uma casa; Protocolo ou integração: Comandos de voz em português.
- **Automações avançadas** (`casa-automacoes-fluxo`): Regras por presença, horário e sensor. Funcionalidades: [[automacao_de_workflow|Automação de workflow]], [[integracao_de_apis|Integração de APIs]]. Mais barata: Activepieces, Node-RED, Windmill. Custo-benefício: [[n8n|n8n]], Make, Pipedream. Qualidade máxima: Zapier, Power Automate, Workato. Por que difere do caso: Muda Protocolo ou integração para gatilhos de presença, horário e sensor: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Plataforma de fluxos local ou na nuvem; Escala típica: Dezenas de regras; Protocolo ou integração: Gatilhos de presença, horário e sensor.
- **Servidor doméstico** (`casa-servidor-proprio`): Mídia, arquivos e câmeras em equipamento próprio. Funcionalidades: [[execucao_local|Execução local]], [[quantizacao_de_modelos|Quantização de modelos]]. Mais barata: [[uptime_kuma|Uptime Kuma]], Vaultwarden, Portainer. Custo-benefício: [[immich|Immich]], Nextcloud, Paperless-ngx. Qualidade máxima: [[home_assistant|Home Assistant]], Tailscale, [[docker_desktop|Docker Desktop]]. Por que difere do caso: Muda Protocolo ou integração para rede local com acesso remoto: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Servidor doméstico com contêineres; Escala típica: Mídia, arquivos e câmeras da família; Protocolo ou integração: Rede local com acesso remoto.
- **Segurança e monitoramento** (`casa-seguranca-monitoramento`): Câmeras, alertas e acesso remoto seguro. Funcionalidades: [[tracing|Tracing]], [[avaliacao_de_qualidade|Avaliação de qualidade]]. Mais barata: [[uptime_kuma|Uptime Kuma]], Tailscale, Vaultwarden. Custo-benefício: [[home_assistant|Home Assistant]], [[bitwarden|Bitwarden]], AdGuard. Qualidade máxima: [[apple_casa_homekit|Apple Casa (HomeKit)]], [[n_1password|1Password]], Proton VPN. Por que difere do caso: Muda Protocolo ou integração para acesso remoto autenticado: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Rede doméstica com VPN; Escala típica: Câmeras e alertas de uma casa; Protocolo ou integração: Acesso remoto autenticado.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[home_assistant|Home Assistant]], openHAB, Homebridge
- **Custo-benefício:** [[google_home|Google Home]], Amazon Alexa, Tuya Smart
- **Qualidade máxima:** [[apple_casa_homekit|Apple Casa (HomeKit)]], SmartThings, Control4
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** privacidade-de-dados. Câmeras e sensores geram dados da família e o processamento local reduz o risco.
## 🔗 Relacionamentos
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
- **Macro:** [[dispositivos_e_ambientes|Dispositivos e ambientes]]
