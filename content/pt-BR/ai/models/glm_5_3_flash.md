---
id: glm_5_3_flash
tipo: modelo
nome: GLM-5.3-Flash
aliases: []
familia: GLM
empresa: "[[zhipu_ai_z_ai|Zhipu AI (Z.ai)]]"
lancamento: 2026-08-26
status: ativo
idModeloApi: glm-5.3-flash
contextoTokens: 1000000
saidaMaxTokens: não verificado
modalidadesEntrada:
  - texto
  - imagem
modalidadesSaida:
  - texto
precoEntradaUSD: 0.15
precoSaidaUSD: 0.5
precoCacheUSD: 0.03
licenca: não verificado
disponibilidade:
  - api
  - pesos-abertos
ferramentas:
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
  - "[[multimodal|Multimodal]]"
  - "[[contexto_longo|Contexto longo]]"
  - "[[tool_use_funcionalidade|Tool use]]"
casosDeUso:
  - "[[classificacao_e_extracao_em_alto_volume|Classificação e extração em alto volume]]"
  - "[[resumo_de_documentos|Resumo de documentos]]"
  - "[[analise_de_sentimento|Análise de sentimento]]"
  - "[[traducao_de_textos|Tradução de textos]]"
  - "[[chat_e_assistente_geral|Chat e assistente geral]]"
  - "[[inferencia_privada_local|Inferência privada local]]"
benchmarks: []
dataVerificacao: 2026-11-20
fontePreco: https://docs.z.ai/guides/overview/pricing
tags:
  - modelo
  - ia
  - llm
---
# GLM-5.3-Flash
## 📋 Informações Básicas
- **Família:** GLM
- **Empresa:** [[zhipu_ai_z_ai|Zhipu AI (Z.ai)]]
- **Lançamento:** 2026-08-26
- **Status:** ativo
- **ID na API:** glm-5.3-flash
- **Disponibilidade:** api, pesos-abertos
## 📝 Descrição
Modelo Flash de 320B parâmetros (18B ativos), de pesos abertos e atenção esparsa e linear, com 1M de contexto e entrada multimodal.

Licença exata não confirmada (a documentação o descreve como open source). Saída máxima não publicada na página consultada.
## ⚙️ Especificações
- **Janela de contexto:** 1.000.000 tokens
- **Saída máxima:** não verificado tokens
- **Modalidades de entrada:** texto, imagem
- **Modalidades de saída:** texto
- **Licença:** não verificado
## 💰 Preço (USD por 1M tokens)
- **Entrada:** US$ 0,15
- **Saída:** US$ 0,50
- **Cache:** US$ 0,03
- **Fonte:** https://docs.z.ai/guides/overview/pricing (verificado em 2026-11-20)
## ⏰ Quando Utilizar
- Alto volume barato e agentes leves
- Hospedagem própria de um modelo aberto de fronteira
### Quando NÃO utilizar
- Raciocínio no teto (use GLM-5.3)
## 🧩 Casos de uso e funcionalidades
- **Casos de uso:** [[classificacao_e_extracao_em_alto_volume|Classificação e extração em alto volume]], [[resumo_de_documentos|Resumo de documentos]], [[analise_de_sentimento|Análise de sentimento]], [[traducao_de_textos|Tradução de textos]], [[chat_e_assistente_geral|Chat e assistente geral]], [[inferencia_privada_local|Inferência privada local]]
- **Funcionalidades:** [[geracao_de_texto|Geração de texto]], [[raciocinio|Raciocínio]], [[geracao_de_codigo|Geração de código]], [[execucao_local|Execução local]], [[fine_tuning|Fine-tuning]], [[quantizacao_de_modelos|Quantização de modelos]], [[multimodal|Multimodal]], [[contexto_longo|Contexto longo]], [[tool_use_funcionalidade|Tool use]]
- **Categorias:** [[modelo_fundacional|Modelo fundacional]], [[inferencia_local|Inferência local]]
## 🆚 Alternativas
- [[qwen3_8_flash|Qwen3.8-Flash]] - alternativa de outro fornecedor
- [[deepseek_v4_1_flash|DeepSeek V4.1 Flash]] - alternativa de outro fornecedor
- [[claude_haiku_5_5|Claude Haiku 5.5]] - alternativa de outro fornecedor
## 🔗 Relacionamentos
- **Empresa:** [[zhipu_ai_z_ai|Zhipu AI (Z.ai)]]
- **Ferramentas:** [[hugging_face|Hugging Face]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Modelos de IA
