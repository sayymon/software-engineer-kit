# Implementation Plan

## Overview

Plano de 5 fases em um único PR na branch `feat/seguranca-ofensiva-e-confiavel`, criada a partir da `main`. A fase 0 é o commit de coordenação com a spec `expandir-catalogo-ferramentas` (antes de qualquer uma das duas executar). Ao fim de cada fase, `npm run validate` e `npm test` passam e o `content/ids.lock.json` já contém os ids criados na fase.

Convenções:

- Nota de ferramenta no padrão de `axum.md` (open-source: `precoUSD: 0`, licença lida na data) e nota comercial no padrão de `comptia_security_plus.md` (`não verificado` quando o preço não é público).
- Toda nota nova de ferramenta exige nota de empresa em `tools/companies/` (padrão `<id>_comunidade` quando mantida pela comunidade).
- Faixa que ganha nota troca `tabela:id` por `[[id|Nome]]` no mesmo commit; row com hífen vira nota com underscore.
- Notas de ofensiva em enquadramento defensivo (R1.8); nada de payload operacional.
- Notas de fundamentals seguem o template de `guia_de_escolha_de_licenca.md`; patterns seguem o de `bulkhead.md`; guia segue o de `proteger_codigo_dependencias_segredos.md`.

## Tasks

### Fase 0: coordenação entre specs

- [ ] 0.1 Ajustar a `tasks.md` da spec `expandir-catalogo-ferramentas`: remover snyk, trivy e semgrep_oss da tarefa 3.2 (sonarqube, helm e argo_cd ficam), e registrar a transferência nas Notes dela
  - commit `docs(specs): divide posse de notas de seguranca entre as specs`
  - _Requisitos: 7.1, 7.2_

### Fase 1: rows e categorias

- [ ] 1.1 Adicionar as 18 rows ao backlog: `nmap`, `metasploit`, `sqlmap`, `hashcat`, `ghidra`, `ffuf`, `shodan`, `amass`, `the-harvester`, `maltego`, `recon-ng`, `hackthebox`, `tryhackme`, `pico-ctf`, `portswigger-academy`, `renovate`, `dependabot`, `bright-data`
  - url oficial, preço com status `verificado` quando público, data do dia
  - _Requisitos: 2.1, 2.2_
- [ ] 1.2 Criar as 5 categorias (`seguranca_ofensiva`, `osint_recon`, `web_scraping_proxies`, `sca_resposta_cve`, `labs_ctf`) com faixas, `status: rascunho`, `publico: false`, referências às rows e aos grupos do design
  - _Requisitos: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_
- [ ] 1.3 Commit `feat(catalogo): categorias de ofensiva osint scraping sca e ctf`
  - _Requisitos: 8.1_

### Fase 2: notas de ferramenta

- [ ] 2.1 `seguranca_ofensiva`: notas de `nmap`, `metasploit`, `sqlmap`, `hashcat`, `ghidra`, `ffuf`, `nuclei`, `burp_suite`, `owasp_zap`, `wireshark`, cada uma com contramedida citada no corpo
  - _Requisitos: 1.1, 1.7, 1.8, 8.3_
- [ ] 2.2 `osint_recon`: notas de `shodan`, `amass`, `the_harvester`, `maltego`, `recon_ng`
  - _Requisitos: 1.2, 1.7_
- [ ] 2.3 `web_scraping_proxies`: notas de `scrapy`, `crawl4ai`, `mitmproxy` com `bright_data_mcp` referenciado por link
  - _Requisitos: 1.3_
- [ ] 2.4 `sca_resposta_cve`: notas de `osv_scanner`, `trivy`, `grype`, `syft`, `snyk`, `semgrep_oss`, `renovate`, `dependabot`
  - _Requisitos: 1.4, 1.7_
- [ ] 2.5 `labs_ctf`: notas de `hackthebox`, `tryhackme`, `pico_ctf`, `portswigger_academy` com `ctf_skills` referenciado por link
  - _Requisitos: 1.5_
- [ ] 2.6 Converter as faixas das 5 categorias (`tabela:` -> `[[...]]`) e commit `feat(catalogo): notas de ofensiva osint scraping sca e ctf`
  - _Requisitos: 1.7, 8.1_

### Fase 3: padrões e fundamentos

- [ ] 3.1 Patterns: `rate_limiter`, `defense_in_depth`, `zero_trust`, `least_privilege`, `fail_secure`, `tokenizacao_pii` com problema, tradeoffs, consequências, fontes OWASP/NIST revisadas e `padroesRelacionados` cruzando com resiliência (backpressure, bulkhead) e ferramentas
  - _Requisitos: 3.1, 3.2, 3.3_
- [ ] 3.2 Fundamentals em `fundamentals/seguranca/`: `owasp_top_10`, `mitre_attack`, `threat_modeling_stride`, `sast_dast_sca`, `sbom_provenance`; seção nova no `hub_fundamentals`
  - _Requisitos: 4.1, 4.2, 4.3_
- [ ] 3.3 Commit `feat(fundamentals): padroes e abordagens de seguranca`
  - _Requisitos: 8.1_

### Fase 4: classes de vulnerabilidade

- [ ] 4.1 Notas de classe: `sql_injection`, `xss`, `ssrf`, `desserializacao`, `prototype_pollution`, `supply_chain`, cada uma com contramedidas, ecossistemas afetados e CVEs canônicos (Log4Shell e Struts2 em `desserializacao`; lodash em `prototype_pollution`; xz e event-stream em `supply_chain`) com fonte NVD/OSV e `dataVerificacao`
  - _Requisitos: 5.1, 5.2, 5.3, 5.4_
- [ ] 4.2 Commit `feat(fundamentals): classes de vulnerabilidade com cve caso`
  - _Requisitos: 8.1_

### Fase 5: guia de auditoria de CVEs e governança

- [ ] 5.1 Criar o guia `auditar_cves_dependencias` na forma dos guias existentes, com passos de inventário SBOM, SCA no CI, triagem CVSS/explorabilidade, patch com `tec_patch_virtual`, verificação e regressão; fontes revisadas; ids dos passos em `content/ids.lock.json` (seção guides)
  - _Requisitos: 6.1, 6.2, 6.3, 6.4_
- [ ] 5.2 Ligar o guia com `proteger_codigo_dependencias_segredos`, a demanda `seguranca` e as notas de `sca_resposta_cve`; seção Relacionamentos das categorias apontando a demanda
  - _Requisitos: 6.3_
- [ ] 5.3 Varrer ids contra a spec `expandir-catalogo-ferramentas` (disjunção, R7.2); rodar `npm run validate`, `npm test`, `npm run build`, `npm run smoke`; conferir termos públicos e gitleaks zerados; commit final `feat(guias): auditoria de cves das dependencias`
  - _Requisitos: 7.2, 8.1, 8.2_
- [ ] 5.4 Abrir o PR único com a matriz de posse na descrição e aguardar checks e revisão humana
  - _Requisitos: 8.1_

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["0.1"] },
    { "id": 1, "tasks": ["1.1"] },
    { "id": 2, "tasks": ["1.2", "1.3"] },
    { "id": 3, "tasks": ["2.1", "2.2", "2.3", "2.4", "2.5"] },
    { "id": 4, "tasks": ["2.6"] },
    { "id": 5, "tasks": ["3.1", "3.2"] },
    { "id": 6, "tasks": ["3.3"] },
    { "id": 7, "tasks": ["4.1", "4.2"] },
    { "id": 8, "tasks": ["5.1", "5.2"] },
    { "id": 9, "tasks": ["5.3"] },
    { "id": 10, "tasks": ["5.4"] }
  ]
}
```

## Notes

- **Fase 0 primeiro:** o ajuste da outra spec sai antes de qualquer código para que a revisão dela já veja a posse final.
- **CVEs canônicos:** as versões citadas são as da correção publicada pelo projeto afetado (Log4j 2.15.0, Spring 5.2.20/5.3.18, lodash 4.17.12, Apache 2.4.51); cada citação leva link de NVD/OSV e data de verificação.
- **Preços:** nmap, sqlmap, ghidra, nuclei, osv-scanner, grype, syft, renovate são open-source; burp, snyk, shodan, maltego, bright data, HTB/THM têm plano gratuito verificável; o resto do preço fica `não verificado`.
- **Contagem final esperada:** 30 notas de ferramenta, 5 categorias, 18 rows, 6 patterns, 11 notas de fundamentals, 1 guia, cerca de 15 empresas novas em `tools/companies/`.
- **Ordem com a spec de certificações:** esta spec cria as categorias que a spec `certificacoes-jornadas-competencias` linka nas certificações novas; executar esta antes evita links para entidades inexistentes.
