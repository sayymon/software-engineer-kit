---
id: monolito_jvm_corporativo
tipo: stack
nome: Monólito JVM corporativo
descricao: Monólito corporativo sobre a JVM em Java ou Kotlin, com domínio transacional em camadas, ORM maduro sobre banco relacional, log estruturado e integração com o ecossistema corporativo, empacotado em um único artefato implantável.
fonte_ids:
  - spring_boot_sql
  - maven_welcome
  - junit5_user_guide
exemplo: Um sistema interno de pedidos e faturamento com regras fiscais, Hibernate sobre PostgreSQL e integrações com ERPs e serviços legados por HTTP.
quando_usar:
  - Time Java ou Kotlin estabelecido, com contratação fácil no mercado.
  - Domínio transacional com regras ricas e ciclo de vida longo, mantido em um único artefato.
  - Integração com o ecossistema corporativo, como bancos, filas e ERPs, apoiada no ecossistema JVM maduro.
quando_evitar:
  - Escalabilidade horizontal extrema com orçamento de memória apertado por instância.
  - Time sem experiência em JVM ou que já vive em outra linguagem.
  - Escala a partir de zero sensível ao tempo de partida, em que a comparação com a stack serverless decide a escolha.
status: rascunho
publico: false
fontes:
  - id: spring_boot_sql
    tipo: artigo
    titulo: SQL Databases (Spring Boot Reference)
    link: https://docs.spring.io/spring-boot/reference/data/sql.html
    status_revisao: revisada
    proxima_revisao: 2027-11-27
  - id: maven_welcome
    tipo: artigo
    titulo: Welcome to Apache Maven (Apache Maven Project)
    link: https://maven.apache.org/
    status_revisao: revisada
    proxima_revisao: 2027-11-27
  - id: junit5_user_guide
    tipo: artigo
    titulo: JUnit User Guide (junit.org)
    link: https://junit.org/junit5/docs/current/user-guide/
    status_revisao: revisada
    proxima_revisao: 2027-11-27
categorias:
  - "[[frameworks_backend|Frameworks de backend]]"
  - "[[banco_relacional|Banco relacional]]"
  - "[[orm_acesso_dados|ORM e acesso a dados]]"
  - "[[frameworks_testes|Frameworks de testes]]"
  - "[[build_lint_formatacao|Build, lint e formatação]]"
  - "[[validacao_schemas|Validação e schemas]]"
  - "[[clientes_http_api|Clientes HTTP e API]]"
  - "[[logs_estruturados|Logs estruturados]]"
  - "[[chave_valor_cache|Chave-valor e cache]]"
  - "[[autenticacao_identidade|Autenticação e identidade]]"
  - "[[gateway_api_service_mesh|Gateway de API e service mesh]]"
  - "[[ci_cd_deploy|CI-CD e deploy]]"
  - "[[containers_orquestracao|Containers e orquestração]]"
  - "[[observabilidade_apm|Observabilidade e APM]]"
aliases:
  - Monólito Java corporativo
  - Monólito corporativo em Java
  - Monólito JVM
dominio: software
subdominio: Aplicações e APIs
linguagens:
  - java
  - kotlin
slots:
  - id: backend
    papel: Framework de backend
    categoria: "[[frameworks_backend|Frameworks de backend]]"
    obrigatorio: true
    maisBarata:
      - "[[vertx|Eclipse Vert.x]]"
    custoBeneficio:
      - "[[spring_boot|Spring Boot]]"
    qualidadeMaxima: []
    lacuna: "qualidadeMaxima: o topo corporativo é o próprio Spring Boot com suporte comercial; não há terceira opção JVM com nota para esta faixa."
  - id: banco
    papel: Banco relacional
    categoria: "[[banco_relacional|Banco relacional]]"
    obrigatorio: true
    maisBarata:
      - "[[postgresql|PostgreSQL]]"
    custoBeneficio: []
    qualidadeMaxima: []
    lacuna: "custoBeneficio e qualidadeMaxima: o domínio transacional cabe em um único PostgreSQL auto-hospedado bem operado; a escala que pediria banco gerenciado ou distribuído indica outro arquétipo, não um upgrade nesta camada."
  - id: orm
    papel: Mapeamento objeto-relacional
    categoria: "[[orm_acesso_dados|ORM e acesso a dados]]"
    obrigatorio: true
    maisBarata: []
    custoBeneficio: []
    qualidadeMaxima:
      - "[[hibernate_orm|Hibernate ORM]]"
    lacuna: "maisBarata e custoBeneficio: o acesso direto por JDBC vem embutido na plataforma Java e cobre o que fica abaixo do ORM; não há camada intermediária com nota entre o JDBC embutido e o Hibernate."
  - id: testes
    papel: Testes automatizados
    categoria: "[[frameworks_testes|Frameworks de testes]]"
    obrigatorio: true
    maisBarata:
      - "[[junit5|JUnit 5]]"
    custoBeneficio: []
    qualidadeMaxima: []
    lacuna: "custoBeneficio e qualidadeMaxima: o JUnit 5 é ao mesmo tempo o ponto de entrada e o padrão corporativo da JVM para um monólito único; o refinamento acima dele vem de bibliotecas de asserção e de mutação complementares, não de trocar de framework."
  - id: build
    papel: Build e dependências
    categoria: "[[build_lint_formatacao|Build, lint e formatação]]"
    obrigatorio: true
    maisBarata: []
    custoBeneficio:
      - "[[maven|Maven]]"
      - "[[gradle|Gradle]]"
    qualidadeMaxima: []
    lacuna: "maisBarata e qualidadeMaxima: o compilador vem embutido no JDK e cobre o mínimo abaixo do build; acima de Maven e Gradle estão os sistemas multi-repositório, sem nota aplicável a um monólito único."
  - id: serializacao
    papel: Serialização de JSON
    categoria: "[[validacao_schemas|Validação e schemas]]"
    obrigatorio: true
    maisBarata: []
    custoBeneficio:
      - "[[jackson|Jackson]]"
    qualidadeMaxima: []
    lacuna: "maisBarata e qualidadeMaxima: Jackson é a referência de fato para serialização de JSON na JVM, sem alternativa com nota no catálogo; a diferença de qualidade vem do conjunto de módulos usados, não de outra ferramenta."
  - id: http
    papel: Cliente HTTP para integrações
    categoria: "[[clientes_http_api|Clientes HTTP e API]]"
    obrigatorio: false
    maisBarata: []
    custoBeneficio: []
    qualidadeMaxima:
      - "[[okhttp|OkHttp]]"
    lacuna: "maisBarata e custoBeneficio: o cliente HTTP embutido no JDK cobre o consumo básico; o OkHttp fica para as integrações corporativas com interceptação, pooling e retries."
  - id: logs
    papel: Logs estruturados
    categoria: "[[logs_estruturados|Logs estruturados]]"
    obrigatorio: true
    maisBarata: []
    custoBeneficio:
      - "[[logback|Logback]]"
    qualidadeMaxima: []
    lacuna: "maisBarata e qualidadeMaxima: o Logback é o backend de log padrão do Spring Boot e cobre a stack sozinho; alternativas JVM como o Log4j2 ainda não têm nota no catálogo."
  - id: cache
    papel: Cache e sessões
    categoria: "[[chave_valor_cache|Chave-valor e cache]]"
    obrigatorio: false
    maisBarata:
      - "[[redis|Redis]]"
    custoBeneficio: []
    qualidadeMaxima: []
    lacuna: "custoBeneficio e qualidadeMaxima: o cache em memória dentro do processo cobre o uso leve e o Redis cobre o compartilhado entre réplicas; não há terceira opção com nota nesta stack."
  - id: identidade
    papel: Identidade e acesso
    categoria: "[[autenticacao_identidade|Autenticação e identidade]]"
    obrigatorio: false
    maisBarata:
      - "[[keycloak|Keycloak]]"
    custoBeneficio: []
    qualidadeMaxima: []
    lacuna: "custoBeneficio e qualidadeMaxima: a autenticação local fica no Spring Security embutido no framework e o SSO corporativo fica no Keycloak; entre eles não há opção com nota nesta stack."
  - id: proxy
    papel: Proxy reverso e borda
    categoria: "[[gateway_api_service_mesh|Gateway de API e service mesh]]"
    obrigatorio: true
    maisBarata:
      - "[[nginx|NGINX]]"
      - "[[traefik|Traefik]]"
    custoBeneficio: []
    qualidadeMaxima: []
    lacuna: "custoBeneficio e qualidadeMaxima: NGINX e Traefik resolvem terminação TLS e balanceamento das réplicas; gateway com plugins e service mesh agregam quando há muitos serviços conversando entre si, cenário de outro arquétipo."
  - id: obs
    papel: Observabilidade e erros
    categoria: "[[observabilidade_apm|Observabilidade e APM]]"
    obrigatorio: true
    maisBarata:
      - "[[opentelemetry|OpenTelemetry]]"
    custoBeneficio: []
    qualidadeMaxima: []
    lacuna: "custoBeneficio e qualidadeMaxima: a instrumentação OpenTelemetry cobre traces, métricas e logs da JVM; o backend de visualização e alerta é decisão de infraestrutura, com notas no catálogo geral, fora desta stack."
  - id: cicd
    papel: Pipeline de entrega
    categoria: "[[ci_cd_deploy|CI-CD e deploy]]"
    obrigatorio: true
    maisBarata:
      - "[[jenkins|Jenkins]]"
    custoBeneficio:
      - "[[github_actions|GitHub Actions]]"
    qualidadeMaxima: []
    lacuna: "qualidadeMaxima: para um único artefato monolítico, Jenkins ou GitHub Actions entregam o pipeline exigido; plataformas empresariais de deploy agregam quando há muitos serviços, cenário de outro arquétipo."
  - id: containers
    papel: Empacotamento e execução
    categoria: "[[containers_orquestracao|Containers e orquestração]]"
    obrigatorio: true
    maisBarata: []
    custoBeneficio:
      - "[[docker_desktop|Docker Desktop]]"
      - "[[kubernetes|Kubernetes]]"
    qualidadeMaxima: []
    lacuna: "maisBarata e qualidadeMaxima: o executável da JVM dispensa container no início; da estação local com Docker Desktop ao Kubernetes de produção, a camada fecha em réplicas de um mesmo processo, e o orquestrador gerenciado acima disso serve a muitos serviços, cenário de outro arquétipo."
instancias:
  - nome: Spring Boot + Hibernate + PostgreSQL
    descricao: Composição Java em que o Spring Boot auto-configura o Hibernate como implementação JPA sobre um banco relacional PostgreSQL.
    linguagens:
      - java
    ferramentas:
      - "[[spring_boot|Spring Boot]]"
      - "[[hibernate_orm|Hibernate ORM]]"
      - "[[postgresql|PostgreSQL]]"
    fonte_ids:
      - spring_boot_sql
condicoes:
  time_maturidade:
    favorece:
      - Time Java ou Kotlin estabelecido, que contrata e forma pessoas com facilidade.
      - Domínio transacional com regras ricas que pedem camadas e testes de negócio.
    contra:
      - Time sem experiência em JVM, que pagará o imposto de aprendizado da plataforma.
    preferir:
      - "[[monolito_web_relacional|Monolito web com banco relacional]]"
  escala_volume:
    favorece:
      - Carga previsível atendida por escala vertical e por réplicas do mesmo processo.
    contra:
      - Escalabilidade horizontal extrema com orçamento de memória apertado por instância.
    preferir:
      - "[[api_serverless_edge|API serverless e edge]]"
  orcamento:
    favorece:
      - Pilha open-source sem licença por nó e mercado de pessoas contratáveis reduzem o custo da equipe.
    contra:
      - Orçamento de memória que não comporta o heap de centenas de MB por réplica.
    preferir:
      - "[[monolito_web_relacional|Monolito web com banco relacional]]"
  latencia:
    favorece:
      - Chamadas entre módulos em memória e JIT aquecido mantêm a latência baixa em regime contínuo.
    contra:
      - Aquecimento de instâncias novas da JVM em dezenas de segundos penaliza a escala abrupta.
    preferir:
      - "[[api_serverless_edge|API serverless e edge]]"
  compliance_dados:
    favorece:
      - Um único banco e um único processo simplificam controles de acesso, auditoria e retenção fiscal.
    contra:
      - Isolamento por regulação entre domínios, que pede fronteiras físicas.
    preferir:
      - "[[api_transacional_eventos|API transacional com eventos]]"
  prazo_entrega:
    favorece:
      - Convenções maduras do framework e mercado de pessoas contratáveis aceleram as primeiras entregas.
    contra:
      - Prazo curto com time que precisaria aprender a JVM do zero.
    preferir:
      - "[[monolito_web_relacional|Monolito web com banco relacional]]"
  lock_in:
    favorece:
      - Padrões abertos de Java e Jakarta, SQL e HTTP mantêm a portabilidade entre provedores e runtimes.
    contra:
      - Suporte comercial e ferramentas proprietárias de um único fornecedor aumentam a dependência.
    preferir: []
    semAlternativa: "Este eixo não aponta para outro arquétipo: a stack cobre o cenário sozinha."
outrosArquetipos:
  - stack: "[[monolito_web_relacional|Monolito web com banco relacional]]"
    quando: O monólito é a forma certa, mas o time vive em outra linguagem, como Ruby, PHP ou Python.
  - stack: "[[api_transacional_eventos|API transacional com eventos]]"
    quando: Fluxos assíncronos entre serviços passam a ser parte central do produto.
  - stack: "[[api_serverless_edge|API serverless e edge]]"
    quando: O tráfego é esparso e o custo por uso supera instâncias JVM ligadas o tempo todo.
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
padroes:
  - "[[monolito_modular|Monolito Modular]]"
  - "[[arquitetura_em_camadas|Arquitetura em Camadas]]"
  - "[[cache_aside|Cache-aside]]"
  - "[[strangler_fig|Strangler Fig]]"
casosDeUso:
  - "[[software_b2b_media_empresa|Software B2B (média empresa)]]"
  - "[[financas_fiscal_e_contabilidade|Finanças, fiscal e contabilidade]]"
  - "[[migracao_e_modernizacao_de_codigo|Migração e modernização de código]]"
variacoes:
  - pedidos-faturamento-interno
  - integracao-erp-legado
ferramentas:
  - "[[spring_boot|Spring Boot]]"
  - "[[vertx|Eclipse Vert.x]]"
  - "[[postgresql|PostgreSQL]]"
  - "[[hibernate_orm|Hibernate ORM]]"
  - "[[junit5|JUnit 5]]"
  - "[[maven|Maven]]"
  - "[[gradle|Gradle]]"
  - "[[jackson|Jackson]]"
  - "[[okhttp|OkHttp]]"
  - "[[logback|Logback]]"
  - "[[redis|Redis]]"
  - "[[keycloak|Keycloak]]"
  - "[[nginx|NGINX]]"
  - "[[traefik|Traefik]]"
  - "[[opentelemetry|OpenTelemetry]]"
  - "[[jenkins|Jenkins]]"
  - "[[github_actions|GitHub Actions]]"
  - "[[docker_desktop|Docker Desktop]]"
  - "[[kubernetes|Kubernetes]]"
dataVerificacao: 2026-11-27
tags:
  - stack
---
# Monólito JVM corporativo
<!-- stack:gen -->
## 📋 Resumo
`= this.descricao`
Exemplo: `= this.exemplo`
Domínio: `= this.dominio` / `= this.subdominio`
## 🔗 Relacionamentos
- **Hub:** [[hub_stacks|Mapa de Stacks de Engenharia]], [[hub_tools|Mapa de Ferramentas de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
