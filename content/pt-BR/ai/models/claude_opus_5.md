---
id: claude_opus_5
tipo: modelo
nome: Claude Opus 5
aliases: []
familia: Claude
empresa: "[[anthropic|Anthropic]]"
lancamento: 2026-07-24
status: legado
idModeloApi: claude-opus-5
contextoTokens: 1000000
saidaMaxTokens: 128000
modalidadesEntrada:
  - texto
  - imagem
modalidadesSaida:
  - texto
precoEntradaUSD: 5
precoSaidaUSD: 25
precoCacheUSD: 0.5
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
  - "[[programacao_em_par|Programação em par]]"
  - "[[agentes_autonomos_de_longa_duracao|Agentes autônomos de longa duração]]"
benchmarks: []
dataVerificacao: 2026-11-20
fontePreco: https://platform.claude.com/docs/en/about-claude/pricing
tags:
  - modelo
  - ia
  - llm
---
# Claude Opus 5
## 📋 Informações Básicas
- **Família:** Claude
- **Empresa:** [[anthropic|Anthropic]]
- **Lançamento:** 2026-07-24
- **Status:** legado
- **ID na API:** claude-opus-5
- **Disponibilidade:** api, assinatura
## 📝 Descrição
Geração anterior da linha Opus, mantida na API para quem ainda não migrou para o Opus 5.5 (que custa menos).

Desde o Claude 4.7 o tokenizador gera cerca de 30% mais tokens para o mesmo texto, o que afeta o custo real.
## ⚙️ Especificações
- **Janela de contexto:** 1.000.000 tokens
- **Saída máxima:** 128.000 tokens
- **Modalidades de entrada:** texto, imagem
- **Modalidades de saída:** texto
- **Licença:** Proprietária
## 💰 Preço (USD por 1M tokens)
- **Entrada:** US$ 5,00
- **Saída:** US$ 25,00
- **Cache:** US$ 0,50
- **Fonte:** https://platform.claude.com/docs/en/about-claude/pricing (verificado em 2026-11-20)
## ⏰ Quando Utilizar
- Aplicações já validadas com este modelo e sem janela de migração
### Quando NÃO utilizar
- Projetos novos: o Opus 5.5 custa menos e é mais recente
## 🧩 Casos de uso e funcionalidades
- **Casos de uso:** [[raciocinio_complexo_e_matematica|Raciocínio complexo e matemática]], [[programacao_em_par|Programação em par]], [[agentes_autonomos_de_longa_duracao|Agentes autônomos de longa duração]]
- **Funcionalidades:** [[raciocinio|Raciocínio]], [[geracao_de_codigo|Geração de código]], [[edicao_de_codebase|Edição de codebase]], [[tool_use_funcionalidade|Tool use]], [[multimodal|Multimodal]], [[contexto_longo|Contexto longo]], [[uso_de_computador|Uso de computador]]
- **Categorias:** [[modelo_fundacional|Modelo fundacional]]
## 🆚 Alternativas
- [[claude_opus_5_5|Claude Opus 5.5]] - mesma família
- [[claude_opus_4_8|Claude Opus 4.8]] - mesma família
## 🔗 Relacionamentos
- **Empresa:** [[anthropic|Anthropic]]
- **Ferramentas:** [[claude|Claude AI]], [[claude_code|Claude-Code]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Modelos de IA
