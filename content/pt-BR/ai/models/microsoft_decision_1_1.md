---
id: microsoft_decision_1_1
tipo: modelo
nome: Microsoft-Decision-1.1
aliases:
  - Microsoft-Decision-1
  - Decision-1
familia: Microsoft Decision
empresa: "[[microsoft|Microsoft]]"
lancamento: 2026-11-17
status: ativo
idModeloApi: microsoft-decision-1.1
contextoTokens: não verificado
saidaMaxTokens: não verificado
modalidadesEntrada:
  - texto
  - imagem
modalidadesSaida:
  - decisão tipada
precoEntradaUSD: não verificado
precoSaidaUSD: 0
precoCacheUSD: não verificado
licenca: proprietária
disponibilidade:
  - api
ferramentas:
  - "[[microsoft_foundry|Microsoft Foundry]]"
categorias:
  - "[[modelo_decisao|Modelo de decisão]]"
funcionalidades:
  - "[[decisao_tipada_com_confianca|Decisão tipada com confiança]]"
  - "[[saida_estruturada|Saída estruturada]]"
  - "[[human_in_the_loop_funcionalidade|Human in the loop]]"
  - "[[multimodal|Multimodal]]"
  - "[[avaliacao_de_qualidade|Avaliação de qualidade]]"
casosDeUso:
  - "[[classificacao_e_extracao_em_alto_volume|Classificação e extração em alto volume]]"
  - "[[construcao_de_agentes|Construção de agentes]]"
  - "[[automacao_de_processos|Automação de processos]]"
  - "[[avaliacao_de_prompts|Avaliação de prompts]]"
  - "[[modelos_de_decisao_e_fine_tuning|Modelos de decisão e fine-tuning]]"
benchmarks: []
dataVerificacao: 2026-11-21
fontePreco: https://commandline.microsoft.com/microsoft-decision-model-ga/
tags:
  - modelo
  - ia
  - classificacao
---
# Microsoft-Decision-1.1
## 📋 Informações Básicas
- **Família:** Microsoft Decision
- **Empresa:** [[microsoft|Microsoft]]
- **Lançamento:** Decision-1 em preview em 2026-10-09; Decision-1.1 GA em 2026-11-17
- **Status:** ativo
- **ID na API:** microsoft-decision-1.1
- **Disponibilidade:** api
## 📝 Descrição
Modelo de decisão da Microsoft, disponível no Microsoft Foundry, no OpenRouter e na Vercel. A versão 1.1 tem base Gemma 4 26B A4B (mixture of experts), roda num motor de inferência próprio, aceita imagens e, segundo a Microsoft, é mais de duas vezes mais rápida que a versão 1. Escolhe entre ações permitidas e devolve confiança calibrada para o software adiar quando a incerteza é alta. Também funciona como juiz em avaliações do Foundry (preview).
## ⚙ Especificações
- **Janela de contexto:** não verificado para a 1.1 (a versão 1 tinha 32.768 tokens, só texto)
- **Saída máxima:** não se aplica (a saída é a decisão tipada)
- **Modalidades de entrada:** texto, imagem
- **Modalidades de saída:** decisão tipada (escolha, nota, probabilidade)
- **Licença:** proprietária
## 💰 Preço (USD por 1M tokens)
- **Entrada:** não verificado
- **Saída:** US$ 0 (sem cobrança de saída)
- **Cache:** não verificado
- **Fonte:** https://commandline.microsoft.com/microsoft-decision-model-ga/ (verificado em 2026-11-21)
- **Observação:** a versão 1 foi lançada a US$ 0,042 por 1M tokens de entrada com saída gratuita (fontes de apoio). O anúncio oficial da 1.1 não traz o valor; confirme na página do Foundry antes de orçar.
## ⏰ Quando Utilizar
- Você já está no Azure e quer decisões com governança corporativa
- Juiz barato em avaliações: a Microsoft mediu 0,59 s e US$ 0,12 por 1.000 chamadas contra US$ 0,70 a 34,39 de juízes de chat
- Roteamento, priorização e verificação em produção enterprise (GA)
### Quando NÃO utilizar
- Entrada com áudio, vídeo ou PDF: use [[gemini_decision_1|Gemini Decision 1]] ou [[clef_omni|Clef-omni]]
- Necessidade de rodar local: use [[clef|Clef]] ou [[laya|Laya]]
## 🧩 Casos de uso e funcionalidades
- **Casos de uso:** [[classificacao_e_extracao_em_alto_volume|Classificação e extração em alto volume]], [[construcao_de_agentes|Construção de agentes]], [[automacao_de_processos|Automação de processos]], [[avaliacao_de_prompts|Avaliação de prompts]]
- **Funcionalidades:** [[decisao_tipada_com_confianca|Decisão tipada com confiança]], [[saida_estruturada|Saída estruturada]], [[human_in_the_loop_funcionalidade|Human in the loop]], [[multimodal|Multimodal]], [[avaliacao_de_qualidade|Avaliação de qualidade]]
- **Categorias:** [[modelo_decisao|Modelo de decisão]]
## 🆚 Alternativas
- [[jev|Jev]] - mesmo formato de API e preço semelhante
- [[clef_flash|Clef-flash]] - mais barato e com pesos abertos
- [[gemini_decision_1|Gemini Decision 1]] - mais multimodal
## 🔗 Relacionamentos
- **Empresa:** [[microsoft|Microsoft]]
- **Ferramentas:** [[microsoft_foundry|Microsoft Foundry]]
- **Comparação:** [[modelo_decisao|Modelo de decisão]] (tabela comparativa)
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Modelos de IA
## 📎 Fontes
- Anúncio oficial da 1.1: https://commandline.microsoft.com/microsoft-decision-model-ga/
- Juiz em avaliações: https://learn.microsoft.com/en-us/azure/foundry/observability/how-to/decision-model-judge
