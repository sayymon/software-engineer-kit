---
id: pipeline_dados_streaming
tipo: stack
nome: Pipeline de dados em streaming
descricao: Fluxo contínuo em que eventos são publicados em um log distribuído, processados por motores de stream com estado e entregues a armazéns analíticos, buscas e painéis com atraso de segundos.
fonte_ids: []
exemplo: Um fluxo que recebe leituras de sensores, calcula agregações em janelas de um minuto e alimenta alertas e um painel em tempo real.
quando_usar:
  - Decisões e alertas dependem de dados com segundos de atraso.
  - Várias equipes consomem os mesmos eventos de forma independente.
quando_evitar:
  - Análises diárias sobre dados históricos ficam mais simples e baratas em lote.
status: rascunho
publico: false
fontes: []
categorias:
  - "[[mensageria_streaming|Mensageria e streaming]]"
  - "[[captura_mudancas_event_store|Captura de mudanças e event store]]"
  - "[[serie_temporal|Série temporal]]"
  - "[[busca_analitico|Busca e analítico]]"
  - "[[observabilidade_apm|Observabilidade e APM]]"
  - "[[containers_orquestracao|Containers e orquestração]]"
aliases:
  - Processamento de eventos em tempo real
  - Streaming de dados
dominio: software
subdominio: Dados e automação
linguagens:
  - java
  - python
  - go
slots:
  - id: log
    papel: Log distribuído de eventos
    categoria: "[[mensageria_streaming|Mensageria e streaming]]"
    obrigatorio: true
    maisBarata:
      - "[[apache_kafka|Apache Kafka]]"
      - "[[nats|NATS]]"
    custoBeneficio:
      - tabela:redpanda
      - tabela:google-pubsub
    qualidadeMaxima:
      - "[[confluent_cloud|Confluent Cloud]]"
      - tabela:azure-event-hubs
    lacuna: ""
  - id: processamento
    papel: Processamento com estado
    categoria: "[[mensageria_streaming|Mensageria e streaming]]"
    obrigatorio: true
    maisBarata:
      - tabela:apache-flink
    custoBeneficio:
      - tabela:amazon-kinesis
    qualidadeMaxima:
      - "[[confluent_cloud|Confluent Cloud]]"
    lacuna: ""
  - id: cdc
    papel: Captura de mudanças
    categoria: "[[captura_mudancas_event_store|Captura de mudanças e event store]]"
    obrigatorio: true
    maisBarata:
      - "[[debezium|Debezium]]"
      - tabela:kafka-connect
    custoBeneficio:
      - tabela:airbyte
    qualidadeMaxima:
      - tabela:aws-dms
    lacuna: ""
  - id: serie
    papel: Armazenamento de séries temporais
    categoria: "[[serie_temporal|Série temporal]]"
    obrigatorio: true
    maisBarata:
      - "[[timescaledb|TimescaleDB]]"
      - tabela:victoriametrics
    custoBeneficio:
      - "[[influxdb_cloud|InfluxDB Cloud]]"
    qualidadeMaxima:
      - "[[azure_data_explorer|Azure Data Explorer]]"
    lacuna: ""
  - id: busca
    papel: Busca e analítico
    categoria: "[[busca_analitico|Busca e analítico]]"
    obrigatorio: false
    maisBarata:
      - "[[opensearch|OpenSearch]]"
    custoBeneficio:
      - tabela:clickhouse-cloud
    qualidadeMaxima:
      - "[[amazon_opensearch_service|Amazon OpenSearch Service (ferramenta)]]"
    lacuna: ""
  - id: obs
    papel: Observabilidade
    categoria: "[[observabilidade_apm|Observabilidade e APM]]"
    obrigatorio: true
    maisBarata:
      - "[[opentelemetry|OpenTelemetry]]"
      - "[[prometheus|Prometheus]]"
    custoBeneficio:
      - "[[grafana_cloud|Grafana Cloud]]"
    qualidadeMaxima:
      - "[[datadog|Datadog]]"
    lacuna: ""
  - id: containers
    papel: Execução dos processadores
    categoria: "[[containers_orquestracao|Containers e orquestração]]"
    obrigatorio: true
    maisBarata:
      - "[[podman|Podman]]"
      - tabela:k3s
    custoBeneficio:
      - "[[kubernetes|Kubernetes (ferramenta)]]"
    qualidadeMaxima:
      - "[[amazon_eks|Amazon EKS]]"
    lacuna: ""
instancias: []
condicoes:
  time_maturidade:
    favorece:
      - Time com experiência em sistemas distribuídos e em operação de brokers.
    contra:
      - Time sem quem acompanhe atraso de consumidores e rebalanceamentos.
    preferir:
      - "[[pipeline_dados_batch|Pipeline de dados batch]]"
  escala_volume:
    favorece:
      - Milhões de eventos por segundo com particionamento por chave.
    contra:
      - Poucos eventos por minuto, que cabem em uma fila simples.
    preferir:
      - "[[automacao_integracoes|Automação e integrações orquestradas]]"
  orcamento:
    favorece:
      - Brokers abertos e autohospedados reduzem o custo por evento.
    contra:
      - Clusters gerenciados com retenção longa elevam a fatura.
    preferir:
      - "[[pipeline_dados_batch|Pipeline de dados batch]]"
  latencia:
    favorece:
      - Latência de segundos entre o evento e a decisão.
    contra:
      - Respostas síncronas de milissegundos, que pedem uma API.
    preferir:
      - "[[api_transacional_eventos|API transacional com eventos]]"
  compliance_dados:
    favorece:
      - Retenção e reprocessamento controlados por tópico.
    contra:
      - Eventos com dados pessoais que não podem ficar retidos.
    preferir: []
    semAlternativa: "Este eixo não aponta para outro arquétipo: a stack cobre o cenário sozinha."
  prazo_entrega:
    favorece:
      - Conectores prontos aceleram a integração com bancos e armazéns.
    contra:
      - Prazo curto para um time que ainda aprende o modelo de eventos.
    preferir:
      - "[[pipeline_dados_batch|Pipeline de dados batch]]"
  lock_in:
    favorece:
      - O protocolo aberto de Kafka é aceito por vários provedores.
    contra:
      - Serviços proprietários de streaming prendem o formato dos eventos.
    preferir: []
    semAlternativa: "Este eixo não aponta para outro arquétipo: a stack cobre o cenário sozinha."
outrosArquetipos:
  - stack: "[[pipeline_dados_batch|Pipeline de dados batch]]"
    quando: Atrasos de horas atendem os consumidores e o custo precisa ser menor.
  - stack: "[[api_transacional_eventos|API transacional com eventos]]"
    quando: O objetivo é manter o estado transacional de um domínio, e a análise vem depois.
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
  - id: dados.contratos_de_schema
    dominio: dados e migrações
    titulo: Versionar e validar o esquema dos eventos
    verificacao: Cada tópico tem esquema registrado, e uma mudança incompatível é recusada no pipeline.
    nivel: essencial
    slots:
      - log
    depende: []
  - id: dados.reprocessamento_por_posicao
    dominio: dados e migrações
    titulo: Reprocessar a partir de uma posição conhecida
    verificacao: Existe um procedimento testado para reprocessar eventos a partir de uma posição ou data, sem duplicar o resultado.
    nivel: recomendado
    slots:
      - log
      - processamento
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
  - id: ops.atraso_de_consumidores
    dominio: operação e incidentes
    titulo: Monitorar o atraso dos consumidores
    verificacao: O atraso de cada grupo de consumidores aparece num painel com alerta acima do limite combinado.
    nivel: essencial
    slots:
      - log
      - obs
    depende: []
padroes:
  - "[[publish_subscribe|Publish-Subscribe]]"
  - "[[backpressure|Backpressure]]"
  - "[[dead_letter_queue|DLQ]]"
  - "[[competing_consumers|Competing Consumers]]"
  - "[[change_data_capture|Change Data Capture]]"
  - "[[event_sourcing|Event Sourcing]]"
  - "[[inbox_idempotent_consumer|Idempotência]]"
casosDeUso:
  - "[[engenharia_de_dados_e_etl|Engenharia de dados e ETL]]"
  - "[[telecom_grande_empresa|Telecom (grande empresa)]]"
  - "[[bancos_e_seguros_grande_empresa|Bancos e seguros (grande empresa)]]"
variacoes:
  - etl-streaming-eventos
  - telecom-eventos-metricas
  - banco-dados-streaming
ferramentas:
  - "[[apache_kafka|Apache Kafka]]"
  - "[[nats|NATS]]"
  - tabela:redpanda
  - tabela:google-pubsub
  - "[[confluent_cloud|Confluent Cloud]]"
  - tabela:azure-event-hubs
  - tabela:apache-flink
  - tabela:amazon-kinesis
  - "[[debezium|Debezium]]"
  - tabela:kafka-connect
  - tabela:airbyte
  - tabela:aws-dms
  - "[[timescaledb|TimescaleDB]]"
  - tabela:victoriametrics
  - "[[influxdb_cloud|InfluxDB Cloud]]"
  - "[[azure_data_explorer|Azure Data Explorer]]"
  - "[[opensearch|OpenSearch]]"
  - tabela:clickhouse-cloud
  - "[[amazon_opensearch_service|Amazon OpenSearch Service (ferramenta)]]"
  - "[[opentelemetry|OpenTelemetry]]"
  - "[[prometheus|Prometheus]]"
  - "[[grafana_cloud|Grafana Cloud]]"
  - "[[datadog|Datadog]]"
  - "[[podman|Podman]]"
  - tabela:k3s
  - "[[kubernetes|Kubernetes (ferramenta)]]"
  - "[[amazon_eks|Amazon EKS]]"
dataVerificacao: 2026-11-23
tags:
  - stack
---
# Pipeline de dados em streaming
<!-- stack:gen -->
## 📋 Resumo
`= this.descricao`
Exemplo: `= this.exemplo`
Domínio: `= this.dominio` / `= this.subdominio`
## 🔗 Relacionamentos
- **Hub:** [[hub_stacks|Mapa de Stacks de Engenharia]], [[hub_tools|Mapa de Ferramentas de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
