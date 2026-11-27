---
id: fazer_deploy
tipo: guia-pratico
nome: Como fazer deploy de uma aplicação
sigla: dep
descricao: "Caminho para publicar uma aplicação com segurança: definir disponibilidade e reversão, separar configuração por ambiente, empacotar um artefato imutável, liberar de forma gradual, manter migrações compatíveis e verificar a saúde depois da publicação."
exemplo: Uma API recebe uma versão nova para 5 por cento do tráfego, o time compara erros e latência com a versão anterior, amplia a liberação por etapas e mantém a reversão a um passo de distância.
quando_usar:
  - Uma aplicação ou uma versão nova precisa chegar a produção com risco controlado.
  - As publicações atuais são manuais, demoradas ou geram incidentes.
quando_evitar:
  - Quando o objetivo é montar o pipeline de integração e entrega contínuas (veja o guia de CI/CD).
fonte_ids:
  - twelve_factor
  - sre_release_engineering
  - dora_cd
fontes:
  - id: twelve_factor
    tipo: artigo
    titulo: The Twelve-Factor App
    link: https://12factor.net/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: sre_release_engineering
    tipo: artigo
    titulo: Release Engineering (Google SRE Book)
    link: https://sre.google/sre-book/release-engineering/
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
  - id: dep_orq
    nome: Orquestração da publicação
    responsabilidade: Encadear contexto, plataforma e execução até a versão estável em produção.
    cor: "#607D8B"
    orquestradora: true
  - id: dep_ctx
    nome: Contexto e requisitos
    responsabilidade: Entender a necessidade e fixar escopo e critérios antes de escolher tecnologia.
    cor: "#0072B2"
    orquestradora: false
  - id: dep_abd
    nome: Abordagem de entrega
    responsabilidade: Decidir entre assinar, comprar ou construir a partir das premissas.
    cor: "#E69F00"
    orquestradora: false
  - id: dep_ent
    nome: Implementação e entrega
    responsabilidade: Implementar, validar, publicar e operar na abordagem escolhida.
    cor: "#009E73"
    orquestradora: false
nos:
  - id: dep_orq_s0
    raia: dep_orq
    tipo: inicio
    rotulo: Versão pronta para produção
    proximo:
      - para: dep_orq_c1
        condicao: ""
  - id: dep_orq_c1
    raia: dep_orq
    tipo: chamada
    rotulo: Definir requisitos de disponibilidade e reversão
    proximo:
      - para: dep_orq_c2
        condicao: requisitos_definidos
    raia_chamada: dep_ctx
  - id: dep_orq_c2
    raia: dep_orq
    tipo: chamada
    rotulo: Escolher entre plataforma gerenciada e contêineres próprios
    proximo:
      - para: dep_orq_c3
        condicao: construir
      - para: dep_orq_c4
        condicao: assinar
    raia_chamada: dep_abd
  - id: dep_orq_c3
    raia: dep_orq
    tipo: chamada
    rotulo: Empacotar, liberar gradualmente e verificar
    proximo:
      - para: dep_orq_e1
        condicao: pronta
    raia_chamada: dep_ent
  - id: dep_orq_c4
    raia: dep_orq
    tipo: chamada
    rotulo: Empacotar, liberar gradualmente e verificar
    proximo:
      - para: dep_orq_e2
        condicao: pronta
    raia_chamada: dep_ent
  - id: dep_orq_e1
    raia: dep_orq
    tipo: fim
    rotulo: Publicação com contêineres e orquestração próprios
    proximo: []
    retorno: construir
    saida:
      tipo: construir
      justificativa: Contêineres e orquestração próprios dão controle de rede, escala e custo por unidade, o que compensa quando o time sabe operar a plataforma.
      eixos:
        - escala_volume
        - time_maturidade
        - lock_in
      objetivo: diferenciar_produto
      notas:
        construir:
          diferenciacao: 5
          tempo_ate_valor: 2
          custo_total: 3
          dependencia_fornecedor: 4
          risco: 3
        comprar:
          diferenciacao: 2
          tempo_ate_valor: 3
          custo_total: 2
          dependencia_fornecedor: 3
          risco: 3
        assinar:
          diferenciacao: 3
          tempo_ate_valor: 4
          custo_total: 3
          dependencia_fornecedor: 2
          risco: 3
      categoria: "[[containers_orquestracao|Containers e orquestração]]"
      ferramentas:
        - "[[podman|Podman]]"
        - tabela:k3s
        - "[[helm|Helm]]"
  - id: dep_orq_e2
    raia: dep_orq
    tipo: fim
    rotulo: Publicação em plataforma de aplicações
    proximo: []
    retorno: assinar
    saida:
      tipo: assinar
      justificativa: Uma plataforma de aplicações cuida de build, certificados, escala e reversão e coloca a versão no ar em dias, o que serve a aplicações web padrão e times pequenos.
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
      categoria: "[[paas_aplicacoes|PaaS de aplicações]]"
      ferramentas:
        - "[[render|Render]]"
        - tabela:railway
        - tabela:flyio
  - id: dep_ctx_s0
    raia: dep_ctx
    tipo: inicio
    rotulo: Início do levantamento
    proximo:
      - para: dep_ctx_t1
        condicao: ""
  - id: dep_ctx_t1
    raia: dep_ctx
    tipo: tarefa
    rotulo: Definir requisitos de disponibilidade e reversão
    proximo:
      - para: dep_ctx_e1
        condicao: ""
    passos:
      - ctx.disponibilidade_e_reversao
  - id: dep_ctx_e1
    raia: dep_ctx
    tipo: fim
    rotulo: Requisitos de disponibilidade acordados
    proximo: []
    retorno: requisitos_definidos
  - id: dep_abd_s0
    raia: dep_abd
    tipo: inicio
    rotulo: Início da escolha
    proximo:
      - para: dep_abd_t1
        condicao: ""
  - id: dep_abd_t1
    raia: dep_abd
    tipo: tarefa
    rotulo: Registrar premissas e pontuar as opções
    proximo:
      - para: dep_abd_g1
        condicao: ""
    passos:
      - ctx.premissas_nao_funcionais
      - prep.pontuar_opcoes_matriz
  - id: dep_abd_g1
    raia: dep_abd
    tipo: bifurcacao
    rotulo: Requisitos acima da plataforma?
    proximo:
      - para: dep_abd_e1
        condicao: sim
      - para: dep_abd_g2
        condicao: não
    eixo: escala_volume
    pergunta: q.controle_de_rede_e_escala_acima_da_plataforma
  - id: dep_abd_g2
    raia: dep_abd
    tipo: bifurcacao
    rotulo: Time opera contêineres?
    proximo:
      - para: dep_abd_e1
        condicao: sim
      - para: dep_abd_g3
        condicao: não
    eixo: time_maturidade
    pergunta: q.time_ja_opera_conteineres
  - id: dep_abd_g3
    raia: dep_abd
    tipo: bifurcacao
    rotulo: Aplicação padrão e prazo curto?
    proximo:
      - para: dep_abd_e2
        condicao: sim
      - para: dep_abd_e2
        condicao: não
    eixo: prazo_entrega
    pergunta: q.aplicacao_web_padrao_e_prazo_curto
  - id: dep_abd_e1
    raia: dep_abd
    tipo: fim
    rotulo: Construir com contêineres e orquestração
    proximo: []
    retorno: construir
  - id: dep_abd_e2
    raia: dep_abd
    tipo: fim
    rotulo: Assinar uma plataforma de aplicações
    proximo: []
    retorno: assinar
  - id: dep_ent_s0
    raia: dep_ent
    tipo: inicio
    rotulo: Início da entrega
    proximo:
      - para: dep_ent_t1
        condicao: ""
  - id: dep_ent_t1
    raia: dep_ent
    tipo: tarefa
    rotulo: Preparar ambiente e artefato
    proximo:
      - para: dep_ent_t2
        condicao: ""
    passos:
      - prep.configuracao_por_ambiente
      - exec.artefato_imutavel_e_migracoes_compativeis
  - id: dep_ent_t2
    raia: dep_ent
    tipo: tarefa
    rotulo: Liberar gradualmente
    proximo:
      - para: dep_ent_t3
        condicao: ""
    passos:
      - exec.liberacao_gradual
  - id: dep_ent_t3
    raia: dep_ent
    tipo: tarefa
    rotulo: Verificar e registrar
    proximo:
      - para: dep_ent_e1
        condicao: ""
    passos:
      - val.verificacoes_de_saude
      - ent.promover_com_reversao_pronta
      - ops.registrar_versao_e_acompanhar
  - id: dep_ent_e1
    raia: dep_ent
    tipo: fim
    rotulo: Versão estável em produção
    proximo: []
    retorno: pronta
perguntasDecisao:
  - id: q.controle_de_rede_e_escala_acima_da_plataforma
    pergunta: Os requisitos de rede, escala ou custo ultrapassam o que uma plataforma gerenciada permite?
    eixo: escala_volume
  - id: q.time_ja_opera_conteineres
    pergunta: O time já opera contêineres e orquestração em produção com segurança?
    eixo: time_maturidade
  - id: q.aplicacao_web_padrao_e_prazo_curto
    pergunta: A aplicação cabe em um modelo web padrão e precisa ir ao ar em poucos dias?
    eixo: prazo_entrega
objetivo: Publicar versões em produção de forma repetível, gradual e reversível, com a abordagem (assinar uma plataforma ou construir com contêineres) que atende ao controle de infraestrutura e ao prazo.
preRequisitos:
  - Requisitos de disponibilidade e tempo aceitável de reversão.
  - Um artefato versionado produzido pelo pipeline.
  - Configuração e segredos separados do código.
  - Premissas de controle de rede, escala e orçamento.
passos:
  - id: ctx.disponibilidade_e_reversao
    titulo: Definir disponibilidade e tempo de reversão
    descricao: Registrar a disponibilidade esperada, o impacto de uma publicação com falha e o tempo máximo aceitável para voltar à versão anterior.
    verificacao: Os alvos de disponibilidade e de tempo de reversão estão escritos e foram aceitos pelo dono do serviço.
    depende: []
  - id: ctx.premissas_nao_funcionais
    titulo: Registrar premissas não funcionais
    descricao: Anotar volume esperado, latência aceitável, dados sensíveis, prazo e orçamento, que alimentam as perguntas de decisão.
    verificacao: Cada um dos 7 eixos de adoção tem uma resposta escrita ou a nota de que não se aplica.
    depende:
      - ctx.disponibilidade_e_reversao
  - id: prep.pontuar_opcoes_matriz
    titulo: Pontuar construir, comprar e assinar
    descricao: Dar nota de 1 a 5 às três opções nos cinco critérios da matriz e registrar o objetivo que pesa mais.
    verificacao: A matriz tem as 15 notas preenchidas e a opção vencedora tem a justificativa registrada.
    depende:
      - ctx.premissas_nao_funcionais
  - id: prep.configuracao_por_ambiente
    titulo: Separar a configuração por ambiente
    descricao: Mover para o ambiente tudo o que varia entre desenvolvimento, homologação e produção, mantendo segredos em cofre.
    verificacao: O mesmo artefato roda nos ambientes mudando apenas a configuração e nenhum segredo está no repositório.
    depende:
      - prep.pontuar_opcoes_matriz
  - id: exec.artefato_imutavel_e_migracoes_compativeis
    titulo: Empacotar um artefato imutável e manter migrações compatíveis
    descricao: Gerar um artefato versionado e planejar mudanças de dados em etapas que a versão anterior e a nova suportam ao mesmo tempo.
    verificacao: O artefato é identificado por versão e as migrações de dados funcionam com as duas versões em execução.
    depende:
      - prep.configuracao_por_ambiente
  - id: exec.liberacao_gradual
    titulo: Liberar de forma gradual
    descricao: Escolher uma estratégia como canário, azul e verde ou chaves de funcionalidade, e ampliar a exposição por etapas com critérios de avanço.
    verificacao: A versão nova atende uma fração do tráfego com critérios de avanço e de interrupção definidos.
    depende:
      - exec.artefato_imutavel_e_migracoes_compativeis
  - id: val.verificacoes_de_saude
    titulo: Verificar a saúde após cada etapa
    descricao: Comparar erros, latência e indicadores de negócio com a versão anterior e executar verificações automáticas após a publicação.
    verificacao: Os indicadores da versão nova estão dentro da margem acordada antes de cada ampliação.
    depende:
      - exec.liberacao_gradual
  - id: ent.promover_com_reversao_pronta
    titulo: Promover para todo o tráfego com a reversão pronta
    descricao: Concluir a liberação mantendo o caminho de volta testado até que a versão anterior possa ser desativada.
    verificacao: A reversão foi exercitada em homologação e a versão anterior só é removida após o período de observação.
    depende:
      - val.verificacoes_de_saude
  - id: ops.registrar_versao_e_acompanhar
    titulo: Registrar a versão e acompanhar
    descricao: Anotar versão, horário, responsável e mudanças em um registro de publicações e acompanhar os indicadores nas horas seguintes.
    verificacao: O registro de publicações está atualizado e os indicadores permanecem estáveis no período de observação.
    depende:
      - ent.promover_com_reversao_pronta
comoFazerHoje: []
checklistRefs: {}
armadilhas:
  - Publicar para todo o tráfego de uma vez, o que amplia o impacto de qualquer defeito.
  - Aplicar migrações de dados que quebram a versão anterior, o que impede a reversão rápida.
  - Manter configurações diferentes embutidas em cada artefato, o que torna imprevisível o que foi testado.
  - Deixar a reversão sem teste, o que a transforma em improviso durante um incidente.
validacao:
  - O mesmo artefato versionado percorre os ambientes mudando só a configuração.
  - A liberação é gradual, com critérios de avanço e de interrupção definidos.
  - A reversão foi exercitada e cumpre o tempo máximo acordado.
  - As migrações de dados funcionam com a versão anterior e a nova ao mesmo tempo.
  - Cada publicação fica registrada e os indicadores são acompanhados após o deploy.
padroes:
  - "[[strangler_fig|Strangler Fig]]"
  - "[[failover|Estratégias de failover]]"
  - "[[sidecar|Sidecar]]"
categorias:
  - "[[paas_aplicacoes|PaaS de aplicações]]"
  - "[[containers_orquestracao|Containers e orquestração]]"
  - "[[ci_cd_deploy|CI-CD e deploy]]"
  - "[[infraestrutura_como_codigo|Infraestrutura como código]]"
  - "[[feature_flags_experimentacao|Feature flags e experimentação]]"
aliases:
  - Como fazer deploy
  - Publicar em produção
  - Implantar uma aplicação
grupo: Qualidade entrega e operação
stacks:
  - "[[api_serverless_edge|API serverless e edge]]"
  - "[[site_conteudo_estatico|Site de conteúdo estático]]"
  - "[[monolito_web_relacional|Monolito web com banco relacional]]"
ferramentas:
  - "[[podman|Podman]]"
  - tabela:k3s
  - "[[helm|Helm]]"
  - "[[render|Render]]"
  - tabela:railway
  - tabela:flyio
casosDeUso:
  - "[[pipelines_de_ci_e_cd|Pipelines de CI e CD]]"
  - "[[provisionamento_de_infraestrutura|Provisionamento de infraestrutura]]"
variacoes:
  - cicd-deploy-gitops
  - cicd-feature-flags
  - iac-containers
certificacoes:
  - "[[certified_kubernetes_application_developer_ckad|Certified Kubernetes Application Developer (CKAD)]]"
  - "[[aws_certified_developer_associate_dva_c02|AWS Certified Developer Associate (DVA-C02)]]"
dataVerificacao: 2026-11-23
tags:
  - guia-pratico
---
# Como fazer deploy de uma aplicação
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
