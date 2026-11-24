---
id: gpt_oss_120b
tipo: modelo
nome: gpt-oss-120b
aliases: []
familia: gpt-oss
empresa: "[[openai|OpenAI]]"
lancamento: 2025-08-05
status: ativo
idModeloApi: gpt-oss-120b
contextoTokens: 131072
saidaMaxTokens: 131072
modalidadesEntrada:
  - texto
modalidadesSaida:
  - texto
precoEntradaUSD: não verificado
precoSaidaUSD: não verificado
precoCacheUSD: não verificado
licenca: Apache-2.0
disponibilidade:
  - pesos-abertos
ferramentas:
  - "[[ollama|Ollama]]"
  - "[[lm_studio|LM Studio]]"
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
casosDeUso:
  - "[[inferencia_privada_local|Inferência privada local]]"
  - "[[programacao_em_par|Programação em par]]"
  - "[[chat_e_assistente_geral|Chat e assistente geral]]"
  - "[[aprendizado_de_ml|Aprendizado de ML]]"
  - "[[refatoracao_de_codigo|Refatoração de código]]"
benchmarks: []
dataVerificacao: 2026-11-20
fontePreco: https://developers.openai.com/api/docs/pricing
tags:
  - modelo
  - ia
  - llm
---
# gpt-oss-120b
## 📋 Informações Básicas
- **Família:** gpt-oss
- **Empresa:** [[openai|OpenAI]]
- **Lançamento:** 2025-08-05
- **Status:** ativo
- **ID na API:** gpt-oss-120b
- **Disponibilidade:** pesos-abertos
## 📝 Descrição
Modelo de pesos abertos mais poderoso da OpenAI, que cabe em uma GPU H100. Serve para rodar localmente ou em infraestrutura própria.

O custo depende do provedor ou do hardware; a página oficial de preços da OpenAI não lista tarifa para este modelo. Licença Apache-2.0 conforme anúncio público da OpenAI.
## ⚙️ Especificações
- **Janela de contexto:** 131.072 tokens
- **Saída máxima:** 131.072 tokens
- **Modalidades de entrada:** texto
- **Modalidades de saída:** texto
- **Licença:** Apache-2.0
## 💰 Preço (USD por 1M tokens)
- **Entrada:** não verificado
- **Saída:** não verificado
- **Cache:** não verificado
- **Fonte:** https://developers.openai.com/api/docs/pricing (verificado em 2026-11-20)
- **Observação:** Pesos abertos: sem tarifa oficial por token na página consultada.
## ⏰ Quando Utilizar
- Inferência privada em máquina própria
- Fine-tuning e experimentos sem dependência de API
### Quando NÃO utilizar
- Quem precisa do teto de capacidade (use modelos proprietários)
## 🧩 Casos de uso e funcionalidades
- **Casos de uso:** [[inferencia_privada_local|Inferência privada local]], [[programacao_em_par|Programação em par]], [[chat_e_assistente_geral|Chat e assistente geral]], [[aprendizado_de_ml|Aprendizado de ML]], [[refatoracao_de_codigo|Refatoração de código]]
- **Funcionalidades:** [[geracao_de_texto|Geração de texto]], [[raciocinio|Raciocínio]], [[geracao_de_codigo|Geração de código]], [[execucao_local|Execução local]], [[fine_tuning|Fine-tuning]], [[quantizacao_de_modelos|Quantização de modelos]], [[tool_use_funcionalidade|Tool use]]
- **Categorias:** [[modelo_fundacional|Modelo fundacional]], [[inferencia_local|Inferência local]]
## 🆚 Alternativas
- [[gemma_4|Gemma 4]] - alternativa de outro fornecedor
- [[llama_4_maverick|Llama 4 Maverick]] - alternativa de outro fornecedor
- [[qwen3_8_27b|Qwen3.8-27B]] - alternativa de outro fornecedor
## 🔗 Relacionamentos
- **Empresa:** [[openai|OpenAI]]
- **Ferramentas:** [[ollama|Ollama]], [[lm_studio|LM Studio]], [[hugging_face|Hugging Face]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Modelos de IA
