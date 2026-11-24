---
id: pipelines_de_ci_e_cd
tipo: caso-de-uso
nome: Pipelines de CI e CD
aliases: []
descricao: Integrar, testar e entregar código em produção com pipelines confiáveis.
funcionalidadesNecessarias:
  - "[[automacao_de_workflow|Automação de workflow]]"
  - "[[integracao_de_apis|Integração de APIs]]"
  - "[[edicao_de_codebase|Edição de codebase]]"
  - "[[raciocinio|Raciocínio]]"
  - "[[deploy_gerenciado|Deploy gerenciado]]"
categoriasRelacionadas:
  - "[[ci_cd_deploy|CI-CD e deploy]]"
  - "[[revisao_codigo_pr|Revisão de código e PR]]"
  - "[[feature_flags_experimentacao|Feature flags e experimentação]]"
  - "[[paas_aplicacoes|PaaS de aplicações]]"
  - "[[build_lint_formatacao|Build, lint e formatação]]"
ferramentasRecomendadas:
  - "[[github_actions|GitHub Actions]]"
  - "[[github_copilot|GitHub Copilot]]"
  - "[[statsig|Statsig]]"
  - "[[render|Render]]"
  - "[[harness|Harness]]"
modelosRecomendados: []
criteriosDesempate:
  - custo
  - privacidade-de-dados
  - lock-in
criterioPadrao: custo
porte:
  - pessoa-fisica
  - pequena
  - media
  - grande
segmentos:
  - devops-infra
  - desenvolvimento-software
nicho: ""
nivel: caso
eixo: tarefa
macro: "[[infraestrutura_devops_e_seguranca|Infraestrutura, DevOps e segurança]]"
faixasPadrao:
  maisBarata:
    - "[[woodpecker_ci|Woodpecker CI]]"
    - tabela:jenkins
    - tabela:drone
  custoBeneficio:
    - "[[github_actions|GitHub Actions]]"
    - tabela:circleci
    - tabela:argo-cd
  qualidadeMaxima:
    - "[[harness|Harness]]"
    - tabela:buildkite
    - tabela:octopus-deploy
variacoes:
  - id: cicd-pipeline-build
    nome: Pipeline de build e teste
    descricao: Compilar, testar e publicar artefato a cada commit.
    funcionalidades:
      - "[[automacao_de_workflow|Automação de workflow]]"
      - "[[integracao_de_apis|Integração de APIs]]"
    herdaFerramentas: true
    parametros:
      - chave: Ambiente de execução
        valor: Runner hospedado ou próprio
        fonte: editorial
      - chave: Escala típica
        valor: Todo commit
        fonte: editorial
      - chave: Definição do pipeline
        valor: Arquivo YAML em .github/workflows no GitHub Actions
        fonte: https://docs.github.com/en/actions/writing-workflows/about-workflows
    verificadoEm: 2026-11-22
  - id: cicd-deploy-gitops
    nome: Entrega com GitOps
    descricao: Estado desejado em Git e sincronização automática.
    funcionalidades:
      - "[[automacao_de_workflow|Automação de workflow]]"
      - "[[integracao_de_apis|Integração de APIs]]"
    herdaFerramentas: false
    maisBarata:
      - tabela:argo-cd
      - "[[woodpecker_ci|Woodpecker CI]]"
      - "[[kubernetes|Kubernetes (ferramenta)]]"
    custoBeneficio:
      - "[[github_actions|GitHub Actions]]"
      - tabela:circleci
      - "[[harness|Harness]]"
    qualidadeMaxima:
      - tabela:octopus-deploy
      - tabela:buildkite
      - tabela:spacelift
    justificativaFerramentas: "Muda Gatilho para merge na branch principal: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Cluster com controlador de sincronização
        fonte: editorial
      - chave: Escala típica
        valor: Estado desejado versionado em Git
        fonte: editorial
      - chave: Gatilho
        valor: Merge na branch principal
        fonte: editorial
  - id: cicd-revisao-pr
    nome: Revisão de pull request
    descricao: Comentários automáticos de qualidade e risco.
    funcionalidades:
      - "[[edicao_de_codebase|Edição de codebase]]"
      - "[[raciocinio|Raciocínio]]"
    herdaFerramentas: false
    maisBarata:
      - "[[qodo_pr_agent|Qodo PR-Agent]]"
      - tabela:reviewdog
      - tabela:danger-js
    custoBeneficio:
      - "[[github_copilot|GitHub Copilot]]"
      - tabela:coderabbit
      - tabela:sourcery
    qualidadeMaxima:
      - "[[greptile|Greptile]]"
      - tabela:graphite
      - tabela:qodo-merge
    justificativaFerramentas: "Muda Gatilho para abertura de pull request: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Etapa do pipeline com revisor automático
        fonte: editorial
      - chave: Escala típica
        valor: Todo pull request
        fonte: editorial
      - chave: Gatilho
        valor: Abertura de pull request
        fonte: editorial
  - id: cicd-feature-flags
    nome: Feature flags e rollout
    descricao: Liberação gradual e reversão sem deploy.
    funcionalidades:
      - "[[automacao_de_workflow|Automação de workflow]]"
      - "[[integracao_de_apis|Integração de APIs]]"
    herdaFerramentas: false
    maisBarata:
      - "[[growthbook|GrowthBook]]"
      - tabela:flagsmith
      - tabela:flipt
    custoBeneficio:
      - "[[statsig|Statsig]]"
      - tabela:configcat
      - tabela:devcycle
    qualidadeMaxima:
      - "[[launchdarkly|LaunchDarkly]]"
      - tabela:optimizely
      - tabela:split
    justificativaFerramentas: "Muda Gatilho para mudança de flag sem deploy: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Serviço de flags com SDK
        fonte: editorial
      - chave: Escala típica
        valor: Liberação gradual por porcentagem
        fonte: editorial
      - chave: Gatilho
        valor: Mudança de flag sem deploy
        fonte: editorial
  - id: cicd-ambientes-efemeros
    nome: Ambientes efêmeros
    descricao: Ambiente de teste por pull request.
    funcionalidades:
      - "[[deploy_gerenciado|Deploy gerenciado]]"
      - "[[automacao_de_workflow|Automação de workflow]]"
    herdaFerramentas: false
    maisBarata:
      - "[[coolify|Coolify]]"
      - tabela:dokku
      - tabela:caprover
    custoBeneficio:
      - "[[render|Render]]"
      - tabela:railway
      - tabela:flyio
    qualidadeMaxima:
      - "[[vercel|Vercel]]"
      - tabela:heroku
      - tabela:platform-sh
    justificativaFerramentas: "Muda Gatilho para abertura de pull request com ambiente de teste: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Plataforma de deploy por branch
        fonte: editorial
      - chave: Escala típica
        valor: Um ambiente por pull request
        fonte: editorial
      - chave: Gatilho
        valor: Abertura de pull request com ambiente de teste
        fonte: editorial
tags:
  - caso-de-uso
  - ferramenta
---
# Pipelines de CI e CD
## 📝 Descrição
Integrar, testar e entregar código em produção com pipelines confiáveis.
## ⏰ Quando aplicar
- Pipeline de aplicação web
- Entrega contínua com rollback
## 🧩 Funcionalidades necessárias
- [[automacao_de_workflow|Automação de workflow]] - Execução automática de processos entre sistemas, com gatilhos e ações.
- [[integracao_de_apis|Integração de APIs]] - Conexão de modelos e agentes a APIs e serviços de terceiros.
- [[edicao_de_codebase|Edição de codebase]] - Alteração coordenada de vários arquivos de um repositório, com leitura de contexto e execução de comandos.
- [[raciocinio|Raciocínio]] - Resolução de problemas em várias etapas, com planejamento, lógica e matemática.
- [[deploy_gerenciado|Deploy gerenciado]] - Hospedagem de modelos e agentes em serviço gerenciado, com escala e monitoramento.
## ✅ Recomendações
- [[github_actions|GitHub Actions]] - Faixa custo-benefício em [[ci_cd_deploy|CI-CD e deploy]].
- [[github_copilot|GitHub Copilot]] - Faixa custo-benefício em [[revisao_codigo_pr|Revisão de código e PR]].
- [[statsig|Statsig]] - Faixa custo-benefício em [[feature_flags_experimentacao|Feature flags e experimentação]].
- [[render|Render]] - Faixa custo-benefício em [[paas_aplicacoes|PaaS de aplicações]].
- [[harness|Harness]] - Faixa qualidade máxima em [[ci_cd_deploy|CI-CD e deploy]].
## 🧬 Variações
- **Pipeline de build e teste** (`cicd-pipeline-build`): Compilar, testar e publicar artefato a cada commit. Funcionalidades: [[automacao_de_workflow|Automação de workflow]], [[integracao_de_apis|Integração de APIs]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Ambiente de execução: Runner hospedado ou próprio; Escala típica: Todo commit; Definição do pipeline: Arquivo YAML em .github/workflows no GitHub Actions.
- **Entrega com GitOps** (`cicd-deploy-gitops`): Estado desejado em Git e sincronização automática. Funcionalidades: [[automacao_de_workflow|Automação de workflow]], [[integracao_de_apis|Integração de APIs]]. Mais barata: Argo CD, [[woodpecker_ci|Woodpecker CI]], [[kubernetes|Kubernetes (ferramenta)]]. Custo-benefício: [[github_actions|GitHub Actions]], CircleCI, [[harness|Harness]]. Qualidade máxima: Octopus Deploy, Buildkite, Spacelift. Por que difere do caso: Muda Gatilho para merge na branch principal: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Cluster com controlador de sincronização; Escala típica: Estado desejado versionado em Git; Gatilho: Merge na branch principal.
- **Revisão de pull request** (`cicd-revisao-pr`): Comentários automáticos de qualidade e risco. Funcionalidades: [[edicao_de_codebase|Edição de codebase]], [[raciocinio|Raciocínio]]. Mais barata: [[qodo_pr_agent|Qodo PR-Agent]], reviewdog, Danger JS. Custo-benefício: [[github_copilot|GitHub Copilot]], CodeRabbit, Sourcery. Qualidade máxima: [[greptile|Greptile]], Graphite, Qodo Merge. Por que difere do caso: Muda Gatilho para abertura de pull request: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Etapa do pipeline com revisor automático; Escala típica: Todo pull request; Gatilho: Abertura de pull request.
- **Feature flags e rollout** (`cicd-feature-flags`): Liberação gradual e reversão sem deploy. Funcionalidades: [[automacao_de_workflow|Automação de workflow]], [[integracao_de_apis|Integração de APIs]]. Mais barata: [[growthbook|GrowthBook]], Flagsmith, Flipt. Custo-benefício: [[statsig|Statsig]], ConfigCat, DevCycle. Qualidade máxima: [[launchdarkly|LaunchDarkly]], Optimizely, Split by Harness. Por que difere do caso: Muda Gatilho para mudança de flag sem deploy: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Serviço de flags com SDK; Escala típica: Liberação gradual por porcentagem; Gatilho: Mudança de flag sem deploy.
- **Ambientes efêmeros** (`cicd-ambientes-efemeros`): Ambiente de teste por pull request. Funcionalidades: [[deploy_gerenciado|Deploy gerenciado]], [[automacao_de_workflow|Automação de workflow]]. Mais barata: [[coolify|Coolify]], Dokku, CapRover. Custo-benefício: [[render|Render]], Railway, Fly.io. Qualidade máxima: [[vercel|Vercel]], Heroku, Platform.sh. Por que difere do caso: Muda Gatilho para abertura de pull request com ambiente de teste: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Plataforma de deploy por branch; Escala típica: Um ambiente por pull request; Gatilho: Abertura de pull request com ambiente de teste.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[woodpecker_ci|Woodpecker CI]], Jenkins, Drone CI
- **Custo-benefício:** [[github_actions|GitHub Actions]], CircleCI, Argo CD
- **Qualidade máxima:** [[harness|Harness]], Buildkite, Octopus Deploy
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** custo. Minutos de pipeline se acumulam e o custo mensal pesa em equipes pequenas.
## 🔗 Relacionamentos
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
- **Macro:** [[infraestrutura_devops_e_seguranca|Infraestrutura, DevOps e segurança]]
