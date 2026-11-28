---
id: resposta_a_incidentes
tipo: caso-de-uso
nome: Resposta a incidentes
aliases: []
descricao: Detectar, comunicar, mitigar e aprender com incidentes em produção.
funcionalidadesNecessarias:
  - "[[geracao_de_texto|Geração de texto]]"
  - "[[raciocinio|Raciocínio]]"
  - "[[tracing|Tracing]]"
  - "[[avaliacao_de_qualidade|Avaliação de qualidade]]"
  - "[[automacao_de_workflow|Automação de workflow]]"
categoriasRelacionadas:
  - "[[observabilidade_apm|Observabilidade e APM]]"
  - "[[status_incidentes|Status e incidentes]]"
  - "[[agente_codigo|Agente de código]]"
  - "[[wiki_base_conhecimento|Wiki e base de conhecimento]]"
ferramentasRecomendadas:
  - "[[grafana_cloud|Grafana Cloud]]"
  - "[[instatus|Instatus]]"
  - "[[github_copilot|GitHub Copilot]]"
  - "[[cursor|Cursor]]"
  - "[[kiro_ide|Kiro-IDE]]"
modelosRecomendados: []
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
  - devops-infra
  - software-saas
nicho: ""
nivel: caso
eixo: tarefa
macro: "[[infraestrutura_devops_e_seguranca|Infraestrutura, DevOps e segurança]]"
faixasPadrao:
  maisBarata:
    - "[[downdetector|Downdetector]]"
    - tabela:isitdownrightnow
    - tabela:down-for-everyone
  custoBeneficio:
    - "[[instatus|Instatus]]"
    - tabela:uptimerobot
    - tabela:hetrixtools
  qualidadeMaxima:
    - "[[atlassian_statuspage|Atlassian Statuspage]]"
    - tabela:incident-io
    - tabela:pagerduty
variacoes:
  - id: inc-deteccao-alertas
    nome: Detecção e alertas
    descricao: Alertas com baixo ruído ligados a SLO.
    funcionalidades:
      - "[[tracing|Tracing]]"
      - "[[avaliacao_de_qualidade|Avaliação de qualidade]]"
    herdaFerramentas: false
    maisBarata:
      - "[[opentelemetry|OpenTelemetry]]"
      - "[[prometheus|Prometheus]]"
      - tabela:signoz
    custoBeneficio:
      - "[[grafana_cloud|Grafana Cloud]]"
      - "[[sentry|Sentry]]"
      - tabela:better-stack
    qualidadeMaxima:
      - "[[datadog|Datadog]]"
      - "[[new_relic|New Relic (ferramenta)]]"
      - tabela:dynatrace
    justificativaFerramentas: "Muda Fase do incidente para detecção: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Agente de métricas e regras de alerta
        fonte: editorial
      - chave: Escala típica
        valor: Alertas ligados a SLO
        fonte: editorial
      - chave: Fase do incidente
        valor: Detecção
        fonte: editorial
  - id: inc-plantao-escalonamento
    nome: Plantão e escalonamento
    descricao: Escala, chamada e reconhecimento do alerta.
    funcionalidades:
      - "[[automacao_de_workflow|Automação de workflow]]"
      - "[[human_in_the_loop_funcionalidade|Human in the loop]]"
    herdaFerramentas: true
    parametros:
      - chave: Ambiente de execução
        valor: Serviço de escala e chamada
        fonte: editorial
      - chave: Escala típica
        valor: Equipe de plantão rotativa
        fonte: editorial
      - chave: Fase do incidente
        valor: Escalonamento do alerta
        fonte: editorial
  - id: inc-comunicacao-status
    nome: Comunicação e página de status
    descricao: Mensagem a clientes e atualização pública.
    funcionalidades:
      - "[[geracao_de_texto|Geração de texto]]"
      - "[[saida_estruturada|Saída estruturada]]"
    herdaFerramentas: false
    maisBarata:
      - tabela:uptimerobot
      - tabela:hetrixtools
      - tabela:isitdownrightnow
    custoBeneficio:
      - "[[instatus|Instatus]]"
      - "[[atlassian_statuspage|Atlassian Statuspage]]"
      - tabela:better-stack
    qualidadeMaxima:
      - tabela:incident-io
      - tabela:pagerduty
      - tabela:rootly
    justificativaFerramentas: "Muda Fase do incidente para comunicação durante o incidente: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Página de status pública
        fonte: editorial
      - chave: Escala típica
        valor: Clientes afetados
        fonte: editorial
      - chave: Fase do incidente
        valor: Comunicação durante o incidente
        fonte: editorial
    verificadoEm: 2026-11-23
  - id: inc-investigacao-agente
    nome: Investigação assistida
    descricao: Hipóteses e consultas a logs sugeridas por agente.
    funcionalidades:
      - "[[raciocinio|Raciocínio]]"
      - "[[contexto_longo|Contexto longo]]"
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
    justificativaFerramentas: "Muda Fase do incidente para investigação com hipóteses: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Terminal com acesso somente leitura a logs
        fonte: editorial
      - chave: Escala típica
        valor: Um incidente ativo
        fonte: editorial
      - chave: Fase do incidente
        valor: Investigação com hipóteses
        fonte: editorial
  - id: inc-pos-mortem
    nome: Pós-mortem
    descricao: Linha do tempo, causas e ações corretivas.
    funcionalidades:
      - "[[geracao_de_texto|Geração de texto]]"
      - "[[raciocinio|Raciocínio]]"
    herdaFerramentas: false
    maisBarata:
      - "[[bookstack|BookStack]]"
      - tabela:outline
      - tabela:docmost
    custoBeneficio:
      - "[[notion|Notion]]"
      - tabela:slite
      - tabela:coda
    qualidadeMaxima:
      - "[[confluence|Confluence (ferramenta)]]"
      - tabela:guru
      - tabela:microsoft-sharepoint
    justificativaFerramentas: "Muda Fase do incidente para aprendizado e ações corretivas: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Wiki da equipe
        fonte: editorial
      - chave: Escala típica
        valor: Um documento por incidente
        fonte: editorial
      - chave: Fase do incidente
        valor: Aprendizado e ações corretivas
        fonte: editorial
tags:
  - caso-de-uso
  - ferramenta
---
# Resposta a incidentes
## 📝 Descrição
Detectar, comunicar, mitigar e aprender com incidentes em produção.
## ⏰ Quando aplicar
- Plantão de equipe de produto
- Incidente com impacto ao cliente
## 🧩 Funcionalidades necessárias
- [[geracao_de_texto|Geração de texto]] - Produção de texto livre ou orientado por instruções, de rascunhos a respostas longas.
- [[raciocinio|Raciocínio]] - Resolução de problemas em várias etapas, com planejamento, lógica e matemática.
- [[tracing|Tracing]] - Registro detalhado de cada chamada de modelo e ferramenta, com tempo, custo e entrada e saída.
- [[avaliacao_de_qualidade|Avaliação de qualidade]] - Medição da qualidade das respostas com testes, métricas e juízes automáticos.
- [[automacao_de_workflow|Automação de workflow]] - Execução automática de processos entre sistemas, com gatilhos e ações.
## ✅ Recomendações
- [[grafana_cloud|Grafana Cloud]] - Faixa custo-benefício em [[observabilidade_apm|Observabilidade e APM]].
- [[instatus|Instatus]] - Faixa custo-benefício em [[status_incidentes|Status e incidentes]].
- [[github_copilot|GitHub Copilot]] - Faixa custo-benefício em [[agente_codigo|Agente de código]].
- [[cursor|Cursor]] - Faixa custo-benefício em [[agente_codigo|Agente de código]].
- [[kiro_ide|Kiro-IDE]] - Faixa custo-benefício em [[agente_codigo|Agente de código]].
## 🧬 Variações
- **Detecção e alertas** (`inc-deteccao-alertas`): Alertas com baixo ruído ligados a SLO. Funcionalidades: [[tracing|Tracing]], [[avaliacao_de_qualidade|Avaliação de qualidade]]. Mais barata: [[opentelemetry|OpenTelemetry]], Prometheus, SigNoz. Custo-benefício: [[grafana_cloud|Grafana Cloud]], Sentry, Better Stack. Qualidade máxima: [[datadog|Datadog]], [[new_relic|New Relic (ferramenta)]], Dynatrace. Por que difere do caso: Muda Fase do incidente para detecção: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Agente de métricas e regras de alerta; Escala típica: Alertas ligados a SLO; Fase do incidente: Detecção.
- **Plantão e escalonamento** (`inc-plantao-escalonamento`): Escala, chamada e reconhecimento do alerta. Funcionalidades: [[automacao_de_workflow|Automação de workflow]], [[human_in_the_loop_funcionalidade|Human in the loop]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Ambiente de execução: Serviço de escala e chamada; Escala típica: Equipe de plantão rotativa; Fase do incidente: Escalonamento do alerta.
- **Comunicação e página de status** (`inc-comunicacao-status`): Mensagem a clientes e atualização pública. Funcionalidades: [[geracao_de_texto|Geração de texto]], [[saida_estruturada|Saída estruturada]]. Mais barata: UptimeRobot, HetrixTools, IsItDownRightNow. Custo-benefício: [[instatus|Instatus]], [[atlassian_statuspage|Atlassian Statuspage]], Better Stack. Qualidade máxima: incident.io, PagerDuty, Rootly. Por que difere do caso: Muda Fase do incidente para comunicação durante o incidente: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Página de status pública; Escala típica: Clientes afetados; Fase do incidente: Comunicação durante o incidente.
- **Investigação assistida** (`inc-investigacao-agente`): Hipóteses e consultas a logs sugeridas por agente. Funcionalidades: [[raciocinio|Raciocínio]], [[contexto_longo|Contexto longo]]. Mais barata: OpenCode, Aider, Cline. Custo-benefício: [[github_copilot|GitHub Copilot]], [[cursor|Cursor]], [[kiro_ide|Kiro-IDE]]. Qualidade máxima: [[claude_code|Claude-Code]], Codex CLI, Gemini CLI. Por que difere do caso: Muda Fase do incidente para investigação com hipóteses: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Terminal com acesso somente leitura a logs; Escala típica: Um incidente ativo; Fase do incidente: Investigação com hipóteses.
- **Pós-mortem** (`inc-pos-mortem`): Linha do tempo, causas e ações corretivas. Funcionalidades: [[geracao_de_texto|Geração de texto]], [[raciocinio|Raciocínio]]. Mais barata: [[bookstack|BookStack]], Outline, Docmost. Custo-benefício: [[notion|Notion]], Slite, Coda. Qualidade máxima: [[confluence|Confluence (ferramenta)]], Guru, Microsoft SharePoint. Por que difere do caso: Muda Fase do incidente para aprendizado e ações corretivas: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Wiki da equipe; Escala típica: Um documento por incidente; Fase do incidente: Aprendizado e ações corretivas.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[downdetector|Downdetector]], IsItDownRightNow, Down For Everyone Or Just Me
- **Custo-benefício:** [[instatus|Instatus]], UptimeRobot, HetrixTools
- **Qualidade máxima:** [[atlassian_statuspage|Atlassian Statuspage]], incident.io, PagerDuty
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** custo. Plantão e alertas somam licenças por pessoa e o custo mensal decide em equipes pequenas.
## 🔗 Relacionamentos
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
- **Macro:** [[infraestrutura_devops_e_seguranca|Infraestrutura, DevOps e segurança]]
