---
id: mrcr_v2
tipo: benchmark
nome: MRCR v2
aliases:
  - OpenAI MRCR
  - MRCR
descricao: "Multi-round co-reference resolution: o modelo precisa recuperar a n-ésima ocorrência de um pedido em um diálogo longo com várias agulhas parecidas."
area: contexto-longo
avalia: Recuperação precisa em contexto longo quando há várias passagens quase iguais.
metodo: O prompt reúne um diálogo longo com 2, 4 ou 8 pedidos parecidos. O modelo deve repetir a resposta de uma ocorrência indicada, e a similaridade com o gabarito dá a nota.
metrica: Pontuação de correspondência (%), por faixa de tamanho de contexto.
escala: 0 a 100; maior é melhor.
limitacoes: Mede recuperação em contexto longo, e o raciocínio sobre ele fica fora. A faixa de tokens e o número de agulhas mudam o valor; compare só a mesma configuração.
saturacao: media
contaminacao: Conteúdo sintético gerado para o teste. O risco de vazamento é baixo, e não foi verificado.
mantenedor: OpenAI
urlOficial: https://huggingface.co/datasets/openai/mrcr
dataVerificacao: 2026-11-22
funcionalidadesMedidas:
  - "[[contexto_longo|Contexto longo]]"
  - "[[recuperacao_aumentada_rag|Recuperação aumentada (RAG)]]"
casosDeUsoRelacionados:
  - "[[resumo_de_documentos|Resumo de documentos]]"
  - "[[rag_sobre_base_de_conhecimento|RAG sobre base de conhecimento]]"
  - "[[analise_de_documentos_e_imagens|Análise de documentos e imagens]]"
modelosAvaliados:
  - "[[gpt_5_5|GPT-5.5]]"
  - "[[gemini_3_1_pro|Gemini 3.1 Pro]]"
  - "[[claude_sonnet_4_6|Claude Sonnet 4.6]]"
resultados:
  - modelo: "[[gpt_5_5|GPT-5.5]]"
    valor: 87.5
    unidade: "% (8-needle, 128K a 256K)"
    origem: autodeclarado-fornecedor
    fonte: https://openai.com/index/introducing-gpt-5-5/
    data: 2026-11-22
  - modelo: "[[gemini_3_1_pro|Gemini 3.1 Pro]]"
    valor: 84.9
    unidade: "% (8-needle, média em 128k)"
    origem: autodeclarado-fornecedor
    fonte: https://deepmind.google/models/model-cards/gemini-3-1-pro/
    data: 2026-11-22
  - modelo: "[[claude_sonnet_4_6|Claude Sonnet 4.6]]"
    valor: 84.9
    unidade: "% (8-needle, média em 128k)"
    origem: autodeclarado-fornecedor
    fonte: https://deepmind.google/models/model-cards/gemini-3-1-pro/
    data: 2026-11-22
    nota: Número de modelo de terceiro, reportado na tabela do model card do Gemini 3.1 Pro (Google).
  - modelo: "[[gemini_3_1_pro|Gemini 3.1 Pro]]"
    valor: 26.3
    unidade: "% (8-needle, 1M pontual)"
    origem: autodeclarado-fornecedor
    fonte: https://deepmind.google/models/model-cards/gemini-3-1-pro/
    data: 2026-11-22
tags:
  - benchmark
  - ia
---
# MRCR v2
## 📝 Descrição
Multi-round co-reference resolution: o modelo precisa recuperar a n-ésima ocorrência de um pedido em um diálogo longo com várias agulhas parecidas. Mantido por OpenAI. Página oficial: https://huggingface.co/datasets/openai/mrcr
## 🎯 O que avalia
Recuperação precisa em contexto longo quando há várias passagens quase iguais.
## ⚙ Como funciona (método e métrica)
- **Método:** O prompt reúne um diálogo longo com 2, 4 ou 8 pedidos parecidos. O modelo deve repetir a resposta de uma ocorrência indicada, e a similaridade com o gabarito dá a nota.
- **Métrica:** Pontuação de correspondência (%), por faixa de tamanho de contexto.
- **Escala:** 0 a 100; maior é melhor.
## ⚠ Limitações
Mede recuperação em contexto longo, e o raciocínio sobre ele fica fora. A faixa de tokens e o número de agulhas mudam o valor; compare só a mesma configuração.
## 🌡 Saturação e contaminação
- **Saturação:** media. No 8-needle, de 128K a 256K, o GPT-5.5 marca 87,5%, e a faixa de 512K a 1M cai para 74,0%.
- **Contaminação:** Conteúdo sintético gerado para o teste. O risco de vazamento é baixo, e não foi verificado.
## 📊 Resultados
Cada linha vem do campo `resultados` (consulta em 2026-11-22: 4 pontuações lidas, 0 `não verificado`). Origem `autodeclarado-fornecedor` indica número publicado pelo próprio fornecedor ou por quem mede um concorrente. Valores `não verificado` registram consulta sem pontuação oficial legível.

## 🧭 Como usar na escolha de modelo
Ainda há margem entre os modelos, então a pontuação ajuda a ordenar candidatos. Confirme com uma amostra do seu caso de uso. Combine com os benchmarks da mesma área (contexto-longo) e com uma avaliação própria, porque cada fornecedor escolhe quais testes publicar.
## 🔗 Relacionamentos
- **Funcionalidades medidas:** [[contexto_longo|Contexto longo]], [[recuperacao_aumentada_rag|Recuperação aumentada (RAG)]]
- **Casos de uso:** [[resumo_de_documentos|Resumo de documentos]], [[rag_sobre_base_de_conhecimento|RAG sobre base de conhecimento]], [[analise_de_documentos_e_imagens|Análise de documentos e imagens]]
- **Modelos avaliados:** [[gpt_5_5|GPT-5.5]], [[gemini_3_1_pro|Gemini 3.1 Pro]], [[claude_sonnet_4_6|Claude Sonnet 4.6]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
