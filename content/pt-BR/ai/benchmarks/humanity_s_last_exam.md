---
id: humanity_s_last_exam
tipo: benchmark
nome: Humanity's Last Exam
aliases:
  - HLE
  - Humanity Last Exam
descricao: Conjunto de questões acadêmicas difíceis, escrito por especialistas de várias áreas, para medir o limite do conhecimento fechado.
area: raciocinio
avalia: Conhecimento e raciocínio de fronteira em matemática, ciências e humanidades, com respostas verificáveis.
metodo: Questões de resposta curta ou múltipla escolha, filtradas por terem derrotado modelos de fronteira. O fornecedor informa se o modelo usou ferramentas (busca e código).
metrica: Acurácia (%), com e sem ferramentas.
escala: 0 a 100; maior é melhor.
limitacoes: "As condições variam: com ou sem ferramentas, conjunto completo ou subconjunto (HLE-Diamond). Compare apenas a mesma condição."
saturacao: baixa
contaminacao: Há conjunto público e conjunto privado de reserva para detectar sobreajuste. Vazamento do público não verificado.
mantenedor: Center for AI Safety e Scale AI
urlOficial: https://lastexam.ai
dataVerificacao: 2026-11-22
funcionalidadesMedidas:
  - "[[raciocinio|Raciocínio]]"
  - "[[busca_na_web|Busca na web]]"
  - "[[comparacao_de_modelos|Comparação de modelos]]"
casosDeUsoRelacionados:
  - "[[raciocinio_complexo_e_matematica|Raciocínio complexo e matemática]]"
  - "[[pesquisa_aprofundada|Pesquisa aprofundada]]"
modelosAvaliados:
  - "[[gemini_3_1_pro|Gemini 3.1 Pro]]"
  - "[[gpt_5_5|GPT-5.5]]"
  - "[[claude_opus_5_5|Claude Opus 5.5]]"
  - "[[claude_sonnet_4_6|Claude Sonnet 4.6]]"
resultados:
  - modelo: "[[gemini_3_1_pro|Gemini 3.1 Pro]]"
    valor: 44.4
    unidade: "% (sem ferramentas)"
    origem: autodeclarado-fornecedor
    fonte: https://deepmind.google/models/model-cards/gemini-3-1-pro/
    data: 2026-11-22
  - modelo: "[[gemini_3_1_pro|Gemini 3.1 Pro]]"
    valor: 51.4
    unidade: "% (com busca e código)"
    origem: autodeclarado-fornecedor
    fonte: https://deepmind.google/models/model-cards/gemini-3-1-pro/
    data: 2026-11-22
  - modelo: "[[gpt_5_5|GPT-5.5]]"
    valor: 41.4
    unidade: "% (sem ferramentas)"
    origem: autodeclarado-fornecedor
    fonte: https://openai.com/index/introducing-gpt-5-5/
    data: 2026-11-22
  - modelo: "[[gpt_5_5|GPT-5.5]]"
    valor: 52.2
    unidade: "% (com ferramentas)"
    origem: autodeclarado-fornecedor
    fonte: https://openai.com/index/introducing-gpt-5-5/
    data: 2026-11-22
  - modelo: "[[claude_opus_5_5|Claude Opus 5.5]]"
    valor: 67.7
    unidade: "% (com ferramentas)"
    origem: autodeclarado-fornecedor
    fonte: https://www.anthropic.com/news/claude-opus-5-5
    data: 2026-11-22
    nota: Tabela da Anthropic, com ferramentas e esforço máximo; não comparável com as linhas sem ferramentas.
  - modelo: "[[claude_sonnet_4_6|Claude Sonnet 4.6]]"
    valor: 33.2
    unidade: "% (sem ferramentas)"
    origem: autodeclarado-fornecedor
    fonte: https://deepmind.google/models/model-cards/gemini-3-1-pro/
    data: 2026-11-22
    nota: Número de modelo de terceiro, reportado na tabela do model card do Gemini 3.1 Pro (Google).
tags:
  - benchmark
  - ia
---
# Humanity's Last Exam
## 📝 Descrição
Conjunto de questões acadêmicas difíceis, escrito por especialistas de várias áreas, para medir o limite do conhecimento fechado. Mantido por Center for AI Safety e Scale AI. Página oficial: https://lastexam.ai
## 🎯 O que avalia
Conhecimento e raciocínio de fronteira em matemática, ciências e humanidades, com respostas verificáveis.
## ⚙ Como funciona (método e métrica)
- **Método:** Questões de resposta curta ou múltipla escolha, filtradas por terem derrotado modelos de fronteira. O fornecedor informa se o modelo usou ferramentas (busca e código).
- **Métrica:** Acurácia (%), com e sem ferramentas.
- **Escala:** 0 a 100; maior é melhor.
## ⚠ Limitações
As condições variam: com ou sem ferramentas, conjunto completo ou subconjunto (HLE-Diamond). Compare apenas a mesma condição.
## 🌡 Saturação e contaminação
- **Saturação:** baixa. Sem ferramentas, os valores lidos ficam entre 33,2% e 44,4%.
- **Contaminação:** Há conjunto público e conjunto privado de reserva para detectar sobreajuste. Vazamento do público não verificado.
## 📊 Resultados
Cada linha vem do campo `resultados` (consulta em 2026-11-22: 6 pontuações lidas, 0 `não verificado`). Origem `autodeclarado-fornecedor` indica número publicado pelo próprio fornecedor ou por quem mede um concorrente. Valores `não verificado` registram consulta sem pontuação oficial legível.

## 🧭 Como usar na escolha de modelo
A pontuação ainda separa bem os modelos, então ela serve para ordenar candidatos. Compare apenas a mesma condição de teste. Combine com os benchmarks da mesma área (raciocinio) e com uma avaliação própria, porque cada fornecedor escolhe quais testes publicar.
## 🔗 Relacionamentos
- **Funcionalidades medidas:** [[raciocinio|Raciocínio]], [[busca_na_web|Busca na web]], [[comparacao_de_modelos|Comparação de modelos]]
- **Casos de uso:** [[raciocinio_complexo_e_matematica|Raciocínio complexo e matemática]], [[pesquisa_aprofundada|Pesquisa aprofundada]]
- **Modelos avaliados:** [[gemini_3_1_pro|Gemini 3.1 Pro]], [[gpt_5_5|GPT-5.5]], [[claude_opus_5_5|Claude Opus 5.5]], [[claude_sonnet_4_6|Claude Sonnet 4.6]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
