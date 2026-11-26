# Requirements Document

## Introduction

Esta spec cobre a etapa 2 de 3 da migração do guia de engenharia para o kit. A etapa 1 (PR #7) trouxe o YAML do guia para `content/guide/` como fonte única e manteve o validador Python como oráculo temporário em `tools/guide-oracle/`, rodando no job de CI `guide-oracle`. Hoje 15 das 44 regras do validador estão portadas para TypeScript, 2 estão parciais e 27 existem só no Python (`docs/guide-rules-parity.md`).

O objetivo desta etapa é ter uma única toolchain (Node e TypeScript) que valida, rastreia e decide sobre o guia com o mesmo resultado do oráculo, para então remover o Python. A estratégia é Strangler Fig: cada regra portada é provada por um teste diferencial contra o oráculo sobre o mesmo documento real, e o oráculo só sai quando a paridade for total.

Decisões já tomadas pelo dono do projeto:

- O modelo do Decisor que vale é o do guia: orçamento é um portão (`com_dcs_g1`) e o contexto financeiro (custos por prazo, ROI, custo de não fazer) entra na justificativa sem mudar a nota (`docs/decisor-conflict.md`, opção 1).
- O rastreio de dados (`rastreio.py`) continua como ferramenta do projeto, para rastrear com precisão os recursos que o oráculo cobre.
- A auditoria de cobertura de notas do cofre de notas (`audit.py`, `regras_cobertura.py`) foi descartada e fica fora.

A visão de produto (kit dinâmico, imersivo e navegável, com tudo clicável e diagramas interativos) é requisito do produto inteiro e fica na spec da etapa 3 e no steering de produto. Esta etapa não muda a experiência do site.

Fora de escopo: a nova arquitetura de informação do site (catálogo único, ordem do menu, guias práticos dentro das tarefas, certificações em jornadas, grafo 3D), que é a etapa 3, e os achados de conteúdo de `docs/reviews/guia-demandas-review.md`, que são decisões editoriais.

## Glossary

- **Guia**: conjunto de demandas, raias, nós, playbooks, artefatos, variáveis, papéis, perguntas, ritos e técnicas em `content/guide/*.yaml`.
- **Documento**: o objeto montado a partir dos arquivos YAML do Guia, na mesma forma que o loader Python produz.
- **Oráculo**: o validador e a suíte de testes Python em `tools/guide-oracle/`, congelados a partir do commit `7abed1c` do guia.
- **Validador_TS**: o validador TypeScript do kit (`lib/flows`, função `checkDoc`), executado por `npm run validate`.
- **Regra**: uma verificação identificada por um código estável (por exemplo `RACI_CONFLITO`), com tipo `erro` ou `aviso`.
- **Erro**: Regra que reprova a validação sempre.
- **Aviso**: Regra que só reprova a validação no Modo_Estrito.
- **Modo_Estrito**: execução em que Avisos também reprovam, equivalente a `validar --estrito` do Oráculo.
- **Problema**: um resultado de Regra com código, tipo, caminho no Documento, id do item e mensagem.
- **Teste_Diferencial**: teste que roda o Oráculo e o Validador_TS sobre o mesmo Documento e compara os conjuntos de Problemas.
- **Defeito_Plantado**: alteração mínima e intencional em uma cópia do Documento para disparar uma Regra específica.
- **Rastreio**: análise de quem produz e quem consome cada artefato e variável, quais condições usam cada variável e quais itens têm lacunas de produtor ou consumidor.
- **Decisor**: cálculo de construir, comprar ou assinar a partir dos pesos por objetivo, das notas por critério e do desempate, lido de `comum.decisor_construir_comprar_assinar`.
- **Portão_de_Orçamento**: o gateway `com_dcs_g1`, que confirma se o custo cabe no orçamento antes da pontuação.
- **Contexto_Financeiro**: custos de curto, médio e longo prazo, ROI e custo de não fazer.

## Requirements

### Requirement 1: Paridade das regras do validador

**User Story:** Como mantenedor do kit, quero que o Validador_TS emita os mesmos Problemas que o Oráculo, para que eu possa remover o Python sem perder nenhuma proteção sobre o Guia.

#### Acceptance Criteria

1. THE Validador_TS SHALL implementar os 44 códigos de Regra listados em `docs/guide-rules-parity.md`, com o mesmo tipo (Erro ou Aviso) do Oráculo.
2. WHEN o Validador_TS e o Oráculo validam o mesmo Documento, THE Teste_Diferencial SHALL encontrar o mesmo conjunto de Problemas, comparando código, tipo, caminho e id do item.
3. WHEN um Defeito_Plantado é aplicado para uma Regra, THE Validador_TS SHALL emitir o código dessa Regra e THE Oráculo SHALL emitir o mesmo código para o mesmo caminho.
4. THE suíte de testes SHALL conter pelo menos um Defeito_Plantado por código de Regra, incluindo os 9 códigos que hoje não têm teste no Oráculo.
5. WHILE o Modo_Estrito está desligado, THE Validador_TS SHALL reprovar apenas por Erros.
6. WHILE o Modo_Estrito está ligado, THE Validador_TS SHALL reprovar por Erros e por Avisos.
7. WHEN o Validador_TS reporta um Problema, THE mensagem SHALL estar em português e indicar o caminho no Documento e o id do item.

### Requirement 2: Ordem de portabilidade e prova incremental

**User Story:** Como mantenedor, quero portar as regras em grupos pequenos com prova a cada passo, para que cada PR seja revisável e uma regressão apareça no grupo que a causou.

#### Acceptance Criteria

1. THE etapa SHALL ser entregue em um único PR, com um commit por grupo de regras no padrão Conventional Commits.
2. THE porte SHALL seguir a ordem de grupos de `docs/guide-rules-parity.md`: parciais, erros estruturais, erros de dados e subtarefas, fluxo de dados, RACI e papéis, perguntas e playbooks, taxonomia, e por fim Modo_Estrito e CLI.
3. WHEN um grupo é concluído, THE `docs/guide-rules-parity.md` SHALL mostrar o status `portado` para cada código do grupo, com a linha do código no kit e o teste que o prova.
4. WHILE existir código com status diferente de `portado`, THE job de CI `guide-oracle` SHALL continuar obrigatório.
5. IF um Teste_Diferencial falha, THEN THE CI SHALL reprovar o PR e mostrar os Problemas presentes em só um dos dois validadores.

### Requirement 3: Rastreio de dados como ferramenta do projeto

**User Story:** Como autor do Guia, quero consultar o Rastreio de qualquer artefato ou variável, para saber quem produz, quem consome, onde é usado em condições e onde há lacunas.

#### Acceptance Criteria

1. THE kit SHALL oferecer o Rastreio em TypeScript com as quatro capacidades do `rastreio.py`: rastrear produtores e consumidores, descrever condições em texto legível, listar usos de variáveis em condições e listar lacunas de dados.
2. WHEN o Rastreio TypeScript e o `rastreio.py` analisam o mesmo Documento, THE resultados SHALL ser iguais para todos os artefatos e variáveis.
3. THE kit SHALL expor o Rastreio por um comando npm documentado, com saída legível e uma opção de saída em JSON.
4. WHEN o comando recebe o id de um artefato ou variável, THE saída SHALL mostrar só esse item.
5. THE Regras de fluxo de dados (`ENTRADA_SEM_PRODUTOR`, `SAIDA_NAO_ENTREGUE`, `ITEM_SEM_USO`, `LACUNA_DE_DADOS` e afins) SHALL usar o mesmo Rastreio que o comando expõe.
6. THE Rastreio SHALL continuar disponível depois da remoção do Oráculo.

### Requirement 4: Decisor no modelo do guia

**User Story:** Como engenheiro que decide entre construir, comprar ou assinar, quero que o kit use um único Decisor, com o orçamento como restrição e o custo como contexto, para que uma opção fora do orçamento nunca vença por outros critérios.

#### Acceptance Criteria

1. THE Decisor SHALL ler pesos, critérios, escala, opções e desempate somente de `comum.decisor_construir_comprar_assinar` no Guia.
2. THE Decisor SHALL calcular os mesmos totais, vencedor, empate e arredondamento de 6 casas que o `decisor.py` do Oráculo para as mesmas entradas.
3. WHEN as notas de uma opção ficam fora da escala, THE Decisor SHALL rejeitar a entrada com mensagem em português.
4. WHEN o Decisor devolve um resultado, THE resultado SHALL conter as avaliações por opção, a indicação de empate e uma justificativa em texto auditável.
5. THE Contexto_Financeiro SHALL vir como texto do Guia, e THE justificativa SHALL citar esse texto.
6. WHEN o Contexto_Financeiro está presente ou ausente, THE notas e o vencedor SHALL ser os mesmos.
7. THE Portão_de_Orçamento SHALL continuar no fluxo `com_dcs` antes da pontuação, e o Decisor SHALL tratar o orçamento como pré-condição e nunca como critério.
8. THE kit SHALL remover os campos `eixos`, `eixo_alimenta_criterio` e `tolerancia_empate` do modelo do Decisor, sem deixar uma segunda fonte de pesos.
9. THE ids dos 27 passos `prep.pontuar_opcoes_matriz` dos guias práticos SHALL permanecer iguais.
10. THE página da demanda no site SHALL mostrar o Portão_de_Orçamento e o Contexto_Financeiro junto da tabela de pesos.

### Requirement 5: Remoção do Oráculo

**User Story:** Como mantenedor, quero remover o Python quando a paridade estiver completa, para que contribuidores precisem de uma só toolchain e o CI fique mais simples e rápido.

#### Acceptance Criteria

1. WHEN todos os 44 códigos estiverem `portado` e o Rastreio e o Decisor tiverem paridade comprovada, THE kit SHALL remover `tools/guide-oracle/` e o job `guide-oracle`.
2. WHEN o Oráculo é removido, THE ruleset da `main` SHALL trocar o check obrigatório `guide-oracle` pelo check que roda o Validador_TS em Modo_Estrito.
3. THE testes diferenciais SHALL ser convertidos em testes de regressão com os resultados esperados gravados, para que a proteção continue sem o Python.
4. THE kit SHALL manter os testes de propriedade do Oráculo (Hypothesis) como testes de propriedade em TypeScript (fast-check), cobrindo as mesmas propriedades.
5. WHEN o Oráculo tiver sido removido, THE `npm run validate` em Modo_Estrito SHALL passar no Documento real, sem dependência de Python.
6. THE documentação (`docs/guide-rules-parity.md`, `docs/architecture.md`, ADR 0001, `README.pt-BR.md`, `README.en.md`, `CONTRIBUTING.md`) SHALL refletir a toolchain única.

### Requirement 6: Testes de navegador do guia

**User Story:** Como mantenedor, quero preservar o que os 6 testes de navegador do guia verificavam, para que a interação dos diagramas não regrida quando a interface for refeita.

#### Acceptance Criteria

1. THE kit SHALL documentar, para cada teste `cdp_*.mjs` do Oráculo, o comportamento que ele verifica e se esse comportamento existe no site atual.
2. WHERE o comportamento existe no site atual, THE kit SHALL ter um teste de navegador equivalente rodando contra o build do site.
3. WHERE o comportamento ainda não existe no site, THE kit SHALL registrar o teste como critério de aceite da etapa 3.

### Requirement 7: Qualidade, segurança e governança mantidas

**User Story:** Como dono do repositório público, quero que esta etapa respeite os mesmos controles das etapas anteriores, para que a migração não abra brechas.

#### Acceptance Criteria

1. THE todos os checks obrigatórios da `main` SHALL passar em cada PR desta etapa.
2. THE `content/ids.lock.json` SHALL apenas crescer, sem perder nenhum id.
3. THE checagem de termos públicos e o gitleaks SHALL reportar zero ocorrências.
4. THE kit SHALL funcionar num clone limpo sem a pasta `private/`.
5. IF uma Regra portada muda o resultado da validação do Documento real, THEN THE PR SHALL explicar a causa e THE mudança SHALL ser aprovada pelo dono antes do merge.

## Decisões registradas

1. O Rastreio é portado para TypeScript e vira um comando permanente do kit (Requisito 3). O `rastreio.py` sai junto com o Oráculo.
2. A etapa é entregue em um único PR ao final, com um commit por grupo de regras (Requisito 2).
3. O Contexto_Financeiro vem como texto do Guia nesta etapa. A entrada desse contexto por quem usa o Decisor fica para o futuro swarm de agentes que vai executar o Guia, fora desta spec.
