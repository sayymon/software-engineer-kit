---
id: api_transacional_eventos
tipo: stack
nome: API transacional com eventos
descricao: Serviço de backend que grava dados de negócio num banco relacional, publica eventos de domínio de forma confiável e coordena processos longos entre serviços com sagas, idempotência e tratamento de falhas.
fonte_ids:
  - spring_boot_kafka
  - spring_boot_sql
exemplo: Um serviço de pedidos que confirma o pagamento, reserva o estoque e emite eventos para faturamento e notificação sem perder nem duplicar mensagens.
quando_usar:
  - O estado de negócio e os eventos que ele gera precisam ficar consistentes entre si.
  - Vários serviços reagem às mesmas mudanças e o acoplamento síncrono já limita a evolução.
quando_evitar:
  - Uma aplicação com um único banco e poucos fluxos pode usar o monolito com banco relacional e ficar mais simples.
status: rascunho
publico: false
fontes:
  - id: spring_boot_kafka
    tipo: artigo
    titulo: Apache Kafka Support (Spring Boot Reference)
    link: https://docs.spring.io/spring-boot/reference/messaging/kafka.html
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: spring_boot_sql
    tipo: artigo
    titulo: SQL Databases (Spring Boot Reference)
    link: https://docs.spring.io/spring-boot/reference/data/sql.html
    status_revisao: revisada
    proxima_revisao: 2027-11-23
categorias:
  - "[[frameworks_backend|Frameworks de backend]]"
  - "[[banco_relacional|Banco relacional]]"
  - "[[mensageria_streaming|Mensageria e streaming]]"
  - "[[captura_mudancas_event_store|Captura de mudanças e event store]]"
  - "[[orquestracao_workflows_sagas|Orquestração de workflows e sagas]]"
  - "[[chave_valor_cache|Chave-valor e cache]]"
  - "[[observabilidade_apm|Observabilidade e APM]]"
  - "[[infraestrutura_como_codigo|Infraestrutura como código]]"
  - "[[ci_cd_deploy|CI-CD e deploy]]"
  - "[[containers_orquestracao|Containers e orquestração]]"
  - "[[autenticacao_identidade|Autenticação e identidade]]"
aliases:
  - API orientada a eventos
  - Serviço transacional com mensageria
dominio: software
subdominio: Aplicações e APIs
linguagens:
  - java
  - kotlin
  - csharp
slots:
  - id: backend
    papel: Framework de backend
    categoria: "[[frameworks_backend|Frameworks de backend]]"
    obrigatorio: true
    maisBarata:
      - "[[javalin|Javalin]]"
    custoBeneficio:
      - "[[spring_boot|Spring Boot]]"
      - tabela:nestjs
    qualidadeMaxima:
      - "[[asp_net_core|ASP.NET Core]]"
      - "[[spring_cloud|Spring Cloud]]"
    lacuna: ""
  - id: banco
    papel: Banco transacional
    categoria: "[[banco_relacional|Banco relacional]]"
    obrigatorio: true
    maisBarata:
      - "[[postgresql|PostgreSQL]]"
    custoBeneficio:
      - "[[neon|Neon]]"
      - tabela:cockroachdb
    qualidadeMaxima:
      - "[[amazon_aurora|Amazon Aurora (ferramenta)]]"
      - tabela:google-cloud-spanner
    lacuna: ""
  - id: mensageria
    papel: Mensageria e streaming de eventos
    categoria: "[[mensageria_streaming|Mensageria e streaming]]"
    obrigatorio: true
    maisBarata:
      - tabela:apache-kafka
      - "[[rabbitmq|RabbitMQ]]"
    custoBeneficio:
      - "[[amazon_sqs|Amazon SQS]]"
      - tabela:redpanda
    qualidadeMaxima:
      - "[[confluent_cloud|Confluent Cloud]]"
      - "[[amazon_msk|Amazon MSK (ferramenta)]]"
    lacuna: ""
  - id: cdc
    papel: Publicação confiável a partir do banco
    categoria: "[[captura_mudancas_event_store|Captura de mudanças e event store]]"
    obrigatorio: true
    maisBarata:
      - "[[debezium|Debezium]]"
    custoBeneficio:
      - tabela:kurrent-eventstoredb
    qualidadeMaxima:
      - "[[confluent_cloud|Confluent Cloud]]"
    lacuna: ""
  - id: saga
    papel: Orquestração de processos longos
    categoria: "[[orquestracao_workflows_sagas|Orquestração de workflows e sagas]]"
    obrigatorio: true
    maisBarata:
      - tabela:dapr
    custoBeneficio:
      - "[[temporal|Temporal]]"
    qualidadeMaxima:
      - tabela:aws-step-functions
    lacuna: ""
  - id: cache
    papel: Cache e chave-valor
    categoria: "[[chave_valor_cache|Chave-valor e cache]]"
    obrigatorio: false
    maisBarata:
      - "[[redis|Redis (ferramenta)]]"
      - tabela:valkey
    custoBeneficio:
      - "[[upstash|Upstash]]"
    qualidadeMaxima:
      - "[[amazon_dynamodb|Amazon DynamoDB (ferramenta)]]"
    lacuna: ""
  - id: obs
    papel: Observabilidade
    categoria: "[[observabilidade_apm|Observabilidade e APM]]"
    obrigatorio: true
    maisBarata:
      - "[[opentelemetry|OpenTelemetry]]"
      - tabela:prometheus
    custoBeneficio:
      - "[[grafana_cloud|Grafana Cloud]]"
    qualidadeMaxima:
      - "[[datadog|Datadog]]"
    lacuna: ""
  - id: iac
    papel: Infraestrutura como código
    categoria: "[[infraestrutura_como_codigo|Infraestrutura como código]]"
    obrigatorio: true
    maisBarata:
      - "[[opentofu|OpenTofu]]"
    custoBeneficio:
      - "[[terraform|Terraform]]"
    qualidadeMaxima:
      - "[[hcp_terraform|HCP Terraform]]"
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
  - id: containers
    papel: Empacotamento e execução
    categoria: "[[containers_orquestracao|Containers e orquestração]]"
    obrigatorio: true
    maisBarata:
      - "[[podman|Podman]]"
    custoBeneficio:
      - "[[docker_desktop|Docker Desktop]]"
      - "[[kubernetes|Kubernetes (ferramenta)]]"
    qualidadeMaxima:
      - "[[amazon_eks|Amazon EKS]]"
    lacuna: ""
  - id: auth
    papel: Identidade e acesso
    categoria: "[[autenticacao_identidade|Autenticação e identidade]]"
    obrigatorio: false
    maisBarata:
      - "[[keycloak|Keycloak]]"
    custoBeneficio:
      - tabela:auth0
    qualidadeMaxima:
      - "[[okta_workforce_identity|Okta Workforce Identity]]"
    lacuna: ""
instancias:
  - nome: Spring Boot + PostgreSQL + Kafka
    descricao: Composição Java em que o Spring Boot integra o acesso a bancos relacionais e o suporte a Apache Kafka por configuração automática.
    linguagens:
      - java
    ferramentas:
      - "[[spring_boot|Spring Boot]]"
      - "[[postgresql|PostgreSQL]]"
      - tabela:apache-kafka
    fonte_ids:
      - spring_boot_kafka
      - spring_boot_sql
condicoes:
  time_maturidade:
    favorece:
      - Time com experiência em mensageria e em consistência eventual.
    contra:
      - Time pequeno que ainda não opera filas em produção.
    preferir:
      - "[[monolito_web_relacional|Monolito web com banco relacional]]"
  escala_volume:
    favorece:
      - Volume alto de eventos e vários consumidores independentes.
    contra:
      - Poucas requisições por minuto, em que a fila só acrescenta custo.
    preferir:
      - "[[api_serverless_edge|API serverless e edge]]"
  orcamento:
    favorece:
      - Equipe que já paga um broker gerenciado ou opera um aberto.
    contra:
      - Orçamento que não comporta broker, banco e observabilidade dedicados.
    preferir:
      - "[[monolito_web_relacional|Monolito web com banco relacional]]"
  latencia:
    favorece:
      - Fluxos assíncronos em que a latência de ponta a ponta tolera segundos.
    contra:
      - Respostas que dependem de confirmação síncrona de vários serviços em milissegundos.
    preferir:
      - "[[api_serverless_edge|API serverless e edge]]"
  compliance_dados:
    favorece:
      - Trilha de auditoria exigida, com eventos imutáveis e rastreáveis.
    contra:
      - Dados sensíveis que não podem circular em tópicos compartilhados sem criptografia.
    preferir: []
    semAlternativa: "Este eixo não aponta para outro arquétipo: a stack cobre o cenário sozinha."
  prazo_entrega:
    favorece:
      - Prazo comporta desenhar contratos de eventos e testes de falha.
    contra:
      - Entrega em poucas semanas, em que o monolito chega antes.
    preferir:
      - "[[monolito_web_relacional|Monolito web com banco relacional]]"
  lock_in:
    favorece:
      - Padrões abertos como Kafka e SQL mantêm a saída possível.
    contra:
      - Serviços gerenciados de mensageria de um único fornecedor prendem o contrato de eventos.
    preferir: []
    semAlternativa: "Este eixo não aponta para outro arquétipo: a stack cobre o cenário sozinha."
outrosArquetipos:
  - stack: "[[monolito_web_relacional|Monolito web com banco relacional]]"
    quando: Um único banco e poucos fluxos assíncronos atendem o produto.
  - stack: "[[pipeline_dados_streaming|Pipeline de dados em streaming]]"
    quando: O foco é processar fluxos de eventos para análise e não manter o estado transacional.
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
  - id: dados.outbox_atomico
    dominio: dados e migrações
    titulo: Gravar o evento de saída na mesma transação do dado de negócio
    verificacao: Cada mudança de estado grava o evento numa tabela de saída dentro da mesma transação, e um processo separado o publica com entrega pelo menos uma vez.
    nivel: essencial
    slots:
      - banco
      - mensageria
      - cdc
    depende: []
  - id: dados.consumidor_idempotente
    dominio: dados e migrações
    titulo: Tornar os consumidores idempotentes
    verificacao: Reprocessar a mesma mensagem duas vezes produz o mesmo resultado, comprovado por teste automatizado.
    nivel: essencial
    slots: []
    depende:
      - dados.outbox_atomico
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
  - id: ops.dlq_monitorada
    dominio: operação e incidentes
    titulo: Monitorar a fila de mensagens com falha
    verificacao: Mensagens que esgotam as tentativas vão para uma fila separada com alerta e procedimento de reprocessamento.
    nivel: essencial
    slots:
      - mensageria
    depende: []
padroes:
  - "[[transactional_outbox|Transactional Outbox]]"
  - "[[saga_orquestrada|SAGA Orquestrada]]"
  - "[[saga_coreografada|SAGA Coreografada]]"
  - "[[inbox_idempotent_consumer|Idempotência]]"
  - "[[dead_letter_queue|DLQ]]"
  - "[[circuit_breaker|Circuit Breaker]]"
  - "[[retry_backoff_exponencial|Retry]]"
  - "[[change_data_capture|Change Data Capture]]"
  - "[[arquitetura_orientada_a_eventos|Arquitetura Orientada a Eventos]]"
casosDeUso:
  - "[[pagamentos_e_cobranca|Pagamentos e cobrança]]"
  - "[[integracao_de_apis_e_webhooks|Integração de APIs e webhooks]]"
  - "[[arquitetura_e_system_design|Arquitetura e system design]]"
variacoes:
  - pag-gateway-cartao-pix
  - api-webhooks-recebimento
  - arq-mensageria
ferramentas:
  - "[[javalin|Javalin]]"
  - "[[spring_boot|Spring Boot]]"
  - tabela:nestjs
  - "[[asp_net_core|ASP.NET Core]]"
  - "[[spring_cloud|Spring Cloud]]"
  - "[[postgresql|PostgreSQL]]"
  - "[[neon|Neon]]"
  - tabela:cockroachdb
  - "[[amazon_aurora|Amazon Aurora (ferramenta)]]"
  - tabela:google-cloud-spanner
  - tabela:apache-kafka
  - "[[rabbitmq|RabbitMQ]]"
  - "[[amazon_sqs|Amazon SQS]]"
  - tabela:redpanda
  - "[[confluent_cloud|Confluent Cloud]]"
  - "[[amazon_msk|Amazon MSK (ferramenta)]]"
  - "[[debezium|Debezium]]"
  - tabela:kurrent-eventstoredb
  - tabela:dapr
  - "[[temporal|Temporal]]"
  - tabela:aws-step-functions
  - "[[redis|Redis (ferramenta)]]"
  - tabela:valkey
  - "[[upstash|Upstash]]"
  - "[[amazon_dynamodb|Amazon DynamoDB (ferramenta)]]"
  - "[[opentelemetry|OpenTelemetry]]"
  - tabela:prometheus
  - "[[grafana_cloud|Grafana Cloud]]"
  - "[[datadog|Datadog]]"
  - "[[opentofu|OpenTofu]]"
  - "[[terraform|Terraform]]"
  - "[[hcp_terraform|HCP Terraform]]"
  - "[[woodpecker_ci|Woodpecker CI]]"
  - "[[github_actions|GitHub Actions]]"
  - "[[harness|Harness]]"
  - "[[podman|Podman]]"
  - "[[docker_desktop|Docker Desktop]]"
  - "[[kubernetes|Kubernetes (ferramenta)]]"
  - "[[amazon_eks|Amazon EKS]]"
  - "[[keycloak|Keycloak]]"
  - tabela:auth0
  - "[[okta_workforce_identity|Okta Workforce Identity]]"
dataVerificacao: 2026-11-23
tags:
  - stack
---
# API transacional com eventos
<!-- stack:gen -->
## 📋 Resumo
`= this.descricao`
Exemplo: `= this.exemplo`
Domínio: `= this.dominio` / `= this.subdominio`
## 🔗 Relacionamentos
- **Hub:** [[hub_stacks|Mapa de Stacks de Engenharia]], [[hub_tools|Mapa de Ferramentas de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
