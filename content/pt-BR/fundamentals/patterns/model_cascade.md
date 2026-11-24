---
id: model_cascade
tipo: padrao
nome: Model Cascade
aliases:
  - Cascata de modelos
  - Decision Model Gate
  - FrugalGPT
descricao: Tenta primeiro um modelo barato e escala para um mais forte apenas quando a confiança é baixa. Um modelo de decisão tipado pode atuar como portão, devolvendo escolha e confiança sem gerar texto.
fonte_ids:
  - arxiv_frugalgpt
  - gcp_agentic_patterns
  - anthropic_agents
exemplo: Um modelo pequeno responde 80% das perguntas e escala as de baixa confiança para um modelo maior.
quando_usar:
  - Alto volume com mistura de pedidos fáceis e difíceis
  - Metas de custo por requisição
  - Classificação, extração e roteamento com confiança calibrada
quando_evitar:
  - Cenários em que toda requisição é difícil
  - Quando a confiança do modelo barato é mal calibrada e não há como validá-la
status: revisado
publico: false
fontes:
  - id: arxiv_frugalgpt
    tipo: artigo
    titulo: "FrugalGPT: How to Use Large Language Models While Reducing Cost and Improving Performance (Chen et al.)"
    link: https://arxiv.org/abs/2305.05176
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: gcp_agentic_patterns
    tipo: artigo
    titulo: Choose a design pattern for your agentic AI system (Google Cloud Architecture Center)
    link: https://docs.cloud.google.com/architecture/choose-design-pattern-agentic-ai-system
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: anthropic_agents
    tipo: artigo
    titulo: Building effective agents (Anthropic)
    link: https://www.anthropic.com/research/building-effective-agents
    status_revisao: revisada
    proxima_revisao: 2027-11-22
categorias:
  - "[[modelo_decisao|Modelo de decisão]]"
  - "[[orquestracao_llm|Orquestração de LLM]]"
familia: ia
subfamilia: Custo e desempenho
problema: Usar o modelo mais forte para todo pedido desperdiça custo e latência, pois a maior parte das entradas é simples.
tradeoffs:
  - "Ganha: redução relevante de custo mantendo a qualidade nos casos difíceis; paga: latência extra nos pedidos que escalam"
  - "Ganha: uso eficiente de modelos fortes; paga: calibração do limiar de confiança e monitoramento de erros do modelo barato"
consequencias:
  - Métricas de taxa de escalonamento e de erro por faixa guiam o ajuste do limiar
  - Um modelo de decisão como portão dá confiança tipada para a regra de escalonamento
padroesRelacionados:
  - "[[llm_as_judge|LLM-as-Judge]]"
  - "[[routing_llm|Routing]]"
  - "[[semantic_caching|Semantic Caching]]"
casosDeUso:
  - "[[classificacao_e_extracao_em_alto_volume|Classificação e extração em alto volume]]"
  - "[[modelos_de_decisao_e_fine_tuning|Modelos de decisão e fine-tuning]]"
  - "[[atendimento_e_suporte|Atendimento e suporte]]"
  - "[[construcao_de_agentes|Construção de agentes]]"
variacoes: []
ferramentas:
  - "[[jev|Jev]]"
  - "[[laya|Laya]]"
  - "[[clef|Clef]]"
  - tabela:litellm
  - tabela:openrouter
  - tabela:portkey
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Model Cascade
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
