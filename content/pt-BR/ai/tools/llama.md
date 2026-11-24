---
id: llama
tipo: ferramenta
nome: Llama
tipos:
  - SERVICO
  - BIBLIOTECA
empresa: "[[meta_ai|Meta AI]]"
aliases:
  - LLaMA
  - Meta Llama
  - Llama 4
categorias:
  - "[[modelo_fundacional|Modelo fundacional]]"
funcionalidades:
  - "[[geracao_de_texto|Geração de texto]]"
  - "[[raciocinio|Raciocínio]]"
  - "[[geracao_de_codigo|Geração de código]]"
  - "[[multimodal|Multimodal]]"
  - "[[tool_use_funcionalidade|Tool use]]"
  - "[[execucao_local|Execução local]]"
  - "[[fine_tuning|Fine-tuning]]"
casosDeUso:
  - "[[chat_e_assistente_geral|Chat e assistente geral]]"
  - "[[geracao_de_conteudo|Geração de conteúdo]]"
  - "[[programacao_em_par|Programação em par]]"
  - "[[inferencia_privada_local|Inferência privada local]]"
  - "[[construcao_de_agentes|Construção de agentes]]"
  - "[[resumo_de_documentos|Resumo de documentos]]"
modelos:
  - "[[llama_4_maverick|Llama 4 Maverick]]"
  - "[[llama_4_scout|Llama 4 Scout]]"
  - "[[muse_spark_1_3|Muse Spark 1.3]]"
  - "[[muse_spark_open|Muse Spark Open]]"
modeloContratacao:
  - open-source
  - free
  - api-pay-per-token
precoUSD: 0
plataformas:
  - linux
  - macos
  - windows
  - api
  - self-hosted
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
  - licenca Llama Community (open-weight com restricoes de uso, nao e OSI pura)
  - clausula de usuarios ativos mensais acima de 700M exige licenca separada
  - custo de inferencia depende do seu hardware ou provedor
  - pesos abertos; qualidade de resposta depende da variante e do tamanho
dataVerificacao: 2026-11-20
fontePreco: https://www.llama.com/
precoMedio: 0
tags:
  - ferramenta
  - ia
  - llama
  - meta
  - llm
  - open-source
---
# Llama

## 📋 Informações Básicas
- **Tipos:** Serviço, Biblioteca (família de modelos de pesos abertos)
- **Empresa/Fabricante:** [[meta_ai|Meta AI]]
- **Website:** https://www.llama.com
- **Categorias:** Modelo fundacional / LLM
- **Modelo de contratação:** open-source (open-weight), free, api-pay-per-token (via provedores)
- **Preço (USD):** Pesos abertos sem custo de licença; inferência paga conforme hardware próprio ou provedor de API
- **Data de verificação:** 2026-11-20
- **Fonte do preço:** https://www.llama.com/

## 📝 Descrição
Llama é a família de modelos de pesos abertos da [[meta_ai|Meta AI]]. A geração Llama 4 (lançada em abril de 2025) é nativamente multimodal e usa arquitetura mixture-of-experts, com variantes Scout e Maverick. Por ter pesos abertos, roda localmente (via [[ollama|Ollama]], [[lm_studio|LM Studio]]) ou em provedores de nuvem, com liberdade de fine-tuning e deploy comercial dentro da licença Llama Community.

## 🎯 Para Que Serve
Oferecer um LLM forte e self-hostable para quem quer controle, privacidade e custo previsível: rodar inferência na própria infraestrutura, fazer fine-tuning para domínios específicos e evitar dependência de um único fornecedor.

### Casos de Uso
1. Inferência privada e local (dados não saem da sua infraestrutura)
2. Chat e assistente geral self-hostable
3. Geração de conteúdo e programação em par
4. Fine-tuning para domínios específicos
5. Construção de agentes com modelo aberto

## ⏰ Quando Utilizar
- Quando precisa rodar o modelo localmente ou on-premises por privacidade ou custo.
- Quando quer liberdade para fazer fine-tuning e deploy comercial.
- Quando quer evitar dependência de uma API proprietária.
- Quando o hardware disponível comporta a variante escolhida (Scout roda em GPU modesta).

### Quando NÃO utilizar
- Quando quer o topo absoluto de raciocínio sem gerenciar infra: compare com [[claude|Claude AI]] ou [[chatgpt|ChatGPT]].
- Quando não tem hardware nem provedor para servir o modelo.
- Quando o caso de uso exige SLA gerenciado e suporte comercial de primeira parte.

## 🧩 Categorias e Funcionalidades
- **Categorias:** [[modelo_fundacional|Modelo fundacional]]
- **Funcionalidades:** [[geracao_de_texto|Geração de texto]], [[raciocinio|Raciocínio]], [[geracao_de_codigo|Geração de código]], [[multimodal|Multimodal]], [[tool_use_funcionalidade|Tool use]], [[execucao_local|Execução local]], [[fine_tuning|Fine-tuning]]
- **Casos de uso mapeados:** [[chat_e_assistente_geral|Chat e assistente geral]], [[geracao_de_conteudo|Geração de conteúdo]], [[programacao_em_par|Programação em par]], [[inferencia_privada_local|Inferência privada local]], [[construcao_de_agentes|Construção de agentes]], [[resumo_de_documentos|Resumo de documentos]]
- **Modelos:** [[llama_4_maverick|Llama 4 Maverick]], [[llama_4_scout|Llama 4 Scout]], [[muse_spark_1_3|Muse Spark 1.3]], [[muse_spark_open|Muse Spark Open]]
Notas atômicas e legendas em [[hub_ai_tools|Mapa de Ferramentas de IA]].

## 🤖 Modelos e variantes

Geração Llama 4 (pesos abertos, abril de 2025), arquitetura mixture-of-experts e multimodal:

Modelos desta ferramenta, uma nota atômica por modelo (especificações, preço e papel de cada um ficam na nota do modelo):
- [[llama_4_maverick|Llama 4 Maverick]]
- [[llama_4_scout|Llama 4 Scout]]
- [[muse_spark_1_3|Muse Spark 1.3]]
- [[muse_spark_open|Muse Spark Open]]

Famílias e variantes citadas sem nota atômica própria:
- Llama 4 Behemoth: Tarefas de maior exigência (modelo professor)

> Verificação (2026-11-20): Llama 4 Scout e Maverick (pesos abertos, abril de 2025) e a janela de 10M tokens do Scout confirmados por múltiplas fontes de 2026. Em 2026 a Meta criou o Meta Superintelligence Labs e passou a oferecer modelos fechados via API (Muse Spark, abril de 2026) ao lado de novos abertos (Muse Glimmer, 30B Apache, agosto de 2026). Relatos de um "Llama 5" de 400B com context de 5M tokens aparecem em fonte isolada e estão marcados como **não verificado**.

## 🖥️ Compatibilidade e Plataformas
- **Plataformas:** Linux, macOS, Windows, API (via provedores), Python, self-hosted, cloud
- **Integra com:** [[ollama|Ollama]] e [[lm_studio|LM Studio]] (rodar local), [[hugging_face|Hugging Face]] (download dos pesos), [[langchain|LangChain]] e [[langgraph|LangGraph]] (orquestração), provedores de nuvem (API)
- **Requisitos:** GPU/CPU conforme a variante; conta para baixar os pesos

## 🔒 Restrições e Especificações
- **Context window / limites:** até 10M tokens no Scout; 1M no Maverick (variam por variante e por como você serve o modelo).
- **Residência de dados / privacidade:** total controle quando self-hosted; os dados não saem da sua infraestrutura.
- **Offline:** sim, quando rodado localmente.
- **ToS / licença:** licença Llama Community (open-weight com restrições; não é OSI pura). Uso acima de 700M de usuários ativos mensais exige licença separada da Meta.
- **Outras restrições:** o custo real é o de inferência (hardware ou provedor).

## 🆚 Alternativas
- [[qwen|Qwen]] - família aberta sob Apache 2.0, muitas variantes
- [[mistral|Mistral]] - modelos abertos franceses, bom custo
- [[deepseek|DeepSeek]] - pesos abertos fortes em raciocínio a custo baixo
- [[claude|Claude AI]], [[chatgpt|ChatGPT]], [[gemini|Gemini]] - alternativas proprietárias gerenciadas

### Vantagens sobre alternativas
- Pesos abertos com liberdade de fine-tuning e deploy
- Context window enorme no Scout (até 10M tokens)
- Roda local, com privacidade e custo previsível

### Desvantagens
- Licença não é OSI pura (restrições de uso)
- Exige hardware ou provedor para servir
- Sem suporte comercial de primeira parte da Meta para self-host

## 💰 Custo e Contratação

### Planos (USD)
- **Open source (open-weight):** $0 de licença; baixe e rode os pesos
- **Inferência local:** custo do seu hardware (GPU/CPU e energia)
- **API (pay-per-token):** via provedores de nuvem que servem Llama; preço por token varia por provedor
- **Fonte:** https://www.llama.com/ (verificado em 2026-11-20)

## 📚 Documentação
- Site e modelos: https://www.llama.com
- Pesos e cards: [[hugging_face|Hugging Face]]
- Rodar local: [[ollama|Ollama]], [[lm_studio|LM Studio]]

## 📊 Experiência de Uso

### Prós
- Aberto, self-hostable e com fine-tuning livre
- Context window muito grande no Scout
- Ecossistema amplo de ferramentas de inferência

### Contras
- Licença com restrições (não é OSI)
- Operação depende de você (infra, tuning, serving)

### Curva de Aprendizado
- **Nível:** Média a Alta (serving, quantização, fine-tuning)
- **Tempo para proficiência:** Dias a semanas para operar em produção

## 🔗 Relacionamentos
- **Contexto:** Ferramentas
- **Empresa:** [[meta_ai|Meta AI]]
- **Conceito base:** [[hub_ai|Inteligência Artificial]]
- **Alternativas:** [[qwen|Qwen]], [[mistral|Mistral]], [[deepseek|DeepSeek]], [[claude|Claude AI]], [[chatgpt|ChatGPT]], [[gemini|Gemini]]
- **Integra com:** [[ollama|Ollama]], [[lm_studio|LM Studio]], [[hugging_face|Hugging Face]], [[langchain|LangChain]], [[langgraph|LangGraph]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]

## 📝 Notas
- Para rodar local rápido, combine Llama com [[ollama|Ollama]]; o Scout roda em GPU modesta (a partir de cerca de 12GB de VRAM).
- Em 2026 a Meta adotou estratégia híbrida: abertos (Llama, Muse Glimmer) ao lado de fechados via API (Muse Spark).
