---
id: kiro_crew
tipo: ferramenta
nome: Kiro Crew
tipos:
  - SOFTWARE
  - PLATAFORMA
empresa: "[[aws|AWS]]"
aliases:
  - Kiro Crew
categorias:
  - "[[agente_codigo|Agente de código]]"
funcionalidades:
  - "[[multiagente|Multiagente]]"
  - "[[automacao_de_workflow|Automação de workflow]]"
  - "[[memoria_persistente|Memória persistente]]"
  - "[[tool_use_funcionalidade|Tool use]]"
  - "[[mcp|MCP]]"
casosDeUso:
  - "[[agentes_autonomos_de_longa_duracao|Agentes autônomos de longa duração]]"
  - "[[sistemas_multiagentes|Sistemas multiagentes]]"
  - "[[automacao_de_desenvolvimento|Automação de desenvolvimento]]"
modelos: []
modeloContratacao:
  - open-source
  - free
precoUSD: 0
plataformas:
  - macos
  - linux
  - windows
  - desktop
  - web
  - cli
  - self-hosted
linguagens:
  - python
porte:
  - pessoa-fisica
  - pequena
  - media
  - grande
segmentos:
  - desenvolvimento-software
restricoes:
  - agente padrão depende do Kiro CLI instalado e autenticado separadamente
  - "custo de uso (créditos Kiro) dos bots: não verificado"
  - informação pública limitada sobre planos específicos do Crew
dataVerificacao: 2026-11-23
fontePreco: https://github.com/kirodotdev/KiroCrew
precoMedio: 0
tags:
  - ferramenta
  - ia
  - agente-codigo
  - kiro
  - aws
  - multiagente
  - open-source
---
# Kiro Crew
## 📋 Informações Básicas
- **Tipos:** SOFTWARE, PLATAFORMA
- **Empresa/Fabricante:** [[aws|AWS]]
- **Website:** https://kiro.dev/crew/
- **Categorias:** [[agente_codigo|Agente de código]]
- **Modelo de contratação:** open-source, free
- **Preço (USD):** Gratuito, licença Apache-2.0 (campo license da API do GitHub, lido em 2026-11-23). O agente padrão roda no Kiro CLI e consome créditos da conta Kiro: custo de uso dos bots não verificado
- **Data de verificação:** 2026-11-23
- **Fonte do preço:** https://github.com/kirodotdev/KiroCrew
## 📝 Descrição
Workspace open source e persistente da equipe Kiro que coordena agentes entre sessões, com memória em Markdown, agendas, bots de longa duração, modo conductor e apps. Roda local ou em máquina remota, com app desktop, dashboard web, TUI e conexão com Slack e Discord.
## ⏰ Quando Utilizar
- Trabalho recorrente e sem data de término, como triagem de issues, saúde de CI e checagem de release (bots).
- Projetos com várias tarefas em paralelo coordenadas por um objetivo (modo conductor).
- Equipes que querem memória inspecionável: correções e rotinas viram arquivos Markdown editáveis.
### Quando NÃO utilizar
- Tarefas pontuais de uma conversa só: o [[kiro_cli|Kiro CLI]] ou o [[kiro_ide|Kiro IDE]] atendem com menos configuração.
- Quando o custo de créditos de bots sempre ativos precisa estar previsto (valor não verificado).
## 🖥 Compatibilidade e Plataformas
- **Plataformas:** macos, linux, windows, desktop, web, cli, self-hosted
- **Linguagens:** python
- **Porte:** pessoa-fisica, pequena, media, grande
- **Segmentos:** desenvolvimento-software
## 🔒 Restrições e Especificações
- agente padrão depende do Kiro CLI instalado e autenticado separadamente
- custo de uso (créditos Kiro) dos bots: não verificado
- informação pública limitada sobre planos específicos do Crew
## 🆚 Alternativas
- CrewAI
- LangGraph
- OpenClaw
## 💰 Custo e Contratação
- Gratuito, licença Apache-2.0 (campo license da API do GitHub, lido em 2026-11-23). O agente padrão roda no Kiro CLI e consome créditos da conta Kiro: custo de uso dos bots não verificado
- **Fonte:** https://github.com/kirodotdev/KiroCrew
## 📚 Documentação
- https://kiro.dev/crew/
- https://github.com/kirodotdev/KiroCrew
- https://builder.aws.com/content/3HWl8446Mxv1lYICBaZI0rouc8H/designing-enterprise-ai-teams-with-kiro-crew-a-practical-architecture-guide
## 🔗 Relacionamentos
- **Empresa:** [[aws|AWS]]
- **Categorias:** [[agente_codigo|Agente de código]]
- **Casos de uso:** [[agentes_autonomos_de_longa_duracao|Agentes autônomos de longa duração]], [[sistemas_multiagentes|Sistemas multiagentes]], [[automacao_de_desenvolvimento|Automação de desenvolvimento]]
- **Funcionalidades:** [[multiagente|Multiagente]], [[automacao_de_workflow|Automação de workflow]], [[memoria_persistente|Memória persistente]], [[tool_use_funcionalidade|Tool use]], [[mcp|MCP]]
- **Relacionada:** [[kiro_ide|Kiro IDE]]
- **Relacionada:** [[kiro_cli|Kiro CLI]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
