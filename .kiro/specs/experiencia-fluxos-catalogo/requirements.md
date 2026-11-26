# Requirements Document

## Introduction

Esta spec define a apresentação e a experiência do site do kit, a partir da visão de fluxo por demanda e da correlação dela com as ferramentas. Ela é a etapa 3 da migração do guia (as etapas 1 e 2 trouxeram o YAML para `content/guide/` e a toolchain Node e TypeScript; ver `docs/architecture.md`).

O site passa a ser um **Catálogo filtrável e navegável em três áreas**:

1. **Fluxos de demandas:** um diagrama por demanda, com tarefas, gateways, raias, matriz RACI completa, entradas, saídas, perguntas-chave e a correlação de cada tarefa com técnicas, ferramentas e guias práticos.
2. **Jornadas e competências:** trilhas de aprendizado, competências e as certificações que as comprovam.
3. **Catálogo:** ferramentas, modelos de IA, fundamentos (técnicas, padrões, estruturas de dados, algoritmos, licenças), stacks, artefatos e categorias, com filtros combináveis.

A referência de experiência é o protótipo `guia.html` do guia original (fora do repositório, no material do guia original). Dele vêm: seletor de demanda, abas por raia, diagrama arrastável com zoom, clique em nó abrindo um modal com o playbook, histórico de navegação dentro do modal (botão voltar), aba de catálogo da demanda com filtros e destaque do nó, alternador de subtarefas, legenda e visão de papéis pelo RACI.

### Intenção de produto do dono

O site deve ser **imersivo e impressionante**. A identidade visual e a experiência 3D imersiva (WebGL, Three.js) são specs posteriores. Esta spec entrega a base que as torna possíveis: estrutura, navegação, interatividade, filtros e um **contrato de dados do grafo do fluxo**, consumível por qualquer renderizador (SVG 2D hoje, 3D depois).

### Decisões do dono

Registradas a partir da revisão da versão anterior desta spec.

1. **Fonte da ligação tarefa, ferramenta e guia.** A ligação vive no YAML do guia (`content/guide/`), que segue como fonte única (ADR 0001 mantida). As tarefas e subtarefas referenciam categorias de ferramenta (`categorias_ferramenta`) e guias práticos por id. O schema e o validador TypeScript (`lib/guide/validate`) verificam as referências novas. As tarefas permanecem agnósticas (nível de categoria) e os guias práticos carregam o detalhe específico. Isso estende o schema do guia e o ADR 0001: um adendo ao ADR é entregável desta spec. O `content/ids.lock.json` deve manter todos os ids existentes.
2. **Escopo da primeira entrega: somente a demanda `feature`.** Os mecanismos são genéricos e guiados por dados. Os critérios de aceite e a completude dos dados valem só para `feature`. As demais demandas seguem em specs posteriores e não podem sofrer regressão.
3. **Três áreas confirmadas:** Fluxos de demandas, Jornadas e competências, Catálogo. Certificações vão para Jornadas e competências. Guias e stacks ficam no Catálogo. As rotas atuais continuam acessíveis (redirecionamento ou alias).
4. **Facetas:** tudo deve ser filtrável como no protótipo `guia.html`. Uma Faceta vale só para os tipos que têm o atributo, mas todo atributo do modelo de Entidade é exposto como Filtro, mais busca por texto, combináveis (E entre Facetas, OU dentro da Faceta), com contagens, estado na URL e "Limpar filtros".
5. **Diagramas desenhados no navegador, dinâmicos e interativos** (não pré-renderizados por raia). A arquitetura é agnóstica de renderizador: o cliente renderiza a partir de um modelo de grafo serializado (nós, arestas, raias, metadados), exposto como JSON estático, para que a experiência 3D posterior consuma o mesmo modelo. O contrato de dados está nesta spec. A experiência 3D não está. O papel do Mermaid foi definido na Decisão 9. Funcionar offline e o orçamento de desempenho seguem como requisitos, com proposta mensurável (Requirement 15).

6. **Nome "Catálogo".** "Catálogo" nomeia a Area e também a tabela de itens de uma Demanda. Não há renomeação. O contexto desambigua: a Area é o Catalogo e a tabela da Demanda é o Catalogo_da_Demanda. O Glossary registra a distinção.
7. **Orçamento de desempenho: parte aprovada e parte revisada.** Seguem aprovados (Requirement 15.8): 200 kB gzip de Modelo_de_Grafo por Demanda, filtro do Catalogo em 100 ms e crescimento de `site/dist` de no máximo 25% sobre a linha de base que o design mede. A parte de JavaScript e de tempo do Diagrama foi **revista pela Decisão 13**, porque a redação original (300 kB gzip de JavaScript próprio, sem contar o Mermaid) estava errada: o dono decidiu que o orçamento inclui o Mermaid, que sozinho pesa cerca de 980 kB gzip.
8. **Estado na URL pelo fragmento (hash).** O dono delegou a escolha ao mais performático. O fragmento (`location.hash`, atualizado com `history.replaceState` ou `history.pushState`) carrega o Modal_de_Playbook aberto, o Nó selecionado, a View, as Subtarefas, a Perspectiva e os Filtros. Ele dispensa ida ao servidor, não dispara navegação nem recarga em site estático e não é enviado ao servidor. O link continua compartilhável. O critério é: atualizar o estado não recarrega a página nem busca o JSON do grafo de novo. É uma escolha verificável no design (Requirement 15.10).
9. **Mermaid é uma Perspectiva de primeira classe.** O usuário escolhe a Perspectiva do Diagrama. O Mermaid é a Perspectiva provavelmente padrão, ao lado de uma Perspectiva 3D posterior (WebGL, Three.js), fora de escopo aqui. O texto Mermaid é gerado a partir do Modelo_de_Grafo, no mesmo build, para haver uma única fonte de verdade. A alternativa sem JavaScript e a alternativa textual acessível derivam do mesmo JSON. O caminho independente que gera Mermaid direto do YAML sai depois da prova de paridade, ou fica só como oráculo de teste (Requirement 19).
10. **Conteúdo do guia em inglês.** O fallback pt-BR é aceito nesta entrega, com marcador visível de fallback. A tradução vem logo depois, como esforço separado. Adicionar traduções não exige mudança de código (Requirement 15.5 e 15.11).
11. **Teste de sobreposição estendido** (confirmado por padrão, aberto a veto do dono). A matriz completa de `feature` (todas as Views de raia, com e sem Subtarefas, nos dois idiomas) roda em todo PR. A matriz completa de todas as Demandas roda em job agendado ou manual do CI, que não é verificação obrigatória (Requirement 16.9 e 16.10).
12. **Guias práticos já existem como notas.** Os Guias_Praticos são as notas de `content/pt-BR/guides/` com `tipo: guia-pratico`. A tarefa ou subtarefa os referencia pelo id da nota, em `guias_praticos` no Guia_YAML. Não há entradas novas de guia no YAML (Requirement 10).
13. **O orçamento de JavaScript inclui o Mermaid (adotada por padrão, aberta a veto do dono).** A redação anterior (300 kB gzip de JavaScript próprio) fica revogada. O design mediu o Mermaid vendorizado (3.572.661 bytes, 979.561 bytes gzip) e a build ESM dividida por tipo de diagrama da mesma versão 11.17.2 (flowchart mais layout dagre carregam 25 arquivos, 820 kB, 221 kB gzip medidos pela rede). O protótipo `guia.html` tem 11,6 MB (1,94 MB gzip) e carrega bem. A estrutura proposta, por página de Demanda, em gzip, é: **carga inicial** (HTML, CSS, JavaScript do kit e Modelo_de_Grafo, sem Mermaid) com teto de 300 kB; **carga do Diagrama** (Mermaid, layout e Renderizador, carregados depois da carga inicial e só em página com Diagrama) com teto de 1,1 MB e meta de 300 kB, tendo a build ESM dividida (importação preguiçosa só dos chunks de flowchart e dagre, servida por HTTP) como alvo desde o início e o bundle único vendorizado apenas como fallback se o spike mostrar um bloqueio; **total por página** com teto de 1,4 MB e meta de 600 kB (todos em gzip, incluindo o Mermaid). O valor de 300 kB aprovado antes passa a ser o teto da carga inicial. A tabela e a evidência estão no design (Requirement 15.8). Os números e a trajetória (build dividida como alvo, bundle único como fallback) estão adotados por padrão, abertos a veto do dono.
14. **A View `completo` existe e é alcançada por expansão progressiva (adotada por padrão, aberta a veto do dono, incluindo a tabela de tempos por passo e a nova View `geral` no lugar de `visao`, com a URL antiga como alias).** O `completo` é importante para a navegabilidade e o protótipo o carregava sem limite. O kit o mantém sem limitação, mas a entrada passa a ser a Visão geral: cada Raia aparece recolhida como um Cluster_de_Raia clicável, com suas informações-chave. O usuário expande Raias individuais e Subtarefas sob demanda, até o detalhe total, ou aciona "Expandir tudo". O Modelo_de_Grafo suporta agregação de Raias recolhidas e o Texto_Mermaid é derivado do Conjunto_Expandido, a partir do mesmo JSON. Expandir todas as Raias gera o mesmo texto do `completo` atual, de modo que os goldens continuam valendo (Requirement 20). Um spike é a primeira tarefa de entrega, porque o `mermaid.render` do `completo` mede 3,58 s com CPU 4 vezes mais lenta.
15. **Abrir o site por `file://` não é requisito.** O site construído é consumido por um servidor (`npm run preview`, localhost) ou por hospedagem estática. Offline significa funcionar a partir dos arquivos estáticos construídos, servidos por HTTP e com cache, sem backend e sem conta. Isso libera a build ESM dividida do Mermaid como alvo desde o início (Decisão 13).

Protótipo de referência consultado (`guia.html`). Dimensões de filtro que ele tem: texto, raia (`filtro-raia`), categoria do catálogo da demanda (`filtro-catalogo-*`), tipo (`filtro-tipo`), tipo de artefato (`filtro-tipo-artefato`), subtipo (`filtro-subtipo`), papel (`filtro-papel`) e letra RACI (`filtro-letra`). O protótipo também tem seletor de demanda, alternadores "Raias" e "Subtarefas", zoom e botão voltar. O Requirement 9 cobre todas as dimensões dele, e o Requirement 11 as amplia a todo atributo do modelo de Entidade.

### Estado de partida (o que já existe e o que é novo)

Verificado no repositório na data desta spec.

| Capacidade | Estado | Evidência |
|---|---|---|
| Dados do guia (12 demandas mais a biblioteca comum, 71 raias, 151 tarefas, 70 decisões, 544 playbooks, 451 perguntas, 124 técnicas, 16 papéis, 201 artefatos, 83 variáveis) | **Já existe** | `content/guide/`, `lib/guide/entities.ts`, `docs/content-contract.md` |
| Gerador Mermaid com views `visao`, `raia:<id>`, `completo` e opção `subtarefas` | **Já existe** (paridade testada) | `lib/flow-mermaid/index.ts`, `tests/mermaid-parity` |
| Página de demanda com 2 figuras (`Visão geral`, `Fluxo completo`), playbooks em `<details>`, tabela de raias, papéis e matriz do Decisor | **Já existe** | `site/src/render/flow.ts` |
| Páginas derivadas por raia, tarefa, decisão, papel, rito, artefato, variável, técnica | **Já existe** | `flows/raias/<id>`, `flows/tarefas/<id>` etc. |
| `SiteIndex` com wikilinks resolvidos, relações inversas e lista de arestas | **Já existe** | `lib/content/site.ts` |
| API estática (`index.json`, `graph.json`, `flows/<id>.json`) | **Já existe** | `site/src/render/api.ts` |
| Busca offline (Pagefind) e carregador do Mermaid local | **Já existe** | `site/src/scripts/search.ts`, `site/src/components/Diagram.astro` |
| Página de jornadas, 4 competências, 6 jornadas, 45 certificações | **Já existe** como listagem estática | `content/pt-BR/journeys`, `content/pt-BR/certifications`, `site/src/render/layers.ts` |
| Playwright e teste de sobreposição de rótulos | **Já existe** | `playwright.config.ts`, `tests/browser/label-overlap.spec.ts` |
| Menu com as três áreas | **Novo** (hoje o menu tem 8 camadas) | `site/src/components/Header.astro`, `LAYER_PAGES` |
| Diagrama interativo (clique, arraste, zoom, `data-id`, abas por raia, subtarefas, modal) | **Novo** | `docs/guide-browser-tests.md` |
| Catálogo da demanda e Catálogo único com filtros interativos | **Novo** (hoje só listas agrupadas, sem filtro) | `layers.ts` (`groupedList`) |
| Correlação tarefa para categoria de ferramenta e guia prático | **Novo e sem dados de origem** (`categorias_ferramenta` está vazio na fonte; ver Decisão do dono 1 e Requirement 10) | `content/guide/catalogos/ferramentas.yaml` |
| Visão geral com Raias recolhidas em clusters e expansão progressiva até o `completo` | **Novo** (hoje `visao` é só a raia orquestradora e `completo` renderiza os 224 nós de uma vez, em 3,58 s com CPU 4x) | `lib/flow-mermaid/index.ts`, `tests/fixtures/mermaid/golden/feature.completo.mmd` |
| Modelo de grafo serializado do fluxo (nós, arestas, raias, metadados) como JSON estático | **Novo** (hoje o Diagrama nasce do texto Mermaid) | `lib/flow-mermaid/index.ts`, `site/src/render/api.ts` |
| Estado de filtro na URL, navegação sem recarregar | **Novo** | nenhuma ocorrência em `site/src` |

### Fora de escopo

- Identidade visual (cores, tipografia, layout fino): é a spec seguinte. Esta spec define estrutura, navegação, interatividade e filtros.
- A experiência 3D imersiva (WebGL, Three.js): é spec posterior. O contrato de dados que ela consome (Requirement 17) e a interface de Renderizador e Perspectiva (Requirement 19) estão no escopo desta spec.
- Critérios de aceite e completude de dados das demandas diferentes de `feature`: specs posteriores (Requirement 18).
- Contas de usuário, progresso salvo e backend (ver `product.md`).
- Alterações no conteúdo editorial do guia (`docs/reviews/guia-demandas-review.md`).
- Tradução do conteúdo do guia para inglês (Decisão 10). O guia cai no fallback pt-BR em `en`, com marcador visível, e a tradução vem em esforço separado logo depois.

### Decisões já tomadas (vêm de `product.md`, do brief e de `docs/guide-browser-tests.md`)

- Site estático, sem backend, funcionando offline e sem conta.
- Bilíngue (pt-BR e en), pt-BR primeiro.
- Um conceito, uma nota, um tipo. Fluxos, stacks e guias apontam para a nota e não copiam o conteúdo.
- Os passos e as checklists são agnósticos. Os comandos concretos ficam em blocos "Como fazer hoje", com versão e data.
- Os 7 critérios de aceite da etapa 3 de `docs/guide-browser-tests.md` entram como requisitos, verificados com Playwright (`tests/browser`, `npm run test:browser`).

## Glossary

- **Site**: o site estático do kit (Astro, `site/`), em `pt-BR` e `en`.
- **Area**: uma das três entradas principais do Site: `Fluxos_de_Demandas`, `Jornadas_e_Competencias` e `Catalogo`.
- **Fluxos_de_Demandas**: Area que reúne os diagramas por demanda.
- **Jornadas_e_Competencias**: Area que reúne jornadas, competências e certificações.
- **Catalogo**: Area que reúne ferramentas, modelos de IA, técnicas, padrões, estruturas de dados, algoritmos, licenças, stacks, artefatos, categorias, casos de uso e empresas.
- **Demanda**: tipo de trabalho com fluxo próprio (feature, bug, incidente, chore, segurança, spike, dívida técnica, infraestrutura, teste e QA, documentação, migração, descontinuação).
- **Pagina_de_Demanda**: a página de uma Demanda dentro de Fluxos_de_Demandas.
- **Diagrama**: a figura interativa de uma Demanda, desenhada no navegador a partir do Modelo_de_Grafo.
- **Modelo_de_Grafo**: representação serializada do fluxo de uma Demanda, com nós, arestas, raias e metadados, exposta como JSON estático e independente do renderizador.
- **Perspectiva**: modo de visualização do Diagrama que o usuário escolhe. Nesta spec: `mermaid`. Posterior: `3d`.
- **Texto_Mermaid**: texto Mermaid gerado a partir do Modelo_de_Grafo, no mesmo build.
- **Fragmento_de_Estado**: o hash da URL (`location.hash`) que carrega o estado da página (Modal_de_Playbook, Nó, View, Subtarefas, Perspectiva, Filtros).
- **Renderizador**: componente que desenha o Modelo_de_Grafo (SVG 2D nesta spec, 3D em spec posterior).
- **Demanda_Piloto**: a Demanda `feature`, única coberta pelos critérios de aceite e pela completude de dados da primeira entrega.
- **Categoria_de_Ferramenta**: Entidade do tipo `categoria-ferramenta`, declarada em `categorias_ferramenta` no YAML do guia, que agrupa ferramentas por função.
- **Guia_YAML**: os arquivos de `content/guide/`, fonte única da metodologia (ADR 0001).
- **Validador_do_Guia**: o validador TypeScript em `lib/guide/validate`.
- **View**: um recorte do Diagrama. Valores: `geral` (Visão geral: todas as Raias recolhidas em Clusters_de_Raia), `raia:<id>` (foco numa raia) e `completo` (todas as Raias expandidas). O valor legado `visao` (a raia orquestradora) segue gerado para a paridade com os goldens e, em URL, é alias de `geral`.
- **Cluster_de_Raia**: representação recolhida de uma Raia na Visão geral: um único elemento clicável com o nome, a cor, as contagens (Nós, tarefas, gateways, Subtarefas) e as arestas agregadas de entrada e saída.
- **Conjunto_Expandido**: o estado de expansão do Diagrama: o conjunto de Raias expandidas e o conjunto de Nós com Subtarefas expandidas. A View `geral` é o conjunto vazio, a View `completo` é o conjunto com todas as Raias, e os conjuntos intermediários formam a expansão progressiva.
- **Expandir_tudo**: ação que leva o Conjunto_Expandido ao conjunto com todas as Raias expandidas (View `completo`).
- **Aba_de_View**: controle que seleciona uma View. A ordem é `geral`, as raias na ordem do guia, `completo`.
- **No**: elemento do Diagrama: início, tarefa, gateway, chamada de outra raia, fim ou subtarefa.
- **Raia**: agrupamento de Nos sob uma responsabilidade, com cor própria.
- **Subtarefa**: passo detalhado dentro de uma tarefa. Pode ser condicional (executa só quando o contexto pede).
- **Playbook**: conteúdo de um No: resumo, o que fazer, o que evitar, perguntas-chave, entradas, saídas, técnicas e papéis.
- **Modal_de_Playbook**: janela sobre o Diagrama que mostra o Playbook de um No ou o detalhe de um item relacionado.
- **Historico_do_Modal**: pilha de itens abertos no Modal_de_Playbook, percorrida pelo botão voltar.
- **RACI**: atribuição de papéis a um No: R (responsável), A (aprova), C (consultado), I (informado).
- **Matriz_RACI**: tabela de uma Demanda com Nos nas linhas, papéis nas colunas e a letra RACI nas células.
- **Papel**: função exercida por pessoa ou agente (por exemplo, engenheiro, tech lead, PO).
- **Catalogo_da_Demanda**: tabela filtrável dos itens de uma Demanda: artefatos, variáveis, técnicas, Nos e Subtarefas.
- **Nota_de_Desambiguacao**: "Catálogo" na interface designa a Area (Catalogo) ou a tabela de itens de uma Demanda (Catalogo_da_Demanda). O contexto da página decide qual (Decisão 6).
- **Item_da_Demanda**: uma linha do Catalogo_da_Demanda.
- **Filtro**: critério que restringe os itens de uma lista. Filtros diferentes combinam por E; valores do mesmo Filtro combinam por OU.
- **Faceta**: dimensão filtrável de um item (tipo, categoria, linguagem, caso de uso, empresa, raia, papel, letra RACI, tipo de artefato, subtipo).
- **Visao_de_Ferramentas_e_Guias**: painel de uma tarefa que lista as categorias de ferramenta aplicáveis, as ferramentas de cada categoria e os guias práticos relacionados.
- **Guia_Pratico**: nota existente do tipo `guia-pratico`, em `content/pt-BR/guides/`, com os passos detalhados de "como fazer" um objetivo. A tarefa a referencia pelo id no campo `guias_praticos`.
- **Entidade**: nota do kit com `id`, `tipo` e `nome` (ver `docs/content-contract.md`).
- **Pagina_Canonica**: a única página de uma Entidade. Todo link para a Entidade aponta para ela.
- **Referencias_de_Entrada**: lista, na Pagina_Canonica, das páginas que citam a Entidade.
- **Fonte_e_Data**: a fonte oficial e a data de verificação de um dado volátil (preço, versão, benchmark).
- **Marcador_Nao_Verificado**: o texto `não verificado` exibido quando um dado volátil não tem Fonte_e_Data.
- **Teste_de_Navegador**: teste Playwright em `tests/browser/*.spec.ts` contra `site/dist` servido por HTTP local, executado por `npm run test:browser`.
- **Build_Estatico**: a saída `site/dist` gerada por `npm run build`.
- **ID_de_No**: identificador estável de um No do Diagrama, igual ao `id` do No no guia (padrão `<raia>_<s|t|g|c|e><n>`; subtarefa `<no>_st<n>`).

## Requirements

### Requirement 1: Três áreas de navegação

**User Story:** Como engenheiro, quero entrar no site por três áreas claras (Fluxos de demandas, Jornadas e competências, Catálogo), para que eu saiba onde achar o que preciso sem conhecer a estrutura interna do kit.

**Estado:** novo. Hoje o menu lista 8 camadas (`tools`, `ai`, `fundamentals`, `stacks`, `guides`, `certifications`, `flows`, `journeys`). Mapeamento confirmado pelo dono (Decisão 3).

#### Acceptance Criteria

1. THE Site SHALL exibir, no menu principal de toda página, exatamente três entradas de Area, nesta ordem: Fluxos de demandas, Jornadas e competências, Catálogo.
2. WHEN o usuário abre uma página de qualquer Entidade, THE Site SHALL marcar no menu a Area à qual a Entidade pertence com `aria-current="page"`.
3. THE Site SHALL associar cada tipo de Entidade a exatamente uma Area: as Entidades de demanda, raia, tarefa, decisão, papel e rito pertencem a Fluxos_de_Demandas; jornada, competência e certificação pertencem a Jornadas_e_Competencias; guia prático, stack e os demais tipos pertencem a Catalogo.
4. WHEN o usuário abre a página inicial de uma Area, THE Site SHALL listar os conteúdos da Area e o total de itens de cada grupo.
5. THE Site SHALL manter acessível cada rota atual de página de Entidade, por redirecionamento ou alias para a Pagina_Canonica, para que links e relações já resolvidos continuem válidos.
6. THE Site SHALL exibir a busca e o seletor de idioma no cabeçalho de todas as páginas, como hoje.

### Requirement 2: Página de Demanda com seletor e abas de View

**User Story:** Como engenheiro, quero escolher uma demanda e percorrer suas visões (geral, por raia e completa) na mesma página, para que eu veja o fluxo no nível de detalhe que preciso sem recarregar.

**Estado:** parcial. Existem as Views `visao` e `completo` na página e o gerador de `raia:<id>`. Faltam o seletor, as abas e a troca sem recarregar. O modelo de Views passa a ser: Visão geral (`geral`), foco numa raia (`raia:<id>`) e expansão progressiva até o `completo` (Requirement 20, Decisão 14). Cobre os critérios de aceite 5 e 6 da etapa 3.

#### Acceptance Criteria

1. THE Pagina_de_Demanda SHALL exibir um seletor com as 12 Demandas, na ordem definida por `ordem_das_demandas` em `content/guide/comum.yaml`.
2. WHEN o usuário escolhe outra Demanda no seletor, THE Site SHALL exibir o Diagrama da Demanda escolhida sem recarregar a página.
3. WHEN o usuário escolhe outra Demanda no seletor, THE Site SHALL atualizar a URL para a rota da Demanda escolhida.
4. WHEN o usuário troca de Demanda ou de View, THE Site SHALL concluir a troca sem lançar nenhuma exceção não tratada no console do navegador.
5. THE Pagina_de_Demanda SHALL exibir as Abas_de_View na ordem `geral`, uma aba por raia na ordem em que o guia declara as raias, `completo`, e SHALL abrir na View `geral` quando a URL não indica View.
6. THE Pagina_de_Demanda SHALL manter, em todas as Demandas, a mesma ordem horizontal dos Nos dentro de cada View.
7. WHEN o usuário abre uma URL com uma View indicada, THE Site SHALL abrir a Pagina_de_Demanda já posicionada nessa View.
8. WHILE a View ativa é `raia:<id>`, THE Pagina_de_Demanda SHALL destacar a Aba_de_View da raia com a cor da Raia.
9. THE Pagina_de_Demanda SHALL exibir uma legenda dos tipos de No (início, tarefa, gateway, chamada, fim, subtarefa, subtarefa condicional).
10. IF o navegador não executa JavaScript, THEN THE Pagina_de_Demanda SHALL exibir uma alternativa textual acessível do fluxo (lista ordenada dos Nós por Raia, com as transições) e os playbooks em `<details>`. A alternativa deriva do Modelo_de_Grafo (Requirement 19.7).

### Requirement 3: Diagrama interativo (clique, arraste, zoom, teclado)

**User Story:** Como engenheiro, quero mover, ampliar e clicar no diagrama como num mapa, para que eu explore fluxos grandes sem perder o contexto.

**Estado:** novo. Cobre os critérios de aceite 1, 2 e 3 da etapa 3 (`cdp_arraste.mjs`, `cdp_ordem.mjs`).

#### Acceptance Criteria

1. THE Diagrama SHALL expor em cada No renderizado um atributo `data-id` com o ID_de_No, igual ao `id` do Nó no Modelo_de_Grafo.
2. WHEN o usuário clica num No, THE Diagrama SHALL abrir o Modal_de_Playbook desse No.
3. WHEN o ponteiro se move até 3 px entre o pressionar e o soltar sobre um No, THE Diagrama SHALL tratar o gesto como clique e abrir o Modal_de_Playbook.
4. WHEN o usuário arrasta o ponteiro por mais de 3 px sobre a área do Diagrama, THE Diagrama SHALL rolar a área na direção do arraste e manter o Modal_de_Playbook fechado.
5. WHILE o usuário arrasta a área do Diagrama, THE Diagrama SHALL exibir o cursor `grabbing`.
6. WHILE a área do Diagrama está com foco, THE Diagrama SHALL rolar a área quando o usuário pressiona as setas do teclado.
7. WHEN o usuário gira a roda do mouse com Ctrl ou Cmd pressionado sobre o Diagrama, THE Diagrama SHALL alterar o zoom.
8. WHEN o usuário gira a roda do mouse sem Ctrl nem Cmd sobre o Diagrama, THE Diagrama SHALL manter o zoom e rolar a área.
9. THE Diagrama SHALL oferecer botões de zoom (menos, restaurar 100%, mais) acionáveis por teclado.
10. THE Diagrama SHALL expor um rótulo acessível que descreve os gestos disponíveis (arrastar, setas, Ctrl ou Cmd com a roda).
11. THE Diagrama SHALL tornar cada No focável por teclado e abrir o Modal_de_Playbook quando o usuário pressiona Enter ou Espaço sobre o No focado.

### Requirement 4: Navegação por raias dentro do Diagrama

**User Story:** Como engenheiro, quero clicar numa raia ou numa chamada de raia e ir para o detalhe dela, e voltar ao ponto de onde saí, para que eu desça e suba entre a visão geral e o detalhe sem me perder.

**Estado:** novo. As Views `raia:<id>` existem no gerador. A navegação entre elas não existe no site.

#### Acceptance Criteria

1. WHEN o usuário clica num No de chamada de raia, THE Modal_de_Playbook SHALL exibir o nome da Raia chamada e um botão que abre a View `raia:<id>` dessa Raia.
2. WHEN o usuário aciona o botão de ir para a Raia chamada, THE Pagina_de_Demanda SHALL fechar o Modal_de_Playbook e ativar a Aba_de_View da Raia chamada.
3. WHEN o usuário clica no rótulo de uma Raia expandida, ou aciona "Abrir raia" num Cluster_de_Raia, THE Pagina_de_Demanda SHALL ativar a View `raia:<id>` dessa Raia. O clique no corpo de um Cluster_de_Raia expande a Raia no lugar (Requirement 20.3).
4. WHEN a View muda por navegação interna, THE Pagina_de_Demanda SHALL habilitar um botão "Voltar" que restaura a View e a posição de rolagem anteriores.
5. WHILE não há View anterior no histórico, THE Pagina_de_Demanda SHALL manter o botão "Voltar" desabilitado.
6. THE Pagina_de_Demanda SHALL oferecer um alternador "Raias" que exibe ou oculta os agrupamentos de raia na View `completo`.

### Requirement 5: Subtarefas expansíveis, condicionais e sem sobreposição

**User Story:** Como engenheiro, quero expandir as subtarefas de uma tarefa no diagrama e ver quais são condicionais, para que eu tenha o detalhe só quando preciso dele e o diagrama continue legível.

**Estado:** novo no site. O gerador já aceita `subtarefas=true`. A sobreposição das 2 figuras de hoje já é medida por `tests/browser/label-overlap.spec.ts`. Cobre o critério de aceite 7 da etapa 3.

#### Acceptance Criteria

1. WHERE a View ativa contém ao menos uma tarefa com Subtarefas, THE Pagina_de_Demanda SHALL exibir o alternador "Subtarefas" com o estado atual (ocultas ou exibidas).
2. WHEN o usuário aciona o alternador "Subtarefas" para exibir, THE Diagrama SHALL exibir as Subtarefas de todas as tarefas da View ativa.
3. WHEN o usuário aciona o alternador "Subtarefas" para ocultar, THE Diagrama SHALL voltar ao estado sem Subtarefas.
4. THE Diagrama SHALL exibir em cada tarefa que tem Subtarefas a indicação "N subtarefas", com N igual ao número real de Subtarefas.
5. THE Diagrama SHALL distinguir a Subtarefa condicional da Subtarefa comum por borda tracejada e pelo marcador ◆.
6. THE Diagrama SHALL manter o alternador de Subtarefas oculto quando a View ativa não tem nenhuma Subtarefa.
7. FOR ALL Demandas e FOR ALL Views, com as Subtarefas ocultas e com as Subtarefas exibidas, THE Diagrama SHALL posicionar cada Nó de modo que a área de interseção entre `g.node` e o rótulo de qualquer `g.cluster` seja menor ou igual a 1 px².
8. WHEN o usuário alterna as Subtarefas, THE Diagrama SHALL preservar a View ativa, o zoom e a posição de rolagem.

### Requirement 6: Modal de Playbook com histórico

**User Story:** Como engenheiro, quero abrir o playbook de uma tarefa ou gateway e navegar pelos itens que ele cita sem sair do diagrama, para que eu leia o "como fazer" e volte ao ponto exato do fluxo.

**Estado:** novo no site (hoje os playbooks são `<details>` abaixo da figura). O conteúdo existe em `content/guide` (playbook, `fazer`, `evitar`, `perguntas_chave`, `entradas`, `saidas`, `tecnicas`, `papeis`).

#### Acceptance Criteria

1. WHEN o Modal_de_Playbook abre para uma tarefa, THE Modal_de_Playbook SHALL exibir: nome, tipo, Raia, resumo, lista "Fazer", lista "Evitar", perguntas-chave, entradas, saídas, técnicas e papéis com a letra RACI.
2. WHEN o Modal_de_Playbook abre para um gateway, THE Modal_de_Playbook SHALL exibir: nome, pergunta de decisão, as saídas possíveis com a condição de cada uma, e o papel que decide.
3. WHERE o Nó é uma Subtarefa condicional, THE Modal_de_Playbook SHALL exibir o campo "Executar quando".
4. WHERE o Nó é uma chamada de Raia, THE Modal_de_Playbook SHALL exibir a Raia chamada e os retornos possíveis dela.
5. WHEN o usuário clica, dentro do Modal_de_Playbook, num papel, técnica, artefato, variável, rito ou pergunta, THE Modal_de_Playbook SHALL exibir o detalhe do item e empilhar o item anterior no Historico_do_Modal.
6. WHEN o usuário aciona o botão voltar do Modal_de_Playbook, THE Modal_de_Playbook SHALL exibir o item anterior do Historico_do_Modal.
7. WHILE o Historico_do_Modal tem um único item, THE Modal_de_Playbook SHALL ocultar o botão voltar.
8. THE Modal_de_Playbook SHALL exibir, em todo item que é uma Entidade, um link para a Pagina_Canonica da Entidade.
9. WHEN o Modal_de_Playbook abre, THE Site SHALL mover o foco para o diálogo e prender o foco dentro dele.
10. WHEN o usuário pressiona Esc ou aciona o botão fechar, THE Site SHALL fechar o Modal_de_Playbook e devolver o foco ao elemento que o abriu.
11. WHEN o Modal_de_Playbook abre, THE Site SHALL atualizar o Fragmento_de_Estado com o ID_de_No aberto, de modo que abrir essa URL reabra o mesmo Modal_de_Playbook.
12. THE Modal_de_Playbook SHALL usar, para todo texto, o idioma da página, com o fallback pt-BR quando a tradução não existe.

### Requirement 7: Matriz RACI completa e visão por papel

**User Story:** Como tech lead, quero ver quem faz, aprova, é consultado e é informado em cada etapa de uma demanda, e ver onde um papel atua, para que eu distribua responsabilidades sem ambiguidade.

**Estado:** parcial. Há lista de papéis na página da demanda e relações por Entidade. Não há matriz nem filtro por letra.

#### Acceptance Criteria

1. THE Pagina_de_Demanda SHALL exibir a Matriz_RACI da Demanda, com um Nó por linha, um Papel por coluna e a letra R, A, C ou I em cada célula atribuída.
2. THE Matriz_RACI SHALL listar todos os Nós da Demanda que têm ao menos um Papel atribuído.
3. WHEN o usuário clica numa linha da Matriz_RACI, THE Site SHALL abrir o Modal_de_Playbook do Nó correspondente.
4. WHEN o usuário clica no cabeçalho de uma coluna da Matriz_RACI, THE Site SHALL abrir o detalhe do Papel.
5. THE detalhe de um Papel SHALL listar, agrupados por letra RACI, os Nós em que o Papel atua na Demanda atual, com o total de cada grupo.
6. THE detalhe de um Papel SHALL listar as outras Demandas em que o Papel atua, com a quantidade de Nós de cada uma.
7. THE Matriz_RACI SHALL oferecer os Filtros "Papel" e "Letra RACI", combináveis entre si.
8. WHEN o usuário aplica um Filtro na Matriz_RACI, THE Site SHALL exibir o total de linhas visíveis sobre o total de linhas da Matriz_RACI.
9. IF um Nó da Demanda tem mais de um Papel com a mesma letra R, THEN THE Matriz_RACI SHALL exibir todos esses Papéis na célula, sem omitir nenhum.
10. FOR ALL Demandas, THE Matriz_RACI SHALL exibir exatamente as atribuições que `content/guide` declara, sem acréscimo nem perda.

### Requirement 8: Entradas, saídas e perguntas-chave por nó

**User Story:** Como engenheiro, quero ver o que cada etapa consome, o que produz e o que preciso perguntar, e seguir cada artefato até quem o produz e quem o consome, para que eu valide a prontidão antes de começar e a entrega ao terminar.

**Estado:** parcial. Os dados existem (`entradas`, `saidas`, `perguntas_chave`, rastreio em `lib/guide/rastreio.ts`) e há páginas de artefato e variável. A apresentação no diagrama é nova.

#### Acceptance Criteria

1. WHEN o Modal_de_Playbook abre para um Nó, THE Modal_de_Playbook SHALL exibir as entradas e as saídas do Nó como itens clicáveis, distinguindo artefato de variável.
2. WHEN o usuário clica num artefato ou variável, THE Modal_de_Playbook SHALL exibir o tipo, a descrição, o exemplo, os Nós que o produzem e os Nós que o consomem.
3. WHEN o usuário clica num produtor ou consumidor listado, THE Pagina_de_Demanda SHALL oferecer a ação de destacar esse Nó no Diagrama.
4. WHEN o usuário aciona a ação de destacar um Nó, THE Diagrama SHALL ativar a View que contém o Nó, rolar até ele e aplicar destaque visual.
5. IF um artefato é usado como entrada e nenhum Nó o produz, THEN THE Modal_de_Playbook SHALL exibir o aviso "sem produtor".
6. THE Modal_de_Playbook SHALL exibir as perguntas-chave do Nó em lista, na ordem do guia.
7. THE Modal_de_Playbook SHALL exibir, para cada artefato, o tipo e o subtipo da taxonomia de artefatos.

### Requirement 9: Catálogo da Demanda filtrável

**User Story:** Como engenheiro, quero uma tabela de tudo que uma demanda contém, filtrável por raia, categoria, papel e letra RACI, para que eu encontre um artefato, uma técnica ou um nó sem varrer o diagrama.

**Estado:** novo. Cobre o critério de aceite 4 da etapa 3 (`cdp_catalogo.mjs`). O mecanismo é genérico; o aceite e a completude de dados valem para a Demanda_Piloto (Requirement 18). O critério 4 entende "linha" como Raia, como no protótipo (`filtro-raia`).

#### Acceptance Criteria

1. THE Pagina_de_Demanda SHALL oferecer o Catalogo_da_Demanda, que lista os Itens_da_Demanda de cinco categorias: artefatos, variáveis, técnicas, Nós e Subtarefas.
2. THE Catalogo_da_Demanda SHALL oferecer os Filtros do protótipo `guia.html`: texto (id, nome, descrição ou exemplo), Raia, categoria, tipo, tipo de artefato, subtipo de artefato, Papel e letra RACI, combináveis por E entre Filtros e por OU dentro de um Filtro.
3. WHEN o usuário aplica ou limpa um Filtro, THE Catalogo_da_Demanda SHALL atualizar a lista e o contador "N de M" sem recarregar a página.
4. THE Catalogo_da_Demanda SHALL oferecer o botão "Limpar filtros", que restaura todos os Filtros ao valor inicial.
5. WHEN o usuário aplica o Filtro de Raia, THE Catalogo_da_Demanda SHALL exibir somente os Itens_da_Demanda ligados a essa Raia.
6. WHEN o usuário clica num Item_da_Demanda, THE Site SHALL abrir o Modal_de_Playbook com o detalhe do item.
7. WHEN o usuário aciona "Ver no diagrama" num Item_da_Demanda que é um Nó, THE Diagrama SHALL destacar o Nó correspondente e THE Pagina_de_Demanda SHALL habilitar o botão "Voltar" para retornar ao Catalogo_da_Demanda no mesmo estado de Filtros.
8. IF nenhum Item_da_Demanda atende aos Filtros, THEN THE Catalogo_da_Demanda SHALL exibir a mensagem "nenhum item" e o botão "Limpar filtros".
9. WHEN o usuário abre uma URL cujo Fragmento_de_Estado traz o estado dos Filtros, THE Catalogo_da_Demanda SHALL abrir já filtrado.
10. FOR ALL Demandas, THE contador de cada categoria do Catalogo_da_Demanda SHALL ser igual ao número de itens dessa categoria derivados de `content/guide` para a Demanda.

### Requirement 10: Visão de ferramentas e guias práticos por tarefa

**User Story:** Como engenheiro, quero ver, a partir de uma tarefa, as categorias de ferramenta que a apoiam, as ferramentas de cada categoria e o guia prático detalhado, para que eu passe do "o quê" agnóstico ao "como" concreto sem perder a tarefa de vista.

**Estado:** novo e sem dados de origem. Verificado: os Guias_Praticos já existem como notas com `tipo: guia-pratico` e frontmatter próprio (por exemplo `adicionar_observabilidade`), que liga a categorias, ferramentas, stacks, padrões e certificações por wikilinks `[[id|nome]]` e por listas de ids (`categorias`, `ferramentas`, `padroes`). Nenhuma tarefa do Guia_YAML os referencia hoje, e o schema `schema/json/guia-pratico.json` já valida a nota. Esta spec reaproveita esse formato de id e de relação inversa e acrescenta apenas a referência da tarefa. Hoje a tarefa liga a técnicas, artefatos e papéis. O tipo `categoria-ferramenta` existe no esquema, mas `categorias_ferramenta` está vazio (0 itens). Não há ligação de tarefa para categoria de ferramenta nem para `guia-pratico`. Decisão 1 do dono: a ligação é declarada no Guia_YAML. Isso estende o schema do guia (`schema/flows.schema.json`) e o ADR 0001. Escopo de dados da primeira entrega: Demanda_Piloto (Requirement 18).

#### Acceptance Criteria

1. THE Guia_YAML SHALL declarar a ligação de uma tarefa ou subtarefa com Categorias_de_Ferramenta, pelo campo `categorias_ferramenta` (lista de ids), e com Guias_Praticos, pelo campo `guias_praticos` (lista de ids de notas `guia-pratico`), sem criar entradas de guia no Guia_YAML.
2. THE schema do guia SHALL validar o formato dos campos de ligação novos, e THE campos SHALL ser opcionais, para que as Demandas sem a ligação continuem válidas.
3. THE Validador_do_Guia SHALL emitir uma regra de erro, no estilo de `REF_QUEBRADA`, para cada id de Categoria_de_Ferramenta que não resolve para uma Entidade existente e para cada id de `guias_praticos` que não resolve para uma nota do tipo `guia-pratico`, com o id da tarefa, o campo e o id não resolvido na mensagem.
4. THE Validador_do_Guia SHALL emitir um aviso para cada Categoria_de_Ferramenta ou Guia_Pratico repetido na mesma tarefa.
5. THE entrega SHALL incluir um adendo ao ADR 0001 (`docs/adr/0001-yaml-como-fonte-unica.md`) que registra a extensão do schema e a regra de que a ligação tarefa para ferramenta e guia vive no Guia_YAML.
6. THE `content/ids.lock.json` SHALL conter todos os ids que continha antes desta spec, e IF um id existente deixa de constar, THEN THE verificação de ids SHALL falhar.
7. THE Modal_de_Playbook SHALL exibir, para cada tarefa, a Visao_de_Ferramentas_e_Guias com três grupos: categorias de ferramenta, ferramentas e Guias_Praticos.
8. THE passos da tarefa no Modal_de_Playbook SHALL permanecer agnósticos de ferramenta, referenciando somente Categorias_de_Ferramenta, e THE Guia_Pratico SHALL concentrar o detalhe específico de ferramenta.
9. WHEN o usuário abre uma categoria de ferramenta na Visao_de_Ferramentas_e_Guias, THE Site SHALL listar as ferramentas da categoria, cada uma com link para a Pagina_Canonica.
10. WHEN o usuário abre um Guia_Pratico na Visao_de_Ferramentas_e_Guias, THE Site SHALL abrir a Pagina_Canonica do Guia_Pratico, com a indicação da tarefa de origem e um link de retorno a ela.
11. WHERE o Guia_Pratico traz comandos concretos, THE Guia_Pratico SHALL exibi-los em blocos "Como fazer hoje" com versão e data.
12. WHEN o usuário abre a Pagina_de_Demanda, THE Pagina_de_Demanda SHALL oferecer uma visão agregada que lista, por categoria de ferramenta, as tarefas da Demanda que a usam.
13. THE Pagina_Canonica de uma ferramenta, de uma categoria e de um Guia_Pratico SHALL listar, nas Referencias_de_Entrada, as tarefas e Demandas que a citam.
14. IF uma tarefa não tem categoria de ferramenta nem Guia_Pratico associados, THEN THE Visao_de_Ferramentas_e_Guias SHALL exibir "sem ferramentas associadas" em vez de ocultar a seção.
15. THE Site SHALL derivar a Visao_de_Ferramentas_e_Guias exclusivamente das relações declaradas no Guia_YAML, sem copiar texto das Entidades relacionadas.
16. FOR ALL tarefas da Demanda_Piloto, THE Guia_YAML SHALL declarar ao menos uma Categoria_de_Ferramenta ou registrar explicitamente que a tarefa não tem ferramenta aplicável.
17. THE Pagina_Canonica de um Guia_Pratico SHALL exibir, como relação inversa, as tarefas e subtarefas que o referenciam em `guias_praticos`, reaproveitando o mecanismo de relações inversas do `SiteIndex`.
18. THE Site SHALL exibir o Guia_Pratico referenciado no idioma da página, com o fallback pt-BR e o marcador de fallback do Requirement 15.5 quando a tradução não existe.

### Requirement 11: Catálogo único com filtros combináveis

**User Story:** Como engenheiro, quero filtrar o catálogo inteiro por qualquer atributo das entidades, para que eu compare e escolha ferramentas, padrões e stacks em poucos cliques.

**Estado:** parcial. Há listas agrupadas por seção em `layers.ts` e relações por Entidade. Não há filtro interativo. Decisão 4 do dono: tudo filtrável como no protótipo, e toda Faceta vale só para os tipos que têm o atributo.

#### Acceptance Criteria

1. THE Catalogo SHALL oferecer uma lista única filtrável de todas as Entidades da Area Catalogo, com nome, tipo, descrição curta e link para a Pagina_Canonica.
2. THE Catalogo SHALL oferecer busca por texto e uma Faceta para cada atributo declarado no modelo de Entidade (`lib/guide/entities.ts` e `docs/content-contract.md`) que tenha valores enumeráveis, incluindo no mínimo: tipo, categoria, linguagem, caso de uso, empresa, domínio, licença e subtipo.
3. THE Catalogo SHALL gerar a lista de Facetas a partir do modelo de Entidade, de modo que um atributo novo no modelo apareça como Faceta sem alteração do código da interface.
4. WHEN o usuário seleciona valores em Facetas diferentes, THE Catalogo SHALL exibir somente as Entidades que atendem a todas as Facetas selecionadas.
5. WHEN o usuário seleciona mais de um valor na mesma Faceta, THE Catalogo SHALL exibir as Entidades que atendem a ao menos um dos valores.
6. THE Catalogo SHALL exibir, ao lado de cada valor de Faceta, o número de Entidades que o valor retornaria com os demais Filtros ativos.
7. WHEN o usuário aplica ou limpa um Filtro, THE Catalogo SHALL atualizar a lista e o contador "N de M" sem recarregar a página.
8. WHEN o usuário aplica um Filtro, THE Catalogo SHALL refletir o estado dos Filtros no Fragmento_de_Estado, de modo que copiar a URL reproduza o mesmo resultado.
9. THE Catalogo SHALL oferecer o botão "Limpar filtros", que restaura todos os Filtros ao valor inicial.
10. WHILE o tipo de Entidade selecionado não tem o atributo de uma Faceta, THE Catalogo SHALL ocultar ou desabilitar essa Faceta.
11. IF nenhuma Entidade atende aos Filtros, THEN THE Catalogo SHALL exibir a mensagem "nenhum item" e sugerir remover o último Filtro aplicado.
12. FOR ALL combinações de Filtros, THE Catalogo SHALL exibir um resultado igual ao obtido por filtragem direta sobre `api/index.json`, e o resultado SHALL ser independente da ordem em que os Filtros foram aplicados.
13. WHERE uma Entidade não tem valor para uma Faceta, THE Catalogo SHALL excluí-la quando a Faceta está filtrada e SHALL mantê-la quando a Faceta não está filtrada.
14. THE Catalogo SHALL funcionar a partir de dados estáticos do Build_Estatico, sem chamada a servidor.

### Requirement 12: Jornadas e competências com certificações

**User Story:** Como engenheiro, quero seguir uma jornada ou uma competência até as certificações que a comprovam, para que eu planeje o que estudar e como comprovar.

**Estado:** parcial. Existem a listagem de jornadas, 4 competências, 6 jornadas e 45 certificações, em áreas separadas.

#### Acceptance Criteria

1. THE Area Jornadas_e_Competencias SHALL listar jornadas, competências e certificações, com o total de cada grupo.
2. WHEN o usuário abre uma jornada, THE Site SHALL exibir as etapas na ordem declarada, cada etapa com link para a Pagina_Canonica da Entidade que ela cita.
3. WHEN o usuário abre uma competência, THE Site SHALL exibir a meia-vida, a orientação de estudo e os itens da competência.
4. THE Site SHALL exibir, em cada jornada e competência, as certificações relacionadas, e na Pagina_Canonica de cada certificação as jornadas e competências que a citam.
5. THE Area Jornadas_e_Competencias SHALL oferecer os Filtros: texto, emissor da certificação e área da competência.
6. WHEN o usuário aplica ou limpa um Filtro, THE Site SHALL atualizar a lista e o contador "N de M" sem recarregar a página.
7. THE Pagina_Canonica de uma certificação SHALL exibir Fonte_e_Data para custo, validade e versão do exame, ou o Marcador_Nao_Verificado quando faltarem.
8. IF uma certificação não é citada por nenhuma jornada ou competência, THEN THE Site SHALL exibi-la na lista de certificações com a indicação "sem jornada".

### Requirement 13: Navegação bidirecional e um conceito por nota

**User Story:** Como mantenedor, quero que toda menção a um conceito seja um link e que a página do conceito mostre de onde ele é citado, para que eu navegue nos dois sentidos e o conteúdo exista uma única vez.

**Estado:** já existe para wikilinks e relações inversas. Esta spec estende a regra aos novos pontos de interação (modal, catálogo da demanda, visão de ferramentas).

#### Acceptance Criteria

1. THE Site SHALL exibir, em toda Pagina_Canonica, as Referencias_de_Entrada agrupadas por tipo de Entidade citante.
2. THE Modal_de_Playbook, o Catalogo_da_Demanda, a Matriz_RACI e a Visao_de_Ferramentas_e_Guias SHALL referenciar cada Entidade por link para a Pagina_Canonica, sem duplicar o texto da Entidade no HTML da página citante.
3. WHEN uma Entidade é citada por um Nó do Diagrama, THE Pagina_Canonica da Entidade SHALL oferecer um link "Ver no diagrama" que abre a Pagina_de_Demanda na View e no Nó corretos, com o destaque aplicado.
4. THE Site SHALL manter, para cada tipo de Entidade, uma única Pagina_Canonica.
5. IF um link interno aponta para uma Entidade inexistente, THEN THE Build_Estatico SHALL falhar com o id não resolvido, como hoje.
6. FOR ALL arestas de `graph.json`, WHEN a Entidade de origem cita a Entidade de destino, THE Pagina_Canonica do destino SHALL listar a origem nas Referencias_de_Entrada (propriedade de simetria).

### Requirement 14: Dados com fonte e data

**User Story:** Como engenheiro, quero saber de onde vem cada preço, versão ou benchmark e quando foi verificado, para que eu confie no dado ou saiba que ele não foi confirmado.

**Estado:** já existe no contrato de conteúdo (`fontes`, `proxima_revisao`, `não verificado`). Esta spec exige que os novos pontos de exibição respeitem a regra.

#### Acceptance Criteria

1. WHEN o Site exibe um dado volátil (preço, versão, benchmark, validade de certificação), THE Site SHALL exibir junto dele a Fonte_e_Data.
2. IF um dado volátil não tem Fonte_e_Data, THEN THE Site SHALL exibir o Marcador_Nao_Verificado no lugar da Fonte_e_Data.
3. WHERE uma tabela do Catalogo exibe um dado volátil, THE tabela SHALL oferecer a Fonte_e_Data na mesma linha, em texto ou em detalhe expansível.
4. WHERE um Guia_Pratico traz um bloco "Como fazer hoje", THE bloco SHALL exibir a versão e a data de verificação dos comandos.

### Requirement 15: Site estático, offline e bilíngue

**User Story:** Como engenheiro, quero usar o kit sem conta, sem rede e no meu idioma, para que ele funcione onde eu trabalho.

**Estado:** já existe (build estático, Pagefind, Mermaid local atual, `pt-BR` e `en` com fallback). Esta spec exige que a nova interatividade preserve essas propriedades.

**Nota:** offline significa funcionar a partir dos arquivos estáticos construídos, servidos por HTTP (`npm run preview`, localhost ou hospedagem estática) com cache, sem backend e sem conta. Abrir por `file://` não é requisito (Decisão 15).

#### Acceptance Criteria

1. THE Site SHALL gerar toda a interatividade desta spec com JavaScript executado no navegador sobre dados estáticos do Build_Estatico, sem chamada a servidor.
2. WHEN o Build_Estatico é aberto sem acesso à rede, THE Site SHALL manter funcionais o Diagrama, o Modal_de_Playbook, o Catalogo_da_Demanda, o Catalogo, a busca e os Filtros.
3. THE Site SHALL carregar os recursos de interatividade (Renderizador e scripts) somente nas páginas que os usam.
4. THE Site SHALL oferecer todos os rótulos, mensagens e legendas desta spec em `pt-BR` e `en`, em `site/src/i18n`.
5. WHERE o conteúdo de uma Entidade ou do guia não tem tradução em `en`, THE Site SHALL exibir o texto em pt-BR com um marcador visível de fallback.
11. WHEN uma tradução em `en` é adicionada ao conteúdo, THE Site SHALL exibi-la e remover o marcador de fallback, sem mudança de código.
6. THE Site SHALL manter a navegação por teclado em todos os controles interativos desta spec, com indicador de foco visível.
7. THE Build_Estatico SHALL passar em `npm run smoke` com os links internos novos incluídos na verificação.
8. THE Site SHALL cumprir o orçamento de desempenho abaixo, medido em Chromium com CPU limitada a 4 vezes e rede local, sobre a Demanda_Piloto, com o Mermaid incluído na contagem de JavaScript (Decisão 13). **Adotada por padrão, aberta a veto do dono**; os números têm a evidência no design ("Orçamento de JavaScript e de tempo"). Tamanhos em gzip, tempos em p95 de 10 execuções:
   - a carga inicial da Pagina_de_Demanda (HTML, CSS, JavaScript do kit e Modelo_de_Grafo, sem o Mermaid) SHALL ter no máximo 300 kB, e o Modelo_de_Grafo de uma Demanda SHALL ter no máximo 200 kB (aprovado na Decisão 7);
   - a carga do Diagrama (Mermaid, layout de flowchart e Renderizador), carregada depois da carga inicial e só em página com Diagrama, SHALL ter no máximo 1,1 MB e a meta é no máximo 300 kB, com a build ESM dividida (somente os chunks de flowchart e dagre) como alvo desde o início, e o bundle único vendorizado apenas como fallback se o spike mostrar um bloqueio;
   - o total de JavaScript e Modelo_de_Grafo por página SHALL ter no máximo 1,4 MB, com meta de 600 kB, todos em gzip e incluindo o Mermaid. A medida que excede a meta, mas respeita o teto, SHALL ser reportada como aviso e não como falha;
   - a Visão geral SHALL ficar interativa em até 2,0 s após o carregamento do documento, incluindo a carga e a inicialização do Mermaid;
   - a expansão de uma Raia a partir da Visão geral SHALL concluir em até 1,0 s, e a troca para um estado do Diagrama já renderizado (View ou Subtarefas em cache) SHALL concluir em até 200 ms;
   - o Expandir_tudo da View `completo` SHALL concluir em até 5,0 s, com indicador de progresso visível em até 100 ms, e o `completo` com Subtarefas SHALL concluir em até 12 s, reportado como aviso quando exceder (Requirement 20.9);
   - a atualização de um Filtro do Catalogo SHALL concluir em até 100 ms (aprovado na Decisão 7);
   - o tamanho total de `site/dist` SHALL crescer no máximo 25% sobre a medição da linha de base registrada no design (aprovado na Decisão 7).
9. THE Teste_de_Navegador SHALL falhar quando uma das medidas do critério 8 excede o limite.
10. WHEN o usuário muda Modal_de_Playbook, Nó, View, Conjunto_Expandido, Subtarefas, Perspectiva ou Filtros, THE Site SHALL atualizar o Fragmento_de_Estado com `history.replaceState` ou `history.pushState`, sem recarregar a página e sem buscar de novo o JSON do Modelo_de_Grafo. Essa escolha é verificável no design (Decisão 8).
12. THE Build_Estatico SHALL incluir em `site/dist` todos os arquivos do Mermaid que o Diagrama pode carregar (bundle único ou arquivos da build dividida), servidos do mesmo site, sem chamada a CDN. O uso offline SHALL ocorrer com o `site/dist` servido por HTTP (servidor local ou hospedagem), porque o navegador bloqueia `import()` de módulos a partir de `file://`. Abrir por `file://` não é requisito (Decisão 15).

### Requirement 16: Verificação por testes de navegador (Playwright)

**User Story:** Como mantenedor, quero que cada comportamento interativo tenha um teste de navegador, para que eu mude o site sem quebrar o que foi construído.

**Estado:** parcial. Playwright e `label-overlap.spec.ts` já existem. Os 7 critérios de aceite da etapa 3 de `docs/guide-browser-tests.md` ainda não têm teste.

#### Acceptance Criteria

1. THE Teste_de_Navegador SHALL rodar contra o Build_Estatico servido por `tests/browser/serve.ts`, por meio de `npm run test:browser`.
2. THE repositório SHALL conter, para cada critério de aceite da etapa 3, ao menos um Teste_de_Navegador, nomeado conforme a tabela abaixo.
3. THE Teste_de_Navegador SHALL falhar quando um Nó do Diagrama não expõe `data-id`.
4. THE Teste_de_Navegador SHALL falhar quando a página lança exceção não tratada durante a troca de Demanda ou de View.
5. THE Teste_de_Navegador de sobreposição SHALL cobrir todas as Demandas, todas as Views (inclusive as de raia), os dois estados de Subtarefas e os Conjuntos_Expandidos `geral`, cada Raia expandida isoladamente e Expandir_tudo.
6. WHEN um Teste_de_Navegador mede o clique de 3 px e o arraste de 150 px, THE teste SHALL usar o movimento real do ponteiro (mouse down, move, up).
7. THE Teste_de_Navegador SHALL cobrir, no mínimo, um caso por Requirement 1 a 13, 17 a 20 que contenha comportamento de interface.
8. THE execução de `npm test` SHALL continuar excluindo `tests/browser/**`, como hoje.
9. WHEN um Pull Request é aberto, THE CI SHALL rodar o Teste_de_Navegador de sobreposição sobre a matriz completa da Demanda_Piloto (todas as Views de raia, com e sem Subtarefas, nos dois idiomas), executando `npm run build`, `npx playwright install --with-deps chromium` e `npm run test:browser`.
10. WHERE o CI executa o job agendado ou manual, THE job SHALL rodar a matriz completa de todas as Demandas, como verificação não obrigatória (confirmada por padrão, aberta a veto do dono).

Mapa dos critérios de aceite da etapa 3 para requisitos e testes:

| # | Critério (`docs/guide-browser-tests.md`) | Requisito | Teste de navegador |
|---|---|---|---|
| 1 | Clique no nó abre o playbook; até 3 px é clique | 3.2, 3.3 | `tests/browser/diagrama-interacao.spec.ts` |
| 2 | Arraste rola sem abrir; setas rolam; Ctrl com roda dá zoom, roda comum não | 3.4 a 3.8 | `tests/browser/diagrama-interacao.spec.ts` |
| 3 | Cada nó expõe `data-id` estável | 3.1, 16.3 | `tests/browser/diagrama-ids.spec.ts` |
| 4 | Catálogo da demanda lista, filtra por raia, mostra contador, destaca o nó e volta | 9.1 a 9.7 | `tests/browser/catalogo-demanda.spec.ts` |
| 5 | Trocar a demanda sem recarregar e sem exceção | 2.2, 2.4 | `tests/browser/demanda-troca.spec.ts` |
| 6 | Views por raia em ordem estável, mesma ordem horizontal de nós | 2.5, 2.6 | `tests/browser/ordem-views.spec.ts` |
| 7 | Subtarefas expandem e recolhem; nenhum nó cobre rótulo de `subgraph` | 5.1 a 5.3, 5.7 | `tests/browser/label-overlap.spec.ts` (estendido) |

### Requirement 17: Modelo de grafo serializado e Renderizador agnóstico

**User Story:** Como mantenedor, quero que o diagrama seja desenhado no navegador a partir de um modelo de grafo serializado, para que a experiência 3D imersiva futura consuma os mesmos dados sem retrabalho.

**Estado:** novo. Hoje o Diagrama é uma figura Mermaid pré-gerada por View (159 diagramas no build). Decisão 5 do dono. A experiência 3D está fora de escopo, o contrato de dados está dentro.

#### Acceptance Criteria

1. THE Build_Estatico SHALL publicar, para cada Demanda, um Modelo_de_Grafo em JSON estático (por exemplo `api/flows/<id>.graph.json`) com: nós (id, tipo, nome, Raia, subtarefas, condição), arestas (origem, destino, rótulo), raias (id, nome, cor, ordem) e metadados (Demanda, versão do contrato, ordem de exibição).
2. THE Modelo_de_Grafo SHALL ser gerado a partir do Guia_YAML pela mesma fonte que gera as páginas, sem texto Mermaid como intermediário.
3. THE Modelo_de_Grafo SHALL ter um schema JSON versionado e validado no build, e IF um Modelo_de_Grafo viola o schema, THEN THE Build_Estatico SHALL falhar com o id da Demanda e o caminho do campo inválido.
4. THE Diagrama SHALL ser desenhado no navegador pelo Renderizador, a partir somente do Modelo_de_Grafo, sem SVG pré-renderizado por View ou por Raia.
5. THE Renderizador SHALL derivar as Views `geral`, `raia:<id>` e `completo`, todo Conjunto_Expandido intermediário (com os Clusters_de_Raia e as arestas agregadas) e o estado das Subtarefas a partir do Modelo_de_Grafo, em tempo de execução.
6. THE Modelo_de_Grafo SHALL carregar apenas ids e metadados estruturais, e THE conteúdo do Playbook SHALL ser resolvido por id a partir dos dados estáticos do Site, sem duplicação no Modelo_de_Grafo.
7. THE Modelo_de_Grafo SHALL carregar posição ou ordem suficiente para que dois Renderizadores diferentes exibam os Nós na mesma ordem relativa dentro da Raia.
8. FOR ALL Demandas, serializar o Modelo_de_Grafo e desserializá-lo SHALL produzir um grafo equivalente ao original (round-trip).
9. FOR ALL Demandas, THE Modelo_de_Grafo SHALL conter exatamente os Nós, as Subtarefas, as arestas e as Raias que o Guia_YAML declara, sem acréscimo nem perda.
10. THE Renderizador SHALL depender do Modelo_de_Grafo por uma interface única, de modo que trocar o Renderizador não exija alterar o gerador do Modelo_de_Grafo.

### Requirement 18: Escopo da primeira entrega e generalidade dos mecanismos

**User Story:** Como mantenedor, quero entregar a experiência completa para a demanda `feature` com mecanismos reaproveitáveis nas outras demandas, para que eu valide o desenho num caso real e estenda sem retrabalho.

**Estado:** novo. Decisão 2 do dono.

#### Acceptance Criteria

1. THE Site SHALL implementar os mecanismos desta spec (Diagrama, Modal_de_Playbook, Catalogo_da_Demanda, Matriz_RACI, Visao_de_Ferramentas_e_Guias, Modelo_de_Grafo) de forma guiada por dados, sem código específico de uma Demanda.
2. THE critérios de aceite dos Requirements 2 a 10 SHALL ser verificados contra a Demanda_Piloto.
3. THE completude de dados desta spec (ligação de tarefas a categorias de ferramenta e guias práticos, Requirement 10) SHALL ser exigida somente da Demanda_Piloto.
4. WHEN o usuário abre a Pagina_de_Demanda de uma Demanda diferente da Demanda_Piloto, THE Site SHALL exibir o Diagrama, o Modal_de_Playbook e a Matriz_RACI com os dados que o Guia_YAML declara, e a Visao_de_Ferramentas_e_Guias SHALL exibir "sem ferramentas associadas" para as tarefas sem ligação.
5. FOR ALL Demandas diferentes da Demanda_Piloto, THE Site SHALL manter o comportamento que as páginas e as saídas da API têm antes desta spec, e `npm test` e `npm run smoke` SHALL passar sem regressão.
6. THE Validador_do_Guia SHALL aceitar as Demandas sem os campos de ligação novos (Requirement 10.2).

### Requirement 19: Perspectivas de visualização e Mermaid derivado do Modelo_de_Grafo

**User Story:** Como engenheiro, quero escolher a perspectiva do diagrama (Mermaid agora, 3D depois), para que eu veja o fluxo no formato que me serve sem que o conteúdo mude.

**Estado:** novo. Hoje `lib/flow-mermaid` gera Mermaid direto do YAML, com paridade testada pelos goldens em `tests/fixtures/mermaid` (`golden/` com todas as Views das 12 Demandas e `notes/` com 3 notas de guia) e por `tests/mermaid-parity/parity.test.ts`. Decisão 9 do dono.

#### Acceptance Criteria

1. THE Pagina_de_Demanda SHALL oferecer um seletor de Perspectiva com a opção `mermaid` e SHALL aceitar o registro de novas Perspectivas sem alterar o seletor.
2. THE Renderizador SHALL implementar uma interface de Perspectiva que recebe somente o Modelo_de_Grafo, de modo que uma Perspectiva `3d` posterior se registre sem alterar o gerador do Modelo_de_Grafo nem a Pagina_de_Demanda.
3. THE Perspectiva `mermaid` SHALL ser a Perspectiva inicial quando o usuário não escolheu outra.
4. WHEN o usuário escolhe uma Perspectiva, THE Site SHALL manter a View, o Conjunto_Expandido, as Subtarefas e o Nó selecionado, e SHALL registrar a escolha no Fragmento_de_Estado e no armazenamento local do navegador.
5. WHEN o usuário abre a Pagina_de_Demanda sem Perspectiva no Fragmento_de_Estado, THE Site SHALL usar a Perspectiva guardada no armazenamento local e, na ausência dela, a inicial.
6. THE Build_Estatico SHALL gerar o Texto_Mermaid a partir do Modelo_de_Grafo, no mesmo build, e THE Texto_Mermaid SHALL ter o Modelo_de_Grafo como única fonte de verdade.
7. THE alternativa sem JavaScript e a alternativa textual acessível (Requirement 2.10) SHALL derivar do mesmo Modelo_de_Grafo.
8. FOR ALL Demandas existentes e FOR ALL Views, com e sem Subtarefas, THE Texto_Mermaid gerado a partir do Modelo_de_Grafo SHALL ser igual, byte a byte, à saída do gerador atual, conforme os goldens em `tests/fixtures/mermaid`, verificado por `tests/mermaid-parity`.
9. FOR ALL Modelos_de_Grafo válidos, THE teste de propriedade SHALL verificar que o Texto_Mermaid é função apenas do Modelo_de_Grafo: o mesmo Modelo_de_Grafo produz o mesmo texto, e a alteração de um Nó, aresta ou Raia do Modelo_de_Grafo altera o texto correspondente.
10. WHEN o Texto_Mermaid derivado do Modelo_de_Grafo iguala os goldens de todas as Demandas e das 3 notas, THE repositório SHALL remover o caminho independente que gera Mermaid direto do YAML, ou SHALL mantê-lo somente como oráculo de teste, fora do código do build.
11. THE Site SHALL oferecer todos os rótulos do seletor de Perspectiva em `pt-BR` e `en`.

### Requirement 20: Visão geral e expansão progressiva até o completo

**User Story:** Como engenheiro, quero abrir o fluxo numa visão geral das raias e expandir só as raias e subtarefas que me interessam, até o fluxo completo, para que eu navegue um fluxo de 224 nós sem esperar nem me perder.

**Estado:** novo. Decisão 14. Hoje o `completo` renderiza os 224 nós de uma vez (`mermaid.render` em 3,58 s com CPU 4 vezes mais lenta, medido no design) e o `visao` legado mostra só a raia orquestradora. Os 7 critérios de aceite da etapa 3 seguem válidos: a ordem das Views (critério 6) e a ausência de sobreposição (critério 7) passam a valer também para cada Conjunto_Expandido.

#### Acceptance Criteria

1. WHEN o usuário abre a Pagina_de_Demanda sem View no Fragmento_de_Estado, THE Diagrama SHALL exibir a View `geral`: cada Raia como um Cluster_de_Raia, as arestas agregadas entre Clusters_de_Raia e a legenda.
2. THE Cluster_de_Raia SHALL exibir o nome da Raia, a cor da Raia, o total de Nós, de tarefas, de gateways e de Subtarefas da Raia, e o número de arestas agregadas de entrada e de saída. THE aresta agregada entre dois Clusters_de_Raia SHALL exibir a quantidade de arestas do Modelo_de_Grafo que ela representa.
3. WHEN o usuário clica no corpo de um Cluster_de_Raia, THE Diagrama SHALL expandir essa Raia no lugar, redesenhando somente o Conjunto_Expandido novo, e THE Cluster_de_Raia SHALL oferecer a ação "Abrir raia", que ativa a View `raia:<id>`.
4. WHEN o usuário aciona "Recolher" numa Raia expandida, THE Diagrama SHALL voltar a exibi-la como Cluster_de_Raia, e THE aresta entre um Nó de Raia expandida e uma Raia recolhida SHALL terminar no Cluster_de_Raia.
5. WHEN o usuário expande as Subtarefas de uma tarefa de Raia expandida, THE Diagrama SHALL exibir as Subtarefas dessa tarefa sem alterar o estado das demais, e THE alternador "Subtarefas" (Requirement 5) SHALL expandir as Subtarefas de todas as Raias expandidas.
6. WHEN o usuário aciona Expandir_tudo, THE Diagrama SHALL exibir a View `completo`, e THE Texto_Mermaid do Conjunto_Expandido com todas as Raias e sem Subtarefas SHALL ser igual, byte a byte, ao `completo` do gerador atual (golden `feature.completo.mmd`), e com Subtarefas ao golden `feature.completo.subtarefas.mmd`.
7. THE expansão SHALL ser monótona: expandir uma Raia ou uma Subtarefa acrescenta Nós e remove somente o Cluster_de_Raia expandido, e nenhum Nó já exibido desaparece.
8. THE Fragmento_de_Estado SHALL registrar o Conjunto_Expandido de forma compacta (por exemplo `exp=feat_ent,feat_orq`), de modo que abrir a URL reproduza o mesmo estado, e a URL com todas as Raias expandidas SHALL ser normalizada para a View `completo`.
9. WHILE o Diagrama redesenha um Conjunto_Expandido, THE Pagina_de_Demanda SHALL exibir um indicador de progresso em até 100 ms, manter o Diagrama anterior visível e SHALL descartar o resultado de uma renderização que o usuário tornou obsoleta ao pedir outro estado. IF a renderização excede o alvo interativo, THEN THE Pagina_de_Demanda SHALL concluí-la sem erro e informar o tempo decorrido, sem exceção não tratada no console.
10. THE configuração do Mermaid SHALL permitir o tamanho de texto e o número de arestas dos Conjuntos_Expandidos de todas as Demandas (limites padrão de 50.000 caracteres e 500 arestas), e IF o Mermaid recusa um Texto_Mermaid por limite, THEN THE Diagrama SHALL exibir a alternativa textual acessível e a mensagem do limite.
11. THE Cluster_de_Raia SHALL ser focável por teclado, com Enter para expandir e uma ação separada, também por teclado, para "Abrir raia", e SHALL expor `data-id` igual ao id da Raia.
12. FOR ALL Demandas e FOR ALL Conjuntos_Expandidos, THE Diagrama SHALL posicionar os Nós e os Clusters_de_Raia sem que a interseção entre `g.node` e o rótulo de qualquer `g.cluster` exceda 1 px² (Requirement 5.7).
13. THE entrega SHALL começar por um spike de desempenho que mede as alternativas de renderização do Conjunto_Expandido e registra o resultado no design, antes da implementação da interação do Diagrama.

## Questões em aberto
Todas as questões anteriores foram resolvidas pelas Decisões do dono (6 a 15) e removidas desta seção. Pendências remanescentes, nenhuma bloqueia o design. Os itens abaixo estão adotados por padrão e abertos a veto do dono:
1. **Teste de sobreposição (Decisão 11).** A divisão (matriz completa de `feature` por PR, matriz de todas as Demandas em job agendado ou manual) está adotada por padrão.
2. **Decisões 13 e 14** (orçamento incluindo Mermaid, build ESM dividida como alvo com bundle único como fallback, tabela de tempos por passo da expansão e `geral` como nova View inicial com `visao` legado em alias) estão adotadas por padrão.
