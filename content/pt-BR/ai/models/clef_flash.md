---
id: clef_flash
tipo: modelo
nome: Clef-flash
aliases: []
familia: Clef
empresa: "[[cloudflare|Cloudflare]]"
lancamento: 2026-10-01
status: ativo
idModeloApi: "@cf/cloudflare/clef-flash"
contextoTokens: 64000
saidaMaxTokens: não verificado
modalidadesEntrada:
  - texto
  - imagem
modalidadesSaida:
  - decisão tipada
precoEntradaUSD: 0.038
precoSaidaUSD: 0
precoCacheUSD: não verificado
licenca: Apache-2.0
disponibilidade:
  - api
  - pesos-abertos
ferramentas:
  - "[[cloudflare_workers_ai|Cloudflare Workers AI]]"
  - "[[hugging_face|Hugging Face]]"
categorias:
  - "[[modelo_decisao|Modelo de decisão]]"
  - "[[inferencia_local|Inferência local]]"
funcionalidades:
  - "[[decisao_tipada_com_confianca|Decisão tipada com confiança]]"
  - "[[saida_estruturada|Saída estruturada]]"
  - "[[human_in_the_loop_funcionalidade|Human in the loop]]"
  - "[[execucao_local|Execução local]]"
  - "[[fine_tuning|Fine-tuning]]"
casosDeUso:
  - "[[classificacao_e_extracao_em_alto_volume|Classificação e extração em alto volume]]"
  - "[[construcao_de_agentes|Construção de agentes]]"
  - "[[automacao_de_processos|Automação de processos]]"
  - "[[inferencia_privada_local|Inferência privada local]]"
benchmarks:
  - "[[when2call|When2Call]]"
  - "[[bfcl|BFCL]]"
  - "[[banking77|BANKING77]]"
  - "[[clinc150|CLINC150]]"
  - "[[api_bank|API-Bank]]"
dataVerificacao: 2026-11-21
fontePreco: https://developers.cloudflare.com/changelog/post/2026-10-09-clef-omni-workers-ai/
tags:
  - modelo
  - ia
  - classificacao
---
# Clef-flash
## 📋 Informações Básicas
- **Família:** Clef
- **Empresa:** [[cloudflare|Cloudflare]]
- **Lançamento:** 2026-10-01
- **Status:** ativo
- **ID na API:** @cf/cloudflare/clef-flash
- **Disponibilidade:** api, pesos-abertos
## 📝 Descrição
Modelo de decisão de pesos abertos da Cloudflare (9B), compatível com a API do Jev e licenciado em Apache 2.0 no Hugging Face. Hospedado no Workers AI e ajustável com a plataforma de fine-tuning por reforço da Cloudflare. O mais barato hospedado da categoria (US$ 0,038 por 1M tokens de entrada desde 2026-10-09) e líder em BFCL e API-Bank na tabela da Cloudflare. Latência: cerca de 39 ms de mediana (fonte de apoio).
## ⚙ Especificações
- **Janela de contexto:** 64k tokens (valor do anúncio da família Clef)
- **Saída máxima:** não se aplica (a saída é a decisão tipada)
- **Modalidades de entrada:** texto, imagem
- **Modalidades de saída:** decisão tipada (escolha, nota, probabilidade)
- **Licença:** Apache-2.0
## 💰 Preço (USD por 1M tokens)
- **Entrada:** US$ 0,038
- **Saída:** US$ 0 (sem cobrança de saída)
- **Cache:** não verificado
- **Fonte:** https://developers.cloudflare.com/changelog/post/2026-10-09-clef-omni-workers-ai/ (verificado em 2026-11-21)

## ⏰ Quando Utilizar
- Custo mínimo por decisão em alto volume
- Escolha de ferramentas e chamadas de API em agentes
- Necessidade de trocar de fornecedor sem reescrever código (API compatível com o Jev)
### Quando NÃO utilizar
- Geração de texto: use um [[modelo_fundacional|Modelo fundacional]]
- Calibração máxima autodeclarada: avalie [[gemini_decision_1|Gemini Decision 1]]
## 🧩 Casos de uso e funcionalidades
- **Casos de uso:** [[classificacao_e_extracao_em_alto_volume|Classificação e extração em alto volume]], [[construcao_de_agentes|Construção de agentes]], [[automacao_de_processos|Automação de processos]], [[inferencia_privada_local|Inferência privada local]]
- **Funcionalidades:** [[decisao_tipada_com_confianca|Decisão tipada com confiança]], [[saida_estruturada|Saída estruturada]], [[human_in_the_loop_funcionalidade|Human in the loop]], [[execucao_local|Execução local]], [[fine_tuning|Fine-tuning]]
- **Categorias:** [[modelo_decisao|Modelo de decisão]], [[inferencia_local|Inferência local]]
## 🆚 Alternativas
- [[clef|Clef]] - mais preciso
- [[jev|Jev]] - preço semelhante, modelo fechado
## 🔗 Relacionamentos
- **Empresa:** [[cloudflare|Cloudflare]]
- **Ferramentas:** [[cloudflare_workers_ai|Cloudflare Workers AI]], [[hugging_face|Hugging Face]]
- **Comparação:** [[modelo_decisao|Modelo de decisão]] (tabela comparativa)
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Modelos de IA
## 📎 Fontes
- Família Clef e licença: https://blog.cloudflare.com/clef-decision-models/
- Clef-omni e preço do Clef-flash: https://developers.cloudflare.com/changelog/post/2026-10-09-clef-omni-workers-ai/
