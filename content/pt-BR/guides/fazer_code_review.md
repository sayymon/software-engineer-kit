---
id: fazer_code_review
tipo: guia-pratico
nome: Como fazer code review
sigla: rev
descricao: "Caminho para revisar mudanças de código com qualidade e ritmo: acordar critérios, preparar mudanças pequenas, revisar design, corretude, testes e legibilidade, automatizar o que é mecânico e medir o tempo de revisão."
exemplo: Um time cria uma regra de mudanças pequenas com descrição padronizada, automatiza formatação e análise estática e reserva a revisão humana para design e corretude, o que reduz o tempo de espera das revisões.
quando_usar:
  - Uma mudança de código precisa de uma segunda visão antes de entrar na base principal.
  - O tempo de espera ou a qualidade das revisões do time estão irregulares.
quando_evitar:
  - Quando a mudança é de baixo risco e já passa em checagens automáticas que o time aceitou como suficientes.
fonte_ids:
  - google_eng_practices_review
fontes:
  - id: google_eng_practices_review
    tipo: artigo
    titulo: Code Review Developer Guide (Google Engineering Practices)
    link: https://google.github.io/eng-practices/review/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
status: rascunho
publico: false
raias:
  - id: rev_orq
    nome: Orquestração da revisão
    responsabilidade: Encadear contexto, ferramental e revisão até a integração.
    cor: "#607D8B"
    orquestradora: true
  - id: rev_ctx
    nome: Contexto e requisitos
    responsabilidade: Entender a necessidade e fixar escopo e critérios antes de escolher tecnologia.
    cor: "#0072B2"
    orquestradora: false
  - id: rev_abd
    nome: Abordagem de entrega
    responsabilidade: Decidir entre assinar, comprar ou construir a partir das premissas.
    cor: "#E69F00"
    orquestradora: false
  - id: rev_ent
    nome: Implementação e entrega
    responsabilidade: Implementar, validar, publicar e operar na abordagem escolhida.
    cor: "#009E73"
    orquestradora: false
nos:
  - id: rev_orq_s0
    raia: rev_orq
    tipo: inicio
    rotulo: Mudança de código pronta para revisão
    proximo:
      - para: rev_orq_c1
        condicao: ""
  - id: rev_orq_c1
    raia: rev_orq
    tipo: chamada
    rotulo: Acordar critérios e metas da revisão
    proximo:
      - para: rev_orq_c2
        condicao: criterios_definidos
    raia_chamada: rev_ctx
  - id: rev_orq_c2
    raia: rev_orq
    tipo: chamada
    rotulo: Escolher o ferramental de revisão automatizada
    proximo:
      - para: rev_orq_c3
        condicao: construir
      - para: rev_orq_c4
        condicao: assinar
    raia_chamada: rev_abd
  - id: rev_orq_c3
    raia: rev_orq
    tipo: chamada
    rotulo: Preparar, revisar, integrar e medir
    proximo:
      - para: rev_orq_e1
        condicao: pronta
    raia_chamada: rev_ent
  - id: rev_orq_c4
    raia: rev_orq
    tipo: chamada
    rotulo: Preparar, revisar, integrar e medir
    proximo:
      - para: rev_orq_e2
        condicao: pronta
    raia_chamada: rev_ent
  - id: rev_orq_e1
    raia: rev_orq
    tipo: fim
    rotulo: Revisão com checklist e automação própria
    proximo: []
    retorno: construir
    saida:
      tipo: construir
      justificativa: Quando o código precisa ficar no ambiente próprio, um checklist de revisão e ferramentas abertas de comentários automáticos entregam a maior parte do ganho com custo mínimo.
      eixos:
        - compliance_dados
        - orcamento
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
      categoria: "[[revisao_codigo_pr|Revisão de código e PR]]"
      ferramentas:
        - "[[qodo_pr_agent|Qodo PR-Agent]]"
        - tabela:reviewdog
        - tabela:danger-js
  - id: rev_orq_e2
    raia: rev_orq
    tipo: fim
    rotulo: Revisão com ferramenta de revisão automatizada
    proximo: []
    retorno: assinar
    saida:
      tipo: assinar
      justificativa: Uma ferramenta de revisão automatizada comenta cada pedido em minutos, o que libera as pessoas revisoras para design e corretude e reduz a fila em times com volume alto.
      eixos:
        - escala_volume
        - time_maturidade
        - prazo_entrega
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
      categoria: "[[revisao_codigo_pr|Revisão de código e PR]]"
      ferramentas:
        - "[[github_copilot|GitHub Copilot]]"
        - tabela:coderabbit
        - tabela:sourcery
  - id: rev_ctx_s0
    raia: rev_ctx
    tipo: inicio
    rotulo: Início do levantamento
    proximo:
      - para: rev_ctx_t1
        condicao: ""
  - id: rev_ctx_t1
    raia: rev_ctx
    tipo: tarefa
    rotulo: Acordar critérios e metas da revisão
    proximo:
      - para: rev_ctx_e1
        condicao: ""
    passos:
      - ctx.criterios_e_metas_da_revisao
  - id: rev_ctx_e1
    raia: rev_ctx
    tipo: fim
    rotulo: Critérios e metas acordados
    proximo: []
    retorno: criterios_definidos
  - id: rev_abd_s0
    raia: rev_abd
    tipo: inicio
    rotulo: Início da escolha
    proximo:
      - para: rev_abd_t1
        condicao: ""
  - id: rev_abd_t1
    raia: rev_abd
    tipo: tarefa
    rotulo: Registrar premissas e pontuar as opções
    proximo:
      - para: rev_abd_g1
        condicao: ""
    passos:
      - ctx.premissas_nao_funcionais
      - prep.pontuar_opcoes_matriz
  - id: rev_abd_g1
    raia: rev_abd
    tipo: bifurcacao
    rotulo: Código restrito ao ambiente próprio?
    proximo:
      - para: rev_abd_e1
        condicao: sim
      - para: rev_abd_g2
        condicao: não
    eixo: compliance_dados
    pergunta: q.codigo_nao_pode_sair
  - id: rev_abd_g2
    raia: rev_abd
    tipo: bifurcacao
    rotulo: Sem checagens automáticas?
    proximo:
      - para: rev_abd_e2
        condicao: sim
      - para: rev_abd_g3
        condicao: não
    eixo: time_maturidade
    pergunta: q.time_pequeno_sem_padroes_automatizados
  - id: rev_abd_g3
    raia: rev_abd
    tipo: bifurcacao
    rotulo: Fila de revisão alta?
    proximo:
      - para: rev_abd_e2
        condicao: sim
      - para: rev_abd_e1
        condicao: não
    eixo: escala_volume
    pergunta: q.fila_de_revisao_alta
  - id: rev_abd_e1
    raia: rev_abd
    tipo: fim
    rotulo: Revisar com checklist e automação própria
    proximo: []
    retorno: construir
  - id: rev_abd_e2
    raia: rev_abd
    tipo: fim
    rotulo: Revisar com ferramenta de revisão automatizada
    proximo: []
    retorno: assinar
  - id: rev_ent_s0
    raia: rev_ent
    tipo: inicio
    rotulo: Início da entrega
    proximo:
      - para: rev_ent_t1
        condicao: ""
  - id: rev_ent_t1
    raia: rev_ent
    tipo: tarefa
    rotulo: Preparar a mudança
    proximo:
      - para: rev_ent_t2
        condicao: ""
    passos:
      - prep.mudanca_pequena_e_descrita
  - id: rev_ent_t2
    raia: rev_ent
    tipo: tarefa
    rotulo: Revisar com foco humano e automático
    proximo:
      - para: rev_ent_t3
        condicao: ""
    passos:
      - exec.revisar_design_e_corretude
      - exec.revisar_testes_e_legibilidade
      - exec.automatizar_checagens_mecanicas
  - id: rev_ent_t3
    raia: rev_ent
    tipo: tarefa
    rotulo: Decidir, integrar e medir
    proximo:
      - para: rev_ent_e1
        condicao: ""
    passos:
      - val.decisao_com_comentarios_acionaveis
      - ent.integrar_com_checagens_verdes
      - ops.medir_tempo_de_revisao
  - id: rev_ent_e1
    raia: rev_ent
    tipo: fim
    rotulo: Mudança integrada e tempo de revisão medido
    proximo: []
    retorno: pronta
perguntasDecisao:
  - id: q.codigo_nao_pode_sair
    pergunta: O código-fonte não pode ser enviado a serviços de terceiros por exigência de sigilo ou conformidade?
    eixo: compliance_dados
  - id: q.time_pequeno_sem_padroes_automatizados
    pergunta: O time é pequeno, ainda sem checagens automáticas de padrões, e precisa elevar a qualidade rápido?
    eixo: time_maturidade
  - id: q.fila_de_revisao_alta
    pergunta: O volume de pedidos forma filas de revisão que atrasam as entregas?
    eixo: escala_volume
objetivo: Manter a base de código saudável com revisões rápidas e úteis, deixando as checagens mecânicas para automação e a atenção humana para design, corretude e testes, com o ferramental (assinar ou construir) que atende ao controle de código e ao volume.
preRequisitos:
  - Critérios de revisão escritos e acordados pelo time.
  - Um fluxo de pedidos de integração com proteção da branch principal.
  - Testes automatizados rodando em cada mudança.
  - Premissas de volume de mudanças, sigilo do código e orçamento.
passos:
  - id: ctx.criterios_e_metas_da_revisao
    titulo: Acordar critérios e metas da revisão
    descricao: Escrever o que a revisão avalia (design, corretude, testes, legibilidade, segurança), quem aprova e o prazo de resposta esperado.
    verificacao: O documento de critérios foi aceito pelo time e define aprovação e prazo de resposta.
    depende: []
  - id: ctx.premissas_nao_funcionais
    titulo: Registrar premissas não funcionais
    descricao: Anotar volume esperado, latência aceitável, dados sensíveis, prazo e orçamento, que alimentam as perguntas de decisão.
    verificacao: Cada um dos 7 eixos de adoção tem uma resposta escrita ou a nota de que não se aplica.
    depende:
      - ctx.criterios_e_metas_da_revisao
  - id: prep.pontuar_opcoes_matriz
    titulo: Pontuar construir, comprar e assinar
    descricao: Dar nota de 1 a 5 às três opções nos cinco critérios da matriz e registrar o objetivo que pesa mais.
    verificacao: A matriz tem as 15 notas preenchidas e a opção vencedora tem a justificativa registrada.
    depende:
      - ctx.premissas_nao_funcionais
  - id: prep.mudanca_pequena_e_descrita
    titulo: Preparar uma mudança pequena com descrição clara
    descricao: Limitar a mudança a um propósito, escrever o motivo, o que mudou e como testar, e ligar ao registro da tarefa.
    verificacao: A descrição responde a motivo, efeito e teste, e a mudança cabe em uma leitura de poucos minutos.
    depende:
      - prep.pontuar_opcoes_matriz
  - id: exec.revisar_design_e_corretude
    titulo: Revisar design e corretude
    descricao: Verificar se a mudança resolve o problema certo, se o desenho cabe na arquitetura e se os casos de borda e de erro são tratados.
    verificacao: Cada comentário de design ou corretude tem a justificativa e a sugestão de caminho.
    depende:
      - prep.mudanca_pequena_e_descrita
  - id: exec.revisar_testes_e_legibilidade
    titulo: Revisar testes e legibilidade
    descricao: Conferir se os testes cobrem o comportamento novo e as falhas, e se nomes, estrutura e comentários explicam a intenção.
    verificacao: A mudança tem testes para o comportamento novo e a leitura dispensa explicações fora do código.
    depende:
      - exec.revisar_design_e_corretude
  - id: exec.automatizar_checagens_mecanicas
    titulo: Automatizar formatação, análise estática e testes
    descricao: Mover para o pipeline tudo o que uma máquina verifica e deixar a atenção das pessoas para o que exige julgamento.
    verificacao: Formatação, análise estática e testes rodam em cada pedido e bloqueiam a integração quando falham.
    depende:
      - prep.mudanca_pequena_e_descrita
  - id: val.decisao_com_comentarios_acionaveis
    titulo: Decidir com comentários acionáveis
    descricao: Aprovar ou pedir mudanças com comentários específicos, separando o que bloqueia do que é sugestão, e responder dentro do prazo.
    verificacao: A decisão está registrada, cada bloqueio tem justificativa e o prazo de resposta foi cumprido.
    depende:
      - exec.revisar_testes_e_legibilidade
      - exec.automatizar_checagens_mecanicas
  - id: ent.integrar_com_checagens_verdes
    titulo: Integrar com as checagens verdes
    descricao: Integrar a mudança na branch principal com aprovação e checagens aprovadas, respeitando a proteção da branch.
    verificacao: A integração ocorreu com aprovação e todas as checagens verdes.
    depende:
      - val.decisao_com_comentarios_acionaveis
  - id: ops.medir_tempo_de_revisao
    titulo: Medir tempo de revisão e tamanho das mudanças
    descricao: Acompanhar o tempo até a primeira resposta, o tempo até a integração e o tamanho das mudanças, e ajustar o processo conforme os números.
    verificacao: O time revisa mensalmente os tempos de revisão e define um ajuste para o próximo ciclo.
    depende:
      - ent.integrar_com_checagens_verdes
comoFazerHoje: []
checklistRefs: {}
armadilhas:
  - Revisar mudanças grandes de uma vez, o que reduz a atenção e deixa defeitos passarem.
  - Gastar a revisão humana com formatação e estilo, o que atrasa o fluxo e esconde problemas de design.
  - Comentar sem sugestão de caminho, o que gera idas e vindas e frustração entre as pessoas.
  - Aceitar a revisão automatizada como aprovação final, o que dispensa o julgamento humano sobre intenção e risco.
validacao:
  - Os critérios de revisão estão escritos e o time os segue.
  - Mudanças têm propósito único, descrição clara e tamanho que cabe em uma leitura curta.
  - Formatação, análise estática e testes rodam automaticamente e bloqueiam a integração quando falham.
  - Cada decisão traz comentários acionáveis e é dada dentro do prazo combinado.
  - O tempo de revisão é medido e revisado pelo time.
padroes:
  - "[[clean_architecture|Clean Architecture]]"
  - "[[arquitetura_hexagonal|Arquitetura Hexagonal]]"
  - "[[human_in_the_loop|Human-in-the-Loop]]"
categorias:
  - "[[revisao_codigo_pr|Revisão de código e PR]]"
  - "[[skills_codigo_revisao|Skills de código e revisão]]"
  - "[[agente_codigo|Agente de código]]"
  - "[[seguranca_codigo|Segurança de código]]"
aliases:
  - Revisar código
  - Revisão de pull request
grupo: Qualidade entrega e operação
stacks:
  - "[[fluxo_dev_assistido_ia|Fluxo de desenvolvimento assistido por IA]]"
ferramentas:
  - "[[qodo_pr_agent|Qodo PR-Agent]]"
  - tabela:reviewdog
  - tabela:danger-js
  - "[[github_copilot|GitHub Copilot]]"
  - tabela:coderabbit
  - tabela:sourcery
casosDeUso:
  - "[[revisao_de_codigo|Revisão de código]]"
  - "[[pipelines_de_ci_e_cd|Pipelines de CI e CD]]"
variacoes:
  - revisao-pull-request
  - revisao-qualidade-padroes
  - cicd-revisao-pr
certificacoes: []
dataVerificacao: 2026-11-23
tags:
  - guia-pratico
---
# Como fazer code review
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
