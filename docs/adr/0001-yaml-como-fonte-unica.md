# ADR 0001: YAML como fonte única da metodologia

- Status: aceita (etapa 2 concluída: ver "Atualização da etapa 2")
- Escopo: etapa 1 de 3 da migração do guia de engenharia para o kit

## Contexto

O guia de engenharia (fluxos de demanda, raias, tarefas, subtarefas, playbooks, perguntas, ritos, artefatos, papéis e técnicas) nasceu em um repositório próprio, escrito em YAML e validado por um pacote Python (`loader`, `validator`, `mermaid_gen`, `decisor`). O kit já publica o conteúdo, tem o site, o grafo, a busca e o CI. Manter os dois repositórios exigia copiar conteúdo entre eles, e a cópia anterior ficou 11 commits atrás do guia.

A migração anterior convertia o guia em arquivos de catálogo do kit (`content/pt-BR/flows/`). Ela aceitava só seis chaves por demanda, não lia `ritos.yaml` e rejeitava os campos novos (perguntas, subtipo, ambientes). Reexecutá-la não traria o guia atual.

## Decisão

1. Os 15 arquivos YAML do guia, congelados no commit `7abed1c`, vivem no kit em `content/guide/`, copiados byte a byte. Esse YAML é a fonte única da metodologia.
2. O kit deriva uma entidade tipada para cada item do guia na carga (`lib/guide/`). Cada id do guia tem exatamente uma entidade, com página, relações bidirecionais e entrada no grafo. O conteúdo escrito não é copiado para outro arquivo.
3. A toolchain é Node e TypeScript. O Python existiu só como oráculo temporário (`tools/guide-oracle/`, removido na etapa 2), usado para provar que o loader, o validador e o gerador de Mermaid em TypeScript produzem os mesmos resultados.
4. Um único schema, `schema/flows.schema.json` (o schema atual do guia, com outro `$id`), serve ao Ajv em TypeScript (e serviu ao validador Python enquanto ele existiu).
5. O Decisor do kit não mudava na etapa 1. Depois, `lib/decisor.ts` passou a ler o modelo do guia e `content/data/matriz.json` foi removido. A comparação original está em [decisor-conflict.md](../decisor-conflict.md).

## Opções consideradas

| Opção | Resultado |
|---|---|
| A. Um arquivo por entidade em `content/pt-BR/` (cerca de 2.400 arquivos) | Descartada. As tarefas, subtarefas, playbooks, perguntas e nós se referenciam por 2.362 ids. Editar um fluxo exigiria abrir dezenas de arquivos e um compositor entraria no caminho crítico do oráculo. |
| B. YAML canônico em `content/guide/` com entidades derivadas na carga | Escolhida. A cópia byte a byte prova a paridade com `diff -r`, mantém o formato que o Python valida e entrega ao kit uma entidade por id. |
| C. Reestender a migração antiga | Descartada. O mapeamento por chaves não acompanha o schema novo, e cada mudança do guia exigiria nova migração. |
| D. Portar tudo para TypeScript já na etapa 1 | Adiada para a etapa 2. A paridade precisa de uma referência executável, e o Python é essa referência. |
| E. Manter Python como backend definitivo | Descartada. Duas toolchains no CI e no ambiente de quem contribui, sem ganho que justifique. |

## Consequências

- `content/pt-BR/flows/` (10 demandas e 106 arquivos de catálogo) foi removido. Os ids foram preservados e o `content/ids.lock.json` só recebeu acréscimos.
- As páginas de técnica passam de `flows/catalog/<id>` para `fundamentals/techniques/<id>`, na família "Técnicas de engenharia" dos Fundamentos.
- Ids de nós, subtarefas, playbooks, perguntas e células viram âncoras da página que os hospeda. O link `[[id]]` continua válido e aponta para `#id`.
- O papel `seguranca` passa a se chamar `seguranca_papel`, porque `seguranca` é agora também uma demanda (regra do sufixo `_<tipo>` em [content-contract.md](../content-contract.md)).
- Na etapa 1, o CI ganhou o job obrigatório `guide-oracle` (validador estrito e suíte do oráculo) e o Python 3.12. Ambos saíram na etapa 2.
- Na etapa 1, o validador TypeScript cobria 17 dos 44 códigos de regra do validador Python. Hoje cobre os 44. A tabela de paridade está em [guide-rules-parity.md](../guide-rules-parity.md).
- Itens aposentados, com o motivo:
  - Fase 5 do guia (notas atômicas no repositório de notas pessoal): o kit substitui essas notas, e as páginas já listam as relações inversas.
  - Fases 6.1 a 6.3 (verificador de termos e versão pública): o kit já é público e tem o check `terms` com `config/public-terms.txt` no CI.
- Itens que seguem como backlog em `docs/backlog/`: checkpoint 3.12 (Decisor no HTML), Fase 4 (células e playbooks das 9 demandas novas), Fases 6.4 a 6.6 (rascunho do post) e Fase 7 (README do guia).

## Etapas

1. Etapa 1 (esta): guia no kit, schema, loader, entidades derivadas, renderização mínima, oráculo Python, job de CI, documentação e revisão das demandas regeneradas.
2. Etapa 2 (concluída): portar os 27 códigos de regra ausentes e completar os 2 parciais, portar o Decisor, remover `tools/guide-oracle`, o gerador de HTML e o job Python, e trocar o check obrigatório `guide-oracle` pelo conjunto atual.
3. Etapa 3: catálogo único com filtros (ferramentas, IA, stacks, fundamentos, técnicas, artefatos, tarefas), fluxos de demanda antes do catálogo, guias práticos como sugestões dentro de tarefas e subtarefas, e certificações dentro de jornada e competência.
## Atualização da etapa 2
A toolchain do kit é única: Node e TypeScript. Os 44 códigos de regra, o rastreio, o Decisor e a CLI (`npm run guide`) estão em TypeScript. O oráculo Python (`tools/guide-oracle/`), o gerador de HTML e o job `guide-oracle` foram removidos, e o Python deixou de existir no CI e no ambiente de quem contribui.

A paridade com o Python é provada por testes de regressão contra saídas gravadas do oráculo no commit `7abed1c` do repositório do guia, guardadas em `tests/guide/expected/`. Os checks obrigatórios do ruleset passam a ser `build-test`, `dependency-review`, `npm-audit`, `codeql`, `secret-scan`, `public-terms`, `reuse` e `actionlint`. Detalhes em [guide-rules-parity.md](../guide-rules-parity.md).

## Atualização: catálogos em arquivos

O YAML segue como fonte única da metodologia. O `comum.yaml` único foi segmentado em `content/guide/catalogos/*.yaml` (papéis, artefatos, variáveis, técnicas, requisitos, ferramentas, fontes e decisor), e o `comum.yaml` mantém o cabeçalho, `versao` e `ordem_das_demandas`. O loader mescla os arquivos e entrega o mesmo guia, com as mesmas chaves na mesma ordem.

## Atualização da etapa 3

A etapa 3 (catálogo, fluxos e guias práticos) estende o schema do guia, `schema/flows.schema.json`, sem trocar a fonte única:

- `categorias_ferramenta` e `guias_praticos` passam a ser campos opcionais de tarefas e subtarefas (`$defs/Decisao` e `$defs/Subtarefa`). Cada item é um id que resolve para uma categoria de ferramenta ou para uma nota `guia-pratico`. Id que não resolve gera `REF_QUEBRADA`.
- `sem_ferramenta` é um marcador booleano opcional que declara que nenhuma ferramenta se aplica àquela tarefa ou subtarefa. Ele distingue "sem ferramenta aplicável" de "ligação esquecida" na regra de completude `SEM_FERRAMENTA_OU_GUIA`.
- A ligação tarefa para ferramenta e guia vive no Guia_YAML, no fluxo da demanda. Ferramentas, categorias e guias não guardam a lista de tarefas que os usam. A página deles obtém essa lista pelas relações inversas, e os fluxos apontam para a nota sem copiar o conteúdo dela.
- Demandas sem os campos novos seguem válidas. A completude só vale para as demandas listadas em `DEMANDAS_COM_LIGACAO_OBRIGATORIA` (a `feature` primeiro).
- `content/ids.lock.json` só cresce. O teste `tests/ids/lock-vs-main.test.ts` compara o lock atual com o da `main` (ou `origin/main`) e falha se um id de entidade, de guia ou de passo sumir.
