---
id: frontiermath
tipo: benchmark
nome: FrontierMath
aliases:
  - FrontierMath Tier 1-3
  - FrontierMath Tier 4
descricao: Problemas de matemática inéditos, escritos por matemáticos, com resposta numérica verificável.
area: matematica
avalia: Raciocínio matemático de pesquisa, em quatro níveis de dificuldade (Tier 1 a 4).
metodo: Cada problema tem resposta exata verificada por código. Os problemas são inéditos e a maioria permanece privada.
metrica: Percentual de problemas resolvidos (%), por faixa de níveis.
escala: 0 a 100; maior é melhor.
limitacoes: A OpenAI financia parte do conjunto, e o acesso aos problemas é restrito, então a verificação independente depende da Epoch AI. Os números abaixo são os que o fornecedor publica.
saturacao: baixa
contaminacao: Problemas inéditos e majoritariamente privados reduzem o risco.
mantenedor: Epoch AI
urlOficial: https://epoch.ai/frontiermath
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
  - "[[claude_opus_5_5|Claude Opus 5.5]]"
resultados:
  - modelo: "[[gpt_5_5|GPT-5.5]]"
    valor: 51.7
    unidade: "% (Tier 1 a 3)"
    origem: autodeclarado-fornecedor
    fonte: https://openai.com/index/introducing-gpt-5-5/
    data: 2026-11-22
  - modelo: "[[gpt_5_5|GPT-5.5]]"
    valor: 35.4
    unidade: "% (Tier 4)"
    origem: autodeclarado-fornecedor
    fonte: https://openai.com/index/introducing-gpt-5-5/
    data: 2026-11-22
  - modelo: "[[gemini_3_1_pro|Gemini 3.1 Pro]]"
    valor: 36.9
    unidade: "% (Tier 1 a 3)"
    origem: autodeclarado-fornecedor
    fonte: https://openai.com/index/introducing-gpt-5-5/
    data: 2026-11-22
    nota: Número de modelo de terceiro, reportado na tabela do anúncio do GPT-5.5 (OpenAI).
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
# FrontierMath
## 📝 Descrição
Problemas de matemática inéditos, escritos por matemáticos, com resposta numérica verificável. Mantido por Epoch AI. Página oficial: https://epoch.ai/frontiermath
## 🎯 O que avalia
Raciocínio matemático de pesquisa, em quatro níveis de dificuldade (Tier 1 a 4).
## ⚙ Como funciona (método e métrica)
- **Método:** Cada problema tem resposta exata verificada por código. Os problemas são inéditos e a maioria permanece privada.
- **Métrica:** Percentual de problemas resolvidos (%), por faixa de níveis.
- **Escala:** 0 a 100; maior é melhor.
## ⚠ Limitações
A OpenAI financia parte do conjunto, e o acesso aos problemas é restrito, então a verificação independente depende da Epoch AI. Os números abaixo são os que o fornecedor publica.
## 🌡 Saturação e contaminação
- **Saturação:** baixa. O Tier 4 marca 35,4% no melhor caso lido.
- **Contaminação:** Problemas inéditos e majoritariamente privados reduzem o risco.
## 📊 Resultados
Cada linha vem do campo `resultados` (consulta em 2026-11-22: 3 pontuações lidas, 1 `não verificado`). Origem `autodeclarado-fornecedor` indica número publicado pelo próprio fornecedor ou por quem mede um concorrente. Valores `não verificado` registram consulta sem pontuação oficial legível.

## 🧭 Como usar na escolha de modelo
A pontuação ainda separa bem os modelos, então ela serve para ordenar candidatos. Compare apenas a mesma condição de teste. Combine com os benchmarks da mesma área (matematica) e com uma avaliação própria, porque cada fornecedor escolhe quais testes publicar.
## 🔗 Relacionamentos
- **Funcionalidades medidas:** [[raciocinio|Raciocínio]], [[comparacao_de_modelos|Comparação de modelos]]
- **Casos de uso:** [[raciocinio_complexo_e_matematica|Raciocínio complexo e matemática]], [[pesquisa_aprofundada|Pesquisa aprofundada]]
- **Modelos avaliados:** [[gpt_5_5|GPT-5.5]], [[gemini_3_1_pro|Gemini 3.1 Pro]], [[claude_opus_5_5|Claude Opus 5.5]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
