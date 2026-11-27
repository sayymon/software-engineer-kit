# Implementation Plan

## Overview

Plano de implementação da Home imersiva: palco único com partículas em morph, quatro Cenas conduzidas pela rolagem nativa, Barra_de_Atalhos discreta e Fallback_Estatico. A ordem retira o risco primeiro: calculador de progresso e estrutura da página, depois o palco com um spike de desempenho, depois as Cenas, depois a experiência fina e a verificação. Cada tarefa cita requisitos (`R`) de `requirements.md` e decisões (`D`) de `design.md`.

Regras de execução:

- Toda tarefa de código roda `npm run validate` e `npm test` antes de fechar. Arquivos de código levam o cabeçalho SPDX com a licença MIT.
- Sem dependência nova de animação (decisão do dono). Usar o Three.js já instalado.
- A tarefa 1.3 é um portão: se o palco não sustentar 30 quadros por segundo no hardware de referência, as tarefas de Cenas esperam a revisão do design.
- O conteúdo das Cenas vem dos dados. Nenhum texto de entidade é copiado.

## Tasks

### Fase 1: Base

- [x] 1.1 Implementar o calculador de progresso e a Cena ativa
  - `lib/home/progresso.ts`: `progressoDaCena`, `cenaAtiva`, `janelaDeMorph`
  - Testes com fast-check: limites 0 e 1, monotonia, independência de escala, uma Cena ativa
  - _R1.3, R1.7; propriedades 1 a 4; D3_
- [x] 1.2 Estruturar a página, a Barra_de_Atalhos e o Fallback_Estatico
  - HTML das quatro Cenas com faixas sticky, textos e links, em `renderHome` e `index.astro`
  - Barra_de_Atalhos fina (oito atalhos, ecossistema, busca, idioma), indicador de progresso, link "Pular a apresentação"
  - Fallback sem JavaScript e com `prefers-reduced-motion` mostrando as quatro seções
  - Textos em `pt-BR` e `en`. Teste: o conjunto de links da Home é igual ao do Fallback
  - _R1.1, R1.2, R1.4 a R1.6, R2.1 a R2.6, R8.1 a R8.4, R9.2; D7_
- [ ] 1.3 Criar o Palco e o spike de desempenho
  - `site/src/home/palco.ts`: um renderer, câmera, laço com pausa por visibilidade, resize e descarte
  - `lib/home/qualidade.ts` e regra de descer de nível por tempo de quadro (testes: só desce)
  - Spike: 2.400 partículas com morph entre dois layouts sob rolagem. Medir quadros por segundo e primeiro quadro em hardware de referência. Registrar em `docs/reviews/home-imersiva-spike.md`
  - Se ficar abaixo de 30 quadros por segundo, parar e revisar o design
  - _R7.5 a R7.7, R7.9; propriedades 8 e 9; D1, D6_
- [x] 1.4 Implementar as partículas em morph
  - `site/src/home/particulas.ts`: geometria com `aPosA` e `aPosB`, `uMix`, cores e tamanhos por partícula, poeira
  - Interface `Cena` e `LayoutDeParticulas`. Teste: extremos do morph e ausência de `NaN`
  - _propriedade 5; D1_

### Fase 2: Cenas

- [ ] 2.1 Cena 1: título no Palco
  - `site/src/home/titulo.ts`: malha do título com o shader de água e ímã de `hero-title.ts`
  - Amostrar cerca de 1.800 pontos das letras como posições iniciais. O `<h1>` real continua no DOM
  - Transição do título em partículas para a Cena 2 (progresso 0,6 a 1). Remover `hero-title.ts` após a migração
  - _R3.1 a R3.5; D4_
- [x] 2.2 Cena 2: fluxos por demanda
  - `lib/home/layouts.ts` (raias e nós por ordem topológica) com testes de determinismo
  - Carregamento preguiçoso de `api/flows/<id>.json`. Arestas reveladas pelo progresso, seletor das 12 Demandas, hover com nome e papel, link "Abrir fluxo"
  - _R4.1 a R4.7, R7.4_
- [x] 2.3 Cena 3: catálogo
  - Layout a partir de `api/ecossistema/index.json`, com cores e formas de `lib/ecossistema/camadas.ts`
  - Agrupamento por grupo visual, contagens em HTML, hover, links para a lista e o Ecossistema 3D. Teste: contagens iguais ao payload
  - _R5.1 a R5.6; propriedade 6_
- [x] 2.4 Dados de jornadas para a Home
  - `api/home/jornadas.json` com schema Zod (`lib/home/jornadas.ts`), emitido em `site/src/render/api.ts`. O build falha com o id inexistente
  - Teste: custo sem fonte e data sai como `não verificado`
  - _R6.5, R9.1, R9.5_
- [x] 2.5 Cena 4: jornadas e competências
  - Certificações em anéis por nível e setores por área, jornadas em trilha, competências como âncoras
  - Ligações só onde existem nos dados. Hover destaca o conjunto ligado
  - _R6.1 a R6.4_
- [ ] 2.6 Conteúdo: relações entre jornadas, competências e certificações (movida para outra spec, decisão do dono)
  - Preencher `competencias` e `certificacoes` das jornadas e `certificacoes` das competências, com fonte e data
  - Revisão humana do conteúdo antes do merge. Pode ser feita depois da Cena 4 (decisão do dono)
  - _R6.1; Questões em aberto 0 dos requisitos_

### Fase 3: Experiência

- [x] 3.1 Transições entre Cenas e textos por progresso
  - Câmera e `uMix` por janela de morph. Textos e links entram por variáveis CSS (`--p`) ligadas ao progresso
  - _R1.1, R3.3, R4.4, R6.2_
- [ ] 3.2 Interação por ponteiro e por toque
  - Raycast com prioridade (título antes das partículas enquanto o progresso da Cena 1 for menor que 0,6). Toque mostra o tooltip
  - _R4.5, R5.4, R6.3; Questão 3 do design_
- [x] 3.3 Qualidade adaptativa e versão reduzida para celulares
  - Níveis alto, médio e baixo. Celulares começam em médio e mantêm a narrativa
  - _R7.7, R7.9; D6_

### Fase 4: Verificação e documentação

- [x] 4.1 Testes de unidade e de propriedade
  - Consolidar `progresso`, `layouts`, `qualidade`, `jornadas` e `home-estatica`
  - _R10.6_
- [x] 4.2 Testes de navegador
  - `tests/browser/home.spec.ts`: Cenas em ordem, indicador, atalhos, seletor de Demandas, fallbacks, console sem exceção, um único canvas
  - Atualizar os testes que dependem da Home antiga
  - _R10.1 a R10.5_
- [ ] 4.3 Orçamento de desempenho no CI
  - Falhar acima de 60 kB de JavaScript inicial, 450 kB adiado, 10 kB do `jornadas.json` ou 3,0 s no primeiro quadro
  - Registrar a linha de base em `docs/reviews/home-imersiva-orcamento.md`
  - _R7.1 a R7.3, R10.7_
- [ ] 4.4 Medição local e documentação
  - Quadros por segundo no hardware de referência, anexados à PR. Atualizar `docs/architecture.md` e `docs/site-map.md`
  - Rodar `npm run validate`, `npm test`, `npm run build`, `npm run smoke` e `npm run test:browser`
  - _R7.7_

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2"], "note": "progresso e estrutura da página" },
    { "id": 1, "tasks": ["1.3"], "note": "palco e spike (portão)" },
    { "id": 2, "tasks": ["1.4", "2.4"] },
    { "id": 3, "tasks": ["2.1", "2.2", "2.3"], "note": "só começam se o spike 1.3 passar" },
    { "id": 4, "tasks": ["2.5", "3.1"] },
    { "id": 5, "tasks": ["3.2", "3.3", "2.6"] },
    { "id": 6, "tasks": ["4.1", "4.2", "4.3"] },
    { "id": 7, "tasks": ["4.4"] }
  ]
}
```

## Notes

- **Estado da implementação (branch `feat/ecossistema-3d`):** feitas as tarefas 1.1, 1.2, 1.4, 2.2 a 2.5, 3.1, 3.3, 4.1 e 4.2. As cenas foram revisadas pelo dono (ver "Revisões após a revisão do dono" no design): tema tecnológico, título elétrico, ícones nas demandas, cérebro e livros nas jornadas, termos do catálogo e nenhum menu no topo.
- **Pendências:** 1.3 (spike formal: o dono mediu cerca de 50 quadros por segundo no nível alto, falta registrar o modelo do equipamento), 2.1 (o título continua em canvas próprio), 3.2 (tooltips por hover e toque nos nós), 4.3 (orçamento no CI) e 4.4 (documentação do site).
- **Medidas (gzip):** ver `docs/reviews/home-imersiva-orcamento.md`. JavaScript inicial cerca de 4 kB e adiado cerca de 160 kB.

- **Portão do spike:** a tarefa 1.3 decide se o palco único sustenta o morph. Se não sustentar, o design muda (menos partículas, ou um canvas por Cena) antes da wave 3.
- **Lacuna de dados:** jornadas e competências não têm ligações hoje. A Cena 4 funciona por área e nível, e a tarefa 2.6 preenche as relações com revisão humana.
- **Título:** a migração do título para o Palco (2.1) substitui `site/src/scripts/hero-title.ts`. Até lá, o título atual continua funcionando.
- **Sem dependência nova:** GSAP e Lenis ficam para uma melhoria posterior, se a rolagem ou as timelines pedirem.
- **Ordem real:** vale o grafo de dependências. A tarefa 2.6 é de conteúdo e pode ficar fora do primeiro merge.
