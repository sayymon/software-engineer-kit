---
id: criar_automacao_nocode
tipo: guia-pratico
nome: Como criar uma automação no-code
sigla: noc
descricao: "Caminho para automatizar um processo com plataformas visuais: mapear o processo e o ganho esperado, escolher entre assinar uma plataforma, operar uma plataforma própria ou construir em código, e entregar com tratamento de falhas, aprovação humana e acompanhamento."
exemplo: "Um time de operações quer encaminhar pedidos de compra com aprovação do gestor: mapeia o processo, monta um fluxo mínimo em uma plataforma de automação operada pelo próprio time, define a aprovação humana e acompanha as execuções."
quando_usar:
  - Um processo repetitivo entre sistemas já suportados tem gatilho e ações previsíveis.
  - Uma equipe sem desenvolvedores dedicados precisa ligar aplicações e dados com rapidez.
quando_evitar:
  - Quando a integração exige contrato próprio e alto volume com garantias de entrega (veja o guia de integração com API de terceiros).
fonte_ids:
  - n8n_docs
  - aws_idempotent_retries
fontes:
  - id: n8n_docs
    tipo: artigo
    titulo: n8n Docs
    link: https://docs.n8n.io/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: aws_idempotent_retries
    tipo: artigo
    titulo: Making retries safe with idempotent APIs (Amazon Builders' Library)
    link: https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
status: rascunho
publico: false
raias:
  - id: noc_orq
    nome: Orquestração da automação
    responsabilidade: Encadear contexto, abordagem e entrega até o desfecho.
    cor: "#607D8B"
    orquestradora: true
  - id: noc_ctx
    nome: Contexto e requisitos
    responsabilidade: Entender a necessidade e fixar escopo e critérios antes de escolher tecnologia.
    cor: "#0072B2"
    orquestradora: false
  - id: noc_abd
    nome: Abordagem de entrega
    responsabilidade: Decidir entre assinar, comprar ou construir a partir das premissas.
    cor: "#E69F00"
    orquestradora: false
  - id: noc_ent
    nome: Implementação e entrega
    responsabilidade: Implementar, validar, publicar e operar na abordagem escolhida.
    cor: "#009E73"
    orquestradora: false
nos:
  - id: noc_orq_s0
    raia: noc_orq
    tipo: inicio
    rotulo: Necessidade de automatizar um processo repetitivo
    proximo:
      - para: noc_orq_c1
        condicao: ""
  - id: noc_orq_c1
    raia: noc_orq
    tipo: chamada
    rotulo: Mapear o processo e o ganho esperado
    proximo:
      - para: noc_orq_c2
        condicao: processo_mapeado
    raia_chamada: noc_ctx
  - id: noc_orq_c2
    raia: noc_orq
    tipo: chamada
    rotulo: Escolher a abordagem de entrega
    proximo:
      - para: noc_orq_c3
        condicao: operar_plataforma_propria
      - para: noc_orq_c5
        condicao: construir_em_codigo
      - para: noc_orq_c4
        condicao: assinar_plataforma
    raia_chamada: noc_abd
  - id: noc_orq_c3
    raia: noc_orq
    tipo: chamada
    rotulo: Montar, testar e ativar a automação
    proximo:
      - para: noc_orq_e1
        condicao: pronta
    raia_chamada: noc_ent
  - id: noc_orq_c4
    raia: noc_orq
    tipo: chamada
    rotulo: Montar, testar e ativar a automação
    proximo:
      - para: noc_orq_e2
        condicao: pronta
    raia_chamada: noc_ent
  - id: noc_orq_c5
    raia: noc_orq
    tipo: chamada
    rotulo: Montar, testar e ativar a automação
    proximo:
      - para: noc_orq_e3
        condicao: pronta
    raia_chamada: noc_ent
  - id: noc_orq_e1
    raia: noc_orq
    tipo: fim
    rotulo: Automação ativa sobre a stack de automação e integrações
    proximo: []
    retorno: operar_plataforma_propria
    saida:
      tipo: stack
      justificativa: Operar a plataforma de automação no ambiente do time mantém os dados sob controle, evita a cobrança por execução e reduz a dependência de um fornecedor.
      eixos:
        - compliance_dados
        - orcamento
        - lock_in
      objetivo: reduzir_custo
      notas:
        construir:
          diferenciacao: 4
          tempo_ate_valor: 3
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
          diferenciacao: 3
          tempo_ate_valor: 4
          custo_total: 3
          dependencia_fornecedor: 2
          risco: 3
      stack: "[[automacao_integracoes|Automação e integrações orquestradas]]"
  - id: noc_orq_e2
    raia: noc_orq
    tipo: fim
    rotulo: Automação ativa em uma plataforma no-code assinada
    proximo: []
    retorno: assinar_plataforma
    saida:
      tipo: assinar
      justificativa: Um fluxo linear com conectores prontos entra em produção em horas na plataforma assinada, e permite medir o ganho antes de qualquer investimento em infraestrutura própria.
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
      categoria: "[[automacao_nocode|Automação e no-code]]"
      ferramentas:
        - tabela:zapier
        - tabela:make
        - tabela:power-automate
  - id: noc_orq_e3
    raia: noc_orq
    tipo: fim
    rotulo: Automação construída em código com filas e jobs
    proximo: []
    retorno: construir_em_codigo
    saida:
      tipo: construir
      justificativa: Regras complexas, versionamento em código e volume alto de execuções pedem filas e jobs com testes automatizados, o que dá controle fino da lógica e do desempenho.
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
          dependencia_fornecedor: 5
          risco: 3
        comprar:
          diferenciacao: 2
          tempo_ate_valor: 3
          custo_total: 2
          dependencia_fornecedor: 3
          risco: 3
        assinar:
          diferenciacao: 2
          tempo_ate_valor: 4
          custo_total: 3
          dependencia_fornecedor: 2
          risco: 3
      categoria: "[[filas_jobs_background|Filas e jobs em background]]"
      ferramentas:
        - "[[bullmq|BullMQ]]"
        - "[[temporal|Temporal]]"
        - tabela:celery
  - id: noc_ctx_s0
    raia: noc_ctx
    tipo: inicio
    rotulo: Início do levantamento
    proximo:
      - para: noc_ctx_t1
        condicao: ""
  - id: noc_ctx_t1
    raia: noc_ctx
    tipo: tarefa
    rotulo: Mapear o processo e definir gatilhos
    proximo:
      - para: noc_ctx_e1
        condicao: ""
    passos:
      - ctx.mapear_processo_atual
      - prep.gatilhos_e_dados
      - prep.aprovacao_humana_e_excecoes
  - id: noc_ctx_e1
    raia: noc_ctx
    tipo: fim
    rotulo: Processo mapeado
    proximo: []
    retorno: processo_mapeado
  - id: noc_abd_s0
    raia: noc_abd
    tipo: inicio
    rotulo: Início da escolha
    proximo:
      - para: noc_abd_t1
        condicao: ""
  - id: noc_abd_t1
    raia: noc_abd
    tipo: tarefa
    rotulo: Registrar premissas e pontuar as opções
    proximo:
      - para: noc_abd_g1
        condicao: ""
    passos:
      - ctx.premissas_nao_funcionais
      - prep.pontuar_opcoes_matriz
  - id: noc_abd_g1
    raia: noc_abd
    tipo: bifurcacao
    rotulo: Dados no ambiente próprio?
    proximo:
      - para: noc_abd_e1
        condicao: sim
      - para: noc_abd_g2
        condicao: não
    eixo: compliance_dados
    pergunta: q.dados_no_ambiente_proprio
  - id: noc_abd_g2
    raia: noc_abd
    tipo: bifurcacao
    rotulo: Lógica complexa ou volume alto?
    proximo:
      - para: noc_abd_e2
        condicao: sim
      - para: noc_abd_g3
        condicao: não
    eixo: escala_volume
    pergunta: q.logica_complexa_ou_alto_volume
  - id: noc_abd_g3
    raia: noc_abd
    tipo: bifurcacao
    rotulo: Conectores prontos e prazo curto?
    proximo:
      - para: noc_abd_e3
        condicao: sim
      - para: noc_abd_e1
        condicao: não
    eixo: prazo_entrega
    pergunta: q.conectores_prontos_prazo_curto
  - id: noc_abd_e1
    raia: noc_abd
    tipo: fim
    rotulo: Plataforma própria operada pelo time
    proximo: []
    retorno: operar_plataforma_propria
  - id: noc_abd_e2
    raia: noc_abd
    tipo: fim
    rotulo: Construir em código
    proximo: []
    retorno: construir_em_codigo
  - id: noc_abd_e3
    raia: noc_abd
    tipo: fim
    rotulo: Plataforma no-code assinada
    proximo: []
    retorno: assinar_plataforma
  - id: noc_ent_s0
    raia: noc_ent
    tipo: inicio
    rotulo: Início da entrega
    proximo:
      - para: noc_ent_t1
        condicao: ""
  - id: noc_ent_t1
    raia: noc_ent
    tipo: tarefa
    rotulo: Montar o fluxo mínimo com proteções
    proximo:
      - para: noc_ent_t2
        condicao: ""
    passos:
      - exec.montar_fluxo_minimo
      - exec.erros_e_repeticoes
      - exec.credenciais_e_permissoes
  - id: noc_ent_t2
    raia: noc_ent
    tipo: tarefa
    rotulo: Testar com dados de exemplo
    proximo:
      - para: noc_ent_t3
        condicao: ""
    passos:
      - val.testar_com_dados_de_exemplo
  - id: noc_ent_t3
    raia: noc_ent
    tipo: tarefa
    rotulo: Ativar e acompanhar
    proximo:
      - para: noc_ent_e1
        condicao: ""
    passos:
      - ent.ativar_e_documentar
      - ops.acompanhar_execucoes_e_consumo
  - id: noc_ent_e1
    raia: noc_ent
    tipo: fim
    rotulo: Automação ativa e acompanhada
    proximo: []
    retorno: pronta
perguntasDecisao:
  - id: q.dados_no_ambiente_proprio
    pergunta: Os dados do fluxo precisam permanecer no ambiente próprio?
    eixo: compliance_dados
  - id: q.logica_complexa_ou_alto_volume
    pergunta: O fluxo tem regras complexas, versionamento em código ou volume alto de execuções?
    eixo: escala_volume
  - id: q.conectores_prontos_prazo_curto
    pergunta: O fluxo é linear, há conectores prontos e o prazo é curto?
    eixo: prazo_entrega
objetivo: Entregar uma automação com gatilho claro, tratamento de falhas, aprovação humana nas ações irreversíveis e acompanhamento, na abordagem (assinar, operar plataforma própria ou construir) que atende ao prazo, ao volume e aos dados.
preRequisitos:
  - Descrição do processo atual, com etapas, responsáveis e tempo gasto.
  - Acesso às aplicações envolvidas e permissão para criar credenciais.
  - Responsável pelo fluxo e canal de aviso de falhas.
  - Premissas de volume, dados sensíveis, prazo e orçamento.
passos:
  - id: ctx.mapear_processo_atual
    titulo: Mapear o processo atual e o ganho esperado
    descricao: Descrever as etapas, os responsáveis, o tempo gasto por execução e a frequência, e estimar o ganho da automação.
    verificacao: O processo tem etapas, responsáveis, tempo por execução e uma meta de ganho registrados.
    depende: []
  - id: prep.gatilhos_e_dados
    titulo: Definir gatilhos, entradas e saídas
    descricao: Descrever para cada automação o gatilho, os dados de entrada, as ações e a saída esperada.
    verificacao: Cada automação tem gatilho, dados de entrada, ações e saída esperada descritos.
    depende:
      - ctx.mapear_processo_atual
  - id: prep.aprovacao_humana_e_excecoes
    titulo: Escolher pontos de aprovação humana e destino das exceções
    descricao: Marcar as ações irreversíveis que passam por aprovação e o destino de cada tipo de exceção.
    verificacao: Cada ação irreversível passa por aprovação e cada exceção tem destino definido.
    depende:
      - prep.gatilhos_e_dados
  - id: ctx.premissas_nao_funcionais
    titulo: Registrar premissas não funcionais
    descricao: Anotar volume esperado, latência aceitável, dados sensíveis, prazo e orçamento, que alimentam as perguntas de decisão.
    verificacao: Cada um dos 7 eixos de adoção tem uma resposta escrita ou a nota de que não se aplica.
    depende:
      - ctx.mapear_processo_atual
  - id: prep.pontuar_opcoes_matriz
    titulo: Pontuar construir, comprar e assinar
    descricao: Dar nota de 1 a 5 às três opções nos cinco critérios da matriz e registrar o objetivo que pesa mais.
    verificacao: A matriz tem as 15 notas preenchidas e a opção vencedora tem a justificativa registrada.
    depende:
      - ctx.premissas_nao_funcionais
  - id: exec.montar_fluxo_minimo
    titulo: Montar o fluxo mínimo ponta a ponta
    descricao: Construir o menor fluxo que entrega valor, do gatilho à saída, antes de acrescentar variações.
    verificacao: O fluxo mínimo roda do gatilho à saída com um caso real em ambiente de teste.
    depende:
      - prep.aprovacao_humana_e_excecoes
      - prep.pontuar_opcoes_matriz
  - id: exec.erros_e_repeticoes
    titulo: Configurar erros, repetição e fila de falhas
    descricao: Definir repetição com espera crescente, fila de falhas e aviso ao responsável, com chave de idempotência nas ações que gravam dados.
    verificacao: Uma falha induzida cai na fila de falhas, avisa o responsável e a reexecução não duplica efeitos.
    depende:
      - exec.montar_fluxo_minimo
  - id: exec.credenciais_e_permissoes
    titulo: Guardar credenciais e limitar permissões
    descricao: Criar uma credencial própria por conexão, com permissão mínima, guardada no cofre da plataforma.
    verificacao: Cada conexão usa credencial própria com permissão mínima e prazo de revisão.
    depende:
      - exec.montar_fluxo_minimo
  - id: val.testar_com_dados_de_exemplo
    titulo: Testar com dados de exemplo e casos de borda
    descricao: Executar o fluxo com dados vazios, duplicados, fora do formato e volumes maiores em ambiente de teste.
    verificacao: As execuções de teste cobrem dados vazios, duplicados e fora do formato sem afetar produção.
    depende:
      - exec.erros_e_repeticoes
      - exec.credenciais_e_permissoes
  - id: ent.ativar_e_documentar
    titulo: Ativar e documentar o fluxo
    descricao: Ativar o gatilho em produção e documentar objetivo, dono, dependências e passos de desligamento.
    verificacao: Há uma página com objetivo, dono, dependências e passos de desligamento do fluxo.
    depende:
      - val.testar_com_dados_de_exemplo
  - id: ops.acompanhar_execucoes_e_consumo
    titulo: Acompanhar execuções, falhas e consumo
    descricao: Revisar o histórico de execuções, a taxa de sucesso e o consumo de recursos por fluxo em uma rotina agendada.
    verificacao: O histórico mostra taxa de sucesso e consumo por fluxo, e a próxima revisão está agendada.
    depende:
      - ent.ativar_e_documentar
comoFazerHoje: []
checklistRefs: {}
armadilhas:
  - Automatizar um processo que ninguém mapeou, o que reproduz falhas em maior velocidade.
  - Deixar ações irreversíveis sem aprovação humana, o que amplia o dano de um erro de regra.
  - Reutilizar uma credencial de administrador em todos os fluxos, o que amplia o risco de vazamento.
  - Ativar sem fila de falhas e sem responsável, o que esconde execuções perdidas.
validacao:
  - O fluxo roda do gatilho à saída com casos reais em ambiente de teste.
  - Uma falha induzida avisa o responsável e a reexecução não duplica efeitos.
  - Cada conexão usa credencial própria com permissão mínima.
  - Ações irreversíveis passam por aprovação humana e exceções têm destino definido.
  - O histórico de execuções e o consumo são revisados em rotina agendada.
padroes:
  - "[[inbox_idempotent_consumer|Idempotência]]"
  - "[[human_in_the_loop|Human-in-the-Loop]]"
  - "[[retry_backoff_exponencial|Retry]]"
  - "[[dead_letter_queue|DLQ]]"
categorias:
  - "[[automacao_nocode|Automação e no-code]]"
  - "[[formularios_bancos_no_code|Formulários e bancos no-code]]"
  - "[[filas_jobs_background|Filas e jobs em background]]"
  - "[[senhas_segredos|Gerenciador de senhas e segredos]]"
  - "[[orquestracao_workflows_sagas|Orquestração de workflows e sagas]]"
aliases:
  - Criar uma automação no-code
  - Criar uma automação sem código
grupo: Construir software
stacks:
  - "[[automacao_integracoes|Automação e integrações orquestradas]]"
ferramentas:
  - tabela:zapier
  - tabela:make
  - tabela:power-automate
  - "[[bullmq|BullMQ]]"
  - "[[temporal|Temporal]]"
  - tabela:celery
casosDeUso:
  - "[[automacao_no_code_de_fluxos|Automação no-code de fluxos]]"
  - "[[automacao_de_processos|Automação de processos]]"
variacoes:
  - nocode-gatilho-acao
  - nocode-aprovacao-humana
  - proc-fluxo-aprovacao
certificacoes: []
dataVerificacao: 2026-11-23
tags:
  - guia-pratico
---
# Como criar uma automação no-code
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
