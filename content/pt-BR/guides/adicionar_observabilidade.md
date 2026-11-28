---
id: adicionar_observabilidade
tipo: guia-pratico
nome: Como adicionar observabilidade
sigla: obs
descricao: "Caminho para tornar um serviço observável: definir perguntas e objetivos de nível de serviço, instrumentar com padrão aberto, correlacionar registros, métricas e rastros, alertar sobre sintomas de usuário e revisar ruído e custo."
exemplo: Um serviço de pedidos ganha rastros entre os componentes, métricas de latência e erro por rota e alertas ligados à meta de disponibilidade, o que permite responder por que um pedido demorou sem reproduzir o caso.
quando_usar:
  - O time responde a falhas de produção por tentativa e erro porque faltam evidências.
  - Um serviço novo vai entrar em produção e precisa de metas e sinais desde o primeiro dia.
quando_evitar:
  - Quando o serviço é um protótipo sem usuários e um registro simples atende.
fonte_ids:
  - otel_observability_primer
fontes:
  - id: otel_observability_primer
    tipo: artigo
    titulo: Observability primer (OpenTelemetry)
    link: https://opentelemetry.io/docs/concepts/observability-primer/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
status: rascunho
publico: false
raias:
  - id: obs_orq
    nome: Orquestração da instrumentação
    responsabilidade: Encadear contexto, abordagem e implantação até sinais úteis em operação.
    cor: "#607D8B"
    orquestradora: true
  - id: obs_ctx
    nome: Contexto e requisitos
    responsabilidade: Entender a necessidade e fixar escopo e critérios antes de escolher tecnologia.
    cor: "#0072B2"
    orquestradora: false
  - id: obs_abd
    nome: Abordagem de entrega
    responsabilidade: Decidir entre assinar, comprar ou construir a partir das premissas.
    cor: "#E69F00"
    orquestradora: false
  - id: obs_ent
    nome: Implementação e entrega
    responsabilidade: Implementar, validar, publicar e operar na abordagem escolhida.
    cor: "#009E73"
    orquestradora: false
nos:
  - id: obs_orq_s0
    raia: obs_orq
    tipo: inicio
    rotulo: Serviço sem evidências suficientes de comportamento
    proximo:
      - para: obs_orq_c1
        condicao: ""
  - id: obs_orq_c1
    raia: obs_orq
    tipo: chamada
    rotulo: Definir perguntas e metas de serviço
    proximo:
      - para: obs_orq_c2
        condicao: metas_definidas
    raia_chamada: obs_ctx
  - id: obs_orq_c2
    raia: obs_orq
    tipo: chamada
    rotulo: Escolher entre plataforma gerenciada e pilha aberta
    proximo:
      - para: obs_orq_c3
        condicao: construir
      - para: obs_orq_c4
        condicao: assinar
    raia_chamada: obs_abd
  - id: obs_orq_c3
    raia: obs_orq
    tipo: chamada
    rotulo: Instrumentar, alertar, validar e revisar
    proximo:
      - para: obs_orq_e1
        condicao: pronta
    raia_chamada: obs_ent
  - id: obs_orq_c4
    raia: obs_orq
    tipo: chamada
    rotulo: Instrumentar, alertar, validar e revisar
    proximo:
      - para: obs_orq_e2
        condicao: pronta
    raia_chamada: obs_ent
  - id: obs_orq_e1
    raia: obs_orq
    tipo: fim
    rotulo: Observabilidade com padrão aberto e pilha própria
    proximo: []
    retorno: construir
    saida:
      tipo: construir
      justificativa: Instrumentar com padrão aberto e operar a pilha mantém dados no ambiente próprio, evita preço por volume e permite trocar o destino da telemetria sem mexer no código.
      eixos:
        - compliance_dados
        - escala_volume
        - lock_in
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
      categoria: "[[observabilidade_apm|Observabilidade e APM]]"
      ferramentas:
        - "[[opentelemetry|OpenTelemetry]]"
        - "[[prometheus|Prometheus]]"
        - tabela:signoz
  - id: obs_orq_e2
    raia: obs_orq
    tipo: fim
    rotulo: Plataforma de observabilidade assinada
    proximo: []
    retorno: assinar
    saida:
      tipo: assinar
      justificativa: Uma plataforma gerenciada recebe a telemetria, oferece painéis e alertas prontos e coloca a visibilidade em uso em dias, com o padrão aberto na instrumentação para manter a saída aberta.
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
      categoria: "[[observabilidade_apm|Observabilidade e APM]]"
      ferramentas:
        - "[[grafana_cloud|Grafana Cloud]]"
        - "[[sentry|Sentry]]"
        - tabela:better-stack
  - id: obs_ctx_s0
    raia: obs_ctx
    tipo: inicio
    rotulo: Início do levantamento
    proximo:
      - para: obs_ctx_t1
        condicao: ""
  - id: obs_ctx_t1
    raia: obs_ctx
    tipo: tarefa
    rotulo: Definir perguntas e metas de serviço
    proximo:
      - para: obs_ctx_e1
        condicao: ""
    passos:
      - ctx.perguntas_e_metas_de_servico
  - id: obs_ctx_e1
    raia: obs_ctx
    tipo: fim
    rotulo: Perguntas e metas definidas
    proximo: []
    retorno: metas_definidas
  - id: obs_abd_s0
    raia: obs_abd
    tipo: inicio
    rotulo: Início da escolha
    proximo:
      - para: obs_abd_t1
        condicao: ""
  - id: obs_abd_t1
    raia: obs_abd
    tipo: tarefa
    rotulo: Registrar premissas e pontuar as opções
    proximo:
      - para: obs_abd_g1
        condicao: ""
    passos:
      - ctx.premissas_nao_funcionais
      - prep.pontuar_opcoes_matriz
  - id: obs_abd_g1
    raia: obs_abd
    tipo: bifurcacao
    rotulo: Telemetria em ambiente próprio?
    proximo:
      - para: obs_abd_e1
        condicao: sim
      - para: obs_abd_g2
        condicao: não
    eixo: compliance_dados
    pergunta: q.telemetria_com_dados_sensiveis
  - id: obs_abd_g2
    raia: obs_abd
    tipo: bifurcacao
    rotulo: Volume que favorece pilha própria?
    proximo:
      - para: obs_abd_e1
        condicao: sim
      - para: obs_abd_g3
        condicao: não
    eixo: escala_volume
    pergunta: q.volume_de_telemetria_alto
  - id: obs_abd_g3
    raia: obs_abd
    tipo: bifurcacao
    rotulo: Visibilidade urgente?
    proximo:
      - para: obs_abd_e2
        condicao: sim
      - para: obs_abd_e2
        condicao: não
    eixo: prazo_entrega
    pergunta: q.visibilidade_urgente
  - id: obs_abd_e1
    raia: obs_abd
    tipo: fim
    rotulo: Construir com padrão aberto e pilha própria
    proximo: []
    retorno: construir
  - id: obs_abd_e2
    raia: obs_abd
    tipo: fim
    rotulo: Assinar uma plataforma de observabilidade
    proximo: []
    retorno: assinar
  - id: obs_ent_s0
    raia: obs_ent
    tipo: inicio
    rotulo: Início da entrega
    proximo:
      - para: obs_ent_t1
        condicao: ""
  - id: obs_ent_t1
    raia: obs_ent
    tipo: tarefa
    rotulo: Instrumentar
    proximo:
      - para: obs_ent_t2
        condicao: ""
    passos:
      - prep.instrumentar_com_padrao_aberto
      - exec.registros_estruturados_com_correlacao
      - exec.metricas_e_rastros_dos_fluxos_criticos
  - id: obs_ent_t2
    raia: obs_ent
    tipo: tarefa
    rotulo: Alertar sobre o efeito no usuário
    proximo:
      - para: obs_ent_t3
        condicao: ""
    passos:
      - exec.alertas_sobre_sintomas_de_usuario
  - id: obs_ent_t3
    raia: obs_ent
    tipo: tarefa
    rotulo: Validar e revisar
    proximo:
      - para: obs_ent_e1
        condicao: ""
    passos:
      - val.validar_com_falha_provocada
      - ent.paineis_e_donos_por_servico
      - ops.revisar_ruido_e_custo
  - id: obs_ent_e1
    raia: obs_ent
    tipo: fim
    rotulo: Sinais úteis em operação
    proximo: []
    retorno: pronta
perguntasDecisao:
  - id: q.telemetria_com_dados_sensiveis
    pergunta: A telemetria contém dados que precisam ficar em ambiente próprio?
    eixo: compliance_dados
  - id: q.volume_de_telemetria_alto
    pergunta: O volume de telemetria torna o preço por dado de um serviço gerenciado maior que o custo de operar a própria pilha?
    eixo: escala_volume
  - id: q.visibilidade_urgente
    pergunta: O time precisa de visibilidade de produção em poucos dias, sem montar e operar a pilha?
    eixo: prazo_entrega
objetivo: Obter registros, métricas e rastros correlacionados que respondem a perguntas novas sobre o comportamento do sistema, com alertas ligados ao efeito percebido por quem usa, na abordagem (assinar ou construir) que atende ao controle de dados e ao custo de telemetria.
preRequisitos:
  - Lista dos fluxos críticos e das perguntas que o time quer responder.
  - Metas de disponibilidade e latência por fluxo.
  - Acesso para alterar o código e a configuração dos serviços.
  - Premissas de volume de telemetria, dados sensíveis e orçamento.
passos:
  - id: ctx.perguntas_e_metas_de_servico
    titulo: Definir as perguntas e as metas de nível de serviço
    descricao: Escolher os fluxos críticos, as perguntas que a telemetria precisa responder e metas de disponibilidade e latência por fluxo.
    verificacao: Cada fluxo crítico tem ao menos uma pergunta e uma meta de nível de serviço aceita pelo dono.
    depende: []
  - id: ctx.premissas_nao_funcionais
    titulo: Registrar premissas não funcionais
    descricao: Anotar volume esperado, latência aceitável, dados sensíveis, prazo e orçamento, que alimentam as perguntas de decisão.
    verificacao: Cada um dos 7 eixos de adoção tem uma resposta escrita ou a nota de que não se aplica.
    depende:
      - ctx.perguntas_e_metas_de_servico
  - id: prep.pontuar_opcoes_matriz
    titulo: Pontuar construir, comprar e assinar
    descricao: Dar nota de 1 a 5 às três opções nos cinco critérios da matriz e registrar o objetivo que pesa mais.
    verificacao: A matriz tem as 15 notas preenchidas e a opção vencedora tem a justificativa registrada.
    depende:
      - ctx.premissas_nao_funcionais
  - id: prep.instrumentar_com_padrao_aberto
    titulo: Instrumentar com um padrão aberto
    descricao: Adotar bibliotecas e convenções abertas de telemetria para que o destino dos dados possa mudar sem alterar o código.
    verificacao: Os serviços emitem telemetria por um padrão aberto e o destino é configurável.
    depende:
      - prep.pontuar_opcoes_matriz
  - id: exec.registros_estruturados_com_correlacao
    titulo: Emitir registros estruturados com identificador de correlação
    descricao: Gravar registros em formato estruturado com nível, serviço e um identificador que une uma requisição entre componentes.
    verificacao: Uma requisição pode ser seguida entre serviços pelo identificador, sem dados pessoais nos registros.
    depende:
      - prep.instrumentar_com_padrao_aberto
  - id: exec.metricas_e_rastros_dos_fluxos_criticos
    titulo: Coletar métricas e rastros dos fluxos críticos
    descricao: Medir taxa de requisições, erros e latência por rota e rastrear chamadas entre componentes, com atributos que respondem às perguntas definidas.
    verificacao: Os painéis dos fluxos críticos mostram taxa, erros e latência e os rastros ligam as chamadas entre serviços.
    depende:
      - exec.registros_estruturados_com_correlacao
  - id: exec.alertas_sobre_sintomas_de_usuario
    titulo: Criar alertas sobre sintomas percebidos pelas pessoas
    descricao: Alertar quando a meta de nível de serviço está em risco, com um runbook ligado a cada alerta e um dono para atendê-lo.
    verificacao: Cada alerta tem dono, gravidade e runbook, e dispara por efeito sobre quem usa o serviço.
    depende:
      - exec.metricas_e_rastros_dos_fluxos_criticos
  - id: val.validar_com_falha_provocada
    titulo: Validar com uma falha provocada
    descricao: Provocar uma falha controlada em homologação e conferir se os sinais mostram a causa e se o alerta dispara.
    verificacao: A falha provocada foi detectada pelo alerta e diagnosticada com os sinais disponíveis.
    depende:
      - exec.alertas_sobre_sintomas_de_usuario
  - id: ent.paineis_e_donos_por_servico
    titulo: Publicar painéis e definir donos por serviço
    descricao: Organizar painéis por serviço com a visão de saúde no topo e registrar quem responde por cada sinal.
    verificacao: Cada serviço tem painel de saúde e dono nomeado.
    depende:
      - val.validar_com_falha_provocada
  - id: ops.revisar_ruido_e_custo
    titulo: Revisar ruído de alertas e custo da telemetria
    descricao: Rever periodicamente alertas sem ação, amostragem de rastros e retenção de dados para manter o sinal útil e o custo previsível.
    verificacao: A revisão periódica remove alertas sem ação e mantém o custo da telemetria dentro da meta.
    depende:
      - ent.paineis_e_donos_por_servico
comoFazerHoje: []
checklistRefs: {}
armadilhas:
  - Coletar tudo sem perguntas definidas, o que eleva o custo e dificulta achar o sinal.
  - Alertar sobre causas internas isoladas, o que gera ruído e fadiga de plantão.
  - Gravar dados pessoais nos registros, o que cria um risco de privacidade difícil de desfazer.
  - Prender a instrumentação a um único fornecedor, o que encarece uma futura troca.
validacao:
  - Cada fluxo crítico tem metas, painel e alerta ligados ao efeito sobre quem usa.
  - Uma requisição pode ser seguida entre serviços por um identificador de correlação.
  - Uma falha provocada foi detectada e diagnosticada pelos sinais disponíveis.
  - Cada alerta tem dono e runbook.
  - O custo da telemetria e o ruído dos alertas são revisados periodicamente.
padroes:
  - "[[sidecar|Sidecar]]"
  - "[[decorator|Decorator (GoF)]]"
  - "[[observer|Observer (GoF)]]"
categorias:
  - "[[observabilidade_apm|Observabilidade e APM]]"
  - "[[status_incidentes|Status e incidentes]]"
  - "[[infraestrutura_como_codigo|Infraestrutura como código]]"
  - "[[containers_orquestracao|Containers e orquestração]]"
aliases:
  - Instrumentar uma aplicação
  - Observabilidade de serviços
grupo: Qualidade entrega e operação
stacks:
  - "[[api_transacional_eventos|API transacional com eventos]]"
ferramentas:
  - "[[opentelemetry|OpenTelemetry]]"
  - "[[prometheus|Prometheus]]"
  - tabela:signoz
  - "[[grafana_cloud|Grafana Cloud]]"
  - "[[sentry|Sentry]]"
  - tabela:better-stack
casosDeUso:
  - "[[observabilidade_em_producao|Observabilidade em produção]]"
variacoes:
  - obs-apm-infra
certificacoes:
  - "[[aws_certified_cloudops_engineer_associate|AWS Certified CloudOps Engineer Associate]]"
dataVerificacao: 2026-11-23
tags:
  - guia-pratico
---
# Como adicionar observabilidade
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
