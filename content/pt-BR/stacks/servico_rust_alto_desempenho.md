---
id: servico_rust_alto_desempenho
tipo: stack
nome: Serviço Rust de alto desempenho
descricao: Serviço de API em Rust com framework de rotas sobre runtime assíncrono, acesso a dados com verificação em compilação, serialização derivada em compilação, log estruturado e binário único de implantação atrás de proxy de entrada.
fonte_ids:
  - axum_docs
  - tokio_docs
  - sqlx_docs
exemplo: Um serviço de cotação e telemetria que responde em microssegundos por instância e mantém o p95 estável sob pico de tráfego.
quando_usar:
  - A latência p95 é exigente e o serviço precisa responder em microssegundos por instância, sem pausas de coletor de lixo.
  - O throughput por máquina manda e menos instâncias atendem o mesmo volume de tráfego.
  - O orçamento de memória por instância é apertado e cada megabyte conta.
  - A implantação pede um binário simples, sem runtime nem dependências no destino.
quando_evitar:
  - O time não tem experiência em Rust e a curva de aprendizado não cabe no prazo.
  - O produto é um CRUD comum com prazo curto, em que o tempo de resposta tolerante já basta.
  - A contratação fácil de pessoas importa mais do que o desempenho máximo por máquina.
status: rascunho
publico: false
fontes:
  - id: axum_docs
    tipo: artigo
    titulo: axum documentation (docs.rs)
    link: https://docs.rs/axum/latest/axum/
    status_revisao: revisada
    proxima_revisao: 2027-11-27
  - id: tokio_docs
    tipo: artigo
    titulo: Tokio - An asynchronous Rust runtime
    link: https://tokio.rs/
    status_revisao: revisada
    proxima_revisao: 2027-11-27
  - id: sqlx_docs
    tipo: artigo
    titulo: SQLx documentation (docs.rs)
    link: https://docs.rs/sqlx/latest/sqlx/
    status_revisao: revisada
    proxima_revisao: 2027-11-27
categorias:
  - "[[frameworks_backend|Frameworks de backend]]"
  - "[[orm_acesso_dados|ORM e acesso a dados]]"
  - "[[validacao_schemas|Validação e schemas]]"
  - "[[chave_valor_cache|Chave-valor e cache]]"
  - "[[banco_relacional|Banco relacional]]"
  - "[[gateway_api_service_mesh|Gateway de API e service mesh]]"
  - "[[observabilidade_apm|Observabilidade e APM]]"
  - "[[ci_cd_deploy|CI-CD e deploy]]"
  - "[[containers_orquestracao|Containers e orquestração]]"
  - "[[logs_estruturados|Logs estruturados]]"
  - "[[build_lint_formatacao|Build, lint e formatação]]"
  - "[[clientes_http_api|Clientes HTTP e API]]"
aliases:
  - API Rust de alto desempenho
  - Serviço de API em Rust
dominio: software
subdominio: Aplicações e APIs
linguagens:
  - rust
slots:
  - id: framework
    papel: Framework de rotas
    categoria: "[[frameworks_backend|Frameworks de backend]]"
    obrigatorio: true
    maisBarata:
      - "[[axum|axum]]"
    custoBeneficio:
      - "[[actix_web|Actix Web]]"
    qualidadeMaxima: []
    lacuna: "qualidadeMaxima: axum e Actix Web cobrem as escolhas convencionais do ecossistema; a diferença competitiva vem do runtime e do desenho do serviço, não de um terceiro framework com nota."
  - id: runtime
    papel: Runtime assíncrono
    categoria: "[[frameworks_backend|Frameworks de backend]]"
    obrigatorio: true
    maisBarata: []
    custoBeneficio:
      - "[[tokio|Tokio]]"
    qualidadeMaxima: []
    lacuna: "maisBarata e qualidadeMaxima: Tokio é o runtime de referência do ecossistema assíncrono em Rust; o kit não tem nota de alternativa com adoção comparável."
  - id: dados
    papel: Acesso a dados
    categoria: "[[orm_acesso_dados|ORM e acesso a dados]]"
    obrigatorio: true
    maisBarata:
      - "[[sqlx|sqlx]]"
    custoBeneficio:
      - "[[diesel|Diesel]]"
    qualidadeMaxima: []
    lacuna: "qualidadeMaxima: sqlx e Diesel cobrem o acesso a dados em Rust com verificação em compilação; o kit não tem terceira nota desta camada para a linguagem."
  - id: serializacao
    papel: Serialização
    categoria: "[[validacao_schemas|Validação e schemas]]"
    obrigatorio: true
    maisBarata: []
    custoBeneficio:
      - "[[serde|serde]]"
    qualidadeMaxima: []
    lacuna: "maisBarata e qualidadeMaxima: serde é a base de serialização do ecossistema Rust; o kit não tem nota de alternativa com adoção comparável."
  - id: logs
    papel: Log estruturado
    categoria: "[[logs_estruturados|Logs estruturados]]"
    obrigatorio: true
    maisBarata: []
    custoBeneficio:
      - "[[tracing_rust|tracing]]"
    qualidadeMaxima: []
    lacuna: "maisBarata e qualidadeMaxima: tracing é a biblioteca de log estruturado de referência em Rust; o kit não tem nota de alternativa com adoção comparável."
  - id: build
    papel: Build e testes
    categoria: "[[build_lint_formatacao|Build, lint e formatação]]"
    obrigatorio: true
    maisBarata: []
    custoBeneficio:
      - "[[cargo|cargo]]"
    qualidadeMaxima: []
    lacuna: "maisBarata e qualidadeMaxima: cargo é a ferramenta de build e testes embutida na toolchain Rust; o kit não tem nota de alternativa com adoção comparável."
  - id: http
    papel: Cliente HTTP
    categoria: "[[clientes_http_api|Clientes HTTP e API]]"
    obrigatorio: false
    maisBarata: []
    custoBeneficio:
      - "[[reqwest|reqwest]]"
    qualidadeMaxima: []
    lacuna: "maisBarata e qualidadeMaxima: reqwest é o cliente HTTP de referência sobre Tokio; o kit não tem nota de alternativa em Rust para esta camada."
  - id: cache
    papel: Cache e chave-valor
    categoria: "[[chave_valor_cache|Chave-valor e cache]]"
    obrigatorio: false
    maisBarata: []
    custoBeneficio:
      - "[[redis|Redis]]"
    qualidadeMaxima: []
    lacuna: "maisBarata e qualidadeMaxima: o kit não tem segunda nota de cache aplicável a esta stack; Redis cobre a camada sozinho."
  - id: banco
    papel: Banco relacional
    categoria: "[[banco_relacional|Banco relacional]]"
    obrigatorio: true
    maisBarata: []
    custoBeneficio:
      - "[[postgresql|PostgreSQL]]"
    qualidadeMaxima: []
    lacuna: "maisBarata e qualidadeMaxima: o kit não tem segunda nota de banco relacional aplicável a esta stack; PostgreSQL cobre a camada sozinho."
  - id: proxy
    papel: Proxy de entrada
    categoria: "[[gateway_api_service_mesh|Gateway de API e service mesh]]"
    obrigatorio: true
    maisBarata:
      - "[[nginx|NGINX]]"
    custoBeneficio:
      - "[[traefik|Traefik]]"
    qualidadeMaxima: []
    lacuna: "qualidadeMaxima: a camada de service mesh fica fora do desenho mínimo; o proxy de entrada cobre roteamento e TLS na frente do binário."
  - id: cicd
    papel: Pipeline de entrega
    categoria: "[[ci_cd_deploy|CI-CD e deploy]]"
    obrigatorio: true
    maisBarata: []
    custoBeneficio:
      - "[[github_actions|GitHub Actions]]"
    qualidadeMaxima: []
    lacuna: "maisBarata e qualidadeMaxima: o kit não tem segunda nota de CI aplicável a esta stack; GitHub Actions cobre a camada sozinho."
  - id: orquestracao
    papel: Orquestração de contêineres
    categoria: "[[containers_orquestracao|Containers e orquestração]]"
    obrigatorio: false
    maisBarata: []
    custoBeneficio:
      - "[[kubernetes|Kubernetes]]"
    qualidadeMaxima: []
    lacuna: "maisBarata e qualidadeMaxima: o kit não tem segunda nota de orquestração aplicável a esta stack; Kubernetes cobre a camada sozinho."
instancias: []
condicoes:
  time_maturidade:
    favorece:
      - Time com experiência em Rust, em ownership e em programação assíncrona.
    contra:
      - Time que ainda não escreveu Rust em produção e depende de curva de aprendizado curta.
    preferir:
      - "[[monolito_web_relacional|Monolito web com banco relacional]]"
  escala_volume:
    favorece:
      - Volume alto por máquina, em que menos instâncias atendem o mesmo tráfego.
    contra:
      - Tráfego pequeno e estável, em que o ganho de desempenho por máquina não compensa o esforço da linguagem.
    preferir:
      - "[[api_serverless_edge|API serverless e edge]]"
  orcamento:
    favorece:
      - Orçamento de infraestrutura apertado, pago por desempenho e memória por instância.
    contra:
      - Orçamento de folha que não absorve a curva de aprendizado da linguagem nem a contratação escassa.
    preferir:
      - "[[monolito_web_relacional|Monolito web com banco relacional]]"
  latencia:
    favorece:
      - Latência p95 exigente e estável, sem pausas de coletor de lixo na rota crítica.
    contra:
      - Requisito tolerante a dezenas de milissegundos, em que qualquer stack de API entrega.
    preferir:
      - "[[api_transacional_eventos|API transacional com eventos]]"
  compliance_dados:
    favorece:
      - Binário único sem runtime externo reduz a superfície de dependências no destino.
    contra:
      - Trilha de auditoria que depende de ferramentas corporativas prontas, e não de código próprio.
    preferir: []
    semAlternativa: "Este eixo não aponta para outro arquétipo: a stack cobre o cenário sozinha."
  prazo_entrega:
    favorece:
      - Prazo que comporta curva de aprendizado, modelagem de tipos e revisão cuidadosa.
    contra:
      - CRUD com prazo curto, em que a produtividade inicial manda mais que o desempenho.
    preferir:
      - "[[monolito_web_relacional|Monolito web com banco relacional]]"
  lock_in:
    favorece:
      - Todas as camadas são open-source, sem fornecedor que prenda o contrato de licença.
    contra:
      - Código idiomático Rust dificulta a reescrita em outra linguagem se a composição da equipe mudar.
    preferir: []
    semAlternativa: "Este eixo não aponta para outro arquétipo: a stack cobre o cenário sozinha."
outrosArquetipos:
  - stack: "[[api_transacional_eventos|API transacional com eventos]]"
    quando: A consistência entre serviços e a coordenação de eventos de domínio viram o centro do problema.
  - stack: "[[monolito_web_relacional|Monolito web com banco relacional]]"
    quando: O produto é um CRUD comum e o prazo manda mais que o desempenho por máquina.
  - stack: "[[api_serverless_edge|API serverless e edge]]"
    quando: O tráfego é irregular e o custo por uso manda mais que a latência por instância.
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
  - id: obs.latencia_p95_medida
    dominio: observabilidade
    titulo: Medir a latência p95 por rota
    verificacao: O painel mostra o percentil 95 de latência por rota com meta combinada, medido na mesma carga que o serviço atende em produção.
    nivel: recomendado
    slots:
      - framework
      - runtime
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
  - "[[api_gateway|API Gateway]]"
  - "[[rate_limiting|Rate Limiting]]"
  - "[[timeout|Timeout]]"
  - "[[retry_backoff_exponencial|Retry com Backoff Exponencial]]"
  - "[[circuit_breaker|Circuit Breaker]]"
casosDeUso:
  - "[[integracao_de_apis_e_webhooks|Integração de APIs e webhooks]]"
  - "[[arquitetura_e_system_design|Arquitetura e system design]]"
variacoes: []
ferramentas:
  - "[[axum|axum]]"
  - "[[actix_web|Actix Web]]"
  - "[[tokio|Tokio]]"
  - "[[sqlx|sqlx]]"
  - "[[diesel|Diesel]]"
  - "[[serde|serde]]"
  - "[[tracing_rust|tracing]]"
  - "[[cargo|cargo]]"
  - "[[reqwest|reqwest]]"
  - "[[redis|Redis]]"
  - "[[postgresql|PostgreSQL]]"
  - "[[nginx|NGINX]]"
  - "[[traefik|Traefik]]"
  - "[[github_actions|GitHub Actions]]"
  - "[[kubernetes|Kubernetes]]"
dataVerificacao: 2026-11-27
tags:
  - stack
---
# Serviço Rust de alto desempenho
<!-- stack:gen -->
## 📋 Resumo
`= this.descricao`
Exemplo: `= this.exemplo`
Domínio: `= this.dominio` / `= this.subdominio`
## 🔗 Relacionamentos
- **Hub:** [[hub_stacks|Mapa de Stacks de Engenharia]], [[hub_tools|Mapa de Ferramentas de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
