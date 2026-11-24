---
id: api_serverless_edge
tipo: stack
nome: API serverless e edge
descricao: API composta por funções executadas sob demanda em plataformas serverless ou na borda da rede, com banco acessível por HTTP, cache de chave-valor e gateway que aplica limites e autenticação.
fonte_ids: []
exemplo: Uma API de webhooks que recebe eventos de pagamento, valida a assinatura e grava o resultado, escalando de zero a milhares de execuções.
quando_usar:
  - O tráfego é irregular e o custo por uso é mais vantajoso do que servidores ligados o tempo todo.
  - A resposta precisa sair perto do usuário, em várias regiões.
quando_evitar:
  - Cargas contínuas e previsíveis ou conexões longas com estado costumam custar menos em contêineres.
status: rascunho
publico: false
fontes: []
categorias:
  - "[[serverless_edge|Serverless e edge]]"
  - "[[frameworks_backend|Frameworks de backend]]"
  - "[[banco_relacional|Banco relacional]]"
  - "[[chave_valor_cache|Chave-valor e cache]]"
  - "[[gateway_api_service_mesh|Gateway de API e service mesh]]"
  - "[[observabilidade_apm|Observabilidade e APM]]"
  - "[[infraestrutura_como_codigo|Infraestrutura como código]]"
  - "[[ci_cd_deploy|CI-CD e deploy]]"
aliases:
  - Funções serverless
  - API na borda
dominio: software
subdominio: Aplicações e APIs
linguagens:
  - typescript
  - javascript
  - python
  - go
slots:
  - id: runtime
    papel: Execução serverless e de borda
    categoria: "[[serverless_edge|Serverless e edge]]"
    obrigatorio: true
    maisBarata:
      - "[[cloudflare_workers|Cloudflare Workers]]"
      - tabela:deno-deploy
    custoBeneficio:
      - "[[aws_lambda|AWS Lambda (ferramenta)]]"
      - tabela:google-cloud-run
    qualidadeMaxima:
      - "[[fastly_compute|Fastly Compute]]"
    lacuna: ""
  - id: framework
    papel: Framework de rotas
    categoria: "[[frameworks_backend|Frameworks de backend]]"
    obrigatorio: true
    maisBarata:
      - tabela:hono
    custoBeneficio:
      - "[[fastapi|FastAPI]]"
    qualidadeMaxima: []
    lacuna: "qualidadeMaxima: frameworks enxutos dominam esta camada, e a diferença de qualidade vem da plataforma de execução."
  - id: banco
    papel: Banco acessível por HTTP
    categoria: "[[banco_relacional|Banco relacional]]"
    obrigatorio: true
    maisBarata:
      - tabela:turso
    custoBeneficio:
      - "[[neon|Neon]]"
      - tabela:planetscale
    qualidadeMaxima:
      - tabela:google-cloud-spanner
    lacuna: ""
  - id: kv
    papel: Chave-valor e cache
    categoria: "[[chave_valor_cache|Chave-valor e cache]]"
    obrigatorio: true
    maisBarata:
      - "[[redis|Redis (ferramenta)]]"
    custoBeneficio:
      - "[[upstash|Upstash]]"
    qualidadeMaxima:
      - "[[amazon_dynamodb|Amazon DynamoDB (ferramenta)]]"
    lacuna: ""
  - id: gateway
    papel: Gateway de API
    categoria: "[[gateway_api_service_mesh|Gateway de API e service mesh]]"
    obrigatorio: true
    maisBarata:
      - tabela:nginx
    custoBeneficio:
      - "[[kong_gateway|Kong Gateway]]"
    qualidadeMaxima:
      - tabela:amazon-api-gateway
    lacuna: ""
  - id: obs
    papel: Observabilidade e erros
    categoria: "[[observabilidade_apm|Observabilidade e APM]]"
    obrigatorio: true
    maisBarata:
      - "[[opentelemetry|OpenTelemetry]]"
    custoBeneficio:
      - tabela:sentry
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
      - tabela:pulumi
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
instancias: []
condicoes:
  time_maturidade:
    favorece:
      - Time habituado a eventos, funções e infraestrutura declarada.
    contra:
      - Time que depende de depuração local com estado e processos longos.
    preferir:
      - "[[monolito_web_relacional|Monolito web com banco relacional]]"
  escala_volume:
    favorece:
      - Escala automática de zero a picos de milhares de execuções.
    contra:
      - Volume alto e constante, em que servidores dedicados custam menos.
    preferir:
      - "[[api_transacional_eventos|API transacional com eventos]]"
  orcamento:
    favorece:
      - Pagamento por execução cobre protótipos e tráfego baixo.
    contra:
      - Faturas imprevisíveis sem limites de concorrência.
    preferir:
      - "[[monolito_web_relacional|Monolito web com banco relacional]]"
  latencia:
    favorece:
      - Execução na borda reduz a latência para usuários distantes.
    contra:
      - Partida a frio em rotas críticas que exigem tempo de resposta estável.
    preferir:
      - "[[api_transacional_eventos|API transacional com eventos]]"
  compliance_dados:
    favorece:
      - Isolamento de execução por função e permissões mínimas por rota.
    contra:
      - Dados que não podem sair de uma região específica.
    preferir:
      - "[[api_transacional_eventos|API transacional com eventos]]"
  prazo_entrega:
    favorece:
      - Primeira versão em dias, sem provisionar servidores.
    contra:
      - Prazo que inclui migrar um sistema legado com muitas dependências.
    preferir:
      - "[[monolito_web_relacional|Monolito web com banco relacional]]"
  lock_in:
    favorece:
      - Padrões de HTTP e frameworks portáveis reduzem a troca de plataforma.
    contra:
      - APIs específicas da plataforma de execução prendem o código.
    preferir: []
    semAlternativa: "Este eixo não aponta para outro arquétipo: a stack cobre o cenário sozinha."
outrosArquetipos:
  - stack: "[[api_transacional_eventos|API transacional com eventos]]"
    quando: A consistência entre serviços e a coordenação de processos longos viram o centro do problema.
  - stack: "[[monolito_web_relacional|Monolito web com banco relacional]]"
    quando: O tráfego é estável e o time prefere um único processo para operar.
  - stack: "[[automacao_integracoes|Automação e integrações orquestradas]]"
    quando: O trabalho é reagir a eventos de SaaS com fluxos visuais.
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
  - id: obs.partida_a_frio_medida
    dominio: observabilidade
    titulo: Medir o tempo de partida a frio
    verificacao: O painel mostra o percentil de partida a frio por função, com meta combinada.
    nivel: recomendado
    slots:
      - runtime
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
  - id: seg.permissao_minima_por_funcao
    dominio: segurança
    titulo: Dar a cada função apenas a permissão necessária
    verificacao: Cada função tem uma identidade própria com permissões revisadas a cada mudança de código.
    nivel: essencial
    slots:
      - runtime
      - iac
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
  - id: custo.limites_de_concorrencia
    dominio: custos
    titulo: Definir limites de concorrência e de duração
    verificacao: Cada função tem limite de execuções simultâneas e de tempo, com alerta quando se aproxima do teto.
    nivel: essencial
    slots:
      - runtime
    depende: []
  - id: dados.migracoes_versionadas
    dominio: dados e migrações
    titulo: Versionar as migrações de dados
    verificacao: Mudanças de esquema entram por migrações versionadas, aplicadas por pipeline e compatíveis com a versão anterior da aplicação.
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
  - "[[api_gateway|API Gateway (padrão)]]"
  - "[[rate_limiting|Rate Limiting (padrão)]]"
  - "[[inbox_idempotent_consumer|Idempotência]]"
  - "[[timeout|Timeout]]"
  - "[[retry_backoff_exponencial|Retry]]"
  - "[[circuit_breaker|Circuit Breaker]]"
casosDeUso:
  - "[[integracao_de_apis_e_webhooks|Integração de APIs e webhooks]]"
  - "[[startup_saas_inicial_pequena_empresa|Startup SaaS inicial (pequena empresa)]]"
variacoes:
  - api-webhooks-recebimento
  - saas-deploy-auth-pagamento
ferramentas:
  - "[[cloudflare_workers|Cloudflare Workers]]"
  - tabela:deno-deploy
  - "[[aws_lambda|AWS Lambda (ferramenta)]]"
  - tabela:google-cloud-run
  - "[[fastly_compute|Fastly Compute]]"
  - tabela:hono
  - "[[fastapi|FastAPI]]"
  - tabela:turso
  - "[[neon|Neon]]"
  - tabela:planetscale
  - tabela:google-cloud-spanner
  - "[[redis|Redis (ferramenta)]]"
  - "[[upstash|Upstash]]"
  - "[[amazon_dynamodb|Amazon DynamoDB (ferramenta)]]"
  - tabela:nginx
  - "[[kong_gateway|Kong Gateway]]"
  - tabela:amazon-api-gateway
  - "[[opentelemetry|OpenTelemetry]]"
  - tabela:sentry
  - "[[datadog|Datadog]]"
  - "[[opentofu|OpenTofu]]"
  - "[[terraform|Terraform]]"
  - tabela:pulumi
  - "[[hcp_terraform|HCP Terraform]]"
  - "[[woodpecker_ci|Woodpecker CI]]"
  - "[[github_actions|GitHub Actions]]"
  - "[[harness|Harness]]"
dataVerificacao: 2026-11-23
tags:
  - stack
---
# API serverless e edge
<!-- stack:gen -->
## 📋 Resumo
`= this.descricao`
Exemplo: `= this.exemplo`
Domínio: `= this.dominio` / `= this.subdominio`
## 🔗 Relacionamentos
- **Hub:** [[hub_stacks|Mapa de Stacks de Engenharia]], [[hub_tools|Mapa de Ferramentas de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
