# Decisor: validar pesos e critérios e decidir se o HTML oferece o cálculo

## Contexto

O checkpoint 3.12 da spec do guia ficou aberto: o julgamento humano dos pesos e dos critérios do Decisor "construir, comprar ou assinar" e a decisão sobre a experiência no HTML. (Atualização: `matriz.json` foi removido; a tabela lê o bloco do guia.) O kit mostra hoje uma tabela de pesos (`matrizTable` em `site/src/render/flow.ts`) e não oferece o cálculo na página. Existem dois modelos no repositório (`lib/decisor.ts` com `content/data/matriz.json` e o bloco `decisor_construir_comprar_assinar` do guia). A comparação está em [decisor-conflict.md](../decisor-conflict.md).

## Escopo

1. Escolher o modelo do Decisor (pergunta final de `docs/decisor-conflict.md`).
2. Revisar com o autor os pesos dos 4 objetivos (cumprir prazo, diferenciar produto, reduzir custo, validar hipótese), os 5 critérios, a escala de 1 a 5 e a ordem de desempate (assinar, comprar, construir).
3. Decidir se a justificativa precisa de mais campos (por exemplo, premissas).
4. Decidir se o HTML oferece o Decisor (formulário na página da raia `com_dcs`) ou se a CLI e a tabela bastam.
5. Se o HTML oferecer o cálculo: implementar como ilha (`data-island`) sobre a função TypeScript única, sem enviar JavaScript às demais páginas.

## Critérios de aceite

- Existe uma única fonte de pesos, e um teste falha se qualquer outra cópia divergir.
- A decisão sobre cada pergunta do item 2 está registrada em um ADR curto.
- A tabela da página da demanda mostra o portão de orçamento (`com_dcs_g1`) e o contexto financeiro, se o modelo do guia vencer.
- Se houver cálculo no HTML, o teste de `tests/decisor.test.ts` (ou o sucessor) cobre os 4 objetivos e o desempate com os mesmos totais do oráculo.
- `npm run validate`, `npm test` e `npm run smoke` passam.

## Origem

Spec do guia, `.kiro/specs/guia-decisao-engenharia/tasks.md`, tarefa 3.12 (checkpoint da Fase 3), requisitos 6.4, 6.7 e 7.x. Depende da etapa 2 da migração para a portabilidade do Decisor.
