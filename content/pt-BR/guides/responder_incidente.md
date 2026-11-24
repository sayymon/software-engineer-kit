---
id: responder_incidente
tipo: guia-pratico
nome: Como responder a um incidente
sigla: rsp
descricao: "Caminho para conduzir um incidente em produção: classificar a gravidade, definir papéis e um canal único, mitigar antes de investigar, comunicar o estado, confirmar a recuperação e conduzir uma revisão sem atribuição de culpa."
exemplo: "O pagamento falha para parte das pessoas usuárias: o time declara o incidente, uma pessoa coordena, outra volta a versão anterior para restaurar o serviço, a comunicação atualiza a página de status e, depois, a revisão gera ações com donos e prazos."
quando_usar:
  - Um serviço em produção degradou ou parou e pessoas usuárias ou o negócio sentem o efeito.
  - Um alerta de alta gravidade exige coordenação entre mais de uma pessoa ou time.
quando_evitar:
  - Quando o problema é um defeito sem impacto imediato, que cabe no fluxo normal de correção (veja o guia de investigação de defeitos).
fonte_ids:
  - sre_managing_incidents
  - sre_postmortem
fontes:
  - id: sre_managing_incidents
    tipo: artigo
    titulo: Managing Incidents (Google SRE Book)
    link: https://sre.google/sre-book/managing-incidents/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: sre_postmortem
    tipo: artigo
    titulo: "Postmortem Culture: Learning from Failure (Google SRE Book)"
    link: https://sre.google/sre-book/postmortem-culture/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
status: rascunho
publico: false
raias:
  - id: rsp_orq
    nome: Orquestração do incidente
    responsabilidade: Encadear contexto, ferramental e resposta até a recuperação e o aprendizado.
    cor: "#607D8B"
    orquestradora: true
  - id: rsp_ctx
    nome: Contexto e requisitos
    responsabilidade: Entender a necessidade e fixar escopo e critérios antes de escolher tecnologia.
    cor: "#0072B2"
    orquestradora: false
  - id: rsp_abd
    nome: Abordagem de entrega
    responsabilidade: Decidir entre assinar, comprar ou construir a partir das premissas.
    cor: "#E69F00"
    orquestradora: false
  - id: rsp_ent
    nome: Implementação e entrega
    responsabilidade: Implementar, validar, publicar e operar na abordagem escolhida.
    cor: "#009E73"
    orquestradora: false
nos:
  - id: rsp_orq_s0
    raia: rsp_orq
    tipo: inicio
    rotulo: Alerta ou relato de degradação em produção
    proximo:
      - para: rsp_orq_c1
        condicao: ""
  - id: rsp_orq_c1
    raia: rsp_orq
    tipo: chamada
    rotulo: Declarar e classificar o incidente
    proximo:
      - para: rsp_orq_c2
        condicao: incidente_classificado
    raia_chamada: rsp_ctx
  - id: rsp_orq_c2
    raia: rsp_orq
    tipo: chamada
    rotulo: Escolher o ferramental de plantão e comunicação
    proximo:
      - para: rsp_orq_c3
        condicao: construir
      - para: rsp_orq_c4
        condicao: assinar
    raia_chamada: rsp_abd
  - id: rsp_orq_c3
    raia: rsp_orq
    tipo: chamada
    rotulo: Mitigar, comunicar, recuperar e aprender
    proximo:
      - para: rsp_orq_e1
        condicao: pronta
    raia_chamada: rsp_ent
  - id: rsp_orq_c4
    raia: rsp_orq
    tipo: chamada
    rotulo: Mitigar, comunicar, recuperar e aprender
    proximo:
      - para: rsp_orq_e2
        condicao: pronta
    raia_chamada: rsp_ent
  - id: rsp_orq_e1
    raia: rsp_orq
    tipo: fim
    rotulo: Resposta com runbooks e canais próprios
    proximo: []
    retorno: construir
    saida:
      tipo: construir
      justificativa: Para poucos serviços ou dados que precisam ficar em ambiente próprio, runbooks escritos, um canal fixo e monitoramento simples sustentam a resposta com custo mínimo.
      eixos:
        - compliance_dados
        - orcamento
        - escala_volume
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
      categoria: "[[status_incidentes|Status e incidentes]]"
      ferramentas:
        - tabela:uptimerobot
  - id: rsp_orq_e2
    raia: rsp_orq
    tipo: fim
    rotulo: Resposta com plataforma de plantão e página de status
    proximo: []
    retorno: assinar
    saida:
      tipo: assinar
      justificativa: Uma plataforma de plantão traz escalonamento, linha do tempo e página de status prontos, o que reduz o tempo de acionamento e padroniza a comunicação com quem usa o serviço.
      eixos:
        - prazo_entrega
        - escala_volume
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
      categoria: "[[status_incidentes|Status e incidentes]]"
      ferramentas:
        - tabela:pagerduty
        - tabela:incident-io
        - "[[atlassian_statuspage|Atlassian Statuspage]]"
  - id: rsp_ctx_s0
    raia: rsp_ctx
    tipo: inicio
    rotulo: Início do levantamento
    proximo:
      - para: rsp_ctx_t1
        condicao: ""
  - id: rsp_ctx_t1
    raia: rsp_ctx
    tipo: tarefa
    rotulo: Declarar e classificar o incidente
    proximo:
      - para: rsp_ctx_e1
        condicao: ""
    passos:
      - ctx.gravidade_e_impacto
  - id: rsp_ctx_e1
    raia: rsp_ctx
    tipo: fim
    rotulo: Incidente declarado e classificado
    proximo: []
    retorno: incidente_classificado
  - id: rsp_abd_s0
    raia: rsp_abd
    tipo: inicio
    rotulo: Início da escolha
    proximo:
      - para: rsp_abd_t1
        condicao: ""
  - id: rsp_abd_t1
    raia: rsp_abd
    tipo: tarefa
    rotulo: Registrar premissas e pontuar as opções
    proximo:
      - para: rsp_abd_g1
        condicao: ""
    passos:
      - ctx.premissas_nao_funcionais
      - prep.pontuar_opcoes_matriz
  - id: rsp_abd_g1
    raia: rsp_abd
    tipo: bifurcacao
    rotulo: Dados em ambiente próprio?
    proximo:
      - para: rsp_abd_e1
        condicao: sim
      - para: rsp_abd_g2
        condicao: não
    eixo: compliance_dados
    pergunta: q.dados_de_incidente_em_ambiente_proprio
  - id: rsp_abd_g2
    raia: rsp_abd
    tipo: bifurcacao
    rotulo: Sem plantão e status?
    proximo:
      - para: rsp_abd_e2
        condicao: sim
      - para: rsp_abd_g3
        condicao: não
    eixo: prazo_entrega
    pergunta: q.sem_plantao_nem_pagina_de_status
  - id: rsp_abd_g3
    raia: rsp_abd
    tipo: bifurcacao
    rotulo: Muitos serviços e alertas?
    proximo:
      - para: rsp_abd_e2
        condicao: sim
      - para: rsp_abd_e1
        condicao: não
    eixo: escala_volume
    pergunta: q.muitos_servicos_e_alertas
  - id: rsp_abd_e1
    raia: rsp_abd
    tipo: fim
    rotulo: Operar com runbooks e canais próprios
    proximo: []
    retorno: construir
  - id: rsp_abd_e2
    raia: rsp_abd
    tipo: fim
    rotulo: Operar com plataforma de plantão e status
    proximo: []
    retorno: assinar
  - id: rsp_ent_s0
    raia: rsp_ent
    tipo: inicio
    rotulo: Início da entrega
    proximo:
      - para: rsp_ent_t1
        condicao: ""
  - id: rsp_ent_t1
    raia: rsp_ent
    tipo: tarefa
    rotulo: Organizar a resposta
    proximo:
      - para: rsp_ent_t2
        condicao: ""
    passos:
      - prep.papeis_e_canal_unico
      - exec.mitigar_antes_de_investigar
  - id: rsp_ent_t2
    raia: rsp_ent
    tipo: tarefa
    rotulo: Investigar e comunicar
    proximo:
      - para: rsp_ent_t3
        condicao: ""
    passos:
      - exec.investigar_com_evidencias
      - ent.comunicar_estado_periodicamente
  - id: rsp_ent_t3
    raia: rsp_ent
    tipo: tarefa
    rotulo: Confirmar e aprender
    proximo:
      - para: rsp_ent_e1
        condicao: ""
    passos:
      - val.confirmar_recuperacao
      - ops.revisao_sem_culpa
      - ops.atualizar_runbooks_e_alertas
  - id: rsp_ent_e1
    raia: rsp_ent
    tipo: fim
    rotulo: Serviço recuperado e aprendizado registrado
    proximo: []
    retorno: pronta
perguntasDecisao:
  - id: q.dados_de_incidente_em_ambiente_proprio
    pergunta: A comunicação e os dados do incidente precisam ficar em ambiente próprio por exigência de conformidade?
    eixo: compliance_dados
  - id: q.sem_plantao_nem_pagina_de_status
    pergunta: O time ainda opera sem plantão, escalonamento e página de status e precisa de cobertura já no próximo ciclo?
    eixo: prazo_entrega
  - id: q.muitos_servicos_e_alertas
    pergunta: Há muitos serviços e times com alertas frequentes que pedem roteamento e escalonamento automáticos?
    eixo: escala_volume
objetivo: Restaurar o serviço com rapidez e coordenação, manter as pessoas informadas e transformar cada incidente em ações de melhoria, com o ferramental (assinar ou construir) que atende ao controle de dados e ao porte da operação.
preRequisitos:
  - Critérios de gravidade acordados e uma lista de quem pode declarar um incidente.
  - Um canal de comunicação único para a equipe de resposta.
  - Indicadores e alertas dos serviços críticos.
  - Premissas de volume de alertas, dados sensíveis e orçamento.
passos:
  - id: ctx.gravidade_e_impacto
    titulo: Classificar a gravidade e o impacto
    descricao: Aplicar os critérios de gravidade acordados, estimar quem é afetado e designar a pessoa que coordena a resposta.
    verificacao: O incidente tem gravidade, impacto estimado e uma pessoa coordenadora registrados no canal.
    depende: []
  - id: ctx.premissas_nao_funcionais
    titulo: Registrar premissas não funcionais
    descricao: Anotar volume esperado, latência aceitável, dados sensíveis, prazo e orçamento, que alimentam as perguntas de decisão.
    verificacao: Cada um dos 7 eixos de adoção tem uma resposta escrita ou a nota de que não se aplica.
    depende:
      - ctx.gravidade_e_impacto
  - id: prep.pontuar_opcoes_matriz
    titulo: Pontuar construir, comprar e assinar
    descricao: Dar nota de 1 a 5 às três opções nos cinco critérios da matriz e registrar o objetivo que pesa mais.
    verificacao: A matriz tem as 15 notas preenchidas e a opção vencedora tem a justificativa registrada.
    depende:
      - ctx.premissas_nao_funcionais
  - id: prep.papeis_e_canal_unico
    titulo: Definir papéis e um canal único
    descricao: Nomear quem coordena, quem investiga e quem comunica, e concentrar toda a conversa em um único canal com registro.
    verificacao: Os três papéis têm pessoas nomeadas e o canal registra as decisões e os horários.
    depende:
      - prep.pontuar_opcoes_matriz
  - id: exec.mitigar_antes_de_investigar
    titulo: Mitigar para restaurar o serviço antes de aprofundar a causa
    descricao: Escolher a ação mais rápida e reversível, como voltar a versão anterior, desviar tráfego ou desligar um recurso, e aplicá-la.
    verificacao: Os indicadores de usuário voltam ao patamar normal após a mitigação, ou a ação seguinte está definida.
    depende:
      - prep.papeis_e_canal_unico
  - id: exec.investigar_com_evidencias
    titulo: Investigar a causa com evidências
    descricao: Reunir linha do tempo de mudanças, métricas e registros e testar hipóteses em paralelo sem alterar o que não está em análise.
    verificacao: A linha do tempo das mudanças e o sinal que aponta a causa estão registrados no canal.
    depende:
      - exec.mitigar_antes_de_investigar
  - id: ent.comunicar_estado_periodicamente
    titulo: Comunicar o estado em intervalos regulares
    descricao: Publicar atualizações com o que se sabe, o que se faz e a próxima atualização, para a equipe interna e para quem usa o serviço.
    verificacao: Há atualizações periódicas publicadas até o encerramento e uma mensagem final de resolução.
    depende:
      - exec.mitigar_antes_de_investigar
  - id: val.confirmar_recuperacao
    titulo: Confirmar a recuperação com indicadores
    descricao: Verificar disponibilidade, erros e latência nos painéis e em transações de teste antes de declarar o encerramento.
    verificacao: Os indicadores permaneceram saudáveis pelo período combinado e o incidente foi encerrado formalmente.
    depende:
      - exec.investigar_com_evidencias
  - id: ops.revisao_sem_culpa
    titulo: Conduzir uma revisão sem atribuição de culpa
    descricao: Reconstruir a linha do tempo, os fatores contribuintes e o que funcionou, focando em sistema e processo e não em pessoas.
    verificacao: O documento da revisão tem linha do tempo, fatores contribuintes e ações com dono e prazo.
    depende:
      - val.confirmar_recuperacao
  - id: ops.atualizar_runbooks_e_alertas
    titulo: Atualizar runbooks e alertas
    descricao: Transformar as lições em runbooks, alertas e testes e acompanhar as ações até a conclusão.
    verificacao: Cada ação da revisão tem dono, prazo e acompanhamento, e o runbook do cenário foi atualizado.
    depende:
      - ops.revisao_sem_culpa
comoFazerHoje: []
checklistRefs: {}
armadilhas:
  - Investigar a causa completa antes de mitigar, o que prolonga o impacto sobre pessoas usuárias.
  - Conduzir a resposta em vários canais, o que dispersa a informação e atrasa decisões.
  - Buscar um culpado individual na revisão, o que reduz a transparência nos próximos incidentes.
  - Encerrar a revisão sem ações com dono e prazo, o que mantém as condições do próximo incidente.
validacao:
  - O serviço voltou ao patamar normal nos indicadores e o incidente foi encerrado formalmente.
  - Havia coordenador, investigador e responsável pela comunicação, com um canal único registrado.
  - As atualizações para equipe e usuários foram publicadas em intervalos regulares.
  - A revisão sem culpa tem linha do tempo, fatores contribuintes e ações com dono e prazo.
  - Os runbooks e alertas do cenário foram atualizados.
padroes:
  - "[[circuit_breaker|Circuit Breaker]]"
  - "[[failover|Estratégias de failover]]"
  - "[[load_shedding|Load Shedding]]"
  - "[[bulkhead|Bulkhead]]"
categorias:
  - "[[status_incidentes|Status e incidentes]]"
  - "[[observabilidade_apm|Observabilidade e APM]]"
  - "[[feature_flags_experimentacao|Feature flags e experimentação]]"
  - "[[agente_codigo|Agente de código]]"
aliases:
  - Responder a um incidente
  - Gestão de incidentes
grupo: Qualidade entrega e operação
stacks:
  - "[[api_transacional_eventos|API transacional com eventos]]"
ferramentas:
  - tabela:uptimerobot
  - tabela:pagerduty
  - tabela:incident-io
  - "[[atlassian_statuspage|Atlassian Statuspage]]"
casosDeUso:
  - "[[resposta_a_incidentes|Resposta a incidentes]]"
  - "[[observabilidade_em_producao|Observabilidade em produção]]"
variacoes:
  - inc-plantao-escalonamento
  - inc-comunicacao-status
  - inc-pos-mortem
certificacoes:
  - "[[itil_4_foundation|ITIL 4 Foundation]]"
  - "[[aws_certified_cloudops_engineer_associate|AWS Certified CloudOps Engineer Associate]]"
dataVerificacao: 2026-11-23
tags:
  - guia-pratico
---
# Como responder a um incidente
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
