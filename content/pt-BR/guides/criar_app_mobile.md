---
id: criar_app_mobile
tipo: guia-pratico
nome: Como criar um app mobile
sigla: mob
descricao: "Caminho para entregar um aplicativo de celular: definir jornadas e plataformas, escolher entre assinar uma plataforma no-code ou construir sobre uma stack, validar em aparelhos reais e publicar nas lojas."
exemplo: "Uma rede de lojas precisa de um app para a equipe de campo registrar visitas com foto e funcionamento sem conexão: escolhe a stack móvel com backend gerenciado, valida em aparelhos reais e publica nas lojas com liberação gradual."
quando_usar:
  - Pessoas precisam usar a solução no celular com recursos do aparelho, como câmera, notificações ou uso sem conexão.
  - Uma versão web responsiva deixou de atender à experiência esperada.
quando_evitar:
  - Quando um site responsivo ou um app web instalável cobre a necessidade (veja o guia de criação de site).
fonte_ids:
  - android_core_app_quality
  - apple_hig
fontes:
  - id: android_core_app_quality
    tipo: artigo
    titulo: Core app quality guidelines (Android Developers)
    link: https://developer.android.com/docs/quality-guidelines/core-app-quality
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: apple_hig
    tipo: artigo
    titulo: Human Interface Guidelines (Apple Developer)
    link: https://developer.apple.com/design/human-interface-guidelines/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
status: rascunho
publico: false
raias:
  - id: mob_orq
    nome: Orquestração do app mobile
    responsabilidade: Encadear contexto, abordagem, stack e entrega até o desfecho.
    cor: "#607D8B"
    orquestradora: true
  - id: mob_ctx
    nome: Contexto e requisitos
    responsabilidade: Entender a necessidade e fixar escopo e critérios antes de escolher tecnologia.
    cor: "#0072B2"
    orquestradora: false
  - id: mob_abd
    nome: Abordagem de entrega
    responsabilidade: Decidir entre assinar, comprar ou construir a partir das premissas.
    cor: "#E69F00"
    orquestradora: false
  - id: mob_stk
    nome: Stack por contexto
    responsabilidade: Escolher o arquétipo de stack ou o caminho de construção por contexto.
    cor: "#009E73"
    orquestradora: false
  - id: mob_ent
    nome: Implementação e entrega
    responsabilidade: Implementar, validar, publicar e operar na abordagem escolhida.
    cor: "#56B4E9"
    orquestradora: false
nos:
  - id: mob_orq_s0
    raia: mob_orq
    tipo: inicio
    rotulo: Necessidade de um aplicativo no celular
    proximo:
      - para: mob_orq_c1
        condicao: ""
  - id: mob_orq_c1
    raia: mob_orq
    tipo: chamada
    rotulo: Definir jornadas e plataformas
    proximo:
      - para: mob_orq_c2
        condicao: jornadas_definidas
    raia_chamada: mob_ctx
  - id: mob_orq_c2
    raia: mob_orq
    tipo: chamada
    rotulo: Escolher a abordagem de entrega
    proximo:
      - para: mob_orq_c3
        condicao: construir
      - para: mob_orq_c6
        condicao: assinar_nocode
    raia_chamada: mob_abd
  - id: mob_orq_c3
    raia: mob_orq
    tipo: chamada
    rotulo: Escolher a stack por contexto
    proximo:
      - para: mob_orq_c4
        condicao: mobile_gerenciado
      - para: mob_orq_c5
        condicao: web_fullstack
    raia_chamada: mob_stk
  - id: mob_orq_c4
    raia: mob_orq
    tipo: chamada
    rotulo: Construir, validar e publicar o app
    proximo:
      - para: mob_orq_e1
        condicao: pronta
    raia_chamada: mob_ent
  - id: mob_orq_c5
    raia: mob_orq
    tipo: chamada
    rotulo: Construir, validar e publicar o app
    proximo:
      - para: mob_orq_e2
        condicao: pronta
    raia_chamada: mob_ent
  - id: mob_orq_c6
    raia: mob_orq
    tipo: chamada
    rotulo: Construir, validar e publicar o app
    proximo:
      - para: mob_orq_e3
        condicao: pronta
    raia_chamada: mob_ent
  - id: mob_orq_e1
    raia: mob_orq
    tipo: fim
    rotulo: App publicado sobre a stack móvel com backend gerenciado
    proximo: []
    retorno: mobile_gerenciado
    saida:
      tipo: stack
      justificativa: Câmera, notificações e uso sem conexão diferenciam o produto, e o backend gerenciado entrega autenticação, dados e sincronização sem que o time opere servidores.
      eixos:
        - latencia
        - time_maturidade
        - prazo_entrega
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
      stack: "[[mobile_backend_gerenciado|App mobile com backend gerenciado]]"
  - id: mob_orq_e2
    raia: mob_orq
    tipo: fim
    rotulo: App web instalável sobre a stack full-stack em JS e TS
    proximo: []
    retorno: web_fullstack
    saida:
      tipo: stack
      justificativa: Sem recursos avançados do aparelho, uma aplicação web instalável com uma só base de código chega mais cedo às duas plataformas e reaproveita o conhecimento do time.
      eixos:
        - time_maturidade
        - prazo_entrega
        - lock_in
      objetivo: cumprir_prazo
      notas:
        construir:
          diferenciacao: 3
          tempo_ate_valor: 4
          custo_total: 4
          dependencia_fornecedor: 5
          risco: 4
        comprar:
          diferenciacao: 2
          tempo_ate_valor: 3
          custo_total: 3
          dependencia_fornecedor: 3
          risco: 3
        assinar:
          diferenciacao: 2
          tempo_ate_valor: 5
          custo_total: 3
          dependencia_fornecedor: 2
          risco: 3
      stack: "[[web_fullstack_js_ts|Aplicação web full-stack em JavaScript e TypeScript]]"
  - id: mob_orq_e3
    raia: mob_orq
    tipo: fim
    rotulo: App interno publicado em uma plataforma no-code assinada
    proximo: []
    retorno: assinar_nocode
    saida:
      tipo: assinar
      justificativa: Para um app interno de formulários e listas, a plataforma no-code entrega telas, dados e permissões em dias, e valida o uso antes de qualquer investimento em código próprio.
      eixos:
        - prazo_entrega
        - orcamento
        - lock_in
      objetivo: validar_hipotese
      notas:
        construir:
          diferenciacao: 4
          tempo_ate_valor: 2
          custo_total: 3
          dependencia_fornecedor: 5
          risco: 3
        comprar:
          diferenciacao: 2
          tempo_ate_valor: 3
          custo_total: 3
          dependencia_fornecedor: 3
          risco: 4
        assinar:
          diferenciacao: 3
          tempo_ate_valor: 5
          custo_total: 4
          dependencia_fornecedor: 2
          risco: 3
      categoria: "[[formularios_bancos_no_code|Formulários e bancos no-code]]"
      ferramentas:
        - "[[airtable|Airtable]]"
        - "[[retool|Retool]]"
        - tabela:microsoft-power-apps
  - id: mob_ctx_s0
    raia: mob_ctx
    tipo: inicio
    rotulo: Início do levantamento
    proximo:
      - para: mob_ctx_t1
        condicao: ""
  - id: mob_ctx_t1
    raia: mob_ctx
    tipo: tarefa
    rotulo: Definir jornadas e validar o protótipo
    proximo:
      - para: mob_ctx_e1
        condicao: ""
    passos:
      - ctx.jornadas_e_plataformas
      - prep.prototipo_navegavel
  - id: mob_ctx_e1
    raia: mob_ctx
    tipo: fim
    rotulo: Jornadas e plataformas acordadas
    proximo: []
    retorno: jornadas_definidas
  - id: mob_abd_s0
    raia: mob_abd
    tipo: inicio
    rotulo: Início da escolha
    proximo:
      - para: mob_abd_t1
        condicao: ""
  - id: mob_abd_t1
    raia: mob_abd
    tipo: tarefa
    rotulo: Registrar premissas e pontuar as opções
    proximo:
      - para: mob_abd_g1
        condicao: ""
    passos:
      - ctx.premissas_nao_funcionais
      - prep.pontuar_opcoes_matriz
  - id: mob_abd_g1
    raia: mob_abd
    tipo: bifurcacao
    rotulo: Dados com residência e auditoria?
    proximo:
      - para: mob_abd_e1
        condicao: sim
      - para: mob_abd_g2
        condicao: não
    eixo: compliance_dados
    pergunta: q.dados_com_residencia_e_auditoria
  - id: mob_abd_g2
    raia: mob_abd
    tipo: bifurcacao
    rotulo: App interno e prazo curto?
    proximo:
      - para: mob_abd_e2
        condicao: sim
      - para: mob_abd_e1
        condicao: não
    eixo: prazo_entrega
    pergunta: q.app_interno_formularios_prazo_curto
  - id: mob_abd_e1
    raia: mob_abd
    tipo: fim
    rotulo: Construir com stack própria
    proximo: []
    retorno: construir
  - id: mob_abd_e2
    raia: mob_abd
    tipo: fim
    rotulo: Plataforma no-code de apps assinada
    proximo: []
    retorno: assinar_nocode
  - id: mob_stk_s0
    raia: mob_stk
    tipo: inicio
    rotulo: Início da escolha da stack
    proximo:
      - para: mob_stk_g1
        condicao: ""
  - id: mob_stk_g1
    raia: mob_stk
    tipo: bifurcacao
    rotulo: Recursos do aparelho exigidos?
    proximo:
      - para: mob_stk_e1
        condicao: sim
      - para: mob_stk_g2
        condicao: não
    eixo: contexto
    pergunta: q.recursos_nativos_do_aparelho
  - id: mob_stk_g2
    raia: mob_stk
    tipo: bifurcacao
    rotulo: Time em JS e TS com base única?
    proximo:
      - para: mob_stk_e2
        condicao: sim
      - para: mob_stk_e1
        condicao: não
    eixo: time_maturidade
    pergunta: q.time_js_base_unica_web
  - id: mob_stk_e1
    raia: mob_stk
    tipo: fim
    rotulo: Stack móvel com backend gerenciado
    proximo: []
    retorno: mobile_gerenciado
  - id: mob_stk_e2
    raia: mob_stk
    tipo: fim
    rotulo: Stack web full-stack instalável
    proximo: []
    retorno: web_fullstack
  - id: mob_ent_s0
    raia: mob_ent
    tipo: inicio
    rotulo: Início da entrega
    proximo:
      - para: mob_ent_t1
        condicao: ""
  - id: mob_ent_t1
    raia: mob_ent
    tipo: tarefa
    rotulo: Modelar dados e construir a jornada principal
    proximo:
      - para: mob_ent_t2
        condicao: ""
    passos:
      - prep.dados_e_sincronizacao
      - exec.construir_jornada_principal
      - exec.autenticacao_e_permissoes
  - id: mob_ent_t2
    raia: mob_ent
    tipo: tarefa
    rotulo: Validar em aparelhos reais
    proximo:
      - para: mob_ent_t3
        condicao: ""
    passos:
      - val.testes_em_aparelhos
      - val.qualidade_e_acessibilidade
  - id: mob_ent_t3
    raia: mob_ent
    tipo: tarefa
    rotulo: Publicar e operar
    proximo:
      - para: mob_ent_e1
        condicao: ""
    passos:
      - ent.publicar_nas_lojas
      - ops.monitorar_falhas_e_versoes
  - id: mob_ent_e1
    raia: mob_ent
    tipo: fim
    rotulo: App publicado e monitorado
    proximo: []
    retorno: pronta
perguntasDecisao:
  - id: q.dados_com_residencia_e_auditoria
    pergunta: Os dados exigem controle de residência ou trilha de auditoria próprios?
    eixo: compliance_dados
  - id: q.app_interno_formularios_prazo_curto
    pergunta: O app é interno, centrado em formulários e listas de dados, e o prazo é curto?
    eixo: prazo_entrega
  - id: q.recursos_nativos_do_aparelho
    pergunta: O app precisa de recursos do aparelho, como câmera, sensores, notificações ou uso sem conexão?
    eixo: contexto
  - id: q.time_js_base_unica_web
    pergunta: O time domina JavaScript e TypeScript e quer uma só base para web e celular?
    eixo: time_maturidade
objetivo: Publicar um aplicativo estável, acessível e seguro nas plataformas-alvo, na abordagem (assinar ou construir) que atende ao prazo, aos recursos do aparelho e ao controle dos dados.
preRequisitos:
  - Público, jornadas principais e plataformas-alvo.
  - Lista dos recursos do aparelho necessários (câmera, localização, notificações, uso sem conexão).
  - Contas de publicação nas lojas das plataformas-alvo.
  - Premissas de volume, dados sensíveis, prazo e orçamento.
passos:
  - id: ctx.jornadas_e_plataformas
    titulo: Definir jornadas principais e plataformas-alvo
    descricao: Descrever as jornadas de maior valor, quem as executa e em quais plataformas e versões mínimas o app precisa rodar.
    verificacao: Cada jornada principal tem um fluxo de tela em tela e as plataformas-alvo estão listadas.
    depende: []
  - id: prep.prototipo_navegavel
    titulo: Validar um protótipo navegável com usuários
    descricao: Montar um protótipo clicável das jornadas e observar pessoas do público usando-o.
    verificacao: Ao menos cinco pessoas do público completam a jornada principal no protótipo e os ajustes ficam registrados.
    depende:
      - ctx.jornadas_e_plataformas
  - id: ctx.premissas_nao_funcionais
    titulo: Registrar premissas não funcionais
    descricao: Anotar volume esperado, latência aceitável, dados sensíveis, prazo e orçamento, que alimentam as perguntas de decisão.
    verificacao: Cada um dos 7 eixos de adoção tem uma resposta escrita ou a nota de que não se aplica.
    depende:
      - ctx.jornadas_e_plataformas
  - id: prep.pontuar_opcoes_matriz
    titulo: Pontuar construir, comprar e assinar
    descricao: Dar nota de 1 a 5 às três opções nos cinco critérios da matriz e registrar o objetivo que pesa mais.
    verificacao: A matriz tem as 15 notas preenchidas e a opção vencedora tem a justificativa registrada.
    depende:
      - ctx.premissas_nao_funcionais
  - id: prep.dados_e_sincronizacao
    titulo: Modelar dados, sincronização e uso sem conexão
    descricao: Definir as entidades, o dono de cada dado, a regra de conflito na sincronização e o comportamento de cada tela sem conexão.
    verificacao: Cada entidade tem dono do dado e regra de conflito, e o comportamento sem conexão está descrito por tela.
    depende:
      - prep.pontuar_opcoes_matriz
      - prep.prototipo_navegavel
  - id: exec.construir_jornada_principal
    titulo: Construir a jornada principal ponta a ponta
    descricao: Implementar a jornada de maior valor da interface até o armazenamento e entregá-la em uma versão interna.
    verificacao: Uma pessoa do time conclui a jornada principal no aparelho a partir de uma versão interna instalada.
    depende:
      - prep.dados_e_sincronizacao
  - id: exec.autenticacao_e_permissoes
    titulo: Aplicar autenticação e permissões do aparelho
    descricao: Implementar o login, a guarda segura de credenciais no aparelho e os pedidos de permissão no momento de uso, com texto claro.
    verificacao: Cada permissão é pedida só quando a função aparece e o app funciona quando a pessoa a recusa.
    depende:
      - exec.construir_jornada_principal
  - id: val.testes_em_aparelhos
    titulo: Testar em aparelhos reais e em redes ruins
    descricao: Rodar as jornadas em aparelhos de gerações e tamanhos diferentes, com rede lenta, instável e ausente.
    verificacao: As jornadas principais passam em ao menos um aparelho de cada plataforma-alvo, inclusive com rede lenta e sem rede.
    depende:
      - exec.construir_jornada_principal
  - id: val.qualidade_e_acessibilidade
    titulo: Verificar qualidade, acessibilidade e consumo
    descricao: Conferir os critérios de qualidade de cada loja, a acessibilidade com leitor de tela e o consumo de bateria e de dados.
    verificacao: O app cumpre a lista de qualidade de cada loja e o leitor de tela percorre as jornadas principais.
    depende:
      - exec.autenticacao_e_permissoes
      - val.testes_em_aparelhos
  - id: ent.publicar_nas_lojas
    titulo: Preparar e publicar nas lojas
    descricao: Preparar descrição, imagens, política de privacidade e declaração de dados, e liberar a versão para uma parcela dos usuários.
    verificacao: O app passa na revisão de cada loja e a política de privacidade está publicada.
    depende:
      - val.qualidade_e_acessibilidade
  - id: ops.monitorar_falhas_e_versoes
    titulo: Monitorar falhas e planejar versões
    descricao: Coletar relatórios de falhas e avaliações, e definir a cadência de versões e o suporte às versões antigas.
    verificacao: Falhas e travamentos aparecem em um painel e há um canal de feedback dentro do app.
    depende:
      - ent.publicar_nas_lojas
comoFazerHoje: []
checklistRefs: {}
armadilhas:
  - Construir recursos do aparelho antes de validar a jornada principal com pessoas do público.
  - Testar só em simulador, o que esconde falhas de rede, bateria e desempenho em aparelhos reais.
  - Pedir todas as permissões na abertura do app, o que reduz a aceitação.
  - Publicar sem canal de relatórios de falhas, o que atrasa a correção das versões.
validacao:
  - As jornadas principais passam em aparelhos reais de cada plataforma-alvo, com rede lenta e sem rede.
  - Cada permissão é pedida no momento de uso e o app funciona quando é recusada.
  - O app cumpre os critérios de qualidade e de acessibilidade de cada loja.
  - Falhas e travamentos chegam a um painel com alerta.
  - A política de privacidade e a declaração de dados estão publicadas e coerentes com a coleta.
padroes:
  - "[[backend_for_frontend|Backend for Frontend]]"
  - "[[retry_backoff_exponencial|Retry]]"
  - "[[inbox_idempotent_consumer|Idempotência]]"
  - "[[cache_aside|Cache-aside]]"
  - "[[timeout|Timeout]]"
categorias:
  - "[[frameworks_mobile|Frameworks de mobile]]"
  - "[[formularios_bancos_no_code|Formulários e bancos no-code]]"
  - "[[baas_backend_pronto|BaaS e backend pronto]]"
  - "[[autenticacao_identidade|Autenticação e identidade]]"
  - "[[testes_qa|Testes e QA]]"
  - "[[observabilidade_apm|Observabilidade e APM]]"
aliases:
  - Criar um app mobile
  - Criar um aplicativo de celular
grupo: Construir software
stacks:
  - "[[mobile_backend_gerenciado|App mobile com backend gerenciado]]"
  - "[[web_fullstack_js_ts|Aplicação web full-stack em JavaScript e TypeScript]]"
ferramentas:
  - "[[airtable|Airtable]]"
  - "[[retool|Retool]]"
  - tabela:microsoft-power-apps
casosDeUso:
  - "[[prototipacao_de_front_end|Prototipação de front-end]]"
  - "[[startup_saas_inicial_pequena_empresa|Startup SaaS inicial (pequena empresa)]]"
variacoes:
  - proto-backend-pronto
  - saas-stack-mvp
certificacoes: []
dataVerificacao: 2026-11-23
tags:
  - guia-pratico
---
# Como criar um app mobile
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
