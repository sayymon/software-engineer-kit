---
id: site_conteudo_estatico
tipo: stack
nome: Site de conteúdo estático
descricao: Site cujas páginas são geradas em tempo de build e servidas por uma rede de distribuição, com conteúdo vindo de arquivos ou de um CMS e funcionalidades dinâmicas chamadas por APIs.
fonte_ids:
  - jamstack_org
exemplo: Um blog e uma documentação pública gerados a cada alteração do CMS e publicados em uma CDN.
quando_usar:
  - O conteúdo muda poucas vezes por dia e pode ser regenerado a cada alteração.
  - Velocidade, custo baixo e segurança por ausência de servidor de aplicação são prioridades.
quando_evitar:
  - Páginas totalmente personalizadas por usuário e em tempo real pedem uma aplicação com servidor.
status: rascunho
publico: false
fontes:
  - id: jamstack_org
    tipo: artigo
    titulo: What is Jamstack? (jamstack.org)
    link: https://jamstack.org/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
categorias:
  - "[[frameworks_frontend_web|Frameworks de frontend web]]"
  - "[[cms|CMS]]"
  - "[[objetos_cdn|Armazenamento de objetos e CDN]]"
  - "[[dns_dominios|DNS e domínios]]"
  - "[[paas_aplicacoes|PaaS de aplicações]]"
  - "[[analytics_produto_web|Analytics de produto e web]]"
  - "[[ci_cd_deploy|CI-CD e deploy]]"
aliases:
  - Site estático
  - Site com geração em build
dominio: software
subdominio: Aplicações e APIs
linguagens:
  - javascript
  - typescript
slots:
  - id: gerador
    papel: Gerador de site
    categoria: "[[frameworks_frontend_web|Frameworks de frontend web]]"
    obrigatorio: true
    maisBarata:
      - tabela:astro
      - "[[svelte|Svelte]]"
    custoBeneficio:
      - "[[nextjs|Next.js]]"
    qualidadeMaxima:
      - tabela:sveltekit
    lacuna: ""
  - id: cms
    papel: Gestão de conteúdo
    categoria: "[[cms|CMS]]"
    obrigatorio: true
    maisBarata:
      - tabela:ghost
      - tabela:strapi
    custoBeneficio:
      - tabela:sanity
    qualidadeMaxima:
      - "[[contentful|Contentful]]"
    lacuna: ""
  - id: cdn
    papel: Armazenamento e distribuição
    categoria: "[[objetos_cdn|Armazenamento de objetos e CDN]]"
    obrigatorio: true
    maisBarata:
      - "[[cloudflare_r2|Cloudflare R2]]"
    custoBeneficio:
      - "[[amazon_s3|Amazon S3 (ferramenta)]]"
      - tabela:bunny-net
    qualidadeMaxima:
      - "[[amazon_cloudfront|Amazon CloudFront]]"
    lacuna: ""
  - id: dns
    papel: DNS e domínio
    categoria: "[[dns_dominios|DNS e domínios]]"
    obrigatorio: true
    maisBarata:
      - "[[cloudflare_dns|Cloudflare DNS]]"
    custoBeneficio:
      - "[[porkbun|Porkbun]]"
    qualidadeMaxima:
      - "[[amazon_route_53|Amazon Route 53]]"
    lacuna: ""
  - id: hospedagem
    papel: Hospedagem com deploy automático
    categoria: "[[paas_aplicacoes|PaaS de aplicações]]"
    obrigatorio: false
    maisBarata:
      - "[[coolify|Coolify]]"
    custoBeneficio:
      - "[[render|Render]]"
    qualidadeMaxima:
      - "[[vercel|Vercel]]"
    lacuna: ""
  - id: analytics
    papel: Métricas de audiência
    categoria: "[[analytics_produto_web|Analytics de produto e web]]"
    obrigatorio: true
    maisBarata:
      - "[[umami|Umami]]"
      - tabela:plausible
    custoBeneficio:
      - "[[posthog|PostHog]]"
    qualidadeMaxima:
      - "[[amplitude|Amplitude]]"
    lacuna: ""
  - id: cicd
    papel: Build e publicação
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
  - nome: JAMstack
    descricao: Abordagem que separa a camada de experiência web dos dados e da lógica de negócio, consumindo serviços por APIs.
    linguagens:
      - javascript
    ferramentas:
      - tabela:astro
    fonte_ids:
      - jamstack_org
condicoes:
  time_maturidade:
    favorece:
      - Time pequeno ou de conteúdo, sem operação de servidores.
    contra:
      - Fluxos de edição que exigem lógica de aplicação própria.
    preferir:
      - "[[web_fullstack_js_ts|Aplicação web full-stack em JavaScript e TypeScript]]"
  escala_volume:
    favorece:
      - Pico de acessos absorvido pela CDN sem custo de computação.
    contra:
      - Milhões de páginas com regeneração completa lenta.
    preferir:
      - "[[web_fullstack_js_ts|Aplicação web full-stack em JavaScript e TypeScript]]"
  orcamento:
    favorece:
      - Hospedagem estática gratuita ou de centavos por mês.
    contra:
      - Plano pago do CMS cresce com o número de editores.
    preferir: []
    semAlternativa: "Este eixo não aponta para outro arquétipo: a stack cobre o cenário sozinha."
  latencia:
    favorece:
      - Páginas servidas da borda com latência mínima.
    contra:
      - Dados que mudam a cada segundo.
    preferir:
      - "[[api_serverless_edge|API serverless e edge]]"
  compliance_dados:
    favorece:
      - Superfície de ataque pequena e sem banco exposto.
    contra:
      - Dados pessoais coletados por formulários, que exigem um serviço com controles próprios.
    preferir:
      - "[[monolito_web_relacional|Monolito web com banco relacional]]"
  prazo_entrega:
    favorece:
      - Publicação em horas com um gerador pronto e um tema.
    contra:
      - Funcionalidades interativas complexas, que levam ao full-stack.
    preferir:
      - "[[web_fullstack_js_ts|Aplicação web full-stack em JavaScript e TypeScript]]"
  lock_in:
    favorece:
      - Arquivos e HTML são portáveis entre provedores.
    contra:
      - CMS proprietário com modelo de conteúdo fechado.
    preferir: []
    semAlternativa: "Este eixo não aponta para outro arquétipo: a stack cobre o cenário sozinha."
outrosArquetipos:
  - stack: "[[web_fullstack_js_ts|Aplicação web full-stack em JavaScript e TypeScript]]"
    quando: As páginas dependem de dados por usuário ou de muita interatividade.
  - stack: "[[api_serverless_edge|API serverless e edge]]"
    quando: Poucas rotas dinâmicas justificam funções na borda ao lado do site.
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
  - id: seg.cabecalhos_de_seguranca
    dominio: segurança
    titulo: Configurar cabeçalhos de segurança
    verificacao: As respostas do site trazem política de conteúdo e demais cabeçalhos de proteção, verificados por teste automatizado.
    nivel: essencial
    slots:
      - cdn
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
  - id: teste.links_quebrados
    dominio: testes e qualidade
    titulo: Verificar links quebrados no build
    verificacao: O pipeline falha quando encontra links internos quebrados.
    nivel: recomendado
    slots:
      - cicd
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
  - id: rel.invalidacao_de_cache
    dominio: release e rollback
    titulo: Invalidar o cache da CDN a cada publicação
    verificacao: Uma publicação nova aparece para os visitantes em poucos minutos, sem limpeza manual.
    nivel: essencial
    slots:
      - cdn
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
  - "[[strangler_fig|Strangler Fig]]"
casosDeUso:
  - "[[blog_e_newsletter|Blog e newsletter]]"
  - "[[documentacao_de_software|Documentação de software]]"
variacoes:
  - publicacao-cms
  - doc-site-publico
ferramentas:
  - tabela:astro
  - "[[svelte|Svelte]]"
  - "[[nextjs|Next.js]]"
  - tabela:sveltekit
  - tabela:ghost
  - tabela:strapi
  - tabela:sanity
  - "[[contentful|Contentful]]"
  - "[[cloudflare_r2|Cloudflare R2]]"
  - "[[amazon_s3|Amazon S3 (ferramenta)]]"
  - tabela:bunny-net
  - "[[amazon_cloudfront|Amazon CloudFront]]"
  - "[[cloudflare_dns|Cloudflare DNS]]"
  - "[[porkbun|Porkbun]]"
  - "[[amazon_route_53|Amazon Route 53]]"
  - "[[coolify|Coolify]]"
  - "[[render|Render]]"
  - "[[vercel|Vercel]]"
  - "[[umami|Umami]]"
  - tabela:plausible
  - "[[posthog|PostHog]]"
  - "[[amplitude|Amplitude]]"
  - "[[woodpecker_ci|Woodpecker CI]]"
  - "[[github_actions|GitHub Actions]]"
  - "[[harness|Harness]]"
dataVerificacao: 2026-11-23
tags:
  - stack
---
# Site de conteúdo estático
<!-- stack:gen -->
## 📋 Resumo
`= this.descricao`
Exemplo: `= this.exemplo`
Domínio: `= this.dominio` / `= this.subdominio`
## 🔗 Relacionamentos
- **Hub:** [[hub_stacks|Mapa de Stacks de Engenharia]], [[hub_tools|Mapa de Ferramentas de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
