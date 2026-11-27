# Design Document

## Overview

A camada de fluxos já cobre segurança (demanda `seguranca`, `tec_cvss`, `tec_devsecops`, `tec_patch_virtual`); esta spec enche as camadas de baixo: ferramentas, padrões, fundamentos e um guia prático. O desenho inteiro reusa os contratos vigentes: nota por Template-Ferramenta, categoria com faixas, row no backlog, pattern com problema/tradeoffs/consequências, abordagem para metodologia, guia com fontes revisadas e lock de ids.

### Matriz de posse (evita duplicação entre specs)

| Nota | Espec `expandir-catalogo-ferramentas` | Esta spec |
|---|---|---|
| snyk, trivy, semgrep_oss, osv_scanner, grype, syft | não (transferidas) | dona, em `sca_resposta_cve` |
| sonarqube, helm, argo_cd | dona (qualidade/entrega) | não |
| nuclei, owasp_zap, burp_suite, wireshark, mitmproxy, scrapy, crawl4ai | não | dona, rows convertidas |

### Mapa categorias -> notas -> origem

| Categoria | Grupo | Notas | Origem |
|---|---|---|---|
| `seguranca_ofensiva` | Desenvolvimento e entrega | nmap, metasploit, sqlmap, hashcat, ghidra, ffuf, nuclei, burp_suite, owasp_zap, wireshark | rows novas + rows existentes |
| `osint_recon` | Desenvolvimento e entrega | shodan, amass, the_harvester, maltego, recon_ng | rows novas |
| `web_scraping_proxies` | Desenvolvimento e entrega | scrapy, crawl4ai, mitmproxy + referência a `bright_data_mcp` | rows existentes + nota existente |
| `sca_resposta_cve` | Desenvolvimento e entrega | osv_scanner, trivy, grype, syft, snyk, semgrep_oss, renovate, dependabot | rows existentes + rows novas |
| `labs_ctf` | Sites úteis | hackthebox, tryhackme, pico_ctf, portswigger_academy + referência a `ctf_skills` | rows novas + nota existente |

### Decisões de design

| # | Decisão | Alternativas consideradas | Motivo |
|---|---|---|---|
| D1 | Conceitos de segurança como `tipo: abordagem` em `fundamentals/seguranca/` | (a) tipo novo `conceito`; (b) técnicas no `tecnicas.yaml` do guia | Precedente: `guia_de_escolha_de_licenca` é abordagem. Tipo novo mexe em `lib/schema` e no manifest sem ganho. `tecnicas.yaml` é vocabulário dos fluxos, não pousa referência de leitura |
| D2 | CVEs como caso de estudo da classe, com versões e correção citadas | Lista corrente de CVEs por linguagem | "Dados com fonte e data"; lista corrente apodrece entre builds. A nota aponta NVD/OSV como fonte viva e o guia R6 ensina a auditá-la |
| D3 | Categorias de ofensiva/OSINT/SCA no grupo "Desenvolvimento e entrega" (mesma casa de `seguranca_codigo`); labs CTF em "Sites úteis" (mesma casa de `aprendizado_cursos`) | Grupos novos | Evita mexer no vocabulário de grupos do `hub_tools`; a semântica já existe |
| D4 | Enquadramento defensivo nas notas ofensivas (o que explora + contramedida), sem payloads prontos | Notas técnicas de exploração passo a passo | O kit é público; OWASP e MITRE documentam assim; nada operacionalmente sensível |
| D5 | `bright_data_mcp` e `ctf_skills` são referenciados, nunca duplicados | Duplicar em nota própria | "Um conceito, uma nota, um tipo"; a categorização nova usa links |
| D6 | Guia novo `auditar_cves_dependencias` em vez de engordar `proteger_codigo_dependencias_segredos` | Editar o guia existente | O guia existente tem escopo próprio (proteção no ciclo); os passos de guias vivem no `ids.lock.json` e guia novo não toca nos ids congelados |
| D7 | Patterns de segurança no mesmo `hub_patterns` dos de resiliência, com `padroesRelacionados` cruzando os dois | Hub separado de segurança | O grafo ganha as arestas de graça; separar criaria ilha |
| D8 | Renovate e Dependabot como rows/notes de `sca_resposta_cve` | Tratar só de scanners | A resposta a CVE é pipeline: detectar (SCA), triar (CVSS), corrigir (update automático) e pontear (`tec_patch_virtual`) |

### Encaixe com a demanda de segurança

- `tec_cvss` (guia) -> fundamentos `sast_dast_sca` e guia `auditar_cves_dependencias`.
- `tec_patch_virtual` (guia) -> passo de ponte do guia novo.
- `tec_devsecops` (guia) -> as categorias `seguranca_codigo`, `sca_resposta_cve` e os patterns `defense_in_depth`, `least_privilege`.
- Demanda `seguranca.yaml` -> a seção Relacionamentos das categorias novas aponta o fluxo.

### Referências

- `content/pt-BR/fundamentals/patterns/bulkhead.md` (template de pattern: problema, tradeoffs, consequências, fontes revisadas).
- `content/pt-BR/fundamentals/licenses/guia_de_escolha_de_licenca.md` (precedente de `tipo: abordagem`).
- `content/pt-BR/guides/proteger_codigo_dependencias_segredos.md` (fonte OWASP/NIST já citadas; mesmo formato de guia).
- `content/guide/demandas/seguranca.yaml` (fluxo que consome as técnicas).
- OWASP Cheat Sheet Series, MITRE ATT&CK, NVD, OSV.dev (fontes oficiais a citar com data).

## Consequences

- O catálogo ganha ~30 notas e 5 categorias; fundamentals ganham 11 notas (5 referências + 6 classes) e uma seção nova no hub; patterns ganham 6; 1 guia prático novo.
- A segurança deixa de ser um subproduto de `seguranca_codigo` e passa a ter o ciclo completo: referência -> classe -> ferramenta -> pipeline -> resposta.
- A spec `expandir-catalogo-ferramentas` fica menor (perde 3 notas para cá) e sem sobreposição.
