---
id: swe_bench_verified
tipo: benchmark
nome: SWE-bench Verified
aliases:
  - SWE-bench
descricao: Subconjunto de 500 issues reais de repositórios Python, filtrado por humanos, para resolver com um patch.
area: codigo
avalia: Capacidade de corrigir issues reais de GitHub editando o código de um repositório.
metodo: O agente recebe o repositório e a issue, gera um patch e roda os testes de verificação. A tarefa conta como resolvida quando os testes passam.
metrica: "% Resolved (percentual de issues resolvidas)."
escala: 0 a 100; maior é melhor.
limitacoes: Apenas Python e 12 repositórios. O harness do agente altera muito o resultado, e a OpenAI passou a reportar o SWE-bench Pro no lugar do Verified.
saturacao: alta
contaminacao: Repositórios públicos de GitHub, com risco de memorização pelos modelos. Não verificado.
mantenedor: Princeton NLP e equipe SWE-bench
urlOficial: https://www.swebench.com/
dataVerificacao: 2026-11-22
funcionalidadesMedidas:
  - "[[edicao_de_codebase|Edição de codebase]]"
  - "[[geracao_de_codigo|Geração de código]]"
  - "[[tool_use_funcionalidade|Tool use]]"
casosDeUsoRelacionados:
  - "[[programacao_em_par|Programação em par]]"
  - "[[refatoracao_de_codigo|Refatoração de código]]"
  - "[[automacao_de_desenvolvimento|Automação de desenvolvimento]]"
modelosAvaliados:
  - "[[gemini_3_1_pro|Gemini 3.1 Pro]]"
  - "[[claude_sonnet_4_6|Claude Sonnet 4.6]]"
  - "[[gpt_5_5|GPT-5.5]]"
  - "[[claude_opus_5_5|Claude Opus 5.5]]"
resultados:
  - modelo: "[[gemini_3_1_pro|Gemini 3.1 Pro]]"
    valor: 80.6
    unidade: "% (tentativa única)"
    origem: autodeclarado-fornecedor
    fonte: https://deepmind.google/models/model-cards/gemini-3-1-pro/
    data: 2026-11-22
  - modelo: "[[claude_sonnet_4_6|Claude Sonnet 4.6]]"
    valor: 79.6
    unidade: "% (tentativa única)"
    origem: autodeclarado-fornecedor
    fonte: https://deepmind.google/models/model-cards/gemini-3-1-pro/
    data: 2026-11-22
    nota: Número de modelo de terceiro, reportado na tabela do model card do Gemini 3.1 Pro (Google).
  - modelo: "[[gpt_5_5|GPT-5.5]]"
    valor: não verificado
    unidade: não verificado
    origem: não verificado
    fonte: não verificado
    data: não verificado
    nota: O anúncio do GPT-5.5 reporta SWE-Bench Pro (58,6%), outro benchmark.
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
# SWE-bench Verified
## 📝 Descrição
Subconjunto de 500 issues reais de repositórios Python, filtrado por humanos, para resolver com um patch. Mantido por Princeton NLP e equipe SWE-bench. Página oficial: https://www.swebench.com/
## 🎯 O que avalia
Capacidade de corrigir issues reais de GitHub editando o código de um repositório.
## ⚙ Como funciona (método e métrica)
- **Método:** O agente recebe o repositório e a issue, gera um patch e roda os testes de verificação. A tarefa conta como resolvida quando os testes passam.
- **Métrica:** % Resolved (percentual de issues resolvidas).
- **Escala:** 0 a 100; maior é melhor.
## ⚠ Limitações
Apenas Python e 12 repositórios. O harness do agente altera muito o resultado, e a OpenAI passou a reportar o SWE-bench Pro no lugar do Verified.
## 🌡 Saturação e contaminação
- **Saturação:** alta. Valores de 79,6% a 80,6% nas fontes lidas.
- **Contaminação:** Repositórios públicos de GitHub, com risco de memorização pelos modelos. Não verificado.
## 📊 Resultados
Cada linha vem do campo `resultados` (consulta em 2026-11-22: 2 pontuações lidas, 2 `não verificado`). Origem `autodeclarado-fornecedor` indica número publicado pelo próprio fornecedor ou por quem mede um concorrente. Valores `não verificado` registram consulta sem pontuação oficial legível.

## 🧭 Como usar na escolha de modelo
Os melhores modelos ficam perto do teto, então use o benchmark para descartar modelos fracos e confirme a escolha final em testes com os seus dados. Combine com os benchmarks da mesma área (codigo) e com uma avaliação própria, porque cada fornecedor escolhe quais testes publicar.
## 🔗 Relacionamentos
- **Funcionalidades medidas:** [[edicao_de_codebase|Edição de codebase]], [[geracao_de_codigo|Geração de código]], [[tool_use_funcionalidade|Tool use]]
- **Casos de uso:** [[programacao_em_par|Programação em par]], [[refatoracao_de_codigo|Refatoração de código]], [[automacao_de_desenvolvimento|Automação de desenvolvimento]]
- **Modelos avaliados:** [[gemini_3_1_pro|Gemini 3.1 Pro]], [[claude_sonnet_4_6|Claude Sonnet 4.6]], [[gpt_5_5|GPT-5.5]], [[claude_opus_5_5|Claude Opus 5.5]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
