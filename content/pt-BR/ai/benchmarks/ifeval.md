---
id: ifeval
tipo: benchmark
nome: IFEval
aliases:
  - Instruction-Following Eval
descricao: Prompts com instruções verificáveis por código, como 'escreva mais de 300 palavras' ou 'não use vírgulas'.
area: conhecimento
avalia: Obediência a instruções explícitas de formato e conteúdo.
metodo: Cada prompt traz uma ou mais instruções checadas por regras determinísticas, sem juiz de modelo.
metrica: Acurácia em nível de prompt e de instrução, estrita ou flexível (%).
escala: 0 a 100; maior é melhor.
limitacoes: Cobre apenas instruções verificáveis por regra. O estilo e a utilidade da resposta ficam sem avaliação.
saturacao: não verificado
contaminacao: Conjunto público desde 2023. Vazamento não verificado.
mantenedor: Google Research
urlOficial: https://arxiv.org/abs/2311.07911
dataVerificacao: 2026-11-22
funcionalidadesMedidas:
  - "[[saida_estruturada|Saída estruturada]]"
  - "[[geracao_de_texto|Geração de texto]]"
  - "[[avaliacao_de_qualidade|Avaliação de qualidade]]"
casosDeUsoRelacionados:
  - "[[chat_e_assistente_geral|Chat e assistente geral]]"
  - "[[geracao_de_conteudo|Geração de conteúdo]]"
  - "[[avaliacao_de_prompts|Avaliação de prompts]]"
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
# IFEval
## 📝 Descrição
Prompts com instruções verificáveis por código, como 'escreva mais de 300 palavras' ou 'não use vírgulas'. Mantido por Google Research. Página oficial: https://arxiv.org/abs/2311.07911
## 🎯 O que avalia
Obediência a instruções explícitas de formato e conteúdo.
## ⚙ Como funciona (método e métrica)
- **Método:** Cada prompt traz uma ou mais instruções checadas por regras determinísticas, sem juiz de modelo.
- **Métrica:** Acurácia em nível de prompt e de instrução, estrita ou flexível (%).
- **Escala:** 0 a 100; maior é melhor.
## ⚠ Limitações
Cobre apenas instruções verificáveis por regra. O estilo e a utilidade da resposta ficam sem avaliação.
## 🌡 Saturação e contaminação
- **Saturação:** não verificado. Nenhuma pontuação oficial dos modelos foi lida nesta consulta.
- **Contaminação:** Conjunto público desde 2023. Vazamento não verificado.
## 📊 Resultados
Cada linha vem do campo `resultados` (consulta em 2026-11-22: 0 pontuações lidas, 3 `não verificado`). Origem `autodeclarado-fornecedor` indica número publicado pelo próprio fornecedor ou por quem mede um concorrente. Valores `não verificado` registram consulta sem pontuação oficial legível.

## 🧭 Como usar na escolha de modelo
Sem pontuações oficiais legíveis, trate o benchmark como referência de método e rode o teste você mesmo antes de decidir. Combine com os benchmarks da mesma área (conhecimento) e com uma avaliação própria, porque cada fornecedor escolhe quais testes publicar.
## 🔗 Relacionamentos
- **Funcionalidades medidas:** [[saida_estruturada|Saída estruturada]], [[geracao_de_texto|Geração de texto]], [[avaliacao_de_qualidade|Avaliação de qualidade]]
- **Casos de uso:** [[chat_e_assistente_geral|Chat e assistente geral]], [[geracao_de_conteudo|Geração de conteúdo]], [[avaliacao_de_prompts|Avaliação de prompts]]
- **Modelos avaliados:** [[claude_opus_5_5|Claude Opus 5.5]], [[gpt_5_5|GPT-5.5]], [[gemini_3_1_pro|Gemini 3.1 Pro]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
