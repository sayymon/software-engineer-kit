---
id: lmarena_text
tipo: benchmark
nome: LMArena Text
aliases:
  - LMArena
  - Chatbot Arena
descricao: Plataforma de comparação às cegas em que pessoas votam na melhor resposta entre dois modelos.
area: conhecimento
avalia: Preferência humana em conversas de texto abertas.
metodo: Usuários enviam um prompt, recebem duas respostas anônimas e votam. Os votos alimentam um ranking Elo (modelo Bradley-Terry).
metrica: Pontuação Elo com intervalo de confiança.
escala: Elo relativo; maior é melhor.
limitacoes: Mede preferência, e acerto factual ou segurança ficam fora. Estilo e comprimento da resposta influenciam os votos. O ranking muda ao longo do tempo.
saturacao: não verificado
contaminacao: Prompts vêm de usuários reais e mudam continuamente. Risco de vazamento baixo, não verificado.
mantenedor: LMArena (UC Berkeley)
urlOficial: https://lmarena.ai/
dataVerificacao: 2026-11-22
funcionalidadesMedidas:
  - "[[geracao_de_texto|Geração de texto]]"
  - "[[comparacao_de_modelos|Comparação de modelos]]"
casosDeUsoRelacionados:
  - "[[chat_e_assistente_geral|Chat e assistente geral]]"
  - "[[redacao_e_copywriting|Redação e copywriting]]"
modelosAvaliados:
  - "[[claude_opus_5_5|Claude Opus 5.5]]"
  - "[[gpt_5_5|GPT-5.5]]"
  - "[[gemini_4_carbon|Gemini 4 Carbon]]"
resultados:
  - modelo: "[[claude_opus_5_5|Claude Opus 5.5]]"
    valor: não verificado
    unidade: não verificado
    origem: não verificado
    fonte: não verificado
    data: não verificado
    nota: A página oficial bloqueou a leitura automática (HTTP 403) em 2026-11-22.
  - modelo: "[[gpt_5_5|GPT-5.5]]"
    valor: não verificado
    unidade: não verificado
    origem: não verificado
    fonte: não verificado
    data: não verificado
    nota: A página oficial bloqueou a leitura automática (HTTP 403) em 2026-11-22.
  - modelo: "[[gemini_4_carbon|Gemini 4 Carbon]]"
    valor: não verificado
    unidade: não verificado
    origem: não verificado
    fonte: não verificado
    data: não verificado
    nota: A página oficial bloqueou a leitura automática (HTTP 403) em 2026-11-22.
tags:
  - benchmark
  - ia
---
# LMArena Text
## 📝 Descrição
Plataforma de comparação às cegas em que pessoas votam na melhor resposta entre dois modelos. Mantido por LMArena (UC Berkeley). Página oficial: https://lmarena.ai/
## 🎯 O que avalia
Preferência humana em conversas de texto abertas.
## ⚙ Como funciona (método e métrica)
- **Método:** Usuários enviam um prompt, recebem duas respostas anônimas e votam. Os votos alimentam um ranking Elo (modelo Bradley-Terry).
- **Métrica:** Pontuação Elo com intervalo de confiança.
- **Escala:** Elo relativo; maior é melhor.
## ⚠ Limitações
Mede preferência, e acerto factual ou segurança ficam fora. Estilo e comprimento da resposta influenciam os votos. O ranking muda ao longo do tempo.
## 🌡 Saturação e contaminação
- **Saturação:** não verificado. A página de ranking retornou HTTP 403 em 2026-11-22 e nenhuma pontuação foi lida.
- **Contaminação:** Prompts vêm de usuários reais e mudam continuamente. Risco de vazamento baixo, não verificado.
## 📊 Resultados
Cada linha vem do campo `resultados` (consulta em 2026-11-22: 0 pontuações lidas, 3 `não verificado`). Origem `autodeclarado-fornecedor` indica número publicado pelo próprio fornecedor ou por quem mede um concorrente. Valores `não verificado` registram consulta sem pontuação oficial legível.

## 🧭 Como usar na escolha de modelo
Sem pontuações oficiais legíveis, trate o benchmark como referência de método e rode o teste você mesmo antes de decidir. Combine com os benchmarks da mesma área (conhecimento) e com uma avaliação própria, porque cada fornecedor escolhe quais testes publicar.
## 🔗 Relacionamentos
- **Funcionalidades medidas:** [[geracao_de_texto|Geração de texto]], [[comparacao_de_modelos|Comparação de modelos]]
- **Casos de uso:** [[chat_e_assistente_geral|Chat e assistente geral]], [[redacao_e_copywriting|Redação e copywriting]]
- **Modelos avaliados:** [[claude_opus_5_5|Claude Opus 5.5]], [[gpt_5_5|GPT-5.5]], [[gemini_4_carbon|Gemini 4 Carbon]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
