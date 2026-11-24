---
id: mmmu
tipo: benchmark
nome: MMMU
aliases:
  - MMMU-Pro
descricao: Questões universitárias com imagens (diagramas, gráficos, partituras) em seis grandes áreas.
area: multimodal
avalia: Entendimento e raciocínio multimodal de nível universitário.
metodo: Múltipla escolha com imagem e texto. A variante Pro aumenta as alternativas e remove perguntas respondíveis só pelo texto.
metrica: Acurácia (%).
escala: 0 a 100; maior é melhor.
limitacoes: Os fornecedores reportam a variante MMMU-Pro, e a escolha entre com e sem ferramentas muda o valor.
saturacao: media
contaminacao: Conjunto público. Vazamento não verificado.
mantenedor: MMMU (Yue et al.)
urlOficial: https://mmmu-benchmark.github.io/
dataVerificacao: 2026-11-22
funcionalidadesMedidas:
  - "[[multimodal|Multimodal]]"
  - "[[raciocinio|Raciocínio]]"
casosDeUsoRelacionados:
  - "[[analise_de_documentos_e_imagens|Análise de documentos e imagens]]"
  - "[[infograficos_e_diagramas|Infográficos e diagramas]]"
modelosAvaliados:
  - "[[gpt_5_5|GPT-5.5]]"
  - "[[gemini_3_1_pro|Gemini 3.1 Pro]]"
  - "[[claude_sonnet_4_6|Claude Sonnet 4.6]]"
resultados:
  - modelo: "[[gpt_5_5|GPT-5.5]]"
    valor: 81.2
    unidade: "% (MMMU-Pro, sem ferramentas)"
    origem: autodeclarado-fornecedor
    fonte: https://openai.com/index/introducing-gpt-5-5/
    data: 2026-11-22
  - modelo: "[[gemini_3_1_pro|Gemini 3.1 Pro]]"
    valor: 80.5
    unidade: "% (MMMU-Pro, sem ferramentas)"
    origem: autodeclarado-fornecedor
    fonte: https://deepmind.google/models/model-cards/gemini-3-1-pro/
    data: 2026-11-22
  - modelo: "[[claude_sonnet_4_6|Claude Sonnet 4.6]]"
    valor: 74.5
    unidade: "% (MMMU-Pro, sem ferramentas)"
    origem: autodeclarado-fornecedor
    fonte: https://deepmind.google/models/model-cards/gemini-3-1-pro/
    data: 2026-11-22
    nota: Número de modelo de terceiro, reportado na tabela do model card do Gemini 3.1 Pro (Google).
tags:
  - benchmark
  - ia
---
# MMMU
## 📝 Descrição
Questões universitárias com imagens (diagramas, gráficos, partituras) em seis grandes áreas. Mantido por MMMU (Yue et al.). Página oficial: https://mmmu-benchmark.github.io/
## 🎯 O que avalia
Entendimento e raciocínio multimodal de nível universitário.
## ⚙ Como funciona (método e métrica)
- **Método:** Múltipla escolha com imagem e texto. A variante Pro aumenta as alternativas e remove perguntas respondíveis só pelo texto.
- **Métrica:** Acurácia (%).
- **Escala:** 0 a 100; maior é melhor.
## ⚠ Limitações
Os fornecedores reportam a variante MMMU-Pro, e a escolha entre com e sem ferramentas muda o valor.
## 🌡 Saturação e contaminação
- **Saturação:** media. De 74,5% a 81,2% no MMMU-Pro.
- **Contaminação:** Conjunto público. Vazamento não verificado.
## 📊 Resultados
Cada linha vem do campo `resultados` (consulta em 2026-11-22: 3 pontuações lidas, 0 `não verificado`). Origem `autodeclarado-fornecedor` indica número publicado pelo próprio fornecedor ou por quem mede um concorrente. Valores `não verificado` registram consulta sem pontuação oficial legível.

## 🧭 Como usar na escolha de modelo
Ainda há margem entre os modelos, então a pontuação ajuda a ordenar candidatos. Confirme com uma amostra do seu caso de uso. Combine com os benchmarks da mesma área (multimodal) e com uma avaliação própria, porque cada fornecedor escolhe quais testes publicar.
## 🔗 Relacionamentos
- **Funcionalidades medidas:** [[multimodal|Multimodal]], [[raciocinio|Raciocínio]]
- **Casos de uso:** [[analise_de_documentos_e_imagens|Análise de documentos e imagens]], [[infograficos_e_diagramas|Infográficos e diagramas]]
- **Modelos avaliados:** [[gpt_5_5|GPT-5.5]], [[gemini_3_1_pro|Gemini 3.1 Pro]], [[claude_sonnet_4_6|Claude Sonnet 4.6]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
