---
id: configurar_ci_cd
tipo: guia-pratico
nome: Como configurar CI e CD
sigla: cic
descricao: "Caminho para montar um pipeline de integração e entrega contínuas: definir metas, declarar o pipeline como código, automatizar build, testes e análise, versionar artefatos, promover por ambientes e acompanhar métricas de entrega."
exemplo: "Um time integra mudanças pequenas na branch principal várias vezes ao dia: cada mudança roda build, testes e análise, gera um artefato versionado e é promovida a homologação automaticamente, com aprovação antes de produção."
quando_usar:
  - As integrações são raras, manuais e geram conflitos ou publicações com riscos.
  - O time quer entregar com frequência e confiança, com checagens automáticas em cada mudança.
quando_evitar:
  - Quando a base de código é um experimento de poucos dias e a publicação manual é suficiente.
fonte_ids:
  - dora_ci
  - dora_cd
fontes:
  - id: dora_ci
    tipo: artigo
    titulo: Continuous integration (DORA Capabilities)
    link: https://dora.dev/capabilities/continuous-integration/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: dora_cd
    tipo: artigo
    titulo: Continuous delivery (DORA Capabilities)
    link: https://dora.dev/capabilities/continuous-delivery/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
status: rascunho
publico: false
raias:
  - id: cic_orq
    nome: Orquestração do pipeline
    responsabilidade: Encadear contexto, abordagem e implantação até o pipeline em uso.
    cor: "#607D8B"
    orquestradora: true
  - id: cic_ctx
    nome: Contexto e requisitos
    responsabilidade: Entender a necessidade e fixar escopo e critérios antes de escolher tecnologia.
    cor: "#0072B2"
    orquestradora: false
  - id: cic_abd
    nome: Abordagem de entrega
    responsabilidade: Decidir entre assinar, comprar ou construir a partir das premissas.
    cor: "#E69F00"
    orquestradora: false
  - id: cic_ent
    nome: Implementação e entrega
    responsabilidade: Implementar, validar, publicar e operar na abordagem escolhida.
    cor: "#009E73"
    orquestradora: false
nos:
  - id: cic_orq_s0
    raia: cic_orq
    tipo: inicio
    rotulo: Necessidade de automatizar integração e entrega
    proximo:
      - para: cic_orq_c1
        condicao: ""
  - id: cic_orq_c1
    raia: cic_orq
    tipo: chamada
    rotulo: Definir o fluxo de entrega e as metas
    proximo:
      - para: cic_orq_c2
        condicao: fluxo_definido
    raia_chamada: cic_ctx
  - id: cic_orq_c2
    raia: cic_orq
    tipo: chamada
    rotulo: Escolher entre CI hospedado e runner próprio
    proximo:
      - para: cic_orq_c3
        condicao: construir
      - para: cic_orq_c4
        condicao: assinar
    raia_chamada: cic_abd
  - id: cic_orq_c3
    raia: cic_orq
    tipo: chamada
    rotulo: Implementar, proteger e acompanhar o pipeline
    proximo:
      - para: cic_orq_e1
        condicao: pronta
    raia_chamada: cic_ent
  - id: cic_orq_c4
    raia: cic_orq
    tipo: chamada
    rotulo: Implementar, proteger e acompanhar o pipeline
    proximo:
      - para: cic_orq_e2
        condicao: pronta
    raia_chamada: cic_ent
  - id: cic_orq_e1
    raia: cic_orq
    tipo: fim
    rotulo: Pipeline com runner próprio e componentes abertos
    proximo: []
    retorno: construir
    saida:
      tipo: construir
      justificativa: Um runner próprio mantém código e segredos na rede da empresa e o pipeline portável entre provedores, ao custo de operar e atualizar a plataforma.
      eixos:
        - compliance_dados
        - lock_in
        - orcamento
      objetivo: reduzir_custo
      notas:
        construir:
          diferenciacao: 4
          tempo_ate_valor: 4
          custo_total: 5
          dependencia_fornecedor: 5
          risco: 4
        comprar:
          diferenciacao: 2
          tempo_ate_valor: 3
          custo_total: 3
          dependencia_fornecedor: 3
          risco: 3
        assinar:
          diferenciacao: 3
          tempo_ate_valor: 4
          custo_total: 3
          dependencia_fornecedor: 2
          risco: 3
      categoria: "[[ci_cd_deploy|CI-CD e deploy]]"
      ferramentas:
        - "[[woodpecker_ci|Woodpecker CI]]"
        - tabela:jenkins
        - tabela:drone
  - id: cic_orq_e2
    raia: cic_orq
    tipo: fim
    rotulo: Pipeline em CI hospedado
    proximo: []
    retorno: assinar
    saida:
      tipo: assinar
      justificativa: O CI hospedado entrega runners, integração com o repositório e marketplace de etapas em horas, o que coloca a automação em uso sem operar a plataforma.
      eixos:
        - prazo_entrega
        - time_maturidade
        - lock_in
      objetivo: cumprir_prazo
      notas:
        construir:
          diferenciacao: 4
          tempo_ate_valor: 2
          custo_total: 2
          dependencia_fornecedor: 5
          risco: 3
        comprar:
          diferenciacao: 2
          tempo_ate_valor: 3
          custo_total: 3
          dependencia_fornecedor: 3
          risco: 3
        assinar:
          diferenciacao: 3
          tempo_ate_valor: 5
          custo_total: 3
          dependencia_fornecedor: 2
          risco: 3
      categoria: "[[ci_cd_deploy|CI-CD e deploy]]"
      ferramentas:
        - "[[github_actions|GitHub Actions]]"
        - tabela:circleci
        - tabela:argo-cd
  - id: cic_ctx_s0
    raia: cic_ctx
    tipo: inicio
    rotulo: Início do levantamento
    proximo:
      - para: cic_ctx_t1
        condicao: ""
  - id: cic_ctx_t1
    raia: cic_ctx
    tipo: tarefa
    rotulo: Definir o fluxo de entrega e as metas
    proximo:
      - para: cic_ctx_e1
        condicao: ""
    passos:
      - ctx.fluxo_atual_e_metas_de_entrega
  - id: cic_ctx_e1
    raia: cic_ctx
    tipo: fim
    rotulo: Fluxo e metas definidos
    proximo: []
    retorno: fluxo_definido
  - id: cic_abd_s0
    raia: cic_abd
    tipo: inicio
    rotulo: Início da escolha
    proximo:
      - para: cic_abd_t1
        condicao: ""
  - id: cic_abd_t1
    raia: cic_abd
    tipo: tarefa
    rotulo: Registrar premissas e pontuar as opções
    proximo:
      - para: cic_abd_g1
        condicao: ""
    passos:
      - ctx.premissas_nao_funcionais
      - prep.pontuar_opcoes_matriz
  - id: cic_abd_g1
    raia: cic_abd
    tipo: bifurcacao
    rotulo: Pipeline na rede própria?
    proximo:
      - para: cic_abd_e1
        condicao: sim
      - para: cic_abd_g2
        condicao: não
    eixo: compliance_dados
    pergunta: q.codigo_e_segredos_na_rede_propria
  - id: cic_abd_g2
    raia: cic_abd
    tipo: bifurcacao
    rotulo: Portabilidade total?
    proximo:
      - para: cic_abd_e1
        condicao: sim
      - para: cic_abd_g3
        condicao: não
    eixo: lock_in
    pergunta: q.portabilidade_total_entre_provedores
  - id: cic_abd_g3
    raia: cic_abd
    tipo: bifurcacao
    rotulo: CI hospedado disponível?
    proximo:
      - para: cic_abd_e2
        condicao: sim
      - para: cic_abd_e2
        condicao: não
    eixo: prazo_entrega
    pergunta: q.repositorio_em_plataforma_com_ci
  - id: cic_abd_e1
    raia: cic_abd
    tipo: fim
    rotulo: Construir com runner próprio
    proximo: []
    retorno: construir
  - id: cic_abd_e2
    raia: cic_abd
    tipo: fim
    rotulo: Assinar CI hospedado
    proximo: []
    retorno: assinar
  - id: cic_ent_s0
    raia: cic_ent
    tipo: inicio
    rotulo: Início da entrega
    proximo:
      - para: cic_ent_t1
        condicao: ""
  - id: cic_ent_t1
    raia: cic_ent
    tipo: tarefa
    rotulo: Declarar o pipeline
    proximo:
      - para: cic_ent_t2
        condicao: ""
    passos:
      - prep.pipeline_como_codigo
      - exec.build_testes_e_analise
      - exec.artefato_versionado_e_cache
  - id: cic_ent_t2
    raia: cic_ent
    tipo: tarefa
    rotulo: Promover por ambientes
    proximo:
      - para: cic_ent_t3
        condicao: ""
    passos:
      - exec.entrega_por_ambiente
  - id: cic_ent_t3
    raia: cic_ent
    tipo: tarefa
    rotulo: Validar, proteger e acompanhar
    proximo:
      - para: cic_ent_e1
        condicao: ""
    passos:
      - val.pipeline_rapido_e_confiavel
      - ent.protecao_de_branch_e_aprovacoes
      - ops.acompanhar_metricas_de_entrega
  - id: cic_ent_e1
    raia: cic_ent
    tipo: fim
    rotulo: Pipeline em uso com métricas de entrega
    proximo: []
    retorno: pronta
perguntasDecisao:
  - id: q.codigo_e_segredos_na_rede_propria
    pergunta: O código e os segredos do pipeline precisam rodar na rede própria por exigência de conformidade?
    eixo: compliance_dados
  - id: q.portabilidade_total_entre_provedores
    pergunta: O time quer manter o pipeline portável entre provedores, sem dependência de uma plataforma?
    eixo: lock_in
  - id: q.repositorio_em_plataforma_com_ci
    pergunta: O repositório já está em uma plataforma que oferece integração contínua hospedada e o time quer ir ao ar logo?
    eixo: prazo_entrega
objetivo: Ter um pipeline rápido e confiável que valida cada mudança e promove artefatos versionados por ambientes, com a abordagem (assinar ou construir) que atende ao controle do código, à portabilidade e ao prazo.
preRequisitos:
  - Repositório com testes automatizados executáveis por linha de comando.
  - Definição dos ambientes e de quem aprova a ida a produção.
  - Um local seguro para guardar segredos do pipeline.
  - Premissas de sigilo do código, portabilidade e orçamento.
passos:
  - id: ctx.fluxo_atual_e_metas_de_entrega
    titulo: Descrever o fluxo atual e as metas de entrega
    descricao: Mapear o caminho da mudança até produção, medir frequência e tempo de entrega e fixar as metas de melhoria.
    verificacao: O fluxo atual está desenhado e as metas de frequência e tempo de entrega têm valores acordados.
    depende: []
  - id: ctx.premissas_nao_funcionais
    titulo: Registrar premissas não funcionais
    descricao: Anotar volume esperado, latência aceitável, dados sensíveis, prazo e orçamento, que alimentam as perguntas de decisão.
    verificacao: Cada um dos 7 eixos de adoção tem uma resposta escrita ou a nota de que não se aplica.
    depende:
      - ctx.fluxo_atual_e_metas_de_entrega
  - id: prep.pontuar_opcoes_matriz
    titulo: Pontuar construir, comprar e assinar
    descricao: Dar nota de 1 a 5 às três opções nos cinco critérios da matriz e registrar o objetivo que pesa mais.
    verificacao: A matriz tem as 15 notas preenchidas e a opção vencedora tem a justificativa registrada.
    depende:
      - ctx.premissas_nao_funcionais
  - id: prep.pipeline_como_codigo
    titulo: Declarar o pipeline como código no repositório
    descricao: Escrever as etapas em arquivos versionados junto ao código, revisáveis como qualquer outra mudança.
    verificacao: O pipeline é definido em arquivos do repositório e uma mudança nele passa por revisão.
    depende:
      - prep.pontuar_opcoes_matriz
  - id: exec.build_testes_e_analise
    titulo: Automatizar build, testes e análise
    descricao: Executar compilação, testes, análise estática e varredura de dependências em cada mudança, com falha rápida.
    verificacao: Cada mudança executa build, testes e análise, e o resultado bloqueia a integração quando negativo.
    depende:
      - prep.pipeline_como_codigo
  - id: exec.artefato_versionado_e_cache
    titulo: Gerar um artefato versionado e usar cache
    descricao: Produzir um artefato único e imutável por versão, guardá-lo em um repositório de artefatos e reaproveitar dependências por cache.
    verificacao: O mesmo artefato é usado em todos os ambientes e o cache reduz o tempo do pipeline.
    depende:
      - exec.build_testes_e_analise
  - id: exec.entrega_por_ambiente
    titulo: Promover o artefato por ambientes
    descricao: Implantar automaticamente em homologação e promover a produção com aprovação ou critérios automáticos definidos.
    verificacao: O artefato percorre os ambientes por promoção e produção exige a aprovação combinada.
    depende:
      - exec.artefato_versionado_e_cache
  - id: val.pipeline_rapido_e_confiavel
    titulo: Medir velocidade e confiabilidade do pipeline
    descricao: Acompanhar o tempo total e a taxa de falhas por instabilidade, e ajustar paralelismo, cache e testes lentos.
    verificacao: O tempo do pipeline está dentro da meta e falhas por instabilidade ficam abaixo do limite acordado.
    depende:
      - exec.entrega_por_ambiente
  - id: ent.protecao_de_branch_e_aprovacoes
    titulo: Proteger a branch principal e os segredos
    descricao: Exigir checagens aprovadas e revisão para integrar, e guardar segredos em um cofre com acesso mínimo para o pipeline.
    verificacao: A branch principal só recebe mudanças com checagens verdes e os segredos estão em cofre, fora do repositório.
    depende:
      - val.pipeline_rapido_e_confiavel
  - id: ops.acompanhar_metricas_de_entrega
    titulo: Acompanhar métricas de entrega
    descricao: Medir frequência de implantação, tempo de entrega, taxa de falha de mudanças e tempo de recuperação, e revisar com o time.
    verificacao: As quatro métricas de entrega estão em painel e são revisadas periodicamente.
    depende:
      - ent.protecao_de_branch_e_aprovacoes
comoFazerHoje: []
checklistRefs: {}
armadilhas:
  - Manter branches longas e integrar raramente, o que acumula conflitos e risco em cada publicação.
  - Construir um artefato diferente para cada ambiente, o que invalida o que foi testado antes de produção.
  - Guardar segredos em variáveis visíveis no repositório, o que expõe credenciais a quem tem acesso ao código.
  - Deixar o pipeline lento e instável, o que leva o time a contornar as checagens.
validacao:
  - Cada mudança executa build, testes e análise e bloqueia a integração quando falha.
  - O pipeline está declarado em arquivos versionados e revisados.
  - Um artefato único e versionado percorre os ambientes até produção.
  - Os segredos estão em cofre e a branch principal está protegida.
  - As métricas de entrega estão visíveis em painel.
padroes:
  - "[[chain_of_responsibility|Chain of Responsibility (GoF)]]"
  - "[[template_method|Template Method (GoF)]]"
  - "[[human_in_the_loop|Human-in-the-Loop]]"
categorias:
  - "[[ci_cd_deploy|CI-CD e deploy]]"
  - "[[containers_orquestracao|Containers e orquestração]]"
  - "[[seguranca_codigo|Segurança de código]]"
  - "[[infraestrutura_como_codigo|Infraestrutura como código]]"
aliases:
  - Como configurar CI/CD
  - Configurar integração e entrega contínuas
  - Montar um pipeline de CI/CD
grupo: Qualidade entrega e operação
stacks:
  - "[[api_transacional_eventos|API transacional com eventos]]"
  - "[[site_conteudo_estatico|Site de conteúdo estático]]"
ferramentas:
  - "[[woodpecker_ci|Woodpecker CI]]"
  - tabela:jenkins
  - tabela:drone
  - "[[github_actions|GitHub Actions]]"
  - tabela:circleci
  - tabela:argo-cd
casosDeUso:
  - "[[pipelines_de_ci_e_cd|Pipelines de CI e CD]]"
variacoes:
  - cicd-pipeline-build
  - cicd-deploy-gitops
  - cicd-ambientes-efemeros
certificacoes:
  - "[[github_foundations_gh_900|GitHub Foundations (GH-900)]]"
dataVerificacao: 2026-11-23
tags:
  - guia-pratico
---
# Como configurar CI e CD
## 🎯 Objetivo
`= this.objetivo`

Resumo: `= this.descricao`

Exemplo: `= this.exemplo`

Grupo: `= this.grupo`
## 🔀 Diagrama de decisão
## 🎯 Casos de uso e variações

Variações: `= this.variacoes`
## 🔗 Relacionamentos
- **Hub:** [[hub_guides|Mapa de Guias Práticos]], [[hub_stacks|Mapa de Stacks de Engenharia]], [[hub_tools|Mapa de Ferramentas de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
