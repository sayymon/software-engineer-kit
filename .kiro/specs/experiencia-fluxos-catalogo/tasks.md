# Implementation Plan

## Overview

Este plano executa o `design.md` em 14 fases (Fase 0 a Fase 13), cada uma com um commit em Conventional Commits, num único PR na branch `spec/experiencia-fluxos-catalogo`, criada a partir da `main`. A Fase 0 segmenta o `content/guide/comum.yaml` em arquivos por catálogo em `content/guide/catalogos/`, sem mudar o guia mesclado (hashes e ordem das chaves iguais), para que as fases seguintes editem arquivos menores. Todo commit de fase, inclusive o da Fase 0, entra na branch `spec/experiencia-fluxos-catalogo`. A Fase 1 é o spike de desempenho (S1 a S6 do design): nenhum código de interação do Diagrama começa antes de o dono confirmar o go/no-go dela (Requisito 20.13). O escopo de dados e de aceite é a Demanda_Piloto `feature` (Requisito 18). As demais Demandas não podem sofrer regressão.

Ao fim de cada fase, `npm run validate`, `npm test`, `npm run build` e `npm run smoke` passam, e `npm run test:browser` passa para os specs que a fase criou ou alterou.

Convenções:

- Cada tarefa cabe numa sessão de agente e termina com uma verificação objetiva (teste, `validate`, `build` ou spec Playwright). Tarefas de medição rodam sozinhas na onda, porque outro processo pesado falsearia os tempos.
- Toda propriedade do design vira teste `fast-check` com no mínimo 100 execuções e o comentário `Feature: experiencia-fluxos-catalogo, Property N: <enunciado>`. Propriedades do mesmo módulo ficam na mesma tarefa de teste.
- Specs de navegador usam movimento real do ponteiro (mouse down, move, up) e leem `page.url()` depois de cada interação (Requisitos 15.10 e 16.6).
- Todo texto novo de interface entra em `site/src/i18n` em pt-BR e en na mesma tarefa que o cria. A fase 10 audita a paridade das chaves.
- Arquivos de código novos levam o cabeçalho SPDX com a licença MIT. Nenhuma tarefa escreve caminho absoluto local, e-mail ou segredo (check `public-terms`).

## Tasks

### Fase 0: segmentar o comum.yaml em catálogos

- [x] 0.1 Criar o script one-off `tools/guide/split-comum.ts` (determinístico, baseado em texto) que corta `content/guide/comum.yaml` em `content/guide/catalogos/`
  - cada comentário que precede uma chave de topo vai junto com ela, e os comentários do cabeçalho ficam no `comum.yaml`
  - destino por chave: `tecnicas.yaml` (`tecnicas`, `abordagens`, `padroes`, `estrategias`), `artefatos.yaml`, `variaveis.yaml`, `papeis.yaml`, `requisitos.yaml`, `ferramentas.yaml` (`categorias_ferramenta`), `fontes.yaml` e `decisor.yaml` (`decisor_construir_comprar_assinar`)
  - o `comum.yaml` mantém `versao`, `ordem_das_demandas` e o cabeçalho explicativo
  - antes de cortar, registrar a linha de base: hash do documento mesclado por coleção e a ordem das chaves de topo
  - verificação: duas execuções produzem saída idêntica e o modo `--dry-run` lista cada chave com o arquivo de destino
  - agentes: executor `dev`, revisores `arquiteto` e `qa`
  - _Requisitos: 15.7_
- [x] 0.2 Alterar `lib/guide/load.ts` para ler a constante ordenada `ARQUIVOS_DE_CATALOGO` (em `catalogos/`, na ordem que mantém a ordem das chaves do documento mesclado igual à de hoje)
  - `hasGuide` segue ligado ao `comum.yaml`, e o layout legado de arquivo único continua funcionando (fixtures e `--yaml <arquivo>`)
  - `GuideLoadError` claro quando falta um arquivo de catálogo ou quando uma chave aparece em dois arquivos
  - testes unitários, incluindo chave duplicada entre arquivos e ordem das chaves
  - agentes: executor `dev`, revisores `arquiteto` e `qa`
  - _Requisitos: 15.7_
- [x] 0.3 Rodar o corte no guia real e provar a equivalência
  - hashes por coleção iguais aos de `tests/guide/expected/parity.json` e ordem das chaves mesclada idêntica, no novo `tests/guide/catalogos.test.ts`
  - `npm run validate` estrito e `npm test` verdes, com goldens Mermaid e `content/ids.lock.json` sem alteração
  - agentes: executor `dev`, revisores `arquiteto` e `qa`
  - _Requisitos: 15.7, 10.6_
- [x] 0.4 Atualizar os leitores do caminho antigo: `lib/content/index.ts`, `lib/guide/entities.ts`, `tools/validate/checks/flows.ts`, `tools/guide/cli.ts` e `tools/agents/sync.ts` (papéis agora vêm de `catalogos/papeis.yaml`)
  - ajustar mensagens de erro e testes que citam `comum.yaml`
  - verificação: `npm run validate`, `npm test` e `npm run build` verdes
  - agentes: executor `dev`, revisores `arquiteto` e `qa`
  - _Requisitos: 15.7_
- [x] 0.5 Atualizar os textos que citam o caminho
  - `AGENTS.md` (mapa do repositório), prompts de `.agents/roles/*.md` (`papeis` agora em `content/guide/catalogos/papeis.yaml`) e depois `npm run agents:sync`
  - `docs/content-contract.md`, `docs/prd.md`, `docs/reviews/guia-demandas-review.md` onde nomeia o caminho, e `.kiro/steering/product.md`
  - nesta spec: tarefas 2.5 a 2.9, `design.md` e `requirements.md`, em toda menção a `comum.yaml` que agora significa um catálogo (por exemplo `categorias_ferramenta` em `catalogos/ferramentas.yaml`)
  - adendo curto "Atualização: catálogos em arquivos" em `docs/adr/0001-yaml-como-fonte-unica.md`: o YAML segue como fonte única e o loader mescla os arquivos
  - verificação: `npm run validate` e o check `public-terms` verdes
  - agentes: executor `dev`, revisores `arquiteto` e `qa`
  - _Requisitos: 15.7_
- [x] 0.6 Commit `refactor(guia): segmenta o comum.yaml em catálogos`
  - _Requisitos: 15.7_

### Fase 1: spike de desempenho

- [x] 1.1 Criar o harness de medição em `tests/browser/performance.spec.ts` (sem asserção ainda) e `tests/browser/helpers/medicao.ts`
  - CPU 4x via CDP `Emulation.setCPUThrottlingRate`, p95 de 10 execuções, tamanho gzip nível 9 por grupo (carga inicial e carga do Diagrama) e `du -sk site/dist`
  - registrar a linha de base atual como JSON em `docs/spike-fluxos/baseline.json`
  - verificação: `npm run build` e `npx playwright test tests/browser/performance.spec.ts` produzem o JSON
  - _Requisitos: 15.8, 20.13_
- [x] 1.2 Medir S1 e S2 em `tests/browser/spike/s1-s2.spec.ts`
  - S1: um `mermaid.render` por Conjunto_Expandido (Visão geral sintética, 1 raia, 5 raias, `completo`) e verificação do modelo linear previsto
  - S2: `maxTextSize` e `maxEdges` elevados, `layout: 'elk'` contra dagre (com custo em kB gzip), `htmlLabels: false` e `flowchart.curve`, com efeito no tempo, no SVG e no `label-overlap`
  - gravar os números em `docs/spike-fluxos/s1-s2.json`
  - _Requisitos: 20.13, 20.9, 20.10_
- [x] 1.3 Medir S3 e S4 em `tests/browser/spike/s3-s4.spec.ts`
  - S3: Mermaid em iframe com `sandbox` sem `allow-same-origin` e tentativa em Worker, medindo a resposta do mouse (alvo: menos de 100 ms durante um render de 3 s)
  - S4: cache de SVG por conjunto, render antecipado com `requestIdleCallback`, custo de memória e de CPU
  - gravar os números em `docs/spike-fluxos/s3-s4.json`
  - _Requisitos: 20.9, 20.13_
- [x] 1.4 Medir S5 em `tests/browser/spike/s5.spec.ts`: protótipo descartável do Renderizador próprio (`@dagrejs/dagre` em Worker, SVG gerado pelo kit) para 224 nós
  - medir tempo, kB gzip e diferença visual contra o golden `feature.completo.mmd`
  - o protótipo vive só em `tests/browser/spike/` e não entra no build
  - gravar os números em `docs/spike-fluxos/s5.json`
  - _Requisitos: 20.13, 19.2_
- [x] 1.5 Medir S6 em `tests/browser/spike/s6.spec.ts`: build ESM dividida do Mermaid 11.17.2 (flowchart e dagre por `import()`) servida por `tests/browser/serve.ts`
  - provar SVG idêntico ao do bundle único para `feature.completo`, `feature.feat_orq` e a Visão geral sintética
  - medir kB gzip pela rede, número de requisições e `label-overlap`
  - gravar os números em `docs/spike-fluxos/s6.json`
  - _Requisitos: 15.8, 15.12, 20.13_
- [x] 1.6 Escrever `docs/spike-fluxos-desempenho.md` com as tabelas de S1 a S6 e a seção "Resultado do spike" no `design.md`
  - decisão registrada para: Mermaid (ESM dividida, bundle único como fallback ou Renderizador próprio), estratégia de expansão (um render por conjunto com cache e fila, ou outra) e confirmação ou ajuste dos tetos de 15.8
  - cada decisão traz o número que a sustenta e o critério de go/no-go
  - verificação: `npm run validate` e `validate_spec_format` do `design.md` sem erros
  - _Requisitos: 15.8, 20.13_
- [x] 1.7 Checkpoint: apresentar ao dono o go/no-go do spike e aguardar a decisão
  - se a decisão alterar o orçamento ou escolher o Renderizador próprio, atualizar `requirements.md` e `design.md` antes de seguir
  - _Requisitos: 15.8, 20.13_
- [x] 1.8 Commit `docs(site): spike de desempenho do diagrama de fluxos`
  - _Requisitos: 20.13_

### Fase 2: dados do guia e regras do validador (somente `feature`)

- [x] 2.1 Estender `schema/flows.schema.json` com `categorias_ferramenta`, `guias_praticos` e o marcador explícito de "sem ferramenta aplicável" (campo opcional booleano, nome fixado nesta tarefa) em `$defs/Decisao` e `$defs/Subtarefa`
  - listar os campos nas `properties`, porque `additionalProperties` é `false`
  - verificação: `npm run validate` segue verde e um documento com os campos novos passa no schema (teste em `tests/guide/`)
  - _Requisitos: 10.1, 10.2, 18.6_
- [x] 2.2 Acrescentar `categorias_ferramenta` e `guias_praticos` a `REF_FIELDS` em `lib/guide/entities.ts` e emitir `REF_QUEBRADA` com o id da tarefa, o campo e o id não resolvido
  - `guias_praticos` resolve só para notas `guia-pratico`
  - defeitos plantados em `tests/guide/defeitos/` para os dois campos, em tarefa e em subtarefa
  - _Requisitos: 10.3, 13.5_
- [x] 2.3 Portar as regras novas para `lib/guide/validate/`: aviso de duplicidade (`CATEGORIA_FERRAMENTA_DUPLICADA`, `GUIA_PRATICO_DUPLICADO`) e completude `SEM_FERRAMENTA_OU_GUIA`
  - a completude lê a constante `DEMANDAS_COM_LIGACAO_OBRIGATORIA`, que nasce vazia (a tarefa 2.9 inclui `feature`)
  - defeitos plantados e teste de que demandas sem os campos seguem válidas
  - _Requisitos: 10.4, 10.16, 18.3, 18.6_
- [x] 2.4 Escrever o adendo "Atualização da etapa 3" em `docs/adr/0001-yaml-como-fonte-unica.md` e o teste de guarda de `content/ids.lock.json`
  - o adendo registra a extensão do schema e a regra de que a ligação tarefa para ferramenta e guia vive no Guia_YAML
  - o teste compara o lock atual com o da `main` e falha se um id sumir
  - _Requisitos: 10.5, 10.6_
- [x] 2.5 Declarar em `content/guide/catalogos/ferramentas.yaml` as Categorias_de_Ferramenta que as tarefas da `feature` usam (`categorias_ferramenta`, hoje vazio), com nome e descrição agnósticos
  - verificação: `npm run validate`, e os ids novos entram em `content/ids.lock.json` sem remover nenhum antigo
  - _Requisitos: 10.1, 10.6_
- [x] 2.6 Ligar a `categorias_ferramenta` e `guias_praticos` as tarefas e subtarefas da `feature` na primeira terça parte das raias, na ordem do guia (`content/guide/demandas/feature.yaml`)
  - ligar só a guias que já existem em `content/pt-BR/guides/`, e marcar "sem ferramenta aplicável" quando for o caso
  - o texto dos passos permanece agnóstico, sem nome de ferramenta
  - verificação: `npm run validate` sem erro
  - _Requisitos: 10.8, 10.16, 18.3_
- [x] 2.7 Mesma ligação para a segunda terça parte das raias da `feature`
  - _Requisitos: 10.8, 10.16, 18.3_
- [x] 2.8 Mesma ligação para a terceira terça parte das raias da `feature`
  - _Requisitos: 10.8, 10.16, 18.3_
- [x] 2.9 Incluir `feature` em `DEMANDAS_COM_LIGACAO_OBRIGATORIA` e confirmar `npm run validate` estrito sem avisos de completude
  - confirmar que as outras 11 Demandas seguem sem alteração (`npm test` verde)
  - _Requisitos: 10.16, 18.3, 18.5_
- [x] 2.10 Commit `feat(guia): ligação de tarefas a categorias de ferramenta e guias práticos`
  - _Requisitos: 10.1, 10.5_

### Fase 3: Modelo_de_Grafo e `lib/flow-graph`

- [x] 3.1 Criar `lib/schema/grafo.ts` (Zod, `VERSAO_MODELO_DE_GRAFO = 1`, `ModeloDeGrafo` e tipos filhos do design) e gerar `schema/json/grafo-fluxo.json` por `tools/schema/generate.ts`
  - verificação: `npm run build` regenera o JSON sem diff depois do commit
  - _Requisitos: 17.1, 17.3_
- [x] 3.2 Extrair `contexto()` de `lib/flow-mermaid/index.ts` para `lib/flow-graph/contexto.ts`, sem mudar comportamento
  - `lib/flow-mermaid` passa a importá-lo, e `ordemFluxo`, `ordemRaias` e `raiasDoContexto` seguem importadas de `lib/flow-mermaid/order.ts`
  - verificação: `tests/mermaid-parity` verde sem edição
  - _Requisitos: 17.2, 17.7_
- [x] 3.3 Implementar `gerarGrafo` e `gerarGrafos` em `lib/flow-graph/index.ts`, validando o resultado contra o schema e falhando com o id da Demanda e o caminho do campo
  - nós e raias na ordem de exibição, campo `ordem` explícito, `temPlaybook`, subtarefas com `descreverCondicao`
  - teste unitário com o grafo real da `feature` (224 nós, 25 raias)
  - _Requisitos: 17.1, 17.2, 17.3, 17.7_
- [x] 3.4 Escrever `tests/flow-graph/geradores.ts` e os testes de propriedade `tests/flow-graph/grafo.props.test.ts`
  - **Property 1: Round trip de serialização do Modelo_de_Grafo**
  - **Property 2: O Modelo_de_Grafo não acrescenta nem perde elementos do Guia_YAML**
  - **Validates: Requirements 17.8, 17.9**
- [x] 3.5 Escrever o teste de propriedade `tests/flow-graph/ordem.props.test.ts`
  - **Property 3: Ordem relativa estável dentro da Raia**
  - **Validates: Requirements 17.7**
- [x] 3.6 Criar a rota Astro `site/src/pages/[locale]/api/flows/[id].graph.json.ts` com `getStaticPaths` sobre as Demandas não biblioteca
  - teste que cada grafo publicado tem no máximo 200 kB gzip, e `npm run smoke` cobre as rotas novas
  - _Requisitos: 17.1, 15.8_
- [x] 3.7 Commit `feat(site): modelo de grafo do fluxo e API estática`
  - _Requisitos: 17.1_

### Fase 4: Mermaid derivado do Modelo_de_Grafo, com paridade dos goldens

- [x] 4.1 Adaptar `lib/flow-mermaid/index.ts` para montar o texto a partir de `ModeloDeGrafo` em `gerarDiagramaDoGrafo` nas Views `visao`, `raia:<id>` e `completo`, sem Subtarefas
  - o módulo não usa `fs` nem `node:*`, para compilar também para o cliente
  - verificação: goldens dessas Views iguais byte a byte nas 12 Demandas
  - _Requisitos: 19.6, 19.8_
- [x] 4.2 Cobrir Subtarefas, legenda e `mapaIds` em `gerarDiagramaDoGrafo` e manter `gerarDiagrama(doc, demandaId, visao, ...)` como camada de compatibilidade, inclusive `visoesDoGuia` e `guiaParaDoc` das 3 notas
  - verificação: `tests/mermaid-parity` verde sem edição, com e sem Subtarefas
  - _Requisitos: 19.6, 19.8_
- [x] 4.3 Escrever os testes de propriedade `tests/flow-graph/mermaid.props.test.ts`
  - **Property 4: O Texto_Mermaid é função pura do Modelo_de_Grafo**
  - **Property 5: Paridade byte a byte entre o gerador antigo e o novo caminho**
  - **Validates: Requirements 19.8, 19.9**
- [x] 4.4 Implementar `textoAcessivel(grafo)` em `lib/flow-graph/` e usá-lo em `site/src/render/flow.ts` para a lista ordenada de Nós por Raia com as transições, mantendo os playbooks em `<details>`
  - teste unitário da função e do HTML gerado para a `feature`
  - _Requisitos: 2.10, 19.7_
- [x] 4.5 Remover do build o caminho que lê o YAML direto, deixando-o só como oráculo de teste em `tests/`, e documentar no `docs/architecture.md` que o grafo é a fonte do Texto_Mermaid
  - verificação: `npm run build`, `npm test` e `npm run smoke` verdes
  - _Requisitos: 19.6, 19.10_
- [x] 4.6 Commit `refactor(fluxos): texto mermaid derivado do modelo de grafo`
  - _Requisitos: 19.6, 19.8_

### Fase 5: expansão progressiva no modelo

- [x] 5.1 Implementar `lib/flow-graph/expansao.ts` (`ConjuntoExpandido`, `ClusterDeRaia`, `ArestaVisivel`, `GrafoVisivel`, `projetar`, `chaveDoConjunto`, `lerConjunto` e `normalizar`) em TypeScript puro
  - Raia desconhecida em `lerConjunto` é ignorada, e conjunto com todas as raias normaliza para `completo`
  - _Requisitos: 17.5, 20.2, 20.4, 20.5, 20.8_
- [x] 5.2 Escrever os testes de propriedade `tests/flow-graph/expansao.props.test.ts` com grafos aleatórios e os grafos reais das 12 Demandas
  - **Property 10: A expansão é monótona**
  - **Property 11: A projeção conserva arestas, Nós e extremos**
  - **Property 13: O estado de expansão faz round trip no Fragmento_de_Estado e normaliza**
  - **Validates: Requirements 20.2, 20.4, 20.5, 20.7, 20.8**
- [x] 5.3 Implementar `gerarDiagramaExpandido(grafo, conj, comLegenda)` em `lib/flow-mermaid/index.ts`
  - todas as raias expandidas delegam ao caminho do `completo`, e o caso parcial gera clusters `z_CL_<raia>` com cor da raia, contagens, arestas agregadas `×N` e a legenda da Visão geral
  - texto independente da ordem de expansão
  - _Requisitos: 20.1, 20.2, 20.6, 17.5_
- [x] 5.4 Gerar o golden `tests/fixtures/mermaid/golden/feature.geral.mmd` e escrever `tests/flow-graph/expansao-mermaid.props.test.ts`
  - **Property 12: Expandir tudo equivale ao `completo` dos goldens**
  - **Property 14: O Texto_Mermaid do conjunto não depende do caminho de expansão**
  - **Validates: Requirements 20.6, 19.8, 17.5**
- [x] 5.5 Escrever o teste de exemplo `tests/flow-graph/limites-mermaid.test.ts` que gera o texto de Expandir_tudo, com e sem Subtarefas, das 12 Demandas e confere `maxTextSize` e `maxEdges` configurados
  - _Requisitos: 20.10_
- [ ] 5.6 Checkpoint: pedir ao dono a revisão do golden `feature.geral.mmd` e fixá-lo depois da aprovação
  - _Requisitos: 20.1, 20.2_
- [x] 5.7 Commit `feat(fluxos): visao geral e expansao progressiva no modelo`
  - _Requisitos: 20.1, 20.6_

### Fase 6: ilha `flow-app` e Diagrama

- [x] 6.1 Criar `site/src/flow-app/state.ts` e `site/src/flow-app/loader.ts`
  - `state.ts` lê e escreve o Fragmento_de_Estado (`no`, `view`, `exp`, `sub`, `persp`, `f`) com `history.replaceState` ou `pushState`, trata `visao` como alias de `geral` e ignora Raias inexistentes
  - `loader.ts` busca `api/flows/<id>.graph.json` uma única vez por página
  - testes unitários em Vitest com jsdom, sem recarga e sem nova busca ao mudar estado
  - _Requisitos: 15.10, 20.8, 2.7_
- [x] 6.2 Empacotar o Mermaid no build conforme a decisão do spike (ESM dividida de flowchart e dagre, ou bundle único como fallback) em `tools/site/build.ts`
  - copiar para `site/dist` todos os arquivos que o Diagrama pode carregar, sem CDN, e carregar só em página com Diagrama
  - verificação: `npm run build`, `npm run smoke` e medição da carga do Diagrama
  - _Requisitos: 15.3, 15.12_
- [x] 6.3 Implementar `site/src/flow-app/renderer.ts` (interfaces `Renderizador`, `InstanciaRenderizador`, `EstadoDiagrama` e registro `PERSPECTIVAS`) e `perspectives/mermaid.ts`
  - `initialize` com limites elevados, `data-id` aplicado nos `g.node` e `g.cluster` pelo `mapaIds` e nós focáveis com `tabindex`
  - _Requisitos: 17.4, 17.10, 19.2, 19.3, 3.1, 20.10_
- [x] 6.4 Implementar `site/src/flow-app/expansao.ts`: fila com número de sequência e descarte de resultado obsoleto, cache de SVG por `chaveDoConjunto` com limite de bytes e indicador de progresso (`role="status"`, `aria-busy`, até 100 ms)
  - falha de render mantém o Diagrama anterior e oferece "Tentar de novo" e a alternativa textual
  - testes unitários da fila e do cache com `mermaid.render` simulado
  - _Requisitos: 20.9, 20.10, 15.8_
- [x] 6.5 Reescrever a Pagina_de_Demanda (`site/src/render/flow.ts` e a página Astro) com a ilha `data-island="flow"`: seletor das 12 Demandas na ordem de `ordem_das_demandas`, Abas_de_View (`geral`, raias, `completo`) com cor da Raia, legenda e troca de Demanda sem recarregar
  - abre em `geral`, e a URL antiga com `visao` vira alias
  - _Requisitos: 2.1, 2.2, 2.3, 2.5, 2.7, 2.8, 2.9, 18.1_
- [x] 6.6 Implementar `site/src/flow-app/interaction.ts`: clique (até 3 px), arraste com `grabbing`, setas, Ctrl ou Cmd com a roda, botões de zoom e rótulo acessível dos gestos
  - Enter e Espaço abrem o Nó focado (o modal chega na fase 7, e aqui o evento é emitido e testado)
  - _Requisitos: 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 3.10, 3.11_
- [x] 6.7 Implementar Cluster_de_Raia na ilha: clique expande no lugar, "Abrir raia" ativa `raia:<id>`, "Recolher" volta ao cluster, Enter expande, ação própria por teclado e Expandir_tudo
  - atualizar `exp=` no Fragmento_de_Estado e preservar zoom e rolagem
  - _Requisitos: 4.3, 20.3, 20.4, 20.6, 20.8, 20.11_
- [x] 6.8 Implementar o botão "Voltar" (histórico de Views e rolagem, desabilitado sem histórico) e o alternador "Raias" da View `completo`
  - _Requisitos: 4.4, 4.5, 4.6_
- [x] 6.9 Implementar o seletor de Perspectiva (opção `mermaid`, registro aberto), com escolha no Fragmento_de_Estado e no `localStorage`, preservando View, Conjunto_Expandido, Subtarefas e Nó
  - _Requisitos: 19.1, 19.3, 19.4, 19.5_
- [x] 6.10 Escrever `tests/browser/diagrama-ids.spec.ts` e `tests/browser/diagrama-interacao.spec.ts`
  - todo nó expõe `data-id`, clique de 3 px abre e arraste de 150 px rola sem abrir, setas, zoom com Ctrl e roda comum sem zoom, foco visível
  - _Requisitos: 3.1 a 3.11, 16.3, 16.6_
- [x] 6.11 Escrever `tests/browser/demanda-troca.spec.ts` e `tests/browser/ordem-views.spec.ts`
  - troca de Demanda e de View sem recarregar e sem exceção no console, mesma ordem horizontal dos Nós em cada View e em cada Conjunto_Expandido, abertura por URL com View
  - _Requisitos: 2.2, 2.4, 2.5, 2.6, 2.7, 16.4_
- [x] 6.12 Escrever `tests/browser/expansao-progressiva.spec.ts` e `tests/browser/perspectiva.spec.ts`
  - abre em `geral`, expandir uma raia desenha só o conjunto novo (contagem de chamadas a `mermaid.render`), recolher, Expandir tudo com indicador em até 100 ms e `data-id` igual ao golden, pedido obsoleto descartado, teclado do cluster, URL com `exp=` reaberta
  - _Requisitos: 20.1 a 20.11, 19.1, 19.3, 19.4, 19.5, 19.11_
- [-] 6.13 Commit `feat(site): diagrama interativo de fluxos com visao geral e expansao`
  - _Requisitos: 3.1, 20.1_

### Fase 7: Modal de Playbook, Subtarefas, entradas e saídas

- [ ] 7.1 Ampliar `api/flows/<id>.json` (`site/src/render/api.ts`) com `papeis`, letras RACI por nó, entradas e saídas, produtores e consumidores por artefato e variável (via `rastrearDados`) e o indicador "sem produtor" (via `lacunasDeDados`)
  - teste unitário do formato para a `feature`
  - _Requisitos: 7.10, 8.1, 8.2, 8.5, 17.6_
- [ ] 7.2 Criar `site/src/flow-app/modal.ts` com `<dialog>` nativo, `inert` no resto da página, foco preso, Esc e botão fechar devolvendo o foco, e `no=` no Fragmento_de_Estado
  - Historico_do_Modal como pilha em memória, que persiste só o topo
  - _Requisitos: 6.5, 6.6, 6.7, 6.9, 6.10, 6.11_
- [ ] 7.3 Renderizar o conteúdo do Modal por tipo de Nó: tarefa (nome, tipo, Raia, resumo, Fazer, Evitar, perguntas-chave na ordem do guia, entradas, saídas, técnicas e papéis com letra RACI), gateway (pergunta, saídas com condição, papel que decide), Subtarefa condicional ("Executar quando") e chamada de Raia (Raia chamada, retornos e botão para abrir a View)
  - _Requisitos: 6.1, 6.2, 6.3, 6.4, 4.1, 4.2, 8.6, 6.12_
- [ ] 7.4 Tornar clicáveis papel, técnica, artefato, variável, rito e pergunta dentro do Modal (empilha, botão voltar, link para a Pagina_Canonica) e implementar o detalhe de artefato e variável com tipo, subtipo, exemplo, produtores, consumidores, aviso "sem produtor" e a ação "destacar no Diagrama"
  - destacar ativa a View que contém o Nó, rola até ele e aplica o destaque
  - _Requisitos: 6.5, 6.6, 6.8, 8.1, 8.2, 8.3, 8.4, 8.5, 8.7, 13.2_
- [ ] 7.5 Implementar na ilha o alternador "Subtarefas" (expande as de toda raia expandida), a expansão por tarefa, a indicação "N subtarefas", a borda tracejada com ◆ nas condicionais e o alternador oculto quando a View não tem Subtarefas
  - preservar View, zoom e rolagem ao alternar
  - _Requisitos: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.8, 20.5_
- [ ] 7.6 Escrever `tests/browser/modal-playbook.spec.ts` e `tests/browser/entradas-saidas.spec.ts`
  - conteúdo por tipo, histórico e botão voltar, foco preso (loop de Tab), Esc devolve o foco, URL com `no=` reabre o modal, "sem produtor", destacar produtor
  - _Requisitos: 6.1 a 6.12, 8.1 a 8.7_
- [ ] 7.7 Escrever `tests/browser/subtarefas.spec.ts`
  - alternador, contagem real "N subtarefas", marcador ◆, alternador oculto sem Subtarefas, estado preservado
  - _Requisitos: 5.1 a 5.6, 5.8_
- [ ] 7.8 Commit `feat(site): modal de playbook, subtarefas e rastreio de entradas e saidas`
  - _Requisitos: 6.1, 5.1_

### Fase 8: motor de facetas e as três Areas

- [ ] 8.1 Criar `lib/facets/index.ts` com `derivarFacetas(schemas)` e `construirIndice(facetas, entidades)`, a partir de `schema/json/*.json`, sem nome de campo fixo
  - testes unitários e de propriedade em `tests/facets/indice.props.test.ts`
  - **Property 6: Facetas aplicam-se só aos tipos que têm o atributo**
  - **Validates: Requirements 11.3, 11.10, 11.13**
- [ ] 8.2 Implementar `lib/facets/filtrar.ts` (E entre Facetas, OU dentro da Faceta, contagens por valor, independência da ordem) e os testes `tests/facets/filtrar.props.test.ts`
  - **Property 7: Filtro combinado é E entre Facetas, OU dentro da Faceta, e independente de ordem**
  - **Property 8: Contagem de Faceta é consistente com o resultado filtrado**
  - **Validates: Requirements 11.4, 11.5, 11.6, 11.12**
- [ ] 8.3 Publicar `api/catalog.json` e `api/facets.json` no build, com os valores de Faceta já extraídos
  - verificação: resultado do filtro direto sobre `api/index.json` igual ao do motor (teste de exemplo) e `npm run smoke`
  - _Requisitos: 11.1, 11.12, 11.14, 15.1_
- [ ] 8.4 Criar o mapeamento `AREA_DE_CAMADA` em `site/src/render/routes.ts` e reescrever `site/src/components/Header.astro` com as três entradas (Fluxos de demandas, Jornadas e competências, Catálogo) e `aria-current="page"` pela Area da Entidade
  - busca e seletor de idioma permanecem no cabeçalho
  - chaves de i18n em pt-BR e en
  - _Requisitos: 1.1, 1.2, 1.3, 1.6_
- [ ] 8.5 Criar as páginas iniciais das três Areas com os grupos e os totais, e manter todas as rotas atuais por redirecionamento ou alias para a Pagina_Canonica
  - verificação: `npm run smoke` com as rotas antigas e novas
  - _Requisitos: 1.4, 1.5, 13.4_
- [ ] 8.6 Implementar a ilha do Catalogo (`site/src/flow-app/` ou `site/src/catalog-app/`): lista única, busca por substring sobre id, nome, descrição e exemplo, Facetas geradas, contagem ao lado de cada valor, "N de M", "Limpar filtros", "nenhum item" com sugestão de remover o último Filtro e estado no hash
  - Facetas ocultas ou desabilitadas quando o tipo selecionado não tem o atributo
  - _Requisitos: 11.1 a 11.11, 11.13_
- [ ] 8.7 Implementar a Area Jornadas_e_Competencias: totais por grupo, etapas da jornada na ordem com links, competência com meia-vida e orientação, certificações relacionadas nos dois sentidos, "sem jornada", Filtros (texto, emissor, área) e Fonte_e_Data ou "não verificado" em custo, validade e versão do exame
  - _Requisitos: 12.1 a 12.8, 14.1, 14.2_
- [ ] 8.8 Escrever `tests/browser/catalogo-area.spec.ts`
  - E entre Facetas, OU dentro da Faceta, contagens, hash reproduz o resultado, limpar filtros, "nenhum item", Faceta oculta por tipo
  - _Requisitos: 11.4 a 11.11_
- [ ] 8.9 Escrever `tests/browser/jornadas.spec.ts` e `tests/browser/areas-menu.spec.ts`
  - três entradas na ordem certa, `aria-current` por Area, rotas antigas acessíveis, Filtros de jornadas e "sem jornada"
  - _Requisitos: 1.1, 1.2, 1.5, 12.1 a 12.8_
- [ ] 8.10 Commit `feat(site): tres areas, motor de facetas e catalogo filtravel`
  - _Requisitos: 1.1, 11.1_

### Fase 9: tabelas por demanda e visão de ferramentas

- [ ] 9.1 Publicar `api/catalog/<demandaId>.json` com os `ItemDaDemanda` (artefatos, variáveis, técnicas, Nós e Subtarefas) derivados de `rastrearDados` e da extração de nós, e escrever `tests/facets/catalogo-demanda.props.test.ts`
  - **Property 9: Contador do Catalogo_da_Demanda é exato por categoria e por Demanda**
  - **Validates: Requirements 9.10**
- [ ] 9.2 Implementar `site/src/flow-app/catalog.ts` (Catalogo_da_Demanda) sobre o motor de `lib/facets/filtrar.ts`: filtros texto, Raia, categoria, tipo, tipo de artefato, subtipo, Papel e letra RACI, "N de M", limpar, "nenhum item", estado no hash
  - clique abre o Modal e "Ver no diagrama" destaca o Nó e habilita "Voltar" ao mesmo estado de Filtros
  - _Requisitos: 9.1 a 9.9_
- [ ] 9.3 Implementar a Matriz_RACI (Nó por linha, Papel por coluna, todos os Papéis com a mesma letra na célula) com Filtros "Papel" e "Letra RACI", total visível sobre total e clique na linha abrindo o Modal
  - teste unitário: as atribuições exibidas são iguais às do guia para as 12 Demandas
  - _Requisitos: 7.1, 7.2, 7.3, 7.7, 7.8, 7.9, 7.10_
- [ ] 9.4 Implementar o detalhe do Papel (clique no cabeçalho da coluna): Nós agrupados por letra RACI com o total de cada grupo e as outras Demandas em que o Papel atua com a quantidade de Nós
  - _Requisitos: 7.4, 7.5, 7.6_
- [ ] 9.5 Implementar a Visao_de_Ferramentas_e_Guias no Modal: três grupos (categorias, ferramentas, Guias_Praticos), ferramentas da categoria com link canônico, Guia_Pratico com indicação da tarefa de origem e link de retorno, "sem ferramentas associadas" e nenhum texto copiado das Entidades
  - blocos "Como fazer hoje" do guia com versão e data
  - _Requisitos: 10.7, 10.8, 10.9, 10.10, 10.11, 10.14, 10.15, 14.4_
- [ ] 9.6 Implementar a visão agregada da Pagina_de_Demanda (por categoria de ferramenta, as tarefas que a usam), as Referencias_de_Entrada de ferramenta, categoria e Guia_Pratico (tarefas, subtarefas e Demandas, via relações inversas do `SiteIndex`) e o link "Ver no diagrama" nas páginas canônicas
  - o link abre a Pagina_de_Demanda na View e no Nó certos, com destaque
  - _Requisitos: 10.12, 10.13, 10.17, 13.1, 13.3_
- [ ] 9.7 Escrever `tests/browser/catalogo-demanda.spec.ts` e `tests/browser/matriz-raci.spec.ts`
  - filtro por Raia, contador, destaque do Nó e voltar no mesmo estado de Filtros, URL filtrada reaberta, Filtros da matriz, clique em linha e em cabeçalho
  - _Requisitos: 9.1 a 9.9, 7.1 a 7.9_
- [ ] 9.8 Escrever `tests/browser/ferramentas-guias.spec.ts`
  - três grupos, "sem ferramentas associadas", link canônico, retorno à tarefa de origem, visão agregada, "Ver no diagrama" a partir da página canônica
  - _Requisitos: 10.7 a 10.14, 13.3_
- [ ] 9.9 Commit `feat(site): catalogo da demanda, matriz raci e visao de ferramentas e guias`
  - _Requisitos: 9.1, 10.7_

### Fase 10: i18n, fallback e integridade de links

- [ ] 10.1 Auditar e completar as chaves de `site/src/i18n` em pt-BR e en para todos os rótulos, mensagens, legendas e o seletor de Perspectiva
  - teste que falha quando uma chave existe num idioma e falta no outro
  - _Requisitos: 15.4, 19.11_
- [ ] 10.2 Implementar o marcador visível de fallback pt-BR em `en` para conteúdo do guia, Guias_Praticos e Entidades sem tradução, com remoção automática quando a tradução existe
  - `tests/browser/i18n-fallback.spec.ts` cobre os dois estados sem mudança de código (fixture com tradução parcial)
  - _Requisitos: 15.5, 15.11, 6.12, 10.18_
- [ ] 10.3 Aplicar Fonte_e_Data ou o Marcador_Nao_Verificado nos pontos novos que exibem dado volátil (certificação, tabelas do Catalogo) e incluir os links internos novos no `npm run smoke`
  - _Requisitos: 14.1, 14.2, 14.3, 15.7, 13.5_
- [ ] 10.4 Escrever o teste de simetria das arestas de `graph.json` (a origem aparece nas Referencias_de_Entrada do destino) e o teste de que o Modal, o Catalogo_da_Demanda e a matriz só referenciam Entidades por link, sem duplicar texto
  - _Requisitos: 13.2, 13.6_
- [ ] 10.5 Commit `feat(site): i18n completo, marcador de fallback e integridade de links`
  - _Requisitos: 15.4, 15.5_

### Fase 11: orçamento de desempenho e CI

- [ ] 11.1 Estender `tests/browser/label-overlap.spec.ts` à matriz da Demanda_Piloto: Views por raia, `geral`, cada Raia expandida isoladamente, Expandir_tudo, com e sem Subtarefas, nos dois idiomas, filtrável por `PLAYWRIGHT_DEMANDS`
  - limite de 1 px² de interseção entre `g.node` e o rótulo de `g.cluster`
  - _Requisitos: 5.7, 16.5, 20.12_
- [ ] 11.2 Transformar `tests/browser/performance.spec.ts` em asserção de tamanho: carga inicial (teto 300 kB), carga do Diagrama (teto 1,1 MB), total (teto 1,4 MB), Modelo_de_Grafo (200 kB) e crescimento de `site/dist` (até 25% sobre a linha de base)
  - acima da meta e abaixo do teto vira aviso no relatório, e acima do teto falha
  - _Requisitos: 15.8, 15.9_
- [ ] 11.3 Acrescentar ao `performance.spec.ts` as asserções de tempo com CPU 4x e p95 de 10 execuções: Visão geral interativa em 2,0 s, uma Raia em 1,0 s, estado em cache em 200 ms, Expandir tudo em 5,0 s, `completo` com Subtarefas em 12 s (aviso) e Filtro do Catalogo em 100 ms
  - _Requisitos: 15.8, 15.9, 20.9_
- [ ] 11.4 Atualizar `.github/workflows/pr.yml` com `npx playwright install --with-deps chromium` e `npm run test:browser` (matriz `PLAYWRIGHT_DEMANDS=feature`), e confirmar que `npm test` segue excluindo `tests/browser/**`
  - ajustar `tools/github/apply-settings.sh` se o conjunto de checks obrigatórios mudar
  - _Requisitos: 16.1, 16.8, 16.9_
- [ ]* 11.5 Criar `.github/workflows/overlap-full.yml` (`schedule` e `workflow_dispatch`) com a matriz de todas as 12 Demandas, como verificação não obrigatória
  - _Requisitos: 16.10_
- [ ] 11.6 Commit `test(site): orcamento de desempenho e matriz de sobreposicao no CI`
  - _Requisitos: 15.9, 16.9_

### Fase 12: documentação

- [ ] 12.1 Escrever `docs/flow-graph-contract.md` (contrato do Modelo_de_Grafo, versão, campos, regras de ordem, interface de Renderizador e Perspectiva para a experiência 3D) e atualizar `docs/content-contract.md` com `categorias_ferramenta`, `guias_praticos` e o marcador de "sem ferramenta aplicável"
  - _Requisitos: 17.1, 17.10, 19.2, 10.1_
- [ ] 12.2 Atualizar `docs/architecture.md` (diagramas C4 com `lib/flow-graph` e a ilha `flow-app`), `docs/site-map.md`, `docs/pages.md`, `docs/guide-browser-tests.md` (os 7 critérios da etapa 3 com o spec de cada um) e os READMEs
  - _Requisitos: 16.2, 1.5, 18.1_
- [ ] 12.3 Rodar todas as verificações num clone limpo: `npm ci`, `npm run validate`, `npm test`, `npm run build`, `npm run smoke` e `npm run test:browser`
  - conferir que nenhum id saiu de `content/ids.lock.json` e que as 11 Demandas fora da piloto não regrediram
  - _Requisitos: 18.5, 10.6, 15.7_
- [ ] 12.4 Commit `docs(site): contrato do grafo, arquitetura e mapa de testes de navegador`
  - _Requisitos: 17.1, 16.2_

### Fase 13: PR e governança

- [ ] 13.1 Abrir o PR único (`spec/experiencia-fluxos-catalogo` para `main`, título em Conventional Commits, merge por squash), aguardar todos os checks obrigatórios e pedir a aprovação do dono
  - _Requisitos: 16.9, 18.5_

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["0.1", "0.2"], "note": "arquivos distintos (script e loader), sem conflito" },
    { "id": 1, "tasks": ["0.3"], "note": "corta o guia real e prova a equivalência" },
    { "id": 2, "tasks": ["0.4"] },
    { "id": 3, "tasks": ["0.5"], "note": "roda agents:sync, que lê o sync.ts alterado em 0.4" },
    { "id": 4, "tasks": ["0.6"], "note": "a Fase 1 só começa com o commit da 0.6" },
    { "id": 5, "tasks": ["1.1"] },
    { "id": 6, "tasks": ["1.2"], "note": "tarefas de medição rodam uma por onda para não disputar CPU" },
    { "id": 7, "tasks": ["1.3"] },
    { "id": 8, "tasks": ["1.4"] },
    { "id": 9, "tasks": ["1.5"] },
    { "id": 10, "tasks": ["1.6"] },
    { "id": 11, "tasks": ["1.7"], "note": "go/no-go do dono" },
    { "id": 12, "tasks": ["1.8"] },
    { "id": 13, "tasks": ["2.1"] },
    { "id": 14, "tasks": ["2.2"] },
    { "id": 15, "tasks": ["2.3", "2.5"] },
    { "id": 16, "tasks": ["2.4", "2.6"] },
    { "id": 17, "tasks": ["2.7"], "note": "2.6, 2.7 e 2.8 editam o mesmo feature.yaml, por isso uma por onda" },
    { "id": 18, "tasks": ["2.8"] },
    { "id": 19, "tasks": ["2.9"] },
    { "id": 20, "tasks": ["2.10"] },
    { "id": 21, "tasks": ["3.1", "3.2"] },
    { "id": 22, "tasks": ["3.3"] },
    { "id": 23, "tasks": ["3.4", "3.6"] },
    { "id": 24, "tasks": ["3.5"] },
    { "id": 25, "tasks": ["3.7"] },
    { "id": 26, "tasks": ["4.1", "4.4"] },
    { "id": 27, "tasks": ["4.2"] },
    { "id": 28, "tasks": ["4.3"] },
    { "id": 29, "tasks": ["4.5"] },
    { "id": 30, "tasks": ["4.6"] },
    { "id": 31, "tasks": ["5.1"] },
    { "id": 32, "tasks": ["5.2", "5.3"] },
    { "id": 33, "tasks": ["5.4", "5.5"] },
    { "id": 34, "tasks": ["5.6"], "note": "revisão do golden pelo dono" },
    { "id": 35, "tasks": ["5.7"] },
    { "id": 36, "tasks": ["6.1", "6.2"] },
    { "id": 37, "tasks": ["6.3"] },
    { "id": 38, "tasks": ["6.4"] },
    { "id": 39, "tasks": ["6.5"] },
    { "id": 40, "tasks": ["6.6", "6.9"] },
    { "id": 41, "tasks": ["6.7"] },
    { "id": 42, "tasks": ["6.8"] },
    { "id": 43, "tasks": ["6.10", "6.11"] },
    { "id": 44, "tasks": ["6.12"] },
    { "id": 45, "tasks": ["6.13"] },
    { "id": 46, "tasks": ["7.1", "7.2"] },
    { "id": 47, "tasks": ["7.3"] },
    { "id": 48, "tasks": ["7.4", "7.5"] },
    { "id": 49, "tasks": ["7.6", "7.7"] },
    { "id": 50, "tasks": ["7.8"] },
    { "id": 51, "tasks": ["8.1", "8.4"] },
    { "id": 52, "tasks": ["8.2", "8.3", "8.5"] },
    { "id": 53, "tasks": ["8.6", "8.7"] },
    { "id": 54, "tasks": ["8.8", "8.9"] },
    { "id": 55, "tasks": ["8.10"] },
    { "id": 56, "tasks": ["9.1", "9.3", "9.5"] },
    { "id": 57, "tasks": ["9.2", "9.4", "9.6"] },
    { "id": 58, "tasks": ["9.7", "9.8"] },
    { "id": 59, "tasks": ["9.9"] },
    { "id": 60, "tasks": ["10.1"] },
    { "id": 61, "tasks": ["10.2", "10.3", "10.4"] },
    { "id": 62, "tasks": ["10.5"] },
    { "id": 63, "tasks": ["11.1", "11.2"] },
    { "id": 64, "tasks": ["11.3", "11.4", "11.5"], "note": "11.3 volta ao performance.spec.ts depois de 11.2, por isso fica em outra onda" },
    { "id": 65, "tasks": ["11.6"] },
    { "id": 66, "tasks": ["12.1", "12.2"] },
    { "id": 67, "tasks": ["12.3"] },
    { "id": 68, "tasks": ["12.4"] },
    { "id": 69, "tasks": ["13.1"] }
  ]
}
```

## Notes

- **Ordem dos commits:** cada fase termina no próprio commit, e as fases seguem em sequência. Dentro de uma fase, as tarefas da mesma onda rodam em paralelo e o commit só ocorre na última onda, adicionando os arquivos da fase por caminho (sem `git add -A`).
- **Fase 0 antes de tudo:** a Fase 0 bloqueia as Fases 1 e 2. A Fase 1 só precisa do commit 0.6, e a Fase 2 edita os arquivos já segmentados (`catalogos/ferramentas.yaml` na 2.5). Seu commit `refactor(guia)` também vai para a branch da feature, nunca direto na `main`. Papéis por tarefa: executor `dev`, revisores `arquiteto` e `qa` (ver `.kiro/steering/orquestracao-de-agentes.md`).
- **Spike primeiro:** nenhuma tarefa das fases 6 a 9 começa antes do checkpoint 1.7. Se o dono escolher o Renderizador próprio (S5) ou ajustar os tetos, a tarefa 1.7 atualiza `requirements.md` e `design.md`, e o plano das fases 5 e 6 é revisto antes de seguir.
- **Conteúdo editorial na fase 2:** as ligações das tarefas da `feature` a categorias e guias (2.5 a 2.8) são proposta do agente e passam por revisão do dono no PR. O texto dos passos permanece agnóstico, e as outras 11 Demandas ficam intactas.
- **Dependência de Playwright:** as fases 1, 6 a 11 exigem Chromium instalado (`npx playwright install chromium`). Os tempos do spike e do orçamento são p95 de 10 execuções com CPU 4x e variam por máquina, então 11.3 registra a máquina e reporta como aviso o que ficar entre o limite e 20% acima dele em execução local, e falha no CI quando exceder o limite.
- **Propriedades agrupadas:** as 14 propriedades do design ficam em 8 tarefas de teste (3.4, 3.5, 4.3, 5.2, 5.4, 8.1, 8.2 e 9.1), agrupadas por módulo para caber numa sessão. Cada propriedade mantém seu número e seus requisitos no enunciado.
- **Tarefa opcional:** só a 11.5 é opcional (`*`), porque o job agendado de todas as Demandas não é verificação obrigatória (Requisito 16.10). As demais, inclusive testes, fazem parte da entrega.
- **Fora do escopo:** identidade visual, experiência 3D, tradução do conteúdo do guia para inglês e completude de dados das demais Demandas ficam em specs posteriores. O Requisito 19.2 só exige a interface de Perspectiva, sem implementar `3d`.
- **Node:** a execução usa Node 22.23.4 ou superior.
