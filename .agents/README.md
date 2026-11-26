# .agents

Fonte única das definições de agente. Os arquivos de cada ferramenta são gerados.

```
.agents/
  roles/*.md          um agente por papel (frontmatter: id, name, description, mcp)
  mcp.servers.json    MCPs disponíveis (context7, playwright, github)
  SKILLS.md           skills existentes e propostas por papel
  tasks/              rascunhos locais (ignorado pelo git)
```

## Gerar

```bash
npm run agents:sync
```

| Ferramenta | Agentes | MCPs |
|---|---|---|
| Claude Code | `.claude/agents/*.md` | `.mcp.json` |
| OpenCode | `.opencode/agents/*.md` | `opencode.json` (desligados por padrão, cada agente liga os seus) |
| Kiro | `.kiro/agents/*.json` | `.kiro/settings/mcp.json` |

## Regras de geração

- O papel precisa existir em `papeis` de `content/guide/comum.yaml`. O script falha se `atuacao_de_agente` for `nao`.
- `execucao` recebe edição e shell. `apoio` recebe somente leitura.
- Todo MCP citado em `mcp:` precisa estar em `mcp.servers.json`.

## Novo papel ou MCP

1. Papel: crie `roles/<nome>.md` copiando um existente e rode o sync.
2. MCP: acrescente em `mcp.servers.json`, cite no `mcp:` dos papéis e rode o sync.
