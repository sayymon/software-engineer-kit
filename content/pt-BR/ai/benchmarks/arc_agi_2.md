---
id: arc_agi_2
tipo: benchmark
nome: ARC-AGI-2
aliases:
  - ARC-AGI 2
descricao: Quebra-cabeças visuais de abstração que exigem inferir regras novas a partir de poucos exemplos.
area: raciocinio
avalia: Raciocínio abstrato e generalização para tarefas inéditas, difíceis para memorização.
metodo: O modelo vê pares de grades de entrada e saída e produz a grade de saída de um caso novo. A resposta precisa coincidir exatamente. O ARC Prize verifica os resultados em um conjunto privado.
metrica: Percentual de tarefas resolvidas (%).
escala: 0 a 100; maior é melhor.
limitacoes: Mede um tipo específico de abstração visual. O custo por tarefa varia muito, e o leaderboard oficial mostra custo ao lado da pontuação.
saturacao: media
contaminacao: Conjunto de avaliação privado e verificado pelo ARC Prize reduz o risco. As linhas abaixo vêm de páginas dos fornecedores.
mantenedor: ARC Prize Foundation
urlOficial: https://arcprize.org/arc-agi/2
dataVerificacao: 2026-11-22
funcionalidadesMedidas:
  - "[[raciocinio|Raciocínio]]"
  - "[[comparacao_de_modelos|Comparação de modelos]]"
casosDeUsoRelacionados:
  - "[[raciocinio_complexo_e_matematica|Raciocínio complexo e matemática]]"
  - "[[pesquisa_aprofundada|Pesquisa aprofundada]]"
modelosAvaliados:
  - "[[gpt_5_5|GPT-5.5]]"
  - "[[gemini_3_1_pro|Gemini 3.1 Pro]]"
  - "[[claude_sonnet_4_6|Claude Sonnet 4.6]]"
resultados:
  - modelo: "[[gpt_5_5|GPT-5.5]]"
    valor: 85
    unidade: "% (Verified)"
    origem: autodeclarado-fornecedor
    fonte: https://openai.com/index/introducing-gpt-5-5/
    data: 2026-11-22
  - modelo: "[[gemini_3_1_pro|Gemini 3.1 Pro]]"
    valor: 77.1
    unidade: "% (ARC Prize Verified)"
    origem: autodeclarado-fornecedor
    fonte: https://deepmind.google/models/model-cards/gemini-3-1-pro/
    data: 2026-11-22
  - modelo: "[[claude_sonnet_4_6|Claude Sonnet 4.6]]"
    valor: 58.3
    unidade: "% (ARC Prize Verified)"
    origem: autodeclarado-fornecedor
    fonte: https://deepmind.google/models/model-cards/gemini-3-1-pro/
    data: 2026-11-22
    nota: Número de modelo de terceiro, reportado na tabela do model card do Gemini 3.1 Pro (Google).
tags:
  - benchmark
  - ia
---
# ARC-AGI-2
## 📝 Descrição
Quebra-cabeças visuais de abstração que exigem inferir regras novas a partir de poucos exemplos. Mantido por ARC Prize Foundation. Página oficial: https://arcprize.org/arc-agi/2
## 🎯 O que avalia
Raciocínio abstrato e generalização para tarefas inéditas, difíceis para memorização.
## ⚙ Como funciona (método e métrica)
- **Método:** O modelo vê pares de grades de entrada e saída e produz a grade de saída de um caso novo. A resposta precisa coincidir exatamente. O ARC Prize verifica os resultados em um conjunto privado.
- **Métrica:** Percentual de tarefas resolvidas (%).
- **Escala:** 0 a 100; maior é melhor.
## ⚠ Limitações
Mede um tipo específico de abstração visual. O custo por tarefa varia muito, e o leaderboard oficial mostra custo ao lado da pontuação.
## 🌡 Saturação e contaminação
- **Saturação:** media. Valores entre 58,3% e 85,0% nas fontes lidas.
- **Contaminação:** Conjunto de avaliação privado e verificado pelo ARC Prize reduz o risco. As linhas abaixo vêm de páginas dos fornecedores.
## 📊 Resultados
Cada linha vem do campo `resultados` (consulta em 2026-11-22: 3 pontuações lidas, 0 `não verificado`). Origem `autodeclarado-fornecedor` indica número publicado pelo próprio fornecedor ou por quem mede um concorrente. Valores `não verificado` registram consulta sem pontuação oficial legível.

## 🧭 Como usar na escolha de modelo
Ainda há margem entre os modelos, então a pontuação ajuda a ordenar candidatos. Confirme com uma amostra do seu caso de uso. Combine com os benchmarks da mesma área (raciocinio) e com uma avaliação própria, porque cada fornecedor escolhe quais testes publicar.
## 🔗 Relacionamentos
- **Funcionalidades medidas:** [[raciocinio|Raciocínio]], [[comparacao_de_modelos|Comparação de modelos]]
- **Casos de uso:** [[raciocinio_complexo_e_matematica|Raciocínio complexo e matemática]], [[pesquisa_aprofundada|Pesquisa aprofundada]]
- **Modelos avaliados:** [[gpt_5_5|GPT-5.5]], [[gemini_3_1_pro|Gemini 3.1 Pro]], [[claude_sonnet_4_6|Claude Sonnet 4.6]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
