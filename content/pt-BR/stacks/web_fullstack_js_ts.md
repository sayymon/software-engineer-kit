---
id: web_fullstack_js_ts
tipo: stack
nome: Aplicação web full-stack em JavaScript e TypeScript
descricao: Aplicação web em que cliente e servidor compartilham a mesma linguagem e os mesmos tipos, com framework de interface, camada de API tipada, acesso a dados por ORM e hospedagem em plataforma de aplicações.
fonte_ids:
  - mongodb_mern
  - mongodb_mean
  - create_t3_intro
exemplo: Um painel de assinaturas com interface em React, rotas de API em TypeScript, Prisma sobre PostgreSQL e deploy automático por pull request.
quando_usar:
  - O time domina JavaScript e TypeScript e quer compartilhar tipos e validações entre cliente e servidor.
  - O produto precisa de iteração rápida com pré-visualização por pull request.
quando_evitar:
  - Processamento intensivo de CPU ou ecossistemas de dados em outras linguagens pedem serviços separados.
status: rascunho
publico: false
fontes:
  - id: mongodb_mern
    tipo: artigo
    titulo: MERN Stack Explained (MongoDB)
    link: https://www.mongodb.com/resources/languages/mern-stack
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: mongodb_mean
    tipo: artigo
    titulo: What Is the MEAN Stack? (MongoDB)
    link: https://www.mongodb.com/resources/languages/mean-stack
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: create_t3_intro
    tipo: artigo
    titulo: Introduction (Create T3 App)
    link: https://create.t3.gg/en/introduction
    status_revisao: revisada
    proxima_revisao: 2027-11-23
categorias:
  - "[[frameworks_frontend_web|Frameworks de frontend web]]"
  - "[[frameworks_backend|Frameworks de backend]]"
  - "[[orm_acesso_dados|ORM e acesso a dados]]"
  - "[[validacao_schemas|Validação e schemas]]"
  - "[[banco_relacional|Banco relacional]]"
  - "[[autenticacao_autorizacao_libs|Autenticação e autorização]]"
  - "[[paas_aplicacoes|PaaS de aplicações]]"
  - "[[testes_qa|Testes e QA]]"
aliases:
  - Full-stack JavaScript
  - Aplicação web TypeScript ponta a ponta
dominio: software
subdominio: Aplicações e APIs
linguagens:
  - typescript
  - javascript
slots:
  - id: frontend
    papel: Framework de interface
    categoria: "[[frameworks_frontend_web|Frameworks de frontend web]]"
    obrigatorio: true
    maisBarata:
      - tabela:solidjs
    custoBeneficio:
      - "[[react|React]]"
      - tabela:nextjs
    qualidadeMaxima:
      - "[[angular|Angular]]"
    lacuna: ""
  - id: backend
    papel: Servidor e rotas de API
    categoria: "[[frameworks_backend|Frameworks de backend]]"
    obrigatorio: true
    maisBarata:
      - tabela:hono
      - "[[express|Express]]"
    custoBeneficio:
      - tabela:nestjs
      - "[[fastify|Fastify]]"
    qualidadeMaxima:
      - tabela:trpc
    lacuna: ""
  - id: orm
    papel: Acesso a dados
    categoria: "[[orm_acesso_dados|ORM e acesso a dados]]"
    obrigatorio: true
    maisBarata:
      - "[[drizzle_orm|Drizzle ORM]]"
    custoBeneficio:
      - "[[prisma|Prisma]]"
    qualidadeMaxima:
      - tabela:sequelize
    lacuna: ""
  - id: validacao
    papel: Validação de entradas e esquemas
    categoria: "[[validacao_schemas|Validação e schemas]]"
    obrigatorio: true
    maisBarata:
      - "[[zod|Zod]]"
    custoBeneficio:
      - tabela:class-validator
    qualidadeMaxima:
      - "[[typebox|TypeBox]]"
    lacuna: ""
  - id: banco
    papel: Banco relacional
    categoria: "[[banco_relacional|Banco relacional]]"
    obrigatorio: true
    maisBarata:
      - tabela:sqlite
      - "[[postgresql|PostgreSQL]]"
    custoBeneficio:
      - "[[neon|Neon]]"
    qualidadeMaxima:
      - "[[amazon_aurora|Amazon Aurora (ferramenta)]]"
    lacuna: ""
  - id: auth
    papel: Autenticação
    categoria: "[[autenticacao_autorizacao_libs|Autenticação e autorização]]"
    obrigatorio: true
    maisBarata:
      - "[[auth_js|Auth.js]]"
      - tabela:better-auth
    custoBeneficio:
      - tabela:supertokens
    qualidadeMaxima:
      - tabela:ory-kratos
    lacuna: ""
  - id: hospedagem
    papel: Hospedagem e deploy
    categoria: "[[paas_aplicacoes|PaaS de aplicações]]"
    obrigatorio: true
    maisBarata:
      - "[[coolify|Coolify]]"
    custoBeneficio:
      - "[[render|Render]]"
      - tabela:railway
    qualidadeMaxima:
      - "[[vercel|Vercel]]"
    lacuna: ""
  - id: testes
    papel: Testes ponta a ponta
    categoria: "[[testes_qa|Testes e QA]]"
    obrigatorio: true
    maisBarata:
      - "[[playwright|Playwright]]"
    custoBeneficio:
      - "[[cypress|Cypress (ferramenta)]]"
    qualidadeMaxima:
      - "[[browserstack|BrowserStack]]"
    lacuna: ""
instancias:
  - nome: MERN
    descricao: "MongoDB, Express, React e Node.js: pilha JavaScript de ponta a ponta com banco de documentos."
    linguagens:
      - javascript
    ferramentas:
      - "[[mongodb|MongoDB (ferramenta)]]"
      - "[[express|Express]]"
      - "[[react|React]]"
    fonte_ids:
      - mongodb_mern
  - nome: MEAN
    descricao: "MongoDB, Express, Angular e Node.js: a variante da pilha JavaScript com Angular na interface."
    linguagens:
      - typescript
    ferramentas:
      - "[[mongodb|MongoDB (ferramenta)]]"
      - "[[express|Express]]"
      - "[[angular|Angular]]"
    fonte_ids:
      - mongodb_mean
  - nome: T3 Stack
    descricao: Pilha modular de Next.js, TypeScript e Tailwind CSS, com tRPC, Prisma e NextAuth.js como complementos, voltada à segurança de tipos ponta a ponta.
    linguagens:
      - typescript
    ferramentas:
      - tabela:nextjs
      - tabela:trpc
      - "[[prisma|Prisma]]"
      - "[[tailwind_css|Tailwind CSS]]"
      - "[[auth_js|Auth.js]]"
    fonte_ids:
      - create_t3_intro
condicoes:
  time_maturidade:
    favorece:
      - Time full-stack que troca de camada com frequência.
    contra:
      - Time com especialistas separados de backend em outra linguagem.
    preferir:
      - "[[monolito_web_relacional|Monolito web com banco relacional]]"
  escala_volume:
    favorece:
      - Escala horizontal de processos sem estado atrás de um balanceador.
    contra:
      - Carga de CPU contínua que bloqueia o laço de eventos.
    preferir:
      - "[[api_transacional_eventos|API transacional com eventos]]"
  orcamento:
    favorece:
      - Camadas gratuitas de hospedagem cobrem a validação do produto.
    contra:
      - Faturas de plataformas gerenciadas crescem com o tráfego.
    preferir:
      - "[[site_conteudo_estatico|Site de conteúdo estático]]"
  latencia:
    favorece:
      - Renderização no servidor e cache de borda cobrem a maioria das telas.
    contra:
      - Operações em tempo real que exigem latência previsível de poucos milissegundos.
    preferir:
      - "[[api_serverless_edge|API serverless e edge]]"
  compliance_dados:
    favorece:
      - Validação com esquemas compartilhados reduz entradas inválidas.
    contra:
      - Dados regulados que exigem hospedagem própria e controles além da plataforma.
    preferir:
      - "[[monolito_web_relacional|Monolito web com banco relacional]]"
  prazo_entrega:
    favorece:
      - Pré-visualização por pull request e convenções de framework aceleram entregas.
    contra:
      - Prazo curto para conteúdo quase fixo, que o site estático atende.
    preferir:
      - "[[site_conteudo_estatico|Site de conteúdo estático]]"
  lock_in:
    favorece:
      - TypeScript e SQL mantêm a base portável entre provedores.
    contra:
      - Recursos proprietários de plataforma de hospedagem aumentam a dependência.
    preferir: []
    semAlternativa: "Este eixo não aponta para outro arquétipo: a stack cobre o cenário sozinha."
outrosArquetipos:
  - stack: "[[monolito_web_relacional|Monolito web com banco relacional]]"
    quando: O time prefere um framework integrado em outra linguagem, com convenções fortes.
  - stack: "[[api_serverless_edge|API serverless e edge]]"
    quando: A API é pequena e ganha com execução na borda.
  - stack: "[[mobile_backend_gerenciado|App mobile com backend gerenciado]]"
    quando: O cliente principal é um aplicativo móvel.
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
  - id: seg.validacao_nas_fronteiras
    dominio: segurança
    titulo: Validar toda entrada nas fronteiras do sistema
    verificacao: Cada rota valida corpo, parâmetros e variáveis de ambiente com um esquema, e dados inválidos recebem resposta de erro padronizada.
    nivel: essencial
    slots:
      - validacao
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
  - id: teste.tipos_compartilhados
    dominio: testes e qualidade
    titulo: Compartilhar tipos entre cliente e servidor
    verificacao: Mudar o contrato de uma rota quebra a compilação do cliente que a consome, antes de qualquer teste manual.
    nivel: recomendado
    slots:
      - backend
      - frontend
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
  - id: rel.preview_por_pull_request
    dominio: release e rollback
    titulo: Gerar uma pré-visualização por pull request
    verificacao: Cada pull request publica um ambiente temporário de revisão que é removido ao fechar.
    nivel: recomendado
    slots:
      - hospedagem
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
  - "[[arquitetura_em_camadas|Arquitetura em Camadas]]"
  - "[[cache_aside|Cache-aside]]"
  - "[[rate_limiting|Rate Limiting (padrão)]]"
casosDeUso:
  - "[[prototipacao_de_front_end|Prototipação de front-end]]"
  - "[[startup_saas_inicial_pequena_empresa|Startup SaaS inicial (pequena empresa)]]"
variacoes:
  - proto-framework-web
  - saas-deploy-auth-pagamento
ferramentas:
  - tabela:solidjs
  - "[[react|React]]"
  - tabela:nextjs
  - "[[angular|Angular]]"
  - tabela:hono
  - "[[express|Express]]"
  - tabela:nestjs
  - "[[fastify|Fastify]]"
  - tabela:trpc
  - "[[drizzle_orm|Drizzle ORM]]"
  - "[[prisma|Prisma]]"
  - tabela:sequelize
  - "[[zod|Zod]]"
  - tabela:class-validator
  - "[[typebox|TypeBox]]"
  - tabela:sqlite
  - "[[postgresql|PostgreSQL]]"
  - "[[neon|Neon]]"
  - "[[amazon_aurora|Amazon Aurora (ferramenta)]]"
  - "[[auth_js|Auth.js]]"
  - tabela:better-auth
  - tabela:supertokens
  - tabela:ory-kratos
  - "[[coolify|Coolify]]"
  - "[[render|Render]]"
  - tabela:railway
  - "[[vercel|Vercel]]"
  - "[[playwright|Playwright]]"
  - "[[cypress|Cypress (ferramenta)]]"
  - "[[browserstack|BrowserStack]]"
  - "[[mongodb|MongoDB (ferramenta)]]"
  - "[[tailwind_css|Tailwind CSS]]"
dataVerificacao: 2026-11-23
tags:
  - stack
---
# Aplicação web full-stack em JavaScript e TypeScript
<!-- stack:gen -->
## 📋 Resumo
`= this.descricao`
Exemplo: `= this.exemplo`
Domínio: `= this.dominio` / `= this.subdominio`
## 🔗 Relacionamentos
- **Hub:** [[hub_stacks|Mapa de Stacks de Engenharia]], [[hub_tools|Mapa de Ferramentas de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
