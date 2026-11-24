---
id: microsoft_foundry
tipo: ferramenta
nome: Microsoft Foundry
tipos:
  - PLATAFORMA
  - SERVICO
empresa: "[[microsoft|Microsoft]]"
aliases:
  - Azure AI Foundry
categorias:
  - "[[modelo_decisao|Modelo de decisão]]"
  - "[[evals_observabilidade|Evals e observabilidade]]"
funcionalidades:
  - "[[decisao_tipada_com_confianca|Decisão tipada com confiança]]"
  - "[[saida_estruturada|Saída estruturada]]"
  - "[[human_in_the_loop_funcionalidade|Human in the loop]]"
  - "[[avaliacao_de_qualidade|Avaliação de qualidade]]"
  - "[[deploy_gerenciado|Deploy gerenciado]]"
casosDeUso:
  - "[[classificacao_e_extracao_em_alto_volume|Classificação e extração em alto volume]]"
  - "[[construcao_de_agentes|Construção de agentes]]"
  - "[[automacao_de_processos|Automação de processos]]"
  - "[[avaliacao_de_prompts|Avaliação de prompts]]"
  - "[[modelos_de_decisao_e_fine_tuning|Modelos de decisão e fine-tuning]]"
modelos:
  - "[[microsoft_decision_1_1|Microsoft-Decision-1.1]]"
modeloContratacao:
  - api-pay-per-token
  - enterprise
precoUSD: 0
plataformas:
  - api
  - cloud
linguagens:
  - python
porte:
  - pessoa-fisica
  - pequena
  - media
  - grande
segmentos:
  - geral
restricoes:
  - preço da Decision-1.1 não confirmado em página oficial
  - requer assinatura Azure
  - juiz de avaliação em preview, sem SLA
dataVerificacao: 2026-11-21
fontePreco: https://commandline.microsoft.com/microsoft-decision-model-ga/
precoMedio: 0
tags:
  - ferramenta
  - ia
  - classificacao
---
# Microsoft Foundry
## 📋 Informações Básicas
- **Tipos:** Plataforma Azure para modelos, agentes e avaliações
- **Empresa/Fabricante:** [[microsoft|Microsoft]]
- **Website:** https://ai.azure.com
- **Categorias:** Modelo de decisão, Evals e observabilidade
- **Modelo de contratação:** pago por uso via assinatura Azure; enterprise
- **Preço (USD):** por uso; valor do Microsoft-Decision-1.1 não verificado
- **Data de verificação:** 2026-11-21
- **Fonte do preço:** https://commandline.microsoft.com/microsoft-decision-model-ga/
## 📝 Descrição
Plataforma da Microsoft no Azure para hospedar modelos, construir agentes e rodar avaliações. Aqui ela entra como a casa do [[microsoft_decision_1_1|Microsoft-Decision-1.1]], que também pode ser o juiz das avaliações do Foundry.
## 🎯 Para Que Serve
Usar modelos de decisão com governança, faturamento e observabilidade do Azure.
### Casos de Uso
1. Classificação e roteamento em produção enterprise
2. Juiz rápido e barato em avaliações
## ⏰ Quando Utilizar
- A empresa já padroniza no Azure
- Você quer avaliações com um juiz de decisão barato
### Quando NÃO utilizar
- Projeto pessoal pequeno: [[jev_api|Jev API]] ou [[laya_router|Laya Router]] são mais simples
- Fora do ecossistema Azure: o mesmo modelo está no OpenRouter e na Vercel
## 🧩 Categorias e Funcionalidades
- **Categorias:** [[modelo_decisao|Modelo de decisão]], [[evals_observabilidade|Evals e observabilidade]]
- **Funcionalidades:** [[decisao_tipada_com_confianca|Decisão tipada com confiança]], [[saida_estruturada|Saída estruturada]], [[human_in_the_loop_funcionalidade|Human in the loop]], [[avaliacao_de_qualidade|Avaliação de qualidade]], [[deploy_gerenciado|Deploy gerenciado]]
- **Casos de uso mapeados:** [[classificacao_e_extracao_em_alto_volume|Classificação e extração em alto volume]], [[construcao_de_agentes|Construção de agentes]], [[automacao_de_processos|Automação de processos]], [[avaliacao_de_prompts|Avaliação de prompts]]
- **Modelos:** [[microsoft_decision_1_1|Microsoft-Decision-1.1]]
Notas atômicas e legendas em [[hub_ai_tools|Mapa de Ferramentas de IA]].
## 🖥 Compatibilidade e Plataformas
- **Plataformas:** api, python, cloud
- **Integra com:** Azure, OpenRouter, Vercel
- **Requisitos:** assinatura Azure e recurso Foundry
## 🔒 Restrições e Especificações
- **Limites:** conforme o deployment no Azure
- **Residência de dados / privacidade:** regiões Azure
- **Offline:** não
- **Outras:** juiz de avaliação em preview, sem SLA
## 🆚 Alternativas
- [[jev_api|Jev API]] - pioneira, menor preço em texto
- [[cloudflare_workers_ai|Cloudflare Workers AI]] - Clef com pesos abertos
### Vantagens sobre alternativas
- Governança enterprise do Azure
- Juiz de avaliação integrado
### Desvantagens
- Preço da 1.1 não publicado no anúncio
- Mais burocracia de setup
## 💰 Custo e Contratação
### Planos (USD)
- **Pay-per-use:** conforme o modelo no Azure (Decision-1 lançado a US$ 0,042 por 1M de entrada, fonte de apoio)
- **Enterprise:** contratos Azure
- **Fonte:** https://commandline.microsoft.com/microsoft-decision-model-ga/ (verificado em 2026-11-21)
## 🔗 Relacionamentos
- **Contexto:** Ferramentas
- **Empresa:** [[microsoft|Microsoft]]
- **Alternativas:** [[jev_api|Jev API]], [[cloudflare_workers_ai|Cloudflare Workers AI]]
- **Comparação:** [[modelo_decisao|Modelo de decisão]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
