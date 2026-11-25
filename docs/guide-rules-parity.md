# Paridade das regras do validador do guia

Comparação dos 44 códigos de regra do validador Python (`tools/guide-oracle/src/guia_decisao/validator.py`, cópia do commit `7abed1c`) com o validador TypeScript do kit (`lib/flows/index.ts`, função `checkDoc`, mais `validateAgainstSchema`). Os números de linha referem-se aos arquivos como estão na etapa 1.

Resultado: 40 portados, 0 parciais, 4 ausentes. Os 4 ausentes formam a lista de portabilidade da etapa 2.

Leitura das colunas:

- Tipo: `erro` falha o `validar`, `aviso` só falha com `--estrito`. A classificação segue a função do Python que emite o código (`_checar_avisos` e `_checar_completude` emitem avisos).
- Linha Python: onde o código é emitido em `validator.py`.
- Linha kit: onde o código é emitido em `lib/flows/index.ts`.
- Teste: o teste do kit que prova o código. `sem teste dedicado` significa que o código só é exercitado pelo documento real sem erros. A prova de paridade entre Python e kit para código ausente existe hoje apenas no oráculo (ver abaixo).

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
| `COMUNICACAO_SEM_DESTINATARIO` | aviso | 1019 | ausente | - | - | Comunicação sem `destinatarios` |
| `TIPO_LEGADO` | aviso | 1023 | ausente | - | - | Artefato com tipo fora da taxonomia atual |
| `SUBTIPO_AUSENTE` | aviso | 1026 | ausente | - | - | Tipo que tem subtipos, sem `subtipo` |
| `SUBTIPO_INVALIDO` | aviso | 1029, 1032 | ausente | - | - | Subtipo inexistente no tipo, ou subtipo em tipo que não os tem |
| `PLAYBOOK_SEM_NO` | aviso | 1037 | portado | lib/guide/validate | tests/guide/oracle-defects-perguntas.test.ts | Playbook que nenhum nó usa |
| `LACUNA_DE_DADOS` | aviso | 1045 | portado | lib/guide/validate | tests/guide/oracle-defects-avisos.test.ts | Artefato ou variável sem produtor ou sem consumidor |

## Como o kit é verificado hoje

- `tests/flows/flows.test.ts` valida o documento real contra o schema e as regras de `checkDoc` (zero problemas) e planta defeitos para `TRANSICAO_INVALIDA`, `RETORNOS_INCOMPATIVEIS`, `ORQUESTRADORA`, `REF_QUEBRADA`, `CHAMADA_CICLO` e para uma chave extra no schema.
- `tests/guide/oracle-parity.test.ts` (com `GUIDE_ORACLE_PYTHON` definido) compara o documento carregado e todos os diagramas Mermaid do TypeScript com os do Python. Ele não compara os avisos.
- O job `guide-oracle` roda `validar --estrito` e a suíte do oráculo no CI. Os 27 códigos ausentes seguem protegidos por ele até a etapa 2.
- Códigos sem nenhum teste no oráculo: `APROVA_FORA_DE_GATEWAY`, `APROVA_REDUNDANTE`, `COMUNICACAO_SEM_DESTINATARIO`, `LACUNA_DE_DADOS`, `PERGUNTA_SEM_DEPENDENCIA`, `PERGUNTA_SEM_USO`, `PLAYBOOK_SEM_NO`, `RACI_CONFLITO`, `SEM_PAPEL`, `SUBTIPO_AUSENTE`, `SUBTIPO_INVALIDO` e `TIPO_LEGADO`. A etapa 2 escreve o teste no kit junto com a portabilidade.

## Ordem de portabilidade na etapa 2

Cada passo traz o teste diferencial contra o oráculo (mesmo documento, mesmos códigos e caminhos) e um teste com defeito plantado por código.

1. Concluído: `REF_QUEBRADA` e `ID_DUPLICADO` completos (fontes, ligações, dados, RACI, papéis, perguntas, ritos).
2. Erros estruturais de raias e ligações: `DEMANDA_INCONSISTENTE`, `COR_DUPLICADA`, `LIGACAO_INCONSISTENTE`.
3. Erros de dados e subtarefas: `CONDICAO_INVALIDA`, `CONDICAO_AUSENTE`, `VARIAVEL_ENUM_SEM_VALORES`, `VARIANTE_DUPLICADA`, `SUBTAREFA_EM_NAO_TAREFA`, `SUBTAREFA_ID_PADRAO`.
4. Fluxo de dados (avisos): `VAR_NAO_DECLARADA`, `ENTRADA_SEM_PRODUTOR`, `SAIDA_NAO_ENTREGUE`, `ITEM_SEM_USO`, `TAREFA_SEM_ENTREGAVEL`, `SUBTAREFA_SEM_ENTREGAVEL`, `LACUNA_DE_DADOS`. Depende do rastreio de dados (`rastreio.py`).
5. RACI e papéis (avisos): `SEM_PAPEL`, `RACI_CONFLITO`, `APROVA_FORA_DE_GATEWAY`, `APROVA_REDUNDANTE`.
6. Perguntas e playbooks (avisos): `PERGUNTA_SEM_DEPENDENCIA`, `PERGUNTA_SEM_USO`, `PLAYBOOK_SEM_NO`.
7. Taxonomia (avisos): `COMUNICACAO_SEM_DESTINATARIO`, `TIPO_LEGADO`, `SUBTIPO_AUSENTE`, `SUBTIPO_INVALIDO`. Usa `lib/guide/taxonomia.ts`.
8. Modo estrito e saída da CLI em TypeScript, depois a remoção de `tools/guide-oracle` e a renomeação do check `guide-oracle`.

A ordem põe os erros antes dos avisos porque erros bloqueiam a publicação, e agrupa por dependência de dados para que cada passo reuse o anterior.
