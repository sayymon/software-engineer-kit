---
id: otimizar_performance
tipo: guia-pratico
nome: Como otimizar performance
sigla: prf
descricao: "Caminho para melhorar o desempenho com método: fixar metas e orçamento, medir a linha de base, perfilar para achar o maior gargalo, otimizar um ponto por vez, validar com testes de carga antes e depois e proteger o ganho no pipeline."
exemplo: "Uma página de listagem demora a responder: o time mede a linha de base, o perfil mostra consultas repetidas, uma consulta única com cache reduz a latência e um teste de carga confirma o ganho antes e depois."
quando_usar:
  - Uma meta de latência, de vazão ou de experiência não é atendida.
  - Um aumento de tráfego esperado exige validar a capacidade antes de acontecer.
quando_evitar:
  - Quando ainda não há meta nem medição, e o primeiro passo é adicionar observabilidade (veja o guia de observabilidade).
fonte_ids:
  - web_vitals
  - k6_test_types
fontes:
  - id: web_vitals
    tipo: artigo
    titulo: Web Vitals (web.dev)
    link: https://web.dev/articles/vitals
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: k6_test_types
    tipo: artigo
    titulo: Load test types (Grafana k6 documentation)
    link: https://grafana.com/docs/k6/latest/testing-guides/test-types/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
status: rascunho
publico: false
raias:
  - id: prf_orq
    nome: Orquestração da otimização
    responsabilidade: Encadear contexto, ferramental e execução até o ganho confirmado e protegido.
    cor: "#607D8B"
    orquestradora: true
  - id: prf_ctx
    nome: Contexto e requisitos
    responsabilidade: Entender a necessidade e fixar escopo e critérios antes de escolher tecnologia.
    cor: "#0072B2"
    orquestradora: false
  - id: prf_abd
    nome: Abordagem de entrega
    responsabilidade: Decidir entre assinar, comprar ou construir a partir das premissas.
    cor: "#E69F00"
    orquestradora: false
  - id: prf_ent
    nome: Implementação e entrega
    responsabilidade: Implementar, validar, publicar e operar na abordagem escolhida.
    cor: "#009E73"
    orquestradora: false
nos:
  - id: prf_orq_s0
    raia: prf_orq
    tipo: inicio
    rotulo: Meta de desempenho não atendida ou capacidade a validar
    proximo:
      - para: prf_orq_c1
        condicao: ""
  - id: prf_orq_c1
    raia: prf_orq
    tipo: chamada
    rotulo: Fixar metas e o orçamento de desempenho
    proximo:
      - para: prf_orq_c2
        condicao: metas_fixadas
    raia_chamada: prf_ctx
  - id: prf_orq_c2
    raia: prf_orq
    tipo: chamada
    rotulo: Escolher o ferramental de perfilamento e carga
    proximo:
      - para: prf_orq_c4
        condicao: assinar
      - para: prf_orq_c3
        condicao: construir
    raia_chamada: prf_abd
  - id: prf_orq_c3
    raia: prf_orq
    tipo: chamada
    rotulo: Medir, otimizar, validar e proteger
    proximo:
      - para: prf_orq_e1
        condicao: pronta
    raia_chamada: prf_ent
  - id: prf_orq_c4
    raia: prf_orq
    tipo: chamada
    rotulo: Medir, otimizar, validar e proteger
    proximo:
      - para: prf_orq_e2
        condicao: pronta
    raia_chamada: prf_ent
  - id: prf_orq_e1
    raia: prf_orq
    tipo: fim
    rotulo: Medição e testes de carga com ferramentas abertas
    proximo: []
    retorno: construir
    saida:
      tipo: construir
      justificativa: Scripts de carga abertos, versionados com o código, validam a capacidade antes de cada versão com custo baixo e dão repetibilidade às comparações de antes e depois.
      eixos:
        - orcamento
        - latencia
        - time_maturidade
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
      categoria: "[[testes_carga_desempenho|Testes de carga e desempenho]]"
      ferramentas:
        - tabela:k6
        - "[[apache_jmeter|Apache JMeter]]"
        - tabela:locust
  - id: prf_orq_e2
    raia: prf_orq
    tipo: fim
    rotulo: Perfilamento e APM assinados
    proximo: []
    retorno: assinar
    saida:
      tipo: assinar
      justificativa: Um serviço de APM com perfilamento contínuo mostra gargalos reais de produção em dias, o que acelera a primeira rodada de otimização sem montar a coleta própria.
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
        - tabela:sentry
        - tabela:dynatrace
  - id: prf_ctx_s0
    raia: prf_ctx
    tipo: inicio
    rotulo: Início do levantamento
    proximo:
      - para: prf_ctx_t1
        condicao: ""
  - id: prf_ctx_t1
    raia: prf_ctx
    tipo: tarefa
    rotulo: Fixar metas e o orçamento de desempenho
    proximo:
      - para: prf_ctx_e1
        condicao: ""
    passos:
      - ctx.metas_de_desempenho
  - id: prf_ctx_e1
    raia: prf_ctx
    tipo: fim
    rotulo: Metas e orçamento fixados
    proximo: []
    retorno: metas_fixadas
  - id: prf_abd_s0
    raia: prf_abd
    tipo: inicio
    rotulo: Início da escolha
    proximo:
      - para: prf_abd_t1
        condicao: ""
  - id: prf_abd_t1
    raia: prf_abd
    tipo: tarefa
    rotulo: Registrar premissas e pontuar as opções
    proximo:
      - para: prf_abd_g1
        condicao: ""
    passos:
      - ctx.premissas_nao_funcionais
      - prep.pontuar_opcoes_matriz
  - id: prf_abd_g1
    raia: prf_abd
    tipo: bifurcacao
    rotulo: Falta visibilidade de produção?
    proximo:
      - para: prf_abd_e1
        condicao: sim
      - para: prf_abd_g2
        condicao: não
    eixo: prazo_entrega
    pergunta: q.falta_visibilidade_de_producao
  - id: prf_abd_g2
    raia: prf_abd
    tipo: bifurcacao
    rotulo: Orçamento favorece ferramentas abertas?
    proximo:
      - para: prf_abd_e2
        condicao: sim
      - para: prf_abd_g3
        condicao: não
    eixo: orcamento
    pergunta: q.orcamento_prioriza_ferramentas_abertas
  - id: prf_abd_g3
    raia: prf_abd
    tipo: bifurcacao
    rotulo: Meta exige teste de carga próprio?
    proximo:
      - para: prf_abd_e2
        condicao: sim
      - para: prf_abd_e2
        condicao: não
    eixo: latencia
    pergunta: q.meta_de_latencia_exige_teste_proprio
  - id: prf_abd_e1
    raia: prf_abd
    tipo: fim
    rotulo: Assinar perfilamento e APM
    proximo: []
    retorno: assinar
  - id: prf_abd_e2
    raia: prf_abd
    tipo: fim
    rotulo: Medir e validar com testes de carga próprios
    proximo: []
    retorno: construir
  - id: prf_ent_s0
    raia: prf_ent
    tipo: inicio
    rotulo: Início da entrega
    proximo:
      - para: prf_ent_t1
        condicao: ""
  - id: prf_ent_t1
    raia: prf_ent
    tipo: tarefa
    rotulo: Medir e achar o gargalo
    proximo:
      - para: prf_ent_t2
        condicao: ""
    passos:
      - prep.medir_linha_de_base
      - exec.perfilar_e_achar_gargalo
  - id: prf_ent_t2
    raia: prf_ent
    tipo: tarefa
    rotulo: Otimizar com evidência
    proximo:
      - para: prf_ent_t3
        condicao: ""
    passos:
      - exec.otimizar_o_maior_gargalo
      - exec.reduzir_trabalho_repetido
  - id: prf_ent_t3
    raia: prf_ent
    tipo: tarefa
    rotulo: Validar e proteger
    proximo:
      - para: prf_ent_e1
        condicao: ""
    passos:
      - val.teste_de_carga_antes_e_depois
      - ent.orcamento_no_pipeline
      - ops.monitorar_percentis_em_producao
  - id: prf_ent_e1
    raia: prf_ent
    tipo: fim
    rotulo: Ganho confirmado e protegido
    proximo: []
    retorno: pronta
perguntasDecisao:
  - id: q.falta_visibilidade_de_producao
    pergunta: Falta visibilidade de produção e o time precisa localizar gargalos em dias, com perfilamento contínuo?
    eixo: prazo_entrega
  - id: q.orcamento_prioriza_ferramentas_abertas
    pergunta: O orçamento prioriza ferramentas abertas e o time domina scripts de carga?
    eixo: orcamento
  - id: q.meta_de_latencia_exige_teste_proprio
    pergunta: A meta de latência exige validar a capacidade antes de cada versão com testes de carga próprios?
    eixo: latencia
objetivo: Reduzir latência ou aumentar vazão com mudanças guiadas por medição, confirmadas por testes de carga e protegidas contra regressões, com o ferramental (assinar ou construir) que atende ao orçamento e à meta de latência.
preRequisitos:
  - Meta numérica de latência, vazão ou experiência por fluxo.
  - Ambiente de teste parecido com produção e dados representativos.
  - Acesso a métricas e perfis do serviço.
  - Premissas de orçamento, padrão de tráfego e prazo.
passos:
  - id: ctx.metas_de_desempenho
    titulo: Fixar metas de desempenho e o orçamento
    descricao: Definir metas por fluxo em percentis de latência, vazão e experiência, e o orçamento de recursos que o ganho pode consumir.
    verificacao: Cada fluxo prioritário tem meta numérica, percentil e orçamento de recursos acordados.
    depende: []
  - id: ctx.premissas_nao_funcionais
    titulo: Registrar premissas não funcionais
    descricao: Anotar volume esperado, latência aceitável, dados sensíveis, prazo e orçamento, que alimentam as perguntas de decisão.
    verificacao: Cada um dos 7 eixos de adoção tem uma resposta escrita ou a nota de que não se aplica.
    depende:
      - ctx.metas_de_desempenho
  - id: prep.pontuar_opcoes_matriz
    titulo: Pontuar construir, comprar e assinar
    descricao: Dar nota de 1 a 5 às três opções nos cinco critérios da matriz e registrar o objetivo que pesa mais.
    verificacao: A matriz tem as 15 notas preenchidas e a opção vencedora tem a justificativa registrada.
    depende:
      - ctx.premissas_nao_funcionais
  - id: prep.medir_linha_de_base
    titulo: Medir a linha de base
    descricao: Medir o desempenho atual com carga representativa, registrando percentis, vazão, uso de recursos e a data da medição.
    verificacao: A linha de base está registrada com método reproduzível e serve de referência para as comparações.
    depende:
      - prep.pontuar_opcoes_matriz
  - id: exec.perfilar_e_achar_gargalo
    titulo: Perfilar e localizar o maior gargalo
    descricao: Usar perfis, rastros e métricas para ver onde o tempo e os recursos são gastos, e ordenar os candidatos por impacto potencial.
    verificacao: O gargalo principal está identificado por evidência de perfil e o ganho esperado está estimado.
    depende:
      - prep.medir_linha_de_base
  - id: exec.otimizar_o_maior_gargalo
    titulo: Otimizar o maior gargalo primeiro
    descricao: Alterar um ponto por vez, começando pelo de maior impacto, e medir o efeito de cada alteração isolada.
    verificacao: Cada alteração tem a medição do efeito registrada antes de a próxima ser feita.
    depende:
      - exec.perfilar_e_achar_gargalo
  - id: exec.reduzir_trabalho_repetido
    titulo: Reduzir trabalho repetido com consultas, índices e cache
    descricao: Eliminar chamadas e consultas redundantes, adequar índices e usar cache com regra de invalidação clara.
    verificacao: O número de consultas e chamadas por requisição caiu e a regra de invalidação do cache está documentada.
    depende:
      - exec.otimizar_o_maior_gargalo
  - id: val.teste_de_carga_antes_e_depois
    titulo: Comparar com teste de carga antes e depois
    descricao: Executar o mesmo cenário de carga na versão anterior e na nova, com ambiente e dados equivalentes, e comparar os percentis.
    verificacao: A versão nova atinge a meta no cenário de carga e a comparação com a anterior está registrada.
    depende:
      - exec.reduzir_trabalho_repetido
  - id: ent.orcamento_no_pipeline
    titulo: Proteger o ganho com um orçamento no pipeline
    descricao: Automatizar uma verificação de desempenho que falha quando os percentis ultrapassam o orçamento acordado.
    verificacao: O pipeline executa a verificação de desempenho e falha quando o orçamento é ultrapassado.
    depende:
      - val.teste_de_carga_antes_e_depois
  - id: ops.monitorar_percentis_em_producao
    titulo: Monitorar percentis em produção
    descricao: Acompanhar percentis altos, não apenas médias, e alertar quando a meta de desempenho está em risco.
    verificacao: Os percentis de produção estão em painel com alerta ligado à meta.
    depende:
      - ent.orcamento_no_pipeline
comoFazerHoje: []
checklistRefs: {}
armadilhas:
  - Otimizar sem medir, o que gasta esforço em pontos que não limitam o desempenho.
  - Acompanhar apenas médias, o que esconde a latência alta sentida por parte das pessoas usuárias.
  - Comparar cenários de carga diferentes, o que invalida a conclusão de que houve ganho.
  - Adicionar cache sem regra de invalidação, o que troca lentidão por dados desatualizados.
validacao:
  - Existe linha de base reproduzível e meta numérica por fluxo.
  - O gargalo tratado foi identificado por evidência de perfil.
  - O teste de carga mostra a meta atingida na versão nova em comparação equivalente com a anterior.
  - O pipeline falha quando o orçamento de desempenho é ultrapassado.
  - Os percentis de produção estão monitorados com alerta.
padroes:
  - "[[cache_aside|Cache-aside]]"
  - "[[backpressure|Backpressure]]"
  - "[[load_shedding|Load Shedding]]"
  - "[[rate_limiting|Rate Limiting (padrão)]]"
categorias:
  - "[[observabilidade_apm|Observabilidade e APM]]"
  - "[[testes_carga_desempenho|Testes de carga e desempenho]]"
  - "[[testes_qa|Testes e QA]]"
  - "[[banco_relacional|Banco relacional]]"
aliases:
  - Melhorar o desempenho
  - Otimizar desempenho de uma aplicação
grupo: Qualidade entrega e operação
stacks:
  - "[[monolito_web_relacional|Monolito web com banco relacional]]"
  - "[[api_transacional_eventos|API transacional com eventos]]"
ferramentas:
  - tabela:k6
  - "[[apache_jmeter|Apache JMeter]]"
  - tabela:locust
  - "[[grafana_cloud|Grafana Cloud]]"
  - tabela:sentry
  - tabela:dynatrace
casosDeUso:
  - "[[observabilidade_em_producao|Observabilidade em produção]]"
  - "[[testes_de_software_e_qa|Testes de software e QA]]"
variacoes:
  - teste-carga
  - obs-apm-infra
certificacoes: []
dataVerificacao: 2026-11-23
tags:
  - guia-pratico
---
# Como otimizar performance
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
