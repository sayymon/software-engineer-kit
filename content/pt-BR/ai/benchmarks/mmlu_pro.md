---
id: mmlu_pro
tipo: benchmark
nome: MMLU-Pro
aliases:
  - MMLU Pro
descricao: Versão mais difícil do MMLU, com 10 alternativas por questão e mais perguntas de raciocínio.
area: conhecimento
avalia: Conhecimento amplo e raciocínio em dezenas de áreas acadêmicas, em múltipla escolha.
metodo: Questões com 10 alternativas. O modelo escolhe uma, com ou sem cadeia de pensamento, e a resposta é comparada ao gabarito.
metrica: Acurácia (%).
escala: 0 a 100; maior é melhor.
limitacoes: Múltipla escolha premia estratégias de eliminação. Alguns itens têm gabarito contestado.
saturacao: não verificado
contaminacao: Conjunto público, com risco de vazamento. Não verificado.
mantenedor: TIGER-Lab
urlOficial: https://arxiv.org/abs/2406.01574
dataVerificacao: 2026-11-22
funcionalidadesMedidas:
  - "[[raciocinio|Raciocínio]]"
  - "[[geracao_de_texto|Geração de texto]]"
  - "[[comparacao_de_modelos|Comparação de modelos]]"
casosDeUsoRelacionados:
  - "[[estudo_e_aprendizado|Estudo e aprendizado]]"
  - "[[chat_e_assistente_geral|Chat e assistente geral]]"
  - "[[pesquisa_aprofundada|Pesquisa aprofundada]]"
modelosAvaliados:
  - "[[claude_opus_5_5|Claude Opus 5.5]]"
  - "[[gpt_5_5|GPT-5.5]]"
  - "[[gemini_3_1_pro|Gemini 3.1 Pro]]"
resultados:
  - modelo: "[[claude_opus_5_5|Claude Opus 5.5]]"
    valor: não verificado
    unidade: não verificado
    origem: não verificado
    fonte: não verificado
    data: não verificado
    nota: Consulta em 2026-11-22 não encontrou pontuação oficial legível desse modelo nesta página.
  - modelo: "[[gpt_5_5|GPT-5.5]]"
    valor: não verificado
    unidade: não verificado
    origem: não verificado
    fonte: não verificado
    data: não verificado
    nota: Consulta em 2026-11-22 não encontrou pontuação oficial legível desse modelo nesta página.
  - modelo: "[[gemini_3_1_pro|Gemini 3.1 Pro]]"
    valor: não verificado
    unidade: não verificado
    origem: não verificado
    fonte: não verificado
    data: não verificado
    nota: Consulta em 2026-11-22 não encontrou pontuação oficial legível desse modelo nesta página.
tags:
  - benchmark
  - ia
---
# MMLU-Pro
## 📝 Descrição
Versão mais difícil do MMLU, com 10 alternativas por questão e mais perguntas de raciocínio. Mantido por TIGER-Lab. Página oficial: https://arxiv.org/abs/2406.01574
## 🎯 O que avalia
Conhecimento amplo e raciocínio em dezenas de áreas acadêmicas, em múltipla escolha.
## ⚙ Como funciona (método e métrica)
- **Método:** Questões com 10 alternativas. O modelo escolhe uma, com ou sem cadeia de pensamento, e a resposta é comparada ao gabarito.
- **Métrica:** Acurácia (%).
- **Escala:** 0 a 100; maior é melhor.
## ⚠ Limitações
Múltipla escolha premia estratégias de eliminação. Alguns itens têm gabarito contestado.
## 🌡 Saturação e contaminação
- **Saturação:** não verificado. Nenhuma pontuação oficial dos modelos foi lida nesta consulta.
- **Contaminação:** Conjunto público, com risco de vazamento. Não verificado.
## 📊 Resultados
Cada linha vem do campo `resultados` (consulta em 2026-11-22: 0 pontuações lidas, 3 `não verificado`). Origem `autodeclarado-fornecedor` indica número publicado pelo próprio fornecedor ou por quem mede um concorrente. Valores `não verificado` registram consulta sem pontuação oficial legível.

## 🧭 Como usar na escolha de modelo
Sem pontuações oficiais legíveis, trate o benchmark como referência de método e rode o teste você mesmo antes de decidir. Combine com os benchmarks da mesma área (conhecimento) e com uma avaliação própria, porque cada fornecedor escolhe quais testes publicar.
## 🔗 Relacionamentos
- **Funcionalidades medidas:** [[raciocinio|Raciocínio]], [[geracao_de_texto|Geração de texto]], [[comparacao_de_modelos|Comparação de modelos]]
- **Casos de uso:** [[estudo_e_aprendizado|Estudo e aprendizado]], [[chat_e_assistente_geral|Chat e assistente geral]], [[pesquisa_aprofundada|Pesquisa aprofundada]]
- **Modelos avaliados:** [[claude_opus_5_5|Claude Opus 5.5]], [[gpt_5_5|GPT-5.5]], [[gemini_3_1_pro|Gemini 3.1 Pro]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
