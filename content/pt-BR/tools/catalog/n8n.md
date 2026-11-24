---
id: n8n
tipo: ferramenta
nome: n8n
tipos:
  - SOFTWARE
  - PLATAFORMA
empresa: n8n GmbH
aliases:
  - n8n
categorias:
  - "[[automacao_nocode|Automação e no-code]]"
  - "[[mcp_integracoes|MCP e integrações]]"
  - "[[aplicativos_self_hosted|Aplicativos self-hosted]]"
funcionalidades:
  - "[[automacao_de_workflow|Automação de workflow]]"
  - "[[integracao_de_apis|Integração de APIs]]"
  - "[[tool_use_funcionalidade|Tool use]]"
casosDeUso:
  - "[[automacao_de_processos|Automação de processos]]"
  - "[[automacao_de_desenvolvimento|Automação de desenvolvimento]]"
  - "[[ingestao_de_dados_da_web|Ingestão de dados da web]]"
  - "[[planilhas_e_relatorios|Planilhas e relatórios]]"
  - "[[gestao_de_tarefas_e_projetos|Gestão de tarefas e projetos]]"
  - "[[automacao_no_code_de_fluxos|Automação no-code de fluxos]]"
  - "[[integracao_de_apis_e_webhooks|Integração de APIs e webhooks]]"
  - "[[automacao_de_navegador_e_rpa|Automação de navegador e RPA]]"
  - "[[automacao_da_casa_inteligente|Automação da casa inteligente]]"
  - "[[operacao_de_loja_virtual|Operação de loja virtual]]"
  - "[[gestao_de_redes_sociais|Gestão de redes sociais]]"
  - "[[edicao_e_retoque_de_foto|Edição e retoque de foto]]"
modelos: []
modeloContratacao:
  - free
  - subscription
  - enterprise
precoUSD: 20
plataformas:
  - web
  - self-hosted
  - cloud
  - cli
  - api
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
  - Community Edition self-hosted gratuita sob Sustainable Use License (fair-code), nao OSI
  - Cloud cobra por execucoes de workflow (Starter 2.500/mes, Pro 10.000/mes)
  - Business self-hosted a partir de $800/mes
  - precos de Cloud exibidos em EUR em algumas paginas
dataVerificacao: 2026-11-20
fontePreco: https://n8n.io/pricing/
precoMedio: 20
tags:
  - ferramenta
  - ia
  - automacao-nocode
  - n8n
  - workflows
---
# n8n

## 📋 Informações Básicas
- **Tipos:** Plataforma de automação de workflows (no-code / low-code)
- **Empresa/Fabricante:** n8n GmbH
- **Website:** https://n8n.io
- **Categorias:** Automação / no-code, MCP e integrações
- **Modelo de contratação:** free (Community self-hosted), subscription (Cloud), enterprise
- **Preço (USD):** Community self-hosted gratuita; Cloud Starter $20/mês (anual), Pro $50/mês (anual); Business self-hosted a partir de $800/mês
- **Data de verificação:** 2026-11-20
- **Fonte do preço:** https://n8n.io/pricing/
- **Licença:** fair-code (Sustainable Use License)

## 📝 Descrição
Plataforma de automação de workflows que conecta apps, APIs e serviços em fluxos visuais, com a opção de escrever código quando necessário. Roda na nuvem da n8n ou em servidor próprio (Community Edition). A cobrança da Cloud é por execução de workflow, em que uma execução é uma rodada completa do fluxo, não por passo.

## 🎯 Para Que Serve
Automatizar processos entre sistemas ligando gatilhos, ações e integrações em um fluxo visual, com nós de IA para orquestrar modelos e agentes.

### Casos de Uso
1. Automação de processos entre apps (CRM, planilhas, mensageria)
2. Automação de tarefas de desenvolvimento e integrações internas
3. Ingestão de dados da web e de APIs em pipelines
4. Orquestração de passos de IA dentro de fluxos

## ⏰ Quando Utilizar
- Quando quer automação visual conectando muitos serviços
- Quando quer self-host gratuito com controle dos dados (Community)
- Quando precisa misturar nós prontos com código quando necessário
- Quando quer orquestrar chamadas de IA dentro de um fluxo

### Quando NÃO utilizar
- Quando precisa só de uma camada de ferramentas para agentes via código: avalie [[composio|Composio]]
- Quando a automação é trivial e um script simples resolve
- Quando o volume de execuções na Cloud fica caro frente ao self-host
- Quando a equipe não quer operar o servidor do self-host

## 🧩 Categorias e Funcionalidades
- **Categorias:** [[automacao_nocode|Automação e no-code]], [[mcp_integracoes|MCP e integrações]]
- **Funcionalidades:** [[automacao_de_workflow|Automação de workflow]], [[integracao_de_apis|Integração de APIs]], [[tool_use_funcionalidade|Tool use]]
- **Casos de uso mapeados:** [[automacao_de_processos|Automação de processos]], [[automacao_de_desenvolvimento|Automação de desenvolvimento]], [[ingestao_de_dados_da_web|Ingestão de dados da web]]
Notas atômicas e legendas em [[hub_ai_tools|Mapa de Ferramentas de IA]].

## 🖥️ Compatibilidade e Plataformas
- **Plataformas:** web, self-hosted, cloud, cli, api
- **Integra com:** Google Tasks e centenas de apps; autenticação via OAuth2; nós de IA e MCP
- **Requisitos:** conta n8n Cloud; ou servidor próprio (Node.js via nvm, Python 3.12 para alguns nós)

## 🔒 Restrições e Especificações
- **Context window / limites:** não aplicável; Cloud limita por execuções de workflow por mês.
- **Residência de dados / privacidade:** total no self-host; na Cloud, dados na infraestrutura da n8n.
- **Offline:** parcial (self-host roda na sua rede).
- **ToS / licença:** fair-code (Sustainable Use License), não é licença OSI.
- **Outras restrições:** recursos como SSO ficam em planos superiores; preços de Cloud exibidos em EUR em algumas páginas.

## 🔧 Como Utilizar

### Instalação local (self-hosted)
```bash
npm install n8n -g
```
Requer Node.js (via nvm) e, para alguns nós, Python 3.12.

### Rodar local
```bash
n8n start
```
Acessar em http://localhost:5678/

### Referência útil
- Como achar o idList de uma lista no Trello: https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.trello/#find-the-list-id

## 🆚 Alternativas
- [[composio|Composio]] - camada de ferramentas e MCP para agentes (foco em código)
- Zapier - automação no-code gerenciada, sem self-host
- Make (antigo Integromat) - automação visual por cenários

### Vantagens sobre alternativas
- Self-host gratuito com controle total dos dados
- Fluxos visuais com opção de código
- Cobrança por execução (não por passo) na Cloud
- Nós de IA e integração com MCP

### Desvantagens
- Operar o self-host exige manutenção
- Licença fair-code, não OSI
- Recursos enterprise em planos superiores

## 💰 Custo e Contratação

### Planos (USD)
- **Community (self-hosted):** gratuita; custo é o servidor
- **Cloud Starter:** $20/mês no anual ($24 mensal), 2.500 execuções/mês
- **Cloud Pro:** $50/mês no anual ($60 mensal), 10.000 execuções/mês
- **Business (self-hosted):** a partir de $800/mês
- **Enterprise:** sob consulta
- **Fonte:** https://n8n.io/pricing/ (verificado em 2026-11-20)

## 🔗 Relacionamentos
- **Contexto:** Ferramentas
- **Empresa:** n8n GmbH
- **Usado em:** Automação de processos e integrações pessoais
- **Alternativas:** [[composio|Composio]]
- **Integra com:** Google Tasks, OAuth2
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]

## 📝 Notas
- Credenciais (contas, tokens, senhas) ficam fora desta nota. Guarde em gerenciador de segredos ou em arquivo sensível fora do versionamento, nunca no corpo do documento.
