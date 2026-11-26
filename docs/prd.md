# PRD: software-engineer-kit

Este documento define o problema, o objetivo, as métricas e o escopo do kit. A visão de produto e os princípios de experiência ficam em `.kiro/steering/product.md`. Cada entrega detalha seus requisitos em `.kiro/specs/<nome>/`.

## Problema do usuário

Engenheiros de software trabalham hoje cercados de ferramentas, metodologias e técnicas em quantidade crescente. Esse volume deixa o cenário difuso: falta clareza sobre o que fazer e o que usar para aplicar engenharia de fato e garantir qualidade, escalabilidade e performance.

A dúvida vale também para os demais envolvidos no ciclo de engenharia. Cada papel precisa saber o que deve e o que pode fazer em cada etapa. Perguntas-chave, fundamentos e conceitos também ficam espalhados e sem ordem de leitura.

## Personas e papéis

Persona e papel são conceitos diferentes. A persona é quem usa o kit. O papel é a função que a pessoa exerce dentro de uma demanda, e uma mesma pessoa exerce vários papéis ao longo do ciclo.

- **Persona primária:** engenheiro de software.
- **Personas secundárias:** QA, PM, gerente de engenharia, tech lead e demais participantes do ciclo.
- **Papéis:** definidos em `content/guide/catalogos/papeis.yaml` (chave `papeis`) e compartilhados entre as personas. Os fluxos, o RACI e os ritos apontam para esses papéis, e o kit nunca os duplica.

## Objetivo

Prover um kit navegável e interativo que guia o engenheiro em todos os tipos de demanda. Para cada demanda, o kit mostra:

- as ferramentas e técnicas a considerar;
- as perguntas-chave que precisam ser respondidas;
- quem faz o quê em cada etapa.

## Métricas de sucesso

- Estrelas no GitHub.
- Comentários nos posts de divulgação.
- Cobertura do catálogo: ferramentas, conceitos e técnicas registrados.
- Qualidade do kit quando aplicado em diferentes tipos de projeto.

### Como medir a qualidade (pós-entrega)

Projetos, features e bugs emulados percorrem os fluxos para verificar se o fluxo se sustenta, quais artefatos ele gera e onde há lacunas. Essa medição chega junto com o agente que executa os fluxos, em uma entrega posterior. Até lá, a qualidade é acompanhada pelas issues com o rótulo `lacuna`.

A métrica primária de utilidade para o mantenedor (lacunas abertas por mês) continua em `product.md`.

## Escopo

Site visual, navegável, interativo e imersivo, com:

- fluxos de demanda (tarefas, subtarefas, gateways, papéis e ritos);
- catálogo de ferramentas, técnicas, artefatos e papéis;
- fundamentos, jornadas e competências.

## Artefatos de documentação

- PRD: este arquivo.
- Arquitetura: `docs/architecture.md`, com diagramas C4 (contexto, contêineres e componentes).
- Modelo de domínio: `docs/domain-model.md`, com contextos delimitados, linguagem ubíqua e diagramas de classes.
- Estrutura do site: `docs/site-map.md`, com mapa de navegação e relação entre entidades e páginas.
- Casos de uso e funcionalidades: `docs/use-cases.md`.
- Decisões: ADRs em `docs/adr/`.

## Fora do escopo

- Agente que executa os fluxos e emula projetos, features e bugs a partir dos fluxos de demanda. Ele é a entrega posterior que mede a qualidade do kit. O conteúdo já nasce estruturado para que agentes possam consumi-lo.
- Contas de usuário, progresso salvo e backend.
