---
id: adk_agent_development_kit
tipo: ferramenta
nome: ADK - Agent Development Kit
tipos:
  - FRAMEWORK
  - PLATAFORMA
empresa: "[[google|Google]]"
aliases:
  - ADK
  - Agent Development Kit
  - Google ADK
categorias:
  - "[[framework_agentes|Framework de agentes]]"
  - "[[orquestracao_llm|Orquestração de LLM]]"
funcionalidades:
  - "[[multiagente|Multiagente]]"
  - "[[tool_use_funcionalidade|Tool use]]"
  - "[[orquestracao_de_fluxos|Orquestração de fluxos]]"
  - "[[deploy_gerenciado|Deploy gerenciado]]"
casosDeUso:
  - "[[construcao_de_agentes|Construção de agentes]]"
  - "[[sistemas_multiagentes|Sistemas multiagentes]]"
  - "[[automacao_de_desenvolvimento|Automação de desenvolvimento]]"
modelos: []
modeloContratacao:
  - open-source
  - api-pay-per-token
  - enterprise
precoUSD: 0
plataformas:
  - cli
  - api
  - cloud
linguagens:
  - python
porte:
  - pessoa-fisica
  - pequena
  - media
  - grande
segmentos:
  - geral
restricoes:
  - Gemini-first, trocar de modelo nao e trivial
  - deploy no Vertex AI e pago por uso
  - sem grafos de estado/checkpoints nativos
  - comunidade menor que LangChain
dataVerificacao: 2026-11-20
fontePreco: https://google.github.io/adk-docs/
precoMedio: 0
tags:
  - ferramenta
  - ia
  - agentes
  - adk
  - google
  - gemini
---
# ADK - Agent Development Kit

Conceito, arquitetura e exemplos aprofundados em [[adk_agent_development_kit|ADK (conceito e engenharia)]]. Esta nota é a ficha de ferramenta do mapa; a nota de conceito traz os detalhes de design de agentes.

## 📋 Informações Básicas
- **Tipos:** Framework, Plataforma
- **Empresa/Fabricante:** [[google|Google]]
- **Website:** https://google.github.io/adk-docs/
- **Categorias:** Framework de agentes, Orquestração de LLM
- **Modelo de contratação:** open-source (framework), api-pay-per-token (Gemini), enterprise (Vertex AI)
- **Preço (USD):** Framework gratuito (open source); Gemini API pay-per-token; deploy no Vertex AI pago por uso
- **Data de verificação:** 2026-11-20
- **Fonte do preço:** https://google.github.io/adk-docs/ (framework) e https://ai.google.dev/pricing (Gemini)
- **Linguagens:** Python

## 📝 Descrição
Kit de desenvolvimento de agentes do Google. Opinativo e produtivo, com convenções claras para criar, testar e deployar agentes com integração nativa ao ecossistema Google (Gemini, Vertex AI, Google Cloud).

## 🎯 Para Que Serve
Criar agentes de forma rápida e estruturada com o ecossistema Google. Ideal para quem já usa [[gemini|Gemini]] e GCP e quer produtividade máxima sem montar infra própria.

### Casos de Uso
1. Agentes com sub-agentes hierárquicos
2. Automações com tools tipadas
3. Deploy rápido em Vertex AI
4. Prototipação de agentes para validação
5. Agentes com acesso a serviços Google (Search, Maps, Calendar)

## ⏰ Quando Utilizar
- Já usa ecossistema Google (Gemini, GCP, Vertex)
- Quer ir rápido do protótipo ao deploy
- Agentes com hierarquia simples (root + sub-agents)
- Precisa de console de debug interativo
- Quer function calling com schema automático via type hints

### Quando NÃO utilizar
- Precisa de loops complexos e decisões condicionais: prefira [[langgraph|LangGraph]]
- Quer independência de provider (model-agnostic): prefira [[langgraph|LangGraph]] ou [[crewai|CrewAI]]
- Precisa de grafos de estado com checkpoints: prefira [[langgraph|LangGraph]]

## 🧩 Categorias e Funcionalidades
- **Categorias:** [[framework_agentes|Framework de agentes]], [[orquestracao_llm|Orquestração de LLM]]
- **Funcionalidades:** [[multiagente|Multiagente]], [[tool_use_funcionalidade|Tool use]], [[orquestracao_de_fluxos|Orquestração de fluxos]], [[deploy_gerenciado|Deploy gerenciado]]
- **Casos de uso mapeados:** [[construcao_de_agentes|Construção de agentes]], [[sistemas_multiagentes|Sistemas multiagentes]], [[automacao_de_desenvolvimento|Automação de desenvolvimento]]
Notas atômicas e legendas em [[hub_ai_tools|Mapa de Ferramentas de IA]].

## 🖥️ Compatibilidade e Plataformas
- **Plataformas:** python, cli, api, cloud (Vertex AI)
- **Integra com:** [[gemini|Gemini]] (nativo), Google Search/Maps/Calendar (tools), Vertex AI Agent Builder (deploy), Cloud Functions (tools serverless), BigQuery (dados), [[langfuse|LangFuse]] (via API)
- **Requisitos:** Python; conta Google Cloud para deploy

## 🔒 Restrições e Especificações
- **Context window / limites:** herdados do modelo Gemini escolhido.
- **Residência de dados / privacidade:** segue políticas do Google Cloud / Vertex AI.
- **Offline:** não (depende de Gemini/GCP).
- **ToS / licença:** framework open source; serviços Google sob ToS do GCP.
- **Outras restrições:** Gemini-first; sem grafos de estado/checkpoints nativos.

## 🔧 Como Utilizar

### Instalação
```bash
pip install google-adk
```

### Uso Básico
```python
from google.adk import Agent, Tool

@Tool
def search_web(query: str) -> str:
    """Busca informacoes na web sobre o topico."""
    return search_api.search(query)

agent = Agent(
    name="research_agent",
    model="gemini-2.0-flash",
    instruction="Voce e um agente de pesquisa. Use search_web para encontrar informacoes.",
    tools=[search_web]
)

response = agent.run("O que e LangGraph?")
```

### CLI
```bash
adk create my-agent      # Scaffold novo agente
adk run                  # Console interativo local
adk deploy               # Deploy no Vertex AI
adk test                 # Testes automatizados
```

## 🆚 Alternativas
- [[langgraph|LangGraph]] - mais controle, mais complexo, model-agnostic
- [[crewai|CrewAI]] - multiagente simples, model-agnostic
- [[langchain|LangChain]] - chains e tools, ecossistema amplo

### Vantagens sobre alternativas
- Produtividade alta (convenções claras, CLI, scaffold)
- Deploy direto no Vertex AI (sem montar infra)
- Console interativo para debug
- Type hints geram schema automático
- Integração nativa com serviços Google

### Desvantagens
- Lock-in com Google/Gemini
- Menos flexível que LangGraph para fluxos complexos
- Ecossistema mais jovem (menos exemplos, comunidade menor)
- Sem grafos de estado ou checkpoints nativos

## 💰 Custo e Contratação

### Planos (USD)
- **Framework:** gratuito, open source
- **Gemini API:** free tier generoso, depois pay-per-token
- **Vertex AI deploy:** pay-per-use (requests + compute)
- **Fonte:** https://google.github.io/adk-docs/ e https://ai.google.dev/pricing (verificado em 2026-11-20)

## 🧠 Conhecimentos Necessários
- Python - Básico a Intermediário
- AI Agents - conceitos de agentes e tools
- Google Cloud - Básico (para deploy)

## 📚 Documentação
- [Documentação oficial](https://google.github.io/adk-docs/)
- [Guia de início rápido](https://google.github.io/adk-docs/get-started/quickstart/)
- [GitHub (adk-python)](https://github.com/google/adk-python)

## 🔗 Relacionamentos
- **Contexto:** Ferramentas
- **Conceito:** [[adk_agent_development_kit|ADK (conceito e engenharia)]]
- **Empresa:** [[google|Google]]
- **Usado em:** [[sistemas_multiagentes|Sistemas Multiagentes]]
- **Alternativas:** [[langgraph|LangGraph]], [[crewai|CrewAI]], [[langchain|LangChain]]
- **Integra com:** [[gemini|Gemini]], Vertex AI, Google Cloud
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]

Voltar para Engenharia de AI
