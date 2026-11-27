---
id: integrar_api_terceiros
tipo: guia-pratico
nome: Como integrar com uma API de terceiros
sigla: itp
descricao: "Caminho para ligar o seu sistema a uma API de terceiros: ler o contrato e os termos do fornecedor, proteger credenciais, aplicar repetição segura e verificação de eventos, e escolher entre assinar uma plataforma de integração, orquestrar ou construir um cliente próprio."
exemplo: "Uma loja precisa receber confirmações de pagamento de um fornecedor: avalia os limites e os termos, constrói um cliente com tempo limite e chave de idempotência, verifica a assinatura dos eventos recebidos e libera de forma gradual."
quando_usar:
  - Um sistema próprio precisa ler ou gravar dados em um serviço de terceiros por HTTP.
  - Um fornecedor envia eventos (webhooks) que precisam virar ações no seu sistema.
quando_evitar:
  - Quando o seu time está expondo uma API própria aos consumidores (veja o guia de criação de API).
fonte_ids:
  - rfc_6749_oauth2
  - aws_idempotent_retries
  - openapi_spec
fontes:
  - id: rfc_6749_oauth2
    tipo: artigo
    titulo: "RFC 6749: The OAuth 2.0 Authorization Framework (IETF)"
    link: https://www.rfc-editor.org/rfc/rfc6749.html
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: aws_idempotent_retries
    tipo: artigo
    titulo: Making retries safe with idempotent APIs (Amazon Builders' Library)
    link: https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: openapi_spec
    tipo: artigo
    titulo: OpenAPI Specification (OpenAPI Initiative)
    link: https://spec.openapis.org/oas/latest.html
    status_revisao: revisada
    proxima_revisao: 2027-11-23
status: rascunho
publico: false
raias:
  - id: itp_orq
    nome: Orquestração da integração
    responsabilidade: Encadear contexto, abordagem, stack e entrega até o desfecho.
    cor: "#607D8B"
    orquestradora: true
  - id: itp_ctx
    nome: Contexto e requisitos
    responsabilidade: Entender a necessidade e fixar escopo e critérios antes de escolher tecnologia.
    cor: "#0072B2"
    orquestradora: false
  - id: itp_abd
    nome: Abordagem de entrega
    responsabilidade: Decidir entre assinar, comprar ou construir a partir das premissas.
    cor: "#E69F00"
    orquestradora: false
  - id: itp_stk
    nome: Stack por contexto
    responsabilidade: Escolher o arquétipo de stack ou o caminho de construção por contexto.
    cor: "#009E73"
    orquestradora: false
  - id: itp_ent
    nome: Implementação e entrega
    responsabilidade: Implementar, validar, publicar e operar na abordagem escolhida.
    cor: "#56B4E9"
    orquestradora: false
nos:
  - id: itp_orq_s0
    raia: itp_orq
    tipo: inicio
    rotulo: Necessidade de integrar com uma API de terceiros
    proximo:
      - para: itp_orq_c1
        condicao: ""
  - id: itp_orq_c1
    raia: itp_orq
    tipo: chamada
    rotulo: Mapear o fluxo e ler o contrato do fornecedor
    proximo:
      - para: itp_orq_c2
        condicao: contrato_compreendido
    raia_chamada: itp_ctx
  - id: itp_orq_c2
    raia: itp_orq
    tipo: chamada
    rotulo: Escolher a abordagem de integração
    proximo:
      - para: itp_orq_c3
        condicao: construir
      - para: itp_orq_c6
        condicao: assinar_plataforma
      - para: itp_orq_c4
        condicao: orquestrar_integracoes
    raia_chamada: itp_abd
  - id: itp_orq_c3
    raia: itp_orq
    tipo: chamada
    rotulo: Escolher a stack do cliente próprio
    proximo:
      - para: itp_orq_c5
        condicao: eventos_proprios
      - para: itp_orq_c7
        condicao: construir_cliente
    raia_chamada: itp_stk
  - id: itp_orq_c4
    raia: itp_orq
    tipo: chamada
    rotulo: Implementar, validar e ativar a integração
    proximo:
      - para: itp_orq_e1
        condicao: pronta
    raia_chamada: itp_ent
  - id: itp_orq_c5
    raia: itp_orq
    tipo: chamada
    rotulo: Implementar, validar e ativar a integração
    proximo:
      - para: itp_orq_e2
        condicao: pronta
    raia_chamada: itp_ent
  - id: itp_orq_c6
    raia: itp_orq
    tipo: chamada
    rotulo: Implementar, validar e ativar a integração
    proximo:
      - para: itp_orq_e3
        condicao: pronta
    raia_chamada: itp_ent
  - id: itp_orq_c7
    raia: itp_orq
    tipo: chamada
    rotulo: Implementar, validar e ativar a integração
    proximo:
      - para: itp_orq_e4
        condicao: pronta
    raia_chamada: itp_ent
  - id: itp_orq_e1
    raia: itp_orq
    tipo: fim
    rotulo: Integração ativa sobre a stack de automação e integrações
    proximo: []
    retorno: orquestrar_integracoes
    saida:
      tipo: stack
      justificativa: Com fluxos de média complexidade e sem pressão de residência dos dados, orquestrar a integração em uma plataforma operada pelo time dá visibilidade e reduz a dependência de um fornecedor único.
      eixos:
        - lock_in
        - orcamento
        - prazo_entrega
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
  - id: itp_orq_e2
    raia: itp_orq
    tipo: fim
    rotulo: Integração ativa sobre a stack de API transacional com eventos
    proximo: []
    retorno: eventos_proprios
    saida:
      tipo: stack
      justificativa: Consistência entre serviços e garantias de entrega diferenciam o produto, e um time maduro opera mensageria, repetição segura e filas de falhas sem depender de um terceiro.
      eixos:
        - time_maturidade
        - lock_in
        - escala_volume
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
          risco: 4
        assinar:
          diferenciacao: 2
          tempo_ate_valor: 4
          custo_total: 3
          dependencia_fornecedor: 2
          risco: 3
      stack: "[[api_transacional_eventos|API transacional com eventos]]"
  - id: itp_orq_e3
    raia: itp_orq
    tipo: fim
    rotulo: Integração ativa em uma plataforma de automação assinada
    proximo: []
    retorno: assinar_plataforma
    saida:
      tipo: assinar
      justificativa: Para um fluxo simples com conector pronto, a plataforma assinada entrega gatilhos, credenciais e histórico de execuções em dias, e permite validar o valor da integração antes de código próprio.
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
        - "[[n8n|n8n]]"
        - tabela:make
        - tabela:zapier
  - id: itp_orq_e4
    raia: itp_orq
    tipo: fim
    rotulo: Integração ativa com cliente próprio simples
    proximo: []
    retorno: construir_cliente
    saida:
      tipo: construir
      justificativa: Quando os dados exigem controle próprio e o fluxo é de poucas chamadas, um cliente próprio com tempo limite e repetição segura dá controle total e dispensa uma plataforma intermediária.
      eixos:
        - compliance_dados
        - lock_in
        - latencia
      objetivo: diferenciar_produto
      notas:
        construir:
          diferenciacao: 5
          tempo_ate_valor: 3
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
          risco: 2
      categoria: "[[clientes_http_api|Clientes HTTP e API]]"
      ferramentas:
        - "[[axios|Axios]]"
        - "[[okhttp|OkHttp]]"
        - "[[httpx|HTTPX]]"
  - id: itp_ctx_s0
    raia: itp_ctx
    tipo: inicio
    rotulo: Início do levantamento
    proximo:
      - para: itp_ctx_t1
        condicao: ""
  - id: itp_ctx_t1
    raia: itp_ctx
    tipo: tarefa
    rotulo: Mapear o fluxo e ler o contrato do fornecedor
    proximo:
      - para: itp_ctx_e1
        condicao: ""
    passos:
      - ctx.fluxo_e_dados_trocados
      - ctx.ler_contrato_do_fornecedor
  - id: itp_ctx_e1
    raia: itp_ctx
    tipo: fim
    rotulo: Fluxo e contrato compreendidos
    proximo: []
    retorno: contrato_compreendido
  - id: itp_abd_s0
    raia: itp_abd
    tipo: inicio
    rotulo: Início da escolha
    proximo:
      - para: itp_abd_t1
        condicao: ""
  - id: itp_abd_t1
    raia: itp_abd
    tipo: tarefa
    rotulo: Registrar premissas e pontuar as opções
    proximo:
      - para: itp_abd_g1
        condicao: ""
    passos:
      - ctx.premissas_nao_funcionais
      - prep.pontuar_opcoes_matriz
  - id: itp_abd_g1
    raia: itp_abd
    tipo: bifurcacao
    rotulo: Residência e auditoria próprias?
    proximo:
      - para: itp_abd_e1
        condicao: sim
      - para: itp_abd_g2
        condicao: não
    eixo: compliance_dados
    pergunta: q.dados_com_residencia_e_auditoria
  - id: itp_abd_g2
    raia: itp_abd
    tipo: bifurcacao
    rotulo: Fluxo simples com conector pronto?
    proximo:
      - para: itp_abd_e2
        condicao: sim
      - para: itp_abd_e3
        condicao: não
    eixo: prazo_entrega
    pergunta: q.fluxo_simples_conector_pronto
  - id: itp_abd_e1
    raia: itp_abd
    tipo: fim
    rotulo: Construir o cliente próprio
    proximo: []
    retorno: construir
  - id: itp_abd_e2
    raia: itp_abd
    tipo: fim
    rotulo: Plataforma de integração assinada
    proximo: []
    retorno: assinar_plataforma
  - id: itp_abd_e3
    raia: itp_abd
    tipo: fim
    rotulo: Orquestrar com stack de integrações
    proximo: []
    retorno: orquestrar_integracoes
  - id: itp_stk_s0
    raia: itp_stk
    tipo: inicio
    rotulo: Início da escolha da stack
    proximo:
      - para: itp_stk_g1
        condicao: ""
  - id: itp_stk_g1
    raia: itp_stk
    tipo: bifurcacao
    rotulo: Time opera eventos?
    proximo:
      - para: itp_stk_e1
        condicao: sim
      - para: itp_stk_e2
        condicao: não
    eixo: time_maturidade
    pergunta: q.time_opera_eventos
  - id: itp_stk_e1
    raia: itp_stk
    tipo: fim
    rotulo: Stack transacional com eventos
    proximo: []
    retorno: eventos_proprios
  - id: itp_stk_e2
    raia: itp_stk
    tipo: fim
    rotulo: Cliente próprio simples
    proximo: []
    retorno: construir_cliente
  - id: itp_ent_s0
    raia: itp_ent
    tipo: inicio
    rotulo: Início da entrega
    proximo:
      - para: itp_ent_t1
        condicao: ""
  - id: itp_ent_t1
    raia: itp_ent
    tipo: tarefa
    rotulo: Preparar acesso e implementar as chamadas
    proximo:
      - para: itp_ent_t2
        condicao: ""
    passos:
      - prep.credenciais_e_acesso
      - exec.implementar_chamadas
      - exec.tratar_erros_e_limites
      - exec.receber_eventos
  - id: itp_ent_t2
    raia: itp_ent
    tipo: tarefa
    rotulo: Validar sem tocar produção
    proximo:
      - para: itp_ent_t3
        condicao: ""
    passos:
      - val.testes_com_ambiente_do_fornecedor
  - id: itp_ent_t3
    raia: itp_ent
    tipo: tarefa
    rotulo: Ativar e monitorar
    proximo:
      - para: itp_ent_e1
        condicao: ""
    passos:
      - ent.ativar_com_liberacao_gradual
      - ops.monitorar_integracao
  - id: itp_ent_e1
    raia: itp_ent
    tipo: fim
    rotulo: Integração ativa e monitorada
    proximo: []
    retorno: pronta
perguntasDecisao:
  - id: q.dados_com_residencia_e_auditoria
    pergunta: Os dados trocados exigem controle de residência e trilha de auditoria próprios?
    eixo: compliance_dados
  - id: q.fluxo_simples_conector_pronto
    pergunta: O fluxo é simples (gatilho e ação), existe conector pronto e o prazo é curto?
    eixo: prazo_entrega
  - id: q.time_opera_eventos
    pergunta: O time tem maturidade para operar mensageria e consistência eventual?
    eixo: time_maturidade
objetivo: Entregar uma integração resiliente, segura e observável com o fornecedor, na abordagem (assinar, orquestrar ou construir) que melhor atende ao prazo, ao volume e ao controle dos dados.
preRequisitos:
  - Lista das trocas de dados necessárias, com origem, destino e frequência.
  - Acesso à documentação, ao ambiente de testes e aos termos do fornecedor.
  - Local seguro para guardar credenciais.
  - Premissas de volume, latência, dados sensíveis, prazo e orçamento.
passos:
  - id: ctx.fluxo_e_dados_trocados
    titulo: Mapear o fluxo e os dados trocados
    descricao: Descrever cada troca com origem, destino, formato dos dados, frequência e o que acontece quando ela falha.
    verificacao: Cada troca tem origem, destino, formato dos dados e frequência registrados.
    depende: []
  - id: ctx.ler_contrato_do_fornecedor
    titulo: Ler a documentação e os termos do fornecedor
    descricao: Conferir autenticação, limites de uso, formato de erros, política de mudança de versão e termos de uso dos dados.
    verificacao: Os limites, a política de mudança e as regras de uso dos dados estão resumidos em uma página.
    depende:
      - ctx.fluxo_e_dados_trocados
  - id: ctx.premissas_nao_funcionais
    titulo: Registrar premissas não funcionais
    descricao: Anotar volume esperado, latência aceitável, dados sensíveis, prazo e orçamento, que alimentam as perguntas de decisão.
    verificacao: Cada um dos 7 eixos de adoção tem uma resposta escrita ou a nota de que não se aplica.
    depende:
      - ctx.fluxo_e_dados_trocados
  - id: prep.pontuar_opcoes_matriz
    titulo: Pontuar construir, comprar e assinar
    descricao: Dar nota de 1 a 5 às três opções nos cinco critérios da matriz e registrar o objetivo que pesa mais.
    verificacao: A matriz tem as 15 notas preenchidas e a opção vencedora tem a justificativa registrada.
    depende:
      - ctx.premissas_nao_funcionais
  - id: prep.credenciais_e_acesso
    titulo: Obter credenciais e guardá-las com segurança
    descricao: Criar credenciais separadas por ambiente, com permissão mínima, e guardá-las em um cofre de segredos com rotação prevista.
    verificacao: As credenciais ficam em um cofre de segredos com permissão mínima e prazo de rotação registrado.
    depende:
      - prep.pontuar_opcoes_matriz
      - ctx.ler_contrato_do_fornecedor
  - id: exec.implementar_chamadas
    titulo: Implementar as chamadas com tempo limite e repetição segura
    descricao: Aplicar tempo limite, repetição com espera crescente e chave de idempotência nas operações que alteram dados.
    verificacao: Uma falha induzida do fornecedor é repetida sem duplicar o efeito.
    depende:
      - prep.credenciais_e_acesso
  - id: exec.tratar_erros_e_limites
    titulo: Tratar erros, limites de uso e mudanças de contrato
    descricao: Mapear os erros do fornecedor para comportamentos definidos, respeitar os limites de uso e isolar o formato externo do modelo interno.
    verificacao: Respostas de limite e erros do fornecedor geram comportamento previsto e registro com a causa.
    depende:
      - exec.implementar_chamadas
  - id: exec.receber_eventos
    titulo: Receber eventos do fornecedor com verificação de assinatura
    descricao: Expor o ponto de recebimento, verificar a assinatura de cada evento e processar de forma idempotente e tolerante a ordem.
    verificacao: Um evento duplicado ou fora de ordem gera um único efeito e um evento com assinatura inválida é recusado.
    depende:
      - exec.implementar_chamadas
  - id: val.testes_com_ambiente_do_fornecedor
    titulo: Testar com o ambiente de testes do fornecedor
    descricao: Rodar os cenários de sucesso, erro, limite e evento duplicado contra o ambiente de testes ou um simulador.
    verificacao: Os cenários de sucesso, erro, limite e evento duplicado passam sem chamar o ambiente de produção.
    depende:
      - exec.tratar_erros_e_limites
      - exec.receber_eventos
  - id: ent.ativar_com_liberacao_gradual
    titulo: Ativar com liberação gradual
    descricao: Liberar a integração para uma parcela do tráfego e manter um retorno rápido ao fluxo anterior.
    verificacao: A integração roda para uma parcela do tráfego e o retorno ao fluxo anterior foi ensaiado.
    depende:
      - val.testes_com_ambiente_do_fornecedor
  - id: ops.monitorar_integracao
    titulo: Monitorar erro, latência e consumo do limite
    descricao: Emitir métricas e alertas por fornecedor e acompanhar comunicados de mudança do contrato.
    verificacao: O painel e os alertas mostram erro, latência e uso do limite por fornecedor.
    depende:
      - ent.ativar_com_liberacao_gradual
comoFazerHoje: []
checklistRefs: {}
armadilhas:
  - Chamar o fornecedor sem tempo limite, o que prende recursos quando ele fica lento.
  - Repetir operações de escrita sem chave de idempotência, o que duplica cobranças e registros.
  - Espalhar o formato do fornecedor pelo código, o que torna cada mudança externa uma reforma interna.
  - Aceitar eventos sem verificar a assinatura, o que permite que terceiros disparem ações no sistema.
validacao:
  - Cada troca tem origem, destino, formato e frequência registrados.
  - Uma falha induzida do fornecedor é repetida sem duplicar o efeito.
  - Eventos duplicados ou fora de ordem geram um único efeito e eventos sem assinatura válida são recusados.
  - Os testes de sucesso, erro, limite e evento duplicado passam sem tocar produção.
  - Erro, latência e uso do limite aparecem em painel com alerta.
padroes:
  - "[[anti_corruption_layer|Anti-Corruption Layer]]"
  - "[[retry_backoff_exponencial|Retry]]"
  - "[[inbox_idempotent_consumer|Idempotência]]"
  - "[[circuit_breaker|Circuit Breaker]]"
  - "[[rate_limiting|Rate Limiting (padrão)]]"
  - "[[timeout|Timeout]]"
categorias:
  - "[[automacao_nocode|Automação e no-code]]"
  - "[[clientes_http_api|Clientes HTTP e API]]"
  - "[[testes_documentacao_apis|Testes e documentação de APIs]]"
  - "[[senhas_segredos|Gerenciador de senhas e segredos]]"
  - "[[observabilidade_apm|Observabilidade e APM]]"
  - "[[mensageria_streaming|Mensageria e streaming]]"
aliases:
  - Integrar com uma API de terceiros
  - Integrar com API externa
grupo: Construir software
stacks:
  - "[[automacao_integracoes|Automação e integrações orquestradas]]"
  - "[[api_transacional_eventos|API transacional com eventos]]"
ferramentas:
  - "[[n8n|n8n]]"
  - tabela:make
  - tabela:zapier
  - "[[axios|Axios]]"
  - "[[okhttp|OkHttp]]"
  - "[[httpx|HTTPX]]"
casosDeUso:
  - "[[integracao_de_apis_e_webhooks|Integração de APIs e webhooks]]"
  - "[[automacao_de_processos|Automação de processos]]"
variacoes:
  - api-cliente-http
  - api-webhooks-recebimento
  - proc-integracao-saas
certificacoes: []
dataVerificacao: 2026-11-23
tags:
  - guia-pratico
---
# Como integrar com uma API de terceiros
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
