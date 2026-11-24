---
id: analise_de_documentos_e_imagens
tipo: caso-de-uso
nome: Análise de documentos e imagens
aliases:
  - analise-documentos-imagens
descricao: Ler PDFs, planilhas, imagens e gráficos para extrair e interpretar informação.
funcionalidadesNecessarias:
  - "[[multimodal|Multimodal]]"
  - "[[contexto_longo|Contexto longo]]"
  - "[[saida_estruturada|Saída estruturada]]"
categoriasRelacionadas:
  - "[[modelo_fundacional|Modelo fundacional]]"
  - "[[assistente_chat|Assistente de chat]]"
ferramentasRecomendadas:
  - "[[claude|Claude AI]]"
  - "[[gemini|Gemini]]"
modelosRecomendados:
  - "[[gemini_4_carbon|Gemini 4 Carbon]]"
  - "[[claude_sonnet_5_5|Claude Sonnet 5.5]]"
  - "[[gpt_5_5|GPT-5.5]]"
criteriosDesempate:
  - privacidade-de-dados
  - custo
  - lock-in
criterioPadrao: privacidade-de-dados
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
macro: "[[pesquisa_e_conhecimento|Pesquisa e conhecimento]]"
faixasPadrao:
  maisBarata:
    - "[[markitdown|MarkItDown]]"
    - tabela:pandoc
    - tabela:docling
  custoBeneficio:
    - "[[ocrmypdf|OCRmyPDF]]"
    - tabela:unstructured
    - tabela:llamaparse
  qualidadeMaxima:
    - "[[azure_ai_document_intelligence|Azure AI Document Intelligence]]"
    - tabela:google-document-ai
    - tabela:aws-textract
variacoes:
  - id: analise-nota-fiscal-recibo
    nome: Nota fiscal e recibo
    descricao: Campos extraídos de imagem e PDF em JSON validado.
    funcionalidades:
      - "[[multimodal|Multimodal]]"
      - "[[saida_estruturada|Saída estruturada]]"
    herdaFerramentas: true
    parametros:
      - chave: Tipo de documento
        valor: Nota fiscal e recibo em imagem ou PDF
        fonte: editorial
      - chave: Escala típica
        valor: Milhares de documentos por mês
        fonte: editorial
      - chave: Saída esperada
        valor: JSON com campos validados
        fonte: editorial
  - id: analise-contrato-pdf
    nome: Contrato e PDF longo
    descricao: Cláusulas, prazos e riscos extraídos e comparados.
    funcionalidades:
      - "[[contexto_longo|Contexto longo]]"
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
    justificativaFerramentas: "Muda Saída esperada para cláusulas, prazos e riscos comparados: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Tipo de documento
        valor: Contrato longo em PDF
        fonte: editorial
      - chave: Escala típica
        valor: Dezenas de contratos por semana
        fonte: editorial
      - chave: Saída esperada
        valor: Cláusulas, prazos e riscos comparados
        fonte: editorial
  - id: analise-grafico-tabela-imagem
    nome: Gráfico, tabela e screenshot
    descricao: Leitura de gráficos e telas com explicação e dados tabulados.
    funcionalidades:
      - "[[multimodal|Multimodal]]"
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
    justificativaFerramentas: "Muda Saída esperada para explicação com dados tabulados: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Tipo de documento
        valor: Gráfico, tabela e captura de tela
        fonte: editorial
      - chave: Escala típica
        valor: Imagens avulsas sob demanda
        fonte: editorial
      - chave: Saída esperada
        valor: Explicação com dados tabulados
        fonte: editorial
tags:
  - caso-de-uso
  - ia
---
# Análise de documentos e imagens
## 📝 Descrição
Ler PDFs, planilhas, imagens e gráficos para extrair e interpretar informação.
## ⏰ Quando aplicar
- Contratos e relatórios com tabelas
- Imagens, capturas de tela e formulários
## 🧩 Funcionalidades necessárias
- [[multimodal|Multimodal]] - Entendimento de mais de um tipo de entrada, como texto, imagem, áudio, vídeo e PDF.
- [[contexto_longo|Contexto longo]] - Janela de contexto grande o bastante para ler bases de código, contratos e longos históricos de uma vez.
- [[saida_estruturada|Saída estruturada]] - Respostas que seguem um esquema, como JSON validado, para uso direto por programas.
## ✅ Recomendações
- [[gemini_4_carbon|Gemini 4 Carbon]] - Leitura multimodal com contexto muito grande
- [[claude_sonnet_5_5|Claude Sonnet 5.5]] - Boa leitura de PDFs, tabelas e imagens
- [[gpt_5_5|GPT-5.5]] - Visão e documentos com saída estruturada
- [[claude|Claude AI]] - Interface pronta para enviar documentos e imagens
- [[gemini|Gemini]] - Aplicativo com leitura nativa de PDF e imagem
## 🧬 Variações
- **Nota fiscal e recibo** (`analise-nota-fiscal-recibo`): Campos extraídos de imagem e PDF em JSON validado. Funcionalidades: [[multimodal|Multimodal]], [[saida_estruturada|Saída estruturada]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Tipo de documento: Nota fiscal e recibo em imagem ou PDF; Escala típica: Milhares de documentos por mês; Saída esperada: JSON com campos validados.
- **Contrato e PDF longo** (`analise-contrato-pdf`): Cláusulas, prazos e riscos extraídos e comparados. Funcionalidades: [[contexto_longo|Contexto longo]], [[saida_estruturada|Saída estruturada]]. Mais barata: [[deepseek|DeepSeek]], [[qwen|Qwen]], [[mistral|Mistral]]. Custo-benefício: [[gemini|Gemini]], [[grok|Grok]], [[perplexity|Perplexity]]. Qualidade máxima: [[claude|Claude AI]], [[chatgpt|ChatGPT]], Microsoft Copilot. Por que difere do caso: Muda Saída esperada para cláusulas, prazos e riscos comparados: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Tipo de documento: Contrato longo em PDF; Escala típica: Dezenas de contratos por semana; Saída esperada: Cláusulas, prazos e riscos comparados.
- **Gráfico, tabela e screenshot** (`analise-grafico-tabela-imagem`): Leitura de gráficos e telas com explicação e dados tabulados. Funcionalidades: [[multimodal|Multimodal]], [[saida_estruturada|Saída estruturada]]. Mais barata: [[gemma_4|Gemma 4]], [[claude_haiku_5_5|Claude Haiku 5.5]], [[qwen3_8_flash|Qwen3.8-Flash]]. Custo-benefício: [[gpt_6_1_terra|GPT-6.1 Terra]], [[gemini_3_8_flash|Gemini 3.8 Flash]], [[claude_sonnet_5_5|Claude Sonnet 5.5]]. Qualidade máxima: [[claude_opus_5_5|Claude Opus 5.5]], [[gpt_6_2_astra|GPT-6.2 Astra]], [[gemini_4_neon|Gemini 4 Neon]]. Por que difere do caso: Muda Saída esperada para explicação com dados tabulados: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Tipo de documento: Gráfico, tabela e captura de tela; Escala típica: Imagens avulsas sob demanda; Saída esperada: Explicação com dados tabulados.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[markitdown|MarkItDown]], Pandoc, Docling
- **Custo-benefício:** [[ocrmypdf|OCRmyPDF]], Unstructured, LlamaParse
- **Qualidade máxima:** [[azure_ai_document_intelligence|Azure AI Document Intelligence]], Google Document AI, Amazon Textract
## ⚖️ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** privacidade-de-dados. Documentos e imagens trazem dados pessoais e corporativos, e as políticas de retenção e treino pesam na escolha.
## 🔗 Relacionamentos
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Casos de Uso de IA
- **Macro:** [[pesquisa_e_conhecimento|Pesquisa e conhecimento]]
