---
id: github_copilot
tipo: ferramenta
nome: GitHub Copilot
tipos:
  - SOFTWARE
  - SERVICO
empresa: "[[github_inc|GitHub Inc]]"
aliases:
  - Copilot
categorias:
  - "[[agente_codigo|Agente de código]]"
  - "[[ide_ia|IDE com IA]]"
  - "[[revisao_codigo_pr|Revisão de código e PR]]"
funcionalidades:
  - "[[autocomplete_de_codigo|Autocomplete de código]]"
  - "[[geracao_de_codigo|Geração de código]]"
  - "[[edicao_de_codebase|Edição de codebase]]"
  - "[[geracao_de_texto|Geração de texto]]"
  - "[[tool_use_funcionalidade|Tool use]]"
  - "[[mcp|MCP]]"
casosDeUso:
  - "[[programacao_em_par|Programação em par]]"
  - "[[refatoracao_de_codigo|Refatoração de código]]"
  - "[[revisao_de_codigo|Revisão de código]]"
  - "[[automacao_de_desenvolvimento|Automação de desenvolvimento]]"
  - "[[testes_de_software_e_qa|Testes de software e QA]]"
  - "[[depuracao_e_correcao_de_bugs|Depuração e correção de bugs]]"
  - "[[migracao_e_modernizacao_de_codigo|Migração e modernização de código]]"
  - "[[pipelines_de_ci_e_cd|Pipelines de CI e CD]]"
  - "[[resposta_a_incidentes|Resposta a incidentes]]"
  - "[[agente_que_usa_o_computador|Agente que usa o computador]]"
modelos:
  - "[[claude_opus_5_5|Claude Opus 5.5]]"
  - "[[claude_sonnet_5_5|Claude Sonnet 5.5]]"
  - "[[gpt_6_2_sol|GPT-6.2 Sol]]"
modeloContratacao:
  - free
  - subscription
  - per-seat
  - enterprise
precoUSD: 10
plataformas:
  - vscode
  - jetbrains
  - cli
  - web
  - macos
  - windows
  - linux
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
  - AI Credits medidos para agent, chat e code review desde jun/2026
  - requer conta GitHub
  - modelos premium consomem mais credits
  - sem modo offline
dataVerificacao: 2026-11-20
fontePreco: https://github.com/features/copilot/plans
precoMedio: 10
tags:
  - ferramenta
  - ia
  - agente-codigo
  - autocomplete
---
# GitHub Copilot

## 📋 Informações Básicas
- **Tipos:** Software, Serviço
- **Empresa/Fabricante:** [[github_inc|GitHub Inc]] (parte da Microsoft)
- **Website:** https://github.com/features/copilot
- **Categorias:** Agente de código, Autocomplete de código
- **Modelo de contratação:** free, subscription, per-seat, enterprise
- **Preço (USD):** Free; Pro $10/mês; Pro+ $39/mês; Max $100/mês; Business $19/usuário/mês; Enterprise $39/usuário/mês
- **Data de verificação:** 2026-11-20
- **Fonte do preço:** https://github.com/features/copilot/plans
- **Versão Atual:** Serviço contínuo (sem versionamento fixo)

## 📝 Descrição
GitHub Copilot é o assistente de código da GitHub integrado a editores e ao próprio GitHub. Começou como autocomplete em linha e evoluiu para agente de código (agent mode), com chat, revisão de código (code review), Copilot CLI e execução de tarefas na nuvem. Funciona dentro do editor que a pessoa já usa, acelerando escrita, explicação e correção de código a partir do contexto do arquivo e do repositório.

Desde junho de 2026 a cobrança combina assinatura com créditos medidos (GitHub AI Credits) para recursos de agente, chat e revisão.

## 🎯 Para Que Serve
Acelerar a escrita de código no editor, com sugestões em linha e um agente que entende o repositório para implementar e revisar mudanças.

### Casos de Uso
1. Autocomplete de código em tempo real durante a digitação
2. Programação em par via chat dentro do editor
3. Revisão de código e sugestão de correções em pull requests
4. Automação de tarefas de desenvolvimento com o agent mode e o Copilot CLI

## ⏰ Quando Utilizar
Use quando o fluxo principal já acontece no VS Code, JetBrains, Visual Studio ou no GitHub, e o ganho vem de sugestões rápidas e contextuais sem sair do editor. É forte para quem já vive no ecossistema GitHub, quer revisão integrada aos pull requests e prefere um plano de entrada barato (Pro $10/mês) ou o tier Free para uso leve.

### Quando NÃO utilizar
- Quando o trabalho pede um agente autônomo de terminal com controle total da codebase: considere [[claude_code|Claude-Code]].
- Quando a preferência é uma IDE dedicada com pool de uso amplo e modelos de ponta integrados: considere [[cursor|Cursor]] ou [[kiro_ide|Kiro-IDE]].
- Quando há restrição de enviar código-fonte a serviços externos sem contrato enterprise.

## 🧩 Categorias e Funcionalidades
- **Categorias:** [[agente_codigo|Agente de código]], [[ide_ia|IDE com IA]]
- **Funcionalidades:** [[autocomplete_de_codigo|Autocomplete de código]], [[geracao_de_codigo|Geração de código]], [[edicao_de_codebase|Edição de codebase]], [[geracao_de_texto|Geração de texto]], [[tool_use_funcionalidade|Tool use]], [[mcp|MCP]]
- **Casos de uso mapeados:** [[programacao_em_par|Programação em par]], [[refatoracao_de_codigo|Refatoração de código]], [[revisao_de_codigo|Revisão de código]], [[automacao_de_desenvolvimento|Automação de desenvolvimento]]
- **Modelos:** [[claude_opus_5_5|Claude Opus 5.5]], [[claude_sonnet_5_5|Claude Sonnet 5.5]], [[gpt_6_2_sol|GPT-6.2 Sol]]
Notas atômicas e legendas em [[hub_ai_tools|Mapa de Ferramentas de IA]].

## 🖥️ Compatibilidade e Plataformas
- **Plataformas:** VS Code, JetBrains, Visual Studio, CLI, web (GitHub.com), macOS, Windows, Linux
- **Integra com:** [[chatgpt|ChatGPT]] (modelos OpenAI GPT), [[claude|Claude]] (modelos Anthropic), [[gemini|Gemini]] (modelos Google) como modelos selecionáveis; servidores MCP no agent mode
- **Requisitos:** conta GitHub e extensão ou cliente compatível

## 🔒 Restrições e Especificações
- **Context window / limites:** varia conforme o modelo selecionado; recursos de agente, chat e revisão consomem GitHub AI Credits medidos desde junho de 2026
- **Residência de dados / privacidade:** código é enviado ao serviço; políticas e controles corporativos ficam nos planos Business e Enterprise
- **Offline:** não
- **ToS / licença:** uso sob os termos do GitHub Copilot
- **Outras restrições:** modelos premium consomem créditos em taxas diferentes; requer conta GitHub

## 🆚 Alternativas
- [[claude_code|Claude-Code]] - agente de código em CLI, uso mais autônomo no terminal
- [[cursor|Cursor]] - IDE dedicada com pool de uso e modelos de ponta integrados
- [[kiro_ide|Kiro-IDE]] - IDE agêntica com spec-driven development e hooks

### Vantagens sobre alternativas
- Integração nativa com o GitHub (pull requests, code review) e com os editores mais usados
- Plano de entrada barato ($10/mês) e tier Free para uso leve

### Desvantagens
- Cobrança por créditos pode surpreender em uso intenso de agente
- Menos autônomo que agentes de terminal dedicados

## 🛠️ Tecnologias Relacionadas
- [[hub_ai|Inteligência Artificial]] - base conceitual
- VS Code - ambiente de uso principal

## 🔗 Integra com
- [[chatgpt|ChatGPT]] - modelos OpenAI GPT como opção de modelo
- [[claude|Claude]] - modelos Anthropic como opção de modelo
- [[gemini|Gemini]] - modelos Google como opção de modelo

## 🚧 Limitações
### Limitações Técnicas
1. Depende de conexão com internet
2. Qualidade das sugestões varia conforme o modelo e o contexto do repositório

### Limitações de Licença
- Uso sob os termos do GitHub Copilot; controles de privacidade avançados nos planos pagos corporativos

## 📚 Documentação
- Documentação oficial: https://docs.github.com/copilot
- Planos e preços: https://github.com/features/copilot/plans

## 💰 Custo e Contratação

### Planos (USD)
- **Gratuito:** Copilot Free, acesso limitado a recursos (inclui CLI e agent mode com limites)
- **Assinatura (individual):** Pro $10/mês; Pro+ $39/mês; Max $100/mês
- **Per-seat (times):** Business $19/usuário/mês; Enterprise $39/usuário/mês
- **Enterprise:** requer GitHub Enterprise Cloud por baixo
- **Créditos:** recursos de agente, chat e revisão consomem GitHub AI Credits medidos desde junho de 2026
- **Fonte:** https://github.com/features/copilot/plans e https://docs.github.com/en/billing/managing-billing-for-github-copilot (verificado em 2026-11-20)

## 📊 Experiência de Uso

### Prós
- Integração fluida com GitHub e editores populares
- Entrada barata e tier gratuito

### Contras
- Custo variável com créditos em uso intenso
- Menos controle que agentes de terminal autônomos

### Curva de Aprendizado
- **Nível:** Baixa
- **Tempo para proficiência:** horas para autocomplete, dias para agent mode e revisão

## 🔗 Relacionamentos
- **Contexto:** Ferramentas
- **Empresa:** [[github_inc|GitHub Inc]], Microsoft
- **Alternativas:** [[claude_code|Claude-Code]], [[cursor|Cursor]], [[kiro_ide|Kiro-IDE]]
- **Integra com:** [[chatgpt|ChatGPT]], [[claude|Claude]], [[gemini|Gemini]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]

## 📝 Notas
- Para uso leve, o tier Free e o Pro ($10/mês) atendem bem; para agent mode e revisão em escala, acompanhe o consumo de créditos.
