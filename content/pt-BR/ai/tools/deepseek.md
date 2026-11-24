---
id: deepseek
tipo: ferramenta
nome: DeepSeek
tipos:
  - SERVICO
  - PLATAFORMA
  - BIBLIOTECA
empresa: "[[deepseek_ai|DeepSeek AI]]"
aliases:
  - DeepSeek R1
  - DeepSeek V3
  - DeepSeek V4
categorias:
  - "[[modelo_fundacional|Modelo fundacional]]"
  - "[[assistente_chat|Assistente de chat]]"
  - "[[apps_ia_celular|Apps de IA no celular]]"
funcionalidades:
  - "[[geracao_de_texto|Geração de texto]]"
  - "[[raciocinio|Raciocínio]]"
  - "[[geracao_de_codigo|Geração de código]]"
  - "[[tool_use_funcionalidade|Tool use]]"
  - "[[execucao_local|Execução local]]"
  - "[[fine_tuning|Fine-tuning]]"
casosDeUso:
  - "[[chat_e_assistente_geral|Chat e assistente geral]]"
  - "[[programacao_em_par|Programação em par]]"
  - "[[refatoracao_de_codigo|Refatoração de código]]"
  - "[[geracao_de_conteudo|Geração de conteúdo]]"
  - "[[inferencia_privada_local|Inferência privada local]]"
  - "[[construcao_de_agentes|Construção de agentes]]"
modelos:
  - "[[deepseek_r1|DeepSeek R1]]"
  - "[[deepseek_v4_pro|DeepSeek V4 Pro]]"
  - "[[deepseek_v4_1_flash|DeepSeek V4.1 Flash]]"
modeloContratacao:
  - free
  - api-pay-per-token
  - open-source
precoUSD: 0
plataformas:
  - web
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
  - preco de API com modelo peak/off-peak, dobra no horario de pico
  - empresa chinesa, avaliar politica de dados e residencia
  - sem modo offline no chat
  - pesos abertos (MIT) nas versoes V3/R1 e V4 conforme fonte
dataVerificacao: 2026-11-20
fontePreco: https://api-docs.deepseek.com/quick_start/pricing
precoMedio: 0
tags:
  - ferramenta
  - ia
  - deepseek
  - llm
  - open-source
  - raciocinio
---
# DeepSeek

## 📋 Informações Básicas
- **Tipos:** Serviço, Plataforma, Biblioteca (modelos abertos e chat)
- **Empresa/Fabricante:** [[deepseek_ai|DeepSeek AI]] (empresa chinesa)
- **Website:** https://www.deepseek.com
- **Categorias:** Modelo fundacional / LLM, Assistente de chat
- **Modelo de contratação:** free (chat web), api-pay-per-token, open-source (pesos abertos)
- **Preço (USD):** Chat web gratuito; API pay-per-token a partir de cerca de $0,14/1M de entrada; pesos abertos sem custo de licença
- **Data de verificação:** 2026-11-20
- **Fonte do preço:** https://api-docs.deepseek.com/quick_start/pricing

## 📝 Descrição
DeepSeek é uma empresa chinesa conhecida por modelos de pesos abertos fortes em raciocínio e por preços de API muito baixos. O DeepSeek-R1 popularizou o raciocínio especializado a custo reduzido, e as gerações seguintes (V3, V4) mantêm o posicionamento de melhor custo-benefício do mercado. Oferece chat web gratuito, API pay-per-token e pesos abertos para self-host.

## 🎯 Para Que Serve
Entregar raciocínio e código fortes ao menor custo por token, com opção de rodar aberto e privado: chat, programação, refatoração, geração de conteúdo e agentes, mantendo a conta de custo baixa.

### Casos de Uso
1. Chat e assistente geral (chat.deepseek.com, gratuito)
2. Programação em par e refatoração de código
3. Raciocínio em tarefas difíceis a custo baixo (R1)
4. Geração de conteúdo em alto volume
5. Inferência privada e local com pesos abertos
6. Construção de agentes econômicos

## ⏰ Quando Utilizar
- Quando o custo por token é o fator decisivo e você quer raciocínio forte.
- Quando quer um modelo aberto (MIT) para self-host e fine-tuning.
- Quando o volume é alto e o orçamento é apertado.
- Quando aproveita o modelo off-peak para baratear ainda mais a API.

### Quando NÃO utilizar
- Quando a política de dados restringe fornecedores de fora do seu país: avalie a residência de dados.
- Quando precisa de multimodal nativo (imagem/áudio): compare com [[gemini|Gemini]] ou [[chatgpt|ChatGPT]].
- Quando precisa de SLA e suporte comercial de primeira linha.

## 🧩 Categorias e Funcionalidades
- **Categorias:** [[modelo_fundacional|Modelo fundacional]], [[assistente_chat|Assistente de chat]]
- **Funcionalidades:** [[geracao_de_texto|Geração de texto]], [[raciocinio|Raciocínio]], [[geracao_de_codigo|Geração de código]], [[tool_use_funcionalidade|Tool use]], [[execucao_local|Execução local]], [[fine_tuning|Fine-tuning]]
- **Casos de uso mapeados:** [[chat_e_assistente_geral|Chat e assistente geral]], [[programacao_em_par|Programação em par]], [[refatoracao_de_codigo|Refatoração de código]], [[geracao_de_conteudo|Geração de conteúdo]], [[inferencia_privada_local|Inferência privada local]], [[construcao_de_agentes|Construção de agentes]]
- **Modelos:** [[deepseek_r1|DeepSeek R1]], [[deepseek_v4_pro|DeepSeek V4 Pro]], [[deepseek_v4_1_flash|DeepSeek V4.1 Flash]]
Notas atômicas e legendas em [[hub_ai_tools|Mapa de Ferramentas de IA]].

## 🤖 Modelos e API

Lineup de 2026. A DeepSeek introduziu preço peak/off-peak: as taxas dobram no horário de pico. Os números abaixo são off-peak salvo indicação.

Modelos desta ferramenta, uma nota atômica por modelo (especificações, preço e papel de cada um ficam na nota do modelo):
- [[deepseek_r1|DeepSeek R1]]
- [[deepseek_v4_pro|DeepSeek V4 Pro]]
- [[deepseek_v4_1_flash|DeepSeek V4.1 Flash]]

Famílias e variantes citadas sem nota atômica própria:
- DeepSeek V4 Flash: Alto volume, baixo custo
- DeepSeek V3: Base aberta estabelecida

> Verificação (2026-11-20): preços variam entre fontes por causa do esquema peak/off-peak e de mudanças frequentes de lineup (V3.2, R1, V4). Os valores acima vêm de agregadores de novembro de 2026 e estão em parte **não verificados**: confirme em https://api-docs.deepseek.com/quick_start/pricing. A licença dos pesos V4 é citada como MIT por fonte secundária.

## 🖥️ Compatibilidade e Plataformas
- **Plataformas:** web, API, Python, self-hosted, cloud
- **Integra com:** [[hugging_face|Hugging Face]] (pesos abertos), [[ollama|Ollama]] e [[lm_studio|LM Studio]] (rodar local), [[langchain|LangChain]] e [[langgraph|LangGraph]] (provider), [[promptfoo|Promptfoo]] (evals)
- **Requisitos:** conta e chave de API; GPU para self-host

## 🔒 Restrições e Especificações
- **Context window / limites:** grande (varia por modelo); confira na doc oficial.
- **Residência de dados / privacidade:** empresa chinesa; avalie a política de dados antes de enviar informações sensíveis.
- **Offline:** sim para os pesos abertos quando self-hosted; não no chat web.
- **ToS / licença:** pesos abertos sob MIT (V3/R1 e, conforme fonte, V4); API sujeita aos termos da DeepSeek.
- **Outras restrições:** preço da API dobra no horário de pico.

## 🆚 Alternativas
- [[qwen|Qwen]] - família aberta chinesa sob Apache 2.0
- [[llama|Llama]] - pesos abertos da Meta
- [[mistral|Mistral]] - abertos europeus com bom custo
- [[claude|Claude AI]], [[chatgpt|ChatGPT]], [[gemini|Gemini]] - proprietários gerenciados de topo

### Vantagens sobre alternativas
- Melhor custo por token do mercado
- Raciocínio forte (R1) a preço baixo
- Pesos abertos para self-host e fine-tuning

### Desvantagens
- Política de dados exige atenção (fornecedor chinês)
- Preço variável por horário (peak/off-peak)
- Sem multimodal nativo robusto

## 💰 Custo e Contratação

### Planos (USD)
- **Free:** chat web em chat.deepseek.com
- **API (pay-per-token):** V4 Flash cerca de $0,14/$0,28 off-peak; V4 Pro e R1 mais caros; dobra no pico
- **Open source:** $0 de licença nos pesos MIT; custo de inferência conforme hardware
- **Fonte:** https://api-docs.deepseek.com/quick_start/pricing (verificado em 2026-11-20; valores exatos em parte não verificados)

## 📚 Documentação
- Site e chat: https://www.deepseek.com
- API docs: https://api-docs.deepseek.com
- Pesos abertos: [[hugging_face|Hugging Face]]

## 📊 Experiência de Uso

### Prós
- Custo imbatível por token
- Raciocínio forte com R1
- Pesos abertos e self-hostable

### Contras
- Atenção à residência de dados
- Preço variável por horário

### Curva de Aprendizado
- **Nível:** Baixa para o chat; Média para API e self-host
- **Tempo para proficiência:** Horas para uso geral; dias para self-host

## 🔗 Relacionamentos
- **Contexto:** Ferramentas
- **Empresa:** [[deepseek_ai|DeepSeek AI]]
- **Conceito base:** [[hub_ai|Inteligência Artificial]]
- **Alternativas:** [[qwen|Qwen]], [[llama|Llama]], [[mistral|Mistral]], [[claude|Claude AI]], [[chatgpt|ChatGPT]], [[gemini|Gemini]]
- **Integra com:** [[hugging_face|Hugging Face]], [[ollama|Ollama]], [[lm_studio|LM Studio]], [[langchain|LangChain]], [[langgraph|LangGraph]], [[promptfoo|Promptfoo]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]

## 📝 Notas
- Para raciocínio barato, R1 é a escolha clássica; para volume geral, V4 Flash off-peak reduz muito a conta.
- Avalie a política de dados antes de enviar informações sensíveis a um fornecedor fora do seu país.
