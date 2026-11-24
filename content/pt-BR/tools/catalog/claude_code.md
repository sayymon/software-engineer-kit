---
id: claude_code
tipo: ferramenta
nome: Claude Code
tipos:
  - SOFTWARE
  - UTILITARIO
empresa: "[[anthropic|Anthropic]]"
aliases:
  - Claude Code
categorias:
  - "[[agente_codigo|Agente de código]]"
  - "[[terminal_produtividade_local|Terminal e produtividade local]]"
  - "[[linux_dev_produtividade|Linux para dev e produtividade]]"
funcionalidades:
  - "[[geracao_de_codigo|Geração de código]]"
  - "[[edicao_de_codebase|Edição de codebase]]"
  - "[[geracao_de_texto|Geração de texto]]"
  - "[[raciocinio|Raciocínio]]"
  - "[[tool_use_funcionalidade|Tool use]]"
  - "[[mcp|MCP]]"
casosDeUso:
  - "[[programacao_em_par|Programação em par]]"
  - "[[refatoracao_de_codigo|Refatoração de código]]"
  - "[[revisao_de_codigo|Revisão de código]]"
  - "[[automacao_de_desenvolvimento|Automação de desenvolvimento]]"
  - "[[construcao_de_agentes|Construção de agentes]]"
  - "[[startup_saas_inicial_pequena_empresa|Startup SaaS inicial (pequena empresa)]]"
modelos:
  - "[[claude_fable_5_2|Claude Fable 5.2]]"
  - "[[claude_haiku_4_5|Claude Haiku 4.5]]"
  - "[[claude_haiku_5_5|Claude Haiku 5.5]]"
  - "[[claude_opus_4_8|Claude Opus 4.8]]"
  - "[[claude_opus_5|Claude Opus 5]]"
  - "[[claude_opus_5_5|Claude Opus 5.5]]"
  - "[[claude_sonnet_4_6|Claude Sonnet 4.6]]"
  - "[[claude_sonnet_5|Claude Sonnet 5]]"
  - "[[claude_sonnet_5_5|Claude Sonnet 5.5]]"
  - "[[glm_5_3|GLM-5.3]]"
modeloContratacao:
  - subscription
  - api-pay-per-token
  - enterprise
precoUSD: 20
plataformas:
  - cli
  - macos
  - linux
  - windows
  - vscode
  - jetbrains
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
  - sem acesso no plano Free da Claude
  - pool de uso compartilhado com claude.ai
  - requer conta paga ou chave de API
  - sem modo offline
  - limites de uso por plano
dataVerificacao: 2026-11-20
fontePreco: https://claude.com/pricing
precoMedio: 20
tags:
  - ferramenta
  - ia
  - agente-codigo
  - claude
  - anthropic
---
# Claude Code

## 📋 Informações
- **Tipo:** Tecnológico
- **Área:** Engenharia de Software
- **Nível de Domínio:** Iniciante
- **Data de Aquisição:** 14/03/2026
- **Última Atualização:** 14/03/2026
- **Relevância Atual:** Sim
- **Desenvolvedor:** Anthropic

## 📖 Descrição

Claude Code é a interface CLI (Command Line Interface) oficial da Anthropic que permite interagir com o modelo Claude diretamente do terminal ou integrado a editores de código. Diferente de outras ferramentas de IA que são apenas assistentes de código, o Claude Code atua como um agente completo capaz de ler, escrever, executar comandos e navegar em codebases complexas.

### O que é Claude Code?

Claude Code é um agente de desenvolvimento que:
- Lê e modifica múltiplos arquivos simultaneamente
- Executa comandos no terminal
- Busca e analisa código em toda a codebase
- Entende contexto de projetos complexos
- Mantém conversas persistentes com memória
- Suporta múltiplos workspaces

### Filosofia Central

**"Agente autônomo para desenvolvimento"** - O Claude Code enfatiza autonomia e contexto completo, permitindo que o agente tome decisões informadas sobre o código e execute ações complexas com supervisão mínima.

## 🎯 Para Que Serve

### Principais Casos de Uso
1. **Desenvolvimento Assistido**: Escrever, refatorar e depurar código
2. **Navegação em Codebase**: Entender projetos grandes e legados
3. **Automação de Tarefas**: Executar workflows complexos
4. **Documentação**: Criar e atualizar documentação técnica
5. **Code Review**: Análise de código e sugestões de melhorias
6. **Resolução de Bugs**: Investigação e correção de problemas

### Quando Usar
- Projetos de qualquer tamanho (pequenos a grandes)
- Múltiplas linguagens de programação
- Quando você precisa de contexto completo da codebase
- Para tarefas repetitivas que podem ser automatizadas
- Desenvolvimento com requisitos bem definidos
- Refatoração de código legado

### Quando NÃO Usar
- Tarefas que requerem julgamento humano crítico
- Código de segurança extremamente sensível sem revisão
- Quando você só precisa de autocomplete simples

## 🧩 Categorias e Funcionalidades
- **Categorias:** [[agente_codigo|Agente de código]]
- **Funcionalidades:** [[geracao_de_codigo|Geração de código]], [[edicao_de_codebase|Edição de codebase]], [[geracao_de_texto|Geração de texto]], [[raciocinio|Raciocínio]], [[tool_use_funcionalidade|Tool use]], [[mcp|MCP]]
- **Casos de uso mapeados:** [[programacao_em_par|Programação em par]], [[refatoracao_de_codigo|Refatoração de código]], [[revisao_de_codigo|Revisão de código]], [[automacao_de_desenvolvimento|Automação de desenvolvimento]], [[construcao_de_agentes|Construção de agentes]]
- **Modelos:** [[claude_fable_5_2|Claude Fable 5.2]], [[claude_haiku_4_5|Claude Haiku 4.5]], [[claude_haiku_5_5|Claude Haiku 5.5]], [[claude_opus_4_8|Claude Opus 4.8]], [[claude_opus_5|Claude Opus 5]], [[claude_opus_5_5|Claude Opus 5.5]], [[claude_sonnet_4_6|Claude Sonnet 4.6]], [[claude_sonnet_5|Claude Sonnet 5]], [[claude_sonnet_5_5|Claude Sonnet 5.5]], [[glm_5_3|GLM-5.3]]
Notas atômicas e legendas em [[hub_ai_tools|Mapa de Ferramentas de IA]].

## 🖥️ Compatibilidade e Plataformas
- **Plataformas:** CLI (terminal), macOS, Linux, Windows, integração com VS Code e JetBrains
- **Integra com:** [[claude|Claude]] (modelos Opus, Sonnet e Haiku), servidores MCP (Model Context Protocol), editores com terminal integrado
- **Requisitos:** conta paga da Claude (Pro, Max, Team ou Enterprise) ou chave de API via Anthropic Console

## 🔒 Restrições e Especificações
- **Context window / limites:** depende do modelo Claude selecionado; limites de uso por plano, com pool compartilhado entre Claude Code, claude.ai e demais produtos
- **Residência de dados / privacidade:** código é enviado aos serviços da Anthropic; controles corporativos no plano Enterprise
- **Offline:** não
- **ToS / licença:** uso sob os termos da Anthropic
- **Outras restrições:** sem acesso no plano Free; excedente de uso cobrado a preços de API

## 💰 Custo e Contratação

### Planos (USD)
- **Gratuito:** o plano Free da Claude não inclui o Claude Code
- **Assinatura:** Pro $20/mês ($17/mês no anual); Max $100/mês (5x); Max $200/mês (20x). Todos compartilham o mesmo pool de uso com o claude.ai
- **Times:** Team Premium com assentos que incluem Claude Code
- **API (pay-per-token):** disponível via Anthropic Console, cobrado por token do modelo usado
- **Enterprise:** sob consulta
- **Fonte:** https://claude.com/pricing (verificado em 2026-11-20)

## 🧩 Conceitos Fundamentais

### 1. Agente Autônomo

**Definição**: O Claude Code funciona como um agente que pode tomar decisões e executar múltiplas ações em sequência.

**Capacidades**:
- Leitura de múltiplos arquivos
- Escrita e edição de código
- Execução de comandos shell
- Busca por padrões (glob, grep)
- Criação de tarefas e subtarefas
- Uso de subagentes especializados

**Modos de Operação**:
- **Permission Mode**: Controla quais ações podem ser executadas automaticamente
  - Auto-approve: Ações são executadas sem confirmação
  - Prompt: Usuário é consultado antes da execução
  - Block: Ações são bloqueadas

### 2. Context Management (Gerenciamento de Contexto)

**Definição**: Sistema que permite fornecer contexto persistente ao Claude através de arquivos e configurações.

**Arquivos de Contexto**:
- **CLAUDE.md**: Arquivo principal na raiz do projeto
  - Fornece contexto global sobre o projeto
  - Regras e convenções
  - Estrutura do repositório
  - Informações importantes

**Steering Files**: Semelhante ao Kiro, arquivos markdown que direcionam comportamento

**Auto Memory**: Sistema de memória persistente
- Localização: `~/.claude/projects/[projeto]/memory/`
- **MEMORY.md**: Memórias principais (sempre carregado)
- Arquivos temáticos: debugging.md, patterns.md, etc.
- Organização semântica, não cronológica

### 3. Ferramentas Disponíveis

Converse rapidamente com Claude em poucos toques
Pressione ⌥ option duas vezes para digitar para Claude
Vá para Configurações > Geral para personalizar
Barra de menus no macOS
Clique no ícone na barra de menu.
Pressione caps lock para ditar, depois pressione novamente para finalizar.

**File Operations**:
- `Read`: Ler arquivos (suporta offset e limit para arquivos grandes)
- `Write`: Criar novos arquivos
- `Edit`: Modificar arquivos existentes (envia apenas diff)
- `Glob`: Buscar arquivos por padrão (ex: `**/*.ts`)
- `Grep`: Buscar conteúdo em arquivos (suporta regex)

**Code Operations**:
- Leitura de código
- Edição de código
- Análise AST (Abstract Syntax Tree)
- Refatoração

**Execution**:
- `Bash`: Executar comandos shell
- Suporte a pipes e redirecionamento

**Agent Tools**:
- `Agent`: Criar subagentes especializados (Explore, Research)
- `Skill`: Executar skills predefinidas (ex: /commit)

**Task Management**:
- `TaskCreate`: Criar tarefas
- `TaskUpdate`: Atualizar status de tarefas
- `TaskGet`: Obter detalhes de tarefa
- `TaskList`: Listar tarefas

**Web**:
- `WebFetch`: Buscar conteúdo da web

### 4. Subagentes Especializados

**Agent Tool com Explore**:
- Navegação profunda em codebase
- Pesquisa semântica de código
- Análise de arquitetura
- Recomendado para investigações complexas (mais de 3 queries)

**Agent Tool com General**:
- Tarefas paralelas
- Isolamento de contexto
- Proteção do contexto principal

### 5. Skills (Habilidades)

**Definição**: Comandos pré-definidos invocados com `/nome`

**Skills Disponíveis**:
- `/commit`: Criar commits seguindo convenções
- `/simplify`: Revisar código para qualidade e eficiência
- `/loop`: Executar comandos em intervalo (ex: /loop 5m /test)
- `/claude-api`: Trabalhar com Claude API e SDK da Anthropic

### 6. Workspaces e Worktrees

**Worktree**:
- Permite trabalhar em múltiplas branches simultaneamente
- `EnterWorktree`: Entrar em worktree
- `ExitWorktree`: Sair de worktree

**Múltiplos Projetos**:
- Cada projeto tem sua própria memória
- Contexto isolado entre projetos
- Configurações por workspace

### 7. Plan Mode (Modo Planejamento)

**Definição**: Modo onde Claude cria um plano antes de executar ações

**Uso**:
- `EnterPlanMode`: Ativar modo planejamento
- `ExitPlanMode`: Sair do modo planejamento
- Útil para tarefas complexas que requerem múltiplos passos

## 🔄 Claude Code vs Kiro IDE

### Semelhanças
- Ambos são agentes autônomos
- Suportam contexto através de arquivos markdown
- Executam múltiplas ações em sequência
- Integram com ferramentas externas (MCP)
- Mantêm memória/contexto persistente

### Diferenças Principais

#### Claude Code
**Vantagens**:
- Interface CLI (mais leve, integração terminal)
- Modelo Claude (conversação natural excelente)
- Auto Memory (memória persistente automática)
- Skills predefinidas
- Integração nativa com editores via CLI
- Subagentes especializados (Explore)
- Gratuito (com limites de uso)

**Desvantagens**:
- Não é uma IDE completa
- Menos estruturado que spec-driven development
- Requer mais direcionamento manual

#### Kiro IDE
**Vantagens**:
- IDE completa baseada em VS Code
- Spec-driven development (mais estruturado)
- Hooks automáticos (eventos de IDE)
- Powers (pacotes completos de conhecimento)
- Interface visual completa
- Melhor para projetos grandes e estruturados

**Desvantagens**:
- Mais pesado (IDE completa)
- Requer créditos pagos
- Curva de aprendizado maior (specs, EARS)
- Mais opinativo (impõe metodologia)

### Quando Usar Cada Um

**Use Claude Code quando**:
- Trabalho em terminal/editor existente
- Tarefas rápidas e exploratórias
- Conversação natural é prioridade
- Projeto pequeno/médio
- Quer ferramenta leve
- Orçamento limitado

**Use Kiro IDE quando**:
- Projeto complexo que precisa de specs
- Time precisa de documentação formal
- Quer IDE completa com IA
- Precisa de hooks automáticos
- Desenvolvimento estruturado é prioridade
- Tem orçamento para créditos

### Uso Combinado

**Estratégia Ideal**:
1. **Kiro para projetos principais**: Desenvolvimento estruturado com specs
2. **Claude Code para tarefas rápidas**: Scripts, exploração, documentação
3. **Compartilhar contexto**: CLAUDE.md similar a steering files
4. **Memórias sincronizadas**: Aprendizados em ambas ferramentas

**Exemplo de Workflow**:
```
Projeto Principal (Kiro):
- Specs formais
- Implementação estruturada
- Hooks de qualidade

Tarefas Auxiliares (Claude):
- Análise de logs
- Scripts de automação
- Documentação rápida
- Pesquisa em codebase
```

## 🛠️ Arquitetura e Componentes

### Estrutura de Projeto

```
projeto/
├── CLAUDE.md              # Contexto principal do projeto
├── .gitignore             # Incluir .claude/ se necessário
└── código...

~/.claude/
├── config.json            # Configurações globais
└── projects/
    └── [hash-do-projeto]/
        └── memory/
            ├── MEMORY.md  # Memórias principais
            ├── patterns.md
            ├── debugging.md
            └── ...
```

### Configurações

**Arquivo**: `~/.claude/config.json`

**Conteúdo**:
- Configurações globais do Claude Code
- Permissões padrão
- Preferências de comportamento

### Permission Modes

**Níveis de Permissão**:
1. **Auto-approve**: Executa sem perguntar
2. **Prompt**: Pede confirmação
3. **Block**: Bloqueia ação

**Configuração por Ferramenta**:
- Read: Geralmente auto-approve
- Write: Recomendado prompt
- Bash: Recomendado prompt
- Edit: Auto-approve ou prompt

### Hooks

**Tipos**:
- `user-prompt-submit-hook`: Executa ao enviar prompt
- Configurados em settings do usuário
- Diferente do Kiro (menos eventos disponíveis)

## 📚 Recursos e Ferramentas

### Comandos Principais

**Interação**:
```bash
# Iniciar Claude Code no projeto
claude .

# Iniciar em modo específico
claude --mode [mode] .

# Limpar memória
claude --clear-memory .
```

**Durante Conversa**:
- Mensagens diretas ao Claude
- Referências a arquivos com caminhos
- Uso de skills com /nome
- Comandos de controle (exit, clear, etc.)

### Atalhos e Convenções

**Referências**:
- Caminhos de arquivo são detectados automaticamente
- Use `file_path:line_number` para linhas específicas
- Padrões glob para múltiplos arquivos

**Skills**:
- `/commit`: Commit automático
- `/simplify`: Revisar código
- `/loop 5m /test`: Executar teste a cada 5 minutos

### Integração com Editores

**VS Code**:
- Pode ser integrado via terminal
- Extensões podem chamar Claude Code

**Outros Editores**:
- Qualquer editor com terminal integrado
- Vim, Emacs, Sublime, etc.

## 🔗 Relacionamentos

### Pré-requisitos
- Git - Controle de versão
- Markdown - Formato de documentação
- Engenharia de Software - Conceitos de desenvolvimento
- Bash - Uso de linha de comando

### Habilita
- AI-Assisted Development - Desenvolvimento assistido por IA
- Code Review Automatizado - Análise automática de código
- Documentation Generation - Geração de documentação

### Ferramentas Relacionadas
- [[kiro_ide|Kiro-IDE]] - IDE agêntica da AWS (comparação)
- [[github_copilot|GitHub Copilot]] - Autocomplete com IA
- [[cursor|Cursor]] - IDE com IA
- VS Code - Editor popular

### Tecnologias Relacionadas
- [[claude|Claude]] - modelo base (Opus, Sonnet, Haiku)
- [[hub_ai_tools|Mapa de Ferramentas de IA]] - mapa de escolha de ferramentas de IA
- AI Agents - Conceitos de agentes
- LLM - Large Language Models
- Python - Para scripts e integrações
- TypeScript - Para desenvolvimento

## 📝 Notas Importantes

### Melhores Práticas

**CLAUDE.md**:
- Mantenha atualizado
- Seja específico sobre estrutura do projeto
- Inclua regras críticas
- Documente convenções

**Auto Memory**:
- Organize por tópicos, não cronologia
- MEMORY.md conciso (máx 200 linhas)
- Use arquivos separados para detalhes
- Atualize memórias incorretas imediatamente

**Permission Mode**:
- Comece mais restritivo
- Libere conforme ganha confiança
- Read geralmente seguro auto-approve
- Write/Bash requerem mais cuidado

**Interação**:
- Seja específico nos pedidos
- Referencie arquivos por caminho
- Use skills quando apropriado
- Confirme ações importantes

### Limitações Conhecidas
- Requer conexão com internet
- Limites de tokens por conversa
- Não é IDE completa (depende de editor)
- Memória tem limite de tamanho
- Menos estruturado que spec-driven

### Pricing (Preços)
- **Free da Claude:** não inclui Claude Code
- **Pro:** $20/mês ($17/mês no anual)
- **Max:** $100/mês (5x) e $200/mês (20x)
- **API:** pay-per-token via Anthropic Console
- **Enterprise:** sob consulta
- Pool de uso compartilhado entre Claude Code e claude.ai. Fonte: https://claude.com/pricing (verificado em 2026-11-20). Detalhes em [[hub_ai_tools|Mapa de Ferramentas de IA]].

## 📚 Recursos para Aprofundamento

### Documentação Oficial
- Documentação do Claude Code
- GitHub da Anthropic
- Release notes e updates

### Comunidade
- Discord da Anthropic
- GitHub Issues
- Fóruns de discussão

### Comparações
- [[kiro_ide|Kiro-IDE]] - Comparação detalhada
- GitHub Copilot vs Claude Code
- Cursor vs Claude Code

## Comparação Rápida: Claude Code vs Kiro

| Aspecto | Claude Code | Kiro IDE |
|---------|-------------|----------|
| **Tipo** | CLI/Agente | IDE Completa |
| **Interface** | Terminal | Visual (VS Code) |
| **Modelo** | Claude (Anthropic) | Vários modelos |
| **Metodologia** | Livre | Spec-driven |
| **Contexto** | CLAUDE.md + Memory | Steering files |
| **Automação** | Skills + Memory | Hooks + Powers |
| **Preço** | Free tier + Pro | Créditos pagos |
| **Ideal para** | Tarefas rápidas | Projetos estruturados |
| **Curva** | Baixa | Média |
| **Peso** | Leve | IDE completa |

---

**Última Atualização:** 14/03/2026
**Status:** Em Configuração e Aprendizado
**Próxima Revisão:** 21/03/2026 (1 semana)
