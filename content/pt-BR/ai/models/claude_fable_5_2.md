---
id: claude_fable_5_2
tipo: modelo
nome: Claude Fable 5.2
aliases: []
familia: Claude
empresa: "[[anthropic|Anthropic]]"
lancamento: 2026-11-09
status: ativo
idModeloApi: claude-fable-5-2
contextoTokens: 1000000
saidaMaxTokens: 128000
modalidadesEntrada:
  - texto
  - imagem
modalidadesSaida:
  - texto
precoEntradaUSD: 8
precoSaidaUSD: 40
precoCacheUSD: 0.2
licenca: Proprietária
disponibilidade:
  - api
  - assinatura
ferramentas:
  - "[[claude|Claude AI]]"
  - "[[claude_code|Claude-Code]]"
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
benchmarks: []
dataVerificacao: 2026-11-20
fontePreco: https://platform.claude.com/docs/en/about-claude/pricing
tags:
  - modelo
  - ia
  - llm
---
# Claude Fable 5.2
## 📋 Informações Básicas
- **Família:** Claude
- **Empresa:** [[anthropic|Anthropic]]
- **Lançamento:** 2026-11-09
- **Status:** ativo
- **ID na API:** claude-fable-5-2
- **Disponibilidade:** api, assinatura
## 📝 Descrição
Modelo de maior capacidade da Anthropic disponível ao público, voltado a raciocínio exigente e trabalho agêntico de longa duração (sessões de horas, pesquisa em várias etapas, análise até um documento, planilha ou apresentação pronta).

Disponível na Claude API, Amazon Bedrock, Google Cloud e Microsoft Foundry. Desde o Claude 4.7 o tokenizador gera cerca de 30% mais tokens para o mesmo texto, o que afeta o custo real.
## ⚙️ Especificações
- **Janela de contexto:** 1.000.000 tokens
- **Saída máxima:** 128.000 tokens
- **Modalidades de entrada:** texto, imagem
- **Modalidades de saída:** texto
- **Licença:** Proprietária
## 💰 Preço (USD por 1M tokens)
- **Entrada:** US$ 8,00
- **Saída:** US$ 40,00
- **Cache:** US$ 0,20
- **Fonte:** https://platform.claude.com/docs/en/about-claude/pricing (verificado em 2026-11-20)
## ⏰ Quando Utilizar
- Sessões de agente que rodam por horas com muitas etapas
- Pesquisa profunda e análise levada até o entregável final
- Problemas em que a qualidade pesa mais que o custo
### Quando NÃO utilizar
- Tarefas simples e de alto volume (use Haiku 5.5)
- Fluxos sensíveis a latência (Sonnet 5.5 responde mais rápido)
## 🧩 Casos de uso e funcionalidades
- **Casos de uso:** [[raciocinio_complexo_e_matematica|Raciocínio complexo e matemática]], [[agentes_autonomos_de_longa_duracao|Agentes autônomos de longa duração]], [[programacao_em_par|Programação em par]], [[analise_de_documentos_e_imagens|Análise de documentos e imagens]], [[pesquisa_aprofundada|Pesquisa aprofundada]]
- **Funcionalidades:** [[raciocinio|Raciocínio]], [[geracao_de_codigo|Geração de código]], [[edicao_de_codebase|Edição de codebase]], [[tool_use_funcionalidade|Tool use]], [[multimodal|Multimodal]], [[contexto_longo|Contexto longo]], [[uso_de_computador|Uso de computador]]
- **Categorias:** [[modelo_fundacional|Modelo fundacional]]
## 🆚 Alternativas
- [[claude_opus_5_5|Claude Opus 5.5]] - mesma família
- [[claude_sonnet_5_5|Claude Sonnet 5.5]] - mesma família
- [[gpt_6_2_astra|GPT-6.2 Astra]] - alternativa de outro fornecedor
- [[gemini_4_carbon|Gemini 4 Carbon]] - alternativa de outro fornecedor
## 🔗 Relacionamentos
- **Empresa:** [[anthropic|Anthropic]]
- **Ferramentas:** [[claude|Claude AI]], [[claude_code|Claude-Code]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Modelos de IA
