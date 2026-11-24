---
id: agent_memory
tipo: padrao
nome: Agent Memory
aliases:
  - Memória de agente
descricao: "Dá ao agente memória além do contexto da conversa: curto prazo (histórico resumido), longo prazo (fatos e preferências em armazenamento externo) e episódica (experiências passadas)."
fonte_ids:
  - arxiv_memgpt
  - anthropic_agents
  - gcp_agentic_patterns
exemplo: O assistente grava a preferência por respostas curtas em um armazenamento vetorial e a recupera nas sessões seguintes.
quando_usar:
  - Assistentes que lembram preferências entre sessões
  - Agentes de longa duração com muitas etapas
  - Tarefas que reaproveitam aprendizados anteriores
quando_evitar:
  - Conversas curtas sem continuidade
  - Dados sensíveis sem política de retenção e de esquecimento
status: revisado
publico: false
fontes:
  - id: arxiv_memgpt
    tipo: artigo
    titulo: "MemGPT: Towards LLMs as Operating Systems (Packer et al.)"
    link: https://arxiv.org/abs/2310.08560
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
  - "[[vector_store|Vector store]]"
  - "[[framework_agentes|Framework de agentes]]"
  - "[[chave_valor_cache|Chave-valor e cache]]"
familia: ia
subfamilia: Agentes e fluxos
problema: O contexto do modelo é finito e esquece o que ficou fora da janela, o que prejudica agentes de longa duração e personalização.
tradeoffs:
  - "Ganha: continuidade e personalização; paga: custo de armazenar, recuperar e manter a memória consistente"
  - "Ganha: janela de contexto mais enxuta; paga: memórias erradas ou obsoletas contaminam as respostas"
consequencias:
  - Política de retenção, correção e exclusão precisa existir (LGPD)
  - Memória recuperada usa os mesmos cuidados do RAG (relevância e permissão)
padroesRelacionados:
  - "[[multi_agent|Multi-Agent]]"
  - "[[rag|RAG (padrão)]]"
  - "[[reflection|Reflection]]"
casosDeUso:
  - "[[agentes_autonomos_de_longa_duracao|Agentes autônomos de longa duração]]"
  - "[[construcao_de_agentes|Construção de agentes]]"
  - "[[chat_e_assistente_geral|Chat e assistente geral]]"
  - "[[base_de_conhecimento_pessoal|Base de conhecimento pessoal]]"
variacoes: []
ferramentas:
  - "[[langgraph|LangGraph]]"
  - "[[pgvector|pgvector]]"
  - "[[redis|Redis (ferramenta)]]"
  - "[[pinecone|Pinecone]]"
  - "[[chromadb|ChromaDB]]"
  - "[[adk_agent_development_kit|ADK]]"
  - tabela:mem0
  - tabela:letta
  - tabela:graphiti
  - tabela:cognee
  - "[[kiro_crew|Kiro Crew]]"
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Agent Memory
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
