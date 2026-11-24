---
id: promptfoo
tipo: ferramenta
nome: Promptfoo
tipos:
  - FRAMEWORK
  - UTILITARIO
empresa: "[[promptfoo_inc|Promptfoo Inc]]"
aliases:
  - Promptfoo
categorias:
  - "[[evals_observabilidade|Evals e observabilidade]]"
funcionalidades:
  - "[[avaliacao_de_qualidade|Avaliação de qualidade]]"
  - "[[comparacao_de_modelos|Comparação de modelos]]"
casosDeUso:
  - "[[avaliacao_de_prompts|Avaliação de prompts]]"
  - "[[observabilidade_em_producao|Observabilidade em produção]]"
  - "[[modelos_de_decisao_e_fine_tuning|Modelos de decisão e fine-tuning]]"
modelos: []
modeloContratacao:
  - open-source
  - free
  - enterprise
precoUSD: 0
plataformas:
  - cli
  - self-hosted
  - cloud
linguagens:
  - javascript
porte:
  - pessoa-fisica
  - pequena
  - media
  - grande
segmentos:
  - geral
restricoes:
  - config YAML pode ficar verbosa em cenarios complexos
  - assertions llm-rubric tem custo de tokens
  - voce paga os tokens dos providers testados
dataVerificacao: 2026-11-20
fontePreco: https://promptfoo.dev/pricing
precoMedio: 0
tags:
  - ferramenta
  - ia
  - testes
  - evals
  - prompts
  - qualidade
---
# Promptfoo

## 📋 Informações Básicas
- **Tipos:** Framework de testes, Utilitário CLI
- **Empresa/Fabricante:** [[promptfoo_inc|Promptfoo Inc]] (parte da OpenAI desde março de 2026)
- **Website:** https://promptfoo.dev
- **Categorias:** Evals e observabilidade
- **Modelo de contratação:** open-source (MIT) / free (Community), enterprise (cloud/on-premise)
- **Preço (USD):** Community gratuito (open source); Enterprise e On-Premise com preço sob consulta
- **Data de verificação:** 2026-11-20
- **Fonte do preço:** https://promptfoo.dev/pricing
- **Linguagens:** JavaScript/TypeScript, CLI universal

## 📝 Descrição
Framework de testes automatizados para prompts e modelos de IA. Permite comparar múltiplos prompts contra múltiplos modelos com assertions automáticas. É o "Jest/Vitest da engenharia de prompt" e inclui red teaming de segurança. Open source MIT, mantido pela OpenAI desde a aquisição em março de 2026.

## 🎯 Para Que Serve
Garantir que mudanças em prompts não quebrem a qualidade das respostas. Testar antes de deployar, comparar modelos e detectar regressões.

### Casos de Uso
1. Comparar [[chatgpt|ChatGPT]] vs [[claude|Claude AI]] vs [[gemini|Gemini]] no mesmo prompt
2. Testar regressão quando muda um prompt
3. Red teaming (testar vulnerabilidades do prompt)
4. Benchmark de qualidade para eval sets
5. CI/CD de prompts (rodar testes antes de deploy)

## ⏰ Quando Utilizar
- Tem prompts em produção que não pode quebrar
- Quer comparar modelos antes de escolher
- Precisa medir impacto de mudanças em prompts
- Quer automatizar quality assurance de IA
- Red teaming (segurança de prompts)

### Quando NÃO utilizar
- Fase muito exploratória (ainda testando ideias na mão)
- Um único prompt simples que raramente muda

## 🧩 Categorias e Funcionalidades
- **Categorias:** [[evals_observabilidade|Evals e observabilidade]]
- **Funcionalidades:** [[avaliacao_de_qualidade|Avaliação de qualidade]], [[comparacao_de_modelos|Comparação de modelos]]
- **Casos de uso mapeados:** [[avaliacao_de_prompts|Avaliação de prompts]], [[observabilidade_em_producao|Observabilidade em produção]]
Notas atômicas e legendas em [[hub_ai_tools|Mapa de Ferramentas de IA]].

## 🖥️ Compatibilidade e Plataformas
- **Plataformas:** cli, javascript, self-hosted, cloud
- **Integra com:** [[openai|OpenAI]], [[claude|Claude AI]], [[gemini|Gemini]], qualquer provider; GitHub Actions (CI/CD); [[langchain|LangChain]] e [[langgraph|LangGraph]] (providers customizados); [[ollama|Ollama]] (modelos locais)
- **Requisitos:** Node.js; chaves de API dos providers testados

## 🔒 Restrições e Especificações
- **Context window / limites:** não aplicável.
- **Residência de dados / privacidade:** roda local ou self-hosted por padrão.
- **Offline:** parcial (depende dos providers testados).
- **ToS / licença:** MIT.
- **Outras restrições:** você paga os tokens dos providers nos testes; assertions llm-rubric têm custo extra.

## 🔧 Como Utilizar

### Instalação
```bash
npx promptfoo@latest init
```

### Configuração (promptfooconfig.yaml)
```yaml
prompts:
  - "Responda de forma concisa: {{question}}"
providers:
  - openai:gpt-4o
  - anthropic:messages:claude-sonnet-4-20250514
tests:
  - vars:
      question: "Como cancelo minha assinatura?"
    assert:
      - type: contains
        value: "cancelar"
      - type: llm-rubric
        value: "A resposta e educada e resolve o problema"
```

### Executar
```bash
npx promptfoo eval
npx promptfoo view
```

## Tipos de Assertions

| Tipo | O que valida |
|------|-------------|
| contains | Output contém texto específico |
| not-contains | Output NÃO contém texto |
| llm-rubric | Outro LLM avalia qualidade |
| similar | Similaridade semântica com referência |
| cost | Custo abaixo de threshold |
| latency | Latência abaixo de threshold |
| javascript / python | Custom assertion em código |

## 🆚 Alternativas
- Eval manual - não escala, não é reproduzível
- LangSmith Eval - acoplado ao ecossistema LangChain
- Ragas - focado em RAG evaluation
- DeepEval - similar, Python-first

### Vantagens sobre alternativas
- CLI simples, config em YAML (sem precisar escrever código)
- Model-agnostic (testa qualquer provider)
- Red teaming nativo (testes de segurança)
- Dashboard visual para comparação
- CI/CD ready (GitHub Actions)

### Desvantagens
- Config YAML pode ficar verbosa em cenários complexos
- Assertions baseadas em LLM têm custo

## 💰 Custo e Contratação

### Planos (USD)
- **Community (open source):** gratuito, MIT; roda local ou self-hosted; inclui 10k red-team probes/mês
- **Enterprise / On-Premise:** preço sob consulta (SOC2, ISO 27001, deploy gerenciado)
- **Custo real:** tokens consumidos nos testes (você paga o provider)
- **Fonte:** https://promptfoo.dev/pricing (verificado em 2026-11-20)

## 🧠 Conhecimentos Necessários
- [[escrever_prompt|Engenharia de Prompt]] - Básico
- YAML - Básico
- LLMs - entender como modelos respondem

## 📚 Documentação
- [Documentação oficial](https://promptfoo.dev/docs)
- [GitHub (promptfoo)](https://github.com/promptfoo/promptfoo)
- [Red teaming](https://promptfoo.dev/docs/red-team)
- **Relacionados:** Qualidade de Software

## 🔗 Relacionamentos
- **Contexto:** Engenharia de AI, Avaliacao e Evals
- **Empresa:** [[promptfoo_inc|Promptfoo Inc]]
- **Equivalente tradicional:** Jest/Vitest (testes de prompts)
- **Usado em:** CI/CD de prompts, comparação de modelos
- **Integra com:** [[openai|OpenAI]], [[claude|Claude AI]], [[gemini|Gemini]], [[ollama|Ollama]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]

Voltar para Engenharia de AI
