---
id: lm_studio
tipo: ferramenta
nome: LM Studio
tipos:
  - SOFTWARE
empresa: "[[element_labs|Element Labs]]"
aliases:
  - LM Studio
  - LMStudio
categorias:
  - "[[inferencia_local|Inferência local]]"
funcionalidades:
  - "[[execucao_local|Execução local]]"
  - "[[geracao_de_texto|Geração de texto]]"
  - "[[geracao_de_codigo|Geração de código]]"
  - "[[geracao_de_embeddings|Geração de embeddings]]"
casosDeUso:
  - "[[inferencia_privada_local|Inferência privada local]]"
  - "[[chat_e_assistente_geral|Chat e assistente geral]]"
modelos:
  - "[[deepseek_r1|DeepSeek R1]]"
  - "[[gemma_4|Gemma 4]]"
  - "[[llama_4_maverick|Llama 4 Maverick]]"
  - "[[llama_4_scout|Llama 4 Scout]]"
  - "[[mistral_small_4|Mistral Small 4]]"
  - "[[qwen3_8_27b|Qwen3.8-27B]]"
  - "[[gpt_oss_120b|gpt-oss-120b]]"
modeloContratacao:
  - free
precoUSD: 0
plataformas:
  - macos
  - windows
  - linux
  - cli
  - api
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
  - closed source, gratis para uso pessoal e comercial
  - proibido revender ou redistribuir o software conforme o ToS
  - requer hardware local (RAM/VRAM) conforme o modelo
  - roda modelos open-weight em GGUF e MLX
dataVerificacao: 2026-11-20
fontePreco: https://lmstudio.ai/
precoMedio: 0
tags:
  - ferramenta
  - ia
  - inferencia-local
  - lm-studio
  - gguf
---
# LM Studio

## 📋 Informações Básicas
- **Tipos:** Aplicativo desktop para rodar LLMs localmente
- **Empresa/Fabricante:** [[element_labs|Element Labs]]
- **Website:** https://lmstudio.ai
- **Categorias:** Inferência local
- **Modelo de contratação:** free (uso pessoal e comercial)
- **Preço (USD):** Gratuito; único custo é o hardware local
- **Data de verificação:** 2026-11-20
- **Fonte do preço:** https://lmstudio.ai/
- **Licença:** closed source, gratuito para uso pessoal e comercial (desde jul/2025)

## 📝 Descrição
Aplicativo desktop para descobrir, baixar e rodar modelos de IA de peso aberto localmente, com interface gráfica, explorador do [[hugging_face|Hugging Face]] integrado e servidor de API local compatível com o formato OpenAI. Baixa diversos modelos para usar em projetos próprios, com foco em facilidade de uso.

O formato GGUF é um formato de arquivo para modelos de IA quantizados, pensado para inferência eficiente em CPU e GPU (padrão do llama.cpp). É o formato principal que o LM Studio usa para rodar modelos localmente, junto do MLX da Apple.

## 🎯 Para Que Serve
Rodar modelos de linguagem na própria máquina por uma interface gráfica amigável, sem linha de comando, com privacidade total e sem custo por token.

### Casos de Uso
1. Rodar LLMs locais com interface gráfica
2. Inferência privada sem enviar dados para terceiros
3. Testar e comparar modelos open-weight em GGUF ou MLX
4. Servir um endpoint local compatível com OpenAI para apps próprios

## ⏰ Quando Utilizar
- Quando quer rodar LLMs local com GUI amigável, sem CLI
- Quando precisa de privacidade total (dados ficam na máquina)
- Quando quer testar vários modelos em GGUF ou MLX rapidamente
- Quando quer um servidor local compatível com OpenAI para desenvolvimento

### Quando NÃO utilizar
- Quando prefere automação por CLI e scripts: avalie [[ollama|Ollama]]
- Quando a máquina não tem RAM/VRAM suficiente para o modelo
- Quando precisa de escala em produção com carga
- Quando precisa dos melhores modelos frontier que não rodam local

## 🧩 Categorias e Funcionalidades
- **Categorias:** [[inferencia_local|Inferência local]]
- **Funcionalidades:** [[execucao_local|Execução local]], [[geracao_de_texto|Geração de texto]], [[geracao_de_codigo|Geração de código]], [[geracao_de_embeddings|Geração de embeddings]]
- **Casos de uso mapeados:** [[inferencia_privada_local|Inferência privada local]], [[chat_e_assistente_geral|Chat e assistente geral]]
- **Modelos:** [[deepseek_r1|DeepSeek R1]], [[gemma_4|Gemma 4]], [[llama_4_maverick|Llama 4 Maverick]], [[llama_4_scout|Llama 4 Scout]], [[mistral_small_4|Mistral Small 4]], [[qwen3_8_27b|Qwen3.8-27B]], [[gpt_oss_120b|gpt-oss-120b]]
Notas atômicas e legendas em [[hub_ai_tools|Mapa de Ferramentas de IA]].

## 🖥️ Compatibilidade e Plataformas
- **Plataformas:** macos, windows, linux, cli (lms), api (servidor local)
- **Integra com:** [[hugging_face|Hugging Face]] (explorador de modelos), servidor compatível com OpenAI consumido por [[langchain|LangChain]] e [[llamaindex|LlamaIndex]]
- **Requisitos:** hardware local com RAM/VRAM conforme o modelo

## 🔒 Restrições e Especificações
- **Context window / limites:** depende do modelo carregado.
- **Residência de dados / privacidade:** total (execução local).
- **Offline:** sim.
- **ToS / licença:** closed source, gratuito para uso pessoal e comercial; proibido revender ou redistribuir o software.
- **Outras restrições:** desempenho depende do hardware; modelos grandes exigem muita memória.

## 🔧 Como Utilizar
1. Baixar o app em https://lmstudio.ai
2. Buscar e baixar um modelo (por exemplo um GGUF no explorador integrado)
3. Carregar o modelo e conversar pela interface
4. Opcional: ativar o servidor local (API compatível com OpenAI) para integrar em apps

## 🆚 Alternativas
- [[ollama|Ollama]] - foco em CLI e automação, mais leve para scripts
- llama.cpp - mais baixo nível, sem interface gráfica
- [[hugging_face|Hugging Face]] - catálogo de modelos para baixar

### Vantagens sobre alternativas
- Interface gráfica amigável, sem CLI obrigatória
- Explorador de modelos integrado
- Servidor local compatível com OpenAI

### Desvantagens
- Closed source
- Desempenho limitado pelo hardware local
- Menos orientado a automação que [[ollama|Ollama]]

## 💰 Custo e Contratação

### Planos (USD)
- **Gratuito:** uso pessoal e comercial, sem licença paga para inferência local
- **Custo real:** hardware local (RAM/VRAM) e energia
- **Fonte:** https://lmstudio.ai/ (verificado em 2026-11-20)

## 🔗 Relacionamentos
- **Contexto:** Ferramentas
- **Empresa:** [[element_labs|Element Labs]]
- **Usado em:** Inferência local, testes de modelos open-weight
- **Alternativas:** [[ollama|Ollama]], [[hugging_face|Hugging Face]]
- **Integra com:** [[hugging_face|Hugging Face]], [[langchain|LangChain]], [[llamaindex|LlamaIndex]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]

## 📝 Notas
- GGUF e MLX são os formatos de modelo suportados para rodar localmente.
- O servidor local expõe uma API compatível com o SDK da OpenAI, o que facilita trocar chamadas de nuvem por local em desenvolvimento.
