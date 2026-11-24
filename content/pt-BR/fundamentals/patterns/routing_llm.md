---
id: routing_llm
tipo: padrao
nome: Routing
aliases:
  - Roteamento
  - Router
descricao: Classifica a entrada e a direciona para um fluxo, prompt, modelo ou ferramenta especializados, o que permite otimizar cada caminho separadamente.
fonte_ids:
  - anthropic_agents
  - gcp_agentic_patterns
  - azure_ai_agent_patterns
exemplo: Um classificador envia pedidos de reembolso ao fluxo financeiro e dúvidas técnicas ao fluxo de suporte.
quando_usar:
  - Entradas de categorias distintas (suporte, vendas, técnico)
  - Direcionar perguntas fáceis a modelos baratos e difíceis a modelos fortes
  - Escolher entre fontes de dados ou ferramentas
quando_evitar:
  - Uma única categoria de entrada
  - Quando o roteador erra com frequência e a classificação não pode ser validada
status: revisado
publico: false
fontes:
  - id: anthropic_agents
    tipo: artigo
    titulo: Building effective agents (Anthropic)
    link: https://www.anthropic.com/research/building-effective-agents
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: gcp_agentic_patterns
    tipo: artigo
    titulo: Choose a design pattern for your agentic AI system (Google Cloud Architecture Center)
    link: https://docs.cloud.google.com/architecture/choose-design-pattern-agentic-ai-system
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: azure_ai_agent_patterns
    tipo: artigo
    titulo: AI agent orchestration patterns (Azure Architecture Center)
    link: https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns
    status_revisao: revisada
    proxima_revisao: 2027-11-22
categorias:
  - "[[orquestracao_llm|Orquestração de LLM]]"
  - "[[modelo_decisao|Modelo de decisão]]"
  - "[[framework_agentes|Framework de agentes]]"
familia: ia
subfamilia: Agentes e fluxos
problema: Um prompt único e genérico para todos os tipos de pedido tem desempenho mediano e custo desnecessário nos casos simples.
tradeoffs:
  - "Ganha: especialização e custo menor; paga: erros de roteamento levam ao caminho errado"
  - "Ganha: cada rota evolui separadamente; paga: mais fluxos para testar e monitorar"
consequencias:
  - Um caminho de fallback para entradas ambíguas evita falhas silenciosas
  - Um modelo de decisão tipado devolve a escolha com confiança calibrada
padroesRelacionados:
  - "[[model_cascade|Model Cascade]]"
  - "[[orchestrator_workers|Orchestrator-Workers]]"
  - "[[prompt_chaining|Prompt Chaining]]"
casosDeUso:
  - "[[atendimento_e_suporte|Atendimento e suporte]]"
  - "[[classificacao_e_extracao_em_alto_volume|Classificação e extração em alto volume]]"
  - "[[construcao_de_agentes|Construção de agentes]]"
  - "[[modelos_de_decisao_e_fine_tuning|Modelos de decisão e fine-tuning]]"
variacoes: []
ferramentas:
  - tabela:litellm
  - tabela:openrouter
  - tabela:portkey
  - "[[langgraph|LangGraph]]"
  - "[[jev|Jev]]"
  - "[[laya|Laya]]"
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Routing
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
