---
id: when2call
tipo: benchmark
nome: When2Call
aliases:
  - When2Call (NVIDIA)
descricao: Benchmark da NVIDIA que mede quando um modelo deve chamar uma ferramenta, pedir esclarecimento ou admitir que não consegue responder.
area: decisao
avalia: "Decisão de uso de ferramentas: gerar a chamada, fazer pergunta de acompanhamento, recusar por falta de ferramenta ou responder direto."
metodo: Perguntas de múltipla escolha cobrem quatro comportamentos desejados. O modelo escolhe o comportamento correto para cada cenário; o artigo também traz conjunto de treino para preferência.
metrica: Acurácia (%) na escolha do comportamento.
escala: 0 a 100; maior é melhor.
limitacoes: Mede a decisão, e a execução da chamada fica fora. As tabelas dos fornecedores usam versões e prompts próprios, então os números do mesmo modelo variam entre fontes.
saturacao: baixa
contaminacao: Conjunto e dados de treino são públicos (artigo NAACL 2025). Risco de vazamento não verificado.
mantenedor: NVIDIA
urlOficial: https://arxiv.org/abs/2504.18851
dataVerificacao: 2026-11-22
funcionalidadesMedidas:
  - "[[tool_use_funcionalidade|Tool use]]"
  - "[[decisao_tipada_com_confianca|Decisão tipada com confiança]]"
  - "[[human_in_the_loop_funcionalidade|Human in the loop]]"
casosDeUsoRelacionados:
  - "[[construcao_de_agentes|Construção de agentes]]"
  - "[[modelos_de_decisao_e_fine_tuning|Modelos de decisão e fine-tuning]]"
  - "[[automacao_de_processos|Automação de processos]]"
modelosAvaliados:
  - "[[jev|Jev]]"
  - "[[gemini_decision_1|Gemini Decision 1]]"
  - "[[gpt_6_luna|GPT-6 Luna]]"
  - "[[clef|Clef]]"
  - "[[clef_flash|Clef-flash]]"
  - "[[laya|Laya]]"
resultados:
  - modelo: "[[jev|Jev]]"
    valor: 82
    unidade: "%"
    origem: autodeclarado-fornecedor
    fonte: https://www.marktechpost.com/2026/11/11/google-gemini-decisions-api-gemini-decision-1/
    data: 2026-11-22
    nota: Número reportado pela Google no blog de lançamento, relatado pelo MarkTechPost; autodeclarado. Jev 1.14.
  - modelo: "[[gemini_decision_1|Gemini Decision 1]]"
    valor: 79.9
    unidade: "%"
    origem: autodeclarado-fornecedor
    fonte: https://www.marktechpost.com/2026/11/11/google-gemini-decisions-api-gemini-decision-1/
    data: 2026-11-22
    nota: Número reportado pela Google no blog de lançamento, relatado pelo MarkTechPost; autodeclarado.
  - modelo: "[[gpt_6_luna|GPT-6 Luna]]"
    valor: 70.4
    unidade: "%"
    origem: autodeclarado-fornecedor
    fonte: https://www.marktechpost.com/2026/11/11/google-gemini-decisions-api-gemini-decision-1/
    data: 2026-11-22
    nota: Número reportado pela Google no blog de lançamento, relatado pelo MarkTechPost; autodeclarado.
  - modelo: "[[jev|Jev]]"
    valor: 80.97
    unidade: "%"
    origem: autodeclarado-fornecedor
    fonte: https://blog.cloudflare.com/clef-decision-models/
    data: 2026-11-22
    nota: Número da tabela da Cloudflare, que também mediu o modelo concorrente; autodeclarado.
  - modelo: "[[clef|Clef]]"
    valor: 72.37
    unidade: "%"
    origem: autodeclarado-fornecedor
    fonte: https://blog.cloudflare.com/clef-decision-models/
    data: 2026-11-22
    nota: Número da tabela da Cloudflare, que também mediu o modelo concorrente; autodeclarado.
  - modelo: "[[clef_flash|Clef-flash]]"
    valor: 65.58
    unidade: "%"
    origem: autodeclarado-fornecedor
    fonte: https://blog.cloudflare.com/clef-decision-models/
    data: 2026-11-22
    nota: Número da tabela da Cloudflare, que também mediu o modelo concorrente; autodeclarado.
  - modelo: "[[laya|Laya]]"
    valor: 11.94
    unidade: "%"
    origem: autodeclarado-fornecedor
    fonte: https://blog.cloudflare.com/clef-decision-models/
    data: 2026-11-22
    nota: Número da tabela da Cloudflare, que também mediu o modelo concorrente; autodeclarado.
tags:
  - benchmark
  - ia
---
# When2Call
## 📝 Descrição
Benchmark da NVIDIA que mede quando um modelo deve chamar uma ferramenta, pedir esclarecimento ou admitir que não consegue responder. Mantido por NVIDIA. Página oficial: https://arxiv.org/abs/2504.18851
## 🎯 O que avalia
Decisão de uso de ferramentas: gerar a chamada, fazer pergunta de acompanhamento, recusar por falta de ferramenta ou responder direto.
## ⚙ Como funciona (método e métrica)
- **Método:** Perguntas de múltipla escolha cobrem quatro comportamentos desejados. O modelo escolhe o comportamento correto para cada cenário; o artigo também traz conjunto de treino para preferência.
- **Métrica:** Acurácia (%) na escolha do comportamento.
- **Escala:** 0 a 100; maior é melhor.
## ⚠ Limitações
Mede a decisão, e a execução da chamada fica fora. As tabelas dos fornecedores usam versões e prompts próprios, então os números do mesmo modelo variam entre fontes.
## 🌡 Saturação e contaminação
- **Saturação:** baixa. O melhor valor nas fontes consultadas é 82,0%, longe do teto.
- **Contaminação:** Conjunto e dados de treino são públicos (artigo NAACL 2025). Risco de vazamento não verificado.
## 📊 Resultados
Cada linha vem do campo `resultados` (consulta em 2026-11-22: 7 pontuações lidas, 0 `não verificado`). Origem `autodeclarado-fornecedor` indica número publicado pelo próprio fornecedor ou por quem mede um concorrente. Valores `não verificado` registram consulta sem pontuação oficial legível.

## 🧭 Como usar na escolha de modelo
A pontuação ainda separa bem os modelos, então ela serve para ordenar candidatos. Compare apenas a mesma condição de teste. Combine com os benchmarks da mesma área (decisao) e com uma avaliação própria, porque cada fornecedor escolhe quais testes publicar.
## 🔗 Relacionamentos
- **Funcionalidades medidas:** [[tool_use_funcionalidade|Tool use]], [[decisao_tipada_com_confianca|Decisão tipada com confiança]], [[human_in_the_loop_funcionalidade|Human in the loop]]
- **Casos de uso:** [[construcao_de_agentes|Construção de agentes]], [[modelos_de_decisao_e_fine_tuning|Modelos de decisão e fine-tuning]], [[automacao_de_processos|Automação de processos]]
- **Modelos avaliados:** [[jev|Jev]], [[gemini_decision_1|Gemini Decision 1]], [[gpt_6_luna|GPT-6 Luna]], [[clef|Clef]], [[clef_flash|Clef-flash]], [[laya|Laya]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
