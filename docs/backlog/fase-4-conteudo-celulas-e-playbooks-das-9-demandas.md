# Conteúdo das células e dos playbooks das 9 demandas novas

## Contexto

A Fase 4 da spec do guia calibrou o conteúdo das células (demanda por requisito) e dos playbooks dos nós em três demandas: `feature`, `bug` e `incidente`. O guia hoje tem 12 demandas e 48 células (12 demandas por 4 requisitos). As 9 demandas restantes (`chore`, `seguranca`, `spike`, `divida_tecnica`, `infraestrutura`, `teste_qa`, `documentacao`, `migracao`, `descontinuacao`) seguem sem o checkpoint de calibração e sem resposta sobre o molde de conteúdo.

## Escopo

1. Medir o estado atual: por demanda e por requisito, quantos grupos da célula (perguntas, técnicas, abordagens, padrões, estratégias, categorias de ferramenta) têm conteúdo, e quantos playbooks de nó têm `resumo`, `perguntas_chave`, `fazer` e `evitar`.
2. Confirmar com o autor o molde das três demandas calibradas (tom, profundidade, tamanho) para replicar.
3. Preencher as células e os playbooks das 9 demandas, uma demanda por vez, sempre como rascunho com `publico: false` até a aprovação.
4. Registrar as técnicas, padrões e estratégias que faltam e que o autor usa na prática.
5. Rodar a validação estrita e revisar as páginas geradas.

## Critérios de aceite

- As 48 células têm conteúdo em pelo menos um grupo, e nenhum playbook de nó das 12 demandas está vazio.
- Nenhuma referência de célula ou playbook aponta para id inexistente (`npm run validate` e `validar --estrito` sem erros nem avisos).
- Cada demanda tem uma revisão humana registrada (autor, resultado, ajustes pedidos).
- Os textos seguem as regras do repositório: português, sem travessões, sem termos internos.

## Origem

Spec do guia, `.kiro/specs/guia-decisao-engenharia/tasks.md`, Fase 4 (tarefas 4.1 a 4.12), com o checkpoint 4.12 ("aprovar o conteúdo de cada célula da matriz") ainda aberto para as demandas novas. Relacionado à revisão das demandas regeneradas em `docs/reviews/`.
