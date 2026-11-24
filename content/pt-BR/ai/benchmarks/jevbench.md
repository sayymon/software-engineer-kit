---
id: jevbench
tipo: benchmark
nome: JevBench
aliases:
  - Jev Decision Index
  - JevBench (public split)
descricao: Conjunto público de tarefas de decisão tipada usado pela comunidade de modelos de decisão (Jev Decision Index).
area: decisao
avalia: Acerto de modelos de decisão em tarefas de classificação, escolha e nota sobre um estado de entrada, com respostas tipadas.
metodo: Cada modelo recebe um estado e perguntas tipadas (sim/não, escolha, nota). O fornecedor roda a divisão pública e reporta a acurácia. Na tabela da Google, recusas e bloqueios de segurança contam como erro.
metrica: Acurácia (%) na divisão pública.
escala: 0 a 100; maior é melhor.
limitacoes: Os números publicados são autodeclarados pelos fornecedores, que escolhem quais testes mostrar. A composição exata do conjunto vem de fontes dos fornecedores; confira o índice antes de decidir.
saturacao: media
contaminacao: "Divisão pública: dados abertos podem ter vazado para o treino de modelos novos. Não verificado nas fontes consultadas."
mantenedor: Jev Decision Index (Hugging Face Space, comunidade e TypeSafe AI)
urlOficial: https://huggingface.co/spaces/multimodalart/jev-decision-index
dataVerificacao: 2026-11-22
funcionalidadesMedidas:
  - "[[decisao_tipada_com_confianca|Decisão tipada com confiança]]"
  - "[[saida_estruturada|Saída estruturada]]"
  - "[[avaliacao_de_qualidade|Avaliação de qualidade]]"
casosDeUsoRelacionados:
  - "[[modelos_de_decisao_e_fine_tuning|Modelos de decisão e fine-tuning]]"
  - "[[classificacao_e_extracao_em_alto_volume|Classificação e extração em alto volume]]"
  - "[[construcao_de_agentes|Construção de agentes]]"
modelosAvaliados:
  - "[[gemini_decision_1|Gemini Decision 1]]"
  - "[[gpt_6_luna|GPT-6 Luna]]"
  - "[[jev|Jev]]"
  - "[[gemini_3_5_flash_lite|Gemini 3.5 Flash-Lite]]"
resultados:
  - modelo: "[[gemini_decision_1|Gemini Decision 1]]"
    valor: 92.2
    unidade: "%"
    origem: autodeclarado-fornecedor
    fonte: https://www.marktechpost.com/2026/11/11/google-gemini-decisions-api-gemini-decision-1/
    data: 2026-11-22
    nota: Número reportado pela Google no blog de lançamento, relatado pelo MarkTechPost; autodeclarado.
  - modelo: "[[gpt_6_luna|GPT-6 Luna]]"
    valor: 90.9
    unidade: "%"
    origem: autodeclarado-fornecedor
    fonte: https://www.marktechpost.com/2026/11/11/google-gemini-decisions-api-gemini-decision-1/
    data: 2026-11-22
    nota: Número reportado pela Google no blog de lançamento, relatado pelo MarkTechPost; autodeclarado.
  - modelo: "[[jev|Jev]]"
    valor: 90
    unidade: "%"
    origem: autodeclarado-fornecedor
    fonte: https://www.marktechpost.com/2026/11/11/google-gemini-decisions-api-gemini-decision-1/
    data: 2026-11-22
    nota: Número reportado pela Google no blog de lançamento, relatado pelo MarkTechPost; autodeclarado.
  - modelo: "[[gemini_3_5_flash_lite|Gemini 3.5 Flash-Lite]]"
    valor: 86.6
    unidade: "%"
    origem: autodeclarado-fornecedor
    fonte: https://www.marktechpost.com/2026/11/11/google-gemini-decisions-api-gemini-decision-1/
    data: 2026-11-22
    nota: Número reportado pela Google no blog de lançamento, relatado pelo MarkTechPost; autodeclarado.
tags:
  - benchmark
  - ia
---
# JevBench
## 📝 Descrição
Conjunto público de tarefas de decisão tipada usado pela comunidade de modelos de decisão (Jev Decision Index). Mantido por Jev Decision Index (Hugging Face Space, comunidade e TypeSafe AI). Página oficial: https://huggingface.co/spaces/multimodalart/jev-decision-index
## 🎯 O que avalia
Acerto de modelos de decisão em tarefas de classificação, escolha e nota sobre um estado de entrada, com respostas tipadas.
## ⚙ Como funciona (método e métrica)
- **Método:** Cada modelo recebe um estado e perguntas tipadas (sim/não, escolha, nota). O fornecedor roda a divisão pública e reporta a acurácia. Na tabela da Google, recusas e bloqueios de segurança contam como erro.
- **Métrica:** Acurácia (%) na divisão pública.
- **Escala:** 0 a 100; maior é melhor.
## ⚠ Limitações
Os números publicados são autodeclarados pelos fornecedores, que escolhem quais testes mostrar. A composição exata do conjunto vem de fontes dos fornecedores; confira o índice antes de decidir.
## 🌡 Saturação e contaminação
- **Saturação:** media. Pontuações de 86,6% a 92,2% na tabela da Google deixam margem de subida.
- **Contaminação:** Divisão pública: dados abertos podem ter vazado para o treino de modelos novos. Não verificado nas fontes consultadas.
## 📊 Resultados
Cada linha vem do campo `resultados` (consulta em 2026-11-22: 4 pontuações lidas, 0 `não verificado`). Origem `autodeclarado-fornecedor` indica número publicado pelo próprio fornecedor ou por quem mede um concorrente. Valores `não verificado` registram consulta sem pontuação oficial legível.

## 🧭 Como usar na escolha de modelo
Ainda há margem entre os modelos, então a pontuação ajuda a ordenar candidatos. Confirme com uma amostra do seu caso de uso. Combine com os benchmarks da mesma área (decisao) e com uma avaliação própria, porque cada fornecedor escolhe quais testes publicar.
## 🔗 Relacionamentos
- **Funcionalidades medidas:** [[decisao_tipada_com_confianca|Decisão tipada com confiança]], [[saida_estruturada|Saída estruturada]], [[avaliacao_de_qualidade|Avaliação de qualidade]]
- **Casos de uso:** [[modelos_de_decisao_e_fine_tuning|Modelos de decisão e fine-tuning]], [[classificacao_e_extracao_em_alto_volume|Classificação e extração em alto volume]], [[construcao_de_agentes|Construção de agentes]]
- **Modelos avaliados:** [[gemini_decision_1|Gemini Decision 1]], [[gpt_6_luna|GPT-6 Luna]], [[jev|Jev]], [[gemini_3_5_flash_lite|Gemini 3.5 Flash-Lite]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
