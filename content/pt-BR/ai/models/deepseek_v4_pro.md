---
id: deepseek_v4_pro
tipo: modelo
nome: DeepSeek V4 Pro
aliases: []
familia: DeepSeek
empresa: "[[deepseek_ai|DeepSeek AI]]"
lancamento: 2026-04-24
status: ativo
idModeloApi: deepseek-v4-pro
contextoTokens: 1000000
saidaMaxTokens: 384000
modalidadesEntrada:
  - texto
modalidadesSaida:
  - texto
precoEntradaUSD: não verificado
precoSaidaUSD: não verificado
precoCacheUSD: não verificado
licenca: MIT
disponibilidade:
  - api
  - pesos-abertos
ferramentas:
  - "[[deepseek|DeepSeek]]"
  - "[[hugging_face|Hugging Face]]"
categorias:
  - "[[modelo_fundacional|Modelo fundacional]]"
  - "[[inferencia_local|Inferência local]]"
funcionalidades:
  - "[[geracao_de_texto|Geração de texto]]"
  - "[[raciocinio|Raciocínio]]"
  - "[[geracao_de_codigo|Geração de código]]"
  - "[[execucao_local|Execução local]]"
  - "[[fine_tuning|Fine-tuning]]"
  - "[[quantizacao_de_modelos|Quantização de modelos]]"
  - "[[tool_use_funcionalidade|Tool use]]"
  - "[[contexto_longo|Contexto longo]]"
casosDeUso:
  - "[[raciocinio_complexo_e_matematica|Raciocínio complexo e matemática]]"
  - "[[programacao_em_par|Programação em par]]"
  - "[[agentes_autonomos_de_longa_duracao|Agentes autônomos de longa duração]]"
benchmarks:
  - "[[aider_polyglot|Aider Polyglot]]"
dataVerificacao: 2026-11-20
fontePreco: https://api-docs.deepseek.com/quick_start/pricing
tags:
  - modelo
  - ia
  - llm
---
# DeepSeek V4 Pro
## 📋 Informações Básicas
- **Família:** DeepSeek
- **Empresa:** [[deepseek_ai|DeepSeek AI]]
- **Lançamento:** 2026-04-24
- **Status:** ativo
- **ID na API:** deepseek-v4-pro
- **Disponibilidade:** api, pesos-abertos
## 📝 Descrição
Modelo principal da geração V4 (1,6T parâmetros, 49B ativos), de pesos abertos e contexto de 1M tokens, com modo de raciocínio. A data vem do model card oficial da DeepSeek.

A página oficial de preços respondeu HTTP 403 neste ambiente. Veículos independentes citam US$ 1,32 de entrada e US$ 3,96 de saída em horário de pico (metade fora do pico), mas o valor não foi confirmado em fonte oficial.
## ⚙️ Especificações
- **Janela de contexto:** 1.000.000 tokens
- **Saída máxima:** 384.000 tokens
- **Modalidades de entrada:** texto
- **Modalidades de saída:** texto
- **Licença:** MIT
## 💰 Preço (USD por 1M tokens)
- **Entrada:** não verificado
- **Saída:** não verificado
- **Cache:** não verificado
- **Fonte:** https://api-docs.deepseek.com/quick_start/pricing (verificado em 2026-11-20)
- **Observação:** Página oficial inacessível nesta rede (HTTP 403, filtro corporativo) em 2026-11-20. Há valores em fontes de apoio, que ficam fora da nota até a confirmação na página oficial (preço varia entre pico e fora do pico).
## ⏰ Quando Utilizar
- Raciocínio e código com custo de API baixo
- Quem quer pesos MIT para hospedar
### Quando NÃO utilizar
- Dados sensíveis enviados à API hospedada na China, sem avaliação de privacidade
## 🧩 Casos de uso e funcionalidades
- **Casos de uso:** [[raciocinio_complexo_e_matematica|Raciocínio complexo e matemática]], [[programacao_em_par|Programação em par]], [[agentes_autonomos_de_longa_duracao|Agentes autônomos de longa duração]]
- **Funcionalidades:** [[geracao_de_texto|Geração de texto]], [[raciocinio|Raciocínio]], [[geracao_de_codigo|Geração de código]], [[execucao_local|Execução local]], [[fine_tuning|Fine-tuning]], [[quantizacao_de_modelos|Quantização de modelos]], [[tool_use_funcionalidade|Tool use]], [[contexto_longo|Contexto longo]]
- **Categorias:** [[modelo_fundacional|Modelo fundacional]], [[inferencia_local|Inferência local]]
## 🆚 Alternativas
- [[qwen4_max|Qwen4-Max]] - alternativa de outro fornecedor
- [[kimi_k3|Kimi K3]] - alternativa de outro fornecedor
- [[claude_opus_5_5|Claude Opus 5.5]] - alternativa de outro fornecedor
## 🔗 Relacionamentos
- **Empresa:** [[deepseek_ai|DeepSeek AI]]
- **Ferramentas:** [[deepseek|DeepSeek]], [[hugging_face|Hugging Face]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Modelos de IA
