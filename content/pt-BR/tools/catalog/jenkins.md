---
id: jenkins
tipo: ferramenta
nome: Jenkins
tipos:
  - SOFTWARE
empresa: "[[jenkins_comunidade|Jenkins (comunidade)]]"
aliases:
  - Jenkins
categorias:
  - "[[ci_cd_deploy|CI-CD e deploy]]"
funcionalidades: []
casosDeUso:
  - "[[pipelines_de_ci_e_cd|Pipelines de CI e CD]]"
modelos: []
modeloContratacao:
  - open-source
  - free
precoUSD: 0
plataformas:
  - web
  - self-hosted
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
  - servidor self-hosted gerenciado pela própria equipe, com instalação, upgrades e manutenção de plugins sob responsabilidade do time
dataVerificacao: 2026-11-27
fontePreco: https://github.com/jenkinsci/jenkins
precoMedio: 0
licenca:
  - MIT
tags:
  - ferramenta
  - ci-cd-deploy
---
# Jenkins
## 📋 Informações Básicas
- **Tipos:** SOFTWARE
- **Empresa/Fabricante:** [[jenkins_comunidade|Jenkins (comunidade)]]
- **Website:** https://www.jenkins.io
- **Categorias:** [[ci_cd_deploy|CI-CD e deploy]]
- **Modelo de contratação:** open-source, free
- **Preço (USD):** Gratuito, licença MIT (arquivo LICENSE.txt do repositório oficial lido em 2026-11-27)
- **Data de verificação:** 2026-11-27
- **Fonte do preço:** https://github.com/jenkinsci/jenkins
## 📝 Descrição
Servidor de automação open source self-hosted para CI/CD, com mais de 2.300 plugins mantidos pela comunidade que integram praticamente qualquer ferramenta da cadeia de integração e entrega contínua. Programa self-contained baseado em Java, com pacotes para Windows, Linux, macOS e outros Unix, distribuição de trabalho entre múltiplas máquinas e configuração por interface web (site oficial lido em 2026-11-27).
## ⏰ Quando Utilizar
- Outra opção na faixa mais barata em [[ci_cd_deploy|CI-CD e deploy]].
- Automatizar build, teste e deploy self-hosted sem custo de licença e com liberdade total de extensão via plugins.
- Distribuir execuções entre múltiplas máquinas para acelerar builds, testes e deploys em várias plataformas.
### Quando NÃO utilizar
- Quando o time quer CI/CD gerenciado sem infraestrutura própria: [[github_actions|GitHub Actions]] ou [[gitlab|GitLab]] eliminam o custo operacional do servidor.
- Quando a entrega alvo é GitOps declarativo em Kubernetes: [[argo_cd|Argo CD]] modela o deploy pelo estado no Git, sem scripts imperativos.
## 🖥 Compatibilidade e Plataformas
- **Plataformas:** web, self-hosted
- **Linguagens:** agnostica
- **Porte:** pessoa-fisica, pequena, media, grande
- **Segmentos:** geral
## 🔒 Restrições e Especificações
- servidor self-hosted gerenciado pela própria equipe, com instalação, upgrades e manutenção de plugins sob responsabilidade do time
## 🆚 Alternativas
- [[gitlab|GitLab]]
- [[github_actions|GitHub Actions]]
- [[woodpecker_ci|Woodpecker CI]]
- [[argo_cd|Argo CD]]
- [[harness|Harness]]
- Drone CI
- CircleCI
## 💰 Custo e Contratação
- Gratuito, licença MIT (arquivo LICENSE.txt do repositório oficial lido em 2026-11-27)
- **Fonte:** https://github.com/jenkinsci/jenkins
## 🔗 Relacionamentos
- **Empresa:** [[jenkins_comunidade|Jenkins (comunidade)]]
- **Categorias:** [[ci_cd_deploy|CI-CD e deploy]]
- **Casos de uso:** [[pipelines_de_ci_e_cd|Pipelines de CI e CD]]
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
