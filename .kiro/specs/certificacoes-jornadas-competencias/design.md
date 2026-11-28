# Design Document

## Overview

Duas mudanças estruturais pequenas (dois campos no schema de certificação, um hub novo) e um trabalho de conteúdo maior (jornada e competência de segurança, backfill das 45 notas, 10 certificações novas). O desenho evita mexer no schema de jornada/competencia e no site: o link nasce nas certificações e a navegação fica no hub.

### Decisões de design

| # | Decisão | Alternativas consideradas | Motivo |
|---|---|---|---|
| D1 | Campos `jornadasRelacionadas`/`competenciasRelacionadas` como arrays de link, mesma forma dos relacionáveis existentes, opcionais com padrão vazio | Campo obrigatório; campo livre de texto | Notas existentes não quebram (optional + default `[]`); link é validável, texto não |
| D2 | Zod em `lib/schema` primeiro, `npm run schema:gen` depois, validação por último | Editar o `schema/json` direto | O `schema/json` é gerado; editar direto é sobrescrito no próximo `schema:gen` |
| D3 | Link nasce na certificação (um sentido) + hub mostra o mapa; schema de jornada/competencia não muda | Bidirecionalidade completa (jornadas listarem certificações) | Menor raio de mudança; os YAMLs de jornada/competencia passam nos checks sem alteração; a volta fica para futura spec |
| D4 | `hub_journeys` com `camada: journeys`, ordem após certifications | Distribuir as jornadas no `hub_guides`; link pessoal | Jornadas/competências hoje não têm hub e o `hub_certifications` aponta "Mapa de Competências" como link pessoal; o hub dá o índice navegável que falta |
| D5 | Backfill com vazio legítimo e lacuna registrada no hub | Inventar correspondência para preencher tudo | "Dados com fonte"; cert de nuvem sem jornada de nuvem existente fica vazio e registrado, não forçado |
| D6 | Certificações novas de segurança seguem o padrão de `comptia_security_plus.md`: preço `não verificado` quando a fonte oficial não publica, data de verificação, observações | Estimar preço por fonte de terceiros | Regra do kit: "o que não foi confirmado fica como não verificado" |
| D7 | Dependência da spec `seguranca-ofensiva-e-confiavel`: jornada/competência de segurança linkam categorias criadas lá | Executar em paralelo com links quebrados; duplicar categorias aqui | Sem a spec de segurança, os links apontariam entidades inexistentes; executando antes (ou com R2.4 tolerante), o merge final chega verde |
| D8 | Render verificado, não presumido: só incluir os campos se o template itera relacionáveis | Render novo garantido nesta spec | `site/src/render/entity.ts` é genérico; sem verificar, o campo pode existir invisível — e render novo amplia o escopo para além de dados |

### Mapa de links (fim de ambas as specs de segurança)

```
certificacao (45 existentes + 10 novas)
  ├─ jornadasRelacionadas    -> jornada_*.yaml (7)
  ├─ competenciasRelacionadas -> competencia_*.yaml (5)
  ├─ categoriasRelacionadas  -> categorias de ferramenta (inclusive as 5 novas de segurança)
  └─ ferramentasRelacionadas -> notas do catálogo

hub_journeys
  ├─ 7 jornadas + 5 competências
  ├─ certificações ligadas por jornada/competência
  └─ lacunas: jornada sem cert; cert sem jornada
```

### Correspondências reais para o backfill (não inventadas)

| Certificação existente | jornada/competência legítima |
|---|---|
| cissp, comptia_security_plus, cks | competencia_seguranca + jornada_seguranca (novas) |
| pmp, csm, psm_i, pspo_i, safe_agilist, pmi_acp | competencia_soft_skills e jornada_ciclo_agil/metodologia onde o escopo cobre |
| togaf, azure/google/aws architect | jornada_system_design (escopo de arquitetura) |
| scrap/management (crucial_conversations, prosci, management_3_0) | competencia_soft_skills |
| IA (claude_academy, deeplearning_ai, nvidia_genl) | competencia_era_ia e jornada_ciclo_ia |
| Certificações de nuvem operacionais (az-104, aws developer, ckad/cka) | campo de jornada vazio + lacuna registrada (não há jornada de nuvem) |

### Referências

- `lib/schema/index.ts` e `lib/schema/catalog.ts` (onde vive o Zod de `certificacao`; `npm run schema:gen` regenera o JSON).
- `content/pt-BR/journeys/competencia_era_ia.yaml` e `jornada_system_design.yaml` (forma dos YAML novos).
- `content/pt-BR/certifications/comptia_security_plus.md` (padrão de nota de certificação com `não verificado`).
- `tools/validate/checks/links.ts` (resolvedor de links; R1.3 pode exigir extensão para alvos YAML).
- `site/src/render/entity.ts` e `site/src/render/layers.ts` (onde o render de certificação é decidido, R6.1).

## Consequences

- O schema de certificação ganha dois campos opcionais; as 45 notas atuais continuam válidas sem edição obrigatória.
- O mapa de carreira fica navegável: hub_journeys mostra a ponte que hoje só existia informalmente entre certificações, jornadas e competências.
- O kit passa a declarar, com link validável, "esta certificação alimenta esta competência e esta jornada" — fechando o ciclo pedidos: certificações deixam de ligar apenas a ferramentas e frameworks.
