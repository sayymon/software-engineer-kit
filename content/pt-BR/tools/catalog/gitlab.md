---
id: gitlab
tipo: ferramenta
nome: GitLab
tipos:
  - PLATAFORMA
  - SAAS
empresa: "[[gitlab_inc|GitLab Inc]]"
aliases:
  - GitLab
categorias:
  - "[[ci_cd_deploy|CI-CD e deploy]]"
  - "[[controle_versao_colaboracao|Controle de versão e colaboração]]"
funcionalidades: []
casosDeUso:
  - "[[pipelines_de_ci_e_cd|Pipelines de CI e CD]]"
modelos: []
modeloContratacao:
  - open-source
  - free
  - subscription
  - enterprise
precoUSD: 29
plataformas:
  - web
  - self-hosted
  - cli
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
  - plano Free do GitLab.com limitado a 5 usuários por top-level group privado e 400 compute-minutes por mês
  - plano Ultimate com preço sob consulta, sem valor público
  - funcionalidades de IA do GitLab Duo cobradas à parte via add-on GitLab Credits
dataVerificacao: 2026-11-27
fontePreco: https://about.gitlab.com/pricing/
precoMedio: 29
licenca:
  - MIT
tags:
  - ferramenta
  - ci-cd-deploy
  - gitlab
---
# GitLab
## 📋 Informações Básicas
- **Tipos:** PLATAFORMA, SAAS
- **Empresa/Fabricante:** [[gitlab_inc|GitLab Inc]]
- **Website:** https://about.gitlab.com
- **Categorias:** [[ci_cd_deploy|CI-CD e deploy]], [[controle_versao_colaboracao|Controle de versão e colaboração]]
- **Modelo de contratação:** open-source, free, subscription, enterprise
- **Preço (USD):** Free $0; Premium $29/usuário/mês (cobrança anual); Ultimate e GitLab Dedicated sob consulta (página oficial lida em 2026-11-27)
- **Data de verificação:** 2026-11-27
- **Fonte do preço:** https://about.gitlab.com/pricing/
## 📝 Descrição
Plataforma DevSecOps que reúne hospedagem Git, gestão de projeto, CI/CD embutido, container registry e segurança de aplicação em uma única aplicação, disponível como SaaS (GitLab.com), self-managed (open core, com o core sob licença MIT) ou Dedicated (single-tenant gerenciado). A página oficial de preços registra os planos Free, Premium e Ultimate para GitLab.com e Self Managed, mais GitLab Dedicated para quem precisa de isolamento e residência de dados (página oficial lida em 2026-11-27).
## ⏰ Quando Utilizar
- Outra opção em [[ci_cd_deploy|CI-CD e deploy]] e [[controle_versao_colaboracao|Controle de versão e colaboração]].
- Consolidar repositório, issues, pipelines e segurança em uma só plataforma, sem costurar várias ferramentas.
- Rodar self-managed sem custo de licença: o plano Free self-managed é gratuito e o core do produto é open source (MIT).
### Quando NÃO utilizar
- Quando o repositório já vive em outra plataforma e só falta CI/CD: [[jenkins|Jenkins]] ou [[woodpecker_ci|Woodpecker CI]] atendem sem migrar a plataforma inteira.
- Quando a entrega alvo é GitOps declarativo em Kubernetes: [[argo_cd|Argo CD]] cobre o deploy dirigido pelo Git sem adotar a suíte completa.
- Quando os recursos corporativos e o suporte com SLA são imprescindíveis no plano de entrada: ficam em planos pagos (Premium ou superior).
## 🖥 Compatibilidade e Plataformas
- **Plataformas:** web, self-hosted, cli
- **Linguagens:** agnostica
- **Porte:** pessoa-fisica, pequena, media, grande
- **Segmentos:** geral
## 🔒 Restrições e Especificações
- plano Free do GitLab.com limitado a 5 usuários por top-level group privado e 400 compute-minutes por mês
- plano Ultimate com preço sob consulta, sem valor público
- funcionalidades de IA do GitLab Duo cobradas à parte via add-on GitLab Credits
## 🆚 Alternativas
- [[github|GitHub (ferramenta)]]
- [[github_actions|GitHub Actions]]
- [[jenkins|Jenkins]]
- [[argo_cd|Argo CD]]
- [[harness|Harness]]
- [[woodpecker_ci|Woodpecker CI]]
- Bitbucket
## 💰 Custo e Contratação
- Plano Free $0 (página oficial lida em 2026-11-27); core do produto open source sob licença MIT Expat, com o código EE sob licença própria (arquivo LICENSE do repositório oficial lido em 2026-11-27)
- Premium $29/usuário/mês, cobrança anual; Ultimate e GitLab Dedicated sob consulta
- **Fonte:** https://about.gitlab.com/pricing/
## 🔗 Relacionamentos
- **Empresa:** [[gitlab_inc|GitLab Inc]]
- **Categorias:** [[ci_cd_deploy|CI-CD e deploy]], [[controle_versao_colaboracao|Controle de versão e colaboração]]
- **Casos de uso:** [[pipelines_de_ci_e_cd|Pipelines de CI e CD]]
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
