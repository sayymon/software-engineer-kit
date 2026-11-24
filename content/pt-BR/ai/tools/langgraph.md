---
id: langgraph
tipo: ferramenta
nome: LangGraph
tipos:
  - FRAMEWORK
  - BIBLIOTECA
empresa: "[[langchain_inc|LangChain Inc]]"
aliases:
  - LangGraph
categorias:
  - "[[framework_agentes|Framework de agentes]]"
  - "[[orquestracao_llm|Orquestração de LLM]]"
  - "[[prompts_agentes_repos|Prompts e agentes]]"
funcionalidades:
  - "[[orquestracao_de_fluxos|Orquestração de fluxos]]"
  - "[[multiagente|Multiagente]]"
  - "[[tool_use_funcionalidade|Tool use]]"
  - "[[checkpoints_de_estado|Checkpoints de estado]]"
  - "[[human_in_the_loop_funcionalidade|Human in the loop]]"
  - "[[memoria_persistente|Memória persistente]]"
casosDeUso:
  - "[[construcao_de_agentes|Construção de agentes]]"
  - "[[sistemas_multiagentes|Sistemas multiagentes]]"
modelos: []
modeloContratacao:
  - open-source
  - enterprise
precoUSD: 0
plataformas:
  - self-hosted
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
  - curva de aprendizado mais alta que CrewAI/ADK
  - verboso para casos simples
  - LangGraph Platform (managed) e pago
  - debug complexo sem LangSmith
dataVerificacao: 2026-11-20
fontePreco: https://www.langchain.com/pricing
precoMedio: 0
tags:
  - ferramenta
  - ia
  - agentes
  - langgraph
  - grafos
  - workflows
---
# LangGraph

Conceito, State/Nodes/Edges, padrões (ReAct, Supervisor, Plan-and-Execute, Human-in-the-loop) e exemplos em [[langgraph|LangGraph (conceito e padroes)]]. Esta nota é a ficha de ferramenta do mapa.

## 📋 Informações Básicas
- **Tipos:** Framework, Biblioteca
- **Empresa/Fabricante:** [[langchain_inc|LangChain Inc]]
- **Website:** https://langchain-ai.github.io/langgraph/
- **Categorias:** Framework de agentes, Orquestração de LLM
- **Modelo de contratação:** open-source (framework); LangGraph Platform managed é pago
- **Preço (USD):** Framework gratuito (self-hosted); LangGraph Platform por uso; LangSmith com free tier + planos pagos
- **Data de verificação:** 2026-11-20
- **Fonte do preço:** https://www.langchain.com/pricing
- **Linguagens:** Python, JavaScript/TypeScript

## 📝 Descrição
Framework para construir agentes e workflows complexos usando grafos de estado. Cada nó do grafo é um passo, cada edge é uma transição (condicional ou não), e o estado é compartilhado entre todos os nós.

## 🎯 Para Que Serve
Construir agentes que precisam de fluxos não-lineares: decisões, loops, paralelismo, checkpoints e human-in-the-loop. É o framework quando [[langchain|LangChain]] simples (chains lineares) não basta.

### Casos de Uso
1. Agentes ReAct com loop de raciocínio + ação
2. Sistemas multiagentes com supervisor
3. Workflows com aprovação humana (human-in-the-loop)
4. Pipelines RAG com refinamento iterativo
5. Geração de código com autocorreção

## ⏰ Quando Utilizar
- Fluxo tem decisões condicionais (if/else baseado em output do LLM)
- Precisa de loops (agente tenta, avalia, tenta de novo)
- Precisa persistir estado (checkpoints, resume)
- Precisa de paralelismo (múltiplos nós ao mesmo tempo)
- Multiagente com controle fino de orquestração

### Quando NÃO utilizar
- Chain linear simples (A→B→C): use [[langchain|LangChain]] direto
- Protótipo rápido sem complexidade: use [[adk_agent_development_kit|ADK]] ou [[crewai|CrewAI]]
- Não precisa de loops ou decisões: use LCEL

## 🧩 Categorias e Funcionalidades
- **Categorias:** [[framework_agentes|Framework de agentes]], [[orquestracao_llm|Orquestração de LLM]]
- **Funcionalidades:** [[orquestracao_de_fluxos|Orquestração de fluxos]], [[multiagente|Multiagente]], [[tool_use_funcionalidade|Tool use]], [[checkpoints_de_estado|Checkpoints de estado]], [[human_in_the_loop_funcionalidade|Human in the loop]], [[memoria_persistente|Memória persistente]]
- **Casos de uso mapeados:** [[construcao_de_agentes|Construção de agentes]], [[sistemas_multiagentes|Sistemas multiagentes]]
Notas atômicas e legendas em [[hub_ai_tools|Mapa de Ferramentas de IA]].

## 🖥️ Compatibilidade e Plataformas
- **Plataformas:** python, javascript, self-hosted, cloud (LangGraph Platform)
- **Integra com:** LangSmith (tracing nativo), [[langfuse|LangFuse]] (callbacks), qualquer LLM ([[openai|OpenAI]], [[claude|Claude AI]], [[gemini|Gemini]], local), vector DBs, APIs externas
- **Requisitos:** Python ou JavaScript; chave de API do provider

## 🔒 Restrições e Especificações
- **Context window / limites:** herdados do modelo escolhido.
- **Residência de dados / privacidade:** depende do provider; self-hosted mantém tudo local.
- **Offline:** parcial (com [[ollama|Ollama]]).
- **ToS / licença:** framework open source; Platform sob contrato.
- **Outras restrições:** verboso para casos simples; debug complexo sem LangSmith.

## 🔧 Como Utilizar

### Instalação
```bash
pip install langgraph
```

### Uso Básico
```python
from langgraph.graph import StateGraph, END
from typing import TypedDict

class State(TypedDict):
    messages: list
    next: str

graph = StateGraph(State)
graph.add_node("agent", agent_node)
graph.add_node("tools", tool_node)
graph.add_conditional_edges("agent", should_continue, {"continue": "tools", "end": END})
graph.add_edge("tools", "agent")
graph.set_entry_point("agent")
app = graph.compile()
```

Padrões completos (ReAct, Supervisor, Plan-and-Execute) em [[langgraph|LangGraph (conceito e padroes)]].

## 🆚 Alternativas
- [[crewai|CrewAI]] - mais simples, menos controle, foco em roles
- [[adk_agent_development_kit|ADK]] - Google, mais opinativo, deploy fácil
- [[autogen|AutoGen]] - conversação entre agentes (Microsoft)
- [[langchain|LangChain]] - mesmo ecossistema, para chains lineares

### Vantagens sobre alternativas
- Controle total sobre fluxo (edges condicionais, loops)
- Checkpoints e persistência de estado
- Human-in-the-loop nativo
- Paralelismo de nós
- Ecossistema LangChain (tools, memory, integrações)

### Desvantagens
- Curva de aprendizado maior que CrewAI/ADK
- Verboso para casos simples
- Debugging complexo sem LangSmith

## 💰 Custo e Contratação

### Planos (USD)
- **Open Source:** gratuito, self-hosted
- **LangGraph Platform:** managed deploy e checkpoints na cloud, preço por uso
- **LangSmith:** observabilidade, free tier + planos pagos
- **Fonte:** https://www.langchain.com/pricing (verificado em 2026-11-20)

## 🧠 Conhecimentos Necessários
- Python - Intermediário
- [[langchain|LangChain]] - Básico (chains, tools, memory)
- AI Agents - conceitos de agentes
- LLMs - function calling, prompts

## 📚 Documentação
- [Documentação oficial](https://langchain-ai.github.io/langgraph/)
- [Tutoriais](https://langchain-ai.github.io/langgraph/tutorials/)
- [LangChain Academy](https://academy.langchain.com/)
- **Ecossistema relacionado:** LangSmith

## 🔗 Relacionamentos
- **Contexto:** Ferramentas
- **Conceito:** [[langgraph|LangGraph (conceito e padroes)]]
- **Empresa:** [[langchain_inc|LangChain Inc]]
- **Usado em:** [[sistemas_multiagentes|Sistemas Multiagentes]], Padroes de Arquitetura de AI
- **Alternativas:** [[crewai|CrewAI]], [[adk_agent_development_kit|ADK]]
- **Integra com:** [[langchain|LangChain]], LangSmith, [[langfuse|LangFuse]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]

Voltar para Engenharia de AI
