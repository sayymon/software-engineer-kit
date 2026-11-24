---
id: mobile_backend_gerenciado
tipo: stack
nome: App mobile com backend gerenciado
descricao: Aplicativo móvel multiplataforma ou nativo que usa um backend como serviço para autenticação, banco, armazenamento e funções, com analytics, flags de funcionalidade, rastreio de falhas e entrega contínua para as lojas.
fonte_ids: []
exemplo: Um app de entregas com login, sincronização de pedidos em tempo real, notificações e liberação gradual de funcionalidades.
quando_usar:
  - Time pequeno que precisa lançar rápido sem operar servidores próprios.
  - O app precisa de login, sincronização e armazenamento prontos.
quando_evitar:
  - Regras de negócio complexas e integrações pesadas com sistemas legados pedem um backend próprio.
status: rascunho
publico: false
fontes: []
categorias:
  - "[[frameworks_mobile|Frameworks de mobile]]"
  - "[[baas_backend_pronto|BaaS e backend pronto]]"
  - "[[autenticacao_identidade|Autenticação e identidade]]"
  - "[[analytics_produto_web|Analytics de produto e web]]"
  - "[[feature_flags_experimentacao|Feature flags e experimentação]]"
  - "[[observabilidade_apm|Observabilidade e APM]]"
  - "[[testes_qa|Testes e QA]]"
  - "[[ci_cd_deploy|CI-CD e deploy]]"
aliases:
  - App mobile com BaaS
  - Aplicativo com backend como serviço
dominio: software
subdominio: Aplicações e APIs
linguagens:
  - dart
  - kotlin
  - swift
  - typescript
slots:
  - id: mobile
    papel: Framework do aplicativo
    categoria: "[[frameworks_mobile|Frameworks de mobile]]"
    obrigatorio: true
    maisBarata:
      - "[[capacitor|Capacitor]]"
      - tabela:expo
    custoBeneficio:
      - "[[flutter|Flutter]]"
      - tabela:react-native
    qualidadeMaxima:
      - "[[kotlin_multiplatform|Kotlin Multiplatform]]"
      - tabela:jetpack-compose
    lacuna: ""
  - id: baas
    papel: Backend como serviço
    categoria: "[[baas_backend_pronto|BaaS e backend pronto]]"
    obrigatorio: true
    maisBarata:
      - "[[pocketbase|PocketBase]]"
      - tabela:appwrite
    custoBeneficio:
      - "[[firebase|Firebase]]"
      - tabela:supabase-repo
    qualidadeMaxima:
      - "[[aws_amplify|AWS Amplify]]"
    lacuna: ""
  - id: auth
    papel: Autenticação
    categoria: "[[autenticacao_identidade|Autenticação e identidade]]"
    obrigatorio: true
    maisBarata:
      - "[[keycloak|Keycloak]]"
    custoBeneficio:
      - tabela:firebase-auth
    qualidadeMaxima:
      - tabela:microsoft-entra-id
    lacuna: ""
  - id: analytics
    papel: Analytics de produto
    categoria: "[[analytics_produto_web|Analytics de produto e web]]"
    obrigatorio: true
    maisBarata:
      - tabela:matomo
    custoBeneficio:
      - "[[posthog|PostHog]]"
    qualidadeMaxima:
      - "[[amplitude|Amplitude]]"
      - tabela:mixpanel
    lacuna: ""
  - id: flags
    papel: Flags de funcionalidade
    categoria: "[[feature_flags_experimentacao|Feature flags e experimentação]]"
    obrigatorio: true
    maisBarata:
      - "[[growthbook|GrowthBook]]"
    custoBeneficio:
      - "[[statsig|Statsig]]"
    qualidadeMaxima:
      - "[[launchdarkly|LaunchDarkly]]"
    lacuna: ""
  - id: obs
    papel: Rastreio de falhas
    categoria: "[[observabilidade_apm|Observabilidade e APM]]"
    obrigatorio: true
    maisBarata:
      - "[[opentelemetry|OpenTelemetry]]"
    custoBeneficio:
      - tabela:sentry
    qualidadeMaxima:
      - "[[datadog|Datadog]]"
    lacuna: ""
  - id: testes
    papel: Testes de interface móvel
    categoria: "[[testes_qa|Testes e QA]]"
    obrigatorio: true
    maisBarata:
      - tabela:maestro
    custoBeneficio:
      - tabela:detox
    qualidadeMaxima:
      - "[[browserstack|BrowserStack]]"
    lacuna: ""
  - id: cicd
    papel: Build e publicação nas lojas
    categoria: "[[ci_cd_deploy|CI-CD e deploy]]"
    obrigatorio: true
    maisBarata:
      - "[[woodpecker_ci|Woodpecker CI]]"
    custoBeneficio:
      - "[[github_actions|GitHub Actions]]"
    qualidadeMaxima:
      - tabela:buildkite
    lacuna: ""
instancias: []
condicoes:
  time_maturidade:
    favorece:
      - Time mobile pequeno sem especialista em infraestrutura.
    contra:
      - Time com especialistas de backend que querem controle total.
    preferir:
      - "[[web_fullstack_js_ts|Aplicação web full-stack em JavaScript e TypeScript]]"
  escala_volume:
    favorece:
      - Base de usuários em crescimento atendida pela escala do provedor.
    contra:
      - Volume muito alto de leituras, em que a fatura por operação cresce depressa.
    preferir:
      - "[[api_transacional_eventos|API transacional com eventos]]"
  orcamento:
    favorece:
      - Camadas gratuitas cobrem o lançamento e a validação.
    contra:
      - Preço por operação imprevisível em picos de uso.
    preferir:
      - "[[api_serverless_edge|API serverless e edge]]"
  latencia:
    favorece:
      - Sincronização em tempo real pronta para uso.
    contra:
      - Latência estrita em regiões sem presença do provedor.
    preferir:
      - "[[api_serverless_edge|API serverless e edge]]"
  compliance_dados:
    favorece:
      - Regras de acesso declarativas por usuário e por documento.
    contra:
      - Requisitos de residência de dados fora das regiões do provedor.
    preferir:
      - "[[api_transacional_eventos|API transacional com eventos]]"
  prazo_entrega:
    favorece:
      - Lançamento em semanas com autenticação e banco prontos.
    contra:
      - Prazo que inclui regras de negócio complexas no servidor.
    preferir:
      - "[[api_transacional_eventos|API transacional com eventos]]"
  lock_in:
    favorece:
      - Opções abertas e autohospedáveis reduzem a dependência.
    contra:
      - Formatos e regras de acesso proprietários dificultam a migração.
    preferir:
      - "[[web_fullstack_js_ts|Aplicação web full-stack em JavaScript e TypeScript]]"
outrosArquetipos:
  - stack: "[[web_fullstack_js_ts|Aplicação web full-stack em JavaScript e TypeScript]]"
    quando: O produto é uma aplicação web e o app móvel vem depois.
  - stack: "[[api_transacional_eventos|API transacional com eventos]]"
    quando: As regras de negócio exigem consistência entre vários serviços.
checklist:
  - id: amb.ambiente_reproduzivel
    dominio: ambiente local
    titulo: Reproduzir o ambiente local com um comando
    verificacao: Uma pessoa nova no projeto consegue rodar a aplicação e os testes a partir de um clone limpo, seguindo apenas o que está no repositório.
    nivel: essencial
    slots: []
    depende: []
  - id: amb.dependencias_travadas
    dominio: ambiente local
    titulo: Travar as dependências
    verificacao: As dependências diretas e transitivas ficam registradas em arquivo versionado, e o build usa exatamente esse conjunto.
    nivel: essencial
    slots: []
    depende: []
  - id: amb.config_por_ambiente
    dominio: ambiente local
    titulo: Separar configuração por ambiente
    verificacao: Valores que mudam entre ambientes chegam por configuração externa ao código, e o mesmo artefato roda em todos os ambientes.
    nivel: recomendado
    slots: []
    depende: []
  - id: repo.protecao_branch_principal
    dominio: repositório
    titulo: Proteger a branch principal
    verificacao: Merge na branch principal só acontece por pull request com revisão e CI verde.
    nivel: essencial
    slots: []
    depende: []
  - id: repo.convencao_commits
    dominio: repositório
    titulo: Combinar uma convenção de commits e de branches
    verificacao: Existe um padrão escrito de mensagens de commit e de nomes de branch, e a revisão aponta desvios.
    nivel: recomendado
    slots: []
    depende: []
  - id: repo.codeowners
    dominio: repositório
    titulo: Definir responsáveis por área do código
    verificacao: Cada área crítica do repositório tem responsáveis nomeados que entram automaticamente na revisão.
    nivel: recomendado
    slots: []
    depende: []
  - id: cicd.pipeline_ci
    dominio: CI/CD
    titulo: Rodar build, testes e análise a cada mudança
    verificacao: Todo pull request dispara um pipeline que compila, executa os testes e roda a análise estática, e o resultado bloqueia o merge.
    nivel: essencial
    slots: []
    depende: []
  - id: cicd.artefato_imutavel
    dominio: CI/CD
    titulo: Publicar um artefato imutável por mudança
    verificacao: Cada build gera um artefato identificado por um hash ou tag que nunca é sobrescrito, e o deploy promove esse mesmo artefato entre ambientes.
    nivel: essencial
    slots: []
    depende: []
  - id: cicd.deploy_automatizado
    dominio: CI/CD
    titulo: Automatizar o deploy
    verificacao: Colocar uma mudança em produção é uma ação de pipeline repetível, sem passos manuais fora do registro.
    nivel: essencial
    slots: []
    depende: []
  - id: iac.infra_versionada
    dominio: infraestrutura como código
    titulo: Descrever a infraestrutura em código
    verificacao: Toda infraestrutura de produção é criada a partir de arquivos versionados, e uma mudança manual no console é revertida ou incorporada ao código.
    nivel: essencial
    slots: []
    depende: []
  - id: obs.logs_estruturados
    dominio: observabilidade
    titulo: Emitir logs estruturados com correlação
    verificacao: Os logs saem em formato estruturado e carregam um identificador de requisição que liga os eventos de uma mesma chamada.
    nivel: essencial
    slots: []
    depende: []
  - id: obs.metricas_sinais_ouro
    dominio: observabilidade
    titulo: Medir latência, tráfego, erros e saturação
    verificacao: Cada serviço expõe métricas de latência, volume de requisições, taxa de erro e uso de recursos, com painel acessível ao time.
    nivel: essencial
    slots: []
    depende: []
  - id: obs.alertas_acionaveis
    dominio: observabilidade
    titulo: Criar alertas acionáveis ligados a objetivos de nível de serviço
    verificacao: Cada alerta aponta para um objetivo de nível de serviço e para um procedimento de resposta, e alertas sem ação são removidos.
    nivel: recomendado
    slots: []
    depende: []
  - id: obs.falhas_do_app_rastreadas
    dominio: observabilidade
    titulo: Rastrear falhas e travamentos do aplicativo
    verificacao: Cada versão publicada reporta falhas com versão e dispositivo, e a taxa de sessões sem falha tem meta.
    nivel: essencial
    slots:
      - obs
    depende: []
  - id: seg.segredos_fora_do_codigo
    dominio: segurança
    titulo: Guardar segredos fora do repositório
    verificacao: Nenhum segredo vive no código ou no histórico do repositório, e uma varredura automática bloqueia o commit ou o merge quando encontra um.
    nivel: essencial
    slots: []
    depende: []
  - id: seg.menor_privilegio
    dominio: segurança
    titulo: Aplicar o menor privilégio
    verificacao: Cada pessoa, serviço e pipeline tem apenas as permissões de que precisa, e as permissões são revisadas em ciclos definidos.
    nivel: essencial
    slots: []
    depende: []
  - id: seg.varredura_dependencias
    dominio: segurança
    titulo: Varrer dependências e imagens em busca de vulnerabilidades
    verificacao: O pipeline lista vulnerabilidades conhecidas em dependências e imagens e bloqueia a publicação acima de um limite combinado.
    nivel: essencial
    slots: []
    depende: []
  - id: seg.regras_de_acesso_no_backend
    dominio: segurança
    titulo: Aplicar regras de acesso no serviço gerenciado
    verificacao: Cada coleção ou tabela tem regras de acesso por usuário, testadas automaticamente, e o aplicativo nunca decide sozinho quem lê o quê.
    nivel: essencial
    slots:
      - baas
      - auth
    depende: []
  - id: custo.orcamento_alertas
    dominio: custos
    titulo: Definir orçamento e alertas de gasto
    verificacao: Existe um orçamento por ambiente com alerta automático quando o gasto previsto passa do limite combinado.
    nivel: essencial
    slots: []
    depende: []
  - id: custo.etiquetas_de_custo
    dominio: custos
    titulo: Etiquetar recursos por dono e finalidade
    verificacao: Todo recurso pago carrega etiquetas de dono e de finalidade, o que permite atribuir cada custo a um responsável.
    nivel: recomendado
    slots: []
    depende: []
  - id: dados.migracoes_versionadas
    dominio: dados e migrações
    titulo: Versionar as migrações de dados
    verificacao: Mudanças de esquema entram por migrações versionadas, aplicadas por pipeline e compatíveis com a versão anterior da aplicação.
    nivel: essencial
    slots: []
    depende: []
  - id: dados.backup_restauracao_testada
    dominio: dados e migrações
    titulo: Testar a restauração de backups
    verificacao: Existe backup automático dos dados críticos, e a restauração é exercitada com resultado registrado em ciclos definidos.
    nivel: essencial
    slots: []
    depende: []
  - id: teste.piramide_de_testes
    dominio: testes e qualidade
    titulo: Cobrir o comportamento com testes automatizados em camadas
    verificacao: O comportamento crítico tem testes unitários, de integração e de ponta a ponta, e o pipeline executa todos antes do merge.
    nivel: essencial
    slots: []
    depende: []
  - id: teste.dados_de_teste_isolados
    dominio: testes e qualidade
    titulo: Isolar os dados de teste
    verificacao: Os testes criam e descartam seus próprios dados e rodam em qualquer ordem sem depender de estado compartilhado.
    nivel: recomendado
    slots: []
    depende: []
  - id: rel.rollback_ensaiado
    dominio: release e rollback
    titulo: Ensaiar o rollback
    verificacao: Voltar para a versão anterior é um procedimento documentado e ensaiado, e a equipe sabe o tempo que ele leva.
    nivel: essencial
    slots: []
    depende: []
  - id: rel.liberacao_gradual
    dominio: release e rollback
    titulo: Liberar mudanças de forma gradual
    verificacao: Mudanças de risco chegam a uma parcela do tráfego ou atrás de uma chave de funcionalidade antes de atingir todo mundo.
    nivel: recomendado
    slots: []
    depende: []
  - id: rel.versao_minima_suportada
    dominio: release e rollback
    titulo: Definir a versão mínima suportada do aplicativo
    verificacao: O backend recusa versões antigas do aplicativo com mensagem de atualização, e a política está documentada.
    nivel: recomendado
    slots:
      - baas
      - flags
    depende: []
  - id: doc.readme_operacional
    dominio: documentação e decisões
    titulo: Manter um README operacional
    verificacao: O README explica o propósito do sistema, como rodar, testar e implantar, e quem procurar em caso de dúvida.
    nivel: essencial
    slots: []
    depende: []
  - id: doc.registro_decisoes
    dominio: documentação e decisões
    titulo: Registrar decisões de arquitetura
    verificacao: Cada decisão com impacto duradouro vira um registro curto com contexto, alternativas consideradas e consequência.
    nivel: recomendado
    slots: []
    depende: []
  - id: ops.runbooks_incidente
    dominio: operação e incidentes
    titulo: Escrever runbooks para os incidentes previstos
    verificacao: Os cenários de falha mais prováveis têm um procedimento passo a passo que uma pessoa de plantão consegue seguir.
    nivel: essencial
    slots: []
    depende: []
  - id: ops.revisao_pos_incidente
    dominio: operação e incidentes
    titulo: Fazer revisão pós-incidente sem culpados
    verificacao: Todo incidente relevante gera uma revisão escrita com causas, linha do tempo e ações de melhoria acompanhadas até o fim.
    nivel: recomendado
    slots: []
    depende: []
padroes:
  - "[[backend_for_frontend|Backend for Frontend]]"
  - "[[retry_backoff_exponencial|Retry]]"
  - "[[inbox_idempotent_consumer|Idempotência]]"
casosDeUso:
  - "[[educacao_e_edtech_media_empresa|Educação e EdTech (média empresa)]]"
  - "[[logistica_media_empresa|Logística (média empresa)]]"
variacoes:
  - edtech-app-aluno
  - logistica-app-motorista
ferramentas:
  - "[[capacitor|Capacitor]]"
  - tabela:expo
  - "[[flutter|Flutter]]"
  - tabela:react-native
  - "[[kotlin_multiplatform|Kotlin Multiplatform]]"
  - tabela:jetpack-compose
  - "[[pocketbase|PocketBase]]"
  - tabela:appwrite
  - "[[firebase|Firebase]]"
  - tabela:supabase-repo
  - "[[aws_amplify|AWS Amplify]]"
  - "[[keycloak|Keycloak]]"
  - tabela:firebase-auth
  - tabela:microsoft-entra-id
  - tabela:matomo
  - "[[posthog|PostHog]]"
  - "[[amplitude|Amplitude]]"
  - tabela:mixpanel
  - "[[growthbook|GrowthBook]]"
  - "[[statsig|Statsig]]"
  - "[[launchdarkly|LaunchDarkly]]"
  - "[[opentelemetry|OpenTelemetry]]"
  - tabela:sentry
  - "[[datadog|Datadog]]"
  - tabela:maestro
  - tabela:detox
  - "[[browserstack|BrowserStack]]"
  - "[[woodpecker_ci|Woodpecker CI]]"
  - "[[github_actions|GitHub Actions]]"
  - tabela:buildkite
dataVerificacao: 2026-11-23
tags:
  - stack
---
# App mobile com backend gerenciado
<!-- stack:gen -->
## 📋 Resumo
`= this.descricao`
Exemplo: `= this.exemplo`
Domínio: `= this.dominio` / `= this.subdominio`
## 🔗 Relacionamentos
- **Hub:** [[hub_stacks|Mapa de Stacks de Engenharia]], [[hub_tools|Mapa de Ferramentas de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
