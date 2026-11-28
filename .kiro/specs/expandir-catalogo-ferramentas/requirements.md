# Requirements Document

## Introduction

Esta spec expande o catálogo de ferramentas do kit para corrigir a assimetria de ecossistemas percebida pela pessoa que usa o kit: procurar Java ou Rust hoje encontra frameworks isolados, sem ciclo de ferramentas ao redor, sem nota de linguagem e sem stack. A revisão holística que motivou esta spec mediu o catálogo em novembro de 2026 e encontrou:

- 282 notas atômicas, 118 categorias, 15 stacks e 1.157 linhas de backlog em `content/data/tabela/*.json`.
- 647 entradas `tabela:` referenciadas nas faixas das categorias (`maisBarata`, `custoBeneficio`, `qualidadeMaxima`, `essenciais`) que apontam para linhas de backlog sem nota atômica: quem segue uma faixa encontra becos sem saída.
- Ciclo incompleto por linguagem: `frameworks_testes` não tem nenhuma opção Java (JUnit está só no backlog), `orm_acesso_dados` não tem opção Rust, Go, .NET ou Python (SQLAlchemy e sqlx estão só no backlog), `build_lint_formatacao` tem uma única ferramenta (gradle).
- Essenciais ausentes até do backlog: maven, jackson, serde, clap, cobra, testify, serilog, logback e qualquer biblioteca de log estruturado.
- Zero stacks em Rust; nenhuma stack de backend JVM corporativo dedicada.
- `kotlin.md`, única nota de linguagem do kit, categorizada em `frameworks_mobile`.

O trabalho é dividido em três prioridades: **P0** fechar o ciclo de linguagem (testes, build, ORM, backend, HTTP) e os buracos do backlog; **P1** dar evidência às categorias fracas e criar as âncoras de linguagem; **P2** criar as stacks Rust e JVM. Cada prioridade vira fases de um único PR.

### Fora de escopo

- Converter as 647 entradas `tabela:` fora das categorias citadas nesta spec (backlog de longo prazo, futuras specs).
- Conteúdo do guia (`content/guide/`), incluindo novos ids `cf_*` em `catalogos/ferramentas.yaml` para as categorias novas: as categorias nascem com `guia: []` e a conexão com o guia é decisão editorial posterior.
- Site, UX, grafo 3D e overlay `en` (hoje vazio; notas nascem em pt-BR).
- Notas para ferramentas embutidas na toolchain padrão de cada linguagem (ex.: `go test`, `gofmt`, `dotnet format`, XCTest): a âncora da linguagem cobre o que é embutido.

## Glossary

- **Nota_atômica**: arquivo em `content/pt-BR/tools/catalog/<id>.md` seguindo o Template-Ferramenta (frontmatter controlado + seções padrão), id igual ao nome do arquivo.
- **Row**: linha de ferramenta em `content/data/tabela/*.json` (id, nome, categorias por nome, empresa, url, preco com status/fonte/data). O conjunto de rows é o **backlog** do catálogo.
- **Tabela**: convenção de referência `tabela:<id>` usada nas faixas de categoria quando a ferramenta só tem row, sem nota.
- **Faixa**: campo da categoria (`maisBarata`, `custoBeneficio`, `qualidadeMaxima`, `essenciais`) que lista as três opções de referência.
- **Ciclo_de_linguagem**: conjunto mínimo de categorias que uma linguagem precisa cobrir para um projeto real: `frameworks_testes`, `build_lint_formatacao`, `orm_acesso_dados`, `frameworks_backend` e `clientes_http_api`, cada uma com ao menos uma opção real para a linguagem, ou lacuna registrada quando não existe ferramenta convencional.
- **Âncora**: nota_atómica da linguagem em si (ex.: `rust`), morando na categoria `linguagens_programacao`, que apresenta a linguagem, aponta as categorias do seu Ciclo_de_linguagem e cobre a toolchain embutida.
- **Lacuna**: registro explícito, no padrão já usado pelas stacks, de uma faixa vazia com motivo ("qualidadeMaxima: ..."). Categorias usam o campo `excecao` para o mesmo fim.
- **Categoria_decoy**: categoria com menos de três opções reais nas faixas (ex.: `build_lint_formatacao` só tem gradle).
- **Vocabulário_de_linguagens**: os 14 valores do campo `linguagens` fixados em `hub_tools.md`: `python`, `javascript`, `typescript`, `java`, `kotlin`, `go`, `rust`, `csharp`, `php`, `ruby`, `swift`, `dart`, `sql`, `agnostica`.
- **Template-Ferramenta**: estrutura de nota usada pelo catálogo (frontmatter: id, tipo `ferramenta`, nome, tipos, empresa, aliases, categorias, modeloContratacao, precoUSD, plataformas, linguagens, porte, segmentos, restricoes, dataVerificacao, fontePreco, precoMedio, licenca, tags; corpo com seções Informações, Descrição, Quando Utilizar, Quando NÃO Utilizar, Compatibilidade, Restrições, Alternativas, Custo, Relacionamentos).

## Requirements

### Requirement 1: Ciclo de linguagem completo (P0)

**User Story:** Como engenheiro que filtra o catálogo por linguagem, quero encontrar pelo menos uma opção real de teste, build, ORM, backend e cliente HTTP para a minha linguagem, para que eu monte um projeto sem sair do kit.

#### Acceptance Criteria

1. THE categorias `frameworks_testes`, `build_lint_formatacao`, `orm_acesso_dados`, `frameworks_backend` e `clientes_http_api` SHALL oferecer ao menos uma opção com nota atômica para cada linguagem do Vocabulário_de_linguagens, exceto `sql` e `agnostica`, nos termos da matriz do ciclo do `design.md` (célula "embutida" fica coberta pela Âncora da linguagem; célula "lacuna" fica registrada na categoria).
2. WHEN a ferramenta exigida pela matriz tem row no backlog, THEN THE task SHALL criar a nota atômica a partir da row e trocar a referência `tabela:<id>` por `[[<id>|<Nome>]]` na faixa da categoria.
3. WHERE a ferramenta exigida pela matriz não tem row, THEN THE backlog SHALL ganhar a row antes da nota (Requisito 2).
4. THE notas novas do ciclo SHALL incluir: `junit5`, `kotest`, `vitest`, `rspec`, `phpunit`, `testify`, `maven`, `ruff`, `eslint`, `prettier`, `biome`, `cargo`, `sqlalchemy`, `sqlx`, `diesel`, `gorm`, `entity_framework_core`, `actix_web`, `vertx`, `vapor`, `httpx`, `reqwest`, `jackson`, `serde`.
5. THE matrizes de faixa das categorias tocadas SHALL deixar de repetir a mesma ferramenta em mais de uma faixa quando a linguagem ganhar representante próprio.
6. WHERE a nota atômica de uma ferramenta já existe, THE faixa da categoria SHALL referenciar por `[[id|Nome]]` e não por `tabela:id` (vale para todo o catálogo, não só para as categorias novas).

### Requirement 2: Backlog sem buracos nos essenciais (P0)

**User Story:** Como mantenedor do catálogo, quero que os essenciais de cada ecossistema tenham row no backlog mesmo antes da nota existir, para que nenhuma lacuna estrutural fique invisível.

#### Acceptance Criteria

1. THE backlog SHALL ganhar rows verificadas (url, preço com status e data) para: `maven`, `jackson`, `serde`, `clap`, `cobra`, `testify`, `cargo`, `vapor`, `blazor` e as bibliotecas de log do Requisito 3.
2. THE novas rows SHALL seguir o formato exato das rows existentes e passar no check `schema` (ids únicos entre shards).
3. THE nova row SHALL ser referenciada na faixa ou na lista de alternativas da categoria competente no mesmo commit.

### Requirement 3: Evidência nas categorias fracas e transversais (P1)

**User Story:** Como engenheiro que navega pelas categorias, quero faixas com opções reais nas categorias hoje vazias ou de uma ferramenta só, para que a categoria sirva de decisão e não de placeholder.

#### Acceptance Criteria

1. THE categoria `build_lint_formatacao` SHALL terminar com pelo menos 5 opções com nota (gradle mais as notas do ciclo).
2. THE categorias `frameworks_desktop`, `gateway_api_service_mesh`, `seguranca_codigo`, `containers_orquestracao`, `ci_cd_deploy`, `mensageria_streaming`, `testes_carga_desempenho`, `observabilidade_apm`, `frameworks_frontend_web` e `testes_qa` SHALL terminar cada uma com pelo menos 3 opções com nota, criadas a partir das rows mais referenciadas do backlog (nginx, envoy, traefik, istio, sonarqube, snyk, trivy, helm, argo_cd, gitlab, jenkins, apache_kafka, nats, k6, locust, prometheus, sentry, testcontainers, nextjs, vue, blazor, electron, tauri, qt, javafx, dotnet_maui, entre as do design).
3. THE categoria nova `logs_estruturados` (grupo Bibliotecas) SHALL existir com uma nota por linguagem: `pino` (js/ts), `zap` (go), `structlog` (python), `logback` (java), `serilog` (csharp) e `tracing` (rust).
4. THE categoria nova `bibliotecas_cli` (grupo Bibliotecas) SHALL existir com as notas `clap` (rust) e `cobra` (go).
5. THE cada categoria tocada SHALL manter suas três faixas preenchidas, registrando `excecao` quando uma faixa não fizer sentido.

### Requirement 4: Âncoras de linguagem (P1)

**User Story:** Como pessoa que chega ao kit procurando uma linguagem (Java, Rust, Go...), quero uma nota da linguagem que apresente o ecossistema e linke as categorias do seu ciclo, para que eu comece por ela e não por um framework isolado.

#### Acceptance Criteria

1. THE categoria `linguagens_programacao` (grupo Frameworks por camada) SHALL existir com as 12 notas: `python`, `javascript`, `typescript`, `java`, `kotlin`, `go`, `rust`, `csharp`, `php`, `ruby`, `swift`, `dart`.
2. THE cada Âncora SHALL cobrir: o que é, quando usar e quando não usar, a toolchain embutida (testes, formatação, build), e links para as categorias do seu Ciclo_de_linguagem com as notas correspondentes.
3. THE nota `kotlin` SHALL ser recategorizada de `frameworks_mobile` para `linguagens_programacao`, mantendo a nota idêntica; o caminho mobile do Kotlin continua coberto por `kotlin_multiplatform`.
4. THE nota de linguagem SHALL usar campo `linguagens` com o próprio valor e `tipos` com `LINGUAGEM` confirmado contra os valores aceitos pelo schema (se o valor não for aceito, usar `SOFTWARE`).
5. THE hub_tools SHALL passar a apontar a categoria `linguagens_programacao` como porta de entrada por linguagem.

### Requirement 5: Stacks para Rust e JVM corporativo (P2)

**User Story:** Como tech lead montando um time, quero uma stack Rust de alto desempenho e uma stack JVM corporativa de referência, para que o kit cubra os dois extremos de escolha que hoje não têm stack.

#### Acceptance Criteria

1. THE stack `servico_rust_alto_desempenho` SHALL existir cobrindo API de alto desempenho com axum, tokio, sqlx, serde e cargo, com `quando_usar`, `quando_evitar`, fontes revisadas e `lacuna` registrada onde uma faixa não tiver opção com nota.
2. THE stack `monolito_jvm_corporativo` SHALL existir cobrando monólito corporativo com spring_boot, junit5, maven, jackson, hibernate_orm e postgresql, com os mesmos requisitos de estrutura.
3. THE stacks novas SHALL referenciar somente notas existentes ou lacunas registradas, sem `tabela:`.
4. THE `hub_stacks` SHALL listar as duas stacks novas.

### Requirement 6: Qualidade dos dados das notas

**User Story:** Como pessoa que decide com base no kit, quero preço, licença e data de verificação reais em cada nota nova, para que o kit continue confiável.

#### Acceptance Criteria

1. THE cada nota nova SHALL ter `dataVerificacao`, `fontePreco` (URL oficial do projeto ou repositório) e `licenca` lida na fonte, sem preço estimado ou convertido.
2. WHEN a ferramenta é open-source e gratuita, THE nota SHALL registrar `precoUSD: 0` e a licença com a data de leitura, no padrão das notas `axum` e `warp_rust`.
3. THE cada nota nova SHALL ter nota de empresa em `tools/companies/` (nova quando o fabricante não existir; padrão `<id>_comunidade` quando mantida pela comunidade).
4. THE restrições relevantes SHALL ser registradas; sem restrições conhecidas, usar o texto padrão do catálogo.
5. THE `content/ids.lock.json` SHALL apenas crescer com os ids novos, sem remover nenhum id.

### Requirement 7: Governança e validação

**User Story:** Como dono do repositório público, quero a expansão entregue com os mesmos controles de qualquer mudança, para que o catálogo continue passando em todos os gates.

#### Acceptance Criteria

1. THE entrega SHALL ser um único PR na branch `feat/expandir-catalogo-ferramentas` com um commit por fase em Conventional Commits.
2. THE `npm run validate`, `npm test`, `npm run build` e `npm run smoke` SHALL passar ao fim de cada fase.
3. THE check de termos públicos e o gitleaks SHALL reportar zero ocorrências nas notas novas.
4. THE categorias novas SHALL nascer com `status: rascunho` e `publico: false`, como as categorias existentes.
5. IF qualquer check reprovar por causa de uma nota nova, THEN a fase corrige a nota antes de seguir, sem desligar o check.
