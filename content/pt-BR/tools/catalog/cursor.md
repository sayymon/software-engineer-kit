---
id: cursor
tipo: ferramenta
nome: Cursor
tipos:
  - SOFTWARE
empresa: "[[anysphere|Anysphere]]"
aliases:
  - Cursor
categorias:
  - "[[ide_ia|IDE com IA]]"
  - "[[agente_codigo|Agente de código]]"
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
precoUSD: 8
plataformas:
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
  - uso de IA medido por pool mensal
  - modelos de terceiros cobrados por uso separadamente
  - plano Plus inclui apenas modelos Grok
  - sem modo offline
dataVerificacao: 2026-11-20
fontePreco: https://cursor.com/en/pricing
precoMedio: 8
tags:
  - ferramenta
  - ia
  - ide-ia
  - agente-codigo
---
# Cursor

## 📋 Informações Básicas
- **Tipos:** Software
- **Empresa/Fabricante:** [[anysphere|Anysphere]]
- **Website:** https://cursor.com
- **Categorias:** IDE com IA, Agente de código
- **Modelo de contratação:** free, subscription, per-seat, enterprise
- **Preço (USD):** Free; Plus $8/mês; Premium $30/mês; Super $100/mês; Ultra $200/mês; Teams a partir de $30/usuário/mês; Enterprise sob consulta
- **Data de verificação:** 2026-11-20
- **Fonte do preço:** https://cursor.com/en/pricing
- **Versão Atual:** aplicativo desktop com atualização contínua

## 📝 Descrição
Cursor é uma IDE com IA baseada no VS Code, desenvolvida pela Anysphere. Combina autocomplete (Tab), chat no editor, edição de codebase por agente e revisão de código, lendo o contexto do projeto para implementar mudanças em vários arquivos. Desde a integração com a X Subscription (outubro de 2026), os planos pagos passam a trazer modelos Grok nativos e perks da X, enquanto modelos de terceiros (Claude, GPT) ficam disponíveis ao preço de lista de API, cobrados por uso separadamente.

## 🎯 Para Que Serve
Oferecer uma IDE dedicada com IA de ponta integrada, acelerando escrita, refatoração e revisão de código com contexto de todo o repositório.

### Casos de Uso
1. Programação em par com chat e edição de codebase pelo agente
2. Autocomplete inteligente (Tab) durante a escrita
3. Refatoração de trechos e arquivos com contexto amplo do projeto
4. Revisão de código e correções assistidas

## ⏰ Quando Utilizar
Use quando a preferência é uma IDE completa e dedicada, com agente de código forte e pool de uso de modelos de ponta. Vale quando o fluxo gira em torno do editor e o ganho vem de ter chat, Tab e agente no mesmo ambiente, com acesso a vários modelos.

Dica de contexto: no prompt principal, adicione o `tasks.md` para melhorar o contexto do agente.

### Quando NÃO utilizar
- Quando o fluxo já vive no GitHub e basta sugestão em linha: considere [[github_copilot|GitHub Copilot]].
- Quando a preferência é um agente autônomo de terminal: considere [[claude_code|Claude-Code]].
- Quando a metodologia desejada é spec-driven com hooks: considere [[kiro_ide|Kiro-IDE]].

## 🧩 Categorias e Funcionalidades
- **Categorias:** [[ide_ia|IDE com IA]], [[agente_codigo|Agente de código]]
- **Funcionalidades:** [[autocomplete_de_codigo|Autocomplete de código]], [[geracao_de_codigo|Geração de código]], [[edicao_de_codebase|Edição de codebase]], [[geracao_de_texto|Geração de texto]], [[tool_use_funcionalidade|Tool use]], [[mcp|MCP]]
- **Casos de uso mapeados:** [[programacao_em_par|Programação em par]], [[refatoracao_de_codigo|Refatoração de código]], [[revisao_de_codigo|Revisão de código]], [[automacao_de_desenvolvimento|Automação de desenvolvimento]]
- **Modelos:** [[claude_opus_5_5|Claude Opus 5.5]], [[claude_sonnet_5_5|Claude Sonnet 5.5]], [[gpt_6_2_sol|GPT-6.2 Sol]]
Notas atômicas e legendas em [[hub_ai_tools|Mapa de Ferramentas de IA]].

## 🖥️ Compatibilidade e Plataformas
- **Plataformas:** macOS, Windows, Linux (aplicativo desktop baseado em VS Code)
- **Integra com:** [[grok|Grok]] (modelos nativos via X Subscription), [[claude|Claude]] e [[chatgpt|ChatGPT]] (modelos de terceiros ao preço de API), servidores MCP
- **Requisitos:** conta Cursor; macOS, Windows ou Linux

## 🔒 Restrições e Especificações
- **Context window / limites:** uso de IA medido por pool mensal incluído em cada plano; excedente cobrado em arrears
- **Residência de dados / privacidade:** código enviado aos serviços de IA; controles de privacidade e retenção nos planos Teams e Enterprise
- **Offline:** não
- **ToS / licença:** uso sob os termos do Cursor
- **Outras restrições:** o plano Plus inclui apenas modelos Grok; modelos de terceiros são cobrados por uso à parte

## 🆚 Alternativas
- [[github_copilot|GitHub Copilot]] - assistente integrado ao GitHub e a vários editores
- [[kiro_ide|Kiro-IDE]] - IDE agêntica com spec-driven development e hooks
- [[claude_code|Claude-Code]] - agente de código em CLI

### Vantagens sobre alternativas
- IDE dedicada com agente forte e pool de uso de modelos de ponta
- Tab e chat bem integrados ao editor

### Desvantagens
- Custo pode crescer com modelos de terceiros cobrados por uso
- Plano de entrada Plus limita modelos ao Grok

## 🛠️ Tecnologias Relacionadas
- VS Code - base do aplicativo
- [[hub_ai|Inteligência Artificial]] - base conceitual

## 🔗 Integra com
- [[claude|Claude]] - modelos Anthropic ao preço de API
- [[chatgpt|ChatGPT]] - modelos OpenAI GPT ao preço de API
- [[grok|Grok]] - modelos xAI nativos nos planos pagos

## 🚧 Limitações
### Limitações Técnicas
1. Depende de conexão com internet
2. Consumo de pool e de modelos de terceiros exige acompanhamento de custo

### Limitações de Licença
- Uso sob os termos do Cursor; controles corporativos nos planos Teams e Enterprise

## 📚 Documentação
- Documentação oficial: https://docs.cursor.com
- Planos e preços: https://cursor.com/en/pricing

## 💰 Custo e Contratação

### Planos (USD)
- **Gratuito:** Free $0/mês, uso de IA limitado
- **Assinatura (individual):** Plus $8/mês; Premium $30/mês (mais popular); Super $100/mês; Ultra $200/mês
- **Per-seat (times):** Teams a partir de $30/usuário/mês
- **Enterprise:** sob consulta
- **Observação:** modelos de terceiros não entram no preço mensal e são cobrados por uso à parte
- **Fonte:** https://cursor.com/en/pricing (verificado em 2026-11-20)

## 📊 Experiência de Uso

### Prós
- IDE completa com agente e Tab bem integrados
- Acesso a vários modelos de ponta

### Contras
- Custo variável com modelos de terceiros
- Plano Plus restrito a modelos Grok

### Curva de Aprendizado
- **Nível:** Baixa a Média
- **Tempo para proficiência:** horas para Tab e chat, dias para o agente

## 🔗 Relacionamentos
- **Contexto:** Ferramentas
- **Empresa:** [[anysphere|Anysphere]]
- **Alternativas:** [[github_copilot|GitHub Copilot]], [[kiro_ide|Kiro-IDE]], [[claude_code|Claude-Code]]
- **Integra com:** [[claude|Claude]], [[chatgpt|ChatGPT]], [[grok|Grok]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]

## 📝 Notas
- No prompt principal, adicionar o `tasks.md` melhora o contexto do agente.
- Uso principal em macOS.
- Atenção ao consumo: modelos de terceiros (Claude, GPT) são cobrados por uso além do plano.
