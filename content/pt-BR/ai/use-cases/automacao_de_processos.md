---
id: automacao_de_processos
tipo: caso-de-uso
nome: Automação de processos
aliases:
  - automacao-processos
descricao: Automatizar processos de negócio entre aplicativos com apoio de IA.
funcionalidadesNecessarias:
  - "[[automacao_de_workflow|Automação de workflow]]"
  - "[[integracao_de_apis|Integração de APIs]]"
  - "[[tool_use_funcionalidade|Tool use]]"
categoriasRelacionadas:
  - "[[automacao_nocode|Automação e no-code]]"
  - "[[mcp_integracoes|MCP e integrações]]"
  - "[[orquestracao_workflows_sagas|Orquestração de workflows e sagas]]"
ferramentasRecomendadas:
  - "[[n8n|n8n]]"
  - "[[composio|Composio]]"
modelosRecomendados:
  - "[[claude_sonnet_5_5|Claude Sonnet 5.5]]"
  - "[[gpt_5_4_mini|GPT-5.4 mini]]"
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
macro: "[[automacao_e_integracoes|Automação e integrações]]"
faixasPadrao:
  maisBarata:
    - tabela:activepieces
    - tabela:node-red
    - tabela:windmill
  custoBeneficio:
    - "[[n8n|n8n]]"
    - tabela:make
    - tabela:pipedream
  qualidadeMaxima:
    - tabela:zapier
    - tabela:power-automate
    - tabela:workato
variacoes:
  - id: proc-integracao-saas
    nome: Integração entre SaaS
    descricao: Dados passando de um sistema para outro sem código próprio.
    funcionalidades:
      - "[[integracao_de_apis|Integração de APIs]]"
      - "[[automacao_de_workflow|Automação de workflow]]"
    herdaFerramentas: true
    parametros:
      - chave: Ambiente de execução
        valor: Plataforma de fluxos na nuvem
        fonte: editorial
      - chave: Escala típica
        valor: Dezenas de integrações entre SaaS
        fonte: editorial
      - chave: Participação humana
        valor: Nenhuma, roda sozinha
        fonte: editorial
  - id: proc-fluxo-aprovacao
    nome: Fluxo de aprovação
    descricao: Etapas com aprovação humana e notificação.
    funcionalidades:
      - "[[automacao_de_workflow|Automação de workflow]]"
      - "[[human_in_the_loop_funcionalidade|Human in the loop]]"
    herdaFerramentas: true
    parametros:
      - chave: Ambiente de execução
        valor: Plataforma de fluxos com notificação
        fonte: editorial
      - chave: Escala típica
        valor: Dezenas de solicitações por semana
        fonte: editorial
      - chave: Participação humana
        valor: Aprovação humana por etapa
        fonte: editorial
  - id: proc-agente-tarefas-repetitivas
    nome: Tarefas repetitivas com agente
    descricao: Rotina operacional executada por modelo com ferramentas.
    funcionalidades:
      - "[[automacao_de_workflow|Automação de workflow]]"
      - "[[tool_use_funcionalidade|Tool use]]"
    herdaFerramentas: false
    maisBarata:
      - tabela:mcp-reference-servers
      - tabela:mcpo
      - tabela:fastmcp
    custoBeneficio:
      - "[[n8n|n8n]]"
      - "[[composio|Composio]]"
      - tabela:docker-mcp-toolkit
    qualidadeMaxima:
      - "[[aws_mcp_servers|AWS MCP Servers]]"
      - "[[atlassian_remote_mcp|Atlassian Remote MCP]]"
      - "[[github_mcp_server|GitHub MCP Server]]"
    justificativaFerramentas: "Muda Participação humana para revisão por amostragem: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Agente com servidores MCP
        fonte: editorial
      - chave: Escala típica
        valor: Rotina operacional diária
        fonte: editorial
      - chave: Participação humana
        valor: Revisão por amostragem
        fonte: editorial
tags:
  - caso-de-uso
  - ia
---
# Automação de processos
## 📝 Descrição
Automatizar processos de negócio entre aplicativos com apoio de IA.
## ⏰ Quando aplicar
- Fluxos repetitivos entre sistemas
- Triagem e roteamento de pedidos
## 🧩 Funcionalidades necessárias
- [[automacao_de_workflow|Automação de workflow]] - Execução automática de processos entre sistemas, com gatilhos e ações.
- [[integracao_de_apis|Integração de APIs]] - Conexão de modelos e agentes a APIs e serviços de terceiros.
- [[tool_use_funcionalidade|Tool use]] - Capacidade do modelo de chamar funções e ferramentas externas com argumentos estruturados.
## ✅ Recomendações
- [[n8n|n8n]] - Editor visual com hospedagem própria e nós de IA
- [[composio|Composio]] - Conectores prontos para agentes agirem em serviços
- [[claude_sonnet_5_5|Claude Sonnet 5.5]] - Decisões e extração dentro dos fluxos
- [[gpt_5_4_mini|GPT-5.4 mini]] - Passos simples de classificação com custo baixo
## 🧬 Variações
- **Integração entre SaaS** (`proc-integracao-saas`): Dados passando de um sistema para outro sem código próprio. Funcionalidades: [[integracao_de_apis|Integração de APIs]], [[automacao_de_workflow|Automação de workflow]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Ambiente de execução: Plataforma de fluxos na nuvem; Escala típica: Dezenas de integrações entre SaaS; Participação humana: Nenhuma, roda sozinha.
- **Fluxo de aprovação** (`proc-fluxo-aprovacao`): Etapas com aprovação humana e notificação. Funcionalidades: [[automacao_de_workflow|Automação de workflow]], [[human_in_the_loop_funcionalidade|Human in the loop]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Ambiente de execução: Plataforma de fluxos com notificação; Escala típica: Dezenas de solicitações por semana; Participação humana: Aprovação humana por etapa.
- **Tarefas repetitivas com agente** (`proc-agente-tarefas-repetitivas`): Rotina operacional executada por modelo com ferramentas. Funcionalidades: [[automacao_de_workflow|Automação de workflow]], [[tool_use_funcionalidade|Tool use]]. Mais barata: Servidores MCP de referência, mcpo, FastMCP. Custo-benefício: [[n8n|n8n]], [[composio|Composio]], Docker MCP Toolkit. Qualidade máxima: [[aws_mcp_servers|AWS MCP Servers]], [[atlassian_remote_mcp|Atlassian Remote MCP]], [[github_mcp_server|GitHub MCP Server]]. Por que difere do caso: Muda Participação humana para revisão por amostragem: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Agente com servidores MCP; Escala típica: Rotina operacional diária; Participação humana: Revisão por amostragem.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** Activepieces, Node-RED, Windmill
- **Custo-benefício:** [[n8n|n8n]], Make, Pipedream
- **Qualidade máxima:** Zapier, Power Automate, Workato
## ⚖️ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** lock-in. Fluxos ficam presos à plataforma, e opções abertas ou hospedáveis facilitam migrar.
## 🔗 Relacionamentos
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Casos de Uso de IA
- **Macro:** [[automacao_e_integracoes|Automação e integrações]]
