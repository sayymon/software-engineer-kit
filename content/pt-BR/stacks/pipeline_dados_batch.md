---
id: pipeline_dados_batch
tipo: stack
nome: Pipeline de dados batch
descricao: Fluxo que extrai dados de fontes, carrega em um armazém ou lakehouse e transforma por SQL versionado, com orquestração agendada, testes de qualidade e camada de BI para consumo.
fonte_ids:
  - dbt_modern_data_stack
exemplo: Um pipeline diário que ingere pedidos e eventos, modela tabelas de negócio no warehouse e alimenta um painel de resultados.
quando_usar:
  - Decisões de negócio dependem de análises sobre dados de várias fontes com atualização diária ou horária.
  - O time quer transformações em SQL versionadas, testadas e documentadas.
quando_evitar:
  - Dados que precisam reagir em segundos pedem processamento em streaming.
status: rascunho
publico: false
fontes:
  - id: dbt_modern_data_stack
    tipo: artigo
    titulo: "The Modern Data Stack: Past, Present, and Future (dbt Labs)"
    link: https://www.getdbt.com/blog/future-of-the-modern-data-stack
    status_revisao: revisada
    proxima_revisao: 2027-11-23
categorias:
  - "[[pipelines_orquestracao_dados|Pipelines e orquestração de dados]]"
  - "[[warehouse_lakehouse|Data warehouse e lakehouse]]"
  - "[[objetos_cdn|Armazenamento de objetos e CDN]]"
  - "[[frameworks_analise_dados|Frameworks de análise de dados]]"
  - "[[bi_dashboards|BI e dashboards]]"
  - "[[captura_mudancas_event_store|Captura de mudanças e event store]]"
  - "[[observabilidade_apm|Observabilidade e APM]]"
  - "[[infraestrutura_como_codigo|Infraestrutura como código]]"
aliases:
  - ETL e ELT em lote
  - Pipeline analítico
dominio: software
subdominio: Dados e automação
linguagens:
  - python
  - sql
slots:
  - id: orquestracao
    papel: Orquestração e transformação
    categoria: "[[pipelines_orquestracao_dados|Pipelines e orquestração de dados]]"
    obrigatorio: true
    maisBarata:
      - tabela:apache-airflow
      - tabela:dagster
    custoBeneficio:
      - "[[dbt_core|dbt Core]]"
      - tabela:airbyte
    qualidadeMaxima:
      - tabela:fivetran
      - tabela:databricks
    lacuna: ""
  - id: warehouse
    papel: Armazém de dados
    categoria: "[[warehouse_lakehouse|Data warehouse e lakehouse]]"
    obrigatorio: true
    maisBarata:
      - "[[clickhouse|ClickHouse]]"
      - tabela:duckdb
    custoBeneficio:
      - "[[google_bigquery|Google BigQuery]]"
      - "[[motherduck|MotherDuck]]"
    qualidadeMaxima:
      - "[[snowflake|Snowflake]]"
    lacuna: ""
  - id: storage
    papel: Armazenamento de arquivos brutos
    categoria: "[[objetos_cdn|Armazenamento de objetos e CDN]]"
    obrigatorio: true
    maisBarata:
      - "[[cloudflare_r2|Cloudflare R2]]"
      - tabela:minio
    custoBeneficio:
      - "[[amazon_s3|Amazon S3 (ferramenta)]]"
    qualidadeMaxima: []
    lacuna: "qualidadeMaxima: a camada de CDN não se aplica a arquivos brutos, e o armazenamento de objetos já cobre a durabilidade necessária."
  - id: analise
    papel: Análise e transformação em código
    categoria: "[[frameworks_analise_dados|Frameworks de análise de dados]]"
    obrigatorio: true
    maisBarata:
      - "[[pandas|pandas]]"
    custoBeneficio:
      - "[[polars|Polars]]"
    qualidadeMaxima:
      - "[[dask|Dask]]"
    lacuna: ""
  - id: bi
    papel: Painéis e BI
    categoria: "[[bi_dashboards|BI e dashboards]]"
    obrigatorio: true
    maisBarata:
      - "[[metabase|Metabase]]"
    custoBeneficio:
      - "[[looker_studio|Looker Studio]]"
      - tabela:power-bi
    qualidadeMaxima:
      - "[[tableau|Tableau]]"
    lacuna: ""
  - id: cdc
    papel: Captura de mudanças de bancos
    categoria: "[[captura_mudancas_event_store|Captura de mudanças e event store]]"
    obrigatorio: false
    maisBarata:
      - "[[debezium|Debezium]]"
    custoBeneficio:
      - tabela:airbyte
    qualidadeMaxima:
      - tabela:aws-dms
    lacuna: ""
  - id: obs
    papel: Observabilidade do pipeline
    categoria: "[[observabilidade_apm|Observabilidade e APM]]"
    obrigatorio: true
    maisBarata:
      - "[[opentelemetry|OpenTelemetry]]"
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
instancias:
  - nome: Modern Data Stack
    descricao: Composição em camadas de ingestão, armazém em nuvem, transformação com dbt e BI.
    linguagens:
      - sql
    ferramentas:
      - tabela:fivetran
      - "[[snowflake|Snowflake]]"
      - "[[dbt_core|dbt Core]]"
      - "[[metabase|Metabase]]"
    fonte_ids:
      - dbt_modern_data_stack
condicoes:
  time_maturidade:
    favorece:
      - Time de dados com SQL forte e hábito de revisão por pull request.
    contra:
      - Time sem quem opere o orquestrador e os conectores.
    preferir:
      - "[[automacao_integracoes|Automação e integrações orquestradas]]"
  escala_volume:
    favorece:
      - Terabytes por dia com janelas de processamento previsíveis.
    contra:
      - Volume baixo, em que uma planilha ou um banco relacional bastam.
    preferir:
      - "[[monolito_web_relacional|Monolito web com banco relacional]]"
  orcamento:
    favorece:
      - Armazéns que cobram por consulta mantêm custo proporcional ao uso.
    contra:
      - Consultas sem limite de custo em tabelas grandes.
    preferir:
      - "[[automacao_integracoes|Automação e integrações orquestradas]]"
  latencia:
    favorece:
      - Atualizações de horas ou de um dia atendem os consumidores.
    contra:
      - Decisões que dependem de dados com segundos de atraso.
    preferir:
      - "[[pipeline_dados_streaming|Pipeline de dados em streaming]]"
  compliance_dados:
    favorece:
      - Linhagem e catálogo documentam origem e uso dos dados.
    contra:
      - Dados pessoais que exigem mascaramento e retenção por política.
    preferir: []
    semAlternativa: "Este eixo não aponta para outro arquétipo: a stack cobre o cenário sozinha."
  prazo_entrega:
    favorece:
      - Conectores prontos encurtam a ingestão de fontes comuns.
    contra:
      - Fontes sem conector e sem API estável.
    preferir:
      - "[[automacao_integracoes|Automação e integrações orquestradas]]"
  lock_in:
    favorece:
      - Formatos abertos de tabela mantêm os dados portáveis.
    contra:
      - Armazéns proprietários concentram transformações em dialetos próprios.
    preferir: []
    semAlternativa: "Este eixo não aponta para outro arquétipo: a stack cobre o cenário sozinha."
outrosArquetipos:
  - stack: "[[pipeline_dados_streaming|Pipeline de dados em streaming]]"
    quando: Os dados precisam chegar e ser processados em segundos.
  - stack: "[[automacao_integracoes|Automação e integrações orquestradas]]"
    quando: O trabalho é integrar sistemas e disparar ações, sem foco analítico.
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
  - id: dados.testes_de_qualidade
    dominio: dados e migrações
    titulo: Testar a qualidade dos dados a cada carga
    verificacao: Cada tabela de negócio tem testes de unicidade, não nulidade e relacionamento, e a falha bloqueia a publicação.
    nivel: essencial
    slots:
      - orquestracao
      - warehouse
    depende: []
  - id: dados.linhagem_documentada
    dominio: dados e migrações
    titulo: Documentar a linhagem das tabelas
    verificacao: Cada tabela publicada mostra suas origens e consumidores num catálogo atualizado automaticamente.
    nivel: recomendado
    slots:
      - orquestracao
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
  - id: ops.reprocessamento_seguro
    dominio: operação e incidentes
    titulo: Reprocessar um período sem duplicar dados
    verificacao: Reexecutar uma janela de datas substitui os dados do período e mantém os totais corretos.
    nivel: essencial
    slots:
      - orquestracao
      - warehouse
    depende: []
padroes:
  - "[[change_data_capture|Change Data Capture]]"
  - "[[inbox_idempotent_consumer|Idempotência]]"
  - "[[retry_backoff_exponencial|Retry]]"
casosDeUso:
  - "[[engenharia_de_dados_e_etl|Engenharia de dados e ETL]]"
  - "[[analise_de_dados_e_bi|Análise de dados e BI]]"
variacoes:
  - etl-orquestracao
  - etl-transformacao-sql
  - bi-warehouse-consulta
ferramentas:
  - tabela:apache-airflow
  - tabela:dagster
  - "[[dbt_core|dbt Core]]"
  - tabela:airbyte
  - tabela:fivetran
  - tabela:databricks
  - "[[clickhouse|ClickHouse]]"
  - tabela:duckdb
  - "[[google_bigquery|Google BigQuery]]"
  - "[[motherduck|MotherDuck]]"
  - "[[snowflake|Snowflake]]"
  - "[[cloudflare_r2|Cloudflare R2]]"
  - tabela:minio
  - "[[amazon_s3|Amazon S3 (ferramenta)]]"
  - "[[pandas|pandas]]"
  - "[[polars|Polars]]"
  - "[[dask|Dask]]"
  - "[[metabase|Metabase]]"
  - "[[looker_studio|Looker Studio]]"
  - tabela:power-bi
  - "[[tableau|Tableau]]"
  - "[[debezium|Debezium]]"
  - tabela:aws-dms
  - "[[opentelemetry|OpenTelemetry]]"
  - "[[grafana_cloud|Grafana Cloud]]"
  - "[[datadog|Datadog]]"
  - "[[opentofu|OpenTofu]]"
  - "[[terraform|Terraform]]"
  - "[[hcp_terraform|HCP Terraform]]"
dataVerificacao: 2026-11-23
tags:
  - stack
---
# Pipeline de dados batch
<!-- stack:gen -->
## 📋 Resumo
`= this.descricao`
Exemplo: `= this.exemplo`
Domínio: `= this.dominio` / `= this.subdominio`
## 🔗 Relacionamentos
- **Hub:** [[hub_stacks|Mapa de Stacks de Engenharia]], [[hub_tools|Mapa de Ferramentas de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
