---
id: hub_ai
tipo: hub
nome: Inteligencia Artificial
tags:
  - conhecimento
  - tecnologia
  - ia
  - machine-learning
  - deep-learning
  - llm
  - agentes
camada: ai
ordem: 2
---
# Inteligencia Artificial

## Definicao e Origem

O termo **Inteligencia Artificial** foi cunhado em 1956 por um grupo de 10 cientistas incluindo John McCarthy (propôs o termo), Marvin Minsky (cofundador do Lab de IA do MIT) e Claude Shannon (pai da teoria da informacao). O proposito era **simular a inteligencia humana** em maquinas.

A IA é derivada de um conjunto de tecnicas da estatistica alavancadas pela capacidade computacional. A Estatistica Multivariada é a precursora da IA, onde modelos estatisticos foram sendo criados e otimizados conforme o poder de processamento foi aumentando.

O proposito inicial foi fazer previsoes, reconhecer padroes e agrupar dados. Com o tempo foi ganhando capacidades até entao exclusivas de humanos: fala, visao, criacao de conteudo, raciocinio e tomada de decisao.

## Evolucao Historica

### Era 1: Estatistica Multivariada (1950-1980)

Modelos estatisticos classicos aplicados a dados. Regressao, correlacao, analise fatorial. Limitados pela capacidade computacional e volume de dados.

### Era 2: Machine Learning (1980-2010)

Algoritmos que aprendem com dados ao inves de serem programados explicitamente. Arvores de decisao, SVM, KNN, Random Forest, Naive Bayes. Aprendizado supervisionado, nao-supervisionado e por reforco.

### Era 3: Deep Learning e Redes Neurais Profundas (2010-2017)

Redes neurais com multiplas camadas que extraem features automaticamente dos dados. CNNs para visao computacional, RNNs e LSTMs para sequencias. Impulsionado por GPUs e Big Data.

### Era 4: Transformers e o Mecanismo de Atencao (2017-2020)

O paper "Attention is All You Need" (Google, 2017) revolucionou tudo. O mecanismo de auto-atencao trouxe muito mais semantica e naturalidade. Ao inves de processar sequencialmente (RNN), processa tudo em paralelo focando no que é importante.

### Era 5: LLMs e Generative AI (2020-2024)

Grandes empresas com capacidade massiva de processamento (GPUs enormes) treinaram modelos com bilhoes de parametros sobre volumes gigantes de dados. [[geracao_de_embeddings|Embeddings]] organizaram os dados em representacoes numericas com peso semantico. Os LLMs passaram a gerar texto, codigo, imagem com naturalidade surpreendente.

### Era 6: Modelos Multimodais e Agentes (2024+)

Modelos que combinam texto + imagem + audio + video. AI Agents que usam ferramentas e raciocinam em multiplos passos. Medicao por nivel de inteligencia (benchmarks, acuracia, raciocinio). Caminhando da ANI para AGI.

## Areas de Conhecimento

### Machine Learning

Conjunto de tecnicas de treinamento para fazer modelos aprenderem com dados.

- Supervisionado (classificacao, regressao)
- Nao supervisionado (clusterizacao, reducao de dimensionalidade)
- Aprendizado por reforco

### Deep Learning

Redes neurais profundas com multiplas camadas. Capacidade de extrair padroes complexos automaticamente.

- Redes Neurais artificiais
- CNNs (visao computacional)
- RNNs, LSTMs (sequencias)
- Transformers (atencao, paralelismo)

### PLN - Processamento de Linguagem Natural

Habilidade de processar, entender e gerar linguagem humana.

- Tokenizacao, [[geracao_de_embeddings|Embeddings]]
- Analise de sentimentos
- Traducao automatica
- Geracao de texto (LLMs)

### Computer Vision

Processamento e compreensao de imagens e video.

- Classificacao de imagens (CNN)
- Deteccao de objetos (YOLO)
- Segmentacao (SAM)
- Geracao de imagens (Stable Diffusion, DALL-E)

### Generative AI

Capacidade de criar conteudo novo (texto, imagem, audio, video, codigo).

- LLMs (geracao de texto e codigo)
- Modelos de difusao (geracao de imagem)
- Text-to-Speech, Voice Cloning
- Modelos multimodais

### AI Agents

Softwares autonomos que usam modelos de AI para decidir e agir em multiplos passos.

- Tool use / Function calling
- Planejamento e raciocinio
- Memoria e contexto
- [[rag|RAG]] (Retrieval Augmented Generation)
- [[crewai|CrewAI]], [[langchain|Langchain]]

## Niveis de Inteligencia

### ANI (Artificial Narrow Intelligence)

IA **especialista**. Projetada para uma tarefa especifica. É tudo o que temos hoje.

- GPT gerando texto
- DALL-E gerando imagens
- AlphaGo jogando Go
- Recomendacao da Netflix

Mesmo parecendo "inteligente", cada modelo so faz uma coisa (ou poucas). Nao tem compreensao geral.

### AGI (Artificial General Intelligence)

IA **generalista**. Capacidade de compreender e resolver qualquer tarefa intelectual que um humano consegue, com a mesma flexibilidade e transferencia de aprendizado.

**Ainda nao existe**, mas os modelos multimodais e agentes com raciocinio (o1, Claude com extended thinking) sao os passos mais proximos.

### ASI (Artificial Super Intelligence)

IA que **supera humanos** em todas as dimensoes intelectuais. Teorica e especulativa. Nao temos evidencia de proximidade.

## Conceitos Fundamentais

### Representacao de Dados

- [[geracao_de_embeddings|Embeddings]] (representacoes numericas com semantica)
- Tokenizacao (texto em unidades processaveis)
- Vetores e similaridade (coseno, distancia euclidiana)

### Arquiteturas

- Redes Neurais (neuronios, camadas, pesos)
- Transformers (mecanismo de atencao)
- Foundation Models (modelos base reutilizaveis)

### Treinamento

- Pre-training (aprender padroes em massa)
- Fine-tuning (ajustar para dominio especifico)
- RLHF (alinhar com preferencias humanas)
- [[escrever_prompt|Engenharia de prompt]] (guiar comportamento sem retreinar)

### Inferencia

- Temperatura (controle de aleatoriedade)
- Context window (capacidade de processar tokens)
- Parametros (bilhoes de pesos que codificam conhecimento)

## Ferramentas e Ecossistema

Mapa navegável para escolher a ferramenta certa por categoria, funcionalidade e caso de uso: [[hub_ai_tools|Mapa de Ferramentas de IA]].

### Modelos

- Proprietarios: [[chatgpt|GPT]] (OpenAI), [[claude|Claude AI]] (Anthropic), [[gemini|Gemini]] (Google), [[grok|Grok]] (xAI)
- Abertos e alternativos: [[llama|Llama]] (Meta), [[mistral|Mistral]], [[deepseek|DeepSeek]] (raciocinio/custo), [[qwen|Qwen]] (Alibaba)
- [[ollama|Ollama]], [[lm_studio|LM Studio]] (rodar modelos local)
- [[hugging_face|Hugging Face]] (repositorio de modelos open source)

### Frameworks

- [[langchain|Langchain]] (orquestracao de LLMs)
- [[crewai|CrewAI]] (multi-agent)
- TensorFlow, PyTorch (treinamento)
- Scikit-learn (ML classico)

### Infraestrutura

- AWS Bedrock
- LangFuse (observabilidade de LLM)
- GPUs (NVIDIA, TPUs Google)

### Ferramentas Praticas

- [[chatgpt|ChatGPT]], Claude, Gemini (assistentes)
- [[napkin|Napkin]] (infograficos com IA)
- GitHub Copilot, Cursor (code assistants)

## Desafios

- **Alucinacoes:** Gera informacao plausivel mas incorreta
- **Vieses:** Reproduz preconceitos dos dados de treinamento
- **Custo:** Treinamento e inferencia sao caros (GPUs, tokens)
- **Explicabilidade:** Dificil entender por que o modelo decidiu algo
- **Privacidade:** Dados sensiveis no treinamento e nas queries
- **Regulacao:** LGPD, EU AI Act, compliance

## Relacionamentos

- **Tipo de:** Software de AI
- **Precursora:** Estatistica Multivariada
- **Areas:** Machine Learning, Deep Learning, PLN, Computer Vision, Generative AI, AI Agents
- **Aplicacao:** Software com AI Aplicada
- **Futuro:** Engenharia de AI (a construir)

Voltar para Conhecimentos
