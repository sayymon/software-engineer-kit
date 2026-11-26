# Modelo de domínio

Descreve os contextos delimitados (DDD), a linguagem ubíqua e as entidades do kit. A fonte da verdade dos campos são os schemas Zod em `lib/schema/`. As regras de conteúdo estão em `docs/content-contract.md`.

## Mapa de contextos

O kit tem cinco contextos. Cada um é dono de um conjunto de tipos e referencia os outros apenas por `id`, nunca copiando conteúdo (princípio "um conceito, uma nota, um tipo").

```mermaid
flowchart LR
  subgraph FLX["Fluxos de demanda (núcleo)"]
    direction TB
    dem[demanda] --- raia
    raia --- tarefa
    tarefa --- subtarefa
    tarefa --- playbook
    papel
    rito
    artefato
  end
  subgraph FUN["Fundamentos"]
    direction TB
    tec[tecnica]
    pad[padrao]
    alg[algoritmo]
    eds[estrutura-de-dados]
    lic[licenca]
  end
  subgraph CAT["Catálogo"]
    direction TB
    fer[ferramenta]
    categoria
    mod[modelo]
    emp[empresa]
    stack
    guia[guia-pratico]
  end
  subgraph APR["Aprendizado"]
    direction TB
    jornada
    competencia
    cert[certificacao]
  end
  subgraph DEC["Decisão"]
    direction TB
    decisor["Decisor (construir, comprar, assinar)"]
  end
  FLX -- "playbook cita" --> FUN
  FLX -- "playbook cita categoria" --> CAT
  CAT -- "ferramenta usa" --> FUN
  APR -- "comprova" --> FUN
  APR -- "usa" --> CAT
  DEC -- "avalia" --> CAT
  FLX -- "dispara" --> DEC
```

| Contexto | Responsabilidade | Tipos principais | Fonte |
|---|---|---|---|
| Fluxos de demanda | Dizer o que fazer, quem faz e o que é produzido em cada demanda | `demanda`, `raia`, `tarefa`, `decisao`, `no`, `subtarefa`, `playbook`, `pergunta`, `celula`, `papel`, `rito`, `artefato`, `variavel`, `requisito` | `content/guide/*.yaml` (ADR 0001) |
| Fundamentos | Conceitos reutilizáveis de engenharia | `tecnica`, `padrao`, `algoritmo`, `estrutura-de-dados`, `abordagem`, `estrategia`, `licenca` | `content/pt-BR/fundamentals/` e guia |
| Catálogo | O que existe no mercado e como se combina | `ferramenta`, `categoria`, `caso-de-uso`, `empresa`, `modelo`, `benchmark`, `funcionalidade`, `stack`, `guia-pratico`, `ai` | `content/pt-BR/tools`, `ai`, `stacks`, `guides` |
| Aprendizado | Trilhas e provas de competência | `jornada`, `competencia`, `certificacao` | `content/pt-BR/journeys`, `certifications` |
| Decisão | Pontuar construir, comprar ou assinar, com o orçamento como portão | Decisor, pesos, critérios | `lib/decisor.ts`, bloco `decisor_construir_comprar_assinar` |

### Relações entre contextos

- **Fluxos usam Fundamentos e Catálogo.** O `playbook` aponta para `tecnicas`, `padroes`, `abordagens`, `estrategias` e `categorias_ferramenta`. O fluxo nunca copia o texto da técnica.
- **Catálogo usa Fundamentos.** Uma `ferramenta` referencia `categorias`, `funcionalidades`, `casosDeUso`, `modelos` e `empresa`.
- **Aprendizado depende dos outros.** Uma `competencia` liga `habilidades` (fundamentos) e `certificacoes`. A `jornada` agrupa etapas, certificações e competências.
- **Decisão é um serviço de domínio.** Recebe uma demanda, lê o catálogo e devolve uma justificativa auditável.

## Linguagem ubíqua

| Termo | Significado no kit |
|---|---|
| Demanda | Tipo de trabalho de engenharia (feature, bug, incidente, spike, segurança e as demais). São 12 mais a biblioteca comum |
| Raia | Responsabilidade dentro de uma demanda, como uma raia de diagrama de processo |
| Tarefa e subtarefa | Passo executável de uma raia e seus detalhes |
| Gateway (decisão) | Bifurcação do fluxo. Gateways de qualidade têm `aprova` |
| Papel | Função exercida em uma demanda (PM, Tech Lead, QA e outros). Não é a persona |
| Persona | Quem usa o kit (engenheiro, QA, PM, gerente de engenharia) |
| Rito | Cerimônia recorrente (refinement, planning, review) |
| Playbook | Guia de um nó: resumo, fazer, evitar, perguntas-chave e referências |
| Pergunta-chave | Pergunta que precisa de resposta antes de seguir |
| Artefato | Saída ou entrada de uma tarefa, com `tipo` e `subtipo` de uma lista fechada |
| Célula | Cruzamento de demanda e requisito (funcional ou não funcional) |
| RACI | Responsável (`papel`), apoio, consultado, informado e quem aprova |
| Técnica, abordagem, estratégia, padrão | Fundamentos que o playbook recomenda |
| Ferramenta e categoria | Item do catálogo e o agrupamento dele |
| Stack | Combinação de categorias em slots, com a checklist de setup |
| Guia prático | "Como fazer" passo a passo, ligado às tarefas |
| Jornada e competência | Trilha de aprendizado e a habilidade que ela desenvolve |
| Decisor | Cálculo de construir, comprar ou assinar |
| Wikilink | Referência `[[id]]` resolvida no build |

## Entidades do núcleo (fluxos)

```mermaid
classDiagram
  class Demanda
  class Raia {
    +responsabilidade
    +orquestradora
    +entradas
  }
  class No {
    +condicao
    +proximo
    +raia_chamada
  }
  class Tarefa
  class Decisao
  class Subtarefa
  class Playbook {
    +resumo
    +fazer
    +evitar
  }
  class Pergunta
  class Papel {
    +atuacao_de_agente
  }
  class Rito
  class Artefato {
    +artefato_tipo
    +subtipo
    +destinatarios
  }
  class TipoDeArtefato
  class Variavel
  class Celula
  class Requisito
  Demanda "1" *-- "many" Raia
  Raia "1" *-- "many" No
  No <|-- Tarefa
  No <|-- Decisao
  Tarefa "1" *-- "many" Subtarefa
  No "1" --> "0..1" Playbook
  Playbook --> "many" Pergunta : perguntas_chave
  No --> "many" Artefato : entradas e saidas
  Subtarefa --> "many" Artefato : entradas e saidas
  Artefato --> TipoDeArtefato : tipo
  No --> Papel : papel, apoio, consultado, informado, aprova
  Rito --> Papel
  Decisao --> Variavel : estado
  Demanda "1" *-- "many" Celula
  Celula --> Requisito
```

## Entidades dos demais contextos

```mermaid
classDiagram
  class Ferramenta {
    +precoUSD
    +linguagens
    +plataformas
    +licenca
  }
  class Categoria
  class Empresa
  class Modelo
  class CasoDeUso
  class Funcionalidade
  class Stack
  class GuiaPratico
  class Tecnica
  class Padrao
  class Algoritmo
  class EstruturaDeDados
  class Jornada
  class Competencia
  class Certificacao
  Ferramenta --> "many" Categoria
  Ferramenta --> "0..1" Empresa
  Ferramenta --> "many" Modelo
  Ferramenta --> "many" CasoDeUso
  Ferramenta --> "many" Funcionalidade
  Stack --> "many" Categoria : slots
  Stack --> "many" Ferramenta : recomendadas
  GuiaPratico --> "many" Ferramenta
  Jornada --> "many" Competencia
  Jornada --> "many" Certificacao
  Competencia --> "many" Certificacao
  Competencia --> "many" Tecnica : habilidades
```

## Invariantes do domínio

- Um `id` é único entre todos os tipos, em `snake_case` ascii, e nunca muda (`ids.lock.json`).
- Todo nó tem um `papel`. Só gateways de qualidade têm `aprova`.
- Quem é informado não recebe outra letra do RACI no mesmo item.
- Orçamento é portão do Decisor, não peso do score.
- Preço, benchmark e versão trazem fonte e data. Sem confirmação, o valor é `não verificado`.
- Toda relação é navegável nos dois sentidos (relações inversas calculadas no build).
