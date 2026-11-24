---
id: claude
tipo: ferramenta
nome: Claude
tipos:
  - SERVICO
  - PLATAFORMA
empresa: "[[anthropic|Anthropic]]"
aliases:
  - Claude
  - Claude.ai
categorias:
  - "[[assistente_chat|Assistente de chat]]"
  - "[[modelo_fundacional|Modelo fundacional]]"
  - "[[apps_ia_celular|Apps de IA no celular]]"
  - "[[planilhas_analise_dados|Planilhas e análise de dados]]"
  - "[[escrita_documentos|Escrita e documentos]]"
  - "[[traducao_idiomas|Tradução e idiomas]]"
  - "[[agentes_computador_navegador|Agentes que usam computador e navegador]]"
funcionalidades:
  - "[[geracao_de_texto|Geração de texto]]"
  - "[[raciocinio|Raciocínio]]"
  - "[[geracao_de_codigo|Geração de código]]"
  - "[[edicao_de_codebase|Edição de codebase]]"
  - "[[multimodal|Multimodal]]"
  - "[[tool_use_funcionalidade|Tool use]]"
  - "[[busca_na_web|Busca na web]]"
  - "[[memoria_persistente|Memória persistente]]"
casosDeUso:
  - "[[chat_e_assistente_geral|Chat e assistente geral]]"
  - "[[geracao_de_conteudo|Geração de conteúdo]]"
  - "[[resumo_de_documentos|Resumo de documentos]]"
  - "[[programacao_em_par|Programação em par]]"
  - "[[revisao_de_codigo|Revisão de código]]"
  - "[[refatoracao_de_codigo|Refatoração de código]]"
  - "[[traducao_de_textos|Tradução de textos]]"
  - "[[construcao_de_agentes|Construção de agentes]]"
  - "[[pesquisa_aprofundada|Pesquisa aprofundada]]"
  - "[[revisao_e_correcao_de_texto|Revisão e correção de texto]]"
  - "[[celular_android_e_ios|Celular (Android e iOS)]]"
  - "[[wearables_e_oculos_inteligentes|Wearables e óculos inteligentes]]"
modelos:
  - "[[claude_fable_5_2|Claude Fable 5.2]]"
  - "[[claude_haiku_4_5|Claude Haiku 4.5]]"
  - "[[claude_haiku_5_5|Claude Haiku 5.5]]"
  - "[[claude_mythos_5_2|Claude Mythos 5.2]]"
  - "[[claude_opus_4_8|Claude Opus 4.8]]"
  - "[[claude_opus_5|Claude Opus 5]]"
  - "[[claude_opus_5_5|Claude Opus 5.5]]"
  - "[[claude_sonnet_4_6|Claude Sonnet 4.6]]"
  - "[[claude_sonnet_5|Claude Sonnet 5]]"
  - "[[claude_sonnet_5_5|Claude Sonnet 5.5]]"
modeloContratacao:
  - free
  - subscription
  - api-pay-per-token
  - enterprise
precoUSD: 20
plataformas:
  - web
  - ios
  - android
  - macos
  - windows
  - api
  - cli
linguagens:
  - agnostica
porte:
  - pessoa-fisica
  - pequena
  - media
  - grande
segmentos:
  - geral
restricoes:
  - context window ate 1M tokens nos modelos Claude 5 (200k nos modelos 4.5)
  - sem modo offline
  - nos planos de consumo os dados nao sao usados para treino por padrao salvo opt-in
  - saida maxima de 128k tokens por resposta na API
  - precos de API por token mudam com frequencia
dataVerificacao: 2026-11-20
fontePreco: https://claude.com/pricing
precoMedio: 20
tags:
  - ferramenta
  - ia
  - claude
  - anthropic
  - llm
  - assistente
---
# Claude

## 📋 Informações Básicas
- **Tipos:** Serviço, Plataforma (assistente de chat sobre a família de modelos Claude)
- **Empresa/Fabricante:** [[anthropic|Anthropic]]
- **Website:** https://claude.ai
- **Categorias:** Assistente de chat, Modelo fundacional / LLM
- **Modelo de contratação:** free, subscription, api-pay-per-token, enterprise
- **Preço (USD):** Free $0; Pro $20/mês ($17/mês no anual); Max $100/mês; Ultra $200/mês; Team por assento; Enterprise sob consulta; API pay-per-token
- **Data de verificação:** 2026-11-20
- **Fonte do preço:** https://claude.com/pricing e https://platform.claude.com/docs/en/about-claude/pricing

## 📝 Descrição
Claude é o assistente de chat da [[anthropic|Anthropic]], construído sobre a família de modelos Claude. A Anthropic foi fundada por ex-funcionários da OpenAI, com foco em segurança e em modelos fortes para escrita, raciocínio longo e trabalho agêntico de código. Claude combina geração de texto, raciocínio, código, leitura de imagens (visão), uso de ferramentas (tool use) e busca na web, disponível na web, em apps desktop e mobile, e via API pay-per-token.

A escolha do modelo define custo e qualidade: os modelos de topo entregam raciocínio profundo e trabalho agêntico de longo horizonte a um custo maior, enquanto os modelos rápidos atendem alto volume e baixa latência por uma fração do preço.

## 🎯 Para Que Serve
Resolver tarefas de linguagem de ponta a ponta com ênfase em escrita de qualidade, raciocínio longo e código: conversar, escrever, programar, revisar e refatorar código, resumir documentos extensos, traduzir, analisar imagens e orquestrar ferramentas (tool use) em fluxos agênticos.

### Casos de Uso
1. Chat e assistente geral do dia a dia
2. Geração de conteúdo (textos longos, documentos, e-mails)
3. Resumo e análise de documentos extensos (context de 1M tokens)
4. Programação em par, revisão e refatoração de código
5. Tradução entre idiomas
6. Construção de agentes e automações com uso de ferramentas
7. Pesquisa aprofundada com a função de research

## ⏰ Quando Utilizar
- Quando a qualidade de escrita e o raciocínio longo importam mais que o preço mínimo.
- Quando o trabalho é agêntico e de longo horizonte (coding, tarefas multi-step com ferramentas).
- Quando precisa ler documentos muito grandes em uma só janela (até 1M tokens nos modelos Claude 5).
- Quando quer uma política de privacidade que, por padrão, não usa seus dados de consumo para treino.
- Quando vai trabalhar no editor ou no terminal: veja também [[claude_code|Claude Code]].

### Quando NÃO utilizar
- Quando o requisito é inferência 100% local e privada: prefira [[ollama|Ollama]] com modelos abertos como [[llama|Llama]] ou [[qwen|Qwen]].
- Quando precisa de geração nativa de imagem ou vídeo: Claude não gera imagem; compare com [[gemini|Gemini]] ou [[chatgpt|ChatGPT]].
- Quando o volume é enorme e trivial e o custo por token manda: um modelo rápido ou aberto resolve mais barato (ex.: [[deepseek|DeepSeek]]).
- Quando precisa de embeddings de primeira parte: a Anthropic recomenda provedores externos para embeddings.

## 🧩 Categorias e Funcionalidades
- **Categorias:** [[assistente_chat|Assistente de chat]], [[modelo_fundacional|Modelo fundacional]]
- **Funcionalidades:** [[geracao_de_texto|Geração de texto]], [[raciocinio|Raciocínio]], [[geracao_de_codigo|Geração de código]], [[edicao_de_codebase|Edição de codebase]], [[multimodal|Multimodal]], [[tool_use_funcionalidade|Tool use]], [[busca_na_web|Busca na web]], [[memoria_persistente|Memória persistente]]
- **Casos de uso mapeados:** [[chat_e_assistente_geral|Chat e assistente geral]], [[geracao_de_conteudo|Geração de conteúdo]], [[resumo_de_documentos|Resumo de documentos]], [[programacao_em_par|Programação em par]], [[revisao_de_codigo|Revisão de código]], [[refatoracao_de_codigo|Refatoração de código]], [[traducao_de_textos|Tradução de textos]], [[construcao_de_agentes|Construção de agentes]], [[pesquisa_aprofundada|Pesquisa aprofundada]]
- **Modelos:** [[claude_fable_5_2|Claude Fable 5.2]], [[claude_haiku_4_5|Claude Haiku 4.5]], [[claude_haiku_5_5|Claude Haiku 5.5]], [[claude_mythos_5_2|Claude Mythos 5.2]], [[claude_opus_4_8|Claude Opus 4.8]], [[claude_opus_5|Claude Opus 5]], [[claude_opus_5_5|Claude Opus 5.5]], [[claude_sonnet_4_6|Claude Sonnet 4.6]], [[claude_sonnet_5|Claude Sonnet 5]], [[claude_sonnet_5_5|Claude Sonnet 5.5]]
Notas atômicas e legendas em [[hub_ai_tools|Mapa de Ferramentas de IA]].

## 🤖 Modelos e API

A Anthropic organiza a família Claude em quatro modelos vigentes (lineup de outubro/novembro de 2026), do mais econômico ao de raciocínio máximo. Todos compartilham a mesma janela de contexto de 1M tokens e saída máxima de 128K tokens por resposta na API, com corte de conhecimento de junho de 2026. A escolha equilibra profundidade de raciocínio, latência e custo por token.

Modelos desta ferramenta, uma nota atômica por modelo (especificações, preço e papel de cada um ficam na nota do modelo):
- [[claude_fable_5_2|Claude Fable 5.2]]
- [[claude_haiku_4_5|Claude Haiku 4.5]]
- [[claude_haiku_5_5|Claude Haiku 5.5]]
- [[claude_mythos_5_2|Claude Mythos 5.2]]
- [[claude_opus_4_8|Claude Opus 4.8]]
- [[claude_opus_5|Claude Opus 5]]
- [[claude_opus_5_5|Claude Opus 5.5]]
- [[claude_sonnet_4_6|Claude Sonnet 4.6]]
- [[claude_sonnet_5|Claude Sonnet 5]]
- [[claude_sonnet_5_5|Claude Sonnet 5.5]]

Famílias e variantes citadas sem nota atômica própria:
- Claude Fable 5.x: Raciocínio mais exigente e horizonte agêntico mais longo

Regras práticas de escolha:
- **Raciocínio profundo vs rápido/barato:** reserve Opus 5.5 ou Fable para problemas difíceis onde o erro é caro; use Haiku 5.5 quando volume e latência mandam.
- **Padrão recomendado:** Sonnet 5.5 cobre a maioria dos casos com o melhor equilíbrio custo/qualidade.
- **Coding:** Opus 5.5 rende mais em refatoração e debugging de longo horizonte; no editor ou terminal, veja [[claude_code|Claude Code]] e [[cursor|Cursor]].
- **Context grande:** os modelos Claude 5 leem até 1M tokens sem header beta; os modelos 4.5 anteriores ficam em 200k.

> Verificação (2026-11-20): planos de assinatura e preços por token de Haiku 5.5, Sonnet 5.5 e Opus 5.5 confirmados em https://platform.claude.com/docs/en/about-claude/pricing e corroborados por múltiplas fontes de outubro de 2026. A versão e o preço exatos do modelo de topo (Fable) divergem entre fontes (5.1 a $10/$50 vs 5.2 a $8/$40), portanto estão marcados como **não verificado**: confirme na página oficial antes de decisões de custo.

## 🖥️ Compatibilidade e Plataformas
- **Plataformas:** web, iOS, Android, macOS, Windows, API, CLI (via Claude Code)
- **Integra com:** [[langchain|LangChain]] e [[langgraph|LangGraph]] (provider), [[langfuse|LangFuse]] (observabilidade), [[promptfoo|Promptfoo]] (evals), [[claude_code|Claude Code]] (agente de código no terminal), MCP (Model Context Protocol, padrão criado pela Anthropic)
- **Requisitos:** conta Anthropic; chave de API para uso programático

## 🔒 Restrições e Especificações
- **Context window / limites:** até 1M tokens nos modelos Claude 5 (Fable, Opus, Sonnet, Haiku); 200k nos modelos 4.5 anteriores; saída máxima de 128K tokens por resposta na API.
- **Residência de dados / privacidade:** nos planos de consumo, os dados não são usados para treino por padrão (treino apenas sob opt-in); Enterprise com governança e controles adicionais.
- **Offline:** não.
- **ToS / licença:** uso sujeito aos termos da Anthropic; modelo proprietário (closed source).
- **Outras restrições:** preços de API por token mudam com frequência; sem geração nativa de imagem; sem embeddings de primeira parte.

## 🆚 Alternativas
- [[chatgpt|ChatGPT]] - ecossistema de API mais amplo (imagem, áudio, embeddings), modelos de raciocínio de ponta
- [[gemini|Gemini]] - multimodal nativo, ecossistema Google, planos de consumo mais baratos
- [[grok|Grok]] - integração com X e dados em tempo real
- [[deepseek|DeepSeek]] - raciocínio forte a custo muito baixo
- [[ollama|Ollama]] - alternativa local e privada com modelos abertos

### Vantagens sobre alternativas
- Escrita de alta qualidade e raciocínio longo consistentes
- Forte em trabalho agêntico de código de longo horizonte
- Janela de contexto de 1M tokens sem header beta nos modelos Claude 5
- Privacidade por padrão nos planos de consumo (sem treino salvo opt-in)

### Desvantagens
- Sem geração nativa de imagem, vídeo ou áudio
- Custo dos modelos de topo (Opus, Fable) é alto
- Dependência de serviço externo (sem modo offline)

## 💰 Custo e Contratação

### Planos (USD)
- **Free:** $0, chat do dia a dia com limites de uso
- **Pro:** $20/mês ($17/mês no plano anual), acesso ampliado e aos modelos mais fortes
- **Max:** a partir de $100/mês (cerca de 5x o uso do Pro)
- **Ultra:** $200/mês (maior cota de uso; antigo tier Max 20x)
- **Team:** $25/assento/mês ($20 no anual); assento premium $125/mês ($100 no anual)
- **Enterprise:** a partir de $20/assento/mês mais uso (SSO, governança, data controls)
- **API (pay-per-token):** cobrança por 1M de tokens, separada por input e output; Haiku 5.5 $0,10/$0,50, Sonnet 5.5 $2/$10, Opus 5.5 $4/$20, Fable (topo) cerca de $8 a $10 / $40 a $50 (**não verificado**, confere versão vigente)
- **Fonte:** https://claude.com/pricing e https://platform.claude.com/docs/en/about-claude/pricing (verificado em 2026-11-20)

## 📚 Documentação
- Site e app: https://claude.ai (onboarding: https://claude.ai/onboarding)
- Docs da plataforma e API: https://platform.claude.com/docs
- Preços: https://claude.com/pricing

## 📊 Experiência de Uso

### Prós
- Qualidade de escrita e raciocínio longo de referência
- Context de 1M tokens útil para documentos e bases grandes
- Bom cidadão em fluxos agênticos e MCP

### Contras
- Sem modalidades de imagem/áudio nativas
- Modelos de topo caros para alto volume

### Curva de Aprendizado
- **Nível:** Baixa para chat; Média para API e fluxos agênticos
- **Tempo para proficiência:** Horas para uso geral; dias para integração via API

## 🔗 Relacionamentos
- **Contexto:** Ferramentas
- **Empresa:** [[anthropic|Anthropic]]
- **Conceito base:** [[hub_ai|Inteligência Artificial]]
- **Alternativas:** [[chatgpt|ChatGPT]], [[gemini|Gemini]], [[grok|Grok]], [[deepseek|DeepSeek]], [[ollama|Ollama]]
- **Integra com:** [[claude_code|Claude Code]], [[langchain|LangChain]], [[langgraph|LangGraph]], [[langfuse|LangFuse]], [[promptfoo|Promptfoo]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]

## 📝 Notas
- A conta de custo é dominada pela escolha de modelo: padronize Haiku/Sonnet para volume e reserve Opus/Fable para o que exige raciocínio profundo.
- A Anthropic criou o MCP (Model Context Protocol), hoje adotado por várias ferramentas do mapa; útil para conectar Claude a fontes de dados e ferramentas.
- ⚠️ API Key movida para arquivo local `sensitive-data.md` (não versionado). Nunca inserir a chave em notas versionadas.
