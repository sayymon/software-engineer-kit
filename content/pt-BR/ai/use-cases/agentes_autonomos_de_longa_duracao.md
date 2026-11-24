---
id: agentes_autonomos_de_longa_duracao
tipo: caso-de-uso
nome: Agentes autônomos de longa duração
aliases:
  - agentes-longa-duracao
descricao: Executar tarefas de várias horas com planejamento, ferramentas e poucas intervenções.
funcionalidadesNecessarias:
  - "[[raciocinio|Raciocínio]]"
  - "[[tool_use_funcionalidade|Tool use]]"
  - "[[uso_de_computador|Uso de computador]]"
  - "[[contexto_longo|Contexto longo]]"
  - "[[checkpoints_de_estado|Checkpoints de estado]]"
categoriasRelacionadas:
  - "[[agente_codigo|Agente de código]]"
  - "[[framework_agentes|Framework de agentes]]"
ferramentasRecomendadas:
  - "[[claude_code|Claude-Code]]"
  - "[[langgraph|LangGraph]]"
modelosRecomendados:
  - "[[claude_fable_5_2|Claude Fable 5.2]]"
  - "[[claude_opus_5_5|Claude Opus 5.5]]"
  - "[[gpt_6_2_astra|GPT-6.2 Astra]]"
criteriosDesempate:
  - lock-in
  - custo
  - privacidade-de-dados
criterioPadrao: lock-in
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
    - tabela:opencode
    - tabela:aider
    - tabela:cline
  custoBeneficio:
    - "[[github_copilot|GitHub Copilot]]"
    - "[[cursor|Cursor]]"
    - "[[kiro_ide|Kiro-IDE]]"
  qualidadeMaxima:
    - "[[claude_code|Claude-Code]]"
    - tabela:openai-codex
    - tabela:gemini-cli
variacoes:
  - id: longa-duracao-codigo
    nome: Tarefa longa de código
    descricao: Horas de trabalho com checkpoints, testes e retomada.
    funcionalidades:
      - "[[checkpoints_de_estado|Checkpoints de estado]]"
      - "[[edicao_de_codebase|Edição de codebase]]"
      - "[[contexto_longo|Contexto longo]]"
    herdaFerramentas: true
    parametros:
      - chave: Ambiente de execução
        valor: Terminal com checkpoints no repositório
        fonte: editorial
      - chave: Tempo típico de execução
        valor: Horas por tarefa
        fonte: editorial
      - chave: Nível de autonomia
        valor: Testa e retoma sozinho
        fonte: editorial
  - id: longa-duracao-pesquisa
    nome: Pesquisa em muitas etapas
    descricao: Coleta e síntese em dezenas de fontes com estado salvo.
    funcionalidades:
      - "[[checkpoints_de_estado|Checkpoints de estado]]"
      - "[[busca_na_web|Busca na web]]"
      - "[[memoria_persistente|Memória persistente]]"
    herdaFerramentas: false
    maisBarata:
      - "[[crewai|CrewAI]]"
      - "[[autogen|AutoGen]]"
      - tabela:smolagents
    custoBeneficio:
      - "[[langgraph|LangGraph]]"
      - "[[adk_agent_development_kit|ADK]]"
      - tabela:openai-agents-sdk
    qualidadeMaxima:
      - tabela:claude-agent-sdk
      - tabela:microsoft-agent-framework
      - tabela:amazon-bedrock-agentcore
    justificativaFerramentas: "Muda Nível de autonomia para plano, coleta e síntese: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Framework de agentes com estado salvo
        fonte: editorial
      - chave: Tempo típico de execução
        valor: Dezenas de fontes em várias etapas
        fonte: editorial
      - chave: Nível de autonomia
        valor: Plano, coleta e síntese
        fonte: editorial
  - id: longa-duracao-computador
    nome: Operação de computador
    descricao: Agente que usa navegador e aplicativos por tempo prolongado.
    funcionalidades:
      - "[[uso_de_computador|Uso de computador]]"
      - "[[checkpoints_de_estado|Checkpoints de estado]]"
    herdaFerramentas: false
    maisBarata:
      - "[[browser_use|Browser Use]]"
      - tabela:skyvern
      - tabela:stagehand
    custoBeneficio:
      - "[[manus|Manus]]"
      - tabela:perplexity-comet
      - tabela:genspark
    qualidadeMaxima:
      - "[[chatgpt|ChatGPT]]"
      - "[[claude|Claude AI]]"
      - "[[gemini|Gemini]]"
    justificativaFerramentas: "Muda Nível de autonomia para opera interface com revisão periódica: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Navegador e aplicativos em máquina isolada
        fonte: editorial
      - chave: Tempo típico de execução
        valor: Sessões prolongadas
        fonte: editorial
      - chave: Nível de autonomia
        valor: Opera interface com revisão periódica
        fonte: editorial
tags:
  - caso-de-uso
  - ia
---
# Agentes autônomos de longa duração
## 📝 Descrição
Executar tarefas de várias horas com planejamento, ferramentas e poucas intervenções.
## ⏰ Quando aplicar
- Migrações e pesquisas extensas
- Trabalho em segundo plano com revisão no fim
## 🧩 Funcionalidades necessárias
- [[raciocinio|Raciocínio]] - Resolução de problemas em várias etapas, com planejamento, lógica e matemática.
- [[tool_use_funcionalidade|Tool use]] - Capacidade do modelo de chamar funções e ferramentas externas com argumentos estruturados.
- [[uso_de_computador|Uso de computador]] - Operação de interfaces gráficas por captura de tela, cliques e digitação.
- [[contexto_longo|Contexto longo]] - Janela de contexto grande o bastante para ler bases de código, contratos e longos históricos de uma vez.
- [[checkpoints_de_estado|Checkpoints de estado]] - Gravação do estado de uma execução para retomar, repetir ou depurar.
## ✅ Recomendações
- [[claude_code|Claude-Code]] - Sessões longas com edição, testes e retomada
- [[claude_fable_5_2|Claude Fable 5.2]] - Projetado para trabalho agêntico de longa duração
- [[claude_opus_5_5|Claude Opus 5.5]] - Persistência e qualidade em tarefas extensas
- [[gpt_6_2_astra|GPT-6.2 Astra]] - Alternativa de topo para agentes autônomos
- [[langgraph|LangGraph]] - Checkpoints e retomada em agentes próprios
## 🧬 Variações
- **Tarefa longa de código** (`longa-duracao-codigo`): Horas de trabalho com checkpoints, testes e retomada. Funcionalidades: [[checkpoints_de_estado|Checkpoints de estado]], [[edicao_de_codebase|Edição de codebase]], [[contexto_longo|Contexto longo]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Ambiente de execução: Terminal com checkpoints no repositório; Tempo típico de execução: Horas por tarefa; Nível de autonomia: Testa e retoma sozinho.
- **Pesquisa em muitas etapas** (`longa-duracao-pesquisa`): Coleta e síntese em dezenas de fontes com estado salvo. Funcionalidades: [[checkpoints_de_estado|Checkpoints de estado]], [[busca_na_web|Busca na web]], [[memoria_persistente|Memória persistente]]. Mais barata: [[crewai|CrewAI]], [[autogen|AutoGen]], smolagents. Custo-benefício: [[langgraph|LangGraph]], [[adk_agent_development_kit|ADK]], OpenAI Agents SDK. Qualidade máxima: Claude Agent SDK, Microsoft Agent Framework, Amazon Bedrock AgentCore. Por que difere do caso: Muda Nível de autonomia para plano, coleta e síntese: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Framework de agentes com estado salvo; Tempo típico de execução: Dezenas de fontes em várias etapas; Nível de autonomia: Plano, coleta e síntese.
- **Operação de computador** (`longa-duracao-computador`): Agente que usa navegador e aplicativos por tempo prolongado. Funcionalidades: [[uso_de_computador|Uso de computador]], [[checkpoints_de_estado|Checkpoints de estado]]. Mais barata: [[browser_use|Browser Use]], Skyvern, Stagehand. Custo-benefício: [[manus|Manus]], Comet, Genspark. Qualidade máxima: [[chatgpt|ChatGPT]], [[claude|Claude AI]], [[gemini|Gemini]]. Por que difere do caso: Muda Nível de autonomia para opera interface com revisão periódica: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Navegador e aplicativos em máquina isolada; Tempo típico de execução: Sessões prolongadas; Nível de autonomia: Opera interface com revisão periódica.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** OpenCode, Aider, Cline
- **Custo-benefício:** [[github_copilot|GitHub Copilot]], [[cursor|Cursor]], [[kiro_ide|Kiro-IDE]]
- **Qualidade máxima:** [[claude_code|Claude-Code]], Codex CLI, Gemini CLI
## ⚖️ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** lock-in. Execuções longas dependem de estado e ferramentas, e manter o estado em formato próprio permite trocar o modelo por trás do agente.
## 🔗 Relacionamentos
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Casos de Uso de IA
- **Macro:** [[ia_aplicada_e_agentes|IA aplicada e agentes]]
