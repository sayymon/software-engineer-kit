# Implementation Plan

## Overview

Este plano executa o `design.md` em 13 commits de um único PR, na branch `feat/porte-guia-typescript`, criada a partir da `main`. Cada fase corresponde a um commit em Conventional Commits. Ao fim de cada fase, `npm run validate`, `npm test`, `npm run build`, `npm run smoke` e o teste diferencial (com `GUIDE_ORACLE_PYTHON`) passam, e `docs/guide-rules-parity.md` mostra o status atualizado dos códigos da fase.

Convenções:

- Cada código de regra portado ganha um defeito plantado em `tests/guide/defeitos/<CODIGO>.ts` e entra no teste diferencial.
- Mensagens são portadas literalmente do Python.
- Nenhuma tarefa altera o conteúdo do guia em `content/guide/`. Se uma regra portada acusar problema no documento real, a tarefa para e pede decisão ao dono (Requisito 7.5).

## Tasks

### Fase 0: harness diferencial

- [x] 0.1 Criar `lib/guide/validate/` com o tipo `Problema`, `OpcoesValidacao`, `caminho.ts` (caminho, item id e normalização de datas) e `validateGuide` na ordem do Python
  - mover as regras de `lib/flows/index.ts` para os arquivos do módulo, sem mudar comportamento
  - `lib/flows` reexporta `checkDoc` a partir do módulo novo
  - _Requisitos: 1.1, 1.7_
- [x] 0.2 Adicionar o modo `--issues` a `tools/guide-oracle/dump_doc.py` (documento JSON pela entrada padrão, lista de `Issue` em JSON na saída) e registrar em `tools/guide-oracle/PATCHES.md`
  - _Requisitos: 1.2_
- [x] 0.3 Criar `tests/guide/oracle-rules.test.ts` com a comparação pela chave `(code, nivel, path, itemId)` e o relatório de diferenças dos dois lados
  - documento real com `avisos` e `completude` ligados e desligados
  - _Requisitos: 1.2, 2.5_
- [x] 0.4 Fazer o job `guide-oracle` instalar Node além do Python e rodar o teste diferencial com `GUIDE_ORACLE_PYTHON`
  - _Requisitos: 2.4, 2.5_
- [x] 0.5 Commit `test(guia): harness diferencial contra o oráculo`
  - _Requisitos: 2.1_

### Fase 1: parciais

- [x] 1.1 Completar `REF_QUEBRADA` (fontes e itens, `fonte_ids`, ligações, dados e RACI) e `ID_DUPLICADO` (papéis, perguntas, ritos)
  - um defeito plantado por caminho de origem
  - _Requisitos: 1.1, 1.3, 1.4_
- [x] 1.2 Atualizar `docs/guide-rules-parity.md` e fazer o commit `feat(guia): completa REF_QUEBRADA e ID_DUPLICADO`
  - _Requisitos: 2.3_

### Fase 2: erros estruturais

- [x] 2.1 Portar `DEMANDA_INCONSISTENTE`, `COR_DUPLICADA` (inclui bibliotecas chamadas) e `LIGACAO_INCONSISTENTE`, com defeitos plantados
  - _Requisitos: 1.1, 1.3, 1.4_
- [x] 2.2 Atualizar a paridade e fazer o commit `feat(guia): regras estruturais de raias e ligações`
  - _Requisitos: 2.3_

### Fase 3: erros de dados e subtarefas

- [x] 3.1 Portar `CONDICAO_INVALIDA`, `CONDICAO_AUSENTE`, `VARIAVEL_ENUM_SEM_VALORES`, `VARIANTE_DUPLICADA`, `SUBTAREFA_EM_NAO_TAREFA` e `SUBTAREFA_ID_PADRAO` em `dados.ts`, com defeitos plantados
  - _Requisitos: 1.1, 1.3, 1.4_
- [x] 3.2 Atualizar a paridade e fazer o commit `feat(guia): regras de dados e subtarefas`
  - _Requisitos: 2.3_

### Fase 4: rastreio e fluxo de dados

- [x] 4.1 Portar `rastreio.py` para `lib/guide/rastreio.ts` (`rastrearDados`, `descreverCondicao`, `usosEmCondicoes`, `lacunasDeDados`)
  - teste diferencial do rastreio contra o Python no documento real
  - _Requisitos: 3.1, 3.2_
- [x] 4.2 Portar `VAR_NAO_DECLARADA`, `ENTRADA_SEM_PRODUTOR`, `SAIDA_NAO_ENTREGUE`, `ITEM_SEM_USO`, `TAREFA_SEM_ENTREGAVEL`, `SUBTAREFA_SEM_ENTREGAVEL` e `LACUNA_DE_DADOS`, usando o rastreio
  - _Requisitos: 1.1, 1.3, 1.4, 3.5_
- [x] 4.3 Atualizar a paridade e fazer o commit `feat(guia): rastreio de dados e avisos de fluxo de dados`
  - _Requisitos: 2.3_

### Fase 5: RACI e papéis

- [x] 5.1 Portar `SEM_PAPEL`, `RACI_CONFLITO`, `APROVA_FORA_DE_GATEWAY` e `APROVA_REDUNDANTE` em `raci.ts`, com defeitos plantados (inclui os códigos sem teste no oráculo)
  - _Requisitos: 1.1, 1.3, 1.4_
- [x] 5.2 Atualizar a paridade e fazer o commit `feat(guia): avisos de RACI e papéis`
  - _Requisitos: 2.3_

### Fase 6: perguntas e playbooks

- [x] 6.1 Portar `PERGUNTA_SEM_DEPENDENCIA`, `PERGUNTA_SEM_USO` e `PLAYBOOK_SEM_NO` em `perguntas.ts`, com defeitos plantados
  - _Requisitos: 1.1, 1.3, 1.4_
- [x] 6.2 Atualizar a paridade e fazer o commit `feat(guia): avisos de perguntas e playbooks`
  - _Requisitos: 2.3_

### Fase 7: taxonomia e modo estrito

- [x] 7.1 Portar `COMUNICACAO_SEM_DESTINATARIO`, `TIPO_LEGADO`, `SUBTIPO_AUSENTE` e `SUBTIPO_INVALIDO` em `taxonomia.ts`, usando `lib/guide/taxonomia.ts`
  - _Requisitos: 1.1, 1.3, 1.4_
- [x] 7.2 Ligar `avisos` e `completude` em `tools/validate/checks/flows.ts`, para que `npm run validate` seja estrito
  - _Requisitos: 1.5, 1.6_
- [x] 7.3 Confirmar que os 44 códigos estão `portado` em `docs/guide-rules-parity.md` e fazer o commit `feat(guia): avisos de taxonomia e validação estrita`
  - _Requisitos: 1.1, 2.3_

### Fase 8: Decisor no modelo do guia

- [x] 8.1 Reescrever `lib/decisor.ts` com `configDoGuia`, `decidir`, `DecisorError` e `contextoEmTexto`, com arredondamento de 6 casas e desempate do guia
  - teste diferencial contra `decisor.py` nos 4 objetivos e em casos de empate
  - _Requisitos: 4.1, 4.2, 4.3, 4.4_
- [x] 8.2 Provar a neutralidade do contexto financeiro e a ausência do orçamento como critério
  - _Requisitos: 4.5, 4.6, 4.7_
- [x] 8.3 Remover `content/data/matriz.json` e reescrever `matrizTable` em `site/src/render/flow.ts` para ler o guia e mostrar o portão de orçamento e o contexto financeiro, com as chaves de i18n em pt-BR e en
  - _Requisitos: 4.8, 4.10_
- [x] 8.4 Confirmar que os 27 ids `prep.pontuar_opcoes_matriz` continuam em `content/ids.lock.json` e fazer o commit `feat(guia): decisor no modelo do guia`
  - _Requisitos: 4.9, 7.2_

### Fase 9: comando de linha

- [x] 9.1 Criar `tools/guide/cli.ts` com `validar`, `rastrear` e `decidir`, o script `guide` no `package.json` e os códigos de saída 0, 1 e 2
  - `rastrear <id>` mostra só o item pedido, e `--json` em todos os subcomandos
  - _Requisitos: 3.3, 3.4_
- [x] 9.2 Testar a CLI (saída de texto igual ao formato do Python, códigos de saída) e documentar no `README.pt-BR.md` e no `README.en.md`. Commit `feat(guia): comando de linha do guia`
  - _Requisitos: 3.3, 5.6_

### Fase 10: propriedades em fast-check

- [x] 10.1 Portar `strategies.py` para `tests/guide/properties/geradores.ts`
  - _Requisitos: 5.4_
- [x] 10.2 Portar as 32 propriedades de `tests/properties/` e acrescentar as propriedades 3, 4, 5 e 8 do design
  - _Requisitos: 5.4_
- [x] 10.3 Fazer o commit `test(guia): propriedades em fast-check`
  - _Requisitos: 2.1_

### Fase 11: testes de navegador

- [x] 11.1 Escrever `docs/guide-browser-tests.md` com o comportamento de cada `cdp_*.mjs` e se ele existe no site
  - _Requisitos: 6.1_
- [x] 11.2 Criar testes Playwright contra o build para os comportamentos que já existem e registrar os demais como critério de aceite da etapa 3. Commit `test(guia): mapa dos testes de navegador`
  - _Requisitos: 6.2, 6.3_

### Fase 12: remoção do oráculo

- [x] 12.1 Gravar em `tests/guide/expected/` a saída do oráculo para o documento real, para cada defeito plantado, para o rastreio e para os casos do Decisor, e trocar os testes diferenciais por testes de regressão contra esses arquivos
  - _Requisitos: 5.3_
- [x] 12.2 Remover `tools/guide-oracle/`, o job `guide-oracle` e as anotações REUSE dele, e ajustar `tools/github/apply-settings.sh` para o novo conjunto de checks obrigatórios
  - _Requisitos: 5.1, 5.2_
- [x] 12.3 Atualizar `docs/guide-rules-parity.md`, `docs/architecture.md`, ADR 0001, os READMEs e o `CONTRIBUTING.md` para a toolchain única
  - _Requisitos: 5.6_
- [x] 12.4 Rodar todas as verificações num clone limpo sem `private/`, sem Python instalado, e fazer o commit `chore(guia): remove o oráculo Python`
  - _Requisitos: 5.5, 7.3, 7.4_

### Fase 13: PR e governança

- [~] 13.1 Abrir o PR único, aguardar todos os checks obrigatórios e pedir a aprovação do dono
  - _Requisitos: 7.1, 7.5_
- [~] 13.2 Depois do merge, aplicar no ruleset da `main` a troca do check `guide-oracle` e registrar a mudança em `docs/governance.md`
  - _Requisitos: 5.2_

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["0.1", "0.2"] },
    { "id": 1, "tasks": ["0.3", "0.4"] },
    { "id": 2, "tasks": ["0.5"] },
    { "id": 3, "tasks": ["1.1"], "note": "fases 1 a 7 seguem em sequência porque cada commit agrupa um grupo de regras" },
    { "id": 4, "tasks": ["1.2"] },
    { "id": 5, "tasks": ["2.1"] },
    { "id": 6, "tasks": ["2.2"] },
    { "id": 7, "tasks": ["3.1"] },
    { "id": 8, "tasks": ["3.2"] },
    { "id": 9, "tasks": ["4.1"] },
    { "id": 10, "tasks": ["4.2"] },
    { "id": 11, "tasks": ["4.3"] },
    { "id": 12, "tasks": ["5.1"] },
    { "id": 13, "tasks": ["5.2"] },
    { "id": 14, "tasks": ["6.1"] },
    { "id": 15, "tasks": ["6.2"] },
    { "id": 16, "tasks": ["7.1"] },
    { "id": 17, "tasks": ["7.2"] },
    { "id": 18, "tasks": ["7.3"] },
    { "id": 19, "tasks": ["8.1", "11.1"], "note": "o Decisor e o mapa de navegador não dependem das regras do validador" },
    { "id": 20, "tasks": ["8.2", "8.3"] },
    { "id": 21, "tasks": ["8.4"] },
    { "id": 22, "tasks": ["9.1", "10.1"] },
    { "id": 23, "tasks": ["9.2", "10.2"] },
    { "id": 24, "tasks": ["10.3", "11.2"] },
    { "id": 25, "tasks": ["12.1"] },
    { "id": 26, "tasks": ["12.2", "12.3"] },
    { "id": 27, "tasks": ["12.4"] },
    { "id": 28, "tasks": ["13.1"] },
    { "id": 29, "tasks": ["13.2"] }
  ]
}
```

## Notes

- **Ordem dos commits:** os commits seguem a ordem das fases, mesmo quando as tarefas de fases diferentes rodam na mesma onda. Exemplo: o commit da fase 8 entra antes do commit da fase 11.
- **Ponto de parada:** se qualquer regra portada acusar problema no documento real, a execução pausa e pede decisão ao dono antes de seguir (Requisito 7.5).
- **Teste diferencial local:** exige um Python com `tools/guide-oracle/requirements.txt` e a variável `GUIDE_ORACLE_PYTHON`. Sem ela, os testes diferenciais são pulados localmente, mas o job `guide-oracle` sempre os roda até a fase 12.
- **Node:** a execução usa Node 22.23.4 ou superior.
- **Fora do escopo:** stacks continuam com `condicoes.orcamento` como condição de adoção, que é outro conceito. A revisão desse campo fica para a etapa 3.
