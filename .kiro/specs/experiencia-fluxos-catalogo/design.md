# Design Document

## Overview

Esta spec transforma o site estático de hoje (páginas com 2 figuras Mermaid pré-geradas e listas estáticas agrupadas) num Catálogo navegável em três Areas: Fluxos de demandas, Jornadas e competências, Catálogo. A peça central é um **Modelo de Grafo** serializado em JSON, derivado do Guia_YAML no build, que qualquer Renderizador consome (Mermaid agora, 3D depois). O Mermaid deixa de ser pré-renderizado por View: o cliente desenha o Diagrama a partir do Modelo_de_Grafo, com Mermaid como a primeira Perspectiva.

A entrega cobre só a Demanda_Piloto (`feature`) nos critérios de aceite e na completude de dados (Decisão 2 do dono), com mecanismos genéricos reaproveitáveis por qualquer Demanda.

### Objetivos de design

1. Um único contrato de dados (Modelo_de_Grafo) sustenta o Diagrama de hoje (Mermaid) e o de depois (3D), sem reescrever o gerador quando a Perspectiva mudar.
2. O Texto_Mermaid deixa de ter duas fontes (YAML direto e, depois desta spec, o Modelo_de_Grafo). A paridade byte a byte contra os goldens de `tests/fixtures/mermaid` prova que o caminho novo não perde nada do caminho antigo, e só então o caminho antigo recua a oráculo.
3. Toda interatividade nova roda com JavaScript do navegador sobre JSON estático do build, sem servidor, preservando o que `docs/architecture.md` já garante (offline, bilíngue, ids estáveis).
4. O código da UI (facetas, filtros, modal) não conhece os atributos específicos de cada tipo de Entidade. Eles vêm do schema (`schema/json/*.json` e `schema/flows.schema.json`), como o Requirement 11.3 exige.
5. Reaproveitar o que já existe sempre que possível: `lib/flow-mermaid` (ordem, cores, ids, escapes), `lib/guide/*` (carga, validação, rastreio), `lib/content/site.ts` (`SiteIndex`, relações inversas, grafo de arestas), a convenção de ilha (`data-island`), `site/src/render/*`, Pagefind, i18n.

### Linha de base medida nesta máquina (para o orçamento do Requirement 15.8)

Medido localmente contra o build atual (`KIT_LOCALES=pt-BR npm run build`, Chromium, `tests/browser/serve.ts`), antes de qualquer código desta spec:

| Medida | Valor hoje | Como foi medido |
|---|---|---|
| `site/dist` (bilíngue) | 38.928 kB | `du -sk site/dist` |
| `site/dist/pt-BR` | 23.456 kB | `du -sk site/dist/pt-BR` |
| `mermaid.min.js` (vendorizado) | 3.572.661 bytes, 979.561 bytes gzip | `gzip -c site/public/vendor/mermaid/mermaid.min.js \| wc -c` |
| `api/flows/feature.json` hoje | 169.146 bytes, 33.604 bytes gzip | contém `raias`, `decisoes`, `playbooks` e os dois textos Mermaid (`visao`, `completo`) |
| Página `flows/feature/` interativa, CPU 1x | 1,2 a 1,4 s até as 2 figuras com `data-rendered="true"` | `page.waitForFunction` sobre os dois `figure[data-island="mermaid"]` |
| Página `flows/feature/` interativa, CPU 4x | 5,0 a 5,1 s | mesma medida, `Emulation.setCPUThrottlingRate(4)` via CDP |
| `mermaid.render` isolado da view `completo` (224 nós), CPU 4x | 3,58 s | `performance.now()` em volta de `window.mermaid.render` |
| `mermaid.render` isolado da view `visao` (50 nós), CPU 4x | 0,56 s | idem |

Medições adicionais desta revisão, na mesma máquina, mesmo Chromium, `Emulation.setCPUThrottlingRate(4)`, `mermaid.render` sobre os goldens de `tests/fixtures/mermaid/golden` (Mermaid 11.17.2, `maxTextSize` e `maxEdges` elevados para o teste):

| Medida (CPU 4x, exceto onde indicado) | Valor | Observação |
|---|---|---|
| Carregar e inicializar `mermaid.min.js` (script tag, `initialize`) | 0,94 a 1,01 s (CPU 4x), 0,28 a 0,30 s (CPU 1x) | custo fixo antes de qualquer desenho |
| Render de `feature.feat_orq` (maior raia, 25 nós) | 0,57 a 0,76 s | inclui a legenda do golden |
| Render de `feature.com_set` (raia típica, 13 nós) | 0,22 a 0,36 s | |
| Render de uma Visão geral sintética (25 clusters, 48 arestas agregadas) | 0,26 a 0,32 s | texto gerado a partir de `feature.completo.mmd` agrupando por raia; SVG de 67 kB |
| Render de `feature.completo` (224 nós, 261 arestas) | 3,57 a 3,73 s | SVG de 4,2 MB |
| Render de `feature.completo.subtarefas` (cerca de 400 nós, 449 arestas) | 10,1 a 10,9 s | SVG de 4,9 MB; só renderiza com `maxTextSize` elevado |
| Tamanho do texto de `feature.completo.mmd` | 47.773 bytes | o padrão do Mermaid é `maxTextSize: 50000`, margem de 4,5%; `completo.subtarefas` tem 98.526 bytes e excede o padrão |
| Arestas de `feature.completo.subtarefas` | 449 | o padrão é `maxEdges: 500`, margem de 10% |
| Build ESM dividida do Mermaid (`mermaid.esm.min.mjs`), flowchart com dagre | 25 arquivos, 820.017 bytes, 220.796 bytes gzip (medido pela rede) | a mesma versão 11.17.2, obtida com `npm pack mermaid@11.17.2`; os 103 arquivos da build somam 3.491.835 bytes, 993.450 bytes gzip |
| Protótipo `guia.html` | 11.589.698 bytes, 1.941.365 bytes gzip | contém o Mermaid 11.17.2 inline (3,57 MB) e os dados do guia, em arquivo único |

A view `completo` da Demanda_Piloto tem 224 nós e domina o tempo de interatividade. Em CPU 4x ela já excede os 2,0 s do orçamento original sozinha, usando o próprio motor de renderização do Mermaid. A Decisão 14 do dono resolve isso mudando o modelo: a entrada passa a ser a Visão geral (0,3 s de render) e o `completo` é alcançado por expansão progressiva (ver "Visão geral e expansão progressiva" em Components and Interfaces).

### Fontes consultadas no repositório

`lib/guide/entities.ts`, `lib/guide/load.ts`, `lib/guide/rastreio.ts`, `lib/guide/validate/*`, `lib/flow-mermaid/index.ts` e `order.ts`, `lib/content/site.ts` e `lib/content/index.ts`, `site/src/render/{flow,api,entity,layers,routes,util}.ts`, `site/src/components/{Diagram,Header}.astro`, `site/src/pages/[locale]/[...slug].astro`, `tools/site/build.ts`, `tools/schema/generate.ts`, `schema/flows.schema.json`, `schema/json/*.json`, `tests/browser/*`, `tests/mermaid-parity/parity.test.ts`, `tests/fixtures/mermaid/*`, `docs/architecture.md`, `docs/site-map.md`, `docs/pages.md`, `docs/guide-browser-tests.md`, `docs/adr/0001-yaml-como-fonte-unica.md`.

## Architecture

```mermaid
flowchart TB
  subgraph build["Build (tools/site/build.ts, tsx, Node)"]
    yaml["content/guide/*.yaml\n(Guia_YAML)"] --> loader["lib/guide/load.ts\nloadGuideDoc"]
    loader --> entities["lib/guide/entities.ts\nderiveGuideEntities"]
    loader --> graphgen["lib/flow-graph (novo)\ngerarGrafo(doc, demandaId)"]
    graphgen --> mmdgen["lib/flow-mermaid (adaptado)\ntextoDoGrafo(grafo)"]
    graphgen --> graphjson["api/flows/<id>.graph.json\n(Modelo_de_Grafo)"]
    mmdgen --> mmdtext["Texto_Mermaid\n(dentro de graph.json e do HTML no-JS)"]
    entities --> siteindex["lib/content/site.ts\nSiteIndex"]
    siteindex --> facetidx["lib/facets (novo)\níndice de facetas"]
    siteindex --> pages["site/src/pages\nAstro: páginas e API estática"]
    facetidx --> catjson["api/catalog.json, api/catalog/<demanda>.json"]
    pages --> dist["site/dist (HTML + JSON estático)"]
    catjson --> dist
    graphjson --> dist
  end
  subgraph browser["Navegador (sem build, só fetch e DOM)"]
    dist --> loaded["Página carregada: HTML + <pre> Mermaid (fallback sem JS)"]
    loaded --> island["Ilha flow-app (data-island=\"flow\")\ncarrega graph.json uma vez"]
    island --> renderer["Interface Renderizador\nperspectiva ativa"]
    renderer -->|"perspectiva: mermaid"| mermaidP["Perspectiva Mermaid\ntexto derivado do Modelo_de_Grafo em memória"]
    renderer -.->|"perspectiva: 3d (spec futura)"| threeP["Perspectiva 3D\nWebGL/Three.js"]
    island --> modal["Modal de Playbook"]
    island --> catalogo["Catálogo da Demanda\n(filtros)"]
    island --> hash["Fragmento de Estado\nlocation.hash"]
    hash <--> island
  end
```

### Situação atual e situação final

| Camada | Hoje | Depois desta spec |
|---|---|---|
| Fonte de dados | `content/guide/*.yaml` | mesma (sem mudança de local) |
| Geração do Diagrama | `lib/flow-mermaid` gera Texto_Mermaid direto do YAML, 159 arquivos `.mmd` no build de `npm run guide` / embutidos via `flow.ts` | `lib/flow-graph` (novo) gera o Modelo_de_Grafo direto do YAML; `lib/flow-mermaid` (adaptado) deriva o Texto_Mermaid a partir do Modelo_de_Grafo |
| Onde o Diagrama nasce | HTML com 2 `<figure data-island="mermaid">` por página de Demanda, SVG renderizado no cliente a partir do texto embutido | o cliente busca `api/flows/<id>.graph.json` uma vez e desenha todas as Views (inclusive `raia:<id>`) a partir dele, sem nova busca de rede |
| Páginas por Demanda | 2 Views (`visao`, `completo`), cada uma renderizada de uma vez | entrada na Visão geral (`geral`, Raias recolhidas), foco por raia (`raia:<id>`×N) e expansão progressiva até `completo`, seletor de Demanda, abas |
| Catálogo | listas agrupadas estáticas (`layers.ts`) | Catalogo (Area) com facetas geradas do schema; Catalogo_da_Demanda por tabela filtrável |
| Playbook | `<details>` HTML estático | Modal_de_Playbook com histórico, aberto também a partir do `<details>` quando JavaScript está desligado |

### Fluxo de build (passo a passo)

1. `loadGuideDoc` carrega o documento mesclado do Guia_YAML (sem mudança: `lib/guide/load.ts`).
2. `lib/guide/validate` valida contra `schema/flows.schema.json` mais as regras novas (Requirement 10). Falha aqui interrompe o build, como hoje.
3. `lib/flow-graph` (novo) percorre o mesmo documento com o mesmo cálculo de ordem (`lib/flow-mermaid/order.ts`, reaproveitado sem mudança) e produz o Modelo_de_Grafo de cada Demanda não biblioteca.
4. `lib/flow-mermaid` adaptado recebe o Modelo_de_Grafo (não mais o YAML) e produz o Texto_Mermaid de cada View. A assinatura pública antiga (`gerarDiagrama(doc, demandaId, visao, ...)`) continua existindo como fina camada de compatibilidade: constrói o grafo internamente e delega.
5. `tools/schema/generate.ts` passa a gerar também `schema/json/grafo-fluxo.json` a partir do schema Zod do Modelo_de_Grafo (ver Data Models), do mesmo jeito que já gera os demais `schema/json/*.json`.
6. As páginas Astro (`[locale]/[...slug].astro` e as rotas de API em `site/src/pages/[locale]/api/`) publicam `api/flows/<id>.graph.json` por Demanda e `api/catalog.json` mais `api/catalog/<demanda>.json` para o Catalogo e o Catalogo_da_Demanda.
7. `npm run build` roda a comparação de paridade (`tests/mermaid-parity`) como parte de `npm test`, não do build. O build não falha por paridade; a suíte de testes sim.

## Components and Interfaces

### `lib/flow-graph` (novo)

Módulo irmão de `lib/flow-mermaid`, mesma pasta `lib/`. Responsável só pela extração do grafo a partir do documento do guia. Reaproveita de `lib/flow-mermaid/order.ts` as funções `ordemFluxo`, `ordemRaias`, `raiasDoContexto`, `chaveNatural` e `ordenarNatural` (sem duplicar lógica de ordenação: é a mesma função, importada).

```ts
// lib/flow-graph/index.ts
export function gerarGrafo(doc: Item, demandaId: string): ModeloDeGrafo;
export function gerarGrafos(doc: Item): Map<string, ModeloDeGrafo>; // todas as demandas não biblioteca
```

`gerarGrafo` chama a mesma `contexto()` hoje interna a `lib/flow-mermaid/index.ts`. Essa função (cálculo de raias, nós, ordem de fluxo, ordem de raias, validação de referências) é extraída para `lib/flow-graph/contexto.ts` e importada por ambos os módulos, para não existir em dois lugares.

### `lib/flow-mermaid` (adaptado)

Deixa de ler o YAML do documento do guia diretamente. A função `gerarDiagrama` e as internas de montagem (`montar`, `declaracaoNo`, `arestaTexto`, `legenda`, classes CSS) passam a receber um `ModeloDeGrafo` em vez de `(doc, demandaId)`. A API pública usada hoje por `flow.ts` e `api.ts` se mantém com uma função de compatibilidade:

```ts
// lib/flow-mermaid/index.ts
export function gerarDiagrama(doc: Item, demandaId: string, visao: string, comLegenda?: boolean, subtarefas?: boolean): Diagrama {
  return gerarDiagramaDoGrafo(gerarGrafo(doc, demandaId), visao, comLegenda, subtarefas);
}
export function gerarDiagramaDoGrafo(grafo: ModeloDeGrafo, visao: string, comLegenda?: boolean, subtarefas?: boolean): Diagrama;
```

Isso preserva `tests/mermaid-parity/parity.test.ts` sem alteração (continua chamando `gerarDiagrama(guide, demanda, view)`), e dá ao futuro gerador no navegador a função `gerarDiagramaDoGrafo`, que roda tanto no build (Node) quanto no cliente (o módulo não usa `fs` nem `node:*`, é TypeScript puro sobre estruturas em memória; compila para o bundle do cliente com o mesmo código fonte, sem porte paralelo).

`visoesDoGuia` (usada por páginas de `guia-pratico`) segue a mesma adaptação: `guiaParaDoc` continua convertendo o front matter num documento de guia, que `gerarGrafo` consome.

### Interface de Renderizador e Perspectiva (Requirement 19)

```ts
// site/src/flow-app/renderer.ts (novo, roda no navegador)
export interface Renderizador {
  readonly perspectiva: string; // 'mermaid' | '3d' | ...
  montar(container: HTMLElement, grafo: ModeloDeGrafo, estado: EstadoDiagrama): Promise<InstanciaRenderizador>;
}
export interface InstanciaRenderizador {
  atualizar(estado: EstadoDiagrama): Promise<void>; // troca de View, Subtarefas, destaque
  focarNo(idNo: string): void;
  destruir(): void;
}
export type EstadoDiagrama = {
  view: string;                    // 'geral' | 'raia:<id>' | 'completo'
  expandidas: ConjuntoExpandido;   // vazio em 'geral', todas as raias em 'completo'
  subtarefas: boolean;             // alternador global (Requirement 5)
  noSelecionado?: string;
  noDestacado?: string;
};
```

A Perspectiva Mermaid é um `Renderizador` que chama `gerarDiagramaDoGrafo` e entrega o SVG ao `mermaid.render` já vendorizado (reaproveita `vendor/mermaid/mermaid.min.js` e a inicialização de `Diagram.astro`). Uma Perspectiva `3d` futura implementa a mesma interface sem tocar `lib/flow-graph` nem a página Astro: ela se registra num mapa `PERSPECTIVAS: Record<string, Renderizador>` que o seletor lê.

### Visão geral e expansão progressiva (Requirement 20)

O `completo` existe e é alcançável sem limite, mas deixa de ser o primeiro desenho. A página abre na Visão geral, com cada Raia recolhida num Cluster_de_Raia, e o usuário expande Raias e Subtarefas sob demanda até o detalhe total. Expandir tudo é o atalho para o mesmo ponto final.

#### Modelo de Views

| View | Conjunto_Expandido | Texto_Mermaid | Golden |
|---|---|---|---|
| `geral` (inicial) | nenhuma raia expandida | novo: um nó por Raia e arestas agregadas | novo, fixado depois da primeira revisão |
| expansão parcial | as raias escolhidas (e as Subtarefas escolhidas) | novo: raias expandidas como `subgraph`, as demais como clusters | sem golden por combinação; coberto por propriedades |
| `completo` | todas as raias | o mesmo texto do gerador atual | `feature.completo.mmd` e `feature.completo.subtarefas.mmd` |
| `raia:<id>` | foco numa raia (visão existente) | o mesmo texto do gerador atual | `feature.<raia>.mmd` |
| `visao` (legado) | não é aba; alias de `geral` na URL | o texto atual da raia orquestradora segue gerado | `feature.visao.mmd`, intacto, para a paridade do Requirement 19.8 |

A Aba_de_View `geral` substitui `visao` na ordem das abas (Requirement 2.5). O texto legado de `visao` permanece no gerador só como compatibilidade e oráculo de teste.

#### Modelo de dados da expansão

O Modelo_de_Grafo não ganha campos. As contagens e as arestas agregadas derivam dele em tempo de execução, para o contrato continuar pequeno e independente do Renderizador (Requirement 17.6). Os tipos abaixo vivem no módulo puro `lib/flow-graph/expansao.ts`, que roda no build e no navegador.

```ts
// lib/flow-graph/expansao.ts (novo, TypeScript puro, sem fs nem DOM)
export interface ConjuntoExpandido {
  raias: ReadonlySet<string>;      // ids de Raia expandidas
  subtarefas: ReadonlySet<string>; // ids de tarefa com Subtarefas expandidas (só vale em raia expandida)
  todasSubtarefas: boolean;        // alternador global do Requirement 5, vale para toda raia expandida
}
export interface ClusterDeRaia {
  raia: string;
  totais: { nos: number; tarefas: number; gateways: number; chamadas: number; subtarefas: number };
  arestasInternas: number;         // arestas com os dois extremos na raia, omitidas do desenho
  entradas: number;                // arestas agregadas que chegam
  saidas: number;                  // arestas agregadas que saem
}
export interface ArestaVisivel {
  origem: string;                  // id de Nó ou `cluster:<raia>`
  destino: string;
  rotulo: string;                  // rótulo original se quantidade === 1, senão `×N`
  tracejada: boolean;
  quantidade: number;              // arestas do Modelo_de_Grafo que ela representa
}
export interface GrafoVisivel { clusters: ClusterDeRaia[]; nos: NoDoGrafo[]; arestas: ArestaVisivel[]; }

export function projetar(grafo: ModeloDeGrafo, conj: ConjuntoExpandido): GrafoVisivel;
export function chaveDoConjunto(conj: ConjuntoExpandido): string;       // canônica, ordenada, para cache e hash
export function lerConjunto(chave: string, grafo: ModeloDeGrafo): ConjuntoExpandido; // inverso, normaliza para completo
```

Regras de `projetar`:

1. Um Nó pertence ao desenho se a Raia dele está em `conj.raias`. Uma Subtarefa pertence se a tarefa dela está em `conj.subtarefas` ou se `todasSubtarefas` vale, e a Raia está expandida.
2. Cada Raia fora de `conj.raias` vira um Cluster_de_Raia com os totais calculados dos Nós e Subtarefas do Modelo_de_Grafo.
3. Para cada aresta `(u, v)`, o extremo `u` vira o próprio Nó se a Raia dele está expandida, ou o cluster dela se não está (o mesmo para `v`). Se os dois extremos caem no mesmo cluster, a aresta é interna e só entra em `arestasInternas`.
4. Arestas entre Nós de Raias expandidas ficam como são, uma a uma, para que `completo` produza as mesmas linhas do gerador atual. Arestas que tocam ao menos um cluster são agrupadas por `(origem, destino, tracejada)`, com `quantidade` igual ao número de arestas agrupadas.
5. Conservação: a soma das `quantidade` das arestas que tocam cluster, mais `arestasInternas` de todos os clusters, mais as arestas entre Nós expandidos, é igual ao número de arestas do Modelo_de_Grafo (Property 11).

#### Derivação do Texto_Mermaid por Conjunto_Expandido

```ts
// lib/flow-mermaid/index.ts (adaptado)
export function gerarDiagramaExpandido(grafo: ModeloDeGrafo, conj: ConjuntoExpandido, comLegenda?: boolean): Diagrama;
```

- Se `conj.raias` contém todas as Raias do grafo, a função delega ao mesmo caminho que gera `completo` (com ou sem Subtarefas conforme `conj`), sem passar por cluster. Isso garante a igualdade byte a byte com os goldens (Property 12) sem exigir que o código de cluster reproduza o texto antigo.
- Caso contrário, `projetar` produz o `GrafoVisivel`, e a montagem reaproveita as funções existentes de declaração de nó, aresta e `subgraph` para as Raias expandidas. Cada cluster vira um nó `z_CL_<raia>["<b>nome</b><br/>N tarefas, M gateways, K subtarefas"]` com a cor da Raia (a mesma `classDef` das raias) e o `data-id` mapeado pelo `mapaIds` que o gerador já devolve. A aresta agregada com `quantidade` maior que 1 recebe o rótulo `×N`.
- A legenda da Visão geral lista os tipos de elemento (cluster, tarefa, gateway, chamada, fim, Subtarefa e Subtarefa condicional) e deixa de listar uma entrada por Raia, porque os clusters já têm o nome da Raia. Nos Conjuntos_Expandidos intermediários a legenda é a mesma da Visão geral.
- O texto é função pura de `(grafo, conj)`. A ordem em que o usuário expandiu as Raias não altera o texto (Property 14).

#### Renderização incremental

O Mermaid 11 não tem API de atualização parcial: `mermaid.render` desenha um texto inteiro. O desenho incremental do kit é, portanto, em três camadas:

1. **Texto derivado do conjunto.** Gerar o texto de um Conjunto_Expandido leva milissegundos e roda no cliente. Só o conjunto novo é renderizado, nunca as 25 raias de novo quando só uma mudou o estado.
2. **Cache de SVG por conjunto.** `expansao.ts` guarda o SVG já renderizado sob `chaveDoConjunto`, com limite por bytes (por exemplo 16 MB, descartando o menos recente), porque o SVG do `completo` tem 4,2 MB. Voltar a um estado visto custa a troca do SVG no DOM, dentro de 200 ms, e é o que cobre "recolher" depois de "expandir".
3. **Fila com descarte.** Cada pedido de estado recebe um número de sequência. O resultado de um `mermaid.render` só é aplicado se o número ainda for o último, e o Diagrama anterior continua visível e interativo (zoom e arraste) até lá.

O crescimento do custo por passo é o da tabela de tempos: cada passo renderiza o conjunto visível (clusters mais Nós das Raias expandidas), e não o `completo`. O spike abaixo decide se isso basta.

#### Expandir tudo sem congelar a interface

`mermaid.render` roda na thread principal e precisa do DOM (medidas de texto com `getBBox`), então não roda em Worker. O comportamento especificado é:

1. O clique mostra imediatamente um indicador "Desenhando N nós" (`aria-busy` e `role="status"`), antes de iniciar o trabalho: o código cede dois quadros (`requestAnimationFrame` duplo) para o indicador pintar em até 100 ms.
2. O Diagrama anterior permanece na tela. Em CPU 4x, o bloqueio de interação dura o tempo do render (3,6 s para `completo`, estimativa de cerca de 1 s sem limitação de CPU). Esse tempo excede o alvo interativo de 2,0 s, e o requisito aceita isso desde que haja progresso e conclusão sem erro (Requirement 20.9).
3. Ao terminar, o SVG novo substitui o anterior, o indicador some e a página informa o tempo gasto. Se o usuário pediu outro estado nesse intervalo, o resultado é descartado e o pedido mais novo é desenhado.
4. "Expandir tudo" não inclui Subtarefas. O `completo` com Subtarefas (cerca de 400 nós, 10 s medidos com CPU 4x) é uma ação à parte, e o texto do botão avisa do tempo.
5. Se o Mermaid recusar o texto por `maxTextSize` ou `maxEdges`, o Diagrama mostra a alternativa textual acessível e a mensagem do limite. A configuração padrão do Mermaid (50.000 caracteres, 500 arestas) já está no limite: `completo` tem 47.773 bytes e `completo.subtarefas` tem 98.526 e 449 arestas. O `initialize` do kit eleva os dois limites com folga.

Se o spike mostrar que um bloqueio de vários segundos é inaceitável, a saída é o Renderizador próprio (O6) com layout em Worker, que remove o bloqueio por construção. Esse é o único caminho sem congelamento, e é por isso que o spike mede um protótipo dele.

#### Spike de desempenho (primeira tarefa da entrega)

Objetivo: escolher, com números, como renderizar o Conjunto_Expandido dentro dos alvos de tempo. Saída: um relatório curto neste design (seção "Resultado do spike", preenchida ao final do spike) com os números e a decisão. Nenhum código de interação do Diagrama começa antes disso.

| Alternativa | O que medir | Critério de aceite |
|---|---|---|
| S1. Linha de base: um `mermaid.render` por Conjunto_Expandido, texto derivado do grafo | tempo de Visão geral, de 1 raia expandida, de 5 raias, de `completo`, com CPU 4x; verificar a previsão linear | alvos da tabela de tempos |
| S2. Configuração do Mermaid | `maxTextSize` e `maxEdges` elevados; `layout: 'elk'` contra dagre (o ELK exige um pacote extra, medir o custo em kB gzip); `htmlLabels: false`; `flowchart.curve`; efeito de cada uma no tempo, no SVG e no `label-overlap` | ganho de tempo sem regressão visual nem de sobreposição, e custo de kB dentro do orçamento |
| S3. Fora da thread principal | Mermaid em iframe com `sandbox` sem `allow-same-origin` (pode ganhar processo próprio no Chromium) e em Worker (esperado: não funciona, pois exige DOM); medir se a página principal segue respondendo durante o render | entrada do mouse respondida em menos de 100 ms durante um render de 3 s |
| S4. Cache e antecipação | cache de SVG por conjunto; render antecipado, em tempo ocioso (`requestIdleCallback`), das raias mais prováveis depois que a Visão geral aparece; custo de memória e de CPU | ganho de tempo percebido sem prejudicar a interatividade da Visão geral |
| S5. Renderizador próprio | protótipo do layout com `@dagrejs/dagre` em Worker e SVG gerado pelo kit para 224 nós: tempo, kB gzip e diferença visual contra o golden | só vira o caminho principal se S1 a S4 não cumprirem os alvos |
| S6. Build ESM dividida (O2) | SVG idêntico ao do bundle único, `label-overlap` verde, tempo de carga e kB gzip medidos pela rede, comportamento sob `serve.ts` | libera trocar o teto de 1,1 MB pela meta de 300 kB |

O spike registra o resultado também como `tests/browser/performance.spec.ts` inicial (medição, ainda sem asserção), para que os números da entrega saiam do mesmo harness.

### Ilha `flow-app` (cliente, nova)

Substitui o carregamento automático de `Diagram.astro` nas páginas de Demanda por uma ilha maior, que monta uma vez por página e governa Diagrama, Modal, Catalogo_da_Demanda, Matriz_RACI e o Fragmento_de_Estado. Reaproveita a convenção `data-island` que `docs/architecture.md` já documenta (seção "Island convention").

```html
<section data-island="flow" data-flow-id="feature" data-flow-base="/software-engineer-kit">...</section>
```

Responsabilidades (módulos sob `site/src/flow-app/`, todos TypeScript sem framework, carregados só nesta página):
- `loader.ts`: busca `api/flows/<id>.graph.json` uma vez por carregamento de página (`fetch`, cache do navegador faz o resto); nunca busca de novo ao trocar View, Subtarefa, Perspectiva ou Filtro (Requirement 15.10).
- `renderer.ts` e `perspectives/mermaid.ts`: Perspectiva e interface acima.
- `expansao.ts`: Conjunto_Expandido, fila de renderização com descarte de pedidos obsoletos, cache de SVG e indicador de progresso (Requirement 20).
- `interaction.ts`: clique, arraste, zoom, teclado, `data-id` (Requirement 3).
- `modal.ts`: Modal_de_Playbook e Historico_do_Modal (Requirement 6).
- `catalog.ts`: Catalogo_da_Demanda com filtros (Requirement 9).
- `state.ts`: leitura e escrita do Fragmento_de_Estado com `history.replaceState`/`pushState` (Requirement 15.10).
- `noscript.ts` não existe: a alternativa sem JavaScript é gerada no servidor (Astro), não no cliente (Requirement 2.10, 19.7).

### Astro, islands e orçamento de bundle (Decisão de design A1)

**Decisão: vanilla TypeScript compilado por Vite/Astro, sem framework de UI (React, Vue, Svelte, Preact).**

| Alternativa | A favor | Contra | Decisão |
|---|---|---|---|
| Vanilla TS + Astro `client:*` script | Zero runtime de framework; `docs/architecture.md` já define a convenção `data-island`; o JavaScript do kit cabe folgado na carga inicial de 300 kB gzip (o Mermaid fica na carga do Diagrama e é o maior item do orçamento, não a camada de interação) | Estado e DOM manuais, sem reatividade declarativa | **Escolhida** |
| Preact (ou `@astrojs/preact` com `client:visible`) | Reatividade declarativa para modal e filtros, ~4 kB gzip de runtime | Mais uma dependência e convenção de componente a manter; o projeto é 100% Astro sem framework hoje (ver `astro.config.mjs`, sem integração de framework) | Descartada: ganho pequeno frente ao custo de introduzir uma segunda convenção de UI |
| React | Ecossistema maduro | ~45 kB gzip de runtime, desproporcional ao problema, muda a stack documentada em `docs/architecture.md` ("Decisions": Node e TypeScript só) | Descartada |

Trade-off aceito: sem reatividade declarativa, o código de `flow-app` escreve DOM à mão nos pontos de atualização (troca de View, de Filtro, de Subtarefas). Isso é viável porque o Requirement 15.8 limita a granularidade das atualizações (200 ms para View/Subtarefas, 100 ms para Filtro), e manipulação direta de DOM bate esse orçamento com folga em qualquer framework.

**Esta decisão não abre ADR.** Não contradiz nem estende o ADR 0001 (que trata da fonte de dados, não da camada de apresentação) e é reversível sem migração de dados: troca de implementação de uma ilha, não de contrato.

### Orçamento de JavaScript e de tempo (Requirement 15.8, adotado por padrão, aberto a veto do dono)

**Correção de premissa.** A versão anterior deste design assumia que o orçamento de 300 kB gzip media só o JavaScript próprio do kit. O dono decidiu que o orçamento inclui o Mermaid (Decisão 13). O Mermaid vendorizado pesa 979.561 bytes gzip, então 300 kB não é alcançável com o bundle atual e o número precisa mudar. Esta seção define a estrutura nova, adotada por padrão e aberta a veto do dono. O dono também decidiu que abrir por `file://` não é requisito (Decisão 15), então o alvo é a build ESM dividida desde o início.

#### O que existe no vendor e no build (medido)

- `site/public/vendor/mermaid/mermaid.min.js` é um bundle único (IIFE, esbuild) da versão 11.17.2 com todos os tipos de diagrama. Ele carrega por `script` e fica como fallback se o spike mostrar um bloqueio na build ESM dividida.
- A mesma versão publicada no npm traz a build ESM dividida (`mermaid.esm.min.mjs` mais 103 arquivos em `chunks/mermaid.esm.min/`), que carrega cada tipo de diagrama por `import()` sob demanda. O fecho estático de importações da entrada tem 19 arquivos (754.127 bytes, 198.134 bytes gzip). Carregar uma página de flowchart pela rede, com layout dagre, buscou 25 arquivos: 820.017 bytes, 220.796 bytes gzip (medido com Playwright contra um servidor HTTP local). Os chunks de outros tipos de diagrama (sequence, gantt, architecture, katex e demais) não são pedidos.
- O vendor completo mais o cache de chunks em `site/dist` ocupam cerca de 3,5 MB em disco nas duas formas. Trocar uma pela outra não aumenta `site/dist`.
- Não há service worker nem pré-cache hoje. "Offline" significa o `site/dist` servido localmente ou copiado. Os testes já servem o build por HTTP (`tests/browser/serve.ts`). Abrir por `file://` não é requisito (Decisão 15): o site é servido por `npm run preview`, localhost ou hospedagem estática, com cache.

#### Opções para reduzir o custo do Mermaid

| Opção | Efeito medido ou estimado | Custo e risco | Avaliação |
|---|---|---|---|
| O1. Manter o bundle único, carregado depois da carga inicial e só em página com Diagrama | 979.561 bytes gzip; carga e inicialização de 0,94 a 1,01 s com CPU 4x | nenhum; é o fluxo mais simples | **Fallback**, usado só se o spike mostrar um bloqueio no O2 (teto de 1,1 MB) |
| O2. Build ESM dividida, flowchart mais dagre por `import()` | 220.796 bytes gzip medidos (25 arquivos); sem os tipos de diagrama que o kit não usa | exige HTTP (o navegador bloqueia `import()` de módulos por `file://`); os nomes dos chunks têm hash, então o build copia a pasta inteira da versão fixada; 25 requisições por página; é preciso provar que o SVG é idêntico ao do bundle único | **Alvo desde o início** (importação preguiçosa só dos chunks de flowchart e dagre, por HTTP); o spike confirma a equivalência |
| O3. Build própria só de flowchart (esbuild do `mermaid.core`) | ganho esperado pequeno sobre O2, porque o código dos outros tipos já não é pedido | mantém um fork de empacotamento a cada versão do Mermaid; o Mermaid 11 não tem entrada oficial só de flowchart | Não recomendada |
| O4. Carga lazy por tipo de diagrama | já é o que O2 faz; a carga lazy do bundle único só adia o custo | | Coberta por O1 (adia) e O2 (reduz) |
| O5. Cache compartilhado entre páginas | o arquivo (ou a pasta de chunks) tem URL estável por versão e é pedido uma vez por sessão para as 12 Demandas; com `Cache-Control` imutável do host, revisitas custam zero | o orçamento mede a primeira visita; cache HTTP não garante offline; um service worker daria pré-cache real, mas é uma peça nova a manter | Aproveitar sem criar service worker; avaliar o service worker em spec própria |
| O6. Renderizador próprio no lugar do Mermaid (layout dagre em Worker mais SVG do kit) | tira o Mermaid da página; permite layout fora da thread principal; custo esperado de dezenas de kB gzip | esforço grande, risco visual contra os goldens, e a Perspectiva já isola a troca | Fica para uma spec posterior (naturalmente junto da Perspectiva 3D). O spike mede um protótipo para decidir |

**Recomendação.** Adotar O2 como alvo desde o início, carregando só os chunks de flowchart e dagre depois da carga inicial e só nas páginas com Diagrama. O spike (S6) prova que o SVG e o `label-overlap` não regridem. O1 fica como fallback somente se o spike mostrar um bloqueio, caso em que o teto de 1,1 MB vale até o bloqueio sair. O6 só entra se o spike mostrar que a expansão não cabe nos alvos com o Mermaid. O dono pode vetar (ver "Decisões do dono adotadas por padrão").

#### Estrutura proposta (gzip, por página de Demanda, Demanda_Piloto)

| Parte | Teto (falha o teste) | Meta (aviso) | Evidência |
|---|---|---|---|
| Carga inicial: HTML, CSS, JavaScript do kit, Modelo_de_Grafo, sem Mermaid | 300 kB | 150 kB | O número de 300 kB aprovado antes passa a ser o teto da carga inicial. O JavaScript do kit foi estimado em cerca de 60 kB por módulo (interação 15, modal 8, catálogo 20, geração do texto 10, estado e expansão 7). O Modelo_de_Grafo estimado em 35 a 45 kB para 224 nós, e hoje `api/flows/feature.json` com os dois textos Mermaid já tem 33.604 bytes. Nenhum desses módulos existe ainda, então a primeira medição real vem do teste de orçamento |
| Carga do Diagrama: Mermaid, layout e Renderizador, carregada depois da carga inicial, só em página com Diagrama | 1,1 MB (teto) | 300 kB (meta, com O2 como alvo) | O1: 979.561 bytes gzip mais margem de 12% para o Renderizador e a atualização do Mermaid. O2: 220.796 bytes medidos mais cerca de 35% de margem |
| Total por página | 1,4 MB (teto) | 600 kB (meta, com O2 como alvo) | soma dos tetos (300 kB mais 1,1 MB) e das metas (300 kB mais 300 kB). O protótipo `guia.html` tem 1.941.365 bytes gzip e carrega bem, então o teto é 28% menor que o do protótipo que o dono usa como referência |

Regra de medição: o teste lista os arquivos `.js` e `.json` pedidos pela página (`performance.getEntriesByType('resource')`), comprime cada arquivo de `site/dist` com gzip nível 9 e soma por grupo (carga inicial e carga do Diagrama). Medida acima do teto falha o teste. Medida acima da meta e abaixo do teto vira aviso no relatório (Requirement 15.8).

#### Tempos por passo (CPU 4x, p95 de 10 execuções)

| Passo | Alvo | Evidência |
|---|---|---|
| Visão geral interativa (documento, Mermaid, 25 clusters) | 2,0 s | carga e inicialização do Mermaid 0,94 a 1,01 s, mais o render da Visão geral 0,26 a 0,32 s, cerca de 1,3 s esperados |
| Expandir uma Raia a partir da Visão geral | 1,0 s | maior raia (25 nós) 0,57 a 0,76 s isolada; raia típica (13 nós) 0,22 a 0,36 s. O Diagrama com uma raia expandida mais 24 clusters ainda não foi medido, e o spike mede |
| Voltar a um estado já renderizado (cache de SVG) | 200 ms | troca de SVG no DOM, sem `mermaid.render` |
| Expandir tudo (`completo`, 224 nós) | 5,0 s, com indicador em até 100 ms | 3,57 a 3,73 s medidos, mais margem de 35% |
| `completo` com Subtarefas (cerca de 400 nós) | 12 s, aviso quando excede | 10,1 a 10,9 s medidos |
| Filtro do Catalogo | 100 ms | aprovado na Decisão 7 |

O custo medido cresce quase linearmente com os nós visíveis (cerca de 15 a 17 ms por nó mais 0,2 s fixos, com CPU 4x). Esse modelo linear prevê 0,6 a 0,8 s para uma raia de 25 nós sobre a Visão geral e 1,3 s para cinco raias. É uma previsão a validar no spike, e não um resultado.

## Data Models

### Modelo_de_Grafo (`ModeloDeGrafo`)

Schema JSON versionado, gerado em `schema/json/grafo-fluxo.json` por `tools/schema/generate.ts`, a partir de um schema Zod em `lib/schema/grafo.ts` (mesmo padrão dos demais tipos: `lib/schema/*.ts` → `schema/json/*.json`).

```ts
// lib/schema/grafo.ts (novo)
export const VERSAO_MODELO_DE_GRAFO = 1;

export type TipoDeNo = 'inicio' | 'tarefa' | 'bifurcacao' | 'chamada' | 'fim';

export interface SubtarefaGrafo {
  id: string;
  rotulo: string;
  ordem: number;            // posição de execução, 0-based
  condicional: boolean;     // truthy(sub.quando)
  quando?: string;          // descrição legível da condição (via descreverCondicao)
  papel?: string;
  responsavel?: 'agente' | 'pessoa' | 'ambos';
}

export interface NoDoGrafo {
  id: string;               // ID_de_No, igual ao id no Guia_YAML
  tipo: TipoDeNo;
  rotulo: string;
  raia: string;             // id da Raia
  ordem: number;            // posição no fluxo da Raia (ordemFluxo), 0-based
  raiaChamada?: string;     // só tipo === 'chamada'
  retorno?: string;         // só tipo === 'fim'
  subtarefas: SubtarefaGrafo[]; // vazio quando o nó não tem
  temPlaybook: boolean;     // o cliente resolve o conteúdo por id (Requirement 17.6), não o carrega aqui
}

export interface ArestaDoGrafo {
  origem: string;           // ID_de_No
  destino: string;          // ID_de_No
  rotulo: string;           // condição ou retorno, texto já pronto para exibição
  tracejada: boolean;       // aresta de chamada/retorno entre raias
}

export interface RaiaDoGrafo {
  id: string;
  nome: string;
  cor: string;               // "#RRGGBB", já validada (corValida)
  ordem: number;             // posição em ordemRaias, 0-based
  orquestradora: boolean;
}

export interface ModeloDeGrafo {
  versaoContrato: number;    // VERSAO_MODELO_DE_GRAFO
  demanda: string;           // id da Demanda
  nomeDemanda: string;
  raias: RaiaDoGrafo[];      // já na ordem de exibição (ordemRaias)
  nos: NoDoGrafo[];          // já na ordem de exibição (ordemFluxo por raia)
  arestas: ArestaDoGrafo[];
}
```

Decisões de modelagem:

- **Ids e metadados estruturais, sem conteúdo de Playbook** (Requirement 17.6). O campo `temPlaybook: boolean` basta para o cliente decidir se mostra o atalho "ver playbook"; o conteúdo vem de `api/flows/<id>.json` (já existente, ampliado) ou de uma rota dedicada por nó, resolvida por id no `SiteIndex`, igual ao padrão já usado pelas páginas de Entidade.
- **`ordem` explícito em vez de depender da posição no array** (Requirement 17.7: "dois Renderizadores diferentes exibem os Nós na mesma ordem relativa"). Guardar a ordem como campo evita que um Renderizador que reordene por outro critério (por exemplo, para layout de força em 3D) perca a informação de ordem relativa dentro da Raia.
- **RACI e entradas/saídas não entram no Modelo_de_Grafo.** Eles pertencem à Matriz_RACI e ao painel de entradas/saídas do Modal_de_Playbook (Requirements 7 e 8), resolvidos a partir de `api/flows/<id>.json` por `ID_de_No`, não do grafo. Isso mantém o Modelo_de_Grafo pequeno (dentro do orçamento de 200 kB) e focado só no que o Renderizador precisa para desenhar.
- **Visão e Raias calculadas no cliente, não serializadas por View.** `visoesDaDemanda` já deriva a lista de Views a partir de `raias` (`VISAO`, `raia:<id>` por raia, `COMPLETO`); o cliente roda a mesma lógica (mesmo código de `lib/flow-mermaid`/`lib/flow-graph`, compilado para o navegador) sobre o único `ModeloDeGrafo`, sem precisar de um payload por View.

### Round trip (Requirement 17.8) e correspondência com o YAML (Requirement 17.9)

`ModeloDeGrafo` é um objeto de dados puro (sem funções, sem referências circulares: arestas e subtarefas referenciam por id em string). `JSON.parse(JSON.stringify(grafo))` produz um objeto estruturalmente igual. A igualdade usada no teste de propriedade é `deepEqual` por campo, não por identidade de objeto.

A correspondência com o Guia_YAML é feita por **reconstrução inversa**: dado um `ModeloDeGrafo`, é possível recompor o conjunto de nós, raias, arestas e subtarefas que ele representa e comparar (como conjunto, não como array ordenado) com o que `gerarGrafo` extrai direto do documento do guia. Essa comparação de conjuntos é o teste de propriedade 9 (ver Correctness Properties).

### Publicação (onde o Modelo_de_Grafo mora no build)

```
site/dist/<locale>/api/flows/<demandaId>.graph.json   # Modelo_de_Grafo, estável entre locales (não tem texto traduzido: nomes de raia e rótulo vêm do Guia_YAML, hoje só em pt-BR, fallback já coberto pelo Requirement 15.5)
```

Gerado por uma rota Astro estática nova, análoga a `site/src/pages/[locale]/api/flows/<slug>.json.ts` (hoje `flows` é só um diretório vazio em `api/`; o arquivo real a criar é `site/src/pages/[locale]/api/flows/[id].graph.json.ts`, com `getStaticPaths` sobre as Demandas não biblioteca). Reaproveita `flowJson` como referência de formato, mas é um endpoint novo e separado (o grafo não substitui `api/flows/<id>.json`, que continua a existir para o conteúdo de Playbook e RACI).

### Catálogo (facetas geradas do schema)

```ts
// lib/facets/index.ts (novo)
export interface DefinicaoDeFaceta {
  campo: string;               // nome do campo no schema (ex.: "categorias", "linguagens")
  tipoValor: 'string' | 'enum' | 'lista-de-ids' | 'lista-de-enum';
  aplicavelA: string[];        // tipos de Entidade que têm o campo (ex.: ["ferramenta", "modelo"])
  rotuloChaveI18n: string;     // "facet.<campo>"
}
export function derivarFacetas(schemas: Record<string, JSONSchema>): DefinicaoDeFaceta[];
export interface IndiceDeFacetas {
  valores: Map<string, Map<string, Set<string>>>; // campo -> valor -> ids de Entidade
}
export function construirIndice(facetas: DefinicaoDeFaceta[], entidades: Array<{ id: string; tipo: string; data: Record<string, unknown> }>): IndiceDeFacetas;
```

`derivarFacetas` lê os mesmos `schema/json/*.json` que já existem (gerados por `tools/schema/generate.ts` a partir de `lib/schema/*.ts`), filtra campos com `enum` ou com `items.enum`/`items.type === 'string'` em listas de ids conhecidas (`ferramentas`, `categorias`, `linguagens`, `casosDeUso`, `empresa`, `licenca`, `dominio`, `subtipo` e equivalentes), e produz a lista de Facetas sem o código da interface conhecer um nome de campo fixo. Isso implementa o Requirement 11.3 ("um atributo novo no modelo apareça como Faceta sem alteração do código da interface"): o código da interface lê `DefinicaoDeFaceta[]`, nunca um literal `'linguagens'`.

Publicação: `api/catalog.json` (lista de Entidades do Catalogo com os valores de Faceta já extraídos) e `api/facets.json` (a lista de `DefinicaoDeFaceta` com os valores possíveis e a contagem total, para montar os controles sem reprocessar `index.json`).

### Catalogo_da_Demanda

```ts
export interface ItemDaDemanda {
  id: string;
  categoria: 'artefato' | 'variavel' | 'tecnica' | 'no' | 'subtarefa';
  nome: string;
  descricao?: string;
  exemplo?: string;
  raia?: string;       // para o filtro "Raia" (Requirement 9.2, 9.5)
  tipo?: string;
  tipoArtefato?: string;
  subtipo?: string;
  papeis?: string[];   // ids de Papel envolvidos (para o filtro "Papel")
  letrasRaci?: string[]; // letras RACI presentes no item (para o filtro "Letra RACI")
}
```

Publicado em `api/catalog/<demandaId>.json`, derivado de `rastrearDados` (produção e consumo de artefato/variável, já existente em `lib/guide/rastreio.ts`) mais os nós, subtarefas e técnicas da Demanda. Contagens "N de M" são calculadas no cliente sobre este array, sem nova busca de rede (Requirement 9.3, 15.8).

### Matriz_RACI

Derivada no cliente a partir de `api/flows/<id>.json` (que já traz `decisoes`, com `papel`, `apoio`, `consultado`, `informado`, `aprova` por nó, e `papeis` da Demanda). Não precisa de endpoint novo: `flowJson` ganha o campo `papeis` (lista de Papéis da Demanda, hoje já presente em `d.papeis`) e os campos RACI por nó já estão em `decisoes`.

### Extensão do Guia_YAML (Requirement 10)

Novo em `schema/flows.schema.json`, dentro de `$defs/Decisao` (campo opcional em nós do tipo `tarefa`, e por simetria em `$defs/Subtarefa`):

```json
"categorias_ferramenta": {
  "$ref": "#/$defs/IdLista",
  "description": "Ids de categoria-ferramenta que apoiam esta tarefa ou subtarefa. Agnóstico de ferramenta."
},
"guias_praticos": {
  "$ref": "#/$defs/IdLista",
  "description": "Ids de notas content/pt-BR/guides/*.md (tipo guia-pratico) que detalham o como fazer desta tarefa ou subtarefa."
}
```

Ambos opcionais (schema `additionalProperties: false` em `Decisao` e `Subtarefa` precisa listá-los explicitamente nas `properties`, senão o Ajv rejeita o documento: isso é a mudança de schema em si, não um `$ref` genérico). `IdLista` já existe como `$def` (lista de ids, usada por `categorias_ferramenta` no nível de `ItemConceitual`/`Celula`/`Playbook` hoje).

Observação de dados real: hoje `categorias_ferramenta` existe como coleção de topo (`content/guide/catalogos/ferramentas.yaml`, vazia) e em `Celula`/`Playbook`, mas nenhuma `Decisao` (tarefa) ou `Subtarefa` tem o campo. É exatamente o gap que o Requirement 10 e o Requirement 18.3 descrevem.

## Correctness Properties

*Uma propriedade é uma característica ou comportamento que deve valer em toda execução válida do sistema, em essência, uma afirmação formal sobre o que o sistema deve fazer. Propriedades são a ponte entre a especificação legível por humanos e garantias de correção verificáveis por máquina.*

Esta spec mistura lógica pura adequada a testes de propriedade (o Modelo_de_Grafo, a derivação do Texto_Mermaid, o índice de facetas) com comportamento de interface mais adequado a testes de navegador (Playwright). As propriedades abaixo cobrem a parte de lógica pura; a parte de interface entra na Testing Strategy como testes de navegador mapeados aos Requirements.

### Property 1: Round trip de serialização do Modelo_de_Grafo

*Para todo* documento válido do Guia_YAML e toda Demanda não biblioteca dele, serializar o `ModeloDeGrafo` gerado por `gerarGrafo` em JSON e desserializá-lo produz um objeto estruturalmente igual ao original (mesmos campos, mesmos valores, para todo nó, aresta, raia e subtarefa).

**Validates: Requirements 17.8**

### Property 2: O Modelo_de_Grafo não acrescenta nem perde elementos do Guia_YAML

*Para toda* Demanda, o conjunto de ids de Nó do `ModeloDeGrafo` é igual ao conjunto de ids de `decisoes` do Guia_YAML cuja raia pertence ao contexto da Demanda; o conjunto de ids de Subtarefa é igual ao conjunto de ids de `subtarefas` desses nós; o conjunto de pares (raia, id) é igual ao conjunto de Raias do contexto da Demanda; e toda aresta do `ModeloDeGrafo` corresponde a uma transição (`proximo`) ou a uma chamada/retorno declarados no Guia_YAML.

**Validates: Requirements 17.9**

### Property 3: Ordem relativa estável dentro da Raia

*Para toda* Demanda e toda Raia dela, a sequência de valores `ordem` dos Nós daquela Raia no `ModeloDeGrafo`, ordenada, reproduz exatamente a sequência que `ordemFluxo` calcularia para os mesmos nós a partir do Guia_YAML (mesma relação de precedência, independente de qual Renderizador lê o campo depois).

**Validates: Requirements 17.7**

### Property 4: O Texto_Mermaid é função pura do Modelo_de_Grafo

*Para todo* `ModeloDeGrafo` válido e toda View, `gerarDiagramaDoGrafo(grafo, view)` chamado duas vezes com o mesmo `grafo` produz o mesmo Texto_Mermaid; e para toda mutação que altera um campo observável de um Nó, uma Aresta ou uma Raia do `ModeloDeGrafo` (rótulo, cor, tipo, ordem, subtarefas), o Texto_Mermaid resultante muda de forma correspondente (ou, no caso de um campo que o Mermaid não imprime, permanece estável, e o teste cobre só os campos que o texto imprime).

**Validates: Requirements 19.9**

### Property 5: Paridade byte a byte entre o gerador antigo e o novo caminho

*Para toda* Demanda das goldens em `tests/fixtures/mermaid/golden/` e toda View dela, com e sem Subtarefas expandidas, `gerarDiagramaDoGrafo(gerarGrafo(doc, demandaId), view, comLegenda, subtarefas)` produz exatamente o mesmo texto que a golden gravada pelo gerador anterior (que por sua vez já tem paridade provada com o oráculo Python, `tests/mermaid-parity`).

**Validates: Requirements 19.8**

### Property 6: Facetas aplicam-se só aos tipos que têm o atributo

*Para toda* `DefinicaoDeFaceta` derivada de `derivarFacetas` e toda Entidade do `IndiceDeFacetas`, se o tipo da Entidade não está em `aplicavelA` da Faceta, então a Entidade não aparece em nenhum valor daquela Faceta no índice; e se o tipo está em `aplicavelA` mas a Entidade não declara valor para o campo, a Entidade fica fora de todo valor da Faceta mas dentro do universo de Entidades filtráveis quando a Faceta não está selecionada.

**Validates: Requirements 11.10, 11.13**

### Property 7: Filtro combinado é E entre Facetas, OU dentro da Faceta, e independente de ordem

*Para toda* combinação de valores selecionados em uma ou mais Facetas, o conjunto de Entidades resultante da filtragem é igual à interseção, entre Facetas, dos conjuntos de Entidades que atendem a ao menos um valor selecionado dentro de cada Faceta; e esse conjunto resultante não depende da ordem em que os Filtros foram aplicados (aplicar A depois B produz o mesmo conjunto que aplicar B depois A).

**Validates: Requirements 11.4, 11.5, 11.12**

### Property 8: Contagem de Faceta é consistente com o resultado filtrado

*Para toda* Faceta não selecionada e todo valor dela, o número exibido ao lado do valor é igual ao tamanho do conjunto de Entidades que passaria a ser o resultado se aquele valor fosse selecionado adicionalmente, mantendo os demais Filtros ativos.

**Validates: Requirements 11.6**

### Property 9: Contador do Catalogo_da_Demanda é exato por categoria e por Demanda

*Para toda* Demanda, o número de `ItemDaDemanda` de cada categoria (artefatos, variáveis, técnicas, Nós, Subtarefas) publicado em `api/catalog/<demandaId>.json` é igual ao número de itens dessa categoria que `rastrearDados` e a extração de nós/subtarefas calculam a partir do mesmo documento do Guia_YAML carregado por `loadGuideDoc`.

**Validates: Requirements 9.10**

### Property 10: A expansão é monótona

*Para todo* `ModeloDeGrafo` válido e todo par de Conjuntos_Expandidos `A` e `B` com `A.raias ⊆ B.raias`, `A.subtarefas ⊆ B.subtarefas` e `A.todasSubtarefas ⇒ B.todasSubtarefas`, o conjunto de Nós exibidos por `projetar(grafo, A)` está contido no de `projetar(grafo, B)`, e o conjunto de Clusters_de_Raia de `B` está contido no de `A`. Além disso, expandir uma única Raia ou uma única tarefa acrescenta exatamente os Nós dela (e das suas Subtarefas) e remove somente o cluster dela.

**Validates: Requirements 20.5, 20.7**

### Property 11: A projeção conserva arestas, Nós e extremos

*Para todo* `ModeloDeGrafo` válido e todo Conjunto_Expandido, a soma das `quantidade` das arestas que tocam um cluster, mais as `arestasInternas` de todos os clusters, mais as arestas entre Nós expandidos, é igual ao número de arestas do Modelo_de_Grafo; a soma dos `totais.nos` dos clusters mais os Nós expandidos das Raias recolhidas e expandidas é igual ao número de Nós do Modelo_de_Grafo; e todo extremo de `ArestaVisivel` é um Nó exibido ou um cluster existente, de modo que toda aresta com extremo em Raia recolhida termina no cluster dela.

**Validates: Requirements 20.2, 20.4**

### Property 12: Expandir tudo equivale ao `completo` dos goldens

*Para toda* Demanda das goldens em `tests/fixtures/mermaid/golden/` e para `todasSubtarefas` verdadeiro ou falso, `gerarDiagramaExpandido(grafo, conj)` com `conj.raias` igual a todas as Raias produz exatamente o texto de `feature.completo.mmd` (ou `completo.subtarefas.mmd`, conforme o caso) gravado pelo gerador atual.

**Validates: Requirements 20.6, 19.8**

### Property 13: O estado de expansão faz round trip no Fragmento_de_Estado e normaliza

*Para todo* `ModeloDeGrafo` válido e todo Conjunto_Expandido, `lerConjunto(chaveDoConjunto(conj), grafo)` produz um conjunto igual ao original; a chave não depende da ordem em que as Raias foram expandidas; e um conjunto com todas as Raias é normalizado para a View `completo`, com `normalizar(normalizar(c))` igual a `normalizar(c)` (idempotência).

**Validates: Requirements 20.8**

### Property 14: O Texto_Mermaid do conjunto não depende do caminho de expansão

*Para todo* `ModeloDeGrafo` válido e toda sequência de ações de expandir e recolher Raias que termine no mesmo Conjunto_Expandido, `gerarDiagramaExpandido` produz o mesmo texto, e o texto de um conjunto parcial contém, para cada Raia expandida, as mesmas linhas de declaração de Nó que o `completo` contém para essa Raia.

**Validates: Requirements 20.6, 17.5**

### Reflexão sobre redundância

Revisão das propriedades candidatas antes da lista final:

- Uma candidata "o Modelo_de_Grafo serializado tem o mesmo número de nós que o YAML" é subsumida pela Property 2 (igualdade de conjuntos implica igualdade de cardinalidade) e foi descartada como item separado.
- Uma candidata "trocar de Perspectiva preserva a View" é comportamento de interface (estado do cliente, não lógica pura) e entra como teste de navegador (Requirement 19.4), não como propriedade.
- A paridade do Property 5 e a pureza do Property 4 parecem próximas, mas validam requisitos diferentes: Property 4 prova que a função é determinística e sensível a mudanças (nenhuma duplicação de fonte de verdade escondida); Property 5 prova que a saída dessa função determinística é idêntica à saída do gerador anterior. As duas são necessárias e não se substituem: uma função pura e determinística ainda poderia, por erro de porte, produzir texto diferente do antigo.
- As propriedades de Faceta e Filtro (6, 7, 8) foram verificadas quanto a sobreposição: 6 fala de pertencimento ao universo da Faceta, 7 fala da composição E/OU do resultado final, 8 fala da contagem auxiliar. Nenhuma implica a outra (uma implementação poderia filtrar certo e contar errado, ou aceitar tipos errados na Faceta e ainda assim combinar E/OU certo), então as três se mantêm separadas.
- Properties 10 a 14 (expansão): a 10 (monotonia) e a 11 (conservação) são independentes, pois uma projeção pode acrescentar Nós monotonicamente e ainda perder arestas. A 12 (igualdade com os goldens) não é implicada pela 11, porque conservar arestas não garante o mesmo texto. A 13 (round trip do estado) e a 14 (independência do caminho) se complementam: a 13 prova que o estado serializa sem perda, a 14 prova que o texto depende só do estado. A candidata "o Texto_Mermaid da expansão é função pura do grafo e do conjunto" foi absorvida pela 14 e pela Property 4, que passa a valer para o par `(grafo, conjunto)`.

## Error Handling

| Cenário | Comportamento |
|---|---|
| O Modelo_de_Grafo de uma Demanda viola o schema (`schema/json/grafo-fluxo.json`) | O build falha, com o id da Demanda e o caminho do campo inválido na mensagem (Requirement 17.3), no mesmo estilo de erro que `validateSchema` já produz para `flows.schema.json`. |
| `categorias_ferramenta` ou `guias_praticos` de uma tarefa referencia um id inexistente | `REF_QUEBRADA` (novo caso de uso da regra já existente em `lib/guide/validate/dados.ts`/`rules.ts`), com o id da tarefa, o campo e o id não resolvido na mensagem (Requirement 10.3). |
| `categorias_ferramenta` ou `guias_praticos` repete um id na mesma tarefa | Aviso novo (nível `aviso`, mesmo padrão de `checarAvisos`), não bloqueia o build (Requirement 10.4). |
| Uma tarefa da Demanda_Piloto não declara nenhuma Categoria_de_Ferramenta nem marca explicitamente "sem ferramenta aplicável" | Falha de completude, no mesmo canal que `checarCompletude` já usa (avisos de completude só rodam com `avisos && completude`, e o check `flows` de `tools/validate/checks/flows.ts` já roda nesse modo estrito) (Requirement 10.16, 18.3). |
| `content/ids.lock.json` perderia um id existente | O check `ids-lock` já existente falha, sem mudança (Requirement 10.6). |
| O navegador busca `api/flows/<id>.graph.json` e a rede falha (uso offline de um build servido por HTTP, com cache) | O `fetch` é feito ao servidor local do próprio `site/dist` ou à hospedagem estática, e `file://` não é requisito (Decisão 15); não há dependência de rede externa. Em caso de corrupção do JSON local, a ilha `flow-app` mostra o fallback estático (os `<details>` de Playbook e a lista textual do Requirement 2.10), sem lançar excessão não tratada (Requirement 2.4). |
| Um artefato de entrada não tem produtor | O Modal_de_Playbook mostra "sem produtor" (Requirement 8.5), comportamento de interface, não erro de build; a detecção reaproveita `lacunasDeDados` de `lib/guide/rastreio.ts`, que já computa esse caso. |
| Nenhum Item_da_Demanda atende aos Filtros aplicados | Mensagem "nenhum item" e botão "Limpar filtros" (Requirement 9.8, 11.11), estado de interface, sem erro. |
| JavaScript desligado no navegador | A Pagina_de_Demanda exibe a alternativa textual acessível (lista ordenada de Nós por Raia com as transições, derivada do mesmo Modelo_de_Grafo no servidor) e os Playbooks em `<details>`, sem depender da ilha `flow-app` (Requirement 2.10, 19.7). Gerada no build por uma função pura `textoAcessivel(grafo)` que o Astro chama durante a renderização da página, símetrica à função que o cliente usaria, mas executada no servidor. |
| O Mermaid recusa um Texto_Mermaid por `maxTextSize` ou `maxEdges` | A configuração do kit eleva os dois limites. Se ainda assim o Mermaid recusar, o Diagrama mostra a alternativa textual acessível e a mensagem do limite, sem exceção não tratada (Requirement 20.10). Um teste de exemplo gera o texto de Expandir_tudo com Subtarefas de todas as Demandas e confere os limites configurados. |
| `mermaid.render` de um Conjunto_Expandido falha ou excede o tempo | O Diagrama anterior permanece, o indicador de progresso é removido, a página mostra o erro e oferece "Tentar de novo" e a alternativa textual (Requirement 20.9). |
| O usuário pede outro estado enquanto um render está em andamento | O resultado do render antigo é descartado pelo número de sequência e só o pedido mais novo é aplicado (Requirement 20.9). |
| Fragmento_de_Estado traz uma Raia inexistente no `exp` | A Raia desconhecida é ignorada, o estado válido restante é aplicado e a URL é normalizada com `history.replaceState`. |
| Link interno para Entidade inexistente (wikilink, `categorias_ferramenta`, `guias_praticos`) | O build falha com o id não resolvido, como já ocorre hoje para wikilinks (`BrokenLinkError`), reaproveitado para os campos novos através do mecanismo de `REF_FIELDS` em `lib/guide/entities.ts` (acrescentar `categorias_ferramenta: ['categoria-ferramenta']` e `guias_praticos: ['guia-pratico']`, hoje ausentes de `REF_FIELDS` apesar de `categorias_ferramenta` já existir ali em outro contexto). |

## Testing Strategy

### Abordagem dupla

- **Testes de propriedade** (`tests/flow-graph/*.props.test.ts`, novo, seguindo o padrão de `tests/guide/properties/`): cobrem as Properties 1 a 14 acima, mínimo 100 execuções cada, com `fast-check` (já é dependência: `fast-check: ^4.11.0`). Cada teste cita a propriedade do design no comentário, no formato **Feature: experiencia-fluxos-catalogo, Property N: <enunciado>**.
- **Testes unitários** (Vitest, `tests/flow-graph/*.test.ts`, `tests/facets/*.test.ts`): casos específicos (grafo de uma Demanda real como `feature`, exemplo de Faceta com valor ausente, exemplo de Filtro combinado) e casos de borda (Demanda biblioteca não gera grafo, nó sem Subtarefa não aparece na lista de Subtarefas).
- **Testes de navegador** (Playwright, `tests/browser/*.spec.ts`): cobrem interação (clique, arraste, zoom, teclado), navegação sem recarregar, Fragmento_de_Estado, e a tabela de paridade de `docs/guide-browser-tests.md`.
- **Teste de orçamento** (Playwright, `tests/browser/performance.spec.ts`, novo): mede as métricas do Requirement 15.8 contra `site/dist` com CPU 4x (CDP `Emulation.setCPUThrottlingRate`): tamanho gzip da carga inicial, da carga do Diagrama e do total (pela regra de medição do orçamento), Modelo_de_Grafo, Visão geral interativa, expansão de uma Raia, retorno a estado em cache, Expandir tudo, Expandir tudo com Subtarefas, filtro e crescimento de `site/dist`. Falha acima do teto e avisa acima da meta ou do limite marcado como aviso (Requirement 15.9). Usa a mesma técnica de medição já validada nesta sessão (`waitForFunction` sobre `data-rendered`, `performance.getEntriesByType('resource')` para o tamanho transferido, `du -sk site/dist` em um passo de shell do teste ou script auxiliar).
- **Testes de acessibilidade**: dentro dos specs de Playwright de interação, não um spec isolado: foco visível, `aria-current`, prender foco no Modal (`page.keyboard.press('Tab')` em loop e asserção de que o foco não escapa), rótulos de gesto (Requirement 3.10).

### Mapa de testes de navegador por critério de aceite (segue a convenção de `docs/guide-browser-tests.md`)

| Critério (`docs/guide-browser-tests.md`) | Requirement | Teste |
|---|---|---|
| 1, 2, 3 (clique, arraste, zoom, `data-id`) | 3.1 a 3.11 | `tests/browser/diagrama-interacao.spec.ts`, `tests/browser/diagrama-ids.spec.ts` |
| 4 (catálogo da demanda) | 9.1 a 9.9 | `tests/browser/catalogo-demanda.spec.ts` |
| 5 (troca de demanda sem recarregar) | 2.2 a 2.4, 18.4 | `tests/browser/demanda-troca.spec.ts` |
| 6 (ordem de views e nós) | 2.5, 2.6, 4.3, 4.6, 20.1 | `tests/browser/ordem-views.spec.ts` (abas `geral`, raias, `completo`; ordem horizontal estável também em cada Conjunto_Expandido) |
| 7 (subtarefas, sem sobreposição) | 5.1 a 5.8 | `tests/browser/label-overlap.spec.ts` (estendido às Views por raia, às Subtarefas expandidas e aos Conjuntos_Expandidos `geral`, cada raia isolada e Expandir_tudo, Requirements 16.5 e 20.12), `tests/browser/subtarefas.spec.ts` |
| (novo) Modal e histórico | 6.1 a 6.12 | `tests/browser/modal-playbook.spec.ts` |
| (novo) Matriz RACI | 7.1 a 7.10 | `tests/browser/matriz-raci.spec.ts` |
| (novo) Entradas/saídas e rastreio | 8.1 a 8.7 | `tests/browser/entradas-saidas.spec.ts` |
| (novo) Ferramentas e guias práticos | 10.7 a 10.14 | `tests/browser/ferramentas-guias.spec.ts` |
| (novo) Catálogo único (Area) | 11.1 a 11.14 | `tests/browser/catalogo-area.spec.ts` |
| (novo) Jornadas e competências | 12.1 a 12.8 | `tests/browser/jornadas.spec.ts` |
| (novo) Fragmento de estado | 15.10 | incluído nos specs acima, que leem `page.url()` após cada interação |
| (novo) Perspectiva | 19.1 a 19.5, 19.11 | `tests/browser/perspectiva.spec.ts` |
| (novo) Visão geral e expansão progressiva | 20.1 a 20.12 | `tests/browser/expansao-progressiva.spec.ts`: abre em `geral`, expande uma raia (só o conjunto novo é desenhado, contado por chamadas a `mermaid.render`), recolhe, expande Subtarefas de uma tarefa, Expandir tudo com indicador em até 100 ms e `data-id` igual ao do golden, pedido obsoleto descartado, teclado do cluster, URL `exp=` reaberta |
| (novo) Orçamento de desempenho | 15.8, 15.9 | `tests/browser/performance.spec.ts` |

### Matriz de sobreposição (Decisão 11 do dono)

Os estados cobertos por Demanda passam a incluir os Conjuntos_Expandidos: `geral`, cada Raia expandida isoladamente e Expandir_tudo, cada um com e sem Subtarefas (Requirements 16.5 e 20.12).

- **Todo Pull Request**: `tests/browser/label-overlap.spec.ts` roda a matriz completa da Demanda_Piloto (todas as Views dela, inclusive por Raia, com e sem Subtarefas, nos dois idiomas), como verificação obrigatória nova no workflow `pr.yml` (adicionar `npx playwright install --with-deps chromium` e `npm run test:browser` com filtro para a Demanda_Piloto, por exemplo `PLAYWRIGHT_DEMANDS=feature`).
- **Job agendado ou manual**: a mesma suíte roda sobre todas as 12 Demandas, como verificação não obrigatória, num novo workflow (`overlap-full.yml`, `schedule` mais `workflow_dispatch`), separado de `pr.yml` para não travar o PR por demandas que ainda não têm a completude de dados desta spec.

### Testes que não usam PBT, e por quê

- Build da página Astro (IaC-like, declarativa): testes de integração e `npm run smoke` (já existente), não propriedade.
- Geração de `api/*.json` (serialização de uma estrutura já validada): coberta pelo round trip (Property 1), mas a presença/ausência de um campo específico do payload é teste de exemplo, não propriedade.
- Desempenho do desenho (tempos de `mermaid.render`, tamanho gzip da carga): medição de navegador com limites, não propriedade, porque o resultado varia com a máquina e não com a entrada.
- Render visual do Modal e do Catálogo: snapshot/Playwright, não propriedade (comportamento de DOM, não função pura).

### Testes da expansão progressiva

- Propriedades 10 a 14 em `tests/flow-graph/expansao.props.test.ts` (`fast-check`, mínimo 100 execuções). Os geradores produzem `ModeloDeGrafo` aleatórios (Raias, Nós, arestas entre Raias, Subtarefas) e Conjuntos_Expandidos aleatórios, e usam também os grafos reais das 12 Demandas.
- A Property 12 reutiliza os goldens existentes. O golden novo da Visão geral (`feature.geral.mmd`) é gerado uma vez, revisado pelo dono e fixado, como foram os demais.
- O teste de exemplo de limites do Mermaid (Requirement 20.10) roda sobre as 12 Demandas.

## Ordem de entrega (fases)

A entrega segue esta ordem. As fases 1 e 2 reduzem o risco de desempenho antes de qualquer interação ser construída sobre o Mermaid. A decomposição em tarefas fica para `tasks.md`.

| Fase | Conteúdo | Saída verificável |
|---|---|---|
| 1. Spike de desempenho | Alternativas S1 a S6 da seção "Visão geral e expansão progressiva". Inclui o harness inicial de `tests/browser/performance.spec.ts` e o relatório "Resultado do spike" neste design | números por passo contra a tabela de tempos, decisão sobre Mermaid (bundle único, build dividida ou Renderizador próprio) e confirmação do orçamento pelo dono |
| 2. Modelo_de_Grafo e geração | `lib/flow-graph`, schema, `api/flows/<id>.graph.json`, `gerarDiagramaDoGrafo` com paridade dos goldens (Properties 1 a 5) | `tests/mermaid-parity` verde pelo novo caminho |
| 3. Expansão no modelo | `lib/flow-graph/expansao.ts`, `gerarDiagramaExpandido`, golden da Visão geral (Properties 10 a 14) | propriedades verdes e `completo` igual ao golden |
| 4. Ilha `flow-app` e Diagrama | loader, Perspectiva Mermaid, `expansao.ts` do cliente (cache, fila, progresso), interação, `data-id`, Fragmento_de_Estado | testes de navegador dos critérios 1, 2, 3, 5 e 6, mais `expansao-progressiva.spec.ts` |
| 5. Modal, Subtarefas, Matriz_RACI, entradas e saídas | Requirements 5 a 8 | critério 7 e specs correspondentes |
| 6. Dados e Catalogo_da_Demanda | extensão do YAML (Requirement 10), Catalogo_da_Demanda, Visao_de_Ferramentas_e_Guias | critério 4 |
| 7. Areas, Catalogo, Jornadas | menu de três Areas, facetas, filtros (Requirements 1, 11, 12) | specs de Area e Catalogo |
| 8. Orçamento e CI | `performance.spec.ts` com asserções, matriz de sobreposição no PR e job agendado | Requirement 15.8 e 16.9 verdes |

## Glossary

Este documento usa os termos já definidos no Glossary de `requirements.md` (Area, Demanda, Diagrama, Modelo_de_Grafo, Perspectiva, Fragmento_de_Estado, Renderizador, Faceta, Filtro, Catalogo_da_Demanda, Item_da_Demanda, Guia_Pratico, Categoria_de_Ferramenta, Guia_YAML, Validador_do_Guia, ID_de_No). Termos adicionados por este design:

- **Contexto (`Contexto`, tipo interno)**: estrutura intermediária hoje privada a `lib/flow-mermaid/index.ts` (raias, nós, ordens calculadas de uma Demanda), extraída para `lib/flow-graph/contexto.ts` nesta spec e compartilhada entre o gerador de grafo e o gerador de Mermaid.
- **Ilha `flow-app`**: o componente de cliente desta spec, seguindo a convenção `data-island` de `docs/architecture.md`, que concentra Diagrama, Modal, Catalogo_da_Demanda, Matriz_RACI e Fragmento_de_Estado de uma Pagina_de_Demanda.
- **DefinicaoDeFaceta / IndiceDeFacetas**: estruturas do módulo `lib/facets`, que derivam as Facetas do Catalogo a partir dos schemas JSON gerados de `lib/schema/*.ts`, sem a interface conhecer nomes de campo fixos.
- **ConjuntoExpandido / GrafoVisivel / ClusterDeRaia**: tipos do módulo puro `lib/flow-graph/expansao.ts`, que descrevem o estado de expansão do Diagrama, o grafo derivado dele (Clusters_de_Raia, Nós expandidos e arestas agregadas) e o resumo de uma Raia recolhida.
- **Visão geral (`geral`)**: View inicial, com todas as Raias recolhidas em Clusters_de_Raia. O `visao` legado (raia orquestradora) segue gerado só para a paridade com os goldens.
- **ModeloDeGrafo (tipo)**: a representação TypeScript/JSON Schema do Modelo_de_Grafo definido no Glossary de requisitos; ver Data Models para os campos.

## Decisões de design e alternativas (síntese das 7 perguntas do pedido)

### 1. Modelo JSON do grafo

Ver "Data Models". Decisão: schema Zod próprio (`lib/schema/grafo.ts`) gerado para `schema/json/grafo-fluxo.json`, versionado por `versaoContrato` (inteiro, não SemVer: o Modelo_de_Grafo não é consumido fora do próprio build e do próprio cliente, então um inteiro crescente basta e evita a complexidade de SemVer sem consumidor externo). Publicado como `api/flows/<id>.graph.json` por Demanda (JSON estático por arquivo, não um único JSON global), para manter o fetch de uma página de Demanda pequeno e dentro do orçamento de 200 kB. Alternativa descartada: um único `api/graph-de-fluxos.json` com todas as Demandas; descartada porque obrigaria o cliente a baixar o grafo de 12 Demandas para renderizar uma, ferindo o próprio orçamento que o Requirement 15.8 define por Demanda.

### 2. Renderizador, Perspectivas e o futuro do gerador direto do YAML

Ver "Components and Interfaces" e Property 5. Decisão: `lib/flow-mermaid` deixa de ler o YAML diretamente (adaptação, não reescrita: a lógica de montagem do texto Mermaid não muda, só a entrada passa a ser `ModeloDeGrafo`). A função de compatibilidade `gerarDiagrama(doc, demandaId, visao, ...)` mantém os chamadores existentes (`flow.ts`, `api.ts`, `tests/mermaid-parity`) funcionando sem edição. Depois que `tests/mermaid-parity` provar a Property 5 com o caminho novo, o caminho que lia o YAML direto (a função interna `contexto()` hoje embutida em `lib/flow-mermaid/index.ts`) é removida do build e sobrevive, se necessário, só como oráculo de teste fora do código do build (mesma relação que o oráculo Python de `tests/guide/expected/` tem hoje: referência congelada, não caminho de produção).

### 3. Motor de desenho no navegador

**Decisão: Mermaid renderizado como SVG, mais instrumentação DOM com `data-id` por cima do SVG gerado, sem layout próprio e sem biblioteca de grafo adicional.**

| Alternativa | A favor | Contra | Decisão |
|---|---|---|---|
| Mermaid (`mermaid.render`) + atributos `data-id` injetados nos elementos `g.node`/`g.cluster` do SVG resultante | Já vendorizado, já testado para sobreposição de rótulo (`label-overlap.spec.ts`), já prova paridade de layout com o gerador atual, zero biblioteca nova | O Mermaid não aceita `data-id` nativamente nos nós: a ilha precisa mapear pelo id sanitizado que o próprio Mermaid usa no `id` do elemento SVG (o mapa `mapaIds` já devolvido por `gerarDiagrama`/`gerarDiagramaDoGrafo` resolve exatamente isso) e aplicar `setAttribute('data-id', idOriginal)` depois do `render` | **Escolhida** |
| Layout próprio (SVG desenhado à mão a partir do Modelo_de_Grafo, sem motor de terceiro) | Controle total de `data-id`, zero dependência de parser Mermaid no cliente | Reimplementa o algoritmo de posicionamento de `dagre` (usado internamente pelo Mermaid) do zero; alto risco de regressão visual frente às goldens existentes; esforço grande sem ganho correspondente nesta spec, que já exige Mermaid como Perspectiva de primeira classe (Decisão 9 do dono) | Descartada |
| Biblioteca de grafo genérica (ex.: Cytoscape.js, d3-dagre direto) | Mais controle de interação nativo (zoom, arraste, seleção) do que instrumentar o SVG do Mermaid | Duas fontes de layout (uma para a Perspectiva Mermaid, outra para a biblioteca) quebra a garantia de "a mesma Perspectiva sempre mostrada" e duplica o trabalho de paridade visual; o Requirement 19 já define Mermaid como a Perspectiva ativa nesta spec, então a biblioteca entraria sem um papel claro agora | Descartada para esta spec; pode reaparecer como base da Perspectiva 3D futura, fora de escopo aqui |

Interação (clique, arraste, zoom, teclado) é implementada na camada de instrumentação DOM (`interaction.ts`), por cima do SVG renderizado, não dentro do Mermaid: listeners de `pointerdown`/`pointermove`/`pointerup` no container (distinção de clique vs. arraste pelo limiar de 3 px do Requirement 3.3/3.4), `wheel` com `ctrlKey`/`metaKey` para zoom (Requirement 3.7/3.8), `keydown` de setas no container focável (Requirement 3.6), e `tabindex` mais `keydown` Enter/Espaço em cada `g.node` (Requirement 3.11). Isso é equivalente em espírito ao oráculo `cdp_arraste.mjs` descrito em `docs/guide-browser-tests.md`, reimplementado sobre DOM real em vez de CDP.

### 4. Arquitetura de cliente, modal, navegação por raia, subtarefas, Fragmento de Estado

Ver "Astro, islands e orçamento de bundle" e a ilha `flow-app`. Decisão: vanilla TypeScript, sem framework (ver tabela de alternativas). Modal com `<dialog>` nativo do HTML (suporte amplo em navegadores modernos, foco e `Esc` quase de graça via `showModal()`/`close`, menos código do que reimplementar prender-foco à mão) complementado por `inert` no restante da página enquanto aberto. Historico_do_Modal é uma pilha em memória (`Array<{tipo, id}>`) que só persiste o topo no Fragmento_de_Estado (abrir a URL direta reabre o nó, não a pilha inteira: decisão consciente, porque serializar toda a pilha no hash tornaria a URL grande sem benefício claro de compartilhamento). Fragmento_de_Estado é uma string compacta (`#no=feat_orq_t1&view=completo&sub=1&persp=mermaid&f=raia:feat_ent,papel:po`), não JSON em base64, para manter a URL legível e curta; `state.ts` centraliza o parse/serialize e cada módulo (modal, catálogo, diagrama) lê/escreve só sua própria chave, sem um estado global compartilhado por referência.

### 5. Motor de facetas e filtros

Ver "Catálogo (facetas geradas do schema)" e Properties 6 a 9. Decisão: índice construído inteiramente no build (`lib/facets`), publicado como JSON estático; o filtro em si (interseção/união de conjuntos de ids) roda no cliente sobre esse índice, sem backend e sem nova busca por filtro aplicado (Requirement 11.14, 15.1). Busca por texto: **Decisão B1** abaixo.

**Decisão B1: busca por texto do Catalogo e do Catalogo_da_Demanda usa um índice simples em memória (filtro de substring sobre campos já carregados: id, nome, descrição, exemplo), não Pagefind.**

| Alternativa | A favor | Contra | Decisão |
|---|---|---|---|
| Pagefind (já usado para a busca global do site) | Reaproveita dependência existente, indexação eficiente para texto longo | Pagefind indexa HTML renderizado por página, não registros estruturados com Facetas; usá-lo aqui exigiria gerar páginas ocultas só para indexação ou adaptar a API do Pagefind para um caso que ela não foi desenhada para resolver (busca estruturada combinada com filtro) | Descartada para esta busca específica |
| Índice léxico próprio (ex.: inverted index manual) | Mais rápido que substring em listas muito grandes | O maior universo filtrável nesta spec (Catalogo) tem a ordem de milhares de Entidades (`api/index.json` de hoje tem 477 kB não comprimidos, nome mais descrição), e filtro de substring sobre um array desse tamanho roda em poucos milissegundos em JavaScript moderno; não há evidência de que o índice léxico traria ganho perceptível frente ao orçamento de 100 ms do Requirement 15.8 | Descartada por complexidade desproporcional ao tamanho real dos dados |
| Filtro de substring em memória sobre os campos já carregados em `api/catalog.json` | Zero dependência nova, previsível, fácil de testar como propriedade (Property 7 já cobre a composição com outras Facetas) | Sem relevância ponderada (não ordena por "melhor match"); aceitável, porque o protótipo de referência (`guia.html`) também usa filtro simples, não busca com ranqueamento | **Escolhida** |

### 6. Arquitetura de informação, rotas e menu

Ver `docs/site-map.md` como referência de rotas por Entidade (inalteradas: Requirement 1.5 exige preservá-las). Três entradas de menu substituem as 8 de `LAYER_PAGES` hoje (`site/src/render/routes.ts`): `flows` continua apontando para Fluxos_de_Demandas; `journeys` mais `certifications` se fundem visualmente em Jornadas_e_Competencias (a rota `certifications` continua existindo como alias, Requirement 1.5); as seis camadas restantes (`tools`, `ai`, `fundamentals`, `stacks`, `guides`, e a futura seção de Catálogo_da_Demanda) se apresentam como seções dentro da Area Catalogo, do mesmo jeito que `renderLayer` hoje lista seções dentro de uma camada (`sectionsOf`, já genérico por `SiteLayer`).

Implementação: um novo mapeamento `AREA_DE_CAMADA: Record<SiteLayer, 'flows' | 'journeys' | 'catalog'>` (ou nome final decidido na fase de tasks) substitui `LAYER_PAGES` como fonte do menu (`Header.astro`), mas `SITE_LAYERS` e `siteRoutes` continuam gerando as mesmas rotas de hoje: a Area é uma camada de apresentação sobre as rotas existentes, não uma reescrita de rota. `aria-current="page"` (Requirement 1.2) usa `AREA_DE_CAMADA[page.layer]` em vez do `layer` direto.

### 7. Extensão do YAML, schema, validador e completude

Ver "Data Models" (extensão de schema) e "Error Handling" (regras novas). A extensão soma campos opcionais a `Decisao` e `Subtarefa` em `schema/flows.schema.json`, reaproveita a regra `REF_QUEBRADA` já existente (adicionando `categorias_ferramenta` e `guias_praticos` a `REF_FIELDS` em `lib/guide/entities.ts`, hoje ausentes desse mapa apesar do campo já existir noutro contexto), acrescenta um aviso novo de duplicidade (`CATEGORIA_FERRAMENTA_DUPLICADA`/`GUIA_PRATICO_DUPLICADO`, nomes a confirmar na fase de tasks) e um item de completude (`SEM_FERRAMENTA_OU_GUIA`, nível aviso, só ativo com `avisos && completude`, igual ao padrão de `checarCompletude`). O adendo ao ADR 0001 (Requirement 10.5) registra essa extensão e a regra de que a ligação tarefa→ferramenta/guia vive no Guia_YAML, como uma seção nova "Atualização da etapa 3" no arquivo existente `docs/adr/0001-yaml-como-fonte-unica.md`, no mesmo estilo da seção "Atualização da etapa 2" já presente nele.

## Decisões do dono adotadas por padrão
O dono decidiu que o orçamento inclui o Mermaid (Decisão 13), que o `completo` existe e é alcançado por expansão progressiva (Decisão 14) e que abrir por `file://` não é requisito (Decisão 15). Os itens abaixo estão ADOTADOS POR PADRÃO e abertos a veto do dono:
1. **Estrutura do orçamento (Requirement 15.8).** Carga inicial 300 kB; carga do Diagrama com teto de 1,1 MB e meta de 300 kB; total com teto de 1,4 MB e meta de 600 kB, todos em gzip e incluindo o Mermaid. Medida entre meta e teto é aviso, acima do teto falha o teste.
2. **Trajetória do Mermaid.** Build ESM dividida (O2, só flowchart e dagre por `import()`) como alvo desde o início, servida por HTTP (Requirement 15.12). O bundle único (O1) só entra como fallback se o spike mostrar um bloqueio.
3. **Tempos por passo da expansão.** Visão geral em 2,0 s, uma raia em 1,0 s, estado em cache em 200 ms, Expandir tudo em 5,0 s com indicador em até 100 ms e `completo` com Subtarefas em 12 s (aviso). Esses tempos incluem um bloqueio da thread principal de alguns segundos em CPU 4x no Expandir tudo, porque o Mermaid não roda em Worker.
4. **Nova View `geral` e o `visao` legado.** A aba `visao` (raia orquestradora) é substituída pela `geral` (Visão geral por clusters). O texto legado continua gerado para os goldens, e `visao` na URL vira alias de `geral`.
5. **Teste de sobreposição (Decisão 11)**, com os Conjuntos_Expandidos na matriz.
Resultado do spike: a preencher ao fim da fase 1. A confirmação de O2 (ou o uso do fallback O1, ou O6) depende dele.
