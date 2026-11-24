---
id: structured_output
tipo: padrao
nome: Structured Output
aliases:
  - Saída estruturada
  - JSON Schema
descricao: Restringe a saída do modelo a um formato verificável (JSON Schema, tipos) e valida o resultado, de modo que o código consuma a resposta sem interpretar texto livre.
fonte_ids:
  - openai_structured
  - claude_tool_use
  - anthropic_agents
exemplo: 'O modelo devolve {"fornecedor": ..., "total": ...} validado por um modelo Pydantic antes de gravar a nota fiscal.'
quando_usar:
  - Extração de dados de documentos e e-mails
  - Chamadas de ferramentas e APIs com argumentos estritos
  - Qualquer etapa cuja saída alimenta código
quando_evitar:
  - Respostas conversacionais abertas para pessoas
  - Quando restringir demais o formato prejudica o raciocínio (use um campo de raciocínio antes do resultado)
status: revisado
publico: false
fontes:
  - id: openai_structured
    tipo: artigo
    titulo: Structured Outputs (documentação OpenAI)
    link: https://developers.openai.com/api/docs/guides/structured-outputs
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: claude_tool_use
    tipo: artigo
    titulo: Tool use with Claude (documentação Anthropic)
    link: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: anthropic_agents
    tipo: artigo
    titulo: Building effective agents (Anthropic)
    link: https://www.anthropic.com/research/building-effective-agents
    status_revisao: revisada
    proxima_revisao: 2027-11-22
categorias:
  - "[[validacao_schemas|Validação e schemas]]"
  - "[[orquestracao_llm|Orquestração de LLM]]"
familia: ia
subfamilia: Qualidade e segurança
problema: Texto livre do LLM quebra parsers, e campos faltantes ou com tipo errado causam falhas em sistemas downstream.
tradeoffs:
  - "Ganha: integração confiável com código; paga: schemas e validação para manter"
  - "Ganha: menos retries por formato inválido; paga: restrições rígidas podem limitar a expressividade da resposta"
consequencias:
  - Valide sempre com Pydantic ou Zod mesmo com decodificação restrita
  - Versione os schemas junto do código
padroesRelacionados:
  - "[[guardrails_llm|Guardrails]]"
  - "[[prompt_chaining|Prompt Chaining]]"
  - "[[tool_use|Tool Use (padrão)]]"
casosDeUso:
  - "[[classificacao_e_extracao_em_alto_volume|Classificação e extração em alto volume]]"
  - "[[analise_de_documentos_e_imagens|Análise de documentos e imagens]]"
  - "[[construcao_de_agentes|Construção de agentes]]"
  - "[[integracao_de_apis_e_webhooks|Integração de APIs e webhooks]]"
variacoes: []
ferramentas:
  - tabela:instructor
  - "[[pydantic|Pydantic]]"
  - "[[zod|Zod]]"
  - tabela:vercel-ai-sdk
  - "[[langchain|LangChain]]"
  - tabela:pydantic-ai
  - tabela:spring-ai
  - tabela:langchain4j
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Structured Output
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
