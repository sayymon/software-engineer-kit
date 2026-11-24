---
id: guardrails_llm
tipo: padrao
nome: Guardrails
aliases:
  - Guardrails de LLM
  - Trilhos de segurança
descricao: "Camadas de validação de entrada e saída do LLM que bloqueiam, corrigem ou escalam conteúdos fora da política: injeção de prompt, dados sensíveis, tópicos negados, toxicidade e alucinações."
fonte_ids:
  - arxiv_nemo_guardrails
  - anthropic_agents
  - gcp_agentic_patterns
exemplo: Um filtro de entrada detecta injeção de prompt e outro filtro de saída mascara CPF antes da resposta ao usuário.
quando_usar:
  - Aplicações voltadas a clientes e a dados regulados
  - Agentes com ferramentas que agem em sistemas reais
  - Requisitos de compliance e de marca
quando_evitar:
  - Protótipos internos sem dados sensíveis
  - Quando os filtros geram tantos falsos positivos que bloqueiam o uso legítimo
status: revisado
publico: false
fontes:
  - id: arxiv_nemo_guardrails
    tipo: artigo
    titulo: "NeMo Guardrails: A Toolkit for Controllable and Safe LLM Applications (Rebedea et al.)"
    link: https://arxiv.org/abs/2310.10501
    status_revisao: revisada
    proxima_revisao: 2027-11-22
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
categorias:
  - "[[guardrails_seguranca_llm|Guardrails e segurança de LLM]]"
  - "[[orquestracao_llm|Orquestração de LLM]]"
familia: ia
subfamilia: Qualidade e segurança
problema: Modelos podem vazar dados, seguir instruções maliciosas embutidas em conteúdo e produzir respostas fora da política da empresa.
tradeoffs:
  - "Ganha: redução de riscos de segurança e reputação; paga: latência e falsos positivos a calibrar"
  - "Ganha: política aplicada de forma consistente; paga: não substitui permissões mínimas e isolamento de ferramentas"
consequencias:
  - Guardrails entram em camadas (entrada, saída e ações), sem depender de uma só barreira
  - Registre e revise os bloqueios para ajustar as regras
padroesRelacionados:
  - "[[human_in_the_loop|Human-in-the-Loop]]"
  - "[[llm_as_judge|LLM-as-Judge]]"
  - "[[structured_output|Structured Output]]"
  - "[[tool_use|Tool Use (padrão)]]"
casosDeUso:
  - "[[construcao_de_agentes|Construção de agentes]]"
  - "[[rag_sobre_base_de_conhecimento|RAG sobre base de conhecimento]]"
  - "[[atendimento_e_suporte|Atendimento e suporte]]"
  - "[[seguranca_de_codigo_e_dependencias|Segurança de código e dependências]]"
variacoes: []
ferramentas:
  - "[[amazon_bedrock_guardrails|Amazon Bedrock Guardrails]]"
  - tabela:guardrails-ai
  - tabela:nemo-guardrails
  - tabela:llm-guard
  - tabela:llama-guard
  - tabela:lakera-guard
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Guardrails
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
