---
id: transcricao_de_reunioes_e_midia
tipo: caso-de-uso
nome: Transcrição de reuniões e mídia
aliases:
  - transcricao
descricao: Converter reuniões, entrevistas e vídeos em texto com marcação de tempo.
funcionalidadesNecessarias:
  - "[[transcricao_de_audio|Transcrição de áudio]]"
  - "[[geracao_de_texto|Geração de texto]]"
categoriasRelacionadas:
  - "[[geracao_audio|Ferramentas de áudio e voz]]"
  - "[[inferencia_local|Inferência local]]"
ferramentasRecomendadas:
  - "[[whisper|Whisper]]"
  - "[[notebooklm|NotebookLM]]"
modelosRecomendados:
  - "[[whisper_large_v3|Whisper Large v3]]"
  - "[[gpt_transcribe|GPT-Transcribe]]"
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
macro: "[[audio_e_voz|Áudio e voz]]"
faixasPadrao:
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
variacoes:
  - id: transcricao-reuniao
    nome: Ata de reunião
    descricao: Transcrição com separação de falantes, resumo e itens de ação.
    funcionalidades:
      - "[[transcricao_de_audio|Transcrição de áudio]]"
      - "[[geracao_de_texto|Geração de texto]]"
    herdaFerramentas: true
    parametros:
      - chave: Contexto de uso
        valor: Reunião de equipe
        fonte: editorial
      - chave: Entregável
        valor: Ata com falantes, resumo e itens de ação
        fonte: editorial
  - id: transcricao-podcast-video
    nome: Legenda de podcast e vídeo
    descricao: Transcrição com marcação de tempo para legendas e capítulos.
    funcionalidades:
      - "[[transcricao_de_audio|Transcrição de áudio]]"
      - "[[geracao_de_texto|Geração de texto]]"
    herdaFerramentas: false
    maisBarata:
      - "[[whisper|Whisper]]"
      - "[[whisper_large_v3|Whisper Large v3]]"
      - "[[audacity|Audacity]]"
    custoBeneficio:
      - tabela:deepgram
      - tabela:assemblyai
      - tabela:descript
    qualidadeMaxima:
      - "[[gpt_transcribe|GPT-Transcribe]]"
      - tabela:rev
      - tabela:azure-ai-speech
    justificativaFerramentas: "Muda o Contexto de uso para mídia publicada: pede transcrição com tempo para legendas e capítulos."
    excecao: ""
    parametros:
      - chave: Contexto de uso
        valor: Publicação de mídia
        fonte: editorial
      - chave: Entregável
        valor: Transcrição com tempo para legendas e capítulos
        fonte: editorial
      - chave: Formato de arquivo
        valor: SRT ou VTT
        fonte: não verificado
  - id: transcricao-local-privada
    nome: Transcrição local e privada
    descricao: Áudio sensível transcrito na própria máquina, sem enviar a terceiros.
    funcionalidades:
      - "[[transcricao_de_audio|Transcrição de áudio]]"
      - "[[execucao_local|Execução local]]"
    herdaFerramentas: false
    maisBarata:
      - "[[ollama|Ollama]]"
      - "[[lm_studio|LM Studio]]"
      - tabela:llama-cpp
    custoBeneficio:
      - tabela:jan
      - tabela:gpt4all
      - tabela:open-webui
    qualidadeMaxima:
      - tabela:vllm
      - tabela:sglang
      - tabela:nvidia-tensorrt-llm
    justificativaFerramentas: "Muda o Ambiente de execução para a própria máquina: o critério é rodar modelos locais sem enviar áudio a terceiros."
    excecao: ""
    parametros:
      - chave: Contexto de uso
        valor: Áudio sensível
        fonte: editorial
      - chave: Entregável
        valor: Transcrição feita na própria máquina
        fonte: editorial
      - chave: Ambiente de execução
        valor: Computador local, sem enviar a terceiros
        fonte: editorial
      - chave: Regulação aplicável
        valor: LGPD
        fonte: editorial
tags:
  - caso-de-uso
  - ia
---
# Transcrição de reuniões e mídia
## 📝 Descrição
Converter reuniões, entrevistas e vídeos em texto com marcação de tempo.
## ⏰ Quando aplicar
- Atas de reunião
- Legendas e arquivos de mídia
## 🧩 Funcionalidades necessárias
- [[transcricao_de_audio|Transcrição de áudio]] - Conversão de fala em texto, com tempo e identificação de falantes quando disponível.
- [[geracao_de_texto|Geração de texto]] - Produção de texto livre ou orientado por instruções, de rascunhos a respostas longas.
## ✅ Recomendações
- [[whisper|Whisper]] - Pesos abertos com ótima cobertura de idiomas
- [[whisper_large_v3|Whisper Large v3]] - Versão mais precisa para execução local
- [[gpt_transcribe|GPT-Transcribe]] - Transcrição via API com preço por minuto
- [[notebooklm|NotebookLM]] - Resumo e perguntas sobre o conteúdo transcrito
## 🧬 Variações
- **Ata de reunião** (`transcricao-reuniao`): Transcrição com separação de falantes, resumo e itens de ação. Funcionalidades: [[transcricao_de_audio|Transcrição de áudio]], [[geracao_de_texto|Geração de texto]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Contexto de uso: Reunião de equipe; Entregável: Ata com falantes, resumo e itens de ação.
- **Legenda de podcast e vídeo** (`transcricao-podcast-video`): Transcrição com marcação de tempo para legendas e capítulos. Funcionalidades: [[transcricao_de_audio|Transcrição de áudio]], [[geracao_de_texto|Geração de texto]]. Mais barata: [[whisper|Whisper]], [[whisper_large_v3|Whisper Large v3]], [[audacity|Audacity]]. Custo-benefício: Deepgram, AssemblyAI, Descript. Qualidade máxima: [[gpt_transcribe|GPT-Transcribe]], Rev, Azure AI Speech. Por que difere do caso: Muda o Contexto de uso para mídia publicada: pede transcrição com tempo para legendas e capítulos. Parâmetros: Contexto de uso: Publicação de mídia; Entregável: Transcrição com tempo para legendas e capítulos; Formato de arquivo: SRT ou VTT (não verificado).
- **Transcrição local e privada** (`transcricao-local-privada`): Áudio sensível transcrito na própria máquina, sem enviar a terceiros. Funcionalidades: [[transcricao_de_audio|Transcrição de áudio]], [[execucao_local|Execução local]]. Mais barata: [[ollama|Ollama]], [[lm_studio|LM Studio]], llama.cpp. Custo-benefício: Jan, GPT4All, Open WebUI. Qualidade máxima: vLLM, SGLang, TensorRT-LLM. Por que difere do caso: Muda o Ambiente de execução para a própria máquina: o critério é rodar modelos locais sem enviar áudio a terceiros. Parâmetros: Contexto de uso: Áudio sensível; Entregável: Transcrição feita na própria máquina; Ambiente de execução: Computador local, sem enviar a terceiros; Regulação aplicável: LGPD.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[whisper|Whisper]], Fathom (reuniões), tl;dv
- **Custo-benefício:** [[otter_ai|Otter.ai]], Fireflies.ai, Read AI
- **Qualidade máxima:** [[granola|Granola]], Avoma, Rev
## ⚖️ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** privacidade-de-dados. Gravações de reuniões trazem informação sensível, e a execução local do Whisper mantém o áudio sob controle.
## 🔗 Relacionamentos
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Casos de Uso de IA
- **Macro:** [[audio_e_voz|Áudio e voz]]
