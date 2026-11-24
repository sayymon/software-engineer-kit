---
id: gpqa_diamond
tipo: benchmark
nome: GPQA Diamond
aliases:
  - GPQA
  - GPQA-Diamond
descricao: Perguntas de biologia, física e química escritas por especialistas e resistentes a busca na web.
area: conhecimento
avalia: Raciocínio científico de nível de pós-graduação, em múltipla escolha.
metodo: O subconjunto Diamond reúne questões em que especialistas concordam e não especialistas erram. O modelo escolhe a alternativa; a acurácia compara com o gabarito.
metrica: Acurácia (%).
escala: 0 a 100; maior é melhor.
limitacoes: Apenas 198 questões no Diamond, então a diferença de um ponto fica dentro do ruído. Mede conhecimento em múltipla escolha, não pesquisa aberta.
saturacao: alta
contaminacao: Os autores pedem que o conjunto não apareça em corpora de treino, e a proteção depende do respeito a esse pedido. Vazamento não verificado.
mantenedor: Rein et al. (NYU e Cohere)
urlOficial: https://arxiv.org/abs/2311.12022
dataVerificacao: 2026-11-22
funcionalidadesMedidas:
  - "[[raciocinio|Raciocínio]]"
  - "[[comparacao_de_modelos|Comparação de modelos]]"
casosDeUsoRelacionados:
  - "[[raciocinio_complexo_e_matematica|Raciocínio complexo e matemática]]"
  - "[[estudo_e_aprendizado|Estudo e aprendizado]]"
  - "[[pesquisa_aprofundada|Pesquisa aprofundada]]"
modelosAvaliados:
  - "[[gemini_3_1_pro|Gemini 3.1 Pro]]"
  - "[[gpt_5_5|GPT-5.5]]"
  - "[[claude_sonnet_4_6|Claude Sonnet 4.6]]"
  - "[[claude_opus_5_5|Claude Opus 5.5]]"
resultados:
  - modelo: "[[gemini_3_1_pro|Gemini 3.1 Pro]]"
    valor: 94.3
    unidade: "% (sem ferramentas)"
    origem: autodeclarado-fornecedor
    fonte: https://deepmind.google/models/model-cards/gemini-3-1-pro/
    data: 2026-11-22
  - modelo: "[[gpt_5_5|GPT-5.5]]"
    valor: 93.6
    unidade: "% (sem ferramentas)"
    origem: autodeclarado-fornecedor
    fonte: https://openai.com/index/introducing-gpt-5-5/
    data: 2026-11-22
  - modelo: "[[claude_sonnet_4_6|Claude Sonnet 4.6]]"
    valor: 89.9
    unidade: "% (sem ferramentas)"
    origem: autodeclarado-fornecedor
    fonte: https://deepmind.google/models/model-cards/gemini-3-1-pro/
    data: 2026-11-22
    nota: Número de modelo de terceiro, reportado na tabela do model card do Gemini 3.1 Pro (Google).
  - modelo: "[[claude_opus_5_5|Claude Opus 5.5]]"
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
# GPQA Diamond
## 📝 Descrição
Perguntas de biologia, física e química escritas por especialistas e resistentes a busca na web. Mantido por Rein et al. (NYU e Cohere). Página oficial: https://arxiv.org/abs/2311.12022
## 🎯 O que avalia
Raciocínio científico de nível de pós-graduação, em múltipla escolha.
## ⚙ Como funciona (método e métrica)
- **Método:** O subconjunto Diamond reúne questões em que especialistas concordam e não especialistas erram. O modelo escolhe a alternativa; a acurácia compara com o gabarito.
- **Métrica:** Acurácia (%).
- **Escala:** 0 a 100; maior é melhor.
## ⚠ Limitações
Apenas 198 questões no Diamond, então a diferença de um ponto fica dentro do ruído. Mede conhecimento em múltipla escolha, não pesquisa aberta.
## 🌡 Saturação e contaminação
- **Saturação:** alta. Três fornecedores reportam entre 93,6% e 94,3%.
- **Contaminação:** Os autores pedem que o conjunto não apareça em corpora de treino, e a proteção depende do respeito a esse pedido. Vazamento não verificado.
## 📊 Resultados
Cada linha vem do campo `resultados` (consulta em 2026-11-22: 3 pontuações lidas, 1 `não verificado`). Origem `autodeclarado-fornecedor` indica número publicado pelo próprio fornecedor ou por quem mede um concorrente. Valores `não verificado` registram consulta sem pontuação oficial legível.

## 🧭 Como usar na escolha de modelo
Os melhores modelos ficam perto do teto, então use o benchmark para descartar modelos fracos e confirme a escolha final em testes com os seus dados. Combine com os benchmarks da mesma área (conhecimento) e com uma avaliação própria, porque cada fornecedor escolhe quais testes publicar.
## 🔗 Relacionamentos
- **Funcionalidades medidas:** [[raciocinio|Raciocínio]], [[comparacao_de_modelos|Comparação de modelos]]
- **Casos de uso:** [[raciocinio_complexo_e_matematica|Raciocínio complexo e matemática]], [[estudo_e_aprendizado|Estudo e aprendizado]], [[pesquisa_aprofundada|Pesquisa aprofundada]]
- **Modelos avaliados:** [[gemini_3_1_pro|Gemini 3.1 Pro]], [[gpt_5_5|GPT-5.5]], [[claude_sonnet_4_6|Claude Sonnet 4.6]], [[claude_opus_5_5|Claude Opus 5.5]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
