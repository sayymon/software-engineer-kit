---
id: avaliacao_de_prompts
tipo: caso-de-uso
nome: Avaliação de prompts
aliases:
  - avaliacao-prompts
descricao: Comparar versões de prompts e modelos com testes repetíveis.
funcionalidadesNecessarias:
  - "[[avaliacao_de_qualidade|Avaliação de qualidade]]"
  - "[[comparacao_de_modelos|Comparação de modelos]]"
categoriasRelacionadas:
  - "[[evals_observabilidade|Evals e observabilidade]]"
ferramentasRecomendadas:
  - "[[promptfoo|Promptfoo]]"
  - "[[langfuse|LangFuse]]"
modelosRecomendados:
  - "[[claude_opus_5_5|Claude Opus 5.5]]"
  - "[[gpt_5_5|GPT-5.5]]"
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
macro: "[[ia_aplicada_e_agentes|IA aplicada e agentes]]"
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
  - id: eval-regressao-prompts
    nome: Regressão de prompts
    descricao: Suíte de casos que roda a cada mudança de prompt.
    funcionalidades:
      - "[[avaliacao_de_qualidade|Avaliação de qualidade]]"
      - "[[comparacao_de_modelos|Comparação de modelos]]"
    herdaFerramentas: true
    parametros:
      - chave: Ambiente de execução
        valor: Etapa de CI a cada mudança de prompt
        fonte: editorial
      - chave: Escala típica
        valor: Centenas de casos de teste
        fonte: editorial
      - chave: Tipo de juiz
        valor: Asserções determinísticas
        fonte: editorial
  - id: eval-comparar-modelos
    nome: Comparação de modelos
    descricao: Mesma bateria em vários modelos com custo e qualidade lado a lado.
    funcionalidades:
      - "[[comparacao_de_modelos|Comparação de modelos]]"
      - "[[avaliacao_de_qualidade|Avaliação de qualidade]]"
    herdaFerramentas: false
    maisBarata:
      - "[[lmarena|LMArena]]"
      - tabela:openrouter-rankings
      - tabela:aider-leaderboard
    custoBeneficio:
      - "[[artificial_analysis|Artificial Analysis]]"
      - tabela:livebench
      - tabela:vellum-leaderboard
    qualidadeMaxima:
      - "[[epoch_ai|Epoch AI]]"
      - tabela:scale-seal-leaderboards
      - tabela:openllm-leaderboard
    justificativaFerramentas: "Muda Tipo de juiz para métricas de custo e qualidade: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Painel de ranking e bateria própria
        fonte: editorial
      - chave: Escala típica
        valor: Vários modelos lado a lado
        fonte: editorial
      - chave: Tipo de juiz
        valor: Métricas de custo e qualidade
        fonte: editorial
  - id: eval-llm-juiz
    nome: LLM como juiz
    descricao: Modelo avaliador com rubrica e calibração humana.
    funcionalidades:
      - "[[avaliacao_de_qualidade|Avaliação de qualidade]]"
      - "[[raciocinio|Raciocínio]]"
    herdaFerramentas: false
    maisBarata:
      - "[[promptfoo|Promptfoo]]"
      - tabela:deepeval
      - tabela:ragas
    custoBeneficio:
      - tabela:braintrust
      - "[[langfuse|LangFuse]]"
      - tabela:langsmith
    qualidadeMaxima:
      - "[[microsoft_foundry|Microsoft Foundry]]"
      - tabela:arize-phoenix
      - tabela:datadog-llm-observability
    justificativaFerramentas: "Muda Tipo de juiz para modelo avaliador com rubrica: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Serviço de avaliação com rubrica
        fonte: editorial
      - chave: Escala típica
        valor: Amostra calibrada com revisão humana
        fonte: editorial
      - chave: Tipo de juiz
        valor: Modelo avaliador com rubrica
        fonte: editorial
tags:
  - caso-de-uso
  - ia
---
# Avaliação de prompts
## 📝 Descrição
Comparar versões de prompts e modelos com testes repetíveis.
## ⏰ Quando aplicar
- Mudanças de prompt em produção
- Escolha entre modelos
## 🧩 Funcionalidades necessárias
- [[avaliacao_de_qualidade|Avaliação de qualidade]] - Medição da qualidade das respostas com testes, métricas e juízes automáticos.
- [[comparacao_de_modelos|Comparação de modelos]] - Execução do mesmo conjunto de entradas em vários modelos para escolher o mais adequado.
## ✅ Recomendações
- [[promptfoo|Promptfoo]] - Testes de prompts em lote com comparação entre modelos
- [[langfuse|LangFuse]] - Datasets e avaliações ligados aos traces
- [[claude_opus_5_5|Claude Opus 5.5]] - Juiz de qualidade para respostas complexas
- [[gpt_5_5|GPT-5.5]] - Juiz alternativo para reduzir viés de um único modelo
## 🧬 Variações
- **Regressão de prompts** (`eval-regressao-prompts`): Suíte de casos que roda a cada mudança de prompt. Funcionalidades: [[avaliacao_de_qualidade|Avaliação de qualidade]], [[comparacao_de_modelos|Comparação de modelos]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Ambiente de execução: Etapa de CI a cada mudança de prompt; Escala típica: Centenas de casos de teste; Tipo de juiz: Asserções determinísticas.
- **Comparação de modelos** (`eval-comparar-modelos`): Mesma bateria em vários modelos com custo e qualidade lado a lado. Funcionalidades: [[comparacao_de_modelos|Comparação de modelos]], [[avaliacao_de_qualidade|Avaliação de qualidade]]. Mais barata: [[lmarena|LMArena]], OpenRouter Rankings, Aider LLM Leaderboards. Custo-benefício: [[artificial_analysis|Artificial Analysis]], LiveBench, Vellum LLM Leaderboard. Qualidade máxima: [[epoch_ai|Epoch AI]], Scale SEAL Leaderboards, Open LLM Leaderboard. Por que difere do caso: Muda Tipo de juiz para métricas de custo e qualidade: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Painel de ranking e bateria própria; Escala típica: Vários modelos lado a lado; Tipo de juiz: Métricas de custo e qualidade.
- **LLM como juiz** (`eval-llm-juiz`): Modelo avaliador com rubrica e calibração humana. Funcionalidades: [[avaliacao_de_qualidade|Avaliação de qualidade]], [[raciocinio|Raciocínio]]. Mais barata: [[promptfoo|Promptfoo]], DeepEval, Ragas. Custo-benefício: Braintrust, [[langfuse|LangFuse]], LangSmith. Qualidade máxima: [[microsoft_foundry|Microsoft Foundry]], Arize Phoenix, Datadog LLM Observability. Por que difere do caso: Muda Tipo de juiz para modelo avaliador com rubrica: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Serviço de avaliação com rubrica; Escala típica: Amostra calibrada com revisão humana; Tipo de juiz: Modelo avaliador com rubrica.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[promptfoo|Promptfoo]], Ragas, DeepEval
- **Custo-benefício:** [[langfuse|LangFuse]], Arize Phoenix, Braintrust
- **Qualidade máxima:** [[microsoft_foundry|Microsoft Foundry]], LangSmith, Datadog LLM Observability
## ⚖️ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** custo. Avaliações rodam muitas vezes, e o gasto por rodada define a frequência com que se testa.
## 🔗 Relacionamentos
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Casos de Uso de IA
- **Macro:** [[ia_aplicada_e_agentes|IA aplicada e agentes]]
