# Skills reutilizadas por papel

Este projeto reutiliza skills versionadas e verificáveis antes de criar uma nova. Uma skill local só entra quando existir uma lacuna demonstrada no fluxo do Kit.

## Instalação atual

O manifesto `skills-lock.json` fixa a origem, o commit e o hash de conteúdo de 20 skills. O CLI `skills` 1.9.0 instalou cópias para Claude Code e Kiro CLI; OpenCode descobre as mesmas skills pelo diretório universal de agentes.

| Fonte | Commit fixado | Skills |
|---|---|---:|
| [anthropics/skills](https://github.com/anthropics/skills) | `e4bb5d960d87126ff3b3a8af1a104b7db67560ba` | 6 |
| [mattpocock/skills](https://github.com/mattpocock/skills) | `6f7f7831a625f040a8e06a0e7954826b87ce775a` | 14 |

As skills da Anthropic são exemplos oficiais e educacionais, conforme o [README](https://github.com/anthropics/skills/blob/main/README.md). Elas continuam passando por revisão de uso no contexto deste projeto. As skills do Matt Pocock foram escolhidas por complementar o ciclo de engenharia orientado a spec e revisão.

## Atualizar ou restaurar

```bash
# Atualiza as skills do projeto e regrava o lockfile se a origem mudou.
npx skills update --project --yes

# Restaura as versões fixadas no lockfile, sem buscar a versão mais nova.
npx skills experimental_install --frozen-lockfile \
  --agent claude-code kiro-cli opencode
```

Ao atualizar, revise `skills-lock.json` e as mudanças em cada `SKILL.md` antes de aceitá-las. Skills podem orientar ferramentas com permissões completas. As skills `to-spec`, `to-tickets`, `triage` e `pr` podem produzir artefatos ou interagir com trackers quando invocadas, portanto exigem confirmação humana antes de qualquer ação externa.

## Catálogo instalado

### Anthropic

| Skill | Papel principal | Uso no Kit |
|---|---|---|
| `doc-coauthoring` | PM, Tech Lead, Arquiteto | Propostas, documentação e specs com revisão iterativa |
| `frontend-design` | Designer, Dev | Direção visual intencional para o site Astro |
| `webapp-testing` | QA, Dev | Jornadas do site com Playwright |
| `internal-comms` | PM, Suporte, SRE, RTE | Atualizações para stakeholders, incidentes e entregas |
| `mcp-builder` | Engenharia de IA, Dev | Criar MCPs quando uma integração concreta justificar |
| `skill-creator` | Engenharia de IA | Medir e evoluir uma skill local somente após validar a lacuna |

### Matt Pocock

| Skill | Papel principal | Uso no Kit |
|---|---|---|
| `ask-matt` | Todos | Escolher a skill ou fluxo adequado para a demanda |
| `code-review` | Tech Lead, Dev, Segurança | Revisar mudanças contra padrões do repositório e a spec |
| `diagnosing-bugs` | Dev, QA, SRE | Diagnóstico orientado por evidências para bugs e regressões |
| `domain-modeling` | Arquiteto, Engenharia de dados | Vocabulário do domínio, glossário e ADRs |
| `grill-with-docs` | PM, Tech Lead, Arquiteto | Pressionar planos e decisões enquanto registra ADR e glossário |
| `grilling` | PM, Tech Lead, Arquiteto | Entrevista socrática para testar premissas antes de uma decisão relevante |
| `implement` | Dev, DevOps | Executar trabalho que já tenha spec ou ticket aprovado |
| `pr` | Dev, Tech Lead | Descrever PR com contexto, risco e validação |
| `research` | PM, Arquiteto, Engenharia de IA | Pesquisar fontes primárias e registrar achados no repositório |
| `tdd` | Dev, QA | Red, green, refactor para feature e correção |
| `to-spec` | PM, Tech Lead | Sintetizar uma conversa em spec antes de implementar |
| `to-tickets` | PM, Tech Lead, RTE | Decompor spec em tickets com dependências explícitas |
| `triage` | PM, Suporte, QA | Classificar issues e PRs externos e produzir brief para agentes |
| `wayfinder` | RTE, Tech Lead | Planejar trabalho que excede uma sessão e resolver decisões em ordem |
| `writing-for-agents` | Engenharia de IA | Escrever ou alterar instruções, skills e AGENTS.md |

## Complemento nativo do Kiro

Estas skills já estão disponíveis no ambiente Kiro e completam o catálogo externo:

| Necessidade | Skill nativa |
|---|---|
| Requisitos e critérios de aceite | `requirements-engineering`, `bdd-guide` |
| Correção e investigação | `surgical-patch`, `safe-refactor`, `investigate-first` |
| Arquitetura e mudança compatível | `ddd-review`, `migration`, `lean-build` |
| Validação final | `verify-and-stop` |
| Segurança de aplicação | `appsec-rules` |
| Eficiência de agentes | `kiro-token-economy`, `caveman-learn` |

## Regra para uma nova skill

Crie uma skill local somente após registrar: a lacuna real que ela cobre, a skill existente avaliada, por que ela não atende, o papel responsável, a entrada, a saída verificável e a estratégia de avaliação. A implementação passa por `skill-creator` e revisão humana.
