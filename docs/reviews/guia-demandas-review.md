# Revisão das demandas do guia (commit 7abed1c)

Escopo: as 12 demandas de `content/guide/demandas/`, mais `comum.yaml`, `raias-comuns.yaml` e `ritos.yaml`. Os números saem do script `review.py` (Python com PyYAML) executado sobre `content/guide`, que na data desta revisão é idêntico byte a byte ao guia congelado em `7abed1c` (`diff -r` sem saída). A paridade com o oráculo foi provada antes de qualquer edição: `validar --estrito` e os 159 diagramas Mermaid dão o mesmo resultado no guia congelado e no kit.

## Resumo por severidade

| Severidade | Achados | O que significa |
|---|---|---|
| alta | 0 | Nenhuma regra do validador (`--estrito`) é violada. 0 referências quebradas, 0 violações de RACI. |
| media | 5 | Lacunas de conteúdo que afetam a navegação e o uso no kit (técnicas sem uso, tarefas sem técnica, guias práticos sem ligação, duplicidade com notas do kit). |
| baixa | 6 | Consistência e acabamento (rótulos de gateway, terminologia, campos opcionais). |

Números gerais: 12 demandas, 151 tarefas, 293 subtarefas, 70 gateways, 544 playbooks, 127 técnicas, 201 artefatos. As 151 tarefas têm `saidas`. Os 544 playbooks têm `resumo` e `exemplo`.

## Achados

| Severidade | Local | Problema | Correção sugerida |
|---|---|---|---|
| media | `comum.yaml`, técnicas `tec_shape_up`, `tec_cascata`, `tec_circuit_breaker`, `tec_agente_de_codigo`, `tec_demo_driven_development`, `tec_linters`, `tec_little_s_law`, `tec_modelo_em_v`, `tec_okrs_por_sprint`, `tec_rup`, `tec_scrum_guide`, `tec_sprint_goal`, `tec_sprint_review`, `tec_roadmap`, `tec_retrospectiva`, `tec_roam`, `tec_acoes_corretivas`, `tec_rate_limiting`, `tec_escape_analysis`, `tec_calendario_eventos_criticos`, `tec_game_day`, `tec_status_de_janela` | 22 das 127 técnicas não são citadas por nenhuma tarefa ou subtarefa e ficam sem navegação de entrada a partir dos fluxos. | Ligar cada uma à subtarefa que a aplica (por exemplo `tec_retrospectiva` ao rito de retrospectiva, `tec_escape_analysis` ao gateway `bug_pre_g1`, `tec_game_day` ao fluxo de incidente) ou marcá-la como técnica de referência. Decisão de conteúdo: fica como sugestão. |
| media | 57 das 151 tarefas (33 sem subtarefas e 24 com subtarefas): `raias-comuns` (16), `feature` (6), `bug` (4), `divida_tecnica` (4), `documentacao` (4), `incidente` (4), `seguranca` (4), `spike` (4), `descontinuacao` (3), `migracao` (3), `infraestrutura` (2), `teste_qa` (2), `chore` (1) | A tarefa não cita técnica, nem direta nem nas subtarefas (94 das 151 citam). Dos usos registrados, 132 são obrigatórios, 57 recomendados, 19 condicionais e 14 opcionais. | Preencher `tecnicas` nas tarefas com subtarefas e detalhar subtarefas nas 33 tarefas simples, usando as técnicas existentes. A lista completa sai do script de revisão (chave `no_tecnicas`) e fica no scratch local da migração. |
| media | 40 tarefas sem subtarefas e 123 das 293 subtarefas sem técnica | O detalhamento varia entre demandas: `bug` (22 tarefas), `feature` (20) e `incidente` (26) são ricas, enquanto `chore`, `infraestrutura`, `migracao`, `teste_qa` e `documentacao` têm de 1 a 4 tarefas cada. | Priorizar a fase 4 do backlog (`docs/backlog/fase-4-conteudo-celulas-e-playbooks-das-9-demandas.md`). |
| media | `comum.yaml`: `tec_circuit_breaker`, `tec_rate_limiting`, `tec_multi_agent` (aliases de `circuit_breaker`, `rate_limiting`, `multi_agent`); `tec_agente_de_codigo` (nome igual ao da categoria `agente_codigo`); `tec_code_review` (nome igual ao do caso de uso `revisao_de_codigo`) | 3 técnicas duplicam notas de padrão do kit (resolvidas por `guia_ids`, a nota do kit vence na exibição) e 2 têm nome igual ao de notas de outro tipo no kit. Nenhuma das 18 técnicas novas coincide com nota do kit por id ou nome normalizado. | Manter os aliases. No estágio 3, decidir se `tec_agente_de_codigo` e `tec_code_review` apontam por link para a categoria e o caso de uso do kit. |
| media | `content/pt-BR/guides/` (34 guias práticos), 15 stacks, 429 ferramentas | Nenhuma tarefa ou subtarefa sugere guia prático, stack ou categoria de ferramenta. `categorias_ferramenta` tem 0 itens em `7abed1c`, então não há categoria no guia para ligar. | Estágio 3: usar o mapa da seção "Alinhamento com guias práticos" abaixo. |
| baixa | `comum.yaml`: `tec_requisitos_funcionais` e `tec_requisitos_n_o_funcionais` (similaridade 0,91); `tec_demo_driven_development` e `tec_spec_driven_development` (0,87) | Nomes quase idênticos, mas cada par reúne técnicas distintas e legítimas. | Manter. Vale diferenciar na `descricao` o que cada técnica do par cobre. |
| baixa | `raias-comuns.yaml`, gateway `com_set_g3` | A condição `sim` e a de esgotamento (`não, 3 tentativas esgotadas: seguir com pessoas`) levam ao mesmo destino `com_set_t8`. O destino repetido é intencional e o validador aceita. | Manter. Opcional: unir as duas em uma saída só se o diagrama ficar confuso. Decisão de conteúdo. |
| baixa | 53 condições de gateway com `sim` ou `não` sem complemento | Condições curtas funcionam porque o rótulo do gateway é uma pergunta binária. Outros 11 gateways usam enumerações mutuamente exclusivas (`com_set_g2`, `com_hml_g1`, `com_dcs_g2`, `bug_tri_g1`, `bug_tri_g4`, `bug_pre_g1`, `feat_ent_g1`, `inc_cls_g2`, `inc_cmd_g2`, `inc_com_g1`, `inc_con_g1`). | Manter. Opcional: completar `sim` e `não` com o motivo, como já ocorre em `com_set_g3`. |
| baixa | 14 gateways com `aprova` e 56 sem | A regra do guia é aprovar só em gateway de qualidade, então a ausência de `aprova` nos demais é o comportamento esperado. `validar --estrito` não aponta violação. | Nenhuma ação. |
| baixa | `comum.yaml` linhas 1157 e 3918, `raias-comuns.yaml` linhas 4021 a 4050 | A terminologia de orçamento é consistente: `orçamento` (29 usos), `fora do orçamento` (4), `custo de não fazer` (7), `custo dentro do previsto ou estimado aceitável` (3). `verba` só aparece dentro de `verbal`. As formas sem acento (19) são ids e enums como `fora_do_orcamento`. `orcamento_erro_estourado` é o orçamento de erros de SRE, conceito distinto do orçamento de custo. | Nenhuma ação. |
| baixa | `raias-comuns.yaml` linha 3664 | O exemplo usa "custo dentro do orçamento", enquanto o gateway do Decisor usa "custo dentro do previsto ou estimado aceitável". Os contextos diferem (exemplo de meta e gate), então não há erro objetivo. | Sugestão: alinhar o exemplo ao termo do gateway se a equipe preferir um vocabulário único. |

## Verificações por tema

### Consistência entre demandas

| Demanda | Tarefas | Gateways | Raias | Playbooks | Artefatos | Perguntas | Células |
|---|---|---|---|---|---|---|---|
| bug | 22 | 11 | 6 | 64 | 0 | 40 | 4 |
| chore | 1 | 1 | 2 | 23 | 1 | 1 | 4 |
| descontinuacao | 3 | 1 | 3 | 19 | 3 | 3 | 4 |
| divida_tecnica | 4 | 1 | 3 | 23 | 4 | 4 | 4 |
| documentacao | 4 | 0 | 4 | 16 | 4 | 4 | 4 |
| feature | 20 | 8 | 7 | 74 | 0 | 126 | 4 |
| incidente | 26 | 12 | 11 | 78 | 0 | 45 | 4 |
| infraestrutura | 2 | 0 | 2 | 14 | 2 | 2 | 4 |
| migracao | 3 | 0 | 3 | 19 | 3 | 3 | 4 |
| seguranca | 8 | 4 | 5 | 38 | 7 | 7 | 4 |
| spike | 6 | 2 | 4 | 23 | 6 | 7 | 4 |
| teste_qa | 2 | 0 | 2 | 12 | 2 | 2 | 4 |

As três demandas maduras (`bug`, `feature`, `incidente`) concentram 68 das 151 tarefas e usam artefatos de `comum.yaml` (0 próprios). As nove demandas novas têm a estrutura completa (4 células, playbook em todo nó) e conteúdo enxuto, o que alimenta o item de backlog da fase 4.

### Tarefas sem técnicas, ferramentas ou saídas

- Sem `saidas`: 0 de 151.
- Sem técnica (direta ou nas subtarefas): 57 de 151.
- Referências a técnicas inexistentes: 0.
- Ferramentas: `categorias_ferramenta` tem 0 itens em `7abed1c`, então nenhuma tarefa pode apontar categoria de ferramenta. O kit tem 429 ferramentas em `content/pt-BR/tools/`, e a ligação é trabalho do estágio 3.

### Playbooks

544 de 544 têm `resumo` e `exemplo`. Nenhuma lacuna.

### Técnicas duplicadas ou parecidas

Aliases já tratados: `tec_circuit_breaker`, `tec_rate_limiting`, `tec_multi_agent`. Pares de nomes parecidos: 2 (tabela de achados). Técnicas sem `como_aplicar` e `resultado_esperado`: 66 das 127 (campos opcionais no schema).

### RACI e gateways

- RACI: 0 violações (nenhuma tarefa com `aprova`, e todas as tarefas têm papel direto ou nas subtarefas). `validar --estrito` sai com 0.
- Gateways: 70 com 2 ou mais saídas, 0 com condição vazia, 0 com condição genérica (`outro`, `senão`, `demais casos`).

### Terminologia

Contagens por arquivo de `orçamento`: `comum.yaml` (8), `raias-comuns.yaml` (10), `feature.yaml` (7), `incidente.yaml` (4). Detalhes nas duas últimas linhas da tabela de achados.

### Alinhamento com guias práticos, stacks e categorias (insumo do estágio 3)

| Onde sugerir | Guia prático do kit |
|---|---|
| demanda `bug`, raias de reprodução e isolamento | `investigar_bug` |
| demanda `incidente` (comando, contenção, comunicação) | `responder_incidente`, `adicionar_observabilidade` |
| demanda `seguranca` e raia `com_seg` | `proteger_codigo_dependencias_segredos` |
| demanda `feature`, raias de levantamento e especificação | `criar_api`, `criar_site`, `criar_app_mobile` conforme o tipo de entrega |
| raias `com_val`, `com_e2e`, `com_hml` e demanda `teste_qa` | `escrever_testes` |
| raia `com_evl` | `avaliar_modelo_ou_prompt` |
| raia `com_prf` | `otimizar_performance` |
| raia `com_rev` | `fazer_code_review` |
| raias `com_etg` e `com_lib`, demanda `infraestrutura` | `fazer_deploy`, `configurar_ci_cd` |
| raia `com_mon` | `adicionar_observabilidade` |
| raias `com_dcs` e `com_frn` | `escolher_modelo_ia` e `controlar_custo_de_llm` (quando o objeto da decisão é IA), `integrar_api_terceiros` |
| demanda `migracao` | `migrar_banco_ou_sistema` |
| raias `com_set`, `com_dea`, `com_exp`, `com_mel` (agentes) | `configurar_code_agents`, `criar_agente`, `escrever_prompt` |

Stacks: as 15 stacks do kit carregam os mesmos 7 eixos do Decisor nas condições, então a ligação natural ocorre na raia `com_dcs` (opção construir). Os guias práticos ficam em `content/pt-BR/guides/` e as stacks em `content/pt-BR/stacks/`.

## Correções aplicadas

Nenhuma. As buscas objetivas (espaços duplicados, pontuação dupla, palavras repetidas, espaço antes de vírgula ou ponto, caracteres invisíveis, palavras sem acento em texto corrido, referências quebradas) não encontraram ocorrência em texto visível. As ocorrências sem acento (`nao`, `migracao`, `operacao` e semelhantes) são ids, enums (`sim|nao`) e chaves. Por isso `content/guide` continua idêntico byte a byte ao guia congelado.
