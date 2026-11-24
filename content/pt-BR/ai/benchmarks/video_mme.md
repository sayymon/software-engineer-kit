---
id: video_mme
tipo: benchmark
nome: Video-MME
aliases:
  - Video-MME (sem legendas)
descricao: Benchmark de compreensão de vídeo com vídeos curtos a longos e perguntas de múltipla escolha.
area: multimodal
avalia: Entendimento de vídeo em vários domínios e durações, com ou sem legendas.
metodo: O modelo assiste ao vídeo e responde perguntas de múltipla escolha. A Google reporta a variante sem legendas.
metrica: Acurácia (%).
escala: 0 a 100; maior é melhor.
limitacoes: A taxa de quadros e o número de quadros amostrados mudam o resultado. Apenas duas pontuações oficiais foram lidas.
saturacao: media
contaminacao: Conjunto público. Vazamento não verificado.
mantenedor: Video-MME (Fu et al.)
urlOficial: https://video-mme.github.io/
dataVerificacao: 2026-11-22
funcionalidadesMedidas:
  - "[[multimodal|Multimodal]]"
  - "[[raciocinio|Raciocínio]]"
casosDeUsoRelacionados:
  - "[[analise_de_documentos_e_imagens|Análise de documentos e imagens]]"
  - "[[transcricao_de_reunioes_e_midia|Transcrição de reuniões e mídia]]"
modelosAvaliados:
  - "[[gemini_decision_1|Gemini Decision 1]]"
  - "[[gemini_3_5_flash_lite|Gemini 3.5 Flash-Lite]]"
  - "[[gemini_3_1_pro|Gemini 3.1 Pro]]"
resultados:
  - modelo: "[[gemini_decision_1|Gemini Decision 1]]"
    valor: 69.1
    unidade: "% (sem legendas)"
    origem: autodeclarado-fornecedor
    fonte: https://www.marktechpost.com/2026/11/11/google-gemini-decisions-api-gemini-decision-1/
    data: 2026-11-22
    nota: Número reportado pela Google no blog de lançamento, relatado pelo MarkTechPost; autodeclarado.
  - modelo: "[[gemini_3_5_flash_lite|Gemini 3.5 Flash-Lite]]"
    valor: 63.3
    unidade: "% (sem legendas)"
    origem: autodeclarado-fornecedor
    fonte: https://www.marktechpost.com/2026/11/11/google-gemini-decisions-api-gemini-decision-1/
    data: 2026-11-22
    nota: Número reportado pela Google no blog de lançamento, relatado pelo MarkTechPost; autodeclarado.
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
# Video-MME
## 📝 Descrição
Benchmark de compreensão de vídeo com vídeos curtos a longos e perguntas de múltipla escolha. Mantido por Video-MME (Fu et al.). Página oficial: https://video-mme.github.io/
## 🎯 O que avalia
Entendimento de vídeo em vários domínios e durações, com ou sem legendas.
## ⚙ Como funciona (método e métrica)
- **Método:** O modelo assiste ao vídeo e responde perguntas de múltipla escolha. A Google reporta a variante sem legendas.
- **Métrica:** Acurácia (%).
- **Escala:** 0 a 100; maior é melhor.
## ⚠ Limitações
A taxa de quadros e o número de quadros amostrados mudam o resultado. Apenas duas pontuações oficiais foram lidas.
## 🌡 Saturação e contaminação
- **Saturação:** media. Valores de 63,3% e 69,1% na tabela da Google.
- **Contaminação:** Conjunto público. Vazamento não verificado.
## 📊 Resultados
Cada linha vem do campo `resultados` (consulta em 2026-11-22: 2 pontuações lidas, 1 `não verificado`). Origem `autodeclarado-fornecedor` indica número publicado pelo próprio fornecedor ou por quem mede um concorrente. Valores `não verificado` registram consulta sem pontuação oficial legível.

## 🧭 Como usar na escolha de modelo
Ainda há margem entre os modelos, então a pontuação ajuda a ordenar candidatos. Confirme com uma amostra do seu caso de uso. Combine com os benchmarks da mesma área (multimodal) e com uma avaliação própria, porque cada fornecedor escolhe quais testes publicar.
## 🔗 Relacionamentos
- **Funcionalidades medidas:** [[multimodal|Multimodal]], [[raciocinio|Raciocínio]]
- **Casos de uso:** [[analise_de_documentos_e_imagens|Análise de documentos e imagens]], [[transcricao_de_reunioes_e_midia|Transcrição de reuniões e mídia]]
- **Modelos avaliados:** [[gemini_decision_1|Gemini Decision 1]], [[gemini_3_5_flash_lite|Gemini 3.5 Flash-Lite]], [[gemini_3_1_pro|Gemini 3.1 Pro]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
