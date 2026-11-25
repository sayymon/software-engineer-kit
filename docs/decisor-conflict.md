# Decisor: dois modelos no mesmo kit

A etapa 1 da migração do guia não altera o Decisor do kit. `lib/decisor.ts`, `content/data/matriz.json`, `tests/decisor.test.ts` e a tabela `matrizTable` de `site/src/render/flow.ts` seguem como estavam. O modelo do guia chega ao kit apenas como dado, dentro do envelope `comum` (`decisor_construir_comprar_assinar`). Este documento compara os dois modelos para que a escolha seja feita com evidência.

## Os dois modelos

| Aspecto | Kit (`lib/decisor.ts` e `content/data/matriz.json`) | Guia (`comum.decisor_construir_comprar_assinar` e `decisor.py`) |
|---|---|---|
| Fonte dos parâmetros | `content/data/matriz.json`, arquivo de dados do kit | `content/guide/comum.yaml`, validado pela definição `Decisor` do schema |
| Opções | Mapa `opcoes` (id para descrição) | Lista `opcoes` (só ids) |
| Critérios | 5: `diferenciacao`, `tempo_ate_valor`, `custo_total`, `dependencia_fornecedor`, `risco` | Os mesmos 5 |
| Escala | `escala.min` 1 e `escala.max` 5, notas inteiras | Mesma escala, notas numéricas aceitas com fração |
| Pesos por objetivo | `cumprir_prazo`, `diferenciar_produto`, `reduzir_custo`, `validar_hipotese` | Idênticos (comparados campo a campo, mesmos valores) |
| Desempate | `ordem_desempate` (assinar, comprar, construir), `tolerancia_empate` 1e-9 lida do arquivo | Mesma ordem, tolerância 1e-9 fixa no código |
| Arredondamento | 10 casas | 6 casas |
| Eixos | `eixos` (7) e `eixo_alimenta_criterio`: o orçamento é um eixo que alimenta `custo_total` | Não existem. O schema (`additionalProperties: false`) rejeita esses campos |
| Orçamento | Eixo de entrada para as notas | Portão `com_dcs_g1` na raia `com_dcs`: "Confirmar se o custo cabe no orçamento previsto". Se não couber, a demanda volta com o relatório de custo (retorno `fora_do_orcamento`) |
| Contexto financeiro | Ausente | Custos de curto, médio e longo prazo, ROI e custo de não fazer entram na justificativa e não mudam a nota |
| Leitura da nota | Campo `leitura_da_nota` no arquivo | Comentário no YAML: nota maior é melhor em todos os critérios |
| Saída | `{ opcao, totais, contribuicoes, pesos }` | `Resultado` com avaliações, empate e justificativa em texto auditável |
| Erros | Classes `ObjetivoDesconhecido`, `CriterioAusente`, `NotaForaDaEscala` | `DecisorError` com mensagem em português |
| Prova | `tests/decisor.test.ts` (totais calculados com o `decisor.py` anterior) | Suíte do oráculo (`tools/guide-oracle/tests/unit/test_decisor.py`) |

Os dois compartilham critérios, escala, pesos e desempate. A diferença está em três pontos: o papel do orçamento (eixo ou portão), a presença do contexto financeiro e a saída com justificativa.

## Dependentes encontrados

Busca por `decisor`, `matriz`, `eixo`, `pontuar_opcoes_matriz` em `lib`, `site/src`, `tests`, `tools`, `content/pt-BR/guides`, `content/pt-BR/stacks`, `content/data` e `schema`.

| Dependente | O que usa |
|---|---|
| `lib/decisor.ts` | Função `decidir` e o tipo `Matriz` (campos `eixos` e `eixo_alimenta_criterio`, linhas 12 e 13). Só `tests/decisor.test.ts` o importa |
| `tests/decisor.test.ts` | Lê `content/data/matriz.json` e confere totais e vencedores dos 4 objetivos |
| `content/data/matriz.json` | Dado do modelo do kit (7 eixos incluídos) |
| `site/src/render/flow.ts` | `matrizTable` (linhas 9 a 30) lê `matriz.json` e o `renderDemand` a mostra na seção `s.matrix` (linha 92). Mostra pesos, opções, leitura da nota e desempate; não mostra eixos |
| `site/src/i18n/pt-BR.json` e `en.json` | Chaves `s.matrix`, `s.matrix.hint` e `s.matrix.tiebreak` (linhas 317 a 319) |
| `lib/flows/index.ts` (linha 187) | Regra `PESOS` lê `decisor_construir_comprar_assinar.pesos` do guia |
| `lib/schema/flows.ts` (linha 24) e `lib/guide/entities.ts` (linhas 60 e 305) | Aceitam e repassam o bloco do guia no envelope `comum` |
| 27 guias práticos em `content/pt-BR/guides/` | Passo `prep.pontuar_opcoes_matriz` ("Pontuar construir, comprar e assinar", notas de 1 a 5 na "matriz"). O id do passo está em `schema/ids-frozen.json` e em `content/ids.lock.json` (27 ocorrências em cada), então não pode mudar nem sumir |
| 15 stacks em `content/pt-BR/stacks/` | Cada stack tem `condicoes.<eixo>` com os mesmos 7 eixos (`CONDICAO_EIXOS` em `lib/schema/stacks.ts`, linha 6, inclui `orcamento`). Não importam o Decisor, mas o modelo de eixos do kit reaparece aí |
| `tools/guide-oracle` | `decisor.py`, o comando `decidir` da CLI e `test_decisor.py` exercitam o modelo do guia |

Nenhum arquivo em `content/pt-BR/stacks/` ou `site/src` (fora do `flow.ts` e do i18n) referencia a função `decidir`.

## Impacto de cada opção

### Opção 1: adotar o modelo do guia

- Portar `decisor.py` para `lib/decisor.ts` (entrada por `comum.decisor_construir_comprar_assinar`, contexto financeiro, justificativa em texto, arredondamento de 6 casas).
- Remover `eixos`, `eixo_alimenta_criterio` e `tolerancia_empate` de `matriz.json`, ou apagar o arquivo e ler o YAML do guia (uma única fonte).
- Reescrever `tests/decisor.test.ts` e `matrizTable` para ler o YAML e mostrar o portão de orçamento e o contexto.
- Manter os ids dos 27 passos `prep.pontuar_opcoes_matriz` (apenas o texto "matriz" pode ganhar referência ao Decisor).
- Os eixos dos 15 stacks continuam como estão (são condições de stack, outro conceito) ou passam por revisão separada.
- Custo estimado: baixo a médio. Ganho: uma fonte, paridade com o oráculo e o orçamento como portão, como o guia modela.

### Opção 2: manter o modelo do kit e remover o orçamento do guia

- O guia precisaria aceitar `eixos` (mudança no schema) ou dispensar o portão `com_dcs_g1`, o que reescreve a raia `com_dcs`, o retorno `fora_do_orcamento` e os playbooks e perguntas que citam o orçamento.
- Quebra a paridade com o oráculo e com os 12 diagramas das demandas.
- Custo estimado: alto, e contraria a decisão da spec do guia (orçamento é gate).

### Opção 3: manter os dois como estão, com papéis distintos

- O kit mantém a matriz como ferramenta de apoio para quem pontua as opções. O guia mantém o Decisor em dados para o fluxo `com_dcs`.
- Sem custo de migração. O risco é a divergência: dois lugares com os mesmos pesos (hoje idênticos) podem se separar, e o orçamento fica com dois significados.
- Mitigação possível: um teste que compara `matriz.json` com o bloco do guia e falha se os pesos, critérios ou o desempate divergirem.

## Pergunta para decidir

Qual modelo deve valer no kit: (1) o do guia, com o orçamento como portão `com_dcs_g1` e o contexto financeiro fora da nota, (2) o do kit, com o orçamento como eixo, ou (3) os dois lado a lado com um teste de consistência? A recomendação técnica é a opção 1, porque a spec do guia já decidiu que o orçamento é um portão e porque ela deixa uma única fonte de pesos. A escolha vale para a etapa 2, e a etapa 1 não depende dela.
