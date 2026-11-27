---
id: snyk
tipo: ferramenta
nome: Snyk
tipos:
  - UTILITARIO
  - SAAS
empresa: "[[snyk_ltd|Snyk Ltd]]"
aliases:
  - Snyk
categorias:
  - "[[seguranca_codigo|Segurança de código]]"
funcionalidades: []
casosDeUso:
  - "[[seguranca_de_codigo_e_dependencias|Segurança de código e dependências]]"
modelos: []
modeloContratacao:
  - free
  - subscription
  - enterprise
precoUSD: 25
plataformas:
  - cli
  - web
linguagens:
  - agnostica
porte:
  - pessoa-fisica
  - pequena
  - media
  - grande
segmentos:
  - geral
restricoes:
  - "plano Free com 5 projetos e limites de testes por produto (ex.: Snyk Code 100 testes/mês)"
  - plano Enterprise cobrado por créditos pré-pagos (1 crédito = $1) com consumo por capacidade
dataVerificacao: 2026-11-27
fontePreco: https://snyk.io/plans/
precoMedio: 25
licenca:
  - Apache-2.0
tags:
  - ferramenta
  - seguranca-codigo
---
# Snyk
## 📋 Informações Básicas
- **Tipos:** UTILITARIO, SAAS
- **Empresa/Fabricante:** [[snyk_ltd|Snyk Ltd]]
- **Website:** https://snyk.io
- **Categorias:** [[seguranca_codigo|Segurança de código]]
- **Modelo de contratação:** free, subscription, enterprise
- **Preço (USD):** Free $0/mês; Team a partir de $25/mês (times de até 10 desenvolvedores); Enterprise sob consulta por créditos (página oficial lida em 2026-11-27)
- **Data de verificação:** 2026-11-27
- **Fonte do preço:** https://snyk.io/plans/
## 📝 Descrição
Plataforma comercial de segurança de código (SAST, SCA, container, IaC, DAST e segredos) com plano free para desenvolvedores e integrações de IDE, CLI e repositório. O CLI oficial é open-source; a plataforma opera como SaaS.
## ⏰ Quando Utilizar
- Outra opção na faixa melhor custo-benefício em [[seguranca_codigo|Segurança de código]].
- Correção orientada a desenvolvedor: o Snyk aponta a vulnerabilidade na dependência e sugere o fix, dentro do fluxo de PR.
- Começar sem custo (plano Free) e escalar para times pagando por capacidade.
### Quando NÃO utilizar
- Quando o orçamento precisa ser zero sem limites de uso: [[trivy|Trivy]] e [[gitleaks|Gitleaks (ferramenta)]] são open-source gratuitos.
- Quando a exigência é análise estática self-hosted sem serviço externo: avaliar [[sonarqube|SonarQube]] Community Build.
- Quando a política do time proíbe envio de código ou metadados para SaaS de terceiros.
## 🖥 Compatibilidade e Plataformas
- **Plataformas:** cli, web
- **Linguagens:** agnostica
- **Porte:** pessoa-fisica, pequena, media, grande
- **Segmentos:** geral
## 🔒 Restrições e Especificações
- plano Free com 5 projetos e limites de testes por produto (ex.: Snyk Code 100 testes/mês)
- plano Enterprise cobrado por créditos pré-pagos (1 crédito = $1) com consumo por capacidade
## 🆚 Alternativas
- [[sonarqube|SonarQube]]
- [[github_advanced_security|GitHub Advanced Security]]
- [[veracode|Veracode]]
- [[trivy|Trivy]]
- [[gitleaks|Gitleaks (ferramenta)]]
- Checkmarx
- Sonatype
- Semgrep OSS
## 💰 Custo e Contratação
- Free $0/mês (até 5 projetos, limites de testes por produto); Team a partir de $25/mês (times de até 10 desenvolvedores, cobrança mensal); Enterprise sob consulta, cobrado por créditos (1 crédito = $1); mantenedores de open source podem aplicar para uso gratuito
- CLI oficial open-source, licença Apache-2.0 (repositório oficial lido em 2026-11-27); a plataforma SaaS é comercial
- **Fonte:** https://snyk.io/plans/
## 🔗 Relacionamentos
- **Empresa:** [[snyk_ltd|Snyk Ltd]]
- **Categorias:** [[seguranca_codigo|Segurança de código]]
- **Casos de uso:** [[seguranca_de_codigo_e_dependencias|Segurança de código e dependências]]
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
