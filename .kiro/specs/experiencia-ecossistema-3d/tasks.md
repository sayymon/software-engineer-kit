# Implementation Plan

## Overview

Plano de implementação do Ecossistema 3D, na ordem em que o risco é retirado primeiro: dependências e camadas, spike de desempenho, dados do build, lógica pura do cliente, renderizador, interface e verificação. Cada tarefa cita os requisitos (`R`) de `requirements.md` e as decisões (`D`) de `design.md`.

Decisões do dono incorporadas: o bundle adiado tem limite de 450 kB gzip; a tela exibe só os itens de detalhe ligados ao nó em Foco, mesmo que o arquivo baixado cubra a Demanda inteira; `fast-check` entra como devDependency.

Regras de execução:

- Toda tarefa que muda código roda `npm run validate` e `npm test` antes de fechar.
- Arquivos de código levam `SPDX-License-Identifier: MIT`.
- A tarefa 1.1 (spike) é um portão: se ela não provar 30 quadros por segundo, as tarefas de renderizador (fase 4) esperam a revisão do design de arestas.

## Tasks

### Fase 1: Fundação e spike

- [ ] 1.2 Adicionar as dependências do ecossistema
  - Adicionar `3d-force-graph@1.80.2` e `three@0.187.0` (dependencies), `d3-force-3d` e `fast-check` (devDependencies), fixando versões
  - Registrar licenças em `THIRD-PARTY-NOTICES.md` e `REUSE.toml`, e passar no check `licenses`
  - Confirmar que `npm ci` e `npm run build` continuam verdes
  - _R9.1, R9.3; D1_
- [ ] 1.3 Criar o mapa de camadas e grupos visuais
  - Criar `lib/ecossistema/camadas.ts` com `Record<Tipo, ...>` exaustivo para camada (`nucleo`, `fluxo`, `detalhe`) e grupo visual (fluxos, artefatos e variáveis, catálogo, fundamentos, aprendizado, hubs)
  - Teste `camadas.test.ts`: todo tipo do schema tem camada e grupo; tipo novo sem entrada falha
  - _R3.1, R3.2, R3.3, R3.4, R3.10, R12.7; D7_
- [ ] 1.1 Spike de desempenho do desenho com arestas em lote
  - Página isolada (fora do site) que carrega o `graph.json` real (2.112 nós sem gateways, cerca de 12,6 mil pares), desenha nós com `3d-force-graph` e arestas em um único `LineSegments`
  - Medir quadros por segundo na rotação da câmera e tempo até o primeiro quadro, em hardware de referência (anotar o modelo)
  - Medir também a alternativa de arestas nativas da biblioteca, para o registro de decisão
  - Registrar o resultado em `docs/reviews/ecossistema-3d-spike.md`. Se ficar abaixo de 30 quadros por segundo, parar e revisar o design (arestas só da vizinhança, ou nível de detalhe por distância)
  - _R9.5, R9.6; D3_

### Fase 2: Dados no build

- [ ] 2.1 Implementar a adjacência
  - `lib/ecossistema/adjacencia.ts`: constrói adjacência simétrica sem direção, vizinhança por profundidade 1 e 2 e agrupamento por tipo
  - Testes com fast-check: simetria, ausência de aresta órfã, independência da ordem de inserção
  - _R7.6, R7.7, R7.8, R12.6; propriedades 2 e 3_
- [ ] 2.2 Implementar o layout pré-calculado
  - `lib/ecossistema/layout.ts` com `d3-force-3d`: semente fixa, 300 passos, repulsão com Barnes-Hut, mola por aresta (peso menor para `body`) e atração fraca para a âncora da Área
  - Hubs de navegação fora da simulação e posicionados no centroide dos vizinhos
  - Posições arredondadas para inteiros. Medir e registrar o tempo de build
  - Testes: mesmos bytes em duas execuções, sem `NaN`, hubs no centroide
  - _R2.3, R2.8, R8.2, R8.5; D2; propriedade 7_
- [ ] 2.4 Gerar os shards de detalhe por Demanda
  - Verificar a premissa do design: itens de detalhe saem de `lib/guide/entities.ts` (entidades derivadas com `relacoes`), não de `SiteIndex.pages`
  - Gerar um shard por Demanda com gateways, subtarefas, perguntas, nós, células e playbooks, cada um com o id do pai
  - Posicionamento no cliente em anel ao redor do pai, determinístico pelo hash do id (função em `lib/ecossistema`, com teste)
  - _R3.4, R3.8, R3.9, R7.4; D5_
- [ ] 2.5 Gerar os fatos por tipo
  - Arquivos `fatos/<tipo>.json` para ferramenta, modelo, certificacao, tarefa, raia e demanda
  - Todo dado volátil com `fonte` e `data`, ou `naoVerificado: true`
  - Teste: nenhum preço, versão ou benchmark sai sem fonte e data ou marcador
  - _R5.5, R5.7, R5.9_
- [ ] 2.3 Montar o payload colunar com schema
  - `lib/ecossistema/payload.ts`: tabelas de tipos, grupos e kinds, nós com posição e grau, arestas por índice, sem os tipos de `detalhe`
  - Schema Zod versionado para payload e shard. O build falha com o id do nó ou da aresta inválida
  - Testes: round-trip colunar para objeto, índices válidos, tamanho gzip dentro do limite
  - _R7.2, R7.3, R7.5, R7.6, R9.4; D4_
- [ ] 2.6 Publicar os arquivos em `api/ecossistema/`
  - Estender `site/src/render/api.ts` e `routes.ts`: `index.json`, `detalhe/<demanda>.json` e `fatos/<tipo>.json` por idioma
  - Manter `graph.json` inalterado
  - Verificar tamanho gzip no build e falhar acima de 200 kB para o payload principal
  - _R7.1, R7.2, R7.4, R9.4_

### Fase 3: Lógica pura do cliente

- [ ] 3.1 Implementar filtros compartilhados com a lista
  - `lib/ecossistema/filtro.ts`: camadas, hubs, facetas e texto, com E entre facetas e OU dentro da faceta
  - Se o módulo de facetas do Catálogo (spec `experiencia-fluxos-catalogo`, Requirement 11) ainda não existir, criar aqui e fazer a lista usá-lo depois. Há um único código de filtro
  - Testes com fast-check: independência da ordem, paridade com filtragem direta de `api/index.json`, aresta visível se e somente se os dois extremos estão visíveis
  - _R3.6, R3.7, R6.1, R6.2, R6.3, R6.7, R12.6; propriedades 4, 5 e 6_
- [ ] 3.2 Implementar o cálculo de foco
  - `lib/ecossistema/foco.ts`: vizinhança por profundidade 1 ou 2, teto de 400 nós na profundidade 2, hubs fora da profundidade 2, agrupamento por tipo acima de 150 vizinhos e expansão de um grupo por vez
  - Função de arranjo em casca esférica ao redor do nó focado
  - Testes: teto, agrupamento, exclusão de hubs, arranjo sem sobreposição de posições
  - _R4.1, R4.9, R4.10, R5.2; D6; propriedade 8_
- [ ] 3.3 Implementar o estado e o hash
  - `site/src/ecossistema/estado.ts`: serialização canônica (`m`, `f`, `d`, `l`, `h`, `q` e facetas), leitura tolerante a parâmetros inválidos e desconhecidos
  - `replaceState` para filtros, `pushState` para foco. Câmera em `history.state`
  - Testes: round-trip do estado, hash inválido, id inexistente
  - _R1.5, R4.11, R4.12, R6.6, R11.4; D8; propriedade 9_

### Fase 4: Renderizador

- [ ] 4.1 Definir a interface do renderizador e o renderer falso
  - `site/src/ecossistema/renderer.ts` com `EcossistemaRenderer` conforme o design
  - Renderer falso para testes de lógica e de contrato (a lógica só usa a interface)
  - _R12.1; D1_
- [ ] 4.2 Implementar o adaptador de `3d-force-graph`
  - Nós com geometria e material compartilhados por grupo (forma e cor Okabe-Ito), tamanho por grau com teto
  - Posições fixas do payload e simulação desligada. Arestas em um único `LineSegments`, com opacidade menor para `body`
  - Visibilidade por camada e filtro sem recalcular posições. `destruir()` libera geometrias, materiais, texturas e o laço de animação
  - Teste de navegador de vazamento: contagem de recursos volta a zero após sair do modo
  - _R2.1, R2.2, R2.3, R2.6, R2.9, R3.6, R8.1, R8.3, R8.6, R8.7, R9.9, R10.6; D3, D7; propriedade 11_
- [ ] 4.3 Implementar o foco visual
  - Destacar o nó focado e a vizinhança, atenuar o resto, expandir o nó e arranjar a vizinhança em casca
  - Animação de câmera de até 1 s, e salto direto com `prefers-reduced-motion`
  - Voltar restaura o foco anterior, Esc e clique no fundo saem do foco
  - _R4.1 a R4.8, R8.4; D6_
- [ ] 4.4 Implementar rótulos e dica
  - Dica de nome e tipo ao passar o ponteiro. Rótulos distantes ou densos ocultos. Rótulos da vizinhança do nó focado sempre visíveis e sem sobreposição
  - _R2.5, R8.8, R8.9_

### Fase 5: Interface e integração

- [ ] 5.1 Criar a casca do modo e o carregador
  - `site/src/components/Ecossistema.astro` com `data-island="ecossistema"` e seletor `lista` ou `ecossistema` na página do Catálogo
  - Carregador por `import()` dinâmico, só no modo `ecossistema`. Teste de WebGL com fallback para `lista` e mensagem. Indicador de progresso. Tratamento de perda de contexto e de falha de download
  - Manter os filtros ao alternar o modo
  - _R1.1, R1.2, R1.3, R1.5, R1.6, R9.2, R9.8, R10.1; Error Handling_
- [ ] 5.2 Implementar a barra lateral
  - Nome, tipo, área, descrição e vizinhança por tipo com contagens, a partir de `api/index.json` (cache compartilhado com a lista) e da adjacência
  - Fatos por tipo carregados ao focar o primeiro nó do tipo. Links "Abrir página", "Abrir fluxo" e "Ver no diagrama"
  - Itens de detalhe exibidos somente quando ligados ao nó em Foco, com a ação "Mostrar detalhes deste nó"
  - Esc fecha e sai do foco. Painel inferior abaixo de 768 px. Foco gerenciado, `aria-live` e navegação por teclado na lista de vizinhos
  - _R3.9, R5.1 a R5.12, R10.2, R10.3, R10.4_
- [ ] 5.3 Implementar legenda e controles
  - Legenda com cor, forma, contagem e caixas por tipo. Controles de camadas, hubs, profundidade 1 ou 2, Recentralizar, Voltar, Sair do foco, busca e facetas, Limpar filtros, contador "N de M" e "nenhum item"
  - _R2.4, R2.7, R2.8, R3.5, R3.6, R4.6, R4.9, R6.1, R6.4, R6.5, R6.8, R6.9_
- [ ] 5.4 Traduzir rótulos e mensagens
  - Todos os textos em `site/src/i18n` para `pt-BR` e `en`, incluindo o marcador de fallback para conteúdo sem tradução
  - _R5.9; spec de fluxos Requirement 15.4_
- [ ] 5.5 Integrar com os Fluxos de demandas e as páginas canônicas
  - "Ver no ecossistema" na Página de demanda, no Modal de playbook (tarefa em Foco com camada `fluxo`) e na página canônica de qualquer entidade
  - "Abrir fluxo" na barra lateral de demanda e de raia leva à View correta. "Mostrar só esta demanda" filtra o grafo
  - Voltar do navegador restaura foco, filtros e câmera
  - Adicionar a ligação à validação de links e ao `npm run smoke`
  - _R1.7, R5.6, R5.7, R11.1 a R11.5_

### Fase 6: Verificação e documentação

- [ ] 6.1 Escrever os testes de navegador
  - `tests/browser/ecossistema.spec.ts`: abertura e contagem por camada, foco com vizinhança igual à calculada do JSON, `detalhe` baixando só ao pedir, restauração por URL e pelo Voltar, fallback sem WebGL, navegação por teclado, console sem exceção
  - _R12.1 a R12.5_
- [ ] 6.2 Verificar o orçamento no CI
  - Falhar quando o bundle adiado passar de 450 kB gzip, o carregador de 5 kB, o payload principal de 200 kB gzip ou o primeiro quadro interativo de 3,0 s (p95, CPU 4 vezes mais lenta)
  - Registrar a linha de base medida em `docs/reviews/ecossistema-3d-orcamento.md`
  - _R9.3, R9.4, R9.5, R9.7, R9.10, R12.8_
- [ ] 6.3 Medir quadros por segundo e anexar à PR
  - Medição local no hardware de referência (rotação da câmera, entrada em Foco). Anexar o resultado à PR, com o modelo do equipamento
  - _R9.6, R9.7_
- [ ] 6.4 Atualizar a documentação e fechar
  - Atualizar `docs/architecture.md` (convenção de ilhas, API estática de `api/ecossistema/`, C4) e `docs/site-map.md`
  - Rodar `npm run validate`, `npm test`, `npm run build`, `npm run smoke` e `npm run test:browser`
  - Marcar as questões em aberto do design como resolvidas
  - _R1.4; todos_

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.2", "1.3"], "note": "dependências e camadas" },
    { "id": 1, "tasks": ["1.1", "2.1", "3.1", "3.3", "4.1"], "note": "spike (portão) e lógica pura" },
    { "id": 2, "tasks": ["2.2", "2.4", "2.5", "3.2"] },
    { "id": 3, "tasks": ["2.3"] },
    { "id": 4, "tasks": ["2.6", "4.2"], "note": "4.2 só começa se o spike 1.1 passar" },
    { "id": 5, "tasks": ["4.3", "4.4", "5.1"] },
    { "id": 6, "tasks": ["5.2", "5.3", "5.4"] },
    { "id": 7, "tasks": ["5.5"] },
    { "id": 8, "tasks": ["6.1", "6.2", "6.3"] },
    { "id": 9, "tasks": ["6.4"] }
  ]
}
```

## Notes

- **Portão do spike:** a tarefa 1.1 decide se as arestas em lote bastam. Se o resultado ficar abaixo de 30 quadros por segundo, o design muda antes da wave 4.
- **Dependência da spec de fluxos:** o seletor de modo e as facetas do Catálogo vêm da spec `experiencia-fluxos-catalogo` (Requirement 11). Se ela ainda não tiver entregue o módulo de facetas, a tarefa 3.1 o cria e a lista passa a usá-lo, para existir um único código de filtro.
- **Dependência de dados:** a tarefa 2.4 confirma a premissa de que os itens de detalhe saem das entidades derivadas do guia. Se a premissa falhar, o design é corrigido antes de seguir.
- **CI e WebGL:** o Chromium headless usa renderização por software. Os testes de comportamento rodam no CI. Quadros por segundo são medidos localmente (6.3).
- **Layout entre builds:** o layout é recalculado a cada build. Se a estabilidade entre versões passar a importar, partir das posições do build anterior é uma melhoria posterior.
- **Numeração:** as tarefas 1.1, 1.2 e 1.3 aparecem na ordem de execução desejada (1.2, 1.3, 1.1), e o grafo de dependências é a fonte da ordem real.
