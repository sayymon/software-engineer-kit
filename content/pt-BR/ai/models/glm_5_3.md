---
id: glm_5_3
tipo: modelo
nome: GLM-5.3
aliases: []
familia: GLM
empresa: "[[zhipu_ai_z_ai|Zhipu AI (Z.ai)]]"
lancamento: 2026-08-18
status: ativo
idModeloApi: glm-5.3
contextoTokens: 1000000
saidaMaxTokens: 128000
modalidadesEntrada:
  - texto
modalidadesSaida:
  - texto
precoEntradaUSD: 1.4
precoSaidaUSD: 4.4
precoCacheUSD: 0.26
licenca: não verificado
disponibilidade:
  - api
  - pesos-abertos
ferramentas:
  - "[[claude_code|Claude-Code]]"
  - "[[hugging_face|Hugging Face]]"
categorias:
  - "[[modelo_fundacional|Modelo fundacional]]"
funcionalidades:
  - "[[geracao_de_texto|Geração de texto]]"
  - "[[raciocinio|Raciocínio]]"
  - "[[geracao_de_codigo|Geração de código]]"
  - "[[edicao_de_codebase|Edição de codebase]]"
  - "[[tool_use_funcionalidade|Tool use]]"
  - "[[multimodal|Multimodal]]"
  - "[[contexto_longo|Contexto longo]]"
casosDeUso:
  - "[[programacao_em_par|Programação em par]]"
  - "[[refatoracao_de_codigo|Refatoração de código]]"
  - "[[agentes_autonomos_de_longa_duracao|Agentes autônomos de longa duração]]"
benchmarks: []
dataVerificacao: 2026-11-20
fontePreco: https://docs.z.ai/guides/overview/pricing
tags:
  - modelo
  - ia
  - llm
---
# GLM-5.3
## 📋 Informações Básicas
- **Família:** GLM
- **Empresa:** [[zhipu_ai_z_ai|Zhipu AI (Z.ai)]]
- **Lançamento:** 2026-08-18
- **Status:** ativo
- **ID na API:** glm-5.3
- **Disponibilidade:** api, pesos-abertos
## 📝 Descrição
Modelo principal da Z.ai para programação, com ganho de 50% sobre o GLM-5.2 no benchmark interno de código e contexto de 1M tokens. Aceita só texto na entrada.

Pode ser usado como modelo dentro do Claude Code conforme a documentação da Z.ai. Cache de armazenamento gratuito por tempo limitado.
## ⚙️ Especificações
- **Janela de contexto:** 1.000.000 tokens
- **Saída máxima:** 128.000 tokens
- **Modalidades de entrada:** texto
- **Modalidades de saída:** texto
- **Licença:** não verificado
## 💰 Preço (USD por 1M tokens)
- **Entrada:** US$ 1,40
- **Saída:** US$ 4,40
- **Cache:** US$ 0,26
- **Fonte:** https://docs.z.ai/guides/overview/pricing (verificado em 2026-11-20)
## ⏰ Quando Utilizar
- Agente de código com custo muito menor que os modelos americanos de topo
- Uso dentro do Claude Code, Cline e OpenCode via API compatível
### Quando NÃO utilizar
- Entrada de imagem (o modelo é só texto; use GLM-5.3-Flash)
## 🧩 Casos de uso e funcionalidades
- **Casos de uso:** [[programacao_em_par|Programação em par]], [[refatoracao_de_codigo|Refatoração de código]], [[agentes_autonomos_de_longa_duracao|Agentes autônomos de longa duração]]
- **Funcionalidades:** [[geracao_de_texto|Geração de texto]], [[raciocinio|Raciocínio]], [[geracao_de_codigo|Geração de código]], [[edicao_de_codebase|Edição de codebase]], [[tool_use_funcionalidade|Tool use]], [[multimodal|Multimodal]], [[contexto_longo|Contexto longo]]
- **Categorias:** [[modelo_fundacional|Modelo fundacional]]
## 🆚 Alternativas
- [[claude_sonnet_5_5|Claude Sonnet 5.5]] - alternativa de outro fornecedor
- [[qwen4_max|Qwen4-Max]] - alternativa de outro fornecedor
- [[kimi_k3|Kimi K3]] - alternativa de outro fornecedor
## 🔗 Relacionamentos
- **Empresa:** [[zhipu_ai_z_ai|Zhipu AI (Z.ai)]]
- **Ferramentas:** [[claude_code|Claude-Code]], [[hugging_face|Hugging Face]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Modelos de IA
