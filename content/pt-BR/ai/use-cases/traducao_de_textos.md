---
id: traducao_de_textos
tipo: caso-de-uso
nome: Tradução de textos
aliases:
  - traducao
descricao: Traduzir textos preservando sentido, tom e termos técnicos.
funcionalidadesNecessarias:
  - "[[geracao_de_texto|Geração de texto]]"
  - "[[saida_estruturada|Saída estruturada]]"
categoriasRelacionadas:
  - "[[assistente_chat|Assistente de chat]]"
  - "[[modelo_fundacional|Modelo fundacional]]"
ferramentasRecomendadas:
  - "[[chatgpt|ChatGPT]]"
  - "[[gemini|Gemini]]"
  - "[[deepseek|DeepSeek]]"
modelosRecomendados:
  - "[[gemini_3_5_flash_lite|Gemini 3.5 Flash-Lite]]"
  - "[[gpt_5_4_mini|GPT-5.4 mini]]"
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
macro: "[[escrita_e_documentos_macro|Escrita e documentos (macro)]]"
faixasPadrao:
  maisBarata:
    - "[[libretranslate|LibreTranslate]]"
    - tabela:google-translate
    - tabela:argos-translate
  custoBeneficio:
    - "[[deepl|DeepL]]"
    - tabela:duolingo
    - tabela:speak
  qualidadeMaxima:
    - "[[chatgpt|ChatGPT]]"
    - "[[claude|Claude AI]]"
    - tabela:lokalise
variacoes:
  - id: traducao-documentos
    nome: Tradução de documentos
    descricao: Manuais e contratos traduzidos com glossário e formatação preservada.
    funcionalidades:
      - "[[geracao_de_texto|Geração de texto]]"
      - "[[saida_estruturada|Saída estruturada]]"
    herdaFerramentas: true
    parametros:
      - chave: Porte
        valor: Pequena e média empresa
        fonte: editorial
      - chave: Volume típico
        valor: Dezenas de documentos por mês
        fonte: editorial
      - chave: Tipo de documento
        valor: Manuais e contratos
        fonte: editorial
  - id: traducao-localizacao-software
    nome: Localização de software
    descricao: Arquivos de strings traduzidos com placeholders preservados e saída estruturada.
    funcionalidades:
      - "[[geracao_de_texto|Geração de texto]]"
      - "[[saida_estruturada|Saída estruturada]]"
    herdaFerramentas: false
    maisBarata:
      - "[[gemma_4|Gemma 4]]"
      - "[[claude_haiku_5_5|Claude Haiku 5.5]]"
      - "[[qwen3_8_flash|Qwen3.8-Flash]]"
    custoBeneficio:
      - "[[gpt_6_1_terra|GPT-6.1 Terra]]"
      - "[[gemini_3_8_flash|Gemini 3.8 Flash]]"
      - "[[claude_sonnet_5_5|Claude Sonnet 5.5]]"
    qualidadeMaxima:
      - "[[claude_opus_5_5|Claude Opus 5.5]]"
      - "[[gpt_6_2_astra|GPT-6.2 Astra]]"
      - "[[gemini_4_neon|Gemini 4 Neon]]"
    justificativaFerramentas: "Muda Tipo de documento para arquivos de strings com placeholders: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Time de produto
        fonte: editorial
      - chave: Volume típico
        valor: Milhares de strings por versão
        fonte: editorial
      - chave: Tipo de documento
        valor: Arquivos de strings com placeholders
        fonte: editorial
  - id: traducao-conversa-tempo-real
    nome: Tradução de conversa em tempo real
    descricao: Fala traduzida durante reunião, viagem ou atendimento.
    funcionalidades:
      - "[[voz_em_tempo_real|Voz em tempo real]]"
      - "[[geracao_de_texto|Geração de texto]]"
      - "[[transcricao_de_audio|Transcrição de áudio]]"
    herdaFerramentas: false
    maisBarata:
      - tabela:argos-translate
      - "[[libretranslate|LibreTranslate]]"
      - tabela:google-translate
    custoBeneficio:
      - "[[deepl|DeepL]]"
      - tabela:speak
      - "[[chatgpt|ChatGPT]]"
    qualidadeMaxima:
      - "[[gpt_realtime_2_1|GPT-Realtime-2.1]]"
      - "[[claude|Claude AI]]"
      - "[[gemini|Gemini]]"
    justificativaFerramentas: "Muda Tipo de documento para fala em tempo real: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Pessoa em viagem ou time de atendimento
        fonte: editorial
      - chave: Volume típico
        valor: Conversas diárias
        fonte: editorial
      - chave: Tipo de documento
        valor: Fala em tempo real
        fonte: editorial
tags:
  - caso-de-uso
  - ia
---
# Tradução de textos
## 📝 Descrição
Traduzir textos preservando sentido, tom e termos técnicos.
## ⏰ Quando aplicar
- Documentação e comunicação multilíngue
- Localização de produto
## 🧩 Funcionalidades necessárias
- [[geracao_de_texto|Geração de texto]] - Produção de texto livre ou orientado por instruções, de rascunhos a respostas longas.
- [[saida_estruturada|Saída estruturada]] - Respostas que seguem um esquema, como JSON validado, para uso direto por programas.
## ✅ Recomendações
- [[chatgpt|ChatGPT]] - Boa cobertura de idiomas e ajuste de tom
- [[gemini|Gemini]] - Ampla cobertura de idiomas
- [[deepseek|DeepSeek]] - Custo muito baixo para grandes volumes
- [[gemini_3_5_flash_lite|Gemini 3.5 Flash-Lite]] - Tradução em volume com latência baixa
- [[gpt_5_4_mini|GPT-5.4 mini]] - Qualidade sólida com custo reduzido
## 🧬 Variações
- **Tradução de documentos** (`traducao-documentos`): Manuais e contratos traduzidos com glossário e formatação preservada. Funcionalidades: [[geracao_de_texto|Geração de texto]], [[saida_estruturada|Saída estruturada]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Porte: Pequena e média empresa; Volume típico: Dezenas de documentos por mês; Tipo de documento: Manuais e contratos.
- **Localização de software** (`traducao-localizacao-software`): Arquivos de strings traduzidos com placeholders preservados e saída estruturada. Funcionalidades: [[geracao_de_texto|Geração de texto]], [[saida_estruturada|Saída estruturada]]. Mais barata: [[gemma_4|Gemma 4]], [[claude_haiku_5_5|Claude Haiku 5.5]], [[qwen3_8_flash|Qwen3.8-Flash]]. Custo-benefício: [[gpt_6_1_terra|GPT-6.1 Terra]], [[gemini_3_8_flash|Gemini 3.8 Flash]], [[claude_sonnet_5_5|Claude Sonnet 5.5]]. Qualidade máxima: [[claude_opus_5_5|Claude Opus 5.5]], [[gpt_6_2_astra|GPT-6.2 Astra]], [[gemini_4_neon|Gemini 4 Neon]]. Por que difere do caso: Muda Tipo de documento para arquivos de strings com placeholders: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Time de produto; Volume típico: Milhares de strings por versão; Tipo de documento: Arquivos de strings com placeholders.
- **Tradução de conversa em tempo real** (`traducao-conversa-tempo-real`): Fala traduzida durante reunião, viagem ou atendimento. Funcionalidades: [[voz_em_tempo_real|Voz em tempo real]], [[geracao_de_texto|Geração de texto]], [[transcricao_de_audio|Transcrição de áudio]]. Mais barata: Argos Translate, [[libretranslate|LibreTranslate]], Google Tradutor. Custo-benefício: [[deepl|DeepL]], Speak, [[chatgpt|ChatGPT]]. Qualidade máxima: [[gpt_realtime_2_1|GPT-Realtime-2.1]], [[claude|Claude AI]], [[gemini|Gemini]]. Por que difere do caso: Muda Tipo de documento para fala em tempo real: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Pessoa em viagem ou time de atendimento; Volume típico: Conversas diárias; Tipo de documento: Fala em tempo real.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[libretranslate|LibreTranslate]], Google Tradutor, Argos Translate
- **Custo-benefício:** [[deepl|DeepL]], Duolingo, Speak
- **Qualidade máxima:** [[chatgpt|ChatGPT]], [[claude|Claude AI]], Lokalise
## ⚖️ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** custo. A tradução em volume é uma tarefa bem definida, e os modelos pequenos entregam qualidade suficiente por menos.
## 🔗 Relacionamentos
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Casos de Uso de IA
- **Macro:** [[escrita_e_documentos_macro|Escrita e documentos (macro)]]
