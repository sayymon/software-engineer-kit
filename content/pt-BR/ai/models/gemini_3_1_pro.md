---
id: gemini_3_1_pro
tipo: modelo
nome: Gemini 3.1 Pro
aliases: []
familia: Gemini
empresa: "[[google|Google]]"
lancamento: 2026-02-19
status: preview
idModeloApi: gemini-3.1-pro-preview
contextoTokens: 1048576
saidaMaxTokens: 65536
modalidadesEntrada:
  - texto
  - imagem
  - audio
  - video
  - pdf
modalidadesSaida:
  - texto
precoEntradaUSD: 2
precoSaidaUSD: 12
precoCacheUSD: 0.2
licenca: Proprietária
disponibilidade:
  - api
  - assinatura
ferramentas:
  - "[[gemini|Gemini]]"
categorias:
  - "[[modelo_fundacional|Modelo fundacional]]"
funcionalidades:
  - "[[raciocinio|Raciocínio]]"
  - "[[geracao_de_codigo|Geração de código]]"
  - "[[edicao_de_codebase|Edição de codebase]]"
  - "[[tool_use_funcionalidade|Tool use]]"
  - "[[multimodal|Multimodal]]"
  - "[[contexto_longo|Contexto longo]]"
casosDeUso:
  - "[[raciocinio_complexo_e_matematica|Raciocínio complexo e matemática]]"
  - "[[agentes_autonomos_de_longa_duracao|Agentes autônomos de longa duração]]"
  - "[[programacao_em_par|Programação em par]]"
  - "[[analise_de_documentos_e_imagens|Análise de documentos e imagens]]"
benchmarks:
  - "[[mmlu_pro|MMLU-Pro]]"
  - "[[gpqa_diamond|GPQA Diamond]]"
  - "[[humanity_s_last_exam|Humanity's Last Exam]]"
  - "[[arc_agi_2|ARC-AGI-2]]"
  - "[[simpleqa|SimpleQA]]"
  - "[[ifeval|IFEval]]"
  - "[[aime_2025|AIME 2025]]"
  - "[[frontiermath|FrontierMath]]"
  - "[[swe_bench_verified|SWE-bench Verified]]"
  - "[[livecodebench|LiveCodeBench]]"
  - "[[terminal_bench_2_0|Terminal-Bench 2.0]]"
  - "[[tau2_bench|tau2-bench]]"
  - "[[browsecomp|BrowseComp]]"
  - "[[mmmu|MMMU]]"
  - "[[video_mme|Video-MME]]"
  - "[[mrcr_v2|MRCR v2]]"
dataVerificacao: 2026-11-20
fontePreco: https://ai.google.dev/gemini-api/docs/pricing
tags:
  - modelo
  - ia
  - llm
---
# Gemini 3.1 Pro
## 📋 Informações Básicas
- **Família:** Gemini
- **Empresa:** [[google|Google]]
- **Lançamento:** 2026-02-19
- **Status:** preview
- **ID na API:** gemini-3.1-pro-preview
- **Disponibilidade:** api, assinatura
## 📝 Descrição
Versão Pro da geração Gemini 3.1, ainda em preview na API, com contexto de 1M tokens.

Existe um endpoint separado (customtools) para uso com ferramentas.
## ⚙️ Especificações
- **Janela de contexto:** 1.048.576 tokens
- **Saída máxima:** 65.536 tokens
- **Modalidades de entrada:** texto, imagem, audio, video, pdf
- **Modalidades de saída:** texto
- **Licença:** Proprietária
## 💰 Preço (USD por 1M tokens)
- **Entrada:** US$ 2,00
- **Saída:** US$ 12,00
- **Cache:** US$ 0,20
- **Fonte:** https://ai.google.dev/gemini-api/docs/pricing (verificado em 2026-11-20)
## ⏰ Quando Utilizar
- Compatibilidade com integrações da geração 3.x
### Quando NÃO utilizar
- Projetos novos (prefira a família Gemini 4)
## 🧩 Casos de uso e funcionalidades
- **Casos de uso:** [[raciocinio_complexo_e_matematica|Raciocínio complexo e matemática]], [[agentes_autonomos_de_longa_duracao|Agentes autônomos de longa duração]], [[programacao_em_par|Programação em par]], [[analise_de_documentos_e_imagens|Análise de documentos e imagens]]
- **Funcionalidades:** [[raciocinio|Raciocínio]], [[geracao_de_codigo|Geração de código]], [[edicao_de_codebase|Edição de codebase]], [[tool_use_funcionalidade|Tool use]], [[multimodal|Multimodal]], [[contexto_longo|Contexto longo]]
- **Categorias:** [[modelo_fundacional|Modelo fundacional]]
## 🆚 Alternativas
- [[gemini_4_neon|Gemini 4 Neon]] - mesma família
- [[claude_sonnet_4_6|Claude Sonnet 4.6]] - alternativa de outro fornecedor
## 🔗 Relacionamentos
- **Empresa:** [[google|Google]]
- **Ferramentas:** [[gemini|Gemini]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Modelos de IA
