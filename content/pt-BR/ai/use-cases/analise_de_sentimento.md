---
id: analise_de_sentimento
tipo: caso-de-uso
nome: Análise de sentimento
aliases:
  - analise-sentimento
descricao: Classificar opiniões, avaliações e mensagens por sentimento e tema.
funcionalidadesNecessarias:
  - "[[saida_estruturada|Saída estruturada]]"
  - "[[geracao_de_texto|Geração de texto]]"
categoriasRelacionadas:
  - "[[modelo_fundacional|Modelo fundacional]]"
  - "[[inferencia_local|Inferência local]]"
ferramentasRecomendadas:
  - "[[ollama|Ollama]]"
  - "[[hugging_face|Hugging Face]]"
modelosRecomendados:
  - "[[gemini_3_5_flash_lite|Gemini 3.5 Flash-Lite]]"
  - "[[claude_haiku_5_5|Claude Haiku 5.5]]"
  - "[[qwen3_8_flash|Qwen3.8-Flash]]"
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
macro: "[[dados_e_analytics|Dados e analytics]]"
faixasPadrao:
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
variacoes:
  - id: sentimento-avaliacoes-clientes
    nome: Avaliações de clientes
    descricao: Polaridade e tema de reviews e comentários.
    funcionalidades:
      - "[[saida_estruturada|Saída estruturada]]"
      - "[[geracao_de_texto|Geração de texto]]"
    herdaFerramentas: true
    parametros:
      - chave: Volume típico
        valor: Milhares de avaliações por semana
        fonte: editorial
      - chave: Canal de origem
        valor: Lojas de aplicativos e e-commerce
        fonte: editorial
      - chave: Idioma predominante
        valor: Português com gírias e abreviações
        fonte: editorial
  - id: sentimento-redes-sociais
    nome: Redes sociais e menções
    descricao: Monitoramento de marca e crise em tempo quase real.
    funcionalidades:
      - "[[saida_estruturada|Saída estruturada]]"
      - "[[geracao_de_texto|Geração de texto]]"
    herdaFerramentas: false
    maisBarata:
      - "[[gemma_4|Gemma 4]]"
      - "[[mistral_small_4|Mistral Small 4]]"
      - "[[qwen3_8_flash|Qwen3.8-Flash]]"
    custoBeneficio:
      - "[[grok|Grok]]"
      - "[[gemini_3_8_flash|Gemini 3.8 Flash]]"
      - "[[claude_haiku_5_5|Claude Haiku 5.5]]"
    qualidadeMaxima:
      - "[[grok_4_7|Grok 4.7]]"
      - "[[claude_sonnet_5_5|Claude Sonnet 5.5]]"
      - "[[gpt_6_2_astra|GPT-6.2 Astra]]"
    justificativaFerramentas: "Muda Idioma predominante para vários idiomas com emojis e ironia: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Volume típico
        valor: Milhões de menções por dia
        fonte: editorial
      - chave: Canal de origem
        valor: Redes sociais e fóruns públicos
        fonte: editorial
      - chave: Idioma predominante
        valor: Vários idiomas com emojis e ironia
        fonte: editorial
  - id: sentimento-atendimento
    nome: Atendimento e pesquisa NPS
    descricao: Tom das conversas de suporte e respostas abertas de NPS.
    funcionalidades:
      - "[[saida_estruturada|Saída estruturada]]"
      - "[[geracao_de_texto|Geração de texto]]"
    herdaFerramentas: false
    maisBarata:
      - "[[gemma_4|Gemma 4]]"
      - "[[qwen3_8_flash|Qwen3.8-Flash]]"
      - "[[mistral_small_4|Mistral Small 4]]"
    custoBeneficio:
      - "[[gemini_3_8_flash|Gemini 3.8 Flash]]"
      - "[[claude_haiku_5_5|Claude Haiku 5.5]]"
      - "[[gpt_6_1_terra|GPT-6.1 Terra]]"
    qualidadeMaxima:
      - "[[claude_sonnet_5_5|Claude Sonnet 5.5]]"
      - "[[gpt_6_2_astra|GPT-6.2 Astra]]"
      - "[[claude_opus_5_5|Claude Opus 5.5]]"
    justificativaFerramentas: "Muda Idioma predominante para português formal com respostas abertas: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Volume típico
        valor: Centenas de conversas por dia
        fonte: editorial
      - chave: Canal de origem
        valor: Chat de suporte e pesquisa NPS
        fonte: editorial
      - chave: Idioma predominante
        valor: Português formal com respostas abertas
        fonte: editorial
tags:
  - caso-de-uso
  - ia
---
# Análise de sentimento
## 📝 Descrição
Classificar opiniões, avaliações e mensagens por sentimento e tema.
## ⏰ Quando aplicar
- Avaliações de clientes e suporte
- Monitoramento de menções
## 🧩 Funcionalidades necessárias
- [[saida_estruturada|Saída estruturada]] - Respostas que seguem um esquema, como JSON validado, para uso direto por programas.
- [[geracao_de_texto|Geração de texto]] - Produção de texto livre ou orientado por instruções, de rascunhos a respostas longas.
## ✅ Recomendações
- [[ollama|Ollama]] - Execução local de modelos para dados de clientes
- [[hugging_face|Hugging Face]] - Modelos de classificação prontos para uso
- [[gemini_3_5_flash_lite|Gemini 3.5 Flash-Lite]] - Classificação rápida e barata via API
- [[claude_haiku_5_5|Claude Haiku 5.5]] - Classificação em lote com custo baixo
- [[qwen3_8_flash|Qwen3.8-Flash]] - Modelo rápido e econômico para rotular texto
## 🧬 Variações
- **Avaliações de clientes** (`sentimento-avaliacoes-clientes`): Polaridade e tema de reviews e comentários. Funcionalidades: [[saida_estruturada|Saída estruturada]], [[geracao_de_texto|Geração de texto]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Volume típico: Milhares de avaliações por semana; Canal de origem: Lojas de aplicativos e e-commerce; Idioma predominante: Português com gírias e abreviações.
- **Redes sociais e menções** (`sentimento-redes-sociais`): Monitoramento de marca e crise em tempo quase real. Funcionalidades: [[saida_estruturada|Saída estruturada]], [[geracao_de_texto|Geração de texto]]. Mais barata: [[gemma_4|Gemma 4]], [[mistral_small_4|Mistral Small 4]], [[qwen3_8_flash|Qwen3.8-Flash]]. Custo-benefício: [[grok|Grok]], [[gemini_3_8_flash|Gemini 3.8 Flash]], [[claude_haiku_5_5|Claude Haiku 5.5]]. Qualidade máxima: [[grok_4_7|Grok 4.7]], [[claude_sonnet_5_5|Claude Sonnet 5.5]], [[gpt_6_2_astra|GPT-6.2 Astra]]. Por que difere do caso: Muda Idioma predominante para vários idiomas com emojis e ironia: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Volume típico: Milhões de menções por dia; Canal de origem: Redes sociais e fóruns públicos; Idioma predominante: Vários idiomas com emojis e ironia.
- **Atendimento e pesquisa NPS** (`sentimento-atendimento`): Tom das conversas de suporte e respostas abertas de NPS. Funcionalidades: [[saida_estruturada|Saída estruturada]], [[geracao_de_texto|Geração de texto]]. Mais barata: [[gemma_4|Gemma 4]], [[qwen3_8_flash|Qwen3.8-Flash]], [[mistral_small_4|Mistral Small 4]]. Custo-benefício: [[gemini_3_8_flash|Gemini 3.8 Flash]], [[claude_haiku_5_5|Claude Haiku 5.5]], [[gpt_6_1_terra|GPT-6.1 Terra]]. Qualidade máxima: [[claude_sonnet_5_5|Claude Sonnet 5.5]], [[gpt_6_2_astra|GPT-6.2 Astra]], [[claude_opus_5_5|Claude Opus 5.5]]. Por que difere do caso: Muda Idioma predominante para português formal com respostas abertas: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Volume típico: Centenas de conversas por dia; Canal de origem: Chat de suporte e pesquisa NPS; Idioma predominante: Português formal com respostas abertas.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[gemma_4|Gemma 4]], [[claude_haiku_5_5|Claude Haiku 5.5]], [[qwen3_8_flash|Qwen3.8-Flash]]
- **Custo-benefício:** [[gpt_6_1_terra|GPT-6.1 Terra]], [[gemini_3_8_flash|Gemini 3.8 Flash]], [[claude_sonnet_5_5|Claude Sonnet 5.5]]
- **Qualidade máxima:** [[claude_opus_5_5|Claude Opus 5.5]], [[gpt_6_2_astra|GPT-6.2 Astra]], [[gemini_4_neon|Gemini 4 Neon]]
## ⚖️ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** custo. A tarefa é repetitiva e de alto volume, e o custo por classificação decide a escolha.
## 🔗 Relacionamentos
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Casos de Uso de IA
- **Macro:** [[dados_e_analytics|Dados e analytics]]
