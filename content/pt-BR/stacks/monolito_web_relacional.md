---
id: monolito_web_relacional
tipo: stack
nome: Monolito web com banco relacional
descricao: Aplicação web em um único deploy, com camada de apresentação, regras de negócio e acesso a dados no mesmo código, apoiada em um banco relacional e em jobs em background para o trabalho assíncrono.
fonte_ids:
  - ubuntu_apache_lamp
  - rails_doctrine
exemplo: Um sistema de gestão com telas renderizadas no servidor, um banco PostgreSQL e uma fila de jobs para e-mails e relatórios.
quando_usar:
  - Time pequeno ou médio que precisa entregar valor rápido com poucas peças para operar.
  - Domínio ainda em descoberta, em que as fronteiras entre módulos podem mudar.
quando_evitar:
  - Partes do sistema com escala e ciclo de release muito diferentes pedem a separação em serviços.
status: rascunho
publico: false
fontes:
  - id: ubuntu_apache_lamp
    tipo: artigo
    titulo: How to install Apache2 (Ubuntu Server documentation)
    link: https://ubuntu.com/server/docs/how-to/web-services/install-apache2/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: rails_doctrine
    tipo: artigo
    titulo: The Rails Doctrine
    link: https://rubyonrails.org/doctrine
    status_revisao: revisada
    proxima_revisao: 2027-11-23
categorias:
  - "[[frameworks_backend|Frameworks de backend]]"
  - "[[banco_relacional|Banco relacional]]"
  - "[[chave_valor_cache|Chave-valor e cache]]"
  - "[[filas_jobs_background|Filas e jobs em background]]"
  - "[[frameworks_frontend_web|Frameworks de frontend web]]"
  - "[[paas_aplicacoes|PaaS de aplicações]]"
  - "[[email_transacional_marketing|E-mail transacional e marketing]]"
  - "[[observabilidade_apm|Observabilidade e APM]]"
  - "[[frameworks_testes|Frameworks de testes]]"
  - "[[ci_cd_deploy|CI-CD e deploy]]"
aliases:
  - Monolito web
  - Aplicação web clássica
dominio: software
subdominio: Aplicações e APIs
linguagens:
  - php
  - ruby
  - java
  - python
slots:
  - id: backend
    papel: Framework web
    categoria: "[[frameworks_backend|Frameworks de backend]]"
    obrigatorio: true
    maisBarata:
      - "[[laravel|Laravel]]"
      - "[[django|Django]]"
    custoBeneficio:
      - "[[spring_boot|Spring Boot]]"
      - "[[fastapi|FastAPI]]"
    qualidadeMaxima:
      - "[[ruby_on_rails|Ruby on Rails]]"
      - "[[asp_net_core|ASP.NET Core]]"
    lacuna: ""
  - id: banco
    papel: Banco relacional
    categoria: "[[banco_relacional|Banco relacional]]"
    obrigatorio: true
    maisBarata:
      - "[[postgresql|PostgreSQL]]"
      - tabela:mariadb
    custoBeneficio:
      - "[[neon|Neon]]"
    qualidadeMaxima:
      - "[[amazon_aurora|Amazon Aurora (ferramenta)]]"
    lacuna: ""
  - id: cache
    papel: Cache
    categoria: "[[chave_valor_cache|Chave-valor e cache]]"
    obrigatorio: false
    maisBarata:
      - "[[redis|Redis (ferramenta)]]"
    custoBeneficio:
      - tabela:redis-cloud
    qualidadeMaxima:
      - tabela:azure-managed-redis
    lacuna: ""
  - id: jobs
    papel: Jobs em background
    categoria: "[[filas_jobs_background|Filas e jobs em background]]"
    obrigatorio: true
    maisBarata:
      - tabela:celery
      - "[[bullmq|BullMQ]]"
    custoBeneficio:
      - "[[inngest|Inngest]]"
    qualidadeMaxima:
      - "[[temporal|Temporal]]"
    lacuna: ""
  - id: frontend
    papel: Interface web
    categoria: "[[frameworks_frontend_web|Frameworks de frontend web]]"
    obrigatorio: false
    maisBarata:
      - "[[svelte|Svelte]]"
    custoBeneficio:
      - "[[react|React]]"
      - "[[vue|Vue.js]]"
    qualidadeMaxima:
      - "[[angular|Angular]]"
    lacuna: ""
  - id: hospedagem
    papel: Hospedagem de aplicação
    categoria: "[[paas_aplicacoes|PaaS de aplicações]]"
    obrigatorio: true
    maisBarata:
      - "[[coolify|Coolify]]"
    custoBeneficio:
      - "[[render|Render]]"
      - tabela:railway
    qualidadeMaxima:
      - tabela:heroku
      - tabela:platform-sh
    lacuna: ""
  - id: email
    papel: E-mail transacional
    categoria: "[[email_transacional_marketing|E-mail transacional e marketing]]"
    obrigatorio: false
    maisBarata:
      - "[[amazon_ses|Amazon SES]]"
    custoBeneficio:
      - "[[postmark|Postmark]]"
    qualidadeMaxima:
      - "[[twilio_sendgrid|Twilio SendGrid]]"
    lacuna: ""
  - id: obs
    papel: Observabilidade e erros
    categoria: "[[observabilidade_apm|Observabilidade e APM]]"
    obrigatorio: true
    maisBarata:
      - "[[opentelemetry|OpenTelemetry]]"
    custoBeneficio:
      - "[[sentry|Sentry]]"
    qualidadeMaxima:
      - "[[datadog|Datadog]]"
    lacuna: ""
  - id: testes
    papel: Testes automatizados
    categoria: "[[frameworks_testes|Frameworks de testes]]"
    obrigatorio: true
    maisBarata:
      - "[[pytest|pytest]]"
      - "[[junit5|JUnit 5]]"
    custoBeneficio:
      - "[[rspec|RSpec]]"
      - "[[phpunit|PHPUnit]]"
    qualidadeMaxima:
      - "[[xunit_net|xUnit.net]]"
    lacuna: ""
  - id: cicd
    papel: Pipeline de entrega
    categoria: "[[ci_cd_deploy|CI-CD e deploy]]"
    obrigatorio: true
    maisBarata:
      - "[[woodpecker_ci|Woodpecker CI]]"
    custoBeneficio:
      - "[[github_actions|GitHub Actions]]"
    qualidadeMaxima:
      - "[[harness|Harness]]"
    lacuna: ""
instancias:
  - nome: LAMP
    descricao: Composição clássica de Linux, Apache, MySQL e PHP (ou Perl e Python) para aplicações web.
    linguagens:
      - php
    ferramentas:
      - tabela:mysql
    fonte_ids:
      - ubuntu_apache_lamp
  - nome: Ruby on Rails
    descricao: Framework integrado, de convenção sobre configuração e do princípio de menu omakase, que reúne as camadas de uma aplicação web em um conjunto coeso.
    linguagens:
      - ruby
    ferramentas:
      - "[[ruby_on_rails|Ruby on Rails]]"
    fonte_ids:
      - rails_doctrine
condicoes:
  time_maturidade:
    favorece:
      - Time pequeno que prefere um único código e um único deploy.
    contra:
      - Muitos times alterando o mesmo código com ritmos de release diferentes.
    preferir:
      - "[[api_transacional_eventos|API transacional com eventos]]"
  escala_volume:
    favorece:
      - Carga previsível, atendida por escala vertical e por réplicas do mesmo processo.
    contra:
      - Partes do sistema com picos muito distintos do restante.
    preferir:
      - "[[api_serverless_edge|API serverless e edge]]"
  orcamento:
    favorece:
      - Poucas peças de infraestrutura reduzem o custo fixo.
    contra:
      - Orçamento que não comporta nem o banco gerenciado, caso em que um site estático basta.
    preferir:
      - "[[site_conteudo_estatico|Site de conteúdo estático]]"
  latencia:
    favorece:
      - Chamadas em memória entre módulos mantêm a latência baixa.
    contra:
      - Usuários distribuídos globalmente que pedem execução próxima da borda.
    preferir:
      - "[[api_serverless_edge|API serverless e edge]]"
  compliance_dados:
    favorece:
      - Um único banco simplifica controles de acesso, auditoria e retenção.
    contra:
      - Isolamento por regulação entre domínios, que pede fronteiras físicas.
    preferir:
      - "[[api_transacional_eventos|API transacional com eventos]]"
  prazo_entrega:
    favorece:
      - Convenções do framework aceleram as primeiras entregas.
    contra:
      - Prazo curto para um conteúdo que quase não muda, caso do site estático.
    preferir:
      - "[[site_conteudo_estatico|Site de conteúdo estático]]"
  lock_in:
    favorece:
      - Frameworks e bancos abertos mantêm a portabilidade entre provedores.
    contra:
      - Plataforma gerenciada com recursos proprietários aumenta a dependência.
    preferir: []
    semAlternativa: "Este eixo não aponta para outro arquétipo: a stack cobre o cenário sozinha."
outrosArquetipos:
  - stack: "[[api_transacional_eventos|API transacional com eventos]]"
    quando: Fluxos assíncronos entre serviços passam a ser parte central do produto.
  - stack: "[[web_fullstack_js_ts|Aplicação web full-stack em JavaScript e TypeScript]]"
    quando: O time domina JavaScript e quer a mesma linguagem do navegador ao servidor.
  - stack: "[[site_conteudo_estatico|Site de conteúdo estático]]"
    quando: O conteúdo muda pouco e dispensa um servidor de aplicação.
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
  - id: iac.estado_remoto_protegido
    dominio: infraestrutura como código
    titulo: Guardar o estado da infraestrutura em local compartilhado e protegido
    verificacao: O estado da infraestrutura fica em armazenamento remoto com controle de acesso, histórico e bloqueio contra aplicações simultâneas.
    nivel: essencial
    slots: []
    depende: []
  - id: iac.plano_revisado
    dominio: infraestrutura como código
    titulo: Revisar o plano antes de aplicar
    verificacao: Cada mudança de infraestrutura mostra o plano de alterações no pull request, e uma pessoa revisora o aprova antes da aplicação.
    nivel: recomendado
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
  - id: seg.sessao_protegida
    dominio: segurança
    titulo: Proteger sessões e cookies
    verificacao: Sessões usam cookies com atributos de proteção e expiram por inatividade, e a revogação de uma sessão tem efeito imediato.
    nivel: essencial
    slots:
      - backend
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
  - id: dados.consultas_lentas_observadas
    dominio: dados e migrações
    titulo: Acompanhar consultas lentas do banco
    verificacao: As consultas mais lentas aparecem num painel com limite de alerta, e cada uma tem índice ou plano de correção.
    nivel: recomendado
    slots:
      - banco
      - obs
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
  - id: ops.jobs_reiniciaveis
    dominio: operação e incidentes
    titulo: Executar jobs de forma segura para repetição
    verificacao: Todo job pode rodar duas vezes sem efeito duplicado e as falhas ficam visíveis para o time.
    nivel: essencial
    slots:
      - jobs
    depende: []
padroes:
  - "[[monolito_modular|Monolito Modular]]"
  - "[[arquitetura_em_camadas|Arquitetura em Camadas]]"
  - "[[cache_aside|Cache-aside]]"
  - "[[strangler_fig|Strangler Fig]]"
casosDeUso:
  - "[[startup_saas_inicial_pequena_empresa|Startup SaaS inicial (pequena empresa)]]"
  - "[[software_b2b_media_empresa|Software B2B (média empresa)]]"
variacoes:
  - saas-stack-mvp
  - b2b-entrega-continua
ferramentas:
  - "[[laravel|Laravel]]"
  - "[[django|Django]]"
  - "[[spring_boot|Spring Boot]]"
  - "[[fastapi|FastAPI]]"
  - "[[ruby_on_rails|Ruby on Rails]]"
  - "[[asp_net_core|ASP.NET Core]]"
  - "[[postgresql|PostgreSQL]]"
  - tabela:mariadb
  - "[[neon|Neon]]"
  - "[[amazon_aurora|Amazon Aurora (ferramenta)]]"
  - "[[redis|Redis (ferramenta)]]"
  - tabela:redis-cloud
  - tabela:azure-managed-redis
  - tabela:celery
  - "[[bullmq|BullMQ]]"
  - "[[inngest|Inngest]]"
  - "[[temporal|Temporal]]"
  - "[[svelte|Svelte]]"
  - "[[react|React]]"
  - "[[vue|Vue.js]]"
  - "[[angular|Angular]]"
  - "[[coolify|Coolify]]"
  - "[[render|Render]]"
  - tabela:railway
  - tabela:heroku
  - tabela:platform-sh
  - "[[amazon_ses|Amazon SES]]"
  - "[[postmark|Postmark]]"
  - "[[twilio_sendgrid|Twilio SendGrid]]"
  - "[[opentelemetry|OpenTelemetry]]"
  - "[[sentry|Sentry]]"
  - "[[datadog|Datadog]]"
  - "[[pytest|pytest]]"
  - "[[junit5|JUnit 5]]"
  - "[[rspec|RSpec]]"
  - "[[phpunit|PHPUnit]]"
  - "[[xunit_net|xUnit.net]]"
  - "[[woodpecker_ci|Woodpecker CI]]"
  - "[[github_actions|GitHub Actions]]"
  - "[[harness|Harness]]"
  - tabela:mysql
dataVerificacao: 2026-11-23
tags:
  - stack
---
# Monolito web com banco relacional
<!-- stack:gen -->
## 📋 Resumo
`= this.descricao`
Exemplo: `= this.exemplo`
Domínio: `= this.dominio` / `= this.subdominio`
## 🔗 Relacionamentos
- **Hub:** [[hub_stacks|Mapa de Stacks de Engenharia]], [[hub_tools|Mapa de Ferramentas de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
