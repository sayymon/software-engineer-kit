---
id: kiro_ide
tipo: ferramenta
nome: Kiro IDE
tipos:
  - SOFTWARE
empresa: "[[aws|AWS]]"
aliases:
  - Kiro IDE
categorias:
  - "[[ide_ia|IDE com IA]]"
  - "[[agente_codigo|Agente de código]]"
funcionalidades:
  - "[[geracao_de_codigo|Geração de código]]"
  - "[[edicao_de_codebase|Edição de codebase]]"
  - "[[geracao_de_texto|Geração de texto]]"
  - "[[raciocinio|Raciocínio]]"
  - "[[tool_use_funcionalidade|Tool use]]"
  - "[[mcp|MCP]]"
  - "[[automacao_de_workflow|Automação de workflow]]"
casosDeUso:
  - "[[programacao_em_par|Programação em par]]"
  - "[[refatoracao_de_codigo|Refatoração de código]]"
  - "[[revisao_de_codigo|Revisão de código]]"
  - "[[automacao_de_desenvolvimento|Automação de desenvolvimento]]"
  - "[[construcao_de_agentes|Construção de agentes]]"
  - "[[testes_de_software_e_qa|Testes de software e QA]]"
  - "[[depuracao_e_correcao_de_bugs|Depuração e correção de bugs]]"
  - "[[migracao_e_modernizacao_de_codigo|Migração e modernização de código]]"
  - "[[resposta_a_incidentes|Resposta a incidentes]]"
  - "[[agente_que_usa_o_computador|Agente que usa o computador]]"
modelos:
  - "[[claude_opus_5_5|Claude Opus 5.5]]"
  - "[[claude_sonnet_5_5|Claude Sonnet 5.5]]"
  - "[[gpt_5_6_sol|GPT-5.6 Sol]]"
  - "[[gpt_6_2_sol|GPT-6.2 Sol]]"
modeloContratacao:
  - free
  - subscription
  - enterprise
precoUSD: 20
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
  - consome creditos por uso
  - plano Free com 50 creditos/mes
  - modelos diferentes consomem creditos em taxas diferentes
  - sem modo offline
dataVerificacao: 2026-11-20
fontePreco: https://kiro.dev/pricing/
precoMedio: 20
tags:
  - ferramenta
  - ia
  - ide-ia
  - agente-codigo
  - kiro
  - aws
---
# Kiro IDE

## 📋 Informações
- **Tipo:** Tecnológico
- **Área:** Engenharia de Software
- **Nível de Domínio:** Iniciante
- **Data de Aquisição:** 23/02/2026
- **Última Atualização:** 23/02/2026
- **Relevância Atual:** Sim
- **Desenvolvedor:** Amazon Web Services (AWS)

## 📖 Descrição

Kiro é uma IDE agêntica (agentic IDE) desenvolvida pela AWS que revoluciona o desenvolvimento de software através de uma abordagem estruturada chamada "spec-driven development". Diferente de outras IDEs com IA que apenas fornecem autocomplete ou geram código a partir de prompts, o Kiro atua como um co-desenvolvedor autônomo que transforma ideias em linguagem natural em especificações claras, design estruturado e código pronto para produção.

### O que é uma IDE Agêntica?

Uma IDE agêntica usa agentes de IA autônomos que podem:
- Gerar planos de projeto completos
- Criar e modificar múltiplos arquivos simultaneamente
- Executar testes automaticamente
- Atualizar documentação
- Coordenar tarefas complexas entre diferentes partes do código

### Filosofia Central

**"From Vibe Code to Viable Code"** - O Kiro enfatiza planejamento antecipado através de especificações, documentos de design e implementação estruturada antes de escrever código.

## 🎯 Para Que Serve

### Principais Casos de Uso
1. **Desenvolvimento Spec-Driven**: Transformar requisitos em especificações formais antes de codificar
2. **Prototipagem Rápida**: Criar MVPs estruturados rapidamente
3. **Manutenção de Código**: Manter qualidade e documentação sincronizada
4. **Automação de Tarefas**: Hooks para automatizar testes, linting, formatação
5. **Integração com Ferramentas**: Powers e MCP para conectar com APIs e serviços

### Quando Usar
- ✅ Projetos que precisam de documentação clara
- ✅ Times ágeis com user stories bem definidas
- ✅ Desenvolvimento de MVPs estruturados
- ✅ Projetos que exigem manutenibilidade
- ✅ Quando você quer código pronto para produção, não apenas protótipos

### Quando NÃO Usar
- ❌ Scripts rápidos e descartáveis
- ❌ Quando você só precisa de autocomplete simples
- ❌ Projetos sem requisitos claros

## 🧩 Categorias e Funcionalidades
- **Categorias:** [[ide_ia|IDE com IA]], [[agente_codigo|Agente de código]]
- **Funcionalidades:** [[geracao_de_codigo|Geração de código]], [[edicao_de_codebase|Edição de codebase]], [[geracao_de_texto|Geração de texto]], [[raciocinio|Raciocínio]], [[tool_use_funcionalidade|Tool use]], [[mcp|MCP]], [[automacao_de_workflow|Automação de workflow]]
- **Casos de uso mapeados:** [[programacao_em_par|Programação em par]], [[refatoracao_de_codigo|Refatoração de código]], [[revisao_de_codigo|Revisão de código]], [[automacao_de_desenvolvimento|Automação de desenvolvimento]], [[construcao_de_agentes|Construção de agentes]]
- **Modelos:** [[claude_opus_5_5|Claude Opus 5.5]], [[claude_sonnet_5_5|Claude Sonnet 5.5]], [[gpt_5_6_sol|GPT-5.6 Sol]], [[gpt_6_2_sol|GPT-6.2 Sol]]
Notas atômicas e legendas em [[hub_ai_tools|Mapa de Ferramentas de IA]].

## 🖥️ Compatibilidade e Plataformas
- **Plataformas:** macOS, Windows, Linux (aplicativo desktop baseado em VS Code OSS)
- **Integra com:** modelos da OpenAI (GPT-5.6) e da Anthropic [[claude|Claude]]; servidores MCP (Model Context Protocol); powers e hooks
- **Requisitos:** conta Kiro; macOS, Windows ou Linux

## 🔒 Restrições e Especificações
- **Context window / limites:** depende do modelo selecionado; uso consome créditos, com allowance mensal por plano
- **Residência de dados / privacidade:** código enviado aos serviços de IA; controles corporativos no plano Enterprise
- **Offline:** não
- **ToS / licença:** uso sob os termos do Kiro / AWS
- **Outras restrições:** modelos diferentes consomem créditos em taxas diferentes; plano Free com 50 créditos/mês

## 💰 Custo e Contratação

### Planos (USD)
- **Gratuito:** Free $0/mês, 50 créditos/mês
- **Assinatura:** Pro $20/mês (1.000 créditos); Pro+ $40/mês (2.000 créditos); Pro Max $100/mês (5.000 créditos); Power $200/mês (10.000 créditos)
- **Enterprise:** sob consulta
- **Add-on:** créditos extras nos planos pagos
- **Fonte:** https://kiro.dev/pricing/ (verificado em 2026-11-20)

## 🧩 Conceitos Fundamentais

### 1. Spec-Driven Development (Desenvolvimento Orientado a Especificações)

**Definição**: Metodologia que cria especificações formais ANTES de escrever código, servindo como fonte única de verdade.

**Fases do Processo**:
1. **Requirements (Requisitos)**: Lista exaustiva do que precisa ser feito
2. **Design (Design)**: Arquitetura e decisões técnicas
3. **Tasks (Tarefas)**: Decomposição em tarefas implementáveis
4. **Implementation (Implementação)**: Código baseado nas specs

**Benefícios**:
- Código mais manutenível
- Documentação sempre atualizada
- Menos retrabalho
- Melhor comunicação entre time
- Decisões técnicas documentadas

**Formato EARS** (Easy Approach to Requirements Syntax):
```
WHEN [condição]
IF [pré-condição]
THEN [sistema]
SHALL [ação]
```

### 2. Agent Hooks (Ganchos de Agente)

**Definição**: Automações que disparam ações quando eventos específicos ocorrem na IDE.

**Tipos de Eventos**:
- `fileEdited`: Quando um arquivo é salvo
- `fileCreated`: Quando um arquivo é criado
- `fileDeleted`: Quando um arquivo é deletado
- `promptSubmit`: Quando uma mensagem é enviada ao agente
- `agentStop`: Quando uma execução do agente termina
- `preToolUse`: Antes de uma ferramenta ser executada
- `postToolUse`: Depois de uma ferramenta ser executada
- `userTriggered`: Quando o usuário aciona manualmente

**Tipos de Ações**:
- `askAgent`: Envia mensagem ao agente
- `runCommand`: Executa comando shell

**Exemplo de Hook**:
```json
{
  "name": "Lint on Save",
  "version": "1.0.0",
  "when": {
    "type": "fileEdited",
    "patterns": ["*.ts", "*.tsx"]
  },
  "then": {
    "type": "askAgent",
    "prompt": "Run npm run lint and fix any errors"
  }
}
```

### 3. Agent Steering (Direcionamento de Agente)

**Definição**: Arquivos markdown que fornecem contexto persistente sobre o projeto para todas as interações.

**Localização**: `.kiro/steering/*.md`

**Tipos de Inclusão**:
- **Always**: Incluído em todas as interações (padrão)
- **FileMatch**: Incluído quando arquivos específicos são lidos
- **Manual**: Incluído apenas quando referenciado com `#`

**Conteúdo Típico**:
- Padrões de código do projeto
- Estrutura do projeto
- Convenções de nomenclatura
- Melhores práticas específicas
- Informações de arquitetura

**Exemplo de Front Matter**:
```markdown
---
inclusion: fileMatch
fileMatchPattern: 'README*'
---
```

### 4. Powers (Poderes)

**Definição**: Pacotes de capacidades que combinam servidores MCP, steering files e hooks para dar ao agente conhecimento especializado instantâneo.

**Componentes de um Power**:
- **POWER.md**: Documentação e instruções
- **MCP Servers**: Ferramentas especializadas
- **Steering Files**: Workflows e melhores práticas
- **Keywords**: Palavras-chave para ativação automática

**Ativação**: Quando você menciona keywords relevantes, o Kiro carrega automaticamente o contexto e ferramentas do power.

**Exemplos de Powers**:
- `postman`: Automação de testes de API
- `aws`: Integração com serviços AWS
- `terraform`: Infraestrutura como código

### 5. MCP (Model Context Protocol)

**Definição**: Protocolo que permite ao Kiro se conectar com ferramentas e serviços externos através de servidores MCP.

**Configuração**: Arquivo `mcp.json` em `.kiro/settings/`

**Exemplo de Configuração**:
```json
{
  "mcpServers": {
    "aws-docs": {
      "command": "uvx",
      "args": ["awslabs.aws-documentation-mcp-server@latest"],
      "env": {
        "FASTMCP_LOG_LEVEL": "ERROR"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

**Precedência de Configs**:
```
user config < workspace1 < workspace2 < ...
```

**O que é um MCP Server?**
- Servidor que expõe ferramentas/APIs para o Kiro
- Roda como processo separado
- Comunica via protocolo MCP
- Exemplos: GitHub API, Jira, Confluence, AWS, etc.

## 🔄 MCP vs Powers - Qual a Diferença?

### MCP Server (Nível Baixo - Ferramentas)

**O que é**: Servidor que fornece ferramentas individuais para o Kiro usar.

**Características**:
- ✅ Fornece ferramentas específicas (ex: criar issue, buscar PR)
- ✅ Requer configuração manual no `mcp.json`
- ✅ Sempre ativo quando configurado
- ✅ Ferramentas aparecem diretamente no Kiro
- ❌ Não inclui contexto ou documentação
- ❌ Não tem steering files
- ❌ Não tem ativação automática

**Exemplo - MCP GitHub**:
```json
{
  "mcpServers": {
    "github": {
      "command": "uvx",
      "args": ["mcp-server-github"]
    }
  }
}
```

**Ferramentas disponíveis**:
- `mcp_github_create_issue`
- `mcp_github_create_pull_request`
- `mcp_github_search_repositories`
- etc.

**Problema**: Você tem as ferramentas, mas não sabe:
- Quando usá-las
- Como usá-las corretamente
- Melhores práticas
- Workflows recomendados

### Power (Nível Alto - Conhecimento + Ferramentas)

**O que é**: Pacote completo que combina MCP servers + documentação + steering files + workflows.

**Características**:
- ✅ Inclui MCP servers (ferramentas)
- ✅ Inclui POWER.md (documentação completa)
- ✅ Inclui steering files (melhores práticas)
- ✅ Inclui workflows (como usar)
- ✅ Ativação automática por keywords
- ✅ Carrega contexto on-demand (não sobrecarrega)
- ✅ Instalação simplificada

**Exemplo - Power Postman**:
```
postman/
├── POWER.md                    # Documentação
├── mcp.json                    # Servidor MCP
├── steering/
│   ├── getting-started.md      # Como começar
│   ├── best-practices.md       # Melhores práticas
│   └── workflows.md            # Workflows comuns
└── keywords: [postman, api, testing]
```

**Quando você menciona "postman" ou "api testing"**:
1. Kiro detecta keyword
2. Ativa o power automaticamente
3. Carrega documentação
4. Carrega steering files
5. Disponibiliza ferramentas MCP
6. Sabe como usar tudo junto!

### Comparação Prática

#### Cenário: Testar API

**Com MCP apenas**:
```
Você: "Testar API de usuários"
Kiro: "Posso usar mcp_postman_create_request, mas não sei:
       - Qual collection usar
       - Como estruturar o request
       - Quais headers adicionar
       - Como validar resposta"
```

**Com Power Postman**:
```
Você: "Testar API de usuários"
Kiro: *detecta keyword "API"*
      *ativa power postman*
      *carrega best practices*

"Vou criar um request seguindo as melhores práticas:
 1. Criar collection 'Users API'
 2. Adicionar request GET /users
 3. Configurar headers padrão
 4. Adicionar testes de validação
 5. Salvar no workspace correto"
```

### Analogia

**MCP Server** = Caixa de ferramentas
- Você tem martelo, chave de fenda, alicate
- Mas não sabe quando usar cada um
- Não tem manual de instruções

**Power** = Kit completo de marcenaria
- Ferramentas (MCP servers)
- Manual de instruções (POWER.md)
- Guias de projetos (steering files)
- Vídeos tutoriais (workflows)
- Ativação automática quando você fala "madeira"

### Quando Usar Cada Um?

#### Use MCP Server quando:
- ✅ Você já conhece bem a ferramenta
- ✅ Precisa apenas de acesso às APIs
- ✅ Vai criar seu próprio power customizado
- ✅ Quer controle total da configuração

#### Use Power quando:
- ✅ Quer começar rápido
- ✅ Precisa de melhores práticas
- ✅ Quer workflows prontos
- ✅ Prefere ativação automática
- ✅ Quer documentação integrada

### Estrutura Técnica

#### MCP Server
```
.kiro/settings/mcp.json
{
  "mcpServers": {
    "github": {
      "command": "uvx",
      "args": ["mcp-server-github"]
    }
  }
}
```

#### Power
```
~/.kiro/powers/postman/
├── POWER.md                 # Documentação
├── mcp.json                 # MCP servers incluídos
├── steering/                # Contexto e guias
│   ├── getting-started.md
│   └── workflows.md
└── metadata.json            # Keywords, versão, etc.
```

### Exemplo Real: GitHub

#### Opção 1: MCP GitHub (manual)
```json
// .kiro/settings/mcp.json
{
  "mcpServers": {
    "github": {
      "command": "uvx",
      "args": ["mcp-server-github"],
      "env": {
        "GITHUB_TOKEN": "seu_token"
      }
    }
  }
}
```

**Resultado**: Ferramentas disponíveis, mas sem contexto.

#### Opção 2: Power GitHub (completo)
```bash
# Instalar power
kiro power install github

# Usar
"Criar issue no repositório X"
# Kiro detecta "issue" → ativa power → sabe workflow completo
```

**Resultado**: Ferramentas + documentação + melhores práticas.

### Powers Disponíveis

Alguns powers populares:
- **postman**: Testes de API
- **aws**: Serviços AWS
- **terraform**: Infraestrutura como código
- **kubernetes**: Orquestração de containers

### Como Criar Seu Próprio Power

Se você tem um MCP server customizado e quer transformar em power:

1. Crie estrutura:
```
meu-power/
├── POWER.md
├── mcp.json
└── steering/
    └── workflows.md
```

2. Configure keywords:
```yaml
# POWER.md
---
keywords: [minha-ferramenta, meu-dominio]
---
```

3. Instale localmente:
```bash
kiro power install ./meu-power
```

### Resumo Visual

```
MCP Server          Power
    ↓                 ↓
[Ferramentas]    [Ferramentas]
                 [Documentação]
                 [Steering Files]
                 [Workflows]
                 [Keywords]
                 [Auto-ativação]
```

**MCP** = Tijolo
**Power** = Casa pronta com manual do proprietário

## 🛠️ Arquitetura e Componentes

### Baseado em VS Code OSS
- IDE completa, não apenas plugin
- Todas as extensões do VS Code funcionam
- Interface familiar para desenvolvedores

### Modos de Operação

#### 1. Autopilot Mode (Piloto Automático)
- Kiro modifica arquivos autonomamente
- Ideal para desenvolvimento rápido
- Requer confiança nas especificações

#### 2. Supervised Mode (Modo Supervisionado)
- Usuário pode reverter mudanças após aplicação
- Mais controle sobre alterações
- Ideal para código crítico

### Agentes Especializados

#### Context-Gatherer
- Explora codebase desconhecida
- Identifica arquivos relevantes
- Mapeia componentes e interações
- **Quando usar**: Início de trabalho em área desconhecida, investigação de bugs

#### General-Task-Execution
- Executa tarefas bem definidas
- Acesso a todas as ferramentas
- **Quando usar**: Subtarefas isoladas, trabalho paralelo

#### Custom-Agent-Creator
- Cria agentes personalizados
- Define comportamentos específicos
- **Quando usar**: Padrões recorrentes de tarefas

## 📚 Recursos e Ferramentas

### Chat Context
- `#File`: Referenciar arquivo específico
- `#Folder`: Referenciar pasta
- `#Problems`: Ver problemas do arquivo atual
- `#Terminal`: Ver saída do terminal
- `#Git Diff`: Ver mudanças git

### Comandos Principais
- `Ctrl/Cmd + O`: Busca rápida de arquivos
- `Ctrl/Cmd + Shift + F`: Busca em conteúdo
- Graph View: Visualizar conexões
- Command Palette: Buscar "MCP" ou "Kiro"

### Ferramentas de Código
- `getDiagnostics`: Verificar erros sem executar bash
- `semanticRename`: Renomear símbolos com atualização de referências
- `smartRelocate`: Mover arquivos com atualização de imports
- `readCode`: Ler código com análise AST
- `editCode`: Editar código com AST

## 🔗 Relacionamentos

### Pré-requisitos
- VS Code - Familiaridade com VS Code
- Git - Controle de versão
- Markdown - Formato de documentação
- Engenharia de Software - Conceitos de desenvolvimento

### Habilita
- Spec-Driven Development - Metodologia de desenvolvimento
- AI-Assisted Coding - Desenvolvimento assistido por IA
- Automation - Automação de workflows

### Conhecimentos Relacionados
- Kiro-Hooks-Guia-Pratico - Guia completo de hooks
- Kiro-Macetes-e-Dicas - Dicas práticas e atalhos

### Ferramentas Relacionadas
- [[github_copilot|GitHub Copilot]] - Autocomplete com IA
- [[cursor|Cursor]] - Outra IDE com IA
- VS Code - Base do Kiro
- MCP Servers - Integrações externas

### Tecnologias Relacionadas
- [[claude|Claude]] - um dos modelos disponíveis no Kiro (Anthropic)
- [[hub_ai_tools|Mapa de Ferramentas de IA]] - mapa de escolha de ferramentas de IA
- TypeScript - Linguagem principal
- Python - Para MCP servers (uvx)
- Node.js - Runtime JavaScript
- [[aws|AWS]] - Serviços cloud

## 📝 Notas Importantes

### Pricing (Preços)
- **Free:** $0/mês, 50 créditos/mês
- **Pro:** $20/mês (1.000 créditos)
- **Pro+:** $40/mês (2.000 créditos)
- **Pro Max:** $100/mês (5.000 créditos)
- **Power:** $200/mês (10.000 créditos)
- Fonte: https://kiro.dev/pricing/ (verificado em 2026-11-20). Detalhes em [[hub_ai_tools|Mapa de Ferramentas de IA]].

### Limitações Conhecidas
- Requer conexão com internet
- Consome créditos por uso
- Curva de aprendizado para spec-driven
- Necessita disciplina para manter specs

## 📚 Recursos para Aprofundamento

### Documentação Oficial
- [Kiro Docs](https://kiro.dev/docs/) - Documentação completa
- [Getting Started](https://kiro.dev/docs/getting-started/) - Primeiros passos
- [Specs Guide](https://kiro.dev/docs/specs/) - Guia de especificações
- [Hooks Reference](https://kiro.dev/docs/hooks/) - Referência de hooks
- [Powers](https://kiro.dev/powers/) - Catálogo de powers

### Tutoriais e Guias
- [Kiro Directory](https://kiro.directory/) - Guias práticos
- [DataCamp Tutorial](https://www.datacamp.com/tutorial/kiro-ai) - Tutorial completo
- [Best Practices](https://kiro.directory/blog/best-practices-spec-driven-development/) - Melhores práticas

### Comunidade
- [GitHub Issues](https://github.com/kirodotdev/Kiro) - Reportar bugs e sugestões
- [Discord](https://discord.gg/kiro) - Comunidade de desenvolvedores

### Artigos Relevantes
- [Teaching Kiro New Tricks](https://kiro.dev/blog/teaching-kiro-new-tricks-with-agent-steering-and-mcp/) - Steering e MCP
- [Spec-Driven MVP](https://www.smiansh.com/blogs/kiro-ai-ide-review-building-a-spec-driven-mvp/) - Construindo MVPs
