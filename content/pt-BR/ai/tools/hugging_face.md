---
id: hugging_face
tipo: ferramenta
nome: Hugging Face
tipos:
  - PLATAFORMA
  - SERVICO
empresa: "[[hugging_face_inc|Hugging Face Inc]]"
aliases:
  - Hugging Face
  - HuggingFace
  - HF
categorias:
  - "[[repositorio_modelos|Repositório de modelos]]"
  - "[[ml_framework|Framework de ML]]"
  - "[[inferencia_local|Inferência local]]"
funcionalidades:
  - "[[fine_tuning|Fine-tuning]]"
  - "[[deploy_gerenciado|Deploy gerenciado]]"
  - "[[geracao_de_embeddings|Geração de embeddings]]"
  - "[[execucao_local|Execução local]]"
  - "[[multimodal|Multimodal]]"
casosDeUso:
  - "[[aprendizado_de_ml|Aprendizado de ML]]"
  - "[[inferencia_privada_local|Inferência privada local]]"
  - "[[prototipacao_de_rag|Prototipação de RAG]]"
  - "[[modelos_de_decisao_e_fine_tuning|Modelos de decisão e fine-tuning]]"
modelos:
  - "[[deepseek_r1|DeepSeek R1]]"
  - "[[deepseek_v4_pro|DeepSeek V4 Pro]]"
  - "[[deepseek_v4_1_flash|DeepSeek V4.1 Flash]]"
  - "[[glm_5_2|GLM-5.2]]"
  - "[[glm_5_3|GLM-5.3]]"
  - "[[glm_5_3_flash|GLM-5.3-Flash]]"
  - "[[gemma_4|Gemma 4]]"
  - "[[kimi_k3|Kimi K3]]"
  - "[[llama_4_maverick|Llama 4 Maverick]]"
  - "[[llama_4_scout|Llama 4 Scout]]"
  - "[[mistral_large_4|Mistral Large 4]]"
  - "[[mistral_medium_3_5|Mistral Medium 3.5]]"
  - "[[mistral_small_4|Mistral Small 4]]"
  - "[[muse_spark_open|Muse Spark Open]]"
  - "[[qwen3_8_27b|Qwen3.8-27B]]"
  - "[[whisper_large_v3|Whisper Large v3]]"
  - "[[gpt_oss_120b|gpt-oss-120b]]"
  - "[[clef|Clef]]"
  - "[[clef_flash|Clef-flash]]"
  - "[[clef_omni|Clef-omni]]"
  - "[[laya|Laya]]"
modeloContratacao:
  - free
  - subscription
  - per-seat
  - api-pay-per-token
  - enterprise
precoUSD: 9
plataformas:
  - web
  - api
  - cloud
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
  - free inference com rate limits
  - compute (GPU Spaces/Endpoints) cobrado por uso
  - qualidade varia entre modelos da comunidade
  - fine-tuning exige conhecimento de ML
dataVerificacao: 2026-11-20
fontePreco: https://huggingface.co/pricing
precoMedio: 9
tags:
  - ferramenta
  - ia
  - hugging-face
  - modelos
  - datasets
  - open-source
---
# Hugging Face

## 📋 Informações Básicas
- **Tipos:** Plataforma/repositório de modelos e datasets de IA
- **Empresa/Fabricante:** [[hugging_face_inc|Hugging Face Inc]]
- **Website:** https://huggingface.co
- **Categorias:** Repositório de modelos, Framework de ML, Inferência local
- **Modelo de contratação:** free, subscription (PRO), per-seat (Team/Enterprise), api-pay-per-token (Inference), enterprise
- **Preço (USD):** Free $0; PRO $9/mês; Team $20/usuário/mês; Enterprise $50/usuário/mês; compute (Endpoints/Spaces GPU) por uso
- **Data de verificação:** 2026-11-20
- **Fonte do preço:** https://huggingface.co/pricing
- **Fundação:** 2016, Nova York

## 📝 Descrição
Maior plataforma e repositório de modelos e datasets de IA open source do mundo, o "GitHub dos modelos de IA". Oferece Hub de modelos, Spaces (demos interativas), datasets, Inference Providers e bibliotecas como Transformers, Diffusers e Tokenizers.

## 🎯 Para Que Serve
Descobrir, compartilhar, testar e deployar modelos de IA open source. Serve tanto para consumir modelos prontos quanto para publicar os seus.

### Casos de Uso
1. Buscar e baixar modelos pré-treinados (NLP, visão, áudio)
2. Hospedar demos interativas com Spaces (Gradio/Streamlit)
3. Acessar datasets públicos para treinamento e fine-tuning
4. Inference Providers para usar modelos sem infra própria
5. Fine-tuning de modelos com AutoTrain

## ⏰ Quando Utilizar
- Quando precisa de um modelo open source específico
- Quando quer testar modelos antes de integrar
- Quando precisa de datasets para treinar/avaliar
- Quando quer deployar modelos sem gerenciar infra (Inference Endpoints)
- Quando quer hospedar demos de modelos

### Quando NÃO utilizar
- Quando precisa de modelos proprietários frontier ([[chatgpt|ChatGPT]], [[claude|Claude AI]])
- Quando precisa de SLA enterprise sem pagar (free tier tem limites)
- Quando o modelo já está disponível via API do provider

## 🧩 Categorias e Funcionalidades
- **Categorias:** [[repositorio_modelos|Repositório de modelos]], [[ml_framework|Framework de ML]], [[inferencia_local|Inferência local]]
- **Funcionalidades:** [[fine_tuning|Fine-tuning]], [[deploy_gerenciado|Deploy gerenciado]], [[geracao_de_embeddings|Geração de embeddings]], [[execucao_local|Execução local]], [[multimodal|Multimodal]]
- **Casos de uso mapeados:** [[aprendizado_de_ml|Aprendizado de ML]], [[inferencia_privada_local|Inferência privada local]], [[prototipacao_de_rag|Prototipação de RAG]]
- **Modelos:** [[deepseek_r1|DeepSeek R1]], [[deepseek_v4_pro|DeepSeek V4 Pro]], [[deepseek_v4_1_flash|DeepSeek V4.1 Flash]], [[glm_5_2|GLM-5.2]], [[glm_5_3|GLM-5.3]], [[glm_5_3_flash|GLM-5.3-Flash]], [[gemma_4|Gemma 4]], [[kimi_k3|Kimi K3]], [[llama_4_maverick|Llama 4 Maverick]], [[llama_4_scout|Llama 4 Scout]], [[mistral_large_4|Mistral Large 4]], [[mistral_medium_3_5|Mistral Medium 3.5]], [[mistral_small_4|Mistral Small 4]], [[muse_spark_open|Muse Spark Open]], [[qwen3_8_27b|Qwen3.8-27B]], [[whisper_large_v3|Whisper Large v3]], [[gpt_oss_120b|gpt-oss-120b]]
Notas atômicas e legendas em [[hub_ai_tools|Mapa de Ferramentas de IA]].

## 🖥️ Compatibilidade e Plataformas
- **Plataformas:** python, web, api, cloud
- **Integra com:** [[langchain|LangChain]] (embeddings e LLMs), [[ollama|Ollama]] (modelos GGUF do Hub), Gradio (Spaces), [[pytorch|PyTorch]] (backend), vLLM (serving)
- **Requisitos:** Python; conta HF para upload/token

## 🔒 Restrições e Especificações
- **Context window / limites:** depende do modelo escolhido.
- **Residência de dados / privacidade:** Hub público por padrão; Enterprise com private Hub e SSO.
- **Offline:** sim (modelos baixados rodam local).
- **ToS / licença:** cada modelo tem sua própria licença; verifique o model card.
- **Outras restrições:** free inference com rate limits; compute cobrado por uso.

## 🔧 Como Utilizar

### Instalação
```bash
pip install transformers huggingface_hub
huggingface-cli login
```

### Uso Básico
```python
from transformers import pipeline
classifier = pipeline("sentiment-analysis")
result = classifier("I love using open source AI models!")

from datasets import load_dataset
dataset = load_dataset("squad")
```

## 🆚 Alternativas
- [[ollama|Ollama]] - para rodar modelos localmente (mais simples)
- Replicate - inference API paga
- [[together_ai|Together AI]] - inference de modelos open source
- Kaggle - datasets e competições

### Vantagens sobre alternativas
- Maior catálogo de modelos open source do mundo
- Comunidade gigante e ativa
- Datasets, modelos e demos em um lugar só
- Transformers e Diffusers são padrão da indústria

### Desvantagens
- Inference gratuita lenta e com rate limits
- Navegar o catálogo enorme pode ser overwhelming
- Qualidade varia (comunidade vs oficiais)
- Compute para fine-tuning e treinamento é pago

## 💰 Custo e Contratação

### Planos (USD)
- **Free:** Hub, Inference (rate limited), Spaces (CPU)
- **PRO:** $9/mês (inference priority, Spaces com GPU, créditos de compute)
- **Team:** $20/usuário/mês
- **Enterprise:** $50/usuário/mês (private Hub, SSO, compute dedicado)
- **Inference Endpoints:** pay-per-use (deploy dedicado)
- **Fonte:** https://huggingface.co/pricing (verificado em 2026-11-20)

## 🧠 Conhecimentos Necessários
- Python - Básico a intermediário
- Machine Learning - Básico (modelos, tokenização)
- [[pytorch|PyTorch]] - Básico (para fine-tuning)

## 📚 Documentação
- [Documentação oficial](https://huggingface.co/docs)
- [Docs Transformers](https://huggingface.co/docs/transformers)
- [Models Hub](https://huggingface.co/models)
- [Datasets](https://huggingface.co/datasets)
- [Spaces](https://huggingface.co/spaces)
- **Bibliotecas relacionadas:** Transformers, Diffusers, Sentence Transformers

## 🔗 Relacionamentos
- **Contexto:** Ferramentas
- **Empresa:** [[hugging_face_inc|Hugging Face Inc]]
- **Usado em:** Download de modelos, datasets, demos
- **Alternativas:** [[ollama|Ollama]], Replicate, [[together_ai|Together AI]]
- **Integra com:** [[langchain|LangChain]], [[ollama|Ollama]], [[pytorch|PyTorch]], Gradio
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
