---
id: semantic_caching
tipo: padrao
nome: Semantic Caching
aliases:
  - Cache semântico
descricao: Guarda respostas de LLM indexadas por embeddings da pergunta e reutiliza a resposta quando uma nova pergunta é semanticamente próxima, sem chamar o modelo.
fonte_ids:
  - gptcache_repo
  - arxiv_frugalgpt
exemplo: Perguntas como como cancelar a assinatura e quero cancelar meu plano retornam a mesma resposta do cache.
quando_usar:
  - Chatbots e FAQs com muitas perguntas repetidas ou parafraseadas
  - Reduzir custo e latência em alto volume
  - Respostas estáveis, que não dependem de dados do usuário
quando_evitar:
  - Respostas personalizadas ou dependentes de dados que mudam
  - Domínios em que uma resposta ligeiramente errada tem custo alto
status: revisado
publico: false
fontes:
  - id: gptcache_repo
    tipo: artigo
    titulo: "GPTCache: semantic cache for LLM queries (Zilliz)"
    link: https://github.com/zilliztech/GPTCache
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: arxiv_frugalgpt
    tipo: artigo
    titulo: "FrugalGPT: How to Use Large Language Models While Reducing Cost and Improving Performance (Chen et al.)"
    link: https://arxiv.org/abs/2305.05176
    status_revisao: revisada
    proxima_revisao: 2027-11-22
categorias:
  - "[[orquestracao_llm|Orquestração de LLM]]"
  - "[[chave_valor_cache|Chave-valor e cache]]"
  - "[[vector_store|Vector store]]"
familia: ia
subfamilia: Custo e desempenho
problema: Perguntas parecidas chegam repetidamente e cada chamada custa tokens e latência, mesmo com respostas praticamente iguais.
tradeoffs:
  - "Ganha: custo e latência menores nos acertos de cache; paga: risco de servir resposta errada para pergunta parecida"
  - "Ganha: escala barata; paga: limiar de similaridade e invalidação exigem calibração"
consequencias:
  - O limiar de similaridade precisa ser medido com exemplos reais
  - Escopo do cache por tenant e por versão de prompt evita vazamentos
padroesRelacionados:
  - "[[cache_aside|Cache-aside]]"
  - "[[model_cascade|Model Cascade]]"
  - "[[rag|RAG (padrão)]]"
casosDeUso:
  - "[[atendimento_e_suporte|Atendimento e suporte]]"
  - "[[chat_e_assistente_geral|Chat e assistente geral]]"
  - "[[rag_sobre_base_de_conhecimento|RAG sobre base de conhecimento]]"
  - "[[observabilidade_em_producao|Observabilidade em produção]]"
variacoes: []
ferramentas:
  - tabela:gptcache
  - "[[redis|Redis (ferramenta)]]"
  - tabela:litellm
  - tabela:portkey
  - "[[pgvector|pgvector]]"
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Semantic Caching
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
