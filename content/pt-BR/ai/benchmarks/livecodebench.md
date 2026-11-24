---
id: livecodebench
tipo: benchmark
nome: LiveCodeBench
aliases:
  - LCB
descricao: Problemas de programação competitiva coletados continuamente, com data de publicação para filtrar contaminação.
area: codigo
avalia: Geração e correção de código em problemas de competições, em janelas de tempo posteriores ao corte de treino.
metodo: O modelo resolve problemas de LeetCode, AtCoder e Codeforces. Os testes de caixa-preta validam a solução, e a janela de datas controla o vazamento.
metrica: pass@1 (%) na janela escolhida.
escala: 0 a 100; maior é melhor.
limitacoes: Mede programação competitiva, que difere de engenharia de software em repositórios. O Gemini 3.1 Pro reporta LiveCodeBench Pro em Elo (2887), que é um benchmark distinto.
saturacao: não verificado
contaminacao: Mitigada por janelas de data posteriores ao treino, e cada fornecedor escolhe a janela. Não verificado.
mantenedor: UC Berkeley, MIT e Cornell
urlOficial: https://livecodebench.github.io/
dataVerificacao: 2026-11-22
funcionalidadesMedidas:
  - "[[geracao_de_codigo|Geração de código]]"
  - "[[raciocinio|Raciocínio]]"
casosDeUsoRelacionados:
  - "[[programacao_em_par|Programação em par]]"
  - "[[revisao_de_codigo|Revisão de código]]"
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
# LiveCodeBench
## 📝 Descrição
Problemas de programação competitiva coletados continuamente, com data de publicação para filtrar contaminação. Mantido por UC Berkeley, MIT e Cornell. Página oficial: https://livecodebench.github.io/
## 🎯 O que avalia
Geração e correção de código em problemas de competições, em janelas de tempo posteriores ao corte de treino.
## ⚙ Como funciona (método e métrica)
- **Método:** O modelo resolve problemas de LeetCode, AtCoder e Codeforces. Os testes de caixa-preta validam a solução, e a janela de datas controla o vazamento.
- **Métrica:** pass@1 (%) na janela escolhida.
- **Escala:** 0 a 100; maior é melhor.
## ⚠ Limitações
Mede programação competitiva, que difere de engenharia de software em repositórios. O Gemini 3.1 Pro reporta LiveCodeBench Pro em Elo (2887), que é um benchmark distinto.
## 🌡 Saturação e contaminação
- **Saturação:** não verificado. Nenhuma pontuação do LiveCodeBench padrão foi lida para os modelos.
- **Contaminação:** Mitigada por janelas de data posteriores ao treino, e cada fornecedor escolhe a janela. Não verificado.
## 📊 Resultados
Cada linha vem do campo `resultados` (consulta em 2026-11-22: 0 pontuações lidas, 3 `não verificado`). Origem `autodeclarado-fornecedor` indica número publicado pelo próprio fornecedor ou por quem mede um concorrente. Valores `não verificado` registram consulta sem pontuação oficial legível.

## 🧭 Como usar na escolha de modelo
Sem pontuações oficiais legíveis, trate o benchmark como referência de método e rode o teste você mesmo antes de decidir. Combine com os benchmarks da mesma área (codigo) e com uma avaliação própria, porque cada fornecedor escolhe quais testes publicar.
## 🔗 Relacionamentos
- **Funcionalidades medidas:** [[geracao_de_codigo|Geração de código]], [[raciocinio|Raciocínio]]
- **Casos de uso:** [[programacao_em_par|Programação em par]], [[revisao_de_codigo|Revisão de código]]
- **Modelos avaliados:** [[claude_opus_5_5|Claude Opus 5.5]], [[gpt_5_5|GPT-5.5]], [[gemini_3_1_pro|Gemini 3.1 Pro]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
