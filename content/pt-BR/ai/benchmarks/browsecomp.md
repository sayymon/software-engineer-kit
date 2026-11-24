---
id: browsecomp
tipo: benchmark
nome: BrowseComp
aliases:
  - BrowseComp (OpenAI)
descricao: Perguntas difíceis de encontrar na web, com resposta curta fácil de verificar.
area: agentes
avalia: Navegação persistente na web para achar informação obscura e combinar pistas.
metodo: O agente usa navegador e busca para responder perguntas criadas de trás para frente (a resposta é conhecida e a pergunta é difícil de achar). A resposta curta é comparada ao gabarito.
metrica: Acurácia (%).
escala: 0 a 100; maior é melhor.
limitacoes: Mede achar e verificar fatos, e a produção de relatórios longos fica fora. O resultado depende do harness de busca.
saturacao: media
contaminacao: O conjunto é distribuído criptografado para evitar vazamento em páginas indexadas.
mantenedor: OpenAI
urlOficial: https://openai.com/index/browsecomp/
dataVerificacao: 2026-11-22
funcionalidadesMedidas:
  - "[[busca_na_web|Busca na web]]"
  - "[[tool_use_funcionalidade|Tool use]]"
  - "[[raciocinio|Raciocínio]]"
casosDeUsoRelacionados:
  - "[[pesquisa_aprofundada|Pesquisa aprofundada]]"
  - "[[agentes_autonomos_de_longa_duracao|Agentes autônomos de longa duração]]"
  - "[[construcao_de_agentes|Construção de agentes]]"
modelosAvaliados:
  - "[[gemini_3_1_pro|Gemini 3.1 Pro]]"
  - "[[gpt_5_5|GPT-5.5]]"
  - "[[claude_sonnet_4_6|Claude Sonnet 4.6]]"
resultados:
  - modelo: "[[gemini_3_1_pro|Gemini 3.1 Pro]]"
    valor: 85.9
    unidade: "% (busca, Python e navegação)"
    origem: autodeclarado-fornecedor
    fonte: https://deepmind.google/models/model-cards/gemini-3-1-pro/
    data: 2026-11-22
  - modelo: "[[gpt_5_5|GPT-5.5]]"
    valor: 84.4
    unidade: "%"
    origem: autodeclarado-fornecedor
    fonte: https://openai.com/index/introducing-gpt-5-5/
    data: 2026-11-22
  - modelo: "[[claude_sonnet_4_6|Claude Sonnet 4.6]]"
    valor: 74.7
    unidade: "%"
    origem: autodeclarado-fornecedor
    fonte: https://deepmind.google/models/model-cards/gemini-3-1-pro/
    data: 2026-11-22
    nota: Número de modelo de terceiro, reportado na tabela do model card do Gemini 3.1 Pro (Google).
tags:
  - benchmark
  - ia
---
# BrowseComp
## 📝 Descrição
Perguntas difíceis de encontrar na web, com resposta curta fácil de verificar. Mantido por OpenAI. Página oficial: https://openai.com/index/browsecomp/
## 🎯 O que avalia
Navegação persistente na web para achar informação obscura e combinar pistas.
## ⚙ Como funciona (método e métrica)
- **Método:** O agente usa navegador e busca para responder perguntas criadas de trás para frente (a resposta é conhecida e a pergunta é difícil de achar). A resposta curta é comparada ao gabarito.
- **Métrica:** Acurácia (%).
- **Escala:** 0 a 100; maior é melhor.
## ⚠ Limitações
Mede achar e verificar fatos, e a produção de relatórios longos fica fora. O resultado depende do harness de busca.
## 🌡 Saturação e contaminação
- **Saturação:** media. De 74,7% a 85,9% nas fontes lidas, e 90,1% para o GPT-5.5 Pro.
- **Contaminação:** O conjunto é distribuído criptografado para evitar vazamento em páginas indexadas.
## 📊 Resultados
Cada linha vem do campo `resultados` (consulta em 2026-11-22: 3 pontuações lidas, 0 `não verificado`). Origem `autodeclarado-fornecedor` indica número publicado pelo próprio fornecedor ou por quem mede um concorrente. Valores `não verificado` registram consulta sem pontuação oficial legível.

## 🧭 Como usar na escolha de modelo
Ainda há margem entre os modelos, então a pontuação ajuda a ordenar candidatos. Confirme com uma amostra do seu caso de uso. Combine com os benchmarks da mesma área (agentes) e com uma avaliação própria, porque cada fornecedor escolhe quais testes publicar.
## 🔗 Relacionamentos
- **Funcionalidades medidas:** [[busca_na_web|Busca na web]], [[tool_use_funcionalidade|Tool use]], [[raciocinio|Raciocínio]]
- **Casos de uso:** [[pesquisa_aprofundada|Pesquisa aprofundada]], [[agentes_autonomos_de_longa_duracao|Agentes autônomos de longa duração]], [[construcao_de_agentes|Construção de agentes]]
- **Modelos avaliados:** [[gemini_3_1_pro|Gemini 3.1 Pro]], [[gpt_5_5|GPT-5.5]], [[claude_sonnet_4_6|Claude Sonnet 4.6]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
