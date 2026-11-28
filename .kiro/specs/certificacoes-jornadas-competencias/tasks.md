# Implementation Plan

## Overview

Plano de 4 fases em um único PR na branch `feat/certificacoes-jornadas-competencias`, criada a partir da `main`, executada **após** a spec `seguranca-ofensiva-e-confiavel` (a jornada e a competência de segurança linkam as categorias criadas lá, D7). Ao fim de cada fase, `npm run validate` e `npm test` passam e os ids novos já estão no `content/ids.lock.json`.

Convenções:

- Nota de certificação nova segue `comptia_security_plus.md`: emissor, área, nível, formato, custo (não verificado quando a fonte oficial não publica), validade, pré-requisitos, o que comprova, para quem, url oficial, data de verificação, observações.
- Nenhum preço estimado; nenhuma correspondência inventada: link só onde o escopo real cobre (tabela de correspondências do `design.md`).
- YAMLs novos seguem a forma de `competencia_era_ia.yaml` e `jornada_system_design.yaml`.

## Tasks

### Fase 1: schema de certificação

- [ ] 1.1 Extender o Zod de `certificacao` em `lib/schema` com `jornadasRelacionadas` e `competenciasRelacionadas` (arrays de link, opcionais, padrão vazio) e rodar `npm run schema:gen`
  - _Requisitos: 1.1, 1.2_
- [ ] 1.2 Testar se o check de links resolve `[[jornada_seguranca|...]]` e `[[competencia_seguranca|...]]` apontando entidades YAML; se não resolver, extender o resolvedor de links para alvos YAML antes de seguir
  - _Requisitos: 1.3, 7.3_
- [ ] 1.3 Confirmar `npm run validate` verde com as 45 notas sem os campos; commit `feat(schema): certificacao linka jornadas e competencias`
  - _Requisitos: 1.2, 7.1_

### Fase 2: jornada e competência de segurança

- [ ] 2.1 Criar `competencia_seguranca.yaml` com itens: OWASP Top 10 e threat modeling; SAST/DAST/SCA e SBOM; IAM e segredos; resposta a incidente; ofensiva para defesa (CTF como laboratório)
  - _Requisitos: 2.1, 2.3_
- [ ] 2.2 Criar `jornada_seguranca.yaml` com etapas: fundamentos de referência; ferramentas por fase; desenvolvimento seguro; resposta a incidente; e os links às categorias `seguranca_codigo`, `seguranca_ofensiva`, `osint_recon`, `sca_resposta_cve`, `labs_ctf`
  - _Requisitos: 2.2, 2.4_
- [ ] 2.3 Commit `feat(jornadas): jornada e competencia de seguranca`
  - _Requisitos: 7.1_

### Fase 3: backfill e certificações novas

- [ ] 3.1 Backfill das 45 certificações com `jornadasRelacionadas` e `competenciasRelacionadas` segundo a tabela de correspondências do `design.md`; vazio legítimo; auditoria listando os vazios e o motivo
  - cissp, comptia_security_plus, cks -> competencia_seguranca + jornada_seguranca
  - pmp/csm/psm_i/pspo_i/safe_agilist/pmi_acp -> competencia_soft_skills (+ jornada de metodologia/ciclo agil onde cobrir)
  - togaf e certificações de arquiteto -> jornada_system_design
  - certificações de IA -> competencia_era_ia + jornada_ciclo_ia
  - certificações de nuvem operacionais -> vazio + lacuna (não há jornada de nuvem)
  - _Requisitos: 3.1, 3.2, 3.3, 3.4_
- [ ] 3.2 Criar as 10 certificações novas com verificação: `oscp`, `ceh`, `ejpt`, `csslp`, `giac_gcih`, `giac_gweb`, `aws_security_specialty`, `microsoft_az_500`, `ccsp`, `cisa`
  - preço `não verificado` quando a fonte oficial não publica; data de verificação; links às categorias de segurança conforme o escopo de cada exame; cisa/ccsp às competências de gestão quando aplicável
  - _Requisitos: 4.1, 4.2, 4.3, 4.4_
- [ ] 3.3 Commit `feat(certificacoes): backfill de jornadas e competencias e 10 certificacoes novas`
  - _Requisitos: 7.1_

### Fase 4: hub, render e PR

- [ ] 4.1 Criar `hub_journeys` (`camada: journeys`) com as 7 jornadas, 5 competências, certificações ligadas, guias ligados e as lacunas (jornada/competência sem cert; cert sem jornada/competência)
  - _Requisitos: 5.1, 5.2_
- [ ] 4.2 Apontar `hub_journeys` no `hub_certifications` e no `hub_guides`; conferir ids novos no `content/ids.lock.json` sem remoções
  - _Requisitos: 5.3, 5.4_
- [ ] 4.3 Verificar o render de certificação (`site/src/render/entity.ts`, `layers.ts`): incluir os campos novos apenas se o template itera relacionáveis sem código extra; caso contrário, registrar a pendência em `docs/`
  - _Requisitos: 6.1, 6.2_
- [ ] 4.4 Rodar `npm run validate`, `npm test`, `npm run build`, `npm run smoke`; conferir termos públicos e gitleaks zerados; abrir o PR único e aguardar revisão humana
  - _Requisitos: 7.1, 7.2_

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2"], "note": "porta: se o resolvedor nao aceitar alvos YAML, extender antes do backfill" },
    { "id": 2, "tasks": ["1.3"] },
    { "id": 3, "tasks": ["2.1", "2.2"] },
    { "id": 4, "tasks": ["2.3"] },
    { "id": 5, "tasks": ["3.1"] },
    { "id": 6, "tasks": ["3.2", "4.1"] },
    { "id": 7, "tasks": ["3.3"] },
    { "id": 8, "tasks": ["4.2", "4.3"] },
    { "id": 9, "tasks": ["4.4"] }
  ]
}
```

## Notes

- **Ordem das specs:** executar após `seguranca-ofensiva-e-confiavel` para que os links da jornada/competência e das certificações novas apontem categorias existentes; se rodar antes, os links pendentes ficam como lacuna e são fechados no merge daquela spec.
- **Preços de exame:** OSCP (~US$ 500+ pelo curso LAB+cert), CEH, GIAC e CSSLP publicam preços na página oficial; registrar só o que a página oficial confirmar na data, e `não verificado` para o resto.
- **Renovação e vigência:** cada certificação nova registra validade e ciclo de renovação só quando confirmados oficialmente (padrão `observacoes` da CompTIA).
- **Contagem final esperada:** 2 campos de schema, 2 YAMLs novos (1 jornada, 1 competência), 1 hub novo, 45 certificações com backfill, 10 certificações novas, ids novos no lock sem remoções.
