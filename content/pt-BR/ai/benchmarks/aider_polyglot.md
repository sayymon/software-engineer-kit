---
id: aider_polyglot
tipo: benchmark
nome: Aider Polyglot
aliases:
  - Aider polyglot benchmark
descricao: Leaderboard do Aider com 225 exercícios difíceis do Exercism em seis linguagens.
area: codigo
avalia: Edição de código em várias linguagens (C++, Go, Java, JavaScript, Python, Rust) com o formato de edição do Aider.
metodo: O modelo recebe o exercício e os testes, edita os arquivos e tenta de novo após falha. O leaderboard registra o percentual correto e o custo da execução.
metrica: Percentual de exercícios corretos (%) e custo (USD).
escala: 0 a 100; maior é melhor.
limitacoes: Exercícios curtos e isolados. A consulta de 2026-11-22 mostrou no leaderboard modelos mais antigos (família GPT-5, Gemini 2.5, Grok 4) e nenhum modelo atual.
saturacao: não verificado
contaminacao: Exercícios públicos do Exercism. Vazamento não verificado.
mantenedor: Aider (Paul Gauthier)
urlOficial: https://aider.chat/docs/leaderboards/
dataVerificacao: 2026-11-22
funcionalidadesMedidas:
  - "[[edicao_de_codebase|Edição de codebase]]"
  - "[[geracao_de_codigo|Geração de código]]"
casosDeUsoRelacionados:
  - "[[programacao_em_par|Programação em par]]"
  - "[[refatoracao_de_codigo|Refatoração de código]]"
modelosAvaliados:
  - "[[deepseek_v4_pro|DeepSeek V4 Pro]]"
  - "[[gpt_5_5|GPT-5.5]]"
  - "[[claude_opus_5_5|Claude Opus 5.5]]"
resultados:
  - modelo: "[[deepseek_v4_pro|DeepSeek V4 Pro]]"
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
# Aider Polyglot
## 📝 Descrição
Leaderboard do Aider com 225 exercícios difíceis do Exercism em seis linguagens. Mantido por Aider (Paul Gauthier). Página oficial: https://aider.chat/docs/leaderboards/
## 🎯 O que avalia
Edição de código em várias linguagens (C++, Go, Java, JavaScript, Python, Rust) com o formato de edição do Aider.
## ⚙ Como funciona (método e métrica)
- **Método:** O modelo recebe o exercício e os testes, edita os arquivos e tenta de novo após falha. O leaderboard registra o percentual correto e o custo da execução.
- **Métrica:** Percentual de exercícios corretos (%) e custo (USD).
- **Escala:** 0 a 100; maior é melhor.
## ⚠ Limitações
Exercícios curtos e isolados. A consulta de 2026-11-22 mostrou no leaderboard modelos mais antigos (família GPT-5, Gemini 2.5, Grok 4) e nenhum modelo atual.
## 🌡 Saturação e contaminação
- **Saturação:** não verificado. Sem pontuação dos modelos atuais nesta consulta.
- **Contaminação:** Exercícios públicos do Exercism. Vazamento não verificado.
## 📊 Resultados
Cada linha vem do campo `resultados` (consulta em 2026-11-22: 0 pontuações lidas, 3 `não verificado`). Origem `autodeclarado-fornecedor` indica número publicado pelo próprio fornecedor ou por quem mede um concorrente. Valores `não verificado` registram consulta sem pontuação oficial legível.

## 🧭 Como usar na escolha de modelo
Sem pontuações oficiais legíveis, trate o benchmark como referência de método e rode o teste você mesmo antes de decidir. Combine com os benchmarks da mesma área (codigo) e com uma avaliação própria, porque cada fornecedor escolhe quais testes publicar.
## 🔗 Relacionamentos
- **Funcionalidades medidas:** [[edicao_de_codebase|Edição de codebase]], [[geracao_de_codigo|Geração de código]]
- **Casos de uso:** [[programacao_em_par|Programação em par]], [[refatoracao_de_codigo|Refatoração de código]]
- **Modelos avaliados:** [[deepseek_v4_pro|DeepSeek V4 Pro]], [[gpt_5_5|GPT-5.5]], [[claude_opus_5_5|Claude Opus 5.5]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
