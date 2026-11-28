# Requirements Document

## Introduction

Esta spec dá à segurança o mesmo tratamento que o resto do catálogo: ferramentas com nota, categorias com faixas reais, padrões e fundamentos com fonte, e um caminho prático rastreável. A revisão que a motivou mediu, em novembro de 2026:

- A camada de **fluxos** já é sólida: a demanda `seguranca.yaml` existe com `tec_cvss`, `tec_devsecops` e `tec_patch_virtual`, e os guias `proteger_codigo_dependencias_segredos` e `responder_incidente` existem.
- A camada de **catálogo** é estreita: `seguranca_codigo` tem 3 notas; o backlog tem rows sem nota (burp-suite, owasp-zap, nuclei, semgrep-oss, snyk, trivy, grype, syft, osv-scanner, wireshark, mitmproxy, scrapy, crawl4ai) e os domínios pedidos não têm nem row: ofensiva (nmap, metasploit, sqlmap, hashcat, ghidra, ffuf), OSINT (shodan, amass, theHarvester, maltego), crawlers/proxies residenciais como categoria e labs de CTF (HackTheBox, TryHackMe, picoCTF, PortSwigger Academy).
- **Patterns** cobrem resiliência, mas nada de segurança aplicada (rate limiting, defense in depth, zero trust, least privilege, fail secure).
- **Fundamentals** não têm OWASP Top 10, MITRE ATT&CK, threat modeling, SAST/DAST/SCA nem SBOM.
- **CVEs** não aparecem em nenhum lugar estruturado, apesar de `tec_cvss` existir no guia.

Prioridades: **P0** categorias de ferramenta com notas (ofensiva, OSINT, scraping/proxies, SCA/CVE, labs CTF); **P1** padrões de segurança, fundamentos e classes de vulnerabilidade com CVE-caso; **P2** o guia prático de auditoria de CVEs.

### Divisão de posse com a spec `expandir-catalogo-ferramentas`

As duas specs se sobrepõem em snyk, trivy e semgrep-oss. Decisão: **esta spec é dona das notas SCA/ofensivas** (snyk, trivy, semgrep-oss, osv-scanner, grype, syft); a spec anterior mantém sonarqube (qualidade, em `seguranca_codigo`), helm e argo_cd (entrega). A `tasks.md` da spec anterior é ajustada num commit de coordenação antes de qualquer uma das duas executar.

### Fora de escopo

- Novas demandas no guia (`content/guide/demandas/`) e novas técnicas em `catalogos/tecnicas.yaml`: a demanda `seguranca` e as técnicas `tec_cvss`, `tec_devsecops`, `tec_patch_virtual` já cobrem o fluxo; esta spec enche o catálogo por trás delas.
- Certificações de segurança (OSCP, CEH, GIAC...), jornada e competência de segurança: spec `certificacoes-jornadas-competencias`.
- Payloads operacionais ou runbooks de ataque: as notas de ofensiva usam enquadramento defensivo (como o OWASP), citando a técnica e a contramedida.
- Lista estática de "CVEs da semana": apodrece; a nota aponta a fonte viva (NVD/OSV) e usa CVEs canônicos como caso de estudo.

## Glossary

- **Abordagem**: tipo de nota de fundamentals para referências de metodologia (precedente: `guia_de_escolha_de_licenca`).
- **Classe_de_vulnerabilidade**: fraqueza recorrente (SQL injection, XSS, SSRF, desserialização, prototype pollution, supply chain) documentada como nota com: descrição, contramedidas, ecossistemas afetados e CVEs canônicos como caso.
- **CVE_caso**: CVE citado como exemplo didático de uma classe, com versões vulneráveis, versão de correção, fonte NVD/OSV e data de verificação; nunca como boletim corrente.
- **SAST/DAST/SCA**: análise estática de código, teste dinâmico de aplicação e análise de composição de dependências.
- **SBOM**: inventário de componentes do software (syft/grype, OSV-Scanner, Trivy).
- **OSINT**: coleta de informação pública para mapear superfície de ataque (shodan, amass, theHarvester, maltego).
- **CTF**: competição de segurança usada como laboratório de aprendizado (HackTheBox, TryHackMe, picoCTF, PortSwigger Academy).
- **Row / Faixa / tabela:**: mesmos significados da spec `expandir-catalogo-ferramentas`.

## Requirements

### Requirement 1: Cinco categorias de ferramenta de segurança (P0)

**User Story:** Como pessoa de segurança ou dev que quer se defender, quero categorias com opções reais para ofensiva, OSINT, scraping/proxies, SCA/CVE e laboratórios CTF, para que a segurança do kit deixe de ser só análise de código.

#### Acceptance Criteria

1. THE categoria `seguranca_ofensiva` (grupo Desenvolvimento e entrega) SHALL existir com as notas: `nmap`, `metasploit`, `sqlmap`, `hashcat`, `ghidra`, `ffuf`, `nuclei`, `burp_suite`, `owasp_zap`, `wireshark`.
2. THE categoria `osint_recon` (grupo Desenvolvimento e entrega) SHALL existir com as notas: `shodan`, `amass`, `the_harvester`, `maltego`, `recon_ng`.
3. THE categoria `web_scraping_proxies` (grupo Desenvolvimento e entrega) SHALL existir com as notas: `scrapy`, `crawl4ai`, `mitmproxy`, e SHALL referenciar `bright_data_mcp` (nota existente em `mcp_navegador_testes`) sem duplicá-la.
4. THE categoria `sca_resposta_cve` (grupo Desenvolvimento e entrega) SHALL existir com as notas: `osv_scanner`, `trivy`, `grype`, `syft`, `snyk`, `semgrep_oss`, `renovate`, `dependabot`.
5. THE categoria `labs_ctf` (grupo Sites úteis) SHALL existir com as notas: `hackthebox`, `tryhackme`, `pico_ctf`, `portswigger_academy`, e SHALL referenciar `ctf_skills` (nota existente em `skills_seguranca`) sem duplicá-la.
6. THE cada categoria nova SHALL ter as três faixas preenchidas (mais barata, melhor custo-benefício, qualidade máxima), registrando `excecao` para faixa sem sentido.
7. WHERE a ferramenta já tem row, THE faixa SHALL trocar `tabela:id` por `[[id|Nome]]`; WHERE a ferramenta é nova, THE row SHALL existir antes da nota (Requisito 2).
8. THE notas de ataque SHALL ser escritas em enquadramento defensivo: o que a técnica explora e qual contramedida a neutraliza, sem payload operacional pronto.

### Requirement 2: Backlog sem buracos de segurança

**User Story:** Como mantenedor, quero rows verificadas para os essenciais de segurança que hoje não têm nem row, para que a lacuna pare de ser invisível.

#### Acceptance Criteria

1. THE backlog SHALL ganhar rows com url, preço com status e data para: `nmap`, `metasploit`, `sqlmap`, `hashcat`, `ghidra`, `ffuf`, `shodan`, `amass`, `the_harvester`, `maltego`, `recon_ng`, `hackthebox`, `tryhackme`, `pico_ctf`, `portswigger_academy`, `renovate`, `dependabot`, `bright_data`.
2. THE rows novas SHALL passar no check `schema` (ids únicos entre shards) e ser referenciadas nas categorias competentes no mesmo commit.

### Requirement 3: Padrões de segurança aplicada (P1)

**User Story:** Como arquiteto, quero padrões de segurança no mesmo nível dos padrões de resiliência, para que a defesa entre no design e não só no checklist.

#### Acceptance Criteria

1. THE patterns novos SHALL existir com `tipo: padrao` seguindo o template vigente (problema, tradeoffs, consequências, quando usar/evitar, `padroesRelacionados`, `ferramentas`): `rate_limiter`, `defense_in_depth`, `zero_trust`, `least_privilege`, `fail_secure`, `tokenizacao_pii`.
2. THE cada pattern novo SHALL citar fonte oficial (OWASP Cheat Sheets, NIST) com data de verificação.
3. THE `hub_patterns` SHALL listar os novos padrões e cada um SHALL ligar as ferramentas do catálogo que o implementam e os padrões vizinhos (ex.: `rate_limiter` com `backpressure` e o WAF de `web_scraping_proxies`).

### Requirement 4: Fundamentos de segurança (P1)

**User Story:** Como pessoa aprendendo segurança, quero notas de referência com fonte para OWASP Top 10, MITRE ATT&CK, threat modeling e as siglas do pipeline, para que eu entenda o vocabulário antes das ferramentas.

#### Acceptance Criteria

1. THE fundamentals SHALL ganhar as notas `tipo: abordagem`: `owasp_top_10`, `mitre_attack`, `threat_modeling_stride`, `sast_dast_sca`, `sbom_provenance`.
2. THE notas SHALL morar em `content/pt-BR/fundamentals/seguranca/` e o `hub_fundamentals` SHALL listar a seção.
3. THE `threat_modeling_stride` SHALL conectar com a forma de registrar ameaça em ADR usada pela demanda de segurança, e `sast_dast_sca` SHALL apontar as notas do Requisito 1.

### Requirement 5: Classes de vulnerabilidade com CVE-caso (P1)

**User Story:** Como dev, quero entender por ecossistema as classes de vulnerabilidade que atingem a minha stack, com o CVE canônico como caso de estudo, para que eu reconheça o padrão e saiba a contramedida.

#### Acceptance Criteria

1. THE fundamentals SHALL ganhar as notas de classe `tipo: abordagem`: `sql_injection`, `xss`, `ssrf`, `desserializacao`, `prototype_pollution`, `supply_chain`.
2. THE cada nota de classe SHALL conter: descrição, contramedidas, ecossistemas afetados e de 1 a 3 CVEs canônicos com id CVE, versões vulneráveis e versão de correção, fonte NVD/OSV e `dataVerificacao`.
3. THE `desserializacao` SHALL usar Log4Shell (CVE-2021-44228) e Struts2 (CVE-2017-5638) como casos JVM; `prototype_pollution` SHALL usar lodash (CVE-2019-10744); `supply_chain` SHALL usar xz (CVE-2024-3094) e event-stream.
4. THE classe SHALL apontar a fonte viva (NVD/OSV) como caminho contínuo de atualização, sem prometer lista corrente.

### Requirement 6: Guia prático de auditoria de CVEs (P2)

**User Story:** Como dev, quero um guia prático de auditar CVEs das dependências do meu projeto, para que o kit me diga como agir quando o scanner aponta uma vulnerabilidade.

#### Acceptance Criteria

1. THE guia `auditar_cves_dependencias` SHALL existir em `content/pt-BR/guides/` na mesma forma dos guias existentes (sigla, descrição, quando usar/evitar, fontes revisadas, passos).
2. THE passos do guia SHALL cobrir: inventário de dependências com SBOM, SCA contínuo no CI, triagem por severidade CVSS e explorabilidade, patch com `tec_patch_virtual` como ponte, verificação e regressão.
3. THE guia SHALL ligar o guia `proteger_codigo_dependencias_segredos`, a demanda de segurança e as notas de `sca_resposta_cve`, e os ids dos passos SHALL entrar em `content/ids.lock.json` na seção guides.
4. THE guia SHALL citar `tec_cvss` como técnica da pontuação já usada pela demanda.

### Requirement 7: Coordenação com a spec `expandir-catalogo-ferramentas`

**User Story:** Como mantenedor das duas specs, quero uma divisão de posse sem duplicação, para que nenhuma ferramenta ganhe nota duas vezes.

#### Acceptance Criteria

1. THE tasks da spec `expandir-catalogo-ferramentas` SHALL ser ajustadas no primeiro commit desta spec: snyk, trivy e semgrep-oss saem de lá e ficam aqui; sonarqube, helm e argo_cd ficam lá.
2. THE ids das duas specs SHALL ser disjuntos no merge final.
3. IF uma nota for reivindicada pelas duas specs, THEN a nota existente prevalece e a duplicata é removida no PR.

### Requirement 8: Qualidade e governança

**User Story:** Como dono do repositório público, quero a expansão de segurança com os mesmos controles, para que nada de sensível ou sem fonte entre no kit.

#### Acceptance Criteria

1. THE entrega SHALL ser um único PR com um commit por fase em Conventional Commits, e `npm run validate`, `npm test`, `npm run build` e `npm run smoke` verdes ao fim de cada fase.
2. THE `content/ids.lock.json` SHALL apenas crescer; o check de termos públicos e o gitleaks SHALL reportar zero ocorrências.
3. THE notas de produto comercial (snyk, burp, bright data, plataformas CTF) SHALL registrar o plano gratuito verificável e `não verificado` para o que não tiver preço público.
4. THE notas novas SHALL nascer `status: rascunho` e `publico: false`.
