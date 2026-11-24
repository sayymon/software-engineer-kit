---
id: hub_ai_tools
tipo: hub
nome: Mapa de Ferramentas de IA
tags:
  - conhecimento
  - ia
  - ferramentas
  - mapa
camada: ai
ordem: 8
---
# Mapa de Ferramentas de IA

Hub de navegação para escolher a ferramenta e o modelo de IA certos a partir de uma necessidade (caso de uso), considerando custo, funcionalidades, especificações, compatibilidade e restrições. O mapa é um grafo de notas atômicas: cada categoria, funcionalidade, caso de uso e modelo tem a própria nota, e cada ferramenta (seguindo o Template-Ferramenta) aponta para elas por wikilinks no front matter. As consultas Dataview abaixo leem esses campos e montam as visões; nada é mantido à mão.

Ferramentas que não são de IA: [[hub_tools|Mapa de Ferramentas de Engenharia]]. Casos de uso de IA por setor e por capacidade: Casos de Uso de IA. Fundamentos de aprendizado de máquina: Modelos de IA.

## Como ler o mapa

- Uma ferramenta pode estar em várias categorias e ter várias funcionalidades.
- Um caso de uso pode exigir mais de uma funcionalidade e ser atendido por mais de uma ferramenta ou modelo.
- Cada modelo tem uma nota atômica. A ferramenta lista no campo `modelos` os modelos que expõe, e o campo `ferramentas` do modelo é o espelho (simetria).
- As notas de categoria, funcionalidade, caso de uso e modelo trazem consultas Dataview reversas (`contains(campo, this.file.link)`), então a navegação funciona nos dois sentidos.
- Os campos de classificação são listas de wikilinks entre aspas, por exemplo `casosDeUso: ["[[Programação em par]]"]`. O título da nota é a grafia que vale.

## Notas atômicas

- **Categorias** (20): pasta `Categorias`. Modelo de nota: Template-Categoria-AI.
- **Funcionalidades** (36): pasta `Funcionalidades`. Modelo de nota: Template-Funcionalidade-AI.
- **Casos de uso** (32): pasta `Casos de Uso`. Modelo de nota: Template-Caso-de-Uso-AI.
- **Modelos**: pasta `Modelos`. Modelo de nota: Template-Modelo-AI.
- **Benchmarks** (27): pasta `Benchmarks`. Modelo de nota: Template-Benchmark-AI. Cada nota explica o que o teste mede, método, limitações, saturação e traz as pontuações dos modelos com fonte e data.
- **Empresas**: pasta `Empresas`. Modelo de nota: Template-Empresa. Cada modelo e ferramenta aponta para a empresa pelo campo `empresa`.

## Campos controlados do front matter da ferramenta

### Modelo de contratação (`modeloContratacao`)

Enum fechado: `free`, `subscription`, `per-seat`, `api-pay-per-token`, `open-source`, `enterprise`.

### Plataformas (`plataformas`)

Onde a ferramenta roda ou como se acessa: `web`, `android`, `ios`, `windows`, `macos`, `linux`, `cli`, `api`, `vscode`, `jetbrains`, `extensao-navegador`, `self-hosted`, `cloud`, `desktop`, `carro`, `casa`, `wearable`. Linguagens saem de `plataformas` e vão para `linguagens`.

### Linguagens (`linguagens`)

`python`, `javascript`, `typescript`, `java`, `kotlin`, `go`, `rust`, `csharp`, `php`, `ruby`, `swift`, `dart`, `sql`, `agnostica`.

### Porte (`porte`)

`pessoa-fisica`, `pequena`, `media`, `grande`.

### Segmentos (`segmentos`)

`geral`, `varejo-ecommerce`, `financeiro-fintech`, `saude`, `educacao`, `servicos-profissionais`, `alimentacao`, `industria`, `logistica`, `agro`, `imobiliario-construcao`, `marketing-agencias`, `midia-criadores`, `software-saas`, `setor-publico`, `turismo-hotelaria`, `desenvolvimento-software`, `dados-analytics`, `design-criativo`, `devops-infra`, `seguranca`, `escritorio-produtividade`, `pesquisa-conhecimento`. Vocabulário completo e demais campos em [[hub_tools|Mapa de Ferramentas de Engenharia]].

### Restrições (`restricoes`)

O campo `restricoes` é uma lista livre de strings curtas, não vocabulário controlado. Exemplos: "context 200k tokens", "treina com dados no plano free", "sem modo offline", "uso comercial sob ToS".

## Consultas

### Por caso de uso (caso de uso para ferramentas)

Visão principal do mapa: dada uma necessidade, quais ferramentas atendem.

## Catálogo de modelos

Preços em USD por 1M de tokens. O valor "não verificado" indica preço que a página oficial não confirmou (a nota do modelo explica o motivo).

## Matriz caso de uso para ferramentas e modelos

Cada caso de uso lista as funcionalidades necessárias, as ferramentas e modelos recomendados e o critério de desempate padrão.

### Critérios de desempate

Quando duas ou mais opções atendem o mesmo caso de uso, cada caso de uso declara em `criteriosDesempate` a ordem de decisão e em `criterioPadrao` o critério que vale primeiro:

| critério | pergunta que ele responde |
|---|---|
| `custo` | Qual opção entrega a funcionalidade necessária com o menor custo total (assinatura, tokens, infraestrutura)? |
| `privacidade-de-dados` | Qual opção mantém os dados sob seu controle (self-hosted, contratos de não treinamento, residência de dados)? |
| `lock-in` | Qual opção permite trocar de fornecedor depois com menor esforço (padrões abertos, pesos abertos, MCP)? |

## Benchmarks
Visão dos testes que medem os modelos. A pontuação de cada modelo fica na nota do benchmark (campo `resultados`) e o modelo lista os benchmarks no campo `benchmarks`.

## Relacionamentos

- **Guias práticos:** [[hub_guides|Mapa de Guias Práticos]]
- **Stacks:** [[hub_stacks|Mapa de Stacks de Engenharia]]
- **Conceito base:** [[hub_ai|Inteligência Artificial]]
- **Casos de uso:** Casos de Uso de IA
- **Modelos de aprendizado:** Modelos de IA
- **Template das ferramentas:** Template-Ferramenta
- **Templates atômicos:** Template-Modelo-AI, Template-Caso-de-Uso-AI, Template-Funcionalidade-AI, Template-Categoria-AI

[[hub_ai|Voltar para Inteligência Artificial]]
