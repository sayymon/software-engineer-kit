---
id: composio
tipo: ferramenta
nome: Composio
tipos:
  - PLATAFORMA
  - SERVICO
empresa: "[[composio_inc|Composio Inc]]"
aliases:
  - Composio
categorias:
  - "[[mcp_integracoes|MCP e integrações]]"
  - "[[registro_gateway_mcp|Registro e gateway de MCP]]"
funcionalidades:
  - "[[integracao_de_apis|Integração de APIs]]"
  - "[[mcp|MCP]]"
  - "[[tool_use_funcionalidade|Tool use]]"
casosDeUso:
  - "[[construcao_de_agentes|Construção de agentes]]"
  - "[[automacao_de_desenvolvimento|Automação de desenvolvimento]]"
  - "[[automacao_de_processos|Automação de processos]]"
  - "[[integracao_de_apis_e_webhooks|Integração de APIs e webhooks]]"
modelos: []
modeloContratacao:
  - free
  - subscription
  - api-pay-per-token
  - enterprise
precoUSD: 29
plataformas:
  - api
  - cloud
linguagens:
  - python
  - javascript
porte:
  - pessoa-fisica
  - pequena
  - media
  - grande
segmentos:
  - geral
restricoes:
  - "free: 100.000 tool calls por mes"
  - Pro $29/mes com credito de uso e cobranca por chamada acima disso
  - servico gerenciado com OAuth gerenciado, sem modo offline
dataVerificacao: 2026-11-20
fontePreco: https://composio.dev/pricing
precoMedio: 29
tags:
  - ferramenta
  - ia
  - mcp
  - integracoes
  - composio
---
# Composio

## 📋 Informações Básicas
- **Tipos:** Plataforma de integrações e camada de ferramentas para agentes (MCP)
- **Empresa/Fabricante:** [[composio_inc|Composio Inc]]
- **Website:** https://composio.dev
- **Categorias:** MCP e integrações
- **Modelo de contratação:** free, subscription, API paga por uso, enterprise
- **Preço (USD):** Hobby/Free $0 (100.000 tool calls/mês); Pro $29/mês; team Standard $18/assento/mês; Enterprise sob consulta
- **Data de verificação:** 2026-11-20
- **Fonte do preço:** https://composio.dev/pricing

## 📝 Descrição
Plataforma que dá aos agentes de IA uma camada única de ferramentas, com mais de 1.000 integrações de aplicativos, OAuth gerenciado, sessões por usuário e gatilhos. Expõe as integrações via SDK e via MCP (Model Context Protocol), para conectar modelos e agentes a serviços externos sem implementar cada autenticação manualmente.

## 🎯 Para Que Serve
Conectar agentes de IA a muitos aplicativos externos com autenticação gerenciada, para que o agente execute ações reais (criar tarefas, enviar mensagens, consultar sistemas) via tool use e MCP.

### Casos de Uso
1. Construção de agentes que executam ações em apps externos
2. Automação de desenvolvimento com ferramentas conectadas
3. Automação de processos entre sistemas
4. Conectar IDEs e assistentes a serviços via MCP

## ⏰ Quando Utilizar
- Quando o agente precisa agir em muitos apps sem você codar cada OAuth
- Quando quer uma camada de ferramentas padronizada via MCP
- Quando precisa de sessões por usuário e gatilhos gerenciados
- Quando quer acelerar a integração de tool use em agentes

### Quando NÃO utilizar
- Quando precisa de automação visual no-code de ponta a ponta: avalie [[n8n|n8n]]
- Quando poucas integrações simples bastam e o SDK direto resolve
- Quando precisa de execução 100% local e offline
- Quando o volume de tool calls torna o custo relevante sem ganho claro

## 🧩 Categorias e Funcionalidades
- **Categorias:** [[mcp_integracoes|MCP e integrações]]
- **Funcionalidades:** [[integracao_de_apis|Integração de APIs]], [[mcp|MCP]], [[tool_use_funcionalidade|Tool use]]
- **Casos de uso mapeados:** [[construcao_de_agentes|Construção de agentes]], [[automacao_de_desenvolvimento|Automação de desenvolvimento]], [[automacao_de_processos|Automação de processos]]
Notas atômicas e legendas em [[hub_ai_tools|Mapa de Ferramentas de IA]].

## 🖥️ Compatibilidade e Plataformas
- **Plataformas:** python, javascript, api, cloud
- **Integra com:** [[langchain|LangChain]], [[crewai|CrewAI]] (frameworks de agentes); [[claude_code|Claude Code]], [[cursor|Cursor]], [[chatgpt|ChatGPT]] (via MCP e conectores)
- **Requisitos:** conta Composio e chave de API; conexões OAuth com os apps

## 🔒 Restrições e Especificações
- **Context window / limites:** não aplicável; limite prático é o número de tool calls do plano.
- **Residência de dados / privacidade:** serviço gerenciado na nuvem, com OAuth gerenciado; regido pelo ToS.
- **Offline:** não.
- **ToS / licença:** serviço proprietário sob ToS.
- **Outras restrições:** camada paga por uso acima do free; depende de disponibilidade dos apps conectados.

## 🆚 Alternativas
- [[n8n|n8n]] - automação no-code com muitos conectores
- Zapier MCP e Make - plataformas de automação com camada MCP
- SDKs diretos dos apps - quando são poucas integrações

### Vantagens sobre alternativas
- Camada de ferramentas pronta para agentes, com muitas integrações
- OAuth gerenciado reduz trabalho de autenticação
- Exposição via MCP, padrão aberto de ferramentas
- Free generoso (100.000 tool calls/mês)

### Desvantagens
- Serviço gerenciado, sem modo offline
- Custo por uso acima do plano free
- Dependência da disponibilidade dos apps conectados

## 💰 Custo e Contratação

### Planos (USD)
- **Hobby/Free:** $0 (100.000 tool calls/mês, sem cartão)
- **Pro:** $29/mês (com crédito de uso; cobrança por chamada acima disso)
- **Team Standard:** $18/assento/mês
- **Enterprise:** sob consulta
- **Fonte:** https://composio.dev/pricing (verificado em 2026-11-20)

## 🔗 Relacionamentos
- **Contexto:** Ferramentas
- **Empresa:** [[composio_inc|Composio Inc]]
- **Usado em:** Agentes com ações em apps externos, automação via MCP
- **Alternativas:** [[n8n|n8n]]
- **Integra com:** [[langchain|LangChain]], [[crewai|CrewAI]], [[claude_code|Claude Code]], [[cursor|Cursor]], [[chatgpt|ChatGPT]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
