---
id: saude_e_rotina_pessoa_fisica
tipo: caso-de-uso
nome: Saúde e rotina (pessoa física)
aliases:
  - saude-e-rotina-pessoa-fisica
descricao: Acompanhar sono, atividade e hábitos com wearables e automações no celular, escolhendo o ecossistema pelo controle dos dados.
funcionalidadesNecessarias: []
categoriasRelacionadas:
  - "[[wearables_oculos|Wearables e óculos]]"
  - "[[ios_dev_produtividade|iOS para dev e produtividade]]"
  - "[[android_dev_produtividade|Android para dev e produtividade]]"
  - "[[apps_ia_celular|Apps de IA no celular]]"
ferramentasRecomendadas:
  - "[[gadgetbridge|Gadgetbridge]]"
  - "[[wear_os|Wear OS]]"
  - "[[apple_watch|Apple Watch]]"
  - "[[atalhos_shortcuts|Atalhos (Shortcuts)]]"
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
nicho: bem-estar e rotina diária
nivel: caso
eixo: cenario
macro: "[[vida_pessoal|Vida pessoal]]"
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
  - id: saude-wearables-dados
    nome: Dados de wearables
    descricao: Sono e atividade lidos de relógios e pulseiras sem nuvem do fabricante.
    funcionalidades:
      - "[[automacao_de_workflow|Automação de workflow]]"
      - "[[integracao_de_apis|Integração de APIs]]"
    herdaFerramentas: true
    parametros:
      - chave: Porte
        valor: Pessoa física
        fonte: editorial
      - chave: Regulação aplicável
        valor: LGPD para dados de saúde
        fonte: não verificado
      - chave: Volume típico
        valor: Dados diários de um relógio
        fonte: editorial
  - id: saude-rotina-atalhos
    nome: Rotina com atalhos e IA
    descricao: Lembretes, atalhos e assistente de IA no celular.
    funcionalidades:
      - "[[automacao_de_workflow|Automação de workflow]]"
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
    justificativaFerramentas: "Muda Volume típico para dezenas de atalhos de rotina: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Pessoa física
        fonte: editorial
      - chave: Regulação aplicável
        valor: Nenhuma específica
        fonte: editorial
      - chave: Volume típico
        valor: Dezenas de atalhos de rotina
        fonte: editorial
tags:
  - caso-de-uso
  - ferramenta
---
# Saúde e rotina (pessoa física)
## 📝 Descrição
Acompanhar sono, atividade e hábitos com wearables e automações no celular, escolhendo o ecossistema pelo controle dos dados.
## ⏰ Quando aplicar
- Monitorar atividade física e sono
- Automatizar lembretes e rotinas no celular
## 🧱 Pilha por categoria
- [[wearables_oculos|Wearables e óculos]] - coleta de sinais do dia a dia
- [[ios_dev_produtividade|iOS para dev e produtividade]] - automações e atalhos no iPhone
- [[android_dev_produtividade|Android para dev e produtividade]] - automações e termux no Android
- [[apps_ia_celular|Apps de IA no celular]] - dúvidas rápidas e organização da rotina
## ✅ Recomendações
- [[gadgetbridge|Gadgetbridge]] - alternativa open source que mantém os dados no aparelho
- [[wear_os|Wear OS]] - relógios com ecossistema Android
- [[apple_watch|Apple Watch]] - integração profunda com o iPhone
- [[atalhos_shortcuts|Atalhos (Shortcuts)]] - automação de rotinas no iOS
## 🧬 Variações
- **Dados de wearables** (`saude-wearables-dados`): Sono e atividade lidos de relógios e pulseiras sem nuvem do fabricante. Funcionalidades: [[automacao_de_workflow|Automação de workflow]], [[integracao_de_apis|Integração de APIs]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Porte: Pessoa física; Regulação aplicável: LGPD para dados de saúde (não verificado); Volume típico: Dados diários de um relógio.
- **Rotina com atalhos e IA** (`saude-rotina-atalhos`): Lembretes, atalhos e assistente de IA no celular. Funcionalidades: [[automacao_de_workflow|Automação de workflow]], [[geracao_de_texto|Geração de texto]]. Mais barata: [[gemini|Gemini]], [[deepseek|DeepSeek]], PocketPal AI. Custo-benefício: [[chatgpt|ChatGPT]], [[perplexity|Perplexity]], Microsoft Copilot. Qualidade máxima: [[claude|Claude AI]], [[grok|Grok]], [[mistral|Mistral]]. Por que difere do caso: Muda Volume típico para dezenas de atalhos de rotina: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Pessoa física; Regulação aplicável: Nenhuma específica; Volume típico: Dezenas de atalhos de rotina.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[gadgetbridge|Gadgetbridge]], Health Connect, Garmin Connect
- **Custo-benefício:** [[wear_os|Wear OS]], Fitbit, Ray-Ban Meta
- **Qualidade máxima:** [[apple_watch|Apple Watch]], Apple Vision Pro, WHOOP
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** privacidade-de-dados. Dados de saúde são pessoais e pedem controle sobre onde ficam armazenados.
## 🔗 Relacionamentos
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
- **Porte:** pessoa física
- **Macro:** [[vida_pessoal|Vida pessoal]]
