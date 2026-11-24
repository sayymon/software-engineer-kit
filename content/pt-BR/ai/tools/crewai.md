---
id: crewai
tipo: ferramenta
nome: CrewAI
tipos:
  - FRAMEWORK
  - BIBLIOTECA
empresa: "[[crewai_inc|CrewAI Inc]]"
aliases:
  - CrewAI
  - Crew AI
categorias:
  - "[[framework_agentes|Framework de agentes]]"
  - "[[orquestracao_llm|Orquestração de LLM]]"
  - "[[prompts_agentes_repos|Prompts e agentes]]"
funcionalidades:
  - "[[multiagente|Multiagente]]"
  - "[[orquestracao_de_fluxos|Orquestração de fluxos]]"
  - "[[tool_use_funcionalidade|Tool use]]"
  - "[[memoria_persistente|Memória persistente]]"
  - "[[recuperacao_aumentada_rag|Recuperação aumentada (RAG)]]"
casosDeUso:
  - "[[construcao_de_agentes|Construção de agentes]]"
  - "[[sistemas_multiagentes|Sistemas multiagentes]]"
  - "[[automacao_de_processos|Automação de processos]]"
modelos: []
modeloContratacao:
  - open-source
  - free
  - enterprise
precoUSD: 0
plataformas:
  - cli
  - cloud
  - self-hosted
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
  - menos controle de fluxo que LangGraph
  - agentes podem entrar em loops improdutivos
  - custo de tokens alto quando agentes conversam entre si
  - debug limitado na versao open source
dataVerificacao: 2026-11-20
fontePreco: https://crewai.com/pricing
precoMedio: 0
tags:
  - ferramenta
  - ia
  - crewai
  - multiagentes
  - roles
  - tasks
---
# CrewAI

Conceito, formas de trabalhar (sequencial, hierárquica, assíncrona), memória e exemplos de código em [[crewai|CrewAI (conceito e exemplos)]]. Esta nota é a ficha de ferramenta do mapa.

## 📋 Informações Básicas
- **Tipos:** Framework para sistemas multiagentes
- **Empresa/Fabricante:** [[crewai_inc|CrewAI Inc]] (João Moura)
- **Website:** https://www.crewai.com
- **Categorias:** Framework de agentes, Orquestração de LLM
- **Modelo de contratação:** open-source (framework MIT), free (tier cloud), enterprise (plataforma AMP)
- **Preço (USD):** Framework gratuito; CrewAI AMP com tier free (50 execuções/mês) e Enterprise sob consulta
- **Data de verificação:** 2026-11-20
- **Fonte do preço:** https://crewai.com/pricing
- **Licença:** MIT

## 📝 Descrição
Framework para criar sistemas multiagentes onde cada agente tem um role (papel), um goal (objetivo) e tools (ferramentas). Agentes colaboram para completar tasks de forma sequencial, hierárquica ou assíncrona. Mais simples e opinado que [[langgraph|LangGraph]], troca controle fino por facilidade de uso.

## 🎯 Para Que Serve
Construir sistemas onde múltiplos agentes de IA colaboram para resolver problemas complexos, cada um com sua especialidade.

### Casos de Uso
1. Equipes de pesquisa automatizada (researcher + writer + editor)
2. Pipelines de análise com múltiplas etapas especializadas
3. Automações de negócio com agentes especializados por função
4. Geração de conteúdo com review automatizado

## ⏰ Quando Utilizar
- Quando o problema se decompõe naturalmente em roles/papéis
- Quando quer multiagentes sem complexidade de grafos de estado
- Quando precisa de protótipo rápido de sistema colaborativo
- Quando a equipe prefere configuração declarativa a código imperativo

### Quando NÃO utilizar
- Quando precisa de controle fino sobre fluxo de execução: use [[langgraph|LangGraph]]
- Quando o sistema tem ciclos complexos e estados condicionais
- Quando precisa de determinismo e reproducibilidade exata
- Quando tem um único agente simples (overhead desnecessário)

## 🧩 Categorias e Funcionalidades
- **Categorias:** [[framework_agentes|Framework de agentes]], [[orquestracao_llm|Orquestração de LLM]]
- **Funcionalidades:** [[multiagente|Multiagente]], [[orquestracao_de_fluxos|Orquestração de fluxos]], [[tool_use_funcionalidade|Tool use]], [[memoria_persistente|Memória persistente]], [[recuperacao_aumentada_rag|Recuperação aumentada (RAG)]]
- **Casos de uso mapeados:** [[construcao_de_agentes|Construção de agentes]], [[sistemas_multiagentes|Sistemas multiagentes]], [[automacao_de_processos|Automação de processos]]
Notas atômicas e legendas em [[hub_ai_tools|Mapa de Ferramentas de IA]].

## 🖥️ Compatibilidade e Plataformas
- **Plataformas:** python, cli, cloud (CrewAI AMP), self-hosted
- **Integra com:** [[openai|OpenAI]] (LLM padrão), [[ollama|Ollama]] (modelos locais), [[langchain|LangChain]] (tools e integrações), Serper API (search)
- **Requisitos:** Python; chave de API do provider de LLM

## 🔒 Restrições e Especificações
- **Context window / limites:** herdados do modelo escolhido.
- **Residência de dados / privacidade:** depende do provider de LLM; AMP Enterprise oferece deploy em VPC própria.
- **Offline:** parcial (com [[ollama|Ollama]] local).
- **ToS / licença:** framework MIT; plataforma AMP sob contrato.
- **Outras restrições:** agentes podem entrar em loops; custo de tokens sobe quando conversam entre si.

## 🔧 Como Utilizar

### Instalação
```bash
pip install crewai crewai-tools
```

### Uso Básico
```python
from crewai import Agent, Task, Crew

researcher = Agent(role="Pesquisador Senior", goal="Encontrar informacoes relevantes", backstory="...", tools=[search_tool])
writer = Agent(role="Escritor Tecnico", goal="Transformar pesquisa em conteudo claro", backstory="...")

research_task = Task(description="Pesquise sobre {topic}.", expected_output="5 pontos principais.", agent=researcher)
write_task = Task(description="Escreva um artigo com base na pesquisa.", expected_output="Artigo de 500 palavras.", agent=writer)

crew = Crew(agents=[researcher, writer], tasks=[research_task, write_task])
result = crew.kickoff(inputs={"topic": "pgvector para RAG"})
```

Exemplos completos (memória, guardrails, processos hierárquicos) em [[crewai|CrewAI (conceito e exemplos)]].

## 🆚 Alternativas
- [[langgraph|LangGraph]] - mais controle, mais complexo (grafos de estado)
- [[adk_agent_development_kit|ADK]] - Google, deploy fácil no Vertex AI
- [[autogen|AutoGen]] - framework multiagentes da Microsoft
- Agency Swarm - multiagentes com hierarquia

### Vantagens sobre alternativas
- Sintaxe simples e declarativa
- Conceito de roles/goals é intuitivo
- Setup rápido para protótipos
- Boa documentação e exemplos

### Desvantagens
- Menos controle que LangGraph sobre fluxo de execução
- Difícil debugar quando agentes entram em loop
- Output pode ser imprevisível com muitos agentes
- Menos maduro que LangChain/LangGraph

## 💰 Custo e Contratação

### Planos (USD)
- **Open Source:** gratuito, licença MIT (rode você mesmo)
- **CrewAI AMP (cloud):** tier free com 50 execuções/mês; Enterprise sob consulta (SSO, RBAC, PII redaction, deploy em VPC)
- **Referência:** listagem AWS Marketplace cita contrato Basic por volta de $99/mês (não é preço público do site oficial)
- **Fonte:** https://crewai.com/pricing (verificado em 2026-11-20)

## 🧠 Conhecimentos Necessários
- Python - Básico a intermediário
- LLMs - Básico (prompts, roles)
- AI Agents - Básico (agentes com tools)

## 📚 Documentação
- [Documentação oficial](https://docs.crewai.com)
- [GitHub (crewAI)](https://github.com/crewAIInc/crewAI)
- [Exemplos (crewAI-examples)](https://github.com/crewAIInc/crewAI-examples)

## 🔗 Relacionamentos
- **Contexto:** Ferramentas
- **Conceito:** [[crewai|CrewAI (conceito e exemplos)]]
- **Empresa:** [[crewai_inc|CrewAI Inc]]
- **Usado em:** Sistemas multiagentes, automações
- **Alternativas:** [[langgraph|LangGraph]], [[adk_agent_development_kit|ADK]], [[autogen|AutoGen]]
- **Integra com:** [[langchain|LangChain]], [[openai|OpenAI]], [[ollama|Ollama]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
