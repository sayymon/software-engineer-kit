# Requirements Document

## Introduction

Esta spec conecta a camada de certificações às camadas de jornadas e competências, e fecha as lacunas de segurança na oferta de certificações. A revisão que a motivou mediu, em novembro de 2026:

- 45 notas de certificação em `content/pt-BR/certifications/`, com os campos relacionáveis `ferramentasRelacionadas`, `categoriasRelacionadas` e `habilidadesRelacionadas` — mas **nenhum campo para jornadas ou competências** no schema.
- 6 jornadas e 4 competências em `content/pt-BR/journeys/*.yaml` (entidades YAML, não notas), **sem hub** (o `hub_certifications` aponta "Mapa de Competências" como link pessoal) e **sem nenhum link `[[jornada...]]` em todo o conteúdo**.
- Certificações de segurança existem (cissp, comptia_security_plus, cks), mas as que o domínio pede estão ausentes: OSCP, CEH, eJPT, CSSLP, GIAC GCIH/GWEB, AWS Security Specialty, AZ-500, CCSP, CISA.

O objetivo: cada certificação declara para qual jornada e competência ela contribui; as jornadas e competências ficam navegáveis por um hub; o domínio de segurança ganha jornada e competência próprias, ligadas às categorias criadas pela spec `seguranca-ofensiva-e-confiavel`.

### Fora de escopo

- Mudar o schema das entidades `jornada` e `competencia` (bidirecionalidade completa — a jornada listar certificações de volta — fica para futura spec; aqui o link nasce nas certificações e no hub).
- Novas jornadas/competências fora de segurança.
- Página ou UX nova no site: os campos entram como dados; o render só muda se o template atual iterar relacionáveis sem código extra.
- Preços não publicados: permanecem `não verificado`.

## Glossary

- **Certificação**: nota em `content/pt-BR/certifications/<id>.md` com `tipo: certificacao`, emissor, área, nível, custo, validade e campos relacionáveis.
- **Jornada**: entidade YAML em `content/pt-BR/journeys/jornada_<nome>.yaml` com `tipo: jornada` (etapas com id, título e descrição).
- **Competência**: entidade YAML em `content/pt-BR/journeys/competencia_<nome>.yaml` com `tipo: competencia` (área, meia-vida, itens de estudo).
- **Backfill**: preencher `jornadasRelacionadas` e `competenciasRelacionadas` nas 45 certificações existentes.
- **Schema_gerado**: os `schema/json/*.json` são gerados dos schemas Zod em `lib/schema` por `npm run schema:gen`; mudar um campo começa no Zod.
- **Hub_de_jornadas**: nota hub nova (`tipo: hub`, `camada: journeys`) que indexa jornadas, competências e certificações ligadas.

## Requirements

### Requirement 1: Campos de relacionamento no schema de certificação

**User Story:** Como autor de certificação, quero campos `jornadasRelacionadas` e `competenciasRelacionadas`, para que a certificação declare a qual jornada e competência ela contribui.

#### Acceptance Criteria

1. THE schema Zod de `certificacao` em `lib/schema` SHALL ganhar `jornadasRelacionadas` e `competenciasRelacionadas` (arrays de link `[[id|Nome]]`, mesma forma dos campos relacionáveis existentes, opcionais com padrão vazio).
2. THE `npm run schema:gen` SHALL regenerar `schema/json/certificacao.json` e `npm run validate` SHALL continuar verde com as 45 notas existentes (campos ausentes valem vazio).
3. WHEN uma nota de certificação usa os campos, THE check de links SHALL validar que o alvo existe (entidade YAML de jornada ou competência); se o resolvedor atual não cobrir entidades YAML como alvo, THEN a spec registra a extensão mínima do resolvedor como tarefa bloqueante antes do backfill.

### Requirement 2: Jornada e competência de segurança

**User Story:** Como pessoa construindo carreira em segurança, quero uma jornada e uma competência de segurança no mesmo formato das existentes, para que o caminho apareça junto dos outros caminhos de carreira.

#### Acceptance Criteria

1. THE `competencia_seguranca.yaml` SHALL existir com itens cobrindo: OWASP Top 10 e threat modeling, SAST/DAST/SCA e SBOM, IAM e segredos, resposta a incidente, ofensiva para defesa (CTF como laboratório).
2. THE `jornada_seguranca.yaml` SHALL existir com etapas cobrindo: fundamentos de referência (OWASP, MITRE ATT&CK), ferramentas por fase (recon, scanners, SCA), desenvolvimento seguro e resposta a incidente.
3. THE dois YAMLs SHALL seguir a forma dos existentes (`competencia_era_ia.yaml`, `jornada_system_design.yaml`) e passar nos checks de schema e ids.
4. THE jornada e a competência SHALL linkar (por referência textual ou link, conforme R1.3) as categorias `seguranca_codigo`, `seguranca_ofensiva`, `osint_recon`, `sca_resposta_cve` e `labs_ctf`, e os ids das notas citadas SHALL existir ao final desta spec ou da spec `seguranca-ofensiva-e-confiavel`.

### Requirement 3: Backfill das certificações existentes

**User Story:** Como pessoa escolhendo certificação, quero ver na nota a jornada e a competência que ela atende, para que a escolha de estudo se conecte ao meu plano de carreira.

#### Acceptance Criteria

1. THE 45 certificações existentes SHALL ganhar `jornadasRelacionadas` e `competenciasRelacionadas` preenchidos; vazio é legítimo e a auditoria lista quais ficaram vazias e por quê.
2. THE certificações de segurança existentes (cissp, comptia_security_plus, cks) SHALL linkar `competencia_seguranca` e a `jornada_seguranca`.
3. THE certificações técnicas de nuvem e dados SHALL linkar as jornadas/competências cujo escopo realmente cobre o tema (sem inventar correspondência); onde não houver jornada correspondente, o campo fica vazio e o hub registra a lacuna.
4. WHEN um link é adicionado, THEN a `categoriasRelacionadas` existente permanece inalterada.

### Requirement 4: Certificações novas de segurança e arquitetura

**User Story:** Como pessoa de segurança, quero as certificações do domínio no catálogo com verificação, para que o kit cubra tanto a parte técnica quanto a de gestão de segurança.

#### Acceptance Criteria

1. THE certificações novas SHALL existir com nota no formato vigente: `oscp`, `ceh`, `ejpt`, `csslp`, `giac_gcih`, `giac_gweb`, `aws_security_specialty`, `microsoft_az_500`, `ccsp`, `cisa`.
2. THE cada certificação nova SHALL ter `dataVerificacao`, `urlOficial` e preço `não verificado` quando não publicado pela fonte oficial.
3. THE certificações novas de segurança SHALL linkar `competencia_seguranca`, `jornada_seguranca` e as categorias da spec `seguranca-ofensiva-e-confiavel` (`seguranca_ofensiva`, `sca_resposta_cve`, `labs_ctf` conforme o escopo de cada exame).
4. THE cisa e ccsp SHALL linkar competências de gestão (fundamentos, soft skills) quando aplicável.

### Requirement 5: Hub de jornadas e competências

**User Story:** Como pessoa navegando o kit, quero um hub que liste jornadas, competências e as certificações ligadas a cada uma, para que eu veja o mapa de carreira inteiro.

#### Acceptance Criteria

1. THE `hub_journeys` SHALL existir (`tipo: hub`, `camada: journeys`) listando as 7 jornadas e as 5 competências, com as certificações e guias ligados a cada uma.
2. THE hub SHALL registrar como lacuna toda jornada/competência sem certificação ligada e toda certificação sem jornada/competência.
3. THE `hub_certifications` e o `hub_guides` SHALL apontar para `hub_journeys`.
4. THE ids novos (hub, YAMLs, certificações) SHALL entrar em `content/ids.lock.json` sem remoções.

### Requirement 6: Render no site

**User Story:** Como leitor do site, quero ver os relacionamentos novos na página da certificação, para que o dado não fique invisível.

#### Acceptance Criteria

1. THE implementação SHALL verificar onde o template de certificação renderiza (`site/src/render/entity.ts`, `layers.ts`) e incluir os novos campos apenas se o template itera campos relacionáveis sem código extra.
2. IF incluir os campos exigir render novo, THEN a mudança fica fora desta spec e registrada como pendência em `docs/`.

### Requirement 7: Governança

**User Story:** Como dono do repositório, quero a integração entregue com os controles vigentes, para que nada de preço inventado ou link quebrado entre.

#### Acceptance Criteria

1. THE entrega SHALL ser um único PR com um commit por fase em Conventional Commits; `npm run validate`, `npm test`, `npm run build` e `npm run smoke` verdes ao fim de cada fase.
2. THE nenhum preço é estimado ou convertido; o check de termos públicos e o gitleaks reportam zero ocorrências.
3. THE links para entidades YAML (jornadas/competências) SHALL passar no check de links; se R1.3 exigir extensão do resolvedor, a extensão é a primeira tarefa de implementação.
