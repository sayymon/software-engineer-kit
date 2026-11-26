# Mapa dos testes de navegador do guia
Inventário dos seis scripts `cdp_*.mjs` do oráculo Python (removido do kit na fase 12; os scripts estão no histórico do git e no repositório do guia, commit `7abed1c`). Eles dirigiam o Chrome headless por CDP contra a página HTML autônoma do oráculo Python. Este mapa registra o que cada um verifica, se o comportamento existe no site de hoje e para onde ele vai.
Resultado: 1 comportamento existe parcialmente e vira teste Playwright (tarefa 11.2). Os outros 5 não existem no site e viram critério de aceite da etapa 3.
Estado do site na data da análise: `site/src` e `site/dist` (build estático em Astro). Cada página de demanda (`site/dist/pt-BR/flows/<demanda>/index.html`) traz 2 figuras Mermaid, `Visão geral` e `Fluxo completo` (`site/src/render/flow.ts`, linhas 46 a 51), renderizadas no cliente por `site/src/components/Diagram.astro`. Os playbooks dos nós aparecem como `<details>` na mesma página (`flow.ts`, linha 72). Não há modal, zoom, arraste, abas, seletor de demanda nem filtro de catálogo.
Leitura das colunas:
- Existe no site: `sim`, `não` ou `parcial`, com a evidência (arquivo e busca).
- Destino: `Playwright 11.2` (teste contra o build) ou `etapa 3` (critério de aceite da etapa 3, onde o comportamento passa a ser construído).
| Arquivo | Comportamento | Existe no site | Destino |
|---|---|---|---|
| `cdp_arraste.mjs` | Clique no nó abre o modal; tremor de até 3 px ainda é clique; arraste de cerca de 150 px sobre o nó rola `#rolagem` sem abrir o modal e muda o cursor; setas do teclado rolam; Ctrl + roda dá zoom e roda comum não dá | não: `grep` por `#modal`, `rolagem`, `zmais`, `arrastando` e `grab` em `site/src` não acha nada. Os nós do SVG não têm `data-id` (`dist/.../feature/index.html` tem 0 ocorrências). O único script do cliente é o carregador do Mermaid | etapa 3 |
| `cdp_catalogo.mjs` | Aba Catálogo: tabela de itens com contador, filtro por linha, abrir o item em modal, destaque do nó no diagrama com retorno visível, botão voltar e expansão de subtarefas (`#alt-sub`) | não: `dist/pt-BR/flows/` não tem `catalog` por demanda e não há `data-item`, `contador-catalogo` nem `alt-sub` em `site/src`. O catálogo do kit é outro conceito (tabelas por categoria em `site/src/render/entity.ts`, sem filtro interativo) | etapa 3 |
| `cdp_condicionais.mjs` | Subtarefas condicionais, variantes e tipos de artefato na fixture `condicionais.yaml`; troca de demanda por `#demanda`; ausência de exceções na página | parcial: variantes e subtarefas existem como conteúdo estático (`entity.ts`, linha 419 com `variante`; `subtarefa` nas linhas 78 e 143). A condicional visível, o seletor `#demanda` e a navegação por abas não existem. A geração do Mermaid aceita `subtarefas=true` (`lib/flow-mermaid/index.ts`, linha 570), mas o site não a usa | etapa 3 (a parte de variantes e subtarefas estáticas já é coberta por `tests/guide` e `tests/mermaid-parity`) |
| `cdp_ordem.mjs` | Posição x de cada nó por demanda e por aba: ordem das abas, ordem dos nós na Visão e ordem das raias no modo Completo | não para as abas e para o x medido por `data-id`. A ordem estável das views (`visao`, `raia:<id>`, `completo`) existe na geração e é testada em `tests/mermaid-parity` (linha 35). No site só há 2 views, nesta ordem, em `figcaption` | etapa 3 (as abas e a ordem das raias por raia). A ordem das 2 figuras entra na 11.2 como asserção do teste de sobreposição |
| `cdp_sobreposicao.mjs` | Nenhum nó cobre o rótulo de um `subgraph` (`g.cluster` contra `g.node`, área maior que 1 px) em todas as demandas e todas as views | parcial: o Mermaid do site gera `subgraph` por raia e por tarefa (`lib/flow-mermaid/index.ts`, linhas 444 e 452) e o cliente renderiza `g.cluster` e `g.node` dentro de `figure[data-island="mermaid"][data-rendered="true"]`. Faltam as abas por raia, então a medida cobre só `Visão geral` e `Fluxo completo` | Playwright 11.2 (toda página em `flows/<demanda>/` que tenha `figure[data-island="mermaid"]`, 2 views cada) |
| `cdp_subtarefas.mjs` | Fluxo de subtarefas na fixture `subtarefas.yaml`: expandir e recolher, e a mesma medida de sobreposição de rótulo com as subtarefas expandidas | não: o site não expõe o alternador de subtarefas no diagrama (`flow.ts` chama `gerarDiagrama` sem `subtarefas`) e `alt-sub` não existe em `site/src`. A sobreposição com subtarefas expandidas fica sem página para medir | etapa 3 |

## Critérios de aceite da etapa 3
Os comportamentos marcados `etapa 3` seguem como critérios de aceite, sem teste na 11.2:
1. Clicar num nó do diagrama abre o playbook, e um movimento de até 3 px ainda conta como clique (de `cdp_arraste.mjs`).
2. Arrastar o diagrama rola a área sem abrir o playbook, setas do teclado rolam a área focada, Ctrl + roda dá zoom e roda comum não dá (de `cdp_arraste.mjs`).
3. Cada nó do SVG expõe um identificador estável (`data-id`) para teste e para ligação com o catálogo (de `cdp_arraste.mjs` e `cdp_ordem.mjs`).
4. O catálogo da demanda lista os itens, filtra por linha, mostra o contador e destaca o nó correspondente no diagrama com botão voltar (de `cdp_catalogo.mjs`).
5. A demanda pode ser trocada sem recarregar, e a página não lança exceções (de `cdp_condicionais.mjs`).
6. As views por raia aparecem em ordem estável (`visao`, raias, `completo`) com a mesma ordem horizontal de nós em todas as demandas (de `cdp_ordem.mjs`).
7. O diagrama permite expandir as subtarefas, e nenhum nó cobre o rótulo de um `subgraph` nem com elas expandidas (de `cdp_subtarefas.mjs`).

## Notas para a 11.2
- O repositório ainda não tem Playwright (`package.json` e `node_modules/.bin` não o trazem). A 11.2 adiciona a dependência, ou registra a ausência se a instalação não couber no escopo.
- O teste de sobreposição roda contra `site/dist` servido por HTTP local. Os scripts antigos abriam `file:`, e `file:` não carrega o Mermaid vendorizado em `vendor/mermaid` nas mesmas condições.
- Os `.mjs` saíram do kit com o oráculo (fase 12). Os critérios acima preservam o conhecimento deles.

## Como rodar (11.2)
- Teste: `tests/browser/label-overlap.spec.ts` (Playwright, Chromium), com config própria em `playwright.config.ts`. Ele fica fora do `npm test` (o vitest exclui `tests/browser/**`).
- Build primeiro, se `site/dist` não existir: `KIT_LOCALES=pt-BR npm run build`.
- Primeira vez: `npx playwright install chromium`. Depois: `npm run test:browser`. O servidor HTTP local de `site/dist` (`tests/browser/serve.ts`) sobe sozinho.
- Cobre as 2 figuras (`Visão geral`, `Fluxo completo`) de cada página de demanda de `pt-BR` que tenha diagrama Mermaid.
- Fora do CI obrigatório. Um job de CI pode ser adicionado depois (build, `npx playwright install --with-deps chromium`, `npm run test:browser`), como verificação opcional até o mantenedor decidir torná-la obrigatória.
