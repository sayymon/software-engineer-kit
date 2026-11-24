---
id: ollama
tipo: ferramenta
nome: Ollama
tipos:
  - SOFTWARE
  - UTILITARIO
empresa: "[[ollama_inc|Ollama Inc]]"
aliases:
  - Ollama
categorias:
  - "[[inferencia_local|Inferência local]]"
funcionalidades:
  - "[[execucao_local|Execução local]]"
  - "[[quantizacao_de_modelos|Quantização de modelos]]"
  - "[[geracao_de_texto|Geração de texto]]"
  - "[[geracao_de_codigo|Geração de código]]"
  - "[[geracao_de_embeddings|Geração de embeddings]]"
casosDeUso:
  - "[[inferencia_privada_local|Inferência privada local]]"
  - "[[chat_e_assistente_geral|Chat e assistente geral]]"
modelos:
  - "[[deepseek_r1|DeepSeek R1]]"
  - "[[deepseek_v4_1_flash|DeepSeek V4.1 Flash]]"
  - "[[gemma_4|Gemma 4]]"
  - "[[llama_4_maverick|Llama 4 Maverick]]"
  - "[[llama_4_scout|Llama 4 Scout]]"
  - "[[mistral_small_4|Mistral Small 4]]"
  - "[[qwen3_8_27b|Qwen3.8-27B]]"
  - "[[whisper_large_v3|Whisper Large v3]]"
  - "[[gpt_oss_120b|gpt-oss-120b]]"
modeloContratacao:
  - open-source
  - free
precoUSD: 0
plataformas:
  - macos
  - windows
  - linux
  - cli
  - api
  - self-hosted
linguagens:
  - agnostica
porte:
  - pessoa-fisica
  - pequena
  - media
  - grande
segmentos:
  - geral
restricoes:
  - qualidade inferior aos modelos frontier
  - consumo alto de RAM/GPU (7B ~8GB, 70B ~48GB+)
  - nao escala para producao com carga
  - performance depende do hardware local
dataVerificacao: 2026-11-20
fontePreco: https://ollama.com
precoMedio: 0
tags:
  - ferramenta
  - ia
  - ollama
  - local
  - modelos
  - runtime
---
# Ollama

## 📋 Informações Básicas
- **Tipos:** Runtime para modelos de IA locais
- **Empresa/Fabricante:** [[ollama_inc|Ollama Inc]] (open source)
- **Website:** https://ollama.com
- **Categorias:** Inferência local
- **Modelo de contratação:** open-source / free (local)
- **Preço (USD):** Gratuito para rodar localmente; único custo é o hardware. Ollama Cloud (hosted) cobrado à parte
- **Data de verificação:** 2026-11-20
- **Fonte do preço:** https://ollama.com
- **Licença:** MIT

## 📝 Descrição
Runtime que roda modelos de IA (LLMs) localmente. Suporta Llama, Mistral, Gemma, CodeLlama, Phi e dezenas de outros modelos. Interface via CLI simples e API REST compatível com o formato OpenAI. Gerencia download, quantização e execução dos modelos.

## 🎯 Para Que Serve
Rodar modelos de linguagem localmente sem depender de APIs externas, com privacidade total e sem custo por token.

### Casos de Uso
1. Desenvolvimento e testes com LLMs sem custo de API
2. Aplicações que exigem privacidade (dados não saem da máquina)
3. Experimentação com diferentes modelos
4. Backend local para ferramentas de coding IA

## ⏰ Quando Utilizar
- Quando quer rodar LLMs sem custos de API
- Quando precisa de privacidade total (dados locais)
- Quando está experimentando e iterando rápido
- Quando precisa de modelos para dev/teste sem latência de rede

### Quando NÃO utilizar
- Quando precisa dos melhores modelos ([[chatgpt|ChatGPT]], [[claude|Claude AI]]) que não rodam local
- Quando a máquina não tem RAM/GPU suficiente
- Quando precisa de escala (muitas requests simultâneas)
- Em produção com SLA de disponibilidade

## 🧩 Categorias e Funcionalidades
- **Categorias:** [[inferencia_local|Inferência local]]
- **Funcionalidades:** [[execucao_local|Execução local]], [[quantizacao_de_modelos|Quantização de modelos]], [[geracao_de_texto|Geração de texto]], [[geracao_de_codigo|Geração de código]], [[geracao_de_embeddings|Geração de embeddings]]
- **Casos de uso mapeados:** [[inferencia_privada_local|Inferência privada local]], [[chat_e_assistente_geral|Chat e assistente geral]]
- **Modelos:** [[deepseek_r1|DeepSeek R1]], [[deepseek_v4_1_flash|DeepSeek V4.1 Flash]], [[gemma_4|Gemma 4]], [[llama_4_maverick|Llama 4 Maverick]], [[llama_4_scout|Llama 4 Scout]], [[mistral_small_4|Mistral Small 4]], [[qwen3_8_27b|Qwen3.8-27B]], [[whisper_large_v3|Whisper Large v3]], [[gpt_oss_120b|gpt-oss-120b]]
Notas atômicas e legendas em [[hub_ai_tools|Mapa de Ferramentas de IA]].

## 🖥️ Compatibilidade e Plataformas
- **Plataformas:** macos, windows, linux, cli, api, self-hosted
- **Integra com:** [[langchain|LangChain]] (LLM provider local), [[chromadb|ChromaDB]] (embeddings locais), Open WebUI (interface web), Continue.dev (coding assistant), [[lm_studio|LM Studio]] (GUI alternativa), [[crewai|CrewAI]]
- **Requisitos:** 8GB RAM mínimo, 16GB+ recomendado; GPU opcional

## 🔒 Restrições e Especificações
- **Context window / limites:** depende do modelo carregado.
- **Residência de dados / privacidade:** total (dados ficam na máquina).
- **Offline:** sim.
- **ToS / licença:** runtime MIT; cada modelo tem sua licença.
- **Outras restrições:** modelos grandes exigem muita RAM/GPU; não escala para produção com carga.

## 🔧 Como Utilizar

### Instalação
```bash
brew install ollama        # macOS
# Linux: curl -fsSL https://ollama.com/install.sh | sh
ollama serve
```

### Uso Básico
```bash
ollama pull llama3.2
ollama run llama3.2 "Explique o que e RAG em 3 frases"
ollama list
```

```python
from openai import OpenAI
client = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")
response = client.chat.completions.create(model="llama3.2", messages=[{"role": "user", "content": "O que e RAG?"}])
```

## 🆚 Alternativas
- [[lm_studio|LM Studio]] - GUI mais amigável, menos CLI
- vLLM - serving de alta performance (produção)
- llama.cpp - mais baixo nível, sem gerenciamento
- [[hugging_face|Hugging Face]] - catálogo de modelos para baixar

### Vantagens sobre alternativas
- CLI extremamente simples (ollama run modelo)
- Gerencia download e quantização automaticamente
- API REST compatível com OpenAI SDK
- Grande catálogo de modelos pré-configurados

### Desvantagens
- Qualidade inferior aos modelos frontier
- Consome recursos significativos da máquina
- Modelos grandes podem ser lentos sem GPU dedicada
- Não ideal para produção com carga

## 💰 Custo e Contratação

### Planos (USD)
- **Gratuito:** open source, sem restrições; único custo é o hardware local
- **Ollama Cloud:** execução hosted de modelos maiores, cobrada à parte
- **Fonte:** https://ollama.com (verificado em 2026-11-20)

## 🧠 Conhecimentos Necessários
- Terminal/CLI - Básico
- LLMs - Básico (modelos e parâmetros)
- Hardware: 8GB RAM mínimo, 16GB+ recomendado

## 📚 Documentação
- [Documentação oficial](https://ollama.com/docs)
- [Biblioteca de modelos](https://ollama.com/library)
- [GitHub (ollama)](https://github.com/ollama/ollama)
- [Referência da API](https://github.com/ollama/ollama/blob/main/docs/api.md)
- **Formato relacionado:** GGUF (modelos quantizados)

## 🔗 Relacionamentos
- **Contexto:** Ferramentas
- **Empresa:** [[ollama_inc|Ollama Inc]]
- **Usado em:** Desenvolvimento local, experimentação
- **Alternativas:** [[lm_studio|LM Studio]], vLLM, llama.cpp
- **Integra com:** [[langchain|LangChain]], [[chromadb|ChromaDB]], Open WebUI, [[crewai|CrewAI]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
