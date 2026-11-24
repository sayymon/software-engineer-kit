---
id: clef
tipo: modelo
nome: Clef
aliases: []
familia: Clef
empresa: "[[cloudflare|Cloudflare]]"
lancamento: 2026-10-01
status: ativo
idModeloApi: "@cf/cloudflare/clef"
contextoTokens: 64000
saidaMaxTokens: não verificado
modalidadesEntrada:
  - texto
  - imagem
  - video
modalidadesSaida:
  - decisão tipada
precoEntradaUSD: não verificado
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
  - "[[modelos_de_decisao_e_fine_tuning|Modelos de decisão e fine-tuning]]"
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
# Clef
## 📋 Informações Básicas
- **Família:** Clef
- **Empresa:** [[cloudflare|Cloudflare]]
- **Lançamento:** 2026-10-01
- **Status:** ativo
- **ID na API:** @cf/cloudflare/clef
- **Disponibilidade:** api, pesos-abertos
## 📝 Descrição
Modelo de decisão de pesos abertos da Cloudflare (27B), compatível com a API do Jev e licenciado em Apache 2.0 no Hugging Face. Hospedado no Workers AI e ajustável com a plataforma de fine-tuning por reforço da Cloudflare. O mais preciso da família: lidera BANKING77 (94,2) e CLINC150 (97,4) na tabela da Cloudflare. Latência: cerca de 209 ms de mediana (fonte de apoio).
## ⚙ Especificações
- **Janela de contexto:** 64k tokens (valor do anúncio da família Clef)
- **Saída máxima:** não se aplica (a saída é a decisão tipada)
- **Modalidades de entrada:** texto, imagem, video
- **Modalidades de saída:** decisão tipada (escolha, nota, probabilidade)
- **Licença:** Apache-2.0
## 💰 Preço (USD por 1M tokens)
- **Entrada:** não verificado
- **Saída:** US$ 0 (sem cobrança de saída)
- **Cache:** não verificado
- **Fonte:** https://developers.cloudflare.com/changelog/post/2026-10-09-clef-omni-workers-ai/ (verificado em 2026-11-21)
- **Observação:** fontes de apoio citam US$ 0,24 por 1M tokens para o Clef; o valor não foi confirmado em página oficial. Em hospedagem própria o custo é só a sua infraestrutura.
## ⏰ Quando Utilizar
- Maior precisão em classificação de intenção com pesos abertos
- Classificar imagens e páginas renderizadas (com Browser Run)
- Necessidade de trocar de fornecedor sem reescrever código (API compatível com o Jev)
### Quando NÃO utilizar
- Geração de texto: use um [[modelo_fundacional|Modelo fundacional]]
- Calibração máxima autodeclarada: avalie [[gemini_decision_1|Gemini Decision 1]]
## 🧩 Casos de uso e funcionalidades
- **Casos de uso:** [[classificacao_e_extracao_em_alto_volume|Classificação e extração em alto volume]], [[construcao_de_agentes|Construção de agentes]], [[automacao_de_processos|Automação de processos]], [[inferencia_privada_local|Inferência privada local]]
- **Funcionalidades:** [[decisao_tipada_com_confianca|Decisão tipada com confiança]], [[saida_estruturada|Saída estruturada]], [[human_in_the_loop_funcionalidade|Human in the loop]], [[execucao_local|Execução local]], [[fine_tuning|Fine-tuning]]
- **Categorias:** [[modelo_decisao|Modelo de decisão]], [[inferencia_local|Inferência local]]
## 🆚 Alternativas
- [[clef_flash|Clef-flash]] - mais barato e rápido
- [[jev|Jev]] - melhor em When2Call
## 🔗 Relacionamentos
- **Empresa:** [[cloudflare|Cloudflare]]
- **Ferramentas:** [[cloudflare_workers_ai|Cloudflare Workers AI]], [[hugging_face|Hugging Face]]
- **Comparação:** [[modelo_decisao|Modelo de decisão]] (tabela comparativa)
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Modelos de IA
## 📎 Fontes
- Família Clef e licença: https://blog.cloudflare.com/clef-decision-models/
- Clef-omni e preço do Clef-flash: https://developers.cloudflare.com/changelog/post/2026-10-09-clef-omni-workers-ai/
