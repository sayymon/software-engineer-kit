---
id: api_bank
tipo: benchmark
nome: API-Bank
aliases:
  - API-Bank tool-augmented LLM
descricao: Benchmark de LLMs aumentados por ferramentas, com planejamento, busca e chamada de APIs.
area: decisao
avalia: Acerto ao escolher e chamar APIs em diálogos que exigem uso de ferramentas.
metodo: Diálogos anotados com chamadas de API esperadas. O modelo prevê a chamada correta, comparada à anotação.
metrica: Acurácia (%).
escala: 0 a 100; maior é melhor.
limitacoes: APIs sintéticas de domínio restrito. A tabela da Cloudflare usa recorte próprio.
saturacao: media
contaminacao: Conjunto público desde 2023. Vazamento não verificado.
mantenedor: Li et al. (artigo API-Bank)
urlOficial: https://arxiv.org/abs/2304.08244
dataVerificacao: 2026-11-22
funcionalidadesMedidas:
  - "[[tool_use_funcionalidade|Tool use]]"
  - "[[integracao_de_apis|Integração de APIs]]"
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
    valor: 93.11
    unidade: "%"
    origem: autodeclarado-fornecedor
    fonte: https://blog.cloudflare.com/clef-decision-models/
    data: 2026-11-22
    nota: Número da tabela da Cloudflare, que também mediu o modelo concorrente; autodeclarado.
  - modelo: "[[clef|Clef]]"
    valor: 91.93
    unidade: "%"
    origem: autodeclarado-fornecedor
    fonte: https://blog.cloudflare.com/clef-decision-models/
    data: 2026-11-22
    nota: Número da tabela da Cloudflare, que também mediu o modelo concorrente; autodeclarado.
  - modelo: "[[jev|Jev]]"
    valor: 88.19
    unidade: "%"
    origem: autodeclarado-fornecedor
    fonte: https://blog.cloudflare.com/clef-decision-models/
    data: 2026-11-22
    nota: Número da tabela da Cloudflare, que também mediu o modelo concorrente; autodeclarado.
  - modelo: "[[laya|Laya]]"
    valor: 11.41
    unidade: "%"
    origem: autodeclarado-fornecedor
    fonte: https://blog.cloudflare.com/clef-decision-models/
    data: 2026-11-22
    nota: Número da tabela da Cloudflare, que também mediu o modelo concorrente; autodeclarado.
tags:
  - benchmark
  - ia
---
# API-Bank
## 📝 Descrição
Benchmark de LLMs aumentados por ferramentas, com planejamento, busca e chamada de APIs. Mantido por Li et al. (artigo API-Bank). Página oficial: https://arxiv.org/abs/2304.08244
## 🎯 O que avalia
Acerto ao escolher e chamar APIs em diálogos que exigem uso de ferramentas.
## ⚙ Como funciona (método e métrica)
- **Método:** Diálogos anotados com chamadas de API esperadas. O modelo prevê a chamada correta, comparada à anotação.
- **Métrica:** Acurácia (%).
- **Escala:** 0 a 100; maior é melhor.
## ⚠ Limitações
APIs sintéticas de domínio restrito. A tabela da Cloudflare usa recorte próprio.
## 🌡 Saturação e contaminação
- **Saturação:** media. Clef-flash marca 93,11 e Clef 91,93 na tabela da Cloudflare.
- **Contaminação:** Conjunto público desde 2023. Vazamento não verificado.
## 📊 Resultados
Cada linha vem do campo `resultados` (consulta em 2026-11-22: 4 pontuações lidas, 0 `não verificado`). Origem `autodeclarado-fornecedor` indica número publicado pelo próprio fornecedor ou por quem mede um concorrente. Valores `não verificado` registram consulta sem pontuação oficial legível.

## 🧭 Como usar na escolha de modelo
Ainda há margem entre os modelos, então a pontuação ajuda a ordenar candidatos. Confirme com uma amostra do seu caso de uso. Combine com os benchmarks da mesma área (decisao) e com uma avaliação própria, porque cada fornecedor escolhe quais testes publicar.
## 🔗 Relacionamentos
- **Funcionalidades medidas:** [[tool_use_funcionalidade|Tool use]], [[integracao_de_apis|Integração de APIs]]
- **Casos de uso:** [[construcao_de_agentes|Construção de agentes]], [[integracao_de_apis_e_webhooks|Integração de APIs e webhooks]], [[modelos_de_decisao_e_fine_tuning|Modelos de decisão e fine-tuning]]
- **Modelos avaliados:** [[clef_flash|Clef-flash]], [[clef|Clef]], [[jev|Jev]], [[laya|Laya]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
