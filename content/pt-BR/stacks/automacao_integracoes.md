---
id: automacao_integracoes
tipo: stack
nome: Automação e integrações orquestradas
descricao: Conjunto de fluxos que reagem a gatilhos de sistemas e SaaS, chamam APIs, transformam dados e coordenam etapas com retentativas, filas e aprovações humanas, de plataformas visuais a código durável.
fonte_ids: []
exemplo: Um fluxo que recebe um webhook de venda, cria o cliente no CRM, emite a nota fiscal e avisa o time no chat.
quando_usar:
  - Processos repetitivos conectam vários sistemas que já expõem APIs ou webhooks.
  - Áreas de negócio precisam de fluxos que mudam com frequência.
quando_evitar:
  - Lógica de negócio central e de alta criticidade ganha controle em código de aplicação com testes.
status: rascunho
publico: false
fontes: []
categorias:
  - "[[automacao_nocode|Automação e no-code]]"
  - "[[orquestracao_workflows_sagas|Orquestração de workflows e sagas]]"
  - "[[filas_jobs_background|Filas e jobs em background]]"
  - "[[clientes_http_api|Clientes HTTP e API]]"
  - "[[gateway_api_service_mesh|Gateway de API e service mesh]]"
  - "[[testes_documentacao_apis|Testes e documentação de APIs]]"
  - "[[senhas_segredos|Gerenciador de senhas e segredos]]"
  - "[[observabilidade_apm|Observabilidade e APM]]"
aliases:
  - Automação de processos
  - Orquestração de integrações
dominio: software
subdominio: Dados e automação
linguagens:
  - javascript
  - python
slots:
  - id: automacao
    papel: Plataforma de fluxos
    categoria: "[[automacao_nocode|Automação e no-code]]"
    obrigatorio: true
    maisBarata:
      - tabela:activepieces
      - tabela:windmill
      - tabela:node-red
    custoBeneficio:
      - "[[n8n|n8n]]"
      - tabela:make
    qualidadeMaxima:
      - tabela:zapier
      - tabela:workato
    lacuna: ""
  - id: workflow
    papel: Orquestração durável
    categoria: "[[orquestracao_workflows_sagas|Orquestração de workflows e sagas]]"
    obrigatorio: false
    maisBarata:
      - tabela:conductor
    custoBeneficio:
      - "[[temporal|Temporal]]"
    qualidadeMaxima:
      - tabela:aws-step-functions
    lacuna: ""
  - id: jobs
    papel: Filas e jobs
    categoria: "[[filas_jobs_background|Filas e jobs em background]]"
    obrigatorio: true
    maisBarata:
      - "[[bullmq|BullMQ]]"
      - tabela:celery
    custoBeneficio:
      - "[[inngest|Inngest]]"
      - tabela:trigger-dev
    qualidadeMaxima:
      - tabela:prefect
    lacuna: ""
  - id: cliente
    papel: Cliente HTTP
    categoria: "[[clientes_http_api|Clientes HTTP e API]]"
    obrigatorio: true
    maisBarata:
      - "[[ky|ky]]"
    custoBeneficio:
      - "[[axios|Axios]]"
      - "[[httpx|HTTPX]]"
    qualidadeMaxima: []
    lacuna: "qualidadeMaxima: os clientes HTTP da categoria dessa faixa pertencem a outras linguagens, e as escolhas acima cobrem JavaScript e Python."
  - id: gateway
    papel: Gateway e entrada de webhooks
    categoria: "[[gateway_api_service_mesh|Gateway de API e service mesh]]"
    obrigatorio: false
    maisBarata:
      - "[[nginx|NGINX]]"
    custoBeneficio:
      - "[[kong_gateway|Kong Gateway]]"
    qualidadeMaxima:
      - tabela:amazon-api-gateway
    lacuna: ""
  - id: teste_api
    papel: Teste de APIs integradas
    categoria: "[[testes_documentacao_apis|Testes e documentação de APIs]]"
    obrigatorio: true
    maisBarata:
      - "[[bruno|Bruno]]"
      - tabela:httpie
    custoBeneficio:
      - "[[insomnia|Insomnia]]"
    qualidadeMaxima:
      - "[[postman|Postman]]"
    lacuna: ""
  - id: segredos
    papel: Segredos das integrações
    categoria: "[[senhas_segredos|Gerenciador de senhas e segredos]]"
    obrigatorio: true
    maisBarata:
      - tabela:infisical
    custoBeneficio:
      - tabela:doppler
    qualidadeMaxima:
      - "[[hashicorp_vault|HashiCorp Vault]]"
    lacuna: ""
  - id: obs
    papel: Observabilidade dos fluxos
    categoria: "[[observabilidade_apm|Observabilidade e APM]]"
    obrigatorio: true
    maisBarata:
      - "[[opentelemetry|OpenTelemetry]]"
    custoBeneficio:
      - "[[sentry|Sentry]]"
    qualidadeMaxima:
      - "[[datadog|Datadog]]"
    lacuna: ""
instancias: []
condicoes:
  time_maturidade:
    favorece:
      - Áreas de negócio com apoio de uma pessoa técnica para manter os fluxos.
    contra:
      - Fluxos críticos mantidos sem revisão nem versionamento.
    preferir:
      - "[[api_transacional_eventos|API transacional com eventos]]"
  escala_volume:
    favorece:
      - Milhares de execuções por dia com retentativas e filas.
    contra:
      - Milhões de eventos por dia, que pedem uma pipeline de streaming.
    preferir:
      - "[[pipeline_dados_streaming|Pipeline de dados em streaming]]"
  orcamento:
    favorece:
      - Opções autohospedadas mantêm o custo por execução baixo.
    contra:
      - Planos por tarefa de SaaS crescem com o volume.
    preferir: []
    semAlternativa: "Este eixo não aponta para outro arquétipo: a stack cobre o cenário sozinha."
  latencia:
    favorece:
      - Fluxos assíncronos toleram segundos de atraso.
    contra:
      - Respostas síncronas a usuários em milissegundos.
    preferir:
      - "[[api_serverless_edge|API serverless e edge]]"
  compliance_dados:
    favorece:
      - Credenciais por integração com escopo mínimo e auditoria.
    contra:
      - Dados pessoais trafegando por plataformas de terceiros.
    preferir: []
    semAlternativa: "Este eixo não aponta para outro arquétipo: a stack cobre o cenário sozinha."
  prazo_entrega:
    favorece:
      - Conectores prontos entregam o primeiro fluxo em horas.
    contra:
      - Sistemas sem API, que exigem trabalho de integração sob medida.
    preferir:
      - "[[api_transacional_eventos|API transacional com eventos]]"
  lock_in:
    favorece:
      - Fluxos exportáveis e plataformas abertas facilitam a saída.
    contra:
      - Fluxos em formato proprietário de um único fornecedor.
    preferir: []
    semAlternativa: "Este eixo não aponta para outro arquétipo: a stack cobre o cenário sozinha."
outrosArquetipos:
  - stack: "[[api_transacional_eventos|API transacional com eventos]]"
    quando: A integração faz parte do núcleo do produto e exige consistência transacional.
  - stack: "[[pipeline_dados_batch|Pipeline de dados batch]]"
    quando: O destino dos dados é a análise em um armazém.
  - stack: "[[agente_ferramentas_memoria|Agente com ferramentas e memória]]"
    quando: Parte das decisões do fluxo vem de um agente com ferramentas.
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
  - id: seg.credencial_por_integracao
    dominio: segurança
    titulo: Usar uma credencial por integração
    verificacao: Cada integração usa uma credencial própria, com escopo mínimo e rotação periódica.
    nivel: essencial
    slots:
      - segredos
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
  - id: dados.execucao_idempotente
    dominio: dados e migrações
    titulo: Garantir execução idempotente
    verificacao: Receber o mesmo webhook duas vezes não duplica registros nem ações.
    nivel: essencial
    slots:
      - automacao
      - jobs
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
  - id: ops.falhas_notificadas
    dominio: operação e incidentes
    titulo: Notificar falhas de execução
    verificacao: Toda execução que falha após as tentativas gera um alerta com o contexto necessário para correção.
    nivel: essencial
    slots:
      - automacao
      - obs
    depende: []
padroes:
  - "[[retry_backoff_exponencial|Retry]]"
  - "[[dead_letter_queue|DLQ]]"
  - "[[inbox_idempotent_consumer|Idempotência]]"
  - "[[publish_subscribe|Publish-Subscribe]]"
  - "[[saga_orquestrada|SAGA Orquestrada]]"
casosDeUso:
  - "[[automacao_de_processos|Automação de processos]]"
  - "[[automacao_no_code_de_fluxos|Automação no-code de fluxos]]"
  - "[[integracao_de_apis_e_webhooks|Integração de APIs e webhooks]]"
variacoes:
  - proc-integracao-saas
  - nocode-gatilho-acao
  - api-webhooks-recebimento
ferramentas:
  - tabela:activepieces
  - tabela:windmill
  - tabela:node-red
  - "[[n8n|n8n]]"
  - tabela:make
  - tabela:zapier
  - tabela:workato
  - tabela:conductor
  - "[[temporal|Temporal]]"
  - tabela:aws-step-functions
  - "[[bullmq|BullMQ]]"
  - tabela:celery
  - "[[inngest|Inngest]]"
  - tabela:trigger-dev
  - tabela:prefect
  - "[[ky|ky]]"
  - "[[axios|Axios]]"
  - "[[httpx|HTTPX]]"
  - "[[nginx|NGINX]]"
  - "[[kong_gateway|Kong Gateway]]"
  - tabela:amazon-api-gateway
  - "[[bruno|Bruno]]"
  - tabela:httpie
  - "[[insomnia|Insomnia]]"
  - "[[postman|Postman]]"
  - tabela:infisical
  - tabela:doppler
  - "[[hashicorp_vault|HashiCorp Vault]]"
  - "[[opentelemetry|OpenTelemetry]]"
  - "[[sentry|Sentry]]"
  - "[[datadog|Datadog]]"
dataVerificacao: 2026-11-23
tags:
  - stack
---
# Automação e integrações orquestradas
<!-- stack:gen -->
## 📋 Resumo
`= this.descricao`
Exemplo: `= this.exemplo`
Domínio: `= this.dominio` / `= this.subdominio`
## 🔗 Relacionamentos
- **Hub:** [[hub_stacks|Mapa de Stacks de Engenharia]], [[hub_tools|Mapa de Ferramentas de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
