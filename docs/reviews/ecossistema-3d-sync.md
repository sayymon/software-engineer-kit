# Sincronia da branch `feat/ecossistema-3d` com `feat/fase-0-segmentar-comum`

Checklist para acompanhar o que a fase 0 muda e pode afetar o Ecossistema 3D. Última checagem: ao criar a worktree (base `8c99bcf`, mesma de `main`).

## Mudanças em andamento na fase 0 (não commitadas na checagem)

| Mudança | Afeta o 3D? | Ação |
|---|---|---|
| `content/guide/comum.yaml` dividido em `content/guide/catalogos/*.yaml` (papéis, artefatos, variáveis, técnicas, requisitos, fontes, decisor, ferramentas) | Não diretamente: o 3D lê entidades derivadas pelo `SiteIndex`. Os ids devem ficar iguais | Depois do merge, rodar `npx vitest run tests/ecossistema` e conferir que as contagens por tipo não mudam |
| `lib/guide/entities.ts` e `lib/guide/load.ts` leem `catalogos/*.yaml` | Sim, indiretamente (origem dos nós `papel`, `artefato`, `variavel`, `tecnica`) | Mesmo teste acima. Se um id mudar, `ids.lock.json` falha antes |
| `tools/validate/checks/terms.ts`: ignora `.worktrees`, prefixo `appsec-` e e-mails de exemplo | Sim: em worktree o arquivo `.git` (com caminho absoluto) quebra o check `terms` | Incluir `.git` em `SKIP_FILES` do `terms.ts`, ou rodar `validate` fora de worktrees |
| `vitest.config.ts`: `testTimeout` e `hookTimeout` de 30 s | Ajuda: os testes do payload calculam o layout (cerca de 15 s) | Manter. Os testes do 3D já definem timeout próprio onde precisam |
| `docs`: `comum.yaml` linha 2007 (papéis) | Não | Atualizar a referência em `docs/prd.md` para `content/guide/catalogos/papeis.yaml` |
| Specs `experiencia-fluxos-catalogo` (`tasks.md` e `tasks.meta.json`) | Sim: define o Catálogo e o módulo de facetas | Quando o módulo de facetas existir, `lib/ecossistema/filtro.ts` passa a usá-lo, e a página vira modo do Catálogo |

## Como checar

```bash
git -C <repo> log feat/fase-0-segmentar-comum --oneline -5
git -C <repo> diff --stat main..feat/fase-0-segmentar-comum
git -C <repo> status --short
```

Depois de qualquer merge da fase 0 em `main`: `git rebase main` na branch do 3D, `npx vitest run`, `npm run validate` e `npm run build`.
