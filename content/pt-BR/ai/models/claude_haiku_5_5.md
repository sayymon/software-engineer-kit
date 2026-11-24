---
id: claude_haiku_5_5
tipo: modelo
nome: Claude Haiku 5.5
aliases: []
familia: Claude
empresa: "[[anthropic|Anthropic]]"
lancamento: 2026-10-07
status: ativo
idModeloApi: claude-haiku-5-5
contextoTokens: 1000000
saidaMaxTokens: 128000
modalidadesEntrada:
  - texto
  - imagem
modalidadesSaida:
  - texto
precoEntradaUSD: 0.1
precoSaidaUSD: 0.5
precoCacheUSD: 0.01
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
  - "[[geracao_de_texto|Geração de texto]]"
  - "[[tool_use_funcionalidade|Tool use]]"
  - "[[saida_estruturada|Saída estruturada]]"
  - "[[multimodal|Multimodal]]"
  - "[[contexto_longo|Contexto longo]]"
casosDeUso:
  - "[[classificacao_e_extracao_em_alto_volume|Classificação e extração em alto volume]]"
  - "[[resumo_de_documentos|Resumo de documentos]]"
  - "[[analise_de_sentimento|Análise de sentimento]]"
  - "[[traducao_de_textos|Tradução de textos]]"
  - "[[chat_e_assistente_geral|Chat e assistente geral]]"
  - "[[analise_de_documentos_e_imagens|Análise de documentos e imagens]]"
benchmarks: []
dataVerificacao: 2026-11-20
fontePreco: https://platform.claude.com/docs/en/about-claude/pricing
tags:
  - modelo
  - ia
  - llm
---
# Claude Haiku 5.5
## 📋 Informações Básicas
- **Família:** Claude
- **Empresa:** [[anthropic|Anthropic]]
- **Lançamento:** 2026-10-07
- **Status:** ativo
- **ID na API:** claude-haiku-5-5
- **Disponibilidade:** api, assinatura
## 📝 Descrição
Modelo mais rápido da Anthropic, pensado para tarefas de alto volume e sensíveis a latência, como classificação, extração e roteamento.

Preço acima vale para prompts de até 100 mil tokens; acima disso a página oficial lista US$ 0,50 de entrada, US$ 2,50 de saída e US$ 0,05 de cache. Desde o Claude 4.7 o tokenizador gera cerca de 30% mais tokens para o mesmo texto, o que afeta o custo real.
## ⚙️ Especificações
- **Janela de contexto:** 1.000.000 tokens
- **Saída máxima:** 128.000 tokens
- **Modalidades de entrada:** texto, imagem
- **Modalidades de saída:** texto
- **Licença:** Proprietária
## 💰 Preço (USD por 1M tokens)
- **Entrada:** US$ 0,10
- **Saída:** US$ 0,50
- **Cache:** US$ 0,01
- **Fonte:** https://platform.claude.com/docs/en/about-claude/pricing (verificado em 2026-11-20)
- **Observação:** Duas faixas de preço por tamanho do prompt (até 100 mil e acima de 100 mil tokens).
## ⏰ Quando Utilizar
- Classificação, extração e roteamento em escala
- Subagentes baratos dentro de fluxos agênticos
- Respostas rápidas em produtos voltados ao usuário
### Quando NÃO utilizar
- Raciocínio profundo em problemas difíceis
- Programação complexa de várias etapas
## 🧩 Casos de uso e funcionalidades
- **Casos de uso:** [[classificacao_e_extracao_em_alto_volume|Classificação e extração em alto volume]], [[resumo_de_documentos|Resumo de documentos]], [[analise_de_sentimento|Análise de sentimento]], [[traducao_de_textos|Tradução de textos]], [[chat_e_assistente_geral|Chat e assistente geral]], [[analise_de_documentos_e_imagens|Análise de documentos e imagens]]
- **Funcionalidades:** [[geracao_de_texto|Geração de texto]], [[tool_use_funcionalidade|Tool use]], [[saida_estruturada|Saída estruturada]], [[multimodal|Multimodal]], [[contexto_longo|Contexto longo]]
- **Categorias:** [[modelo_fundacional|Modelo fundacional]]
## 🆚 Alternativas
- [[gemini_3_5_flash_lite|Gemini 3.5 Flash-Lite]] - alternativa de outro fornecedor
- [[gpt_6_luna|GPT-6 Luna]] - alternativa de outro fornecedor
- [[qwen3_8_flash|Qwen3.8-Flash]] - alternativa de outro fornecedor
## 🔗 Relacionamentos
- **Empresa:** [[anthropic|Anthropic]]
- **Ferramentas:** [[claude|Claude AI]], [[claude_code|Claude-Code]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Modelos de IA
