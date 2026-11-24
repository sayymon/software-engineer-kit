---
id: whisper
tipo: ferramenta
nome: Whisper
tipos:
  - SOFTWARE
  - BIBLIOTECA
empresa: "[[openai|OpenAI]]"
aliases:
  - Whisper
  - whisper-1
categorias:
  - "[[geracao_audio|Ferramentas de áudio e voz]]"
  - "[[reunioes_transcricao|Reuniões e transcrição]]"
funcionalidades:
  - "[[transcricao_de_audio|Transcrição de áudio]]"
casosDeUso:
  - "[[transcricao_de_reunioes_e_midia|Transcrição de reuniões e mídia]]"
  - "[[traducao_de_textos|Tradução de textos]]"
  - "[[resumo_de_documentos|Resumo de documentos]]"
  - "[[clinica_e_consultorio_pequena_empresa|Clínica e consultório (pequena empresa)]]"
  - "[[musica_e_trilha_sonora|Música e trilha sonora]]"
  - "[[dublagem_e_limpeza_de_audio|Dublagem e limpeza de áudio]]"
modelos:
  - "[[gpt_transcribe|GPT-Transcribe]]"
  - "[[whisper_large_v3|Whisper Large v3]]"
modeloContratacao:
  - open-source
  - free
  - api-pay-per-token
precoUSD: 0
plataformas:
  - cli
  - api
  - self-hosted
  - windows
  - macos
  - linux
linguagens:
  - python
porte:
  - pessoa-fisica
  - pequena
  - media
  - grande
segmentos:
  - geral
restricoes:
  - modelo open source (MIT); rodar local em tempo real exige GPU
  - API hospedada whisper-1 a $0.006/min, depreciada em ago/2026 e com saida prevista para fev/2027
  - modelos de transcricao mais novos da OpenAI de $0.003 a $0.017/min
dataVerificacao: 2026-11-20
fontePreco: https://openai.com/api/pricing/
precoMedio: 0
tags:
  - ferramenta
  - ia
  - transcricao
  - audio
  - whisper
  - open-source
---
# Whisper

## 📋 Informações Básicas
- **Tipos:** Modelo open source de reconhecimento de fala (speech to text)
- **Empresa/Fabricante:** [[openai|OpenAI]]
- **Website:** https://github.com/openai/whisper
- **Categorias:** Geração e transcrição de áudio
- **Modelo de contratação:** open-source (MIT) local; API da OpenAI paga por minuto
- **Preço (USD):** Modelo gratuito para rodar local; API hospedada whisper-1 a $0.006/min
- **Data de verificação:** 2026-11-20
- **Fonte do preço:** https://openai.com/api/pricing/
- **Licença:** MIT (modelo)

## 📝 Descrição
Modelo open source de reconhecimento de fala treinado em grande volume de áudio multilíngue. Transcreve áudio em texto e traduz fala para inglês. Pode rodar localmente (CPU ou GPU) ou ser consumido pela API hospedada da OpenAI (whisper-1), além de inspirar os modelos de transcrição mais novos da OpenAI.

## 🎯 Para Que Serve
Transcrever áudio em texto e traduzir fala para inglês, local ou via API, como base para legendas, buscas em áudio e pipelines que começam com voz.

### Casos de Uso
1. Transcrição de reuniões, entrevistas e podcasts
2. Legendagem automática de vídeos
3. Tradução de fala para inglês
4. Pré-processamento de áudio para resumo e busca

## ⏰ Quando Utilizar
- Quando precisa de transcrição de baixo custo ou gratuita (local)
- Quando quer rodar local e offline por privacidade
- Quando quer transcrição multilíngue com boa qualidade
- Quando prefere pagar por minuto na API em vez de assinatura

### Quando NÃO utilizar
- Quando precisa de geração de voz (TTS): use [[elevenlabs|ElevenLabs]] ou TTS do [[chatgpt|ChatGPT]]
- Quando precisa de transcrição em tempo real sem GPU local
- Quando o volume justifica avaliar modelos mais novos ou concorrentes por custo
- Quando quer um produto pronto com diarização e edição integradas

## 🧩 Categorias e Funcionalidades
- **Categorias:** [[geracao_audio|Ferramentas de áudio e voz]]
- **Funcionalidades:** [[transcricao_de_audio|Transcrição de áudio]]
- **Casos de uso mapeados:** [[transcricao_de_reunioes_e_midia|Transcrição de reuniões e mídia]], [[traducao_de_textos|Tradução de textos]], [[resumo_de_documentos|Resumo de documentos]]
- **Modelos:** [[gpt_transcribe|GPT-Transcribe]], [[whisper_large_v3|Whisper Large v3]]
Notas atômicas e legendas em [[hub_ai_tools|Mapa de Ferramentas de IA]].

## 🖥️ Compatibilidade e Plataformas
- **Plataformas:** python, cli, api, self-hosted, windows, macos, linux
- **Integra com:** [[openai|OpenAI]] (API whisper-1), pipelines Python; saída de texto alimenta [[langchain|LangChain]] e [[llamaindex|LlamaIndex]]
- **Requisitos:** Python e ffmpeg para rodar local; GPU para tempo real; ou chave de API da OpenAI

## 🔒 Restrições e Especificações
- **Context window / limites:** processa áudio em janelas; sem limite fixo de duração ao rodar local.
- **Residência de dados / privacidade:** total quando roda local; na API, dados processados pela OpenAI.
- **Offline:** sim (execução local).
- **ToS / licença:** modelo MIT; API sob ToS da OpenAI.
- **Outras restrições:** whisper-1 na API foi depreciado em ago/2026 e tem saída prevista para fev/2027; avaliar os modelos de transcrição mais novos.

## 🔧 Como Utilizar

### Instalação (local)
```bash
pip install -U openai-whisper
```

### Uso Básico (local)
```bash
whisper audio.mp3 --model small --language Portuguese
```

### Uso via API
```python
from openai import OpenAI
client = OpenAI()
with open("audio.mp3", "rb") as f:
    transcricao = client.audio.transcriptions.create(model="whisper-1", file=f)
print(transcricao.text)
```

## 🆚 Alternativas
- [[elevenlabs|ElevenLabs]] - Scribe para transcrição, além de TTS
- AssemblyAI e Deepgram - APIs de transcrição gerenciadas
- Modelos de transcrição mais novos da [[openai|OpenAI]] (sucessores do whisper-1)

### Vantagens sobre alternativas
- Open source: roda local, gratuito e offline
- Boa qualidade multilíngue
- Simples de integrar em Python

### Desvantagens
- Tempo real exige GPU
- Sem diarização nativa robusta
- whisper-1 na API em processo de descontinuação

## 💰 Custo e Contratação

### Planos (USD)
- **Local:** gratuito (modelo MIT); custo é o hardware
- **API whisper-1:** $0.006/min de áudio
- **Modelos de transcrição mais novos da OpenAI:** de $0.003 a $0.017/min conforme o modo
- **Fonte:** https://openai.com/api/pricing/ (verificado em 2026-11-20)

## 🔗 Relacionamentos
- **Contexto:** Ferramentas
- **Empresa:** [[openai|OpenAI]]
- **Usado em:** Transcrição, legendagem, pré-processamento de áudio
- **Alternativas:** [[elevenlabs|ElevenLabs]]
- **Integra com:** [[openai|OpenAI]], [[langchain|LangChain]], [[llamaindex|LlamaIndex]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
