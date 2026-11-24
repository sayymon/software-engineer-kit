---
id: mistral_large_4
tipo: modelo
nome: Mistral Large 4
aliases: []
familia: Mistral
empresa: "[[mistral_ai|Mistral AI]]"
lancamento: 2026-10-06
status: ativo
idModeloApi: mistral-large-4
contextoTokens: 1000000
saidaMaxTokens: não verificado
modalidadesEntrada:
  - texto
  - imagem
modalidadesSaida:
  - texto
precoEntradaUSD: não verificado
precoSaidaUSD: não verificado
precoCacheUSD: não verificado
licenca: Mistral Ecosystem Open-Weight License
disponibilidade:
  - api
  - pesos-abertos
ferramentas:
  - "[[mistral|Mistral]]"
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
  - "[[saida_estruturada|Saída estruturada]]"
  - "[[contexto_longo|Contexto longo]]"
casosDeUso:
  - "[[raciocinio_complexo_e_matematica|Raciocínio complexo e matemática]]"
  - "[[programacao_em_par|Programação em par]]"
  - "[[chat_e_assistente_geral|Chat e assistente geral]]"
  - "[[analise_de_documentos_e_imagens|Análise de documentos e imagens]]"
benchmarks: []
dataVerificacao: 2026-11-20
fontePreco: https://docs.mistral.ai/inference/pricing
tags:
  - modelo
  - ia
  - llm
---
# Mistral Large 4
## 📋 Informações Básicas
- **Família:** Mistral
- **Empresa:** [[mistral_ai|Mistral AI]]
- **Lançamento:** 2026-10-06
- **Status:** ativo
- **ID na API:** mistral-large-4
- **Disponibilidade:** api, pesos-abertos
## 📝 Descrição
Flagship da Mistral (MoE de 1T parâmetros, 49B ativos) com raciocínio sempre ativo e 1M de contexto. Prévia na API em 2026-10-06 e pesos publicados em 2026-10-29. Dados vêm de imprensa e do anúncio oficial.

A página oficial de preços retornou HTTP 403 neste ambiente e veículos independentes divergem (de US$ 0,70 a US$ 1,36 de entrada), por isso o preço permanece não verificado.
## ⚙️ Especificações
- **Janela de contexto:** 1.000.000 tokens
- **Saída máxima:** não verificado tokens
- **Modalidades de entrada:** texto, imagem
- **Modalidades de saída:** texto
- **Licença:** Mistral Ecosystem Open-Weight License
## 💰 Preço (USD por 1M tokens)
- **Entrada:** não verificado
- **Saída:** não verificado
- **Cache:** não verificado
- **Fonte:** https://docs.mistral.ai/inference/pricing (verificado em 2026-11-20)
- **Observação:** Página oficial inacessível nesta rede (HTTP 403, filtro corporativo) em 2026-11-20. Fontes de apoio divergem (preço de lançamento versus preço de lista), então a confirmação fica para a página oficial.
## ⏰ Quando Utilizar
- Alternativa europeia aos modelos americanos de topo
- Hospedagem própria com pesos abertos sob a licença da Mistral
### Quando NÃO utilizar
- Quem precisa de Apache 2.0 irrestrito (a licença é própria da Mistral)
## 🧩 Casos de uso e funcionalidades
- **Casos de uso:** [[raciocinio_complexo_e_matematica|Raciocínio complexo e matemática]], [[programacao_em_par|Programação em par]], [[chat_e_assistente_geral|Chat e assistente geral]], [[analise_de_documentos_e_imagens|Análise de documentos e imagens]]
- **Funcionalidades:** [[geracao_de_texto|Geração de texto]], [[raciocinio|Raciocínio]], [[geracao_de_codigo|Geração de código]], [[edicao_de_codebase|Edição de codebase]], [[tool_use_funcionalidade|Tool use]], [[multimodal|Multimodal]], [[saida_estruturada|Saída estruturada]], [[contexto_longo|Contexto longo]]
- **Categorias:** [[modelo_fundacional|Modelo fundacional]]
## 🆚 Alternativas
- [[claude_opus_5_5|Claude Opus 5.5]] - alternativa de outro fornecedor
- [[deepseek_v4_pro|DeepSeek V4 Pro]] - alternativa de outro fornecedor
- [[qwen4_max|Qwen4-Max]] - alternativa de outro fornecedor
## 🔗 Relacionamentos
- **Empresa:** [[mistral_ai|Mistral AI]]
- **Ferramentas:** [[mistral|Mistral]], [[hugging_face|Hugging Face]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Modelos de IA
