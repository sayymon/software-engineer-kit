---
id: cloudflare_workers_ai
tipo: ferramenta
nome: Cloudflare Workers AI
tipos:
  - PLATAFORMA
  - SERVICO
empresa: "[[cloudflare|Cloudflare]]"
aliases:
  - Workers AI
categorias:
  - "[[modelo_decisao|Modelo de decisão]]"
  - "[[inferencia_local|Inferência local]]"
funcionalidades:
  - "[[decisao_tipada_com_confianca|Decisão tipada com confiança]]"
  - "[[saida_estruturada|Saída estruturada]]"
  - "[[human_in_the_loop_funcionalidade|Human in the loop]]"
  - "[[fine_tuning|Fine-tuning]]"
  - "[[deploy_gerenciado|Deploy gerenciado]]"
casosDeUso:
  - "[[classificacao_e_extracao_em_alto_volume|Classificação e extração em alto volume]]"
  - "[[construcao_de_agentes|Construção de agentes]]"
  - "[[automacao_de_processos|Automação de processos]]"
  - "[[inferencia_privada_local|Inferência privada local]]"
modelos:
  - "[[clef|Clef]]"
  - "[[clef_flash|Clef-flash]]"
  - "[[clef_omni|Clef-omni]]"
modeloContratacao:
  - free
  - api-pay-per-token
precoUSD: 0
plataformas:
  - api
  - cloud
linguagens:
  - javascript
porte:
  - pessoa-fisica
  - pequena
  - media
  - grande
segmentos:
  - geral
restricoes:
  - 10.000 neurons gratuitos por dia (fonte de apoio)
  - Clef-flash US$ 0,038 por 1M tokens de entrada
  - mídia convertida em tokens de entrada
  - saída sem cobrança
dataVerificacao: 2026-11-21
fontePreco: https://developers.cloudflare.com/changelog/post/2026-10-09-clef-omni-workers-ai/
precoMedio: 0
tags:
  - ferramenta
  - ia
  - classificacao
---
# Cloudflare Workers AI
## 📋 Informações Básicas
- **Tipos:** Plataforma serverless de inferência da Cloudflare
- **Empresa/Fabricante:** [[cloudflare|Cloudflare]]
- **Website:** https://developers.cloudflare.com/workers-ai/
- **Categorias:** Modelo de decisão, Inferência local
- **Modelo de contratação:** cota gratuita diária e pagamento por uso
- **Preço (USD):** Clef-flash US$ 0,038 por 1M tokens de entrada; Clef e Clef-omni não verificados
- **Data de verificação:** 2026-11-21
- **Fonte do preço:** https://developers.cloudflare.com/changelog/post/2026-10-09-clef-omni-workers-ai/
## 📝 Descrição
Inferência serverless na rede da Cloudflare, chamada via `env.AI.run` em Workers ou por API. Hospeda a família [[clef|Clef]] de modelos de decisão de pesos abertos, compatível com a API do Jev, e oferece fine-tuning por reforço com seus dados.
## 🎯 Para Que Serve
Rodar modelos de decisão perto do usuário, com baixa latência e opção de levar os mesmos pesos para hospedagem própria.
### Casos de Uso
1. Classificação de domínios e conteúdo
2. Roteamento e escolha de ferramentas em agentes
3. Inspeção de imagem, áudio e vídeo com Clef-omni
## ⏰ Quando Utilizar
- Menor preço hospedado da categoria
- Querer sair do fornecedor depois sem mudar o modelo (pesos abertos)
- Já usar Workers
### Quando NÃO utilizar
- Calibração máxima autodeclarada: [[gemini_decisions_api|Gemini Decisions API]]
- Equipe sem familiaridade com Workers e sem necessidade de edge
## 🧩 Categorias e Funcionalidades
- **Categorias:** [[modelo_decisao|Modelo de decisão]], [[inferencia_local|Inferência local]]
- **Funcionalidades:** [[decisao_tipada_com_confianca|Decisão tipada com confiança]], [[saida_estruturada|Saída estruturada]], [[human_in_the_loop_funcionalidade|Human in the loop]], [[fine_tuning|Fine-tuning]], [[deploy_gerenciado|Deploy gerenciado]]
- **Casos de uso mapeados:** [[classificacao_e_extracao_em_alto_volume|Classificação e extração em alto volume]], [[construcao_de_agentes|Construção de agentes]], [[automacao_de_processos|Automação de processos]], [[inferencia_privada_local|Inferência privada local]]
- **Modelos:** [[clef|Clef]], [[clef_flash|Clef-flash]], [[clef_omni|Clef-omni]]
Notas atômicas e legendas em [[hub_ai_tools|Mapa de Ferramentas de IA]].
## 🖥 Compatibilidade e Plataformas
- **Plataformas:** api, javascript, cloud
- **Integra com:** Cloudflare Workers, Browser Run, [[hugging_face|Hugging Face]] (pesos)
- **Requisitos:** conta Cloudflare e token de API em cofre
## 🔒 Restrições e Especificações
- **Limites:** contexto de 64k na família Clef
- **Residência de dados / privacidade:** rede global da Cloudflare; pesos abertos permitem rodar no seu ambiente
- **Offline:** sim, baixando os pesos Apache 2.0
- **Outras:** preço do Clef e do Clef-omni não confirmado em página oficial
## 🆚 Alternativas
- [[jev_api|Jev API]] - pioneira, menor preço em texto
- [[laya_router|Laya Router]] - open source menor, só local
### Vantagens sobre alternativas
- Menor preço hospedado (Clef-flash)
- Pesos abertos Apache 2.0
- API compatível com o Jev
### Desvantagens
- Preços de parte da família só em fontes de apoio
- Lock-in leve no runtime de Workers
## 💰 Custo e Contratação
### Planos (USD)
- **Gratuito:** cota diária de neurons
- **Pay-per-token:** Clef-flash US$ 0,038 por 1M tokens de entrada; saída sem cobrança
- **Fonte:** https://developers.cloudflare.com/changelog/post/2026-10-09-clef-omni-workers-ai/ (verificado em 2026-11-21)
## 🔗 Relacionamentos
- **Contexto:** Ferramentas
- **Empresa:** [[cloudflare|Cloudflare]]
- **Alternativas:** [[jev_api|Jev API]], [[laya_router|Laya Router]]
- **Comparação:** [[modelo_decisao|Modelo de decisão]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
