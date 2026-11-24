---
id: bfcl
tipo: benchmark
nome: BFCL
aliases:
  - Berkeley Function Calling Leaderboard
descricao: Leaderboard da Universidade da Califórnia em Berkeley para chamadas de função por modelos de linguagem.
area: decisao
avalia: Capacidade de produzir a chamada de função correta (nome e argumentos) a partir de um pedido em linguagem natural.
metodo: O modelo recebe definições de funções e um pedido. A resposta é comparada com a chamada esperada (correspondência exata de caso, em várias categorias).
metrica: Acurácia por caso exato (%).
escala: 0 a 100; maior é melhor.
limitacoes: Mede a forma da chamada, não o efeito da execução. A tabela da Cloudflare usa um recorte próprio do BFCL, e o leaderboard oficial pode divergir.
saturacao: alta
contaminacao: Dados públicos desde 2024. Vazamento para o treino não verificado.
mantenedor: Gorilla, UC Berkeley
urlOficial: https://gorilla.cs.berkeley.edu/leaderboard.html
dataVerificacao: 2026-11-22
funcionalidadesMedidas:
  - "[[tool_use_funcionalidade|Tool use]]"
  - "[[integracao_de_apis|Integração de APIs]]"
  - "[[saida_estruturada|Saída estruturada]]"
casosDeUsoRelacionados:
  - "[[construcao_de_agentes|Construção de agentes]]"
  - "[[integracao_de_apis_e_webhooks|Integração de APIs e webhooks]]"
  - "[[modelos_de_decisao_e_fine_tuning|Modelos de decisão e fine-tuning]]"
modelosAvaliados:
  - "[[clef_flash|Clef-flash]]"
  - "[[clef|Clef]]"
  - "[[jev|Jev]]"
  - "[[laya|Laya]]"
resultados:
  - modelo: "[[clef_flash|Clef-flash]]"
    valor: 98.76
    unidade: "%"
    origem: autodeclarado-fornecedor
    fonte: https://blog.cloudflare.com/clef-decision-models/
    data: 2026-11-22
    nota: Número da tabela da Cloudflare, que também mediu o modelo concorrente; autodeclarado.
  - modelo: "[[clef|Clef]]"
    valor: 98.47
    unidade: "%"
    origem: autodeclarado-fornecedor
    fonte: https://blog.cloudflare.com/clef-decision-models/
    data: 2026-11-22
    nota: Número da tabela da Cloudflare, que também mediu o modelo concorrente; autodeclarado.
  - modelo: "[[jev|Jev]]"
    valor: 95.75
    unidade: "%"
    origem: autodeclarado-fornecedor
    fonte: https://blog.cloudflare.com/clef-decision-models/
    data: 2026-11-22
    nota: Número da tabela da Cloudflare, que também mediu o modelo concorrente; autodeclarado.
  - modelo: "[[laya|Laya]]"
    valor: 38.13
    unidade: "%"
    origem: autodeclarado-fornecedor
    fonte: https://blog.cloudflare.com/clef-decision-models/
    data: 2026-11-22
    nota: Número da tabela da Cloudflare, que também mediu o modelo concorrente; autodeclarado.
tags:
  - benchmark
  - ia
---
# BFCL
## 📝 Descrição
Leaderboard da Universidade da Califórnia em Berkeley para chamadas de função por modelos de linguagem. Mantido por Gorilla, UC Berkeley. Página oficial: https://gorilla.cs.berkeley.edu/leaderboard.html
## 🎯 O que avalia
Capacidade de produzir a chamada de função correta (nome e argumentos) a partir de um pedido em linguagem natural.
## ⚙ Como funciona (método e métrica)
- **Método:** O modelo recebe definições de funções e um pedido. A resposta é comparada com a chamada esperada (correspondência exata de caso, em várias categorias).
- **Métrica:** Acurácia por caso exato (%).
- **Escala:** 0 a 100; maior é melhor.
## ⚠ Limitações
Mede a forma da chamada, não o efeito da execução. A tabela da Cloudflare usa um recorte próprio do BFCL, e o leaderboard oficial pode divergir.
## 🌡 Saturação e contaminação
- **Saturação:** alta. Clef-flash marca 98,76% e Clef 98,47% na tabela da Cloudflare.
- **Contaminação:** Dados públicos desde 2024. Vazamento para o treino não verificado.
## 📊 Resultados
Cada linha vem do campo `resultados` (consulta em 2026-11-22: 4 pontuações lidas, 0 `não verificado`). Origem `autodeclarado-fornecedor` indica número publicado pelo próprio fornecedor ou por quem mede um concorrente. Valores `não verificado` registram consulta sem pontuação oficial legível.

## 🧭 Como usar na escolha de modelo
Os melhores modelos ficam perto do teto, então use o benchmark para descartar modelos fracos e confirme a escolha final em testes com os seus dados. Combine com os benchmarks da mesma área (decisao) e com uma avaliação própria, porque cada fornecedor escolhe quais testes publicar.
## 🔗 Relacionamentos
- **Funcionalidades medidas:** [[tool_use_funcionalidade|Tool use]], [[integracao_de_apis|Integração de APIs]], [[saida_estruturada|Saída estruturada]]
- **Casos de uso:** [[construcao_de_agentes|Construção de agentes]], [[integracao_de_apis_e_webhooks|Integração de APIs e webhooks]], [[modelos_de_decisao_e_fine_tuning|Modelos de decisão e fine-tuning]]
- **Modelos avaliados:** [[clef_flash|Clef-flash]], [[clef|Clef]], [[jev|Jev]], [[laya|Laya]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
