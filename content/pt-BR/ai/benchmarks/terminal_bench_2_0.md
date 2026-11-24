---
id: terminal_bench_2_0
tipo: benchmark
nome: Terminal-Bench 2.0
aliases:
  - Terminal-Bench
  - Terminal-Bench 4.0
  - Terminal-Bench 4.1
descricao: Tarefas de linha de comando que exigem planejar, iterar e coordenar ferramentas em um terminal.
area: codigo
avalia: "Trabalho agêntico em terminal: compilar, depurar, configurar ambientes e operar sistemas."
metodo: O agente recebe uma tarefa e um contêiner. Testes automatizados verificam o estado final. O resultado depende do harness (por exemplo Terminus-2 ou Codex).
metrica: Taxa de resolução (%).
escala: 0 a 100; maior é melhor.
limitacoes: O harness, o esforço de raciocínio e o número de tentativas mudam o resultado. As versões 4.0 e 4.1 aparecem nas tabelas recentes e não se comparam com a 2.0.
saturacao: media
contaminacao: Tarefas públicas. Vazamento não verificado.
mantenedor: Terminal-Bench (Laude Institute e Stanford)
urlOficial: https://www.tbench.ai/
dataVerificacao: 2026-11-22
funcionalidadesMedidas:
  - "[[tool_use_funcionalidade|Tool use]]"
  - "[[geracao_de_codigo|Geração de código]]"
  - "[[edicao_de_codebase|Edição de codebase]]"
casosDeUsoRelacionados:
  - "[[automacao_de_desenvolvimento|Automação de desenvolvimento]]"
  - "[[agentes_autonomos_de_longa_duracao|Agentes autônomos de longa duração]]"
  - "[[programacao_em_par|Programação em par]]"
modelosAvaliados:
  - "[[gpt_5_5|GPT-5.5]]"
  - "[[gemini_3_1_pro|Gemini 3.1 Pro]]"
  - "[[claude_sonnet_4_6|Claude Sonnet 4.6]]"
  - "[[claude_opus_5_5|Claude Opus 5.5]]"
  - "[[gemini_4_carbon|Gemini 4 Carbon]]"
  - "[[gemini_4_neon|Gemini 4 Neon]]"
  - "[[gemini_4_hydrogen|Gemini 4 Hydrogen]]"
  - "[[claude_sonnet_5_5|Claude Sonnet 5.5]]"
resultados:
  - modelo: "[[gpt_5_5|GPT-5.5]]"
    valor: 82.7
    unidade: "% (versão 2.0)"
    origem: autodeclarado-fornecedor
    fonte: https://openai.com/index/introducing-gpt-5-5/
    data: 2026-11-22
  - modelo: "[[gemini_3_1_pro|Gemini 3.1 Pro]]"
    valor: 68.5
    unidade: "% (versão 2.0, Terminus-2)"
    origem: autodeclarado-fornecedor
    fonte: https://deepmind.google/models/model-cards/gemini-3-1-pro/
    data: 2026-11-22
  - modelo: "[[claude_sonnet_4_6|Claude Sonnet 4.6]]"
    valor: 59.1
    unidade: "% (versão 2.0, Terminus-2)"
    origem: autodeclarado-fornecedor
    fonte: https://deepmind.google/models/model-cards/gemini-3-1-pro/
    data: 2026-11-22
    nota: Número de modelo de terceiro, reportado na tabela do model card do Gemini 3.1 Pro (Google).
  - modelo: "[[claude_opus_5_5|Claude Opus 5.5]]"
    valor: 66.4
    unidade: "% (versão 4.0, esforço xhigh)"
    origem: autodeclarado-fornecedor
    fonte: https://www.anthropic.com/news/claude-opus-5-5
    data: 2026-11-22
    nota: Versão 4.0 do benchmark; não comparável com a 2.0.
  - modelo: "[[gemini_4_carbon|Gemini 4 Carbon]]"
    valor: 65.2
    unidade: "% (versão 4.0, AA)"
    origem: autodeclarado-fornecedor
    fonte: https://deepmind.google/models/model-cards/gemini-4-carbon/
    data: 2026-11-22
    nota: Versão 4.0 do benchmark; não comparável com a 2.0.
  - modelo: "[[gemini_4_neon|Gemini 4 Neon]]"
    valor: 65.2
    unidade: "% (versão 4.1, ajustada contra trapaça)"
    origem: autodeclarado-fornecedor
    fonte: https://deepmind.google/models/model-cards/gemini-4-neon/
    data: 2026-11-22
    nota: Versão 4.1 do benchmark; não comparável com a 2.0.
  - modelo: "[[gemini_4_hydrogen|Gemini 4 Hydrogen]]"
    valor: 57
    unidade: "% (versão 4.1, ajustada contra trapaça)"
    origem: autodeclarado-fornecedor
    fonte: https://deepmind.google/models/model-cards/gemini-4-hydrogen/
    data: 2026-11-22
    nota: Versão 4.1 do benchmark; não comparável com a 2.0.
  - modelo: "[[claude_sonnet_5_5|Claude Sonnet 5.5]]"
    valor: 63.9
    unidade: "% (versão 4.1, ajustada contra trapaça)"
    origem: autodeclarado-fornecedor
    fonte: https://deepmind.google/models/model-cards/gemini-4-hydrogen/
    data: 2026-11-22
    nota: Número de modelo de terceiro reportado pela Google; versão 4.1.
tags:
  - benchmark
  - ia
---
# Terminal-Bench 2.0
## 📝 Descrição
Tarefas de linha de comando que exigem planejar, iterar e coordenar ferramentas em um terminal. Mantido por Terminal-Bench (Laude Institute e Stanford). Página oficial: https://www.tbench.ai/
## 🎯 O que avalia
Trabalho agêntico em terminal: compilar, depurar, configurar ambientes e operar sistemas.
## ⚙ Como funciona (método e métrica)
- **Método:** O agente recebe uma tarefa e um contêiner. Testes automatizados verificam o estado final. O resultado depende do harness (por exemplo Terminus-2 ou Codex).
- **Métrica:** Taxa de resolução (%).
- **Escala:** 0 a 100; maior é melhor.
## ⚠ Limitações
O harness, o esforço de raciocínio e o número de tentativas mudam o resultado. As versões 4.0 e 4.1 aparecem nas tabelas recentes e não se comparam com a 2.0.
## 🌡 Saturação e contaminação
- **Saturação:** media. O GPT-5.5 marca 82,7% na versão 2.0, e as versões 4.x trazem valores de 52% a 66%.
- **Contaminação:** Tarefas públicas. Vazamento não verificado.
## 📊 Resultados
Cada linha vem do campo `resultados` (consulta em 2026-11-22: 8 pontuações lidas, 0 `não verificado`). Origem `autodeclarado-fornecedor` indica número publicado pelo próprio fornecedor ou por quem mede um concorrente. Valores `não verificado` registram consulta sem pontuação oficial legível.

## 🧭 Como usar na escolha de modelo
Ainda há margem entre os modelos, então a pontuação ajuda a ordenar candidatos. Confirme com uma amostra do seu caso de uso. Combine com os benchmarks da mesma área (codigo) e com uma avaliação própria, porque cada fornecedor escolhe quais testes publicar.
## 🔗 Relacionamentos
- **Funcionalidades medidas:** [[tool_use_funcionalidade|Tool use]], [[geracao_de_codigo|Geração de código]], [[edicao_de_codebase|Edição de codebase]]
- **Casos de uso:** [[automacao_de_desenvolvimento|Automação de desenvolvimento]], [[agentes_autonomos_de_longa_duracao|Agentes autônomos de longa duração]], [[programacao_em_par|Programação em par]]
- **Modelos avaliados:** [[gpt_5_5|GPT-5.5]], [[gemini_3_1_pro|Gemini 3.1 Pro]], [[claude_sonnet_4_6|Claude Sonnet 4.6]], [[claude_opus_5_5|Claude Opus 5.5]], [[gemini_4_carbon|Gemini 4 Carbon]], [[gemini_4_neon|Gemini 4 Neon]], [[gemini_4_hydrogen|Gemini 4 Hydrogen]], [[claude_sonnet_5_5|Claude Sonnet 5.5]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
