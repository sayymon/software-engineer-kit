---
id: mteb
tipo: benchmark
nome: MTEB
aliases:
  - Massive Text Embedding Benchmark
descricao: Benchmark de embeddings de texto com dezenas de tarefas e idiomas.
area: embeddings
avalia: Qualidade de embeddings em recuperação, classificação, agrupamento, similaridade e outras tarefas.
metodo: Cada modelo gera embeddings e um avaliador padrão mede cada tarefa com a métrica própria (nDCG@10, F1 e outras). A média por categoria forma o ranking.
metrica: Média das métricas por tarefa (%).
escala: 0 a 100; maior é melhor.
limitacoes: A média esconde diferenças por tarefa e idioma. Os modelos podem ter visto os conjuntos de treino públicos das tarefas.
saturacao: não verificado
contaminacao: Conjuntos de tarefas públicos. A flag de zero-shot do leaderboard indica a sobreposição. Não verificado.
mantenedor: Hugging Face e comunidade MTEB
urlOficial: https://huggingface.co/spaces/mteb/leaderboard
dataVerificacao: 2026-11-22
funcionalidadesMedidas:
  - "[[geracao_de_embeddings|Geração de embeddings]]"
  - "[[busca_semantica|Busca semântica]]"
casosDeUsoRelacionados:
  - "[[geracao_de_embeddings_para_busca|Geração de embeddings para busca]]"
  - "[[busca_semantica_em_acervos|Busca semântica em acervos]]"
  - "[[rag_sobre_base_de_conhecimento|RAG sobre base de conhecimento]]"
modelosAvaliados:
  - "[[gemini_embedding_2|Gemini Embedding 2]]"
  - "[[text_embedding_3_large|text-embedding-3-large]]"
resultados:
  - modelo: "[[gemini_embedding_2|Gemini Embedding 2]]"
    valor: não verificado
    unidade: não verificado
    origem: não verificado
    fonte: não verificado
    data: não verificado
    nota: O leaderboard oficial bloqueou a leitura automática (HTTP 403) em 2026-11-22.
  - modelo: "[[text_embedding_3_large|text-embedding-3-large]]"
    valor: não verificado
    unidade: não verificado
    origem: não verificado
    fonte: não verificado
    data: não verificado
    nota: O leaderboard oficial bloqueou a leitura automática (HTTP 403) em 2026-11-22.
tags:
  - benchmark
  - ia
---
# MTEB
## 📝 Descrição
Benchmark de embeddings de texto com dezenas de tarefas e idiomas. Mantido por Hugging Face e comunidade MTEB. Página oficial: https://huggingface.co/spaces/mteb/leaderboard
## 🎯 O que avalia
Qualidade de embeddings em recuperação, classificação, agrupamento, similaridade e outras tarefas.
## ⚙ Como funciona (método e métrica)
- **Método:** Cada modelo gera embeddings e um avaliador padrão mede cada tarefa com a métrica própria (nDCG@10, F1 e outras). A média por categoria forma o ranking.
- **Métrica:** Média das métricas por tarefa (%).
- **Escala:** 0 a 100; maior é melhor.
## ⚠ Limitações
A média esconde diferenças por tarefa e idioma. Os modelos podem ter visto os conjuntos de treino públicos das tarefas.
## 🌡 Saturação e contaminação
- **Saturação:** não verificado. O leaderboard retornou HTTP 403 em 2026-11-22 e nenhuma pontuação foi lida.
- **Contaminação:** Conjuntos de tarefas públicos. A flag de zero-shot do leaderboard indica a sobreposição. Não verificado.
## 📊 Resultados
Cada linha vem do campo `resultados` (consulta em 2026-11-22: 0 pontuações lidas, 2 `não verificado`). Origem `autodeclarado-fornecedor` indica número publicado pelo próprio fornecedor ou por quem mede um concorrente. Valores `não verificado` registram consulta sem pontuação oficial legível.

## 🧭 Como usar na escolha de modelo
Sem pontuações oficiais legíveis, trate o benchmark como referência de método e rode o teste você mesmo antes de decidir. Combine com os benchmarks da mesma área (embeddings) e com uma avaliação própria, porque cada fornecedor escolhe quais testes publicar.
## 🔗 Relacionamentos
- **Funcionalidades medidas:** [[geracao_de_embeddings|Geração de embeddings]], [[busca_semantica|Busca semântica]]
- **Casos de uso:** [[geracao_de_embeddings_para_busca|Geração de embeddings para busca]], [[busca_semantica_em_acervos|Busca semântica em acervos]], [[rag_sobre_base_de_conhecimento|RAG sobre base de conhecimento]]
- **Modelos avaliados:** [[gemini_embedding_2|Gemini Embedding 2]], [[text_embedding_3_large|text-embedding-3-large]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
