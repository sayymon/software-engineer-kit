---
id: langfuse
tipo: ferramenta
nome: LangFuse
tipos:
  - PLATAFORMA
  - SERVICO
empresa: "[[langfuse_gmbh|LangFuse GmbH]]"
aliases:
  - LangFuse
  - Langfuse
categorias:
  - "[[evals_observabilidade|Evals e observabilidade]]"
funcionalidades:
  - "[[tracing|Tracing]]"
  - "[[avaliacao_de_qualidade|Avaliação de qualidade]]"
  - "[[comparacao_de_modelos|Comparação de modelos]]"
casosDeUso:
  - "[[observabilidade_em_producao|Observabilidade em produção]]"
  - "[[avaliacao_de_prompts|Avaliação de prompts]]"
  - "[[modelos_de_decisao_e_fine_tuning|Modelos de decisão e fine-tuning]]"
modelos: []
modeloContratacao:
  - open-source
  - subscription
  - enterprise
precoUSD: 29
plataformas:
  - api
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
  - self-host requer infra (Postgres + ClickHouse)
  - UI pode ficar lenta com muitos traces
  - retencao de dados varia por plano
dataVerificacao: 2026-11-20
fontePreco: https://langfuse.com/pricing
precoMedio: 29
tags:
  - ferramenta
  - ia
  - observabilidade
  - langfuse
  - traces
  - custos
  - llm
---
# LangFuse

## 📋 Informações Básicas
- **Tipos:** Plataforma, Serviço
- **Empresa/Fabricante:** [[langfuse_gmbh|LangFuse GmbH]]
- **Website:** https://langfuse.com
- **Categorias:** Evals e observabilidade
- **Modelo de contratação:** open-source (self-hosted gratuito), subscription (cloud), enterprise
- **Preço (USD):** Self-hosted gratuito; Hobby $0; Core $29/mês; Pro $199/mês; Enterprise $2.499/mês
- **Data de verificação:** 2026-11-20
- **Fonte do preço:** https://langfuse.com/pricing
- **Linguagens:** Python, JavaScript/TypeScript, API REST

## 📝 Descrição
Plataforma de observabilidade para aplicações LLM. Permite rastrear traces de chamadas a modelos, medir custos, latência, qualidade e criar datasets de avaliação. Pense nela como o "New Relic da IA".

## 🎯 Para Que Serve
Entender o que acontece dentro das suas aplicações de IA em produção: quanto custa, quanto demora, onde surge alucinação, onde está o gargalo.

### Casos de Uso
1. Tracing de chamadas a LLMs (inputs, outputs, latência, custo)
2. Monitoramento de custos por feature/usuário/modelo
3. Criação de eval datasets a partir de traces reais
4. Score de qualidade de outputs (manual ou automatizado)
5. Debug de chains e agentes complexos (ver cada passo)
6. A/B testing de prompts

## ⏰ Quando Utilizar
- Qualquer aplicação com LLM em produção
- Precisa controlar custos de tokens
- Precisa medir qualidade de respostas ao longo do tempo
- Debug de agentes complexos (ver trace completo)
- Criar eval sets a partir de interações reais

### Quando NÃO utilizar
- Aplicação sem LLM
- Fase muito inicial de protótipo (overhead de setup)

## 🧩 Categorias e Funcionalidades
- **Categorias:** [[evals_observabilidade|Evals e observabilidade]]
- **Funcionalidades:** [[tracing|Tracing]], [[avaliacao_de_qualidade|Avaliação de qualidade]], [[comparacao_de_modelos|Comparação de modelos]]
- **Casos de uso mapeados:** [[observabilidade_em_producao|Observabilidade em produção]], [[avaliacao_de_prompts|Avaliação de prompts]]
Notas atômicas e legendas em [[hub_ai_tools|Mapa de Ferramentas de IA]].

## 🖥️ Compatibilidade e Plataformas
- **Plataformas:** python, javascript, api, self-hosted, cloud
- **Integra com:** [[langchain|LangChain]] e [[langgraph|LangGraph]] (callbacks), [[openai|OpenAI]] SDK (wrapper), [[claude|Claude AI]] e [[gemini|Gemini]] (genérico), [[adk_agent_development_kit|ADK]] (via API), Vercel AI SDK, [[llamaindex|LlamaIndex]]
- **Requisitos:** chaves de API do projeto; para self-host, Postgres + ClickHouse

## 🔒 Restrições e Especificações
- **Context window / limites:** não aplicável (é observabilidade).
- **Residência de dados / privacidade:** self-hosted mantém tudo na sua infra; cloud na infra do LangFuse.
- **Offline:** sim, via self-hosted.
- **ToS / licença:** core MIT; cloud sob ToS próprio.
- **Outras restrições:** retenção de dados varia por plano (ex.: Core com janela menor que Pro).

## 🔧 Como Utilizar

### Instalação
```bash
pip install langfuse
```

### Uso Básico (Python)
```python
from langfuse.decorators import observe

@observe()
def my_ai_function(query: str):
    response = openai.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": query}]
    )
    return response.choices[0].message.content
```

### Integração com LangChain/LangGraph
```python
from langfuse.callback import CallbackHandler
handler = CallbackHandler()
result = chain.invoke({"input": "..."}, config={"callbacks": [handler]})
```

## 🆚 Alternativas
- LangSmith (LangChain) - mais acoplado ao ecossistema, closed source
- Weights & Biases - mais focado em treinamento que inference
- Helicone - proxy que intercepta chamadas, simples
- Arize Phoenix - open source, focado em evals

### Vantagens sobre alternativas
- Open source (pode self-host)
- Agnóstico de framework (qualquer SDK)
- Eval datasets nativos
- UI boa para explorar traces
- Scoring de qualidade integrado

### Desvantagens
- Setup inicial requer configuração
- Self-host precisa de infra (Postgres + ClickHouse)

## 💰 Custo e Contratação

### Planos (USD)
- **Self-hosted:** gratuito (você paga a infra)
- **Hobby:** $0 (até 50k unidades/mês)
- **Core:** $29/mês
- **Pro:** $199/mês (usuários ilimitados)
- **Enterprise:** $2.499/mês
- **Fonte:** https://langfuse.com/pricing (verificado em 2026-11-20)

## 🧠 Conhecimentos Necessários
- Observabilidade - traces, spans, métricas
- LLMs - tokens, modelos, custos
- Python ou JavaScript - Básico

## 📚 Documentação
- [Documentação oficial](https://langfuse.com/docs)
- [GitHub (langfuse)](https://github.com/langfuse/langfuse)
- [Cloud](https://cloud.langfuse.com)
- [Guia de self-host](https://langfuse.com/docs/deployment/self-host)

## 🔗 Relacionamentos
- **Contexto:** Engenharia de AI, AI em Producao
- **Empresa:** [[langfuse_gmbh|LangFuse GmbH]]
- **Alternativas:** LangSmith, Helicone, Arize Phoenix
- **Integra com:** [[langchain|LangChain]], [[langgraph|LangGraph]], [[adk_agent_development_kit|ADK]], [[openai|OpenAI]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]

Voltar para Engenharia de AI
