# Implementation Plan

## Overview

Este plano executa o `design.md` em 6 fases de um único PR, na branch `feat/expandir-catalogo-ferramentas`, criada a partir da `main`. A ordem remove o risco cedo: primeiro as rows (dados baratos e verificáveis), depois as notas do ciclo (P0), depois a evidência (P1), as âncoras (P1), as stacks (P2) e a governança final. Ao fim de cada fase, `npm run validate` e `npm test` passam, e o `content/ids.lock.json` já contém os ids criados na fase (D10).

Convenções:

- Nota nova segue o padrão de `axum.md` / `warp_rust.md`: frontmatter completo do Template-Ferramenta, seções padrão, `dataVerificacao` do dia, `fontePreco` oficial, licença lida na fonte (R6.1, R6.2).
- Toda nota nova de ferramenta exige nota de empresa correspondente em `tools/companies/` (D7), criada na mesma tarefa.
- Toda faixa que ganha nota troca `tabela:<id>` por `[[<id>|<Nome>]]` no mesmo commit (R1.2, R1.6).
- Categorias e notas novas nascem `status: rascunho`, `publico: false` (R7.4).
- Nenhum preço é estimado ou convertido; open-source gratuito registra `precoUSD: 0` com a licença e a data de leitura (R6.2).
- Row com hífen no id vira nota com underscore (`entity-framework-core` -> `entity_framework_core`), seguindo o padrão `^[a-z][a-z0-9]*(_[a-z0-9]+)*$` do id e o exemplo das notas existentes.

## Tasks

### Fase 1: rows novas e categorias novas

- [ ] 1.1 Adicionar as 15 rows ao backlog: `maven`, `jackson`, `serde`, `clap`, `cobra`, `testify`, `cargo`, `vapor`, `blazor`, `logback`, `pino`, `zap`, `structlog`, `serilog`, `tracing`
  - distribuir cada row no shard competente de `content/data/tabela/` segundo a regra vigente e confirmar pelo check `schema` (ids únicos entre shards)
  - url oficial, preco com status `verificado`, fonte e data do dia
  - _Requisitos: 2.1, 2.2, 6.1_
- [ ] 1.2 Criar a categoria `logs_estruturados` (grupo Bibliotecas) com as 6 ferramentas distribuídas nas faixas (pino, zap, structlog, logback, serilog, tracing)
  - _Requisitos: 3.3_
- [ ] 1.3 Criar a categoria `bibliotecas_cli` (grupo Bibliotecas) com clap e cobra nas faixas
  - _Requisitos: 3.4_
- [ ] 1.4 Referenciar cada row nova na faixa ou na lista de alternativas da categoria competente, e commit `feat(catalogo): rows e categorias de logs e cli`
  - _Requisitos: 2.3_

### Fase 2: notas do ciclo de linguagem (P0)

- [ ] 2.1 Testes: notas de `junit5` (java), `kotest` (kotlin), `vitest` (js/ts), `rspec` (ruby), `phpunit` (php), `testify` (go), mais a nota de `cargo` (rust: cargo test embutido no ciclo de build)
  - cada uma com empresa, licença lida e faixa de `frameworks_testes` convertida
  - _Requisitos: 1.1, 1.2, 1.4, 6.1, 6.2, 6.3_
- [ ] 2.2 Build e lint: notas de `maven` (java), `ruff` (python), `eslint`, `prettier`, `biome` (js/ts)
  - faixas de `build_lint_formatacao` convertidas; a categoria termina com 6 opções com nota
  - _Requisitos: 1.1, 3.1_
- [ ] 2.3 ORM: notas de `sqlalchemy` (python), `sqlx` e `diesel` (rust), `gorm` (go), `entity_framework_core` (csharp)
  - faixas de `orm_acesso_dados` convertidas, uma opção real por linguagem da matriz
  - _Requisitos: 1.1, 1.2_
- [ ] 2.4 Backend e HTTP: notas de `actix_web` (rust), `vertx` (java), `vapor` (swift), `httpx` (python), `reqwest` (rust)
  - _Requisitos: 1.1, 1.4_
- [ ] 2.5 Validação e serialização: notas de `jackson` (java) e `serde` (rust) em `validacao_schemas`
  - _Requisitos: 1.4_
- [ ] 2.6 Varrer as categorias tocadas: trocar toda referência `tabela:<id>` que já tem nota por `[[id|Nome]]`; reduzir repetição da mesma ferramenta em mais de uma faixa quando a linguagem ganhou representante; registrar `excecao` para faixas sem sentido
  - _Requisitos: 1.5, 1.6_
- [ ] 2.7 Commit `feat(catalogo): ciclo de linguagem com testes build orm e http`
  - _Requisitos: 7.1_

### Fase 3: evidência nas categorias fracas (P1)

- [ ] 3.1 Gateway: notas de `nginx`, `envoy`, `traefik`, `istio` (e `apache_apisix` se a faixa pedir a quinta opção)
  - _Requisitos: 3.2_
- [ ] 3.2 Segurança e CD: notas de `sonarqube`, `snyk`, `trivy`, `helm`, `argo_cd`
  - _Requisitos: 3.2_
- [ ] 3.3 CI e mensageria: notas de `gitlab`, `jenkins`, `apache_kafka`, `nats`
  - _Requisitos: 3.2_
- [ ] 3.4 Observabilidade, carga e QA: notas de `prometheus`, `sentry`, `k6`, `locust`, `testcontainers`
  - _Requisitos: 3.2_
- [ ] 3.5 Frontend e desktop: notas de `nextjs`, `vue`, `blazor`, `electron`, `tauri`, `qt`, `javafx`, `dotnet_maui`
  - _Requisitos: 3.2_
- [ ] 3.6 Logs e CLI: notas de `pino`, `zap`, `structlog`, `logback`, `serilog`, `tracing`, `clap`, `cobra` nas categorias criadas na fase 1
  - _Requisitos: 3.3, 3.4_
- [ ] 3.7 Commit `feat(catalogo): evidencia em gateway seguranca ci mensageria logs e desktop`
  - _Requisitos: 7.1_

### Fase 4: âncoras de linguagem (P1)

- [ ] 4.1 Criar a categoria `linguagens_programacao` (grupo Frameworks por camada)
  - _Requisitos: 4.1_
- [ ] 4.2 Criar as 12 âncoras: `python`, `javascript`, `typescript`, `java`, `kotlin`, `go`, `rust`, `csharp`, `php`, `ruby`, `swift`, `dart`
  - cada uma com `tipos: [LINGUAGEM, SOFTWARE]` (ou `SOFTWARE`, se o validador recusar `LINGUAGEM`), toolchain embutida documentada e links para as categorias do ciclo com as notas correspondentes
  - lacunas registradas no corpo da âncora para swift (ORM) e dart (backend, ORM)
  - _Requisitos: 4.1, 4.2, 4.4_
- [ ] 4.3 Recategorizar `kotlin` de `frameworks_mobile` para `linguagens_programacao`, sem mudar o id; conferir que `frameworks_mobile` continua coberta por `kotlin_multiplatform` e as faixas não ficam órfãs
  - _Requisitos: 4.3_
- [ ] 4.4 Apontar `linguagens_programacao` no `hub_tools` como porta de entrada por linguagem e commit `feat(catalogo): ancoras de linguagem`
  - _Requisitos: 4.5_

### Fase 5: stacks Rust e JVM (P2)

- [ ] 5.1 Criar a stack `servico_rust_alto_desempenho` (axum, tokio, sqlx, serde, cargo, reqwest, tracing) com fontes revisadas, `quando_usar`, `quando_evitar` e `lacuna` onde a faixa não tiver nota
  - _Requisitos: 5.1, 5.3_
- [ ] 5.2 Criar a stack `monolito_jvm_corporativo` (spring_boot, junit5, maven, jackson, hibernate_orm, postgresql, logback) com os mesmos requisitos de estrutura
  - _Requisitos: 5.2, 5.3_
- [ ] 5.3 Listar as duas stacks no `hub_stacks` e commit `feat(stacks): rust de alto desempenho e jvm corporativo`
  - _Requisitos: 5.4_

### Fase 6: governança e PR

- [ ] 6.1 Varrer o catálogo inteiro contra R1.6: nenhuma faixa com `tabela:<id>` apontando para nota existente; ids das duas stacks, categorias e notas novas presentes no `ids.lock.json`; lock sem remoções
  - _Requisitos: 1.6, 6.5, 7.3_
- [ ] 6.2 Rodar `npm run validate`, `npm test`, `npm run build` e `npm run smoke`; corrigir notas até tudo verde sem desligar check
  - _Requisitos: 7.2, 7.5_
- [ ] 6.3 Abrir o PR único `feat/expandir-catalogo-ferramentas -> main`, título em Conventional Commits, descrição com a matriz do ciclo antes/depois, e aguardar os checks obrigatórios e a aprovação humana
  - _Requisitos: 7.1, 7.2_

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2", "1.3", "1.4"] },
    { "id": 2, "tasks": ["2.1", "2.2", "2.3", "2.4", "2.5"], "note": "notas independentes entre si, todas dependem só da fase 1" },
    { "id": 3, "tasks": ["2.6"] },
    { "id": 4, "tasks": ["2.7"] },
    { "id": 5, "tasks": ["3.1", "3.2", "3.3", "3.4", "3.5"] },
    { "id": 6, "tasks": ["3.6"] },
    { "id": 7, "tasks": ["3.7"] },
    { "id": 8, "tasks": ["4.1", "4.3"], "note": "a recategorizacao do kotlin nao depende das ancoras novas" },
    { "id": 9, "tasks": ["4.2"] },
    { "id": 10, "tasks": ["4.4"] },
    { "id": 11, "tasks": ["5.1", "5.2"] },
    { "id": 12, "tasks": ["5.3"] },
    { "id": 13, "tasks": ["6.1"] },
    { "id": 14, "tasks": ["6.2"] },
    { "id": 15, "tasks": ["6.3"] }
  ]
}
```

## Notes

- **Por fases 1 e 2 nessa ordem:** a row é o dado mais barato de verificar; a nota construída sobre row existente nunca inventa preço nem url (D6, D8).
- **Ponto de parada:** se o validador recusar `tipos: [LINGUAGEM]` ou algum valor de frontmatter, a tarefa usa o valor aceito mais próximo (`SOFTWARE`) e registra a decisão no corpo da nota (R4.4).
- **Amostragem de preço:** todas as ferramentas do escopo são open-source gratuitas ou têm página oficial de preço; nenhuma exige cotação. Ferramentas comerciais (snyk, sonarqube, sentry) registram o plano gratuito verificável e marcam `não verificado` o que não tiver preço público.
- **Backlog restante:** as ~570 entradas `tabela:` fora do escopo continuam registradas para futuras specs; a regra R1.6 garante que nenhuma delas vira dead-end reverso (nota existente referenciada como tabela).
- **Contagem final esperada:** 70 notas de ferramenta, 2 categorias, 15 rows, 2 stacks, cerca de 10 empresas novas em `tools/companies/`.
