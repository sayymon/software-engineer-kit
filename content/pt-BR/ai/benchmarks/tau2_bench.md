---
id: tau2_bench
tipo: benchmark
nome: tau2-bench
aliases:
  - τ2-bench
  - tau-squared bench
  - Tau2-bench
descricao: Simulação de atendimento ao cliente em que o agente conversa com um usuário simulado e usa ferramentas de domínio.
area: agentes
avalia: Uso de ferramentas e seguimento de política em conversas longas, em domínios como varejo e telecomunicações.
metodo: Um usuário simulado conversa com o agente, que chama APIs de domínio. O resultado é o estado final do banco de dados comparado ao esperado.
metrica: Taxa de sucesso (%), por domínio (Retail, Telecom).
escala: 0 a 100; maior é melhor.
limitacoes: O modelo que simula o usuário muda o resultado (a OpenAI usa o GPT-4.1). A OpenAI rodou sem ajuste de prompt, e outros laboratórios ajustam.
saturacao: alta
contaminacao: Cenários públicos desde 2025. Vazamento não verificado.
mantenedor: Sierra
urlOficial: https://arxiv.org/abs/2506.07982
dataVerificacao: 2026-11-22
funcionalidadesMedidas:
  - "[[tool_use_funcionalidade|Tool use]]"
  - "[[multiagente|Multiagente]]"
  - "[[human_in_the_loop_funcionalidade|Human in the loop]]"
casosDeUsoRelacionados:
  - "[[construcao_de_agentes|Construção de agentes]]"
  - "[[automacao_de_processos|Automação de processos]]"
  - "[[agentes_autonomos_de_longa_duracao|Agentes autônomos de longa duração]]"
modelosAvaliados:
  - "[[gemini_3_1_pro|Gemini 3.1 Pro]]"
  - "[[gpt_5_5|GPT-5.5]]"
  - "[[claude_sonnet_4_6|Claude Sonnet 4.6]]"
resultados:
  - modelo: "[[gemini_3_1_pro|Gemini 3.1 Pro]]"
    valor: 99.3
    unidade: "% (Telecom)"
    origem: autodeclarado-fornecedor
    fonte: https://deepmind.google/models/model-cards/gemini-3-1-pro/
    data: 2026-11-22
  - modelo: "[[gpt_5_5|GPT-5.5]]"
    valor: 98
    unidade: "% (Telecom, prompts originais)"
    origem: autodeclarado-fornecedor
    fonte: https://openai.com/index/introducing-gpt-5-5/
    data: 2026-11-22
  - modelo: "[[claude_sonnet_4_6|Claude Sonnet 4.6]]"
    valor: 97.9
    unidade: "% (Telecom)"
    origem: autodeclarado-fornecedor
    fonte: https://deepmind.google/models/model-cards/gemini-3-1-pro/
    data: 2026-11-22
    nota: Número de modelo de terceiro, reportado na tabela do model card do Gemini 3.1 Pro (Google).
  - modelo: "[[gemini_3_1_pro|Gemini 3.1 Pro]]"
    valor: 90.8
    unidade: "% (Retail)"
    origem: autodeclarado-fornecedor
    fonte: https://deepmind.google/models/model-cards/gemini-3-1-pro/
    data: 2026-11-22
tags:
  - benchmark
  - ia
---
# tau2-bench
## 📝 Descrição
Simulação de atendimento ao cliente em que o agente conversa com um usuário simulado e usa ferramentas de domínio. Mantido por Sierra. Página oficial: https://arxiv.org/abs/2506.07982
## 🎯 O que avalia
Uso de ferramentas e seguimento de política em conversas longas, em domínios como varejo e telecomunicações.
## ⚙ Como funciona (método e métrica)
- **Método:** Um usuário simulado conversa com o agente, que chama APIs de domínio. O resultado é o estado final do banco de dados comparado ao esperado.
- **Métrica:** Taxa de sucesso (%), por domínio (Retail, Telecom).
- **Escala:** 0 a 100; maior é melhor.
## ⚠ Limitações
O modelo que simula o usuário muda o resultado (a OpenAI usa o GPT-4.1). A OpenAI rodou sem ajuste de prompt, e outros laboratórios ajustam.
## 🌡 Saturação e contaminação
- **Saturação:** alta. O domínio Telecom marca de 97,9% a 99,3%.
- **Contaminação:** Cenários públicos desde 2025. Vazamento não verificado.
## 📊 Resultados
Cada linha vem do campo `resultados` (consulta em 2026-11-22: 4 pontuações lidas, 0 `não verificado`). Origem `autodeclarado-fornecedor` indica número publicado pelo próprio fornecedor ou por quem mede um concorrente. Valores `não verificado` registram consulta sem pontuação oficial legível.

## 🧭 Como usar na escolha de modelo
Os melhores modelos ficam perto do teto, então use o benchmark para descartar modelos fracos e confirme a escolha final em testes com os seus dados. Combine com os benchmarks da mesma área (agentes) e com uma avaliação própria, porque cada fornecedor escolhe quais testes publicar.
## 🔗 Relacionamentos
- **Funcionalidades medidas:** [[tool_use_funcionalidade|Tool use]], [[multiagente|Multiagente]], [[human_in_the_loop_funcionalidade|Human in the loop]]
- **Casos de uso:** [[construcao_de_agentes|Construção de agentes]], [[automacao_de_processos|Automação de processos]], [[agentes_autonomos_de_longa_duracao|Agentes autônomos de longa duração]]
- **Modelos avaliados:** [[gemini_3_1_pro|Gemini 3.1 Pro]], [[gpt_5_5|GPT-5.5]], [[claude_sonnet_4_6|Claude Sonnet 4.6]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
