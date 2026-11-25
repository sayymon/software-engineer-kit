# Paridade das regras do validador do guia

Comparação dos 44 códigos de regra do validador Python original (`validator.py`, commit `7abed1c` do repositório do guia, removido do kit) com o validador TypeScript do kit (`lib/guide/validate/`, mais `validateAgainstSchema`). As colunas de linha referem-se aos arquivos como estavam na etapa 1. A coluna "Linha kit" aponta para `lib/flows/index.ts` quando o código nasceu lá, e para `lib/guide/validate` quando foi portado depois.

Resultado: 44 portados, 0 parciais, 0 ausentes. A portabilidade da etapa 2 está completa.

Leitura das colunas:

- Tipo: `erro` falha o `validar`, `aviso` só falha com `--estrito`. A classificação segue a função do Python que emite o código (`_checar_avisos` e `_checar_completude` emitem avisos).
- Linha Python: onde o código é emitido em `validator.py`.
- Linha kit: onde o código é emitido em `lib/flows/index.ts`.
- Teste: o teste do kit que prova o código. `sem teste dedicado` significa que o código só é exercitado pelo documento real sem erros. A paridade com o Python é provada pelas saídas gravadas (ver abaixo).

| Código | Tipo | Linha Python | Status | Linha kit | Teste | Regra |
|---|---|---|---|---|---|---|
| `SCHEMA` | erro | 127 | portado | 22 | tests/flows/flows.test.ts:57 | Documento fora do JSON Schema |
| `ID_DUPLICADO` | erro | 141, 164, 175, 678, 752 | portado | lib/guide/validate/dados.ts, rules.ts | tests/guide/oracle-defects-refs.test.ts | Id repetido nas 11 coleções, artefatos, variáveis (id compartilhado), subtarefas, papéis, perguntas e ritos |
| `ID_PADRAO` | erro | 443, 450 | portado | 178, 183 | tests/flows/flows.test.ts:14 (documento real sem erros), sem teste dedicado | Id de raia sem a sigla da demanda, id de nó fora da forma `<raia>_<letra><n>` |
| `TRANSICAO_INVALIDA` | erro | 191 | portado | 66 | tests/flows/flows.test.ts:29 | `proximo.para` aponta para id inexistente |
| `BIFURCACAO_SAIDAS` | erro | 206 | portado | 68 | tests/flows/flows.test.ts:14 (documento real sem erros), sem teste dedicado | Bifurcação com menos de 2 saídas |
| `ORFA` | erro | 243 | portado | 89 | tests/flows/flows.test.ts:14 (documento real sem erros), sem teste dedicado | Nó inalcançável a partir do início da raia |
| `RAIA_SEM_INICIO` | erro | 291 | portado | 99 | tests/flows/flows.test.ts:14 (documento real sem erros), sem teste dedicado | Raia sem nó `inicio` |
| `RAIA_INICIO_MULTIPLO` | erro | 294 | portado | 100 | tests/flows/flows.test.ts:14 (documento real sem erros), sem teste dedicado | Raia com mais de um `inicio` |
| `RAIA_SEM_FIM` | erro | 299, 305, 308 | portado | 102, 105, 106 | tests/flows/flows.test.ts:14 (documento real sem erros), sem teste dedicado | Raia sem `fim`, `fim` sem `retorno` ou retorno repetido na raia |
| `TRANSICAO_ENTRE_RAIAS` | erro | 322 | portado | 114 | tests/flows/flows.test.ts:14 (documento real sem erros), sem teste dedicado | `proximo` aponta para nó de outra raia (só `chamada` liga raias) |
| `CHAMADA_INVALIDA` | erro | 334, 338, 346, 349 | portado | 125, 128, 132, 134 | tests/flows/flows.test.ts:14 (documento real sem erros), sem teste dedicado | `raia_chamada` em nó que não é chamada, chamada sem `raia_chamada`, chamada à própria raia ou a raia de outra demanda que não é biblioteca |
| `RETORNOS_INCOMPATIVEIS` | erro | 370 | portado | 143 | tests/flows/flows.test.ts:34 | Saídas da chamada diferem dos retornos da raia chamada |
| `CHAMADA_CICLO` | erro | 387 | portado | 158 | tests/flows/flows.test.ts:40 | Raia que alcança a si mesma por chamadas |
| `ORQUESTRADORA` | erro | 400, 405, 409 | portado | 166, 167, 168 | tests/flows/flows.test.ts:40 | Raia de biblioteca orquestradora, ou demanda sem ou com mais de uma raia orquestradora |
| `RAIA_ORFA` | erro | 415 | portado | 171 | tests/flows/flows.test.ts:14 (documento real sem erros), sem teste dedicado | Raia não orquestradora que nenhuma raia chama |
| `DEMANDA_INCONSISTENTE` | erro | 280 | portado | lib/guide/validate | tests/guide/oracle-defects-structure.test.ts | Nó declara uma demanda diferente da demanda da sua raia |
| `COR_DUPLICADA` | erro | 432 | portado | lib/guide/validate | tests/guide/oracle-defects-structure.test.ts | Cor repetida entre raias do mesmo diagrama (inclui bibliotecas chamadas) |
| `PESOS` | erro | 464 | portado | 190 | tests/flows/flows.test.ts:14 (documento real sem erros), sem teste dedicado | Pesos do Decisor de um objetivo que não somam 1 |
| `REF_QUEBRADA` | erro | 480, 556, 566, 673 | portado | lib/guide/validate/dados.ts, rules.ts | tests/guide/oracle-defects-refs.test.ts | Referência a id inexistente em raias, nós, células, playbooks, `fontes[].itens`, `fonte_ids`, ligações, dados, papéis e RACI. Os casos de `quando` cobrem só a variável ausente; o resto fica com `CONDICAO_INVALIDA` (passo 3) |
| `LIGACAO_INCONSISTENTE` | erro | 575, 589 | portado | lib/guide/validate | tests/guide/oracle-defects-structure.test.ts | Ligação para a própria demanda, ou para nó de demanda diferente da demanda de destino |
| `CONDICAO_INVALIDA` | erro | 619 | portado | lib/guide/validate | tests/guide/oracle-defects-dados.test.ts | Condição `quando` malformada (operador ou variável) |
| `VARIAVEL_ENUM_SEM_VALORES` | erro | 669 | portado | lib/guide/validate | tests/guide/oracle-defects-dados.test.ts | Variável `enum` sem `valores` |
| `SUBTAREFA_EM_NAO_TAREFA` | erro | 702 | portado | lib/guide/validate | tests/guide/oracle-defects-dados.test.ts | Subtarefas em nó que não é `tarefa` |
| `SUBTAREFA_ID_PADRAO` | erro | 713 | portado | lib/guide/validate | tests/guide/oracle-defects-dados.test.ts | Id de subtarefa fora da forma `<nó>_st<n>` |
| `CONDICAO_AUSENTE` | erro | 738 | portado | lib/guide/validate | tests/guide/oracle-defects-dados.test.ts | Uso condicional de técnica sem `quando` |
| `VARIANTE_DUPLICADA` | erro | 800 | portado | lib/guide/validate | tests/guide/oracle-defects-dados.test.ts | Nome de variante repetido no artefato |
| `VAR_NAO_DECLARADA` | aviso | 823 | portado | lib/guide/validate | tests/guide/oracle-defects-avisos.test.ts | Chave de `estado` que não existe em `variaveis` |
| `ENTRADA_SEM_PRODUTOR` | aviso | 874, 883 | portado | lib/guide/validate | tests/guide/oracle-defects-avisos.test.ts | Entrada que nem a raia nem um nó ou subtarefa anterior produz |
| `SAIDA_NAO_ENTREGUE` | aviso | 890 | portado | lib/guide/validate | tests/guide/oracle-defects-avisos.test.ts | Saída de tarefa que nenhuma subtarefa produz |
| `ITEM_SEM_USO` | aviso | 921 | portado | lib/guide/validate | tests/guide/oracle-defects-avisos.test.ts | Artefato ou variável que nada referencia |
| `TAREFA_SEM_ENTREGAVEL` | aviso | 939 | portado | lib/guide/validate | tests/guide/oracle-defects-avisos.test.ts | Tarefa sem artefato em `saidas` |
| `SUBTAREFA_SEM_ENTREGAVEL` | aviso | 945 | portado | lib/guide/validate | tests/guide/oracle-defects-avisos.test.ts | Subtarefa sem artefato em `saidas` |
| `SEM_PAPEL` | aviso | 954, 956, 959, 985 | portado | lib/guide/validate | tests/guide/oracle-defects-raci.test.ts | Tarefa, gateway, subtarefa ou rito sem `papel` |
| `RACI_CONFLITO` | aviso | 968, 970, 972 | portado | lib/guide/validate | tests/guide/oracle-defects-raci.test.ts | Papel que aprova e apoia, é responsável e consultado, ou informado com outra letra |
| `PERGUNTA_SEM_DEPENDENCIA` | aviso | 979 | portado | lib/guide/validate | tests/guide/oracle-defects-perguntas.test.ts | Pergunta sem `depende_de` |
| `PERGUNTA_SEM_USO` | aviso | 981 | portado | lib/guide/validate | tests/guide/oracle-defects-perguntas.test.ts | Pergunta que nenhum playbook ou rito cita |
| `APROVA_FORA_DE_GATEWAY` | aviso | 991 | portado | lib/guide/validate | tests/guide/oracle-defects-raci.test.ts | `aprova` em nó que não é gateway de qualidade |
| `APROVA_REDUNDANTE` | aviso | 994 | portado | lib/guide/validate | tests/guide/oracle-defects-raci.test.ts | `aprova` igual ao papel que já decide o gateway |
| `COMUNICACAO_SEM_DESTINATARIO` | aviso | 1019 | portado | lib/guide/validate | tests/guide/oracle-defects-taxonomia.test.ts | Comunicação sem `destinatarios` |
| `TIPO_LEGADO` | aviso | 1023 | portado | lib/guide/validate | tests/guide/oracle-defects-taxonomia.test.ts | Artefato com tipo fora da taxonomia atual |
| `SUBTIPO_AUSENTE` | aviso | 1026 | portado | lib/guide/validate | tests/guide/oracle-defects-taxonomia.test.ts | Tipo que tem subtipos, sem `subtipo` |
| `SUBTIPO_INVALIDO` | aviso | 1029, 1032 | portado | lib/guide/validate | tests/guide/oracle-defects-taxonomia.test.ts | Subtipo inexistente no tipo, ou subtipo em tipo que não os tem |
| `PLAYBOOK_SEM_NO` | aviso | 1037 | portado | lib/guide/validate | tests/guide/oracle-defects-perguntas.test.ts | Playbook que nenhum nó usa |
| `LACUNA_DE_DADOS` | aviso | 1045 | portado | lib/guide/validate | tests/guide/oracle-defects-avisos.test.ts | Artefato ou variável sem produtor ou sem consumidor |

## Como o kit é verificado

A toolchain é única (Node e TypeScript). A prova de paridade com o validador Python original é feita por testes de regressão contra saídas gravadas em `tests/guide/expected/`, registradas uma vez a partir do oráculo no commit `7abed1c` do repositório do guia. O oráculo (`tools/guide-oracle/`) e o job `guide-oracle` foram removidos.

- `tests/guide/oracle-rules.test.ts` compara, por inteiro e em ordem, os problemas do documento real (`rules-real.json`, com `avisos` e `completude` ligados e desligados) e dos defeitos estruturais plantados (`rules-planted.json`).
- `tests/guide/oracle-defects-*.test.ts` plantam um defeito por caminho de origem de cada código e comparam com `defects-*.json`.
- `tests/guide/oracle-rastreio.test.ts`, `tests/guide/oracle-decisor.test.ts` e `tests/guide/cli.test.ts` fazem o mesmo para o rastreio, o Decisor e a saída da CLI (`rastreio.json`, `decisor.json`, `cli-validar.json`).
- `tests/guide/oracle-parity.test.ts` compara o documento carregado (por hash de cada coleção) e todos os diagramas Mermaid com `parity.json`. `tests/mermaid-parity` compara os diagramas byte a byte com os goldens em `tests/fixtures/mermaid`.
- `tests/flows/flows.test.ts` valida o documento real contra o schema e as regras de `checkDoc`.
- `npm run validate` roda o validador no modo estrito (`avisos` e `completude` ligados).

Os arquivos de `tests/guide/expected/` são a fonte de verdade. Regenere um deles só de propósito, à mão, depois de revisar a mudança de comportamento.

## Histórico da ordem de portabilidade

A etapa 2 portou os códigos em oito passos, cada um com um defeito plantado por código e a comparação com o oráculo: (1) `REF_QUEBRADA` e `ID_DUPLICADO` completos; (2) erros estruturais de raias e ligações; (3) erros de dados e subtarefas; (4) fluxo de dados, sobre o rastreio de `lib/guide/rastreio.ts`; (5) RACI e papéis; (6) perguntas e playbooks; (7) taxonomia, sobre `lib/guide/taxonomia.ts`; (8) modo estrito, CLI em TypeScript e remoção do oráculo. A ordem pôs os erros antes dos avisos porque erros bloqueiam a publicação.
