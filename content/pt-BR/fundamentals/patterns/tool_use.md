---
id: tool_use
tipo: padrao
nome: Tool Use
aliases:
  - Tool Use
  - Function Calling
  - Chamada de ferramentas
descricao: O modelo recebe a descrição de ferramentas (funções, APIs, MCP) e decide quando chamá-las com argumentos estruturados, e a aplicação executa a chamada e devolve o resultado ao modelo.
fonte_ids:
  - claude_tool_use
  - arxiv_toolformer
  - anthropic_agents
exemplo: O modelo chama buscar_pedido(id=123), a aplicação consulta a API e devolve o JSON para o modelo responder.
quando_usar:
  - Acesso a APIs, bancos e busca na web
  - Execução de código e cálculos exatos
  - Automação de tarefas em sistemas de terceiros via MCP
quando_evitar:
  - Perguntas respondíveis só com conhecimento do modelo
  - Ações irreversíveis sem confirmação humana e sem permissões mínimas
status: revisado
publico: false
fontes:
  - id: claude_tool_use
    tipo: artigo
    titulo: Tool use with Claude (documentação Anthropic)
    link: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: arxiv_toolformer
    tipo: artigo
    titulo: "Toolformer: Language Models Can Teach Themselves to Use Tools (Schick et al.)"
    link: https://arxiv.org/abs/2302.04761
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: anthropic_agents
    tipo: artigo
    titulo: Building effective agents (Anthropic)
    link: https://www.anthropic.com/research/building-effective-agents
    status_revisao: revisada
    proxima_revisao: 2027-11-22
categorias:
  - "[[framework_agentes|Framework de agentes]]"
  - "[[orquestracao_llm|Orquestração de LLM]]"
  - "[[agentes_computador_navegador|Agentes que usam computador e navegador]]"
familia: ia
subfamilia: Agentes e fluxos
problema: Modelos de linguagem sozinhos não acessam dados atuais, não executam código nem agem em sistemas externos.
tradeoffs:
  - "Ganha: capacidade de agir e de consultar dados atuais; paga: superfície de ataque maior (injeção de prompt via resultados)"
  - "Ganha: respostas fundamentadas em dados reais; paga: erros de argumentos e chamadas redundantes aumentam o custo"
consequencias:
  - Descrições claras e schemas estritos melhoram a seleção de ferramentas
  - Permissões mínimas e confirmação para ações sensíveis são obrigatórias
padroesRelacionados:
  - "[[agentic_rag|Agentic RAG]]"
  - "[[guardrails_llm|Guardrails]]"
  - "[[human_in_the_loop|Human-in-the-Loop]]"
  - "[[multi_agent|Multi-Agent]]"
  - "[[react_agente|ReAct (padrão)]]"
  - "[[structured_output|Structured Output]]"
casosDeUso:
  - "[[construcao_de_agentes|Construção de agentes]]"
  - "[[agente_que_usa_o_computador|Agente que usa o computador]]"
  - "[[integracao_de_apis_e_webhooks|Integração de APIs e webhooks]]"
  - "[[automacao_de_desenvolvimento|Automação de desenvolvimento]]"
variacoes: []
ferramentas:
  - "[[langchain|LangChain]]"
  - "[[langgraph|LangGraph]]"
  - tabela:openai-agents-sdk
  - "[[composio|Composio]]"
  - "[[browser_use|Browser Use]]"
  - tabela:vercel-ai-sdk
  - "[[kiro_cli|Kiro CLI]]"
  - tabela:strands-agents
  - tabela:spring-ai
  - tabela:langchain4j
  - tabela:mastra
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Tool Use
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
