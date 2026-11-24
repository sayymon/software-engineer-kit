---
id: claude_opus_5_5
tipo: modelo
nome: Claude Opus 5.5
aliases: []
familia: Claude
empresa: "[[anthropic|Anthropic]]"
lancamento: 2026-09-22
status: ativo
idModeloApi: claude-opus-5-5
contextoTokens: 1000000
saidaMaxTokens: 128000
modalidadesEntrada:
  - texto
  - imagem
modalidadesSaida:
  - texto
precoEntradaUSD: 4
precoSaidaUSD: 20
precoCacheUSD: 0.2
licenca: Proprietária
disponibilidade:
  - api
  - assinatura
ferramentas:
  - "[[claude|Claude AI]]"
  - "[[claude_code|Claude-Code]]"
  - "[[kiro_ide|Kiro-IDE]]"
  - "[[cursor|Cursor]]"
  - "[[github_copilot|GitHub Copilot]]"
categorias:
  - "[[modelo_fundacional|Modelo fundacional]]"
funcionalidades:
  - "[[raciocinio|Raciocínio]]"
  - "[[geracao_de_codigo|Geração de código]]"
  - "[[edicao_de_codebase|Edição de codebase]]"
  - "[[tool_use_funcionalidade|Tool use]]"
  - "[[multimodal|Multimodal]]"
  - "[[contexto_longo|Contexto longo]]"
  - "[[uso_de_computador|Uso de computador]]"
casosDeUso:
  - "[[raciocinio_complexo_e_matematica|Raciocínio complexo e matemática]]"
  - "[[agentes_autonomos_de_longa_duracao|Agentes autônomos de longa duração]]"
  - "[[programacao_em_par|Programação em par]]"
  - "[[analise_de_documentos_e_imagens|Análise de documentos e imagens]]"
  - "[[pesquisa_aprofundada|Pesquisa aprofundada]]"
  - "[[refatoracao_de_codigo|Refatoração de código]]"
benchmarks:
  - "[[mmlu_pro|MMLU-Pro]]"
  - "[[gpqa_diamond|GPQA Diamond]]"
  - "[[humanity_s_last_exam|Humanity's Last Exam]]"
  - "[[simpleqa|SimpleQA]]"
  - "[[ifeval|IFEval]]"
  - "[[aime_2025|AIME 2025]]"
  - "[[frontiermath|FrontierMath]]"
  - "[[swe_bench_verified|SWE-bench Verified]]"
  - "[[livecodebench|LiveCodeBench]]"
  - "[[aider_polyglot|Aider Polyglot]]"
  - "[[terminal_bench_2_0|Terminal-Bench 2.0]]"
  - "[[osworld_verified|OSWorld-Verified]]"
  - "[[lmarena_text|LMArena Text]]"
dataVerificacao: 2026-11-20
fontePreco: https://platform.claude.com/docs/en/about-claude/pricing
tags:
  - modelo
  - ia
  - llm
---
# Claude Opus 5.5
## 📋 Informações Básicas
- **Família:** Claude
- **Empresa:** [[anthropic|Anthropic]]
- **Lançamento:** 2026-09-22
- **Status:** ativo
- **ID na API:** claude-opus-5-5
- **Disponibilidade:** api, assinatura
## 📝 Descrição
Ponto de partida recomendado pela Anthropic para a maioria das cargas: agentes de programação de várias horas, refatoração em grande escala, engenharia de sistemas complexos e fluxos com forte componente visual.

Cache de leitura custa 5% do preço de entrada neste modelo. Desde o Claude 4.7 o tokenizador gera cerca de 30% mais tokens para o mesmo texto, o que afeta o custo real.
## ⚙️ Especificações
- **Janela de contexto:** 1.000.000 tokens
- **Saída máxima:** 128.000 tokens
- **Modalidades de entrada:** texto, imagem
- **Modalidades de saída:** texto
- **Licença:** Proprietária
## 💰 Preço (USD por 1M tokens)
- **Entrada:** US$ 4,00
- **Saída:** US$ 20,00
- **Cache:** US$ 0,20
- **Fonte:** https://platform.claude.com/docs/en/about-claude/pricing (verificado em 2026-11-20)
## ⏰ Quando Utilizar
- Agente de código que trabalha por horas em repositórios grandes
- Refatoração ampla e engenharia de sistemas
- Trabalho de conhecimento com documentos e imagens
### Quando NÃO utilizar
- Classificação e extração em volume (custo desproporcional)
- Respostas em tempo real com baixa latência
## 🧩 Casos de uso e funcionalidades
- **Casos de uso:** [[raciocinio_complexo_e_matematica|Raciocínio complexo e matemática]], [[agentes_autonomos_de_longa_duracao|Agentes autônomos de longa duração]], [[programacao_em_par|Programação em par]], [[analise_de_documentos_e_imagens|Análise de documentos e imagens]], [[pesquisa_aprofundada|Pesquisa aprofundada]], [[refatoracao_de_codigo|Refatoração de código]]
- **Funcionalidades:** [[raciocinio|Raciocínio]], [[geracao_de_codigo|Geração de código]], [[edicao_de_codebase|Edição de codebase]], [[tool_use_funcionalidade|Tool use]], [[multimodal|Multimodal]], [[contexto_longo|Contexto longo]], [[uso_de_computador|Uso de computador]]
- **Categorias:** [[modelo_fundacional|Modelo fundacional]]
## 🆚 Alternativas
- [[claude_sonnet_5_5|Claude Sonnet 5.5]] - mesma família
- [[gpt_6_2_sol|GPT-6.2 Sol]] - alternativa de outro fornecedor
- [[gemini_4_neon|Gemini 4 Neon]] - alternativa de outro fornecedor
## 🔗 Relacionamentos
- **Empresa:** [[anthropic|Anthropic]]
- **Ferramentas:** [[claude|Claude AI]], [[claude_code|Claude-Code]], [[kiro_ide|Kiro-IDE]], [[cursor|Cursor]], [[github_copilot|GitHub Copilot]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Modelos de IA
