---
id: investigar_bug
tipo: guia-pratico
nome: Como investigar e corrigir um bug
sigla: dbg
descricao: "Caminho para encontrar a causa raiz de um defeito e corrigi-la: registrar o sintoma, reproduzir com um caso mínimo, testar hipóteses uma por vez, corrigir na origem com um teste de regressão e confirmar em produção."
exemplo: "Pedidos duplicados aparecem uma vez por semana: o time reproduz com duas requisições simultâneas, isola a falta de idempotência na gravação, corrige a origem, adiciona o teste de regressão e confirma nos painéis após a publicação."
quando_usar:
  - Um comportamento diferente do esperado afeta pessoas usuárias ou outros sistemas e a causa ainda é desconhecida.
  - Uma correção anterior tratou o sintoma e o problema voltou a aparecer.
quando_evitar:
  - Quando o sistema está fora do ar e o primeiro objetivo é restaurar o serviço (veja o guia de resposta a incidentes).
fonte_ids:
  - sre_troubleshooting
fontes:
  - id: sre_troubleshooting
    tipo: artigo
    titulo: Troubleshooting Methodology (Google SRE Book)
    link: https://sre.google/sre-book/effective-troubleshooting/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
status: rascunho
publico: false
raias:
  - id: dbg_orq
    nome: Orquestração da investigação
    responsabilidade: Encadear contexto, ferramental e execução até a correção confirmada.
    cor: "#607D8B"
    orquestradora: true
  - id: dbg_ctx
    nome: Contexto e requisitos
    responsabilidade: Entender a necessidade e fixar escopo e critérios antes de escolher tecnologia.
    cor: "#0072B2"
    orquestradora: false
  - id: dbg_abd
    nome: Abordagem de entrega
    responsabilidade: Decidir entre assinar, comprar ou construir a partir das premissas.
    cor: "#E69F00"
    orquestradora: false
  - id: dbg_ent
    nome: Implementação e entrega
    responsabilidade: Implementar, validar, publicar e operar na abordagem escolhida.
    cor: "#009E73"
    orquestradora: false
nos:
  - id: dbg_orq_s0
    raia: dbg_orq
    tipo: inicio
    rotulo: Defeito relatado por pessoas usuárias ou por monitoramento
    proximo:
      - para: dbg_orq_c1
        condicao: ""
  - id: dbg_orq_c1
    raia: dbg_orq
    tipo: chamada
    rotulo: Registrar o sintoma e o impacto
    proximo:
      - para: dbg_orq_c2
        condicao: sintoma_registrado
    raia_chamada: dbg_ctx
  - id: dbg_orq_c2
    raia: dbg_orq
    tipo: chamada
    rotulo: Escolher o ferramental de investigação
    proximo:
      - para: dbg_orq_c3
        condicao: construir
      - para: dbg_orq_c4
        condicao: assinar
    raia_chamada: dbg_abd
  - id: dbg_orq_c3
    raia: dbg_orq
    tipo: chamada
    rotulo: Reproduzir, isolar, corrigir e confirmar
    proximo:
      - para: dbg_orq_e1
        condicao: pronta
    raia_chamada: dbg_ent
  - id: dbg_orq_c4
    raia: dbg_orq
    tipo: chamada
    rotulo: Reproduzir, isolar, corrigir e confirmar
    proximo:
      - para: dbg_orq_e2
        condicao: pronta
    raia_chamada: dbg_ent
  - id: dbg_orq_e1
    raia: dbg_orq
    tipo: fim
    rotulo: Investigação com registros próprios e depurador
    proximo: []
    retorno: construir
    saida:
      tipo: construir
      justificativa: Quando os dados de erro precisam ficar no ambiente próprio, registros estruturados e rastros abertos dão evidência suficiente com custo baixo e controle total.
      eixos:
        - compliance_dados
        - orcamento
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
      categoria: "[[observabilidade_apm|Observabilidade e APM]]"
      ferramentas:
        - "[[opentelemetry|OpenTelemetry]]"
        - tabela:prometheus
        - tabela:signoz
  - id: dbg_orq_e2
    raia: dbg_orq
    tipo: fim
    rotulo: Investigação com plataforma de erros e observabilidade
    proximo: []
    retorno: assinar
    saida:
      tipo: assinar
      justificativa: Uma plataforma de erros agrupa ocorrências, mostra o contexto da requisição e prioriza por impacto em dias, o que acelera a causa raiz de quem ainda não tem registros estruturados.
      eixos:
        - prazo_entrega
        - time_maturidade
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
      categoria: "[[observabilidade_apm|Observabilidade e APM]]"
      ferramentas:
        - "[[grafana_cloud|Grafana Cloud]]"
        - tabela:sentry
        - tabela:better-stack
  - id: dbg_ctx_s0
    raia: dbg_ctx
    tipo: inicio
    rotulo: Início do levantamento
    proximo:
      - para: dbg_ctx_t1
        condicao: ""
  - id: dbg_ctx_t1
    raia: dbg_ctx
    tipo: tarefa
    rotulo: Registrar o sintoma e o impacto
    proximo:
      - para: dbg_ctx_e1
        condicao: ""
    passos:
      - ctx.sintoma_e_impacto
  - id: dbg_ctx_e1
    raia: dbg_ctx
    tipo: fim
    rotulo: Sintoma e impacto registrados
    proximo: []
    retorno: sintoma_registrado
  - id: dbg_abd_s0
    raia: dbg_abd
    tipo: inicio
    rotulo: Início da escolha
    proximo:
      - para: dbg_abd_t1
        condicao: ""
  - id: dbg_abd_t1
    raia: dbg_abd
    tipo: tarefa
    rotulo: Registrar premissas e pontuar as opções
    proximo:
      - para: dbg_abd_g1
        condicao: ""
    passos:
      - ctx.premissas_nao_funcionais
      - prep.pontuar_opcoes_matriz
  - id: dbg_abd_g1
    raia: dbg_abd
    tipo: bifurcacao
    rotulo: Dados sensíveis nos registros?
    proximo:
      - para: dbg_abd_e1
        condicao: sim
      - para: dbg_abd_g2
        condicao: não
    eixo: compliance_dados
    pergunta: q.dados_sensiveis_nos_registros
  - id: dbg_abd_g2
    raia: dbg_abd
    tipo: bifurcacao
    rotulo: Erros sem agrupamento?
    proximo:
      - para: dbg_abd_e2
        condicao: sim
      - para: dbg_abd_g3
        condicao: não
    eixo: prazo_entrega
    pergunta: q.erros_em_producao_sem_agrupamento
  - id: dbg_abd_g3
    raia: dbg_abd
    tipo: bifurcacao
    rotulo: Registros estruturados já existem?
    proximo:
      - para: dbg_abd_e1
        condicao: sim
      - para: dbg_abd_e2
        condicao: não
    eixo: time_maturidade
    pergunta: q.registros_estruturados_ja_existem
  - id: dbg_abd_e1
    raia: dbg_abd
    tipo: fim
    rotulo: Investigar com registros próprios e depurador
    proximo: []
    retorno: construir
  - id: dbg_abd_e2
    raia: dbg_abd
    tipo: fim
    rotulo: Investigar com plataforma de erros e observabilidade
    proximo: []
    retorno: assinar
  - id: dbg_ent_s0
    raia: dbg_ent
    tipo: inicio
    rotulo: Início da entrega
    proximo:
      - para: dbg_ent_t1
        condicao: ""
  - id: dbg_ent_t1
    raia: dbg_ent
    tipo: tarefa
    rotulo: Reproduzir e isolar a causa
    proximo:
      - para: dbg_ent_t2
        condicao: ""
    passos:
      - prep.reproduzir_com_caso_minimo
      - exec.formular_hipoteses
      - exec.isolar_causa_raiz
  - id: dbg_ent_t2
    raia: dbg_ent
    tipo: tarefa
    rotulo: Corrigir e provar
    proximo:
      - para: dbg_ent_t3
        condicao: ""
    passos:
      - exec.corrigir_na_origem
      - val.teste_de_regressao
  - id: dbg_ent_t3
    raia: dbg_ent
    tipo: tarefa
    rotulo: Publicar e aprender
    proximo:
      - para: dbg_ent_e1
        condicao: ""
    passos:
      - ent.revisar_e_publicar_com_reversao
      - ops.confirmar_em_producao_e_registrar
  - id: dbg_ent_e1
    raia: dbg_ent
    tipo: fim
    rotulo: Defeito corrigido e confirmado
    proximo: []
    retorno: pronta
perguntasDecisao:
  - id: q.dados_sensiveis_nos_registros
    pergunta: Os registros e os dados de erro contêm dados pessoais que precisam ficar em ambiente próprio?
    eixo: compliance_dados
  - id: q.erros_em_producao_sem_agrupamento
    pergunta: Os erros em produção chegam sem agrupamento nem priorização e o time precisa enxergá-los com rapidez?
    eixo: prazo_entrega
  - id: q.registros_estruturados_ja_existem
    pergunta: O time já mantém registros estruturados e usa depurador no fluxo diário?
    eixo: time_maturidade
objetivo: Chegar à causa raiz de um defeito com evidências, corrigi-la na origem e deixar um teste que impede a volta do problema, com a abordagem de ferramental (assinar ou construir) que atende ao controle de dados e ao prazo.
preRequisitos:
  - Relato do sintoma com data, ambiente, versão e exemplo de entrada.
  - Acesso a logs, métricas e ao código da versão afetada.
  - Um ambiente onde o problema pode ser reproduzido sem afetar pessoas usuárias.
  - Premissas de dados sensíveis nos registros, prazo e orçamento.
passos:
  - id: ctx.sintoma_e_impacto
    titulo: Registrar o sintoma, o impacto e o ambiente
    descricao: Descrever o comportamento observado e o esperado, quem é afetado, desde quando, em qual versão e ambiente, com um exemplo de entrada.
    verificacao: O relato permite que outra pessoa reproduza o sintoma e o impacto está estimado em pessoas afetadas ou operações perdidas.
    depende: []
  - id: ctx.premissas_nao_funcionais
    titulo: Registrar premissas não funcionais
    descricao: Anotar volume esperado, latência aceitável, dados sensíveis, prazo e orçamento, que alimentam as perguntas de decisão.
    verificacao: Cada um dos 7 eixos de adoção tem uma resposta escrita ou a nota de que não se aplica.
    depende:
      - ctx.sintoma_e_impacto
  - id: prep.pontuar_opcoes_matriz
    titulo: Pontuar construir, comprar e assinar
    descricao: Dar nota de 1 a 5 às três opções nos cinco critérios da matriz e registrar o objetivo que pesa mais.
    verificacao: A matriz tem as 15 notas preenchidas e a opção vencedora tem a justificativa registrada.
    depende:
      - ctx.premissas_nao_funcionais
  - id: prep.reproduzir_com_caso_minimo
    titulo: Reproduzir o problema com um caso mínimo
    descricao: Reduzir a entrada, a configuração e as dependências até o menor cenário que ainda produz o sintoma, de forma repetível.
    verificacao: O caso mínimo reproduz o sintoma em toda execução e está salvo como script ou teste automatizado.
    depende:
      - prep.pontuar_opcoes_matriz
  - id: exec.formular_hipoteses
    titulo: Listar hipóteses e escolher a mais barata de testar
    descricao: Escrever as causas possíveis a partir das evidências, ordenar por probabilidade e custo de teste e verificar uma de cada vez.
    verificacao: Cada hipótese tem a evidência que a confirma ou a descarta e o resultado do teste registrado.
    depende:
      - prep.reproduzir_com_caso_minimo
  - id: exec.isolar_causa_raiz
    titulo: Isolar a causa raiz por divisão e evidência
    descricao: Dividir o caminho da entrada até o sintoma ao meio, comparando versões e estados, até localizar a linha ou a condição que origina o defeito.
    verificacao: A causa raiz está descrita em uma frase com a evidência que a demonstra e explica todos os sintomas relatados.
    depende:
      - exec.formular_hipoteses
  - id: exec.corrigir_na_origem
    titulo: Corrigir o ponto que origina o defeito
    descricao: Alterar o código na origem do problema e revisar os pontos vizinhos que repetem o mesmo padrão.
    verificacao: A alteração remove a condição que causa o sintoma e os pontos com o mesmo padrão foram revisados.
    depende:
      - exec.isolar_causa_raiz
  - id: val.teste_de_regressao
    titulo: Escrever um teste que falha antes e passa depois da correção
    descricao: Transformar o caso mínimo em teste automatizado, confirmar a falha na versão antiga e a aprovação na versão corrigida.
    verificacao: O teste falha sem a correção e passa com ela, e a suíte completa continua verde.
    depende:
      - exec.corrigir_na_origem
  - id: ent.revisar_e_publicar_com_reversao
    titulo: Revisar a correção e publicar com plano de reversão
    descricao: Submeter a correção à revisão, descrever causa e efeito no pedido de integração e publicar com um caminho de volta definido.
    verificacao: A correção foi revisada, publicada e o plano de reversão está descrito e testado.
    depende:
      - val.teste_de_regressao
  - id: ops.confirmar_em_producao_e_registrar
    titulo: Confirmar em produção e registrar o aprendizado
    descricao: Acompanhar os indicadores do sintoma após a publicação e registrar causa, correção e sinal de detecção para consulta futura.
    verificacao: O sintoma deixou de aparecer nos indicadores por um período combinado e o registro do aprendizado está acessível ao time.
    depende:
      - ent.revisar_e_publicar_com_reversao
comoFazerHoje: []
checklistRefs: {}
armadilhas:
  - Alterar o código por tentativa e erro sem uma hipótese, o que mascara a causa e gera novos defeitos.
  - Corrigir o sintoma visível e seguir adiante, o que deixa a causa raiz ativa para voltar em outro ponto.
  - Publicar a correção sem teste de regressão, o que permite que o defeito retorne em uma mudança futura.
  - Depurar diretamente em produção com dados reais sem controle de acesso, o que amplia o risco para pessoas usuárias.
validacao:
  - O caso mínimo reproduz o sintoma antes da correção e deixa de reproduzir depois dela.
  - A causa raiz está registrada com a evidência e explica todos os sintomas relatados.
  - Um teste de regressão falha na versão antiga e passa na corrigida, e a suíte completa está verde.
  - A correção foi revisada, publicada com plano de reversão e confirmada nos indicadores de produção.
  - O aprendizado (causa, correção e sinal de detecção) está registrado para o time.
padroes:
  - "[[timeout|Timeout]]"
  - "[[retry_backoff_exponencial|Retry]]"
  - "[[inbox_idempotent_consumer|Idempotência]]"
categorias:
  - "[[observabilidade_apm|Observabilidade e APM]]"
  - "[[agente_codigo|Agente de código]]"
  - "[[frameworks_testes|Frameworks de testes]]"
  - "[[testes_qa|Testes e QA]]"
aliases:
  - Depurar um defeito
  - Investigar e corrigir um bug
grupo: Qualidade entrega e operação
stacks:
  - "[[fluxo_dev_assistido_ia|Fluxo de desenvolvimento assistido por IA]]"
  - "[[monolito_web_relacional|Monolito web com banco relacional]]"
ferramentas:
  - "[[opentelemetry|OpenTelemetry]]"
  - tabela:prometheus
  - tabela:signoz
  - "[[grafana_cloud|Grafana Cloud]]"
  - tabela:sentry
  - tabela:better-stack
casosDeUso:
  - "[[depuracao_e_correcao_de_bugs|Depuração e correção de bugs]]"
  - "[[observabilidade_em_producao|Observabilidade em produção]]"
variacoes:
  - bug-reproducao-logs
  - bug-erros-em-producao
  - bug-causa-raiz
certificacoes: []
dataVerificacao: 2026-11-23
tags:
  - guia-pratico
---
# Como investigar e corrigir um bug
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
