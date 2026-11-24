---
id: osworld_verified
tipo: benchmark
nome: OSWorld-Verified
aliases:
  - OSWorld
descricao: Tarefas reais de computador em Ubuntu, Windows e macOS, verificadas por scripts, para agentes que usam a interface gráfica.
area: uso-de-computador
avalia: "Operação autônoma de um computador: ver a tela, clicar, digitar e navegar entre aplicativos."
metodo: O agente recebe uma tarefa em linguagem natural e controla um ambiente virtual. Um script de avaliação confere o estado final.
metrica: Taxa de sucesso (%).
escala: 0 a 100; maior é melhor.
limitacoes: Tarefas com limite de passos e ambientes de máquina virtual. A Anthropic e a Google já reportam o OSWorld 2.1, que difere do Verified.
saturacao: media
contaminacao: Tarefas públicas. Vazamento não verificado.
mantenedor: XLang Lab (Universidade de Hong Kong)
urlOficial: https://os-world.github.io/
dataVerificacao: 2026-11-22
funcionalidadesMedidas:
  - "[[uso_de_computador|Uso de computador]]"
  - "[[tool_use_funcionalidade|Tool use]]"
  - "[[multimodal|Multimodal]]"
casosDeUsoRelacionados:
  - "[[agente_que_usa_o_computador|Agente que usa o computador]]"
  - "[[automacao_de_navegador_e_rpa|Automação de navegador e RPA]]"
  - "[[agentes_autonomos_de_longa_duracao|Agentes autônomos de longa duração]]"
modelosAvaliados:
  - "[[gpt_5_5|GPT-5.5]]"
  - "[[claude_opus_5_5|Claude Opus 5.5]]"
  - "[[gemini_4_carbon|Gemini 4 Carbon]]"
resultados:
  - modelo: "[[gpt_5_5|GPT-5.5]]"
    valor: 78.7
    unidade: "%"
    origem: autodeclarado-fornecedor
    fonte: https://openai.com/index/introducing-gpt-5-5/
    data: 2026-11-22
  - modelo: "[[claude_opus_5_5|Claude Opus 5.5]]"
    valor: não verificado
    unidade: não verificado
    origem: não verificado
    fonte: não verificado
    data: não verificado
    nota: A Anthropic reporta OSWorld 2.1 (81,8%, parcial), que é outra versão.
  - modelo: "[[gemini_4_carbon|Gemini 4 Carbon]]"
    valor: não verificado
    unidade: não verificado
    origem: não verificado
    fonte: não verificado
    data: não verificado
    nota: A Google reporta OSWorld-2.1 (subconjunto offline), que é outra versão.
tags:
  - benchmark
  - ia
---
# OSWorld-Verified
## 📝 Descrição
Tarefas reais de computador em Ubuntu, Windows e macOS, verificadas por scripts, para agentes que usam a interface gráfica. Mantido por XLang Lab (Universidade de Hong Kong). Página oficial: https://os-world.github.io/
## 🎯 O que avalia
Operação autônoma de um computador: ver a tela, clicar, digitar e navegar entre aplicativos.
## ⚙ Como funciona (método e métrica)
- **Método:** O agente recebe uma tarefa em linguagem natural e controla um ambiente virtual. Um script de avaliação confere o estado final.
- **Métrica:** Taxa de sucesso (%).
- **Escala:** 0 a 100; maior é melhor.
## ⚠ Limitações
Tarefas com limite de passos e ambientes de máquina virtual. A Anthropic e a Google já reportam o OSWorld 2.1, que difere do Verified.
## 🌡 Saturação e contaminação
- **Saturação:** media. O GPT-5.5 marca 78,7% e o Opus 4.7 78,0% na tabela da OpenAI.
- **Contaminação:** Tarefas públicas. Vazamento não verificado.
## 📊 Resultados
Cada linha vem do campo `resultados` (consulta em 2026-11-22: 1 pontuações lidas, 2 `não verificado`). Origem `autodeclarado-fornecedor` indica número publicado pelo próprio fornecedor ou por quem mede um concorrente. Valores `não verificado` registram consulta sem pontuação oficial legível.

## 🧭 Como usar na escolha de modelo
Ainda há margem entre os modelos, então a pontuação ajuda a ordenar candidatos. Confirme com uma amostra do seu caso de uso. Combine com os benchmarks da mesma área (uso-de-computador) e com uma avaliação própria, porque cada fornecedor escolhe quais testes publicar.
## 🔗 Relacionamentos
- **Funcionalidades medidas:** [[uso_de_computador|Uso de computador]], [[tool_use_funcionalidade|Tool use]], [[multimodal|Multimodal]]
- **Casos de uso:** [[agente_que_usa_o_computador|Agente que usa o computador]], [[automacao_de_navegador_e_rpa|Automação de navegador e RPA]], [[agentes_autonomos_de_longa_duracao|Agentes autônomos de longa duração]]
- **Modelos avaliados:** [[gpt_5_5|GPT-5.5]], [[claude_opus_5_5|Claude Opus 5.5]], [[gemini_4_carbon|Gemini 4 Carbon]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
