---
id: sonarqube
tipo: ferramenta
nome: SonarQube
tipos:
  - SOFTWARE
  - SAAS
empresa: "[[sonar_source_sarl|SonarSource Sàrl]]"
aliases:
  - SonarQube
categorias:
  - "[[seguranca_codigo|Segurança de código]]"
funcionalidades: []
casosDeUso:
  - "[[seguranca_de_codigo_e_dependencias|Segurança de código e dependências]]"
modelos: []
modeloContratacao:
  - open-source
  - free
  - subscription
  - enterprise
precoUSD: 34
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
  - planos pagos cobrados por linhas de código (LOC), não por usuário
  - análise de branch e de pull request só nas edições comerciais; a Community Build não inclui
dataVerificacao: 2026-11-27
fontePreco: https://www.sonarsource.com/plans-and-pricing/
precoMedio: 34
licenca:
  - LGPL-3.0-only
tags:
  - ferramenta
  - seguranca-codigo
---
# SonarQube
## 📋 Informações Básicas
- **Tipos:** SOFTWARE, SAAS
- **Empresa/Fabricante:** [[sonar_source_sarl|SonarSource Sàrl]]
- **Website:** https://www.sonarsource.com/products/sonarqube/
- **Categorias:** [[seguranca_codigo|Segurança de código]]
- **Modelo de contratação:** open-source, free, subscription, enterprise
- **Preço (USD):** Community Build gratuita (LGPL-3.0); planos pagos a partir de $34/mês (Team, até 100k LOC); Enterprise sob consulta (página oficial lida em 2026-11-27)
- **Data de verificação:** 2026-11-27
- **Fonte do preço:** https://www.sonarsource.com/plans-and-pricing/
## 📝 Descrição
Plataforma de verificação contínua de código: análise estática que encontra bugs, vulnerabilidades e hotspots de segurança em mais de 40 linguagens. O repositório open-source guarda o Community Build (edição gratuita); as edições comerciais SonarQube Server (self-hosted) e SonarQube Cloud (SaaS) adicionam SCA, SAST avançado, análise de branch e pull request e relatórios de compliance.
## ⏰ Quando Utilizar
- Outra opção na faixa melhor custo-benefício em [[seguranca_codigo|Segurança de código]].
- Quality gates automáticos em cada pull request, quando o time quer qualidade e segurança verificadas antes do merge.
- Análise self-hosted sem custo de licença: a Community Build é gratuita e open-source.
### Quando NÃO utilizar
- Quando o alvo é apenas detectar segredos em repositórios Git: [[gitleaks|Gitleaks (ferramenta)]] resolve gratuito.
- Quando SCA de dependências é o foco principal: no SonarQube faz parte do add-on comercial Advanced Security; compare com [[snyk|Snyk]] e [[trivy|Trivy]].
- Quando suporte dedicado e SLA são requisito no plano de entrada: suporte comercial consta apenas em planos Enterprise (sob consulta).
## 🖥 Compatibilidade e Plataformas
- **Plataformas:** cli, web
- **Linguagens:** agnostica
- **Porte:** pessoa-fisica, pequena, media, grande
- **Segmentos:** geral
## 🔒 Restrições e Especificações
- planos pagos cobrados por linhas de código (LOC), não por usuário
- análise de branch e de pull request só nas edições comerciais; a Community Build não inclui
## 🆚 Alternativas
- [[snyk|Snyk]]
- [[github_advanced_security|GitHub Advanced Security]]
- [[veracode|Veracode]]
- [[trivy|Trivy]]
- [[gitleaks|Gitleaks (ferramenta)]]
- Checkmarx
- Sonatype
- Semgrep OSS
## 💰 Custo e Contratação
- Community Build gratuita, licença LGPL-3.0 (repositório oficial lido em 2026-11-27)
- Plano Free (Cloud) para projetos privados até 50k LOC; plano Team a partir de $34/mês (até 100k LOC); plano Enterprise sob consulta; SonarQube Server nas edições Developer, Enterprise e Data Center, por instância/ano por LOC, sob consulta
- **Fonte:** https://www.sonarsource.com/plans-and-pricing/
## 📚 Documentação
- https://docs.sonarsource.com/
## 🔗 Relacionamentos
- **Empresa:** [[sonar_source_sarl|SonarSource Sàrl]]
- **Categorias:** [[seguranca_codigo|Segurança de código]]
- **Casos de uso:** [[seguranca_de_codigo_e_dependencias|Segurança de código e dependências]]
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
