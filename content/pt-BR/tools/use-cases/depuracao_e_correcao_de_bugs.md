---
id: depuracao_e_correcao_de_bugs
tipo: caso-de-uso
nome: Depuração e correção de bugs
aliases: []
descricao: Reproduzir, localizar e corrigir defeitos com logs, traces e agentes de código.
funcionalidadesNecessarias:
  - "[[raciocinio|Raciocínio]]"
  - "[[contexto_longo|Contexto longo]]"
  - "[[edicao_de_codebase|Edição de codebase]]"
  - "[[autocomplete_de_codigo|Autocomplete de código]]"
  - "[[tracing|Tracing]]"
categoriasRelacionadas:
  - "[[observabilidade_apm|Observabilidade e APM]]"
  - "[[agente_codigo|Agente de código]]"
  - "[[ide_ia|IDE com IA]]"
  - "[[modelo_fundacional|Modelo fundacional]]"
ferramentasRecomendadas:
  - "[[grafana_cloud|Grafana Cloud]]"
  - "[[github_copilot|GitHub Copilot]]"
  - "[[cursor|Cursor]]"
  - "[[kiro_ide|Kiro-IDE]]"
  - "[[datadog|Datadog]]"
modelosRecomendados:
  - "[[gpt_6_1_terra|GPT-6.1 Terra]]"
  - "[[gemini_3_8_flash|Gemini 3.8 Flash]]"
  - "[[claude_sonnet_5_5|Claude Sonnet 5.5]]"
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
  - desenvolvimento-software
nicho: ""
nivel: caso
eixo: tarefa
macro: "[[desenvolvimento_de_software|Desenvolvimento de software]]"
faixasPadrao:
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
variacoes:
  - id: bug-reproducao-logs
    nome: Reprodução e logs
    descricao: Isolar o defeito com logs e dados mínimos.
    funcionalidades:
      - "[[raciocinio|Raciocínio]]"
      - "[[contexto_longo|Contexto longo]]"
    herdaFerramentas: true
    parametros:
      - chave: Ambiente de execução
        valor: Ambiente local ou de homologação com logs
        fonte: editorial
      - chave: Escala típica
        valor: Um defeito por vez
        fonte: editorial
      - chave: Fase do diagnóstico
        valor: Reprodução mínima do defeito
        fonte: editorial
  - id: bug-correcao-agente
    nome: Correção com agente
    descricao: Patch proposto, testado e revisado.
    funcionalidades:
      - "[[edicao_de_codebase|Edição de codebase]]"
      - "[[raciocinio|Raciocínio]]"
    herdaFerramentas: false
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
    justificativaFerramentas: "Muda Fase do diagnóstico para patch proposto e testado: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Terminal no repositório
        fonte: editorial
      - chave: Escala típica
        valor: Um defeito por pull request
        fonte: editorial
      - chave: Fase do diagnóstico
        valor: Patch proposto e testado
        fonte: editorial
  - id: bug-depurador-ide
    nome: Depurador na IDE
    descricao: Pontos de parada, inspeção de estado e perfil.
    funcionalidades:
      - "[[autocomplete_de_codigo|Autocomplete de código]]"
      - "[[edicao_de_codebase|Edição de codebase]]"
    herdaFerramentas: false
    maisBarata:
      - tabela:zed
      - tabela:continue-dev
      - "[[visual_studio_code|Visual Studio Code]]"
    custoBeneficio:
      - "[[cursor|Cursor]]"
      - "[[github_copilot|GitHub Copilot]]"
      - tabela:windsurf
    qualidadeMaxima:
      - "[[kiro_ide|Kiro-IDE]]"
      - tabela:jetbrains-junie
      - tabela:google-antigravity
    justificativaFerramentas: "Muda Fase do diagnóstico para inspeção de estado e perfil: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Depurador da IDE
        fonte: editorial
      - chave: Escala típica
        valor: Uma sessão de depuração
        fonte: editorial
      - chave: Fase do diagnóstico
        valor: Inspeção de estado e perfil
        fonte: editorial
  - id: bug-erros-em-producao
    nome: Erros em produção
    descricao: Agrupamento de exceções com contexto de release.
    funcionalidades:
      - "[[tracing|Tracing]]"
      - "[[raciocinio|Raciocínio]]"
    herdaFerramentas: false
    maisBarata:
      - tabela:signoz
      - "[[opentelemetry|OpenTelemetry]]"
      - tabela:prometheus
    custoBeneficio:
      - tabela:better-stack
      - "[[grafana_cloud|Grafana Cloud]]"
      - tabela:dynatrace
    qualidadeMaxima:
      - tabela:sentry
      - "[[datadog|Datadog]]"
      - "[[new_relic|New Relic (ferramenta)]]"
    justificativaFerramentas: "Muda Fase do diagnóstico para agrupamento de exceções por release: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Produção com agente de coleta
        fonte: editorial
      - chave: Escala típica
        valor: Milhares de eventos por dia
        fonte: editorial
      - chave: Fase do diagnóstico
        valor: Agrupamento de exceções por release
        fonte: editorial
  - id: bug-causa-raiz
    nome: Análise de causa raiz
    descricao: Linha do tempo e hipóteses ranqueadas por evidência.
    funcionalidades:
      - "[[raciocinio|Raciocínio]]"
      - "[[contexto_longo|Contexto longo]]"
    herdaFerramentas: false
    maisBarata:
      - "[[gemma_4|Gemma 4]]"
      - "[[claude_haiku_5_5|Claude Haiku 5.5]]"
      - "[[qwen3_8_flash|Qwen3.8-Flash]]"
    custoBeneficio:
      - "[[gpt_6_1_terra|GPT-6.1 Terra]]"
      - "[[gemini_3_8_flash|Gemini 3.8 Flash]]"
      - "[[claude_sonnet_5_5|Claude Sonnet 5.5]]"
    qualidadeMaxima:
      - "[[claude_opus_5_5|Claude Opus 5.5]]"
      - "[[gpt_6_2_astra|GPT-6.2 Astra]]"
      - "[[gemini_4_neon|Gemini 4 Neon]]"
    justificativaFerramentas: "Muda Fase do diagnóstico para hipóteses ranqueadas por evidência: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Modelo de linguagem com contexto de logs
        fonte: editorial
      - chave: Escala típica
        valor: Incidente com várias fontes de dados
        fonte: editorial
      - chave: Fase do diagnóstico
        valor: Hipóteses ranqueadas por evidência
        fonte: editorial
tags:
  - caso-de-uso
  - ferramenta
---
# Depuração e correção de bugs
## 📝 Descrição
Reproduzir, localizar e corrigir defeitos com logs, traces e agentes de código.
## ⏰ Quando aplicar
- Bug em produção
- Falha intermitente de teste
## 🧩 Funcionalidades necessárias
- [[raciocinio|Raciocínio]] - Resolução de problemas em várias etapas, com planejamento, lógica e matemática.
- [[contexto_longo|Contexto longo]] - Janela de contexto grande o bastante para ler bases de código, contratos e longos históricos de uma vez.
- [[edicao_de_codebase|Edição de codebase]] - Alteração coordenada de vários arquivos de um repositório, com leitura de contexto e execução de comandos.
- [[autocomplete_de_codigo|Autocomplete de código]] - Sugestões de código em linha, enquanto a pessoa digita.
- [[tracing|Tracing]] - Registro detalhado de cada chamada de modelo e ferramenta, com tempo, custo e entrada e saída.
## ✅ Recomendações
- [[grafana_cloud|Grafana Cloud]] - Faixa custo-benefício em [[observabilidade_apm|Observabilidade e APM]].
- [[github_copilot|GitHub Copilot]] - Faixa custo-benefício em [[agente_codigo|Agente de código]].
- [[cursor|Cursor]] - Faixa custo-benefício em [[agente_codigo|Agente de código]].
- [[kiro_ide|Kiro-IDE]] - Faixa custo-benefício em [[agente_codigo|Agente de código]].
- [[datadog|Datadog]] - Faixa qualidade máxima em [[observabilidade_apm|Observabilidade e APM]].
- [[gpt_6_1_terra|GPT-6.1 Terra]] - Modelo da faixa custo-benefício em [[modelo_fundacional|Modelo fundacional]].
- [[gemini_3_8_flash|Gemini 3.8 Flash]] - Modelo da faixa custo-benefício em [[modelo_fundacional|Modelo fundacional]].
- [[claude_sonnet_5_5|Claude Sonnet 5.5]] - Modelo da faixa custo-benefício em [[modelo_fundacional|Modelo fundacional]].
## 🧬 Variações
- **Reprodução e logs** (`bug-reproducao-logs`): Isolar o defeito com logs e dados mínimos. Funcionalidades: [[raciocinio|Raciocínio]], [[contexto_longo|Contexto longo]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Ambiente de execução: Ambiente local ou de homologação com logs; Escala típica: Um defeito por vez; Fase do diagnóstico: Reprodução mínima do defeito.
- **Correção com agente** (`bug-correcao-agente`): Patch proposto, testado e revisado. Funcionalidades: [[edicao_de_codebase|Edição de codebase]], [[raciocinio|Raciocínio]]. Mais barata: OpenCode, Aider, Cline. Custo-benefício: [[github_copilot|GitHub Copilot]], [[cursor|Cursor]], [[kiro_ide|Kiro-IDE]]. Qualidade máxima: [[claude_code|Claude-Code]], Codex CLI, Gemini CLI. Por que difere do caso: Muda Fase do diagnóstico para patch proposto e testado: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Terminal no repositório; Escala típica: Um defeito por pull request; Fase do diagnóstico: Patch proposto e testado.
- **Depurador na IDE** (`bug-depurador-ide`): Pontos de parada, inspeção de estado e perfil. Funcionalidades: [[autocomplete_de_codigo|Autocomplete de código]], [[edicao_de_codebase|Edição de codebase]]. Mais barata: Zed, Continue, [[visual_studio_code|Visual Studio Code]]. Custo-benefício: [[cursor|Cursor]], [[github_copilot|GitHub Copilot]], Windsurf. Qualidade máxima: [[kiro_ide|Kiro-IDE]], JetBrains Junie, Google Antigravity. Por que difere do caso: Muda Fase do diagnóstico para inspeção de estado e perfil: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Depurador da IDE; Escala típica: Uma sessão de depuração; Fase do diagnóstico: Inspeção de estado e perfil.
- **Erros em produção** (`bug-erros-em-producao`): Agrupamento de exceções com contexto de release. Funcionalidades: [[tracing|Tracing]], [[raciocinio|Raciocínio]]. Mais barata: SigNoz, [[opentelemetry|OpenTelemetry]], Prometheus. Custo-benefício: Better Stack, [[grafana_cloud|Grafana Cloud]], Dynatrace. Qualidade máxima: Sentry, [[datadog|Datadog]], [[new_relic|New Relic (ferramenta)]]. Por que difere do caso: Muda Fase do diagnóstico para agrupamento de exceções por release: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Produção com agente de coleta; Escala típica: Milhares de eventos por dia; Fase do diagnóstico: Agrupamento de exceções por release.
- **Análise de causa raiz** (`bug-causa-raiz`): Linha do tempo e hipóteses ranqueadas por evidência. Funcionalidades: [[raciocinio|Raciocínio]], [[contexto_longo|Contexto longo]]. Mais barata: [[gemma_4|Gemma 4]], [[claude_haiku_5_5|Claude Haiku 5.5]], [[qwen3_8_flash|Qwen3.8-Flash]]. Custo-benefício: [[gpt_6_1_terra|GPT-6.1 Terra]], [[gemini_3_8_flash|Gemini 3.8 Flash]], [[claude_sonnet_5_5|Claude Sonnet 5.5]]. Qualidade máxima: [[claude_opus_5_5|Claude Opus 5.5]], [[gpt_6_2_astra|GPT-6.2 Astra]], [[gemini_4_neon|Gemini 4 Neon]]. Por que difere do caso: Muda Fase do diagnóstico para hipóteses ranqueadas por evidência: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Modelo de linguagem com contexto de logs; Escala típica: Incidente com várias fontes de dados; Fase do diagnóstico: Hipóteses ranqueadas por evidência.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[opentelemetry|OpenTelemetry]], Prometheus, SigNoz
- **Custo-benefício:** [[grafana_cloud|Grafana Cloud]], Sentry, Better Stack
- **Qualidade máxima:** [[datadog|Datadog]], [[new_relic|New Relic (ferramenta)]], Dynatrace
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** custo. Depuração com agente consome contexto grande, então o custo por correção decide.
## 🔗 Relacionamentos
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
- **Macro:** [[desenvolvimento_de_software|Desenvolvimento de software]]
