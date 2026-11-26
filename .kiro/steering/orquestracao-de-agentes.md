---
inclusion: auto
name: orquestracao-de-agentes
description: Cadeia de orquestração dos agentes do projeto (tech-lead, arquiteto, dev, qa, seguranca, designer, devops, engenheiro-de-dados, pm) para executar as tarefas de uma spec em loop, com responsabilidades, gatilhos, modelo por agente, pontos de parada do dono e regras de falha. Use ao executar tarefas de uma spec em .kiro/specs.
---

# Orquestração dos agentes do projeto

Define quem executa, quem revisa e quando parar ao rodar as tarefas de uma spec. A fonte dos agentes é `.agents/roles/*.md`. Os arquivos em `.kiro/agents/` são gerados por `npm run agents:sync`. O nível de modelo de cada agente fica em `modelo:` no papel e os ids em `.agents/models.json`.

## Princípios

1. O `tasks.md` da spec é a fonte de verdade do estado. Cada ciclo lê o arquivo e segue da primeira tarefa pronta.
2. Uma tarefa por ciclo, um executor por tarefa. Revisores só leem e apontam.
3. O dono decide o que é produto. Agentes propõem e verificam, e o dono aprova nos pontos de parada.
4. Todos os agentes desta cadeia têm autonomia `execucao` e podem editar. Cada um edita só o que é do seu papel: `tech-lead` e `pm` em specs, briefings e textos de PR, `arquiteto` em ADRs e `design.md`, `designer` em critérios de interface e acessibilidade, `sre` em orçamento e observabilidade. Código de produto e testes são do `dev` e do `qa`.
5. Dado com fonte e data, ids estáveis em `content/ids.lock.json`, nada de dados pessoais ou caminhos locais (regras de `AGENTS.md`).

## Agentes, modelo e responsabilidade

| Agente | Autonomia | Modelo | Responde por | Aciona quando | Não faz |
|---|---|---|---|---|---|
| `tech-lead` | execucao | profundo | Escolher a próxima tarefa pronta, montar o briefing, revisar o diff (`code-review`), decidir se a tarefa fecha, preparar a descrição do PR (`pr`) | Início e fim de cada ciclo, e em toda falha repetida | Editar código de produto |
| `arquiteto` | execucao | profundo | Encaixe e contratos (Modelo_de_Grafo, interface do Renderizador, schema), trade-offs, ADRs, decisões do spike | Tarefas que definem contrato ou decisão, e quando um executor discorda do design | Implementar código de produto |
| `dev` | execucao | padrão | Implementar com teste primeiro (`tdd`), rodar `npm run validate`, `npm test`, `npm run build` | Toda tarefa de código, schema, build e documentação técnica | Aprovar a própria entrega |
| `qa` | execucao | padrão | Specs Playwright, testes de propriedade, medições, critérios de aceite e orçamento | Tarefas de teste e medição, e verificação final de cada fase | Mudar código de produção para passar teste |
| `engenheiro-de-dados` | execucao | padrão | Modelo de dados do guia, ligação de tarefa a categoria e guia no YAML, qualidade e consistência de ids | Tarefas que editam `content/guide/**` e `content/ids.lock.json` | Inventar ids ou ferramentas |
| `seguranca` | execucao | profundo | Revisar workflows, permissões, dependências novas, superfícies públicas e dados sensíveis | Gatilhos de segurança abaixo | Bloquear sem evidência |
| `designer` | execucao | padrão | Revisar interação, acessibilidade, foco, rótulos e fluxo de uso. A identidade visual é de outra spec | Tarefas de interface (fases 6, 7, 9 e 10) | Definir identidade visual |
| `devops` | execucao | padrão | Workflows de CI, jobs agendados, build e publicação | Fase 11 e qualquer mudança em `.github/` | Alterar rulesets sem o dono |
| `pm` | execucao | padrão | Textos de produto, critérios de aceite, revisão editorial das ligações da `feature` | Curadoria de conteúdo e pontos de parada do dono | Decidir escopo sozinho |
| `sre` | execucao | padrão | Orçamento de desempenho, observabilidade e medições em CI | Fase 11, junto de `qa` e `devops` | Alterar código de produto |
| `suporte`, `rte`, `engenheiro-de-ia` | conforme o papel | conforme o papel | Fora desta spec | Só se uma tarefa pedir | Nada por padrão |

## Ciclo por tarefa

1. **Selecionar.** `tech-lead` lê o `tasks.md`, pega a primeira tarefa pronta (dependências concluídas, ondas do grafo) e confere se é ponto de parada do dono.
2. **Briefing.** `tech-lead` escreve o pedido mínimo: id da tarefa, requisitos e propriedades citados, arquivos prováveis, comando de verificação. Nada além disso.
3. **Marcar.** O orquestrador marca a tarefa como `in_progress` e espera a confirmação antes de delegar.
4. **Executar.** O executor da tabela abaixo implementa, com teste primeiro quando houver comportamento novo. Não faz commit.
5. **Verificar.** `qa` roda a verificação citada na tarefa e as suítes afetadas. Falha volta ao executor com a saída do erro.
6. **Revisar.** `tech-lead` revisa o diff contra a spec. `arquiteto` entra se a tarefa toca contrato. `seguranca` entra nos gatilhos. `designer` entra em tarefas de interface.
7. **Fechar.** Com verificação e revisão aprovadas, o orquestrador marca `completed`.
8. **Commit por fase.** Na tarefa de commit da fase, `dev` faz um commit Conventional Commits só com os arquivos da fase. Push e PR dependem do dono.

## Quem executa cada tipo de tarefa

| Tipo de tarefa | Executor | Revisores |
|---|---|---|
| Harness de medição e spike (fase 1) | `dev` escreve, `qa` roda e valida os números | `arquiteto` redige a decisão, `tech-lead` apresenta ao dono |
| Schema, validador e regras (fase 2, tarefas 2.1 a 2.4) | `dev` | `arquiteto`, `qa` |
| Declarar categorias e ligar tarefas a guias (2.5 a 2.9) | `engenheiro-de-dados` | `pm` (editorial), `arquiteto`, e o dono nos três blocos de ligação |
| Modelo de grafo, `lib/flow-graph`, Mermaid derivado, expansão (fases 3 a 5) | `dev` | `arquiteto`, `qa` (propriedades e goldens) |
| Ilha do cliente, modal, subtarefas (fases 6 e 7) | `dev` | `designer`, `qa` |
| Facetas, três Areas e tabelas por demanda (fases 8 e 9) | `dev` | `engenheiro-de-dados` (facetas vindas do modelo), `designer`, `qa` |
| i18n e marcador de fallback (fase 10) | `dev` | `pm` (textos), `designer` |
| Orçamento, matriz de sobreposição, CI (fase 11) | `qa` e `devops` | `seguranca` (workflows), `tech-lead` |
| Documentação (fase 12) | `dev` | `pm`, `arquiteto` |
| PR único (fase 13) | `tech-lead` prepara, `devops` confere os checks | O dono aprova |

## Gatilhos para `seguranca`

- Qualquer arquivo em `.github/workflows/` ou mudança de permissões e de pins de actions.
- Dependência nova em `package.json` (por exemplo Playwright ou bibliotecas de grafo).
- Conteúdo publicado que possa carregar dado pessoal, caminho local, e-mail ou segredo.
- Carga dinâmica de código no cliente (`import()`, Worker, iframe) e política de segurança de conteúdo.
- Seguir `.kiro/steering/appsec-rules.md`.

## Pontos de parada do dono

Parar e pedir decisão antes de seguir:

- Tarefa 1.7: go/no-go do spike (Mermaid em ESM dividida, bundle único ou Renderizador próprio, e os tetos de orçamento).
- Tarefas 2.6, 2.7 e 2.8: revisão editorial de cada bloco de ligações da `feature`.
- Golden da Visão geral (`feature.geral.mmd`): revisão do arquivo gerado.
- Tarefa 13.1: abrir o PR único e aprovar.
- Qualquer mudança em requisitos, orçamento ou decisão registrada em `requirements.md` e `design.md`.

## Regras do loop

- **Tamanho.** Tarefa que passa de 30 minutos de execução ou que exige contexto grande é dividida em duas e registrada no `tasks.md`. Repetir a mesma tarefa sem dividir não resolve.
- **Falha.** Duas falhas seguidas na mesma tarefa: `tech-lead` e `arquiteto` diagnosticam (skill `diagnosing-bugs`) e o briefing é reescrito. Na terceira, parar e avisar o dono.
- **Subir o modelo.** Se um executor de nível padrão falhar duas vezes por raciocínio, repetir com o nível profundo e voltar ao padrão na tarefa seguinte.
- **Paralelismo.** Só tarefas da mesma onda do grafo que não editam os mesmos arquivos. Os três blocos de ligação em `feature.yaml` e os arquivos `rules.ts` e `flow.ts` seguem em série.
- **Medições do spike.** Rodam em CI, não na máquina do dono (a máquina local está disputada e o ruído invalida p95). `qa` e `devops` criam um workflow manual (`workflow_dispatch`) que executa os specs de `tests/browser/spike/` e publica o JSON como artefato. Rode a mesma medição sempre no mesmo runner e registre o tipo dele junto dos números.
- **Estado preso.** Tarefa `in_progress` sem execução viva volta para `not_started` antes de nova tentativa.
- **Isolamento.** Executor não mexe em arquivos fora da tarefa e não toca `.appsec/`, `.claude/` e `.kiro/` sem pedido.
- **Evidência.** Todo fechamento cita o comando rodado e o resultado. Número sem fonte fica como "não verificado".
- **Publicação.** Nenhum agente faz push, abre PR ou altera ruleset sem o dono confirmar o destino.

## Como invocar

- **No IDE:** o orquestrador delega cada tarefa com o briefing e a identificação exata da tarefa, e só delega depois de o status `in_progress` ser confirmado.
- **Na CLI do Kiro:** abra a sessão, troque de agente com `/agent swap` e o nome do agente, e passe o briefing. Confirme o modelo ativo com `/model`.
- **Modelo:** o campo `model` de cada agente fixa o nível. Se o id não existir na sua conta, o primeiro prompt falha e o Kiro volta ao modelo anterior. Corrija o id em `.agents/models.json`, rode `npm run agents:sync` e tente de novo.

## Briefing padrão

```
Tarefa: id e título do tasks.md
Requisitos e propriedades: números citados
Arquivos prováveis: lista curta
Verificação: comando e critério
Limites: sem commit, sem push, sem tocar fora da tarefa
Entregar: resumo curto, arquivos alterados, comando rodado e resultado
```
