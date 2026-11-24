---
id: simpleqa
tipo: benchmark
nome: SimpleQA
aliases:
  - SimpleQA Verified
descricao: Perguntas factuais curtas com uma única resposta correta, criadas para medir alucinação.
area: busca-e-factualidade
avalia: Precisão factual em perguntas de resposta curta, separando acerto, erro e abstenção.
metodo: Um avaliador automático classifica cada resposta como correta, incorreta ou não tentada.
metrica: Percentual de respostas corretas (%), com taxa de erro e de abstenção em separado.
escala: 0 a 100; maior é melhor.
limitacoes: Cobre fatos isolados e deixa de fora raciocínio longo. Modelos com busca ligada pontuam acima dos sem busca, então confira a configuração.
saturacao: não verificado
contaminacao: Conjunto público. Vazamento não verificado.
mantenedor: OpenAI
urlOficial: https://openai.com/index/introducing-simpleqa/
dataVerificacao: 2026-11-22
funcionalidadesMedidas:
  - "[[raciocinio|Raciocínio]]"
  - "[[busca_na_web|Busca na web]]"
  - "[[avaliacao_de_qualidade|Avaliação de qualidade]]"
casosDeUsoRelacionados:
  - "[[pesquisa_aprofundada|Pesquisa aprofundada]]"
  - "[[chat_e_assistente_geral|Chat e assistente geral]]"
  - "[[estudo_e_aprendizado|Estudo e aprendizado]]"
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
# SimpleQA
## 📝 Descrição
Perguntas factuais curtas com uma única resposta correta, criadas para medir alucinação. Mantido por OpenAI. Página oficial: https://openai.com/index/introducing-simpleqa/
## 🎯 O que avalia
Precisão factual em perguntas de resposta curta, separando acerto, erro e abstenção.
## ⚙ Como funciona (método e métrica)
- **Método:** Um avaliador automático classifica cada resposta como correta, incorreta ou não tentada.
- **Métrica:** Percentual de respostas corretas (%), com taxa de erro e de abstenção em separado.
- **Escala:** 0 a 100; maior é melhor.
## ⚠ Limitações
Cobre fatos isolados e deixa de fora raciocínio longo. Modelos com busca ligada pontuam acima dos sem busca, então confira a configuração.
## 🌡 Saturação e contaminação
- **Saturação:** não verificado. Nenhuma pontuação oficial dos modelos foi lida nesta consulta.
- **Contaminação:** Conjunto público. Vazamento não verificado.
## 📊 Resultados
Cada linha vem do campo `resultados` (consulta em 2026-11-22: 0 pontuações lidas, 3 `não verificado`). Origem `autodeclarado-fornecedor` indica número publicado pelo próprio fornecedor ou por quem mede um concorrente. Valores `não verificado` registram consulta sem pontuação oficial legível.

## 🧭 Como usar na escolha de modelo
Sem pontuações oficiais legíveis, trate o benchmark como referência de método e rode o teste você mesmo antes de decidir. Combine com os benchmarks da mesma área (busca-e-factualidade) e com uma avaliação própria, porque cada fornecedor escolhe quais testes publicar.
## 🔗 Relacionamentos
- **Funcionalidades medidas:** [[raciocinio|Raciocínio]], [[busca_na_web|Busca na web]], [[avaliacao_de_qualidade|Avaliação de qualidade]]
- **Casos de uso:** [[pesquisa_aprofundada|Pesquisa aprofundada]], [[chat_e_assistente_geral|Chat e assistente geral]], [[estudo_e_aprendizado|Estudo e aprendizado]]
- **Modelos avaliados:** [[claude_opus_5_5|Claude Opus 5.5]], [[gpt_5_5|GPT-5.5]], [[gemini_3_1_pro|Gemini 3.1 Pro]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
