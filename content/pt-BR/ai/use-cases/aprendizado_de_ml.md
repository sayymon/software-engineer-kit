---
id: aprendizado_de_ml
tipo: caso-de-uso
nome: Aprendizado de ML
aliases:
  - aprendizado-ml
descricao: Estudar e praticar aprendizado de máquina com apoio de IA.
funcionalidadesNecessarias:
  - "[[geracao_de_codigo|Geração de código]]"
  - "[[raciocinio|Raciocínio]]"
  - "[[execucao_local|Execução local]]"
categoriasRelacionadas:
  - "[[ml_framework|Framework de ML]]"
  - "[[repositorio_modelos|Repositório de modelos]]"
ferramentasRecomendadas:
  - "[[tensorflow_js|TensorFlow.js]]"
  - "[[hugging_face|Hugging Face]]"
  - "[[claude|Claude AI]]"
modelosRecomendados:
  - "[[qwen3_8_27b|Qwen3.8-27B]]"
  - "[[gemma_4|Gemma 4]]"
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
macro: "[[pesquisa_e_conhecimento|Pesquisa e conhecimento]]"
faixasPadrao:
  maisBarata:
    - "[[scikit_learn|scikit-learn]]"
    - tabela:xgboost
    - tabela:lightgbm
  custoBeneficio:
    - "[[pytorch|PyTorch]]"
    - tabela:keras
    - tabela:tensorflow
  qualidadeMaxima:
    - "[[jax|JAX]]"
    - tabela:pytorch-lightning
    - tabela:deepspeed
variacoes:
  - id: ml-iniciante-notebooks
    nome: Trilha iniciante com notebooks
    descricao: Primeiros modelos com scikit-learn e explicações passo a passo.
    funcionalidades:
      - "[[geracao_de_codigo|Geração de código]]"
      - "[[raciocinio|Raciocínio]]"
    herdaFerramentas: true
    parametros:
      - chave: Linguagem ou runtime
        valor: Python com scikit-learn
        fonte: editorial
      - chave: Ambiente de execução
        valor: Notebook hospedado gratuito
        fonte: editorial
      - chave: Nível do aprendiz
        valor: Iniciante sem base de estatística
        fonte: editorial
  - id: ml-deep-learning
    nome: Deep learning prático
    descricao: Redes neurais com PyTorch ou TensorFlow e treino em GPU local ou nuvem.
    funcionalidades:
      - "[[geracao_de_codigo|Geração de código]]"
      - "[[execucao_local|Execução local]]"
    herdaFerramentas: false
    maisBarata:
      - "[[pytorch|PyTorch]]"
      - tabela:keras
      - tabela:tensorflow
    custoBeneficio:
      - "[[hugging_face|Hugging Face]]"
      - "[[google_colab|Google Colab (ferramenta)]]"
      - tabela:kaggle-notebooks
    qualidadeMaxima:
      - "[[jax|JAX]]"
      - tabela:pytorch-lightning
      - tabela:deepspeed
    justificativaFerramentas: "Muda Nível do aprendiz para quem já domina o básico de ML: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Linguagem ou runtime
        valor: Python com PyTorch ou TensorFlow
        fonte: editorial
      - chave: Ambiente de execução
        valor: GPU local ou na nuvem
        fonte: editorial
      - chave: Nível do aprendiz
        valor: Quem já domina o básico de ML
        fonte: editorial
  - id: ml-modelos-abertos-hub
    nome: Modelos abertos e Hugging Face
    descricao: Baixar, ajustar e publicar modelos de um repositório aberto.
    funcionalidades:
      - "[[fine_tuning|Fine-tuning]]"
      - "[[execucao_local|Execução local]]"
    herdaFerramentas: false
    maisBarata:
      - "[[hugging_face|Hugging Face]]"
      - tabela:ollama-library
      - tabela:modelscope
    custoBeneficio:
      - tabela:kaggle-models
      - tabela:replicate
      - tabela:openrouter
    qualidadeMaxima:
      - tabela:aws-bedrock
      - tabela:azure-ai-foundry-catalog
      - tabela:google-vertex-model-garden
    justificativaFerramentas: "Muda Nível do aprendiz para prático que ajusta e publica modelos: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Linguagem ou runtime
        valor: Python com biblioteca de modelos abertos
        fonte: editorial
      - chave: Ambiente de execução
        valor: Repositório aberto de modelos
        fonte: editorial
      - chave: Nível do aprendiz
        valor: Prático que ajusta e publica modelos
        fonte: editorial
tags:
  - caso-de-uso
  - ia
---
# Aprendizado de ML
## 📝 Descrição
Estudar e praticar aprendizado de máquina com apoio de IA.
## ⏰ Quando aplicar
- Estudo guiado de conceitos
- Experimentos e protótipos
## 🧩 Funcionalidades necessárias
- [[geracao_de_codigo|Geração de código]] - Criação de código novo a partir de descrições, exemplos ou testes.
- [[raciocinio|Raciocínio]] - Resolução de problemas em várias etapas, com planejamento, lógica e matemática.
- [[execucao_local|Execução local]] - Execução de modelos na própria máquina ou servidor, sem enviar dados a terceiros.
## ✅ Recomendações
- [[tensorflow_js|TensorFlow.js]] - Experimentos de ML direto no navegador
- [[hugging_face|Hugging Face]] - Modelos, datasets e cursos para praticar
- [[claude|Claude AI]] - Explicações pacientes e revisão de código de estudo
- [[qwen3_8_27b|Qwen3.8-27B]] - Modelo aberto para experimentar localmente
- [[gemma_4|Gemma 4]] - Modelo aberto leve para estudos e ajustes
## 🧬 Variações
- **Trilha iniciante com notebooks** (`ml-iniciante-notebooks`): Primeiros modelos com scikit-learn e explicações passo a passo. Funcionalidades: [[geracao_de_codigo|Geração de código]], [[raciocinio|Raciocínio]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Linguagem ou runtime: Python com scikit-learn; Ambiente de execução: Notebook hospedado gratuito; Nível do aprendiz: Iniciante sem base de estatística.
- **Deep learning prático** (`ml-deep-learning`): Redes neurais com PyTorch ou TensorFlow e treino em GPU local ou nuvem. Funcionalidades: [[geracao_de_codigo|Geração de código]], [[execucao_local|Execução local]]. Mais barata: [[pytorch|PyTorch]], Keras, TensorFlow. Custo-benefício: [[hugging_face|Hugging Face]], [[google_colab|Google Colab (ferramenta)]], Kaggle Notebooks. Qualidade máxima: [[jax|JAX]], PyTorch Lightning, DeepSpeed. Por que difere do caso: Muda Nível do aprendiz para quem já domina o básico de ML: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Linguagem ou runtime: Python com PyTorch ou TensorFlow; Ambiente de execução: GPU local ou na nuvem; Nível do aprendiz: Quem já domina o básico de ML.
- **Modelos abertos e Hugging Face** (`ml-modelos-abertos-hub`): Baixar, ajustar e publicar modelos de um repositório aberto. Funcionalidades: [[fine_tuning|Fine-tuning]], [[execucao_local|Execução local]]. Mais barata: [[hugging_face|Hugging Face]], Biblioteca do Ollama, ModelScope. Custo-benefício: Kaggle Models, Replicate, OpenRouter. Qualidade máxima: Amazon Bedrock, Catálogo do Azure AI Foundry, Vertex AI Model Garden. Por que difere do caso: Muda Nível do aprendiz para prático que ajusta e publica modelos: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Linguagem ou runtime: Python com biblioteca de modelos abertos; Ambiente de execução: Repositório aberto de modelos; Nível do aprendiz: Prático que ajusta e publica modelos.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[scikit_learn|scikit-learn]], XGBoost, LightGBM
- **Custo-benefício:** [[pytorch|PyTorch]], Keras, TensorFlow
- **Qualidade máxima:** [[jax|JAX]], PyTorch Lightning, DeepSpeed
## ⚖️ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** custo. Estudo e experimentação funcionam bem com ferramentas gratuitas e modelos abertos.
## 🔗 Relacionamentos
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Casos de Uso de IA
- **Macro:** [[pesquisa_e_conhecimento|Pesquisa e conhecimento]]
