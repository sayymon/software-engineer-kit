---
id: modelo_decisao
tipo: categoria
nome: Modelo de decisão
aliases:
  - modelo-decisao
  - System One Model
descricao: Modelos discriminativos que avaliam um estado contra perguntas tipadas e devolvem escolhas, notas ou probabilidades, sem gerar texto.
slug: modelo-decisao
grupo: IA aplicada (modelos, RAG, evals)
maisBarata:
  - "[[laya|Laya]]"
  - "[[clef_flash|Clef-flash]]"
  - "[[jev|Jev]]"
custoBeneficio:
  - "[[clef|Clef]]"
  - "[[clef_omni|Clef-omni]]"
  - "[[microsoft_decision_1_1|Microsoft-Decision-1.1]]"
qualidadeMaxima:
  - "[[gemini_decision_1|Gemini Decision 1]]"
  - "[[gpt_6_luna|GPT-6 Luna]]"
essenciais:
  - "[[laya|Laya]]"
excecao: Há 8 modelos de decisão catalogados, então a faixa qualidade máxima lista 2 até surgir um terceiro de ponta.
guia: []
tags:
  - categoria
  - ia
---
# Modelo de decisão
## 📝 Descrição
Modelos discriminativos que avaliam um estado contra perguntas tipadas e devolvem escolhas, notas ou probabilidades, sem gerar texto. A saída é consumida direto pelo código, que decide agir, escalar para revisão humana ou chamar um modelo gerador.
## 🧰 Como aparece nas ferramentas
- APIs que recebem estado (texto, JSON, imagem) e perguntas tipadas e devolvem valores com confiança calibrada
- Usados como etapa barata e rápida de triagem, roteamento, moderação e verificação antes de um LLM
- Complementam os modelos de [[modelo_fundacional|Modelo fundacional]]: o LLM gera, o modelo de decisão julga
## 📊 Comparação dos modelos de decisão
Preços em USD por 1M tokens de entrada; nenhum cobra saída. Verificado em 2026-11-21.

| Modelo | Empresa | Preço | Contexto | Entrada | Pesos abertos | Destaque |
|---|---|---|---|---|---|---|
| [[jev|Jev]] 1.14 | [[typesafe_ai|TypeSafe AI]] | 0,042 | 64k (262k opcional) | texto, imagem | não | pioneiro; lidera When2Call (escolha de ferramenta) |
| [[gpt_6_luna|GPT-6 Luna]] | [[openai|OpenAI]] | 0,10 | 1,05M | texto, imagem, JSON | não | maior contexto, cache de prompt, até 400 perguntas |
| [[gemini_decision_1|Gemini Decision 1]] | [[google|Google]] | 0,10 | 262k | texto, imagem, áudio, vídeo, PDF | não | melhor calibração autodeclarada, até 1.000 perguntas |
| [[microsoft_decision_1_1|Microsoft-Decision-1.1]] | [[microsoft|Microsoft]] | não verificado | não verificado | texto, imagem | não | GA no Foundry, juiz de avaliações |
| [[clef_flash|Clef-flash]] | [[cloudflare|Cloudflare]] | 0,038 | 64k | texto, imagem | sim (Apache 2.0) | mais barato hospedado; lidera BFCL e API-Bank |
| [[clef|Clef]] | [[cloudflare|Cloudflare]] | não verificado | 64k | texto, imagem, vídeo | sim (Apache 2.0) | mais preciso em intenção (BANKING77, CLINC150) |
| [[clef_omni|Clef-omni]] | [[cloudflare|Cloudflare]] | não verificado | 64k | texto, imagem, áudio, vídeo | sim (Apache 2.0) | multimodal aberto |
| [[laya|Laya]] | [[laya_comunidade|Laya (comunidade)]] | 0 (self-hosted) | 512 a 1.024 | texto | sim (Apache 2.0) | roda local em CPU; qualidade baixa em agentes |

### Benchmarks
Os números dos modelos de decisão vivem nas notas de benchmark: [[jevbench|JevBench]], [[when2call|When2Call]], [[bfcl|BFCL]], [[banking77|BANKING77]], [[clinc150|CLINC150]] e [[api_bank|API-Bank]]. Os valores são autodeclarados por fornecedores (Google e Cloudflare), e cada um escolhe os testes que publica. Valide no seu caso.
![[jevbench#🎯 O que avalia|JevBench]]
![[when2call#🎯 O que avalia|When2Call]]
![[bfcl#🎯 O que avalia|BFCL]]
### Como escolher
- **Menor custo em texto:** [[clef_flash|Clef-flash]] ou [[jev|Jev]]
- **Áudio, vídeo, PDF ou limiar de confiança exigente:** [[gemini_decision_1|Gemini Decision 1]]
- **Entradas muito longas ou já no contrato OpenAI:** [[gpt_6_luna|GPT-6 Luna]] via [[openai_decisions_api|OpenAI Decisions API]]
- **Ecossistema Azure:** [[microsoft_decision_1_1|Microsoft-Decision-1.1]]
- **Dados que não saem do ambiente:** [[clef|Clef]] em hospedagem própria (qualidade) ou [[laya|Laya]] (leveza)
- **Lock-in:** Jev, Clef e Laya compartilham o formato choice, score e noul, e Gemini e OpenAI seguem a mesma ideia; um adaptador fino no seu código torna a troca barata.

## 🥇 Faixas
- **Mais barata:** [[laya|Laya]], [[clef_flash|Clef-flash]], [[jev|Jev]]
- **Melhor custo-benefício:** [[clef|Clef]], [[clef_omni|Clef-omni]], [[microsoft_decision_1_1|Microsoft-Decision-1.1]]
- **Qualidade máxima:** [[gemini_decision_1|Gemini Decision 1]], [[gpt_6_luna|GPT-6 Luna]]
## 🔗 Relacionamentos
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
