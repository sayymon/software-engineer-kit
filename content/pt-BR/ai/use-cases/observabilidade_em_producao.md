---
id: observabilidade_em_producao
tipo: caso-de-uso
nome: Observabilidade em produção
aliases:
  - observabilidade-producao
descricao: Acompanhar custo, latência, erros e qualidade de aplicações com IA em produção.
funcionalidadesNecessarias:
  - "[[tracing|Tracing]]"
  - "[[avaliacao_de_qualidade|Avaliação de qualidade]]"
categoriasRelacionadas:
  - "[[evals_observabilidade|Evals e observabilidade]]"
  - "[[orquestracao_llm|Orquestração de LLM]]"
ferramentasRecomendadas:
  - "[[langfuse|LangFuse]]"
  - "[[langgraph|LangGraph]]"
  - "[[adk_agent_development_kit|ADK]]"
modelosRecomendados:
  - "[[gemini_3_5_flash_lite|Gemini 3.5 Flash-Lite]]"
  - "[[claude_haiku_5_5|Claude Haiku 5.5]]"
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
macro: "[[infraestrutura_devops_e_seguranca|Infraestrutura, DevOps e segurança]]"
faixasPadrao:
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
variacoes:
  - id: obs-tracing-llm
    nome: Tracing de aplicações com LLM
    descricao: Rastro de cada chamada, custo e latência por requisição.
    funcionalidades:
      - "[[tracing|Tracing]]"
      - "[[avaliacao_de_qualidade|Avaliação de qualidade]]"
    herdaFerramentas: true
    parametros:
      - chave: Ambiente de execução
        valor: SDK na aplicação com LLM
        fonte: editorial
      - chave: Escala típica
        valor: Cada requisição ao modelo
        fonte: editorial
      - chave: Sinal observado
        valor: Custo, latência, entradas e saídas
        fonte: editorial
  - id: obs-apm-infra
    nome: APM e infraestrutura
    descricao: Métricas, logs e traces de serviços e servidores.
    funcionalidades:
      - "[[tracing|Tracing]]"
      - "[[avaliacao_de_qualidade|Avaliação de qualidade]]"
    herdaFerramentas: false
    maisBarata:
      - "[[opentelemetry|OpenTelemetry]]"
      - tabela:prometheus
      - tabela:signoz
    custoBeneficio:
      - "[[grafana_cloud|Grafana Cloud]]"
      - tabela:sentry
      - tabela:better-stack
    qualidadeMaxima:
      - "[[datadog|Datadog]]"
      - "[[new_relic|New Relic (ferramenta)]]"
      - tabela:dynatrace
    justificativaFerramentas: "Muda Sinal observado para métricas, logs e traces: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Agente nos servidores e serviços
        fonte: editorial
      - chave: Escala típica
        valor: Todos os serviços em produção
        fonte: editorial
      - chave: Sinal observado
        valor: Métricas, logs e traces
        fonte: editorial
  - id: obs-qualidade-respostas
    nome: Qualidade das respostas em produção
    descricao: Amostragem, avaliação automática e alerta de regressão.
    funcionalidades:
      - "[[avaliacao_de_qualidade|Avaliação de qualidade]]"
      - "[[tracing|Tracing]]"
    herdaFerramentas: false
    maisBarata:
      - tabela:ragas
      - tabela:deepeval
      - "[[promptfoo|Promptfoo]]"
    custoBeneficio:
      - tabela:braintrust
      - "[[langfuse|LangFuse]]"
      - tabela:langsmith
    qualidadeMaxima:
      - tabela:datadog-llm-observability
      - "[[microsoft_foundry|Microsoft Foundry]]"
      - tabela:arize-phoenix
    justificativaFerramentas: "Muda Sinal observado para qualidade e regressão das respostas: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Avaliação em lote sobre amostra de produção
        fonte: editorial
      - chave: Escala típica
        valor: Amostra diária de respostas
        fonte: editorial
      - chave: Sinal observado
        valor: Qualidade e regressão das respostas
        fonte: editorial
tags:
  - caso-de-uso
  - ia
---
# Observabilidade em produção
## 📝 Descrição
Acompanhar custo, latência, erros e qualidade de aplicações com IA em produção.
## ⏰ Quando aplicar
- Aplicações com tráfego real
- Investigação de regressões
## 🧩 Funcionalidades necessárias
- [[tracing|Tracing]] - Registro detalhado de cada chamada de modelo e ferramenta, com tempo, custo e entrada e saída.
- [[avaliacao_de_qualidade|Avaliação de qualidade]] - Medição da qualidade das respostas com testes, métricas e juízes automáticos.
## ✅ Recomendações
- [[langfuse|LangFuse]] - Traces, custos e avaliações em plataforma aberta
- [[langgraph|LangGraph]] - Integração nativa de traces em grafos
- [[adk_agent_development_kit|ADK]] - Telemetria para agentes em nuvem
- [[gemini_3_5_flash_lite|Gemini 3.5 Flash-Lite]] - Modelo barato para avaliar amostras de produção
- [[claude_haiku_5_5|Claude Haiku 5.5]] - Avaliador barato para amostras de produção
## 🧬 Variações
- **Tracing de aplicações com LLM** (`obs-tracing-llm`): Rastro de cada chamada, custo e latência por requisição. Funcionalidades: [[tracing|Tracing]], [[avaliacao_de_qualidade|Avaliação de qualidade]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Ambiente de execução: SDK na aplicação com LLM; Escala típica: Cada requisição ao modelo; Sinal observado: Custo, latência, entradas e saídas.
- **APM e infraestrutura** (`obs-apm-infra`): Métricas, logs e traces de serviços e servidores. Funcionalidades: [[tracing|Tracing]], [[avaliacao_de_qualidade|Avaliação de qualidade]]. Mais barata: [[opentelemetry|OpenTelemetry]], Prometheus, SigNoz. Custo-benefício: [[grafana_cloud|Grafana Cloud]], Sentry, Better Stack. Qualidade máxima: [[datadog|Datadog]], [[new_relic|New Relic (ferramenta)]], Dynatrace. Por que difere do caso: Muda Sinal observado para métricas, logs e traces: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Agente nos servidores e serviços; Escala típica: Todos os serviços em produção; Sinal observado: Métricas, logs e traces.
- **Qualidade das respostas em produção** (`obs-qualidade-respostas`): Amostragem, avaliação automática e alerta de regressão. Funcionalidades: [[avaliacao_de_qualidade|Avaliação de qualidade]], [[tracing|Tracing]]. Mais barata: Ragas, DeepEval, [[promptfoo|Promptfoo]]. Custo-benefício: Braintrust, [[langfuse|LangFuse]], LangSmith. Qualidade máxima: Datadog LLM Observability, [[microsoft_foundry|Microsoft Foundry]], Arize Phoenix. Por que difere do caso: Muda Sinal observado para qualidade e regressão das respostas: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Avaliação em lote sobre amostra de produção; Escala típica: Amostra diária de respostas; Sinal observado: Qualidade e regressão das respostas.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[promptfoo|Promptfoo]], Ragas, DeepEval
- **Custo-benefício:** [[langfuse|LangFuse]], Arize Phoenix, Braintrust
- **Qualidade máxima:** [[microsoft_foundry|Microsoft Foundry]], LangSmith, Datadog LLM Observability
## ⚖️ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** privacidade-de-dados. Traces contêm entradas e saídas reais de usuários, então o local de hospedagem pesa na escolha.
## 🔗 Relacionamentos
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Casos de Uso de IA
- **Macro:** [[infraestrutura_devops_e_seguranca|Infraestrutura, DevOps e segurança]]
