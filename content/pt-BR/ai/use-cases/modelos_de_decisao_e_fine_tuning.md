---
id: modelos_de_decisao_e_fine_tuning
tipo: caso-de-uso
nome: Modelos de decisão e fine-tuning
aliases: []
descricao: Usar modelos de decisão tipada e ajuste fino para classificar, rotear e decidir com confiança.
funcionalidadesNecessarias:
  - "[[decisao_tipada_com_confianca|Decisão tipada com confiança]]"
  - "[[avaliacao_de_qualidade|Avaliação de qualidade]]"
  - "[[saida_estruturada|Saída estruturada]]"
  - "[[tool_use_funcionalidade|Tool use]]"
  - "[[fine_tuning|Fine-tuning]]"
categoriasRelacionadas:
  - "[[modelo_decisao|Modelo de decisão]]"
  - "[[ml_framework|Framework de ML]]"
  - "[[evals_observabilidade|Evals e observabilidade]]"
  - "[[inferencia_local|Inferência local]]"
ferramentasRecomendadas:
  - "[[langfuse|LangFuse]]"
  - "[[hugging_face|Hugging Face]]"
  - "[[microsoft_foundry|Microsoft Foundry]]"
  - "[[tensorflow_js|TensorFlow.js]]"
  - "[[promptfoo|Promptfoo]]"
modelosRecomendados:
  - "[[clef|Clef]]"
  - "[[clef_omni|Clef-omni]]"
  - "[[microsoft_decision_1_1|Microsoft-Decision-1.1]]"
criteriosDesempate:
  - custo
  - privacidade-de-dados
  - lock-in
criterioPadrao: custo
porte:
  - pequena
  - media
  - grande
segmentos:
  - dados-analytics
  - software-saas
nicho: ""
nivel: caso
eixo: tarefa
macro: "[[ia_aplicada_e_agentes|IA aplicada e agentes]]"
faixasPadrao:
  maisBarata:
    - "[[laya|Laya]]"
    - "[[clef_flash|Clef-flash]]"
    - "[[jev|Jev]]"
  custoBeneficio:
    - "[[clef|Clef]]"
    - "[[clef_omni|Clef-omni]]"
    - "[[microsoft_decision_1_1|Microsoft-Decision-1.1]]"
  qualidadeMaxima:
    - "[[gemini_decision_1|Gemini Decision 1]]"
    - "[[gpt_6_luna|GPT-6 Luna]]"
variacoes:
  - id: decisao-roteamento-intencao
    nome: Roteamento de intenção
    descricao: Escolher a ferramenta ou fila certa por mensagem.
    funcionalidades:
      - "[[decisao_tipada_com_confianca|Decisão tipada com confiança]]"
      - "[[saida_estruturada|Saída estruturada]]"
    herdaFerramentas: true
    parametros:
      - chave: Ambiente de execução
        valor: API de modelo de decisão
        fonte: editorial
      - chave: Escala típica
        valor: Milhares de mensagens por hora
        fonte: editorial
      - chave: Etapa do ciclo
        valor: Classificar a intenção e escolher a fila
        fonte: editorial
  - id: decisao-chamada-ferramenta
    nome: Decisão de chamar ferramenta
    descricao: Quando chamar, perguntar ou recusar.
    funcionalidades:
      - "[[decisao_tipada_com_confianca|Decisão tipada com confiança]]"
      - "[[tool_use_funcionalidade|Tool use]]"
    herdaFerramentas: true
    parametros:
      - chave: Ambiente de execução
        valor: API de modelo de decisão
        fonte: editorial
      - chave: Escala típica
        valor: Cada turno do agente
        fonte: editorial
      - chave: Etapa do ciclo
        valor: Escolher entre chamar, perguntar ou recusar
        fonte: editorial
  - id: decisao-fine-tuning
    nome: Ajuste fino de domínio
    descricao: Treinar com exemplos próprios para ganhar precisão.
    funcionalidades:
      - "[[fine_tuning|Fine-tuning]]"
      - "[[avaliacao_de_qualidade|Avaliação de qualidade]]"
    herdaFerramentas: false
    maisBarata:
      - "[[scikit_learn|scikit-learn]]"
      - "[[pytorch|PyTorch]]"
      - tabela:keras
    custoBeneficio:
      - "[[hugging_face|Hugging Face]]"
      - tabela:pytorch-lightning
      - "[[google_colab|Google Colab (ferramenta)]]"
    qualidadeMaxima:
      - tabela:aws-sagemaker
      - tabela:google-vertex-ai
      - tabela:deepspeed
    justificativaFerramentas: "Muda Etapa do ciclo para treino com dados próprios do domínio: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Notebook ou nuvem com GPU
        fonte: editorial
      - chave: Escala típica
        valor: Milhares de exemplos rotulados
        fonte: editorial
      - chave: Etapa do ciclo
        valor: Treino com dados próprios do domínio
        fonte: editorial
  - id: decisao-avaliacao
    nome: Avaliação de decisões
    descricao: Conjuntos de teste e métricas de acerto.
    funcionalidades:
      - "[[avaliacao_de_qualidade|Avaliação de qualidade]]"
      - "[[raciocinio|Raciocínio]]"
    herdaFerramentas: false
    maisBarata:
      - "[[promptfoo|Promptfoo]]"
      - tabela:ragas
      - tabela:deepeval
    custoBeneficio:
      - "[[langfuse|LangFuse]]"
      - tabela:arize-phoenix
      - tabela:braintrust
    qualidadeMaxima:
      - "[[microsoft_foundry|Microsoft Foundry]]"
      - tabela:langsmith
      - tabela:datadog-llm-observability
    justificativaFerramentas: "Muda Etapa do ciclo para medição de acerto e regressão: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Suíte de testes em CI
        fonte: editorial
      - chave: Escala típica
        valor: Conjunto de referência fixo
        fonte: editorial
      - chave: Etapa do ciclo
        valor: Medição de acerto e regressão
        fonte: editorial
  - id: decisao-self-hosted
    nome: Decisão em infraestrutura própria
    descricao: Modelo pequeno em servidor próprio para dados sensíveis.
    funcionalidades:
      - "[[execucao_local|Execução local]]"
      - "[[quantizacao_de_modelos|Quantização de modelos]]"
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
    justificativaFerramentas: "Muda Etapa do ciclo para dados sensíveis mantidos na infraestrutura: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Servidor próprio com modelo pequeno
        fonte: editorial
      - chave: Escala típica
        valor: Carga estável e previsível
        fonte: editorial
      - chave: Etapa do ciclo
        valor: Dados sensíveis mantidos na infraestrutura
        fonte: editorial
tags:
  - caso-de-uso
  - ia
---
# Modelos de decisão e fine-tuning
## 📝 Descrição
Usar modelos de decisão tipada e ajuste fino para classificar, rotear e decidir com confiança.
## ⏰ Quando aplicar
- Roteamento de intenção com confiança calibrada
- Classificação específica de domínio
## 🧩 Funcionalidades necessárias
- [[decisao_tipada_com_confianca|Decisão tipada com confiança]] - Responder perguntas fechadas (escolha, nota, verdadeiro ou falso) com probabilidade e confiança calibradas, prontas para o código ramificar.
- [[avaliacao_de_qualidade|Avaliação de qualidade]] - Medição da qualidade das respostas com testes, métricas e juízes automáticos.
- [[saida_estruturada|Saída estruturada]] - Respostas que seguem um esquema, como JSON validado, para uso direto por programas.
- [[tool_use_funcionalidade|Tool use]] - Capacidade do modelo de chamar funções e ferramentas externas com argumentos estruturados.
- [[fine_tuning|Fine-tuning]] - Ajuste de um modelo com dados próprios para um estilo ou tarefa específica.
## ✅ Recomendações
- [[langfuse|LangFuse]] - Faixa custo-benefício em [[evals_observabilidade|Evals e observabilidade]].
- [[hugging_face|Hugging Face]] - Faixa qualidade máxima em [[ml_framework|Framework de ML]].
- [[microsoft_foundry|Microsoft Foundry]] - Faixa qualidade máxima em [[evals_observabilidade|Evals e observabilidade]].
- [[tensorflow_js|TensorFlow.js]] - Faixa mais barata em [[ml_framework|Framework de ML]].
- [[promptfoo|Promptfoo]] - Faixa mais barata em [[evals_observabilidade|Evals e observabilidade]].
- [[clef|Clef]] - Modelo da faixa custo-benefício em [[modelo_decisao|Modelo de decisão]].
- [[clef_omni|Clef-omni]] - Modelo da faixa custo-benefício em [[modelo_decisao|Modelo de decisão]].
- [[microsoft_decision_1_1|Microsoft-Decision-1.1]] - Modelo da faixa custo-benefício em [[modelo_decisao|Modelo de decisão]].
## 🧬 Variações
- **Roteamento de intenção** (`decisao-roteamento-intencao`): Escolher a ferramenta ou fila certa por mensagem. Funcionalidades: [[decisao_tipada_com_confianca|Decisão tipada com confiança]], [[saida_estruturada|Saída estruturada]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Ambiente de execução: API de modelo de decisão; Escala típica: Milhares de mensagens por hora; Etapa do ciclo: Classificar a intenção e escolher a fila.
- **Decisão de chamar ferramenta** (`decisao-chamada-ferramenta`): Quando chamar, perguntar ou recusar. Funcionalidades: [[decisao_tipada_com_confianca|Decisão tipada com confiança]], [[tool_use_funcionalidade|Tool use]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Ambiente de execução: API de modelo de decisão; Escala típica: Cada turno do agente; Etapa do ciclo: Escolher entre chamar, perguntar ou recusar.
- **Ajuste fino de domínio** (`decisao-fine-tuning`): Treinar com exemplos próprios para ganhar precisão. Funcionalidades: [[fine_tuning|Fine-tuning]], [[avaliacao_de_qualidade|Avaliação de qualidade]]. Mais barata: [[scikit_learn|scikit-learn]], [[pytorch|PyTorch]], Keras. Custo-benefício: [[hugging_face|Hugging Face]], PyTorch Lightning, [[google_colab|Google Colab (ferramenta)]]. Qualidade máxima: Amazon SageMaker, Vertex AI, DeepSpeed. Por que difere do caso: Muda Etapa do ciclo para treino com dados próprios do domínio: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Notebook ou nuvem com GPU; Escala típica: Milhares de exemplos rotulados; Etapa do ciclo: Treino com dados próprios do domínio.
- **Avaliação de decisões** (`decisao-avaliacao`): Conjuntos de teste e métricas de acerto. Funcionalidades: [[avaliacao_de_qualidade|Avaliação de qualidade]], [[raciocinio|Raciocínio]]. Mais barata: [[promptfoo|Promptfoo]], Ragas, DeepEval. Custo-benefício: [[langfuse|LangFuse]], Arize Phoenix, Braintrust. Qualidade máxima: [[microsoft_foundry|Microsoft Foundry]], LangSmith, Datadog LLM Observability. Por que difere do caso: Muda Etapa do ciclo para medição de acerto e regressão: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Suíte de testes em CI; Escala típica: Conjunto de referência fixo; Etapa do ciclo: Medição de acerto e regressão.
- **Decisão em infraestrutura própria** (`decisao-self-hosted`): Modelo pequeno em servidor próprio para dados sensíveis. Funcionalidades: [[execucao_local|Execução local]], [[quantizacao_de_modelos|Quantização de modelos]]. Mais barata: [[ollama|Ollama]], [[lm_studio|LM Studio]], llama.cpp. Custo-benefício: Jan, GPT4All, Open WebUI. Qualidade máxima: vLLM, SGLang, TensorRT-LLM. Por que difere do caso: Muda Etapa do ciclo para dados sensíveis mantidos na infraestrutura: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Servidor próprio com modelo pequeno; Escala típica: Carga estável e previsível; Etapa do ciclo: Dados sensíveis mantidos na infraestrutura.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[laya|Laya]], [[clef_flash|Clef-flash]], [[jev|Jev]]
- **Custo-benefício:** [[clef|Clef]], [[clef_omni|Clef-omni]], [[microsoft_decision_1_1|Microsoft-Decision-1.1]]
- **Qualidade máxima:** [[gemini_decision_1|Gemini Decision 1]], [[gpt_6_luna|GPT-6 Luna]]
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** custo. Alto volume de decisões por dia faz o custo por chamada pesar.
## 🔗 Relacionamentos
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Casos de Uso de IA
- **Macro:** [[ia_aplicada_e_agentes|IA aplicada e agentes]]
