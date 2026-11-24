---
id: deepseek_v4_1_flash
tipo: modelo
nome: DeepSeek V4.1 Flash
aliases: []
familia: DeepSeek
empresa: "[[deepseek_ai|DeepSeek AI]]"
lancamento: 2026-09-10
status: ativo
idModeloApi: deepseek-flash
contextoTokens: 1000000
saidaMaxTokens: 384000
modalidadesEntrada:
  - texto
  - imagem
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
  - "[[ollama|Ollama]]"
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
  - "[[multimodal|Multimodal]]"
casosDeUso:
  - "[[classificacao_e_extracao_em_alto_volume|Classificação e extração em alto volume]]"
  - "[[resumo_de_documentos|Resumo de documentos]]"
  - "[[analise_de_sentimento|Análise de sentimento]]"
  - "[[traducao_de_textos|Tradução de textos]]"
  - "[[chat_e_assistente_geral|Chat e assistente geral]]"
  - "[[programacao_em_par|Programação em par]]"
benchmarks: []
dataVerificacao: 2026-11-20
fontePreco: https://api-docs.deepseek.com/quick_start/pricing
tags:
  - modelo
  - ia
  - llm
---
# DeepSeek V4.1 Flash
## 📋 Informações Básicas
- **Família:** DeepSeek
- **Empresa:** [[deepseek_ai|DeepSeek AI]]
- **Lançamento:** 2026-09-10
- **Status:** ativo
- **ID na API:** deepseek-flash
- **Disponibilidade:** api, pesos-abertos
## 📝 Descrição
Versão Flash da V4.1 (backbone MoE de 552B), com contexto de 1M, visão nativa e preço de API entre os mais baixos. O ID da API é deepseek-flash. A data vem de relatos independentes.

A página oficial respondeu HTTP 403 neste ambiente. Veículos independentes citam US$ 0,15 de entrada e US$ 0,60 de saída fora do pico, valores não confirmados em fonte oficial.
## ⚙️ Especificações
- **Janela de contexto:** 1.000.000 tokens
- **Saída máxima:** 384.000 tokens
- **Modalidades de entrada:** texto, imagem
- **Modalidades de saída:** texto
- **Licença:** MIT
## 💰 Preço (USD por 1M tokens)
- **Entrada:** não verificado
- **Saída:** não verificado
- **Cache:** não verificado
- **Fonte:** https://api-docs.deepseek.com/quick_start/pricing (verificado em 2026-11-20)
- **Observação:** Página oficial inacessível nesta rede (HTTP 403, filtro corporativo) em 2026-11-20. Há valores em fontes de apoio, que ficam fora da nota até a confirmação na página oficial (preço varia entre pico e fora do pico).
## ⏰ Quando Utilizar
- Alto volume e agentes baratos
- Uso local com pesos MIT
### Quando NÃO utilizar
- Quando for preciso o teto de capacidade (use V4 Pro)
## 🧩 Casos de uso e funcionalidades
- **Casos de uso:** [[classificacao_e_extracao_em_alto_volume|Classificação e extração em alto volume]], [[resumo_de_documentos|Resumo de documentos]], [[analise_de_sentimento|Análise de sentimento]], [[traducao_de_textos|Tradução de textos]], [[chat_e_assistente_geral|Chat e assistente geral]], [[programacao_em_par|Programação em par]]
- **Funcionalidades:** [[geracao_de_texto|Geração de texto]], [[raciocinio|Raciocínio]], [[geracao_de_codigo|Geração de código]], [[execucao_local|Execução local]], [[fine_tuning|Fine-tuning]], [[quantizacao_de_modelos|Quantização de modelos]], [[tool_use_funcionalidade|Tool use]], [[contexto_longo|Contexto longo]], [[multimodal|Multimodal]]
- **Categorias:** [[modelo_fundacional|Modelo fundacional]], [[inferencia_local|Inferência local]]
## 🆚 Alternativas
- [[qwen3_8_flash|Qwen3.8-Flash]] - alternativa de outro fornecedor
- [[claude_haiku_5_5|Claude Haiku 5.5]] - alternativa de outro fornecedor
- [[gpt_6_luna|GPT-6 Luna]] - alternativa de outro fornecedor
## 🔗 Relacionamentos
- **Empresa:** [[deepseek_ai|DeepSeek AI]]
- **Ferramentas:** [[deepseek|DeepSeek]], [[ollama|Ollama]], [[hugging_face|Hugging Face]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Modelos de IA
